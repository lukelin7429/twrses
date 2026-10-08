/*
 * 晶片與半導體 · 第十一課「晶圓廠為什麼需要那麼多水和電？」的 3D 模型（全部自繪示意，不是真實比例或配置）。
 *
 * 一個機制：晶片上的線路比灰塵小得多，所以一切都要「乾淨到極點」，而乾淨要靠水和電：
 *   水——每道化學步驟之後都要用超純水沖洗晶圓；用過的水可以回收再用。
 *   電——無塵室的風扇和濾網不停地換空氣、空調把溫濕度管得很嚴、機台（尤其 EUV 曝光機）本身很耗電。
 *
 * 場景：一座剖開的小晶圓廠。左邊是自來水槽與超純水設備，中間是無塵室（天花板一排風扇濾網、濕式清洗台、EUV 機台），
 *   前面是回收水槽。兩個視角：水（回收率滑桿）／電（三個用電大戶）。
 *
 * 產物：cd tools/chips && npm run build → assets/js/chip-fab.js
 * 除錯：document.querySelector('[data-chipfab-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { fresh, timesUsed, ISO, cleaner, TOOL_MW } from './fabcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const UP = V(0, 1, 0);

// 水路（折線）。frac：這條路上的水量跟回收率 r 的關係
const PATHS = [
  { key: 'intake', color: 0x7fb6e6, frac: (r) => 1 - r, pts: [[-6, 0.3, 0], [-5.3, 0.3, 0], [-4.75, 0.3, 0]] },
  { key: 'pure', color: 0xbfeaff, frac: () => 1, pts: [[-4.75, 0.3, 0], [-3.0, 0.3, 0], [-3.0, 1.75, 0], [-1.2, 1.75, 0], [-1.2, 1.12, 0]] },
  { key: 'used', color: 0x8c9a86, frac: () => 1, pts: [[-1.2, 0.95, 0.35], [-1.2, 0.18, 0.9], [-1.2, 0.18, 2.3], [-3.5, 0.18, 2.3]] },
  { key: 'back', color: 0x5fd0c0, frac: (r) => r, pts: [[-4.2, 0.3, 2.3], [-4.75, 0.3, 1.4], [-4.75, 0.3, 0]] },
  { key: 'drain', color: 0x7d7f86, frac: (r) => 1 - r, pts: [[-4.5, 0.18, 2.7], [-6.6, 0.18, 2.9]] },
];
const PER = 16;                                              // 每條路最多幾滴
function prep(p) {
  p.v = p.pts.map((a) => V(...a)); p.len = [0];
  for (let i = 1; i < p.v.length; i++) p.len.push(p.len[i - 1] + p.v[i].distanceTo(p.v[i - 1]));
  p.total = p.len[p.len.length - 1];
}
function along(p, u, out) {
  const d = u * p.total; let i = 1;
  while (i < p.len.length - 1 && p.len[i] < d) i++;
  return out.copy(p.v[i - 1]).lerp(p.v[i], (d - p.len[i - 1]) / (p.len[i] - p.len[i - 1]));
}
PATHS.forEach(prep);
const N_AIR = 150;

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
  scene.background = new Color(0x0e1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(-1.5, 1.5, 0.4);
  const homePos = () => TARGET.clone().add(V(1.5, 6.4, 16.8).multiplyScalar(camera.aspect < 0.85 ? 1.75 : camera.aspect < 1.2 ? 1.3 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 45; controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const sun = new DirectionalLight(0xffffff, 1.0); sun.position.set(4, 10, 8); scene.add(sun);

  // 地面
  scene.add(at(new Mesh(new BoxGeometry(13.5, 0.1, 8), std(0x1b2a44, { roughness: 0.9 })), -1.2, -0.05, 0.6));
  // 無塵室：後牆、地板、玻璃
  const X0 = -2.4, X1 = 4.0, RH = 3.0;
  scene.add(at(new Mesh(new BoxGeometry(X1 - X0, RH, 0.1), std(0xe8eef6)), (X0 + X1) / 2, RH / 2, -1.5));
  scene.add(at(new Mesh(new BoxGeometry(X1 - X0, 0.08, 3), std(0xcfd8e6)), (X0 + X1) / 2, 0.04, 0));
  const glass = std(0x9fd0ff, { transparent: true, opacity: 0.13, depthWrite: false });
  scene.add(at(new Mesh(new BoxGeometry(0.06, RH, 3), glass), X0, RH / 2, 0));
  scene.add(at(new Mesh(new BoxGeometry(0.06, RH, 3), glass), X1, RH / 2, 0));
  scene.add(at(new Mesh(new BoxGeometry(X1 - X0, 0.12, 3), std(0xb9c4d6)), (X0 + X1) / 2, RH + 0.06, 0));
  // 風扇濾網（FFU）
  const ffuMat = std(0x58b4ff, { emissive: 0x000000 }), blades = [];
  for (let i = 0; i < 6; i++) {
    const x = X0 + 0.55 + i * ((X1 - X0 - 1.1) / 5);
    scene.add(at(new Mesh(new BoxGeometry(0.8, 0.28, 1.6), ffuMat), x, RH + 0.26, 0));
    const b = new Group(); at(b, x, RH + 0.43, 0); scene.add(b); blades.push(b);
    for (let k = 0; k < 2; k++) { const m = new Mesh(new BoxGeometry(0.7, 0.03, 0.14), std(0x1c2740)); m.rotation.y = k * Math.PI / 2; b.add(m); }
  }
  // 屋頂的空調（冰水機）
  const coolMat = std(0x7cc7b0, { emissive: 0x000000 });
  scene.add(at(new Mesh(new BoxGeometry(2.4, 0.8, 1.2), coolMat), 2.3, RH + 0.95, -0.9));
  scene.add(at(new Mesh(new CylinderGeometry(0.35, 0.35, 0.12, 20), std(0x2b303b)), 1.8, RH + 1.41, -0.9));
  scene.add(at(new Mesh(new CylinderGeometry(0.35, 0.35, 0.12, 20), std(0x2b303b)), 2.8, RH + 1.41, -0.9));
  // EUV 機台
  const toolMat = std(0x8a5ad6, { emissive: 0x000000 });
  scene.add(at(new Mesh(new BoxGeometry(2.0, 1.5, 1.5), toolMat), 2.5, 0.83, -0.4));
  scene.add(at(new Mesh(new BoxGeometry(0.9, 0.6, 1.0), std(0xd9d0f2)), 2.5, 1.88, -0.4));
  // 濕式清洗台＋晶圓
  scene.add(at(new Mesh(new BoxGeometry(1.5, 0.85, 1.1), std(0xf2f5fa)), -1.2, 0.5, 0));
  scene.add(at(new Mesh(new CylinderGeometry(0.45, 0.45, 0.04, 40), std(0x9aa7c7, { metalness: 0.5, roughness: 0.25 })), -1.2, 0.96, 0));
  // 自來水槽、超純水設備（三段）、回收水槽、放流口
  scene.add(at(new Mesh(new CylinderGeometry(0.65, 0.65, 1.7, 28), std(0x6f9fd0)), -6, 0.85, 0));
  [[-4.75, 1.2, 0xa9c4e0], [-4.1, 1.6, 0xc6dcf2], [-3.45, 1.2, 0xe2f1ff]].forEach(([x, h, c]) => scene.add(at(new Mesh(new CylinderGeometry(0.24, 0.24, h, 20), std(c)), x, h / 2, -0.45)));
  scene.add(at(new Mesh(new BoxGeometry(1.9, 0.12, 0.8), std(0x4a5878)), -4.1, 0.06, -0.45));
  scene.add(at(new Mesh(new CylinderGeometry(0.6, 0.6, 1.0, 28), std(0x4fb8a8)), -4.0, 0.5, 2.5));
  scene.add(at(new Mesh(new BoxGeometry(0.7, 0.5, 0.7), std(0x6b6f78)), -6.9, 0.25, 2.95));
  // 水管
  const q = new Quaternion();
  PATHS.forEach((p) => { for (let i = 1; i < p.v.length; i++) { const a = p.v[i - 1], b = p.v[i], d = b.clone().sub(a), m = new Mesh(new CylinderGeometry(0.035, 0.035, d.length(), 8), std(0x8fa6c8, { transparent: true, opacity: 0.55 })); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.copy(q.setFromUnitVectors(UP, d.clone().normalize())); scene.add(m); } });
  // 水滴、空氣裡的微粒
  const drops = new InstancedMesh(new SphereGeometry(0.075, 10, 8), new MeshBasicMaterial({ color: 0xffffff }), PATHS.length * PER);
  drops.frustumCulled = false; scene.add(drops);
  const air = new InstancedMesh(new SphereGeometry(0.03, 6, 5), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }), N_AIR);
  air.frustumCulled = false; scene.add(air);
  const spray = new InstancedMesh(new SphereGeometry(0.035, 6, 5), new MeshBasicMaterial({ color: 0xbfeaff }), 14);
  spray.frustumCulled = false; scene.add(spray);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mk = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    tap: mk('', 'City water', '自來水'), upw: mk('cp-fb-lb-pure', 'Ultrapure water plant', '超純水設備'),
    rinse: mk('cp-fb-lb-pure', 'Rinse the wafer', '沖洗晶圓'), reclaim: mk('cp-fb-lb-back', 'Reclaimed water', '回收水'),
    drain: mk('', 'Treated, then released', '處理後排放'),
    ffu: mk('cp-fb-lb-pow', 'Fans and filters', '風扇與濾網'), cool: mk('cp-fb-lb-pow', 'Cooling and air conditioning', '冷卻與空調'),
    tool: mk('cp-fb-lb-pow', `EUV machine: ${TOOL_MW.euv} MW`, `EUV 曝光機：${TOOL_MW.euv} MW`),
  };

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], wbox: $('.cp-fb-wbox'), pbox: $('.cp-fb-pbox'),
    rec: $('.cp-fb-rec'), recOut: $('.cp-fb-rec-out'), fresh: $('.cp-fb-fresh'), times: $('.cp-fb-times'),
    users: [...root.querySelectorAll('.cp-fb-users button')], msgs: [...root.querySelectorAll('.cp-fb-msg')], play: $('.al-play'),
  };
  const state = { view: 'water', r: 0.85, focus: 'air', labels: true, playing: true, clock: 0, spin: 0 };

  const m4 = new Matrix4(), tmp = V(0, 0, 0), col = new Color();
  function draw() {
    const water = state.view === 'water', pulse = 0.5 + 0.5 * Math.sin(state.clock * 5);
    drops.visible = water; spray.visible = water; air.visible = !water;
    PATHS.forEach((p, pi) => {
      const f = p.frac(state.r);
      for (let k = 0; k < PER; k++) {
        const on = (k + 0.5) / PER <= f + 1e-9 ? 1 : 0;
        along(p, ((state.clock * 1.6 / p.total + k / PER) % 1 + 1) % 1, tmp);
        m4.makeScale(on, on, on).setPosition(tmp); drops.setMatrixAt(pi * PER + k, m4); drops.setColorAt(pi * PER + k, col.set(p.color));
      }
    });
    drops.instanceMatrix.needsUpdate = true; if (drops.instanceColor) drops.instanceColor.needsUpdate = true;
    for (let i = 0; i < 14; i++) { const u = ((state.clock * 1.4 + hash(i, 1)) % 1 + 1) % 1, a = hash(i, 2) * 6.28; m4.makeTranslation(-1.2 + Math.cos(a) * u * 0.42, 1.12 - u * 0.14, Math.sin(a) * u * 0.42); spray.setMatrixAt(i, m4); }
    spray.instanceMatrix.needsUpdate = true;
    // 空氣：從天花板往下吹，到地板就被抽走（層流）
    for (let i = 0; i < N_AIR; i++) {
      const u = ((state.clock * 0.35 + hash(i, 3)) % 1 + 1) % 1, s = Math.sin(u * Math.PI) > 0.1 ? 1 : 0;
      m4.makeScale(s, s, s).setPosition(X0 + 0.25 + hash(i, 4) * (X1 - X0 - 0.5), RH - 0.05 - u * (RH - 0.2), -1.3 + hash(i, 5) * 2.6); air.setMatrixAt(i, m4);
    }
    air.instanceMatrix.needsUpdate = true;
    blades.forEach((b) => { b.rotation.y = state.spin; });
    const glow = (mat, base, on) => { mat.emissive.set(on ? base : 0x000000).multiplyScalar(on ? 0.25 + 0.35 * pulse : 0); };
    glow(ffuMat, 0x58b4ff, !water && state.focus === 'air'); glow(coolMat, 0x7cc7b0, !water && state.focus === 'cool'); glow(toolMat, 0x8a5ad6, !water && state.focus === 'tools');
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, water = state.view === 'water';
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.tap, on && water, V(-6, 1.75, 0), -14);
    show(L.upw, on && water, V(-4.1, 1.65, -0.45), -16);
    show(L.rinse, on && water, V(-1.2, 1.8, 0), -16);
    show(L.reclaim, on && water && state.r > 0, V(-4.0, 1.05, 2.5), -14);
    show(L.drain, on && water && !narrow, V(-6.9, 0.55, 2.95), -14);
    show(L.ffu, on && !water && (state.focus === 'air' || !narrow), V(X0 + 1, RH + 0.5, 0), -16);
    show(L.cool, on && !water && (state.focus === 'cool' || !narrow), V(2.3, RH + 1.45, -0.9), -16);
    show(L.tool, on && !water && (state.focus === 'tools' || !narrow), V(2.5, 1.2, 0.4), 0);
  }

  function readout() {
    const water = state.view === 'water';
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    R.wbox.hidden = !water; R.pbox.hidden = water;
    R.recOut.textContent = `${Math.round(state.r * 100)}%`;
    R.rec.style.setProperty('--p', `${(state.r / 0.9) * 100}%`);
    R.fresh.innerHTML = `${Math.round(fresh(100, state.r))} L<small>of new water for every 100 L used · 每用 100 公升要補的新水</small>`;
    const t = timesUsed(state.r);
    R.times.innerHTML = `${t % 1 < 0.05 ? Math.round(t) : t.toFixed(1)}×<small>times each drop is used, on average · 每滴水平均用幾次</small>`;
    R.users.forEach((b) => b.setAttribute('aria-pressed', b.dataset.user === state.focus ? 'true' : 'false'));
    const key = water ? 'water' : state.focus;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function setView(v) { if (v === 'water' || v === 'power') state.view = v; readout(); }
  function setR(v) { state.r = Math.min(0.9, Math.max(0, v)); R.rec.value = String(Math.round(state.r * 100)); readout(); }
  function setFocus(v) { if (['air', 'cool', 'tools'].includes(v)) state.focus = v; readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  R.rec.addEventListener('input', () => setR(+R.rec.value / 100));
  R.users.forEach((b) => b.addEventListener('click', () => setFocus(b.dataset.user)));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) {
    if (state.playing) { state.clock += dt; state.spin += dt * 9; }
    draw();
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

  step(0); setR(0.85);
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (view, fn) => { setView(view); if (fn) fn(); setPlaying(true); };
  const DEMO = { norecycle: () => go('water', () => setR(0)), recycle: () => go('water', () => setR(0.85)), air: () => go('power', () => setFocus('air')), tools: () => go('power', () => setFocus('tools')) };
  root.__lab = {
    camera, controls, state, setView, setR, setFocus, setPlaying,
    counts: () => PATHS.map((p) => Math.round(p.frac(state.r) * PER)),
    render: () => { step(0.3); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：無塵室有多乾淨？（不需要 WebGL） ----------------
function initClean() {
  const el = document.querySelector('[data-chip-clean]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const btns = [...el.querySelectorAll('.cp-cl-rooms button')], n = $('.cp-cl-n'), en = $('.cp-cl-en'), zh = $('.cp-cl-zh'), cvs = $('.cp-cl-cv'), ctx = cvs.getContext('2d');
  const DOTS = 3520;                                             // ISO 9 畫 3,520 點，其他等比例
  function show(iso) {
    const c = ISO[iso], x = cleaner(iso), dots = DOTS / x;
    btns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.iso === iso ? 'true' : 'false'));
    n.textContent = c.toLocaleString('en-US');
    en.textContent = x === 1 ? 'This is ordinary city air.' : `${x.toLocaleString('en-US')} times cleaner than ordinary city air.`;
    zh.textContent = x === 1 ? '這就是一般都市的空氣。' : `比一般都市的空氣乾淨 ${x.toLocaleString('en-US')} 倍。`;
    const W = cvs.width, H = cvs.height;
    ctx.fillStyle = '#0b1226'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd36e';
    const k = Math.round(dots);
    for (let i = 0; i < k; i++) { ctx.beginPath(); ctx.arc(8 + hash(i, 11) * (W - 16), 8 + hash(i, 12) * (H - 16), k > 500 ? 2 : 3.5, 0, 6.3); ctx.fill(); }
    el.dataset.dots = String(k);
  }
  btns.forEach((b) => b.addEventListener('click', () => show(+b.dataset.iso)));
  show(9);
  el.__clean = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initClean);
else initClean();

lazyBoot('[data-chipfab-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
