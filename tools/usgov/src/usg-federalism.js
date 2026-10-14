/*
 * 美國政治 U.S. Government · 第三課「為什麼每一州的法律不一樣？」。
 *
 * 一個想法：聯邦制把權力分成兩層——有些事歸全國政府，有些事歸各州，有些事兩邊都管；所以同一件事在五十州可以有五十種規定，
 * 兩層衝突時由最高條款決定。
 * 3D：五十州地圖（states3d.js，美國人口普查局的州界，須註明來源），上方一層半透明的「全國政府」。
 * 按一項權力（鑄幣、宣戰、辦學校、發駕照、徵稅……），亮起來的是管這件事的那一層（全國／各州／兩層都亮）；
 * 下面選一個題目，各州的高度與顏色就代表那個數值；也可以切換成依人口大小的方塊。點一個州看它的數值。
 *
 * 2D（不需要 WebGL）：match2d.js「這件事誰管？」、fifty2d.js「同一件事，五十種答案」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-federalism.js
 * 除錯：document.querySelector('[data-usgfed-lab]').__lab
 *   state（pw、layer、mode、sel）、power(key)、layer(key)、mode('map'|'tiles')、pick(abbr)、demo(key)、info()、run(秒)、render()
 */
import {
  AmbientLight, DirectionalLight, DoubleSide, Fog, HemisphereLight, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry,
  Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeStates3D } from './states3d.js';
import { colorAt, extent, formatValue, getStates, norm, ZH } from './usmap.js';
import { initMatch } from './match2d.js';
import { initFifty } from './fifty2d.js';

