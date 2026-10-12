// 人偶：各節質量加起來是 1、站直時重心在身高的一半多一點、每個預設姿勢都站得住、
// 單腳站的範圍比雙腳小、馬步的重心比站直低、歪過頭就倒。
import assert from 'node:assert/strict';
import { BASE, HEIGHT, MASS, POSES, PROP, analyze, centerOfMass, joints, lerpPose, pose, rawPose, topple } from '../src/body.js';
import { tipAny } from '../src/balance.js';

const near = (a, b, eps) => assert.ok(Math.abs(a - b) <= eps, `${a} ≠ ${b}`);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// 各節質量比例（Dempster／Winter 表 4.1）：頭頸 8.1%、軀幹 49.7%、一隻手臂 5.0%、一條腿 16.1%，加起來 100%
const arm = MASS.upperArm.m + MASS.forearm.m + MASS.hand.m;
const leg = MASS.thigh.m + MASS.shank.m + MASS.foot.m;
near(arm, 0.050, 1e-12); near(leg, 0.161, 1e-12);
near(MASS.head.m + MASS.trunk.m + 2 * arm + 2 * leg, 1, 1e-12);
assert.deepEqual([MASS.upperArm.c, MASS.forearm.c, MASS.hand.c, MASS.thigh.c, MASS.shank.c, MASS.foot.c, MASS.trunk.c], [0.436, 0.43, 0.506, 0.433, 0.433, 0.5, 0.5]);
near(centerOfMass(joints(pose('together'))).total, 1, 1e-12);

const A = {};
for (const k of Object.keys(POSES)) A[k] = analyze(pose(k));

// 每一個預設姿勢：重心的投影在支撐範圍裡、腳踩在地上、骨頭的長度沒有變、膝蓋沒有反折
const thigh = (PROP.hip - PROP.knee) * HEIGHT, shank = (PROP.knee - PROP.ankle) * HEIGHT;
for (const [k, a] of Object.entries(A)) {
  const J = a.J, P = pose(k);
  assert.ok(a.inside && a.margin > 0.02, `${k}: 重心投影要在支撐範圍裡（離邊緣 ${a.margin}）`);
  for (const s of ['L', 'R']) {
    if (s === 'R' && P.liftR > 0.5) { assert.ok(J.ballR[1] > 0.1 && J.heelR[1] > 0.1, `${k}: 抬起來的腳要離地`); continue; }
    near(J['ball' + s][1], 0, 1e-9); near(J['toe' + s][1], 0, 1e-9);
    if (P.heel < 0.1) near(J['heel' + s][1], 0, 1e-9); else assert.ok(J['heel' + s][1] > 0.05, `${k}: 踮腳時腳跟離地`);
  }
  for (const s of ['L', 'R']) {
    near(dist(J['hip' + s], J['knee' + s]), thigh, 1e-6);
    near(dist(J['knee' + s], J['ankle' + s]), shank, 1e-6);
    near(dist(J['shoulder' + s], J['elbow' + s]), PROP.upperArm * HEIGHT, 1e-9);
    near(dist(J['elbow' + s], J['wrist' + s]), PROP.forearm * HEIGHT, 1e-9);
    // 膝蓋往腳尖的方向彎，不會往後折
    const f = J.footDir[s].f, mid = [(J['hip' + s][0] + J['ankle' + s][0]) / 2, 0, (J['hip' + s][2] + J['ankle' + s][2]) / 2];
    assert.ok((J['knee' + s][0] - mid[0]) * f[0] + (J['knee' + s][2] - mid[2]) * f[2] > -1e-6, `${k}: ${s} 膝蓋不能反折`);
  }
  for (const key of Object.keys(J)) {
    if (Array.isArray(J[key]) && J[key].length === 3 && typeof J[key][0] === 'number') assert.ok(J[key][1] > -1e-9, `${k}: ${key} 在地板下面`);
  }
  near(J.head[1] - J.pelvis[1], (PROP.headC - PROP.hip) * HEIGHT * Math.cos((P.trunk * Math.PI) / 180), 1e-9);
}

// 站直：重心在身高的 55%–59%（實際量到的成年人平均大約 55%；這個人偶算出來約 57%）
const up = A.together.com[1] / HEIGHT;
assert.ok(up > 0.55 && up < 0.59, `站直時重心高度 ${up}`);
near(A.together.com[0], 0, 1e-6);

