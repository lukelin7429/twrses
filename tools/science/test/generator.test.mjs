// 萬物原理第二課：發電機計算的檢查
import assert from 'node:assert/strict';
import { emf, flipsPerSecond, realRpm, meanPower, REAL_HZ } from '../src/grid.js';

const close = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
// 不轉就沒有電；N 極正對線圈（θ=0）那一刻電壓是零、轉過 90° 時最大
close(emf(0, 1.2, 2), 0);
close(emf(1, 0, 2), 0);
close(emf(2, Math.PI / 2, 2), 1);
close(emf(2, Math.PI * 1.5, 2), -1);
// 一圈裡的電壓平均是零（交流電一下正一下負）
let s = 0; for (let i = 0; i < 360; i++) s += emf(1, (i + 0.5) / 360 * Math.PI * 2, 2); close(s, 0, 1e-9);
// 60 Hz：電流每秒換 120 次方向；兩極 3,600 rpm、四極 1,800 rpm
assert.equal(REAL_HZ, 60);
assert.equal(flipsPerSecond(REAL_HZ), 120);
assert.equal(realRpm(2), 3600);
assert.equal(realRpm(4), 1800);
// 轉速加倍，平均功率變四倍（電壓加倍，功率 ∝ 電壓²）
close(meanPower(1, 2) * 4, meanPower(2, 2), 1e-9);
close(meanPower(2, 2), 0.5, 1e-9);
console.log('generator.test: all passed');
