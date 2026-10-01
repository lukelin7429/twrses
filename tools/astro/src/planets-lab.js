/*
 * 天文教育 · 第七課「行星為什麼會在星空中遊走？」的 3D 模型。
 *
 * 一個機制：行星繞太陽的速度不同；地球超車外側較慢的行星時，它看起來會倒退一陣子（逆行）。
 *
 * 日心場景，真實比例的軌道（1 AU = 10 單位）：行星位置用 planets.js（JPL 近似軌道根數）。
 * 座標同第三、五課：X = 春分點方向，+Y = 黃道北極，黃經 λ 的方向是 (cos λ, 0, -sin λ)；
 *   planets.js 的日心座標 [x, y, z]（z 朝黃道北極）→ 場景 (x, z, -y)。
 * 外面一層是第五課的真實星空（BSC5），半徑 2000 單位，當作「無限遠」：
 *   行星在天上的位置＝從地球看過去的方向 × 天球半徑，所以路徑和星星的相對位置是正確的。
 *
 * 兩個視角：
 *   俯瞰軌道（above）：從上方斜看，地球從內圈超車；「視線」是幾條等間隔時刻的地球→行星連線，編號看順序。
 *   跟著地球（ride）：相機在地球後方、望向行星，看它在星空前面往東走、停下、倒退、再往東。
 * 右邊是「在星空中的路徑」2D 圖：東在左（像面向南方看天空），逆行的那一段是橘色。
 *
 * 產物：cd tools/astro && npm run build → assets/js/planets-lab.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, Color, DoubleSide, Float32BufferAttribute,
  Group, Line, LineBasicMaterial, LineDashedMaterial, LineLoop, LineSegments, MathUtils, Mesh, MeshBasicMaterial,
  MeshLambertMaterial, PerspectiveCamera, PointLight, Points, RingGeometry, Scene, ShaderMaterial, SphereGeometry,
  Sprite, SpriteMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, glowTexture } from './common.js';
import { FIGURES } from './figures.js';
import { LINES, STARS } from './stars-data.js';
import { N_STARS, STAR_ECL, altAz, bvColor, eclToEq, precession, riseSet, zodiacAt } from './sky.js';
import { PLANET_KEYS, dailyMotion, geo, helio, retrogrades } from './planets.js';

const K = 10;              // 1 AU = 10 單位
const RS = 2000;           // 天球半徑
const DAY = 86400000, HOUR = 3600000;
const SITE = { lat: 24.08, lon: 120.54 };
// 路徑圖與天上路徑的時間範圍（前後各幾天）：約是逆行長度的 1.3 倍，逆行圈才不會被壓扁
const SPAN = { mercury: 35, venus: 60, mars: 110, jupiter: 130, saturn: 140 };
// 編號視線：九個等間隔日期。號碼標在地球與行星的位置上，路徑圖上也標同樣的 1–9；
// 不標在視線的遠端——畫面裡的「牆」離得不夠遠，視差會把倒退的順序吃掉（實測過）。

export const PL = {
  mercury: { en: 'Mercury', zh: '水星', old: '辰星', col: 0xb9b2a6, css: '#b9b2a6', r: 0.28, period: 87.97 },
  venus: { en: 'Venus', zh: '金星', old: '太白', col: 0xfff1c4, css: '#fff1c4', r: 0.42, period: 224.7 },
  earth: { en: 'Earth', zh: '地球', col: 0x4f9cff, css: '#4f9cff', r: 0.45, period: 365.256 },
  mars: { en: 'Mars', zh: '火星', old: '熒惑', col: 0xff7a4a, css: '#ff7a4a', r: 0.36, period: 686.98 },
  jupiter: { en: 'Jupiter', zh: '木星', old: '歲星', col: 0xe8c9a0, css: '#e8c9a0', r: 0.95, period: 4332.6 },
  saturn: { en: 'Saturn', zh: '土星', old: '鎮星', col: 0xf0dca0, css: '#f0dca0', r: 0.85, period: 10759.2 },
};
const FIG = Object.fromEntries(FIGURES.map((f) => [f.abbr, f]));
const pad = (n) => String(n).padStart(2, '0');
function tw(d) { const x = new Date(d.getTime() + 8 * HOUR); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() }; }
const twDate = (y, m, d, h = 0, mi = 0) => new Date(Date.UTC(y, m - 1, d, h, mi) - 8 * HOUR);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const fmtD = (d) => { const x = tw(d); return { en: `${MON[x.m - 1]} ${x.d}, ${x.y}`, zh: `${x.y}/${x.m}/${x.d}`, short: `${x.m}/${x.d}` }; };
const sv = (p) => new Vector3(p[0] * K, p[2] * K, -p[1] * K);                // planets.js → 場景
const eclVec = (lon, lat, r) => new Vector3(r * Math.cos(lat * DEG) * Math.cos(lon * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lon * DEG));
const unwrap = (arr) => { for (let k = 1; k < arr.length; k++) { while (arr[k] - arr[k - 1] > 180) arr[k] -= 360; while (arr[k] - arr[k - 1] < -180) arr[k] += 360; } return arr; };

/** 什麼時候看得到：黃昏、清晨、整夜，或太靠近太陽。 */
export function visibility(g) {
  const e = g.elong, a = Math.abs(e);
  if (a < 15) return { k: 'sun', en: 'Too close to the Sun to see', zh: '太靠近太陽，看不到' };
  if (a > 135) return { k: 'night', en: 'Up most of the night', zh: '幾乎整夜可見' };
  return e > 0 ? { k: 'eve', en: 'Evening sky, in the west after sunset', zh: '黃昏，日落後的西方天空' }
    : { k: 'morn', en: 'Morning sky, in the east before sunrise', zh: '清晨，日出前的東方天空' };
}

