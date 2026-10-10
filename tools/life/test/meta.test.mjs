import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { stage, instar, larvaSize, larvalLeft, adultBuilt, wingSpread, holding, cycle, INSTARS } from '../src/metacalc.js';

assert.equal(stage(0), 'egg'); assert.equal(stage(20), 'larva'); assert.equal(stage(60), 'pupa'); assert.equal(stage(95), 'adult');
assert.equal(instar(5), 0); assert.equal(instar(10), 1); assert.equal(instar(49.9), INSTARS); assert.equal(instar(60), 0);
let prev = 0; for (let t = 10; t < 50; t++) { assert.ok(instar(t) >= prev); prev = instar(t); assert.ok(larvaSize(t) > 0 && larvaSize(t) <= 1); }
// 蛹期：先拆，後蓋；拆完的時候成蟲還沒蓋好
assert.equal(larvalLeft(50), 1); assert.equal(larvalLeft(78), 0); assert.ok(larvalLeft(66) > 0.3); assert.equal(adultBuilt(58), 0); assert.equal(adultBuilt(85), 1); assert.ok(adultBuilt(70) < 1);
assert.equal(wingSpread(85), 0); assert.equal(wingSpread(94), 1);
assert.equal(holding(5, false), 'egg'); assert.equal(holding(30, true), 'larva'); assert.equal(holding(60, false), 'pupa'); assert.equal(holding(60, true), 'pupa_in'); assert.equal(holding(88, false), 'adult_new'); assert.equal(holding(99, false), 'adult');
assert.equal(cycle('complete').length, 4); assert.deepEqual(cycle('incomplete'), ['egg', 'nymph', 'adult']);
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((x) => x.lessons).find((l) => l.slug === 'caterpillar-to-butterfly');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['adult', 'adult_new', 'egg', 'larva', 'pupa', 'pupa_in']); for (const it of lesson.cycles.items) assert.ok(['complete', 'incomplete'].includes(it.kind)); }
console.log('meta.test: all passed', lesson ? 'data ok' : 'no data yet');
