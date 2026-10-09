/*
 * 地球與天氣 · 第十六課「溫室效應是什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：陽光穿過大氣把地面曬熱；地面再把熱（紅外線）往外送。大氣裡有些氣體會把一部分的熱攔下來、
 *   再往四面八方送出去，其中一半又回到地面。所以地面比「沒有這些氣體」的時候暖。
 *
 * 場景：一塊地面、上面一層空氣。黃色小點是陽光（往下），紅色小點是地面送出去的熱（往上）。
 * 三種大氣：沒有溫室氣體／今天的地球／更多。數字在 greencalc.js（−18°C 和 15°C 是真的；攔截的機率是示意）。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-greenhouse.js
 * 除錯：document.querySelector('[data-earthgreenhouse-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { GAS, REFLECT, CATCH, T_NONE, T_TODAY, returnChance } from './greencalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.9, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const W = 11, D = 3.2, A0 = 1.4, A1 = 4.4, TOP = 6.4, N_SUN = 60, N_HEAT = 90, N_GAS = 54;      // A0–A1：有溫室氣體的那一層

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
  scene.background = new Color(0x0c1730);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 2.9, 0);
  const homePos = () => TARGET.clone().add(V(0, 1.6, 21).multiplyScalar(camera.aspect < 0.85 ? 1.7 : camera.aspect < 1.1 ? 1.25 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 7; controls.maxDistance = 60;
  controls.minPolarAngle = 0.7; controls.maxPolarAngle = Math.PI * 0.54;
  controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 0.6;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x35507a, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 10, 8); scene.add(dl);

  const box = new BoxGeometry(1, 1, 1);
  const groundMat = std(0x5f9a5a);
  const ground = new Mesh(box, groundMat); ground.scale.set(W, 0.8, D); ground.position.y = -0.4; scene.add(ground);
  const airMat = new MeshStandardMaterial({ color: 0x6fb0ff, transparent: true, opacity: 0.12, depthWrite: false });
  const air = new Mesh(box, airMat); air.scale.set(W, A1 - A0, D); air.position.y = (A0 + A1) / 2; scene.add(air);
  const gas = new InstancedMesh(new SphereGeometry(0.13, 12, 10), std(0xffffff, { roughness: 0.5 }), N_GAS); gas.frustumCulled = false; scene.add(gas);
  const sunP = new InstancedMesh(new SphereGeometry(0.07, 8, 6), new MeshBasicMaterial({ color: 0xffe27a }), N_SUN); sunP.frustumCulled = false; scene.add(sunP);
  const heatP = new InstancedMesh(new SphereGeometry(0.08, 8, 6), new MeshBasicMaterial({ color: 0xff5a4a }), N_HEAT); heatP.frustumCulled = false; scene.add(heatP);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    sun: lab.add('cp-lb ew-gh-lb-s', 'Sunlight comes in<small>陽光進來</small>'), heat: lab.add('cp-lb ew-gh-lb-h', 'The ground sends heat out<small>地面把熱送出去</small>'),
    gas: lab.add('cp-lb', ''), out: lab.add('cp-lb', 'Heat escapes to space<small>熱逃到太空</small>'), temp: lab.add('cp-lb ew-lb-push', ''),
  };

  const R = { modes: [...root.querySelectorAll('.ew-gh-mode button')], bar: $('.ew-gh-bar'), status: $('.ew-gh-status'), temp: $('.ew-gh-temp'), back: $('.ew-gh-back'), gas: $('.ew-gh-gas'), msgs: [...root.querySelectorAll('.ew-gh-msg')], play: $('.al-play') };
  const state = { mode: 'today', labels: true, playing: true, clock: 0, sent: 0, back: 0 };
  // 陽光小點：斜斜往下；三分之一在半路被反射回去
  const S = [...Array(N_SUN).keys()].map((i) => ({ x: 0, y: 0, z: 0, up: false, bounce: hash(i, 1) < REFLECT, by: 2.5 + hash(i, 2) * 3, t0: hash(i, 3) }));
  // 熱的小點：從地面往上；穿過氣體層時可能被攔下來，再往上或往下
  const H = [...Array(N_HEAT).keys()].map((i) => ({ x: 0, y: -1, z: 0, vy: 1, alive: false, wait: hash(i, 4) * 4, rolled: false, flash: 0 }));
  const G = [...Array(N_GAS).keys()].map((i) => ({ x: (hash(i, 5) - 0.5) * (W - 0.6), y: A0 + 0.2 + hash(i, 6) * (A1 - A0 - 0.4), z: (hash(i, 7) - 0.5) * (D - 0.5), glow: 0 }));
  function resetCount() { state.sent = 0; state.back = 0; H.forEach((h) => { h.alive = false; h.wait = Math.random() * 2.2; h.flash = 0; }); G.forEach((m) => { m.glow = 0; }); }      // 換大氣的時候，還在半路上的熱全部重來

  function step(dt) {
    state.clock += dt;
    const g = GAS[state.mode], nGas = Math.round(Math.min(1, g / 3) * N_GAS);
    for (const s of S) {
      if (!s.up) { s.y -= dt * 2.6; s.x += dt * 1.0; if (s.bounce && s.y < s.by) s.up = true; if (s.y <= 0) { s.y = TOP + Math.random(); s.x = (Math.random() - 0.5) * (W - 1) - 1.4; s.z = (Math.random() - 0.5) * (D - 0.4); } }
      else { s.y += dt * 2.6; s.x += dt * 1.0; if (s.y > TOP + 0.6) { s.up = false; s.y = TOP + Math.random(); s.x = (Math.random() - 0.5) * (W - 1) - 1.4; s.z = (Math.random() - 0.5) * (D - 0.4); } }
    }
    for (const h of H) {
      if (!h.alive) { h.wait -= dt; if (h.wait <= 0) { h.alive = true; h.x = (Math.random() - 0.5) * (W - 0.8); h.z = (Math.random() - 0.5) * (D - 0.4); h.y = 0.05; h.vy = 1; h.rolled = false; state.sent += 1; } continue; }
      h.y += h.vy * dt * 1.7; h.flash = Math.max(0, h.flash - dt * 2.5);
      // 穿過氣體層的中間時，擲一次骰子：被攔下來的話，一半往上、一半往下
      if (h.vy > 0 && !h.rolled && h.y > (A0 + A1) / 2 + (Math.random() - 0.5) * 1.6) {
        h.rolled = true;
        if (Math.random() < 1 - (1 - CATCH) ** g) {
          h.flash = 1; if (nGas) { const m = G[Math.floor(Math.random() * nGas)]; m.glow = 1; h.x = m.x; h.y = m.y; h.z = m.z; }
          if (Math.random() < 0.5) h.vy = -1;
        }
      }
      if (h.y > TOP + 0.5) { h.alive = false; h.wait = 0.3 + Math.random() * 1.2; }
      if (h.vy < 0 && h.y <= 0.05) { state.back += 1; h.alive = false; h.wait = 0.2 + Math.random() * 0.8; }
    }
    for (const m of G) m.glow = Math.max(0, m.glow - dt * 1.8);
    if (state.sent > 400) { state.sent *= 0.5; state.back *= 0.5; }       // 只看最近的
  }

  const m4 = new Matrix4(), col = new Color(), COOL = new Color(0x4f8a70), WARM = new Color(0xd98a4a), GASC = new Color(0xb9c6da), GLOW = new Color(0xff8a6a);
  function draw() {
    const g = GAS[state.mode], nGas = Math.round(Math.min(1, g / 3) * N_GAS);
    airMat.opacity = 0.06 + 0.07 * Math.min(1, g / 3);
    groundMat.color.copy(COOL).lerp(WARM, state.mode === 'none' ? 0 : state.mode === 'today' ? 0.45 : 1);
    S.forEach((s, i) => { m4.makeScale(1, 1, 1).setPosition(s.x, s.y, s.z); sunP.setMatrixAt(i, m4); });
    H.forEach((h, i) => { const sc = h.alive ? 1 + h.flash * 0.9 : 0; m4.makeScale(sc, sc, sc).setPosition(h.x, h.y, h.z); heatP.setMatrixAt(i, m4); });
    G.forEach((m, i) => { const sc = i < nGas ? 1 + m.glow * 0.6 : 0; m4.makeScale(sc, sc, sc).setPosition(m.x, m.y, m.z); gas.setMatrixAt(i, m4); gas.setColorAt(i, col.copy(GASC).lerp(GLOW, m.glow)); });
    sunP.instanceMatrix.needsUpdate = true; heatP.instanceMatrix.needsUpdate = true; gas.instanceMatrix.needsUpdate = true; gas.instanceColor.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels && !narrow, md = state.mode;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(L.sun, on, V(-W / 2 + 1.2, TOP - 0.4, D / 2), 0);
    show(L.heat, on, V(W / 2 - 2.2, 0.5, D / 2), 0);
    L.gas.innerHTML = md === 'none' ? 'No greenhouse gases<small>沒有溫室氣體</small>' : 'Greenhouse gases catch some heat<small>溫室氣體攔下一部分的熱</small>';
    show(L.gas, on, V(0, A1 - 0.2, D / 2), -16);
    show(L.out, on, V(W / 2 - 1.6, TOP, D / 2), 0);
    L.temp.innerHTML = md === 'none' ? `About −${-T_NONE}°C<small>地面平均約零下 ${-T_NONE}°C</small>` : md === 'today' ? `About ${T_TODAY}°C<small>地面平均約 ${T_TODAY}°C</small>` : 'Warmer<small>比現在更暖</small>';
    show(L.temp, true, V(-1.5, 0.05, D / 2), 24);
  }

  function readout() {
    const md = state.mode, frac = state.sent > 40 ? state.back / state.sent : returnChance(md);
    R.modes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === md ? 'true' : 'false'));
    R.bar.style.width = `${Math.min(100, frac * 100 * 2)}%`;
    R.status.innerHTML = md === 'none' ? 'Nothing comes back<small>沒有熱回到地面</small>' : md === 'today' ? 'Some heat comes back<small>有一部分的熱回到地面</small>' : 'More heat comes back<small>更多的熱回到地面</small>';
    R.temp.innerHTML = md === 'none' ? `−${-T_NONE}°C<small>沒有溫室效應的地球</small>` : md === 'today' ? `${T_TODAY}°C<small>今天的地球（平均）</small>` : 'Warmer<small>比 15°C 更高</small>';
    R.back.innerHTML = `${Math.round(frac * 100)}%<small>送出去的熱有這麼多回到地面（示意）</small>`;
    R.gas.innerHTML = md === 'none' ? 'None<small>沒有</small>' : md === 'today' ? 'As today<small>和今天一樣</small>' : 'Much more<small>多很多</small>';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== md; });
  }

  function set(o) { if (o.mode && o.mode in GAS && o.mode !== state.mode) { state.mode = o.mode; resetCount(); } if (o.run) for (let i = 0; i < o.run * 20; i++) step(0.05); draw(); readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.modes.forEach((b) => b.addEventListener('click', () => { set({ mode: b.dataset.mode }); setPlaying(true); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) step(dt);
    draw();
    controls.update();
    updateLabels();
    if (t - lastR > 250) { lastR = t; readout(); }
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

  S.forEach((s) => { s.y = Math.random() * TOP; s.x = (Math.random() - 0.5) * (W - 1); s.z = (Math.random() - 0.5) * (D - 0.4); });
  for (let i = 0; i < 80; i++) step(0.05);
  draw(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (m) => { set({ mode: m }); setPlaying(true); };
  const DEMO = { none: () => go('none'), today: () => go('today'), more: () => go('more') };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：三個世界的溫度（不需要 WebGL） ----------------
function initBlanket() {
  const el = document.querySelector('[data-earth-blanket]');
  if (!el) return;
  const ws = JSON.parse(el.dataset.worlds), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.ew-bk-w button')];
  function show(i) {
    const w = ws[i];
    btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    q('.ew-bk-t').textContent = `${w.temp < 0 ? '−' + -w.temp : w.temp}°C`;
    q('.ew-bk-fill').style.setProperty('--h', `${Math.max(4, Math.min(100, ((w.temp + 40) / 520) * 100))}%`);
    q('.ew-bk-fill').dataset.k = w.temp < 0 ? 'cold' : w.temp < 60 ? 'mild' : 'hot';
    q('.ew-bk-name').textContent = w.en; q('.ew-bk-name-zh').textContent = w.zh;
    q('.ew-bk-en').textContent = w.note_en; q('.ew-bk-zh').textContent = w.note_zh;
    el.dataset.i = String(i);
  }
  btns.forEach((b, k) => b.addEventListener('click', () => show(k)));
  show(1);
  el.__bk = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBlanket);
else initBlanket();

lazyBoot('[data-earthgreenhouse-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
