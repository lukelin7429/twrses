import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fresh, timesUsed, ISO, cleaner, TOOL_MW } from '../src/fabcalc.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(fresh(100, 0), 100); near(fresh(100, 0.85), 15); near(fresh(100, 0.5), 50);
assert.equal(timesUsed(0), 1); near(timesUsed(0.5), 2); near(timesUsed(0.85), 6.666666666667, 1e-9); near(timesUsed(0.9), 10);
// ISO 表：每升一級多十倍；ISO 9 相當於一般室內空氣
assert.equal(ISO[9], 35200000); assert.equal(ISO[5], 3520); assert.equal(ISO[3], 35);
for (let n = 5; n <= 9; n++) assert.equal(ISO[n], ISO[n - 1] * 10);
assert.equal(cleaner(5), 10000); assert.equal(cleaner(9), 1);
// EUV 至少是 DUV 的 10 倍
assert.ok(TOOL_MW.euv / TOOL_MW.duv >= 10 && TOOL_MW.euv / TOOL_MW.duv < 10.1);
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'fab-water-power');
if (lesson) { assert.equal(Object.keys(lesson.lab.msgs).length, 4); assert.equal(lesson.clean.rooms.length, 5); for (const r of lesson.clean.rooms) assert.ok(ISO[r.iso], r.iso); }
console.log('fab.test: all passed', timesUsed(0.85).toFixed(1), lesson ? 'data ok' : 'no data yet');
