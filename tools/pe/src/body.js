/*
 * 體育 Sports and Movement · 人偶的身體（純函式，不碰 DOM、不碰 three；test/body.test.mjs）。
 * 每一課共用：姿勢是一包數字，joints() 把它變成關節的位置，centerOfMass() 算出全身的重心。
 *
 * 座標（公尺）：x＝人偶的左邊為正、y＝往上、z＝人偶面對的方向為正。地板是 y＝0。
 *
 * 身體各節的長度：PROP（占身高的比例）。用的是生物力學教科書常見的一組身高比例（一般說法是 Drillis 與 Contini 1966、
 *   Winter 的教科書轉載；2026-10 沒有查到可以逐項核對的公開原文，所以頁面上不寫這個出處，只說「一般人的大致比例」）。
 *   它們只影響人偶的外觀與畫面上的公分數。髖關節與腳的細節是我們為了人偶好看另外定的，見各欄註解。
 * 身體各節的質量：MASS（占體重的比例 m、質心離近端關節占該節長度的比例 c；Dempster 1955，Winter 2009 表 4.1）。
 *   那是 8 位年長男性大體的平均值，不是任何一個人的數字——這個人偶只是示意。
 *
 *   POSES                    預設姿勢（都是 BASE 加上幾個改掉的數字）
 *   pose(key)                解出來的姿勢：骨盆已經移到「重心的投影落在支撐範圍中央」的位置
 *   lerpPose(a, b, t)        兩個姿勢之間的過渡
 *   joints(P, sway)          關節位置＋著地點；sway＝{ x, z } 整個人往左、往前歪幾度（腳留在原地）
 *   centerOfMass(J)          { com: [x, y, z], parts: [{ key, m, p }] }
 *   analyze(P, sway)         一次算完：{ J, com, parts, base, area, margin, tips, inside }
 *   fallFrom(A)              重心的投影跑出去的時候，從哪裡倒、往哪邊倒：{ pivot: [x, z], dir: [x, z] }
 *   RADII                    各節的粗細（× 身高；figure2d、figure3d 共用，純粹是外觀）
 *   topple(J, pivot, dir, a) 倒下去：所有關節繞著地上的 pivot、朝 dir 轉 a 弧度（不會穿過地板）
 */
import { area, centroid, hull, inside, margin, nearest, tipAngles } from './balance.js';

export const HEIGHT = 1.4;   // 人偶的身高（公尺）——大約是國小高年級學生的身高，只影響畫面上的公分數

export const PROP = {
  ankle: 0.039, knee: 0.285, hip: 0.530, shoulder: 0.818, chin: 0.870,          // 各關節離地的高度
  upperArm: 0.186, forearm: 0.146, hand: 0.108,
  footLen: 0.152, footWid: 0.055, shoulderHalf: 0.1295,                          // 肩寬 0.259 的一半
  hipHalf: 0.085,      // 兩個髖關節中心的距離的一半（Drillis 與 Contini 的 0.191 是大轉子的寬度，關節中心在裡面一點）
  headC: 0.935,        // 頭的中心（下巴 0.870 與頭頂 1.000 的中間）
  headR: 0.066,
  anklePos: 0.25,      // 踝關節在腳跟往前占腳長的比例（人偶的簡化）
  ballPos: 0.72,       // 前腳掌（蹠球）占腳長的比例（人偶的簡化）
};

export const MASS = {
  head:     { m: 0.081 },             // 頭與頸；質心放在頭的中心
  trunk:    { m: 0.497, c: 0.500 },   // 髖到肩
  upperArm: { m: 0.028, c: 0.436 },
  forearm:  { m: 0.016, c: 0.430 },
  hand:     { m: 0.006, c: 0.506 },
  thigh:    { m: 0.100, c: 0.433 },
  shank:    { m: 0.0465, c: 0.433 },
  foot:     { m: 0.0145, c: 0.500 },
};

export const RADII = { head: 0.066, neck: 0.022, chestX: 0.108, chestZ: 0.062, hipX: 0.098, hipZ: 0.062,
  shoulder: 0.036, upperArm: 0.029, elbow: 0.027, forearm: 0.024, wrist: 0.021, hand: 0.026,
  hip: 0.047, thigh: 0.044, knee: 0.037, shank: 0.032, ankle: 0.027, footH: 0.022 };

export const BASE = {
  stance: 0.032,    // 腳踝離身體中線多遠（× 身高）
  stagger: 0,       // 左腳往前、右腳往後各多少（× 身高）
  toeOut: 5,        // 腳尖朝外幾度
  drop: 0,          // 骨盆往下蹲多少（× 身高）
  heel: 0,          // 腳跟抬起（0–1；1＝踮到最高）
  liftR: 0,         // 右腳離地（0–1）
  trunk: 0,         // 上半身往前傾幾度
  armAbdL: 6, armAbdR: 6,       // 手臂往旁邊抬幾度（0＝垂下，90＝平舉）
  armFlexL: 0, armFlexR: 0,     // 手臂往前抬幾度
  elbowL: 8, elbowR: 8,         // 手肘彎幾度
  shiftX: 0, shiftZ: 0,         // 骨盆的水平位置（× 身高）；pose() 會解出來
};

