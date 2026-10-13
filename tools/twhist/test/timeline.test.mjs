import assert from 'node:assert/strict';
import {
  FLOOR, agoToYear, centuryOf, fitView, formatAgoEn, formatAgoZh, formatYearEn, formatYearZh, groupThousands, makeScale, panView,
  roundAgo, spanPos, ticks, yearToAgo, yearsBetween, zhCount, zoomView,
} from '../src/timeline.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e * Math.max(1, Math.abs(b)), `${a} ≉ ${b}`);
const NOW = 2026;

// ── 曆年 ↔ 距今：西元後 ─────────────────────────────────────────────
assert.equal(yearToAgo(2026, NOW), 0);
assert.equal(yearToAgo(1624, NOW), 402);
assert.equal(yearToAgo(1, NOW), 2025);
// ── 西元前：沒有 0 年 ────────────────────────────────────────────────
assert.equal(yearToAgo(-1, NOW), 2026);                 // 西元前 1 年＝西元 1 年的前一年
assert.equal(yearToAgo(-3000, NOW), 5025);
assert.throws(() => yearToAgo(0, NOW), RangeError);
assert.throws(() => yearToAgo(1.5, NOW), RangeError);
assert.equal(yearToAgo(1, NOW) + 1, yearToAgo(-1, NOW)); // 相鄰兩年只差一年
assert.equal(agoToYear(0, NOW), 2026); assert.equal(agoToYear(402, NOW), 1624);
assert.equal(agoToYear(2025, NOW), 1); assert.equal(agoToYear(2026, NOW), -1); assert.equal(agoToYear(5025, NOW), -3000);
assert.equal(agoToYear(30000, NOW), -27975);
for (const y of [-40000, -3000, -221, -2, -1, 1, 2, 476, 1603, 1624, 1895, 1945, 1996, 2026]) assert.equal(agoToYear(yearToAgo(y, NOW), NOW), y, `round trip ${y}`);
for (let a = 0; a <= 6000; a += 7) assert.equal(yearToAgo(agoToYear(a, NOW), NOW), a, `round trip ago ${a}`);
assert.equal(yearsBetween(1895, 1945), 50); assert.equal(yearsBetween(-1, 1), 1); assert.equal(yearsBetween(-10, 10), 19);
assert.equal(yearsBetween(-30, -10), 20); assert.equal(yearsBetween(10, -10), 19);
assert.equal(centuryOf(1624), 17); assert.equal(centuryOf(1700), 17); assert.equal(centuryOf(1701), 18); assert.equal(centuryOf(1), 1);
assert.equal(centuryOf(-1), -1); assert.equal(centuryOf(-100), -1); assert.equal(centuryOf(-101), -2); assert.equal(centuryOf(1996), 20);

// ── 文字 ────────────────────────────────────────────────────────────
assert.equal(groupThousands(30000), '30,000'); assert.equal(groupThousands(402), '402');
assert.equal(roundAgo(31400), 31000); assert.equal(roundAgo(386), 390); assert.equal(roundAgo(42), 42); assert.equal(roundAgo(5025), 5000);
assert.equal(formatYearEn(1624), '1624'); assert.equal(formatYearEn(-3000), '3,000 BCE');
assert.equal(formatYearZh(1624), '西元 1624 年'); assert.equal(formatYearZh(-3000), '西元前 3000 年');
assert.equal(zhCount(30000), '3 萬'); assert.equal(zhCount(15000), '1.5 萬'); assert.equal(zhCount(6500), '6,500'); assert.equal(zhCount(400), '400');
assert.equal(formatAgoEn(30000), 'about 30,000 years ago'); assert.equal(formatAgoZh(30000), '約 3 萬年前');
assert.equal(formatAgoEn(0), 'now'); assert.equal(formatAgoZh(0), '現在'); assert.equal(formatAgoEn(1, false), '1 year ago');
assert.equal(formatAgoEn(402, false), '402 years ago'); assert.equal(formatAgoZh(402, false), '402 年前');

// ── 線性尺度 ─────────────────────────────────────────────────────────
const lin = makeScale('linear', 50000, 0);
near(lin.pos(50000), 0); near(lin.pos(0), 1); near(lin.pos(25000), 0.5);
near(lin.pos(402), 1 - 402 / 50000);                    // 四百年在五萬年裡不到 1%
assert.ok(1 - lin.pos(402) < 0.01);
for (const a of [0, 1, 402, 5025, 30000, 50000]) near(lin.ago(lin.pos(a)), a);
// 線性：等長的時間等寬，不管在西元前還是西元後
near(lin.pos(yearToAgo(-1000, NOW)) - lin.pos(yearToAgo(-2000, NOW)), lin.pos(yearToAgo(1500, NOW)) - lin.pos(yearToAgo(500, NOW)));
// 跨過西元前後（西元前 500 年到西元 500 年是 999 年，不是 1000 年）
near((lin.pos(yearToAgo(500, NOW)) - lin.pos(yearToAgo(-500, NOW))) * 50000, 999);

