/*
 * 美國政治 U.S. Government · 華盛頓的模型（每課共用）。
 *
 * 三棟建築的 3D 示意——國會大廈（立法，第一條）、白宮（行政，第二條）、最高法院（司法，第三條）——
 * 放在一張簡化的平面上。全部用基本形狀自己建模，沒有照片貼圖；認得出來就好，**不照比例**，
 * 三棟的距離與朝向也都簡化過（實際上白宮在國會大廈西北方約兩公里半，最高法院在國會大廈正東）。
 *
 *   makeDC() → {
 *     group,                      整個場景（加進 scene）
 *     buildings: { capitol, whitehouse, court }   每棟：{ group, pos:Vector3, focus:{ target, offset }, top }
 *     setGrow(key, 0–1)           一棟建築「長出來」的程度（0 只剩地基）
 *     focusOf(key)                鏡頭飛過去時要看的點與相對位置
 *     EXTENT                      場景大約的寬與深（鏡頭取景用）
 *   }
 *
 * 之後的課：講到哪一權就 flyTo 那一棟；要在建築上加東西（旗子、議場剖面、九張椅子）就加在 buildings[key].group 底下。
 */
import {
  BoxGeometry, CanvasTexture, CircleGeometry, ConeGeometry, CylinderGeometry, DoubleSide, ExtrudeGeometry, Group, Mesh,
  MeshStandardMaterial, PlaneGeometry, RepeatWrapping, SRGBColorSpace, Shape, SphereGeometry, Vector3,
} from 'three';

export const EXTENT = { w: 36, d: 24 };
export const SITES = {
  whitehouse: new Vector3(-9.2, 0, -1.6),
  capitol: new Vector3(0.6, 0, -1.2),
  court: new Vector3(10.4, 0, -2.2),
};

const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, ...o });

/** 一面有窗戶的牆：白底上幾排深色的窗 */
function windowTex(cols, rows, { bg = '#f1efe8', win = '#39445a', arch = false } = {}) {
  const c = document.createElement('canvas'); c.width = 64 * cols; c.height = 64 * rows;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = win;
  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) {
    const x = k * 64 + 22, y = r * 64 + 14;
    g.fillRect(x, y + (arch ? 8 : 0), 20, arch ? 30 : 38);
    if (arch) { g.beginPath(); g.arc(x + 10, y + 8, 10, Math.PI, 0); g.fill(); }
  }
  g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(0, c.height - 4, c.width, 4);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.wrapS = t.wrapT = RepeatWrapping;
  return t;
}
function wallMats(cols, rows, sideCols, opt) {
  const front = mat(0xffffff, { map: windowTex(cols, rows, opt) });
  const side = mat(0xffffff, { map: windowTex(sideCols, rows, opt) });
  const plain = mat(opt && opt.bg ? opt.bg : 0xf1efe8);
  return [side, side, plain, plain, front, front];   // BoxGeometry 的面：+x −x +y −y +z −z
}
function box(w, h, d, m, x = 0, y = 0, z = 0) {
  const o = new Mesh(new BoxGeometry(w, h, d), m); o.position.set(x, y + h / 2, z); return o;
}
function cyl(rt, rb, h, m, x = 0, y = 0, z = 0, seg = 24) {
  const o = new Mesh(new CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y + h / 2, z); return o;
}
/** 三角形的山牆（pediment）：寬 w、高 h、深 d，底邊中心在 (x, y, z)，尖端朝上、面向 +z */
function pediment(w, h, d, m, x = 0, y = 0, z = 0) {
  const s = new Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath();
  const o = new Mesh(new ExtrudeGeometry(s, { depth: d, bevelEnabled: false }), m);
  o.position.set(x, y, z - d / 2); return o;
}
/** 一排柱子：n 根，沿 x 排開，總寬 w */
function colonnade(g, n, w, h, r, m, x = 0, y = 0, z = 0) {
  for (let i = 0; i < n; i++) g.add(cyl(r * 0.86, r, h, m, x - w / 2 + (w * i) / (n - 1), y, z, 10));
}
function steps(g, w, d, n, rise, m, x, z) {
  for (let i = 0; i < n; i++) g.add(box(w + (n - i) * 0.12, rise, d * (1 - i / (n + 1)), m, x, i * rise, z + (d * (i / (n + 1))) / -2 + d / 2));
}

