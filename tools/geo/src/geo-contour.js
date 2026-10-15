/*
 * 地理 Geography · 第三課「怎麼在平面上畫出一座山？」。
 *
 * 一個想法：**等高線**——把同樣高度的點連成一圈；線越密，坡越陡。
 * 3D：一座示意的山（terrain.js 的 demoMountain，四周是海），水位一層一層升高；水邊就是等高線，每升一個等高距就在山上留下一條線。
 * 切到「從正上方看」，留下的線就是一張等高線地圖。點山上任何一點，右邊欄讀出海拔與坡度。
 * 2D（不需要 WebGL）：steep2d.js「哪一條路比較陡？」、profile2d.js「從等高線到剖面」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-contour.js
 * 除錯：document.querySelector('[data-geocontour-lab]').__lab
 *   state（water、interval、view、playing、pick）、setWater(公尺)、setInterval(50|100|200)、setView('side'|'top', 立即?)、
 *   play()、pickAt(x 公里, y 公里)、demo('rise'|'top'|'steep'|'saddle')、info()、run(秒)、render()、goHome()
 */
import {
  AmbientLight, DirectionalLight, MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { contourLevels, demoMountain, profile, slopeAt } from './terrain.js';
import { makeTerrain } from './terrain3d.js';
import { initSteep } from './steep2d.js';
import { initProfile } from './profile2d.js';

const M = demoMountain();
const TOP_M = 1100, RISE_SEC = 11;
const VIEWS = { side: new Vector3(4.2, 6.2, 9.4), top: new Vector3(0, 15.5, 0.4) };   // 從正上方看時往南偏一點點，北方才會在畫面上方

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const state = { water: 0, interval: 100, view: 'side', playing: false, pick: null, lines: true, labels: true, waterOn: true };
  const peak = makeGridMax();
  function makeGridMax() { let best = { z: -1e9 }; for (let i = 0; i <= 200; i++) for (let j = 0; j <= 200; j++) { const x = -5 + i / 20, y = -5 + j / 20, z = M.h(x, y); if (z > best.z) best = { x, y, z }; } return best; }
  const saddle = (() => { const pr = profile(M.h, [M.peak.x, M.peak.y], [M.second.x, M.second.y], 200); let lo = pr[0]; for (const p of pr) if (p.z < lo.z) lo = p; const t = lo.d / pr[pr.length - 1].d; return { x: M.peak.x + (M.second.x - M.peak.x) * t, y: M.peak.y + (M.second.y - M.peak.y) * t, z: lo.z }; })();

  const sl = $('.gg-ct-water');
  function drawn() { return contourLevels(0, Math.min(state.water, peak.z), state.interval); }
  function readout() {
    $('.gg-ct-level').innerHTML = `${Math.round(state.water).toLocaleString('en-US')} <small>m</small>`;
    $('.gg-ct-count').textContent = drawn().length;
    $('.gg-ct-int').textContent = `${state.interval} m`;
    $('.gg-ct-peak').textContent = `${Math.round(peak.z).toLocaleString('en-US')} m`;
    const p = state.pick;
    $('.gg-ct-ph').textContent = p ? `${Math.max(0, Math.round(p.z)).toLocaleString('en-US')} m` : '—';
    $('.gg-ct-ps').textContent = p ? (p.z <= 0 ? '—' : `${p.s.deg.toFixed(0)}° · ${Math.round(p.s.pct)}%`) : '—';
    const k = state.water >= peak.z ? 'over' : state.water <= 0.5 ? 'sea' : 'rise';
    root.querySelectorAll('.gg-ct-note [data-when]').forEach((s) => { s.hidden = s.dataset.when !== k; });
    root.querySelectorAll('[data-int]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.int === state.interval)));
    root.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));
    $('.gg-ct-play .al-play-t').textContent = state.playing ? 'Pause · 暫停' : state.water >= TOP_M - 1 ? 'Drain and start again · 放水重來' : 'Raise the water · 升高水位';
    $('.gg-ct-play').setAttribute('aria-pressed', String(state.playing));
    sl.value = Math.round(state.water);
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x0a1122, 1);
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 200);
    scene.add(new AmbientLight(0xffffff, 0.85));
    const sun = new DirectionalLight(0xffffff, 1.9); sun.position.set(-6, 8, 4); scene.add(sun);
    const terrain = makeTerrain({ M, n: 160, exag: 1.5 });
    scene.add(terrain.group);
    const marker = new Mesh(new SphereGeometry(0.09, 20, 14), new MeshBasicMaterial({ color: 0xff4d8a }));
    marker.visible = false; marker.renderOrder = 5; scene.add(marker);

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.enablePan = false;
    controls.minDistance = 6; controls.maxDistance = 26; controls.maxPolarAngle = Math.PI * 0.48;
    camera.position.copy(VIEWS.side); controls.target.set(0, 0.3, 0); camera.lookAt(controls.target);

    const labs = labeler($('.al-labels'), cv, camera);
    const marks = [
      { x: peak.x, y: peak.y, z: peak.z, html: `Summit <i>山頂</i> <b>${Math.round(peak.z)} m</b>`, cls: 'gg-lab-top', dy: -16 },
      { x: M.second.x, y: M.second.y, z: M.h(M.second.x, M.second.y), html: `Lower peak <i>副峰</i> <b>${Math.round(M.h(M.second.x, M.second.y))} m</b>`, cls: '', dy: -14 },
      { x: saddle.x, y: saddle.y, z: saddle.z, html: 'Saddle <i>鞍部</i>', cls: 'gg-lab-sad', dy: 16 },
      { x: M.valley.x, y: M.valley.y, z: M.h(M.valley.x, M.valley.y), html: 'Valley <i>山谷</i>', cls: 'gg-lab-val', dy: 12 },
      { x: peak.x + 1.0, y: peak.y + 0.1, z: M.h(peak.x + 1.0, peak.y + 0.1), html: 'Steep side <i>陡坡</i>', cls: '', dy: 0 },
      { x: peak.x - 2.2, y: peak.y + 0.2, z: M.h(peak.x - 2.2, peak.y + 0.2), html: 'Gentle side <i>緩坡</i>', cls: '', dy: 0 },
    ].map((m) => ({ ...m, el: labs.add(`gg-lab ${m.cls}`, m.html) }));
    const W = new Vector3();
    function placeLabels() {
      for (const m of marks) {
        if (!state.labels) { m.el.style.opacity = 0; continue; }
        W.copy(terrain.toWorld(m.x, m.y, Math.max(0, m.z))); W.y += 0.05;
        labs.place(m.el, W, m.dy);
        if (state.waterOn && m.z < state.water - 5) m.el.style.opacity = 0.35;
      }
    }

    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObject(terrain.mesh, false)[0];
      if (hit) { const [x, y] = terrain.fromWorld(hit.point); api.pickAt(x, y); }
    });

    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      const far = w / h < 1 ? 1.45 : 1;   // 直的畫面拉遠一點
      VIEWS.side.set(4.2, 6.2, 9.4).multiplyScalar(far); VIEWS.top.set(0, 15.5 * far, 0.4 * far);
    }
    function render() { renderer.render(scene, camera); placeLabels(); }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return {
      renderer, camera, controls, terrain, marker, render,
      fly: null,
      goView(v, instant) {
        const to = VIEWS[v].clone();
        if (instant) { camera.position.copy(to); controls.target.set(0, v === 'top' ? 0 : 0.3, 0); camera.lookAt(controls.target); this.fly = null; }
        else this.fly = { from: camera.position.clone(), to, t: 0, ty: v === 'top' ? 0 : 0.3 };
      },
    };
  }

  function applyLines() {
    if (!view) return;
    const L = drawn();
    const cur = state.water > 0.5 && state.water < peak.z ? L.find((l) => Math.abs(l - state.water) < 1e-6) : null;
    view.terrain.setContours(state.lines ? L : [], cur);
    view.terrain.setWater(state.water);
  }
  const api = {
    state, ready: () => true, peak, saddle,
    setWater(m) { state.water = MathUtils.clamp(m, 0, TOP_M); applyLines(); readout(); kick(); },
    setInterval(v) { state.interval = v; applyLines(); readout(); kick(); },
    setView(v, instant) { state.view = v; if (view) { view.goView(v, instant); view.controls.maxPolarAngle = v === 'top' ? 0.05 : Math.PI * 0.48; view.controls.minPolarAngle = 0; } readout(); kick(); },
    play() {
      if (state.playing) { state.playing = false; readout(); return; }
      if (state.water >= TOP_M - 1) state.water = 0;
      state.playing = true; readout(); kick();
    },
    pickAt(x, y) {
      const z = M.h(x, y);
      state.pick = { x, y, z, s: slopeAt(M.h, x, y) };
      if (view) { view.marker.position.copy(view.terrain.toWorld(x, y, Math.max(0, z))); view.marker.position.y += 0.06; view.marker.visible = true; }
      readout(); kick();
      return state.pick;
    },
    demo(k) {
      const setT = (key, on) => { const c = root.querySelector(`[data-t="${key}"]`); if (c && c.checked !== on) { c.checked = on; c.dispatchEvent(new Event('change')); } };
      setT('lines', true);
      if (k === 'rise') { setT('water', true); api.setView('side'); state.water = 0; applyLines(); state.playing = true; }
      else if (k === 'top') { api.setWater(TOP_M); setT('water', false); api.setView('top'); }
      else if (k === 'steep') { api.setWater(TOP_M); setT('water', false); api.setView('top'); api.pickAt(peak.x + 0.9, peak.y); }
      else if (k === 'saddle') { api.setWater(Math.ceil(saddle.z / 50) * 50 + 0); setT('water', true); api.setView('side'); api.pickAt(saddle.x, saddle.y); }
      readout(); kick();
    },
    info() { return { water: state.water, interval: state.interval, lines: drawn().length, peak: Math.round(peak.z), saddle: Math.round(saddle.z), pick: state.pick }; },
    goHome() { if (view) { view.goView(state.view); kick(); } },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };

  sl.addEventListener('input', () => { state.playing = false; api.setWater(+sl.value); });
  $('.gg-ct-play').addEventListener('click', () => api.play());
  root.querySelectorAll('[data-int]').forEach((b) => b.addEventListener('click', () => api.setInterval(+b.dataset.int)));
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => api.setView(b.dataset.view)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'lines') { state.lines = c.checked; applyLines(); }
    else if (k === 'water') { state.waterOn = c.checked; if (view) view.terrain.show('water', c.checked); }
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());

  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (state.playing) {
      const before = Math.floor(state.water / state.interval);
      state.water = Math.min(TOP_M, state.water + dt * TOP_M / RISE_SEC);
      if (state.water >= TOP_M) state.playing = false;
      if (Math.floor(state.water / state.interval) !== before || !state.playing) applyLines(); else if (view) view.terrain.setWater(state.water);
      readout(); moving = true;
    }
    if (view && view.fly) {
      const f = view.fly; f.t = Math.min(1, f.t + dt / 1.1); const e = f.t * f.t * (3 - 2 * f.t);
      view.camera.position.lerpVectors(f.from, f.to, e); view.controls.target.y += (f.ty - view.controls.target.y) * e;
      view.camera.lookAt(view.controls.target);
      if (f.t >= 1) view.fly = null;
      moving = true;
    }
    if (view && !view.fly && view.controls.update()) moving = true;
    return moving;
  }
  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
    const moving = step(dt);
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 90) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  if (view) { view.controls.addEventListener('start', () => { view.fly = null; kick(); }); view.controls.addEventListener('change', kick); cv.addEventListener('wheel', kick, { passive: true }); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  applyLines(); readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-steep]').forEach((el) => initSteep(el, M));
  document.querySelectorAll('[data-gg-profile]').forEach((el) => initProfile(el, M));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geocontour-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
