/*
 * 天文教育 · 第八課「古人怎麼用太陽看時間？」的 3D 模型。
 *
 * 一個機制：影子跟著太陽轉，一根竿子就能當時鐘；把竿子（晷針）斜到指向北極星，影子就一年到頭
 * 每小時均勻轉 15°。但日晷時間和時鐘時間不一樣：均時差（地球軌道是橢圓、地軸傾斜）一年最多約 16 分鐘，
 * 彰化在東經 120.54°、比台灣標準時的 120°E 偏東，日晷再快約 2.2 分鐘。
 *
 * 場景是彰化的一塊地面：+X 東、+Y 天頂、+Z 南（-Z 北）。太陽方向用 ephem.js 的 sunAltAz（第三課同一套）。
 * 影子是解析算的（不靠陰影貼圖）：
 *   竿影：竿頂 (0,h,0) 沿太陽反方向投到地面。
 *   赤道式日晷：晷面垂直於天軸 A（指向北極星），晷針沿 A 穿過中心；
 *     太陽在 A 這一側（春分到秋分）影子落在上面，另一側（秋分到春分）落在下面，影子方向就是時角——每小時 15°。
 *
 * 產物：cd tools/astro && npm run build → assets/js/sundial.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight,
  DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial, LineSegments, MathUtils, Mesh,
  MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, Points, PointsMaterial, Quaternion, Scene,
  SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, glowTexture } from './common.js';
import * as E from './ephem.js';

const SITE = { lat: 24.08, lon: 120.54, tz: 8, en: 'Changhua', zh: '彰化' };
export const LON_MIN = (SITE.lon - 120) * 4;         // 經度修正（分鐘）：彰化的日晷比時鐘快這麼多
const DAY = 86400000, HOUR = 3600000;
const RSKY = 9;           // 太陽軌跡畫在多大的天穹上
const H = 2.6;            // 竿子高度
const RD = 1.55;          // 日晷晷面半徑

const pad = (n) => String(n).padStart(2, '0');
function tw(d) { const x = new Date(d.getTime() + 8 * HOUR); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() }; }
const twDate = (y, m, d, h = 0, mi = 0) => new Date(Date.UTC(y, m - 1, d, h, mi) - 8 * HOUR);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const hm = (h) => { h = ((h % 24) + 24) % 24; let a = Math.floor(h), b = Math.round((h - a) * 60); if (b === 60) { a = (a + 1) % 24; b = 0; } return `${pad(a)}:${pad(b)}`; };
const hms = (h) => { h = ((h % 24) + 24) % 24; const s = Math.round(h * 3600); return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`; };

/** 日晷減時鐘（分鐘）：均時差＋經度修正。 */
export const sundialMinusClock = (date) => E.sunEquatorial(date).eotMin + LON_MIN;
/** 某天中午附近的地方視太陽時（小時）。 */
const solarHour = (date) => { const x = tw(date); return x.h + x.mi / 60 + sundialMinusClock(date) / 60; };

