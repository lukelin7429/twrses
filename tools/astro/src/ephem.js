/*
 * 低精度星曆與日月食預測（純函式，不碰 DOM，可以直接用 node 測試）。
 *
 * 月亮：Meeus《Astronomical Algorithms》第 47 章，取週期項前 30 項左右，
 *       經度誤差約 10″、緯度約 4″，拿來判斷日月食綽綽有餘。
 * 太陽：Meeus 第 25 章低精度公式（中心差＋離心率），誤差約 0.01°。
 * 時間：公式吃 TT，輸入輸出一律 UT，差 ΔT ≈ 69 秒（2020–2035 的合理常數）。
 *
 * 驗證：tools/astro/test/ephem.test.mjs 對照 NASA 日月食表。
 */

export const DEG = Math.PI / 180;
export const SYN = 29.530588853;
const DT_SEC = 69;
const R_EARTH = 6378.14;   // km
const R_MOON = 1737.4;     // km
const AU = 149597870.7;    // km
const R_SUN = 696000;      // km

const sin = (x) => Math.sin(x * DEG);
const cos = (x) => Math.cos(x * DEG);
const norm360 = (x) => ((x % 360) + 360) % 360;

export function jdOf(date) { return date.getTime() / 86400000 + 2440587.5; }
function tOf(date) { return (jdOf(date) + DT_SEC / 86400 - 2451545) / 36525; }

// ---- 月亮（Meeus 表 47.A / 47.B）----
// [D, M, M', F, Σl, Σr]
const LR = [
  [0, 0, 1, 0, 6288774, -20905355], [2, 0, -1, 0, 1274027, -3699111], [2, 0, 0, 0, 658314, -2955968],
  [0, 0, 2, 0, 213618, -569925], [0, 1, 0, 0, -185116, 48888], [0, 0, 0, 2, -114332, -3149],
  [2, 0, -2, 0, 58793, 246158], [2, -1, -1, 0, 57066, -152138], [2, 0, 1, 0, 53322, -170733],
  [2, -1, 0, 0, 45758, -204586], [0, 1, -1, 0, -40923, -129620], [1, 0, 0, 0, -34720, 108743],
  [0, 1, 1, 0, -30383, 104755], [2, 0, 0, -2, 15327, 10321], [0, 0, 1, 2, -12528, 0],
  [0, 0, 1, -2, 10980, 79661], [4, 0, -1, 0, 10675, -34782], [0, 0, 3, 0, 10034, -23210],
  [4, 0, -2, 0, 8548, -21636], [2, 1, -1, 0, -7888, 24208], [2, 1, 0, 0, -6766, 30824],
  [1, 0, -1, 0, -5163, -8379], [1, 1, 0, 0, 4987, -16675], [2, -1, 1, 0, 4036, -12831],
  [2, 0, 2, 0, 3994, -10445], [4, 0, 0, 0, 3861, -11650], [2, 0, -3, 0, 3665, 14403],
  [0, 1, -2, 0, -2689, -7003], [2, 0, -1, 2, -2602, 0], [2, -1, -2, 0, 2390, 10056],
  [1, 0, 1, 0, -2348, 6322], [2, -2, 0, 0, 2236, -9884],
];
// [D, M, M', F, Σb]
const B = [
  [0, 0, 0, 1, 5128122], [0, 0, 1, 1, 280602], [0, 0, 1, -1, 277693], [2, 0, 0, -1, 173237],
  [2, 0, -1, 1, 55413], [2, 0, -1, -1, 46271], [2, 0, 0, 1, 32573], [0, 0, 2, 1, 17198],
  [2, 0, 1, -1, 9266], [0, 0, 2, -1, 8822], [2, -1, 0, -1, 8216], [2, 0, -2, -1, 4324],
  [2, 0, 1, 1, 4200], [2, 1, 0, -1, -3359], [2, -1, -1, 1, 2463], [2, -1, 0, 1, 2211],
  [2, -1, -1, -1, 2065], [0, 1, -1, -1, -1870], [4, 0, -1, -1, 1828], [0, 1, 0, 1, -1794],
  [0, 0, 0, 3, -1749], [0, 1, -1, 1, -1565], [1, 0, 0, 1, -1491], [0, 1, 1, 1, -1475],
  [0, 1, 1, -1, -1410], [0, 1, 0, -1, -1344], [1, 0, 0, -1, -1335], [0, 0, 3, 1, 1107],
  [4, 0, 0, -1, 1021], [4, 0, -1, 1, 833],
];

