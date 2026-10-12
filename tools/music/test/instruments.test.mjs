import assert from 'node:assert/strict';
import { BAR_ROOTS, BELL_RATIOS, FAMILIES, J0, J1, MEMBRANE_RATIOS, MEMBRANE_ZEROS, airPartials, barFreq, barMode, barMode1, barPartials, barRatios, closedPipeDisp, drumFreq, makeFamilyRounds,
  membraneMode01, membraneMode11, membranePartials, pipeFreq, recipe, stringFreq, stringPartials } from '../src/instruments.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);
assert.deepEqual(FAMILIES.map((f) => f.key), ['string', 'air', 'membrane', 'body']);
assert.deepEqual(FAMILIES.map((f) => f.hs_zh), ['弦鳴樂器', '氣鳴樂器', '膜鳴樂器', '體鳴樂器']);
// 弦：長度減半高八度；張力 ×4 高八度；線密度 ×4 低八度
near(stringFreq(220, 0.5), 440); near(stringFreq(220, 1, 4), 440); near(stringFreq(220, 1, 1, 4), 110);
near(stringFreq(220, 2 / 3), 330); // 第一課：弦長 2/3 → 五度
assert.deepEqual(stringPartials(4).ratios, [1, 2, 3, 4]);
// 空氣柱：閉管只有奇數倍；開管整數倍；管長減半高八度
assert.deepEqual(airPartials(true, 4).ratios, [1, 3, 5, 7]);
assert.deepEqual(airPartials(false, 4).ratios, [1, 2, 3, 4]);
near(pipeFreq(220, 0.5), 440);
// 膜：非整數倍；不是諧波；f ∝ √T、∝ 1/D
assert.deepEqual(MEMBRANE_RATIOS, [1, 1.593, 2.135, 2.295, 2.917]);
MEMBRANE_ZEROS.forEach((z, i) => near(z / MEMBRANE_ZEROS[0], MEMBRANE_RATIOS[i], 0.0016, `zero ${i}`));   // 比值等於 Bessel 零點相除（三位小數）
assert.ok(MEMBRANE_RATIOS.slice(1).every((r) => Math.abs(r - Math.round(r)) > 0.05), 'not integers');
near(drumFreq(150, 4), 300); near(drumFreq(150, 1, 2), 75);
// 棒：1 : 2.757 : 5.404 : 8.933；f ∝ t / L²
{
  const r = barRatios();
  near(r[0], 1); near(r[1], 2.757, 0.001); near(r[2], 5.404, 0.001); near(r[3], 8.933, 0.001);
  assert.ok(r.every((x, i) => i === 0 || Math.abs(x - Math.round(x)) > 0.05));
  near(barFreq(200, 0.5), 800); near(barFreq(200, 1, 2), 400); near(barFreq(200, 2 ** -0.5), 400, 1e-9);
}
// 鐘：相對 hum 的音程：strike 高八度、tierce 高小三度（6:5）、quint 五度（3:2）、nominal 兩個八度
near(BELL_RATIOS[1] / BELL_RATIOS[0], 2); near(BELL_RATIOS[2] / BELL_RATIOS[1], 6 / 5); near(BELL_RATIOS[3] / BELL_RATIOS[1], 3 / 2); near(BELL_RATIOS[4] / BELL_RATIOS[1], 2);
// 貝索函數與振動形狀
near(J0(0), 1); near(J0(MEMBRANE_ZEROS[0]), 0, 1e-4); near(J1(0), 0); near(J1(MEMBRANE_ZEROS[1]), 0, 1e-3);
near(J0(2.0), 0.22389, 1e-4); near(J1(2.0), 0.57672, 1e-4);
near(membraneMode01(0), 1);
near(membraneMode01(1), 0, 1e-4);                       // 邊緣不動（鼓框固定）
near(membraneMode11(1, 0.7), 0, 1e-3);
near(membraneMode11(0.5, Math.PI / 2), 0, 1e-12);       // (1,1) 的節線通過中心
assert.ok(membraneMode11(0.5, 0) > 0 && membraneMode11(0.5, Math.PI) < 0, 'two halves move opposite');
assert.ok(barMode1(0) > 0 && barMode1(1) > 0 && barMode1(0.5) < 0, 'ends up, middle down');
near(barMode1(0), barMode1(1), 1e-4); near(barMode1(0.2), barMode1(0.8), 1e-4);   // 對稱
// 棒的第一個模式：節點在約 0.224 與 0.776；第二個模式有三個節點
{
  const zeros = (n) => { const z = []; let prev = barMode(n, 0); for (let i = 1; i <= 2000; i++) { const x = i / 2000, v = barMode(n, x); if (prev * v < 0) z.push(x); prev = v; } return z; };
  const z1 = zeros(1); assert.equal(z1.length, 2); near(z1[0], 0.224, 0.003); near(z1[1], 0.776, 0.003);
  assert.equal(zeros(2).length, 3);
}
// 封閉管：封閉端是節點、開口端最大
near(closedPipeDisp(0), 0); near(closedPipeDisp(1), 1);
// 配方
for (const f of ['string', 'air', 'membrane', 'body']) {
  const r = recipe(f, 220);
  assert.ok(['complex', 'inharmonic'].includes(r.kind)); assert.ok(r.dur > 0);
  if (r.kind === 'inharmonic') { assert.equal(r.ratios.length, r.amps.length); assert.ok(r.ratios.length <= 6); }
}
assert.equal(recipe('air', 220).amps[1], 0, 'closed pipe: even harmonics missing');
assert.deepEqual(recipe('body', 220, 1).ratios, BELL_RATIOS);
assert.deepEqual(recipe('body', 220, 0).ratios, barPartials().ratios);
assert.deepEqual(recipe('membrane', 220).ratios, membranePartials().ratios);
assert.ok(recipe('membrane', 220).noise && recipe('membrane', 220).noise.dur < 0.3, 'drum: short thump');
// 題目
{
  const q = makeFamilyRounds(mulberry32(4), 6);
  assert.equal(q.length, 6);
  for (const f of FAMILIES) assert.ok(q.some((x) => x.family === f.key), `${f.key} appears`);
  q.slice(1).forEach((x, i) => assert.notEqual(x.family, q[i].family));
  q.forEach((x) => assert.ok([196, 220, 262, 330].includes(x.f0)));
}
console.log('instruments.test.mjs ok');
