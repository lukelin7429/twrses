// 萬物原理第十四課：腳踏車平衡模型的檢查
import assert from 'node:assert/strict';
import { BIKE, criticalSpeed, kmh, pushTest, step, fresh } from '../src/bikecalc.js';

const vc = criticalSpeed();
assert.ok(kmh(vc) > 8 && kmh(vc) < 12, `critical ${kmh(vc)}`);        // 這個模型：時速約 10 公里以上才接得住
const fast = pushTest(20 / 3.6);
assert.ok(!fast.fell && fast.endLean < 0.02, `fast ${JSON.stringify(fast.endLean)}`);   // 時速 20：推一下，自己站直
assert.ok(fast.maxLean > 0.02);                                        // 確實被推歪過
const slow = pushTest(5 / 3.6);
assert.ok(slow.fell);                                                  // 時速 5：接不住，倒下
assert.ok(pushTest(0).fell);                                           // 不動：一定倒
assert.ok(pushTest(20 / 3.6, { locked: true }).fell);                  // 前輪鎖死：再快也倒
assert.ok(pushTest(30 / 3.6, { locked: true }).fell);
// 前輪往倒的那一邊轉：往右倒（phi > 0）之後，轉向角也變成往右（delta > 0）
const s = fresh(); s.dphi = 0.4;
for (let t = 0; t < 0.3; t += 0.002) step(s, 5, 0.002);
assert.ok(s.phi > 0 && s.delta > 0);
// 越快，被推之後歪得越少
assert.ok(pushTest(25 / 3.6).maxLean < pushTest(14 / 3.6).maxLean);
// 剛好在臨界速度以上能站直、以下會倒
assert.ok(!pushTest(vc * 1.25, { sec: 20 }).fell && pushTest(vc * 0.8, { sec: 20 }).fell);
assert.ok(BIKE.w > 0.9 && BIKE.w < 1.2);
console.log('bike.test: all passed', kmh(vc).toFixed(1));
