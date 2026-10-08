/*
 * 晶片與半導體 · 第五課「奈米、埃米有多小？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：十的次方縮放。從指甲（約 1 公分）一路放大四千多萬倍到矽原子（約 0.24 奈米＝2.4 埃），
 *   每一站的東西都照真實大小的比例畫：頭髮 → 紅血球 → 細菌 → 流感病毒 → 晶片上的線 → DNA → 矽原子。
 *   晶片那一站同時畫出「3 奈米」這個名字的長度，和 IRDS 給的實際間距（24、48 奈米）比一比。
 *
 * 做法：鏡頭不動，改每一站那一組物件的 scale（＝真實大小 ÷ 畫面寬度）。物件比畫面大很多時淡出、
 *   地板換成它的顏色（像鑽進它的表面）；比畫面小很多時還看不到。畫面只由縮放值 z（0–1，對數）決定。
 *   每一站只是「疊在上一站上面」方便比較大小，不代表它們真的長在一起（比例說明有寫）。
 *
 * 產物：cd tools/chips && npm run build → assets/js/chip-scale.js
 * 除錯：document.querySelector('[data-chipscale-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CapsuleGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, Group,
  HemisphereLight, InstancedMesh, MathUtils, Matrix4, Mesh, MeshStandardMaterial, PerspectiveCamera, Quaternion,
  Scene, SphereGeometry, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import {
  STOPS, NM, viewWidth, zoomOf, zoomForStop, magnification, fmtLen, scaleBar, NAIL_NM_PER_S, nailGrowthNm, atomsAcross,
  lengthAfterCuts, A4_LONG_MM,
} from './scalecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const W0 = 10;                       // 「畫面寬度」在場景裡是 10 個單位
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, transparent: true, ...o });
const COLORS = { nail: 0xf3c4b4, hair: 0x6b4a2e, rbc: 0xc8322e, bacterium: 0x5fae5a, virus: 0x8f6fd6, line: 0x5b7fb5, dna: 0x3fa7c9, atom: 0xb9c0cc };

// ---------------- 每一站的模型（各自的單位長度＝那一站的「大小」） ----------------
function buildStop(key) {
  const g = new Group();
  if (key === 'nail') {              // 1 單位＝指甲寬約 1 公分
    g.add(at(new Mesh(new BoxGeometry(1.5, 0.3, 3.2), mat(0xe2ad94)), 0, -0.03, 0.3));           // 手指
    g.add(at(new Mesh(new BoxGeometry(1, 0.05, 1.25), mat(0xf9d8cd, { roughness: 0.25 })), 0, 0.145, 0));
    g.add(at(new Mesh(new BoxGeometry(1, 0.052, 0.16), mat(0xfdf7f0, { roughness: 0.25 })), 0, 0.147, -0.62));
  } else if (key === 'hair') {       // 直徑 1＝約 75 微米
    const m = new Mesh(new CylinderGeometry(0.5, 0.5, 60, 24), mat(COLORS.hair, { roughness: 0.45 }));
    m.rotation.z = Math.PI / 2; g.add(at(m, 0, 0.5, 0));
  } else if (key === 'rbc') {        // 直徑 1＝約 7 微米
    const t = new Mesh(new TorusGeometry(0.33, 0.17, 16, 40), mat(COLORS.rbc, { roughness: 0.5 })); t.rotation.x = Math.PI / 2; g.add(at(t, 0, 0.17, 0));
    const c = new Mesh(new SphereGeometry(0.34, 24, 16), mat(0xa82420, { roughness: 0.5 })); c.scale.set(1, 0.28, 1); g.add(at(c, 0, 0.14, 0));
  } else if (key === 'bacterium') {  // 長 1＝約 2 微米
    const m = new Mesh(new CapsuleGeometry(0.21, 0.58, 8, 20), mat(COLORS.bacterium)); m.rotation.z = Math.PI / 2; g.add(at(m, 0, 0.21, 0));
    for (let k = 0; k < 4; k++) {    // 鞭毛
      const pts = Array.from({ length: 9 }, (_, i) => V(-0.5 - i * 0.16, 0.2 + Math.sin(i * 1.3 + k) * 0.07, (k - 1.5) * 0.09 + Math.cos(i * 1.1 + k) * 0.06));
      g.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), 24, 0.012, 5), mat(0x9fd49a)));
    }
  } else if (key === 'virus') {      // 直徑 1＝約 100 奈米
    g.add(at(new Mesh(new SphereGeometry(0.42, 28, 20), mat(COLORS.virus)), 0, 0.5, 0));
    const n = 70, sp = new InstancedMesh(new CylinderGeometry(0.018, 0.03, 0.1, 6), mat(0xd9c8ff), n);
    const m4 = new Matrix4(), q = new Quaternion(), up = V(0, 1, 0);
    for (let i = 0; i < n; i++) {
      const y = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - y * y), a = i * 2.39996;
      const d = V(Math.cos(a) * r, y, Math.sin(a) * r);
      m4.compose(V(0, 0.5, 0).addScaledVector(d, 0.46), q.setFromUnitVectors(up, d), V(1, 1, 1)); sp.setMatrixAt(i, m4);
    }
    g.add(sp);
  } else if (key === 'line') {       // 1 單位＝24 奈米（IRDS「3 nm」節點最密的金屬線間距）
    g.add(at(new Mesh(new BoxGeometry(22, 0.3, 14), mat(0x26334d)), 0, -0.15, 0));
    const n = 21, ridges = new InstancedMesh(new BoxGeometry(0.5, 0.7, 14), mat(COLORS.line, { metalness: 0.4, roughness: 0.35 }), n);
    const m4 = new Matrix4();
    for (let i = 0; i < n; i++) { m4.makeTranslation(i - (n - 1) / 2, 0.35, 0); ridges.setMatrixAt(i, m4); }
    g.add(ridges);
  } else if (key === 'dna') {        // 寬 1＝約 2 奈米
    const turns = 5, L = turns * 1.7, mk = (ph) => new CatmullRomCurve3(Array.from({ length: 80 }, (_, i) => {
      const u = i / 79, a = u * turns * Math.PI * 2 + ph; return V((u - 0.5) * L, 0.55 + Math.sin(a) * 0.5, Math.cos(a) * 0.5);
    }));
    g.add(new Mesh(new TubeGeometry(mk(0), 200, 0.07, 8), mat(COLORS.dna)));
    g.add(new Mesh(new TubeGeometry(mk(Math.PI), 200, 0.07, 8), mat(0xe58a4a)));
    const n = 50, rung = new InstancedMesh(new CylinderGeometry(0.035, 0.035, 1, 6), mat(0xdfe6f2), n);
    const m4 = new Matrix4(), q = new Quaternion(), up = V(0, 1, 0);
    for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n, a = u * turns * Math.PI * 2;
      m4.compose(V((u - 0.5) * L, 0.55, 0), q.setFromUnitVectors(up, V(0, Math.sin(a), Math.cos(a))), V(1, 1, 1)); rung.setMatrixAt(i, m4);
    }
    g.add(rung);
  } else if (key === 'atom') {       // 直徑 1＝矽原子約 0.235 奈米
    const nx = 9, nz = 7, at2 = new InstancedMesh(new SphereGeometry(0.5, 24, 16), mat(COLORS.atom, { metalness: 0.3, roughness: 0.35 }), nx * nz * 2);
    const m4 = new Matrix4(); let i = 0;
    for (let l = 0; l < 2; l++) for (let x = 0; x < nx; x++) for (let z = 0; z < nz; z++) {
      m4.makeTranslation((x - (nx - 1) / 2) + l * 0.5, 0.5 - l * 0.72, (z - (nz - 1) / 2) + l * 0.5); at2.setMatrixAt(i++, m4);
    }
    g.add(at2);
  }
  return g;
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
  const BG = new Color(0x0d1730);
  scene.background = BG.clone();
  const camera = new PerspectiveCamera(34, 1, 0.1, 400);
  const TARGET = V(0, 0.6, 0);
  const homePos = () => TARGET.clone().add(V(0, 9.5, 13.5).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.2 ? 1.15 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.enableZoom = false; controls.enablePan = false;        // 縮放交給滑桿：這一課的「放大」是換尺度，不是拉近鏡頭
  controls.maxPolarAngle = Math.PI * 0.46; controls.minPolarAngle = 0.15;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.15); sun.position.set(5, 12, 8); scene.add(sun);

  // 地板：鑽進某個東西的表面時，換成它的顏色
  const floorMat = new MeshStandardMaterial({ color: 0x1a2744, roughness: 0.9 });
  scene.add(at(new Mesh(new BoxGeometry(400, 0.2, 400), floorMat), 0, -0.1, 0));
  const FLOOR0 = new Color(0x1a2744);

  const stops = STOPS.map((s, i) => {
    const g = buildStop(s.key); scene.add(g);
    const mats = []; g.traverse((o) => { if (o.material) mats.push(o.material); });
    return { ...s, i, g, mats, col: new Color(COLORS[s.key]) };
  });
  // 晶片那一站：「3 奈米」這個名字的長度（3/24 個單位）
  const nameBar = at(new Mesh(new BoxGeometry(3 / 24, 0.12, 0.5), new MeshStandardMaterial({ color: 0xffd36e, emissive: 0x6a4a00, transparent: true })), 0, 0.82, 4.4);
  stops[5].g.add(nameBar); stops[5].mats.push(nameBar.material);
  // 原子那一站：1 埃的長度（1 Å ＝ 0.1 nm ＝ 0.4255 個原子直徑）
  const angBar = at(new Mesh(new BoxGeometry(0.1 / 0.235, 0.08, 0.14), new MeshStandardMaterial({ color: 0xffd36e, emissive: 0x6a4a00, transparent: true })), 0, 1.08, 0);
  stops[7].g.add(angBar); stops[7].mats.push(angBar.material);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = stops.map((s) => lab.add('cp-lb cp-sc-lb', ''));
  const Lname = lab.add('cp-lb cp-sc-lb cp-sc-name', '“3 nm” is only this long<small>「3 奈米」只有這麼長</small>');
  const Lpitch = lab.add('cp-lb cp-sc-lb', 'Line to line: 24 nm<small>線到線：24 奈米</small>');
  const Lang = lab.add('cp-lb cp-sc-lb cp-sc-name', '1 Å (angstrom) = 0.1 nm<small>1 埃米＝0.1 奈米</small>');

  const R = {
    zoom: $('.cp-sc-zoom'), view: $('.cp-sc-view'), mag: $('.cp-sc-mag'), bar: $('.cp-sc-bar'), barT: $('.cp-sc-bar-t'),
    btns: [...root.querySelectorAll('.cp-sc-stops button')], panels: [...root.querySelectorAll('.cp-sc-panel')],
    units: [...root.querySelectorAll('.cp-sc-units li')], play: $('.al-play'), inB: $('.cp-sc-in'), outB: $('.cp-sc-out'),
  };
  const state = { z: 0, target: null, playing: true, labels: true, hold: 1.2, cur: 0, lastCur: -1 };
  const FRAC = { nail: 0.34, hair: 0.12, line: 0.09, dna: 0.2, atom: 0.12 };      // 到那一站時，它佔畫面寬度的比例
  const STOP_Z = stops.map((s) => zoomForStop(s.key, FRAC[s.key] || 0.28));

  // ---------------- 由 z 算出畫面 ----------------
  const tmpC = new Color();
  const TOP = { nail: 0, hair: 1.0, rbc: 0.3, bacterium: 0.42, virus: 0.95, line: 0.7, dna: 1.05, atom: 1.0 };
  const SIDE = ['rbc', 'bacterium', 'virus', 'dna'];
  function draw() {
    const view = viewWidth(state.z);
    let floorK = 0, floorCol = FLOOR0, offX = 0, offZ = 0;
    stops.forEach((s) => {
      const rel = s.size / view;                      // 這個東西佔畫面寬度的比例
      const k = rel * W0;
      s.g.scale.setScalar(k);
      // 長大到塞滿畫面時往下沉，頂面剛好變成地板；比它小的下一站先站在它旁邊，等它沉下去再移到中間
      const sink = s.key === 'nail' ? 0 : MathUtils.smoothstep(rel, 0.4, 1.0);
      s.g.position.set(offX, -TOP[s.key] * k * sink, offZ);
      if (s.key === 'hair') offZ += 0.78 * k * (1 - sink);
      else if (SIDE.includes(s.key)) offX += 0.7 * k * (1 - sink);
      const big = s.key === 'hair' || s.key === 'line' ? 9 : 3;   // 頭髮和線條是「一整條」，多留一點才淡出
      const fadeIn = MathUtils.smoothstep(rel, 0.006, 0.02), fadeOut = 1 - MathUtils.smoothstep(rel, big * 0.6, big);
      const o = fadeIn * fadeOut;
      s.g.visible = o > 0.01;
      for (const m of s.mats) { m.opacity = o; m.depthWrite = o > 0.6; }
      s.rel = rel; s.o = o;
      const fk = MathUtils.smoothstep(rel, big * 0.35, big * 0.9);
      if (fk > 0) { floorK = fk; floorCol = s.col; }
    });
    floorMat.color.copy(FLOOR0).lerp(tmpC.copy(floorCol).lerp(FLOOR0, 0.45).multiplyScalar(0.6), floorK);
    // 目前在哪一站：畫面裡「看得清楚」的最小那個
    let cur = 0, bd = 99;
    stops.forEach((s, i) => { const d = Math.abs(Math.log(s.rel / (FRAC[s.key] || 0.28))); if (d < bd) { bd = d; cur = i; } });
    state.cur = cur;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    stops.forEach((s, i) => {
      const vis = on && s.o > 0.5 && s.rel > 0.05 && s.rel < (s.key === 'hair' || s.key === 'line' ? 3 : 1.6) && (!narrow || i === state.cur);
      if (vis) {
        const f = fmtLen(s.size);
        L[i].innerHTML = `${s.en} · ${s.about ? 'about ' : ''}${f.en}<small>${s.zh}：${s.about ? '約 ' : ''}${f.zh}</small>`;
      }
      const h = s.key === 'virus' ? 1.0 : s.key === 'dna' ? 1.15 : s.key === 'nail' ? 0.2 : s.key === 'line' ? 0.75 : 0.6;
      const gp = s.g.position, k = s.g.scale.x;
      show(L[i], vis, V(gp.x + (s.key === 'line' ? -5.5 * k : 0), gp.y + h * k, gp.z + (s.key === 'nail' ? 0.3 * k : s.key === 'line' ? 2.5 * k : 0)), s.key === 'line' ? -18 : -22);
    });
    const ln = stops[5], k = ln.g.scale.x;
    const showLine = on && ln.o > 0.6 && ln.rel > 0.05 && ln.rel < 0.4;
    show(Lname, showLine, V(ln.g.position.x, ln.g.position.y + 0.9 * k, 4.4 * k), -24);
    show(Lpitch, showLine && !narrow, V(4.5 * k, ln.g.position.y + 0.72 * k, 1.5 * k), -18);
    const a = stops[7];
    show(Lang, on && a.o > 0.6 && a.rel > 0.06, V(a.g.position.x, a.g.position.y + 1.15 * a.g.scale.x, a.g.position.z), -24);
  }

  // ---------------- 讀數 ----------------
  const big = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)} million` : Math.round(n).toLocaleString('en-US'));
  const bigZh = (n) => (n >= 1e4 ? `${Number((n / 1e4).toFixed(n >= 1e5 ? 0 : 1)).toLocaleString('en-US')} 萬` : `${Math.round(n).toLocaleString('en-US')} `);
  function readout() {
    const view = viewWidth(state.z), f = fmtLen(view), m = magnification(state.z);
    R.zoom.value = String(state.z); R.zoom.style.setProperty('--p', `${state.z * 100}%`);
    R.view.innerHTML = `${f.en}<small>${f.zh}</small>`;
    R.mag.innerHTML = `× ${big(m)}<small>放大 ${bigZh(m)}倍</small>`;
    const b = scaleBar(view, 0.26);
    R.bar.style.width = `${b.frac * 100}%`; R.barT.textContent = `${b.en} · ${b.zh}`;
    const unit = view >= 1e-3 ? 0 : view >= 1e-6 ? 1 : view >= 2e-9 ? 2 : 3;
    R.units.forEach((li, i) => li.classList.toggle('on', i === unit));
    if (state.cur !== state.lastCur) {
      state.lastCur = state.cur;
      R.btns.forEach((bt, i) => bt.setAttribute('aria-pressed', i === state.cur ? 'true' : 'false'));
      R.panels.forEach((p, i) => { p.hidden = i !== state.cur; });
    }
    R.inB.disabled = state.z >= 0.999; R.outB.disabled = state.z <= 0.001;
  }

  // ---------------- 操作 ----------------
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Zoom in · 一路放大';
  }
  function setZoom(z, now = true) { if (now) { state.z = MathUtils.clamp(+z, 0, 1); state.target = null; } else state.target = MathUtils.clamp(+z, 0, 1); }
  function goStop(i, now = false) { setPlaying(false); setZoom(STOP_Z[MathUtils.clamp(i, 0, stops.length - 1)], now); }
  function times10(dir) { setPlaying(false); setZoom(zoomOf(viewWidth(state.target ?? state.z) / Math.pow(10, dir)), false); }
  R.zoom.addEventListener('input', () => { setPlaying(false); setZoom(R.zoom.value); });
  R.btns.forEach((b, i) => b.addEventListener('click', () => goStop(i)));
  R.inB.addEventListener('click', () => times10(1));
  R.outB.addEventListener('click', () => times10(-1));
  R.play.addEventListener('click', () => { if (!state.playing && state.z >= 0.999) { state.z = 0; } state.target = null; state.hold = 0.6; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let nextStop = 1;
  function step(dt) {
    if (state.target !== null) {
      const d = state.target - state.z;
      state.z += d * Math.min(1, dt * 3.2);
      if (Math.abs(d) < 0.0008) { state.z = state.target; state.target = null; }
    } else if (state.playing) {
      // 自動放大：走到下一站停一下
      if (state.hold > 0) state.hold -= dt;
      else {
        nextStop = STOP_Z.findIndex((z) => z > state.z + 0.004);
        const goal = nextStop < 0 ? 1 : STOP_Z[nextStop];
        state.z = Math.min(goal, state.z + dt * 0.075);
        if (state.z >= goal) { state.hold = 2.6; if (goal >= 1 || nextStop === stops.length - 1) { state.z = goal; setPlaying(false); } }
      }
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
    if (t - lastR > 100) { lastR = t; readout(); }
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
    root.classList.toggle('cp-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  state.z = STOP_Z[0];
  step(0.001); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = Object.fromEntries(stops.map((s, i) => [s.key, () => goStop(i)]));
  root.__lab = {
    camera, controls, state, stops, STOP_Z, setZoom, goStop, times10, setPlaying,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：你的指甲長了多少？（不需要 WebGL） ----------------
function initNail() {
  const el = document.querySelector('[data-chip-nail]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const t0 = performance.now();
  const out = { nm: $('.cp-nl-nm'), atoms: $('.cp-nl-atoms'), sec: $('.cp-nl-sec'), en: $('.cp-nl-en'), zh: $('.cp-nl-zh'), cmp: $('.cp-nl-cmp'), cmpZh: $('.cp-nl-cmp-zh') };
  const spans = [...el.querySelectorAll('.cp-nl-spans button')];
  const SPAN = { s: 1, min: 60, h: 3600, d: 86400, y: 365.25 * 86400 };
  let span = 'min';
  const nearest = (m) => {           // 找一個大小差不多的東西來比
    let best = STOPS[0], bd = 99;
    for (const s of STOPS) { const d = Math.abs(Math.log10(m / s.size)); if (d < bd) { bd = d; best = s; } }
    return best;
  };
  const ratio = (r) => (r >= 10 ? Math.round(r).toLocaleString('en-US') : r >= 1 ? r.toFixed(1).replace(/\.0$/, '') : r.toFixed(2));
  function showSpan() {
    spans.forEach((b) => b.setAttribute('aria-pressed', b.dataset.span === span ? 'true' : 'false'));
    const m = nailGrowthNm(SPAN[span]) * NM, f = fmtLen(m), s = nearest(m), r = m / s.size;
    out.en.textContent = f.en; out.zh.textContent = f.zh;
    const A = { nail: 'a fingernail', hair: 'a human hair', rbc: 'a red blood cell', bacterium: 'a bacterium', virus: 'a flu virus', line: 'the gap between two lines on a chip', dna: 'a strand of DNA', atom: 'a silicon atom' };
    out.cmp.textContent = `about ${ratio(r)} × the width of ${A[s.key]}`;
    out.cmpZh.textContent = `大約是${s.key === 'line' ? '晶片上兩條線的間距' : s.zh.replace('（大腸桿菌）', '')}的 ${ratio(r)} 倍`;
  }
  spans.forEach((b) => b.addEventListener('click', () => { span = b.dataset.span; showSpan(); }));
  // 剪紙
  const cut = $('.cp-nl-cut'), cutOut = $('.cp-nl-cut-out'), cutLen = $('.cp-nl-cut-len'), cutCmp = $('.cp-nl-cut-cmp');
  function showCut() {
    const n = +cut.value, m = lengthAfterCuts(A4_LONG_MM, n), f = fmtLen(m), s = nearest(m);
    cut.style.setProperty('--p', `${n / 30 * 100}%`);
    cutOut.textContent = String(n);
    cutLen.innerHTML = `${f.en}<small>${f.zh}</small>`;
    cutCmp.innerHTML = n === 0 ? 'The long side of a sheet of A4 paper<span class="zh">一張 A4 紙的長邊</span>'
      : m < 1e-9 ? 'Smaller than 1 nanometer: only a few atoms wide<span class="zh">不到 1 奈米：只有幾顆原子寬</span>'
        : `About the size of: ${s.key === 'dna' ? 'DNA' : s.en.toLowerCase().replace('e. coli', 'E. coli')}<span class="zh">大約像：${s.zh}</span>`;
  }
  cut.addEventListener('input', showCut);
  function tick() {
    const sec = (performance.now() - t0) / 1000, nm = nailGrowthNm(sec);
    out.nm.textContent = Math.round(nm).toLocaleString('en-US');
    el.querySelectorAll('.cp-nl-atoms').forEach((x) => { x.textContent = Math.round(atomsAcross(nm)).toLocaleString('en-US'); });
    el.querySelectorAll('.cp-nl-sec').forEach((x) => { x.textContent = Math.floor(sec).toLocaleString('en-US'); });
  }
  showSpan(); showCut(); tick();
  setInterval(tick, 200);
  el.__nail = { rate: NAIL_NM_PER_S, setSpan: (s) => { span = s; showSpan(); }, setCut: (n) => { cut.value = String(n); showCut(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initNail);
else initNail();

lazyBoot('[data-chipscale-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