function starMaterial(dpr) {
  return new ShaderMaterial({
    uniforms: { dpr: { value: dpr } },
    vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
      void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,
    fragmentShader: `varying vec3 vC;
      void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
    blending: AdditiveBlending, transparent: true, depthWrite: false,
  });
}
// 木星、土星的條紋貼圖
function bandTexture(c1, c2, n) {
  const cv = document.createElement('canvas'); cv.width = 16; cv.height = 128;
  const ctx = cv.getContext('2d');
  for (let y = 0; y < 128; y++) { const t = 0.5 + 0.5 * Math.sin(y / 128 * Math.PI * n + Math.sin(y * 0.3)); ctx.fillStyle = `rgb(${c1.map((v, i) => Math.round(v + (c2[i] - v) * t))})`; ctx.fillRect(0, y, 16, 1); }
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace; return t;
}
const lineGeo = (pts) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return g; };

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), pathCv = $('.pl-path-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // 一打開：有外行星正在逆行就選它（真實世界的鉤子），否則選火星
  const now0 = new Date();
  const liveRetro = ['mars', 'jupiter', 'saturn'].find((k) => dailyMotion(k, now0) < 0);
  const state = { t: now0.getTime(), playing: false, speed: 10, view: 'above', planet: liveRetro || 'mars', sight: true, trail: true, lines: true };
  const t0 = now0.getTime() - 365 * DAY, t1 = now0.getTime() + 3 * 365 * DAY;   // 時間軸：前一年到後三年

  let scene, camera, controls, bodies = {}, sightG, fanG, trailG, skyMark, starG, figL, saturnRing;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    scene = new Scene(); scene.background = new Color(0x03050d);
    scene.add(new AmbientLight(0xc8d4ff, 0.18));
    scene.add(new PointLight(0xfff4e0, 3.2, 0, 0));
    camera = new PerspectiveCamera(45, 1.6, 0.05, 6000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 2; controls.maxDistance = 600;

    // 太陽
    scene.add(new Mesh(new SphereGeometry(1.4, 40, 28), new MeshBasicMaterial({ color: 0xffe9a8 })));
    const glow = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.15, 'rgba(255,235,170,1)'], [0.3, 'rgba(255,190,80,.45)'], [1, 'rgba(255,120,20,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    glow.scale.setScalar(9); scene.add(glow);

    // 天球：真實星星＋黃道星座連線＋黃道
    starG = new Group(); scene.add(starG);
    {
      const pos = new Float32Array(N_STARS * 3), tint = new Float32Array(N_STARS * 3), size = new Float32Array(N_STARS);
      for (let i = 0; i < N_STARS; i++) {
        const v = eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], RS); pos.set([v.x, v.y, v.z], i * 3);
        const mag = STARS[i * 4 + 2], b = MathUtils.clamp(1.15 - mag * 0.16, 0.28, 1.3), c = bvColor(STARS[i * 4 + 3]);
        tint.set([c[0] / 255 * b, c[1] / 255 * b, c[2] / 255 * b], i * 3);
        size[i] = MathUtils.clamp(8.2 - mag * 1.25, 1.6, 10);
      }
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setAttribute('tint', new Float32BufferAttribute(tint, 3)); g.setAttribute('size', new Float32BufferAttribute(size, 1));
      starG.add(new Points(g, starMaterial(dpr)));
      const pts = [];
      for (const f of FIGURES) if (f.zodiac) for (const i of LINES[f.abbr]) { const v = eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], RS * 0.995); pts.push(v.x, v.y, v.z); }
      const lg = new BufferGeometry(); lg.setAttribute('position', new Float32BufferAttribute(pts, 3));
      figL = new LineSegments(lg, new LineBasicMaterial({ color: 0x7f9fe0, transparent: true, opacity: 0.5, depthWrite: false }));
      starG.add(figL);
      const ep = []; for (let k = 0; k <= 240; k++) ep.push(eclVec((k / 240) * 360, 0, RS * 0.99));
      const el = new Line(lineGeo(ep), new LineDashedMaterial({ color: 0xffd36e, dashSize: 25, gapSize: 20, transparent: true, opacity: 0.35, depthWrite: false }));
      el.computeLineDistances(); starG.add(el);
    }

    // 行星與軌道
    const mats = {
      jupiter: new MeshLambertMaterial({ map: bandTexture([226, 196, 160], [176, 128, 92], 7) }),
      saturn: new MeshLambertMaterial({ map: bandTexture([240, 222, 168], [205, 180, 120], 5) }),
    };
    for (const k of ['earth', ...PLANET_KEYS]) {
      const p = PL[k];
      const m = new Mesh(new SphereGeometry(p.r, 32, 24), mats[k] || new MeshLambertMaterial({ color: p.col, emissive: k === 'earth' ? 0x0a2a55 : 0x000000 }));
      scene.add(m);
      // 軌道：取一整圈的位置
      const pts = [], now = Date.now();
      for (let s = 0; s < 240; s++) pts.push(sv(helio(k, new Date(now + (s / 240) * p.period * DAY))));
      const orbit = new LineLoop(lineGeo(pts), new LineBasicMaterial({ color: k === 'earth' ? 0x4f9cff : p.col, transparent: true, opacity: 0.35 }));
      scene.add(orbit);
      bodies[k] = { m, orbit };
    }
    saturnRing = new Mesh(new RingGeometry(1.15, 1.9, 64), new MeshBasicMaterial({ color: 0xe8d6a0, transparent: true, opacity: 0.6, side: DoubleSide }));
    saturnRing.rotation.x = -Math.PI / 2 + 0.47; bodies.saturn.m.add(saturnRing);

    // 視線：地球 → 行星 → 天球
    sightG = new Group(); scene.add(sightG);
    sightG.add(new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })));
    sightG.add(new Line(new BufferGeometry(), new LineDashedMaterial({ color: 0xffffff, dashSize: 4, gapSize: 4, transparent: true, opacity: 0.45 })));
    fanG = new Group(); scene.add(fanG);
    trailG = new Group(); starG.add(trailG);
    skyMark = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,200,140,.8)'], [1, 'rgba(255,150,80,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    skyMark.scale.setScalar(70); scene.add(skyMark);
  }

  // ---------------- 逆行資料（換行星時重算） ----------------
  let retro = [];      // 時間軸範圍內的逆行段
  function computeRetro() {
    retro = retrogrades(state.planet, new Date(t0), Math.round((t1 - t0) / DAY));
    buildTrack();
  }
  // 現在最靠近的一段逆行（拿來畫編號視線）
  function nearestRetro(t) {
    let best = null, bd = Infinity;
    for (const r of retro) { const d = t < r.start ? r.start - t : t > r.end ? t - r.end : 0; if (d < bd) { bd = d; best = r; } }
    return best;
  }

  // 天上的路徑：一段時間內從地球看過去的方向（畫在天球上，逆行段橘色）
  let trailKey = '';
  function buildTrail(t) {
    if (!renderer) return;
    const span = SPAN[state.planet];
    const a = Math.floor(t / DAY / 10) * 10 * DAY - span * DAY, b = a + 2 * span * DAY;   // 每 10 天才重算一次
    const key = `${state.planet}:${a}`; if (key === trailKey) return; trailKey = key;
    trailG.clear();
    const seg = (pts, col) => { if (pts.length > 1) trailG.add(new Line(lineGeo(pts), new LineBasicMaterial({ color: col, transparent: true, opacity: 0.95, depthWrite: false }))); };
    let cur = [], back = null;
    for (let tt = a; tt <= b; tt += DAY) {
      const g = geo(state.planet, new Date(tt)), v = eclVec(g.lon, g.lat, RS * 0.985);
      const rb = dailyMotion(state.planet, new Date(tt)) < 0;
      if (back !== null && rb !== back) { cur.push(v); seg(cur, back ? 0xff9a4a : 0x4fd1c5); cur = []; }
      cur.push(v); back = rb;
    }
    seg(cur, back ? 0xff9a4a : 0x4fd1c5);
  }
  function fanPtsNoGL() {
    const r = nearestRetro(state.t); if (!r) return [];
    const len = r.end - r.start, a = r.start.getTime() - 0.45 * len;
    return Array.from({ length: 9 }, (_, k) => { const t = a + (k / 8) * 1.9 * len; return { t, k: k + 1, back: dailyMotion(state.planet, new Date(t)) < 0 }; });
  }
  // 編號視線：逆行前後等間隔的 9 個時刻
  let fanKey = '';
  const fanLabs = [];
  function buildFan(t) {
    if (!renderer) return;
    const r = nearestRetro(t); const key = r ? `${state.planet}:${r.start.getTime()}` : 'none';
    if (key === fanKey) return; fanKey = key;
    fanG.clear(); fanG.userData.pts = [];
    if (!r) return;
    const len = r.end - r.start, a = r.start.getTime() - 0.45 * len, n = 9;
    for (let k = 0; k < n; k++) {
      const tt = new Date(a + (k / (n - 1)) * 1.9 * len);
      const e = sv(helio('earth', tt)), p = sv(helio(state.planet, tt));
      const dir = p.clone().sub(e).normalize();
      const end = e.clone().addScaledVector(dir, p.distanceTo(e) + 0.7 * p.length());
      const col = dailyMotion(state.planet, tt) < 0 ? 0xff9a4a : 0x9fe8de;
      fanG.add(new Line(lineGeo([e, end]), new LineBasicMaterial({ color: col, transparent: true, opacity: 0.55 })));
      fanG.add(new Mesh(new SphereGeometry(0.16, 10, 8).translate(e.x, e.y, e.z), new MeshBasicMaterial({ color: 0x4f9cff })));
      fanG.add(new Mesh(new SphereGeometry(0.14, 10, 8).translate(p.x, p.y, p.z), new MeshBasicMaterial({ color: PL[state.planet].col })));
      fanG.userData.pts.push({ e, p, end, k: k + 1, back: col === 0xff9a4a, t: tt.getTime() });
    }
  }

  // ---------------- 時間軸 ----------------
  const timeSl = $('.pl-time'), track = $('.pl-track');
  timeSl.max = String(Math.round((t1 - t0) / DAY));
  function buildTrack() {
    track.innerHTML = '';
    const len = t1 - t0;
    for (const r of retro) {
      const b = document.createElement('span'); b.className = 'ec-band pl-band';
      b.style.left = `${((r.start - t0) / len) * 100}%`; b.style.width = `${((r.end - r.start) / len) * 100}%`;
      b.title = `Retrograde · 逆行 ${fmtD(r.start).zh}–${fmtD(r.end).zh}`;
      track.appendChild(b);
    }
    const y0 = tw(new Date(t0)).y;
    for (let y = y0 + 1; y <= tw(new Date(t1)).y; y++) {
      const t = twDate(y, 1, 1).getTime(); if (t < t0 || t > t1) continue;
      const el = document.createElement('span'); el.className = 'ec-tick ec-tick-y'; el.style.left = `${((t - t0) / len) * 100}%`; el.textContent = String(y); track.appendChild(el);
      for (const m of [4, 7, 10]) { const tm = twDate(y, m, 1).getTime(); if (tm > t1) continue; const e2 = document.createElement('span'); e2.className = 'ec-tick'; e2.style.left = `${((tm - t0) / len) * 100}%`; e2.textContent = `${m}月`; track.appendChild(e2); }
    }
    const nowEl = document.createElement('span'); nowEl.className = 'pl-nowtick'; nowEl.style.left = `${((Date.now() - t0) / len) * 100}%`; nowEl.title = 'Today · 今天'; track.appendChild(nowEl);
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; labels.appendChild(s); return s; };
  const L = renderer ? {
    sun: lab('sun', '&#9728; Sun · 太陽'),
    bodies: Object.fromEntries(['earth', ...PLANET_KEYS].map((k) => [k, lab(`pl-lab pl-${k}`, `${PL[k].en} · ${PL[k].zh}`)])),
    sky: lab('pl-sky', ''),
    zod: FIGURES.filter((f) => f.zodiac).map((f) => {
      const ids = new Set(LINES[f.abbr]), v = new Vector3();
      for (const i of ids) v.add(eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], 1));
      return { el: lab('cst zod', `${f.en}<small>${f.zh}</small>`), v: v.normalize().multiplyScalar(RS) };
    }),
    fan: Array.from({ length: 9 }, () => lab('pl-num', '')),
    fanE: Array.from({ length: 9 }, () => lab('pl-num pl-num-e', '')),
  } : null;
  const proj = new Vector3();
  function place(el, v, dy = 6, show = true, clamp = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > (clamp ? 1.05 : 0.98) || Math.abs(proj.y) > (clamp ? 1.05 : 0.97);
    el.style.opacity = off ? 0 : 1;
    if (off) return;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  function updateLabels() {
    const above = state.view === 'above';
    place(L.sun, new Vector3(0, -1.8, 0), 6, above);
    for (const k of ['earth', ...PLANET_KEYS]) {
      const sel = k === state.planet || k === 'earth';
      L.bodies[k].classList.toggle('on', sel);
      place(L.bodies[k], bodies[k].m.position.clone().add(new Vector3(0, -PL[k].r - 0.4, 0)), 6, above ? true : sel);
    }
    L.sky.innerHTML = `${PL[state.planet].en} in the sky · 天上的${PL[state.planet].zh}`;
    place(L.sky, skyMark.position, -50, state.view === 'ride', false);
    L.zod.forEach((z) => place(z.el, z.v, 14, state.view === 'ride' || camera.position.length() > 40, false));
    const pts = fanG.userData.pts || [];
    L.fan.forEach((el, i) => {
      const p = pts[i], eE = L.fanE[i];
      if (!p || !state.sight) { el.style.opacity = 0; eE.style.opacity = 0; return; }
      el.textContent = String(p.k); el.classList.toggle('back', p.back);
      eE.textContent = String(p.k);
      place(el, p.p, -22, above, false);
      place(eE, p.e, 8, above, false);
    });
  }

  // ---------------- 更新 ----------------
  const R = {
    date: $('.pl-date'), name: $('.pl-name'), move: $('.pl-move'), dist: $('.pl-dist'), mag: $('.pl-mag'),
    con: $('.pl-con'), vis: $('.pl-vis'), next: $('.pl-next'),
  };
  function update() {
    const date = new Date(state.t);
    const g = geo(state.planet, date);
    if (renderer) {
      for (const k of ['earth', ...PLANET_KEYS]) {
        bodies[k].m.position.copy(sv(helio(k, date)));
        const show = k === 'earth' || k === state.planet || state.view === 'above';
        bodies[k].m.visible = show;
        bodies[k].orbit.material.opacity = k === state.planet || k === 'earth' ? 0.75 : 0.18;
      }
      const e = bodies.earth.m.position, p = bodies[state.planet].m.position;
      const sky = eclVec(g.lon, g.lat, RS * 0.985);
      skyMark.position.copy(sky);
      const l1 = sightG.children[0], l2 = sightG.children[1];
      l1.geometry.dispose(); l1.geometry = lineGeo([e, p]);
      l2.geometry.dispose(); l2.geometry = lineGeo([p, sky]); l2.computeLineDistances();
      sightG.visible = true;
      fanG.visible = state.sight && state.view === 'above';
      trailG.visible = state.trail;
      figL.visible = state.lines;
      buildTrail(state.t); buildFan(state.t);
    }
    readout(date, g);
    drawPath(date);
    timeSl.value = String(Math.round((state.t - t0) / DAY));
    timeSl.style.setProperty('--p', `${((state.t - t0) / (t1 - t0)) * 100}%`);
  }
  function readout(date, g) {
    const x = tw(date), P = PL[state.planet];
    R.date.innerHTML = `${MON[x.m - 1]} ${x.d}, ${x.y}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）</span>`;
    R.name.innerHTML = `${P.en} · ${P.zh}<span>古名「${P.old}」</span>`;
    const dm = dailyMotion(state.planet, date);
    R.move.innerHTML = Math.abs(dm) < 0.01 ? 'Standing still (turning around)<span>停留：正在轉向</span>'
      : dm > 0 ? `Eastward: normal, ${dm.toFixed(2)}° a day<span>往東：順行，每天 ${dm.toFixed(2)}°</span>`
        : `Westward: retrograde, ${(-dm).toFixed(2)}° a day<span>往西：逆行，每天 ${(-dm).toFixed(2)}°</span>`;
    R.move.classList.toggle('back', dm < 0);
    root.classList.toggle('pl-back', dm < 0);
    const km = g.dist * 149.6;
    R.dist.innerHTML = `${km.toFixed(km < 100 ? 1 : 0)} million km<span>${km.toFixed(km < 100 ? 1 : 0)} 百萬公里（${g.dist.toFixed(2)} AU）</span>`;
    R.mag.innerHTML = `Magnitude ${g.mag.toFixed(1)}<span>${g.mag < -3 ? '非常亮，比任何恆星都亮' : g.mag < -1 ? '比天狼星還亮' : g.mag < 1 ? '和最亮的恆星差不多' : '中等亮度的星'}</span>`;
    const c = FIG[zodiacAt(g.lon)];
    R.con.innerHTML = `${c.en}<span>${c.zh}</span>`;
    const v = visibility(g);
    R.vis.innerHTML = `${v.en}<span>${v.zh}</span>`;
    const nx = retro.find((r) => r.end > date);
    R.next.innerHTML = !nx ? '—' : nx.start <= date
      ? `Now, until ${fmtD(nx.end).en}<span>正在逆行，到 ${fmtD(nx.end).zh}</span>`
      : `${fmtD(nx.start).en} – ${fmtD(nx.end).en}<span>${fmtD(nx.start).zh} – ${fmtD(nx.end).zh}</span>`;
  }

  // ---------------- 在星空中的路徑（2D：東在左，像面向南方看天空） ----------------
  const pctx = pathCv.getContext('2d');
  function drawPath(date) {
    const W = pathCv.width, H = pathCv.height; if (!W) return;
    const s = W / 360;
    const span = SPAN[state.planet];
    const n = 2 * span + 1, ts = [], lons = [], lats = [], back = [];
    for (let k = 0; k < n; k++) {
      const tt = state.t + (k - span) * DAY, g = geo(state.planet, new Date(tt));
      ts.push(tt); lons.push(g.lon); lats.push(g.lat); back.push(dailyMotion(state.planet, new Date(tt)) < 0);
    }
    unwrap(lons);
    const c0 = lons[span];
    let lo = Math.min(...lons), hi = Math.max(...lons), la0 = Math.min(...lats), la1 = Math.max(...lats);
    const half = Math.max((hi - lo) / 2 + 4, 12), cx0 = (hi + lo) / 2, cy0 = (la0 + la1) / 2;
    const sc = (W * 0.46) / half;              // 每度幾像素
    const X = (lon) => W / 2 + (lon - cx0) * -sc;            // 黃經越大越左（東在左）
    const Y = (lat) => H / 2 - (lat - cy0) * sc;
    pctx.fillStyle = '#050a1a'; pctx.fillRect(0, 0, W, H);
    // 黃道
    pctx.strokeStyle = 'rgba(255,211,110,.35)'; pctx.setLineDash([6 * s, 5 * s]); pctx.lineWidth = 1.2 * s;
    pctx.beginPath(); pctx.moveTo(0, Y(0)); pctx.lineTo(W, Y(0)); pctx.stroke(); pctx.setLineDash([]);
    // 星星與連線（只畫框內的）
    const inBox = (lon, lat) => { const x = X(lon), y = Y(lat); return x > -20 && x < W + 20 && y > -20 && y < H + 20; };
    const near = (lon) => { let d = lon - cx0; while (d > 180) d -= 360; while (d < -180) d += 360; return cx0 + d; };
    if (state.lines) {
      pctx.strokeStyle = 'rgba(130,165,235,.45)'; pctx.lineWidth = 1 * s; pctx.beginPath();
      for (const f of FIGURES) {
        const sg = LINES[f.abbr];
        for (let k = 0; k < sg.length; k += 2) {
          const a = sg[k], b = sg[k + 1];
          const la = near(STAR_ECL[a * 2]), lb = near(STAR_ECL[b * 2]);
          if (!inBox(la, STAR_ECL[a * 2 + 1]) && !inBox(lb, STAR_ECL[b * 2 + 1])) continue;
          pctx.moveTo(X(la), Y(STAR_ECL[a * 2 + 1])); pctx.lineTo(X(lb), Y(STAR_ECL[b * 2 + 1]));
        }
      }
      pctx.stroke();
    }
    for (let i = N_STARS - 1; i >= 0; i--) {
      const lon = near(STAR_ECL[i * 2]), lat = STAR_ECL[i * 2 + 1];
      if (!inBox(lon, lat)) continue;
      const mag = STARS[i * 4 + 2], c = bvColor(STARS[i * 4 + 3]);
      pctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.min(1, 0.4 + (5 - mag) * 0.15)})`;
      pctx.beginPath(); pctx.arc(X(lon), Y(lat), Math.max(0.7, (5.4 - mag) * 0.75) * s, 0, TAU); pctx.fill();
    }
    const font = (px, wt = 700) => `${wt} ${Math.round(px * s)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    // 星座名稱
    pctx.font = font(11, 800); pctx.textAlign = 'center'; pctx.textBaseline = 'middle';
    for (const f of FIGURES) {
      if (!f.zodiac) continue;
      const ids = [...new Set(LINES[f.abbr])];
      let sl = 0, sb = 0; for (const i of ids) { sl += near(STAR_ECL[i * 2]); sb += STAR_ECL[i * 2 + 1]; }
      const lon = sl / ids.length, lat = sb / ids.length;
      if (!inBox(lon, lat)) continue;
      pctx.fillStyle = 'rgba(255,211,110,.8)';
      pctx.fillText(f.zh, X(lon), Math.min(H - 10 * s, Math.max(10 * s, Y(lat) - 16 * s)));
    }
    // 路徑：順行青色、逆行橘色；每 30 天一個日期點
    pctx.lineWidth = 2.6 * s; pctx.lineCap = 'round';
    for (let k = 1; k < n; k++) {
      pctx.strokeStyle = back[k] ? '#ff9a4a' : (k <= span ? 'rgba(79,209,197,.9)' : 'rgba(79,209,197,.45)');
      pctx.beginPath(); pctx.moveTo(X(lons[k - 1]), Y(lats[k - 1])); pctx.lineTo(X(lons[k]), Y(lats[k])); pctx.stroke();
    }
    pctx.font = font(9.5, 700); pctx.fillStyle = 'rgba(232,237,247,.85)';
    for (let k = 0; k < n; k++) {
      const d = new Date(ts[k]), x = tw(d);
      if (x.d !== 1 || k === span) continue;
      pctx.beginPath(); pctx.arc(X(lons[k]), Y(lats[k]), 2.4 * s, 0, TAU); pctx.fill();
      pctx.fillText(`${x.m}/1`, X(lons[k]), Y(lats[k]) + 11 * s);
    }
    // 編號視線的九個日期，在路徑上標同樣的號碼
    if (state.sight) {
      for (const f of (fanG && fanG.userData.pts) || fanPtsNoGL()) {
        const k = Math.round((f.t - ts[0]) / DAY); if (k < 0 || k >= n) continue;
        const x = X(lons[k]), y = Y(lats[k]);
        pctx.fillStyle = f.back ? '#ff9a4a' : '#9fe8de'; pctx.beginPath(); pctx.arc(x, y, 7.5 * s, 0, TAU); pctx.fill();
        pctx.fillStyle = f.back ? '#2a1204' : '#062a26'; pctx.font = font(9.5, 800); pctx.fillText(String(f.k), x, y + 0.5 * s);
      }
    }
    // 現在的位置
    const gx = X(c0), gy = Y(lats[span]);
    const gg = pctx.createRadialGradient(gx, gy, 0, gx, gy, 12 * s);
    gg.addColorStop(0, '#fff'); gg.addColorStop(0.4, PL[state.planet].css); gg.addColorStop(1, 'rgba(0,0,0,0)');
    pctx.fillStyle = gg; pctx.beginPath(); pctx.arc(gx, gy, 12 * s, 0, TAU); pctx.fill();
    pctx.font = font(11, 800); pctx.fillStyle = '#fff';
    pctx.fillText(`${PL[state.planet].zh} ${PL[state.planet].en}`, gx, gy - 17 * s);
    // 方向
    pctx.font = font(10.5, 800); pctx.fillStyle = 'rgba(232,237,247,.8)';
    pctx.textAlign = 'left'; pctx.fillText('← East 東', 8 * s, H - 10 * s);
    pctx.textAlign = 'right'; pctx.fillText('West 西 →', W - 8 * s, H - 10 * s);
    pctx.textAlign = 'center';
  }

  // ---------------- 相機 ----------------
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  function camGoal() {
    if (state.view === 'above') {
      const a = Math.max(1.6, Math.hypot(...helio(state.planet, new Date(state.t)))) * K;
      const r = nearestRetro(state.t), mid = r ? sv(helio(state.planet, r.mid)).multiplyScalar(0.35) : new Vector3();
      const D = a * 2.1 + 12;
      return { pos: mid.clone().add(new Vector3(D * 0.1, D * 0.85, D * 0.55)), tgt: mid };
    }
    // 跟著地球：相機在地球後方一點、略高，望向行星在天上的位置
    const e = bodies.earth.m.position, sky = skyMark.position;
    const dir = sky.clone().sub(e).normalize();
    return { pos: e.clone().addScaledVector(dir, -3.2).add(new Vector3(0, 1.1, 0)), tgt: e.clone().addScaledVector(dir, 60) };
  }
  function setView(v) {
    state.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    if (!renderer) return;
    root.classList.toggle('pl-ride', v === 'ride');
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
    controls.enableRotate = v === 'above';
    update();
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (state.view === 'ride' ? 40 : camera.aspect < 1.1 ? 66 : 56) * DEG;
        camera.fov = Math.max(state.view === 'ride' ? 30 : 42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
        camera.updateProjectionMatrix();
      }
    }
    const pw = pathCv.parentElement.clientWidth;
    if (pw) { pathCv.width = Math.round(pw * dpr); pathCv.height = Math.round(pw * 0.72 * dpr); update(); }
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(pathCv.parentElement);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setSpeed(v) {
    state.speed = v;
    $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', Math.abs(parseFloat(b.dataset.speed) - v) < 1e-6 ? 'true' : 'false'));
  }
  function setT(t) { state.t = Math.min(t1, Math.max(t0, t)); update(); if (state.view === 'ride' && camT >= 1 && renderer) { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); } }
  function setPlanet(k, jump) {
    state.planet = k;
    $$('.pl-chip').forEach((b) => b.classList.toggle('on', b.dataset.planet === k));
    trailKey = ''; fanKey = '';
    computeRetro();
    if (jump) { const r = retro.find((x) => x.end > Date.now()) || retro[0]; if (r) state.t = r.start.getTime() - 0.4 * (r.end - r.start); }
    if (renderer) { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; }
    update();
  }
  function jumpRetro(dirn) {
    setPlaying(false);
    const t = state.t, list = dirn > 0 ? retro.filter((r) => r.start.getTime() - 0.4 * (r.end - r.start) > t + DAY) : retro.filter((r) => r.start.getTime() - 0.4 * (r.end - r.start) < t - DAY).reverse();
    const r = list[0]; if (!r) return;
    setT(r.start.getTime() - 0.4 * (r.end - r.start));
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.pl-chip').forEach((b) => b.addEventListener('click', () => setPlanet(b.dataset.planet, false)));
  $('.pl-prev').addEventListener('click', () => jumpRetro(-1));
  $('.pl-nextbtn').addEventListener('click', () => jumpRetro(1));
  $('.pl-now').addEventListener('click', () => { setPlaying(false); setT(Date.now()); });
  timeSl.addEventListener('input', () => { setPlaying(false); setT(t0 + parseFloat(timeSl.value) * DAY); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="sight"]', (v) => { state.sight = v; });
  bind('[data-t="trail"]', (v) => { state.trail = v; });
  bind('[data-t="lines"]', (v) => { state.lines = v; });
  if (renderer) $('.al-home').addEventListener('click', () => { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) { setT(state.t + dt * state.speed * DAY); if (state.t >= t1) setPlaying(false); }
    if (renderer) {
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.1);
        const k = MathUtils.smootherstep(camT, 0, 1), goal = camGoal();
        camera.position.lerpVectors(camFrom, goal.pos, k);
        controls.target.lerpVectors(tgtFrom, goal.tgt, k);
        if (camT >= 1) resize();
      }
      controls.update();
      scene.updateMatrixWorld();
      updateLabels();
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  computeRetro();
  $$('.pl-chip').forEach((b) => b.classList.toggle('on', b.dataset.planet === state.planet));
  resize();
  update();
  if (renderer) { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); }
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying, setView, setPlanet, jumpRetro, update };   // 除錯用：$('[data-planet-lab]').__lab
  return { setPlanet, jumpRetro };
}

// ---------------------------------------------------------------------------
// 頁面下方「今晚的行星」：每顆行星什麼時候、往哪裡看
function renderTonight(box) {
  const now = new Date(), x = tw(now);
  const noon = twDate(x.y, x.m, x.d, 12), next = new Date(noon.getTime() + DAY);
  const altOf = (k) => (d) => { const g = geo(k, d), q = eclToEq(g.lon + precession(d), g.lat); return altAz(q.ra, q.dec, d, SITE).alt; };
  const sunAlt = (d) => { const E = helio('earth', d), lon = Math.atan2(-E[1], -E[0]) / DEG, q = eclToEq(lon + precession(d), 0); return altAz(q.ra, q.dec, d, SITE).alt; };
  const dusk = riseSet(sunAlt, noon, next, -8).set, dawn = riseSet(sunAlt, noon, next, -8).rise;
  const hm = (d) => { const y = tw(d); return `${pad(y.h)}:${pad(y.mi)}`; };
  const dirs = [['N', '北'], ['NE', '東北'], ['E', '東'], ['SE', '東南'], ['S', '南'], ['SW', '西南'], ['W', '西'], ['NW', '西北']];
  const cards = PLANET_KEYS.map((k) => {
    const P = PL[k], g = geo(k, now), v = visibility(g), back = dailyMotion(k, now) < 0;
    const f = altOf(k);
    const at = v.k === 'morn' ? dawn : v.k === 'eve' ? dusk : twDate(x.y, x.m, x.d, 21);
    let where = '', wherezh = '';
    if (v.k !== 'sun' && at) {
      const g2 = geo(k, at), q = eclToEq(g2.lon + precession(at), g2.lat), h = altAz(q.ra, q.dec, at, SITE);
      const [d, dz] = dirs[Math.round(h.az / 45) % 8];
      if (h.alt > 3) { where = `At ${hm(at)}: look ${d}, ${Math.round(h.alt)}° up.`; wherezh = `${hm(at)} 往${dz}方看，高 ${Math.round(h.alt)}°。`; }
      else { where = `At ${hm(at)} it is still very low, so it is hard to see.`; wherezh = `${hm(at)} 還很低，不容易看到。`; }
    }
    const rs = riseSet(f, noon, next, 0);
    const times = `${rs.rise ? `Rises ${hm(rs.rise)}` : ''}${rs.rise && rs.set ? ' · ' : ''}${rs.set ? `Sets ${hm(rs.set)}` : ''}`;
    const timesZh = `${rs.rise ? `${hm(rs.rise)} 升起` : ''}${rs.rise && rs.set ? '、' : ''}${rs.set ? `${hm(rs.set)} 落下` : ''}`;
    const c = FIG[zodiacAt(g.lon)];
    return `<div class="tn-item pl-tn${v.k === 'sun' ? ' dim' : ''}"><span class="tn-ico pl-dot" style="--c:${P.css}" aria-hidden="true"></span><div>
      <h3>${P.en}<span class="zh">${P.zh}</span>${back ? '<b class="pl-badge">Retrograde · 逆行中</b>' : ''}</h3>
      <p><b>${v.en}</b><span class="zh">${v.zh}</span></p>
      <p>In ${c.en}, magnitude ${g.mag.toFixed(1)}. ${where}<span class="zh">在${c.zh}，${g.mag.toFixed(1)} 等。${wherezh}</span></p>
      <p class="pl-times">${times}<span class="zh">${timesZh}（台灣時間）</span></p></div></div>`;
  });
  box.innerHTML = `<p class="tn-when">${MON[x.m - 1]} ${x.d}, ${x.y}, over Changhua<span>${x.y} 年 ${x.m} 月 ${x.d} 日，彰化</span></p><div class="tn-grid pl-tn-grid">${cards.join('')}</div>`;
  box.setAttribute('aria-busy', 'false');
}

// 頁面下方的行星卡：填上下一次逆行的日期
function fillCards() {
  document.querySelectorAll('[data-retro]').forEach((el) => {
    const k = el.getAttribute('data-retro');
    const r = retrogrades(k, new Date(), 1300).find((x) => x.end > new Date());
    if (!r) return;
    const a = fmtD(r.start), b = fmtD(r.end), live = r.start <= new Date();
    el.innerHTML = live ? `Going backward now, until ${b.en}<span class="zh">正在逆行，到 ${b.zh}</span>`
      : `Next: ${a.en} – ${b.en}<span class="zh">下一次：${a.zh}–${b.zh}</span>`;
  });
}

function boot() {
  const root = document.querySelector('[data-planet-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-planet-tonight]');
  if (tn) renderTonight(tn);
  fillCards();
  document.querySelectorAll('[data-lab-planet]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setPlanet(b.getAttribute('data-lab-planet'), true);
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
