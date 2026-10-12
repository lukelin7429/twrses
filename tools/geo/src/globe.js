/*
 * 地理 Geography · 地球儀引擎（每課共用）：一顆可以連續攤平成地圖的 3D 地球。
 *
 * 做法：地球表面是一張「經緯度格子」的網格，貼圖是一張等距圓柱的 canvas（陸地畫在上面，之後的課可以疊主題圖層）。
 * 每個頂點記的是經緯度，位置每次重算：
 *     位置 = unroll(經度, 緯度, 1 − t) ＋ t ×（選定投影的平面座標 − 等距圓柱的平面座標）
 * t = 0 是球，t = 1 是選定投影的平面地圖（落在 z = 0、面向 +z）。換投影時在兩種平面座標之間內插（u）。
 * 網格照經度切成 12 瓣（每瓣自己的頂點），平常瓣與瓣的邊緣重合；「橘子皮」投影時才會裂開。
 * 經緯線、變形圓、選取的緯線都是同一套「點集合」（PointSet），跟著同一個公式變形。
 *
 *   const globe = makeGlobe({ land, texWidth })
 *   globe.group                       加進場景
 *   globe.setFlat(t)／setProjection(name, immediate)／tick(dt)／update()
 *   globe.show('graticule' | 'meridians' | 'parallels' | 'circles' | 'select' | 'selectLine' | 'selectDot' | 'equator' | 'marks', on)
 *   globe.addPath(color, opacity) → { obj, set([[lon, lat], …]) }   自訂的線（某條經線、本初子午線、航線）
 *   globe.setOpacity(a, frontOnly)    地表透明度（看地球內部時用；frontOnly 只畫朝向鏡頭的那一面）
 *   globe.setSelection(lon, lat)      選一個點：畫出那條緯線和那個位置的變形圓
 *   globe.pointAt(lon, lat, out, eps) 目前形狀下那個經緯度的位置（標籤用）；globe.normalAt(lon, lat, out)
 *   globe.addLayer({ key, on, draw(ctx, W, H, toXY) })／setLayer(key, on)   主題圖層（畫在貼圖上）
 *   globe.mesh                        給 Raycaster 用；intersect.uv → globe.uvToLonLat(uv)
 */
import {
  BufferAttribute, BufferGeometry, CanvasTexture, DoubleSide, FrontSide, Group, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial,
  MeshLambertMaterial, Sphere, SRGBColorSpace, Vector3,
} from 'three';
import { RAD, forward, goreOf, smallCircle } from './geo.js';
import { COLORS, drawLand } from './map2d.js';

export const GORES = 12;

class PointSet {
  constructor(n) {
    this.n = n;
    this.lon = new Float32Array(n); this.lat = new Float32Array(n); this.gore = new Int8Array(n);
    this.cache = {};
    this.count = 0;
  }
  push(lon, lat, gore) {
    const i = this.count++;
    this.lon[i] = lon; this.lat[i] = lat; this.gore[i] = gore != null ? gore : goreOf(lon, GORES).g;
    return i;
  }
  plane(proj) {
    let c = this.cache[proj];
    if (!c) {
      c = this.cache[proj] = new Float32Array(this.count * 2);
      const o = { gore: 0, n: GORES };
      for (let i = 0; i < this.count; i++) {
        o.gore = this.gore[i];
        const p = forward(proj, this.lon[i], this.lat[i], o);
        c[2 * i] = p[0]; c[2 * i + 1] = p[1];
      }
    }
    return c;
  }
  reset() { this.count = 0; this.cache = {}; }
  /** 寫進 position（和 normal）；eps：沿法線浮起來一點，避免和地表互相穿插 */
  write(pos, nor, t, pa, pb, u, eps = 0) {
    const A = this.plane(pa), B = pa === pb || u <= 0 ? A : this.plane(pb);
    const s = 1 - t, flat = s < 1e-4, r = flat ? 0 : 1 / s;
    for (let i = 0; i < this.count; i++) {
      const l = this.lon[i] * RAD, p = this.lat[i] * RAD;
      let x, y, z, nx, ny, nz;
      if (flat) { x = l; y = p; z = s; nx = 0; ny = 0; nz = 1; } else {
        const ls = l * s, ps = p * s, c = Math.cos(ps);
        nx = c * Math.sin(ls); ny = Math.sin(ps); nz = c * Math.cos(ls);
        x = r * nx; y = r * ny; z = r * (nz - 1) + s;
      }
      if (t > 0) {
        const qx = A[2 * i] + (B[2 * i] - A[2 * i]) * u, qy = A[2 * i + 1] + (B[2 * i + 1] - A[2 * i + 1]) * u;
        x += t * (qx - l); y += t * (qy - p);
      }
      pos[3 * i] = x + eps * nx; pos[3 * i + 1] = y + eps * ny; pos[3 * i + 2] = z + eps * nz;
      if (nor) { nor[3 * i] = nx; nor[3 * i + 1] = ny; nor[3 * i + 2] = nz; }
    }
  }
}

