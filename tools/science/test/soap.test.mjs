// 萬物原理第十七課：肥皂模型的檢查
import assert from 'node:assert/strict';
import { cleaned, oilLeft, releaseTime, micellesAway, MICELLES, T_MAX } from '../src/soapcalc.js';

assert.ok(cleaned('water', T_MAX) < 0.05);                       // 只用水：幾乎帶不走
assert.equal(micellesAway('water', T_MAX), 0);
assert.ok(cleaned('soap', 20) > 0.2 && cleaned('soap', 20) < 0.5);   // 有肥皂不搓：只洗掉一部分
assert.ok(cleaned('scrub', 20) > 0.9);                           // 搓 20 秒：絕大部分都帶走
assert.ok(cleaned('scrub', 5) > 0.4 && cleaned('scrub', 5) < 0.7);   // 只搓 5 秒：還剩不少
for (const m of ['water', 'soap', 'scrub']) {
  for (let t = 0; t < T_MAX; t++) assert.ok(cleaned(m, t + 1) >= cleaned(m, t));
  assert.ok(Math.abs(oilLeft(m, 7) + cleaned(m, 7) - 1) < 1e-12);
}
for (let t = 1; t <= T_MAX; t++) assert.ok(cleaned('scrub', t) > cleaned('soap', t) && cleaned('soap', t) > cleaned('water', t));
// 油滴一顆一顆離開，時間遞增
for (let j = 1; j < MICELLES; j++) assert.ok(releaseTime('scrub', j) > releaseTime('scrub', j - 1));
assert.ok(releaseTime('scrub', 0) < 1 && releaseTime('scrub', MICELLES - 1) < T_MAX);
assert.ok(micellesAway('scrub', 20) >= MICELLES - 1 && micellesAway('soap', 20) < MICELLES / 2);
assert.equal(releaseTime('soap', MICELLES - 1), Infinity);
console.log('soap.test: all passed', cleaned('scrub', 5).toFixed(2), cleaned('scrub', 20).toFixed(2), cleaned('soap', 20).toFixed(2), micellesAway('scrub', 20));
