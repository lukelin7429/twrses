import assert from 'node:assert/strict';
import { assign, hemicycle, perSeat, ratio, rowCounts, share } from '../src/seats.js';

for (const [n, rows] of [[435, 9], [100, 5], [65, 4], [26, 3], [437, 9], [7, 7]]) {
  const { counts } = rowCounts(n, rows, 2, 7);
  assert.equal(counts.reduce((a, b) => a + b, 0), n, `${n} seats in ${rows} rows`);
  for (let i = 1; i < rows; i++) assert.ok(counts[i] >= counts[i - 1], 'outer rows hold at least as many seats');
  const s = hemicycle(n, { rows, r0: 2, r1: 7 });
  assert.equal(s.length, n);
  for (const p of s) assert.ok(p.z <= 1e-9, 'seats are behind the rostrum, facing it');
}

// 半圓：最左的座位在 x<0、最右的在 x>0
{
  const s = hemicycle(100, { rows: 5, r0: 2, r1: 6 });
  const left = s.filter((p) => p.a === 0), right = s.filter((p) => p.a === 1);
  assert.ok(left.every((p) => p.x < 0) && right.every((p) => p.x > 0));
}

// 分座位：每組拿到的數目剛好，而且同一組連成一塊（依角度排序後是連續的一段）
{
  const s = hemicycle(65, { rows: 4, r0: 2, r1: 6 });
  const groups = [['NH', 3], ['MA', 8], ['RI', 1], ['CT', 5], ['NY', 6], ['NJ', 4], ['PA', 8], ['DE', 1], ['MD', 6], ['VA', 10], ['NC', 5], ['SC', 5], ['GA', 3]].map(([key, n]) => ({ key, n }));
  const keys = assign(s, groups);
  for (const g of groups) assert.equal(keys.filter((k) => k === g.key).length, g.n);
  const order = s.map((p, i) => i).sort((p, q) => s[p].a - s[q].a || s[p].row - s[q].row).map((i) => keys[i]);
  const runs = order.filter((k, i) => i === 0 || k !== order[i - 1]);
  assert.equal(runs.length, groups.length, 'each state is one contiguous block');
  assert.throws(() => assign(s, [{ key: 'X', n: 64 }]));
}

assert.equal(share(10, 65), 15.4);
assert.equal(share(2, 26), 7.7);
assert.equal(share(52, 435), 12);
assert.equal(perSeat(1000, 3), 333);
assert.equal(perSeat(5, 0), null);
assert.equal(ratio(10, 3), 3.3);
console.log('seats.test ok');
