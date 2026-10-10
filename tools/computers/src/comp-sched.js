/*
 * 電腦概論 · 第十一課「作業系統在做什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**一個處理器一次只能做一件事；作業系統讓很多程式輪流用它**——每個程式做一小段就換下一個，
 * 換得夠勤，看起來就像同時在跑。換手本身也要花時間。
 * 場景：一位廚師（處理器）站在長檯後面，檯上最多四張點單（四個程式），每張要做 12 拍，各有一根進度柱。
 * 廚師在一張點單前做一個時間片，然後走到下一張（走路＝換手，這段時間沒有任何點單在前進）。
 *   [data-jobs] 1–4 張點單　[data-slice] 每次做 1／3／6／12 拍　.al-play 開始／暫停　.cp-reset 重新開始
 *
 * 控制器不靠 WebGL：時間軸是 sched.js 的 roundRobin() 算好的；沒有 WebGL 時 3D 不畫，右邊的進度與計數照樣能用。
 * 2D（不需要 WebGL）：調時間片、這是誰的工作——sched2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-sched.js
 * 除錯：document.querySelector('[data-compsched-lab]').__lab
 *   setJobs(n)、setSlice(k)、setPlaying(bool)、seek(t)、reset()、demo('long'|'short'|'tiny'|'one')、run(秒)、goCam()、render()、sim()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { ORDERS, ORDER_WORK, at, done, orders, roundRobin, worstGap } from './sched.js';
import { initSlice } from './sched2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const SPEED = 5;   // 一秒走幾拍
const COLORS = { music: 0xc7a6ff, essay: 0xf4ecd8, browser: 0x4f9dff, download: 0x3ac7b0 };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const NAMES = JSON.parse(root.getAttribute('data-items'));
  const R = { msg: $('.cp-msg'), play: $('.al-play'), jobs: [...$$('[data-jobs]')], slices: [...$$('[data-slice]')], t: $('.cp-sc-t'), sw: $('.cp-sc-sw'), fin: $('.cp-sc-fin'), bars: [...$$('[data-bar]')] };
  const state = { n: 4, slice: 3, t: 0, playing: false, labels: true };
  let sim = null, lastSeg = undefined;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const compile = () => { sim = roundRobin(orders(state.n), state.slice, 1); };
  const X = (i) => (i - (state.n - 1) / 2) * 2.7;
  function show() {
    const t = Math.min(state.t, sim.total);
    R.jobs.forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-jobs')) === state.n ? 'true' : 'false'));
    R.slices.forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-slice')) === state.slice ? 'true' : 'false'));
    R.t.textContent = `${Math.floor(t)} / ${sim.total}`;
    R.sw.textContent = String(Math.floor(sim.segs.reduce((s, g) => (g.id === null ? s + Math.max(0, Math.min(t, g.t1) - g.t0) : s), 0)));
    R.fin.textContent = `${ORDERS.slice(0, state.n).filter((id) => sim.finish[id] <= t).length} / ${state.n}`;
    const cur = at(sim, t);
    R.bars.forEach((li) => { const id = li.getAttribute('data-bar'), i = ORDERS.indexOf(id); li.hidden = i >= state.n; if (i >= state.n) return; const d = done(sim, id, t); li.querySelector('i').style.width = `${(d / ORDER_WORK) * 100}%`; li.querySelector('b').textContent = `${Math.floor(d)} / ${ORDER_WORK}`; li.classList.toggle('is-on', !!cur && cur.id === id); li.classList.toggle('is-done', d >= ORDER_WORK); });
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : state.t >= sim.total ? 'Start again · 再來一次' : 'Start cooking · 開始做';
  }
  function tell() {
    const t = state.t;
    if (t >= sim.total) {
      const pct = Math.round(sim.switchShare * 100), gap = worstGap(sim);
      if (state.n === 1) say(`Done at beat ${sim.total}. With only one order there is nothing to switch to, so no time is lost.`, `第 ${sim.total} 拍做完。只有一張點單，沒有別張可以換，所以一點時間都沒浪費。`);
      else say(`All done at beat ${sim.total}. The cooking itself took ${sim.work} beats; the other ${sim.switchTime} went to switching (${pct}%). The longest any order waited for its turn was ${gap} beats.`, `第 ${sim.total} 拍全部做完。真正在做菜的時間是 ${sim.work} 拍，另外 ${sim.switchTime} 拍花在換手（${pct}%）。等最久的一張點單，一次等了 ${gap} 拍才輪到。`);
      return;
    }
    const g = at(sim, t); if (!g) return;
    if (g.id === null) say('Switching. The chef puts one order down and walks to the next. For this moment, no order is moving forward.', '換手中。廚師放下一張點單，走到下一張。這一刻，沒有任何一張點單在前進。');
    else say(`The chef works on ${NAMES[g.id].en}${state.slice >= ORDER_WORK ? ' until it is finished' : ` for up to ${state.slice} beat${state.slice === 1 ? '' : 's'}`}. Every other order waits.`, `廚師在做「${NAMES[g.id].zh}」${state.slice >= ORDER_WORK ? '，一直做到完' : `，最多做 ${state.slice} 拍`}。其他的點單都在等。`);
  }
  const intro = () => say(`One chef, ${state.n} order${state.n === 1 ? '' : 's'}. Each order needs ${ORDER_WORK} beats of work. The chef works on one for ${state.slice >= ORDER_WORK ? 'the whole 12 beats' : `${state.slice} beat${state.slice === 1 ? '' : 's'}`}, then moves to the next. Press Start.`, `一位廚師，${state.n} 張點單，每張要做 ${ORDER_WORK} 拍。廚師每張${state.slice >= ORDER_WORK ? '一口氣做完 12 拍' : `做 ${state.slice} 拍`}，就換下一張。按「開始做」。`);
  function rewind() { compile(); state.t = 0; state.playing = false; lastSeg = undefined; show(); intro(); }
  function setJobs(n) { state.n = n; rewind(); }
  function setSlice(k) { state.slice = k; rewind(); }
  function setPlaying(on) { if (on && state.t >= sim.total) { state.t = 0; lastSeg = undefined; } state.playing = on; root.classList.remove('al-fresh'); show(); }
  function seek(t) { state.t = Math.max(0, Math.min(sim.total, t)); lastSeg = undefined; advance(0); }
  function advance(dt) {
    state.t = Math.min(sim.total, state.t + dt * SPEED);
    const g = state.t >= sim.total ? 'end' : at(sim, state.t);
    if (g !== lastSeg) { lastSeg = g; tell(); }
    if (state.t >= sim.total) state.playing = false;
    show();
  }

  R.jobs.forEach((b) => b.addEventListener('click', () => setJobs(Number(b.getAttribute('data-jobs')))));
  R.slices.forEach((b) => b.addEventListener('click', () => setSlice(Number(b.getAttribute('data-slice')))));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.cp-reset').addEventListener('click', () => rewind());
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
    controls.minDistance = 3; controls.maxDistance = 50; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.15)); scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-4, 9, 8); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    const box = (m, w, h, d, x, y, z) => { const b = new Mesh(new BoxGeometry(w, h, d), m); b.position.set(x, y, z); scene.add(b); return b; };
    box(mat(0x8a6a48, { roughness: 0.75 }), 11.6, 0.16, 1.7, 0, 1.0, 0); box(mat(0x5a4530, { roughness: 0.85 }), 11.2, 0.92, 1.4, 0, 0.46, 0);
    // 四張點單：盤子＋進度柱
    const st = ORDERS.map((id) => {
      const g = new Group(); scene.add(g);
      const plateM = mat(0xe9edf5, { emissive: 0xffd36e, emissiveIntensity: 0 });
      const plate = new Mesh(new CylinderGeometry(0.62, 0.5, 0.1, 28), plateM); plate.position.set(0, 1.14, 0.1); g.add(plate);
      const frame = new Mesh(new BoxGeometry(0.34, 2.5, 0.12), mat(0x1c2947)); frame.position.set(0.9, 2.33, -0.5); g.add(frame);
      const barM = mat(COLORS[id], { emissive: COLORS[id], emissiveIntensity: 0.25 });
      const bar = new Mesh(new BoxGeometry(0.26, 1, 0.14), barM); bar.position.set(0.9, 1.1, -0.5); g.add(bar);
      const food = new Mesh(new SphereGeometry(0.34, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat(COLORS[id])); food.position.set(0, 1.19, 0.1); g.add(food);
      return { id, g, plateM, bar, food, k: 0 };
    });
    // 廚師（處理器）
    const chef = new Group(); scene.add(chef);
    const body = new Mesh(new CylinderGeometry(0.34, 0.42, 1.25, 20), mat(0xf7f7f2)); body.position.y = 1.2; chef.add(body);
    const head = new Mesh(new SphereGeometry(0.27, 20, 16), mat(0xf0c9a0)); head.position.y = 2.08; chef.add(head);
    const hat = new Mesh(new CylinderGeometry(0.3, 0.24, 0.36, 20), mat(0xffffff)); hat.position.y = 2.44; chef.add(hat);
    const mark = new Mesh(new ConeGeometry(0.16, 0.3, 14), mat(0xffd36e, { emissive: 0xffd36e, emissiveIntensity: 0.6 })); mark.rotation.x = Math.PI; mark.position.y = 3.0; chef.add(mark);
    chef.position.set(0, 0, -1.35);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbO = ORDERS.map((id) => lab.add('cp-lb cp-lb-copy', ''));
    const lbC = lab.add('cp-lb cp-lb-end', '');
    const tmp = V(0, 0, 0);
    const xAt = (t) => {
      const g = at(sim, Math.min(t, sim.total - 1e-6)); if (!g) return X(0);
      if (g.id !== null) return X(ORDERS.indexOf(g.id));
      const k = sim.segs.indexOf(g), a = sim.segs[k - 1], b = sim.segs[k + 1];
      const u = MathUtils.smootherstep((t - g.t0) / (g.t1 - g.t0), 0, 1);
      return MathUtils.lerp(X(ORDERS.indexOf(a.id)), X(ORDERS.indexOf(b.id)), u);
    };
    function tick(dt) {
      const t = Math.min(state.t, sim.total), cur = t >= sim.total ? null : at(sim, t), e = Math.min(1, dt * 10);
      st.forEach((s, i) => {
        s.g.visible = i < state.n; if (i >= state.n) return;
        s.g.position.x = X(i);
        const d = done(sim, s.id, t) / ORDER_WORK;
        s.bar.scale.y = Math.max(0.001, d * 2.4); s.bar.position.y = 1.1 + d * 1.2;
        s.food.scale.setScalar(0.25 + d * 0.9);
        const on = cur && cur.id === s.id; s.k += ((on ? 1 : 0) - s.k) * e; s.plateM.emissiveIntensity = s.k * 0.7;
        s.plateM.color.set(d >= 1 ? 0x8fe3b0 : 0xe9edf5);
      });
      chef.position.x += (xAt(t) - chef.position.x) * Math.min(1, dt * 14);
      const working = cur && cur.id !== null;
      body.position.y = 1.2 + (working ? Math.abs(Math.sin(performance.now() / 110)) * 0.05 : 0);
      mark.visible = !!working;
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 1.75, 0), p = V(0, 0.32, 1).normalize().multiplyScalar(fit(13.6, 5.4)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels, t = Math.min(state.t, sim.total), cur = t >= sim.total ? null : at(sim, t);
      st.forEach((s, i) => {
        const l = lbO[i]; l.hidden = !on || i >= state.n; if (l.hidden) return;
        const d = done(sim, s.id, t), fin = d >= ORDER_WORK;
        l.innerHTML = `${NAMES[s.id].emoji} ${NAMES[s.id].en}<b>${fin ? 'done ✓ 做完了' : `${Math.floor(d)} / ${ORDER_WORK}`}</b><small>${NAMES[s.id].zh}</small>`;
        l.classList.toggle('is-on', !!cur && cur.id === s.id);
        lab.place(l, tmp.set(X(i), 0.55, 0.9));
      });
      lbC.hidden = !on; if (!on) return;
      lbC.innerHTML = cur && cur.id === null ? 'switching<small>換手中</small>' : 'the chef: the processor<small>廚師：處理器</small>';
      lab.place(lbC, tmp.set(chef.position.x, 3.45, -1.35));
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
    return { camera, controls, scene, tick, render, goHome };
  }
  compile();
  const view = make3D();
  if (!view) root.classList.add('al-nogl');

  const go = (n, k) => { state.n = n; state.slice = k; rewind(); setPlaying(true); };
  const DEMO = { long() { go(4, 12); }, short() { go(4, 3); }, tiny() { go(4, 1); }, one() { go(1, 3); } };

  function step(dt) {
    if (state.playing) advance(dt);
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setJobs, setSlice, setPlaying, seek, reset: rewind, sim: () => sim,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const s = document.querySelector('[data-cp-slice]'); if (s) initSlice(s);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compsched-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
