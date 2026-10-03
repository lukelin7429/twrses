/*
 * 書法 · 寫字引擎的 3D 部分（three.js）：一枝會彎、會壓、會提的毛筆，一張墨會留在上面的宣紙，
 * 以及照筆畫資料寫字的「寫字員」。每一課共用；課程的入口檔只管場景、鏡頭與按鈕。
 *
 *   makeBrush(opt)              毛筆。group 的原點＝筆毛根部（筆斗下緣）的中心，筆桿往 +Y、筆毛往 −Y。
 *                               setPose({ d, dir, fan, spin }) 每格重算筆毛的形狀：
 *                                 d＝壓下去多深（世界單位，0＝筆尖剛碰紙），dir＝筆尖往哪拖（[x, z] 單位向量），
 *                                 fan＝把筆毛壓扁攤開（看「齊」），spin 不用。
 *                               筆毛的中心線＝往下的直線 → 四分之一圓 → 貼在紙上的直線，總長固定＝筆毛長 L；
 *                               貼紙的部分橫向攤開、上下壓扁。setInk(0–1) 蘸墨（從筆尖往上變黑），setHair('goat'|'mixed'|'weasel')。
 *   makePaper(opt)              宣紙：canvas 貼圖（紙色、纖維、米字格），墨畫在上面（不是 3D 幾何）。
 *                               box(x, y) → 世界座標；stamp(印子) 畫上去；clearInk()；setGrid(bool)。
 *   makeWriter(paper, char)     照筆畫資料寫字：poseAt(t) 回傳那一刻筆在紙上的位置、壓力、筆尖方向；
 *                               drawTo(t) 把到那一刻為止的墨跡畫上紙。多筆字在筆畫之間會提筆、在空中移過去。
 *   placeBrush(brush, paper, pose, hover)  把毛筆擺到 pose 的位置（筆桿直立，中鋒）
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾；紙平放在 y＝paper.y。字框的 y（往下）＝世界的 +Z（往觀眾）。
 */
import {
  BufferAttribute, BufferGeometry, CanvasTexture, Color, CylinderGeometry, DoubleSide, Group, Mesh,
  MeshStandardMaterial, PlaneGeometry, Quaternion, SRGBColorSpace, TorusGeometry, Vector3,
} from 'three';
import { BOX, HAIR, bendGeom, clamp, pressDepth, prepStroke, sampleAt, stamps, strokeDuration, tipTrail } from './brush.js';
import { drawBristles, drawGrid, drawStamps, paperBase } from './ink2d.js';

// =====================================================================
// 毛筆
// =====================================================================
const RINGS = 26, SEG = 20;

