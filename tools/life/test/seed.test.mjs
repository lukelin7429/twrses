import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { check, awake, stage, rootLen, shootLen, leafSize, lunch, holding } from '../src/seedcalc.js';

assert.equal(check(10, 25), 'dry'); assert.equal(check(95, 25), 'drowned'); assert.equal(check(60, 4), 'cold'); assert.equal(check(60, 38), 'hot'); assert.equal(check(60, 25), 'go');
assert.equal(awake(60, 25), true); assert.equal(awake(0, 25), false);
assert.equal(stage(0), 'sleep'); assert.equal(stage(10), 'swell'); assert.equal(stage(30), 'root'); assert.equal(stage(60), 'shoot'); assert.equal(stage(100), 'leaves');
// 先長根、再長芽、最後才有葉子
assert.ok(rootLen(30) > 0 && shootLen(30) === 0); assert.ok(shootLen(60) > 0 && leafSize(60) === 0); assert.equal(leafSize(100), 1); assert.equal(rootLen(100), 1);
for (let g = 0; g < 100; g++) assert.ok(lunch(g + 1) <= lunch(g));
assert.equal(lunch(0), 100); assert.equal(lunch(100), 0);
assert.equal(holding(10, 25, 50, true), 'dry'); assert.equal(holding(60, 25, 0, true), 'sleep'); assert.equal(holding(60, 25, 30, false), 'root');
assert.equal(holding(60, 25, 60, false), 'pale'); assert.equal(holding(60, 25, 90, true), 'leaves');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'how-a-seed-grows');
if (lesson) {
  assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['cold', 'drowned', 'dry', 'hot', 'leaves', 'pale', 'root', 'shoot', 'sleep', 'swell']);
  for (const it of lesson.waker.items) assert.equal(check(it.water, it.temp), it.result, it.key);
}
console.log('seed.test: all passed', lesson ? 'data ok' : 'no data yet');
