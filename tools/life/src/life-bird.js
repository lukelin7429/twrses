/*
 * 生命與生態 · 第九課「鳥為什麼會飛？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：翅膀在空氣裡前進就有升力。往下拍，把空氣往下、往後推，鳥就得到往上和往前的力；
 *   往上舉的時候把翅膀收起來一點，省力。不拍也能飛：滑翔會慢慢下降，遇到上升的熱空氣就能盤旋上升。
 *
 * 場景：一隻鳥停在畫面中間，空氣從前面流過來。三個視角：拍翅／滑翔／乘著熱氣流。
 *   四支箭頭是升力、重量、推力、阻力（長短是示意）。開關「看裡面」：龍骨和兩組飛行肌，正在出力的那一組會亮。
 * 規則在 birdcalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-bird.js
 * 除錯：document.querySelector('[data-lifebird-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { stroke, wingAngle, fold, forces, path, effort, holding } from './birdcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const RAD = Math.PI / 180;
const WINGS = { down: ['Pushing down', '往下拍'], up: ['Lifting, half folded', '往上舉，收起一半'], glide: ['Held out still', '張開不動'], soar: ['Held out still', '張開不動'] };
const PATH = { level: ['Level', '平飛'], sinking: ['Slowly sinking', '慢慢下降'], rising: ['Rising', '上升'] };
const EFFORT = { high: ['A lot', '很費力'], low: ['Very little', '幾乎不費力'] };

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
  scene.background = new Color(0x2a66b8);
  const camera = new PerspectiveCamera(34, 1, 0.1, 140);
  const TARGET = V(0, 0.1, 0);
  const homePos = () => TARGET.clone().add(V(6, 2.8, 13.5).multiplyScalar(camera.aspect < 0.85 ? 1.45 : camera.aspect < 1.1 ? 1.15 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 45;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x35507a, 1.3));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(4, 9, 7); scene.add(dl);

  const ball = new SphereGeometry(1, 24, 16);
  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.7, ...o });
  const M = {
    body: mat(0x8a6f58, { transparent: true }), belly: mat(0xe9dcc6, { transparent: true }), wing: mat(0x6f5a48, { side: DoubleSide }), tip: mat(0x4a3b30, { side: DoubleSide }),
    beak: mat(0xf0b030), eye: mat(0x111111), keel: mat(0xf2ead8), pec: mat(0xc0392b, { emissive: 0xff2a1a, emissiveIntensity: 0 }), sup: mat(0xe58aa0, { emissive: 0xff5a8a, emissiveIntensity: 0 }),
  };
  const bird = new Group(); scene.add(bird);
  const add = (geo, m, x, y, z, sx, sy, sz, parent = bird) => { const o = new Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };
  // 鳥頭朝 +x
  add(ball, M.body, 0, 0, 0, 1.25, 0.45, 0.48); add(ball, M.belly, 0.1, -0.12, 0, 1.0, 0.36, 0.42);
  add(ball, M.body, 1.25, 0.22, 0, 0.36, 0.33, 0.33); add(ball, M.eye, 1.42, 0.3, 0.26, 0.05, 0.05, 0.05); add(ball, M.eye, 1.42, 0.3, -0.26, 0.05, 0.05, 0.05);
  const beak = new Mesh(new ConeGeometry(0.11, 0.38, 10), M.beak); beak.rotation.z = -Math.PI / 2; beak.position.set(1.72, 0.2, 0); bird.add(beak);
  add(new BoxGeometry(1, 1, 1), M.tip, -1.55, 0.02, 0, 0.9, 0.04, 0.62);
  // 翅膀：內段＋外段；外段在往上舉時向內折
  const wings = [1, -1].map((s) => {
    const sh = new Group(); sh.position.set(0.25, 0.2, s * 0.36); bird.add(sh);
    const inner = new Mesh(new BoxGeometry(1.1, 0.05, 1.6), M.wing); inner.position.set(0, 0, s * 0.8); sh.add(inner);
    const el = new Group(); el.position.set(0, 0, s * 1.6); sh.add(el);
    const outer = new Mesh(new BoxGeometry(0.85, 0.04, 1.8), M.tip); outer.position.set(-0.08, 0, s * 0.9); el.add(outer);
    return { s, sh, el };
  });
  // 裡面：龍骨、胸大肌（往下拍）、上喙肌（往上舉）
  const inside = new Group(); bird.add(inside);
  add(new BoxGeometry(1, 1, 1), M.keel, 0.25, -0.22, 0, 0.95, 0.4, 0.035, inside);
  const pecs = [1, -1].map((s) => add(ball, M.pec, 0.3, -0.14, s * 0.2, 0.55, 0.27, 0.16, inside));
  const sups = [1, -1].map((s) => add(ball, M.sup, 0.3, -0.02, s * 0.1, 0.36, 0.13, 0.07, inside));

  // 四支力的箭頭
  function arrow(color) {
    const g = new Group(), m = mat(color, { emissive: color, emissiveIntensity: 0.35 });
    const shaft = new Mesh(new CylinderGeometry(0.055, 0.055, 1, 10), m), head = new Mesh(new ConeGeometry(0.15, 0.32, 12), m);
    g.add(shaft, head); scene.add(g);
    return { g, set(len) { g.visible = len > 0.04; const L = Math.max(len, 0.05); shaft.scale.y = L; shaft.position.y = L / 2; head.position.y = L + 0.14; } };
  }
  const A = { lift: arrow(0x6fe3ff), weight: arrow(0xffffff), thrust: arrow(0xffa64d), drag: arrow(0xb8c2d6) };
  A.lift.g.position.set(0.2, 0.55, 0); A.weight.g.position.set(0.2, -0.5, 0); A.weight.g.rotation.z = Math.PI;
  A.thrust.g.position.set(1.95, 0.2, 0); A.thrust.g.rotation.z = -Math.PI / 2; A.drag.g.position.set(-2.05, 0.05, 0); A.drag.g.rotation.z = Math.PI / 2;

  // 流過的空氣（白色短線）與上升的熱空氣（橘色小點）
  const airMat = mat(0xffffff, { transparent: true, opacity: 0.5 }), warmMat = mat(0xffb36b, { transparent: true, opacity: 0.75 });
  const streaks = []; for (let i = 0; i < 46; i++) { const m = new Mesh(new BoxGeometry(0.5, 0.02, 0.02), airMat); m.userData = { y: (hash(i, 1) - 0.5) * 7, z: (hash(i, 2) - 0.5) * 8, o: hash(i, 3) }; scene.add(m); streaks.push(m); }
  const warm = []; for (let i = 0; i < 40; i++) { const m = new Mesh(ball, warmMat); m.scale.setScalar(0.06); m.userData = { x: (hash(i, 4) - 0.5) * 9, z: (hash(i, 5) - 0.5) * 7, o: hash(i, 6) }; scene.add(m); warm.push(m); }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    lift: lab.add('cp-lb', 'Lift<small>升力</small>'), weight: lab.add('cp-lb', 'Weight<small>重量</small>'),
    thrust: lab.add('cp-lb lf-lb-push', 'Thrust<small>推力</small>'), drag: lab.add('cp-lb', 'Drag<small>阻力</small>'),
    warm: lab.add('cp-lb lf-lb-push', 'Warm air rising<small>上升的熱空氣</small>'),
    keel: lab.add('cp-lb', 'Keel: where the flight muscles hold on<small>龍骨：飛行肌附著的地方</small>'),
    muscle: lab.add('cp-lb lf-lb-push', ''),
  };

  const R = { views: [...root.querySelectorAll('.cp-view button')], p: $('.lf-bd-p'), pOut: $('.lf-bd-p-out'), wings: $('.lf-bd-wings'), path: $('.lf-bd-path'), effort: $('.lf-bd-effort'),
    bars: { lift: $('.lf-bd-mlift'), weight: $('.lf-bd-mweight'), thrust: $('.lf-bd-mthrust'), drag: $('.lf-bd-mdrag') }, msgs: [...root.querySelectorAll('.lf-bd-msg')], play: $('.al-play'), ins: $('[data-t="inside"]') };
  const state = { mode: 'flap', phase: 0.1, inside: false, labels: true, playing: true, time: 0 };
  const tmp = V(0, 0, 0);

  function layout() {
    const flap = state.mode === 'flap', p = state.phase, f = forces(state.mode, p);
    const ang = flap ? wingAngle(p) : 8, fo = flap ? fold(p) : 0;
    wings.forEach(({ s, sh, el }) => { sh.rotation.x = -s * ang * RAD; el.rotation.x = s * fo * 18 * RAD; el.rotation.y = -s * fo * 0.95; });
    bird.position.y = flap ? -0.12 * Math.cos(2 * Math.PI * p) : 0; bird.rotation.z = state.mode === 'glide' ? -0.1 : state.mode === 'soar' ? 0.06 : 0;
    A.lift.set(f.lift * 1.3); A.weight.set(f.weight * 1.3); A.thrust.set(f.thrust * 1.8); A.drag.set(f.drag * 1.8);
    for (const k of ['lift', 'weight', 'thrust', 'drag']) R.bars[k].style.width = `${Math.round(clamp(f[k] / 1.5) * 100)}%`;
    M.body.opacity = M.belly.opacity = state.inside ? 0.22 : 1; M.body.depthWrite = M.belly.depthWrite = !state.inside;
    inside.visible = state.inside;
    const st = flap ? stroke(p) : '';
    M.pec.emissiveIntensity = st === 'down' ? 0.9 : 0; M.sup.emissiveIntensity = st === 'up' ? 0.9 : 0;
    // 空氣：往 −x 流；滑翔時鳥在下降，所以相對的氣流稍微由下往上
    const tilt = state.mode === 'glide' ? 0.12 : 0;
    streaks.forEach((m) => { const u = (m.userData.o + state.time * 0.5) % 1; m.position.set(7 - 14 * u, m.userData.y + tilt * 14 * u, m.userData.z); m.rotation.z = -tilt; });
    warm.forEach((m) => { m.visible = state.mode === 'soar'; if (!m.visible) return; const u = (m.userData.o + state.time * 0.3) % 1; m.position.set(m.userData.x, -4 + 8 * u, m.userData.z); });
  }
  function updateLabels() {
    const on = state.labels, f = forces(state.mode, state.phase), flap = state.mode === 'flap';
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.lift, on, 0.2, 0.75 + f.lift * 1.3 + 0.45, 0); show(L.weight, on, 0.2, -0.7 - f.weight * 1.3 - 0.45, 0);
    show(L.thrust, on && f.thrust > 0.05, 2.3 + f.thrust * 1.8 + 0.5, 0.2, 0); show(L.drag, on, -2.4 - f.drag * 1.8 - 0.4, 0.05, 0);
    show(L.warm, on && state.mode === 'soar', -3.2, -2.6, 0);
    show(L.keel, on && state.inside && !flap, 0.3, -0.75, 0, 16);
    show(L.muscle, on && state.inside && flap, 0.3, -0.75, 0, 16);
  }
  function readout() {
    const k = holding(state.mode, state.phase), flap = state.mode === 'flap';
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.mode ? 'true' : 'false'));
    R.p.disabled = !flap; R.p.value = Math.round((((state.phase % 1) + 1) % 1) * 100);
    R.pOut.textContent = flap ? (stroke(state.phase) === 'down' ? 'Downstroke · 下拍' : 'Upstroke · 上舉') : 'No flapping · 不拍翅';
    R.wings.innerHTML = `${WINGS[k][0]}<small>${WINGS[k][1]}</small>`;
    R.path.innerHTML = `${PATH[path(state.mode)][0]}<small>${PATH[path(state.mode)][1]}</small>`;
    R.effort.innerHTML = `${EFFORT[effort(state.mode)][0]}<small>${EFFORT[effort(state.mode)][1]}</small>`;
    L.muscle.innerHTML = k === 'down' ? 'The big breast muscles pull the wings down<small>大塊的胸肌把翅膀往下拉</small>' : 'A smaller muscle lifts the wings, through a pulley<small>較小的肌肉像拉滑輪一樣把翅膀舉起來</small>';
    if (R.ins) R.ins.checked = state.inside;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.mode && WINGS[o.mode === 'flap' ? 'down' : o.mode]) state.mode = o.mode;
    if (o.phase != null) state.phase = +o.phase;
    if (o.inside != null) state.inside = !!o.inside;
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ mode: b.dataset.view })));
  R.p.addEventListener('input', () => { setPlaying(false); set({ phase: +R.p.value / 100 }); });
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="inside"]', (v) => set({ inside: v }));
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0, shown = '';
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing) {
      state.time += dt;
      if (state.mode === 'flap') state.phase = (state.phase + dt * 0.55) % 1;
      const k = holding(state.mode, state.phase);
      if (k !== shown) { shown = k; readout(); } else R.p.value = Math.round(state.phase * 100);
    }
    layout();
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
    down: () => { setPlaying(false); set({ mode: 'flap', phase: 0.25, inside: false }); },
    up: () => { setPlaying(false); set({ mode: 'flap', phase: 0.75, inside: false }); },
    inside: () => { set({ mode: 'flap', inside: true }); setPlaying(true); },
    soar: () => { set({ mode: 'soar', inside: false }); setPlaying(true); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：四種翅膀（不需要 WebGL） ----------
function initWings() {
  const el = document.querySelector('[data-life-wings]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-wg-pick button')];
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0];
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    const w = q('.lf-wg-shape'); w.dataset.k = it.key;
    q('.lf-wg-en').textContent = it.good_en; q('.lf-wg-zh').textContent = it.good_zh;
    q('.lf-wg-birds').textContent = it.birds_en; q('.lf-wg-birds-zh').textContent = it.birds_zh;
    q('.lf-wg-note').textContent = it.note_en; q('.lf-wg-note-zh').textContent = it.note_zh;
    el.dataset.k = it.key;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__wg = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWings);
else initWings();

lazyBoot('[data-lifebird-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
