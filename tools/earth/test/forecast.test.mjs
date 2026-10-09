import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { EPS, MAIN, frontX, rainingAt, rainInPeriod, runsWithRain, pop, periodOf, skyWord, TOWN_X, LEAD, PERIOD, HOURS } from '../src/forecastcalc.js';

assert.equal(EPS.length, 10); assert.ok(Math.abs(EPS.reduce((a, b) => a + b, 0)) < 1e-9);
// 沒有誤差的話，雨帶剛好在 LEAD 小時後到
for (const k of ['near', 'far']) assert.ok(Math.abs((TOWN_X - frontX(MAIN, k, 0)) / 0.25 - LEAD[k]) < 1e-9);
assert.equal(rainingAt(MAIN, 'near', 0), false); assert.equal(rainingAt(MAIN, 'near', 13), true);
const near = [...Array(HOURS / PERIOD).keys()].map((p) => pop('near', p)), far = [...Array(HOURS / PERIOD).keys()].map((p) => pop('far', p));
// 快到的雨帶：十次都同意（有一個時段 100%）；還很遠的雨帶：分散在好幾個時段，沒有一個時段是 100%
assert.equal(Math.max(...near), 100); assert.ok(Math.max(...far) < 100 && Math.max(...far) >= 40);
assert.ok(far.filter((x) => x > 0).length > near.filter((x) => x > 0).length);
assert.equal(runsWithRain('near', 5), 0);
assert.equal(periodOf(0), 0); assert.equal(periodOf(12), 1); assert.equal(periodOf(71.9), 5); assert.equal(periodOf(72), 5);
assert.equal(rainInPeriod(MAIN, 'far', 4), true);
// 天空狀況用詞
assert.equal(skyWord(0), 'sunny'); assert.equal(skyWord(4), 'sunny'); assert.equal(skyWord(5), 'cloudy'); assert.equal(skyWord(8), 'cloudy'); assert.equal(skyWord(9), 'overcast'); assert.equal(skyWord(10), 'overcast');
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'weather-forecast');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs), ['one', 'dry', 'maybe', 'likely', 'sure']);
console.log('forecast.test: all passed', near.join(','), '|', far.join(','), lesson ? 'data ok' : 'no data yet');
