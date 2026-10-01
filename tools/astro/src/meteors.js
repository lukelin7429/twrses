/*
 * 第十一課的流星雨計算（純函式，不碰 DOM，可以直接用 node 測試：test/meteors.test.mjs）。
 *
 * 流星雨資料：IMO（國際流星組織）〈Working List of Visual Meteor Showers〉（2027 Meteor Shower Calendar，
 * Jürgen Rendtel 編，資料截至 2026 年 6 月）的極大期太陽黃經 λ☉（J2000）、輻射點、速度、ZHR。
 * 每年的極大時刻＝太陽黃經到達 λ☉ 的那一刻——地球每年在軌道上同一個位置穿過同一條碎屑帶。
 * 母天體軌道根數：NASA/JPL Small-Body Database（J2000 黃道），只用來畫軌道形狀與碎屑帶。
 */
import { moonPos, sunPos } from './ephem.js';
import { altAz, moonAltAzOf, precession, sunAltAzOf } from './sky.js';

const DEG = Math.PI / 180;
const DAY = 86400000;
const norm360 = (x) => ((x % 360) + 360) % 360;

// 母天體：a（AU）、e、i、Ω、ω（度，J2000 黃道），period（年）
export const PARENTS = {
  halley: { en: "Halley's Comet (1P/Halley)", zh: '哈雷彗星', kind: 'comet', a: 17.92863504856923, e: 0.9679359956953211, i: 162.1905300439129, om: 59.09894720612437, w: 112.2414314637764, period: 76 },
  swift: { en: 'Comet Swift–Tuttle (109P)', zh: '斯威夫特－塔特爾彗星', kind: 'comet', a: 26.0920694978266, e: 0.963225755046038, i: 113.453816997171, om: 139.3811920815948, w: 152.9821676305871, period: 133 },
  tempel: { en: 'Comet Tempel–Tuttle (55P)', zh: '坦普爾－塔特爾彗星', kind: 'comet', a: 10.3383382297577, e: 0.905552720972412, i: 162.486575379434, om: 235.270989149082, w: 172.5002736828059, period: 33 },
  phaethon: { en: 'Asteroid 3200 Phaethon', zh: '小行星法厄同', kind: 'asteroid', a: 1.271464620920411, e: 0.8896722843692159, i: 22.31052728047163, om: 265.0988060455101, w: 322.300168483426, period: 1.43 },
  eh1: { en: 'Asteroid 2003 EH1', zh: '小行星 2003 EH1', kind: 'asteroid', a: 3.122961104823023, e: 0.6186585375003572, i: 70.87465483893259, om: 283.0012178849225, w: 171.3388539494404, period: 5.5 },
  tuttle: { en: 'Comet Tuttle (8P)', zh: '塔特爾彗星', kind: 'comet', a: 5.700291361749948, e: 0.8197876162331501, i: 54.98196882510133, om: 270.3421615706648, w: 207.5115175085094, period: 13.6 },
  thatcher: { en: 'Comet Thatcher (C/1861 G1)', zh: '佘契爾彗星', kind: 'comet', a: 55.6818869, e: 0.983465, i: 79.7733, om: 31.8674, w: 213.4496, period: 415 },
};

