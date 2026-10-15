import assert from 'node:assert/strict';
import { EYE_ROUNDS, EYE_W, GRADE, HAIR, HAIRLINE, HIGH_EYE, LINES, LINE_ORDER, PAD_HEAD, gradeEye, halfDepth, halfWidth, outline, padY, visibleHalf } from '../src/face.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// ── 比例線 ───────────────────────────────────────────────────────
near(LINES.eye, 0.5, 1e-12, 'the eyes are halfway between the top of the head and the chin');
near(LINES.nose, (LINES.eye + LINES.chin) / 2, 1e-12, 'the bottom of the nose is halfway between the eyes and the chin');
near(LINES.mouth, (LINES.nose + LINES.chin) / 2, 1e-12, 'the mouth is halfway between the nose and the chin');
const thirds = [LINES.hairline - LINES.brow, LINES.brow - LINES.nose, LINES.nose - LINES.chin];
assert.ok(Math.max(...thirds) - Math.min(...thirds) < 0.08, 'the three parts of the face are roughly, not exactly, equal (Vitruvius)');
assert.ok(LINES.hairline < LINES.top && LINES.hairline > LINES.brow);
for (let i = 1; i < LINE_ORDER.length; i++) assert.ok(LINES[LINE_ORDER[i]] < LINES[LINE_ORDER[i - 1]], `${LINE_ORDER[i]} is below ${LINE_ORDER[i - 1]}`);
assert.ok(LINES.brow > LINES.eye && LINES.nose < LINES.eye, 'the eyes sit between the brows and the nose');
assert.equal(LINES.hairline, HAIRLINE);
assert.ok(HIGH_EYE > LINES.eye + GRADE.close, 'the beginner\'s eye line is clearly too high');

// ── 外形 ─────────────────────────────────────────────────────────
assert.equal(halfWidth(1), 0, 'the top of the head is round');
near(halfWidth(0), 0.37 * 0.3, 1e-12, 'the chin is flat, not a point');
let widest = 0, wy = 0; for (let y = 0.01; y < 1; y += 0.01) { const w = halfWidth(y); if (w > widest) { widest = w; wy = y; } }
near(wy, 0.5, 0.02, 'the head is widest near eye level');
for (const y of [0.05, 0.15, 0.3, 0.45]) assert.ok(halfWidth(y) < halfWidth(0.5), `the jaw (${y}) is narrower than the head at eye level`);
assert.ok(halfWidth(LINES.mouth) > EYE_W, 'the face is wide enough for the mouth corners under the eye centers');
for (let y = 0.02; y < 0.5; y += 0.02) assert.ok(halfWidth(y + 0.02) >= halfWidth(y), 'the face widens from chin to eyes');
near(halfDepth(0.5) / halfWidth(0.5), 1.2, 1e-12, 'the head is deeper than it is wide');
const o = outline(60);
assert.equal(o.length, 122); assert.ok(o.every(([x, y]) => y >= 0 && y <= 1 && Math.abs(x) <= halfWidth(0.5) + 1e-12));
assert.ok(EYE_W * 1.5 < halfWidth(0.5), 'both eyes fit inside the head');

// ── 小互動一 ────────────────────────────────────────────────────
assert.deepEqual(EYE_ROUNDS, ['none', 'short', 'bangs']);
assert.equal(gradeEye(0.5).grade, 'exact'); assert.equal(gradeEye(0.52).dir, 'on');
assert.equal(gradeEye(0.56).grade, 'close'); assert.equal(gradeEye(0.56).dir, 'high'); assert.equal(gradeEye(0.56).pct, 6);
assert.equal(gradeEye(0.66).grade, 'off'); assert.equal(gradeEye(0.47).grade, 'exact', '3% counts as within 3%'); assert.equal(gradeEye(0.40).dir, 'low');
assert.equal(gradeEye(HIGH_EYE).grade, 'off', 'the beginner\'s line is graded as off');
assert.ok(visibleHalf('bangs') > visibleHalf('short') && visibleHalf('short') > visibleHalf('none'), 'more hair, higher apparent middle');
for (const k of EYE_ROUNDS) assert.ok(HAIR[k].front <= 1 && HAIR[k].front > LINES.eye, `${k}: the hair stops above the eyes`);

// ── 畫板 ─────────────────────────────────────────────────────────
near(padY('eye'), PAD_HEAD.baseY - PAD_HEAD.h / 2, 1e-12);
assert.ok(padY('top') >= 0 && padY('chin') <= 500, 'the head fits on the 800 × 500 pad');
console.log('face.test.mjs: all assertions passed');
