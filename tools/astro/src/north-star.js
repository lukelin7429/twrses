/*
 * 天文教育 · 第六課「夜裡怎麼找北方？」的 3D 模型。
 *
 * 一個機制：地軸幾乎正對北極星，所以北極星不動、其他星星繞著它轉；它離地平線的高度等於你的緯度。
 *
 * 兩個視角（兩個 three.js 場景，同一個 renderer）：
 *   從太空看（space）：赤道座標——場景 +Y 就是地軸、指向天球北極。地球照格林威治恆星時自轉，
 *     星星用第五課的真實星表（BSC5）。所選地點畫一片地平面、一條「地平線上的北方」、一條指向北極星的線，
 *     以及地心的緯度角——兩個角一樣大，這就是「北極星高度＝緯度」的幾何證明。相機固定在地球上（跟著自轉）。
 *   你的天空（sphere）：以觀測者為中心的天球。地面 +Y 朝天頂、-Z 朝北、+X 朝東。
 *     天球整體依緯度傾斜（tiltG：天極在北方地平線上方「緯度」度），再依地方恆星時轉（spinG）。
 *     青色圈裡的星永不落下，紅色圈裡的星永不升起。
 *   右邊的「面向北方」星圖是 2D 立體投影，可開星軌（過去三小時）與拳頭量角尺。
 *
 * 產物：cd tools/astro && npm run build → assets/js/north-star.js
 */
import {
  AdditiveBlending, AmbientLight, BackSide, BufferGeometry, CircleGeometry, Color, CylinderGeometry,
  DirectionalLight, DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial, LineDashedMaterial,
  LineLoop, LineSegments, MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera,
  Points, Scene, ShaderMaterial, SphereGeometry, TubeGeometry, CatmullRomCurve3, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, atmosphereMaterial } from './common.js';
import { makeClouds, makeRealEarth } from './earthmap.js';
import * as E from './ephem.js';
import { EXTRA, FIGURES, NAMED } from './figures.js';
import { EXTRA_IDX, LINES, NAMED_IDX, STARS } from './stars-data.js';
import { N_STARS, altAz, bvColor, handleDir, starEqOfDate, starsUp } from './sky.js';

const RE = 2;             // 太空視角的地球半徑
const RS = 300;           // 太空視角的天球半徑
const RG = 10;            // 「你的天空」天球半徑
const DAY = 86400000, HOUR = 3600000;
const SID = 1.00273790935;   // 恆星時／太陽時

export const PLACES = {
  changhua: { lat: 24.08, lon: 120.54, tz: 8, en: 'Changhua', zh: '彰化' },
  singapore: { lat: 1.35, lon: 103.82, tz: 8, en: 'Singapore', zh: '新加坡' },
  tromso: { lat: 69.65, lon: 18.96, tz: 1, en: 'Tromsø', zh: '特羅姆瑟' },
  pole: { lat: 89.99, lon: 0, tz: 0, en: 'North Pole', zh: '北極點' },
  sydney: { lat: -33.87, lon: 151.21, tz: 10, en: 'Sydney', zh: '雪梨' },
};
const SEASON_JUMP = [[4, '東', 'east', '春'], [7, '南', 'south', '夏'], [10, '西', 'west', '秋'], [1, '北', 'north', '冬']];

const pad = (n) => String(n).padStart(2, '0');
function loc(d, tz) {
  const x = new Date(d.getTime() + tz * HOUR);
  return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() };
}
const locDate = (tz, y, m, d, h = 0, mi = 0) => new Date(Date.UTC(y, m - 1, d, h, mi) - tz * HOUR);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const qVec = (ra, dec, r) => new Vector3(r * Math.cos(dec * DEG) * Math.cos(ra * DEG), r * Math.sin(dec * DEG), -r * Math.cos(dec * DEG) * Math.sin(ra * DEG));
const localOf = (lat, lon, r) => new Vector3(r * Math.cos(lat * DEG) * Math.cos(lon * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lon * DEG));
const wrap180 = (x) => ((x % 360) + 540) % 360 - 180;
const fists = (deg) => Math.round(deg / 5) / 2;     // 一個拳頭約 10°，取到半個拳頭
const half = (f) => `${Math.floor(f) || ''}${f % 1 ? '½' : ''}` || '0';
const fistTxt = (deg) => { const f = fists(deg); return f === 1 ? 'about 1 fist' : `about ${half(f)} fists`; };
const idxOf = (en) => { const k = NAMED.findIndex((n) => n[1] === en); if (k >= 0) return NAMED_IDX[k]; return EXTRA_IDX[EXTRA.findIndex((n) => n[1] === en)]; };
const FIG = Object.fromEntries(FIGURES.map((f) => [f.abbr, f]));
const HOT = new Set(['UMa', 'UMi', 'Cas']);          // 找北極星要用的三個星座

