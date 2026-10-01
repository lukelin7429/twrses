/*
 * 晶片與半導體 · 第一課「什麼是半導體？」的 3D 模型（全部自繪示意，不是真實比例）。
 *
 * 一個機制：材料導不導電，看裡面有沒有「自由移動的電荷」。銅幾乎每個原子都放出一個自由電子；
 *   玻璃的電子全被原子抓住；純矽的電子也幾乎全部忙著「牽手」（共價鍵），所以很難導電——
 *   但只要把極少數矽原子換成磷（多一個電子，N 型）或硼（少一個電子＝電洞，P 型），導電能力就大增。
 *
 * 兩個視角（同一個 renderer，切換時換 group 的 visible）：
 *   cmp「三種材料」：地上三排測試器，由後到前是銅、玻璃、矽；每排一顆電池（左）、一塊材料、一顆 LED（右），
 *     電子從電池負極出發、由左往右穿過材料、經過 LED、從後面的電線回到正極。電線裡的電子速度 ∝ 測試器電流
 *     （chipcalc.js 的 ledLevel：3 V、紅色 LED、100 Ω、樣品 2 cm 長 1 cm²）。材料裡畫自由電荷：銅很多、
 *     玻璃沒有、純矽沒有、摻雜後的矽依摻雜量畫幾顆（電子往 + 走、電洞往 − 走）。
 *   atoms「矽的原子」：XY 平面上 7 × 5 個矽原子的平面示意（真的晶體是立體的鑽石結構），
 *     每個原子四根鍵、每根鍵兩個共用電子。N 型把兩個原子換成磷，多出來的電子自由亂走、有電時往 + 漂；
 *     P 型換成硼，有一根鍵少一個電子（電洞，粉紅圈）；有電時旁邊鍵上的電子跳進來，電洞就往 − 移。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。計算都在 chipcalc.js。
 * 產物：cd tools/chips && npm run build → assets/js/chip-doping.js
 * 除錯：document.querySelector('[data-chipdoping-lab]').__lab
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CanvasTexture, Color, CylinderGeometry, DirectionalLight, Group,
  HemisphereLight, InstancedMesh, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D,
  PerspectiveCamera, PointLight, Scene, SphereGeometry, Sprite, SpriteMaterial, SRGBColorSpace, TorusGeometry,
  Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import {
  AMT_MAX, RHO, atomsPerFreeCarrier, dopantsFromRatio, fmtBig, homeChips, ladderPos, ledLevel, oneInFromSlider,
  siConductivity, siResistivity, timesBetter,
} from './chipcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const ELEC = 0x58e1ff, HOLE = 0xff8fb8, P_COL = 0xff9a3c, B_COL = 0xb48cff, SI_COL = 0x8fa3bf;
const ROWS = [{ key: 'copper', z: -2.7 }, { key: 'glass', z: 0 }, { key: 'si', z: 2.7 }];
const SLAB = { x0: -2.1, x1: 2.1, h: 0.55, d: 1.1 };
const WIRE_V = 1.6;                       // 銅棒那排電線裡電子的速度（單位／秒）
const COLS = 7, LROWS = 5, D = 1.6;       // 原子格子
const AX = (c) => (c - (COLS - 1) / 2) * D;
const AY = (r) => ((LROWS - 1) / 2 - r) * D;
const DOPE_AT = [[2, 1], [4, 3]];         // 換掉的兩個原子（欄、列）
const HOP_T = 0.32;

const canvasTex = (draw, w = 64, h = 64) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
};
const glowTex = () => canvasTex((g) => {
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,90,70,.9)'); gr.addColorStop(1, 'rgba(255,40,30,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
});
const symTex = (sym, bg) => canvasTex((g, w, h) => {
  g.fillStyle = bg; g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#0b1326'; g.font = `800 ${w * 0.42}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(sym, w / 2, h / 2 + 2);
}, 128, 128);

const MSG = {
  cmp_pure: ['Same battery, same LED, three materials. In copper, electrons are free to move, so the LED lights up. In glass, every electron is held tight. Pure silicon is in between, but it conducts so poorly that the LED stays dark.',
    '同一顆電池、同一顆 LED，換三種材料。銅裡的電子可以自由移動，LED 就亮了；玻璃的電子全被抓得緊緊的；純矽介於兩者之間，可是導電太差，LED 還是不亮。'],
  cmp_n: ['Now the silicon has a little phosphorus in it. Each phosphorus atom brings one extra electron that is free to move, so the LED lights up. Slide “How much?” to change the amount.',
    '現在矽裡加了一點點磷。每個磷原子帶來一個可以自由移動的電子，LED 就亮了。拉「加多少？」滑桿，改變加進去的量。'],
  cmp_p: ['Now the silicon has a little boron in it. Each boron atom leaves a hole, an empty place where an electron is missing. Holes move the opposite way from electrons, and the LED lights up.',
    '現在矽裡加了一點點硼。每個硼原子留下一個「電洞」，也就是少了電子的空位。電洞移動的方向和電子相反，LED 也亮了。'],
  cmp_off: ['The power is off. Without a push from the battery, nothing flows, not even in copper.',
    '電源關了。沒有電池推動，什麼都不會流動，連銅也一樣。'],
  at_pure: ['Each silicon atom has four outer electrons, like four hands. It holds hands with four neighbors and shares two electrons in each bond. Every electron is busy holding on, so even with the battery on, nothing moves.',
    '每個矽原子外圈有四個電子，像四隻手。它和四個鄰居牽手，每一對手共用兩個電子。所有電子都忙著牽手，所以就算接上電池，也沒有東西在動。'],
  at_n: ['Phosphorus has five outer electrons. Four join the bonds, and the fifth has no bond to hold, so it is free to move. The battery pushes the free electrons toward the + side.',
    '磷外圈有五個電子：四個去牽手，第五個沒有手可以牽，就自由了。電池把這些自由電子推向「＋」那一邊。'],
  at_p: ['Boron has only three outer electrons, so one bond is missing an electron. That empty place is a hole. A nearby electron jumps into it and leaves a new hole behind, so the hole moves toward the − side.',
    '硼外圈只有三個電子，所以有一對手少了一個電子，這個空位就是「電洞」。旁邊的電子跳進來，又在原來的地方留下新的電洞，所以電洞往「−」那一邊移動。'],
  at_off_n: ['The power is off. The free electrons still wander, but in every direction, so there is no current.',
    '電源關了。自由電子還是到處亂跑，可是方向亂七八糟，所以沒有電流。'],
  at_off_p: ['The power is off. The holes still drift around at random, but they do not go anywhere in particular, so there is no current.',
    '電源關了。電洞還是會隨機移動，可是沒有固定方向，所以沒有電流。'],
  at_off_pure: ['The power is off, and pure silicon has almost no free electrons anyway. Everything stays put.',
    '電源關了；何況純矽本來就幾乎沒有自由電子，什麼都不會動。'],
};

function polyline(pts) {
  const segs = []; let L = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], l = a.distanceTo(b);
    segs.push({ a, b, l, s0: L }); L += l;
  }
  return {
    L,
    at(s, out) {
      s = ((s % L) + L) % L;
      let k = 0; while (k < segs.length - 1 && s > segs[k].s0 + segs[k].l) k++;
      const g = segs[k];
      return out.lerpVectors(g.a, g.b, g.l ? (s - g.s0) / g.l : 0);
    },
  };
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0b1326);
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 40;
  scene.add(new HemisphereLight(0xe6efff, 0x1a2230, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const sun = new DirectionalLight(0xffffff, 1.4); sun.position.set(-4, 10, 7); scene.add(sun);
  const elGeo = new SphereGeometry(0.075, 10, 8);
  const elMat = new MeshBasicMaterial({ color: ELEC });
  const holeGeo = new TorusGeometry(0.1, 0.032, 6, 18);
  const holeMat = new MeshBasicMaterial({ color: HOLE });
  const dummy = new Object3D();
  const glow = glowTex();

  // =====================================================================
  // 視角一：三種材料
  // =====================================================================
  const cmpG = new Group(); scene.add(cmpG);
  const floor = new Mesh(new BoxGeometry(12.4, 0.12, 8.6), new MeshStandardMaterial({ color: 0x16223a, roughness: 0.85 }));
  cmpG.add(at(floor, -0.3, -0.06, 0));
  const slabMat = {
    copper: new MeshStandardMaterial({ color: 0xc8743a, metalness: 0.75, roughness: 0.3, transparent: true, opacity: 0.62, depthWrite: false }),
    glass: new MeshStandardMaterial({ color: 0xbfe6ff, metalness: 0.0, roughness: 0.05, transparent: true, opacity: 0.28, depthWrite: false }),
    si: new MeshStandardMaterial({ color: 0x6f7f99, metalness: 0.65, roughness: 0.22, transparent: true, opacity: 0.6, depthWrite: false, emissive: 0x000000 }),
  };
  const wireMat = new MeshStandardMaterial({ color: 0x3b4a66, roughness: 0.5, metalness: 0.3 });
  const tube = (a, b, r = 0.045, mat = wireMat) => {
    const len = a.distanceTo(b);
    const m = new Mesh(new CylinderGeometry(r, r, len, 8), mat);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
    return m;
  };
  const rows = ROWS.map(({ key, z }) => {
    const g = new Group(); cmpG.add(g);
    const slab = new Mesh(new BoxGeometry(SLAB.x1 - SLAB.x0, SLAB.h, SLAB.d), slabMat[key]);
    g.add(at(slab, 0, SLAB.h / 2, z));
    // 電池（橫躺：左邊＋、右邊−）
    const bat = new Group(); g.add(at(bat, -4.5, 0.36, z));
    const body = new Mesh(new CylinderGeometry(0.34, 0.34, 1.5, 24), new MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.5, metalness: 0.3 }));
    body.rotation.z = Math.PI / 2; bat.add(body);
    const cap = new Mesh(new CylinderGeometry(0.345, 0.345, 0.5, 24), new MeshStandardMaterial({ color: 0xd8a640, roughness: 0.4, metalness: 0.5 }));
    cap.rotation.z = Math.PI / 2; bat.add(at(cap, -0.5, 0, 0));
    const nub = new Mesh(new CylinderGeometry(0.12, 0.12, 0.12, 12), new MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.8, roughness: 0.3 }));
    nub.rotation.z = Math.PI / 2; bat.add(at(nub, -0.81, 0, 0));
    // LED
    const ledX = 3.7;
    const ledBase = new Mesh(new CylinderGeometry(0.2, 0.2, 0.12, 16), new MeshStandardMaterial({ color: 0x9aa3b4, metalness: 0.6, roughness: 0.35 }));
    g.add(at(ledBase, ledX, 0.62, z));
    const ledMat = new MeshStandardMaterial({ color: 0x8a1f1a, roughness: 0.2, transparent: true, opacity: 0.85, emissive: 0xff3a2a, emissiveIntensity: 0 });
    const dome = new Mesh(new SphereGeometry(0.18, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), ledMat);
    const stem = new Mesh(new CylinderGeometry(0.18, 0.18, 0.2, 18), ledMat);
    g.add(at(stem, ledX, 0.78, z)); g.add(at(dome, ledX, 0.88, z));
    const spr = new Sprite(new SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0 }));
    g.add(at(spr, ledX, 0.86, z)); spr.scale.setScalar(0.01);
    const pl = new PointLight(0xff4a3a, 0, 4); g.add(at(pl, ledX, 1.1, z));
    // 電線與電子路徑（從電池負極開始，順時針從上往下看）
    const yw = 0.3, zb = z - 0.85;
    const pts = [V(-3.75, 0.36, z), V(SLAB.x0, yw, z), V(SLAB.x1, yw, z), V(ledX - 0.05, 0.62, z), V(ledX + 0.4, yw, z),
      V(ledX + 0.4, yw, zb), V(-5.75, yw, zb), V(-5.75, 0.36, z), V(-5.3, 0.36, z)];
    for (let i = 0; i < pts.length - 1; i++) if (i !== 1) g.add(tube(pts[i], pts[i + 1]));
    const clipMat = new MeshStandardMaterial({ color: 0xc23b30, roughness: 0.4, metalness: 0.4 });
    g.add(at(new Mesh(new BoxGeometry(0.16, 0.2, 0.3), clipMat), SLAB.x0 + 0.05, SLAB.h + 0.02, z));
    g.add(at(new Mesh(new BoxGeometry(0.16, 0.2, 0.3), new MeshStandardMaterial({ color: 0x222831, roughness: 0.4 })), SLAB.x1 - 0.05, SLAB.h + 0.02, z));
    const path = polyline(pts);
    const segL = pts.map((p, i) => p.distanceTo(pts[(i + 1) % pts.length]));
    const sSlab0 = segL[0], sSlab1 = segL[0] + segL[1];
    const sBat0 = path.L - segL[pts.length - 1];
    const NW = 54;
    const wireE = new InstancedMesh(elGeo, elMat, NW); g.add(wireE);
    // 材料裡的自由電荷
    const NF = 60;
    const freeE = new InstancedMesh(elGeo, elMat, NF); freeE.count = 0; g.add(freeE);
    const freeH = new InstancedMesh(holeGeo, holeMat, NF); freeH.count = 0; g.add(freeH);
    const free = Array.from({ length: NF }, () => ({
      p: V(MathUtils.randFloat(SLAB.x0 + 0.1, SLAB.x1 - 0.1), MathUtils.randFloat(0.08, SLAB.h - 0.08), z + MathUtils.randFloat(-0.45, 0.45)),
      v: V(MathUtils.randFloatSpread(1), MathUtils.randFloatSpread(1), MathUtils.randFloatSpread(1)),
    }));
    return { key, z, g, slab, ledMat, spr, pl, path, sSlab0, sSlab1, sBat0, wireE, NW, freeE, freeH, free, phase: 0, level: 0 };
  });

  // =====================================================================
  // 視角二：矽的原子格子（平面示意）
  // =====================================================================
  const atG = new Group(); scene.add(atG); atG.visible = false;
  const siTex = symTex('Si', '#9fb3d1'), pTex = symTex('P', '#ffb46b'), bTex = symTex('B', '#c9a8ff');
  const atomGeo = new SphereGeometry(0.4, 24, 16);
  const atomMat = { si: new MeshStandardMaterial({ color: SI_COL, metalness: 0.4, roughness: 0.35 }),
    p: new MeshStandardMaterial({ color: P_COL, metalness: 0.2, roughness: 0.4, emissive: 0x5a2a00, emissiveIntensity: 0.4 }),
    b: new MeshStandardMaterial({ color: B_COL, metalness: 0.2, roughness: 0.4, emissive: 0x2a1060, emissiveIntensity: 0.4 }) };
  const atoms = [];
  for (let r = 0; r < LROWS; r++) for (let c = 0; c < COLS; c++) {
    const m = new Mesh(atomGeo, atomMat.si); atG.add(at(m, AX(c), AY(r), 0));
    const s = new Sprite(new SpriteMaterial({ map: siTex, transparent: true, depthTest: false })); s.scale.setScalar(0.5); s.renderOrder = 3;
    atG.add(at(s, AX(c), AY(r), 0.45));
    atoms.push({ c, r, m, s, kind: 'si' });
  }
  const atomAt = (c, r) => atoms[r * COLS + c];
  const bondMat = new MeshStandardMaterial({ color: 0x5f7290, roughness: 0.5, metalness: 0.2 });
  const stubMat = new MeshStandardMaterial({ color: 0x5f7290, roughness: 0.5, transparent: true, opacity: 0.45 });
  const bonds = [];
  const STUB = 0.75;
  function addBond(a, b, horiz, stub) {
    const m = tube(a, b, 0.05, stub ? stubMat : bondMat); atG.add(m);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    if (stub) mid.lerpVectors(a, b, 0.62);
    const off = horiz ? V(0, 0.15, 0.06) : V(0.15, 0, 0.06);
    const slots = [mid.clone().add(off), mid.clone().sub(off)];
    const bd = { mid, slots, e: [null, null], horiz, stub, atoms: [] };
    bonds.push(bd); return bd;
  }
  for (let r = 0; r < LROWS; r++) for (let c = 0; c < COLS; c++) {
    const p = V(AX(c), AY(r), 0);
    if (c < COLS - 1) addBond(p, V(AX(c + 1), AY(r), 0), true, false).atoms.push(atomAt(c, r), atomAt(c + 1, r));
    if (r < LROWS - 1) addBond(p, V(AX(c), AY(r + 1), 0), false, false).atoms.push(atomAt(c, r), atomAt(c, r + 1));
    if (c === 0) addBond(p, V(AX(c) - STUB, AY(r), 0), true, true).atoms.push(atomAt(c, r));
    if (c === COLS - 1) addBond(p, V(AX(c) + STUB, AY(r), 0), true, true).atoms.push(atomAt(c, r));
    if (r === 0) addBond(p, V(AX(c), AY(r) + STUB, 0), false, true).atoms.push(atomAt(c, r));
    if (r === LROWS - 1) addBond(p, V(AX(c), AY(r) - STUB, 0), false, true).atoms.push(atomAt(c, r));
  }
  const bondE = [];
  const bondElMat = new MeshBasicMaterial({ color: ELEC });
  const bondElGeo = new SphereGeometry(0.1, 12, 10);
  for (const bd of bonds) for (let k = 0; k < 2; k++) {
    const m = new Mesh(bondElGeo, bondElMat); atG.add(m); m.position.copy(bd.slots[k]);
    bd.e[k] = m; bondE.push(m);
  }
  // 兩邊的電極（電源開時才亮）
  const xL = AX(0) - STUB - 0.55, xR = AX(COLS - 1) + STUB + 0.55, H = (LROWS - 1) * D + 2 * STUB + 0.6;
  const elecMat = (c) => new MeshStandardMaterial({ color: c, roughness: 0.4, metalness: 0.5, emissive: c, emissiveIntensity: 0.25 });
  const plateL = at(new Mesh(new BoxGeometry(0.22, H, 1.0), elecMat(0x3f7fe0)), xL, 0, 0); atG.add(plateL);
  const plateR = at(new Mesh(new BoxGeometry(0.22, H, 1.0), elecMat(0xe0474c)), xR, 0, 0); atG.add(plateR);
  // 自由電子（N 型）與電洞（P 型）
  const FE = [];
  const feMat = new MeshBasicMaterial({ color: 0xbaf4ff });
  const feGlow = new SpriteMaterial({ map: canvasTex((g2) => {
    const gr = g2.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(160,240,255,.9)'); gr.addColorStop(1, 'rgba(88,225,255,0)');
    g2.fillStyle = gr; g2.fillRect(0, 0, 64, 64);
  }), transparent: true, depthWrite: false, blending: AdditiveBlending });
  const holeRingGeo = new TorusGeometry(0.13, 0.035, 8, 24);
  const holeRingMat = new MeshBasicMaterial({ color: HOLE });
  const holes = [];   // { bd, k, ring }
  let hop = null;     // 正在跳的電子 { m, from, to, t, holeIdx, fromBd, fromK }
  const fx = { xmin: xL + 0.25, xmax: xR - 0.25, ymin: AY(LROWS - 1) - 0.7, ymax: AY(0) + 0.7 };

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    copper: lab.add('cp-lb cp-lb-cu', 'Copper · conductor<small>銅：導體</small>'),
    glass: lab.add('cp-lb cp-lb-gl', 'Glass · insulator<small>玻璃：絕緣體</small>'),
    si: lab.add('cp-lb cp-lb-si', 'Silicon · semiconductor<small>矽：半導體</small>'),
    bat: lab.add('cp-lb', '3-volt battery<small>3 伏特電池</small>'),
    led: lab.add('cp-lb cp-lb-led', 'LED<small>發光二極體</small>'),
    same: lab.add('cp-lb cp-lb-note', 'Same battery, same LED<small>同樣的電池、同樣的 LED</small>'),
    four: lab.add('cp-lb cp-lb-si', 'Silicon: 4 hands<small>矽：四隻手</small>'),
    pair: lab.add('cp-lb cp-lb-el', 'Each bond: 2 shared electrons<small>每對手共用 2 個電子</small>'),
    dope: lab.add('cp-lb cp-lb-p', ''),
    hole: lab.add('cp-lb cp-lb-h', 'Hole<small>電洞</small>'),
    free: lab.add('cp-lb cp-lb-el', 'Free electron<small>自由電子</small>'),
    minus: lab.add('cp-lb cp-lb-minus', '− side<small>接電池負極</small>'),
    plus: lab.add('cp-lb cp-lb-plus', '+ side<small>接電池正極</small>'),
    flat: lab.add('cp-lb cp-lb-note', 'Flat diagram · real crystal is 3D<small>平面示意，真的晶體是立體的</small>'),
  };

  // =====================================================================
  // 狀態與控制
  // =====================================================================
  const R = {
    amt: $('.cp-amt'), amtOut: $('.cp-amt-out'), amtRow: $('.cp-amt-row'), msg: $('.cp-msg'), play: $('.al-play'),
    free: $('.cp-free'), times: $('.cp-times'), led: $('.cp-led'), you: $('.cp-mk-you'),
  };
  const state = {
    view: 'cmp', dope: 'pure', amt: Number(R.amt ? R.amt.value : 50), power: true, labels: true, playing: true,
    focus: null, lastMsg: '', lastRead: '',
  };
  const N = () => dopantsFromRatio(oneInFromSlider(state.amt));
  const siRho = () => (state.dope === 'pure' ? siResistivity('pure') : siResistivity(state.dope, N()));

  // 依畫面比例算相機距離，讓整個場景（寬 w、高 h）剛好放得下
  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  function home(view) {
    if (view === 'atoms') return { p: V(0, -0.08, 1).normalize().multiplyScalar(fit(16.2, 11.2)), t: V(0, -0.25, 0) };
    const t = V(-0.9, -0.3, -0.4);
    return { p: V(0, 0.68, 0.73).normalize().multiplyScalar(fit(13.4, 8.6)).add(t), t };
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const goHome = (instant) => { const h = home(state.view); flyTo(h.p, h.t, instant); };

  function setView(v, instant) {
    if (v !== 'cmp' && v !== 'atoms') return;
    state.view = v;
    cmpG.visible = v === 'cmp'; atG.visible = v === 'atoms';
    controls.maxPolarAngle = v === 'cmp' ? Math.PI * 0.47 : Math.PI;
    root.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-view') === v ? 'true' : 'false'));
    root.classList.toggle('cp-atoms', v === 'atoms');
    goHome(instant);
  }

  function clearAtoms() {
    for (const a of atoms) { a.kind = 'si'; a.m.material = atomMat.si; a.s.material.map = siTex; }
    for (const bd of bonds) for (let k = 0; k < 2; k++) { bd.e[k].visible = true; bd.e[k].position.copy(bd.slots[k]); }
    // 讓每個電子回到自己的格子
    let i = 0; for (const bd of bonds) for (let k = 0; k < 2; k++) { bd.e[k] = bondE[i++]; bd.e[k].position.copy(bd.slots[k]); }
    for (const f of FE) { atG.remove(f.m); atG.remove(f.s); }
    FE.length = 0;
    for (const h of holes) atG.remove(h.ring);
    holes.length = 0; hop = null;
  }
  function setDope(d) {
    if (!['pure', 'n', 'p'].includes(d)) return;
    state.dope = d;
    clearAtoms();
    for (const [c, r] of DOPE_AT) {
      const a = atomAt(c, r);
      if (d === 'n') {
        a.kind = 'p'; a.m.material = atomMat.p; a.s.material.map = pTex;
        const m = new Mesh(new SphereGeometry(0.12, 12, 10), feMat);
        const s = new Sprite(feGlow); s.scale.setScalar(0.7);
        m.position.set(AX(c) + 0.45, AY(r) + 0.45, 0.3); s.position.copy(m.position);
        atG.add(m); atG.add(s);
        FE.push({ m, s, v: V(MathUtils.randFloatSpread(1), MathUtils.randFloatSpread(1), 0) });
      } else if (d === 'p') {
        a.kind = 'b'; a.m.material = atomMat.b; a.s.material.map = bTex;
        // 硼只有三個電子：右邊那根鍵少一個
        const bd = bonds.find((b) => b.horiz && !b.stub && b.atoms[0] === a);
        bd.e[0].visible = false; const freed = bd.e[0]; bd.e[0] = null; freed.userData.spare = true;
        const ring = new Mesh(holeRingGeo, holeRingMat); ring.position.copy(bd.slots[0]); atG.add(ring);
        holes.push({ bd, k: 0, ring });
      }
    }
    for (const a of atoms) a.s.material.needsUpdate = true;
    slabMat.si.emissive.setHex(d === 'n' ? 0x0b3a66 : d === 'p' ? 0x4a1440 : 0x000000);
    slabMat.si.emissiveIntensity = d === 'pure' ? 0 : 0.6;
    root.querySelectorAll('[data-dope]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-dope') === d ? 'true' : 'false'));
    if (R.amt) R.amt.disabled = d === 'pure';
    if (R.amtRow) R.amtRow.classList.toggle('off', d === 'pure');
    updateCmpLevels();
  }
  function setAmt(v) {
    state.amt = Math.max(0, Math.min(AMT_MAX, Math.round(v)));
    if (R.amt) { R.amt.value = state.amt; R.amt.style.setProperty('--p', `${(state.amt / AMT_MAX) * 100}%`); }
    updateCmpLevels();
  }
  function setPower(v) {
    state.power = v;
    const t = $('[data-t="power"]'); if (t) t.checked = v;
    root.classList.toggle('cp-off', !v);
    updateCmpLevels();
  }
  function updateCmpLevels() {
    const rho = { copper: RHO.copper, glass: RHO.glass, si: siRho() };
    for (const row of rows) row.level = state.power ? ledLevel(rho[row.key]) : 0;
    // 矽裡畫幾顆自由電荷：摻越多畫越多（對數）；銅畫滿
    const k = Math.log10(oneInFromSlider(state.amt));
    const siCount = state.dope === 'pure' ? 0 : Math.round(3 + ((11 - k) / 7) * 37);
    for (const row of rows) {
      const n = row.key === 'copper' ? 60 : row.key === 'glass' ? 0 : siCount;
      const holesHere = row.key === 'si' && state.dope === 'p';
      row.freeE.count = holesHere ? 0 : n;
      row.freeH.count = holesHere ? n : 0;
    }
  }
  function focus(k) { state.focus = k; state.focusT = 0; }

  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.getAttribute('data-view'))));
  root.querySelectorAll('[data-dope]').forEach((b) => b.addEventListener('click', () => setDope(b.getAttribute('data-dope'))));
  if (R.amt) R.amt.addEventListener('input', () => setAmt(Number(R.amt.value)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="power"]', setPower);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));

  // =====================================================================
  // 每格
  // =====================================================================
  const tmp = V(0, 0, 0);
  const bias = () => (state.power ? 1 : 0);
  function stepCmp(dt) {
    for (const row of rows) {
      row.phase += dt * WIRE_V * row.level;
      for (let i = 0; i < row.NW; i++) {
        const s = ((i / row.NW) * row.path.L + row.phase) % row.path.L;
        row.path.at(s, tmp);
        const hide = (s > row.sSlab0 + 0.02 && s < row.sSlab1 - 0.02) || s > row.sBat0 + 0.05;
        dummy.position.copy(tmp);
        dummy.scale.setScalar(hide ? 0.0001 : 1);
        dummy.updateMatrix(); row.wireE.setMatrixAt(i, dummy.matrix);
      }
      row.wireE.instanceMatrix.needsUpdate = true;
      // 材料裡的自由電荷：熱運動（亂跑）＋有電時漂移
      const n = Math.max(row.freeE.count, row.freeH.count);
      const sign = row.freeH.count ? -1 : 1;
      const drift = state.power ? 0.9 * sign : 0;
      const mesh = row.freeH.count ? row.freeH : row.freeE;
      for (let i = 0; i < n; i++) {
        const f = row.free[i];
        f.v.x += MathUtils.randFloatSpread(6) * dt; f.v.y += MathUtils.randFloatSpread(6) * dt; f.v.z += MathUtils.randFloatSpread(6) * dt;
        f.v.clampLength(0, 0.9);
        f.p.addScaledVector(f.v, dt); f.p.x += drift * dt;
        if (f.p.x > SLAB.x1 - 0.08) f.p.x = SLAB.x0 + 0.1; if (f.p.x < SLAB.x0 + 0.08) f.p.x = SLAB.x1 - 0.1;
        if (f.p.y < 0.07 || f.p.y > SLAB.h - 0.07) { f.v.y *= -1; f.p.y = MathUtils.clamp(f.p.y, 0.07, SLAB.h - 0.07); }
        if (Math.abs(f.p.z - row.z) > 0.48) { f.v.z *= -1; f.p.z = row.z + Math.sign(f.p.z - row.z) * 0.48; }
        dummy.position.copy(f.p); dummy.scale.setScalar(1);
        dummy.lookAt(camera.position);
        dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      // LED
      const lv = row.level;
      row.ledMat.emissiveIntensity = lv * 2.2;
      row.spr.material.opacity = Math.min(1, lv * 1.2);
      row.spr.scale.setScalar(0.2 + 1.6 * Math.sqrt(lv));
      row.pl.intensity = lv * 6;
      // 卡片按鈕要看的那一排：閃一下
      const isF = state.focus === row.key;
      row.slab.material.emissiveIntensity = row.key === 'si' && state.dope !== 'pure' ? 0.6 : 0;
      if (isF && state.focusT < 2.4) {
        row.slab.material.emissive && row.slab.material.emissive.setHex(row.key === 'si' && state.dope !== 'pure' ? row.slab.material.emissive.getHex() : 0xffd36e);
        row.slab.material.emissiveIntensity = 0.25 + 0.25 * Math.sin(state.focusT * 9);
      } else if (row.key !== 'si') row.slab.material.emissive.setHex(0x000000);
    }
  }
  function stepAtoms(dt) {
    // 自由電子
    for (const f of FE) {
      f.v.x += MathUtils.randFloatSpread(7) * dt; f.v.y += MathUtils.randFloatSpread(7) * dt;
      f.v.clampLength(0, 1.1);
      f.m.position.addScaledVector(f.v, dt);
      f.m.position.x += bias() * 1.0 * dt;
      const p = f.m.position;
      if (p.y < fx.ymin) { p.y = fx.ymin; f.v.y = Math.abs(f.v.y); }
      if (p.y > fx.ymax) { p.y = fx.ymax; f.v.y = -Math.abs(f.v.y); }
      if (p.x > fx.xmax) p.x = state.power ? fx.xmin : fx.xmax - 0.01, f.v.x = state.power ? f.v.x : -Math.abs(f.v.x);
      if (p.x < fx.xmin) { p.x = fx.xmin; f.v.x = Math.abs(f.v.x); }
      p.z = 0.32;
      f.s.position.copy(p);
    }
    // 電洞：旁邊鍵上的電子跳進來
    if (hop) {
      hop.t += dt / HOP_T;
      const k = Math.min(1, hop.t);
      hop.m.position.lerpVectors(hop.from, hop.to, MathUtils.smootherstep(k, 0, 1));
      hop.m.position.z += Math.sin(k * Math.PI) * 0.25;
      if (k >= 1) {
        const h = holes[hop.holeIdx];
        h.bd.e[h.k] = hop.m;
        h.bd = hop.fromBd; h.k = hop.fromK; h.bd.e[h.k] = null;
        h.ring.position.copy(h.bd.slots[h.k]);
        hop = null;
      }
    } else if (holes.length) {
      for (const h of holes) h.wait = (h.wait || 0) - dt;
      const idx = holes.findIndex((h) => h.wait <= 0);
      if (idx >= 0) startHop(idx);
    }
    for (const h of holes) { h.ring.lookAt(camera.position); h.ring.scale.setScalar(1 + 0.12 * Math.sin(perfT * 6)); }
    plateL.material.emissiveIntensity = state.power ? 0.5 : 0.05;
    plateR.material.emissiveIntensity = state.power ? 0.5 : 0.05;
  }
  function startHop(idx) {
    const h = holes[idx];
    h.wait = state.power ? 0.25 : 0.9;
    const neigh = bonds.filter((b) => b !== h.bd && !b.stub && b.atoms.some((a) => h.bd.atoms.includes(a)) && b.e[0] && b.e[1]
      && !holes.some((o) => o.bd === b));
    let cand = neigh;
    if (state.power) cand = neigh.filter((b) => b.mid.x < h.bd.mid.x - 0.3);   // 左邊（−那側）的電子往＋跳進來，所以電洞往左（−）走
    if (!cand.length) {
      if (state.power && h.bd.mid.x < AX(1)) {
        // 到了左邊緣：電洞被負極的電子填掉，右邊（正極）抽走一個電子，新的電洞從右邊出現
        const spare = h.bd.e[h.k] = bondE.find((m) => m.userData.spare);
        if (spare) { spare.userData.spare = false; spare.visible = true; spare.position.copy(h.bd.slots[h.k]); }
        const right = bonds.filter((b) => !b.stub && b.mid.x > AX(COLS - 2) && b.e[0] && b.e[1] && !holes.some((o) => o.bd === b));
        const nb = right[Math.floor(Math.random() * right.length)];
        if (!nb) return;
        const gone = nb.e[1]; gone.visible = false; gone.userData.spare = true; nb.e[1] = null;
        h.bd = nb; h.k = 1; h.ring.position.copy(nb.slots[1]);
      }
      return;
    }
    const b = cand[Math.floor(Math.random() * cand.length)];
    const fk = Math.random() < 0.5 ? 0 : 1;
    hop = { m: b.e[fk], from: b.slots[fk].clone(), to: h.bd.slots[h.k].clone(), t: 0, holeIdx: idx, fromBd: b, fromK: fk };
    b.e[fk] = null;
  }

  let perfT = 0;
  function step(dt) {
    if (state.playing) {
      perfT += dt; state.focusT = (state.focusT || 0) + dt;
      if (state.view === 'cmp') stepCmp(dt); else stepAtoms(dt);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = Math.min(1, Math.max(0, MathUtils.smootherstep(fly.t, 0, 1)));
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, cmp = state.view === 'cmp', atomsV = !cmp;
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    show(L.copper, on && cmp, V(0, SLAB.h + 0.35, rows[0].z));
    show(L.glass, on && cmp, V(0, SLAB.h + 0.35, rows[1].z));
    show(L.si, on && cmp, V(0, SLAB.h + 0.35, rows[2].z));
    show(L.bat, on && cmp && !narrow, V(-4.5, 0.9, rows[2].z));
    show(L.led, on && cmp && !narrow, V(3.7, 1.35, rows[2].z));
    show(L.same, on && cmp && !narrow, V(-0.3, 0, rows[2].z + 1.6));
    const a0 = atomAt(1, 3);
    show(L.four, on && atomsV, V(AX(1), AY(3) - 0.75, 0.4));
    show(L.pair, on && atomsV && !narrow, V(AX(5) + D / 2, AY(0) + 0.55, 0.3));
    const dIdx = DOPE_AT[0];
    const dHtml = state.dope === 'n' ? 'Phosphorus: 5 outer electrons<small>磷：外圈 5 個電子</small>'
      : state.dope === 'p' ? 'Boron: only 3<small>硼：只有 3 個</small>' : '';
    if (L.dope.innerHTML !== dHtml) L.dope.innerHTML = dHtml;
    show(L.dope, on && atomsV && !!dHtml, V(AX(dIdx[0]), AY(dIdx[1]) + 0.78, 0.4));
    const h = holes[0];
    show(L.hole, on && atomsV && !!h, h ? h.ring.position.clone().add(V(0, -0.45, 0.3)) : V(0, 0, 0));
    const f = FE[0];
    show(L.free, on && atomsV && !!f && !narrow, f ? f.m.position.clone().add(V(0, 0.42, 0)) : V(0, 0, 0));
    show(L.minus, on && atomsV && state.power, V(xL, -H / 2 - 0.45, 0.6));
    show(L.plus, on && atomsV && state.power, V(xR, -H / 2 - 0.45, 0.6));
    show(L.flat, on && atomsV && !narrow, V(0, -H / 2 - 0.45, 0.3));
    void a0;
  }

  // =====================================================================
  // 讀數
  // =====================================================================
  const cj = (zh) => (/[萬億兆]$/.test(zh) ? zh : `${zh} `);   // 「100 萬個」「3,700 個」
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    const oneIn = oneInFromSlider(state.amt);
    if (R.amtOut) {
      const f = fmtBig(oneIn);
      const t = state.dope === 'pure' ? 'none · 不加' : `1 in ${f.en} atoms · 每 ${cj(f.zh)}個原子換 1 個`;
      if (R.amtOut.textContent !== t) R.amtOut.textContent = t;
    }
    const sig = state.dope === 'pure' ? siConductivity('pure') : siConductivity(state.dope, N());
    if (R.you) R.you.style.left = `${(ladderPos(sig) * 100).toFixed(2)}%`;
    root.classList.toggle('cp-doped', state.dope !== 'pure');
    const per = atomsPerFreeCarrier(state.dope, N());
    const pf = fmtBig(per);
    const what = state.dope === 'p' ? ['hole', '電洞'] : ['free electron', '自由電子'];
    const free = `1 ${what[0]} per ${pf.en} atoms<small>每 ${cj(pf.zh)}個原子 1 個${what[1]}</small>`;
    const tb = state.dope === 'pure' ? null : fmtBig(timesBetter(state.dope, N()));
    const times = tb ? `× ${tb.en}<small>好 ${cj(tb.zh)}倍</small>` : '× 1<small>就是純矽</small>';
    const lv = rows[2].level;
    const led = !state.power ? 'Power off<small>電源關</small>' : lv > 0.6 ? 'Bright<small>亮</small>' : lv > 0.05 ? 'Dim<small>微亮</small>' : 'Dark<small>不亮</small>';
    const key = free + times + led;
    if (key !== state.lastRead) {
      state.lastRead = key;
      R.free.innerHTML = free; R.times.innerHTML = times; R.led.innerHTML = led;
      R.led.classList.toggle('on', state.power && lv > 0.05);
    }
    let mk;
    if (state.view === 'cmp') mk = !state.power ? 'cmp_off' : `cmp_${state.dope}`;
    else mk = state.power ? `at_${state.dope}` : `at_off_${state.dope}`;
    const m = MSG[mk];
    const html = `${esc(m[0])}<span class="zh">${esc(m[1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // =====================================================================
  // 迴圈
  // =====================================================================
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  let lastAspectBand = null;
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1.1 ? 42 : 34;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('cp-narrow', narrow);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== lastAspectBand) { lastAspectBand = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 刻度上的固定標記：玻璃、純矽、銅
  const MK = { glass: 1 / RHO.glass, pure: siConductivity('pure'), copper: 1 / RHO.copper };
  root.querySelectorAll('[data-mk]').forEach((el) => { el.style.left = `${(ladderPos(MK[el.getAttribute('data-mk')]) * 100).toFixed(2)}%`; });
  setView('cmp', true);
  setDope('pure');
  setAmt(state.amt);
  setPower(true);
  resize();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    compare: () => { setView('cmp'); setDope('pure'); setPower(true); setPlaying(true); focus('si'); },
    pure: () => { setView('atoms'); setDope('pure'); setPower(true); setPlaying(true); },
    phosphorus: () => { setView('atoms'); setDope('n'); setAmt(50); setPower(true); setPlaying(true); },
    boron: () => { setView('atoms'); setDope('p'); setAmt(50); setPower(true); setPlaying(true); },
    lit: () => { setView('cmp'); setDope('n'); setAmt(50); setPower(true); setPlaying(true); focus('si'); },
  };
  root.__lab = {
    camera, controls, state, rows, bonds, holes, FE, setView, setDope, setAmt, setPower, setPlaying, focus,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------------------------------------------------------------
// 頁面下方「你家有幾顆晶片？」：不需要 WebGL
// ---------------------------------------------------------------------
function initHome() {
  const box = document.querySelector('[data-chip-home]');
  if (!box) return;
  let items;
  try { items = JSON.parse(box.getAttribute('data-items')); } catch (e) { return; }
  const outs = box.querySelectorAll('.cp-home-total');
  const outThings = box.querySelectorAll('.cp-home-things');
  const bar = box.querySelector('.cp-home-bar i');
  const counts = {};
  function update() {
    box.querySelectorAll('[data-k]').forEach((row) => {
      const k = row.getAttribute('data-k');
      const cb = row.querySelector('input[type="checkbox"]');
      const qty = row.querySelector('.cp-qty');
      const q = cb.checked ? Math.max(1, Number(qty ? qty.value : 1) || 1) : 0;
      counts[k] = q;
      row.classList.toggle('on', cb.checked);
      if (qty) qty.disabled = !cb.checked;
    });
    const r = homeChips(items, counts);
    outs.forEach((el) => { el.textContent = r.total.toLocaleString('en-US'); });
    outThings.forEach((el) => { el.textContent = String(r.things); });
    if (bar) bar.style.width = `${Math.min(100, (r.total / 200) * 100)}%`;
  }
  box.addEventListener('change', update);
  box.addEventListener('input', update);
  update();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHome);
else initHome();

lazyBoot('[data-chipdoping-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
