/*
 * 美國政治 U.S. Government · 第六課「法案怎麼變成法律？」。
 *
 * 一個想法：法案要在兩院各自走過委員會與院會，兩院版本一字不差，再送總統；每一關都可能停下來。
 * 3D：華盛頓的三棟建築（dc.js）前面鋪一條路，九站（lab.stages：提案、眾議院委員會、規則委員會、眾議院院會、
 * 參議院委員會、參議院院會、兩院協調、總統、推翻否決）。參議院在左、眾議院在右（和第五課一樣）。
 * 選一個情境（lab.scenarios），一張紙（法案）沿著箭頭（flow3d.js）一站一站飛；走不下去的那一站變灰、紙掉下來；
 * 成為法律時紙變成金色。總統那一站的結局用 bill.js 的 billFate 判定（billpath.js 的 walk），和第二課同一套規則。
 *
 * 2D（不需要 WebGL）：order2d.js「排出正確的順序」、match2d.js「這個法案停在哪裡？」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-bill.js
 * 除錯：document.querySelector('[data-usgbill-lab]').__lab
 *   state（sc、stage、i、t）、scenario(key)、stage(key)、replay()、demo(key)、info()、run(秒)、render()
 */
import {
  AmbientLight, BoxGeometry, CylinderGeometry, DirectionalLight, Fog, HemisphereLight, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Scene, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeDC } from './dc.js';
import { makeArrow } from './flow3d.js';
import { arcPoint, walk } from './billpath.js';
import { initMatch } from './match2d.js';
import { initOrder } from './order2d.js';

