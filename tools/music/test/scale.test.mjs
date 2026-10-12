import assert from 'node:assert/strict';
import { SCALES, SCALE_KEYS, TONICS, BLACK_KEYS, TUNE_IDX, gapName, gapRatio, gaps, isBlackMidi, makeScaleRounds, patternOf, scheduleNotes, spell, spellNames, tuneNotes } from '../src/scale.js';
import { SEMITONE, mulberry32, midiToFreq } from '../src/pitch.js';

const near = (a, b, eps = 1e-9, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);
const names = (t, k, o) => spellNames(spell(t, k, o)).join(' ');

// 圖樣
assert.equal(patternOf(SCALES.major.semis), 'W W H W W W H');
assert.equal(patternOf(SCALES.minor.semis), 'W H W W H W W');
assert.equal(patternOf(SCALES.majpent.semis), 'W W W+H W W+H');
assert.equal(patternOf(SCALES.minpent.semis), 'W+H W W W+H W');
assert.deepEqual(gaps(SCALES.major.semis), [2, 2, 1, 2, 2, 2, 1]);
// 八度＝12 個半音
for (const k of SCALE_KEYS) assert.equal(SCALES[k].semis.at(-1), 12);
// 七聲音階 12 個半音：5 個全音＋2 個半音
for (const k of ['major', 'minor']) { const g = gaps(SCALES[k].semis); assert.equal(g.filter((x) => x === 2).length, 5); assert.equal(g.filter((x) => x === 1).length, 2); }
// 半音頻率比
near(gapRatio(1), SEMITONE); near(gapRatio(2), SEMITONE * SEMITONE); near(gapRatio(12), 2, 1e-12);
assert.equal(gapName(1).en, 'half step'); assert.equal(gapName(2).zh, '全音');
// 拼寫
assert.equal(names('C', 'major'), 'C D E F G A B C');
assert.equal(names('D', 'major'), 'D E F♯ G A B C♯ D');
assert.equal(names('E', 'major'), 'E F♯ G♯ A B C♯ D♯ E');
assert.equal(names('F', 'major'), 'F G A B♭ C D E F');
assert.equal(names('G', 'major'), 'G A B C D E F♯ G');
assert.equal(names('A', 'major'), 'A B C♯ D E F♯ G♯ A');
assert.equal(names('B', 'major'), 'B C♯ D♯ E F♯ G♯ A♯ B');
assert.equal(names('A', 'minor'), 'A B C D E F G A');
assert.equal(names('C', 'minor'), 'C D E♭ F G A♭ B♭ C');
assert.equal(names('D', 'minor'), 'D E F G A B♭ C D');
assert.equal(names('E', 'minor'), 'E F♯ G A B C D E');
assert.equal(names('C', 'majpent'), 'C D E G A C');
assert.equal(names('G', 'majpent'), 'G A B D E G');
assert.equal(names('A', 'minpent'), 'A C D E G A');
assert.equal(names('C', 'minpent'), 'C E♭ F G B♭ C');
// 所有主音、所有音階：升降只有 −1/0/1，七聲音階字母連續，音高對得上
for (const t of TONICS) for (const k of SCALE_KEYS) {
  const s = spell(t, k);
  s.forEach((n, i) => {
    assert.ok([-1, 0, 1].includes(n.acc), `${t} ${k} ${n.name}`);
    near(n.midi - s[0].midi, SCALES[k].semis[i]);
    near(n.freq, midiToFreq(n.midi));
  });
  if (k === 'major' || k === 'minor') {
    assert.equal(new Set(s.slice(0, 7).map((n) => n.letter)).size, 7);
  }
  // 最後一個音是高八度的主音（頻率 2 倍）
  near(s.at(-1).freq / s[0].freq, 2, 1e-9);
}
// 譜上位置（高音譜號）：C4＝−2，E4＝0，G4＝2；升降記號不改位置
{
  const c = spell('C', 'major'); assert.deepEqual(c.map((n) => n.pos), [-2, -1, 0, 1, 2, 3, 4, 5]);
  const d = spell('D', 'major'); assert.equal(d[2].pos, 1); assert.equal(d[2].acc, 1); assert.equal(d[2].name, 'F♯4');
  assert.equal(spell('B', 'major').at(-1).name, 'B5');
}
// 黑鍵
assert.deepEqual(BLACK_KEYS.map(isBlackMidi), [true, true, true, true, true]);
{ const s = spell('F', 'majpent', { acc: 1 }); assert.deepEqual(s.map((n) => n.midi), [66, 68, 70, 73, 75, 78]); assert.equal(spellNames(s).join(' '), 'F♯ G♯ A♯ C♯ D♯ F♯'); }
// 同一段旋律：換音階，節奏與走向相同，音高不同；結尾回主音
{
  const a = tuneNotes('C', 'major'), b = tuneNotes('C', 'minor'), p = tuneNotes('C', 'majpent');
  assert.equal(a.length, TUNE_IDX.length);
  assert.deepEqual(a.map((n) => n.beats), b.map((n) => n.beats));
  assert.equal(a[0].midi, b[0].midi); assert.equal(a.at(-1).midi, a[0].midi);
  assert.equal(a[2].midi - 60, 4); assert.equal(b[2].midi - 60, 3);           // 第三個音：大三度 vs 小三度
  assert.equal(p[3].midi - 60, 7);                                              // 五聲音階第四個音是 G
  // 走向（上去、下來）完全一樣
  const dir = (n) => n.slice(1).map((x, i) => Math.sign(x.midi - n[i].midi)).join('');
  assert.equal(dir(a), dir(b)); assert.equal(dir(a), dir(p));
}
// 排成時間
{
  const ev = scheduleNotes([{ midi: 60 }, { midi: 62, beats: 2 }, { midi: 64 }], 120);
  near(ev[0].time, 0); near(ev[0].dur, 0.5); near(ev[1].time, 0.5); near(ev[1].dur, 1); near(ev[2].time, 1.5);
}
// 題目：相鄰不同、只出三種音階
{
  const r = makeScaleRounds(mulberry32(5), 6);
  assert.equal(r.length, 6);
  r.slice(1).forEach((x, i) => assert.notEqual(`${x.tonic}${x.scale}`, `${r[i].tonic}${r[i].scale}`));
  r.forEach((x) => { assert.ok(['major', 'minor', 'majpent'].includes(x.scale)); assert.ok(TONICS.includes(x.tonic)); });
}
console.log('scale.test.mjs ok');
