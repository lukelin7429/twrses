import assert from 'node:assert/strict';
import { BEATS, MELODY, MODES, OFFSETS, OTHER, entryBeats, makeCanonRounds, renderCanon, simultaneousIntervals, totalBeats, totalSeconds, voiceGain } from '../src/canon.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
assert.equal(MELODY.length, BEATS); assert.equal(OTHER.length, BEATS);
// 旋律的結構：偶數拍是 C E G，奇數拍是 D F A
MELODY.forEach((m, i) => assert.ok((i % 2 === 0 ? [0, 4, 7] : [2, 5, 9]).includes(m % 12), `beat ${i}`));
// 混音總能量不變
for (let n = 1; n <= 4; n++) near(n * voiceGain(n) ** 2, 1);
// 卡農：每個聲部第 k 個晚 k×offset 拍進來；音高序列（不看八度）與第一個聲部相同；每個聲部唱兩遍
for (const off of OFFSETS) for (let n = 2; n <= 4; n++) {
  const ev = renderCanon('canon', n, off);
  assert.deepEqual(entryBeats('canon', n, off), [...Array(n).keys()].map((v) => v * off));
  const pcs = (v) => ev.filter((e) => e.voice === v).map((e) => ((e.midi % 12) + 12) % 12);
  for (let v = 1; v < n; v++) assert.deepEqual(pcs(v), pcs(0));
  assert.equal(ev.filter((e) => e.voice === 0).length, 2 * BEATS);
  assert.equal(totalBeats('canon', n, off), off * (n - 1) + 32);
}
// 疊起來不刺耳（沒有半音、三全音、大七度）：所有模式、聲部數、錯開拍數
for (const off of OFFSETS) for (let n = 2; n <= 4; n++) {
  const iv = simultaneousIntervals('canon', n, off);
  assert.ok(iv.length > 0 && iv.every((i) => ![1, 6, 11].includes(i)), `canon n=${n} off=${off}: ${[...new Set(iv)]}`);
}
for (let n = 2; n <= 4; n++) assert.ok(simultaneousIntervals('unison', n, 0).every((i) => i === 0));
{
  const iv = simultaneousIntervals('different', 2, 0);
  assert.equal(iv.length, BEATS); assert.ok(iv.every((i) => [3, 4, 5, 7, 8, 9].includes(i)), [...new Set(iv)].join());
  // 兩條旋律不一樣（至少 12 個拍不同）
  assert.ok(OTHER.filter((m, i) => m % 12 !== MELODY[i] % 12).length >= 12);
}
// 奇數拍錯開不保證不刺耳（這也是滑桿不開放的原因）
assert.ok(!simultaneousIntervals('canon', 2, 1).every((i) => ![1, 6, 11].includes(i)));
near(totalSeconds('canon', 3, 4), (4 * 2 + 32) * 60 / 88);
// 題目：三種各兩次、相鄰不同
for (let s = 1; s < 40; s++) {
  const rs = makeCanonRounds(mulberry32(s), 6); assert.equal(rs.length, 6);
  assert.equal(new Set(rs.map((r) => r.mode)).size, MODES.length);
  rs.forEach((r, i) => { if (i) assert.notEqual(r.mode, rs[i - 1].mode); assert.ok(OFFSETS.includes(r.offset)); assert.ok(r.n >= 2 && r.n <= 4); });
}
console.log('canon.test.mjs ok');
