/*
 * 天文教育 · 第三課「為什麼會有四季？」的 3D 模型。
 *
 * 日心場景：太陽在原點，地球照真實日期放在公轉軌道上（ephem.js 的太陽位置，
 * 軌道形狀也是真實的——真的就這麼接近正圓）。地軸傾斜 23.4°，而且整年指向同一個方向
 * （北極星）；地球的自轉角度用格林威治恆星時算，所以台灣的圖釘在台灣中午時正好朝向太陽。
 *
 * 座標：同第二課的「全年」視角。X = 春分點方向，+Y = 黃道北極，黃經 λ 的方向是 (cos λ, 0, -sin λ)。
 *   地軸（天球北極）在黃道座標是 (0, cos ε, -sin ε)，也就是繞 X 軸轉 -ε。
 *   地球本地座標：+Y 北極、+X 經度 0°、-Z 東經 90°（貼圖 u = 0.5 + 經度/360）。
 *
 * 地圖：Natural Earth 1:110m 陸地（公有領域，經 world-atlas 套件），打包時直接編進 JS。
 * 產物：cd tools/astro && npm run build → assets/js/seasons.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, CircleGeometry, Color,
  ConeGeometry, DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  LineDashedMaterial, LineLoop, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  OctahedronGeometry, PerspectiveCamera, PointLight, Scene, SphereGeometry, SRGBColorSpace,
  Sprite, SpriteMaterial, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, atmosphereMaterial, glowTexture, starField } from './common.js';
import { makeClouds, makeRealEarth } from './earthmap.js';
import * as E from './ephem.js';

const AU = 149597870.7;
const RO = 20;           // 平均軌道半徑（畫面單位）
const RE = 1.4;          // 地球半徑（刻意放大，實際應該是 0.00085）
const DAY = 86400000, HOUR = 3600000;

export const PLACES = {
  changhua: { lat: 24.08, lon: 120.54, tz: 8, en: 'Changhua', zh: '彰化' },
  sydney: { lat: -33.87, lon: 151.21, tz: 10, en: 'Sydney', zh: '雪梨' },
  singapore: { lat: 1.35, lon: 103.82, tz: 8, en: 'Singapore', zh: '新加坡' },
  tromso: { lat: 69.65, lon: 18.96, tz: 1, en: 'Tromsø', zh: '特羅姆瑟' },
};
const KEY = [   // 四個轉折點：太陽黃經
  { lon: 0, en: 'March equinox', zh: '春分' }, { lon: 90, en: 'June solstice', zh: '夏至' },
  { lon: 180, en: 'September equinox', zh: '秋分' }, { lon: 270, en: 'December solstice', zh: '冬至' },
];
const SEASONS_N = [['Spring', '春'], ['Summer', '夏'], ['Autumn', '秋'], ['Winter', '冬']];

const pad = (n) => String(n).padStart(2, '0');
function tw(d) {
  const x = new Date(d.getTime() + 8 * HOUR);
  return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() };
}
const hm = (h) => { if (h == null) return '—'; h = ((h % 24) + 24) % 24; let H = Math.floor(h), M = Math.round((h - H) * 60); if (M === 60) { H = (H + 1) % 24; M = 0; } return `${pad(H)}:${pad(M)}`; };
const dur = (h) => { const H = Math.floor(h + 1e-9), M = Math.round((h - H) * 60); return M === 60 ? `${H + 1}h 00m` : `${H}h ${pad(M)}m`; };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['日', '一', '二', '三', '四', '五', '六'];

function circle(radius, seg = 128) {
  const pts = [];
  for (let i = 0; i < seg; i++) { const a = (i / seg) * TAU; pts.push(radius * Math.cos(a), 0, -radius * Math.sin(a)); }
  const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
  return g;
}
// 緯線（本地座標：+Y 是北極）
function latRing(latDeg, mat, r = RE * 1.006) {
  const l = new LineLoop(circle(r * Math.cos(latDeg * DEG)), mat);
  l.position.y = r * Math.sin(latDeg * DEG);
  if (mat.isLineDashedMaterial) l.computeLineDistances();
  return l;
}
const localOf = (lat, lon, r) => new Vector3(r * Math.cos(lat * DEG) * Math.cos(lon * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lon * DEG));

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels');
  const pathCv = $('.se-path-cv'), beamCv = $('.se-beam-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); return null; }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  const scene = new Scene();
  scene.background = new Color(0x050814);
  scene.add(starField(1800, 2500, 99, 1.6));
  scene.add(new AmbientLight(0xb8c6ff, 0.07));
  scene.add(new PointLight(0xfff4e0, 3.4, 0, 0));
  const camera = new PerspectiveCamera(40, 1.6, 0.05, 6000);
  const controls = new OrbitControls(camera, spaceCv);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.minDistance = 3; controls.maxDistance = 120;

  // 太陽
  const sunTex = glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.24, 'rgba(255,190,80,.55)'], [0.5, 'rgba(255,150,40,.14)'], [1, 'rgba(255,120,20,0)']]);
  scene.add(new Mesh(new SphereGeometry(2.4, 48, 32), new MeshBasicMaterial({ color: 0xffe9a8 })));
  const glow = new Sprite(new SpriteMaterial({ map: sunTex, blending: AdditiveBlending, depthWrite: false, transparent: true }));
  glow.scale.setScalar(17); scene.add(glow);

  // 真實形狀的軌道（取一年 360 個點）
  const y0 = tw(new Date()).y;
  {
    const pts = [];
    for (let k = 0; k < 360; k++) {
      const s = E.sunPos(new Date(Date.UTC(y0, 0, 1) + k * (365.25 / 360) * DAY));
      const L = (s.lon + 180) * DEG, r = RO * s.dist / AU;
      pts.push(r * Math.cos(L), 0, -r * Math.sin(L));
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
    scene.add(new LineLoop(g, new LineBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.5 })));
    const plane = new Mesh(new CircleGeometry(RO + 5, 96), new MeshBasicMaterial({ color: 0x7fa2d6, transparent: true, opacity: 0.05, side: DoubleSide, depthWrite: false }));
    plane.rotation.x = -Math.PI / 2; scene.add(plane);
  }
  const helio = (date) => { const s = E.sunPos(date); const L = (s.lon + 180) * DEG, r = RO * s.dist / AU; return new Vector3(r * Math.cos(L), 0, -r * Math.sin(L)); };

  // 地球：earthG（位置）→ axisG（地軸傾斜）→ spinG（自轉）
  const earthTex = makeRealEarth(), cloudTex = makeClouds();
  const earthG = new Group(); scene.add(earthG);
  const axisG = new Group(); earthG.add(axisG);
  const spinG = new Group(); axisG.add(spinG);
  const earth = new Mesh(new SphereGeometry(RE, 96, 64), new MeshLambertMaterial({ map: earthTex }));
  spinG.add(earth);
  const clouds = new Mesh(new SphereGeometry(RE * 1.01, 64, 48), new MeshLambertMaterial({ map: cloudTex, transparent: true, depthWrite: false }));
  spinG.add(clouds);
  const atmo = new Mesh(new SphereGeometry(RE * 1.08, 48, 32), atmosphereMaterial());
  earthG.add(atmo);

  // 緯線：赤道、南北回歸線、南北極圈
  const lines = new Group(); axisG.add(lines);
  lines.add(latRing(0, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })));
  for (const la of [E.OBLIQUITY, -E.OBLIQUITY]) lines.add(latRing(la, new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.9 })));
  for (const la of [90 - E.OBLIQUITY, -(90 - E.OBLIQUITY)]) lines.add(latRing(la, new LineDashedMaterial({ color: 0x9fd8ff, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.85 })));
  // 所選地點的緯線：白天那段金色、夜晚那段藍色（一眼看出晝長）
  const placeRingGeo = new TorusGeometry(1, 0.02, 6, 180).rotateX(Math.PI / 2);
  placeRingGeo.setAttribute('color', new Float32BufferAttribute(new Float32Array(placeRingGeo.attributes.position.count * 3), 3));
  const placeRing = new Mesh(placeRingGeo, new MeshBasicMaterial({ vertexColors: true }));
  axisG.add(placeRing);
  // 地軸與北極星方向
  {
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([0, -RE * 1.7, 0, 0, RE * 1.9, 0], 3));
    axisG.add(new Line(g, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })));
    const tip = new Mesh(new ConeGeometry(0.09, 0.26, 16), new MeshBasicMaterial({ color: 0xffffff }));
    tip.position.y = RE * 1.9; axisG.add(tip);
  }
  const axisTip = new Vector3(0, RE * 2.05, 0);
  // 地點圖釘
  const pin = new Group(); spinG.add(pin);
  const pinHead = new Mesh(new SphereGeometry(0.075, 16, 12), new MeshBasicMaterial({ color: 0xff5a36 }));
  pin.add(pinHead);
  // 太陽直射點
  const subsolar = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,230,1)'], [0.3, 'rgba(255,220,120,.8)'], [1, 'rgba(255,200,80,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
  subsolar.scale.setScalar(0.5); scene.add(subsolar);
  // 太陽→地球的光線
  const ray = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.45 }));
  ray.geometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3)); scene.add(ray);

  // 四個轉折點的地球分身（地軸同一個方向）
  const ghostMat = new MeshLambertMaterial({ map: earthTex });
  const ghosts = KEY.map((k) => {
    const g = new Group(); const a = new Group(); g.add(a);
    a.add(new Mesh(new SphereGeometry(RE * 0.55, 48, 32), ghostMat));
    const lg = new BufferGeometry(); lg.setAttribute('position', new Float32BufferAttribute([0, -RE * 0.9, 0, 0, RE * 1.05, 0], 3));
    a.add(new Line(lg, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })));
    const eq = latRing(0, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }), RE * 0.56);
    a.add(eq);
    g.userData = { axis: a, key: k };
    scene.add(g); return g;
  });
  // 近日點、遠日點
  const apsMat = new MeshBasicMaterial({ color: 0x9fd8ff });
  const peri = new Mesh(new OctahedronGeometry(0.28), apsMat), aph = new Mesh(new OctahedronGeometry(0.28), apsMat);
  scene.add(peri, aph);

  // ---------------- 狀態 ----------------
  const state = {
    t: Date.now(), tod: 0, playing: false, speed: 5, view: 'orbit', place: 'changhua',
    tilt: E.OBLIQUITY, tiltTarget: E.OBLIQUITY, lines: true, ghosts: true, year: null, keyDates: [], terms: [],
  };
  const tiltNow = () => state.tilt;

  function setYear(y) {
    if (state.year === y) return;
    state.year = y;
    state.terms = E.solarTermsOfYear(y);
    state.keyDates = KEY.map((k) => state.terms.find((t) => t.lon === k.lon).date);
    ghosts.forEach((g, i) => g.position.copy(helio(state.keyDates[i])));
    const a = E.apsidesOfYear(y);
    peri.position.copy(helio(a.peri)); aph.position.copy(helio(a.aph));
    buildTrack();
  }

  // ---------------- 時間軸（日期）與一天中的時刻 ----------------
  const dateSl = $('.se-date'), timeSl = $('.se-time'), track = $('.se-track');
  const yearStart = (y) => Date.UTC(y, 0, 1) - 8 * HOUR;
  function buildTrack() {
    track.innerHTML = '';
    const y = state.year, s0 = yearStart(y), len = yearStart(y + 1) - s0;
    for (let m = 0; m < 12; m++) {
      const t = Date.UTC(y, m, 1) - 8 * HOUR;
      const el = document.createElement('span'); el.className = 'ec-tick'; el.style.left = `${((t - s0) / len) * 100}%`; el.textContent = `${m + 1}月`;
      track.appendChild(el);
    }
    state.keyDates.forEach((d, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'se-mark';
      b.style.left = `${((d.getTime() - s0) / len) * 100}%`;
      const x = tw(d); b.textContent = KEY[i].zh; b.title = `${KEY[i].en} · ${KEY[i].zh} ${x.m}/${x.d}`;
      b.addEventListener('click', () => jumpKey(i));
      track.appendChild(b);
    });
    dateSl.max = String(Math.round(len / DAY * 24));
  }

  const R = {
    date: $('.se-date-t'), term: $('.se-term'), season: $('.se-season'), dec: $('.se-dec'),
    place: $('.se-place'), rise: $('[data-r="rise"]'), set: $('[data-r="set"]'), len: $('[data-r="len"]'),
    noon: $('[data-r="noon"]'), dist: $('.se-dist'), pathCap: $('.se-path-cap'), beamCap: $('.se-beam-cap'), what: $('.se-whatif'),
  };

  const tmp = new Vector3(), sunDir = new Vector3(), wp = new Vector3();
  // 快轉（每秒一天以上）時，一天中的時刻固定在 state.tod，地球不會轉成一片模糊
  const fast = () => state.playing && state.speed >= 1;
  function clockDate() {
    if (!fast()) return new Date(state.t);
    const x = tw(new Date(state.t));
    return new Date(Date.UTC(x.y, x.m - 1, x.d, 0, state.tod) - 8 * HOUR);
  }
  function update() {
    const date = clockDate();
    const x = tw(date);
    setYear(x.y);
    const ePos = helio(new Date(state.t));
    earthG.position.copy(ePos);
    const tilt = tiltNow() * DEG;
    axisG.rotation.set(-tilt, 0, 0);
    ghosts.forEach((g) => { g.userData.axis.rotation.set(-tilt, 0, 0); g.visible = state.ghosts; });
    spinG.rotation.y = E.gmst(clockDate()) * DEG;
    lines.visible = state.lines;
    peri.visible = aph.visible = state.view === 'orbit';
    const P = PLACES[state.place];
    pin.position.copy(localOf(P.lat, P.lon, RE * 1.012));
    // 地點緯線的晝夜上色
    sunDir.copy(ePos).negate().normalize();
    const rr = RE * 1.015 * Math.cos(P.lat * DEG);
    placeRing.scale.setScalar(rr);
    placeRing.position.y = RE * 1.015 * Math.sin(P.lat * DEG);
    placeRing.updateWorldMatrix(true, false);
    const pos = placeRingGeo.attributes.position, col = placeRingGeo.attributes.color;
    for (let i = 0; i < pos.count; i++) {
      wp.fromBufferAttribute(pos, i).applyMatrix4(placeRing.matrixWorld).sub(ePos);
      const day = wp.dot(sunDir) > 0;
      col.setXYZ(i, day ? 1 : 0.35, day ? 0.78 : 0.55, day ? 0.3 : 1);
    }
    col.needsUpdate = true;
    subsolar.position.copy(ePos).addScaledVector(sunDir, RE * 1.03);
    const ra = ray.geometry.attributes.position; ra.setXYZ(1, ePos.x - sunDir.x * RE, 0, ePos.z - sunDir.z * RE); ra.needsUpdate = true;
    readout(date, x, P);
    drawPath(date, P);
    drawBeam(date, P);
    const s0 = yearStart(x.y);
    dateSl.value = String(Math.round((state.t - s0) / HOUR));
    dateSl.style.setProperty('--p', `${((state.t - s0) / (yearStart(x.y + 1) - s0)) * 100}%`);
    timeSl.value = String(x.h * 60 + x.mi);
    timeSl.style.setProperty('--p', `${((x.h * 60 + x.mi) / 1440) * 100}%`);
  }

  function readout(date, x, P) {
    const tilt = tiltNow();
    const q = E.sunEquatorial(date, tilt);
    R.date.innerHTML = `${MON[x.m - 1]} ${x.d}, ${x.y} · ${pad(x.h)}:${pad(x.mi)}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）${pad(x.h)}:${pad(x.mi)} 台灣時間</span>`;
    // 節氣、季節以「日」為單位：交節時刻落在今天（台灣時間），今天就算那個節氣
    const dayEnd = new Date(Date.UTC(x.y, x.m - 1, x.d, 23, 59) - 8 * HOUR);
    const lonDay = E.sunPos(dayEnd).lon;
    const ti = Math.floor((((lonDay % 360) + 360) % 360) / 15);
    const [zh, en] = E.SOLAR_TERMS[ti];
    const next = E.SOLAR_TERMS[(ti + 1) % 24];
    const nd = E.sunLonTime(((ti + 1) * 15) % 360, dayEnd), nx = tw(nd);
    R.term.innerHTML = `${zh} · ${en}<span>Next 下一個：${next[0]} ${next[1]}（${nx.m}/${nx.d}）</span>`;
    const si = Math.floor((((lonDay % 360) + 360) % 360) / 90);
    const [nEn, nZh] = SEASONS_N[si], [sEn, sZh] = SEASONS_N[(si + 2) % 4];
    R.season.innerHTML = tilt < 0.5 ? 'No seasons without the tilt<span>沒有傾斜，就沒有四季</span>'
      : `North: ${nEn} · South: ${sEn}<span>北半球${nZh}、南半球${sZh}</span>`;
    const dec = q.dec;
    const where = Math.abs(dec) < 0.3 ? 'the equator · 赤道' : `${Math.abs(dec).toFixed(1)}°${dec > 0 ? 'N' : 'S'} · ${dec > 0 ? '北' : '南'}緯 ${Math.abs(dec).toFixed(1)}°`;
    R.dec.innerHTML = `${where}<span>${Math.abs(Math.abs(dec) - E.OBLIQUITY) < 0.3 ? (dec > 0 ? 'On the Tropic of Cancer, which runs through Chiayi and Hualien · 正好在北回歸線上（經過嘉義、花蓮）' : 'On the Tropic of Capricorn · 正好在南回歸線上') : 'Where the noon Sun is straight overhead · 正午太陽在頭頂正上方的地方'}</span>`;
    const di = E.dayInfo(date, P, tilt);
    R.place.textContent = `${P.en} · ${P.zh}（${Math.abs(P.lat).toFixed(1)}°${P.lat >= 0 ? 'N' : 'S'}）`;
    R.rise.textContent = di.polar === 'day' ? 'Midnight sun · 永晝' : di.polar === 'night' ? 'Polar night · 永夜' : hm(di.rise);
    R.set.textContent = di.polar ? '—' : hm(di.set);
    R.len.textContent = dur(di.length);
    R.noon.textContent = `${Math.max(di.noonAlt, 0).toFixed(0)}°`;
    const km = q.dist / 1e6;
    R.dist.innerHTML = `${km.toFixed(1)} million km<span>${km.toFixed(1)} 百萬公里（1 月初最近約 147.1、7 月初最遠約 152.1）</span>`;
    R.what.hidden = tilt > E.OBLIQUITY - 0.05;
    R.pathCap.textContent = `Sun's path over ${P.en} today · 今天${P.zh}的太陽軌跡${P.tz !== 8 ? `（當地標準時間 UTC+${P.tz}）` : ''}`;
  }

  // ---- 天空中的太陽軌跡（從北方背後往南看的天穹：東在左、西在右、南在遠處） ----
  const pctx = pathCv.getContext('2d');
  function drawPath(date, P) {
    const W = pathCv.width, H = pathCv.height, cx = W / 2, cy = H * 0.74, Rr = W * 0.42;
    const tilt = tiltNow();
    const proj = (az, alt) => {
      const a = az * DEG, h = alt * DEG;
      const east = Math.sin(a) * Math.cos(h), south = -Math.cos(a) * Math.cos(h);
      return [cx - Rr * east, cy - Rr * (0.3 * south + 0.9 * Math.sin(h))];
    };
    const now = E.sunAltAz(date, P, tilt);
    const dayNow = now.alt > -0.8;
    const g = pctx.createLinearGradient(0, 0, 0, H);
    if (dayNow) { g.addColorStop(0, '#5b93d6'); g.addColorStop(1, '#a9cdf2'); } else { g.addColorStop(0, '#050b1c'); g.addColorStop(1, '#14223f'); }
    pctx.fillStyle = g; pctx.fillRect(0, 0, W, H);
    // 地面
    pctx.save();
    pctx.fillStyle = dayNow ? '#4f7a55' : '#1d2c26';
    pctx.beginPath(); pctx.ellipse(cx, cy, Rr, Rr * 0.3, 0, 0, TAU); pctx.fill();
    pctx.fillStyle = dayNow ? '#3d6444' : '#16211d';
    pctx.fillRect(0, cy, W, H - cy);
    pctx.beginPath(); pctx.ellipse(cx, cy, Rr, Rr * 0.3, 0, 0, TAU); pctx.fillStyle = dayNow ? '#5b8a60' : '#22362d'; pctx.fill();
    pctx.restore();
    const font = (px, w = 700) => `${w} ${Math.round(px)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    pctx.fillStyle = dayNow ? 'rgba(255,255,255,.9)' : 'rgba(200,215,240,.85)';
    pctx.font = font(W * 0.038); pctx.textAlign = 'center'; pctx.textBaseline = 'middle';
    pctx.fillText('S 南', cx, cy - Rr * 0.3 - W * 0.03);
    pctx.fillText('N 北', cx, cy + Rr * 0.3 + W * 0.035);
    pctx.fillText('E 東', cx - Rr - W * 0.045, cy);
    pctx.fillText('W 西', cx + Rr + W * 0.045, cy);
    // 軌跡：給定赤緯 d，時角 H 從 -180 到 180
    const trace = (d, style, width, dash) => {
      const ph = P.lat * DEG, dd = d * DEG;
      pctx.strokeStyle = style; pctx.lineWidth = width; pctx.setLineDash(dash || []);
      pctx.beginPath();
      let on = false, top = null, west = null;
      for (let k = 0; k <= 240; k++) {
        const Hh = (-180 + (360 * k) / 240) * DEG;
        const alt = Math.asin(Math.sin(ph) * Math.sin(dd) + Math.cos(ph) * Math.cos(dd) * Math.cos(Hh)) / DEG;
        const az = Math.atan2(Math.sin(Hh), Math.cos(Hh) * Math.sin(ph) - Math.tan(dd) * Math.cos(ph)) / DEG + 180;
        if (alt < 0) { on = false; continue; }
        const [px, py] = proj(az, alt);
        if (!top || py < top[1]) top = [px, py, alt];
        if (Hh > 0 && alt >= 14) west = [px, py];
        if (!on) { pctx.moveTo(px, py); on = true; } else pctx.lineTo(px, py);
      }
      pctx.stroke(); pctx.setLineDash([]);
      if (top) top.west = west;
      return top;
    };
    const ref = [[tilt, '6月 Jun'], [0, '3·9月'], [-tilt, '12月 Dec']];
    const faint = dayNow ? 'rgba(255,255,255,.55)' : 'rgba(180,200,240,.45)';
    pctx.font = font(W * 0.03, 600);
    for (const [d, lab] of ref) {
      const top = trace(d, faint, 1.2, [4, 4]);
      if (top && top.west) { pctx.fillStyle = faint; pctx.textAlign = 'right'; pctx.fillText(lab, top.west[0] - W * 0.02, top.west[1]); pctx.textAlign = 'center'; }
    }
    const today = E.sunEquatorial(new Date(date.getTime() - (date.getTime() % DAY) + 4 * HOUR), tilt).dec;
    const top = trace(today, '#ffd36e', 3);
    if (top) {
      pctx.fillStyle = dayNow ? '#3d2a00' : '#ffd36e';
      pctx.font = font(W * 0.034);
      pctx.fillText(`Noon 正午 ${top[2].toFixed(0)}°`, top[0], Math.max(W * 0.05, top[1] - W * 0.045));
    }
    // 觀測者
    pctx.fillStyle = '#ff5a36'; pctx.beginPath(); pctx.arc(cx, cy, W * 0.012, 0, TAU); pctx.fill();
    // 現在的太陽
    if (now.alt > -0.8) {
      const [sx, sy] = proj(now.az, Math.max(0, now.alt));
      const sg = pctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.06);
      sg.addColorStop(0, 'rgba(255,255,235,1)'); sg.addColorStop(0.35, 'rgba(255,225,120,.95)'); sg.addColorStop(1, 'rgba(255,200,80,0)');
      pctx.fillStyle = sg; pctx.beginPath(); pctx.arc(sx, sy, W * 0.06, 0, TAU); pctx.fill();
    }
  }

  // ---- 正午的陽光：同一束光，太陽越低攤得越開 ----
  const bctx = beamCv.getContext('2d');
  function drawBeam(date, P) {
    const W = beamCv.width, H = beamCv.height;
    const di = E.dayInfo(date, P, tiltNow());
    const alt = Math.max(0, di.noonAlt);
    bctx.fillStyle = '#0b1328'; bctx.fillRect(0, 0, W, H);
    const gy = H * 0.8;
    bctx.fillStyle = '#2d4a3a'; bctx.fillRect(0, gy, W, H - gy);
    const cx = W * 0.5, w = W * 0.13;
    if (alt < 1) {
      bctx.fillStyle = 'rgba(200,215,240,.85)'; bctx.font = `700 ${Math.round(W * 0.05)}px Manrope, 'PingFang TC', sans-serif`;
      bctx.textAlign = 'center'; bctx.fillText('No noon Sun today · 今天正午太陽不出來', cx, H * 0.45);
      R.beamCap.textContent = 'Noon sunlight · 正午陽光：0%';
      return;
    }
    const a = alt * DEG, foot = Math.min(W * 0.95, w / Math.sin(a));
    const dx = Math.cos(a), dy = -Math.sin(a);               // 光從左上往右下照（太陽在南方偏左）
    const L = H * 1.2;
    bctx.save();
    bctx.beginPath();
    bctx.moveTo(cx - foot / 2, gy); bctx.lineTo(cx + foot / 2, gy);
    bctx.lineTo(cx + foot / 2 - dx * L, gy + dy * L); bctx.lineTo(cx - foot / 2 - dx * L, gy + dy * L); bctx.closePath();
    const bg = bctx.createLinearGradient(cx - dx * L, gy + dy * L, cx, gy);
    bg.addColorStop(0, 'rgba(255,220,120,.05)'); bg.addColorStop(1, 'rgba(255,220,120,.55)');
    bctx.fillStyle = bg; bctx.fill();
    bctx.restore();
    bctx.strokeStyle = 'rgba(255,225,140,.9)'; bctx.lineWidth = 1.2;
    for (let k = 0; k <= 4; k++) {
      const x0 = cx - foot / 2 + (foot * k) / 4;
      bctx.beginPath(); bctx.moveTo(x0 - dx * L, gy + dy * L); bctx.lineTo(x0, gy); bctx.stroke();
    }
    bctx.fillStyle = '#ffd36e'; bctx.fillRect(cx - foot / 2, gy - 2, foot, 5);
    const pct = Math.round(Math.sin(a) * 100);
    R.beamCap.textContent = `Noon sunlight · 正午陽光：${pct}% as strong as overhead · 相當於直射的 ${pct}%`;
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, html) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = html; labels.appendChild(s); return s; };
  const L = {
    sun: lab('sun', '&#9728; Sun · 太陽'), earth: lab('earth', 'Earth · 地球'), polaris: lab('pol', 'To the North Star · 指向北極星 &#9733;'),
    place: lab('place', ''), sub: lab('sub', 'Sun overhead · 太陽直射'),
    peri: lab('aps', 'Closest · 近日點<b>early Jan · 1月初</b>'), aph: lab('aps', 'Farthest · 遠日點<b>early Jul · 7月初</b>'),
    ghosts: KEY.map(() => lab('ghost', '')),
  };
  const proj = new Vector3();
  function place(el, v, dy = 6, show = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > 1.08 || Math.abs(proj.y) > 1.08;
    el.style.opacity = off ? 0 : 1;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  function updateLabels() {
    const orbit = state.view === 'orbit';
    place(L.sun, tmp.set(0, -3.2, 0), 6, orbit);
    place(L.earth, tmp.copy(earthG.position).add(new Vector3(0, 0, RE + 0.5)), 8, orbit);
    tmp.copy(axisTip).applyMatrix4(axisG.matrixWorld); place(L.polaris, tmp, -26);
    const P = PLACES[state.place];
    L.place.textContent = `${P.en} · ${P.zh}`;
    pin.getWorldPosition(tmp); place(L.place, tmp, 8, !orbit && camera.position.distanceTo(tmp) < camera.position.distanceTo(earthG.position));
    place(L.sub, subsolar.position, 8, !orbit);
    place(L.peri, tmp.copy(peri.position).multiplyScalar(1.2), -10, orbit);
    place(L.aph, tmp.copy(aph.position).multiplyScalar(1.2), -10, orbit);
    ghosts.forEach((g, i) => {
      const x = tw(state.keyDates[i]);
      L.ghosts[i].innerHTML = `${KEY[i].en} · ${KEY[i].zh}<b>${x.m}/${x.d}</b>`;
      // 地球剛好走到分身旁邊時，把分身的標籤讓出來
      const near = g.position.distanceTo(earthG.position) < RE * 2.2;
      place(L.ghosts[i], tmp.copy(g.position).add(new Vector3(0, -RE - 0.45, 0)), 6, orbit && state.ghosts && !near);
    });
  }

  // ---------------- 相機：繞太陽（俯瞰）／近看地球（跟著地球、跟著日地連線轉） ----------------
  const ORBIT_CAM = new Vector3(0, 40, 26);
  const CLOSE_OFF = new Vector3(0.9, 2.0, 5.8);   // 在「日地座標」裡：x 朝太陽、y 向上、z 垂直
  const rel = CLOSE_OFF.clone();
  const basis = () => {
    const s = earthG.position.clone().negate().normalize();
    const up = new Vector3(0, 1, 0);
    const z = new Vector3().crossVectors(s, up).normalize();
    return { s, up, z };
  };
  const fromRel = (o) => { const b = basis(); return earthG.position.clone().addScaledVector(b.s, o.x).addScaledVector(b.up, o.y).addScaledVector(b.z, o.z); };
  const toRel = (p) => { const b = basis(); const d = p.clone().sub(earthG.position); return new Vector3(d.dot(b.s), d.dot(b.up), d.dot(b.z)); };
  const camFrom = new Vector3(), camTo = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  function setView(v) {
    state.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
    if (v === 'close') rel.copy(CLOSE_OFF);
    root.classList.toggle('se-close', v === 'close');
    update();
  }
  function camGoal() { return state.view === 'orbit' ? { pos: ORBIT_CAM, tgt: new Vector3(0, 0, 0) } : { pos: fromRel(rel), tgt: earthG.position.clone() }; }

  // ---------------- 尺寸 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false); camera.aspect = w / h;
      const hMin = (camera.aspect < 1.1 ? 72 : 60) * DEG;
      camera.fov = Math.max(40, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    const pw = pathCv.parentElement.clientWidth;
    if (pw) {
      pathCv.width = Math.round(pw * dpr); pathCv.height = Math.round(pw * 0.62 * dpr);
      beamCv.width = Math.round(pw * dpr); beamCv.height = Math.round(pw * 0.3 * dpr);
      update();
    }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(pathCv.parentElement);

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
  function setT(t) { state.t = t; update(); }
  function jumpKey(i) {
    setPlaying(false);
    const d = state.keyDates[i];
    // 跳到那一天的台灣中午：圖釘朝向太陽，正午太陽高度最好看
    const x = tw(d);
    setT(Date.UTC(x.y, x.m - 1, x.d, 12) - 8 * HOUR);
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.se-where button').forEach((b) => b.addEventListener('click', () => {
    state.place = b.dataset.place;
    $$('.se-where button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    update();
  }));
  $$('.se-key').forEach((b) => b.addEventListener('click', () => jumpKey(parseInt(b.dataset.key, 10))));
  dateSl.addEventListener('input', () => {
    setPlaying(false);
    const x = tw(new Date(state.t));
    // 保留一天中的時刻，只換日期
    const d = new Date(yearStart(state.year) + parseFloat(dateSl.value) * HOUR);
    const y = tw(d);
    setT(Date.UTC(y.y, y.m - 1, y.d, x.h, x.mi) - 8 * HOUR);
  });
  timeSl.addEventListener('input', () => {
    setPlaying(false);
    const x = tw(new Date(state.t)), mins = parseFloat(timeSl.value);
    setT(Date.UTC(x.y, x.m - 1, x.d, 0, mins) - 8 * HOUR);
  });
  $('.se-now').addEventListener('click', () => { setPlaying(false); setT(Date.now()); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); update(); }); };
  bind('[data-t="tilt"]', (v) => { state.tiltTarget = v ? E.OBLIQUITY : 0; });
  bind('[data-t="lines"]', (v) => { state.lines = v; });
  bind('[data-t="ghosts"]', (v) => { state.ghosts = v; });
  $('.al-home').addEventListener('click', () => { if (state.view === 'close') rel.copy(CLOSE_OFF); camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  camera.position.copy(ORBIT_CAM);
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.tilt !== state.tiltTarget) {
      const d = state.tiltTarget - state.tilt, stepT = dt * 18;
      state.tilt = Math.abs(d) < stepT ? state.tiltTarget : state.tilt + Math.sign(d) * stepT;
      update();
    }
    // 近看模式：先記下相機在「日地座標」裡的位置，地球移動之後放回同一個相對位置
    const follow = state.view === 'close' && camT >= 1;
    if (follow) rel.copy(toRel(camera.position));
    if (state.playing) setT(state.t + dt * state.speed * DAY);
    if (follow) { camera.position.copy(fromRel(rel)); controls.target.copy(earthG.position); }
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
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setYear(tw(new Date()).y);
  resize();
  setT(state.t);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying, setView };   // 除錯用：$('[data-season-lab]').__lab
  return { jumpKey, jumpTo: (t) => { setPlaying(false); setT(t); } };
}

// 頁面下方的二十四節氣：今年的日期當場算
function renderTerms(box, api) {
  // 從今年立春排到明年大寒：小寒、大寒用下一年一月的日期，順序才接得上冬至
  const y = tw(new Date()).y;
  const all = E.solarTermsOfYear(y).filter((t) => t.lon !== 285 && t.lon !== 300)
    .concat(E.solarTermsOfYear(y + 1).filter((t) => t.lon === 285 || t.lon === 300));
  box.querySelectorAll('[data-term]').forEach((el) => {
    const lon = parseInt(el.getAttribute('data-term'), 10);
    const t = all.find((x) => x.lon === lon);
    if (!t) return;
    const x = tw(t.date);
    el.querySelector('.st-date').textContent = `${x.m}/${x.d}`;
    el.title = `${x.y}/${x.m}/${x.d}`;
    el.addEventListener('click', () => {
      const lab = api();
      if (!lab) return;
      lab.jumpTo(Date.UTC(x.y, x.m - 1, x.d, 12) - 8 * HOUR);
      document.querySelector('[data-season-lab]').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  document.querySelectorAll('.st-year').forEach((el) => { el.textContent = `${y}–${y + 1}`; });
}

function boot() {
  const root = document.querySelector('[data-season-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const terms = document.querySelector('[data-terms]');
  if (terms) renderTerms(terms, start);
  document.querySelectorAll('[data-lab-key]').forEach((b) => b.addEventListener('click', () => {
    const lab = start();
    if (!lab) return;
    lab.jumpKey(parseInt(b.getAttribute('data-lab-key'), 10));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
