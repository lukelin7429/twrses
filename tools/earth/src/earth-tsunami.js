/*
 * 地球與天氣 · 第十二課「海嘯和一般的海浪有什麼不同？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：風吹出來的浪只動到海面；海嘯是海底突然升降，把整層海水從底到頂一起推動。
 *   海嘯的速度只看水深（V = √(g h)）：在深海又快又矮，到了淺水變慢，後面的水擠上來，就變高。
 *
 * 場景：海的剖面（左邊深海、右邊海岸和小鎮）。兩個視角：風浪／海嘯。
 * 水裡的小點代表海水：風浪時只有上層在繞圈，海嘯時整層一起前後移動。
 * 數字在 tsunamicalc.js（速度是真的公式；高度的倍數和地形是示意）。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-tsunami.js
 * 除錯：document.querySelector('[data-earthtsunami-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { speed, kmh, depth, grow, depthVis, advance, X0, SHORE, X1 } from './tsunamicalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.85, ...o });
const NB = 96, DX = (X1 - X0) / NB, ZW = 2.6, A0 = 0.11, COLS = 13, ROWS = 4;
const binX = (b) => X0 + (b + 0.5) * DX;
const landY = (x) => (x < SHORE ? -depthVis(x) : Math.min(0.5, (x - SHORE) * 0.22));      // 海底／陸地的高度（海面＝0）

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
  scene.background = new Color(0xbfe0f7);
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(-0.7, -1.1, 0);
  const homePos = () => TARGET.clone().add(V(0, 2.2, 21).multiplyScalar(camera.aspect < 0.85 ? 1.6 : camera.aspect < 1.1 ? 1.22 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 7; controls.maxDistance = 70;
  controls.minPolarAngle = 0.7; controls.maxPolarAngle = Math.PI * 0.56;
  controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 0.6;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x35507a, 1.2));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 10, 8); scene.add(dl);

  const box = new BoxGeometry(1, 1, 1);
  const bed = new InstancedMesh(box, std(0xffffff), NB); bed.frustumCulled = false; scene.add(bed);
  const sea = new InstancedMesh(box, new MeshStandardMaterial({ color: 0x2f7fd6, roughness: 0.3, transparent: true, opacity: 0.78 }), NB); sea.frustumCulled = false; scene.add(sea);
  const dots = new InstancedMesh(new SphereGeometry(0.07, 8, 6), new MeshBasicMaterial({ color: 0xffffff }), COLS * ROWS); dots.frustumCulled = false; scene.add(dots);
  // 岸上的小鎮
  for (let i = 0; i < 4; i++) {
    const x = SHORE + 1.0 + i * 0.42, y = landY(x);
    scene.add(at(new Mesh(new BoxGeometry(0.26, 0.24, 0.3), std(0xe6d7b8)), x, y + 0.12, (i % 2 - 0.5) * 0.9));
    const rf = new Mesh(new ConeGeometry(0.24, 0.18, 4), std(0xa5523a)); rf.rotation.y = Math.PI / 4; scene.add(at(rf, x, y + 0.33, (i % 2 - 0.5) * 0.9));
  }
  const m4 = new Matrix4(), col = new Color(), SAND = new Color(0xcdb98a), ROCK = new Color(0x6f6a5e), GRASS = new Color(0x6fa35c);
  for (let b = 0; b < NB; b++) {
    const x = binX(b), top = landY(x), bot = -3.9;
    m4.makeScale(DX * 1.02, top - bot, ZW).setPosition(x, (top + bot) / 2, 0); bed.setMatrixAt(b, m4);
    bed.setColorAt(b, col.copy(x < SHORE - 1.5 ? ROCK : x < SHORE + 0.5 ? SAND : GRASS));
  }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    crest: lab.add('cp-lb ew-lb-push', ''), deep: lab.add('cp-lb', 'Deep ocean<small>深海</small>'), coast: lab.add('cp-lb', 'Shallow water<small>淺水</small>'),
    town: lab.add('cp-lb', 'Town<small>小鎮</small>'), col: lab.add('cp-lb', ''),
  };

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], go: $('.ew-ts-go'), depth: $('.ew-ts-depth'), speed: $('.ew-ts-speed'), height: $('.ew-ts-height'),
    msgs: [...root.querySelectorAll('.ew-ts-msg')], play: $('.al-play'),
  };
  // tsunami：x＝波峰的位置；flood＝衝上岸之後水淹多遠（0–1）
  const state = { view: 'tsunami', x: X0 + 0.6, flood: 0, wait: 0, labels: true, playing: true, clock: 0 };
  const launch = () => { state.x = X0 + 0.6; state.flood = 0; state.wait = 0; };

  function step(dt) {
    state.clock += dt;
    if (state.view !== 'tsunami') return;
    if (state.x < SHORE) state.x = Math.min(SHORE, advance(state.x, dt));
    else if (state.flood < 1) state.flood = Math.min(1, state.flood + dt * 0.45);
    else { state.wait += dt; if (state.wait > 2.4) launch(); }
  }
  // 海面的高度
  function eta(x) {
    if (state.view === 'wind') return x < SHORE ? 0.07 * Math.sin(x * 5.2 - state.clock * 3.2) : 0;
    const cx = state.x, d = depth(Math.min(cx, SHORE - 0.01)), w = Math.max(0.28, 1.5 * (speed(d) / speed(4000)));
    const a = A0 * grow(d) * (1 - state.flood * 0.5);
    return a * Math.exp(-(((x - cx) / w) ** 2));
  }
  function draw() {
    const ts = state.view === 'tsunami', reach = SHORE + state.flood * 2.3;
    for (let b = 0; b < NB; b++) {
      const x = binX(b), floor = landY(x);
      let top = x < SHORE ? eta(x) : -9;
      if (ts && x >= SHORE && state.x >= SHORE && x <= reach) top = floor + 0.16 * (1 - (x - SHORE) / 2.6) * (state.flood < 1 ? 1 : Math.max(0, 1 - state.wait / 2.2));
      if (top <= floor + 0.004) { m4.makeScale(0, 0, 0); sea.setMatrixAt(b, m4); continue; }
      m4.makeScale(DX * 1.02, top - floor, ZW * 0.98).setPosition(x, (top + floor) / 2, 0); sea.setMatrixAt(b, m4);
    }
    sea.instanceMatrix.needsUpdate = true; bed.instanceMatrix.needsUpdate = true; if (bed.instanceColor) bed.instanceColor.needsUpdate = true;
    // 海水裡的小點：風浪只有上層繞圈；海嘯整層一起前後移動
    for (let c = 0; c < COLS; c++) {
      const x0 = X0 + 0.7 + (c / (COLS - 1)) * (SHORE - 0.9 - X0 - 0.7), dv = depthVis(x0);
      for (let r = 0; r < ROWS; r++) {
        const f = (r + 0.5) / ROWS, y0 = -dv * f * 0.94; let dx = 0, dy = 0;
        if (!ts) { const k = 0.085 * Math.exp(-(-y0) * 3.2), ph = x0 * 5.2 - state.clock * 3.2; dx = k * Math.cos(ph); dy = k * Math.sin(ph); }
        else { const e = eta(x0); dx = e * 2.2; dy = e * (1 - f) * 0.9; }
        m4.makeScale(1, 1, 1).setPosition(x0 + dx, y0 + dy, ZW / 2 + 0.02); dots.setMatrixAt(c * ROWS + r, m4);
        const moving = Math.hypot(dx, dy) > 0.012; dots.setColorAt(c * ROWS + r, col.set(moving ? 0xffd84a : 0xdfeaf7));
      }
    }
    dots.instanceMatrix.needsUpdate = true; dots.instanceColor.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, ts = state.view === 'tsunami';
    const show = (el, s, p, dy = 0) => { el.hidden = !s; if (s) lab.place(el, p, dy); };
    const cx = Math.min(state.x, SHORE), d = depth(Math.min(cx, SHORE - 0.01));
    L.crest.innerHTML = state.x >= SHORE ? 'The sea comes ashore<small>海水衝上岸</small>' : `${Math.round(kmh(speed(d)))} km/h<small>水深 ${Math.round(d).toLocaleString('en-US')} 公尺</small>`;
    show(L.crest, ts, V(cx, eta(cx), 0), -26);
    show(L.deep, on && !narrow, V(-6.2, -3.3, ZW / 2), 0);
    show(L.coast, on && !narrow, V(2.4, -depthVis(2.4), ZW / 2), 18);
    show(L.town, on, V(SHORE + 1.6, landY(SHORE + 1.6) + 0.45, 0), -14);
    L.col.innerHTML = ts ? 'The whole depth of water moves<small>整層海水一起動</small>' : 'Only the top moves<small>只有上層在動</small>';
    show(L.col, on && !narrow, V(-2.2, ts ? -1.5 : -0.25, ZW / 2), ts ? 0 : 24);
  }

  function readout() {
    const ts = state.view === 'tsunami', cx = Math.min(state.x, SHORE - 0.01), d = depth(cx);
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    R.go.disabled = !ts;
    if (ts) {
      const land = state.x >= SHORE;
      R.depth.innerHTML = land ? '0 m<small>到岸了</small>' : `${Math.round(d).toLocaleString('en-US')} m<small>波峰底下的水深</small>`;
      R.speed.innerHTML = land ? '—<small>水往陸地上衝</small>' : `${Math.round(kmh(speed(d)))} km/h<small>每秒 ${Math.round(speed(d))} 公尺</small>`;
      R.height.innerHTML = `× ${grow(d).toFixed(1)}<small>和在深海時比（示意）</small>`;
    } else {
      R.depth.innerHTML = 'Any depth<small>和水深無關</small>'; R.speed.innerHTML = 'Slow<small>比海嘯慢得多</small>'; R.height.innerHTML = 'About the same<small>差不多一樣高</small>';
    }
    const key = !ts ? 'wind' : state.x >= SHORE ? 'land' : d > 600 ? 'deep' : 'shoal';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.view === 'wind' || o.view === 'tsunami') { if (o.view !== state.view) { state.view = o.view; launch(); } }
    if (o.x != null) { state.x = Math.min(SHORE, Math.max(X0 + 0.6, o.x)); state.flood = 0; state.wait = 0; }
    if (o.flood != null) { state.x = SHORE; state.flood = o.flood; state.wait = 0; }
    draw(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ view: b.dataset.view })));
  R.go.addEventListener('click', () => { launch(); setPlaying(true); });
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

  const DEMO = {
    wind: () => { set({ view: 'wind' }); setPlaying(true); }, deep: () => { set({ view: 'tsunami', x: -6 }); setPlaying(false); },
    shoal: () => { set({ view: 'tsunami', x: 3.2 }); setPlaying(false); }, land: () => { set({ view: 'tsunami', flood: 0.7 }); setPlaying(false); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying, launch,
    render: () => { draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：海嘯跑多快？（不需要 WebGL） ----------------
function initSpeed() {
  const el = document.querySelector('[data-earth-wavespeed]');
  if (!el) return;
  const q = (s) => el.querySelector(s), f = q('.ew-tw-d'), pre = [...el.querySelectorAll('.ew-tw-pre button')];
  function show() {
    const d = +f.value, v = Math.sqrt(9.8 * d), k = v * 3.6;
    f.style.setProperty('--p', `${(d / 6000) * 100}%`);
    q('.ew-tw-d-out').textContent = `${d.toLocaleString('en-US')} m`;
    q('.ew-tw-kmh').textContent = Math.round(k).toLocaleString('en-US'); q('.ew-tw-ms').textContent = Math.round(v).toLocaleString('en-US');
    q('.ew-tw-min').textContent = d > 0 ? Math.round((100 / k) * 60).toLocaleString('en-US') : '—';
    pre.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.d === d ? 'true' : 'false'));
    el.dataset.kmh = String(Math.round(k));
  }
  f.addEventListener('input', show);
  pre.forEach((b) => b.addEventListener('click', () => { f.value = b.dataset.d; show(); }));
  show();
  el.__tw = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSpeed);
else initSpeed();

lazyBoot('[data-earthtsunami-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
