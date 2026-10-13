/*
 * 世界歷史 第一課〈人類怎麼走到世界各地？〉的純函式（node test/spread.test.mjs）。
 *
 *   routePoints(route, step)      JSON 的路線 → 一串帶年代的點（sphere.js 的 timedTrace），並標出渡海的那幾段
 *   regionState(region, ago)      'not'（還沒有證據）／'maybe'（落在估計範圍裡）／'yes'（範圍最晚的那一端也過了）
 *   overlaps / judgeOrder         「誰先到？」：只用估計的範圍判定；範圍重疊的兩個地方，誰排前面都算對
 *   makeSort(items)               「三種證據」：一題一題分到籃子裡，可以選到對，只記第一次就答對的題數
 */
import { timedTrace, angle } from './sphere.js';

/** 轉折點：[lon, lat, ago?, 'sea'?]。'sea' 表示「走到這一點的那一段」要渡海。 */
export function routePoints(route, step = 1) {
  const wps = route.pts.map((w) => [w[0], w[1], typeof w[2] === 'number' ? w[2] : null]);
  const pts = timedTrace(wps, step);
  const spans = [];
  let d = 0;
  route.pts.forEach((w, i) => {
    if (!i) return;
    const len = angle(route.pts[i - 1], w);
    if (w.includes('sea')) spans.push([d, d + len]);
    d += len;
  });
  return pts.map((p) => ({ ...p, sea: spans.some(([a, b]) => p.d > a + 1e-9 && p.d <= b + 1e-9) }));
}

/** 估計的抵達年代是一段範圍 [older, nearer]（距今幾年）。 */
export function regionState(region, ago) {
  if (ago > region.older) return 'not';
  return ago > region.nearer ? 'maybe' : 'yes';
}

export const overlaps = (a, b) => a.older >= b.nearer && b.older >= a.nearer;

/**
 * order：由早到晚排好的 key。只有「範圍完全不重疊」的兩個地方排反了才算錯。
 * 回傳 { ok, wrong: [[早的, 晚的]…]（被排反的）, open: [[a, b]…]（範圍重疊、目前分不出先後的） }
 */
export function judgeOrder(items, order) {
  const by = Object.fromEntries(items.map((it) => [it.key, it]));
  if (order.length !== items.length || new Set(order).size !== items.length || order.some((k) => !by[k])) throw new Error('order must list every item once');
  const wrong = [], open = [];
  for (let i = 0; i < order.length; i++) for (let j = i + 1; j < order.length; j++) {
    const first = by[order[i]], second = by[order[j]];
    if (overlaps(first, second)) open.push([first.key, second.key]);
    else if (first.older < second.nearer) wrong.push([second.key, first.key]);
  }
  return { ok: wrong.length === 0, wrong, open };
}
/** 一種說得通的排法：照範圍的中間值由早到晚。 */
export const midOrder = (items) => items.slice().sort((a, b) => (b.older + b.nearer) - (a.older + a.nearer)).map((it) => it.key);

export function makeSort(items, buckets) {
  const state = { i: 0, first: 0, tried: [], done: false };
  return {
    state, items, buckets,
    current: () => (state.done ? null : items[state.i]),
    pick(bucket) {
      if (state.done) return null;
      if (!buckets.includes(bucket)) throw new Error(`Unknown bucket: ${bucket}`);
      const it = items[state.i];
      if (state.tried.includes(bucket)) return { right: false, repeat: true };
      const right = it.answer === bucket;
      if (right && state.tried.length === 0) state.first += 1;
      state.tried.push(bucket);
      return { right, firstTry: right && state.tried.length === 1 };
    },
    next() {
      if (state.done) return false;
      const it = items[state.i];
      if (!state.tried.includes(it.answer)) return false;        // 還沒選到對的
      state.tried = [];
      if (state.i + 1 >= items.length) { state.done = true; return true; }
      state.i += 1;
      return true;
    },
    reset() { state.i = 0; state.first = 0; state.tried = []; state.done = false; },
  };
}
