import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { chlorophyll, carotenoid, anthocyanin, stage, mix, leafColor, hex, holding, look } from '../src/autumncalc.js';

assert.equal(chlorophyll(0), 1); assert.equal(chlorophyll(70), 0); assert.equal(carotenoid(0), 1); assert.equal(carotenoid(60), 1);
// 黃色一直都在：葉綠素退掉的時候，類胡蘿蔔素還是滿的
assert.ok(chlorophyll(60) < 0.1 && carotenoid(60) === 1);
assert.equal(anthocyanin(80, 'yellow', true), 0); assert.ok(anthocyanin(80, 'red', true) > 0.9); assert.ok(anthocyanin(80, 'red', false) < anthocyanin(80, 'red', true)); assert.equal(anthocyanin(20, 'red', true), 0);
assert.equal(stage(0), 'summer'); assert.equal(stage(40), 'fading'); assert.equal(stage(75), 'color'); assert.equal(stage(95), 'fall');
const isGreen = (c) => c[1] > c[0] && c[1] > c[2], isRed = (c) => c[0] > c[1] * 2.4, isYellow = (c) => c[0] > 180 && c[1] > 140 && c[2] < 110;
assert.ok(isGreen(leafColor(0, 'red', true))); assert.ok(isGreen(leafColor(10, 'yellow', true)));
assert.ok(isYellow(leafColor(75, 'yellow', true)), String(leafColor(75, 'yellow', true)));
assert.ok(isRed(leafColor(78, 'red', true)), String(leafColor(78, 'red', true)));
assert.ok(!isRed(leafColor(78, 'red', false)), String(leafColor(78, 'red', false)));
assert.equal(hex([255, 0, 16]), '#ff0010'); assert.deepEqual(mix(1, 1, 0).length, 3);
assert.equal(holding(10, 'red', true), 'summer'); assert.equal(holding(40, 'red', true), 'fading'); assert.equal(holding(75, 'yellow', true), 'yellow'); assert.equal(holding(75, 'red', true), 'red'); assert.equal(holding(75, 'red', false), 'dull'); assert.equal(holding(95, 'red', true), 'fall');
assert.equal(look(1, 1, 0), 'green'); assert.equal(look(0, 1, 0), 'yellow'); assert.equal(look(0, 1, 1), 'red'); assert.equal(look(0, 0.8, 0.3), 'orange'); assert.equal(look(0, 0, 0), 'brown');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'why-leaves-change-color');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['dull', 'fading', 'fall', 'red', 'summer', 'yellow']); assert.deepEqual(Object.keys(lesson.mixer.looks).sort(), ['brown', 'green', 'orange', 'red', 'yellow']); }
console.log('autumn.test: all passed', lesson ? 'data ok' : 'no data yet');
