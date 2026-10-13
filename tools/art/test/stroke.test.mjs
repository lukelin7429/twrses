import assert from 'node:assert/strict';
import {
  BRUSHES, FAST_AT, HOW, HOW_ROUNDS, LINES, PAD_H, PAD_W, SHAPES, SLOW_AT, avgSpeed, bbox, demoBrush, describe, direction, dryGap, duration,
  hasPressure, howBrush, howLine, length, makeLine, rng, segments, smooth, speeds, widthAt, widths, wobble,
} from '../src/stroke.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
// 一條直線：從 (0,0) 到 (300,400)，11 個點，花 1 秒
const straight = Array.from({ length: 11 }, (_, i) => ({ x: 30 * i, y: 40 * i, t: 100 * i, p: 0.5 }));

// ── 長度、時間、速度、方向 ────────────────────────────────────────────
near(length(straight), 500, 1e-9, '3-4-5 triangle');
assert.equal(duration(straight), 1); near(avgSpeed(straight), 500, 1e-9);
speeds(straight).forEach((v) => near(v, 500, 1e-6, 'constant speed'));
assert.equal(speeds(straight).length, straight.length);
near(direction(straight), 53.13, 0.01, 'down and to the right');
near(direction([{ x: 0, y: 0 }, { x: -5, y: 0 }]), 180, 1e-9); assert.equal(direction([{ x: 1, y: 1 }]), 0);
assert.deepEqual(bbox(straight), { x0: 0, y0: 0, x1: 300, y1: 400 });
assert.equal(length([]), 0); assert.equal(duration([{ x: 0, y: 0, t: 5 }]), 0); assert.equal(avgSpeed([{ x: 0, y: 0, t: 5 }]), 0);
assert.deepEqual(speeds([{ x: 0, y: 0, t: 0, p: 0.5 }]), [0]);
// 同一條路走兩倍快，速度就是兩倍
near(avgSpeed(straight.map((q) => ({ ...q, t: q.t / 2 }))), 1000, 1e-9);

// ── 粗細 ──────────────────────────────────────────────────────────────
const B = BRUSHES.brush;
assert.equal(widthAt(BRUSHES.pen, 9999, 1, true), 2.5); assert.equal(widthAt(BRUSHES.marker, 0, 0, false), 14);
assert.equal(widthAt(B, 0, 0.5, false), B.max, 'no pressure data: a slow line is thick');
assert.equal(widthAt(B, B.vRef, 0.5, false), B.min, 'and a fast line is thin');
assert.ok(widthAt(B, 500, 0.5, false) > widthAt(B, 1000, 0.5, false));
assert.equal(widthAt(B, 9999, 1, true), B.max, 'with pressure data, pressing hard is thick whatever the speed');
assert.equal(widthAt(B, 0, 0, true), B.min);
assert.equal(hasPressure(straight), false); assert.equal(hasPressure(straight.map((q, i) => ({ ...q, p: i / 10 }))), true);
widths(straight, BRUSHES.pen).forEach((w) => assert.equal(w, 2.5));
const ww = widths(straight.map((q, i) => ({ ...q, p: i / 10 })), B);
for (let i = 1; i < ww.length; i++) assert.ok(ww[i] > ww[i - 1], 'pressing harder and harder: thicker and thicker');
assert.ok(Math.min(...ww) >= B.min && Math.max(...ww) <= B.max);

// ── 平滑與抖動 ────────────────────────────────────────────────────────
const zig = straight.map((q, i) => ({ ...q, y: q.y + (i % 2 ? 6 : -6) }));
assert.ok(wobble(zig) > 2 && wobble(straight) < 1e-9, 'a zigzag wobbles, a straight line does not');
assert.ok(wobble(smooth(zig, 1)) < wobble(zig), 'smoothing reduces the wobble');
assert.deepEqual(smooth(zig)[0], zig[0]); assert.deepEqual(smooth(zig)[10], zig[10]);
assert.equal(smooth(zig).length, zig.length);
assert.equal(wobble(straight.slice(0, 3)), 0);

// ── 用話描述 ──────────────────────────────────────────────────────────
assert.equal(describe(straight).pace, 'medium');
assert.equal(describe(straight.map((q) => ({ ...q, t: q.t / 4 }))).pace, 'fast');
assert.equal(describe(straight.map((q) => ({ ...q, t: q.t * 4 }))).pace, 'slow');
assert.ok(FAST_AT > SLOW_AT);
assert.equal(describe(straight).steady, true); assert.equal(describe(zig).steady, false);
near(describe(straight).length, 500, 1e-9); assert.equal(describe(straight).seconds, 1);

