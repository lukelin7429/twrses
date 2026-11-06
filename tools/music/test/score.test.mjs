import assert from 'node:assert/strict';
import { BARS, BAR_BEATS, CONTOURS, MELODY, classify, makeContourRounds, posOf, renderScore, soundingCount } from '../src/score.js';
import { mulberry32 } from '../src/pitch.js';
import { midiToFreq } from '../src/pitch.js';
import { posToMidi } from '../src/staff.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
assert.equal(MELODY.length, BARS * BAR_BEATS); assert.equal(MELODY.at(-1), 60);
assert.ok(MELODY.every((m) => [0, 2, 4, 5, 7, 9, 11].includes(m % 12)), 'only white keys, so the staff needs no accidentals');
// 譜上的位置與播放的音高一致（來回換算）
MELODY.forEach((m) => { assert.equal(posToMidi(posOf(m), 'treble'), m); assert.ok(midiToFreq(m) > 200); });
// 無聲小節：音不響、時間不變、總長不變
{
  const all = renderScore([]), some = renderScore([1, 3]);
  assert.equal(all.notes.length, 16); assert.ok(all.notes.every((n) => n.sound));
  assert.equal(some.notes.filter((n) => !n.sound).length, 8);
  some.notes.forEach((n, i) => { near(n.time, all.notes[i].time); assert.equal(n.midi, all.notes[i].midi); assert.equal(!n.sound, [1, 3].includes(n.bar)); });
  near(some.total, all.total); near(some.silentSeconds, 8 * 60 / 84);
  assert.equal(soundingCount([0, 1, 2, 3]), 0); assert.equal(soundingCount([]), 16);
}
// 輪廓分類
assert.equal(classify([60, 62, 64, 65]), 'up'); assert.equal(classify([65, 64, 62, 60]), 'down');
assert.equal(classify([60, 64, 67, 62]), 'peak'); assert.equal(classify([60, 67, 64, 62]), 'peak');
assert.equal(classify([67, 62, 60, 64]), 'valley'); assert.equal(classify([67, 60, 62, 64]), 'valley');
assert.equal(classify([60, 67, 62, 69]), 'zigzag'); assert.equal(classify([67, 60, 69, 62]), 'zigzag');
assert.equal(classify([60, 60, 62, 64]), 'steady');
// 題目：輪廓與答案相符、三個選項不同且含答案、五種輪廓都出現、相鄰不同
for (let s = 1; s < 60; s++) {
  const rs = makeContourRounds(mulberry32(s), 6); assert.equal(rs.length, 6);
  rs.forEach((r, i) => {
    assert.equal(classify(r.pitches), r.answer);
    assert.equal(new Set(r.options).size, 3); assert.ok(r.options.includes(r.answer));
    if (i) assert.notEqual(r.answer, rs[i - 1].answer);
    r.pitches.forEach((m) => assert.ok(posOf(m) >= -2 && posOf(m) <= 10));
  });
  assert.equal(new Set(rs.map((r) => r.answer)).size, CONTOURS.length);
}
console.log('score.test.mjs ok');