// 星星今天的赤道座標（含歲差），整頁只算一次——幾天之內的差別看不出來
const EQ = (() => {
  const now = new Date(), out = new Float64Array(N_STARS * 2);
  for (let i = 0; i < N_STARS; i++) { const q = starEqOfDate(i, now); out[i * 2] = q.ra; out[i * 2 + 1] = q.dec; }
  return out;
})();
const POLARIS = idxOf('Polaris');
const figCenter = (abbr) => {
  const v = new Vector3();
  for (const i of new Set(LINES[abbr])) v.add(qVec(EQ[i * 2], EQ[i * 2 + 1], 1));
  v.normalize();
  return { ra: ((Math.atan2(-v.z, v.x) / DEG) + 360) % 360, dec: Math.asin(v.y) / DEG };
};
const FIG_C = Object.fromEntries(FIGURES.map((f) => [f.abbr, figCenter(f.abbr)]));

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
function starPoints(r, dpr, sizeK = 1) {
  const pos = new Float32Array(N_STARS * 3), tint = new Float32Array(N_STARS * 3), size = new Float32Array(N_STARS);
  for (let i = 0; i < N_STARS; i++) {
    const v = qVec(EQ[i * 2], EQ[i * 2 + 1], r);
    pos.set([v.x, v.y, v.z], i * 3);
    const mag = STARS[i * 4 + 2], b = MathUtils.clamp(1.15 - mag * 0.16, 0.28, 1.3), c = bvColor(STARS[i * 4 + 3]);
    tint.set([c[0] / 255 * b, c[1] / 255 * b, c[2] / 255 * b], i * 3);
    size[i] = MathUtils.clamp(8.2 - mag * 1.25, 1.6, 10) * sizeK * (i === POLARIS ? 1.5 : 1);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('tint', new Float32BufferAttribute(tint, 3));
  g.setAttribute('size', new Float32BufferAttribute(size, 1));
  return new Points(g, starMaterial(dpr));
}
function figLines(r, pick, color, opacity) {
  const pts = [];
  for (const f of FIGURES) {
    if (!pick(f)) continue;
    for (const i of LINES[f.abbr]) { const v = qVec(EQ[i * 2], EQ[i * 2 + 1], r); pts.push(v.x, v.y, v.z); }
  }
  const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
  return new LineSegments(g, new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
}
const lineGeo = (pts) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return g; };
// 在 u、v 兩個單位向量張成的平面上，從 u 轉到 v 的圓弧
function arcPts(center, u, v, r, n = 40) {
  const ang = u.angleTo(v), w = new Vector3().crossVectors(u, v).normalize(), out = [];
  if (!(w.lengthSq() > 0)) return [center.clone().addScaledVector(u, r)];
  for (let k = 0; k <= n; k++) out.push(center.clone().addScaledVector(u.clone().applyAxisAngle(w, (ang * k) / n), r));
  return out;
}
// 天球上赤緯 dec 的一圈（在 spin 群組裡）
function decRing(dec, r, mat) {
  const pts = [];
  for (let k = 0; k <= 180; k++) pts.push(qVec((k / 180) * 360, dec, r));
  const l = new Line(lineGeo(pts), mat);
  if (mat.isLineDashedMaterial) l.computeLineDistances();
  return l;
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), chartCv = $('.ns-chart-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const state = { t: Date.now(), tod: 20 * 60, playing: false, speed: 0.0416667, view: 'space', place: 'changhua', lat: PLACES.changhua.lat, trails: true, lines: true, ruler: true, year: null };
  const P = () => PLACES[state.place];

  // ================= 場景一：從太空看 =================
  let sceneA, sceneB, camera, controls, spinE, geoG, sunLight, tiltG, spinSky, ringsG, arcB, groundTop;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    camera = new PerspectiveCamera(45, 1.6, 0.05, 2000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;

    sceneA = new Scene(); sceneA.background = new Color(0x03050d);
    sceneA.add(new AmbientLight(0xc8d4ff, 0.75));   // 這個視角講的是幾何，不是晝夜：夜側也要看得清楚
    sunLight = new DirectionalLight(0xfff4e0, 2.0); sceneA.add(sunLight);
    sceneA.add(starPoints(RS, dpr));
    sceneA.add(figLines(RS * 0.995, (f) => !HOT.has(f.abbr), 0x7f9fe0, 0.28));
    sceneA.add(figLines(RS * 0.995, (f) => HOT.has(f.abbr), 0x9fe8de, 0.9));
    // 地軸：從南邊一路畫到天球北極（北極星就在旁邊 0.6°）
    {
      const g = lineGeo([new Vector3(0, -RE * 1.7, 0), new Vector3(0, RS * 0.99, 0)]);
      const l = new Line(g, new LineDashedMaterial({ color: 0xffffff, dashSize: 1.2, gapSize: 0.8, transparent: true, opacity: 0.6 }));
      l.computeLineDistances(); sceneA.add(l);
      sceneA.add(new Line(lineGeo([new Vector3(0, -RE * 1.25, 0), new Vector3(0, RE * 1.25, 0)]), new LineBasicMaterial({ color: 0xffffff })));
    }
    spinE = new Group(); sceneA.add(spinE);
    spinE.add(new Mesh(new SphereGeometry(RE, 96, 64), new MeshLambertMaterial({ map: makeRealEarth() })));
    spinE.add(new Mesh(new SphereGeometry(RE * 1.01, 64, 48), new MeshLambertMaterial({ map: makeClouds(), transparent: true, depthWrite: false, opacity: 0.6 })));
    sceneA.add(new Mesh(new SphereGeometry(RE * 1.08, 48, 32), atmosphereMaterial()));
    // 赤道
    {
      const pts = []; for (let k = 0; k <= 128; k++) { const a = (k / 128) * TAU; pts.push(new Vector3(RE * 1.004 * Math.cos(a), 0, RE * 1.004 * Math.sin(a))); }
      spinE.add(new Line(lineGeo(pts), new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 })));
    }
    geoG = new Group(); spinE.add(geoG);

    // ================= 場景二：你的天空 =================
    sceneB = new Scene(); sceneB.background = new Color(0x03050d);
    tiltG = new Group(); sceneB.add(tiltG);
    spinSky = new Group(); tiltG.add(spinSky);
    spinSky.add(starPoints(RG * 0.99, dpr, 0.85));
    spinSky.add(figLines(RG * 0.985, (f) => !HOT.has(f.abbr), 0x7f9fe0, 0.3));
    spinSky.add(figLines(RG * 0.985, (f) => HOT.has(f.abbr), 0x9fe8de, 0.95));
    spinSky.add(decRing(0, RG * 0.99, new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.35, gapSize: 0.3, transparent: true, opacity: 0.5 })));
    ringsG = new Group(); spinSky.add(ringsG);
    // 天軸（穿過觀測者，指向北極星）
    tiltG.add(new Mesh(new CylinderGeometry(0.045, 0.045, RG * 2.24, 10), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })));
    // 天球外殼、地面、地平圈
    sceneB.add(new Mesh(new SphereGeometry(RG, 48, 32), new MeshBasicMaterial({ color: 0x3a5a9a, transparent: true, opacity: 0.07, side: BackSide, depthWrite: false })));
    groundTop = new Mesh(new CircleGeometry(RG, 96).rotateX(-Math.PI / 2), new MeshBasicMaterial({ color: 0x1d3a2a, transparent: true, opacity: 0.88, side: DoubleSide }));
    sceneB.add(groundTop);
    {
      const pts = []; for (let k = 0; k <= 128; k++) { const a = (k / 128) * TAU; pts.push(new Vector3(RG * Math.cos(a), 0.01, RG * Math.sin(a))); }
      sceneB.add(new Line(lineGeo(pts), new LineBasicMaterial({ color: 0x9fd8a8, transparent: true, opacity: 0.8 })));
      sceneB.add(new Line(lineGeo([new Vector3(0, 0.02, 0), new Vector3(0, 0.02, -RG)]), new LineBasicMaterial({ color: 0xff8a6b })));
    }
    // 觀測者
    const you = new Group(); sceneB.add(you);
    you.add(new Mesh(new CylinderGeometry(0.16, 0.22, 0.8, 16).translate(0, 0.4, 0), new MeshBasicMaterial({ color: 0xff5a36 })));
    you.add(new Mesh(new SphereGeometry(0.17, 16, 12).translate(0, 0.98, 0), new MeshBasicMaterial({ color: 0xffb4a0 })));
    arcB = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e })); sceneB.add(arcB);
  }

  // 太空視角：依地點重畫地平面、北方線、北極星線與兩個角
  function buildGeo() {
    if (!renderer) return;
    geoG.clear();
    const p = P(), up = localOf(p.lat, p.lon, 1), pin = up.clone().multiplyScalar(RE * 1.003);
    const Y = new Vector3(0, 1, 0);
    const north = Y.clone().addScaledVector(up, -up.dot(Y)).normalize();
    const disc = new Mesh(new CircleGeometry(0.95, 48), new MeshBasicMaterial({ color: 0x4fd18a, transparent: true, opacity: 0.35, side: DoubleSide, depthWrite: false }));
    disc.position.copy(pin); disc.lookAt(pin.clone().add(up)); geoG.add(disc);
    geoG.add(new Mesh(new SphereGeometry(0.07, 16, 12).translate(pin.x, pin.y, pin.z), new MeshBasicMaterial({ color: 0xff5a36 })));
    // 線與角畫在最上層（不被地球擋住），全部用管子畫，手機上也看得清楚
    const tube = (pts, c, r = 0.022) => {
      const m = new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), Math.max(2, pts.length), r, 8), new MeshBasicMaterial({ color: c, depthTest: false, transparent: true }));
      m.renderOrder = 5; return m;
    };
    const seg = (a, b) => [a, a.clone().lerp(b, 0.5), b];
    geoG.add(tube(seg(pin, pin.clone().addScaledVector(north, 1.5)), 0xff8a6b));        // 地平線上的北方
    geoG.add(tube(seg(pin, pin.clone().addScaledVector(Y, 2.4)), 0xffffff));            // 往北極星（和地軸平行）
    geoG.add(tube(arcPts(pin, north, Y, 0.75), 0xffd36e, 0.04));
    // 地心：赤道面方向 → 地點方向，夾角就是緯度
    const eq = new Vector3(up.x, 0, up.z).normalize();
    geoG.add(tube(seg(new Vector3(), eq.clone().multiplyScalar(RE * 1.3)), 0xdfe8ff));
    geoG.add(tube(seg(new Vector3(), pin), 0xdfe8ff));
    geoG.add(tube(arcPts(new Vector3(), eq, up, RE * 0.55), 0xffd36e, 0.04));
    geoG.userData = { pin, north, up, eq };
  }
  // 你的天空：依緯度傾斜天球、重畫永不落下／永不升起的圈與高度角
  let ringLat = null;
  function tiltSky(lat) {
    if (!renderer) return;
    const ph = lat * DEG;
    const IY = new Vector3(0, Math.sin(ph), -Math.cos(ph));      // 天極
    const IX = new Vector3(0, Math.cos(ph), Math.sin(ph));       // 天赤道在子午線上的點
    const IZ = new Vector3(-1, 0, 0);                            // 西
    tiltG.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(IX, IY, IZ));
    if (ringLat === null || Math.abs(ringLat - lat) > 0.3) {
      ringLat = lat;
      ringsG.clear();
      const c = 90 - Math.abs(lat), s = lat >= 0 ? 1 : -1;
      if (c > 0.5) {
        ringsG.add(decRing(s * c, RG * 0.995, new LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.9 })));
        ringsG.add(decRing(-s * c, RG * 0.995, new LineBasicMaterial({ color: 0xff7a6b, transparent: true, opacity: 0.55 })));
      }
    }
    const pole = lat >= 0 ? IY.clone() : IY.clone().negate();
    const horiz = new Vector3(0, 0, lat >= 0 ? -1 : 1);
    arcB.geometry.dispose();
    arcB.geometry = lineGeo(arcPts(new Vector3(0, 0.03, 0), horiz, pole, 3.2));
  }

  // ---------------- 時間軸 ----------------
  const dateSl = $('.ns-date-sl'), timeSl = $('.ns-time'), track = $('.ns-track');
  const yearStart = (y) => Date.UTC(y, 0, 1) - P().tz * HOUR;
  function setYear(y, force) {
    if (state.year === y && !force) return;
    state.year = y;
    track.innerHTML = '';
    const s0 = yearStart(y), len = yearStart(y + 1) - s0;
    for (let m = 0; m < 12; m++) {
      const el = document.createElement('span'); el.className = 'ec-tick'; el.style.left = `${((Date.UTC(y, m, 1) - P().tz * HOUR - s0) / len) * 100}%`; el.textContent = `${m + 1}月`;
      track.appendChild(el);
    }
    SEASON_JUMP.forEach(([m, zh, en, sz], i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'se-mark';
      b.style.left = `${((locDate(P().tz, y, m, 15).getTime() - s0) / len) * 100}%`;
      b.textContent = sz; b.title = `Handle points ${en} · 斗柄${zh}指（${m}/15 20:00）`;
      b.addEventListener('click', () => jumpSeason(i));
      track.appendChild(b);
    });
    dateSl.max = String(Math.round(len / HOUR));
  }
  const fast = () => state.playing && state.speed >= 1;
  function clockDate() {
    if (!fast()) return new Date(state.t);
    const x = loc(new Date(state.t), P().tz);
    return locDate(P().tz, x.y, x.m, x.d, 0, state.tod);
  }

  // ---------------- 3D 標籤 ----------------
  const lab = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; labels.appendChild(s); return s; };
  const L = renderer ? {
    polA: lab('ns-pol', '&#9733; North Star · 北極星'), axis: lab('pol', "Earth's axis · 地軸"),
    you: lab('place', ''), northA: lab('ns-n', 'North on the ground · 地平線上的北方'),
    altA: lab('ns-ang', ''), latA: lab('ns-ang', ''),
    uma: lab('cst zod', 'Big Dipper<small>北斗七星</small>'), cas: lab('cst zod', 'Cassiopeia<small>仙后座</small>'), umi: lab('cst zod', 'Little Dipper<small>小熊座</small>'),
    polB: lab('ns-pol', '&#9733; North Star · 北極星'), altB: lab('ns-ang', ''), youB: lab('place', 'You · 你'),
    never: lab('ns-never', 'Never sets · 永不落下'), nrise: lab('ns-nrise', 'Never rises · 永不升起'),
    dirs: [['N', '北', 0, -1], ['E', '東', 1, 0], ['S', '南', 0, 1], ['W', '西', -1, 0]].map(([en, zh, x, z]) => ({ el: lab('ns-dir', `${en} ${zh}`), v: new Vector3(x * RG * 1.08, 0, z * RG * 1.08) })),
  } : null;
  const proj = new Vector3(), tmp = new Vector3();
  function place(el, v, dy = 6, show = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > 1.05 || Math.abs(proj.y) > 1.05;
    el.style.opacity = off ? 0 : 1;
    if (off) return;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  function updateLabels() {
    const A = state.view === 'space', p = P(), north = p.lat >= 0;
    const polV = qVec(EQ[POLARIS * 2], EQ[POLARIS * 2 + 1], 1);
    place(L.polA, polV.clone().multiplyScalar(RS), -26, A);
    place(L.axis, tmp.set(0, RE * 1.45, 0), -10, A);
    for (const [el, abbr] of [[L.uma, 'UMa'], [L.cas, 'Cas'], [L.umi, 'UMi']]) {
      const c = FIG_C[abbr];
      if (A) place(el, qVec(c.ra, c.dec, RS), 10, true);
      else { const v = qVec(c.ra, c.dec, RG); spinSky.localToWorld(v); place(el, v, 10, v.y > -0.5); }
    }
    if (A) {
      const g = geoG.userData;
      L.you.textContent = `${p.en} · ${p.zh}`;
      place(L.you, spinE.localToWorld(g.pin.clone().addScaledVector(g.up, 0.35).addScaledVector(g.north, -0.55)), 4, true);
      place(L.northA, spinE.localToWorld(g.pin.clone().addScaledVector(g.north, 1.6)), 14, true);
      L.altA.innerHTML = `${Math.round(p.lat)}° up · 高 ${Math.round(p.lat)}°`;
      if (!north) L.altA.style.opacity = 0; else place(L.altA, spinE.localToWorld(g.pin.clone().addScaledVector(new Vector3(0, 1, 0), 1.3).addScaledVector(g.north, -0.9)), -10, true);
      L.latA.innerHTML = `Latitude ${Math.abs(Math.round(p.lat))}°${north ? 'N' : 'S'} · ${north ? '北' : '南'}緯 ${Math.abs(Math.round(p.lat))}°`;
      place(L.latA, spinE.localToWorld(g.eq.clone().add(g.up).normalize().multiplyScalar(RE * 0.3)), 6, true);
    } else {
      [L.you, L.northA, L.altA, L.latA].forEach((el) => { el.style.opacity = 0; });
    }
    const B = !A;
    const pv = polV.clone().multiplyScalar(RG); spinSky.localToWorld(pv);
    place(L.polB, pv, -26, B && pv.y > -0.2);
    L.altB.textContent = `${Math.abs(Math.round(state.lat))}°`;
    const ph = state.lat * DEG;
    place(L.altB, tmp.set(0, 3.5 * Math.sin(Math.abs(ph) / 2) + 0.3, (north ? -1 : 1) * 3.5 * Math.cos(Math.abs(ph) / 2)), -8, B);
    place(L.youB, tmp.set(0, 1.3, 0), -30, B);
    const c = 90 - Math.abs(state.lat);
    const nv = qVec(0, (north ? 1 : -1) * c, RG); spinSky.localToWorld(nv);
    place(L.never, nv, 0, B && c > 3 && Math.abs(state.lat) < 85);
    const rv = qVec(180, (north ? -1 : 1) * c, RG); spinSky.localToWorld(rv);
    place(L.nrise, rv, 0, B && c > 3 && Math.abs(state.lat) < 85);
    L.dirs.forEach((d) => place(d.el, d.v, -8, B));
  }

  // ---------------- 更新 ----------------
  const R = { date: $('.ns-date'), place: $('.ns-place'), pol: $('.ns-polaris'), never: $('.ns-never-t'), dip: $('.ns-dipper'), badge: $('.ns-badge'), cap: $('.ns-chart-cap') };
  function update() {
    const date = clockDate(), p = P(), x = loc(date, p.tz);
    setYear(x.y);
    const gm = E.gmst(date);
    if (renderer) {
      spinE.rotation.y = gm * DEG;
      const s = E.sunEquatorial(date);
      sunLight.position.copy(qVec(s.ra, s.dec, 50));
      spinSky.rotation.y = -(gm + p.lon) * DEG;
    }
    readout(date, x);
    drawChart(date);
    const s0 = yearStart(x.y);
    dateSl.value = String(Math.round((state.t - s0) / HOUR));
    dateSl.style.setProperty('--p', `${((state.t - s0) / (yearStart(x.y + 1) - s0)) * 100}%`);
    timeSl.value = String(x.h * 60 + x.mi);
    timeSl.style.setProperty('--p', `${((x.h * 60 + x.mi) / 1440) * 100}%`);
  }

  function readout(date, x) {
    const p = P(), north = p.lat >= 0;
    R.date.innerHTML = `${MON[x.m - 1]} ${x.d}, ${x.y} · ${pad(x.h)}:${pad(x.mi)}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）${pad(x.h)}:${pad(x.mi)} ${p.tz === 8 ? '台灣時間' : `當地時間（UTC${p.tz >= 0 ? '+' : ''}${p.tz}）`}</span>`;
    R.place.textContent = `${p.en} · ${p.zh}（${Math.abs(p.lat).toFixed(1)}°${north ? 'N' : 'S'}）`;
    const pa = altAz(EQ[POLARIS * 2], EQ[POLARIS * 2 + 1], date, p).alt;
    if (pa > 4) R.pol.innerHTML = `${pa.toFixed(1)}° up, ${fistTxt(pa)}<span>高 ${pa.toFixed(1)}°，約 ${half(fists(pa))} 個拳頭</span>`;
    else if (pa > -1.5) R.pol.innerHTML = `${Math.max(0, pa).toFixed(1)}° up: right on the horizon<span>高 ${Math.max(0, pa).toFixed(1)}°，就貼在地平線上，常被霧氣擋住</span>`;
    else R.pol.innerHTML = 'Below the horizon: face south instead<span>在地平線下看不到；改面向南方找南十字</span>';
    const c = 90 - Math.abs(p.lat);
    const dipNever = north && c < 49.3;       // 北斗最南的星（搖光）赤緯約 49.3°：北緯 40.7° 以上才整夜不落
    R.never.innerHTML = Math.abs(p.lat) > 89 ? 'Every star: nothing rises or sets<span>所有星星都不升不落，只在頭頂繞圈</span>'
      : `Stars within ${Math.abs(p.lat).toFixed(0)}° of the ${north ? 'North Star' : 'south pole of the sky'}<span>離${north ? '北極星' : '南天極'} ${Math.abs(p.lat).toFixed(0)}° 以內的星（等於緯度）；${!north ? '北斗七星在這裡根本看不到' : dipNever ? '北斗七星整夜都在' : '北斗七星會落下'}</span>`;
    const h = handleDir(date, p);
    const cas = altAz(FIG_C.Cas.ra, FIG_C.Cas.dec, date, p).alt;
    const nUp = starsUp('UMa', date, p);
    const season = ['（春）', '（夏）', '（秋）', '（冬）'][h.k];
    // 「斗柄指四季」是中緯度黃昏的說法：北斗很低或在北極點時，不硬套季節
    const polar = Math.abs(p.lat) > 80;
    if (nUp === 7 && !polar) R.dip.innerHTML = `All 7 stars up; the handle points ${h.en}<span>七顆都在天上；斗柄${h.zh}指${season}</span>`;
    else if (nUp === 7) R.dip.innerHTML = 'All 7 stars up, circling level with the horizon<span>七顆都在天上，和地平線平行地繞圈</span>';
    else if (nUp > 0) R.dip.innerHTML = `Low: ${nUp} of 7 stars above the horizon<span>很低，七顆只有 ${nUp} 顆在地平線上</span>`;
    else R.dip.innerHTML = `Below the horizon${cas > 8 ? '; use the W of Cassiopeia' : ''}<span>在地平線下${cas > 8 ? '；改用仙后座的 W 找北極星' : ''}</span>`;
    R.cap.textContent = north ? `Facing north from ${p.en} · 在${p.zh}面向北方` : `Facing south from ${p.en} · 在${p.zh}面向南方`;
  }

  // ---------------- 面向北方（南半球面向南方）的星圖 ----------------
  const cctx = chartCv.getContext('2d');
  function drawChart(date) {
    const W = chartCv.width, H = chartCv.height; if (!W) return;
    const p = P(), north = p.lat >= 0, A0 = north ? 0 : 180;
    const a0 = Math.min(62, Math.abs(p.lat) * 0.75 + 12) * DEG;
    const S = W / 2.9, cx = W / 2, cy = H * 0.46, s = W / 400;
    const lst = E.gmst(date) + p.lon;
    const pr = (alt, az) => {
      const a = alt * DEG, dA = wrap180(az - A0) * DEG;
      const cc = Math.sin(a0) * Math.sin(a) + Math.cos(a0) * Math.cos(a) * Math.cos(dA);
      if (cc < -0.3) return null;
      const k = 2 / (1 + cc);
      return [cx + S * k * Math.cos(a) * Math.sin(dA), cy - S * k * (Math.cos(a0) * Math.sin(a) - Math.sin(a0) * Math.cos(a) * Math.cos(dA))];
    };
    const sq = E.sunEquatorial(date), sa = altAz(sq.ra, sq.dec, date, p, lst).alt;
    const dayK = MathUtils.smoothstep(sa, -16, 2), vis = 1 - 0.86 * MathUtils.smoothstep(sa, -12, -1);
    const mix = (a, b) => a.map((v, i) => Math.round(v + (b[i] - v) * dayK));
    const g = cctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, `rgb(${mix([4, 8, 24], [70, 128, 205])})`); g.addColorStop(1, `rgb(${mix([16, 30, 64], [160, 200, 240])})`);
    cctx.fillStyle = g; cctx.fillRect(0, 0, W, H);
    // 星星的地平座標（用今天的赤道座標＋地方恆星時）
    const hz = (i, dl = 0) => altAz(EQ[i * 2], EQ[i * 2 + 1], date, p, lst - dl);
    // 星軌：過去三小時，每 5 分鐘一點
    if (state.trails) {
      cctx.lineWidth = 1.1 * s;
      for (let i = 0; i < N_STARS; i++) {
        const mag = STARS[i * 4 + 2]; if (mag > 3.6) continue;
        const now = hz(i); if (now.alt < -2 || !pr(now.alt, now.az)) continue;
        const c = bvColor(STARS[i * 4 + 3]);
        cctx.strokeStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${0.38 * vis})`;
        cctx.beginPath();
        let on = false;
        for (let k = 0; k <= 36; k++) {
          const h = hz(i, k * 5 / 60 * 15 * SID);
          const q = h.alt > -1 ? pr(h.alt, h.az) : null;
          if (!q) { on = false; continue; }
          if (!on) { cctx.moveTo(q[0], q[1]); on = true; } else cctx.lineTo(q[0], q[1]);
        }
        cctx.stroke();
      }
    }
    // 星座連線
    if (state.lines) {
      for (const f of FIGURES) {
        const hot = HOT.has(f.abbr), segs = LINES[f.abbr];
        cctx.strokeStyle = hot ? `rgba(159,232,222,${0.95 * vis})` : `rgba(130,165,235,${0.45 * vis})`;
        cctx.lineWidth = (hot ? 1.6 : 1) * s;
        cctx.beginPath();
        for (let k = 0; k < segs.length; k += 2) {
          const a = hz(segs[k]), b = hz(segs[k + 1]);
          if (a.alt < -8 || b.alt < -8) continue;
          const qa = pr(a.alt, a.az), qb = pr(b.alt, b.az);
          if (!qa || !qb) continue;
          cctx.moveTo(qa[0], qa[1]); cctx.lineTo(qb[0], qb[1]);
        }
        cctx.stroke();
      }
      // 指極星：天璇 → 天樞，延長到北極星
      if (north) {
        const m = hz(idxOf('Merak')), d = hz(idxOf('Dubhe')), po = hz(POLARIS);
        const qm = pr(m.alt, m.az), qd = pr(d.alt, d.az), qp = pr(po.alt, po.az);
        if (qm && qd && qp && d.alt > -8) {
          cctx.strokeStyle = `rgba(255,211,110,${0.8 * Math.max(vis, 0.5)})`; cctx.lineWidth = 1.3 * s; cctx.setLineDash([5 * s, 4 * s]);
          cctx.beginPath(); cctx.moveTo(qm[0], qm[1]); cctx.lineTo(qp[0], qp[1]); cctx.stroke(); cctx.setLineDash([]);
        }
      }
    }
    // 星星
    for (let i = N_STARS - 1; i >= 0; i--) {
      const h = hz(i); if (h.alt < -8) continue;
      const q = pr(h.alt, h.az); if (!q || q[0] < -10 || q[0] > W + 10 || q[1] < -10 || q[1] > H + 10) continue;
      const mag = STARS[i * 4 + 2], c = bvColor(STARS[i * 4 + 3]);
      const r = Math.max(0.6, (5.4 - mag) * 0.6) * s * (i === POLARIS ? 1.35 : 1);
      const ext = MathUtils.smoothstep(h.alt, 0, 10) * 0.55 + 0.45;
      cctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.min(1, (0.35 + (5 - mag) * 0.17) * vis * ext)})`;
      cctx.beginPath(); cctx.arc(q[0], q[1], r, 0, TAU); cctx.fill();
    }
    // 地面（半透明，地平線下的星還隱約看得到，提醒「它們只是落下去了」）
    cctx.beginPath();
    let first = true;
    for (let k = -110; k <= 110; k += 2) {
      const q = pr(0, A0 + k); if (!q) continue;
      if (first) { cctx.moveTo(q[0], q[1]); first = false; } else cctx.lineTo(q[0], q[1]);
    }
    cctx.lineTo(W + 20, H + 20); cctx.lineTo(-20, H + 20); cctx.closePath();
    cctx.fillStyle = `rgba(${mix([20, 40, 30], [70, 110, 75])},.86)`; cctx.fill();
    cctx.strokeStyle = 'rgba(159,216,168,.85)'; cctx.lineWidth = 1.5 * s; cctx.stroke();
    const font = (px, wt = 700) => `${wt} ${Math.round(px * s)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    cctx.textAlign = 'center'; cctx.textBaseline = 'middle';
    // 方位
    cctx.font = font(12, 800); cctx.fillStyle = '#e8edf7';
    for (const [dA, en, zh] of (north ? [[0, 'N', '北'], [-45, 'NW', '西北'], [45, 'NE', '東北'], [-90, 'W', '西'], [90, 'E', '東']] : [[0, 'S', '南'], [-45, 'SE', '東南'], [45, 'SW', '西南'], [-90, 'E', '東'], [90, 'W', '西']])) {
      const q = pr(0, A0 + dA); if (!q || q[0] < 14 || q[0] > W - 14) continue;
      cctx.fillText(`${en} ${zh}`, q[0], Math.min(H - 10 * s, q[1] + 14 * s));
    }
    // 拳頭量角尺：從地平線量到天極
    const poleAlt = Math.abs(p.lat);
    if (state.ruler && poleAlt > 3) {
      const base = pr(0, A0), top = pr(poleAlt, A0);
      if (base && top) {
        const x0 = base[0] - 26 * s;
        cctx.strokeStyle = 'rgba(255,211,110,.9)'; cctx.fillStyle = 'rgba(255,211,110,.95)'; cctx.lineWidth = 1.4 * s;
        const tip = pr(Math.min(poleAlt, 89.5), A0);
        cctx.beginPath(); cctx.moveTo(x0, base[1]); cctx.lineTo(x0, tip[1]); cctx.stroke();
        cctx.font = font(9.5, 800); cctx.textAlign = 'right';
        for (let a = 10; a < poleAlt - 2; a += 10) {
          const q = pr(a, A0);
          cctx.beginPath(); cctx.moveTo(x0 - 5 * s, q[1]); cctx.lineTo(x0 + 5 * s, q[1]); cctx.stroke();
          cctx.fillText(`${a / 10}✊`, x0 - 7 * s, q[1]);
        }
        cctx.textAlign = 'center';
      }
    }
    // 名稱
    cctx.font = font(10.5, 800);
    for (const f of FIGURES) {
      const c = FIG_C[f.abbr], h = altAz(c.ra, c.dec, date, p, lst);
      if (h.alt < 3) continue;
      const q = pr(h.alt, h.az); if (!q || q[0] < 20 || q[0] > W - 20 || q[1] < 10) continue;
      cctx.fillStyle = HOT.has(f.abbr) ? `rgba(185,255,244,${Math.max(vis, 0.6)})` : `rgba(170,200,255,${0.8 * Math.max(vis, 0.5)})`;
      cctx.fillText(f.zh, q[0], q[1] - 12 * s);
    }
    const po = hz(POLARIS), qp = pr(po.alt, po.az);
    if (north && qp && po.alt > -1) {
      cctx.font = font(11, 800); cctx.fillStyle = '#ffe3a3';
      cctx.fillText('North Star 北極星', qp[0], qp[1] - 13 * s);
    }
    if (!north) {
      const cr = hz(idxOf('Acrux')), q = pr(cr.alt, cr.az);
      if (q && cr.alt > 0) { cctx.font = font(10.5, 800); cctx.fillStyle = '#ffe3a3'; cctx.fillText('Southern Cross 南十字', q[0], q[1] + 16 * s); }
    }
  }

  // ---------------- 相機 ----------------
  // 太空視角：相機固定在地球上（跟著自轉），從地點的東邊看子午面，兩個角都是正面
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  function spaceGoal() {
    spinE.updateMatrixWorld();
    const p = P(), lon = p.lon * DEG;
    const east = new Vector3(-Math.sin(lon), 0, -Math.cos(lon)), up = localOf(p.lat, p.lon, 1);
    const mid = up.clone().multiplyScalar(RE * 0.6).add(new Vector3(0, 0.7, 0));
    return { pos: spinE.localToWorld(east.multiplyScalar(7.2).add(mid).add(new Vector3(0, 0.4, 0))), tgt: spinE.localToWorld(mid) };
  }
  // 從東邊側看（北方在畫面右邊），天軸的傾斜角與永不落下的圈都是正面
  const SKY_CAM = { pos: new Vector3(20, 6.5, 4.5), tgt: new Vector3(0, 1.2, -0.8) };
  function camGoal() { return state.view === 'space' ? spaceGoal() : { pos: SKY_CAM.pos.clone(), tgt: SKY_CAM.tgt.clone() }; }
  function setView(v) {
    state.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    if (!renderer) return;
    root.classList.toggle('ns-skyview', v === 'sphere');
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
    controls.minDistance = v === 'space' ? 3 : 6; controls.maxDistance = v === 'space' ? 60 : 60;
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (camera.aspect < 1.1 ? 70 : 58) * DEG;
        camera.fov = Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
        camera.updateProjectionMatrix();
      }
    }
    const pw = chartCv.parentElement.clientWidth;
    if (pw) { chartCv.width = Math.round(pw * dpr); chartCv.height = Math.round(pw * 0.86 * dpr); update(); }
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(chartCv.parentElement);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(pl) {
    if (pl) { const x = loc(new Date(state.t), P().tz); state.tod = x.h * 60 + x.mi; }
    else if (state.playing) state.t = clockDate().getTime();
    state.playing = pl; root.classList.toggle('is-playing', pl);
    playBtn.setAttribute('aria-pressed', pl ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = pl ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setSpeed(v) {
    state.speed = v;
    $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', Math.abs(parseFloat(b.dataset.speed) - v) < 1e-6 ? 'true' : 'false'));
  }
  // 太空視角的相機跟著地球轉：換時間前記下相機在地球座標裡的位置，換完放回去
  function setT(t, badge = '') {
    const follow = renderer && state.view === 'space' && camT >= 1;
    const pL = follow ? spinE.worldToLocal(camera.position.clone()) : null, tL = follow ? spinE.worldToLocal(controls.target.clone()) : null;
    state.t = t; R.badge.hidden = !badge; if (badge) R.badge.querySelector('b').textContent = badge;
    update();
    if (follow) { spinE.updateMatrixWorld(); camera.position.copy(spinE.localToWorld(pL)); controls.target.copy(spinE.localToWorld(tL)); }
  }
  const tonight = () => { const p = P(), x = loc(new Date(), p.tz); return locDate(p.tz, x.y, x.m, x.d, 20).getTime(); };
  function jumpSeason(i) {
    setPlaying(false);
    const y = state.year || loc(new Date(), P().tz).y;
    setT(locDate(P().tz, y, SEASON_JUMP[i][0], 15, 20).getTime());
    $$('.ns-season').forEach((b) => b.classList.toggle('on', +b.dataset.season === i));
  }
  function setPlace(k) {
    // 換地點時保留「當地的鐘點」：彰化晚上八點 → 特羅姆瑟也是晚上八點
    const old = loc(new Date(state.t), P().tz);
    state.place = k;
    $$('.ns-where button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.place === k ? 'true' : 'false'));
    buildGeo();
    setYear(old.y, true);
    if (renderer && state.view === 'space') { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; }
    setT(locDate(P().tz, old.y, old.m, old.d, old.h, old.mi).getTime(), R.badge.hidden ? '' : R.badge.querySelector('b').textContent);
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.ns-season').forEach((b) => b.addEventListener('click', () => jumpSeason(+b.dataset.season)));
  $$('.ns-where button[data-place]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.place !== 'mine') { setPlace(b.dataset.place); return; }
    // 我的位置：只在瀏覽器裡用，不送到任何地方
    const msg = $('.ns-geo-msg');
    if (!navigator.geolocation) { msg.hidden = false; msg.textContent = 'This browser cannot share its location. · 這個瀏覽器無法提供位置。'; return; }
    msg.hidden = false; msg.textContent = 'Finding your location… · 正在取得位置…';
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = Math.max(-89.9, Math.min(89.99, pos.coords.latitude)), lon = pos.coords.longitude;
      PLACES.mine = { lat, lon, tz: -new Date().getTimezoneOffset() / 60, en: 'Your location', zh: '你的位置' };
      msg.hidden = true; setPlace('mine');
    }, () => { msg.textContent = 'Location was not shared, so the other places still work. · 沒有取得位置；其他地點照常可用。'; }, { timeout: 12000, maximumAge: 600000 });
  }));
  const clearChips = () => $$('.ns-season').forEach((b) => b.classList.remove('on'));
  dateSl.addEventListener('input', () => {
    setPlaying(false); clearChips();
    const tz = P().tz, x = loc(new Date(state.t), tz), y = loc(new Date(yearStart(state.year) + parseFloat(dateSl.value) * HOUR), tz);
    setT(locDate(tz, y.y, y.m, y.d, x.h, x.mi).getTime());
  });
  timeSl.addEventListener('input', () => {
    setPlaying(false); clearChips();
    const tz = P().tz, x = loc(new Date(state.t), tz);
    setT(locDate(tz, x.y, x.m, x.d, 0, parseFloat(timeSl.value)).getTime());
  });
  $('.ns-now').addEventListener('click', () => { setPlaying(false); clearChips(); setT(Date.now(), 'Now · 現在'); });
  $('.ns-tonight').addEventListener('click', () => { setPlaying(false); clearChips(); setT(tonight(), 'Tonight 8 p.m. · 今晚 8 點'); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="trails"]', (v) => { state.trails = v; });
  bind('[data-t="lines"]', (v) => { state.lines = v; });
  bind('[data-t="ruler"]', (v) => { state.ruler = v; });
  if (renderer) $('.al-home').addEventListener('click', () => { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setT(state.t + dt * state.speed * DAY);
    if (renderer) {
      // 換地點時，天球的傾斜慢慢轉過去（像搭飛機往北或往南飛）
      const goal = P().lat;
      if (Math.abs(state.lat - goal) > 0.01) { const d = goal - state.lat; state.lat += Math.sign(d) * Math.min(Math.abs(d), Math.max(0.4, Math.abs(d) * 4 * dt)); }
      tiltSky(state.lat);
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.1);
        const k = MathUtils.smootherstep(camT, 0, 1), goalC = camGoal();
        camera.position.lerpVectors(camFrom, goalC.pos, k);
        controls.target.lerpVectors(tgtFrom, goalC.tgt, k);
      }
      controls.update();
      const sc = state.view === 'space' ? sceneA : sceneB;
      sc.updateMatrixWorld();
      updateLabels();
      renderer.render(sc, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  buildGeo();
  setYear(loc(new Date(), 8).y);
  // 一打開：天黑了就是「現在」，還是白天就跳到今晚八點
  const sq = E.sunEquatorial(new Date());
  if (altAz(sq.ra, sq.dec, new Date(), P()).alt < -6) setT(Date.now(), 'Now · 現在'); else setT(tonight(), 'Tonight 8 p.m. · 今晚 8 點');
  resize();
  if (renderer) {
    sceneA.updateMatrixWorld(); tiltSky(state.lat);
    const g0 = spaceGoal(); camera.position.copy(g0.pos); controls.target.copy(g0.tgt);
  }
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying, setView, setPlace, jumpSeason, update };   // 除錯用：$('[data-north-lab]').__lab
  return { jumpSeason, setPlace };
}

// ---------------------------------------------------------------------------
// 頁面下方「今晚在彰化找北方」：晚上八點北極星、北斗、仙后座在哪裡
function renderTonight(box) {
  const site = PLACES.changhua, now = new Date(), x = loc(now, 8);
  const at = locDate(8, x.y, x.m, x.d, 20);
  const h = (ra, dec) => altAz(ra, dec, at, site);
  const po = h(EQ[POLARIS * 2], EQ[POLARIS * 2 + 1]);
  const dip = handleDir(at, site);
  const uma = h(FIG_C.UMa.ra, FIG_C.UMa.dec), cas = h(FIG_C.Cas.ra, FIG_C.Cas.dec);
  const nUma = starsUp('UMa', at, site), nCas = starsUp('Cas', at, site);
  const side = (a) => (wrap180(a.az) > 0 ? ['east (right)', '東邊（右手邊）'] : ['west (left)', '西邊（左手邊）']);
  const card = (ico, t, zh, en, enzh) => `<div class="tn-item"><span class="tn-ico" aria-hidden="true">${ico}</span><div><h3>${t}<span class="zh">${zh}</span></h3><p>${en}<span class="zh">${enzh}</span></p></div></div>`;
  const out = [card('&#9733;', 'The North Star', '北極星', `Face due north and look ${po.alt.toFixed(0)}° up, ${fistTxt(po.alt)} above the horizon. It stays in this spot all night, every night.`, `面向正北，抬頭 ${po.alt.toFixed(0)}°，約 ${half(fists(po.alt))} 個拳頭高。它整晚、每晚都在這個位置。`)];
  if (nUma === 7) {
    const [s, sz] = side(uma);
    out.push(card('&#10022;', 'The Big Dipper', '北斗七星', `Up in the north, toward the ${s}, ${fistTxt(uma.alt)} high. The handle points ${dip.en}. Follow the two pointer stars at the end of the bowl to the North Star.`, `在北方偏${sz}，約 ${half(fists(uma.alt))} 個拳頭高；斗柄${dip.zh}指。順著斗杓末端的兩顆指極星（天璇→天樞）延長約五倍，就找到北極星。`));
  } else if (nUma > 0) {
    out.push(card('&#10022;', 'The Big Dipper is low', '北斗七星很低', `Only ${nUma} of its 7 stars are above the northern horizon at 8 p.m., and trees or buildings may hide them. The handle points ${dip.en}.`, `晚上八點七顆星只有 ${nUma} 顆在北方地平線上，容易被樹或房子擋住；斗柄${dip.zh}指。`));
  } else {
    out.push(card('&#10022;', 'The Big Dipper is down', '北斗七星在地平線下', 'At 8 p.m. the Big Dipper has dipped below the northern horizon. In Taiwan this happens on autumn and winter evenings.', '晚上八點北斗七星落到北方地平線下了；在台灣，秋冬的晚上常常如此。'));
  }
  if (nCas >= 4) {
    const [s, sz] = side(cas);
    out.push(card('W', 'Cassiopeia', '仙后座', `A bright W toward the ${s}, ${fistTxt(cas.alt)} high. The North Star lies about halfway between the W and the Big Dipper.`, `北方偏${sz}的 W 字形，約 ${half(fists(cas.alt))} 個拳頭高。北極星大約在 W 與北斗七星的中間。`));
  } else {
    out.push(card('W', 'Cassiopeia is low', '仙后座太低', 'The W of Cassiopeia is below or near the horizon at 8 p.m., so tonight the Big Dipper is the better guide.', '晚上八點仙后座在地平線附近或以下，今晚用北斗七星找比較容易。'));
  }
  box.innerHTML = `<p class="tn-when">${MON[x.m - 1]} ${x.d}, ${x.y}, 8:00 p.m. in Changhua<span>${x.y} 年 ${x.m} 月 ${x.d} 日晚上 8 點，彰化</span></p><div class="tn-grid ns-tn">${out.join('')}</div>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-north-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-north-tonight]');
  if (tn) renderTonight(tn);
  document.querySelectorAll('[data-lab-place]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setPlace(b.getAttribute('data-lab-place'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
  document.querySelectorAll('[data-lab-season]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.jumpSeason(parseInt(b.getAttribute('data-lab-season'), 10));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
