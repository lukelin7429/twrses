import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { at, gap, moving, taken, bloodDir, holding } from '../src/gillcalc.js';

assert.deepEqual(at('counter', 0), { water: 100, blood: 85 }); assert.deepEqual(at('counter', 1), { water: 15, blood: 0 });
// 逆流：整條路上水都比血多，所以一路都在交換
for (let i = 0; i <= 10; i++) { assert.equal(gap('counter', i / 10), 15); assert.ok(moving('counter', i / 10)); }
// 順流：一開始差很多，後來兩邊一樣，交換停止；永遠拿不到超過一半
assert.deepEqual(at('same', 0), { water: 100, blood: 0 }); assert.ok(gap('same', 1) < 2); assert.ok(!moving('same', 1)); assert.ok(moving('same', 0.1));
for (let i = 0; i <= 10; i++) assert.ok(at('same', i / 10).blood <= 50);
assert.equal(taken('counter'), 85); assert.ok(taken('same') <= 50 && taken('same') >= 45); assert.ok(taken('counter') > 80);
assert.equal(bloodDir('counter'), -1); assert.equal(bloodDir('same'), 1);
assert.equal(holding('counter', 0.2), 'c_start'); assert.equal(holding('counter', 0.9), 'c_end'); assert.equal(holding('same', 0.05), 's_start'); assert.equal(holding('same', 0.9), 's_stuck');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((x) => x.lessons).find((l) => l.slug === 'how-fish-breathe');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['c_end', 'c_start', 's_start', 's_stuck']); assert.equal(lesson.breathers.items.length, 4); }
console.log('gill.test: all passed', lesson ? 'data ok' : 'no data yet');
