// 晶片與半導體第五課：尺度換算的檢查
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  NM, ANGSTROM, STOPS, viewWidth, zoomOf, zoomForStop, magnification, fmtLen, scaleBar, VIEW_MAX, VIEW_MIN,
  NAIL_NM_PER_S, nailGrowthNm, atomsAcross, cutsToReach, lengthAfterCuts, A4_LONG_MM, NODES,
} from '../src/scalecalc.js';

assert.equal(NM / ANGSTROM, 10);                                   // 1 奈米 ＝ 10 埃
// 每一站都比前一站小
for (let i = 1; i < STOPS.length; i++) assert.ok(STOPS[i].size < STOPS[i - 1].size, STOPS[i].key);
// 指甲到矽原子差了四千多萬倍
const span = STOPS[0].size / STOPS[STOPS.length - 1].size;
assert.ok(span > 4e7 && span < 5e7, String(span));
// 滑桿：兩端、單調、來回一致
assert.ok(Math.abs(viewWidth(0) - VIEW_MAX) < 1e-12 && Math.abs(viewWidth(1) - VIEW_MIN) < 1e-18);
for (let z = 0; z < 1; z += 0.05) { assert.ok(viewWidth(z + 0.05) < viewWidth(z)); assert.ok(Math.abs(zoomOf(viewWidth(z)) - z) < 1e-9); }
assert.ok(magnification(1) > 4e7);
for (const s of STOPS) { const z = zoomForStop(s.key); assert.ok(z >= 0 && z <= 1, s.key); }
assert.ok(Math.abs(STOPS[4].size / viewWidth(zoomForStop('virus', 0.3)) - 0.3) < 1e-9);
// 單位
assert.equal(fmtLen(0.01).en, '1 cm'); assert.equal(fmtLen(75e-6).en, '75 µm'); assert.equal(fmtLen(7e-6).zh, '7 微米');
assert.equal(fmtLen(100e-9).en, '100 nm'); assert.equal(fmtLen(0.235e-9).en, '0.24 nm (2.35 Å)'); assert.equal(fmtLen(1e-10).zh, '0.1 奈米（1 埃米）');
// 比例尺是 1、2、5 開頭，而且不超過畫面的三成
for (let z = 0; z <= 1; z += 0.03) { const b = scaleBar(viewWidth(z)); assert.ok(b.frac <= 0.3 + 1e-9 && b.frac > 0.1, `${z} ${b.frac}`); assert.ok([1, 2, 5].includes(Math.round(b.len / Math.pow(10, Math.floor(Math.log10(b.len * 1.000001)))))); }
// 指甲：每月 3.5 mm ≈ 每秒 1.3 nm；一分鐘約 80 nm（比一顆流感病毒還短一點）；一天約 0.115 mm
assert.ok(Math.abs(NAIL_NM_PER_S - 1.33) < 0.01, String(NAIL_NM_PER_S));
assert.ok(nailGrowthNm(60) > 75 && nailGrowthNm(60) < 85);
assert.ok(Math.abs(nailGrowthNm(86400) / 1e6 - 0.115) < 0.001);
assert.ok(atomsAcross(nailGrowthNm(1)) > 5 && atomsAcross(nailGrowthNm(1)) < 6);       // 每秒長大約 5–6 顆矽原子那麼寬
// 剪紙：A4 長邊剪 29 次才不到 1 奈米；剪 12 次差不多一根頭髮寬
const c = cutsToReach(A4_LONG_MM, 1);
assert.equal(c.cuts, 29); assert.ok(c.left < 1e-9 && c.left * 2 > 1e-9);
assert.ok(Math.abs(lengthAfterCuts(A4_LONG_MM, 12) - 72.5e-6) < 0.1e-6);
assert.equal(cutsToReach(A4_LONG_MM, 100).cuts, 22);                                    // 22 次：比流感病毒小
// 製程名稱比量得到的間距小很多
for (const n of Object.values(NODES)) assert.ok(n.metalPitch / n.name >= 8 && n.gatePitch > n.metalPitch);
// 課程資料裡的數字和這裡一致
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'nanometer');
if (lesson) {
  assert.equal(lesson.nail.mm_per_month, 3.5);
  assert.equal(lesson.lab.stops.length, STOPS.length);
  lesson.lab.stops.forEach((s, i) => assert.equal(s.key, STOPS[i].key));
}
console.log('scale.test: all passed', NAIL_NM_PER_S.toFixed(2), c.cuts, span.toExponential(2), lesson ? 'data ok' : 'no data yet');
