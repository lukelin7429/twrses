import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { stomata, flow, holding, timesLimit } from '../src/treecalc.js';

assert.equal(stomata(0, 80), 0); assert.equal(stomata(80, 10), 0); assert.equal(stomata(80, 80), 1); assert.ok(stomata(80, 30) > 0 && stomata(80, 30) < 1);
assert.equal(flow(0, 40, 80), 0); assert.equal(flow(80, 40, 5), 0);
// 太陽愈大、空氣愈乾，水走得愈快
assert.ok(flow(100, 30, 80) > flow(50, 30, 80)); assert.ok(flow(80, 20, 80) > flow(80, 90, 80)); assert.ok(flow(80, 100, 80) > 0);
for (const s of [0, 30, 70, 100]) for (const h of [0, 50, 100]) for (const w of [0, 30, 100]) { const f = flow(s, h, w); assert.ok(f >= 0 && f <= 1); }
assert.equal(holding(0, 40, 80), 'dark'); assert.equal(holding(80, 40, 10), 'dry'); assert.equal(holding(80, 95, 80), 'humid'); assert.equal(holding(90, 30, 80), 'fast'); assert.equal(holding(30, 60, 80), 'slow');
assert.equal(timesLimit(10), 1); assert.equal(timesLimit(84.1), 8.4); assert.equal(timesLimit(116), 11.6);
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'how-water-climbs-a-tree');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['dark', 'dry', 'fast', 'humid', 'slow']);
console.log('tree.test: all passed', lesson ? 'data ok' : 'no data yet');
