/*
 * 生命與生態 · 第十二課「候鳥怎麼認路？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：候鳥每年飛幾千公里去同一個地方，靠的不是一種方法，而是好幾種一起用——
 *   太陽、星星、地球的磁場、記得住的地標。每一種都有用不上的時候，所以要有備用的。
 *
 * 場景：一張示意的海和三塊陸地（北方的繁殖地、中間的台灣、南方的度冬地；不是真的地圖）。
 *   一隻鳥沿著路線飛（滑桿「旅程」）。白天／夜晚兩個視角，開關「雲」。
 *   側欄四個按鈕可以把鳥的一種感覺關掉，看牠還剩什麼線索；一個都不剩，牠就偏離路線。
 * 規則在 migratecalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-migrate.js
 * 除錯：document.querySelector('[data-lifemigrate-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { CUES, overLand, present, usable, holding, taiwans } from './migratecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const CUE = { sun: ['The Sun', '太陽'], stars: ['The stars', '星星'], magnet: ['Earth’s magnetism', '地球的磁場'], land: ['Landmarks', '地標'] };

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
  const DAY = new Color(0x6fb3e8), NIGHT = new Color(0x060b1c), GRAY = new Color(0x8794a6);
  scene.background = DAY.clone();
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0, 1.6, 0);
  const homePos = () => TARGET.clone().add(V(19, 10.5, 2.5).multiplyScalar(camera.aspect < 0.85 ? 1.7 : camera.aspect < 1.1 ? 1.35 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 55; controls.maxPolarAngle = Math.PI * 0.47;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xffffff, 0x2a3a55, 1.25); scene.add(hemi);
  scene.add(new AmbientLight(0xffffff, 0.35));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(6, 10, 4); scene.add(dl);

  const ball = new SphereGeometry(1, 20, 14);
  const mat = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.8, ...o });
  const add = (geo, m, x, y, z, sx, sy, sz, parent = scene) => { const o = new Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };

  // 海、三塊陸地（北在 −z）。這不是地圖，只是「北方、台灣、南方」三個示意的地方
  const seaMat = mat(0x2f7fc4, { roughness: 0.5 });
  add(new BoxGeometry(1, 1, 1), seaMat, 0, -0.1, 0, 12, 0.2, 18);
  const landMat = mat(0x6aa85a), hillMat = mat(0x8c7a5a, { emissive: 0xffd84a, emissiveIntensity: 0 });
  const LANDS = [[1.2, -7.2, 3.6, 1.7], [-0.5, 0, 0.75, 1.5], [-1.6, 7.3, 3.2, 1.6]];
  LANDS.forEach(([x, z, sx, sz]) => add(ball, landMat, x, 0, z, sx, 0.22, sz));
  const hills = [[1.6, -7.4], [0.4, -6.6], [-0.5, -0.3], [-0.45, 0.5], [-1.9, 7.0], [-0.8, 7.7]].map(([x, z]) => { const m = new Mesh(new ConeGeometry(0.32, 0.75, 8), hillMat); m.position.set(x, 0.5, z); scene.add(m); return m; });
  // 路線
  const route = new CatmullRomCurve3([V(1.2, 1.5, -7.2), V(0.9, 1.9, -4.5), V(0.1, 2.0, -2), V(-0.5, 1.6, 0), V(-0.9, 2.0, 2.2), V(-1.4, 1.9, 4.8), V(-1.6, 1.5, 7.3)]);
  const dots = []; for (let i = 0; i <= 40; i++) { const p = route.getPoint(i / 40); dots.push(add(ball, mat(0xffffff, { transparent: true, opacity: 0.6 }), p.x, p.y, p.z, 0.04, 0.04, 0.04)); }
  // 鳥
  const bird = new Group(); scene.add(bird);
  const bm = mat(0x6b5a48);
  add(ball, bm, 0, 0, 0, 0.16, 0.13, 0.4, bird); add(ball, bm, 0, 0.05, 0.42, 0.11, 0.11, 0.12, bird);
  const wingL = add(new BoxGeometry(1, 1, 1), bm, -0.42, 0, 0, 0.8, 0.03, 0.3, bird), wingR = add(new BoxGeometry(1, 1, 1), bm, 0.42, 0, 0, 0.8, 0.03, 0.3, bird);
  const lostMark = add(ball, mat(0xff5a4a, { emissive: 0xff2a1a, emissiveIntensity: 0.8 }), 0, 0.6, 0, 0.12, 0.12, 0.12, bird);
  // 太陽、星星、雲、磁力線
  const sunM = mat(0xffe27a, { emissive: 0xffc93c, emissiveIntensity: 1.2 });
  const sun = add(ball, sunM, -7, 7.2, -5.5, 0.9, 0.9, 0.9);
  const starM = mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 1 });
  const stars = []; for (let i = 0; i < 60; i++) stars.push(add(ball, starM, -5 - hash(i, 1) * 9, 2.5 + hash(i, 2) * 7, (hash(i, 3) - 0.5) * 26, 0.06, 0.06, 0.06));
  const north = add(ball, mat(0xfff2b0, { emissive: 0xfff2b0, emissiveIntensity: 1.4 }), -8, 7.5, -3, 0.12, 0.12, 0.12);
  const cloudM = mat(0xdfe6ee, { transparent: true, opacity: 0.9 });
  const clouds = []; for (let i = 0; i < 12; i++) clouds.push(add(ball, cloudM, -3 - hash(i, 4) * 7, 4.8 + hash(i, 5) * 2.2, (i - 5.5) * 1.9 + (hash(i, 6) - 0.5), 1.1 + 0.6 * hash(i, 7), 0.4, 1.3 + 0.7 * hash(i, 8)));
  const magM = mat(0xb48cff, { emissive: 0x9a6aff, emissiveIntensity: 0.8, transparent: true, opacity: 0.8 });
  const mags = []; for (const x of [-4, -1.3, 1.3, 4]) { const m = new Mesh(new TorusGeometry(9.2, 0.025, 6, 60, Math.PI), magM); m.rotation.y = Math.PI / 2; m.position.set(x, -0.3, 0); m.scale.set(1, 0.42, 1); scene.add(m); mags.push(m); }
  const magArrow = []; for (const x of [-4, -1.3, 1.3, 4]) { const m = new Mesh(new ConeGeometry(0.1, 0.3, 8), magM); m.rotation.x = -Math.PI / 2; m.position.set(x, 3.55, 0); scene.add(m); magArrow.push(m); }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    n: lab.add('cp-lb', 'North: summer home<small>北方：夏天繁殖的地方</small>'), t: lab.add('cp-lb', 'Taiwan: a rest stop<small>台灣：中途休息站</small>'), s: lab.add('cp-lb', 'South: winter home<small>南方：過冬的地方</small>'),
    bird: lab.add('cp-lb lf-lb-push', ''), mag: lab.add('cp-lb', 'Lines of Earth’s magnetism<small>地球磁場的方向</small>'), star: lab.add('cp-lb', 'The stars<small>星星</small>'),
  };

  const R = { views: [...root.querySelectorAll('.cp-view button')], j: $('.lf-mg-j'), jOut: $('.lf-mg-j-out'), senses: [...root.querySelectorAll('.lf-mg-senses button')], n: $('.lf-mg-n'), where: $('.lf-mg-where'),
    bar: $('.lf-mg-bar'), status: $('.lf-mg-status'), msgs: [...root.querySelectorAll('.lf-mg-msg')], play: $('.al-play'), cloud: $('[data-t="cloud"]') };
  const state = { journey: 10, day: true, clear: true, senses: { sun: true, stars: true, magnet: true, land: true }, labels: true, playing: true, time: 0, drift: 0, dir: 1 };
  const tmp = V(0, 0, 0);
  const cond = () => ({ day: state.day, clear: state.clear, journey: state.journey });

  function layout() {
    const c = cond(), p = present(c), use = usable(c, state.senses), lost = use.length === 0;
    scene.background.copy(state.clear ? (state.day ? DAY : NIGHT) : (state.day ? GRAY : NIGHT));
    hemi.intensity = state.day ? (state.clear ? 1.25 : 0.95) : 0.55; dl.intensity = state.day && state.clear ? 0.9 : 0.25;
    seaMat.color.set(state.day ? 0x2f7fc4 : 0x12305c);
    sun.visible = p.sun; stars.forEach((m) => { m.visible = p.stars; }); north.visible = p.stars;
    clouds.forEach((m) => { m.visible = !state.clear; });
    const magOn = state.senses.magnet; mags.forEach((m) => { m.visible = magOn; }); magArrow.forEach((m) => { m.visible = magOn; });
    hillMat.emissiveIntensity = use.includes('land') ? 0.7 : 0;
    const u = clamp(state.journey / 100);
    route.getPoint(u, bird.position); const q = route.getPoint(clamp(u + 0.01 * state.dir));
    state.drift += ((lost ? 1 : 0) - state.drift) * 0.06;                                   // 沒有線索就慢慢偏離路線
    bird.position.x += 3.2 * state.drift * Math.sin(state.time * 0.5); bird.position.y += 0.1 * Math.sin(state.time * 5);
    bird.rotation.y = Math.atan2(q.x - bird.position.x, q.z - bird.position.z) + (lost ? Math.sin(state.time * 1.3) * 1.2 : 0);
    wingL.rotation.z = 0.5 * Math.sin(state.time * 9); wingR.rotation.z = -0.5 * Math.sin(state.time * 9);
    lostMark.visible = lost && Math.sin(state.time * 8) > 0;
  }
  function updateLabels() {
    const on = state.labels;
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.n, on, 3.4, 0.3, -7.2, 26); show(L.t, on, 1.6, 0.3, 0, 26); show(L.s, on, 1.6, 0.3, 7.3, 26);
    show(L.bird, on, bird.position.x, bird.position.y + 0.9, bird.position.z);
    show(L.mag, on && state.senses.magnet, -4, 3.9, 0, -16);
    show(L.star, on && present(cond()).stars, north.position.x, north.position.y + 0.6, north.position.z);
  }
  function readout() {
    const c = cond(), p = present(c), use = usable(c, state.senses), k = holding(c, state.senses);
    R.views.forEach((b) => b.setAttribute('aria-pressed', (b.dataset.view === 'day') === state.day ? 'true' : 'false'));
    R.j.value = Math.round(state.journey); R.jOut.textContent = overLand(state.journey) ? 'Over land · 在陸地上空' : 'Over the sea · 在海上';
    R.senses.forEach((b) => {
      const key = b.dataset.k, onSense = state.senses[key], here = p[key];
      b.setAttribute('aria-pressed', onSense ? 'true' : 'false');
      b.dataset.state = !onSense ? 'off' : here ? 'use' : 'none';
      b.querySelector('em').textContent = !onSense ? 'switched off · 關掉了' : here ? 'in use · 用得上' : 'not there now · 現在沒有';
    });
    R.n.innerHTML = `${use.length} of 4<small>四種裡的 ${use.length} 種</small>`;
    R.where.innerHTML = use.length ? use.map((x) => CUE[x][0]).join(', ') + `<small>${use.map((x) => CUE[x][1]).join('、')}</small>` : 'Nothing<small>什麼都沒有</small>';
    R.bar.style.width = `${(use.length / 4) * 100}%`;
    R.status.innerHTML = use.length === 0 ? 'Off course<small class="zh">偏離路線</small>' : use.length === 1 ? 'On course, with no spare<small class="zh">還在路線上，但沒有備用的了</small>' : 'On course<small class="zh">在路線上</small>';
    L.bird.innerHTML = use.length ? `Using ${use.length} ${use.length === 1 ? 'clue' : 'clues'}<small>用得上 ${use.length} 種線索</small>` : 'Lost<small>迷路了</small>';
    if (R.cloud) R.cloud.checked = !state.clear;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.journey != null) state.journey = clamp(+o.journey, 0, 100);
    if (o.day != null) state.day = !!o.day;
    if (o.clear != null) state.clear = !!o.clear;
    if (o.senses) for (const k of CUES) if (o.senses[k] != null) state.senses[k] = !!o.senses[k];
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ day: b.dataset.view === 'day' })));
  R.j.addEventListener('input', () => { setPlaying(false); set({ journey: +R.j.value }); });
  R.senses.forEach((b) => b.addEventListener('click', () => set({ senses: { [b.dataset.k]: !state.senses[b.dataset.k] } })));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="cloud"]', (v) => set({ clear: !v }));
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0, shown = '';
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    state.time += dt;
    if (state.playing && usable(cond(), state.senses).length) {                                // 迷路的時候不會前進
      state.journey += dt * 6 * state.dir;
      if (state.journey >= 100) { state.journey = 100; state.dir = -1; } else if (state.journey <= 0) { state.journey = 0; state.dir = 1; }
      const key = `${overLand(state.journey)}${holding(cond(), state.senses)}`;
      if (key !== shown) { shown = key; readout(); } else R.j.value = Math.round(state.journey);
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

  const ALL = { sun: true, stars: true, magnet: true, land: true };
  const DEMO = {
    day: () => { setPlaying(true); set({ day: true, clear: true, journey: 30, senses: ALL }); },
    night: () => { setPlaying(true); set({ day: false, clear: true, journey: 30, senses: ALL }); },
    cloud: () => { setPlaying(true); set({ day: false, clear: false, journey: 65, senses: ALL }); },
    lost: () => { setPlaying(true); set({ day: false, clear: false, journey: 65, senses: { ...ALL, magnet: false } }); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：這段路有幾個台灣那麼長？（不需要 WebGL） ----------
function initTrips() {
  const el = document.querySelector('[data-life-trips]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-tp-pick button')];
  const max = Math.max(...items.map((x) => x.km));
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0];
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    q('.lf-tp-fill').style.width = `${Math.max(2, (it.km / max) * 100)}%`;
    q('.lf-tp-km').textContent = `${it.km.toLocaleString('en-US')} km`;
    q('.lf-tp-n').textContent = taiwans(it.km).toLocaleString('en-US');
    q('.lf-tp-note').textContent = it.note_en; q('.lf-tp-note-zh').textContent = it.note_zh;
    el.dataset.k = it.key;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__tp = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTrips);
else initTrips();

lazyBoot('[data-lifemigrate-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
