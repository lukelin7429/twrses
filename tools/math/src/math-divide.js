/*
 * 看得見的數學 · 第三課「除法到底是什麼意思？」的 3D 模型（全部自繪示意）。
 *
 * 一個想法：**除法有兩種問法，用同一個算式**——平分（每人幾顆？）和每幾個一組（可以裝幾袋？）；
 * 分不完、留在桌上的就是餘數。形狀、位置、每一步都來自 divide.js 的純函式。
 *   data-mode          平分（share）／分裝：每幾個一組（group）——課綱 N-2-9 的用語是「分裝與平分」
 *   .mth-dv-total      一共幾顆（1–30）
 *   .mth-dv-n          分給幾人／每袋幾顆（1–10）
 *   .mth-deal          開始分（一顆一顆動畫）；.mth-dv-reset 全部收回桌上
 *   .mth-arrange       分完以後排成方陣：每個盤子一排（接上第二課：除法是乘法倒過來）
 *   data-speed         0.5／1／3 倍；data-t="labels" 標籤
 *
 * 畫面上的糖永遠是一共那麼多顆：盤子裡的＋桌上的＝一共（check() 會核對）。
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的算式、滑桿與按鈕照樣能用。
 * 2D（不需要 WebGL）：這是哪一種問法、餘數會是多少（divide2d.js）。
 *
 * 產物：cd tools/math && npm run build → assets/js/math-divide.js
 * 除錯：document.querySelector('[data-mathdivide-lab]').__lab
 *   set(total, n)、setMode('share'|'group')、deal()、finish()、reset()、setArranged(bool)、setSpeed(n)、
 *   demo('share'|'group'|'left'|'array')、run(秒)、goCam()、render()、
 *   counts()＝{ containers: [每個容器幾顆], table: 桌上幾顆 }、shown()＝右邊顯示的 { q, r }、check()
 */
