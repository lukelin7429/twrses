/*
 * 看得見的數學 · 分數的純函式（不碰 DOM、不碰 three.js；測試在 test/fraction.test.mjs）。
 *
 * 一個想法：**要先切成一樣大的塊，才能數在一起**。分母說的是「一條切成幾塊」，不是「有幾個東西」。
 * 分數一律寫成 [n, d]（分子、分母），d ≥ 1。
 *
 *   DENOMS                  模型可以選的分母（2、3、4、5、6、8、10、12；最大公分母 60，條子還切得下）
 *   gcd(a, b)／lcm(a, b)
 *   reduce(f)               約分到最簡
 *   expand(f, k)            擴分：分子分母同乘 k
 *   toDenominator(f, D)     改寫成分母 D（D 必須是 d 的倍數）
 *   lcd(f, g)               最小公分母
 *   add(f, g)               正確的加法（已約分）
 *   addBottoms(f, g)        「分子加分子、分母加分母」的錯誤答案
 *   compare(f, g)           −1／0／1
 *   equal(f, g)             等值
 *   toMixed(f)              假分數 → { whole, n, d }
 *   cutsAlign(d1, d2, k)    兩條各切 d1、d2 塊的條子，再一起切成 k 塊：原來的每一道切線都落在新的切線上嗎？（k 是兩者的公倍數）
 *   mulberry32、makeCompareQuiz(rng)   「哪一個比較大？」八題
 */
export const DENOMS = [2, 3, 4, 5, 6, 8, 10, 12];

export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }
export const lcm = (a, b) => (a / gcd(a, b)) * b;

function check(f) {
  if (!Array.isArray(f) || !Number.isInteger(f[0]) || !Number.isInteger(f[1]) || f[1] < 1 || f[0] < 0) throw new RangeError('a fraction is [n, d] with whole n ≥ 0 and d ≥ 1');
}
export function reduce(f) { check(f); const g = gcd(f[0], f[1]) || 1; return [f[0] / g, f[1] / g]; }
export const expand = (f, k) => { check(f); return [f[0] * k, f[1] * k]; };
export function toDenominator(f, D) {
  check(f);
  if (D % f[1]) throw new RangeError(`${D} is not a multiple of ${f[1]}`);
  return expand(f, D / f[1]);
}
export const lcd = (f, g) => lcm(f[1], g[1]);
export function add(f, g) { const D = lcd(f, g); return reduce([toDenominator(f, D)[0] + toDenominator(g, D)[0], D]); }
export const addBottoms = (f, g) => [f[0] + g[0], f[1] + g[1]];
export function compare(f, g) { check(f); check(g); const a = f[0] * g[1], b = g[0] * f[1]; return a < b ? -1 : a > b ? 1 : 0; }
export const equal = (f, g) => compare(f, g) === 0;
export const value = (f) => f[0] / f[1];
export function toMixed(f) { check(f); return { whole: Math.floor(f[0] / f[1]), n: f[0] % f[1], d: f[1] }; }
export const cutsAlign = (d1, d2, k) => k % d1 === 0 && k % d2 === 0;

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 八題的樣式：同分母兩題、同分子兩題（分母大的反而小）、一題等值、三題分子分母都不一樣。
 * 每題 { left, right, answer: 'left'|'right'|'equal', kind }；分母都在 DENOMS 裡，分數都在 0 和 1 之間（不含 0）。
 */
export const COMPARE_KINDS = ['same-d', 'same-d', 'same-n', 'same-n', 'equal', 'mixed', 'mixed', 'mixed'];
const pick = (rng, list) => list[Math.floor(rng() * list.length)];
const proper = (rng, d) => [1 + Math.floor(rng() * (d - 1)), d];

export function makeCompareQuestion(rng, kind) {
  let left, right;
  for (let guard = 0; guard < 500; guard++) {
    if (kind === 'same-d') { const d = pick(rng, DENOMS.filter((x) => x >= 3)); left = proper(rng, d); right = proper(rng, d); }
    else if (kind === 'same-n') { const d1 = pick(rng, DENOMS), d2 = pick(rng, DENOMS), n = 1 + Math.floor(rng() * (Math.min(d1, d2) - 1)); left = [n, d1]; right = [n, d2]; }
    else if (kind === 'equal') { const base = reduce(proper(rng, pick(rng, [2, 3, 4, 5]))); const ks = [2, 3, 4, 5, 6].filter((k) => DENOMS.includes(base[1] * k)); if (!ks.length) continue; left = base; right = expand(base, pick(rng, ks)); if (rng() < 0.5) [left, right] = [right, left]; }
    else { left = proper(rng, pick(rng, DENOMS)); right = proper(rng, pick(rng, DENOMS)); if (left[1] === right[1] || left[0] === right[0]) continue; }
    const c = compare(left, right);
    if (kind === 'equal' ? c === 0 : c !== 0) break;
  }
  const c = compare(left, right);
  return { left, right, kind, answer: c > 0 ? 'left' : c < 0 ? 'right' : 'equal' };
}
export const makeCompareQuiz = (rng) => COMPARE_KINDS.map((k) => makeCompareQuestion(rng, k));
