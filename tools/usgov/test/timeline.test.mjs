import assert from 'node:assert/strict';
import { clampView, countAt, formatEn, formatZh, fromYear, labeled, latestAt, makeView, nearest, pan, parseDate, reveal, sortEvents, ticks, toFrac, toTime, toYear, zoomAt } from '../src/timeline.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} ≈ ${b}`);

// 日期 ↔ 小數年
assert.equal(toYear(1787), 1787);
near(toYear(1787, 9, 17), 1787 + 259 / 365);
near(toYear(1788, 3, 1), 1788 + 60 / 366);          // 1788 是閏年
assert.deepEqual(fromYear(toYear(1787, 9, 17)), { y: 1787, m: 9, d: 17 });
assert.deepEqual(fromYear(toYear(1788, 2, 29)), { y: 1788, m: 2, d: 29 });
assert.deepEqual(fromYear(toYear(1791, 12, 15)), { y: 1791, m: 12, d: 15 });
assert.deepEqual(fromYear(toYear(1800, 12, 31)), { y: 1800, m: 12, d: 31 });   // 1800 不是閏年
near(parseDate('1776-07-04'), toYear(1776, 7, 4));
assert.equal(parseDate('1992'), 1992);
assert.equal(formatEn(parseDate('1787-09-17')), 'September 17, 1787');
assert.equal(formatEn(parseDate('1787-09-17'), 'month'), 'September 1787');
assert.equal(formatZh(parseDate('1791-12-15')), '1791 年 12 月 15 日');
for (let y = 1774; y <= 2026; y += 7) for (const [m, d] of [[1, 1], [3, 4], [6, 21], [12, 31]]) assert.deepEqual(fromYear(toYear(y, m, d)), { y, m, d });

// 畫面範圍
let v = makeView(1770, 2030);
assert.deepEqual([v.a, v.b], [1770, 2030]);
v = zoomAt(v, 0.1, 1787);
near(v.b - v.a, 26);
near(toFrac(v, 1787), (1787 - 1770) / 260, 1e-9);   // 縮放的中心不動
v = zoomAt(v, 1000);                                 // 拉遠不會超出整條時間軸
assert.deepEqual([v.a, v.b], [1770, 2030]);
v = zoomAt(makeView(1770, 2030), 1e-6, 1787);        // 拉近有下限
near(v.b - v.a, 0.5);
v = pan(makeView(1770, 2030, 1780, 1800), -500);     // 平移到頭就停，寬度不變
assert.deepEqual([v.a, v.b], [1770, 1790]);
v = pan(makeView(1770, 2030, 1780, 1800), 500);
assert.deepEqual([v.a, v.b], [2010, 2030]);
v = clampView({ min: 0, max: 10, a: 8, b: 14 });
assert.deepEqual([v.a, v.b], [4, 10]);
v = reveal(makeView(1770, 2030, 1780, 1800), 1900);
assert.ok(1900 > v.a && 1900 < v.b);
near(v.b - v.a, 20);
near(toTime(v, toFrac(v, 1899.5)), 1899.5);

// 刻度
let tk = ticks(makeView(1770, 2030));
assert.equal(tk.step, 50);
assert.deepEqual(tk.list.map((x) => x.label), ['1800', '1850', '1900', '1950', '2000']);
tk = ticks(makeView(1770, 2030, 1775, 1792), 9);
assert.equal(tk.step, 2);
assert.ok(tk.list.every((x) => x.major));
tk = ticks(makeView(1770, 2030, 1787, 1788.5), 8);
assert.equal(tk.step, 0.25);
assert.deepEqual(tk.list.filter((x) => x.major).map((x) => x.label), ['1787', '1788']);

// 事件
const ev = sortEvents([
  { id: 'bor', t: parseDate('1791-12-15'), rank: 1 },
  { id: 'decl', t: parseDate('1776-07-04'), rank: 1 },
  { id: 'signed', t: parseDate('1787-09-17'), rank: 1 },
  { id: 'de', t: parseDate('1787-12-07'), rank: 3, state: true },
  { id: 'nh', t: parseDate('1788-06-21'), rank: 2, state: true },
]);
assert.deepEqual(ev.map((e) => e.id), ['decl', 'signed', 'de', 'nh', 'bor']);
assert.equal(latestAt(ev, 1775), null);
assert.equal(latestAt(ev, parseDate('1787-09-17')).id, 'signed');   // 當天就算
assert.equal(latestAt(ev, parseDate('1787-09-16')).id, 'decl');
assert.equal(latestAt(ev, 2026).id, 'bor');
assert.equal(countAt(ev, parseDate('1788-01-01'), (e) => e.state), 1);
assert.equal(countAt(ev, 1790, (e) => e.state), 2);
assert.equal(nearest(ev, 1788.4).id, 'nh');
assert.equal(nearest(ev, 1800, 1), null);
// 標籤不重疊：1787 年的兩件事擠在一起，只留比較重要的那個
const lab = labeled(makeView(1770, 2030, 1775, 1793), ev, 0.1);
assert.ok(lab.has('signed') && lab.has('decl') && lab.has('bor'));
assert.ok(!lab.has('de'));
assert.ok(!lab.has('nh'));
console.log('timeline.test ok');
