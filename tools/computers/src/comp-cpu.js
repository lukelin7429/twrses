/*
 * 電腦概論 · 第六課「處理器整天在忙什麼？」的 3D 模型（全部自繪示意；**自己設計的教學用處理器，不是任何真實的指令集**）。
 *
 * 一個機制：**拿指令、看懂、照做，然後再拿下一條**。
 * 場景：左邊一排記憶體（8 格，位址 0–7，放程式和數）；右邊是處理器的裡面：計數器、指令暫存器、A（手上的數）、加法器；
 *       最左後方一台縮小的主機（pc3d.js），亮著的那一小片就是第五課的處理器——現在看的是它的裡面。
 *   .cp-step       走一個小步驟（拿 → 看懂 → 照做）
 *   .al-play       一直跑（做完一個小步驟才做下一個）
 *   data-prog      add34（3 + 4，四條指令後停）／count（一直加一，JUMP 繞回去，永遠不停）
 *   data-speed     0.5／1／4 倍
 *   .cp-reset      重來
 * 每一格裡的字是 HTML 標籤（貼在 3D 位置上）；資料搬動時有一顆光點從一格飛到另一格。
 *
 * 控制器不靠 WebGL：模擬器是 cpu.js 的純函式；沒有 WebGL 時 3D 不畫，右邊的暫存器、記憶體清單與說明照樣能用。
 * 2D（不需要 WebGL）：自己排程式、猜下一步——cpu2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-cpu.js
 * 除錯：document.querySelector('[data-compcpu-lab]').__lab
 *   load('add34'|'count')、stepOnce()、setPlaying(bool)、setSpeed(n)、demo('fetch'|'add'|'loop'|'stop')、
 *   run(秒)、goCam()、render()、sim()（目前的模擬器狀態）
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { PROGRAMS, SIZE, cellText, makeState, tick } from './cpu.js';
import { initPred, initProg } from './cpu2d.js';
import { describe } from './cputext.js';
import { makePC } from './pc3d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const DUR = 1.5;   // 1 倍速時一個小步驟幾秒
// 場景裡每個格子的位置（x, y）；全部立在 z = 0 的一面牆上
const MEMX = -2.6, memY = (i) => 4.55 - i * 0.56;
const POS = { pc: [1.25, 4.3], ir: [3.5, 4.3], a: [2.4, 2.75], add: [2.4, 1.15] };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { pc: $('.cp-cpu-pc'), ir: $('.cp-cpu-ir'), a: $('.cp-cpu-a'), mem: $('.cp-cpu-mem'), msg: $('.cp-msg'), play: $('.al-play'), done: $('.cp-cpu-done'), ph: [...$$('[data-ph]')] };
  const state = { prog: 'add34', playing: false, speed: 1, labels: true, wait: 0, last: null };
  let sim = makeState(PROGRAMS.add34), script = null, view = null;

  const say = (d) => { R.msg.innerHTML = `${d.en}<span class="zh">${d.zh}</span>`; };
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));

  function show() {
    const ev = state.last;
    R.pc.textContent = String(sim.pc); R.ir.textContent = sim.ir ? cellText(sim.ir) || '—' : '—'; R.a.textContent = String(sim.a);
    R.done.textContent = String(sim.done);
    R.ph.forEach((c) => c.classList.toggle('is-cur', !!ev && c.getAttribute('data-ph') === ev.phase));
    const arg = ev && (ev.phase === 'decode' || ev.phase === 'execute') && ev.op !== 'JUMP' && ev.op !== 'STOP' ? ev.arg : -1;
    R.mem.innerHTML = sim.mem.map((c, i) => `<li class="${i === sim.pc && !sim.halted ? 'is-pc' : ''}${i === arg ? ' is-arg' : ''}${c.op ? ' is-ins' : ''}"><i>${i}</i><b>${cellText(c) || '&nbsp;'}</b></li>`).join('');
    root.classList.toggle('cp-halted', sim.halted);
    if (view) view.sync(ev);
  }
  function load(key) { state.prog = key; sim = makeState(PROGRAMS[key]); state.last = null; state.wait = 0; press('[data-prog]', 'data-prog', key); show(); }
  function doTick() {
    if (sim.halted) { say(describe({ phase: 'halted' }, sim)); setPlaying(false); return false; }
    const r = tick(sim); sim = r.state; state.last = r.event;
    say(describe(r.event, sim)); show();
    if (view) view.animate(r.event);
    state.wait = DUR;
    if (sim.halted) setPlaying(false);
    return true;
  }
  function user() { script = null; root.classList.remove('al-fresh'); }
  function stepOnce() { user(); setPlaying(false); doTick(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Run · 執行';
    root.classList.remove('al-fresh');
  }
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }
  const intro = () => say({ en: 'Cells 0 to 3 hold a program of four instructions. Cells 5 and 6 hold the numbers 3 and 4. Press Step to do one small step at a time.', zh: '第 0 到 3 格放著四條指令的程式，第 5、6 格放著 3 和 4 兩個數。按「下一步」，一次走一個小步驟。' });

  $('.cp-step').addEventListener('click', stepOnce);
  $('.cp-reset').addEventListener('click', () => { user(); setPlaying(false); load(state.prog); intro(); });
  R.play.addEventListener('click', () => { script = null; if (sim.halted) load(state.prog); setPlaying(!state.playing); });
  $$('[data-prog]').forEach((b) => b.addEventListener('click', () => {
    user(); setPlaying(false); load(b.getAttribute('data-prog'));
    if (state.prog === 'count') say({ en: 'This program adds 1 to cell 6, then jumps back to the start. There is no STOP, so it runs for as long as the power is on.', zh: '這個程式把第 6 格加 1，然後跳回開頭。裡面沒有 STOP，所以只要有電，它就一直跑下去。' }); else intro();
  }));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 50; controls.maxPolarAngle = Math.PI * 0.52;
    scene.add(new HemisphereLight(0xeaf0ff, 0x2a2420, 1.2));
    scene.add(new AmbientLight(0xffffff, 0.5));
    const sun = new DirectionalLight(0xfff1dc, 1.4); sun.position.set(-3, 7, 10); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.55, emissive: 0x000000, emissiveIntensity: 0, ...o });
    const box = (m, w, h, d, x, y, z) => { const b = new Mesh(new BoxGeometry(w, h, d), m); b.position.set(x, y, z); scene.add(b); return b; };

    // 記憶體：一塊背板＋ 8 個格子
    box(mat(0x1d2740), 2.9, 4.9, 0.2, MEMX, memY(3.5), -0.22);
    const cells = Array.from({ length: SIZE }, (_, i) => { const m = mat(0x2c3a5c); return { m, b: box(m, 2.3, 0.46, 0.22, MEMX + 0.2, memY(i), 0), k: 0, kind: 0 }; });
    // 處理器：一塊背板＋三個暫存器＋加法器
    box(mat(0x16382f), 5.0, 4.9, 0.2, 2.45, memY(3.5), -0.22);
    const regs = {};
    for (const [key, w, h, c] of [['pc', 1.5, 0.62, 0x3a4a70], ['ir', 2.2, 0.62, 0x3a4a70], ['a', 1.9, 0.8, 0x5a4a22], ['add', 1.7, 0.9, 0x22345f]]) { const m = mat(c); regs[key] = { m, b: box(m, w, h, 0.24, POS[key][0], POS[key][1], 0), k: 0 }; }
    // 連線（示意：計數器指向記憶體、記憶體到指令暫存器、A 和加法器之間）
    const wm = mat(0xc98a4b, { metalness: 0.7, roughness: 0.35 });
    box(wm, 0.05, 1.0, 0.05, POS.a[0], (POS.a[1] + POS.add[1]) / 2, -0.05);
    box(wm, 2.3, 0.05, 0.05, (MEMX + 1.35 + POS.pc[0] - 0.75) / 2, POS.pc[1], -0.08);

    // 第五課的主機，縮小放在左後方；處理器那一片亮著
    const pc = makePC(); pc.group.scale.setScalar(0.42); pc.group.position.set(-7.4, 0, -1.4); pc.select('cpu'); scene.add(pc.group);

    const glow = canvasTex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 128, 128);
    const balls = [0, 1].map(() => { const b = new Mesh(new SphereGeometry(0.13, 16, 12), new MeshBasicMaterial({ color: 0x7ef0e3, transparent: true, opacity: 0 })); const h = new Sprite(new SpriteMaterial({ map: glow, color: 0x7ef0e3, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })); h.scale.setScalar(1.0); b.add(h); scene.add(b); return { b, h, t: 1, t0: 0, from: V(0, 0, 0), to: V(0, 0, 0) }; });
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbMem = cells.map(() => lab.add('cp-lb cp-lb-cell', ''));
    const lbAddr = cells.map((_, i) => lab.add('cp-lb cp-lb-addr', String(i)));
    const lbReg = { pc: lab.add('cp-lb cp-lb-reg', ''), ir: lab.add('cp-lb cp-lb-reg', ''), a: lab.add('cp-lb cp-lb-reg', ''), add: lab.add('cp-lb cp-lb-reg', '') };
    const lbTitle = [lab.add('cp-lb cp-lb-end', 'memory<small>記憶體</small>'), lab.add('cp-lb cp-lb-end', 'inside the processor<small>處理器的裡面</small>'), lab.add('cp-lb cp-lb-end', 'the processor from Lesson 5<small>第五課的處理器</small>')];
    const tmp = V(0, 0, 0);
    const at = (key) => (typeof key === 'number' ? V(MEMX + 0.2, memY(key), 0.2) : V(POS[key][0], POS[key][1], 0.2));

    function sync(ev) {
      sim.mem.forEach((c, i) => { lbMem[i].textContent = cellText(c) || '·'; cells[i].kind = c.op ? 1 : 0; });
      lbReg.pc.innerHTML = `counter<small>計數器</small><b>${sim.pc}</b>`;
      lbReg.ir.innerHTML = `instruction<small>指令</small><b>${sim.ir ? cellText(sim.ir) || '—' : '—'}</b>`;
      lbReg.a.innerHTML = `A<small>手上的數</small><b>${sim.a}</b>`;
      lbReg.add.innerHTML = `adder<small>加法器</small><b>${ev && ev.phase === 'execute' && ev.op === 'ADD' ? `${ev.x} + ${ev.y}` : '+'}</b>`;
    }
    function fly(i, from, to, delay = 0) { const b = balls[i]; b.from.copy(at(from)); b.to.copy(at(to)); b.t = 0; b.t0 = -delay; }
    function animate(ev) {
      for (const c of cells) c.k = 0; for (const k of Object.keys(regs)) regs[k].k = 0;
      if (ev.phase === 'fetch') { cells[ev.from].k = 1; regs.pc.k = 1; regs.ir.k = 1; fly(0, ev.from, 'ir'); }
      else if (ev.phase === 'decode') { regs.ir.k = 1; if (ev.op !== 'STOP' && ev.op !== 'JUMP') cells[ev.arg].k = 0.7; if (ev.op === 'JUMP') regs.pc.k = 0.7; }
      else if (ev.phase === 'execute') {
        if (ev.op === 'LOAD') { cells[ev.arg].k = 1; regs.a.k = 1; fly(0, ev.arg, 'a'); }
        else if (ev.op === 'ADD') { cells[ev.arg].k = 1; regs.add.k = 1; regs.a.k = 1; fly(0, ev.arg, 'add'); fly(1, 'add', 'a', 0.55); }
        else if (ev.op === 'STORE') { cells[ev.arg].k = 1; regs.a.k = 1; fly(0, 'a', ev.arg); }
        else if (ev.op === 'JUMP') { regs.pc.k = 1; regs.ir.k = 0.6; fly(0, 'ir', 'pc'); }
        if (ev.op !== 'STOP') regs.pc.k = Math.max(regs.pc.k, 0.8);
      } else if (ev.phase === 'error') { if (ev.pc >= 0 && ev.pc < SIZE) cells[ev.pc].k = 1; }
    }
    const cIns = new Color(0x2f5d86), cNum = new Color(0x2c3a5c), cHot = new Color(0xffd36e);
    function tickView(dt) {
      pc.update(dt);
      cells.forEach((c, i) => {
        c.k = Math.max(0, c.k - dt * 0.35);
        c.m.color.copy(c.kind ? cIns : cNum); c.m.emissive.copy(cHot); c.m.emissiveIntensity = c.k * 0.55 + (i === sim.pc && !sim.halted ? 0.12 : 0);
      });
      for (const k of Object.keys(regs)) { const r = regs[k]; r.k = Math.max(0, r.k - dt * 0.35); r.m.emissive.copy(cHot); r.m.emissiveIntensity = r.k * 0.5; }
      for (const b of balls) {
        if (b.t >= 1) { b.b.material.opacity = 0; b.h.material.opacity = 0; continue; }
        b.t0 += (dt * state.speed) / (DUR * 0.6);
        if (b.t0 < 0) continue;
        b.t = Math.min(1, b.t0);
        b.b.position.lerpVectors(b.from, b.to, MathUtils.smootherstep(b.t, 0, 1)); b.b.position.z += 0.25 + Math.sin(Math.PI * b.t) * 0.9;
        const o = Math.min(1, b.t * 8) * Math.min(1, (1 - b.t) * 6); b.b.material.opacity = o; b.h.material.opacity = o * 0.9;
      }
      if (flyC.t < 1) {
        flyC.t = Math.min(1, flyC.t + dt / 1.0);
        const k = MathUtils.smootherstep(flyC.t, 0, 1);
        camera.position.lerpVectors(flyC.p0, flyC.p1, k); controls.target.lerpVectors(flyC.t0, flyC.t1, k);
      }
    }
    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const narrow = camera.aspect < 0.9;
      const t = V(narrow ? 0.2 : -1.2, 2.75, 0), p = V(0.06, 0.1, 1).normalize().multiplyScalar(fit(narrow ? 10.2 : 13.6, 6.0)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(t); flyC.t = 0;
    }
    function labels() {
      const on = state.labels;
      cells.forEach((_, i) => {
        lbMem[i].hidden = false; lab.place(lbMem[i], tmp.set(MEMX + 0.2, memY(i), 0.15));
        lbMem[i].classList.toggle('is-on', i === sim.pc && !sim.halted);
        lbAddr[i].hidden = !on; if (on) lab.place(lbAddr[i], tmp.set(MEMX - 1.2, memY(i), 0.15));
      });
      for (const k of Object.keys(lbReg)) lab.place(lbReg[k], tmp.set(POS[k][0], POS[k][1], 0.15));
      const narrow = root.classList.contains('cp-narrow');
      lbTitle[0].hidden = lbTitle[1].hidden = !on; lbTitle[2].hidden = !on || narrow;
      if (on) { lab.place(lbTitle[0], tmp.set(MEMX, 5.35, 0)); lab.place(lbTitle[1], tmp.set(2.45, 5.35, 0)); }
      if (!lbTitle[2].hidden) lab.place(lbTitle[2], tmp.set(-7.4, 2.6, -1.4));
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 42 : 34; camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const bnd = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (bnd !== band0) { band0 = bnd; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, sync, animate, tick: tickView, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const until = (test, max = 40) => { for (let k = 0; k < max && !test(); k++) { const r = tick(sim); sim = r.state; state.last = r.event; } show(); };
  const DEMO = {
    fetch() { script = null; setPlaying(false); load('add34'); setSpeed(0.5); intro(); script = { t: 0, list: [{ at: 1.2, fn: () => doTick() }] }; },
    add() { script = null; setPlaying(false); load('add34'); setSpeed(0.5); until(() => sim.done === 1 && sim.phase === 'execute'); say({ en: 'A already holds 3. The next small step is to execute ADD 6.', zh: 'A 已經是 3 了。下一個小步驟就是執行 ADD 6。' }); script = { t: 0, list: [{ at: 1.6, fn: () => doTick() }] }; },
    loop() { script = null; setPlaying(false); load('count'); setSpeed(4); say({ en: 'Four instructions and a JUMP back to the start. Watch cell 6.', zh: '四條指令，最後一條 JUMP 跳回開頭。看著第 6 格。' }); script = { t: 0, list: [{ at: 1.4, fn: () => setPlaying(true) }] }; },
    stop() { script = null; setPlaying(false); load('add34'); setSpeed(4); say({ en: 'The whole 3 + 4 program, start to finish: four instructions, twelve small steps.', zh: '整個 3＋4 的程式從頭跑到尾：四條指令，十二個小步驟。' }); script = { t: 0, list: [{ at: 1.2, fn: () => setPlaying(true) }] }; },
  };

  function step(dt) {
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (state.wait > 0) state.wait -= dt * state.speed;
    if (state.playing && state.wait <= 0) doTick();
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) view.render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1); setPlaying(false); load('add34'); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, load, stepOnce, setPlaying, setSpeed, sim: () => sim,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const p = document.querySelector('[data-cp-prog]'); if (p) initProg(p);
  const q = document.querySelector('[data-cp-pred]'); if (q) initPred(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compcpu-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
