import assert from 'node:assert/strict';
import { deltaE } from '../src/color.js';
import {
  ALL_OFF, ALL_ON, ARRANGE_TASKS, BASE, CUES, CUE_NAMES, DIST, EYE, FAR_ROUNDS, HAZE, HILL, PIC, X_SPREAD, aerial, aerialT, arrangeItems, boxesOverlap,
  compose, cueCount, describeColor, farPair, groundY, hillOutline, picBox, picScale, place, worldX, worldZ,
} from '../src/depth.js';
import { project } from '../src/persp.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// ── 空氣：越遠越淡、越偏藍、彩度越低 ──────────────────────────────────
assert.equal(aerialT(DIST[0]), 0, 'the nearest hill keeps its own color');
assert.deepEqual(aerial(BASE, DIST[0]), BASE);
near(aerialT(DIST[0] + 14), 1 - 1 / Math.E, 1e-12, 'one haze length away, 63% is sky color');
const cols = DIST.map((d) => describeColor(aerial(BASE, d)));
for (let i = 1; i < cols.length; i++) {
  assert.ok(cols[i].L > cols[i - 1].L, `hill ${i + 1} is lighter than hill ${i}`);
  assert.ok(cols[i].b < cols[i - 1].b, `hill ${i + 1} is bluer than hill ${i}`);
  assert.ok(deltaE(aerial(BASE, DIST[i]), HAZE) < deltaE(aerial(BASE, DIST[i - 1]), HAZE), 'and closer to the sky color');
}
assert.ok(cols[4].C < cols[0].C, 'the farthest hill is less vivid than the nearest');
assert.ok(deltaE(aerial(BASE, 1e6), HAZE) < 1e-6, 'very far away, a thing takes the color of the sky at the horizon');
assert.ok(deltaE(aerial(BASE, DIST[4]), HAZE) > 8, 'the farthest hill can still be told from the sky');
for (let i = 1; i < DIST.length; i++) assert.ok(deltaE(aerial(BASE, DIST[i]), aerial(BASE, DIST[i - 1])) > 8, 'neighboring hills differ visibly');

// ── 大小與位置：和透視同一個式子 ──────────────────────────────────────
near(picScale(5), 0.6, 1e-12); near(picScale(27), 3 / 27, 1e-12);
near(picScale(10) / picScale(5), 0.5, 1e-12, 'twice as far, half as big');
near(groundY(5), 1.6 * (1 - 3 / 5), 1e-12); near(groundY(1e9), EYE.y, 1e-6, 'far ground rises to eye level');
for (let i = 1; i < DIST.length; i++) assert.ok(groundY(DIST[i]) > groundY(DIST[i - 1]) && groundY(DIST[i]) < EYE.y, 'farther ground is higher on the picture, below the horizon');
// 和 persp.js 的投影一致（同一隻眼睛）
DIST.forEach((d, i) => {
  const p = project([worldX(i), 0, worldZ(i)], EYE), top = project([worldX(i), HILL.h, worldZ(i)], EYE);
  near(p[1], groundY(d), 1e-12, 'base height'); near(top[1] - p[1], HILL.h * picScale(d), 1e-12, 'picture height');
  near(p[0], compose(ALL_ON).find((it) => it.i === i).x, 1e-12, 'the world position lands on the overlap layout');
});

