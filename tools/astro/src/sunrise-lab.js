/*
 * 天文教育 · 第十六課「太陽為什麼每天從不同的地方升起？」的 3D 模型。
 *
 * 一個機制：地軸傾斜，太陽每天走的路（和天赤道平行的圓）一年之中南北移動，它和地平線的交點——日出點——
 * 就在冬至點與夏至點之間來回擺盪（彰化約東偏南 25° 到東偏北 26°）。
 * 兩個視角共用一個 renderer：
 *   ・面向東方（east）：站在地面上（+Y 天頂、−Z 北、+X 東，同第十五課），水平視角 112°。一天一格，太陽停在那天的日出點；
 *     走過的日出點留下一排「足跡」，冬至點、春秋分（正東）、夏至點各立一根標竿。地點選陶寺時，觀測點外圍有 13 根夯土柱、12 道縫（示意）。
 *   ・天空圓頂（dome）：從外面看一個透明圓頂，冬至、春秋分、夏至與今天的太陽軌跡都是和「指向北極星的軸」垂直的圓，
 *     軌跡往北移，它和地平線的交點（日出點）就往北移。
 * 右側 2D：一年的日出方位曲線（三個地點對照）。頁面下方：今天彰化的日出日落、這一年的擺盪、懸日查詢。
 * 計算：sunrise.js（日出日落時刻與方位、懸日、陶寺的柱子）。
 * 產物：cd tools/astro && npm run build → assets/js/sunrise-lab.js
 */
import {
  AdditiveBlending, AmbientLight, BackSide, BoxGeometry, BufferGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight,
  DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial, LineDashedMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  PerspectiveCamera, PlaneGeometry, Points, PointsMaterial, RingGeometry, Scene, ShaderMaterial, SphereGeometry, Sprite, SpriteMaterial,
  Vector3, WebGLRenderer,
} from 'three';
import { DEG, TAU, glowTexture } from './common.js';
import { solarTermsOfYear, sunEquatorial } from './ephem.js';
import { groupRuns, hengeDays, localYMD, sunDay, sunYear, sunriseExtremes, taosiPillars } from './sunrise.js';

const PLACES = {
  changhua: { lat: 24.08, lon: 120.54, tz: 8, en: 'Changhua', zh: '彰化' },
  taosi: { lat: 35.88, lon: 111.5, tz: 8, en: 'Taosi', zh: '陶寺' },
  singapore: { lat: 1.35, lon: 103.82, tz: 8, en: 'Singapore', zh: '新加坡' },
};
const TAIPEI = { lat: 25.04, lon: 121.51, tz: 8, en: 'Taipei', zh: '台北' };
const EYE = 1.6, D_SKY = 900, SUN_X = 3;            // 太陽畫成真實大小的 3 倍
const SUN_R = 0.267 * SUN_X;                         // 畫出來的太陽視半徑（度）
const DOME = 10;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY = 86400000;
const hv = (alt, az) => new Vector3(Math.cos(alt * DEG) * Math.sin(az * DEG), Math.sin(alt * DEG), -Math.cos(alt * DEG) * Math.cos(az * DEG));
const pad = (n) => String(n).padStart(2, '0');
const tzParts = (d, tz = 8) => { const x = new Date(d.getTime() + tz * 3600000); return { h: x.getUTCHours(), mi: x.getUTCMinutes() }; };
const hhmm = (d, tz) => { const x = tzParts(d, tz); return `${pad(x.h)}:${pad(x.mi)}`; };
const ampm = (d, tz) => { const x = tzParts(d, tz), h12 = x.h % 12 || 12; return `${h12}:${pad(x.mi)} ${x.h < 12 ? 'a.m.' : 'p.m.'}`; };
const dEn = (x) => `${MON[x.m - 1]} ${x.d}`;
const dZh = (x) => `${x.m} 月 ${x.d} 日`;
// 日出方位 → 「東偏北 26°」；日落方位 → 「西偏北 26°」
function riseDir(az) {
  const o = 90 - az, a = Math.abs(o);
  if (a < 0.5) return ['due east', '正東'];
  return [`${a.toFixed(a < 9.5 ? 1 : 0)}° ${o > 0 ? 'north' : 'south'} of east`, `東偏${o > 0 ? '北' : '南'} ${a.toFixed(a < 9.5 ? 1 : 0)}°`];
}
function setDir(az) {
  const o = az - 270, a = Math.abs(o);
  if (a < 0.5) return ['due west', '正西'];
  return [`${a.toFixed(a < 9.5 ? 1 : 0)}° ${o > 0 ? 'north' : 'south'} of west`, `西偏${o > 0 ? '北' : '南'} ${a.toFixed(a < 9.5 ? 1 : 0)}°`];
}
const twToday = () => localYMD(new Date(), 8);
const dayIndex = (y, m, d) => Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / DAY);

