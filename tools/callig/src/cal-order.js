/*
 * 書法 · 第四課「筆順與結構：為什麼要先橫後豎？」的 3D 模型（寫字引擎示範，全部自繪示意）。
 *
 * 教育部《常用國字標準字體筆順手冊》歸納了 17 條筆順基本法則；這裡示範其中 6 條，例字都取自教育部列的例子：
 *   lr 自左至右「川」、tb 先上後下「三」、hv 先橫後豎「十」、pn 先撇後捺「人」、mid 中間的豎先寫「小」、
 *   box 先外圍、再裡面、最後封口「日」。
 * 毛筆照標準筆順寫例字：每一筆開始時紙上出現藍色的筆順數字；筆在空中從上一筆的終點移到下一筆的起點，
 * 走過的路畫成虛線（只是讓學生看見手怎麼移動，不拿來比長短——實測倒過來寫，有的字空中路程反而比較短）。
 * 「倒過來寫」：同一個字反過來寫一次，數字變紅、畫面上方標明「不是標準筆順」；寫完的字看起來差不多，
 * 差別在過程——課文講的理由只用教育部說過的（共同的標準、筆勢、封口最後寫）。
 * 格線可以換米字格、九宮格或不要。
 * 2D：「猜下一筆」小遊戲（guess.js）與練字板（pad.js，六個例字可以換）。
 *
 * 座標同 brush3d.js。產物：cd tools/callig && npm run build → assets/js/cal-order.js
 * 除錯：document.querySelector('[data-calorder-lab]').__lab
 */
