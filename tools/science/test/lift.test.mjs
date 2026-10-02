// 萬物原理第十三課：機翼氣流計算的檢查
import assert from 'node:assert/strict';
import { velocity, inside, toWing, toWorld, cl, clIdeal, liftRel, chord, airfoil, BETA, STALL_DEG } from '../src/liftcalc.js';

const near = (a, b, tol) => Math.abs(a - b) <= tol;
assert.ok(near(chord(), 4, 0.25));                                   // 弦長約 4
assert.ok(BETA > 0);                                                  // 有彎度：迎角 0° 也有升力
assert.ok(cl(0) > 0 && cl(-BETA * 180 / Math.PI - 0.01) < 0.01);     // 零升力角是負的
const slope = (clIdeal(6) - clIdeal(2)) / (4 * Math.PI / 180);
assert.ok(slope > 2 * Math.PI * 0.95 && slope < 2 * Math.PI * 1.4, `slope ${slope}`);   // 薄翼理論約 2π／弧度
assert.ok(cl(10) > cl(5));                                            // 迎角越大升力越大
assert.ok(cl(STALL_DEG + 6) < cl(STALL_DEG));                         // 失速：升力掉下來
assert.ok(near(liftRel(5, 2) / liftRel(5, 1), 4, 1e-12));            // 速度加倍，升力四倍
// 遠方是均勻氣流；機翼上方比下方快
const far = velocity([-40, 0], 5);
const farW = toWorld(far, 5);
assert.ok(near(farW[0], 1, 0.02) && near(farW[1], 0, 0.02));
const top = Math.hypot(...velocity([0, 0.5], 5)), bot = Math.hypot(...velocity([0, -0.45], 5));
assert.ok(top > 1.1 && bot < 1, `top ${top} bottom ${bot}`);
assert.ok(inside([0, 0.05]) && !inside([0, 1.5]) && !inside([-3, 0]));
// 機翼後面的氣流往下轉（下洗）
const behind = toWorld(velocity(toWing([3.2, -0.4], 6), 6), 6);
assert.ok(behind[1] < -0.05, `downwash ${behind[1]}`);
// 「上下同時到達」是錯的：一排從上游同時出發的空氣，上面那顆先到尾緣後方
function travel(y0, alpha) {
  let p = [-6, y0], t = 0;
  for (let k = 0; k < 20000 && p[0] < 3; k++) {
    const v = toWorld(velocity(toWing(p, alpha), alpha), alpha);
    p = [p[0] + v[0] * 0.002, p[1] + v[1] * 0.002]; t += 0.002;
  }
  return t;
}
const tUp = travel(0.35, 6), tDown = travel(-0.35, 6);
assert.ok(tUp < tDown, `upper ${tUp} lower ${tDown}`);
assert.ok(airfoil(60).length === 60);
console.log('lift.test: all passed', slope.toFixed(2), tUp.toFixed(2), tDown.toFixed(2));
