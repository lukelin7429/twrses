import assert from 'node:assert/strict';
import {
  AMBIENT, BALL_R, DIFFUSE, DIRS, LAMP_ROUNDS, SHUFFLES, SORT_ROUNDS, TABLE, ballValue, castShadow, describeLight, isSorted, landmarks,
  lightDir, lightness, quantize, tableValue, zoneOf,
} from '../src/shade.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const len = (v) => Math.hypot(v[0], v[1], v[2]);

// 燈的方向
lightDir(0, 0).forEach((v, i) => near(v, [0, 0, 1][i], 1e-12, 'straight in front'));
lightDir(90, 0).forEach((v, i) => near(v, [1, 0, 0][i], 1e-12, 'to the right'));
lightDir(0, 90).forEach((v, i) => near(v, [0, 1, 0][i], 1e-12, 'straight above'));
near(len(lightDir(-55, 50)), 1, 1e-12, 'unit vector');
assert.ok(lightDir(-55, 50)[0] < 0 && lightDir(-55, 50)[1] > 0, 'upper left');

// ── 球面的明暗：只看那一點朝哪裡 ───────────────────────────────────────
const L = lightDir(-55, 50);
near(ballValue(L, L, null), AMBIENT + DIFFUSE, 1e-12, 'facing the lamp: brightest');
near(ballValue(L.map((v) => -v), L, null), AMBIENT + 0.20 * L[1] * L[1], 1e-9, 'facing away, tilted down: ambient plus bounce');
near(ballValue([0, 1, 0], [0, 0, 1], null), AMBIENT, 1e-12, 'edge-on to the light gets no direct light');
near(ballValue(lightDir(-55 + 60, 50), L, null) > ballValue(lightDir(-55 + 90, 50), L, null) ? 1 : 0, 1, 0, 'turning away gets darker');
// 轉離光源，一路變暗，直到明暗交界
let prev = 2;
for (let a = 0; a <= 90; a += 5) { const v = ballValue(lightDir(a, 0), [0, 0, 1], null); assert.ok(v < prev, `darker at ${a} degrees`); prev = v; }
near(ballValue(lightDir(60, 0), [0, 0, 1], null), AMBIENT + DIFFUSE * 0.5, 1e-9, 'at 60 degrees the direct light is halved');
// 反光：背光面朝下的地方，比背光面朝上的地方亮
const up = ballValue([0.3, 0.6, -0.74].map((v, i, a) => v / len(a)), L, null), down = ballValue([0.3, -0.6, -0.74].map((v, i, a) => v / len(a)), L, null);
assert.ok(down > up, 'reflected light lifts the underside of the shadow');
assert.ok(down < ballValue(L, L, null) * 0.5, 'but reflected light never comes close to the light side');
// 最暗的一圈不在最背面，而在明暗交界剛過去的地方（背面有反光）
const lm = landmarks(L);
assert.ok(ballValue(lm.core, L) < ballValue(lm.reflected, L), 'the core shadow is darker than the reflected light');
assert.ok(ballValue(lm.highlight, L) > ballValue(lm.light, L) && ballValue(lm.light, L) > ballValue(lm.halftone, L) && ballValue(lm.halftone, L) > ballValue(lm.core, L));
// 亮點在燈和眼睛之間，而且只有一小塊
near(ballValue(lm.highlight, L), 1, 1e-9, 'the highlight reaches white');
assert.ok(ballValue(lm.highlight, L) - ballValue(lm.highlight, L, null) > 0.1);
assert.equal(zoneOf(lm.highlight, L), 'highlight'); assert.equal(zoneOf(lm.light, L), 'light'); assert.equal(zoneOf(lm.halftone, L), 'halftone');
assert.equal(zoneOf(lm.core, L), 'core'); assert.equal(zoneOf(lm.reflected, L), 'reflected');
for (const k of ['highlight', 'light', 'halftone', 'core', 'reflected']) { near(len(lm[k]), 1, 1e-9, k); assert.ok(lm[k][2] > -0.2, `${k} is on the side you can see`); }
// 每一種燈位都成立
for (const key of Object.keys(DIRS)) {
  const l = lightDir(DIRS[key].az, DIRS[key].el), m = landmarks(l);
  assert.ok(ballValue(m.light, l) > ballValue(m.halftone, l) && ballValue(m.halftone, l) > ballValue(m.core, l), `${key}: light > halftone > core`);
  for (let i = 0; i < 200; i++) {   // 任何方向都在 0–1 之間
    const n = lightDir(i * 37 % 360, (i * 53 % 180) - 90), v = ballValue(n, l);
    assert.ok(v >= AMBIENT - 1e-12 && v <= 1);
  }
}

