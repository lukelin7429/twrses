import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { around, getTaiwan, heightAt, landArea, landform, rowProfile, sides } from '../src/taiwan.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const T = getTaiwan();
const G = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const L9 = G.units[2].lessons.find((l) => l.n === 9);

// 格子與座標
assert.equal(T.nx, 200); assert.equal(T.ny, 377); assert.equal(T.meta.cell, 1);
assert.ok(Number.isNaN(heightAt(T, T.e0 + 2, T.n0 + 2)), 'south-west corner is sea');
assert.ok(Number.isNaN(heightAt(T, 1000, 2600)), 'far outside is sea');

// 陸地面積：1 公里格子數 ≈ 行政院的「臺灣本島及其 21 個附屬島嶼面積共 35,887.1325 平方公里」（本島的資料，差 2% 以內）
near(landArea(T) / 35887.1325, 1, 0.02, 'land area');

// 玉山：20 公尺網格的最高點和國土測繪中心 2022 年的 3,952.433 公尺差 10 公尺以內（網格是平均，比三角點矮一點）
near(T.peak.h, 3952.433, 10, 'Yushan, 20 m grid');
assert.ok(T.peak.h < 3952.433, 'the grid is a little lower than the surveyed peak');
// 1 公里格子最高的一格比玉山矮好幾百公尺（平均的效果），但仍在 3,500 公尺以上
assert.ok(T.max1k.h > 3500 && T.max1k.h < 3952, `1 km max ${T.max1k.h}`);
// 玉山的格子在本島範圍內、是陸地
assert.ok(heightAt(T, T.peak.e, T.peak.n) > 3400, 'Yushan cell is high');

// 剖面：每一條預設的線，東邊都比西邊陡；最高點離東海岸比較近
for (const l of L9.cut.lines) {
  const s = sides(T, l.n);
  assert.ok(s, l.key);
  assert.ok(s.eSlope > s.wSlope, `${l.key}: east ${s.eSlope} vs west ${s.wSlope}`);
  assert.ok(s.eKm < s.wKm, `${l.key}: top closer to the east coast`);
}
// 從南到北掃一遍：大部分的線東邊比較陡
let east = 0, all = 0;
for (let n = T.n0 + 10; n < T.n0 + T.ny - 10; n += 5) { const s = sides(T, n); if (!s || s.top.z < 500) continue; all++; if (s.eSlope > s.wSlope) east++; }
assert.ok(east / all > 0.8, `east steeper on ${east} of ${all} lines`);
assert.equal(rowProfile(T, 2664).length, T.nx);

// 小遊戲：每一題的答案由 landform() 推出來
const qs = L9.form.questions;
assert.equal(qs.length, 8);
assert.equal(new Set(qs.map((q) => q.place)).size, 8);
for (const q of qs) { const p = T.places[q.place]; assert.ok(p, q.place); assert.equal(landform(T, p.e, p.n), q.answer, `${q.place}`); }
assert.equal(new Set(qs.map((q) => q.answer)).size, 5, 'all five landforms appear');
// 迷思卡：臺中盆地南邊比東、西、北低
const tc = around(T, T.places.taichungBasin.e, T.places.taichungBasin.n);
assert.ok(tc.S < tc.E && tc.S < tc.W && tc.S < tc.N, 'Taichung Basin opens to the south');

// 頁面上寫的數字和資料一致
const st = L9.stats, ch = sides(T, L9.cut.lines.find((l) => l.key === 'changhua').n);
const v = [...T.grid].filter((x) => !Number.isNaN(x));
assert.equal(st.area, landArea(T));
assert.equal(st.over100, Math.round(v.filter((x) => x >= 100).length / v.length * 100));
assert.equal(st.over1000, Math.round(v.filter((x) => x >= 1000).length / v.length * 100));
assert.equal(st.peak20, T.peak.h); assert.equal(st.peak1k, Math.round(T.max1k.h));
assert.equal(st.ch_top, Math.round(ch.top.z)); assert.equal(st.ch_w, Math.round(ch.wKm)); assert.equal(st.ch_e, Math.round(ch.eKm));
assert.equal(st.ch_ws, Math.round(ch.wSlope)); assert.equal(st.ch_es, Math.round(ch.eSlope));
near(ch.eSlope / ch.wSlope, 3, 0.5, '“about three times as steep”');
console.log('taiwan ok', { area: landArea(T), peak: T.peak.h, max1k: T.max1k.h, eastSteeper: `${east}/${all}` });
