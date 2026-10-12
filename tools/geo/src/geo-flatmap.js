/*
 * 地理 Geography · 第一課「為什麼每一張平面地圖都是『錯』的？」。
 *
 * 一個想法：**球面攤不平**——把地球儀的表面攤成平面，一定要在形狀、面積、距離、方向之間取捨。
 * 3D：一顆地球儀（globe.js）連續攤平成地圖；可以換五種攤法（等距圓柱、麥卡托、高爾－彼得斯、莫爾威、一瓣一瓣）。
 * 地球上放了一樣大的圓，攤平後哪裡被拉大、壓扁，一眼看得出來。點地圖上任何一點（或拉緯度滑桿），
 * 右邊欄顯示那裡的東西向倍率、南北向倍率、面積倍率，以及一個小圓在那裡變成什麼形狀（全部由 geo.js 即時計算）。
 * 只畫陸地、海洋、經緯線；不畫國界、不標國名。
 *
 * 2D（不需要 WebGL）：drag2d.js「拖著走」、fit2d.js「哪一張地圖適合？」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-flatmap.js
 * 除錯：document.querySelector('[data-geoflat-lab]').__lab
 *   state（t、proj、sel）、setFlat(0–1)、setProj('equirect'|'mercator'|'gallpeters'|'mollweide'|'gores', 立即?)、
 *   select(lon, lat)、peel(目標 0|1)、demo('peel'|'mercator'|'equal'|'gores')、look(lon, lat)、info()、run(秒)、render()、goHome(立即?)
 */
