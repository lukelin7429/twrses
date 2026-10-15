/*
 * 地理 Geography · 立體地形引擎（3D；每一課的地形都用這一支，只換高度函式）。
 *
 *   const t = makeTerrain({ M, n, exag })   M 是 terrain.js 的地形（h(x, y)、box）；n 是網格的格數；exag 是高度的放大倍數
 *   t.group                                  加進場景；世界座標：x＝東（公里）、z＝−北（公里）、y＝海拔（公里 × exag）
 *   t.toWorld(x, y, z)                       公里、公里、公尺 → 世界座標
 *   t.fromWorld(v)                           世界座標 → [x, y]（公里）
 *   t.mesh                                   給 Raycaster 用
 *   t.setWater(m)                            水面高度（公尺）；0 就是海平面
 *   t.setContours(levels, current)           畫這些高度的等高線（金色的細帶子，比 1 像素的線清楚），current 那一條畫成白色
 *   t.show('water' | 'lines' | 'skirt', on)
 *   t.grid                                   取樣後的網格（terrain.js 的 contour 可以直接用）
 *
 * 地表用分層設色（contourmap2d.js 的 hypso），四周有一圈「土的側面」，看起來像一塊立體模型。
 */
import {
  BufferAttribute, BufferGeometry, Color, DoubleSide, Group, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  PlaneGeometry, Sphere, Vector3,
} from 'three';
import { contour, sampleGrid } from './terrain.js';
import { hypso } from './contourmap2d.js';

export function makeTerrain({ M, n = 160, exag = 1.5 } = {}) {
  const [x0, y0, x1, y1] = M.box;
  const k = exag / 1000;
  const toWorld = (x, y, z) => new Vector3(x, z * k, -y);
  const fromWorld = (v) => [v.x, -v.z];
  const group = new Group();
  const grid = sampleGrid(M.h, M.box, n + 1);

  // ── 地表 ──
  const geo = new PlaneGeometry(x1 - x0, y1 - y0, n, n);
  geo.rotateX(-Math.PI / 2);   // 平面躺下來：原本的 +y（上）變成 −z（北）
  const pos = geo.getAttribute('position'), col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + (x0 + x1) / 2, y = -pos.getZ(i) + (y0 + y1) / 2, z = M.h(x, y);
    pos.setXYZ(i, x, Math.max(z, -80) * k, -y);
    const c = z < 0 ? [70, 110, 150] : hypso(z);
    col[3 * i] = c[0] / 255; col[3 * i + 1] = c[1] / 255; col[3 * i + 2] = c[2] / 255;
  }
  geo.setAttribute('color', new BufferAttribute(col, 3));
  geo.computeVertexNormals();
  geo.boundingSphere = new Sphere(new Vector3(), 10);
  const mesh = new Mesh(geo, new MeshLambertMaterial({ vertexColors: true }));
  group.add(mesh);

  // ── 四周的側面（土色） ──
  const bottom = -0.35;
  const skirtPos = [], skirtIdx = [];
  const edge = (pts) => {
    const base = skirtPos.length / 3;
    pts.forEach(([x, y]) => { const z = Math.max(M.h(x, y), -80) * k; skirtPos.push(x, z, -y, x, bottom, -y); });
    for (let i = 0; i + 1 < pts.length; i++) { const a = base + 2 * i; skirtIdx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  };
  const N = 80, line = (ax, ay, bx, by) => Array.from({ length: N + 1 }, (_, i) => [ax + (bx - ax) * i / N, ay + (by - ay) * i / N]);
  edge(line(x0, y0, x1, y0)); edge(line(x1, y0, x1, y1)); edge(line(x1, y1, x0, y1)); edge(line(x0, y1, x0, y0));
  const sg = new BufferGeometry();
  sg.setAttribute('position', new BufferAttribute(new Float32Array(skirtPos), 3)); sg.setIndex(skirtIdx);
  const skirt = new Mesh(sg, new MeshBasicMaterial({ color: 0x6b4a2f, side: DoubleSide }));
  group.add(skirt);

  // ── 水面 ──
  const water = new Mesh(new PlaneGeometry(x1 - x0, y1 - y0), new MeshBasicMaterial({ color: 0x3f8fe0, transparent: true, opacity: 0.42, depthWrite: false, side: DoubleSide }));
  water.rotateX(-Math.PI / 2);
  water.renderOrder = 2;
  group.add(water);
  // 水的側面（看起來像一缸水）
  const wsideGeo = new BufferGeometry(); wsideGeo.setAttribute('position', new BufferAttribute(new Float32Array(4 * 6 * 3), 3));
  const wside = new Mesh(wsideGeo, new MeshBasicMaterial({ color: 0x2f6fb5, transparent: true, opacity: 0.35, depthWrite: false, side: DoubleSide }));
  group.add(wside);
  function setWater(m) {
    const y = m * k;
    water.position.y = y;
    const c = [[x0, -y0], [x1, -y0], [x1, -y1], [x0, -y1]], a = wsideGeo.getAttribute('position');
    for (let s = 0; s < 4; s++) {
      const [ax, az] = c[s], [bx, bz] = c[(s + 1) % 4], o = s * 6;
      const v = [[ax, bottom, az], [bx, bottom, bz], [bx, y, bz], [ax, bottom, az], [bx, y, bz], [ax, y, az]];
      v.forEach((p, i) => a.setXYZ(o + i, p[0], p[1], p[2]));
    }
    a.needsUpdate = true; wsideGeo.computeBoundingSphere();
  }
  setWater(0);

  // ── 等高線：畫成貼著那個高度的細帶子（WebGL 的線只有 1 像素寬，從遠處看不清楚） ──
  const W = 0.032;
  const lineMat = new MeshBasicMaterial({ color: 0xffd36e, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  const curMat = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  const lines = new Group(); group.add(lines);
  const cache = new Map();
  const ribbonFor = (L) => {
    let g = cache.get(L);
    if (!g) {
      const pos = [], idx = [], y = L * k + 0.012;
      for (const l of contour(grid, L)) for (let i = 0; i + 1 < l.length; i++) {
        const [ax, ay] = l[i], [bx, by] = l[i + 1];
        const dx = bx - ax, dz = -(by - ay), len = Math.hypot(dx, dz) || 1, nx = -dz / len * W / 2, nz = dx / len * W / 2;
        const o = pos.length / 3;
        pos.push(ax + nx, y, -ay + nz, ax - nx, y, -ay - nz, bx + nx, y, -by + nz, bx - nx, y, -by - nz);
        idx.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);
      }
      g = new BufferGeometry();
      g.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3)); g.setIndex(idx);
      g.boundingSphere = new Sphere(new Vector3(), 10);
      cache.set(L, g);
    }
    return g;
  };
  function setContours(levels, current) {
    lines.clear();
    for (const L of levels) {
      const o = new Mesh(ribbonFor(L), L === current ? curMat : lineMat); o.renderOrder = 3;
      lines.add(o);
    }
  }

  return {
    group, mesh, grid, toWorld, fromWorld, setWater, setContours, k,
    show(key, on) { ({ water: [water, wside], lines: [lines], skirt: [skirt] })[key].forEach((o) => { o.visible = on; }); },
    heightAt: (x, y) => M.h(x, y),
  };
}

export { Color };
