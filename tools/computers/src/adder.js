/*
 * 電腦概論 · 第四課「加法器」的純函式（不碰 DOM、不碰 three.js；npm test）。位元陣列索引 0＝最右邊那一位。
 * 全部只用第三課的閘（AND、OR、XOR）來算，不用加號——測試再拿真正的加法來對答案。
 *
 *   halfAdder(a, b)          → { sum, carry }：和＝A XOR B，進位＝A AND B（兩個閘）
 *   fullAdder(a, b, cin)     → { sum, carry }：兩個半加器＋一個 OR（五個閘）
 *   addBits(aBits, bBits)    一位一位由右往左加：{ steps: [{ i, a, b, cin, sum, cout }], bits（多一位，最左邊是最後的進位）, value }
 *   columnText(step)         「1 + 1 + 1 = 11」這一位的算式（二進位寫法）
 *   carryRun(steps)          最長連續進位了幾位（骨牌傳了多遠）
 *   GATES_HALF / GATES_FULL  各用幾個閘（2、5）
 *   makeProblem(rng, width)  「自己當加法器」的一題：兩個數（至少有一次進位）
 */
import { AND, OR, XOR } from './logic.js';

export const GATES_HALF = 2, GATES_FULL = 5;

export const halfAdder = (a, b) => ({ sum: XOR(a, b), carry: AND(a, b) });

export function fullAdder(a, b, cin) {
  const h1 = halfAdder(a, b), h2 = halfAdder(h1.sum, cin);
  return { sum: h2.sum, carry: OR(h1.carry, h2.carry) };
}

export function addBits(aBits, bBits) {
  const n = Math.max(aBits.length, bBits.length), steps = [], bits = [];
  let c = 0;
  for (let i = 0; i < n; i++) {
    const a = aBits[i] ? 1 : 0, b = bBits[i] ? 1 : 0, r = fullAdder(a, b, c);
    steps.push({ i, a, b, cin: c, sum: r.sum, cout: r.carry });
    bits.push(r.sum); c = r.carry;
  }
  bits.push(c);
  return { steps, bits, value: bits.reduce((s, v, i) => s + (v ? 2 ** i : 0), 0), overflow: c === 1 };
}

export const columnText = (s, plus = ' + ') => `${s.a}${plus}${s.b}${plus}${s.cin} = ${s.cout}${s.sum}`;

export function carryRun(steps) {
  let best = 0, run = 0;
  for (const s of steps) { run = s.cout ? run + 1 : 0; best = Math.max(best, run); }
  return best;
}

export function makeProblem(rng, width = 4) {
  const max = 2 ** width;
  for (;;) {
    const a = 1 + Math.floor(rng() * (max - 1)), b = 1 + Math.floor(rng() * (max - 1));
    const toB = (n) => Array.from({ length: width }, (_, i) => Math.floor(n / 2 ** i) % 2);
    const r = addBits(toB(a), toB(b));
    if (r.steps.some((s) => s.cout)) return { a, b, aBits: toB(a), bBits: toB(b), ...r };
  }
}
