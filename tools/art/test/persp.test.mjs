import assert from 'node:assert/strict';
import {
  EYE0, EYE_X, EYE_Y, HALL, HEIGHTS, HIT_AT, NEAR_AT, PIC, POST, SCENES, VP_ROUNDS, apparent, fromUV, frustum, hallwayLines, horizonY, offPercent,
  postPicture, project, sceneUV, toUV, vanishingPoint, vpGrade,
} from '../src/persp.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const eq2 = (p, q, eps = 1e-9, msg = '') => { near(p[0], q[0], eps, msg + ' x'); near(p[1], q[1], eps, msg + ' y'); };
const eye = { x: 0, y: 1.2, d: 3 };

// ── 畫面上的點 ────────────────────────────────────────────────────────
eq2(project([1, 2, 0], eye), [1, 2], 1e-12, 'a point on the window stays where it is');
eq2(project([2, 0, -3], eye), [1, 0.6], 1e-12, 'twice as far from the eye: halfway to the vanishing point');
eq2(project([0, 1.2, -100], eye), [0, 1.2], 1e-12, 'a point straight ahead at eye height never moves');
near(project([2, 0, -1e6], eye)[0], 0, 1e-4, 'very far away, everything lands on the vanishing point');
near(project([2, 0, -1e6], eye)[1], 1.2, 1e-4);

// ── 消失點與視平線 ────────────────────────────────────────────────────
eq2(vanishingPoint([0, 0, -1], eye), [0, 1.2], 1e-12, 'lines going straight in meet in front of the eye');
assert.equal(vanishingPoint([1, 0, 0], eye), null, 'lines parallel to the picture do not converge');
assert.equal(vanishingPoint([0, 1, 0], eye), null);
// 走廊四條邊在畫面上延長，都通過同一點
const vp = vanishingPoint([0, 0, -1], eye);
for (const [sx, sy] of [[-2, 0], [2, 0], [-2, 3], [2, 3], [1, 0], [0.3, 2.1]]) {
  const a = project([sx, sy, 0], eye), b = project([sx, sy, -7], eye), c = project([sx, sy, -18], eye);
  const cross = (b[0] - a[0]) * (vp[1] - a[1]) - (b[1] - a[1]) * (vp[0] - a[0]);
  near(cross, 0, 1e-9, 'the edge points at the vanishing point');
  assert.ok(Math.hypot(c[0] - vp[0], c[1] - vp[1]) < Math.hypot(b[0] - vp[0], b[1] - vp[1]), 'farther along, closer to the vanishing point');
}
// 視平線＝眼睛的高度；地板上往任何水平方向延伸的線，消失點都在視平線上
for (const y of [0.6, 1.2, 2.2]) {
  const e = { x: 0.4, y, d: 3 };
  assert.equal(horizonY(e), y);
  for (const d of [[0, 0, -1], [1, 0, -1], [-2, 0, -1], [0.3, 0, -2]]) near(vanishingPoint(d, e)[1], y, 1e-12, 'level lines vanish on the horizon');
  eq2(vanishingPoint([0, 0, -1], e), [0.4, y], 1e-12, 'the vanishing point follows the eye');
}
// 往上斜的線，消失點在視平線上面
assert.ok(vanishingPoint([0, 0.5, -1], eye)[1] > horizonY(eye));
// 眼睛比東西高，就看得到它的上面：桌面（高 0.8）的遠邊畫在近邊的上方；眼睛比它低就反過來
assert.ok(project([0, 0.8, -6], { x: 0, y: 1.2, d: 3 })[1] > project([0, 0.8, -3], { x: 0, y: 1.2, d: 3 })[1]);
assert.ok(project([0, 0.8, -6], { x: 0, y: 0.6, d: 3 })[1] < project([0, 0.8, -3], { x: 0, y: 0.6, d: 3 })[1]);

