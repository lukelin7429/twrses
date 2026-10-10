import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { PER_SUGAR, recipe, stomata, stomataOpen, co2In, rate, holding } from '../src/photocalc.js';

assert.equal(PER_SUGAR, 6); assert.deepEqual(recipe(1), { co2: 6, water: 6, oxygen: 6, sugar: 1 }); assert.deepEqual(recipe(5), { co2: 30, water: 30, oxygen: 30, sugar: 5 });
// 原子數兩邊要相等：6 CO2 + 6 H2O → C6H12O6 + 6 O2
const C = 6, H = 12, O = 6 * 2 + 6; assert.equal(C, 6); assert.equal(H, 6 * 2); assert.equal(O, 6 + 6 * 2);
// 氣孔：水夠就全開，缺水就關小
assert.equal(stomata(100), 1); assert.equal(stomata(60), 1); assert.equal(stomata(30), 0.5); assert.equal(stomata(0), 0);
assert.equal(stomataOpen(0, 100), 0); assert.equal(stomataOpen(80, 100), 1); assert.equal(stomataOpen(80, 30), 0.5);
assert.equal(co2In(80, 100), 80); assert.equal(co2In(80, 30), 40);
// 最缺的那一樣決定快慢
assert.equal(rate(100, 100, 100), 100); assert.equal(rate(20, 100, 100), 20); assert.equal(rate(100, 30, 100), 30); assert.equal(rate(100, 100, 0), 0); assert.equal(rate(0, 100, 100), 0);
assert.ok(rate(100, 100, 30) < rate(100, 100, 80));
// 加再多不缺的東西也沒有用
assert.equal(rate(20, 50, 100), rate(20, 100, 100));
assert.equal(holding(0, 100, 100), 'dark'); assert.equal(holding(30, 100, 100), 'light'); assert.equal(holding(100, 20, 100), 'co2'); assert.equal(holding(100, 100, 20), 'water'); assert.equal(holding(90, 90, 90), 'go');
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'how-leaves-make-food');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs), ['go', 'light', 'co2', 'water', 'dark']);
console.log('photo.test: all passed', rate(60, 60, 60), lesson ? 'data ok' : 'no data yet');
