/*
 * 生命與生態 · 第十課「魚怎麼在水裡呼吸？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：水裡的氧氣很少。魚讓水不停流過鰓；鰓裡的血和水的流向相反（逆流），
 *   所以水一路上遇到的血，氧氣都比它少一點，整條路都在交換，水裡大部分的氧氣都被拿走。
 *
 * 場景：上面一條小魚（示意水從嘴進、從鰓蓋出），下面是鰓裡一小段的放大：上層是水、下層是血，中間一層薄膜。
 *   兩個視角「逆流／順流」。小點愈亮代表氧氣愈多；會往下跳的亮點是正在過去的氧氣。
 *   一支滑桿沿著鰓移動一個圓環，側欄顯示那個位置水和血各有多少氧氣。
 * 數字在 gillcalc.js（示意）。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-gill.js
 * 除錯：document.querySelector('[data-lifegill-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { at, gap, moving, taken, bloodDir, holding } from './gillcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const LEN = 9, X0 = -LEN / 2, WY = -0.55, BY = -2.05;               // 放大圖：長度、左端、水層與血層的高度

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
  scene.background = new Color(0x0b2a4a);
  const camera = new PerspectiveCamera(34, 1, 0.1, 140);
  const TARGET = V(0, 0.2, 0);
  const homePos = () => TARGET.clone().add(V(0, 0.6, 15.5).multiplyScalar(camera.aspect < 0.85 ? 1.6 : camera.aspect < 1.1 ? 1.25 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 50;
  controls.minAzimuthAngle = -0.8; controls.maxAzimuthAngle = 0.8; controls.minPolarAngle = 0.8; controls.maxPolarAngle = Math.PI * 0.62;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x1a3050, 1.25));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const dl = new DirectionalLight(0xffffff, 0.8); dl.position.set(-3, 7, 9); scene.add(dl);

  const ball = new SphereGeometry(1, 18, 12), box = new BoxGeometry(1, 1, 1);
  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });
  const add = (geo, m, x, y, z, sx, sy, sz, parent = scene) => { const o = new Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };

  // ---------- 上面：一條小魚，水從嘴進、流過鰓、從鰓蓋後面出去 ----------
  const fish = new Group(); fish.position.set(0, 2.7, 0); scene.add(fish);
  const fm = mat(0xf0a23c), fd = mat(0xd07a22);
  add(ball, fm, 0, 0, 0, 1.7, 0.72, 0.42, fish);
  const tail = new Mesh(new ConeGeometry(0.62, 0.9, 4), fd); tail.rotation.z = -Math.PI / 2; tail.position.set(2.05, 0, 0); tail.scale.z = 0.25; fish.add(tail);
  add(ball, mat(0x111111), -1.2, 0.18, 0.36, 0.08, 0.08, 0.05, fish);
  const cover = add(ball, fd, -0.62, -0.02, 0.36, 0.34, 0.5, 0.06, fish);                     // 鰓蓋
  const gillMark = add(ball, mat(0xe0453a, { emissive: 0xff2a2a, emissiveIntensity: 0.5 }), -0.5, -0.02, 0.4, 0.1, 0.36, 0.04, fish);
  const flowMat = mat(0x8fd6ff, { emissive: 0x3aa0ff, emissiveIntensity: 0.6 });
  const fishFlow = []; for (let i = 0; i < 9; i++) fishFlow.push(add(ball, flowMat, 0, 0, 0, 0.055, 0.055, 0.055, fish));
  // 放大的引線
  const lineMat = mat(0xdfe8ff);
  const ring0 = new Mesh(new TorusGeometry(0.3, 0.03, 8, 28), lineMat); ring0.position.set(-0.5, 2.68, 0.46); scene.add(ring0);
  [[-0.72, X0], [-0.28, X0 + LEN]].forEach(([a, b]) => { const p = V(a, 2.42, 0.46), q = V(b, 0.35, 0), m = new Mesh(box, lineMat); m.position.copy(p).add(q).multiplyScalar(0.5); m.scale.set(0.02, p.distanceTo(q), 0.02); m.quaternion.setFromUnitVectors(V(0, 1, 0), q.clone().sub(p).normalize()); scene.add(m); });

  // ---------- 下面：鰓的一小段。上層水、下層血、中間薄膜 ----------
  add(box, mat(0x2f7fd0, { transparent: true, opacity: 0.22, depthWrite: false }), 0, WY, 0, LEN, 1.15, 1.2);
  add(box, mat(0xb02a2a, { transparent: true, opacity: 0.25, depthWrite: false }), 0, BY, 0, LEN, 1.15, 1.2);
  add(box, mat(0xf2e3d0), 0, (WY + BY) / 2, 0, LEN, 0.08, 1.25);
  const NW = 44, NB = 38, NH = 22;
  const water = [], blood = [], hops = [];
  const oxyMat = () => mat(0x8fe9ff, { emissive: 0x4fd6ff, emissiveIntensity: 1 });
  for (let i = 0; i < NW; i++) { const m = add(ball, oxyMat(), 0, 0, 0, 0.07, 0.07, 0.07); m.userData = { o: hash(i, 1), y: (hash(i, 2) - 0.5) * 0.8, z: (hash(i, 3) - 0.5) * 0.9, v: hash(i, 9) }; water.push(m); }
  for (let i = 0; i < NB; i++) { const m = add(ball, mat(0x7a1616), 0, 0, 0, 0.17, 0.11, 0.17); m.userData = { o: hash(i, 4), y: (hash(i, 5) - 0.5) * 0.7, z: (hash(i, 6) - 0.5) * 0.8 }; blood.push(m); }
  for (let i = 0; i < NH; i++) { const m = add(ball, oxyMat(), 0, 0, 0, 0.06, 0.06, 0.06); m.userData = { x: (i + 0.5) / NH, o: hash(i, 7), z: (hash(i, 8) - 0.5) * 0.7 }; hops.push(m); }
  const DARK = new Color(0x5e1010), BRIGHT = new Color(0xff4a3a);
  // 方向箭頭與位置圓環
  function arrow(color) { const g = new Group(), m = mat(color, { emissive: color, emissiveIntensity: 0.5 }); const s = new Mesh(box, m); s.scale.set(1.3, 0.07, 0.07); const h = new Mesh(new ConeGeometry(0.16, 0.34, 10), m); h.rotation.z = -Math.PI / 2; h.position.x = 0.8; g.add(s, h); scene.add(g); return g; }
  const aw = arrow(0x8fe9ff), ab = arrow(0xff7a6a); aw.position.set(X0 - 1.0, WY, 0); ab.position.set(X0 - 1.0, BY, 0);
  const probe = new Mesh(new TorusGeometry(1.25, 0.04, 8, 40), mat(0xffd84a, { emissive: 0xffb400, emissiveIntensity: 0.6 })); probe.rotation.y = Math.PI / 2; probe.scale.set(0.62, 1.15, 1); scene.add(probe);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    mouth: lab.add('cp-lb', 'Water in<small>水從嘴進來</small>'),
    out: lab.add('cp-lb', 'Water out<small>從鰓蓋後面出去</small>'),
    water: lab.add('cp-lb', 'Water<small>水</small>'), blood: lab.add('cp-lb', 'Blood<small>血</small>'),
    skin: lab.add('cp-lb', 'A very thin wall<small>很薄的一層膜</small>'),
    here: lab.add('cp-lb lf-lb-push', ''),
  };

  const R = { views: [...root.querySelectorAll('.cp-view button')], x: $('.lf-gl-x'), xOut: $('.lf-gl-x-out'), mw: $('.lf-gl-mw'), mb: $('.lf-gl-mb'), vw: $('.lf-gl-vw'), vb: $('.lf-gl-vb'),
    go: $('.lf-gl-go'), taken: $('.lf-gl-taken'), bar: $('.lf-gl-bar'), status: $('.lf-gl-status'), msgs: [...root.querySelectorAll('.lf-gl-msg')], play: $('.al-play') };
  const state = { mode: 'counter', x: 0.3, labels: true, playing: true, time: 0 };
  const tmp = V(0, 0, 0);

  function layout() {
    const t = state.time, dir = bloodDir(state.mode);
    fishFlow.forEach((m, i) => { const u = (i / fishFlow.length + t * 0.25) % 1; m.position.set(-2.6 + 2.2 * u, u < 0.7 ? 0.02 : 0.02 - (u - 0.7) * 0.2, u < 0.62 ? 0 : 0.46 + (u - 0.62) * 0.6); m.visible = u < 0.6 || u > 0.66; });
    water.forEach((m) => {
      const u = (m.userData.o + t * 0.09) % 1, o2 = at(state.mode, u).water / 100;
      m.position.set(X0 + LEN * u, WY + m.userData.y, m.userData.z);
      m.visible = m.userData.v < 0.12 + 0.88 * o2;                             // 氧氣愈少，亮點愈少
    });
    blood.forEach((m) => {
      const raw = (m.userData.o + t * 0.07) % 1, u = dir > 0 ? raw : 1 - raw, o2 = at(state.mode, u).blood / 100;
      m.position.set(X0 + LEN * u, BY + m.userData.y, m.userData.z);
      m.material.color.copy(DARK).lerp(BRIGHT, clamp(o2 * 1.15)); m.material.emissive.copy(BRIGHT); m.material.emissiveIntensity = 0.5 * o2;
    });
    hops.forEach((m) => {
      const g = gap(state.mode, m.userData.x);
      m.visible = g > 2;
      if (!m.visible) return;
      const p = (m.userData.o + t * (0.25 + g / 60)) % 1;
      m.position.set(X0 + LEN * m.userData.x, WY - 0.3 - p * (WY - BY - 0.6), m.userData.z);
    });
    ab.scale.x = dir; ab.position.x = dir > 0 ? X0 - 1.0 : X0 + LEN + 1.0;
    probe.position.set(X0 + LEN * state.x, (WY + BY) / 2, 0);
  }
  function updateLabels() {
    const on = state.labels;
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.mouth, on, -2.9, 3.35, 0); show(L.out, on, 1.2, 3.75, 0.4);
    show(L.water, on, X0 - 1.0, WY + 0.55, 0); show(L.blood, on, bloodDir(state.mode) > 0 ? X0 - 1.0 : X0 + LEN + 1.0, BY - 0.6, 0);
    show(L.skin, on, X0 + LEN + 1.25, (WY + BY) / 2, 0);
    show(L.here, on, X0 + LEN * state.x, BY - 1.15, 0);
  }
  function readout() {
    const v = at(state.mode, state.x), k = holding(state.mode, state.x), go = moving(state.mode, state.x), tk = taken(state.mode);
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.mode ? 'true' : 'false'));
    R.x.value = Math.round(state.x * 100); R.xOut.textContent = `${Math.round(state.x * 100)}%`;
    R.mw.style.width = `${v.water}%`; R.mb.style.width = `${v.blood}%`; R.vw.textContent = Math.round(v.water); R.vb.textContent = Math.round(v.blood);
    R.go.innerHTML = go ? 'Yes: the water has more<small>有：水這邊比較多</small>' : 'No: both sides are equal<small>沒有：兩邊一樣多了</small>';
    R.taken.innerHTML = `${tk} of every 100<small>每 100 份拿到 ${tk} 份（示意）</small>`;
    R.bar.style.width = `${tk}%`;
    R.status.innerHTML = state.mode === 'counter' ? 'Opposite directions<small class="zh">方向相反（逆流）</small>' : 'The same direction<small class="zh">方向相同（順流）</small>';
    L.here.innerHTML = `Here: water ${Math.round(v.water)}, blood ${Math.round(v.blood)}<small>這裡：水 ${Math.round(v.water)}，血 ${Math.round(v.blood)}</small>`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.mode === 'counter' || o.mode === 'same') state.mode = o.mode;
    if (o.x != null) state.x = clamp(+o.x);
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ mode: b.dataset.view })));
  R.x.addEventListener('input', () => set({ x: +R.x.value / 100 }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing) state.time += dt;
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
    counter: () => { setPlaying(true); set({ mode: 'counter', x: 0.2 }); },
    end: () => { setPlaying(true); set({ mode: 'counter', x: 0.95 }); },
    same: () => { setPlaying(true); set({ mode: 'same', x: 0.05 }); },
    stuck: () => { setPlaying(true); set({ mode: 'same', x: 0.9 }); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：四種呼吸的辦法（不需要 WebGL） ----------
function initBreathers() {
  const el = document.querySelector('[data-life-breathers]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-br-pick button')];
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0];
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    q('.lf-br-en').textContent = it.how_en; q('.lf-br-zh').textContent = it.how_zh;
    q('.lf-br-note').textContent = it.note_en; q('.lf-br-note-zh').textContent = it.note_zh;
    el.dataset.k = it.key;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__br = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBreathers);
else initBreathers();

lazyBoot('[data-lifegill-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