/** 月亮地心黃經、黃緯（度）與距離（km），以及升交點平黃經。 */
export function moonPos(date) {
  const T = tOf(date);
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const A1 = 119.75 + 131.849 * T, A2 = 53.09 + 479264.29 * T, A3 = 313.45 + 481266.484 * T;
  let sl = 0, sr = 0, sb = 0;
  for (const [d, m, mp, f, l, r] of LR) {
    const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    const arg = d * D + m * M + mp * Mp + f * F;
    sl += l * e * sin(arg);
    sr += r * e * cos(arg);
  }
  for (const [d, m, mp, f, b] of B) {
    const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    sb += b * e * sin(d * D + m * M + mp * Mp + f * F);
  }
  sl += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
  sb += -2235 * sin(Lp) + 382 * sin(A3) + 175 * sin(A1 - F) + 175 * sin(A1 + F)
    + 127 * sin(Lp - Mp) - 115 * sin(Lp + Mp);
  return {
    lon: norm360(Lp + sl / 1e6),
    lat: sb / 1e6,
    dist: 385000.56 + sr / 1000,
    node: norm360(125.0445479 - 1934.1362891 * T),
  };
}

/** 太陽地心視黃經（度）與距離（km）。 */
export function sunPos(date) {
  const T = tOf(date);
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const e = 0.016708634 - 0.000042037 * T;
  const C = (1.914602 - 0.004817 * T) * sin(M) + (0.019993 - 0.000101 * T) * sin(2 * M) + 0.000289 * sin(3 * M);
  const nu = M + C;
  const R = (1.000001018 * (1 - e * e)) / (1 + e * cos(nu));
  const Om = 125.04 - 1934.136 * T;
  return { lon: norm360(L0 + C - 0.00569 - 0.00478 * sin(Om)), dist: R * AU };
}

/** 月亮相對太陽的距角（0–360，0 朔、180 望）。 */
export function elongation(date) { return norm360(moonPos(date).lon - sunPos(date).lon); }

/** 從 date 附近找「距角 = target」的時刻（牛頓法）。 */
export function syzygyNear(date, target) {
  let t = date.getTime();
  for (let k = 0; k < 6; k++) {
    let d = elongation(new Date(t)) - target;
    d = ((d + 540) % 360) - 180;
    t -= (d / 12.19) * 86400000;
  }
  return new Date(t);
}
export function lastNewMoon(date) {
  let nm = syzygyNear(new Date(date.getTime() - (elongation(date) / 360) * SYN * 86400000), 0);
  if (nm > date) nm = syzygyNear(new Date(nm.getTime() - SYN * 86400000), 0);
  return nm;
}
export function taiwanDayNumber(d) { return Math.floor((d.getTime() + 8 * 3600000) / 86400000); }

// ---- 幾何 ----
/** 兩圓（半徑 a、b，圓心距 d）重疊面積佔圓 a 的比例。 */
export function overlapFraction(a, b, d) {
  if (d >= a + b) return 0;
  if (d <= Math.abs(a - b)) return b >= a ? 1 : (b * b) / (a * a);
  const a2 = a * a, b2 = b * b;
  const x = (d * d + a2 - b2) / (2 * d * a), y = (d * d + b2 - a2) / (2 * d * b);
  const area = a2 * Math.acos(Math.max(-1, Math.min(1, x))) + b2 * Math.acos(Math.max(-1, Math.min(1, y)))
    - 0.5 * Math.sqrt(Math.max(0, (-d + a + b) * (d + a - b) * (d - a + b) * (d + a + b)));
  return area / (Math.PI * a2);
}

