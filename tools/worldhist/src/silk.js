/*
 * 世界歷史 第九課〈What Traveled Along the Silk Road? 絲路上走的是什麼？〉的純函式（node test/silk.test.mjs）。
 *
 * 時間和第八課一樣用西元年（負的是西元前），換算、路線檢查沿用 dharma.js（agoOf、toRoute、checkRoute）。
 *   goodPath(good, cities)      一件東西的旅程：每一站的經緯度
 *   legLengths(path)            每一段的長度（弧度），和全長
 *   tokenAt(path, t)            旅程進行到 t（0–1）時，小亮點在哪裡，以及在第幾段 { at, leg }
 *   handoffs(good)              換了幾次手（段數 − 1：每一段換一批人帶；good.same 為 true 時是 0）
 *   checkGood(good, cities)     每一站都在城市清單裡、每一段都寫了誰帶、旅程的年代時這些城市都已經在網路上；錯了回傳字串
 */
import { angle } from './sphere.js';

const D = Math.PI / 180;
const unit = ([lon, lat]) => [Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D), Math.cos(lat * D) * Math.cos(lon * D)];
const toLL = ([x, y, z]) => [Math.atan2(x, z) / D, Math.asin(Math.max(-1, Math.min(1, y))) / D];

/** 球面上兩點之間，走 t（0–1）的位置（大圓）。 */
export function slerp(a, b, t) {
  const A = unit(a), B = unit(b);
  const dot = Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const w = Math.acos(dot);
  if (w < 1e-9) return a.slice();
  const s = Math.sin(w), ka = Math.sin((1 - t) * w) / s, kb = Math.sin(t * w) / s;
  return toLL([A[0] * ka + B[0] * kb, A[1] * ka + B[1] * kb, A[2] * ka + B[2] * kb]);
}

export function goodPath(good, cities) {
  const by = Object.fromEntries(cities.map((c) => [c.key, c]));
  return good.stops.map((k) => by[k].at.slice());
}

export function legLengths(path) {
  const legs = [];
  for (let i = 1; i < path.length; i++) legs.push(angle(path[i - 1], path[i]) * D);
  return { legs, total: legs.reduce((a, b) => a + b, 0) };
}

/** 每一段花一樣的時間（不照長度），讓「換手」的節奏清楚；t = 0 在第一站，t = 1 在最後一站。 */
export function tokenAt(path, t) {
  const n = path.length - 1;
  if (n < 1) return { at: path[0].slice(), leg: 0 };
  const x = Math.min(1, Math.max(0, t)) * n;
  const leg = Math.min(n - 1, Math.floor(x));
  return { at: slerp(path[leg], path[leg + 1], x - leg), leg };
}

// same: true（第十三課的朝覲、旅人）：一路由同一批人走，不算換手
export const handoffs = (good) => (good.same ? 0 : Math.max(0, good.legs.length - 1));

export function checkGood(good, cities) {
  const by = Object.fromEntries(cities.map((c) => [c.key, c]));
  if (!good.stops || good.stops.length < 2) return `${good.key}: needs at least two stops`;
  for (const k of good.stops) if (!by[k]) return `${good.key}: unknown stop ${k}`;
  if (!good.legs || good.legs.length !== good.stops.length - 1) return `${good.key}: legs ${good.legs ? good.legs.length : 0} ≠ stops − 1`;
  for (const k of good.stops) if (by[k].year > good.year) return `${good.key}: ${k} joins in ${by[k].year}, after ${good.year}`;
  for (let i = 1; i < good.stops.length; i++) if (good.stops[i] === good.stops[i - 1]) return `${good.key}: same stop twice in a row`;
  return null;
}
