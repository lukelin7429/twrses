import assert from 'node:assert/strict';
import { BASS, BEATS, EIGHTHS, MELODY, PENTA, clampRatio, eighthBeat, eighthSeconds, makeSwingRounds, nearestEighth, offbeatNotes, offbeatPos, quantizeTaps, renderSwing, split, totalSeconds } from '../src/swing.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
// 比例：1 平均、2:1 在三分之二、3:1 在四分之三
near(offbeatPos(1), 0.5); near(offbeatPos(2), 2 / 3); near(offbeatPos(3), 0.75);
near(split(2).first, 2 / 3); near(split(2).second, 1 / 3); near(split(1.7).first + split(1.7).second, 1);
near(clampRatio(0.2), 1); near(clampRatio(9), 3);
// 正拍不動，只有反拍往後移
for (const r of [1, 1.5, 2, 3]) {
  for (let i = 0; i < EIGHTHS; i += 2) near(eighthBeat(i, r), i / 2);
  for (let i = 1; i < EIGHTHS; i += 2) { near(eighthBeat(i, r), (i - 1) / 2 + offbeatPos(r)); assert.ok(eighthBeat(i, r) >= (i - 1) / 2 + 0.5); }
}
// 搖擺不改變速度：每一拍的開頭秒數與速度有關，與 ratio 無關；總長不變
near(eighthSeconds(8, 120, 1), eighthSeconds(8, 120, 3));
near(eighthSeconds(9, 120, 1), 4.5 * 0.5); near(eighthSeconds(9, 120, 2), (4 + 2 / 3) * 0.5);
near(totalSeconds(120), 8);
// 旋律：三種比例音高序列相同、結束在 C4、涵蓋 32 個八分音符
assert.equal(MELODY[MELODY.length - 1][0], 60);
const last = MELODY[MELODY.length - 1]; assert.equal(last[1] + last[2], EIGHTHS);
const pitches = (r) => renderSwing({ bpm: 120, ratio: r }).filter((e) => e.part === 'melody').map((e) => e.midi);
assert.deepEqual(pitches(1), pitches(2)); assert.deepEqual(pitches(1), pitches(3)); assert.deepEqual(pitches(1), MELODY.map((n) => n[0]));
// 不重疊：每個旋律音在下一個音開始前結束
for (const r of [1, 2, 3]) {
  const m = renderSwing({ bpm: 120, ratio: r }).filter((e) => e.part === 'melody');
  m.slice(1).forEach((e, k) => assert.ok(m[k].time + m[k].dur <= e.time + 1e-9));
  m.forEach((e) => assert.ok(e.dur > 0));
}
// 低音每拍一個、不隨搖擺移動；hat 每個八分音符一個，反拍隨搖擺移動
{
  const a = renderSwing({ bpm: 120, ratio: 1 }), b = renderSwing({ bpm: 120, ratio: 2 });
  assert.equal(BASS.length, BEATS);
  assert.deepEqual(a.filter((e) => e.part === 'bass').map((e) => e.time), b.filter((e) => e.part === 'bass').map((e) => e.time));
  assert.equal(b.filter((e) => e.part === 'hat').length, EIGHTHS);
  const hat = b.filter((e) => e.part === 'hat'); near(hat[1].time, (2 / 3) * 0.5); near(hat[0].time, 0);
  assert.equal(renderSwing({ hat: false }).filter((e) => e.part === 'hat').length, 0);
}
assert.ok(offbeatNotes() >= 8, 'the tune has many off-beat notes, so swing is audible');
// 貼格：貼到最近的八分音符格（用搖擺後的位置）
assert.equal(nearestEighth(0.02, 2), 0); assert.equal(nearestEighth(0.6, 2), 1); assert.equal(nearestEighth(0.6, 1), 1); assert.equal(nearestEighth(0.2, 1), 0);
assert.equal(nearestEighth(3.7, 2), 7); assert.equal(nearestEighth(7.9, 2), 16);
{
  const q = quantizeTaps([{ beat: 0.05, midi: 60 }, { beat: 0.62, midi: 64 }, { beat: 1.1, midi: 67 }], 2, 120);
  assert.deepEqual(q.map((x) => x.eighth), [0, 1, 2]);
  near(q[1].time, (2 / 3) * 0.5);
  // 同一格只留最後一個
  assert.equal(quantizeTaps([{ beat: 0.1, midi: 60 }, { beat: 0.0, midi: 62 }], 1, 120).length, 1);
}
assert.ok(PENTA.every((m) => [0, 2, 4, 7, 9].includes(m % 12)));
// 題目：六題，有搖擺也有平均；平均的 ratio 為 1，搖擺的至少 1.7
for (let s = 1; s < 40; s++) {
  const rs = makeSwingRounds(mulberry32(s), 6);
  assert.equal(rs.length, 6); assert.ok(rs.some((r) => r.swung) && rs.some((r) => !r.swung));
  rs.forEach((r) => assert.ok(r.swung ? r.ratio >= 1.7 : r.ratio === 1));
}
console.log('swing.test.mjs ok');
