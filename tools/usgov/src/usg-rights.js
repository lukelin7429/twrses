/*
 * 美國政治 U.S. Government · 第四課「憲法保護哪些權利？」。
 *
 * 一個想法：權利法案是寫給政府看的「不得」清單。它擋的是政府，不是私人；原本只擋全國政府，
 * 第十四條修正案（1868）之後，法院才一條一條把它「併入」，拿來擋各州。
 * 3D：後面是華盛頓的三棟建築（全國政府，dc.js），右前方一棟州議會大廈（州政府），前面站著一個人。
 * 選一條修正案，兩道箭頭（flow3d.js）代表「政府的作為」從全國與州飛向這個人；這一條擋得住的那一邊，
 * 人前面會立起一面盾牌，箭頭停在盾牌前。下面的時間軸（1789–1975）拉到併入那一年之前，州那一邊沒有盾牌。
 * 時間軸只到 1975 年：權利法案大部分條文在 1925–1969 年間併入；之後的發展不在這一課的範圍。
 *
 * 2D（不需要 WebGL）：match2d.js 兩個——「這是誰在限制誰？」「這屬於哪一條修正案？」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-rights.js
 * 除錯：document.querySelector('[data-usgrights-lab]').__lab
 *   state（sel、t）、select(key)、setYear(小數年或 'YYYY-MM-DD')、demo(key)、info()、run(秒)、render()
 */
import {
  AmbientLight, BoxGeometry, CylinderGeometry, DirectionalLight, DoubleSide, Fog, Group, HemisphereLight, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeDC } from './dc.js';
import { makeArrow } from './flow3d.js';
import { formatEn, formatZh, parseDate } from './timeline.js';
import { makeTimeline } from './timeline2d.js';
import { initMatch } from './match2d.js';

const FOV = 34;
const PERSON = new Vector3(5, 0, 9.5);
const STATE_POS = new Vector3(11.5, 0, 3.4);
const T_BOR = parseDate('1791-12-15');

