// 平衡的幾何：凸包、面積、在不在裡面、離邊緣多遠、傾倒角。數字都是手算得出來的。
import assert from 'node:assert/strict';
import { area, centroid, hull, inside, margin, nearest, rayDist, tipAngles, tipAny } from '../src/balance.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} ≠ ${b}`);

// 凸包：正方形四個角＋中間的點＋邊上的點 → 只剩四個角，逆時針
const sq = hull([[0, 0], [2, 0], [2, 2], [0, 2], [1, 1], [1, 0], [0.5, 1.5]]);
assert.equal(sq.length, 4);
near(area(sq), 4);
let turn = 0;
for (let i = 0; i < 4; i++) { const a = sq[i], b = sq[(i + 1) % 4]; turn += a[0] * b[1] - b[0] * a[1]; }
assert.ok(turn > 0, '逆時針');
assert.deepEqual(centroid(sq).map((v) => +v.toFixed(9)), [1, 1]);

// 三角形 3-4-5：面積 6
near(area(hull([[0, 0], [3, 0], [0, 4]])), 6);
// 少於三個點：沒有面積，什麼都不在裡面
assert.equal(area(hull([[0, 0], [1, 0]])), 0);
assert.equal(inside(hull([[0, 0], [1, 0]]), [0.5, 0]), false);

// 在不在裡面、離邊緣多遠
assert.equal(inside(sq, [1, 1]), true);
assert.equal(inside(sq, [2, 1]), true, '邊上算在裡面');
assert.equal(inside(sq, [2.01, 1]), false);
near(margin(sq, [1, 1]), 1);
near(margin(sq, [0.25, 1]), 0.25);
near(margin(sq, [3, 1]), -1);
near(margin(sq, [3, 3]), -Math.SQRT2);
const n = nearest(sq, [3, 1]);
near(n.point[0], 2); near(n.point[1], 1); near(n.normal[0], 1); near(n.normal[1], 0);

// 沿某個方向走多遠會到邊緣
near(rayDist(sq, [1, 1], [1, 0]), 1);
near(rayDist(sq, [0.5, 1], [1, 0]), 1.5);
near(rayDist(sq, [1, 1], [1, 1]), Math.SQRT2);
assert.equal(rayDist(sq, [5, 5], [1, 0]), 0);

// 傾倒角：重心在正方形中央、高度 1 → 四個方向都是 atan(1/1)＝45°
const t = tipAngles(sq, [1, 1, 1]);
for (const k of ['front', 'back', 'left', 'right']) near(t[k], 45, 1e-9);
// 重心高度變成一半 → atan(1/0.5)＝63.43°：越低越不容易倒
near(tipAngles(sq, [1, 0.5, 1]).front, 63.43494882292201, 1e-9);
// 底面積變寬（x 方向 4）→ 左右的傾倒角變大，前後不變
const wide = hull([[-1, 0], [3, 0], [3, 2], [-1, 2]]);
const tw = tipAngles(wide, [1, 1, 1]);
near(tw.left, 63.43494882292201, 1e-9); near(tw.front, 45, 1e-9);
assert.equal(tw.minDir, 'front');
// 重心偏向一邊 → 那一邊最容易倒
const off = tipAngles(sq, [1.5, 1, 1]);   // x＝1.5：離左邊（+x）的邊 0.5
near(off.left, Math.atan2(0.5, 1) * 180 / Math.PI, 1e-9);
assert.equal(off.minDir, 'left');
// 繞一圈找最弱的方向
near(tipAny(sq, [1, 1, 1], 72).deg, 45, 1e-6);
near(tipAny(wide, [1, 1, 1], 72).deg, 45, 1e-6);

console.log('balance.test: ok');
