/*
 * 看得見的數學 · 方陣（排成幾排幾行的東西）的純函式（不碰 DOM、不碰 three.js；測試在 test/array.test.mjs）。
 *
 * 一個想法：**同一盤東西，一排一排數和一行一行數，數出來一樣多**，所以 3 × 4 ＝ 4 × 3。
 * 約定：rows＝橫排有幾排（由後到前），cols＝每一排有幾個（由左到右）。格子 (r, c)：r 是第幾排、c 是這一排的第幾個，都從 0 起算。
 *
 *   MAX                         滑桿的上限（10）
 *   total(rows, cols)           一共幾個
 *   cells(rows, cols)           每一格：{ r, c }（一排一排列出來）
 *   position(r, c, rows, cols, gap)   這一格在盤子上的位置 [x, z]（整盤置中；gap＝兩格之間的縫）
 *   extent(rows, cols, gap)     整盤多寬、多深 [w, d]
 *   turn(r, c, rows)            整盤順時針轉九十度以後，原來的 (r, c) 變成新的 (r', c')；新盤是 cols 排、每排 rows 個
 *   groups(rows, cols, by)      分組：by＝'rows' 一排一組、'cols' 一行一組；每組是格子的清單
 *   skipCount(rows, cols, by)   一組一組數下去的累計：3 排每排 4 個 → [4, 8, 12]
 *   sumText(rows, cols, by)     「4 + 4 + 4 = 12」
 *   tableValue(a, b)／mirror(a, b)   乘法表的一格與它在對角線另一邊的那一格
 *   factsToLearn(n)             n × n 的乘法表，知道可以交換以後還要記幾格（對角線＋一邊）
 *   pairsOf(n)                  一共幾對「換過來一樣」的格子
 *   mulberry32(seed)、makeTurnQuiz(rng)   「哪一盤是它轉過來的？」八題
 */
export const MAX = 10;

export const total = (rows, cols) => rows * cols;

export function cells(rows, cols) {
  const out = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push({ r, c });
  return out;
}

export const position = (r, c, rows, cols, gap = 0) => [(c - (cols - 1) / 2) * (1 + gap), (r - (rows - 1) / 2) * (1 + gap)];
export const extent = (rows, cols, gap = 0) => [cols + (cols - 1) * gap, rows + (rows - 1) * gap];

/** 從上面看順時針轉九十度：原來最左邊那一行變成最後面那一排。新盤有 cols 排、每排 rows 個。 */
export const turn = (r, c, rows) => ({ r: c, c: rows - 1 - r });

export function groups(rows, cols, by = 'rows') {
  if (by === 'rows') return Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => ({ r, c })));
  return Array.from({ length: cols }, (_, c) => Array.from({ length: rows }, (_, r) => ({ r, c })));
}

export function skipCount(rows, cols, by = 'rows') {
  let sum = 0;
  return groups(rows, cols, by).map((g) => (sum += g.length));
}

export function sumText(rows, cols, by = 'rows', plus = ' + ') {
  const [n, each] = by === 'rows' ? [rows, cols] : [cols, rows];
  return n === 1 ? `${each} = ${each}` : `${Array(n).fill(each).join(plus)} = ${n * each}`;
}

export const tableValue = (a, b) => a * b;
export const mirror = (a, b) => [b, a];
/** 對角線上有 n 格（自己乘自己），對角線以外有 n(n−1) 格、兩兩成對 */
export const pairsOf = (n) => (n * (n - 1)) / 2;
export const factsToLearn = (n) => n + pairsOf(n);

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

/** 八題的大小範圍：越後面盤子越大 */
export const TURN_RANGES = [[2, 4], [2, 5], [2, 5], [3, 6], [3, 7], [4, 8], [5, 9], [6, 9]];
const pick = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));

/**
 * 一題：給一盤 rows × cols（rows ≠ cols），四個選項裡只有一盤是它轉九十度的樣子（cols × rows）。
 * 其他三盤的總數都和題目不一樣，所以「一樣多」的只有正確答案。
 */
export function makeTurnQuestion(rng, [lo, hi]) {
  let rows, cols;
  do { rows = pick(rng, lo, hi); cols = pick(rng, lo, hi); } while (rows === cols);
  const answer = [cols, rows], n = rows * cols;
  const cands = [[cols, rows + 1], [cols, rows - 1], [cols + 1, rows], [cols - 1, rows], [rows, rows], [cols, cols], [cols + 1, rows - 1], [cols - 1, rows + 1]]
    .filter(([a, b]) => a >= 1 && b >= 1 && a <= MAX && b <= MAX && a * b !== n);
  // 洗牌以後取前三個不重複的
  for (let k = cands.length - 1; k > 0; k--) { const j = Math.floor(rng() * (k + 1)); [cands[k], cands[j]] = [cands[j], cands[k]]; }
  const options = [answer];
  for (const c of cands) if (options.length < 4 && !options.some((o) => o[0] === c[0] && o[1] === c[1])) options.push(c);
  for (let k = options.length - 1; k > 0; k--) { const j = Math.floor(rng() * (k + 1)); [options[k], options[j]] = [options[j], options[k]]; }
  return { rows, cols, total: n, options, correct: options.indexOf(answer) };
}

export const makeTurnQuiz = (rng) => TURN_RANGES.map((range) => makeTurnQuestion(rng, range));
