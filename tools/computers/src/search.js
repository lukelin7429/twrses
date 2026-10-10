/*
 * 電腦概論 · 第十課「演算法是什麼？」的純函式（不碰 DOM、不碰 three.js；test/search.test.mjs）。
 *
 * 同一個問題（在一排蓋住的箱子裡找一個數），兩種做法：
 *   linear(values, target)  一個一個打開（循序搜尋）：最多要開 n 個
 *   binary(values, target)  每次打開中間那個、丟掉一半（二元搜尋）：最多開 ⌊log2 n⌋ + 1 個，**但箱子要先由小到大排好**
 * 兩個函式都回傳每一步看了哪一格；binary 用在沒排好的箱子上會找不到（頁面拿這個來示範「為什麼要先排好」）。
 * 頁面上出現的每一個步數都由測試核對，不要心算。
 */
import { mulberry32 } from './bits.js';

// 由小到大、每個都不一樣的 n 個數（固定的，重開頁面都一樣）
export const makeValues = (n) => Array.from({ length: n }, (_, i) => 3 + i * 3 + ((i * 7) % 3));

export function linear(values, target) {
  const steps = [];
  for (let i = 0; i < values.length; i++) { const found = values[i] === target; steps.push({ i, v: values[i], found }); if (found) return { steps, found: i }; }
  return { steps, found: -1 };
}
export function binary(values, target) {
  const steps = []; let lo = 0, hi = values.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2), v = values[mid];
    if (v === target) { steps.push({ lo, hi, i: mid, v, cmp: 'found', found: true }); return { steps, found: mid }; }
    if (v < target) { steps.push({ lo, hi, i: mid, v, cmp: 'small', found: false, drop: [lo, mid] }); lo = mid + 1; }
    else { steps.push({ lo, hi, i: mid, v, cmp: 'big', found: false, drop: [mid, hi] }); hi = mid - 1; }
  }
  return { steps, found: -1 };
}
export const worstLinear = (n) => n;
export function worstBinary(n) { let k = 0; while (n > 0) { n = Math.floor(n / 2); k++; } return k; }   // ⌊log2 n⌋ + 1，用整數算

// 把箱子弄亂（固定的種子，重開頁面都一樣）
export function shuffle(values, seed = 7) {
  const a = [...values], rng = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// 猜數字：每次猜中間，猜到 secret 要幾次；1 到 hi 最多要幾次
export function halvingGuesses(secret, lo = 1, hi = 100) {
  let k = 0;
  while (lo <= hi) { const g = Math.floor((lo + hi) / 2); k++; if (g === secret) return k; if (g < secret) lo = g + 1; else hi = g - 1; }
  return -1;
}
export const SIZES = [10, 100, 1000, 10000, 100000, 1000000];
