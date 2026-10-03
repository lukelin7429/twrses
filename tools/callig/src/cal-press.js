/*
 * 書法 · 第二課「一枝毛筆怎麼寫出粗細？」的 3D 模型（寫字引擎示範，全部自繪示意）。
 *
 * 一個機制：筆鋒是軟的。往下按，筆毛散開線就粗；往上提，筆毛收攏線就細。提與按的節奏就是書法的美。
 * 三個看法（data-mode）：
 *   press  提按：毛筆以固定速度一行一行往右寫，壓多重由你決定——拉滑桿（你的手），或選「一樣重／一按一提／輕重輕」。
 *          線寬照 brush.js 的 footprint 算（字框 1000＝26 公分 → 1 單位＝0.26 公釐）。四行寫滿就清掉重來。
 *   tip    中鋒與側鋒：同一條線寫兩種。中鋒筆桿直立、筆尖拖在線的中間；側鋒筆桿斜 24°、筆尖貼著上緣走
 *          （tipTrail 的 side＝π/2），墨用 bristles 一根根畫，筆肚那一緣乾出飛白。
 *   shi    寫「十」：起筆、行筆、收筆可以分段 ¼× 重播（先把之前的墨補畫好，再播那一段，播完暫停）；
 *          橫是藏鋒起筆、回鋒收筆，豎是藏鋒起筆、懸針收筆（一路提到筆尖離紙）。旁邊畫那一筆的力道曲線。
 * 鏡頭（data-cam）：side 斜前方低角度、top 正上方、tip 跟著筆尖。
 * 2D（不需要 WebGL）：頁面下方練字板寫「十」，寫完一筆就和示範比提按曲線（pad.js）。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/callig && npm run build → assets/js/cal-press.js
 * 除錯：document.querySelector('[data-calpress-lab]').__lab
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PCFShadowMap, PerspectiveCamera, Scene,
  Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { bristles, clamp, footprint, forceCurve, smoothTo } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { drawForce } from './ink2d.js';
import { initPad } from './pad.js';
import SHI from './strokes/shi.json';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const PAPER = { x: 0, z: 0.35, w: 3.2, h: 3.8, box: 2.6, bc: [0, 0.45] };
const MM = 0.26;                                   // 字框 1 單位＝0.26 公釐（1000 單位＝26 公分）
// 提按：四行
const ROWS = [250, 430, 610, 790], X0 = 140, X1 = 860, VX = 210, STEP = 2.5;
const PATTERNS = {
  steady: () => 0.5,
  wave: (f) => 0.18 + 0.62 * (0.5 - 0.5 * Math.cos(2 * Math.PI * f * 3)),
  swell: (f) => 0.1 + 0.78 * Math.sin(Math.PI * f) ** 1.4,
};
// 中鋒與側鋒：同一條線
const lineChar = (y) => ({ char: '一', key: 'line', strokes: [{ n: 1, en: 'Line', zh: '線', phases: [1, 3],
  pts: [[190, y + 3, 0.03, 160], [235, y, 0.5, 220], [500, y - 4, 0.52, 270], [770, y - 8, 0.5, 220], [815, y - 8, 0.04, 160]] }] });
const TIP_Y = { center: 330, side: 640 };
const TILT = 0.42;                                  // 側鋒：筆桿斜約 24°

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
  Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 4, bottom: -4, near: 1, far: 25 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  makeDesk(scene, { w: 9, d: 6, felt: [PAPER.x, PAPER.z, 4.0, 4.6], weight: [PAPER.x, PAPER.z - PAPER.h / 2 + 0.18, 2.7], stone: [3.1, -0.5] });
  const paper = makePaper({ w: PAPER.w, h: PAPER.h, x: PAPER.x, y: 0.016, z: PAPER.z, box: PAPER.box, boxCenter: PAPER.bc, grid: false });
  paper.mesh.receiveShadow = true;
  scene.add(paper.mesh);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group);
  brush.setInk(1);

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const L = (cls, en, zh) => lab.add(`cg-lb ${cls}`, `${en}<small>${zh}</small>`);
  const labs = {
    state: L('cg-lb-ph', '', ''), width: L('cg-lb-k', '', ''),
    center: L('cg-lb-k', 'Center tip: round and full', '中鋒：圓潤飽滿'), side: L('cg-lb-k', 'Side tip: flat, one sharp edge', '側鋒：扁平，一邊齊一邊毛'),
    tip: L('', 'Tip', '筆尖'), phase: L('cg-lb-ph', '', ''),
  };
  Object.values(labs).forEach((el) => { el.hidden = true; });

  // =====================================================================
  // 狀態
  // =====================================================================
  const phaseTxt = JSON.parse(root.getAttribute('data-phases') || '[[],[]]');
  const R = {
    play: $('.al-play'), pOut: $('.cg-p-out'), wOut: $('.cg-w-out'), spread: $('.cg-spread i'), hand: $('.cg-hand'),
    force: $('.cg-force'), phK: $('.cg-phase-k'), phT: $('.cg-phase-t'), press: $('.cg-press-out'),
    tipHandle: $('.cg-tip-handle'), tipWhere: $('.cg-tip-where'),
  };
  const state = {
    mode: 'press', playing: true, labels: true, cam: 'side', speed: 1,
    // 提按
    pattern: 'swell', hand: 0.5, p: 0, row: 0, x: X0, stage: 'down', stageT: 0, a: Math.PI, sts: [], drawn: 0,
    // 中鋒側鋒
    tipKind: 'center', tipT: 0, tipDone: { center: false, side: false },
    // 十
    seq: 0, stopAt: null, sel: 0, lastPose: null,
  };
  const writers = {
    center: makeWriter(paper, lineChar(TIP_Y.center)),
    side: makeWriter(paper, lineChar(TIP_Y.side), { side: Math.PI / 2, tilt: TILT, bristles: bristles(30, 7) }),
  };
  const shi = makeWriter(paper, SHI);
  const spans = shi.spans();
  const SEQ0 = 0.6;                                   // 下筆之前的時間
  // 每一筆的分段時間（整個時間軸上）：[開始, 起筆結束, 行筆結束, 結束]
  const phaseT = shi.strokes.map((k, i) => {
    const s = k.s, t0 = spans[i].t0;
    const a = s.find((q) => q.phase >= 1), b = s.find((q) => q.phase >= 2);
    return [t0, t0 + a.t, t0 + b.t, spans[i].t1];
  });
  const curves = shi.strokes.map((k) => forceCurve(k.s));
  const bounds = shi.strokes.map((k) => {
    const s = k.s, Ls = s[s.length - 1].s;
    return [s.find((q) => q.phase >= 1).s / Ls, s.find((q) => q.phase >= 2).s / Ls];
  });

  // ---------- 鏡頭 ----------
  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const bc = PAPER.bc;
  const HOMES = {
    side: () => (state.mode === 'tip'
      ? { t: V(bc[0] - 0.1, 0.35, bc[1] + 0.05), d: V(-0.78, 0.36, 0.52), w: 2.9, h: 1.7 }
      : { t: V(bc[0], 0.22, bc[1] + 0.15), d: V(-0.3, 0.6, 0.78), w: 3.0, h: 2.2 }),
    top: () => ({ t: V(bc[0], 0, bc[1]), d: V(0, 1, 0.02), w: 2.9, h: 2.9 }),
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    if (state.cam === 'tip') { controls.enabled = false; fly.t = 1; return; }
    controls.enabled = true;
    const H = HOMES[state.cam]();
    flyTo(H.d.clone().normalize().multiplyScalar(fit(H.w, H.h)).add(H.t), H.t, instant);
  }

  // ---------- 切換 ----------
  function setMode(m, instant) {
    state.mode = m;
    $$('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-mode') === m ? 'true' : 'false'));
    $$('.cg-panel').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== m; });
    paper.clearInk();
    paper.setGrid(m === 'shi' && gridOn);
    if (m === 'press') resetPress();
    if (m === 'tip') { state.tipDone = { center: false, side: false }; writeTip('center'); }
    if (m === 'shi') playShi();
    goHome(instant);
    setPlaying(true);
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    root.classList.remove('al-fresh');
  }
  function setCam(v) { state.cam = v; $$('[data-cam]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-cam') === v ? 'true' : 'false')); goHome(false); }
  function setSpeed(v) { state.speed = v; $$('[data-speed]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-speed')) === v ? 'true' : 'false')); }
  function setPattern(k) {
    state.pattern = k;
    $$('[data-pattern]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pattern') === k ? 'true' : 'false'));
    root.classList.toggle('cg-handmode', k === 'hand');
  }
  // 提按
  function resetPress() { paper.clearInk(); state.row = 0; state.x = X0; state.stage = 'down'; state.stageT = 0; state.sts = []; state.drawn = 0; state.p = 0; state.a = Math.PI; }
  // 中鋒側鋒：清掉，補畫另一條（若寫過），再寫這一條
  function writeTip(kind) {
    paper.clearInk();
    const other = kind === 'center' ? 'side' : 'center';
    writers[kind].reset();
    if (state.tipDone[other]) { writers[other].reset(); writers[other].drawTo(1e9); }
    state.tipKind = kind; state.tipT = -0.5;
    $$('[data-tip]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-tip') === kind ? 'true' : 'false'));
    setPlaying(true);
  }
  // 十：整個字或某一段
  function playShi(range) {
    paper.clearInk(); shi.reset();
    if (range) {
      shi.drawTo(range[0]);
      state.seq = SEQ0 + range[0]; state.stopAt = SEQ0 + range[1];
      setSpeed(0.25);
    } else { state.seq = 0; state.stopAt = null; }
    setPlaying(true);
  }
  function selStroke(i) {
    state.sel = i;
    $$('[data-stroke]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-stroke')) === i ? 'true' : 'false'));
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-mode'))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-pattern]').forEach((b) => b.addEventListener('click', () => { setPattern(b.getAttribute('data-pattern')); setPlaying(true); }));
  $$('[data-tip]').forEach((b) => b.addEventListener('click', () => writeTip(b.getAttribute('data-tip'))));
  $$('[data-stroke]').forEach((b) => b.addEventListener('click', () => selStroke(Number(b.getAttribute('data-stroke')))));
  $$('[data-phase]').forEach((b) => b.addEventListener('click', () => {
    const k = b.getAttribute('data-phase');
    if (k === 'all') { setSpeed(state.speed === 0.25 ? 1 : state.speed); playShi(); return; }
    const i = Number(k), T = phaseT[state.sel];
    playShi([T[i], T[i + 1]]);
  }));
  if (R.hand) R.hand.addEventListener('input', () => { state.hand = Number(R.hand.value) / 100; R.hand.style.setProperty('--p', `${R.hand.value}%`); if (state.pattern !== 'hand') setPattern('hand'); setPlaying(true); });
  root.querySelectorAll('.cg-again').forEach((b) => b.addEventListener('click', () => { if (state.mode === 'press') resetPress(); else if (state.mode === 'tip') writeTip(state.tipKind); else playShi(); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  let gridOn = true;
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="grid"]', (v) => { gridOn = v; paper.setGrid(state.mode === 'shi' && v); });

  // =====================================================================
  // 每格
  // =====================================================================
  const AIR = { down: 0.35, up: 0.3, move: 0.55 };
  function stepPress(run) {
    const y = ROWS[state.row];
    state.stageT += run;
    const dir = [Math.cos(state.a), Math.sin(state.a)];
    if (state.stage === 'down') {
      const k = ease(state.stageT / AIR.down);
      placeBrush(brush, paper, { x: X0, y, p: 0, dir }, (1 - k) * 0.35);
      if (state.stageT >= AIR.down) { state.stage = 'write'; state.stageT = 0; state.x = X0; state.p = 0.05; }
      return null;
    }
    if (state.stage === 'write') {
      const f = clamp((state.x - X0) / (X1 - X0));
      let target = state.pattern === 'hand' ? 0.06 + 0.9 * state.hand : PATTERNS[state.pattern](f);
      target *= ease(f / 0.035) * (1 - ease((f - 0.965) / 0.035) * 0.85);
      const dx = VX * run;
      const n = Math.max(1, Math.ceil(dx / STEP));
      const p0 = state.p, p1 = smoothTo(state.p, target, run, state.pattern === 'hand' ? 0.07 : 0.03);
      for (let i = 1; i <= n && run > 0; i++) {
        const x = state.x + (dx * i) / n, p = p0 + ((p1 - p0) * i) / n;
        let d = Math.PI - state.a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
        state.a += d * (1 - Math.exp(-(dx / n) / 26));
        const fp = footprint(p);
        if (fp) state.sts.push({ x, y, a: state.a, hw: fp.hw, len: fp.len, p });
      }
      state.x += dx; state.p = p1;
      paper.stampMany(state.sts, state.drawn, state.sts.length); state.drawn = state.sts.length;
      placeBrush(brush, paper, { x: state.x, y, p: state.p, dir: [Math.cos(state.a), Math.sin(state.a)] });
      if (state.x >= X1) { state.stage = 'up'; state.stageT = 0; }
      return { p: state.p, x: state.x, y };
    }
    if (state.stage === 'up') {
      placeBrush(brush, paper, { x: X1, y, p: 0, dir }, ease(state.stageT / AIR.up) * 0.35);
      if (state.stageT >= AIR.up) { state.stage = 'move'; state.stageT = 0; }
      return null;
    }
    // move：在空中移到下一行（寫滿四行就清掉重來）
    const next = (state.row + 1) % ROWS.length;
    const k = ease(state.stageT / AIR.move);
    placeBrush(brush, paper, { x: X1 + (X0 - X1) * k, y: y + (ROWS[next] - y) * k, p: 0, dir }, 0.35);
    if (state.stageT >= AIR.move) {
      if (next === 0) { paper.clearInk(); state.sts = []; state.drawn = 0; }
      state.row = next; state.stage = 'down'; state.stageT = 0; state.a = Math.PI;
    }
    return null;
  }
  function stepTip(run) {
    const w = writers[state.tipKind];
    state.tipT += run;
    const t = state.tipT;
    if (t < 0) {                                       // 下筆前：從上方降下來
      const p0 = w.poseAt(0);
      placeBrush(brush, paper, p0, (-t / 0.5) * 0.4);
      return p0;
    }
    const pose = w.poseAt(Math.min(t, w.duration));
    const lift = t > w.duration ? ease((t - w.duration) / 0.6) * 0.4 : 0;
    placeBrush(brush, paper, t > w.duration ? { ...pose, p: 0 } : pose, lift);
    w.drawTo(t);
    if (t > w.duration) state.tipDone[state.tipKind] = true;
    if (t > w.duration + 1.2 && !state.tipDone[state.tipKind === 'center' ? 'side' : 'center']) writeTip(state.tipKind === 'center' ? 'side' : 'center');   // 一打開先兩種都寫一次
    return pose;
  }
  function stepShi(run) {
    state.seq += run * state.speed;
    if (state.stopAt !== null && state.seq >= state.stopAt) { state.seq = state.stopAt; setPlaying(false); state.stopAt = null; }
    const s = state.seq;
    if (s < SEQ0) {
      const p0 = shi.poseAt(0);
      placeBrush(brush, paper, p0, (1 - s / SEQ0) * 0.4);
      return null;
    }
    const tw = s - SEQ0;
    const pose = shi.poseAt(Math.min(tw, shi.duration));
    const lift = tw > shi.duration ? ease((tw - shi.duration) / 0.7) * 0.45 : 0;
    placeBrush(brush, paper, tw > shi.duration ? { ...pose, p: 0 } : pose, lift + pose.hover * 0.3);
    shi.drawTo(tw);
    if (tw > shi.duration + 1.5) state.seq = SEQ0 + shi.duration + 1.5;
    if (pose.phase >= 0 && tw <= shi.duration && pose.n !== state.sel) selStroke(pose.n);
    return pose;
  }
  function step(dt) {
    const run = state.playing ? dt : 0;
    let pose = null;
    if (state.mode === 'press') pose = stepPress(run);
    else if (state.mode === 'tip') pose = stepTip(run);
    else pose = stepShi(run);
    if (state.cam === 'tip') {
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

  let narrow = false;
  function updateLabels(pose) {
    const on = state.labels, m = state.mode;
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    // 提按：筆旁邊寫「按／提」，線旁邊寫線寬
    let st = '';
    if (m === 'press' && state.stage === 'write') st = state.p > 0.62 ? 'Pressing<small>按：筆毛散開</small>' : state.p < 0.25 ? 'Lifting<small>提：筆毛收攏</small>' : 'Steady<small>穩穩地走</small>';
    if (labs.state.innerHTML !== st) labs.state.innerHTML = st;
    show(labs.state, on && !!st, brush.group.localToWorld(V(0, 0.95, 0)));
    const wHtml = m === 'press' && state.stage === 'write' ? `${(footprint(Math.max(0.002, state.p)).hw * 2 * MM).toFixed(1)} mm wide<small>線寬</small>` : '';
    if (labs.width.innerHTML !== wHtml) labs.width.innerHTML = wHtml;
    show(labs.width, on && !!wHtml && !narrow, paper.world(Math.max(X0 + 40, state.x - 120), ROWS[state.row] + 70));
    show(labs.center, on && m === 'tip' && state.tipDone.center, paper.world(500, TIP_Y.center - 95));
    show(labs.side, on && m === 'tip' && state.tipDone.side, paper.world(500, TIP_Y.side + 105));
    show(labs.tip, on && m === 'tip' && state.cam !== 'top' && state.tipT > 0.1 && !narrow, brush.tipWorld(V(0, 0, 0)), -16);
    const ph = m === 'shi' && pose && pose.phase >= 0 ? phaseTxt[pose.n][pose.phase] : null;
    const phHtml = ph ? `${ph.short_en}<small>${ph.short_zh}</small>` : '';
    if (labs.phase.innerHTML !== phHtml) labs.phase.innerHTML = phHtml;
    show(labs.phase, on && !!ph && state.cam !== 'top', brush.group.localToWorld(V(0, 0.95, 0)));
  }
  function readout(pose) {
    if (state.mode === 'press') {
      const p = state.stage === 'write' ? state.p : 0;
      if (R.pOut) R.pOut.textContent = `${Math.round(p * 100)}%`;
      if (R.wOut) R.wOut.textContent = state.stage === 'write' ? `${(footprint(Math.max(0.002, p)).hw * 2 * MM).toFixed(1)} mm` : '—';
      if (R.spread) R.spread.style.width = `${Math.round(p * 100)}%`;
    }
    if (state.mode === 'tip') {
      const side = state.tipKind === 'side';
      if (R.tipHandle) R.tipHandle.innerHTML = side ? 'Leaning about 24°<small>斜約 24°</small>' : 'Upright<small>直立</small>';
      if (R.tipWhere) R.tipWhere.innerHTML = side ? 'Along the top edge<small>貼著上緣</small>' : 'In the middle of the line<small>線的中間</small>';
    }
    if (state.mode === 'shi' && R.force) {
      const c = R.force, dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
      if (w && h) {
        if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
        const i = state.sel;
        const on = pose && pose.phase >= 0 && pose.n === i && state.seq - SEQ0 <= shi.duration;
        drawForce(c.getContext('2d'), w, h, curves[i], { at: on ? pose.f : null, bounds: bounds[i], labels: phaseTxt[i].map((p) => p.short_zh) });
      }
      const ph = pose && pose.phase >= 0 && state.seq - SEQ0 <= shi.duration ? phaseTxt[pose.n][pose.phase] : null;
      const k = ph ? `${SHI.strokes[pose.n].en} · ${ph.en} · ${SHI.strokes[pose.n].zh}・${ph.zh}` : state.seq < SEQ0 ? 'Getting ready · 準備下筆' : 'Pick a stroke and a part to replay · 選一筆、選一段重播';
      if (R.phK && R.phK.textContent !== k) R.phK.textContent = k;
      const tx = ph ? `${ph.text_en}<span class="zh">${ph.text_zh}</span>` : '';
      if (R.phT && R.phT.innerHTML !== tx) R.phT.innerHTML = tx;
      if (R.press) R.press.textContent = ph ? `${Math.round(pose.p * 100)}%` : '—';
    }
  }

  // =====================================================================
  // 迴圈
  // =====================================================================
  let lastPose = null, lastRead = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    lastPose = step(dt) || lastPose;
    if (controls.enabled) controls.update();
    updateLabels(lastPose);
    if (t - lastRead > 100) { lastRead = t; readout(lastPose); }
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

  setPattern('swell'); setSpeed(1); setCam('side'); selStroke(0);
  setMode('press', true);
  resize();
  step(0.01); readout(null);
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    press: () => { setMode('press'); setPattern('swell'); },
    wave: () => { setMode('press'); setPattern('wave'); },
    hand: () => { setMode('press'); setPattern('hand'); },
    center: () => { setMode('tip'); },
    side: () => { if (state.mode !== 'tip') setMode('tip'); state.tipDone.center = true; writeTip('side'); },
    shi: () => setMode('shi'),
    needle: () => { setMode('shi'); selStroke(1); playShi([phaseT[1][2], phaseT[1][3]]); },
  };
  root.__lab = {
    camera, controls, state, scene, brush, paper, shi, writers, phaseT, setMode, setCam, setSpeed, setPattern, setPlaying,
    writeTip, playShi, selStroke,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) lastPose = step(0.02) || lastPose; },
    render: () => { lastPose = step(0) || lastPose; if (controls.enabled) controls.update(); updateLabels(lastPose); readout(lastPose); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const pad = document.querySelector('[data-cal-pad]');
  if (pad) initPad(pad, SHI);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calpress-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
