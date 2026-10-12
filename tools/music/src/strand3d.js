/*
 * 音樂 Music · 3D 共用：會彎的細管（makeStrand）與半透明的振幅包絡（makeEnvelope）。第二課起的 3D 用這裡的（第一課 mus-string.js 自己一份）。
 */
import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';

/** 一條會彎的線：n 段、每圈 5 個頂點的細管（位置每格重算） */
export function makeStrand(n, radius, color) {
  const ring = 5, rows = n + 1;
  const pos = new Float32Array(rows * ring * 3);
  const idx = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < ring; k++) {
      const a = i * ring + k, b = i * ring + (k + 1) % ring, c = (i + 1) * ring + k, d = (i + 1) * ring + (k + 1) % ring;
      idx.push(a, c, b, b, c, d);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setIndex(idx);
  const m = new Mesh(g, new MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.7, emissive: color, emissiveIntensity: 0.12 }));
  m.castShadow = true; m.frustumCulled = false;
  const cs = [], sn = [];
  for (let k = 0; k < ring; k++) { cs.push(Math.cos((k / ring) * Math.PI * 2) * radius); sn.push(Math.sin((k / ring) * Math.PI * 2) * radius); }
  m.userData.set = (fn) => {   // fn(i, t) → [x, y]
    for (let i = 0; i < rows; i++) {
      const [x, y] = fn(i, i / n);
      for (let k = 0; k < ring; k++) { const o = (i * ring + k) * 3; pos[o] = x; pos[o + 1] = y + cs[k]; pos[o + 2] = sn[k]; }
    }
    g.attributes.position.needsUpdate = true;
    g.computeVertexNormals();
  };
  return m;
}

/** 半透明的「振幅包絡」：弦振動時眼睛看到的那個梭形 */
export function makeEnvelope(n, color) {
  const rows = n + 1;
  const pos = new Float32Array(rows * 2 * 3);
  const idx = [];
  for (let i = 0; i < n; i++) { const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1; idx.push(a, b, c, b, d, c); }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setIndex(idx);
  const m = new Mesh(g, new MeshBasicMaterial({ color, transparent: true, opacity: 0.34, side: DoubleSide, depthWrite: false }));
  m.frustumCulled = false;
  m.userData.set = (fn) => {   // fn(i, t) → [x, y, half]
    for (let i = 0; i < rows; i++) {
      const [x, y, h] = fn(i, i / n);
      pos.set([x, y + h, 0, x, y - h, 0], i * 6);
    }
    g.attributes.position.needsUpdate = true;
  };
  return m;
}

