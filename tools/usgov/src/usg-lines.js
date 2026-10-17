/*
 * 美國政治 U.S. Government · 第七課「選區的線是誰畫的？」。
 *
 * 一個想法：同樣的選民、同樣的票，線畫在哪裡，就決定了誰贏幾區。
 * 3D：一張虛構的 8×8 格子地圖（districts.js；每格人數相同，綠／橘是兩群虛構的選民，刻意不用紅藍、不標政黨），
 * 要切成 8 個人口相等的選區。選一種畫法（lab.plans：cols／rows／boxes），白色的牆是選區的邊界，
 * 每一區中間立一根柱子，顏色是那一區贏的那一群，標籤寫出票數。右邊欄寫出兩群各贏幾區。
 *
 * 2D（不需要 WebGL）：draw2d.js「自己畫選區」、match2d.js「這條規則從哪裡來？」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-lines.js
 * 除錯：document.querySelector('[data-usglines-lab]').__lab
 *   state（plan）、plan(key)、demo(key)、info()、run(秒)、render()
 */
import {
  AmbientLight, BoxGeometry, CylinderGeometry, DirectionalLight, Fog, Group, HemisphereLight, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { edges, presets, seats, tally } from './districts.js';
import { initMatch } from './match2d.js';
import { initDraw } from './draw2d.js';

const FOV = 34, CELL = 1.1;
export const COL = { g: 0x4e9c74, o: 0xe08a3c, tie: 0xb8bfcc };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const n = data.n, k = data.k, V = data.voters.split('');
  const P = presets(n, k);
  const state = { plan: data.start || 'cols', labels: true, k: 1 };

  function syncUI() {
    root.querySelectorAll('button[data-plan]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.plan === state.plan)));
    root.querySelectorAll('[data-plan-panel]').forEach((p) => { p.hidden = p.dataset.planPanel !== state.plan; });
    const s = seats(V, P[state.plan], k);
    const bar = (cls, m) => `<span class="ug-ln-seg is-${cls}" style="flex:${m}">${m}</span>`;
    $('.ug-ln-seats').innerHTML = `<p class="ug-ln-k">Districts won · 贏得的選區</p><div class="ug-ln-bar">${s.g ? bar('g', s.g) : ''}${s.tie ? bar('tie', s.tie) : ''}${s.o ? bar('o', s.o) : ''}</div>`
      + `<p class="ug-ln-sum">Green ${s.g} · Orange ${s.o}${s.tie ? ` · tied ${s.tie}` : ''}<span class="zh">綠 ${s.g} 區、橘 ${s.o} 區${s.tie ? `、平手 ${s.tie} 區` : ''}</span></p>`;
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x060b18, 1);
    const scene = new Scene(); scene.fog = new Fog(0x060b18, 40, 110);
    const camera = new PerspectiveCamera(FOV, 1, 0.5, 300);
    scene.add(new AmbientLight(0xffffff, 0.8)); scene.add(new HemisphereLight(0xdfe8ff, 0x1a2436, 0.8));
    const sun = new DirectionalLight(0xfff4dc, 1.8); sun.position.set(-8, 16, 10); scene.add(sun);
    const half = (n * CELL) / 2;
    const at = (r, c) => [c * CELL - half + CELL / 2, r * CELL - half + CELL / 2];
    // 地板與格子
    const base = new Mesh(new BoxGeometry(n * CELL + 0.6, 0.2, n * CELL + 0.6), new MeshStandardMaterial({ color: 0x1b2740, roughness: 0.95 }));
    base.position.y = -0.1; scene.add(base);
    const cellGeo = new BoxGeometry(CELL - 0.08, 0.24, CELL - 0.08);
    // 橘色格子加斜紋：不靠顏色也分得出兩群（紅綠色盲）
    const stripes = canvasTex((g, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(0,0,0,.28)'; g.lineWidth = 7; for (let x = -h; x < w; x += 16) { g.beginPath(); g.moveTo(x, h); g.lineTo(x + h, 0); g.stroke(); } }, 64, 64);
    const mats = { g: new MeshStandardMaterial({ color: COL.g, roughness: 0.75 }), o: new MeshStandardMaterial({ color: COL.o, roughness: 0.75, map: stripes }) };
    for (let i = 0; i < n * n; i++) {
      const [x, z] = at(Math.floor(i / n), i % n);
      const m = new Mesh(cellGeo, mats[V[i]]); m.position.set(x, 0.12, z); scene.add(m);
      // 每格一個小人（代表人數相同）
      const p = new Mesh(new CylinderGeometry(0.09, 0.12, 0.26, 10), new MeshStandardMaterial({ color: 0xf4f1e8, roughness: 0.6 }));
      p.position.set(x, 0.37, z); scene.add(p);
    }
    const wallM = new MeshStandardMaterial({ color: 0xf4f1e8, roughness: 0.5 });
    const borders = new Group(); scene.add(borders);
    const pillars = new Group(); scene.add(pillars);
    const pM = { g: new MeshStandardMaterial({ color: COL.g, roughness: 0.4, emissive: COL.g, emissiveIntensity: 0.25 }), o: new MeshStandardMaterial({ color: COL.o, roughness: 0.4, emissive: COL.o, emissiveIntensity: 0.25 }), tie: new MeshStandardMaterial({ color: COL.tie, roughness: 0.4 }) };

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.45; controls.minDistance = 5; controls.enablePan = false;
    const labs = labeler($('.al-labels'), cv, camera);
    const LD = Array.from({ length: k }, () => ({ el: labs.add('ug-lab3 ug-ln-lab', ''), pos: new Vector3() }));

    function build() {
      const plan = P[state.plan];
      borders.clear(); pillars.clear();
      // 內部邊界
      for (const e of edges(plan, n)) {
        const [x, z] = at(e.r, e.c);
        const w = e.side === 'e' ? new Mesh(new BoxGeometry(0.12, 0.7, CELL + 0.12), wallM) : new Mesh(new BoxGeometry(CELL + 0.12, 0.7, 0.12), wallM);
        w.position.set(e.side === 'e' ? x + CELL / 2 : x, 0.35, e.side === 's' ? z + CELL / 2 : z);
        borders.add(w);
      }
      // 外框
      for (const [w, d, x, z] of [[n * CELL + 0.12, 0.12, 0, -half], [n * CELL + 0.12, 0.12, 0, half], [0.12, n * CELL + 0.12, -half, 0], [0.12, n * CELL + 0.12, half, 0]]) {
        const m = new Mesh(new BoxGeometry(w, 0.7, d), wallM); m.position.set(x, 0.35, z); borders.add(m);
      }
      // 每一區的柱子與標籤
      const t = tally(V, plan, k);
      for (let d = 0; d < k; d++) {
        let sx = 0, sz = 0, m = 0;
        plan.forEach((pd, i) => { if (pd === d) { const [x, z] = at(Math.floor(i / n), i % n); sx += x; sz += z; m++; } });
        // 柱子放在最靠近中心的那一格（凹形的區，中心可能不在區內）
        let best = null, bd = Infinity;
        plan.forEach((pd, i) => { if (pd === d) { const [x, z] = at(Math.floor(i / n), i % n); const dd = (x - sx / m) ** 2 + (z - sz / m) ** 2; if (dd < bd) { bd = dd; best = [x, z]; } } });
        const pil = new Mesh(new CylinderGeometry(0.22, 0.22, 1.2, 16), pM[t[d].win]); pil.position.set(best[0], 0.85, best[1]); pil.userData.h = 0; pillars.add(pil);
        LD[d].pos.set(best[0], 1.75, best[1]);
        LD[d].el.innerHTML = `<b>${d + 1}</b> ${t[d].g}–${t[d].o}`;
        LD[d].el.className = `al-lab ug-lab3 ug-ln-lab is-${t[d].win}`;
      }
      state.k = 0;
    }

    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1, userMoved = false;
    const TARGET = new Vector3(0, 0, 0.3);
    function home() {
      const dist = Math.max((n * CELL + 1.6) / 2 / (tanF * aspect), (n * CELL + 1.2) / 2 / tanF) * 1.08;
      const dir = new Vector3(0, 0.86, 0.52).normalize();
      return { target: TARGET.clone(), position: TARGET.clone().addScaledVector(dir, dist) };
    }
    function goHome() { const h = home(); camera.position.copy(h.position); controls.target.copy(h.target); camera.lookAt(h.target); }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      controls.maxDistance = home().position.distanceTo(TARGET) * 1.6;
      if (!userMoved) goHome();
    }
    controls.addEventListener('start', () => { userMoved = true; });
    function tick(dt) {
      let moving = false;
      if (state.k < 1) {
        state.k = Math.min(1, state.k + dt / 0.6); moving = true;
        const e = 1 - (1 - state.k) ** 3;
        borders.children.forEach((b) => { b.scale.y = Math.max(0.01, e); b.position.y = 0.35 * e; });
        pillars.children.forEach((p) => { p.scale.y = Math.max(0.01, e); p.position.y = 0.25 + 0.6 * e; });
      }
      if (controls.update()) moving = true;
      return moving;
    }
    function render() {
      renderer.render(scene, camera);
      for (const l of LD) { if (!state.labels) { l.el.style.opacity = 0; continue; } labs.place(l.el, l.pos); }
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize();
    return { build, tick, render, goHome, resetUser() { userMoved = false; } };
  }

  const api = {
    state,
    ready: () => true,
    plan(key) { if (!P[key]) return; state.plan = key; if (view) view.build(); syncUI(); kick(); },
    demo(key) { if (view) { view.resetUser(); view.goHome(); } api.plan(key); },
    info() { return { plan: state.plan, ...seats(V, P[state.plan], k) }; },
    run(sec) { for (let i = 0, m = Math.ceil(sec * 60); i < m; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('button[data-plan]').forEach((b) => b.addEventListener('click', () => api.plan(b.dataset.plan)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => { if (c.dataset.t === 'labels') state.labels = c.checked; kick(); }));
  if (view) $('.al-home').addEventListener('click', () => { view.resetUser(); view.goHome(); kick(); });

  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) { return view ? view.tick(dt) : false; }
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

  if (view) view.build(); syncUI(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el));
  document.querySelectorAll('[data-ug-draw]').forEach((el) => initDraw(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usglines-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
