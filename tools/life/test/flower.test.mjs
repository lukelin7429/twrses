import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { stage, tubeLen, fruit, SENT, HIT, landed, holding, carrier } from '../src/flowercalc.js';

assert.equal(stage(0), 'carry'); assert.equal(stage(35), 'land'); assert.equal(stage(50), 'tube'); assert.equal(stage(100), 'seed');
// 花粉先到柱頭，花粉管才開始長；管子長到底，果實才開始長
assert.equal(tubeLen(42), 0); assert.equal(tubeLen(78), 1); assert.equal(fruit(78), 0); assert.equal(fruit(100), 1);
assert.equal(landed('bee', 10), 0); assert.equal(landed('bee', 40), HIT.bee); assert.equal(landed('wind', 40), 1);
assert.ok(HIT.wind / SENT.wind < HIT.bee / SENT.bee);
assert.equal(holding('bee', 5), 'b_carry'); assert.equal(holding('wind', 5), 'w_carry'); assert.equal(holding('wind', 35), 'w_land'); assert.equal(holding('bee', 60), 'tube'); assert.equal(holding('wind', 90), 'seed');
assert.equal(carrier({ petals: true, nectar: true, dust: false }), 'animal'); assert.equal(carrier({ petals: false, nectar: false, dust: true }), 'wind');
assert.equal(carrier({ petals: true, nectar: false, dust: true }), 'mixed'); assert.equal(carrier({ petals: false, nectar: false, dust: false }), 'none');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'why-flowers-bloom');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['b_carry', 'b_land', 'seed', 'tube', 'w_carry', 'w_land']); assert.deepEqual(Object.keys(lesson.guesser.kinds).sort(), ['animal', 'mixed', 'none', 'wind']); }
console.log('flower.test: all passed', lesson ? 'data ok' : 'no data yet');
