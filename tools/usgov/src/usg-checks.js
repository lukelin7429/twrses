/*
 * 美國政治 U.S. Government · 第二課「權力為什麼要分成三份？」。
 *
 * 一個想法：權力分給三個部門（分權），而且每個部門手上都有一部分別人的權力，可以擋住另外兩個（制衡）。
 * 3D：華盛頓的模型（dc.js），三棟建築都在。下面三排按鈕是「國會可以……」「總統可以……」「法院可以……」；
 * 按一招，一道箭頭（flow3d.js）從出手的那一棟飛到被牽制的那一棟，右邊欄顯示這一招是什麼、條文出處與逐字引文、
 * 歷史上的例子，以及「對方可以怎麼回應」（再按就接著演下去，例如 通過法案 → 否決 → 推翻否決）。
 * 右下角的三乘三方格記下看過哪幾個方向（誰牽制誰，共六個方向）。
 * 招式的內容在 data/us_government.json 的 lab.actions，說明欄由 build.py 輸出（沒有 WebGL 也看得到）。
 *
 * 2D（不需要 WebGL）：match2d.js「這一招是誰擋誰？」、veto2d.js「否決之後還有幾條路？」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-checks.js
 * 除錯：document.querySelector('[data-usgchecks-lab]').__lab
 *   state（sel、seen）、select(key)、demo('veto'|'appoint'|'review'|'impeach')、fly('overview'|建築 key, 立即?)、info()、run(秒)、render()
 */
import { AmbientLight, DirectionalLight, Fog, HemisphereLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeDC } from './dc.js';
import { makeArrow } from './flow3d.js';
import { initMatch } from './match2d.js';
import { initVeto } from './veto2d.js';

