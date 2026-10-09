/*
 * 地球與天氣 · 第十五課「我們怎麼知道地球幾歲？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：有些原子會照固定的速度變成另一種原子，每過一個「半衰期」就剩下一半。
 *   數一數岩石裡還剩多少原來的原子、多了多少變出來的原子，就能算出這塊岩石形成多久了。
 *
 * 場景：一塊岩石裡的 400 顆原子（20×20）。綠色是還沒變的（母原子），灰色是變過的（子原子）。
 * 時間滑桿以「半衰期」為單位；三座鐘（鈾 238、鈾 235、碳 14）換算成年。數字在 agecalc.js。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-age.js
 * 除錯：document.querySelector('[data-earthage-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { remaining, CLOCKS, ageYears, fmtYears, EARTH, T_MAX, daySeconds, clockText } from './agecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const N_SIDE = 20, N = N_SIDE * N_SIDE, GAP = 0.42;
const CLOCK_NAME = { u238: ['Uranium-238 → lead', '鈾 238 → 鉛'], u235: ['Uranium-235 → lead', '鈾 235 → 鉛'], c14: ['Carbon-14 → nitrogen', '碳 14 → 氮'] };

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
  scene.background = new Color(0x0d1428);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 0, 0);
  const homePos = () => TARGET.clone().add(V(0, 13.5, 9.5).multiplyScalar(camera.aspect < 0.85 ? 1.55 : camera.aspect < 1.1 ? 1.15 : 1.06));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 45;
  controls.minPolarAngle = 0.1; controls.maxPolarAngle = Math.PI * 0.46;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 10, 6); scene.add(dl);

  const half = (N_SIDE - 1) * GAP / 2;
  const slab = new Mesh(new BoxGeometry(N_SIDE * GAP + 0.7, 0.5, N_SIDE * GAP + 0.7), std(0x6f6455, { roughness: 0.95 })); slab.position.y = -0.4; scene.add(slab);
  const atoms = new InstancedMesh(new SphereGeometry(0.15, 14, 10), std(0xffffff), N); atoms.frustumCulled = false; scene.add(atoms);
  // 每顆原子在「第幾個半衰期」變掉：u 是 0–1 的亂數，剩下的比例低於 u 的時候就變
  const when = new Float32Array(N); for (let i = 0; i < N; i++) when[i] = -Math.log2(Math.max(1e-6, hash(i, 1)));

  const lab = labeler($('.al-labels'), cv, camera);
  const L = { parent: lab.add('cp-lb ew-ag-lb-p', ''), child: lab.add('cp-lb ew-ag-lb-c', '') };

  const R = {
    clocks: [...root.querySelectorAll('.ew-ag-clock button')], t: $('.ew-ag-t'), tOut: $('.ew-ag-t-out'), bar: $('.ew-ag-bar'), status: $('.ew-ag-status'),
    left: $('.ew-ag-left'), made: $('.ew-ag-made'), age: $('.ew-ag-age'), msgs: [...root.querySelectorAll('.ew-ag-msg')], play: $('.al-play'),
  };
  const state = { clock: 'u238', t: 0, labels: true, playing: true, hold: 0 };

  const m4 = new Matrix4(), col = new Color(), PARENT = new Color(0x57e08a), CHILD = new Color(0x8b93a6), FLASH = new Color(0xffffff);
  function count() { let p = 0; for (let i = 0; i < N; i++) if (when[i] > state.t) p++; return p; }
  function draw() {
    for (let i = 0; i < N; i++) {
      const x = (i % N_SIDE) * GAP - half, z = Math.floor(i / N_SIDE) * GAP - half, done = when[i] <= state.t, since = state.t - when[i];
      const pop = done && since < 0.06 ? 1.5 : 1;
      m4.makeScale(pop, pop, pop).setPosition(x, 0, z); atoms.setMatrixAt(i, m4);
      atoms.setColorAt(i, done ? col.copy(CHILD).lerp(FLASH, since < 0.06 ? 1 - since / 0.06 : 0) : PARENT);
    }
    atoms.instanceMatrix.needsUpdate = true; atoms.instanceColor.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const p = count(), on = state.labels;
    L.parent.innerHTML = `${p} left<small>還剩 ${p} 顆沒變</small>`; L.child.innerHTML = `${N - p} changed<small>${N - p} 顆變過了</small>`;
    L.parent.hidden = !on; L.child.hidden = !on;
    if (on) { lab.place(L.parent, V(-half, 0.2, -half - 0.6), -14); lab.place(L.child, V(half, 0.2, -half - 0.6), -14); }
  }

  function readout() {
    const p = count(), frac = p / N, y = ageYears(state.clock, state.t), f = fmtYears(y);
    R.clocks.forEach((b) => b.setAttribute('aria-pressed', b.dataset.clock === state.clock ? 'true' : 'false'));
    R.t.value = String(Math.round(state.t * 100)); R.t.style.setProperty('--p', `${(state.t / T_MAX) * 100}%`);
    R.tOut.textContent = `${state.t.toFixed(2)} half-lives · 個半衰期`;
    R.bar.style.width = `${frac * 100}%`;
    R.status.innerHTML = `${CLOCK_NAME[state.clock][0]}<small>${CLOCK_NAME[state.clock][1]}；半衰期 ${fmtYears(CLOCKS[state.clock].half).zhFull}</small>`;
    R.left.innerHTML = `${p} of ${N}<small>${Math.round(frac * 100)}%（理論值 ${Math.round(remaining(state.t) * 100)}%）</small>`;
    R.made.innerHTML = `${N - p}<small>變出來的原子</small>`;
    R.age.innerHTML = `${f.n} ${f.en}<small>${f.zhFull}</small>`;
    const key = state.t < 0.5 ? 'fresh' : state.t < 1.5 ? 'half' : 'old';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.clock && CLOCKS[o.clock]) state.clock = o.clock;
    if (o.t != null) state.t = Math.min(T_MAX, Math.max(0, o.t));
    state.hold = 0; draw(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.clocks.forEach((b) => b.addEventListener('click', () => set({ clock: b.dataset.clock })));
  R.t.addEventListener('input', () => { setPlaying(false); set({ t: +R.t.value / 100 }); });
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= T_MAX) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let lastR = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (tm - (last || tm)) / 1000);
    last = tm;
    if (state.playing) {
      if (state.t < T_MAX) state.t = Math.min(T_MAX, state.t + dt * 0.22);
      else { state.hold += dt; if (state.hold > 3) { state.t = 0; state.hold = 0; } }
    }
    draw();
    controls.update();
    updateLabels();
    if (tm - lastR > 120) { lastR = tm; readout(); }
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

  draw(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o) => { setPlaying(false); set(o); };
  const DEMO = { one: () => go({ clock: 'u238', t: 1 }), two: () => go({ clock: 'u238', t: 2 }), earth: () => go({ clock: 'u238', t: EARTH / CLOCKS.u238.half }), bone: () => go({ clock: 'c14', t: 2 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying, count,
    render: () => { draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：把地球的歷史縮成一天（不需要 WebGL） ----------------
function initDay() {
  const el = document.querySelector('[data-earth-oneday]');
  if (!el) return;
  const ev = JSON.parse(el.dataset.events), q = (s) => el.querySelector(s), rows = [...el.querySelectorAll('.ew-dy-row')], hand = q('.ew-dy-hand');
  rows.forEach((r, i) => { r.querySelector('.ew-dy-time').textContent = clockText(daySeconds(ev[i].ma)); });
  function show(i) {
    const e = ev[i], s = daySeconds(e.ma), left = 86400 - s;
    rows.forEach((r, k) => r.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    hand.style.setProperty('--a', `${(s / 86400) * 360}deg`);
    q('.ew-dy-clock').textContent = clockText(s);
    q('.ew-dy-name').textContent = e.en; q('.ew-dy-name-zh').textContent = e.zh;
    q('.ew-dy-left').textContent = left >= 3600 ? `${(left / 3600).toFixed(1)} hours` : left >= 60 ? `${Math.round(left / 60)} minutes` : `${Math.round(left)} seconds`;
    q('.ew-dy-left-zh').textContent = left >= 3600 ? `${(left / 3600).toFixed(1)} 小時` : left >= 60 ? `${Math.round(left / 60)} 分鐘` : `${Math.round(left)} 秒`;
    q('.ew-dy-en').textContent = e.note_en; q('.ew-dy-zh').textContent = e.note_zh;
    el.dataset.i = String(i);
  }
  rows.forEach((r, k) => r.addEventListener('click', () => show(k)));
  show(rows.length - 1);
  el.__dy = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDay);
else initDay();

lazyBoot('[data-earthage-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
