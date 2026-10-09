import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { remaining, halfLivesFrom, CLOCKS, ageYears, EARTH, fmtYears, daySeconds, clockText } from '../src/agecalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(remaining(0), 1); assert.equal(remaining(1), 0.5); assert.equal(remaining(2), 0.25); assert.equal(remaining(3), 0.125);
near(halfLivesFrom(0.5), 1, 1e-12); near(halfLivesFrom(0.25), 2, 1e-12); near(halfLivesFrom(remaining(1.7)), 1.7, 1e-9);
// 地球的年齡大約是鈾 238 的一個半衰期：鈾 238 大約剩一半
near(EARTH / CLOCKS.u238.half, 1.016, 0.001); near(remaining(EARTH / CLOCKS.u238.half), 0.495, 0.002);
assert.equal(ageYears('c14', 2), 11460); near(ageYears('u235', 1), 7.1e8, 1);
assert.equal(fmtYears(4.54e9).n, '4.54'); assert.equal(fmtYears(4.54e9).zhFull, '45.4 億年'); assert.equal(fmtYears(7.1e8).zhFull, '7.1 億年'); assert.equal(fmtYears(66e6).zhFull, '6,600 萬年'); assert.equal(fmtYears(11460).n, '11,460');
// 縮成一天：地球形成是 00:00:00，現在是午夜；人類只有最後幾秒
assert.equal(clockText(daySeconds(4540)), '00:00:00'); assert.equal(clockText(daySeconds(3480)).slice(0, 5), '05:36'); assert.equal(clockText(daySeconds(66)).slice(0, 5), '23:39');
near(86400 - daySeconds(0.3), 5.7, 0.05); assert.equal(clockText(daySeconds(0.3)), '23:59:54');
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'how-old-is-the-earth');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['fresh', 'half', 'old']); assert.ok(lesson.oneday.events.length >= 6); for (const e of lesson.oneday.events) assert.ok(e.ma >= 0 && e.ma <= 4540); }
console.log('age.test: all passed', clockText(daySeconds(538.8)), clockText(daySeconds(233)), clockText(daySeconds(4404)), lesson ? 'data ok' : 'no data yet');