const sunVec = (date) => {
  const s = E.sunAltAz(date, SITE), a = s.alt * DEG, z = s.az * DEG;
  return new Vector3(Math.cos(a) * Math.sin(z), Math.sin(a), -Math.cos(a) * Math.cos(z));
};
// 天軸（指向北極星）與赤道座標的兩個軸（第六課同一套）
const PH = SITE.lat * DEG;
const AX = new Vector3(0, Math.sin(PH), -Math.cos(PH));          // 晷針方向
const IX = new Vector3(0, Math.cos(PH), Math.sin(PH));           // 天赤道在子午線上的點
const IZ = new Vector3(-1, 0, 0);                                // 西
// 時角 Ha（度，正午 0、下午為正）的影子方向（在晷面上）
const hourDir = (ha) => new Vector3().addScaledVector(IX, -Math.cos(ha * DEG)).addScaledVector(IZ, -Math.sin(ha * DEG));
const lineGeo = (pts) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return g; };

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), eotCv = $('.sd-eot-cv');
  let renderer, camFace = 1, camT = 1;
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const state = { t: Date.now(), tod: 12 * 60, playing: false, speed: 0.0416667, mode: 'stick', marks: true, path: true, fig8: false, solst: true, year: null };

  let scene, camera, controls, sunSpr, sunLight, skyCol, pathLine, solstG, fig8G, stickG, dialG, stickShadow, dialShadow, tipPath, marksG, ground;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    scene = new Scene(); skyCol = new Color(0x0a1530); scene.background = skyCol;
    scene.add(new AmbientLight(0xc8d4ff, 0.55));
    sunLight = new DirectionalLight(0xfff4e0, 1.6); scene.add(sunLight);
    camera = new PerspectiveCamera(45, 1.6, 0.05, 500);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 4; controls.maxDistance = 40; controls.maxPolarAngle = Math.PI * 0.49;

    // 地面與方位
    ground = new Mesh(new CircleGeometry(6.5, 96).rotateX(-Math.PI / 2), new MeshLambertMaterial({ color: 0x7fa070 }));
    scene.add(ground);
    {
      const pts = []; for (let k = 0; k <= 128; k++) { const a = (k / 128) * TAU; pts.push(new Vector3(6.5 * Math.cos(a), 0.01, 6.5 * Math.sin(a))); }
      scene.add(new Line(lineGeo(pts), new LineBasicMaterial({ color: 0xcfe9d4, transparent: true, opacity: 0.6 })));
      scene.add(new Line(lineGeo([new Vector3(0, 0.012, 0.2), new Vector3(0, 0.012, -6.3)]), new LineBasicMaterial({ color: 0xff8a6b })));   // 正北線
      // 天穹的地平圈
      const hp = []; for (let k = 0; k <= 128; k++) { const a = (k / 128) * TAU; hp.push(new Vector3(RSKY * Math.cos(a), 0, RSKY * Math.sin(a))); }
      scene.add(new Line(lineGeo(hp), new LineBasicMaterial({ color: 0x9fb0cf, transparent: true, opacity: 0.3 })));
    }
    // 太陽
    sunSpr = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,240,1)'], [0.18, 'rgba(255,236,170,1)'], [0.4, 'rgba(255,200,90,.5)'], [1, 'rgba(255,160,40,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    sunSpr.scale.setScalar(2.2); scene.add(sunSpr);
    pathLine = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.85 })); scene.add(pathLine);
    solstG = new Group(); scene.add(solstG);
    fig8G = new Group(); scene.add(fig8G);

    // 竿子（圭表）：竿＋朝北的圭（量正午影長的尺）
    stickG = new Group(); scene.add(stickG);
    stickG.add(new Mesh(new CylinderGeometry(0.075, 0.09, H, 16).translate(0, H / 2, 0), new MeshLambertMaterial({ color: 0x8a5a2b })));
    {
      const ruler = new Mesh(new CylinderGeometry(0.06, 0.06, 4.6, 8).rotateX(Math.PI / 2).translate(0, 0.03, -2.3), new MeshLambertMaterial({ color: 0xc9b48a }));
      stickG.add(ruler);
      const ticks = [];
      for (let k = 1; k <= 4; k++) ticks.push(new Vector3(-0.12, 0.07, -k), new Vector3(0.12, 0.07, -k));
      const tg = new BufferGeometry(); tg.setAttribute('position', new Float32BufferAttribute(ticks.flatMap((p) => [p.x, p.y, p.z]), 3));
      stickG.add(new LineSegments(tg, new LineBasicMaterial({ color: 0x5a4320 })));
    }
    stickShadow = new Mesh(new BufferGeometry(), new MeshBasicMaterial({ color: 0x050806, transparent: true, opacity: 0.82, side: DoubleSide, depthWrite: false }));
    stickShadow.renderOrder = 2; stickG.add(stickShadow);
    tipPath = new Group(); stickG.add(tipPath);
    marksG = new Group(); stickG.add(marksG);

    // 赤道式日晷：晷面垂直天軸、晷針沿天軸
    dialG = new Group(); scene.add(dialG);
    const center = new Vector3(0, 1.75, 0);
    dialG.userData.center = center;
    {
      const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), AX);
      const plate = new Mesh(new CylinderGeometry(RD, RD, 0.08, 64), new MeshLambertMaterial({ color: 0xd8d0bc, emissive: 0x5a554a }));   // 自帶一點亮度：春秋分前後陽光幾乎擦過晷面
      plate.quaternion.copy(q); plate.position.copy(center); dialG.add(plate);
      const rod = new Mesh(new CylinderGeometry(0.03, 0.03, 3.4, 10), new MeshLambertMaterial({ color: 0x8a6a3a }));
      rod.quaternion.copy(q); rod.position.copy(center); dialG.add(rod);
      // 底座：撐在晷面最低的北緣（從南方看下面時不會擋住晷面）
      const low = center.clone().addScaledVector(IX, -RD * 0.92);
      dialG.add(new Mesh(new CylinderGeometry(0.1, 0.18, low.y, 12).translate(low.x, low.y / 2, low.z), new MeshLambertMaterial({ color: 0x9a9a9a })));
      dialG.add(new Mesh(new CylinderGeometry(0.45, 0.55, 0.16, 20).translate(low.x, 0.08, low.z), new MeshLambertMaterial({ color: 0x8a8a8a })));
      // 時刻線（上下兩面，每 15°）
      const segs = [];
      for (let h = 6; h <= 18; h++) {
        const d = hourDir((h - 12) * 15);
        for (const s of [1, -1]) {
          const off = AX.clone().multiplyScalar(s * 0.045);
          segs.push(center.clone().add(off).addScaledVector(d, RD * 0.55), center.clone().add(off).addScaledVector(d, RD * 0.97));
        }
      }
      dialG.add(new LineSegments(lineGeo(segs), new LineBasicMaterial({ color: 0x3a2a14 })));
    }
    dialShadow = new Mesh(new BufferGeometry(), new MeshBasicMaterial({ color: 0x1a1208, transparent: true, opacity: 0.85, side: DoubleSide, depthWrite: false }));
    dialShadow.renderOrder = 3; dialG.add(dialShadow);
  }

  // 一條粗影子：在平面上、從 a 到 b、寬 w，n 是平面法線
  function shadowQuad(mesh, a, b, w, n) {
    const d = b.clone().sub(a), side = new Vector3().crossVectors(n, d).normalize().multiplyScalar(w / 2);
    const p = [a.clone().add(side), a.clone().sub(side), b.clone().sub(side.clone().multiplyScalar(0.4)), b.clone().add(side.clone().multiplyScalar(0.4))];
    mesh.geometry.dispose();
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute([...p[0].toArray(), ...p[1].toArray(), ...p[2].toArray(), ...p[0].toArray(), ...p[2].toArray(), ...p[3].toArray()], 3));
    mesh.geometry = g;
  }

  // 某一天：太陽軌跡、竿影頂點的軌跡與整點（日晷時間）的刻度
  let dayKey = '';
  function buildDay(date) {
    if (!renderer) return;
    const x = tw(date), key = `${x.y}-${x.m}-${x.d}`;
    if (key === dayKey) return; dayKey = key;
    const pts = [], tips = [];
    for (let m = 0; m <= 1440; m += 5) {
      const v = sunVec(twDate(x.y, x.m, x.d, 0, m));
      if (v.y < -0.01) continue;
      pts.push(v.clone().multiplyScalar(RSKY));
      if (v.y > 0.12) tips.push(new Vector3(-v.x * H / v.y, 0.02, -v.z * H / v.y));
    }
    pathLine.geometry.dispose(); pathLine.geometry = lineGeo(pts.length > 1 ? pts : [new Vector3(), new Vector3()]);
    tipPath.clear();
    if (tips.length > 1) tipPath.add(new Line(lineGeo(tips.filter((p) => p.length() < 6.4)), new LineBasicMaterial({ color: 0x1d2b22 })));
    // 日晷整點：地方視太陽時 7–17 點，換成時鐘時刻再算影子
    marksG.clear(); marksG.userData.marks = [];
    const dm = sundialMinusClock(twDate(x.y, x.m, x.d, 12));
    for (let sh = 6; sh <= 18; sh++) {
      const clockMin = sh * 60 - dm;
      const v = sunVec(twDate(x.y, x.m, x.d, 0, clockMin));
      if (v.y < 0.12) continue;
      const tip = new Vector3(-v.x * H / v.y, 0.02, -v.z * H / v.y);
      if (tip.length() > 6.3) continue;
      marksG.add(new Mesh(new SphereGeometry(0.07, 10, 8).translate(tip.x, tip.y, tip.z), new MeshBasicMaterial({ color: sh === 12 ? 0xffd36e : 0xffffff })));
      marksG.userData.marks.push({ tip, sh });
    }
  }
  // 冬至、夏至的竿影頂點軌跡（虛線），看出「同一個鐘點，影子在不同季節指向不同地方」
  function buildSolstices(y) {
    if (!renderer) return;
    solstG.clear();
    const terms = E.solarTermsOfYear(y);
    for (const lon of [90, 270]) {
      const td = tw(terms.find((t) => t.lon === lon).date), tips = [], sky = [];
      for (let m = 0; m <= 1440; m += 6) {
        const v = sunVec(twDate(td.y, td.m, td.d, 0, m));
        if (v.y > -0.01) sky.push(v.clone().multiplyScalar(RSKY));
        if (v.y > 0.12) { const tip = new Vector3(-v.x * H / v.y, 0.02, -v.z * H / v.y); if (tip.length() < 6.4) tips.push(tip); }
      }
      const col = lon === 90 ? 0xffb27a : 0x9fd8ff;
      solstG.add(new Line(lineGeo(sky), new LineBasicMaterial({ color: col, transparent: true, opacity: 0.45 })));
      const tl = new Line(lineGeo(tips.length > 1 ? tips : [new Vector3(), new Vector3()]), new LineBasicMaterial({ color: col, transparent: true, opacity: 0.8 }));
      tl.userData.ground = true; solstG.add(tl);
    }
  }
  // 每天時鐘 12:00 的太陽位置（一年）：天上與地上的「8 字」
  function buildFig8(y) {
    if (!renderer) return;
    fig8G.clear();
    const sky = [], tips = [];
    for (let k = 0; k < 366; k += 2) {
      const d = new Date(twDate(y, 1, 1, 12).getTime() + k * DAY), v = sunVec(d);
      sky.push(v.clone().multiplyScalar(RSKY));
      tips.push(new Vector3(-v.x * H / v.y, 0.025, -v.z * H / v.y));
    }
    const mk = (pts, c, sz) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return new Points(g, new PointsMaterial({ color: c, size: sz, sizeAttenuation: true })); };
    fig8G.add(mk(sky, 0xffd36e, 0.16));
    const g8 = mk(tips, 0xff8a6b, 0.09); g8.userData.ground = true; fig8G.add(g8);
  }

  // ---------------- 時間軸 ----------------
  const dateSl = $('.sd-date'), timeSl = $('.sd-time'), track = $('.sd-track');
  const yearStart = (y) => Date.UTC(y, 0, 1) - 8 * HOUR;
  let keyDates = [];
  function setYear(y) {
    if (state.year === y) return;
    state.year = y;
    const terms = E.solarTermsOfYear(y);
    // 日晷最慢（2 月）與最快（11 月）：掃一整年找均時差極值
    let mn = null, mx = null;
    for (let k = 0; k < 366; k++) {
      const d = twDate(y, 1, 1 + k, 12), v = sundialMinusClock(d);
      if (!mn || v < mn.v) mn = { d, v }; if (!mx || v > mx.v) mx = { d, v };
    }
    keyDates = [
      { d: mn.d, en: 'Sundial slowest', zh: '日晷最慢' },
      { d: terms.find((t) => t.lon === 90).date, en: 'Summer solstice', zh: '夏至' },
      { d: mx.d, en: 'Sundial fastest', zh: '日晷最快' },
      { d: terms.find((t) => t.lon === 270).date, en: 'Winter solstice', zh: '冬至' },
    ];
    track.innerHTML = '';
    const s0 = yearStart(y), len = yearStart(y + 1) - s0;
    for (let m = 0; m < 12; m++) {
      const el = document.createElement('span'); el.className = 'ec-tick'; el.style.left = `${((Date.UTC(y, m, 1) - 8 * HOUR - s0) / len) * 100}%`; el.textContent = `${m + 1}月`;
      track.appendChild(el);
    }
    keyDates.forEach((k, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'se-mark';
      b.style.left = `${((k.d.getTime() - s0) / len) * 100}%`; const x = tw(k.d);
      b.textContent = k.zh.replace('日晷', ''); b.title = `${k.en} · ${k.zh}（${x.m}/${x.d}）`;
      b.addEventListener('click', () => jumpKey(i));
      track.appendChild(b);
    });
    $$('.sd-key').forEach((b, i) => { const x = tw(keyDates[i].d); const el = b.querySelector('.sd-key-d'); if (el) el.textContent = `${x.m}/${x.d}`; });
    dateSl.max = String(Math.round(len / HOUR));
    buildSolstices(y); buildFig8(y);
  }

  const fast = () => state.playing && state.speed >= 1;
  function clockDate() {
    if (!fast()) return new Date(state.t);
    const x = tw(new Date(state.t));
    return twDate(x.y, x.m, x.d, 0, state.tod);
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; labels.appendChild(s); return s; };
  const L = renderer ? {
    sun: lab('sun', '&#9728; Sun · 太陽'),
    dirs: [['N', '北', 0, -1], ['E', '東', 1, 0], ['S', '南', 0, 1], ['W', '西', -1, 0]].map(([en, zh, x, z]) => ({ el: lab('ns-dir', `${en} ${zh}`), v: new Vector3(x * 7, 0, z * 7) })),
    marks: Array.from({ length: 13 }, () => lab('sd-mark', '')),
    dialH: Array.from({ length: 13 }, () => lab('sd-mark sd-dialh', '')),
    rod: lab('pol', 'Gnomon points to the North Star · 晷針指向北極星'),
    face: lab('sd-face', ''),
    summer: lab('sd-sol sd-sum', 'Summer solstice · 夏至'), winter: lab('sd-sol sd-win', 'Winter solstice · 冬至'),
    fig8: lab('sd-sol sd-f8', 'Sun at 12:00 every day · 每天 12:00 的太陽'),
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
    const stick = state.mode === 'stick';
    place(L.sun, sunSpr.position, -34, sunSpr.visible);
    L.dirs.forEach((d) => place(d.el, d.v, -8));
    const ms = (marksG.userData.marks || []);
    L.marks.forEach((el, i) => {
      const m = ms[i]; if (!m || !stick || !state.marks) { el.style.opacity = 0; return; }
      el.textContent = String(m.sh); el.classList.toggle('noon', m.sh === 12);
      // 標籤放在影子頂端的外側（離竿子更遠），不要蓋住影子本身
      place(el, m.tip.clone().add(new Vector3(m.tip.x, 0, m.tip.z).normalize().multiplyScalar(0.45)), -6);
    });
    const c = dialG.userData.center, up = state.sunUp && state.sunSide >= 0;
    L.dialH.forEach((el, i) => {
      const h = 6 + i; if (stick || !state.marks) { el.style.opacity = 0; return; }
      el.textContent = String(h); el.classList.toggle('noon', h === 12);
      place(el, c.clone().addScaledVector(hourDir((h - 12) * 15), RD * 1.12).addScaledVector(AX, up ? 0.08 : -0.08), -8);
    });
    place(L.rod, c.clone().addScaledVector(AX, camFace * 1.75), camFace > 0 ? -26 : 10, !stick);
    L.face.innerHTML = Math.abs(state.sunSide) < 0.07 ? 'Near the equinox, sunlight just grazes the dial · 春秋分前後，陽光幾乎擦過晷面，影子很難讀'
      : state.sunSide >= 0 ? 'Read the top face (spring–summer) · 看上面（春分到秋分）' : 'Read the bottom face (autumn–winter) · 看下面（秋分到春分）';
    place(L.face, c.clone().add(new Vector3(0, RD + 0.5, 0)), -10, !stick);
    const kids = solstG.children;
    place(L.summer, kids[0] ? midTop(kids[0]) : new Vector3(), -18, state.solst && state.path && kids.length > 0);
    place(L.winter, kids[2] ? midTop(kids[2]) : new Vector3(), 10, state.solst && state.path && kids.length > 2);
    const f8 = fig8G.children[0];
    place(L.fig8, f8 ? topOf(f8) : new Vector3(), -22, state.fig8 && !!f8);
  }
  const midTop = (line) => { const a = line.geometry.attributes.position; let best = 0; for (let i = 0; i < a.count; i++) if (a.getY(i) > a.getY(best)) best = i; return new Vector3().fromBufferAttribute(a, best); };
  const topOf = midTop;

  // ---------------- 更新 ----------------
  const R = {
    date: $('.sd-date-t'), clock: $('.sd-clock'), dial: $('.sd-dialtime'), diff: $('.sd-diff'), why: $('.sd-why'),
    noon: $('.sd-noon'), shadow: $('.sd-shadow'), sun: $('.sd-sun'), badge: $('.sd-badge'),
  };
  function update() {
    const date = clockDate(), x = tw(date);
    setYear(x.y);
    const v = sunVec(date);
    state.sunUp = v.y > 0; state.sunSide = v.dot(AX);
    const face = E.sunEquatorial(date).dec >= 0 ? 1 : -1;
    if (renderer && face !== camFace) { camFace = face; if (state.mode === 'dial') { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; } }
    if (renderer) {
      buildDay(date);
      sunSpr.position.copy(v.clone().multiplyScalar(RSKY)); sunSpr.visible = v.y > -0.05;
      sunLight.position.copy(v.clone().multiplyScalar(20)); sunLight.intensity = v.y > 0 ? 1.6 : 0;
      const dayK = MathUtils.smoothstep(v.y, -0.1, 0.25);
      skyCol.setRGB(0.04 + 0.32 * dayK, 0.08 + 0.48 * dayK, 0.19 + 0.66 * dayK);
      ground.material.color.setRGB(0.24 + 0.26 * dayK, 0.32 + 0.3 * dayK, 0.22 + 0.2 * dayK);
      const stick = state.mode === 'stick';
      stickG.visible = stick; dialG.visible = !stick;
      pathLine.visible = state.path;
      solstG.visible = state.solst && state.path; solstG.children.forEach((c) => { if (c.userData.ground) c.visible = stick; });
      fig8G.visible = state.fig8; fig8G.children.forEach((c) => { if (c.userData.ground) c.visible = stick; });
      marksG.visible = state.marks;
      // 竿影
      if (v.y > 0.03) {
        const tip = new Vector3(-v.x * H / v.y, 0.03, -v.z * H / v.y);
        if (tip.length() > 6.4) tip.setLength(6.4);
        shadowQuad(stickShadow, new Vector3(0, 0.03, 0), tip, 0.2, new Vector3(0, 1, 0));
        stickShadow.visible = true;
      } else stickShadow.visible = false;
      // 日晷影：晷針在亮面那一側的半截，投影到晷面上
      const s = v.dot(AX), c = dialG.userData.center;
      if (v.y > 0.02 && Math.abs(s) > 0.01) {
        const dir = AX.clone().sub(v.clone().divideScalar(s)).multiplyScalar(Math.sign(s));   // 影子在晷面上的方向
        const len = Math.min(RD * 0.96, dir.length() * 1.7);
        const n = AX.clone().multiplyScalar(Math.sign(s));
        const a = c.clone().addScaledVector(n, 0.045), b = a.clone().addScaledVector(dir.normalize(), len);
        shadowQuad(dialShadow, a, b, 0.07, n);
        dialShadow.visible = true;
      } else dialShadow.visible = false;
    }
    readout(date, x, v);
    drawEot(date);
    const s0 = yearStart(x.y);
    dateSl.value = String(Math.round((state.t - s0) / HOUR));
    dateSl.style.setProperty('--p', `${((state.t - s0) / (yearStart(x.y + 1) - s0)) * 100}%`);
    timeSl.value = String(x.h * 60 + x.mi);
    timeSl.style.setProperty('--p', `${(((x.h * 60 + x.mi) - 300) / 900) * 100}%`);
  }
  function readout(date, x, v) {
    R.date.innerHTML = `${MON[x.m - 1]} ${x.d}, ${x.y}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）</span>`;
    const dm = sundialMinusClock(date);
    R.clock.textContent = hm(x.h + x.mi / 60);
    R.dial.textContent = v.y > 0 ? hm(solarHour(date)) : '—';
    R.diff.innerHTML = Math.abs(dm) < 0.5 ? 'Sundial and clock agree<span>日晷和時鐘差不多</span>'
      : dm > 0 ? `Sundial is ${dm.toFixed(1)} min ahead<span>日晷比時鐘快 ${dm.toFixed(1)} 分鐘</span>` : `Sundial is ${(-dm).toFixed(1)} min behind<span>日晷比時鐘慢 ${(-dm).toFixed(1)} 分鐘</span>`;
    const eot = dm - LON_MIN;
    R.why.innerHTML = `${eot >= 0 ? '+' : '−'}${Math.abs(eot).toFixed(1)} min from Earth's orbit and tilt, +${LON_MIN.toFixed(1)} min because Changhua is east of 120°E<span>地球軌道與地軸造成 ${eot >= 0 ? '+' : '−'}${Math.abs(eot).toFixed(1)} 分；彰化在東經 120° 以東，再 +${LON_MIN.toFixed(1)} 分</span>`;
    const di = E.dayInfo(date, SITE);
    R.noon.innerHTML = `${hms(di.noon)}<span>太陽正午（時鐘時間）；日出 ${hm(di.rise)}、日落 ${hm(di.set)}</span>`;
    const L1 = 1 / Math.tan(di.noonAlt * DEG);
    R.shadow.innerHTML = L1 < 0.02 ? 'Almost no shadow<span>幾乎沒有影子（太陽差不多在頭頂）</span>'
      : `${Math.round(L1 * 100)} cm for a 1-meter stick, pointing north<span>一公尺的竿子，影長 ${Math.round(L1 * 100)} 公分，朝北</span>`;
    const s = E.sunAltAz(date, SITE);
    R.sun.innerHTML = s.alt > 0 ? `${s.alt.toFixed(0)}° up, toward the ${['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'][Math.round(s.az / 45) % 8]}<span>高 ${s.alt.toFixed(0)}°，在${['北', '東北', '東', '東南', '南', '西南', '西', '西北'][Math.round(s.az / 45) % 8]}方</span>`
      : 'Below the horizon: no shadow, no sundial<span>在地平線下：沒有影子，日晷也停了</span>';
  }

  // ---------------- 均時差曲線（日晷減時鐘，一整年） ----------------
  const ectx = eotCv.getContext('2d');
  function drawEot(date) {
    const W = eotCv.width, Hc = eotCv.height; if (!W) return;
    const s = W / 360, y = tw(date).y;
    const padL = 30 * s, padR = 8 * s, padT = 14 * s, padB = 22 * s;
    const X = (k) => padL + (k / 365) * (W - padL - padR);
    const Y = (m) => padT + ((22 - m) / 38) * (Hc - padT - padB);     // −16 … +22 分
    ectx.fillStyle = '#050a1a'; ectx.fillRect(0, 0, W, Hc);
    const font = (px, wt = 700) => `${wt} ${Math.round(px * s)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    ectx.strokeStyle = 'rgba(160,180,230,.18)'; ectx.lineWidth = 1 * s; ectx.font = font(9); ectx.fillStyle = 'rgba(159,176,207,.9)';
    ectx.textAlign = 'right'; ectx.textBaseline = 'middle';
    for (const m of [-15, -10, -5, 0, 5, 10, 15, 20]) {
      ectx.beginPath(); ectx.moveTo(padL, Y(m)); ectx.lineTo(W - padR, Y(m)); ectx.stroke();
      ectx.fillText(`${m > 0 ? '+' : ''}${m}`, padL - 4 * s, Y(m));
    }
    ectx.textAlign = 'center';
    for (let m = 0; m < 12; m++) { const k = (Date.UTC(y, m, 15) - Date.UTC(y, 0, 1)) / DAY; ectx.fillText(`${m + 1}`, X(k), Hc - 9 * s); }
    ectx.strokeStyle = 'rgba(232,237,247,.6)'; ectx.beginPath(); ectx.moveTo(padL, Y(0)); ectx.lineTo(W - padR, Y(0)); ectx.stroke();
    // 均時差（虛線）與彰化的日晷減時鐘（實線）
    const curve = (off, style, w, dash) => {
      ectx.strokeStyle = style; ectx.lineWidth = w * s; ectx.setLineDash(dash ? dash.map((d) => d * s) : []);
      ectx.beginPath();
      for (let k = 0; k <= 365; k += 2) { const v = sundialMinusClock(twDate(y, 1, 1 + k, 12)) - LON_MIN + off; if (k === 0) ectx.moveTo(X(k), Y(v)); else ectx.lineTo(X(k), Y(v)); }
      ectx.stroke(); ectx.setLineDash([]);
    };
    curve(0, 'rgba(159,216,255,.7)', 1.4, [4, 3]);
    curve(LON_MIN, '#ffd36e', 2.4);
    const k = (date.getTime() + 8 * HOUR - Date.UTC(y, 0, 1)) / DAY, v = sundialMinusClock(date);
    ectx.fillStyle = '#ff8a6b'; ectx.beginPath(); ectx.arc(X(k), Y(v), 5 * s, 0, TAU); ectx.fill();
    ectx.font = font(9.5, 800); ectx.textAlign = 'left'; ectx.fillStyle = '#ffd36e';
    ectx.fillText('Changhua sundial − clock · 彰化日晷減時鐘', padL + 4 * s, padT - 4 * s);
    ectx.fillStyle = 'rgba(159,216,255,.9)'; ectx.textAlign = 'right';
    ectx.fillText('Equation of time · 均時差', W - padR - 2 * s, Y(-15) - 2 * s);
  }

  // ---------------- 相機 ----------------
  const CAM = { stick: new Vector3(5.2, 7.2, 9.6), dial: new Vector3(5.2, 3.4, 5.8) };
  // 日晷：相機對準被照亮的那一面（春分到秋分看上面、秋分到春分看下面），稍微偏東
  function camGoal() {
    if (state.mode !== 'dial') return { pos: CAM.stick.clone(), tgt: new Vector3(0, 1.2, -1.0) };
    const c = dialG.userData.center;
    const pos = c.clone().addScaledVector(AX, camFace * 4.4).add(new Vector3(1.4, camFace > 0 ? 1.0 : 2.3, 0));   // 看下面時抬高，避開底座
    pos.y = Math.max(0.55, pos.y);
    return { pos, tgt: c.clone().add(new Vector3(0, -0.1, 0)) };
  }
  function setMode(m) {
    state.mode = m;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === m ? 'true' : 'false'));
    if (!renderer) return;
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
    update();
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (camera.aspect < 1.1 ? 74 : 62) * DEG;
        camera.fov = Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
        camera.updateProjectionMatrix();
      }
    }
    const pw = eotCv.parentElement.clientWidth;
    if (pw) { eotCv.width = Math.round(pw * dpr); eotCv.height = Math.round(pw * 0.62 * dpr); update(); }
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(eotCv.parentElement);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(p) {
    if (p) { const x = tw(new Date(state.t)); state.tod = x.h * 60 + x.mi; }
    else if (state.playing) state.t = clockDate().getTime();
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setSpeed(v) {
    state.speed = v;
    $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', Math.abs(parseFloat(b.dataset.speed) - v) < 1e-6 ? 'true' : 'false'));
  }
  function setT(t, badge = '') {
    const x = tw(new Date(t));
    // 白天的課：把時間限制在 05:00–20:00
    const m = x.h * 60 + x.mi;
    if (!state.playing || state.speed < 1) { if (m < 300) t += (300 - m) * 60000; if (m > 1200) t -= (m - 1200) * 60000; }
    state.t = t; R.badge.hidden = !badge; if (badge) R.badge.querySelector('b').textContent = badge;
    update();
  }
  function jumpKey(i) {
    setPlaying(false);
    const x = tw(keyDates[i].d);
    // 跳到那一天「時鐘 12:00」：看日晷比時鐘快或慢多少
    setT(twDate(x.y, x.m, x.d, 12).getTime(), `${keyDates[i].en} · ${keyDates[i].zh}`);
    $$('.sd-key').forEach((b) => b.classList.toggle('on', +b.dataset.key === i));
  }
  function solarNoon() {
    const x = tw(new Date(state.t)), di = E.dayInfo(twDate(x.y, x.m, x.d, 12), SITE);
    setPlaying(false); setT(twDate(x.y, x.m, x.d, 0, di.noon * 60).getTime(), 'Solar noon · 太陽正午');
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
  $$('.sd-key').forEach((b) => b.addEventListener('click', () => jumpKey(+b.dataset.key)));
  const clearKeys = () => $$('.sd-key').forEach((b) => b.classList.remove('on'));
  dateSl.addEventListener('input', () => {
    setPlaying(false); clearKeys();
    const x = tw(new Date(state.t)), y = tw(new Date(yearStart(state.year) + parseFloat(dateSl.value) * HOUR));
    setT(twDate(y.y, y.m, y.d, x.h, x.mi).getTime());
  });
  timeSl.addEventListener('input', () => {
    setPlaying(false); clearKeys();
    const x = tw(new Date(state.t));
    setT(twDate(x.y, x.m, x.d, 0, parseFloat(timeSl.value)).getTime());
  });
  $('.sd-now').addEventListener('click', () => { setPlaying(false); clearKeys(); setT(Date.now(), 'Now · 現在'); });
  $('.sd-noonbtn').addEventListener('click', () => { clearKeys(); solarNoon(); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="marks"]', (v) => { state.marks = v; });
  bind('[data-t="path"]', (v) => { state.path = v; });
  bind('[data-t="solst"]', (v) => { state.solst = v; });
  bind('[data-t="fig8"]', (v) => { state.fig8 = v; });
  if (renderer) $('.al-home').addEventListener('click', () => { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) {
      let nt = state.t + dt * state.speed * DAY;
      // 慢速播放到傍晚就跳回隔天清晨
      if (state.speed < 1) { const x = tw(new Date(nt)); if (x.h * 60 + x.mi > 1170) nt = twDate(x.y, x.m, x.d + 1, 5, 30).getTime(); }
      setT(nt);
    }
    if (renderer) {
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.1);
        const k = MathUtils.smootherstep(camT, 0, 1), g = camGoal();
        camera.position.lerpVectors(camFrom, g.pos, k);
        controls.target.lerpVectors(tgtFrom, g.tgt, k);
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

  setYear(tw(new Date()).y);
  // 一打開：白天就是「現在」，晚上就跳到今天的太陽正午
  const s0 = E.sunAltAz(new Date(), SITE).alt;
  if (s0 > 3) setT(Date.now(), 'Now · 現在'); else solarNoon();
  resize();
  if (renderer) { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); }
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying, setMode, jumpKey, solarNoon, update, stickShadow, dialShadow };   // 除錯用：$('[data-sundial-lab]').__lab
  return { jumpKey, setMode };
}

// ---------------------------------------------------------------------------
// 頁面下方「今天彰化的日晷」：日晷每個整點對應的時鐘時刻
function renderToday(box) {
  const now = new Date(), x = tw(now), noonD = twDate(x.y, x.m, x.d, 12);
  const dm = sundialMinusClock(noonD), di = E.dayInfo(noonD, SITE);
  const rows = [];
  for (let h = 7; h <= 17; h++) {
    const clock = h - dm / 60;
    if (clock < di.rise || clock > di.set) continue;
    const t = twDate(x.y, x.m, x.d, 0, clock * 60), s = E.sunAltAz(t, SITE);
    const L1 = 1 / Math.tan(Math.max(1, s.alt) * DEG);
    const dir = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(((s.az + 180) % 360) / 45) % 8];
    const dirZh = ['北', '東北', '東', '東南', '南', '西南', '西', '西北'][Math.round(((s.az + 180) % 360) / 45) % 8];
    rows.push(`<tr${h === 12 ? ' class="sd-noonrow"' : ''}><td><b>${h}:00</b></td><td>${hm(clock)}</td><td>${(L1 * 100).toFixed(0)} cm · ${dir} ${dirZh}</td></tr>`);
  }
  const L1 = 1 / Math.tan(di.noonAlt * DEG);
  box.innerHTML = `<p class="tn-when">${MON[x.m - 1]} ${x.d}, ${x.y}, Changhua<span>${x.y} 年 ${x.m} 月 ${x.d} 日，彰化</span></p>
    <div class="sd-today">
      <div class="sd-big"><p><b>${hms(di.noon)}</b>Solar noon by the clock<span>時鐘上的太陽正午</span></p>
        <p><b>${dm >= 0 ? '+' : '−'}${Math.abs(dm).toFixed(1)} min</b>${dm >= 0 ? 'Sundial ahead of the clock' : 'Sundial behind the clock'}<span>${dm >= 0 ? '日晷比時鐘快' : '日晷比時鐘慢'}</span></p>
        <p><b>${Math.round(L1 * 100)} cm</b>Noon shadow of a 1-meter stick<span>一公尺竿子的正午影長</span></p></div>
      <div class="cc-tbl-wrap"><table class="cc-tbl sd-tbl"><caption>When the sundial reads… · 日晷指到…的時候</caption>
        <thead><tr><th>Sundial · 日晷</th><th>Clock · 時鐘</th><th>Shadow of a 1 m stick · 一公尺竿影</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>
    </div>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-sundial-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tb = document.querySelector('[data-sundial-today]');
  if (tb) renderToday(tb);
  document.querySelectorAll('[data-lab-mode]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setMode(b.getAttribute('data-lab-mode'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
