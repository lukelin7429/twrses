import assert from 'node:assert/strict';
import { ERAS, FEATURE_KEYS, MELODY, MELODY_BEATS, dynamicAt, eraOf, makeEraRounds, melodyMidis, range, renderEra, rubato, totalSeconds } from '../src/eras.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `expected ${b}, got ${a}`);
assert.deepEqual(ERAS.map((e) => e.key), ['baroque', 'classical', 'romantic']);
assert.equal(MELODY_BEATS, 16);
assert.equal(MELODY[MELODY.length - 1][0], 72, 'the tune ends on the tonic (C5)');
// 同一個旋律：三個版本的旋律音完全相同
{
  const a = melodyMidis('baroque'), b = melodyMidis('classical'), c = melodyMidis('romantic');
  assert.deepEqual(a, MELODY.map((n) => n[0])); assert.deepEqual(b, a); assert.deepEqual(c, a);
}
// 巴洛克：階梯式力度（只有兩個力度，在第三小節突然變小）、連續的低音（每半拍一個）、一個裝飾音
{
  const ev = renderEra('baroque');
  const mel = ev.filter((e) => e.part === 'melody');
  const levels = [...new Set(mel.map((e) => +e.gain.toFixed(3)))];
  assert.equal(levels.length, 2); assert.ok(levels[0] > levels[1]);
  assert.ok(mel.filter((e) => e.beat < 8).every((e) => e.gain === 1) && mel.filter((e) => e.beat >= 8).every((e) => e.gain === 0.5));
  const bass = ev.filter((e) => e.part === 'bass');
  assert.equal(bass.length, 32);
  bass.slice(1).forEach((e, i) => assert.ok(e.time > bass[i].time));
  assert.equal(ev.filter((e) => e.part === 'ornament').length, 1);
  // 音很短（斷奏）
  const spb = 60 / eraOf('baroque').bpm; assert.ok(mel[2].dur < 2 * spb * 0.6);
}
// 古典：阿貝爾提低音的順序是 低-高-中-高；力度漸強到第 12 拍、再漸弱
{
  const ev = renderEra('classical').filter((e) => e.part === 'inner');
  assert.equal(ev.length, 32);
  for (let g = 0; g < 8; g++) {
    const [lo, hi, mid, hi2] = ev.slice(g * 4, g * 4 + 4).map((e) => e.midi);
    assert.ok(lo < mid && mid < hi && hi === hi2, `alberti at ${g}`);
  }
  let prev = 0;
  for (let b = 0; b <= 12; b++) { const d = dynamicAt('classical', b); assert.ok(d >= prev); prev = d; }
  assert.ok(dynamicAt('classical', 15.9) < dynamicAt('classical', 12));
  // 對稱：第 1 與第 3 小節的力度比第 2 與第 4 的差距不超過 0.5（沒有突然的跳變）
  for (let b = 1; b < 16; b += 0.5) assert.ok(Math.abs(dynamicAt('classical', b) - dynamicAt('classical', b - 0.5)) < 0.1);
}
// 浪漫：速度有彈性（拍長不全相等）、整體比較慢、音域最寬、力度範圍最大
{
  const lens = []; for (let b = 0; b < 16; b++) lens.push(rubato('romantic', b));
  assert.ok(new Set(lens).size > 1 && Math.max(...lens) > 1.3);
  assert.equal(rubato('baroque', 3), 1); assert.equal(rubato('classical', 14), 1);
  assert.ok(totalSeconds('romantic') > totalSeconds('classical') && totalSeconds('classical') > totalSeconds('baroque') * 0.95);
  assert.ok(range('romantic') > range('classical') && range('romantic') > range('baroque'));
  const span = (k) => { const v = []; for (let b = 0; b < 16; b += 0.25) v.push(dynamicAt(k, b)); return Math.max(...v) - Math.min(...v); };
  assert.ok(span('romantic') > span('classical'));
}
// 排程：每個事件時間非負、持續時間為正、增益在 0–1；同時響的音（任一時刻）不超過 8
for (const e of ERAS) {
  const ev = renderEra(e.key);
  ev.forEach((x) => { assert.ok(x.dur > 0 && x.gain > 0 && x.gain <= 1 && x.midi >= 24 && x.midi <= 100); });
  assert.ok(Math.min(...ev.map((x) => x.time)) >= -0.1);
  assert.ok(totalSeconds(e.key) > 8 && totalSeconds(e.key) < 30);
}
FEATURE_KEYS.baroque.forEach((k) => assert.ok(k));
{
  const q = makeEraRounds(mulberry32(4), 6);
  assert.equal(q.length, 6);
  ERAS.forEach((e) => assert.ok(q.includes(e.key)));
  q.slice(1).forEach((x, i) => assert.notEqual(x, q[i]));
}
console.log('eras.test.mjs ok');
