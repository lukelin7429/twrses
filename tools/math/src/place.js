/*
 * 看得見的數學 · 位值積木引擎的純函式（不碰 DOM、不碰 three.js；測試在 test/place.test.mjs）。
 *
 * 一個規則：**滿 base 個就換成一個大的**。base 是 10、5、2 都一樣。
 * 各位數的陣列一律「索引 0＝最右邊那一位（個位）」。
 *
 *   placeValue(i, base)            第 i 位代表多少（base 的 i 次方）
 *   toDigits(n, base, width)       一個數拆成各位數（高位裝不下就丟掉，和電腦概論的 toBits 一樣）
 *   fromDigits(digits, base)       各位數加回去
 *   maxValue(width, base)          width 位最多能寫到多少
 *   digitsNeeded(n, base)          寫這個數最少要幾位
 *   numeral(digits)                寫出來的樣子（'305'、'1101'）
 *   terms(n, base, width)          每一位：{ i, digit, place, value }（由高位到低位，包含 0）
 *   carrySteps(digits, base)       加一的過程：一位一位，滿了就歸零並進位
 *   increment(digits, base)        加一之後的各位數與是否溢位
 *   pieceDims(i, base)             第 i 位那一種積木的大小 [x, y, z]（以小方塊為 1）
 *   slots(i, base, top)            第 i 位那一格裡，第 k 個積木放在哪裡（多一個位子給「剛滿」的那一個）
 *   fusedBox(i, base)              滿了併起來以後的那一塊（大小等於下一位的積木）
 *   columns(base, width)           每一格在桌上的位置與大小
 *   groupThousands(n)              美式千分位：12345 → '12,345'
 *   groupMyriads(n)                中文四位一節：123456789 → '1,2345,6789'（只用來示意）
 *   mulberry32(seed)               可重現的亂數
 *   makePileQuiz(rng)              「這堆積木是多少？」八題（後面幾題有 0）
 *   regroupings(n, base)           從 0 一路加一到 n，各位一共進位幾次
 */

export const BASES = [10, 5, 2];
/** 模型裡每一種進位制用幾位：十進位 4 位（0–9,999）、五進位 4 位（0–624）、二進位 8 位（0–255） */
export const WIDTHS = { 10: 4, 5: 4, 2: 8 };

export const placeValue = (i, base = 10) => base ** i;

export function toDigits(n, base = 10, width) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('n must be a whole number');
  const out = [];
  let v = n;
  const w = width ?? digitsNeeded(n, base);
  for (let i = 0; i < w; i++) { out.push(v % base); v = Math.floor(v / base); }
  return out;
}

export const fromDigits = (digits, base = 10) => digits.reduce((s, d, i) => s + d * placeValue(i, base), 0);

export const maxValue = (width, base = 10) => placeValue(width, base) - 1;

export function digitsNeeded(n, base = 10) {
  let w = 1;
  while (placeValue(w, base) <= n) w++;
  return w;
}

/** 寫出來的樣子：最高位在最左邊。trim＝去掉前面多餘的 0（至少留一位） */
export function numeral(digits, trim = true) {
  const s = digits.slice().reverse().join('');
  return trim ? s.replace(/^0+(?=\d)/, '') : s;
}

export function terms(n, base = 10, width) {
  const d = toDigits(n, base, width);
  return d.map((digit, i) => ({ i, digit, place: placeValue(i, base), value: digit * placeValue(i, base) })).reverse();
}

/** 「300 + 0 + 5」：每一位的值（包含 0，讓人看見 0 在佔位子） */
export const expandedText = (n, base = 10, plus = ' + ') => terms(n, base).map((t) => groupThousands(t.value)).join(plus);

/**
 * 加一的過程。每一步 { i, from, to, carry }：第 i 位從 from 變成 to；carry＝這一位滿了、歸零、往左進位。
 * 最後一步如果還是 carry，表示最高位也滿了（溢位）。
 */
export function carrySteps(digits, base = 10) {
  const steps = [];
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] < base - 1) { steps.push({ i, from: digits[i], to: digits[i] + 1, carry: false }); return steps; }
    steps.push({ i, from: digits[i], to: 0, carry: true });
  }
  return steps;
}

