/*
 * 第九課「鳥為什麼會飛？」的規則（life-bird.js 與 test/bird.test.mjs 共用）。
 * 翅膀在空氣裡前進就有升力；往下拍的時候把升力往前轉一點，就多了推力。往上舉的時候翅膀稍微收起來，少花力氣。
 * 不拍翅也能飛：滑翔會慢慢下降；遇到上升的熱空氣就能盤旋上升。力的大小都是示意（1＝剛好等於體重）。
 */
export const MODES = ['flap', 'glide', 'soar'];
// 拍翅的一個循環：phase 0–1；前半往下拍、後半往上舉
export const stroke = (p) => (((p % 1) + 1) % 1 < 0.5 ? 'down' : 'up');
export const wingAngle = (p) => +(50 * Math.cos(2 * Math.PI * p)).toFixed(2);          // 度；+50 在最上面，−50 在最下面
export const fold = (p) => { const q = ((p % 1) + 1) % 1; return q < 0.5 ? 0 : +Math.sin(Math.PI * (q - 0.5) / 0.5).toFixed(3); };   // 上舉時收起多少（0–1）
// 四個力：升力、重量、推力、阻力
export function forces(mode, p) {
  if (mode === 'glide') return { lift: 0.95, weight: 1, thrust: 0, drag: 0.25 };
  if (mode === 'soar') return { lift: 0.95, weight: 1, thrust: 0, drag: 0.25, updraft: 0.4 };
  return stroke(p) === 'down' ? { lift: 1.5, weight: 1, thrust: 0.7, drag: 0.3 } : { lift: 0.5, weight: 1, thrust: 0.1, drag: 0.3 };
}
// 飛行的結果：平飛、慢慢下降、上升
export const path = (mode) => (mode === 'flap' ? 'level' : mode === 'glide' ? 'sinking' : 'rising');
export const effort = (mode) => (mode === 'flap' ? 'high' : 'low');
export const holding = (mode, p) => (mode === 'flap' ? stroke(p) : mode);
