import assert from 'node:assert/strict';
import {
  A4, SEMITONE, centsBetween, freqToMidiFloat, freqToSlider, hearingZone, HIGHER_GAPS, justVsEqual, keyRange,
  makeHigherRound, midiToFreq, mulberry32, nearestNote, noteInfo, octavesBetween, PRESETS, ratioToCents, safeScale,
  shiftCents, sliderToFreq, stringFreq, stringRatio,
} from '../src/pitch.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// 標準音與音號
assert.equal(A4, 440);
assert.equal(midiToFreq(69), 440);
near(midiToFreq(60), 261.6256, 1e-3, 'middle C');
near(midiToFreq(21), 27.5, 1e-9, 'A0 is the lowest piano key');
near(midiToFreq(108), 4186.009, 1e-3, 'C8 is the highest piano key');
near(SEMITONE, 1.059463, 1e-6, 'semitone ratio');
assert.equal(keyRange(21, 108).length, 88, 'a piano has 88 keys');

// 頻率加倍＝高一個八度（十二個半音）
for (const m of [21, 40, 60, 69, 96]) {
  near(midiToFreq(m + 12) / midiToFreq(m), 2, 1e-12, `octave above ${m}`);
}
near(octavesBetween(261.6256, 523.2511), 1, 1e-6, 'one octave');
near(centsBetween(440, 880), 1200, 1e-9, 'octave = 1200 cents');
near(shiftCents(440, 1200), 880, 1e-9, 'shift by 1200 cents doubles frequency');
near(ratioToCents(SEMITONE), 100, 1e-9, 'semitone = 100 cents');

// 音名
assert.deepEqual(
  (({ name, solfege, letter, octave }) => ({ name, solfege, letter, octave }))(noteInfo(60)),
  { name: 'C4', solfege: 'Do', letter: 'C', octave: 4 });
assert.equal(noteInfo(69).name, 'A4');
assert.equal(noteInfo(69).solfege, 'La');
assert.equal(noteInfo(61).name, 'C♯4');
assert.equal(noteInfo(61).white, false);
assert.equal(noteInfo(71).solfege, 'Si');
assert.equal(noteInfo(21).name, 'A0');
assert.equal(noteInfo(108).name, 'C8');
const n440 = nearestNote(440);
assert.equal(n440.name, 'A4'); near(n440.cents, 0, 1e-9);
const n450 = nearestNote(450);
assert.equal(n450.name, 'A4'); near(n450.cents, 38.9, 0.1, '450 Hz is about 39 cents above A4');
assert.equal(nearestNote(261.63).name, 'C4');
assert.equal(nearestNote(100).name, 'G2');
assert.equal(nearestNote(1000).name, 'B5');
near(freqToMidiFloat(880), 81, 1e-9);

// 弦：頻率和長度成反比
const C4 = midiToFreq(60);
near(stringFreq(1, C4), C4, 1e-12);
near(stringFreq(1 / 2, C4), 2 * C4, 1e-9, 'half the string = double the frequency');
near(stringFreq(1 / 2, C4), midiToFreq(72), 1e-9, 'half the string is exactly C5');
near(stringFreq(1 / 4, C4), midiToFreq(84), 1e-9, 'quarter of the string is two octaves up');
near(stringRatio(stringFreq(0.37, C4), C4), 0.37, 1e-12);
assert.equal(PRESETS.length, 4);
assert.deepEqual(PRESETS.map((p) => p.key), ['whole', 'half', 'twothirds', 'threequarters']);
for (const p of PRESETS) near(p.r, p.num / p.den, 1e-12, `${p.key} ratio`);

// 簡單整數比和十二平均律「不完全相等」：自己算的數字
const fifth = justVsEqual(2 / 3);
near(fifth.ratio, 1.5, 1e-12);
assert.equal(fifth.semis, 7);
near(fifth.justCents, 701.955, 1e-3, 'just fifth');
near(fifth.equalRatio, 1.498307, 1e-6, 'equal-tempered fifth ratio');
near(fifth.diff, 1.955, 1e-3, 'the just fifth is about 2 cents wider');
const fourth = justVsEqual(3 / 4);
assert.equal(fourth.semis, 5);
near(fourth.justCents, 498.045, 1e-3, 'just fourth');
near(fourth.diff, -1.955, 1e-3, 'the just fourth is about 2 cents narrower');
const oct = justVsEqual(1 / 2);
near(oct.diff, 0, 1e-9, 'the octave is exactly the same in both');
// 在鋼琴上的實際數字：C4 的弦的 2/3 長 → 392.44 Hz，G4（平均律）是 391.995 Hz
near(stringFreq(2 / 3, C4), 392.4384, 1e-3, '2/3 of the string');
near(midiToFreq(67), 391.9954, 1e-3, 'G4 on the piano');
near(stringFreq(3 / 4, C4), 348.8341, 1e-3, '3/4 of the string');
near(midiToFreq(65), 349.2282, 1e-3, 'F4 on the piano');
assert.equal(nearestNote(stringFreq(2 / 3, C4)).name, 'G4');
assert.equal(nearestNote(stringFreq(3 / 4, C4)).name, 'F4');
near(nearestNote(stringFreq(2 / 3, C4)).cents, 1.955, 1e-3);
near(nearestNote(stringFreq(3 / 4, C4)).cents, -1.955, 1e-3);
assert.equal(nearestNote(stringFreq(1 / 2, C4)).name, 'C5');

// 人耳範圍
assert.equal(hearingZone(10), 'infra');
assert.equal(hearingZone(20), 'audible');
assert.equal(hearingZone(440), 'audible');
assert.equal(hearingZone(20000), 'audible');
assert.equal(hearingZone(20001), 'ultra');
near(sliderToFreq(0, 20, 16000), 20, 1e-9);
near(sliderToFreq(1, 20, 16000), 16000, 1e-6);
near(freqToSlider(sliderToFreq(0.42, 20, 16000), 20, 16000), 0.42, 1e-12);
assert.equal(safeScale(1000), 1);
assert.equal(safeScale(4000), 1);
assert.ok(safeScale(8000) < 0.5);
assert.ok(safeScale(16000) >= 0.12 && safeScale(16000) < safeScale(8000));
assert.ok(safeScale(5000) > safeScale(6000), 'quieter as it goes higher');

// 哪一個比較高？八題，越後面越接近；固定種子可以重現
assert.equal(HIGHER_GAPS.length, 8);
for (let i = 1; i < HIGHER_GAPS.length; i++) assert.ok(HIGHER_GAPS[i] < HIGHER_GAPS[i - 1], 'gaps shrink');
const rng = mulberry32(12345);
let highA = 0;
for (let q = 0; q < 8; q++) {
  const r = makeHigherRound(rng, q);
  near(Math.abs(centsBetween(Math.min(r.a, r.b), Math.max(r.a, r.b))), HIGHER_GAPS[q], 1e-6, `question ${q} gap`);
  assert.ok((r.higher === 'a' ? r.a > r.b : r.b > r.a), 'higher points at the larger frequency');
  assert.ok(Math.min(r.a, r.b) >= 220 - 1e-9 && Math.min(r.a, r.b) <= 660 + 1e-9);
  if (r.higher === 'a') highA++;
}
const again = mulberry32(12345); assert.equal(makeHigherRound(again, 0).a, makeHigherRound(mulberry32(12345), 0).a);
// 兩邊都會出現
const rng2 = mulberry32(7); let sides = new Set();
for (let i = 0; i < 40; i++) sides.add(makeHigherRound(rng2, 0).higher);
assert.equal(sides.size, 2);

console.log('pitch.test.mjs ok');
