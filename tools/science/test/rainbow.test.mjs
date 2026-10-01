// 萬物原理第十課：雨滴光路與彩虹角度的檢查
import assert from 'node:assert/strict';
import { nWater, primaryAngle, rainbowAngle, secondaryRainbowAngle, primaryPath } from '../src/rainbowcalc.js';

const near = (a, b, tol) => Math.abs(a - b) <= tol;
assert.ok(near(nWater(750), 1.330, 1e-9) && near(nWater(350), 1.343, 1e-9));   // 擬合的兩點
assert.ok(near(nWater(530), 1.333, 0.001));                                      // 綠光約 1.333
const g = rainbowAngle(1.333), red = rainbowAngle(nWater(650)), vio = rainbowAngle(nWater(410));
assert.ok(near(g.angle, 42, 0.3), `green ${g.angle}`);                          // 主虹約 42°
assert.ok(near(g.b, 0.86, 0.02));                                                // 發生在 b ≈ 0.86
assert.ok(red.angle > vio.angle && red.angle - vio.angle > 1 && red.angle - vio.angle < 2.5);   // 紅在外、紫在內，差 1–2.5°
assert.ok(near(rainbowAngle(nWater(750)).angle, 42.5, 0.15));                    // Wikipedia：750 nm 42.5°
assert.ok(near(rainbowAngle(nWater(350)).angle, 40.6, 0.15));                    // Wikipedia：350 nm 40.6°
const s2r = secondaryRainbowAngle(nWater(650)).angle, s2v = secondaryRainbowAngle(nWater(410)).angle;
assert.ok(s2r > 49.5 && s2v < 54 && s2v > s2r);                                  // 副虹 50–53°、顏色相反
assert.equal(primaryAngle(0, 1.333), 0);                                         // 正中央射進去：原路彈回
// 2D 光路的出射方向，和公式 4r − 2i 算的角度一致
for (const b of [0.3, 0.6, 0.86, 0.95]) {
  const { out } = primaryPath(b, 1.333, 3);
  const ang = Math.acos(-out[0]) * 180 / Math.PI;
  assert.ok(near(ang, primaryAngle(b, 1.333), 1e-6), `b=${b} ${ang}`);
}
console.log('rainbow.test: all passed', red.angle.toFixed(2), vio.angle.toFixed(2), s2r.toFixed(2), s2v.toFixed(2));
