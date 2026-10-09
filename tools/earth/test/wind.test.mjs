import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { beaufortSpeed, BEAUFORT_MIN, BEAUFORT_MAX, forceOf, kmh, DAY, YEAR, breeze } from '../src/windcalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
// 經驗式和表大致對得上：每一級算出來的風速落在那一級的範圍附近
for (let B = 1; B <= 12; B++) assert.ok(beaufortSpeed(B) >= BEAUFORT_MIN[B] - 0.4 && beaufortSpeed(B) <= BEAUFORT_MAX[B] + 0.4, `${B} ${beaufortSpeed(B)}`);
assert.equal(BEAUFORT_MIN.length, 13); assert.equal(forceOf(0), 0); assert.equal(forceOf(3.4), 3); assert.equal(forceOf(17.2), 8); assert.equal(forceOf(40), 12); assert.equal(forceOf(10.7), 5);
near(kmh(10), 36, 1e-9);
// 一天：下午陸地比海熱 → 海風，而且是 3–4 級；半夜陸地比海冷 → 陸風，1–2 級
const pm = breeze('day', 15), am = breeze('day', 3);
assert.equal(pm.dir, 'onshore'); assert.ok(pm.force >= 3 && pm.force <= 4); assert.ok(pm.land > pm.sea);
assert.equal(am.dir, 'offshore'); assert.ok(am.force >= 1 && am.force <= 2); assert.ok(am.land < am.sea);
assert.ok(DAY.land(15) - DAY.land(3) > DAY.sea(17) - DAY.sea(5));           // 陸地的變化比海大
// 一年：冬天大陸冷 → 風從陸地吹向海（東北季風）；夏天相反
const jan = breeze('year', 1), jul = breeze('year', 7);
assert.equal(jan.dir, 'offshore'); assert.equal(jul.dir, 'onshore'); assert.ok(jan.force > jul.force);
assert.ok(YEAR.land(7) - YEAR.land(1) > YEAR.sea(8) - YEAR.sea(2));
// 一天之中總有兩次風停下來（溫差很小的時候）
assert.ok([...Array(96).keys()].some((i) => breeze('day', i / 4).dir === 'calm'));
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'why-wind-blows');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['onshore', 'offshore', 'calm', 'monsoon']); assert.equal(lesson.beaufort.levels.length, 13); }
console.log('wind.test: all passed', pm.force, am.force, jan.force, jul.force, lesson ? 'data ok' : 'no data yet');
