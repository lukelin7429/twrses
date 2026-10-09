/*
 * 電腦概論 · 單元二共用的 3D 主機（全部自繪示意，不是任何品牌的產品；第五～八課共用）。
 *
 *   makePC() → {
 *     group,                    整台主機＋旁邊一台螢幕（加進 scene）
 *     keys,                     零件的 key（同 parts.js 的 PARTS）
 *     setExplode(k),            0＝裝好，1＝拆開（每個零件沿自己的方向飛出去）
 *     select(key | null),       選一個零件（它亮起來，別的變暗）
 *     light(keys),              「按下電源」時要亮的零件（陣列；'screen'＝螢幕）
 *     hit(raycaster),           點到哪個零件（null＝沒點到）
 *     anchor(key, out),         零件的中心（世界座標；標籤與資料光點用；'screen' 也可以）
 *     update(dt),               每一格呼叫（轉場、風扇轉動）
 *     size                      { w, h }：相機取景用的大約寬高
 *   }
 *
 * 座標：x 向右、y 向上、z 朝觀眾。機殼側板打開朝觀眾；主機板立在機殼後面那一面。1 單位大約 10 公分。
 * 每個零件一個 Group，裡面的 Mesh 共用該零件自己的幾個材質（選取與點亮時改 emissive）。
 */
