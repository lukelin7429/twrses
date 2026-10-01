/*
 * 晶片與半導體 · 第三課「沙子怎麼變成晶片？」的 3D 模型（全部自繪示意，大小、比例都不是真的）。
 *
 * 一個機制：晶片的原料是沙子裡的矽。先煉成矽、提純到幾乎每個原子都是矽，再從熔化的矽「拉」出
 *   一整根單晶晶棒，切成薄薄的晶圓；一片晶圓上同時做出幾百顆晶片，最後切開、測試、封裝。
 *
 * 場景是一條沿 +X 排開的「生產線」，六站：
 *   1 石英砂（一堆砂粒）→ 2 電爐（三根電極、發光的爐口，旁邊一堆約 98% 的矽塊）→
 *   3 提純（玻璃鐘罩裡發熱的 U 形細矽棒越長越粗＝多晶矽）→ 4 拉晶（坩堝裡熔化的矽，晶種一邊轉一邊往上拉，晶棒越長越長）→
 *   5 切片（橫躺的晶棒被一排鋼線切開，晶圓一片片疊起來，一片立著看鏡面）→
 *   6 晶片（晶圓上排滿晶片，切開後一顆飛進封裝）。六站排成兩排（後排 1–3、前排 4–6，像讀兩行字）。
 * 每站有自己的進度 p（0–1）；選到那一步時從 0 播到 1，其他站停在完成的樣子。「播放全程」自動一站一站走。
 * 第六站晶圓上的晶片排法用 wafercalc.js 的 countDies（跟頁面下方的計算器同一套），計算器改晶片大小時會發
 *   'chipwafer:die' 事件，3D 的晶圓跟著重排。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/chips && npm run build → assets/js/chip-wafer.js
 * 除錯：document.querySelector('[data-chipwafer-lab]').__lab
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry,
  DirectionalLight, DodecahedronGeometry, Group, HemisphereLight, IcosahedronGeometry, InstancedMesh, MathUtils,
  Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PMREMGenerator, PointLight, Scene,
  SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { glowTex, labeler, lazyBoot, tube } from './common.js';
import { countDies, WAFER_D } from './wafercalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
// 六站排成兩排，像兩行字：後排 1→2→3、前排 4→5→6
const P = [[-7, -3], [0, -3], [7, -3], [-7, 3.2], [0, 3.2], [7, 3.2]].map(([x, z]) => ({ x, z }));
// 每一步的鏡頭：看的高度、要放得下的寬與高
const CAM = [{ y: 0.6, w: 6, h: 3.6 }, { y: 1.6, w: 6.6, h: 5 }, { y: 1.5, w: 5.6, h: 5 }, { y: 2.6, w: 5.6, h: 7.2 }, { y: 0.9, w: 7, h: 4 }, { y: 1.0, w: 7, h: 4.6 }];
const STEP_T = 5.5;          // 每站動畫幾秒
const HOLD_T = 2.2;          // 播放全程時，每站做完停幾秒
const WR = 1.6;              // 晶圓在場景裡的半徑（＝150 mm）
const IR = 0.75;             // 晶棒半徑

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
  scene.environmentIntensity = 0.55;
  const camera = new PerspectiveCamera(34, 1, 0.1, 300);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 90;
  controls.maxPolarAngle = Math.PI * 0.48;
  scene.add(new HemisphereLight(0xe6efff, 0x1a2230, 0.8));
  scene.add(new AmbientLight(0xffffff, 0.15));
  const sun = new DirectionalLight(0xffffff, 1.2); sun.position.set(-6, 12, 9); scene.add(sun);
  const dummy = new Object3D();
  const steps = JSON.parse(root.getAttribute('data-steps') || '[]');

  // 地板與生產線
  scene.add(at(new Mesh(new BoxGeometry(22.5, 0.16, 13.6), new MeshStandardMaterial({ color: 0x16223a, roughness: 0.85, metalness: 0 })), 0, -0.08, 0.1));
  const arrowMat = new MeshBasicMaterial({ color: 0x3a5a8c });
  const arrow = (a, b) => {
    scene.add(tube(a, b, 0.04, arrowMat));
    const head = new Mesh(new ConeGeometry(0.16, 0.4, 12), arrowMat);
    head.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
    scene.add(at(head, b.x, b.y, b.z));
  };
  arrow(V(P[0].x + 2.3, 0.02, P[0].z + 1.9), V(P[1].x - 2.3, 0.02, P[1].z + 1.9));
  arrow(V(P[1].x + 2.3, 0.02, P[1].z + 1.9), V(P[2].x - 2.3, 0.02, P[2].z + 1.9));
  arrow(V(P[2].x - 1.0, 0.02, -0.3), V(P[3].x + 1.0, 0.02, 0.5));
  arrow(V(P[3].x + 2.3, 0.02, P[3].z + 2.0), V(P[4].x - 2.3, 0.02, P[4].z + 2.0));
  arrow(V(P[4].x + 2.3, 0.02, P[4].z + 2.0), V(P[5].x - 2.3, 0.02, P[5].z + 2.0));
  const hotMat = (c, k = 1) => new MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: k, roughness: 0.5 });
  const glow = glowTex('rgba(255,150,60,.85)', 'rgba(255,90,20,0)');
  const glowSprite = (s) => { const g = new Sprite(new SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: AdditiveBlending })); g.scale.setScalar(s); return g; };
  const siMat = new MeshStandardMaterial({ color: 0x8e99ab, metalness: 0.9, roughness: 0.28 });

  // ---------- 1 石英砂 ----------
  const s1 = new Group(); scene.add(at(s1, P[0].x, 0, P[0].z));
  const NG = 900;
  const grains = new InstancedMesh(new IcosahedronGeometry(0.07, 0), new MeshStandardMaterial({ roughness: 0.8 }), NG);
  const sandCols = [0xe8d6a8, 0xdcc38c, 0xf1e6c8, 0xcdb27a, 0xffffff];
  for (let i = 0; i < NG; i++) {
    const r = Math.sqrt(Math.random()) * 1.7, a = Math.random() * Math.PI * 2;
    const hmax = 1.25 * (1 - r / 1.75);
    dummy.position.set(Math.cos(a) * r, Math.random() * hmax + 0.04, Math.sin(a) * r);
    dummy.rotation.set(Math.random() * 3, Math.random() * 3, 0); dummy.scale.setScalar(0.7 + Math.random() * 0.8);
    dummy.updateMatrix(); grains.setMatrixAt(i, dummy.matrix);
    grains.setColorAt(i, new Color(sandCols[i % sandCols.length]));
  }
  s1.add(grains);
  for (let i = 0; i < 4; i++) {
    const q = new Mesh(new IcosahedronGeometry(0.22, 0), new MeshStandardMaterial({ color: 0xf4f8ff, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.1 }));
    s1.add(at(q, 1.9 + (i % 2) * 0.45, 0.2, -0.6 + i * 0.4));
  }

  // ---------- 2 電爐 ----------
  const s2 = new Group(); scene.add(at(s2, P[1].x, 0, P[1].z));
  const steel = new MeshStandardMaterial({ color: 0x3a3f4b, metalness: 0.6, roughness: 0.45 });
  s2.add(at(new Mesh(new CylinderGeometry(1.15, 1.25, 1.5, 32, 1, true), steel), -0.6, 0.75, 0));
  s2.add(at(new Mesh(new CylinderGeometry(1.25, 1.25, 0.1, 32), steel), -0.6, 0.05, 0));
  const melt2 = new Mesh(new CircleGeometry(1.1, 32), hotMat(0xff7a2a, 1.4)); melt2.rotation.x = -Math.PI / 2; s2.add(at(melt2, -0.6, 1.25, 0));
  const g2 = glowSprite(3.2); s2.add(at(g2, -0.6, 1.6, 0));
  const pl2 = new PointLight(0xff8a3a, 6, 6); s2.add(at(pl2, -0.6, 2.0, 0));
  const graphite = new MeshStandardMaterial({ color: 0x23262c, roughness: 0.6, metalness: 0.3 });
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    s2.add(at(new Mesh(new CylinderGeometry(0.16, 0.16, 2.4, 16), graphite), -0.6 + Math.cos(a) * 0.5, 2.3, Math.sin(a) * 0.5));
  }
  const lumps = new InstancedMesh(new DodecahedronGeometry(0.2, 0), siMat, 26);
  for (let i = 0; i < 26; i++) {
    const r = Math.sqrt(Math.random()) * 0.75, a = Math.random() * Math.PI * 2;
    dummy.position.set(1.6 + Math.cos(a) * r, 0.15 + Math.random() * 0.45 * (1 - r), Math.sin(a) * r);
    dummy.rotation.set(Math.random() * 3, Math.random() * 3, 0); dummy.scale.setScalar(0.7 + Math.random() * 0.6);
    dummy.updateMatrix(); lumps.setMatrixAt(i, dummy.matrix);
  }
  s2.add(lumps);
  const sparks = Array.from({ length: 24 }, () => { const s = glowSprite(0.18); s2.add(s); return { s, t: Math.random() }; });

  // ---------- 3 提純（多晶矽棒在鐘罩裡長粗） ----------
  const s3 = new Group(); scene.add(at(s3, P[2].x, 0, P[2].z));
  s3.add(at(new Mesh(new CylinderGeometry(1.5, 1.5, 0.2, 40), steel), 0, 0.1, 0));
  const jar = new Mesh(new CylinderGeometry(1.3, 1.3, 2.2, 40, 1, true), new MeshStandardMaterial({ color: 0xcfe4ff, transparent: true, opacity: 0.16, roughness: 0.05, depthWrite: false }));
  s3.add(at(jar, 0, 1.3, 0));
  const dome = new Mesh(new SphereGeometry(1.3, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), jar.material); s3.add(at(dome, 0, 2.4, 0));
  const rodMat = new MeshStandardMaterial({ color: 0xa7b0bf, metalness: 0.85, roughness: 0.3, emissive: 0xff8a3a, emissiveIntensity: 0.35 });
  const rods = [];
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2 + 0.4, cx = Math.cos(a) * 0.6, cz = Math.sin(a) * 0.6, dx = -Math.sin(a) * 0.28, dz = Math.cos(a) * 0.28;
    const legA = at(new Mesh(new CylinderGeometry(1, 1, 1.9, 16), rodMat), cx - dx, 1.15, cz - dz);
    const legB = at(new Mesh(new CylinderGeometry(1, 1, 1.9, 16), rodMat), cx + dx, 1.15, cz + dz);
    const top = tube(V(cx - dx, 2.1, cz - dz), V(cx + dx, 2.1, cz + dz), 1, rodMat);
    s3.add(legA, legB, top);
    rods.push(legA, legB);
    rods.push({ isTop: true, m: top });
  }
  const pl3 = new PointLight(0xff9a50, 2.5, 5); s3.add(at(pl3, 0, 1.4, 0));

  // ---------- 4 拉晶（柴可拉斯基法） ----------
  const s4 = new Group(); scene.add(at(s4, P[3].x, 0, P[3].z));
  s4.add(at(new Mesh(new CylinderGeometry(1.25, 1.3, 1.0, 40, 1, true), new MeshStandardMaterial({ color: 0xe9eef5, roughness: 0.3, side: 2 })), 0, 0.5, 0));
  s4.add(at(new Mesh(new CylinderGeometry(1.3, 1.3, 0.08, 40), new MeshStandardMaterial({ color: 0xe9eef5, roughness: 0.3 })), 0, 0.04, 0));
  const heater = new Mesh(new CylinderGeometry(1.45, 1.45, 0.8, 40, 1, true), hotMat(0xff5a1a, 0.6)); heater.material.side = 2; heater.material.transparent = true; heater.material.opacity = 0.35;
  s4.add(at(heater, 0, 0.5, 0));
  const melt4 = new Mesh(new CircleGeometry(1.2, 40), hotMat(0xff8a2a, 1.5)); melt4.rotation.x = -Math.PI / 2; s4.add(melt4);
  const g4 = glowSprite(2.6); s4.add(g4);
  const pl4 = new PointLight(0xff8a3a, 5, 5); s4.add(pl4);
  const ingot = new Group(); s4.add(ingot);
  const neck = new Mesh(new CylinderGeometry(0.06, 0.06, 0.5, 12), siMat);
  const shoulder = new Mesh(new ConeGeometry(IR, 0.45, 40, 1, true), siMat); shoulder.material.side = 2;
  const body = new Mesh(new CylinderGeometry(IR, IR, 1, 48), siMat);
  const bodyTop = new Mesh(new CircleGeometry(IR, 40), siMat);
  ingot.add(neck, shoulder, body);
  const rod4 = new Mesh(new CylinderGeometry(0.035, 0.035, 1.6, 8), new MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.8, roughness: 0.3 }));
  s4.add(rod4);
  const ring4 = new Mesh(new CylinderGeometry(IR + 0.04, IR + 0.04, 0.05, 40, 1, true), hotMat(0xffc070, 1.2)); ring4.material.side = 2; s4.add(ring4);
  void bodyTop;

  // ---------- 5 切片 ----------
  const s5 = new Group(); scene.add(at(s5, P[4].x, 0, P[4].z));
  const ingot5 = new Mesh(new CylinderGeometry(IR, IR, 1, 48), siMat); ingot5.rotation.z = Math.PI / 2; s5.add(ingot5);
  s5.add(at(new Mesh(new BoxGeometry(3.2, 0.25, 1.4), steel), -0.7, 0.12, 0));
  const wireMat = new MeshBasicMaterial({ color: 0xd8f3ff });
  const wires = [];
  for (let k = 0; k < 7; k++) { const w = new Mesh(new BoxGeometry(0.012, 0.012, 2.2), wireMat); s5.add(w); wires.push(w); }
  const mirror = new MeshStandardMaterial({ color: 0xe6ecf5, metalness: 1, roughness: 0.12 });
  const waferGeo = new CylinderGeometry(IR, IR, 0.03, 48);
  const stack = []; for (let k = 0; k < 14; k++) { const w = new Mesh(waferGeo, mirror); s5.add(w); stack.push(w); }
  const showWafer = new Mesh(waferGeo, mirror); showWafer.rotation.set(Math.PI / 2 - 0.25, 0, 0.75); s5.add(at(showWafer, 1.9, 0.85, 0.2));   // 轉一點，看得出是薄圓片

  // ---------- 6 晶圓上的晶片 ----------
  const s6 = new Group(); scene.add(at(s6, P[5].x, 0, P[5].z));
  const waferG = new Group(); waferG.rotation.x = -0.55; s6.add(at(waferG, -0.4, 1.2, 0));
  waferG.add(new Mesh(new CylinderGeometry(WR, WR, 0.04, 96), mirror).rotateX(Math.PI / 2));
  let dieMesh = null, dieList = [], dieSize = { w: 10, h: 10 }, pickIdx = 0;
  const dieMat = new MeshStandardMaterial({ metalness: 0.6, roughness: 0.25 });
  const hue = new Color();
  function buildDies(w, h) {
    dieSize = { w, h };
    if (dieMesh) { waferG.remove(dieMesh); dieMesh.dispose(); }
    const r = countDies(w, h);
    dieList = r.dies.filter((d) => d.full);
    const k = WR / (WAFER_D / 2);
    dieMesh = new InstancedMesh(new BoxGeometry(w * k, h * k, 0.02), dieMat, dieList.length);
    dieList.forEach((d, i) => {
      d.cx = (d.x + w / 2) * k; d.cy = (d.y + h / 2) * k;
      const ang = Math.atan2(d.cy, d.cx), rr = Math.hypot(d.cx, d.cy) / WR;
      hue.setHSL((0.55 + 0.25 * Math.sin(ang * 2) + 0.15 * rr) % 1, 0.55, 0.42 + 0.1 * Math.cos(ang * 3));
      dieMesh.setColorAt(i, hue);
    });
    let best = 1e9;
    dieList.forEach((d, i) => { const q = Math.hypot(d.cx - 0.5, d.cy + 0.4); if (q < best) { best = q; pickIdx = i; } });
    waferG.add(dieMesh);
    root.__dies = r;
  }
  const pkg = new Group(); s6.add(at(pkg, 2.3, 0.18, 0.9));
  pkg.add(new Mesh(new BoxGeometry(0.9, 0.18, 0.9), new MeshStandardMaterial({ color: 0x1a1c22, roughness: 0.5 })));
  const pinMat = new MeshStandardMaterial({ color: 0xd8b25a, metalness: 0.9, roughness: 0.3 });
  for (let i = 0; i < 5; i++) for (const s of [-1, 1]) {
    pkg.add(at(new Mesh(new BoxGeometry(0.06, 0.04, 0.22), pinMat), -0.32 + i * 0.16, -0.06, s * 0.52));
    pkg.add(at(new Mesh(new BoxGeometry(0.22, 0.04, 0.06), pinMat), s * 0.52, -0.06, -0.32 + i * 0.16));
  }
  const pickMesh = new Mesh(new BoxGeometry(1, 1, 0.02), new MeshStandardMaterial({ color: 0x3a8ad6, metalness: 0.6, roughness: 0.25 }));
  s6.add(pickMesh);
  buildDies((window.__chipDie || {}).w || 10, (window.__chipDie || {}).h || 10);

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const stLab = steps.map((s, i) => lab.add('cp-lb cp-lb-g cp-st', `${i + 1} ${s.short_en}<small>${s.short_zh}</small>`));
  const stPos = [V(0, 1.9, 0), V(-2.4, 2.4, 0), V(1.9, 3.0, 0), V(1.9, 1.9, 0), V(-0.4, 1.7, 0), V(-0.4, 2.9, 0)].map((v, i) => v.add(V(P[i].x, 0, P[i].z)));
  const W = (i, x, y, z) => V(P[i].x + x, y, P[i].z + z);
  const extra = {
    lumps: lab.add('cp-lb', 'Silicon, about 98% pure<small>純度約 98% 的矽</small>'),
    seed: lab.add('cp-lb cp-lb-el', 'Seed crystal, turning<small>晶種，一邊轉</small>'),
    melt: lab.add('cp-lb cp-lb-led', 'Melted silicon<small>熔化的矽</small>'),
    saw: lab.add('cp-lb cp-lb-el', 'Wire saw<small>鋼線鋸</small>'),
    pkg: lab.add('cp-lb', 'Packaged chip<small>封裝好的晶片</small>'),
    dies: lab.add('cp-lb cp-lb-g', ''),
  };

  // =====================================================================
  // 狀態與控制
  // =====================================================================
  const R = { play: $('.al-play'), tour: $('.cp-wf-tour'), msg: $('.cp-msg') };
  const state = { step: -1, prog: [1, 1, 1, 1, 1, 1], t: 0, tour: false, hold: 0, labels: true, playing: true };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  function home(step) {
    if (step < 0) { const t = V(0, 0.2, 0.6); return { p: V(0, 0.72, 0.7).normalize().multiplyScalar(fit(22, 12.5)).add(t), t }; }
    const c = CAM[step], t = V(P[step].x, c.y, P[step].z);
    return { p: V(0.15, 0.42, 0.9).normalize().multiplyScalar(fit(c.w, c.h)).add(t), t };
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const goHome = (instant) => { const h = home(state.step); flyTo(h.p, h.t, instant); };

  function setStep(i, instant) {
    state.step = i;
    if (i >= 0) state.prog[i] = 0;
    state.hold = 0;
    root.querySelectorAll('[data-step]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-step')) === i ? 'true' : 'false'));
    root.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', (b.getAttribute('data-view') === 'line') === (i < 0) ? 'true' : 'false'));
    root.querySelectorAll('.cp-wf-panel').forEach((p) => { p.hidden = Number(p.getAttribute('data-panel')) !== i; });
    root.classList.toggle('cp-wf-overview', i < 0);
    goHome(instant);
  }
  function setTour(v) {
    state.tour = v;
    if (R.tour) { R.tour.setAttribute('aria-pressed', v ? 'true' : 'false'); R.tour.querySelector('.t').textContent = v ? 'Stop the tour · 停止' : 'Play the whole journey · 播放全程'; }
    if (v) { setPlaying(true); setStep(0); }
  }
  root.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => { setTour(false); setStep(Number(b.getAttribute('data-step'))); }));
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => {
    setTour(false);
    if (b.getAttribute('data-view') === 'line') setStep(-1); else setStep(Math.max(0, state.step));
  }));
  if (R.tour) R.tour.addEventListener('click', () => setTour(!state.tour));
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
  document.addEventListener('chipwafer:die', (e) => { if (e.detail) buildDies(e.detail.w, e.detail.h); });

  // =====================================================================
  // 每格
  // =====================================================================
  const ease = (x) => MathUtils.smootherstep(Math.min(1, Math.max(0, x)), 0, 1);
  function pose(dt) {
    const T = state.t;
    // 2 電爐：火光閃爍、火花往上
    const fl = 0.85 + 0.15 * Math.sin(T * 13) * Math.sin(T * 7.3);
    melt2.material.emissiveIntensity = 1.3 * fl; pl2.intensity = 6 * fl; g2.material.opacity = 0.75 * fl;
    sparks.forEach((sp, i) => {
      sp.t = (sp.t + dt * (0.4 + (i % 5) * 0.08)) % 1;
      const a = i * 2.4;
      sp.s.position.set(-0.6 + Math.cos(a) * 0.6 * (1 - sp.t * 0.5), 1.3 + sp.t * 2.2, Math.sin(a) * 0.6);
      sp.s.material.opacity = (1 - sp.t) * 0.9;
    });
    // 3 提純：矽棒變粗
    const p3 = ease(state.prog[2]), rr = 0.05 + 0.15 * p3;
    for (const r of rods) { if (r.isTop) r.m.scale.set(rr, 1, rr); else r.scale.set(rr, 1, rr); }
    rodMat.emissiveIntensity = 0.25 + 0.2 * Math.sin(T * 2);
    // 4 拉晶：晶棒越拉越長、一邊轉，熔湯越來越低
    const p4 = ease(state.prog[3]);
    const meltY = 0.85 - 0.45 * p4, L = 0.05 + 2.5 * p4;
    melt4.position.y = meltY; g4.position.y = meltY + 0.2; pl4.position.y = meltY + 0.8; ring4.position.y = meltY + 0.02;
    body.scale.y = L; body.position.y = meltY + L / 2;
    shoulder.position.y = meltY + L + 0.225; neck.position.y = meltY + L + 0.45 + 0.25;
    ingot.rotation.y += dt * 1.2;
    rod4.position.y = meltY + L + 0.95 + 0.8;
    // 5 切片：鋼線往下切，晶圓一片片疊起來
    const p5 = ease(state.prog[4]);
    const ingL = 2.2 * (1 - 0.55 * p5);
    ingot5.scale.y = ingL; ingot5.position.set(-1.6 + ingL / 2, IR + 0.25, 0);
    wires.forEach((w, k) => { w.position.set(-1.6 + ingL + 0.06 + k * 0.05, IR + 0.25 + IR * 1.2 * (1 - (state.prog[4] * 7 % 1)), 0); w.visible = state.prog[4] < 1; });
    const nShow = Math.round(14 * p5);
    stack.forEach((w, k) => { w.visible = k < nShow; w.position.set(1.0, 0.27 + k * 0.035, -0.9); });
    // 6 晶片：切開（彼此分開一點、浮起）＋一顆飛進封裝
    const p6 = ease(state.prog[5]);
    const sep = 1 + 0.12 * ease(p6 * 2), lift = 0.03 + 0.06 * ease(p6 * 2);
    const kk = WR / (WAFER_D / 2);
    if (dieMesh) {
      dieList.forEach((d, i) => {
        dummy.position.set(d.cx * sep, d.cy * sep, lift);
        dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(i === pickIdx && p6 > 0.55 ? 0.0001 : 1);
        dummy.updateMatrix(); dieMesh.setMatrixAt(i, dummy.matrix);
      });
      dieMesh.instanceMatrix.needsUpdate = true;
    }
    const d = dieList[pickIdx];
    pickMesh.scale.set(dieSize.w * kk, dieSize.h * kk, 1);
    const fly6 = ease((p6 - 0.55) / 0.4);
    pickMesh.visible = p6 > 0.55 && d;
    if (d && pickMesh.visible) {
      const from = waferG.localToWorld(V(d.cx * sep, d.cy * sep, lift)).sub(s6.position);
      const to = V(2.3, 0.3, 0.9);
      pickMesh.position.lerpVectors(from, to, fly6); pickMesh.position.y += Math.sin(fly6 * Math.PI) * 1.2;
      pickMesh.rotation.set(-0.55 * (1 - fly6) - Math.PI / 2 * fly6, 0, 0);
      pickMesh.visible = fly6 < 0.98;
    }
  }
  function step(dt) {
    if (state.playing) {
      state.t += dt;
      if (state.step >= 0 && state.prog[state.step] < 1) state.prog[state.step] = Math.min(1, state.prog[state.step] + dt / STEP_T);
      else if (state.tour && state.step >= 0) {
        state.hold += dt;
        if (state.hold > HOLD_T) { if (state.step < 5) setStep(state.step + 1); else { setTour(false); setStep(-1); } }
      }
    }
    pose(state.playing ? dt : 0);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, ov = state.step < 0;
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    stLab.forEach((el, i) => {
      const cls = `al-lab cp-lb cp-lb-g cp-st${i === state.step ? ' cp-st-on' : ''}`;
      if (el.className !== cls) el.className = cls;
      show(el, on && (ov || i === state.step), stPos[i]);
    });
    const near = (i) => on && !ov && state.step === i && !narrow;
    show(extra.lumps, near(1), W(1, 1.6, 1.0, 0));
    show(extra.melt, on && !ov && state.step === 3, W(3, -1.2, melt4.position.y + 0.1, 1.0), 10);
    show(extra.seed, near(3), W(3, 0.2, neck.position.y + 0.1, 0), 0);
    show(extra.saw, near(4) && state.prog[4] < 1, W(4, -1.6 + ingot5.scale.y + 0.1, IR * 2 + 0.6, 0));
    show(extra.pkg, on && !ov && state.step === 5, W(5, 2.3, 0.75, 0.9));
    const r = root.__dies;
    const dh = r ? `${r.full.toLocaleString('en-US')} chips of ${dieSize.w} × ${dieSize.h} mm<small>${r.full.toLocaleString('en-US')} 顆晶片</small>` : '';
    if (extra.dies.innerHTML !== dh) extra.dies.innerHTML = dh;
    show(extra.dies, on && !ov && state.step === 5, W(5, -0.4, -0.15, 1.6));
  }
  function readout() {
    if (R.msg) R.msg.hidden = state.step >= 0;
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

  setStep(-1, true);
  resize();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    furnace: () => { setTour(false); setPlaying(true); setStep(1); },
    pull: () => { setTour(false); setPlaying(true); setStep(3); },
    slice: () => { setTour(false); setPlaying(true); setStep(4); },
    dies: () => { setTour(false); setPlaying(true); setStep(5); },
    tour: () => setTour(true),
  };
  root.__lab = {
    camera, controls, state, setStep, setTour, setPlaying, buildDies,
    demo: (v) => DEMO[v] && DEMO[v](),
    finish: () => { for (let i = 0; i < 6; i++) state.prog[i] = 1; },
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------------------------------------------------------------
// 頁面下方「一片晶圓切得出幾顆晶片？」：2D canvas，不需要 WebGL
// ---------------------------------------------------------------------
function initCalc() {
  const box = document.querySelector('[data-chip-dies]');
  if (!box) return;
  const cvs = box.querySelector('.cp-dpw-cv'), size = box.querySelector('.cp-dpw-size'), out = box.querySelector('.cp-dpw-size-out');
  const nFull = box.querySelectorAll('.cp-dpw-full'), nPart = box.querySelectorAll('.cp-dpw-part'), used = box.querySelectorAll('.cp-dpw-used'), approx = box.querySelectorAll('.cp-dpw-approx');
  let w = 10, h = 10;
  function draw(r) {
    const css = cvs.clientWidth || 320;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (cvs.width !== Math.round(css * dpr) || cvs.height !== Math.round(css * dpr)) { cvs.width = Math.round(css * dpr); cvs.height = Math.round(css * dpr); }
    const g = cvs.getContext('2d'), S = cvs.width, k = (S * 0.46) / (WAFER_D / 2), c = S / 2;
    g.clearRect(0, 0, S, S);
    g.fillStyle = '#c9d2de'; g.beginPath(); g.arc(c, c, (WAFER_D / 2) * k, 0, Math.PI * 2); g.fill();
    g.save(); g.beginPath(); g.arc(c, c, (WAFER_D / 2) * k, 0, Math.PI * 2); g.clip();
    for (const d of r.dies) {
      g.fillStyle = d.full ? '#2f6fd6' : 'rgba(120,130,150,.55)';
      g.fillRect(c + d.x * k, c - (d.y + h) * k, Math.max(0.6, w * k), Math.max(0.6, h * k));
    }
    g.restore();
    g.strokeStyle = '#5f7290'; g.lineWidth = Math.max(1, S / 300); g.beginPath(); g.arc(c, c, (WAFER_D / 2) * k, 0, Math.PI * 2); g.stroke();
    // 12 吋晶圓用的「缺口」（notch）
    g.fillStyle = '#ffffff'; g.beginPath(); g.arc(c, c + (WAFER_D / 2) * k, S * 0.012, 0, Math.PI * 2); g.fill();
  }
  function update() {
    const r = countDies(w, h);
    const loc = (v) => Math.round(v).toLocaleString('en-US');
    nFull.forEach((el) => { el.textContent = loc(r.full); });
    nPart.forEach((el) => { el.textContent = loc(r.partial); });
    used.forEach((el) => { el.textContent = `${(r.used * 100).toFixed(0)}%`; });
    approx.forEach((el) => { el.textContent = loc(r.approx); });
    out.textContent = `${w} × ${h} mm`;
    box.querySelectorAll('[data-die]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-die') === `${w}x${h}` ? 'true' : 'false'));
    draw(r);
    window.__chipDie = { w, h };   // 3D 晚一點才初始化時，用這個起始
    document.dispatchEvent(new CustomEvent('chipwafer:die', { detail: { w, h } }));
  }
  size.addEventListener('input', () => { w = h = Number(size.value); size.style.setProperty('--p', `${((w - 2) / 28) * 100}%`); update(); });
  box.querySelectorAll('[data-die]').forEach((b) => b.addEventListener('click', () => {
    const [a, c] = b.getAttribute('data-die').split('x').map(Number); w = a; h = c;
    if (a === c) { size.value = a; size.style.setProperty('--p', `${((a - 2) / 28) * 100}%`); }
    update();
  }));
  new ResizeObserver(() => draw(countDies(w, h))).observe(cvs);
  update();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCalc);
else initCalc();

lazyBoot('[data-chipwafer-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
