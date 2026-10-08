/*
 * 書法 · 第十五課「毛筆字和硬筆字」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**線變細了，結構還在**。書桌上並排兩張紙、兩種筆，同時寫同一個字、走同一條中心線（同一份筆畫資料）：
 *   左：毛筆（寫字引擎）。線的粗細跟著提按變。
 *   右：鉛筆。線從頭到尾一樣粗（pencil.js 的 PENCIL_W），位置、筆順、筆畫數和左邊完全一樣。
 *   data-mode="both|brush|pencil"   一起看，或鏡頭飛到其中一張
 *   data-ch="yong|xin|chun"         換一個字
 *   data-t="shadow"                 在鉛筆字底下墊一層淡淡的毛筆字——看兩者疊不疊得起來
 * 右側：現在寫到第幾筆、毛筆按多重和線寬、鉛筆線寬；一張表（筆畫數、路線長度、最粗、最細）。
 * 鉛筆的線用 paper.setUnder 重畫（折線，不是毛筆的印子）。
 * 2D（不需要 WebGL）：卡片小圖、「把粗細拿掉」滑桿、「哪一筆寫歪了？」（pencil2d.js）、練字板（pad.js：毛筆／鉛筆兩種筆）。
 *
 * 產物：cd tools/callig && npm run build → assets/js/cal-pencil.js
 * 除錯：document.querySelector('[data-calpencil-lab]').__lab
 */
import {
  AmbientLight, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp, footprint } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { drawStamps } from './ink2d.js';