const FOV = 32;
const NAT_Y = 4.2;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const LY = Object.fromEntries(data.layers.map((l) => [l.key, l]));
  const PW = Object.fromEntries(data.powers.map((p) => [p.key, p]));
  const names = Object.fromEntries(getStates().map((s) => [s.abbr, s.name]));
  const state = { pw: data.powers[0].key, layer: data.layers[0].key, mode: 'map', sel: data.start || 'NE', labels: true };

  function colorsFor(l) {
    if (l.categories) return Object.fromEntries(Object.entries(l.values).map(([ab, v]) => [ab, (l.categories.find((c) => c.v === v) || {}).color]));
    const [lo, hi] = extent(l.values);
    return Object.fromEntries(Object.entries(l.values).map(([ab, v]) => [ab, v == null ? null : colorAt(norm(v, lo, hi))]));
  }
  function heightsFor(l) {
    if (l.categories) return Object.fromEntries(Object.entries(l.values).map(([ab, v]) => [ab, (l.categories.find((c) => c.v === v) || {}).h ?? 0.2]));
    const [lo, hi] = extent(l.values);
    return Object.fromEntries(Object.entries(l.values).map(([ab, v]) => [ab, v == null ? null : norm(v, lo, hi)]));
  }

  // ── 右邊欄（不靠 WebGL） ──
  function syncUI() {
    root.querySelectorAll('button[data-pw]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pw === state.pw)));
    root.querySelectorAll('button[data-layer]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layer === state.layer)));
    root.querySelectorAll('button[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
    root.querySelectorAll('.ug-pw').forEach((d) => { d.hidden = d.dataset.pwPanel !== state.pw; });
    root.querySelectorAll('.ug-lyr-note').forEach((d) => { d.hidden = d.dataset.note !== state.layer; });
    const l = LY[state.layer];
    const v = l.values[state.sel];
    const shown = l.categories ? ((l.categories.find((c) => c.v === v) || {}).en || '—') : formatValue(v, l.fmt);
    $('.ug-lyr-sel').innerHTML = `<b>${names[state.sel]}</b><span class="zh">${ZH[state.sel]}</span><em>${shown}</em>`;
    root.dataset.level = PW[state.pw].level;
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x060b18, 1);
    const scene = new Scene(); scene.fog = new Fog(0x060b18, 60, 140);
    const camera = new PerspectiveCamera(FOV, 1, 0.5, 400);
    scene.add(new AmbientLight(0xffffff, 0.7));
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a2436, 0.9));
    const sun = new DirectionalLight(0xfff4dc, 2.0); sun.position.set(-10, 24, 14); scene.add(sun);
    const map = makeStates3D({ population: data.population });
    scene.add(map.group);
    // 「全國政府」那一層：地圖上方一片半透明的板子
    const natMat = new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.12, side: DoubleSide, depthWrite: false, fog: false });
    const nat = new Mesh(new PlaneGeometry(map.SIZE.w * 1.02, map.SIZE.d * 1.04), natMat);
    nat.rotation.x = -Math.PI / 2; nat.position.y = NAT_Y; scene.add(nat);
    const rimMat = new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.5, side: DoubleSide, fog: false });
    const rim = new Mesh(new PlaneGeometry(map.SIZE.w * 1.02, 0.06), rimMat); rim.position.set(0, NAT_Y, map.SIZE.d * 0.52); scene.add(rim);

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.46; controls.minDistance = 6; controls.enablePan = false;
    const labs = labeler($('.al-labels'), cv, camera);
    const natLab = labs.add('ug-lab3 is-nat', 'National government <i>全國政府</i>');
    const stLab = labs.add('ug-lab3 is-stl', 'State governments <i>州政府</i>');
    const selLab = labs.add('ug-lab3 is-sel', '');

    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1;
    const TARGET = new Vector3(0, 0.8, -1.2);   // 稍微偏北，地圖才會落在畫面中間（上方還有全國那一層）
    function home() {
      const narrow = aspect < 1.15;
      const dist = Math.max(map.SIZE.w * 1.04 / 2 / (tanF * aspect), map.SIZE.d * 0.75 / tanF) * 1.04;
      const dir = (narrow ? new Vector3(0, 0.86, 0.5) : new Vector3(0, 0.74, 0.67)).normalize();
      return { target: TARGET.clone(), position: TARGET.clone().addScaledVector(dir, dist) };
    }
    let userMoved = false;
    function goHome() { const h = home(); camera.position.copy(h.position); controls.target.copy(h.target); camera.lookAt(h.target); }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      controls.maxDistance = home().position.distanceTo(TARGET) * 1.5;
      if (!userMoved) goHome();
    }
    controls.addEventListener('start', () => { userMoved = true; });

    // 點一下（沒有拖）＝選那個州
    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const ab = map.pick(ray);
      if (ab) api.pick(ab);
    });

    let natK = 0.5, natTo = 0.5;
    function apply() {
      const l = LY[state.layer];
      map.setValues(heightsFor(l), colorsFor(l));
      map.setMode(state.mode);
      const lvl = PW[state.pw].level;
      natTo = lvl === 'national' || lvl === 'both' ? 1 : 0.15;
      const stOn = lvl === 'state' || lvl === 'both' ? 1 : 0.35;
      map.setLit((ab) => (ab === state.sel ? Math.max(stOn, 0.9) : stOn));
    }
    const NATP = new Vector3(0, NAT_Y + 0.4, -map.SIZE.d * 0.46), STP = new Vector3(-map.SIZE.w * 0.36, 0.3, map.SIZE.d * 0.52);
    function tick(dt) {
      let moving = map.tick(dt);
      const d = natTo - natK;
      if (Math.abs(d) > 0.002) { natK += d * Math.min(1, dt * 6); moving = true; } else natK = natTo;
      natMat.opacity = 0.02 + 0.22 * natK; rimMat.opacity = 0.1 + 0.75 * natK;
      if (controls.update()) moving = true;
      return moving;
    }
    function render() {
      renderer.render(scene, camera);
      if (!state.labels) { for (const e of [natLab, stLab, selLab]) e.style.opacity = 0; return; }
      labs.place(natLab, NATP); natLab.classList.toggle('is-on', natK > 0.6);
      labs.place(stLab, STP); stLab.classList.toggle('is-on', PW[state.pw].level !== 'national');
      const c = map.centerOf(state.sel); c.y += 0.5;
      selLab.textContent = state.sel; labs.place(selLab, c, -10);
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return { tick, render, apply, goHome, resetUser() { userMoved = false; } };
  }

  let seq = null;
  const api = {
    state,
    ready: () => true,
    power(k) { if (!PW[k]) return; state.pw = k; if (view) view.apply(); syncUI(); kick(); },
    layer(k) { if (!LY[k]) return; state.layer = k; if (view) view.apply(); syncUI(); kick(); },
    mode(m) { state.mode = m; if (view) view.apply(); syncUI(); kick(); },
    pick(ab) { state.sel = ab; if (view) view.apply(); syncUI(); kick(); },
    demo(k) {
      const d = data.demos[k];
      if (!d) return;
      seq = null;
      if (d.layer) api.layer(d.layer);
      if (d.mode) api.mode(d.mode);
      if (d.pick) api.pick(d.pick);
      if (d.powers) seq = { t: 0, steps: d.powers.map((p, i) => [i * 2.6, () => api.power(p)]) };
      if (view) { view.resetUser(); view.goHome(); }
      kick();
    },
    info() { return { ...state, level: PW[state.pw].level, value: LY[state.layer].values[state.sel] }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('button[data-pw]').forEach((b) => b.addEventListener('click', () => { seq = null; api.power(b.dataset.pw); }));
  root.querySelectorAll('button[data-layer]').forEach((b) => b.addEventListener('click', () => api.layer(b.dataset.layer)));
  root.querySelectorAll('button[data-mode]').forEach((b) => b.addEventListener('click', () => api.mode(b.dataset.mode)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => { if (c.dataset.t === 'labels') state.labels = c.checked; kick(); }));
  if (view) $('.al-home').addEventListener('click', () => { view.resetUser(); view.goHome(); kick(); });

  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (seq) {
      seq.t += dt;
      while (seq && seq.steps.length && seq.steps[0][0] <= seq.t) { const fn = seq.steps.shift()[1]; const keep = seq; fn(); seq = keep; }
      if (seq && !seq.steps.length) seq = null;
      moving = true;
    }
    if (view && view.tick(dt)) moving = true;
    return moving;
  }
  function frame(nowMs) {
    raf = 0;
    const dt = last ? Math.min(0.05, (nowMs - last) / 1000) : 0.016;
    last = nowMs;
    const moving = step(dt);
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 90) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  if (view) { cv.addEventListener('pointerdown', kick); cv.addEventListener('wheel', kick, { passive: true }); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  if (view) view.apply();
  syncUI(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el));
  document.querySelectorAll('[data-ug-fifty]').forEach((el) => initFifty(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usgfed-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
