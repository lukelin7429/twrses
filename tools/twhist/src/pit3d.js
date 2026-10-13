/*
 * 台灣歷史 Taiwan's Story · 考古探坑的 3D（通用的示意，不是任何一個真實遺址的剖面）。
 *
 * 一塊切開的地：左右兩側與後面留著不挖（看得到一層一層的地層），中間是探坑。
 * 探坑挖成階梯（step trench）：每往下一層，坑的後緣往前退一階，所以每一層的出土物都留在自己那一階上，
 * 從正面一眼看得到「誰在上面、誰在下面」。
 *
 *   makePit(layers, opts) → {
 *     group, setLevel(level), level(), findAnchor(key, v), layerAnchor(i, v), find(key), finds(),
 *     setIntrusion(on), intrusionAnchor(v), extent(), visibleFinds()
 *   }
 * layers[i]＝{ key, thick, color, finds: [{ key, shape }] }；深度換算用 strata.js。
 */
import {
  BoxGeometry, CanvasTexture, CylinderGeometry, DodecahedronGeometry, Group, IcosahedronGeometry, LatheGeometry, Mesh,
  MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, SphereGeometry, TorusGeometry, Vector2, Vector3,
} from 'three';
import { bounds, depthAt } from './strata.js';
import { mulberry32 } from './evidence2d.js';

export const DIM = { W: 6.4, D: 4.6, pitW: 3.4, zBack: -1.5, step: 0.66, scale: 1.45 };

