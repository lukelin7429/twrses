/*
 * 地理 Geography · 第四課「一張地圖要怎麼看？」。
 *
 * 一個想法：看任何一張地圖，先找三件事——**比例尺、方位、圖例**。
 * 3D：一座示意小鎮（town.js，虛構的地方）的立體模型。拉「從旁邊看 → 從正上方看」：鏡頭慢慢轉到正上方，
 * 房子、樹、燈塔這些 3D 物件淡出、地圖符號淡入——地圖就是「從上往下看，把東西換成符號」。
 * 三種範圍（整座島／小鎮／街區）＝三種比例尺；畫面角落的北方箭頭跟著鏡頭轉，從正上方看時出現圖形比例尺。
 * 2D（不需要 WebGL）：measure2d.js「量一量」、legend2d.js「照著地圖找」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-mapview.js
 * 除錯：document.querySelector('[data-geomapview-lab]').__lab
 *   state（t、view、playing）、setT(0–1)、setView('island'|'town'|'street', 立即?)、spin(度)、play()、hot(key)、demo('down'|'symbols'|'scale'|'north')、info()、run(秒)、render()
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, ConeGeometry, CylinderGeometry, DirectionalLight, DoubleSide, Group, MathUtils, Mesh,
  MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeTerrain } from './terrain3d.js';
import { AREAS, LINES, POINTS, townIsland } from './town.js';
import { HOUSES, niceBar } from './townmap2d.js';
import { SYMBOLS, symbolDataURL } from './symbols.js';
import { VIEWS, initMeasure } from './measure2d.js';
import { initLegend } from './legend2d.js';

const I = townIsland();
const EXAG = 1.5;
const inPoly = ([x, y], poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [x1, y1] = poly[i], [x2, y2] = poly[j]; if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c; } return c; };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const state = { t: 0, view: 'island', playing: false, dir: 1, hot: null };
  const tSl = $('.gg-mv-t');
  function readout() {
    tSl.value = Math.round(state.t * 100);
    const k = state.t < 0.15 ? 'side' : state.t > 0.9 ? 'map' : 'mid';
    root.querySelectorAll('.gg-mv-note [data-when]').forEach((s) => { s.hidden = s.dataset.when !== k; });
    root.querySelectorAll('[data-mview]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mview === state.view)));
    const v = VIEWS[state.view];
    $('.gg-mv-ratio').textContent = `1 : ${Math.round(v.km * 100000 / 20).toLocaleString('en-US')}`;
    $('.gg-mv-wide').textContent = v.km >= 1 ? `${v.km} km` : `${v.km * 1000} m`;
    $('.gg-mv-play .al-play-t').textContent = state.playing ? 'Pause · 暫停' : state.t > 0.5 ? 'Back to the side view · 回到側面' : 'Look straight down · 轉到正上方';
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
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    scene.add(new AmbientLight(0xffffff, 0.95));
    const sun = new DirectionalLight(0xffffff, 1.8); sun.position.set(-5, 8, 4); scene.add(sun);
    const terrain = makeTerrain({ M: I, n: 200, exag: EXAG });
    terrain.show('water', false);
    scene.add(terrain.group);
    const k = terrain.k, Y = (x, y, lift = 0) => Math.max(0, I.h(x, y)) * k + lift;

    // 貼著地面的帶子（河、路、步道、稻田）
    function ribbon(pts, w, color, lift = 0.004, dashed = false) {
      const dense = [];
      for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1], n = Math.max(2, Math.ceil(Math.hypot(bx - ax, by - ay) / 0.03)); for (let j = 0; j < n; j++) dense.push([ax + (bx - ax) * j / n, ay + (by - ay) * j / n]); }
      dense.push(pts[pts.length - 1]);
      const pos = [], idx = [];
      for (let i = 0; i < dense.length; i++) {
        const p = dense[i], q = dense[Math.min(i + 1, dense.length - 1)], o = dense[Math.max(i - 1, 0)];
        const dx = q[0] - o[0], dy = q[1] - o[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * w / 2, ny = dx / L * w / 2;
        pos.push(p[0] + nx, Y(p[0] + nx, p[1] + ny, lift), -(p[1] + ny), p[0] - nx, Y(p[0] - nx, p[1] - ny, lift), -(p[1] - ny));
        if (i + 1 < dense.length && (!dashed || i % 3 !== 2)) { const a = 2 * i; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
      }
      const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3)); g.setIndex(idx); g.computeBoundingSphere();
      return new Mesh(g, new MeshBasicMaterial({ color, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    }
    const flat = new Group(); scene.add(flat);
    flat.add(ribbon(LINES.river.pts, 0.07, 0x2f7fd6));
    for (const key of ['road', 'lane', 'coast']) { flat.add(ribbon(LINES[key].pts, 0.06, 0x3a2e24, 0.005)); flat.add(ribbon(LINES[key].pts, 0.034, 0xffd36e, 0.007)); }
    flat.add(ribbon(LINES.trail.pts, 0.03, 0xc0392b, 0.006, true));
    for (const poly of AREAS.rice.polys) {
      const ys = poly.map((p) => p[1]), xs = poly.map((p) => p[0]);
      for (let y = Math.min(...ys) + 0.06; y < Math.max(...ys) - 0.04; y += 0.12) for (let x = Math.min(...xs) + 0.06; x < Math.max(...xs) - 0.04; x += 0.16) {
        if (!inPoly([x, y], poly)) continue;
        const m = new Mesh(new BoxGeometry(0.14, 0.004, 0.1), new MeshLambertMaterial({ color: (Math.round(x * 10) + Math.round(y * 10)) % 2 ? 0xbfe08a : 0x9fcf6a }));
        m.position.set(x, Y(x, y, 0.004), -y); flat.add(m);
      }
    }

    // 3D 物件（會淡出）
    const things = new Group(); scene.add(things);
    const mats = [];
    const mat = (color) => { const m = new MeshLambertMaterial({ color, transparent: true }); mats.push(m); return m; };
    const put = (mesh, x, y, up = 0) => { mesh.position.set(x, Y(x, y) + up, -y); things.add(mesh); return mesh; };
    const wall = mat(0xf3eee4), roofRed = mat(0xb5382b), dark = mat(0x5b4a3a), white = mat(0xffffff), wood = mat(0x8a5a2b), green = mat(0x3f7d32), green2 = mat(0x5a9a3e), blue = mat(0x2f6fb5), yellow = mat(0xffd23a);
    for (const [x, y, w, h] of HOUSES) { const hh = 0.03 + (Math.abs(Math.sin(x * 37 + y * 17)) * 0.03); put(new Mesh(new BoxGeometry(w, hh, h), [wall, dark][(Math.abs(Math.round(x * 50 + y * 30))) % 2 ? 0 : 1]), x, y, hh / 2); }
    { const s = POINTS.school; put(new Mesh(new BoxGeometry(0.22, 0.06, 0.1), wall), s.x, s.y, 0.03); put(new Mesh(new CylinderGeometry(0.004, 0.004, 0.16), white), s.x + 0.12, s.y, 0.08); put(new Mesh(new BoxGeometry(0.05, 0.03, 0.004), roofRed), s.x + 0.145, s.y, 0.145); }
    { const s = POINTS.temple; put(new Mesh(new BoxGeometry(0.14, 0.05, 0.1), wall), s.x, s.y, 0.025); const r = put(new Mesh(new ConeGeometry(0.12, 0.06, 4), roofRed), s.x, s.y, 0.08); r.rotation.y = Math.PI / 4; }
    { const s = POINTS.lighthouse; put(new Mesh(new CylinderGeometry(0.025, 0.035, 0.22, 16), white), s.x, s.y, 0.11); put(new Mesh(new CylinderGeometry(0.03, 0.03, 0.03, 16), yellow), s.x, s.y, 0.235); put(new Mesh(new ConeGeometry(0.035, 0.04, 16), roofRed), s.x, s.y, 0.27); }
    { const s = POINTS.harbor; const pier = put(new Mesh(new BoxGeometry(0.34, 0.02, 0.05), wood), s.x + 0.2, s.y + 0.02, 0.01); pier.position.y = 0.01; for (const [dx, dy] of [[0.22, 0.09], [0.32, -0.06]]) { const b = put(new Mesh(new BoxGeometry(0.1, 0.025, 0.04), blue), s.x + dx, s.y + dy, 0); b.position.y = 0.012; } }
    { const s = POINTS.hut; put(new Mesh(new BoxGeometry(0.07, 0.04, 0.06), wall), s.x, s.y, 0.02); const r = put(new Mesh(new ConeGeometry(0.06, 0.04, 4), roofRed), s.x, s.y, 0.06); r.rotation.y = Math.PI / 4; }
    { const s = POINTS.bridge; const b = put(new Mesh(new BoxGeometry(0.1, 0.012, 0.07), mat(0x9a9a9a)), s.x, s.y, 0.015); b.rotation.y = 0; }
    { const poly = AREAS.forest.polys[0], xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]); let sd = 3; const rnd = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
      for (let i = 0; i < 260; i++) { const x = Math.min(...xs) + rnd() * (Math.max(...xs) - Math.min(...xs)), y = Math.min(...ys) + rnd() * (Math.max(...ys) - Math.min(...ys)); if (!inPoly([x, y], poly)) continue; const hgt = 0.06 + rnd() * 0.05; put(new Mesh(new ConeGeometry(0.03, hgt, 6), rnd() > 0.5 ? green : green2), x, y, hgt / 2); } }

    // 地圖符號（HTML，會淡入）
    const labs = labeler($('.al-labels'), cv, camera);
    const syms = Object.entries(POINTS).map(([key, p]) => {
      const el = labs.add(`gg-sym gg-sym-${key}`, `<img src="${symbolDataURL(key, 26)}" alt=""><span>${p.en}<i>${p.zh}</i></span>`);
      el.style.opacity = 0;   // 一開始是側面，符號先藏起來（不然淡出的動畫會閃一下）
      return { key, p, el };
    });
    const areaTags = [['rice', -2.65, -2.3], ['forest', -1.7, 1.8], ['town', -1.85, -1.15]].map(([key, x, y]) => ({ key, x, y, el: (() => { const e = labs.add('gg-sym gg-sym-area', `<img src="${symbolDataURL(key, 22)}" alt=""><span>${SYMBOLS[key].en}<i>${SYMBOLS[key].zh}</i></span>`); e.style.opacity = 0; return e; })() }));
    const W3 = new Vector3();
    function placeSyms() {
      const a = MathUtils.smoothstep(state.t, 0.45, 0.9);
      for (const s of syms) {
        W3.set(s.p.x, Y(s.p.x, s.p.y, 0.02), -s.p.y); labs.place(s.el, W3, 0);
        s.el.style.opacity = a;
        s.el.classList.toggle('is-hot', state.hot === s.key);
      }
      for (const s of areaTags) { W3.set(s.x, Y(s.x, s.y, 0.02), -s.y); labs.place(s.el, W3, 0); s.el.style.opacity = a * 0.95; s.el.classList.toggle('is-hot', state.hot === s.key); }
    }

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.enablePan = false; controls.enableZoom = false;
    let az = -0.6;   // 鏡頭的方位（弧度；0 是從南邊看）
    const target = new Vector3(), want = { cx: VIEWS.island.cx, cy: VIEWS.island.cy, km: 10 };
    const cur = { ...want };
    function placeCamera() {
      const pol = MathUtils.lerp(1.0, 0.012, MathUtils.smoothstep(state.t, 0, 1));   // 從 57 度斜看到幾乎正上方
      const aspect = camera.aspect || 1, fit = cur.km / 2 / Math.tan(34 * Math.PI / 360) / Math.min(1, aspect) * 1.05;
      target.set(cur.cx, Math.max(0, I.h(cur.cx, cur.cy)) * k * (1 - state.t), -cur.cy);
      camera.position.set(target.x + Math.sin(az) * Math.sin(pol) * fit, target.y + Math.cos(pol) * fit, target.z + Math.cos(az) * Math.sin(pol) * fit);
      camera.up.set(0, 1, 0); camera.lookAt(target); controls.target.copy(target);
      const fade = 1 - MathUtils.smoothstep(state.t, 0.4, 0.85);
      for (const m of mats) m.opacity = fade;
      things.visible = fade > 0.01;
    }
    // 拖曳＝轉方位（只轉水平方向；斜看的角度由滑桿決定）
    controls.enableRotate = false;
    let drag = null;
    cv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, az }; try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 沒有也沒關係 */ } });
    cv.addEventListener('pointermove', (e) => { if (!drag) return; az = drag.az - (e.clientX - drag.x) * 0.008; kick(); });
    const up = () => { drag = null; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    // 北方箭頭與比例尺（HTML 疊在畫面上）
    const north = $('.gg-mv-north i'), bar = $('.gg-mv-bar'), barLine = $('.gg-mv-bar i'), barTxt = $('.gg-mv-bar b');
    const p1 = new Vector3(), p2 = new Vector3();
    function overlays() {
      const w = cv.clientWidth, h = cv.clientHeight;
      p1.copy(target).project(camera); p2.copy(target).add(new Vector3(0, 0, -0.5)).project(camera);
      const ang = Math.atan2((p2.x - p1.x) * w, (p2.y - p1.y) * h);
      north.style.transform = `rotate(${ang}rad)`;
      p2.copy(target).add(new Vector3(1, 0, 0)).project(camera);
      const pxPerKm = Math.hypot((p2.x - p1.x) * w / 2, (p2.y - p1.y) * h / 2);
      const b = niceBar(pxPerKm, w * 0.3);
      barLine.style.width = `${b.px}px`; barTxt.textContent = b.label;
      bar.style.opacity = MathUtils.smoothstep(state.t, 0.75, 0.95);
    }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); placeCamera();
    }
    function render() { renderer.render(scene, camera); placeSyms(); overlays(); }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return {
      renderer, camera, render, placeCamera, cur, want,
      setAz(a) { az = a; }, getAz: () => az,
      step(dt) { let m = false; for (const key of ['cx', 'cy', 'km']) { const d = want[key] - cur[key]; if (Math.abs(d) > 1e-4) { cur[key] += d * Math.min(1, dt * 4); m = true; } else cur[key] = want[key]; } return m; },
    };
  }

  const api = {
    state, ready: () => true,
    setT(t) { state.t = MathUtils.clamp(t, 0, 1); if (view) view.placeCamera(); readout(); kick(); },
    setView(v, instant) { state.view = v; if (view) { Object.assign(view.want, VIEWS[v]); if (instant) Object.assign(view.cur, VIEWS[v]); view.placeCamera(); } readout(); kick(); },
    spin(deg) { if (view) { view.setAz(deg * Math.PI / 180); view.placeCamera(); kick(); } },
    play() { state.playing = !state.playing; state.dir = state.t > 0.5 ? -1 : 1; readout(); kick(); },
    hot(key) { state.hot = state.hot === key ? null : key; root.querySelectorAll('[data-sym]').forEach((b) => b.classList.toggle('is-hot', b.dataset.sym === state.hot)); kick(); },
    demo(k) {
      if (k === 'down') { api.setView('island'); state.t = 0; state.dir = 1; state.playing = true; }
      else if (k === 'symbols') { api.setT(1); api.setView('town'); api.hot('school'); state.hot = 'school'; }
      else if (k === 'scale') { api.setT(1); api.setView('street'); }
      else if (k === 'north') { api.setT(0.2); api.setView('island'); state.spinTo = (view ? view.getAz() : 0) + Math.PI; }
      readout(); kick();
    },
    info() { return { t: state.t, view: state.view, az: view ? view.getAz() : null, northDeg: view ? parseFloat(($('.gg-mv-north i').style.transform.match(/-?[\d.e-]+/) || [0])[0]) * 180 / Math.PI : null }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  tSl.addEventListener('input', () => { state.playing = false; api.setT(tSl.value / 100); });
  $('.gg-mv-play').addEventListener('click', () => api.play());
  root.querySelectorAll('[data-mview]').forEach((b) => b.addEventListener('click', () => api.setView(b.dataset.mview)));
  root.querySelectorAll('[data-sym]').forEach((b) => { b.querySelector('img').src = symbolDataURL(b.dataset.sym, 26); b.addEventListener('click', () => { if (state.t < 0.9) api.setT(1); api.hot(b.dataset.sym); }); });
  if (view) $('.al-home').addEventListener('click', () => { view.setAz(-0.6); api.setView(state.view); });

  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (state.playing) { state.t = MathUtils.clamp(state.t + state.dir * dt / 4, 0, 1); if (state.t === 0 || state.t === 1) state.playing = false; readout(); moving = true; }
    if (view && state.spinTo != null) { const a = view.getAz(), d = state.spinTo - a; if (Math.abs(d) < 0.01) state.spinTo = null; else view.setAz(a + d * Math.min(1, dt * 1.6)); moving = true; }
    if (view) { if (view.step(dt)) moving = true; view.placeCamera(); }
    return moving;
  }
  function frame(now) {
    raf = 0; const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
    const moving = step(dt); if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);
  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-measure]').forEach((el) => initMeasure(el));
  document.querySelectorAll('[data-gg-legend]').forEach((el) => initLegend(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geomapview-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
