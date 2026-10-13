// 平行時間軸的純函式：從 30 萬年前到西元 2000 年。node test/timeline.test.mjs
import assert from 'node:assert/strict';
import {
  EPOCH, LANES, laneIndex, yearToAgo, agoToYear, yearsBetween, centuryOf, commas, round2, zhNum,
  formatYear, formatAgo, formatAgoRange, describe, makeScale, spanPos, ticks, zoomView, panView, clampView, packRows,
} from '../src/timeline.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} ≉ ${b}`);

// 曆年 ↔ 距今；沒有 0 年
assert.equal(EPOCH, 2000);
assert.equal(yearToAgo(2000), 0);
assert.equal(yearToAgo(1), 1999);
assert.equal(yearToAgo(-1), 2000);            // 西元前 1 年在西元 1 年的前一年
assert.equal(yearToAgo(-3300), 5299);
assert.equal(agoToYear(0), 2000);
assert.equal(agoToYear(1999), 1);
assert.equal(agoToYear(2000), -1);
assert.equal(agoToYear(5299), -3300);
for (const y of [-300000, -9999, -221, -1, 1, 476, 1492, 1945, 2000]) assert.equal(agoToYear(yearToAgo(y)), y);
assert.throws(() => yearToAgo(0), RangeError);
assert.throws(() => formatYear(0), RangeError);
assert.throws(() => yearToAgo(12.5), RangeError);
assert.equal(yearsBetween(-1, 1), 1);
assert.equal(yearsBetween(-500, 500), 999);
assert.equal(yearsBetween(1914, 1918), 4);
assert.equal(yearsBetween(-221, -206), 15);
assert.equal(centuryOf(1450), 15);
assert.equal(centuryOf(2000), 20);
assert.equal(centuryOf(1901), 20);
assert.equal(centuryOf(-221), -3);
assert.equal(centuryOf(-1), -1);

// 讀數
assert.equal(commas(300000), '300,000');
assert.equal(round2(64300), 64000);
assert.equal(round2(315000), 320000);
assert.equal(round2(730), 730);
assert.equal(zhNum(300000), '30 萬');
assert.equal(zhNum(65000), '6.5 萬');
assert.equal(zhNum(3000), '3,000');
assert.deepEqual(formatYear(-3300), { en: '3,300 BCE', zh: '西元前 3,300 年' });
assert.deepEqual(formatYear(1492), { en: '1492 CE', zh: '西元 1492 年' });
assert.deepEqual(formatAgo(65000), { en: 'about 65,000 years ago', zh: '大約 6.5 萬年前' });
assert.deepEqual(formatAgo(3000), { en: 'about 3,000 years ago', zh: '大約 3,000 年前' });
assert.deepEqual(formatAgoRange(65000, 50000), { en: 'about 65,000 to 50,000 years ago', zh: '大約 6.5 萬到 5 萬年前' });
assert.deepEqual(formatAgoRange(50000, 65000), formatAgoRange(65000, 50000));
assert.deepEqual(formatAgoRange(800, 700), { en: 'about 800 to 700 years ago', zh: '大約 800 到 700 年前' });
assert.equal(describe(120000).en, 'about 120,000 years ago');
assert.equal(describe(750).en, 'about 750 years ago (around 1250 CE)');
assert.equal(describe(5300).en, 'about 5,300 years ago (around 3,300 BCE)');
assert.match(describe(750).zh, /西元 1250 年前後/);

// 七條線
assert.equal(LANES.length, 7);
assert.deepEqual(LANES.map((l) => l.key), ['africa', 'wasia', 'europe', 'sasia', 'easia', 'oceania', 'americas']);
assert.equal(laneIndex('africa'), 0);
assert.equal(laneIndex('americas'), 6);
assert.equal(laneIndex('atlantis'), -1);

// 對數尺度：30 萬年前到西元 1999 年（1 年前）
const LG = makeScale('log', 300000, 0);
assert.equal(LG.nearer, 1);
near(LG.pos(300000), 0);
near(LG.pos(1), 1);
near(LG.pos(0), 1);                              // 對數尺度沒有 0 年前
near(LG.ago(0), 300000, 1e-6);
near(LG.ago(1), 1, 1e-9);
for (const a of [250000, 65000, 12000, 5299, 2000, 500, 55, 2]) near(LG.ago(LG.pos(a)), a, a * 1e-9);
// 每往回十倍一樣寬
near(LG.pos(100) - LG.pos(1000), LG.pos(10000) - LG.pos(100000));
// 由古到今，位置只增不減
{
  let p = -1;
  for (const a of [300000, 200000, 70000, 15000, 3000, 2000, 1999, 500, 100, 10, 1]) { const q = LG.pos(a); assert.ok(q > p); p = q; }
}
assert.ok(LG.has(300000) && LG.has(1) && LG.has(0) && !LG.has(300001));

