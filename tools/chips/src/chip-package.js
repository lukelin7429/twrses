/*
 * 晶片與半導體 · 第六課「先進封裝：為什麼要把晶片疊在一起？」的 3D 模型（全部自繪示意，不是真實比例）。
 *
 * 一個機制：晶片之間的路越短，資料跑得越快、越省電。三種放法——
 *   board「分開放」：運算晶片和記憶體各自封裝，分開焊在電路板上，資料走板子上長長的線。
 *   side 「並排（2.5D）」：裸晶片並排放在同一塊中介層（interposer）上，走中介層裡很短的細線；整組再放到基板上。
 *   stack「疊起來（3D）」：記憶體晶片一層層疊起來，用穿過晶片的矽穿孔（TSV）上下連，緊貼著運算晶片。
 *   「拆開」滑桿把每一層上下拉開（爆炸圖）：電路板 → 錫球 → 基板 → 中介層 → 晶片。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/chips && npm run build → assets/js/chip-package.js
 * 除錯：document.querySelector('[data-chippackage-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, InstancedMesh, MathUtils,
  Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { MODES, pathMm, shorter, dieCount, fmtMm, barFrac, FIELD_MM2, MAX_LAYERS } from './packcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.55, ...o });
const C = { pcb: 0x1f7a4a, sub: 0x2f9a60, inter: 0x8fa6c8, logic: 0x3d6fd8, mem: 0x8a5ad6, pkg: 0x22262e, ball: 0xcfd6e0, gold: 0xe9b949 };
const STACK_N = 8;

// 一排排錫球
function balls(w, d, pitch, r, y) {
  const nx = Math.floor(w / pitch), nz = Math.floor(d / pitch);
  const m = new InstancedMesh(new SphereGeometry(r, 8, 6), std(C.ball, { metalness: 0.7, roughness: 0.3 }), nx * nz);
  const m4 = new Matrix4(); let i = 0;
  for (let ix = 0; ix < nx; ix++) for (let iz = 0; iz < nz; iz++) { m4.makeTranslation((ix - (nx - 1) / 2) * pitch, y, (iz - (nz - 1) / 2) * pitch); m.setMatrixAt(i++, m4); }
  return m;
}
// 沿折線走的資料小點
function makeDots(n, color) {
  const m = new InstancedMesh(new SphereGeometry(0.045, 10, 8), new MeshBasicMaterial({ color }), n);
  m.frustumCulled = false; return m;
}
function along(pts, u, out) {
  let L = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const l = pts[i].distanceTo(pts[i - 1]); seg.push(l); L += l; }
  let d = (((u % 1) + 1) % 1) * L;
  for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) return out.lerpVectors(pts[i], pts[i + 1], seg[i] ? Math.min(1, d / seg[i]) : 0); d -= seg[i]; }
  return out;
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
  scene.background = new Color(0x0e1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 0.7, 0);
  const homePos = () => TARGET.clone().add(V(3.2, 5.2, 8.6).multiplyScalar(camera.aspect < 0.85 ? 1.55 : camera.aspect < 1.2 ? 1.25 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 26; controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sun = new DirectionalLight(0xffffff, 1.15); sun.position.set(4, 9, 6); scene.add(sun);

  // 電路板（三種放法共用）
  const pcb = at(new Mesh(new BoxGeometry(8.4, 0.14, 5.2), std(C.pcb, { roughness: 0.8 })), 0, -0.07, 0); scene.add(pcb);

  // ---------------- board：三個各自封裝的晶片 ----------------
  const gBoard = new Group(); scene.add(gBoard);
  const PK = [{ x: -2.6, w: 1.7, c: C.logic, name: 'cpu' }, { x: 2.3, z: -1.2, w: 1.3, c: C.mem }, { x: 2.3, z: 1.2, w: 1.3, c: C.mem }];
  const boardParts = PK.map((p) => {
    const g = new Group(); at(g, p.x, 0, p.z || 0); gBoard.add(g);
    const bl = balls(p.w * 0.9, p.w * 0.9, 0.22, 0.06, 0.06); g.add(bl);
    const sub = at(new Mesh(new BoxGeometry(p.w, 0.08, p.w), std(C.sub)), 0, 0.16, 0); g.add(sub);
    const die = at(new Mesh(new BoxGeometry(p.w * 0.5, 0.06, p.w * 0.5), std(p.c, { metalness: 0.3 })), 0, 0.23, 0); g.add(die);
    const lid = at(new Mesh(new BoxGeometry(p.w * 0.92, 0.2, p.w * 0.92), std(C.pkg, { transparent: true, opacity: 0.92 })), 0, 0.3, 0); g.add(lid);
    return { g, bl, sub, die, lid };
  });
  const TR = [[V(-1.75, 0.012, -0.2), V(0.2, 0.012, -0.2), V(0.2, 0.012, -1.2), V(1.65, 0.012, -1.2)], [V(-1.75, 0.012, 0.2), V(0.2, 0.012, 0.2), V(0.2, 0.012, 1.2), V(1.65, 0.012, 1.2)]];
  for (const t of TR) for (let i = 1; i < t.length; i++) {
    const a = t[i - 1], b = t[i], len = a.distanceTo(b);
    const m = at(new Mesh(new BoxGeometry(Math.abs(b.x - a.x) + 0.05, 0.012, Math.abs(b.z - a.z) + 0.05), std(C.gold, { metalness: 0.7, roughness: 0.3 })), (a.x + b.x) / 2, 0.008, (a.z + b.z) / 2);
    if (len > 0) gBoard.add(m);
  }
  const dotsBoard = makeDots(14, 0xfff2a0); gBoard.add(dotsBoard);

  // ---------------- side／stack：一個封裝裡放好幾顆 ----------------
  const gPack = new Group(); scene.add(gPack);
  const L1 = balls(3.6, 3.6, 0.3, 0.08, 0.08); gPack.add(L1);                                  // 錫球
  const L2 = at(new Mesh(new BoxGeometry(4.0, 0.14, 4.0), std(C.sub)), 0, 0.23, 0); gPack.add(L2);          // 基板
  const L3 = balls(2.9, 2.9, 0.16, 0.035, 0.335); gPack.add(L3);                               // 凸塊
  const L4 = at(new Mesh(new BoxGeometry(3.2, 0.07, 3.2), std(C.inter, { metalness: 0.5, roughness: 0.3 })), 0, 0.405, 0); gPack.add(L4);   // 中介層
  const L5 = balls(2.8, 2.8, 0.1, 0.018, 0.458); gPack.add(L5);                                // 微凸塊
  const logic = at(new Mesh(new BoxGeometry(1.5, 0.09, 1.7), std(C.logic, { metalness: 0.35 })), -0.55, 0.52, 0); gPack.add(logic);
  // 記憶體：並排時 4 顆攤平；疊起來時 2 疊各 8 層
  const MEM_POS = [[0.72, -0.62], [0.72, 0.62], [1.22, -0.62], [1.22, 0.62]];
  const memFlat = MEM_POS.map(([x, z]) => { const m = at(new Mesh(new BoxGeometry(0.42, 0.07, 1.0), std(C.mem, { metalness: 0.3 })), x, 0.51, z); gPack.add(m); return m; });
  const STK = [[0.95, -0.62], [0.95, 0.62]];
  const memStack = STK.map(([x, z]) => Array.from({ length: STACK_N }, (_, k) => { const m = at(new Mesh(new BoxGeometry(0.8, 0.05, 1.0), std(k % 2 ? 0x9a6ae6 : C.mem, { metalness: 0.3 })), x, 0.5 + k * 0.06, z); gPack.add(m); return m; }));
  const tsv = STK.map(([x, z]) => { const g = new Group(); for (let i = 0; i < 6; i++) { const c = new Mesh(new CylinderGeometry(0.014, 0.014, 1, 6), std(C.gold, { metalness: 0.8, roughness: 0.25, emissive: 0x4a3200 })); at(c, x - 0.3 + (i % 3) * 0.3, 0, z - 0.25 + Math.floor(i / 3) * 0.5); g.add(c); } gPack.add(g); return g; });
  const dotsPack = makeDots(16, 0xfff2a0); gPack.add(dotsPack);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    pcb: lab.add('cp-lb', 'Circuit board<small>電路板</small>'),
    cpu: lab.add('cp-lb cp-pk-lb-logic', 'Logic chip in its own package<small>運算晶片，自己一個封裝</small>'),
    memb: lab.add('cp-lb cp-pk-lb-mem', 'Memory, in other packages<small>記憶體，在別的封裝裡</small>'),
    far: lab.add('cp-lb cp-lb-note', 'A long trip across the board<small>在板子上走很遠</small>'),
    sub: lab.add('cp-lb', 'Package substrate<small>基板</small>'),
    inter: lab.add('cp-lb cp-pk-lb-inter', 'Interposer: very fine wires<small>中介層：很細的線</small>'),
    logic: lab.add('cp-lb cp-pk-lb-logic', 'Logic chip<small>運算晶片</small>'),
    mem: lab.add('cp-lb cp-pk-lb-mem', ''),
    tsv: lab.add('cp-lb cp-pk-lb-gold', 'TSVs: tiny elevators through the chips<small>矽穿孔：穿過晶片的小電梯</small>'),
    ball: lab.add('cp-lb', 'Solder balls<small>錫球</small>'),
  };

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], explode: $('.cp-pk-explode'), path: $('.cp-pk-path'), ratio: $('.cp-pk-ratio'), chips: $('.cp-pk-chips'),
    bars: Object.fromEntries(MODES.map((m) => [m, $(`.cp-pk-bar-${m}`)])), msgs: [...root.querySelectorAll('.cp-pk-msg')], play: $('.al-play'),
  };
  const state = { mode: 'board', explode: 0, exTarget: 0, labels: true, playing: true, clock: 0, k: 0 };   // k：0＝並排、1＝疊起來

  const tmp = V(0, 0, 0), m4 = new Matrix4();
  function draw(dt) {
    state.explode += (state.exTarget - state.explode) * Math.min(1, dt * 5);
    const e = state.explode, mode = state.mode;
    state.k += ((mode === 'stack' ? 1 : 0) - state.k) * Math.min(1, dt * 4);
    const k = state.k;
    gBoard.visible = mode === 'board'; gPack.visible = mode !== 'board';
    // board 的爆炸圖：錫球、基板、晶片、外殼
    boardParts.forEach((p) => { p.bl.position.y = e * 0.25; p.sub.position.y = 0.16 + e * 0.6; p.die.position.y = 0.23 + e * 1.0; p.lid.position.y = 0.3 + e * 1.55; });
    // 封裝的爆炸圖
    const g = 0.4 * e;
    L1.position.y = g * 0.6; L2.position.y = 0.23 + g * 1.4; L3.position.y = g * 2.1; L4.position.y = 0.405 + g * 2.9; L5.position.y = g * 3.5;
    const top = 0.52 + g * 4.3;
    logic.position.y = top;
    memFlat.forEach((m) => { m.position.y = top - 0.01; m.visible = k < 0.5; m.scale.setScalar(1 - Math.min(1, k * 2)); });
    memStack.forEach((st) => st.forEach((m, i) => { m.visible = k > 0.5; m.position.y = top - 0.02 + i * (0.06 + e * 0.06) * MathUtils.smoothstep(k, 0.5, 1); }));
    const stH = (STACK_N - 1) * (0.06 + e * 0.06) + 0.05;
    tsv.forEach((gv) => { gv.visible = k > 0.6; gv.children.forEach((c) => { c.scale.y = stH; c.position.y = top - 0.045 + stH / 2; }); });
    // 資料小點
    const run = state.playing ? 1 : 0, u = state.clock;
    for (let i = 0; i < 14; i++) {
      along(TR[i % 2], u * 0.22 + i / 14, tmp); tmp.y = 0.07;
      m4.makeScale(run, run, run).setPosition(tmp); dotsBoard.setMatrixAt(i, m4);
    }
    dotsBoard.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 16; i++) {
      const s = i % 2 ? 0.62 : -0.62, ph = u * 0.9 + i / 16;
      let pts;
      if (k < 0.5) pts = [V(0.2, L4.position.y + 0.05, s), V(0.5 + (i % 4 > 1 ? 0.5 : 0), L4.position.y + 0.05, s), V(0.72 + (i % 4 > 1 ? 0.5 : 0), top, s)];
      else { const lx = 0.95 - 0.3 + (i % 3) * 0.3; pts = [V(0.2, L4.position.y + 0.05, s), V(lx, L4.position.y + 0.05, s - 0.25 + (i % 2) * 0.5), V(lx, top + stH * ((i % STACK_N) + 1) / STACK_N, s - 0.25 + (i % 2) * 0.5)]; }
      along(pts, ph, tmp);
      m4.makeScale(run * 0.75, run * 0.75, run * 0.75).setPosition(tmp); dotsPack.setMatrixAt(i, m4);
    }
    dotsPack.instanceMatrix.needsUpdate = true;
    state.top = top; state.stH = stH;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, mode = state.mode, b = mode === 'board', e = state.explode;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.pcb, on && !narrow, V(-3.4, 0, 2.3), 14);
    show(L.cpu, on && b, V(-2.6, 0.5 + e * 1.55, 0), -26);
    show(L.memb, on && b, V(2.3, 0.5 + e * 1.55, -1.2), -26);
    show(L.far, on && b && e < 0.3, V(0.2, 0.05, 0.9), 0);
    show(L.sub, on && !b && !narrow, V(1.9, L2.position.y, 1.9), 18);
    show(L.inter, on && !b, V(-1.3, L4.position.y, 1.5), e > 0.3 ? 0 : 20);
    show(L.logic, on && !b, V(-0.55, state.top + 0.1, 0), -22);
    L.mem.innerHTML = mode === 'stack' ? `Memory chips, stacked ${STACK_N} high<small>記憶體晶片，疊 ${STACK_N} 層</small>` : 'Memory chips, side by side<small>記憶體晶片，並排</small>';
    show(L.mem, on && !b, V(1.0, state.top + (mode === 'stack' ? state.stH : 0) + 0.1, -0.62), -24);
    show(L.tsv, on && mode === 'stack' && state.k > 0.8 && !narrow && e < 0.5, V(0.95, state.top + state.stH * 0.5, 1.15), 0);
    show(L.ball, on && !b && e > 0.5 && !narrow, V(-1.7, L1.position.y + 0.08, 1.7), 16);
  }

  function readout() {
    const mode = state.mode, mm = pathMm(mode, STACK_N), f = fmtMm(mm);
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === mode ? 'true' : 'false'));
    R.path.innerHTML = `${f.en}<small>${f.zh}</small>`;
    const r = shorter(mode, STACK_N);
    R.ratio.innerHTML = mode === 'board' ? '—<small>拿它當基準</small>' : `${Math.round(r)}× shorter<small>短了 ${Math.round(r)} 倍</small>`;
    const n = mode === 'board' ? 1 : mode === 'side' ? dieCount({ logic: 1, stacks: 4, layers: 1 }) : dieCount({ logic: 1, stacks: 2, layers: STACK_N });
    R.chips.innerHTML = `${n}<small>${mode === 'board' ? '每個封裝 1 顆' : '顆晶片在同一個封裝裡'}</small>`;
    for (const m of MODES) {
      const v = pathMm(m, STACK_N), ff = fmtMm(v);
      R.bars[m].style.setProperty('--w', `${barFrac(v) * 100}%`); R.bars[m].querySelector('b').textContent = ff.en;
      R.bars[m].classList.toggle('on', m === mode);
    }
    R.msgs.forEach((p) => { p.hidden = p.dataset.msg !== mode; });
    R.explode.style.setProperty('--p', `${state.exTarget * 100}%`);
    root.classList.toggle('cp-pk-stack', mode === 'stack');
  }

  function setMode(m) { if (MODES.includes(m)) { state.mode = m; readout(); } }
  function setExplode(v) { state.exTarget = MathUtils.clamp(+v, 0, 1); R.explode.value = String(state.exTarget); readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.view)));
  R.explode.addEventListener('input', () => setExplode(R.explode.value));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) { if (state.playing) state.clock += dt; draw(dt); }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = w < 560;
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    board: () => { setMode('board'); setExplode(0); },
    side: () => { setMode('side'); setExplode(0); },
    stack: () => { setMode('stack'); setExplode(0); },
    explode: () => { setMode('stack'); setExplode(1); },
  };
  root.__lab = {
    camera, controls, state, setMode, setExplode, setPlaying,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：一個封裝裡有幾顆晶片？（2D，不需要 WebGL） ----------------
function initPack() {
  const el = document.querySelector('[data-chip-pack]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const cv = $('.cp-pkw-cv'), g = cv.getContext('2d');
  const st = { logic: 1, stacks: 4, layers: 8 };
  const stacks = $('.cp-pkw-stacks'), stacksOut = $('.cp-pkw-stacks-out'), layerBtns = [...el.querySelectorAll('.cp-pkw-layers button')], logicBtns = [...el.querySelectorAll('.cp-pkw-logic button')];
  const out = { n: $('.cp-pkw-n'), en: $('.cp-pkw-en'), zh: $('.cp-pkw-zh') };
  function drawCv() {
    const W = cv.width = 520, Hh = cv.height = 520;
    g.clearRect(0, 0, W, Hh);
    g.fillStyle = '#2f9a60'; g.fillRect(30, 30, 460, 460);                    // 基板
    g.fillStyle = '#8fa6c8'; g.fillRect(70, 70, 380, 380);                    // 中介層
    const lw = st.logic === 1 ? 150 : 110;
    for (let i = 0; i < st.logic; i++) {
      const x = 260 - (st.logic * lw + (st.logic - 1) * 14) / 2 + i * (lw + 14);
      g.fillStyle = '#3d6fd8'; g.fillRect(x, 185, lw, 150);
      g.fillStyle = '#fff'; g.font = '700 15px system-ui, sans-serif'; g.textAlign = 'center'; g.fillText('Logic', x + lw / 2, 255); g.fillText('運算', x + lw / 2, 276);
    }
    // 記憶體堆疊：上下兩排
    const per = Math.ceil(st.stacks / 2);
    for (let i = 0; i < st.stacks; i++) {
      const row = i < per ? 0 : 1, idx = row ? i - per : i, cnt = row ? st.stacks - per : per;
      const w = 62, gap = 12, x0 = 260 - (cnt * w + (cnt - 1) * gap) / 2, x = x0 + idx * (w + gap), y = row ? 350 : 95;
      for (let k = Math.min(st.layers, 5) - 1; k >= 0; k--) { g.fillStyle = k % 2 ? '#9a6ae6' : '#8a5ad6'; g.fillRect(x + k * 2.5, y - k * 2.5, w, 72); }
      g.fillStyle = '#fff'; g.font = '800 20px system-ui, sans-serif'; g.textAlign = 'center'; g.fillText(`×${st.layers}`, x + w / 2, y + 44);
    }
  }
  function show() {
    const n = dieCount(st);
    stacksOut.textContent = String(st.stacks); stacks.style.setProperty('--p', `${st.stacks / 8 * 100}%`);
    layerBtns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.layers === st.layers ? 'true' : 'false'));
    logicBtns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.logic === st.logic ? 'true' : 'false'));
    out.n.textContent = n.toLocaleString('en-US');
    out.en.textContent = `${st.logic} logic ${st.logic > 1 ? 'chips' : 'chip'} + ${st.stacks} × ${st.layers} memory chips`;
    out.zh.textContent = `${st.logic} 顆運算晶片 ＋ ${st.stacks} 疊 × ${st.layers} 層記憶體`;
    drawCv();
  }
  stacks.addEventListener('input', () => { st.stacks = +stacks.value; show(); });
  layerBtns.forEach((b) => b.addEventListener('click', () => { st.layers = +b.dataset.layers; show(); }));
  logicBtns.forEach((b) => b.addEventListener('click', () => { st.logic = +b.dataset.logic; show(); }));
  show();
  el.__pack = { st, show, field: FIELD_MM2, max: MAX_LAYERS };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPack);
else initPack();

lazyBoot('[data-chippackage-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
