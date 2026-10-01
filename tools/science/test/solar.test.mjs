// 萬物原理第三課：光電計算的檢查
import assert from 'node:assert/strict';
import { evOf, canFree, split, depthRange, tempFactor, sunEfficiency, GAP_EV } from '../src/pv.js';

// 能隙約 1.1 eV ↔ 約 1,100 nm：紅外線（1,300 nm）放不出電子，紅綠藍都可以
assert.ok(Math.abs(evOf(1127) - GAP_EV) < 0.01);
assert.equal(canFree('ir'), false);
for (const k of ['red', 'green', 'blue']) assert.equal(canFree(k), true);
// 藍光能量比紅光大，所以變成熱的部分也比較多；變成電的都一樣 0.6 eV
assert.ok(split('blue').e > split('red').e);
assert.ok(split('blue').heat > split('red').heat);
assert.equal(split('blue').elec, split('red').elec);
// 能量守恆：電＋熱＋穿過＝光子能量
for (const k of ['ir', 'red', 'green', 'blue']) { const s = split(k); assert.ok(Math.abs(s.elec + s.heat + s.through - s.e) < 1e-12); }
// 藍光吸收得比紅光淺
assert.ok(depthRange('blue')[1] < depthRange('red')[0] + 0.01);
// 溫度：25 °C 不變，65 °C 少 16%
assert.equal(tempFactor(25), 1);
assert.ok(Math.abs(tempFactor(65) - 0.84) < 1e-9);
// 模型裡陽光變成電的比例落在真實太陽能板的兩成左右（15–25%）
const eff = sunEfficiency();
assert.ok(eff > 0.15 && eff < 0.25, `efficiency ${eff}`);
console.log('solar.test: all passed (model efficiency ' + (eff * 100).toFixed(1) + '%)');
