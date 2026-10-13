import assert from 'node:assert/strict';
import { agoAtDepth, bounds, checkOrder, depthAt, foundSoFar, intrusionYoungerThanNeighbors, layerIndexAt, totalDepth } from '../src/strata.js';

const L = [
  { key: 'a', thick: 0.3, fromAgo: 100, toAgo: 1, finds: [{ key: 'a1', ago: 30 }] },
  { key: 'b', thick: 0.5, fromAgo: 1000, toAgo: 100, finds: [{ key: 'b1', ago: 400 }, { key: 'b2', ago: 800 }] },
  { key: 'c', thick: 0.2, fromAgo: 10000, toAgo: 1000, finds: [{ key: 'c1', ago: 5000 }] },
];
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e * Math.max(1, Math.abs(b)), `${a} ≉ ${b}`);

assert.deepEqual(bounds(L).map((b) => [b.top, +b.bottom.toFixed(6)]), [[0, 0.3], [0.3, 0.8], [0.8, 1]]);
near(totalDepth(L), 1);
near(depthAt(L, 0), 0); near(depthAt(L, 1), 0.3); near(depthAt(L, 1.5), 0.55); near(depthAt(L, 3), 1); near(depthAt(L, 9), 1); near(depthAt(L, -2), 0);
assert.equal(layerIndexAt(L, 0), -1); assert.equal(layerIndexAt(L, 0.1), 0); assert.equal(layerIndexAt(L, 0.3), 0);
assert.equal(layerIndexAt(L, 0.31), 1); assert.equal(layerIndexAt(L, 1), 2); assert.equal(layerIndexAt(L, 5), 2);
// 越深越古老：深度每往下一點，年代不會變年輕
let prev = 0;
for (let d = 0; d <= 1.0001; d += 0.01) { const a = agoAtDepth(L, d); assert.ok(a >= prev - 1e-9, `depth ${d}`); prev = a; }
near(agoAtDepth(L, 0), 1); near(agoAtDepth(L, 0.3), 100, 1e-6); near(agoAtDepth(L, 0.8), 1000, 1e-6); near(agoAtDepth(L, 1), 10000, 1e-6);
near(agoAtDepth(L, 0.55), 10 ** 2.5, 1e-6);          // 一層的正中間＝兩端的幾何平均
assert.deepEqual(foundSoFar(L, 0).map((f) => f.key), []);
assert.deepEqual(foundSoFar(L, 1.9).map((f) => f.key), ['a1']);
assert.deepEqual(foundSoFar(L, 2).map((f) => [f.key, f.layer]), [['a1', 0], ['b1', 1], ['b2', 1]]);
assert.equal(foundSoFar(L, 3).length, 4);
assert.deepEqual(checkOrder(L), []);
assert.equal(checkOrder([L[1], L[0]]).length, 1);     // 上下顛倒：下面那一層比上面年輕
assert.equal(checkOrder([{ ...L[0], finds: [{ key: 'x', ago: 5000 }] }]).length, 1);
assert.deepEqual(checkOrder([{ ...L[0], finds: [{ key: 'x', ago: 5000, intrusive: true }] }]), []);
assert.ok(intrusionYoungerThanNeighbors(L, { from: 0, into: 2 }, { ago: 30 }));
assert.ok(!intrusionYoungerThanNeighbors(L, { from: 0, into: 2 }, { ago: 5000 }));
// floor：和時間軸的 nearest 同一個數——地面算 10 年前，第一層一開挖游標就開始動
near(agoAtDepth(L, 0, 10), 10); near(agoAtDepth(L, 0.15, 10), 10 ** 1.5, 1e-6); near(agoAtDepth(L, 0.3, 10), 100, 1e-6);
console.log('strata.test.mjs ok');
