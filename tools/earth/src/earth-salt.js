/*
 * 地球與天氣 · 第十三課「海水為什麼是鹹的？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：水一直在繞圈（下雨 → 河流 → 海 → 蒸發 → 雲 → 再下雨），鹽卻只進不出。
 *   雨水從岩石溶出一點點礦物質，河流把它們帶進海裡；海水蒸發時只有水離開，鹽留下來，越積越多。
 *   有出口的湖不會變鹹：鹽跟著水一起流走了。
 *
 * 場景：左邊一座山、一條河，右邊一個水盆（海或湖）。藍點是水，白點是鹽。
 * 數字在 saltcalc.js（3.5% 是真的；變鹹的快慢是示意）。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-salt.js
 * 除錯：document.querySelector('[data-earthsalt-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { SEA, salinity, saltDots, grams } from './saltcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.9, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const X0 = -7, X1 = 7.4, NB = 72, DX = (X1 - X0) / NB, ZW = 3.6, FLOOR = -2.2, LEVEL = 0.15;
const B0 = 0.6, B1 = 6.0;                                   // 水盆的左右邊界
const N_WATER = 150, N_SALT = 120, N_RIDE = 26, FULL = 60;  // FULL：幾秒把時間跑滿
const binX = (b) => X0 + (b + 0.5) * DX;
// 地面的高度：左邊是山，往右下降到水盆；水盆右邊有一道岸
function land(x, mode) {
  if (x < B0) return 0.25 + ((B0 - x) / (B0 - X0)) ** 1.3 * 3.6;
  if (x < B1) return -1.5 + 1.2 * Math.max(0, (B0 + 0.8 - x) / 0.8) + 1.2 * Math.max(0, (x - B1 + 0.8) / 0.8);
  return mode === 'lake' ? Math.max(-0.4, 0.02 - (x - B1) * 0.3) : 0.75;
}
// 水繞的一圈：山頂 → 河 → 盆 → 蒸發 → 雲 → 雨
const LOOP = [[-6.2, 3.55], [B0, 0.4], [4.4, LEVEL], [4.4, 4.7], [-6.0, 4.9], [-6.2, 3.55]];
const SEG = LOOP.slice(1).map((p, i) => Math.hypot(p[0] - LOOP[i][0], p[1] - LOOP[i][1])), TOTAL = SEG.reduce((a, b) => a + b, 0);
function onLoop(u, out) {
  let d = (((u % 1) + 1) % 1) * TOTAL;
  for (let i = 0; i < SEG.length; i++) { if (d <= SEG[i]) { const t = d / SEG[i]; out.x = LOOP[i][0] + (LOOP[i + 1][0] - LOOP[i][0]) * t; out.y = LOOP[i][1] + (LOOP[i + 1][1] - LOOP[i][1]) * t; out.seg = i; return out; } d -= SEG[i]; }
  out.x = LOOP[0][0]; out.y = LOOP[0][1]; out.seg = 0; return out;
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
  scene.background = new Color(0xa9d4f5);
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0.1, 1.5, 0);
  const homePos = () => TARGET.clone().add(V(0, 2.6, 23).multiplyScalar(camera.aspect < 0.85 ? 1.6 : camera.aspect < 1.1 ? 1.2 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 8; controls.maxDistance = 70;
  controls.minPolarAngle = 0.6; controls.maxPolarAngle = Math.PI * 0.54;
  controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 0.6;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x4a5a3a, 1.15));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const dl = new DirectionalLight(0xffffff, 0.95); dl.position.set(-4, 10, 8); scene.add(dl);

  const box = new BoxGeometry(1, 1, 1);
  const ground = new InstancedMesh(box, std(0xffffff), NB); ground.frustumCulled = false; scene.add(ground);
  const waterMat = new MeshStandardMaterial({ color: 0x2f7fd6, roughness: 0.3, transparent: true, opacity: 0.72 });
  const basin = new Mesh(box, waterMat); scene.add(basin);
  const cloud = new InstancedMesh(new SphereGeometry(0.5, 12, 10), std(0xffffff, { roughness: 1 }), 16); cloud.frustumCulled = false; scene.add(cloud);
  const water = new InstancedMesh(new SphereGeometry(0.06, 8, 6), new MeshBasicMaterial({ color: 0xffffff }), N_WATER); water.frustumCulled = false; scene.add(water);
  const salt = new InstancedMesh(new BoxGeometry(0.1, 0.1, 0.1), new MeshBasicMaterial({ color: 0xffffff }), N_SALT + N_RIDE); salt.frustumCulled = false; scene.add(salt);

  const m4 = new Matrix4(), col = new Color(), ROCK = new Color(0x8a8f7e), GRASS = new Color(0x6fa35c), SAND = new Color(0xcdb98a), P = { x: 0, y: 0, seg: 0 };
  for (let i = 0; i < 16; i++) { const s = 0.8 + hash(i, 1) * 0.7; m4.makeScale(s * 1.3, s * 0.7, s).setPosition(-5.6 + hash(i, 2) * 3.4, 5.0 + hash(i, 3) * 0.5, (hash(i, 4) - 0.5) * 1.6); cloud.setMatrixAt(i, m4); }
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    rain: lab.add('cp-lb', 'Rain dissolves a little rock<small>雨水溶掉一點點岩石</small>'), river: lab.add('cp-lb', 'The river carries it down<small>河流把它帶下去</small>'),
    evap: lab.add('cp-lb', 'Only water goes up<small>只有水蒸發上去</small>'), basin: lab.add('cp-lb ew-lb-push', ''), out: lab.add('cp-lb', 'The salt flows out with the water<small>鹽跟著水一起流走</small>'),
  };

  const R = {
    modes: [...root.querySelectorAll('.ew-sa-mode button')], t: $('.ew-sa-t'), tOut: $('.ew-sa-t-out'), bar: $('.ew-sa-bar'), status: $('.ew-sa-status'),
    pct: $('.ew-sa-pct'), g: $('.ew-sa-g'), way: $('.ew-sa-way'), msgs: [...root.querySelectorAll('.ew-sa-msg')], play: $('.al-play'),
  };
  const state = { mode: 'sea', t: 0.02, labels: true, playing: true, clock: 0, drawn: '' };

  function drawGround() {
    for (let b = 0; b < NB; b++) {
      const x = binX(b), top = land(x, state.mode);
      m4.makeScale(DX * 1.02, top - FLOOR, ZW).setPosition(x, (top + FLOOR) / 2, 0); ground.setMatrixAt(b, m4);
      ground.setColorAt(b, col.copy(x < -2.5 ? ROCK : x < B0 ? GRASS : x < B1 ? SAND : GRASS));
    }
    ground.instanceMatrix.needsUpdate = true; ground.instanceColor.needsUpdate = true;
    const right = state.mode === 'lake' ? X1 : B1;
    basin.scale.set(right - B0, LEVEL + 1.5, ZW * 0.98); basin.position.set((right + B0) / 2, (LEVEL - 1.5) / 2, 0);
    state.drawn = state.mode;
  }
  function draw() {
    if (state.drawn !== state.mode) drawGround();
    const s = salinity(state.mode, state.t), lake = state.mode === 'lake';
    waterMat.color.set(0x2f7fd6).lerp(col.set(0x6fd0c9), Math.min(1, s / SEA) * 0.55);
    // 水：繞著一圈走。蒸發那一段變小變淡（水氣），雲裡看不到，下雨那一段是藍色的雨滴
    for (let i = 0; i < N_WATER; i++) {
      onLoop(state.clock * 0.045 + hash(i, 1), P);
      const jz = (hash(i, 2) - 0.5) * (P.seg === 1 ? 0.5 : ZW * 0.7), jx = (hash(i, 3) - 0.5) * (P.seg === 2 || P.seg === 3 ? 2.6 : P.seg === 5 ? 1.2 : 0.2);
      const sc = P.seg === 3 ? 0.8 : P.seg === 4 ? 0 : 1;
      m4.makeScale(sc, sc, sc).setPosition(P.x + jx, P.y + (P.seg === 2 ? -hash(i, 4) * 0.9 : 0), jz); water.setMatrixAt(i, m4);
      water.setColorAt(i, col.set(P.seg === 3 ? 0x5f8fc4 : P.seg === 5 ? 0x2f7fd6 : 0x9fd8ff));
    }
    water.instanceMatrix.needsUpdate = true; water.instanceColor.needsUpdate = true;
    // 鹽：留在盆裡的（越來越多），加上正跟著河水下來的
    const stay = saltDots(state.mode, state.t, N_SALT);
    for (let i = 0; i < N_SALT; i++) {
      const on = i < stay ? 1 : 0;
      m4.makeScale(on, on, on).setPosition(B0 + 0.5 + hash(i, 5) * (B1 - B0 - 1), LEVEL - 0.15 - hash(i, 6) * 1.1 + 0.05 * Math.sin(state.clock + i), (hash(i, 7) - 0.5) * ZW * 0.8); salt.setMatrixAt(i, m4);
    }
    for (let i = 0; i < N_RIDE; i++) {
      const f = (state.clock * 0.07 + hash(i, 8)) % 1; let x, y;
      if (!lake || f < 0.55) { const g = lake ? f / 0.55 : f; x = LOOP[0][0] + (LOOP[1][0] - LOOP[0][0]) * g; y = LOOP[0][1] + (LOOP[1][1] - LOOP[0][1]) * g; }
      else { const g = (f - 0.55) / 0.45; x = B0 + (X1 - B0) * g; y = LEVEL - 0.25; }                          // 湖：穿過湖水，從出口流走
      m4.makeScale(1, 1, 1).setPosition(x, y - 0.08, (hash(i, 9) - 0.5) * (x < B0 ? 0.4 : ZW * 0.6)); salt.setMatrixAt(N_SALT + i, m4);
    }
    salt.instanceMatrix.needsUpdate = true;
    return s;
  }

  let narrow = false;
  function updateLabels(s) {
    const on = state.labels && !narrow, lake = state.mode === 'lake';
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(L.rain, on, V(-6.2, 3.6, ZW / 2), -18);
    show(L.river, on, V(-2.6, land(-2.6, state.mode), ZW / 2), 22);
    show(L.evap, on, V(4.4, 2.6, 0), 0); L.evap.style.marginLeft = '86px';
    L.basin.innerHTML = lake ? `A lake with a way out: ${s.toFixed(2)}%<small>有出口的湖：幾乎沒有鹽</small>` : `The sea: ${s.toFixed(1)}% salt<small>海：鹽占 ${s.toFixed(1)}%</small>`;
    show(L.basin, true, V((B0 + B1) / 2, -1.0, ZW / 2), 0);
    show(L.out, on && lake, V(6.7, 0.1, ZW / 2), -18);
  }

  function readout(s) {
    const lake = state.mode === 'lake';
    R.modes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode ? 'true' : 'false'));
    R.t.value = String(Math.round(state.t * 100)); R.t.style.setProperty('--p', `${state.t * 100}%`);
    R.tOut.textContent = state.t < 0.06 ? 'The beginning · 一開始' : state.t > 0.97 ? 'Today · 現在' : 'Long ago · 很久以前';
    R.bar.style.width = `${Math.min(100, (s / SEA) * 100)}%`;
    R.status.innerHTML = lake ? 'Almost fresh<small>幾乎是淡水</small>' : s > SEA * 0.97 ? 'As salty as the sea today<small>和今天的海一樣鹹</small>' : 'Getting saltier<small>越來越鹹</small>';
    R.pct.innerHTML = `${s.toFixed(lake ? 2 : 1)}%<small>鹽占水的比例</small>`;
    R.g.innerHTML = `${grams(1, s) < 1 ? grams(1, s).toFixed(1) : Math.round(grams(1, s))} g<small>一公升水裡大約這麼多</small>`;
    R.way.innerHTML = lake ? 'By flowing out<small>從出口流走</small>' : 'Only by evaporating<small>只能靠蒸發</small>';
    const key = lake ? 'lake' : s > SEA * 0.9 ? 'today' : 'young';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.mode === 'sea' || o.mode === 'lake') state.mode = o.mode;
    if (o.t != null) state.t = Math.min(1, Math.max(0, o.t));
    readout(draw());
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.modes.forEach((b) => b.addEventListener('click', () => set({ mode: b.dataset.mode, t: 0 })));
  R.t.addEventListener('input', () => set({ t: +R.t.value / 100 }));
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
    state.clock += dt;                                   // 水一直在繞；暫停只停「時間」
    if (state.playing) state.t = Math.min(1, state.t + dt / FULL);
    const s = draw();
    controls.update();
    updateLabels(s);
    if (t - lastR > 150) { lastR = t; readout(s); }
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

  readout(draw());
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o, play = false) => { setPlaying(play); set(o); };
  const DEMO = { young: () => go({ mode: 'sea', t: 0 }, true), half: () => go({ mode: 'sea', t: 0.3 }), today: () => go({ mode: 'sea', t: 1 }), lake: () => go({ mode: 'lake', t: 1 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { const s = draw(); controls.update(); updateLabels(s); readout(s); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：曬乾之後剩多少鹽？（不需要 WebGL） ----------------
function initPan() {
  const el = document.querySelector('[data-earth-saltpan]');
  if (!el) return;
  const waters = JSON.parse(el.dataset.waters), q = (s) => el.querySelector(s), f = q('.ew-sp-l'), btns = [...el.querySelectorAll('.ew-sp-w button')];
  let k = 'sea';
  function show() {
    const l = +f.value, w = waters[k], g = l * 10 * w.pct;
    f.style.setProperty('--p', `${(l / 20) * 100}%`);
    q('.ew-sp-l-out').textContent = `${l} L`;
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.w === k ? 'true' : 'false'));
    q('.ew-sp-g').textContent = g < 10 ? g.toFixed(1) : Math.round(g).toLocaleString('en-US');
    q('.ew-sp-spoon').textContent = g < 3 ? 'less than 1' : Math.round(g / 6).toLocaleString('en-US');
    q('.ew-sp-pile').style.setProperty('--h', `${Math.min(100, Math.sqrt(g / 6840) * 100)}%`);
    q('.ew-sp-en').textContent = w.note_en; q('.ew-sp-zh').textContent = w.note_zh;
    el.dataset.g = String(Math.round(g * 10) / 10);
  }
  f.addEventListener('input', show);
  btns.forEach((b) => b.addEventListener('click', () => { k = b.dataset.w; show(); }));
  show();
  el.__sp = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPan);
else initPan();

lazyBoot('[data-earthsalt-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