export const POSES = {
  together:   { en: 'Feet together', zh: '雙腳併攏' },
  apart:      { en: 'Feet apart', zh: '雙腳張開', stance: 0.13, toeOut: 12 },
  horse:      { en: 'Horse stance', zh: '馬步', stance: 0.24, toeOut: 22, drop: 0.15, trunk: 6, armFlexL: 28, armFlexR: 28, elbowL: 95, elbowR: 95 },
  oneLeg:     { en: 'On one foot', zh: '單腳站', stance: 0.03, liftR: 1 },
  tiptoe:     { en: 'On tiptoe', zh: '踮腳尖', stance: 0.06, heel: 1 },
  armsOut:    { en: 'Arms out', zh: '張開雙臂', armAbdL: 90, armAbdR: 90, elbowL: 0, elbowR: 0 },
  // 以下只在小互動裡用
  wide:       { en: 'Feet wide, legs straight', zh: '雙腳大大張開、腿打直', stance: 0.24, toeOut: 16 },
  stride:     { en: 'One foot in front', zh: '一腳在前、一腳在後', stance: 0.045, stagger: 0.15, toeOut: 6 },
  tandem:     { en: 'Heel to toe', zh: '腳跟接腳尖', stance: 0.004, stagger: 0.079, toeOut: 0 },
  crouch:     { en: 'Crouching low', zh: '蹲得很低', stance: 0.13, toeOut: 14, drop: 0.24, trunk: 30, armFlexL: 60, armFlexR: 60, elbowL: 20, elbowR: 20 },
  ready:      { en: 'Ready stance', zh: '預備姿勢', stance: 0.19, toeOut: 16, drop: 0.09, trunk: 16, armAbdL: 38, armAbdR: 38, armFlexL: 20, armFlexR: 20, elbowL: 55, elbowR: 55 },
  oneLegArms: { en: 'On one foot, arms out', zh: '單腳站、張開雙臂', stance: 0.03, liftR: 1, armAbdL: 90, armAbdR: 90, elbowL: 0, elbowR: 0 },
};

const KEYS = Object.keys(BASE);
const rad = (d) => (d * Math.PI) / 180;
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const norm = (a) => { const L = len(a) || 1; return [a[0] / L, a[1] / L, a[2] / L]; };
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export function rawPose(key) {
  const out = {};
  for (const k of KEYS) out[k] = POSES[key][k] !== undefined ? POSES[key][k] : BASE[k];
  return out;
}

export function lerpPose(a, b, t) {
  const out = {};
  for (const k of KEYS) out[k] = t >= 1 ? b[k] : a[k] + (b[k] - a[k]) * t;
  return out;
}

/** 兩節骨頭的反向運動學：從 hip 到 ankle，膝蓋往 bend 的方向彎。 */
function knee(hip, ankle, L1, L2, bend) {
  const v = sub(ankle, hip);
  const d = Math.min(len(v), (L1 + L2) * 0.9995);
  const u = norm(v);
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
  const n = norm(sub(bend, mul(u, dot(bend, u))));
  return add(add(hip, mul(u, a)), mul(n, h));
}