/** 某一刻的日月食幾何（角度一律用弧度）。 */
export function circumstances(date) {
  const m = moonPos(date), s = sunPos(date);
  const beta = m.lat * DEG;
  const dl = ((m.lon - s.lon + 540) % 360 - 180) * DEG;          // 月減日的黃經差（-π..π）
  const sepSun = Math.acos(Math.cos(beta) * Math.cos(dl));        // 月心與日心的地心角距
  const dlAnti = ((m.lon - s.lon + 360) % 360 - 180) * DEG;       // 月與「反日點」的黃經差
  const sepAnti = Math.acos(Math.cos(beta) * Math.cos(dlAnti));   // 月心與地影中心的角距
  const par = Math.asin(R_EARTH / m.dist);                         // 月亮地平視差
  const parSun = Math.asin(R_EARTH / s.dist);
  const rM = Math.asin(R_MOON / m.dist);
  const rS = Math.asin(R_SUN / s.dist);
  const umbra = 1.02 * (par + parSun - rS);                        // 地球本影在月球距離處的角半徑
  const penumbra = 1.02 * (par + parSun + rS);
  return { m, s, beta, dl, dlAnti, sepSun, sepAnti, par, rM, rS, umbra, penumbra };
}

/**
 * 地球上「看得最清楚的那一點」看到的日食：
 * 影軸離地心 sepSun·Δ，最近的地表點再扣掉一個地球半徑，
 * 從那一點看，月亮離觀測者 Δ-R，視半徑稍大。
 */
export function bestSolarView(c) {
  // 月亮在地球背對太陽的那一側（接近滿月）時，月影根本不可能落到地球上
  if (c.sepSun > Math.PI / 2) return { sep: c.sepSun, rM: c.rM, rS: c.rS, cover: 0, axis: Infinity };
  const axis = Math.sin(c.sepSun) * c.m.dist;
  const nearest = Math.max(0, axis - R_EARTH);
  const range = c.m.dist - Math.sqrt(Math.max(0, R_EARTH * R_EARTH - axis * axis));
  const sep = nearest / range;
  const rM = Math.asin(R_MOON / range);
  return { sep, rM, rS: c.rS, cover: overlapFraction(c.rS, rM, sep), axis };
}

// ---- 觀測地（彰化）----
export const SITE = { lat: 24.08, lon: 120.54, name: 'Changhua, Taiwan' };

function gmst(date) {
  const jd = jdOf(date), T = (jd - 2451545) / 36525;
  return norm360(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T);
}
function eclToEq(lonDeg, latDeg, dist, T) {
  const eps = (23.439291 - 0.0130042 * T) * DEG;
  const l = lonDeg * DEG, b = latDeg * DEG;
  const x = dist * Math.cos(b) * Math.cos(l), y = dist * Math.cos(b) * Math.sin(l), z = dist * Math.sin(b);
  return [x, y * Math.cos(eps) - z * Math.sin(eps), y * Math.sin(eps) + z * Math.cos(eps)];
}
/** 從 SITE 看到的太陽、月亮方向、高度角與日面被遮比例。 */
export function topocentric(date, site = SITE) {
  const T = tOf(date);
  const m = moonPos(date), s = sunPos(date);
  const th = (gmst(date) + site.lon) * DEG, ph = site.lat * DEG;
  const up = [Math.cos(ph) * Math.cos(th), Math.cos(ph) * Math.sin(th), Math.sin(ph)];
  const obs = up.map((v) => v * R_EARTH);
  const mv = eclToEq(m.lon, m.lat, m.dist, T).map((v, i) => v - obs[i]);
  const sv = eclToEq(s.lon, 0, s.dist, T).map((v, i) => v - obs[i]);
  const len = (v) => Math.hypot(v[0], v[1], v[2]);
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const lm = len(mv), ls = len(sv);
  const sep = Math.acos(Math.max(-1, Math.min(1, dot(mv, sv) / (lm * ls))));
  const rM = Math.asin(R_MOON / lm), rS = Math.asin(R_SUN / ls);
  return {
    sunAlt: Math.asin(dot(sv, up) / ls) / DEG,
    moonAlt: Math.asin(dot(mv, up) / lm) / DEG,
    sep, rM, rS, cover: overlapFraction(rS, rM, sep),
  };
}