export function makeBrush({ L = 0.45, R = 0.07, handle = 2.0, hair = 'goat' } = {}) {
  const group = new Group();
  const handleG = new Group(); group.add(handleG);   // 筆桿這一組可以斜（側鋒），筆毛根部在原點不動
  // 筆桿（竹）、竹節、筆斗、筆尾與掛繩圈
  const bamboo = new MeshStandardMaterial({ color: 0xc9a466, roughness: 0.55, metalness: 0.02 });
  const node = new MeshStandardMaterial({ color: 0x9c7a44, roughness: 0.6 });
  const lacq = new MeshStandardMaterial({ color: 0x3a2216, roughness: 0.35, metalness: 0.1 });
  const hr = R * 0.78;
  const stick = new Mesh(new CylinderGeometry(hr * 0.92, hr, handle, 24), bamboo);
  stick.position.y = 0.16 + handle / 2; handleG.add(stick);
  for (const f of [0.38, 0.74]) { const n = new Mesh(new CylinderGeometry(hr * 1.06, hr * 1.06, 0.025, 24), node); n.position.y = 0.16 + handle * f; handleG.add(n); }
  const ferrule = new Mesh(new CylinderGeometry(hr * 1.04, R * 1.02, 0.18, 24), lacq);
  ferrule.position.y = 0.09; handleG.add(ferrule);
  const cap = new Mesh(new CylinderGeometry(hr * 0.95, hr * 0.92, 0.1, 24), lacq);
  cap.position.y = 0.16 + handle + 0.05; handleG.add(cap);
  const loop = new Mesh(new TorusGeometry(0.05, 0.008, 8, 24), new MeshStandardMaterial({ color: 0xb03a2e, roughness: 0.7 }));
  loop.position.y = 0.16 + handle + 0.14; handleG.add(loop);

  // 筆毛：RINGS 圈 × SEG 段，每格重算頂點
  const nV = RINGS * SEG + 1;
  const pos = new Float32Array(nV * 3), col = new Float32Array(nV * 3);
  const idx = [];
  for (let r = 0; r < RINGS - 1; r++) for (let s = 0; s < SEG; s++) {
    const a = r * SEG + s, b = r * SEG + ((s + 1) % SEG), c = a + SEG, d = b + SEG;
    idx.push(a, c, b, b, c, d);
  }
  const tipI = RINGS * SEG;
  for (let s = 0; s < SEG; s++) idx.push((RINGS - 1) * SEG + s, tipI, (RINGS - 1) * SEG + ((s + 1) % SEG));
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setAttribute('color', new BufferAttribute(col, 3));
  geo.setIndex(idx);
  const tuft = new Mesh(geo, new MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0, side: DoubleSide }));
  group.add(tuft);

  const state = { d: 0, dir: [-1, 0], fan: 0, ink: 0, hair, wet: 0, tilt: 0 };
  const Y = new Vector3(0, 1, 0), lean = new Vector3();
  const cHair = new Color(), cInk = new Color(0x141214), cTmp = new Color(), cCore = new Color(0x8a5a30);
  const radius = (u) => R * (1 + 0.35 * Math.sin(Math.PI * u)) * (1 - u) ** 0.65;

  function setPose(o = {}) {
    Object.assign(state, o);
    const d = clamp(state.d, 0, L * 0.85);
    const [dx, dz] = state.dir;
    const tilt = state.tilt || 0;
    const G = bendGeom(L, d, tilt);                    // 直線 b0 → 圓弧 rc → 貼紙 flat（brush.js，node 有測試）
    const ts = Math.sin(tilt), tc = Math.cos(tilt);
    const press = G.touch ? Math.min(1, (L - G.H / tc) / L) : 0;
    const sx = -dz, sz = dx;                           // 側向（垂直於筆尖方向的水平向量）
    // 筆桿往筆尖的反方向倒 tilt：筆桿的 +Y 轉到 (−dx·sin, cos, −dz·sin)
    lean.set(-dx * ts, tc, -dz * ts);
    handleG.quaternion.setFromUnitVectors(Y, lean);
    cHair.setHex(HAIR[state.hair].color);
    const a0 = -(Math.PI / 2 - tilt);                  // 第一段的方向角（在「筆尖方向—上下」平面裡）
    const c0x = G.b0 * ts - G.rc * Math.sin(a0), c0y = -G.b0 * tc + G.rc * Math.cos(a0);   // 圓弧的圓心
    for (let r = 0; r < RINGS; r++) {
      const u = r / (RINGS - 1);
      const a = u * L;
      // 中心線上的點（水平偏移 o、高度 y）與切線（to 水平分量、ty）
      let o, y, to, ty, onPaper;
      if (!G.touch || a <= G.b0) { o = a * ts; y = -a * tc; to = ts; ty = -tc; onPaper = 0; }
      else if (a <= G.b0 + G.arc) { const ph = a0 + (a - G.b0) / G.rc; o = c0x + G.rc * Math.sin(ph); y = c0y - G.rc * Math.cos(ph); to = Math.cos(ph); ty = Math.sin(ph); onPaper = Math.sin(((ph - a0) / -a0) * Math.PI / 2); }
      else { o = G.offset + (a - G.b0 - G.arc); y = -G.H; to = 1; ty = 0; onPaper = 1; }
      // 壓扁、攤開：貼紙的部分橫向變寬、上下變薄；fan 把整個下半部壓成扇形
      const rr = radius(u);
      const fanK = state.fan * u;
      const rSide = rr * (1 + 1.1 * press * onPaper + 2.6 * fanK);
      const rUp = rr * Math.max(0.12, 1 - 0.62 * press * onPaper - 0.85 * fanK);
      y += rUp * onPaper * 0.9;                        // 貼紙的部分浮在紙面上
      // 截面的「上」向量＝切線 × 側向
      const tx = dx * to, tz = dz * to;
      let ux = ty * sz - 0 * 0, uy = tz * sx - tx * sz, uz = 0 * 0 - ty * sx;
      const ul = Math.hypot(ux, uy, uz) || 1; ux /= ul; uy /= ul; uz /= ul;
      const cx = dx * o, cz = dz * o;
      // 顏色：筆尖往上蘸到墨；兼毫外白內褐
      const inkLine = 1 - state.ink * 0.72;
      for (let s = 0; s < SEG; s++) {
        const th = (s / SEG) * Math.PI * 2, c = Math.cos(th), sn = Math.sin(th);
        const k = (r * SEG + s) * 3;
        pos[k] = cx + sx * c * rSide + ux * sn * rUp;
        pos[k + 1] = y + uy * sn * rUp;
        pos[k + 2] = cz + sz * c * rSide + uz * sn * rUp;
        cTmp.copy(cHair);
        if (state.hair === 'mixed' && Math.sin(th * 7) > 0.2) cTmp.lerp(cCore, 0.55);
        if (state.hair === 'weasel') cTmp.multiplyScalar(0.75 + 0.35 * u);
        const inkK = clamp((u - inkLine) / 0.08);
        cTmp.lerp(cInk, inkK * 0.96);
        col[k] = cTmp.r; col[k + 1] = cTmp.g; col[k + 2] = cTmp.b;
      }
    }
    // 筆尖
    const last = (RINGS - 1) * SEG * 3;
    let ax = 0, ay = 0, az = 0;
    for (let s = 0; s < SEG; s++) { ax += pos[last + s * 3]; ay += pos[last + s * 3 + 1]; az += pos[last + s * 3 + 2]; }
    pos[tipI * 3] = ax / SEG; pos[tipI * 3 + 1] = ay / SEG - (d > 0 ? 0 : R * 0.05); pos[tipI * 3 + 2] = az / SEG;
    col[tipI * 3] = col[last]; col[tipI * 3 + 1] = col[last + 1]; col[tipI * 3 + 2] = col[last + 2];
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
  }
  setPose();
  return {
    group, tuft, L, R, handle, state, setPose,
    setInk: (v) => setPose({ ink: clamp(v) }),
    setHair: (k) => setPose({ hair: k }),
    /** 筆尖（筆毛最末端）在世界座標的位置 */
    tipWorld: (out = new Vector3()) => { tuft.updateWorldMatrix(true, false); return out.set(pos[tipI * 3], pos[tipI * 3 + 1], pos[tipI * 3 + 2]).applyMatrix4(tuft.matrixWorld); },
  };
}

