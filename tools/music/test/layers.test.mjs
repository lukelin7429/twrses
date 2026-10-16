import assert from 'node:assert/strict';
import { BEATS, MELODY_MIDI, MODES, ROUND_OFFSET, makeLayerRounds, melodyNotes, renderLayers, scaleStepDown, simultaneousIntervals, totalSeconds, voiceGain } from '../src/layers.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
assert.equal(MELODY_MIDI.length, BEATS);
assert.ok(MELODY_MIDI.every((m) => [0, 2, 4, 7, 9].includes(m % 12)), 'only pentatonic notes (C D E G A)');
assert.equal(MELODY_MIDI[0], 60);
// 併音：音的總長等於 16 拍
{ const nl = melodyNotes(); assert.equal(nl.reduce((s, n) => s + n[2], 0), BEATS); assert.ok(nl.length < BEATS); }
// 混音：聲部越多，每個聲部越小聲，但總能量不變
for (let n = 1; n <= 4; n++) near(n * voiceGain(n) ** 2, 1);
// 齊唱：每個聲部音高序列相同、時間只有極小的差
{
  const ev = renderLayers('unison', 3), per = ev.length / 3;
  const by = (v) => ev.filter((e) => e.voice === v);
  assert.equal(by(0).length, per);
  assert.deepEqual(by(1).map((e) => e.midi), by(0).map((e) => e.midi));
  by(1).forEach((e, i) => assert.ok(Math.abs(e.time - by(0)[i].time) < 0.03));
  assert.ok(by(1).some((e) => e.cents !== 0));
}
// 輪唱：聲部 k 比聲部 0 晚 k × 4 拍進來，音高序列相同；每個聲部唱兩遍
{
  const ev = renderLayers('round', 4), bs = 60 / 96;
  [0, 1, 2, 3].forEach((v) => {
    const a = ev.filter((e) => e.voice === v);
    near(a[0].time, v * ROUND_OFFSET * bs);
    assert.deepEqual(a.slice(0, a.length / 2).map((e) => e.midi), melodyNotes().map((n) => n[0]));
  });
  near(totalSeconds('round', 4), (ROUND_OFFSET * 3 + 2 * BEATS) * bs);
}
// 持續音：只有一個聲部唱旋律，其餘是長音 C
{
  const ev = renderLayers('drone', 3);
  const drones = ev.filter((e) => e.drone);
  assert.equal(drones.length, 2); assert.ok(drones.every((e) => e.midi % 12 === 0 && e.dur >= 15 * 60 / 96));
  assert.equal(ev.filter((e) => !e.drone).length, melodyNotes().length);
}
// 分部：第二聲部在音階裡比旋律低三度（兩個音階音），音都在 C 大調裡
{
  assert.equal(scaleStepDown(64, 2), 60); assert.equal(scaleStepDown(60, 2), 57); assert.equal(scaleStepDown(69, 2), 65);
  const ev = renderLayers('parts', 4);
  assert.ok(ev.every((e) => [0, 2, 4, 5, 7, 9, 11].includes(e.midi % 12)));
  const v0 = ev.filter((e) => e.voice === 0), v1 = ev.filter((e) => e.voice === 1);
  v1.forEach((e, i) => assert.equal(e.time, v0[i].time));
  assert.equal(ev.filter((e) => e.voice === 3)[0].midi, v0[0].midi - 12);
}
// 疊起來不會有半音、三全音或大七度（pitch class 差 1、6、11）
for (const m of MODES) for (let n = 2; n <= 4; n++) {
  const ivs = simultaneousIntervals(m.key, n);
  assert.ok(ivs.every((i) => ![1, 6, 11].includes(i)), `${m.key} ${n}: ${[...new Set(ivs)]}`);
}
// 題目
for (let s = 1; s < 40; s++) {
  const rs = makeLayerRounds(mulberry32(s), 6);
  assert.equal(rs.length, 6);
  assert.equal(new Set(rs.map((r) => r.mode)).size, 4);
  rs.forEach((r) => assert.ok(r.n >= 2 && r.n <= 4));
}
console.log('layers.test.mjs ok');
