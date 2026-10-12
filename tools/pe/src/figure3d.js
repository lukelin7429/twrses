/*
 * 體育 Sports and Movement · 三維人偶（每一課共用）。像畫室裡的木頭人偶：一節一節的圓柱、關節是圓球，
 * 不分性別、沒有臉，只有鼻子的小凸點讓人看得出它面對哪一邊。
 *
 *   makeFigure()           → { group, set(J) }        J＝body.js 的 joints()（或 topple() 之後的）
 *   makeMarks()            → { group, set(A, opt) }   地上的支撐範圍、重心、鉛垂線、重心的投影、各節的質量點
 *                             opt＝{ ok, masses }
 *   makeFloor()            → Group                     深色的地板＋一塊有格線的墊子（一格 20 公分）
 */
import {
  BufferAttribute, BufferGeometry, CanvasTexture, CircleGeometry, CylinderGeometry, DoubleSide, Group, Line, LineBasicMaterial,
  LineDashedMaterial, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Quaternion, RingGeometry, SphereGeometry, SRGBColorSpace, Vector3,
} from 'three';
import { HEIGHT, MASS, RADII } from './body.js';

const H = HEIGHT;
const UP = new Vector3(0, 1, 0);
const va = new Vector3(), vb = new Vector3(), vc = new Vector3(), vd = new Vector3();
const q = new Quaternion(), m4 = new Matrix4();

export function makeFigure() {
  const group = new Group();
  const wood = new MeshStandardMaterial({ color: 0xecd2a6, roughness: 0.62 });
  const joint = new MeshStandardMaterial({ color: 0xc79a62, roughness: 0.55 });
  const sole = new MeshStandardMaterial({ color: 0xa87c4c, roughness: 0.7 });
  const sph = new SphereGeometry(1, 28, 20);
  const meshes = [];
  const add = (geo, mat) => { const m = new Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; group.add(m); meshes.push(m); return m; };

  // 圓柱形的肢段：[近端, 遠端, 近端半徑, 遠端半徑]
  const LIMBS = [];
  for (const s of ['L', 'R']) {
    LIMBS.push(['hip' + s, 'knee' + s, RADII.thigh, RADII.knee * 0.92], ['knee' + s, 'ankle' + s, RADII.shank, RADII.ankle * 0.9],
      ['shoulder' + s, 'elbow' + s, RADII.upperArm, RADII.elbow * 0.9], ['elbow' + s, 'wrist' + s, RADII.forearm, RADII.wrist * 0.9]);
  }
  LIMBS.push(['chest', 'head', RADII.neck, RADII.neck]);
  const limbs = LIMBS.map(([a, b, ra, rb]) => ({ a, b, mesh: add(new CylinderGeometry(rb * H, ra * H, 1, 20), wood) }));

  // 關節的圓球
  const BALLS = [['head', RADII.head, wood], ['nose', 0.013, joint]];
  for (const s of ['L', 'R']) {
    BALLS.push(['shoulder' + s, RADII.shoulder, joint], ['elbow' + s, RADII.elbow, joint], ['wrist' + s, RADII.wrist, joint],
      ['hip' + s, RADII.hip, joint], ['knee' + s, RADII.knee, joint], ['ankle' + s, RADII.ankle, joint]);
  }
  const balls = BALLS.map(([k, r, mat]) => { const m = add(sph, mat); m.scale.setScalar(r * H); return { k, mesh: m }; });

  // 軀幹：胸（上寬）到腰（下窄）的扁圓柱＋上下各一個扁球
  const torso = add(new CylinderGeometry(1, 0.84, 1, 28), wood);
  const chestCap = add(sph, wood), hipCap = add(sph, wood);
  // 手掌、腳（後半、腳趾）：扁的橢圓球
  const hands = ['L', 'R'].map((s) => ({ s, mesh: add(sph, wood) }));
  const feet = ['L', 'R'].map((s) => ({ s, rear: add(sph, sole), toe: add(sph, sole) }));

  function place(mesh, a, b) {
    va.fromArray(a); vb.fromArray(b);
    vc.subVectors(vb, va);
    const L = vc.length() || 1e-6;
    mesh.position.addVectors(va, vb).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(UP, vc.divideScalar(L));
    mesh.scale.set(1, L, 1);
  }
  /** 橢圓球：中心 c、三個軸（單位向量）與半徑 */
  function blob(mesh, c, x, y, z, rx, ry, rz) {
    m4.makeBasis(x, y, z);
    mesh.quaternion.setFromRotationMatrix(m4);
    mesh.position.copy(c);
    mesh.scale.set(rx, ry, rz);
  }
  const X = new Vector3(), Y = new Vector3(), Z = new Vector3(), C = new Vector3();

  function set(J) {
    for (const l of limbs) place(l.mesh, J[l.a], J[l.b]);
    for (const b of balls) b.mesh.position.fromArray(J[b.k]);
    // 軀幹的方向：X＝右肩 → 左肩、Y＝骨盆 → 胸、Z＝往前
    X.fromArray(J.shoulderL).sub(va.fromArray(J.shoulderR)).normalize();
    Y.fromArray(J.chest).sub(va.fromArray(J.pelvis));
    const tl = Y.length(); Y.normalize();
    Z.crossVectors(X, Y).normalize(); X.crossVectors(Y, Z).normalize();
    C.fromArray(J.pelvis).addScaledVector(Y, tl * 0.5);
    blob(torso, C, X, Y, Z, RADII.chestX * H, tl * 0.96, RADII.chestZ * H);
    C.fromArray(J.chest).addScaledVector(Y, -tl * 0.02);
    blob(chestCap, C, X, Y, Z, RADII.chestX * H, 0.05 * H, RADII.chestZ * H);
    // 骨盆只跟著左右歪
    vb.fromArray(J.hipL).sub(va.fromArray(J.hipR)).normalize();
    vd.crossVectors(vb, Y).normalize(); vc.crossVectors(vd, vb).normalize();
    C.fromArray(J.pelvis);
    blob(hipCap, C, vb, vc, vd, RADII.hipX * H, 0.055 * H, RADII.hipZ * H);
    for (const h of hands) {
      va.fromArray(J['wrist' + h.s]); vb.fromArray(J['hand' + h.s]);
      Y.subVectors(vb, va); const L = Y.length() || 1e-6; Y.divideScalar(L);
      Z.crossVectors(X.fromArray(J.shoulderL).sub(vc.fromArray(J.shoulderR)).normalize(), Y);
      if (Z.lengthSq() < 1e-6) Z.set(0, 0, 1); Z.normalize(); X.crossVectors(Y, Z).normalize();
      C.addVectors(va, vb).multiplyScalar(0.5);
      blob(h.mesh, C, X, Y, Z, RADII.hand * 0.55 * H, L * 0.56, RADII.hand * H);
    }
    for (const f of feet) {
      const lat = J.footDir[f.s].lat, th = RADII.footH * H, w = 0.0275 * H;
      const part = (mesh, a, b, wk, over) => {
        va.fromArray(a); vb.fromArray(b);
        Z.subVectors(vb, va); const L = Z.length() || 1e-6; Z.divideScalar(L);
        X.set(lat[0], lat[1], lat[2]); Y.crossVectors(Z, X).normalize(); X.crossVectors(Y, Z).normalize();
        C.addVectors(va, vb).multiplyScalar(0.5).addScaledVector(Y, th);
        blob(mesh, C, X, Y, Z, w * wk, th, L * 0.5 * over);
      };
      part(f.rear, J['heel' + f.s], J['ball' + f.s], 1.0, 1.16);
      part(f.toe, J['ball' + f.s], J['toe' + f.s], 0.92, 1.5);
    }
  }
  return { group, set, meshes };
}

