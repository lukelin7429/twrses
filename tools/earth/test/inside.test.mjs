import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { R, LAYERS, layerAt, thickness, volFrac, pctToCenter, KOLA_KM, travel, totalHours, SHADOW, rayKind } from '../src/insidecalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(R, 6371); assert.equal(LAYERS[LAYERS.length - 1].bottom, R);
for (let i = 1; i < LAYERS.length; i++) assert.equal(LAYERS[i].top, LAYERS[i - 1].bottom);
// 氣象署：外核厚約 2220、內核半徑 1251、地核半徑 3471
assert.equal(thickness('outer'), 2220); assert.equal(thickness('inner'), 1251); assert.equal(R - 2900, 3471);
assert.equal(layerAt(0).key, 'crust'); assert.equal(layerAt(16.9).key, 'crust'); assert.equal(layerAt(17).key, 'mantle');
assert.equal(layerAt(2899).key, 'mantle'); assert.equal(layerAt(2900).key, 'outer'); assert.equal(layerAt(5120).key, 'inner'); assert.equal(layerAt(6371).key, 'inner');
// 體積：地函約 83%（氣象署），地核約 16%（0.175／1.083），四層加起來是 1
near(volFrac('mantle'), 0.83, 0.005); near(volFrac('outer') + volFrac('inner'), 0.1616, 0.002);
near(LAYERS.reduce((a, l) => a + volFrac(l.key), 0), 1, 1e-12);
assert.ok(volFrac('crust') < 0.01 && volFrac('inner') < 0.01);
// 最深的洞連到地心的 0.2% 都不到，也還沒穿過平均厚度的地殼
assert.ok(pctToCenter(KOLA_KM) < 0.2 && KOLA_KM < LAYERS[0].bottom);
near(pctToCenter(R), 100, 1e-12);
// 用每小時 100 公里往下：地殼約 10 分鐘，全程約 64 小時
const t = travel(100); near(t[0].hours * 60, 10.2, 0.01); near(totalHours(100), 63.71, 0.01);
near(t.reduce((a, x) => a + x.hours, 0), totalHours(100), 1e-9);
// 陰影帶
assert.deepEqual(SHADOW, [103, 143]); assert.equal(rayKind(60), 'direct'); assert.equal(rayKind(103), 'direct'); assert.equal(rayKind(120), 'shadow'); assert.equal(rayKind(143), 'core'); assert.equal(rayKind(180), 'core');
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'inside-the-earth');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['crust', 'mantle', 'outer', 'inner']); assert.equal(lesson.dig.rides.length, 4); assert.ok(lesson.lab.waves_en && lesson.lab.waves_zh); }
console.log('inside.test: all passed', (volFrac('mantle') * 100).toFixed(1), pctToCenter(KOLA_KM).toFixed(2), lesson ? 'data ok' : 'no data yet');
