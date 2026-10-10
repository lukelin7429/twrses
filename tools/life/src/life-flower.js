/*
 * 生命與生態 · 第六課「花為什麼要開？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：花是植物用來生小孩的器官。花粉要送到另一朵花的柱頭，長出一條花粉管到胚珠，
 *   胚珠變成種子，子房變成果實。植物不會走路，所以請動物或風送貨：給動物花蜜當報酬，或是撒出非常多的花粉讓風去碰運氣。
 *
 * 場景：一朵切開的花。兩個視角「蜜蜂送／風送」共用一支滑桿：花粉來了 → 落在柱頭 → 花粉管往下長 → 種子和果實。
 * 階段與示意的數字在 flowercalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-flower.js
 * 除錯：document.querySelector('[data-lifeflower-lab]').__lab
 */
import {
  AmbientLight, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, tube as stick } from './common.js';
import { stage, tubeLen, fruit, SENT, landed, holding, carrier } from './flowercalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const STEP = {
  carry: ['1 · Pollen is on its way', '一、花粉在路上'], land: ['2 · It lands on the stigma', '二、落在柱頭上'],
  tube: ['3 · A tube grows down', '三、花粉管往下長'], seed: ['4 · Seeds and a fruit', '四、種子和果實'],
};

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
  scene.background = new Color(0x10254a);
  const camera = new PerspectiveCamera(34, 1, 0.1, 140);
  const TARGET = V(0, 1.7, 0);
  const homePos = () => TARGET.clone().add(V(1.5, 2.2, 13).multiplyScalar(camera.aspect < 0.85 ? 1.45 : camera.aspect < 1.1 ? 1.12 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 45;
  controls.minAzimuthAngle = -1.0; controls.maxAzimuthAngle = 1.0; controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.62;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.25));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 8, 9); scene.add(dl);

  const ball = new SphereGeometry(1, 24, 16);
  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });
  const M = {
    stem: mat(0x4f9a45), petal: mat(0xf58fb5, { side: DoubleSide, transparent: true }), filament: mat(0xe9e2b8), anther: mat(0xf4c531),
    style: mat(0x9fd27a), stigma: mat(0xd8f0a8), ovary: mat(0x7fc65a, { transparent: true, opacity: 0.5, depthWrite: false }),
    ovule: mat(0xf5f0d8), seed: mat(0x8a5a2b), pollen: mat(0xffd84a, { emissive: 0xffb400, emissiveIntensity: 0.35 }), tube: mat(0xffb347),
    bee: mat(0xf2c12e), dark: mat(0x2a2118), wing: mat(0xdff3ff, { transparent: true, opacity: 0.55, side: DoubleSide }),
  };
  const add = (geo, m, x, y, z, sx = 1, sy = sx, sz = sx, parent = scene) => { const o = new Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };

  // ---------- 花：莖、子房（裡面三顆胚珠）、花柱、柱頭、六根雄蕊、五片花瓣（前面留一個缺口） ----------
  scene.add(stick(V(0, -2.6, 0), V(0, 0.15, 0), 0.11, M.stem));
  const OV = V(0, 0.75, 0), STIG = V(0, 2.95, 0);
  const ovary = add(ball, M.ovary, OV.x, OV.y, OV.z, 0.62, 0.78, 0.62);
  const ovules = [[-0.22, 0.95], [0.2, 0.7], [-0.1, 0.45]].map(([x, y]) => add(ball, M.ovule, x, y, 0.05, 0.13));
  scene.add(stick(V(0, 1.45, 0), V(0, 2.85, 0), 0.06, M.style));
  const stigma = add(ball, M.stigma, STIG.x, STIG.y, STIG.z, 0.2, 0.12, 0.2);
  const feathers = new Group(); scene.add(feathers);                    // 風送的花：柱頭像羽毛，比較容易撈到花粉
  for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; feathers.add(stick(STIG, V(Math.cos(a) * 0.55, STIG.y + 0.28 + (i % 3) * 0.1, Math.sin(a) * 0.55), 0.022, M.stigma)); }
  const anthers = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI * (0.08 + (i / 5) * 0.84) + (i % 2 ? 0.0 : 0.0), r = 1.15, top = V(Math.cos(a) * r, 2.3, -Math.sin(a) * r * 0.9 + 0.1);
    scene.add(stick(V(Math.cos(a) * 0.3, 0.3, -Math.sin(a) * 0.3), top, 0.03, M.filament));
    anthers.push(add(ball, M.anther, top.x, top.y + 0.1, top.z, 0.11, 0.19, 0.11));
  }
  const petals = [];
  for (let i = 0; i < 5; i++) {
    const a = Math.PI * (-0.12 + (i / 4) * 1.24), g = new Group();
    g.position.set(0, 0.25, 0); g.rotation.y = a - Math.PI / 2;
    const p = new Mesh(ball, M.petal); p.scale.set(0.85, 1.55, 0.06); p.position.set(0, 1.35, -0.95); p.rotation.x = -0.6; g.add(p);
    g.userData.tilt = 0; scene.add(g); petals.push(g);
  }

  // ---------- 蜜蜂（身上沾著別朵花的花粉） ----------
  const bee = new Group(); scene.add(bee);
  add(ball, M.bee, 0, 0, 0, 0.36, 0.26, 0.26, bee); add(ball, M.dark, 0.12, 0, 0, 0.1, 0.265, 0.265, bee); add(ball, M.dark, -0.14, 0, 0, 0.08, 0.25, 0.25, bee);
  add(ball, M.dark, 0.42, 0.02, 0, 0.17, 0.17, 0.17, bee);
  const wings = [-1, 1].map((s) => { const w = add(ball, M.wing, -0.02, 0.26, s * 0.16, 0.3, 0.02, 0.16, bee); w.userData.s = s; return w; });
  const beeDots = [0, 1, 2, 3].map((i) => add(ball, M.pollen, -0.1 + i * 0.09, -0.2, (i % 2 ? 0.1 : -0.1), 0.05, 0.05, 0.05, bee));
  const beePath = new CatmullRomCurve3([V(-6.5, 4.6, 1.2), V(-3, 3.9, 0.9), V(-0.45, 3.25, 0.35), V(-0.45, 3.25, 0.35), V(0.9, 2.75, 0.6), V(3.2, 3.9, 0.9), V(6.5, 4.8, 1.2)]);

  // ---------- 風裡的花粉：很多粒飄過去，只有一粒碰到柱頭 ----------
  const dust = [];
  for (let i = 0; i < SENT.wind; i++) dust.push(add(ball, M.pollen, 0, 0, 0, 0.055));
  // 落在柱頭上的那一粒，和它長出來的花粉管
  const grain = add(ball, M.pollen, STIG.x, STIG.y + 0.14, STIG.z, 0.09);
  const tubeMesh = new Mesh(new SphereGeometry(0.001), M.tube); scene.add(tubeMesh);
  const tubeCurve = new CatmullRomCurve3([V(0, STIG.y + 0.1, 0), V(0.03, 2.2, 0.06), V(-0.02, 1.5, 0.08), V(0.08, 1.1, 0.07), V(0.2, 0.74, 0.06)]);
  const fruitCol = { green: new Color(0x7fc65a), ripe: new Color(0xf08a3c) }, ovuleCol = { pale: new Color(0xf5f0d8), brown: new Color(0x8a5a2b) };
  const tip = V(0, 0, 0);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    petal: lab.add('cp-lb', 'Petals: the signboard<small>花瓣：招牌</small>'),
    anther: lab.add('cp-lb', 'Anthers: make pollen<small>花藥：製造花粉</small>'),
    stigma: lab.add('cp-lb lf-lb-push', 'Stigma: catches pollen<small>柱頭：接住花粉</small>'),
    ovule: lab.add('cp-lb', 'Ovules: seeds-to-be<small>胚珠：未來的種子</small>'),
    tube: lab.add('cp-lb lf-lb-push', 'Pollen tube<small>花粉管</small>'),
    fruit: lab.add('cp-lb lf-lb-push', 'The ovary becomes a fruit<small>子房變成果實</small>'),
    carrier: lab.add('cp-lb lf-lb-push', ''),
  };

  const R = { views: [...root.querySelectorAll('.cp-view button')], t: $('.lf-fl-t'), tOut: $('.lf-fl-t-out'), bar: $('.lf-fl-bar'), status: $('.lf-fl-status'),
    step: $('.lf-fl-step'), sent: $('.lf-fl-sent'), pay: $('.lf-fl-pay'), msgs: [...root.querySelectorAll('.lf-fl-msg')], play: $('.al-play') };
  const state = { mode: 'bee', s: 0, labels: true, playing: true, hold: 0, time: 0 };

  function layout() {
    const s = state.s, bee_ = state.mode === 'bee', f = fruit(s), tl = tubeLen(s);
    // 花瓣：風送的花沒有顯眼的花瓣；結果以後花瓣掉落
    petals.forEach((g) => { g.visible = bee_ && f < 0.98; g.rotation.x = 0; g.children[0].rotation.x = -0.6 - 0.9 * f; g.position.y = 0.25 - 1.2 * f; });
    M.petal.opacity = 1 - f;
    feathers.visible = !bee_;
    // 蜜蜂：沿著路徑飛進來、停在柱頭旁、再飛走
    bee.visible = bee_ && s < 74;
    if (bee.visible) {
      const u = s < 26 ? 0.42 * smooth(s / 26) : s < 40 ? 0.42 + 0.08 * ((s - 26) / 14) : 0.5 + 0.5 * smooth((s - 40) / 34);
      const p = beePath.getPoint(clamp(u)), q = beePath.getPoint(clamp(u + 0.01));
      bee.position.copy(p).add(V(0, Math.sin(state.time * 6) * 0.04, 0)); bee.rotation.y = Math.atan2(-(q.z - p.z), q.x - p.x); bee.rotation.z = 0;
      wings.forEach((w) => { w.rotation.x = w.userData.s * (0.5 + 0.5 * Math.sin(state.time * 60)); });
      beeDots.forEach((d, i) => { d.visible = s < 30 || i > 1; });                      // 留下兩粒在柱頭上
    }
    // 風：四十粒由左飄到右；第 0 粒在柱頭停下來
    dust.forEach((d, i) => {
      d.visible = !bee_ && s < 46 && !(i === 0 && s >= 30);
      if (!d.visible) return;
      const ph = s / 42 + hash(i, 1) * 0.35 - 0.3, x = -6.5 + 13 * ph, y = 1.2 + hash(i, 2) * 3.4 + Math.sin(ph * 9 + i) * 0.18, z = (hash(i, 3) - 0.5) * 2.2;
      if (i === 0) { const k = smooth(s / 30); d.position.set(-6.5 + (STIG.x + 6.5) * k, 3.9 + (STIG.y + 0.14 - 3.9) * k + Math.sin(k * 8) * 0.15 * (1 - k), 0.5 * (1 - k)); } else d.position.set(x, y, z);
    });
    grain.visible = s >= 30;
    // 花粉管
    tubeMesh.visible = tl > 0.01;
    if (tubeMesh.visible) {
      const pts = []; for (let i = 0; i <= 16; i++) pts.push(tubeCurve.getPoint((i / 16) * tl));
      tubeMesh.geometry.dispose(); tubeMesh.geometry = new TubeGeometry(new CatmullRomCurve3(pts), 24, 0.028, 6, false); tip.copy(pts[16]);
    }
    // 種子與果實：三顆胚珠裡，被花粉管碰到的那一顆變成種子；子房變大、變色
    ovary.scale.set(0.62 * (1 + 0.55 * f), 0.78 * (1 + 0.45 * f), 0.62 * (1 + 0.55 * f)); M.ovary.color.copy(fruitCol.green).lerp(fruitCol.ripe, f); M.ovary.opacity = 0.5 + 0.2 * f;
    ovules.forEach((o, i) => { const k = i === 1 ? f : 0; o.scale.setScalar(0.13 * (1 + 0.9 * k)); o.material = k > 0.5 ? M.seed : M.ovule; });
  }
  function updateLabels() {
    const on = state.labels, s = state.s, st = stage(s), bee_ = state.mode === 'bee', tmp = V(0, 0, 0);
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.petal, on && bee_ && fruit(s) < 0.2, 1.75, 2.2, -0.4);
    show(L.anther, on && st !== 'seed', -1.75, 2.75, 0, -6);
    show(L.stigma, on && (st === 'land' || (!bee_ && st === 'carry')), 0, STIG.y + 0.2, 0, -30);
    show(L.ovule, on && st !== 'seed', 1.5, 0.6, 0);
    show(L.tube, on && st === 'tube', tip.x + 0.95, tip.y, tip.z);
    show(L.fruit, on && st === 'seed', 1.9, 0.9, 0);
    const cx = bee.position.x, cy = bee.position.y + 0.95;
    show(L.carrier, on && st === 'carry', bee_ ? cx : -2.2, bee_ ? cy : 4.9, 0);
  }
  function readout() {
    const s = state.s, st = stage(s), k = holding(state.mode, s), bee_ = state.mode === 'bee';
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.mode ? 'true' : 'false'));
    R.t.value = Math.round(s); R.tOut.textContent = `${STEP[st][0][0]} of 4`;
    R.bar.style.width = `${s}%`;
    R.status.innerHTML = `${STEP[st][0].slice(4)}<small class="zh">${STEP[st][1]}</small>`;
    R.step.innerHTML = bee_ ? 'A bee<small>蜜蜂</small>' : 'The wind<small>風</small>';
    R.sent.innerHTML = `${landed(state.mode, s)} of ${SENT[state.mode]} grains<small>${SENT[state.mode]} 粒裡到了 ${landed(state.mode, s)} 粒（示意）</small>`;
    R.pay.innerHTML = bee_ ? 'Nectar and some pollen<small>花蜜和一些花粉</small>' : 'Nothing<small>不用付</small>';
    L.carrier.innerHTML = bee_ ? 'A bee, dusted with pollen from another flower<small>蜜蜂，身上沾著另一朵花的花粉</small>' : 'Pollen blowing past on the wind<small>風裡飄過的花粉</small>';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.mode === 'bee' || o.mode === 'wind') state.mode = o.mode;
    if (o.s != null) state.s = clamp(+o.s, 0, 100);
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v; state.hold = 0;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ mode: b.dataset.view, s: 0 })));
  R.t.addEventListener('input', () => { setPlaying(false); set({ s: +R.t.value }); });
  R.play.addEventListener('click', () => { if (!state.playing && state.s >= 100) state.s = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t; state.time += dt;
    if (state.playing) {
      if (state.s >= 100 || state.s <= 0) {
        state.hold += dt;
        if (state.hold > (state.s >= 100 ? 3.5 : 1.2)) { state.hold = 0; state.s = state.s >= 100 ? 0 : 0.01; }
      } else state.s = Math.min(100, state.s + dt * 7);
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
    bee: () => { set({ mode: 'bee', s: 0.01 }); setPlaying(true); },
    wind: () => { set({ mode: 'wind', s: 0.01 }); setPlaying(true); },
    tube: () => { setPlaying(false); set({ mode: 'bee', s: 62 }); },
    fruit: () => { setPlaying(false); set({ mode: 'bee', s: 100 }); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：誰來送花粉？（不需要 WebGL） ----------
function initGuesser() {
  const el = document.querySelector('[data-life-guesser]');
  if (!el) return;
  const kinds = JSON.parse(el.dataset.kinds), q = (s) => el.querySelector(s), boxes = [...el.querySelectorAll('.lf-gs-sw input')];
  function show() {
    const v = {}; boxes.forEach((b) => { v[b.dataset.k] = b.checked; });
    const k = carrier(v), d = kinds[k];
    const pic = q('.lf-gs-pic'); pic.dataset.petals = v.petals ? '1' : '0'; pic.dataset.nectar = v.nectar ? '1' : '0'; pic.dataset.dust = v.dust ? '1' : '0';
    q('.lf-gs-en').textContent = d.en; q('.lf-gs-zh').textContent = d.zh; q('.lf-gs-note').textContent = d.note_en; q('.lf-gs-note-zh').textContent = d.note_zh;
    el.dataset.k = k;
  }
  boxes.forEach((b) => b.addEventListener('change', show));
  show();
  el.__gs = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGuesser);
else initGuesser();

lazyBoot('[data-lifeflower-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
