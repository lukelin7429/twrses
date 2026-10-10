import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { stroke, wingAngle, fold, forces, path, effort, holding } from '../src/birdcalc.js';

assert.equal(stroke(0.1), 'down'); assert.equal(stroke(0.6), 'up'); assert.equal(stroke(1.2), 'down');
assert.equal(wingAngle(0), 50); assert.equal(wingAngle(0.5), -50); assert.ok(Math.abs(wingAngle(0.25)) < 0.01);
assert.equal(fold(0.2), 0); assert.equal(fold(0.75), 1); assert.ok(fold(0.55) > 0 && fold(0.55) < 1);
// 一個循環平均下來，升力大約等於體重、推力大約等於阻力
const d = forces('flap', 0.2), u = forces('flap', 0.7);
assert.ok(Math.abs((d.lift + u.lift) / 2 - d.weight) < 0.05); assert.ok((d.thrust + u.thrust) / 2 >= d.drag);
assert.ok(d.thrust > u.thrust && d.lift > u.lift);
assert.equal(forces('glide', 0).thrust, 0); assert.ok(forces('glide', 0).lift < 1); assert.ok(forces('soar', 0).updraft > 0);
assert.equal(path('flap'), 'level'); assert.equal(path('glide'), 'sinking'); assert.equal(path('soar'), 'rising');
assert.equal(effort('flap'), 'high'); assert.equal(effort('soar'), 'low');
assert.equal(holding('flap', 0.1), 'down'); assert.equal(holding('flap', 0.9), 'up'); assert.equal(holding('glide', 0.1), 'glide'); assert.equal(holding('soar', 0.9), 'soar');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((x) => x.lessons).find((l) => l.slug === 'how-birds-fly');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['down', 'glide', 'soar', 'up']); assert.equal(lesson.wings.items.length, 4); }
console.log('bird.test: all passed', lesson ? 'data ok' : 'no data yet');
