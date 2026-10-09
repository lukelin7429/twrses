import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { STAGES, T_MAX, stageOf, sink, soft, layers, mineral, uplift, eroded, exposed, layersAbove, N_LAYERS } from '../src/fossilcalc.js';

assert.equal(T_MAX, 6); assert.equal(stageOf(0), 'die'); assert.equal(stageOf(1.5), 'bury'); assert.equal(stageOf(3.2), 'stone'); assert.equal(stageOf(6), 'find');
// 每一件事都只往一個方向走
const mono = (f, up = true) => { let p = f(0); for (let t = 0; t <= 6.001; t += 0.05) { const v = f(t); assert.ok(up ? v >= p - 1e-9 : v <= p + 1e-9); p = v; } };
mono(sink); mono(soft, false); mono(mineral); mono(uplift); mono(eroded); for (let i = 0; i < N_LAYERS; i++) mono((t) => layers(t)[i]);
// 順序：先埋住，才疊更多層；疊完了才變成石頭；變成石頭之後才抬升；抬升之後才露出來
assert.deepEqual(layers(0.9), [0, 0, 0, 0, 0]); assert.equal(layers(2)[0], 1); assert.equal(layers(2)[1], 0); assert.deepEqual(layers(3), [1, 1, 1, 1, 1]);
assert.equal(mineral(3), 0); assert.equal(mineral(4), 1); assert.equal(uplift(4), 0); assert.equal(uplift(5), 1); assert.equal(eroded(5), 0); assert.equal(exposed(5.5), false); assert.equal(exposed(6), true);
assert.equal(layersAbove(0), 0); assert.equal(layersAbove(2), 1); assert.equal(layersAbove(4.5), 5); assert.equal(layersAbove(6), 0);
assert.equal(soft(0.5), 1); assert.equal(soft(2), 0);
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'how-fossils-form');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), STAGES); assert.equal(lesson.strata.layers.length, 5); }
console.log('fossil.test: all passed', layersAbove(3), lesson ? 'data ok' : 'no data yet');
