/*
 * 生命與生態 · 第十一課「毛毛蟲怎麼變成蝴蝶？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：毛毛蟲和蝴蝶是同一隻動物的兩個階段——一個專門吃和長大，一個專門飛和生小孩。
 *   在蛹裡面，幼蟲的大部分構造被拆掉，成蟲的構造從幼蟲時期就帶著的幾小團細胞長出來。
 *
 * 場景：一根樹枝和一片葉子。一支時間滑桿走過四個階段：卵 → 毛毛蟲（蛻皮長大）→ 蛹 → 蝴蝶（翅膀慢慢撐開）。
 *   開關「看蛹裡面」：蛹變透明，看得到幼蟲的構造變少、翅膀和身體長出來。
 * 階段與進度在 metacalc.js（示意）。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-meta.js
 * 除錯：document.querySelector('[data-lifemeta-lab]').__lab
 */
import {
  AmbientLight, Color, DirectionalLight, DoubleSide, ExtrudeGeometry, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, Shape, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, tube as stick } from './common.js';
import { stage, instar, larvaSize, larvalLeft, adultBuilt, wingSpread, holding, cycle, INSTARS } from './metacalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const NAME = { egg: ['Egg', '卵'], larva: ['Caterpillar', '毛毛蟲（幼蟲）'], pupa: ['Chrysalis', '蛹'], adult: ['Butterfly', '蝴蝶（成蟲）'] };
const JOB = { egg: ['Waiting to hatch', '等著孵化'], larva: ['Eating and growing', '吃，長大'], pupa: ['Rebuilding', '重新打造身體'], adult: ['Flying, and laying eggs', '飛行、產卵'] };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x12305a);
  const camera = new PerspectiveCamera(34, 1, 0.1, 140);
  const TARGET = V(0, 0.3, 0);
  const homePos = () => TARGET.clone().add(V(1.5, 1.2, 12).multiplyScalar(camera.aspect < 0.85 ? 1.4 : camera.aspect < 1.1 ? 1.12 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 40;
  controls.minAzimuthAngle = -1.1; controls.maxAzimuthAngle = 1.1; controls.minPolarAngle = 0.6; controls.maxPolarAngle = Math.PI * 0.62;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.3));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const dl = new DirectionalLight(0xffffff, 0.85); dl.position.set(-3, 7, 9); scene.add(dl);

  const ball = new SphereGeometry(1, 22, 14);
  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.65, ...o });
  const add = (m, x, y, z, sx, sy, sz, parent = scene) => { const o = new Mesh(ball, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };

  // 樹枝和葉子
  scene.add(stick(V(-4.6, 2.6, -0.2), V(4.6, 2.9, -0.2), 0.12, mat(0x6b4a32)));
  const leafShape = new Shape(); leafShape.moveTo(-2.6, 0); leafShape.quadraticCurveTo(0, 1.5, 2.6, 0); leafShape.quadraticCurveTo(0, -1.5, -2.6, 0);
  const leaf = new Mesh(new ExtrudeGeometry(leafShape, { depth: 0.05, bevelEnabled: false }), mat(0x4fa64a, { side: DoubleSide }));
  leaf.rotation.x = -Math.PI / 2 + 0.25; leaf.position.set(0, -1.1, 0.1); scene.add(leaf);
  // 卵
  const egg = add(mat(0xf5f0d0), 0.3, -0.95, 0.2, 0.14, 0.18, 0.14);
  // 毛毛蟲：一串節
  const cat = new Group(); cat.position.set(-0.2, -0.78, 0.25); scene.add(cat);
  const catM = mat(0x9fd04a), catD = mat(0x2a2a2a), catY = mat(0xf2d13a);
  const segs = []; for (let i = 0; i < 9; i++) segs.push(add(i === 8 ? catD : i % 2 ? catY : catM, 0, 0, 0, 0.3, 0.3, 0.3, cat));
  // 蛹：掛在樹枝上，裡面有「幼蟲的構造」和「成蟲的構造」
  const pupa = new Group(); pupa.position.set(0.2, 1.1, 0); scene.add(pupa);
  const shellM = mat(0x7fc65a, { transparent: true });
  const shell = add(shellM, 0, 0, 0, 0.62, 1.25, 0.6, pupa);
  pupa.add(stick(V(0, 1.2, 0), V(0, 1.75, 0), 0.03, mat(0xdddddd)));
  const inLarva = add(mat(0x9fd04a, { transparent: true, opacity: 0.85 }), 0, 0, 0, 0.42, 0.95, 0.4, pupa);
  const inBody = add(mat(0x3a2a22), 0, 0, 0.05, 0.14, 0.8, 0.14, pupa);
  const wingM = mat(0xf08a2c, { side: DoubleSide }), wingD = mat(0x2a1a12, { side: DoubleSide });
  const inWings = [-1, 1].map((s) => add(wingM, s * 0.2, -0.05, 0.12, 0.2, 0.62, 0.05, pupa));
  // 蝴蝶：身體＋四片翅膀
  const fly = new Group(); fly.position.set(0.2, 0.6, 0.2); scene.add(fly);
  add(mat(0x3a2a22), 0, 0, 0, 0.13, 0.75, 0.13, fly); add(mat(0x3a2a22), 0, 0.82, 0, 0.16, 0.16, 0.16, fly);
  const wingShape = (w, h) => { const s = new Shape(); s.moveTo(0, 0); s.bezierCurveTo(w * 0.3, h * 0.9, w, h, w, h * 0.35); s.bezierCurveTo(w, -h * 0.1, w * 0.3, -h * 0.25, 0, 0); return new ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false }); };
  const wings = [];
  for (const s of [-1, 1]) {
    const g = new Group(); g.position.set(s * 0.1, 0.2, 0); fly.add(g);
    const fore = new Mesh(wingShape(2.0, 1.7), wingM); fore.position.y = 0.15; const hind = new Mesh(wingShape(1.5, -1.3), wingD); hind.position.y = -0.1;
    g.add(fore, hind); g.scale.x = s; g.userData.s = s; wings.push(g);
  }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = { what: lab.add('cp-lb lf-lb-push', ''), molt: lab.add('cp-lb', ''), discs: lab.add('cp-lb', 'Wings, growing from small groups of cells<small>翅膀：從一小團一小團的細胞長出來</small>'), old: lab.add('cp-lb', 'The caterpillar’s old parts, being taken apart<small>毛毛蟲原本的構造，正在被拆掉</small>') };

  const R = { t: $('.lf-mt-t'), tOut: $('.lf-mt-t-out'), bar: $('.lf-mt-bar'), status: $('.lf-mt-status'), what: $('.lf-mt-what'), job: $('.lf-mt-job'), size: $('.lf-mt-size'),
    msgs: [...root.querySelectorAll('.lf-mt-msg')], play: $('.al-play'), ins: $('[data-t="inside"]') };
  const state = { t: 0, inside: false, labels: true, playing: true, hold: 0, time: 0 };
  const tmp = V(0, 0, 0);

  function layout() {
    const t = state.t, st = stage(t);
    egg.visible = st === 'egg'; egg.scale.set(0.14, 0.18, 0.14).multiplyScalar(1 + 0.15 * Math.sin(state.time * 3) * clamp((t - 6) / 4));
    cat.visible = st === 'larva';
    if (cat.visible) {
      const k = 0.35 + 0.75 * larvaSize(t), crawl = Math.sin(state.time * 4);
      segs.forEach((m, i) => { m.scale.setScalar(0.3 * k * (i === 8 ? 0.85 : 1)); m.position.set((i - 4) * 0.42 * k, 0.12 * k * Math.max(0, Math.sin(state.time * 4 + i * 0.8)) + 0.3 * k - 0.1, 0); });
      cat.position.x = -0.2 + 0.25 * crawl;
    }
    pupa.visible = st === 'pupa';
    if (pupa.visible) {
      const ll = larvalLeft(t), ab = adultBuilt(t), see = state.inside;
      shellM.opacity = see ? 0.22 : 1; shellM.depthWrite = !see; shellM.color.set(ab > 0.85 && !see ? 0x9a8f4a : 0x7fc65a);
      inLarva.visible = see && ll > 0.03; inLarva.scale.set(0.42 * ll, 0.95 * ll, 0.4 * ll);
      inBody.visible = see && ab > 0.03; inBody.scale.set(0.14 * ab, 0.8 * ab, 0.14 * ab);
      inWings.forEach((w) => { w.visible = see && ab > 0.03; w.scale.set(0.2 * ab, 0.62 * ab, 0.05); });
      pupa.rotation.z = 0.05 * Math.sin(state.time * 1.3);
    }
    fly.visible = st === 'adult';
    if (fly.visible) {
      const sp = wingSpread(t), flap = sp >= 1 ? 0.45 + 0.4 * Math.sin(state.time * 3.2) : 0.15;
      wings.forEach((g) => { g.scale.set(g.userData.s * (0.25 + 0.75 * sp), 0.3 + 0.7 * sp, 1); g.rotation.y = -g.userData.s * flap; });
      fly.position.y = 0.6 + (sp >= 1 ? 0.25 * clamp((t - 94) / 6) + 0.08 * Math.sin(state.time * 3.2) : 0);
    }
  }
  function updateLabels() {
    const on = state.labels, t = state.t, st = stage(t);
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    const pos = { egg: [0.3, -0.5, 0.2], larva: [0, 0.35, 0.25], pupa: [0.2, 2.75, 0], adult: [0.2, 2.6, 0.2] }[st];
    show(L.what, on, pos[0], pos[1], pos[2]);
    show(L.molt, on && st === 'larva', 0, -1.9, 0.3);
    show(L.discs, on && st === 'pupa' && state.inside && adultBuilt(t) > 0.15, 2.4, 1.3, 0);
    show(L.old, on && st === 'pupa' && state.inside && larvalLeft(t) > 0.1, -2.5, 0.7, 0);
  }
  function readout() {
    const t = state.t, st = stage(t), k = holding(t, state.inside), n = instar(t);
    R.t.value = Math.round(t); R.tOut.textContent = `${NAME[st][0]} · ${NAME[st][1]}`;
    R.bar.style.width = `${t}%`;
    R.status.innerHTML = `Stage ${['egg', 'larva', 'pupa', 'adult'].indexOf(st) + 1} of 4<small class="zh">四個階段裡的第 ${['egg', 'larva', 'pupa', 'adult'].indexOf(st) + 1} 個</small>`;
    R.what.innerHTML = `${NAME[st][0]}<small>${NAME[st][1]}</small>`;
    R.job.innerHTML = `${JOB[st][0]}<small>${JOB[st][1]}</small>`;
    R.size.innerHTML = st === 'larva' ? `Growth step ${n} of ${INSTARS}<small>第 ${n} 齡（共 ${INSTARS} 齡，以帝王斑蝶為例）</small>` : st === 'pupa' ? `${Math.round(adultBuilt(t) * 100)}% rebuilt<small>重建了 ${Math.round(adultBuilt(t) * 100)}%（示意）</small>` : st === 'adult' ? (wingSpread(t) < 1 ? 'Wings still opening<small>翅膀還在撐開</small>' : 'Ready to fly<small>可以飛了</small>') : 'Not hatched yet<small>還沒孵化</small>';
    L.what.innerHTML = `${NAME[st][0]}<small>${NAME[st][1]}</small>`;
    L.molt.innerHTML = `It has shed its skin ${Math.max(0, n - 1)} ${n - 1 === 1 ? 'time' : 'times'}<small>已經蛻了 ${Math.max(0, n - 1)} 次皮</small>`;
    if (R.ins) R.ins.checked = state.inside;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.t != null) state.t = clamp(+o.t, 0, 100);
    if (o.inside != null) state.inside = !!o.inside;
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v; state.hold = 0;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.t.addEventListener('input', () => { setPlaying(false); set({ t: +R.t.value }); });
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= 100) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="inside"]', (v) => set({ inside: v }));
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (tm - last) / 1000 : 0); last = tm;
    if (state.playing) {
      state.time += dt;
      if (state.t >= 100 || state.t <= 0) {
        state.hold += dt;
        if (state.hold > (state.t >= 100 ? 3.5 : 1.4)) { state.hold = 0; state.t = state.t >= 100 ? 0 : 0.01; }
      } else state.t = Math.min(100, state.t + dt * 5.5);
      readout();
    }
    layout();
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting; last = 0;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '120px' }).observe(root);

  set({});
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    larva: () => { setPlaying(false); set({ t: 40, inside: false }); },
    inside: () => { setPlaying(false); set({ t: 66, inside: true }); },
    newly: () => { setPlaying(false); set({ t: 88, inside: false }); },
    adult: () => { set({ t: 96, inside: false }); setPlaying(true); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：四個階段，還是三個？（不需要 WebGL） ----------
function initCycles() {
  const el = document.querySelector('[data-life-cycles]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), names = JSON.parse(el.dataset.names), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-cy-pick button')];
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0], steps = cycle(it.kind);
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    q('.lf-cy-steps').innerHTML = steps.map((s) => `<li>${names[s].en}<small>${names[s].zh}</small></li>`).join('');
    q('.lf-cy-n').textContent = steps.length;
    q('.lf-cy-en').textContent = it.kind === 'complete' ? names.complete.en : names.incomplete.en; q('.lf-cy-zh').textContent = it.kind === 'complete' ? names.complete.zh : names.incomplete.zh;
    q('.lf-cy-note').textContent = it.note_en; q('.lf-cy-note-zh').textContent = it.note_zh;
    el.dataset.k = it.key; el.dataset.n = steps.length;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__cy = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCycles);
else initCycles();

lazyBoot('[data-lifemeta-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
