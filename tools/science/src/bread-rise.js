/*
 * 萬物原理 · 第十八課「麵包為什麼會膨脹？」的 3D 剖開的麵糰（自繪示意；酵母和氣泡畫得比真的大非常多、也少非常多）。
 *
 * 一個機制：酵母（活的小生物）吃麵糰裡的糖、吐出二氧化碳；有彈性的麵筋把氣體包成一個個氣泡，麵糰就被撐大。
 *   越溫暖酵母越快；沒有酵母就不會長大；送去烤（或蒸），氣體受熱再脹大一次，然後麵糰定型、留下小洞。
 *
 * 場景：一顆切開一半的麵糰，切面朝鏡頭（+z）。畫面只由（時間 t、溫度 T、有沒有酵母、烤了沒）決定，
 *   所以時間滑桿可以來回拉。數字用 breadcalc.js（示意模型，1 秒 ≈ 6 分鐘）。
 *
 * 產物：cd tools/science && npm run build → assets/js/bread-rise.js
 */
import {
  AmbientLight, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, HemisphereLight, InstancedMesh,
  MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene, SphereGeometry,
  Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { T_MAX, TEMP_MIN, TEMP_MAX, rate, rise, size } from './breadcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const MIN_PER_SEC = 6;
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
// 半圓切面裡的點（單位半圓：x ∈ [−1,1]、y ∈ [0,1]）
function facePoints(n, seed, margin) {
  const pts = [];
  for (let i = 0; pts.length < n && i < n * 40; i++) {
    const x = (hash(i, seed) * 2 - 1) * 0.95, y = 0.05 + hash(i, seed + 1) * 0.9;
    if (x * x + y * y > (1 - margin) * (1 - margin)) continue;
    if (pts.some((p) => Math.hypot(p.x - x, p.y - y) < margin * 0.9)) continue;
    pts.push({ x, y });
  }
  return pts;
}
const BUBBLES = facePoints(44, 3, 0.13).map((p, i) => ({ ...p, r: 0.035 + hash(i, 9) * 0.06 }));
const YEAST = facePoints(34, 17, 0.1).map((p) => {
  let best = 0, bd = 9;
  BUBBLES.forEach((b, j) => { const d = Math.hypot(b.x - p.x, b.y - p.y); if (d < bd) { bd = d; best = j; } });
  return { ...p, to: best };
});
const N_GAS = YEAST.length * 3;

const MSG = {
  warm: ['The yeast is eating sugar and giving off carbon dioxide gas. Stretchy gluten traps the gas in bubbles, and the growing bubbles push the dough up.',
    '酵母正在吃糖、吐出二氧化碳。有彈性的麵筋把氣體包成一個個氣泡，氣泡越來越大，就把麵糰撐高。'],
  cold: ['It is cold, so the yeast works very slowly. The dough still rises, but it takes much longer. This is why bakers leave dough somewhere warm.',
    '太冷了，酵母做得很慢。麵糰還是會長大，但要等很久。所以發麵要放在溫暖的地方。'],
  none: ['No yeast, no gas. Nothing is blowing up the bubbles, so the dough just sits there, heavy and flat.',
    '沒有酵母，就沒有氣體。沒有東西把氣泡吹大，麵糰只是待在那裡，又重又扁。'],
  full: ['The dough has almost doubled. The yeast is running out of food, and the gluten is stretched thin. Time to bake it or steam it!',
    '麵糰快要變成兩倍大了。酵母的食物快吃完了，麵筋也撐得很薄。可以送去烤或蒸了！'],
  baked: ['In the heat, the gas in every bubble swells once more. Then the dough sets firm and the yeast stops. The holes stay, and that is why bread is soft.',
    '一受熱，每個氣泡裡的氣體又脹大一次。接著麵糰定型，酵母也停了。小洞留了下來，所以麵包是鬆軟的。'],
  bakedFlat: ['This dough had no gas in it, so the heat had nothing to swell. It bakes into something hard and flat.',
    '這塊麵糰裡沒有氣體，受熱也沒有東西可以脹大。烤出來又硬又扁。'],
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
  const BG_COLD = new Color(0x10233f), BG_WARM = new Color(0x33241c), BG_OVEN = new Color(0x4a2410);
  scene.background = BG_WARM.clone();
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 0.95, 0);
  const homePos = () => TARGET.clone().add(V(0.5, 1.3, 5.9).multiplyScalar(camera.aspect < 0.85 ? 1.45 : camera.aspect < 1.2 ? 1.15 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 2.5; controls.maxDistance = 20; controls.maxPolarAngle = Math.PI * 0.49;
  controls.minAzimuthAngle = -1.2; controls.maxAzimuthAngle = 1.2;      // 切面只有正面有，別轉到背後
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xfff3e0, 0x3a2a20, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sun = new DirectionalLight(0xffffff, 1.1); sun.position.set(3, 7, 6); scene.add(sun);

  // ---------------- 砧板、麵糰（後半顆圓頂＋朝前的切面） ----------------
  scene.add(at(new Mesh(new CylinderGeometry(2.9, 2.9, 0.16, 48), new MeshStandardMaterial({ color: 0x9c6b3f, roughness: 0.8 })), 0, -0.08, -0.4));
  const domeMat = new MeshStandardMaterial({ color: 0xe9d3a6, roughness: 0.75, side: DoubleSide });
  const dome = new Mesh(new SphereGeometry(1, 56, 28, Math.PI, Math.PI, 0, Math.PI / 2), domeMat); scene.add(dome);
  const faceMat = new MeshStandardMaterial({ color: 0xf4e4bf, roughness: 0.9 });
  const face = new Mesh(new CircleGeometry(1, 64, 0, Math.PI), faceMat); scene.add(face);
  const C_DOUGH = new Color(0xe9d3a6), C_CRUST = new Color(0xb4722a), C_FACE = new Color(0xf4e4bf), C_CRUMB = new Color(0xfaf0d6);

  const disc = new CircleGeometry(1, 24);
  const bubbles = new InstancedMesh(disc, new MeshBasicMaterial({ color: 0xa98a5c }), BUBBLES.length);
  const shine = new InstancedMesh(disc, new MeshBasicMaterial({ color: 0xc9ad7e }), BUBBLES.length);
  const yeast = new InstancedMesh(disc, new MeshBasicMaterial({ color: 0xff7a2a }), YEAST.length);
  const gas = new InstancedMesh(disc, new MeshBasicMaterial({ color: 0xffffff }), N_GAS);
  for (const m of [bubbles, shine, yeast, gas]) { m.frustumCulled = false; scene.add(m); }

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    yeast: lab.add('bt-lb br-lb-yeast', 'Yeast: a tiny living thing<small>酵母：活的小生物</small>'),
    gas: lab.add('bt-lb bt-lb-a', 'Carbon dioxide gas<small>二氧化碳</small>'),
    bubble: lab.add('bt-lb bt-lb-b', 'Gas bubble<small>氣泡</small>'),
    gluten: lab.add('bt-lb ip-region', 'Stretchy gluten holds the gas in<small>有彈性的麵筋把氣體包住</small>'),
    crust: lab.add('bt-lb br-lb-crust', 'Baked: the holes stay<small>烤好了：小洞留了下來</small>'),
  };

  const R = {
    time: $('.br-time'), timeOut: $('.br-time-out'), temp: $('.br-temp'), tempOut: $('.br-temp-out'), status: $('.br-status'),
    size: $('.br-size'), speed: $('.br-speed'), bars: { warm: $('.br-bar-warm'), cold: $('.br-bar-cold'), none: $('.br-bar-none') },
    bake: $('.br-bake'), reset: $('.br-reset'), msg: $('.br-msg'), play: $('.al-play'),
  };
  const state = { t: 0, T: 30, yeast: true, baked: false, bakeK: 0, labels: true, playing: true, clock: 0, lastMsg: '' };

  // ---------------- 由（t、T、yeast、baked）算出整個畫面 ----------------
  const tmpM = new Matrix4(), tmpQ = new Quaternion(), tmpS = V(1, 1, 1), p = V(0, 0, 0), q = V(0, 0, 0);
  const dims = { a: 1.5, b: 1 };
  function draw() {
    const k = state.bakeK;
    const s = MathUtils.lerp(size(state.t, state.T, state.yeast, false), size(state.t, state.T, state.yeast, true), k);
    const g = rise(state.t, state.T, state.yeast);                 // 氣泡長大的程度 0～1
    const a = 1.5 * Math.pow(s, 0.2), b = 1.0 * Math.pow(s, 0.6);
    dims.a = a; dims.b = b;
    dome.scale.set(a, b, a * 0.8); face.scale.set(a, b, 1);
    domeMat.color.copy(C_DOUGH).lerp(C_CRUST, k); faceMat.color.copy(C_FACE).lerp(C_CRUMB, k);
    const br = (bb) => (0.012 + bb.r * 1.9 * g) * (1 + 0.15 * k);
    BUBBLES.forEach((bb, i) => {
      const r = br(bb);
      tmpM.compose(p.set(bb.x * a, bb.y * b, 0.012), tmpQ.identity(), tmpS.set(r, r, 1)); bubbles.setMatrixAt(i, tmpM);
      tmpM.compose(p.set(bb.x * a + r * 0.2, bb.y * b - r * 0.2, 0.016), tmpQ, tmpS.set(r * 0.62, r * 0.62, 1)); shine.setMatrixAt(i, tmpM);
    });
    const alive = state.yeast ? 1 - k : 0;
    YEAST.forEach((y, i) => {
      const r = state.yeast ? 0.03 * (1 - 0.5 * k) : 0;
      tmpM.compose(p.set(y.x * a, y.y * b, 0.02), tmpQ.identity(), tmpS.set(r * 1.25, r, 1)); yeast.setMatrixAt(i, tmpM);
    });
    // 二氧化碳：從酵母飄進最近的氣泡；越溫暖越多、越快
    const sp = rate(state.T) / rate(35), food = 1 - g * 0.85;
    for (let n = 0; n < N_GAS; n++) {
      const y = YEAST[n % YEAST.length], bb = BUBBLES[y.to];
      const ph = (state.clock * (0.25 + 0.75 * sp) * 0.9 + hash(n, 31)) % 1;
      const on = alive > 0.05 && hash(n, 37) < (0.25 + 0.75 * sp) * food ? 1 : 0;
      p.set(y.x * a, y.y * b, 0.03); q.set(bb.x * a, bb.y * b, 0.03);
      p.lerp(q, ph); p.x += Math.sin(ph * 9 + n) * 0.02;
      const r = on * 0.013 * Math.sin(Math.PI * ph) * alive;
      tmpM.compose(p, tmpQ.identity(), tmpS.set(r, r, 1)); gas.setMatrixAt(n, tmpM);
    }
    for (const m of [bubbles, shine, yeast, gas]) m.instanceMatrix.needsUpdate = true;
    const w = MathUtils.clamp((state.T - TEMP_MIN) / (TEMP_MAX - TEMP_MIN), 0, 1);
    scene.background.copy(BG_COLD).lerp(BG_WARM, w).lerp(BG_OVEN, k);
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, { a, b } = dims, done = state.bakeK > 0.6;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const y0 = YEAST.reduce((m, y) => (y.x < m.x ? y : m), YEAST[0]);
    show(L.yeast, on && state.yeast && !done, V(y0.x * a, y0.y * b, 0.03), -22); L.yeast.style.marginLeft = narrow ? '20px' : '-70px';
    const big = BUBBLES.reduce((m, x) => (x.r > m.r && x.y > 0.35 ? x : m), BUBBLES[0]);
    show(L.bubble, on && rise(state.t, state.T, state.yeast) > 0.15, V(big.x * a, big.y * b, 0.03), -26);
    const y1 = YEAST.reduce((m, y) => (y.x > m.x ? y : m), YEAST[0]);
    show(L.gas, on && state.yeast && !done && !narrow, V((y1.x * 0.6 + BUBBLES[y1.to].x * 0.4) * a, (y1.y * 0.6 + BUBBLES[y1.to].y * 0.4) * b, 0.03), 22); L.gas.style.marginLeft = '70px';
    show(L.gluten, on && !done, V(0, 0.08 * b, 0.03), 30);
    show(L.crust, done, V(0, b, 0), -24);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const hm = (m) => (m < 60 ? `${Math.round(m)} min` : `${Math.floor(m / 60)} h ${String(Math.round(m % 60)).padStart(2, '0')} min`);
  function readout() {
    const { t, T } = state;
    R.timeOut.textContent = hm(t); R.time.value = String(t); R.time.style.setProperty('--p', `${t / T_MAX * 100}%`);
    R.tempOut.textContent = `${T}°C`; R.temp.value = String(T); R.temp.style.setProperty('--p', `${(T - TEMP_MIN) / (TEMP_MAX - TEMP_MIN) * 100}%`);
    const s = size(t, T, state.yeast, state.baked);
    R.size.textContent = `× ${s.toFixed(2)}`;
    const sp = rate(T) / rate(35);
    R.speed.innerHTML = !state.yeast ? 'None<small>沒有</small>' : state.baked ? 'Stopped<small>停了</small>' : sp > 0.6 ? 'Fast<small>快</small>' : sp > 0.25 ? 'Medium<small>普通</small>' : 'Slow<small>慢</small>';
    const sc = { warm: size(t, 35, true), cold: size(t, 5, true), none: size(t, 35, false) };
    for (const key of Object.keys(sc)) {
      R.bars[key].style.setProperty('--w', `${Math.max(2, (sc[key] - 1) * 100)}%`);
      R.bars[key].querySelector('b').textContent = `× ${sc[key].toFixed(2)}`;
    }
    const g = rise(t, T, state.yeast);
    let key, st;
    if (state.baked) { key = g > 0.2 ? 'baked' : 'bakedFlat'; st = g > 0.2 ? ['Baked: soft and full of holes', '烤好了：鬆軟、滿是小洞', 'ok'] : ['Baked: hard and flat', '烤好了：又硬又扁', 'bad']; }
    else if (!state.yeast) { key = 'none'; st = ['No yeast: not rising', '沒有酵母：不會長大', 'bad']; }
    else if (g > 0.88) { key = 'full'; st = ['Almost doubled', '快要兩倍大了', 'ok']; }
    else if (T < 16) { key = 'cold'; st = ['Rising very slowly', '長得很慢', '']; }
    else { key = 'warm'; st = ['Rising', '正在長大', 'ok']; }
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `br-status ${st[2]}`;
    R.bake.disabled = state.baked; R.reset.disabled = !state.baked && t === 0;
    root.classList.toggle('br-baked', state.baked);
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setPlaying(v) {
    state.playing = v && !state.baked;
    root.classList.toggle('is-playing', state.playing);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setTime(v) { state.t = MathUtils.clamp(+v, 0, T_MAX); }
  function setTemp(v) { state.T = MathUtils.clamp(Math.round(+v), TEMP_MIN, TEMP_MAX); }
  function setYeast(v) { state.yeast = !!v; const el = $('[data-t="yeast"]'); if (el) el.checked = state.yeast; }
  function bake() { state.baked = true; setPlaying(false); }
  function reset() { state.baked = false; state.bakeK = 0; state.t = 0; setPlaying(true); }
  R.time.addEventListener('input', () => { if (state.baked) { state.baked = false; state.bakeK = 0; } setTime(R.time.value); setPlaying(false); });
  R.temp.addEventListener('input', () => setTemp(R.temp.value));
  R.bake.addEventListener('click', bake);
  R.reset.addEventListener('click', reset);
  R.play.addEventListener('click', () => { if (state.baked) { reset(); return; } if (!state.playing && state.t >= T_MAX - 0.01) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="yeast"]', setYeast);
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(pp, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(pp); fly.t1.copy(t); fly.t = 0; }

  function step(dt) {
    state.clock += dt;
    if (state.playing) {
      state.t = Math.min(T_MAX, state.t + dt * MIN_PER_SEC);
      if (state.t >= T_MAX) setPlaying(false);
    }
    state.bakeK = MathUtils.clamp(state.bakeK + (state.baked ? dt / 1.6 : -dt / 0.4), 0, 1);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    draw();
  }

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 120) { lastR = t; readout(); }
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
    root.classList.toggle('bt-narrow', narrow);
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
    warm: () => { reset(); setYeast(true); setTemp(35); },
    fridge: () => { reset(); setYeast(true); setTemp(5); },
    noyeast: () => { reset(); setTemp(35); setYeast(false); },
    bake: () => { reset(); setYeast(true); setTemp(35); setTime(60); bake(); },
  };
  // 除錯：document.querySelector('[data-bread-lab]').__lab
  root.__lab = {
    camera, controls, state, setTime, setTemp, setYeast, setPlaying, bake, reset,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-bread-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
