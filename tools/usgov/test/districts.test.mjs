import assert from 'node:assert/strict';
import { check, edges, presets, seats, stripeVoters, tally } from '../src/districts.js';

const n = 8, k = 8, V = stripeVoters(n, 5);
assert.equal(V.filter((v) => v === 'g').length, 40);
const P = presets(n, k);
for (const [name, plan] of Object.entries(P)) {
  const c = check(plan, n, k);
  assert.ok(c.valid, `${name} is a valid plan`); assert.equal(c.size, 8);
}
// 同樣的選民，三種畫法、三種結果
assert.deepEqual(seats(V, P.cols, k), { g: 5, o: 3, tie: 0 });
assert.deepEqual(seats(V, P.rows, k), { g: 8, o: 0, tie: 0 });
assert.deepEqual(seats(V, P.boxes, k), { g: 4, o: 4, tie: 0 });
// 每區的票數
assert.deepEqual(tally(V, P.rows, k)[0], { cells: 8, g: 5, o: 3, win: 'g' });
// 檢查：不相連、格數不等、沒畫完
const bad = P.cols.slice(); [bad[0], bad[7]] = [bad[7], bad[0]];     // 兩格互換：第 0 區與第 7 區都斷開
let c = check(bad, n, k); assert.equal(c.valid, false); assert.equal(c.equal, true); assert.equal(c.connected[0], false);
const unequal = P.cols.slice(); unequal[1] = 0;
c = check(unequal, n, k); assert.equal(c.equal, false); assert.equal(c.sizes[0], 9);
const partial = P.cols.slice(); partial[5] = -1;
c = check(partial, n, k); assert.equal(c.complete, false); assert.equal(c.valid, false);
assert.equal(tally(V, Array(64).fill(-1), k)[0].win, null);
// 邊界：照欄的畫法只有直線邊界，7 條 × 8 段
const e = edges(P.cols, n);
assert.equal(e.length, 56); assert.ok(e.every((x) => x.side === 'e'));
console.log('districts.test ok');