import { initPad } from './pad.js';
import { PENCIL_W, pathLength, widthRange } from './pencil.js';
import { CHARS, drawLine, drawMinis, initSlim, initSpot } from './pencil2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const SHEET = { xs: [-1.72, 1.72], z: 0.45, w: 3.0, h: 3.3, box: 2.5, cm: 25 };
const SEQ0 = 0.6;
const cm = (u) => (u / 1000) * SHEET.cm;

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
  const mk = (x) => { const p = makePaper({ w: SHEET.w, h: SHEET.h, x, y: 0.016, z: SHEET.z, box: SHEET.box, boxCenter: [x, SHEET.z + 0.07], grid: true }); p.mesh.receiveShadow = true; scene.add(p.mesh); return p; };
  const paperB = mk(SHEET.xs[0]), paperP = mk(SHEET.xs[1]);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group); brush.setInk(1);

  // 鉛筆：原點在筆尖；裡面那一層往右後方倒（像右手拿筆）
  const pencil = new Group(), pcIn = new Group(); pencil.add(pcIn); pcIn.rotation.set(0.62, 0, -0.42);
  {
    const r = 0.052, mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.55, ...o });
    const lead = new Mesh(new CylinderGeometry(0.016, 0.002, 0.07, 12), mat(0x2c2e33, { roughness: 0.35, metalness: 0.3 })); lead.position.y = 0.035;
    const wood = new Mesh(new CylinderGeometry(r, 0.016, 0.2, 6), mat(0xd9b384)); wood.position.y = 0.17;
    const body = new Mesh(new CylinderGeometry(r, r, 1.5, 6), mat(0xe8b923, { roughness: 0.4 })); body.position.y = 1.02;
    const ring = new Mesh(new CylinderGeometry(r * 1.04, r * 1.04, 0.12, 16), mat(0xb9bec8, { roughness: 0.3, metalness: 0.8 })); ring.position.y = 1.83;
    const rub = new Mesh(new CylinderGeometry(r * 0.96, r * 0.96, 0.12, 16), mat(0xe58a8a, { roughness: 0.8 })); rub.position.y = 1.95;
    pcIn.add(lead, wood, body, ring, rub);
  }
  pencil.traverse((m) => { if (m.isMesh) m.castShadow = true; }); scene.add(pencil);

  const lab = labeler($('.al-labels'), cv, camera);
  const lbB = lab.add('cg-lb cg-lb-m cg-lb-race cg-lb-yan', '<b>毛筆</b> Brush');
  const lbP = lab.add('cg-lb cg-lb-m cg-lb-race cg-lb-liu', '<b>鉛筆</b> Pencil');

  const R = { play: $('.al-play'), msg: $('.cg-pencil-msg'), n: $('.cg-pencil-n'), nm: $('.cg-pencil-nm'), bp: $('.cg-pencil-bp'), bw: $('.cg-pencil-bw'), pw: $('.cg-pencil-pw') };
  const cell = (row, who) => $(`[data-cell="${row}-${who}"]`);
  const state = { mode: 'both', ch: 'yong', shadow: false, playing: true, labels: true, speed: 1, t: 0, cam: 'near', bp: 0, n: -1 };
  let writer = null, drawn = -1;

  /** 鉛筆線：照毛筆同一批取樣點（writer.strokes[i].s），畫到 tw 秒為止 */
  function drawPencil(tw) {
    const spans = writer.spans();
    const counts = spans.map((sp) => { const k = writer.strokes[sp.i], local = tw - sp.t0; let n = 0; while (n < k.s.length && k.s[n].t <= local) n++; return n; });
    const total = counts.reduce((a, b) => a + b, 0) + (state.shadow ? 1e6 : 0);
    if (total === drawn) return;
    drawn = total;
    paperP.setUnder((g, T) => {
      if (state.shadow) for (const k of writer.strokes) drawStamps(g, k.sts, T, { color: 'rgb(120,120,120)', alpha: 0.3 });
      spans.forEach((sp, j) => drawLine(g, T, writer.strokes[sp.i].s, { upTo: counts[j] }));
    });
  }

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const fx = () => (state.mode === 'brush' ? SHEET.xs[0] : state.mode === 'pencil' ? SHEET.xs[1] : null);
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    const x = fx(), top = state.cam === 'top';
    const t = x === null ? V(0, top ? 0 : 0.1, SHEET.z + 0.05) : V(x, top ? 0 : 0.15, SHEET.z + 0.1);
    const d = top ? V(0, 1, 0.02) : x === null ? V(0, 0.9, 0.44) : V(-0.1, 0.86, 0.5);
    flyTo(d.normalize().multiplyScalar(fit(x === null ? 7.0 : 3.9, x === null ? 3.9 : 3.7)).add(t), t, instant);
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
  function table() {
    const c = CHARS[state.ch], r = widthRange(writer.strokes.flatMap((k) => k.sts)), L = `${Math.round(cm(pathLength(c)))} cm`;
    cell('n', 'brush').textContent = String(c.strokes.length); cell('n', 'pencil').textContent = String(c.strokes.length);
    cell('len', 'brush').textContent = L; cell('len', 'pencil').textContent = L;
    cell('max', 'brush').textContent = `${cm(r.max).toFixed(1)} cm`; cell('min', 'brush').textContent = `${cm(r.min).toFixed(1)} cm`;
    cell('max', 'pencil').textContent = `${cm(PENCIL_W).toFixed(1)} cm`; cell('min', 'pencil').textContent = `${cm(PENCIL_W).toFixed(1)} cm`;
    return r;
  }

  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    if (opts.ch && CHARS[opts.ch]) state.ch = opts.ch;
    if (opts.shadow !== undefined) { state.shadow = !!opts.shadow; const el = $('[data-t="shadow"]'); if (el) el.checked = state.shadow; }
    state.t = 0; state.n = -1; drawn = -1;
    paperB.clearInk();
    writer = makeWriter(paperB, CHARS[state.ch]);
    drawPencil(-1);
    press('[data-mode]', 'data-mode', state.mode); press('[data-ch]', 'data-ch', state.ch);
    root.dataset.mode = state.mode;
    table();
    if (R.msg) R.msg.innerHTML = 'Two tools, one path. Watch where each stroke starts and where it ends.<span class="zh">兩種筆，走同一條路線。看看每一筆從哪裡開始、到哪裡結束。</span>';
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }
  function finish() {
    if (!R.msg) return;
    const c = CHARS[state.ch], r = widthRange(writer.strokes.flatMap((k) => k.sts));
    R.msg.innerHTML = `Both wrote ${c.char} in ${c.strokes.length} strokes, in the same order, along the same ${Math.round(cm(pathLength(c)))} cm of path. The brush line went from ${cm(r.min).toFixed(1)} to ${cm(r.max).toFixed(1)} cm wide. The pencil line stayed at ${cm(PENCIL_W).toFixed(1)} cm.${state.shadow ? '' : ' Turn on the brush shadow to see how they line up.'}`
      + `<span class="zh">兩種筆都用 ${c.strokes.length} 筆寫完「${c.char}」，筆順一樣，走的路線一樣長（${Math.round(cm(pathLength(c)))} 公分）。毛筆的線從 ${cm(r.min).toFixed(1)} 公分變到 ${cm(r.max).toFixed(1)} 公分寬；鉛筆的線一直是 ${cm(PENCIL_W).toFixed(1)} 公分。${state.shadow ? '' : '打開「毛筆的影子」，看看兩個字疊不疊得起來。'}</span>`;
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => start({ mode: b.getAttribute('data-mode') })));
  $$('[data-ch]').forEach((b) => b.addEventListener('click', () => start({ ch: b.getAttribute('data-ch'), fly: false })));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => start({ fly: false })));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });
  const shd = $('[data-t="shadow"]');
  if (shd) shd.addEventListener('change', () => { state.shadow = shd.checked; drawn = -1; drawPencil(state.t - SEQ0); if (announced) finish(); });

  let announced = false, lastUi = 0;
  function step(dt) {
    state.t += (state.playing ? dt : 0) * state.speed;
    const tw = state.t - SEQ0, total = writer.duration;
    const pose = writer.poseAt(clamp(tw, 0, total)), over = tw - total;
    const lift = tw < 0 ? (1 - state.t / SEQ0) * 0.4 : over > 0 ? ease(over / 0.7) * 0.45 : pose.hover * 0.3;
    placeBrush(brush, paperB, tw < 0 || over > 0 ? { ...pose, p: 0 } : pose, lift);
    if (tw >= 0) writer.drawTo(tw);
    const w = paperP.world(pose.x, pose.y);
    pencil.position.set(w.x, paperP.y + 0.004 + lift, w.z);
    drawPencil(tw);
    state.bp = tw < 0 || over > 0 ? 0 : pose.p;
    const down = tw >= 0 && over <= 0 && pose.hover === 0;
    if (state.t - lastUi > 0.08 || dt === 0) {
      lastUi = state.t;
      const c = CHARS[state.ch], n = tw < 0 ? 0 : Math.min(c.strokes.length, pose.n + 1), st = c.strokes[Math.max(0, n - 1)];
      if (R.n) R.n.textContent = `${n} / ${c.strokes.length}`;
      if (R.nm) R.nm.textContent = n ? `${st.en} · ${st.zh}` : '—';
      if (R.bp) R.bp.textContent = `${Math.round(state.bp * 100)}%`;
      const f = footprint(state.bp);
      if (R.bw) R.bw.textContent = down && f ? `${cm(f.hw * 2).toFixed(1)} cm` : '—';
      if (R.pw) R.pw.textContent = down ? `${cm(PENCIL_W).toFixed(1)} cm` : '—';
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
    lbB.hidden = !(on && state.mode !== 'pencil'); lbP.hidden = !(on && state.mode !== 'brush');
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
  start({ mode: 'both', ch: 'yong', instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = { brush: () => start({ mode: 'brush' }), pencil: () => start({ mode: 'pencil', shadow: false }), both: () => start({ mode: 'pencil', shadow: true }), order: () => { start({ mode: 'both' }); setSpeed(0.5); } };
  root.__lab = {
    camera, controls, state, scene, pencil, start, setSpeed, setPlaying, setCam, writer: () => writer,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const sl = document.querySelector('[data-cal-slim]');
  if (sl) initSlim(sl);
  const sp = document.querySelector('[data-cal-spot]');
  if (sp) initSpot(sp);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, CHARS[padEl.getAttribute('data-char')] || CHARS.yong, CHARS);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calpencil-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
