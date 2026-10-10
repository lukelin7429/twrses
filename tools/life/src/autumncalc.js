/*
 * 第八課「葉子為什麼會變色？」的規則（life-autumn.js 與 test/autumn.test.mjs 共用）。
 * 葉子裡本來就有黃色和橘色（類胡蘿蔔素），只是被綠色（葉綠素）蓋住。秋天樹把葉綠素拆掉收回去，黃色就露出來；
 * 有些樹這時候另外做出紅色（花青素），白天晴朗、夜裡涼的時候做得最多。數字都是示意。
 */
const c01 = (v) => Math.min(1, Math.max(0, v));
const sm = (x) => { const t = c01(x); return t * t * (3 - 2 * t); };
// 季節 0–100：0 盛夏 → 100 落葉
export const chlorophyll = (s) => +(1 - sm((s - 25) / 40)).toFixed(3);
export const carotenoid = (s) => +(1 - 0.7 * sm((s - 78) / 22)).toFixed(3);
export const anthocyanin = (s, kind, bright) => (kind === 'red' ? +(sm((s - 40) / 30) * (bright ? 1 : 0.35) * (1 - 0.5 * sm((s - 86) / 14))).toFixed(3) : 0);
export const STAGES = [['summer', 0], ['fading', 25], ['color', 60], ['fall', 90]];
export const stage = (s) => { let k = 'summer'; for (const [name, from] of STAGES) if (s >= from) k = name; return k; };
// 三種色素加起來看到的顏色：綠色很搶眼（會蓋住別的），紅色次之
const G = [63, 159, 72], Y = [242, 194, 58], R = [200, 44, 44], B = [138, 98, 58];
export function mix(g, y, r) {
  const wg = 3 * c01(g), wy = c01(y), wr = 4 * c01(r), wb = 0.06 + 0.9 * (1 - c01(g)) * (1 - c01(y)) * (1 - 0.6 * c01(r));
  const w = wg + wy + wr + wb;
  return [0, 1, 2].map((i) => Math.round((wg * G[i] + wy * Y[i] + wr * R[i] + wb * B[i]) / w));
}
export const leafColor = (s, kind, bright) => mix(chlorophyll(s), carotenoid(s), anthocyanin(s, kind, bright));
export const hex = (c) => `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
export const holding = (s, kind, bright) => {
  const k = stage(s);
  if (k !== 'color') return k;
  return kind !== 'red' ? 'yellow' : bright ? 'red' : 'dull';
};
// 頁面小工具：三種色素各調多少，看起來像什麼
export const look = (g, y, r) => (g >= 0.45 ? 'green' : r >= 0.5 ? 'red' : r >= 0.2 && y >= 0.3 ? 'orange' : y >= 0.3 ? 'yellow' : 'brown');
