import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FEW, MANY, PLACES, POLAR, areaStats, cellIndex, cellKm2, getPop, inArea, latBands, peopleIn, totalPeople, verdict } from '../src/pop.js';
import { toHundred } from '../src/hundred2d.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const pop = getPop();
const G = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const L8 = G.units[1].lessons.find((l) => l.n === 8);

// 格子編號
assert.equal(cellIndex(-180, 90), 0);
assert.equal(cellIndex(179.9, -89.9), 179 * 360 + 359);
assert.equal(cellIndex(120.5, 23.5), 66 * 360 + 300);
near(cellKm2(0.5) / 1000, 12.36, 0.05, '1-degree cell at the equator (thousand km²)');

// 總人口：1 度格子加總（四捨五入到千人）≈ 原始格網的總數；點數 × 一百萬 ≈ 總人口（誤差擴散，差不到 0.5%）
const total = totalPeople(pop);
near(total / pop.meta.total, 1, 0.001, 'cells add up to the grid total');
const dots = pop.dots.length / 2;
assert.equal(dots, pop.meta.dotCount);
near(dots * 1e6 / pop.meta.total, 1, 0.005, 'one dot per million people');
// 和聯合國《World Population Prospects 2024》2025 年中的世界人口（8,231,613 千人）比：GHS-POP 2025 是 2023 年做的推估，差在 3% 以內
const UN2025 = 8_231_613_000;
near(pop.meta.total / UN2025, 1, 0.03, 'GHS-POP 2025 vs UN WPP 2024');
// 每一點都在有人的格子裡、經緯度合理
for (let i = 0; i < pop.dots.length; i += 2) {
  assert.ok(Math.abs(pop.dots[i]) <= 180 && Math.abs(pop.dots[i + 1]) <= 90);
  assert.ok(peopleIn(pop, pop.dots[i], pop.dots[i + 1]) > 0, `dot ${i / 2} in an empty cell`);
}

// 不平均：北半球、亞洲南部與東部擠滿人；沙漠、高山、寒帶很少
const [south, north] = latBands(pop, [-90, 0, 90]);
near(south + north, total, 1, 'bands add up');
const nh = north / total;
assert.ok(nh > 0.85 && nh < 0.92, `Northern Hemisphere share ${nh}`);
const S = { desert: areaStats(pop, 'desert'), high: areaStats(pop, 'high'), polar: areaStats(pop, 'polar') };
assert.ok(S.desert.share < 0.03, `deserts ${S.desert.share}`);
assert.ok(S.high.share < 0.01, `high land ${S.high.share}`);
assert.ok(S.polar.share < 0.002, `polar ${S.polar.share}`);
for (const k of ['desert', 'high']) near(S[k].dots * 1e6 / S[k].people, 1, 0.3, `${k}: dots vs people`);
assert.ok(S.polar.dots <= 3, 'polar: at most a few dots');
// 範圍越空，人口比例比陸地比例小越多；熱帶的高地反而比平均擠（涼爽）；海拔 100 公尺以下的低地和 Cohen & Small (1998) 的 33.5%／15.6% 差不多
for (const k of ['desert', 'high', 'polar']) assert.ok(S[k].share < S[k].land / 3, `${k}: share ${S[k].share} vs land ${S[k].land}`);
const st = pop.meta.stats;
assert.ok(st.tropicHigh.share > st.tropicHigh.land, 'tropical highlands are more crowded than average');
near(st.low.share, 0.335, 0.03, 'people below 100 m'); near(st.low.land, 0.156, 0.03, 'land below 100 m');
assert.ok(inArea(pop, 'polar', 0, POLAR + 0.1) && !inArea(pop, 'polar', 0, POLAR - 0.1));
assert.ok(inArea(pop, 'desert', 12, 23), 'Sahara');
assert.ok(inArea(pop, 'high', 88, 33), 'Tibet');
assert.ok(!inArea(pop, 'desert', 121, 23.7) && !inArea(pop, 'high', 121, 23.7), 'Taiwan is in neither');

// 小遊戲：每一題的答案由資料推出來（一百萬以上「人多」、不到十萬「人少」，中間的不出題）
const qs = L8.why.questions;
assert.equal(qs.length, 8);
assert.equal(new Set(qs.map((q) => q.place)).size, 8, 'eight different places');
for (const q of qs) {
  assert.ok(PLACES[q.place], q.place);
  const v = verdict(pop, q.place);
  assert.notEqual(v.answer, 'between', `${q.place} is in between (${v.people})`);
  assert.equal(q.answer, v.answer, `${q.place}: ${v.people} people`);
  assert.ok(q.chips.length === 3);
}
assert.ok(qs.filter((q) => q.answer === 'many').length >= 3 && qs.filter((q) => q.answer === 'few').length >= 3, 'both answers appear');
assert.ok(MANY > FEW);

// 一百個人：最大餘數法加起來剛好 100；聯合國六個地區加起來 ≈ 世界人口
assert.deepEqual(toHundred([1, 1, 1]).reduce((a, b) => a + b, 0), 100);
const R = L8.hundred.regions;
const sumR = R.reduce((a, r) => a + r.people, 0);
near(sumR / UN2025, 1, 0.0001, 'UN regions add up to the world');
const hR = toHundred(R.map((r) => r.people));
assert.equal(hR.reduce((a, b) => a + b, 0), 100);
assert.ok(hR[R.findIndex((r) => r.key === 'asia')] > 50, 'more than half live in Asia');

// 頁面上寫的數字和資料一致（照頁面寫的位數四捨五入）
const txt = JSON.stringify(L8);
const dp = (v) => (String(v).split('.')[1] || '').length;
const nearR = (v, x, msg) => near(v, x, 0.5 * 10 ** -dp(v) + 1e-9, msg);
for (const [k, v] of Object.entries(L8.stats)) {
  if (k === 'nh') nearR(v, nh * 100, 'Northern Hemisphere %');
  else if (k === 'total') nearR(v, pop.meta.total / 1e9, 'GHS total (billion)');
  else if (k === 'dots') assert.equal(v, dots);
  else if (k.endsWith('_land')) nearR(v, st[k.slice(0, -5)].land * 100, `${k} %`);
  else nearR(v, st[k].share * 100, `${k} %`);
}
assert.ok(txt.includes('8.23 billion'), 'UN world population on the page');
console.log('pop ok', { total: pop.meta.total, dots, nh: +(nh * 100).toFixed(1), desert: +(S.desert.share * 100).toFixed(2), high: +(S.high.share * 100).toFixed(2), polar: +(S.polar.share * 100).toFixed(3) });
