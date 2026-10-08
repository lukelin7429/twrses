import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { STYLES, styleOf, explosive, pressure, expand, radiusRatio, CYCLE_S } from '../src/volcalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(Object.keys(STYLES).length, 4); assert.equal(new Set(Object.values(STYLES)).size, 4);
assert.equal(styleOf('runny', 'low'), 'flow'); assert.equal(styleOf('sticky', 'high'), 'blast');
assert.ok(explosive('sticky', 'high') && !explosive('runny', 'high') && !explosive('sticky', 'low'));
// 壓力與氣泡：地表 1 大氣壓，越深越大；氣泡往上升會變大
assert.equal(pressure(0), 1); near(pressure(1), 266, 1e-9); assert.equal(pressure(-3), 1);
near(expand(1), 266, 1e-9); near(expand(3), 796, 1e-9); near(expand(2, 1), 531 / 266, 1e-9); assert.equal(expand(0), 1);
near(radiusRatio(3) ** 3, expand(3), 1e-6); assert.ok(radiusRatio(3) > 9 && radiusRatio(3) < 10);
assert.ok(CYCLE_S.blast > CYCLE_S.flow);
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'volcano');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), Object.values(STYLES).sort()); assert.equal(lesson.bubble.depths.length, 4); }
console.log('vol.test: all passed', Math.round(expand(3)), radiusRatio(3).toFixed(1), lesson ? 'data ok' : 'no data yet');
