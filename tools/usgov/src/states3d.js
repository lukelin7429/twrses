/*
 * 美國政治 U.S. Government · 五十州地圖的 3D 版（每課共用）：每一州是一塊立起來的板子，高度與顏色可以代表一個數值；
 * 也可以切換成方塊地圖（每州一個方塊，面積和人口成正比）。
 *
 *   makeStates3D({ population }) → {
 *     group, meshes（Map abbr → mesh）, setValues(values, colors), setMode('map'|'tiles'), setLit(fn(abbr) → 0–1),
 *     tick(dt) → 還在動嗎, pick(raycaster) → abbr, centerOf(abbr) → Vector3, SIZE: { w, d }
 *   }
 * 座標：畫布的 1 個單位＝1/40 世界單位；地圖中心在原點，x 向東、z 向南（阿拉斯加與夏威夷在西南角，縮小過）。
 */
import { BoxGeometry, BufferGeometry, Color, ExtrudeGeometry, Group, LineBasicMaterial, LineLoop, Mesh, MeshStandardMaterial, Shape, Vector3 } from 'three';
import { getStates, popSide, ringArea, TILES, W, H } from './usmap.js';

const S = 1 / 40, CELL = 76;
const wx = (x) => (x - W / 2) * S, wz = (y) => (y - H / 2) * S;

export function makeStates3D(opt = {}) {
  const states = getStates();
  const group = new Group();
  const meshes = new Map(), tiles = new Map(), st = new Map();
  const pops = opt.population || null, maxPop = pops ? Math.max(...Object.values(pops)) : 1;
  const edgeMat = new LineBasicMaterial({ color: 0x0b1424, transparent: true, opacity: 0.85 });
  for (const s of states) {
    const shapes = s.rings.map((r) => {
      const pts = ringArea(r) > 0 ? r : r.slice().reverse();
      const sh = new Shape();
      pts.forEach(([x, y], i) => (i ? sh.lineTo(wx(x), -wz(y)) : sh.moveTo(wx(x), -wz(y))));
      return sh;
    });
    const geo = new ExtrudeGeometry(shapes, { depth: 1, bevelEnabled: false });
    const mat = new MeshStandardMaterial({ color: 0x3a4a66, roughness: 0.75, metalness: 0.05, emissive: 0x000000 });
    const m = new Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2; m.scale.z = 0.2; m.userData.abbr = s.abbr;
    // 只描頂面的外框（側面不描，海岸線很碎的州才不會變成一排柵欄）；線在本地 z＝1，跟著高度一起縮放
    for (const r of s.rings) {
      const pts = r.map(([x, y]) => new Vector3(wx(x), -wz(y), 1.001));
      m.add(new LineLoop(new BufferGeometry().setFromPoints(pts), edgeMat));
    }
    group.add(m); meshes.set(s.abbr, m);
    const [c, r] = TILES[s.abbr];
    const side = (pops && pops[s.abbr] ? popSide(pops[s.abbr], maxPop, CELL) : CELL * 0.86) * S;
    const tm = new Mesh(new BoxGeometry(side, 1, side), new MeshStandardMaterial({ color: 0x3a4a66, roughness: 0.7 }));
    tm.position.set(wx((W - 12 * CELL) / 2 + c * CELL + CELL / 2), 0, wz(2 + r * CELL + CELL / 2));
    tm.scale.y = 0.001; tm.visible = false; tm.userData.abbr = s.abbr;
    group.add(tm); tiles.set(s.abbr, tm);
    const [x0, y0, x1, y1] = s.bbox;
    st.set(s.abbr, { h: 0.2, hTo: 0.2, mode: 1, lit: 1, litTo: 1, color: new Color(0x3a4a66), center: new Vector3(wx((x0 + x1) / 2), 0, wz((y0 + y1) / 2)), tilePos: tm.position.clone() });
  }
  let mode = 'map', modeK = 0;   // 0 地圖、1 方塊
  const tmp = new Color();
  const api = {
    group, meshes, tiles, SIZE: { w: W * S, d: H * S },
    /** values：abbr → 0–1（高度）；colors：abbr → '#rrggbb' */
    setValues(heights, colors) {
      for (const [ab, o] of st) {
        o.hTo = heights[ab] == null ? 0.08 : 0.2 + 2.2 * heights[ab];
        o.color.set(colors[ab] || '#3a4660');
      }
    },
    setMode(m) { mode = m; },
    setLit(fn) { for (const [ab, o] of st) o.litTo = fn(ab); },
    centerOf(ab) { const o = st.get(ab); return (modeK > 0.5 ? o.tilePos : o.center).clone().setY(o.h); },
    tick(dt) {
      let moving = false;
      const app = (cur, to, rate) => { const d = to - cur; if (Math.abs(d) < 0.002) return to; moving = true; return cur + d * Math.min(1, dt * rate); };
      modeK = app(modeK, mode === 'tiles' ? 1 : 0, 4);
      for (const [ab, o] of st) {
        o.h = app(o.h, o.hTo, 5); o.lit = app(o.lit, o.litTo, 6);
        const m = meshes.get(ab), t = tiles.get(ab);
        m.scale.z = Math.max(0.001, o.h * (1 - modeK)); m.visible = modeK < 0.98;
        t.scale.y = Math.max(0.001, o.h * modeK); t.position.y = t.scale.y / 2; t.visible = modeK > 0.02;
        tmp.copy(o.color).multiplyScalar(0.35 + 0.65 * o.lit);
        m.material.color.copy(tmp); t.material.color.copy(tmp);
        m.material.emissive.copy(o.color).multiplyScalar(0.18 * o.lit); t.material.emissive.copy(m.material.emissive);
      }
      return moving;
    },
    pick(ray) {
      const list = modeK > 0.5 ? [...tiles.values()] : [...meshes.values()];
      const hit = ray.intersectObjects(list, false)[0];
      return hit ? hit.object.userData.abbr : null;
    },
  };
  return api;
}
