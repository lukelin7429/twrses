/*
 * 第十課「魚怎麼在水裡呼吸？」的規則（life-gill.js 與 test/gill.test.mjs 共用）。
 * 鰓裡面，水和血隔著一層很薄的膜流過。氧氣只會從多的一邊跑到少的一邊。
 *   逆流（方向相反）：水一路上碰到的血，氧氣都比它少一點，所以整條路都在交換，水裡大部分的氧氣都被拿走。
 *   順流（方向相同）：兩邊很快就一樣多，交換就停了，最多只拿得到一半。
 * 數字是示意（水進來時的氧氣當作 100）。
 */
export const MODES = ['counter', 'same'];
const GAP = 15;                                                  // 逆流時水永遠比旁邊的血多這麼多
// x 是沿著鰓的位置（0＝水進來的那一頭，1＝水出去的那一頭）
export function at(mode, x) {
  const t = Math.min(1, Math.max(0, x));
  if (mode === 'same') { const e = 50 * Math.exp(-5 * t); return { water: +(50 + e).toFixed(1), blood: +(50 - e).toFixed(1) }; }
  const water = 100 - (100 - GAP) * t;
  return { water: +water.toFixed(1), blood: +(water - GAP).toFixed(1) };
}
export const gap = (mode, x) => { const v = at(mode, x); return +(v.water - v.blood).toFixed(1); };
export const moving = (mode, x) => gap(mode, x) > 2;            // 這裡還有沒有氧氣在過去
// 血帶走了多少（水進來時的 100 裡）
export const taken = (mode) => (mode === 'same' ? Math.round(at('same', 1).blood) : 100 - GAP);
export const bloodDir = (mode) => (mode === 'same' ? 1 : -1);    // 血往哪邊流（水永遠是 +1）
export const holding = (mode, x) => (mode === 'same' ? (moving(mode, x) ? 's_start' : 's_stuck') : x < 0.5 ? 'c_start' : 'c_end');