// ── 固定種子的亂數與飛白 ──────────────────────────────────────────────
const r1 = rng(42), r2 = rng(42), r3 = rng(43);
const a1 = [r1(), r1(), r1()], a2 = [r2(), r2(), r2()], a3 = [r3(), r3(), r3()];
assert.deepEqual(a1, a2, 'same seed, same numbers'); assert.notDeepEqual(a1, a3);
a1.forEach((v) => assert.ok(v >= 0 && v < 1));
assert.equal(dryGap(B, 100, 0), false, 'a slow line never skips');
assert.equal(dryGap(B, B.vRef * 2, 0.1), true, 'a very fast line skips');
assert.equal(dryGap(BRUSHES.pen, 99999, 0), false, 'only the brush goes dry');

// ── 五種示範的線 ──────────────────────────────────────────────────────
assert.deepEqual(Object.keys(LINES), ['even', 'heavy', 'fast', 'shaky', 'taper']);
const D = Object.fromEntries(Object.keys(LINES).map((k) => [k, makeLine(k)]));
for (const k in D) {
  const bb = bbox(D[k]);
  assert.ok(bb.x0 >= 0 && bb.x1 <= PAD_W && bb.y0 >= 0 && bb.y1 <= PAD_H, `${k} stays on the pad`);
  assert.deepEqual(makeLine(k), D[k], `${k} is the same every time`);
  near(duration(D[k]), LINES[k].seconds, 0.002);
  assert.ok(direction(D[k]) > -20 && direction(D[k]) < 20, 'all five run from left to right');
}
const W = (k) => widths(D[k], demoBrush(k));
assert.ok(Math.max(...W('even')) < 8, 'thin'); assert.ok(Math.min(...W('heavy')) > 16, 'thick');
assert.ok(Math.max(...W('even')) - Math.min(...W('even')) < 0.5, 'and steady');
assert.ok(W('taper')[2] > 16 && W('taper')[117] < 6, 'thick at the start, thin at the end');
assert.equal(describe(D.fast).pace, 'fast'); assert.equal(describe(D.heavy).pace, 'slow'); assert.equal(describe(D.even).pace, 'slow');
assert.ok(wobble(D.shaky) > 1.5 && wobble(D.even) < 0.5, 'only the shaky line shakes');
const gaps = (k) => segments(D[k], demoBrush(k)).filter((s) => s.gap).length;
assert.ok(gaps('fast') > 15, 'the fast line has dry gaps'); assert.equal(gaps('heavy'), 0); assert.equal(gaps('even'), 0); assert.equal(gaps('taper'), 0);
assert.equal(segments(D.fast, demoBrush('fast')).length, D.fast.length - 1);
assert.deepEqual(segments(D.fast, demoBrush('fast')), segments(D.fast, demoBrush('fast')), 'the gaps fall in the same places every time');

// ── 兩個小遊戲 ────────────────────────────────────────────────────────
assert.equal(HOW_ROUNDS.length, 6);
assert.equal(new Set(HOW_ROUNDS.map((r) => r.answer)).size, 4, 'all four answers appear');
for (const r of HOW_ROUNDS) {
  const pts = howLine(r), d = describe(pts, howBrush()), [pace, weight] = r.answer.split('-');
  assert.equal(d.pace, pace, `${r.answer}: pace`);
  assert.ok(weight === 'heavy' ? d.wmax > 15 : d.wmax < 8, `${r.answer}: weight`);
  const g = segments(pts, howBrush()).filter((s) => s.gap).length;
  assert.ok(pace === 'fast' ? g > 10 : g === 0, `${r.answer}: only fast lines go dry (${g})`);
  const bb = bbox(pts); assert.ok(bb.x0 >= 0 && bb.x1 <= PAD_W && bb.y0 >= 0 && bb.y1 <= PAD_H);
  assert.ok(HOW[r.answer]);
}
assert.equal(SHAPES.length, 8);
assert.equal(SHAPES.filter((s) => s.kind === 'geometric').length, 4); assert.equal(SHAPES.filter((s) => s.kind === 'organic').length, 4);
assert.equal(new Set(SHAPES.map((s) => s.key)).size, 8);
// 幾何的形狀只用直線和圓弧；自然的形狀用曲線
for (const s of SHAPES) assert.equal(/C/.test(s.d), s.kind === 'organic', `${s.key}: free curves only in organic shapes`);

console.log('stroke.test.mjs: all assertions passed');
