// 萬物原理第十五課：電梯平衡錘計算的檢查
import assert from 'node:assert/strict';
import { CAR, CAPACITY, COUNTERWEIGHT, MAX_PEOPLE, PERSON, carMass, imbalance, motorLoad, balancedPeople, ropeCanHold, fallDistance } from '../src/elevcalc.js';

const share = (COUNTERWEIGHT - CAR) / CAPACITY;
assert.ok(share >= 0.4 && share <= 0.5);                          // 平衡錘＝車廂＋40–50% 載重
assert.ok(MAX_PEOPLE * PERSON <= CAPACITY);                       // 坐滿也不超過額定載重
assert.ok(balancedPeople() > 6 && balancedPeople() < 7);          // 約 6 個人時兩邊剛好平衡
assert.equal(motorLoad(0), 450);                                  // 空車：平衡錘比較重 450 kg（車廂想往上）
assert.ok(imbalance(0) < 0 && imbalance(MAX_PEOPLE) > 0);
assert.equal(motorLoad(MAX_PEOPLE), 390);                         // 坐滿：車廂比較重 390 kg
assert.equal(motorLoad(MAX_PEOPLE, false), 1840);                 // 沒有平衡錘：整個 1,840 kg 都要馬達撐
for (let n = 0; n <= MAX_PEOPLE; n++) assert.ok(motorLoad(n) <= 450 && motorLoad(n) < motorLoad(n, false) / 2.2);
assert.ok(motorLoad(6) < 40);                                     // 6 個人：幾乎不用出力
assert.equal(carMass(10), 1700);
assert.equal(ropeCanHold(), 1250);                                // 一條鋼索就撐得住額定載重＋25%
const f = fallDistance();
assert.ok(f.total > 0.4 && f.total < 0.7 && f.time < 0.6);        // 全斷也只掉約半公尺就被夾住
console.log('elevator.test: all passed', f.total.toFixed(2));
