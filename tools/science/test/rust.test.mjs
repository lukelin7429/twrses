// 萬物原理第十九課：生鏽模型的檢查
import assert from 'node:assert/strict';
import { speed, exposed, progress, rusted, T_MAX, SCRATCH } from '../src/rustcalc.js';

const wet = { water: true, air: true }, salt = { water: true, air: true, salt: true };
// 三樣缺一樣就不會鏽
assert.equal(rusted(T_MAX, { water: false, air: true }), 0);
assert.equal(rusted(T_MAX, { water: true, air: false }), 0);
assert.equal(rusted(T_MAX, { water: false, air: true, salt: true }), 0);     // 乾的鹽也沒用
assert.ok(rusted(30, wet) > 0.6 && rusted(30, wet) < 0.9);
// 鹽水比清水快
for (let t = 5; t <= T_MAX; t += 5) assert.ok(rusted(t, salt) > rusted(t, wet));
assert.ok(speed(salt) > speed(wet));
assert.ok(rusted(10, salt) > 0.7);
// 一直在增加，不會超過 1
for (let t = 0; t < T_MAX; t += 3) assert.ok(rusted(t + 3, wet) > rusted(t, wet) && rusted(t + 3, wet) <= 1);
// 油漆：完整時不鏽；刮傷只鏽刮痕；鍍鋅刮傷了也不鏽
assert.equal(rusted(T_MAX, { ...salt, coat: 'paint' }), 0);
assert.equal(rusted(T_MAX, { ...salt, coat: 'zinc' }), 0);
const sc = rusted(T_MAX, { ...salt, coat: 'scratch' });
assert.ok(sc > 0 && sc <= SCRATCH);
assert.equal(exposed('none'), 1);
assert.ok(progress(T_MAX, { ...wet, coat: 'scratch' }) > 0.9);                 // 刮痕那一小塊還是照樣鏽
console.log('rust.test: all passed', rusted(30, wet).toFixed(2), rusted(10, salt).toFixed(2), sc.toFixed(2));
