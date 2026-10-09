/*
 * 地球與天氣 · 第七課「風是怎麼來的？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：太陽把陸地和海曬得不一樣熱（陸地熱得快、涼得也快）。熱的那邊空氣上升，
 *   冷的那邊的空氣貼著地面補過來——這股補過來的空氣就是風。
 *   一天之內：白天陸地熱 → 海風；晚上陸地冷 → 陸風。
 *   一年之內：夏天大陸熱 → 風從海洋吹向大陸；冬天大陸冷 → 風從大陸吹向海洋（季風）。
 *
 * 場景：海岸的剖面（左邊海、右邊陸地），一圈循環的空氣小點。兩個視角：一天（時間滑桿）／一年（月份滑桿）。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-wind.js
 * 除錯：document.querySelector('[data-earthwind-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Group, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { beaufortSpeed, kmh, breeze } from './windcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.8, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const XL = -6.5, XR = 6.5, ZD = 3.4, N_AIR = 120;
// 循環的一圈（順時針：貼著地面往右＝往陸地吹）
const LOOP = [[-4.4, 0.35], [4.4, 0.35], [4.4, 2.9], [-4.4, 2.9]];
const LOOP_LEN = (8.8 + 2.55) * 2;
function onLoop(u, out) {
  let d = ((u % 1) + 1) % 1 * LOOP_LEN;
  for (let i = 0; i < 4; i++) { const a = LOOP[i], b = LOOP[(i + 1) % 4], l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (d <= l) { const t = d / l; return out.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, 0); } d -= l; }
  return out.set(LOOP[0][0], LOOP[0][1], 0);
}
const FORCE = ['Calm', 'Light air', 'Light breeze', 'Gentle breeze', 'Moderate breeze', 'Fresh breeze', 'Strong breeze'];
const FORCE_ZH = ['無風', '軟風', '輕風', '微風', '和風', '清風', '強風'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
  const SKY_DAY = new Color(0x3f86d8), SKY_NIGHT = new Color(0x0a1230), sky = new Color();
  scene.background = sky;
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 1.7, 0);
  const homePos = () => TARGET.clone().add(V(0, 1.4, 16.5).multiplyScalar(camera.aspect < 0.85 ? 1.9 : camera.aspect < 1.2 ? 1.25 : 1.04));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 55;
  controls.minPolarAngle = 0.7; controls.maxPolarAngle = Math.PI * 0.52;
  controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 0.6;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xeaf2ff, 0x2a3040, 1.1); scene.add(hemi);
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sunL = new DirectionalLight(0xffffff, 0.9); sunL.position.set(-2, 9, 8); scene.add(sunL);

  // 海、陸地（顏色跟著溫度變）
  scene.add(at(new Mesh(new BoxGeometry(XR - XL, 0.5, ZD), std(0x3a2f28)), 0, -0.65, 0));
  const seaMat = std(0x2a6fc9, { roughness: 0.35 }), landMat = std(0x4f8a55);
  scene.add(at(new Mesh(new BoxGeometry(-XL, 0.4, ZD), seaMat), XL / 2, -0.2, 0));
  scene.add(at(new Mesh(new BoxGeometry(XR, 0.55, ZD), landMat), XR / 2, -0.125, 0));
  for (let i = 0; i < 6; i++) { const g = new Group(); g.add(at(new Mesh(new BoxGeometry(0.08, 0.3, 0.08), std(0x6b4a2a)), 0, 0.15, 0)); g.add(at(new Mesh(new ConeGeometry(0.22, 0.55, 8), std(0x2f7d3f)), 0, 0.55, 0)); at(g, 1 + i * 0.95, 0.15, (i % 3 - 1) * 1.1); scene.add(g); }
  // 太陽／月亮
  const sun = new Mesh(new SphereGeometry(0.4, 24, 16), new MeshBasicMaterial({ color: 0xffe27a })); scene.add(sun);
  const moon = new Mesh(new SphereGeometry(0.3, 24, 16), new MeshBasicMaterial({ color: 0xdfe6f5 })); scene.add(moon);
  // 貼著地面的大箭頭（風）
  const arrow = new Group(); scene.add(arrow);
  const arMat = new MeshBasicMaterial({ color: 0xffffff });
  const shaft = new Mesh(new BoxGeometry(1, 0.16, 0.16), arMat); arrow.add(shaft);
  const head = new Mesh(new ConeGeometry(0.28, 0.55, 12), arMat); head.rotation.z = -Math.PI / 2; arrow.add(head);
  const air = new InstancedMesh(new SphereGeometry(0.06, 8, 6), new MeshBasicMaterial({ color: 0xffffff }), N_AIR); air.frustumCulled = false; scene.add(air);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    sea: lab.add('cp-lb ew-wd-lb-t', ''), land: lab.add('cp-lb ew-wd-lb-t', ''), wind: lab.add('cp-lb ew-lb-push', ''),
    up: lab.add('cp-lb', 'Warm air rises<small>暖空氣上升</small>'), down: lab.add('cp-lb', 'Cool air sinks<small>冷空氣下沉</small>'),
  };

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], slider: $('.ew-wd-x'), xOut: $('.ew-wd-x-out'), xLab: $('.ew-wd-x-lab'),
    land: $('.ew-wd-land'), sea: $('.ew-wd-sea'), wind: $('.ew-wd-wind'), speed: $('.ew-wd-speed'), msgs: [...root.querySelectorAll('.ew-wd-msg')], play: $('.al-play'),
  };
  // mode 'day'：x＝幾點（0–24）；'year'：x＝幾月（1–12.99）
  const state = { mode: 'day', hour: 15, month: 1, labels: true, playing: true, clock: 0, phase: 0 };
  const x = () => (state.mode === 'day' ? state.hour : state.month);
  const cur = () => breeze(state.mode, x());

  const m4 = new Matrix4(), tmp = V(0, 0, 0), col = new Color(), COOL = new Color(0x7fc4ff), WARM = new Color(0xff8a4a);
  const tint = (base, T, lo, hi, k = 0.45) => col.set(base).lerp(T > (lo + hi) / 2 ? WARM : COOL, Math.min(k, Math.abs(T - (lo + hi) / 2) / (hi - lo) * 2 * k));
  function draw(dt) {
    const b = cur(), day = state.mode === 'day';
    // 天空、太陽、月亮
    const light = day ? Math.max(0, Math.sin(((state.hour - 6) / 12) * Math.PI)) : 1;
    sky.copy(SKY_NIGHT).lerp(SKY_DAY, light); hemi.intensity = 0.55 + 0.6 * light; sunL.intensity = 0.25 + 0.7 * light;
    const sa = ((state.hour - 6) / 12) * Math.PI;
    sun.visible = day ? state.hour > 5.5 && state.hour < 18.5 : true; moon.visible = day && !sun.visible;
    if (day) { sun.position.set(-Math.cos(sa) * 5.6, 0.4 + Math.sin(sa) * 4.6, -1.5); const ma = ((((state.hour + 12) % 24) - 6) / 12) * Math.PI; moon.position.set(-Math.cos(ma) * 5.6, 0.4 + Math.sin(ma) * 4.6, -1.5); }
    else sun.position.set(0, 3.6 + 1.2 * Math.cos(((state.month - 6.7) / 12) * 2 * Math.PI), -1.5);      // 夏天太陽高、冬天低
    seaMat.color.copy(tint(0x2a6fc9, b.sea, day ? 20 : 12, day ? 32 : 32)); landMat.color.copy(tint(0x4f8a55, b.land, day ? 20 : 2, day ? 32 : 34, 0.28));
    // 循環：onshore＝地面的風往陸地吹（順時針）
    const sgn = b.dir === 'onshore' ? 1 : b.dir === 'offshore' ? -1 : 0;
    state.phase += dt * sgn * (0.02 + b.force * 0.022);
    for (let i = 0; i < N_AIR; i++) {
      onLoop(state.phase + hash(i, 1), tmp); const inner = 0.75 * hash(i, 2);
      tmp.x *= 1 - inner * 0.35; tmp.y = 1.62 + (tmp.y - 1.62) * (1 - inner * 0.6);
      const warmSide = sgn >= 0 ? tmp.x > 0 : tmp.x < 0;
      col.copy(warmSide ? WARM : COOL).lerp(new Color(0xffffff), 0.35);
      const s = sgn === 0 ? 0.6 : 1;
      m4.makeScale(s, s, s).setPosition(tmp.x, tmp.y, (hash(i, 3) - 0.5) * (ZD - 0.6)); air.setMatrixAt(i, m4); air.setColorAt(i, col);
    }
    air.instanceMatrix.needsUpdate = true; air.instanceColor.needsUpdate = true;
    // 風的箭頭：長度跟風力走
    const len = 0.5 + b.force * 0.45;
    arrow.visible = sgn !== 0; arrow.position.set(0, 0.55, ZD / 2 + 0.1); arrow.rotation.z = sgn < 0 ? Math.PI : 0;
    shaft.scale.x = len; shaft.position.x = 0; head.position.x = len / 2 + 0.2;
    return b;
  }

  let narrow = false;
  function updateLabels(b) {
    const on = state.labels, day = state.mode === 'day', sgn = b.dir === 'onshore' ? 1 : b.dir === 'offshore' ? -1 : 0;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    L.sea.innerHTML = `${day ? 'Sea' : 'Ocean'} ${Math.round(b.sea)}°C<small>${day ? '海' : '海洋'}</small>`;
    L.land.innerHTML = `${day ? 'Land' : 'Continent'} ${Math.round(b.land)}°C<small>${day ? '陸地' : '大陸'}</small>`;
    show(L.sea, true, V(XL / 2, 0, ZD / 2), 22); show(L.land, true, V(XR / 2, 0.15, ZD / 2), 22);
    const name = sgn > 0 ? (day ? ['Sea breeze', '海風'] : ['Summer monsoon', '夏季季風']) : (day ? ['Land breeze', '陸風'] : ['Winter monsoon', '冬季季風']);
    L.wind.innerHTML = sgn === 0 ? '' : `${name[0]}: force ${b.force}<small>${name[1]}：${b.force} 級</small>`;
    show(L.wind, sgn !== 0, V(0, 0.55, ZD / 2 + 0.1), -40);
    show(L.up, on && sgn !== 0 && !narrow, V(sgn * 4.2, 1.7, ZD / 2), 0); L.up.style.marginLeft = `${sgn * 62}px`;
    show(L.down, on && sgn !== 0 && !narrow, V(-sgn * 4.2, 1.7, ZD / 2), 0); L.down.style.marginLeft = `${-sgn * 62}px`;
  }

  const hh = (h) => `${String(Math.floor(h) % 24).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;
  function readout(b) {
    const day = state.mode === 'day', sgn = b.dir === 'onshore' ? 1 : b.dir === 'offshore' ? -1 : 0, ms = beaufortSpeed(b.force);
    R.views.forEach((v) => v.setAttribute('aria-pressed', v.dataset.view === state.mode ? 'true' : 'false'));
    R.slider.min = day ? '0' : '1'; R.slider.max = day ? '23.5' : '12'; R.slider.step = day ? '0.5' : '1'; R.slider.value = String(day ? state.hour : Math.floor(state.month));
    R.slider.style.setProperty('--p', `${day ? (state.hour / 23.5) * 100 : ((Math.floor(state.month) - 1) / 11) * 100}%`);
    R.xLab.textContent = day ? 'Time of day · 幾點' : 'Month · 月份';
    R.xOut.textContent = day ? hh(state.hour) : `${MONTHS[Math.floor(state.month) - 1]} · ${Math.floor(state.month)} 月`;
    R.land.innerHTML = `${Math.round(b.land)}°C<small>${day ? 'land · 陸地' : 'continent · 大陸'}</small>`;
    R.sea.innerHTML = `${Math.round(b.sea)}°C<small>${day ? 'sea · 海' : 'ocean · 海洋'}</small>`;
    R.wind.innerHTML = sgn === 0 ? 'Calm<small>風停了</small>' : `${sgn > 0 ? 'From the sea' : 'From the land'}<small>${sgn > 0 ? '從海上吹來' : '從陸地吹來'}</small>`;
    R.speed.innerHTML = `Force ${b.force}<small>${FORCE[b.force]} · ${FORCE_ZH[b.force]}，約 ${Math.round(kmh(ms))} km/h</small>`;
    const key = !day ? 'monsoon' : b.dir;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.mode === 'day' || o.mode === 'year') state.mode = o.mode;
    if (o.hour != null) state.hour = ((o.hour % 24) + 24) % 24;
    if (o.month != null) state.month = Math.min(12.99, Math.max(1, o.month));
    readout(cur());
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ mode: b.dataset.view })));
  R.slider.addEventListener('input', () => { setPlaying(false); if (state.mode === 'day') set({ hour: +R.slider.value }); else set({ month: +R.slider.value }); });
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
    if (state.playing) { state.clock += dt; if (state.mode === 'day') state.hour = (state.hour + dt * 1.1) % 24; else { state.month += dt * 0.55; if (state.month >= 13) state.month -= 12; } }
    const b = draw(dt);
    controls.update();
    updateLabels(b);
    if (t - lastR > 120) { lastR = t; if (state.mode === 'day') state.hourShown = Math.round(state.hour * 2) / 2; readout(b); }
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

  readout(draw(0));
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o) => { setPlaying(false); set(o); };
  const DEMO = { afternoon: () => go({ mode: 'day', hour: 15 }), night: () => go({ mode: 'day', hour: 3 }), winter: () => go({ mode: 'year', month: 1 }), summer: () => go({ mode: 'year', month: 7 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying, cur,
    render: () => { const b = draw(0.8); controls.update(); updateLabels(b); readout(b); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：蒲福風級（不需要 WebGL） ----------------
function initBeaufort() {
  const el = document.querySelector('[data-earth-beaufort]');
  if (!el) return;
  const levels = JSON.parse(el.dataset.levels), q = (s) => el.querySelector(s), f = q('.ew-bf-f');
  function show() {
    const i = +f.value, lv = levels[i];
    f.style.setProperty('--p', `${(i / 12) * 100}%`);
    q('.ew-bf-n').textContent = String(i); q('.ew-bf-name').textContent = lv.en; q('.ew-bf-name-zh').textContent = lv.zh;
    q('.ew-bf-ms').textContent = lv.ms; q('.ew-bf-kmh').textContent = lv.kmh;
    q('.ew-bf-en').textContent = lv.see_en; q('.ew-bf-zh').textContent = lv.see_zh;
    q('.ew-bf-flag').style.setProperty('--a', `${Math.min(88, i * 9)}deg`); q('.ew-bf-flag').style.setProperty('--d', `${Math.max(0.12, 1.4 - i * 0.11)}s`);
    el.dataset.i = String(i);
  }
  f.addEventListener('input', show);
  show();
  el.__bf = { show, set: (i) => { f.value = String(i); show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBeaufort);
else initBeaufort();

lazyBoot('[data-earthwind-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