export function increment(digits, base = 10) {
  const out = digits.slice();
  const steps = carrySteps(digits, base);
  steps.forEach((s) => { out[s.i] = s.to; });
  return { digits: out, steps, overflow: steps[steps.length - 1].carry };
}

/** 從 0 一路加一到 n：第 i 位滿了併成大的，一共發生幾次（＝ n 除以 base^(i+1) 的商） */
export const regroupings = (n, base = 10, width = digitsNeeded(n, base)) =>
  Array.from({ length: width }, (_, i) => Math.floor(n / placeValue(i + 1, base)));

// ── 積木的形狀與位置（以小方塊的邊長為 1；x 往右、y 往上、z 往鏡頭）──────────────
/**
 * 第 i 位的積木大小 [x, y, z]。小方塊 1×1×1 → 長條（沿 z）→ 平板（x、z）→ 大方塊 → 再沿 z 接起來……
 * 體積永遠是 base 的 i 次方：一個積木就是它代表的那麼多個小方塊。
 */
export function pieceDims(i, base = 10) {
  return [base ** Math.floor((i + 1) / 3), base ** Math.floor(i / 3), base ** Math.floor((i + 2) / 3)];
}

/** 第 i 位的積木沿哪一個軸排開、併起來：0＝x、1＝y、2＝z */
export const stackAxis = (i) => [2, 0, 1][i % 3];

export const GAP = 0.34;        // 同一格裡兩個積木之間的縫（佔該方向積木厚度的比例，至少 0.34 個小方塊）
const gapFor = (thick) => Math.max(GAP, thick * 0.16);

/**
 * 第 i 位那一格的位子：回傳 base 個（第 base 個是「剛滿、還沒併」時用的），每個是積木中心相對於這一格
 * 原點（格子的左後下角）的位置。最高位（top）不會再併，改排成方陣，比較不佔地方。
 */
export function slots(i, base = 10, top = false) {
  const [sx, sy, sz] = pieceDims(i, base);
  const out = [];
  if (top) {
    const n = base - 1, cols = Math.ceil(Math.sqrt(n)), g = gapFor(sx);
    for (let k = 0; k < n; k++) {
      const c = k % cols, r = Math.floor(k / cols);
      out.push([sx / 2 + c * (sx + g), sy / 2, sz / 2 + r * (sz + g)]);
    }
    return out;
  }
  const ax = stackAxis(i), size = [sx, sy, sz], g = gapFor(size[ax]);
  for (let k = 0; k < base; k++) {
    const p = [sx / 2, sy / 2, sz / 2];
    p[ax] += k * (size[ax] + g);
    out.push(p);
  }
  return out;
}

/** 滿了以後縫合起來的樣子：base 個積木緊緊靠在一起，第 k 個的中心（相對於格子原點） */
export function fusedSlots(i, base = 10) {
  const size = pieceDims(i, base), ax = stackAxis(i);
  return Array.from({ length: base }, (_, k) => {
    const p = [size[0] / 2, size[1] / 2, size[2] / 2];
    p[ax] += k * size[ax];
    return p;
  });
}

/** 併起來的那一塊：{ size, center }。大小一定等於下一位的積木。 */
export function fusedBox(i, base = 10) {
  const size = pieceDims(i, base).slice(), ax = stackAxis(i);
  size[ax] *= base;
  return { size, center: size.map((s) => s / 2) };
}

/** 一格佔多大（放滿 base 個、或最高位放滿 base−1 個時的外框） */
export function columnSize(i, base = 10, top = false) {
  const d = pieceDims(i, base), ss = slots(i, base, top);
  return [0, 1, 2].map((a) => Math.max(...ss.map((p) => p[a] + d[a] / 2)));
}

/**
 * 每一格在桌上的位置：個位在最右邊，往左是比較大的位。回傳 [{ i, x0, z0, size:[w,h,d], top }]，
 * x0、z0 是格子左後角；整排以 x＝0 置中，前緣（靠鏡頭那一邊）對齊在 z＝0。
 */