/** 一棟簡化的州議會大廈（台基、主體、柱廊、小圓頂） */
function makeStatehouse() {
  const g = new Group();
  const m = new MeshStandardMaterial({ color: 0xe9e4d6, roughness: 0.8 });
  const add = (geo, x, y, z) => { const o = new Mesh(geo, m); o.position.set(x, y, z); g.add(o); return o; };
  add(new BoxGeometry(4.6, 0.2, 3), 0, 0.1, 0);
  add(new BoxGeometry(4, 1.1, 2.2), 0, 0.75, 0);
  for (let i = 0; i < 6; i++) add(new CylinderGeometry(0.06, 0.07, 0.9, 8), -1.1 + i * 0.44, 0.65, 1.25);
  add(new BoxGeometry(2.6, 0.12, 0.5), 0, 1.16, 1.2);
  add(new CylinderGeometry(0.6, 0.65, 0.4, 20), 0, 1.5, 0);
  const d = add(new SphereGeometry(0.62, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), 0, 1.7, 0); d.scale.y = 1.2;
  add(new CylinderGeometry(0.08, 0.1, 0.35, 8), 0, 2.6, 0);
  return g;
}
function makePerson() {
  const g = new Group();
  const m = new MeshStandardMaterial({ color: 0xf2c9a0, roughness: 0.7 }), c = new MeshStandardMaterial({ color: 0x4e9c74, roughness: 0.7 });
  const body = new Mesh(new CylinderGeometry(0.32, 0.42, 1.3, 16), c); body.position.y = 0.65; g.add(body);
  const head = new Mesh(new SphereGeometry(0.3, 18, 12), m); head.position.y = 1.62; g.add(head);
  return g;
}
function makeShield(color) {
  const g = new Group();
  const mat = new MeshBasicMaterial({ color, transparent: true, opacity: 0.0, side: DoubleSide, depthWrite: false, fog: false });
  const rim = new MeshBasicMaterial({ color, transparent: true, opacity: 0.0, fog: false });
  const disc = new Mesh(new CylinderGeometry(1.25, 1.25, 0.06, 6), mat); disc.rotation.x = Math.PI / 2; g.add(disc);
  const ring = new Mesh(new CylinderGeometry(1.3, 1.3, 0.08, 6, 1, true), rim); ring.rotation.x = Math.PI / 2; g.add(ring);
  return { g, mat, rim, k: 0, flash: 0 };
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const R = Object.fromEntries(data.rights.map((r) => [r.key, { ...r, incT: r.inc && r.inc.length ? parseDate(r.inc[0].date) : null }]));
  const state = { sel: data.rights[0].key, t: parseDate(data.start), k: 0, labels: true };

  const protN = (r, t) => !!r.national && t >= T_BOR - 1e-9;
  const protS = (r, t) => r.incT != null && t >= r.incT - 1e-9;

  // ── 右邊欄（不靠 WebGL） ──
  const stEl = $('.ug-rt-status');
  function syncUI() {
    root.querySelectorAll('button[data-right]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.right === state.sel)));
    root.querySelectorAll('.ug-rt').forEach((d) => { d.hidden = d.dataset.rightPanel !== state.sel; });
    const r = R[state.sel], t = state.t;
    const row = (k, on, en, zh) => `<div class="is-${on ? 'on' : 'off'}"><dt>${k}</dt><dd>${en}<span class="zh">${zh}</span></dd></div>`;
    let nEn, nZh, sEn, sZh;
    if (!r.national) { nEn = r.national_note_en; nZh = r.national_note_zh; }
    else if (protN(r, t)) { nEn = 'Protected since 1791'; nZh = '1791 年起受保護'; }
    else { nEn = 'Not yet: the Bill of Rights is ratified in 1791'; nZh = '還沒有：權利法案在 1791 年才批准'; }
    if (protS(r, t)) { const c = r.inc[0]; sEn = `Protected, at least in part, since ${c.date.slice(0, 4)} (${c.case})`; sZh = `${c.date.slice(0, 4)} 年起至少部分受保護（${c.case}）`; }
    else if (r.incT != null) { const c = r.inc[0]; sEn = `Not yet; applied to the states in ${c.date.slice(0, 4)}`; sZh = `還沒有；${c.date.slice(0, 4)} 年才適用於各州`; }
    else { sEn = r.state_note_en; sZh = r.state_note_zh; }
    stEl.innerHTML = `<p class="ug-when-t">${formatEn(t, 'year')}<span class="zh">${formatZh(t, 'year')}</span></p><dl class="ug-rt-dl">`
      + row('Against the national government<span class="zh">對全國政府</span>', !!r.national && protN(r, t), nEn, nZh)
      + row('Against a state government<span class="zh">對州政府</span>', protS(r, t), sEn, sZh) + '</dl>';
  }

  const tl = makeTimeline($('.ug-tl'), {
    min: data.min, max: data.max, view: [data.min, data.max], value: state.t, minSpan: 4,
    events: data.events.map((e) => ({ ...e, t: parseDate(e.date) })), presets: data.presets,
    onChange(t) { state.t = t; replay(); syncUI(); kick(); },
  });

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
    const sun = new DirectionalLight(0xfff4dc, 2.1); sun.position.set(-14, 22, 18); scene.add(sun);
    const dc = makeDC(); scene.add(dc.group);
    for (const k of Object.keys(dc.buildings)) dc.setGrow(k, 1);
    const sh = makeStatehouse(); sh.position.copy(STATE_POS); sh.rotation.y = -0.5; scene.add(sh);
    const person = makePerson(); person.position.copy(PERSON); scene.add(person);
    const arrN = makeArrow(), arrS = makeArrow(); scene.add(arrN.group, arrS.group);
    const target = PERSON.clone().setY(1.2);
    const fromN = dc.buildings.capitol.pos.clone().setY(3.4), fromS = STATE_POS.clone().setY(2.6);
    // 盾牌立在人前面、各自對著箭頭飛來的方向
    const dirN = fromN.clone().sub(target).setY(0).normalize(), dirS = fromS.clone().sub(target).setY(0).normalize();
    const shN = makeShield(0xffd36e), shS = makeShield(0x86b86f);
    // 盾面大致朝鏡頭、略偏向箭頭來的方向（全國政府在人的正後方，只朝箭頭會變成側面一條線）
    const face = (d) => d.clone().multiplyScalar(0.35).add(new Vector3(0, 0, 1)).normalize();
    shN.g.position.copy(target).addScaledVector(dirN, 1.9); shN.g.lookAt(shN.g.position.clone().add(face(dirN)));
    shS.g.position.copy(target).addScaledVector(dirS, 1.9); shS.g.lookAt(shS.g.position.clone().add(face(dirS)));
    scene.add(shN.g, shS.g);
    // 箭頭停在盾牌前：終點設在盾牌的位置
    const stopN = shN.g.position.clone(), stopS = shS.g.position.clone();

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.48; controls.minDistance = 6; controls.enablePan = false;
    const labs = labeler($('.al-labels'), cv, camera);
    const L = [
      { el: labs.add('ug-lab3 is-b', 'The national government <i>全國政府</i>'), pos: dc.buildings.capitol.pos.clone().setY(5.4) },
      { el: labs.add('ug-lab3 is-stl is-on', 'A state government <i>州政府</i>'), pos: STATE_POS.clone().setY(3.4) },
      { el: labs.add('ug-lab3 is-sel', 'A person · 一個人'), pos: PERSON.clone().setY(-0.5) },
    ];

    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1, userMoved = false;
    const TARGET = new Vector3(3.6, 1.2, 3.0);
    function home() {
      const narrow = aspect < 1.15;
      const dist = Math.max(27 / 2 / (tanF * aspect), 10 / tanF) * (aspect < 1.4 ? 1.12 : 0.97);
      const dir = (narrow ? new Vector3(0.12, 0.62, 0.78) : new Vector3(0.1, 0.42, 0.9)).normalize();
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

    function apply() {
      const r = R[state.sel], t = state.t;
      const bn = protN(r, t), bs = protS(r, t);
      arrN.set(fromN, bn ? stopN : target, 0xffd36e, 3.2);
      arrS.set(fromS, bs ? stopS : target, 0x86b86f, 2.4);
      if (!r.national) arrN.hide();
      shN.on = bn; shS.on = bs;
    }
    function tick(dt) {
      let moving = false;
      if (state.k < 1) { state.k = Math.min(1, state.k + dt / 1.4); arrN.progress(state.k); arrS.progress(state.k); moving = true; }
      for (const s of [shN, shS]) {
        const to = s.on ? 1 : 0, d = to - s.k;
        if (Math.abs(d) > 0.002) { s.k += d * Math.min(1, dt * 5); moving = true; } else s.k = to;
        if (s.on && state.k > 0.9 && s.flash < 1) { s.flash = Math.min(1, s.flash + dt * 2.5); moving = true; }
        const glow = s.flash > 0 && s.flash < 1 ? Math.sin(s.flash * Math.PI) * 0.35 : 0;
        s.mat.opacity = 0.4 * s.k + glow; s.rim.opacity = 0.9 * s.k;
        s.g.scale.setScalar(0.6 + 0.4 * s.k);
      }
      if (controls.update()) moving = true;
      return moving;
    }
    function render() {
      renderer.render(scene, camera);
      for (const l of L) { if (!state.labels) { l.el.style.opacity = 0; continue; } labs.place(l.el, l.pos); }
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return { apply, tick, render, goHome, shields: [shN, shS], resetUser() { userMoved = false; } };
  }

  function replay() { state.k = 0; if (view) { for (const s of view.shields) s.flash = 0; view.apply(); } }
  let seq = null;
  const api = {
    state, timeline: tl,
    ready: () => true,
    select(k) { if (!R[k]) return; state.sel = k; replay(); syncUI(); kick(); },
    setYear(t) { state.t = typeof t === 'string' ? parseDate(t) : t; tl.set(state.t, true); replay(); syncUI(); kick(); },
    demo(k) {
      const d = data.demos[k];
      if (!d) return;
      seq = { t: 0, steps: d.map(([sel, year], i) => [i * 2.8, () => { api.select(sel); api.setYear(year); }]) };
      if (view) { view.resetUser(); view.goHome(); }
      kick();
    },
    info() { const r = R[state.sel]; return { sel: state.sel, year: Math.floor(state.t), national: protN(r, state.t), state: protS(r, state.t) }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('button[data-right]').forEach((b) => b.addEventListener('click', () => { seq = null; api.select(b.dataset.right); }));
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

  replay(); syncUI(); kick();
  root.__lab = api;
  return api;
}

function init2D() { document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el)); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usgrights-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
