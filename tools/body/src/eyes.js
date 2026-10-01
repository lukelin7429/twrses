/*
 * 人體探索 · 第八課「眼睛怎麼看見東西？」的 3D 眼睛。
 *
 * 真實的：頭骨（skeleton.glb，BodyParts3D），淡淡地當位置參考；其他骨頭不顯示。
 * 自繪示意：放大 5 倍、剖開一半的左眼（鞏膜、脈絡膜、視網膜三層，角膜、虹膜與瞳孔、水晶體、睫狀肌與懸韌帶、
 *   中央小凹、視神經盤＝盲點、視網膜血管），視神經接到後腦的視覺區；右眼是實際大小，方便對照放大倍數。
 *   眼前的物體：遠方的樹（6 m）、桌上的盆栽（30 cm）、太近的盆栽（10 cm），距離都不照比例。
 *
 * 眼睛座標（eye frame）：1 單位＝真實 1 mm；原點＝眼球中心，+Z＝視線方向（往前），+Y＝上，+X＝左眼的外側（太陽穴）。
 *   eyeGroup 放在頭骨左眼窩、縮放 S（5 倍）。剖面在 x = 0：只留 x ≤ 0（鼻側）那一半，鏡頭從 +X（左邊）看進去。
 *
 * 光學（示意、刻意誇大）：把角膜＋水晶體當成在 z = Z_L 的一片薄透鏡。
 *   焦點到透鏡的距離 v_f：1/v_f = (1/V0)·(1 + C_D·(acc + G − V))
 *     V＝物體的聚散度（1/距離，屈光度），acc＝水晶體調節（0～ACC_MAX），G＝眼鏡度數。
 *   視網膜到透鏡的距離 v_ret = V0 / (1 + C_D·E)，E：正常 0、近視 −4（眼球太長）、遠視 +4（太短）；
 *   眼球後半段沿 Z 拉長或壓短（deformZ），前半段（角膜、水晶體）不動。
 *   所以近視看遠、遠視看近（水晶體最多只能加 ACC_MAX）會模糊；戴上 G = E 的眼鏡（近視 −4 凹透鏡、遠視 +4 凸透鏡）就清楚。
 *   畫光線：物體上的點 → （眼鏡）→ 角膜 → 透鏡平面 → 朝焦點直走，直到碰到視網膜；焦點在視網膜後面時再畫一段虛的。
 * 盲點：一個紅點放在視線外側 15.5°、往下 1.5°，它的主光線打到視網膜的地方就是視神經盤（中心到中央小凹約 4.5 mm）。
 * 盲點測驗卡（initBlindCard）是 2D 的，不需要 WebGL，3D 載不出來也能做。
 *
 * 產物：cd tools/body && npm run build → assets/js/eyes.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, CatmullRomCurve3, CircleGeometry, Color, ConeGeometry,
  CylinderGeometry, DirectionalLight, DoubleSide, Float32BufferAttribute, Group, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, RingGeometry, Scene, Shape, ShapeGeometry, SphereGeometry,
  Sprite, SpriteMaterial, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const UP = V(0, 1, 0);
const S = 0.005;                                   // 眼睛座標 1 mm → 場景 5 mm（放大 5 倍）
const R_SCL = 11.5, R_CHO = 11.0, R_RET = 10.75, R_IN = 10.5;   // 鞏膜外緣、脈絡膜、視網膜、視網膜內面的半徑
const CORNEA_R = 7.8, CORNEA_C = 4.8;              // 角膜球半徑與球心 z（頂點在 12.6）
const LIMBUS = Math.acos((CORNEA_C * CORNEA_C + R_SCL * R_SCL - CORNEA_R * CORNEA_R) / (2 * CORNEA_C * R_SCL));  // 角膜與鞏膜交界的角度
const ORA = MathUtils.degToRad(52);                // 視網膜、脈絡膜前緣（鋸齒緣）
const Z_L = 7.0;                                   // 水晶體中心＝透鏡平面
const V0 = Z_L + R_IN;                             // 正常眼：透鏡到視網膜 17.5 mm
const C_D = 0.05;                                  // 每 1 屈光度讓焦點移動的比例（誇大）
const ACC_MAX = 6;                                 // 水晶體最多能加的度數（示意；真實的孩子更多）
const ERR = { normal: 0, near: -4, far: 4 };
const GLASSES_Z = 16.8;
const BLIND_ANG = MathUtils.degToRad(15.5), BLIND_DOWN = MathUtils.degToRad(1.5), BLIND_U = 32;
// 物體：V＝真實聚散度（屈光度）、u＝畫面上離透鏡多遠（眼睛座標，不照比例）、h＝高度
const OBJ = {
  far: { V: 1 / 6, u: 40, h: 22, dist: '6 m', en: '6 m away (not to scale)', zh: '6 公尺外（距離不照比例）' },
  near: { V: 1 / 0.3, u: 27, h: 13, dist: '30 cm', en: '30 cm away', zh: '30 公分外' },
  close: { V: 10, u: 17, h: 13, dist: '10 cm', en: '10 cm away', zh: '10 公分外' },
};
const RAY_TOP = 0xb8f28a, RAY_BOT = 0xffb066, RAY_DOT = 0xff5c7a;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const corneaZ = (y) => CORNEA_C + Math.sqrt(Math.max(0, CORNEA_R * CORNEA_R - y * y));

// ---------------- 小工具：半個旋轉體、剖面 ----------------
// prof: [[r, z], ...]，繞 Z 軸轉半圈，只留 x ≤ 0（鼻側）那一半
function revolveHalf(prof, seg = 40) {
  const n = prof.length, pos = [], idx = [];
  for (let j = 0; j <= seg; j++) {
    const ph = Math.PI / 2 + (Math.PI * j) / seg, c = Math.cos(ph), s = Math.sin(ph);
    for (const [r, z] of prof) pos.push(r * c, r * s, z);
  }
  for (let j = 0; j < seg; j++) for (let i = 0; i < n - 1; i++) {
    const a = j * n + i, b = a + n;
    idx.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
// 剖面（x = 0 平面上的多邊形），每個多邊形是 [[z, y], ...]
function capGeom(polys) {
  const shapes = polys.map((p) => { const s = new Shape(); p.forEach(([z, y], i) => (i ? s.lineTo(z, y) : s.moveTo(z, y))); return s; });
  const g = new ShapeGeometry(shapes);
  const a = g.attributes.position;
  for (let i = 0; i < a.count; i++) { const z = a.getX(i), y = a.getY(i); a.setXYZ(i, 0, y, z); }
  g.computeVertexNormals();
  return g;
}
// 半個球殼（前面開口到 theta0），只留 x ≤ 0
function shellHalf(r, theta0) {
  const g = new SphereGeometry(r, 64, 44, -Math.PI / 2, Math.PI, theta0, Math.PI - theta0);
  g.rotateX(Math.PI / 2);                          // 原本的 +Y（開口）轉到 +Z（前面）
  return g;
}
// 剖面上的一圈（角度從 +Z 量起，避開前面的開口）
function ringCap(r0, r1, theta0) {
  const g = new RingGeometry(r0, r1, 72, 1, theta0, Math.PI * 2 - theta0 * 2);
  g.rotateY(-Math.PI / 2);                          // (x, y, 0) → (0, y, x)
  return g;
}

// ---------------- 2D 畫面：樹或盆栽 ----------------
function paintScene(g, W, H, obj, dot) {
  if (obj === 'far') {
    let gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, '#7fbcf5'); gr.addColorStop(0.65, '#d6ecff');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#9cc7a0';
    g.beginPath(); g.moveTo(0, H * 0.7); g.quadraticCurveTo(W * 0.25, H * 0.56, W * 0.5, H * 0.66); g.quadraticCurveTo(W * 0.8, H * 0.55, W, H * 0.68); g.lineTo(W, H); g.lineTo(0, H); g.fill();
    g.fillStyle = '#6dbb5a'; g.fillRect(0, H * 0.74, W, H * 0.26);
    g.fillStyle = '#7a4a26'; g.fillRect(W * 0.475, H * 0.5, W * 0.05, H * 0.3);
    g.fillStyle = '#3f9a45';
    for (const [x, y, r] of [[0.5, 0.38, 0.17], [0.42, 0.47, 0.12], [0.58, 0.47, 0.12], [0.5, 0.24, 0.12]]) { g.beginPath(); g.arc(W * x, H * y, H * r, 0, 7); g.fill(); }
    g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(W * 0.46, H * 0.3, H * 0.07, 0, 7); g.fill();
  } else {
    g.fillStyle = '#efe2c8'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#c08a5a'; g.fillRect(0, H * 0.78, W, H * 0.22);
    g.save();
    if (obj === 'close') { g.translate(W / 2, H * 0.52); g.scale(1.75, 1.75); g.translate(-W / 2, -H * 0.52); }
    g.fillStyle = '#d9733f';
    g.beginPath(); g.moveTo(W * 0.4, H * 0.6); g.lineTo(W * 0.6, H * 0.6); g.lineTo(W * 0.57, H * 0.8); g.lineTo(W * 0.43, H * 0.8); g.fill();
    g.fillStyle = '#b85c2e'; g.fillRect(W * 0.39, H * 0.58, W * 0.22, H * 0.04);
    g.fillStyle = '#6b4424'; g.fillRect(W * 0.49, H * 0.44, W * 0.02, H * 0.15);
    g.fillStyle = '#3f9a45';
    for (const [x, y, r] of [[0.5, 0.33, 0.13], [0.43, 0.39, 0.09], [0.57, 0.39, 0.09], [0.5, 0.22, 0.09]]) { g.beginPath(); g.arc(W * x, H * y, H * r, 0, 7); g.fill(); }
    g.restore();
  }
  if (dot) {                                       // 盲點模式：樹左邊的紅點（左眼的外側）
    const x = W * 0.13, y = H * 0.55, r = H * 0.045;
    if (dot === 'gone') {
      g.setLineDash([4, 4]); g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 2;
      g.beginPath(); g.arc(x, y, r * 2.4, 0, 7); g.stroke(); g.setLineDash([]);
    } else {
      g.fillStyle = '#ff3355'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      g.strokeStyle = '#ffe7a0'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 2.4, 0, 7); g.stroke();
    }
  }
}
const scratch = document.createElement('canvas');
// flip：轉 180°（視網膜上的像）；blur：以 320 寬為準的模糊像素；dark：0～1
function drawView(cv, { obj, flip, blur, dark, dot }) {
  const W = cv.width, H = cv.height, g = cv.getContext('2d');
  const k = 1 / (1 + (blur * (W / 320)) / 2.2);   // 縮小再放大＝模糊（Safari 舊版沒有 ctx.filter）
  const w = Math.max(8, Math.round(W * k)), h = Math.max(6, Math.round(H * k));
  scratch.width = w; scratch.height = h;
  const s = scratch.getContext('2d');
  paintScene(s, w, h, obj, dot);
  g.save();
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  if (flip) { g.translate(W, H); g.rotate(Math.PI); }
  g.drawImage(scratch, 0, 0, W, H);
  g.restore();
  if (dark > 0) { g.fillStyle = `rgba(4,8,20,${dark})`; g.fillRect(0, 0, W, H); }
}

// ---------------- 盲點測驗卡（2D，不需要 WebGL） ----------------
function initBlindCard(root, onShow3D) {
  const card = root.querySelector('.ey-card');
  if (!card || card.dataset.ready) return null;
  card.dataset.ready = '1';
  const msg = root.querySelector('.ey-bs-msg'), eyeB = root.querySelector('.ey-bs-eye'), modeB = root.querySelector('.ey-bs-mode');
  const gap = root.querySelector('.ey-gap'), far = root.querySelector('.ey-far'), out = root.querySelector('.ey-angle');
  const TXT = {
    left: ['Cover your <b>right</b> eye. Stare at the <b>+</b> with your left eye, about an arm’s length away, and slowly move closer. When the dot disappears, it is in your blind spot!',
      '遮住<b>右眼</b>，用左眼盯著<b>十字</b>，從大約一隻手臂的距離慢慢靠近。圓點不見的那一刻，它就落在你的盲點上！'],
    right: ['Cover your <b>left</b> eye. Stare at the <b>+</b> with your right eye, about an arm’s length away, and slowly move closer. When the dot disappears, it is in your blind spot!',
      '遮住<b>左眼</b>，用右眼盯著<b>十字</b>，從大約一隻手臂的距離慢慢靠近。圓點不見的那一刻，它就落在你的盲點上！'],
    line: [' With the broken line, watch the gap: when it lands on your blind spot, your brain fills it in and the line looks whole.',
      '換成斷掉的線時注意缺口：缺口落在盲點上時，大腦會把它補起來，線看起來是完整的。'],
  };
  function say() {
    const t = TXT[card.dataset.side], l = card.dataset.mode === 'line';
    msg.innerHTML = `${t[0]}${l ? TXT.line[0] : ''}<span class="zh">${t[1]}${l ? TXT.line[1] : ''}</span>`;
    modeB.innerHTML = l ? '&#9899; Back to the dot<small>改回圓點</small>' : '&#10135; Try a broken line<small>改成斷掉的線</small>';
  }
  eyeB.addEventListener('click', () => { card.dataset.side = card.dataset.side === 'left' ? 'right' : 'left'; say(); });
  modeB.addEventListener('click', () => { card.dataset.mode = card.dataset.mode === 'dot' ? 'line' : 'dot'; say(); });
  root.querySelector('.ey-bs-3d').addEventListener('click', () => onShow3D && onShow3D());
  function calc() {
    const a = parseFloat(gap.value), b = parseFloat(far.value);
    if (!(a > 0 && b > 0)) { out.innerHTML = 'Measure both with a ruler when the dot disappears.<span class="zh">圓點消失時，用尺量出這兩個距離。</span>'; return; }
    const deg = (Math.atan(a / b) * 180) / Math.PI;
    out.innerHTML = `<b>${(a / b).toFixed(2)}</b> → your blind spot is about <b>${deg.toFixed(1)}°</b> to the side. Most people: about 15°.`
      + `<span class="zh">${(a / b).toFixed(2)}，表示你的盲點在視線旁邊大約 ${deg.toFixed(1)}°；大多數人約 15°。</span>`;
  }
  gap.addEventListener('input', calc); far.addEventListener('input', calc);
  say();
  return { scrollTo: () => card.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function glowTex() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(210,255,200,.85)'); gr.addColorStop(1, 'rgba(120,230,140,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  let lab3d = null;
  const card = initBlindCard(root, () => { if (lab3d) { root.scrollIntoView({ behavior: 'smooth', block: 'center' }); lab3d.blind(true); } });
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => card && card.scrollTo(), blind: () => card && card.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const BG_DIM = new Color(0x04070f), BG_BRIGHT = new Color(0x101c36);
  scene.background = BG_DIM.clone();
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.12; controls.maxDistance = 3;
  const hemi = new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.0); scene.add(hemi);
  scene.add(new AmbientLight(0xffffff, 0.22));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(2.5, 2.2, 1.6); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), status: $('.ey-status'), dist: $('.ey-dist'), pupil: $('.ey-pupil'), lensd: $('.ey-lensd'),
    objs: [...root.querySelectorAll('[data-obj]')], eyes: [...root.querySelectorAll('[data-eye]')], glasses: $('.ey-glasses'), blind: $('.ey-blind'),
    light: $('.ey-light'), lens: $('.ey-lens'), auto: $('[data-t="auto"]'), cvRet: $('.ey-cv-ret'), cvSee: $('.ey-cv-see'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    ready: false, labels: true, rays: true, obj: 'far', eye: 'normal', glasses: false, auto: true, blind: false,
    acc: 0, light: 0.55, rp: 2.35, sz: 1, szT: 1, gl: 0,
  };

  let bones = null, E = null;
  const eyeG = new Group();                        // 眼睛座標（放大的左眼和眼前的東西都掛在這裡）
  eyeG.scale.setScalar(S);
  scene.add(eyeG);
  const P = {};                                    // 位置、曲線
  const W = (p) => p.clone().multiplyScalar(S).add(eyeG.position);   // 眼睛座標 → 場景

  // ---------- 材質 ----------
  const M = {
    sclera: new MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.55, side: DoubleSide }),
    retina: new MeshStandardMaterial({ color: 0xe0805c, roughness: 0.7, side: DoubleSide }),
    choroid: new MeshStandardMaterial({ color: 0x6b2626, roughness: 0.7, side: DoubleSide }),
    retCap: new MeshStandardMaterial({ color: 0xf0a37c, roughness: 0.7, side: DoubleSide }),
    cornea: new MeshStandardMaterial({ color: 0xbfe4ff, roughness: 0.1, transparent: true, opacity: 0.32, side: DoubleSide, depthWrite: false }),
    corneaCap: new MeshStandardMaterial({ color: 0xbfe4ff, roughness: 0.2, transparent: true, opacity: 0.7, side: DoubleSide }),
    iris: new MeshStandardMaterial({ color: 0x7a4b2a, roughness: 0.6, side: DoubleSide }),
    lens: new MeshStandardMaterial({ color: 0xeaf4ff, roughness: 0.15, transparent: true, opacity: 0.55, side: DoubleSide, depthWrite: false }),
    lensCap: new MeshStandardMaterial({ color: 0xdcebf7, roughness: 0.3, transparent: true, opacity: 0.75, side: DoubleSide }),
    ciliary: new MeshStandardMaterial({ color: 0xa8403c, roughness: 0.6, side: DoubleSide }),
    zonule: new MeshBasicMaterial({ color: 0xe9e1c8, transparent: true, opacity: 0.7 }),
    fovea: new MeshStandardMaterial({ color: 0x9a4a1e, roughness: 0.8, side: DoubleSide }),
    disc: new MeshStandardMaterial({ color: 0xf6e7b0, roughness: 0.6, emissive: 0x000000, side: DoubleSide }),
    vessel: new MeshStandardMaterial({ color: 0xb02a28, roughness: 0.5 }),
    nerve: new MeshStandardMaterial({ color: 0xffe08a, roughness: 0.5 }),
    glass: new MeshStandardMaterial({ color: 0xcfeaff, roughness: 0.05, transparent: true, opacity: 0.4, side: DoubleSide, depthWrite: false }),
    frame: new MeshStandardMaterial({ color: 0x2b2f3a, roughness: 0.4 }),
    focus: new MeshBasicMaterial({ color: 0xffffff }),
    rayTop: new MeshBasicMaterial({ color: RAY_TOP, transparent: true, opacity: 0.95 }),
    rayBot: new MeshBasicMaterial({ color: RAY_BOT, transparent: true, opacity: 0.95 }),
    rayDot: new MeshBasicMaterial({ color: RAY_DOT, transparent: true, opacity: 0.95 }),
    ghostTop: new MeshBasicMaterial({ color: RAY_TOP, transparent: true, opacity: 0.3, depthWrite: false }),
    ghostBot: new MeshBasicMaterial({ color: RAY_BOT, transparent: true, opacity: 0.3, depthWrite: false }),
  };

  // ---------- 眼球殼（後半段會隨近視／遠視拉長或壓短） ----------
  const shellMeshes = [];
  function addShell(geo, mat) {
    const m = new Mesh(geo, mat);
    m.userData.orig = Float32Array.from(geo.attributes.position.array);
    eyeG.add(m); shellMeshes.push(m); return m;
  }
  const deformZ = (z, sz) => (z >= Z_L ? z : Z_L + (z - Z_L) * sz);
  addShell(shellHalf(R_SCL, LIMBUS), M.sclera);
  addShell(shellHalf(R_IN, ORA), M.retina);
  addShell(ringCap(R_CHO, R_SCL, LIMBUS), M.sclera);
  addShell(ringCap(R_RET, R_CHO, ORA), M.choroid);
  addShell(ringCap(R_IN, R_RET, ORA), M.retCap);
  const fovea = new Mesh(new CircleGeometry(0.75, 24, Math.PI / 2, Math.PI), M.fovea);
  eyeG.add(fovea);
  function applyStretch(sz) {
    for (const m of shellMeshes) {
      const a = m.geometry.attributes.position, o = m.userData.orig;
      for (let i = 0; i < a.count; i++) a.setZ(i, deformZ(o[i * 3 + 2], sz));
      a.needsUpdate = true;
      m.geometry.computeVertexNormals();
      m.geometry.computeBoundingSphere();
    }
    fovea.position.set(0, 0, deformZ(-R_IN + 0.04, sz));
    placeDisc(sz);
  }

  // ---------- 角膜 ----------
  {
    const out = [], inn = [];
    const yL = Math.sqrt(R_SCL * R_SCL - Math.pow(R_SCL * Math.cos(LIMBUS), 2));
    for (let i = 0; i <= 24; i++) { const y = (yL * i) / 24; out.push([y, corneaZ(y)]); }
    for (let i = 24; i >= 0; i--) { const y = (yL * 0.97 * i) / 24; inn.push([y, corneaZ(y) - 0.55 - 0.25 * (i / 24)]); }
    const prof = [...out, ...inn];
    eyeG.add(new Mesh(revolveHalf(prof, 48), M.cornea));
    const poly = [...out.map(([r, z]) => [z, r]), ...inn.map(([r, z]) => [z, r])];
    const polyB = poly.map(([z, y]) => [z, -y]);
    eyeG.add(new Mesh(capGeom([poly, polyB]), M.corneaCap));
    P.corneaTop = V(0, yL * 0.6, corneaZ(yL * 0.6));
  }

  // ---------- 虹膜、水晶體、睫狀肌（形狀隨瞳孔與對焦重建） ----------
  const iris = new Mesh(new BufferGeometry(), M.iris), irisCap = new Mesh(new BufferGeometry(), M.iris);
  const lens = new Mesh(new BufferGeometry(), M.lens), lensCap = new Mesh(new BufferGeometry(), M.lensCap);
  eyeG.add(iris, irisCap, lens, lensCap);
  const ciliary = new Mesh(new TorusGeometry(6.55, 0.8, 12, 40, Math.PI).rotateZ(Math.PI / 2), M.ciliary);
  ciliary.position.z = 8.35;
  eyeG.add(ciliary);
  const LS = { T: 0, a: 0, zi: 0, rp: 0 };
  function lensShape(k) {
    const T = 3.4 + 2.0 * k, a = 4.6 - 0.5 * k;
    return { T, a, front: Z_L + 0.42 * T, back: Z_L - 0.58 * T };
  }
  function buildEyeFront(k, rp) {
    const ls = lensShape(k);
    if (Math.abs(ls.T - LS.T) > 0.004) {
      const prof = [];
      for (let i = 0; i <= 32; i++) {
        const t = (Math.PI * i) / 32, r = ls.a * Math.sin(t);
        const z = t <= Math.PI / 2 ? Z_L + 0.42 * ls.T * Math.cos(t) : Z_L + 0.58 * ls.T * Math.cos(t);
        prof.push([r, z]);
      }
      lens.geometry.dispose(); lens.geometry = revolveHalf(prof, 40);
      const top = prof.map(([r, z]) => [z, r]), bot = prof.slice().reverse().map(([r, z]) => [z, -r]);
      lensCap.geometry.dispose(); lensCap.geometry = capGeom([[...top, ...bot]]);
      ciliary.scale.set(1 - 0.06 * k, 1 - 0.06 * k, 1 + 0.35 * k);
      LS.T = ls.T; LS.a = ls.a;
    }
    const zi = ls.front + 0.22;
    if (Math.abs(rp - LS.rp) > 0.003 || Math.abs(zi - LS.zi) > 0.003) {
      const ro = 6.1, t = 0.22;
      const prof = [[rp, zi - t], [ro, zi - t - 0.1], [ro, zi + t + 0.1], [rp, zi + t], [rp, zi - t]];
      iris.geometry.dispose(); iris.geometry = revolveHalf(prof, 48);
      const top = [[zi - t, rp], [zi - t - 0.1, ro], [zi + t + 0.1, ro], [zi + t, rp]];
      irisCap.geometry.dispose(); irisCap.geometry = capGeom([top, top.map(([z, y]) => [z, -y])]);
      LS.rp = rp; LS.zi = zi;
    }
    return ls;
  }

  // ---------- 線段池（光線、懸韌帶） ----------
  const segGeo = new CylinderGeometry(1, 1, 1, 6, 1, true);
  const pool = [];
  let used = 0;
  const tmp = V(0, 0, 0);
  function seg(a, b, mat, r = 0.13) {
    let m = pool[used];
    if (!m) { m = new Mesh(segGeo, mat); m.renderOrder = 6; eyeG.add(m); pool.push(m); }
    used++;
    m.material = mat;
    tmp.copy(b).sub(a);
    const len = tmp.length();
    m.visible = len > 1e-4;
    if (!m.visible) return;
    m.position.copy(a).addScaledVector(tmp, 0.5);
    m.quaternion.setFromUnitVectors(UP, tmp.multiplyScalar(1 / len));
    m.scale.set(r, len, r);
  }

  // ---------- 物體：遠方的樹、盆栽 ----------
  const mats = {
    leaf: new MeshStandardMaterial({ color: 0x3f9a45, roughness: 0.75 }), leaf2: new MeshStandardMaterial({ color: 0x5cb85c, roughness: 0.75 }),
    trunk: new MeshStandardMaterial({ color: 0x7a4a26, roughness: 0.8 }), pot: new MeshStandardMaterial({ color: 0xd9733f, roughness: 0.7 }),
  };
  function makeTree(h) {
    const g = new Group();
    const trunk = new Mesh(new CylinderGeometry(0.05 * h, 0.065 * h, 0.4 * h, 10), mats.trunk); trunk.position.y = -0.3 * h;
    const c1 = new Mesh(new ConeGeometry(0.3 * h, 0.5 * h, 14), mats.leaf); c1.position.y = 0.0 * h;
    const c2 = new Mesh(new ConeGeometry(0.22 * h, 0.4 * h, 14), mats.leaf2); c2.position.y = 0.3 * h;
    g.add(trunk, c1, c2);
    return g;
  }
  function makePlant(h) {
    const g = new Group();
    const pot = new Mesh(new CylinderGeometry(0.2 * h, 0.15 * h, 0.3 * h, 18), mats.pot); pot.position.y = -0.35 * h;
    const stem = new Mesh(new CylinderGeometry(0.025 * h, 0.035 * h, 0.25 * h, 8), mats.trunk); stem.position.y = -0.1 * h;
    g.add(pot, stem);
    for (const [x, y, z, r, m] of [[0, 0.18, 0, 0.24, mats.leaf], [-0.15, 0.08, 0.05, 0.16, mats.leaf2], [0.15, 0.08, -0.04, 0.16, mats.leaf2], [0, 0.34, 0, 0.15, mats.leaf2]]) {
      const b = new Mesh(new SphereGeometry(r * h, 16, 12), m); b.position.set(x * h, y * h, z * h); g.add(b);
    }
    return g;
  }
  const objs = { far: makeTree(OBJ.far.h), near: makePlant(OBJ.near.h), close: makePlant(OBJ.close.h) };
  const imgs = {};                                // 視網膜上倒立的小像（同一個物體轉 180°）
  for (const [k, o] of Object.entries(objs)) {
    o.position.set(0, 0, Z_L + OBJ[k].u);
    eyeG.add(o);
    const im = o.clone(true);
    im.traverse((n) => { if (n.isMesh) n.material = n.material.clone(); n.material && (n.material.transparent = true); });
    im.rotation.z = Math.PI;
    eyeG.add(im);
    imgs[k] = im;
  }
  const dotObj = new Mesh(new SphereGeometry(1.4, 18, 12), new MeshStandardMaterial({ color: 0xff3355, emissive: 0x551020, roughness: 0.4 }));
  dotObj.position.set(BLIND_U * Math.sin(BLIND_ANG), -BLIND_U * Math.tan(BLIND_DOWN), Z_L + BLIND_U * Math.cos(BLIND_ANG));
  eyeG.add(dotObj);

  // ---------- 眼鏡 ----------
  const glasses = new Group();
  const glassLens = new Mesh(new BufferGeometry(), M.glass);
  const glassRim = new Mesh(new TorusGeometry(7.4, 0.35, 8, 48), M.frame);
  glasses.add(glassLens, glassRim);
  glasses.position.z = GLASSES_Z;
  eyeG.add(glasses);
  let glassKind = null;
  function buildGlasses(kind) {
    if (kind === glassKind) return;
    glassKind = kind;
    if (!kind) return;
    const prof = [];
    const c = kind === 'near' ? 0.35 : 1.6, e = kind === 'near' ? 1.4 : 0.35;   // 中心厚度、邊緣厚度（半）
    for (let i = 0; i <= 16; i++) { const r = (7.2 * i) / 16; prof.push([r, c + (e - c) * (r / 7.2) ** 2]); }
    for (let i = 16; i >= 0; i--) { const r = (7.2 * i) / 16; prof.push([r, -(c + (e - c) * (r / 7.2) ** 2)]); }
    const pos = [], idx = [], n = prof.length, segs = 48;
    for (let j = 0; j <= segs; j++) {
      const ph = (Math.PI * 2 * j) / segs;
      for (const [r, z] of prof) pos.push(r * Math.cos(ph), r * Math.sin(ph), z);
    }
    for (let j = 0; j < segs; j++) for (let i = 0; i < n - 1; i++) { const a = j * n + i, b = a + n; idx.push(a, b, a + 1, a + 1, b, b + 1); }
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    glassLens.geometry.dispose(); glassLens.geometry = g;
  }

  // ---------- 視網膜：找光線打到哪裡（後半段是拉伸過的球） ----------
  function fRet(p, sz) { const zz = p.z >= Z_L ? p.z : Z_L + (p.z - Z_L) / sz; return p.x * p.x + p.y * p.y + zz * zz - R_IN * R_IN; }
  const hp = V(0, 0, 0);
  function hitRetina(a, d, sz) {                   // a 在眼睛裡、d 單位向量
    let t0 = 0, t1 = 0;
    for (let t = 0.5; t < 60; t += 0.5) { hp.copy(a).addScaledVector(d, t); if (fRet(hp, sz) > 0) { t1 = t; break; } t0 = t; }
    if (!t1) return null;
    for (let k = 0; k < 24; k++) { const tm = (t0 + t1) / 2; hp.copy(a).addScaledVector(d, tm); if (fRet(hp, sz) > 0) t1 = tm; else t0 = tm; }
    return { t: t1, p: a.clone().addScaledVector(d, t1) };
  }
  // 視神經盤＝盲點：紅點的主光線（經過透鏡中心）打到視網膜的地方
  const disc = new Mesh(new CircleGeometry(0.85, 28), M.disc);
  eyeG.add(disc);
  const vessels = new Group(); eyeG.add(vessels);
  function placeDisc(sz) {
    const L0 = V(0, 0, Z_L), d = L0.clone().sub(dotObj.position).normalize();
    const h = hitRetina(L0, d, sz);
    if (!h) return;
    const p = h.p, zz = Z_L + (p.z - Z_L) / sz;
    const n = V(p.x, p.y, zz / sz).normalize();   // 拉伸後的外法線（近似）
    disc.position.copy(p).addScaledVector(n, -0.05);
    disc.lookAt(eyeG.localToWorld(p.clone().addScaledVector(n, -5)));
    P.disc = p.clone(); P.discN = n.clone();
    // 血管：從視神經盤往上、往下彎向中央小凹（只畫在留下來的鼻側半邊）
    for (const c of vessels.children) c.geometry.dispose();
    vessels.clear();
    const u0 = V(p.x, p.y, zz).normalize();
    for (const [dy, tz, dx] of [[0.55, -0.85, 0.35], [-0.55, -0.85, 0.35], [0.8, -0.3, -0.25], [-0.8, -0.3, -0.25]]) {
      const pts = [];
      for (let i = 0; i <= 14; i++) {
        const s = i / 14;
        const dir = u0.clone().add(V(dx * s * 0.6, dy * Math.sin(s * 1.6), 0)).add(V(0, 0, tz * s * s * 0.4)).normalize();
        if (dir.x > -0.04) break;
        const q = dir.multiplyScalar(R_IN - 0.12);
        q.z = deformZ(q.z, sz);
        pts.push(q);
      }
      if (pts.length > 2) vessels.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), 40, 0.13, 6, false), M.vessel));
    }
    if (bones) buildNerve();
  }

  // ---------- 載入骨架：只留頭骨 ----------
  const brainMeshes = [];
  let visArea = null, nerveTubes = [], picSprite = null, rightEye = null;
  const glowT = glowTex();
  const pulses = [];
  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      const head = b.info.region === 'skull' || /^c[1-4]$/.test(b.info.id);
      b.mesh.visible = head;
      b.mat.opacity = 0.13; b.mat.depthWrite = false; b.mesh.renderOrder = 1;
    }
    const B = (id) => bones.get(id);
    const fr = B('frontal').box;
    E = V(0.031, fr.min.y - 0.012, fr.max.z - 0.022);   // 左眼眼窩（同第七課）
    eyeG.position.copy(E);
    eyeG.updateMatrixWorld(true);
    // 大腦（淡淡的兩個半球）與後腦的視覺區
    const cran = B('frontal').box.clone();
    for (const id of ['occipital', 'r-parietal', 'l-parietal', 'r-temporal', 'l-temporal']) cran.union(B(id).box);
    const cs = cran.getSize(V(0, 0, 0)), cc = cran.getCenter(V(0, 0, 0));
    const bc = V(cc.x, cc.y + cs.y * 0.06, cc.z - cs.z * 0.02);
    const hsx = cs.x * 0.2, hsy = cs.y * 0.33, hsz = cs.z * 0.4;
    const bm = new MeshStandardMaterial({ color: 0xf0b4c4, roughness: 0.6, transparent: true, opacity: 0.16, depthWrite: false });
    for (const side of [1, -1]) {
      const m = new Mesh(new SphereGeometry(1, 40, 28), bm);
      m.scale.set(hsx, hsy, hsz); m.position.set(bc.x + side * hsx * 0.95, bc.y, bc.z); m.renderOrder = 2;
      scene.add(m); brainMeshes.push(m);
    }
    P.occ = V(bc.x, bc.y - hsy * 0.05, bc.z - hsz * 0.88);
    visArea = new Mesh(new SphereGeometry(1, 28, 20), new MeshStandardMaterial({ color: 0x7ddc9a, emissive: 0x2f9a52, emissiveIntensity: 0.4, transparent: true, opacity: 0.35, depthWrite: false }));
    visArea.scale.set(hsx * 1.6, hsy * 0.45, hsz * 0.22); visArea.position.copy(P.occ); visArea.renderOrder = 3;
    scene.add(visArea); brainMeshes.push(visArea);
    P.bc = bc; P.hsy = hsy; P.hsz = hsz;
    // 右眼：實際大小，對照放大 5 倍的左眼
    rightEye = new Mesh(new SphereGeometry(0.012, 24, 16), new MeshStandardMaterial({ color: 0xf6f3ea, roughness: 0.35 }));
    rightEye.position.set(-E.x, E.y, E.z);
    const irisR = new Mesh(new CircleGeometry(0.0055, 24), new MeshStandardMaterial({ color: 0x7a4b2a }));
    irisR.position.set(0, 0, 0.0121); rightEye.add(irisR);
    const pupR = new Mesh(new CircleGeometry(0.0024, 20), new MeshBasicMaterial({ color: 0x050505 }));
    pupR.position.set(0, 0, 0.0122); rightEye.add(pupR);
    scene.add(rightEye); brainMeshes.push(rightEye);
    // 「大腦轉正」的小圖（用 2D 畫面當貼圖）
    picSprite = new Sprite(new SpriteMaterial({ map: new CanvasTexture(picCv), depthTest: false, transparent: true }));
    picSprite.scale.set(0.072, 0.054, 1);
    picSprite.position.set(bc.x, bc.y + hsy * 1.45, bc.z - hsz * 0.35);   // 頭頂後上方
    picSprite.renderOrder = 10;
    scene.add(picSprite); brainMeshes.push(picSprite);
    for (let i = 0; i < 3; i++) {
      const s = new Sprite(new SpriteMaterial({ map: glowT, color: 0xd8ffd0, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
      s.scale.set(0.014, 0.014, 1); s.renderOrder = 9; scene.add(s); pulses.push(s);
    }

    // 鏡頭：從左邊（+X）稍微偏上、偏前看剖面
    P.target = E.clone().add(V(0, 0.018, 0.085));
    P.home = V(0.47, 0.12, 0.13);
    camera.position.copy(homePos());
    controls.target.copy(P.target);

    applyStretch(1);                               // 也會放好視神經盤、接上視神經
    setObj('far');
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  // 場景是橫的（樹 → 眼睛 → 大腦），畫面越窄鏡頭退越遠
  const fit = () => MathUtils.clamp(1 + (1.35 - camera.aspect) * 1.1, 1, 1.7);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // 視神經：從視神經盤穿出眼球 → 視交叉 → 外側膝狀體 → 後腦的視覺區（右眼也接到視交叉）
  function buildNerve() {
    for (const t of nerveTubes) { t.geometry.dispose(); t.parent.remove(t); }
    nerveTubes = [];
    const p0 = P.disc.clone(), n = P.discN;
    const stub = new CatmullRomCurve3([p0, p0.clone().addScaledVector(n, 2.4), p0.clone().addScaledVector(n, 5).add(V(-1.2, -0.4, -2.5))]);
    const t1 = new Mesh(new TubeGeometry(stub, 24, 1.3, 12, false), M.nerve); eyeG.add(t1); nerveTubes.push(t1);
    const s0 = W(stub.getPoint(1));
    const chiasm = V(0, E.y - 0.014, E.z - 0.075);
    const lgn = V(0.022, E.y - 0.006, E.z - 0.115);
    const opt = new CatmullRomCurve3([s0, V(s0.x * 0.6, E.y - 0.012, E.z - 0.068), chiasm, lgn, V(0.026, P.occ.y + 0.004, P.occ.z + 0.04), P.occ.clone().add(V(0.012, 0, 0.008))]);
    const t2 = new Mesh(new TubeGeometry(opt, 80, 0.0028, 8, false), M.nerve); t2.renderOrder = 4; scene.add(t2); nerveTubes.push(t2);
    const fromR = new CatmullRomCurve3([V(-E.x + 0.004, E.y, E.z - 0.012), V(-0.014, E.y - 0.01, E.z - 0.05), chiasm]);
    const t3 = new Mesh(new TubeGeometry(fromR, 30, 0.0024, 8, false), M.nerve); scene.add(t3); nerveTubes.push(t3);
    P.optic = opt; P.stub = stub;
    for (const t of nerveTubes) t.visible = state.skullOn !== false || t === t1;
  }

  // ---------------- 光學 ----------------
  const tgtAcc = () => {
    const G = state.glasses ? ERR[state.eye] : 0;
    return MathUtils.clamp(ERR[state.eye] + OBJ[state.obj].V - G, 0, ACC_MAX);
  };
  function optics() {
    const E_ = ERR[state.eye], G = state.glasses ? E_ : 0, ob = OBJ[state.obj];   // 眼鏡度數＝誤差：近視 −4（凹透鏡）、遠視 +4
    const vf = V0 / (1 + C_D * (state.acc + G - ob.V));
    const vret = V0 * state.sz;
    const blur = (2 * state.rp * Math.abs(vret - vf)) / vf;   // 視網膜上的模糊圈直徑（mm）
    return { vf, vret, blur, G, ob };
  }
  const L0 = V(0, 0, Z_L);
  const RAY_X = 0.2;                                // 光線畫在剖面前一點點，不被剖面蓋住
  function drawRays(o) {
    used = 0;
    const { vf, ob, G } = o, u = ob.u;
    P.focus = [];
    if (state.rays && !state.blind) {             // 盲點模式只畫紅點的光，畫面比較乾淨
      for (const [yo, mat, ghost] of [[0.42 * ob.h, M.rayTop, M.ghostTop], [-0.42 * ob.h, M.rayBot, M.ghostBot]]) {
        const O = V(RAY_X, yo, Z_L + u);
        const I = V(RAY_X, (-yo * vf) / u, Z_L - vf);
        P.focus.push(I);
        for (const k of [-0.88, -0.44, 0, 0.44, 0.88]) {
          const p = k * state.rp;
          const C = V(RAY_X, p * 1.12, corneaZ(p * 1.12));
          const Lp = V(RAY_X, p * 0.95, Z_L);
          let a = O;
          if (state.glasses && G) { const Gp = V(RAY_X, p * 1.12 * (1 + 0.045 * G), GLASSES_Z); seg(a, Gp, mat); a = Gp; }
          seg(a, C, mat); seg(C, Lp, mat);
          const d = I.clone().sub(Lp).normalize();
          const h = hitRetina(Lp, d, state.sz);
          if (!h) continue;
          seg(Lp, h.p, mat);
          const tI = I.distanceTo(Lp);
          if (tI > h.t + 0.3) seg(h.p, I, ghost, 0.09);    // 焦點在視網膜後面：虛線延伸過去
        }
      }
    }
    if (state.blind) {                              // 紅點的光：水平面上三條，經過瞳孔落在視神經盤
      const D = dotObj.position;
      const I = L0.clone().addScaledVector(L0.clone().sub(D), vf / (D.z - Z_L));
      for (const k of [-0.7, 0, 0.7]) {
        const p = k * state.rp;
        const C = V(p * 1.12, 0, corneaZ(p * 1.12)), Lp = V(p * 0.95, 0, Z_L);
        seg(D, C, M.rayDot); seg(C, Lp, M.rayDot);
        const h = hitRetina(Lp, I.clone().sub(Lp).normalize(), state.sz);
        if (h) seg(Lp, h.p, M.rayDot);
      }
    }
    // 懸韌帶：水晶體赤道 → 睫狀肌
    const k = state.acc / ACC_MAX;
    for (const sy of [1, -1]) for (const dz of [-0.55, 0, 0.55]) seg(V(0.05, sy * LS.a, Z_L + dz * 0.6), V(0.05, sy * (5.8 - 0.35 * k), 8.2 + dz * 0.5), M.zonule, 0.05);
    for (let i = used; i < pool.length; i++) pool[i].visible = false;
  }
  const focusDots = [new Mesh(new SphereGeometry(0.42, 14, 10), M.focus), new Mesh(new SphereGeometry(0.42, 14, 10), M.focus)];
  for (const f of focusDots) { f.renderOrder = 7; eyeG.add(f); }

  // ---------------- 2D 畫面 ----------------
  const picCv = document.createElement('canvas'); picCv.width = 256; picCv.height = 192;
  let lastKey = '';
  function draw2D(o) {
    const blurPx = Math.min(16, (o.blur / (0.84 * o.ob.h * (o.vret / o.ob.u))) * 168 * 1.5);
    const dark = Math.round(0.6 * (1 - state.light) * 20) / 20;
    const bq = Math.round(blurPx * 2) / 2;
    const k = `${state.obj}|${bq}|${dark}|${state.blind}`;
    if (k === lastKey) return;
    lastKey = k;
    drawView(R.cvRet, { obj: state.obj, flip: true, blur: bq, dark, dot: state.blind ? 'on' : null });
    drawView(R.cvSee, { obj: state.obj, flip: false, blur: bq, dark, dot: state.blind ? 'gone' : null });
    drawView(picCv, { obj: state.obj, flip: false, blur: bq, dark, dot: state.blind ? 'gone' : null });
    if (picSprite) picSprite.material.map.needsUpdate = true;
  }

  // ---------------- 文字 ----------------
  function setStatus(o) {
    let cls, en, zh;
    const sharp = o.blur < 0.12;
    if (state.blind) {
      cls = 'ey-blindmsg';
      en = 'Light from the red dot lands on the blind spot, where the optic nerve leaves the eye. There are no light-sensing cells there, so the dot vanishes, and your brain fills in the background.';
      zh = '紅點的光落在盲點上，也就是視神經離開眼球的地方。那裡沒有感光細胞，所以紅點消失了，大腦再用周圍的背景把它補起來。';
    } else if (sharp) {
      cls = 'ey-ok';
      en = 'Sharp! Light from each point comes together right on the retina.';
      zh = '清楚！每一點的光剛好聚在視網膜上。';
      if (state.glasses) { en += ' The glasses bend the light just enough.'; zh += '眼鏡把光折得剛剛好。'; }
      else if (state.eye === 'near' && state.obj !== 'far') { en += ' A nearsighted eye sees near things well.'; zh += '近視的眼睛看近的東西很清楚。'; }
      else if (state.eye === 'far' && state.obj === 'far') { en += ' A farsighted eye can still focus far away, but the lens is already working.'; zh += '遠視的眼睛看遠還看得清楚，但水晶體已經在出力了。'; }
    } else {
      cls = 'ey-bad';
      const front = o.vf < o.vret;
      en = front ? 'Blurry: the light comes to a point in front of the retina.' : 'Blurry: the light would come to a point behind the retina.';
      zh = front ? '模糊：光在視網膜前面就聚成一點了。' : '模糊：光要到視網膜後面才會聚成一點。';
      if (!state.auto) { en += ' Move the lens slider, or turn on auto-focus.'; zh += '拉動水晶體滑桿，或打開自動對焦。'; }
      else if (state.eye === 'near' && !state.glasses) { en += ' This is nearsightedness. Try the glasses!'; zh += '這就是近視，戴上眼鏡試試！'; }
      else if (state.eye === 'far' && !state.glasses) { en += ' This is farsightedness: even the roundest lens is not enough. Try the glasses!'; zh += '這就是遠視：水晶體已經最圓了還是不夠，戴上眼鏡試試！'; }
      else if (state.obj === 'close') { en += ' Too close: even the roundest lens cannot focus it. Move it back to 30 cm!'; zh += '太近了：水晶體再圓也對不了焦，拿遠一點到 30 公分吧！'; }
    }
    const html = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
    if (R.status.innerHTML !== html) { R.status.innerHTML = html; R.status.className = `ey-status ${cls}`; }
    const pm = `${(state.rp * 2).toFixed(1)} mm`;
    if (R.pupil.textContent !== pm) R.pupil.textContent = pm;
    const k = state.acc / ACC_MAX;
    const lt = k < 0.06 ? 'Flat · 扁' : k < 0.55 ? 'Rounder · 變圓' : k < 0.97 ? 'Very round · 很圓' : 'Roundest · 最圓';
    if (R.lensd.textContent !== lt) R.lensd.textContent = lt;
  }

  // ---------------- 狀態 ----------------
  function setObj(k) {
    state.obj = k;
    for (const [n, o] of Object.entries(objs)) o.visible = n === k;
    R.objs.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-obj') === k ? 'true' : 'false'));
    R.dist.textContent = OBJ[k].dist;
    lastKey = '';
  }
  function setEye(k) {
    state.eye = k;
    state.szT = 1 / (1 + C_D * ERR[k]);
    R.eyes.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-eye') === k ? 'true' : 'false'));
    R.glasses.disabled = k === 'normal';
    if (k === 'normal') setGlasses(false);
    buildGlasses(k === 'normal' ? null : k);
  }
  function setGlasses(on) {
    state.glasses = on && state.eye !== 'normal';
    R.glasses.setAttribute('aria-pressed', state.glasses ? 'true' : 'false');
  }
  function setBlind(on) {
    state.blind = on;
    R.blind.setAttribute('aria-pressed', on ? 'true' : 'false');
    lastKey = '';
    if (!state.ready) return;
    if (on) {
      const t = W(V(3, 0, 13));                    // 從左上方斜看進剖面，看得到鼻側內壁的盲點
      flyTo(t.clone().add(V(0.17, 0.2, 0.1).multiplyScalar(fit())), t);
    } else flyTo(homePos(), P.target);
  }
  function setAuto(on) {
    state.auto = on;
    if (R.auto) R.auto.checked = on;
  }

  // ---------------- 操作 ----------------
  R.objs.forEach((b) => b.addEventListener('click', () => setObj(b.getAttribute('data-obj'))));
  R.eyes.forEach((b) => b.addEventListener('click', () => setEye(b.getAttribute('data-eye'))));
  R.glasses.addEventListener('click', () => setGlasses(!state.glasses));
  R.blind.addEventListener('click', () => setBlind(!state.blind));
  const sliderFill = (el) => el.style.setProperty('--p', `${el.value}%`);
  R.light.addEventListener('input', () => { state.light = R.light.value / 100; sliderFill(R.light); });
  R.lens.addEventListener('input', () => { setAuto(false); state.acc = (R.lens.value / 100) * ACC_MAX; sliderFill(R.lens); });
  if (R.auto) R.auto.addEventListener('change', () => { state.auto = R.auto.checked; });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="rays"]', (v) => { state.rays = v; });
  bind('[data-t="skull"]', (v) => {
    state.skullOn = v;
    if (bones) for (const b of bones.values()) if (b.info.region === 'skull' || /^c[1-4]$/.test(b.info.id)) b.mesh.visible = v;
    for (const m of brainMeshes) m.visible = v;
    for (const t of nerveTubes) if (t.parent === scene) t.visible = v;
    for (const p of pulses) p.visible = v && p.visible;
  });
  $('.al-home').addEventListener('click', () => { if (state.ready) { setBlind(false); flyTo(homePos(), P.target); } });
  sliderFill(R.light); sliderFill(R.lens);

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    cornea: lab.add('ey-lb', 'Cornea · 角膜'), iris: lab.add('ey-lb', 'Iris · 虹膜'), pupil: lab.add('ey-lb', 'Pupil · 瞳孔'),
    lens: lab.add('ey-lb', 'Lens · 水晶體'), cil: lab.add('ey-lb ey-lb-m', 'Ciliary muscle · 睫狀肌'), retina: lab.add('ey-lb', 'Retina · 視網膜'),
    disc: lab.add('ey-lb ey-lb-d', 'Blind spot · 盲點'), nerve: lab.add('ey-lb', 'Optic nerve · 視神經'),
    focus: lab.add('ey-lb ey-lb-f', 'Focus · 焦點'), img: lab.add('ey-lb ey-lb-i', 'Upside down · 上下顛倒'),
    obj: lab.add('ey-lb ey-lb-o', ''), glasses: lab.add('ey-lb', 'Glasses · 眼鏡'), dot: lab.add('ey-lb ey-lb-d', 'Red dot · 紅點'),
    vis: lab.add('ey-lb ey-lb-v', 'Vision area · 視覺區'), pic: lab.add('ey-lb ey-lb-v', 'Right side up · 大腦轉正'),
    reye: lab.add('ey-lb', 'Right eye, real size · 右眼（實際大小）'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  let objLabel = '';
  const occl = V(0, 0, 0);
  function hiddenByEye(p) {                        // 從鏡頭看過去，p 是不是在放大的眼球後面
    const c = camera.position, d = p.clone().sub(c), L2 = d.lengthSq();
    const t = MathUtils.clamp(occl.copy(E).sub(c).dot(d) / L2, 0, 1);
    return t < 0.98 && occl.copy(c).addScaledVector(d, t).distanceTo(E) < R_SCL * S;
  }
  function updateLabels(o, ls) {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const near = camera.position.distanceTo(E) < 0.42;   // 拉近時才標虹膜、睫狀肌
    const sharp = o.blur < 0.12, s = o.vret / o.ob.u;
    show(Lb.cornea, true, W(V(0, 7.6, 12.9)), -6);
    show(Lb.iris, near, W(V(0, -6.9, LS.zi + 0.3)), 10);
    show(Lb.pupil, !state.blind, W(V(0, state.rp + 1.0, LS.zi + 4.2)), -4);
    show(Lb.lens, true, W(V(0, -ls.a - 2.6, Z_L - 1.6)), 12);
    show(Lb.cil, near, W(V(0, 9.6, 8.4)), -12);
    show(Lb.retina, true, W(V(0, 10.2, deformZ(-5, state.sz))), -6);
    show(Lb.disc, !!P.disc && (state.blind || sharp), W(P.disc), state.blind ? -18 : 18);   // 模糊時讓位給「焦點」
    show(Lb.nerve, !!P.optic, P.optic ? P.optic.getPointAt(0.16) : V(0, 0, 0), 14);
    show(Lb.focus, state.rays && !sharp && P.focus.length > 0, W(P.focus[0] || V(0, 0, 0)), -14);
    show(Lb.img, state.rays && sharp && !state.blind, W(V(0, 0.42 * o.ob.h * s + 1.8, Z_L - o.vret + 2.5)), -8);
    const ob = OBJ[state.obj], ol = `${ob.en} · ${ob.zh}`;
    if (ol !== objLabel) { Lb.obj.textContent = ol; objLabel = ol; }
    show(Lb.obj, true, W(V(0, 0.55 * ob.h + 2.5, Z_L + ob.u)));
    show(Lb.glasses, state.glasses, W(V(0, 9.2, GLASSES_Z)));
    show(Lb.dot, state.blind, W(dotObj.position.clone().add(V(0, 3, 0))));
    const sk = state.skullOn !== false;
    show(Lb.vis, sk && !!P.occ, P.occ ? P.occ.clone().add(V(0, 0.03, -0.012)) : V(0, 0, 0), -8);
    show(Lb.pic, sk && !!picSprite, picSprite ? picSprite.position.clone().add(V(0, 0.036, 0)) : V(0, 0, 0));
    show(Lb.reye, sk && !!rightEye && !hiddenByEye(rightEye.position), rightEye ? rightEye.position.clone().add(V(0, -0.024, 0.01)) : V(0, 0, 0));
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
    if (autoLabels) { state.labels = w >= 520; if (tgL) tgL.checked = state.labels; }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  let pulseT = 0;
  function step(dt) {
    if (!state.ready) return;
    // 瞳孔跟著光線（約 0.3 秒）、水晶體自動對焦、眼球長度
    const rpT = 4.0 - 3.0 * state.light;
    state.rp += (rpT - state.rp) * Math.min(1, dt * 3.5);
    if (state.auto) {
      state.acc += (tgtAcc() - state.acc) * Math.min(1, dt * 4);
      const v = Math.round((state.acc / ACC_MAX) * 100);
      if (+R.lens.value !== v) { R.lens.value = v; sliderFill(R.lens); }
    }
    if (Math.abs(state.szT - state.sz) > 1e-4) {
      state.sz += (state.szT - state.sz) * Math.min(1, dt * 4);
      if (Math.abs(state.szT - state.sz) < 1e-4) state.sz = state.szT;
      applyStretch(state.sz);
    }
    const gT = state.glasses ? 1 : 0;
    state.gl += (gT - state.gl) * Math.min(1, dt * 6);
    glasses.visible = state.gl > 0.02 && glassKind != null;
    glasses.position.y = (1 - state.gl) * 10;
    M.glass.opacity = 0.4 * state.gl;

    const ls = buildEyeFront(state.acc / ACC_MAX, state.rp);
    const o = optics();
    drawRays(o);
    const sharp = o.blur < 0.12;
    focusDots.forEach((f, i) => { f.visible = state.rays && !state.blind && !!P.focus[i]; if (f.visible) f.position.copy(P.focus[i]).setX(RAY_X + 0.3); });
    // 視網膜上的倒立小像：越清楚越明顯
    for (const [k, im] of Object.entries(imgs)) {
      const vis = k === state.obj && !state.blind;
      im.visible = vis;
      if (!vis) continue;
      const s = o.vret / OBJ[k].u, op = MathUtils.clamp(1 - o.blur / 0.9, 0.12, 1);
      im.scale.set(s, s, s * 0.25);                // 壓扁，貼在視網膜前面
      im.position.set(-0.3, 0, Z_L - o.vret + 0.9);
      im.traverse((n) => { if (n.isMesh) n.material.opacity = op; });
    }
    dotObj.visible = state.blind;
    M.disc.emissive.setHex(state.blind ? 0x6b5a10 : 0x000000);
    M.disc.emissiveIntensity = state.blind ? 0.6 + 0.4 * Math.sin(performance.now() / 180) : 1;
    // 光線亮暗
    const lt = state.light;
    hemi.intensity = 0.55 + 0.75 * lt; key.intensity = 0.9 + 1.4 * lt;
    scene.background.copy(BG_DIM).lerp(BG_BRIGHT, lt);
    for (const m of [M.rayTop, M.rayBot]) m.opacity = 0.55 + 0.4 * lt;
    // 視神經上的訊號
    const sk = state.skullOn !== false;
    pulseT += dt;
    pulses.forEach((p, i) => {
      const f = ((pulseT / 1.6 + i / 3) % 1);
      p.visible = sk && !!P.optic;
      if (p.visible) P.optic.getPointAt(f, p.position);
    });
    if (visArea) visArea.material.emissiveIntensity = 0.35 + 0.35 * (sharp ? 1 : 0.3) * (0.6 + 0.4 * Math.sin(pulseT * 4));
    draw2D(o);
    setStatus(o);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return { o, ls };
  }
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const r = step(dt);
    controls.update();
    if (r) updateLabels(r.o, r.ls);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-eyes-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, setObj, setEye, setGlasses, setBlind,
    setLight: (v) => { state.light = v; R.light.value = Math.round(v * 100); sliderFill(R.light); },
    run: (sec) => { for (let t = 0; t < sec; t += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { const r = step(0); controls.update(); if (r) updateLabels(r.o, r.ls); renderer.render(scene, camera); },
  };
  lab3d = { blind: (on) => { if (state.ready) setBlind(on); } };
  return {
    ready: () => state.ready,
    test: () => card && card.scrollTo(),
    blind: () => setBlind(true),
  };
}

lazyBoot('[data-eyes-lab]', initLab, { test: (lab) => lab.test(), blind: (lab) => lab.blind() });
