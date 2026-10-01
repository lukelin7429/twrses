/*
 * 萬物原理 · 第八課「電腦怎麼記住東西？」的位元計算（純函式，test/memory.test.mjs 會跑）。
 *
 * 文字 → 位元組：UTF-8（英文字母 1 個位元組＝ASCII；大部分中文字 3 個；emoji 4 個）。
 * 一個位元組＝8 個位元，位值由左到右 128 64 32 16 8 4 2 1。
 * DRAM（示意）：每格是一個小電容，電荷會慢慢漏掉（指數衰減）；讀的時候電荷過一半算 1。
 *   真實的 DRAM 通常每 64 毫秒刷新一次（重新充飽還是 1 的格子），模型裡放慢很多。
 * 快閃記憶體：電子關在四周都是絕緣層的「浮閘」裡，沒有電也不會漏（模型裡不衰減）。
 */
export const PLACE = [128, 64, 32, 16, 8, 4, 2, 1];
export const THRESHOLD = 0.5;
export const REAL_REFRESH_MS = 64;

const enc = new TextEncoder();
const dec = new TextDecoder('utf-8');

// 文字 → 位元組；超過 maxBytes 時在字與字之間截斷，不會切斷一個中文字
export function encode(text, maxBytes = Infinity) {
  const out = [];
  for (const ch of String(text)) {
    const b = enc.encode(ch);
    if (out.length + b.length > maxBytes) break;
    out.push(...b);
  }
  return out;
}
export const decode = (bytes) => dec.decode(new Uint8Array(bytes));

export const toBits = (byte) => PLACE.map((p) => ((byte & p) ? 1 : 0));
export const fromBits = (bits) => bits.reduce((s, b, i) => s + (b ? PLACE[i] : 0), 0);

// 每個字各占幾個位元組（給畫面上的表格用）
export function charSpans(text, maxBytes = Infinity) {
  const spans = [];
  let at = 0;
  for (const ch of String(text)) {
    const n = enc.encode(ch).length;
    if (at + n > maxBytes) break;
    spans.push({ ch, start: at, n });
    at += n;
  }
  return spans;
}

// 電荷衰減：t 秒後剩多少；tau = Infinity 就是快閃記憶體（不漏）
export const leak = (q, t, tau) => (Number.isFinite(tau) ? q * Math.exp(-t / tau) : q);
export const readBit = (q) => (q >= THRESHOLD ? 1 : 0);
// 從 1（滿電）漏到門檻以下要多久
export const timeToForget = (tau) => tau * Math.LN2;

// 照片：像素 × 每像素位元（紅綠藍各 8 位元＝24）
export const photoBits = (pixels, bitsPerPixel = 24) => pixels * bitsPerPixel;
export const bitsToMB = (bits) => bits / 8 / 1e6;
