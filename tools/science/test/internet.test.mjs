// 萬物原理第五課：封包計算的檢查
import assert from 'node:assert/strict';
import { packetsFor, lightMs, greatCircleKm, reassemble, outOfOrder, FIBER_KM_S } from '../src/netcalc.js';

assert.equal(packetsFor(3_000_000), 2000);           // 3 MB 照片約 2,000 個封包
assert.equal(packetsFor(20), 1);                      // 一句短訊息一個封包就夠
assert.ok(Math.abs(FIBER_KM_S - 204218) < 50);        // 光纖裡約每秒 20.4 萬公里
const km = greatCircleKm(24.08, 120.54, 42.36, -71.06);
assert.ok(Math.abs(km - 12532) < 5, `km ${km}`);      // 彰化—波士頓直線約 12,532 公里
assert.ok(Math.abs(lightMs(km) - 61.4) < 0.5);        // 直線也要約 0.06 秒
const r = reassemble(5, [2, 1, 4, 5]);
assert.equal(r.complete, false); assert.deepEqual(r.missing, [3]); assert.deepEqual(r.ordered, [1, 2, 4, 5]);
assert.equal(reassemble(3, [3, 1, 2]).complete, true);
assert.equal(outOfOrder([1, 3, 2]), true); assert.equal(outOfOrder([1, 2, 3]), false);
console.log('internet.test: all passed');