function lineObject(set, color, opacity) {
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(set.n * 3), 3));
  g.boundingSphere = new Sphere(new Vector3(), 20);
  const o = new LineSegments(g, new LineBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: false }));
  o.frustumCulled = false;
  return o;
}

export function makeGlobe({ land, texWidth = 4096, circleRadius = 4.5, selRadius = circleRadius } = {}) {
  const group = new Group();
  const state = { t: 0, proj: 'equirect', from: 'equirect', u: 1, lin: 1, sel: { lon: 0, lat: 60 }, dirty: true };

  // ── 貼圖：等距圓柱的 canvas ──
  const W = texWidth, H = texWidth / 2;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const toXY = (lon, lat) => [(lon + 180) / 360 * W, (90 - lat) / 180 * H];
  const layers = [{
    key: 'land', on: true,
    draw(c) {
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#1a3d70'); g.addColorStop(0.5, '#1f4c8a'); g.addColorStop(1, '#1a3d70');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      drawLand(c, land, toXY, { fill: COLORS.land, stroke: COLORS.landEdge, lineWidth: Math.max(1, W / 2048) });
    },
  }];
  const texture = new CanvasTexture(cv);
  texture.colorSpace = SRGBColorSpace; texture.anisotropy = 4;
  const redraw = () => { ctx.clearRect(0, 0, W, H); for (const l of layers) if (l.on) l.draw(ctx, W, H, toXY); texture.needsUpdate = true; };
  redraw();

  // ── 地表：12 瓣 × 每瓣 12 格（經度 2.5 度一格）× 緯度 72 格 ──
  const SEG = 12, ROWS = 72, gw = 360 / GORES;
  const surf = new PointSet(GORES * (SEG + 1) * (ROWS + 1));
  const uv = new Float32Array(surf.n * 2), index = [];
  for (let g = 0; g < GORES; g++) {
    const base = surf.count;
    for (let j = 0; j <= ROWS; j++) for (let i = 0; i <= SEG; i++) {
      const lon = -180 + g * gw + (i / SEG) * gw, lat = -90 + (j / ROWS) * 180;
      const k = surf.push(lon, lat, g);
      uv[2 * k] = (lon + 180) / 360; uv[2 * k + 1] = (lat + 90) / 180;
    }
    for (let j = 0; j < ROWS; j++) for (let i = 0; i < SEG; i++) {
      const a = base + j * (SEG + 1) + i, b = a + 1, c = a + SEG + 1, d = c + 1;
      index.push(a, b, c, b, d, c);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array(surf.n * 3), 3));
  geo.setAttribute('normal', new BufferAttribute(new Float32Array(surf.n * 3), 3));
  geo.setAttribute('uv', new BufferAttribute(uv, 2));
  geo.setIndex(index);
  geo.boundingSphere = new Sphere(new Vector3(), 20);
  const mesh = new Mesh(geo, new MeshLambertMaterial({ map: texture, side: DoubleSide }));
  mesh.frustumCulled = false;
  group.add(mesh);

  // ── 經緯線：每 30 度一條；經線與緯線分成兩個物件（可以分開開關）。
  //    瓣的邊界畫兩次（左右兩瓣各一次），橘子皮裂開時兩邊都有線 ──
  const mer = new PointSet(GORES * 2 * 2 * ROWS);
  const par = new PointSet(4 * GORES * 2 * SEG);
  for (let g = 0; g < GORES; g++) {
    for (const lon of [-180 + g * gw, -180 + (g + 1) * gw]) {
      for (let j = 0; j < ROWS; j++) { mer.push(lon, -90 + j * 2.5, g); mer.push(lon, -90 + (j + 1) * 2.5, g); }
    }
    for (const lat of [-60, -30, 30, 60]) {
      for (let i = 0; i < SEG; i++) { par.push(-180 + g * gw + i * gw / SEG, lat, g); par.push(-180 + g * gw + (i + 1) * gw / SEG, lat, g); }
    }
  }
  const merObj = lineObject(mer, 0xffffff, 0.3), parObj = lineObject(par, 0xffffff, 0.3);
  group.add(merObj); group.add(parObj);
  const eq = new PointSet(GORES * 2 * SEG);
  for (let g = 0; g < GORES; g++) for (let i = 0; i < SEG; i++) { eq.push(-180 + g * gw + i * gw / SEG, 0, g); eq.push(-180 + g * gw + (i + 1) * gw / SEG, 0, g); }
  const eqObj = lineObject(eq, 0xff9d6b, 0.9);
  group.add(eqObj);

  // ── 變形圓：球面上一樣大的圓，圓心在每一瓣的中央經線上 ──
  const RIM = 40;
  const centers = [];
  for (let g = 0; g < GORES; g++) {
    const lon0 = -180 + (g + 0.5) * gw;
    for (const lat of [-60, -30, 0, 30, 60]) centers.push([lon0, lat, g]);
    if (g % 2 === 0) { centers.push([lon0, 75, g]); centers.push([lon0, -75, g]); }
  }
  function fanSet(list, radius) {
    const set = new PointSet(list.length * (RIM + 1));
    const idx = [], rim = [];
    for (const [lon, lat, g] of list) {
      const c = set.push(lon, lat, g);
      const ring = smallCircle(lon, lat, radius, RIM).map(([a, b]) => set.push(a, b, g));
      for (let i = 0; i < RIM; i++) { idx.push(c, ring[i], ring[(i + 1) % RIM]); rim.push(ring[i], ring[(i + 1) % RIM]); }
    }
    return { set, idx, rim };
  }
  function fanObject(f, color, opacity, edge) {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(f.set.n * 3), 3));
    g.setIndex(f.idx);
    g.boundingSphere = new Sphere(new Vector3(), 20);
    const m = new Mesh(g, new MeshBasicMaterial({ color, transparent: true, opacity, side: DoubleSide, depthWrite: false }));
    m.frustumCulled = false;
    const lg = new BufferGeometry();
    lg.setAttribute('position', g.getAttribute('position'));
    lg.setIndex(f.rim);
    lg.boundingSphere = g.boundingSphere;
    const l = new LineSegments(lg, new LineBasicMaterial({ color: edge, transparent: true, opacity: 0.95, depthWrite: false }));
    l.frustumCulled = false;
    const grp = new Group(); grp.add(m); grp.add(l);
    return { grp, geo: g };
  }
  const circ = fanSet(centers, circleRadius);
  const circObj = fanObject(circ, 0xff8a3d, 0.5, 0xffd2a8);
  group.add(circObj.grp);

  // ── 選取的點：那條緯線＋那個位置的變形圓 ──
  const selLine = new PointSet(GORES * 2 * SEG);
  const selLineObj = lineObject(selLine, 0xffd36e, 1);
  let selFan = fanSet([[0, 60, 6]], selRadius);
  const selFanObj = fanObject(selFan, 0x6fe0ff, 0.6, 0xffffff);
  const selGrp = new Group(); selGrp.add(selLineObj); selGrp.add(selFanObj.grp);
  group.add(selGrp);
  function buildSelection() {
    const { lon, lat } = state.sel;
    selLine.reset();
    for (let g = 0; g < GORES; g++) for (let i = 0; i < SEG; i++) { selLine.push(-180 + g * gw + i * gw / SEG, lat, g); selLine.push(-180 + g * gw + (i + 1) * gw / SEG, lat, g); }
    const g = goreOf(lon, GORES).g;
    selFan.set.reset();
    selFan.set.push(lon, lat, g);
    for (const [a, b] of smallCircle(lon, lat, selRadius, RIM)) selFan.set.push(a, b, g);
  }
  buildSelection();

  // ── 小標記（例如台灣）：很小的實心圓 ──
  const marks = [];
  function addMark(lon, lat, color = 0xff4d4d, radius = 1.1) {
    const f = fanSet([[lon, lat, goreOf(lon, GORES).g]], radius);
    const o = fanObject(f, color, 0.95, 0xffffff);
    marks.push({ f, o }); group.add(o.grp); state.dirty = true;
    return o.grp;
  }

  // ── 自訂的線（例如某一條經線、本初子午線、一段航線）：給一串經緯度，跟著地表一起變形 ──
  const paths = [];
  function addPath(color, opacity = 1, maxPoints = 400, eps = 0.007) {
    const set = new PointSet(maxPoints * 2);
    const obj = lineObject(set, color, opacity);
    obj.geometry.setDrawRange(0, 0);
    const p = {
      set, obj, eps,
      /** pts：[[lon, lat], …] 連成一條線；gore 不給就照每個點的經度判斷 */
      set_(pts, gore) {
        set.reset();
        for (let i = 0; i + 1 < pts.length && set.count + 2 <= set.n; i++) { set.push(pts[i][0], pts[i][1], gore); set.push(pts[i + 1][0], pts[i + 1][1], gore); }
        state.dirty = true;
      },
    };
    paths.push(p); group.add(obj); state.dirty = true;
    return { obj, set: (pts, gore) => p.set_(pts, gore) };
  }

  const tmp = new PointSet(1);
  const one = new Float32Array(3), oneN = new Float32Array(3);
  function pointAt(lon, lat, out, eps = 0, gore) {
    tmp.reset(); tmp.push(lon, lat, gore);
    tmp.write(one, oneN, state.t, state.from, state.proj, state.u, eps);
    return out.set(one[0], one[1], one[2]);
  }
  function normalAt(lon, lat, out) {
    tmp.reset(); tmp.push(lon, lat);
    tmp.write(one, oneN, state.t, state.from, state.proj, state.u, 0);
    return out.set(oneN[0], oneN[1], oneN[2]);
  }

  function update() {
    if (!state.dirty) return false;
    state.dirty = false;
    const { t, from, proj, u } = state;
    const w = (set, g, eps, nor) => {
      const pa = g.getAttribute('position');
      set.write(pa.array, nor ? g.getAttribute('normal').array : null, t, from, proj, u, eps);
      pa.needsUpdate = true;
      if (nor) g.getAttribute('normal').needsUpdate = true;
    };
    w(surf, geo, 0, true);
    if (merObj.visible) w(mer, merObj.geometry, 0.004);
    if (parObj.visible) w(par, parObj.geometry, 0.004);
    for (const p of paths) if (p.obj.visible) { w(p.set, p.obj.geometry, p.eps); p.obj.geometry.setDrawRange(0, p.set.count); }
    w(eq, eqObj.geometry, 0.005);
    if (circObj.grp.visible) w(circ.set, circObj.geo, 0.008);
    if (selGrp.visible) {
      w(selLine, selLineObj.geometry, 0.006);
      selLineObj.geometry.setDrawRange(0, selLine.count);
      w(selFan.set, selFanObj.geo, 0.012);
    }
    for (const m of marks) w(m.f.set, m.o.geo, 0.014);
    return true;
  }

  const api = {
    group, mesh, texture, state, layers,
    setFlat(t) { t = Math.min(1, Math.max(0, t)); if (t !== state.t) { state.t = t; state.dirty = true; } },
    setProjection(name, immediate) {
      if (name === state.proj) return;
      if (immediate || state.t <= 0) { state.from = name; state.proj = name; state.u = 1; state.lin = 1; } else { state.from = state.proj; state.proj = name; state.u = 0; state.lin = 0; }
      state.dirty = true;
    },
    /** 換投影的過場；回傳是否還在動 */
    tick(dt, dur = 1.2) {
      if (state.lin >= 1) return false;
      state.lin = Math.min(1, state.lin + dt / dur);
      state.u = state.lin * state.lin * (3 - 2 * state.lin);
      if (state.lin >= 1) { state.u = 1; state.from = state.proj; }
      state.dirty = true;
      return true;
    },
    update,
    show(key, on) {
      const o = { meridians: merObj, parallels: parObj, circles: circObj.grp, select: selGrp, selectLine: selLineObj, selectDot: selFanObj.grp, equator: eqObj }[key];
      if (key === 'marks') { for (const m of marks) m.o.grp.visible = on; }
      else if (key === 'graticule') { merObj.visible = on; parObj.visible = on; }
      else if (o) o.visible = on;
      state.dirty = true;
    },
    setSelection(lon, lat) { state.sel = { lon, lat }; buildSelection(); state.dirty = true; },
    addMark, addPath, pointAt, normalAt,
    /** 地表的透明度（看地球內部的角度時用）：1 是不透明 */
    setOpacity(a, frontOnly = false) { const m = mesh.material; m.transparent = a < 1; m.opacity = a; m.depthWrite = a >= 1; m.side = frontOnly ? FrontSide : DoubleSide; m.needsUpdate = true; },
    uvToLonLat: (v) => [v.x * 360 - 180, v.y * 180 - 90],
    addLayer(l) { layers.push(l); redraw(); },
    setLayer(key, on) { const l = layers.find((x) => x.key === key); if (l) { l.on = on; redraw(); } },
    redraw,
  };
  return api;
}
