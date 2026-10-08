// 晶片與半導體第七課：HBM 頻寬的檢查
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GENS, bandwidth, lanesVs, moviesPerSecond, homeSeconds, fmtDuration } from '../src/hbmcalc.js';

// 規格表上的每疊頻寬（GB/s）：128、307、819、2048
assert.equal(bandwidth('hbm1'), 128);
assert.ok(Math.abs(bandwidth('hbm2') - 307.2) < 0.01);
assert.ok(Math.abs(bandwidth('hbm3') - 819.2) < 0.01);
assert.equal(bandwidth('hbm4'), 2048);
for (let i = 1; i < GENS.length; i++) { assert.ok(bandwidth(GENS[i].key) > bandwidth(GENS[i - 1].key)); assert.ok(GENS[i].year > GENS[i - 1].year); assert.ok(GENS[i].dies >= GENS[i - 1].dies); }
assert.equal(lanesVs('hbm1'), 32); assert.equal(lanesVs('hbm4'), 64);
assert.equal(bandwidth('hbm4') / bandwidth('hbm1'), 16);                 // 十二年快了 16 倍
// 一部 5 GB 的電影：HBM 一疊每秒約 26 部、HBM4 約 410 部；六疊 HBM4 約 2,458 部
assert.ok(Math.abs(moviesPerSecond('hbm1') - 25.6) < 0.01);
assert.ok(Math.abs(moviesPerSecond('hbm4') - 409.6) < 0.01);
assert.ok(Math.abs(moviesPerSecond('hbm4', 6) - 2457.6) < 0.01);
// HBM4 一疊一秒送的 2,048 GB，用 100 Mb/s 的網路要 45.5 小時
assert.ok(Math.abs(homeSeconds(2048, 100) / 3600 - 45.5) < 0.1);
assert.equal(fmtDuration(0.5).en, 'less than 1 second'); assert.equal(fmtDuration(600).zh, '10 分鐘'); assert.equal(fmtDuration(163840).en, '45.5 hours');
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'hbm');
if (lesson) { assert.equal(lesson.band.movie_gb, 5); assert.equal(lesson.lab.gens.length, GENS.length); lesson.lab.gens.forEach((g, i) => assert.equal(g.key, GENS[i].key)); }
console.log('hbm.test: all passed', GENS.map((g) => bandwidth(g.key)).join('/'), lesson ? 'data ok' : 'no data yet');