// ---- 找日月食 ----
function minimize(f, t0, halfSpanMs) {
  // 先粗掃再黃金分割，找 f 的最小值
  let best = t0, bv = Infinity;
  const step = halfSpanMs / 24;
  for (let t = t0 - halfSpanMs; t <= t0 + halfSpanMs; t += step) {
    const v = f(t);
    if (v < bv) { bv = v; best = t; }
  }
  let a = best - step, b = best + step;
  const g = (Math.sqrt(5) - 1) / 2;
  for (let k = 0; k < 40; k++) {
    const c = b - g * (b - a), d = a + g * (b - a);
    if (f(c) < f(d)) b = d; else a = c;
  }
  const t = (a + b) / 2;
  return { t, v: f(t) };
}
function crossing(f, level, tIn, tOut) {
  // f(tIn) < level <= f(tOut)，二分找交界（tOut 可以在 tIn 之前或之後）
  let a = tIn, b = tOut;
  for (let k = 0; k < 40; k++) { const mid = (a + b) / 2; if (f(mid) < level) a = mid; else b = mid; }
  return (a + b) / 2;
}

/** 把一個朔或望分類成日食／月食（沒有食就回傳 null）。 */
export function classify(syzygy, kind) {
  const H = 3600000;
  if (kind === 'lunar') {
    const f = (t) => circumstances(new Date(t)).sepAnti;
    const { t, v } = minimize(f, syzygy.getTime(), 5 * H);
    const c = circumstances(new Date(t));
    const umbralMag = (c.umbra + c.rM - v) / (2 * c.rM);
    const penMag = (c.penumbra + c.rM - v) / (2 * c.rM);
    if (penMag <= 0) return null;
    const type = umbralMag >= 1 ? 'total' : umbralMag > 0 ? 'partial' : 'penumbral';
    const ev = { kind: 'lunar', type, max: new Date(t), mag: type === 'penumbral' ? penMag : umbralMag };
    // 接觸時刻：本影食始末、全食始末
    const span = (lvl) => (v >= lvl ? null
      : [new Date(crossing(f, lvl, t, t - 5 * H)), new Date(crossing(f, lvl, t, t + 5 * H))]);
    ev.partial = span(c.umbra + c.rM);
    ev.total = span(c.umbra - c.rM);
    ev.penumbral = span(c.penumbra + c.rM);
    return ev;
  }
  const f = (t) => circumstances(new Date(t)).sepSun;
  const { t, v } = minimize(f, syzygy.getTime(), 5 * H);
  const c = circumstances(new Date(t));
  if (v >= c.par + c.rS + c.rM) return null;
  const best = bestSolarView(c);
  let type = 'partial';
  if (best.axis < R_EARTH) type = best.rM >= c.rS ? 'total' : 'annular';
  return { kind: 'solar', type, max: new Date(t), mag: best.cover };
}

/** 彰化看得到嗎？月食看月亮在不在地平線上，日食逐分鐘算站心遮蔽。 */
export function localVisibility(ev, site = SITE) {
  const M = 60000;
  if (ev.kind === 'lunar') {
    const win = ev.partial || ev.penumbral;
    let up = 0, n = 0, first = null, last = null;
    for (let t = win[0].getTime(); t <= win[1].getTime(); t += 5 * M) {
      n++;
      if (topocentric(new Date(t), site).moonAlt > -0.3) { up++; if (!first) first = new Date(t); last = new Date(t); }
    }
    const atMax = topocentric(ev.max, site).moonAlt > -0.3;
    return { visible: up > 0, whole: up === n, atMax, first, last };
  }
  let bestCover = 0, bestT = null, first = null, last = null;
  for (let t = ev.max.getTime() - 4 * 60 * M; t <= ev.max.getTime() + 4 * 60 * M; t += 2 * M) {
    const o = topocentric(new Date(t), site);
    if (o.sunAlt > -0.3 && o.cover > 0.001) {
      if (!first) first = new Date(t);
      last = new Date(t);
      if (o.cover > bestCover) { bestCover = o.cover; bestT = new Date(t); }
    }
  }
  return { visible: bestCover > 0.001, cover: bestCover, max: bestT, first, last };
}

