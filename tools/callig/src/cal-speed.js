/*
 * 書法 · 第七課「楷書、行書、草書：同一個字，三種速度」的 3D 模型（寫字引擎示範，全部自繪示意）。
 *
 * 書桌上並排三張紙，三枝毛筆同時寫同一個字：左邊楷書、中間行書、右邊草書（data-mode="race"，一起出發）。
 * 每張紙上方的標籤即時顯示花了幾秒，最先寫完的那一張亮起來；右側表格列出筆數、提筆次數、墨線長、時間。
 * 也可以一次只看一種（data-mode="kai|xing|cao"）：鏡頭飛到那張紙，另外兩張直接顯示寫好的字。
 * 行書寫到牽絲（筆沒有完全離紙的細線）時，紙上標出「牽絲」。
 * 時間是模型算的（speed2d.js 的 stats）：楷書每一筆都有起筆、收筆，筆和筆之間要提筆（一次 0.82 秒）；
 * 行書把筆畫連起來、草書把筆畫合併簡化，所以比較快——不是真人寫字量出來的。
 * 字形：楷書依教育部筆順；行書、草書是自己描的（對位參考神龍本〈蘭亭序〉與故宮藏智永〈真草千字文〉拓本）。
 * 2D（不需要 WebGL）：卡片小圖、「這是哪一種字體？」（speed2d.js）、練字板＋碼表（pad.js）。
 *
 * 座標同 brush3d.js。產物：cd tools/callig && npm run build → assets/js/cal-speed.js
 * 除錯：document.querySelector('[data-calspeed-lab]').__lab
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
import { CHAR_KEYS, FORMS, SCRIPTS, drawMinis, initScripts, stats, threadRuns } from './speed2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const NAME = { kai: { en: 'Regular', zh: '楷書' }, xing: { en: 'Running', zh: '行書' }, cao: { en: 'Cursive', zh: '草書' } };
const SHEET = { xs: [-2.95, 0, 2.95], z: 0.45, w: 2.6, h: 3.0, box: 2.1, cm: 21 };   // 字框 21 公分
const SEQ0 = 0.6;

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
  Object.assign(sun.shadow.camera, { left: -6.5, right: 6.5, top: 4, bottom: -4, near: 1, far: 25 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  const D = makeDesk(scene, { w: 11.2, d: 6.2, felt: [0, SHEET.z, 9.3, 3.6], weight: [0, SHEET.z - SHEET.h / 2 + 0.16, 2.0], stone: null });
  for (const x of [SHEET.xs[0], SHEET.xs[2]]) { const w = D.weight.clone(); w.position.x = x; scene.add(w); }   // 三張紙各一個紙鎮
  const sheets = SHEET.xs.map((x, i) => {
    const paper = makePaper({ w: SHEET.w, h: SHEET.h, x, y: 0.016, z: SHEET.z, box: SHEET.box, boxCenter: [x, SHEET.z + 0.07], grid: true });
    paper.mesh.receiveShadow = true; scene.add(paper.mesh);
    const brush = makeBrush({ hair: 'mixed' });
    brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
    scene.add(brush.group); brush.setInk(1);
    return { i, sc: SCRIPTS[i], x, paper, brush, writer: null, st: null, dur: 0, done: false };
  });

  const lab = labeler($('.al-labels'), cv, camera);
  sheets.forEach((s) => { s.label = lab.add('cg-lb cg-lb-m cg-lb-race', ''); });
  const threadLb = lab.add('cg-lb cg-lb-k', 'Thread<small>牽絲</small>');
  threadLb.hidden = true;

  const R = { play: $('.al-play'), msg: $('.cg-race-msg') };
  const cell = (row, sc) => $(`[data-cell="${row}-${sc}"]`);
  const state = { mode: 'race', char: 'yong', playing: true, labels: true, speed: 1, t: 0, cam: 'near', winner: null, thread: null };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const active = () => (state.mode === 'race' ? sheets : sheets.filter((s) => s.sc === state.mode));
  const focus = () => (state.mode === 'race' ? null : sheets.find((s) => s.sc === state.mode));
  const HOMES = {
    near: () => { const f = focus(); return f ? { t: V(f.x, 0.15, SHEET.z + 0.12), d: V(-0.2, 0.8, 0.6), w: 2.9, h: 3.1 } : { t: V(0, 0.1, SHEET.z + 0.05), d: V(0, 0.9, 0.44), w: 9.9, h: 3.7 }; },
    top: () => { const f = focus(); return f ? { t: V(f.x, 0, SHEET.z), d: V(0, 1, 0.02), w: 2.8, h: 3.1 } : { t: V(0, 0, SHEET.z), d: V(0, 1, 0.02), w: 9.3, h: 3.3 }; },
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const tipCam = () => state.cam === 'tip' && state.mode !== 'race';
  function goHome(instant) {
    if (tipCam()) { controls.enabled = false; fly.t = 1; return; }
    controls.enabled = true;
    const H = HOMES[state.cam === 'top' ? 'top' : 'near']();
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

  /** 換模式或換字：從頭開始 */
  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    if (opts.char) state.char = opts.char;
    state.t = 0; state.winner = null;
    const act = active();
    sheets.forEach((s) => {
      const char = FORMS[state.char][s.sc];
      s.paper.clearInk();
      s.writer = makeWriter(s.paper, char);
      s.st = stats(char); s.dur = s.writer.duration; s.done = false;
      if (!act.includes(s)) { s.writer.drawTo(s.dur + 1); s.done = true; }   // 沒在寫的那幾張：直接顯示寫好的字
      cell('n', s.sc).textContent = String(s.st.strokes);
      cell('lift', s.sc).textContent = String(s.st.lifts);
      cell('len', s.sc).textContent = `${Math.round((s.st.len / 1000) * SHEET.cm)} cm`;
      cell('time', s.sc).textContent = act.includes(s) ? '0.0 s' : `${s.dur.toFixed(1)} s`;
      cell('time', s.sc).classList.toggle('done', !act.includes(s));
      cell('time', s.sc).classList.remove('win');
    });
    // 牽絲的標籤：行書那張，第一段牽絲寫完才出現
    const xs = sheets[1], runs = threadRuns(FORMS[state.char].xing);
    state.thread = null;
    if (runs.length) {
      const r = runs.reduce((a, b) => (b.mid.y > a.mid.y ? b : a)), span = xs.writer.spans()[r.stroke];   // 選最下面那一段，離上方的字體標籤遠一點
      state.thread = { at: span.t0 + r.mid.t, pos: xs.paper.world(r.mid.x, r.mid.y) };
    }
    if (R.msg) R.msg.innerHTML = state.mode === 'race'
      ? 'Three brushes, one character. Which one finishes first?<span class="zh">三枝筆寫同一個字，哪一枝最先寫完？</span>'
      : `${NAME[state.mode].en} script: watch where the brush leaves the paper.<span class="zh">${NAME[state.mode].zh}：看看毛筆在哪裡離開紙。</span>`;
    root.dataset.mode = state.mode;
    press('[data-mode]', 'data-mode', state.mode);
    press('[data-char]', 'data-char', state.char);
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }
  function finish() {
    const act = active();
    if (state.mode !== 'race' || !R.msg) return;
    const by = [...act].sort((a, b) => a.dur - b.dur), first = by[0], last = by[by.length - 1];
    R.msg.innerHTML = `${NAME[first.sc].en} script finished first: ${first.dur.toFixed(1)} seconds. ${NAME[last.sc].en} script took ${last.dur.toFixed(1)} seconds, ${(last.dur / first.dur).toFixed(1)} times as long.`
      + `<span class="zh">${NAME[first.sc].zh}最先寫完：${first.dur.toFixed(1)} 秒。${NAME[last.sc].zh}花了 ${last.dur.toFixed(1)} 秒，是它的 ${(last.dur / first.dur).toFixed(1)} 倍。</span>`;
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => start({ mode: b.getAttribute('data-mode') })));
  $$('[data-char]').forEach((b) => b.addEventListener('click', () => start({ char: b.getAttribute('data-char'), fly: false })));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => start({ fly: false })));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  // -------------------------------------------------------------------
  // 每格
  // -------------------------------------------------------------------
  let lastLabel = 0, announced = false;
  function step(dt) {
    state.t += (state.playing ? dt : 0) * state.speed;
    const tw = state.t - SEQ0, act = active();
    let allDone = true;
    sheets.forEach((s) => {
      if (!act.includes(s)) {   // 沒在寫：筆停在紙的右上方
        s.brush.group.quaternion.identity();
        s.brush.group.position.set(s.x + SHEET.w / 2 - 0.2, 0.8, SHEET.z - SHEET.h / 2 + 0.3);
        s.brush.setPose({ d: 0, dir: [1, 0], fan: 0, tilt: 0 });
        return;
      }
      if (tw < 0) { placeBrush(s.brush, s.paper, s.writer.poseAt(0), (1 - state.t / SEQ0) * 0.4); allDone = false; return; }
      const pose = s.writer.poseAt(Math.min(tw, s.dur));
      const over = tw - s.dur;
      placeBrush(s.brush, s.paper, over > 0 ? { ...pose, p: 0 } : pose, over > 0 ? ease(over / 0.7) * 0.45 : pose.hover * 0.3);
      s.writer.drawTo(tw);
      if (over >= 0 && !s.done) {
        s.done = true;
        if (!state.winner) state.winner = s.sc;
        const c = cell('time', s.sc); c.textContent = `${s.dur.toFixed(1)} s`; c.classList.add('done'); c.classList.toggle('win', state.mode === 'race' && state.winner === s.sc);
      }
      if (over < 0) allDone = false;
    });
    if (allDone && !announced) { announced = true; finish(); }
    if (!allDone) announced = false;
    const longest = Math.max(...act.map((s) => s.dur));
    if (tw > longest + 2.5) state.t = SEQ0 + longest + 2.5;
    if (tipCam()) {
      const c = focus().brush.tipWorld(V(0, 0, 0));
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
  }
  function labels(now) {
    const on = state.labels && !tipCam();
    const tw = Math.max(0, state.t - SEQ0), act = active();
    sheets.forEach((s) => {
      const mine = on && act.includes(s);   // 一次看一種時，只標那一張
      s.label.hidden = !mine;
      if (!mine) return;
      if (now - lastLabel > 90 || now === 0) {
        const running = act.includes(s) && !s.done;
        const t = running ? Math.min(tw, s.dur) : s.dur;
        const html = `<b>${NAME[s.sc].zh}</b> ${NAME[s.sc].en}<small>${t.toFixed(1)} s${running ? '' : ' ✓'}</small>`;
        if (s.label.innerHTML !== html) s.label.innerHTML = html;
        s.label.classList.toggle('on', state.mode === 'race' && state.winner === s.sc);
        if (running) { const c = cell('time', s.sc); if (c) c.textContent = `${t.toFixed(1)} s`; }
      }
      lab.place(s.label, s.paper.world(500, -150));
    });
    if (now - lastLabel > 90) lastLabel = now;
    const th = state.thread, xs = sheets[1];
    const show = on && th && (act.includes(xs) ? tw >= th.at : true) && (state.mode === 'race' || state.mode === 'xing');
    threadLb.hidden = !show;
    if (show) lab.place(threadLb, th.pos, -22);
  }

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (controls.enabled) controls.update();
    labels(t);
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
  start({ mode: 'race', char: 'yong', instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    ...Object.fromEntries(CHAR_KEYS.map((k) => [k, () => start({ char: k, fly: false })])),
    ...Object.fromEntries(['race', ...SCRIPTS].map((m) => [m, () => start({ mode: m })])),
  };
  root.__lab = {
    camera, controls, state, scene, sheets, setSpeed, setPlaying, setCam, start,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (controls.enabled) controls.update(); lastLabel = -1e9; labels(0); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const sc = document.querySelector('[data-cal-scripts]');
  if (sc) initScripts(sc);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) {
    // 練字板：三個字 × 三種寫法；兩排按鈕（字體、字）
    const PADS = {};
    for (const k of CHAR_KEYS) for (const s of SCRIPTS) PADS[`${k}-${s}`] = FORMS[k][s];
    const pad = initPad(padEl, PADS['yong-kai'], PADS);
    const cur = { ch: 'yong', sc: 'kai' };
    const apply = () => {
      pad.setChar(`${cur.ch}-${cur.sc}`);
      padEl.querySelectorAll('[data-pad-script]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pad-script') === cur.sc ? 'true' : 'false'));
      padEl.querySelectorAll('[data-pad-ch]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pad-ch') === cur.ch ? 'true' : 'false'));
    };
    padEl.querySelectorAll('[data-pad-script]').forEach((b) => b.addEventListener('click', () => { cur.sc = b.getAttribute('data-pad-script'); apply(); }));
    padEl.querySelectorAll('[data-pad-ch]').forEach((b) => b.addEventListener('click', () => { cur.ch = b.getAttribute('data-pad-ch'); apply(); }));
    apply();
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calspeed-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
