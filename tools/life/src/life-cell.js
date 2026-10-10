/*
 * 生命與生態 · 第一課「細胞是什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：所有生物都是細胞組成的。一個細胞是一個小袋子（細胞膜），裡面有指揮中心（細胞核）、
 *   發電廠（粒線體）和一團膠狀的細胞質。植物細胞多三樣：一道牆（細胞壁）、做食物的葉綠體、一個裝水的大液泡。
 *
 * 場景：一個切開的細胞。兩個視角：動物細胞／植物細胞；側欄點一個部分，它會亮起來並說明它做什麼。
 * 有哪些部分在 cellcalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-cell.js
 * 除錯：document.querySelector('[data-lifecell-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, DoubleSide, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { PARTS, has, kindOf } from './cellcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const NAME = {
  membrane: ['Cell membrane', '細胞膜'], nucleus: ['Nucleus', '細胞核'], mito: ['Mitochondria', '粒線體'], cytoplasm: ['Cytoplasm', '細胞質'],
  wall: ['Cell wall', '細胞壁'], chloroplast: ['Chloroplasts', '葉綠體'], vacuole: ['Vacuole', '液泡'],
};
const COLOR = { membrane: 0xf2a6b8, nucleus: 0x8a63c9, mito: 0xff9a4a, cytoplasm: 0xffe9c9, wall: 0x6fae4f, chloroplast: 0x2f9a3f, vacuole: 0x6fc4f0 };

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
  scene.background = new Color(0x0d1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 0, 0);
  const homePos = () => TARGET.clone().add(V(2.5, 2.2, 13.5).multiplyScalar(camera.aspect < 0.85 ? 1.55 : camera.aspect < 1.1 ? 1.15 : 0.95));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 45;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.15));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 8, 9); scene.add(dl);

  // 每個部分一份材質（選到的時候發亮，其他的變淡）；mats[kind][part]
  const mk = (part, o = {}) => new MeshStandardMaterial({ color: COLOR[part], roughness: 0.6, transparent: true, ...o });
  const BASE_OP = { membrane: 0.42, nucleus: 1, mito: 1, cytoplasm: 0.5, wall: 0.85, chloroplast: 1, vacuole: 0.55 };
  const G = { animal: new Group(), plant: new Group() }, mats = { animal: {}, plant: {} }, anchor = { animal: {}, plant: {} };
  scene.add(G.animal, G.plant);
  const blob = (mat, r, sx, sy, sz) => { const m = new Mesh(new SphereGeometry(r, 24, 16), mat); m.scale.set(sx, sy, sz); return m; };

  // ---------- 動物細胞：一顆圓圓的袋子，切掉前面一半 ----------
  {
    const k = 'animal', g = G[k], M = mats[k];
    for (const p of PARTS[k]) M[p] = mk(p, { ...(p === 'membrane' ? { side: DoubleSide } : {}), depthWrite: p !== 'membrane' && p !== 'cytoplasm' });
    const shell = new Mesh(new SphereGeometry(3, 48, 32, 0, Math.PI), M.membrane); shell.rotation.y = Math.PI; g.add(shell);                 // 後半球（開口朝鏡頭）
    for (let i = 0; i < 46; i++) { const a = hash(i, 1) * Math.PI * 2, r = Math.sqrt(hash(i, 2)) * 2.6, z = -hash(i, 3) * 2.2; g.add(at(blob(M.cytoplasm, 0.11, 1, 1, 1), r * Math.cos(a), r * Math.sin(a) * 0.9, z * Math.sqrt(1 - (r / 3) ** 2))); }
    g.add(at(blob(M.nucleus, 0.95, 1, 1, 0.9), -0.3, 0.2, -0.9)); g.add(at(blob(M.nucleus, 0.3, 1, 1, 1), -0.1, 0.35, -0.2));
    [[1.6, 1.0, -0.6, 0.5], [1.5, -1.1, -0.9, -0.6], [-1.8, -1.0, -0.7, 0.9], [-1.7, 1.3, -1.0, -0.4], [0.3, -1.9, -0.5, 0.2], [0.6, 1.9, -1.1, 1.2], [2.1, -0.1, -1.2, 1.5]]
      .forEach(([x, y, z, rot]) => { const m = blob(M.mito, 0.26, 1.9, 1, 1); m.rotation.z = rot; g.add(at(m, x, y, z)); });
    anchor[k] = { membrane: V(2.3, 2.0, 0), nucleus: V(-0.3, 0.2, 0), mito: V(1.6, 1.0, -0.4), cytoplasm: V(-0.6, -1.5, -0.3) };
  }
  // ---------- 植物細胞：一個方盒子（有牆），切掉前面 ----------
  {
    const k = 'plant', g = G[k], M = mats[k], W = 6.2, H = 4.2, D = 3.2, T = 0.22;
    for (const p of PARTS[k]) M[p] = mk(p, { depthWrite: p !== 'membrane' && p !== 'cytoplasm' && p !== 'vacuole' });
    const slab = (mat, w, h, d, x, y, z) => { const m = new Mesh(new BoxGeometry(w, h, d), mat); g.add(at(m, x, y, z)); };
    slab(M.wall, W, H, T, 0, 0, -D); slab(M.wall, W, T, D, 0, H / 2 - T / 2, -D / 2); slab(M.wall, W, T, D, 0, -H / 2 + T / 2, -D / 2);          // 牆：後、上、下、左、右
    slab(M.wall, T, H, D, -W / 2 + T / 2, 0, -D / 2); slab(M.wall, T, H, D, W / 2 - T / 2, 0, -D / 2);
    const iw = W - 2 * T - 0.08, ih = H - 2 * T - 0.08, mt = 0.07;                                                                                  // 膜：緊貼在牆裡面的一層薄皮
    slab(M.membrane, iw, ih, mt, 0, 0, -D + T + 0.06); slab(M.membrane, iw, mt, D - T, 0, ih / 2, -D / 2 + T / 2); slab(M.membrane, iw, mt, D - T, 0, -ih / 2, -D / 2 + T / 2);
    slab(M.membrane, mt, ih, D - T, -iw / 2, 0, -D / 2 + T / 2); slab(M.membrane, mt, ih, D - T, iw / 2, 0, -D / 2 + T / 2);
    g.add(at(blob(M.vacuole, 1, 2.05, 1.35, 1.05), 0.5, -0.1, -1.5));                                                                              // 大液泡占掉中間大部分
    g.add(at(blob(M.nucleus, 0.62, 1, 1, 0.9), -2.15, 1.05, -1.2)); g.add(at(blob(M.nucleus, 0.2, 1, 1, 1), -2.05, 1.15, -0.72));
    [[-2.3, -0.9, -0.8], [-1.2, -1.55, -1.6], [0.4, -1.6, -0.6], [1.8, -1.5, -1.5], [2.5, -0.3, -0.7], [2.4, 1.2, -1.6], [1.0, 1.55, -0.6], [-0.5, 1.6, -1.5], [-2.5, 0.1, -2.0], [0.0, 1.5, -2.3]]
      .forEach(([x, y, z], i) => { const m = blob(M.chloroplast, 0.3, 1.5, 0.8, 1); m.rotation.z = hash(i, 5) * 3; g.add(at(m, x, y, z)); });
    [[-1.4, 1.5, -0.5, 0.4], [-2.4, -1.5, -1.9, 1.0], [2.5, -1.1, -2.2, -0.5], [1.9, 1.6, -0.5, 0.9]]
      .forEach(([x, y, z, rot]) => { const m = blob(M.mito, 0.17, 1.9, 1, 1); m.rotation.z = rot; g.add(at(m, x, y, z)); });
    for (let i = 0; i < 40; i++) { const x = (hash(i, 6) - 0.5) * (iw - 0.4), y = (hash(i, 7) - 0.5) * (ih - 0.3), z = -0.3 - hash(i, 8) * (D - 0.9); if (((x - 0.5) / 2.1) ** 2 + ((y + 0.1) / 1.4) ** 2 < 1.05) continue; g.add(at(blob(M.cytoplasm, 0.09, 1, 1, 1), x, y, z)); }
    anchor[k] = { wall: V(-W / 2, H / 2, 0), membrane: V(W / 2 - 0.3, -H / 2 + 0.3, 0), nucleus: V(-2.15, 1.05, -0.6), mito: V(-1.4, 1.5, -0.4), chloroplast: V(2.4, 1.2, -1.2), vacuole: V(0.5, -0.1, -0.5), cytoplasm: V(-1.3, -0.4, -0.4) };
  }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {}; for (const p of PARTS.plant) L[p] = lab.add('cp-lb', `${NAME[p][0]}<small>${NAME[p][1]}</small>`);

  const R = { views: [...root.querySelectorAll('.cp-view button')], parts: [...root.querySelectorAll('.lf-ce-parts button')], name: $('.lf-ce-name'), only: $('.lf-ce-only'), msgs: [...root.querySelectorAll('.lf-ce-msg')], play: $('.al-play') };
  const state = { kind: 'animal', part: 'nucleus', labels: true, playing: true };

  function paint() {
    for (const k of ['animal', 'plant']) {
      G[k].visible = state.kind === k;
      for (const p of PARTS[k]) {
        const m = mats[k][p], sel = state.part === p;
        m.opacity = sel ? Math.max(BASE_OP[p], 0.8) : BASE_OP[p] * (p === 'membrane' || p === 'wall' ? 0.8 : 0.66);
        m.emissive.set(sel ? COLOR[p] : 0x000000); m.emissiveIntensity = sel ? 0.45 : 0;
      }
    }
  }
  function updateLabels() {
    for (const p of PARTS.plant) {
      const on = has(state.kind, p) && (state.labels || state.part === p);
      L[p].hidden = !on; L[p].classList.toggle('lf-lb-push', state.part === p);
      if (on) lab.place(L[p], anchor[state.kind][p], -10);
    }
  }
  function readout() {
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.kind ? 'true' : 'false'));
    R.parts.forEach((b) => { b.hidden = !has(state.kind, b.dataset.part); b.setAttribute('aria-pressed', b.dataset.part === state.part ? 'true' : 'false'); });
    R.name.innerHTML = `${NAME[state.part][0]}<small>${NAME[state.part][1]}</small>`;
    R.only.innerHTML = has('animal', state.part) ? 'Animals and plants<small>動物和植物的細胞都有</small>' : 'Plants only<small>只有植物的細胞有</small>';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== state.part; });
  }
  function set(o) {
    if (o.kind && PARTS[o.kind]) state.kind = o.kind;
    if (o.part && NAME[o.part]) state.part = o.part;
    if (!has(state.kind, state.part)) state.part = 'nucleus';        // 換成動物細胞時，植物才有的部分改回細胞核
    paint(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    controls.autoRotate = v;
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  controls.autoRotate = true; controls.autoRotateSpeed = 0.9;
  controls.minAzimuthAngle = -0.75; controls.maxAzimuthAngle = 0.75; controls.minPolarAngle = 0.75; controls.maxPolarAngle = Math.PI * 0.62;
  R.views.forEach((b) => b.addEventListener('click', () => set({ kind: b.dataset.view })));
  R.parts.forEach((b) => b.addEventListener('click', () => set({ part: b.dataset.part })));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let dir = 1;
  function frame() {
    raf = 0;
    if (!visible) return;
    // 自動慢慢左右擺（轉到角度上限就掉頭），不整圈轉，免得看到細胞的背面
    if (state.playing) { const az = controls.getAzimuthalAngle(); if (az > 0.7) dir = 1; else if (az < -0.7) dir = -1; controls.autoRotateSpeed = 0.9 * dir; }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '120px' }).observe(root);

  set({});
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = { nucleus: () => set({ kind: 'animal', part: 'nucleus' }), mito: () => set({ kind: 'animal', part: 'mito' }), wall: () => set({ kind: 'plant', part: 'wall' }), chloroplast: () => set({ kind: 'plant', part: 'chloroplast' }), vacuole: () => set({ kind: 'plant', part: 'vacuole' }), membrane: () => set({ kind: 'animal', part: 'membrane' }) };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：這是哪一種細胞？（不需要 WebGL） ----------
function initSorter() {
  const el = document.querySelector('[data-life-sorter]');
  if (!el) return;
  const kinds = JSON.parse(el.dataset.kinds), q = (s) => el.querySelector(s), boxes = [...el.querySelectorAll('.lf-so-sw input')];
  function show() {
    const v = {}; boxes.forEach((b) => { v[b.dataset.k] = b.checked; });
    const k = kindOf(v), d = kinds[k];
    q('.lf-so-pic').dataset.wall = v.wall ? '1' : '0'; q('.lf-so-pic').dataset.chl = v.chloroplast ? '1' : '0'; q('.lf-so-pic').dataset.vac = v.vacuole ? '1' : '0';
    q('.lf-so-en').textContent = d.en; q('.lf-so-zh').textContent = d.zh; q('.lf-so-note').textContent = d.note_en; q('.lf-so-note-zh').textContent = d.note_zh;
    el.dataset.k = k;
  }
  boxes.forEach((b) => b.addEventListener('change', show));
  show();
  el.__so = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSorter);
else initSorter();

lazyBoot('[data-lifecell-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
