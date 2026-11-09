import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getFlow, mainOutlets, pathFrom, riverCells } from '../src/flow.js';
import { rainStats } from '../src/rain2d.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const F = getFlow(), T = F.T;
const G = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const L10 = G.units[2].lessons.find((l) => l.n === 10);

// 每一格陸地都流得到海：沿著 dir 走，不會繞圈、最後停在海邊的格子
let land = 0, maxSteps = 0;
for (let i = 0; i < T.grid.length; i++) {
  if (Number.isNaN(T.grid[i])) continue;
  land++;
  let j = i, k = 0;
  while (F.dir[j] >= 0 && k < 2000) { j = F.dir[j]; k++; }
  assert.ok(k < 2000, `cell ${i} loops`);
  maxSteps = Math.max(maxSteps, k);
}
// 集水面積：所有出海口加起來＝全部陸地
let outSum = 0; for (let i = 0; i < T.grid.length; i++) if (!Number.isNaN(T.grid[i]) && F.dir[i] < 0) outSum += F.acc[i];
assert.equal(outSum, land, 'every cell drains to exactly one outlet');
// 填平後一路往下（或持平），不會往上流
for (let i = 0; i < T.grid.length; i++) if (F.dir[i] >= 0) assert.ok(F.filled[F.dir[i]] <= F.filled[i] + 1e-6, `uphill at ${i}`);

// 主要河川：資料算出的集水面積和水利署公告的流域面積差 20% 以內；流路長度因為 1 公里格子走直線，大多比公告短（在六成到一點二倍之間）
const R = L10.rivers, outs = mainOutlets(F, 12);
for (const r of R) {
  const o = outs.find((x) => Math.hypot(x.e - r.e, x.n - r.n) < 2);
  assert.ok(o, `${r.key} outlet`);
  if (r.area) near(o.area / r.area, 1, 0.2, `${r.key} basin area`);
  if (r.km) { assert.ok(o.km < r.km * 1.2 && o.km > r.km * 0.6, `${r.key} length ${o.km} vs ${r.km}`); }
  assert.equal(o.side, r.side, `${r.key} side`);
}
// 西邊的河比東邊長：西邊最長的幾條都比東邊最長的長
const westLong = Math.max(...outs.filter((o) => o.side === 'west').map((o) => o.km));
const eastLong = Math.max(...outs.filter((o) => o.side === 'east').map((o) => o.km));
assert.ok(westLong > eastLong * 1.4, `west ${westLong} vs east ${eastLong}`);
assert.ok(riverCells(F, 60).length > 500);

// 小遊戲：答案由 pathFrom() 推出來
const qs = L10.drop.questions;
assert.equal(qs.length, 8);
for (const q of qs) { const p = T.places[q.place] || q; const path = pathFrom(F, p.e, p.n); assert.ok(path, q.name_en); assert.equal(path.side, q.answer, q.name_en); }
assert.ok(qs.some((q) => q.answer === 'west') && qs.some((q) => q.answer === 'east'));

// 雨量：十二個月加起來＝氣象署公告的年總量（差 0.2 毫米以內）；頁面寫的比例照資料
for (const s of L10.rainbars.stations) {
  near(s.mm.reduce((a, b) => a + b, 0), s.year, 0.2, `${s.key} annual`);
  const k = rainStats(s.mm);
  if (s.wetPct != null) assert.equal(s.wetPct, Math.round(k.wetShare * 100), `${s.key} May–Oct`);
}
const st = L10.stats;
for (const [k, v] of Object.entries(st.wet || {})) assert.equal(v, Math.round(rainStats(L10.rainbars.stations.find((s) => s.key === k).mm).wetShare * 100), k);
console.log('flow ok', { land, maxSteps, westLong: westLong.toFixed(0), eastLong: eastLong.toFixed(0) });
