/*
 * 世界歷史 World History · 平行時間軸的純函式（不碰 DOM；node test/timeline.test.mjs）。
 * 台灣歷史系列有一份自己的 tools/twhist/src/timeline.js，寫法相同、各自一份，不互相 import。
 *
 * 兩種說時間的方法：
 *   year  曆年。正數是西元（CE），負數是西元前（BCE）：-3300 ＝ 西元前 3300 年。
 *         **沒有 0 年**——西元前 1 年的下一年就是西元 1 年。BCE／CE 和 BC／AD 是同一套數字。
 *   ago   距今幾年。這個系列寫到西元 2000 年前後，所以「今」一律取 EPOCH＝2000；
 *         幾萬年前的事，差二、三十年沒有影響。
 *
 * 位置 pos：0 ＝ 最古老的那一端（左），1 ＝ 最靠近現在的那一端（右）。
 * 兩種尺度：
 *   log     每往回十倍一樣寬：30 萬年前和 100 年前放得進同一條線（比 FLOOR 年更近的算 FLOOR）
 *   linear  每一年一樣寬：看得出有文字的歷史有多短
 */
export const EPOCH = 2000;
export const FLOOR = 1;

/** 七條並排的線。分法只是為了方便對照：中亞、東南亞的事放在最近的一條；每一洲裡面的差別都很大。 */
export const LANES = [
  { key: 'africa', en: 'Africa', zh: '非洲' },
  { key: 'wasia', en: 'West Asia', zh: '西亞' },
  { key: 'europe', en: 'Europe', zh: '歐洲' },
  { key: 'sasia', en: 'South Asia', zh: '南亞' },
  { key: 'easia', en: 'East Asia', zh: '東亞' },
  { key: 'oceania', en: 'Oceania', zh: '大洋洲' },
  { key: 'americas', en: 'The Americas', zh: '美洲' },
];
export const laneIndex = (key) => LANES.findIndex((l) => l.key === key);

function checkYear(year) {
  if (!Number.isInteger(year) || year === 0) throw new RangeError('There is no year 0: 1 BCE is -1 and the next year is 1 CE');
}
/** 曆年 → 距今（EPOCH）幾年。 */
export function yearToAgo(year, epoch = EPOCH) {
  checkYear(year);
  return year > 0 ? epoch - year : epoch - year - 1;
}
/** 距今幾年 → 曆年（負數＝西元前）。 */
export function agoToYear(ago, epoch = EPOCH) {
  const y = epoch - Math.round(ago);
  return y >= 1 ? y : y - 1;
}
/** 兩個曆年相隔幾年；跨過西元前後時，少算那個不存在的 0 年。 */
export function yearsBetween(a, b) {
  checkYear(a); checkYear(b);
  const d = Math.abs(a - b);
  return (a < 0) !== (b < 0) ? d - 1 : d;
}
/** 第幾世紀（負數＝西元前）：1450 → 15、2000 → 20、-221 → -3。 */
export function centuryOf(year) {
  checkYear(year);
  return year > 0 ? Math.ceil(year / 100) : -Math.ceil(-year / 100);
}

export const commas = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/** 估計的年代只留兩位有效數字：64,300 → 64,000。 */
export function round2(n) {
  const a = Math.abs(n);
  if (a < 100) return Math.round(a);
  const p = 10 ** (Math.floor(Math.log10(a)) - 1);
  return Math.round(a / p) * p;
}
/** 中文的大數：300000 → 30 萬、65000 → 6.5 萬、3000 → 3,000。 */
export function zhNum(n) {
  return n >= 10000 ? `${Math.round(n / 1000) / 10} 萬` : commas(n);
}

export function formatYear(year) {
  checkYear(year);
  return year > 0
    ? { en: `${year} CE`, zh: `西元 ${year} 年` }
    : { en: `${commas(-year)} BCE`, zh: `西元前 ${commas(-year)} 年` };
}
export function formatAgo(ago) {
  const a = round2(ago);
  if (a <= 0) return { en: 'the year 2000', zh: '西元 2000 年' };
  const z = zhNum(a);
  return { en: `about ${commas(a)} years ago`, zh: `大約 ${z}${z.endsWith('萬') ? '' : ' '}年前` };
}
/** 一段估計的範圍（距今）：「about 65,000 to 50,000 years ago」。兩端一樣就只寫一個。 */
export function formatAgoRange(older, nearer) {
  const a = round2(Math.max(older, nearer)), b = round2(Math.min(older, nearer));
  if (a === b) return formatAgo(a);
  const za = zhNum(a), zb = zhNum(b);
  return { en: `about ${commas(a)} to ${commas(b)} years ago`, zh: `大約 ${za}${za.endsWith('萬') ? '' : ' '}到 ${zb}${zb.endsWith('萬') ? '' : ' '}年前` };
}
/**
 * 時間滑桿和時間軸上的讀數：一萬年以前只說「大約幾萬年前」；一萬年以內加上曆年。
 */
export function describe(ago) {
  const f = formatAgo(ago);
  if (ago >= 10000) return f;
  const y = formatYear(roundYear(agoToYear(ago)));
  return { en: `${f.en} (around ${y.en})`, zh: `${f.zh}（${y.zh.replace(' 年', ' 年前後')}）` };
}
function roundYear(year) {
  const a = Math.abs(year);
  const step = a >= 2000 ? 100 : a >= 500 ? 50 : 10;
  const r = Math.round(a / step) * step || step;
  return year < 0 ? -r : r;
}

const toU = (kind, ago) => (kind === 'log' ? Math.log10(Math.max(ago, FLOOR)) : ago);
const fromU = (kind, v) => (kind === 'log' ? 10 ** v : v);
const lowest = (kind, nearer) => (kind === 'log' ? Math.max(nearer, FLOOR) : Math.max(nearer, 0));

