/*
 * 看得見的數學 · 桌上的位值積木（three.js；形狀與位置全部來自 place.js 的純函式）。
 *
 *   makeBlocks({ base, width }) → {
 *     group, cols, base, width,
 *     set(counts)            立刻擺成每一位各幾個（counts[0] 是個位）
 *     spawn(i, 秒)           第 i 位多一個積木（從上面落下來）
 *     squeeze(i, 秒)         第 i 位滿了：縫合起來
 *     fuse(i)                把縫合好的那幾個換成一個大的（下一位的積木），先留在原地
 *     travel(i, 秒)          剛併好的那一個，搬到第 i 位自己的位子
 *     counts()               畫面上每一位實際有幾個積木（除錯與測試用）
 *     value()                畫面上的積木一共代表多少
 *     anchor(i, out)         第 i 位的數字標籤要放的地方（格子前緣）
 *     extent(hi)             第 0 到 hi 位佔多大：{ cx, cz, w, d, h }（世界座標）
 *     update(dt)
 *   }
 * 積木的顏色照美國教室常見的配色分四種（小方塊黃、長條綠、平板藍、大方塊紅），更高的位再輪一次。
 */
import {
  BoxGeometry, CanvasTexture, Color, Float32BufferAttribute, Group, LinearMipmapLinearFilter, MathUtils, Mesh, MeshStandardMaterial,
  RepeatWrapping, SRGBColorSpace, Vector3,
} from 'three';
import { columns, fusedBox, fusedSlots, pieceDims, placeValue, slots } from './place.js';

const COLORS = [0xf4c542, 0x4fb477, 0x4a90d9, 0xe2574c];
export const pieceColor = (i) => COLORS[i % COLORS.length];
export const pieceCss = (i) => `#${COLORS[i % COLORS.length].toString(16).padStart(6, '0')}`;

let gridTex = null;
function grid() {
  if (gridTex) return gridTex;
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, 64, 64);
  g.strokeStyle = 'rgba(20,28,50,.62)'; g.lineWidth = 5; g.strokeRect(0, 0, 64, 64);
  gridTex = new CanvasTexture(c);
  gridTex.colorSpace = SRGBColorSpace;
  gridTex.wrapS = gridTex.wrapT = RepeatWrapping;
  gridTex.minFilter = LinearMipmapLinearFilter;
  gridTex.anisotropy = 8;
  return gridTex;
}

/** 一塊積木的幾何：每一面的貼圖重複次數＝那一面有幾格小方塊，所以看得出它是幾個小方塊做的 */
function boxGeo([x, y, z]) {
  const geo = new BoxGeometry(x, y, z);
  const rep = [[z, y], [z, y], [x, z], [x, z], [x, y], [x, y]];     // ±x、±y、±z 六個面
  const uv = geo.attributes.uv.array.slice();
  for (let f = 0; f < 6; f++) for (let v = 0; v < 4; v++) { uv[(f * 4 + v) * 2] *= rep[f][0]; uv[(f * 4 + v) * 2 + 1] *= rep[f][1]; }
  geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  return geo;
}

const ease = (t) => 1 - (1 - t) ** 3;

