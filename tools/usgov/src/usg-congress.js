/*
 * 美國政治 U.S. Government · 第五課「國會為什麼有兩院？」。
 *
 * 一個想法：眾議院依人口分配席次、參議院每州兩席——1787 年大州與小州的妥協。
 * 3D：兩個半圓形的議場（席次圖 seats.js）。左邊參議院、右邊眾議院（從國會大廈西面看，參議院在北翼、也就是左手邊）。
 * 選一州：它在兩院的座位變成金色、浮起來，右邊欄寫出席次、占全體的比例與每一席代表多少人。
 * 上方切換「1789 年」（十三州；眾議院 65 席是憲法第一條第二項第三款寫的暫定分配，參議院 26 席）
 * 與「2020 年普查之後」（五十州；眾議院 435 席、參議院 100 席）。座位的顏色只代表選到的州，不代表政黨。
 *
 * 2D（不需要 WebGL）：match2d.js「這是哪一院的工作？」、weight2d.js「一票的分量」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-congress.js
 * 除錯：document.querySelector('[data-usgcongress-lab]').__lab
 *   state（era、sel）、era('1789'|'2020')、pick(abbr)、demo(key)、info()、run(秒)、render()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, Fog, Group, HemisphereLight, InstancedMesh, Mesh,
  MeshStandardMaterial, Object3D, PerspectiveCamera, Raycaster, RingGeometry, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { assign, hemicycle, perSeat, share } from './seats.js';
import { initMatch } from './match2d.js';
import { initWeight } from './weight2d.js';

const FOV = 34;
const GOLD = new Color(0xffd36e), SEAT = new Color(0x5d6f8c);
// 兩個議場的位置與排法（1789 與 2020 年後各一組）
const CH = {
  senate: { at: new Vector3(-7.6, 0, 0), layout: { '1789': { rows: 3, r0: 1.7, r1: 2.9 }, '2020': { rows: 5, r0: 1.7, r1: 3.9 } } },
  house: { at: new Vector3(5.4, 0, 0), layout: { '1789': { rows: 4, r0: 2.2, r1: 4.4 }, '2020': { rows: 9, r0: 2.2, r1: 6.6 } } },
};
const nf = (v) => v.toLocaleString('en-US');

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  // 每個時期：州的順序、眾議院席次；參議院一律每州兩席
  const ERA = {
    '1789': { states: data.states1789, house: data.states1789.reduce((s, x) => s + x.house, 0) },
    '2020': { states: data.states, house: data.states.reduce((s, x) => s + x.house, 0) },
  };
  for (const e of Object.values(ERA)) { e.senate = e.states.length * 2; e.by = Object.fromEntries(e.states.map((s) => [s.abbr, s])); }
  const state = { era: data.start_era || '2020', sel: data.start || 'CA', labels: true, k: 1 };

  // ── 右邊欄（不靠 WebGL） ──
  const sel = $('select[data-state]'), out = $('.ug-cg-out');
  function fillSelect() {
    const e = ERA[state.era];
    sel.innerHTML = e.states.slice().sort((a, b) => a.name.localeCompare(b.name))
      .map((s) => `<option value="${s.abbr}">${s.name} · ${s.zh}</option>`).join('');
    sel.value = state.sel;
  }
  function syncUI() {
    const e = ERA[state.era], s = e.by[state.sel];
    root.querySelectorAll('button[data-era]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.era === state.era)));
    root.querySelectorAll('button[data-pick]').forEach((b) => { b.hidden = !e.by[b.dataset.pick]; b.setAttribute('aria-pressed', String(b.dataset.pick === state.sel)); });
    root.querySelectorAll('[data-era-note]').forEach((p) => { p.hidden = p.dataset.eraNote !== state.era; });
    if (sel.value !== state.sel) sel.value = state.sel;
    const row = (k, v, z) => `<div><dt>${k}</dt><dd>${v}<span class="zh">${z}</span></dd></div>`;
    let h = `<p class="ug-cg-name">${s.name}<span class="zh">${s.zh}</span></p><dl class="ug-cg-dl">`;
    h += row('House of Representatives<span class="zh">眾議院</span>', `${s.house} of ${e.house} seats (${share(s.house, e.house)}%)`, `${e.house} 席中的 ${s.house} 席（${share(s.house, e.house)}%）`);
    h += row('Senate<span class="zh">參議院</span>', `2 of ${e.senate} seats (${share(2, e.senate)}%)`, `${e.senate} 席中的 2 席（${share(2, e.senate)}%）`);
    if (s.pop) {
      h += row('Residents per representative<span class="zh">每位眾議員代表的居民</span>', nf(perSeat(s.pop, s.house)), `約 ${nf(perSeat(s.pop, s.house))} 人`);
      h += row('Residents per senator<span class="zh">每位參議員代表的居民</span>', nf(perSeat(s.pop, 2)), `約 ${nf(perSeat(s.pop, 2))} 人`);
    }
    out.innerHTML = h + '</dl>';
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
    scene.add(new AmbientLight(0xffffff, 0.8)); scene.add(new HemisphereLight(0xdfe8ff, 0x1a2436, 0.9));
    const sun = new DirectionalLight(0xfff4dc, 1.9); sun.position.set(-10, 20, 16); scene.add(sun);

    const floorM = new MeshStandardMaterial({ color: 0x1b2740, roughness: 0.95 });
    const rostM = new MeshStandardMaterial({ color: 0xe9e4d6, roughness: 0.8 });
    const seatGeo = new BoxGeometry(0.26, 0.22, 0.26); seatGeo.translate(0, 0.11, 0);
    const dummy = new Object3D();
    // 每個議場 × 每個時期一組座位
    const sets = {}, G = {};
    for (const [ck, c] of Object.entries(CH)) {
      const g = new Group(); g.position.copy(c.at); scene.add(g); G[ck] = g;
      const rMax = c.layout['2020'].r1 + 0.6;
      const fl = new Mesh(new CircleGeometry(rMax, 64, 0, Math.PI), floorM); fl.rotation.x = -Math.PI / 2; g.add(fl);
      const rim = new Mesh(new RingGeometry(rMax, rMax + 0.08, 64, 1, 0, Math.PI), new MeshStandardMaterial({ color: 0x8a94ab })); rim.rotation.x = -Math.PI / 2; rim.position.y = 0.01; g.add(rim);
      const rost = new Mesh(new BoxGeometry(1.3, 0.5, 0.5), rostM); rost.position.set(0, 0.25, 0.25); g.add(rost);
      const well = new Mesh(new CylinderGeometry(0.9, 0.9, 0.02, 32, 1, false, -Math.PI / 2, Math.PI), new MeshStandardMaterial({ color: 0x2a3858 })); well.position.y = 0.01; g.add(well);
      sets[ck] = { floor: [fl, rim], rMax };
      for (const era of ['1789', '2020']) {
        const e = ERA[era], n = ck === 'house' ? e.house : e.senate;
        const seats = hemicycle(n, c.layout[era]);
        const groups = e.states.map((s) => ({ key: s.abbr, n: ck === 'house' ? s.house : 2 }));
        const keys = assign(seats, groups);
        const mesh = new InstancedMesh(seatGeo, new MeshStandardMaterial({ roughness: 0.6 }), n);
        seats.forEach((p, i) => {
          dummy.position.set(p.x, 0, p.z); dummy.lookAt(0, 0, 0.25); dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, SEAT);
        });
        mesh.visible = false; g.add(mesh);
        sets[ck][era] = { mesh, seats, keys, lift: new Float32Array(n), group: g };
      }
    }

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.46; controls.minDistance = 5; controls.enablePan = false;
    const labs = labeler($('.al-labels'), cv, camera);
    const lSen = labs.add('ug-lab3 is-b', ''), lHou = labs.add('ug-lab3 is-b', '');
    const lSelS = labs.add('ug-lab3 is-sel', ''), lSelH = labs.add('ug-lab3 is-sel', '');
    const posSen = new Vector3(), posHou = new Vector3();
    const cS = new Vector3(), cH = new Vector3();

    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1, userMoved = false;
    // 寬畫面：兩個議場左右並排；窄畫面（手機直拿）：參議院在後、眾議院在前，畫面才放得大
    const TARGET = new Vector3();
    let stacked = null;
    function layout() {
      const st = aspect < 1.25;
      if (st === stacked) return;
      stacked = st;
      G.senate.position.copy(st ? new Vector3(0, 0, -8.2) : CH.senate.at);
      G.house.position.copy(st ? new Vector3(0, 0, 0.6) : CH.house.at);
      TARGET.copy(st ? new Vector3(0, 0, -5.4) : new Vector3(0.2, 0, -3.6));
      posSen.copy(G.senate.position).add(new Vector3(0, 0.6, 1.2)); posHou.copy(G.house.position).add(new Vector3(0, 0.6, 1.2));
      apply();
    }
    function home() {
      const dist = stacked ? Math.max(16 / 2 / (tanF * aspect), 16.5 / 2 / tanF) : Math.max(26 / 2 / (tanF * aspect), 7.5 / tanF);
      const dir = (stacked ? new Vector3(0, 0.96, 0.3) : new Vector3(0, 0.9, 0.5)).normalize();
      return { target: TARGET.clone(), position: TARGET.clone().addScaledVector(dir, dist) };
    }
    function goHome() { const h = home(); camera.position.copy(h.position); controls.target.copy(h.target); camera.lookAt(h.target); }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      layout();
      controls.maxDistance = home().position.distanceTo(TARGET) * 1.5;
      if (!userMoved) goHome();
    }
    controls.addEventListener('start', () => { userMoved = true; });

    // 點一下（沒有拖）＝選那個座位所屬的州
    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      for (const ck of ['senate', 'house']) {
        const s = sets[ck][state.era];
        const hit = ray.intersectObject(s.mesh)[0];
        if (hit && hit.instanceId != null) { api.pick(s.keys[hit.instanceId]); return; }
      }
    });

    function apply() {
      for (const ck of ['senate', 'house']) for (const era of ['1789', '2020']) {
        const s = sets[ck][era]; s.mesh.visible = era === state.era;
        if (!s.mesh.visible) continue;
        s.keys.forEach((k, i) => s.mesh.setColorAt(i, k === state.sel ? GOLD : SEAT));
        s.mesh.instanceColor.needsUpdate = true;
      }
      // 地板跟著時期縮放（1789 年的議場小得多）
      for (const [ck, c] of Object.entries(CH)) { const f = (c.layout[state.era].r1 + 0.6) / sets[ck].rMax; for (const m of sets[ck].floor) m.scale.set(f, f, 1); }
      const e = ERA[state.era];
      lSen.innerHTML = `The Senate <i>參議院</i> · ${e.senate}`;
      lHou.innerHTML = `The House <i>眾議院</i> · ${e.house}`;
      const st = e.by[state.sel];
      lSelS.innerHTML = `${state.sel} · 2`; lSelH.innerHTML = `${state.sel} · ${st.house}`;
      // 選到的座位的中心（標籤放在那裡）
      for (const [ck, c] of [['senate', cS], ['house', cH]]) {
        const s = sets[ck][state.era]; c.set(0, 0, 0); let m = 0;
        s.keys.forEach((k, i) => { if (k === state.sel) { c.x += s.seats[i].x; c.z += s.seats[i].z; m++; } });
        c.multiplyScalar(1 / Math.max(1, m)).add(G[ck].position).setY(1.0);
      }
    }
    function tick(dt) {
      let moving = false;
      for (const ck of ['senate', 'house']) {
        const s = sets[ck][state.era];
        let dirty = false;
        s.keys.forEach((k, i) => {
          const to = k === state.sel ? 0.35 : 0, d = to - s.lift[i];
          if (Math.abs(d) > 0.002) { s.lift[i] += d * Math.min(1, dt * 7); dirty = true; } else if (s.lift[i] !== to) { s.lift[i] = to; dirty = true; }
          if (dirty) {
            const p = s.seats[i];
            dummy.position.set(p.x, s.lift[i], p.z); dummy.lookAt(0, s.lift[i], 0.25); dummy.updateMatrix(); s.mesh.setMatrixAt(i, dummy.matrix);
          }
        });
        if (dirty) { s.mesh.instanceMatrix.needsUpdate = true; moving = true; }
      }
      if (controls.update()) moving = true;
      return moving;
    }
    function render() {
      renderer.render(scene, camera);
      const show = state.labels;
      for (const [el, p] of [[lSen, posSen], [lHou, posHou], [lSelS, cS], [lSelH, cH]]) { if (!show) { el.style.opacity = 0; continue; } labs.place(el, p); }
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return { apply, tick, render, goHome, resetUser() { userMoved = false; } };
  }

  let seq = null;
  const api = {
    state,
    ready: () => true,
    era(e) { if (!ERA[e]) return; state.era = e; if (!ERA[e].by[state.sel]) state.sel = e === '1789' ? 'VA' : 'CA'; fillSelect(); if (view) view.apply(); syncUI(); kick(); },
    pick(ab) { if (!ERA[state.era].by[ab]) return; state.sel = ab; if (view) view.apply(); syncUI(); kick(); },
    demo(k) {
      const d = data.demos[k];
      if (!d) return;
      seq = { t: 0, steps: d.map(([era, ab], i) => [i * 2.8, () => { if (state.era !== era) api.era(era); api.pick(ab); }]) };
      if (view) { view.resetUser(); view.goHome(); }
      kick();
    },
    info() { const e = ERA[state.era], s = e.by[state.sel]; return { era: state.era, sel: state.sel, house: s.house, houseTotal: e.house, senateTotal: e.senate }; },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('button[data-era]').forEach((b) => b.addEventListener('click', () => { seq = null; api.era(b.dataset.era); }));
  root.querySelectorAll('button[data-pick]').forEach((b) => b.addEventListener('click', () => { seq = null; api.pick(b.dataset.pick); }));
  sel.addEventListener('change', () => { seq = null; api.pick(sel.value); });
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

  fillSelect(); if (view) view.apply(); syncUI(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el));
  document.querySelectorAll('[data-ug-weight]').forEach((el) => initWeight(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usgcongress-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