export function joints(P, sway = { x: 0, z: 0 }) {
  const H = HEIGHT, J = {};
  const L = PROP.footLen * H, W = PROP.footWid * H, aH = PROP.ankle * H;
  const thigh = (PROP.hip - PROP.knee) * H, shank = (PROP.knee - PROP.ankle) * H;
  const contacts = [];
  const footDir = {};
  let supY = 0, supW = 0;

  // 腳：先放著地的腳
  for (const side of ['L', 'R']) {
    const s = side === 'L' ? 1 : -1;
    const yaw = rad(P.toeOut) * s;
    const f = [Math.sin(yaw), 0, Math.cos(yaw)];        // 腳尖的方向
    const lat = [Math.cos(yaw), 0, -Math.sin(yaw)];     // 腳的左邊
    footDir[side] = { f, lat };
    const a0 = [s * P.stance * H, 0, s * P.stagger * H];
    const ball = add(a0, mul(f, (PROP.ballPos - PROP.anklePos) * L));
    const p = rad(35) * P.heel;                         // 腳跟抬起的角度
    const ba = (PROP.ballPos - PROP.anklePos) * L, ah = PROP.anklePos * L;
    const ankle = add(ball, add(mul(f, -ba * Math.cos(p) + aH * Math.sin(p)), [0, ba * Math.sin(p) + aH * Math.cos(p), 0]));
    const heel = add(ankle, add(mul(f, -ah * Math.cos(p) - aH * Math.sin(p)), [0, ah * Math.sin(p) - aH * Math.cos(p), 0]));
    const toe = add(ball, mul(f, (1 - PROP.ballPos) * L));
    J['ankle' + side] = ankle; J['heel' + side] = heel; J['ball' + side] = ball; J['toe' + side] = toe;
    const lift = side === 'R' ? P.liftR : 0;
    supY += ankle[1] * (1 - lift); supW += 1 - lift;
  }
  const ankleY = supW > 0 ? supY / supW : aH;

  // 骨盆：整個人像一根桿子繞著腳踝歪（sway），腳留在原地
  const hLeg = (PROP.hip - PROP.ankle - P.drop) * H;
  const sx = rad(sway.x || 0), sz = rad(sway.z || 0);
  const mag = Math.min(1.2, Math.hypot(sx, sz));
  const pelvis = [P.shiftX * H + hLeg * Math.tan(sx), ankleY + hLeg * Math.cos(mag), P.shiftZ * H + hLeg * Math.tan(sz)];
  const a = rad(P.trunk) + sz, phi = sx;
  const tr = (v) => {                                    // 上半身的座標 → 世界：先往前傾 a，再往左歪 phi
    const y1 = v[1] * Math.cos(a) - v[2] * Math.sin(a), z1 = v[1] * Math.sin(a) + v[2] * Math.cos(a);
    return [v[0] * Math.cos(phi) + y1 * Math.sin(phi), -v[0] * Math.sin(phi) + y1 * Math.cos(phi), z1];
  };
  const pv = (v) => [v[0] * Math.cos(phi), -v[0] * Math.sin(phi), 0];   // 骨盆只跟著左右歪
  const hipOff = { L: pv([PROP.hipHalf * H, 0, 0]), R: pv([-PROP.hipHalf * H, 0, 0]) };

  // 腿伸不到的時候骨盆往下降（雙腳張很開、或歪得很多）
  for (let i = 0; i < 12; i++) {
    let over = 0;
    for (const side of ['L', 'R']) {
      if (side === 'R' && P.liftR > 0.5) continue;
      const d = len(sub(J['ankle' + side], add(pelvis, hipOff[side])));
      over = Math.max(over, d - (thigh + shank) * 0.999);
    }
    if (over <= 0) break;
    pelvis[1] -= over * 1.15 + 0.0005;
  }
  J.pelvis = pelvis;
  J.hipL = add(pelvis, hipOff.L); J.hipR = add(pelvis, hipOff.R);

  // 抬起來的右腳：膝蓋往前抬、小腿垂下來（從正面也看得出來腳離地了）
  if (P.liftR > 0) {
    const t = P.liftR, { f } = footDir.R;
    const up = add(J.hipR, [-0.005 * H, -0.3 * H, 0.12 * H]);
    const ankle = mix(J.ankleR, up, t);
    const p = rad(35) * P.heel * (1 - t) + rad(28) * t;
    const ba = (PROP.ballPos - PROP.anklePos) * L, ah = PROP.anklePos * L;
    const rot = (x, y) => add(mul(f, x * Math.cos(p) + y * Math.sin(p)), [0, -x * Math.sin(p) + y * Math.cos(p), 0]);
    J.ankleR = ankle;
    J.ballR = add(ankle, rot(ba, -aH));
    J.heelR = add(ankle, rot(-ah, -aH));
    J.toeR = add(J.ballR, rot((1 - PROP.ballPos) * L, 0));
  }

  // 著地點：腳跟（窄）、前腳掌（最寬）、腳尖；腳跟抬起來就只剩前腳掌到腳尖
  for (const side of ['L', 'R']) {
    if (side === 'R' && P.liftR > 0.03) continue;
    const { lat } = footDir[side];
    const pts = [[J['ball' + side], 0.5], [J['toe' + side], 0.36]];
    if (P.heel < 0.12) pts.push([J['heel' + side], 0.32]);
    for (const [c, k] of pts) {
      contacts.push([c[0] + lat[0] * W * k, c[2] + lat[2] * W * k]);
      contacts.push([c[0] - lat[0] * W * k, c[2] - lat[2] * W * k]);
    }
  }

  J.kneeL = knee(J.hipL, J.ankleL, thigh, shank, footDir.L.f);
  J.kneeR = knee(J.hipR, J.ankleR, thigh, shank, footDir.R.f);

  const trunkLen = (PROP.shoulder - PROP.hip) * H;
  J.chest = add(pelvis, tr([0, trunkLen, 0]));
  J.head = add(pelvis, tr([0, (PROP.headC - PROP.hip) * H, 0]));
  J.nose = add(J.head, tr([0, 0, PROP.headR * H]));
  for (const side of ['L', 'R']) {
    const s = side === 'L' ? 1 : -1;
    const sh = add(J.chest, tr([s * PROP.shoulderHalf * H, 0, 0]));
    const th = rad(P['armAbd' + side]), fl = rad(P['armFlex' + side]), e = rad(P['elbow' + side]);
    const d = [s * Math.cos(fl) * Math.sin(th), -Math.cos(fl) * Math.cos(th), Math.sin(fl)];
    const fu = norm([0, 0.3, 1]);
    const n = norm(sub(fu, mul(d, dot(fu, d))));
    const fd = add(mul(d, Math.cos(e)), mul(n, Math.sin(e)));
    const el = add(sh, tr(mul(d, PROP.upperArm * H)));
    const wr = add(el, tr(mul(fd, PROP.forearm * H)));
    J['shoulder' + side] = sh; J['elbow' + side] = el; J['wrist' + side] = wr;
    J['hand' + side] = add(wr, tr(mul(fd, PROP.hand * H)));
  }
  J.contacts = contacts;
  J.footDir = footDir;
  return J;
}

