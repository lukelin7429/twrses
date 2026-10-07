// 萬物原理第二十課：微波爐模型的檢查
import assert from 'node:assert/strict';
import { intensity, spread, tempAt, dose, SPOT_CM, WAVELENGTH_CM, FREQ_GHZ, TURN_PERIOD } from '../src/microcalc.js';

// 波長 × 頻率 ≈ 光速（12.2 cm × 2.45 GHz ≈ 3.0 × 10^8 m/s）
assert.ok(Math.abs(WAVELENGTH_CM / 100 * FREQ_GHZ * 1e9 - 2.998e8) / 2.998e8 < 0.01);
assert.ok(Math.abs(SPOT_CM - 6.1) < 0.01);
// 熱點每半個波長重複一次；平均強度是 1；有冷點（0）也有熱點（4）
assert.ok(Math.abs(intensity(1.3, 2.2) - intensity(1.3 + SPOT_CM, 2.2 - SPOT_CM)) < 1e-9);
let sum = 0, n = 0, lo = 9, hi = 0;
for (let x = 0; x < WAVELENGTH_CM; x += 0.1) for (let z = 0; z < WAVELENGTH_CM; z += 0.1) { const v = intensity(x, z); sum += v; n++; lo = Math.min(lo, v); hi = Math.max(hi, v); }
assert.ok(Math.abs(sum / n - 1) < 0.01 && lo < 0.01 && hi > 3.9);
// 沒有轉盤：冷熱差很多；有轉盤：差距小很多
const off = spread('food', 60, false), on = spread('food', 60, true);
assert.ok(off.max - off.min > 50, `off ${off.min} ${off.max}`);
assert.ok(on.max - on.min < (off.max - off.min) * 0.6, `on ${on.min} ${on.max}`);
assert.ok(on.min > off.min);                                       // 最冷的那一口也比較熱
// 含水的食物熱得快；冰很慢、兩分鐘後還是冰的；空盤子幾乎不變
assert.ok(spread('food', 90, true).mean > 60);
assert.ok(spread('ice', 120, true).max <= 0 && spread('ice', 120, true).mean > -18);
assert.ok(spread('plate', 120, true).mean < 24);
assert.ok(spread('food', 300, true).max <= 100);                   // 水到 100°C 就不再往上
// 轉滿一圈之後，同一圈上的每一點吸收的一樣多
assert.ok(Math.abs(dose(7.2, 0.3, TURN_PERIOD, true) - dose(7.2, 2.1, TURN_PERIOD, true)) < 0.2);
assert.equal(tempAt('food', 3.6, 1, 0, true), 20);
console.log('micro.test: all passed', off.min.toFixed(0), off.max.toFixed(0), on.min.toFixed(0), on.max.toFixed(0), spread('food', 90, true).mean.toFixed(0));
