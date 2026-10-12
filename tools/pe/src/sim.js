/*
 * 體育 Sports and Movement · 人偶的小模擬（不碰 DOM、不碰 three；3D 模型和「推推看」共用，test/sim.test.mjs）。
 *
 *   createSim(key) → S
 *     S.setPose(key, 立即?)   換姿勢（0.9 秒過渡；過渡中不判斷會不會倒）
 *     S.lean(x, z)            整個人往左、往前歪幾度（目標值，會平順地追上；腳留在原地）
 *     S.nudge(dx, dz)         在現在的目標上再加幾度
 *     S.standUp()             站起來（倒在地上時先爬起來）
 *     S.step(dt)              往前算 dt 秒；之後讀 S.A（analyze 的結果）、S.J（要畫的關節）、S.com、S.parts
 *     S.ok                    重心的投影還在支撐範圍裡，而且沒有在倒
 *     S.falling／S.fallen     正在倒／已經倒在地上
 *     S.speed                 1、0.5、0.25（放慢動作）
 *     S.onFall                倒下去那一刻呼叫一次
 *   swayFor(P, dir, deg) → { x, z }
 *     要讓「重心」繞著它在地上的投影歪 deg 度（重心水平移動＝原本的高度 × tan(deg)），整個人要往 dir＝[x, z] 歪幾度。
 *     人偶是繞著腳踝歪的，重心移動得比身體的角度少一點，所以要解出來；這樣「推的角度 > 傾倒角」就一定倒，反過來就一定不倒。
 *   PUSH＝{ strengths: [3, 7, 11], from: { front, back, left, right } }   「推推看」：從哪邊推 → 往哪邊倒
 */
import { analyze, centerOfMass, fallFrom, lerpPose, pose, topple } from './body.js';

const DUR = 0.9, MAXLEAN = 40;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const PUSH = {
  strengths: [3, 7, 11],
  from: { front: { dir: [0, -1], tips: 'back' }, back: { dir: [0, 1], tips: 'front' }, left: { dir: [-1, 0], tips: 'right' }, right: { dir: [1, 0], tips: 'left' } },
};

export function swayFor(P, dir, deg) {
  const A0 = analyze(P);
  const want = A0.com[1] * Math.tan((deg * Math.PI) / 180);
  const L = Math.hypot(dir[0], dir[1]) || 1, dx = dir[0] / L, dz = dir[1] / L;
  let lo = 0, hi = MAXLEAN;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2, A = analyze(P, { x: dx * m, z: dz * m });
    const moved = (A.com[0] - A0.com[0]) * dx + (A.com[2] - A0.com[2]) * dz;
    if (moved < want) lo = m; else hi = m;
  }
  const m = (lo + hi) / 2;
  return { x: dx * m, z: dz * m };
}

export function createSim(key = 'together') {
  const S = {
    key, P: pose(key), from: null, to: null, t: 1, sway: { x: 0, z: 0 }, target: { x: 0, z: 0 },
    fall: null, fallen: false, speed: 1, A: null, J: null, com: null, parts: null, onFall: null,
    get falling() { return !!S.fall && !S.fallen && !S.fall.rise; },
    get moving() { return S.t < 1; },
    get ok() { return !S.fall && !!S.A && S.A.inside; },
    setPose(k, instant) {
      S.key = k; S.from = { ...S.P }; S.to = pose(k); S.t = instant ? 1 : 0;
      if (instant) S.P = S.to;
      S.target.x = S.target.z = 0;
      if (instant) S.sway.x = S.sway.z = 0;
      if (S.fall) { S.fall = null; S.fallen = false; S.sway.x = S.sway.z = 0; }
      if (instant) refresh();
    },
    lean(x, z) { if (S.fall) return; S.target.x = clamp(x, -MAXLEAN, MAXLEAN); S.target.z = clamp(z, -MAXLEAN, MAXLEAN); },
    nudge(dx, dz) { S.lean(S.target.x + dx, S.target.z + dz); },
    standUp() {
      S.target.x = S.target.z = 0;
      if (S.fall) { S.fall.rise = true; S.fallen = false; }
    },
    step(dt) {
      const sp = S.speed;
      if (S.t < 1) { S.t = Math.min(1, S.t + (dt * sp) / DUR); S.P = lerpPose(S.from, S.to, ease(S.t)); }
      const f = S.fall;
      if (f && !f.rise) {
        if (!S.fallen) {
          f.vel += dt * sp * (1.2 + 7 * Math.sin(Math.min(f.ang + 0.12, Math.PI / 2)));
          f.ang += f.vel * dt * sp;
          if (f.ang >= f.max) { f.ang = f.max; S.fallen = true; }
        }
      } else {
        const k = 1 - Math.exp(-dt * sp * 9);
        S.sway.x += (S.target.x - S.sway.x) * k; S.sway.z += (S.target.z - S.sway.z) * k;
        if (f) {
          f.ang -= dt * sp * 2.4 * (0.35 + f.ang);
          if (f.ang <= 0) { S.fall = null; S.sway.x = S.sway.z = 0; }
        }
      }
      refresh();
      if (!S.fall && S.t >= 1 && !S.A.inside) {
        S.fall = { ...fallFrom(S.A), ang: 0, vel: 0.25, max: (Math.PI / 2) * 0.985, rise: false };
        S.target.x = S.sway.x; S.target.z = S.sway.z;
        if (S.onFall) S.onFall(S.fall);
        refresh();
      }
    },
  };
  function refresh() {
    S.A = analyze(S.P, S.sway);
    if (S.fall) {
      S.J = topple(S.A.J, S.fall.pivot, S.fall.dir, S.fall.ang);
      const c = centerOfMass(S.J); S.com = c.com; S.parts = c.parts;
    } else { S.J = S.A.J; S.com = S.A.com; S.parts = S.A.parts; }
  }
  refresh();
  return S;
}
