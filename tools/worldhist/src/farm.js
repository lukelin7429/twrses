/*
 * 世界歷史 第二課〈人為什麼開始種田？〉的純函式（node test/farm.test.mjs）。
 *
 * 模型是一個「通用的示意」：同一條河的兩岸，一邊是採集狩獵的一群人，一邊是早期的農村，過同一年。
 * 不是任何真實遺址，季節也是通用的溫帶四季（春播、夏長、秋收、冬藏）；頁面上有寫明。
 *
 *   時間 t：0–12（月），0 ＝ 春天開始；每季 3 個月。
 *   season(t)        → { i: 0–3, k: 這一季過了多少（0–1） }
 *   field(t, bad)    → { h: 作物高度 0–1, ripe: 變黃 0–1, cut: 已經收割的比例 0–1, sown: 播了種的比例 0–1 }
 *   granary(t, bad)  → 穀倉存量 0–1（秋收後最滿，一路吃到下一次收成；歉收的一年會在春天見底）
 *   larder(t, bad)   → 採集狩獵那一群的存糧 0–1（本來就不多；歉收的一年改吃別的，變化小）
 *   camp(t, spots)   → 營地現在的位置（每季一個地點；季末的最後一段時間在搬家）
 *   blend(t)         → { a: 這一季, b: 下一季, w: 0–1 } 人物從這一季的工作地點走到下一季的
 */
export const MONTHS = 12;
export const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
const wrap = (t) => ((t % MONTHS) + MONTHS) % MONTHS;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => { const x = clamp01(v); return x * x * (3 - 2 * x); };
const ramp = (t, a, b) => clamp01((t - a) / (b - a));

export function season(t) {
  const m = wrap(t);
  return { i: Math.floor(m / 3), k: (m % 3) / 3 };
}

/** 田：0–1 播種，1–6 長高，4.5–6.5 變黃，6.5–8 收割（從一頭割到另一頭），之後是留茬的休耕地。 */
export function field(t, bad = false) {
  const m = wrap(t);
  const grown = bad ? 0.45 : 1;                             // 歉收：長不高
  return {
    sown: m < 8 ? ramp(m, 0, 1) : 0,
    h: m < 8 ? smooth(ramp(m, 1, 6)) * grown : 0,
    ripe: m < 8 ? smooth(ramp(m, 4.5, 6.5)) : 0,
    cut: m < 6.5 ? 0 : ramp(m, 6.5, 8),
    wilt: bad ? smooth(ramp(m, 3, 5.5)) : 0,               // 歉收：夏天枯黃
  };
}

const HARVEST_END = 8, FULL = 1, LEAN = 0.32;
/** 穀倉：收割時裝滿，之後每個月吃掉一些，一直吃到下一次收割開始（m＝6.5）。 */
export function granary(t, bad = false) {
  const m = wrap(t);
  const top = bad ? LEAN : FULL;
  if (m >= 6.5 && m < HARVEST_END) {
    const before = left(MONTHS - HARVEST_END + 6.5, bad);  // 收割前剩下的
    return before + (top - before) * ramp(m, 6.5, HARVEST_END);
  }
  const since = m >= HARVEST_END ? m - HARVEST_END : m + MONTHS - HARVEST_END;
  return left(since, bad);
}
// 收成之後過了 since 個月還剩多少：正常的一年吃到下次收成還剩一成多；歉收的一年大約五個月就見底
function left(since, bad) {
  const top = bad ? LEAN : FULL, perMonth = bad ? LEAN / 5 : (FULL - 0.14) / 10.5;
  return Math.max(0, top - since * perMonth);
}

/** 採集狩獵那一群的存糧：秋天存一些堅果，冬天吃掉；本來就不靠存糧過日子。 */
export function larder(t, bad = false) {
  const m = wrap(t);
  const top = bad ? 0.26 : 0.34;
  if (m >= 6 && m < 9) return 0.08 + (top - 0.08) * smooth(ramp(m, 6, 9));
  const since = m >= 9 ? m - 9 : m + 3;
  return Math.max(0.08, top - since * (top - 0.08) / 5);
}

/** 人物：這一季在做什麼，下一季要做什麼，走到哪了（每季最後 0.75 個月在換工作）。 */
export function blend(t, move = 0.75) {
  const { i, k } = season(t);
  const start = 1 - move / 3;
  return { a: i, b: (i + 1) % 4, w: k < start ? 0 : smooth((k - start) / (1 - start)) };
}

/** 營地的位置：spots 是四季各一個 [x, z]。 */
export function camp(t, spots, move = 0.75) {
  const { a, b, w } = blend(t, move);
  return [spots[a][0] + (spots[b][0] - spots[a][0]) * w, spots[a][1] + (spots[b][1] - spots[a][1]) * w];
}

/** 0–12 → 「Early spring · 初春」這種讀數用的索引：每季分成初、仲、晚。 */
export function part(t) {
  const { i, k } = season(t);
  return { season: i, third: Math.min(2, Math.floor(k * 3)) };
}
