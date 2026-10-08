/*
 * 地球與天氣 · 第一課「地球裡面有什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：地球有四層——地殼（薄薄一層固體）、地函（最厚，固體但會慢慢流動）、外核（液態的鐵和鎳）、內核（固態的鐵球）。
 *   沒有人下去過；我們是靠地震波「聽」出來的：S 波穿不過液體，所以在外核停住；P 波被地核折彎，留下一圈收不到的「陰影帶」。
 *
 * 場景：切成一半的地球，切面上四層照真實比例畫（地殼太薄，畫厚了）。兩個視角：
 *   layers＝拉深度滑桿，一路往下到地心；waves＝一個地震的 P 波、S 波怎麼穿過地球。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-inside.js
 * 除錯：document.querySelector('[data-earthinside-lab]').__lab
 */
import {
  AmbientLight, BufferGeometry, CanvasTexture, CircleGeometry, Color, DirectionalLight, DoubleSide, Group, HemisphereLight, InstancedMesh, Line,
  LineBasicMaterial, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, RingGeometry, Scene, SphereGeometry, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { R, LAYERS, layerAt, volFrac, pctToCenter, KOLA_KM, travel, totalHours, SHADOW } from './insidecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const RS = 3, K = RS / R;                                       // 場景裡的地球半徑、公里 → 場景單位
const CRUST_DRAW = 0.07;                                         // 地殼畫多厚（真實比例只有 0.008，看不見）
const RC = (R - 2900) * K, RI = (R - 5120) * K;                  // 外核、內核的半徑
const COLORS = { crust: 0x8a6a4a, mantle: 0xd9572b, outer: 0xffa62b, inner: 0xfff0a8 };
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const pt = (deg, r = RS, side = 1) => V(side * r * Math.sin((deg * Math.PI) / 180), r * Math.cos((deg * Math.PI) / 180), 0);   // 從正上方（震央）量的角度
const U_MAX = 1000, depthOf = (u) => R * (u / U_MAX) ** 2.2, uOf = (d) => U_MAX * (d / R) ** (1 / 2.2);   // 滑桿非線性：靠近地表比較細

function earthTex() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#2a6fc9'; g.fillRect(0, 0, 512, 256);
  g.fillStyle = '#4fae6a';
  for (let i = 0; i < 26; i++) { g.beginPath(); g.ellipse(hash(i, 1) * 512, 30 + hash(i, 2) * 196, 14 + hash(i, 3) * 46, 8 + hash(i, 4) * 26, hash(i, 5) * 3, 0, 6.3); g.fill(); }
  g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(0, 0, 512, 12); g.fillRect(0, 244, 512, 12);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
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
  scene.background = new Color(0x0b1226);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 0, 0);
  const homePos = () => TARGET.clone().add(V(1.6, 1.2, 12.6)).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.2 ? 1.08 : 1.0);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4.5; controls.maxDistance = 40;
  controls.minAzimuthAngle = -1.1; controls.maxAzimuthAngle = 1.1; controls.minPolarAngle = 0.5; controls.maxPolarAngle = 2.6;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.5));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(-5, 6, 8); scene.add(sun);

  // 後半個地球（外表）
  scene.add(new Mesh(new SphereGeometry(RS, 64, 40, Math.PI, Math.PI), new MeshStandardMaterial({ map: earthTex(), roughness: 0.85 })));
  // 切面：四層同心圓（由大到小疊上去）
  const disc = (r, color, z) => { const m = new Mesh(new CircleGeometry(r, 96), new MeshBasicMaterial({ color, side: DoubleSide })); m.position.z = z; scene.add(m); return m; };
  disc(RS, COLORS.crust, 0); disc(RS - CRUST_DRAW, COLORS.mantle, 0.004); disc(RC, COLORS.outer, 0.008); disc(RI, COLORS.inner, 0.012);
  // 地函由外往內加深一點（讓它看起來有厚度）
  const shade = new Mesh(new RingGeometry(RC, RC + 0.55, 96), new MeshBasicMaterial({ color: 0xb23a1a, transparent: true, opacity: 0.45 })); shade.position.z = 0.006;
  // 目前這一層的外框
  const hi = new Mesh(new RingGeometry(0.97, 1, 128), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })); hi.position.z = 0.02; scene.add(hi);

  // 視角一：一路往下的探針
  const layersG = new Group(); scene.add(layersG);
  const shaft = new Line(new BufferGeometry().setFromPoints([V(0, RS, 0.03), V(0, 0, 0.03)]), new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })); layersG.add(shaft);
  const probe = new Mesh(new SphereGeometry(0.085, 20, 14), new MeshBasicMaterial({ color: 0xffffff })); layersG.add(probe);
  const probeRing = new Mesh(new RingGeometry(0.12, 0.16, 32), new MeshBasicMaterial({ color: 0x0b1226 })); probe.add(probeRing); probeRing.position.z = 0.01;

  // 視角二：地震波（切面上的線）
  const wavesG = new Group(); scene.add(wavesG);
  const paths = [];                                             // { pts, color }：也給移動的小點用
  const bez = (deg, side, stopAtCore) => {
    const a = pt(0), b = pt(deg, RS, side), m = a.clone().add(b).multiplyScalar(0.5), c = m.multiplyScalar(0.75), out = [];
    for (let i = 0; i <= 40; i++) { const t = i / 40, p = a.clone().multiplyScalar((1 - t) * (1 - t)).add(c.clone().multiplyScalar(2 * t * (1 - t))).add(b.clone().multiplyScalar(t * t)); if (stopAtCore && p.length() < RC) break; out.push(p); }
    return out;
  };
  const addPath = (pts, color, dz) => { pts.forEach((p) => { p.z = dz; }); wavesG.add(new Line(new BufferGeometry().setFromPoints(pts), new LineBasicMaterial({ color }))); paths.push({ pts, color }); };
  const YEL = 0xffe27a, RED = 0xff5a46;
  for (const side of [-1, 1]) {
    for (const deg of [25, 50, 75, 100]) { addPath(bez(deg, side), YEL, 0.03); addPath(bez(deg - 4, side), RED, 0.034); }
    for (const deg of [128, 160]) { const p = bez(deg, side, true); addPath(p, RED, 0.034); const x = new Mesh(new SphereGeometry(0.06, 12, 8), new MeshBasicMaterial({ color: RED })); x.position.copy(p[p.length - 1]); wavesG.add(x); }
    for (const deg of [150, 165]) { const d = 180 - deg; addPath([pt(0), pt(d * 1.2, RC, side), pt(180 - d * 0.6, RC, side), pt(deg, RS, side)], YEL, 0.03); }
  }
  addPath([pt(0), pt(0, RC), pt(180, RC), pt(180)], YEL, 0.03);
  // 地表外圍的三段色帶：收得到 P 和 S／陰影帶／只收得到 P
  const band = (a0, a1, color) => { for (const side of [-1, 1]) { const start = side > 0 ? Math.PI / 2 - (a1 * Math.PI) / 180 : Math.PI / 2 + (a0 * Math.PI) / 180; const m = new Mesh(new RingGeometry(RS + 0.06, RS + 0.2, 64, 1, start, ((a1 - a0) * Math.PI) / 180), new MeshBasicMaterial({ color, side: DoubleSide })); m.position.z = 0.02; wavesG.add(m); } };
  band(0, SHADOW[0], 0x7cf29a); band(SHADOW[0], SHADOW[1], 0x5a6478); band(SHADOW[1], 180, YEL);
  const quake = new Mesh(new SphereGeometry(0.12, 20, 14), new MeshBasicMaterial({ color: RED })); quake.position.copy(pt(0)).setZ(0.05); wavesG.add(quake);
  const dots = new InstancedMesh(new SphereGeometry(0.05, 10, 8), new MeshBasicMaterial({ color: 0xffffff }), paths.length * 2);
  dots.frustumCulled = false; wavesG.add(dots);
  paths.forEach((p) => { p.len = [0]; for (let i = 1; i < p.pts.length; i++) p.len.push(p.len[i - 1] + p.pts[i].distanceTo(p.pts[i - 1])); });
  const along = (p, u, out) => { const d = u * p.len[p.len.length - 1]; let i = 1; while (i < p.len.length - 1 && p.len[i] < d) i++; return out.copy(p.pts[i - 1]).lerp(p.pts[i], (d - p.len[i - 1]) / Math.max(1e-6, p.len[i] - p.len[i - 1])); };

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mk = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    crust: mk('ew-in-lb', 'Crust', '地殼'), mantle: mk('ew-in-lb', 'Mantle', '地函'), outer: mk('ew-in-lb', 'Outer core: liquid', '外核：液態'), inner: mk('ew-in-lb', 'Inner core: solid', '內核：固態'),
    here: lab.add('cp-lb ew-in-lb-here', ''),
    q: mk('ew-lb-fault slip', 'Earthquake', '地震'), both: mk('ew-in-lb-ok', 'P and S waves arrive', 'P 波、S 波都收得到'),
    shadow: mk('ew-in-lb-sh', 'Shadow zone: no direct P waves', '陰影帶：收不到直接的 P 波'), ponly: mk('ew-lb-p', 'Only P waves, bent by the core', '只有 P 波，被地核折彎了'),
    stop: mk('ew-lb-s', 'S waves stop at the liquid', 'S 波遇到液體就停了'),
  };

  const R_ = {
    views: [...root.querySelectorAll('.cp-view button')], lbox: $('.ew-in-lbox'), wbox: $('.ew-in-wbox'),
    depth: $('.ew-in-depth'), stops: [...root.querySelectorAll('.ew-in-stops button')],
    d: $('.ew-in-d'), layer: $('.ew-in-layer'), pct: $('.ew-in-pct'), vol: $('.ew-in-vol'), msgs: [...root.querySelectorAll('.ew-in-msg')], play: $('.al-play'),
  };
  const NAMES = { crust: ['Crust', '地殼'], mantle: ['Mantle', '地函'], outer: ['Outer core', '外核'], inner: ['Inner core', '內核'] };
  const state = { view: 'layers', u: uOf(10), labels: true, playing: false, clock: 0 };
  const depth = () => depthOf(state.u);
  // 畫的時候地殼被畫厚了：0–17 公里對到 0–CRUST_DRAW，其餘照比例
  const drawR = (d) => (d <= 17 ? RS - (d / 17) * CRUST_DRAW : (RS - CRUST_DRAW) * ((R - d) / (R - 17)));

  const m4 = new Matrix4(), tmp = V(0, 0, 0), col = new Color();
  function draw() {
    const layers = state.view === 'layers', d = depth(), l = layerAt(d);
    layersG.visible = layers; wavesG.visible = !layers; hi.visible = layers;
    probe.position.set(0, drawR(d), 0.05);
    const ro = drawR(l.top), s = l.key === 'inner' ? RI : ro;
    hi.scale.setScalar(Math.max(0.05, s));
    paths.forEach((p, i) => {
      for (let k = 0; k < 2; k++) { along(p, ((state.clock * 0.22 + k * 0.5 + hash(i, 7) * 0.2) % 1 + 1) % 1, tmp); m4.makeTranslation(tmp.x, tmp.y, tmp.z + 0.01); dots.setMatrixAt(i * 2 + k, m4); dots.setColorAt(i * 2 + k, col.set(p.color)); }
    });
    dots.instanceMatrix.needsUpdate = true; if (dots.instanceColor) dots.instanceColor.needsUpdate = true;
    quake.scale.setScalar(1 + 0.25 * Math.sin(state.clock * 6));
  }

  let narrow = false;
  const fmtKm = (d) => (d < 100 ? d.toFixed(d < 20 ? 1 : 0) : Math.round(d).toLocaleString('en-US'));
  function updateLabels() {
    const on = state.labels, layers = state.view === 'layers';
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const side = narrow ? -0.62 : -0.72;
    show(L.crust, on && layers, V(side * RS, Math.sqrt(1 - side * side) * RS, 0.05), -14);
    show(L.mantle, on && layers, V(-1.75, 1.35, 0.05), 0);
    show(L.outer, on && layers, narrow ? V(-0.1, -1.12, 0.05) : V(-0.95, -0.55, 0.05), 0);
    show(L.inner, on && layers, V(0, -0.1, 0.05), 0);
    L.here.innerHTML = `${fmtKm(depth())} km down<small>深度 ${fmtKm(depth())} 公里</small>`;
    show(L.here, layers, V(0, drawR(depth()), 0.05), 0); L.here.style.marginLeft = narrow ? '78px' : '96px';
    show(L.q, !layers && !narrow, pt(0), -22);
    show(L.both, on && !layers && !narrow, pt(62, RS + 0.25, 1), 0); L.both.style.marginLeft = '86px';
    show(L.shadow, on && !layers, pt(123, RS + 0.25, -1), 0); L.shadow.style.marginLeft = narrow ? '70px' : '-124px';
    show(L.ponly, on && !layers, pt(180, RS + 0.2), 20);
    show(L.stop, on && !layers, pt(40, RC, -1), -16);
  }

  function readout() {
    const layers = state.view === 'layers', d = depth(), l = layerAt(d);
    R_.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    R_.lbox.hidden = !layers; R_.wbox.hidden = layers;
    R_.depth.value = String(Math.round(state.u)); R_.depth.style.setProperty('--p', `${(state.u / U_MAX) * 100}%`);
    R_.stops.forEach((b) => b.setAttribute('aria-pressed', b.dataset.layer === l.key ? 'true' : 'false'));
    R_.d.innerHTML = `${fmtKm(d)} km<small>below the surface · 離地表</small>`;
    R_.layer.innerHTML = `${NAMES[l.key][0]}<small>${NAMES[l.key][1]}</small>`;
    const pc = pctToCenter(d);
    R_.pct.innerHTML = `${pc < 1 ? pc.toFixed(2) : pc.toFixed(pc < 10 ? 1 : 0)}%<small>of the way to the center · 到地心的路程</small>`;
    const vf = volFrac(l.key) * 100;
    R_.vol.innerHTML = `${vf < 1 ? vf.toFixed(1) : Math.round(vf)}%<small>of the Earth's volume · 占地球的體積</small>`;
    R_.msgs.forEach((m) => { m.hidden = m.dataset.msg !== l.key; });
  }

  function setView(v) { if (v === 'layers' || v === 'waves') state.view = v; readout(); }
  function setDepth(d) { state.u = uOf(Math.min(R, Math.max(0, d))); readout(); }
  function setPlaying(v) {
    if (v && state.view === 'layers' && state.u >= U_MAX - 1) state.u = 0;
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R_.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R_.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : state.view === 'layers' ? 'Go down · 往下走' : 'Play · 播放';
  }
  R_.views.forEach((b) => b.addEventListener('click', () => { setView(b.dataset.view); setPlaying(b.dataset.view === 'waves'); }));
  R_.depth.addEventListener('input', () => { state.u = +R_.depth.value; setPlaying(false); readout(); });
  R_.stops.forEach((b) => b.addEventListener('click', () => { setPlaying(false); setDepth(+b.dataset.km); }));
  R_.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) {
    if (state.playing) {
      state.clock += dt;
      if (state.view === 'layers') { state.u = Math.min(U_MAX, state.u + dt * (U_MAX / 26)); if (state.u >= U_MAX) setPlaying(false); }
    }
    draw();
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (state.playing && t - lastR > 100) { lastR = t; readout(); }
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
    TARGET.y = narrow ? 0.55 : 0;                    // 窄螢幕：把地球往下挪，讓出上面的視角按鈕
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  controls.target.copy(TARGET);
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  step(0); readout(); setPlaying(false);
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    crust: () => { setView('layers'); setPlaying(false); setDepth(KOLA_KM); }, mantle: () => { setView('layers'); setPlaying(false); setDepth(1500); },
    core: () => { setView('layers'); setPlaying(false); setDepth(4000); }, waves: () => { setView('waves'); setPlaying(true); },
  };
  root.__lab = {
    camera, controls, state, setView, setDepth, setPlaying, depth,
    render: () => { step(0.4); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：一路往下，要走多久？（不需要 WebGL） ----------------
function initDig() {
  const el = document.querySelector('[data-earth-dig]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const btns = [...el.querySelectorAll('.ew-dg-rides button')], n = $('.ew-dg-n'), unit = $('.ew-dg-u'), en = $('.ew-dg-en'), zh = $('.ew-dg-zh'), rows = [...el.querySelectorAll('.ew-dg-row')];
  const fmt = (h) => (h < 1 ? [String(Math.round(h * 60)), Math.round(h * 60) === 1 ? 'minute' : 'minutes', '分鐘'] : h < 48 ? [h.toFixed(h < 10 ? 1 : 0), 'hours', '小時'] : [(h / 24).toFixed(h / 24 < 10 ? 1 : 0), 'days', '天']);
  function show(kmh) {
    btns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.kmh === kmh ? 'true' : 'false'));
    const t = travel(kmh), tot = totalHours(kmh), f = fmt(tot);
    n.textContent = f[0]; unit.textContent = `${f[1]} · ${f[2]}`;
    t.forEach((x, i) => { const g = fmt(x.hours); rows[i].querySelector('b').textContent = `${g[0]} ${g[1]}`; rows[i].querySelector('small').textContent = `${g[0]} ${g[2]}`; rows[i].querySelector('i').style.width = `${Math.max(0.6, (x.hours / tot) * 100)}%`; });
    const c = fmt(t[0].hours);
    en.textContent = `You would be through the crust in ${c[0]} ${c[1]}. Almost the whole trip is mantle and core.`;
    zh.textContent = `只要 ${c[0]} ${c[2]}就穿過地殼了。幾乎整趟路都在地函和地核裡。`;
    el.dataset.total = String(tot);
  }
  btns.forEach((b) => b.addEventListener('click', () => show(+b.dataset.kmh)));
  show(+btns[1].dataset.kmh);
  el.__dig = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDig);
else initDig();

lazyBoot('[data-earthinside-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
