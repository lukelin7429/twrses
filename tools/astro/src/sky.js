/*
 * 第五課的星空計算（純函式，不碰 DOM，可以直接用 node 測試：test/stars.test.mjs）。
 *
 * 星表是 J2000 赤道座標；畫在 3D（黃道座標）與「今晚彰化的星空」（地平座標）之前，
 * 先換成黃道座標，再把黃經加上歲差（每年約 50″，2026 年約 0.36°），就是當天的位置。
 * 精度約 0.1°，當星圖綽綽有餘；不含自行、章動、光行差。
 */
import { LINES, STARS } from './stars-data.js';
import { ZODIAC_BOUNDS } from './figures.js';
import { DEG, gmst, jdOf, moonPos, sunPos } from './ephem.js';

const EPS0 = 23.4392911;                 // J2000 黃赤交角
const norm360 = (x) => ((x % 360) + 360) % 360;
export const N_STARS = STARS.length / 4;

/** 從 J2000 到 date 的黃經歲差（度）。 */
export function precession(date) { return 1.39697 * (jdOf(date) - 2451545) / 36525; }
function obliquity(date) { return 23.439291 - 0.0130042 * (jdOf(date) - 2451545) / 36525; }

export function eqToEcl(ra, dec, eps = EPS0) {
  const a = ra * DEG, d = dec * DEG, e = eps * DEG;
  const lon = Math.atan2(Math.sin(a) * Math.cos(e) + Math.tan(d) * Math.sin(e), Math.cos(a));
  const lat = Math.asin(Math.sin(d) * Math.cos(e) - Math.cos(d) * Math.sin(e) * Math.sin(a));
  return { lon: norm360(lon / DEG), lat: lat / DEG };
}
export function eclToEq(lon, lat, eps = EPS0) {
  const l = lon * DEG, b = lat * DEG, e = eps * DEG;
  const ra = Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
  const dec = Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
  return { ra: norm360(ra / DEG), dec: dec / DEG };
}

// 每顆星的 J2000 黃經黃緯，只算一次
export const STAR_ECL = (() => {
  const out = new Float64Array(N_STARS * 2);
  for (let i = 0; i < N_STARS; i++) {
    const e = eqToEcl(STARS[i * 4], STARS[i * 4 + 1]);
    out[i * 2] = e.lon; out[i * 2 + 1] = e.lat;
  }
  return out;
})();
export const starMag = (i) => STARS[i * 4 + 2];
export const starBV = (i) => STARS[i * 4 + 3];

/** 某顆星在 date 的赤道座標（含歲差）。 */
export function starEqOfDate(i, date, p = precession(date), eps = obliquity(date)) {
  return eclToEq(STAR_ECL[i * 2] + p, STAR_ECL[i * 2 + 1], eps);
}

/** 地平座標：高度、方位（北 0°、東 90°）。 */
export function altAz(ra, dec, date, site, lst = gmst(date) + site.lon) {
  const H = (lst - ra) * DEG, ph = site.lat * DEG, d = dec * DEG;
  const alt = Math.asin(Math.sin(ph) * Math.sin(d) + Math.cos(ph) * Math.cos(d) * Math.cos(H));
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(ph) - Math.tan(d) * Math.cos(ph)) / DEG + 180;
  return { alt: alt / DEG, az: norm360(az) };
}

/** 一次算完所有星星的地平座標（星空圖每一格都要用）：回傳 Float32Array [alt, az, ...]。 */
export function allStarsAltAz(date, site, out = new Float32Array(N_STARS * 2)) {
  const p = precession(date), eps = obliquity(date), lst = gmst(date) + site.lon;
  for (let i = 0; i < N_STARS; i++) {
    const q = eclToEq(STAR_ECL[i * 2] + p, STAR_ECL[i * 2 + 1], eps);
    const h = altAz(q.ra, q.dec, date, site, lst);
    out[i * 2] = h.alt; out[i * 2 + 1] = h.az;
  }
  return out;
}

