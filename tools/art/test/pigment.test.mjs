import assert from 'node:assert/strict';
import { BINDERS, BINDER_ROUNDS, INK, ORIGINS, ORIGIN_ROUNDS, PAPER, PIGMENTS, binderOf, paintName, pigmentOf, showThrough, swatch } from '../src/pigment.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// ── 資料完整 ─────────────────────────────────────────────────────
assert.equal(new Set(PIGMENTS.map((p) => p.key)).size, PIGMENTS.length, 'pigment keys are unique');
for (const p of PIGMENTS) {
  assert.ok(ORIGINS[p.origin], `${p.key} has a known origin`);
  assert.ok(p.en && p.zh && p.src_en && p.src_zh && p.clue_en && p.clue_zh, `${p.key} has names, a source, and a clue in both languages`);
  assert.ok(p.rgb.every((v) => v >= 0 && v <= 1), `${p.key} color is in range`);
}
for (const o of Object.keys(ORIGINS)) assert.ok(PIGMENTS.some((p) => p.origin === o), `at least one pigment ${o}`);
for (const b of BINDERS) assert.ok(b.en && b.zh && b.paint.en && b.paint.zh && b.note_en && b.note_zh && b.icon, `${b.key} is complete`);
assert.equal(new Set(BINDERS.map((b) => b.paint.en)).size, BINDERS.length, 'each binder makes a different paint');

// ── 色塊 ─────────────────────────────────────────────────────────
for (const p of PIGMENTS) for (const b of BINDERS) {
  const s = swatch(p.key, b.key), si = swatch(p.key, b.key, true);
  for (let i = 0; i < 3; i++) {
    near(s[i], PAPER[i] + (p.rgb[i] - PAPER[i]) * b.cover, 1e-12, 'swatch on paper = paper mixed with pigment');
    near(si[i], INK[i] + (p.rgb[i] - INK[i]) * b.cover, 1e-12, 'swatch over the black line');
  }
}
const cov = BINDERS.map((b) => b.cover);
assert.ok(binderOf('gum').cover < Math.min(...cov.filter((c) => c !== binderOf('gum').cover)), 'watercolor covers least in this model');
near(showThrough('gum'), 1 - binderOf('gum').cover, 1e-12);
assert.ok(showThrough('acrylic') < showThrough('gum'));
assert.deepEqual(paintName('gum'), { en: 'Watercolor', zh: '水彩' });
assert.equal(paintName('oil').en, 'Oil paint');
// 同一種色粉、不同黏著劑：色塊不一樣，但色相方向一樣（都往色粉的顏色走）
const o1 = swatch('ultramarine', 'gum'), o2 = swatch('ultramarine', 'oil');
assert.ok(o1[2] > o1[0] && o2[2] > o2[0], 'ultramarine stays blue with any binder');
assert.ok(o2[0] < o1[0], 'more cover, closer to the pigment color');

// ── 小互動 ───────────────────────────────────────────────────────
assert.deepEqual(ORIGIN_ROUNDS, PIGMENTS.map((p) => p.key));
for (const r of BINDER_ROUNDS) { assert.ok(r.options.includes(r.want), 'the answer is offered'); assert.equal(new Set(r.options).size, r.options.length); for (const k of r.options) assert.ok(binderOf(k), k); }
assert.equal(new Set(BINDER_ROUNDS.map((r) => r.want)).size, BINDER_ROUNDS.length, 'each round asks for a different paint');
assert.ok(pigmentOf('prussian').origin === 'made' && pigmentOf('ochre').origin === 'earth');
console.log('pigment.test.mjs: all assertions passed');