// ── 分階（素描的樣子）──────────────────────────────────────────────────
assert.deepEqual(quantize(0, 5), [0, 0]); assert.deepEqual(quantize(1, 5), [4, 1]); assert.deepEqual(quantize(0.5, 5), [2, 0.5]);
assert.deepEqual(quantize(0.19, 5), [0, 0]); assert.deepEqual(quantize(0.2, 5), [1, 0.25]); assert.deepEqual(quantize(0.99, 3), [2, 1]);
for (const s of [3, 5, 7]) { const ks = new Set(); for (let v = 0; v <= 1.0001; v += 0.01) ks.add(quantize(v, s)[0]); assert.equal(ks.size, s, `${s} steps`); }

// ── 影子 ──────────────────────────────────────────────────────────────
const s = castShadow(L);
assert.ok(s.cx > 0 && s.cz < 0, 'light from the upper left front throws the shadow to the right and back');
near(s.minor, BALL_R, 1e-12); near(s.major, BALL_R / L[1], 1e-12, 'a lower lamp stretches the shadow');
assert.ok(castShadow(lightDir(-55, 20)).major > castShadow(lightDir(-55, 70)).major);
const top = castShadow(lightDir(0, 90)); near(top.cx, 0, 1e-9); near(top.cz, 0, 1e-9); near(top.major, 1, 1e-12, 'lamp overhead: a round shadow under the ball');
near(tableValue(s.cx, s.cz, L), AMBIENT + 0.03, 1e-9, 'inside the shadow only ambient light is left');
near(tableValue(-4, 3, L), AMBIENT + TABLE * L[1], 1e-9, 'the open table is lit');
assert.ok(tableValue(s.cx, s.cz, L) < ballValue(lm.core, L) + 0.05, 'the cast shadow is about as dark as anything in the scene');
assert.ok(tableValue(-4, 3, lightDir(0, 20)) < tableValue(-4, 3, lightDir(0, 70)), 'a low lamp lights the table less');
// 球和桌面接觸的那一點在影子裡
near(tableValue(0, 0, L), AMBIENT + 0.03, 1e-9, 'the contact point is in shadow');

// ── 明度與說明 ────────────────────────────────────────────────────────
near(lightness(1), 100, 0.01); near(lightness(0), 0, 0.01); near(lightness(0.5), 53.39, 0.02, 'middle gray on screen');
assert.ok(lightness(0.6) > lightness(0.4));
assert.deepEqual(describeLight(-55, 50), { side: 'left', height: 'middle' });
assert.deepEqual(describeLight(80, 14), { side: 'right', height: 'low' });
assert.deepEqual(describeLight(0, 82), { side: 'front', height: 'high' });
assert.deepEqual(describeLight(170, 40), { side: 'behind', height: 'middle' });
assert.deepEqual(describeLight(-190, 40), { side: 'behind', height: 'middle' });

// ── 兩個小遊戲 ────────────────────────────────────────────────────────
assert.equal(LAMP_ROUNDS.length, 6);
assert.equal(new Set(LAMP_ROUNDS.map((r) => r.answer)).size, 6, 'each direction is the answer once');
for (const r of LAMP_ROUNDS) { assert.equal(new Set(r.options).size, 4); assert.ok(r.options.includes(r.answer)); r.options.forEach((o) => assert.ok(DIRS[o])); }
assert.equal(new Set(Object.values(DIRS).map((d) => d.arrow)).size, 6, 'each direction has its own arrow');
assert.equal(SORT_ROUNDS.length, 3);
SORT_ROUNDS.forEach((r, i) => {
  assert.equal(r.length, 5); assert.ok(isSorted(r), 'stored from light to dark');
  const mixed = SHUFFLES[i].map((k) => r[k]);
  assert.ok(!isSorted(mixed), 'the starting order is not already sorted');
  assert.deepEqual([...SHUFFLES[i]].sort(), [0, 1, 2, 3, 4]);
  // 相鄰兩塊的明度差：一回合比一回合小，但都大於 5
  const gaps = r.slice(1).map((v, k) => lightness(r[k]) - lightness(v));
  assert.ok(Math.min(...gaps) > 5, `round ${i + 1}: neighbors differ by more than 5 L*`);
});
const gap = (r) => Math.min(...r.slice(1).map((v, k) => lightness(r[k]) - lightness(v)));
assert.ok(gap(SORT_ROUNDS[0]) > gap(SORT_ROUNDS[1]) && gap(SORT_ROUNDS[1]) > gap(SORT_ROUNDS[2]), 'each round is harder');
assert.ok(isSorted([3, 2, 1]) && !isSorted([3, 3, 1]) && !isSorted([1, 2, 3]));

console.log('shade.test.mjs: all assertions passed');
