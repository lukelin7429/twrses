/*
 * 晶片與半導體 · 第十課「AI 晶片和一般 CPU 有什麼不同？」的 3D 模型（全部自繪示意，數字是示例）。
 *
 * 一個機制：CPU 是少數幾個又快又能幹的核心，一件一件照順序做；
 *   AI 晶片（GPU）是幾百、幾千個簡單的小運算單元，同一時間做很多件一樣的小事。
 *   工作能拆成互不相干的小塊（畫一張圖、AI 的大量乘法加法）→ 小單元一起上，快很多；
 *   工作是一步接一步（每一步要等上一步）→ 人再多也只能一個做，快的核心反而贏。
 *
 * 場景：後面一面 24×24 的板子（工作），前面一顆晶片（CPU：4 個大核心；GPU：576 個小單元）。
 *   進度只由 (job, chip, t) 決定（aicalc.js 的 done），所以切換、重播都不會亂。
 *
 * 產物：cd tools/chips && npm run build → assets/js/chip-ai.js
 * 除錯：document.querySelector('[data-chipai-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, Group, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { SIDE, TILES, CHAIN, CHIPS, total, busy, finishTime, done as doneAt, amdahl, amdahlMax } from './aicalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.55, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const TS = 0.2, BW = SIDE * TS, BY = 3.15, BZ = -1.7;            // 板子：格子大小、寬、中心高度、z
const CZ = 1.9, CW = 3.4;                                          // 晶片：z、寬

// 要畫的圖（像素畫）：藍天、太陽、山坡、一間小房子
function picture(c, r) {
  const hill = 15 + 2.5 * Math.sin(c / 3.6 + 0.6);
  if ((c - 18) ** 2 + (r - 5) ** 2 <= 10) return 0xffd23c;
  if (c >= 5 && c <= 10 && r >= 11 && r <= 15) return (c === 7 || c === 8) && r >= 13 ? 0x7a4a22 : 0xf2efe6;
  if (r >= 8 && r <= 10 && Math.abs(c - 7.5) <= (r - 7) * 1.4) return 0xd8452f;
  if (r >= hill) return r > hill + 3 ? 0x2f8f5b : 0x4fb873;
  return r < 8 ? 0x58b4ff : 0x8fd0ff;
}
// GPU 的順序：亂數排名（所有小單元同時做，哪一格先亮沒有一定）
const RANK = (() => {
  const idx = [...Array(TILES).keys()].sort((a, b) => hash(a, 9) - hash(b, 9));
  const rank = new Array(TILES); idx.forEach((t, k) => { rank[t] = k; }); return rank;
})();

function initLab(root) {
  const $ = (s) => root.querySelector(s);
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
  const scene = new Scene();
  scene.background = new Color(0x0e1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 2.2, 0);
  const homePos = () => TARGET.clone().add(V(3, 3.6, 14.5).multiplyScalar(camera.aspect < 0.85 ? 1.55 : camera.aspect < 1.2 ? 1.15 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 40; controls.maxPolarAngle = Math.PI * 0.49;
  controls.minAzimuthAngle = -1.2; controls.maxAzimuthAngle = 1.2;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const sun = new DirectionalLight(0xffffff, 1.0); sun.position.set(3, 8, 9); scene.add(sun);

  // 桌面、板子的框
  scene.add(at(new Mesh(new BoxGeometry(9, 0.12, 7), std(0x16223f, { roughness: 0.9 })), 0, -0.06, 0.4));
  scene.add(at(new Mesh(new BoxGeometry(BW + 0.3, BW + 0.3, 0.12), std(0x121828)), 0, BY, BZ - 0.1));
  scene.add(at(new Mesh(new BoxGeometry(0.3, BY - BW / 2, 0.2), std(0x222b40)), 0, (BY - BW / 2) / 2, BZ - 0.1));
  // 工作的格子
  const tiles = new InstancedMesh(new BoxGeometry(1, 1, 0.08), new MeshBasicMaterial({ color: 0xffffff }), TILES);
  tiles.frustumCulled = false; scene.add(tiles);
  // 晶片底座
  scene.add(at(new Mesh(new BoxGeometry(CW + 0.8, 0.14, CW + 0.8), std(0x1f7a4a, { roughness: 0.8 })), 0, 0.07, CZ));
  scene.add(at(new Mesh(new BoxGeometry(CW + 0.2, 0.1, CW + 0.2), std(0x2b303b)), 0, 0.19, CZ));
  // CPU：四個大核心
  const cpu = new Group(); scene.add(cpu);
  const cpuMats = [];
  for (let i = 0; i < 4; i++) {
    const m = std(0x3d6fd8, { emissive: 0x000000 }); cpuMats.push(m);
    cpu.add(at(new Mesh(new BoxGeometry(1.5, 0.34, 1.5), m), (i % 2 ? 0.82 : -0.82), 0.41, CZ + (i < 2 ? -0.82 : 0.82)));
  }
  // GPU：576 個小單元
  const gpu = new InstancedMesh(new BoxGeometry(0.105, 0.2, 0.105), new MeshBasicMaterial({ color: 0xffffff }), TILES);
  gpu.frustumCulled = false; scene.add(gpu);
  const m4 = new Matrix4(), col = new Color(), dark = new Color(0x33415f), cur = new Color(0xffd36e);
  for (let i = 0; i < TILES; i++) { m4.makeTranslation(((i % SIDE) - (SIDE - 1) / 2) * 0.14, 0.34, CZ + (Math.floor(i / SIDE) - (SIDE - 1) / 2) * 0.14); gpu.setMatrixAt(i, m4); }
  gpu.instanceMatrix.needsUpdate = true;

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    job: lab.add('cp-lb cp-ai-lb-job', ''),
    chip: lab.add('cp-lb cp-ai-lb-chip', ''),
    done: lab.add('cp-lb cp-ai-lb-done', ''),
  };

  const R = {
    chips: [...root.querySelectorAll('.cp-ai-chips button')], jobs: [...root.querySelectorAll('.cp-ai-jobs button')],
    n: $('.cp-ai-n'), t: $('.cp-ai-t'), busy: $('.cp-ai-busy'), fin: $('.cp-ai-fin'), bar: $('.cp-ai-bar'),
    msgs: [...root.querySelectorAll('.cp-ai-msg')], play: $('.al-play'),
  };
  const state = { chip: 'cpu', job: 'paint', t: 0, labels: true, playing: true, clock: 0 };
  const finished = () => state.t >= finishTime(state.job, state.chip);

  function draw() {
    const d = doneAt(state.job, state.chip, state.t), fin = finished(), pulse = 0.5 + 0.5 * Math.sin(state.clock * 9);
    // 板子
    for (let i = 0; i < TILES; i++) {
      let x, y, s, order, c;
      if (state.job === 'paint') {
        const cc = i % SIDE, r = Math.floor(i / SIDE);
        x = (cc - (SIDE - 1) / 2) * TS; y = BY + ((SIDE - 1) / 2 - r) * TS; s = TS * 0.94; c = picture(cc, r);
        order = state.chip === 'gpu' ? RANK[i] : ((r % 6) * SIDE + cc) * 4 + Math.floor(r / 6);      // CPU：四個核心各管六列
      } else if (i < CHAIN) {
        const r = Math.floor(i / 12), k = i % 12, cc = r % 2 ? 11 - k : k;                              // 蛇形的一串
        x = (cc - 5.5) * 0.4; y = BY + (1.5 - r) * 0.9; s = 0.34; c = 0x7cf29a; order = i;
      } else { m4.makeScale(0, 0, 0); tiles.setMatrixAt(i, m4); continue; }
      const p = Math.min(1, Math.max(0, d - order));                 // 這一格做了多少
      const working = p > 0 && p < 1 || (state.job === 'chain' && !fin && order === Math.floor(d));
      col.set(c); if (p < 1) col.copy(dark).lerp(working ? cur : col, working ? 0.55 + 0.45 * pulse : p);
      tiles.setColorAt(i, col);
      const sc = s * (working ? 1.08 : 1);
      m4.makeScale(sc, sc, 1).setPosition(x, y, BZ + (working ? 0.04 : 0)); tiles.setMatrixAt(i, m4);
    }
    tiles.instanceMatrix.needsUpdate = true; tiles.instanceColor.needsUpdate = true;
    // 晶片
    const isCpu = state.chip === 'cpu', nb = busy(state.job, state.chip);
    cpu.visible = isCpu; gpu.visible = !isCpu;
    if (isCpu) cpuMats.forEach((m, i) => { const on = !fin && i < nb; m.color.set(on ? 0x58b4ff : 0x2d4f96); m.emissive.set(on ? 0x2a66d0 : 0x000000).multiplyScalar(on ? 0.4 + 0.5 * pulse : 0); });
    else {
      for (let i = 0; i < TILES; i++) { const on = !fin && (nb > 1 || i === 0); col.set(on ? 0xffb347 : 0x5a4326); if (on) col.multiplyScalar(0.7 + 0.3 * Math.sin(state.clock * 9 + hash(i, 3) * 6.28)); gpu.setColorAt(i, col); }
      gpu.instanceColor.needsUpdate = true;
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, isCpu = state.chip === 'cpu', paint = state.job === 'paint';
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    L.job.innerHTML = paint ? `The job: ${TILES} tiles, each on its own<small>工作：${TILES} 格，每一格互不相干</small>` : `The job: ${CHAIN} steps, each waits for the one before<small>工作：${CHAIN} 步，每一步都要等上一步</small>`;
    L.chip.innerHTML = isCpu ? `CPU: ${CHIPS.cpu.cores} big, fast cores<small>CPU：${CHIPS.cpu.cores} 個又大又快的核心</small>` : `GPU: ${CHIPS.gpu.cores} small, simple units<small>GPU：${CHIPS.gpu.cores} 個簡單的小單元</small>`;
    show(L.job, on, V(0, BY + BW / 2 + 0.1, BZ), -16);
    show(L.chip, on, V(0, 0.5, CZ + CW / 2 + 0.3), narrow ? 26 : 22);
    L.done.innerHTML = `Done in ${fmtS(finishTime(state.job, state.chip))} second${finishTime(state.job, state.chip) === 1 ? '' : 's'}<small>${fmtS(finishTime(state.job, state.chip))} 秒做完</small>`;
    show(L.done, finished(), V(0, BY - BW / 2 - 0.1, BZ), 16);
  }
  const fmtS = (s) => (s < 10 && s % 1 ? s.toFixed(1) : String(Math.round(s)));

  function readout() {
    const tot = total(state.job), d = Math.floor(doneAt(state.job, state.chip, state.t) + 1e-6), ft = finishTime(state.job, state.chip);
    R.chips.forEach((b) => b.setAttribute('aria-pressed', b.dataset.chip === state.chip ? 'true' : 'false'));
    R.jobs.forEach((b) => b.setAttribute('aria-pressed', b.dataset.job === state.job ? 'true' : 'false'));
    R.n.innerHTML = `${d} / ${tot}<small>${state.job === 'paint' ? 'tiles · 格' : 'steps · 步'}</small>`;
    R.t.innerHTML = `${Math.min(state.t, ft).toFixed(1)} s<small>seconds · 秒</small>`;
    R.busy.innerHTML = `${finished() ? 0 : busy(state.job, state.chip)} of ${CHIPS[state.chip].cores}<small>${state.chip === 'cpu' ? 'cores · 個核心' : 'units · 個單元'}</small>`;
    R.fin.innerHTML = `${fmtS(ft)} s<small>for the whole job · 全部做完</small>`;
    R.bar.style.setProperty('--w', `${(d / tot) * 100}%`);
    const key = `${state.chip}-${state.job}`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function setPlaying(v) {
    if (v && finished()) state.t = 0;
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : finished() ? 'Run again · 再跑一次' : 'Play · 播放';
  }
  function set(chip, job) {
    if (chip in CHIPS) state.chip = chip;
    if (job === 'paint' || job === 'chain') state.job = job;
    state.t = 0; setPlaying(true); readout();
  }
  R.chips.forEach((b) => b.addEventListener('click', () => set(b.dataset.chip, state.job)));
  R.jobs.forEach((b) => b.addEventListener('click', () => set(state.chip, b.dataset.job)));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) {
    if (state.playing) {
      state.clock += dt; state.t += dt;
      if (finished()) { state.t = finishTime(state.job, state.chip); setPlaying(false); }
    }
    draw();
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 100) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = w < 560;
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  step(0); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = { cpupaint: () => set('cpu', 'paint'), gpupaint: () => set('gpu', 'paint'), cpuchain: () => set('cpu', 'chain'), gpuchain: () => set('gpu', 'chain') };
  root.__lab = {
    camera, controls, state, set, setPlaying, finished,
    seek: (t) => { state.t = Math.min(t, finishTime(state.job, state.chip)); state.playing = false; },
    render: () => { draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：人多真的就快嗎？（阿姆達爾定律；不需要 WebGL） ----------------
function initAmd() {
  const el = document.querySelector('[data-chip-amd]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const p = $('.cp-amd-p'), e = $('.cp-amd-e'), po = $('.cp-amd-p-out'), eo = $('.cp-amd-e-out'), n = $('.cp-amd-n'), bar = $('.cp-amd-bar'), en = $('.cp-amd-en'), zh = $('.cp-amd-zh');
  const f1 = (x) => (x >= 100 ? String(Math.round(x)) : x.toFixed(1).replace(/\.0$/, ''));
  function show() {
    const pp = +p.value / 100, nn = 2 ** +e.value, s = amdahl(pp, nn), mx = amdahlMax(pp);
    po.textContent = `${p.value}%`; eo.textContent = nn.toLocaleString('en-US');
    p.style.setProperty('--p', `${p.value}%`); e.style.setProperty('--p', `${+e.value * 10}%`);
    n.textContent = `${f1(s)}×`;
    bar.style.width = `${Math.min(100, (Math.log2(s) / 10) * 100)}%`;
    if (mx === Infinity) { en.textContent = 'Every part can be shared, so every extra worker helps.'; zh.textContent = '每一部分都能分工，所以多一個幫手就多快一點。'; }
    else if (pp === 0) { en.textContent = 'Nothing can be shared, so extra workers do not help at all.'; zh.textContent = '完全不能分工，再多幫手也沒有用。'; }
    else { en.textContent = `Even with endless workers, this job could never be more than ${f1(mx)} times faster.`; zh.textContent = `就算有無限多個幫手，這件工作最多也只能快 ${f1(mx)} 倍。`; }
  }
  p.addEventListener('input', show); e.addEventListener('input', show);
  el.querySelectorAll('.cp-amd-pre button').forEach((b) => b.addEventListener('click', () => { p.value = b.dataset.p; e.value = b.dataset.e; show(); }));
  show();
  el.__amd = { show, set: (a, b) => { p.value = String(a); e.value = String(b); show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAmd);
else initAmd();

lazyBoot('[data-chipai-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
