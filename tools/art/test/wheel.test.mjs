import assert from 'node:assert/strict';
import { colorName, deltaE, rgbToLab, to255 } from '../src/color.js';
import {
  N, PICK_ROUNDS, SCHEMES, WHEELS, complementOf, mainDelta, mod, pickAnswer, pictureColors, schemeColors, schemeIdx, shade, tint, warmth,
} from '../src/wheel.js';

const en = (w, i) => WHEELS[w].hues[i].en;

// 兩個色相環都是十二格，三個原色等距
for (const w of ['ryb', 'rgb']) {
  assert.equal(WHEELS[w].hues.length, N);
  assert.deepEqual(WHEELS[w].primaries, [0, 4, 8]);
  WHEELS[w].hues.forEach((h, i) => { assert.equal(h.i, i); assert.equal(h.n, i + 1); assert.ok(h.en && h.zh); });
  assert.equal(new Set(WHEELS[w].hues.map((h) => h.en)).size, N, 'every hue has its own name');
}
assert.deepEqual(WHEELS.ryb.primaries.map((i) => en('ryb', i)), ['Red', 'Yellow', 'Blue']);
assert.deepEqual(WHEELS.rgb.primaries.map((i) => en('rgb', i)), ['Red', 'Green', 'Blue']);
// 螢幕的色相環：每 30° 一格
assert.deepEqual(to255(WHEELS.rgb.hues[0].rgb), [255, 0, 0]); assert.deepEqual(to255(WHEELS.rgb.hues[2].rgb), [255, 255, 0]);
assert.deepEqual(to255(WHEELS.rgb.hues[4].rgb), [0, 255, 0]); assert.deepEqual(to255(WHEELS.rgb.hues[6].rgb), [0, 255, 255]);
assert.deepEqual(to255(WHEELS.rgb.hues[8].rgb), [0, 0, 255]); assert.deepEqual(to255(WHEELS.rgb.hues[10].rgb), [255, 0, 255]);
assert.deepEqual(to255(WHEELS.rgb.hues[1].rgb), [255, 128, 0]);
// 顏色引擎給的名稱和色相環上的名稱對得上（原色與二次色）
for (const [i, key] of [[0, 'red'], [2, 'yellow'], [4, 'green'], [6, 'cyan'], [8, 'blue'], [10, 'magenta']]) assert.equal(colorName(WHEELS.rgb.hues[i].rgb).key, key);
for (const [i, key] of [[0, 'red'], [2, 'orange'], [4, 'yellow'], [6, 'green'], [8, 'blue'], [10, 'purple']]) assert.equal(colorName(WHEELS.ryb.hues[i].rgb).key, key);

// ── 對面的顏色（互補色）：兩個色相環不一樣 ───────────────────────────
const opp = (w, i) => en(w, complementOf(i));
assert.equal(opp('ryb', 0), 'Green'); assert.equal(opp('ryb', 4), 'Purple'); assert.equal(opp('ryb', 8), 'Orange');
assert.equal(opp('rgb', 0), 'Cyan'); assert.equal(opp('rgb', 4), 'Magenta'); assert.equal(opp('rgb', 8), 'Yellow');
for (let i = 0; i < N; i++) assert.equal(complementOf(complementOf(i)), i, 'the opposite of the opposite is the color itself');
// 螢幕的色相環上，互補的兩種光加起來是白
for (let i = 0; i < N; i++) {
  const a = WHEELS.rgb.hues[i].rgb, b = WHEELS.rgb.hues[complementOf(i)].rgb;
  assert.deepEqual(to255(a.map((v, k) => v + b[k])), [255, 255, 255], `screen complements add up to white (${i})`);
}

