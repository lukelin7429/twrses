/*
 * 書法 · 第十三課「抄經」的 3D 模型（寫字引擎示範，全部自繪示意）。
 *
 * 書桌上一張畫了直行界線（烏絲欄）的紙，毛筆把〈心經〉的一句「色即是空，空即是色」一格一個字寫上去：
 * 由上到下、由右到左（第一行在最右邊）。一個機制：**慢而勻**——每個字一樣大、都在格子中間、速度平均。
 *   data-mode="steady"   慢而勻（每個字一樣大、置中）
 *   data-mode="rushed"   趕著寫（示意：字有大有小、歪、偏、線細）——兩種寫完都留在右側的對照圖裡
 *   data-speed           播放速度（1×、2×、4×；抄經本來就慢，所以多給快轉）
 *   data-cam             near｜top｜tip
 * 右側：寫了幾個字、花了幾秒、照這個速度抄完整部〈心經〉（root 的 data-total 個字）要幾分鐘、整齊度（sutra2d.js 的 evenness，示意）。
 * 呼吸圈（.cg-breath）只是節奏提示：四秒吸、四秒吐（CSS 動畫＋文字），和寫字的時間軸無關。
 * 字是自己畫的楷書（strokes/xin|se|ji|shi4|kong.json，筆順依教育部）；縮小排進格子是 sutra2d.js 的 page()。毛筆畫得比抄經用的小楷筆大，是示意。
 * 2D（不需要 WebGL）：「下一個字寫在哪一格？」（sutra2d.js）、練字板（pad.js：心色即是空，碼表）。
 *
 * 產物：cd tools/callig && npm run build → assets/js/cal-sutra.js
 * 除錯：document.querySelector('[data-calsutra-lab]').__lab
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PCFShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { initPad } from './pad.js';
import { CH, GRID, LINE, cellOf, drawRules, initOrder, page } from './sutra2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const SHEET = { w: 3.0, h: 4.0, z: 0.3, box: 3.7 };
const SEQ0 = 0.6;
const GLYPH = { xin: '心', se: '色', ji: '即', shi4: '是', kong: '空' };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const TOTAL = Number(root.getAttribute('data-total') || 260);
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
  scene.add(new HemisphereLight(0xfff4e0, 0x2a2018, 0.85));
  scene.add(new AmbientLight(0xffffff, 0.18));
  const sun = new DirectionalLight(0xfff1dc, 1.5);
  sun.position.set(-4, 9, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 5, bottom: -4, near: 1, far: 30 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  makeDesk(scene, { w: 9, d: 6.4, felt: [0, SHEET.z, 4.2, 4.8], weight: [0, SHEET.z - SHEET.h / 2 - 0.02, 2.2], stone: [3.3, -0.4] });
  const paper = makePaper({ w: SHEET.w, h: SHEET.h, x: 0, y: 0.016, z: SHEET.z, box: SHEET.box, boxCenter: [-0.05, SHEET.z + 0.08], grid: false, ppu: 420 });
  paper.mesh.receiveShadow = true; scene.add(paper.mesh);
  paper.setUnder((g, T) => drawRules(g, T));
  const brush = makeBrush({ hair: 'weasel' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group); brush.setInk(1);

  const lab = labeler($('.al-labels'), cv, camera);
  const lbStart = lab.add('cg-lb cg-lb-t', 'Start here<small>從這裡開始</small>');
  const lbC1 = lab.add('cg-lb cg-lb-m', '1st column<small>第一行</small>');
  const lbC2 = lab.add('cg-lb cg-lb-m', '2nd column<small>第二行</small>');

  const R = { play: $('.al-play'), msg: $('.cg-su-msg'), n: $('.cg-su-n'), ch: $('.cg-su-ch'), sec: $('.cg-su-sec'), whole: $('.cg-su-whole'), even: $('.cg-su-even') };
  const PAGES = { steady: page(LINE, { mode: 'steady' }), rushed: page(LINE, { mode: 'rushed' }) };
  const state = { mode: 'steady', playing: true, labels: true, speed: 1, t: 0, cam: 'near', cur: -1 };
  let writer = null, P = PAGES.steady;

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const tipCam = () => state.cam === 'tip';
  function goHome(instant) {
    if (tipCam()) { controls.enabled = false; fly.t = 1; return; }
    controls.enabled = true;
    const top = state.cam === 'top', t = V(0, 0.05, SHEET.z + (top ? 0 : 0.1));
    flyTo(t.clone().add((top ? V(0, 1, 0.02) : V(0, 0.92, 0.4)).normalize().multiplyScalar(fit(3.7, top ? 4.5 : 4.6))), t, instant);
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
  const perChar = () => writer.duration / LINE.length;
  const wholeMin = () => Math.round((perChar() * TOTAL) / 60);

  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    P = PAGES[state.mode];
    state.t = 0; state.cur = -1;
    paper.clearInk();
    writer = makeWriter(paper, P.char);
    press('[data-mode]', 'data-mode', state.mode);
    root.dataset.mode = state.mode;
    if (R.n) R.n.textContent = '0'; if (R.ch) R.ch.textContent = '—'; if (R.sec) R.sec.textContent = '0 s';
    if (R.whole) R.whole.innerHTML = `${wholeMin()} min<small>${wholeMin()} 分鐘</small>`;
    if (R.even) R.even.textContent = `${P.evenness}%`;
    if (R.msg) R.msg.innerHTML = state.mode === 'steady'
      ? 'One character in each square, top to bottom. Watch how every character is the same size.<span class="zh">一格一個字，由上往下。看看每個字是不是一樣大。</span>'
      : 'Now in a hurry. Watch what happens to the size and the place of each character.<span class="zh">現在趕著寫。看看每個字的大小和位置變成什麼樣子。</span>';
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => start({ mode: b.getAttribute('data-mode'), fly: false })));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => start({ fly: false })));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  let announced = false, lastSec = -1;
  function step(dt) {
    state.t += (state.playing ? dt : 0) * state.speed;
    const tw = state.t - SEQ0, dur = writer.duration;
    if (tw < 0) placeBrush(brush, paper, writer.poseAt(0), (1 - state.t / SEQ0) * 0.4);
    else {
      const pose = writer.poseAt(Math.min(tw, dur)), over = tw - dur;
      placeBrush(brush, paper, over > 0 ? { ...pose, p: 0 } : pose, over > 0 ? ease(over / 0.7) * 0.5 : pose.hover * 0.3);
      writer.drawTo(tw);
      if (over < 0) {
        const ci = P.cells.findIndex((c) => pose.n >= c.from && pose.n <= c.to);
        if (ci !== state.cur && ci >= 0) { state.cur = ci; if (R.n) R.n.textContent = String(ci + 1); if (R.ch) R.ch.textContent = GLYPH[P.cells[ci].key]; }
        const sec = Math.floor(tw);
        if (sec !== lastSec) { lastSec = sec; if (R.sec) R.sec.textContent = `${sec} s`; }
        announced = false;
      } else if (!announced) {
        announced = true;
        if (R.n) R.n.textContent = String(LINE.length); if (R.sec) R.sec.textContent = `${Math.round(dur)} s`;
        const m = wholeMin();
        if (R.msg) R.msg.innerHTML = state.mode === 'steady'
          ? `Eight characters in ${Math.round(dur)} seconds. At this pace, the whole Heart Sutra (${TOTAL} characters) would take about ${m} minutes. Every character sits in the middle of its square.<span class="zh">八個字寫了 ${Math.round(dur)} 秒。照這個速度，抄完整部〈心經〉（${TOTAL} 個字）大約要 ${m} 分鐘。每個字都在格子的正中間。</span>`
          : `Faster: about ${m} minutes for the whole sutra. But look at the page: some characters are big, some are small, and some lean out of their squares.<span class="zh">比較快：整部經大約 ${m} 分鐘。可是看看這一頁：字有大有小，有的還歪出格子。</span>`;
      }
      if (tw > dur + 2.5) state.t = SEQ0 + dur + 2.5;
    }
    if (tipCam()) {
      const c = brush.tipWorld(V(0, 0, 0));
      const want = c.clone().add(V(-0.5, 0.42, 0.8)), look = c.clone().add(V(0.08, 0.06, 0));
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
  }
  function labels() {
    const on = state.labels && !tipCam();
    const cols = on && !root.classList.contains('cg-narrow');   // 手機上畫面窄，行的標籤會撞到角度按鈕
    lbStart.hidden = !(on && state.cur < 1); lbC1.hidden = !cols; lbC2.hidden = !cols;
    if (!on) return;
    const a = cellOf(0), b = cellOf(GRID.rows);
    if (state.cur < 1) lab.place(lbStart, paper.world(a.cx + 210, a.cy - 40));
    if (cols) lab.place(lbC1, paper.world(a.cx, GRID.y0 - 58));
    if (cols) lab.place(lbC2, paper.world(b.cx, GRID.y0 - 58));
  }

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (controls.enabled) controls.update();
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
  start({ mode: 'steady', instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = { steady: () => start({ mode: 'steady', fly: false }), rushed: () => start({ mode: 'rushed', fly: false }) };
  root.__lab = {
    camera, controls, state, scene, PAGES, start, setSpeed, setPlaying, setCam, perChar, wholeMin,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (controls.enabled) controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function initBreath() {
  document.querySelectorAll('.cg-breath').forEach((el) => {
    const t = el.querySelector('.cg-breath-t');
    if (!t) return;
    let on = true;
    const show = () => { t.innerHTML = on ? 'Breathe in<small>吸氣</small>' : 'Breathe out<small>吐氣</small>'; on = !on; };
    show(); setInterval(show, 4000);
  });
}
function init2D() {
  initBreath();
  const od = document.querySelector('[data-cal-order]');
  if (od) initOrder(od);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, CH[padEl.getAttribute('data-char')] || CH.xin, CH);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calsutra-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
