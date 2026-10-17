/*
 * 台灣歷史 Taiwan's Story · 第五課的 3D 場景：1632 年前後的大員（熱蘭遮城）。
 * **示意，依據荷蘭國家博物館 RP-P-OB-75.470〈Gezicht op Fort Zeelandia op Taiwan, 1632〉這張版畫；
 * 不是測繪圖。** 比例、方位、建築細節都是看版畫推想的；版畫沒畫清楚的東西不加。
 *
 *   makeFort() → { group, anchor(key, v), setToday(t), tick(dt), spots }
 *     group      整個場景（海、沙丘、城、柵欄、岸邊的房子、船）。版畫只看得到城的前牆和兩個城角；後面的牆、另外兩個角和城裡的房子是推想
 *     anchor     每個重點（spots）的位置，給 HTML 標籤用
 *     setToday   0 ＝ 1632 年的樣子；1 ＝ 今天：海變成陸地、船不見、城只剩一段牆（臺南市政府：荷蘭時期只剩南邊的磚牆）
 *     tick       船輕輕地搖
 */
import {
  BoxGeometry, ConeGeometry, CylinderGeometry, Color, DoubleSide, ExtrudeGeometry, Group, Mesh, MeshStandardMaterial,
  PlaneGeometry, Shape, SphereGeometry, Vector3,
} from 'three';

const M = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, ...o });
const SEA = new Color(0x2f6f8f), LAND = new Color(0x8f8a66);

/** 一座稜堡：菱形往外突出的角（從上面看是一個五邊形） */
function bastion(mat, h) {
  const s = new Shape();
  s.moveTo(0, 0); s.lineTo(1.5, -0.35); s.lineTo(2.05, -2.05); s.lineTo(0.35, -1.5); s.lineTo(0, 0);
  const g = new ExtrudeGeometry(s, { depth: h, bevelEnabled: false });
  g.rotateX(-Math.PI / 2);
  return new Mesh(g, mat);
}

function house(w, d, h, wallMat, roofMat) {
  const g = new Group();
  const b = new Mesh(new BoxGeometry(w, h, d), wallMat); b.position.y = h / 2; b.castShadow = true; b.receiveShadow = true;
  const r = new Mesh(new CylinderGeometry(0.01, d * 0.62, w, 3, 1), roofMat);
  r.rotation.z = Math.PI / 2; r.rotation.x = Math.PI; r.scale.set(1, 1, 0.75); r.position.y = h + d * 0.22; r.castShadow = true;
  g.add(b, r);
  return g;
}

function ship(kind, mats) {
  const g = new Group();
  const hull = new Mesh(new BoxGeometry(2.2, 0.45, 0.7), mats.hull);
  hull.position.y = 0.12; hull.castShadow = true;
  const stern = new Mesh(new BoxGeometry(0.5, 0.4, 0.66), mats.hull); stern.position.set(kind === 'junk' ? 0.95 : -0.95, 0.5, 0);
  g.add(hull, stern);
  if (kind === 'junk') {
    // 中式帆船：兩根桅，帆是有橫條的硬帆（示意）
    [[0.25, 1.5], [-0.55, 1.1]].forEach(([x, h]) => {
      const mast = new Mesh(new CylinderGeometry(0.03, 0.03, h, 5), mats.mast); mast.position.set(x, 0.3 + h / 2, 0);
      const sail = new Mesh(new PlaneGeometry(0.7, h * 0.72), mats.mat); sail.position.set(x - 0.05, 0.35 + h * 0.52, 0.02);
      g.add(mast, sail);
    });
  } else {
    // 歐洲式的帆船：三根桅、方帆、船尾一面小旗（示意）
    [[0.6, 1.5], [0, 1.9], [-0.6, 1.3]].forEach(([x, h]) => {
      const mast = new Mesh(new CylinderGeometry(0.03, 0.03, h, 5), mats.mast); mast.position.set(x, 0.3 + h / 2, 0);
      g.add(mast);
      [0.42, 0.75].forEach((f, i) => {
        const sail = new Mesh(new PlaneGeometry(0.62 - i * 0.12, h * 0.26), mats.sail);
        sail.rotation.y = Math.PI / 2; sail.position.set(x, 0.3 + h * f, 0); g.add(sail);
      });
    });
    const flag = new Mesh(new PlaneGeometry(0.35, 0.22), mats.flag); flag.position.set(-1.05, 1.05, 0); flag.rotation.y = Math.PI / 2;
    g.add(flag);
  }
  return g;
}