export function columns(base = 10, width = WIDTHS[base]) {
  const cols = [];
  let x = 0;
  for (let i = 0; i < width; i++) {
    const top = i === width - 1;
    const size = columnSize(i, base, top);
    const pad = Math.max(1.2, size[0] * 0.14);
    x -= size[0];
    cols.push({ i, x0: x, z0: -size[2], size, top, pad });
    x -= pad * 2;
  }
  const total = -(x + cols[cols.length - 1].pad * 2);
  cols.forEach((c) => { c.x0 += total / 2; });
  return cols;
}

// ── 寫法 ──────────────────────────────────────────────────────────────────
/** 美式寫法：每三位一個逗號 */
export const groupThousands = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/** 照中文的唸法每四位切一刀（萬、億）——只是示意，平常不這樣寫 */
export const groupMyriads = (n) => String(n).replace(/\B(?=(\d{4})+(?!\d))/g, ',');

// ── 小遊戲 ────────────────────────────────────────────────────────────────
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
 * 「這堆積木是多少？」的八題。前三題每一位都有積木；後五題故意讓某一位是 0。
 * 樣式（由高位到低位；d＝1–9 的數字、0＝這一位沒有積木）。千位最多 3，圖才畫得下。
 */
export const PILE_PATTERNS = ['dd', 'ddd', 'ddd', 'd0d', 'dd0', 'd0dd', 'dd0d', 'd00d'];

const pick = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));

export function makePileQuestion(rng, pattern) {
  const w = pattern.length;
  // 由高位到低位各選一個數字；相鄰兩位不重複，選項才分得出「位置弄反」
  const hi = [];
  for (let k = 0; k < w; k++) {
    if (pattern[k] === '0') { hi.push(0); continue; }
    const max = w === 4 && k === 0 ? 3 : 9;
    let d;
    do { d = pick(rng, 1, max); } while (hi.includes(d));
    hi.push(d);
  }
  const digits = hi.slice().reverse();
  const answer = fromDigits(digits, 10);
  const nz = hi.filter((d) => d !== 0);
  const cands = [];
  const zeros = hi.includes(0);
  if (zeros) {
    cands.push(Number(nz.join('')));                                   // 把 0 丟掉：305 → 35
    const moved = hi.slice();                                           // 0 放錯位子：305 → 350
    const z = moved.indexOf(0);
    const swap = z + 1 < w ? z + 1 : z - 1;
    [moved[z], moved[swap]] = [moved[swap], moved[z]];
    if (moved[0] !== 0) cands.push(Number(moved.join('')));
    cands.push(Number(nz.join('')) * 10 ** (w - nz.length + 1));        // 多一個 0：305 → 3500
  } else {
    cands.push(Number(hi.slice().reverse().join('')));                 // 左右讀反：243 → 342
    const sw = hi.slice(); [sw[w - 1], sw[w - 2]] = [sw[w - 2], sw[w - 1]];
    cands.push(Number(sw.join('')));                                    // 最後兩位對調：243 → 234
    cands.push(nz.reduce((s, d) => s + d, 0));                          // 只數有幾個積木：243 → 9
  }
  cands.push(answer + 10, answer + 1, answer + 100, Math.max(1, answer - 10));
  const options = [answer];
  for (const c of cands) { if (options.length < 4 && c > 0 && !options.includes(c)) options.push(c); }
  // 洗牌（Fisher–Yates）
  for (let k = options.length - 1; k > 0; k--) { const j = Math.floor(rng() * (k + 1)); [options[k], options[j]] = [options[j], options[k]]; }
  return { answer, digits, options, correct: options.indexOf(answer), zeros: digits.map((d, i) => (d === 0 ? i : -1)).filter((i) => i >= 0) };
}

export const makePileQuiz = (rng) => PILE_PATTERNS.map((p) => makePileQuestion(rng, p));

/**
 * 「同一個數，三種寫法」：n 個東西照 base 個一數，由大到小分成幾堆。
 * 回傳 [{ size, count }]（包含 count 0 的位），最大那一位在最前面。
 */
export const groupsOf = (n, base) => terms(n, base).map((t) => ({ size: t.place, count: t.digit }));
