import assert from 'node:assert/strict';
import { KEYS, SOURCES, STOPS, group, height, span, stop, times } from '../src/shrink.js';

assert.deepEqual(KEYS, ['relay', 'eniac', 'transistor', 'i4004', 'm4']);
// 沒有來源的數字不存在：每一站都有年份、數量和一個查得到的來源
for (const s of STOPS) { assert.ok(Number.isInteger(s.year) && s.year > 1900 && s.year < 2100, s.key); assert.ok(Number.isInteger(s.count) && s.count >= 1, s.key); assert.ok(SOURCES[s.src], `${s.key} has no source`); assert.ok(['relay', 'tube', 'transistor'].includes(s.kind)); }
for (let i = 1; i < STOPS.length; i++) assert.ok(STOPS[i].year > STOPS[i - 1].year);      // 照年代排
// 來源寫的數
assert.equal(stop('relay').count, 2); assert.equal(stop('eniac').count, 17000); assert.equal(stop('eniac').atLeast, true);
assert.equal(stop('i4004').count, 2300); assert.equal(stop('m4').count, 28000000000);
assert.equal(group(28000000000), '28,000,000,000'); assert.equal(group(2300), '2,300'); assert.equal(group(2), '2');
// 頁面上用到的倍數與年數
assert.equal(times('i4004', 'm4'), 12173913);          // 280 億 ÷ 2,300：一千兩百多萬倍
assert.equal(times('eniac', 'm4'), 1647059);           // 280 億 ÷ 17,000：一百六十多萬倍（ENIAC 是「超過」17,000，所以實際略少於此）
assert.equal(times('eniac', 'i4004'), 0.1);            // 4004 的開關比 ENIAC 少
assert.equal(times('relay', 'eniac'), 8500); assert.equal(times('transistor', 'i4004'), 2300);
assert.equal(span('i4004', 'm4'), 53); assert.equal(span('eniac', 'i4004'), 25); assert.equal(span('relay', 'm4'), 87); assert.equal(span('transistor', 'i4004'), 24);
// 柱子：每高一格＝十倍
assert.equal(height(1), 0); assert.ok(Math.abs(height(2300) - 3.3617) < 1e-3); assert.ok(Math.abs(height(28000000000) - 10.447) < 1e-3); assert.ok(Math.abs(height(17000) - 4.2304) < 1e-3);
// 課文與活動用到的其他算術
assert.equal(1958 - 1947, 11); assert.equal(23 - 16, 7);
assert.deepEqual([1946, 1947, 1971, 2024].map((y) => Math.round((y - 1937) * 10) / 100), [0.9, 1, 3.4, 8.7]);   // 一年 10 公分
console.log('shrink.test.mjs ok');
