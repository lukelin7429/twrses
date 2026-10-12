import assert from 'node:assert/strict';
import { blockers, gates, majority, need, rate, tally } from '../src/amend.js';

const B = { house: 435, senate: 100, states: 50 };
assert.equal(need(435, 2, 3), 290);
assert.equal(need(100, 2, 3), 67);
assert.equal(need(50, 2, 3), 34);
assert.equal(need(50, 3, 4), 38);
assert.equal(need(13, 3, 4), 10);     // 1791 年有十四州時是 11；十三州時是 10
assert.equal(need(14, 3, 4), 11);
assert.equal(need(48, 3, 4), 36);     // 第十九條修正案（1920 年，48 州）要 36 州
assert.equal(need(9, 2, 3), 6);       // 整除的情況不多算一票
assert.equal(majority(435), 218);
assert.equal(majority(100), 51);
assert.equal(blockers(50, 3, 4), 13); // 十三個州不批准就擋下來
assert.equal(blockers(100, 2, 3), 34);
assert.equal(blockers(435, 2, 3), 146);

let g = gates('congress', 'legislatures', B);
assert.deepEqual(g.map((x) => [x.key, x.need]), [['house', 290], ['senate', 67], ['state_legislatures', 38]]);
g = gates('congress', 'conventions', B);
assert.equal(g[2].key, 'state_conventions');
g = gates('convention', 'legislatures', B);
assert.deepEqual(g.map((x) => [x.key, x.need]), [['applications', 34], ['convention', null], ['state_legislatures', 38]]);
assert.throws(() => gates('president', 'legislatures', B));
assert.throws(() => gates('congress', 'referendum', B));

assert.deepEqual(tally({ house: 290, senate: 67, states: 38 }, B), { house: true, senate: true, states: true, proposed: true, ratified: true, ordinary: true });
let t = tally({ house: 289, senate: 67, states: 50 }, B);
assert.equal(t.proposed, false); assert.equal(t.ratified, false); assert.equal(t.ordinary, true);
t = tally({ house: 300, senate: 70, states: 37 }, B);
assert.equal(t.proposed, true); assert.equal(t.ratified, false);
t = tally({ house: 217, senate: 51, states: 0 }, B);
assert.equal(t.ordinary, false);
assert.equal(rate(27, 33), 81.82);
console.log('amend.test ok');
