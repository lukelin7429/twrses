import assert from 'node:assert/strict';
import { MEDIA, MEDIUM_KEYS, NEXT_ROUNDS, PROBES, REGIONS, SIZE, STEPS, WHICH_ROUNDS, colorAt, regionAt } from '../src/media.js';

const lum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// ── 區域與取樣點 ─────────────────────────────────────────────────
for (const r of REGIONS) assert.equal(regionAt(...PROBES[r]), r, `probe for ${r} lies in ${r}`);
for (const r of REGIONS) { const [x, y] = PROBES[r]; for (const [dx, dy] of [[-8, 0], [8, 0], [0, -8], [0, 8]]) assert.equal(regionAt(x + dx, y + dy), r, `${r} probe is at least 8 px from an edge`); }
const seen = new Set(); for (let y = 0; y < SIZE; y += 4) for (let x = 0; x < SIZE; x += 4) seen.add(regionAt(x, y));
assert.deepEqual([...seen].sort(), [...REGIONS].sort(), 'every region appears in the picture');
for (const k of MEDIUM_KEYS) assert.equal(MEDIA[k].steps.length, STEPS, `${k} has ${STEPS} steps`);
for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (regionAt(x, y) === 'stem') assert.ok(y < 100, 'the stem never cuts into the apple');

// ── 水彩：只會越來越暗；亮點一直是紙 ───────────────────────────────────
for (let s = 0; s < STEPS; s++) assert.deepEqual(colorAt('watercolor', s, 'highlight'), MEDIA.watercolor.paper, 'the highlight is the white of the paper');
for (const r of REGIONS) for (let s = 1; s < STEPS; s++) assert.ok(lum(colorAt('watercolor', s, r)) <= lum(colorAt('watercolor', s - 1, r)) + 1e-12, `watercolor ${r} never gets lighter`);
assert.ok(lum(colorAt('watercolor', 3, 'shadow')) < lum(colorAt('watercolor', 1, 'shadow')), 'the shadow side darkens wash by wash');

// ── 油畫：淺色可以蓋過深色，亮點最後才畫 ───────────────────────────────
assert.ok(lum(colorAt('oil', 3, 'highlight')) > lum(colorAt('oil', 2, 'highlight')) + 0.3, 'the oil highlight is painted light over a darker layer');
assert.ok(lum(colorAt('oil', 2, 'light')) > lum(colorAt('oil', 0, 'light')), 'the lit side gets lighter as the painting goes on');
assert.ok(lum(colorAt('oil', 0, 'light')) < lum(MEDIA.oil.paper) - 0.4, 'the first layer is dark');
assert.ok(lum(colorAt('oil', 3, 'highlight')) > lum(colorAt('oil', 3, 'light')), 'the highlight is the lightest part of the apple');

// ── 水墨：只有灰，深淺來自水量 ──────────────────────────────────────
for (const r of REGIONS) for (let s = 0; s < STEPS; s++) { const c = colorAt('ink', s, r); const p = MEDIA.ink.paper; for (let i = 0; i < 3; i++) assert.ok(c[i] <= p[i] + 1e-12); }
const inkA = MEDIA.ink.steps.flatMap((s) => s.ops.map((o) => o.a));
assert.ok(inkA[0] < inkA[1] && inkA[1] < inkA[2], 'light, middle, and dark ink use less and less water');
assert.ok(lum(colorAt('ink', 3, 'stem')) < lum(colorAt('ink', 3, 'shadow')) && lum(colorAt('ink', 3, 'shadow')) < lum(colorAt('ink', 3, 'light')), 'stem darker than shadow darker than lit side');
assert.deepEqual(colorAt('ink', 3, 'highlight'), MEDIA.ink.paper, 'the ink apple leaves its highlight blank too');
// 墨的顏色接近中性（三個通道差不多）
for (const r of ['light', 'shadow', 'stem']) { const c = colorAt('ink', 3, r); assert.ok(Math.max(...c) - Math.min(...c) < 0.1, `ink ${r} is a gray`); }

// ── 小互動 ───────────────────────────────────────────────────────
assert.equal(WHICH_ROUNDS.length, 6);
for (const k of MEDIUM_KEYS) assert.equal(WHICH_ROUNDS.filter((r) => r.medium === k).length, 2, `two close-ups of ${k}`);
for (const r of WHICH_ROUNDS) assert.ok(r.at[0] > 0 && r.at[0] < SIZE && r.at[1] > 0 && r.at[1] < SIZE && r.why_en && r.why_zh && r.ask_en && r.ask_zh);
for (const r of NEXT_ROUNDS) { assert.ok(r.answer >= 0 && r.answer < r.options.length); assert.ok(r.step < STEPS - 1, 'there is a next step'); assert.ok(r.why_en && r.why_zh); }
assert.ok(new Set(NEXT_ROUNDS.map((r) => r.answer)).size > 1, 'answers are not all in the same place');
near(STEPS, 4, 0);
console.log('media.test.mjs: all assertions passed');
