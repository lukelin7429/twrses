/*
 * 晶片與半導體 · 第二課「電晶體在做什麼？」的 3D 模型（全部自繪示意，大小、電壓都是示意）。
 *
 * 一個機制：電晶體是「用電控制的開關」。閘極加正電壓，隔著絕緣層把電子吸到底下，
 *   在源極和汲極之間鋪出一條電子的通道，電流就流過；拿掉電壓，通道消失、電流停止。
 *   開＝1、關＝0；兩個開關串聯是 AND、並聯是 OR，再組合起來就能做加法。
 *
 * 兩個視角（同一個 renderer，切 group 的 visible）：
 *   one「一顆電晶體」：剖面。P 型矽基底（紫，粉紅圈＝電洞）上有兩塊 N 型矽（藍，源極、汲極，滿是自由電子），
 *     中間上方是絕緣層（白）與閘極（金）。閘極電壓滑桿 0–1 V（transcalc.js：VTH 0.4 V）；
 *     通道電子數 ∝ channel(vg)、電線裡電子的速度與 LED 亮度 ∝ current(vg)（平方律）；閘極下的電洞被推開。
 *     電路：源極柱 → 上方電線（電池、LED）→ 汲極柱；電子由源極經通道流到汲極，再從上面繞回來。
 *   logic「會算數的開關」：板子上兩排小電路。後排 AND：電池 → 電晶體 A → 電晶體 B → LED（串聯）；
 *     前排 OR：電池 → A、B 兩條並排的路 → LED（並聯）。輸入 A、B 在右側按鈕切換。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/chips && npm run build → assets/js/chip-transistor.js
 * 除錯：document.querySelector('[data-chiptransistor-lab]').__lab
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  InstancedMesh, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PointLight,
  Scene, SphereGeometry, Sprite, SpriteMaterial, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, glowTex, labeler, lazyBoot, polyline, tube } from './common.js';
import { AND, OR, VDD, VTH, channel, countSeconds, current, fmtDuration, halfAdd, isOn } from './transcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const ELEC = 0x58e1ff, HOLE = 0xff8fb8;
const N_COL = 0x2f6fd6, P_COL = 0x6a4aa0, GATE = 0xc9a14a;
// 一顆電晶體的尺寸
const BODY = { x0: -4.2, x1: 4.2, y0: -2.6, z: 1.5 };
const NREG = { w: 2.7, d: 1.0 };          // 源極、汲極的寬與深
const GX = 1.65;                           // 閘極半寬
const OX = 0.16, GH = 0.64;                // 絕緣層厚、閘極高
const CX = 2.85;                           // 源極、汲極接點的 x
const TOP = 3.6;                           // 上方電線的高度

const MSG = {
  off: ['The gate has no voltage. The p-type silicon between the source and the drain has almost no free electrons, so no current can cross. The switch is off, a 0.',
    '閘極沒有電壓。源極和汲極之間的 P 型矽幾乎沒有自由電子，電流過不去。開關是關的，代表 0。'],
  low: ['A little voltage on the gate pushes the holes away, but it is not yet enough to pull in electrons. Still almost no current.',
    '閘極有一點電壓，把電洞推開了，但還不夠把電子吸過來，所以幾乎還是沒有電流。'],
  part: ['Past the threshold, the gate pulls electrons up under the insulator. A thin channel joins the source to the drain, and current begins to flow.',
    '超過臨界電壓，閘極把電子吸到絕緣層下面，鋪出一條薄薄的通道把源極和汲極連起來，電流開始流動。'],
  on: ['The channel is wide open and current flows freely: the switch is on, a 1. The gate never touches the current; it controls it from across the insulator.',
    '通道完全打開，電流順暢地流過：開關是開的，代表 1。閘極從來沒有碰到電流，而是隔著絕緣層控制它。'],
  and0: ['AND: the two transistors are in a row, so current must pass through both. The LED lights only when A and B are both 1.',
    'AND（且）：兩顆電晶體串在一起，電流兩顆都要通過。只有 A 和 B 都是 1，LED 才會亮。'],
  and1: ['Both switches are on, so the AND light is on. The OR light is on too, because at least one switch is on.',
    '兩個開關都開，AND 的燈亮了；OR 的燈也亮，因為至少有一個開關是開的。'],
  or1: ['Only one switch is on. The OR light is on, because current can take that one path, but the AND light stays off.',
    '只有一個開關是開的。OR 的燈亮，因為電流可以走那一條路；AND 的燈不亮。'],
  none: ['Both switches are off, so no current flows anywhere. Press A and B to turn the transistors on.',
    '兩個開關都關著，哪裡都沒有電流。按 A 和 B 把電晶體打開。'],
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
  scene.background = new Color(0x0b1326);
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 45;
  scene.add(new HemisphereLight(0xe6efff, 0x1a2230, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const sun = new DirectionalLight(0xffffff, 1.3); sun.position.set(-4, 10, 8); scene.add(sun);
  const elGeo = new SphereGeometry(0.07, 10, 8);
  const elMat = new MeshBasicMaterial({ color: ELEC });
  const dummy = new Object3D();
  const glow = glowTex();
  const wireMat = new MeshStandardMaterial({ color: 0x3b4a66, roughness: 0.5, metalness: 0.3 });
  const metal = new MeshStandardMaterial({ color: 0xb8c0cc, metalness: 0.8, roughness: 0.3 });
  const tr = (mat) => Object.assign(mat, { transparent: true, depthWrite: false });

  function makeBattery(len = 1.3, r = 0.3) {
    const g = new Group();
    const body = new Mesh(new CylinderGeometry(r, r, len, 24), new MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.5, metalness: 0.3 }));
    body.rotation.z = Math.PI / 2; g.add(body);
    const cap = new Mesh(new CylinderGeometry(r * 1.01, r * 1.01, len * 0.33, 24), new MeshStandardMaterial({ color: 0xd8a640, roughness: 0.4, metalness: 0.5 }));
    cap.rotation.z = Math.PI / 2; g.add(at(cap, len * 0.33, 0, 0));   // 金色（＋）在右邊
    return g;
  }
  function makeLed(parent, x, y, z, scale = 1) {
    const mat = new MeshStandardMaterial({ color: 0x8a1f1a, roughness: 0.2, transparent: true, opacity: 0.88, emissive: 0xff3a2a, emissiveIntensity: 0 });
    const g = new Group(); g.scale.setScalar(scale); parent.add(at(g, x, y, z));
    g.add(at(new Mesh(new CylinderGeometry(0.2, 0.2, 0.12, 16), metal), 0, 0, 0));
    g.add(at(new Mesh(new CylinderGeometry(0.18, 0.18, 0.2, 18), mat), 0, 0.16, 0));
    g.add(at(new Mesh(new SphereGeometry(0.18, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat), 0, 0.26, 0));
    const spr = new Sprite(new SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0 }));
    g.add(at(spr, 0, 0.24, 0)); spr.scale.setScalar(0.01);
    const pl = new PointLight(0xff4a3a, 0, 4); g.add(at(pl, 0, 0.5, 0));
    return {
      g,
      set(lv) {
        mat.emissiveIntensity = lv * 2.2;
        spr.material.opacity = Math.min(1, lv * 1.2); spr.scale.setScalar(0.2 + 1.6 * Math.sqrt(lv)); pl.intensity = lv * 6;
      },
    };
  }
  function flow(parent, pts, n, hideFn) {
    const path = polyline(pts);
    const mesh = new InstancedMesh(elGeo, elMat, n); parent.add(mesh);
    return { path, mesh, n, phase: 0, hideFn };
  }
  function stepFlow(f, speed, dt, tmp) {
    f.phase += speed * dt;
    for (let i = 0; i < f.n; i++) {
      const s = ((i / f.n) * f.path.L + f.phase) % f.path.L;
      f.path.at(s, tmp);
      dummy.position.copy(tmp);
      dummy.scale.setScalar(f.hideFn && f.hideFn(s, tmp) ? 0.0001 : 1);
      dummy.updateMatrix(); f.mesh.setMatrixAt(i, dummy.matrix);
    }
    f.mesh.instanceMatrix.needsUpdate = true;
  }

  // =====================================================================
  // 視角一：一顆電晶體（剖面）
  // =====================================================================
  const oneG = new Group(); scene.add(oneG);
  const bodyW = BODY.x1 - BODY.x0, bodyH = -BODY.y0;
  oneG.add(at(new Mesh(new BoxGeometry(bodyW, bodyH, BODY.z * 2), tr(new MeshStandardMaterial({ color: P_COL, roughness: 0.4, opacity: 0.3 }))), 0, BODY.y0 / 2, 0));
  const nMat = tr(new MeshStandardMaterial({ color: N_COL, roughness: 0.4, opacity: 0.42 }));
  oneG.add(at(new Mesh(new BoxGeometry(NREG.w, NREG.d, BODY.z * 2 - 0.02), nMat), BODY.x0 + NREG.w / 2, -NREG.d / 2, 0));
  oneG.add(at(new Mesh(new BoxGeometry(NREG.w, NREG.d, BODY.z * 2 - 0.02), nMat), BODY.x1 - NREG.w / 2, -NREG.d / 2, 0));
  oneG.add(at(new Mesh(new BoxGeometry(GX * 2, OX, BODY.z * 2), tr(new MeshStandardMaterial({ color: 0xe8f0ff, roughness: 0.1, opacity: 0.55 }))), 0, OX / 2, 0));
  const gateMat = new MeshStandardMaterial({ color: GATE, metalness: 0.75, roughness: 0.3, emissive: 0xffd36e, emissiveIntensity: 0 });
  oneG.add(at(new Mesh(new BoxGeometry(GX * 2, GH, BODY.z * 2), gateMat), 0, OX + GH / 2, 0));
  // 接點柱與電線
  const wr = 0.05;
  oneG.add(tube(V(-CX, 0, 0), V(-CX, TOP, 0), 0.16, metal));
  oneG.add(tube(V(CX, 0, 0), V(CX, TOP, 0), 0.16, metal));
  oneG.add(tube(V(-CX, TOP, 0), V(CX, TOP, 0), wr, wireMat));
  oneG.add(tube(V(0, OX + GH, 0), V(0, 2.35, 0), 0.12, metal));
  const knob = at(new Mesh(new BoxGeometry(1.5, 0.5, 0.9), new MeshStandardMaterial({ color: 0x3a3f4b, roughness: 0.5, metalness: 0.4, emissive: 0xffd36e, emissiveIntensity: 0 })), 0, 2.55, 0);
  oneG.add(knob);
  const bat1 = makeBattery(1.2, 0.3); oneG.add(at(bat1, -1.25, TOP, 0)); bat1.rotation.y = Math.PI;   // 金色（＋）朝右＝汲極那側
  const led1 = makeLed(oneG, 1.3, TOP + 0.02, 0);
  // 閘極上的「＋」
  const plusTex = canvasTex((g, w, h) => {
    g.fillStyle = '#ffd36e'; g.fillRect(w * 0.42, h * 0.15, w * 0.16, h * 0.7); g.fillRect(w * 0.15, h * 0.42, w * 0.7, h * 0.16);
  });
  const pluses = [];
  for (let i = 0; i < 9; i++) {
    const s = new Sprite(new SpriteMaterial({ map: plusTex, transparent: true, depthWrite: false, opacity: 0 }));
    s.scale.setScalar(0.32); oneG.add(at(s, -GX + 0.2 + (i % 9) * ((GX * 2 - 0.4) / 8), OX + GH + 0.22, 0.9));
    pluses.push(s);
  }
  // 源極、汲極裡的自由電子；P 型裡的電洞；通道裡的電子
  const NS = 46;
  const nE = new InstancedMesh(elGeo, elMat, NS * 2); oneG.add(nE);
  const nEl = Array.from({ length: NS * 2 }, (_, i) => {
    const left = i < NS, x0 = left ? BODY.x0 : BODY.x1 - NREG.w;
    return { p: V(x0 + 0.1 + Math.random() * (NREG.w - 0.2), -0.08 - Math.random() * (NREG.d - 0.16), MathUtils.randFloatSpread(2.8)),
      v: V(MathUtils.randFloatSpread(1), MathUtils.randFloatSpread(1), MathUtils.randFloatSpread(1)), left };
  });
  const NH = 36;
  const hMesh = new InstancedMesh(new TorusGeometry(0.09, 0.03, 6, 16), new MeshBasicMaterial({ color: HOLE }), NH); oneG.add(hMesh);
  const holes = Array.from({ length: NH }, () => ({
    home: V(MathUtils.randFloat(-1.45, 1.45), MathUtils.randFloat(-2.4, -0.12), MathUtils.randFloatSpread(2.8)), p: V(0, 0, 0),
  }));
  for (let i = 0; i < 14; i++) holes[i].home.set(MathUtils.randFloat(-1.4, 1.4), MathUtils.randFloat(-0.7, -0.08), MathUtils.randFloatSpread(2.8));
  holes.forEach((h) => h.p.copy(h.home));
  const NC = 70;
  const cE = new InstancedMesh(elGeo, elMat, NC); oneG.add(cE);
  const cEl = Array.from({ length: NC }, () => ({ p: V(MathUtils.randFloat(-1.6, 1.6), MathUtils.randFloat(-0.2, -0.04), MathUtils.randFloatSpread(2.8)) }));
  const chanGlow = at(new Mesh(new BoxGeometry(GX * 2 + 0.3, 0.2, BODY.z * 2), new MeshBasicMaterial({ color: ELEC, transparent: true, opacity: 0, depthWrite: false })), 0, -0.11, 0);
  oneG.add(chanGlow);
  // 電線裡的電子：汲極柱往上 → 上方電線往左（經過 LED、電池）→ 源極柱往下 → 源極 → 通道 → 汲極
  const batL = -1.25 - 0.6, batR = -1.25 + 0.6;
  const wire1 = flow(oneG, [V(CX, 0.05, 0), V(CX, TOP, 0), V(-CX, TOP, 0), V(-CX, 0.05, 0)], 34,
    (s, p) => p.y > TOP - 0.01 && p.x > batL && p.x < batR);

  // =====================================================================
  // 視角二：會算數的開關（AND 與 OR）
  // =====================================================================
  const logG = new Group(); scene.add(logG); logG.visible = false;
  logG.add(at(new Mesh(new BoxGeometry(11.6, 0.12, 8.2), new MeshStandardMaterial({ color: 0x16223a, roughness: 0.85 })), -0.5, -0.06, 0.1));
  function makeMini(x, z) {
    const g = new Group(); logG.add(at(g, x, 0, z));
    g.add(at(new Mesh(new BoxGeometry(1.3, 0.42, 0.9), tr(new MeshStandardMaterial({ color: P_COL, opacity: 0.55, roughness: 0.4 }))), 0, 0.21, 0));
    const nm = new MeshStandardMaterial({ color: N_COL, roughness: 0.4 });
    g.add(at(new Mesh(new BoxGeometry(0.36, 0.2, 0.86), nm), -0.42, 0.33, 0));
    g.add(at(new Mesh(new BoxGeometry(0.36, 0.2, 0.86), nm), 0.42, 0.33, 0));
    const gm = new MeshStandardMaterial({ color: GATE, metalness: 0.7, roughness: 0.3, emissive: 0xffd36e, emissiveIntensity: 0 });
    g.add(at(new Mesh(new BoxGeometry(0.4, 0.18, 0.86), gm), 0, 0.52, 0));
    const cm = new MeshBasicMaterial({ color: ELEC, transparent: true, opacity: 0.08 });
    g.add(at(new Mesh(new BoxGeometry(0.5, 0.05, 0.8), cm), 0, 0.42, 0));
    return { g, gm, cm, pos: V(x, 0.6, z) };
  }
  const yW = 0.3;
  // AND（後排）
  const zA = -2.3;
  const bAnd = makeBattery(1.2, 0.28); logG.add(at(bAnd, -4.6, 0.3, zA));
  const andA = makeMini(-1.9, zA), andB = makeMini(0.6, zA);
  const ledAnd = makeLed(logG, 3.3, 0.06, zA);
  const andPts = [V(-5.2, yW, zA), V(-5.6, yW, zA), V(-5.6, yW, zA - 0.8), V(3.9, yW, zA - 0.8), V(3.9, yW, zA), V(3.5, yW, zA),
    V(3.1, yW, zA), V(-4.0, yW, zA)];
  for (let i = 0; i < andPts.length; i++) {
    const a = andPts[i], b = andPts[(i + 1) % andPts.length];
    if (i === andPts.length - 1) continue;      // 電池那一段不畫
    logG.add(tube(a, b, wr, wireMat));
  }
  // 電子：電池負極（左）→ 繞後面 → LED → A → B → 電池正極…示意方向（電子從負極出發）
  const andFlow = flow(logG, [V(-5.2, yW, zA), V(-5.6, yW, zA), V(-5.6, yW, zA - 0.8), V(3.9, yW, zA - 0.8), V(3.9, yW, zA), V(3.1, yW, zA), V(-4.0, yW, zA)], 40,
    (s, p) => p.x < -3.95 && p.x > -5.25 && Math.abs(p.z - zA) < 0.05);
  // OR（前排）：兩條並排的路
  const zO = 1.9, z1 = 1.25, z2 = 2.6;
  const bOr = makeBattery(1.2, 0.28); logG.add(at(bOr, -4.6, 0.3, zO));
  const orA = makeMini(-0.6, z1), orB = makeMini(-0.6, z2);
  const ledOr = makeLed(logG, 3.3, 0.06, zO);
  const orSeg = [[V(-4.0, yW, zO), V(-2.4, yW, zO)], [V(-2.4, yW, z1), V(-2.4, yW, z2)], [V(-2.4, yW, z1), V(1.2, yW, z1)], [V(-2.4, yW, z2), V(1.2, yW, z2)],
    [V(1.2, yW, z1), V(1.2, yW, z2)], [V(1.2, yW, zO), V(3.1, yW, zO)], [V(3.5, yW, zO), V(3.9, yW, zO)], [V(3.9, yW, zO), V(3.9, yW, 3.4)],
    [V(3.9, yW, 3.4), V(-5.6, yW, 3.4)], [V(-5.6, yW, 3.4), V(-5.6, yW, zO)], [V(-5.6, yW, zO), V(-5.2, yW, zO)]];
  for (const [a, b] of orSeg) logG.add(tube(a, b, wr, wireMat));
  const orLoop = (zz) => [V(-5.2, yW, zO), V(-5.6, yW, zO), V(-5.6, yW, 3.4), V(3.9, yW, 3.4), V(3.9, yW, zO), V(3.1, yW, zO), V(1.2, yW, zO),
    V(1.2, yW, zz), V(-2.4, yW, zz), V(-2.4, yW, zO), V(-4.0, yW, zO)];
  const hideBat = (s, p) => p.x < -3.95 && p.x > -5.25 && Math.abs(p.z - zO) < 0.05;
  const orFlowA = flow(logG, orLoop(z1), 34, hideBat);
  const orFlowB = flow(logG, orLoop(z2), 34, hideBat);
  orFlowB.phase = orFlowB.path.L / 34 / 2;   // 和 A 那條錯開半格，共用的電線上電子才不會兩顆疊在一起

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    src: lab.add('cp-lb cp-lb-n', 'Source<small>源極（N 型）</small>'),
    drn: lab.add('cp-lb cp-lb-n', 'Drain<small>汲極（N 型）</small>'),
    gate: lab.add('cp-lb cp-lb-g', 'Gate<small>閘極</small>'),
    ox: lab.add('cp-lb cp-lb-note', 'Thin insulator<small>薄薄的絕緣層</small>'),
    body: lab.add('cp-lb cp-lb-p', 'P-type silicon<small>P 型矽</small>'),
    chan: lab.add('cp-lb cp-lb-el', 'Channel of electrons<small>電子的通道</small>'),
    bat: lab.add('cp-lb', 'Battery<small>電池</small>'),
    led: lab.add('cp-lb cp-lb-led', 'LED'),
    knob: lab.add('cp-lb cp-lb-g', ''),
    and: lab.add('cp-lb cp-lb-g', 'AND: in a row<small>且：串聯</small>'),
    or: lab.add('cp-lb cp-lb-g', 'OR: side by side<small>或：並聯</small>'),
    tags: [andA, andB, orA, orB].map((m, i) => ({ m, el: lab.add('cp-lb cp-tag', i % 2 ? 'B' : 'A'), k: i % 2 ? 'b' : 'a' })),
    ledAnd: lab.add('cp-lb cp-lb-led', ''),
    ledOr: lab.add('cp-lb cp-lb-led', ''),
  };

  // =====================================================================
  // 狀態與控制
  // =====================================================================
  const R = {
    vg: $('.cp-vg'), vgOut: $('.cp-vg-out'), msg: $('.cp-msg'), play: $('.al-play'),
    chan: $('.cp-chan'), cur: $('.cp-cur'), bit: $('.cp-bit'), meter: $('.cp-tr-meter i'),
    truth: $('.cp-tr-truth'), sum: $('.cp-tr-sum'),
  };
  const state = { view: 'one', vg: 0, vgTarget: 0, a: 1, b: 0, labels: true, playing: true, lastMsg: '', lastRead: '' };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  function home(view) {
    if (view === 'logic') { const t = V(-0.8, -0.3, 0.2); return { p: V(0, 0.7, 0.72).normalize().multiplyScalar(fit(13.2, 8.6)).add(t), t }; }
    const t = V(0, 0.75, 0);
    return { p: V(0.3, 0.16, 1).normalize().multiplyScalar(fit(10.4, 8.6)).add(t), t };
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const goHome = (instant) => { const h = home(state.view); flyTo(h.p, h.t, instant); };

  function setView(v, instant) {
    if (v !== 'one' && v !== 'logic') return;
    state.view = v;
    oneG.visible = v === 'one'; logG.visible = v === 'logic';
    controls.maxPolarAngle = v === 'logic' ? Math.PI * 0.47 : Math.PI;
    root.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-view') === v ? 'true' : 'false'));
    root.classList.toggle('cp-tr-logic', v === 'logic');
    goHome(instant);
  }
  function setGate(v, instant) {
    state.vgTarget = Math.max(0, Math.min(VDD, v));
    if (instant) state.vg = state.vgTarget;
    if (R.vg) { R.vg.value = Math.round(state.vgTarget * 100); R.vg.style.setProperty('--p', `${state.vgTarget * 100}%`); }
    root.querySelectorAll('[data-gate]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-gate')) === state.vgTarget)));
  }
  function setInput(k, v) {
    if (k !== 'a' && k !== 'b') return;
    state[k] = v ? 1 : 0;
    root.querySelectorAll(`[data-in="${k}"]`).forEach((b) => { b.setAttribute('aria-pressed', state[k] ? 'true' : 'false'); const o = b.querySelector('b'); if (o) o.textContent = String(state[k]); });
  }
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.getAttribute('data-view'))));
  root.querySelectorAll('[data-gate]').forEach((b) => b.addEventListener('click', () => setGate(Number(b.getAttribute('data-gate')))));
  root.querySelectorAll('[data-in]').forEach((b) => b.addEventListener('click', () => { const k = b.getAttribute('data-in'); setInput(k, !state[k]); }));
  if (R.vg) R.vg.addEventListener('input', () => setGate(Number(R.vg.value) / 100, true));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
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
  function jiggle(p, v, dt, k = 5, max = 0.8) {
    v.x += MathUtils.randFloatSpread(k) * dt; v.y += MathUtils.randFloatSpread(k) * dt; v.z += MathUtils.randFloatSpread(k) * dt;
    v.clampLength(0, max); p.addScaledVector(v, dt);
  }
  function stepOne(dt) {
    // 閘極電壓慢慢跟上目標（按鈕切換時看得到通道長出來）
    state.vg += (state.vgTarget - state.vg) * Math.min(1, dt * 3);
    if (Math.abs(state.vg - state.vgTarget) < 0.002) state.vg = state.vgTarget;
    const ch = channel(state.vg), cur = current(state.vg);
    // 源極、汲極的自由電子
    for (let i = 0; i < nEl.length; i++) {
      const e = nEl[i];
      jiggle(e.p, e.v, dt);
      const x0 = e.left ? BODY.x0 + 0.08 : BODY.x1 - NREG.w + 0.08, x1 = x0 + NREG.w - 0.16;
      if (e.p.x < x0 || e.p.x > x1) { e.v.x *= -1; e.p.x = MathUtils.clamp(e.p.x, x0, x1); }
      if (e.p.y > -0.06 || e.p.y < -NREG.d + 0.06) { e.v.y *= -1; e.p.y = MathUtils.clamp(e.p.y, -NREG.d + 0.06, -0.06); }
      if (Math.abs(e.p.z) > 1.42) { e.v.z *= -1; e.p.z = Math.sign(e.p.z) * 1.42; }
      dummy.position.copy(e.p); dummy.scale.setScalar(1); dummy.updateMatrix(); nE.setMatrixAt(i, dummy.matrix);
    }
    nE.instanceMatrix.needsUpdate = true;
    // 電洞：閘極越正，越往下推（空乏區）
    const dep = 0.15 + 0.85 * Math.min(1, state.vg / VTH);
    holes.forEach((h, i) => {
      const under = Math.abs(h.home.x) < GX;
      const ty = under ? Math.max(BODY.y0 + 0.15, h.home.y - dep * 0.85 * (1 + h.home.y / 2.6)) : h.home.y;   // 越靠近閘極推得越遠，保持原本的上下分布
      h.p.x = h.home.x + Math.sin(perfT * 1.7 + i) * 0.05;
      h.p.y += (ty - h.p.y) * Math.min(1, dt * 4);
      h.p.z = h.home.z;
      dummy.position.copy(h.p); dummy.lookAt(camera.position); dummy.scale.setScalar(1); dummy.updateMatrix(); hMesh.setMatrixAt(i, dummy.matrix);
    });
    hMesh.instanceMatrix.needsUpdate = true;
    // 通道裡的電子：數量 ∝ 通道電荷，往右（汲極）漂、速度 ∝ 電流
    const n = Math.round(NC * ch);
    cE.count = n;
    for (let i = 0; i < n; i++) {
      const e = cEl[i];
      e.p.x += (0.4 + 2.4 * cur) * dt + MathUtils.randFloatSpread(0.6) * dt;
      e.p.y = MathUtils.clamp(e.p.y + MathUtils.randFloatSpread(0.5) * dt, -0.2, -0.04);
      if (e.p.x > GX + 0.15) e.p.x = -GX - 0.15;
      dummy.position.copy(e.p); dummy.scale.setScalar(1); dummy.updateMatrix(); cE.setMatrixAt(i, dummy.matrix);
    }
    cE.instanceMatrix.needsUpdate = true;
    chanGlow.material.opacity = 0.22 * ch;
    stepFlow(wire1, 2.2 * cur, dt, tmp);
    led1.set(cur);
    const g = state.vg / VDD;
    gateMat.emissiveIntensity = 0.45 * g; knob.material.emissiveIntensity = 0.35 * g;
    pluses.forEach((s, i) => { s.material.opacity = i < Math.round(9 * g) ? 0.95 : 0; });
  }
  function stepLogic(dt) {
    const a = state.a, b = state.b;
    const and = AND(a, b), or = OR(a, b);
    for (const [m, on] of [[andA, a], [andB, b], [orA, a], [orB, b]]) {
      m.gm.emissiveIntensity += ((on ? 0.6 : 0) - m.gm.emissiveIntensity) * Math.min(1, dt * 6);
      m.cm.opacity += ((on ? 0.85 : 0.06) - m.cm.opacity) * Math.min(1, dt * 6);
    }
    stepFlow(andFlow, 1.8 * and, dt, tmp);
    stepFlow(orFlowA, 1.8 * a, dt, tmp);
    stepFlow(orFlowB, 1.8 * b, dt, tmp);
    ledAnd.set(and); ledOr.set(or);
  }
  let perfT = 0;
  function step(dt) {
    if (state.playing) {
      perfT += dt;
      if (state.view === 'one') stepOne(dt); else stepLogic(dt);
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
    const on = state.labels, one = state.view === 'one', lg = !one;
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    show(L.src, on && one, V(BODY.x0 + NREG.w / 2 - 0.3, -NREG.d - 0.25, BODY.z));
    show(L.drn, on && one, V(BODY.x1 - NREG.w / 2 + 0.3, -NREG.d - 0.25, BODY.z));
    show(L.gate, on && one, V(-GX - 0.05, OX + GH * 0.6, BODY.z), 0);
    show(L.ox, on && one && !narrow, V(GX + 0.1, OX / 2 + 0.05, BODY.z), -16);
    show(L.body, on && one, V(0, BODY.y0 + 0.35, BODY.z));
    show(L.chan, on && one && channel(state.vg) > 0.15, V(0, -0.12, BODY.z), 18);
    show(L.bat, on && one && !narrow, V(-1.25, TOP + 0.5, 0));
    show(L.led, on && one && !narrow, V(1.3, TOP + 0.75, 0));
    const kh = `Gate voltage ${state.vg.toFixed(2)} V<small>閘極電壓</small>`;
    if (L.knob.innerHTML !== kh) L.knob.innerHTML = kh;
    show(L.knob, on && one, V(0, 2.55, 0.5), narrow ? 0 : 0);
    show(L.and, on && lg, V(-0.6, 0.2, zA - 0.8), -14);
    show(L.or, on && lg, V(-0.6, 0.2, 3.4), 16);
    for (const t of L.tags) {
      const v = state[t.k];
      const cls = `al-lab cp-lb cp-tag${v ? ' on' : ''}`;
      if (t.el.className !== cls) t.el.className = cls;
      show(t.el, lg, t.m.pos.clone().add(V(0, 0.45, 0)));
    }
    const la = `AND = ${AND(state.a, state.b)}`, lo = `OR = ${OR(state.a, state.b)}`;
    if (L.ledAnd.textContent !== la) L.ledAnd.textContent = la;
    if (L.ledOr.textContent !== lo) L.ledOr.textContent = lo;
    show(L.ledAnd, on && lg, V(3.3, 0.9, zA));
    show(L.ledOr, on && lg, V(3.3, 0.9, zO));
  }

  // =====================================================================
  // 讀數
  // =====================================================================
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    const vg = state.vg, ch = channel(vg), cur = current(vg), bit = isOn(vg) ? 1 : 0;
    if (R.vgOut) { const t = `${state.vgTarget.toFixed(2)} V`; if (R.vgOut.textContent !== t) R.vgOut.textContent = t; }
    const chan = ch <= 0 ? 'Closed<small>關閉</small>' : ch < 0.5 ? 'Opening<small>正在打開</small>' : 'Open<small>打開</small>';
    const curS = `${Math.round(cur * 100)}%<small>${cur < 0.01 ? '幾乎沒有' : cur < 0.25 ? '一點點' : cur < 0.75 ? '中等' : '很多'}</small>`;
    const bitS = `${bit}<small>${bit ? '開（on）' : '關（off）'}</small>`;
    const a = state.a, b = state.b, h = halfAdd(a, b);
    const key = chan + curS + bitS + a + b;
    if (key !== state.lastRead) {
      state.lastRead = key;
      R.chan.innerHTML = chan; R.cur.innerHTML = curS; R.bit.innerHTML = bitS;
      R.bit.classList.toggle('on', !!bit);
      if (R.truth) R.truth.querySelectorAll('tr[data-ab]').forEach((tr) => tr.classList.toggle('on', tr.getAttribute('data-ab') === `${a}${b}`));
      if (R.sum) R.sum.innerHTML = `${a} + ${b} = <b>${h.carry}${h.sum}</b> <small>binary · 二進位</small> = <b>${a + b}</b>`
        + `<span class="zh">carry 進位 ${h.carry}＝AND；sum 個位 ${h.sum}＝「剛好一個是 1」</span>`;
    }
    if (R.meter) R.meter.style.width = `${(cur * 100).toFixed(1)}%`;
    let mk;
    if (state.view === 'one') mk = ch <= 0 ? (vg > 0.05 ? 'low' : 'off') : cur < 0.6 ? 'part' : 'on';
    else mk = a && b ? 'and1' : a || b ? 'or1' : 'none';
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
  let band0 = null;
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
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setView('one', true);
  setGate(0, true);
  setInput('a', 1); setInput('b', 0);
  resize();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    off: () => { setView('one'); setGate(0); setPlaying(true); },
    on: () => { setView('one'); setGate(1); setPlaying(true); },
    and: () => { setView('logic'); setInput('a', 1); setInput('b', 1); setPlaying(true); },
    or: () => { setView('logic'); setInput('a', 1); setInput('b', 0); setPlaying(true); },
  };
  root.__lab = {
    camera, controls, state, setView, setGate, setInput, setPlaying,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------------------------------------------------------------
// 頁面下方「一秒數一顆，要數多久？」：不需要 WebGL
// ---------------------------------------------------------------------
function initCount() {
  const box = document.querySelector('[data-chip-count]');
  if (!box) return;
  let chips, people;
  try { chips = JSON.parse(box.getAttribute('data-chips')); people = Number(box.getAttribute('data-people')); } catch (e) { return; }
  const sel = box.querySelector('.cp-cnt-chip'), who = box.querySelectorAll('[data-who]');
  const outEn = box.querySelector('.cp-cnt-en'), outZh = box.querySelector('.cp-cnt-zh'), outN = box.querySelectorAll('.cp-cnt-n');
  const live = box.querySelectorAll('.cp-cnt-live');
  let whoK = 'me';
  const t0 = Date.now();
  function update() {
    const c = chips[Number(sel.value)] || chips[0];
    const per = whoK === 'taiwan' ? people : 1;
    const d = fmtDuration(countSeconds(c.n, per));
    outEn.textContent = d.en; outZh.textContent = d.zh;
    outN.forEach((el) => { el.textContent = c.n.toLocaleString('en-US'); });
    who.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-who') === whoK ? 'true' : 'false'));
  }
  function tick() {
    const s = Math.floor((Date.now() - t0) / 1000);
    live.forEach((el) => { el.textContent = s.toLocaleString('en-US'); });
  }
  sel.addEventListener('change', update);
  who.forEach((b) => b.addEventListener('click', () => { whoK = b.getAttribute('data-who'); update(); }));
  update(); tick(); setInterval(tick, 1000);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCount);
else initCount();

lazyBoot('[data-chiptransistor-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