// ── 對數尺度 ─────────────────────────────────────────────────────────
const log = makeScale('log', 100000, 1);
near(log.pos(100000), 0); near(log.pos(1), 1);
near(log.pos(10000), 0.2); near(log.pos(1000), 0.4); near(log.pos(100), 0.6); near(log.pos(10), 0.8);
near(log.pos(0), 1); near(log.pos(0.2), 1);             // 比 FLOOR 更近的算 FLOOR
assert.equal(FLOOR, 1);
for (const a of [1, 30, 402, 5025, 30000, 100000]) near(log.ago(log.pos(a)), a, 1e-9);
// 對數：每往回十倍一樣寬
near(log.pos(300) - log.pos(3000), log.pos(30) - log.pos(300));
// 兩種尺度都是「越古老越靠左」
for (const s of [lin, makeScale('log', 50000, 1)]) {
  let p = -1;
  for (const y of [-40000, -3000, -1, 1, 1624, 1895, 1996, 2025]) { const q = s.pos(yearToAgo(y, NOW)); assert.ok(q > p, `${s.kind} ${y}`); p = q; }
}
assert.throws(() => makeScale('log', 10, 10), RangeError);
assert.throws(() => makeScale('cubic', 10, 1), RangeError);
assert.ok(log.contains(1) && log.contains(100000) && !log.contains(100001) && log.contains(0));
assert.ok(!makeScale('linear', 1000, 100).contains(50));

// ── 一段時間 ─────────────────────────────────────────────────────────
assert.deepEqual(spanPos(lin, 50000, 25000), { from: 0, to: 0.5 });
assert.deepEqual(spanPos(lin, 25000, 50000), { from: 0, to: 0.5 });
assert.equal(spanPos(makeScale('linear', 1000, 0), 5000, 2000), null);
assert.deepEqual(spanPos(makeScale('linear', 1000, 0), 5000, 500), { from: 0, to: 0.5 });

// ── 刻度 ────────────────────────────────────────────────────────────
const lt = ticks(makeScale('log', 50000, 1), NOW);
assert.deepEqual(lt.filter((t) => t.major).map((t) => t.ago), [10000, 1000, 100, 10, 1]);
assert.ok(lt.some((t) => t.ago === 50000 && !t.major) && lt.some((t) => t.ago === 20000));
assert.equal(lt.find((t) => t.ago === 10000).label.zh, '1 萬');
const short = ticks(makeScale('linear', 426, 0), NOW);  // 1600–2026：刻在整數的曆年上
assert.deepEqual(short.map((t) => t.year), [1600, 1700, 1800, 1900, 2000]);
assert.deepEqual(short.map((t) => t.ago), [426, 326, 226, 126, 26]);
const cross = ticks(makeScale('linear', 3000, 1000), NOW); // 西元前 975 年到西元 1026 年：跨過西元前後，沒有 0 年
assert.ok(cross.every((t) => t.year !== 0));
assert.deepEqual(cross.map((t) => t.year), [-501, -1, 500, 1000]);
assert.equal(cross[1].label.en, '1 BCE'); assert.equal(cross[0].label.zh, '前 501');
const long = ticks(makeScale('linear', 50000, 0), NOW);
assert.deepEqual(long.map((t) => t.ago), [50000, 40000, 30000, 20000, 10000, 0]);
assert.equal(long.at(-1).label.en, 'now'); assert.equal(long[2].label.zh, '3 萬');

// ── 縮放與平移 ───────────────────────────────────────────────────────
const LIM = { older: 50000, nearer: 0 };
let v = zoomView('linear', { older: 50000, nearer: 0 }, 2, 1, LIM);    // 以「現在」為中心放大兩倍
near(v.older, 25000); near(v.nearer, 0);
v = zoomView('linear', { older: 50000, nearer: 0 }, 2, 0.5, LIM);
near(v.older, 37500); near(v.nearer, 12500);
v = zoomView('linear', v, 0.01, 0.5, LIM);                              // 縮小不會超出範圍
near(v.older, 50000); near(v.nearer, 0);
v = zoomView('linear', { older: 100, nearer: 0 }, 100, 0.5, LIM);       // 放大有下限
near(v.older - v.nearer, 20);
const LL = { older: 50000, nearer: 1 };
v = zoomView('log', { older: 10000, nearer: 1 }, 2, 0, LL);             // 以最古老那一端為中心
near(v.older, 10000); near(v.nearer, 100, 1e-9);
v = zoomView('log', { older: 50000, nearer: 1 }, 0.5, 0.5, LL);
near(v.older, 50000); near(v.nearer, 1);
// 放大後，錨點那個年代的位置不變
const before = makeScale('log', 50000, 1), at = before.ago(0.3);
const z = zoomView('log', { older: 50000, nearer: 1 }, 3, 0.3, LL);
near(makeScale('log', z.older, z.nearer).pos(at), 0.3, 1e-9);
v = panView('linear', { older: 30000, nearer: 20000 }, 0.5, LIM);
near(v.older, 25000); near(v.nearer, 15000);
v = panView('linear', { older: 30000, nearer: 20000 }, -9, LIM);
near(v.older, 50000); near(v.nearer, 40000);
v = panView('linear', { older: 30000, nearer: 20000 }, 9, LIM);
near(v.older, 10000); near(v.nearer, 0);
v = fitView('linear', 426, 0, LIM, 0);
near(v.older, 426); near(v.nearer, 0);
v = fitView('log', 6000, 2000, LL, 0);
near(v.older, 6000, 1e-9); near(v.nearer, 2000, 1e-9);
v = fitView('log', 40000, 30000, LL, 0.5);                              // 留邊不會超出範圍
assert.ok(v.older <= 50000 + 1e-6 && v.nearer >= 1);
console.log('timeline.test.mjs ok');
