/*
 * 電腦概論 · 第十二課「檔案為什麼可以變小？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**資料裡有重複，就可以用比較短的方式寫下來**——同一列裡連續相同顏色的格子，寫成「幾個＋什麼顏色」。
 * 場景：一面 16 × 16 的像素牆。按「壓縮」，由上往下一列一列，連續同色的格子收成一長條，上面寫著它有幾格；
 * 按「解開」，每一格原封不動地回來。右邊兩條長條比「原來要記幾個數」和「壓縮後要記幾個數」。
 *   [data-pic]  五張圖：apple（第二課的蘋果）、sky（大片同色）、hstripes（橫條）、vstripes（直條）、noise（雜亂）
 *   .al-play    壓縮／解開　.cp-step 一次一列　.cp-reset 回到原圖
 *
 * 控制器不靠 WebGL：每一列的寫法是 rle.js 算好的；沒有 WebGL 時 3D 不畫，右邊的計數與說明照樣能用。
 * 2D（不需要 WebGL）：自己畫一張、丟掉細節、八題選項——rle2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-rle.js
 * 除錯：document.querySelector('[data-comprle-lab]').__lab
 *   setPic(key)、pack()、unpack()、stepOnce()、reset()、demo('apple'|'hstripes'|'vstripes'|'noise')、run(秒)、goCam()、render()、sim()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { COLORS, PICS, decode, encode, numbers, numbersUpTo } from './rle.js';
import { initLossy, initRleDraw } from './rle2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ROW = 0.42, N = 16, CELL = 0.5, MAXLAB = 110;   // ROW：一列幾秒

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), pics: [...$$('[data-pic]')], orig: $('.cp-rl-orig'), now: $('.cp-rl-now'), barN: $('.cp-rl-bar-n'), step: $('.cp-step'), line: $('.cp-rl-line') };
  const state = { pic: 'apple', p: 0, dir: 0, wait: 0, labels: true };   // p：已經壓好幾列；dir：+1 壓縮中、−1 解開中、0 停
  let rows = PICS.apple, runs = encode(rows), total = numbers(runs);

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const nowN = () => numbersUpTo(runs, state.p) + (N - state.p) * N;
  function show() {
    R.pics.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pic') === state.pic ? 'true' : 'false'));
    const n = nowN(); R.orig.textContent = '256'; R.now.textContent = String(n);
    R.barN.style.width = `${Math.min(100, (n / 512) * 100)}%`; R.barN.classList.toggle('is-big', n > 256);
    R.play.setAttribute('aria-pressed', state.dir ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.dir ? 'Pause · 暫停' : state.p >= N ? 'Unpack · 解開' : 'Pack it · 壓縮';
    R.step.disabled = state.p >= N;
    const k = state.p - 1;
    R.line.innerHTML = k >= 0 && state.p <= N && state.dir >= 0 ? `<b>row ${k + 1} · 第 ${k + 1} 列</b>${runs[k].map(([m, c]) => `<span>${m}<i style="background:rgb(${COLORS[c].rgb.join(',')})"></i></span>`).join('')}` : '';
  }
  function tellRow(k) {
    const row = runs[k], n = row.length, parts = row.slice(0, 4).map(([m, c]) => `${m} ${COLORS[c].en}`).join(', '), partsZh = row.slice(0, 4).map(([m, c]) => `${m} 格${COLORS[c].zh}`).join('、');
    const more = n > 4;
    say(`Row ${k + 1}: ${parts}${more ? ', and so on' : ''}. That is ${n} piece${n === 1 ? '' : 's'}, so ${n * 2} numbers instead of 16.${n * 2 > 16 ? ' More than before!' : ''}`, `第 ${k + 1} 列：${partsZh}${more ? '……' : ''}。一共 ${n} 段，所以要記 ${n * 2} 個數，原來是 16 個。${n * 2 > 16 ? '比原來還多！' : ''}`);
  }
  function tellEnd() {
    if (total < 256) say(`Packed. The picture needed 256 numbers; now it needs ${total}. Nothing has been thrown away: press Unpack and every square comes back.`, `壓好了。這張圖原來要記 256 個數，現在只要 ${total} 個。什麼都沒有丟掉：按「解開」，每一格都會回來。`);
    else say(`Packed, but look at the count: ${total} numbers, twice as many as the 256 it started with. No two squares next to each other are the same, so there is nothing to shorten, and every square now costs two numbers instead of one.`, `壓好了，可是看看計數：${total} 個數，是原來 256 個的兩倍。同一列裡沒有任何相鄰的兩格同色，沒有東西可以寫短，每一格反而要記兩個數。`);
  }
  const intro = () => say('Each square on the wall is one number: its color. That makes 256 numbers. Press Pack it and watch each row being written in a shorter way.', '牆上每一格是一個數：它的顏色。一共 256 個數。按「壓縮」，看每一列怎麼被寫得比較短。');
  function stepOnce() { if (state.p >= N) return false; state.p++; tellRow(state.p - 1); if (state.p >= N) { state.dir = 0; tellEnd(); } root.classList.remove('al-fresh'); show(); return true; }
  function back() { if (state.p <= 0) return false; state.p--; if (state.p <= 0) { state.dir = 0; const ok = decode(runs).join('') === rows.join(''); say(ok ? 'Unpacked. All 256 squares are back, each exactly the color it was. This kind of compression loses nothing.' : 'Unpacked.', '解開了。256 格全部回來，每一格都是原來的顏色。這種壓縮什麼都不會丟。'); } show(); return true; }
  function pack() { if (state.p >= N) return; state.dir = 1; state.wait = 0.2; root.classList.remove('al-fresh'); show(); }
  function unpack() { if (state.p <= 0) return; state.dir = -1; state.wait = 0.2; show(); }
  function setPic(k) { state.pic = k; rows = PICS[k]; runs = encode(rows); total = numbers(runs); state.p = 0; state.dir = 0; if (view) view.setPic(); show(); intro(); }
  function reset() { state.p = 0; state.dir = 0; show(); intro(); }

  R.pics.forEach((b) => b.addEventListener('click', () => setPic(b.getAttribute('data-pic'))));
  R.play.addEventListener('click', () => { if (state.dir) { state.dir = 0; show(); } else if (state.p >= N) unpack(); else pack(); });
  R.step.addEventListener('click', () => { state.dir = 0; stepOnce(); });
  $('.cp-reset').addEventListener('click', () => reset());
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
    scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.25)); scene.add(new AmbientLight(0xffffff, 0.5));
    const sun = new DirectionalLight(0xfff6e8, 1.1); sun.position.set(-3, 6, 10); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const back = new Mesh(new BoxGeometry(N * CELL + 0.5, N * CELL + 0.5, 0.2), new MeshStandardMaterial({ color: 0x1c2947, roughness: 0.9 })); back.position.set(0, N * CELL / 2 + 0.35, -0.22); scene.add(back);
    const P = (x, y) => V((x - (N - 1) / 2) * CELL, 0.35 + (N - 0.5 - y) * CELL, 0);
    const unit = new BoxGeometry(1, 1, 1), mats = {};
    const mat = (c) => (mats[c] || (mats[c] = new MeshStandardMaterial({ color: new Color().setRGB(...COLORS[c].rgb.map((v) => v / 255), 'srgb'), roughness: 0.55 })));
    const px = []; for (let i = 0; i < N * N; i++) { const m = new Mesh(unit, mat('.')); m.scale.set(CELL * 0.9, CELL * 0.9, 0.16); scene.add(m); px.push(m); }
    const bars = []; for (let i = 0; i < N * N; i++) { const m = new Mesh(unit, mat('.')); m.visible = false; scene.add(m); bars.push({ m, row: 0, k: 0, n: 1, x: 0 }); }
    let nb = 0;
    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = Array.from({ length: MAXLAB }, () => lab.add('cp-lb cp-lb-run', ''));
    const tmp = V(0, 0, 0), rowK = Array(N).fill(0);
    const api = {
      setPic() {
        rows.forEach((r, y) => [...r].forEach((c, x) => { const m = px[y * N + x]; m.material = mat(c); m.position.copy(P(x, y)); }));
        nb = 0;
        runs.forEach((row, y) => { let x = 0; row.forEach(([n, c]) => { const b = bars[nb++]; b.m.material = mat(c); b.row = y; b.n = n; b.x = x; const a = P(x, y), z = P(x + n - 1, y); b.m.position.set((a.x + z.x) / 2, a.y, 0.06); x += n; }); });
        for (let i = nb; i < bars.length; i++) bars[i].m.visible = false;
        rowK.fill(0);
      },
    };
    function tick(dt) {
      const e = Math.min(1, dt * 9);
      for (let y = 0; y < N; y++) rowK[y] += ((y < state.p ? 1 : 0) - rowK[y]) * e;
      for (let i = 0; i < N * N; i++) { const y = Math.floor(i / N), k = rowK[y]; px[i].visible = k < 0.5; px[i].scale.set(CELL * (0.9 + k * 0.2), CELL * 0.9, 0.16); }
      for (let i = 0; i < nb; i++) { const b = bars[i], k = rowK[b.row]; b.m.visible = k >= 0.5; b.m.scale.set(b.n * CELL - CELL * 0.1 * (0.4 + k * 0.6), CELL * (0.9 - (k - 0.5) * 0.24), 0.3); }
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, N * CELL / 2 + 0.3, 0), p = V(0.16, 0.06, 1).normalize().multiplyScalar(fit(10.4, 10.6)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels, narrow = root.classList.contains('cp-narrow'); let j = 0;
      if (on) for (let i = 0; i < nb && j < MAXLAB; i++) {
        const b = bars[i]; if (!b.m.visible || b.n < 2 || (narrow && b.n < 4)) continue;
        const l = lbs[j++]; l.hidden = false; l.textContent = String(b.n); lab.place(l, tmp.copy(b.m.position).setZ(0.25));
      }
      for (; j < MAXLAB; j++) lbs[j].hidden = true;
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
    api.setPic(); resize();
    return { ...api, camera, controls, scene, tick, render, goHome };
  }
  const view = make3D();
  if (!view) root.classList.add('al-nogl');

  const DEMO = Object.fromEntries(['apple', 'sky', 'hstripes', 'vstripes', 'noise'].map((k) => [k, () => { setPic(k); pack(); }]));

  function step(dt) {
    if (state.dir) { state.wait -= dt; if (state.wait <= 0) { state.wait = state.dir > 0 ? ROW : ROW * 0.5; if (state.dir > 0) stepOnce(); else back(); } }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setPic, pack, unpack, stepOnce, reset, sim: () => ({ rows, runs, total }),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const d = document.querySelector('[data-cp-rledraw]'); if (d) initRleDraw(d);
  const l = document.querySelector('[data-cp-lossy]'); if (l) initLossy(l);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-comprle-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
