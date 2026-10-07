/*
 * 萬物原理 · 第十九課「鐵為什麼會生鏽？」的計算（純函式；示意用的簡化模型，不是實驗數字）。
 *
 * 生鏽要三樣東西到齊：鐵、氧（空氣）、水。缺一樣就幾乎不會鏽；有鹽會快很多。
 *   speed(c)：生鏽的速度（1 ＝ 有水有空氣的清水）
 *   exposed(coat)：表面有多少鐵露在外面（none 全部、paint 0、scratch 只有刮痕、zinc 0——鍍鋅刮傷了鋅還是會保護鐵）
 *   progress(t, c)：露出來的鐵鏽了多少（0～1），t 是模型裡的「天」
 */
export const T_MAX = 60;
export const SALT_X = 3, SCRATCH = 0.2, TAU = 22;
export const COATS = ['none', 'paint', 'scratch', 'zinc'];

export function speed({ water = true, air = true, salt = false } = {}) {
  if (!water || !air) return 0;
  return salt ? SALT_X : 1;
}
export const exposed = (coat = 'none') => (coat === 'none' ? 1 : coat === 'scratch' ? SCRATCH : 0);
export function progress(t, c = {}) {
  if (exposed(c.coat) === 0) return 0;
  return 1 - Math.exp(-speed(c) * Math.max(0, t) / TAU);
}
// 整塊表面鏽掉的比例
export const rusted = (t, c = {}) => progress(t, c) * exposed(c.coat);