export function centerOfMass(J) {
  const parts = [];
  const seg = (key, m, a, b, c) => parts.push({ key, m, p: mix(a, b, c) });
  parts.push({ key: 'head', m: MASS.head.m, p: J.head });
  seg('trunk', MASS.trunk.m, J.pelvis, J.chest, MASS.trunk.c);
  for (const s of ['L', 'R']) {
    seg('upperArm' + s, MASS.upperArm.m, J['shoulder' + s], J['elbow' + s], MASS.upperArm.c);
    seg('forearm' + s, MASS.forearm.m, J['elbow' + s], J['wrist' + s], MASS.forearm.c);
    seg('hand' + s, MASS.hand.m, J['wrist' + s], J['hand' + s], MASS.hand.c);
    seg('thigh' + s, MASS.thigh.m, J['hip' + s], J['knee' + s], MASS.thigh.c);
    seg('shank' + s, MASS.shank.m, J['knee' + s], J['ankle' + s], MASS.shank.c);
    seg('foot' + s, MASS.foot.m, J['ankle' + s], J['ball' + s], MASS.foot.c);
  }
  let M = 0; const c = [0, 0, 0];
  for (const q of parts) { M += q.m; c[0] += q.p[0] * q.m; c[1] += q.p[1] * q.m; c[2] += q.p[2] * q.m; }
  return { com: [c[0] / M, c[1] / M, c[2] / M], parts, total: M };
}

export function analyze(P, sway) {
  const J = joints(P, sway);
  const { com, parts } = centerOfMass(J);
  const base = hull(J.contacts);
  const g = [com[0], com[2]];
  return { J, com, parts, base, area: area(base), margin: margin(base, g), tips: tipAngles(base, com), inside: inside(base, g) };
}

/** 把骨盆移到「重心的投影落在支撐範圍的中央」——站得住的人都是這樣站的。 */
export function settle(P0) {
  const P = { ...P0 };
  for (let i = 0; i < 6; i++) {
    const A = analyze(P);
    const c = centroid(A.base);
    P.shiftX += (c[0] - A.com[0]) / HEIGHT;
    P.shiftZ += (c[1] - A.com[2]) / HEIGHT;
  }
  return P;
}

const cache = {};
export function pose(key) {
  if (!cache[key]) cache[key] = settle(rawPose(key));
  return { ...cache[key] };
}

export function fallFrom(A) {
  const g = [A.com[0], A.com[2]];
  const n = nearest(A.base, g);
  let dir = n.normal;
  if (!A.inside && n.dist > 1e-5) dir = [(g[0] - n.point[0]) / n.dist, (g[1] - n.point[1]) / n.dist];
  return { pivot: n.point, dir };
}

const SKIP = { contacts: 1, footDir: 1 };
export function topple(J, pivot, dir, ang, floor = 0.035) {
  const L = Math.hypot(dir[0], dir[1]) || 1, dx = dir[0] / L, dz = dir[1] / L;
  const c = Math.cos(ang), s = Math.sin(ang);
  const out = { contacts: J.contacts, footDir: J.footDir };
  for (const k of Object.keys(J)) {
    if (SKIP[k]) continue;
    const p = J[k];
    const rx = p[0] - pivot[0], rz = p[2] - pivot[1];
    const along = rx * dx + rz * dz, side = -rx * dz + rz * dx;
    const a2 = along * c + p[1] * s, y2 = Math.max(floor, -along * s + p[1] * c);
    out[k] = [pivot[0] + a2 * dx - side * dz, y2, pivot[1] + a2 * dz + side * dx];
  }
  return out;
}
