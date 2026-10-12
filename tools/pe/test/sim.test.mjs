// 小模擬：換姿勢不會自己倒、歪過頭會倒、倒了可以站起來、放慢動作只是慢，結果一樣。
import assert from 'node:assert/strict';
import { PUSH, createSim, swayFor } from '../src/sim.js';
import { POSES, analyze, pose } from '../src/body.js';

const run = (S, sec, dt = 1 / 60) => { for (let t = 0; t < sec; t += dt) S.step(dt); };

// 每個姿勢之間互相切換：過渡完都站得住
const keys = Object.keys(POSES);
const S = createSim('together');
for (const a of keys) for (const b of keys) {
  S.setPose(a, true); S.setPose(b); run(S, 1.3);
  assert.ok(S.ok && !S.fall, `${a} → ${b} 之後要站得住`);
  assert.equal(S.key, b);
}

// 歪一點點：站得住；放開（目標回到 0）就回正
S.setPose('apart', true);
S.lean(0, 3); run(S, 1);
assert.ok(S.ok && Math.abs(S.sway.z - 3) < 0.01);
S.lean(0, 0); run(S, 1.5);
assert.ok(Math.abs(S.sway.z) < 0.01);

// 歪過頭：倒下去；倒的方向是往前（+z）；重心的投影跑到支撐範圍外面
let fell = 0;
S.onFall = () => { fell++; };
S.lean(0, 25); run(S, 3);
assert.equal(fell, 1);
assert.ok(S.fallen && !S.ok);
assert.ok(S.fall.dir[1] > 0.9, '往前倒');
assert.ok(S.J.head[1] < 0.25 && S.J.head[2] > 0.8, '頭在前方的地上');
assert.ok(S.com[1] < 0.2);
// 倒在地上時不能再歪
S.lean(10, 0); assert.equal(S.target.x, S.sway.x);
// 站起來
S.standUp(); run(S, 3);
assert.ok(S.ok && !S.fall && S.sway.z === 0 && S.sway.x === 0);
assert.ok(Math.abs(S.J.head[1] - analyze(pose('apart')).J.head[1]) < 1e-9);

// 同樣歪 5°：雙腳併攏往旁邊撐得住（傾倒角約 6°），單腳站就倒（約 2.5°）
const A = createSim('together'); A.lean(5, 0); run(A, 2); assert.ok(A.ok);
const B = createSim('oneLeg'); B.lean(5, 0); run(B, 2); assert.ok(B.fallen);
// 往旁邊歪 12°：雙腳張開撐得住，雙腳併攏倒
const C = createSim('apart'); C.lean(12, 0); run(C, 2); assert.ok(C.ok);
const D = createSim('together'); D.lean(12, 0); run(D, 2); assert.ok(D.fallen);
// 往前歪 8.6°：站直的雙腳張開（傾倒角約 7.5°）倒，馬步（約 9.3°）撐得住
const E1 = createSim('apart'); E1.lean(0, 8.6); run(E1, 2); assert.ok(E1.fallen);
const E2 = createSim('horse'); E2.lean(0, 8.6); run(E2, 2); assert.ok(E2.ok);

// 放慢動作：四分之一速度要花四倍時間，但結果一樣
const F = createSim('together'); F.speed = 0.25; F.lean(12, 0); run(F, 2); assert.ok(!F.fallen); run(F, 8); assert.ok(F.fallen);

// 「推推看」：推的角度比傾倒角大就倒、比較小就不倒；而且每一格離臨界值至少 0.3°，結果才不會模稜兩可
const table = {};
for (const st of ['together', 'apart', 'stride', 'horse']) {
  const tips = analyze(pose(st)).tips;
  table[st] = {};
  for (const [from, o] of Object.entries(PUSH.from)) {
    table[st][from] = PUSH.strengths.map((deg) => {
      assert.ok(Math.abs(deg - tips[o.tips]) > 0.3, `${st} 從 ${from} 推 ${deg}°：離傾倒角 ${tips[o.tips].toFixed(2)}° 太近`);
      const G = createSim(st); const sw = swayFor(pose(st), o.dir, deg); G.lean(sw.x, sw.z); run(G, 3);
      assert.equal(G.fallen, deg > tips[o.tips], `${st} 從 ${from} 推 ${deg}°`);
      return G.fallen ? 'x' : 'o';
    }).join('');
  }
}
// 雙腳併攏：輕推都不倒，中等的推只有從旁邊會倒，用力推都倒
assert.deepEqual(table.together, { front: 'oox', back: 'oox', left: 'oxx', right: 'oxx' });
// 雙腳左右張開：從旁邊怎麼推都不倒，從前後用力推會倒
assert.deepEqual(table.apart, { front: 'oox', back: 'oox', left: 'ooo', right: 'ooo' });
// 一腳在前一腳在後：正好相反
assert.deepEqual(table.stride, { front: 'ooo', back: 'ooo', left: 'oxx', right: 'oxx' });
// 馬步：左右很穩，前後用力推還是會倒
assert.deepEqual(table.horse, { front: 'oox', back: 'oox', left: 'ooo', right: 'ooo' });

console.log('sim.test: ok');