/** 一段時間軸。older、nearer 都是距今幾年，older > nearer >= 0。 */
export function makeScale(kind, older, nearer) {
  if (kind !== 'log' && kind !== 'linear') throw new RangeError(`Unknown scale: ${kind}`);
  const n = lowest(kind, nearer);
  if (!(older > n)) throw new RangeError('older must be farther back than nearer');
  const u0 = toU(kind, older), u1 = toU(kind, n);
  return {
    kind, older, nearer: n,
    pos: (ago) => (u0 - toU(kind, ago)) / (u0 - u1),
    ago: (pos) => fromU(kind, u0 - pos * (u0 - u1)),
    has: (ago) => { const a = kind === 'log' ? Math.max(ago, FLOOR) : ago; return a <= older * (1 + 1e-9) && a >= n * (1 - 1e-9); },
  };
}

/** [fromAgo, toAgo] 在畫面上的位置（夾在 0–1）；整段在畫面外回傳 null。 */
export function spanPos(scale, fromAgo, toAgo) {
  const a = scale.pos(Math.max(fromAgo, toAgo)), b = scale.pos(Math.min(fromAgo, toAgo));
  if (b < 0 || a > 1) return null;
  return { from: Math.max(0, a), to: Math.min(1, b) };
}

function nice(raw) {
  const p = 10 ** Math.floor(Math.log10(raw)), f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}
/**
 * 刻度，由古到今：[{ ago, major, en, zh }]。
 *   log     十的次方是主刻度（「100,000 years ago · 10 萬年前」），畫面不到三個十倍時補 2、5
 *   linear  畫面在 5,000 年以內：刻在整數的曆年上（1000 BCE、1 CE、1000 CE）；更長：刻在「幾年前」上
 */
export function ticks(scale, want = 6) {
  const out = [];
  if (scale.kind === 'log') {
    const lo = Math.log10(scale.nearer), hi = Math.log10(scale.older);
    for (let k = Math.ceil(hi); k >= Math.floor(lo); k--) {
      for (const m of (hi - lo < 3 ? [5, 2, 1] : [1])) {
        const ago = m * 10 ** k;
        if (!scale.has(ago)) continue;
        out.push({ ago, major: m === 1, en: commas(ago), zh: zhNum(ago), unit: 'ago' });
      }
    }
    return out;
  }
  const span = scale.older - scale.nearer, step = nice(span / want);
  if (span <= 5000) {
    // 刻在整數的曆年上（1000 BCE、500 BCE、1 CE、500 CE……）；0 那一格是不存在的 0 年，畫在西元前 1 年和西元 1 年的交界
    const yOld = EPOCH - scale.older, yNew = EPOCH - scale.nearer;
    for (let a = Math.ceil(yOld / step) * step; a <= yNew + 1e-9; a += step) {
      const year = a >= 1 ? a : a === 0 ? -1 : a;
      const f = a === 0 ? { en: '1 BCE / 1 CE', zh: '前 1／西元 1' } : formatYear(year);
      out.push({ ago: yearToAgo(year), major: true, year, en: f.en, zh: f.zh.replace(/ 年$/, '').replace('西元前 ', '前 ').replace('西元 ', ''), unit: 'year' });
    }
    return out;
  }
  for (let a = Math.floor(scale.older / step) * step; a >= scale.nearer - 1e-9; a -= step) {
    out.push({ ago: a, major: true, en: a === 0 ? '2000 CE' : commas(a), zh: a === 0 ? '西元 2000' : zhNum(a), unit: 'ago' });
  }
  return out;
}

/** 縮放：以 anchor（0–1）為中心放大 factor 倍。view＝{ older, nearer }；limits＝{ older, nearer, minSpan }。 */
export function zoomView(kind, view, factor, anchor, limits) {
  const lo = toU(kind, lowest(kind, limits.nearer)), hi = toU(kind, limits.older);
  const v0 = toU(kind, view.older), v1 = toU(kind, lowest(kind, view.nearer));
  const min = limits.minSpan || (kind === 'log' ? 0.6 : 50);
  const span = Math.min(hi - lo, Math.max(min, (v0 - v1) / factor));
  const at = v0 - anchor * (v0 - v1);
  let n0 = at + anchor * span;
  n0 = Math.min(hi, Math.max(lo + span, n0));
  return { older: fromU(kind, n0), nearer: fromU(kind, n0 - span) };
}
/** 平移：dPos 是位置的變化（正的＝畫面往「現在」移）。 */
export function panView(kind, view, dPos, limits) {
  const lo = toU(kind, lowest(kind, limits.nearer)), hi = toU(kind, limits.older);
  const v0 = toU(kind, view.older), span = v0 - toU(kind, lowest(kind, view.nearer));
  const n0 = Math.min(hi, Math.max(lo + span, v0 - dPos * span));
  return { older: fromU(kind, n0), nearer: fromU(kind, n0 - span) };
}
/** 換尺度時保留同一段時間（對數尺度沒有 0 年前，夾在 FLOOR）。 */
export function clampView(kind, view, limits) {
  const older = Math.min(limits.older, view.older), nearer = Math.max(lowest(kind, limits.nearer), view.nearer);
  return older > nearer ? { older, nearer } : { older: limits.older, nearer: lowest(kind, limits.nearer) };
}

/**
 * 把同一條線上的事件排進不會重疊的列：items＝[{ from, to }]（位置 0–1，已經算好寬度），回傳每一項的列號。
 */
export function packRows(items, gap = 0.01) {
  const ends = [];
  return items.map((it) => {
    let r = ends.findIndex((e) => e + gap <= it.from);
    if (r < 0) { r = ends.length; ends.push(0); }
    ends[r] = it.to;
    return r;
  });
}
