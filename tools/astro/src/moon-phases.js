/*
 * 天文教育 · 第一課「月亮為什麼會有圓缺？」的 3D 模型。
 *
 * 兩個畫面同步：
 *   左 太空視角：太陽光從 +X 射來，地球在原點，月亮沿 +Y（北）逆時針繞行。
 *   右 從地球看：另一個小場景，用 Lommel–Seeliger 反射把月面畫成真實的樣子
 *       （滿月是一片平的亮盤，不是一顆漸層的球），暗面留一點地球照。
 *
 * 座標約定（改之前先讀這段）：
 *   月亮的「距角」a：0 = 朔（新月，月在日地之間），π = 望（滿月）。
 *   月心 = (D cos a, 0, -D sin a)，再依白道傾角繞 Z 軸傾斜——節點線放在上弦／下弦，
 *   所以朔望時月亮一定在黃道面上方或下方，模型裡永遠不會誤發生日食或月食，
 *   跟課文「多數月份月亮從地影上方或下方經過」一致。
 *   從北半球看，camera up = +Y，上弦時右半邊亮；南半球把 up 翻成 -Y。
 *
 * 產物：cd tools/astro && npm run build → assets/js/moon-phases.js
 */
import {
  AdditiveBlending, AmbientLight, ArrowHelper, BackSide, BufferGeometry, CanvasTexture, Color,
  ConeGeometry, DirectionalLight, Float32BufferAttribute, Group, LineBasicMaterial, LineLoop,
  MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, Points,
  PointsMaterial, Raycaster, Scene, ShaderMaterial, SphereGeometry, SRGBColorSpace, Sprite,
  SpriteMaterial, TorusGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
  DEG, PHASE_CENTERS, SYN, TAU, ZH_DAY, atmosphereMaterial, fmtClock, glowTexture,
  makeMoonTexture, phaseIndex, skyMoonMaterial, starField,
} from './common.js';
import { makeClouds, makeRealEarth } from './earthmap.js';

// 兩種比例。compact 是教科書式的「看得清楚」版；true 是真實比例
// （地球半徑 = 1；月球半徑 0.273；地月距離 60.3；白道傾角 5.1°；本影長約 217）。
const SCALES = {
  compact: { D: 6.5, rm: 0.5, incl: 13 * DEG, umbra: 22 },
  true:    { D: 60.3, rm: 0.273, incl: 5.1 * DEG, umbra: 217 },
};

// ---------------------------------------------------------------------------
// 今天的月亮：Meeus《Astronomical Algorithms》48.4 的低精度月相公式，誤差約一小時內，
// 對「今晚月亮長什麼樣子」綽綽有餘。回傳距角（度，0–360，0–180 為漸盈）。
function elongationAt(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545) / 36525;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  const s = (x) => Math.sin(x * DEG);
  const e = D + 6.289 * s(Mp) - 2.1 * s(M) + 1.274 * s(2 * D - Mp) + 0.658 * s(2 * D)
    + 0.214 * s(2 * Mp) + 0.11 * s(D);
  return ((e % 360) + 360) % 360;
}

