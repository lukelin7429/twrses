/*
 * 電腦概論 · 第十六課「電腦怎麼越變越小？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**電腦從頭到尾都是同一個想法——很多個開關；變的是開關用什麼做、做得多小**。
 * 場景：一排五個展示台，照年代排：繼電器（1937）、真空管（1946，ENIAC）、第一顆電晶體（1947）、
 * 一片晶片（1971，Intel 4004）、一片晶片（2024，Apple M4）。**五個開關的外形不是照比例畫的。**
 * 每個展示台後面有一根柱子：那台機器（或那片晶片）裡有幾個開關——**柱子用對數刻度，每高一格是十倍**。
 *   [data-gen] 五個年代　.al-play 沿著年代走一遍　.cp-step 下一個　.cp-reset 回到 1937
 *
 * 控制器不靠 WebGL：資料在 shrink.js（每個數字都有來源），說明文字在課程資料；沒有 WebGL 時 3D 不畫，右邊的卡片照樣能用。
 * 2D（不需要 WebGL）：比一比、八題選項、十六課回顧——shrink2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-shrink.js
 * 除錯：document.querySelector('[data-compshrink-lab]').__lab
 *   pick(key)、next()、setPlaying(bool)、reset()、demo('eniac'|'transistor'|'i4004'|'m4')、run(秒)、goCam()、render()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { KEYS, STOPS, group, height, stop } from './shrink.js';
import { initCompare } from './shrink2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const DUR = 4.2, GAP = 3.1, UNIT = 0.36;            // UNIT：柱子每一格（十倍）多高
const X = (i) => (i - 2) * GAP;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const INFO = JSON.parse(root.getAttribute('data-stops'));
  const R = { msg: $('.cp-msg'), play: $('.al-play'), gens: [...$$('[data-gen]')], year: $('.cp-sh-year'), name: $('.cp-sh-name'), count: $('.cp-sh-count'), what: $('.cp-sh-what') };
  const state = { key: 'relay', playing: false, wait: 0, labels: true };
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    const s = stop(state.key), t = INFO[state.key];
    R.gens.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-gen') === state.key ? 'true' : 'false'));
    R.year.textContent = String(s.year); R.name.innerHTML = `${t.en}<small>${t.zh}</small>`;
    R.count.textContent = `${s.atLeast ? '> ' : ''}${group(s.count)}`; R.what.innerHTML = `${t.unit_en}<small>${t.unit_zh}</small>`;
    say(t.text_en, t.text_zh);
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Walk through the years · 沿著年代走一遍';
  }
  function pick(key) { state.key = key; state.wait = DUR; root.classList.remove('al-fresh'); show(); }
  function next() { const i = KEYS.indexOf(state.key); if (i >= KEYS.length - 1) { state.playing = false; show(); return false; } pick(KEYS[i + 1]); return true; }
  function setPlaying(on) { if (on && KEYS.indexOf(state.key) >= KEYS.length - 1) state.key = KEYS[0]; state.playing = on; state.wait = on ? DUR : 0; root.classList.remove('al-fresh'); show(); }
  function reset() { state.playing = false; state.key = 'relay'; show(); }

  R.gens.forEach((b) => b.addEventListener('click', () => { state.playing = false; pick(b.getAttribute('data-gen')); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.cp-step').addEventListener('click', () => { state.playing = false; if (!next()) pick(KEYS[0]); });
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
    controls.minDistance = 3; controls.maxDistance = 60; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.15)); scene.add(new AmbientLight(0xffffff, 0.4));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-4, 9, 8); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    const part = (g, geo, m, x, y, z) => { const b = new Mesh(geo, m); b.position.set(x, y, z); g.add(b); return b; };
    const metal = mat(0xc9ced9, { metalness: 0.6, roughness: 0.3 }), copper = mat(0xc47a3a, { metalness: 0.5, roughness: 0.4 }), dark = mat(0x1d2433);
    const builders = {
      relay(g) { part(g, new BoxGeometry(1.3, 0.12, 0.9), dark, 0, 0.06, 0); const c = part(g, new CylinderGeometry(0.3, 0.3, 0.75, 24), copper, -0.25, 0.5, 0); c.material = copper; part(g, new CylinderGeometry(0.09, 0.09, 0.9, 12), metal, -0.25, 0.55, 0); const arm = part(g, new BoxGeometry(1.05, 0.06, 0.26), metal, 0.05, 1.02, 0); arm.rotation.z = -0.1; part(g, new BoxGeometry(0.1, 0.8, 0.26), metal, 0.52, 0.5, 0); part(g, new SphereGeometry(0.07, 12, 8), mat(0xffd36e, { emissive: 0xffd36e, emissiveIntensity: 0.6 }), 0.45, 0.93, 0); },
      eniac(g) { part(g, new CylinderGeometry(0.34, 0.38, 0.28, 24), dark, 0, 0.14, 0); for (let i = 0; i < 5; i++) part(g, new CylinderGeometry(0.025, 0.025, 0.16, 6), metal, Math.cos(i * 1.26) * 0.2, -0.04, Math.sin(i * 1.26) * 0.2); part(g, new CylinderGeometry(0.33, 0.33, 0.95, 28), mat(0xcfe6ff, { transparent: true, opacity: 0.28, roughness: 0.1 }), 0, 0.76, 0); part(g, new SphereGeometry(0.33, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xcfe6ff, { transparent: true, opacity: 0.28, roughness: 0.1 }), 0, 1.235, 0); part(g, new BoxGeometry(0.3, 0.55, 0.06), metal, 0, 0.72, 0); part(g, new CylinderGeometry(0.03, 0.03, 0.6, 8), mat(0xff8a3a, { emissive: 0xff7a2a, emissiveIntensity: 1.6 }), 0, 0.72, 0.09); },
      transistor(g) { part(g, new CylinderGeometry(0.26, 0.26, 0.34, 24), metal, 0, 0.72, 0); part(g, new CylinderGeometry(0.3, 0.3, 0.05, 24), metal, 0, 0.54, 0); for (const x of [-0.12, 0, 0.12]) part(g, new CylinderGeometry(0.02, 0.02, 0.52, 6), copper, x, 0.27, 0); },
      i4004(g) { part(g, new BoxGeometry(1.5, 0.2, 0.56), mat(0xe6e0d0, { roughness: 0.5 }), 0, 0.42, 0); part(g, new BoxGeometry(0.42, 0.03, 0.34), mat(0xd9b24a, { metalness: 0.7, roughness: 0.3 }), 0, 0.535, 0); for (let i = 0; i < 8; i++) for (const z of [-0.3, 0.3]) part(g, new BoxGeometry(0.07, 0.42, 0.03), metal, -0.63 + i * 0.18, 0.2, z); },
      m4(g) { part(g, new BoxGeometry(1.25, 0.06, 1.25), mat(0x17613f, { roughness: 0.8 }), 0, 0.12, 0); part(g, new BoxGeometry(0.78, 0.07, 0.78), mat(0x2b2f3a, { metalness: 0.4, roughness: 0.35, emissive: 0x4f9dff, emissiveIntensity: 0.25 }), 0, 0.2, 0); for (let i = 0; i < 5; i++) { part(g, new BoxGeometry(0.7, 0.004, 0.012), mat(0x7ef0e3, { emissive: 0x7ef0e3, emissiveIntensity: 0.8 }), 0, 0.238, -0.28 + i * 0.14); part(g, new BoxGeometry(0.012, 0.004, 0.7), mat(0x7ef0e3, { emissive: 0x7ef0e3, emissiveIntensity: 0.8 }), -0.28 + i * 0.14, 0.238, 0); } },
    };
    const items = STOPS.map((s, i) => {
      const pedM = mat(0x2a3550, { emissive: 0xffd36e, emissiveIntensity: 0 });
      const ped = new Mesh(new CylinderGeometry(1.0, 1.1, 0.5, 40), pedM); ped.position.set(X(i), 0.25, 0.4); scene.add(ped);
      const g = new Group(); g.position.set(X(i), 0.5, 0.4); scene.add(g); builders[s.key](g);
      const h = Math.max(0.06, height(s.count) * UNIT), colM = mat(0x4f9dff, { emissive: 0x4f9dff, emissiveIntensity: 0.15 });
      const col = new Mesh(new BoxGeometry(0.7, 1, 0.7), colM); col.scale.y = h; col.position.set(X(i), h / 2, -1.6); scene.add(col);
      for (let k = 1; k <= Math.floor(height(s.count)); k++) { const tick = new Mesh(new BoxGeometry(0.74, 0.015, 0.74), mat(0x0b1326)); tick.position.set(X(i), k * UNIT, -1.6); scene.add(tick); }
      return { s, ped, pedM, g, col, colM, h, k: 0 };
    });
    const lab = labeler($('.al-labels'), cv, camera);
    const lbN = items.map((o) => lab.add('cp-lb cp-lb-end', `${o.s.year}<small>${INFO[o.s.key].short_zh}</small>`));
    const lbC = items.map((o) => lab.add('cp-lb cp-lb-val', `${o.s.atLeast ? '> ' : ''}${group(o.s.count)}`));
    const lbK = lab.add('cp-lb cp-lb-side', 'one step up = ten times more<small>每高一格＝十倍</small>');
    const tmp = V(0, 0, 0);
    function tick(dt) {
      const e = Math.min(1, dt * 6);
      items.forEach((o) => { const on = o.s.key === state.key ? 1 : 0; o.k += (on - o.k) * e; o.pedM.emissiveIntensity = o.k * 0.55; o.colM.emissiveIntensity = 0.15 + o.k * 0.75; o.g.position.y = 0.5 + o.k * 0.18; o.g.rotation.y += dt * (0.25 + o.k * 0.5); });
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 1.8, -0.4), p = V(0.0, 0.36, 1).normalize().multiplyScalar(fit(16.6, 6.6)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels;
      items.forEach((o, i) => { lbN[i].hidden = lbC[i].hidden = !on; if (!on) return; lbN[i].classList.toggle('is-on', o.s.key === state.key); lab.place(lbN[i], tmp.set(X(i), 0.1, 1.75)); lab.place(lbC[i], tmp.set(X(i), o.h + 0.28, -1.6)); });
      lbK.hidden = !on; if (on) lab.place(lbK, tmp.set(X(2) - 1.55, 3.2, -1.6));
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
    resize();
    return { camera, controls, scene, tick, render, goHome };
  }
  const view = make3D();
  if (!view) root.classList.add('al-nogl');

  const DEMO = Object.fromEntries(KEYS.map((k) => [k, () => { state.playing = false; pick(k); }]));
  function step(dt) {
    if (state.playing) { state.wait -= dt; if (state.wait <= 0) next(); }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, pick, next, setPlaying, reset,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const c = document.querySelector('[data-cp-compare]'); if (c) initCompare(c);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compshrink-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