import {
  AmbientLight, DirectionalLight, MathUtils, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { RAD, distortion, extent, forward, goreOf, lonLatToVec3, smallCircle } from './geo.js';
import { getLand } from './land.js';
import { makeGlobe } from './globe.js';
import { initDrag } from './drag2d.js';
import { initFit } from './fit2d.js';

const FOV = 32;
const START = [18, 22];            // 一開始鏡頭正對的經緯度（看得到非洲與格陵蘭）
const PEEL_SEC = 5;
const LABELS = [
  { key: 'greenland', lon: -41, lat: 74, html: 'Greenland <i>格陵蘭</i>' },
  { key: 'africa', lon: 20, lat: 6, html: 'Africa <i>非洲</i>' },
  { key: 'australia', lon: 134, lat: -25, html: 'Australia <i>澳洲</i>' },
  { key: 'antarctica', lon: 45, lat: -78, html: 'Antarctica <i>南極洲</i>' },
  { key: 'taiwan', lon: 121, lat: 23.7, html: 'Taiwan <i>台灣</i>', dy: -15, cls: 'gg-lab-tw' },
  { key: 'equator', lon: -28, lat: 0, html: 'Equator <i>赤道</i>', dy: -11, cls: 'gg-lab-eq' },
];
const fmt = (v) => (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const land = getLand();
  const state = { t: 0, proj: 'equirect', sel: { lon: 0, lat: 60 }, peel: null, labels: true };

  // ── 右邊欄與控制（不靠 WebGL） ──
  const flatSl = $('.gg-flat'), latSl = $('.gg-lat'), playBtn = $('.gg-peel');
  const outK = $('.gg-k'), outH = $('.gg-h'), outA = $('.gg-a'), outLat = $('.gg-latv'), outNote = $('.gg-shape-note');
  const ell = $('.gg-ell-shape'), ellRef = $('.gg-ell-ref');
  function readout() {
    const { lon, lat } = state.sel;
    const d = distortion(state.proj, lon, lat, { gore: goreOf(lon).g });
    outK.textContent = '× ' + fmt(d.k); outH.textContent = '× ' + fmt(d.h); outA.textContent = '× ' + fmt(d.area);
    const ns = lat >= 0 ? 'N' : 'S', ew = lon >= 0 ? 'E' : 'W';
    const la = Math.abs(lat).toFixed(0), lo = Math.abs(lon).toFixed(0);
    outLat.innerHTML = `${la}°${la === '0' ? '' : ' ' + ns}<small>${lo}°${lo === '0' || lo === '180' ? '' : ' ' + ew}</small>`;
    // 一個小圓在這裡變成什麼形狀：把半徑 0.5 度的圓投影過去
    const c = forward(state.proj, lon, lat, { gore: goreOf(lon).g });
    const r = 0.5 * RAD;
    const pts = smallCircle(lon, lat, 0.5, 48).map(([a, b]) => { const p = forward(state.proj, a, b, { gore: goreOf(lon).g }); return [(p[0] - c[0]) / r, (p[1] - c[1]) / r]; });
    const ext = Math.max(1, ...pts.map((p) => Math.max(Math.abs(p[0]), Math.abs(p[1]))));
    const sc = Math.min(20, 46 / ext);
    ell.setAttribute('points', pts.map(([x, y]) => `${(60 + x * sc).toFixed(1)},${(52 - y * sc).toFixed(1)}`).join(' '));
    ellRef.setAttribute('r', sc.toFixed(1));
    const same = Math.abs(d.a / d.b - 1) < 0.02, sameArea = Math.abs(d.area - 1) < 0.02;
    outNote.dataset.kind = same && sameArea ? 'true' : same ? 'shape' : sameArea ? 'area' : 'none';
    root.querySelectorAll('.gg-shape-note span[data-kind]').forEach((s) => { s.hidden = s.dataset.kind !== outNote.dataset.kind; });
  }
  function syncUI() {
    root.querySelectorAll('[data-proj]').forEach((b) => { if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', String(b.dataset.proj === state.proj)); });
    root.querySelectorAll('.gg-pinfo').forEach((d) => { d.hidden = d.dataset.pinfo !== state.proj; });
    flatSl.value = Math.round(state.t * 1000);
    latSl.value = Math.round(state.sel.lat);
    const flat = state.t > 0.5;
    playBtn.setAttribute('aria-pressed', String(!!state.peel));
    playBtn.querySelector('.al-play-t').textContent = state.peel ? 'Pause · 暫停' : flat ? 'Wrap it back · 捲回地球' : 'Peel it flat · 攤平';
    root.classList.toggle('gg-is-flat', state.t >= 0.999);
    readout();
  }

  // ── 3D ──
  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x050914, 1);
    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
    scene.add(camera);
    scene.add(new AmbientLight(0xffffff, 1.15));
    const sun = new DirectionalLight(0xffffff, 2.3);
    sun.position.set(-0.6, 0.8, 1.6);
    camera.add(sun);   // 光跟著鏡頭：球的邊緣暗一點，攤平後整張一樣亮
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const maxTex = renderer.capabilities.maxTextureSize || 2048;
    const globe = makeGlobe({ land, texWidth: small || maxTex < 4096 ? 2048 : 4096 });
    scene.add(globe.group);
    globe.addMark(121, 23.7);
    globe.setSelection(state.sel.lon, state.sel.lat);

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.6; controls.zoomSpeed = 0.7;
    const labs = labeler($('.al-labels'), cv, camera);
    const labEls = LABELS.map((l) => ({ ...l, el: labs.add(`gg-lab ${l.cls || ''}`, l.html) }));

    const globeDir = new Vector3(...lonLatToVec3(START[0], START[1]));
    const FRONT = new Vector3(0, 0, 1);
    const tanF = Math.tan(FOV * RAD / 2);
    let aspect = 1, zoom = 1;
    const fit = (w, h) => Math.max(h / 2 / tanF, w / 2 / (tanF * aspect)) * 1.12;
    function mapExtent() {
      const g = globe.state, a = extent(g.from), b = extent(g.proj);
      return { w: a.w + (b.w - a.w) * g.u, h: a.h + (b.h - a.h) * g.u };
    }
    function camDist() {
      const e = mapExtent();
      return MathUtils.lerp(fit(2.15, 2.15), fit(e.w, e.h), ease(state.t));
    }
    const dir = new Vector3();
    /** 鏡頭自己管：球的時候朝 globeDir，攤開的過程慢慢轉回正面 */
    function placeCamera() {
      const k = MathUtils.smoothstep(state.t, 0, 0.4);
      dir.copy(globeDir).lerp(FRONT, k).normalize();
      camera.position.copy(dir).multiplyScalar(camDist() * zoom);
      camera.up.set(0, 1, 0);
      controls.target.set(0, 0, 0);
      camera.lookAt(0, 0, 0);
    }
    function setControls() {
      const globeMode = state.t <= 0.001, flatMode = state.t >= 0.999;
      controls.enableRotate = globeMode;
      controls.enablePan = flatMode;
      controls.screenSpacePanning = true;
      const d = camDist();
      controls.minDistance = d * 0.35; controls.maxDistance = d * 1.6;
      controls.enabled = globeMode || flatMode;
    }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      placeCamera(); setControls();
    }
    controls.addEventListener('change', () => {
      if (state.t <= 0.001) { globeDir.copy(camera.position).normalize(); zoom = camera.position.length() / camDist(); }
      else if (state.t >= 0.999) zoom = MathUtils.clamp(camera.position.z / camDist(), 0.35, 1.6);
    });

    // 點一下（沒有拖）＝選那個點
    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObject(globe.mesh, false)[0];
      if (!hit || !hit.uv) return;
      const [lon, lat] = globe.uvToLonLat(hit.uv);
      api.select(lon, MathUtils.clamp(lat, -85, 85));
    });

    const P = new Vector3(), N = new Vector3(), toCam = new Vector3();
    function placeLabels() {
      for (const l of labEls) {
        if (!state.labels) { l.el.style.opacity = 0; continue; }
        globe.pointAt(l.lon, l.lat, P, 0.02);
        globe.normalAt(l.lon, l.lat, N);
        toCam.copy(camera.position).sub(P).normalize();
        labs.place(l.el, P, l.dy || 0);
        if (N.dot(toCam) < 0.12) l.el.style.opacity = 0;
      }
    }
    function render() {
      globe.update();
      renderer.render(scene, camera);
      placeLabels();
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return { renderer, scene, camera, controls, globe, render, placeCamera, setControls, globeDir, resetZoom() { zoom = 1; }, FRONT };
  }

  // ── 狀態 ──
  function applyFlat(t) {
    state.t = Math.min(1, Math.max(0, t));
    if (view) { view.globe.setFlat(ease(state.t)); view.placeCamera(); view.setControls(); }
  }
  const api = {
    state,
    ready: () => true,
    setFlat(t) { state.peel = null; applyFlat(t); syncUI(); },
    setProj(name, immediate) {
      state.proj = name;
      if (view) { view.globe.setProjection(name, immediate); view.resetZoom(); view.placeCamera(); view.setControls(); }
      // 麥卡托畫不到兩極：選取的緯度收進 ±80
      if (name === 'mercator' && Math.abs(state.sel.lat) > 80) api.select(state.sel.lon, 80 * Math.sign(state.sel.lat));
      syncUI();
    },
    select(lon, lat) {
      state.sel = { lon, lat };
      if (view) view.globe.setSelection(lon, lat);
      syncUI();
    },
    /** 播放攤平／捲回的動畫 */
    peel(to) {
      const target = to != null ? to : state.t > 0.5 ? 0 : 1;
      if (Math.abs(state.t - target) < 1e-3) { state.peel = null; syncUI(); return; }
      state.peel = { to: target };
      if (view) view.resetZoom();
      syncUI(); kick();
    },
    look(lon, lat) { if (view) { view.globeDir.set(...lonLatToVec3(lon, lat)); view.placeCamera(); } },
    goHome(immediate) {
      if (!view) return;
      view.resetZoom();
      if (state.t <= 0.001) view.globeDir.set(...lonLatToVec3(START[0], START[1]));
      view.placeCamera(); view.controls.update();
    },
    demo(k) {
      const set = (key, on) => { const c = root.querySelector(`[data-t="${key}"]`); if (c && c.checked !== on) { c.checked = on; c.dispatchEvent(new Event('change')); } };
      if (k === 'peel') { set('circles', false); api.setProj('equirect', state.t < 0.01); api.setFlat(0); api.goHome(); api.peel(1); }
      else if (k === 'mercator') { set('circles', true); api.setProj('mercator', state.t < 0.01); api.select(-45, 60); if (state.t < 0.999) api.peel(1); }
      else if (k === 'equal') { set('circles', true); api.setProj('gallpeters', state.t < 0.01); api.select(-45, 60); if (state.t < 0.999) api.peel(1); }
      else if (k === 'gores') { set('circles', false); api.setProj('gores', state.t < 0.01); if (state.t < 0.999) api.peel(1); }
      kick();
    },
    info() { const { lon, lat } = state.sel; return { ...distortion(state.proj, lon, lat, { gore: goreOf(lon).g }), t: state.t, proj: state.proj }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };

  // ── 控制 ──
  flatSl.addEventListener('input', () => { api.setFlat(flatSl.value / 1000); kick(); });
  latSl.addEventListener('input', () => { api.select(state.sel.lon, +latSl.value); kick(); });
  playBtn.addEventListener('click', () => { if (state.peel) { state.peel = null; syncUI(); } else api.peel(); });
  root.querySelectorAll('button[data-proj]').forEach((b) => b.addEventListener('click', () => { api.setProj(b.dataset.proj); kick(); }));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    if (c.dataset.t === 'labels') state.labels = c.checked;
    else if (view) view.globe.show(c.dataset.t, c.checked);
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => { api.goHome(); kick(); });

  // ── 迴圈：只在需要時畫 ──
  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (state.peel) {
      const dirn = Math.sign(state.peel.to - state.t);
      let t = state.t + dirn * dt / PEEL_SEC;
      if ((dirn > 0 && t >= state.peel.to) || (dirn < 0 && t <= state.peel.to)) { t = state.peel.to; state.peel = null; }
      applyFlat(t); syncUI();
      moving = true;
    }
    if (view) {
      if (view.globe.tick(dt)) { view.placeCamera(); view.setControls(); moving = true; }
      if (view.controls.enabled && view.controls.update()) moving = true;
    }
    return moving;
  }
  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    const moving = step(dt);
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 90) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  if (view) {
    view.controls.addEventListener('start', kick);
    view.controls.addEventListener('change', kick);
    cv.addEventListener('pointerdown', kick); cv.addEventListener('wheel', kick, { passive: true });
  }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  syncUI();
  kick();
  root.__lab = api;
  return api;
}

function init2D() {
  const land = getLand();
  document.querySelectorAll('[data-gg-drag]').forEach((el) => initDrag(el, land));
  document.querySelectorAll('[data-gg-fit]').forEach((el) => initFit(el, land));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geoflat-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