export function makeBlocks({ base, width }) {
  const cols = columns(base, width);
  const total = cols[0].x0 + cols[0].size[0] - cols[width - 1].x0;
  const S = 9.2 / total;                                    // 整排縮成大約 9 個單位寬
  const group = new Group();
  group.scale.setScalar(S);
  const geos = [], mats = [];
  for (let i = 0; i <= width; i++) {
    geos.push(boxGeo(pieceDims(i, base)));
    mats.push(new MeshStandardMaterial({ color: pieceColor(i), map: grid(), roughness: 0.55, metalness: 0.02 }));
  }
  // 每一格底下的墊子
  cols.forEach((c) => {
    const p = c.pad * 0.6;
    const mat = new Mesh(new BoxGeometry(c.size[0] + p * 2, 0.16, c.size[2] + p * 2),
      new MeshStandardMaterial({ color: new Color(pieceColor(c.i)).lerp(new Color(0x16223f), 0.86), roughness: 0.95 }));
    mat.position.set(c.x0 + c.size[0] / 2, -0.08, c.z0 + c.size[2] / 2);
    mat.receiveShadow = true;
    group.add(mat);
  });
  const slotList = cols.map((c) => slots(c.i, base, c.top));
  const piles = cols.map(() => []);
  const moving = new Set();
  const flashes = new Set();

  // 位子從靠鏡頭那一邊排起（z 反過來），第一個積木離數字標籤最近
  const local = (i, p, out) => out.set(cols[i].x0 + p[0], p[1], -p[2]);
  function make(i) {
    const m = new Mesh(geos[i], mats[i]);
    m.castShadow = true; m.receiveShadow = true;
    m.userData.place = i;
    group.add(m);
    return m;
  }
  function drop(m) { group.remove(m); moving.delete(m); flashes.delete(m); if (m.userData.own) m.material.dispose(); }
  function go(m, to, dur, arc = 0, pop = false) {
    if (dur <= 0.001) { m.position.copy(to); m.scale.setScalar(1); moving.delete(m); return; }
    m.userData.anim = { from: m.position.clone(), to: to.clone(), t: 0, dur, arc, pop };
    moving.add(m);
  }
  const tmp = new Vector3();

  function set(counts) {
    piles.forEach((pile, i) => {
      while (pile.length) drop(pile.pop());
      for (let k = 0; k < counts[i]; k++) {
        const m = make(i);
        local(i, slotList[i][k], m.position);
        pile.push(m);
      }
    });
  }
  function spawn(i, dur) {
    const k = piles[i].length, m = make(i);
    local(i, slotList[i][k], tmp);
    m.position.copy(tmp);
    m.position.y += Math.max(2.5, pieceDims(i, base)[1] * 0.8);
    m.scale.setScalar(dur > 0.001 ? 0.55 : 1);
    piles[i].push(m);
    go(m, tmp, dur, 0, true);
  }
  function squeeze(i, dur) {
    const fs = fusedSlots(i, base);
    piles[i].forEach((m, k) => { local(i, fs[k], tmp); go(m, tmp, dur); });
  }
  function fuse(i) {
    while (piles[i].length) drop(piles[i].pop());
    const m = make(i + 1);
    m.material = mats[i + 1].clone(); m.userData.own = true;
    m.material.emissive = new Color(0xffffff); m.material.emissiveIntensity = 0.75;
    flashes.add(m);
    local(i, fusedBox(i, base).center, m.position);
    piles[i + 1].push(m);
  }
  function travel(i, dur) {
    const k = piles[i].length - 1, m = piles[i][k];
    local(i, slotList[i][k], tmp);
    go(m, tmp, dur, Math.max(2, pieceDims(i, base)[1] * 0.5));
  }
  function update(dt) {
    moving.forEach((m) => {
      const a = m.userData.anim;
      a.t = Math.min(1, a.t + dt / a.dur);
      const k = ease(a.t);
      m.position.lerpVectors(a.from, a.to, k);
      if (a.arc) m.position.y += Math.sin(Math.PI * a.t) * a.arc;
      if (a.pop) m.scale.setScalar(MathUtils.lerp(0.55, 1, Math.min(1, a.t * 1.6)));
      if (a.t >= 1) { m.scale.setScalar(1); moving.delete(m); }
    });
    flashes.forEach((m) => {
      m.material.emissiveIntensity = Math.max(0, m.material.emissiveIntensity - dt * 1.6);
      if (m.material.emissiveIntensity <= 0) flashes.delete(m);
    });
  }
  const counts = () => piles.map((p) => p.length);
  const value = () => piles.reduce((s, p) => s + p.reduce((t, m) => t + placeValue(m.userData.place, base), 0), 0);
  function anchor(i, out) {
    const c = cols[i];
    return out.set(c.x0 + c.size[0] / 2, 0, c.pad * 0.6 + 0.2).multiplyScalar(S);
  }
  function extent(hi) {
    const a = cols[0], b = cols[Math.min(hi, width - 1)];
    const x1 = a.x0 + a.size[0] + a.pad, x0 = b.x0 - b.pad;
    let d = 0, h = 0;
    for (let i = 0; i <= Math.min(hi, width - 1); i++) { d = Math.max(d, cols[i].size[2]); h = Math.max(h, cols[i].size[1]); }
    return { cx: ((x0 + x1) / 2) * S, cz: (-d / 2) * S, w: (x1 - x0) * S, d: d * S, h: h * S };
  }
  return { group, cols, base, width, scale: S, set, spawn, squeeze, fuse, travel, counts, value, anchor, extent, update, busy: () => moving.size > 0 };
}
