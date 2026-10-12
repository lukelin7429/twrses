/*
 * 看得見的數學 · 第二課「乘法為什麼可以交換？」的 3D 模型（全部自繪示意）。
 *
 * 一個想法：**同一盤東西，橫著數和直著數一樣多**，所以 3 × 4 ＝ 4 × 3。
 * 一個盤子上排著小方塊：rows 橫排、每排 cols 個（形狀與位置來自 array.js 的純函式）。
 *   .mth-ar-rows／.mth-ar-cols   兩條滑桿：幾排、每排幾個（1–10）
 *   .mth-count[data-by]          橫著數（一排一排：4、8、12）／直著數（一行一行：3、6、9、12）
 *   .mth-turn                    整盤順時針轉九十度：3 排每排 4 個 → 4 排每排 3 個，方塊一個也沒有多、沒有少
 *   .al-play                     兩種數法各數一次
 *   data-speed                   0.5／1／2 倍
 *   data-t="flat"                靠攏成長方形：格數就是面積
 *   data-t="labels"              標籤
 *
 * 畫面上的總數永遠是實際的方塊數（InstancedMesh 的 count）。轉盤子只改方向，不動方塊的數目；
 * 轉完才把「幾排、每排幾個」對調。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的算式、滑桿與按鈕照樣能用。
 * 2D（不需要 WebGL）：哪一盤是它轉過來的、乘法表的對稱、卡片小圖（array2d.js）。
 *
 * 產物：cd tools/math && npm run build → assets/js/math-array.js
 * 除錯：document.querySelector('[data-matharray-lab]').__lab
 *   set(rows, cols)、turn()、count('rows'|'cols')、setFlat(bool)、setPlaying(bool)、setSpeed(n)、
 *   demo('rows'|'cols'|'turn'|'area')、run(秒)、goCam()、render()、
 *   size()＝[rows, cols]、shown()＝畫面上的大數字、cubes()＝實際的方塊數、counted()＝數到幾、check()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, DynamicDrawUsage, Group, HemisphereLight, InstancedMesh, MathUtils,
  Matrix4, Mesh, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MAX, cells, extent, groups, position, skipCount, sumText, total } from './array.js';
import { drawArrayMinis, initMatch, initTable } from './array2d.js';
import { boxGeo, gridTexture } from './blocks3d.js';
import { labeler, lazyBoot } from './common.js';

const GAP = 0.3;            // 平常兩個方塊之間的縫
const STEP = 0.8;           // 1 倍速時，數一組要幾秒
const TURN = 1.4;           // 轉九十度要幾秒
const V = (x, y, z) => new Vector3(x, y, z);
const BASE = 0xf4c542;      // 還沒數到的方塊
const TONES = [0x4fb477, 0x4a90d9];   // 數過的組，一組一個顏色輪流

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = { num: $('.mth-num'), eqR: $('[data-eq="rows"]'), eqC: $('[data-eq="cols"]'), sum: $('.mth-eq'), msg: $('.mth-msg'), play: $('.al-play'), rows: $('.mth-ar-rows'), cols: $('.mth-ar-cols'), rowsOut: $('.mth-ar-rows-out'), colsOut: $('.mth-ar-cols-out'), turn: $('.mth-turn') };
  const state = { rows: 3, cols: 4, by: null, counted: 0, flat: false, gap: GAP, speed: 1, labels: true, playing: false, t: 0 };
  let counting = null;    // { by, wait }
  let turning = null;     // { t }
  let queue = [];         // 自動播放還要做的事：'rows'｜'cols'
  let script = null;      // 卡片示範：{ t, list: [{ at, fn }] }
  let view = null;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const rw = (n) => (n === 1 ? 'row' : 'rows'), cw = (n) => (n === 1 ? 'column' : 'columns');

  function show() {
    const { rows, cols } = state, n = total(rows, cols);
    R.num.textContent = String(n);
    R.eqR.innerHTML = `<b>${rows} × ${cols} = ${n}</b><span>${rows} ${rw(rows)} of ${cols} · ${rows} 橫排，每排 ${cols} 個</span>`;
    R.eqC.innerHTML = `<b>${cols} × ${rows} = ${n}</b><span>${cols} ${cw(cols)} of ${rows} · ${cols} 直排，每排 ${rows} 個</span>`;
    R.eqR.classList.toggle('is-on', state.by === 'rows'); R.eqC.classList.toggle('is-on', state.by === 'cols');
    const by = state.by || 'rows', totals = skipCount(rows, cols, by);
    R.sum.textContent = state.by && state.counted ? (state.counted >= totals.length ? sumText(rows, cols, by) : totals.slice(0, state.counted).join(', ') + ' …') : sumText(rows, cols, 'rows');
    R.rows.value = String(rows); R.cols.value = String(cols);
    R.rowsOut.textContent = String(rows); R.colsOut.textContent = String(cols);
    root.classList.toggle('mth-turning', !!turning);
    if (view) view.sync();
  }
  function clearCount() { counting = null; state.by = null; state.counted = 0; }
  function stopAll() { script = null; queue = []; if (state.playing) setPlaying(false); }

  function set(rows, cols, quiet) {
    turning = null; clearCount();
    state.rows = Math.max(1, Math.min(MAX, Math.round(rows) || 1));
    state.cols = Math.max(1, Math.min(MAX, Math.round(cols) || 1));
    if (view) { view.group.rotation.y = 0; view.refit(true); }
    show();
    if (!quiet) {
      const { rows: r, cols: c } = state, n = r * c;
      say(`${r} ${rw(r)} of ${c}: ${n} cubes. Count across, count down, or turn the tray.`, `${r} 橫排、每排 ${c} 個：一共 ${n} 個。橫著數、直著數，或把盤子轉過來看看。`);
    }
  }
  function count(by) {
    if (turning) return false;
    state.by = by; state.counted = 0;
    counting = { by, wait: STEP * 0.5 };
    const { rows, cols } = state;
    if (by === 'rows') say(`Counting across, one row at a time: each row has ${cols}.`, `橫著數，一排一排來：每排 ${cols} 個。`);
    else say(`Counting down, one column at a time: each column has ${rows}.`, `直著數，一行一行來：每一直排 ${rows} 個。`);
    show();
    return true;
  }
  function doneCounting() {
    const { rows, cols, by } = state, n = rows * cols;
    counting = null;
    if (by === 'rows') say(`${sumText(rows, cols, 'rows')}. That is ${rows} ${rw(rows)} of ${cols}: ${rows} × ${cols} = ${n}.`, `${sumText(rows, cols, 'rows', '＋')}。${rows} 橫排、每排 ${cols} 個：${rows} × ${cols} = ${n}。`);
    else say(`${sumText(rows, cols, 'cols')}. That is ${cols} ${cw(cols)} of ${rows}: ${cols} × ${rows} = ${n}. The same ${n} cubes, counted the other way.`, `${sumText(rows, cols, 'cols', '＋')}。${cols} 直排、每排 ${rows} 個：${cols} × ${rows} = ${n}。同樣的 ${n} 個方塊，只是換一個方向數。`);
  }
  function turn() {
    if (turning) return false;
    clearCount();
    turning = { t: 0 };
    say('Turning the tray a quarter turn. Watch: no cube is added, and none is taken away.', '把盤子轉九十度。注意看：沒有多放方塊，也沒有拿走。');
    show();
    return true;
  }
  function doneTurning() {
    const { rows, cols } = state, n = rows * cols;
    turning = null;
    state.rows = cols; state.cols = rows;
    if (view) { view.group.rotation.y = 0; view.refit(true); }
    show();
    say(`It was ${rows} ${rw(rows)} of ${cols}; now it is ${cols} ${rw(cols)} of ${rows}. Still ${n} cubes, so ${rows} × ${cols} = ${cols} × ${rows}.`,
        `剛才是 ${rows} 排、每排 ${cols} 個；現在是 ${cols} 排、每排 ${rows} 個。還是 ${n} 個，所以 ${rows} × ${cols} = ${cols} × ${rows}。`);
  }
  function setFlat(v, quiet) {
    state.flat = !!v;
    const tg = $('[data-t="flat"]'); if (tg) tg.checked = state.flat;
    if (!quiet) {
      const { rows, cols } = state, n = rows * cols;
      if (state.flat) say(`Pushed together, the cubes make a rectangle ${cols} units long and ${rows} units wide. Its area is ${n} square units: ${rows} × ${cols}, or ${cols} × ${rows}.`, `靠攏以後，方塊排成一個長 ${cols}、寬 ${rows} 的長方形。它的面積是 ${n} 個平方單位：${rows} × ${cols}，也是 ${cols} × ${rows}。`);
      else say('Spread apart again, so that each cube is easy to count.', '再把方塊分開，一個一個比較好數。');
    }
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Count both ways · 兩種都數一次';
    root.classList.remove('al-fresh');
    if (v) { queue = ['rows', 'cols']; if (!counting && !turning) count(queue.shift()); } else queue = [];
  }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }

  function step(dt) {
    const d = dt * state.speed;
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    const want = state.flat ? 0 : GAP;
    if (state.gap !== want) { state.gap += Math.sign(want - state.gap) * Math.min(Math.abs(want - state.gap), dt * 1.1); if (view) view.refit(true); }
    if (turning) {
      turning.t = Math.min(1, turning.t + d / TURN);
      if (view) view.group.rotation.y = -MathUtils.smootherstep(turning.t, 0, 1) * Math.PI / 2;
      if (turning.t >= 1) doneTurning();
    } else if (counting) {
      counting.wait -= d;
      let guard = 0;
      while (counting && counting.wait <= 0 && guard++ < 30) {
        const n = groups(state.rows, state.cols, counting.by).length;
        if (state.counted >= n) { doneCounting(); break; }
        state.counted++; counting.wait += STEP;
        show();
      }
      if (!counting && state.playing) {
        if (queue.length) { const next = queue.shift(); script = { t: 0, list: [{ at: 1.2 / state.speed, fn: () => { if (state.playing) count(next); } }] }; } else setPlaying(false);
      }
    }
    if (view) view.sync();
  }

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 300);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 70;
    controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85));
    scene.add(new AmbientLight(0xffffff, 0.22));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-8, 16, 10); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 50 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(160, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.36; floor.receiveShadow = true; scene.add(floor);

    const group = new Group(); scene.add(group);
    const tray = new Mesh(new BoxGeometry(1, 0.3, 1), new MeshStandardMaterial({ color: 0x6b4a2e, roughness: 0.8 }));
    tray.position.y = -0.16; tray.receiveShadow = true; tray.castShadow = true; group.add(tray);
    const cubes = new InstancedMesh(boxGeo([1, 1, 1]), new MeshStandardMaterial({ map: gridTexture(), roughness: 0.55, metalness: 0.02 }), MAX * MAX);
    cubes.instanceMatrix.setUsage(DynamicDrawUsage);
    cubes.castShadow = true; cubes.receiveShadow = true;
    group.add(cubes);
    const m4 = new Matrix4(), col = new Color();

    const lab = labeler($('.al-labels'), cv, camera);
    const lbRows = lab.add('mth-lb mth-lb-side', '<b>3</b><small>rows 橫排</small>');
    const lbCols = lab.add('mth-lb mth-lb-side', '<b>4</b><small>in each row 每排</small>');
    const lbTot = Array.from({ length: MAX }, () => lab.add('mth-lb mth-lb-tot', '<b>0</b>'));
    const tmp = V(0, 0, 0);

    /** 把方塊擺成現在的大小與縫，並依「數到第幾組」上色 */
    function sync() {
      const { rows, cols, gap } = state, list = cells(rows, cols);
      const gs = state.by ? groups(rows, cols, state.by) : [];
      list.forEach((c, i) => {
        const [x, z] = position(c.r, c.c, rows, cols, gap);
        m4.makeTranslation(x, 0.5, z); cubes.setMatrixAt(i, m4);
        const g = state.by === 'rows' ? c.r : state.by === 'cols' ? c.c : -1;
        col.setHex(g >= 0 && g < state.counted ? TONES[g % 2] : BASE);
        cubes.setColorAt(i, col);
      });
      cubes.count = list.length;
      cubes.instanceMatrix.needsUpdate = true;
      if (cubes.instanceColor) cubes.instanceColor.needsUpdate = true;
      const [w, d] = extent(rows, cols, gap);
      tray.scale.set(w + 1.1, 1, d + 1.1);
      void gs;
    }

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    const DIR = V(0, 1.05, 1).normalize();
    let framed = '';
    function frame(smooth, home) {
      const [w, d] = extent(state.rows, state.cols, GAP);
      const side = Math.max(w, d);                  // 轉的時候長邊會掃過去，所以兩個方向都留夠
      const t = V(0, 0.3, 0.2);
      const dir = home ? DIR.clone() : camera.position.clone().sub(controls.target).normalize();
      if (!Number.isFinite(dir.x) || dir.lengthSq() < 0.5) dir.copy(DIR);
      const p = dir.multiplyScalar(fit(side + 5.2, side * 0.78 + 3.4)).add(t);
      if (!smooth) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function refit(smooth) {
      const key = String(Math.max(state.rows, state.cols));
      if (key === framed) return;
      const first = !framed; framed = key;
      frame(smooth && !first, first);
    }
    function goHome(instant) { framed = String(Math.max(state.rows, state.cols)); frame(!instant, true); }
    function labels() {
      const { rows, cols, gap } = state, [w, d] = extent(rows, cols, gap), on = state.labels && !turning;
      lbRows.hidden = lbCols.hidden = !on;
      if (on) {
        lbRows.firstChild.textContent = String(rows); lbCols.firstChild.textContent = String(cols);
        lab.place(lbRows, tmp.set(-w / 2 - 1.5, 0.4, 0), 0);
        lab.place(lbCols, tmp.set(0, 0.2, d / 2 + 1.5), 0);
      }
      const totals = state.by ? skipCount(rows, cols, state.by) : [];
      lbTot.forEach((l, k) => {
        l.hidden = !(on && state.by && k < state.counted);
        if (l.hidden) return;
        l.firstChild.textContent = String(totals[k]);
        l.classList.toggle('is-b', k % 2 === 1);
        if (state.by === 'rows') { const [, z] = position(k, 0, rows, cols, gap); lab.place(l, tmp.set(w / 2 + 1.25, 0.5, z), 0); }
        else { const [x] = position(0, k, rows, cols, gap); lab.place(l, tmp.set(x, 0.5, -d / 2 - 1.25), 0); }
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
    $('.al-home').addEventListener('click', () => goHome(false));
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
      if (band !== band0) { band0 = band; goHome(true); }
    }
    const api = { group, cubes, camera, controls, scene, sync, refit, goHome, render, tick };
    sync();
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return api;
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  R.rows.addEventListener('input', () => { stopAll(); set(Number(R.rows.value), state.cols); });
  R.cols.addEventListener('input', () => { stopAll(); set(state.rows, Number(R.cols.value)); });
  $$('.mth-count').forEach((b) => b.addEventListener('click', () => { stopAll(); count(b.getAttribute('data-by')); }));
  R.turn.addEventListener('click', () => { stopAll(); turn(); });
  R.play.addEventListener('click', () => { script = null; setPlaying(!state.playing); });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  const tgF = $('[data-t="flat"]'), tgL = $('[data-t="labels"]');
  if (tgF) tgF.addEventListener('change', () => setFlat(tgF.checked));
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    rows() { stopAll(); setFlat(false, true); set(3, 4, true); setSpeed(1); play([{ at: 0.6, fn: () => count('rows') }]); say('3 rows of 4. Count across.', '3 橫排，每排 4 個。橫著數數看。'); },
    cols() { stopAll(); setFlat(false, true); set(3, 4, true); setSpeed(1); play([{ at: 0.6, fn: () => count('cols') }]); say('The same tray. This time count down the columns.', '同一盤。這一次直著數。'); },
    turn() { stopAll(); setFlat(false, true); set(3, 4, true); setSpeed(0.5); say('3 rows of 4. Now turn the whole tray.', '3 排，每排 4 個。現在把整盤轉過來。'); play([{ at: 1.2, fn: () => turn() }]); },
    area() {
      stopAll(); set(6, 7, true); setSpeed(1); setFlat(false, true);
      say('6 rows of 7: 42 cubes with gaps between them.', '6 排，每排 7 個：42 個方塊，中間有縫。');
      play([{ at: 1.6, fn: () => setFlat(true) }]);
    },
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
  set(3, 4, true);
  R.play.querySelector('.al-play-t').textContent = 'Count both ways · 兩種都數一次';
  say('3 rows of 4 cubes on a tray. Count across, count down, then turn the tray and see what changes and what does not.', '盤子上有 3 排方塊，每排 4 個。橫著數、直著數，再把盤子轉過來，看看什麼變了、什麼沒變。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, set, turn, count, setFlat, setPlaying, setSpeed,
    size: () => [state.rows, state.cols],
    shown: () => Number(R.num.textContent),
    cubes: () => (view ? view.cubes.count : null),
    counted: () => (state.by ? (skipCount(state.rows, state.cols, state.by)[state.counted - 1] || 0) : 0),
    /** 大數字＝排數 × 每排個數＝畫面上實際的方塊數；兩條算式的答案也一樣 */
    check: () => {
      const n = total(state.rows, state.cols), c = view ? view.cubes.count : n;
      const eq = (el) => Number(el.querySelector('b').textContent.split('= ')[1]);
      return Number(R.num.textContent) === n && c === n && eq(R.eqR) === n && eq(R.eqC) === n;
    },
    busy: () => !!(counting || turning),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) { step(0.02); if (view) view.tick(0.02); } },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawArrayMinis();
  const m = document.querySelector('[data-mth-match]'); if (m) initMatch(m);
  const t = document.querySelector('[data-mth-table]'); if (t) initTable(t);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-matharray-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
