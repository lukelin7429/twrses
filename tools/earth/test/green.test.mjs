import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { T_NONE, T_TODAY, WARMING, GAS, REFLECT, catchChance, returnChance, tries } from '../src/greencalc.js';

assert.equal(T_NONE, -18); assert.equal(T_TODAY, 15); assert.equal(WARMING, 33);
assert.ok(Math.abs(REFLECT - 1 / 3) < 1e-12);
// 沒有溫室氣體：什麼都攔不到，熱直接逃走；氣體越多，攔到的越多、回到地面的越多
assert.equal(catchChance('none'), 0); assert.equal(returnChance('none'), 0); assert.equal(tries('none'), 1);
assert.equal(catchChance('today'), 0.5); assert.equal(returnChance('today'), 0.25);
assert.ok(catchChance('more') > catchChance('today') && catchChance('more') < 1);
assert.ok(tries('more') > tries('today') && tries('today') > tries('none'));
assert.deepEqual(Object.keys(GAS), ['none', 'today', 'more']);
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'greenhouse-effect');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['none', 'today', 'more']); assert.equal(lesson.blanket.worlds.length, 3); }
console.log('green.test: all passed', catchChance('more').toFixed(3), tries('more').toFixed(2), lesson ? 'data ok' : 'no data yet');