/** 國會大廈：中央主體＋兩翼（眾議院、參議院各一翼）＋柱廊＋圓頂。面向 +z。 */
function buildCapitol() {
  const g = new Group();
  const stone = mat(0xf1efe8), col = mat(0xfaf9f4), roof = mat(0xd9d7cd), dome = mat(0xf6f4ec, { roughness: 0.6 });
  g.add(box(9.8, 0.22, 3.4, mat(0xcfccc0)));                                   // 台基
  g.add(box(3.4, 1.35, 2.2, wallMats(7, 2, 4), 0, 0.22, 0));                   // 中央
  for (const s of [-1, 1]) {
    g.add(box(1.2, 1.0, 1.3, wallMats(3, 2, 2), s * 2.3, 0.22, -0.1));         // 連接廊
    g.add(box(2.5, 1.2, 2.5, wallMats(5, 2, 5), s * 3.65, 0.22, 0));           // 翼：左是參議院、右是眾議院（示意；從西面看，參議院在北翼＝左手邊，和第五課一致）
    g.add(box(2.6, 0.1, 2.6, roof, s * 3.65, 1.42, 0));
    colonnade(g, 6, 1.7, 0.95, 0.07, col, s * 3.65, 0.32, 1.42);
    g.add(box(1.95, 0.1, 0.4, stone, s * 3.65, 1.27, 1.38));
    g.add(pediment(1.95, 0.34, 0.4, stone, s * 3.65, 1.37, 1.38));
  }
  g.add(box(3.5, 0.1, 2.3, roof, 0, 1.57, 0));
  colonnade(g, 8, 2.5, 1.05, 0.08, col, 0, 0.32, 1.42);                        // 中央柱廊
  g.add(box(2.8, 0.12, 0.7, stone, 0, 1.37, 1.3));
  g.add(pediment(2.8, 0.5, 0.7, stone, 0, 1.49, 1.3));
  steps(g, 2.6, 1.1, 5, 0.064, mat(0xdcd9cc), 0, 1.75);
  // 圓頂：鼓座、一圈柱子、上層鼓座、圓頂、頂塔、塑像
  g.add(cyl(1.02, 1.08, 0.3, stone, 0, 1.67, 0, 32));
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; g.add(cyl(0.045, 0.05, 0.62, col, Math.cos(a) * 0.98, 1.97, Math.sin(a) * 0.98, 8)); }
  g.add(cyl(0.84, 0.84, 0.62, mat(0xe4e2d8), 0, 1.97, 0, 32));
  g.add(cyl(1.04, 1.04, 0.07, stone, 0, 2.59, 0, 32));
  g.add(cyl(0.8, 0.88, 0.34, wallMats(12, 1, 12, { arch: true })[4], 0, 2.66, 0, 32));
  const d = new Mesh(new SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), dome);
  d.scale.y = 1.32; d.position.y = 3.0; g.add(d);
  g.add(cyl(0.17, 0.2, 0.36, col, 0, 4.0, 0, 12));
  g.add(cyl(0.2, 0.2, 0.05, stone, 0, 4.36, 0, 12));
  const st = new Mesh(new ConeGeometry(0.075, 0.42, 10), mat(0x6f6a55, { roughness: 0.5 })); st.position.y = 4.62; g.add(st);
  return { group: g, top: 4.9, focus: { target: new Vector3(0, 1.7, 0), offset: new Vector3(-6.5, 6.4, 11.5) } };
}

