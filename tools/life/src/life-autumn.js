/*
 * 生命與生態 · 第八課「葉子為什麼會變色？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：葉子裡本來就有黃色和橘色，只是被綠色蓋住。秋天白天變短、天氣變涼，樹把綠色的葉綠素拆掉收回去，
 *   黃色就露出來；有些樹這時候另外做出紅色。最後葉柄基部長出一層木栓，葉子就掉了。
 *
 * 場景：左邊一片葉子（顏色跟著三種色素的量走），右邊是「放大鏡」：一圈裡面的小圓點代表三種色素——
 *   黃點一直都在，綠點蓋在上面、慢慢消失，紅點（只有會變紅的樹）在秋天長出來。
 *   一支滑桿「季節」，兩個視角「變黃的樹／變紅的樹」，一個開關「白天晴朗、夜裡涼」。
 * 色素的量與混色在 autumncalc.js（示意）。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-autumn.js
 * 除錯：document.querySelector('[data-lifeautumn-lab]').__lab
 */
import {
  AmbientLight, Color, CylinderGeometry, DirectionalLight, DoubleSide, ExtrudeGeometry, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, Shape, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, tube as stick } from './common.js';
import { chlorophyll, carotenoid, anthocyanin, stage, mix, leafColor, hex, holding, look } from './autumncalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const SEASON = { summer: ['Summer', '夏天'], fading: ['Early autumn', '初秋'], color: ['Autumn', '深秋'], fall: ['Leaf fall', '落葉'] };

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
  const TARGET = V(0.3, 0, 0);
  const homePos = () => TARGET.clone().add(V(0, 0.4, 14.5).multiplyScalar(camera.aspect < 0.85 ? 1.55 : camera.aspect < 1.1 ? 1.2 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 50;
  controls.minAzimuthAngle = -0.9; controls.maxAzimuthAngle = 0.9; controls.minPolarAngle = 0.7; controls.maxPolarAngle = Math.PI * 0.65;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.3));
  scene.add(new AmbientLight(0xffffff, 0.5));
  const dl = new DirectionalLight(0xffffff, 0.8); dl.position.set(-3, 6, 10); scene.add(dl);

  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.7, ...o });
  const ball = new SphereGeometry(1, 18, 12);

  // ---------- 左邊：樹枝上的一片葉子（五裂，像楓葉） ----------
  scene.add(stick(V(-6.2, 3.0, -0.2), V(-0.6, 3.5, -0.2), 0.14, mat(0x6b4a32)));
  const LX = -2.9, LY = 0.1;
  const leafG = new Group(); leafG.position.set(LX, 3.3, 0); scene.add(leafG);        // 樞紐在葉柄和樹枝相接的地方
  const shape = new Shape();
  for (let i = 0; i <= 120; i++) {
    const th = (i / 120) * Math.PI * 2, lobe = Math.pow(Math.abs(Math.cos(2.5 * th)), 0.55), r = 0.75 + 1.25 * lobe * (0.75 + 0.25 * Math.cos(th));
    const x = Math.sin(th) * r, y = Math.cos(th) * r;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const leafMat = mat(0x6ca744, { side: DoubleSide });
  const leaf = new Mesh(new ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: false }), leafMat); leaf.position.set(0, LY - 3.3, 0); leafG.add(leaf);
  const veinMat = mat(0x2f5d2a, { transparent: true, opacity: 0.45 });
  for (let i = 0; i < 5; i++) { const a = ((i - 2) / 2) * 1.25; leafG.add(stick(V(0, LY - 3.3 - 0.7, 0.08), V(Math.sin(a) * 1.75, LY - 3.3 + Math.cos(a) * 1.75 - 0.2, 0.08), 0.022, veinMat)); }
  const stalkMat = mat(0x7a9a45);
  leafG.add(stick(V(0, 0, 0), V(0, LY - 3.3 + 1.6, 0.03), 0.045, stalkMat));
  const cork = new Mesh(ball, mat(0x8a6a44)); cork.scale.set(0.11, 0.07, 0.11); cork.position.set(LX, 3.32, 0); scene.add(cork);

  // ---------- 右邊：放大鏡裡的色素小點 ----------
  const PX = 3.4, PR = 2.25;
  const ring = new Mesh(new TorusGeometry(PR + 0.12, 0.06, 10, 64), mat(0xdfe8ff)); ring.position.set(PX, 0.1, 0); scene.add(ring);
  const back = new Mesh(new CylinderGeometry(PR + 0.1, PR + 0.1, 0.05, 48), mat(0x0b1730)); back.rotation.x = Math.PI / 2; back.position.set(PX, 0.1, -0.12); scene.add(back);
  const lens = new Mesh(new TorusGeometry(0.42, 0.035, 8, 32), mat(0xdfe8ff)); lens.position.set(LX + 0.55, LY + 0.25, 0.12); scene.add(lens);
  const rays = [stick(V(LX + 0.9, LY + 0.5, 0.12), V(PX - PR * 0.72, 0.1 + PR * 0.72, 0), 0.015, mat(0xdfe8ff)), stick(V(LX + 0.9, LY + 0.0, 0.12), V(PX - PR * 0.72, 0.1 - PR * 0.72, 0), 0.015, mat(0xdfe8ff))];
  scene.add(rays[0], rays[1]);
  const dotMat = { y: mat(0xf2c23a), g: mat(0x3f9f48), r: mat(0xc82c2c) };
  const dots = { y: [], g: [], r: [] };
  const NDOT = 78;
  for (let i = 0; i < NDOT; i++) {
    const rr = PR * 0.95 * Math.sqrt((i + 0.5) / NDOT), a = i * 2.39996, x = PX + Math.cos(a) * rr, y = 0.1 + Math.sin(a) * rr;
    const add = (k, z, s) => { const m = new Mesh(ball, dotMat[k]); m.position.set(x, y, z); m.userData.s = s; scene.add(m); dots[k].push(m); };
    add('y', 0, 0.13);
    if (i % 4 !== 3) add('g', 0.1, 0.19);                                  // 綠點蓋在黃點上面
    if (i % 2 === 0) add('r', 0.2, 0.16);                                  // 紅點在最前面，秋天才長出來
  }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    look: lab.add('cp-lb', 'A closer look inside the leaf<small>把葉子裡面放大來看</small>'),
    g: lab.add('cp-lb', 'Green: chlorophyll<small>綠色：葉綠素</small>'),
    y: lab.add('cp-lb', 'Yellow and orange: there all along<small>黃色和橘色：一直都在</small>'),
    r: lab.add('cp-lb lf-lb-push', 'Red: made in autumn<small>紅色：秋天才做出來</small>'),
    cork: lab.add('cp-lb lf-lb-push', 'A layer of cork seals the stalk<small>一層木栓把葉柄封住</small>'),
  };

  const R = { views: [...root.querySelectorAll('.cp-view button')], s: $('.lf-au-s'), sOut: $('.lf-au-s-out'), mg: $('.lf-au-mg'), my: $('.lf-au-my'), mr: $('.lf-au-mr'),
    vg: $('.lf-au-vg'), vy: $('.lf-au-vy'), vr: $('.lf-au-vr'), sw: $('.lf-au-sw'), bright: $('[data-t="bright"]'), msgs: [...root.querySelectorAll('.lf-au-msg')], play: $('.al-play') };
  const state = { s: 0, kind: 'red', bright: true, labels: true, playing: true, hold: 0 };
  const tmp = V(0, 0, 0);

  function layout() {
    const s = state.s, g = chlorophyll(s), y = carotenoid(s), r = anthocyanin(s, state.kind, state.bright), c = leafColor(s, state.kind, state.bright);
    leafMat.color.setRGB(c[0] / 255, c[1] / 255, c[2] / 255, 'srgb');
    stalkMat.color.setRGB(c[0] / 255 * 0.9, c[1] / 255 * 0.9, c[2] / 255 * 0.8, 'srgb'); veinMat.opacity = 0.2 + 0.3 * g;
    const fall = smooth((s - 92) / 8);
    leafG.position.set(LX + 0.6 * fall, 3.3 - 3.2 * fall, 0); leafG.rotation.z = -0.9 * fall; leafG.rotation.x = 0.5 * fall;
    cork.scale.set(0.11, 0.07, 0.11).multiplyScalar(0.3 + 1.2 * smooth((s - 70) / 20));
    dots.y.forEach((m) => m.scale.setScalar(m.userData.s * (0.35 + 0.65 * y)));
    dots.g.forEach((m, i) => { const k = clamp(g * 1.15 - (i % 7) * 0.02); m.visible = k > 0.03; m.scale.setScalar(m.userData.s * k); });
    dots.r.forEach((m, i) => { const k = clamp(r * 1.1 - (i % 5) * 0.02); m.visible = k > 0.03; m.scale.setScalar(m.userData.s * k); });
    lens.visible = rays[0].visible = rays[1].visible = fall < 0.05;
  }
  function updateLabels() {
    const on = state.labels, s = state.s, g = chlorophyll(s), r = anthocyanin(s, state.kind, state.bright);
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.look, on, PX, 0.1 + PR + 0.55, 0);
    show(L.g, on && g > 0.35, PX - 1.2, -PR - 0.5, 0);
    show(L.y, on && g <= 0.35, PX - 0.6, -PR - 0.5, 0);
    show(L.r, on && r > 0.3, PX + 1.5, PR - 0.2, 0, -8);
    show(L.cork, on && s >= 80, LX + 1.6, 3.9, 0);
  }
  function readout() {
    const s = state.s, st = stage(s), k = holding(s, state.kind, state.bright), g = chlorophyll(s), y = carotenoid(s), r = anthocyanin(s, state.kind, state.bright);
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.kind ? 'true' : 'false'));
    R.s.value = Math.round(s); R.sOut.textContent = `${SEASON[st][0]} · ${SEASON[st][1]}`;
    R.mg.style.width = `${Math.round(g * 100)}%`; R.my.style.width = `${Math.round(y * 100)}%`; R.mr.style.width = `${Math.round(r * 100)}%`;
    R.vg.textContent = `${Math.round(g * 100)}%`; R.vy.textContent = `${Math.round(y * 100)}%`; R.vr.textContent = `${Math.round(r * 100)}%`;
    R.sw.style.background = hex(leafColor(s, state.kind, state.bright));
    if (R.bright) R.bright.checked = state.bright;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.kind === 'red' || o.kind === 'yellow') state.kind = o.kind;
    if (o.s != null) state.s = clamp(+o.s, 0, 100);
    if (o.bright != null) state.bright = !!o.bright;
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v; state.hold = 0;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ kind: b.dataset.view })));
  R.s.addEventListener('input', () => { setPlaying(false); set({ s: +R.s.value }); });
  R.play.addEventListener('click', () => { if (!state.playing && state.s >= 100) state.s = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="bright"]', (v) => set({ bright: v }));
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing) {
      if (state.s >= 100 || state.s <= 0) {
        state.hold += dt;
        if (state.hold > (state.s >= 100 ? 3 : 1.8)) { state.hold = 0; state.s = state.s >= 100 ? 0 : 0.01; }
      } else state.s = Math.min(100, state.s + dt * 6.5);
      layout(); readout();
    }
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
    summer: () => { setPlaying(false); set({ kind: 'yellow', s: 0, bright: true }); },
    yellow: () => { setPlaying(false); set({ kind: 'yellow', s: 72, bright: true }); },
    red: () => { setPlaying(false); set({ kind: 'red', s: 76, bright: true }); },
    fall: () => { set({ kind: 'red', s: 84, bright: true }); setPlaying(true); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：調調看色素（不需要 WebGL） ----------
function initMixer() {
  const el = document.querySelector('[data-life-mixer]');
  if (!el) return;
  const looks = JSON.parse(el.dataset.looks), q = (s) => el.querySelector(s), sl = { g: q('.lf-mx-g'), y: q('.lf-mx-y'), r: q('.lf-mx-r') };
  function show() {
    const g = +sl.g.value / 100, y = +sl.y.value / 100, r = +sl.r.value / 100, k = look(g, y, r), d = looks[k];
    q('.lf-mx-g-out').textContent = `${sl.g.value}%`; q('.lf-mx-y-out').textContent = `${sl.y.value}%`; q('.lf-mx-r-out').textContent = `${sl.r.value}%`;
    q('.lf-mx-leaf').style.background = hex(mix(g, y, r));
    q('.lf-mx-en').textContent = d.en; q('.lf-mx-zh').textContent = d.zh; q('.lf-mx-note').textContent = d.note_en; q('.lf-mx-note-zh').textContent = d.note_zh;
    el.dataset.k = k;
  }
  Object.values(sl).forEach((x) => x.addEventListener('input', show));
  show();
  el.__mx = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMixer);
else initMixer();

lazyBoot('[data-lifeautumn-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