export function makeFort() {
  const group = new Group();
  const mats = {
    sea: M(SEA.getHex(), { roughness: 0.35 }), sand: M(0xd9c79a), dune: M(0xcbb382), wall: M(0xb98f63), wallDark: M(0x9c7550),
    brick: M(0xa5573a), roof: M(0x7b3b2a), plaster: M(0xe8dcc4), wood: M(0x6b4a2b), mast: M(0x3a2a1a),
    hull: M(0x5a3a22), sail: M(0xf2ead8, { side: DoubleSide }), mat: M(0xc9a66b, { side: DoubleSide }), flag: M(0xd8553f, { side: DoubleSide }),
  };
  // 海（今天＝陸地）
  const sea = new Mesh(new PlaneGeometry(60, 40), mats.sea);
  sea.rotation.x = -Math.PI / 2; sea.position.y = -0.02; sea.receiveShadow = true;
  group.add(sea);
  // 沙洲：一條長長、低低的沙地；右邊一座較高的沙丘，城蓋在上面
  const bar = new Mesh(new BoxGeometry(31, 0.3, 9), mats.sand); bar.position.set(-1, 0.13, -4); bar.receiveShadow = true;
  const duneG = new SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const dune = new Mesh(duneG, mats.dune); dune.scale.set(7.2, 2.2, 5.4); dune.position.set(6, 0.25, -5); dune.receiveShadow = true;
  const dune2 = new Mesh(duneG, mats.dune); dune2.scale.set(5, 1.2, 3.6); dune2.position.set(-3, 0.25, -6); dune2.receiveShadow = true;
  group.add(bar, dune, dune2);

  // 城：前牆、兩個城角的圓頂小塔、正中的城門是版畫上看得到的；後牆、後面兩個稜堡、城裡的房子是推想
  const fort = new Group(); fort.position.set(6, 2.35, -5.6);
  const S = 2.6, H = 0.9;
  [[-S, 0, 0.18, 2 * S], [S, 0, 0.18, 2 * S], [0, -S, 2 * S, 0.18], [0, S, 2 * S, 0.18]].forEach(([x, z, w, d], i) => {
    const m = new Mesh(new BoxGeometry(w || 0.18, H, d || 0.18), i === 3 ? mats.wall : mats.wallDark);
    m.position.set(x, H / 2, z); m.castShadow = true; m.receiveShadow = true; fort.add(m);
  });
  // 牆頂的雉堞
  for (let i = -5; i <= 5; i++) {
    const c = new Mesh(new BoxGeometry(0.22, 0.18, 0.2), mats.wall); c.position.set(i * 0.45, H + 0.09, S); fort.add(c);
  }
  [[S, S, 0], [-S, S, -Math.PI / 2], [-S, -S, Math.PI], [S, -S, Math.PI / 2]].forEach(([x, z, r]) => {
    const b = bastion(mats.wall, H + 0.15); b.position.set(x, 0, z); b.rotation.y = r; b.castShadow = true; fort.add(b);
    const tw = new Group();
    const t = new Mesh(new CylinderGeometry(0.28, 0.32, 0.55, 12), mats.plaster); t.position.y = 0.27;
    const dome = new Mesh(new SphereGeometry(0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), mats.roof); dome.position.y = 0.55;
    const tip = new Mesh(new ConeGeometry(0.05, 0.25, 6), mats.roof); tip.position.y = 0.9;
    tw.add(t, dome, tip);
    const off = new Vector3(1.25, 0, 1.25).applyAxisAngle(new Vector3(0, 1, 0), r);
    tw.position.set(x + off.x, H + 0.15, z + off.z); fort.add(tw);
  });
  const gate = new Group();
  const gw = new Mesh(new BoxGeometry(0.9, 1.5, 0.5), mats.plaster); gw.position.y = 0.75;
  const gr = new Mesh(new ConeGeometry(0.62, 0.8, 4), mats.roof); gr.position.y = 1.9; gr.rotation.y = Math.PI / 4;
  const door = new Mesh(new BoxGeometry(0.42, 0.7, 0.05), mats.wood); door.position.set(0, 0.35, 0.27);
  gate.add(gw, gr, door); gate.position.set(0, 0, S); fort.add(gate);
  const inner = house(2.2, 1.6, 0.9, mats.plaster, mats.roof); inner.position.set(0, 0, -0.6); fort.add(inner);
  group.add(fort);
  // 今天還在的那一段磚牆（只當成「留下來的一段」的示意，不標方位）
  const remain = new Mesh(new BoxGeometry(2.2, 0.75, 0.25), mats.brick); remain.position.set(6, 2.4, -2.6); remain.castShadow = true; remain.visible = false;
  group.add(remain);

  // 柵欄：版畫上是橫過城前山坡的 V 字形木柵，兩側再沿著城往上圍（示意）
  const duneY = (x, z) => 0.25 + 2.2 * Math.sqrt(Math.max(0, 1 - ((x - 6) / 7.2) ** 2 - ((z + 5) / 5.4) ** 2));
  const pal = new Group();
  const post = (x, z) => { const p = new Mesh(new BoxGeometry(0.07, 0.45, 0.07), mats.wood); p.position.set(x, duneY(x, z) + 0.2, z); p.castShadow = true; pal.add(p); };
  [-1, 1].forEach((sd) => {
    for (let i = 0; i <= 12; i++) { const f = i / 12; post(6 + sd * (4.1 - f * 3.9), -2.7 + f * 1.5); }       // 從城角斜下到前面中間
    for (let i = 1; i <= 5; i++) { const f = i / 5; post(6 + sd * 4.1, -2.7 - f * 1.6); }                 // 沿著城的側邊往上
  });
  group.add(pal);

  // 岸邊的房子：版畫上城下方有一棟長長的房子，左邊有一棟兩層的大房子；再往左一排小房子
  const shoreLong = house(3.2, 1.1, 0.7, mats.plaster, mats.roof); shoreLong.position.set(12.6, 0.28, -0.6);
  const big = house(3.4, 1.8, 1.25, mats.plaster, mats.roof); big.position.set(-3.6, 0.28, -2.6);
  const town = new Group();
  [[-11, -3.4], [-10, -4.8], [-12.2, -4.6], [-9, -3.2], [-13.2, -3.4], [-11.2, -6]].forEach(([x, z], i) => {
    const h = house(1 + (i % 3) * 0.2, 0.8, 0.5, mats.plaster, mats.roof); h.position.set(x, 0.28, z); h.rotation.y = (i % 2) * 0.2; town.add(h);
  });
  group.add(shoreLong, big, town);

  // 船
  const ships = [
    { m: ship('euro', mats), x: 2, z: 5.5, r: 0.85 }, { m: ship('euro', mats), x: 9.5, z: 7.5, r: -0.75 },
    { m: ship('junk', mats), x: -5, z: 3.8, r: 0.25 }, { m: ship('junk', mats), x: -9.5, z: 6.5, r: -0.35 },
  ];
  ships.forEach((s) => { s.m.position.set(s.x, 0, s.z); s.m.rotation.y = s.r; group.add(s.m); });

  const spots = {
    fort: new Vector3(6, 5.6, -7.6), bastion: new Vector3(9.6, 4.2, -2.4), gate: new Vector3(6, 4.4, -2.6), palisade: new Vector3(8.6, 2.4, -1.8),
    shore: new Vector3(12.6, 1.7, -0.6), big: new Vector3(-3.6, 2.6, -2.6), town: new Vector3(-11, 1.4, -4.4),
    ship: new Vector3(2, 2.6, 5.5), junk: new Vector3(-5, 2.2, 3.8), remain: new Vector3(6, 3.4, -2.6),
  };
  let today = 0, time = 0;
  const fortParts = fort.children;
  function setToday(t) {
    today = t;
    mats.sea.color.copy(SEA).lerp(LAND, t);
    mats.sea.roughness = 0.35 + 0.55 * t;
    ships.forEach((s) => { s.m.visible = t < 0.5; });
    fortParts.forEach((p) => { p.visible = t < 0.5; });
    pal.visible = shoreLong.visible = big.visible = town.visible = t < 0.5;
    remain.visible = t >= 0.5;
  }
  function tick(dt) {
    time += dt;
    ships.forEach((s, i) => { s.m.rotation.z = Math.sin(time * 0.9 + i) * 0.03; s.m.position.y = Math.sin(time * 1.1 + i * 2) * 0.04; });
  }
  setToday(0);
  return {
    group, spots: Object.keys(spots), setToday, tick, today: () => today,
    anchor: (key, v) => v.copy(spots[key]),
    visible: (key) => (key === 'remain' ? today >= 0.5 : today < 0.5),
  };
}