// 線性尺度：有文字的歷史（約 5,300 年）只占 30 萬年的不到 2%
const LN = makeScale('linear', 300000, 0);
near(LN.pos(300000), 0); near(LN.pos(0), 1); near(LN.pos(150000), 0.5);
assert.ok(1 - LN.pos(yearToAgo(-3300)) < 0.02);
assert.ok(1 - LG.pos(yearToAgo(-3300)) > 0.3);
for (const y of [-3300, -500, -1, 1, 1000, 1492, 2000]) near(LN.ago(LN.pos(yearToAgo(y))), yearToAgo(y), 1e-6);
assert.throws(() => makeScale('linear', 10, 10), RangeError);
assert.throws(() => makeScale('cubic', 10, 1), RangeError);

// 一段時間在畫面上的位置
assert.deepEqual(spanPos(LN, 300000, 0), { from: 0, to: 1 });
assert.equal(spanPos(makeScale('linear', 5000, 0), 65000, 50000), null);
{
  const s = spanPos(makeScale('linear', 60000, 0), 65000, 50000);
  near(s.from, 0); near(s.to, 1 / 6);
}

// 刻度
{
  const t = ticks(LG);
  assert.deepEqual(t.map((x) => x.ago), [100000, 10000, 1000, 100, 10, 1]);
  assert.equal(t[0].en, '100,000'); assert.equal(t[0].zh, '10 萬');
  const z = ticks(makeScale('log', 3000, 30));
  assert.deepEqual(z.map((x) => x.ago), [2000, 1000, 500, 200, 100, 50]);
  // 3,000 年的線性畫面：刻在曆年上，而且跳過不存在的 0 年
  const c = ticks(makeScale('linear', 3000, 0), 6);
  assert.deepEqual(c.map((x) => x.year), [-1000, -500, -1, 500, 1000, 1500, 2000]);
  assert.equal(c[2].en, '1 BCE / 1 CE');
  assert.equal(c[0].en, '1,000 BCE');
  assert.equal(c[6].en, '2000 CE');
  assert.ok(c.every((x) => x.year !== 0));
  near(c[2].ago, 2000);
  const big = ticks(LN, 6);
  assert.deepEqual(big.map((x) => x.ago), [300000, 250000, 200000, 150000, 100000, 50000, 0]);
  assert.equal(big[6].en, '2000 CE');
}

// 縮放與平移不會跑出範圍
{
  const lim = { older: 300000, nearer: 0 };
  let v = { older: 300000, nearer: 0 };
  v = zoomView('log', v, 2, 0.5, lim);
  const s = makeScale('log', v.older, v.nearer);
  near(Math.log10(v.older) - Math.log10(v.nearer), Math.log10(300000) / 2, 1e-9);
  near(s.pos(Math.sqrt(300000)), 0.5, 1e-9);                       // 以中心為準
  for (let i = 0; i < 30; i++) v = zoomView('log', v, 3, 0.2, lim);
  assert.ok(Math.log10(v.older) - Math.log10(v.nearer) >= 0.6 - 1e-9);
  for (let i = 0; i < 30; i++) v = zoomView('log', v, 0.3, 0.9, lim);
  near(v.older, 300000, 1e-3); near(v.nearer, 1, 1e-9);
  let p = zoomView('linear', { older: 300000, nearer: 0 }, 10, 1, lim);
  near(p.nearer, 0); near(p.older, 30000);
  p = panView('linear', p, -3, lim);
  near(p.older, 120000); near(p.nearer, 90000);
  p = panView('linear', p, -100, lim);
  near(p.older, 300000); near(p.nearer, 270000);
  p = panView('linear', p, 100, lim);
  near(p.older, 30000); near(p.nearer, 0);
  assert.deepEqual(clampView('log', { older: 30000, nearer: 0 }, lim), { older: 30000, nearer: 1 });
}

// 同一條線上的事件不重疊
assert.deepEqual(packRows([{ from: 0, to: 0.3 }, { from: 0.2, to: 0.5 }, { from: 0.35, to: 0.6 }, { from: 0.7, to: 0.9 }]), [0, 1, 0, 0]);

console.log('timeline.test.mjs ok');
