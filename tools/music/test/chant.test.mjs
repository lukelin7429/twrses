import assert from 'node:assert/strict';
import { BPM, GAP_BEATS, PHRASES, PHRASE_BEATS, SING_BEATS, TOTAL_BEATS, breathBeats, coverage, gapOf, intervalsSd, knockTimes, longestSilence, makeSteadyRounds, renderChant, singSegments, totalSeconds, voiceGain } from '../src/chant.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
assert.equal(PHRASE_BEATS, 8); assert.equal(SING_BEATS + GAP_BEATS, 8); assert.equal(TOTAL_BEATS, 24);
near(totalSeconds(72), 24 * 60 / 72);
// 混音：總能量不變
for (let n = 1; n <= 4; n++) near(n * voiceGain(n) ** 2, 1);
// 一起換氣：每個聲部的唱與換氣時間一樣；空隙 2 拍；覆蓋率 = 6/8
for (let n = 1; n <= 4; n++) {
  const a = singSegments('together', 0, n);
  for (let v = 1; v < n; v++) assert.deepEqual(singSegments('together', v, n), a);
  near(coverage('together', n), 0.75, 0.01);
  near(longestSilence('together', n), 2, 0.03);
}
// 輪流換氣：一個聲部時和一起換氣一樣；兩個以上時聲音不中斷
near(coverage('staggered', 1), 0.75, 0.01);
for (let n = 2; n <= 4; n++) { assert.ok(coverage('staggered', n) > 0.99, `n=${n}`); assert.ok(longestSilence('staggered', n) < 0.03); }
// 輪流換氣時，每個聲部自己的換氣是 2 拍，並且各不相同
for (let n = 2; n <= 4; n++) {
  const starts = new Set(); for (let v = 0; v < n; v++) starts.add(gapOf('staggered', v, n)[0]);
  assert.equal(starts.size, n);
  for (let v = 0; v < n; v++) {
    const segs = singSegments('staggered', v, n);
    const sung = segs.reduce((s, x) => s + (x.end - x.start), 0);
    near(sung, TOTAL_BEATS - GAP_BEATS * PHRASES.length, 1e-9);
  }
}
// 事件：每拍一個敲擊、間隔固定；聲部音高跟著樂句
{
  const ev = renderChant({ bpm: 72, n: 3, mode: 'staggered' });
  const k = ev.filter((e) => e.part === 'knock'); assert.equal(k.length, TOTAL_BEATS);
  k.slice(1).forEach((e, i) => near(e.time - k[i].time, 60 / 72));
  ev.filter((e) => e.part === 'voice').forEach((e) => assert.equal(e.midi, PHRASES[Math.floor(e.beat / PHRASE_BEATS)]));
  assert.equal(renderChant({ knock: false }).filter((e) => e.part === 'knock').length, 0);
}
// 呼吸：6 秒在 72 BPM 是 7.2 拍
near(breathBeats(6, 72), 7.2);
// 敲擊：穩的間隔固定；晃的有明顯的標準差
{
  const s = knockTimes(72, 16, 0, mulberry32(1)), w = knockTimes(72, 16, 60, mulberry32(1));
  assert.ok(intervalsSd(s) < 1e-6); assert.ok(intervalsSd(w) > 15);
}
for (let sd = 1; sd < 40; sd++) { const rs = makeSteadyRounds(mulberry32(sd), 6); assert.equal(rs.length, 6); assert.ok(rs.some((r) => r.steady === 0) && rs.some((r) => r.steady === 1)); }
assert.equal(BPM, 72);
console.log('chant.test.mjs ok');
