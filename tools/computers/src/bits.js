/*
 * 電腦概論 · 位元引擎的純函式（不碰 DOM、不碰 three.js；node 可以直接測：npm test）。
 *
 * 位元陣列 bits 一律「索引 0 = 最右邊那一位（1 的位）」，bits[i] 是 0 或 1；畫面上由右往左排。
 *
 *   placeValue(i)            第 i 位值多少（2 的 i 次方）
 *   toBits(n, width)         十進位 → 位元陣列（超過 width 位裝得下的就丟掉高位，像真的暫存器）
 *   fromBits(bits)           位元陣列 → 十進位
 *   maxValue(width)          width 個開關最多數到多少（2^width − 1）
 *   countStates(width)       width 個開關一共有幾種排法（2^width）
 *   terms(bits)              亮著的位值，由大到小（[8, 4, 1]）
 *   sumText(bits)            「8 + 4 + 1 = 13」（一盞也沒亮＝「0」）
 *   bitString(bits, group)   「0000 1101」
 *   rippleSteps(bits)        加一時，一位一位發生的事（進位像骨牌從右往左傳）
 *   increment(bits)          加一之後的位元陣列與有沒有溢位
 *   mulberry32(seed)         可重現的亂數（小測驗與雜訊示意用）
 *   makeRound(rng, width)    「猜猜這是多少」的一題：答案＋四個不重複的選項
 *   levelValues(levels)      把 0–1 平分成 levels 階，每一階的訊號大小
 *   margin(levels)           相鄰兩階中間的界線離每一階多遠（雜訊超過它就可能讀錯）
 *   readLevel(v, levels)     收到的訊號 v 最靠近哪一階
 *   countMisreads(...)       送 trials 次、每次加均勻雜訊，數讀錯幾次
 */

export const placeValue = (i) => 2 ** i;
export const maxValue = (width) => 2 ** width - 1;
export const countStates = (width) => 2 ** width;

export function toBits(n, width = 8) {
  const out = [];
  let v = Math.max(0, Math.floor(n));
  for (let i = 0; i < width; i++) { out.push(v % 2); v = Math.floor(v / 2); }
  return out;
}

export const fromBits = (bits) => bits.reduce((s, b, i) => s + (b ? placeValue(i) : 0), 0);

export function terms(bits) {
  const out = [];
  for (let i = bits.length - 1; i >= 0; i--) if (bits[i]) out.push(placeValue(i));
  return out;
}

export function sumText(bits, plus = ' + ') {
  const t = terms(bits);
  if (!t.length) return '0';
  if (t.length === 1) return String(t[0]);
  return `${t.join(plus)} = ${fromBits(bits)}`;
}

export function bitString(bits, group = 4) {
  const s = bits.slice().reverse().join('');
  if (!group) return s;
  const out = [];
  for (let end = s.length; end > 0; end -= group) out.unshift(s.slice(Math.max(0, end - group), end));
  return out.join(' ');
}

/**
 * 加一：從最右邊開始。這一位是 0 → 變 1，結束；是 1 → 變 0，往左進一位，再看下一位。
 * 回傳每一步 { i, to, carry }（carry＝這一步之後還要往左進位）；全部都是 1 時最後一步 carry 仍為 true（溢位）。
 */
export function rippleSteps(bits) {
  const steps = [];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i]) steps.push({ i, to: 0, carry: true });
    else { steps.push({ i, to: 1, carry: false }); break; }
  }
  return steps;
}

export function increment(bits) {
  const out = bits.slice();
  const steps = rippleSteps(bits);
  for (const s of steps) out[s.i] = s.to;
  return { bits: out, steps, overflow: steps.length > 0 && steps[steps.length - 1].carry };
}

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
 * 一題「猜猜這是多少」。干擾選項是常見的錯法：把左右讀反、只數亮了幾盞、把每一位都當成 1、差一位。
 * 不夠四個不重複的數時補上附近的數。回傳 { bits, answer, options（已洗牌）, correct（答案在 options 的位置） }。
 */
export function makeRound(rng, width = 8, opts = {}) {
  const max = maxValue(width);
  const min = opts.min ?? 1;
  const answer = opts.answer ?? (min + Math.floor(rng() * (max - min + 1)));
  const bits = toBits(answer, width);
  const reversed = fromBits(bits.slice().reverse());
  const lit = bits.reduce((s, b) => s + b, 0);
  const shifted = Math.min(max, answer * 2);
  const pool = [reversed, lit, shifted, Math.floor(answer / 2), answer + 1, answer - 1, answer + 2, answer - 2, answer + 4, answer - 4, answer + 8];
  const options = [answer];
  for (const v of pool) {
    if (options.length === 4) break;
    if (v >= 0 && v <= max && !options.includes(v)) options.push(v);
  }
  for (let v = 0; options.length < 4; v++) if (!options.includes(v)) options.push(v);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { bits, answer, options, correct: options.indexOf(answer) };
}

export const levelValues = (levels) => Array.from({ length: levels }, (_, k) => k / (levels - 1));
export const margin = (levels) => 1 / (2 * (levels - 1));

export function readLevel(v, levels) {
  return Math.min(levels - 1, Math.max(0, Math.round(v * (levels - 1))));
}

/** 每次隨機送一階，加上 ±noise 的均勻雜訊（noise 以滿刻度為 1），回傳樣本與讀錯的次數。 */
export function countMisreads(levels, noise, trials, rng) {
  const samples = [];
  let wrong = 0;
  for (let k = 0; k < trials; k++) {
    const sent = Math.floor(rng() * levels);
    const v = sent / (levels - 1) + (rng() * 2 - 1) * noise;
    const got = readLevel(v, levels);
    if (got !== sent) wrong++;
    samples.push({ sent, v, got, ok: got === sent });
  }
  return { samples, wrong, trials };
}
