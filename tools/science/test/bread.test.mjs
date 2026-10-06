// 萬物原理第十八課：麵糰模型的檢查
import assert from 'node:assert/strict';
import { rate, rise, size, minutesTo, SIZE_MAX, OVEN_SPRING, T_MAX } from '../src/breadcalc.js';

assert.equal(size(0, 35), 1);
assert.equal(size(T_MAX, 35, false), 1);                         // 沒有酵母：完全不長大
assert.ok(size(60, 35) > 1.85 && size(60, 35) < SIZE_MAX);       // 溫暖的地方一小時：快要兩倍
assert.ok(size(60, 5) < 1.4);                                    // 冰箱裡：慢很多
assert.ok(Math.abs(rate(35) / rate(25) - 2) < 1e-9);             // 每高 10°C 快一倍（示意）
assert.ok(rate(40) > rate(30) && rate(30) > rate(10));
for (let t = 0; t < T_MAX; t += 5) assert.ok(size(t + 5, 30) > size(t, 30));
assert.ok(minutesTo(1.5, 35) < minutesTo(1.5, 20) && minutesTo(1.5, 20) < minutesTo(1.5, 5));
assert.equal(minutesTo(1.5, 30, false), Infinity);
assert.ok(Math.abs(size(minutesTo(1.5, 28), 28) - 1.5) < 1e-9);
// 送去烤：氣體再脹大一次；沒發的麵糰烤了也不會變大
assert.ok(Math.abs(size(60, 35, true, true) - (1 + (size(60, 35) - 1) * OVEN_SPRING)) < 1e-12);
assert.equal(size(60, 35, false, true), 1);
assert.ok(rise(1000, 35) <= 1);
console.log('bread.test: all passed', size(60, 35).toFixed(2), size(60, 5).toFixed(2), minutesTo(1.5, 35).toFixed(0), minutesTo(1.5, 5).toFixed(0));