// =====================================================================
// 宣紙（墨畫在 canvas 貼圖上）
// =====================================================================
export function makePaper({ w = 3.2, h = 3.8, x = 0, y = 0.02, z = 0, ppu = 360, box = 2.6, boxCenter = null, grid = true, color = '#f6f0e1' } = {}) {
  const CW = Math.round(w * ppu), CH = Math.round(h * ppu);
  const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
  const ink = document.createElement('canvas'); ink.width = CW; ink.height = CH;
  const base = document.createElement('canvas'); base.width = CW; base.height = CH;
  const g = cv.getContext('2d'), gi = ink.getContext('2d'), gb = base.getContext('2d');
  const tex = new CanvasTexture(cv); tex.colorSpace = SRGBColorSpace; tex.anisotropy = 4;
  const mesh = new Mesh(new PlaneGeometry(w, h), new MeshStandardMaterial({ map: tex, roughness: 0.92, metalness: 0 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, y, z);
  const bc = boxCenter || [x, z];
  // 字框 → 畫布像素
  const T = { k: (box * ppu) / BOX, ox: (bc[0] - box / 2 - (x - w / 2)) * ppu, oy: (bc[1] - box / 2 - (z - h / 2)) * ppu };
  let showGrid = grid;
  function drawBase() {
    paperBase(gb, CW, CH, { color, seed: 5, fiber: 0.45, edge: ppu * 0.04 });
    if (showGrid) drawGrid(gb, T.ox, T.oy, box * ppu, { lw: Math.max(2, ppu / 110), color: 'rgba(205,62,50,.72)' });
  }
  function compose() { g.drawImage(base, 0, 0); g.drawImage(ink, 0, 0); tex.needsUpdate = true; }
  drawBase(); compose();
  return {
    mesh, tex, canvas: cv, T, y, box,
    /** 字框座標 → 世界座標（紙面上） */
    world: (bx, by, out = new Vector3()) => out.set(bc[0] + (bx / BOX - 0.5) * box, y, bc[1] + (by / BOX - 0.5) * box),
    /** style.bristles：側鋒，筆毛一根根畫（飛白）；沒有就是中鋒的實心印子 */
    stampMany(sts, i0, i1, style = {}) {
      if (i1 <= i0) return;
      for (const gg of [gi, g]) {
        if (style.bristles) drawBristles(gg, sts, T, { i0, i1, bristles: style.bristles, dry: style.dry ?? 0.55 });
        else drawStamps(gg, sts, T, { i0, i1, soft: ppu / 150 });
      }
      tex.needsUpdate = true;
    },
    clearInk() { gi.clearRect(0, 0, CW, CH); compose(); },
    setGrid(v) { showGrid = v; drawBase(); compose(); },
  };
}

// =====================================================================
// 寫字員：照筆畫資料，時間 t → 筆在哪、壓多重；墨跡畫到紙上
// =====================================================================
const AIR = { up: 0.22, move: 0.4, down: 0.2 };   // 多筆字：提筆、在空中移過去、下筆（秒）

/**
 * opt.side：側鋒（tipTrail 的 side，弧度）；opt.tilt：筆桿斜幾度（弧度，給 placeBrush）；opt.bristles：側鋒的筆毛（畫飛白）
 */
export function makeWriter(paper, char, opt = {}) {
  const tr = { side: opt.side || 0 };
  const strokes = char.strokes.map((st) => {
    const s = prepStroke(st);
    return { st, s, sts: stamps(s, tr), trail: tipTrail(s, tr), dur: strokeDuration(s), drawn: 0 };
  });
  const segs = [];
  let T = 0;
  strokes.forEach((k, i) => {
    if (i > 0) { const air = AIR.up + AIR.move + AIR.down; segs.push({ air: true, a: strokes[i - 1], b: k, t0: T, t1: T + air }); T += air; }
    segs.push({ air: false, k, i, t0: T, t1: T + k.dur }); T += k.dur;
  });
  function trailAt(k, i) { return k.trail[Math.min(i, k.trail.length - 1)]; }
  return {
    strokes, duration: T,
    reset() { strokes.forEach((k) => { k.drawn = 0; }); },
    /** 每一筆在整個時間軸上從幾秒到幾秒（分段重播用） */
    spans: () => segs.filter((g) => !g.air).map((g) => ({ t0: g.t0, t1: g.t1, i: g.i })),
    /** t 秒時的姿勢：{ x, y（字框）, p, d（世界單位的壓深用 pressDepth）, dir, hover（筆尖離紙多高，0＝碰到）, phase, n（第幾筆）, f（這一筆走了幾成） } */
    poseAt(t) {
      const seg = segs.find((g) => t < g.t1) || segs[segs.length - 1];
      if (seg.air) {
        const a = seg.a.s[seg.a.s.length - 1], b = seg.b.s[0], u = clamp((t - seg.t0) / (seg.t1 - seg.t0));
        const up = AIR.up / (seg.t1 - seg.t0), dn = 1 - AIR.down / (seg.t1 - seg.t0);
        const m = clamp((u - up) / (dn - up));
        const mm = m * m * (3 - 2 * m);
        const hover = u < up ? u / up : u > dn ? (1 - u) / (1 - dn) : 1;
        const da = trailAt(seg.a, seg.a.trail.length - 1);
        return { x: a.x + (b.x - a.x) * mm, y: a.y + (b.y - a.y) * mm, p: 0, dir: [Math.cos(da), Math.sin(da)], hover, phase: -1, n: seg.b.st.n - 1, f: 0, tilt: opt.tilt || 0 };
      }
      const k = seg.k, q = sampleAt(k.s, clamp(t - seg.t0, 0, k.dur));
      const a = trailAt(k, q.i);
      return { x: q.x, y: q.y, p: q.p, dir: [Math.cos(a), Math.sin(a)], hover: 0, phase: q.phase, n: seg.i, f: q.s / (k.s[k.s.length - 1].s || 1), tilt: opt.tilt || 0 };
    },
    /** 把到 t 秒為止該有的墨跡畫上紙（只畫還沒畫過的） */
    drawTo(t) {
      for (const seg of segs) {
        if (seg.air) continue;
        const k = seg.k, local = t - seg.t0;
        let n = k.drawn;
        while (n < k.sts.length && k.sts[n].t <= local) n++;
        if (n > k.drawn) { paper.stampMany(k.sts, k.drawn, n, { bristles: opt.bristles }); k.drawn = n; }
      }
    },
  };
}

/** 筆毛彎下去時，貼紙的部分從筆桿正下方往筆尖方向偏多遠（brush.js 的 bendGeom） */
export const bendOffset = (L, d, tilt = 0) => bendGeom(L, d, tilt).offset;

/**
 * 把毛筆擺到寫字的姿勢，筆毛根部在紙面上方。中鋒筆桿直立；pose.tilt（側鋒）時筆桿往筆尖的反方向倒。
 * 筆桿走在前面、筆毛拖在後面：墨跡的圓頭（字框的那一點）在筆肚貼紙的地方，
 * 所以筆桿要往「筆尖的反方向」挪 bendOffset，筆肚才剛好蓋在墨跡上。
 * 筆斜了，筆毛要再往下一點才碰得到紙：根部高度＝L·cos(tilt) − 壓深。
 */
export function placeBrush(brush, paper, pose, hover = 0) {
  const w = paper.world(pose.x, pose.y);
  const tilt = pose.tilt || 0, L = brush.L;
  const press = pressDepth(pose.p) * L;
  const d = L - (L * Math.cos(tilt) - press);      // 給 setPose：根部高度 H＝L − d
  const o = bendOffset(L, d, tilt);
  brush.group.quaternion.identity();
  brush.group.position.set(w.x - pose.dir[0] * o, paper.y + 0.002 + (L - d) + hover, w.z - pose.dir[1] * o);
  brush.setPose({ d, dir: pose.dir, fan: 0, tilt });
  return press;
}
