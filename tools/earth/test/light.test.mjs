import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { SOUND, thunderDelay, lightDelay, distanceM, chargeStep, boltPath, CHARGE_TIME } from '../src/lightcalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(SOUND, 340);
near(thunderDelay(1), 2.94, 0.01); near(thunderDelay(5), 14.7, 0.01);        // 1 公里大約 3 秒
assert.equal(distanceM(3), 1020); assert.equal(distanceM(0), 0);
assert.ok(lightDelay(5) < 0.0001);                                           // 光幾乎立刻到
near(distanceM(thunderDelay(2.5)), 2500, 1e-6);
let c = 0; for (let i = 0; i < CHARGE_TIME * 10 + 1; i++) c = chargeStep(c, 0.1); assert.equal(c, 1);
const p = boltPath([0, 5], [1, 0], 12, 3);
assert.equal(p.length, 13); assert.deepEqual(p[0].map((x) => +x.toFixed(6)), [0, 5]); near(p[12][0], 1, 1e-9); near(p[12][1], 0, 1e-9);
assert.deepEqual(boltPath([0, 5], [1, 0], 12, 3), p); assert.notDeepEqual(boltPath([0, 5], [1, 0], 12, 4), p);
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'lightning-and-thunder');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs), ['charge', 'flash', 'travel', 'heard']);
console.log('light.test: all passed', thunderDelay(1).toFixed(2), lesson ? 'data ok' : 'no data yet');
