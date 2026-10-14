import assert from 'node:assert/strict';
import { BANGDI_HOLES, INSTRUMENTS, MELODIC, PENTATONIC, TUNE, WAYS, instrumentOf, makeWayRounds, noteFreq, noteMidi, recipeOf, scheduleTune, tuneBeats, wayOf } from '../src/chinese.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
assert.deepEqual(WAYS.map((w) => w.zh), ['吹', '拉', '彈', '打']);
assert.deepEqual(WAYS.map((w) => w.key), ['blow', 'bow', 'pluck', 'strike']);
// 每件樂器的方式：二胡拉、琵琶彈、笛吹、鼓與鑼打
assert.equal(instrumentOf('erhu').way, 'bow'); assert.equal(instrumentOf('pipa').way, 'pluck'); assert.equal(instrumentOf('dizi').way, 'blow');
assert.equal(instrumentOf('gu').way, 'strike'); assert.equal(instrumentOf('luo').way, 'strike');
INSTRUMENTS.forEach((i) => assert.ok(wayOf(i.way)));
assert.equal(instrumentOf('erhu').strings, 2); assert.equal(instrumentOf('pipa').strings, 4);
assert.deepEqual(BANGDI_HOLES, { blow: 1, membrane: 1, finger: 6 });
assert.equal(BANGDI_HOLES.blow + BANGDI_HOLES.membrane + BANGDI_HOLES.finger, 8);
// 五聲音階：宮商角徵羽＝0 2 4 7 9（大調五聲的 1 2 3 5 6）
assert.deepEqual(PENTATONIC.map((p) => p.zh), ['宮', '商', '角', '徵', '羽']);
assert.deepEqual(PENTATONIC.map((p) => p.semis), [0, 2, 4, 7, 9]);
assert.equal(noteMidi(0, 60), 60); assert.equal(noteMidi(3, 60), 67); assert.equal(noteMidi(5, 60), 72); assert.equal(noteMidi(9, 60), 81);
near(noteFreq(0, 69), 440); near(noteFreq(5, 60) / noteFreq(0, 60), 2, 1e-9);
// 旋律：只用五聲音階（索引 0–6），結束在宮（回家），總拍數固定
TUNE.forEach((n) => assert.ok(n.i >= 0 && n.i <= 5));
assert.equal(TUNE.at(-1).i, 0); assert.equal(tuneBeats(), 16);
{
  const s = scheduleTune(96, 62);
  near(s[0].time, 0); near(s.at(-1).time + s.at(-1).dur, 16 * 60 / 96, 1e-9);
  s.slice(1).forEach((e, i) => assert.ok(e.time > s[i].time));
  // 都落在 D4 為宮的五聲音階音上
  const pcs = new Set(PENTATONIC.map((p) => (62 + p.semis) % 12));
  s.forEach((e) => assert.ok(pcs.has(e.midi % 12), `${e.midi}`));
}
// 配方
for (const i of INSTRUMENTS) {
  const r = recipeOf(i.key, 220);
  assert.ok(['complex', 'inharmonic'].includes(r.kind) && r.dur > 0 && r.gain > 0 && r.gain <= 0.9, i.key);
  if (r.kind === 'complex') assert.ok(Math.max(...r.amps) === 1 && r.amps.length >= 6);
  else assert.equal(r.ratios.length, r.amps.length);
}
assert.ok(recipeOf('pipa', 220).env.attack < recipeOf('erhu', 220).env.attack, 'plucked starts faster than bowed');
assert.equal(recipeOf('pipa', 220).env.sustain, 0);
assert.ok(recipeOf('dizi', 220).noise, 'dizi has a breath noise');
assert.ok(recipeOf('luo', 220).dur > recipeOf('gu', 220).dur);
assert.deepEqual(MELODIC, ['erhu', 'pipa', 'dizi']);
// 題目：每件樂器都至少一次，相鄰不同
{
  const q = makeWayRounds(mulberry32(5), 6);
  assert.equal(q.length, 6);
  INSTRUMENTS.forEach((i) => assert.ok(q.some((x) => x.key === i.key)));
  q.slice(1).forEach((x, i) => assert.notEqual(x.key, q[i].key));
  q.forEach((x) => assert.ok(x.f0 > 0));
}
console.log('chinese.test.mjs ok');