/** 白宮：兩層的長方形主體、屋頂欄杆、南面半圓形的柱廊。面向 +z（南面）。 */
function buildWhiteHouse() {
  const g = new Group();
  const wall = { bg: '#fbfaf5', win: '#3a4558' };
  const white = mat(0xfbfaf5), col = mat(0xffffff), roof = mat(0xbfc4c4);
  g.add(box(5.2, 0.14, 3.0, mat(0x2f6a45)));                                    // 草地
  g.add(box(4.1, 0.2, 1.9, mat(0xe6e3d8), 0, 0.14, 0));
  g.add(box(3.9, 1.3, 1.7, wallMats(11, 2, 5, wall), 0, 0.34, 0));
  g.add(box(4.0, 0.08, 1.8, white, 0, 1.64, 0));
  g.add(box(3.95, 0.14, 0.05, white, 0, 1.72, 0.86)); g.add(box(3.95, 0.14, 0.05, white, 0, 1.72, -0.86));   // 欄杆
  g.add(box(0.05, 0.14, 1.75, white, 1.96, 1.72, 0)); g.add(box(0.05, 0.14, 1.75, white, -1.96, 1.72, 0));
  g.add(box(3.4, 0.12, 1.3, roof, 0, 1.72, 0));
  // 南面的半圓柱廊
  g.add(cyl(0.78, 0.82, 0.2, mat(0xe6e3d8), 0, 0.14, 0.85, 28));
  g.add(cyl(0.5, 0.5, 1.3, white, 0, 0.34, 0.85, 24));
  for (let i = 0; i < 6; i++) { const a = (i / 5) * Math.PI; g.add(cyl(0.05, 0.06, 1.22, col, Math.cos(a) * 0.7, 0.34, 0.85 + Math.sin(a) * 0.7, 10)); }
  g.add(cyl(0.8, 0.8, 0.1, white, 0, 1.56, 0.85, 28));
  // 北面的山牆柱廊（從背後看得到）
  colonnade(g, 4, 1.2, 1.22, 0.055, col, 0, 0.34, -1.25);
  g.add(box(1.5, 0.1, 0.5, white, 0, 1.56, -1.1));
  g.add(pediment(1.5, 0.32, 0.5, white, 0, 1.66, -1.1));
  for (const s of [-1, 1]) g.add(box(0.9, 0.5, 0.7, wallMats(3, 1, 2, wall), s * 2.45, 0.14, 0));              // 東西兩側低矮的廂房
  // 旗桿
  g.add(cyl(0.02, 0.02, 0.6, mat(0xdddddd), 0, 1.84, 0, 6));
  return { group: g, top: 2.6, focus: { target: new Vector3(0, 0.9, 0), offset: new Vector3(-1.2, 3.4, 9) } };
}

/** 最高法院：高台階、八根柱子的門廊、大山牆，後面一座更高的主體。面向 +z。 */
function buildCourt() {
  const g = new Group();
  const marble = mat(0xf4f2ec), col = mat(0xffffff), roof = mat(0xc9cbc6);
  g.add(box(5.6, 0.2, 4.6, mat(0xd6d3c8)));
  g.add(box(5.0, 0.95, 3.6, wallMats(9, 1, 7, { bg: '#f4f2ec' }), 0, 0.2, -0.3));  // 兩側較低的部分
  g.add(box(5.1, 0.07, 3.7, roof, 0, 1.15, -0.3));
  g.add(box(2.9, 1.75, 3.9, marble, 0, 0.2, -0.3));                                // 中央的大廳
  const gable = pediment(2.9, 0.5, 3.9, roof, 0, 1.95, -0.3); g.add(gable);
  steps(g, 3.0, 1.3, 7, 0.07, mat(0xe2dfd4), 0, 1.75);
  g.add(box(3.1, 0.5, 0.9, marble, 0, 0.2, 1.95));                                  // 門廊的台基
  colonnade(g, 8, 2.7, 1.2, 0.085, col, 0, 0.7, 2.25);
  colonnade(g, 8, 2.7, 1.2, 0.085, col, 0, 0.7, 1.85);
  g.add(box(3.05, 0.16, 0.95, marble, 0, 1.9, 2.0));
  g.add(pediment(3.05, 0.55, 0.95, marble, 0, 2.06, 2.0));
  return { group: g, top: 3.0, focus: { target: new Vector3(0, 1.1, 0.4), offset: new Vector3(1.4, 3.6, 10) } };
}

