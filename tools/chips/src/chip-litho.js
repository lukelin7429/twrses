/*
 * 晶片與半導體 · 第四課「怎麼畫出比病毒還小的電路？」的 3D 模型（全部自繪示意，不是真實比例）。
 *
 * 一個機制：用光當畫筆。光穿過（或被反射自）畫好電路的光罩，鏡頭把圖案縮小 4 倍，印在晶圓的感光膠（光阻）上；
 *   照到光的光阻洗掉，底下的薄膜被蝕刻出圖案。一層一層重複幾十次。光的波長越短，畫得越細。
 *
 * 兩個視角（同一個 renderer，切 group 的 visible）：
 *   machine「曝光機」：直立的光路。DUV：上方雷射（193 nm）→ 透光的光罩 → 一疊鏡頭 → 晶圓；
 *     EUV：錫滴被雷射打成電漿發出 13.5 nm 的光 → 一連串反射鏡 → 反射式光罩 → 反射鏡 → 晶圓，整台在真空罩裡。
 *     晶圓上一格一格曝光（格子＝26 × 33 mm 的曝光範圍，用 wafercalc.js 的 countDies 排），曝過的格子變色。
 *   wafer「晶圓上的五個步驟」：剖面——矽晶圓、要刻圖案的薄膜、光阻；1 塗光阻 2 曝光 3 顯影 4 蝕刻 5 去光阻。
 *     進度用連續的 s（0–5）算每一塊的高度與顏色；DUV 6 條、EUV 21 條（照 lithocalc.js 算的最細線寬 57 nm 比 16 nm）。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/chips && npm run build → assets/js/chip-litho.js
 * 除錯：document.querySelector('[data-chiplitho-lab]').__lab
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CanvasTexture, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry,
  PMREMGenerator, Scene, SphereGeometry, Sprite, SpriteMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { glowTex, labeler, lazyBoot, tube } from './common.js';
import { countDies, WAFER_D } from './wafercalc.js';
import { LIGHT, blurRadius, cd, segments, tone } from './lithocalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const COL = { duv: 0x9b7bff, euv: 0xd06bff };
const WR = 2.0;            // 晶圓半徑（場景）
const WY = 0.42;           // 晶圓表面高度
const MASK_Y = 5.15;
const FIELD_T = 1.1;       // 每一格曝光幾秒
const NSEG = { duv: segments('duv'), euv: segments('euv') };   // 6、21：照最細線寬的比例
const WSTEP_T = 3.2;       // 晶圓上每一步幾秒

function patternCanvas(w = 256, chrome = '#c9ced8', glass = 'rgba(160,190,230,0.25)') {
  const c = document.createElement('canvas'); c.width = w; c.height = w;
  const g = c.getContext('2d');
  g.fillStyle = glass; g.fillRect(0, 0, w, w);
  g.fillStyle = chrome;
  const u = w / 16;
  // 畫一小塊「電路」：橫線、直線、接點
  for (let i = 1; i < 16; i += 2) g.fillRect(u, i * u, w - 2 * u, u * 0.55);
  for (let i = 2; i < 15; i += 4) g.fillRect(i * u, u, u * 0.55, w - 2 * u);
  for (let i = 0; i < 9; i++) g.fillRect((1 + (i * 5) % 13) * u, (2 + (i * 3) % 12) * u, u * 1.4, u * 1.4);
  return c;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0b1326);
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.5;
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 60;
  scene.add(new HemisphereLight(0xe6efff, 0x1a2230, 0.8));
  scene.add(new AmbientLight(0xffffff, 0.15));
  const sun = new DirectionalLight(0xffffff, 1.2); sun.position.set(-5, 10, 8); scene.add(sun);
  const beamMat = (c, o = 0.35) => new MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: AdditiveBlending, depthWrite: false, side: DoubleSide });
  const glass = new MeshStandardMaterial({ color: 0xcfe4ff, transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0, depthWrite: false });
  const metal = new MeshStandardMaterial({ color: 0xd8dee8, metalness: 1, roughness: 0.12 });
  const dark = new MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.5, metalness: 0.4 });

  // =====================================================================
  // 視角一：曝光機
  // =====================================================================
  const mG = new Group(); scene.add(mG);
  mG.add(at(new Mesh(new BoxGeometry(6.4, 0.24, 4.4), dark), 0, 0.05, 0));
  mG.add(at(new Mesh(new CylinderGeometry(WR + 0.12, WR + 0.12, 0.16, 64), new MeshStandardMaterial({ color: 0x3a3f4b, metalness: 0.6, roughness: 0.4 })), 0, 0.25, 0));
  // 晶圓：貼一張畫著曝光格子的圖
  const fieldsR = countDies(26, 33);
  const fields = fieldsR.dies.filter((d) => d.full).sort((a, b) => (b.y - a.y) || (a.x - b.x));
  const wCan = document.createElement('canvas'); wCan.width = wCan.height = 512;
  const wTex = new CanvasTexture(wCan); wTex.colorSpace = SRGBColorSpace;
  const wafer = new Mesh(new CylinderGeometry(WR, WR, 0.04, 96), [new MeshStandardMaterial({ color: 0xc9d2de, metalness: 0.9, roughness: 0.2 }), new MeshStandardMaterial({ map: wTex, metalness: 0.6, roughness: 0.25 }), new MeshStandardMaterial({ color: 0xc9d2de })]);
  mG.add(at(wafer, 0, WY - 0.02, 0));
  function drawWafer(done, cur) {
    const g = wCan.getContext('2d'), S = 512, k = (S / 2) / (WAFER_D / 2);
    g.fillStyle = '#b9c3d1'; g.fillRect(0, 0, S, S);
    fields.forEach((f, i) => {
      g.fillStyle = i < done ? '#5a6fd6' : i === cur ? '#f3e6ff' : '#cfd7e3';
      g.fillRect(S / 2 + f.x * k + 1, S / 2 - (f.y + 33) * k + 1, 26 * k - 2, 33 * k - 2);
    });
    wTex.needsUpdate = true;
  }
  const k3 = WR / (WAFER_D / 2);
  const shot = new Mesh(new PlaneGeometry(26 * k3, 33 * k3), new MeshBasicMaterial({ map: new CanvasTexture(patternCanvas(256, '#ffffff', 'rgba(0,0,0,0)')), transparent: true, blending: AdditiveBlending, depthWrite: false, color: COL.duv }));
  shot.rotation.x = -Math.PI / 2; mG.add(shot);
  const shotGlow = new Sprite(new SpriteMaterial({ map: glowTex('rgba(190,150,255,.8)', 'rgba(150,90,255,0)'), transparent: true, depthWrite: false, blending: AdditiveBlending })); shotGlow.scale.setScalar(1.1); mG.add(shotGlow);

  // ---- DUV 光路 ----
  const duvG = new Group(); mG.add(duvG);
  duvG.add(at(new Mesh(new BoxGeometry(1.6, 0.7, 1.1), dark), 0, 7.3, 0));
  const lamp = new Sprite(new SpriteMaterial({ map: glowTex('rgba(190,150,255,.9)', 'rgba(150,90,255,0)'), transparent: true, depthWrite: false, blending: AdditiveBlending })); lamp.scale.setScalar(1.3); duvG.add(at(lamp, 0, 6.9, 0));
  const mask = new Mesh(new BoxGeometry(1.9, 0.05, 1.9), [glass, glass, new MeshBasicMaterial({ map: new CanvasTexture(patternCanvas()), transparent: true }), glass, glass, glass]);
  duvG.add(at(mask, 0, MASK_Y, 0));
  const beamD1 = new Mesh(new CylinderGeometry(0.75, 0.75, 6.9 - MASK_Y, 32, 1, true), beamMat(COL.duv, 0.22)); duvG.add(at(beamD1, 0, (6.9 + MASK_Y) / 2, 0));
  const beamD2 = new Mesh(new CylinderGeometry(0.75, 0.62, MASK_Y - 4.35, 32, 1, true), beamMat(COL.duv, 0.25)); duvG.add(at(beamD2, 0, (MASK_Y + 4.35) / 2, 0));
  for (let i = 0; i < 5; i++) duvG.add(at(new Mesh(new CylinderGeometry(0.95 - i * 0.05, 0.95 - i * 0.05, 0.16, 48), glass), 0, 4.2 - i * 0.38, 0));
  duvG.add(at(new Mesh(new CylinderGeometry(1.05, 1.05, 2.0, 48, 1, true), new MeshStandardMaterial({ color: 0x3a3f4b, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.35, depthWrite: false, side: DoubleSide })), 0, 3.45, 0));
  const beamD3 = new Mesh(new CylinderGeometry(0.55, 0.14, 2.35 - WY, 32, 1, true), beamMat(COL.duv, 0.32)); duvG.add(beamD3);

  // ---- EUV 光路 ----
  const euvG = new Group(); mG.add(euvG); euvG.visible = false;
  euvG.add(at(new Mesh(new BoxGeometry(7.2, 7.6, 4.6), new MeshStandardMaterial({ color: 0x9fb6d6, transparent: true, opacity: 0.07, depthWrite: false, side: DoubleSide })), 0, 3.95, 0));
  const SRC = V(-2.5, 6.4, 0);
  const pts = [SRC, V(-1.4, 7.3, 0), V(-1.6, 4.0, 0), V(0, MASK_Y + 0.35, 0), V(1.7, 3.6, 0), V(-0.5, 2.5, 0), null];
  const euvMask = new Mesh(new BoxGeometry(1.9, 0.12, 1.9), [dark, dark, dark, new MeshBasicMaterial({ map: new CanvasTexture(patternCanvas(256, '#e8ecf3', '#2a3550')) }), dark, dark]);
  euvG.add(at(euvMask, 0, MASK_Y + 0.42, 0));
  const collector = new Mesh(new SphereGeometry(0.75, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3), metal); collector.material.side = DoubleSide;
  euvG.add(at(collector, SRC.x - 0.55, SRC.y - 0.35, 0)); collector.lookAt(V(SRC.x + 1, SRC.y + 1.2, 0));
  const mirrors = [];
  for (let i = 1; i <= 5; i++) {
    if (i === 3) continue;
    const m = new Mesh(new CylinderGeometry(0.5, 0.5, 0.07, 40), metal); euvG.add(m); mirrors.push({ m, i });
  }
  const euvBeams = [];
  for (let i = 0; i < 6; i++) { const b = new Mesh(new CylinderGeometry(1, 1, 1, 16, 1, true), beamMat(COL.euv, 0.32)); euvG.add(b); euvBeams.push(b); }
  const drops = Array.from({ length: 10 }, (_, i) => { const d = new Mesh(new SphereGeometry(0.05, 10, 8), new MeshStandardMaterial({ color: 0xd8dde6, metalness: 0.9, roughness: 0.3 })); euvG.add(d); return { d, y: i / 10 }; });
  const laser = tube(V(-3.5, SRC.y, 0.0), SRC, 0.03, new MeshBasicMaterial({ color: 0xff4a3a })); euvG.add(laser);
  const flash = new Sprite(new SpriteMaterial({ map: glowTex('rgba(230,170,255,.95)', 'rgba(200,90,255,0)'), transparent: true, depthWrite: false, blending: AdditiveBlending })); euvG.add(at(flash, SRC.x, SRC.y, SRC.z));
  function placeBeam(b, a, c, r) {
    const len = a.distanceTo(c);
    b.scale.set(r, len, r); b.position.copy(a).add(c).multiplyScalar(0.5);
    b.quaternion.setFromUnitVectors(V(0, 1, 0), c.clone().sub(a).normalize());
  }

  // =====================================================================
  // 視角二：晶圓上的五個步驟（剖面）
  // =====================================================================
  const wG = new Group(); scene.add(wG); wG.visible = false;
  const SW = 8, SD = 2.2, FILM = 0.36, RES = 0.42, MY = 2.5;
  wG.add(at(new Mesh(new BoxGeometry(SW, 1.2, SD), new MeshStandardMaterial({ color: 0x8e99ab, metalness: 0.7, roughness: 0.3 })), 0, -0.6, 0));
  const filmMat = new MeshStandardMaterial({ color: 0x3a7bd5, roughness: 0.35, metalness: 0.2 });
  const resMat = () => new MeshStandardMaterial({ color: 0xd9822b, roughness: 0.5, transparent: true, opacity: 0.92 });
  const segs = [];
  const segG = new Group(); wG.add(segG);
  const maskW = new Group(); wG.add(maskW);
  const raysG = new Group(); wG.add(raysG);
  maskW.add(at(new Mesh(new BoxGeometry(SW + 0.4, 0.06, SD + 0.4), glass), 0, MY, 0));
  const RES_C = new Color(0xd9822b), RES_EXP = new Color(0xf6e6a8);
  function buildSegs(n) {
    segG.clear(); raysG.clear();
    while (maskW.children.length > 1) maskW.remove(maskW.children[1]);
    segs.length = 0;
    const w = SW / n;
    for (let i = 0; i < n; i++) {
      const x = -SW / 2 + w * (i + 0.5), exposed = i % 2 === 1;
      const film = at(new Mesh(new BoxGeometry(w, FILM, SD), filmMat), x, FILM / 2, 0);
      const res = at(new Mesh(new BoxGeometry(w, RES, SD), resMat()), x, FILM + RES / 2, 0);
      segG.add(film, res);
      segs.push({ film, res, exposed });
      if (!exposed) maskW.add(at(new Mesh(new BoxGeometry(w, 0.08, SD + 0.4), metal), x, MY + 0.06, 0));
      else {
        const ray = new Mesh(new PlaneGeometry(w * 0.9, MY - FILM - RES), beamMat(COL.duv, 0.5));
        raysG.add(at(ray, x, (MY + FILM + RES) / 2, SD / 2 + 0.01));
        const ray2 = new Mesh(new BoxGeometry(w * 0.9, MY - FILM - RES, SD), beamMat(COL.duv, 0.12));
        raysG.add(at(ray2, x, (MY + FILM + RES) / 2, 0));
      }
    }
  }

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    srcD: lab.add('cp-lb cp-lb-g', 'Laser light, 193 nm<small>雷射光，193 奈米</small>'),
    srcE: lab.add('cp-lb cp-lb-g', 'Laser hits tin drops: 13.5 nm light<small>雷射打錫滴，發出 13.5 奈米的光</small>'),
    mask: lab.add('cp-lb', 'Mask: the circuit drawn 4× bigger<small>光罩：放大 4 倍畫好的電路</small>'),
    lens: lab.add('cp-lb', 'Lenses shrink it 4×<small>鏡頭縮小 4 倍</small>'),
    mirr: lab.add('cp-lb', 'Mirrors, not lenses<small>用反射鏡，不用鏡頭</small>'),
    vac: lab.add('cp-lb cp-lb-note', 'Vacuum: air would absorb this light<small>真空：空氣會吸收這種光</small>'),
    wafer: lab.add('cp-lb cp-lb-el', ''),
    res: lab.add('cp-lb cp-lb-led', 'Photoresist<small>光阻（感光膠）</small>'),
    film: lab.add('cp-lb cp-lb-n', 'Layer to pattern<small>要刻出圖案的薄膜</small>'),
    si: lab.add('cp-lb', 'Silicon wafer<small>矽晶圓</small>'),
    wmask: lab.add('cp-lb', 'Mask<small>光罩</small>'),
    light: lab.add('cp-lb cp-lb-g', 'Light<small>光</small>'),
  };

  // =====================================================================
  // 狀態與控制
  // =====================================================================
  const R = { play: $('.al-play'), msg: $('.cp-lt-msg'), nm: $('.cp-lt-nm'), opt: $('.cp-lt-opt'), air: $('.cp-lt-air'), cd: $('.cp-lt-cd'), auto: $('.cp-lt-auto') };
  const state = { view: 'machine', light: 'duv', field: 0, fieldT: 0, done: 0, wstep: 0, wp: 1, wauto: false, labels: true, playing: true, lastMsg: '' };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  function home(v) {
    if (v === 'wafer') { const t = V(0, 0.7, 0); return { p: V(0.22, 0.45, 0.9).normalize().multiplyScalar(fit(9.6, 5.2)).add(t), t }; }
    const t = V(0, 3.9, 0);
    return { p: V(0.35, 0.28, 0.9).normalize().multiplyScalar(fit(8, 8.6)).add(t), t };
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const goHome = (instant) => { const h = home(state.view); flyTo(h.p, h.t, instant); };

  function setView(v, instant) {
    if (v !== 'machine' && v !== 'wafer') return;
    state.view = v;
    mG.visible = v === 'machine'; wG.visible = v === 'wafer';
    root.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-view') === v ? 'true' : 'false'));
    root.classList.toggle('cp-lt-waferview', v === 'wafer');
    goHome(instant);
  }
  function setLight(k) {
    if (!LIGHT[k]) return;
    state.light = k;
    duvG.visible = k === 'duv'; euvG.visible = k === 'euv';
    shot.material.color.setHex(COL[k]);
    raysG.children.forEach((r) => r.material.color.setHex(COL[k]));
    buildSegs(NSEG[k]);
    raysG.children.forEach((r) => r.material.color.setHex(COL[k]));
    root.querySelectorAll('[data-light]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-light') === k ? 'true' : 'false'));
    root.classList.toggle('cp-lt-euv', k === 'euv');
    const L0 = LIGHT[k];
    if (R.nm) R.nm.innerHTML = `${L0.nm} nm<small>${L0.nm} 奈米</small>`;
    if (R.opt) R.opt.innerHTML = L0.optics === 'lens' ? 'Glass lenses<small>玻璃鏡頭</small>' : 'Mirrors<small>反射鏡</small>';
    if (R.air) R.air.innerHTML = L0.air ? 'Air (or water at the lens)<small>空氣（鏡頭下加水）</small>' : 'Vacuum<small>真空</small>';
    if (R.cd) R.cd.innerHTML = `about ${Math.round(cd(k))} nm<small>約 ${Math.round(cd(k))} 奈米</small>`;
  }
  function setWStep(i, instant) {
    state.wstep = Math.max(0, Math.min(4, i)); state.wp = instant ? 1 : 0;
    root.querySelectorAll('[data-wstep]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-wstep')) === state.wstep ? 'true' : 'false'));
    root.querySelectorAll('.cp-wf-panel').forEach((p) => { p.hidden = Number(p.getAttribute('data-panel')) !== state.wstep; });
  }
  function setAuto(v) {
    state.wauto = v;
    if (R.auto) { R.auto.setAttribute('aria-pressed', v ? 'true' : 'false'); R.auto.querySelector('.t').textContent = v ? 'Stop · 停止' : 'Play all five steps · 五步連續播放'; }
    if (v) { setPlaying(true); setView('wafer'); setWStep(0); }
  }
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.getAttribute('data-view'))));
  root.querySelectorAll('[data-light]').forEach((b) => b.addEventListener('click', () => setLight(b.getAttribute('data-light'))));
  root.querySelectorAll('[data-wstep]').forEach((b) => b.addEventListener('click', () => { setAuto(false); setView('wafer'); setWStep(Number(b.getAttribute('data-wstep'))); }));
  if (R.auto) R.auto.addEventListener('click', () => setAuto(!state.wauto));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));

  // =====================================================================
  // 每格
  // =====================================================================
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const fieldPos = (i) => { const f = fields[i % fields.length]; return V((f.x + 13) * k3, WY + 0.005, -(f.y + 16.5) * k3); };
  let T = 0;
  function stepMachine(dt) {
    state.fieldT += dt;
    if (state.fieldT > FIELD_T) {
      state.fieldT = 0; state.done = state.field + 1; state.field = (state.field + 1) % fields.length;
      if (state.field === 0) state.done = 0;
      drawWafer(state.done, state.field);
    }
    const fp = fieldPos(state.field);
    shot.position.copy(fp); shotGlow.position.copy(fp).add(V(0, 0.05, 0));
    const pulse = 0.6 + 0.4 * Math.sin(T * 9);
    shot.material.opacity = 0.9 * pulse; shotGlow.material.opacity = 0.7 * pulse;
    // 最後一段光：從鏡頭（或最後一面反射鏡）收到目前這一格
    if (state.light === 'duv') {
      const top = V(0, 2.35, 0);
      beamD3.position.copy(top).add(fp).multiplyScalar(0.5);
      beamD3.scale.set(1, top.distanceTo(fp) / (2.35 - WY), 1);
      beamD3.quaternion.setFromUnitVectors(V(0, 1, 0), top.clone().sub(fp).normalize());
      lamp.material.opacity = 0.7 + 0.3 * Math.sin(T * 7);
    } else {
      const P = pts.slice(); P[6] = fp;
      const radii = [0.12, 0.22, 0.2, 0.18, 0.15, 0.1];
      for (let i = 0; i < 6; i++) placeBeam(euvBeams[i], P[i], P[i + 1], radii[i]);
      mirrors.forEach(({ m, i }) => {
        const nIn = P[i - 1].clone().sub(P[i]).normalize(), nOut = P[i + 1].clone().sub(P[i]).normalize();
        m.position.copy(P[i]); m.quaternion.setFromUnitVectors(V(0, 1, 0), nIn.add(nOut).normalize());
      });
      drops.forEach((d) => { d.y = (d.y + dt * 0.9) % 1; d.d.position.set(SRC.x, SRC.y + 0.9 - d.y * 1.8, 0); });
      const f = Math.sin(T * 23) > 0.2 ? 1 : 0.35;
      flash.scale.setScalar(0.5 + 0.5 * f); flash.material.opacity = f;
    }
  }
  function stepWafer(dt) {
    if (state.wp < 1) state.wp = Math.min(1, state.wp + dt / WSTEP_T);
    else if (state.wauto) { state.wauto_hold = (state.wauto_hold || 0) + dt; if (state.wauto_hold > 1.2) { state.wauto_hold = 0; if (state.wstep < 4) setWStep(state.wstep + 1); else setAuto(false); } }
    poseWafer();
  }
  function poseWafer() {
    const s = state.wstep + MathUtils.smootherstep(state.wp, 0, 1);
    const coat = clamp01(s), expo = clamp01(s - 1), dev = clamp01(s - 2), etch = clamp01(s - 3), strip = clamp01(s - 4);
    for (const g of segs) {
      let h = coat;
      if (g.exposed) h *= 1 - dev; else h *= 1 - strip;
      g.res.scale.y = Math.max(0.001, h); g.res.position.y = FILM + (RES * h) / 2;
      g.res.visible = h > 0.01;          // 壓扁的薄片頂面還是會畫出顏色，所以高度 0 就藏起來
      g.res.material.color.copy(RES_C).lerp(RES_EXP, g.exposed ? expo : 0);
      const fh = g.exposed ? 1 - etch : 1;
      g.film.scale.y = Math.max(0.001, fh); g.film.position.y = (FILM * fh) / 2;
      g.film.visible = fh > 0.01;
      g.film.material.emissive && g.film.material.emissive.setHex(0x000000);
    }
    const showMask = state.wstep === 1;
    maskW.visible = showMask || (state.wstep === 2 && state.wp < 0.15);
    raysG.visible = state.wstep === 1 && state.wp < 0.98;
    raysG.children.forEach((r, i) => { r.material.opacity = (i % 2 ? 0.12 : 0.5) * (0.6 + 0.4 * Math.sin(T * 8)); });
    filmMat.emissive.setHex(state.wstep === 4 ? 0x1a3a70 : 0x000000);
    filmMat.emissiveIntensity = state.wstep === 4 ? 0.6 * MathUtils.smootherstep(state.wp, 0, 1) : 0;
  }
  function step(dt) {
    if (state.playing) {
      T += dt;
      if (state.view === 'machine') stepMachine(dt); else stepWafer(dt);
    }
    if (state.view === 'wafer') poseWafer();
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(Math.min(1, fly.t), 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, m = state.view === 'machine', w = !m, duv = state.light === 'duv';
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    show(L.srcD, on && m && duv, V(0, 7.95, 0));
    show(L.srcE, on && m && !duv, V(SRC.x - 0.2, SRC.y + 1.2, 0));
    show(L.mask, on && m, V(duv ? 1.0 : 1.3, MASK_Y + (duv ? 0 : 0.42), 1.0), 0);
    show(L.lens, on && m && duv, V(1.0, 3.4, 0.4));
    show(L.mirr, on && m && !duv && !narrow, V(1.9, 3.5, 0.4));
    show(L.vac, on && m && !duv && !narrow, V(2.6, 7.4, 2.3));
    const wh = `Wafer: field ${state.field + 1} of ${fields.length}<small>晶圓：第 ${state.field + 1}／${fields.length} 格</small>`;
    if (L.wafer.innerHTML !== wh) L.wafer.innerHTML = wh;
    show(L.wafer, on && m, V(0, WY, WR + 0.25), 16);
    const s = state.wstep + state.wp;
    show(L.res, on && w && s > 0.3 && s < 4.6, V(-SW / 2 - 0.1, FILM + RES / 2, SD / 2), 0);
    show(L.film, on && w, V(SW / 2 + 0.1, FILM / 2, SD / 2), 0);
    show(L.si, on && w && !narrow, V(0, -0.8, SD / 2));
    show(L.wmask, on && w && maskW.visible, V(-SW / 2 + 0.6, MY + 0.35, 0));
    show(L.light, on && w && raysG.visible, V(-SW / 2 + SW / NSEG[state.light] * 1.5, MY - 0.4, SD / 2), 0);
    [L.res, L.film].forEach((el) => { el.style.marginLeft = ''; });
  }
  function readout() {
    if (!R.msg) return;
    const k = state.view === 'machine' ? `m_${state.light}` : 'w';
    if (k !== state.lastMsg) {
      state.lastMsg = k;
      root.querySelectorAll('[data-msg]').forEach((p) => { p.hidden = p.getAttribute('data-msg') !== k; });
    }
  }

  // =====================================================================
  // 迴圈
  // =====================================================================
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 200) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  let band0 = null;
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1.1 ? 42 : 34;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('cp-narrow', narrow);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  drawWafer(0, 0);
  setLight('duv');
  setView('machine', true);
  setWStep(4, true);
  resize();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    duv: () => { setAuto(false); setView('machine'); setLight('duv'); setPlaying(true); },
    euv: () => { setAuto(false); setView('machine'); setLight('euv'); setPlaying(true); },
    steps: () => setAuto(true),
    fine: () => { setAuto(false); setView('wafer'); setLight(state.light === 'duv' ? 'euv' : 'duv'); setWStep(4, true); },
  };
  root.__lab = {
    camera, controls, state, segs, setView, setLight, setWStep, setAuto, setPlaying,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------------------------------------------------------------
// 頁面下方「在螢幕上曬一張藍曬圖」：2D canvas，不需要 WebGL
// ---------------------------------------------------------------------
function initSun() {
  const box = document.querySelector('[data-chip-sun]');
  if (!box) return;
  const cvs = box.querySelector('.cp-sun-cv'), time = box.querySelector('.cp-sun-time'), gap = box.querySelector('.cp-sun-gap');
  const tOut = box.querySelector('.cp-sun-time-out'), gOut = box.querySelector('.cp-sun-gap-out'), wash = box.querySelector('.cp-sun-wash');
  const text = box.querySelector('.cp-sun-text'), status = box.querySelector('.cp-sun-status');
  const N = 160;
  let maskKey = 'leaf', washed = false;
  const off = document.createElement('canvas'); off.width = off.height = N;
  function drawMask() {
    const g = off.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, N, N);          // 白＝透光
    g.fillStyle = '#000';                                   // 黑＝擋光
    if (maskKey === 'leaf') {
      g.save(); g.translate(N / 2, N / 2); g.rotate(-0.6);
      g.beginPath(); g.moveTo(0, -62); g.bezierCurveTo(40, -40, 40, 30, 0, 62); g.bezierCurveTo(-40, 30, -40, -40, 0, -62); g.fill();
      g.strokeStyle = '#fff'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -55); g.lineTo(0, 55); g.stroke();
      for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(0, i * 14); g.lineTo(22, i * 14 - 14); g.moveTo(0, i * 14); g.lineTo(-22, i * 14 - 14); g.stroke(); }
      g.restore();
    } else if (maskKey === 'circuit') {
      for (let i = 0; i < 7; i++) g.fillRect(14, 16 + i * 20, N - 28, 7);
      for (let i = 0; i < 4; i++) g.fillRect(28 + i * 34, 14, 7, N - 28);
      for (let i = 0; i < 6; i++) g.fillRect(20 + (i * 37) % 110, 26 + (i * 23) % 100, 14, 14);
    } else {
      const t = (text.value || 'CHIP').slice(0, 8).toUpperCase();
      g.font = '900 100px sans-serif';
      const fs = Math.min(72, (100 * N * 0.84) / Math.max(1, g.measureText(t).width));   // 量一下字寬，縮到放得進紙
      g.font = `900 ${fs}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(t, N / 2, N / 2);
    }
    return g.getImageData(0, 0, N, N).data;
  }
  function boxBlur(src, r) {
    if (r < 0.5) return src;
    const rr = Math.round(r), tmp = new Float32Array(N * N), out = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let s = 0, n = 0; for (let k = -rr; k <= rr; k++) { const xx = x + k; if (xx >= 0 && xx < N) { s += src[y * N + xx]; n++; } } tmp[y * N + x] = s / n; }
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let s = 0, n = 0; for (let k = -rr; k <= rr; k++) { const yy = y + k; if (yy >= 0 && yy < N) { s += tmp[yy * N + x]; n++; } } out[y * N + x] = s / n; }
    return out;
  }
  function render() {
    const m = drawMask();
    const trans = new Float32Array(N * N);
    for (let i = 0; i < N * N; i++) trans[i] = m[i * 4] / 255;
    const tb = boxBlur(trans, blurRadius(Number(gap.value)) * (N / 160));
    const minutes = Number(time.value);
    const g = cvs.getContext('2d');
    if (cvs.width !== N) { cvs.width = N; cvs.height = N; }
    const img = g.createImageData(N, N);
    for (let i = 0; i < N * N; i++) {
      const v = tone(minutes, tb[i]);
      let r, gg, b;
      if (washed) { r = 255 + (24 - 255) * v; gg = 255 + (64 - 255) * v; b = 255 + (138 - 255) * v; }          // 洗過：白 → 普魯士藍
      else { r = 214 + (120 - 214) * v; gg = 226 + (128 - 226) * v; b = 150 + (140 - 150) * v; }                // 曬的時候：黃綠 → 灰
      img.data[i * 4] = r; img.data[i * 4 + 1] = gg; img.data[i * 4 + 2] = b; img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    time.style.setProperty('--p', `${(minutes / 40) * 100}%`);
    gap.style.setProperty('--p', `${(Number(gap.value) / 6) * 100}%`);
    tOut.textContent = `${minutes} min · ${minutes} 分鐘`;
    gOut.textContent = `${Number(gap.value)} mm`;
    status.innerHTML = washed ? 'Washed: blue where light reached, white where the mask blocked it<small>洗好了：照到光的地方變藍，被擋住的地方是白的</small>'
      : 'In the sun: the paper slowly turns gray where light reaches it<small>曬太陽中：照到光的地方慢慢變灰</small>';
    wash.textContent = washed ? 'Start again · 重新曬' : 'Wash it · 用水沖洗';
    box.querySelectorAll('[data-mask]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-mask') === maskKey ? 'true' : 'false'));
    text.hidden = maskKey !== 'text';
  }
  const reset = () => { washed = false; render(); };
  box.querySelectorAll('[data-mask]').forEach((b) => b.addEventListener('click', () => { maskKey = b.getAttribute('data-mask'); reset(); }));
  time.addEventListener('input', () => { time.style.setProperty('--p', `${(time.value / 40) * 100}%`); reset(); });
  gap.addEventListener('input', () => { gap.style.setProperty('--p', `${(gap.value / 6) * 100}%`); reset(); });
  text.addEventListener('input', reset);
  wash.addEventListener('click', () => { washed = !washed; render(); });
  render();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSun);
else initSun();

lazyBoot('[data-chiplitho-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
