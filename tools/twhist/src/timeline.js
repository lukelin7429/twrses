/*
 * 台灣歷史 Taiwan's Story · 時間軸的純函式（不碰 DOM；node test/timeline.test.mjs）。
 *
 * 兩種說時間的方法，全系列都用這一個檔換算：
 *   year  曆年：正數是西元後（1624），負數是西元前（-3000 ＝ 西元前 3000 年）。**沒有 0 年**——西元前 1 年的下一年是西元 1 年。
 *   ago   距今幾年（0 ＝ 今年）。考古常用「距今」，歷史常用曆年。
 *
 * 位置 pos：0 ＝ 時間軸最古老的那一端，1 ＝ 最靠近現在的那一端。
 * 兩種尺度：
 *   linear  每一年一樣寬——看得出「有文字記錄的時代」有多短
 *   log     每往回十倍一樣寬——幾萬年前和幾十年前可以放在同一條線上
 *           （對數尺度沒有「0 年前」，比 FLOOR 年更近的一律算 FLOOR）
 */
export const FLOOR = 1;

/** 曆年 → 距今幾年。year 不能是 0。 */
export function yearToAgo(year, now) {
  if (!Number.isInteger(year) || year === 0) throw new RangeError('There is no year 0: use -1 for 1 BCE');
  return year > 0 ? now - year : now - year - 1;
}

/** 距今幾年 → 曆年（負數＝西元前）。 */
export function agoToYear(ago, now) {
  const y = now - Math.round(ago);
  return y >= 1 ? y : y - 1;
}

/** 兩個曆年之間隔了幾年（跨過西元前後時少算那個不存在的 0 年）。 */
export function yearsBetween(a, b) {
  if (a === 0 || b === 0) throw new RangeError('There is no year 0');
  const d = Math.abs(a - b);
  return (a < 0) !== (b < 0) ? d - 1 : d;
}

/** 西元第幾世紀（負數＝西元前第幾世紀）：1624 → 17，-250 → -3。 */
export function centuryOf(year) {
  if (year === 0) throw new RangeError('There is no year 0');
  return year > 0 ? Math.ceil(year / 100) : -Math.ceil(-year / 100);
}

