import assert from 'node:assert/strict';
import { billFate, sustainers, thresholds } from '../src/bill.js';

const B = { house: 435, senate: 100 };
assert.deepEqual(thresholds(B), { house: { majority: 218, two_thirds: 290 }, senate: { majority: 51, two_thirds: 67 } });
assert.deepEqual(sustainers(B), { house: 146, senate: 34 });   // 146 位眾議員或 34 位參議員就能讓否決站得住

const f = (h, s, a, adj = false) => billFate({ house: h, senate: s }, a, adj, B);
// 國會沒過，總統做什麼都一樣
for (const a of ['sign', 'veto', 'wait']) assert.deepEqual(f(217, 60, a), { law: false, key: 'fail_congress', short: 'house' });
assert.equal(f(300, 50, 'sign').short, 'senate');
assert.equal(f(100, 30, 'sign').short, 'both');
// 簽署
assert.deepEqual(f(218, 51, 'sign'), { law: true, key: 'signed', short: null });
// 十天不簽也不退回
assert.deepEqual(f(218, 51, 'wait', false), { law: true, key: 'unsigned_law', short: null });
assert.deepEqual(f(435, 100, 'wait', true), { law: false, key: 'pocket', short: null }, 'a pocket veto cannot be overridden, whatever the votes');
// 否決與推翻
assert.deepEqual(f(290, 67, 'veto'), { law: true, key: 'overridden', short: null });
assert.deepEqual(f(289, 67, 'veto'), { law: false, key: 'sustained', short: 'house' });
assert.deepEqual(f(290, 66, 'veto'), { law: false, key: 'sustained', short: 'senate' });
assert.deepEqual(f(250, 60, 'veto'), { law: false, key: 'sustained', short: 'both' });
assert.equal(f(435, 67, 'veto', true).key, 'overridden', 'adjournment matters only when the President waits');
assert.throws(() => f(300, 70, 'ignore'));
// 席次不同時照樣算
assert.deepEqual(thresholds({ house: 65, senate: 26 }), { house: { majority: 33, two_thirds: 44 }, senate: { majority: 14, two_thirds: 18 } });
console.log('bill.test ok');
