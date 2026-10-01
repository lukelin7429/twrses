/*
 * 第十三課：月球的天平動（純函式，不碰 DOM，可以直接用 node 測試：test/libration.test.mjs）。
 *
 * 月亮自轉一圈＝公轉一圈（27.32 天），所以永遠同一面朝向地球；但軌道是橢圓（公轉忽快忽慢、自轉等速）、
 * 自轉軸又和軌道面斜 6.7°，從地球看月面會左右搖、上下點頭——這叫天平動，一個月下來看得到約 59% 的月面。
 * 公式：Meeus《Astronomical Algorithms》第 53 章的光學天平動（optical libration），不含物理天平動（< 0.04°）。
 * l：經度天平動，正＝月面東緣（從地球看右邊，危海那一側）轉過來給我們看；b：緯度天平動，正＝北極轉過來。
 */
import { moonPos, sunPos } from './ephem.js';

const DEG = Math.PI / 180;
const I = 1.54242;                       // 月球赤道對黃道的傾角（度）
export const SIDEREAL = 27.321661;       // 恆星月（天）＝月球自轉週期
export const SYNODIC = 29.530588853;
const norm180 = (x) => ((((x + 180) % 360) + 360) % 360) - 180;

/** 某個時刻的光學天平動（度）：{ l, b }。 */
export function libration(date) {
  const T = (date.getTime() / 86400000 + 2440587.5 + 69 / 86400 - 2451545) / 36525;
  const m = moonPos(date);
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000;
  const W = (m.lon - m.node) * DEG, be = m.lat * DEG, i = I * DEG;
  const A = Math.atan2(Math.sin(W) * Math.cos(be) * Math.cos(i) - Math.sin(be) * Math.sin(i), Math.cos(W) * Math.cos(be));
  return {
    l: norm180(A / DEG - F),
    b: Math.asin(-Math.sin(W) * Math.cos(be) * Math.sin(i) - Math.sin(be) * Math.cos(i)) / DEG,
  };
}

/** 月相：距角（0 新月、180 滿月）、亮面比例、漸盈或漸虧。 */
export function moonPhase(date) {
  const e = ((moonPos(date).lon - sunPos(date).lon) % 360 + 360) % 360;
  return { elong: e, illum: (1 - Math.cos(e * DEG)) / 2, waxing: e < 180 };
}

/** 從 date 起前後 days 天，每 step 小時的天平動（畫一個月的天平動路徑）。 */
export function librationPath(date, days = 15, stepH = 6) {
  const out = [];
  for (let h = -days * 24; h <= days * 24; h += stepH) {
    const d = new Date(date.getTime() + h * 3600000);
    out.push({ t: d, ...libration(d) });
  }
  return out;
}

/** 這一個月（前後 15 天）東緣、西緣、北極、南極各在哪一天看得最多。 */
export function librationExtremes(date) {
  const p = librationPath(date, 15, 3);
  const pick = (f) => p.reduce((a, c) => (f(c) > f(a) ? c : a));
  return { east: pick((c) => c.l), west: pick((c) => -c.l), north: pick((c) => c.b), south: pick((c) => -c.b) };
}

/**
 * 正射投影的反算：月面圓盤上的一點（x 向右、y 向上，半徑 1）對應的月面經緯度（度），
 * 觀測者正對著月面經度 l、緯度 b 的點。圓盤外回傳 null。
 */
export function diskToSeleno(x, y, l, b) {
  const r2 = x * x + y * y;
  if (r2 > 1) return null;
  const z = Math.sqrt(1 - r2), cb = Math.cos(b * DEG), sb = Math.sin(b * DEG);
  return { lat: Math.asin(y * cb + z * sb) / DEG, lon: norm180(l + Math.atan2(x, z * cb - y * sb) / DEG) };
}