/** 黃道上某個 J2000 黃經落在哪個星座（依 IAU 邊界）。 */
export function zodiacAt(lonJ2000) {
  const L = norm360(lonJ2000);
  let abbr = 'Psc';
  for (const [edge, a] of ZODIAC_BOUNDS) if (L >= edge) abbr = a;
  return abbr;
}
/** 太陽今天在哪個星座前面，以及午夜時正對著的（太陽對面的）黃道星座。 */
export function sunConstellation(date) {
  const lon = sunPos(date).lon - precession(date);
  return { sun: zodiacAt(lon), opposite: zodiacAt(lon + 180), lon: norm360(lon) };
}
/** 現在正通過正南方（子午線）的黃道點落在哪個星座。 */
export function meridianZodiac(date, site) {
  const a = (gmst(date) + site.lon) * DEG, e = obliquity(date) * DEG;
  const lon = Math.atan2(Math.sin(a), Math.cos(a) * Math.cos(e)) / DEG;
  return zodiacAt(lon - precession(date));
}

export function sunAltAzOf(date, site) {
  const s = sunPos(date), q = eclToEq(s.lon, 0, obliquity(date));
  return altAz(q.ra, q.dec, date, site);
}
export function moonAltAzOf(date, site) {
  const m = moonPos(date), q = eclToEq(m.lon, m.lat, obliquity(date));
  return { ...altAz(q.ra, q.dec, date, site), elong: norm360(m.lon - sunPos(date).lon) };
}

/**
 * 在 [from, to] 之間找某個方向（fn(date) 回傳高度）升起、落下的時刻，每 5 分鐘掃一次再二分。
 * 回傳 { rise, set }（Date 或 null）。
 */
export function riseSet(fn, from, to, h0 = 0) {
  const step = 5 * 60000;
  let rise = null, set = null, prev = fn(from) - h0;
  for (let t = from.getTime() + step; t <= to.getTime(); t += step) {
    const v = fn(new Date(t)) - h0;
    if ((prev < 0) !== (v < 0)) {
      let a = t - step, b = t;
      for (let k = 0; k < 12; k++) { const m = (a + b) / 2; if ((fn(new Date(m)) - h0 < 0) === (prev < 0)) a = m; else b = m; }
      if (prev < 0 && !rise) rise = new Date(b);
      if (prev >= 0 && !set) set = new Date(b);
    }
    prev = v;
  }
  return { rise, set };
}

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

/**
 * 斗柄方向（第六課）：天權（δ UMa，斗杓與斗柄的交界）→ 搖光（η UMa，斗柄末端）在地平座標裡的方向。
 * 面向北方時：往右是東、往上是南（朝天頂）、往左是西、往下是北（朝地平線）。
 * 回傳 k：0 東、1 南、2 西、3 北；alt：搖光的高度。
 */
export function handleDir(date, site) {
  const h = (i) => { const q = starEqOfDate(i, date); return altAz(q.ra, q.dec, date, site); };
  const a = h(LINES.UMa[0]), b = h(LINES.UMa[6]);
  const east = ((((a.az - b.az) % 360) + 540) % 360 - 180) * Math.cos(a.alt * DEG), up = a.alt - b.alt;
  const k = ((Math.round(Math.atan2(up, east) / DEG / 90) % 4) + 4) % 4;
  return { k, en: ['east', 'south', 'west', 'north'][k], zh: ['東', '南', '西', '北'][k], alt: a.alt };
}

/** 某個星座（figures.js 的縮寫）有幾顆連線星高於 minAlt 度。 */
export function starsUp(abbr, date, site, minAlt = 3) {
  let n = 0;
  for (const i of new Set(LINES[abbr])) { const q = starEqOfDate(i, date); if (altAz(q.ra, q.dec, date, site).alt > minAlt) n++; }
  return n;
}
