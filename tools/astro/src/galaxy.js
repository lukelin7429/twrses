/*
 * 第十四課：銀河（純函式，不碰 DOM，可以直接用 node 測試：test/galaxy.test.mjs）。
 *
 * 銀道座標（IAU 定義，J2000）：銀河北極在赤經 192.85948°、赤緯 +27.12825°，天北極的銀經是 122.93192°。
 * 銀經 l＝0° 是銀河中心方向（人馬座），l＝90° 是太陽繞銀心前進的方向（天鵝座）；銀緯 b＝0° 就是銀河那條光帶的中線。
 * 銀河的大小（教科書常用值）：直徑約 10 萬光年、太陽離中心約 2.6 萬光年（GRAVITY 2019：8.18 kpc）、
 * 盤面厚約 1,000 光年、繞一圈約 2.3 億年、恆星 1,000 億到 4,000 億顆。
 */
import { altAz } from './sky.js';

const DEG = Math.PI / 180;
const RA_NGP = 192.85948, DEC_NGP = 27.12825, L_NCP = 122.93192;
const norm360 = (x) => ((x % 360) + 360) % 360;

export const GALAXY = { diameterLy: 100000, sunLy: 26700, thickLy: 1000, yearMy: 230, starsLow: 1e11, starsHigh: 4e11 };

/** 赤道（J2000，度）→ 銀道座標 { l, b }。 */
export function eqToGal(ra, dec) {
  const a = ra * DEG, d = dec * DEG, ap = RA_NGP * DEG, dp = DEC_NGP * DEG;
  const sb = Math.sin(d) * Math.sin(dp) + Math.cos(d) * Math.cos(dp) * Math.cos(a - ap);
  const y = Math.cos(d) * Math.sin(a - ap), x = Math.sin(d) * Math.cos(dp) - Math.cos(d) * Math.sin(dp) * Math.cos(a - ap);
  return { l: norm360(L_NCP - Math.atan2(y, x) / DEG), b: Math.asin(sb) / DEG };
}
/** 銀道 → 赤道（J2000，度）{ ra, dec }。 */
export function galToEq(l, b) {
  const L = (L_NCP - l) * DEG, B = b * DEG, dp = DEC_NGP * DEG;
  const sd = Math.sin(B) * Math.sin(dp) + Math.cos(B) * Math.cos(dp) * Math.cos(L);
  const y = Math.cos(B) * Math.sin(L), x = Math.sin(B) * Math.cos(dp) - Math.cos(B) * Math.sin(dp) * Math.cos(L);
  return { ra: norm360(RA_NGP + Math.atan2(y, x) / DEG), dec: Math.asin(sd) / DEG };
}

/** 銀河中線經過的星座（依銀經粗分，教學用）。 */
export const PLANE_CONS = [
  [0, 'Sagittarius', '人馬座'], [17, 'Scutum', '盾牌座'], [28, 'Aquila', '天鷹座'], [55, 'Cygnus', '天鵝座'],
  [95, 'Cepheus', '仙王座'], [110, 'Cassiopeia', '仙后座'], [135, 'Perseus', '英仙座'], [160, 'Auriga', '御夫座'],
  [185, 'Taurus and Gemini', '金牛座與雙子座'], [195, 'Orion and Monoceros', '獵戶座與麒麟座'], [220, 'Canis Major', '大犬座'],
  [245, 'Puppis', '船尾座'], [265, 'Vela', '船帆座'], [285, 'Carina', '船底座'], [295, 'Crux', '南十字座'],
  [305, 'Centaurus', '半人馬座'], [335, 'Scorpius', '天蠍座'], [352, 'Sagittarius', '人馬座'],
];
export function planeConstellation(l) {
  const L = norm360(l);
  let hit = PLANE_CONS[0];
  for (const c of PLANE_CONS) if (L >= c[0]) hit = c;
  return { en: hit[1], zh: hit[2] };
}

/**
 * 某個時刻、某地的銀河：銀心高度、天頂的銀緯（越接近 0，光帶越接近頭頂）、
 * 銀河中線上高於 minAlt 度的段落經過哪些星座（由銀經順序排）。
 */
export function milkyWayAt(date, site, minAlt = 15) {
  const gc = galToEq(0, 0), g = altAz(gc.ra, gc.dec, date, site);
  const cons = [];
  let top = { alt: -90, l: 0 };
  for (let l = 0; l < 360; l += 2) {
    const q = galToEq(l, 0), h = altAz(q.ra, q.dec, date, site);
    if (h.alt > top.alt) top = { alt: h.alt, l, az: h.az };
    if (h.alt < minAlt) continue;
    const c = planeConstellation(l);
    if (!cons.find((x) => x.en === c.en)) cons.push({ ...c, l });
  }
  return { gcAlt: g.alt, gcAz: g.az, top, cons };
}
