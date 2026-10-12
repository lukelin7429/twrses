import assert from 'node:assert/strict';
import { BASE_HZ, CHORDS, INTERVALS, beatHz, buildChord, centsDiff, chordFreqs, classify, diffHz, equalRatio, intervalOf, justCents, makeChordRounds, ratioOf, repeatHz, sumWave, upperHz } from '../src/harmony.js';
import { mulberry32, midiToFreq } from '../src/pitch.js';

const near = (a, b, eps = 1e-9, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);
// 比值與底音：220 Hz 做底，簡單比例是整齊的數
near(BASE_HZ * ratioOf(intervalOf('octave')), 440);
near(BASE_HZ * ratioOf(intervalOf('fifth')), 330);
near(BASE_HZ * ratioOf(intervalOf('majthird')), 275);
near(BASE_HZ * ratioOf(intervalOf('minthird')), 264);
near(BASE_HZ * ratioOf(intervalOf('fourth')), 293.3333333333, 1e-6);
// 純律音程離平均律幾音分（第一課：五度 +1.96）
near(centsDiff(intervalOf('fifth')), 1.955, 0.01);
near(centsDiff(intervalOf('fourth')), -1.955, 0.01);
near(centsDiff(intervalOf('majthird')), -13.686, 0.01);
near(centsDiff(intervalOf('minthird')), 15.641, 0.01);
near(centsDiff(intervalOf('octave')), 0, 1e-9);
near(justCents(intervalOf('octave')), 1200, 1e-9);
near(equalRatio(intervalOf('fifth')), 2 ** (7 / 12));
// 比值越簡單，重複得越快：簡單比的分母越小
const order = ['unison', 'octave', 'fifth', 'fourth', 'majthird', 'minthird', 'majsecond', 'minsecond'];
const rep = order.map((k) => repeatHz(BASE_HZ, intervalOf(k)));
near(rep[1], 220); near(rep[2], 110); near(rep[3], 220 / 3, 1e-9); near(rep[4], 55); near(rep[7], 220 / 15, 1e-9);
for (let i = 2; i < rep.length - 1; i++) assert.ok(rep[i] >= rep[i + 1], `${order[i]} repeats at least as fast as ${order[i + 1]}`);
// 實際波形：五度的合成波形每 1/110 秒重複（數值檢查）
{
  const f1 = 220, f2 = 330, T = 1 / 110;
  for (const t of [0.0003, 0.0011, 0.0027]) near(sumWave(f1, f2, t), sumWave(f1, f2, t + T), 1e-9);
  // 重複週期的一半不重複
  assert.ok(Math.abs(sumWave(f1, f2, 0.0003) - sumWave(f1, f2, 0.0003 + T / 2)) > 0.01);
}
// 拍音：同度調歪 3 Hz → 每秒 3 次；八度調歪
{
  const uni = intervalOf('unison');
  near(beatHz(220, 223, uni), 3); near(diffHz(220, 223), 3);
  near(beatHz(220, upperHz(220, uni, 0), uni), 0);
  const oct = intervalOf('octave');
  near(beatHz(220, 442, oct), 2);
  const fifth = intervalOf('fifth');
  near(beatHz(220, 331, fifth), 2);            // 2×331 − 3×220 = 2
  near(beatHz(220, upperHz(220, fifth, 0), fifth), 0, 1e-9);
  // 調歪的音分 → 拍音：同度 +10 音分，220 Hz → 約 1.27 Hz
  near(beatHz(220, upperHz(220, uni, 10), uni), 220 * (2 ** (10 / 1200) - 1), 1e-9);
}
// 和弦
assert.deepEqual(buildChord(60, 'major'), [60, 64, 67]);
assert.deepEqual(buildChord(60, 'minor'), [60, 63, 67]);
assert.deepEqual(CHORDS.major.ratio, [4, 5, 6]);
{
  // 純律大三和弦 4:5:6：頻率比
  const [a, b, c] = CHORDS.major.ratio.map((x) => x * 55);
  near(b / a, 1.25); near(c / a, 1.5);
  // 小三和弦 10:12:15
  const [x, y, z] = CHORDS.minor.ratio;
  near(y / x, 6 / 5); near(z / x, 3 / 2);
}
assert.deepEqual(classify([60, 64, 67]), { kind: 'major', root: 'C', rootPc: 0 });
assert.deepEqual(classify([60, 63, 67]), { kind: 'minor', root: 'C', rootPc: 0 });
assert.equal(classify([64, 67, 72]).kind, 'major');          // E G C：C 大三和弦第一轉位
assert.equal(classify([64, 67, 72]).root, 'C');
assert.equal(classify([67, 72, 76]).kind, 'major');          // G C E：C 大三和弦第二轉位
assert.equal(classify([57, 60, 64]).kind, 'minor');          // A C E：A 小三和弦
assert.equal(classify([57, 60, 64]).root, 'A');
assert.equal(classify([60, 63, 66]).kind, 'dim');
assert.equal(classify([60, 64, 68]).kind, 'aug');
assert.equal(classify([60, 62, 67]).kind, 'other');
assert.equal(classify([60, 64]).kind, 'other');
assert.equal(classify([60, 64, 67, 72]).kind, 'major');      // 重複音名不算
// 題目
{
  const r = makeChordRounds(mulberry32(3), 6);
  assert.equal(r.length, 6);
  r.slice(1).forEach((x, i) => assert.notEqual(`${x.root}${x.kind}`, `${r[i].root}${r[i].kind}`));
  r.forEach((x) => { assert.ok(['major', 'minor'].includes(x.kind)); assert.ok(x.root >= 55 && x.root <= 66); });
  const f = chordFreqs(60, 'major'); near(f[0], midiToFreq(60)); near(f[2] / f[0], 2 ** (7 / 12), 1e-12);
}
assert.equal(INTERVALS.length, 8);
console.log('harmony.test.mjs ok');