// ── 配色 ──────────────────────────────────────────────────────────────
assert.deepEqual(schemeIdx('analogous', 0), [0, 11, 1]);
assert.deepEqual(schemeIdx('analogous', 11), [11, 10, 0]);
assert.deepEqual(schemeIdx('complementary', 9), [9, 3]);
assert.deepEqual(schemeIdx('triad', 0), [0, 4, 8]);
assert.deepEqual(schemeIdx('triad', 7), [7, 11, 3]);
assert.equal(mod(-1), 11); assert.equal(mod(12), 0);
assert.deepEqual(schemeColors('ryb', 'complementary', 0).map((h) => h.en), ['Red', 'Green']);
assert.equal(new Set(Object.values(SCHEMES).map((s) => s.mark)).size, 3, 'each scheme has its own mark');
// 主色和旁邊的顏色差得少，和對面的顏色差得多（兩個色相環、十二個起點都成立）
for (const w of ['ryb', 'rgb']) {
  for (let i = 0; i < N; i++) {
    const near = mainDelta(schemeColors(w, 'analogous', i).map((h) => h.rgb));
    const far = mainDelta(schemeColors(w, 'complementary', i).map((h) => h.rgb));
    assert.ok(far > near, `${w} ${i}: opposites differ more than neighbors (${far.toFixed(1)} vs ${near.toFixed(1)})`);
  }
}
assert.equal(mainDelta([[1, 1, 1], [0, 0, 0], [1, 1, 1]]).toFixed(2), '100.00');
assert.equal(mainDelta([[1, 1, 1], [1, 1, 1], [1, 1, 1]]), 0);
assert.equal(mainDelta([[0.2, 0.3, 0.4]]), 0);

// ── 暖色與冷色（慣用的分法）──────────────────────────────────────────
for (const w of ['ryb', 'rgb']) {
  assert.equal(warmth(w, 0), 'warm'); assert.equal(warmth(w, 8), 'cool');
  const ws = WHEELS[w].hues.map((h) => warmth(w, h.i));
  assert.ok(ws.includes('warm') && ws.includes('cool') && ws.includes('between'));
}
assert.deepEqual([0, 1, 2, 3, 4].map((i) => warmth('ryb', i)), Array(5).fill('warm'), 'red through yellow');
assert.deepEqual([7, 8, 9].map((i) => warmth('ryb', i)), Array(3).fill('cool'), 'blue-green through blue-purple');
assert.equal(warmth('ryb', 6), 'between', 'sources disagree about green');

// ── 淺色與暗色、圖畫的配色 ────────────────────────────────────────────
const L = (c) => rgbToLab(c)[0];
assert.deepEqual(tint([0.2, 0.4, 0.6], 0), [0.2, 0.4, 0.6]); assert.deepEqual(tint([0.2, 0.4, 0.6], 1), [1, 1, 1]);
assert.deepEqual(shade([0.2, 0.4, 0.6], 1), [0, 0, 0]);
assert.ok(L(tint([0.8, 0.1, 0.1], 0.5)) > L([0.8, 0.1, 0.1]) && L(shade([0.8, 0.1, 0.1], 0.5)) < L([0.8, 0.1, 0.1]));
const pic2 = pictureColors([[1, 0, 0], [0, 1, 0]]), pic3 = pictureColors([[1, 0, 0], [1, 1, 0], [0, 0, 1]]);
assert.deepEqual(Object.keys(pic2), ['sky', 'far', 'near', 'wall', 'roof', 'door', 'window', 'sun']);
assert.deepEqual(pic2.wall, [1, 0, 0]); assert.deepEqual(pic2.near, [0, 1, 0]); assert.deepEqual(pic3.sun, [0, 0, 1]);
assert.ok(deltaE(pic2.sky, pic2.wall) > 30, 'the house stands out from the sky');

// ── 「這是哪一個？」──────────────────────────────────────────────────
assert.equal(PICK_ROUNDS.length, 6);
const answers = PICK_ROUNDS.map((r) => en(r.wheel, pickAnswer(r)));
assert.deepEqual(answers, ['Green', 'Yellow-orange', 'Blue', 'Orange', 'Cyan', 'Yellow']);
for (const r of PICK_ROUNDS) {
  assert.equal(r.options.length, 4); assert.equal(new Set(r.options).size, 4);
  const ans = pickAnswer(r);
  assert.ok(r.options.includes(ans), 'the answer is one of the options');
  // 只有一個選項是對的
  if (r.kind === 'neighbor') assert.equal(r.options.filter((o) => [1, N - 1].includes(mod(o - r.of))).length, 1);
  if (r.kind === 'cool' || r.kind === 'warm') assert.equal(r.options.filter((o) => warmth(r.wheel, o) === r.kind).length, 1);
}

console.log('wheel.test.mjs: all assertions passed');
