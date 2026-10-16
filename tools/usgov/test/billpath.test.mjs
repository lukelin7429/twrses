import assert from 'node:assert/strict';
import { arcPoint, walk } from '../src/billpath.js';
import { shuffled } from '../src/order2d.js';

const stages = ['intro', 'hcomm', 'rules', 'hfloor', 'scomm', 'sfloor', 'resolve', 'president', 'override'].map((key) => ({ key }));
const bodies = { house: 435, senate: 100 };
const full = ['intro', 'hcomm', 'rules', 'hfloor', 'scomm', 'sfloor', 'president'];

// 死在委員會
let r = walk({ path: ['intro', 'hcomm'], stop: 'hcomm' }, stages, bodies);
assert.equal(r.law, false); assert.deepEqual(r.steps.map((s) => s.ok), [true, false]);
// 簽署
r = walk({ path: full, stop: null, president: { votes: { house: 300, senate: 70 }, action: 'sign', adjourned: false } }, stages, bodies);
assert.equal(r.law, true); assert.equal(r.fate.key, 'signed');
// 口袋否決
r = walk({ path: full, stop: null, president: { votes: { house: 300, senate: 70 }, action: 'wait', adjourned: true } }, stages, bodies);
assert.equal(r.law, false); assert.equal(r.fate.key, 'pocket'); assert.equal(r.steps.at(-1).ok, false);
// 十天不簽、國會還在開會 → 成為法律
r = walk({ path: full, stop: null, president: { votes: { house: 300, senate: 70 }, action: 'wait', adjourned: false } }, stages, bodies);
assert.equal(r.law, true); assert.equal(r.fate.key, 'unsigned_law');
// 否決：推翻成功／失敗
r = walk({ path: [...full, 'override'], stop: null, president: { votes: { house: 300, senate: 70 }, action: 'veto', adjourned: false } }, stages, bodies);
assert.equal(r.law, true); assert.equal(r.fate.key, 'overridden'); assert.deepEqual(r.steps.at(-2), { key: 'president', ok: true });
r = walk({ path: [...full, 'override'], stop: null, president: { votes: { house: 250, senate: 60 }, action: 'veto', adjourned: false } }, stages, bodies);
assert.equal(r.law, false); assert.equal(r.fate.key, 'sustained'); assert.equal(r.steps.at(-1).ok, false);
// 錯誤的資料
assert.throws(() => walk({ path: ['nope'] }, stages, bodies));
assert.throws(() => walk({ path: ['intro'], stop: 'hcomm' }, stages, bodies));
// 拋物線：兩端在站上，中間最高
assert.deepEqual(arcPoint([0, 0, 0], [4, 0, 2], 0), [0, 0, 0]);
assert.deepEqual(arcPoint([0, 0, 0], [4, 0, 2], 1), [4, 0, 2]);
assert.equal(arcPoint([0, 0, 0], [4, 0, 2], 0.5, 1.5)[1], 1.5);
// 打亂：同一個種子結果一樣、內容不變、不會剛好是正確順序
{
  const it = 'abcdefghij'.split('');
  const a = shuffled(it, 7), b = shuffled(it, 7);
  assert.deepEqual(a, b); assert.deepEqual(a.slice().sort(), it); assert.notDeepEqual(a, it);
  assert.notDeepEqual(shuffled(['x', 'y'], 1), ['x', 'y']);
}
console.log('billpath.test ok');
