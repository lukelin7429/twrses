/*
 * 第十六課：日出的方位（純函式，不碰 DOM，可以直接用 node 測試：test/sunrise.test.mjs）。
 *
 * 地軸傾斜 23.4°，太陽的赤緯一年之中在 ±23.4° 之間來回；太陽每天走的路（和天赤道平行的圓）跟著南北移動，
 * 它和地平線的交點——日出點——就在冬至點與夏至點之間來回擺盪。彰化約東偏南 25° 到東偏北 26°。
 * 日出、日落的定義和中央氣象署相同：太陽中心在地平線下 0.833°（大氣折射 34′＋太陽半徑 16′），平坦的海平面地平線。
 * 太陽位置：ephem.js 的 sunAltAz（Meeus 第 25 章低精度）。不 import sky.js：那會把整份星表打包進來（多 400 KB）。
 */
import { sunAltAz } from './ephem.js';

export const sunAltAzOf = sunAltAz;

const DEG = Math.PI / 180;
const H0 = -0.833;
const DAY = 86400000, MIN = 60000;

/** 赤緯 dec、緯度 lat 的日出方位（北 0°、東 90°），以高度 h0 為準；日落方位是 360° 減去它。太陽整天不落或不升時回傳 null。 */
export function riseAzimuth(dec, lat, h0 = H0) {
  const c = (Math.sin(dec * DEG) - Math.sin(lat * DEG) * Math.sin(h0 * DEG)) / (Math.cos(lat * DEG) * Math.cos(h0 * DEG));
  return Math.abs(c) > 1 ? null : Math.acos(c) / DEG;
}

/** 當地 y 年 m 月 d 日 0 時（site.tz 時區）的 Date。 */
export const localMidnight = (y, m, d, tz) => new Date(Date.UTC(y, m - 1, d) - tz * 3600000);
/** 某個時刻在 site 時區的年月日。 */
export function localYMD(date, tz) { const x = new Date(date.getTime() + tz * 3600000); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate() }; }

// 從 t0 起往前或往後找高度穿過 h 的時刻：先每 10 分鐘掃，再二分到 1 秒以內
function crossing(site, t0, t1, h, rising) {
  const alt = (t) => sunAltAzOf(new Date(t), site).alt - h;
  const step = 10 * MIN;
  let prev = alt(t0);
  for (let t = t0 + step; t <= t1; t += step) {
    const v = alt(t);
    if (rising ? prev < 0 && v >= 0 : prev >= 0 && v < 0) {
      let a = t - step, b = t;
      while (b - a > 1000) { const m = (a + b) / 2; if ((alt(m) < 0) === (prev < 0)) a = m; else b = m; }
      return new Date((a + b) / 2);
    }
    prev = v;
  }
  return null;
}

/**
 * 某一天（當地日期）的日出日落：時刻、方位、正午高度、晝長（小時）。
 * site = { lat, lon, tz }；day 可以是那一天裡任何時刻的 Date，或 { y, m, d }。
 */
export function sunDay(day, site) {
  const { y, m, d } = day instanceof Date ? localYMD(day, site.tz) : day;
  const t0 = localMidnight(y, m, d, site.tz).getTime();
  // 太陽正午附近分兩段找：前半天找升起、後半天找落下
  const noonGuess = t0 + (12 - (site.lon - 15 * site.tz) / 15) * 3600000;
  const rise = crossing(site, t0 - 2 * 3600000, noonGuess, H0, true);
  const set = crossing(site, noonGuess, t0 + 26 * 3600000, H0, false);
  // 正午：高度最大的時刻（黃金分割搜尋）
  let a = noonGuess - 40 * MIN, b = noonGuess + 40 * MIN;
  for (let k = 0; k < 30; k++) { const m1 = a + (b - a) * 0.382, m2 = a + (b - a) * 0.618; if (sunAltAzOf(new Date(m1), site).alt < sunAltAzOf(new Date(m2), site).alt) a = m1; else b = m2; }
  const noon = new Date((a + b) / 2);
  return {
    y, m, d, rise, set, noon,
    riseAz: rise ? sunAltAzOf(rise, site).az : null,
    setAz: set ? sunAltAzOf(set, site).az : null,
    noonAlt: sunAltAzOf(noon, site).alt,
    length: rise && set ? (set - rise) / 3600000 : null,
  };
}

