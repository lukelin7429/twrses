/*
 * 書法 · 第六課「隸書：為什麼是蠶頭燕尾？」的 3D 模型（寫字引擎示範，全部自繪示意，不照實物比例）。
 *
 * 三個看法（data-mode），鏡頭飛過去：
 *   heng   一筆長橫：毛筆在宣紙上寫隸書的「一」。起筆逆鋒回鋒（蠶頭）→ 行筆 → 收筆頓筆、往右上挑出（燕尾／雁尾）。
 *          三段可以分開用 ¼× 重播（data-part），旁邊畫力道曲線（三段分色）；寫完紙上標出「蠶頭」「燕尾」。
 *   change 隸變：紙上先淡淡畫出小篆（藍灰色，paper.setUnder），毛筆在同一個字框裡寫隸書——看得出圓轉變方折、字形由長變扁。
 *          讀數：兩種字體在我們畫的字框裡「高 ÷ 寬」各是多少。
 *   slips  竹簡：一卷用兩道繩子編起來的竹簡攤開（可以捲起來、再攤開），小毛筆在中間那一片由上往下寫三個隸書字。
 *          其他竹片上已經寫好字。毛筆是另一枝縮小的（放在縮小的群組裡，placeBrush 用群組的區域座標）。
 * 六個字（一三土山人水）用 data-char 換（heng 固定寫「一」）；每個字正好一個燕尾（strokes/clerical.json 的 tail）。
 * 2D（不需要 WebGL）：隸變前後（cler2d.js 的 initWipe）、找燕尾（initTail）、練字板描紅隸書（pad.js）。
 *
 * 座標同 brush3d.js：+X 往右、+Y 往上、+Z 朝向觀眾；1 單位約 10 公分（竹簡與字都放大了）。
 * 產物：cd tools/callig && npm run build → assets/js/cal-clerical.js
 * 除錯：document.querySelector('[data-calclerical-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, Color, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh,
  MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Scene, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp, forceCurve, prepStroke } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { bbox, initTail, initWipe } from './cler2d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { drawForce, drawStamps, rng } from './ink2d.js';
import { initPad } from './pad.js';
import { CLERICAL, CLERICAL_KEYS, clericalStamps, drawSeal, glyphFor } from './scripts2d.js';
import YI from './strokes/yi.json';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const CH = CLERICAL.chars;
const PADCHARS = Object.fromEntries(CLERICAL_KEYS.map((k) => [k, CH[k]]));
// 一筆長橫：隸書的「一」往上挪，下面留位置給楷書的「一」（比較用）
const shift = (st, dy) => ({ ...st, pts: st.pts.map(([x, y, p, v]) => [x, y + dy, p, v]) });
const YI_C = shift(CH.yi.strokes[0], -120), YI_R = shift(YI.strokes[0], 210);

const PAPER = { x: 1.3, z: 0.45, w: 3.6, h: 3.1, box: 2.7, bc: [1.3, 0.5] };
// 竹簡：N 片，攤開時由左到右排；長軸沿 z
const SLIP = { n: 13, w: 0.26, gap: 0.02, len: 3.0, t: 0.03, cx: -3.0, cz: 0.3, ppu: 480, box: 0.22, active: 6 };
const PITCH = SLIP.w + SLIP.gap;
const SLOTS = [-0.92, -0.5, -0.08, 0.34, 0.76];   // 一片竹簡上五個字的位置（z，相對於竹片中心）
const CORDS = [-1.22, 1.08];                       // 兩道編繩
const SCALE = 0.32;                                // 小毛筆縮小的倍率

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

  makeDesk(scene, { w: 10.6, d: 6.2, felt: [PAPER.x, PAPER.z, 4.2, 3.7], weight: [PAPER.x, PAPER.z - PAPER.h / 2 + 0.16, 2.8], stone: null });
  const paper = makePaper({ w: PAPER.w, h: PAPER.h, x: PAPER.x, y: 0.016, z: PAPER.z, box: PAPER.box, boxCenter: PAPER.bc, grid: true });
  paper.mesh.receiveShadow = true; scene.add(paper.mesh);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group); brush.setInk(1);

  // -------------------------------------------------------------------
  // 竹簡
  // -------------------------------------------------------------------
  const slipX0 = SLIP.cx - ((SLIP.n - 1) / 2) * PITCH;       // 最左邊那一片的中心
  const slipY = SLIP.t / 2 + 0.012;
  const bambooSide = new MeshStandardMaterial({ color: 0xb99d5f, roughness: 0.7 });
  const cordMat = new MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.9 });
  const slips = [];
  const slipT = (slot) => ({ k: (SLIP.box * SLIP.ppu) / 1000, ox: ((SLIP.w - SLIP.box) / 2) * SLIP.ppu, oy: (SLOTS[slot] - SLIP.box / 2 + SLIP.len / 2) * SLIP.ppu });
  function slipBase(g, W, H, seed) {
    g.fillStyle = '#d8c38c'; g.fillRect(0, 0, W, H);
    const r = rng(seed);
    for (let i = 0; i < 90; i++) {   // 直的竹纖維
      g.strokeStyle = r() < 0.5 ? `rgba(120,95,45,${0.06 + r() * 0.12})` : `rgba(255,248,220,${0.08 + r() * 0.14})`;
      g.lineWidth = 0.6 + r() * 1.6; const x = r() * W;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x + (r() - 0.5) * 6, H); g.stroke();
    }
    for (const y of [H * 0.3, H * 0.72]) {   // 竹節
      g.fillStyle = 'rgba(110,85,40,.28)'; g.fillRect(0, y + (r() - 0.5) * 30, W, 5);
    }
  }
  for (let i = 0; i < SLIP.n; i++) {
    const c = document.createElement('canvas'); c.width = Math.round(SLIP.w * SLIP.ppu); c.height = Math.round(SLIP.len * SLIP.ppu);
    const g = c.getContext('2d');
    const tex = new CanvasTexture(c); tex.colorSpace = SRGBColorSpace; tex.anisotropy = 4;
    const top = new MeshStandardMaterial({ map: tex, roughness: 0.72 });
    const mesh = new Mesh(new BoxGeometry(SLIP.w, SLIP.t, SLIP.len), [bambooSide, bambooSide, top, bambooSide, bambooSide, bambooSide]);
    mesh.castShadow = true; mesh.receiveShadow = true;
    const grp = new Group(); grp.add(mesh);
    for (const z of CORDS) {   // 編繩：每一片上面一小段，攤開時連成兩道
      const cord = new Mesh(new BoxGeometry(PITCH + 0.004, 0.01, 0.03), cordMat);
      cord.position.set(0, SLIP.t / 2 + 0.004, z); grp.add(cord);
    }
    scene.add(grp);
    slips.push({ c, g, tex, grp, seed: 30 + i });
  }
  function drawSlip(i, upTo = null) {
    const s = slips[i];
    slipBase(s.g, s.c.width, s.c.height, s.seed);
    if (i !== SLIP.active) {   // 其他竹片：已經寫好的字（每片五個，照固定的亂數排）
      const r = rng(100 + i);
      SLOTS.forEach((_, slot) => {
        const k = CLERICAL_KEYS[Math.floor(r() * CLERICAL_KEYS.length)];
        for (const sts of clericalStamps(k)) drawStamps(s.g, sts, slipT(slot), { color: '#1c1813' });
      });
    } else if (upTo) upTo();
    s.tex.needsUpdate = true;
  }
  /**
   * 捲起來：u＝0 攤平、u＝1 整卷捲好。從最左邊開始捲，捲好的那一捆往右滾、把攤平的部分吃進去。
   * 捲進去的部分是一條螺旋：最裡面半徑 R0，每繞一圈半徑多 TH；離切點（捆的最下面）走了 a 的地方，
   * 角度 φ(a)＝(Rout − √(Rout² − 2·c·a)) / c（c＝TH/2π），位置＝圓心＋r·(−sin φ, −cos φ)，竹片轉 −φ（字朝裡面）。
   */
  const R0 = 0.24, TH = 0.1, CC = TH / (Math.PI * 2);
  function layoutSlips(u) {
    const total = SLIP.n * PITCH, len = u * total;              // 捲進去多長
    const Rout = Math.sqrt(R0 * R0 + 2 * CC * len);
    const shift = -len / 2;                                     // 整卷往左挪一半，捲好的那一捆剛好停在中間
    const xc = slipX0 - PITCH / 2 + len + shift;                // 切點（捆的最下面）
    slips.forEach((s, i) => {
      const d = (i + 0.5) * PITCH, a = len - d;                 // 這一片的中心離切點多遠（> 0＝已經捲進去）
      if (a <= 0) { s.grp.position.set(slipX0 + i * PITCH + shift, slipY, SLIP.cz); s.grp.rotation.z = 0; return; }
      const phi = (Rout - Math.sqrt(Math.max(0, Rout * Rout - 2 * CC * a))) / CC, r = Rout - CC * phi;
      s.grp.position.set(xc - r * Math.sin(phi), slipY + Rout - r * Math.cos(phi), SLIP.cz);
      s.grp.rotation.z = -phi;
    });
  }
  for (let i = 0; i < SLIP.n; i++) drawSlip(i);
  // 小毛筆：放在縮小的群組裡；給 placeBrush 的「紙」回傳群組的區域座標
  const holder = new Group(); holder.scale.setScalar(SCALE); scene.add(holder);
  const small = makeBrush({ hair: 'weasel' });
  small.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  holder.add(small.group); small.setInk(1);
  const activeX = slipX0 + SLIP.active * PITCH;
  function slipSurface(slot) {
    const s = slips[SLIP.active], T = slipT(slot), top = slipY + SLIP.t / 2 + 0.001;
    return {
      T, y: top / SCALE, box: SLIP.box,
      world: (bx, by, out = new Vector3()) => out.set((activeX + (bx / 1000 - 0.5) * SLIP.box) / SCALE, top / SCALE, (SLIP.cz + SLOTS[slot] + (by / 1000 - 0.5) * SLIP.box) / SCALE),
      stampMany(sts, i0, i1) { if (i1 > i0) { drawStamps(s.g, sts, T, { i0, i1, soft: 0.6 }); s.tex.needsUpdate = true; } },
    };
  }

  // -------------------------------------------------------------------
  // 標籤、狀態
  // -------------------------------------------------------------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    head: lab.add('cg-lb cg-lb-k', 'Silkworm head<small>蠶頭</small>'),
    tail: lab.add('cg-lb cg-lb-k', 'Swallow tail<small>燕尾（雁尾）</small>'),
    reg: lab.add('cg-lb cg-lb-seal', 'Regular script: no flick at the end<small>楷書：收筆不往上挑</small>'),
    seal: lab.add('cg-lb cg-lb-seal', 'Seal script (before)<small>小篆（之前）</small>'),
    cler: lab.add('cg-lb cg-lb-k', 'Clerical script (after)<small>隸書（之後）</small>'),
    cord: lab.add('cg-lb cg-lb-k', 'Cord<small>編繩</small>'),
    slip: lab.add('cg-lb cg-lb-k', 'Bamboo slip<small>竹簡</small>'),
  };
  const modes = Object.fromEntries(JSON.parse(root.getAttribute('data-modes') || '[]').map((m) => [m.key, m]));
  const parts = JSON.parse(root.getAttribute('data-parts') || '[]');
  const R = {
    play: $('.al-play'), part: $('.cg-part-out'), press: $('.cg-press-out'), force: $('.cg-force'), partT: $('.cg-part-t'),
    ratio: $('.cg-ratio-out'), charOut: $('.cg-char-out'), strokeOut: $('.cg-stroke-out'), slipOut: $('.cg-slip-out'),
  };
  const state = { mode: 'heng', char: 'san', playing: true, labels: true, speed: 1, t: 0, cam: 'near', part: 'all', t1: Infinity, roll: 0, rollTo: 0, cmp: false };

  // 「一」的三段：蠶頭、行筆、燕尾（時間與走了幾成）
  const yiS = prepStroke(YI_C);
  const yiCurve = forceCurve(yiS, 140);
  const yiLen = yiS[yiS.length - 1].s, yiDur = yiS[yiS.length - 1].t;
  const b1 = yiS.find((q) => q.phase >= 1), b2 = yiS.find((q) => q.phase >= 2);
  const PT = [0, b1.t, b2.t, yiDur], PF = [b1.s / yiLen, b2.s / yiLen];
  const SEQ0 = 0.6;
  let writer = null;              // 宣紙上的寫字員（heng、change）
  let slipW = [];                 // 竹簡上三個字的寫字員
  let slipSeq = [];               // 竹簡的時間軸：[{ w, surf, t0, t1 }]
  const GAP = 0.9, UNROLL = 1.6;

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const bc = PAPER.bc;
  const HOMES = {
    heng: { near: () => ({ t: V(bc[0], 0.15, bc[1] + 0.05), d: V(-0.2, 0.74, 0.66), w: 3.3, h: 2.3 }), top: () => ({ t: V(bc[0], 0, bc[1]), d: V(0, 1, 0.02), w: 3.1, h: 2.4 }) },
    change: { near: () => ({ t: V(bc[0], 0.15, bc[1] + 0.05), d: V(-0.2, 0.8, 0.6), w: 3.2, h: 3.0 }), top: () => ({ t: V(bc[0], 0, bc[1]), d: V(0, 1, 0.02), w: 3.0, h: 3.0 }) },
    slips: { near: () => ({ t: V(SLIP.cx, 0.2, SLIP.cz + 0.05), d: V(0.12, 0.9, 0.56), w: 4.2, h: 3.5 }), top: () => ({ t: V(SLIP.cx, 0, SLIP.cz), d: V(0, 1, 0.02), w: 4.0, h: 3.3 }) },
    wide: () => ({ t: V(-0.4, 0.3, 0.3), d: V(0, 0.8, 0.75), w: 9.8, h: 4.6 }),
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    if (state.cam === 'tip' && state.mode !== 'slips') { controls.enabled = false; fly.t = 1; return; }
    controls.enabled = true;
    const H = state.cam === 'wide' ? HOMES.wide() : HOMES[state.mode][state.cam === 'top' ? 'top' : 'near']();
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
  function setCam(v) { state.cam = v; press('[data-cam]', 'data-cam', v); goHome(false); }

  function ratioText() {
    if (!R.ratio) return;
    const a = bbox(glyphFor(state.char, 'seal')), b = bbox(glyphFor(state.char, 'clerical'));
    R.ratio.innerHTML = a.h < 60 || b.h < 60 ? 'One line<small>只有一條橫線</small>' : `${(a.h / a.w).toFixed(1)} → ${(b.h / b.w).toFixed(1)}<small>小篆 → 隸書（高 ÷ 寬）</small>`;
  }
  /** 換模式或換字：從頭開始。opts.part：heng 只播哪一段（0 蠶頭、1 行筆、2 燕尾） */
  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    if (opts.char) state.char = opts.char;
    state.t = 0; state.part = 'all'; state.t1 = Infinity; state.speed = state.speed || 1;
    if (state.mode === 'heng') {
      paper.setGrid(true); paper.setUnder(null); paper.clearInk();
      state.cmp = opts.part === 'cmp';
      writer = makeWriter(paper, { strokes: state.cmp ? [YI_C, YI_R] : [YI_C] });
      if (state.cmp) state.part = 'cmp';
      else if (opts.part != null && opts.part !== 'all') {
        const p = Number(opts.part);
        state.part = p; writer.drawTo(PT[p]); state.t = SEQ0 + PT[p]; state.t1 = SEQ0 + PT[p + 1]; setSpeed(0.25);
      }
    } else if (state.mode === 'change') {
      paper.setGrid(true); paper.clearInk();
      const key = state.char;
      paper.setUnder((g, T, W, H) => {   // 先不透明畫在暫存畫布，再整張淡淡貼上（線段重疊的地方才不會一顆一顆變深）
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        drawSeal(c.getContext('2d'), key, T, { color: '#3d5a80' });
        g.save(); g.globalAlpha = 0.4; g.drawImage(c, 0, 0); g.restore();
      });
      writer = makeWriter(paper, CH[state.char]);
      ratioText();
    } else {
      // 竹簡：從捲著的開始攤開，再寫三個字（選的字＋後面兩個）
      const i0 = CLERICAL_KEYS.indexOf(state.char);
      const keys = [0, 1, 2].map((d) => CLERICAL_KEYS[(i0 + d) % CLERICAL_KEYS.length]);
      drawSlip(SLIP.active);
      let t = UNROLL + 0.5;
      slipSeq = keys.map((k, slot) => {
        const surf = slipSurface(slot), w = makeWriter(surf, CH[k]);
        const seg = { k, w, surf, t0: t, t1: t + w.duration }; t = seg.t1 + GAP; return seg;
      });
      slipW = slipSeq;
      state.roll = opts.keepFlat ? 0 : 1; state.rollTo = 0;
      if (opts.keepFlat) state.t = UNROLL;
    }
    root.dataset.mode = state.mode;
    press('[data-mode]', 'data-mode', state.mode);
    press('[data-char]', 'data-char', state.char);
    press('[data-part]', 'data-part', state.mode === 'heng' ? state.part : '');
    $$('.cg-panel[data-panel]').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== state.mode; });
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => start({ mode: b.getAttribute('data-mode') })));
  $$('[data-char]').forEach((b) => b.addEventListener('click', () => start({ char: b.getAttribute('data-char'), mode: state.mode === 'heng' ? 'change' : state.mode, fly: state.mode === 'heng' })));
  $$('[data-part]').forEach((b) => b.addEventListener('click', () => { const v = b.getAttribute('data-part'); if (v === 'all' || v === 'cmp') setSpeed(1); start({ mode: 'heng', part: v, fly: state.mode !== 'heng' }); }));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('[data-roll]').forEach((b) => b.addEventListener('click', () => {
    if (b.getAttribute('data-roll') === '1') { state.rollTo = 1; setPlaying(true); } else start({ mode: 'slips', fly: false });
  }));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => { setSpeed(1); start({ fly: false, keepFlat: true }); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  // -------------------------------------------------------------------
  // 每格
  // -------------------------------------------------------------------
  const tmp = V(0, 0, 0);
  let lastPose = null;
  function stepPaper() {
    const s = state.t;
    if (s < SEQ0) { const p0 = writer.poseAt(0); placeBrush(brush, paper, p0, (1 - s / SEQ0) * 0.4); return p0; }
    const tw = s - SEQ0;
    const pose = writer.poseAt(Math.min(tw, writer.duration));
    const lift = tw > writer.duration ? ease((tw - writer.duration) / 0.7) * 0.45 : 0;
    placeBrush(brush, paper, tw > writer.duration ? { ...pose, p: 0 } : pose, lift + pose.hover * 0.3);
    writer.drawTo(tw);
    if (tw > writer.duration + 2) state.t = SEQ0 + writer.duration + 2;
    return pose;
  }
  function stepSlips(dt) {
    // 捲、攤
    const target = state.rollTo;
    if (state.roll !== target) state.roll += Math.sign(target - state.roll) * Math.min(Math.abs(target - state.roll), dt / UNROLL * (state.playing ? state.speed : 0));
    layoutSlips(ease(state.roll));
    const flat = state.roll < 0.001;
    small.group.visible = flat || state.rollTo === 0;
    const t = state.t;
    let seg = slipSeq.find((g) => t < g.t1) || slipSeq[slipSeq.length - 1];
    const k = slipSeq.indexOf(seg);
    for (let j = 0; j <= k; j++) slipSeq[j].w.drawTo(flat ? t - slipSeq[j].t0 : -1);
    let pose;
    if (t < seg.t0) {   // 還沒輪到這個字：從上一個字的終點（或上方）移過來
      const p1 = seg.w.poseAt(0);
      const prev = k > 0 ? slipSeq[k - 1] : null;
      const u = prev ? clamp((t - prev.t1) / GAP) : clamp((t - UNROLL) / 0.5);
      placeBrush(small, seg.surf, p1, 0.5 * (1 - ease(u)) + 0.08);
      pose = p1;
    } else {
      pose = seg.w.poseAt(Math.min(t - seg.t0, seg.w.duration));
      const over = t - seg.t1;
      placeBrush(small, seg.surf, over > 0 ? { ...pose, p: 0 } : pose, over > 0 ? ease(over / 0.6) * 0.5 : pose.hover * 0.3);
    }
    const end = slipSeq[slipSeq.length - 1].t1;
    if (state.rollTo === 1) small.group.visible = false;
    else if (t > end + 2) state.t = end + 2;
    if (R.slipOut) {
      const done = slipSeq.filter((g) => t >= g.t1).length;
      R.slipOut.innerHTML = state.rollTo === 1 ? 'Rolled up<small>捲起來了</small>' : !flat ? 'Unrolling<small>攤開中</small>' : `${Math.min(3, done + (t >= seg.t0 && t < seg.t1 ? 1 : 0))} / 3 · ${CH[seg.k].char}<small>由上往下寫</small>`;
    }
    return pose;
  }
  function labels(pose) {
    const on = state.labels && state.cam !== 'wide';
    const tw = state.t - SEQ0;
    for (const k of Object.keys(L)) L[k].hidden = true;
    if (!on) return;
    if (state.mode === 'heng') {
      if (tw > PT[1] * 0.9) { L.head.hidden = false; lab.place(L.head, paper.world(150, 190)); }
      if (tw > PT[3] * 0.98) { L.tail.hidden = false; lab.place(L.tail, paper.world(850, 170)); }
      if (state.cmp && tw > writer.duration - 0.2) { L.reg.hidden = false; lab.place(L.reg, paper.world(500, 860)); }
    } else if (state.mode === 'change') {
      if (state.cam !== 'tip') {
        L.seal.hidden = false; lab.place(L.seal, paper.world(170, 40));
        if (tw > writer.duration * 0.5) { L.cler.hidden = false; lab.place(L.cler, paper.world(830, 880)); }
      }
    } else if (state.roll < 0.05) {
      L.cord.hidden = false; lab.place(L.cord, tmp.set(slipX0 - 0.1, slipY + 0.25, SLIP.cz + CORDS[0]));
      L.slip.hidden = false; lab.place(L.slip, tmp.set(slipX0 + (SLIP.n - 1) * PITCH, slipY + 0.2, SLIP.cz + 0.55));
    }
    void pose;
  }
  let lastForce = -1;
  function readout(pose) {
    const tw = state.t - SEQ0;
    if (state.mode === 'heng') {
      const f = clamp(tw / yiDur) >= 1 ? 1 : (pose && pose.f) || 0;
      const ph = tw < 0 ? -1 : tw >= yiDur ? 3 : tw < PT[1] ? 0 : tw < PT[2] ? 1 : 2;
      if (R.part) R.part.innerHTML = ph < 0 ? '—' : ph > 2 ? (state.cmp && tw < writer.duration ? 'Regular script<small>楷書的橫</small>' : 'Done<small>寫完了</small>') : `${parts[ph].en}<small>${parts[ph].zh}</small>`;
      if (R.press) R.press.textContent = tw < 0 || tw >= yiDur ? '—' : `${Math.round(((pose && pose.p) || 0) * 100)}%`;
      if (R.partT && ph >= 0 && ph <= 2 && R.partT.dataset.k !== String(ph)) { R.partT.dataset.k = String(ph); R.partT.innerHTML = `${parts[ph].text_en}<span class="zh">${parts[ph].text_zh}</span>`; }
      if (R.force && Math.abs(f - lastForce) > 0.002) {
        lastForce = f;
        const c = R.force, w = c.clientWidth || 300, h = c.clientHeight || 110, dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
        const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawForce(g, w, h, yiCurve, { at: tw < 0 ? 0 : f, bounds: PF, labels: ['蠶頭', '行筆', '燕尾'] });
      }
    } else if (state.mode === 'change') {
      const c = CH[state.char];
      if (R.charOut) R.charOut.innerHTML = `${c.char} · ${c.en}<small>${c.count} strokes · ${c.count} 畫</small>`;
      if (R.strokeOut) {
        const n = pose ? Math.min(c.count, (pose.n || 0) + 1) : 0, st = c.strokes[Math.max(0, n - 1)];
        R.strokeOut.innerHTML = tw < 0 ? '—' : tw > writer.duration ? 'Done<small>寫完了</small>' : `${n} / ${c.count} · ${st.en}${st.tail ? ' · tail' : ''}<small>第 ${n} 筆・${st.zh}${st.tail ? '（有燕尾）' : ''}</small>`;
      }
    }
  }
  function step(dt) {
    const run = state.playing ? dt : 0;
    state.t += run * state.speed;
    if (state.mode === 'heng' && state.t >= state.t1) { state.t = state.t1; if (state.playing) setPlaying(false); }
    let pose;
    if (state.mode === 'slips') {
      pose = stepSlips(dt);
      brush.group.quaternion.identity(); brush.group.position.set(PAPER.x + PAPER.w / 2 - 0.25, 0.75, PAPER.z - PAPER.h / 2 + 0.35); brush.setPose({ d: 0, dir: [1, 0], fan: 0, tilt: 0 });
    } else {
      pose = stepPaper();
      layoutSlips(ease(state.roll));
      small.group.visible = false;
    }
    lastPose = pose || lastPose;
    if (state.cam === 'tip' && state.mode !== 'slips') {
      const c = brush.tipWorld(V(0, 0, 0));
      const want = c.clone().add(V(-0.62, 0.36, 0.82)), look = c.clone().add(V(0.12, 0.1, 0));
      const k = 1 - Math.exp(-dt * 5);
      camera.position.lerp(want, k || 1); controls.target.lerp(look, k || 1);
      camera.lookAt(controls.target);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    labels(lastPose);
    return lastPose;
  }

  let raf = 0, last = 0, visible = false, lastRead = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const pose = step(dt);
    if (controls.enabled) controls.update();
    if (t - lastRead > 90) { lastRead = t; readout(pose); }
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

  setSpeed(1); layoutSlips(0);
  start({ mode: 'heng', instant: true });
  resize();
  readout(step(0.01));
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    ...Object.fromEntries(CLERICAL_KEYS.map((k) => [k, () => { setSpeed(1); start({ mode: 'change', char: k }); }])),
    heng: () => { setSpeed(1); start({ mode: 'heng' }); }, change: () => start({ mode: 'change' }), slips: () => start({ mode: 'slips' }),
    head: () => start({ mode: 'heng', part: 0 }), tail: () => start({ mode: 'heng', part: 2 }), cmp: () => { setSpeed(1); start({ mode: 'heng', part: 'cmp' }); },
  };
  root.__lab = {
    camera, controls, state, scene, setSpeed, setPlaying, setCam, start, PT, PF, slips,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { const p = step(0); if (controls.enabled) controls.update(); lastForce = -1; readout(p); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const wp = document.querySelector('[data-cal-wipe]');
  if (wp) initWipe(wp);
  const tl = document.querySelector('[data-cal-tail]');
  if (tl) initTail(tl);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, PADCHARS.yi, PADCHARS);
  // 卡片的小圖：隸書的字，燕尾那一筆塗成朱紅色
  document.querySelectorAll('canvas[data-cg-cler]').forEach((c) => {
    const k = c.getAttribute('data-cg-cler'), S = 180;
    c.width = S; c.height = S;
    const g = c.getContext('2d');
    g.fillStyle = '#f6f0e1'; g.fillRect(0, 0, S, S);
    const T = { k: (S * 0.9) / 1000, ox: S * 0.05, oy: S * 0.05 };
    clericalStamps(k).forEach((sts, i) => drawStamps(g, sts, T, { color: i === CH[k].tail ? '#c4321f' : '#151311' }));
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calclerical-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