/** 太陽一天走的路（天空中的一個圓，只取地平線以上那段）：赤緯 dec、緯度 lat，回傳 n 個地平座標 [alt, az]。 */
function dayArc(dec, lat, n) {
  const ph = lat * DEG, d = dec * DEG;
  const c = (Math.sin(-0.833 * DEG) - Math.sin(ph) * Math.sin(d)) / (Math.cos(ph) * Math.cos(d));
  const Hs = Math.acos(MathUtils.clamp(c, -1, 1));
  const out = [];
  for (let k = 0; k < n; k++) {
    const H = -Hs + (2 * Hs * k) / (n - 1);
    const alt = Math.asin(Math.sin(ph) * Math.sin(d) + Math.cos(ph) * Math.cos(d) * Math.cos(H));
    const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(ph) - Math.tan(d) * Math.cos(ph)) / DEG + 180;
    out.push([Math.max(alt / DEG, 0), ((az % 360) + 360) % 360]);
  }
  return out;
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), yearCv = $('.sr-year-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const today = twToday(), year = today.y;
  const state = { view: 'east', place: 'changhua', idx: dayIndex(year, today.m, today.d), playing: false, trail: true, paths: true, scenery: true, follow: true, yaw: 90, pitch: 0, dYaw: 212, dPitch: 34 };

  // 每個地點一整年的日出日落（第一次用到才算，約 20 ms）
  const years = {};
  const yearOf = (k) => years[k] || (years[k] = (() => { const list = sunYear(year, PLACES[k]); return { list, ex: sunriseExtremes(list) }; })());
  const decOf = (x) => sunEquatorial(x.rise || x.noon).dec;
  // 四個關鍵日：冬至（今年 12 月）、春分、夏至、秋分（當地日期）
  const keyDays = (() => {
    const terms = solarTermsOfYear(year), at = (lon) => { const t = terms.find((q) => q.lon === lon); const x = localYMD(t.date, 8); return dayIndex(x.y, x.m, x.d); };
    return { ve: at(0), ss: at(90), ae: at(180), ws: at(270), today: dayIndex(year, today.m, today.d) };
  })();
  const nDays = yearOf('changhua').list.length;

  let camera, east = {}, dome = {};
  const lineMat = (color, opacity = 1) => new LineBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: false });
  const fixedLine = (n, mat) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(new Float32Array(n * 3), 3)); const l = new Line(g, mat); l.frustumCulled = false; return l; };
  const writeLine = (line, pts) => { const a = line.geometry.attributes.position.array; pts.forEach((v, k) => { a[k * 3] = v.x; a[k * 3 + 1] = v.y; a[k * 3 + 2] = v.z; }); line.geometry.attributes.position.needsUpdate = true; line.geometry.computeBoundingSphere(); };
  const ARC_N = 121;
  const KEY_COL = { ws: 0x7fb4ff, ve: 0xe8eefc, ss: 0xffa25a, today: 0xffd36e };
  const sunTex = glowTexture([[0, 'rgba(255,255,240,1)'], [0.16, 'rgba(255,236,170,1)'], [0.3, 'rgba(255,170,70,.5)'], [0.6, 'rgba(255,120,40,.12)'], [1, 'rgba(255,100,20,0)']]);

  if (renderer) {
    renderer.setPixelRatio(dpr);
    camera = new PerspectiveCamera(60, 1.6, 0.1, 5000);
    // ================= 面向東方 =================
    const e = east; e.scene = new Scene();
    e.sky = new Mesh(new SphereGeometry(D_SKY + 40, 48, 24), new ShaderMaterial({
      uniforms: { sunDir: { value: new Vector3(1, 0, 0) } },
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform vec3 sunDir; varying vec3 vD;
        void main(){ float h = clamp(vD.y, 0.0, 1.0);
          vec3 c = mix(vec3(0.42, 0.36, 0.5), vec3(0.06, 0.12, 0.3), pow(h, 0.5));
          float s = max(dot(normalize(vec3(vD.x, 0.0, vD.z)), normalize(vec3(sunDir.x, 0.0, sunDir.z))), 0.0);
          c += vec3(0.95, 0.5, 0.2) * pow(s, 6.0) * pow(1.0 - h, 3.0);
          gl_FragColor = vec4(c, 1.0); }`,
      side: BackSide, depthWrite: false,
    }));
    e.scene.add(e.sky);
    e.groundMat = new MeshBasicMaterial({ color: 0x1a2416 });
    const g0 = new Mesh(new PlaneGeometry(9000, 9000), e.groundMat); g0.rotation.x = -Math.PI / 2; e.scene.add(g0);
    // 地平線刻度：東邊 ±60°，每 5° 一格、每 10° 長一點
    {
      const pos = [];
      for (let o = -60; o <= 60; o += 5) { const a = hv(0, 90 - o).multiplyScalar(D_SKY - 20), b = hv(o % 10 ? 0.6 : 1.4, 90 - o).multiplyScalar(D_SKY - 20); pos.push(a.x, a.y + EYE, a.z, b.x, b.y + EYE, b.z); }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pos, 3));
      e.scene.add(new LineSegments(g, lineMat(0xcfd8ea, 0.55)));
      const hz = []; for (let az = 20; az <= 160; az += 1) hz.push(hv(0, az).multiplyScalar(D_SKY - 20).add(new Vector3(0, EYE, 0)));
      e.scene.add(new Line(new BufferGeometry().setFromPoints(hz), lineMat(0xcfd8ea, 0.35)));
    }
    // 日出足跡（一年最多 366 個點）
    {
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(new Float32Array(366 * 3), 3));
      g.setAttribute('color', new Float32BufferAttribute(new Float32Array(366 * 3), 3));
      e.trail = new Points(g, new PointsMaterial({ size: 7, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false }));
      e.trail.frustumCulled = false; e.scene.add(e.trail);
    }
    // 冬至、春秋分、夏至的標竿
    e.posts = {};
    for (const k of ['ws', 've', 'ss']) { e.posts[k] = fixedLine(2, lineMat(KEY_COL[k], 0.9)); e.scene.add(e.posts[k]); }
    // 太陽每天走的路：冬至、春秋分、夏至（淡）＋今天（金）
    e.arcs = {};
    for (const k of ['ws', 've', 'ss', 'today']) { e.arcs[k] = fixedLine(ARC_N, lineMat(KEY_COL[k], k === 'today' ? 0.95 : 0.4)); e.scene.add(e.arcs[k]); }
    // 太陽（畫成 3 倍大）＋光暈
    e.sun = new Mesh(new SphereGeometry(1, 32, 16), new MeshBasicMaterial({ color: 0xfff1c8 })); e.scene.add(e.sun);
    e.glow = new Sprite(new SpriteMaterial({ map: sunTex, blending: AdditiveBlending, depthWrite: false, transparent: true })); e.scene.add(e.glow);
    // 景物：每個地點一組
    e.scenery = {};
    const silMat = new MeshBasicMaterial({ color: 0x0d1220 }), farMat = new MeshBasicMaterial({ color: 0x232a44 });
    let s = 7; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const ridge = (maxAlt, from, to, seed) => {   // 遠山：方位 from–to、最高 maxAlt 度
      const pts = []; for (let k = from; k <= to; k += 1) { const a = k * DEG, h = 3000 * Math.tan(maxAlt * (0.35 + 0.65 * Math.abs(Math.sin(k * 0.07 + seed) * Math.sin(k * 0.19 + seed * 2))) * DEG); pts.push([3000 * Math.sin(a), h, -3000 * Math.cos(a)]); }
      const pos = []; for (let k = 0; k < pts.length - 1; k++) { const [a, b] = [pts[k], pts[k + 1]]; pos.push(a[0], 0, a[2], b[0], 0, b[2], b[0], b[1], b[2], a[0], 0, a[2], b[0], b[1], b[2], a[0], a[1], a[2]); }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pos, 3)); return new Mesh(g, farMat);
    };
    { // 彰化：東邊是平坦的地平線（八卦山壓得很低），左右兩旁有房子和樹
      const grp = new Group(); grp.add(ridge(0.35, 30, 150, 1)); grp.add(ridge(2.2, 150, 390, 3));
      for (let k = 0; k < 60; k++) {
        let az = rnd() * 360; if (az > 32 && az < 148) az += 120;   // 不擋住東邊的日出點
        const a = az * DEG, r = 90 + rnd() * 200;
        if (rnd() < 0.55) { const w = 7 + rnd() * 12, h = 5 + rnd() * 12, b = new Mesh(new BoxGeometry(w, h, w), silMat); b.position.set(r * Math.sin(a), h / 2, -r * Math.cos(a)); b.rotation.y = rnd() * TAU; grp.add(b); }
        else { const h = 6 + rnd() * 8, t = new Mesh(new ConeGeometry(h * 0.35, h, 8), silMat); t.position.set(r * Math.sin(a), h / 2 + 1.5, -r * Math.cos(a)); grp.add(t); }
      }
      e.scenery.changhua = grp;
    }
    { // 陶寺：觀測點外 10.5 公尺一圈 13 根夯土柱（位置在 setPlace 依今年的冬至、夏至日出擺）、東邊遠方的山
      const grp = new Group(); grp.add(ridge(0.3, 30, 150, 2)); grp.add(ridge(3, 150, 390, 5));
      const earth = new MeshLambertMaterial({ color: 0x8a6a48 });
      e.pillars = [];
      for (let k = 0; k < 13; k++) { const p = new Mesh(new BoxGeometry(1, 4.2, 1.6), earth); grp.add(p); e.pillars.push(p); }
      const spot = new Mesh(new RingGeometry(0.5, 0.75, 32), new MeshBasicMaterial({ color: 0xd8b07a, side: DoubleSide })); spot.rotation.x = -Math.PI / 2; spot.position.y = 0.02; grp.add(spot);
      grp.add(new AmbientLight(0xffe2c0, 1.1)); const dl = new DirectionalLight(0xffc890, 1.4); dl.position.set(800, 40, 0); grp.add(dl);
      e.scenery.taosi = grp;
    }
    { // 新加坡：東邊是海
      const grp = new Group(); grp.add(ridge(1.6, 200, 340, 4));
      const sea = new Mesh(new PlaneGeometry(9000, 9000), new MeshBasicMaterial({ color: 0x14284a })); sea.rotation.x = -Math.PI / 2; sea.position.set(4500 + 60, 0.01, 0); grp.add(sea);
      e.scenery.singapore = grp;
    }
    for (const k in e.scenery) e.scene.add(e.scenery[k]);

    // ================= 天空圓頂 =================
    const d = dome; d.scene = new Scene(); d.scene.background = new Color(0x050913);
    d.scene.add(new AmbientLight(0xc8d4ff, 0.7)); const dl = new DirectionalLight(0xffffff, 1.2); dl.position.set(5, 10, 8); d.scene.add(dl);
    const disk = new Mesh(new CylinderGeometry(DOME, DOME, 0.3, 96), new MeshLambertMaterial({ color: 0x1f3326 })); disk.position.y = -0.15; d.scene.add(disk);
    d.scene.add(new Mesh(new SphereGeometry(DOME, 64, 24, 0, TAU, 0, Math.PI / 2), new MeshBasicMaterial({ color: 0x9fb8ff, transparent: true, opacity: 0.06, side: DoubleSide, depthWrite: false })));
    { // 地平線圈與經線（淡）
      const ring = []; for (let az = 0; az <= 360; az += 3) ring.push(hv(0, az).multiplyScalar(DOME));
      d.scene.add(new Line(new BufferGeometry().setFromPoints(ring), lineMat(0xcfd8ea, 0.6)));
      for (const az0 of [0, 90]) { const m = []; for (let a = 0; a <= 180; a += 3) m.push(hv(a <= 90 ? a : 180 - a, a <= 90 ? az0 : az0 + 180).multiplyScalar(DOME)); d.scene.add(new Line(new BufferGeometry().setFromPoints(m), lineMat(0x9fb0cf, 0.18))); }
    }
    // 小人：站在中間、面向東方
    const body = new Mesh(new CylinderGeometry(0.28, 0.36, 1.3, 16), new MeshLambertMaterial({ color: 0xffd36e })); body.position.y = 0.65; d.scene.add(body);
    const head = new Mesh(new SphereGeometry(0.28, 16, 12), new MeshLambertMaterial({ color: 0xffe8b8 })); head.position.y = 1.55; d.scene.add(head);
    const nose = new Mesh(new ConeGeometry(0.16, 0.5, 12), new MeshLambertMaterial({ color: 0xffd36e })); nose.rotation.z = -Math.PI / 2; nose.position.set(0.55, 1.0, 0); d.scene.add(nose);
    d.axis = fixedLine(2, new LineDashedMaterial({ color: 0xcfd8ea, dashSize: 0.4, gapSize: 0.25 })); d.scene.add(d.axis);
    d.arcs = {};
    for (const k of ['ws', 've', 'ss', 'today']) { d.arcs[k] = fixedLine(ARC_N, lineMat(KEY_COL[k], k === 'today' ? 1 : 0.7)); d.scene.add(d.arcs[k]); }
    d.dots = {};
    for (const k of ['ws', 've', 'ss']) { d.dots[k] = new Mesh(new SphereGeometry(0.22, 16, 12), new MeshBasicMaterial({ color: KEY_COL[k] })); d.scene.add(d.dots[k]); }
    d.sun = new Mesh(new SphereGeometry(0.42, 24, 16), new MeshBasicMaterial({ color: 0xfff1c8 })); d.scene.add(d.sun);
    d.glow = new Sprite(new SpriteMaterial({ map: sunTex, blending: AdditiveBlending, depthWrite: false, transparent: true })); d.glow.scale.setScalar(3.2); d.scene.add(d.glow);
    {
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(new Float32Array(366 * 3), 3)); g.setAttribute('color', new Float32BufferAttribute(new Float32Array(366 * 3), 3));
      d.trail = new Points(g, new PointsMaterial({ size: 4, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false })); d.trail.frustumCulled = false; d.scene.add(d.trail);
    }
  }

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const L = renderer ? {
    sun: mk('sun', 'Sunrise · 日出'), ws: mk('sr-ws', 'Winter solstice · 冬至'), ve: mk('sr-ve', 'Equinoxes · 春分秋分'), ss: mk('sr-ss', 'Summer solstice · 夏至'),
    E: mk('mi-card', 'E 東'), NE: mk('mi-card', 'NE 東北'), SE: mk('mi-card', 'SE 東南'), N: mk('mi-card', 'N 北'), S: mk('mi-card', 'S 南'), W: mk('mi-card', 'W 西'),
    t10n: mk('sr-tick', '10°'), t20n: mk('sr-tick', '20°'), t30n: mk('sr-tick', '30°'), t10s: mk('sr-tick', '10°'), t20s: mk('sr-tick', '20°'), t30s: mk('sr-tick', '30°'),
    slot: mk('sr-slot', ''), axis: mk('sr-axis', 'Toward the North Star · 指向北極星'), you: mk('mi-you', 'You · 你'),
  } : null;
  const proj = new Vector3();
  let shown = new Set(), prevShown = new Set(), cw = 0, ch = 0;
  function place(el, v, dy = 6) {
    proj.copy(v).project(camera);
    if (proj.z > 1 || Math.abs(proj.x) > 1.02 || Math.abs(proj.y) > 1.02) return false;
    el.style.opacity = 1; shown.add(el);
    el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * cw}px, ${(-proj.y * 0.5 + 0.5) * ch + dy}px) translate(-50%, 0)`;
    return true;
  }

  // ---------------- 狀態 ----------------
  const R = { when: $('.sr-when'), rise: $('.sr-rise'), set: $('.sr-set'), shift: $('.sr-shift'), slot: $('.sr-slotv'), slotRow: $('.sr-slot-row') };
  let cur = null, pillarsAz = null;
  const P = () => PLACES[state.place];
  const dayAt = (i) => { const Y = yearOf(state.place).list; return Y[MathUtils.clamp(Math.round(i), 0, Y.length - 1)]; };
  const azAt = (i) => { const Y = yearOf(state.place).list, a = Math.floor(MathUtils.clamp(i, 0, Y.length - 1)), b = Math.min(a + 1, Y.length - 1), f = MathUtils.clamp(i, 0, Y.length - 1) - a; return Y[a].riseAz * (1 - f) + Y[b].riseAz * f; };
  const tint = (az, ex) => { const f = MathUtils.clamp((az - ex.north.riseAz) / (ex.south.riseAz - ex.north.riseAz), 0, 1); return [1 - 0.5 * f, 0.64 + 0.06 * f, 0.35 + 0.65 * f]; };   // 北（夏）橘、南（冬）藍
  function slotOf(az) { if (!pillarsAz) return 0; for (let k = 0; k < 12; k++) if (pillarsAz[k] >= az && az >= pillarsAz[k + 1]) return k + 1; return 0; }

  function update() {
    const x = dayAt(state.idx), Y = yearOf(state.place), ex = Y.ex, az = azAt(state.idx), lat = P().lat;
    cur = { x, az };
    if (renderer) {
      const e = east, d = dome, o = new Vector3(0, EYE, 0);
      // 太陽停在日出點（下緣剛好碰到地平線）
      const sp = hv(SUN_R, az).multiplyScalar(D_SKY - 60).add(o);
      e.sun.position.copy(sp); e.sun.scale.setScalar((D_SKY - 60) * Math.tan(SUN_R * DEG));
      e.glow.position.copy(sp); e.glow.scale.setScalar((D_SKY - 60) * Math.tan(SUN_R * 9 * DEG));
      e.sky.material.uniforms.sunDir.value.copy(hv(0, az));
      // 足跡：1 月 1 日到今天這格（播放時一路畫下去）
      const n = Math.floor(MathUtils.clamp(state.idx, 0, Y.list.length - 1)) + 1;
      for (const [tr, R0, alt] of [[e.trail, D_SKY - 30, 0.25], [d.trail, DOME, 0.02]]) {
        const pa = tr.geometry.attributes.position.array, ca = tr.geometry.attributes.color.array;
        for (let k = 0; k < n; k++) { const v = hv(alt, Y.list[k].riseAz).multiplyScalar(R0); if (tr === e.trail) v.add(o); pa[k * 3] = v.x; pa[k * 3 + 1] = v.y; pa[k * 3 + 2] = v.z; const c = tint(Y.list[k].riseAz, ex); ca[k * 3] = c[0]; ca[k * 3 + 1] = c[1]; ca[k * 3 + 2] = c[2]; }
        tr.geometry.attributes.position.needsUpdate = true; tr.geometry.attributes.color.needsUpdate = true; tr.geometry.setDrawRange(0, n);
        tr.visible = state.trail;
      }
      // 軌跡：今天這格
      const ad = dayArc(decOf(x), lat, ARC_N);
      writeLine(e.arcs.today, ad.map(([al, a]) => hv(al, a).multiplyScalar(D_SKY - 50).add(o)));
      writeLine(d.arcs.today, ad.map(([al, a]) => hv(al, a).multiplyScalar(DOME)));
      for (const k of ['ws', 've', 'ss', 'today']) e.arcs[k].visible = state.paths;
      // 圓頂上的太陽
      d.sun.position.copy(hv(0.6, az).multiplyScalar(DOME)); d.glow.position.copy(d.sun.position);
    }
    readouts();
    drawYear();
  }
  // 換地點：關鍵日的軌跡、標竿、圓頂上的點與軸、陶寺的柱子
  function setPlace(k) {
    state.place = k; root.dataset.place = k;
    $$('.sr-place button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.place === k ? 'true' : 'false'));
    const Y = yearOf(k), ex = Y.ex, lat = P().lat;
    pillarsAz = k === 'taosi' ? taosiPillars(ex.south.riseAz, ex.north.riseAz) : null;
    R.slotRow.hidden = k !== 'taosi';
    if (renderer) {
      const e = east, d = dome, o = new Vector3(0, EYE, 0);
      const keyAz = { ws: ex.south.riseAz, ss: ex.north.riseAz, ve: Y.list[keyDays.ve].riseAz };
      for (const kk of ['ws', 've', 'ss']) {
        writeLine(e.posts[kk], [hv(0, keyAz[kk]).multiplyScalar(D_SKY - 25).add(o), hv(6, keyAz[kk]).multiplyScalar(D_SKY - 25).add(o)]);
        const x = kk === 'ws' ? ex.south : kk === 'ss' ? ex.north : Y.list[keyDays.ve];
        const ad = dayArc(decOf(x), lat, ARC_N);
        writeLine(e.arcs[kk], ad.map(([al, a]) => hv(al, a).multiplyScalar(D_SKY - 50).add(o)));
        writeLine(d.arcs[kk], ad.map(([al, a]) => hv(al, a).multiplyScalar(DOME)));
        d.dots[kk].position.copy(hv(0, keyAz[kk]).multiplyScalar(DOME));
      }
      writeLine(d.axis, [new Vector3(0, 0, 0), hv(lat, 0).multiplyScalar(DOME * 1.25)]); d.axis.computeLineDistances();
      for (const kk in e.scenery) e.scenery[kk].visible = state.scenery && kk === k;
      e.groundMat.color.setHex(k === 'taosi' ? 0x3a3020 : k === 'singapore' ? 0x16231a : 0x1a2416);
      if (pillarsAz) {
        const step = pillarsAz[0] - pillarsAz[1], w = 2 * 10.5 * Math.tan(step * 0.55 / 2 * DEG);
        e.pillars.forEach((p, j) => { const v = hv(0, pillarsAz[j]).multiplyScalar(10.5); p.position.set(v.x, 2.1, v.z); p.scale.x = w; p.lookAt(0, 2.1, 0); });
      }
    }
    update(); aim();
  }
  function readouts() {
    const { x } = cur, T = P().tz, Y = yearOf(state.place).list, i = Y.indexOf(x);
    R.when.innerHTML = `${dEn(x)}, ${x.y}<span>${x.y} 年 ${dZh(x)}，${P().zh}</span>`;
    if (x.rise) { const [en, zh] = riseDir(x.riseAz); R.rise.innerHTML = `${ampm(x.rise, T)}, ${en}<span>${hhmm(x.rise, T)}，${zh}</span>`; }
    if (x.set) { const [en, zh] = setDir(x.setAz); R.set.innerHTML = `${ampm(x.set, T)}, ${en}<span>${hhmm(x.set, T)}，${zh}</span>`; }
    const prev = Y[i > 0 ? i - 1 : 0], dd = x.riseAz - prev.riseAz, a = Math.abs(dd);
    R.shift.innerHTML = i === 0 ? '—'
      : a < 0.05 ? `Almost none (${a.toFixed(2)}°): the Sun "stands still"<span>幾乎沒動（${a.toFixed(2)}°）：太陽在這裡「停」下來、準備折返</span>`
        : `${a.toFixed(2)}° ${dd > 0 ? 'south' : 'north'} since yesterday${a > 0.35 ? ', almost one Sun-width' : ''}<span>比昨天往${dd > 0 ? '南' : '北'}移了 ${a.toFixed(2)}°${a > 0.35 ? '，快一個太陽寬' : ''}</span>`;
    if (pillarsAz) { const s = slotOf(x.riseAz); R.slot.innerHTML = s ? `Slot ${s} of 12<span>第 ${s} 道縫（共 12 道）</span>` : 'Outside the slots<span>不在縫裡</span>'; }
  }

  // ---------------- 右側：一年的日出方位 ----------------
  function drawYear() {
    const W = yearCv.clientWidth || 300, H = Math.round(W * 0.72), N = Math.round(W * dpr), NH = Math.round(H * dpr);
    if (yearCv.width !== N || yearCv.height !== NH) { yearCv.width = N; yearCv.height = NH; yearCv.style.height = `${H}px`; }
    const c = yearCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = '#081024'; c.fillRect(0, 0, W, H);
    const l = 34, r = W - 8, t = 12, b = H - 22, ymax = 32;
    const X = (i) => l + (r - l) * i / (nDays - 1), Yp = (off) => (t + b) / 2 - off / ymax * (b - t) / 2;
    const fs = Math.max(9, W * 0.031);
    c.font = `600 ${fs}px system-ui, sans-serif`; c.textAlign = 'right'; c.textBaseline = 'middle';
    for (const o of [-30, -20, -10, 0, 10, 20, 30]) {
      c.strokeStyle = o ? 'rgba(160,180,230,.12)' : 'rgba(232,238,252,.5)'; c.setLineDash(o ? [] : [4, 3]); c.beginPath(); c.moveTo(l, Yp(o)); c.lineTo(r, Yp(o)); c.stroke();
      c.fillStyle = o ? '#7f90b3' : '#e8eefc'; c.fillText(o ? `${Math.abs(o)}°${o > 0 ? 'N' : 'S'}` : 'E 東', l - 4, Yp(o));
    }
    c.setLineDash([]);
    c.textAlign = 'center'; c.fillStyle = '#7f90b3';
    for (let m = 0; m < 12; m++) { const i = dayIndex(year, m + 1, 1); c.fillText(MON[m][0], X(i + 14), b + 11); c.strokeStyle = 'rgba(160,180,230,.1)'; c.beginPath(); c.moveTo(X(i), t); c.lineTo(X(i), b); c.stroke(); }
    // 三個地點（目前的亮、其他的淡）
    for (const k of Object.keys(PLACES).sort((a) => (a === state.place ? 1 : -1))) {
      const Y = yearOf(k).list, on = k === state.place;
      c.strokeStyle = on ? '#ffd36e' : 'rgba(159,176,207,.35)'; c.lineWidth = on ? 2.4 : 1.2; c.beginPath();
      Y.forEach((x, i) => { const y = Yp(90 - x.riseAz); if (i) c.lineTo(X(i), y); else c.moveTo(X(i), y); }); c.stroke();
    }
    c.lineWidth = 1; c.font = `700 ${fs}px system-ui, sans-serif`;
    // 今天（白圈）與模型這一格（金點）
    const ti = keyDays.today, ty = Yp(90 - yearOf(state.place).list[ti].riseAz);
    c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.arc(X(ti), ty, 6, 0, TAU); c.stroke(); c.lineWidth = 1;
    const si = MathUtils.clamp(state.idx, 0, nDays - 1), sy = Yp(90 - azAt(si));
    c.strokeStyle = 'rgba(255,211,110,.45)'; c.beginPath(); c.moveTo(X(si), t); c.lineTo(X(si), b); c.stroke();
    c.fillStyle = '#ffd36e'; c.beginPath(); c.arc(X(si), sy, 4.5, 0, TAU); c.fill();
    // 圖例放下方中間（4–8 月的日出都偏北，南邊是空的）
    c.textAlign = 'center'; const lx = (l + r) / 2, ly = (k) => b - 8 - k * fs * 1.35;
    c.fillStyle = '#e8eefc'; c.fillText('○ Today · 今天', lx, ly(0));
    c.fillStyle = '#7f90b3'; c.fillText('Gray: other places · 灰：其他地點', lx, ly(1));
    c.fillStyle = '#ffd36e'; c.fillText(`${PLACES[state.place].en} · ${PLACES[state.place].zh}`, lx, ly(2));
  }

  // ---------------- 相機 ----------------
  function aim() {
    if (!renderer) return;
    if (state.view === 'dome') {
      const dist = 31 * (spaceWrap.clientWidth < 600 ? 1.08 : 1);
      camera.position.copy(hv(state.dPitch, state.dYaw).multiplyScalar(dist)).add(new Vector3(0, 2.5, 0));
      camera.lookAt(0, 2.5, 0);
      return;
    }
    camera.position.set(0, EYE, 0);
    if (state.follow) { state.yaw = 90; state.pitch = 0; }
    camera.lookAt(hv(state.pitch, state.yaw).add(camera.position));
  }
  function setFov() {
    if (!renderer) return;
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) { renderer.setSize(w, h, false); camera.aspect = w / h; }
    const hf = state.view === 'dome' ? 50 : (camera.aspect < 1.1 ? 80 : 86);   // 水平視角：陶寺 ±29° 也放得下
    camera.fov = 2 * Math.atan(Math.tan(hf / 2 * DEG) / camera.aspect) / DEG;
    camera.near = state.view === 'dome' ? 0.1 : 0.3; camera.far = 5000;
    // 面向東方：相機保持水平（柱子、房子不會歪），用「移軸」把畫面往上推，地平線落在下方約 3/4 處
    if (state.view === 'dome' || !w || !h) camera.clearViewOffset(); else camera.setViewOffset(w, h, 0, -h * 0.26, w, h);
    camera.updateProjectionMatrix();
  }
  function setView(v) {
    state.view = v; root.dataset.view = v; state.follow = true;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    setFov(); aim();
  }
  function setIdx(i) {
    state.idx = i;
    slider.value = String(Math.round(i)); slider.style.setProperty('--p', `${(Math.round(i) / (nDays - 1)) * 100}%`);
    $$('.sr-key button').forEach((b) => b.setAttribute('aria-pressed', Math.round(i) === keyDays[b.dataset.key] ? 'true' : 'false'));
    update();
  }
  const jumpKey = (k) => setIdx(keyDays[k]);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play'), slider = $('.sr-time');
  slider.max = String(nDays - 1);
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  playBtn.addEventListener('click', () => { if (!state.playing && state.idx >= nDays - 1) setIdx(0); setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  slider.addEventListener('input', () => { setPlaying(false); setIdx(parseFloat(slider.value)); });
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => { setView(b.dataset.view); root.classList.remove('al-fresh'); }));
  $$('.sr-key button').forEach((b) => b.addEventListener('click', () => { setPlaying(false); jumpKey(b.dataset.key); }));
  $$('.sr-place button').forEach((b) => b.addEventListener('click', () => setPlace(b.dataset.place)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="trail"]', (v) => { state.trail = v; });
  bind('[data-t="paths"]', (v) => { state.paths = v; for (const k of ['ws', 've', 'ss', 'today']) { if (dome.arcs) dome.arcs[k].visible = v; } });
  bind('[data-t="scenery"]', (v) => { state.scenery = v; if (east.scenery) for (const k in east.scenery) east.scenery[k].visible = v && k === state.place; });
  // 拖曳：面向東方時轉頭，圓頂時繞著轉
  let drag = null;
  spaceCv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, yaw: state.yaw, pitch: state.pitch, dYaw: state.dYaw, dPitch: state.dPitch }; spaceCv.setPointerCapture(e.pointerId); });
  spaceCv.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (state.view === 'dome') { state.dYaw = drag.dYaw - dx * 0.4; state.dPitch = MathUtils.clamp(drag.dPitch + dy * 0.3, 5, 85); }
    else { const k = camera.fov / spaceCv.clientHeight; state.follow = false; state.yaw = drag.yaw - dx * k; state.pitch = MathUtils.clamp(drag.pitch + dy * k, -5, 80); }
    aim();
  });
  spaceCv.addEventListener('pointerup', () => { drag = null; });
  if (renderer) $('.al-home').addEventListener('click', () => { state.follow = true; state.dYaw = 212; state.dPitch = 34; aim(); });

  let compact = null;
  function updateLabels() {
    cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set();
    if (compact !== cw < 560) {   // 手機：標籤縮短
      compact = cw < 560;
      L.ws.innerHTML = compact ? 'Winter · 冬至' : 'Winter solstice · 冬至'; L.ss.innerHTML = compact ? 'Summer · 夏至' : 'Summer solstice · 夏至';
      L.ve.innerHTML = compact ? 'Equinox · 春秋分' : 'Equinoxes · 春分秋分';
    }
    const Y = yearOf(state.place), ex = Y.ex, keyAz = { ws: ex.south.riseAz, ss: ex.north.riseAz, ve: Y.list[keyDays.ve].riseAz };
    if (state.view === 'dome') {
      for (const k of ['ws', 've', 'ss']) place(L[k], hv(0, keyAz[k]).multiplyScalar(DOME * 1.06), compact ? { ss: -30, ve: -8, ws: 14 }[k] : -10);
      for (const [k, az] of [['N', 0], ['E', 90], ['S', 180], ['W', 270]]) if (!(compact && k === 'E')) place(L[k], hv(0, az).multiplyScalar(DOME * 1.12).add(new Vector3(0, -0.4, 0)), 0);
      place(L.axis, hv(P().lat, 0).multiplyScalar(DOME * 1.3), -8); place(L.you, new Vector3(0, -0.2, 0), 6);
    } else {
      const o = new Vector3(0, EYE, 0);
      place(L.sun, hv(-4, cur.az).multiplyScalar(D_SKY - 60).add(o), 4);
      for (const k of ['ws', 've', 'ss']) place(L[k], hv(k === 've' ? 10 : 6.2, keyAz[k]).multiplyScalar(D_SKY - 25).add(o), -24);
      for (const [k, az] of [['NE', 45], ['E', 90], ['SE', 135], ['N', 0], ['S', 180]]) place(L[k], hv(-1.2, az).multiplyScalar(D_SKY - 20).add(o), 4);
      for (const [k, o2] of [['t10n', 10], ['t20n', 20], ['t30n', 30], ['t10s', -10], ['t20s', -20], ['t30s', -30]]) place(L[k], hv(-1.2, 90 - o2).multiplyScalar(D_SKY - 20).add(o), 4);
      if (pillarsAz && state.scenery) { const s = slotOf(cur.x.riseAz); if (s) { L.slot.innerHTML = `Slot ${s} · 第 ${s} 道縫`; place(L.slot, hv(0, (pillarsAz[s - 1] + pillarsAz[s]) / 2).multiplyScalar(10.4).add(new Vector3(0, 4.6, 0)), -18); } }
    }
    for (const el of prevShown) if (!shown.has(el)) el.style.opacity = 0;
  }

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function render() { if (!renderer) return; updateLabels(); renderer.render(state.view === 'dome' ? dome.scene : east.scene, camera); }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) {
      const ni = state.idx + dt * 12;          // 一秒 12 天，一年約半分鐘
      if (ni >= nDays - 1) { setIdx(nDays - 1); setPlaying(false); } else setIdx(ni);
    }
    render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);
  new ResizeObserver(() => { setFov(); aim(); drawYear(); }).observe(spaceWrap);
  new ResizeObserver(drawYear).observe(yearCv);

  root.dataset.view = 'east';
  setView('east'); setPlace('changhua'); setIdx(keyDays.today);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, state, setView, setPlace, setIdx, jumpKey, setPlaying, render, drawYear, keyDays };
  return { setView, jumpKey };
}

