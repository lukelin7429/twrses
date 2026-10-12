import assert from 'node:assert/strict';
import { CLEFS, LETTERS, describePos, isLinePos, ledgerPositions, makeStaffRounds, midiToPos, midiToStep, posInfo, posToMidi, staffNames, stepInfo, stepToMidi } from '../src/staff.js';
import { mulberry32, midiToFreq } from '../src/pitch.js';

// 階與音號
assert.equal(stepToMidi(28), 60);                    // C4
assert.equal(stepInfo(28).name, 'C4'); assert.equal(stepInfo(28).solfege, 'Do');
assert.equal(stepInfo(33).name, 'A4'); assert.equal(stepToMidi(33), 69);
assert.equal(midiToStep(60), 28); assert.equal(midiToStep(72), 35);
assert.throws(() => midiToStep(61));
assert.equal(stepInfo(28).freq, midiToFreq(60));
for (let s = 7; s < 60; s++) assert.equal(midiToStep(stepToMidi(s)), s);

// 高音譜號：五條線 E4 G4 B4 D5 F5、四個間 F4 A4 C5 E5
assert.deepEqual(staffNames('treble').lines, ['E4', 'G4', 'B4', 'D5', 'F5']);
assert.deepEqual(staffNames('treble').spaces, ['F4', 'A4', 'C5', 'E5']);
// 低音譜號：五條線 G2 B2 D3 F3 A3、四個間 A2 C3 E3 G3
assert.deepEqual(staffNames('bass').lines, ['G2', 'B2', 'D3', 'F3', 'A3']);
assert.deepEqual(staffNames('bass').spaces, ['A2', 'C3', 'E3', 'G3']);
// 譜號圈住的那條線
assert.equal(posInfo(CLEFS.treble.anchorPos, 'treble').name, 'G4');      // G 譜號的圈：第二線
assert.equal(posInfo(CLEFS.bass.anchorPos, 'bass').name, 'F3');           // F 譜號的兩點：第四線
assert.equal(CLEFS.treble.anchorPos, 2); assert.equal(CLEFS.bass.anchorPos, 6);
// 中央 C
assert.equal(midiToPos(60, 'treble'), -2);                // 高音譜號下加一線
assert.equal(midiToPos(60, 'bass'), 10);                  // 低音譜號上加一線
assert.deepEqual(ledgerPositions(-2), [-2]); assert.deepEqual(ledgerPositions(10), [10]);
assert.deepEqual(ledgerPositions(-4), [-2, -4]); assert.deepEqual(ledgerPositions(-3), [-2]);
assert.deepEqual(ledgerPositions(12), [10, 12]); assert.deepEqual(ledgerPositions(9), []); assert.deepEqual(ledgerPositions(4), []);
// 高八度＝高七個位置
for (const c of ['treble', 'bass']) for (let p = -4; p <= 5; p++) assert.equal(posToMidi(p + 7, c), posToMidi(p, c) + 12);
// 高音譜號最底下的線 E4（MIDI 64）；A4（440 Hz）在第二間
assert.equal(posToMidi(0, 'treble'), 64);
assert.equal(posToMidi(3, 'treble'), 69);
assert.equal(posInfo(3, 'treble').freq, 440);
// 同一個音在兩個譜號的位置差 12（半格）：C4 treble -2 vs bass 10
assert.equal(midiToPos(60, 'bass') - midiToPos(60, 'treble'), 12);
// 線與間
for (let p = -4; p <= 12; p++) assert.equal(isLinePos(p), p % 2 === 0);
// 說法
assert.equal(describePos(0).en, 'on the first line');
assert.equal(describePos(8).en, 'on the fifth line');
assert.equal(describePos(1).en, 'in the first space'); assert.equal(describePos(7).en, 'in the fourth space');
assert.equal(describePos(-2).en, 'on the first ledger line below the staff'); assert.equal(describePos(10).en, 'on the first ledger line above the staff');
assert.equal(describePos(-1).en, 'in the space just below the staff'); assert.equal(describePos(9).en, 'in the space just above the staff');
assert.equal(describePos(-4).en, 'on the second ledger line below the staff');
assert.equal(describePos(-3).en, 'in the space below the first ledger line');
assert.equal(describePos(0).zh, '在第一線上'); assert.equal(describePos(-2).zh, '在五線下方的第一條加線上');
// 題目
{
  const r = makeStaffRounds(mulberry32(11), 8);
  assert.equal(r.length, 8);
  assert.deepEqual(r.map((q) => q.clef), ['treble', 'bass', 'treble', 'bass', 'treble', 'bass', 'treble', 'bass']);
  for (let i = 1; i < r.length; i++) assert.notEqual(r[i].pos, r[i - 1].pos);
  assert.ok(r.every((q) => q.pos >= -2 && q.pos <= 10));
  assert.deepEqual(makeStaffRounds(mulberry32(11), 8), r);
  assert.ok(r.every((q) => LETTERS.includes(posInfo(q.pos, q.clef).letter)));
}
console.log('staff.test.mjs ok');