const FOV = 34;
const COLOR = { capitol: 0xffd36e, whitehouse: 0x6fd3c0, court: 0xff8fa3 };
const TOP = { capitol: 3.4, whitehouse: 2.1, court: 2.7 };
const NAME = {
  capitol: 'Congress <i>國會</i><small>makes the laws · 立法</small>',
  whitehouse: 'The President <i>總統</i><small>carries out the laws · 行政</small>',
  court: 'The Courts <i>法院</i><small>decide cases under the laws · 司法</small>',
};
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const ACT = Object.fromEntries(data.actions.map((a) => [a.key, a]));
  const state = { sel: data.actions[0].key, seen: new Set(), labels: true, k: 1 };

  // ── 右邊欄與方格（不靠 WebGL） ──
  const cntEl = $('.ug-mx-n');
  function syncUI() {
    root.querySelectorAll('button[data-act]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.act === state.sel));
      b.classList.toggle('is-seen', state.seen.has(b.dataset.act));
    });
    root.querySelectorAll('.ug-act').forEach((d) => { d.hidden = d.dataset.actPanel !== state.sel; });
    const dirs = new Set([...state.seen].map((k) => ACT[k]).filter((a) => a.check).map((a) => `${a.from}>${a.to}`));
    root.querySelectorAll('[data-cell]').forEach((c) => {
      c.classList.toggle('is-on', dirs.has(c.dataset.cell));
      c.classList.toggle('is-now', !!ACT[state.sel].check && c.dataset.cell === `${ACT[state.sel].from}>${ACT[state.sel].to}`);
    });
    cntEl.textContent = `${dirs.size} / 6`;
  }

  // ── 3D ──
  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x060b18, 1);
    const scene = new Scene();
    scene.fog = new Fog(0x060b18, 46, 120);
    const camera = new PerspectiveCamera(FOV, 1, 0.5, 400);
    scene.add(new AmbientLight(0xffffff, 0.75));
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a2436, 0.9));
    const sun = new DirectionalLight(0xfff4dc, 2.1); sun.position.set(-14, 22, 18); scene.add(sun);
    const dc = makeDC();
    scene.add(dc.group);
    const anchor = {};
    for (const k of Object.keys(dc.buildings)) { dc.setGrow(k, 1); anchor[k] = dc.buildings[k].pos.clone().setY(TOP[k]); }
    const arrow = makeArrow(); scene.add(arrow.group);

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.485; controls.minDistance = 5; controls.enablePan = false;
    const labs = labeler($('.al-labels'), cv, camera);
    const L = Object.keys(NAME).map((k) => ({ k, el: labs.add('ug-lab3 is-b', NAME[k]), pos: dc.buildings[k].pos.clone().setY(dc.buildings[k].top + 0.5) }));

    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1;
    const TARGET = new Vector3(0.6, 1.2, -1.2);   // 三棟的中間（x 從白宮的 -12 到最高法院的 13）
    function shotOf(key) {
      if (dc.buildings[key]) {
        const f = dc.focusOf(key), k = Math.max(1, 1.25 / aspect);
        return { target: f.target, position: f.target.clone().add(f.position.sub(f.target).multiplyScalar(k)) };
      }
      // 全景：三棟都放得進來（寬約 27）；畫面窄就從比較高的地方看
      const narrow = aspect < 1.15;
      const dist = Math.max(28 / 2 / (tanF * aspect), 9 / tanF) * 1.06;
      const dir = (narrow ? new Vector3(0, 0.7, 0.71) : new Vector3(0, 0.42, 0.91)).normalize();
      return { target: TARGET.clone(), position: TARGET.clone().addScaledVector(dir, dist) };
    }
    let fly = null, shot = 'overview', userMoved = false;
    function flyTo(key, immediate) {
      shot = key;
      const to = shotOf(key);
      if (immediate) { camera.position.copy(to.position); controls.target.copy(to.target); camera.lookAt(to.target); fly = null; return; }
      fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: to.position, t1: to.target, k: 0 };
    }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      controls.maxDistance = shotOf('overview').position.distanceTo(TARGET) * 1.5;
      if (!userMoved) flyTo(shot, true);
    }
    controls.addEventListener('start', () => { userMoved = true; fly = null; });
    function setAction(a) {
      // 同一棟對自己（例如兩院之間）不畫箭頭
      if (a.from === a.to) { arrow.hide(); return; }
      arrow.set(anchor[a.from], anchor[a.to], COLOR[a.from]);
    }
    function tick(dt) {
      let moving = false;
      if (state.k < 1) { state.k = Math.min(1, state.k + dt / 1.5); arrow.progress(ease(state.k)); moving = true; }
      if (fly) {
        fly.k = Math.min(1, fly.k + dt / 1.2);
        const e = ease(fly.k);
        camera.position.lerpVectors(fly.p0, fly.p1, e); controls.target.lerpVectors(fly.t0, fly.t1, e);
        if (fly.k >= 1) fly = null;
        moving = true;
      }
      if (controls.update()) moving = true;
      return moving;
    }
    const proj = new Vector3();
    function render() {
      renderer.render(scene, camera);
      for (const l of L) {
        if (!state.labels) { l.el.style.opacity = 0; continue; }
        labs.place(l.el, l.pos, 0);
        proj.copy(l.pos).project(camera);
        if (Math.abs(proj.x) > 0.97 || Math.abs(proj.y) > 0.97) l.el.style.opacity = 0;
        l.el.classList.toggle('is-from', ACT[state.sel].from === l.k);
        l.el.classList.toggle('is-to', ACT[state.sel].to === l.k && ACT[state.sel].from !== l.k);
      }
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize(); flyTo('overview', true);
    return { tick, render, flyTo, setAction, arrow, camera, controls, aspect: () => aspect, resetUser() { userMoved = false; } };
  }

  let seq = null;
  const api = {
    state,
    ready: () => true,
    select(key, opt = {}) {
      if (!ACT[key]) return;
      state.sel = key; state.seen.add(key); state.k = 0;
      if (view) { view.setAction(ACT[key]); if (!opt.stay) { view.resetUser(); view.flyTo('overview'); } }
      syncUI(); kick();
    },
    fly(key, immediate) { if (view) { view.resetUser(); view.flyTo(key, immediate); kick(); } },
    /** 示範：照順序演一串招式 */
    demo(k) {
      const chain = data.demos[k];
      if (!chain) return;
      seq = { t: 0, steps: chain.map((key, i) => [i * 3.4, () => api.select(key)]) };
      kick();
    },
    info() { return { sel: state.sel, seen: [...state.seen], k: state.k, dirs: $('.ug-mx-n').textContent, cam: view ? { p: view.camera.position.toArray().map((v) => +v.toFixed(1)), t: view.controls.target.toArray().map((v) => +v.toFixed(1)), aspect: +view.aspect().toFixed(2) } : null }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };

  root.querySelectorAll('button[data-act]').forEach((b) => b.addEventListener('click', () => { seq = null; api.select(b.dataset.act); }));
  root.querySelectorAll('button[data-go]').forEach((b) => b.addEventListener('click', () => { seq = null; api.select(b.dataset.go); }));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => { if (c.dataset.t === 'labels') state.labels = c.checked; kick(); }));
  if (view) $('.al-home').addEventListener('click', () => api.fly('overview'));

  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (seq) {
      seq.t += dt;
      while (seq && seq.steps.length && seq.steps[0][0] <= seq.t) { const fn = seq.steps.shift()[1]; const keep = seq; fn(); seq = keep; }
      if (seq && !seq.steps.length) seq = null;
      moving = true;
    }
    if (view) { if (view.tick(dt)) moving = true; } else if (state.k < 1) state.k = 1;
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

  api.select(state.sel);
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el));
  document.querySelectorAll('[data-ug-veto]').forEach((el) => initVeto(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usgchecks-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
