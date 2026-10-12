/*
 * 美國政治 U.S. Government · 時間軸的純函式（test/timeline.test.mjs）。不碰 DOM，timeline2d.js 與各課的模型共用。
 *
 * 時間一律用「小數年」：1787-09-17 → 1787.7096…（toYear）。這樣縮放、平移、比較先後都只是數字運算。
 * view = { min, max, a, b }：min–max 是整條時間軸的範圍，a–b 是現在畫面上看得到的那一段。
 */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** 年、月、日 → 小數年（1 月 1 日是整數年） */
export function toYear(y, m = 1, d = 1) {
  let doy = d - 1;
  for (let i = 0; i < m - 1; i++) doy += DAYS[i] + (i === 1 && isLeap(y) ? 1 : 0);
  return y + doy / (isLeap(y) ? 366 : 365);
}
/** 'YYYY-MM-DD'（或 'YYYY-MM'、'YYYY'）→ 小數年 */
export function parseDate(s) {
  const [y, m, d] = String(s).split('-').map(Number);
  return toYear(y, m || 1, d || 1);
}
/** 小數年 → { y, m, d } */
export function fromYear(t) {
  const y = Math.floor(t);
  const n = isLeap(y) ? 366 : 365;
  let doy = Math.min(n - 1, Math.max(0, Math.round((t - y) * n)));
  let m = 0;
  for (; m < 12; m++) { const len = DAYS[m] + (m === 1 && isLeap(y) ? 1 : 0); if (doy < len) break; doy -= len; }
  return { y, m: m + 1, d: doy + 1 };
}
/** 美式日期：September 17, 1787；precision 'month' → September 1787；'year' → 1787 */
export function formatEn(t, precision = 'day') {
  const { y, m, d } = fromYear(t);
  return precision === 'year' ? String(y) : precision === 'month' ? `${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1]} ${d}, ${y}`;
}
export function formatZh(t, precision = 'day') {
  const { y, m, d } = fromYear(t);
  return precision === 'year' ? `${y} 年` : precision === 'month' ? `${y} 年 ${m} 月` : `${y} 年 ${m} 月 ${d} 日`;
}

export function makeView(min, max, a = min, b = max) { return clampView({ min, max, a, b }); }
/** 把看得到的那一段收進範圍裡；最窄不小於 minSpan 年 */
export function clampView(v, minSpan = 0.5) {
  const full = v.max - v.min;
  let span = Math.min(full, Math.max(minSpan, v.b - v.a));
  let a = v.a;
  if (a < v.min) a = v.min;
  if (a + span > v.max) a = v.max - span;
  return { min: v.min, max: v.max, a, b: a + span };
}
/** 以 at 這個時間為中心縮放：factor < 1 拉近、> 1 拉遠；at 在畫面上的位置不變 */
export function zoomAt(v, factor, at = (v.a + v.b) / 2, minSpan = 0.5) {
  const span = Math.min(v.max - v.min, Math.max(minSpan, (v.b - v.a) * factor));
  const k = (at - v.a) / (v.b - v.a);
  return clampView({ ...v, a: at - k * span, b: at - k * span + span }, minSpan);
}
export function pan(v, dt) { return clampView({ ...v, a: v.a + dt, b: v.b + dt }, v.b - v.a); }
/** 讓 t 落在畫面裡（留一點邊） */
export function reveal(v, t, margin = 0.08) {
  const span = v.b - v.a, pad = span * margin;
  if (t < v.a + pad) return pan(v, t - pad - v.a);
  if (t > v.b - pad) return pan(v, t + pad - v.b);
  return v;
}
/** 時間 → 0–1 的位置；位置 → 時間 */
export const toFrac = (v, t) => (t - v.a) / (v.b - v.a);
export const toTime = (v, f) => v.a + f * (v.b - v.a);

const STEPS = [1 / 12, 0.25, 0.5, 1, 2, 5, 10, 20, 25, 50, 100];
/** 刻度：挑一個讓畫面上大約有 target 格的間距 */
export function ticks(v, target = 8) {
  const span = v.b - v.a;
  const step = STEPS.find((s) => span / s <= target) || STEPS[STEPS.length - 1];
  const out = [];
  const first = Math.ceil(v.a / step - 1e-9) * step;
  for (let t = first; t <= v.b + 1e-9; t += step) {
    const r = Math.round(t / step) * step;
    const whole = Math.abs(r - Math.round(r)) < 1e-6;
    out.push({ t: r, label: whole ? String(Math.round(r)) : '', major: whole });
  }
  return { step, list: out };
}

/** 依時間排序（不改原陣列） */
export const sortEvents = (events) => events.slice().sort((p, q) => p.t - q.t);
/** t 這個時刻「已經發生」的最後一件事（events 要先排序）；還沒有任何事就回傳 null */
export function latestAt(events, t) {
  let hit = null;
  for (const e of events) { if (e.t <= t + 1e-9) hit = e; else break; }
  return hit;
}
/** t 之前（含）發生了幾件符合條件的事 */
export function countAt(events, t, pred = () => true) {
  return events.reduce((n, e) => n + (e.t <= t + 1e-9 && pred(e) ? 1 : 0), 0);
}
/** 離 t 最近、而且在 maxDist 年以內的事件 */
export function nearest(events, t, maxDist = Infinity) {
  let best = null, bd = maxDist;
  for (const e of events) { const d = Math.abs(e.t - t); if (d <= bd) { bd = d; best = e; } }
  return best;
}
/**
 * 決定哪些事件的文字標籤放得下：由左到右，和上一個有標籤的事件相距不到 minFrac 就只畫圓點。
 * rank 小的優先（先排重要的，再補其他的）。回傳 Set(id)。
 */
export function labeled(v, events, minFrac = 0.16) {
  const vis = events.filter((e) => e.t >= v.a - 1e-9 && e.t <= v.b + 1e-9)
    .slice().sort((p, q) => (p.rank || 9) - (q.rank || 9) || p.t - q.t);
  const taken = [], out = new Set();
  for (const e of vis) {
    const f = toFrac(v, e.t);
    if (taken.every((g) => Math.abs(g - f) >= minFrac)) { taken.push(f); out.add(e.id); }
  }
  return out;
}
