/*
 * 書法 · 第三課「永字八法：一個字學會所有筆畫？」的 3D 模型（寫字引擎示範，全部自繪示意）。
 *
 * 一個機制：「永」只有 5 畫，裡面卻有楷書最基本的 8 種運筆：側（點）、勒（橫）、努（直豎）、趯（鉤）、
 * 策（斜書向上）、掠（撇）、啄（右短撇）、磔（捺）。第 2 畫橫折鉤＝勒＋努＋趯、第 3 畫橫撇＝策＋掠。
 * 筆畫資料 src/strokes/yong.json 的 methods 用控制點範圍標出每一法；brush.js 的 methodSpans 換成時間。
 *   - 「整個字」：毛筆照筆順寫完五畫；每一法寫完，紙上就出現它的古名標籤（八法標示）
 *   - 八個按鈕（data-method）：先把那一法之前的墨補畫好，再用 ¼× 只播那一法，播完暫停
 *   - 右側：目前第幾畫、哪一法、怎麼寫；這一畫的力道曲線，按法分色帶
 * 鏡頭（data-cam）：side 斜前方、top 正上方、tip 跟著筆尖。
 * 2D：卡片上的小「永」（data-cg-mini，把那一法塗黑）、練字板寫「永」（pad.js，比提按曲線、可顯示筆順數字）。
 *
 * 座標同 brush3d.js。產物：cd tools/callig && npm run build → assets/js/cal-yong.js
 * 除錯：document.querySelector('[data-calyong-lab]').__lab
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PCFShadowMap, PerspectiveCamera, Scene,
  Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp, forceCurve, methodSpans, prepStroke, stamps } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { drawForce, drawStamps, paperBase } from './ink2d.js';
import { initPad } from './pad.js';
import YONG from './strokes/yong.json';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const PAPER = { x: 0, z: 0.35, w: 3.2, h: 3.8, box: 2.6, bc: [0, 0.45] };
const SEQ0 = 0.6;                                       // 下筆之前
// 八法標籤放在那一法中間那一點、往外推一點（字框座標的位移）
const LABEL_OFF = { ce: [-95, -10], le: [-20, -70], nu: [-150, 30], ti: [-80, 40], ce2: [-40, -75], lue: [-85, 10], zhuo: [90, -30], zhe: [60, 60] };

// 全字的八法（照書寫順序），換成整條時間軸上的時間
function allMethods(writer) {
  const spans = writer.spans();
  const out = [];
  writer.strokes.forEach((k, i) => {
    const Ls = k.s[k.s.length - 1].s || 1;
    for (const m of methodSpans(k.s, k.st)) {
      const mid = k.s[Math.round((m.i0 + m.i1) / 2)];
      out.push({ ...m, stroke: i, T0: spans[i].t0 + m.t0, T1: spans[i].t0 + m.t1, f0: m.s0 / Ls, f1: m.s1 / Ls, mid });
    }
  });
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
  Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 4, bottom: -4, near: 1, far: 25 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  makeDesk(scene, { w: 9, d: 6, felt: [PAPER.x, PAPER.z, 4.0, 4.6], weight: [PAPER.x, PAPER.z - PAPER.h / 2 + 0.18, 2.7], stone: [3.1, -0.5] });
  const paper = makePaper({ w: PAPER.w, h: PAPER.h, x: PAPER.x, y: 0.016, z: PAPER.z, box: PAPER.box, boxCenter: PAPER.bc, grid: true });
  paper.mesh.receiveShadow = true;
  scene.add(paper.mesh);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group);
  brush.setInk(1);

  const writer = makeWriter(paper, YONG);
  const METHODS = allMethods(writer);
  const info = Object.fromEntries(JSON.parse(root.getAttribute('data-methods') || '[]').map((m) => [m.key, m]));
  const curves = writer.strokes.map((k) => forceCurve(k.s));

  // =====================================================================
  // 標籤
  // =====================================================================
  const lab = labeler($('.al-labels'), cv, camera);
  const nowLab = lab.add('cg-lb cg-lb-ph', '');
  const eight = METHODS.map((m) => lab.add('cg-lb cg-lb-m', `<b>${m.ch}</b> ${m.zh}<small>${m.en}</small>`));
  [nowLab, ...eight].forEach((el) => { el.hidden = true; });

  // =====================================================================
  // 狀態
  // =====================================================================
  const R = {
    play: $('.al-play'), force: $('.cg-force'), k: $('.cg-phase-k'), t: $('.cg-phase-t'), press: $('.cg-press-out'),
    stroke: $('.cg-stroke-out'), method: $('.cg-method-out'),
  };
  const state = { playing: true, labels: true, eight: true, cam: 'side', speed: 1, seq: 0, stopAt: null, focus: null, lastPose: null };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const bc = PAPER.bc;
  const HOMES = {
    side: () => ({ t: V(bc[0], 0.2, bc[1] + 0.1), d: V(-0.28, 0.72, 0.68), w: 3.0, h: 2.9 }),
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
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    root.classList.remove('al-fresh');
  }
  function setCam(v) { state.cam = v; $$('[data-cam]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-cam') === v ? 'true' : 'false')); goHome(false); }
  function setSpeed(v) { state.speed = v; $$('[data-speed]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-speed')) === v ? 'true' : 'false')); }
  function markMethod(key) { $$('[data-method]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-method') === key ? 'true' : 'false')); }
  /** 整個字（range 省略）或只播某一法 */
  function play(range, key = null) {
    paper.clearInk(); writer.reset();
    state.focus = key;
    if (range) { writer.drawTo(range[0]); state.seq = SEQ0 + range[0]; state.stopAt = SEQ0 + range[1]; setSpeed(0.25); }
    else { state.seq = 0; state.stopAt = null; }
    markMethod(key || 'all');
    setPlaying(true);
  }
  function playMethod(key) {
    const m = METHODS.find((x) => x.key === key);
    if (m) play([m.T0, m.T1], key);
  }

  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-method]').forEach((b) => b.addEventListener('click', () => {
    const k = b.getAttribute('data-method');
    if (k === 'all') { if (state.speed === 0.25) setSpeed(1); play(); } else playMethod(k);
  }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="eight"]', (v) => { state.eight = v; });
  bind('[data-t="grid"]', (v) => paper.setGrid(v));

  // =====================================================================
  // 每格
  // =====================================================================
  function step(dt) {
    const run = state.playing ? dt : 0;
    state.seq += run * state.speed;
    if (state.stopAt !== null && state.seq >= state.stopAt) { state.seq = state.stopAt; setPlaying(false); state.stopAt = null; }
    const s = state.seq;
    let pose = null;
    if (s < SEQ0) placeBrush(brush, paper, writer.poseAt(0), (1 - s / SEQ0) * 0.4);
    else {
      const tw = s - SEQ0;
      pose = writer.poseAt(Math.min(tw, writer.duration));
      const lift = tw > writer.duration ? ease((tw - writer.duration) / 0.7) * 0.45 : 0;
      placeBrush(brush, paper, tw > writer.duration ? { ...pose, p: 0 } : pose, lift + pose.hover * 0.3);
      writer.drawTo(tw);
      if (tw > writer.duration + 1.5) state.seq = SEQ0 + writer.duration + 1.5;
    }
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
  // 目前在哪一法（照時間）
  function methodNow(tw) {
    if (tw < 0 || tw > writer.duration) return null;
    return METHODS.find((m) => tw >= m.T0 - 1e-6 && tw <= m.T1 + 1e-6) || null;
  }

  let narrow = false;
  function updateLabels(pose) {
    const on = state.labels, tw = state.seq - SEQ0;
    const show = (el, cond, v, dy) => { el.hidden = !cond; if (cond) lab.place(el, v, dy); };
    const m = pose && pose.phase >= 0 ? methodNow(tw) : null;
    const html = m ? `<b>${m.ch}</b> ${m.en}<small>${m.zh}</small>` : '';
    if (nowLab.innerHTML !== html) nowLab.innerHTML = html;
    show(nowLab, on && !!m && state.cam !== 'top', brush.group.localToWorld(V(0, 0.95, 0)));
    METHODS.forEach((mm, i) => {
      const done = tw >= (mm.T0 + mm.T1) / 2;
      const o = LABEL_OFF[mm.key] || [0, 0];
      const el = eight[i];
      const cls = `al-lab cg-lb cg-lb-m${state.focus === mm.key || m === mm ? ' on' : ''}`;
      if (el.className !== cls) el.className = cls;
      show(el, on && state.eight && done && !narrow && state.cam !== 'tip', paper.world(mm.mid.x + o[0], mm.mid.y + o[1]));
    });
  }
  function readout(pose) {
    const tw = state.seq - SEQ0;
    const m = pose && pose.phase >= 0 ? methodNow(tw) : null;
    const k = pose && pose.phase >= 0 && tw <= writer.duration ? pose.n : (m ? m.stroke : null);
    if (R.stroke) R.stroke.innerHTML = k !== null ? `${k + 1} / 5 · ${YONG.strokes[k].en}<small>第 ${k + 1} 畫・${YONG.strokes[k].zh}</small>` : tw > writer.duration ? 'Done<small>寫完了</small>' : '—';
    if (R.method) R.method.innerHTML = m ? `${m.ch} · ${m.en}<small>${m.zh}</small>` : '—';
    const mi = m ? info[m.key] : null;
    const kk = mi ? `${m.ch} ${mi.py} · ${mi.old_en} → ${m.en}` : tw < 0 ? 'Getting ready · 準備下筆' : tw > writer.duration ? 'Tap a principle to replay it · 點一法重播' : 'Moving to the next stroke · 移到下一畫';
    if (R.k && R.k.textContent !== kk) R.k.textContent = kk;
    const tx = mi ? `${mi.text_en}<span class="zh">${mi.text_zh}</span>` : '';
    if (R.t && R.t.innerHTML !== tx) R.t.innerHTML = tx;
    if (R.press) R.press.textContent = m && pose ? `${Math.round(pose.p * 100)}%` : '—';
    if (R.force) {
      const c = R.force, dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
      if (w && h) {
        if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
        const si = k !== null ? k : 1;
        const bands = METHODS.filter((x) => x.stroke === si).map((x) => ({ from: x.f0, to: x.f1, label: `${x.ch} ${x.zh}`, on: x === m }));
        drawForce(c.getContext('2d'), w, h, curves[si], { at: pose && pose.phase >= 0 && pose.n === si && tw <= writer.duration ? pose.f : null, bands });
      }
    }
  }

  // =====================================================================
  // 迴圈
  // =====================================================================
  let lastRead = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    state.lastPose = step(dt) || state.lastPose;
    if (controls.enabled) controls.update();
    updateLabels(state.lastPose);
    if (t - lastRead > 100) { lastRead = t; readout(state.lastPose); }
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
    narrow = w < 520;
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

  setSpeed(1); setCam('side');
  play();
  resize();
  step(0.01); readout(null);
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = Object.fromEntries(METHODS.map((m) => [m.key, () => playMethod(m.key)]));
  DEMO.all = () => play();
  root.__lab = {
    camera, controls, state, scene, brush, paper, writer, METHODS, setCam, setSpeed, setPlaying, play, playMethod,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) state.lastPose = step(0.02) || state.lastPose; },
    render: () => { state.lastPose = step(0) || state.lastPose; if (controls.enabled) controls.update(); updateLabels(state.lastPose); readout(state.lastPose); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

// ---------------------------------------------------------------------
// 卡片上的小「永」：整個字淡淡的，那一法塗黑（2D，不需要 WebGL）
// ---------------------------------------------------------------------
function initMinis() {
  const cvs = document.querySelectorAll('[data-cg-mini]');
  if (!cvs.length) return;
  const strokes = YONG.strokes.map((st) => { const s = prepStroke(st); return { st, s, sts: stamps(s), ms: methodSpans(s, st) }; });
  const draw = (c) => {
    const key = c.getAttribute('data-cg-mini');
    const css = c.clientWidth || 120, dpr = Math.min(window.devicePixelRatio || 1, 2), S = Math.round(css * dpr);
    if (c.width !== S || c.height !== S) { c.width = S; c.height = S; }
    const g = c.getContext('2d');
    paperBase(g, S, S, { seed: 13, fiber: 0.3 });
    const T = { k: S / 1000, ox: 0, oy: 0 };
    for (const k of strokes) {
      drawStamps(g, k.sts, T, { color: 'rgb(150,140,125)', alpha: 0.32 });
      const m = k.ms.find((x) => x.key === key);
      if (m) {
        // 這一法的取樣範圍 → 印子範圍（印子少了沒壓力的點，用時間對）
        const i0 = k.sts.findIndex((q) => q.t >= m.t0 - 1e-9);
        let i1 = k.sts.length; for (let i = k.sts.length - 1; i >= 0; i--) if (k.sts[i].t <= m.t1 + 1e-9) { i1 = i + 1; break; }
        drawStamps(g, k.sts, T, { i0: Math.max(0, i0), i1, color: '#151311' });
      }
    }
  };
  cvs.forEach((c) => { new ResizeObserver(() => draw(c)).observe(c); draw(c); });
}

function init2D() {
  initMinis();
  const pad = document.querySelector('[data-cal-pad]');
  if (pad) initPad(pad, YONG);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calyong-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
