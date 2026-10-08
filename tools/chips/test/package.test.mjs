// 晶片與半導體第六課：封裝模型的檢查
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathMm, shorter, dieCount, fmtMm, barFrac, FIELD_MM2, MAX_LAYERS } from '../src/packcalc.js';

assert.equal(FIELD_MM2, 858);                                        // 26 × 33 mm
assert.ok(pathMm('board') > pathMm('side') && pathMm('side') > pathMm('stack', 8));
assert.equal(shorter('side'), 10);                                   // 示例：並排比分開短 10 倍
assert.ok(shorter('stack', 8) > 50);
assert.ok(pathMm('stack', 16) > pathMm('stack', 4));                 // 疊越高，最上層越遠
assert.ok(pathMm('stack', MAX_LAYERS) < pathMm('side'));             // 疊 16 層還是比並排近
assert.equal(dieCount({ logic: 1, stacks: 0, layers: 1 }), 1);
assert.equal(dieCount({ logic: 1, stacks: 8, layers: 12 }), 97);
assert.equal(dieCount({ logic: 2, stacks: 4, layers: 16 }), 66);
assert.equal(fmtMm(30).en, '3 cm'); assert.equal(fmtMm(3).zh, '3 公釐'); assert.equal(fmtMm(0.4).en, '0.4 mm');
assert.ok(barFrac(30) === 1 && barFrac(3) < 1 && barFrac(0.4) < barFrac(3) && barFrac(0.4) > 0.04);
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'chip-stacking');
if (lesson) { assert.equal(lesson.pack.max_layers, MAX_LAYERS); assert.equal(Object.keys(lesson.lab.msgs).length, 3); }
console.log('package.test: all passed', shorter('side'), shorter('stack', 8), lesson ? 'data ok' : 'no data yet');
