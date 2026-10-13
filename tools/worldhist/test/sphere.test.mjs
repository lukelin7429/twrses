// 球面幾何。node test/sphere.test.mjs
import assert from 'node:assert/strict';
import { toVec, toLonLat, toUV, angle, km, between, trace, timedTrace, frontAt, inRing } from '../src/sphere.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} ≉ ${b}`);
const nearV = (a, b, eps = 1e-9) => a.forEach((v, i) => near(v, b[i], eps));

// 方向：北極在 +y、經度 0 在 +z、東經 90 在 +x（從 +z 看，東邊在右）
nearV(toVec([0, 90]), [0, 1, 0]);
nearV(toVec([0, 0]), [0, 0, 1]);
nearV(toVec([90, 0]), [1, 0, 0]);
nearV(toVec([-90, 0]), [-1, 0, 0]);
assert.ok(toVec([121, 23.7])[0] > 0 && toVec([121, 23.7])[1] > 0);          // 台灣：東半球、北半球
assert.ok(toVec([-100, 40])[0] < 0);                                         // 北美洲：西半球
assert.ok(toVec([135, -25])[1] < 0);                                         // 澳洲：南半球
for (const p of [[121, 23.7], [-70, -41.5], [36, 4.8], [179.5, -17], [-179.5, 66]]) nearV(toLonLat(toVec(p)), p, 1e-9);
// 貼圖：西邊在左（u 小）、北邊 v 大
nearV(toUV([-180, -90]), [0, 0]); nearV(toUV([180, 90]), [1, 1]); nearV(toUV([0, 0]), [0.5, 0.5]);
assert.ok(toUV([121, 23.7])[0] > toUV([20, 0])[0]);

// 距離
near(angle([0, 0], [90, 0]), 90, 1e-9);
near(angle([10, 20], [10, 20]), 0, 1e-9);
near(km([0, 0], [0, 1]), 111.195, 0.01);
assert.ok(Math.abs(km([121.56, 25.04], [-74.0, 40.71]) - 12550) < 60);       // 台北到紐約約 12,550 公里

// 大圓內插
nearV(between([0, 0], [90, 0], 0.5), [45, 0], 1e-9);
nearV(between([0, 0], [0, 80], 0.25), [0, 20], 1e-9);
near(angle([10, 10], between([10, 10], [100, 50], 0.3)) / angle([10, 10], [100, 50]), 0.3, 1e-9);

// 路線
{
  const t = trace([[0, 0], [30, 0], [30, 30]], 1);
  near(t[t.length - 1].d, 60, 1e-9);
  assert.equal(t.length, 61);
  for (let i = 1; i < t.length; i++) assert.ok(t[i].d > t[i - 1].d);
  nearV(t[30].p, [30, 0], 1e-9);
}
{
  // 有年代的路線：中間沒標年代的轉折點照距離內插
  const tt = timedTrace([[0, 0, 60000], [30, 0], [60, 0, 30000], [60, 30, 0]], 1);
  near(tt[0].ago, 60000); near(tt[30].ago, 45000, 1e-6); near(tt[60].ago, 30000, 1e-6); near(tt[tt.length - 1].ago, 0, 1e-6);
  for (let i = 1; i < tt.length; i++) assert.ok(tt[i].ago <= tt[i - 1].ago + 1e-9);
  assert.equal(frontAt(tt, 70000), null);                                    // 還沒出發
  nearV(frontAt(tt, 60000).p, [0, 0], 1e-9);
  nearV(frontAt(tt, 45000).p, [30, 0], 1e-6);
  near(frontAt(tt, 45000).d, 30, 1e-6);
  nearV(frontAt(tt, 15000).p, [60, 15], 1e-6);
  assert.equal(frontAt(tt, 15000).done, false);
  assert.equal(frontAt(tt, 0).done, false);
  assert.throws(() => timedTrace([[0, 0, 100], [10, 0, 200]]), /back in time/);
  assert.throws(() => timedTrace([[0, 0], [10, 0, 200]]), /need an age/);
  const done = timedTrace([[0, 0, 100], [10, 0, 50]]);
  assert.equal(frontAt(done, 10).done, true);
  nearV(frontAt(done, 10).p, [10, 0], 1e-9);
}

assert.ok(inRing([1, 1], [[0, 0], [4, 0], [4, 4], [0, 4]]));
assert.ok(!inRing([5, 1], [[0, 0], [4, 0], [4, 4], [0, 4]]));

console.log('sphere.test.mjs ok');