// ── 越遠越小 ──────────────────────────────────────────────────────────
assert.equal(apparent(1.5, 0, eye), 1.5); near(apparent(1.5, -3, eye), 0.75, 1e-12, 'twice as far, half as tall'); near(apparent(1.5, -6, eye), 0.5, 1e-12, 'three times as far, a third');
const pn = postPicture(POST.near, eye), pf = postPicture(-12, eye);
near(pn.height, apparent(POST.h, POST.near, eye), 1e-12); assert.ok(pf.height < pn.height);
near(pf.height / pn.height, (3 + 2) / (3 + 12), 1e-12, 'picture heights go as one over the distance from the eye');
// 兩根柱子的頂端連線、底端連線，延長都通過消失點
for (const k of ['top', 'foot']) { const a = pn[k], b = pf[k]; near((b[0] - a[0]) * (vp[1] - a[1]) - (b[1] - a[1]) * (vp[0] - a[0]), 0, 1e-9, `${k} line`); }

// ── 座標換算與相機 ────────────────────────────────────────────────────
eq2(toUV([-2, 3]), [0, 0]); eq2(toUV([2, 0]), [1, 1]); eq2(toUV([0, 1.5]), [0.5, 0.5]);
eq2(fromUV(toUV([0.7, 2.1])), [0.7, 2.1], 1e-12);
near(offPercent([0, 0], [0.4, 0]), 10, 1e-12);
const f = frustum(eye, 0.1);
near(f.left, -2 * 0.1 / 3, 1e-12); near(f.right, 2 * 0.1 / 3, 1e-12); near(f.bottom, -1.2 * 0.1 / 3, 1e-12); near(f.top, 1.8 * 0.1 / 3, 1e-12);
const f2 = frustum({ x: 1, y: 2, d: 3 }, 0.1);
assert.ok(f2.right < -f2.left && f2.top < -f2.bottom, 'eye up and to the right: the frustum leans down and to the left');
near((f2.right - f2.left) / (f2.top - f2.bottom), PIC.w / PIC.h, 1e-12, 'the picture keeps its 4:3 shape');
assert.ok(EYE_Y.min < HEIGHTS.crouch.y && HEIGHTS.chair.y < EYE_Y.max && HEIGHTS.crouch.y < HEIGHTS.stand.y && HEIGHTS.stand.y < HEIGHTS.chair.y);
assert.ok(EYE_X.max < HALL.w / 2 && EYE_Y.max < HALL.h, 'the eye stays inside the hallway');
assert.equal(EYE0.y, HEIGHTS.stand.y);

// ── 線稿與小遊戲 ──────────────────────────────────────────────────────
assert.ok(hallwayLines().length > 30);
for (const key of Object.keys(SCENES)) {
  const uv = sceneUV(key, eye);
  assert.ok(uv.length > 8, `${key} has lines on the picture`);
  uv.flat().forEach((p) => assert.ok(Number.isFinite(p[0]) && Number.isFinite(p[1])));
}
// 走廊的四條邊剛好從畫面的四個角出發
const hu = sceneUV('hallway', eye);
for (const corner of [[0, 1], [1, 1], [0, 0], [1, 0]]) assert.ok(hu.some(([p]) => Math.hypot(p[0] - corner[0], p[1] - corner[1]) < 1e-9), `an edge starts at corner ${corner}`);
assert.equal(VP_ROUNDS.length, 5);
for (const r of VP_ROUNDS) {
  assert.ok(SCENES[r.scene]);
  const v = toUV(vanishingPoint([0, 0, -1], r.eye));
  assert.ok(v[0] > 0.05 && v[0] < 0.95 && v[1] > 0.05 && v[1] < 0.95, 'the vanishing point is inside the picture');
}
assert.ok(new Set(VP_ROUNDS.map((r) => `${r.eye.x},${r.eye.y}`)).size === 5, 'five different answers');
assert.equal(vpGrade(0).key, 'hit'); assert.equal(vpGrade(HIT_AT).key, 'hit'); assert.equal(vpGrade(HIT_AT + 0.1).key, 'near'); assert.equal(vpGrade(NEAR_AT + 0.1).key, 'far');
assert.equal(new Set([0, 6, 30].map((p) => vpGrade(p).mark)).size, 3);

console.log('persp.test.mjs: all assertions passed');
