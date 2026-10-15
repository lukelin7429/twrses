/*
 * 看得見的數學 · 除法的純函式（不碰 DOM、不碰 three.js；測試在 test/divide.test.mjs）。
 *
 * 一個想法：**除法有兩種問法，用同一個算式**。
 *   平分（share）：一共 total 顆，平分給 n 個人，每人幾顆？——一顆一顆輪流發。
 *   每幾個一組（group）：一共 total 顆，每 n 顆裝一袋，可以裝幾袋？——一袋裝滿再開下一袋。
 * 兩種都會得到同樣的商 q 和餘數 r：total ＝ n × q ＋ r，而且 0 ≤ r < n。
 *
 *   MAX_TOTAL、MAX_N        滑桿的上限（30、10）
 *   divide(total, n)         { q, r }；n 是 0 就丟錯（不能除以 0）
 *   steps(total, n, mode)    發糖的每一步：{ k, to }（第 k 顆放進第 to 個盤子或袋子）；發不完的留在桌上
 *   containers(total, n, mode)   一共要幾個盤子或袋子（平分＝n 個；每幾個一組＝q 個）
 *   tally(placed, count)     每個容器現在有幾顆
 *   remainders(n, upto)      0, 1, 2, … upto 各自除以 n 的餘數（0、1、…、n−1 一直循環）
 *   containerSlot(i, count)  第 i 個容器在桌上的位置 [x, z]（一排最多 10 個，置中）
 *   candySlot(j, cap)        容器裡第 j 顆糖的位置 [x, z]（以容器中心為原點）
 *   pileSlot(j, total)       桌上那一堆裡第 j 顆糖的位置 [x, z]
 */
export const MAX_TOTAL = 30;
export const MAX_N = 10;

export function divide(total, n) {
  if (!Number.isInteger(total) || total < 0) throw new RangeError('total must be a whole number');
  if (!Number.isInteger(n) || n < 1) throw new RangeError('cannot divide by zero (or by a non-whole number)');
  const q = Math.floor(total / n);
  return { q, r: total - n * q };
}

export function steps(total, n, mode = 'share') {
  const { q } = divide(total, n), out = [];
  for (let k = 0; k < n * q; k++) out.push({ k, to: mode === 'share' ? k % n : Math.floor(k / n) });
  return out;
}

export const containers = (total, n, mode = 'share') => (mode === 'share' ? n : divide(total, n).q);

export function tally(placed, count) {
  const out = Array(count).fill(0);
  placed.forEach((s) => { out[s.to]++; });
  return out;
}

export const remainders = (n, upto) => Array.from({ length: upto + 1 }, (_, t) => divide(t, n).r);

// ── 桌上的位置（單位：一顆糖的直徑約 1）────────────────────────────────────
export const PLATE_GAP = 4.4;      // 兩個容器中心的距離
export function containerSlot(i, count) {
  const per = Math.min(count, 10), rows = Math.ceil(count / per);
  const r = Math.floor(i / per), c = i % per;
  const inRow = r === rows - 1 ? count - per * (rows - 1) : per;
  return [(c - (inRow - 1) / 2) * PLATE_GAP, -(rows - 1 - r) * PLATE_GAP - 3.6];
}
export function candySlot(j, cap) {
  const cols = Math.max(1, Math.ceil(Math.sqrt(cap))), r = Math.floor(j / cols), c = j % cols;
  const rows = Math.ceil(cap / cols), s = Math.min(1.05, 3.1 / Math.max(cols, rows));
  return [(c - (cols - 1) / 2) * s, (r - (rows - 1) / 2) * s];
}
export function pileSlot(j, total) {
  const cols = 10, r = Math.floor(j / cols), c = j % cols, rows = Math.ceil(total / cols);
  return [(c - (Math.min(total, cols) - 1) / 2) * 1.12, 3.2 + (r - (rows - 1) / 2) * 1.12];
}