import {
  AmbientLight, CircleGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial,
  PCFShadowMap, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { MAX_N, MAX_TOTAL, candySlot, containerSlot, containers, divide, pileSlot, steps, tally } from './divide.js';
import { initCycle, initKind } from './divide2d.js';

const STEP = 0.42;         // 1 倍速時，發一顆要幾秒
const MOVE = 0.38;         // 一顆糖飛過去要幾秒
const V = (x, y, z) => new Vector3(x, y, z);
const CANDY = [0xe2574c, 0xf4c542, 0x4fb477, 0x4a90d9, 0xb066d6, 0xf08a3c];

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = {
    eqUs: $('.mth-dv-us'), eqTw: $('.mth-dv-tw'), qk: $('.mth-dv-qk'), qv: $('.mth-dv-q'), rv: $('.mth-dv-r'), chk: $('.mth-dv-check'),
    msg: $('.mth-msg'), total: $('.mth-dv-total'), n: $('.mth-dv-n'), totalOut: $('.mth-dv-total-out'), nOut: $('.mth-dv-n-out'), nk: $('.mth-dv-nk'),
    deal: $('.mth-deal'), arrange: $('.mth-arrange'),
  };
  const state = { mode: 'share', total: 13, n: 3, placed: 0, dealing: false, arranged: false, speed: 1, labels: true };
  let plan = [];          // steps(total, n, mode)
  let wait = 0;
  let script = null;
  let view = null;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const res = () => divide(state.total, state.n);
  const done = () => state.placed >= plan.length;
  const nCont = () => containers(state.total, state.n, state.mode);

  function show() {
    const { total, n, mode } = state, { q, r } = res(), fin = done();
    R.totalOut.textContent = String(total); R.nOut.textContent = String(n);
    R.total.value = String(total); R.n.value = String(n);
    R.nk.textContent = mode === 'share' ? 'Share among · 分給幾人' : 'In each bag · 每袋幾顆';
    R.qk.innerHTML = mode === 'share' ? 'Each person gets<small>每人分到</small>' : 'Bags filled<small>裝了幾袋</small>';
    const sofar = tally(plan.slice(0, state.placed), nCont());
    const qNow = fin ? q : mode === 'share' ? Math.min(...sofar.concat([q])) : sofar.filter((c) => c === n).length;
    R.qv.textContent = fin ? String(q) : `${qNow}…`;
    R.rv.textContent = fin ? String(r) : '?';
    R.eqUs.textContent = fin ? `${total} ÷ ${n} = ${q}${r ? ` R ${r}` : ''}` : `${total} ÷ ${n} = ?`;
    R.eqTw.textContent = fin ? `${total} 除以 ${n}，商 ${q}${r ? `，餘 ${r}` : ''}` : `${total} 除以 ${n}，商多少？`;
    R.chk.textContent = fin ? (mode === 'share' ? `${n} × ${q}${r ? ` + ${r}` : ''} = ${total}` : `${q} × ${n}${r ? ` + ${r}` : ''} = ${total}`) : '';
    R.deal.disabled = state.dealing || fin;
    R.arrange.disabled = !fin || state.placed === 0;
    root.classList.toggle('mth-dealing', state.dealing);
    root.setAttribute('data-mode', mode);
    $$('[data-mode-btn]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-mode-btn') === mode ? 'true' : 'false'));
    if (view) view.sync();
  }
  function rebuild() {
    plan = steps(state.total, state.n, state.mode);
    state.placed = 0; state.dealing = false; state.arranged = false; wait = 0;
    const tg = $('[data-t="arranged"]'); if (tg) tg.checked = false;
    if (view) view.rebuild();
    show();
  }
  function stopAll() { script = null; }
  function set(total, n, quiet) {
    state.total = Math.max(1, Math.min(MAX_TOTAL, Math.round(total) || 1));
    state.n = Math.max(1, Math.min(MAX_N, Math.round(n) || 1));
    rebuild();
    if (!quiet) intro();
  }
  function setMode(m, quiet) { state.mode = m === 'group' ? 'group' : 'share'; rebuild(); if (!quiet) intro(); }
  function intro() {
    const { total, n, mode } = state;
    if (mode === 'share') say(`${total} candies to share equally among ${n} ${n === 1 ? 'person' : 'people'}. How many does each person get? Press Deal.`, `${total} 顆糖平分給 ${n} 個人，每人分到幾顆？按「開始分」。`);
    else say(`${total} candies, ${n} in each bag. How many bags can you fill? Press Deal.`, `${total} 顆糖，每袋裝 ${n} 顆，可以裝幾袋？按「開始分」。`);
  }
  function deal() {
    if (done()) return false;
    state.dealing = true; state.arranged = false; wait = 0.15;
    if (state.mode === 'share') say('Dealing one at a time, around and around, like cards.', '像發牌一樣，一人一顆，輪流發。');
    else say('Filling one bag at a time. A new bag opens only when the last one is full.', '一次裝一袋。這一袋裝滿了，才打開下一袋。');
    show();
    return true;
  }
  function finished() {
    state.dealing = false;
    const { total, n, mode } = state, { q, r } = res();
    const left = r ? [` ${r} ${r === 1 ? 'is' : 'are'} left over: not enough for another ${mode === 'share' ? 'round' : 'bag'}. That is the remainder, and it is always less than ${n}.`, `剩下 ${r} 顆，不夠再${mode === 'share' ? '發一輪' : '裝一袋'}了——這就是餘數，而且一定比 ${n} 小。`] : [' Nothing is left over.', '一顆也沒剩。'];
    if (mode === 'share') say(`Each person gets ${q}.${left[0]}`, `每人分到 ${q} 顆。${left[1]}`);
    else say(`${q} ${q === 1 ? 'bag is' : 'bags are'} filled.${left[0]}`, `裝滿了 ${q} 袋。${left[1]}`);
    void total;
    show();
  }
  function finish() { state.placed = plan.length; finished(); }
  function reset() { stopAll(); rebuild(); intro(); }
  function setArranged(v) {
    if (v && (!done() || !plan.length)) return false;
    state.arranged = !!v;
    const tg = $('[data-t="arranged"]'); if (tg) tg.checked = state.arranged;
    if (state.arranged) {
      const { n } = state, { q, r } = res(), sh = state.mode === 'share';
      const [rows, each] = sh ? [n, q] : [q, n];
      const tail = r ? [` The ${r} left over ${r === 1 ? 'stays' : 'stay'} on the table.`, `剩下的 ${r} 顆留在桌上。`] : ['', ''];
      if (sh) say(`Each plate becomes one row: ${rows} rows of ${each}. That is ${rows} × ${each} = ${rows * each}, so ${rows * each} ÷ ${n} = ${q}. Division undoes multiplication.${tail[0]}`,
          `每個盤子變成一排：${rows} 排，每排 ${each} 個，就是 ${rows} × ${each} = ${rows * each}；所以 ${rows * each} ÷ ${n} = ${q}。除法就是把乘法倒過來。${tail[1]}`);
      else say(`Each bag becomes one row: ${rows} rows of ${each}. That is ${rows} × ${each} = ${rows * each}, so ${rows * each} ÷ ${n} = ${q}. Division undoes multiplication.${tail[0]}`,
          `每一袋變成一排：${rows} 排，每排 ${each} 個，就是 ${rows} × ${each} = ${rows * each}；所以 ${rows * each} ÷ ${n} = ${q}。除法就是把乘法倒過來。${tail[1]}`);
    }
    show();
    return true;
  }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }

  function step(dt) {
    const d = dt * state.speed;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (state.dealing) {
      wait -= d;
      let guard = 0;
      while (state.dealing && wait <= 0 && guard++ < 60) {
        if (done()) { finished(); break; }
        state.placed++; wait += STEP;
        show();
      }
    }
    if (view) view.update(dt);
  }

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 400);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 4; controls.maxDistance = 120;
    controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85));
    scene.add(new AmbientLight(0xffffff, 0.22));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-10, 22, 14); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 22, bottom: -22, near: 1, far: 70 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(200, 64), new MeshStandardMaterial({ color: 0x3b2a1c, roughness: 0.9 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    const plateGeo = new CylinderGeometry(2.1, 1.9, 0.16, 48);
    const plateMat = { share: new MeshStandardMaterial({ color: 0xf2efe6, roughness: 0.35 }), group: new MeshStandardMaterial({ color: 0xc8a272, roughness: 0.8 }) };
    const candyGeo = new SphereGeometry(0.5, 24, 16);
    const candyMats = CANDY.map((c) => new MeshStandardMaterial({ color: c, roughness: 0.3 }));
    let plates = [], candies = [];
    const lab = labeler($('.al-labels'), cv, camera);
    let plateLbs = [];
    const lbTable = lab.add('mth-lb mth-lb-tbl', '<b>0</b><small>on the table 桌上</small>');
    const tmp = V(0, 0, 0);

    function rebuild() {
      plates.forEach((p) => scene.remove(p)); candies.forEach((c) => scene.remove(c.mesh)); plateLbs.forEach((l) => l.remove());
      const count = nCont();
      plates = Array.from({ length: count }, (_, i) => {
        const m = new Mesh(plateGeo, plateMat[state.mode]);
        const [x, z] = containerSlot(i, count);
        m.position.set(x, 0.08, z); m.receiveShadow = true; m.castShadow = true;
        scene.add(m); return m;
      });
      plateLbs = plates.map(() => lab.add('mth-lb mth-lb-pl', '<b>0</b>'));
      candies = Array.from({ length: state.total }, (_, k) => {
        const m = new Mesh(candyGeo, candyMats[k % candyMats.length]);
        m.castShadow = true; scene.add(m);
        const c = { mesh: m, from: V(0, 0, 0), to: V(0, 0, 0), t: 1, key: '' };
        return c;
      });
      sync(true);
      frame(false);
    }
    /** 每一顆糖現在該在哪裡（盤子裡、方陣裡、或桌上那一堆） */
    function target(k, out) {
      const { q } = res(), count = nCont(), cap = state.mode === 'share' ? q : state.n;
      if (k < state.placed) {
        const s = plan[k], j = state.mode === 'share' ? Math.floor(k / state.n) : k % state.n;
        if (state.arranged) {
          const rows = count, x = (j - (cap - 1) / 2) * 1.2, z = (s.to - (rows - 1) / 2) * 1.2 - 4.4;
          return [out.set(x, 0.5, z), 1];
        }
        const [px, pz] = containerSlot(s.to, count), [cx, cz] = candySlot(j, Math.max(cap, 1));
        const cols = Math.max(Math.ceil(Math.sqrt(cap)), 1), sc = Math.min(0.88, 0.86 * Math.min(1.05, 3.1 / Math.max(cols, Math.ceil(cap / cols))));
        return [out.set(px + cx, 0.16 + 0.5 * sc, pz + cz), sc];
      }
      const [x, z] = pileSlot(k, state.total);
      return [out.set(x, 0.5, z), 1];
    }
    function sync(instant) {
      candies.forEach((c, k) => {
        const [p, sc] = target(k, tmp);
        const key = `${p.x.toFixed(3)},${p.z.toFixed(3)},${sc}`;
        if (key === c.key) return;
        c.key = key; c.scale = sc;
        if (instant) { c.mesh.position.copy(p); c.mesh.scale.setScalar(sc); c.t = 1; return; }
        c.from.copy(c.mesh.position); c.to.copy(p); c.t = 0; c.s0 = c.mesh.scale.x;
      });
      const count = nCont(), fill = tally(plan.slice(0, state.placed), count);
      plates.forEach((m, i) => { m.visible = !state.arranged && (state.mode === 'share' || state.placed > i * state.n); });
      plateLbs.forEach((l, i) => { const b = l.firstChild; if (b.textContent !== String(fill[i])) b.textContent = String(fill[i]); l.classList.toggle('is-full', state.mode === 'group' && fill[i] === state.n); });
    }
    function update(dt) {
      candies.forEach((c) => {
        if (c.t >= 1) return;
        c.t = Math.min(1, c.t + dt * state.speed / MOVE);
        const k = MathUtils.smootherstep(c.t, 0, 1);
        c.mesh.position.lerpVectors(c.from, c.to, k);
        c.mesh.position.y += Math.sin(Math.PI * c.t) * 1.6;
        c.mesh.scale.setScalar(MathUtils.lerp(c.s0 ?? 1, c.scale ?? 1, k));
      });
    }

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    const DIR = V(0, 1.15, 1).normalize();
    function frame(smooth) {
      const count = Math.max(nCont(), 1), per = Math.min(count, 10), rows = Math.ceil(count / per);
      const w = Math.max(per * 4.4, 13) + 2, zBack = -3.6 - (rows - 1) * 4.4 - 2.6, zFront = 5.2;
      const t = V(0, 0, (zBack + zFront) / 2);
      const p = DIR.clone().multiplyScalar(fit(w, (zFront - zBack) * 0.82 + 2)).add(t);
      if (!smooth) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function labels() {
      const on = state.labels, table = state.total - state.placed;
      lbTable.hidden = !on;
      if (on) {
        lbTable.firstChild.textContent = String(table);
        lbTable.classList.toggle('is-left', done() && table > 0);
        lbTable.querySelector('small').innerHTML = done() && table > 0 ? 'left over 餘數' : 'on the table 桌上';
        const rows = Math.ceil(state.total / 10);
        lab.place(lbTable, tmp.set(0, 0.4, 3.2 + rows * 0.56 + 0.7), 0);
      }
      plateLbs.forEach((l, i) => {
        l.hidden = !on || !plates[i].visible;
        if (!l.hidden) lab.place(l, tmp.copy(plates[i].position).setY(0.2).add(V(0, 0, 2.5)), 0);
      });
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 0.9);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }
    $('.al-home').addEventListener('click', () => frame(true));
    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = camera.aspect < 1.1 ? 42 : 34;
      camera.updateProjectionMatrix();
      root.classList.toggle('mth-narrow', w < 520);
      const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (band !== band0) { band0 = band; frame(false); }
    }
    const api = { scene, camera, rebuild, sync, update, render, tick, frame, candies: () => candies, plates: () => plates };
    new ResizeObserver(resize).observe(spaceWrap);
    return api;
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  R.total.addEventListener('input', () => { stopAll(); set(Number(R.total.value), state.n); });
  R.n.addEventListener('input', () => { stopAll(); set(state.total, Number(R.n.value)); });
  $$('[data-mode-btn]').forEach((b) => b.addEventListener('click', () => { stopAll(); setMode(b.getAttribute('data-mode-btn')); }));
  R.deal.addEventListener('click', () => { stopAll(); deal(); });
  $('.mth-dv-reset').addEventListener('click', reset);
  R.arrange.addEventListener('click', () => { stopAll(); setArranged(!state.arranged); });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    share() { setSpeed(1); state.mode = 'share'; set(12, 3, true); say('12 candies, 3 people. Deal them out, one each, around and around.', '12 顆糖，3 個人。一人一顆，輪流發。'); play([{ at: 1, fn: deal }]); },
    group() { setSpeed(1); state.mode = 'group'; set(12, 3, true); say('The same 12 candies, but now the question is different: how many bags of 3?', '同樣 12 顆糖，問題卻不一樣了：每袋 3 顆，可以裝幾袋？'); play([{ at: 1, fn: deal }]); },
    left() { setSpeed(1); state.mode = 'share'; set(13, 3, true); say('One more candy: 13 among 3 people.', '多一顆：13 顆分給 3 個人。'); play([{ at: 1, fn: deal }]); },
    array() { setSpeed(3); state.mode = 'share'; set(12, 3, true); say('Share 12 among 3, then line each plate up as a row.', '12 顆分給 3 個人，再把每個盤子排成一排。'); play([{ at: 0.6, fn: deal }, { at: 6, fn: () => { finish(); setArranged(true); } }]); },
  };

  let raf = 0, last = 0, visible = false;
  function frameLoop(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frameLoop);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frameLoop); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1);
  set(13, 3, true);
  if (view) view.frame(false);
  say('13 candies on the table and 3 plates. Press Deal to share them equally, or switch to bags of 3 and see what changes.', '桌上有 13 顆糖、3 個盤子。按「開始分」把糖平分；或換成「每袋 3 顆」，看看哪裡不一樣。');
  root.classList.add('al-ready');

  const counts = () => {
    const c = nCont();
    if (!view) return { containers: tally(plan.slice(0, state.placed), c), table: state.total - state.placed };
    // 從畫面上實際的糖數：離哪個盤子中心近就算哪個盤子（排成方陣時照排算）
    const cs = view.candies(), out = Array(c).fill(0); let table = 0;
    cs.forEach((x, k) => {
      const p = x.to && x.t < 1 ? x.to : x.mesh.position;
      if (k >= state.placed) { table++; return; }
      if (state.arranged) { out[plan[k].to]++; return; }
      let best = -1, bd = 1e9;
      view.plates().forEach((pl, i) => { const dd = Math.hypot(pl.position.x - p.x, pl.position.z - p.z); if (dd < bd) { bd = dd; best = i; } });
      if (bd < 2.2) out[best]++; else table++;
    });
    return { containers: out, table };
  };
  root.__lab = {
    state, view, set, setMode, deal, finish, reset, setArranged, setSpeed,
    counts,
    shown: () => ({ q: R.qv.textContent, r: R.rv.textContent, us: R.eqUs.textContent, tw: R.eqTw.textContent }),
    meshes: () => (view ? view.candies().length : state.total),
    /** 畫面上的糖＝一共；分完以後：容器數 × 每個容器幾顆＋餘數＝一共、餘數 < n、右邊顯示的商與餘數正確 */
    check: () => {
      const { q, r } = res(), c = counts(), sum = c.containers.reduce((s, x) => s + x, 0) + c.table;
      if (sum !== state.total || (view && view.candies().length !== state.total)) return false;
      if (!done()) return true;
      const each = state.mode === 'share' ? q : state.n;
      return c.containers.every((x) => x === each) && c.table === r && r < state.n
        && R.qv.textContent === String(q) && R.rv.textContent === String(r);
    },
    busy: () => state.dealing,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.frame(false),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) { step(0.02); if (view) view.tick(0.02); } },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const k = document.querySelector('[data-mth-kind]'); if (k) initKind(k);
  const c = document.querySelector('[data-mth-cycle]'); if (c) initCycle(c);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-mathdivide-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
