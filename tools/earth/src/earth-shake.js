/*
 * 地球與天氣 · 第三課「規模和震度有什麼不同？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：規模是一個地震放出多少能量，一個地震只有一個數字；
 *   震度是你站的地方搖得多厲害，離震源越遠越小，所以每個地方不一樣。
 *   同樣的規模，震源越深，震央附近搖得越小、但往外減得越慢。
 *
 * 場景：簡化的台灣地圖、十個城市（柱子越高越紅＝震度越大）、一個可以換位置的示例震央，
 *   地表上一圈一圈的等震度線，地圖底下看得到震源有多深。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-shake.js
 * 除錯：document.querySelector('[data-earthshake-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, ExtrudeGeometry, HemisphereLight, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, RingGeometry, Scene, Shape, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { OUTLINE, project, KM_PER_UNIT, CITIES, EPICENTERS, ringKm, shake, energyRatio, label as lvLabel } from './shakecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.7, ...o });
// 十個級別的顏色（0、1、2、3、4、5 弱、5 強、6 弱、6 強、7）：自己配的，不是氣象署的色票
export const LV_COLORS = [0x8f9bb3, 0xcfe8ff, 0x9fe0c0, 0x7cf29a, 0xffe27a, 0xffb347, 0xff8a2a, 0xff5a46, 0xd8251a, 0xa0126a];
const DEPTH_K = 1 / 40;                                          // 深度 1 公里畫成幾個場景單位（比水平方向略為誇大）

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
  scene.background = new Color(0x0b1226);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, -0.2, 0.2);
  const homePos = () => TARGET.clone().add(V(0.8, 9.2, 9.6).multiplyScalar(camera.aspect < 0.85 ? 1.3 : camera.aspect < 1.2 ? 1.02 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 40; controls.maxPolarAngle = Math.PI * 0.62;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(-4, 10, 6); scene.add(sun);

  // 海面（半透明，看得到底下的震源）、台灣
  scene.add(at(new Mesh(new BoxGeometry(11, 0.04, 11), new MeshStandardMaterial({ color: 0x1f5fae, transparent: true, opacity: 0.42, roughness: 0.6, depthWrite: false })), 0, -0.02, 0));
  const shape = new Shape();
  OUTLINE.forEach(([lon, lat], i) => { const p = project(lon, lat); if (i) shape.lineTo(p.x, -p.z); else shape.moveTo(p.x, -p.z); });
  const island = new Mesh(new ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.03, bevelSegments: 2 }), std(0x2f7f56, { transparent: true, opacity: 0.9 }));
  island.rotation.x = -Math.PI / 2; scene.add(island);                    // Shape 的 y → 場景的 −z（北在上）

  // 城市：一根柱子（高度、顏色跟著震度）
  const cities = CITIES.map((c) => {
    const p = project(c.lon, c.lat), mat = std(0xffffff, { emissive: 0x000000 });
    const col = new Mesh(new CylinderGeometry(0.11, 0.11, 1, 16), mat); scene.add(col);
    return { ...c, x: p.x, z: p.z, col, mat };
  });
  // 震央（地表的星號）、震源（底下的球）、連線
  const epiM = new Mesh(new SphereGeometry(0.13, 20, 14), new MeshBasicMaterial({ color: 0xffffff })); scene.add(epiM);
  const hypoM = new Mesh(new SphereGeometry(0.16, 20, 14), new MeshBasicMaterial({ color: 0xff5a46 })); scene.add(hypoM);
  const stem = new Mesh(new CylinderGeometry(0.02, 0.02, 1, 8), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })); scene.add(stem);
  // 等震度線：1 到 7 級各一圈；另外一圈會動的波
  const rings = [1, 2, 3, 4, 5, 6, 7].map((lv) => { const idx = lv <= 4 ? lv : lv === 5 ? 5 : lv === 6 ? 7 : 9; const m = new Mesh(new RingGeometry(0.975, 1, 96), new MeshBasicMaterial({ color: LV_COLORS[idx], transparent: true, opacity: 0.85, side: DoubleSide, depthTest: false })); m.rotation.x = -Math.PI / 2; m.renderOrder = 4; scene.add(m); return { lv, m }; });
  const pulse = new Mesh(new RingGeometry(0.9, 1, 96), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: DoubleSide, depthTest: false })); pulse.rotation.x = -Math.PI / 2; pulse.renderOrder = 5; scene.add(pulse);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const cityL = cities.map((c) => lab.add('cp-lb ew-sk-lb-city', ''));
  const L = { epi: lab.add('cp-lb ew-sk-lb-epi', 'Epicenter<small>震央</small>'), hypo: lab.add('cp-lb ew-lb-fault slip', '') };

  const R = {
    epis: [...root.querySelectorAll('.ew-sk-epis button')], mag: $('.ew-sk-mag'), dep: $('.ew-sk-dep'), magOut: $('.ew-sk-mag-out'), depOut: $('.ew-sk-dep-out'),
    m: $('.ew-sk-m'), max: $('.ew-sk-max'), en: $('.ew-sk-en'), list: $('.ew-sk-list'), msgs: [...root.querySelectorAll('.ew-sk-msg')], play: $('.al-play'),
  };
  const state = { epi: 'east', M: 6.5, depth: 15, labels: true, playing: true, clock: 0 };
  let cur = [];

  const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
  function apply() {
    const e = EPICENTERS[state.epi], p = project(e.lon, e.lat), dy = -state.depth * DEPTH_K;
    cur = shake(state.M, state.depth, e);
    cities.forEach((c, i) => {
      const s = cur[i], h = 0.12 + Math.max(0, s.v) * 0.2;
      c.col.scale.y = h; c.col.position.set(c.x, 0.1 + h / 2, c.z);
      c.mat.color.set(LV_COLORS[s.idx]); c.mat.emissive.set(LV_COLORS[s.idx]).multiplyScalar(0.25);
      cityL[i].innerHTML = `${c.en} <b style="color:${hex(LV_COLORS[s.idx])}">${s.en}</b><small>${c.zh} ${s.zh}</small>`;
    });
    epiM.position.set(p.x, 0.14, p.z); hypoM.position.set(p.x, dy, p.z);
    stem.scale.y = Math.max(0.01, 0.14 - dy); stem.position.set(p.x, (0.14 + dy) / 2, p.z);
    // 每一級的半徑：解「示例公式算出的加速度＝這一級的下限」，再扣掉深度
    rings.forEach(({ lv, m }) => {
      const r = ringKm(state.M, state.depth, lv);
      m.visible = r > 0;
      if (m.visible) { m.scale.setScalar(r / KM_PER_UNIT); m.position.set(p.x, 0.13, p.z); }
    });
    readout();
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    cities.forEach((c, i) => { const big = !narrow || ['taipei', 'changhua', 'hualien', 'kaohsiung'].includes(c.key); show(cityL[i], on && big, V(c.x, 0.1 + c.col.scale.y, c.z), c.key === 'changhua' ? 16 : c.key === 'taichung' ? -26 : -16); cityL[i].style.marginLeft = c.key === 'changhua' ? '-58px' : c.x < 0 ? '-38px' : '38px'; });
    show(L.epi, on, epiM.position, 18);
    L.hypo.innerHTML = `The earthquake starts here, ${state.depth} km down<small>地震從這裡開始：深 ${state.depth} 公里</small>`;
    show(L.hypo, on && !narrow, hypoM.position, 40);
  }

  function readout() {
    R.epis.forEach((b) => b.setAttribute('aria-pressed', b.dataset.epi === state.epi ? 'true' : 'false'));
    R.magOut.textContent = state.M.toFixed(1); R.depOut.textContent = `${state.depth} km`;
    R.mag.style.setProperty('--p', `${((state.M - 4) / 3.5) * 100}%`); R.dep.style.setProperty('--p', `${((state.depth - 5) / 95) * 100}%`);
    const top = cur.reduce((a, b) => (b.v > a.v ? b : a), cur[0]), tc = CITIES.find((c) => c.key === top.key);
    R.m.innerHTML = `${state.M.toFixed(1)}<small>one number for the whole earthquake · 整個地震只有一個數字</small>`;
    R.max.innerHTML = `<span style="color:${hex(LV_COLORS[top.idx])}">${top.en}</span><small>in ${tc.en} · ${tc.zh} ${top.zh}</small>`;
    const er = energyRatio(state.M - 5);
    R.en.innerHTML = `${er >= 100 ? Math.round(er).toLocaleString('en-US') : er >= 10 ? Math.round(er) : er.toFixed(er < 1 ? 2 : 1)}×<small>the energy of a magnitude 5 · 規模 5 的幾倍能量</small>`;
    R.list.innerHTML = cur.map((s, i) => `<li><span>${CITIES[i].en}<small>${CITIES[i].zh}</small></span><b style="background:${hex(LV_COLORS[s.idx])}">${s.zh.replace(' 級', '')}</b></li>`).join('');
    const key = state.depth >= 60 ? 'deep' : state.M < 5 ? 'small' : state.M >= 6.5 ? 'big' : 'mid';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.epi in EPICENTERS) state.epi = o.epi;
    if (o.M != null) { state.M = Math.min(7.5, Math.max(4, Math.round(o.M * 10) / 10)); R.mag.value = String(state.M); }
    if (o.depth != null) { state.depth = Math.min(100, Math.max(5, Math.round(o.depth / 5) * 5)); R.dep.value = String(state.depth); }
    state.clock = 0; apply();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.epis.forEach((b) => b.addEventListener('click', () => set({ epi: b.dataset.epi })));
  R.mag.addEventListener('input', () => set({ M: +R.mag.value }));
  R.dep.addEventListener('input', () => set({ depth: +R.dep.value }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) {
    if (state.playing) state.clock += dt;
    const u = (state.clock * 0.35) % 1;                          // 一圈往外擴的波（裝飾：提醒震動是從震央傳出去的）
    pulse.position.copy(epiM.position).setY(0.135); pulse.scale.setScalar(0.1 + u * 4.2); pulse.material.opacity = 0.55 * (1 - u);
    const k = 1 + 0.18 * Math.sin(state.clock * 7); hypoM.scale.setScalar(k);
  }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
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

  apply(); step(0);
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = { small: () => set({ epi: 'central', M: 4.5, depth: 10 }), big: () => set({ epi: 'central', M: 7.3, depth: 10 }), deep: () => set({ epi: 'east', M: 6.5, depth: 90 }), shallow: () => set({ epi: 'east', M: 6.5, depth: 10 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying, cur: () => cur,
    rings: () => rings.filter((r) => r.m.visible).map((r) => [r.lv, Math.round(r.m.scale.x * KM_PER_UNIT)]),
    render: () => { step(0.5); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：震度分級表（不需要 WebGL） ----------------
function initScale() {
  const el = document.querySelector('[data-earth-scale10]');
  if (!el) return;
  const levels = JSON.parse(el.dataset.levels), btns = [...el.querySelectorAll('.ew-sc-lv button')];
  const q = (s) => el.querySelector(s), hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
  function show(i) {
    const lv = levels[i];
    btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    q('.ew-sc-n').textContent = lv.name_en; q('.ew-sc-n').style.color = hex(LV_COLORS[i]); q('.ew-sc-zh').textContent = lv.name_zh;
    for (const k of ['feel', 'in', 'out']) { q(`.ew-sc-${k}-en`).textContent = lv[`${k}_en`]; q(`.ew-sc-${k}-zh`).textContent = lv[`${k}_zh`]; }
    el.dataset.i = String(i);
  }
  btns.forEach((b, k) => { b.style.setProperty('--c', hex(LV_COLORS[k])); b.addEventListener('click', () => show(k)); });
  show(4);
  el.__scale = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initScale);
else initScale();

lazyBoot('[data-earthshake-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
