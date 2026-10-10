import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { CUES, overLand, present, usable, holding, taiwans } from '../src/migratecalc.js';

const all = { sun: true, stars: true, magnet: true, land: true };
assert.equal(overLand(5), true); assert.equal(overLand(30), false); assert.equal(overLand(50), true); assert.equal(overLand(70), false); assert.equal(overLand(95), true);
assert.deepEqual(present({ day: true, clear: true, journey: 50 }), { sun: true, stars: false, magnet: true, land: true });
assert.deepEqual(usable({ day: true, clear: true, journey: 30 }, all), ['sun', 'magnet']);
assert.deepEqual(usable({ day: false, clear: true, journey: 30 }, all), ['stars', 'magnet']);
// 陰天的晚上在海上：只剩磁場；連磁場都關掉就迷路
assert.deepEqual(usable({ day: false, clear: false, journey: 30 }, all), ['magnet']);
assert.deepEqual(usable({ day: false, clear: false, journey: 30 }, { ...all, magnet: false }), []);
// 磁場永遠存在；任何情況下，四種感覺都開著就不會迷路
for (const day of [true, false]) for (const clear of [true, false]) for (const j of [0, 30, 50, 70, 100]) assert.ok(usable({ day, clear, journey: j }, all).length >= 1);
assert.equal(holding({ day: true, clear: true, journey: 50 }, all), 'day'); assert.equal(holding({ day: false, clear: true, journey: 30 }, all), 'night');
assert.equal(holding({ day: true, clear: false, journey: 50 }, all), 'cloudy'); assert.equal(holding({ day: false, clear: false, journey: 30 }, all), 'one');
assert.equal(holding({ day: false, clear: false, journey: 30 }, { ...all, magnet: false }), 'lost');
assert.equal(CUES.length, 4); assert.equal(taiwans(9000), 23); assert.equal(taiwans(70900), 180);
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((x) => x.lessons).find((l) => l.slug === 'how-birds-find-their-way');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['cloudy', 'day', 'lost', 'night', 'one']);
console.log('migrate.test: all passed', lesson ? 'data ok' : 'no data yet');
