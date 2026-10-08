/*
 * 晶片與半導體 · 第七課「HBM 是什麼？AI 為什麼需要它？」的 3D 模型（全部自繪示意，不是真實比例）。
 *
 * 一個機制：運算晶片算得很快，卻常在「等資料」。HBM 把記憶體晶片一層層疊起來、用矽穿孔上下連，
 *   緊貼著運算晶片，中間是一條有上千個車道的超寬高速公路——一次送很多資料。
 *
 * 兩個視角：
 *   far「一般記憶體」：記憶體在板子的另一頭，路又長、車道又少（示意：一顆 GDDR 記憶體 32 條資料線，畫 1 條車道）。
 *   hbm「HBM」：記憶體疊在運算晶片旁邊，路很短、車道很多（每 64 條資料線畫 1 條車道：1,024 → 16、2,048 → 32）。
 *   可以選 HBM 的世代（2013／2016／2022／2025），層數、車道數、車速跟著變；數字用 hbmcalc.js。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/chips && npm run build → assets/js/chip-hbm.js
 * 除錯：document.querySelector('[data-chiphbm-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, InstancedMesh, MathUtils,
  Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { GENS, GDDR_BITS, gen, bandwidth, lanesVs, moviesPerSecond, homeSeconds, fmtDuration } from './hbmcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.55, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const MAX_LANES = 32, MAX_DIES = 16, N_CAR = 260, N_LIFT = 48;
const LOGIC_X = -2.2, STACK_X = 1.5, FAR_X = 3.0;        // 運算晶片、HBM 堆疊、遠處的記憶體
const ROAD_Y = 0.13;

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
  const TARGET = V(0.6, 0.7, 0);
  const homePos = () => TARGET.clone().add(V(2.4, 5.6, 9.2).multiplyScalar(camera.aspect < 0.85 ? 1.6 : camera.aspect < 1.2 ? 1.25 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 28; controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sun = new DirectionalLight(0xffffff, 1.15); sun.position.set(4, 9, 6); scene.add(sun);

  // 底：電路板＋中介層
  scene.add(at(new Mesh(new BoxGeometry(10.5, 0.14, 5.6), std(0x1f7a4a, { roughness: 0.8 })), 0.6, -0.07, 0));
  const inter = at(new Mesh(new BoxGeometry(6.4, 0.08, 4.2), std(0x8fa6c8, { metalness: 0.5, roughness: 0.3 })), -0.6, 0.04, 0); scene.add(inter);
  // 運算晶片
  const logic = at(new Mesh(new BoxGeometry(2.0, 0.22, 2.6), std(0x3d6fd8, { metalness: 0.35, emissive: 0x06102a })), LOGIC_X, 0.19, 0); scene.add(logic);
  // 路面（寬度、長度跟著狀態變）與車道線
  const road = new Mesh(new BoxGeometry(1, 0.02, 1), std(0x2a3246, { roughness: 0.9 })); scene.add(road);
  const stripes = new InstancedMesh(new BoxGeometry(1, 0.006, 0.012), new MeshBasicMaterial({ color: 0x8b98b5 }), MAX_LANES + 1); stripes.frustumCulled = false; scene.add(stripes);
  // HBM 堆疊
  const gStack = new Group(); at(gStack, STACK_X, 0, 0); scene.add(gStack);
  const base = at(new Mesh(new BoxGeometry(1.5, 0.07, 2.6), std(0x4a5a80, { metalness: 0.4 })), 0, 0.115, 0); gStack.add(base);
  const dies = Array.from({ length: MAX_DIES }, (_, i) => { const m = at(new Mesh(new BoxGeometry(1.5, 0.06, 2.6), std(i % 2 ? 0x9a6ae6 : 0x8a5ad6, { metalness: 0.3 })), 0, 0.19 + i * 0.075, 0); gStack.add(m); return m; });
  const posts = Array.from({ length: 8 }, (_, i) => { const c = new Mesh(new CylinderGeometry(0.018, 0.018, 1, 6), std(0xe9b949, { metalness: 0.8, roughness: 0.25, emissive: 0x4a3200 })); at(c, -0.5 + (i % 2) * 1.0, 0, -1.05 + Math.floor(i / 2) * 0.7); gStack.add(c); return c; });
  const lifts = new InstancedMesh(new BoxGeometry(0.06, 0.06, 0.06), new MeshBasicMaterial({ color: 0xfff2a0 }), N_LIFT); lifts.frustumCulled = false; gStack.add(lifts);
  // 遠處的一般記憶體（四顆各自封裝）
  const gFar = new Group(); at(gFar, FAR_X + 1.3, 0, 0); scene.add(gFar);
  for (let i = 0; i < 4; i++) gFar.add(at(new Mesh(new BoxGeometry(0.9, 0.2, 0.55), std(0x22262e)), (i % 2) * 1.05 - 0.5, 0.1, (Math.floor(i / 2) - 0.5) * 0.9 + (i % 2 ? 0 : 0)));
  // 車子
  const cars = new InstancedMesh(new BoxGeometry(0.09, 0.05, 0.05), new MeshBasicMaterial({ color: 0xffffff }), N_CAR); cars.frustumCulled = false; scene.add(cars);
  const carCol = [new Color(0xfff2a0), new Color(0x8fe3ff)];
  for (let i = 0; i < N_CAR; i++) cars.setColorAt(i, carCol[i % 2]);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    logic: lab.add('cp-lb cp-pk-lb-logic', 'Logic chip: waiting for data<small>運算晶片：在等資料</small>'),
    stack: lab.add('cp-lb cp-pk-lb-mem', ''),
    road: lab.add('cp-lb cp-hb-lb-road', ''),
    tsv: lab.add('cp-lb cp-pk-lb-gold', 'TSVs: elevators between the floors<small>矽穿孔：樓層之間的電梯</small>'),
    far: lab.add('cp-lb', 'Ordinary memory, across the board<small>一般記憶體，在板子的另一頭</small>'),
    inter: lab.add('cp-lb cp-pk-lb-inter', 'Interposer<small>中介層</small>'),
  };

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], gens: [...root.querySelectorAll('.cp-hb-gens button')],
    lanes: $('.cp-hb-lanes'), floors: $('.cp-hb-floors'), bw: $('.cp-hb-bw'), mov: $('.cp-hb-mov'),
    msgs: [...root.querySelectorAll('.cp-hb-msg')], play: $('.al-play'),
  };
  const state = { view: 'hbm', gen: 'hbm3', labels: true, playing: true, clock: 0, k: 1, lanes: 16, diesK: 12, speed: 1, len: 1, half: 1 };

  const m4 = new Matrix4(), tmp = V(0, 0, 0);
  function draw(dt) {
    const g = gen(state.gen), hbm = state.view === 'hbm';
    state.k += ((hbm ? 1 : 0) - state.k) * Math.min(1, dt * 4);
    const k = state.k;
    const lanesT = hbm ? g.bits / 64 : 1;                         // 每 64 條資料線畫一條車道；一般記憶體畫 1 條
    state.lanes += (lanesT - state.lanes) * Math.min(1, dt * 5);
    state.diesK += ((hbm ? g.dies : 0) - state.diesK) * Math.min(1, dt * 5);
    state.speed += ((hbm ? g.gbps / 2.4 : 0.35) - state.speed) * Math.min(1, dt * 3);
    // 路：從運算晶片右緣到記憶體左緣
    const x0 = LOGIC_X + 1.0, x1 = MathUtils.lerp(FAR_X + 0.4, STACK_X - 0.75, k);
    const len = x1 - x0, half = Math.max(0.03, state.lanes * 0.04);
    state.len = len; state.half = half; state.x0 = x0;
    road.scale.set(len, 1, half * 2 + 0.06); road.position.set(x0 + len / 2, ROAD_Y - 0.015, 0);
    const nl = Math.round(state.lanes);
    for (let i = 0; i <= MAX_LANES; i++) {
      const on = i <= nl ? 1 : 0, z = -half + (i / Math.max(1, nl)) * half * 2;
      m4.makeScale(len * on, 1, 1).setPosition(x0 + len / 2, ROAD_Y, on ? z : 0); stripes.setMatrixAt(i, m4);
    }
    stripes.instanceMatrix.needsUpdate = true;
    // 堆疊
    gStack.visible = k > 0.05; gStack.scale.setScalar(MathUtils.smoothstep(k, 0.05, 0.6));
    dies.forEach((d, i) => { d.visible = i < Math.round(state.diesK); });
    const stH = Math.max(0.1, Math.round(state.diesK) * 0.075);
    posts.forEach((c) => { c.scale.y = stH; c.position.y = 0.15 + stH / 2; });
    gFar.visible = k < 0.95; gFar.scale.setScalar(1 - MathUtils.smoothstep(k, 0.4, 0.95));
    inter.scale.x = MathUtils.lerp(0.5, 1, k); inter.position.x = MathUtils.lerp(-1.9, -0.6, k);
    // 車：每條車道上的車數固定，車道越多車越多
    const run = state.playing ? 1 : 0, perLane = Math.max(2, Math.round(MathUtils.lerp(9, 4, k)));
    for (let i = 0; i < N_CAR; i++) {
      const lane = i % MAX_LANES, slot = Math.floor(i / MAX_LANES);
      const on = lane < nl && slot < perLane ? run : 0;
      const dir = lane % 2 ? -1 : 1;                              // 單數車道往記憶體（寫入）、雙數往運算晶片（讀出）
      const u = (((state.clock * state.speed * 0.5 * dir + slot / perLane + hash(lane, 3)) % 1) + 1) % 1;
      const z = -half + ((lane + 0.5) / Math.max(1, nl)) * half * 2;
      m4.makeScale(on, on, on).setPosition(x0 + u * len, ROAD_Y + 0.03, z); cars.setMatrixAt(i, m4);
    }
    cars.instanceMatrix.needsUpdate = true;
    // 電梯裡的資料
    for (let i = 0; i < N_LIFT; i++) {
      const p = posts[i % posts.length].position, on = k > 0.7 && run ? 1 : 0;
      const u = (((state.clock * state.speed * 0.6 * (i % 2 ? 1 : -1) + i / N_LIFT * 3.7) % 1) + 1) % 1;
      m4.makeScale(on, on, on).setPosition(p.x, 0.15 + u * stH, p.z); lifts.setMatrixAt(i, m4);
    }
    lifts.instanceMatrix.needsUpdate = true;
    state.stH = stH;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, hbm = state.view === 'hbm', g = gen(state.gen);
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    L.logic.innerHTML = hbm ? 'Logic chip: the data keeps coming<small>運算晶片：資料源源不絕</small>' : 'Logic chip: waiting for data<small>運算晶片：在等資料</small>';
    show(L.logic, on, V(LOGIC_X, 0.35, 0), -24);
    L.stack.innerHTML = `${g.name}: ${g.dies} memory chips stacked<small>${g.name}：${g.dies} 層記憶體疊在一起</small>`;
    show(L.stack, on && hbm && state.k > 0.8, V(STACK_X, 0.2 + state.stH, 0), -26);
    L.road.innerHTML = hbm ? `${g.bits.toLocaleString('en-US')} data lines, very short<small>${g.bits.toLocaleString('en-US')} 條資料線，路很短</small>` : `${GDDR_BITS} data lines to each chip, a long way<small>每顆晶片 ${GDDR_BITS} 條資料線，路很長</small>`;
    show(L.road, on, V(state.x0 + state.len / 2, ROAD_Y, state.half + 0.1), 22);
    show(L.tsv, on && hbm && state.k > 0.8 && !narrow, V(STACK_X + 0.5, 0.2 + state.stH * 0.5, 1.4), 0);
    show(L.far, on && !hbm && state.k < 0.2, V(FAR_X + 1.3, 0.25, 0), -26);
    show(L.inter, on && hbm && !narrow, V(-2.6, 0.08, 1.9), 16);
  }

  const big = (n) => (n >= 100 ? Math.round(n).toLocaleString('en-US') : (+n.toFixed(1)).toString());
  function readout() {
    const hbm = state.view === 'hbm', g = gen(state.gen);
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    R.gens.forEach((b) => { b.setAttribute('aria-pressed', hbm && b.dataset.gen === state.gen ? 'true' : 'false'); b.disabled = !hbm; });
    R.lanes.innerHTML = hbm ? `${g.bits.toLocaleString('en-US')}<small>條（是一顆一般記憶體的 ${lanesVs(state.gen)} 倍）</small>` : `${GDDR_BITS}<small>條（每顆晶片）</small>`;
    R.floors.innerHTML = hbm ? `${g.dies}<small>層</small>` : '1<small>層（不疊）</small>';
    R.bw.innerHTML = hbm ? `${big(bandwidth(state.gen))} GB/s<small>每一疊、每秒</small>` : '—<small>看產品而定</small>';
    R.mov.innerHTML = hbm ? `${big(moviesPerSecond(state.gen))}<small>部（每部 5 GB，每秒）</small>` : '—';
    R.msgs.forEach((p) => { p.hidden = p.dataset.msg !== (hbm ? state.gen : 'far'); });
    root.classList.toggle('cp-hb-far', !hbm);
  }

  function setView(v) { if (v === 'far' || v === 'hbm') { state.view = v; readout(); } }
  function setGen(k) { if (GENS.some((g) => g.key === k)) { state.gen = k; state.view = 'hbm'; readout(); } }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  R.gens.forEach((b) => b.addEventListener('click', () => setGen(b.dataset.gen)));
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

  const DEMO = { far: () => setView('far'), hbm1: () => setGen('hbm1'), hbm3: () => setGen('hbm3'), hbm4: () => setGen('hbm4') };
  root.__lab = {
    camera, controls, state, setView, setGen, setPlaying,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：一秒搬幾部電影？（不需要 WebGL） ----------------
function initBand() {
  const el = document.querySelector('[data-chip-band]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const movie = +el.dataset.movie || 5;
  const st = { gen: 'hbm4', stacks: 6, net: 100 };
  const genB = [...el.querySelectorAll('.cp-bd-gens button')], netB = [...el.querySelectorAll('.cp-bd-net button')];
  const stacks = $('.cp-bd-stacks'), stacksOut = $('.cp-bd-stacks-out');
  const out = { n: $('.cp-bd-n'), gb: $('.cp-bd-gb'), en: $('.cp-bd-en'), zh: $('.cp-bd-zh') };
  function show() {
    genB.forEach((b) => b.setAttribute('aria-pressed', b.dataset.gen === st.gen ? 'true' : 'false'));
    netB.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.net === st.net ? 'true' : 'false'));
    stacksOut.textContent = String(st.stacks); stacks.style.setProperty('--p', `${(st.stacks - 1) / 7 * 100}%`);
    const gb = bandwidth(st.gen) * st.stacks, n = moviesPerSecond(st.gen, st.stacks, movie), d = fmtDuration(homeSeconds(gb, st.net));
    out.n.textContent = Math.round(n).toLocaleString('en-US');
    el.querySelectorAll('.cp-bd-gb').forEach((x) => { x.textContent = Math.round(gb).toLocaleString('en-US'); });
    out.en.textContent = d.en; out.zh.textContent = d.zh;
  }
  genB.forEach((b) => b.addEventListener('click', () => { st.gen = b.dataset.gen; show(); }));
  netB.forEach((b) => b.addEventListener('click', () => { st.net = +b.dataset.net; show(); }));
  stacks.addEventListener('input', () => { st.stacks = +stacks.value; show(); });
  show();
  el.__band = { st, show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBand);
else initBand();

lazyBoot('[data-chiphbm-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
