/*
 * 第十五課：月亮的大小（純函式，不碰 DOM，可以直接用 node 測試：test/moonsize.test.mjs）。
 *
 * 月亮錯覺：地平線附近的月亮「看起來」特別大，但它在天上占的角度（約 0.5°）幾乎不變——
 * 甚至剛升起時還稍微小一點，因為那時你離月亮比較遠（多了將近一個地球半徑，約 6,400 公里）。
 * 真正會變的是月亮離地球的距離（約 35.6 萬到 40.7 萬公里），所以「超級月亮」比「微型月亮」寬約 14%。
 * 月球位置：ephem.js（Meeus 第 47 章）；從觀測者算的距離＝地心距離扣掉觀測者在地表的位置。
 */
import { moonPos, syzygyNear } from './ephem.js';
import { moonAltAzOf, riseSet } from './sky.js';

const DEG = Math.PI / 180;
export const R_EARTH = 6371;         // km
export const R_MOON = 1737.4;        // km
const DAY = 86400000;

/** 地心距離（km）。 */
export const geoDistance = (date) => moonPos(date).dist;
/** 從地表觀測者到月亮的距離（km）：地心距離 d、觀測者在地心看月亮的高度 alt → √(d² + R² − 2dR sin alt)。 */
export function topoDistance(date, site) {
  const d = geoDistance(date), alt = moonAltAzOf(date, site).alt * DEG;
  return Math.sqrt(d * d + R_EARTH * R_EARTH - 2 * d * R_EARTH * Math.sin(alt));
}
/** 角直徑（角分）。 */
export const angularDiameter = (km) => (2 * Math.asin(R_MOON / km)) / DEG * 60;

/** 月亮今晚：從 from 起 30 小時內的第一次月出，及其後的最高點、月落（以地心高度 0.125°，Meeus 的月出標準）。 */
export function moonNight(from, site) {
  const alt = (d) => moonAltAzOf(d, site).alt;
  const end = new Date(from.getTime() + 30 * 3600000);
  const { rise } = riseSet(alt, from, end, 0.125);
  if (!rise) return null;
  const { set } = riseSet(alt, rise, new Date(rise.getTime() + 20 * 3600000), 0.125);
  let top = rise, topAlt = -90;
  const stop = set || new Date(rise.getTime() + 14 * 3600000);
  for (let t = rise.getTime(); t <= stop.getTime(); t += 5 * 60000) { const a = alt(new Date(t)); if (a > topAlt) { topAlt = a; top = new Date(t); } }
  return {
    rise, set, top, topAlt, riseAz: moonAltAzOf(rise, site).az,
    riseSize: angularDiameter(topoDistance(rise, site)), topSize: angularDiameter(topoDistance(top, site)),
    riseKm: topoDistance(rise, site), topKm: topoDistance(top, site),
  };
}

/** 從 from 起 n 次滿月（時刻、地心距離、角直徑）。 */
export function fullMoons(from, n = 13) {
  const out = [];
  // 下一次滿月：先找最近的一次，若已過就往後一個朔望月
  let t = syzygyNear(new Date(from.getTime()), 180);
  if (t < from) t = syzygyNear(new Date(t.getTime() + 29.53 * DAY), 180);
  for (let k = 0; k < n; k++) {
    const km = geoDistance(t);
    out.push({ t, km, size: angularDiameter(km - R_EARTH * 0.5) });   // 用半個地球半徑近似「中等高度時離你多遠」
    t = syzygyNear(new Date(t.getTime() + 29.53 * DAY), 180);
  }
  return out;
}
/** 依大小排行：最大的三次是「超級月亮」，最小的是「微型月亮」。 */
export function rankFullMoons(list) {
  const bySize = [...list].sort((a, b) => b.size - a.size);
  const sup = new Set(bySize.slice(0, 3)), micro = bySize[bySize.length - 1];
  return list.map((f) => ({ ...f, super: sup.has(f), micro: f === micro }));
}

