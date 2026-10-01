/*
 * 萬物原理 · 第一課「電池怎麼儲存電？」的 3D 鋰離子電池剖面（全部是自繪示意，不是真實比例）。
 *
 * 一個機制：電解液讓鋰離子通過、卻擋住電子，所以電子只能繞外面的電線走——那股電子流就是電。
 *
 * 座標（單位任意）：+X 往右、+Y 往上、+Z 朝向觀眾；正面是剖開的（真實電池是密封的）。
 *   左：銅箔（x≈-2.94）＋石墨負極（x -2.85…-0.75），六片石墨層、五道層間，每道 7 格 × 前後 2 排＝70 格
 *   中：電解液（整個內部）＋隔離膜（x = 0，有小孔）
 *   右：金屬氧化物正極（x 0.75…2.85，同樣 70 格）＋鋁箔（x≈2.94）
 *   上：電線從銅箔的極耳繞過燈泡（或充電器）接到鋁箔的極耳
 *
 * 規則（與 cell.js 相同，test/battery.test.mjs 檢查）：
 *   放電：一顆鋰離子離開石墨、穿過電解液與隔離膜、住進金屬氧化物；同時外面的電線剛好推過「一個電子的間距」。
 *   電線裡本來就塞滿電子，它們是一起往前挪（所以燈一接就亮），不是一顆電子從電池衝出去。
 *   充電：充電器把電子往回推，鋰離子跟著回到石墨。關掉開關：電子沒路走，離子也不動，電量就留著。
 *   老化：循環次數越多，越多鋰被困在石墨表面的薄殼（SEI，灰色）裡，充滿時能動的鋰變少。
 *
 * 產物：cd tools/science && npm run build → assets/js/battery.js
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CanvasTexture, CatmullRomCurve3, Color, ConeGeometry,
  CylinderGeometry, DirectionalLight, DoubleSide, EdgesGeometry, Group, HemisphereLight, InstancedMesh,
  LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D,
  PerspectiveCamera, PlaneGeometry, PointLight, RepeatWrapping, Scene, SphereGeometry, Sprite, SpriteMaterial,
  SRGBColorSpace, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { SITES, LAYERS, ROW, DEPTH, voltage, capacity, movable, split } from './cell.js';

const V = (x, y, z) => new Vector3(x, y, z);
const LI = new Color(0xffc94a);        // 能動的鋰
const STUCK = new Color(0x7d828c);     // 困在 SEI 裡的鋰
const ELEC = 0x58e1ff;                 // 電子
const T0 = 1.8;                        // 一顆離子穿過去要幾秒（Normal 速度）
const GAP = 0.27;                      // 停車格的間距
const SHEET_Y = [-1.35, -0.81, -0.27, 0.27, 0.81, 1.35];
const GAP_Y = SHEET_Y.slice(0, -1).map((y, i) => (y + SHEET_Y[i + 1]) / 2);

function siteXYZ(side, i) {
  const L = Math.floor(i / (ROW * DEPTH)), r = i % (ROW * DEPTH);
  const col = Math.floor(r / DEPTH), d = r % DEPTH;
  const x = side === 'a' ? -2.62 + col * GAP : 1.0 + col * GAP;
  return V(x, GAP_Y[L], d ? 0.42 : -0.42);
}
// 困住的鋰：貼在石墨朝向隔離膜的表面（固定亂數，每次一樣）
function stuckXYZ(k) {
  const a = Math.sin(k * 12.9898) * 43758.5453, b = Math.sin(k * 78.233) * 12345.678;
  const fy = a - Math.floor(a), fz = b - Math.floor(b);
  return V(-0.66, -1.38 + fy * 2.76, -0.82 + fz * 1.64);
}

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace;
  return t;
}
// 石墨：碳原子排成的六角網
const graphiteTex = () => canvasTex(256, 256, (g, w, h) => {
  g.fillStyle = '#3c424d'; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(190,205,230,.55)'; g.lineWidth = 2;
  const r = 16, dx = r * Math.sqrt(3), dy = r * 1.5;
  for (let row = -1; row < h / dy + 1; row++) for (let col = -1; col < w / dx + 1; col++) {
    const cx = col * dx + (row % 2 ? dx / 2 : 0), cy = row * dy;
    g.beginPath();
    for (let k = 0; k <= 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; g[k ? 'lineTo' : 'moveTo'](cx + r * Math.cos(a), cy + r * Math.sin(a)); }
    g.stroke();
  }
});
// 金屬氧化物：金屬（藍）與氧（紅）交錯
const oxideTex = () => canvasTex(256, 256, (g, w, h) => {
  g.fillStyle = '#3d3577'; g.fillRect(0, 0, w, h);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    g.fillStyle = (x + y) % 2 ? '#e0525a' : '#6aa8ff';
    g.beginPath(); g.arc(x * 32 + 16, y * 32 + 16, (x + y) % 2 ? 9 : 6, 0, Math.PI * 2); g.fill();
  }
});
// 隔離膜：白色薄膜上的小孔（離子從孔裡過去）
const poreTex = () => {
  const t = canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = 'rgba(235,240,250,.95)'; g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'destination-out';
    for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) {
      g.beginPath(); g.arc(x * 25.6 + 12.8 + (y % 2) * 6, y * 25.6 + 12.8, 6.5, 0, Math.PI * 2); g.fill();
    }
  });
  t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(2, 3);
  return t;
};
const glowTex = () => canvasTex(64, 64, (g) => {
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,225,150,.75)'); gr.addColorStop(1, 'rgba(255,190,80,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
});

const MODE = {
  use: { en: 'Using the battery', zh: '用電中（放電）', dir: 1 },
  charge: { en: 'Charging', zh: '充電中', dir: -1 },
  off: { en: 'Switched off', zh: '開關關上了', dir: 0 },
};
const MSG = {
  use: ['Lithium ions leave the graphite and cross the electrolyte. The electrolyte blocks electrons, so for every ion that crosses inside, one electron goes the long way around the wire and through the bulb.',
    '鋰離子離開石墨、穿過電解液。電解液擋住電子，所以裡面每過去一顆離子，外面就有一個電子繞電線、經過燈泡過去。'],
  charge: ['The charger pushes electrons back the other way, and lithium ions follow them back into the graphite. Charging stores energy by pushing the lithium back where it does not want to be.',
    '充電器把電子往回推，鋰離子也跟著回到石墨。充電，就是把鋰推回它「不想待」的地方，把能量存起來。'],
  off: ['The circuit is broken, so the electrons have nowhere to go, and the ions stay where they are. That is why a battery can sit in a drawer and keep its charge.',
    '電路斷了，電子沒有路可走，離子也就停在原地。所以電池放在抽屜裡，電量還留著。'],
  empty: ['Almost all the lithium that can move is now in the metal oxide. The phone says 0% and turns itself off. Time to plug it in!',
    '能移動的鋰幾乎都跑到金屬氧化物那邊了。手機顯示 0% 並自動關機——該充電了！'],
  full: ['Full: the lithium that can move is back in the graphite. The battery is ready to use again.',
    '充滿了：能移動的鋰都回到石墨裡，電池又可以用了。'],
};

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
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 1.0, 0);
  const homePos = () => V(1.3, 2.4, 11.2).multiplyScalar(camera.aspect < 0.9 ? 1.32 : 1);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 26;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xdfe8ff, 0x1a1a28, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(3, 6, 7); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-5, 2, -4); scene.add(rim);

  const R = {
    pct: $('.bt-pct'), fill: $('.bt-fill'), phone: $('.bt-phone'), state: $('.bt-state'),
    v: $('.bt-v'), li: $('.bt-li'), cap: $('.bt-cap'), ions: $('.bt-ions'), els: $('.bt-els'), msg: $('.bt-msg'),
    soc: $('.bt-soc'), socOut: $('.bt-soc-out'), cyc: $('.bt-cyc'), cycOut: $('.bt-cyc-out'), play: $('.al-play'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    mode: 'use', playing: true, speed: 1, cycles: 0, auto: true, autoT: 0,
    labels: true, electrons: true, arrows: true, ions: 0, els: 0, launchT: 0, shift: 0,
    focus: null, focusT: 0, lastMsg: '',
  };

  // ---------------- 電池本體 ----------------
  const cell = new Group();
  scene.add(cell);
  const parts = { anode: [], cathode: [], electrolyte: [], separator: [] };
  const gTex = graphiteTex(), oTex = oxideTex();
  for (const y of SHEET_Y) {
    const ga = new Mesh(new BoxGeometry(2.1, 0.07, 1.8), new MeshStandardMaterial({ map: gTex, color: 0xb8c0cc, roughness: 0.7, metalness: 0.1 }));
    ga.position.set(-1.8, y, 0); cell.add(ga); parts.anode.push(ga.material);
    const ox = new Mesh(new BoxGeometry(2.1, 0.07, 1.8), new MeshStandardMaterial({ map: oTex, color: 0xffffff, roughness: 0.55 }));
    ox.position.set(1.8, y, 0); cell.add(ox); parts.cathode.push(ox.material);
  }
  const foil = (x, col, metal) => {
    const m = new Mesh(new BoxGeometry(0.1, 3.0, 1.8), new MeshStandardMaterial({ color: col, metalness: metal, roughness: 0.32 }));
    m.position.set(x, 0, 0); cell.add(m);
    const tab = new Mesh(new BoxGeometry(0.1, 0.42, 0.36), m.material);
    tab.position.set(x, 1.7, 0); cell.add(tab);
    return m;
  };
  foil(-2.94, 0xc8743a, 0.6);
  foil(2.94, 0xcfd4dc, 0.7);
  const elyte = new Mesh(new BoxGeometry(5.76, 3.0, 1.84), new MeshStandardMaterial({ color: 0x3a8be0, transparent: true, opacity: 0.1, depthWrite: false, roughness: 0.2 }));
  elyte.renderOrder = 1; cell.add(elyte); parts.electrolyte.push(elyte.material);
  const sep = new Mesh(new PlaneGeometry(1.8, 3.0), new MeshStandardMaterial({ map: poreTex(), transparent: true, alphaTest: 0.2, side: DoubleSide, roughness: 0.9, color: 0xffffff }));
  sep.rotation.y = Math.PI / 2; cell.add(sep); parts.separator.push(sep.material);
  // 外殼：只畫邊線與背板（正面剖開）
  const shell = new BoxGeometry(6.2, 3.3, 2.1);
  cell.add(new LineSegments(new EdgesGeometry(shell), new LineBasicMaterial({ color: 0x8aa0c8, transparent: true, opacity: 0.45 })));
  const back = new Mesh(new PlaneGeometry(6.2, 3.3), new MeshStandardMaterial({ color: 0x1a2440, roughness: 0.9 }));
  back.position.z = -1.05; cell.add(back);
  const floor = new Mesh(new PlaneGeometry(6.2, 2.1), new MeshStandardMaterial({ color: 0x18213a, roughness: 0.9 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -1.65; cell.add(floor);
  // SEI：石墨表面越長越厚的薄殼
  const sei = new Mesh(new BoxGeometry(1, 2.9, 1.76), new MeshStandardMaterial({ color: 0x8b6f52, transparent: true, opacity: 0.35, depthWrite: false }));
  sei.position.x = -0.69; cell.add(sei);

  // ---------------- 外電路 ----------------
  const WIRE = new CatmullRomCurve3([
    V(-2.94, 1.85, 0), V(-2.94, 3.1, 0), V(-2.86, 3.36, 0), V(-2.6, 3.45, 0), V(-1.2, 3.45, 0), V(0, 3.45, 0),
    V(1.2, 3.45, 0), V(2.6, 3.45, 0), V(2.86, 3.36, 0), V(2.94, 3.1, 0), V(2.94, 1.85, 0),
  ], false, 'centripetal');
  const WIRE_L = WIRE.getLength();
  scene.add(new Mesh(new TubeGeometry(WIRE, 200, 0.045, 10, false), new MeshStandardMaterial({ color: 0x9a6a3e, roughness: 0.45, metalness: 0.4 })));
  // 燈泡
  const bulb = new Group(); bulb.position.set(0, 3.45, 0); scene.add(bulb);
  bulb.add(Object.assign(new Mesh(new CylinderGeometry(0.2, 0.22, 0.34, 20), new MeshStandardMaterial({ color: 0xb8bcc4, metalness: 0.7, roughness: 0.3 })), { position: V(0, 0.08, 0) }));
  const glassMat = new MeshStandardMaterial({ color: 0xfff6dc, transparent: true, opacity: 0.32, roughness: 0.1, emissive: 0xffc860, emissiveIntensity: 0 });
  const glass = new Mesh(new SphereGeometry(0.4, 32, 24), glassMat); glass.position.y = 0.6; bulb.add(glass);
  const filMat = new MeshBasicMaterial({ color: 0x6a4a2a });
  const fil = new Mesh(new TorusGeometry(0.11, 0.015, 8, 24, Math.PI), filMat); fil.position.y = 0.56; bulb.add(fil);
  const glow = new Sprite(new SpriteMaterial({ map: glowTex(), blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  glow.position.y = 0.6; glow.scale.set(2.4, 2.4, 1); bulb.add(glow);
  const bulbLight = new PointLight(0xffc860, 0, 9); bulbLight.position.y = 0.6; bulb.add(bulbLight);
  // 充電器
  const charger = new Group(); charger.position.set(0, 3.45, 0); scene.add(charger);
  charger.add(new Mesh(new BoxGeometry(1.0, 0.56, 0.5), new MeshStandardMaterial({ color: 0x2b3550, roughness: 0.5, emissive: 0x2a4a7a, emissiveIntensity: 0.4 })));
  const prong = new MeshStandardMaterial({ color: 0xd0d4da, metalness: 0.8, roughness: 0.3 });
  for (const x of [-0.14, 0.14]) charger.add(Object.assign(new Mesh(new BoxGeometry(0.06, 0.28, 0.12), prong), { position: V(x, 0.42, 0) }));
  charger.visible = false;
  // 開關（關掉時翹起來）
  const sw = new Group(); sw.position.set(-1.5, 3.45, 0); scene.add(sw);
  sw.add(new Mesh(new BoxGeometry(0.62, 0.08, 0.34), new MeshStandardMaterial({ color: 0x39425a })));
  const lever = new Mesh(new BoxGeometry(0.56, 0.05, 0.08), new MeshStandardMaterial({ color: 0xffd36e, metalness: 0.3 }));
  lever.geometry.translate(0.28, 0, 0);
  const pivot = new Group(); pivot.position.set(-0.28, 0.07, 0); pivot.add(lever); sw.add(pivot);

  // 電線裡的電子：本來就塞滿，一起往前挪
  const NE = 46, SPACE = WIRE_L / NE;
  const eMesh = new InstancedMesh(new SphereGeometry(0.075, 12, 10), new MeshBasicMaterial({ color: ELEC }), NE);
  scene.add(eMesh);
  const dummy = new Object3D();
  const tmp = V(0, 0, 0), tan = V(0, 0, 0);
  function placeElectrons() {
    for (let i = 0; i < NE; i++) {
      const s = (((i * SPACE + state.shift) % WIRE_L) + WIRE_L) % WIRE_L;
      WIRE.getPointAt(s / WIRE_L, tmp);
      dummy.position.copy(tmp); dummy.scale.setScalar(1); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
      eMesh.setMatrixAt(i, dummy.matrix);
    }
    eMesh.instanceMatrix.needsUpdate = true;
  }
  // 電子流向的小箭頭
  const arrows = [0.12, 0.36, 0.64, 0.88].map((u) => {
    const m = new Mesh(new ConeGeometry(0.11, 0.3, 14), new MeshBasicMaterial({ color: ELEC, transparent: true, opacity: 0.9 }));
    m.userData.u = u; scene.add(m); return m;
  });
  function placeArrows(dir) {
    for (const a of arrows) {
      a.visible = state.arrows && dir !== 0;
      if (!a.visible) continue;
      WIRE.getPointAt(a.userData.u, a.position);
      WIRE.getTangentAt(a.userData.u, tan).multiplyScalar(dir);
      a.position.addScaledVector(V(0, 0, 1), 0.22);
      a.quaternion.setFromUnitVectors(V(0, 1, 0), tan);
    }
  }

  // ---------------- 鋰 ----------------
  const liMesh = new InstancedMesh(new SphereGeometry(0.09, 14, 12), new MeshStandardMaterial({ roughness: 0.35, emissive: 0x3a2a00 }), SITES);
  scene.add(liMesh);
  const LIS = Array.from({ length: SITES }, (_, k) => ({ k, where: 'a', site: 0, path: null, t: 0, dir: 1 }));
  const occ = { a: new Array(SITES).fill(null), c: new Array(SITES).fill(null) };
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const pickFree = (side) => { const f = []; occ[side].forEach((v, i) => { if (!v) f.push(i); }); return f.length ? f[Math.floor(rnd() * f.length)] : -1; };
  const pickUsed = (side) => { const f = []; occ[side].forEach((v, i) => { if (v) f.push(i); }); return f.length ? f[Math.floor(rnd() * f.length)] : -1; };

  function layout(soc) {
    const p = split(soc, state.cycles);
    occ.a.fill(null); occ.c.fill(null);
    LIS.forEach((li, idx) => {
      li.path = null;
      if (idx < p.trapped) { li.where = 'x'; return; }
      const side = idx - p.trapped < p.anode ? 'a' : 'c';
      const s = pickFree(side);
      li.where = side; li.site = s; occ[side][s] = li;
    });
    sei.visible = p.trapped > 0;
    sei.scale.x = 0.04 + 0.12 * (1 - capacity(state.cycles)) / 0.3;
  }
  const count = (side) => occ[side].reduce((n, v) => n + (v ? 1 : 0), 0);
  const moving = () => LIS.filter((l) => l.where === 'm');

  // 一顆離子跨過去：沿著層間走到電極邊緣、穿過隔離膜的孔、進到對面的層間
  function launch(dir) {
    const from = dir > 0 ? 'a' : 'c', to = dir > 0 ? 'c' : 'a';
    const s0 = pickUsed(from), s1 = pickFree(to);
    if (s0 < 0 || s1 < 0) return false;
    const li = occ[from][s0];
    occ[from][s0] = null;
    occ[to][s1] = li;                      // 先訂位，避免兩顆搶同一格
    const p0 = siteXYZ(from, s0), p1 = siteXYZ(to, s1);
    const ex0 = from === 'a' ? -0.62 : 0.62, ex1 = -ex0;
    const yS = MathUtils.lerp(p0.y, p1.y, 0.5) + (rnd() - 0.5) * 0.5, zS = (rnd() - 0.5) * 1.2;
    li.path = new CatmullRomCurve3([p0, V(ex0, p0.y, p0.z), V(ex0 * 0.45, MathUtils.lerp(p0.y, yS, 0.6), MathUtils.lerp(p0.z, zS, 0.6)),
      V(0, yS, zS), V(ex1 * 0.45, MathUtils.lerp(p1.y, yS, 0.6), MathUtils.lerp(p1.z, zS, 0.6)), V(ex1, p1.y, p1.z), p1], false, 'centripetal');
    li.where = 'm'; li.t = 0; li.dir = dir; li.site = s1; li.to = to;
    return true;
  }

  const col = new Color();
  function placeIons() {
    LIS.forEach((li, i) => {
      if (li.where === 'x') { tmp.copy(stuckXYZ(li.k)); col.copy(STUCK); }
      else if (li.where === 'm') { li.path.getPointAt(MathUtils.smootherstep(li.t, 0, 1), tmp); col.copy(LI).multiplyScalar(1.15); }
      else { tmp.copy(siteXYZ(li.where, li.site)); col.copy(LI); }
      dummy.position.copy(tmp); dummy.scale.setScalar(li.where === 'm' ? 1.25 : 1); dummy.updateMatrix();
      liMesh.setMatrixAt(i, dummy.matrix); liMesh.setColorAt(i, col);
    });
    liMesh.instanceMatrix.needsUpdate = true;
    if (liMesh.instanceColor) liMesh.instanceColor.needsUpdate = true;
  }

  // ---------------- 標籤 ----------------
  const L = {
    anode: [lab.add('bt-lb bt-lb-a', 'Negative side (−): graphite<small>負極：石墨</small>'), V(-1.8, -1.95, 0.9)],
    cathode: [lab.add('bt-lb bt-lb-c', 'Positive side (+): metal oxide<small>正極：金屬氧化物</small>'), V(1.8, -1.95, 0.9)],
    electrolyte: [lab.add('bt-lb bt-lb-e', 'Electrolyte<small>電解液</small>'), V(-0.05, 1.86, 0.9)],
    separator: [lab.add('bt-lb bt-lb-s', 'Separator<small>隔離膜</small>'), V(0, -2.5, 0.9)],
    cu: [lab.add('bt-lb bt-lb-x', 'Copper foil<small>銅箔</small>'), V(-2.94, 2.2, 0.3)],
    al: [lab.add('bt-lb bt-lb-x', 'Aluminum foil<small>鋁箔</small>'), V(2.94, 2.2, 0.3)],
    bulb: [lab.add('bt-lb bt-lb-b', 'Bulb<small>燈泡</small>'), V(0.95, 4.15, 0)],
    charger: [lab.add('bt-lb bt-lb-b', '&#9889; Charger<small>充電器</small>'), V(0, 4.25, 0)],
    sw: [lab.add('bt-lb bt-lb-b', 'Switch open<small>開關打開了</small>'), V(-1.5, 4.0, 0)],
    e: [lab.add('bt-lb bt-lb-el', 'Electrons e⁻<small>電子</small>'), V(-1.95, 3.85, 0)],
  };
  const ionLb = lab.add('bt-lb bt-lb-li', 'Lithium ion Li⁺<small>鋰離子</small>');
  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    for (const [k, [el, at]] of Object.entries(L)) {
      let show = on || state.focus === k;
      if (k === 'bulb') show = show && state.mode !== 'charge';
      if (k === 'charger') show = show && state.mode === 'charge';
      if (k === 'sw') show = show && state.mode === 'off';
      if (narrow && (k === 'cu' || k === 'al')) show = false;
      if (k === 'e') show = show && state.electrons;
      el.hidden = !show;
      el.classList.toggle('bt-sel', state.focus === k && state.focusT > 0);
      if (show) lab.place(el, at);
    }
    const m = on ? moving()[0] : null;
    ionLb.hidden = !m;
    if (m) { m.path.getPointAt(MathUtils.smootherstep(m.t, 0, 1), tmp); lab.place(ionLb, tmp, -24); }
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    const m = movable(state.cycles);
    const inA = count('a') - moving().filter((l) => l.to === 'a').length;   // 還在路上的不算
    const soc = m ? Math.max(0, inA) / m : 0;
    const pct = Math.round(soc * 100);
    R.pct.textContent = `${pct}%`;
    R.fill.style.width = `${pct}%`;
    R.phone.classList.toggle('low', pct <= 20);
    R.phone.classList.toggle('charging', state.mode === 'charge');
    R.v.textContent = `${voltage(soc).toFixed(2)} V`;
    R.li.textContent = `${inA} / ${m}`;
    R.cap.textContent = `${Math.round(capacity(state.cycles) * 100)}%`;
    R.ions.textContent = String(state.ions);
    R.els.textContent = String(state.els);
    const md = MODE[state.mode];
    R.state.innerHTML = `${esc(md.en)}<small>${esc(md.zh)}</small>`;
    root.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-mode') === state.mode ? 'true' : 'false'));
    if (document.activeElement !== R.soc) { R.soc.value = String(pct); R.soc.style.setProperty('--p', `${pct}%`); }
    R.socOut.textContent = `${pct}%`;
    let key = state.mode;
    if (state.mode === 'use' && inA === 0 && !moving().length) key = 'empty';
    if (state.mode === 'charge' && inA === m && !moving().length) key = 'full';
    let html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (state.cycles > 0) html += `<span class="bt-aging">Gray balls: lithium stuck in a thin crust on the graphite. It can never move again, so a full charge holds less.<span class="zh">灰色的球：被困在石墨表面薄殼裡的鋰，再也不能移動，所以充滿時能裝的電變少。</span></span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    return { inA, m, key };
  }

  // ---------------- 操作 ----------------
  function setMode(m, byUser = true) {
    state.mode = m;
    if (byUser) state.auto = false;
    state.autoT = 0;
    charger.visible = m === 'charge';
    bulb.visible = m !== 'charge';
    readout();
  }
  root.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    setMode(b.getAttribute('data-mode'));
    if (!state.playing) setPlaying(true);
  }));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  root.querySelectorAll('.al-speed button').forEach((b) => b.addEventListener('click', () => {
    state.speed = parseFloat(b.getAttribute('data-speed'));
    root.querySelectorAll('.al-speed button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    if (!state.playing) setPlaying(true);
  }));
  function setSoc(p) {
    layout(p / 100);
    R.soc.style.setProperty('--p', `${p}%`);
    readout();
  }
  R.soc.addEventListener('input', () => setSoc(parseInt(R.soc.value, 10)));
  function setCycles(c) {
    const m0 = movable(state.cycles);
    const soc = m0 ? count('a') / m0 : 0;
    state.cycles = c;
    R.cyc.value = String(c);
    R.cyc.style.setProperty('--p', `${c / 750 * 100}%`);
    R.cycOut.textContent = `${c} → ${Math.round(capacity(c) * 100)}%`;
    layout(Math.min(1, soc));
    readout();
  }
  R.cyc.addEventListener('input', () => setCycles(parseInt(R.cyc.value, 10)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="electrons"]', (v) => { state.electrons = v; eMesh.visible = v; });
  bind('[data-t="arrows"]', (v) => { state.arrows = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  const FOCUS = { anode: V(-1.8, 0, 0), cathode: V(1.8, 0, 0), electrolyte: V(0, 0, 0), separator: V(0, 0, 0) };
  function focusPart(k) {
    if (!FOCUS[k]) return;
    state.focus = k; state.focusT = 3.5;
    const far = camera.aspect < 0.9 ? 1.35 : 1;
    flyTo(FOCUS[k].clone().add(V(k === 'separator' ? 2.6 : 0.8, 1.2, 6.4).multiplyScalar(far)), FOCUS[k]);
  }
  function applyFocus() {
    for (const [k, mats] of Object.entries(parts)) {
      const on = state.focus === k && state.focusT > 0;
      for (const m of mats) {
        m.emissive.setHex(on ? 0xffc857 : 0x000000);
        m.emissiveIntensity = on ? 0.25 + 0.25 * Math.sin(state.focusT * 8) : 0;
      }
    }
    if (state.focusT <= 0 && state.focus) state.focus = null;
  }

  // ---------------- 迴圈 ----------------
  let glowNow = 0;
  function step(dt) {
    const dir = MODE[state.mode].dir;
    if (state.playing) {
      // 1. 派出新的離子（關掉開關就不派）
      if (dir !== 0) {
        state.launchT -= dt * state.speed;
        if (state.launchT <= 0) {
          launch(dir);
          state.launchT = 0.45;
        }
      }
      // 2. 推進路上的離子；外面的電子跟著挪：每顆離子走完全程，電子剛好挪一格
      let de = 0;
      for (const li of LIS) {
        if (li.where !== 'm') continue;
        const t1 = Math.min(1, li.t + dt * state.speed / T0);
        de += (t1 - li.t) * li.dir;
        li.t = t1;
        if (li.t >= 1) { li.where = li.to; li.path = null; state.ions += 1; state.els += 1; }
      }
      state.shift += de * SPACE;
      // 3. 自動示範：沒碰過按鈕之前，用完就充、充滿就用
      const { key } = readout();
      if (state.auto && (key === 'empty' || key === 'full')) {
        state.autoT += dt;
        if (state.autoT > 2.2) setMode(key === 'empty' ? 'charge' : 'use', false);
      }
    }
    // 燈泡亮度跟著電流（路上有幾顆離子）
    const cur = state.mode === 'use' ? moving().length : 0;
    glowNow += (Math.min(1, cur / 4) - glowNow) * Math.min(1, dt * 6);
    glassMat.emissiveIntensity = 1.6 * glowNow;
    glow.material.opacity = 0.9 * glowNow;
    bulbLight.intensity = 6 * glowNow;
    filMat.color.setHex(glowNow > 0.15 ? 0xfff2c0 : 0x6a4a2a);
    pivot.rotation.z += ((state.mode === 'off' ? 0.65 : 0) - pivot.rotation.z) * Math.min(1, dt * 8);
    if (state.focusT > 0) state.focusT -= dt;
    applyFocus();
    placeIons();
    placeElectrons();
    placeArrows(moving().length ? moving()[0].dir : (state.mode === 'off' ? 0 : MODE[state.mode].dir));
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 44 : 34;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());

  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  layout(0.85);
  setCycles(0);
  setMode('use', false);
  state.auto = true;
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  // 除錯：document.querySelector('[data-battery-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, setMode, setSoc, setCycles, focus: focusPart,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, focus: focusPart, mode: (m) => setMode(m), cycles: (c) => setCycles(parseInt(c, 10)) };
}

lazyBoot('[data-battery-lab]', initLab, {
  part: (lab, v) => lab.focus(v),
  mode: (lab, v) => lab.mode(v),
  cycles: (lab, v) => lab.cycles(v),
});