const FOV = 34;
const HOP = 1.1, PAUSE = 0.55;
const C = { pad: 0x2a3858, ok: 0xffd36e, stop: 0x6b7489, paper: 0xf4f1e8, law: 0xffd36e, dead: 0x7a8296 };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const ST = Object.fromEntries(data.stages.map((s) => [s.key, s]));
  const SC = Object.fromEntries(data.scenarios.map((s) => [s.key, { ...s, run: walk(s, data.stages, data.bodies) }]));
  const state = { sc: data.start || data.scenarios[0].key, stage: null, i: 0, t: 0, done: false, labels: true };

  // ── 右邊欄（不靠 WebGL） ──
  function syncUI() {
    const sc = SC[state.sc];
    root.querySelectorAll('button[data-sc]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sc === state.sc)));
    root.querySelectorAll('[data-sc-panel]').forEach((p) => { p.hidden = p.dataset.scPanel !== state.sc; });
    const cur = state.stage || sc.run.steps[Math.min(state.i, sc.run.steps.length - 1)].key;
    root.querySelectorAll('button[data-stage]').forEach((b) => {
      const k = b.dataset.stage, st = sc.run.steps.findIndex((s) => s.key === k);
      b.setAttribute('aria-pressed', String(k === cur));
      b.classList.toggle('is-on', st >= 0 && st < state.i + (state.done ? 1 : 0) && sc.run.steps[st].ok);
      b.classList.toggle('is-stop', state.done && st >= 0 && !sc.run.steps[st].ok);
      b.classList.toggle('is-off', st < 0);
    });
    root.querySelectorAll('[data-stage-panel]').forEach((p) => { p.hidden = p.dataset.stagePanel !== cur; });
    const res = $('.ug-bl-result');
    if (state.done) {
      res.hidden = false;
      res.className = `ug-bl-result ${sc.run.law ? 'is-law' : 'is-dead'}`;
      res.innerHTML = sc.run.law ? 'It becomes law. <span class="zh">成為法律。</span>' : `It stops at: ${ST[sc.run.steps.at(-1).key].en} <span class="zh">停在：${ST[sc.run.steps.at(-1).key].zh}</span>`;
    } else res.hidden = true;
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x060b18, 1);
    const scene = new Scene(); scene.fog = new Fog(0x060b18, 50, 130);
    const camera = new PerspectiveCamera(FOV, 1, 0.5, 400);
    scene.add(new AmbientLight(0xffffff, 0.75)); scene.add(new HemisphereLight(0xdfe8ff, 0x1a2436, 0.9));
    const sun = new DirectionalLight(0xfff4dc, 2.0); sun.position.set(-14, 22, 18); scene.add(sun);
    const dc = makeDC(); scene.add(dc.group);
    for (const k of Object.keys(dc.buildings)) dc.setGrow(k, 1);

    // 各站：一個圓台＋一圈環
    const P = {};
    for (const s of data.stages) {
      const m = new MeshStandardMaterial({ color: C.pad, roughness: 0.7 });
      const pad = new Mesh(new CylinderGeometry(0.62, 0.7, 0.14, 32), m); pad.position.set(s.pos[0], 0.07, s.pos[1]); scene.add(pad);
      const rm = new MeshStandardMaterial({ color: 0x8a94ab, roughness: 0.5 });
      const ring = new Mesh(new TorusGeometry(0.66, 0.04, 8, 40), rm); ring.rotation.x = Math.PI / 2; ring.position.set(s.pos[0], 0.15, s.pos[1]); scene.add(ring);
      P[s.key] = { m, rm, at: [s.pos[0], 0.3, s.pos[1]] };
    }
    const arrows = data.stages.map(() => { const a = makeArrow(); scene.add(a.group); a.hide(); return a; });
    const paperM = new MeshStandardMaterial({ color: C.paper, roughness: 0.6 });
    const paper = new Mesh(new BoxGeometry(1.15, 0.05, 0.85), paperM); scene.add(paper);

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.47; controls.minDistance = 6; controls.enablePan = false;
    const labs = labeler($('.al-labels'), cv, camera);
    const LS = data.stages.map((s, n) => ({ k: s.key, el: labs.add('ug-lab3 ug-bl-lab', `<b>${n + 1}</b> ${s.short_en} <i>${s.short_zh}</i>`), pos: new Vector3(s.pos[0], 0.95, s.pos[1]) }));
    const LB = [['capitol', 'Congress <i>國會</i>'], ['whitehouse', 'The President <i>總統</i>']].map(([k, h]) => ({ el: labs.add('ug-lab3 is-b', h), pos: dc.buildings[k].pos.clone().setY(dc.buildings[k].top + 0.5) }));
    const LW = [['Senate <i>參議院</i>', -2.4], ['House <i>眾議院</i>', 3.6]].map(([h, dx]) => ({ el: labs.add('ug-lab3 is-stl is-on', h), pos: new Vector3(dc.buildings.capitol.pos.x + dx, 1.9, dc.buildings.capitol.pos.z) }));

    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1, userMoved = false;
    const TARGET = new Vector3(0.2, 0, 3.4);
    function home() {
      const narrow = aspect < 1.25;
      const dist = Math.max(23 / 2 / (tanF * aspect), 9.5 / 2 / tanF) * (narrow ? 0.98 : 1.0);
      const dir = (narrow ? new Vector3(0, 0.96, 0.32) : new Vector3(0, 0.74, 0.68)).normalize();
      return { target: TARGET.clone(), position: TARGET.clone().addScaledVector(dir, dist) };
    }
    function goHome() { const h = home(); camera.position.copy(h.position); controls.target.copy(h.target); camera.lookAt(h.target); }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      controls.maxDistance = home().position.distanceTo(TARGET) * 1.5;
      if (!userMoved) goHome();
    }
    controls.addEventListener('start', () => { userMoved = true; });

    // 依 state（情境、走到第幾站、這一跳的進度 t）擺出整個畫面
    function apply() {
      const sc = SC[state.sc], steps = sc.run.steps;
      for (const s of data.stages) { P[s.key].m.color.setHex(C.pad); P[s.key].rm.color.setHex(0x8a94ab); }
      arrows.forEach((a) => a.hide());
      const upto = state.done ? steps.length : state.i;
      for (let n = 0; n < steps.length; n++) {
        const k = steps[n].key;
        if (n < upto || (n === state.i && state.t >= 1)) {
          P[k].m.color.setHex(steps[n].ok ? C.ok : C.stop);
          P[k].rm.color.setHex(steps[n].ok ? C.ok : C.stop);
        }
        if (n >= 1 && n <= state.i) {
          const a = arrows[n - 1], from = P[steps[n - 1].key].at, to = P[k].at;
          a.set(new Vector3(...from), new Vector3(...to), steps[n].ok || n < state.i ? 0xffd36e : 0x8a94ab, 1.2);
          a.progress(n < state.i || state.done ? 1 : Math.min(1, state.t));
        }
      }
      // 紙張：在第 i 站與第 i-1 站之間的拋物線上
      const i = Math.min(state.i, steps.length - 1);
      const a = P[steps[Math.max(0, i - 1)].key].at, b = P[steps[i].key].at;
      const t = i === 0 ? 1 : Math.min(1, state.t);
      const p = arcPoint(a, b, t, 1.2);
      paper.position.set(p[0], p[1] + 0.12, p[2]);
      paper.rotation.set(0, t * Math.PI * 0.5, 0);
      if (state.done) {
        if (sc.run.law) { paperM.color.setHex(C.law); paper.position.y = 1.3 + 0.12 * Math.sin(performance.now() / 300); }
        else { paperM.color.setHex(C.dead); paper.position.y = 0.2; paper.rotation.set(0.5, 0.4, 0.3); }
      } else paperM.color.setHex(C.paper);
    }
    function render() {
      renderer.render(scene, camera);
      const sc = SC[state.sc], on = new Set(sc.run.steps.map((s) => s.key));
      for (const l of LS) { if (!state.labels) { l.el.style.opacity = 0; continue; } labs.place(l.el, l.pos); l.el.classList.toggle('is-dim', !on.has(l.k)); }
      for (const l of [...LB, ...LW]) { if (!state.labels) { l.el.style.opacity = 0; continue; } labs.place(l.el, l.pos); }
    }
    new ResizeObserver(() => { resize(); apply(); render(); }).observe(spaceWrap);
    resize();
    return { apply, render, goHome, controls, resetUser() { userMoved = false; } };
  }

  // 動畫：每一跳 HOP 秒，到站停 PAUSE 秒
  let pause = 0;
  function step(dt) {
    let moving = false;
    if (!state.done) {
      const steps = SC[state.sc].run.steps;
      if (pause > 0) { pause -= dt; moving = true; }
      else if (state.i === 0) { state.i = 1; state.t = 0; pause = PAUSE; moving = true; }
      else {
        state.t += dt / HOP; moving = true;
        if (state.t >= 1) {
          state.t = 1;
          if (state.i >= steps.length - 1 || !steps[state.i].ok) { state.done = true; state.i = Math.min(state.i, steps.length - 1); syncUI(); }
          else { state.i++; state.t = 0; pause = PAUSE; syncUI(); }
        }
      }
      if (SC[state.sc].run.steps.length === 1) { state.done = true; syncUI(); }
    }
    if (view) { view.apply(); if (view.controls.update()) moving = true; if (state.done && SC[state.sc].run.law) moving = true; }
    return moving;
  }

  const api = {
    state,
    ready: () => true,
    scenario(k) { if (!SC[k]) return; state.sc = k; api.replay(); },
    replay() { state.i = 0; state.t = 0; state.done = false; state.stage = null; pause = 0.3; syncUI(); kick(); },
    stage(k) { if (!ST[k]) return; state.stage = k; syncUI(); kick(); },
    demo(k) { if (view) { view.resetUser(); view.goHome(); } api.scenario(k); },
    finish() { const n = SC[state.sc].run.steps.length; state.i = n - 1; state.t = 1; state.done = true; syncUI(); if (view) view.apply(); },
    info() { const r = SC[state.sc].run; return { sc: state.sc, law: r.law, stop: r.law ? null : r.steps.at(-1).key, fate: r.fate && r.fate.key, i: state.i, done: state.done }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('button[data-sc]').forEach((b) => b.addEventListener('click', () => api.scenario(b.dataset.sc)));
  root.querySelectorAll('button[data-stage]').forEach((b) => b.addEventListener('click', () => api.stage(b.dataset.stage)));
  const rp = $('.ug-bl-replay'); if (rp) rp.addEventListener('click', () => api.replay());
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => { if (c.dataset.t === 'labels') state.labels = c.checked; kick(); }));
  if (view) $('.al-home').addEventListener('click', () => { view.resetUser(); view.goHome(); kick(); });

  let raf = 0, last = 0, visible = true, idle = 0;
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

  syncUI(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el));
  document.querySelectorAll('[data-ug-order]').forEach((el) => initOrder(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usgbill-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