/** 從 from 起往後找 count 次日月食（朔望逐一檢查）。 */
export function findEclipses(from, count, dirn = 1) {
  const out = [];
  let t = syzygyNear(from, 0);
  if ((dirn > 0 && t < from) || (dirn < 0 && t > from)) t = new Date(t.getTime() + dirn * (SYN / 2) * 86400000);
  let kind = Math.abs(((elongation(t) + 540) % 360) - 180) < 90 ? 'solar' : 'lunar';
  for (let guard = 0; guard < Math.max(400, count * 14) && out.length < count; guard++) {
    const target = kind === 'solar' ? 0 : 180;
    const s = syzygyNear(t, target);
    const ev = classify(s, kind);
    if (ev && (dirn > 0 ? ev.max >= from : ev.max <= from)) out.push(ev);
    t = new Date(s.getTime() + dirn * (SYN / 2) * 86400000);
    kind = kind === 'solar' ? 'lunar' : 'solar';
  }
  return out;
}

/** 太陽離月球軌道交點多遠（度，0–90）。小於約 17° 就在「食季」裡。 */
export function nodeDistance(date) {
  const d = Math.abs(((sunPos(date).lon - moonPos(date).node + 540) % 360) - 180);
  return Math.min(d, 180 - d);
}

// ---- 四季（第三課）：太陽赤緯、均時差、日出日落、節氣 ----
export const OBLIQUITY = 23.4393;          // 黃赤交角（2026 年前後）

/** 太陽的赤道座標。tiltDeg 可以改（第三課的「假設地軸不傾斜」就是傳 0）。 */
export function sunEquatorial(date, tiltDeg = OBLIQUITY) {
  const s = sunPos(date);
  const T = tOf(date);
  const e = tiltDeg * DEG, l = s.lon * DEG;
  const dec = Math.asin(Math.sin(e) * Math.sin(l)) / DEG;
  const ra = norm360(Math.atan2(Math.cos(e) * Math.sin(l), Math.cos(l)) / DEG);
  const L0 = norm360(280.46646 + 36000.76983 * T);
  let eot = L0 - 0.0057183 - ra;                 // 均時差（度）→ 分鐘
  eot = ((eot + 540) % 360) - 180;
  return { lon: s.lon, dist: s.dist, dec, ra, eotMin: eot * 4 };
}
export { gmst };

/** 從某地看太陽的高度、方位（方位角：北 0°、東 90°、南 180°）。 */
export function sunAltAz(date, site, tiltDeg = OBLIQUITY) {
  const q = sunEquatorial(date, tiltDeg);
  const H = (gmst(date) + site.lon - q.ra) * DEG, ph = site.lat * DEG, d = q.dec * DEG;
  const alt = Math.asin(Math.sin(ph) * Math.sin(d) + Math.cos(ph) * Math.cos(d) * Math.cos(H));
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(ph) - Math.tan(d) * Math.cos(ph)) / DEG + 180;
  return { alt: alt / DEG, az: norm360(az) };
}

/**
 * 某地某一天（該地標準時間的日期）的日出、日落、晝長、正午太陽高度。
 * 時間以該地標準時間（小時，0–24）表示；-0.833° 含大氣折射與日面半徑。
 * 回傳 polar: 'day'（永晝）| 'night'（永夜）| null。
 */
