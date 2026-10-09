import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { LAPSE_UP, LAPSE_DOWN, dewPoint, cloudBase, tempAt, leeTemp, holds, MOUNTAIN_KM, rains, liters, rainClass, CLASSES } from '../src/raincalc.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(LAPSE_UP, 6.5); assert.equal(LAPSE_DOWN, 10);
near(dewPoint(30, 100), 30); near(dewPoint(30, 80), 26); near(dewPoint(30, 60), 22);
// 越潮溼，雲底越低；飽和的空氣一上升就成雲
near(cloudBase(30, 80), 500); near(cloudBase(30, 60), 1000); near(cloudBase(25, 100), 0);
assert.ok(cloudBase(30, 90) < cloudBase(30, 70));
near(tempAt(30, 2), 17); near(tempAt(28, 0), 28);
// 焚風：翻過山之後比原來熱（每公里淨多 3.5°C）
near(leeTemp(28, 2.5), 28 + 3.5 * 2.5); assert.ok(leeTemp(28, 2) > 28);
// 溫度每多 11°C，能裝的水氣多一倍
near(holds(31, 20), 2); near(holds(20, 20), 1); near(holds(9, 20), 0.5);
// 夠潮溼才會在山前成雲降雨
assert.ok(rains(28, 85) && rains(28, 60) && !rains(28, 50, 1)); assert.equal(MOUNTAIN_KM, 2.5);
// 雨量與分級（氣象署）
assert.equal(liters(1, 1), 1); assert.equal(liters(200, 60), 12000);
assert.equal(rainClass(79), 'none'); assert.equal(rainClass(80), 'heavy'); assert.equal(rainClass(200), 'extreme'); assert.equal(rainClass(350), 'torrential'); assert.equal(rainClass(500), 'super'); assert.equal(rainClass(0), 'none');
assert.deepEqual(CLASSES.map((c) => c.min), [0, 80, 200, 350, 500]);
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'why-it-rains');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['rain', 'heavy', 'dry', 'east']); assert.equal(lesson.gauge.areas.length, 4); assert.deepEqual(Object.keys(lesson.gauge.classes), CLASSES.map((c) => c.key)); }
console.log('rain.test: all passed', cloudBase(28, 75), leeTemp(28, 2.5).toFixed(1), lesson ? 'data ok' : 'no data yet');
