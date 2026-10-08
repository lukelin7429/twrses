import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TILES, CHAIN, CHIPS, total, busy, finishTime, done, amdahl, amdahlMax } from '../src/aicalc.js';

assert.equal(TILES, 576); assert.equal(CHAIN, 48);
assert.equal(CHIPS.cpu.cores, 4); assert.ok(CHIPS.gpu.cores > 100 * CHIPS.cpu.cores);
assert.ok(CHIPS.cpu.rate > CHIPS.gpu.rate);                              // 一個 CPU 核心比一個 GPU 小單元快
// 畫圖：GPU 贏很多
assert.equal(finishTime('paint', 'cpu'), 12); assert.equal(finishTime('paint', 'gpu'), 1);
// 一串步驟：一次只能一個單元做，CPU 贏
assert.equal(busy('chain', 'gpu'), 1);
assert.equal(finishTime('chain', 'cpu'), 4); assert.equal(finishTime('chain', 'gpu'), 48);
assert.ok(finishTime('chain', 'cpu') < finishTime('chain', 'gpu') && finishTime('paint', 'gpu') < finishTime('paint', 'cpu'));
assert.equal(done('paint', 'cpu', 6), 288); assert.equal(done('paint', 'gpu', 99), total('paint')); assert.equal(done('chain', 'cpu', -1), 0);
// 阿姆達爾定律（維基百科的兩個例子：50% → 最多 2 倍；95% → 最多 20 倍）
assert.ok(Math.abs(amdahlMax(0.5) - 2) < 1e-12); assert.ok(Math.abs(amdahlMax(0.95) - 20) < 1e-9);
assert.equal(amdahl(1, 64), 64); assert.equal(amdahl(0, 1000), 1); assert.equal(amdahlMax(1), Infinity);
assert.ok(amdahl(0.95, 1024) < 20 && amdahl(0.95, 1024) > 19); assert.ok(amdahl(0.5, 1024) < 2);
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'ai-chip');
if (lesson) { assert.equal(Object.keys(lesson.lab.msgs).length, 4); assert.equal(lesson.amd.presets.length, 3); }
console.log('ai.test: all passed', amdahl(0.95, 1024).toFixed(1), lesson ? 'data ok' : 'no data yet');
