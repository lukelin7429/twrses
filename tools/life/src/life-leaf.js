/*
 * 生命與生態 · 第二課「葉子怎麼用陽光做出食物？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：葉子用陽光的能量，把空氣裡的二氧化碳和根送上來的水，做成糖，並放出氧氣。
 *   三樣東西（光、二氧化碳、水）缺一不可；最缺的那一樣決定做得多快。水不夠的時候，氣孔會關小，二氧化碳也進不來。
 *
 * 場景：一片葉子切開的側面——上表皮、柵狀細胞（裡面的綠點是葉綠體）、海綿組織、下表皮和兩個氣孔、一條葉脈。
 * 五種小點：黃＝陽光、灰＝二氧化碳、藍＝水、青＝氧氣、橘＝糖。數字與規則在 photocalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-leaf.js
 * 除錯：document.querySelector('[data-lifeleaf-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { rate, holding, stomataOpen, co2In, PER_SUGAR } from './photocalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.8, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const lerp = (a, b, t) => a + (b - a) * t;
const W = 10, D = 2.6, Y_TOP = 2.9, Y_PAL0 = 1.35, Y_PAL1 = 2.6, Y_LOW0 = 0.1, Y_LOW1 = 0.4, Y_VEIN = 0.95, STOMA = [-2.3, 2.3];
const N_PAL = 13, N_CHL = 150, N_SPONGE = 26, N_P = 36;
const HOLD = { go: ['Nothing. All three are plentiful', '都夠，沒有被卡住'], light: ['Light', '光不夠'], co2: ['Carbon dioxide', '二氧化碳不夠'], water: ['Water', '水不夠'], dark: ['No light at all', '沒有光'] };

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
  const SKY_DAY = new Color(0x163a5c), SKY_NIGHT = new Color(0x070c1a), sky = new Color(0x163a5c);
  scene.background = sky;
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 1.6, 0);
  const homePos = () => TARGET.clone().add(V(0, 1.2, 19.5).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.1 ? 1.08 : 0.88));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 60;
  controls.minPolarAngle = 0.7; controls.maxPolarAngle = Math.PI * 0.6;
  controls.minAzimuthAngle = -0.7; controls.maxAzimuthAngle = 0.7;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xffffff, 0x24402c, 1.1); scene.add(hemi);
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xfff2c0, 1.0); sun.position.set(-3, 10, 6); scene.add(sun);

  const box = new BoxGeometry(1, 1, 1), m4 = new Matrix4(), col = new Color();
  // 上表皮（透明的一層皮）、下表皮（留兩個氣孔的洞）
  const upper = new Mesh(box, std(0xcfe8b0, { transparent: true, opacity: 0.55 })); upper.scale.set(W, Y_TOP - Y_PAL1, D); scene.add(at(upper, 0, (Y_PAL1 + Y_TOP) / 2, 0));
  const lowMat = std(0xbfdc9a);
  const segs = [[-W / 2, STOMA[0] - 0.42], [STOMA[0] + 0.42, STOMA[1] - 0.42], [STOMA[1] + 0.42, W / 2]];
  segs.forEach(([a, b]) => { const m = new Mesh(box, lowMat); m.scale.set(b - a, Y_LOW1 - Y_LOW0, D); scene.add(at(m, (a + b) / 2, (Y_LOW0 + Y_LOW1) / 2, 0)); });
  // 柵狀細胞：一排直立的長細胞
  const palMat = std(0x5fae4f, { transparent: true, opacity: 0.5 });
  const pal = new InstancedMesh(box, palMat, N_PAL); scene.add(pal);
  const cw = W / N_PAL;
  for (let i = 0; i < N_PAL; i++) { m4.makeScale(cw * 0.9, Y_PAL1 - Y_PAL0, D * 0.96).setPosition(-W / 2 + cw * (i + 0.5), (Y_PAL0 + Y_PAL1) / 2, 0); pal.setMatrixAt(i, m4); }
  // 葉綠體：柵狀細胞裡的小綠球（做得越快越亮）
  const chlMat = new MeshStandardMaterial({ color: 0x1f8a3a, roughness: 0.5, emissive: 0x7dff6a, emissiveIntensity: 0 });
  const chl = new InstancedMesh(new SphereGeometry(0.1, 10, 8), chlMat, N_CHL); scene.add(chl);
  for (let i = 0; i < N_CHL; i++) { m4.makeScale(1, 1.3, 1).setPosition((hash(i, 1) - 0.5) * (W - 0.4), lerp(Y_PAL0 + 0.12, Y_PAL1 - 0.12, hash(i, 2)), (hash(i, 3) - 0.5) * (D - 0.3)); chl.setMatrixAt(i, m4); }
  // 海綿組織：圓圓的細胞，中間留空隙讓氣體走
  const sponge = new InstancedMesh(new SphereGeometry(0.3, 14, 10), std(0x7fc06a, { transparent: true, opacity: 0.6 }), N_SPONGE); scene.add(sponge);
  for (let i = 0; i < N_SPONGE; i++) {
    let x = -W / 2 + 0.4 + (i / (N_SPONGE - 1)) * (W - 0.8); const nearStoma = STOMA.some((s) => Math.abs(x - s) < 0.5);
    const s = 0.8 + hash(i, 4) * 0.5;
    m4.makeScale(s, s * 0.9, s).setPosition(x, nearStoma ? 1.12 : 0.62 + hash(i, 5) * 0.5, (hash(i, 6) - 0.5) * (D - 0.8)); sponge.setMatrixAt(i, m4);
  }
  // 葉脈：一條水管（水進來、糖出去）
  const vein = new Mesh(new CylinderGeometry(0.13, 0.13, W + 1.6, 12), std(0xd9c9a0)); vein.rotation.z = Math.PI / 2; scene.add(at(vein, 0, Y_VEIN, -D / 2 + 0.25));
  // 保衛細胞：每個氣孔兩顆，水夠就分開（氣孔打開）
  const guard = new InstancedMesh(new SphereGeometry(0.2, 14, 10), std(0x3f9a4a), 4); scene.add(guard);
  // 五種小點
  const mk = (color, geo) => { const m = new InstancedMesh(geo || new SphereGeometry(0.075, 8, 6), new MeshBasicMaterial({ color }), N_P); m.frustumCulled = false; scene.add(m); return m; };
  const P = { light: mk(0xffe27a), co2: mk(0xb9c2d0), water: mk(0x58b4ff), o2: mk(0x7df0e0), sugar: mk(0xffa24a, new BoxGeometry(0.14, 0.14, 0.14)) };

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    light: lab.add('cp-lb lf-ph-lb-l', 'Sunlight<small>陽光</small>'), co2: lab.add('cp-lb', 'Carbon dioxide in<small>二氧化碳進來</small>'), o2: lab.add('cp-lb lf-ph-lb-o', 'Oxygen out<small>氧氣出去</small>'),
    water: lab.add('cp-lb lf-ph-lb-w', 'Water in<small>水進來</small>'), sugar: lab.add('cp-lb lf-lb-push', 'Sugar out<small>糖送出去</small>'), stoma: lab.add('cp-lb', ''), chl: lab.add('cp-lb', 'Chloroplasts<small>葉綠體：做糖的地方</small>'),
  };

  const R = {
    light: $('.lf-ph-light'), lightOut: $('.lf-ph-light-out'), co2: $('.lf-ph-co2'), co2Out: $('.lf-ph-co2-out'), water: $('.lf-ph-water'), waterOut: $('.lf-ph-water-out'),
    bar: $('.lf-ph-bar'), status: $('.lf-ph-status'), hold: $('.lf-ph-hold'), sugar: $('.lf-ph-sugar'), o2: $('.lf-ph-o2'), stoma: $('.lf-ph-stoma'), msgs: [...root.querySelectorAll('.lf-ph-msg')], play: $('.al-play'),
  };
  const state = { light: 80, co2: 80, water: 80, labels: true, playing: true, clock: 0, made: 0 };

  // 每一種小點走的路（f：0 → 1）
  const pt = { x: 0, y: 0, z: 0 };
  const path = {
    light: (i, f) => { pt.x = (hash(i, 11) - 0.5) * (W - 0.6) - 0.5 + f * 0.6; pt.y = 5.4 - f * (5.4 - Y_PAL1 + 0.2); pt.z = (hash(i, 12) - 0.5) * (D - 0.4); },
    co2: (i, f) => {
      const sx = STOMA[i % 2], ox = sx + (hash(i, 13) - 0.5) * 3.2, tx = sx + (hash(i, 14) - 0.5) * 4.2;
      if (f < 0.45) { const t = f / 0.45; pt.x = lerp(ox, sx, t); pt.y = lerp(-1.7, 0.25, t); } else { const t = (f - 0.45) / 0.55; pt.x = lerp(sx, tx, t); pt.y = lerp(0.25, 1.9, t); }
      pt.z = (hash(i, 15) - 0.5) * 0.9;
    },
    o2: (i, f) => {
      const sx = STOMA[(i + 1) % 2], ox = sx + (hash(i, 16) - 0.5) * 3.2, tx = sx + (hash(i, 17) - 0.5) * 4.2;
      if (f < 0.55) { const t = f / 0.55; pt.x = lerp(tx, sx, t); pt.y = lerp(1.9, 0.25, t); } else { const t = (f - 0.55) / 0.45; pt.x = lerp(sx, ox, t); pt.y = lerp(0.25, -1.7, t); }
      pt.z = (hash(i, 18) - 0.5) * 0.9 + 0.5;
    },
    water: (i, f) => {
      const wx = (hash(i, 19) - 0.5) * (W - 1.2), run = wx + W / 2 + 0.8, up = 1.0, tot = run + up, d = f * tot;
      if (d < run) { pt.x = -W / 2 - 0.8 + d; pt.y = Y_VEIN; pt.z = -D / 2 + 0.25; } else { pt.x = wx; pt.y = Y_VEIN + (d - run); pt.z = lerp(-D / 2 + 0.25, (hash(i, 20) - 0.5) * 1.2, (d - run) / up); }
    },
    sugar: (i, f) => {
      const tx = (hash(i, 21) - 0.5) * (W - 1.2), down = 1.0, run = W / 2 + 0.8 - tx, tot = down + run, d = f * tot;
      if (d < down) { pt.x = tx; pt.y = 1.95 - d; pt.z = lerp((hash(i, 22) - 0.5) * 1.2, -D / 2 + 0.25, d / down); } else { pt.x = tx + (d - down); pt.y = Y_VEIN; pt.z = -D / 2 + 0.25; }
    },
  };
  const SPEED = { light: 0.55, co2: 0.16, o2: 0.16, water: 0.14, sugar: 0.12 };

  function draw() {
    const r = rate(state.light, state.co2, state.water), open = stomataOpen(state.light, state.water);
    const lvl = { light: state.light, co2: state.light < 5 ? 0 : co2In(state.co2, state.water), water: state.water, o2: r, sugar: r };
    for (const k of Object.keys(P)) {
      const n = Math.round((lvl[k] / 100) * N_P);
      for (let i = 0; i < N_P; i++) {
        if (i >= n) { m4.makeScale(0, 0, 0); P[k].setMatrixAt(i, m4); continue; }
        path[k](i, (state.clock * SPEED[k] + hash(i, 30 + k.length)) % 1);
        m4.makeScale(1, 1, 1).setPosition(pt.x, pt.y, pt.z); P[k].setMatrixAt(i, m4);
      }
      P[k].instanceMatrix.needsUpdate = true;
    }
    STOMA.forEach((sx, s) => { const gap = 0.16 + open * 0.2; [-1, 1].forEach((side, j) => { m4.makeScale(1, 0.8, 1.6).setPosition(sx + side * gap, (Y_LOW0 + Y_LOW1) / 2, 0); guard.setMatrixAt(s * 2 + j, m4); }); });
    guard.instanceMatrix.needsUpdate = true;
    chlMat.emissiveIntensity = (r / 100) * 0.75;
    const day = Math.min(1, state.light / 60);
    sky.copy(SKY_NIGHT).lerp(SKY_DAY, day); hemi.intensity = 0.5 + 0.6 * day; sun.intensity = 0.15 + 0.85 * day;
    return { r, open };
  }

  let narrow = false;
  function updateLabels(d) {
    const on = state.labels;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(L.light, on && state.light > 4 && !narrow, V(-3.6, 4.6, 0), 0);
    show(L.co2, on && state.co2 > 4 && d.open > 0.05 && !narrow, V(STOMA[0] - 1.3, -1.3, 0), 0);
    show(L.o2, on && d.r > 4 && !narrow, V(STOMA[0] + 1.6, -1.3, 0.5), 0);
    show(L.water, on && state.water > 4 && !narrow, V(-W / 2 - 0.4, Y_VEIN, -D / 2 + 0.25), -20);
    show(L.sugar, d.r > 4, V(W / 2 + 0.3, Y_VEIN, -D / 2 + 0.25), -20);
    L.stoma.innerHTML = d.open > 0.9 ? 'Stoma: open<small>氣孔：打開</small>' : d.open > 0.25 ? 'Stoma: half closed<small>氣孔：關了一半</small>' : 'Stoma: closed<small>氣孔：關起來了</small>';
    show(L.stoma, on, V(STOMA[1], Y_LOW0, D / 2), 22);
    show(L.chl, on && !narrow, V(3.4, Y_PAL1 - 0.2, D / 2), -18);
  }

  function readout(d) {
    const h = holding(state.light, state.co2, state.water), n = Math.floor(state.made);
    for (const k of ['light', 'co2', 'water']) { R[k].value = String(Math.round(state[k])); R[k].style.setProperty('--p', `${state[k]}%`); R[`${k}Out`].textContent = `${Math.round(state[k])}%`; }
    R.bar.style.width = `${d.r}%`;
    R.status.innerHTML = d.r < 3 ? 'The factory has stopped<small>工廠停工了</small>' : d.r < 40 ? 'Making a little sugar<small>做出一點點糖</small>' : d.r < 70 ? 'Making sugar steadily<small>穩定地做糖</small>' : 'Making sugar fast<small>做得很快</small>';
    R.hold.innerHTML = `${HOLD[h][0]}<small>${HOLD[h][1]}</small>`;
    R.sugar.innerHTML = `${n}<small>做出來的糖（顆）</small>`;
    R.o2.innerHTML = `${n * PER_SUGAR}<small>放出來的氧氣（每顆糖 6 個）</small>`;
    R.stoma.innerHTML = d.open > 0.9 ? 'Open<small>打開</small>' : d.open > 0.25 ? 'Half closed<small>關了一半</small>' : 'Closed<small>關起來了</small>';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== h; });
  }

  function set(o) {
    for (const k of ['light', 'co2', 'water']) if (o[k] != null) state[k] = Math.min(100, Math.max(0, o[k]));
    if (o.reset) state.made = 0;
    readout(draw());
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  for (const k of ['light', 'co2', 'water']) R[k].addEventListener('input', () => set({ [k]: +R[k].value }));
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
    if (state.playing) { state.clock += dt; state.made += dt * (rate(state.light, state.co2, state.water) / 100) * 1.2; }
    const d = draw();
    controls.update();
    updateLabels(d);
    if (t - lastR > 150) { lastR = t; readout(d); }
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

  const go = (o) => { set({ ...o, reset: true }); setPlaying(true); };
  const DEMO = { sunny: () => go({ light: 100, co2: 80, water: 90 }), cloudy: () => go({ light: 25, co2: 80, water: 90 }), dry: () => go({ light: 100, co2: 80, water: 20 }), night: () => go({ light: 0, co2: 80, water: 90 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { state.clock += 0.4; const d = draw(); controls.update(); updateLabels(d); readout(d); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：做糖的配方（不需要 WebGL） ----------------
function initRecipe() {
  const el = document.querySelector('[data-life-recipe]');
  if (!el) return;
  const q = (s) => el.querySelector(s), f = q('.lf-rc-n');
  const dots = (n, cls) => Array.from({ length: n }, () => `<i class="${cls}"></i>`).join('');
  function show() {
    const n = +f.value, k = PER_SUGAR * n;
    f.style.setProperty('--p', `${((n - 1) / 9) * 100}%`);
    q('.lf-rc-n-out').textContent = String(n);
    q('.lf-rc-co2').textContent = String(k); q('.lf-rc-water').textContent = String(k); q('.lf-rc-o2').textContent = String(k); q('.lf-rc-sugar').textContent = String(n);
    q('.lf-rc-in').innerHTML = dots(k, 'c') + dots(k, 'w'); q('.lf-rc-made').innerHTML = dots(n, 's') + dots(k, 'o');
    el.dataset.n = String(n);
  }
  f.addEventListener('input', show);
  show();
  el.__rc = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRecipe);
else initRecipe();

lazyBoot('[data-lifeleaf-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
