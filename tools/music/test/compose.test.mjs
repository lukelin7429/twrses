import assert from 'node:assert/strict';
import { MISSING, PENTA, PENTA_PC, ROWS, STARTERS, STEPS, analyze, emptySteps, isPenta, makeOddRounds, pcInterval, renderCompose, whyOdd } from '../src/compose.js';
import { mulberry32 } from '../src/pitch.js';

// 五聲音階的性質：任兩個音之間都沒有半音（1、11）或三全音（6）——用算的證明
for (const a of PENTA_PC) for (const b of PENTA_PC) if (a !== b) assert.ok(![1, 6, 11].includes(pcInterval(a, b)), `${a}-${b}`);
// 這個性質在 C 大調的七個音裡不成立：F 與 E、B 與 C 相差半音，F 與 B 是三全音
assert.equal(pcInterval(65, 64), 1); assert.equal(pcInterval(72, 71), 1); assert.equal(pcInterval(71, 65), 6);
assert.ok(MISSING.every((m) => !isPenta(m))); assert.ok(PENTA.every(isPenta));
assert.deepEqual([...ROWS].sort((a, b) => b - a), ROWS);
// 現成旋律：只用五聲音階、結束在 C、8 格、沒有半音
STARTERS.forEach((s) => {
  assert.equal(s.steps.length, STEPS);
  const a = analyze(s.steps);
  assert.ok(a.inScale && a.endsHome && a.semitones === 0, s.key);
});
// analyze：各項規則
{
  const a = analyze([60, 62, 64, 67, null, null, null, 60]);
  assert.equal(a.count, 5); assert.equal(a.distinct, 4); assert.ok(a.inScale && a.endsHome);
  const b = analyze([60, 65, 64, 60, null, null, null, 67]);
  assert.deepEqual(b.outside, [65]); assert.ok(!b.inScale); assert.ok(!b.endsHome); assert.ok(b.semitones >= 1);
  assert.equal(analyze(emptySteps()).count, 0); assert.ok(!analyze(emptySteps()).inScale);
  // 重複的小圖樣：上行二度出現兩次（間隔至少兩格）
  assert.ok(analyze([60, 62, 60, 62, 60, 62, 60, 62]).repeat);
  assert.ok(!analyze([60, 64, 67, 72, null, null, null, null]).repeat);
}
// 播放事件：休止不發聲、時間遞增
{ const ev = renderCompose([60, null, 64, null, null, null, null, 72]); assert.equal(ev.length, 3); assert.deepEqual(ev.map((e) => e.step), [0, 2, 7]); }
// 題目：每題一個 F 或 B、其餘四個是五聲音階的音；兩種都出現；說得出和哪個音相差半音（或沒有）
for (let s = 1; s < 60; s++) {
  const rs = makeOddRounds(mulberry32(s), 6); assert.equal(rs.length, 6);
  rs.forEach((r) => {
    assert.equal(r.notes.length, 5); assert.equal(new Set(r.notes).size, 5);
    assert.equal(r.notes.filter((m) => !isPenta(m)).length, 1); assert.ok(r.notes.includes(r.odd) && !isPenta(r.odd));
    const w = whyOdd(r.notes, r.odd); assert.ok(w === null || [1, 11].includes(pcInterval(w, r.odd)));
  });
  assert.equal(new Set(rs.map((r) => r.odd)).size, 2);
}
console.log('compose.test.mjs ok');
