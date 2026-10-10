import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { MAX_GEN, cells, minutes, slot, stage, copiesShown, virusCount, COPIES, holding, acrossMm, timesBigger } from '../src/germcalc.js';

assert.equal(cells(0), 1); assert.equal(cells(1), 2); assert.equal(cells(5), 32); assert.equal(cells(2.7), 4);
assert.equal(minutes(3), 60); assert.equal(minutes(5), 100);
// 每一代的位置都不重複；孩子的中點就是父母的位置
for (let g = 0; g <= MAX_GEN; g++) {
  const seen = new Set(); for (let i = 0; i < 2 ** g; i++) seen.add(slot(i, g).map((v) => v.toFixed(2)).join());
  assert.equal(seen.size, 2 ** g, `gen ${g}`);
}
for (let g = 0; g < MAX_GEN; g++) for (let i = 0; i < 2 ** g; i++) {
  const p = slot(i, g), a = slot(2 * i, g + 1), b = slot(2 * i + 1, g + 1);
  for (let k = 0; k < 3; k++) assert.ok(Math.abs((a[k] + b[k]) / 2 - p[k]) < 1e-9);
}
assert.equal(stage(0), 'land'); assert.equal(stage(30), 'inject'); assert.equal(stage(50), 'copy'); assert.equal(stage(100), 'burst');
assert.equal(copiesShown(40), 0); assert.equal(copiesShown(45), 1); assert.equal(copiesShown(79), COPIES); assert.equal(copiesShown(100), COPIES);
assert.equal(virusCount(10), 1); assert.equal(virusCount(90), 8);
assert.equal(holding('bacteria', 0), 'b_one'); assert.equal(holding('bacteria', 2), 'b_some'); assert.equal(holding('bacteria', 2.5), 'b_split'); assert.equal(holding('bacteria', 5), 'b_full');
assert.equal(holding('virus', 0), 'v_land'); assert.equal(holding('virus', 60), 'v_copy'); assert.equal(holding('virus', 95), 'v_burst');
assert.equal(acrossMm(5000), 200); assert.equal(acrossMm(500), 2000); assert.equal(acrossMm(300), 3333); assert.equal(acrossMm(20), 50000);
assert.equal(timesBigger(2000, 20), 100);
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'bacteria-and-viruses');
if (lesson) {
  assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['b_full', 'b_one', 'b_some', 'b_split', 'v_burst', 'v_copy', 'v_inject', 'v_land']);
  for (const it of lesson.ruler.items) assert.ok(it.nm >= 20 && it.nm <= 5000);
}
console.log('germ.test: all passed', lesson ? 'data ok' : 'no data yet');
