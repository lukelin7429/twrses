import assert from 'node:assert/strict';
import { deltaE, rgbToLab } from '../src/color.js';
import {
  BAL_ROUNDS, CENTER_TOL, CROP_MAX, CROP_MIN, CROP_TASKS, FRAME, PAPER_L, PRESETS, SCENE, SCENE_ITEMS, balance, bbox, boatShare, clampTo,
  contrast, covered, cropRect, cropUV, emptyShare, exactArea, fullyIn, fullyOut, grayOfL, inside, nearThird, thirds, verdict, weightOf,
} from '../src/frame.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// ── 灰色：L* 換回來要一樣 ──────────────────────────────────────────
for (const L of [10, 18, 30, 55, 78, 95]) near(rgbToLab(grayOfL(L))[0], L, 0.01, `gray of L* ${L}`);
assert.equal(contrast(PAPER_L), 0, 'a shape as light as the paper has no weight');
assert.ok(contrast(18) > contrast(55) && contrast(55) > contrast(78), 'darker is heavier');

// ── 形狀與面積：取樣的面積接近公式 ─────────────────────────────────────
const circ = { id: 'c', shape: 'circle', x: 400, y: 300, r: 100, L: 0 };
const rect = { id: 'r', shape: 'rect', x: 400, y: 300, w: 160, h: 80, L: 0 };
const tri = { id: 't', shape: 'tri', x: 400, y: 300, w: 200, h: 150, L: 0 };
for (const it of [circ, rect, tri]) near(covered(it).area / exactArea(it), 1, 0.03, `${it.shape} sampled area`);
assert.ok(inside(tri, 400, 230) && !inside(tri, 310, 230), 'the triangle points up');
assert.ok(inside(tri, 310, 370), 'and is wide at the bottom');
const half = { ...circ, x: 0 };
near(covered(half).area / exactArea(half), 0.5, 0.03, 'a circle cut in half by the frame counts half');
assert.ok(covered(half).cx > 0, 'and the visible half has its center inside the frame');
assert.equal(covered({ ...circ, x: -500 }).area, 0, 'a shape outside the frame has no weight');
near(weightOf(rect), 160 * 80 * 1 * 0.95, 1, 'weight = area × contrast');

// ── 重心：對稱就在中央，蹺蹺板原理 ──────────────────────────────────────
const one = balance([circ]);
near(one.dx, 0, 1e-9); near(one.dy, 0, 1e-9);
near(balance([{ ...circ, x: 600 }]).dx, 0.5, 1e-9, 'one shape: the balance point is its center');
const two = balance([{ ...circ, x: 200 }, { ...circ, id: 'c2', x: 600 }]);
near(two.dx, 0, 1e-9, 'mirror images balance');
const heavyNear = balance([{ ...circ, x: 300 }, { ...circ, id: 's', r: 50, x: 800 - 100 }]);
assert.ok(heavyNear.dx < 0, 'a big shape near the middle can still outweigh a small one far out');
const seesaw = balance([{ ...circ, x: 350 }, { ...circ, id: 's', r: 50, x: 600 }]);
near(seesaw.dx, 0, 0.02, 'four times the weight at a quarter of the distance balances (like a seesaw)');
assert.ok(balance([{ ...circ, L: 20, x: 250 }, { ...circ, id: 'p', L: 80, x: 550 }]).dx < -0.2, 'same size, the dark one wins');
assert.deepEqual(verdict(0.03), { side: 'center', pct: 3 });
assert.deepEqual(verdict(-0.2), { side: 'left', pct: 20 });
assert.deepEqual(verdict(0.41), { side: 'right', pct: 41 });
assert.equal(balance([]).dx, 0, 'an empty frame has its balance point in the middle');