// ---------------------------------------------------------------------------
// 頁面下方：今天彰化的日出日落、這一年的擺盪、懸日查詢
const ROADS = {
  // 街道西端的方位：用氣象署 2026 年懸日預報（5 月時段的中點）反推，見 test/sunrise.test.mjs
  zhongxiao: { az: 285.0, site: TAIPEI, en: 'Zhongxiao East–West Road, Taipei', zh: '台北忠孝東西路（新生高架以西）' },
  emei: { az: 286.0, site: TAIPEI, en: 'Emei Street, Taipei', zh: '台北峨眉街（西寧南路以西）' },
};
function renderToday(box) {
  const site = PLACES.changhua, now = new Date(), td = twToday();
  const x = sunDay(td, site), y0 = sunDay(localYMD(new Date(now.getTime() - DAY), 8), site);
  const list = sunYear(td.y, site), ex = sunriseExtremes(list);
  const dd = x.riseAz - y0.riseAz, [ren, rzh] = riseDir(x.riseAz), [sen, szh] = setDir(x.setAz);
  const goingSouth = dd > 0, target = goingSouth ? ex.south : ex.north;
  const after = Date.UTC(target.y, target.m - 1, target.d) >= Date.UTC(td.y, td.m - 1, td.d);
  const nextEast = ex.dueEast.find((q) => Date.UTC(q.y, q.m - 1, q.d) >= Date.UTC(td.y, td.m - 1, td.d));
  box.innerHTML = `<p class="tn-when">${dEn(td)}, ${td.y}, Changhua<span>${td.y} 年 ${dZh(td)}，彰化</span></p>
    <div class="tn-grid sr-tn-grid">
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#9728;</span><div><h3>Sunrise<span class="zh">日出</span></h3><p>${ampm(x.rise)}, ${ren} (azimuth ${x.riseAz.toFixed(0)}°)<span class="zh">${hhmm(x.rise)}，${rzh}（方位角 ${x.riseAz.toFixed(0)}°）</span></p></div></div>
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#9790;</span><div><h3>Sunset<span class="zh">日落</span></h3><p>${ampm(x.set)}, ${sen} (azimuth ${x.setAz.toFixed(0)}°)<span class="zh">${hhmm(x.set)}，${szh}（方位角 ${x.setAz.toFixed(0)}°）</span></p></div></div>
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#8644;</span><div><h3>On the move<span class="zh">正在移動</span></h3><p>${Math.abs(dd).toFixed(2)}° farther ${goingSouth ? 'south' : 'north'} than yesterday${after ? `, heading for the ${goingSouth ? 'winter' : 'summer'} solstice point on ${dEn(target)}` : ''}<span class="zh">比昨天往${goingSouth ? '南' : '北'}移了 ${Math.abs(dd).toFixed(2)}°${after ? `，${dZh(target)}到${goingSouth ? '冬至' : '夏至'}點折返` : ''}</span></p></div></div>
    </div>
    <h3 class="tn-h">This year's swing in Changhua · 今年彰化的日出擺盪</h3>
    <div class="sr-swing">
      <div><b>${dEn(ex.north)}</b><span>Farthest north: ${riseDir(ex.north.riseAz)[0]}</span><span class="zh">最北：${riseDir(ex.north.riseAz)[1]}</span></div>
      <div><b>${ex.dueEast.map(dEn).join(' · ')}</b><span>Rises due east${nextEast ? `; next: ${dEn(nextEast)}` : ''}</span><span class="zh">從正東升起${nextEast ? `；下一次：${dZh(nextEast)}` : ''}</span></div>
      <div><b>${dEn(ex.south)}</b><span>Farthest south: ${riseDir(ex.south.riseAz)[0]}</span><span class="zh">最南：${riseDir(ex.south.riseAz)[1]}</span></div>
      <div><b>${ex.swing.toFixed(0)}°</b><span>Total swing in one year</span><span class="zh">一年擺動的總角度</span></div>
    </div>
    <h3 class="tn-h">Henge finder: when does the Sun line up with a street? · 懸日查詢：太陽哪天對準一條街？</h3>
    <div class="sr-henge">
      <div class="sr-henge-ctl">
        <div class="ec-where sr-roads" role="group" aria-label="Street · 街道">
          <button type="button" data-road="zhongxiao" aria-pressed="true">Zhongxiao Rd · 忠孝東西路</button>
          <button type="button" data-road="emei" aria-pressed="false">Emei St · 峨眉街</button>
          <button type="button" data-road="custom" aria-pressed="false">Your street · 你家的街</button>
        </div>
        <label class="sr-custom">The west end of the street points <b class="sr-cv">15° north of west</b> · 街道西端<b class="sr-cvz">西偏北 15°</b>
          <input type="range" class="sr-angle" min="-40" max="40" step="0.5" value="15" aria-label="Street direction · 街道方向"></label>
        <canvas class="sr-compass" aria-label="Compass with the street and the ranges where the Sun rises and sets · 街道方向與日出、日落範圍的羅盤"></canvas>
      </div>
      <div class="sr-henge-out" aria-live="polite"></div>
    </div>
    <p class="tn-note">Times and directions are for Changhua's flat horizon, calculated in your browser; they agree with the Central Weather Administration's tables to within a minute and a degree. For a henge, the Sun must sit just above the buildings at the end of the street, about 3 to 5 degrees up, so henge days are calibrated with the CWA's 2026 forecast for Taipei. Never stare at the Sun, and watch from the sidewalk, not the road. · 時刻與方位以彰化平坦的地平線為準，在瀏覽器裡現算，和中央氣象署的表相差不到 1 分鐘、1 度。懸日要太陽剛好停在街底樓房上方約 3 到 5 度，所以懸日日期用氣象署 2026 年台北的預報校準。不要直視太陽，在人行道上看，不要站到馬路上。</p>`;
  // ---- 懸日查詢 ----
  const out = box.querySelector('.sr-henge-out'), cv = box.querySelector('.sr-compass'), rng = box.querySelector('.sr-angle'), custom = box.querySelector('.sr-custom');
  let road = 'zhongxiao', timer = 0;
  const westAz = () => (road === 'custom' ? 270 + parseFloat(rng.value) : ROADS[road].az);
  function next(az, site) {
    const from = Date.UTC(td.y, td.m - 1, td.d), until = from + 366 * DAY;
    const runs = [...groupRuns(hengeDays(az, site, td.y)), ...groupRuns(hengeDays(az, site, td.y + 1))]
      .filter(([, b]) => Date.UTC(b.y, b.m - 1, b.d) >= from && Date.UTC(b.y, b.m - 1, b.d) < until);
    return runs.slice(0, 2);
  }
  const fmtRun = ([a, b], site) => {
    const same = a.m === b.m && a.d === b.d;
    return `<li><b>${same ? dEn(a) : `${dEn(a)} – ${dEn(b)}`}${a.y !== td.y ? `, ${a.y}` : ''}</b> around ${ampm(a.t, site.tz)}<span class="zh">${a.y !== td.y ? `${a.y} 年 ` : ''}${same ? dZh(a) : `${dZh(a)}到 ${dZh(b)}`}，約 ${hhmm(a.t, site.tz)}</span></li>`;
  };
  function drawCompass() {
    const W = cv.clientWidth || 220, N = Math.round(W * Math.min(window.devicePixelRatio || 1, 2));
    if (cv.width !== N || cv.height !== N) { cv.width = cv.height = N; cv.style.height = `${W}px`; }
    const c = cv.getContext('2d'), k = N / W; c.setTransform(k, 0, 0, k, 0, 0);
    const cx = W / 2, cy = W / 2, r = W * 0.34, P2 = (az, rr) => [cx + rr * Math.sin(az * DEG), cy - rr * Math.cos(az * DEG)];
    c.fillStyle = '#0c1428'; c.fillRect(0, 0, W, W);
    c.strokeStyle = 'rgba(160,180,230,.4)'; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke();
    const sector = (a0, a1, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(cx, cy); for (let a = a0; a <= a1; a += 1) c.lineTo(...P2(a, r)); c.closePath(); c.fill(); };
    sector(ex.north.riseAz, ex.south.riseAz, 'rgba(255,211,110,.28)'); sector(ex.south.setAz, ex.north.setAz, 'rgba(255,140,80,.28)');
    const wa = westAz(), ea = wa - 180;
    c.strokeStyle = '#cfd8ea'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(...P2(ea, r * 0.95)); c.lineTo(...P2(wa, r * 0.95)); c.stroke();
    c.strokeStyle = '#0c1428'; c.lineWidth = 1.5; c.setLineDash([5, 5]); c.beginPath(); c.moveTo(...P2(ea, r * 0.95)); c.lineTo(...P2(wa, r * 0.95)); c.stroke(); c.setLineDash([]); c.lineWidth = 1;
    c.font = `700 ${Math.max(10, W * 0.055)}px system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (const [t, az] of [['N 北', 0], ['E 東', 90], ['S 南', 180], ['W 西', 270]]) { c.fillStyle = '#9fb0cf'; c.fillText(t, ...P2(az, r + W * (az % 180 ? 0.1 : 0.07))); }
    c.fillStyle = '#ffd36e'; c.font = `600 ${Math.max(9, W * 0.045)}px system-ui, sans-serif`;
    const below = (az) => { const [x, y] = P2(az, r * 0.6); return [x, y + W * 0.11]; };
    c.fillText('sunrise 日出', ...below(90)); c.fillStyle = '#ff9a6a'; c.fillText('sunset 日落', ...below(270));
  }
  function compute() {
    const wa = westAz(), site = road === 'custom' ? PLACES.changhua : ROADS[road].site, off = wa - 270;
    const o = Math.abs(off), cvT = o < 0.25 ? ['exactly east–west', '正東西向'] : [`${o.toFixed(1)}° ${off > 0 ? 'north' : 'south'} of west`, `西偏${off > 0 ? '北' : '南'} ${o.toFixed(1)}°`];
    box.querySelector('.sr-cv').textContent = cvT[0]; box.querySelector('.sr-cvz').textContent = cvT[1];
    drawCompass();
    const ss = next(wa, site), sr = next(wa - 180, site);
    const where = road === 'custom' ? `A street in Changhua · 彰化的一條街` : `${ROADS[road].en} · ${ROADS[road].zh}`;
    const list = (runs, s) => (runs.length ? `<ul>${runs.map((q) => fmtRun(q, s)).join('')}</ul>` : '<p class="sr-none">The Sun never lines up with this end of the street.<span class="zh">太陽一年到頭都不會對準這一端。</span></p>');
    out.innerHTML = `<p class="sr-where">${where}</p>
      <div class="sr-hcol"><h4>Sunset henge, looking west<span class="zh">日落懸日（往西看）</span></h4>${list(ss, site)}</div>
      <div class="sr-hcol"><h4>Sunrise henge, looking east<span class="zh">日出懸日（往東看）</span></h4>${list(sr, site)}<p class="sr-small">In Taiwan, mountains usually hide the eastern horizon, so sunrise henges are rarely seen.<span class="zh">台灣東邊多半有山擋住，日出懸日很少看得到。</span></p></div>`;
  }
  box.querySelectorAll('.sr-roads button').forEach((b) => b.addEventListener('click', () => {
    road = b.dataset.road;
    box.querySelectorAll('.sr-roads button').forEach((q) => q.setAttribute('aria-pressed', q === b ? 'true' : 'false'));
    custom.classList.toggle('on', road === 'custom');
    if (road !== 'custom') rng.value = String(ROADS[road].az - 270);
    compute();
  }));
  rng.addEventListener('input', () => {
    if (road !== 'custom') { road = 'custom'; box.querySelectorAll('.sr-roads button').forEach((q) => q.setAttribute('aria-pressed', q.dataset.road === 'custom' ? 'true' : 'false')); custom.classList.add('on'); }
    drawCompass(); clearTimeout(timer); timer = setTimeout(compute, 160);
  });
  new ResizeObserver(drawCompass).observe(cv);
  compute();
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-sunrise-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-sunrise]');
  if (tn) renderToday(tn);
  document.querySelectorAll('[data-lab-day]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.jumpKey(b.getAttribute('data-lab-day'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

