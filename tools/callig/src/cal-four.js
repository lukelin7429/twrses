/*
 * 書法 · 第一課「文房四寶是什麼？」的 3D 模型（全部自繪示意，大小約略照真的：毛筆約 26 公分、一個字的格子 26 公分）。
 *
 * 一張書桌：毛氈上一張宣紙（米字格、紙鎮壓著），左邊筆架上一枝毛筆，右邊硯台、墨床上的墨條、水盂。
 * 五個看法（data-focus）：
 *   desk   書桌全景，每樣東西都有雙語標籤；點桌上的東西就飛過去看
 *   brush  毛筆立起來：換羊毫／兼毫／狼毫看顏色與軟硬；「尖、齊、圓、健」四個按鈕各做一個動作
 *          （尖＝看筆尖、齊＝壓扁攤開看毛尖齊不齊、圓＝轉一圈、健＝壓下去再放開看彈回多快）；「壓一下」在小紙片上留下印子
 *   ink    墨條立起來在硯堂上畫圈磨，水慢慢變黑（brush.js 的 grindDarkness，示意）
 *   paper  同一滴墨落在生宣紙與影印紙上（brush.js 的 bleed，示意）
 *   stone  硯堂（磨墨的平面）與硯池（裝墨的深處）；「加水」從上面滴水
 *   write  寫字引擎示範：毛筆從筆架起來、蘸墨、在宣紙上寫「一」（src/strokes/yi.json）；可放慢、暫停、
 *          換正上方／側面／貼近筆尖三個角度；右側畫力道曲線，標出起筆、行筆、收筆
 * 2D（不需要 WebGL）：頁面下方「一滴墨在不同的紙上」（initDrops）與練字板（pad.js 的 initPad）。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾；1 單位約 10 公分。產物：cd tools/callig && npm run build → assets/js/cal-four.js
 * 除錯：document.querySelector('[data-calfour-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  ExtrudeGeometry, Group, HemisphereLight, LatheGeometry, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, PlaneGeometry, Quaternion, Raycaster, RingGeometry, SRGBColorSpace, Scene, Shape, SphereGeometry,
  Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { bendFor, bleed, clamp, footprint, forceCurve, grindDarkness, HAIR, springBack } from './brush.js';
import { bendOffset, makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { drawBlot, drawForce, drawStamps, paperBase, rng } from './ink2d.js';
import { initPad } from './pad.js';
import YI from './strokes/yi.json';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);

// 桌上東西的位置
const PAPER = { x: 0, z: 0.35, w: 3.2, h: 3.8, box: 2.6, bc: [0, 0.45] };
const STONE = V(3.35, 0, -0.45);                     // 硯台
const GRIND = V(3.35, 0.262, -0.1);                  // 硯堂上磨墨的地方（＝積水的中心）
const POOL = V(3.35, 0.21, -1.17);                   // 硯池的水面中心
const STICK_REST = V(4.75, 0.11, -0.5);              // 墨床上的墨條
const RACK = V(-3.3, 0, -0.95);                      // 筆架
const STAGE = V(-4.55, 0.014, 0.85);                 // 看毛筆時，筆立在這張小紙片上方
const SAMPLE = [V(-4.3, 0.014, 2.4), V(-3.0, 0.014, 2.4)];   // 生宣紙、影印紙的小樣
const SAMPLE_W = 1.05;

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
  controls.minDistance = 0.6; controls.maxDistance = 40;
  controls.maxPolarAngle = Math.PI * 0.47;
  scene.add(new HemisphereLight(0xfff4e0, 0x2a2018, 0.75));
  scene.add(new AmbientLight(0xffffff, 0.12));
  const sun = new DirectionalLight(0xfff1dc, 1.55);
  sun.position.set(-4, 9, 5); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 5, bottom: -5, near: 1, far: 25 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const pickables = [];
  const tag = (obj, focus) => { obj.traverse((m) => { if (m.isMesh) { m.userData.focus = focus; m.castShadow = true; m.receiveShadow = true; pickables.push(m); } }); return obj; };

  // ---------- 書桌、毛氈 ----------
  const wood = canvasTex((g, w, h) => {
    g.fillStyle = '#6a4125'; g.fillRect(0, 0, w, h);
    const r = rng(4);
    for (let i = 0; i < 140; i++) {
      const y0 = r() * h, a = 2 + r() * 6, f = 0.004 + r() * 0.01, ph = r() * 6;
      g.strokeStyle = r() < 0.5 ? `rgba(40,20,8,${0.12 + r() * 0.2})` : `rgba(160,110,60,${0.08 + r() * 0.12})`;
      g.lineWidth = 0.6 + r() * 2.2;
      g.beginPath();
      for (let x = 0; x <= w; x += 8) { const y = y0 + Math.sin(x * f + ph) * a; if (x) g.lineTo(x, y); else g.moveTo(x, y); }
      g.stroke();
    }
  }, 1024, 512);
  const desk = new Mesh(new BoxGeometry(12.4, 0.36, 7.4), [
    new MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.6 }), new MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.6 }),
    new MeshStandardMaterial({ map: wood, roughness: 0.55 }), new MeshStandardMaterial({ color: 0x3a2213 }),
    new MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.6 }), new MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.6 })]);
  desk.receiveShadow = true;
  scene.add(at(desk, 0, -0.18, 0.2));
  const felt = new Mesh(new BoxGeometry(4.0, 0.012, 4.6), new MeshStandardMaterial({
    roughness: 1, map: canvasTex((g, w, h) => {
      g.fillStyle = '#2c313d'; g.fillRect(0, 0, w, h);
      const r = rng(9);
      for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},${0.03 + r() * 0.05})`; g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2); }
    }, 256, 256),
  }));
  felt.receiveShadow = true;
  scene.add(at(felt, PAPER.x, 0.006, PAPER.z));
  tag(felt, 'paper');

  // ---------- 宣紙（寫字引擎的紙）＋紙鎮 ----------
  const paper = makePaper({ w: PAPER.w, h: PAPER.h, x: PAPER.x, y: 0.016, z: PAPER.z, box: PAPER.box, boxCenter: PAPER.bc });
  paper.mesh.receiveShadow = true;
  scene.add(paper.mesh); tag(paper.mesh, 'paper'); paper.mesh.castShadow = false;
  const rosewood = new MeshStandardMaterial({ color: 0x4a2618, roughness: 0.42 });
  const weight = new Group();
  weight.add(new Mesh(new BoxGeometry(2.7, 0.13, 0.22), rosewood));
  weight.add(at(new Mesh(new BoxGeometry(2.2, 0.01, 0.06), new MeshStandardMaterial({ color: 0x2a140b, roughness: 0.5 })), 0, 0.066, 0));
  scene.add(at(weight, PAPER.x, 0.016 + 0.065, PAPER.z - PAPER.h / 2 + 0.18));
  tag(weight, 'paper');

  // ---------- 硯台（硯堂＋斜坡＋硯池） ----------
  const stoneG = new Group(); scene.add(at(stoneG, STONE.x, STONE.y, STONE.z));
  const stoneMat = new MeshStandardMaterial({ color: 0x3b2f3a, roughness: 0.62 });
  const floorMat = new MeshStandardMaterial({ color: 0x4a3c48, roughness: 0.42 });
  stoneG.add(at(new Mesh(new BoxGeometry(1.5, 0.1, 2.3), stoneMat), 0, 0.05, 0));
  for (const [w, d, x, z] of [[1.5, 0.12, 0, -1.09], [1.5, 0.12, 0, 1.09], [0.12, 2.06, -0.69, 0], [0.12, 2.06, 0.69, 0]]) stoneG.add(at(new Mesh(new BoxGeometry(w, 0.22, d), stoneMat), x, 0.21, z));
  const prof = new Shape();   // 側面輪廓（z, y）：硯池底 → 斜坡 → 硯堂
  prof.moveTo(-1.03, 0.1); prof.lineTo(-0.45, 0.1); prof.quadraticCurveTo(-0.4, 0.23, -0.3, 0.26); prof.lineTo(1.03, 0.26); prof.lineTo(1.03, 0.1); prof.closePath();
  const inner = new Mesh(new ExtrudeGeometry(prof, { depth: 1.26, bevelEnabled: false }), floorMat);
  inner.rotation.y = -Math.PI / 2; inner.position.x = 0.63;   // 輪廓的 x → 世界 +z（硯池在遠端 −z）
  stoneG.add(inner);
  const poolWater = new Mesh(new PlaneGeometry(1.26, 0.7), new MeshStandardMaterial({ color: 0x0a0c10, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.9 }));
  poolWater.rotation.x = -Math.PI / 2; stoneG.add(at(poolWater, 0, 0.21, -0.68));
  const puddle = new Mesh(new CircleGeometry(0.34, 48), new MeshStandardMaterial({ color: 0x55697a, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.3 }));
  puddle.rotation.x = -Math.PI / 2; stoneG.add(at(puddle, 0, 0.263, 0.35));
  const ripple = new Mesh(new RingGeometry(0.9, 1, 40), new MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0, roughness: 0.2 }));
  ripple.rotation.x = -Math.PI / 2; stoneG.add(at(ripple, 0, 0.265, 0.35));
  tag(stoneG, 'stone');
  puddle.castShadow = false; poolWater.castShadow = false; ripple.castShadow = false;

  // ---------- 墨條與墨床 ----------
  const stickTex = canvasTex((g, w, h) => {
    g.fillStyle = '#121116'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#c9a14a'; g.lineWidth = 6; g.strokeRect(14, 14, w - 28, h - 28);
    g.lineWidth = 3;
    for (let k = 0; k < 4; k++) {   // 金色雲紋（只用線條，不用字型）
      const cy = 170 + k * 230;
      g.beginPath(); g.arc(w / 2 - 34, cy, 30, Math.PI * 0.2, Math.PI * 1.7); g.stroke();
      g.beginPath(); g.arc(w / 2 + 30, cy + 26, 40, Math.PI * 1.1, Math.PI * 2.6); g.stroke();
      g.beginPath(); g.arc(w / 2 - 8, cy + 70, 18, 0, Math.PI * 1.5); g.stroke();
    }
  }, 256, 1024);
  const stickMats = [0, 1, 2, 3, 4, 5].map((i) => new MeshStandardMaterial(i === 2 ? { map: stickTex, roughness: 0.38 } : { color: 0x141318, roughness: 0.45 }));
  const stick = new Mesh(new BoxGeometry(0.22, 0.1, 0.95), stickMats);
  stick.castShadow = true;
  scene.add(stick);
  const tray = new Mesh(new BoxGeometry(0.44, 0.06, 1.12), rosewood);
  scene.add(at(tray, STICK_REST.x, 0.03, STICK_REST.z));
  tag(stick, 'ink'); tag(tray, 'ink');

  // ---------- 水盂 ----------
  const pot = new Group(); scene.add(at(pot, 4.5, 0, 1.55));
  const lathePts = [[0, 0], [0.24, 0], [0.33, 0.06], [0.37, 0.16], [0.34, 0.26], [0.24, 0.33], [0.12, 0.355], [0.1, 0.34], [0.09, 0.3]].map(([r, y]) => new Vector2(r, y));
  pot.add(new Mesh(new LatheGeometry(lathePts, 40), new MeshStandardMaterial({ color: 0x9cc3b2, roughness: 0.22, side: DoubleSide })));
  const spoon = new Group(); spoon.rotation.z = -0.9; spoon.position.set(0.02, 0.3, 0);
  spoon.add(at(new Mesh(new CylinderGeometry(0.012, 0.012, 0.5, 8), new MeshStandardMaterial({ color: 0xb08a4a, metalness: 0.7, roughness: 0.35 })), 0, 0.2, 0));
  pot.add(spoon);
  tag(pot, 'stone');

  // ---------- 筆架（山形）＋毛筆 ----------
  const rackShape = new Shape();
  const peaks = [[-0.95, 0], [-0.95, 0.3], [-0.8, 0.5], [-0.6, 0.36], [-0.4, 0.62], [-0.2, 0.42], [0, 0.74], [0.2, 0.42], [0.4, 0.62], [0.6, 0.36], [0.8, 0.5], [0.95, 0.3], [0.95, 0]];
  rackShape.moveTo(peaks[0][0], peaks[0][1]);
  for (let i = 1; i < peaks.length; i++) {
    const [x, y] = peaks[i], [px, py] = peaks[i - 1];
    if (i === 1 || i === peaks.length - 1) rackShape.lineTo(x, y); else rackShape.quadraticCurveTo(px + (x - px) * 0.5, Math.max(py, y) + 0.04 * (y > py ? 1 : 0), x, y);
  }
  rackShape.closePath();
  const rack = new Mesh(new ExtrudeGeometry(rackShape, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }), new MeshStandardMaterial({ color: 0x3d2b20, roughness: 0.4, metalness: 0.15 }));
  rack.position.set(RACK.x, 0, RACK.z - 0.08);
  scene.add(rack); tag(rack, 'brush');
  const brush = makeBrush({ hair: 'goat' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group);
  tag(brush.group, 'brush');
  const restPos = V(RACK.x - 0.2, 0.42 + 0.06, -0.2);
  const restQ = new Quaternion().setFromAxisAngle(V(1, 0, 0), -Math.PI / 2);
  const upQ = new Quaternion();

  // ---------- 看毛筆用的小紙片、比較暈開的兩張小紙 ----------
  const scrapCv = document.createElement('canvas'); scrapCv.width = scrapCv.height = 320;
  const scrapTex = new CanvasTexture(scrapCv); scrapTex.colorSpace = SRGBColorSpace;
  const scrap = new Mesh(new PlaneGeometry(0.9, 0.9), new MeshStandardMaterial({ map: scrapTex, roughness: 0.95 }));
  scrap.rotation.x = -Math.PI / 2; scrap.receiveShadow = true; scene.add(at(scrap, STAGE.x, STAGE.y, STAGE.z));
  tag(scrap, 'brush'); scrap.castShadow = false;
  function scrapClear() { paperBase(scrapCv.getContext('2d'), 320, 320, { seed: 21, fiber: 0.6, edge: 6 }); scrapTex.needsUpdate = true; }
  scrapClear();
  const samples = SAMPLE.map((p, i) => {
    const c = document.createElement('canvas'); c.width = c.height = 300;
    const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace;
    const m = new Mesh(new PlaneGeometry(SAMPLE_W, SAMPLE_W), new MeshStandardMaterial({ map: t, roughness: i ? 0.55 : 0.95 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; scene.add(at(m, p.x, p.y, p.z)); tag(m, 'paper'); m.castShadow = false;
    const drop = new Mesh(new SphereGeometry(0.05, 20, 12), new MeshStandardMaterial({ color: 0x0c0b0e, roughness: 0.12, metalness: 0.2 }));
    drop.visible = false; scene.add(drop);
    return { c, t, m, drop, key: i ? 'copy' : 'xuan', color: i ? '#fbfbf7' : '#f6f0e1' };
  });
  const bead = new Mesh(new SphereGeometry(1, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), new MeshStandardMaterial({ color: 0x0c0b0e, roughness: 0.08, metalness: 0.25 }));
  bead.visible = false; scene.add(bead);
  function drawSamples(t) {
    samples.forEach((s, i) => {
      const g = s.c.getContext('2d');
      paperBase(g, 300, 300, { color: s.color, seed: 30 + i, fiber: i ? 0.08 : 0.6, edge: 5 });
      if (t >= 0) drawBlot(g, 150, 150, 26, bleed(s.key, 'mid', t), 7 + i);
      s.t.needsUpdate = true;
    });
  }
  drawSamples(-1);
  // 水滴（加水、蘸墨後滴下）
  const drops = Array.from({ length: 3 }, () => { const d = new Mesh(new SphereGeometry(0.035, 14, 10), new MeshStandardMaterial({ color: 0xcfe4ff, transparent: true, opacity: 0.8, roughness: 0.05 })); d.visible = false; scene.add(d); return d; });

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const L = (cls, en, zh) => lab.add(`cg-lb ${cls}`, `${en}<small>${zh}</small>`);
  const labs = {
    brush: L('cg-lb-t', 'Brush', '筆'), ink: L('cg-lb-t', 'Ink stick', '墨'), paper: L('cg-lb-t', 'Paper', '紙'), stone: L('cg-lb-t', 'Inkstone', '硯'),
    rack: L('', 'Brush rest', '筆架'), weight: L('', 'Paperweight', '紙鎮'), pot: L('', 'Water dropper', '水盂'), felt: L('', 'Felt pad', '毛氈'),
    tip: L('cg-lb-k', 'Tip', '筆尖'), belly: L('cg-lb-k', 'Belly', '筆肚'), root: L('cg-lb-k', 'Root', '筆根'), handle: L('', 'Handle', '筆桿'),
    hall: L('cg-lb-k', 'Grinding surface', '硯堂'), well: L('cg-lb-k', 'Ink well', '硯池'),
    xuan: L('cg-lb-k', 'Raw Xuan paper', '生宣紙'), copy: L('cg-lb-k', 'Copy paper', '影印紙'),
    phase: L('cg-lb-ph', '', ''),
  };
  Object.values(labs).forEach((el) => { el.hidden = true; });

  // =====================================================================
  // 狀態
  // =====================================================================
  const writer = makeWriter(paper, YI);
  const curve = forceCurve(writer.strokes[0].s);
  const ss = writer.strokes[0].s, Ls = ss[ss.length - 1].s;
  const bounds = [ss.find((q) => q.phase >= 1).s / Ls, ss.find((q) => q.phase >= 2).s / Ls];
  const phaseTxt = JSON.parse(root.getAttribute('data-phases') || '[]');
  const R = {
    play: $('.al-play'), force: $('.cg-force'), phK: $('.cg-phase-k'), phT: $('.cg-phase-t'), press: $('.cg-press-out'),
    circles: $('.cg-circles'), dark: $('.cg-dark'), darkBar: $('.cg-dark-bar i'), hairOut: $('.cg-hair-out'), bendOut: $('.cg-bend-out'),
    sx: $('.cg-spread-xuan'), sc: $('.cg-spread-copy'), again: $('.cg-again'), grind: $('.cg-grind'),
  };
  const state = {
    mode: 'desk', playing: true, labels: true, speed: 1, cam: 'side', hair: 'goat',
    act: 'idle', actT: 0, pressD0: 0, circles: 0, grinding: false, dropT: -1, waterT: -1, seq: -1, seqFrom: null, t: 0,
  };
  const SEQ = { up: 1.1, down: 1.7, hold: 2.3, rise: 2.8, travel: 3.9, touch: 4.4 };
  const writeEnd = () => SEQ.touch + writer.duration;

  // ---------- 鏡頭 ----------
  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const HOMES = {
    desk: () => ({ t: V(0.05, 0, 0.3), d: V(0.08, 0.68, 0.73), w: 10.6, h: 6.4 }),
    brush: () => ({ t: V(STAGE.x + 0.08, 0.5, STAGE.z), d: V(0.42, 0.3, 0.86), w: 1.45, h: 1.3 }),
    ink: () => ({ t: V(3.55, 0.35, -0.35), d: V(-0.25, 0.6, 0.76), w: 2.9, h: 2.5 }),
    paper: () => ({ t: V((SAMPLE[0].x + SAMPLE[1].x) / 2, 0, SAMPLE[0].z - 0.05), d: V(0, 0.86, 0.5), w: 2.9, h: 1.6 }),
    stone: () => ({ t: V(STONE.x, 0.15, STONE.z), d: V(0.38, 0.78, 0.5), w: 2.1, h: 2.9 }),
    pre: () => ({ t: V(1.55, 0, 0.1), d: V(0, 0.78, 0.62), w: 7.2, h: 4.3 }),
    top: () => ({ t: V(PAPER.bc[0], 0, PAPER.bc[1]), d: V(0, 1, 0.02), w: 2.9, h: 2.9 }),
    side: () => ({ t: V(PAPER.bc[0], 0.3, PAPER.bc[1]), d: V(0, 0.2, 1), w: 2.5, h: 1.4 }),
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function camKey() {
    if (state.mode !== 'write') return state.mode;
    if (state.seq >= 0 && state.seq < SEQ.travel) return 'pre';
    return state.cam === 'tip' ? 'tip' : state.cam;
  }
  let lastKey = '';
  function goHome(instant) {
    const k = camKey(); lastKey = k;
    if (k === 'tip') { controls.enabled = false; fly.t = 1; return; }
    controls.enabled = true;
    const H = HOMES[k]();
    flyTo(H.d.clone().normalize().multiplyScalar(fit(H.w, H.h)).add(H.t), H.t, instant);
  }

  // ---------- 切換看法 ----------
  const trans = { brush: { t: 1, p: V(0, 0, 0), q: new Quaternion() }, stick: { t: 1, p: V(0, 0, 0), q: new Quaternion() } };
  const snap = (o, tr) => { tr.t = 0; tr.p.copy(o.position); tr.q.copy(o.quaternion); };
  function setMode(m, instant) {
    if (m !== state.mode) { snap(brush.group, trans.brush); snap(stick, trans.stick); }
    state.mode = m;
    $$('[data-focus]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-focus') === m ? 'true' : 'false'));
    $$('.cg-panel').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== m; });
    root.classList.toggle('cg-writing', m === 'write');
    state.act = 'idle'; state.actT = 0;
    if (m === 'ink') setGrind(true); else setGrind(false);
    if (m === 'paper') drop();
    if (m === 'brush') { scrapClear(); brush.setPose({ fan: 0 }); }
    if (m === 'write') startWrite();
    if (m !== 'write') { state.seq = -1; }
    if (instant) { trans.brush.t = 1; trans.stick.t = 1; }
    goHome(instant);
    setPlaying(true);
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setGrind(v) {
    state.grinding = v;
    if (R.grind) { R.grind.setAttribute('aria-pressed', v ? 'true' : 'false'); R.grind.querySelector('.t').textContent = v ? 'Stop grinding · 停下來' : 'Grind · 磨墨'; }
  }
  function drop() { state.dropT = -0.45; samples.forEach((s) => { s.drop.visible = true; }); }
  function addWater() { state.waterT = 0; state.circles *= 0.55; }
  function setHair(k) {
    state.hair = k; brush.setHair(k);
    $$('[data-hair]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-hair') === k ? 'true' : 'false'));
    if (R.hairOut) R.hairOut.innerHTML = `${HAIR[k].en}<small>${HAIR[k].zh}</small>`;
  }
  function act(a) {
    if (state.mode !== 'brush') { setMode('brush'); }
    state.act = a; state.actT = 0;
    if (a === 'press' || a === 'spring') scrapClear();
    $$('[data-virtue]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-virtue') === a ? 'true' : 'false'));
    const vb = root.querySelector(`.cg-virtue[data-virtue="${a}"]`), vt = $('.cg-virtue-t');
    if (vt) vt.innerHTML = vb ? `<b>${vb.querySelector('b').textContent} ${vb.querySelector('span').textContent}</b> ${vb.getAttribute('data-en')}<span class="zh">${vb.getAttribute('data-zh')}</span>` : '';
    setPlaying(true);
  }
  function startWrite() {
    paper.clearInk(); writer.reset();
    state.seq = 0; state.travelFrom = null;
    state.seqFrom = { p: brush.group.position.clone(), q: brush.group.quaternion.clone(), ink: brush.state.ink };
    if (brush.state.ink > 0.6 && state.seqFrom.q.angleTo(upQ) < 0.05) { state.seq = SEQ.rise; state.travelFrom = state.seqFrom.p; }   // 已經蘸過墨、筆立著：直接去寫
    setPlaying(true);
  }
  function setSpeed(v) { state.speed = v; $$('[data-speed]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-speed')) === v ? 'true' : 'false')); }
  function setCam(v) { state.cam = v; $$('[data-cam]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-cam') === v ? 'true' : 'false')); goHome(false); }

  $$('[data-focus]').forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-focus'))));
  $$('[data-hair]').forEach((b) => b.addEventListener('click', () => { setHair(b.getAttribute('data-hair')); act('press'); }));
  $$('[data-virtue]').forEach((b) => b.addEventListener('click', () => act(b.getAttribute('data-virtue'))));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  if (R.again) R.again.addEventListener('click', () => { if (state.mode !== 'write') setMode('write'); else startWrite(); });
  if (R.grind) R.grind.addEventListener('click', () => { setGrind(!state.grinding); setPlaying(true); });
  root.querySelectorAll('.cg-fresh-water').forEach((b) => b.addEventListener('click', () => { state.circles = 0; setGrind(true); setPlaying(true); }));
  root.querySelectorAll('.cg-redrop').forEach((b) => b.addEventListener('click', () => { drop(); setPlaying(true); }));
  root.querySelectorAll('.cg-add-water').forEach((b) => b.addEventListener('click', () => { addWater(); setPlaying(true); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="grid"]', (v) => paper.setGrid(v));

  // 點桌上的東西：飛過去看
  const ray = new Raycaster(), ndc = new Vector2();
  let downAt = null;
  cv.addEventListener('pointerdown', (e) => { downAt = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  cv.addEventListener('pointerup', (e) => {
    if (!downAt || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6 || performance.now() - downAt.t > 500) return;
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickables, false)[0];
    if (hit && hit.object.userData.focus && hit.object.userData.focus !== state.mode && state.mode !== 'write') setMode(hit.object.userData.focus);
  });

  // =====================================================================
  // 每格
  // =====================================================================
  const tmpP = V(0, 0, 0), tmpQ = new Quaternion();
  function blendTo(obj, tr, p, q, dt, lift = 0.7) {
    if (tr.t < 1) {
      tr.t = Math.min(1, tr.t + dt / 1.0);
      const k = ease(tr.t);
      obj.position.lerpVectors(tr.p, p, k); obj.position.y += Math.sin(Math.PI * k) * lift;
      obj.quaternion.slerpQuaternions(tr.q, q, k);
    } else { obj.position.copy(p); obj.quaternion.copy(q); }
  }

  // 寫字的流程（時間 seq 秒，乘上放慢倍率）：起來 → 到硯池上方 → 蘸墨 → 回到上方 → 移到第一點上方 → 下筆 → 寫 → 提筆
  function writePose() {
    const s = state.seq, L = brush.L;
    const abovePool = V(POOL.x, POOL.y + L + 0.5, POOL.z), dipAt = V(POOL.x, POOL.y + L - 0.07, POOL.z);
    const p0 = writer.poseAt(0), start = paper.world(p0.x, p0.y).add(V(0, L + 0.42, 0)), touch = paper.world(p0.x, p0.y).add(V(0, L + 0.002, 0));
    if (s < SEQ.up) {
      const k = ease(s / SEQ.up), f = state.seqFrom;
      brush.group.position.lerpVectors(f.p, abovePool, k); brush.group.position.y += Math.sin(Math.PI * k) * 0.5;
      brush.group.quaternion.slerpQuaternions(f.q, upQ, k);
      brush.setPose({ d: 0, fan: 0, ink: f.ink * (1 - k) });
    } else if (s < SEQ.hold) {
      const k = ease((s - SEQ.up) / (SEQ.down - SEQ.up));
      brush.group.quaternion.copy(upQ);
      brush.group.position.lerpVectors(abovePool, dipAt, k);
      if (s > SEQ.down) brush.group.position.x += Math.sin((s - SEQ.down) * 9) * 0.04;
      brush.setPose({ d: 0, ink: clamp((s - SEQ.up - 0.3) / 0.9) });
    } else if (s < SEQ.rise) {
      brush.group.quaternion.copy(upQ);
      brush.group.position.lerpVectors(dipAt, abovePool, ease((s - SEQ.hold) / (SEQ.rise - SEQ.hold)));
      brush.setPose({ d: 0, ink: 1 });
    } else if (s < SEQ.travel) {
      brush.group.quaternion.copy(upQ);
      const from = state.travelFrom || abovePool;
      brush.group.position.lerpVectors(from, start, ease((s - SEQ.rise) / (SEQ.travel - SEQ.rise)));
      brush.setPose({ d: 0, ink: 1, dir: p0.dir });
    } else if (s < SEQ.touch) {
      brush.group.quaternion.copy(upQ);
      brush.group.position.lerpVectors(start, touch, ease((s - SEQ.travel) / (SEQ.touch - SEQ.travel)));
      brush.setPose({ d: 0, ink: 1, dir: p0.dir });
    } else {
      const tw = s - SEQ.touch;
      const pose = writer.poseAt(Math.min(tw, writer.duration));
      const lift = tw > writer.duration ? ease((tw - writer.duration) / 0.7) * 0.5 : 0;
      placeBrush(brush, paper, tw > writer.duration ? { ...pose, p: 0 } : pose, lift + pose.hover * 0.3);
      writer.drawTo(tw);
      return pose;
    }
    return null;
  }

  function step(dt) {
    const run = state.playing ? dt : 0;
    state.t += run;
    let pose = null;
    // ---- 毛筆 ----
    if (state.mode === 'write' && state.seq >= 0) {
      state.seq += run * state.speed;
      pose = writePose();
      if (state.seq > writeEnd() + 0.9) state.seq = writeEnd() + 0.9;
    } else if (state.mode === 'brush') {
      const L = brush.L;
      state.actT += run;
      const T = state.actT;
      let hover = 0.32, d = 0, fan = 0, spin = 0;
      if (state.act === 'press' || state.act === 'spring') {
        // 往下 0.5 秒 → 碰紙 → 用同樣的力道壓 0.6 秒 → 放開、彈回
        const force = 0.75;
        const bend = bendFor(state.hair, force);
        const d0 = bend * 0.6 * L;
        if (T < 0.5) hover = 0.32 * (1 - ease(T / 0.5));
        else if (T < 1.2) { hover = 0; d = d0 * ease((T - 0.5) / 0.35); }
        else if (T < 1.6) { hover = 0.32 * ease((T - 1.2) / 0.4); d = springBack(state.hair, d0, T - 1.2); }
        else { hover = 0.32; d = springBack(state.hair, d0, T - 1.2); }
        if (T >= 1.2 && T - run < 1.2) {   // 放開的那一刻在紙片上留下印子
          const f = footprint(clamp(d0 / (0.6 * L)));
          const g = scrapCv.getContext('2d');
          drawStamps(g, [{ x: 500, y: 500, a: Math.PI, hw: f.hw * 1.6, len: f.len * 1.6 }], { k: 0.32, ox: 0, oy: 0 }, { soft: 1.5 });
          scrapTex.needsUpdate = true;
        }
        if (R.bendOut) R.bendOut.textContent = `${Math.round(bend * 100)}%`;
        // 壓著的時候筆毛真的貼在紙上：筆桿往下
        hover -= d;
      } else if (state.act === 'even') { fan = ease(Math.min(T, 1.2) / 1.2) * (T < 3.4 ? 1 : 1 - ease((T - 3.4) / 0.8)); hover = 0.32; }
      else if (state.act === 'round') { spin = T * 1.6; hover = 0.32; }
      const target = V(STAGE.x + bendOffset(L, Math.max(0, d)), STAGE.y + L + hover + 0.002, STAGE.z);
      tmpQ.setFromAxisAngle(V(0, 1, 0), spin);
      blendTo(brush.group, trans.brush, target, tmpQ, dt);
      brush.setPose({ d: Math.max(0, d), dir: [-1, 0], fan, ink: 0 });
    } else {
      blendTo(brush.group, trans.brush, restPos, restQ, dt);
      brush.setPose({ d: 0, fan: 0 });
    }
    // ---- 墨條 ----
    if (state.mode === 'ink' || state.mode === 'stone') {
      const grind = state.mode === 'ink';
      if (grind && state.grinding) state.circles += run / 1.2;
      const a = state.circles * Math.PI * 2;
      const c = grind ? V(GRIND.x + Math.cos(a) * 0.15, GRIND.y + 0.475, GRIND.z + Math.sin(a) * 0.12) : V(STICK_REST.x, STICK_REST.y, STICK_REST.z);
      tmpQ.setFromAxisAngle(V(1, 0, 0), grind ? -Math.PI / 2 : 0);
      if (grind) tmpQ.multiply(new Quaternion().setFromAxisAngle(V(0, 1, 0), 0.12));
      blendTo(stick, trans.stick, c, tmpQ, dt, grind ? 0.6 : 0.4);
    } else blendTo(stick, trans.stick, STICK_REST, new Quaternion(), dt, 0.4);
    // 積水與硯池的顏色
    const dk = grindDarkness(state.circles);
    const dc = dk ** 0.7;   // 線性色彩：清水是淡淡的藍灰薄膜，越磨越接近墨黑
    puddle.material.color.setRGB(0.09 * (1 - dc) + 0.004 * dc, 0.13 * (1 - dc) + 0.004 * dc, 0.17 * (1 - dc) + 0.006 * dc);
    puddle.material.opacity = 0.3 + 0.67 * dc;
    poolWater.material.color.setRGB(0.02 * (1 - dc) + 0.003 * dc, 0.026 * (1 - dc) + 0.003 * dc, 0.034 * (1 - dc) + 0.004 * dc);
    poolWater.material.opacity = 0.82 + 0.16 * dc;
    // ---- 水滴、漣漪 ----
    if (state.waterT >= 0) {
      state.waterT += run;
      drops.forEach((d, i) => {
        const tt = state.waterT - i * 0.35;
        d.visible = tt > 0 && tt < 0.45;
        if (d.visible) d.position.set(GRIND.x + (i - 1) * 0.06, GRIND.y + 1.1 * (1 - (tt / 0.45) ** 2), GRIND.z);
      });
      const rt = state.waterT - 0.45;
      ripple.material.opacity = rt > 0 && rt < 1.6 ? 0.5 * (1 - rt / 1.6) : 0;
      ripple.scale.setScalar(0.05 + Math.max(0, rt) * 0.2);
      if (state.waterT > 2.4) state.waterT = -1;
    }
    // ---- 兩張小紙上的一滴墨 ----
    if (state.dropT > -1 && state.dropT < 12) {
      const before = state.dropT;
      state.dropT += run;
      samples.forEach((s, i) => {
        if (state.dropT < 0) { s.drop.visible = true; s.drop.position.set(SAMPLE[i].x, 0.014 + 1.0 * (state.dropT / -0.45) ** 2 + 0.05, SAMPLE[i].z); }
        else s.drop.visible = false;
      });
      if (state.dropT >= 0 && (before < 0 || run > 0)) {
        drawSamples(state.dropT * 1.4);
        const b = bleed('copy', 'mid', state.dropT * 1.4);
        bead.visible = b.gloss > 0.05;
        const rr = (26 / 300) * SAMPLE_W * b.r;
        bead.scale.set(rr, rr * 0.5 * b.gloss, rr); bead.position.set(SAMPLE[1].x, 0.016, SAMPLE[1].z);
      }
      if (state.dropT > 12) state.dropT = 12;
    }
    // ---- 鏡頭 ----
    const key = camKey();
    if (key !== lastKey) goHome(false);
    if (key === 'tip') {
      const c = brush.tipWorld(V(0, 0, 0));
      const want = c.clone().add(V(-0.62, 0.36, 0.82)), look = c.clone().add(V(0.12, 0.1, 0));
      const k = 1 - Math.exp(-dt * 5);
      camera.position.lerp(want, k); controls.target.lerp(look, k);
      camera.lookAt(controls.target);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return pose;
  }

  let narrow = false, lastPose = null;
  function updateLabels() {
    const on = state.labels, m = state.mode;
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    const desk = m === 'desk';
    show(labs.brush, on && (desk || m === 'brush'), m === 'brush' ? brush.group.localToWorld(V(0, 1.3, 0)) : V(RACK.x - 0.2, 0.95, -0.95));
    show(labs.ink, on && (desk || m === 'ink'), m === 'ink' ? stick.localToWorld(V(0, 0, 0.62)) : V(STICK_REST.x, 0.36, STICK_REST.z - 0.2));
    show(labs.paper, on && desk, V(-1.05, 0.05, 1.85));
    show(labs.stone, on && desk, V(STONE.x, 0.42, STONE.z + 1.3));
    show(labs.rack, on && desk && !narrow, V(RACK.x + 0.55, 0.2, RACK.z - 0.3));
    show(labs.weight, on && desk && !narrow, V(0.9, 0.2, PAPER.z - PAPER.h / 2 + 0.18));
    show(labs.pot, on && (desk || m === 'stone') && !narrow, V(4.5, 0.05, 2.15));
    show(labs.felt, on && desk && !narrow, V(-1.75, 0.03, 2.45));
    const bw = (y) => brush.group.localToWorld(V(0, y, 0));
    const inBrush = on && m === 'brush';
    show(labs.tip, inBrush && state.act !== 'press', brush.tipWorld(V(0, 0, 0)), 0);
    show(labs.belly, inBrush && !narrow, bw(-brush.L * 0.38).add(V(0.02, 0, 0)), 0);
    show(labs.root, inBrush && !narrow, bw(-0.02));
    show(labs.handle, inBrush, bw(0.75));
    show(labs.hall, on && (m === 'stone' || m === 'ink'), V(GRIND.x - 0.15, GRIND.y + 0.05, GRIND.z + 0.42));
    show(labs.well, on && (m === 'stone' || m === 'ink'), V(POOL.x, POOL.y + 0.05, POOL.z));
    show(labs.xuan, on && m === 'paper', V(SAMPLE[0].x, 0.02, SAMPLE[0].z + 0.68));
    show(labs.copy, on && m === 'paper', V(SAMPLE[1].x, 0.02, SAMPLE[1].z + 0.68));
    const ph = lastPose && lastPose.phase >= 0 && state.seq < writeEnd() + 0.2 ? phaseTxt[lastPose.phase] : null;
    const phHtml = ph ? `${ph.short_en}<small>${ph.short_zh}</small>` : '';
    if (labs.phase.innerHTML !== phHtml) labs.phase.innerHTML = phHtml;
    show(labs.phase, on && m === 'write' && !!ph && state.cam !== 'top', brush.group.localToWorld(V(0, 0.9, 0)));
  }
  let lastRead = 0;
  function readout() {
    const dk = grindDarkness(state.circles);
    if (R.circles) R.circles.textContent = String(Math.floor(state.circles));
    if (R.dark) R.dark.textContent = `${Math.round(dk * 100)}%`;
    if (R.darkBar) R.darkBar.style.width = `${(dk * 100).toFixed(1)}%`;
    if (R.sx) R.sx.textContent = `${bleed('xuan', 'mid', 99).rMax.toFixed(1)}×`;
    if (R.sc) R.sc.textContent = `${bleed('copy', 'mid', 99).rMax.toFixed(1)}×`;
    if (state.mode === 'write' && R.force) {
      const c = R.force, dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
      if (w && h) {
        if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
        const writing = lastPose && state.seq >= SEQ.touch;
        drawForce(c.getContext('2d'), w, h, curve, { at: writing ? Math.min(1, lastPose.f) : null, bounds, labels: phaseTxt.map((p) => p.short_zh) });
      }
      const ph = lastPose && state.seq >= SEQ.touch && state.seq < writeEnd() + 0.1 ? phaseTxt[lastPose.phase] : null;
      const k = ph ? `${ph.en} · ${ph.zh}` : state.seq < SEQ.touch ? 'Dipping the brush · 蘸墨' : 'Done · 寫完了';
      if (R.phK && R.phK.textContent !== k) R.phK.textContent = k;
      const tx = ph ? `${ph.text_en}<span class="zh">${ph.text_zh}</span>` : state.seq < SEQ.touch
        ? 'The brush dips into the ink well, then moves to the paper.<span class="zh">毛筆先到硯池蘸墨，再移到紙上。</span>'
        : 'Tap Write again to watch once more, or try a slower speed.<span class="zh">按「再寫一次」重看，或換慢一點的速度。</span>';
      if (R.phT && R.phT.innerHTML !== tx) R.phT.innerHTML = tx;
      if (R.press) R.press.textContent = lastPose && state.seq >= SEQ.touch && state.seq < writeEnd() ? `${Math.round(lastPose.p * 100)}%` : '—';
    }
  }

  // =====================================================================
  // 迴圈
  // =====================================================================
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    lastPose = step(dt) || lastPose;
    if (controls.enabled) controls.update();
    updateLabels();
    if (t - lastRead > 120) { lastRead = t; readout(); }
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
    root.classList.toggle('cg-narrow', narrow);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  brush.group.position.copy(restPos); brush.group.quaternion.copy(restQ);
  stick.position.copy(STICK_REST);
  setHair('goat'); setSpeed(1); setCam('side');
  setMode('desk', true);
  resize();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    brush: () => { setMode('brush'); act('press'); }, ink: () => setMode('ink'), paper: () => setMode('paper'),
    stone: () => setMode('stone'), write: () => setMode('write'), desk: () => setMode('desk'),
  };
  root.__lab = {
    camera, controls, state, scene, brush, paper, writer, setMode, setHair, act, setSpeed, setCam, setPlaying, drop, addWater,
    demo: (v) => DEMO[v] && DEMO[v](),
    /** 寫字流程跳到 seq 秒（會補畫之前的墨跡） */
    seek: (s) => { state.seq = s; writePose(); },
    goCam: () => { goHome(true); },
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) lastPose = step(0.02) || lastPose; },
    render: () => { lastPose = step(0) || lastPose; if (controls.enabled) controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
    SEQ, writeEnd,
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

// ---------------------------------------------------------------------
// 頁面下方「一滴墨在不同的紙上」：2D canvas，不需要 WebGL
// ---------------------------------------------------------------------
const SWATCH = { xuan: '#f6f0e1', shu: '#f1ead6', news: '#e8e4d8', copy: '#fbfbf7' };
function initDrops(box) {
  if (!box) return;
  const cards = [...box.querySelectorAll('[data-paper]')].map((el) => ({ el, key: el.getAttribute('data-paper'), cv: el.querySelector('canvas'), out: el.querySelector('.cg-drop-x') }));
  let ink = 'mid', t = -1, raf = 0, last = 0;
  function paperTex(g, S, key) {
    paperBase(g, S, S, { color: SWATCH[key], seed: key.length * 7, fiber: key === 'copy' ? 0.05 : key === 'news' ? 0.25 : 0.6 });
    if (key === 'news') {   // 報紙上的一行行字（只畫灰色短條，不用字型）
      const r = rng(17); g.fillStyle = 'rgba(60,60,60,.22)';
      for (let y = S * 0.06; y < S; y += S * 0.055) for (let x = S * 0.05; x < S * 0.95;) { const w = S * (0.03 + r() * 0.08); g.fillRect(x, y, Math.min(w, S * 0.95 - x), S * 0.018); x += w + S * 0.015; }
    }
    if (key === 'shu') { const gr = g.createLinearGradient(0, 0, S, S); gr.addColorStop(0, 'rgba(255,255,255,.25)'); gr.addColorStop(0.5, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(255,255,255,.18)'); g.fillStyle = gr; g.fillRect(0, 0, S, S); }
  }
  function draw() {
    for (const c of cards) {
      const css = c.cv.clientWidth || 160, dpr = Math.min(window.devicePixelRatio || 1, 2), S = Math.round(css * dpr);
      if (c.cv.width !== S || c.cv.height !== S) { c.cv.width = S; c.cv.height = S; }
      const g = c.cv.getContext('2d');
      paperTex(g, S, c.key);
      const R0 = S * 0.085;
      if (t < 0 && t > -1) {   // 墨滴還在往下掉：影子越來越小
        const k = 1 + t / 0.45;
        g.fillStyle = `rgba(0,0,0,${0.12 + 0.2 * k})`; g.beginPath(); g.ellipse(S / 2, S / 2, R0 * (1.6 - 0.6 * k), R0 * (0.9 - 0.3 * k), 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#121115'; g.beginPath(); g.arc(S / 2, S / 2 - S * 0.35 * (1 - k), R0 * 0.75, 0, Math.PI * 2); g.fill();
      } else if (t >= 0) drawBlot(g, S / 2, S / 2, R0, bleed(c.key, ink, t), c.key.length * 3);
      const b = bleed(c.key, ink, Math.max(0, t));
      c.out.textContent = t >= 0 ? `${(b.r).toFixed(1)}×` : '—';
    }
  }
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    t += dt;
    draw();
    if (t < 8) raf = requestAnimationFrame(tick);
  }
  function go() { t = -0.45; last = 0; if (!raf) raf = requestAnimationFrame(tick); }
  box.querySelectorAll('[data-ink]').forEach((b) => b.addEventListener('click', () => {
    ink = b.getAttribute('data-ink');
    box.querySelectorAll('[data-ink]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    go();
  }));
  box.querySelectorAll('[data-drop]').forEach((b) => b.addEventListener('click', go));
  new ResizeObserver(() => draw()).observe(box);
  // 捲到這裡才自動滴第一滴
  const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.35 });
  io.observe(box);
  draw();
  box.__drops = { go, setT: (v) => { t = v; draw(); }, setInk: (k) => { ink = k; draw(); } };
}

function init2D() {
  initDrops(document.querySelector('[data-cal-drops]'));
  const pad = document.querySelector('[data-cal-pad]');
  if (pad) initPad(pad, YI);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calfour-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