// ── 擺法 ─────────────────────────────────────────────────────────
assert.equal(verdict(balance(PRESETS.lean).dx).side, 'left', 'the starting layout leans left');
for (const k of ['sym', 'asym', 'radial', 'thirds']) assert.equal(verdict(balance(PRESETS[k]).dx).side, 'center', `${k} is balanced`);
near(balance(PRESETS.sym).dx, 0, 1e-9, 'symmetry is exact');
near(balance(PRESETS.radial).dx, 0, 1e-6); near(balance(PRESETS.radial).dy, 0, 1e-6, 'radial balance is centered both ways');
const asym = PRESETS.asym, a = asym.find((i) => i.id === 'A'), b = asym.find((i) => i.id === 'B');
assert.ok(weightOf(a) > weightOf(b) && Math.abs(a.x - 400) < Math.abs(b.x - 400), 'asymmetric: the heavier shape sits nearer the middle');
assert.ok(PRESETS.asym.some((i) => i.x !== 800 - i.x) && !PRESETS.asym.every((i) => PRESETS.asym.some((j) => j.x === 800 - i.x)), 'and it is not a mirror image');
assert.equal(nearThird(PRESETS.thirds.find((i) => i.id === 'B').x, PRESETS.thirds.find((i) => i.id === 'B').y), 1, 'thirds: the small dark shape is on the upper right point');
for (const k of Object.keys(PRESETS)) for (const it of PRESETS[k]) assert.ok(fullyIn(it, FRAME), `${k}/${it.id} fits in the frame`);
for (const k of Object.keys(PRESETS)) assert.equal(new Set(PRESETS[k].map((i) => i.id)).size, PRESETS[k].length, `${k} ids are unique`);
for (const k of Object.keys(PRESETS)) { const e = emptyShare(PRESETS[k]); assert.ok(e > 0.6 && e < 1, `${k} leaves empty space (${e})`); }
near(emptyShare([]), 1, 1e-12);

// ── 三分點 ───────────────────────────────────────────────────────
const t = thirds();
assert.deepEqual(t.xs.map(Math.round), [267, 533]); assert.deepEqual(t.ys, [200, 400]);
assert.equal(nearThird(267, 400), 2); assert.equal(nearThird(400, 300), -1, 'the center is not a thirds point');
assert.deepEqual(clampTo(-20, 900), [0, 600]);

// ── 小互動一：每題的答案明確 ──────────────────────────────────────
assert.equal(BAL_ROUNDS.length, 6);
const ans = BAL_ROUNDS.map((r) => r.answer);
assert.ok(ans.includes('A') && ans.includes('B'), 'answers are not all on one side');
for (const [i, r] of BAL_ROUNDS.entries()) {
  const da = Math.abs(balance(r.a).dx), db = Math.abs(balance(r.b).dx), good = Math.min(da, db), bad = Math.max(da, db);
  assert.ok(good <= CENTER_TOL, `round ${i + 1}: the balanced picture is near the center (${good})`);
  assert.ok(bad - good >= 0.15, `round ${i + 1}: the difference is easy to see (${bad - good})`);
  for (const it of [...r.a, ...r.b]) assert.ok(fullyIn(it, FRAME), `round ${i + 1}: ${it.id} fits`);
}

// ── 小互動二：裁切框 ─────────────────────────────────────────────
for (const [s, u, v] of [[0, 0, 0], [1, 1, 1], [0.5, 0.3, 0.7]]) {
  const r = cropRect(s, u, v);
  near(r.w / r.h, 4 / 3, 1e-12, 'the crop is always 4:3');
  assert.ok(r.x >= 0 && r.y >= 0 && r.x + r.w <= SCENE.w + 1e-9 && r.y + r.h <= SCENE.h + 1e-9, 'and stays inside the scene');
  const [uu, vv] = cropUV(r); if (r.w < SCENE.w) near(uu, u, 1e-9); if (r.h < SCENE.h) near(vv, v, 1e-9);
}
near(cropRect(0, 0, 0).w, CROP_MIN, 1e-12); near(cropRect(1, 0, 0).w, CROP_MAX, 1e-12);
for (const it of SCENE_ITEMS) assert.ok(fullyIn(it, { x: 0, y: 0, w: SCENE.w, h: SCENE.h }), `${it.id} is in the scene`);
const whole = cropRect(1, 0.5, 0.5);
assert.ok(CROP_TASKS.every((tk) => !tk.check(cropRect(1, 0, 0)).ok), 'the starting crop solves no task');
// 每個任務都解得出來：掃一遍滑桿
for (const tk of CROP_TASKS) {
  let found = null;
  for (let s = 0; s <= 1 && !found; s += 0.05) for (let u = 0; u <= 1 && !found; u += 0.02) for (let v = 0; v <= 1 && !found; v += 0.02) {
    const r = cropRect(s, u, v); if (tk.check(r).ok) found = r;
  }
  assert.ok(found, `task ${tk.key} can be solved`);
}
const boat = SCENE_ITEMS[0];
const tight = { x: boat.x - 150, y: boat.y - 105, w: 300, h: 225 };
assert.ok(CROP_TASKS[2].check(tight).ok && boatShare(tight) > 0.1, 'a tight crop makes the boat big');
assert.ok(!CROP_TASKS[2].check(whole).ok, 'the whole scene does not');
assert.ok(fullyOut(SCENE_ITEMS[1], tight) && fullyIn(boat, tight));
assert.equal(bbox(boat).w, 150);

console.log('frame.test.mjs: all assertions passed');
