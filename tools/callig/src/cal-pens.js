/*
 * 書法 · 第十四課「中文書法和西洋書法有什麼不同？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**工具決定線條**。書桌上並排兩張紙：
 *   左：毛筆寫「永」（寫字引擎）。筆毛是軟的，線的粗細看「按多重」。
 *   右：平頭筆（broad-edge pen）寫 n o a。筆嘴是一條硬的扁邊，和橫線的夾角固定（.cg-nib-deg 滑桿，0–90°），
 *       線的粗細只看「往哪個方向走」（nib.js 的 nibWidth＝筆嘴寬 × |sin(方向 − 筆嘴角度)|）。
 *   data-mode="both|brush|pen"   一起看，或鏡頭飛到其中一張
 *   data-what="word|yong"        平頭筆寫字母，或拿平頭筆去寫「永」（照同一條中心線走——看它做不出提按）
 * 右側即時顯示：毛筆現在按多重、線多寬；平頭筆現在往哪個方向、線多寬；一張「方向 → 粗細」的圖（pens2d.js 的 drawRose）。
 * 平頭筆的墨用 paper.setUnder 重畫（四邊形，不是毛筆的印子）。字母骨架是自己畫的（nib.js 的 LETTERS）。
 * 2D（不需要 WebGL）：卡片小圖、「這一筆是哪一種筆寫的？」、平頭筆練字板（pens2d.js）、毛筆練字板（pad.js：永）。
 *
 * 產物：cd tools/callig && npm run build → assets/js/cal-pens.js
 * 除錯：document.querySelector('[data-calpens-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp, footprint } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { NIB_DEG, NIB_W, rad, sweep, widthStats } from './nib.js';
import { initPad } from './pad.js';
import { YONG, drawMinis, drawNib, drawRose, initNibPad, initTool, penStrokes } from './pens2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const SHEET = { xs: [-1.72, 1.72], z: 0.45, w: 3.0, h: 3.3, box: 2.5, cm: 25 };
const SEQ0 = 0.6, PEN_V = 230, PEN_GAP = 0.6;
const cm = (u) => (u / 1000) * SHEET.cm;
const cmT = (u) => (cm(u) < 0.05 ? 'hairline 極細' : `${cm(u).toFixed(1)} cm`);   // 平頭筆順著筆嘴走時線寬趨近 0

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
  Object.assign(sun.shadow.camera, { left: -5.5, right: 5.5, top: 4, bottom: -4, near: 1, far: 25 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  const D = makeDesk(scene, { w: 9.2, d: 6.2, felt: [0, SHEET.z, 7.4, 3.9], weight: [SHEET.xs[0], SHEET.z - SHEET.h / 2 + 0.16, 2.2], stone: null });
  { const w = D.weight.clone(); w.position.x = SHEET.xs[1]; scene.add(w); }
  const mk = (x, grid) => { const p = makePaper({ w: SHEET.w, h: SHEET.h, x, y: 0.016, z: SHEET.z, box: SHEET.box, boxCenter: [x, SHEET.z + 0.07], grid }); p.mesh.receiveShadow = true; scene.add(p.mesh); return p; };
  const paperB = mk(SHEET.xs[0], true), paperP = mk(SHEET.xs[1], false);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group); brush.setInk(1);

  // 平頭筆：原點在筆嘴那條邊的中心；group 繞 Y 轉＝筆嘴角度，裡面那一層往後倒
  const pen = new Group(), penIn = new Group(); pen.add(penIn); penIn.rotation.x = 0.5;
  const nibWorld = (NIB_W / 1000) * SHEET.box;
  const nib = new Mesh(new BoxGeometry(nibWorld, 0.34, 0.012), new MeshStandardMaterial({ color: 0xc9a14a, roughness: 0.3, metalness: 0.7 })); nib.position.y = 0.17;
  const neck = new Mesh(new CylinderGeometry(0.05, nibWorld * 0.42, 0.22, 16), new MeshStandardMaterial({ color: 0x2a2f3a, roughness: 0.5 })); neck.position.y = 0.44;
  const holder = new Mesh(new CylinderGeometry(0.04, 0.055, 1.25, 16), new MeshStandardMaterial({ color: 0x7a2a1c, roughness: 0.45 })); holder.position.y = 1.17;
  penIn.add(nib, neck, holder); pen.traverse((m) => { if (m.isMesh) m.castShadow = true; }); scene.add(pen);

  const lab = labeler($('.al-labels'), cv, camera);
  const lbB = lab.add('cg-lb cg-lb-m cg-lb-race cg-lb-yan', '<b>毛筆</b> Brush');
  const lbP = lab.add('cg-lb cg-lb-m cg-lb-race cg-lb-liu', '<b>平頭筆</b> Broad-edge pen');

  const R = { play: $('.al-play'), msg: $('.cg-pens-msg'), rose: $('.cg-pens-rose'), slider: $('.cg-nib-deg'), degOut: $('.cg-nib-deg-out'),
    bp: $('.cg-pens-bp'), bw: $('.cg-pens-bw'), pd: $('.cg-pens-pd'), pw: $('.cg-pens-pw') };
  const cell = (row, who) => $(`[data-cell="${row}-${who}"]`);
  const state = { mode: 'both', what: 'word', deg: NIB_DEG, playing: true, labels: true, speed: 1, t: 0, cam: 'near', dir: null };
  let writer = null, P = null;   // P＝平頭筆的時間軸

  function buildPen() {
    const strokes = penStrokes(state.what), W = state.what === 'yong' ? 70 : NIB_W, segs = [];
    let t = 0;
    strokes.forEach((st, i) => {
      const quads = sweep(st.path, W, rad(state.deg), 5), len = quads.length ? quads[quads.length - 1].s1 : 0, dur = len / PEN_V;
      if (i) t += PEN_GAP;
      segs.push({ st, quads, t0: t, t1: t + dur, len }); t += dur;
    });
    const all = segs.flatMap((s) => s.quads);
    return { segs, duration: t, stats: widthStats(all), W, drawn: -1 };
  }
  function penPose(t) {
    const S = P.segs;
    let i = S.findIndex((s) => t < s.t1); if (i < 0) i = S.length - 1;
    const s = S[i];
    if (t < s.t0) {   // 提筆、移過去
      const a = S[i - 1].quads[S[i - 1].quads.length - 1], b = s.quads[0], u = ease((t - S[i - 1].t1) / PEN_GAP);
      return { x: a.x + (b.q[0][0] + b.q[1][0]) / 2 * u - a.x * u, y: a.y + ((b.q[0][1] + b.q[1][1]) / 2 - a.y) * u, hover: Math.sin(Math.PI * u) * 0.22 + 0.02, down: false, n: i, count: countTo(i, 0) };
    }
    const d = clamp((t - s.t0) / Math.max(1e-6, s.t1 - s.t0)) * s.len;
    let k = s.quads.findIndex((q) => q.s1 >= d); if (k < 0) k = s.quads.length - 1;
    const q = s.quads[k];
    return { x: q.x, y: q.y, hover: 0, down: t <= s.t1, dir: q.dir, w: q.w, n: i, count: countTo(i, k + 1) };
  }
  const countTo = (i, k) => P.segs.slice(0, i).reduce((a, s) => a + s.quads.length, 0) + k;
  function drawPen(count) {
    if (count === P.drawn) return;
    P.drawn = count;
    paperP.setUnder((g, T) => {
      if (state.what === 'word') {
        g.save(); g.strokeStyle = 'rgba(31,111,139,.35)'; g.lineWidth = Math.max(1.5, T.k * 3);
        for (const y of [300, 700]) { g.beginPath(); g.moveTo(T.ox + 40 * T.k, T.oy + y * T.k); g.lineTo(T.ox + 960 * T.k, T.oy + y * T.k); g.stroke(); }
        g.restore();
      }
      let left = count;
      for (const s of P.segs) { if (left <= 0) break; drawNib(g, T, s.quads, { upTo: left }); left -= s.quads.length; }
    });
  }

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const fx = () => (state.mode === 'brush' ? SHEET.xs[0] : state.mode === 'pen' ? SHEET.xs[1] : null);
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    const x = fx(), top = state.cam === 'top';
    const t = x === null ? V(0, top ? 0 : 0.1, SHEET.z + 0.05) : V(x, top ? 0 : 0.15, SHEET.z + 0.1);
    const d = top ? V(0, 1, 0.02) : x === null ? V(0, 0.9, 0.44) : V(-0.15, 0.8, 0.6);
    flyTo(d.normalize().multiplyScalar(fit(x === null ? 7.0 : 3.2, x === null ? 3.9 : 3.4)).add(t), t, instant);
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
  function rose() {
    if (!R.rose) return;
    const S = 180; if (R.rose.width !== S) { R.rose.width = S; R.rose.height = S; }
    drawRose(R.rose.getContext('2d'), S, rad(state.deg), state.dir);
  }
  function table() {
    const bs = brushStats(), ps = P.stats;
    cell('max', 'brush').textContent = `${cm(bs.max).toFixed(1)} cm`; cell('min', 'brush').textContent = `${cm(bs.min).toFixed(1)} cm`;
    cell('max', 'pen').textContent = `${cm(ps.max).toFixed(1)} cm`; cell('min', 'pen').textContent = cmT(ps.min);
  }
  let bsCache = null;
  function brushStats() {
    if (!bsCache) {
      const w = writer.strokes.flatMap((k) => k.sts.filter((q) => q.phase === 1).map((q) => q.hw * 2)).sort((a, b) => a - b);
      bsCache = { min: w[Math.floor(w.length * 0.05)], max: w[w.length - 1] };
    }
    return bsCache;
  }

  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    if (opts.what) state.what = opts.what;
    if (opts.deg !== undefined) state.deg = opts.deg;
    state.t = 0; state.dir = null;
    paperB.clearInk();
    writer = makeWriter(paperB, YONG);
    P = buildPen(); drawPen(0);
    press('[data-mode]', 'data-mode', state.mode); press('[data-what]', 'data-what', state.what);
    root.dataset.mode = state.mode;
    pen.rotation.y = rad(state.deg);
    if (R.slider && Number(R.slider.value) !== state.deg) R.slider.value = String(state.deg);
    if (R.degOut) R.degOut.textContent = `${state.deg}°`;
    table(); rose();
    if (R.msg) R.msg.innerHTML = state.what === 'yong'
      ? 'Now the pen follows the same path as the brush. Can it make the heavy dot and the swelling tail?<span class="zh">現在平頭筆照毛筆的路線寫「永」。它寫得出那個重重的點、越來越粗的捺嗎？</span>'
      : 'Left: the brush gets thicker when it presses. Right: the pen gets thicker when it changes direction.<span class="zh">左邊：毛筆按下去就變粗。右邊：平頭筆換方向才變粗。</span>';
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }
  function finish() {
    if (!R.msg) return;
    const ps = P.stats;
    R.msg.innerHTML = state.what === 'yong'
      ? 'The pen went down the same path, but every stroke in one direction has the same width. Pressing harder does nothing: the nib is stiff.<span class="zh">平頭筆走了同一條路線，可是同一個方向的筆畫都一樣粗。再用力按也沒有用：筆嘴是硬的。</span>'
      : `With the nib at ${state.deg}°, the pen's thickest line is ${cm(ps.max).toFixed(1)} cm and its thinnest is ${cm(ps.min) < 0.05 ? 'a hairline' : `${cm(ps.min).toFixed(1)} cm`}. The pressure never changed, only the direction.<span class="zh">筆嘴角度 ${state.deg}° 時，平頭筆最粗的線 ${cm(ps.max).toFixed(1)} 公分、最細${cm(ps.min) < 0.05 ? '只是一條細絲' : ` ${cm(ps.min).toFixed(1)} 公分`}。壓力從頭到尾沒變，變的只有方向。</span>`;
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => start({ mode: b.getAttribute('data-mode') })));
  $$('[data-what]').forEach((b) => b.addEventListener('click', () => start({ what: b.getAttribute('data-what'), fly: false })));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => start({ fly: false })));
  if (R.slider) R.slider.addEventListener('input', () => start({ deg: Number(R.slider.value), fly: false }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  let announced = false, lastUi = 0;
  function step(dt) {
    state.t += (state.playing ? dt : 0) * state.speed;
    const tw = state.t - SEQ0, total = Math.max(writer.duration, P.duration);
    // 毛筆
    if (tw < 0) placeBrush(brush, paperB, writer.poseAt(0), (1 - state.t / SEQ0) * 0.4);
    else {
      const pose = writer.poseAt(Math.min(tw, writer.duration)), over = tw - writer.duration;
      placeBrush(brush, paperB, over > 0 ? { ...pose, p: 0 } : pose, over > 0 ? ease(over / 0.7) * 0.45 : pose.hover * 0.3);
      writer.drawTo(tw);
      state.bp = over > 0 ? 0 : pose.p;
    }
    // 平頭筆
    const tp = clamp(tw, 0, P.duration), pp = penPose(tp), w = paperP.world(pp.x, pp.y);
    const lift = tw < 0 ? (1 - state.t / SEQ0) * 0.4 : tw > P.duration ? ease((tw - P.duration) / 0.7) * 0.4 : pp.hover;
    pen.position.set(w.x, paperP.y + 0.004 + lift, w.z);
    if (tw >= 0) drawPen(tw >= P.duration ? countTo(P.segs.length, 0) : pp.count);
    const dirNow = tw >= 0 && tw < P.duration && pp.down ? pp.dir : null;
    if (dirNow !== state.dir) { state.dir = dirNow; rose(); }
    state.pw = dirNow === null ? null : pp.w;
    if (state.t - lastUi > 0.08 || dt === 0) {
      lastUi = state.t;
      if (R.bp) R.bp.textContent = `${Math.round((state.bp || 0) * 100)}%`;
      const f = footprint(state.bp || 0);
      if (R.bw) R.bw.textContent = f ? `${cm(f.hw * 2).toFixed(1)} cm` : '—';
      if (R.pd) R.pd.textContent = state.dir === null ? '—' : `${Math.round(((MathUtils.radToDeg(state.dir) % 360) + 360) % 360)}°`;
      if (R.pw) R.pw.textContent = state.pw === null ? '—' : `${cm(state.pw).toFixed(1)} cm`;
    }
    const done = tw >= total;
    if (done && !announced) { announced = true; finish(); }
    if (!done) announced = false;
    if (tw > total + 2.5) state.t = SEQ0 + total + 2.5;
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function labels() {
    const on = state.labels && !(state.mode !== 'both' && root.classList.contains('cg-narrow'));   // 手機上單看一張時，標籤會撞到角度按鈕
    lbB.hidden = !(on && state.mode !== 'pen'); lbP.hidden = !(on && state.mode !== 'brush');
    if (!lbB.hidden) lab.place(lbB, paperB.world(500, -215));
    if (!lbP.hidden) lab.place(lbP, paperP.world(500, -215));
  }

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    labels();
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
  start({ mode: 'both', what: 'word', instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = { both: () => start({ mode: 'both' }), brush: () => start({ mode: 'brush' }), pen: () => start({ mode: 'pen', what: 'word' }), yong: () => start({ mode: 'both', what: 'yong' }), nib90: () => start({ mode: 'pen', what: 'word', deg: 90 }) };
  root.__lab = {
    camera, controls, state, scene, pen, start, setSpeed, setPlaying, setCam, penTimeline: () => P,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const tl = document.querySelector('[data-cal-tool]');
  if (tl) initTool(tl);
  const np = document.querySelector('[data-cal-nibpad]');
  if (np) initNibPad(np);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, YONG);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calpens-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
