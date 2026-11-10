import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getTaiwan } from '../src/taiwan.js';
import { getFlow } from '../src/flow.js';
import { bandStats, blocks, formStats, getTwPop, near, toHundred, verdict } from '../src/twpop.js';
import { clues } from '../src/city2d.js';
import { hundredGroups } from '../src/twhundred2d.js';

const T = getTaiwan(), P = getTwPop(), F = getFlow();
const G = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const L = G.units[2].lessons.find((l) => l.n === 11), S = L.stats;

// 解碼：總數＝腳本加總（四捨五入每格，差不到陸地格子數的一半）、海是 0、每格不是負的
assert.ok(Math.abs(P.total - P.meta.total) <= P.meta.landCells / 2, `total ${P.total} vs ${P.meta.total}`);
for (let i = 0; i < P.pop.length; i++) { assert.ok(P.pop[i] >= 0); if (Number.isNaN(T.grid[i])) assert.equal(P.pop[i], 0); }
assert.equal(S.ghs, Math.round(P.total));

// 和內政部戶政司 115 年 10 月底比：本島＝全國 23,204,000 減澎湖、金門、連江 → 22,946,405。
// 格網是 2025 年的推估，又含綠島、蘭嶼、小琉球等本島以外的小島附近被移上岸的人，差在 6% 內（頁面寫「大約多 4%」）。
const moiMain = 23204000 - 106701 - 137255 - 13639;
assert.equal(S.moi_main, moiMain);
const diff = P.total / moiMain - 1;
assert.ok(Math.abs(diff) < 0.06, `GHS vs MOI ${diff}`);
assert.equal(S.ghs_diff, Math.round(diff * 1000) / 10);
assert.equal(Math.round(diff * 100), 4, 'page says about 4 percent more');

// 海拔帶：比例加起來＝1；低地人多地少、高山人少地多（頁面寫的數字照資料）
const B = bandStats(T, P);
near0(B.low.pShare + B.mid.pShare + B.high.pShare, 1); near0(B.low.aShare + B.mid.aShare + B.high.aShare, 1);
assert.equal(B.low.km2 + B.mid.km2 + B.high.km2, P.meta.landCells);
assert.ok(B.low.pShare > 2 * B.low.aShare && B.high.pShare < B.high.aShare / 50);
assert.equal(S.low.p, Math.round(B.low.pShare * 100)); assert.equal(S.low.a, Math.round(B.low.aShare * 100));
assert.equal(S.high.a, Math.round(B.high.aShare * 100)); assert.equal(S.high.p1000, Math.round(B.high.pShare * 1000));
assert.equal(S.high.people, Math.round(B.high.people / 1000) * 1000);
const Fm = formStats(T, P);
assert.equal(S.basin.p, Math.round(Fm.basin.pShare * 100)); assert.equal(S.basin.a, Math.round(Fm.basin.aShare * 100));
assert.ok(Fm.basin.pShare > 4 * Fm.basin.aShare, 'basins are crowded');

// 最擁擠的十分之一土地、空格子（迷思卡與活動）
const land = []; for (let i = 0; i < T.grid.length; i++) if (!Number.isNaN(T.grid[i])) land.push(P.pop[i]);
land.sort((a, b) => b - a);
const top10 = land.slice(0, Math.round(land.length / 10)).reduce((a, b) => a + b, 0) / P.total;
assert.equal(S.top10, Math.round(top10 * 100));
assert.equal(S.emptyPct, Math.round(land.filter((x) => x < 10).length / land.length * 100));
assert.ok(S.emptyPct > 50, 'more than half of the squares have fewer than 10 people');

// 柱子：每一塊加起來＝總數
assert.ok(Math.abs(blocks(T, P, 3).reduce((a, b) => a + b.people, 0) - P.total) < 1);

// 臺北：方圓 5 公里（頁面寫的數字）
const tp = near(T, P, P.cities.taipei.e, P.cities.taipei.n, 5);
assert.equal(S.taipei5.people, Math.round(tp.people / 1e4) * 1e4);
assert.equal(verdict(tp.density), 'many');
assert.equal(near(T, P, T.peak.e, T.peak.n, 5).density < 100, true, 'Yushan is empty');

// 一百個人：加起來剛好 100；依海拔和依地形都由資料算
for (const set of ['bands', 'forms']) { const g = hundredGroups(set, T, P); assert.equal(g.reduce((a, b) => a + b.n, 0), 100, set); }
assert.deepEqual(toHundred([1, 1, 1]), [34, 33, 33]);
assert.equal(hundredGroups('bands', T, P).find((x) => x.key === 'low').n, S.low.p);

// 小遊戲：答案由 near()＋verdict() 推出；三種答案都有；條件卡由地形算
const qs = L.city.questions;
assert.equal(qs.length, 8);
for (const q of qs) {
  const p = T.places[q.place] || q, r = near(T, P, p.e, p.n, 5);
  assert.equal(verdict(r.density), q.answer, `${q.name_en}: ${Math.round(r.density)} per km²`);
  const c = clues(T, F, p.e, p.n); assert.ok(Number.isFinite(c.z) && c.z >= 0, q.name_en);
}
for (const k of ['many', 'some', 'few']) assert.ok(qs.some((q) => q.answer === k), k);
// 反例：雲林沿海又平又低又有大河，人卻只是「普通」；林口台地沒有大河、比四周高，人卻很多
const yun = qs.find((q) => q.name_en.includes('Yunlin')), cy = clues(T, F, yun.e, yun.n);
assert.ok(cy.z < 100 && cy.relief < 100 && cy.big && yun.answer === 'some');
const lk = qs.find((q) => q.place === 'linkou'), cl = clues(T, F, T.places.linkou.e, T.places.linkou.n);
assert.ok(!cl.big && cl.down >= 100 && lk.answer === 'many');

// 縣市的數字（內政部戶政司 115 年 10 月底）：六都比例、東部三縣
assert.equal(S.six_pct, Math.round((4033118 + 2418066 + 2358720 + 2866088 + 1844309 + 2703895) / 23204000 * 10000) / 100);
assert.equal(Math.round(S.east_p), 4);
assert.equal(S.east_a, 28);

function near0(a, b) { assert.ok(Math.abs(a - b) < 1e-9, `${a} vs ${b}`); }
console.log('twpop ok', { total: Math.round(P.total), diff: (diff * 100).toFixed(1) + '%', low: S.low, high: S.high, basin: S.basin, top10: S.top10 });
