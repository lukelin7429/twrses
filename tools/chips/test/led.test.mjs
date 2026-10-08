import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LEDS, RANGE, eV, css, mixName } from '../src/ledcalc.js';

for (const k of ['red', 'green', 'blue']) assert.ok(LEDS[k].nm > RANGE[k][0] && LEDS[k].nm < RANGE[k][1], k);
// 波長越短，光子能量越大：藍 > 綠 > 紅
assert.ok(eV(LEDS.blue.nm) > eV(LEDS.green.nm) && eV(LEDS.green.nm) > eV(LEDS.red.nm));
assert.ok(Math.abs(eV(630) - 1.968) < 0.001 && Math.abs(eV(465) - 2.666) < 0.001);
assert.equal(css(100, 100, 0), 'rgb(255, 255, 0)'); assert.equal(css(0, 0, 0), 'rgb(0, 0, 0)'); assert.equal(css(40, 120, -5), 'rgb(102, 255, 0)');
assert.equal(mixName(100, 100, 0), 'yellow'); assert.equal(mixName(100, 100, 100), 'white'); assert.equal(mixName(0, 100, 100), 'cyan');
assert.equal(mixName(100, 0, 100), 'magenta'); assert.equal(mixName(10, 20, 30), 'black'); assert.equal(mixName(0, 0, 80), 'blue');
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'led');
if (lesson) {
  assert.equal(Object.keys(lesson.lab.msgs).length, 4); assert.equal(lesson.rgb.presets.length, 4);
  for (const p of lesson.rgb.presets) assert.equal(mixName(p.r, p.g, p.b), p.key);
  assert.equal(Object.keys(lesson.rgb.names).length, 8);
}
console.log('led.test: all passed', eV(630).toFixed(2), eV(525).toFixed(2), eV(465).toFixed(2), lesson ? 'data ok' : 'no data yet');