// 八個主要流星雨（IMO Working List）。act：活動期（月, 日）；con：輻射點所在星座（figures.js 縮寫）
export const SHOWERS = [
  { key: 'qua', en: 'Quadrantids', zh: '象限儀座流星雨', lam: 283.15, ra: 230, dec: 49, v: 41, zhr: 80, act: [[12, 28], [1, 12]], con: 'Boo', conEn: 'Boötes', conZh: '牧夫座', parent: 'eh1' },
  { key: 'lyr', en: 'Lyrids', zh: '天琴座流星雨', lam: 32.32, ra: 271, dec: 34, v: 49, zhr: 18, act: [[4, 14], [4, 30]], con: 'Lyr', conEn: 'Lyra', conZh: '天琴座', parent: 'thatcher' },
  { key: 'eta', en: 'Eta Aquariids', zh: '寶瓶座η流星雨', lam: 45.5, ra: 338, dec: -1, v: 66, zhr: 50, act: [[4, 19], [5, 28]], con: 'Aqr', conEn: 'Aquarius', conZh: '寶瓶座', parent: 'halley' },
  { key: 'per', en: 'Perseids', zh: '英仙座流星雨', lam: 140.0, ra: 48, dec: 58, v: 59, zhr: 110, act: [[7, 17], [8, 24]], con: 'Per', conEn: 'Perseus', conZh: '英仙座', parent: 'swift' },
  { key: 'ori', en: 'Orionids', zh: '獵戶座流星雨', lam: 208, ra: 95, dec: 16, v: 66, zhr: 20, act: [[10, 2], [11, 7]], con: 'Ori', conEn: 'Orion', conZh: '獵戶座', parent: 'halley' },
  { key: 'leo', en: 'Leonids', zh: '獅子座流星雨', lam: 235.27, ra: 152, dec: 22, v: 71, zhr: 15, act: [[11, 6], [11, 30]], con: 'Leo', conEn: 'Leo', conZh: '獅子座', parent: 'tempel' },
  { key: 'gem', en: 'Geminids', zh: '雙子座流星雨', lam: 262.2, ra: 112, dec: 33, v: 35, zhr: 150, act: [[12, 4], [12, 20]], con: 'Gem', conEn: 'Gemini', conZh: '雙子座', parent: 'phaethon' },
  { key: 'urs', en: 'Ursids', zh: '小熊座流星雨', lam: 270.7, ra: 217, dec: 76, v: 33, zhr: 10, act: [[12, 17], [12, 26]], con: 'UMi', conEn: 'Ursa Minor', conZh: '小熊座', parent: 'tuttle' },
];
export const showerByKey = (k) => SHOWERS.find((s) => s.key === k);

/** 太陽黃經（J2000，度）：IMO 的 λ☉ 用的是這個。 */
export const solarLonJ2000 = (date) => norm360(sunPos(date).lon - precession(date));

/** 從 from 往後，太陽黃經第一次到達 lam 的時刻。 */
export function solarLonTime(lam, from) {
  let t = from.getTime() + (norm360(lam - solarLonJ2000(from)) / 0.98565) * DAY;
  for (let k = 0; k < 6; k++) {
    const d = ((lam - solarLonJ2000(new Date(t)) + 540) % 360) - 180;
    t += (d / 0.98565) * DAY;
  }
  return new Date(t);
}

/** 某個流星雨在 year 年（UTC）的極大時刻。 */
export function peakOf(s, year) {
  // 從那一年 1 月 1 日往後找；象限儀座（λ 283°）在 1 月初，也落在同一年
  return solarLonTime(s.lam, new Date(Date.UTC(year, 0, 1)));
}

/** 從 from 起（含已經過了不到 maxPastDays 天的），接下來的極大期，依時間排序。 */
export function upcomingPeaks(from, maxPastDays = 1) {
  const y = from.getUTCFullYear(), out = [];
  for (const s of SHOWERS) {
    for (const yy of [y, y + 1]) {
      const p = peakOf(s, yy);
      if (p.getTime() >= from.getTime() - maxPastDays * DAY) { out.push({ shower: s, peak: p }); break; }
    }
  }
  return out.sort((a, b) => a.peak - b.peak);
}

/** 月亮亮面比例（0–1）。 */
export function moonIllum(date) {
  const e = norm360(moonPos(date).lon - sunPos(date).lon);
  return (1 - Math.cos(e * DEG)) / 2;
}

/** 輻射點的高度與方位（J2000 位置，不加歲差：差 0.4°，看流星雨綽綽有餘）。 */
export const radiantAltAz = (s, date, site) => altAz(s.ra, s.dec, date, site);

/**
 * 極大期那一夜的觀測條件（地點 site，tz 時區小時）：
 * 夜晚＝太陽低於 −12°（航海曙暮光）；每 10 分鐘掃一次，找輻射點最高的時刻（best）。
 * rate：理想暗空下每小時大約看到幾顆（ZHR × sin 輻射點高度）；moon：那時的月亮亮面與高度（moonAlt2：兩小時前）。
 */