/** 一整年每一天（當地日期）的 sunDay。 */
export function sunYear(year, site) {
  const out = [];
  for (let t = Date.UTC(year, 0, 1); new Date(t).getUTCFullYear() === year; t += DAY) {
    const x = new Date(t); out.push(sunDay({ y: year, m: x.getUTCMonth() + 1, d: x.getUTCDate() }, site));
  }
  return out;
}

/** 東偏北／偏南幾度（正＝偏北）。 */
export const offEast = (az) => 90 - az;

/** 一年裡日出最偏北、最偏南的一天，以及日出正東的日子（日出方位跨過 90° 的那兩天）。 */
export function sunriseExtremes(list) {
  let north = list[0], south = list[0];
  for (const x of list) { if (x.riseAz < north.riseAz) north = x; if (x.riseAz > south.riseAz) south = x; }
  const dueEast = [];
  for (let k = 1; k < list.length; k++) {
    const a = list[k - 1].riseAz - 90, b = list[k].riseAz - 90;
    if ((a > 0) !== (b > 0)) dueEast.push(Math.abs(a) < Math.abs(b) ? list[k - 1] : list[k]);
  }
  return { north, south, dueEast, swing: south.riseAz - north.riseAz };
}

/**
 * 懸日：太陽沿著一條方位 roadAz 的筆直街道升起或落下。
 * 每一天找出太陽方位剛好等於 roadAz 的時刻（日落型找下午、日出型找上午），看那時太陽的高度是不是落在
 * [hLow, hHigh]——低於 hLow 被街底的樓房擋住、高於 hHigh 就不在街道盡頭。回傳符合的日子 [{ y, m, d, t, alt }]。
 * 預設 2.7°–4.7° 是拿氣象署 2026 年台北忠孝東西路的預報校準的（test/sunrise.test.mjs 再用峨眉街與 8 月驗證）。
 */
export function hengeDays(roadAz, site, year, { hLow = 2.7, hHigh = 4.7 } = {}) {
  const sunset = roadAz > 180, out = [];
  for (const x of sunYear(year, site)) {
    const ev = sunset ? x.set : x.rise;
    if (!ev) continue;
    // 在日落前（日出後）3 小時內找方位等於 roadAz 的時刻
    const span = 3 * 3600000, a0 = sunset ? ev.getTime() - span : ev.getTime(), b0 = sunset ? ev.getTime() : ev.getTime() + span;
    const f = (t) => { const s = sunAltAzOf(new Date(t), site); return ((s.az - roadAz + 540) % 360) - 180; };
    let a = a0, b = b0, fa = f(a);
    if ((fa < 0) === (f(b) < 0)) continue;
    while (b - a > 2000) { const m = (a + b) / 2, fm = f(m); if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; }
    const t = new Date((a + b) / 2), alt = sunAltAzOf(t, site).alt;
    if (alt >= hLow && alt <= hHigh) out.push({ y: x.y, m: x.m, d: x.d, t, alt });
  }
  return out;
}

/** 把連續的日子併成一段一段：[[first, last], ...]。 */
export function groupRuns(days) {
  const runs = [];
  const key = (x) => Date.UTC(x.y, x.m - 1, x.d);
  for (const x of days) {
    const r = runs[runs.length - 1];
    if (r && key(x) - key(r[1]) === DAY) r[1] = x; else runs.push([x, x]);
  }
  return runs;
}

/**
 * 陶寺古觀象台（示意）：13 根夯土柱圍成東向的半圓、12 道縫，從中心觀測點看出去，
 * 第 2 道縫對準冬至日出、第 12 道縫對準夏至日出，中間的縫平均分配（第 7 道約在春秋分）。
 * 回傳 13 根柱子的方位（度）；縫的中心是相鄰兩根柱子的中點。真正的縫寬不一、對準的是東邊山上的日出點。
 */
export function taosiPillars(winterAz, summerAz) {
  const step = (winterAz - summerAz) / 10;          // 第 2 道縫到第 12 道縫，共 10 格
  const slotCenter = (k) => winterAz - (k - 2) * step;   // k = 1…12，1 在最南
  const out = [];
  for (let k = 0; k <= 12; k++) out.push(slotCenter(k + 0.5));   // 柱子在縫與縫之間
  return out;
}