import { BoxGeometry, CircleGeometry, Color, CylinderGeometry, Group, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';
import { PARTS } from './parts.js';

const ACCENT = { board: 0x4fd1c5, cpu: 0xffd36e, cooler: 0x9fd0ff, ram: 0x7ee0aa, ssd: 0xffa26b, gpu: 0xc7a6ff, psu: 0xff8a8a };
// 裝好的位置與拆開時往哪裡飛
const SPEC = {
  board: { home: [0.3, 2.75, -0.86], off: [0, 0, 0] },
  cpu: { home: [0.1, 3.55, -0.74], off: [0, 0, 1.7] },
  cooler: { home: [0.1, 3.55, -0.28], off: [-0.3, 0.45, 3.2] },
  ram: { home: [1.25, 3.5, -0.58], off: [0.7, 0.3, 2.0] },
  ssd: { home: [0.1, 2.6, -0.78], off: [1.0, -0.15, 1.5] },
  gpu: { home: [0.0, 1.9, -0.2], off: [0, -0.5, 2.6] },
  psu: { home: [-1.55, 0.62, -0.1], off: [-0.4, -0.1, 2.2] },
};

export function makePC() {
  const group = new Group();
  const parts = {};
  const mat = (store, color, o = {}) => { const m = new MeshStandardMaterial({ color, roughness: 0.55, emissive: 0x000000, emissiveIntensity: 0, ...o }); store.push(m); return m; };
  const box = (g, m, w, h, d, x = 0, y = 0, z = 0) => { const b = new Mesh(new BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); return b; };

  // 機殼：底、頂、後面那一面（主機板背後）、左右兩片，都很薄；朝觀眾那一面是開的
  const shell = new MeshStandardMaterial({ color: 0x5a6f9e, roughness: 0.7, transparent: true, opacity: 0.3, depthWrite: false });
  const frame = new Group();
  box(frame, shell, 5.4, 0.1, 2.4, 0, 0.05, 0); box(frame, shell, 5.4, 0.1, 2.4, 0, 5.05, 0);
  box(frame, shell, 5.4, 5.1, 0.08, 0, 2.55, -1.16);
  box(frame, shell, 0.1, 5.1, 2.4, -2.65, 2.55, 0); box(frame, shell, 0.1, 5.1, 2.4, 2.65, 2.55, 0);
  group.add(frame);

  function add(key, build) {
    const g = new Group(), mats = [];
    const s = SPEC[key];
    build(g, (c, o) => mat(mats, c, o));
    g.position.set(...s.home);
    const pad = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ visible: false }));
    pad.userData.part = key; g.add(pad);
    group.add(g);
    parts[key] = { g, mats, pad, home: new Vector3(...s.home), off: new Vector3(...s.off), glow: 0, target: 0, spin: [] };
    return parts[key];
  }
  const sizePad = (p, w, h, d, x = 0, y = 0, z = 0) => { p.pad.scale.set(w, h, d); p.pad.position.set(x, y, z); };

  // 主機板：一大片板子，上面幾條插槽和線路（示意）
  sizePad(add('board', (g, m) => {
    box(g, m(0x1c7a5d), 3.5, 3.7, 0.08);
    const trace = m(0x49b894), slot = m(0x1b2130);
    for (let i = 0; i < 5; i++) box(g, trace, 2.9, 0.02, 0.02, -0.1, -1.5 + i * 0.22, 0.05);
    box(g, slot, 0.75, 0.75, 0.05, -0.2, 0.8, 0.06);                       // 處理器插座
    box(g, slot, 0.09, 1.6, 0.08, 0.95, 0.75, 0.07); box(g, slot, 0.09, 1.6, 0.08, 1.2, 0.75, 0.07);   // 記憶體插槽
    box(g, slot, 2.7, 0.1, 0.1, -0.3, -0.72, 0.07); box(g, slot, 2.7, 0.1, 0.1, -0.3, -1.25, 0.07);   // 擴充槽
  }), 3.5, 3.7, 0.3);

  // 處理器：一小片方形晶片，上面一塊金屬蓋
  sizePad(add('cpu', (g, m) => {
    box(g, m(0x1f6b4f), 0.7, 0.7, 0.05);
    box(g, m(0xc9ced8, { metalness: 0.85, roughness: 0.3 }), 0.52, 0.52, 0.08, 0, 0, 0.06);
  }), 0.9, 0.9, 0.4);

  // 散熱器：一疊鰭片＋前面一個風扇
  const cooler = add('cooler', (g, m) => {
    const fin = m(0xaeb6c4, { metalness: 0.8, roughness: 0.35 });
    for (let i = 0; i < 9; i++) box(g, fin, 0.95, 0.035, 0.6, 0, -0.42 + i * 0.105, 0);
    box(g, m(0x8a93a6, { metalness: 0.8, roughness: 0.35 }), 0.2, 0.95, 0.5, 0, 0, -0.02);
    const ring = new Mesh(new CylinderGeometry(0.5, 0.5, 0.14, 28, 1, true), m(0x1b2130)); ring.rotation.x = Math.PI / 2; ring.position.z = 0.38; g.add(ring);
    const fan = new Group(); fan.position.z = 0.38;
    const blade = m(0x3a455c);
    for (let i = 0; i < 7; i++) { const b = new Mesh(new BoxGeometry(0.42, 0.13, 0.02), blade); b.position.set(Math.cos((i / 7) * 6.283) * 0.24, Math.sin((i / 7) * 6.283) * 0.24, 0); b.rotation.z = (i / 7) * 6.283; b.rotation.x = 0.35; fan.add(b); }
    const hub = new Mesh(new CylinderGeometry(0.13, 0.13, 0.08, 18), m(0xdfe3ea)); hub.rotation.x = Math.PI / 2; fan.add(hub);
    g.add(fan); g.userData.fan = fan;
  });
  sizePad(cooler, 1.1, 1.1, 1.0, 0, 0, 0.1); cooler.spin.push(cooler.g.userData.fan);

  // 記憶體：兩條長長的板子，上面一排黑色的晶片
  sizePad(add('ram', (g, m) => {
    const pcb = m(0x1f7a56), chip = m(0x151a26), gold = m(0xd9b45a, { metalness: 0.8, roughness: 0.35 });
    for (const x of [-0.125, 0.125]) {
      box(g, pcb, 0.06, 1.55, 0.42, x, 0, 0);
      for (let i = 0; i < 5; i++) box(g, chip, 0.075, 0.22, 0.26, x, -0.56 + i * 0.28, 0.02);
      box(g, gold, 0.065, 1.5, 0.05, x, 0, -0.2);
    }
  }), 0.5, 1.7, 0.6);

  // 固態硬碟：貼在主機板上的一小條（M.2 的樣子）
  sizePad(add('ssd', (g, m) => {
    box(g, m(0x33405e), 1.0, 0.28, 0.04);
    const chip = m(0x0f131c);
    box(g, chip, 0.3, 0.2, 0.03, -0.25, 0, 0.035); box(g, chip, 0.3, 0.2, 0.03, 0.15, 0, 0.035);
    box(g, m(0xd9b45a, { metalness: 0.8, roughness: 0.35 }), 0.06, 0.26, 0.045, -0.47, 0, 0);
  }), 1.15, 0.45, 0.3);

  // 顯示卡：一塊長長的板子，下面兩個風扇
  const gpu = add('gpu', (g, m) => {
    box(g, m(0x2a3550), 3.0, 0.08, 1.25, 0, 0.1, 0);
    box(g, m(0x4a5878), 2.9, 0.26, 1.15, 0, -0.08, 0);
    const fans = [];
    for (const x of [-0.75, 0.75]) {
      const ring = new Mesh(new CylinderGeometry(0.48, 0.48, 0.05, 28), m(0x12161f)); ring.position.set(x, -0.22, 0); g.add(ring);
      const fan = new Group(); fan.position.set(x, -0.25, 0);
      const blade = m(0x4a556e);
      for (let i = 0; i < 7; i++) { const b = new Mesh(new BoxGeometry(0.38, 0.02, 0.12), blade); b.position.set(Math.cos((i / 7) * 6.283) * 0.22, 0, Math.sin((i / 7) * 6.283) * 0.22); b.rotation.y = -(i / 7) * 6.283; fan.add(b); }
      g.add(fan); fans.push(fan);
    }
    box(g, m(0xb9bec8, { metalness: 0.7, roughness: 0.35 }), 0.06, 0.5, 1.2, -1.52, 0, 0);
    g.userData.fans = fans;
  });
  sizePad(gpu, 3.1, 0.6, 1.4); gpu.spinY = gpu.g.userData.fans;

  // 電源供應器：一個封起來的鐵盒，側面有散熱孔
  sizePad(add('psu', (g, m) => {
    box(g, m(0x3a4660), 1.8, 1.0, 1.8);
    const grill = new Mesh(new CircleGeometry(0.42, 28), m(0x0e1220)); grill.position.set(0, 0, 0.905); g.add(grill);
    for (let i = -2; i <= 2; i++) box(g, m(0x3a455c), 0.8, 0.025, 0.01, 0, i * 0.14, 0.91);
    box(g, m(0xe8b923), 0.9, 0.16, 0.01, 0.35, 0.36, 0.906);
  }), 1.9, 1.1, 1.9);

  // 螢幕（主機外面，右邊）：只有「按下電源」的最後一步會亮
  const monitor = new Group(); monitor.position.set(5.7, 0, -0.3);
  const mFrame = new MeshStandardMaterial({ color: 0x1b2130, roughness: 0.5 });
  box(monitor, mFrame, 2.9, 1.9, 0.12, 0, 2.6, 0); box(monitor, mFrame, 0.2, 1.2, 0.12, 0, 1.1, -0.05); box(monitor, mFrame, 1.2, 0.08, 0.7, 0, 0.46, 0);
  const screenM = new MeshBasicMaterial({ color: 0x0b1020 });
  const screen = box(monitor, screenM, 2.7, 1.7, 0.02, 0, 2.6, 0.07);
  group.add(monitor);
  const screenOn = new Color(0x9fe3ff), screenOff = new Color(0x0b1020);

  let explode = 0, explodeT = 0, sel = null, lit = [], screenK = 0;
  const tmp = new Vector3();
  const api = {
    group, keys: PARTS, size: { w: 11.4, h: 6.4 },
    setExplode(k) { explodeT = Math.max(0, Math.min(1, k)); },
    get explode() { return explode; },
    select(key) { sel = key; },
    light(keys) { lit = keys || []; },
    hit(raycaster) {
      const h = raycaster.intersectObjects(PARTS.map((k) => parts[k].pad), false);
      // 主機板最大、在最後面：前面有別的零件時優先選別的
      const first = h.find((x) => x.object.userData.part !== 'board') || h[0];
      return first ? first.object.userData.part : null;
    },
    anchor(key, out = new Vector3()) {
      if (key === 'screen') return out.copy(screen.position).applyMatrix4(monitor.matrixWorld);
      return parts[key].g.getWorldPosition(out);
    },
    update(dt) {
      explode += (explodeT - explode) * Math.min(1, dt * 6);
      if (Math.abs(explodeT - explode) < 0.001) explode = explodeT;
      const e = MathUtils.smootherstep(explode, 0, 1);
      for (const k of PARTS) {
        const p = parts[k];
        p.g.position.copy(p.home).addScaledVector(p.off, e);
        const want = sel === k ? 0.75 : lit.includes(k) ? 0.6 : 0;
        p.glow += (want - p.glow) * Math.min(1, dt * 8);
        const dim = sel && sel !== k ? 0.45 : 1;
        for (const m of p.mats) { m.emissive.setHex(ACCENT[k]); m.emissiveIntensity = p.glow * 0.55; m.opacity = dim; m.transparent = dim < 1; }
      }
      const run = lit.includes('cooler') || sel === 'cooler' ? 9 : 1.2;
      for (const f of parts.cooler.spin) f.rotation.z -= dt * run;
      const runG = lit.includes('gpu') || sel === 'gpu' ? 9 : 1.2;
      for (const f of parts.gpu.spinY) f.rotation.y -= dt * runG;
      screenK += ((lit.includes('screen') ? 1 : 0) - screenK) * Math.min(1, dt * 5);
      screenM.color.copy(screenOff).lerp(screenOn, screenK);
      group.updateMatrixWorld(true);
      return tmp;
    },
  };
  return api;
}
