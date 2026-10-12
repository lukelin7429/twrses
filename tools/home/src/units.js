/*
 * 家政 Life Skills at Home · 單位換算與分數（純函式，不碰 DOM；test/units.test.mjs）。
 * 每一堂廚房課共用：量杯量匙 ↔ 毫升、盎司與磅 ↔ 公克、華氏 ↔ 攝氏、食譜放大縮小。
 *
 * 定義（出處寫在 data/home.json 第一課的 sources）：
 *   美制 1 gallon = 231 立方英寸、1 inch = 2.54 cm（都是定義值）→ 1 gallon = 3785.411784 mL
 *   1 cup = 1/16 gallon = 236.5882365 mL；1 fl oz = 1/8 cup；1 tbsp = 1/2 fl oz；1 tsp = 1/3 tbsp
 *   1 pound = 453.59237 g（定義值）；1 ounce = 1/16 pound
 *   美國營養標示（21 CFR 101.9(b)(5)(viii)）另用整數：1 cup = 240 mL、1 tbsp = 15 mL、1 tsp = 5 mL、1 fl oz = 30 mL
 */
export const ML_PER_GALLON = 231 * 2.54 * 2.54 * 2.54;          // 3785.411784
export const ML = Object.freeze({
  cup: ML_PER_GALLON / 16,                                       // 236.5882365
  floz: ML_PER_GALLON / 128,                                     // 29.5735295625
  tbsp: ML_PER_GALLON / 256,                                     // 14.78676478125
  tsp: ML_PER_GALLON / 768,                                      // 4.92892159375
});
export const LABEL_ML = Object.freeze({ cup: 240, floz: 30, tbsp: 15, tsp: 5 });
export const G = Object.freeze({ lb: 453.59237, oz: 453.59237 / 16 });   // 28.349523125
/** 一杯裡有幾個小單位（整數關係，用來做分數換算） */
export const TSP_PER = Object.freeze({ tsp: 1, tbsp: 3, floz: 6, cup: 48 });

export const toMl = (n, unit, table = ML) => n * need(table, unit);
export const fromMl = (ml, unit, table = ML) => ml / need(table, unit);
export const toGrams = (n, unit) => n * need(G, unit);
export const fromGrams = (g, unit) => g / need(G, unit);
export const fToC = (f) => (f - 32) * 5 / 9;
export const cToF = (c) => c * 9 / 5 + 32;
/** 體積 → 重量：要知道「這種東西一杯大約幾公克」 */
export const cupsToGrams = (cups, gramsPerCup) => cups * gramsPerCup;
export const round = (x, step = 1) => Math.round(x / step) * step;

function need(table, unit) {
  if (!(unit in table)) throw new Error(`unknown unit: ${unit}`);
  return table[unit];
}

// ── 分數 ────────────────────────────────────────────────────────────────
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
/** 約分過的分數 { n, d }，d 永遠是正的 */
export function frac(n, d = 1) {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}
export const fmul = (a, b) => frac(a.n * b.n, a.d * b.d);
export const fadd = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const fnum = (a) => a.n / a.d;
export const feq = (a, b) => a.n * b.d === b.n * a.d;

