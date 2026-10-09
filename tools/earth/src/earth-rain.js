/*
 * 地球與天氣 · 第六課「為什麼會下雨？」的 3D 模型（全部自繪示意；山畫得比實際陡）。
 *
 * 一個機制：海上的水被曬成看不見的水氣，風把潮溼的空氣吹向山；空氣被山擋住只好往上爬，越高越冷，
 *   冷到露點水氣就凝結成小水滴——那就是雲底。水滴越聚越大，掉下來變成雨（迎風面）。
 *   翻過山的空氣已經變乾，往下沉又被壓縮增溫，背風面又乾又熱（焚風）。
 *
 * 場景：一座島的剖面——兩邊是海、中間一座山（像台灣）。可以改風從哪一邊來、山多高、海邊的氣溫、空氣有多潮溼。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-rain.js
 * 除錯：document.querySelector('[data-earthrain-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Shape, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { dewPoint, cloudBase, tempAt, leeTemp, MOUNTAIN_KM, rains, liters, rainClass } from './raincalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.85, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const XL = -7, XR = 7, ZD = 3.2, COAST = -4.2, COAST2 = 4.2, PEAK = 0;         // 1 個單位＝1 公里高（水平方向不是照比例）
const HILLS = { low: 0.6, high: MOUNTAIN_KM };                  // 山的高度（公里）：矮丘／高山
let HK = MOUNTAIN_KM;
const hill = (x) => (x < COAST || x > COAST2 ? 0 : 0.06 + (HK - 0.06) * Math.exp(-(((x - PEAK) / 1.75) ** 2)));
const N_AIR = 110, N_PUFF = 90, N_RAIN = 120, N_VAP = 30;

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
  scene.background = new Color(0x16305c);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 1.7, 0);
  const homePos = () => TARGET.clone().add(V(0, 1.6, 17.5).multiplyScalar(camera.aspect < 0.85 ? 1.9 : camera.aspect < 1.2 ? 1.2 : 1.04));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 55;
  controls.minPolarAngle = 0.7; controls.maxPolarAngle = Math.PI * 0.52;
  controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 0.6;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.5));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(-4, 9, 8); scene.add(sun);

  // 海、地（山的剖面往後拉出厚度）
  scene.add(at(new Mesh(new BoxGeometry(XR - XL, 0.5, ZD), std(0x3a2f28)), 0, -0.65, 0));
  scene.add(at(new Mesh(new BoxGeometry(XR - XL, 0.4, ZD - 0.02), std(0x2a6fc9, { roughness: 0.35 })), 0, -0.2, 0));
  const lands = {};
  for (const k of Object.keys(HILLS)) {
    HK = HILLS[k];
    const sh = new Shape(); sh.moveTo(COAST, -0.4);
    for (let i = 0; i <= 80; i++) { const x = COAST + (i / 80) * (COAST2 - COAST); sh.lineTo(x, hill(x)); }
    sh.lineTo(COAST2, -0.4); sh.lineTo(COAST, -0.4);
    lands[k] = at(new Mesh(new ExtrudeGeometry(sh, { depth: ZD, bevelEnabled: false }), std(0x4f8a55)), 0, 0, -ZD / 2); scene.add(lands[k]);
  }
  // 太陽（裝飾）
  scene.add(at(new Mesh(new SphereGeometry(0.42, 24, 16), new MeshBasicMaterial({ color: 0xffe27a })), XL + 1.3, 4.9, -1));
  // 風向箭頭
  const arrow = new Group(); scene.add(arrow);
  const arMat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
  arrow.add(at(new Mesh(new BoxGeometry(1.3, 0.12, 0.12), arMat), 0, 0, 0));
  const head = new Mesh(new ConeGeometry(0.2, 0.42, 12), arMat); head.rotation.z = -Math.PI / 2; arrow.add(at(head, 0.85, 0, 0));
  // 空氣（跟著風走的小點）、海面升起的水氣、雲、雨
  const mk = (n, geo, mat) => { const m = new InstancedMesh(geo, mat, n); m.frustumCulled = false; scene.add(m); return m; };
  const air = mk(N_AIR, new SphereGeometry(0.055, 8, 6), new MeshBasicMaterial({ color: 0xffffff }));
  const vap = mk(N_VAP, new SphereGeometry(0.035, 6, 5), new MeshBasicMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.7 }));
  const puff = mk(N_PUFF, new SphereGeometry(0.34, 12, 10), new MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.92 }));
  const rain = mk(N_RAIN, new BoxGeometry(0.018, 0.2, 0.018), new MeshBasicMaterial({ color: 0x9fd0ff }));

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mkL = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    base: lab.add('cp-lb ew-rn-lb-base', ''), coast: lab.add('cp-lb ew-rn-lb-t', ''), top: lab.add('cp-lb ew-rn-lb-t', ''), lee: lab.add('cp-lb ew-rn-lb-t', ''),
    up: mkL('', 'Air climbs and cools', '空氣往上爬、變冷'), rain: mkL('ew-rn-lb-rain', 'Rain on the windward side', '迎風面下雨'), down: mkL('ew-lb-push', 'Dry air sinks and warms', '乾空氣下沉、變熱'),
    sea: mkL('', 'Water evaporates', '水蒸發成水氣'),
  };

  const R = {
    winds: [...root.querySelectorAll('.ew-rn-wind button')], hills: [...root.querySelectorAll('.ew-rn-hill button')], temp: $('.ew-rn-temp'), hum: $('.ew-rn-hum'), tempOut: $('.ew-rn-temp-out'), humOut: $('.ew-rn-hum-out'),
    dew: $('.ew-rn-dew'), base: $('.ew-rn-base'), top: $('.ew-rn-top'), lee: $('.ew-rn-lee'), msgs: [...root.querySelectorAll('.ew-rn-msg')], play: $('.al-play'),
  };
  const state = { wind: 'west', hill: 'high', T: 28, rh: 80, labels: true, playing: true, clock: 0 };
  const rh = () => state.rh;
  const baseKm = () => cloudBase(state.T, rh()) / 1000;
  const wet = () => rains(state.T, rh(), HK);

  const m4 = new Matrix4(), col = new Color(), MOIST = new Color(0x9fd8ff), WHITE = new Color(0xffffff), DRY = new Color(0xffb36b);
  function draw() {
    HK = HILLS[state.hill]; for (const k of Object.keys(lands)) lands[k].visible = k === state.hill;
    const fromSea = state.wind === 'west', b = baseKm(), raining = wet(), dir = fromSea ? 1 : -1, strength = raining ? Math.min(1, (HK - b) / 2 + 0.25) : 0;
    arrow.position.set(dir * -4.4, 4.2, 0); arrow.rotation.z = fromSea ? 0 : Math.PI;
    // 空氣：沿著被山抬高的流線走
    for (let i = 0; i < N_AIR; i++) {
      const u = ((state.clock * 0.11 + hash(i, 1)) % 1 + 1) % 1, x = fromSea ? XL + u * (XR - XL) : XR - u * (XR - XL), y0 = 0.15 + hash(i, 2) * 2.6;
      const y = y0 + hill(x) * Math.exp(-y0 / 3), past = fromSea ? x > PEAK : x < PEAK;
      if (y > b && !past && raining) col.copy(WHITE); else if (past && raining) col.copy(DRY); else col.copy(MOIST);
      m4.makeTranslation(x, y, (hash(i, 3) - 0.5) * (ZD - 0.5)); air.setMatrixAt(i, m4); air.setColorAt(i, col);
    }
    air.instanceMatrix.needsUpdate = true; air.instanceColor.needsUpdate = true;
    // 海面升起的水氣
    for (let i = 0; i < N_VAP; i++) { const u = ((state.clock * 0.3 + hash(i, 4)) % 1 + 1) % 1, s = 1 - u; m4.makeScale(s, s, s).setPosition((fromSea ? -1 : 1) * (-XL - 0.4 - hash(i, 5) * (COAST - XL - 0.6)), u * 1.3, (hash(i, 6) - 0.5) * (ZD - 0.6)); vap.setMatrixAt(i, m4); }
    vap.instanceMatrix.needsUpdate = true;
    // 雲：迎風坡上，雲底以上
    const side = fromSea ? 1 : -1;
    for (let i = 0; i < N_PUFF; i++) {
      const x = PEAK - side * (hash(i, 7) * 4.4 - 0.5), y = b + hash(i, 8) * 1.7;
      const on = raining && hill(x) + 0.55 >= b && y <= Math.max(b + 0.5, hill(x) + 1.5) ? 1 : 0, s = on * (0.6 + hash(i, 9) * 0.7) * (0.92 + 0.08 * Math.sin(state.clock * 1.5 + i));
      m4.makeScale(s, s * 0.72, s).setPosition(x + Math.sin(state.clock * 0.4 + i) * 0.06, y, (hash(i, 10) - 0.5) * (ZD - 0.9)); puff.setMatrixAt(i, m4);
    }
    puff.instanceMatrix.needsUpdate = true;
    // 雨：雲底到地面
    const nr = Math.round(N_RAIN * strength);
    for (let i = 0; i < N_RAIN; i++) {
      const x = PEAK - side * (0.1 + hash(i, 11) * 3.4), ground = hill(x), on = i < nr && raining && hill(x) + 0.55 >= b && state.playing ? 1 : 0;
      const u = ((state.clock * (1.3 + hash(i, 12) * 0.6) + hash(i, 13)) % 1 + 1) % 1;
      m4.makeScale(on, on, on).setPosition(x, Math.max(ground, b) - u * Math.max(0, b - ground) + (b > ground ? 0 : 0.5 * (1 - u)), (hash(i, 14) - 0.5) * (ZD - 0.9)); rain.setMatrixAt(i, m4);
    }
    rain.instanceMatrix.needsUpdate = true;
  }

  let narrow = false;
  const f0 = (x) => `${Math.round(x)}`;
  function updateLabels() {
    const on = state.labels, fromSea = state.wind === 'west', b = baseKm(), raining = wet(), side = fromSea ? 1 : -1;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const T0 = state.T, lee = raining ? leeTemp(T0, HK) : T0;
    L.base.innerHTML = `Cloud base: ${Math.round((b * 1000) / 10) * 10} m<small>雲底：${Math.round((b * 1000) / 10) * 10} 公尺</small>`;
    show(L.base, raining, V(PEAK - side * (narrow ? 3.2 : 4.6), b, ZD / 2), narrow ? -20 : 0);
    L.coast.innerHTML = `${f0(T0)}°C`; L.top.innerHTML = `${f0(tempAt(T0, HK))}°C`; L.lee.innerHTML = `${f0(lee)}°C`;
    show(L.coast, true, V(PEAK - side * 3.8, 0.1, ZD / 2), 18);
    show(L.top, true, V(PEAK, HK, ZD / 2), -18);
    show(L.lee, true, V(PEAK + side * 3.8, 0.1, ZD / 2), 18);
    show(L.up, on && !narrow, V(PEAK - side * 2.3, 1.0, ZD / 2), 0);
    show(L.rain, on && raining && !narrow, V(PEAK - side * 1.5, hill(PEAK - side * 1.5) * 0.5, ZD / 2), 0);
    show(L.down, on && raining && !narrow, V(PEAK + side * 2.6, 1.5, ZD / 2), 0);
    show(L.sea, on && !narrow, V(side * (XL + 1.4), -0.1, ZD / 2), 34);
  }

  function readout() {
    const T0 = state.T, raining = wet(), b = baseKm() * 1000;
    R.winds.forEach((x) => x.setAttribute('aria-pressed', x.dataset.wind === state.wind ? 'true' : 'false'));
    R.hills.forEach((x) => x.setAttribute('aria-pressed', x.dataset.hill === state.hill ? 'true' : 'false'));
    R.tempOut.textContent = `${T0}°C`; R.humOut.textContent = `${state.rh}%`;
    R.temp.style.setProperty('--p', `${((T0 - 15) / 19) * 100}%`); R.hum.style.setProperty('--p', `${((state.rh - 50) / 50) * 100}%`);
    R.dew.innerHTML = `${f0(dewPoint(T0, rh()))}°C<small>the air turns to cloud here · 降到這裡就成雲</small>`;
    R.base.innerHTML = raining ? `${(Math.round(b / 10) * 10).toLocaleString('en-US')} m<small>where the cloud begins · 雲從這裡開始</small>` : `${(Math.round(b / 10) * 10).toLocaleString('en-US')} m<small>higher than this hill · 比這座山還高</small>`;
    R.top.innerHTML = `${f0(tempAt(T0, HK))}°C<small>at ${HK} km · 在 ${HK} 公里高</small>`;
    R.lee.innerHTML = `${f0(raining ? leeTemp(T0, HK) : T0)}°C<small>${raining ? 'warmer than the windward side · 比迎風面熱' : 'no change · 沒有變化'}</small>`;
    const key = !raining ? 'dry' : state.rh >= 90 ? 'heavy' : state.wind === 'east' ? 'east' : 'rain';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.wind === 'west' || o.wind === 'east') state.wind = o.wind;
    if (o.hill in HILLS) { state.hill = o.hill; HK = HILLS[o.hill]; }
    if (o.T != null) { state.T = Math.min(34, Math.max(15, Math.round(o.T))); R.temp.value = String(state.T); }
    if (o.rh != null) { state.rh = Math.min(100, Math.max(50, Math.round(o.rh / 5) * 5)); R.hum.value = String(state.rh); }
    readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.winds.forEach((b) => b.addEventListener('click', () => set({ wind: b.dataset.wind })));
  R.hills.forEach((b) => b.addEventListener('click', () => set({ hill: b.dataset.hill })));
  R.temp.addEventListener('input', () => set({ T: +R.temp.value }));
  R.hum.addEventListener('input', () => set({ rh: +R.hum.value }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) state.clock += dt;
    draw();
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

  HK = HILLS[state.hill]; draw(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = { moist: () => set({ wind: 'west', hill: 'high', T: 28, rh: 80 }), soaked: () => set({ wind: 'west', hill: 'high', T: 28, rh: 95 }), dry: () => set({ wind: 'west', hill: 'low', T: 28, rh: 60 }), east: () => set({ wind: 'east', hill: 'high', T: 28, rh: 80 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying, baseKm, wet,
    render: () => { state.clock += 0.7; draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) { DEMO[v](); setPlaying(true); } } };
}

// ---------------- 頁面下方：這場雨有多少水？（不需要 WebGL） ----------------
function initGauge() {
  const el = document.querySelector('[data-earth-gauge]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const classes = JSON.parse(el.dataset.classes), mm = $('.ew-gg-mm'), out = $('.ew-gg-mm-out'), n = $('.ew-gg-n'), bottles = $('.ew-gg-b'), cls = $('.ew-gg-cls'), clsZh = $('.ew-gg-cls-zh'), fill = $('.ew-gg-fill');
  const areas = [...el.querySelectorAll('.ew-gg-areas button')]; let area = +areas[1].dataset.m2;
  function show() {
    const v = +mm.value, L = liters(v, area), c = classes[rainClass(v)];
    out.textContent = `${v} mm`;
    mm.style.setProperty('--p', `${(v / 600) * 100}%`);
    areas.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.m2 === area ? 'true' : 'false'));
    n.textContent = Math.round(L).toLocaleString('en-US');
    bottles.textContent = Math.round(L / 1.5).toLocaleString('en-US');
    cls.textContent = c.en; clsZh.textContent = c.zh;
    fill.style.height = `${Math.min(100, (v / 600) * 100)}%`;
    el.dataset.liters = String(L); el.dataset.cls = rainClass(v);
  }
  mm.addEventListener('input', show);
  areas.forEach((b) => b.addEventListener('click', () => { area = +b.dataset.m2; show(); }));
  el.querySelectorAll('.ew-gg-pre button').forEach((b) => b.addEventListener('click', () => { mm.value = b.dataset.mm; show(); }));
  show();
  el.__gauge = { show, set: (v, a) => { mm.value = String(v); if (a) area = a; show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGauge);
else initGauge();

lazyBoot('[data-earthrain-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