/** 地面：深色的平面、國家廣場的草地、兩條大道（都只是示意） */
function buildGround() {
  const g = new Group();
  const base = new Mesh(new PlaneGeometry(400, 400), mat(0x0d1b30, { roughness: 1 }));
  base.rotation.x = -Math.PI / 2; base.position.y = -0.02; g.add(base);
  const mall = new Mesh(new PlaneGeometry(11.5, 2.6), mat(0x1c4a36, { roughness: 1 }));
  mall.rotation.x = -Math.PI / 2; mall.position.set(-6.6, 0, 2.2); g.add(mall);
  const road = mat(0x2a3b57, { roughness: 1 });
  const ave = (x1, z1, x2, z2, w = 0.34) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const m = new Mesh(new PlaneGeometry(len, w), road);
    m.rotation.x = -Math.PI / 2; m.rotation.z = -Math.atan2(z2 - z1, x2 - x1);
    m.position.set((x1 + x2) / 2, 0.005, (z1 + z2) / 2); g.add(m);
  };
  ave(SITES.whitehouse.x + 2.4, SITES.whitehouse.z + 0.6, SITES.capitol.x - 4.6, SITES.capitol.z + 1.2);   // 賓夕法尼亞大道（示意）
  ave(SITES.capitol.x + 5.2, SITES.capitol.z - 0.3, SITES.court.x - 3, SITES.court.z + 0.4);
  const ellipse = new Mesh(new CircleGeometry(1.25, 40), mat(0x1c4a36, { roughness: 1 }));
  ellipse.rotation.x = -Math.PI / 2; ellipse.scale.y = 0.72; ellipse.position.set(SITES.whitehouse.x, 0.004, SITES.whitehouse.z + 3.1); g.add(ellipse);
  return g;
}

export function makeDC() {
  const group = new Group();
  group.add(buildGround());
  const make = { capitol: buildCapitol, whitehouse: buildWhiteHouse, court: buildCourt };
  const buildings = {};
  for (const key of Object.keys(make)) {
    const b = make[key]();
    const holder = new Group(); holder.position.copy(SITES[key]);
    // 地基永遠在；建築本體長在地基上
    const pad = box(key === 'capitol' ? 10.2 : key === 'court' ? 6.0 : 5.6, 0.06, key === 'capitol' ? 4.4 : key === 'court' ? 5.4 : 3.6, mat(0x3a4a66, { roughness: 1 }));
    pad.position.y = 0.0; holder.add(pad);
    b.group.position.y = 0.06; holder.add(b.group);
    group.add(holder);
    buildings[key] = { ...b, holder, pad, pos: SITES[key].clone(), grow: 1 };
  }
  function setGrow(key, k) {
    const b = buildings[key];
    b.grow = Math.min(1, Math.max(0, k));
    b.group.visible = b.grow > 0.002;
    // 由下往上長：高度先到，最後一點點才把寬度補滿，看起來像「立起來」
    const y = Math.max(0.001, b.grow);
    const xz = 0.9 + 0.1 * Math.min(1, b.grow * 1.6);
    b.group.scale.set(xz, y, xz);
  }
  function focusOf(key) {
    const b = buildings[key];
    return { target: b.pos.clone().add(b.focus.target), position: b.pos.clone().add(b.focus.target).add(b.focus.offset) };
  }
  return { group, buildings, setGrow, focusOf, EXTENT, SITES, materials: { mat }, DoubleSide };
}