/** "1 1/2"、"3/4"、"2"、"½"、"1½" → 分數 */
const GLYPH = { '½': '1/2', '⅓': '1/3', '⅔': '2/3', '¼': '1/4', '¾': '3/4', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8', '⅞': '7/8' };
export function parseAmount(s) {
  const t = String(s).trim().replace(/[½⅓⅔¼¾⅛⅜⅝⅞]/g, (g) => ` ${GLYPH[g]}`).trim().replace(/\s+/g, ' ');
  let m = t.match(/^(\d+) (\d+)\/(\d+)$/);
  if (m) return fadd(frac(Number(m[1])), frac(Number(m[2]), Number(m[3])));
  m = t.match(/^(\d+)\/(\d+)$/);
  if (m) return frac(Number(m[1]), Number(m[2]));
  m = t.match(/^\d+$/);
  if (m) return frac(Number(t));
  throw new Error(`cannot read amount: ${s}`);
}

/** 分數 → 帶分數字串："1 1/2"、"3/4"、"2" */
export function formatMixed(a) {
  const whole = Math.floor(a.n / a.d), rest = a.n - whole * a.d;
  if (!rest) return String(whole);
  return whole ? `${whole} ${rest}/${a.d}` : `${rest}/${a.d}`;
}

/** 份量 × 倍數（倍數可以是分數或整數） */
export const scaleAmount = (a, factor) => fmul(a, typeof factor === 'number' ? frac(factor) : factor);

// ── 換成廚房裡量得出來的寫法 ─────────────────────────────────────────────
// 一組常見的美式量杯是 1、1/2、1/3、1/4 杯；量匙是 1 湯匙、1、1/2、1/4 茶匙（有的還有 1/8）。
const CUP_OK = [1, 2, 3, 4];           // 杯的分母
const TBSP_OK = [1, 2];                // 湯匙的分母
const TSP_OK = [1, 2, 4, 8];           // 茶匙的分母
const MIN_CUP_TSP = 12;                // 1/4 杯以上才用「杯」
export const UNIT_NAME = { cup: ['cup', 'cups'], tbsp: ['tbsp', 'tbsp'], tsp: ['tsp', 'tsp'], floz: ['fl oz', 'fl oz'] };

/**
 * 把一個體積（分數＋單位）改寫成量得出來的樣子。
 * 回傳 [{ amount, unit }, …]：通常一項（"1/4 cup"），量不出來時拆成兩項（"2 tbsp" ＋ "2 tsp"）。
 */
export function kitchenParts(amount, unit) {
  const t = fmul(amount, frac(TSP_PER[unit]));                   // 全部換成茶匙
  if (t.n === 0) return [{ amount: frac(0), unit }];
  const cups = fmul(t, frac(1, 48)), tbsp = fmul(t, frac(1, 3));
  if (fnum(t) >= MIN_CUP_TSP && CUP_OK.includes(cups.d)) return [{ amount: cups, unit: 'cup' }];
  if (fnum(t) >= 3 && TBSP_OK.includes(tbsp.d)) return [{ amount: tbsp, unit: 'tbsp' }];
  if (fnum(t) < 3 && TSP_OK.includes(t.d)) return [{ amount: t, unit: 'tsp' }];
  if (!TSP_OK.includes(t.d)) return [{ amount, unit }];           // 連茶匙都量不出來：照原單位寫
  const whole = Math.floor(fnum(t) / 3);                         // 幾個整湯匙，剩下的用茶匙
  const rest = fadd(t, frac(-whole * 3));
  const out = [];
  if (whole) out.push({ amount: frac(whole), unit: 'tbsp' });
  if (rest.n) out.push({ amount: rest, unit: 'tsp' });
  return out;
}

export function formatAmount(amount, unit) {
  const names = UNIT_NAME[unit] || [unit, unit];
  return `${formatMixed(amount)} ${fnum(amount) > 1 ? names[1] : names[0]}`;
}
export const formatParts = (parts) => parts.map((p) => formatAmount(p.amount, p.unit)).join(' + ');

// ── 食譜上的數字怎麼唸 ───────────────────────────────────────────────────
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const PART = { 2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['quarter', 'quarters'], 8: ['eighth', 'eighths'] };
const LONG = { cup: ['cup', 'cups'], tbsp: ['tablespoon', 'tablespoons'], tsp: ['teaspoon', 'teaspoons'], floz: ['fluid ounce', 'fluid ounces'] };
const word = (n) => (n < ONES.length ? ONES[n] : String(n));
const art = (d) => (d === 8 ? 'an' : 'a');

/** 1/2 cup → "half a cup"；1 1/2 cups → "one and a half cups"；3/4 tsp → "three quarters of a teaspoon" */
export function sayAmount(amount, unit) {
  const [one, many] = LONG[unit] || [unit, `${unit}s`];
  const whole = Math.floor(amount.n / amount.d), rest = amount.n - whole * amount.d, d = amount.d;
  if (!rest) return `${word(whole)} ${whole === 1 ? one : many}`;
  if (!PART[d]) return `${formatMixed(amount)} ${many}`;
  if (whole) {
    const tail = rest === 1 ? `${art(d)} ${PART[d][0]}` : `${word(rest)} ${PART[d][1]}`;
    return `${word(whole)} and ${tail} ${many}`;
  }
  if (rest === 1) return d === 2 ? `half a ${one}` : `${art(d)} ${PART[d][0]} of a ${one}`;
  return `${word(rest)} ${PART[d][1]} of a ${one}`;
}
