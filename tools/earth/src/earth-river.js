/*
 * 地球與天氣 · 第十一課「河流怎麼改變大地？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：河流是搬運工。水流得快就帶得動大顆粒，慢下來就把它們放下——大的先放、小的後放。
 *   所以山區被切深（侵蝕），礫石停在山腳（沖積扇），沙鋪在平原，泥一路到海。
 *
 * 場景：一條從山到海的河的立體剖面，切成一格一格；三種顆粒跟著水走，停下來就堆高那一格。
 * 水量三段：枯水期／平常／颱風大水。數字都是示意，在 rivercalc.js。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-river.js
 * 除錯：document.querySelector('[data-earthriver-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { X0, X1, FOOT, SHORE, ground, flow, settleX, zoneOf, GRAINS, WATER } from './rivercalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.9, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const NB = 70, DX = (X1 - X0) / NB, ZW = 5, FLOOR = -1.1, N_GRAIN = 150, FULL = 70;      // FULL：幾秒把時間條跑滿
const KINDS = ['gravel', 'sand', 'mud'], COLOR = { gravel: 0x8d8778, sand: 0xe2c275, mud: 0x6a4a2f }, SIZE = { gravel: 0.11, sand: 0.07, mud: 0.045 };
const ZONE = { mountain: ['In the mountains', '還在山裡'], fan: ['At the foot of the mountains', '山腳（沖積扇）'], plain: ['On the plain', '平原'], sea: ['In the sea', '海裡'] };
const binX = (b) => X0 + (b + 0.5) * DX, binOf = (x) => Math.min(NB - 1, Math.max(0, Math.floor((x - X0) / DX)));
// 河道的寬度：山裡窄，出了山口散開，平原上再收成一條
const chanW = (x) => (x < FOOT ? 0.7 : x < SHORE ? 0.7 + 1.9 * Math.exp(-(((x - FOOT - 0.9) / 1.1) ** 2)) + 0.5 * ((x - FOOT) / (SHORE - FOOT)) : 2.6);

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
  scene.background = new Color(0x9cc8ee);
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0, 0.9, 0);
  const homePos = () => TARGET.clone().add(V(0, 8.5, 17.5).multiplyScalar(camera.aspect < 0.85 ? 1.9 : camera.aspect < 1.1 ? 1.45 : 1.22));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 7; controls.maxDistance = 70;
  controls.minPolarAngle = 0.3; controls.maxPolarAngle = Math.PI * 0.48;
  controls.minAzimuthAngle = -0.9; controls.maxAzimuthAngle = 0.9;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x4a5a3a, 1.15));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const dl = new DirectionalLight(0xffffff, 1.0); dl.position.set(-5, 10, 7); scene.add(dl);

  const box = new BoxGeometry(1, 1, 1);
  const land = new InstancedMesh(box, std(0xffffff), NB * 2); land.frustumCulled = false; scene.add(land);     // 每格：兩岸
  const bed = new InstancedMesh(box, std(0xffffff), NB); bed.frustumCulled = false; scene.add(bed);            // 每格：河床（會被切深）
  const water = new InstancedMesh(box, new MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }), NB); water.frustumCulled = false; scene.add(water);
  const dep = {}; KINDS.forEach((k) => { dep[k] = new InstancedMesh(box, std(COLOR[k]), NB); dep[k].frustumCulled = false; scene.add(dep[k]); });
  const grains = new InstancedMesh(new SphereGeometry(1, 8, 6), new MeshBasicMaterial({ color: 0xffffff }), N_GRAIN); grains.frustumCulled = false; scene.add(grains);
  const seaBox = new Mesh(box, new MeshStandardMaterial({ color: 0x2a6fc9, roughness: 0.35, transparent: true, opacity: 0.82 }));
  seaBox.scale.set(X1 - SHORE, 0.5, ZW); seaBox.position.set((X1 + SHORE) / 2, -0.25, 0); scene.add(seaBox);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    mt: lab.add('cp-lb', 'Mountains: fast water cuts down<small>山區：水快，往下切</small>'), fan: lab.add('cp-lb ew-lb-push', 'The river leaves the mountains<small>出山口：水慢下來</small>'),
    plain: lab.add('cp-lb', 'Plain: slow water<small>平原：水流得慢</small>'), sea: lab.add('cp-lb', 'Sea: the water stops<small>海：水停下來</small>'),
  };

  const R = {
    waters: [...root.querySelectorAll('.ew-rv-water button')], bar: $('.ew-rv-bar'), status: $('.ew-rv-status'), reset: $('.ew-rv-reset'),
    out: { gravel: $('.ew-rv-gravel'), sand: $('.ew-rv-sand'), mud: $('.ew-rv-mud') }, msgs: [...root.querySelectorAll('.ew-rv-msg')], play: $('.al-play'),
  };
  const state = { water: 'normal', t: 0, labels: true, playing: true, clock: 0 };
  const cut = new Float32Array(NB), pile = { gravel: new Float32Array(NB), sand: new Float32Array(NB), mud: new Float32Array(NB) };
  const G = [...Array(N_GRAIN).keys()].map((i) => ({ kind: KINDS[i % 3], x: X0 + hash(i, 1) * (X1 - X0) * 0.6, k: 0.86 + hash(i, 2) * 0.28, z: hash(i, 3) - 0.5 }));
  function resetSim() { cut.fill(0); KINDS.forEach((k) => pile[k].fill(0)); state.t = 0; G.forEach((g, i) => { g.x = X0 + hash(i, 1) * 2.5; }); }

  function sim(dt) {
    state.t = Math.min(FULL, state.t + dt);
    for (let b = 0; b < NB; b++) { const x = binX(b); if (x < FOOT - 0.3) cut[b] = Math.min(1.25, cut[b] + dt * 0.012 * flow(x, state.water) * (0.5 + 0.5 * Math.min(1, (FOOT - x) / 2))); }
    for (const g of G) {
      const f = flow(g.x, state.water);
      if (f < GRAINS[g.kind] * g.k || g.x >= X1 - 0.2) {
        const b = binOf(g.x + (g.x >= SHORE ? Math.random() * 2.2 : 0)), tot = pile.gravel[b] + pile.sand[b] + pile.mud[b];
        if (tot < (binX(b) >= SHORE ? 0.36 : 0.5)) pile[g.kind][b] += 0.012;
        g.x = X0 + 0.2 + Math.random() * 1.6;
      } else g.x += f * dt * 2.4;
    }
  }

  const m4 = new Matrix4(), col = new Color(), ROCK = new Color(0x7d8a70), GRASS = new Color(0x6fa35c), SEABED = new Color(0xb9a77c), BLUE = new Color(0x3f8fe0), BROWN = new Color(0x9a7448);
  const sm = (a, b) => (a[Math.max(0, b - 2)] + a[Math.max(0, b - 1)] * 2 + a[b] * 3 + a[Math.min(NB - 1, b + 1)] * 2 + a[Math.min(NB - 1, b + 2)]) / 9;       // 顯示用的平滑
  const put = (mesh, i, x, y0, y1, z, w) => { const h = Math.max(0.001, y1 - y0); m4.makeScale(DX * 1.02, h, w).setPosition(x, y0 + h / 2, z); mesh.setMatrixAt(i, m4); };
  function draw() {
    const muddy = state.water === 'flood' ? 0.75 : state.water === 'normal' ? 0.4 : 0.15, depth = 0.05 + 0.07 * WATER[state.water];
    for (let b = 0; b < NB; b++) {
      const x = binX(b), g = ground(x), w = chanW(x), side = (ZW - w) / 2, bedY = g - 0.12 - cut[b];
      put(land, b * 2, x, FLOOR, g, -(w / 2 + side / 2), side); put(land, b * 2 + 1, x, FLOOR, g, w / 2 + side / 2, side);
      col.copy(x < FOOT ? ROCK : x < SHORE ? GRASS : SEABED); if (x < FOOT) col.lerp(GRASS, Math.max(0, 1 - (FOOT - x) / 2.5) * 0.7);
      land.setColorAt(b * 2, col); land.setColorAt(b * 2 + 1, col);
      put(bed, b, x, FLOOR, bedY, 0, w); bed.setColorAt(b, col.copy(x < SHORE ? ROCK : SEABED).multiplyScalar(0.85));
      let y = bedY;
      for (const k of KINDS) { const h = sm(pile[k], b); put(dep[k], b, x, y, y + h, 0, w); y += h; }
      if (x < SHORE) put(water, b, x, y, y + depth, 0, w * 0.82); else { m4.makeScale(0, 0, 0); water.setMatrixAt(b, m4); }
      water.setColorAt(b, col.copy(BLUE).lerp(BROWN, muddy));
    }
    for (const m of [land, bed, water, dep.gravel, dep.sand, dep.mud]) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
    G.forEach((g, i) => {
      const b = binOf(g.x), x = g.x, w = chanW(x), top = ground(x) - 0.12 - cut[b] + sm(pile.gravel, b) + sm(pile.sand, b) + sm(pile.mud, b), s = SIZE[g.kind];
      m4.makeScale(s, s, s).setPosition(x, Math.max(top, x >= SHORE ? -0.45 : -9) + depth + s * 0.4, g.z * w * 0.7); grains.setMatrixAt(i, m4); grains.setColorAt(i, col.set(COLOR[g.kind]));
    });
    grains.instanceMatrix.needsUpdate = true; grains.instanceColor.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels && !narrow;
    const show = (el, s, p, dy = 0) => { el.hidden = !s; if (s) lab.place(el, p, dy); };
    show(L.mt, on, V(-5, ground(-5), -ZW / 2), -16);
    show(L.fan, state.labels, V(FOOT + 0.8, ground(FOOT + 0.8), ZW / 2), 22);
    show(L.plain, on, V(2.2, ground(2.2), -ZW / 2), -16);
    show(L.sea, on, V(5.6, 0, ZW / 2), 22);
  }

  function readout() {
    R.waters.forEach((b) => b.setAttribute('aria-pressed', b.dataset.water === state.water ? 'true' : 'false'));
    R.bar.style.width = `${(state.t / FULL) * 100}%`;
    R.status.innerHTML = state.t >= FULL ? 'A long time has passed<small>過了很久很久</small>' : state.t > FULL * 0.35 ? 'The land is changing<small>大地正在改變</small>' : 'Just beginning<small>才剛開始</small>';
    for (const k of KINDS) { const z = ZONE[zoneOf(settleX(k, state.water))]; R.out[k].innerHTML = `${z[0]}<small>${z[1]}</small>`; }
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== state.water; });
  }

  function set(o) {
    if (o.water && WATER[o.water]) state.water = o.water;
    if (o.reset) resetSim();
    if (o.run) for (let i = 0; i < o.run * 20; i++) sim(0.05);
    draw(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.waters.forEach((b) => b.addEventListener('click', () => { set({ water: b.dataset.water }); setPlaying(true); }));
  R.reset.addEventListener('click', () => { set({ reset: true }); setPlaying(true); });
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
    if (state.playing) sim(dt);
    draw();
    controls.update();
    updateLabels();
    if (t - lastR > 200) { lastR = t; readout(); }
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

  resetSim(); draw(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (w) => { set({ water: w, reset: true }); setPlaying(true); };
  const DEMO = { dry: () => go('dry'), normal: () => go('normal'), flood: () => go('flood'), long: () => { set({ water: 'normal', reset: true, run: 60 }); setPlaying(false); } };
  root.__lab = {
    camera, controls, state, set, setPlaying, cut, pile,
    render: () => { draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：這樣的水帶得動什麼？（不需要 WebGL） ----------------
function initCarry() {
  const el = document.querySelector('[data-earth-carry]');
  if (!el) return;
  const levels = JSON.parse(el.dataset.levels), q = (s) => el.querySelector(s), f = q('.ew-cy-f'), items = [...el.querySelectorAll('.ew-cy-item')];
  function show() {
    const i = +f.value, lv = levels[i];
    f.style.setProperty('--p', `${(i / (levels.length - 1)) * 100}%`);
    items.forEach((it, k) => { it.classList.toggle('moving', k < lv.moves); });
    q('.ew-cy-en').textContent = lv.en; q('.ew-cy-zh').textContent = lv.zh; q('.ew-cy-t').textContent = lv.t_en; q('.ew-cy-t-zh').textContent = lv.t_zh;
    el.dataset.i = String(i);
  }
  f.addEventListener('input', show);
  show();
  el.__cy = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCarry);
else initCarry();

lazyBoot('[data-earthriver-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
