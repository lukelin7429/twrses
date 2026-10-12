import assert from 'node:assert/strict';
import { HIGH, LOW, PARTS, STAGES, actionPose, brightness, contactMs, hammerSpeed, isBlackKey, keyCounts, keyFreq, keyTime, makePartRounds, octaveStretchCents, partialFreq,
  partialRatios, sharpCents, silenceTime, toneAmps } from '../src/piano.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);
// 88 鍵
assert.deepEqual(keyCounts(), { total: 88, white: 52, black: 36 });
assert.equal(LOW, 21); assert.equal(HIGH, 108);
near(keyFreq(21), 27.5); near(keyFreq(108), 4186.009, 0.001); near(keyFreq(69), 440);
assert.ok(isBlackKey(22) && !isBlackKey(21) && !isBlackKey(108));
// 力度：槌子速度 pp 到 ff 約差 100 倍；碰弦時間 4 ms → 不到 2 ms；越用力越亮
near(hammerSpeed(1) / hammerSpeed(0), 100, 1e-9);
for (let v = 0; v < 1; v += 0.1) assert.ok(hammerSpeed(v + 0.1) > hammerSpeed(v));
near(contactMs(0), 4); assert.ok(contactMs(1) < 2 && contactMs(1) > 1);
for (let v = 0; v < 1; v += 0.1) { assert.ok(contactMs(v + 0.1) < contactMs(v)); assert.ok(brightness(v + 0.1) > brightness(v), `brightness at ${v}`); }
{
  const a = toneAmps(0.5); near(Math.max(...a), 1);
  near(toneAmps(0.5, 10, 1 / 8)[7], 0, 1e-9);      // 第 8 泛音：節點在 1/8 的敲擊處，幾乎消失
  assert.ok(toneAmps(1)[4] > toneAmps(0)[4] * 2, 'high partial much stronger at ff');
}
// 不諧波：B＝0 時是整數倍；B>0 時越高的泛音越偏高（順序上升）；八度拉寬的音分
near(partialFreq(100, 3, 0), 300);
assert.deepEqual(partialRatios(0, 4), [1, 2, 3, 4]);
{
  const r = partialRatios(0.001, 8);
  r.forEach((x, i) => assert.ok(x > i + 1, 'sharp'));
  for (let i = 1; i < r.length; i++) assert.ok(r[i] / (i + 1) > r[i - 1] / i, 'progressively sharper');
  near(sharpCents(1, 0.001), 600 * Math.log2(1.001), 1e-9);
  near(octaveStretchCents(0.001), 600 * Math.log2(1.004), 1e-9);
  assert.ok(octaveStretchCents(0.001) > 3 && octaveStretchCents(0.001) < 4);
  assert.ok(octaveStretchCents(0.002) > octaveStretchCents(0.001));
  assert.equal(octaveStretchCents(0), 0);
}
// 動作：階段順序、脫離在碰弦之前、制音器比槌子早抬起、槌子不會超過弦、放開後落回
{
  for (const v of [0, 0.3, 0.7, 1]) {
    const seen = []; let letAt = -1, contactAt = -1, damperUp = -1, maxH = 0;
    for (let t = 0; t < 1.2; t += 0.002) {
      const p = actionPose(t, v);
      if (!seen.length || seen.at(-1) !== p.stage) seen.push(p.stage);
      if (p.jackFree && letAt < 0) letAt = t;
      if (p.contact && contactAt < 0) contactAt = t;
      if (p.damper > 0.6 && damperUp < 0) damperUp = t;
      maxH = Math.max(maxH, p.hammer);
      assert.ok(p.key >= 0 && p.key <= 1.0001 && p.hammer >= 0 && p.hammer <= 1.0001 && p.damper >= 0 && p.damper <= 1.0001);
    }
    assert.deepEqual(seen, ['acceleration', 'free flight', 'contact', 'rebound', 'check']);
    assert.ok(letAt > 0 && letAt < contactAt, `let-off before contact at v=${v}`);
    assert.ok(damperUp < contactAt, 'damper lifts before the hammer arrives');
    near(maxH, 1, 1e-9);
  }
  // 力度大 → 更早碰弦
  const firstContact = (v) => { for (let t = 0; t < 2; t += 0.001) if (actionPose(t, v).contact) return t; return Infinity; };
  assert.ok(firstContact(1) < firstContact(0.5) && firstContact(0.5) < firstContact(0));
  assert.ok(keyTime(1) < keyTime(0));
  // 在弦上時：槌子在 1，制音器抬起
  const tc = firstContact(0.6), pc = actionPose(tc + 0.01, 0.6);
  near(pc.hammer, 1); assert.ok(pc.damper > 0.9 && pc.contact);
  // 放開：沒踏板 → 制音器落回；有踏板 → 維持抬起；槌子與琴鍵回到 0
  const tRel = 0.8;
  const after = actionPose(tRel + 0.6, 0.6, tRel, false), withPedal = actionPose(tRel + 0.6, 0.6, tRel, true);
  near(after.damper, 0, 1e-9); near(withPedal.damper, 1, 1e-9);
  near(after.key, 0, 1e-9); near(after.hammer, 0, 1e-9);
  assert.equal(silenceTime(tRel, false), tRel + 0.12); assert.equal(silenceTime(tRel, true), Infinity);
  assert.equal(actionPose(-1, 0.5).stage, 'rest');
}
assert.ok(STAGES.includes('free flight'));
// 零件題
{
  assert.equal(PARTS.length, 5);
  const q = makePartRounds(mulberry32(8), 6);
  assert.equal(q.length, 6);
  for (const p of PARTS) assert.ok(q.includes(p.key));
  q.slice(1).forEach((x, i) => assert.notEqual(x, q[i]));
}
console.log('piano.test.mjs ok');
