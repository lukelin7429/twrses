import assert from 'node:assert/strict';
import { ROW_NAMES, SECTIONS, STRING_LAYOUTS, makeSeatRounds, mixScale, rowRadius, sectionOf, sectionVoices, seatPlan, voiceCount } from '../src/orchestra.js';
import { mulberry32 } from '../src/pitch.js';

assert.deepEqual(SECTIONS.map((s) => s.key), ['strings', 'woodwinds', 'brass', 'percussion']);
assert.deepEqual(SECTIONS.map((s) => s.row), [0, 1, 2, 3]);
assert.equal(ROW_NAMES.length, 4);
// 座位：前到後依序弦、木管、銅管、打擊（半徑遞增）；所有點不重疊；都在觀眾的另一邊（z<0）
for (const layout of ['american', 'german']) {
  const p = seatPlan(layout);
  const rows = ['strings', 'woodwinds', 'brass', 'percussion'].map((k) => p.filter((s) => s.section === k));
  rows.forEach((r) => assert.ok(r.length > 0));
  // 弦樂（含低音提琴）半徑 3.2–4.4 < 木管 5.8 < 銅管 7.4 < 打擊 9
  assert.ok(Math.max(...rows[0].map((s) => s.r)) < Math.min(...rows[1].map((s) => s.r)));
  assert.ok(Math.max(...rows[1].map((s) => s.r)) < Math.min(...rows[2].map((s) => s.r)));
  assert.ok(Math.max(...rows[2].map((s) => s.r)) < Math.min(...rows[3].map((s) => s.r)));
  p.forEach((s) => assert.ok(s.z < 0 && Math.abs(Math.hypot(s.x, s.z) - s.r) < 1e-9));
  for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) assert.ok(Math.hypot(p[i].x - p[j].x, p[i].z - p[j].z) > 0.3, `overlap ${i},${j}`);
  // 弦樂小組的順序（由觀眾的左到右＝x 遞增）符合排法
  const mean = (sub) => { const a = p.filter((s) => s.sub === sub); return a.reduce((t, s) => t + s.x, 0) / a.length; };
  const order = STRING_LAYOUTS[layout].slice().sort((a, b) => mean(a) - mean(b));
  assert.deepEqual(order, STRING_LAYOUTS[layout]);
  // 低音提琴在大提琴後面（半徑較大）、在大提琴那一側
  const cx = mean('cello'), bx = mean('bass');
  assert.ok(Math.abs(cx - bx) < 1.5);
  assert.ok(p.filter((s) => s.sub === 'bass')[0].r > p.filter((s) => s.sub === 'cello')[0].r);
}
// 美式與德式只有弦樂不同
{
  const a = seatPlan('american'), g = seatPlan('german');
  assert.equal(a.length, g.length);
  ['woodwinds', 'brass', 'percussion'].forEach((k) => assert.deepEqual(a.filter((s) => s.section === k), g.filter((s) => s.section === k)));
  assert.notDeepEqual(a.filter((s) => s.sub === 'cello'), g.filter((s) => s.sub === 'cello'));
}
assert.equal(rowRadius('brass'), 7.4);
// 聲音：每組 ≤ 2 個聲音，四組合起來 ≤ 8（MAX_VOICES）；頻率與增益合理；銅管的諧波比弦樂以外的木管多
for (const s of SECTIONS) {
  const v = sectionVoices(s.key);
  assert.ok(v.length >= 1 && v.length <= 2, s.key);
  v.forEach((x) => { assert.ok(x.freq > 0 && x.gain > 0 && x.gain <= 0.6 && x.dur > 0); if (x.kind === 'complex') assert.ok(x.amps.length >= 5 && Math.max(...x.amps) === 1); });
}
assert.ok(voiceCount(SECTIONS.map((s) => s.key)) <= 8);
{
  const nz = (a) => a.filter((x) => x > 0).length;
  assert.ok(nz(sectionVoices('brass')[0].amps) > nz(sectionVoices('woodwinds')[0].amps), 'brass has more harmonics than the woodwind recipe');
  assert.deepEqual(sectionVoices('woodwinds')[0].amps.filter((_, i) => i % 2 === 1), [0, 0, 0], 'woodwind recipe: odd harmonics only');
  assert.equal(sectionVoices('percussion')[0].kind, 'inharmonic');
  assert.equal(sectionVoices('percussion')[1].kind, 'noise');
}
// 混音：n 組時每組倍率下降、總和（相加）隨組數增加但慢於線性
assert.equal(mixScale(0), 0); assert.equal(mixScale(1), 1);
for (let n = 1; n < 4; n++) { assert.ok(mixScale(n + 1) < mixScale(n)); assert.ok((n + 1) * mixScale(n + 1) > n * mixScale(n)); assert.ok((n + 1) * mixScale(n + 1) < n + 1); }
// 題目
{
  const q = makeSeatRounds(mulberry32(2), 6);
  assert.equal(q.length, 6);
  SECTIONS.forEach((s) => assert.ok(q.includes(s.key)));
  q.slice(1).forEach((x, i) => assert.notEqual(x, q[i]));
}
assert.equal(sectionOf('brass').hs, 'aerophones');
console.log('orchestra.test.mjs ok');