export function nightOf(s, peak, site, tz = 8) {
  // 哪一夜：極大在當地 12:00 以後算那天晚上，12:00 以前算前一天晚上
  const local = new Date(peak.getTime() + tz * 3600000);
  let y = local.getUTCFullYear(), m = local.getUTCMonth(), d = local.getUTCDate();
  if (local.getUTCHours() < 12) { const p = new Date(Date.UTC(y, m, d - 1)); y = p.getUTCFullYear(); m = p.getUTCMonth(); d = p.getUTCDate(); }
  const t0 = Date.UTC(y, m, d, 12) - tz * 3600000;            // 當地中午
  let dark0 = null, dark1 = null, best = null, bestAlt = -90, riseT = null, prevAlt = null;
  for (let t = t0; t <= t0 + DAY; t += 10 * 60000) {
    const dt = new Date(t), sun = sunAltAzOf(dt, site).alt, ra = radiantAltAz(s, dt, site).alt;
    if (prevAlt !== null && prevAlt < 0 && ra >= 0 && !riseT) riseT = dt;
    prevAlt = ra;
    if (sun < -12) {
      if (!dark0) dark0 = dt;
      dark1 = dt;
      if (ra > bestAlt) { bestAlt = ra; best = dt; }
    }
  }
  const moon = best ? moonAltAzOf(best, site) : null, moon2 = best ? moonAltAzOf(new Date(best.getTime() - 2 * 3600000), site) : null;
  return {
    night: { y, m: m + 1, d }, dark0, dark1, best, radAlt: bestAlt, radRise: riseT,
    rate: Math.max(0, Math.round(s.zhr * Math.sin(Math.max(0, bestAlt) * DEG))),
    moonIllum: best ? moonIllum(best) : moonIllum(peak), moonAlt: moon ? moon.alt : -90, moonAlt2: moon2 ? moon2.alt : -90,
    circumpolar: radiantAltAz(s, new Date(t0), site).alt > 0 && prevAlt > 0 && !riseT,
  };
}

// ---------------------------------------------------------------------------
// 軌道
/** 母天體在真近點角 nu（度）時的日心黃道直角座標（AU，J2000）。 */
export function orbitPoint(el, nu) {
  const p = el.a * (1 - el.e * el.e), r = p / (1 + el.e * Math.cos(nu * DEG));
  const u = (el.w + nu) * DEG, O = el.om * DEG, I = el.i * DEG;
  return [
    r * (Math.cos(O) * Math.cos(u) - Math.sin(O) * Math.sin(u) * Math.cos(I)),
    r * (Math.sin(O) * Math.cos(u) + Math.cos(O) * Math.sin(u) * Math.cos(I)),
    r * Math.sin(u) * Math.sin(I),
  ];
}
/** 兩個交點（軌道穿過黃道面的地方）：哪一個離地球軌道（1 AU）比較近。回傳 { lon, r, nu }。 */
export function nodeNearEarth(el) {
  const nodes = [-el.w, 180 - el.w].map((nu) => {
    const p = orbitPoint(el, nu);
    return { nu: norm360(nu), r: Math.hypot(p[0], p[1]), lon: norm360(Math.atan2(p[1], p[0]) / DEG) };
  });
  return nodes.sort((a, b) => Math.abs(a.r - 1) - Math.abs(b.r - 1))[0];
}
/** 地球在太陽黃經 lam 時的日心黃經（度）＝ lam + 180。 */
export const earthLonAt = (lam) => norm360(lam + 180);

/** 輻射點方向（J2000 黃道單位向量）：流星體從這個方向迎面而來。 */
export function radiantEcl(s) {
  const a = s.ra * DEG, d = s.dec * DEG, e = 23.4392911 * DEG;
  const x = Math.cos(d) * Math.cos(a), y = Math.cos(d) * Math.sin(a), z = Math.sin(d);
  return [x, y * Math.cos(e) + z * Math.sin(e), -y * Math.sin(e) + z * Math.cos(e)];
}

