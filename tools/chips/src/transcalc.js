/*
 * 晶片與半導體 · 第二課的計算（純函式，node 測試在 test/transistor.test.mjs）。
 *
 * 電晶體（N 通道 MOSFET）的示意模型：閘極電壓 vg 超過臨界電壓 VTH，通道裡才有電子；
 *   通道電荷 ∝ (vg − VTH)，電流用平方律 ∝ (vg − VTH)²（教科書的飽和區近似），都正規化到 0–1。
 *   VTH 0.4 V、VDD 1.0 V 是示意值（現代晶片的工作電壓在 1 伏特上下）。
 * 邏輯：兩個開關串聯＝AND（且）、並聯＝OR（或）；半加器 sum＝XOR、carry＝AND。
 * 數電晶體：一秒數一顆要多久（fmtDuration 給中英文）。
 */

export const VTH = 0.4;
export const VDD = 1.0;
export const YEAR = 365.25 * 86400;

export const channel = (vg) => Math.max(0, Math.min(1, (vg - VTH) / (VDD - VTH)));
export const current = (vg) => channel(vg) ** 2;
export const isOn = (vg) => current(vg) > 0.25;          // 讀成 1 的門檻（閘極約 0.7 V 以上）

// 兩個開關：串聯要兩個都通、並聯有一個通就好（輸入是 0/1）
export const series = (a, b) => (a && b ? 1 : 0);
export const parallel = (a, b) => (a || b ? 1 : 0);
export const AND = series;
export const OR = parallel;
export const XOR = (a, b) => (a !== b ? 1 : 0);
export const halfAdd = (a, b) => ({ sum: XOR(a, b), carry: AND(a, b) });
export function fullAdd(a, b, c) {
  const h1 = halfAdd(a, b), h2 = halfAdd(h1.sum, c);
  return { sum: h2.sum, carry: OR(h1.carry, h2.carry) };
}

/** 十進位 → 位元陣列（高位在前） */
export function toBits(n, bits = 4) {
  const out = [];
  for (let i = bits - 1; i >= 0; i--) out.push((n >> i) & 1);
  return out;
}
export const fromBits = (arr) => arr.reduce((s, b) => s * 2 + b, 0);

/** 用全加器一位一位加（低位開始），回傳和的位元（多一位）與每一位的進位 */
export function addBits(x, y, bits = 4) {
  const a = toBits(x, bits), b = toBits(y, bits);
  const sum = new Array(bits + 1).fill(0), carries = new Array(bits).fill(0);
  let c = 0;
  for (let i = bits - 1; i >= 0; i--) {
    const r = fullAdd(a[i], b[i], c);
    sum[i + 1] = r.sum; c = r.carry; carries[i] = c;
  }
  sum[0] = c;
  return { sum, carries, value: fromBits(sum) };
}

/** 數 n 顆電晶體要幾秒（每秒 perSecond 顆） */
export const countSeconds = (n, perSecond = 1) => n / perSecond;

/** 秒數 → 「602 years · 602 年」這種說法（兩位有效數字以上取整數） */
export function fmtDuration(sec) {
  const loc = (v) => v.toLocaleString('en-US');
  const r = (v) => (v >= 100 ? Math.round(v) : +v.toPrecision(2));
  const pl = (v, w) => `${loc(v)} ${w}${v === 1 ? '' : 's'}`;
  if (sec >= YEAR) { const y = r(sec / YEAR); return { en: pl(y, 'year'), zh: `${loc(y)} 年` }; }
  if (sec >= 86400) { const d = r(sec / 86400); return { en: pl(d, 'day'), zh: `${loc(d)} 天` }; }
  if (sec >= 3600) { const h = r(sec / 3600); return { en: pl(h, 'hour'), zh: `${loc(h)} 小時` }; }
  if (sec >= 60) { const m = r(sec / 60); return { en: pl(m, 'minute'), zh: `${loc(m)} 分鐘` }; }
  if (sec < 1) return { en: 'less than a second', zh: '不到 1 秒' };
  const s = r(sec); return { en: pl(s, 'second'), zh: `${loc(s)} 秒` };
}
