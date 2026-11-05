import assert from 'node:assert/strict';
import { FORMS, KEYS, SECTIONS, SECTION_BEATS, distinctCount, makeFormRounds, positions, renderForm, repeatCount, totalBeats, totalSeconds } from '../src/form.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
// 每個段落 8 拍、8 個旋律音、4 個低音；旋律在人聲好唱的範圍
for (const k of KEYS) {
  const s = SECTIONS[k];
  assert.equal(s.melody.length, SECTION_BEATS); assert.equal(s.bass.length, 4);
  assert.ok(s.melody.every((m) => m >= 60 && m <= 76));
}
// 變化：三個段落的旋律兩兩不同；B 結束在主音 C，A 沒有
{
  const m = (k) => SECTIONS[k].melody.join();
  assert.notEqual(m('A'), m('B')); assert.notEqual(m('A'), m('C')); assert.notEqual(m('B'), m('C'));
  assert.equal(SECTIONS.B.melody.at(-1) % 12, 0); assert.notEqual(SECTIONS.A.melody.at(-1) % 12, 0);
}
// 重複：同一個段落每次出現，音高序列與相對時間都完全一樣
for (const f of FORMS) {
  const ev = renderForm(f.key), bs = 0.6;
  for (const k of KEYS) {
    const slots = [...new Set(ev.filter((e) => e.section === k).map((e) => e.slot))];
    if (slots.length < 2) continue;
    const seq = (slot) => ev.filter((e) => e.section === k && e.slot === slot).map((e) => `${e.part}:${e.midi}:${+(e.time - slot * SECTION_BEATS * bs).toFixed(6)}`);
    slots.slice(1).forEach((s) => assert.deepEqual(seq(s), seq(slots[0])), `${f.key} ${k}`);
  }
}
// 長度：總拍數與秒數；段落邊界都在 8 的倍數（小節線上）
{
  assert.equal(totalBeats('ABAB'), 32); near(totalSeconds('ABAB'), 32 * 0.6);
  const ev = renderForm('AABA');
  ev.filter((e) => e.part === 'melody').forEach((e) => { assert.ok(e.beat >= e.slot * 8 && e.beat < (e.slot + 1) * 8); });
  assert.equal(ev.filter((e) => e.part === 'melody').length, 32);
}
// 計數
assert.equal(distinctCount('AABA'), 2); assert.equal(repeatCount('AABA'), 2);
assert.equal(distinctCount('ABCB'), 3); assert.equal(repeatCount('ABCB'), 1);
assert.deepEqual(positions('ABAB'), { A: [1, 3], B: [2, 4] });
// 題目：四種結構都有、相鄰不同
for (let s = 1; s < 40; s++) {
  const rs = makeFormRounds(mulberry32(s), 6); assert.equal(rs.length, 6);
  assert.equal(new Set(rs).size, 4); for (let i = 1; i < rs.length; i++) assert.notEqual(rs[i], rs[i - 1]);
}
console.log('form.test.mjs ok');