// 往回找上一次朔的時刻（牛頓法三次就收斂），用來算真正的農曆日期：
// 農曆以東八區的日期為準，朔所在的那一天就是初一。
function lastNewMoon(now) {
  let t = now.getTime() - elongationAt(now) / 360 * SYN * 86400000;
  for (let k = 0; k < 4; k++) {
    let e = elongationAt(new Date(t));
    if (e > 180) e -= 360;
    t -= e / 12.19 * 86400000;
  }
  return new Date(t);
}
function taiwanDayNumber(d) { return Math.floor((d.getTime() + 8 * 3600000) / 86400000); }

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const phases = JSON.parse(root.getAttribute('data-phases') || '[]');
  const spaceWrap = $('.al-space');
  const spaceCv = $('.al-space-cv');
  const skyCv = $('.al-sky-cv');
  const labels = $('.al-labels');

  let renderer, skyRenderer;
  try {
    renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true });
    skyRenderer = new WebGLRenderer({ canvas: skyCv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  skyRenderer.setPixelRatio(dpr);

  const moonTex = makeMoonTexture();
  const earthTex = makeRealEarth(), cloudTex = makeClouds();

  // ---------------- 太空視角 ----------------
  const scene = new Scene();
  scene.background = new Color(0x050814);
  const camera = new PerspectiveCamera(40, 1.6, 0.05, 6000);
  const HOME = new Vector3(1.8, 9.2, 9.8);
  camera.position.copy(HOME);
  const controls = new OrbitControls(camera, spaceCv);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 60;
  controls.target.set(0, 0, 0);

  scene.add(starField(1800, 2500, 99, 1.6));
  scene.add(new AmbientLight(0xb8c6ff, 0.16));
  const sunLight = new DirectionalLight(0xfff4e0, 3.2);
  sunLight.position.set(1, 0, 0);
  scene.add(sunLight);

  const sun = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.24, 'rgba(255,190,80,.55)'], [0.5, 'rgba(255,150,40,.14)'], [1, 'rgba(255,120,20,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  scene.add(sun);

  const rays = new Group();
  for (const [y, z] of [[0, 0], [0.8, 1.3], [-0.8, 1.3], [0.8, -1.3], [-0.8, -1.3], [0, 2.6], [0, -2.6]]) {
    const ar = new ArrowHelper(new Vector3(-1, 0, 0), new Vector3(0, y, z), 1.8, 0xffcf6b, 0.3, 0.16);
    ar.line.material.transparent = true; ar.line.material.opacity = 0.55;
    ar.cone.material.transparent = true; ar.cone.material.opacity = 0.7;
    rays.add(ar);
  }
  scene.add(rays);

  const earth = new Mesh(new SphereGeometry(1, 64, 48), new MeshLambertMaterial({ map: earthTex }));
  // 地軸傾角與月相無關，這裡刻意不畫，免得學生以為兩者有關。
  scene.add(earth);
  const clouds = new Mesh(new SphereGeometry(1.012, 48, 32), new MeshLambertMaterial({ map: cloudTex, transparent: true, depthWrite: false }));
  scene.add(clouds);
  const atmo = new Mesh(new SphereGeometry(1.1, 48, 32), atmosphereMaterial());
  scene.add(atmo);

  const shadow = new Mesh(new ConeGeometry(1, 1, 48, 1, true), new MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.42, depthWrite: false }));
  shadow.rotation.z = Math.PI / 2;         // 軸指向 -X：永遠背對太陽
  shadow.visible = false;
  scene.add(shadow);

  const tilt = new Group();
  scene.add(tilt);
  const ringPts = [];
  for (let i = 0; i < 180; i++) { const t = i / 180 * TAU; ringPts.push(Math.cos(t), 0, -Math.sin(t)); }
  const orbitGeo = new BufferGeometry();
  orbitGeo.setAttribute('position', new Float32BufferAttribute(ringPts, 3));
  const orbit = new LineLoop(orbitGeo, new LineBasicMaterial({ color: 0x9fb6d8, transparent: true, opacity: 0.35 }));
  tilt.add(orbit);

  const moonGeo = new SphereGeometry(1, 64, 48);
  const ghostMat = new MeshLambertMaterial({ map: moonTex, color: 0x8f96a0 });
  const ghosts = PHASE_CENTERS.map((deg, i) => {
    const g = new Mesh(moonGeo, ghostMat);
    g.userData.phase = i;
    tilt.add(g);
    return g;
  });

  const pivot = new Group();
  tilt.add(pivot);
  const moon = new Mesh(moonGeo, new MeshLambertMaterial({ map: moonTex }));
  moon.rotation.y = Math.PI;               // 本地 +X（近地面中心）朝向地球：潮汐鎖定
  pivot.add(moon);
  const earthRing = new Mesh(new TorusGeometry(1.06, 0.035, 10, 96), new MeshBasicMaterial({ color: 0x4fd1c5 }));
  earthRing.rotation.y = Math.PI / 2;      // 環的法線 = 本地 +X = 指向地球
  moon.add(earthRing);
  const sunRing = new Mesh(new TorusGeometry(1.1, 0.035, 10, 96), new MeshBasicMaterial({ color: 0xffd36e }));
  sunRing.rotation.y = Math.PI / 2;        // 法線 = 世界 +X = 指向太陽
  scene.add(sunRing);

  // ---------------- 從地球看 ----------------
  const sky = new Scene();
  const skyCam = new PerspectiveCamera(30, 1, 0.1, 100);
  skyCam.position.set(0, 0, 5.1);
  const skyBgCv = document.createElement('canvas');
  skyBgCv.width = 8; skyBgCv.height = 256;
  const sbx = skyBgCv.getContext('2d');
  const sg = sbx.createLinearGradient(0, 0, 0, 256);
  sg.addColorStop(0, '#02040c'); sg.addColorStop(1, '#0b1630');
  sbx.fillStyle = sg; sbx.fillRect(0, 0, 8, 256);
  const skyBg = new CanvasTexture(skyBgCv); skyBg.colorSpace = SRGBColorSpace;
  sky.background = skyBg;
  const skyStars = starField(260, 40, 5, 1.3);
  sky.add(skyStars);
  const halo = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,250,235,.55)'], [0.35, 'rgba(255,245,225,.35)'], [0.55, 'rgba(210,220,255,.08)'], [1, 'rgba(200,210,255,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  halo.scale.set(3.6, 3.6, 1);
  halo.position.z = -0.5;
  sky.add(halo);
  const skyMoonMat = skyMoonMaterial(moonTex);
  const skyMoon = new Mesh(moonGeo, skyMoonMat);
  sky.add(skyMoon);

  // ---------------- 狀態 ----------------
  const state = {
    age: 0, playing: false, speed: 1.5, south: false,
    scaleT: 0, scaleTarget: 0,           // 0 = compact, 1 = true
    showRings: true, showGhosts: true, showShadow: false,
    today: null,
  };
  const lerp = MathUtils.lerp;
  const cur = { D: 0, rm: 0, incl: 0, umbra: 0 };
  function applyScale() {
    const t = MathUtils.smootherstep(state.scaleT, 0, 1);
    for (const k of Object.keys(cur)) cur[k] = lerp(SCALES.compact[k], SCALES.true[k], t);
    tilt.rotation.z = cur.incl;
    orbit.scale.setScalar(cur.D);
    moon.position.set(cur.D, 0, 0);
    moon.scale.setScalar(cur.rm);
    sunRing.scale.setScalar(cur.rm);
    ghosts.forEach((g, i) => {
      const a = PHASE_CENTERS[i] * DEG;
      g.position.set(cur.D * Math.cos(a), 0, -cur.D * Math.sin(a));
      g.rotation.y = a + Math.PI;
      g.scale.setScalar(cur.rm * 0.55);
    });
    const k = cur.D / SCALES.compact.D;
    sun.position.set(cur.D * 2.35, 0, 0);
    sun.scale.setScalar(cur.D * 0.95);
    rays.position.set(cur.D * 1.3, 0, 0);
    rays.scale.setScalar(Math.max(1, k * 0.9));
    shadow.scale.set(1, cur.umbra, 1);
    shadow.position.set(-cur.umbra / 2, 0, 0);
    controls.maxDistance = lerp(60, 520, t);
  }

  const tmp = new Vector3(), fwd = new Vector3(), right = new Vector3(), up = new Vector3();
  const SUN = new Vector3(1, 0, 0);
  function applyAge() {
    const a = (state.age / SYN) * TAU;
    pivot.rotation.y = a;
    moon.updateWorldMatrix(true, false);
    moon.getWorldPosition(tmp);
    sunRing.position.copy(tmp);
    earthRing.visible = sunRing.visible = state.showRings;
    ghosts.forEach((g) => { g.visible = state.showGhosts; });
    shadow.visible = state.showShadow;

    // 從地心看月亮：把太陽方向換到觀測者的相機座標
    fwd.copy(tmp).normalize();
    const worldUp = state.south ? new Vector3(0, -1, 0) : new Vector3(0, 1, 0);
    right.crossVectors(fwd, worldUp).normalize();
    up.crossVectors(right, fwd).normalize();
    const sd = new Vector3(SUN.dot(right), SUN.dot(up), -SUN.dot(fwd));
    skyMoonMat.uniforms.sunDir.value.copy(sd);
    const illum = (1 - Math.cos(a)) / 2;
    skyMoonMat.uniforms.earthshine.value = 0.012 + 0.05 * (1 + Math.cos(a)) / 2;
    halo.material.opacity = 0.12 + 0.88 * Math.pow(illum, 1.4);
    skyMoon.rotation.set(0, -Math.PI / 2, 0);
    if (state.south) skyMoon.rotateOnWorldAxis(new Vector3(0, 0, 1), Math.PI);
    skyStars.rotation.z = state.south ? Math.PI : 0;
    updateReadout(a, illum, sd);
  }

  // ---------------- 讀數 ----------------
  const R = {
    en: $('.al-phase-en'), zh: $('.al-phase-zh'), age: $('[data-r="age"]'), lunar: $('[data-r="lunar"]'),
    lit: $('[data-r="lit"]'), rise: $('[data-r="rise"]'), set: $('[data-r="set"]'),
    when: $('.al-when'), sunDir: $('.al-sun-dir'), sunDirT: $('.al-sun-dir em'), badge: $('.al-badge'), slider: $('.al-age'),
    chips: root.querySelectorAll('.al-chip'), hemi: $('.al-hemi-note'),
  };
  let lastPhase = -1;
  function updateReadout(a, illum, sd) {
    const elong = a / DEG;
    const pi = phaseIndex(elong);
    const ph = phases[pi] || {};
    if (pi !== lastPhase) {
      R.en.textContent = ph.en || '';
      R.zh.textContent = ph.zh || '';
      R.when.innerHTML = `${ph.when_en || ''}<span>${ph.when_zh || ''}</span>`;
      R.chips.forEach((c, i) => c.classList.toggle('on', i === pi));
      lastPhase = pi;
    }
    R.age.textContent = `${state.age.toFixed(1)} days · ${state.age.toFixed(1)} 天`;
    let lunar;
    if (state.today && Math.abs(state.today.age - state.age) < 1e-6) {
      lunar = `農曆${state.today.lunar}`;
    } else {
      lunar = `約農曆${ZH_DAY[Math.min(29, Math.floor(state.age))]}`;
    }
    R.lunar.textContent = lunar;
    R.lit.textContent = `${Math.round(illum * 100)}%`;
    const rise = 6 + (elong / 360) * 24;
    const r1 = fmtClock(rise), r2 = fmtClock(rise + 12.4);
    R.rise.textContent = `${r1.en} · ${r1.zh}`;
    R.set.textContent = `${r2.en} · ${r2.zh}`;
    R.slider.value = state.age.toFixed(2);
    R.slider.style.setProperty('--p', `${(state.age / SYN) * 100}%`);
    // 太陽在哪個方向：亮面永遠朝向太陽
    const len = Math.hypot(sd.x, sd.y);
    const dir = len > 0.25;
    R.sunDir.classList.toggle('dir', dir);
    R.sunDir.style.setProperty('--ang', `${dir ? Math.atan2(-sd.y, sd.x) : 0}rad`);
    R.sunDirT.textContent = dir ? '' : (sd.z < 0 ? 'Sun behind the Moon · 太陽在月亮後方' : 'Sun behind you · 太陽在你背後');
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, html) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = html; labels.appendChild(s); return s; };
  const L = {
    sun: lab('sun', '&#9728; Sun · 太陽<b>&rarr;</b>'),
    earth: lab('earth', 'Earth · 地球'),
    moon: lab('moon', 'Moon · 月亮'),
  };
  const proj = new Vector3();
  function placeLabel(el, v, dy) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = proj.z > 1 || Math.abs(proj.x) > 1.2 || Math.abs(proj.y) > 1.2;
    el.style.opacity = off ? 0 : 1;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  const lp = new Vector3();
  function placeSun() {
    proj.copy(sun.position).project(camera);
    let x = proj.x, y = proj.y;
    if (proj.z > 1) { x = -x; y = -y; }
    const out = Math.abs(x) > 0.92 || Math.abs(y) > 0.9 || proj.z > 1;
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const el = L.sun;
    el.classList.toggle('edge', out);
    let px, py;
    if (out) {
      const k = 1 / Math.max(Math.abs(x) / 0.8, Math.abs(y) / 0.84, 1e-6);
      px = x * k; py = y * k;
      el.style.setProperty('--ang', `${Math.atan2(-y, x)}rad`);
    } else {
      px = x; py = y - cur.D * 0.03;
    }
    el.style.opacity = 1;
    const hw = el.offsetWidth / 2 + 8, hh = el.offsetHeight / 2 + 8;
    const sx = Math.min(w - hw, Math.max(hw, (px * 0.5 + 0.5) * w));
    const sy = Math.min(h - hh, Math.max(hh, (-py * 0.5 + 0.5) * h));
    el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, ${out ? '-50%' : '0'})`;
  }
  function updateLabels() {
    placeSun();
    placeLabel(L.earth, lp.set(0, -1.15, 0), 6);
    moon.getWorldPosition(lp); lp.y -= cur.rm * 1.25;
    placeLabel(L.moon, lp, 6);
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // 窄畫面（手機直向、桌機右側有面板）時放大垂直視角，讓水平方向至少有 ~58°，軌道才放得進來。
      const hMin = (camera.aspect < 1.1 ? 66 : 58) * DEG;
      camera.fov = Math.max(40, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    const s = skyCv.parentElement.clientWidth;
    if (s) { skyRenderer.setSize(s, s, false); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(skyCv.parentElement);
  resize();

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(p) {
    state.playing = p;
    root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setAge(age, fromUser = true) {
    state.age = ((age % SYN) + SYN) % SYN;
    if (fromUser) R.badge.hidden = true;
    applyAge();
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); R.badge.hidden = true; root.classList.remove('al-fresh'); });
  R.slider.addEventListener('input', () => { setPlaying(false); setAge(parseFloat(R.slider.value)); });
  R.chips.forEach((c, i) => c.addEventListener('click', () => {
    setPlaying(false); setAge(PHASE_CENTERS[i] / 360 * SYN);
  }));
  root.querySelectorAll('.al-speed button').forEach((b) => b.addEventListener('click', () => {
    state.speed = parseFloat(b.getAttribute('data-speed'));
    root.querySelectorAll('.al-speed button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    if (!state.playing) setPlaying(true);
  }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); applyAge(); }); return el; };
  bind('[data-t="rings"]', (v) => { state.showRings = v; });
  bind('[data-t="ghosts"]', (v) => { state.showGhosts = v; });
  bind('[data-t="shadow"]', (v) => { state.showShadow = v; });
  bind('[data-t="south"]', (v) => {
    state.south = v;
    R.hemi.textContent = v ? 'Southern Hemisphere view (e.g. Australia) · 南半球視角（例：澳洲）' : 'Northern Hemisphere view (Taiwan) · 北半球視角（台灣）';
  });
  bind('[data-t="scale"]', (v) => { state.scaleTarget = v ? 1 : 0; root.classList.toggle('al-true', v); });
  $('.al-home').addEventListener('click', () => {
    camFrom.copy(camera.position); camTo.copy(HOME).multiplyScalar(lerp(1, 9.3, state.scaleT)); camT = 0;
  });
  function goToday() {
    const now = new Date();
    const elong = elongationAt(now);
    const nm = lastNewMoon(now);
    const lunarIdx = taiwanDayNumber(now) - taiwanDayNumber(nm);
    state.today = { age: elong / 360 * SYN, lunar: ZH_DAY[Math.max(0, Math.min(29, lunarIdx))] };
    setPlaying(false);
    setAge(state.today.age, false);
    R.badge.hidden = false;
    R.badge.querySelector('b').textContent = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }
  $('.al-today').addEventListener('click', goToday);

  // 點太空視角裡的八個小月亮也能跳過去（拖曳旋轉時不算點擊）
  const ray = new Raycaster();
  const ndc = new Vector2();
  let down = null;
  spaceCv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  spaceCv.addEventListener('pointerup', (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6 || !state.showGhosts) return;
    const r = spaceCv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(ghosts, false)[0];
    if (hit) { setPlaying(false); setAge(PHASE_CENTERS[hit.object.userData.phase] / 360 * SYN); }
  });
  spaceCv.addEventListener('pointermove', (e) => {
    if (e.buttons || !state.showGhosts) return;
    const r = spaceCv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    spaceCv.style.cursor = ray.intersectObjects(ghosts, false).length ? 'pointer' : 'grab';
  });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  const camFrom = new Vector3(), camTo = new Vector3();
  let camT = 1;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setAge(state.age + dt * state.speed, false);
    earth.rotation.y += dt * 0.25;
    clouds.rotation.y += dt * 0.29;
    if (state.scaleT !== state.scaleTarget) {
      const prev = state.scaleT;
      state.scaleT = state.scaleTarget > prev ? Math.min(1, prev + dt / 1.6) : Math.max(0, prev - dt / 1.6);
      const f0 = lerp(1, 9.3, MathUtils.smootherstep(prev, 0, 1));
      const f1 = lerp(1, 9.3, MathUtils.smootherstep(state.scaleT, 0, 1));
      camera.position.multiplyScalar(f1 / f0);
      applyScale(); applyAge();
    }
    if (camT < 1) {
      camT = Math.min(1, camT + dt / 0.9);
      camera.position.lerpVectors(camFrom, camTo, MathUtils.smootherstep(camT, 0, 1));
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    skyRenderer.render(sky, skyCam);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  applyScale();
  goToday();
  root.__lab = { camera, controls, state };   // 除錯用：在主控台 $('[data-moon-lab]').__lab
  root.classList.add('al-ready', 'al-fresh');

  const api = {
    setAge: (age) => { setPlaying(false); setAge(age); },
    phase: (i) => { setPlaying(false); setAge(PHASE_CENTERS[i] / 360 * SYN); },
  };
  return api;
}

function boot() {
  const root = document.querySelector('[data-moon-lab]');
  if (!root) return;
  // 貼圖是現場算的（約 0.2 秒），等模型快捲進畫面再建，不拖慢頁面載入。
  let api = null, started = false;
  const start = () => { if (!started) { started = true; api = initLab(root); } return api; };
  const io = new IntersectionObserver((ents) => {
    if (ents[0].isIntersecting) { io.disconnect(); start(); }
  }, { rootMargin: '600px' });
  io.observe(root);
  // 下方「八個月相」卡片的「在 3D 模型中看」按鈕
  document.querySelectorAll('[data-lab-phase]').forEach((b) => b.addEventListener('click', (e) => {
    const lab = start();
    if (!lab) return;
    e.preventDefault();
    lab.phase(parseInt(b.getAttribute('data-lab-phase'), 10));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