// ── 一張畫 ────────────────────────────────────────────────────────────
const on = compose(ALL_ON), off = compose(ALL_OFF);
assert.deepEqual(on.map((it) => it.n), [5, 4, 3, 2, 1], 'far hills are painted first');
assert.equal(cueCount(ALL_ON), 4); assert.equal(cueCount(ALL_OFF), 0); assert.deepEqual(CUES, Object.keys(CUE_NAMES));
// 四種線索全關：五座山一樣大、一樣高、一樣色、互不重疊——完全看不出遠近
assert.equal(new Set(off.map((it) => it.scale)).size, 1); assert.equal(new Set(off.map((it) => it.baseY)).size, 1);
assert.equal(new Set(off.map((it) => it.color.join())).size, 1);
for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) assert.ok(!boxesOverlap(picBox(off[a]), picBox(off[b])), 'spread out: no two hills overlap');
off.forEach((it) => { const bx = picBox(it); assert.ok(bx[0] >= -PIC.w / 2 && bx[2] <= PIC.w / 2 && bx[3] <= PIC.h, 'inside the picture'); });
// 只開一種線索，就只有那一件事改變
const only = (c) => compose({ ...ALL_OFF, [c]: true });
assert.ok(new Set(only('size').map((it) => it.scale)).size === 5 && new Set(only('size').map((it) => it.baseY)).size === 1 && new Set(only('size').map((it) => it.color.join())).size === 1);
assert.ok(new Set(only('position').map((it) => it.baseY)).size === 5 && new Set(only('position').map((it) => it.scale)).size === 1);
assert.ok(new Set(only('air').map((it) => it.color.join())).size === 5 && new Set(only('air').map((it) => it.scale)).size === 1);
assert.deepEqual(only('air').map((it) => it.x).sort((a, b) => a - b), X_SPREAD);
// 重疊的排法：每一座都至少被比它近的某一座蓋到一部分（四種線索全開、或只開重疊都成立）
for (const list of [on, only('overlap')]) {
  for (const it of list.filter((q) => q.n > 1)) assert.ok(list.some((q) => q.n < it.n && boxesOverlap(picBox(q), picBox(it))), `hill ${it.n} is partly covered by a nearer hill`);
  list.forEach((it) => { const bx = picBox(it); assert.ok(bx[0] >= -PIC.w / 2 && bx[2] <= PIC.w / 2 && bx[1] >= 0 && bx[3] <= PIC.h, 'inside the picture'); });
}
// 全開時，每一座都還看得到一部分（沒有被完全蓋住）
for (const it of on.filter((q) => q.n > 1)) { const bx = picBox(it); assert.ok(!on.some((q) => q.n < it.n && picBox(q)[0] <= bx[0] && picBox(q)[2] >= bx[2] && picBox(q)[3] >= bx[3]), `hill ${it.n} still shows`); }
const drawn = ({ scale, baseY, color }) => ({ scale, baseY, color });
assert.deepEqual(drawn(place(5, 0.3, ALL_OFF)), drawn(place(27, 0.3, ALL_OFF)), 'with every cue off, distance leaves no trace on the picture');

// ── 山的輪廓 ──────────────────────────────────────────────────────────
const o = hillOutline();
assert.ok(o.length > 40);
near(Math.min(...o.map((p) => p[0])), -HILL.w / 2, 1e-9); near(Math.max(...o.map((p) => p[0])), HILL.w / 2, 1e-9);
near(Math.min(...o.map((p) => p[1])), 0, 1e-9); near(Math.max(...o.map((p) => p[1])), 2.14, 0.01, 'tree top');
assert.ok(Math.max(...o.map((p) => p[1])) <= HILL.h);
near(o[0][1], 0, 1e-9); near(o[o.length - 1][1], 0, 1e-9, 'starts and ends on the ground');

// ── 兩個小遊戲 ────────────────────────────────────────────────────────
assert.equal(FAR_ROUNDS.length, 8);
for (const c of CUES) { const rs = FAR_ROUNDS.filter((r) => r.cue === c); assert.equal(rs.length, 2, `${c} twice`); assert.deepEqual(rs.map((r) => r.far).sort(), ['A', 'B'], 'once on each side'); }
for (const r of FAR_ROUNDS) {
  const [far, nearOne] = farPair(r);
  assert.equal(far.name, r.far); assert.ok(far.d > nearOne.d);
  const same = (k) => (k === 'color' ? far.color.join() === nearOne.color.join() : far[k] === nearOne[k]);
  assert.equal(same('scale'), r.cue !== 'size'); assert.equal(same('baseY'), r.cue !== 'position'); assert.equal(same('color'), r.cue !== 'air');
  assert.equal(boxesOverlap(picBox(far), picBox(nearOne)), r.cue === 'overlap', 'the two shapes touch only in the overlap rounds');
}
assert.equal(ARRANGE_TASKS.length, 3);
assert.ok(ARRANGE_TASKS[0].check({ A: 5, B: 3, C: 1 }) && !ARRANGE_TASKS[0].check({ A: 3, B: 3, C: 3 }) && !ARRANGE_TASKS[0].check({ A: 4, B: 2, C: 1 }));
assert.ok(ARRANGE_TASKS[1].check({ A: 1, B: 2, C: 4 }) && !ARRANGE_TASKS[1].check({ A: 2, B: 2, C: 4 }));
assert.ok(ARRANGE_TASKS[2].check({ A: 3, B: 5, C: 1 }) && !ARRANGE_TASKS[2].check({ A: 1, B: 2, C: 5 }));
const arr = arrangeItems({ A: 5, B: 3, C: 1 });
assert.deepEqual(arr.map((it) => it.name), ['A', 'B', 'C'], 'far ones first'); assert.ok(arr[0].scale < arr[2].scale);
ARRANGE_TASKS.forEach((t) => assert.ok(!t.check({ A: 3, B: 3, C: 3 }), 'the starting arrangement does not already solve the task'));

console.log('depth.test.mjs: all assertions passed');
