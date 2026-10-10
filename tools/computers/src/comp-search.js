/*
 * 電腦概論 · 第十課「演算法是什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**同一個問題，方法不同，要做的步數可以差非常多**——而且東西越多，差得越多。
 * 場景：兩排一模一樣的蓋著的箱子，裡面的數由小到大排好，要找同一個數。
 *   後面那一排   一個一個打開（循序搜尋）
 *   前面那一排   每次打開中間那個、把不可能的那一半整個丟掉（二元搜尋）
 * 兩排同時進行、一回合各開一個，各自數「打開了幾個」。
 *   [data-n] 8／16／32 個箱子　[data-where] 藏在第一個／最後一個／隨便一個　.cp-sr-mix 把箱子弄亂（砍一半的找法就不靈了）
 *   .al-play 開始找／暫停　.cp-step 各開一個　.cp-reset 全部蓋回去
 *
 * 控制器不靠 WebGL：每一步都是 search.js 算好的；沒有 WebGL 時 3D 不畫，右邊的計數與說明照樣能用。
 * 2D（不需要 WebGL）：猜數字、箱子越來越多、該用哪一種找法——search2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-search.js
 * 除錯：document.querySelector('[data-compsearch-lab]').__lab
 *   setN(n)、setWhere('first'|'last'|'random'|索引)、setMixed(bool)、stepOnce()、setPlaying(bool)、reset()、demo('first'|'last'|'double'|'mixed')、
 *   run(秒)、goCam()、render()、sim()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, Group, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { binary, linear, makeValues, shuffle } from './search.js';
import { initGrow, initGuessNum } from './search2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const STEP = 0.75, LEN = 14, MAXN = 32, ZL = -1.5, ZB = 1.5;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), ns: [...$$('[data-n]')], wh: [...$$('[data-where]')], mix: $('.cp-sr-mix'), target: $('.cp-sr-target'), l: $('.cp-sr-l'), b: $('.cp-sr-b'), ls: $('.cp-sr-ls'), bs: $('.cp-sr-bs'), step: $('.cp-step') };
  const state = { n: 16, t: 15, where: 'last', mixed: false, k: -1, playing: false, wait: 0, labels: true };
  let boxes = [], lin = null, bin = null, rounds = 0;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function compile() { boxes = state.mixed ? shuffle(makeValues(state.n)) : makeValues(state.n); const target = boxes[state.t]; lin = linear(boxes, target); bin = binary(boxes, target); rounds = Math.max(lin.steps.length, bin.steps.length); }
  const openL = () => Math.min(state.k + 1, lin.steps.length), openB = () => Math.min(state.k + 1, bin.steps.length);
  const doneL = () => state.k + 1 >= lin.steps.length, doneB = () => state.k + 1 >= bin.steps.length;
  function show() {
    R.ns.forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-n')) === state.n ? 'true' : 'false'));
    R.wh.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-where') === state.where ? 'true' : 'false'));
    R.mix.setAttribute('aria-pressed', state.mixed ? 'true' : 'false');
    R.target.textContent = String(boxes[state.t]);
    R.l.textContent = String(openL()); R.b.textContent = String(openB());
    const st = (done, found) => (state.k < 0 ? ['', ''] : !done ? ['searching…', '還在找'] : found >= 0 ? ['found', '找到了'] : ['not found', '沒找到']);
    const a = st(doneL(), lin.found), b = st(doneB(), bin.found);
    R.ls.textContent = a[0] ? `${a[0]} · ${a[1]}` : ''; R.bs.textContent = b[0] ? `${b[0]} · ${b[1]}` : '';
    R.ls.className = `cp-sr-ls${doneL() && state.k >= 0 ? ' is-done' : ''}`; R.bs.className = `cp-sr-bs${doneB() && state.k >= 0 ? (bin.found >= 0 ? ' is-done' : ' is-fail') : ''}`;
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : state.k >= rounds - 1 ? 'Search again · 再找一次' : 'Search · 開始找';
  }
  function tell() {
    const k = state.k, sl = lin.steps[k], sb = bin.steps[k], T = boxes[state.t];
    let en = '', zh = '';
    if (sl) { en += `One by one: box ${sl.i + 1} holds ${sl.v}. ${sl.found ? 'Found it.' : 'Not it, so on to the next.'} `; zh += `一個一個找：第 ${sl.i + 1} 個箱子裡是 ${sl.v}。${sl.found ? '找到了。' : '不是，看下一個。'}`; }
    if (sb) {
      if (sb.found) { en += `Halving: the middle box holds ${sb.v}. Found it.`; zh += `每次砍一半：中間那個箱子裡是 ${sb.v}。找到了。`; }
      else { const n = sb.drop[1] - sb.drop[0] + 1; en += `Halving: the middle box holds ${sb.v}, which is too ${sb.cmp}. So ${n} box${n === 1 ? '' : 'es'} can be ruled out at once.`; zh += `每次砍一半：中間那個箱子裡是 ${sb.v}，太${sb.cmp === 'small' ? '小' : '大'}了。所以一口氣排除 ${n} 個箱子。`; }
    }
    if (k >= rounds - 1) {
      if (bin.found < 0) { en += ` Halving has nothing left to open, and it never found ${T}. It threw away the half where ${T} was hiding. Halving only works when the boxes are in order.`; zh += `砍一半的找法已經沒有箱子可開，卻沒找到 ${T}：它把藏著 ${T} 的那一半丟掉了。這種找法只有在箱子照順序排好時才管用。`; }
      else { const a = lin.steps.length, b = bin.steps.length; en += ` Done. One by one opened ${a}; halving opened ${b}.${a < b ? ' This time one by one was quicker, because the number was near the front. That is luck, not method.' : ''}`; zh += `找完了。一個一個找開了 ${a} 個；每次砍一半開了 ${b} 個。${a < b ? '這一次一個一個找比較快，因為那個數剛好在很前面。這是運氣，不是方法。' : ''}`; }
    }
    say(en, zh);
  }
  function stepOnce() { if (state.k >= rounds - 1) { state.playing = false; show(); return false; } state.k++; state.wait = STEP; tell(); if (state.k >= rounds - 1) state.playing = false; root.classList.remove('al-fresh'); show(); return true; }
  function setPlaying(on) { if (on && state.k >= rounds - 1) state.k = -1; state.playing = on; state.wait = 0.3; show(); }
  function rewind() { state.k = -1; state.playing = false; compile(); show(); intro(); }
  function setN(n) { state.n = n; if (state.where === 'last') state.t = n - 1; else if (state.where === 'first') state.t = 0; else state.t = Math.min(state.t, n - 1); rewind(); }
  function setWhere(w) {
    if (typeof w === 'number') { state.where = 'pick'; state.t = w; }
    else { state.where = w; state.t = w === 'first' ? 0 : w === 'last' ? state.n - 1 : 1 + Math.floor(Math.random() * (state.n - 2)); }
    rewind();
  }
  function setMixed(on) { state.mixed = !!on; rewind(); }
  const intro = () => (state.mixed
    ? say(`The boxes have been mixed up. The numbers are no longer in order. Both rows look for ${boxes[state.t]}. Press Search.`, `箱子被弄亂了，裡面的數不再照順序。兩排都要找 ${boxes[state.t]}。按「開始找」。`)
    : say(`Two rows of ${state.n} boxes hold the same numbers, in order from small to large. Both rows look for ${boxes[state.t]}. Press Search and compare the two counters.`, `兩排各 ${state.n} 個箱子，裡面是一樣的數，由小到大排好。兩排都要找 ${boxes[state.t]}。按「開始找」，比一比兩個計數。`));
  const user = () => {};

  R.ns.forEach((b) => b.addEventListener('click', () => { user(); setN(Number(b.getAttribute('data-n'))); }));
  R.wh.forEach((b) => b.addEventListener('click', () => { user(); setWhere(b.getAttribute('data-where')); }));
  R.mix.addEventListener('click', () => { user(); setMixed(!state.mixed); });
  R.play.addEventListener('click', () => { user(); setPlaying(!state.playing); });
  R.step.addEventListener('click', () => { user(); state.playing = false; if (state.k >= rounds - 1) state.k = -1; stepOnce(); });
  $('.cp-reset').addEventListener('click', () => { user(); rewind(); });
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
    controls.minDistance = 3; controls.maxDistance = 60; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.15)); scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-4, 9, 7); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    for (const z of [ZL, ZB]) { const s = new Mesh(new BoxGeometry(LEN + 1.2, 0.08, 1.9), mat(0x1c2947, { roughness: 0.9 })); s.position.set(0, 0.04, z); scene.add(s); }
    const cShut = new Color(0xc9a47a), cOpen = new Color(0xffe3a3), cDrop = new Color(0x46527a), cHit = new Color(0x38c778), cHitL = new Color(0x38c778);
    const unit = new BoxGeometry(1, 1, 1);
    const mkRow = (z) => Array.from({ length: MAXN }, () => {
      const g = new Group(); g.position.z = z; scene.add(g);
      const m = mat(0xc9a47a, { emissive: 0xffd36e, emissiveIntensity: 0 });
      const body = new Mesh(unit, m); g.add(body);
      const lid = new Mesh(unit, mat(0x8a6a48)); g.add(lid);
      return { g, m, body, lid, open: 0, drop: 0 };
    });
    const rowL = mkRow(ZL), rowB = mkRow(ZB);
    let size = 1, n0 = 0;
    const X = (i) => (i - (state.n - 1) / 2) * (LEN / state.n);
    function layout() {
      n0 = state.n; size = Math.min(1.0, (LEN / state.n) * 0.8);
      for (const row of [rowL, rowB]) row.forEach((b, i) => {
        b.g.visible = i < state.n; if (i >= state.n) return;
        b.g.position.x = X(i); b.body.scale.set(size, size * 0.8, size); b.body.position.y = 0.08 + size * 0.4;
        b.lid.scale.set(size * 1.06, size * 0.14, size * 1.06); b.open = 0; b.drop = 0;
      });
    }
    const lab = labeler($('.al-labels'), cv, camera);
    const lbT = [lab.add('cp-lb cp-lb-end', 'one by one<small>一個一個找</small>'), lab.add('cp-lb cp-lb-end', 'halving<small>每次砍一半</small>')];
    const lbN = [rowL, rowB].map(() => Array.from({ length: MAXN }, () => lab.add('cp-lb cp-lb-num', '')));
    const tmp = V(0, 0, 0);

    function tick(dt) {
      if (n0 !== state.n) layout();
      const e = Math.min(1, dt * 8), k = state.k;
      const upd = (row, res, isBin) => {
        const opened = new Map(); res.steps.slice(0, k + 1).forEach((s) => opened.set(s.i, s));
        const dropped = new Set();
        if (isBin) { res.steps.slice(0, k + 1).forEach((s) => { if (s.drop) for (let i = s.drop[0]; i <= s.drop[1]; i++) dropped.add(i); }); }
        for (let i = 0; i < state.n; i++) {
          const b = row[i], s = opened.get(i), o = s ? 1 : 0, d = dropped.has(i) ? 1 : 0;
          b.open += (o - b.open) * e; b.drop += (d - b.drop) * e;
          b.lid.position.y = 0.08 + size * 0.8 + size * 0.07 + b.open * size * 0.55; b.lid.position.z = -b.open * size * 0.45; b.lid.rotation.x = -b.open * 1.1;
          const c = s && s.found ? cHit : s ? cOpen : cShut; b.m.color.lerp(d && !(s && s.found) ? cDrop : c, e);
          b.m.emissiveIntensity = s && s.found ? 0.5 : s && k < res.steps.length && res.steps[k] === s ? 0.35 : 0;
          b.g.position.y += ((d && !(s && s.found) ? -0.12 * size : 0) - b.g.position.y) * e;
        }
      };
      upd(rowL, lin, false); upd(rowB, bin, true);
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 0.5, -0.9), p = V(0, 0.8, 1).normalize().multiplyScalar(fit(16.4, 5.2)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels, k = state.k, narrow = root.classList.contains('cp-narrow');
      lbT[0].hidden = lbT[1].hidden = !on;
      if (on) { lab.place(lbT[0], tmp.set(-LEN / 2, 1.9, ZL)); lab.place(lbT[1], tmp.set(-LEN / 2, 1.9, ZB)); }
      [[rowL, lin], [rowB, bin]].forEach(([row, res], r) => {
        const opened = new Map(); res.steps.slice(0, k + 1).forEach((s, j) => opened.set(s.i, j));
        for (let i = 0; i < MAXN; i++) {
          const l = lbN[r][i], j = opened.get(i), vis = i < state.n && j !== undefined && (!(narrow || state.n > 16) || j >= k - 1 || res.steps[j].found);
          l.hidden = !vis; if (!vis) continue;
          l.textContent = String(boxes[i]); l.classList.toggle('is-on', !!res.steps[j].found); l.classList.toggle('is-small', state.n > 16);
          lab.place(l, tmp.set(X(i), 0.1 + size * 0.5, r ? ZB : ZL).setY(0.1 + size * 0.45), 0);
        }
      });
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
    layout(); resize();
    return { camera, controls, scene, tick, render, goHome };
  }
  compile();
  const view = make3D();
  if (!view) root.classList.add('al-nogl');

  const go = (n, where, mixed) => { state.mixed = mixed; state.n = n; if (typeof where === 'number') { state.where = 'pick'; state.t = where; } else { state.where = where; state.t = where === 'first' ? 0 : n - 1; } rewind(); setPlaying(true); };
  const DEMO = { first() { go(16, 'first', false); }, last() { go(16, 'last', false); }, double() { go(32, 'last', false); }, mixed() { go(16, 'first', true); } };

  function step(dt) {
    if (state.playing) { state.wait -= dt; if (state.wait <= 0) stepOnce(); }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setN, setWhere, setMixed, stepOnce, setPlaying, reset: rewind, sim: () => ({ boxes, lin, bin, rounds }),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const g = document.querySelector('[data-cp-guessnum]'); if (g) initGuessNum(g);
  const w = document.querySelector('[data-cp-grow]'); if (w) initGrow(w);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compsearch-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
