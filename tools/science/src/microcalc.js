/*
 * 萬物原理 · 第二十課「微波爐怎麼加熱食物？」的計算（純函式；示意用的簡化模型，不是任何一台微波爐的實測）。
 *
 * 微波在金屬箱子裡來回反射，疊成「駐波」：有些地方很強（熱點）、有些地方幾乎沒有（冷點），
 *   熱點和熱點相隔半個波長。家用微波爐約 2.45 GHz，波長 12.2 公分 → 熱點相隔約 6.1 公分。
 *   intensity(x, z)：那個位置的微波強度（平均是 1；這裡只用最簡單的二維圖樣，真的爐子複雜得多）
 * 加熱：dT/dt = RATE · absorb · intensity。含水的食物吸收得多、冰吸收得少、可微波的盤子幾乎不吸收（absorb 是示意數字）。
 * 轉盤：食物繞著中心轉，每一點輪流經過熱點和冷點，所以比較均勻。
 */
export const FREQ_GHZ = 2.45, WAVELENGTH_CM = 12.2;
export const SPOT_CM = WAVELENGTH_CM / 2;                // 熱點間距
export const T_MAX = 120, RATE = 0.62, TURN_PERIOD = 10; // 秒、°C/秒、轉一圈幾秒
export const FOODS = {
  food: { absorb: 1, start: 20, cap: 100 },              // 含水的食物
  ice: { absorb: 0.12, start: -18, cap: 0 },             // 冰：分子被固定住，吸收得少
  plate: { absorb: 0.03, start: 20, cap: 100 },          // 可微波的空盤子：幾乎不吸收
};
const K = (2 * Math.PI) / WAVELENGTH_CM, PX = 0.9, PZ = 0.4;

// 位置用公分，原點在轉盤中心
export function intensity(x, z) {
  const a = Math.sin(K * x + PX), b = Math.sin(K * z + PZ);
  return 4 * a * a * b * b;
}
// 轉盤上一點（半徑 r、起始角 a0）在時間 t 的位置
export function spotAt(r, a0, t, turning) {
  const a = a0 + (turning ? (2 * Math.PI * t) / TURN_PERIOD : 0);
  return [r * Math.cos(a), r * Math.sin(a)];
}
// 這一點到時間 t 為止吸收的「強度 × 秒」
export function dose(r, a0, t, turning, dt = 0.25) {
  if (!turning) { const [x, z] = spotAt(r, a0, 0, false); return intensity(x, z) * t; }
  let s = 0;
  for (let u = 0; u < t; u += dt) { const [x, z] = spotAt(r, a0, u + dt / 2, true); s += intensity(x, z) * Math.min(dt, t - u); }
  return s;
}
export function tempAt(kind, r, a0, t, turning) {
  const f = FOODS[kind] || FOODS.food;
  return Math.min(f.cap, f.start + RATE * f.absorb * dose(r, a0, t, turning));
}
// 一盤食物的取樣點（公分）：中心＋兩圈
export const POINTS = (() => {
  const pts = [{ r: 0, a: 0 }];
  for (let i = 0; i < 6; i++) pts.push({ r: 3.6, a: (i / 6) * 2 * Math.PI });
  for (let i = 0; i < 12; i++) pts.push({ r: 7.2, a: (i / 12) * 2 * Math.PI + 0.26 });
  return pts;
})();
export function plateTemps(kind, t, turning) { return POINTS.map((p) => tempAt(kind, p.r, p.a, t, turning)); }
export function spread(kind, t, turning) {
  const v = plateTemps(kind, t, turning);
  return { min: Math.min(...v), max: Math.max(...v), mean: v.reduce((a, b) => a + b, 0) / v.length };
}