import {
  AmbientLight, BufferGeometry, Color, DirectionalLight, Float32BufferAttribute, HemisphereLight, Line,
  LineDashedMaterial, MathUtils, PCFShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { initGuess } from './guess.js';
import { initPad } from './pad.js';
import CHUAN from './strokes/chuan.json';
import REN from './strokes/ren.json';
import RI from './strokes/ri.json';
import SAN from './strokes/san.json';
import SHI from './strokes/shi.json';
import XIAO from './strokes/xiao.json';

const CHARS = { chuan: CHUAN, san: SAN, shi: SHI, ren: REN, xiao: XIAO, ri: RI };
const RULE_CHAR = { lr: 'chuan', tb: 'san', hv: 'shi', pn: 'ren', mid: 'xiao', box: 'ri' };
const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const PAPER = { x: 0, z: 0.35, w: 3.2, h: 3.8, box: 2.6, bc: [0, 0.45] };
const SEQ0 = 0.6;

/** 筆順數字放在哪裡：筆畫資料有 num 就用；沒有就放在起點的後方 50 單位 */
function numPos(st) {
  if (st.num) return st.num;
  const p = st.pts, a = p[0], b = p[Math.min(p.length - 1, 3)];
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [a[0] - ((b[0] - a[0]) / L) * 52, a[1] - ((b[1] - a[1]) / L) * 52];
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
  const paper = makePaper({ w: PAPER.w, h: PAPER.h, x: PAPER.x, y: 0.016, z: PAPER.z, box: PAPER.box, boxCenter: PAPER.bc, grid: 'jiu' });
  paper.mesh.receiveShadow = true;
  scene.add(paper.mesh);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group);
  brush.setInk(1);
  const airMat = new LineDashedMaterial({ color: 0x1f6f8b, dashSize: 0.05, gapSize: 0.035, transparent: true, opacity: 0.85 });
  let airLines = [];

  const lab = labeler($('.al-labels'), cv, camera);
  const nums = Array.from({ length: 6 }, () => lab.add('cg-lb cg-lb-num', ''));
  nums.forEach((el) => { el.hidden = true; });
  const rules = Object.fromEntries(JSON.parse(root.getAttribute('data-rules') || '[]').map((r) => [r.key, r]));

  const R = {
    play: $('.al-play'), charOut: $('.cg-char-out'), strokeOut: $('.cg-stroke-out'), rk: $('.cg-rule-k'), rt: $('.cg-rule-t'),
    why: $('.cg-rule-why'), badge: $('.cg-back-badge'),
  };
  const state = { rule: 'hv', back: false, grid: 'jiu', labels: true, cam: 'side', speed: 1, playing: true, seq: 0, lastPose: null };
  let writer = null, char = null, order = [];

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
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setCam(v) { state.cam = v; press('[data-cam]', 'data-cam', v); goHome(false); }
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }
  function setGrid(v) { state.grid = v; press('[data-grid]', 'data-grid', v); paper.setGrid(v === 'none' ? false : v); }

  /** 照目前的規則與「標準／倒過來」重寫 */
  function start() {
    char = CHARS[RULE_CHAR[state.rule]];
    order = char.strokes.map((_, i) => i);
    if (state.back) order.reverse();
    paper.clearInk();
    writer = makeWriter(paper, char, { order });
    airLines.forEach((l) => { scene.remove(l); l.geometry.dispose(); });
    airLines = [];
    // 空中的路：上一筆的終點 → 下一筆的起點（虛線，離紙面高一點）
    for (let k = 1; k < order.length; k++) {
      const a = char.strokes[order[k - 1]].pts, b = char.strokes[order[k]].pts;
      const e = a[a.length - 1], f = b[0];
      const P = paper.world(e[0], e[1]), Q = paper.world(f[0], f[1]);
      const pts = [];
      for (let i = 0; i <= 24; i++) {
        const u = i / 24;
        pts.push(P.x + (Q.x - P.x) * u, paper.y + 0.004 + Math.sin(Math.PI * u) * 0.12, P.z + (Q.z - P.z) * u);
      }
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
      const line = new Line(g, airMat); line.computeLineDistances(); line.visible = false;
      scene.add(line); airLines.push(line);
    }
    state.seq = 0;
    root.classList.toggle('cg-backward', state.back);
    press('[data-rule]', 'data-rule', state.rule);
    press('[data-back]', 'data-back', state.back ? '1' : '0');
    const r = rules[state.rule];
    if (r) {
      if (R.rk) R.rk.innerHTML = `${r.zh}<small>${r.en}</small>`;
      if (R.rt) R.rt.innerHTML = `「${r.moe_zh}」<span class="cg-rule-ex">例：${r.examples}（教育部）</span>`;
      if (R.why) R.why.innerHTML = `${r.why_en}<span class="zh">${r.why_zh}</span>`;
    }
    if (R.charOut) R.charOut.innerHTML = `${char.char} · ${char.en}<small>${char.count} strokes · ${char.count} 畫</small>`;
    setPlaying(true);
  }

  $$('[data-rule]').forEach((b) => b.addEventListener('click', () => { state.rule = b.getAttribute('data-rule'); start(); }));
  $$('[data-back]').forEach((b) => b.addEventListener('click', () => { state.back = b.getAttribute('data-back') === '1'; start(); }));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-grid]').forEach((b) => b.addEventListener('click', () => setGrid(b.getAttribute('data-grid'))));
  root.querySelectorAll('.cg-again').forEach((b) => b.addEventListener('click', () => start()));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });

  // =====================================================================
  // 每格
  // =====================================================================
  function step(dt) {
    const run = state.playing ? dt : 0;
    state.seq += run * state.speed;
    const s = state.seq;
    let pose = null;
    if (s < SEQ0) placeBrush(brush, paper, writer.poseAt(0), (1 - s / SEQ0) * 0.4);
    else {
      const tw = s - SEQ0;
      pose = writer.poseAt(Math.min(tw, writer.duration));
      const lift = tw > writer.duration ? ease((tw - writer.duration) / 0.7) * 0.45 : 0;
      placeBrush(brush, paper, tw > writer.duration ? { ...pose, p: 0 } : pose, lift + pose.hover * 0.3);
      writer.drawTo(tw);
      if (tw > writer.duration + 2) state.seq = SEQ0 + writer.duration + 2;
      // 第幾筆開始了（空中那一段算「要去的下一筆」）
      const spans = writer.spans();
      airLines.forEach((l, k) => { l.visible = tw >= spans[k].t1; });
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
  function begun() {   // 已經開始寫的筆數
    const tw = state.seq - SEQ0;
    if (tw < 0) return 0;
    return writer.spans().filter((g) => tw >= g.t0).length;
  }
  function updateLabels() {
    const n = begun();
    nums.forEach((el, k) => {
      const show = state.labels && k < n && k < order.length && state.cam !== 'tip';
      el.hidden = !show;
      if (!show) return;
      const html = String(k + 1);
      if (el.innerHTML !== html) el.innerHTML = html;
      const cls = `al-lab cg-lb cg-lb-num${state.back ? ' back' : ''}`;
      if (el.className !== cls) el.className = cls;
      const [x, y] = numPos(char.strokes[order[k]]);
      lab.place(el, paper.world(x, y));
    });
  }
  function readout() {
    const n = begun(), tw = state.seq - SEQ0;
    if (R.strokeOut) {
      const k = Math.max(0, n - 1), st = char.strokes[order[k]];
      R.strokeOut.innerHTML = n === 0 ? '—' : tw > writer.duration ? 'Done<small>寫完了</small>' : `${n} / ${order.length} · ${st.en}<small>第 ${n} 筆・${st.zh}</small>`;
    }
  }

  let lastRead = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    state.lastPose = step(dt) || state.lastPose;
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
    root.classList.toggle('cg-narrow', w < 520);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1); setCam('side'); setGrid('jiu');
  start();
  resize();
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = Object.fromEntries(Object.keys(RULE_CHAR).map((k) => [k, () => { state.rule = k; state.back = false; start(); }]));
  DEMO.back = () => { state.back = true; start(); };
  root.__lab = {
    camera, controls, state, scene, brush, paper, setCam, setSpeed, setGrid, setPlaying, start,
    setRule: (k, back = false) => { state.rule = k; state.back = back; start(); },
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) state.lastPose = step(0.02) || state.lastPose; },
    render: () => { state.lastPose = step(0) || state.lastPose; if (controls.enabled) controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const guess = document.querySelector('[data-cal-guess]');
  if (guess) initGuess(guess, CHARS, ['chuan', 'san', 'shi', 'ren', 'xiao', 'ri']);
  const pad = document.querySelector('[data-cal-pad]');
  if (pad) initPad(pad, RI, CHARS);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calorder-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
