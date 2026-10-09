import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { ground, slope, flow, settleX, zoneOf, FOOT, SHORE, X0 } from '../src/rivercalc.js';

// 地形：一路往下，山區比平原陡
for (let x = X0; x < 6.9; x += 0.1) assert.ok(ground(x) >= ground(x + 0.1) - 1e-9, `downhill at ${x}`);
assert.ok(slope(-5) > slope(1) * 3); assert.ok(ground(SHORE + 1) < 0);
// 水流：山區快、平原慢、海裡最慢；水多就快
assert.ok(flow(-5, 'normal') > flow(1, 'normal') && flow(1, 'normal') > flow(5, 'normal'));
assert.ok(flow(-5, 'flood') > flow(-5, 'normal') && flow(-5, 'normal') > flow(-5, 'dry'));
// 大的先停：礫石在山腳（沖積扇），沙在平原，泥到海裡
const g = settleX('gravel', 'normal'), s = settleX('sand', 'normal'), m = settleX('mud', 'normal');
assert.ok(g < s && s < m, `${g} ${s} ${m}`);
assert.equal(zoneOf(g), 'fan'); assert.equal(zoneOf(s), 'plain'); assert.equal(zoneOf(m), 'sea');
// 大水把每一種都帶得更遠；枯水期礫石出不了山
assert.ok(settleX('gravel', 'flood') > g && settleX('sand', 'flood') >= s);
assert.equal(zoneOf(settleX('gravel', 'dry')), 'mountain'); assert.equal(zoneOf(settleX('mud', 'dry')), 'sea');
assert.equal(zoneOf(FOOT), 'fan');
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'rivers-shape-the-land');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs), ['dry', 'normal', 'flood']);
console.log('river.test: all passed', ['dry', 'normal', 'flood'].map((w) => ['gravel', 'sand', 'mud'].map((k) => settleX(k, w)).join('/')).join(' | '), lesson ? 'data ok' : 'no data yet');
