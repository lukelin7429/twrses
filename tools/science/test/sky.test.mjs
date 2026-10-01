// 萬物原理第九課：散射與天空顏色計算的檢查
import assert from 'node:assert/strict';
import { scatterRatio, tauAt, airMass, transmit, skyRadiance, skyColor, sunColor, sunSpectrum } from '../src/skycalc.js';

const near = (a, b, tol) => Math.abs(a - b) <= tol;
assert.ok(near(scatterRatio(450, 700), 5.86, 0.01));           // 藍 450 nm 比紅 700 nm 多散射約 5.9 倍
assert.ok(near(tauAt(550), 0.098, 0.005));                      // 綠光的光學厚度約 0.1
assert.ok(near(airMass(90), 1, 0.001));                         // 正上方＝1
assert.ok(near(airMass(30), 2.0, 0.01));                        // 30° 約 2 倍
assert.ok(near(airMass(0), 38, 0.2));                           // 地平線約 38 倍
assert.ok(transmit(460, 90) > 0.75 && transmit(650, 90) > 0.9); // 中午：大部分光都到得了
assert.ok(transmit(460, 0) < 0.01);                             // 日落：藍光幾乎全被散射掉
assert.ok(transmit(650, 0) > 0.1);                              // 紅光還剩一成多
assert.ok(sunSpectrum(410) < sunSpectrum(460));                 // 陽光的紫光本來就比藍光少
// 中午頭頂的天空：藍 > 綠 > 紅；沒有大氣：全黑
const noon = skyColor(70);
assert.ok(noon[2] > noon[1] && noon[1] > noon[0], `noon sky ${noon}`);
assert.deepEqual(skyColor(70, 90, false), [0, 0, 0]);
assert.ok(skyRadiance(460, 70) > skyRadiance(650, 70) * 3);
// 太陽本身：中午偏白、日落偏紅（紅 > 綠 > 藍）
const sNoon = sunColor(70), sSet = sunColor(1);
assert.ok(sNoon[2] > 0.6);
assert.ok(sSet[0] > sSet[1] && sSet[1] > sSet[2], `sunset sun ${sSet}`);
console.log('sky.test: all passed', noon.map((v) => v.toFixed(2)), sSet.map((v) => v.toFixed(2)));