// 腳張開 → 支撐範圍變大、往旁邊更不容易倒
assert.ok(A.apart.area > A.together.area * 2);
assert.ok(A.apart.tips.left > A.together.tips.left * 2);
// 單腳站的範圍比雙腳小
assert.ok(A.oneLeg.area < A.together.area * 0.5);
assert.ok(A.oneLeg.tips.left < A.together.tips.left);
// 踮腳尖：範圍只剩前腳掌，重心也變高
assert.ok(A.tiptoe.area < A.together.area && A.tiptoe.com[1] > A.together.com[1] + 0.02);
// 馬步的重心比站直低；腳的位置和「wide」一樣，所以每個方向都比較不容易倒
assert.ok(A.horse.com[1] < A.together.com[1] - 0.1);
assert.ok(A.horse.com[1] < A.wide.com[1] - 0.08);
for (const d of ['front', 'back', 'left', 'right']) assert.ok(A.horse.tips[d] > A.wide.tips[d], `馬步 ${d}`);
// 張開雙臂：支撐範圍一樣大，重心反而高一點
near(A.armsOut.area, A.together.area, 1e-9);
assert.ok(A.armsOut.com[1] > A.together.com[1] + 0.01);
// 一腳在前、一腳在後：前後穩、左右不穩；雙腳左右張開則相反
assert.ok(A.stride.tips.front > A.stride.tips.left * 2);
assert.ok(A.apart.tips.left > A.apart.tips.front * 1.8);

// 歪：重心的投影跟著跑；歪過傾倒角就跑出範圍
for (const k of ['together', 'apart', 'horse', 'oneLeg', 'tiptoe', 'armsOut']) {
  const P = pose(k);
  for (const [dir, sw] of [['front', { x: 0, z: 1 }], ['back', { x: 0, z: -1 }], ['left', { x: 1, z: 0 }], ['right', { x: -1, z: 0 }]]) {
    const tip = A[k].tips[dir];
    const small = analyze(P, { x: sw.x * tip * 0.5, z: sw.z * tip * 0.5 });
    assert.ok(small.inside, `${k} 往 ${dir} 歪一半還站得住`);
    const big = analyze(P, { x: sw.x * (tip * 1.6 + 3), z: sw.z * (tip * 1.6 + 3) });
    assert.ok(!big.inside, `${k} 往 ${dir} 歪過頭要倒`);
    // 腳留在原地
    near(dist(big.J.ballL, A[k].J.ballL), 0, 1e-9);
  }
}

// 過渡：頭尾就是兩個姿勢，中間的骨頭長度也不變
const p0 = pose('together'), p1 = pose('horse');
assert.deepEqual(lerpPose(p0, p1, 0), p0); assert.deepEqual(lerpPose(p0, p1, 1), p1);
for (let t = 0; t <= 1; t += 0.1) {
  const J = joints(lerpPose(p0, p1, t));
  near(dist(J.hipL, J.kneeL), thigh, 1e-6); near(dist(J.kneeL, J.ankleL), shank, 1e-6);
  assert.ok(J.ballL[1] === 0 && J.heelL[1] < 1e-9);
}
assert.deepEqual(Object.keys(rawPose('together')), Object.keys(BASE));

// 倒下去：繞著地上的支點轉，支點上的東西不動，轉 90° 之後整個人貼近地面，而且不穿過地板
const J0 = A.together.J;
const T = topple(J0, [0, 0.2], [0, 1], Math.PI / 2);
assert.ok(T.head[1] < 0.2 && T.head[2] > 1.2);
for (const key of Object.keys(T)) if (Array.isArray(T[key]) && T[key].length === 3 && typeof T[key][0] === 'number') assert.ok(T[key][1] >= 0.035 - 1e-12);
const T0 = topple(J0, [0, 0.2], [0, 1], 0, 0);
near(dist(T0.head, J0.head), 0, 1e-12);

// 「哪一個姿勢最穩」的題目：答案由這裡算出來，而且要贏第二名至少 15%，才不會有模稜兩可的題
import { QUESTIONS, stabilityFor } from '../src/stable.js';
assert.equal(QUESTIONS.length, 8);
for (const q of QUESTIONS) {
  const s = q.poses.map((k) => stabilityFor(k, q.dir)).sort((a, b) => b - a);
  assert.ok(s[0] > s[1] * 1.15, `題目 ${q.poses.join('/')}（${q.dir}）：${s.map((v) => v.toFixed(1)).join(' vs ')}`);
  assert.ok(q.poses.length >= 2 && q.poses.length <= 3);
}
near(stabilityFor('apart', 'any'), tipAny(A.apart.base, A.apart.com).deg, 1e-9);

console.log('body.test: ok');
