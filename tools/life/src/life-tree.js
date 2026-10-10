/*
 * 生命與生態 · 第七課「水怎麼爬到樹頂？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：樹沒有心臟，水不是被推上去的，是被拉上去的。葉子上的水蒸發出去（蒸散），
 *   因為水分子彼此黏得很緊，後面的水就一個拉一個跟著往上；整棵樹像一把很細的吸管。
 *
 * 場景：一棵樹的剖面：根、樹幹裡的水柱（藍色的珠子排成一串）、三叢葉子、往上飄的水氣。
 *   三支滑桿：陽光、空氣有多潮溼、土裡的水。水走多快由 treecalc.js 的 flow() 決定（示意）。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-tree.js
 * 除錯：document.querySelector('[data-lifetree-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { stomata, flow, holding, timesLimit, SUCTION_M } from './treecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const HOLD = {
  dark: ['The dark: the pores are shut', '天黑：氣孔關著'], dry: ['Dry soil: the pores are shut', '土太乾：氣孔關著'], humid: ['Damp air: little can evaporate', '空氣太溼：蒸發不了多少'],
  slow: ['Nothing much: a gentle pull', '沒什麼：輕輕地拉'], fast: ['Nothing: a strong pull', '沒有：用力地拉'],
};

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
  const DAY = new Color(0x2a66b8), NIGHT = new Color(0x070b18);
  scene.background = DAY.clone();
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0, 2.6, 0);
  const homePos = () => TARGET.clone().add(V(1.5, 1.2, 19).multiplyScalar(camera.aspect < 0.85 ? 1.4 : camera.aspect < 1.1 ? 1.1 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 60;
  controls.minAzimuthAngle = -1.1; controls.maxAzimuthAngle = 1.1; controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.6;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xffffff, 0x2a3040, 1.2); scene.add(hemi);
  scene.add(new AmbientLight(0xffffff, 0.4));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-5, 9, 8); scene.add(dl);

  const ball = new SphereGeometry(1, 20, 14);
  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.7, ...o });
  // 土壤（後牆＋地面）、太陽
  const DRY = new Color(0xb38a5c), WET = new Color(0x5e3f26);
  const soilMat = mat(0xb38a5c, { roughness: 1 });
  const soil = new Mesh(new BoxGeometry(12, 3.2, 0.5), soilMat); soil.position.set(0, -1.6, -1.1); scene.add(soil);
  const ground = new Mesh(new BoxGeometry(12, 0.12, 2.2), mat(0x4f8a3c, { roughness: 1 })); ground.position.set(0, 0, -0.4); scene.add(ground);
  const sunMat = mat(0xffe27a, { emissive: 0xffc93c, emissiveIntensity: 1 });
  const sun = new Mesh(ball, sunMat); sun.position.set(-5.2, 8.2, -2); scene.add(sun);

  // 樹幹（半透明，看得到裡面的水柱）、三叢葉子、三條根
  const trunkMat = mat(0x8a5a3a, { transparent: true, opacity: 0.24, depthWrite: false });
  const trunk = new Mesh(new CylinderGeometry(0.42, 0.58, 4.3, 20), trunkMat); trunk.position.set(0, 2.15, 0); scene.add(trunk);
  const LEAF = [V(-2.1, 5.5, 0), V(0, 6.5, 0), V(2.1, 5.4, 0)], ROOT = [V(-2.4, -2.5, 0), V(0.2, -2.9, 0), V(2.5, -2.4, 0)];
  const leafMat = mat(0x3f9f48, { transparent: true, opacity: 0.6, depthWrite: false });
  const GREEN = new Color(0x3f9f48), WILT = new Color(0xa9a04a);
  const crowns = LEAF.map((p, i) => { const m = new Mesh(ball, leafMat); m.position.copy(p); m.scale.set(1.45, 1.15, 1.1); scene.add(m); return m; });
  const woodMat = mat(0x8a5a3a, { transparent: true, opacity: 0.22, depthWrite: false });
  const paths = LEAF.map((leaf, i) => {
    const dx = (i - 1) * 0.2;
    return new CatmullRomCurve3([ROOT[i].clone(), V(ROOT[i].x * 0.45, -1.2, 0), V(dx, -0.1, 0), V(dx, 2.2, 0), V(dx, 4.0, 0), V((leaf.x + dx) / 2, 4.9 + (i === 1 ? 0.5 : 0), 0), leaf.clone()]);
  });
  paths.forEach((c) => { scene.add(new Mesh(new TubeGeometry(c, 60, 0.13, 8, false), woodMat)); });

  // 水：每條路上一串珠子，永遠等距（水柱是連著的）；流量決定它們往上走多快
  const waterMat = mat(0x6cc4ff, { emissive: 0x2a8cff, emissiveIntensity: 0.9, roughness: 0.3 });
  const N = 24, beads = [];
  paths.forEach((c, k) => { for (let i = 0; i < N; i++) { const m = new Mesh(ball, waterMat); m.scale.setScalar(0.1); m.renderOrder = 3; m.userData = { k, u: i / N }; scene.add(m); beads.push(m); } });
  // 水氣：從葉子往上飄
  const vaporMat = mat(0xd7ecff, { transparent: true, opacity: 0.75 });
  const VAP = 36, vapor = [];
  for (let i = 0; i < VAP; i++) { const m = new Mesh(ball, vaporMat); m.userData = { leaf: i % 3, ph: hash(i, 1), dx: (hash(i, 2) - 0.5) * 2.2, dz: (hash(i, 3) - 0.5) * 1.2 }; scene.add(m); vapor.push(m); }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    leaf: lab.add('cp-lb lf-lb-push', 'Leaves: water leaves here as vapor<small>葉子：水在這裡變成水氣散出去</small>'),
    trunk: lab.add('cp-lb', 'Trunk: an unbroken thread of water<small>樹幹：一條不斷的水柱</small>'),
    root: lab.add('cp-lb', 'Roots: water comes in<small>根：水從這裡進來</small>'),
    vapor: lab.add('cp-lb', 'Water vapor<small>水氣</small>'),
  };

  const R = { sun: $('.lf-tr-sun'), sunOut: $('.lf-tr-sun-out'), humid: $('.lf-tr-humid'), humidOut: $('.lf-tr-humid-out'), soil: $('.lf-tr-soil'), soilOut: $('.lf-tr-soil-out'),
    bar: $('.lf-tr-bar'), status: $('.lf-tr-status'), pores: $('.lf-tr-pores'), hold: $('.lf-tr-hold'), msgs: [...root.querySelectorAll('.lf-tr-msg')], play: $('.al-play') };
  const state = { sun: 80, humid: 40, soil: 80, labels: true, playing: true, shift: 0, time: 0 };
  const tmp = V(0, 0, 0);

  function paint() {
    const f = flow(state.sun, state.humid, state.soil), light = clamp(state.sun / 100);
    scene.background.copy(NIGHT).lerp(DAY, light); hemi.intensity = 0.6 + 0.7 * light;
    sun.scale.setScalar(0.35 + 0.75 * light); sunMat.emissiveIntensity = 0.2 + 1.2 * light; sun.visible = state.sun >= 3;
    soilMat.color.copy(DRY).lerp(WET, clamp(state.soil / 100));
    const wilt = clamp((25 - state.soil) / 25);
    leafMat.color.copy(GREEN).lerp(WILT, wilt); crowns.forEach((m) => m.scale.set(1.45, 1.15 - 0.3 * wilt, 1.1));
    beads.forEach((m) => { paths[m.userData.k].getPoint((m.userData.u + state.shift) % 1, m.position); });
    vapor.forEach((m, i) => {
      m.visible = i < Math.round(VAP * f) ;
      if (!m.visible) return;
      const p = (m.userData.ph + state.time * 0.22) % 1, c = LEAF[m.userData.leaf];
      m.position.set(c.x + m.userData.dx * (0.5 + p * 0.6), c.y + 0.7 + p * 2.2, c.z + m.userData.dz);
      m.scale.setScalar(0.06 + 0.07 * p * (1 - p) * 4);
    });
    return f;
  }
  function updateLabels() {
    const on = state.labels, f = flow(state.sun, state.humid, state.soil);
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.leaf, on, 2.4, 6.7, 0); show(L.trunk, on, 1.9, 2.2, 0); show(L.root, on, -2.6, -1.1, 0); show(L.vapor, on && f > 0.08, -2.1, 7.9, 0);
  }
  function readout() {
    const f = flow(state.sun, state.humid, state.soil), st = stomata(state.sun, state.soil), k = holding(state.sun, state.humid, state.soil);
    R.sun.value = state.sun; R.sunOut.textContent = `${state.sun}%`;
    R.humid.value = state.humid; R.humidOut.textContent = `${state.humid}%`;
    R.soil.value = state.soil; R.soilOut.textContent = `${state.soil}%`;
    R.bar.style.width = `${Math.round(f * 100)}%`;
    R.status.innerHTML = f <= 0 ? 'Standing still<small class="zh">停住了</small>' : f < 0.2 ? 'Creeping up<small class="zh">慢慢爬</small>' : f < 0.45 ? 'Rising steadily<small class="zh">穩穩地上升</small>' : 'Rising fast<small class="zh">上升得很快</small>';
    R.pores.innerHTML = st <= 0 ? 'Shut<small>關著</small>' : st < 1 ? 'Partly open<small>半開</small>' : 'Open<small>開著</small>';
    R.hold.innerHTML = `${HOLD[k][0]}<small>${HOLD[k][1]}</small>`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    for (const key of ['sun', 'humid', 'soil']) if (o[key] != null) state[key] = clamp(Math.round(+o[key]), 0, 100);
    paint(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  for (const key of ['sun', 'humid', 'soil']) R[key].addEventListener('input', () => set({ [key]: +R[key].value }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing) { state.time += dt; state.shift = (state.shift + dt * 0.11 * flow(state.sun, state.humid, state.soil)) % 1; }
    paint();
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
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting; last = 0;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '120px' }).observe(root);

  set({});
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    fast: () => { setPlaying(true); set({ sun: 95, humid: 20, soil: 85 }); },
    night: () => { setPlaying(true); set({ sun: 0, humid: 60, soil: 85 }); },
    humid: () => { setPlaying(true); set({ sun: 80, humid: 96, soil: 85 }); },
    dry: () => { setPlaying(true); set({ sun: 90, humid: 30, soil: 8 }); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); paint(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：這棵樹有幾根吸管那麼高？（不需要 WebGL） ----------
function initClimber() {
  const el = document.querySelector('[data-life-climber]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-cl-pick button')];
  const max = Math.max(...items.map((x) => x.m));
  q('.lf-cl-limit').style.height = `${(SUCTION_M / max) * 100}%`;
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0];
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    q('.lf-cl-tree').style.height = `${(it.m / max) * 100}%`;
    q('.lf-cl-h').textContent = `${it.m} m`;
    q('.lf-cl-n').textContent = timesLimit(it.m).toLocaleString('en-US');
    q('.lf-cl-en').textContent = it.note_en; q('.lf-cl-zh').textContent = it.note_zh;
    el.dataset.k = it.key;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__cl = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initClimber);
else initClimber();

lazyBoot('[data-lifetree-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
