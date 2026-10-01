/*
 * 萬物原理 · 第二課「插座裡的電從哪裡來？」的 3D 發電機（全部是自繪示意，不是真實比例）。
 *
 * 一個機制：磁鐵在線圈旁邊「轉」，才會推動電子；N 極、S 極輪流掃過線圈，電流就一下往這邊、一下往那邊（交流電）。
 * 磁鐵不動就沒有電（法拉第 1831）。不管是蒸汽、水還是風在轉它，做的都是同一件事：轉動那根軸。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。
 *   轉軸沿 X 軸：左邊（x≈-2.4）是推動它的東西（手搖、蒸汽渦輪、水車、風機葉片），中間 x = 0 是磁鐵與上下兩組線圈，
 *   右邊（x≈4.3）是一間房子裡的燈泡，電線從上線圈出來、經過燈泡、回到下線圈。
 *   磁鐵繞 X 軸轉 θ；θ = 0 時 N 極朝上。穿過上線圈的磁通 ∝ cos θ，所以感應電壓 ∝ 轉速 × sin θ。
 *
 * 電線裡的電子：交流電的電子不會從電廠跑到你家，只是在原地來回晃。位移 ∝ ∫電流 dt ∝ −cos θ，
 *   振幅和轉速無關（轉越快，電流越大，但每次晃的時間越短）。所以模型裡的藍色小珠一直在原地來回，不會繞圈。
 * 燈泡亮度 ∝ 電壓²：慢動作時看得到它一閃一閃（電壓每半圈經過一次零）；真正 60 Hz 時一秒閃 120 次，眼睛看不出來。
 *
 * 真實電廠用的是電磁鐵、三組線圈（三相），這裡簡化成一根磁棒、兩組線圈、一條電路。
 *
 * 產物：cd tools/science && npm run build → assets/js/generator.js
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, ConeGeometry,
  CylinderGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight, InstancedMesh, Line, LineBasicMaterial,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PointLight, Scene, SphereGeometry,
  Sprite, SpriteMaterial, SRGBColorSpace, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { emf, flipsPerSecond, REAL_HZ, realRpm } from './grid.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const TAU = Math.PI * 2;
const ELEC = 0x58e1ff;
const F_MAX = 2;                 // 滑桿最快每秒 2 圈（模型）
const CRANK_TOP = 1.4;           // 手搖最快每秒 1.4 圈
const DRV_X = -2.4;              // 推動者的位置

const glowTex = () => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,225,150,.75)'); gr.addColorStop(1, 'rgba(255,190,80,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
};

const DRIVE = {
  crank: { en: 'Your hand', zh: '你的手',
    msg: ['Your hand is the power plant. Hold the button to crank: the faster you turn, the brighter the bulb. Let go, and everything stops.',
      '你的手就是發電廠。按住按鈕轉動：轉得越快，燈越亮。一放手，一切就停下來。'] },
  steam: { en: 'Steam or gas turbine', zh: '蒸汽／燃氣渦輪',
    msg: ['Coal and nuclear plants boil water into high-pressure steam that blasts through the turbine blades. Gas plants burn gas in a turbine like a jet engine, and many reuse the hot exhaust to make steam too.',
      '燃煤和核能電廠把水燒成高壓蒸汽，衝過渦輪的葉片。燃氣電廠在像噴射引擎的渦輪裡燒天然氣，很多還會用排出的熱氣再燒一次蒸汽。'] },
  water: { en: 'Falling water', zh: '水力',
    msg: ['Water rushing down from a dam pushes the blades. No fuel is burned; the energy comes from water that the sun lifted up as rain.',
      '從水壩衝下來的水推動葉片。不燒任何燃料；能量來自被太陽蒸發、再化成雨落到高處的水。'] },
  wind: { en: 'Wind', zh: '風力',
    msg: ['The wind pushes the long blades. Real wind turbines turn slowly, so a gearbox or a very large generator does the rest. In the model they share one shaft.',
      '風推動長長的葉片。真的風機轉得很慢，要靠齒輪箱或特別大的發電機補足；模型裡讓它們共用一根軸。'] },
};
const STOP_MSG = ['Nothing is spinning, so nothing pushes the electrons. A magnet sitting still next to a coil makes no electricity at all.',
  '沒有東西在轉，就沒有力量推電子。磁鐵就算緊貼著線圈，只要不動，一點電也沒有。'];

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
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0.4, -0.05, 0);
  const homePos = () => V(5.6, 3.2, 14.6).multiplyScalar(camera.aspect < 0.9 ? 1.15 : camera.aspect < 1.2 ? 0.9 : 1);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 30;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xdfe8ff, 0x1a1a28, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(3, 6, 7); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-5, 2, -4); scene.add(rim);

  const R = {
    play: $('.al-play'), speed: $('.gn-speed'), speedOut: $('.gn-speed-out'), crank: $('.gn-crank'),
    msg: $('.gn-drive-msg'), f: $('.gn-f'), flip: $('.gn-flip'), bright: $('.gn-bright'), scope: $('.gn-scope-cv'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    drive: 'steam', playing: true, fSet: 0.5, f: 0.5, theta: 0.6, cranking: false,
    labels: true, field: true, electrons: true, lastMsg: '', t: 0,
  };

  // ---------------- 發電機 ----------------
  const ironMat = new MeshStandardMaterial({ color: 0x6f7787, metalness: 0.6, roughness: 0.45 });
  const coilMats = [];
  for (const sgn of [1, -1]) {
    const core = at(new Mesh(new BoxGeometry(0.62, 0.9, 0.62), ironMat), 0, sgn * 1.75, 0);
    scene.add(core);
    const shoe = at(new Mesh(new BoxGeometry(0.9, 0.12, 0.9), ironMat), 0, sgn * 1.27, 0);
    scene.add(shoe);
    const cm = new MeshStandardMaterial({ color: 0xc8743a, metalness: 0.55, roughness: 0.35, emissive: 0xff9a3a, emissiveIntensity: 0 });
    coilMats.push(cm);
    for (let k = 0; k < 7; k++) {
      const ring = new Mesh(new TorusGeometry(0.44, 0.055, 10, 32), cm);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, sgn * (1.42 + k * 0.1), 0);
      scene.add(ring);
    }
  }
  // 底座與支架
  const baseMat = new MeshStandardMaterial({ color: 0x27304a, roughness: 0.8 });
  scene.add(at(new Mesh(new BoxGeometry(2.0, 0.14, 1.4), baseMat), 0, -2.3, 0));
  // 支架只放在後面，不擋住磁鐵
  scene.add(at(new Mesh(new BoxGeometry(0.2, 4.6, 0.2), baseMat), 0, 0, -0.75));
  for (const sgn of [1, -1]) scene.add(at(new Mesh(new BoxGeometry(0.2, 0.2, 0.75), baseMat), 0, sgn * 2.05, -0.42));

  // 轉軸＋磁鐵（繞 X 軸轉）
  const rotor = new Group(); scene.add(rotor);
  const shaft = new Mesh(new CylinderGeometry(0.07, 0.07, 3.6, 16), new MeshStandardMaterial({ color: 0xc9ced8, metalness: 0.8, roughness: 0.25 }));
  shaft.rotation.z = Math.PI / 2; shaft.position.x = -1.2; rotor.add(shaft);
  const nMat = new MeshStandardMaterial({ color: 0xe0474c, roughness: 0.45 });
  const sMat = new MeshStandardMaterial({ color: 0x3f7fe0, roughness: 0.45 });
  rotor.add(at(new Mesh(new BoxGeometry(0.42, 1.0, 0.42), nMat), 0, 0.55, 0));
  rotor.add(at(new Mesh(new BoxGeometry(0.42, 1.0, 0.42), sMat), 0, -0.55, 0));
  // 磁力線：從 N 出來、繞回 S（跟著磁鐵轉）
  const field = new Group(); rotor.add(field);
  const fieldMat = new LineBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.45 });
  for (const ang of [0, Math.PI / 2]) for (const r of [0.55, 0.9, 1.3]) for (const sgn of [1, -1]) {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40 * Math.PI;
      const y = 1.05 * Math.cos(t) * (1 + 0.35 * r * Math.sin(t));
      const w = sgn * r * Math.sin(t);
      pts.push(V(Math.sin(ang) * w, y, Math.cos(ang) * w));
    }
    field.add(new Line(new BufferGeometry().setFromPoints(pts), fieldMat));
  }

  // ---------------- 推動者 ----------------
  const drivers = {};
  const blade = new MeshStandardMaterial({ color: 0xd9dee8, metalness: 0.5, roughness: 0.35, side: DoubleSide });
  { // 手搖
    const g = new Group();
    g.add(at(new Mesh(new BoxGeometry(0.12, 0.9, 0.16), new MeshStandardMaterial({ color: 0x8a6a3a })), 0, 0.45, 0));
    const h = new Mesh(new CylinderGeometry(0.09, 0.09, 0.6, 14), new MeshStandardMaterial({ color: 0xffd36e }));
    h.rotation.z = Math.PI / 2; h.position.set(-0.3, 0.9, 0); g.add(h);
    drivers.crank = g;
  }
  { // 蒸汽／燃氣渦輪：一圈斜葉片＋半透明外殼
    const g = new Group();
    g.add(new Mesh(new CylinderGeometry(0.25, 0.25, 0.5, 20).rotateZ(Math.PI / 2), blade));
    for (let i = 0; i < 18; i++) {
      const b = new Mesh(new BoxGeometry(0.3, 0.62, 0.05), blade);
      const a = i / 18 * TAU;
      b.position.set(0, Math.cos(a) * 0.58, Math.sin(a) * 0.58);
      b.rotation.x = -a; b.rotateY(0.6);
      g.add(b);
    }
    drivers.steam = g;
  }
  { // 水車
    const g = new Group();
    g.add(new Mesh(new CylinderGeometry(0.22, 0.22, 0.6, 20).rotateZ(Math.PI / 2), blade));
    for (let i = 0; i < 10; i++) {
      const a = i / 10 * TAU;
      const arm = new Mesh(new BoxGeometry(0.06, 1.05, 0.06), blade);
      arm.position.set(0, Math.cos(a) * 0.52, Math.sin(a) * 0.52); arm.rotation.x = -a; g.add(arm);
      const pad = new Mesh(new BoxGeometry(0.6, 0.06, 0.32), new MeshStandardMaterial({ color: 0x8fb4d8, metalness: 0.4, roughness: 0.4 }));
      pad.position.set(0, Math.cos(a) * 1.02, Math.sin(a) * 1.02); pad.rotation.x = -a; g.add(pad);
    }
    drivers.water = g;
  }
  { // 風機：三片長葉片
    const g = new Group();
    g.add(new Mesh(new SphereGeometry(0.26, 18, 14), blade));
    for (let i = 0; i < 3; i++) {
      const a = i / 3 * TAU;
      const b = new Mesh(new BoxGeometry(0.06, 2.1, 0.32), blade);
      b.geometry.translate(0, 1.15, 0);
      b.rotation.x = -a; b.rotateY(0.35);
      g.add(b);
    }
    g.position.x = -0.6;
    drivers.wind = g;
  }
  const driveHolder = new Group(); driveHolder.position.x = DRV_X; rotor.add(driveHolder);
  for (const g of Object.values(drivers)) { driveHolder.add(g); g.visible = false; }
  // 渦輪外殼（蒸汽）
  const casing = new Mesh(new CylinderGeometry(0.9, 0.9, 0.9, 32, 1, true).rotateZ(Math.PI / 2),
    new MeshStandardMaterial({ color: 0x8aa0c8, transparent: true, opacity: 0.16, side: DoubleSide, depthWrite: false }));
  casing.position.x = DRV_X; scene.add(casing);

  // 粒子：蒸汽（白）、水（藍）、風（淡青）
  const NP = 140;
  const pMat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, depthWrite: false });
  const parts = new InstancedMesh(new SphereGeometry(0.05, 8, 6), pMat, NP);
  scene.add(parts);
  let seed = 11;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const P = Array.from({ length: NP }, () => ({ u: rnd(), a: rnd() * TAU, r: rnd(), z: rnd() }));
  const dummy = new Object3D();
  function placeParticles(dt) {
    const d = state.drive;
    parts.visible = d !== 'crank';
    if (!parts.visible) return;
    pMat.color.setHex(d === 'steam' ? 0xf2f4f8 : d === 'water' ? 0x5aa8ff : 0xbfefff);
    pMat.opacity = d === 'wind' ? 0.3 : d === 'steam' ? 0.38 : 0.55;
    const rate = 0.25 + 0.6 * state.f;
    for (let i = 0; i < NP; i++) {
      const p = P[i];
      if (state.playing) p.u = (p.u + dt * rate * (d === 'water' ? 0.9 : 0.6)) % 1;
      if (d === 'steam') {          // 沿 +X 穿過渦輪
        const rr = 0.2 + 0.6 * p.r;
        dummy.position.set(-4.0 + p.u * 2.6, Math.cos(p.a) * rr, Math.sin(p.a) * rr);
        dummy.scale.setScalar(0.7 + 0.7 * p.u);
      } else if (d === 'water') {   // 從上方落下、打在水車正面
        dummy.position.set(DRV_X - 0.25 + p.r * 0.5, 2.6 - p.u * 4.2, 0.95 + p.z * 0.35);
        dummy.scale.setScalar(1.1);
      } else {                      // 風：橫向吹過葉片
        const rr = 2.3 * Math.sqrt(p.r);
        dummy.position.set(-6.5 + p.u * 4.2, Math.cos(p.a) * rr, Math.sin(p.a) * rr);
        dummy.scale.set(4, 0.5, 0.5);
      }
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      parts.setMatrixAt(i, dummy.matrix);
    }
    parts.instanceMatrix.needsUpdate = true;
  }

  // ---------------- 電路與房子 ----------------
  const BULB = V(3.6, 0.55, 0);
  const LOOP = new CatmullRomCurve3([
    V(0.25, 2.25, 0.32), V(0.8, 2.6, 0.5), V(2.2, 2.6, 0.5), V(3.1, 1.6, 0.3), V(3.48, 0.95, 0.05),
    V(3.6, 0.78, 0),
    V(3.72, 0.95, 0.05), V(3.4, -0.6, 0.3), V(2.6, -2.6, 0.5), V(0.8, -2.6, 0.5), V(0.25, -2.25, 0.32),
  ], false, 'centripetal');
  const LOOP_L = LOOP.getLength();
  scene.add(new Mesh(new TubeGeometry(LOOP, 220, 0.04, 8, false), new MeshStandardMaterial({ color: 0x9a6a3e, roughness: 0.45, metalness: 0.4 })));
  // 房子：半透明牆＋屋頂
  const house = new Group(); house.position.set(3.6, -0.55, -0.1); scene.add(house);
  const wallMat = new MeshStandardMaterial({ color: 0xf3ead6, transparent: true, opacity: 0.13, depthWrite: false, side: DoubleSide });
  house.add(new Mesh(new BoxGeometry(1.7, 2.3, 1.4), wallMat));
  const roof = new Mesh(new ConeGeometry(1.4, 0.9, 4, 1, true), new MeshStandardMaterial({ color: 0xc2703d, transparent: true, opacity: 0.55, side: DoubleSide }));
  roof.rotation.y = Math.PI / 4; roof.position.y = 1.6; roof.scale.set(1, 1, 0.82); house.add(roof);
  const outlet = at(new Mesh(new BoxGeometry(0.28, 0.36, 0.04), new MeshStandardMaterial({ color: 0xf6f3ea })), 0.45, -0.75, 0.72);
  house.add(outlet);
  for (const dx of [-0.05, 0.05]) house.add(at(new Mesh(new BoxGeometry(0.03, 0.09, 0.02), new MeshBasicMaterial({ color: 0x333333 })), 0.45 + dx, -0.72, 0.745));
  // 燈泡
  const glassMat = new MeshStandardMaterial({ color: 0xfff6dc, transparent: true, opacity: 0.32, roughness: 0.1, emissive: 0xffc860, emissiveIntensity: 0 });
  scene.add(at(new Mesh(new CylinderGeometry(0.13, 0.15, 0.22, 16), new MeshStandardMaterial({ color: 0xb8bcc4, metalness: 0.7, roughness: 0.3 })), BULB.x, BULB.y + 0.2, 0));
  scene.add(at(new Mesh(new SphereGeometry(0.3, 28, 20), glassMat), BULB.x, BULB.y - 0.12, 0));
  const glow = new Sprite(new SpriteMaterial({ map: glowTex(), blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  glow.position.set(BULB.x, BULB.y - 0.12, 0); glow.scale.set(2.2, 2.2, 1); scene.add(glow);
  const bulbLight = new PointLight(0xffc860, 0, 7); bulbLight.position.copy(glow.position); scene.add(bulbLight);

  // 電線裡的電子：原地來回晃
  const NE = 64, SP = LOOP_L / NE, AMP = SP * 0.55;
  const eMesh = new InstancedMesh(new SphereGeometry(0.065, 10, 8), new MeshBasicMaterial({ color: ELEC }), NE);
  scene.add(eMesh);
  const tmp = V(0, 0, 0), tan = V(0, 0, 0);
  function placeElectrons() {
    eMesh.visible = state.electrons;
    if (!state.electrons) return;
    const off = -AMP * Math.cos(state.theta) - (-AMP);   // θ = 0 時在原位
    for (let i = 0; i < NE; i++) {
      const s = MathUtils.clamp((i + 0.5) * SP + off, 0.001, LOOP_L - 0.001);
      LOOP.getPointAt(s / LOOP_L, tmp);
      dummy.position.copy(tmp); dummy.scale.setScalar(1); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
      eMesh.setMatrixAt(i, dummy.matrix);
    }
    eMesh.instanceMatrix.needsUpdate = true;
  }
  // 電流方向箭頭：跟著 sin θ 翻轉
  const arrows = [0.18, 0.36, 0.66, 0.84].map((u) => {
    const m = new Mesh(new ConeGeometry(0.1, 0.28, 14), new MeshBasicMaterial({ color: ELEC, transparent: true, opacity: 0.9 }));
    m.userData.u = u; scene.add(m); return m;
  });
  function placeArrows(v) {
    const dir = Math.sign(v);
    for (const a of arrows) {
      a.visible = state.electrons && Math.abs(v) > 0.04;
      if (!a.visible) continue;
      a.material.opacity = Math.min(0.95, 0.25 + Math.abs(v) * 1.2);
      LOOP.getPointAt(a.userData.u, a.position);
      LOOP.getTangentAt(a.userData.u, tan).multiplyScalar(dir);
      a.position.z += 0.2;
      a.quaternion.setFromUnitVectors(V(0, 1, 0), tan);
    }
  }

  // ---------------- 標籤 ----------------
  const LB = {
    n: lab.add('gn-lb gn-lb-n', 'N'), s: lab.add('gn-lb gn-lb-s', 'S'),
    magnet: lab.add('bt-lb', 'Spinning magnet<small>轉動的磁鐵</small>'),
    coilT: lab.add('bt-lb gn-lb-coil', 'Coil of wire<small>線圈</small>'),
    coilB: lab.add('bt-lb gn-lb-coil', 'Coil of wire<small>線圈</small>'),
    drive: lab.add('bt-lb bt-lb-b', ''),
    house: lab.add('bt-lb', 'Your home<small>你家</small>'),
    outlet: lab.add('bt-lb bt-lb-x', 'Outlet: 110 V, 60 Hz<small>插座</small>'),
    e: lab.add('bt-lb bt-lb-el', 'Electrons e⁻<small>電子在原地來回晃</small>'),
  };
  let narrow = false;
  const tip = V(0, 0, 0);
  function updateLabels() {
    const on = state.labels;
    for (const [k, el] of Object.entries(LB)) el.hidden = !on;
    if (!on) return;
    tip.set(0, 1.25 * Math.cos(state.theta), 1.25 * Math.sin(state.theta)); lab.place(LB.n, tip);
    tip.set(0, -1.25 * Math.cos(state.theta), -1.25 * Math.sin(state.theta)); lab.place(LB.s, tip);
    lab.place(LB.magnet, V(0.3, -0.2, 1.7));
    lab.place(LB.coilT, V(-0.9, 1.75, 0.2));
    lab.place(LB.coilB, V(-0.9, -1.75, 0.2));
    LB.coilT.hidden = LB.coilB.hidden = narrow;
    const d = DRIVE[state.drive];
    LB.drive.innerHTML = `${d.en}<small>${d.zh}</small>`;
    lab.place(LB.drive, V(DRV_X - 0.3, state.drive === 'wind' ? -2.6 : -1.55, 0.6));
    lab.place(LB.house, V(3.6, 1.95, 0.6));
    lab.place(LB.outlet, V(4.05, -1.85, 0.8));
    LB.outlet.hidden = narrow;
    lab.place(LB.e, V(1.5, 3.0, 0.5));
    LB.e.hidden = !state.electrons || narrow;
  }

  // ---------------- 示波器（2D） ----------------
  const sc = R.scope.getContext('2d');
  const HIST = [];
  const WIN = 2.4;   // 秒
  function drawScope() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = R.scope.clientWidth, h = R.scope.clientHeight;
    if (!w || !h) return;
    if (R.scope.width !== Math.round(w * dpr)) { R.scope.width = Math.round(w * dpr); R.scope.height = Math.round(h * dpr); }
    sc.setTransform(dpr, 0, 0, dpr, 0, 0);
    sc.clearRect(0, 0, w, h);
    const mid = h / 2, amp = h * 0.42;
    sc.strokeStyle = 'rgba(160,180,230,.18)'; sc.lineWidth = 1;
    for (let i = 1; i < 6; i++) { sc.beginPath(); sc.moveTo(w * i / 6, 0); sc.lineTo(w * i / 6, h); sc.stroke(); }
    sc.strokeStyle = 'rgba(160,180,230,.4)';
    sc.beginPath(); sc.moveTo(0, mid); sc.lineTo(w, mid); sc.stroke();
    sc.fillStyle = 'rgba(159,176,207,.9)'; sc.font = '600 11px system-ui, sans-serif';
    sc.fillText('+', 4, 13); sc.fillText('−', 4, h - 5); sc.fillText('0', 4, mid - 3);
    if (HIST.length > 1) {
      const tNow = state.t;
      sc.strokeStyle = '#4fd1c5'; sc.lineWidth = 2.2; sc.beginPath();
      HIST.forEach(([t, v], i) => {
        const x = w - (tNow - t) / WIN * w, y = mid - v * amp;
        if (i) sc.lineTo(x, y); else sc.moveTo(x, y);
      });
      sc.stroke();
      const v = HIST[HIST.length - 1][1];
      sc.fillStyle = '#ffd36e'; sc.beginPath(); sc.arc(w - 3, mid - v * amp, 4.5, 0, TAU); sc.fill();
    }
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let lastR = 0;
  function readout(force) {
    const now = performance.now();
    if (!force && now - lastR < 120) return;
    lastR = now;
    R.f.textContent = state.f.toFixed(2);
    R.flip.textContent = flipsPerSecond(state.f).toFixed(1);
    const b = Math.min(1, (state.f / 1.2) ** 2);
    R.bright.textContent = state.f < 0.02 ? 'Off · 不亮' : b < 0.15 ? 'Faint, flickering · 微弱閃爍' : b < 0.6 ? 'Flickering · 一閃一閃' : 'Bright · 亮';
    const m = state.f < 0.02 ? STOP_MSG : DRIVE[state.drive].msg;
    const html = `${esc(m[0])}<span class="zh">${esc(m[1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    root.querySelectorAll('[data-drive]').forEach((b2) => b2.setAttribute('aria-pressed', b2.getAttribute('data-drive') === state.drive ? 'true' : 'false'));
  }

  // ---------------- 操作 ----------------
  function setDrive(d) {
    if (!DRIVE[d]) return;
    state.drive = d;
    for (const [k, g] of Object.entries(drivers)) g.visible = k === d;
    casing.visible = d === 'steam';
    R.crank.hidden = d !== 'crank';
    root.classList.toggle('gn-is-crank', d === 'crank');
    if (d === 'crank') state.f = 0;
    readout(true);
  }
  root.querySelectorAll('[data-drive]').forEach((b) => b.addEventListener('click', () => {
    setDrive(b.getAttribute('data-drive'));
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
  function setSpeed(f) {
    state.fSet = MathUtils.clamp(f, 0, F_MAX);
    R.speed.value = String(state.fSet);
    R.speed.style.setProperty('--p', `${state.fSet / F_MAX * 100}%`);
    R.speedOut.textContent = state.fSet < 0.02 ? 'Stopped · 停止' : `${state.fSet.toFixed(2)} turns/s · 圈／秒`;
    if (state.drive === 'crank') setDrive('steam');
  }
  R.speed.addEventListener('input', () => setSpeed(parseFloat(R.speed.value)));
  const crankOn = (e) => { e.preventDefault(); state.cranking = true; R.crank.classList.add('on'); if (!state.playing) setPlaying(true); };
  const crankOff = () => { state.cranking = false; R.crank.classList.remove('on'); };
  // 按住期間鎖定指標：手指稍微滑出按鈕、或頁面還在捲動，都不算放手
  R.crank.addEventListener('pointerdown', (e) => { crankOn(e); try { R.crank.setPointerCapture(e.pointerId); } catch (err) { /* 舊瀏覽器 */ } });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => R.crank.addEventListener(ev, crankOff));
  R.crank.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') crankOn(e); });
  R.crank.addEventListener('keyup', crankOff);
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="field"]', (v) => { state.field = v; field.visible = v; });
  bind('[data-t="electrons"]', (v) => { state.electrons = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 迴圈 ----------------
  let glowNow = 0;
  function step(dt) {
    if (state.playing) {
      if (state.drive === 'crank') {
        // 按住：加速；放手：摩擦讓它慢下來
        const target = state.cranking ? CRANK_TOP : 0;
        state.f += (target - state.f) * Math.min(1, dt * (state.cranking ? 1.6 : 0.9));
        if (!state.cranking && state.f < 0.01) state.f = 0;
      } else {
        state.f += (state.fSet - state.f) * Math.min(1, dt * 2.5);
      }
      state.theta = (state.theta + TAU * state.f * dt) % TAU;
      state.t += dt;
    }
    rotor.rotation.x = state.theta;
    const v = emf(state.f, state.theta, F_MAX);     // −1 … 1
    if (state.playing) {
      HIST.push([state.t, v]);
      while (HIST.length && state.t - HIST[0][0] > WIN) HIST.shift();
    }
    // 線圈發光、燈泡亮度 ∝ v²
    for (const m of coilMats) m.emissiveIntensity = 0.9 * Math.abs(v);
    const target = Math.min(1, v * v * (F_MAX / 1.2) ** 2);
    glowNow += (target - glowNow) * Math.min(1, dt * 18);
    glassMat.emissiveIntensity = 1.7 * glowNow;
    glow.material.opacity = 0.95 * glowNow;
    bulbLight.intensity = 6 * glowNow;
    placeParticles(dt);
    placeElectrons();
    placeArrows(v);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    readout();
  }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    drawScope();
    raf = requestAnimationFrame(frame);
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
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setDrive('steam');
  setSpeed(0.5);
  root.classList.add('al-ready', 'al-fresh', 'is-playing');
  // 真實數字（頁面上的說明也用同一個來源）
  const real = $('.gn-real-rpm'); if (real) real.textContent = realRpm(2).toLocaleString('en-US');
  const realHz = $('.gn-real-hz'); if (realHz) realHz.textContent = String(REAL_HZ);

  // 除錯：document.querySelector('[data-generator-lab]').__lab
  root.__lab = {
    camera, controls, state, setDrive, setSpeed,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); drawScope(); },
  };
  return { ready: () => true, drive: (d) => { setDrive(d); if (d !== 'crank' && state.fSet < 0.2) setSpeed(0.5); } };
}

lazyBoot('[data-generator-lab]', initLab, {
  drive: (lab, v) => lab.drive(v),
});
