/*
 * 天文教育 · 第九課「太陽系有多大？」的 3D 模型。
 *
 * 一個機制：大小和距離沒辦法在同一張圖上同時按比例畫——行星和它們之間的距離比起來小得驚人，
 * 太陽系幾乎全是空的。軌道永遠是真實比例（1 AU = 10 單位）；行星大小用滑桿從「真實大小」放大到 1000 倍，
 * 真實大小時行星小到看不見，只剩位置圓點。太陽另外限制在 20 倍以內，免得吞掉水星的軌道（讀數會照實說）。
 * 「發出一道光」：從太陽擴散的光環照真實光速（加速 60／600／6000 倍）前進，經過每顆行星時記下用了多久。
 *
 * 行星位置：planets.js（NASA/JPL 近似軌道根數，今天的真實位置）。座標同第七課：場景 (x, z, -y)。
 * 產物：cd tools/astro && npm run build → assets/js/solar.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, Color, DoubleSide, Float32BufferAttribute,
  Group, Line, LineBasicMaterial, LineLoop, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  PerspectiveCamera, PointLight, Points, PointsMaterial, RingGeometry, Scene, ShaderMaterial, SphereGeometry,
  Sprite, SpriteMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, glowTexture } from './common.js';
import { STARS } from './stars-data.js';
import { N_STARS, STAR_ECL, bvColor } from './sky.js';
import { ALL_PLANETS, AU_KM, LIGHT_S_PER_AU, RADIUS_KM, geo, helio } from './planets.js';

const K = 10;              // 1 AU = 10 單位
const RS = 5000;           // 星空半徑
const SUN_MAX = 20;        // 太陽最多放大幾倍
const DAY = 86400000;
export const VOYAGER_LIGHT_DAY = Date.UTC(2026, 10, 18, 6, 16, 7);   // NASA：2026/11/18 00:16:07 CST（UTC−6）

export const PL = {
  mercury: { en: 'Mercury', zh: '水星', col: 0xb9b2a6, period: 87.97 },
  venus: { en: 'Venus', zh: '金星', col: 0xfff1c4, period: 224.7 },
  earth: { en: 'Earth', zh: '地球', col: 0x4f9cff, period: 365.256 },
  mars: { en: 'Mars', zh: '火星', col: 0xff7a4a, period: 686.98 },
  jupiter: { en: 'Jupiter', zh: '木星', col: 0xe8c9a0, period: 4332.6 },
  saturn: { en: 'Saturn', zh: '土星', col: 0xf0dca0, period: 10759.2 },
  uranus: { en: 'Uranus', zh: '天王星', col: 0x9fe3ea, period: 30688.5 },
  neptune: { en: 'Neptune', zh: '海王星', col: 0x5b7cff, period: 60182 },
};
const sv = (p) => new Vector3(p[0] * K, p[2] * K, -p[1] * K);
const eclVec = (lon, lat, r) => new Vector3(r * Math.cos(lat * DEG) * Math.cos(lon * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lon * DEG));
const lineGeo = (pts) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return g; };
/** 秒數寫成「X 小時 Y 分 Z 秒」。 */
export function fmtDur(s) {
  s = Math.round(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  return {
    en: h ? `${h} h ${m} min` : m ? `${m} min ${x} s` : `${x} s`,
    zh: h ? `${h} 小時 ${m} 分` : m ? `${m} 分 ${x} 秒` : `${x} 秒`,
  };
}
const fmtFactor = (f) => (f < 1.5 ? '1' : f < 10 ? f.toFixed(1) : String(Math.round(f)));

function bandTexture(c1, c2, n) {
  const cv = document.createElement('canvas'); cv.width = 16; cv.height = 128;
  const ctx = cv.getContext('2d');
  for (let y = 0; y < 128; y++) { const t = 0.5 + 0.5 * Math.sin(y / 128 * Math.PI * n + Math.sin(y * 0.3)); ctx.fillStyle = `rgb(${c1.map((v, i) => Math.round(v + (c2[i] - v) * t))})`; ctx.fillRect(0, y, 16, 1); }
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace; return t;
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true, logarithmicDepthBuffer: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const now = new Date();
  const state = { view: 'inner', factor: 1000, dots: true, orbits: true, playing: false, speed: 60, light: -1, log: [] };
  const pos = Object.fromEntries(ALL_PLANETS.map((k) => [k, sv(helio(k, now))]));
  const rAU = Object.fromEntries(ALL_PLANETS.map((k) => [k, Math.hypot(...helio(k, now))]));

  let scene, camera, controls, sunMesh, sunGlow, bodies = {}, dots, ring, ringGlow, orbitsG;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    scene = new Scene(); scene.background = new Color(0x03050d);
    scene.add(new AmbientLight(0xc8d4ff, 0.22));
    scene.add(new PointLight(0xfff4e0, 3.0, 0, 0));
    camera = new PerspectiveCamera(45, 1.6, 0.01, 20000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 0.5; controls.maxDistance = 2000;

    // 星空
    {
      const p = new Float32Array(N_STARS * 3), tint = new Float32Array(N_STARS * 3), size = new Float32Array(N_STARS);
      for (let i = 0; i < N_STARS; i++) {
        const v = eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], RS); p.set([v.x, v.y, v.z], i * 3);
        const mag = STARS[i * 4 + 2], b = MathUtils.clamp(1.0 - mag * 0.16, 0.2, 1.1), c = bvColor(STARS[i * 4 + 3]);
        tint.set([c[0] / 255 * b, c[1] / 255 * b, c[2] / 255 * b], i * 3);
        size[i] = MathUtils.clamp(7 - mag * 1.1, 1.4, 8);
      }
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(p, 3)); g.setAttribute('tint', new Float32BufferAttribute(tint, 3)); g.setAttribute('size', new Float32BufferAttribute(size, 1));
      scene.add(new Points(g, new ShaderMaterial({
        uniforms: { dpr: { value: dpr } },
        vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
          void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,
        fragmentShader: `varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
        blending: AdditiveBlending, transparent: true, depthWrite: false,
      })));
    }
    // 太陽
    sunMesh = new Mesh(new SphereGeometry(1, 48, 32), new MeshBasicMaterial({ color: 0xffe9a8 }));
    scene.add(sunMesh);
    sunGlow = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.15, 'rgba(255,235,170,1)'], [0.3, 'rgba(255,190,80,.45)'], [1, 'rgba(255,120,20,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    scene.add(sunGlow);
    // 行星與軌道
    orbitsG = new Group(); scene.add(orbitsG);
    const mats = {
      jupiter: new MeshLambertMaterial({ map: bandTexture([226, 196, 160], [176, 128, 92], 7) }),
      saturn: new MeshLambertMaterial({ map: bandTexture([240, 222, 168], [205, 180, 120], 5) }),
    };
    for (const k of ALL_PLANETS) {
      const m = new Mesh(new SphereGeometry(1, 32, 24), mats[k] || new MeshLambertMaterial({ color: PL[k].col }));
      m.position.copy(pos[k]); scene.add(m);
      if (k === 'saturn') { const r = new Mesh(new RingGeometry(1.25, 2.2, 64), new MeshBasicMaterial({ color: 0xe8d6a0, transparent: true, opacity: 0.55, side: DoubleSide })); r.rotation.x = -Math.PI / 2 + 0.47; m.add(r); }
      const pts = [];
      for (let s = 0; s < 360; s++) pts.push(sv(helio(k, new Date(now.getTime() + (s / 360) * PL[k].period * DAY))));
      orbitsG.add(new LineLoop(lineGeo(pts), new LineBasicMaterial({ color: PL[k].col, transparent: true, opacity: 0.45 })));
      bodies[k] = m;
    }
    // 位置圓點（固定像素大小：真實大小看不見時，還知道行星在哪裡）
    {
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(ALL_PLANETS.flatMap((k) => pos[k].toArray()), 3));
      g.setAttribute('color', new Float32BufferAttribute(ALL_PLANETS.flatMap((k) => new Color(PL[k].col).toArray()), 3));
      dots = new Points(g, new PointsMaterial({ size: 6 * dpr, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }));
      scene.add(dots);
    }
    // 光環
    ring = new LineLoop(lineGeo(Array.from({ length: 256 }, (_, k) => new Vector3(Math.cos((k / 256) * TAU), 0, Math.sin((k / 256) * TAU)))), new LineBasicMaterial({ color: 0xfff1b0, transparent: true, opacity: 0.95 }));
    ring.visible = false; scene.add(ring);
    ringGlow = new Mesh(new RingGeometry(0.985, 1, 256).rotateX(-Math.PI / 2), new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.25, side: DoubleSide, depthWrite: false }));
    ringGlow.visible = false; scene.add(ringGlow);
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; labels.appendChild(s); return s; };
  const L = renderer ? {
    sun: lab('sun', '&#9728; Sun · 太陽'),
    planets: Object.fromEntries(ALL_PLANETS.map((k) => [k, lab(`ss-pl ss-${k}`, `${PL[k].en} · ${PL[k].zh}`)])),
    light: lab('ss-light', ''),
  } : null;
  const proj = new Vector3();
  function place(el, v, dy = 6, show = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > 1.02 || Math.abs(proj.y) > 1.02;
    el.style.opacity = off ? 0 : 1;
    if (off) return;
    el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * w}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  function updateLabels() {
    place(L.sun, new Vector3(0, 0, 0), 14);
    const camD = camera.position.length();
    for (const k of ALL_PLANETS) {
      // 太擠的內行星：鏡頭拉遠時只標地球
      const inner = rAU[k] < 2 && k !== 'earth';
      place(L.planets[k], pos[k], 8, !(inner && camD > 160));
    }
    if (state.light >= 0) {
      const r = state.light * K;
      L.light.innerHTML = `Light · 光 ${fmtDur(state.light * LIGHT_S_PER_AU).en}`;
      place(L.light, new Vector3(r * 0.7071, 0, r * 0.7071), -10);
    } else L.light.style.opacity = 0;
  }

  // ---------------- 讀數 ----------------
  const R = {
    factor: $('.ss-factor'), sizeNote: $('.ss-size-note'), timer: $('.ss-timer'), log: $('.ss-log'), table: $('.ss-today tbody'),
  };
  function applySize() {
    const f = state.factor, fs = Math.min(f, SUN_MAX);
    if (renderer) {
      sunMesh.scale.setScalar(RADIUS_KM.sun / AU_KM * K * fs);
      sunGlow.scale.setScalar(Math.max(RADIUS_KM.sun / AU_KM * K * fs * 7, 0.6));
      for (const k of ALL_PLANETS) bodies[k].scale.setScalar(RADIUS_KM[k] / AU_KM * K * f);
    }
    R.factor.innerHTML = f < 1.5 ? 'True size<span>真實大小</span>' : `Planets ×${fmtFactor(f)}, Sun ×${fmtFactor(fs)}<span>行星放大 ${fmtFactor(f)} 倍、太陽放大 ${fmtFactor(fs)} 倍</span>`;
    R.sizeNote.innerHTML = f < 1.5 ? 'At true size, even Jupiter is far too small to see from here. Only the colored dots show where the planets are.<span>真實大小時，連木星都小到看不見，只剩彩色圓點標出行星的位置。</span>'
      : f < 30 ? 'Still almost too small to see: space is mostly empty.<span>還是小到幾乎看不見：太空幾乎全是空的。</span>'
        : `The Sun stops at ×${SUN_MAX}; any bigger and it would swallow Mercury's orbit.<span>太陽最多放大 ${SUN_MAX} 倍，再大就會吞掉水星的軌道。</span>`;
  }
  function todayTable() {
    R.table.innerHTML = ALL_PLANETS.filter((k) => k !== 'earth').map((k) => {
      const g = geo(k, now), lt = fmtDur(g.dist * LIGHT_S_PER_AU);
      return `<tr><td><i style="background:#${PL[k].col.toString(16).padStart(6, '0')}"></i>${PL[k].en}<span>${PL[k].zh}</span></td><td>${g.r.toFixed(2)}</td><td>${(g.dist * AU_KM / 1e6).toFixed(0)}</td><td>${lt.en}<span>${lt.zh}</span></td></tr>`;
    }).join('');
  }

  // ---------------- 光環 ----------------
  function setLight(au) {
    state.light = au;
    const on = au >= 0;
    if (renderer) { ring.visible = ringGlow.visible = on; if (on) { ring.scale.setScalar(Math.max(au * K, 0.001)); ringGlow.scale.setScalar(Math.max(au * K, 0.001)); } }
    if (!on) { R.timer.innerHTML = 'Press Play to send a flash of light from the Sun.<span>按「播放」，從太陽發出一道光。</span>'; R.log.innerHTML = ''; return; }
    const d = fmtDur(au * LIGHT_S_PER_AU);
    R.timer.innerHTML = `${d.en} after the flash: ${au.toFixed(2)} AU<span>發光後 ${d.zh}：走了 ${au.toFixed(2)} AU（${(au * AU_KM / 1e6).toFixed(0)} 百萬公里）</span>`;
    R.log.innerHTML = ALL_PLANETS.filter((k) => rAU[k] <= au).map((k) => { const t = fmtDur(rAU[k] * LIGHT_S_PER_AU); return `<li><b>${PL[k].en} · ${PL[k].zh}</b>${t.en} · ${t.zh}</li>`; }).join('');
  }

  // ---------------- 相機 ----------------
  const VIEWS = { inner: 2.0, jupiter: 6.0, all: 31 };
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  const camGoal = () => { const D = VIEWS[state.view] * K * 2.4; return { pos: new Vector3(D * 0.18, D * 0.72, D * 0.62), tgt: new Vector3(0, 0, 0) }; };
  function setView(v) {
    state.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    if (!renderer) return;
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
  }

  function resize() {
    if (!renderer) return;
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false); camera.aspect = w / h;
      const hMin = (camera.aspect < 1.1 ? 70 : 58) * DEG;
      camera.fov = Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play'), sizeSl = $('.ss-size');
  function setPlaying(p) {
    if (p && (state.light < 0 || state.light > 31)) { setLight(0); }
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setSpeed(v) {
    state.speed = v;
    $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', Math.abs(parseFloat(b.dataset.speed) - v) < 1e-6 ? 'true' : 'false'));
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $('.ss-reset').addEventListener('click', () => { setPlaying(false); setLight(-1); });
  sizeSl.addEventListener('input', () => {
    state.factor = Math.pow(10, parseFloat(sizeSl.value));
    sizeSl.style.setProperty('--p', `${(parseFloat(sizeSl.value) / 3) * 100}%`);
    $$('.ss-preset').forEach((b) => b.classList.remove('on'));
    applySize();
  });
  $$('.ss-preset').forEach((b) => b.addEventListener('click', () => {
    const v = parseFloat(b.dataset.log); sizeSl.value = String(v); state.factor = Math.pow(10, v);
    sizeSl.style.setProperty('--p', `${(v / 3) * 100}%`);
    $$('.ss-preset').forEach((x) => x.classList.toggle('on', x === b));
    applySize();
  }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="dots"]', (v) => { state.dots = v; if (dots) dots.visible = v; });
  bind('[data-t="orbits"]', (v) => { state.orbits = v; if (orbitsG) orbitsG.visible = v; });
  if (renderer) $('.al-home').addEventListener('click', () => { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) {
      const au = state.light + dt * state.speed / LIGHT_S_PER_AU;
      setLight(au);
      if (au > 31) setPlaying(false);
    }
    if (renderer) {
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.2);
        const k = MathUtils.smootherstep(camT, 0, 1), g = camGoal();
        camera.position.lerpVectors(camFrom, g.pos, k);
        controls.target.lerpVectors(tgtFrom, g.tgt, k);
      }
      controls.update();
      updateLabels();
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  sizeSl.value = '3'; sizeSl.style.setProperty('--p', '100%');
  applySize(); setLight(-1); todayTable(); resize();
  if (renderer) { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); }
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setView, setPlaying, setLight, applySize };   // 除錯用：$('[data-solar-lab]').__lab
  return { setView };
}

// ---------------------------------------------------------------------------
// 頁面下方：在學校做一個比例模型（選太陽的大小，算出每顆行星多大、放多遠）
const THINGS = [
  [0.1, 'a speck of dust', '一粒灰塵'], [0.6, 'a grain of sand', '一粒細沙'], [2, 'a sesame seed', '一粒芝麻'],
  [4, 'a peppercorn', '一粒胡椒'], [8, 'a pea', '一顆豌豆'], [15, 'a marble', '一顆彈珠'], [22, 'a grape', '一顆葡萄'],
  [40, 'a ping-pong ball', '一顆乒乓球'], [67, 'a tennis ball', '一顆網球'], [120, 'a grapefruit', '一顆葡萄柚'],
  [240, 'a basketball', '一顆籃球'], [650, 'an exercise ball', '一顆健身球'], [1500, 'a car', '一輛汽車'],
];
const nearThing = (mm) => THINGS.reduce((a, b) => (Math.abs(Math.log(b[0] / mm)) < Math.abs(Math.log(a[0] / mm)) ? b : a));
const fmtLen = (m) => (m < 0.01 ? `${(m * 1000).toFixed(1)} mm` : m < 1 ? `${(m * 100).toFixed(1)} cm` : m < 1000 ? `${m < 10 ? m.toFixed(1) : Math.round(m)} m` : `${(m / 1000).toFixed(m < 10000 ? 1 : 0)} km`);
const SEMI = { mercury: 0.387, venus: 0.723, earth: 1, mars: 1.524, jupiter: 5.203, saturn: 9.537, uranus: 19.19, neptune: 30.07 };
function renderScale(box) {
  const out = box.querySelector('[data-scale-out]'), input = box.querySelector('.ss-sun-cm');
  function draw(cm) {
    const k = (cm / 100) / (2 * RADIUS_KM.sun * 1000);          // 模型公尺／真實公尺
    const row = (name, zh, diamKm, distM, note = '', notezh = '') => {
      const mm = diamKm * 1000 * k * 1000, th = nearThing(mm);
      return `<tr><td><b>${name}</b><span>${zh}</span></td><td>${fmtLen(mm / 1000)}<span>≈ ${th[1]} · ${th[2]}</span></td><td>${distM == null ? '—' : fmtLen(distM)}${note ? `<span>${note} · ${notezh}</span>` : ''}</td></tr>`;
    };
    const walk = (m) => { const min = m / 1.2 / 60; return min < 1 ? ['under a minute of walking', '走路不到一分鐘'] : min < 120 ? [`about ${Math.round(min)} min of walking`, `走路約 ${Math.round(min)} 分鐘`] : [`about ${Math.round(min / 60)} h of walking`, `走路約 ${Math.round(min / 60)} 小時`]; };
    const rows = [row('Sun', '太陽', 2 * RADIUS_KM.sun, null)];
    for (const p of ALL_PLANETS) { const d = SEMI[p] * AU_KM * 1000 * k, w = walk(d); rows.push(row(PL[p].en, PL[p].zh, 2 * RADIUS_KM[p], d, w[0], w[1])); }
    const moon = 384400 * 1000 * k;
    rows.push(row('Moon (from Earth)', '月亮（離地球）', 2 * RADIUS_KM.moon, moon));
    const voy = 299792458 * 86400 * k, prox = 4.2465 * 9.4607e15 * k;
    rows.push(`<tr class="ss-far"><td><b>Voyager 1</b><span>航海家一號（一光日）</span></td><td>—</td><td>${fmtLen(voy)}</td></tr>`);
    rows.push(`<tr class="ss-far"><td><b>Proxima Centauri</b><span>比鄰星（最近的恆星）</span></td><td>${fmtLen(0.154 * 1.3914e9 * k)}</td><td>${fmtLen(prox)}</td></tr>`);
    out.innerHTML = `<table class="cc-tbl ss-tbl"><thead><tr><th>Object · 天體</th><th>Model size · 模型大小</th><th>Distance from the model Sun · 離模型太陽</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
  }
  box.querySelectorAll('[data-sun-cm]').forEach((b) => b.addEventListener('click', () => {
    input.value = b.getAttribute('data-sun-cm');
    box.querySelectorAll('[data-sun-cm]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    draw(parseFloat(input.value));
  }));
  input.addEventListener('input', () => { const v = parseFloat(input.value); if (v > 0 && v < 100000) { box.querySelectorAll('[data-sun-cm]').forEach((x) => x.setAttribute('aria-pressed', 'false')); draw(v); } });
  draw(parseFloat(input.value) || 24);
  // 航海家一號一光日倒數
  const vc = document.querySelector('[data-voyager]');
  if (vc) {
    const left = VOYAGER_LIGHT_DAY - Date.now(), d = Math.ceil(left / DAY);
    vc.innerHTML = left > 0
      ? `<b>${d}</b> day${d === 1 ? '' : 's'} until Voyager 1 is one light-day from Earth (November 18, 2026)<span>再 ${d} 天，航海家一號就距離地球一光日（2026 年 11 月 18 日）</span>`
      : `Voyager 1 passed one light-day from Earth on November 18, 2026, and is still moving away<span>航海家一號已在 2026 年 11 月 18 日到達距離地球一光日的地方，而且還在繼續遠離</span>`;
  }
}

function boot() {
  const root = document.querySelector('[data-solar-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const sc = document.querySelector('[data-scale-calc]');
  if (sc) renderScale(sc);
  document.querySelectorAll('[data-lab-view]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setView(b.getAttribute('data-lab-view'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