const MAXV = 24;
export function makeMarks() {
  const group = new Group();
  // 支撐範圍：扇形三角形＋外框
  const pos = new Float32Array(MAXV * 3), idx = [];
  for (let i = 1; i < MAXV - 1; i++) idx.push(0, i + 1, i);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3)); geo.setIndex(idx);
  const fillMat = new MeshBasicMaterial({ color: 0x43c98a, transparent: true, opacity: 0.38, side: DoubleSide, depthWrite: false });
  const fill = new Mesh(geo, fillMat); fill.renderOrder = 2; group.add(fill);
  const lpos = new Float32Array((MAXV + 1) * 3);
  const lgeo = new BufferGeometry(); lgeo.setAttribute('position', new BufferAttribute(lpos, 3));
  const lineMat = new LineBasicMaterial({ color: 0x7dffb9, transparent: true, depthWrite: false });
  const outline = new Line(lgeo, lineMat); outline.renderOrder = 3; group.add(outline);

  const gold = new MeshBasicMaterial({ color: 0xffd36e, depthTest: false, transparent: true });
  const cog = new Mesh(new SphereGeometry(0.034, 24, 16), gold); cog.renderOrder = 20; group.add(cog);
  const halo = new Mesh(new RingGeometry(0.044, 0.054, 40), new MeshBasicMaterial({ color: 0x1b1405, depthTest: false, transparent: true, side: DoubleSide }));
  halo.renderOrder = 19; group.add(halo);
  const pgeo = new BufferGeometry(); pgeo.setAttribute('position', new BufferAttribute(new Float32Array(6), 3));
  const plumb = new Line(pgeo, new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.04, gapSize: 0.03, depthTest: false, transparent: true }));
  plumb.renderOrder = 18; group.add(plumb);
  const dot = new Mesh(new CircleGeometry(0.032, 32), new MeshBasicMaterial({ color: 0xffd36e, depthTest: false, transparent: true }));
  dot.rotation.x = -Math.PI / 2; dot.renderOrder = 21; group.add(dot);
  const ring = new Mesh(new RingGeometry(0.04, 0.052, 40), new MeshBasicMaterial({ color: 0x1b1405, depthTest: false, transparent: true, side: DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.renderOrder = 20; group.add(ring);

  // 各節的質量點：體積和質量成正比（半徑 ∝ 質量的立方根）
  const massMat = new MeshBasicMaterial({ color: 0x7cc4ff, depthTest: false, transparent: true, opacity: 0.9 });
  const sg = new SphereGeometry(1, 16, 12);
  const masses = [];
  const order = ['head', 'trunk'];
  for (const s of ['L', 'R']) for (const k of ['upperArm', 'forearm', 'hand', 'thigh', 'shank', 'foot']) order.push(k + s);
  for (const k of order) {
    const m = new Mesh(sg, massMat); m.renderOrder = 15;
    m.scale.setScalar(0.085 * Math.cbrt(MASS[k.replace(/[LR]$/, '')].m));
    m.visible = false; group.add(m); masses.push(m);
  }

  function set(A, opt = {}) {
    const b = A.base, n = Math.min(b.length, MAXV);
    for (let i = 0; i < n; i++) { pos[i * 3] = b[i][0]; pos[i * 3 + 1] = 0.006; pos[i * 3 + 2] = b[i][1]; lpos[i * 3] = b[i][0]; lpos[i * 3 + 1] = 0.008; lpos[i * 3 + 2] = b[i][1]; }
    if (n) { lpos[n * 3] = b[0][0]; lpos[n * 3 + 1] = 0.008; lpos[n * 3 + 2] = b[0][1]; }
    geo.attributes.position.needsUpdate = true; geo.setDrawRange(0, Math.max(0, (n - 2) * 3));
    lgeo.attributes.position.needsUpdate = true; lgeo.setDrawRange(0, n ? n + 1 : 0);
    // 從正上方看的時候，支撐底面畫在最上層（不然會被身體擋住）
    fillMat.depthTest = lineMat.depthTest = !opt.onTop;
    const ok = opt.ok !== false;
    fillMat.color.setHex(ok ? 0x43c98a : 0xff6b5c); lineMat.color.setHex(ok ? 0x7dffb9 : 0xffb0a6);
    const c = opt.com || A.com;
    cog.position.set(c[0], c[1], c[2]); halo.position.copy(cog.position);
    if (opt.camera) halo.quaternion.copy(opt.camera.quaternion);
    const pp = pgeo.attributes.position.array;
    pp[0] = c[0]; pp[1] = c[1]; pp[2] = c[2]; pp[3] = c[0]; pp[4] = 0.012; pp[5] = c[2];
    pgeo.attributes.position.needsUpdate = true; plumb.computeLineDistances();
    dot.position.set(c[0], 0.014, c[2]); ring.position.set(c[0], 0.013, c[2]);
    const parts = opt.parts || A.parts;
    for (let i = 0; i < masses.length; i++) {
      masses[i].visible = !!opt.masses;
      if (opt.masses && parts[i]) masses[i].position.fromArray(parts[i].p);
    }
  }
  return { group, set, cog, dot };
}

export function makeFloor() {
  const g = new Group();
  const floor = new Mesh(new CircleGeometry(60, 64), new MeshStandardMaterial({ color: 0x101a33, roughness: 0.95 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -0.004; floor.receiveShadow = true; g.add(floor);
  // 墊子：3.2 公尺見方，一格 20 公分，每一公尺一條粗線
  const S = 1024, c = document.createElement('canvas'); c.width = c.height = S;
  const x = c.getContext('2d');
  x.fillStyle = '#1f3f73'; x.fillRect(0, 0, S, S);
  const cells = 16, step = S / cells;
  for (let i = 0; i <= cells; i++) {
    const major = i % 5 === 3;   // 中線兩側各一公尺
    x.strokeStyle = i === cells / 2 ? 'rgba(255,255,255,.34)' : major ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.09)';
    x.lineWidth = i === cells / 2 ? 3 : 2;
    x.beginPath(); x.moveTo(i * step, 0); x.lineTo(i * step, S); x.stroke();
    x.beginPath(); x.moveTo(0, i * step); x.lineTo(S, i * step); x.stroke();
  }
  x.strokeStyle = 'rgba(255,211,110,.55)'; x.lineWidth = 10; x.strokeRect(5, 5, S - 10, S - 10);
  const tex = new CanvasTexture(c); tex.colorSpace = SRGBColorSpace; tex.anisotropy = 8;
  const mat = new Mesh(new CircleGeometry(1, 4), new MeshStandardMaterial({ map: tex, roughness: 0.9 }));
  mat.geometry.dispose();
  const quad = new BufferGeometry();
  const h = 1.6;
  quad.setAttribute('position', new BufferAttribute(new Float32Array([-h, 0, h, h, 0, h, h, 0, -h, -h, 0, -h]), 3));
  quad.setAttribute('normal', new BufferAttribute(new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]), 3));
  quad.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
  quad.setIndex([0, 1, 2, 0, 2, 3]);
  mat.geometry = quad; mat.receiveShadow = true; g.add(mat);
  return g;
}
