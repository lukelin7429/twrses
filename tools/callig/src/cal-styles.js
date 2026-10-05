/*
 * 書法 · 第九課「顏筋柳骨：為什麼每個書法家的字都不一樣？」的 3D 模型（寫字引擎示範，全部自繪示意）。
 *
 * 書桌上並排兩張紙、兩枝毛筆，同時寫同一個字：左邊顏真卿的寫法（顏體）、右邊柳公權的寫法（柳體）。
 * 同一筆一起下筆（每一筆等兩邊都寫完才換下一筆），右側即時畫出這一筆兩個人的提按曲線（金＝顏、藍＝柳），
 * 表格列出線條的平均粗細、最粗、最細（styles2d.js 的 widths；只算行筆，不算起筆收筆的尖）。
 * data-mode="both|yan|liu"：一起看，或鏡頭飛到其中一張；data-stroke="all|0|1|…"：整個字，或只重播某一筆（其他筆淡淡地畫在底下）。
 * 字形：兩種寫法都是自己描的中心線與壓力（對位參考顏真卿、柳公權的碑刻拓本，出處見 strokes/styles.json），不是原碑的複製。
 * 2D（不需要 WebGL）：卡片小圖、「這是誰的字？」、練字板「你的字比較像誰？」（styles2d.js、pad.js）。
 *
 * 座標同 brush3d.js。產物：cd tools/callig && npm run build → assets/js/cal-styles.js
 * 除錯：document.querySelector('[data-calstyles-lab]').__lab
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PCFShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp, forceCurve } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { drawCompare, drawStamps } from './ink2d.js';
import { initPad } from './pad.js';
import { CHAR_KEYS, MASTERS, NAME, STY, drawMinis, form, initLike, initWho, prep, widths } from './styles2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const SHEET = { xs: [-1.72, 1.72], z: 0.45, w: 3.0, h: 3.3, box: 2.5, cm: 25 };   // 字框 25 公分
const SEQ0 = 0.6, GAP = 0.82;
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
  const sheets = SHEET.xs.map((x, i) => {
    const paper = makePaper({ w: SHEET.w, h: SHEET.h, x, y: 0.016, z: SHEET.z, box: SHEET.box, boxCenter: [x, SHEET.z + 0.07], grid: true });
    paper.mesh.receiveShadow = true; scene.add(paper.mesh);
    const brush = makeBrush({ hair: 'mixed' });
    brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
    scene.add(brush.group); brush.setInk(1);
    return { i, who: MASTERS[i], x, paper, brush, writer: null, spans: [], durs: [] };
  });

  const lab = labeler($('.al-labels'), cv, camera);
  sheets.forEach((s) => { s.label = lab.add(`cg-lb cg-lb-m cg-lb-race cg-lb-${s.who}`, `<b>${NAME[s.who].zh}</b> ${NAME[s.who].en}`); });

  const R = { play: $('.al-play'), msg: $('.cg-sty-msg'), curve: $('.cg-sty-curve'), curveK: $('.cg-sty-curve-k'), strokes: $('.cg-sty-strokes') };
  const cell = (row, who) => $(`[data-cell="${row}-${who}"]`);
  const state = { mode: 'both', char: CHAR_KEYS[0], stroke: 'all', playing: true, labels: true, speed: 1, t: 0, cam: 'near', cur: -1, total: 0, starts: [], plan: [] };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const focus = () => (state.mode === 'both' ? null : sheets.find((s) => s.who === state.mode));
  const HOMES = {
    near: () => { const f = focus(); return f ? { t: V(f.x, 0.15, SHEET.z + 0.12), d: V(-0.2, 0.8, 0.6), w: 3.2, h: 3.4 } : { t: V(0, 0.1, SHEET.z + 0.05), d: V(0, 0.9, 0.44), w: 7.0, h: 3.9 }; },
    top: () => { const f = focus(); return f ? { t: V(f.x, 0, SHEET.z), d: V(0, 1, 0.02), w: 3.1, h: 3.4 } : { t: V(0, 0, SHEET.z), d: V(0, 1, 0.02), w: 6.7, h: 3.6 }; },
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  const tipCam = () => state.cam === 'tip' && state.mode !== 'both';
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

  // ---------- 這一筆的提按曲線（金＝顏、藍＝柳） ----------
  function drawCurve(k) {
    if (!R.curve) return;
    const css = R.curve.clientWidth || 260, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(css * dpr), h = Math.round((R.curve.clientHeight || 110) * dpr);
    if (R.curve.width !== w || R.curve.height !== h) { R.curve.width = w; R.curve.height = h; }
    const g = R.curve.getContext('2d');
    const idx = state.plan[Math.max(0, k)] ?? 0;
    const y = prep(form(state.char, 'yan'))[idx], l = prep(form(state.char, 'liu'))[idx];
    drawCompare(g, w, h, forceCurve(y.s), forceCurve(l.s));
    const st = form(state.char, 'yan').strokes[idx];
    if (R.curveK) R.curveK.innerHTML = `Stroke ${idx + 1}: ${st.en}<span class="zh">第 ${idx + 1} 筆：${st.zh}</span>`;
  }

  /** 換模式、換字或換筆：從頭開始 */
  function start(opts = {}) {
    if (opts.mode) state.mode = opts.mode;
    if (opts.char) { state.char = opts.char; state.stroke = 'all'; }
    if (opts.stroke !== undefined) state.stroke = opts.stroke;
    const n = STY[state.char].yan.strokes.length;
    state.plan = state.stroke === 'all' ? [...Array(n).keys()] : [Number(state.stroke)];
    state.t = 0; state.cur = -1;
    if (R.strokes) {   // 換了字，筆畫按鈕也要換
      const names = STY[state.char].yan.strokes;
      R.strokes.innerHTML = `<button type="button" data-stroke="all">All<small>整個字</small></button>` + names.map((st, i) => `<button type="button" data-stroke="${i}">${i + 1}<small>${st.zh}</small></button>`).join('');
      R.strokes.querySelectorAll('[data-stroke]').forEach((b) => b.addEventListener('click', () => start({ stroke: b.getAttribute('data-stroke') === 'all' ? 'all' : Number(b.getAttribute('data-stroke')), fly: false })));
    }
    sheets.forEach((s) => {
      const full = form(state.char, s.who);
      const char = state.stroke === 'all' ? full : { ...full, strokes: [full.strokes[state.plan[0]]] };
      s.paper.clearInk();
      s.paper.setUnder(state.stroke === 'all' ? null : (g, T) => {   // 只看一筆：其他筆淡淡地畫在底下
        const tmp = document.createElement('canvas'); tmp.width = g.canvas.width; tmp.height = g.canvas.height;
        const gt = tmp.getContext('2d');
        prep(full).forEach((m, i) => { if (i !== state.plan[0]) drawStamps(gt, m.sts, T, { color: '#151311' }); });
        g.globalAlpha = 0.16; g.drawImage(tmp, 0, 0); g.globalAlpha = 1;
      });
      s.writer = makeWriter(s.paper, char);
      s.spans = s.writer.spans(); s.durs = s.spans.map((p) => p.t1 - p.t0);
      const w = widths(full);
      cell('avg', s.who).textContent = `${cm(w.avg).toFixed(1)} cm`;
      cell('max', s.who).textContent = `${cm(w.max).toFixed(1)} cm`;
      cell('min', s.who).textContent = `${cm(w.min).toFixed(1)} cm`;
    });
    // 兩邊同一筆一起下筆：第 i 筆的起點＝前一筆兩邊都寫完＋提筆
    state.starts = []; let T = 0;
    state.plan.forEach((_, i) => { state.starts.push(T); T += Math.max(sheets[0].durs[i], sheets[1].durs[i]) + GAP; });
    state.total = T - GAP;
    if (R.msg) R.msg.innerHTML = 'Two brushes, one character. Watch where each line gets thick and thin.<span class="zh">兩枝筆寫同一個字。看看每一筆哪裡粗、哪裡細。</span>';
    root.dataset.mode = state.mode;
    press('[data-mode]', 'data-mode', state.mode);
    press('[data-char]', 'data-char', state.char);
    press('[data-stroke]', 'data-stroke', state.stroke);
    $$('[data-sty-from]').forEach((el) => { el.textContent = STY[state.char][el.getAttribute('data-sty-from')].from; });
    drawCurve(0);
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }
  function finish() {
    if (!R.msg) return;
    const y = cm(widths(form(state.char, 'yan')).avg).toFixed(1), l = cm(widths(form(state.char, 'liu')).avg).toFixed(1);
    const k = (Number(y) / Number(l)).toFixed(1);   // 用畫面上那兩個（四捨五入後的）數字算，學生自己除一除才對得起來
    R.msg.innerHTML = `Yan’s lines average ${y} cm wide; Liu’s average ${l} cm. Yan’s are ${k} times as thick.`
      + `<span class="zh">顏真卿的線條平均 ${y} 公分寬，柳公權的平均 ${l} 公分——顏的是柳的 ${k} 倍粗。</span>`;
  }
  /** 全域時間 → 這張紙的寫字員時間（每一筆等兩邊都寫完才一起換下一筆） */
  function local(s, tw) {
    let i = 0;
    while (i < state.starts.length - 1 && tw >= state.starts[i + 1]) i++;
    const u = tw - state.starts[i], sp = s.spans[i];
    if (u <= s.durs[i]) return { t: sp.t0 + Math.max(0, u), i };
    const nextT0 = s.spans[i + 1] ? s.spans[i + 1].t0 : sp.t1;
    return { t: Math.min(sp.t1 + (u - s.durs[i]), Math.max(sp.t1, nextT0 - 0.02)), i, wait: true };
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

  let announced = false;
  function step(dt) {
    state.t += (state.playing ? dt : 0) * state.speed;
    const tw = state.t - SEQ0;
    const done = tw >= state.total;
    sheets.forEach((s) => {
      if (tw < 0) { placeBrush(s.brush, s.paper, s.writer.poseAt(0), (1 - state.t / SEQ0) * 0.4); return; }
      if (done) {
        const pose = s.writer.poseAt(s.writer.duration);
        s.writer.drawTo(s.writer.duration + 1);
        placeBrush(s.brush, s.paper, { ...pose, p: 0 }, ease((tw - state.total) / 0.7) * 0.45);
        return;
      }
      const L = local(s, tw);
      const pose = s.writer.poseAt(L.t);
      placeBrush(s.brush, s.paper, L.wait ? { ...pose, p: 0 } : pose, L.wait ? Math.max(0.12, pose.hover * 0.3) : pose.hover * 0.3);
      s.writer.drawTo(L.wait ? s.spans[L.i].t1 + 0.001 : L.t);
      if (s.i === 0 && L.i !== state.cur) { state.cur = L.i; drawCurve(L.i); }
    });
    if (done && !announced) { announced = true; finish(); }
    if (!done) announced = false;
    if (tw > state.total + 2.5) state.t = SEQ0 + state.total + 2.5;
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
  function labels() {
    const on = state.labels && !tipCam();
    sheets.forEach((s) => {
      const mine = on && (state.mode === 'both' || state.mode === s.who);
      s.label.hidden = !mine;
      if (mine) lab.place(s.label, s.paper.world(500, -215));
    });
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
    drawCurve(state.cur);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1);
  start({ mode: 'both', char: CHAR_KEYS[0], instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = {
    ...Object.fromEntries(CHAR_KEYS.map((k) => [k, () => start({ char: k, fly: false })])),
    ...Object.fromEntries(['both', ...MASTERS].map((m) => [m, () => start({ mode: m })])),
  };
  root.__lab = {
    camera, controls, state, scene, sheets, setSpeed, setPlaying, setCam, start,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (controls.enabled) controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const who = document.querySelector('[data-cal-who]');
  if (who) initWho(who);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) {
    // 練字板：幾個字 × 兩種寫法；兩排按鈕（誰的寫法、字）
    const PADS = {};
    for (const k of CHAR_KEYS) for (const m of MASTERS) PADS[`${k}-${m}`] = form(k, m);
    const cur = { ch: CHAR_KEYS[0], who: 'yan' };
    const pad = initPad(padEl, PADS[`${cur.ch}-${cur.who}`], PADS);
    const like = initLike(padEl, pad, () => cur.ch);
    const apply = () => {
      pad.setChar(`${cur.ch}-${cur.who}`);
      padEl.querySelectorAll('[data-pad-who]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pad-who') === cur.who ? 'true' : 'false'));
      padEl.querySelectorAll('[data-pad-ch]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pad-ch') === cur.ch ? 'true' : 'false'));
      if (like) like();
    };
    padEl.querySelectorAll('[data-pad-who]').forEach((b) => b.addEventListener('click', () => { cur.who = b.getAttribute('data-pad-who'); apply(); }));
    padEl.querySelectorAll('[data-pad-ch]').forEach((b) => b.addEventListener('click', () => { cur.ch = b.getAttribute('data-pad-ch'); apply(); }));
    apply();
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calstyles-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