export function dayInfo(date, site, tiltDeg = OBLIQUITY) {
  const tz = site.tz;
  const loc = new Date(date.getTime() + tz * 3600000);
  const noonGuess = Date.UTC(loc.getUTCFullYear(), loc.getUTCMonth(), loc.getUTCDate(), 12) - tz * 3600000;
  const q = sunEquatorial(new Date(noonGuess), tiltDeg);
  const noon = 12 - q.eotMin / 60 - (site.lon - 15 * tz) / 15;
  const ph = site.lat * DEG, d = q.dec * DEG;
  const c = (Math.sin(-0.833 * DEG) - Math.sin(ph) * Math.sin(d)) / (Math.cos(ph) * Math.cos(d));
  const noonAlt = 90 - Math.abs(site.lat - q.dec);
  if (c <= -1) return { noon, rise: null, set: null, length: 24, noonAlt, dec: q.dec, polar: 'day' };
  if (c >= 1) return { noon, rise: null, set: null, length: 0, noonAlt, dec: q.dec, polar: 'night' };
  const H0 = Math.acos(c) / DEG / 15;
  return { noon, rise: noon - H0, set: noon + H0, length: 2 * H0, noonAlt, dec: q.dec, polar: null };
}

/** 太陽視黃經到達 targetLon 的時刻（從 from 往後找）。 */
export function sunLonTime(targetLon, from) {
  let t = from.getTime();
  const d0 = norm360(targetLon - sunPos(from).lon);
  t += (d0 / 0.98565) * 86400000;
  for (let k = 0; k < 5; k++) {
    const d = ((targetLon - sunPos(new Date(t)).lon + 540) % 360) - 180;
    t += (d / 0.98565) * 86400000;
  }
  return new Date(t);
}

// 二十四節氣：從春分（黃經 0°）起每 15°
export const SOLAR_TERMS = [
  ['春分', 'Spring Equinox'], ['清明', 'Clear and Bright'], ['穀雨', 'Grain Rain'],
  ['立夏', 'Start of Summer'], ['小滿', 'Grain Buds'], ['芒種', 'Grain in Ear'],
  ['夏至', 'Summer Solstice'], ['小暑', 'Minor Heat'], ['大暑', 'Major Heat'],
  ['立秋', 'Start of Autumn'], ['處暑', 'End of Heat'], ['白露', 'White Dew'],
  ['秋分', 'Autumn Equinox'], ['寒露', 'Cold Dew'], ['霜降', "Frost's Descent"],
  ['立冬', 'Start of Winter'], ['小雪', 'Minor Snow'], ['大雪', 'Major Snow'],
  ['冬至', 'Winter Solstice'], ['小寒', 'Minor Cold'], ['大寒', 'Major Cold'],
  ['立春', 'Start of Spring'], ['雨水', 'Rain Water'], ['驚蟄', 'Awakening of Insects'],
];

/** 某一年（台灣日曆）的 24 個節氣時刻，依日期排序（小寒在最前、冬至在最後）。 */
export function solarTermsOfYear(year) {
  const start = new Date(Date.UTC(year, 0, 1) - 8 * 3600000);
  const out = [];
  for (let k = 0; k < 24; k++) {
    const lon = (285 + 15 * k) % 360;
    const t = sunLonTime(lon, start);
    out.push({ index: Math.round(lon / 15) % 24, lon, date: t });
  }
  return out;
}

/** 某一年的近日點、遠日點（地日距離最小、最大的日子）。 */
export function apsidesOfYear(year) {
  const d = (m, day) => new Date(Date.UTC(year, m, day));
  const scan = (a, b, sign) => {
    let best = a.getTime(), bv = Infinity;
    for (let t = a.getTime(); t <= b.getTime(); t += 3600000 * 6) {
      const v = sign * sunPos(new Date(t)).dist;
      if (v < bv) { bv = v; best = t; }
    }
    return new Date(best);
  };
  return { peri: scan(d(0, 1), d(0, 12), 1), aph: scan(d(6, 1), d(6, 12), -1) };
}
