/*
 * 晶片與半導體 · 第十二課「LED 和半導體有什麼關係？」的 3D 模型（全部自繪示意，不是真實比例）。
 *
 * 一個機制：LED 就是一個會發光的 p–n 接面。順向接電時，n 型那邊的電子和 p 型那邊的電洞被推到接面相遇，
 *   電子掉進電洞，多出來的能量變成一顆光子；能量落差（能隙）越大，光越偏藍。
 *   反過來接，電子和電洞被拉離接面，不會相遇，也就不發光（二極體只讓電往一個方向走）。
 *   白光 LED＝藍光 LED＋黃色螢光粉：一部分藍光被變成黃光，混起來看是白的。
 *
 * 場景：一顆放大的 LED 晶粒（下層 n 型、上層 p 型、中間接面）、一顆電池和兩條線。
 *
 * 產物：cd tools/chips && npm run build → assets/js/chip-led.js
 * 除錯：document.querySelector('[data-chipled-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { LEDS, eV, css, mixName } from './ledcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.55, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const W = 4.6, D = 3.0, H = 0.9;                       // 晶粒：寬、深、每層厚
const N_E = 46, N_P = 60, DOME = 3.3, YELLOW = 0xffd23c;

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
  scene.background = new Color(0x0b1226);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(-1.0, 1.5, 0);
  const homePos = () => TARGET.clone().add(V(3.2, 3.4, 13.4).multiplyScalar(camera.aspect < 0.85 ? 1.7 : camera.aspect < 1.2 ? 1.25 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 40; controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 0.85));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(4, 9, 7); scene.add(sun);
  const glowLight = new PointLight(0xffffff, 0, 14, 1.6); at(glowLight, 0, 1.2, 0.5); scene.add(glowLight);

  scene.add(at(new Mesh(new BoxGeometry(12, 0.1, 7), std(0x16223f, { roughness: 0.9 })), -0.8, -0.05, 0));
  // 晶粒：n 型（下）、p 型（上）、接面（中間薄薄一層）
  const Y0 = 0.25;
  scene.add(at(new Mesh(new BoxGeometry(W, H, D), std(0x3d6fd8, { transparent: true, opacity: 0.38, depthWrite: false })), 0, Y0 + H / 2, 0));
  scene.add(at(new Mesh(new BoxGeometry(W, H, D), std(0xd65a8a, { transparent: true, opacity: 0.38, depthWrite: false })), 0, Y0 + H * 1.5, 0));
  const junMat = new MeshBasicMaterial({ color: 0x445066, transparent: true, opacity: 0.9 });
  scene.add(at(new Mesh(new BoxGeometry(W, 0.07, D), junMat), 0, Y0 + H, 0));
  const JY = Y0 + H;
  // 金屬接點
  scene.add(at(new Mesh(new BoxGeometry(W, 0.1, D), std(0xb9c2d0, { metalness: 0.3 })), 0, Y0 - 0.05, 0));
  scene.add(at(new Mesh(new BoxGeometry(0.8, 0.1, 0.8), std(0xe8c36a, { metalness: 0.3 })), -W / 2 + 0.5, Y0 + 2 * H + 0.05, 0));
  // 電池與電線
  const BX = -5.2;
  scene.add(at(new Mesh(new BoxGeometry(0.9, 1.7, 0.9), std(0x2b303b)), BX, 1.15, 0));
  const capTop = std(0xd8452f), capBot = std(0x3a3f4a);
  scene.add(at(new Mesh(new BoxGeometry(0.5, 0.18, 0.5), capTop), BX, 2.09, 0));
  scene.add(at(new Mesh(new BoxGeometry(0.92, 0.2, 0.92), capBot), BX, 0.3, 0));
  const wire = (pts) => { for (let i = 1; i < pts.length; i++) { const a = V(...pts[i - 1]), b = V(...pts[i]), d = b.clone().sub(a), m = new Mesh(new CylinderGeometry(0.035, 0.035, d.length(), 8), std(0x9aa7c7)); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize()); scene.add(m); } };
  wire([[BX, 2.18, 0], [BX, 2.9, 0], [-W / 2 + 0.5, 2.9, 0], [-W / 2 + 0.5, Y0 + 2 * H + 0.1, 0]]);
  wire([[BX, 0.2, 0], [BX, 0.12, 0], [-W / 2, 0.12, 0], [-W / 2, Y0 - 0.05, 0]]);
  // 白光用的螢光粉罩
  const dome = at(new Mesh(new SphereGeometry(DOME, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), new MeshBasicMaterial({ color: YELLOW, transparent: true, opacity: 0.13, depthWrite: false })), 0, Y0, 0);
  scene.add(dome);
  // 電子（藍）、電洞（白底紅邊，用淺粉紅小球）、光子
  const mkInst = (n, r, color) => { const m = new InstancedMesh(new SphereGeometry(r, 10, 8), new MeshBasicMaterial({ color }), n); m.frustumCulled = false; scene.add(m); return m; };
  const els = mkInst(N_E, 0.085, 0x7fd0ff), holes = mkInst(N_E, 0.085, 0xffc1d6), phots = mkInst(N_P, 0.075, 0xffffff);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mk = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    p: mk('cp-ld-lb-p', 'p-type: holes', 'p 型：電洞'), n: mk('cp-ld-lb-n', 'n-type: electrons', 'n 型：電子'),
    jun: lab.add('cp-lb cp-ld-lb-jun', ''), dome: mk('cp-ld-lb-ph', 'Phosphor: turns some blue light yellow', '螢光粉：把一部分藍光變成黃光'),
    plus: lab.add('cp-lb cp-ld-lb-pole', '+'), minus: lab.add('cp-lb cp-ld-lb-pole', '−'),
  };

  const R = {
    colors: [...root.querySelectorAll('.cp-ld-colors button')], modes: [...root.querySelectorAll('.cp-ld-modes button')],
    nm: $('.cp-ld-nm'), ev: $('.cp-ld-ev'), mat: $('.cp-ld-mat'), lamp: $('.cp-ld-lamp'),
    msgs: [...root.querySelectorAll('.cp-ld-msg')], play: $('.al-play'),
  };
  const state = { color: 'red', mode: 'on', labels: true, playing: true, clock: 0, k: 1 };
  const base = () => (state.color === 'white' ? 'blue' : state.color);

  const m4 = new Matrix4(), tmp = V(0, 0, 0), col = new Color(), ledCol = new Color(), yel = new Color(YELLOW), white = new Color(0xffffff);
  function draw(dt) {
    const on = state.mode === 'on', rev = state.mode === 'reverse', isWhite = state.color === 'white';
    state.k += ((on ? 1 : 0) - state.k) * Math.min(1, dt * 5);                       // 亮度慢慢變
    ledCol.set(LEDS[base()].hex);
    junMat.color.set(0x445066).lerp(ledCol, state.k);
    glowLight.color.copy(isWhite ? white : ledCol); glowLight.intensity = state.k * 26;
    dome.visible = isWhite;
    capTop.color.set(rev ? 0x3a3f4a : 0xd8452f); capBot.color.set(rev ? 0xd8452f : 0x3a3f4a);
    for (let i = 0; i < N_E; i++) {
      const x = (hash(i, 1) - 0.5) * (W - 0.4), z = (hash(i, 2) - 0.5) * (D - 0.4), u = ((state.clock * (0.3 + 0.25 * hash(i, 3)) + hash(i, 4)) % 1 + 1) % 1;
      const jit = Math.sin(state.clock * 3 + i) * 0.05;
      // 順向：往接面走，到了就消失（復合）；反向：被拉到遠離接面的那一邊；關：散在整層裡微微晃動
      const d = on ? (1 - u) * (H - 0.12) + 0.06 : rev ? H - 0.2 + jit * 2 : 0.1 + hash(i, 5) * (H - 0.2) + jit;
      const s = on ? Math.min(1, u * 8) * Math.min(1, (1 - u) * 10) : 1;
      m4.makeScale(s, s, s).setPosition(x, JY - d, z); els.setMatrixAt(i, m4);
      const x2 = (hash(i, 6) - 0.5) * (W - 0.4), z2 = (hash(i, 7) - 0.5) * (D - 0.4);
      m4.makeScale(s, s, s).setPosition(x2, JY + d, z2); holes.setMatrixAt(i, m4);
    }
    els.instanceMatrix.needsUpdate = true; holes.instanceMatrix.needsUpdate = true;
    // 光子：從接面往外飛（大多往上）
    for (let i = 0; i < N_P; i++) {
      const u = ((state.clock * (0.42 + 0.2 * hash(i, 8)) + hash(i, 9)) % 1 + 1) % 1, a = hash(i, 10) * 6.283, el = 0.25 + hash(i, 11) * 1.25;
      const dist = u * 5.2, s = state.k > 0.05 ? state.k * (1 - u * u) : 0;
      tmp.set((hash(i, 12) - 0.5) * (W - 0.6) + Math.cos(a) * Math.cos(el) * dist, JY + Math.sin(el) * dist, (hash(i, 13) - 0.5) * (D - 0.6) + Math.sin(a) * Math.cos(el) * dist);
      m4.makeScale(s, s, s).setPosition(tmp); phots.setMatrixAt(i, m4);
      col.copy(ledCol); if (isWhite && hash(i, 14) < 0.5 && tmp.distanceTo(dome.position) > DOME) col.copy(yel);
      phots.setColorAt(i, col);
    }
    phots.instanceMatrix.needsUpdate = true; phots.instanceColor.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, lit = state.mode === 'on', rev = state.mode === 'reverse';
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.p, on, V(narrow ? 1.1 : W / 2, JY + H / 2, D / 2), narrow ? -26 : 0); L.p.style.marginLeft = narrow ? '0' : '74px';
    show(L.n, on, V(narrow ? 1.1 : W / 2, JY - H / 2, D / 2), narrow ? 30 : 0); L.n.style.marginLeft = narrow ? '0' : '88px';
    L.jun.innerHTML = lit ? 'Junction: they meet, and light comes out<small>接面：電子和電洞相遇，光就出來了</small>' : rev ? 'Junction: pulled apart, so no light<small>接面：電子和電洞被拉開，沒有光</small>' : 'Junction<small>接面</small>';
    show(L.jun, on && !narrow, V(-0.6, JY, D / 2), 0);
    show(L.dome, on && state.color === 'white' && !narrow, V(0, Y0 + DOME, 0), -16);
    show(L.plus, state.mode !== 'off', V(-5.2, rev ? 0.3 : 2.2, 0.45), 0); L.plus.style.marginLeft = '-34px';
    show(L.minus, state.mode !== 'off', V(-5.2, rev ? 2.2 : 0.3, 0.45), 0); L.minus.style.marginLeft = '-34px';
  }

  function readout() {
    const b = LEDS[base()], lit = state.mode === 'on', isWhite = state.color === 'white';
    R.colors.forEach((x) => x.setAttribute('aria-pressed', x.dataset.color === state.color ? 'true' : 'false'));
    R.modes.forEach((x) => x.setAttribute('aria-pressed', x.dataset.mode === state.mode ? 'true' : 'false'));
    R.nm.innerHTML = `${b.nm} nm<small>${isWhite ? 'the blue LED underneath · 底下的藍光 LED' : 'wavelength · 波長'}</small>`;
    R.ev.innerHTML = `${eV(b.nm).toFixed(2)} eV<small>energy of one photon · 一顆光子的能量</small>`;
    R.mat.innerHTML = `${b.mat}${isWhite ? ' + phosphor' : ''}<small>${isWhite ? 'material, plus yellow phosphor · 材料，再加黃色螢光粉' : 'material · 材料'}</small>`;
    R.lamp.style.setProperty('--c', lit ? (isWhite ? '#ffffff' : `#${b.hex.toString(16).padStart(6, '0')}`) : '#2a3654');
    R.lamp.classList.toggle('on', lit);
    const key = state.mode !== 'on' ? state.mode : isWhite ? 'white' : 'on';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function setColor(v) { if (v in LEDS || v === 'white') state.color = v; readout(); }
  function setMode(v) { if (['on', 'reverse', 'off'].includes(v)) state.mode = v; readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.colors.forEach((b) => b.addEventListener('click', () => { setColor(b.dataset.color); setPlaying(true); }));
  R.modes.forEach((b) => b.addEventListener('click', () => { setMode(b.dataset.mode); setPlaying(true); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) {
    if (state.playing) state.clock += dt;
    draw(dt);
  }
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

  const go = (c, m) => { setColor(c); setMode(m); setPlaying(true); };
  const DEMO = { red: () => go('red', 'on'), blue: () => go('blue', 'on'), reverse: () => go(state.color, 'reverse'), white: () => go('white', 'on') };
  root.__lab = {
    camera, controls, state, setColor, setMode, setPlaying,
    render: () => { for (let i = 0; i < 40; i++) step(0.05); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：三顆 LED 混出一個像素（不需要 WebGL） ----------------
function initRgb() {
  const el = document.querySelector('[data-chip-rgb]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const names = JSON.parse(el.dataset.names);
  const sl = ['r', 'g', 'b'].map((k) => $(`.cp-rgb-${k}`)), outs = ['r', 'g', 'b'].map((k) => $(`.cp-rgb-${k}-out`)), dots = ['r', 'g', 'b'].map((k) => $(`.cp-rgb-dot-${k}`));
  const px = $('.cp-rgb-px'), en = $('.cp-rgb-en'), zh = $('.cp-rgb-zh');
  function show() {
    const v = sl.map((s) => +s.value);
    sl.forEach((s, i) => { s.style.setProperty('--p', `${v[i]}%`); outs[i].textContent = `${v[i]}%`; dots[i].style.opacity = String(0.12 + 0.88 * v[i] / 100); });
    px.style.background = css(...v);
    const n = names[mixName(...v)];
    en.textContent = n.en; zh.textContent = n.zh;
    el.dataset.mix = mixName(...v);
  }
  sl.forEach((s) => s.addEventListener('input', show));
  el.querySelectorAll('.cp-rgb-pre button').forEach((b) => b.addEventListener('click', () => { sl[0].value = b.dataset.r; sl[1].value = b.dataset.g; sl[2].value = b.dataset.b; show(); }));
  show();
  el.__rgb = { show, set: (r, g, b) => { sl[0].value = String(r); sl[1].value = String(g); sl[2].value = String(b); show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRgb);
else initRgb();

lazyBoot('[data-chipled-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
