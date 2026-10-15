// 除法純函式的測試：node test/divide.test.mjs
import assert from 'node:assert/strict';
import { MAX_N, MAX_TOTAL, candySlot, containerSlot, containers, divide, pileSlot, remainders, steps, tally } from '../src/divide.js';

// 課文裡的例子
assert.deepEqual(divide(12, 3), { q: 4, r: 0 });
assert.deepEqual(divide(13, 3), { q: 4, r: 1 });
assert.deepEqual(divide(56, 8), { q: 7, r: 0 });     // CCSS 3.OA.A.2 的例子
assert.deepEqual(divide(32, 8), { q: 4, r: 0 });     // 3.OA.B.6
assert.deepEqual(divide(2, 3), { q: 0, r: 2 });      // 分不到一顆：每人 0 顆、剩 2 顆
assert.deepEqual(divide(0, 5), { q: 0, r: 0 });      // 0 顆分給 5 人，每人 0 顆
assert.throws(() => divide(12, 0));                  // 不能除以 0
assert.throws(() => divide(12, 1.5));
assert.throws(() => divide(-1, 3));

// 1–30 除以 1–10：兩種分法每一步都合法，最後 total ＝ n × q ＋ r、0 ≤ r < n，兩種分法的商和餘數一樣
for (let t = 0; t <= MAX_TOTAL; t++) for (let n = 1; n <= MAX_N; n++) {
  const { q, r } = divide(t, n);
  assert.equal(n * q + r, t); assert.ok(r >= 0 && r < n);
  // 平分：n 個盤子，每個 q 顆
  const s = steps(t, n, 'share');
  assert.equal(s.length, n * q);
  assert.equal(containers(t, n, 'share'), n);
  assert.deepEqual(tally(s, n), Array(n).fill(q));
  // 發到一半的時候，盤子之間最多差一顆（輪流發）
  for (let k = 1; k <= s.length; k++) { const part = tally(s.slice(0, k), n); assert.ok(Math.max(...part) - Math.min(...part) <= 1); }
  // 每幾個一組：q 個袋子，每袋 n 顆；一袋裝滿才開下一袋
  const g = steps(t, n, 'group');
  assert.equal(g.length, n * q);
  assert.equal(containers(t, n, 'group'), q);
  assert.deepEqual(tally(g, q), Array(q).fill(n));
  g.forEach((x, k) => { if (k) assert.ok(x.to === g[k - 1].to || (x.to === g[k - 1].to + 1 && tally(g.slice(0, k), q)[g[k - 1].to] === n)); });
  // 發出去的加上留在桌上的＝一共
  assert.equal(s.length + r, t); assert.equal(g.length + r, t);
}
// 交換的對偶：「12 顆分給 3 人每人 4 顆」和「12 顆每 4 顆一袋裝 3 袋」
assert.equal(divide(12, 3).q, 4); assert.equal(divide(12, 4).q, 3);
// 除法和乘法：3 × 4 = 12 ↔ 12 ÷ 3 = 4、12 ÷ 4 = 3
assert.equal(3 * 4, 12);

// 餘數循環：除以 3 是 0、1、2、0、1、2……，永遠比 3 小
assert.deepEqual(remainders(3, 8), [0, 1, 2, 0, 1, 2, 0, 1, 2]);
for (let n = 1; n <= MAX_N; n++) {
  const rs = remainders(n, MAX_TOTAL);
  rs.forEach((r, t) => { assert.ok(r < n); assert.equal(r, t % n); if (t >= n) assert.equal(r, rs[t - n]); });
}
assert.deepEqual(remainders(1, 5), [0, 0, 0, 0, 0, 0]);   // 除以 1 永遠沒有餘數

// 桌上的位置：容器不重疊、置中；容器裡的糖不重疊、不出盤子；桌上那一堆不重疊
for (let count = 1; count <= MAX_TOTAL; count++) {
  const ps = Array.from({ length: count }, (_, i) => containerSlot(i, count));
  for (let a = 0; a < count; a++) for (let b = a + 1; b < count; b++) assert.ok(Math.hypot(ps[a][0] - ps[b][0], ps[a][1] - ps[b][1]) >= 4.4 - 1e-9);
  ps.forEach((p) => assert.ok(p[1] < 0));                 // 容器都在糖堆後面
}
for (let cap = 1; cap <= MAX_TOTAL; cap++) {
  const cs = Array.from({ length: cap }, (_, j) => candySlot(j, cap));
  for (let a = 0; a < cap; a++) for (let b = a + 1; b < cap; b++) assert.ok(Math.hypot(cs[a][0] - cs[b][0], cs[a][1] - cs[b][1]) > 0.5);
  cs.forEach((p) => assert.ok(Math.hypot(p[0], p[1]) < 2.1));   // 盤子半徑 2.1
}
const pile = Array.from({ length: MAX_TOTAL }, (_, j) => pileSlot(j, MAX_TOTAL));
for (let a = 0; a < MAX_TOTAL; a++) for (let b = a + 1; b < MAX_TOTAL; b++) assert.ok(Math.hypot(pile[a][0] - pile[b][0], pile[a][1] - pile[b][1]) >= 1.1);

console.log('divide.test.mjs ok');
