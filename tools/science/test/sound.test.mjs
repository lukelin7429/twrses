// 萬物原理第十一課：聲波計算的檢查
import assert from 'node:assert/strict';
import { MEDIA, speedOfSound, wavelength, thunderKm, secondsPerKm, canHear, displacement, squeeze } from '../src/soundcalc.js';

const near = (a, b, tol) => Math.abs(a - b) <= tol;
assert.ok(near(speedOfSound(20), 343.4, 0.1));          // 20 °C 約 343 m/s
assert.ok(near(speedOfSound(0), 331.3, 0.01));
assert.ok(speedOfSound(30) > speedOfSound(20));          // 越熱越快
assert.ok(near(wavelength(343), 1, 1e-9));               // 343 Hz 的波長 1 公尺
assert.ok(near(wavelength(100), 3.43, 1e-9));
assert.ok(near(secondsPerKm(), 2.92, 0.01));             // 約 2.9 秒 1 公里
assert.ok(near(thunderKm(3), 1.03, 0.01));               // 數到 3 ≈ 1 公里
assert.ok(near(MEDIA.water.v / MEDIA.air.v, 4.3, 0.05)); // 水中快 4.3 倍
assert.ok(near(MEDIA.iron.v / MEDIA.air.v, 14.9, 0.1));  // 鐵中快將近 15 倍
assert.ok(canHear(1000) && !canHear(30000) && !canHear(10));
// 分子只在原地晃：位移不超過振幅、一個週期平均為 0；波前還沒到的地方不動
const p = { A: 0.3, lambda: 2, f: 0.5, src: 0, speed: 1 };
let sum = 0, max = 0;
for (let k = 0; k < 200; k++) { const s = displacement(1, 4 + k / 100, p); sum += s; max = Math.max(max, Math.abs(s)); }
assert.ok(Math.abs(sum / 200) < 0.01 && max <= 0.3 + 1e-9);
assert.equal(displacement(5, 2, p), 0);                  // t = 2 秒時波前在 x = 2，x = 5 還沒動
// 疏密：位移的斜率負的地方擠在一起
const sq = [0, 0.5, 1, 1.5].map((x) => squeeze(x, 3, p));
assert.ok(Math.max(...sq) > 0.5 && Math.min(...sq) < -0.5);
console.log('sound.test: all passed');
