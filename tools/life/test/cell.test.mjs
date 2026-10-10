import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { PARTS, PLANT_ONLY, has, kindOf } from '../src/cellcalc.js';

// 動物細胞有的，植物細胞都有；植物多三樣
for (const p of PARTS.animal) assert.ok(has('plant', p), p);
assert.deepEqual(PARTS.plant.filter((p) => !has('animal', p)).sort(), [...PLANT_ONLY].sort());
assert.equal(has('animal', 'wall'), false); assert.equal(has('plant', 'chloroplast'), true);
assert.equal(kindOf({ wall: false, chloroplast: false, vacuole: false }), 'animal');
assert.equal(kindOf({ wall: true, chloroplast: true, vacuole: true }), 'green');
assert.equal(kindOf({ wall: true, chloroplast: false, vacuole: true }), 'root');
assert.equal(kindOf({ wall: false, chloroplast: true, vacuole: false }), 'odd');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'what-is-a-cell');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), [...PARTS.plant].sort()); assert.deepEqual(Object.keys(lesson.sorter.kinds).sort(), ['animal', 'green', 'odd', 'root']); }
console.log('cell.test: all passed', lesson ? 'data ok' : 'no data yet');
