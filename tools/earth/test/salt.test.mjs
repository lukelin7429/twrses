import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { SEA, DEAD, RIVER, grams, salinity, saltDots } from '../src/saltcalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(grams(1, SEA), 35); assert.equal(grams(2, SEA), 70); near(grams(1, DEAD), 342, 1e-9); assert.ok(grams(1, RIVER) < 1);
near(DEAD / SEA, 9.8, 0.2);                                         // 死海大約是海水的十倍鹹
// 海：從 0 慢慢升到 3.5，不會超過；有出口的湖：一直很淡
assert.equal(salinity('sea', 0), 0); near(salinity('sea', 1), SEA, 1e-9); assert.ok(salinity('sea', 0.3) < salinity('sea', 0.6));
for (let t = 0; t <= 1; t += 0.05) { assert.ok(salinity('sea', t) <= SEA + 1e-9); assert.ok(salinity('lake', t) < 0.05); }
assert.equal(saltDots('sea', 1, 120), 120); assert.equal(saltDots('sea', 0, 120), 0); assert.ok(saltDots('lake', 1, 120) <= 1);
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'why-the-sea-is-salty');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs), ['young', 'today', 'lake']);
console.log('salt.test: all passed', salinity('sea', 0.5).toFixed(2), lesson ? 'data ok' : 'no data yet');
