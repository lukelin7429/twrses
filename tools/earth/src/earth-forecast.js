/*
 * 地球與天氣 · 第十課「天氣預報是怎麼做出來的？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：預報＝量出現在的天氣，再用電腦一步一步往後算。可是「現在」永遠量不到完全準確，
 *   一點點的差別會隨時間越變越大。所以同樣的計算要跑很多次，每次起點只差一點點；
 *   十次裡有七次下雨，就說降雨機率 70%。越遠的未來，十次的答案越分散。
 *
 * 場景：海上一座小島和一個小鎮，一條（或十條）雨帶從左邊移過來。兩個視角：跑一次／跑十次。
 * 數字都是示例，在 forecastcalc.js。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-forecast.js
 * 除錯：document.querySelector('[data-earthforecast-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { EPS, MAIN, TOWN_X, BAND, PERIOD, HOURS, frontX, rainingAt, rainInPeriod, runsWithRain, pop, periodOf } from './forecastcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.85, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const N_RUN = EPS.length, PER = 16, RAIN = 10, ZW = 3.2, CLOUD_Y = 2.0;

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
  scene.background = new Color(0x6fa8e6);
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(-1.4, 1.0, 0);
  const homePos = () => TARGET.clone().add(V(0, 9.5, 19).multiplyScalar(camera.aspect < 0.85 ? 2.0 : camera.aspect < 1.1 ? 1.5 : 0.86));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 8; controls.maxDistance = 70;
  controls.minPolarAngle = 0.35; controls.maxPolarAngle = Math.PI * 0.48;
  controls.minAzimuthAngle = -0.7; controls.maxAzimuthAngle = 0.7;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x35507a, 1.2));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 10, 8); scene.add(dl);

  const sea = new Mesh(new PlaneGeometry(120, 80), std(0x2a6fc9, { roughness: 0.45 })); sea.rotation.x = -Math.PI / 2; scene.add(sea);
  // 小島、山和小鎮
  const isle = new Mesh(new CylinderGeometry(2.6, 2.9, 0.3, 40), std(0x5f9a5a)); isle.scale.z = 0.8; scene.add(at(isle, TOWN_X + 0.4, 0.15, 0));
  for (let i = 0; i < 4; i++) scene.add(at(new Mesh(new ConeGeometry(0.5 + hash(i, 1) * 0.3, 0.9 + hash(i, 2) * 0.5, 7), std(0x3f7a47)), TOWN_X + 1.5 + hash(i, 3) * 0.6, 0.75, -1.2 + i * 0.8));
  for (let i = 0; i < 5; i++) {
    const x = TOWN_X - 0.3 + (i % 3) * 0.3, z = (Math.floor(i / 3) - 0.5) * 0.45 + (i % 2) * 0.1;
    scene.add(at(new Mesh(new BoxGeometry(0.2, 0.18, 0.2), std(0xe6d7b8)), x, 0.39, z));
    const rf = new Mesh(new ConeGeometry(0.18, 0.14, 4), std(0xa5523a)); rf.rotation.y = Math.PI / 4; scene.add(at(rf, x, 0.55, z));
  }
  // 雨帶：每一次計算一排雲，底下有雨
  const clouds = new InstancedMesh(new SphereGeometry(0.34, 10, 8), std(0xffffff, { roughness: 1 }), N_RUN * PER); clouds.frustumCulled = false; scene.add(clouds);
  const rain = new InstancedMesh(new BoxGeometry(0.03, 0.34, 0.03), new MeshBasicMaterial({ color: 0xcfe6ff }), N_RUN * RAIN); rain.frustumCulled = false; scene.add(rain);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = { town: lab.add('cp-lb ew-lb-push', ''), band: lab.add('cp-lb', ''), spread: lab.add('cp-lb', 'The ten answers spread out<small>十次的答案越來越分散</small>') };

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], leads: [...root.querySelectorAll('.ew-fc-lead button')], h: $('.ew-fc-h'), hOut: $('.ew-fc-h-out'),
    cells: [...root.querySelectorAll('.ew-fc-cell')], period: $('.ew-fc-period'), runs: $('.ew-fc-runs'), pop: $('.ew-fc-pop'), msgs: [...root.querySelectorAll('.ew-fc-msg')], play: $('.al-play'),
  };
  const state = { view: 'one', lead: 'far', h: 0, labels: true, playing: true, clock: 0 };

  const m4 = new Matrix4(), col = new Color(), WHITE = new Color(0xffffff), GHOST = new Color(0xb9c6da), DARK = new Color(0x8792a8);
  function draw(dt) {
    state.clock += dt;
    const ten = state.view === 'ten';
    for (let i = 0; i < N_RUN; i++) {
      const on = ten || i === MAIN, f = frontX(i, state.lead, state.h), cx = f - BAND / 2, raining = rainingAt(i, state.lead, state.h);
      for (let k = 0; k < PER; k++) {
        const id = i * PER + k, s = on ? (ten ? (i === MAIN ? 0.62 : 0.5) : 1) * (0.8 + hash(id, 1) * 0.5) : 0;
        const y = CLOUD_Y + (ten ? (i - MAIN) * 0.02 : 0) + hash(id, 2) * 0.3;
        m4.makeScale(s * (ten ? 0.8 : 1.3), s * 0.75, s * (ten ? 1.5 : 1)).setPosition(cx + (hash(id, 3) - 0.5) * BAND * (ten ? 0.12 : 0.8), y, -ZW + (k / (PER - 1)) * ZW * 2 + (hash(id, 4) - 0.5) * 0.3); clouds.setMatrixAt(id, m4);
        col.copy(i === MAIN || !ten ? WHITE : GHOST).lerp(DARK, raining ? 0.25 : 0); clouds.setColorAt(id, col);
      }
      for (let k = 0; k < RAIN; k++) {
        const id = i * RAIN + k, s = on && (i === MAIN || !ten) ? 1 : 0, fall = (state.clock * 1.6 + hash(id, 5)) % 1;
        m4.makeScale(s, s, s).setPosition(cx + (hash(id, 6) - 0.5) * BAND * 0.8, CLOUD_Y - 0.3 - fall * (CLOUD_Y - 0.5), -ZW + hash(id, 7) * ZW * 2); rain.setMatrixAt(id, m4);
      }
    }
    clouds.instanceMatrix.needsUpdate = true; clouds.instanceColor.needsUpdate = true; rain.instanceMatrix.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const ten = state.view === 'ten', wet = rainingAt(MAIN, state.lead, state.h);
    const show = (el, s, p, dy = 0) => { el.hidden = !s; if (s) lab.place(el, p, dy); };
    L.town.innerHTML = !ten && wet ? 'Town: raining<small>小鎮：下雨中</small>' : 'Town<small>小鎮</small>';
    show(L.town, true, V(TOWN_X, 0.6, 0.6), 26);
    const f = frontX(MAIN, state.lead, state.h);
    L.band.innerHTML = ten ? 'The most likely run<small>最可能的那一次</small>' : 'Rain band<small>雨帶</small>';
    show(L.band, state.labels && f < 9, V(f - BAND / 2, CLOUD_Y + 0.5, -ZW), -14);
    const sp = frontX(N_RUN - 1, state.lead, state.h) - frontX(0, state.lead, state.h);
    show(L.spread, state.labels && ten && sp > 2.2 && !narrow && f < 8, V(frontX(0, state.lead, state.h) - BAND / 2, CLOUD_Y, 0), 0); L.spread.style.marginLeft = '-130px';
  }

  function readout() {
    const ten = state.view === 'ten', p = periodOf(state.h), n = ten ? runsWithRain(state.lead, p) : (rainInPeriod(MAIN, state.lead, p) ? 1 : 0), tot = ten ? N_RUN : 1;
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    R.leads.forEach((b) => b.setAttribute('aria-pressed', b.dataset.lead === state.lead ? 'true' : 'false'));
    R.h.value = String(Math.round(state.h)); R.h.style.setProperty('--p', `${(state.h / HOURS) * 100}%`);
    R.hOut.textContent = `+${Math.round(state.h)} h`;
    R.cells.forEach((c, i) => {
      const v = ten ? `${pop(state.lead, i)}%` : (rainInPeriod(MAIN, state.lead, i) ? '☔' : '—');
      c.querySelector('b').textContent = v; c.classList.toggle('is-now', i === p);
      c.style.setProperty('--f', ten ? `${pop(state.lead, i)}%` : (rainInPeriod(MAIN, state.lead, i) ? '100%' : '0%'));
    });
    R.period.innerHTML = `+${p * PERIOD} to +${(p + 1) * PERIOD} h<small>${p * PERIOD} 到 ${(p + 1) * PERIOD} 小時後</small>`;
    R.runs.innerHTML = `${n} of ${tot}<small>${tot} 次裡有 ${n} 次</small>`;
    R.pop.innerHTML = ten ? `${pop(state.lead, p)}%<small>降雨機率</small>` : (n ? 'Rain<small>會下雨（只算了一次）</small>' : 'No rain<small>不會下雨（只算了一次）</small>');
    const pp = pop(state.lead, p), key = !ten ? 'one' : pp === 0 ? 'dry' : pp < 50 ? 'maybe' : pp < 100 ? 'likely' : 'sure';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.view === 'one' || o.view === 'ten') state.view = o.view;
    if (o.lead === 'near' || o.lead === 'far') state.lead = o.lead;
    if (o.h != null) state.h = Math.min(HOURS, Math.max(0, o.h));
    readout();
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => set({ view: b.dataset.view })));
  R.leads.forEach((b) => b.addEventListener('click', () => set({ lead: b.dataset.lead, h: 0 })));
  R.h.addEventListener('input', () => { setPlaying(false); set({ h: +R.h.value }); });
  R.cells.forEach((c, i) => c.addEventListener('click', () => { setPlaying(false); set({ h: i * PERIOD + PERIOD / 2 }); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) { state.h += dt * 5; if (state.h > HOURS) state.h = 0; }
    draw(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = w < 560;
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  draw(0); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o) => { setPlaying(false); set(o); };
  const DEMO = { one: () => go({ view: 'one', lead: 'far', h: 54 }), near: () => go({ view: 'ten', lead: 'near', h: 18 }), far: () => go({ view: 'ten', lead: 'far', h: 54 }), spread: () => go({ view: 'ten', lead: 'far', h: 42 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { draw(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：晴、多雲、陰（不需要 WebGL） ----------------
function initSky() {
  const el = document.querySelector('[data-earth-skyword]');
  if (!el) return;
  const words = JSON.parse(el.dataset.words), q = (s) => el.querySelector(s), f = q('.ew-sw-f'), cells = [...el.querySelectorAll('.ew-sw-grid i')];
  function show() {
    const n = +f.value, k = n <= 4 ? 'sunny' : n <= 8 ? 'cloudy' : 'overcast';
    f.style.setProperty('--p', `${n * 10}%`);
    cells.forEach((c, i) => c.classList.toggle('on', i < n));
    q('.ew-sw-n').textContent = `${n}/10`; q('.ew-sw-en').textContent = words[k].en; q('.ew-sw-zh').textContent = words[k].zh;
    q('.ew-sw-rule').textContent = words[k].rule_en; q('.ew-sw-rule-zh').textContent = words[k].rule_zh;
    el.dataset.k = k;
  }
  f.addEventListener('input', show);
  show();
  el.__sw = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSky);
else initSky();

lazyBoot('[data-earthforecast-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
