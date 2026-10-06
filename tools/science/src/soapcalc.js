/*
 * 萬物原理 · 第十七課「肥皂為什麼能去污？」的計算（純函式；示意用的簡化模型，不是實驗量到的數字）。
 *
 * 三種洗法，回傳「已經被帶走的油污比例」cleaned(mode, t)，t 是秒：
 *   water：只用水——油和水不相溶，幾乎帶不走
 *   soap ：加了肥皂但不搓——肥皂分子插進油污，但只有邊緣慢慢鬆動
 *   scrub：加肥皂又搓洗——搓揉把油污拆成小球，肥皂把小球包起來（微胞），水一沖就帶走
 */
export const MODES = ['water', 'soap', 'scrub'];
export const T_MAX = 30;
export const MICELLES = 14, PER_MICELLE = 12;
const CURVE = { water: [0.03, 5], soap: [0.42, 14], scrub: [1, 6.5] };     // [最多帶走多少, 時間常數（秒）]

export function cleaned(mode, t) {
  const [cap, tau] = CURVE[mode] || CURVE.water;
  return cap * (1 - Math.exp(-Math.max(0, t) / tau));
}
export const oilLeft = (mode, t) => 1 - cleaned(mode, t);
// 第 j 顆油滴（0 起算）離開的時間；這種洗法帶不走那麼多就回傳 Infinity
export function releaseTime(mode, j) {
  const [cap, tau] = CURVE[mode] || CURVE.water;
  const need = (j + 0.5) / MICELLES;
  if (mode === 'water' || need >= cap) return Infinity;
  return -tau * Math.log(1 - need / cap);
}
export function micellesAway(mode, t) {
  let n = 0;
  for (let j = 0; j < MICELLES; j++) if (releaseTime(mode, j) <= t) n++;
  return n;
}