export function groupThousands(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** 取兩位有效數字（估計的年代不假裝精確）：31,400 → 31,000；386 → 390。 */
export function roundAgo(ago) {
  const a = Math.abs(ago);
  if (a < 100) return Math.round(a);
  const p = 10 ** (Math.floor(Math.log10(a)) - 1);
  return Math.round(a / p) * p;
}

export function formatYearEn(year) {
  return year > 0 ? String(year) : `${groupThousands(-year)} BCE`;
}
export function formatYearZh(year) {
  return year > 0 ? `西元 ${year} 年` : `西元前 ${-year} 年`;
}

/** 中文的大數：30000 → 3 萬；6500 → 6,500；15000 → 1.5 萬 */
export function zhCount(n) {
  if (n >= 10000) return `${String(Math.round(n / 1000) / 10)} 萬`;
  return groupThousands(n);
}
export function formatAgoEn(ago, approx = true) {
  const a = approx ? roundAgo(ago) : Math.round(ago);
  if (a <= 0) return 'now';
  return `${approx ? 'about ' : ''}${groupThousands(a)} ${a === 1 ? 'year' : 'years'} ago`;
}
export function formatAgoZh(ago, approx = true) {
  const a = approx ? roundAgo(ago) : Math.round(ago);
  if (a <= 0) return '現在';
  const c = zhCount(a);
  return `${approx ? '約 ' : ''}${c}${c.endsWith('萬') ? '' : ' '}年前`;
}

const u = (kind, ago) => (kind === 'log' ? Math.log10(Math.max(ago, FLOOR)) : ago);
const unU = (kind, v) => (kind === 'log' ? 10 ** v : v);

/**
 * 一段時間軸：older、nearer 都是「距今幾年」，older > nearer >= 0。
 * 回傳 { kind, older, nearer, pos(ago), ago(pos), contains(ago) }。
 */
export function makeScale(kind, older, nearer) {
  if (kind !== 'log' && kind !== 'linear') throw new RangeError(`Unknown scale: ${kind}`);
  const n = kind === 'log' ? Math.max(nearer, FLOOR) : Math.max(nearer, 0);
  if (!(older > n)) throw new RangeError('older must be farther back than nearer');
  const u0 = u(kind, older), u1 = u(kind, n);
  return {
    kind, older, nearer: n,
    pos: (ago) => (u0 - u(kind, ago)) / (u0 - u1),
    ago: (pos) => unU(kind, u0 - pos * (u0 - u1)),
    contains: (ago) => { const a = kind === 'log' ? Math.max(ago, FLOOR) : ago; return a <= older + 1e-9 && a >= n - 1e-9; },
  };
}

/** 把 [fromAgo, toAgo] 這一段換成位置（夾在 0–1 之間）；整段都在畫面外就回傳 null。 */
export function spanPos(scale, fromAgo, toAgo) {
  const a = scale.pos(Math.max(fromAgo, toAgo)), b = scale.pos(Math.min(fromAgo, toAgo));
  if (b < 0 || a > 1) return null;
  return { from: Math.max(0, a), to: Math.min(1, b) };
}

function niceStep(raw) {
  const p = 10 ** Math.floor(Math.log10(raw));
  const f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

/**
 * 刻度。回傳 [{ ago, major, label: { en, zh } }]，由古到今。
 *   log     每個十的次方一條主刻度（10、100、1,000……年前），2 倍、5 倍是副刻度
 *   linear  範圍在 3,000 年以內：刻在整數的曆年上（1600、1700……）；更長：刻在「幾年前」上
 */
export function ticks(scale, now, want = 6) {
  const out = [];
  if (scale.kind === 'log') {
    const k0 = Math.floor(Math.log10(scale.nearer)), k1 = Math.ceil(Math.log10(scale.older));
    const decades = Math.log10(scale.older) - Math.log10(scale.nearer);
    for (let k = k1; k >= k0; k--) {
      for (const m of [5, 2, 1]) {
        const ago = m * 10 ** k;
        if (!scale.contains(ago)) continue;
        const major = m === 1;
        if (!major && decades > 3.2) { out.push({ ago, major: false, label: null }); continue; }
        out.push({ ago, major, label: { en: `${groupThousands(ago)}`, zh: zhCount(ago) } });
      }
    }
    return out;
  }
  const span = scale.older - scale.nearer;
  const step = niceStep(span / want);
  if (span <= 3000) {
    const yOld = now - scale.older, yNew = now - scale.nearer;       // 這裡用「天文年」（可以是 0 或負數）排整數，再換回曆年
    for (let y = Math.ceil(yOld / step) * step; y <= yNew + 1e-9; y += step) {
      const year = y >= 1 ? y : y - 1;
      out.push({ ago: now - y, major: true, year, label: { en: formatYearEn(year), zh: year > 0 ? String(year) : `前 ${-year}` } });
    }
    return out;
  }
  for (let a = Math.floor(scale.older / step) * step; a >= scale.nearer - 1e-9; a -= step) {
    out.push({ ago: a, major: true, label: a === 0 ? { en: 'now', zh: '現在' } : { en: groupThousands(a), zh: zhCount(a) } });
  }
  return out;
}

/**
 * 縮放：以 anchor（0–1 的位置）為中心放大 factor 倍（<1 是縮小）。
 * view＝{ older, nearer }；limits＝{ older, nearer, minSpan }（minSpan：linear 是年數，log 是幾個十倍）。
 */
export function zoomView(kind, view, factor, anchor, limits) {
  const lo = u(kind, Math.max(limits.nearer, kind === 'log' ? FLOOR : 0)), hi = u(kind, limits.older);
  const v0 = u(kind, view.older), v1 = u(kind, Math.max(view.nearer, kind === 'log' ? FLOOR : 0));
  const full = hi - lo;
  const minSpan = limits.minSpan || (kind === 'log' ? 0.5 : 20);
  const span = Math.min(full, Math.max(minSpan, (v0 - v1) / factor));
  const at = v0 - anchor * (v0 - v1);
  let n0 = at + anchor * span, n1 = n0 - span;
  if (n0 > hi) { n0 = hi; n1 = hi - span; }
  if (n1 < lo) { n1 = lo; n0 = lo + span; }
  return { older: unU(kind, n0), nearer: unU(kind, n1) };
}

/** 平移：dPos 是位置的變化量（正的＝往現在的方向移）。 */
export function panView(kind, view, dPos, limits) {
  const lo = u(kind, Math.max(limits.nearer, kind === 'log' ? FLOOR : 0)), hi = u(kind, limits.older);
  const v0 = u(kind, view.older), v1 = u(kind, Math.max(view.nearer, kind === 'log' ? FLOOR : 0));
  const span = v0 - v1;
  let n0 = v0 - dPos * span;
  n0 = Math.min(hi, Math.max(lo + span, n0));
  return { older: unU(kind, n0), nearer: unU(kind, n0 - span) };
}

/** 把畫面對到一段時間，前後各留 pad（比例）。 */
export function fitView(kind, fromAgo, toAgo, limits, pad = 0.12) {
  const a = u(kind, Math.max(fromAgo, toAgo)), b = u(kind, Math.max(Math.min(fromAgo, toAgo), kind === 'log' ? FLOOR : 0));
  const lo = u(kind, Math.max(limits.nearer, kind === 'log' ? FLOOR : 0)), hi = u(kind, limits.older);
  const span = Math.max(a - b, limits.minSpan || (kind === 'log' ? 0.5 : 20));
  const n0 = Math.min(hi, a + span * pad), n1 = Math.max(lo, b - span * pad);
  return { older: unU(kind, n0), nearer: unU(kind, n1) };
}
