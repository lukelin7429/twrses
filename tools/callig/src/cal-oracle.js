/*
 * 書法 · 第五課「漢字從哪裡來？甲骨文到篆書」的 3D 模型（全部自繪示意，不照實物比例）。
 *
 * 書桌上三個地方，data-mode 切換、鏡頭飛過去：
 *   shell 甲骨：龜的腹甲。背面有挖好的凹洞（鑽鑿）→ 用燒熱的棒子灼燒 → 翻到正面出現裂紋（卜兆，像「卜」字）
 *               → 銅刀把字刻在裂紋旁邊（甲骨文的線是刀刻的：直、細）。四個步驟可以一步一步看（data-step），也能從頭播。
 *   bronze 金文：青銅鼎，字鑄在鼎裡面（示意：畫在內底）；旁邊一張紙「拓」出來，黑底白字（拓片）。
 *   seal 小篆：毛筆用中鋒、一樣的力道寫小篆，線條一樣粗（寫字引擎，sealChar 把壓力固定）。
 * 六個字（日月山水人馬）用 data-char 換；每個模式都用同一個字的那個時代的字形（scripts2d.js）。
 * 2D（不需要 WebGL）：三千年滑桿（time2d.js 的 initTimeline）、「這是哪個字？」（initWhich）、練字板寫小篆（pad.js）。
 *
 * 座標同 brush3d.js：+X 往右、+Y 往上、+Z 朝向觀眾；1 單位約 10 公分（但甲骨、鼎、字都放大了，不是實際大小）。
 * 產物：cd tools/callig && npm run build → assets/js/cal-oracle.js
 * 除錯：document.querySelector('[data-caloracle-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  ExtrudeGeometry, Group, HemisphereLight, LatheGeometry, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, PlaneGeometry, PointLight, Scene, Shape, ShapeGeometry, SphereGeometry, SRGBColorSpace,
  Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { rng } from './ink2d.js';
import { initPad } from './pad.js';
import { KEYS, boneBase, drawCarved, drawStage, glyphFor, rubbingBase, sealChar } from './scripts2d.js';
import { initTimeline, initWhich } from './time2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const SEALS = Object.fromEntries(KEYS.map((k) => [k, sealChar(k)]));

// 三個地方
const SHELL = { x: -2.55, z: 0.25, w: 1.6, h: 2.5, t: 0.07 };      // 腹甲（長軸沿 z）
const PAPER = { x: 0.2, z: 0.5, w: 2.4, h: 2.8, box: 2.0, bc: [0.2, 0.42] };
const DING = { x: 2.75, z: -0.55, r: 0.72 };
const RUB = { x: 2.75, z: 1.25, s: 1.35 };

// 腹甲的貼圖：字框放在右半邊、裂紋在左半邊（腹甲座標：x 往右、y 往觀眾，單位同世界）
const PPU = 420;
const GLYPH = { cx: 0.34, cy: -0.18, s: 0.66 };
const CRACK = { x: -0.34, y: -0.3 };
// 腹甲的輪廓（右半邊，y 從頭到尾；左右對稱）
const OUTLINE = [[0, -1.25], [0.3, -1.21], [0.5, -1.06], [0.6, -0.82], [0.66, -0.56], [0.8, -0.4], [0.82, 0.12], [0.7, 0.4], [0.62, 0.72], [0.52, 1.0], [0.34, 1.22], [0.14, 1.17], [0, 1.1]];

function shellShape() {
  const pts = [...OUTLINE.map(([x, y]) => new Vector2(x, -y)), ...OUTLINE.slice(1, -1).reverse().map(([x, y]) => new Vector2(-x, -y))];
  const s = new Shape();
  s.moveTo(pts[0].x, pts[0].y);
  s.splineThru([...pts.slice(1), pts[0]]);
  return s;
}

/** 背面的凹洞：長的（鑿）＋旁邊圓的（鑽），一對一對排好；裂紋那一對要對上正面的 CRACK */
function hollowList() {
  const out = [];
  for (const y of [-0.82, -0.3, 0.22, 0.7]) for (const x of [-0.34, 0.34]) out.push({ x, y });
  return out;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  const scene = new Scene();
  scene.background = new Color(0x0b1326);
  const camera = new PerspectiveCamera(34, 1, 0.05, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.5; controls.maxDistance = 30;
  controls.maxPolarAngle = Math.PI * 0.47;
  scene.add(new HemisphereLight(0xfff4e0, 0x2a2018, 0.8));
  scene.add(new AmbientLight(0xffffff, 0.14));
  const sun = new DirectionalLight(0xfff1dc, 1.5);
  sun.position.set(-4, 9, 5); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 4, bottom: -4, near: 1, far: 25 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  makeDesk(scene, { w: 10.4, d: 6.2, felt: [PAPER.x, PAPER.z, 3.0, 3.6], weight: [PAPER.x, PAPER.z - PAPER.h / 2 + 0.16, 2.2], stone: null });

  // -------------------------------------------------------------------
  // 甲骨：腹甲（側邊＋正面貼圖＋背面貼圖）
  // -------------------------------------------------------------------
  const shell = new Group();
  const shape = shellShape();
  const boneMat = new MeshStandardMaterial({ color: 0xd9c9a3, roughness: 0.78 });
  const body = new Mesh(new ExtrudeGeometry(shape, { depth: SHELL.t, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 40 }), boneMat);
  const capW = SHELL.w + 0.1, capH = SHELL.h + 0.1;
  const makeCap = () => {
    const c = document.createElement('canvas'); c.width = Math.round(capW * PPU); c.height = Math.round(capH * PPU);
    const tex = new CanvasTexture(c); tex.colorSpace = SRGBColorSpace; tex.anisotropy = 4;
    tex.repeat.set(1 / capW, 1 / capH); tex.offset.set(0.5, 0.5);
    return { c, g: c.getContext('2d'), tex };
  };
  const front = makeCap(), back = makeCap();
  const topM = new Mesh(new ShapeGeometry(shape, 40), new MeshStandardMaterial({ map: front.tex, roughness: 0.7 }));
  topM.position.z = SHELL.t + 0.0135;
  const botM = new Mesh(new ShapeGeometry(shape, 40), new MeshStandardMaterial({ map: back.tex, roughness: 0.75 }));
  botM.rotation.y = Math.PI; botM.position.z = -0.0135;
  const shellInner = new Group(); shellInner.add(body, topM, botM);
  shellInner.rotation.x = -Math.PI / 2;           // 形狀的 xy 平面 → 世界的 xz（形狀 +y ＝ 世界 −z：頭朝裡面）
  shellInner.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  const flipper = new Group(); flipper.add(shellInner);   // 繞長軸（世界 z）翻面
  flipper.position.y = SHELL.t / 2 + 0.03;
  shellInner.position.y = -SHELL.t / 2;
  shell.add(flipper);
  // 墊在下面的布
  const cloth = new Mesh(new BoxGeometry(2.3, 0.02, 3.1), new MeshStandardMaterial({ color: 0x5b2a24, roughness: 1 }));
  cloth.position.y = 0.01; cloth.receiveShadow = true; shell.add(cloth);
  shell.position.set(SHELL.x, 0, SHELL.z);
  scene.add(shell);

  // 腹甲座標（x 往右、y 往觀眾）→ 畫布像素
  const capPx = (x, y) => [(x + capW / 2) * PPU, (y + capH / 2) * PPU];
  const glyphT = { k: (GLYPH.s * PPU) / 1000, ox: capPx(GLYPH.cx - GLYPH.s / 2, 0)[0], oy: capPx(0, GLYPH.cy - GLYPH.s / 2)[1] };
  const hollows = hollowList();
  const crackHollow = hollows.find((h) => Math.abs(h.x - CRACK.x) < 1e-6 && Math.abs(h.y - CRACK.y) < 1e-6);

  function clipShell(g) {   // 只畫在腹甲輪廓裡
    const pts = [...OUTLINE, ...OUTLINE.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
    g.beginPath(); pts.forEach(([x, y], i) => { const [px, py] = capPx(x, y); if (i) g.lineTo(px, py); else g.moveTo(px, py); }); g.closePath();
  }
  function seams(g) {   // 盾片的接縫：中線＋幾條橫的
    g.save(); g.strokeStyle = 'rgba(120,90,50,.45)'; g.lineWidth = 3; g.lineCap = 'round';
    const line = (pts) => { g.beginPath(); pts.forEach(([x, y], i) => { const [px, py] = capPx(x, y); if (i) g.lineTo(px, py); else g.moveTo(px, py); }); g.stroke(); };
    line([[0, -1.2], [0.01, -0.6], [-0.01, 0], [0.01, 0.6], [0, 1.1]]);
    for (const [y, w] of [[-0.95, 0.42], [-0.62, 0.62], [-0.05, 0.8], [0.48, 0.66], [0.86, 0.5]]) line([[-w, y + 0.03], [-w / 2, y - 0.01], [0, y], [w / 2, y - 0.01], [w, y + 0.03]]);
    g.restore();
  }
  /** 裂紋：直的一條（沿著長凹洞）＋往中間分出去的一枝（從圓凹洞）——像「卜」 */
  function crackPath(u) {
    const main = [[CRACK.x - 0.02, CRACK.y - 0.2], [CRACK.x + 0.01, CRACK.y - 0.08], [CRACK.x - 0.01, CRACK.y + 0.06], [CRACK.x + 0.01, CRACK.y + 0.2]];
    const branch = [[CRACK.x, CRACK.y - 0.02], [CRACK.x + 0.08, CRACK.y + 0.02], [CRACK.x + 0.15, CRACK.y + 0.0], [CRACK.x + 0.21, CRACK.y + 0.05]];
    return { main, branch, u };
  }
  function drawCrack(g, u) {
    if (u <= 0) return;
    const { main, branch } = crackPath(u);
    g.save(); g.strokeStyle = '#2a1a0c'; g.lineWidth = 3.4; g.lineCap = 'round'; g.lineJoin = 'round';
    const poly = (pts, f) => {
      const n = pts.length - 1, e = f * n;
      g.beginPath();
      for (let i = 0; i <= Math.min(n, Math.floor(e)); i++) { const [px, py] = capPx(...pts[i]); if (i) g.lineTo(px, py); else g.moveTo(px, py); }
      const i = Math.floor(e);
      if (i < n) { const a = pts[i], b = pts[i + 1], k = e - i; g.lineTo(...capPx(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k)); }
      g.stroke();
    };
    poly(main, clamp(u / 0.6));
    if (u > 0.5) poly(branch, clamp((u - 0.5) / 0.5));
    g.restore();
  }
  function drawFront(crackU, carveT) {
    const { g, c, tex } = front;
    g.clearRect(0, 0, c.width, c.height);
    g.save();
    boneBase(g, c.width, c.height, { seed: 5, color: '#e3d4b0' });   // 底色鋪滿整張（輪廓是曲線，只剪折線的話邊緣會露出黑色）
    clipShell(g); g.clip();
    seams(g);
    drawCrack(g, crackU);
    if (carveT > 0) drawCarved(g, glyphFor(state.char, 'oracle'), glyphT, { t: carveT, w: 40 });
    g.restore();
    tex.needsUpdate = true;
  }
  function drawBack(heat) {
    const { g, c, tex } = back;
    g.clearRect(0, 0, c.width, c.height);
    g.save();
    g.translate(c.width, 0); g.scale(-1, 1);   // 從背面看左右相反：畫的時候先鏡射，位置才和正面對得上
    boneBase(g, c.width, c.height, { seed: 9, color: '#dccba5' });
    clipShell(g); g.clip();
    seams(g);
    for (const h of hollows) {
      const [x, y] = capPx(h.x, h.y);
      const isCrack = h === crackHollow;
      // 長的凹洞（鑿）
      g.fillStyle = 'rgba(92,64,34,.85)'; g.beginPath(); g.ellipse(x, y, 0.045 * PPU, 0.15 * PPU, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(60,40,20,.55)'; g.beginPath(); g.ellipse(x + 3, y + 3, 0.03 * PPU, 0.12 * PPU, 0, 0, Math.PI * 2); g.fill();
      // 旁邊圓的凹洞（鑽）：靠腹甲中線那一側
      const rx = x + Math.sign(-h.x) * 0.085 * PPU;
      g.fillStyle = 'rgba(92,64,34,.85)'; g.beginPath(); g.arc(rx, y, 0.05 * PPU, 0, Math.PI * 2); g.fill();
      const burned = isCrack ? heat : (h.y < CRACK.y ? 1 : 0);   // 上面那幾對已經用過（燒黑了）
      if (burned > 0) {
        const gr = g.createRadialGradient(rx, y, 0, rx, y, 0.1 * PPU);
        gr.addColorStop(0, `rgba(20,10,4,${0.9 * burned})`); gr.addColorStop(1, 'rgba(20,10,4,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(rx, y, 0.1 * PPU, 0, Math.PI * 2); g.fill();
      }
    }
    g.restore();
    tex.needsUpdate = true;
  }

  // 燒熱的棒子（灼燒用）與銅刀（刻字用）
  const rod = new Group();
  const rodM = new Mesh(new CylinderGeometry(0.025, 0.03, 1.5, 12), new MeshStandardMaterial({ color: 0x4a3524, roughness: 0.8 }));
  rodM.position.y = 0.75; rod.add(rodM);
  const ember = new Mesh(new SphereGeometry(0.045, 16, 12), new MeshStandardMaterial({ color: 0xff6a1a, emissive: 0xff4a0a, emissiveIntensity: 2.2 }));
  rod.add(ember);
  const glow = new PointLight(0xff7a2a, 0, 1.6, 2); glow.position.y = 0.05; rod.add(glow);
  rod.visible = false; scene.add(rod);

  const knife = new Group();
  const bronzeMat = new MeshStandardMaterial({ color: 0xb08d57, metalness: 0.75, roughness: 0.35 });
  const bladeS = new Shape(); bladeS.moveTo(0, 0); bladeS.lineTo(0.05, 0.12); bladeS.lineTo(0.05, 0.42); bladeS.lineTo(-0.035, 0.42); bladeS.lineTo(-0.02, 0.1); bladeS.closePath();
  const blade = new Mesh(new ExtrudeGeometry(bladeS, { depth: 0.012, bevelEnabled: false }), bronzeMat);
  blade.position.z = -0.006;
  const handle = new Mesh(new BoxGeometry(0.075, 0.42, 0.04), new MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.7 }));
  handle.position.set(0.008, 0.62, 0);
  const tilt = new Group(); tilt.add(blade, handle); tilt.rotation.z = -0.32; tilt.rotation.x = 0.18;
  knife.add(tilt); knife.visible = false;
  knife.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(knife);

  /** 腹甲座標 → 世界（正面朝上時） */
  const shellWorld = (x, y, out = new Vector3()) => out.set(SHELL.x + x, flipper.position.y + SHELL.t / 2 + 0.014, SHELL.z + y);

  // -------------------------------------------------------------------
  // 金文：青銅鼎＋拓片
  // -------------------------------------------------------------------
  const ding = new Group();
  const patina = new CanvasTexture((() => {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#6f7d5a'; g.fillRect(0, 0, 1024, 256);
    const r = rng(12);
    for (let i = 0; i < 500; i++) { g.fillStyle = r() < 0.5 ? `rgba(60,110,90,${0.1 + r() * 0.25})` : `rgba(120,90,50,${0.08 + r() * 0.2})`; const x = r() * 1024, y = r() * 256, R = 4 + r() * 26; g.beginPath(); g.arc(x, y, R, 0, Math.PI * 2); g.fill(); }
    // 一圈紋飾帶（簡化的回紋，示意）
    g.strokeStyle = 'rgba(40,48,34,.75)'; g.lineWidth = 5;
    for (let x = 0; x < 1024; x += 64) {
      g.beginPath(); g.moveTo(x + 8, 70); g.lineTo(x + 56, 70); g.lineTo(x + 56, 110); g.lineTo(x + 20, 110); g.lineTo(x + 20, 86); g.lineTo(x + 40, 86); g.lineTo(x + 40, 98); g.stroke();
    }
    g.fillStyle = 'rgba(40,48,34,.6)'; g.fillRect(0, 56, 1024, 4); g.fillRect(0, 122, 1024, 4);
    return c;
  })());
  patina.colorSpace = SRGBColorSpace;
  const bowlProfile = [[0.0, 0.3], [0.3, 0.31], [0.5, 0.38], [0.64, 0.56], [0.7, 0.8], [0.7, 0.96], [0.76, 0.99], [0.76, 1.03], [0.66, 1.03], [0.64, 0.98], [0.64, 0.8], [0.58, 0.6], [0.46, 0.46], [0.26, 0.4], [0.0, 0.39]].map(([r, y]) => new Vector2(r * DING.r / 0.72, y));
  const bowl = new Mesh(new LatheGeometry(bowlProfile, 64), new MeshStandardMaterial({ map: patina, metalness: 0.45, roughness: 0.62, side: DoubleSide }));
  ding.add(bowl);
  for (let i = 0; i < 3; i++) {   // 三隻腳
    const a = (i / 3) * Math.PI * 2 + Math.PI / 2;
    const leg = new Mesh(new CylinderGeometry(0.075, 0.1, 0.4, 16), new MeshStandardMaterial({ color: 0x5f6e4c, metalness: 0.45, roughness: 0.6 }));
    leg.position.set(Math.cos(a) * 0.4, 0.2, Math.sin(a) * 0.4); ding.add(leg);
  }
  for (const sx of [-1, 1]) {   // 兩個立耳
    const ear = new Shape(); ear.moveTo(-0.13, 0); ear.lineTo(-0.13, 0.26); ear.quadraticCurveTo(0, 0.3, 0.13, 0.26); ear.lineTo(0.13, 0); ear.lineTo(0.08, 0); ear.lineTo(0.08, 0.2); ear.quadraticCurveTo(0, 0.23, -0.08, 0.2); ear.lineTo(-0.08, 0); ear.closePath();
    const m = new Mesh(new ExtrudeGeometry(ear, { depth: 0.04, bevelEnabled: false }), new MeshStandardMaterial({ color: 0x637250, metalness: 0.45, roughness: 0.6 }));
    m.rotation.y = Math.PI / 2; m.position.set(sx * 0.7, 1.02, 0.02 * sx); ding.add(m);
  }
  // 內底的銘文（鑄出來的凹線；示意：真的毛公鼎銘文在內壁）
  const insc = document.createElement('canvas'); insc.width = 512; insc.height = 512;
  const inscTex = new CanvasTexture(insc); inscTex.colorSpace = SRGBColorSpace;
  const inscDisc = new Mesh(new CircleGeometry(0.43 * DING.r / 0.72, 48), new MeshStandardMaterial({ map: inscTex, metalness: 0.4, roughness: 0.6 }));
  inscDisc.rotation.x = -Math.PI / 2; inscDisc.position.y = 0.462; ding.add(inscDisc);
  ding.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  ding.position.set(DING.x, 0, DING.z);
  scene.add(ding);

  // 拓片：先是白紙；拓包一下一下拍上墨，紙變黑、字（凹下去的地方）留白
  const rubC = document.createElement('canvas'); rubC.width = 640; rubC.height = 640;
  const rubTex = new CanvasTexture(rubC); rubTex.colorSpace = SRGBColorSpace;
  const rubFull = document.createElement('canvas'); rubFull.width = 640; rubFull.height = 640;
  const rubSheet = new Mesh(new PlaneGeometry(RUB.s, RUB.s), new MeshStandardMaterial({ map: rubTex, roughness: 0.95 }));
  rubSheet.rotation.x = -Math.PI / 2; rubSheet.position.set(RUB.x, 0.012, RUB.z); rubSheet.receiveShadow = true;
  scene.add(rubSheet);
  const pad = new Group();   // 拓包：布包著棉花
  const padBall = new Mesh(new SphereGeometry(0.13, 20, 14), new MeshStandardMaterial({ color: 0xece2cc, roughness: 1 }));
  padBall.scale.y = 0.6; padBall.position.y = 0.08; pad.add(padBall);
  const padTie = new Mesh(new CylinderGeometry(0.03, 0.05, 0.12, 10), new MeshStandardMaterial({ color: 0xd9ccb0, roughness: 1 }));
  padTie.position.y = 0.2; pad.add(padTie);
  pad.visible = false; pad.traverse((m) => { if (m.isMesh) m.castShadow = true; }); scene.add(pad);
  const DABS = (() => {   // 拓包走的路（蛇行），畫布座標 0–1
    const out = [];
    for (let row = 0; row < 7; row++) for (let i = 0; i < 7; i++) out.push([0.1 + (row % 2 ? 6 - i : i) * 0.133, 0.1 + row * 0.133]);
    return out;
  })();
  function drawInsc() {
    const g = insc.getContext('2d');
    g.fillStyle = '#56644a'; g.fillRect(0, 0, 512, 512);
    const r = rng(21);
    for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '70,120,96' : '40,46,32'},${0.15 + r() * 0.25})`; g.beginPath(); g.arc(r() * 512, r() * 512, 3 + r() * 14, 0, Math.PI * 2); g.fill(); }
    // 凹下去的字：暗色的溝＋一邊亮邊
    const T = { k: 0.36, ox: 76, oy: 76 };
    drawCarved(g, glyphFor(state.char, 'bronze').map((st) => ({ pts: smoothish(st) })), T, { w: 64, dark: '#26301f', mid: '#3a4630', light: 'rgba(190,200,160,.35)' });
    inscTex.needsUpdate = true;
  }
  function drawRubbingAt(u) {   // u：拍到第幾成
    const fg = rubFull.getContext('2d');
    rubbingBase(fg, 640, 640, { seed: 8 });
    drawStage(fg, 640, state.char, 'bronze', { base: false, margin: 0.12 });
    const g = rubC.getContext('2d');
    g.fillStyle = '#f2ece0'; g.fillRect(0, 0, 640, 640);
    const n = Math.floor(u * DABS.length);
    if (n > 0) {
      g.save(); g.beginPath();
      for (let i = 0; i < n; i++) { const [x, y] = DABS[i]; g.moveTo(x * 640 + 70, y * 640); g.arc(x * 640, y * 640, 70, 0, Math.PI * 2); }
      g.clip(); g.drawImage(rubFull, 0, 0); g.restore();
    }
    rubTex.needsUpdate = true;
  }

  // -------------------------------------------------------------------
  // 小篆：宣紙＋毛筆
  // -------------------------------------------------------------------
  const paper = makePaper({ w: PAPER.w, h: PAPER.h, x: PAPER.x, y: 0.016, z: PAPER.z, box: PAPER.box, boxCenter: PAPER.bc, grid: false });
  paper.mesh.receiveShadow = true; scene.add(paper.mesh);
  const brush = makeBrush({ hair: 'goat' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group); brush.setInk(1);
  let writer = null;

  // -------------------------------------------------------------------
  // 標籤
  // -------------------------------------------------------------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    hollow: lab.add('cg-lb cg-lb-k', 'Hollows<small>鑽鑿</small>'),
    crack: lab.add('cg-lb cg-lb-k', 'Crack<small>卜兆</small>'),
    carve: lab.add('cg-lb cg-lb-k', 'Carved character<small>刻的字</small>'),
    ding: lab.add('cg-lb cg-lb-k', 'Bronze ding<small>青銅鼎</small>'),
    insc: lab.add('cg-lb cg-lb-k', 'Inscription<small>銘文</small>'),
    rub: lab.add('cg-lb cg-lb-k', 'Rubbing<small>拓片</small>'),
    seal: lab.add('cg-lb cg-lb-k', 'Small seal script<small>小篆</small>'),
  };

  // -------------------------------------------------------------------
  // 狀態與流程
  // -------------------------------------------------------------------
  const modes = Object.fromEntries(JSON.parse(root.getAttribute('data-modes') || '[]').map((m) => [m.key, m]));
  const R = {
    play: $('.al-play'), rk: $('.cg-mode-k'), rt: $('.cg-mode-t'), when: $('.cg-when-out'), tool: $('.cg-tool-out'), step: $('.cg-step-out'),
    stepT: $('.cg-step-t'),
  };
  // 甲骨的四步：每步的秒數
  const STEPS = [
    { key: 'hollow', dur: 2.2 },   // 翻到背面看凹洞
    { key: 'heat', dur: 3.0 },     // 棒子燒圓凹洞
    { key: 'crack', dur: 2.6 },    // 翻回正面、裂紋出現
    { key: 'carve', dur: 0 },      // 刻字（秒數照字的線長）
  ];
  const state = { mode: 'shell', char: 'ri', playing: true, labels: true, speed: 1, t: 0, step: 0, stepOnly: false, cam: 'near' };
  const carveDur = () => 2 + glyphLen(glyphFor(state.char, 'oracle')) / 520;
  STEPS[3].dur = carveDur();
  let stepT0 = [];   // 每一步在時間軸上的開始時間
  function layoutSteps() { STEPS[3].dur = carveDur(); let t = 0; stepT0 = STEPS.map((s) => { const a = t; t += s.dur; return a; }); return t; }
  let shellTotal = layoutSteps();
  const RUB_DUR = 5.5;

  // 鏡頭
  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const HOMES = {
    shell: () => ({ t: V(SHELL.x, 0.1, SHELL.z + 0.05), d: V(0.25, 0.95, 0.62), w: 2.4, h: 2.9 }),
    bronze: () => ({ t: V(DING.x, 0.3, (DING.z + RUB.z) / 2 - 0.08), d: V(-0.12, 1, 0.4), w: 2.5, h: 4.0 }),
    seal: () => ({ t: V(PAPER.bc[0], 0.2, PAPER.bc[1] + 0.02), d: V(-0.18, 0.9, 0.55), w: 2.7, h: 3.0 }),
    wide: () => ({ t: V(0.1, 0.3, 0.3), d: V(0, 0.8, 0.75), w: 9.4, h: 4.6 }),
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    const H = HOMES[state.cam === 'wide' ? 'wide' : state.mode]();
    flyTo(H.d.clone().normalize().multiplyScalar(fit(H.w, H.h)).add(H.t), H.t, instant);
  }

  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    root.classList.remove('al-fresh');
  }
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }

  /** 換模式或換字：從頭開始 */
  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    if (opts.char) state.char = opts.char;
    state.t = 0; state.stepOnly = opts.step != null;
    if (state.mode === 'shell') {
      shellTotal = layoutSteps();
      state.step = opts.step ?? 0;
      state.t = stepT0[state.step];
      if (state.stepOnly && state.step > 0) state.t = stepT0[state.step];
    }
    if (state.mode === 'bronze') { drawInsc(); drawRubbingAt(0); }
    if (state.mode === 'seal') { paper.clearInk(); writer = makeWriter(paper, SEALS[state.char]); }
    root.dataset.mode = state.mode;
    press('[data-mode]', 'data-mode', state.mode);
    press('[data-char]', 'data-char', state.char);
    press('[data-step]', 'data-step', state.mode === 'shell' ? (state.stepOnly ? state.step : 'all') : '');
    $$('.cg-panel[data-panel]').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== state.mode; });
    const m = modes[state.mode];
    if (m) {
      if (R.rk) R.rk.innerHTML = `${m.zh}<small>${m.en}</small>`;
      if (R.when) R.when.innerHTML = `${m.when_en}<small>${m.when_zh}</small>`;
      if (R.tool) R.tool.innerHTML = `${m.tool_en}<small>${m.tool_zh}</small>`;
    }
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => start({ mode: b.getAttribute('data-mode') })));
  $$('[data-char]').forEach((b) => b.addEventListener('click', () => start({ char: b.getAttribute('data-char'), fly: false })));
  $$('[data-step]').forEach((b) => b.addEventListener('click', () => {
    const v = b.getAttribute('data-step');
    start({ mode: 'shell', step: v === 'all' ? undefined : Number(v), fly: state.mode !== 'shell' });
  }));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => start({ fly: false })));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => { state.cam = b.getAttribute('data-cam'); press('[data-cam]', 'data-cam', state.cam); goHome(false); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  // -------------------------------------------------------------------
  // 每格
  // -------------------------------------------------------------------
  const tmp = V(0, 0, 0);
  let lastFront = '', lastBack = '';
  function stepShell() {
    const t = state.t;
    let k = 0; while (k < STEPS.length - 1 && t >= stepT0[k + 1]) k++;
    if (state.stepOnly && k > state.step) k = state.step;
    const local = clamp(t - stepT0[k], 0, STEPS[k].dur);
    const u = STEPS[k].dur ? local / STEPS[k].dur : 1;
    state.step = k;
    // 翻面：hollow、heat 在背面（π），crack 從背面翻回來，carve 在正面
    let flip = 0;
    if (k === 0) flip = Math.PI * ease(u / 0.6);
    else if (k === 1) flip = Math.PI;
    else if (k === 2) flip = Math.PI * (1 - ease(u / 0.45));
    flipper.rotation.z = flip;
    flipper.position.y = SHELL.t / 2 + 0.03 + Math.sin(flip) * 0.55;
    // 背面：灼燒的程度
    const heat = k === 0 ? 0 : k === 1 ? ease((u - 0.25) / 0.6) : 1;
    const keyB = `${heat.toFixed(2)}`;
    if (keyB !== lastBack) { drawBack(heat); lastBack = keyB; }
    // 正面：裂紋、刻字
    const crackU = k < 2 ? 0 : k === 2 ? clamp((u - 0.45) / 0.5) : 1;
    const carveT = k < 3 ? 0 : clamp((local - 0.6) / (STEPS[3].dur - 1.2));
    const keyF = `${state.char}|${crackU.toFixed(3)}|${carveT.toFixed(3)}`;
    if (keyF !== lastFront) { drawFront(crackU, carveT); lastFront = keyF; }
    // 棒子
    rod.visible = k === 1;
    if (rod.visible) {
      // 背面朝上時，圓凹洞在世界的位置（腹甲左右鏡射，所以 x 反過來）
      const hx = SHELL.x - (crackHollow.x + Math.sign(-crackHollow.x) * 0.085), hz = SHELL.z + crackHollow.y;
      const down = ease(u / 0.3) * (1 - ease((u - 0.82) / 0.18));
      rod.position.set(hx + 0.05, flipper.position.y + SHELL.t / 2 + 0.07 + (1 - down) * 0.6, hz + 0.03);
      rod.rotation.set(0.25, 0, -0.35);
      glow.intensity = 2.5 * down * (0.8 + 0.2 * Math.sin(t * 20));
      ember.material.emissiveIntensity = 1.2 + 1.4 * down;
    }
    // 刀
    knife.visible = k === 3 && carveT > 0 && carveT < 1;
    if (knife.visible) {
      const p = pointAt(glyphFor(state.char, 'oracle'), carveT);
      shellWorld(GLYPH.cx - GLYPH.s / 2 + (p[0] / 1000) * GLYPH.s, GLYPH.cy - GLYPH.s / 2 + (p[1] / 1000) * GLYPH.s, tmp);
      knife.position.copy(tmp);
    }
    // 標籤
    const showL = state.labels && state.cam !== 'wide';
    shellWorld(crackHollow.x, crackHollow.y - 0.32, tmp); tmp.y += 0.2;
    L.hollow.hidden = !(showL && k <= 1);
    if (!L.hollow.hidden) { tmp.x = SHELL.x - crackHollow.x; lab.place(L.hollow, tmp); }
    L.crack.hidden = !(showL && k >= 2 && crackU > 0.6);
    if (!L.crack.hidden) { shellWorld(CRACK.x, CRACK.y - 0.32, tmp); lab.place(L.crack, tmp); }
    L.carve.hidden = !(showL && k === 3 && carveT > 0.15);
    if (!L.carve.hidden) { shellWorld(GLYPH.cx, GLYPH.cy - GLYPH.s / 2 - 0.1, tmp); lab.place(L.carve, tmp); }
    if (R.step) {
      const S = modes.shell && modes.shell.steps ? modes.shell.steps[k] : null;
      R.step.innerHTML = S ? `${k + 1} / 4 · ${S.en}<small>${S.zh}</small>` : '—';
      if (R.stepT && S && R.stepT.dataset.k !== String(k)) { R.stepT.dataset.k = String(k); R.stepT.innerHTML = `${S.text_en}<span class="zh">${S.text_zh}</span>`; }
    }
    const end = state.stepOnly ? stepT0[state.step] + STEPS[state.step].dur : shellTotal;
    if (t >= end + 1.6) state.t = end + 1.6;
  }
  function stepBronze() {
    const u = clamp((state.t - 0.8) / RUB_DUR);
    drawRubbingAt(u);
    pad.visible = u > 0 && u < 1;
    if (pad.visible) {
      const f = u * DABS.length, i = Math.min(DABS.length - 1, Math.floor(f)), j = Math.min(DABS.length - 1, i + 1), k = f - i;
      const x = DABS[i][0] + (DABS[j][0] - DABS[i][0]) * k, y = DABS[i][1] + (DABS[j][1] - DABS[i][1]) * k;
      const bob = Math.abs(Math.sin(f * Math.PI));
      pad.position.set(RUB.x + (x - 0.5) * RUB.s, 0.02 + bob * 0.12, RUB.z + (y - 0.5) * RUB.s);
    }
    const showL = state.labels && state.cam !== 'wide';
    L.ding.hidden = !showL; L.insc.hidden = !showL; L.rub.hidden = !showL;
    if (showL) {
      lab.place(L.ding, V(DING.x - 0.95, 0.7, DING.z));
      lab.place(L.insc, V(DING.x + 0.5, 1.15, DING.z - 0.55));
      lab.place(L.rub, V(RUB.x, 0.02, RUB.z + RUB.s / 2 + 0.12));
    }
    if (state.t > 0.8 + RUB_DUR + 2) state.t = 0.8 + RUB_DUR + 2;
  }
  function stepSeal(dt) {
    const tw = state.t - 0.5;
    if (tw < 0) { placeBrush(brush, paper, writer.poseAt(0), (1 - state.t / 0.5) * 0.4); return; }
    const pose = writer.poseAt(Math.min(tw, writer.duration));
    const lift = tw > writer.duration ? ease((tw - writer.duration) / 0.7) * 0.45 : 0;
    placeBrush(brush, paper, tw > writer.duration ? { ...pose, p: 0 } : pose, lift + pose.hover * 0.3);
    writer.drawTo(tw);
    if (tw > writer.duration + 2) state.t = 0.5 + writer.duration + 2;
    const showL = state.labels && state.cam !== 'wide';
    L.seal.hidden = !(showL && tw > writer.duration * 0.6);
    if (!L.seal.hidden) lab.place(L.seal, paper.world(500, -40));
    void dt;
  }
  function step(dt) {
    state.t += (state.playing ? dt : 0) * state.speed;
    for (const k of Object.keys(L)) if (!['hollow', 'crack', 'carve', 'ding', 'insc', 'rub', 'seal'].includes(k)) L[k].hidden = true;
    if (state.mode !== 'shell') { L.hollow.hidden = L.crack.hidden = L.carve.hidden = true; rod.visible = false; knife.visible = false; glow.intensity = 0; }
    if (state.mode !== 'bronze') { L.ding.hidden = L.insc.hidden = L.rub.hidden = true; pad.visible = false; }
    if (state.mode !== 'seal') L.seal.hidden = true;
    // 不在寫字的時候，毛筆放在紙的右上角
    if (state.mode === 'shell') stepShell();
    else if (state.mode === 'bronze') stepBronze();
    else stepSeal(dt);
    if (state.mode !== 'seal') parkBrush();
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function parkBrush() {
    brush.group.quaternion.identity();
    brush.group.position.set(PAPER.x + PAPER.w / 2 - 0.25, 0.75, PAPER.z - PAPER.h / 2 + 0.35);
    brush.setPose({ d: 0, dir: [1, 0], fan: 0, tilt: 0 });
  }

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
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
    root.classList.toggle('cg-narrow', w < 520);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1);
  drawInsc(); drawRubbingAt(0);   // 鼎和拓片先準備好（整張桌子的鏡頭也看得到）
  start({ mode: 'shell', char: 'ri', instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    ...Object.fromEntries(KEYS.map((k) => [k, () => start({ char: k, fly: false })])),
    shell: () => start({ mode: 'shell' }), bronze: () => start({ mode: 'bronze' }), seal: () => start({ mode: 'seal' }),
  };
  root.__lab = {
    camera, controls, state, scene, setSpeed, setPlaying, start, STEPS, stepT0: () => stepT0, front, back,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

/** 金文的中心線先取曲線，刻在鼎裡時才圓滑 */
function smoothishPts(st) {
  if (st.smooth === false || st.pts.length < 3) return st.pts;
  const p = st.pts, o = [];
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[Math.max(0, i - 1)], b = p[i], c = p[i + 1], d = p[Math.min(p.length - 1, i + 2)];
    for (let k = 0; k < 6; k++) {
      const t = k / 6, t2 = t * t, t3 = t2 * t;
      const f = (j) => 0.5 * ((2 * b[j]) + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t2 + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t3);
      o.push([f(0), f(1), b[2] || 1]);
    }
  }
  o.push(p[p.length - 1]);
  return o;
}
const smoothish = smoothishPts;
function glyphLen(strokes) {
  return strokes.reduce((s, st) => s + st.pts.reduce((a, q, i) => (i ? a + Math.hypot(q[0] - st.pts[i - 1][0], q[1] - st.pts[i - 1][1]) : 0), 0), 0);
}
/** 刻到 t（0–1）時刀在哪裡（字框座標） */
function pointAt(strokes, t) {
  let left = glyphLen(strokes) * clamp(t);
  for (const st of strokes) {
    for (let i = 1; i < st.pts.length; i++) {
      const a = st.pts[i - 1], b = st.pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (d >= left) { const u = left / (d || 1); return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]; }
      left -= d;
    }
  }
  const s = strokes[strokes.length - 1].pts; return s[s.length - 1];
}

function init2D() {
  // 卡片裡的演變小圖：甲骨文 → 金文 → 小篆 → 楷書
  document.querySelectorAll('[data-cg-evo]').forEach((el) => {
    const k = el.getAttribute('data-cg-evo');
    el.querySelectorAll('canvas[data-stage]').forEach((c) => { c.width = 160; c.height = 160; drawStage(c.getContext('2d'), 160, k, c.getAttribute('data-stage')); });
  });
  const tl = document.querySelector('[data-cal-time]');
  if (tl) initTimeline(tl);
  const wh = document.querySelector('[data-cal-which]');
  if (wh) initWhich(wh);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, SEALS.ri, SEALS);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-caloracle-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