function soilTex(hex, seed, kind) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = hex; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const v = r();
    g.fillStyle = v < 0.5 ? `rgba(0,0,0,${0.05 + r() * 0.12})` : `rgba(255,255,255,${0.04 + r() * 0.1})`;
    const s = 1 + r() * 2.4;
    g.fillRect(r() * 256, r() * 256, s, s * (0.6 + r() * 0.8));
  }
  const stones = kind === 'gravel' ? 90 : kind === 'sand' ? 26 : kind === 'clay' ? 10 : 18;
  for (let i = 0; i < stones; i++) {
    g.fillStyle = `rgba(${200 + r() * 40},${195 + r() * 40},${180 + r() * 40},${0.35 + r() * 0.35})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 2 + r() * (kind === 'gravel' ? 7 : 4), 1.5 + r() * 3, r() * 3, 0, 7); g.fill();
  }
  if (kind === 'top') {
    g.strokeStyle = 'rgba(30,18,8,.5)'; g.lineWidth = 1.2;
    for (let i = 0; i < 26; i++) { const x = r() * 256; g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + r() * 20 - 10, 30, x + r() * 30 - 15, 60, x + r() * 40 - 20, 60 + r() * 80); g.stroke(); }
  }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.wrapS = t.wrapT = RepeatWrapping; return t;
}
function grassTex() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d'), r = mulberry32(77);
  g.fillStyle = '#5d8a45'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 3800; i++) { g.fillStyle = `rgba(${40 + r() * 70},${100 + r() * 90},${30 + r() * 50},.55)`; g.fillRect(r() * 256, r() * 256, 1.4, 2 + r() * 4); }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(3, 3); return t;
}
function patternTex(draw) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  draw(c.getContext('2d'));
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.wrapS = t.wrapT = RepeatWrapping; return t;
}
const std = (o) => new MeshStandardMaterial({ roughness: 0.9, metalness: 0, ...o });

/** 出土物的小模型（都是自繪的通用示意）；回傳 Group，原點在物件的底部中央。 */
export function makeFind(shape) {
  const g = new Group();
  const add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m; };
  if (shape === 'cap') {                       // 瓶蓋
    const m = add(new CylinderGeometry(0.15, 0.17, 0.05, 21), std({ color: '#c9463d', metalness: 0.6, roughness: 0.45 }), 0, 0.03);
    m.rotation.z = 0.25;
    add(new CylinderGeometry(0.12, 0.12, 0.012, 21), std({ color: '#f1ede2', metalness: 0.3, roughness: 0.5 }), -0.006, 0.058).rotation.z = 0.25;
  } else if (shape === 'coin') {               // 一枚鑄著年份的硬幣
    const m = add(new CylinderGeometry(0.14, 0.14, 0.025, 28), std({ color: '#c8a24a', metalness: 0.85, roughness: 0.35 }), 0, 0.05);
    m.rotation.set(0.5, 0, 0.35);
  } else if (shape === 'porcelain') {          // 青花瓷片：碗壁的一小片
    const tex = patternTex((c) => {
      c.fillStyle = '#f4f3ec'; c.fillRect(0, 0, 128, 128); c.strokeStyle = '#2d4f9c'; c.lineWidth = 5;
      for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(16 + i * 34, 60, 22, 0.2, 2.6); c.stroke(); }
      c.lineWidth = 3; c.beginPath(); c.moveTo(0, 16); c.lineTo(128, 16); c.moveTo(0, 108); c.lineTo(128, 108); c.stroke();
    });
    const pts = []; for (let i = 0; i <= 8; i++) { const a = (i / 8) * 1.15; pts.push(new Vector2(0.16 + Math.sin(a) * 0.22, i * 0.03)); }
    const m = add(new LatheGeometry(pts, 10, 0, 1.25), std({ map: tex, roughness: 0.25, side: 2 }), 0.02, 0.02, 0.24);
    m.rotation.set(-0.5, -0.6, 0.2);
  } else if (shape === 'tile') {               // 屋瓦的破片（弧形）
    const m = add(new CylinderGeometry(0.3, 0.3, 0.34, 14, 1, true, 0, 1.25), std({ color: '#9a4f38', side: 2 }), 0.16, -0.19, 0.16);
    m.rotation.set(Math.PI / 2, 0, 0.5);
  } else if (shape === 'knife') {              // 鏽了的鐵刀
    add(new BoxGeometry(0.42, 0.018, 0.085), std({ color: '#6b3d25', roughness: 1 }), 0.05, 0.03).rotation.y = 0.5;
    add(new BoxGeometry(0.17, 0.03, 0.045), std({ color: '#4a2c1c', roughness: 1 }), -0.2, 0.03, 0.137).rotation.y = 0.5;
  } else if (shape === 'beads') {              // 玻璃珠
    const cols = ['#2f7fd0', '#e0a92a', '#2fa37a', '#c2452f', '#2f7fd0', '#e8e2c8', '#2fa37a'];
    cols.forEach((col, i) => {
      const a = (i / cols.length) * Math.PI * 1.4 - 0.4;
      const m = add(new TorusGeometry(0.03, 0.018, 8, 14), std({ color: col, roughness: 0.2, metalness: 0.1 }), Math.cos(a) * 0.16, 0.035, Math.sin(a) * 0.16);
      m.rotation.set(Math.PI / 2 + (i % 2) * 0.5, 0, a);
    });
  } else if (shape === 'potsherd') {           // 有繩紋的陶片
    const tex = patternTex((c) => {
      c.fillStyle = '#a8663d'; c.fillRect(0, 0, 128, 128); c.strokeStyle = 'rgba(60,30,14,.55)'; c.lineWidth = 3;
      for (let i = -128; i < 256; i += 9) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + 60, 128); c.stroke(); }
    });
    tex.repeat.set(2, 1);
    const pts = []; for (let i = 0; i <= 8; i++) { const a = (i / 8) * 1.3 - 0.2; pts.push(new Vector2(0.2 + Math.sin(a) * 0.16, i * 0.035)); }
    const m = add(new LatheGeometry(pts, 10, 0, 1.4), std({ map: tex, side: 2 }), 0.0, 0.03, 0.26);
    m.rotation.set(-0.6, -0.7, 0.15);
  } else if (shape === 'adze') {               // 磨製石錛
    const geo = new BoxGeometry(0.16, 0.05, 0.36, 1, 1, 3);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const z = p.getZ(i); const k = (z + 0.18) / 0.36; p.setX(i, p.getX(i) * (0.72 + 0.4 * k)); if (z > 0.17) p.setY(i, p.getY(i) * 0.12 - 0.02); }
    geo.computeVertexNormals();
    add(geo, std({ color: '#6f8576', roughness: 0.35 }), 0, 0.03).rotation.y = -0.5;
  } else if (shape === 'chopper') {            // 打製的礫石器：一顆敲掉幾片的石頭
    const geo = new DodecahedronGeometry(0.19, 0);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { p.setY(i, p.getY(i) * 0.6); if (p.getX(i) > 0.05) p.setX(i, p.getX(i) * 0.55); }
    geo.computeVertexNormals();
    add(geo, std({ color: '#8d8a84', flatShading: true }), 0, 0.11).rotation.y = 0.6;
  } else if (shape === 'charcoal') {           // 火堆留下的木炭
    const r = mulberry32(5);
    for (let i = 0; i < 9; i++) {
      const m = add(new BoxGeometry(0.05 + r() * 0.07, 0.035 + r() * 0.03, 0.04 + r() * 0.05), std({ color: i % 4 ? '#1c1a19' : '#3a3632', roughness: 1 }), (r() - 0.5) * 0.34, 0.02 + r() * 0.03, (r() - 0.5) * 0.3);
      m.rotation.set(r(), r() * 3, r());
    }
    add(new CylinderGeometry(0.26, 0.28, 0.012, 20), std({ color: '#55504a', roughness: 1 }), 0, 0.006);
  } else {
    add(new IcosahedronGeometry(0.12, 0), std({ color: '#999' }), 0, 0.12);
  }
  return g;
}

export function makePit(layers, opts = {}) {
  const { W, D, pitW, zBack, step, scale } = DIM;
  const L = layers.map((l) => ({ ...l, thick: l.thick * scale }));
  const B = bounds(L), n = L.length, H = B[n - 1].bottom;
  const group = new Group();
  const zOf = (i) => zBack + i * step;                         // 第 i 層那一階的後緣
  const grass = std({ map: grassTex() });
  const KIND = ['top', 'soil', 'sand', 'clay', 'gravel'];
  const mats = L.map((l, i) => {
    const tex = soilTex(l.color, 11 + i * 7, l.soil || KIND[i % KIND.length]);
    tex.repeat.set(2, 1);
    return std({ map: tex });
  });
  const box = (w, h, d, x, yTop, z, mat, grassTop) => {
    const m = new Mesh(new BoxGeometry(w, h, d), grassTop ? [mat, mat, grass, mat, mat, mat] : mat);
    m.position.set(x, -yTop - h / 2, z); m.receiveShadow = true; group.add(m); return m;
  };
  const sideW = (W - pitW) / 2;
  const plugs = [];
  L.forEach((l, i) => {
    const h = l.thick, top = B[i].top, z0 = zOf(i);
    box(sideW, h, D, -(pitW + sideW) / 2, top, 0, mats[i], i === 0);             // 左邊不挖的土
    box(sideW, h, D, (pitW + sideW) / 2, top, 0, mats[i], i === 0);              // 右邊
    box(pitW, h, z0 + D / 2, 0, top, (z0 - D / 2) / 2, mats[i], i === 0);         // 後面（含上一階留下的平台）
    const d = D / 2 - z0;
    const plug = new Mesh(new BoxGeometry(pitW - 0.004, 1, d - 0.002), i === 0 ? [mats[i], mats[i], grass, mats[i], mats[i], mats[i]] : mats[i]);
    plug.position.set(0, 0, z0 + d / 2); plug.receiveShadow = true; group.add(plug);
    plugs.push(plug);
  });
  // 最下面：沒有人類活動痕跡的生土
  const base = std({ map: soilTex(opts.baseColor || '#8f8676', 99, 'gravel') });
  base.map.repeat.set(3, 1);
  box(W, 0.55, D, 0, H, 0, base, false);

  // 出土物：放在自己那一層的底（＝那一階的平台）上
  const finds = [];
  L.forEach((l, i) => {
    const z0 = zOf(i), depthTread = i === n - 1 ? D / 2 - z0 : step;
    const k = l.finds.filter((f) => !f.intrusive).length;
    l.finds.filter((f) => !f.intrusive).forEach((f, j) => {
      const obj = makeFind(f.shape);
      const x = k === 1 ? 0 : (j / (k - 1) - 0.5) * pitW * 0.52;
      obj.position.set(x, -B[i].bottom, z0 + Math.min(depthTread * 0.5, 0.5));
      obj.scale.setScalar(opts.findScale || 1.5);
      obj.visible = false;
      group.add(obj);
      finds.push({ key: f.key, layer: i, obj });
    });
  });

  // 後來挖的坑：貼在探坑左壁上的一塊深色填土，從 pit.from 那一層的頂挖到 pit.into 那一層裡面
  let intr = null;
  if (opts.pit) {
    const { from, into, find } = opts.pit;
    const yTop = B[from].top, yBot = B[into].top + L[into].thick * 0.62;
    const zc = (zOf(n - 1) + D / 2) / 2 + 0.1, w = 0.78;
    const fill = std({ map: soilTex('#2b2420', 55, 'soil') });
    const rim = std({ color: '#f1e3c2', roughness: 1 });
    const g = new Group();
    const body = new Mesh(new BoxGeometry(0.05, yBot - yTop - w / 2 + 0.01, w), fill);
    body.position.set(-pitW / 2 + 0.027, -(yTop + (yBot - yTop - w / 2) / 2), zc);
    const round = new Mesh(new CylinderGeometry(w / 2, w / 2, 0.05, 24, 1, false, 0, Math.PI), fill);
    round.rotation.set(0, 0, Math.PI / 2); round.rotation.x = Math.PI / 2;
    round.position.set(-pitW / 2 + 0.027, -(yBot - w / 2), zc);
    g.add(body, round);
    // 坑的輪廓：一圈淺色的線（考古學家在剖面上畫出來的界線）
    const rb = new Mesh(new BoxGeometry(0.04, yBot - yTop - w / 2 + 0.01, w + 0.09), rim);
    rb.position.copy(body.position); rb.position.x -= 0.004;
    const rr = new Mesh(new CylinderGeometry(w / 2 + 0.045, w / 2 + 0.045, 0.04, 28, 1, false, 0, Math.PI), rim);
    rr.rotation.copy(round.rotation); rr.position.copy(round.position); rr.position.x -= 0.004;
    g.add(rb, rr);
    const obj = makeFind(find.shape);
    obj.scale.setScalar(1.25);
    obj.rotation.z = -Math.PI / 2;
    obj.position.set(-pitW / 2 + 0.06, -(yBot - 0.42), zc);
    g.add(obj);
    g.visible = false;
    group.add(g);
    intr = { g, obj, key: find.key, yBot, zc, from, into };
  }

  // 現場的小道具：測量用的標竿（每格 0.5 公尺，紅白相間）、探坑四角的木樁與拉線
  const pole = new Group();
  const segH = 0.5 * scale, nSeg = Math.ceil(H / segH) + 1;
  for (let i = 0; i < nSeg; i++) {
    const m = new Mesh(new CylinderGeometry(0.035, 0.035, segH, 10), std({ color: i % 2 ? '#f3f1ea' : '#c8382c', roughness: 0.6 }));
    m.position.y = 0.5 * scale - segH * (i + 0.5) + 0.0; pole.add(m);
  }
  pole.position.set(pitW / 2 - 0.12, 0, D / 2 - 0.12);
  group.add(pole);
  const peg = (x, z) => { const m = new Mesh(new CylinderGeometry(0.03, 0.02, 0.3, 6), std({ color: '#d8c28a' })); m.position.set(x, 0.1, z); group.add(m); };
  const line = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const m = new Mesh(new CylinderGeometry(0.008, 0.008, len, 5), std({ color: '#fdfdf6', roughness: 0.5 }));
    m.position.set((x0 + x1) / 2, 0.2, (z0 + z1) / 2);
    m.rotation.set(x0 === x1 ? Math.PI / 2 : 0, 0, x0 === x1 ? 0 : Math.PI / 2);
    group.add(m);
  };
  const px = pitW / 2 + 0.12, pz = zBack - 0.12;
  peg(-px, pz); peg(px, pz); peg(-px, D / 2 - 0.05); peg(px, D / 2 - 0.05);
  line(-px, pz, px, pz); line(-px, pz, -px, D / 2 - 0.05); line(px, pz, px, D / 2 - 0.05);
  // 一把手鏟和一個水桶
  const trowel = new Group();
  const blade = new Mesh(new BoxGeometry(0.2, 0.012, 0.34), std({ color: '#b9bec4', metalness: 0.8, roughness: 0.3 }));
  blade.geometry.attributes.position.array.forEach((v, i, a) => { if (i % 3 === 0 && a[i + 2] > 0.1) a[i] = v * 0.1; });
  const handle = new Mesh(new CylinderGeometry(0.03, 0.035, 0.24, 10), std({ color: '#a5682a' }));
  handle.rotation.x = Math.PI / 2; handle.position.set(0, 0.05, -0.3);
  trowel.add(blade, handle); trowel.position.set(-pitW / 2 - 0.75, 0.02, 0.9); trowel.rotation.y = 0.7;
  const bucket = new Mesh(new CylinderGeometry(0.26, 0.2, 0.42, 18, 1, true), std({ color: '#3d6fa8', side: 2, roughness: 0.6 }));
  bucket.position.set(pitW / 2 + 0.8, 0.21, -0.9);
  const dirt = new Mesh(new SphereGeometry(0.24, 14, 8, 0, 7, 0, 1.2), mats[Math.min(1, n - 1)]);
  dirt.position.set(pitW / 2 + 0.8, 0.24, -0.9);
  group.add(trowel, bucket, dirt);
  group.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });

  let level = -1, intrOn = false;
  function setLevel(v) {
    level = Math.min(n, Math.max(0, v));
    const d = depthAt(L, level);
    plugs.forEach((p, i) => {
      const top = Math.max(B[i].top, d), h = B[i].bottom - top;
      p.visible = h > 0.004;
      if (!p.visible) return;
      p.scale.y = h; p.position.y = -top - h / 2;
      if (i === 0 && Array.isArray(p.material)) p.material[2] = d > 0.004 ? mats[0] : grass;
    });
    finds.forEach((f) => { f.obj.visible = d >= B[f.layer].bottom - 0.3; f.out = d >= B[f.layer].bottom - 1e-4; });
    if (intr) { intr.g.visible = intrOn; intr.obj.visible = intrOn && d >= intr.yBot - 0.5 - 1e-4; }
  }
  setLevel(0);
  return {
    group, layers: L, bounds: B, height: H,
    setLevel, level: () => level,
    finds: () => finds.map((f) => ({ key: f.key, layer: f.layer, visible: f.obj.visible })),
    visibleFinds: () => finds.filter((f) => f.out).map((f) => f.key),
    findAnchor(key, v) {
      const f = finds.find((x) => x.key === key);
      if (f) return v.copy(f.obj.position).add(new Vector3(0, 0.42, 0));
      if (intr && key === intr.key) return v.set(-DIM.pitW / 2 + 0.2, -(intr.yBot - 0.42), intr.zc);
      return null;
    },
    isFindVisible(key) {
      const f = finds.find((x) => x.key === key);
      if (f) return !!f.out;
      return !!(intr && key === intr.key && intr.obj.visible);
    },
    layerAnchor: (i, v) => v.set(-W / 2 + sideW * 0.5, -(B[i].top + L[i].thick / 2), D / 2 + 0.02),
    setIntrusion(on) { intrOn = !!on; setLevel(level); },
    intrusion: () => (intr ? { on: intrOn, key: intr.key, visible: intr.obj.visible } : null),
    intrusionAnchor: (v) => (intr ? v.set(-DIM.pitW / 2 + 0.75, -(B[intr.from].top + 0.3), intr.zc) : null),
    floorY: () => -depthAt(L, level),
  };
}
