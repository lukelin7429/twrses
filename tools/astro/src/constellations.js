/*
 * 天文教育 · 第五課「為什麼每個季節的星空不一樣？」的 3D 模型。
 *
 * 日心場景（同第三課）：太陽在原點，地球照真實日期放在軌道上，地軸傾斜、照格林威治恆星時自轉。
 * 外面一層是**真實的天球**：耶魯亮星星表（BSC5，公有領域）裡亮於 5 等的 1,634 顆星，
 * 位置照 J2000 座標換成黃道座標再加上歲差；星座連線是本站自繪（figures.js）。
 * 天球半徑只有軌道的 21 倍（真實是幾十萬倍以上），所以從地球看出去的方向會有幾度的視差，教學上可以接受。
 *
 * 核心畫面：從地球的夜側畫一支箭頭指向天球——那一帶的星座整夜可見；太陽背後的星座被陽光淹沒。
 * 右邊的「今晚彰化的星空」是同一個時刻、從彰化抬頭看的全天星圖（北在上、東在左）。
 *
 * 座標：同第三課。X = 春分點方向，+Y = 黃道北極，黃經 λ 的方向是 (cos λ, 0, -sin λ)。
 * 產物：cd tools/astro && npm run build → assets/js/constellations.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry,
  DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial, LineDashedMaterial, LineLoop,
  LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PointLight,
  Points, Quaternion, Scene, ShaderMaterial, SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, atmosphereMaterial, glowTexture } from './common.js';
import { makeClouds, makeRealEarth } from './earthmap.js';
import * as E from './ephem.js';
import { ASTERISMS, FIGURES, NAMED, TRIANGLES } from './figures.js';
import { ASTER_LINES, LINES, NAMED_IDX, STARS, TRI_IDX } from './stars-data.js';
import {
  N_STARS, STAR_ECL, allStarsAltAz, altAz, eclToEq, meridianZodiac, moonAltAzOf, precession,
  riseSet, starEqOfDate, sunAltAzOf, sunConstellation,
} from './sky.js';

const AU = 149597870.7;
const RO = 20;            // 平均軌道半徑（畫面單位）
const RE = 1.4;           // 地球半徑（刻意放大）
const RS = 420;           // 天球半徑
const DAY = 86400000, HOUR = 3600000;
const SITE = { lat: 24.08, lon: 120.54, tz: 8 };   // 彰化
const SEASON_JUMP = [[1, 'Winter', '冬'], [4, 'Spring', '春'], [7, 'Summer', '夏'], [10, 'Autumn', '秋']];

const pad = (n) => String(n).padStart(2, '0');
function tw(d) {
  const x = new Date(d.getTime() + 8 * HOUR);
  return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() };
}
const twDate = (y, m, d, h = 0, mi = 0) => new Date(Date.UTC(y, m - 1, d, h, mi) - 8 * HOUR);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const hhmm = (d) => { const x = tw(d); return `${pad(x.h)}:${pad(x.mi)}`; };
const FIG = Object.fromEntries(FIGURES.map((f) => [f.abbr, f]));
const cname = (abbr) => `${FIG[abbr].en} · ${FIG[abbr].zh}`;

// B−V 色指數 → 星的顏色（藍白到橙紅）
const BV = [[-0.4, [150, 180, 255]], [0, [205, 218, 255]], [0.4, [240, 242, 255]], [0.65, [255, 244, 230]],
  [1.0, [255, 218, 170]], [1.4, [255, 190, 125]], [2.0, [255, 160, 95]]];
export function bvColor(bv) {
  if (bv <= BV[0][0]) return BV[0][1];
  for (let k = 1; k < BV.length; k++) {
    if (bv <= BV[k][0]) {
      const [b0, c0] = BV[k - 1], [b1, c1] = BV[k], f = (bv - b0) / (b1 - b0);
      return c0.map((v, i) => v + (c1[i] - v) * f);
    }
  }
  return BV[BV.length - 1][1];
}
const eclVec = (lon, lat, r) => new Vector3(r * Math.cos(lat * DEG) * Math.cos(lon * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lon * DEG));
const localOf = (lat, lon, r) => new Vector3(r * Math.cos(lat * DEG) * Math.cos(lon * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lon * DEG));

// 每個星座的中心（連線用到的星的平均方向，J2000 黃道）
const FIG_CENTER = FIGURES.map((f) => {
  const ids = new Set(LINES[f.abbr]);
  const v = new Vector3();
  for (const i of ids) v.add(eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], 1));
  v.normalize();
  const lat = Math.asin(v.y) / DEG, lon = ((Math.atan2(-v.z, v.x) / DEG) + 360) % 360;
  return { v, lon, lat, eq: eclToEq(lon, lat) };
});

// 方位：八個方向
const DIRS = [['N', '北'], ['NE', '東北'], ['E', '東'], ['SE', '東南'], ['S', '南'], ['SW', '西南'], ['W', '西'], ['NW', '西北']];
const dirOf = (az) => DIRS[Math.round(az / 45) % 8];

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels');
  const domeCv = $('.cn-dome-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // ---------------- 狀態 ----------------
  const state = {
    t: Date.now(), tod: 21 * 60, playing: false, speed: 5, view: 'orbit',
    lines: true, names: true, chinese: false, tri: true, year: null,
  };

  // ---------------- 3D 場景（沒有 WebGL 時整段略過，星空圖照樣畫） ----------------
  let scene, camera, controls, earthG, axisG, spinG, pin, zenith, arrow, midMark, sunMark, starG, figLines = [], asterG, ecl;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    scene = new Scene();
    scene.background = new Color(0x03050d);
    scene.add(new AmbientLight(0xb8c6ff, 0.08));
    scene.add(new PointLight(0xfff4e0, 3.4, 0, 0));
    camera = new PerspectiveCamera(50, 1.6, 0.05, 3000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 3; controls.maxDistance = 260;

    // 太陽
    const sunTex = glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.24, 'rgba(255,190,80,.55)'], [0.5, 'rgba(255,150,40,.14)'], [1, 'rgba(255,120,20,0)']]);
    scene.add(new Mesh(new SphereGeometry(2.4, 48, 32), new MeshBasicMaterial({ color: 0xffe9a8 })));
    const glow = new Sprite(new SpriteMaterial({ map: sunTex, blending: AdditiveBlending, depthWrite: false, transparent: true }));
    glow.scale.setScalar(17); scene.add(glow);

    // 軌道
    {
      const pts = [];
      for (let k = 0; k < 360; k++) { const a = (k / 360) * TAU; pts.push(RO * Math.cos(a), 0, -RO * Math.sin(a)); }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
      scene.add(new LineLoop(g, new LineBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.5 })));
      const plane = new Mesh(new CircleGeometry(RO + 5, 96), new MeshBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.05, side: DoubleSide, depthWrite: false }));
      plane.rotation.x = -Math.PI / 2; scene.add(plane);
    }

    // 天球：星星、星座連線、黃道、中國星官（整組依歲差繞黃道北極轉）
    starG = new Group(); scene.add(starG);
    {
      const pos = new Float32Array(N_STARS * 3), tint = new Float32Array(N_STARS * 3), size = new Float32Array(N_STARS);
      for (let i = 0; i < N_STARS; i++) {
        const v = eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], RS);
        pos.set([v.x, v.y, v.z], i * 3);
        const mag = STARS[i * 4 + 2];
        const b = MathUtils.clamp(1.15 - mag * 0.16, 0.28, 1.3);
        const c = bvColor(STARS[i * 4 + 3]);
        tint.set([c[0] / 255 * b, c[1] / 255 * b, c[2] / 255 * b], i * 3);
        size[i] = MathUtils.clamp(8.2 - mag * 1.25, 1.6, 10);
      }
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(pos, 3));
      g.setAttribute('tint', new Float32BufferAttribute(tint, 3));
      g.setAttribute('size', new Float32BufferAttribute(size, 1));
      const m = new ShaderMaterial({
        uniforms: { dpr: { value: dpr } },
        vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
          void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,
        fragmentShader: `varying vec3 vC;
          void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
        blending: AdditiveBlending, transparent: true, depthWrite: false,
      });
      starG.add(new Points(g, m));
    }
    const segGeo = (segs, r) => {
      const pts = [];
      for (const i of segs) { const v = eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], r); pts.push(v.x, v.y, v.z); }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
      return g;
    };
    figLines = FIGURES.map((f) => {
      const l = new LineSegments(segGeo(LINES[f.abbr], RS * 0.995), new LineBasicMaterial({ color: 0x7f9fe0, transparent: true, opacity: 0.6, depthWrite: false }));
      starG.add(l); return l;
    });
    asterG = new Group(); starG.add(asterG);
    for (const segs of ASTER_LINES) asterG.add(new LineSegments(segGeo(segs, RS * 0.993), new LineBasicMaterial({ color: 0xff8a70, transparent: true, opacity: 0.9, depthWrite: false })));
    {
      const pts = [];
      for (let k = 0; k < 240; k++) { const a = (k / 240) * TAU; pts.push(RS * 0.99 * Math.cos(a), 0, -RS * 0.99 * Math.sin(a)); }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
      ecl = new LineLoop(g, new LineDashedMaterial({ color: 0xffd36e, dashSize: 6, gapSize: 5, transparent: true, opacity: 0.45, depthWrite: false }));
      ecl.computeLineDistances(); starG.add(ecl);
    }

    // 地球：earthG（位置）→ axisG（地軸傾斜）→ spinG（自轉）
    earthG = new Group(); scene.add(earthG);
    axisG = new Group(); earthG.add(axisG);
    spinG = new Group(); axisG.add(spinG);
    spinG.add(new Mesh(new SphereGeometry(RE, 96, 64), new MeshLambertMaterial({ map: makeRealEarth() })));
    spinG.add(new Mesh(new SphereGeometry(RE * 1.01, 64, 48), new MeshLambertMaterial({ map: makeClouds(), transparent: true, depthWrite: false })));
    earthG.add(new Mesh(new SphereGeometry(RE * 1.08, 48, 32), atmosphereMaterial()));
    {
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([0, -RE * 1.5, 0, 0, RE * 1.6, 0], 3));
      axisG.add(new Line(g, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })));
    }
    // 彰化圖釘與「頭頂方向」
    pin = new Group(); spinG.add(pin);
    pin.add(new Mesh(new SphereGeometry(0.075, 16, 12), new MeshBasicMaterial({ color: 0xff5a36 })));
    zenith = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xff8a6b, transparent: true, opacity: 0.85 }));
    zenith.geometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
    scene.add(zenith);
    // 夜側箭頭：從地球背向太陽
    arrow = new Group(); scene.add(arrow);
    const aMat = new MeshBasicMaterial({ color: 0x4fd1c5 });
    const shaft = new Mesh(new CylinderGeometry(0.07, 0.07, 4.6, 12).rotateZ(-Math.PI / 2), aMat); shaft.position.x = RE + 2.4; arrow.add(shaft);
    const head = new Mesh(new ConeGeometry(0.26, 0.7, 20).rotateZ(-Math.PI / 2), aMat); head.position.x = RE + 5; arrow.add(head);
    const beamG = new BufferGeometry(); beamG.setAttribute('position', new Float32BufferAttribute([RE + 5.3, 0, 0, RS, 0, 0], 3));
    arrow.add(new Line(beamG, new LineDashedMaterial({ color: 0x4fd1c5, dashSize: 3, gapSize: 3, transparent: true, opacity: 0.55 })));
    arrow.children[2].computeLineDistances();
    const mk = (c) => new Sprite(new SpriteMaterial({ map: glowTexture([[0, c.replace('A', '1')], [0.35, c.replace('A', '.5')], [1, c.replace('A', '0')]]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    midMark = mk('rgba(79,209,197,A)'); midMark.scale.setScalar(34); scene.add(midMark);
    sunMark = mk('rgba(255,211,110,A)'); sunMark.scale.setScalar(60); scene.add(sunMark);
  }

  const helio = (date) => { const s = E.sunPos(date); const L = (s.lon + 180) * DEG, r = RO * s.dist / AU; return new Vector3(r * Math.cos(L), 0, -r * Math.sin(L)); };
  // 從地球出發、沿方向 a 走到天球上的點
  const toSphere = (ePos, a) => { const b = ePos.dot(a); return ePos.clone().addScaledVector(a, -b + Math.sqrt(b * b - ePos.lengthSq() + RS * RS)); };

  // ---------------- 時間軸 ----------------
  const dateSl = $('.cn-date-sl'), timeSl = $('.cn-time'), track = $('.cn-track');
  const yearStart = (y) => Date.UTC(y, 0, 1) - 8 * HOUR;
  function setYear(y) {
    if (state.year === y) return;
    state.year = y;
    track.innerHTML = '';
    const s0 = yearStart(y), len = yearStart(y + 1) - s0;
    for (let m = 0; m < 12; m++) {
      const el = document.createElement('span'); el.className = 'ec-tick'; el.style.left = `${((Date.UTC(y, m, 1) - 8 * HOUR - s0) / len) * 100}%`; el.textContent = `${m + 1}月`;
      track.appendChild(el);
    }
    SEASON_JUMP.forEach(([m, en, zh], i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'se-mark';
      b.style.left = `${((twDate(y, m, 15).getTime() - s0) / len) * 100}%`;
      b.textContent = zh; b.title = `${en} evening sky · ${zh}季星空（${m}/15 21:00）`;
      b.addEventListener('click', () => jumpSeason(i));
      track.appendChild(b);
    });
    dateSl.max = String(Math.round(len / HOUR));
  }

  const R = {
    date: $('.cn-date'), sky: $('.cn-skystate'), sun: $('.cn-sun'), opp: $('.cn-opp'), south: $('.cn-south'), badge: $('.cn-badge'),
  };
  // 快轉（每秒一天以上）時，一天中的時刻固定在 state.tod：同一個鐘點、一晚一晚地看星空往西移
  const fast = () => state.playing && state.speed >= 1;
  function clockDate() {
    if (!fast()) return new Date(state.t);
    const x = tw(new Date(state.t));
    return twDate(x.y, x.m, x.d, 0, state.tod);
  }

  // ---------------- 標籤（3D） ----------------
  const lab = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; labels.appendChild(s); return s; };
  const MAJOR = new Set(['Ori', 'UMa', 'Cyg', 'Lyr', 'Aql', 'CMa', 'Peg', 'Cas', 'Cru']);
  const L = renderer ? {
    sun: lab('sun', '&#9728; Sun · 太陽'), earth: lab('earth', 'Earth · 地球'),
    mid: lab('cn-mid', 'Night side faces here · 夜側朝向這裡<b>Up all night · 整夜可見</b>'),
    hid: lab('cn-hid', 'Behind the Sun · 在太陽背後<b>Lost in daylight · 被陽光淹沒</b>'),
    zen: lab('place', 'Straight up from Changhua · 彰化頭頂'),
    figs: FIGURES.map((f) => (f.zodiac || MAJOR.has(f.abbr) ? lab(`cst${f.zodiac ? ' zod' : ''}`, `${f.en}<small>${f.zh}</small>`) : null)),
    ast: ASTERISMS.map((a) => lab('cst cn-ast', `${a.zh}<small>${a.en}</small>`)),
  } : null;
  const proj = new Vector3(), tmp = new Vector3();
  function place(el, v, dy = 6, show = true, clamp = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > (clamp ? 1.08 : 0.98) || Math.abs(proj.y) > (clamp ? 1.08 : 0.97);
    el.style.opacity = off ? 0 : 1;
    if (off) return;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }

  // ---------------- 更新 ----------------
  const sunDir = new Vector3(), anti = new Vector3(), up = new Vector3(), q = new Quaternion(), X = new Vector3(1, 0, 0);
  const figState = FIGURES.map(() => 'part');
  function update() {
    const date = clockDate(), x = tw(date);
    setYear(x.y);
    const p = precession(date);
    if (renderer) {
      const ePos = helio(new Date(state.t));
      earthG.position.copy(ePos);
      axisG.rotation.set(-E.OBLIQUITY * DEG, 0, 0);
      spinG.rotation.y = E.gmst(date) * DEG;
      starG.rotation.y = p * DEG;
      pin.position.copy(localOf(SITE.lat, SITE.lon, RE * 1.012));
      sunDir.copy(ePos).negate().normalize();
      anti.copy(sunDir).negate();
      arrow.position.copy(ePos);
      arrow.quaternion.copy(q.setFromUnitVectors(X, anti));
      midMark.position.copy(toSphere(ePos, anti));
      sunMark.position.copy(toSphere(ePos, sunDir));
      // 彰化的頭頂方向（近看才畫）
      scene.updateMatrixWorld();
      pin.getWorldPosition(tmp); up.copy(tmp).sub(ePos).normalize();
      const zp = zenith.geometry.attributes.position;
      zp.setXYZ(0, tmp.x, tmp.y, tmp.z); zp.setXYZ(1, tmp.x + up.x * 3.4, tmp.y + up.y * 3.4, tmp.z + up.z * 3.4); zp.needsUpdate = true;
      zenith.visible = state.view === 'night';
      // 每個星座離太陽多遠：太陽旁邊的變暗，夜側對著的變亮
      FIGURES.forEach((f, i) => {
        const c = tmp.copy(FIG_CENTER[i].v).applyAxisAngle(up.set(0, 1, 0), p * DEG);
        const el = Math.acos(MathUtils.clamp(c.dot(sunDir), -1, 1)) / DEG;
        const st = el < 32 ? 'sun' : el > 125 ? 'night' : 'part';
        figState[i] = st;
        const m = figLines[i].material;
        m.opacity = !state.lines ? 0 : st === 'sun' ? 0.14 : st === 'night' ? 0.95 : 0.55;
        m.color.setHex(st === 'night' ? 0x9fe8de : 0x7f9fe0);
        figLines[i].visible = state.lines;
      });
      asterG.visible = state.chinese;
    }
    readout(date, x);
    drawDome(date);
    const s0 = yearStart(x.y);
    dateSl.value = String(Math.round((state.t - s0) / HOUR));
    dateSl.style.setProperty('--p', `${((state.t - s0) / (yearStart(x.y + 1) - s0)) * 100}%`);
    timeSl.value = String(x.h * 60 + x.mi);
    timeSl.style.setProperty('--p', `${((x.h * 60 + x.mi) / 1440) * 100}%`);
  }

  function readout(date, x) {
    R.date.innerHTML = `${MON[x.m - 1]} ${x.d}, ${x.y} · ${pad(x.h)}:${pad(x.mi)}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）${pad(x.h)}:${pad(x.mi)} 台灣時間</span>`;
    const sa = sunAltAzOf(date, SITE).alt;
    R.sky.innerHTML = sa > 0 ? 'Daytime: the stars are still up there, hidden by sunlight<span>白天：星星其實還在，只是被陽光蓋住了</span>'
      : sa > -6 ? 'Twilight: only the brightest stars so far<span>黃昏或清晨：只看得到最亮的幾顆</span>'
        : sa > -18 ? 'Getting dark: most bright stars are out<span>天色漸暗：亮星大多出來了</span>'
          : 'Night: the whole starry sky<span>夜晚：滿天星斗</span>';
    const sc = sunConstellation(date);
    R.sun.innerHTML = `${FIG[sc.sun].en}<span>${FIG[sc.sun].zh}（白天，看不到）</span>`;
    R.opp.innerHTML = `${FIG[sc.opposite].en}<span>${FIG[sc.opposite].zh}（太陽的對面）</span>`;
    const mz = meridianZodiac(date, SITE);
    R.south.innerHTML = `${FIG[mz].en} (on the Sun's path)<span>${FIG[mz].zh}（黃道星座）${sa > -6 ? '，但現在天還亮' : ''}</span>`;
  }

  // ---------------- 今晚彰化的星空（全天星圖：抬頭看，北在上、東在左） ----------------
  const dctx = domeCv.getContext('2d');
  const placed = [];
  function tryLabel(text, x, y, color, force = false) {
    const w = dctx.measureText(text).width + 4, h = parseFloat(dctx.font.match(/(\d+)px/)[1]) + 2;
    const r = [x - w / 2, y - h / 2, x + w / 2, y + h / 2];
    if (!force && placed.some((q) => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1])) return;
    placed.push(r);
    dctx.fillStyle = color; dctx.fillText(text, x, y);
  }
  let aa = new Float32Array(N_STARS * 2);
  function drawDome(date) {
    const W = domeCv.width; if (!W) return;
    const cx = W / 2, cy = W / 2, Rr = W * 0.455, s = W / 400;
    const sun = sunAltAzOf(date, SITE);
    const dayK = MathUtils.smoothstep(sun.alt, -16, 2);
    const vis = 1 - 0.86 * MathUtils.smoothstep(sun.alt, -12, -1);
    aa = allStarsAltAz(date, SITE, aa);
    const P = (alt, az) => { const r = Rr * Math.tan((90 - alt) * DEG / 2); return [cx - r * Math.sin(az * DEG), cy - r * Math.cos(az * DEG)]; };
    dctx.fillStyle = '#02040c'; dctx.fillRect(0, 0, W, W);
    const mix = (a, b) => a.map((v, i) => Math.round(v + (b[i] - v) * dayK));
    const g = dctx.createRadialGradient(cx, cy, 0, cx, cy, Rr);
    g.addColorStop(0, `rgb(${mix([6, 12, 32], [70, 128, 205])})`); g.addColorStop(1, `rgb(${mix([14, 26, 58], [150, 196, 240])})`);
    dctx.fillStyle = g; dctx.beginPath(); dctx.arc(cx, cy, Rr, 0, TAU); dctx.fill();
    dctx.save();
    dctx.beginPath(); dctx.arc(cx, cy, Rr, 0, TAU); dctx.clip();
    // 高度 30°、60° 的圈
    dctx.strokeStyle = `rgba(160,185,235,${0.14 + 0.1 * dayK})`; dctx.lineWidth = 1 * s;
    for (const a of [30, 60]) { const r = Rr * Math.tan((90 - a) * DEG / 2); dctx.beginPath(); dctx.arc(cx, cy, r, 0, TAU); dctx.stroke(); }
    const up = (i) => aa[i * 2] > -8;
    const seg = (segs, style, w, dash) => {
      dctx.strokeStyle = style; dctx.lineWidth = w * s; dctx.setLineDash(dash ? dash.map((d) => d * s) : []);
      dctx.beginPath();
      for (let k = 0; k < segs.length; k += 2) {
        const a = segs[k], b = segs[k + 1];
        if (!up(a) || !up(b)) continue;
        const [x1, y1] = P(aa[a * 2], aa[a * 2 + 1]), [x2, y2] = P(aa[b * 2], aa[b * 2 + 1]);
        dctx.moveTo(x1, y1); dctx.lineTo(x2, y2);
      }
      dctx.stroke(); dctx.setLineDash([]);
    };
    if (state.tri) {
      for (const t of TRI_IDX) seg(t.flatMap((a, k) => [a, t[(k + 1) % t.length]]), `rgba(255,211,110,${0.55 * vis})`, 1.3, [5, 4]);
    }
    if (state.lines) for (const f of FIGURES) seg(LINES[f.abbr], `rgba(130,165,235,${0.6 * vis})`, 1.1);
    if (state.chinese) for (const segs of ASTER_LINES) seg(segs, `rgba(255,138,112,${0.95 * vis})`, 1.8);
    // 星星
    for (let i = N_STARS - 1; i >= 0; i--) {
      const alt = aa[i * 2]; if (alt < 0) continue;
      const mag = STARS[i * 4 + 2];
      const [x, y] = P(alt, aa[i * 2 + 1]);
      const ext = MathUtils.smoothstep(alt, 0, 12) * 0.55 + 0.45;          // 貼近地平線的星被大氣減光
      const r = Math.max(0.55, (5.4 - mag) * 0.62) * s;
      const c = bvColor(STARS[i * 4 + 3]);
      dctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.min(1, (0.35 + (5 - mag) * 0.17) * vis * ext)})`;
      dctx.beginPath(); dctx.arc(x, y, r, 0, TAU); dctx.fill();
    }
    const font = (px, wt = 700) => `${wt} ${Math.round(px * s)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    dctx.textAlign = 'center'; dctx.textBaseline = 'middle';
    placed.length = 0;
    // 月亮
    const moon = moonAltAzOf(date, SITE);
    if (moon.alt > -1) {
      const [mx, my] = P(Math.max(0, moon.alt), moon.az), mr = 7 * s;
      const [sx, sy] = P(Math.max(-60, sun.alt), sun.az);
      const ang = Math.atan2(sy - my, sx - mx);
      dctx.save(); dctx.translate(mx, my); dctx.rotate(ang);
      dctx.fillStyle = 'rgba(40,44,60,.9)'; dctx.beginPath(); dctx.arc(0, 0, mr, 0, TAU); dctx.fill();
      const k = Math.cos(moon.elong * DEG);        // 1 新月、-1 滿月
      dctx.fillStyle = '#f4efe0';
      dctx.beginPath(); dctx.arc(0, 0, mr, -Math.PI / 2, Math.PI / 2);
      dctx.ellipse(0, 0, mr * Math.abs(k), mr, 0, Math.PI / 2, -Math.PI / 2, k > 0);
      dctx.fill();
      dctx.restore();
      // 標籤放在月亮靠天頂的那一側，貼近地平線時才不會被圓框切掉
      const dx = cx - mx, dy = cy - my, dl = Math.hypot(dx, dy) || 1;
      dctx.font = font(10);
      tryLabel('Moon 月亮', mx + dx / dl * (mr + 9 * s), my + dy / dl * (mr + 9 * s), 'rgba(244,239,224,.95)', true);
    }
    // 太陽
    if (sun.alt > -1) {
      const [x, y] = P(Math.max(0, sun.alt), sun.az);
      const sg = dctx.createRadialGradient(x, y, 0, x, y, 26 * s);
      sg.addColorStop(0, 'rgba(255,255,235,1)'); sg.addColorStop(0.3, 'rgba(255,225,120,.95)'); sg.addColorStop(1, 'rgba(255,200,80,0)');
      dctx.fillStyle = sg; dctx.beginPath(); dctx.arc(x, y, 26 * s, 0, TAU); dctx.fill();
    }
    // 名稱：星座（中心在地平線上 8° 以上）與亮星；和已經畫上去的標籤重疊就略過
    if (state.names) {
      const lst = E.gmst(date) + SITE.lon, pp = precession(date);
      dctx.font = font(10.5, 800);
      FIGURES.forEach((f, i) => {
        const c = FIG_CENTER[i], qq = eclToEq(c.lon + pp, c.lat);
        const h = altAz(qq.ra, qq.dec, date, SITE, lst);
        if (h.alt < 8) return;
        const [x, y] = P(h.alt, h.az);
        tryLabel(f.zh, x, y, `rgba(${f.zodiac ? '255,211,110' : '170,200,255'},${0.95 * Math.max(vis, 0.5)})`);
      });
      dctx.font = font(9.5, 600);
      NAMED.forEach(([, en, zh], k) => {
        const i = NAMED_IDX[k];
        if (aa[i * 2] < 4 || (STARS[i * 4 + 2] > 1.6 && en !== 'Polaris' && en !== 'Pleiades')) return;
        const [x, y] = P(aa[i * 2], aa[i * 2 + 1]);
        tryLabel(state.chinese ? zh : en, x, y + 9 * s, `rgba(235,240,255,${0.85 * Math.max(vis, 0.45)})`);
      });
      if (state.chinese) {
        dctx.font = font(11, 800);
        ASTER_LINES.forEach((segs, k) => {
          let n = 0, sx2 = 0, sy2 = 0;
          for (const i of new Set(segs)) { if (aa[i * 2] < 3) continue; const [x, y] = P(aa[i * 2], aa[i * 2 + 1]); sx2 += x; sy2 += y; n++; }
          if (n < 2) return;
          tryLabel(ASTERISMS[k].zh, sx2 / n, sy2 / n - 12 * s, '#ffb3a1', true);
        });
      }
    }
    dctx.restore();
    // 地平線與方位
    dctx.strokeStyle = 'rgba(190,210,245,.55)'; dctx.lineWidth = 1.5 * s;
    dctx.beginPath(); dctx.arc(cx, cy, Rr, 0, TAU); dctx.stroke();
    dctx.font = font(12, 800); dctx.fillStyle = '#e8edf7';
    const off = Rr + 12 * s;
    dctx.fillText('N 北', cx, cy - off); dctx.fillText('S 南', cx, cy + off);
    dctx.save(); dctx.translate(cx - off, cy); dctx.rotate(-Math.PI / 2); dctx.fillText('E 東', 0, 0); dctx.restore();
    dctx.save(); dctx.translate(cx + off, cy); dctx.rotate(Math.PI / 2); dctx.fillText('W 西', 0, 0); dctx.restore();
    dctx.fillStyle = '#ff5a36'; dctx.beginPath(); dctx.arc(cx, cy, 2.2 * s, 0, TAU); dctx.fill();
  }

  // ---------------- 3D 標籤 ----------------
  function updateLabels() {
    const orbit = state.view === 'orbit';
    place(L.sun, tmp.set(0, -3.2, 0), 6, orbit);
    place(L.earth, tmp.copy(earthG.position).add(new Vector3(0, -RE - 0.6, 0)), 6, true);
    place(L.mid, midMark.position, -48, true, false);
    place(L.hid, sunMark.position, 20, orbit || state.view === 'night', false);
    place(L.zen, tmp.fromBufferAttribute(zenith.geometry.attributes.position, 1), -22, state.view === 'night');
    const r = new Vector3();
    FIGURES.forEach((f, i) => {
      const el = L.figs[i]; if (!el) return;
      r.copy(FIG_CENTER[i].v).multiplyScalar(RS).applyMatrix4(starG.matrixWorld);
      el.classList.toggle('st-sun', figState[i] === 'sun');
      el.classList.toggle('st-night', figState[i] === 'night');
      place(el, r, f.zodiac ? 10 : -26, state.names, false);
    });
    ASTERISMS.forEach((a, k) => {
      const segs = ASTER_LINES[k]; r.set(0, 0, 0);
      for (const i of segs) r.add(eclVec(STAR_ECL[i * 2], STAR_ECL[i * 2 + 1], 1));
      r.normalize().multiplyScalar(RS).applyMatrix4(starG.matrixWorld);
      place(L.ast[k], r, -34, state.chinese && state.names, false);
    });
  }

  // ---------------- 相機 ----------------
  // 兩個視角都跟著「日地連線」轉（x 朝太陽、y 向上、z 垂直），夜側箭頭永遠指進畫面，星座從背後滑過：
  //   繞太陽：相機在太陽後上方、以太陽為中心，越過地球往夜側的星空看
  //   看夜側：相機在地球旁邊、偏向太陽一側，近看地球與彰化的頭頂方向
  const VIEWS = {
    orbit: { off: new Vector3(38, 40, 10), tgt: new Vector3(-62, 4, 0), center: false },
    night: { off: new Vector3(4.4, 2.3, 5.8), tgt: new Vector3(-6, 0.6, 0), center: true },
  };
  const rel = VIEWS.orbit.off.clone();
  const basis = () => {
    const s = earthG.position.clone().negate().normalize();
    const u = new Vector3(0, 1, 0);
    return { s, u, z: new Vector3().crossVectors(s, u).normalize(), o: VIEWS[state.view].center ? earthG.position : new Vector3() };
  };
  const fromRel = (v) => { const b = basis(); return b.o.clone().addScaledVector(b.s, v.x).addScaledVector(b.u, v.y).addScaledVector(b.z, v.z); };
  const toRel = (p) => { const b = basis(); const d = p.clone().sub(b.o); return new Vector3(d.dot(b.s), d.dot(b.u), d.dot(b.z)); };
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  function camGoal() { return { pos: fromRel(rel), tgt: fromRel(VIEWS[state.view].tgt) }; }
  function setView(v) {
    state.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    if (!renderer) return;
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
    rel.copy(VIEWS[v].off);
    root.classList.toggle('cn-night', v === 'night');
    update();
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (camera.aspect < 1.1 ? 80 : 66) * DEG;
        camera.fov = Math.max(46, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
        camera.updateProjectionMatrix();
      }
    }
    const pw = domeCv.parentElement.clientWidth;
    if (pw) { domeCv.width = domeCv.height = Math.round(pw * dpr); update(); }
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(domeCv.parentElement);

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
  // 換日期時，先記下相機在「日地座標」裡的位置，地球移動之後放回同一個相對位置（使用者拖曳過的角度也保留）
  function setT(t, badge = '') {
    const follow = renderer && camT >= 1 && earthG.position.lengthSq() > 0;
    const pRel = follow ? toRel(camera.position) : null, tRel = follow ? toRel(controls.target) : null;
    state.t = t; R.badge.hidden = !badge; if (badge) R.badge.querySelector('b').textContent = badge;
    update();
    if (follow) { camera.position.copy(fromRel(pRel)); controls.target.copy(fromRel(tRel)); }
  }
  function tonight() { const x = tw(new Date()); return twDate(x.y, x.m, x.d, 21).getTime(); }
  function jumpSeason(i) {
    setPlaying(false);
    const y = state.year || tw(new Date()).y;
    setT(twDate(y, SEASON_JUMP[i][0], 15, 21).getTime());
    $$('.cn-season').forEach((b) => b.classList.toggle('on', +b.dataset.season === i));
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.cn-season').forEach((b) => b.addEventListener('click', () => jumpSeason(+b.dataset.season)));
  const clearChips = () => $$('.cn-season').forEach((b) => b.classList.remove('on'));
  dateSl.addEventListener('input', () => {
    setPlaying(false); clearChips();
    const x = tw(new Date(state.t)), y = tw(new Date(yearStart(state.year) + parseFloat(dateSl.value) * HOUR));
    setT(twDate(y.y, y.m, y.d, x.h, x.mi).getTime());
  });
  timeSl.addEventListener('input', () => {
    setPlaying(false); clearChips();
    const x = tw(new Date(state.t));
    setT(twDate(x.y, x.m, x.d, 0, parseFloat(timeSl.value)).getTime());
  });
  $('.cn-now').addEventListener('click', () => { setPlaying(false); clearChips(); setT(Date.now(), 'Now · 現在'); });
  $('.cn-tonight').addEventListener('click', () => { setPlaying(false); clearChips(); setT(tonight(), 'Tonight 9 p.m. · 今晚 9 點'); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="lines"]', (v) => { state.lines = v; });
  bind('[data-t="names"]', (v) => { state.names = v; });
  bind('[data-t="chinese"]', (v) => { state.chinese = v; });
  bind('[data-t="tri"]', (v) => { state.tri = v; });
  if (renderer) $('.al-home').addEventListener('click', () => { rel.copy(VIEWS[state.view].off); camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;

  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setT(state.t + dt * state.speed * DAY);   // setT 會讓相機跟著日地連線轉
    if (renderer) {
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.1);
        const k = MathUtils.smootherstep(camT, 0, 1), goal = camGoal();
        camera.position.lerpVectors(camFrom, goal.pos, k);
        controls.target.lerpVectors(tgtFrom, goal.tgt, k);
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

  // 一打開：天黑了就是「現在」，還是白天就跳到今晚九點
  const nowSun = sunAltAzOf(new Date(), SITE).alt;
  setYear(tw(new Date()).y);
  if (nowSun < -6) setT(Date.now(), 'Now · 現在'); else setT(tonight(), 'Tonight 9 p.m. · 今晚 9 點');
  resize();
  if (renderer) { camera.position.copy(fromRel(rel)); controls.target.copy(fromRel(VIEWS.orbit.tgt)); }
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying, setView, jumpSeason, update };   // 除錯用：$('[data-star-lab]').__lab
  return { jumpSeason };
}

// ---------------------------------------------------------------------------
// 頁面下方「今晚彰化的星空」：今天晚上九點看得到的亮星、月亮，以及參商今晚的升落時刻
function renderTonight(box) {
  const now = new Date(), x = tw(now);
  const at = twDate(x.y, x.m, x.d, 21);
  const aa = allStarsAltAz(at, SITE);
  const items = [];
  NAMED.forEach(([, en, zh], k) => {
    const i = NAMED_IDX[k], alt = aa[i * 2], az = aa[i * 2 + 1];
    if (alt < 10 || en === 'Pleiades') return;
    items.push({ en, zh, alt, az, mag: STARS[i * 4 + 2] });
  });
  items.sort((a, b) => a.mag - b.mag);
  const fist = (alt) => Math.max(1, Math.round(alt / 10));
  const card = (ico, h, zh, sub, subzh) => `<div class="tn-item"><span class="tn-ico" aria-hidden="true">${ico}</span><div><h3>${h}<span class="zh">${zh}</span></h3><p>${sub}<span class="zh">${subzh}</span></p></div></div>`;
  const star = (s) => {
    const [d, dz] = dirOf(s.az);
    return card('&#9733;', s.en, s.zh, `Look ${d}, about ${fist(s.alt)} fist${fist(s.alt) > 1 ? 's' : ''} up (${Math.round(s.alt)}°)`, `往${dz}方看，約 ${fist(s.alt)} 個拳頭高（${Math.round(s.alt)}°）`);
  };
  const moon = moonAltAzOf(at, SITE);
  const e = moon.elong, lit = Math.round((1 - Math.cos(e * DEG)) / 2 * 100);
  let moonHtml;
  if (moon.alt > 5) {
    const [d, dz] = dirOf(moon.az);
    moonHtml = card('&#9790;', 'The Moon', '月亮', `Look ${d}, ${Math.round(moon.alt)}° up, ${lit}% lit. A bright Moon hides the faint stars.`, `往${dz}方看，高 ${Math.round(moon.alt)}°，亮面 ${lit}%；月光太亮時，暗星會看不清楚。`);
  } else {
    moonHtml = card('&#9790;', 'The Moon is down', '月亮不在天上', `Good news for stargazing: no moonlight at 9 p.m. (${lit}% lit).`, `九點時月亮在地平線下，正好看星星（亮面 ${lit}%）。`);
  }
  // 參商：今天中午到明天中午，心宿二、參宿四的升落
  const t0 = twDate(x.y, x.m, x.d, 12), t1 = new Date(t0.getTime() + DAY);
  const altOf = (en) => { const i = NAMED_IDX[NAMED.findIndex((n) => n[1] === en)]; return (d) => { const q = starEqOfDate(i, d); return altAz(q.ra, q.dec, d, SITE).alt; }; };
  const shang = riseSet(altOf('Antares'), t0, t1), shen = riseSet(altOf('Betelgeuse'), t0, t1);
  const tag = (d) => (d ? `${hhmm(d)}${sunAltAzOf(d, SITE).alt > -6 ? ' (daytime · 白天)' : ''}` : '—');
  const pair = `<div class="tn-pair">
    <div><b>Shang · 商</b><span>Antares 心宿二（天蠍座）</span><p>Rises 升起 ${tag(shang.rise)}<br>Sets 落下 ${tag(shang.set)}</p></div>
    <div><b>Shen · 參</b><span>Betelgeuse 參宿四（獵戶座）</span><p>Rises 升起 ${tag(shen.rise)}<br>Sets 落下 ${tag(shen.set)}</p></div>
  </div>`;
  box.innerHTML = `
    <p class="tn-when">${MON[x.m - 1]} ${x.d}, ${x.y}, 9:00 p.m. over Changhua<span>${x.y} 年 ${x.m} 月 ${x.d} 日晚上 9 點，彰化</span></p>
    <div class="tn-grid">${moonHtml}${items.slice(0, 7).map(star).join('')}</div>
    <h3 class="tn-h">Shen and Shang tonight · 今晚的參與商</h3>
    ${pair}
    <p class="tn-note">Shen and Shang are never high in the sky together: one rises about when the other sets. · 參與商從來不會同時高掛天上：一個升起時，另一個差不多正要落下。</p>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-star-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-tonight]');
  if (tn) renderTonight(tn);
  document.querySelectorAll('[data-lab-sky]').forEach((b) => b.addEventListener('click', () => {
    const lab = start();
    if (!lab) return;
    lab.jumpSeason(parseInt(b.getAttribute('data-lab-sky'), 10));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
