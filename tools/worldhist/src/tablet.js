/*
 * 世界歷史 第三課〈人為什麼發明文字？〉的純函式（node test/tablet.test.mjs）：在泥板上寫數字。
 *
 * 兩種寫法（都是示意；排列方式各時代、各書吏不完全一樣）：
 *   'wedge'  楔形文字的數字：直立的楔子＝1，斜角的「角楔」＝10；滿 60 進位，寫到下一位（位值）。
 *            1–9 每排最多 3 個；10–50 的角楔每排最多 3 個。
 *   'round'  更早的原始楔形文字：用圓頭的筆壓出記號，小的斜壓痕＝1，圓形壓痕＝10；
 *            記 60 用另一個比較大的斜壓痕（這裡只示意到 60 以上用一個大記號）。
 *
 *   groups(n)            → { sixties, tens, ones }
 *   marks(n, style)      → [{ kind: 'one'|'ten'|'sixty', x, y }]（泥板上的位置，單位約等於一個記號的寬度；由右往左、由上往下排）
 *   bounds(marks)        → { w, h }
 *   pressOrder(marks)    → 書吏壓下去的先後（大的單位先寫，從左到右）
 */
export const MAX = 119;

export function groups(n) {
  if (!Number.isInteger(n) || n < 1 || n > MAX) throw new RangeError(`n must be 1–${MAX}`);
  return { sixties: Math.floor(n / 60), tens: Math.floor((n % 60) / 10), ones: n % 10 };
}

// 一組同樣的記號排成幾排：每排最多 per 個，排與排之間對齊左邊
function block(kind, count, per, x0, w, h) {
  const out = [];
  for (let i = 0; i < count; i++) out.push({ kind, x: x0 + (i % per) * w, y: Math.floor(i / per) * h });
  return out;
}

export function marks(n, style = 'wedge') {
  const g = groups(n), out = [];
  let x = 0;
  const gap = 0.45;
  if (style === 'wedge') {
    // 位值：60 的那一位寫在左邊，用直立的楔子；中間空一格
    if (g.sixties) { out.push(...block('sixty', g.sixties, 3, x, 0.62, 1.15)); x += Math.min(g.sixties, 3) * 0.62 + gap * 1.6; }
    if (g.tens) { out.push(...block('ten', g.tens, 3, x, 0.78, 0.9)); x += Math.min(g.tens, 3) * 0.78 + gap; }
    if (g.ones) out.push(...block('one', g.ones, 3, x, 0.62, 1.15));
  } else if (style === 'round') {
    if (g.sixties) { out.push(...block('sixty', g.sixties, 3, x, 1.05, 1.1)); x += Math.min(g.sixties, 3) * 1.05 + gap; }
    if (g.tens) { out.push(...block('ten', g.tens, 3, x, 0.95, 1.0)); x += Math.min(g.tens, 3) * 0.95 + gap; }
    if (g.ones) out.push(...block('one', g.ones, 3, x, 0.62, 1.0));
  } else throw new RangeError(`Unknown style: ${style}`);
  return out;
}

export function bounds(ms) {
  let w = 0, h = 0;
  for (const m of ms) { w = Math.max(w, m.x + (m.kind === 'one' ? 0.62 : m.kind === 'ten' ? 0.78 : 0.9)); h = Math.max(h, m.y + 1); }
  return { w, h };
}

/** 書吏的筆順：大的單位先（60 → 10 → 1），同一組裡由上往下、由左往右。 */
export function pressOrder(ms) {
  const rank = { sixty: 0, ten: 1, one: 2 };
  return ms.map((m, i) => ({ m, i })).sort((a, b) => rank[a.m.kind] - rank[b.m.kind] || a.m.y - b.m.y || a.m.x - b.m.x).map((o) => o.m);
}

/** 讀回來：數一數各種記號，算出是多少（給測試與「讀讀看」用）。 */
export function read(ms) {
  return ms.reduce((s, m) => s + (m.kind === 'sixty' ? 60 : m.kind === 'ten' ? 10 : 1), 0);
}
