/*
 * 地球與天氣 · 第八課「颱風是怎麼形成的？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：溫暖的海面讓潮溼的空氣上升 → 中心氣壓變低 → 四周的空氣流進來、繞著中心轉（北半球逆時針）。
 *   水氣上升凝結成雲時放出熱，讓上升更旺、流進來更快——所以在溫暖的海面上越來越強；
 *   登陸以後水氣變少、地面摩擦變大，就慢慢減弱。
 *
 * 場景：一團雲（小白球），越強越有螺旋和颱風眼；兩個視角：從上面看／剖開看。
 * 數字與分級在 typhooncalc.js（氣象署的強度劃分）。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-typhoon.js
 * 除錯：document.querySelector('[data-earthtyphoon-lab]').__lab
 */
import {
  AmbientLight, CircleGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { category, forceOf, kmh, step, organized, eyeRadius, V_LO, V_HI } from './typhooncalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const lerp = (a, b, t) => a + (b - a) * t;
const R = 6, H = 3.2, N_PUFF = 1100, N_IN = 170, N_EYE = 14;
const CAT = { td: ['Tropical depression', '熱帶性低氣壓'], mild: ['Mild typhoon', '輕度颱風'], moderate: ['Moderate typhoon', '中度颱風'], severe: ['Severe typhoon', '強烈颱風'] };

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
  scene.background = new Color(0x0b1730);
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0, 0.9, 0);
  const fit = () => (camera.aspect < 0.85 ? 1.75 : camera.aspect < 1.2 ? 1.3 : 1);
  const homePos = (view) => TARGET.clone().add((view === 'cut' ? V(0, 3.4, 17) : V(0, 22, 7)).multiplyScalar(fit()));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 7; controls.maxDistance = 60;
  controls.minPolarAngle = 0.15; controls.maxPolarAngle = Math.PI * 0.5;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x35507a, 1.25));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sunL = new DirectionalLight(0xffffff, 1.1); sunL.position.set(-6, 12, 7); scene.add(sunL);

  const seaMat = new MeshStandardMaterial({ color: 0x1f5fae, roughness: 0.5 });
  const sea = new Mesh(new CircleGeometry(R + 1.6, 72), seaMat); sea.rotation.x = -Math.PI / 2; scene.add(sea);
  const SEA = new Color(0x1f5fae), LAND = new Color(0x55804a);

  const puffs = new InstancedMesh(new SphereGeometry(0.2, 10, 8), new MeshStandardMaterial({ color: 0xffffff, roughness: 1 }), N_PUFF); puffs.frustumCulled = false; scene.add(puffs);
  const inflow = new InstancedMesh(new SphereGeometry(0.055, 8, 6), new MeshBasicMaterial({ color: 0x9fd8ff }), N_IN); inflow.frustumCulled = false; scene.add(inflow);
  const sink = new InstancedMesh(new SphereGeometry(0.055, 8, 6), new MeshBasicMaterial({ color: 0xffb36b }), N_EYE); sink.frustumCulled = false; scene.add(sink);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    eye: lab.add('cp-lb ew-lb-push', 'Eye<small>颱風眼</small>'), wall: lab.add('cp-lb', 'Strongest wind and rain<small>風雨最強的地方</small>'),
    inn: lab.add('cp-lb', 'Moist air flows in<small>潮溼的空氣流進來</small>'), up: lab.add('cp-lb', 'Air rises and makes cloud<small>空氣上升，成雲</small>'),
    down: lab.add('cp-lb', 'Air sinks: clear sky<small>空氣下沉：無雲</small>'), ground: lab.add('cp-lb ew-ty-lb-g', ''), turn: lab.add('cp-lb', 'It turns counterclockwise<small>逆時針旋轉（北半球）</small>'),
  };

  const Rf = {
    views: [...root.querySelectorAll('.cp-view button')], places: [...root.querySelectorAll('.ew-ty-place button')], v: $('.ew-ty-v'), vOut: $('.ew-ty-v-out'),
    cat: $('.ew-ty-cat'), kmh: $('.ew-ty-kmh'), bf: $('.ew-ty-bf'), eye: $('.ew-ty-eye'), meter: $('.ew-ty-bar'), msgs: [...root.querySelectorAll('.ew-ty-msg')], play: $('.al-play'),
  };
  const state = { view: 'top', place: 'sea', v: 22, labels: true, playing: true, phase: 0, clock: 0 };

  const m4 = new Matrix4(), col = new Color();
  function draw(dt) {
    const v = state.v, o = organized(v), re = eyeRadius(v), cut = state.view === 'cut';
    state.phase += dt * (0.12 + (v / V_HI) * 0.75); state.clock += dt;
    seaMat.color.lerp(state.place === 'sea' ? SEA : LAND, Math.min(1, dt * 3 + (dt === 0 ? 1 : 0)));
    for (let i = 0; i < N_PUFF; i++) {
      const u = hash(i, 1), arm = Math.floor(hash(i, 2) * 4);
      const rs = re + (R - re) * u ** 1.55, ts = arm * (Math.PI / 2) - 2.3 * Math.log(rs / re) + (hash(i, 3) - 0.5) * (0.35 + 0.45 * u);     // 螺旋雲帶
      const rd = 4.6 * Math.sqrt(hash(i, 4)), td = hash(i, 5) * Math.PI * 2;                                                            // 散亂的雲
      const r = lerp(rd, rs, o), th = lerp(td, ts, o) + state.phase;
      const top = H * (0.3 + 0.7 * Math.exp(-(((r - re) / 1.7) ** 2))) * (0.55 + 0.45 * o);                                              // 眼牆最高，往外漸低
      const x = r * Math.cos(th), z = -r * Math.sin(th), y = 0.3 + hash(i, 6) * top;
      const s = (cut && z > 0.05) ? 0 : 0.6 + hash(i, 7) * 0.75;
      m4.makeScale(s, s * 0.8, s).setPosition(x, y, z); puffs.setMatrixAt(i, m4);
      const g = (0.78 + 0.22 * (y / (H + 0.3))) * (cut ? Math.max(0.22, 1 + z / (R * 0.55)) : 1); col.setRGB(g, g, g + 0.02); puffs.setColorAt(i, col);
    }
    puffs.instanceMatrix.needsUpdate = true; puffs.instanceColor.needsUpdate = true;
    // 貼著海面流進來的空氣：一邊繞、一邊往中心靠
    for (let i = 0; i < N_IN; i++) {
      const f = (state.clock * (0.05 + (v / V_HI) * 0.13) + hash(i, 11)) % 1, r = R + 0.8 - f * (R + 0.8 - re);
      const th = hash(i, 12) * Math.PI * 2 + state.phase * 1.3 + f * 2.6, x = r * Math.cos(th), z = -r * Math.sin(th);
      const s = (cut && z > 0.05) ? 0 : 1;
      m4.makeScale(s, s, s).setPosition(x, 0.12, z); inflow.setMatrixAt(i, m4);
    }
    inflow.instanceMatrix.needsUpdate = true;
    // 眼裡慢慢下沉的空氣（有眼的時候才畫）
    for (let i = 0; i < N_EYE; i++) {
      const f = (state.clock * 0.12 + hash(i, 21)) % 1, a = hash(i, 22) * Math.PI * 2, r = re * 0.55 * Math.sqrt(hash(i, 23));
      const s = o > 0.7 ? 1 : 0;
      m4.makeScale(s, s, s).setPosition(r * Math.cos(a), H * (1 - f) * 0.95 + 0.2, -Math.abs(r * Math.sin(a))); sink.setMatrixAt(i, m4);
    }
    sink.instanceMatrix.needsUpdate = true;
    return { v, o, re, cut };
  }

  let narrow = false;
  function updateLabels(d) {
    const on = state.labels, eye = d.o > 0.7;
    const show = (el, s, p, dy = 0) => { el.hidden = !s; if (s) lab.place(el, p, dy); };
    L.ground.innerHTML = state.place === 'sea' ? 'Warm sea<small>溫暖的海面</small>' : 'Land<small>陸地</small>';
    show(L.ground, true, V(-R * 0.72, 0, d.cut ? 0.2 : R * 0.72), 0);
    show(L.eye, eye, V(0, d.cut ? H + 0.5 : 0.2, d.cut ? 0 : -d.re), d.cut ? -6 : -16);
    show(L.wall, on && eye && !narrow, V(d.re + 0.5, d.cut ? H * 0.75 : H, d.cut ? 0 : -0.4), 0); L.wall.style.marginLeft = narrow ? '40px' : '96px';
    show(L.inn, on && !narrow, V(R * 0.8, 0.12, d.cut ? 0 : R * 0.55), d.cut ? -18 : 0);
    show(L.up, on && d.cut && !narrow, V(-(d.re + 0.6), H * 0.55, 0), 0); L.up.style.marginLeft = '-96px';
    show(L.down, on && d.cut && eye && !narrow, V(0, H * 0.35, 0), 0);
    show(L.turn, on && !d.cut && !narrow, V(-R * 0.55, 1.2, -R * 0.62), 0);
  }

  function readout() {
    const v = state.v, c = category(v), o = organized(v);
    Rf.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    Rf.places.forEach((b) => b.setAttribute('aria-pressed', b.dataset.place === state.place ? 'true' : 'false'));
    Rf.v.value = String(Math.round(v)); Rf.v.style.setProperty('--p', `${((v - V_LO) / (V_HI - V_LO)) * 100}%`);
    Rf.vOut.textContent = `${Math.round(v)} m/s`;
    Rf.cat.innerHTML = `${CAT[c][0]}<small>${CAT[c][1]}</small>`;
    Rf.kmh.innerHTML = `${Math.round(kmh(v))} km/h<small>每小時 ${Math.round(kmh(v))} 公里</small>`;
    Rf.bf.innerHTML = `Force ${forceOf(v)}<small>相當 ${forceOf(v)} 級風</small>`;
    Rf.eye.innerHTML = o > 0.7 ? 'Clear eye<small>眼很清楚</small>' : c === 'td' ? 'No eye yet<small>還沒有眼</small>' : 'Eye is forming<small>眼正在形成</small>';
    Rf.meter.style.width = `${((v - V_LO) / (V_HI - V_LO)) * 100}%`; Rf.meter.dataset.cat = c;
    const key = state.place === 'land' ? 'land' : c === 'td' ? 'td' : c === 'severe' ? 'severe' : 'grow';
    Rf.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function set(o) {
    if (o.view === 'top' || o.view === 'cut') { if (o.view !== state.view) { state.view = o.view; camera.position.copy(homePos(state.view)); controls.target.copy(TARGET); } }
    if (o.place === 'sea' || o.place === 'land') state.place = o.place;
    if (o.v != null) state.v = Math.min(V_HI, Math.max(V_LO, o.v));
    readout();
  }
  function setPlaying(p) {
    state.playing = p;
    root.classList.toggle('is-playing', p);
    root.classList.remove('al-fresh');
    Rf.play.setAttribute('aria-pressed', p ? 'true' : 'false');
    Rf.play.querySelector('.al-play-t').textContent = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  Rf.views.forEach((b) => b.addEventListener('click', () => set({ view: b.dataset.view })));
  Rf.places.forEach((b) => b.addEventListener('click', () => { set({ place: b.dataset.place }); setPlaying(true); }));
  Rf.v.addEventListener('input', () => { setPlaying(false); set({ v: +Rf.v.value }); });
  Rf.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (x) => { state.labels = x; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos(state.view)); controls.target.copy(TARGET); });

  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) state.v = step(state.v, state.place, dt);
    const d = draw(dt);                      // 暫停時雲還是會轉，只是強度不再變
    controls.update();
    updateLabels(d);
    if (t - lastR > 150) { lastR = t; readout(); }
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
  camera.position.copy(homePos(state.view));
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  draw(0); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o, play = false) => { setPlaying(play); set(o); };
  const DEMO = {
    td: () => go({ view: 'top', place: 'sea', v: 12 }), mild: () => go({ view: 'top', place: 'sea', v: 25 }),
    severe: () => go({ view: 'cut', place: 'sea', v: 55 }), landfall: () => go({ view: 'top', place: 'land', v: 48 }, true),
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { const d = draw(0); controls.update(); updateLabels(d); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：颱風眼經過你家（不需要 WebGL） ----------------
function initEyepass() {
  const el = document.querySelector('[data-earth-eyepass]');
  if (!el) return;
  const steps = JSON.parse(el.dataset.steps), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.ew-ep-steps button')];
  const POS = [6, 33, 50, 67, 94];
  function show(i) {
    const st = steps[i];
    btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    q('.ew-ep-town').style.left = `${POS[i]}%`;
    q('.ew-ep-k').textContent = `${i + 1} / ${steps.length}`;
    q('.ew-ep-t').textContent = st.k_en; q('.ew-ep-t-zh').textContent = st.k_zh;
    q('.ew-ep-en').textContent = st.en; q('.ew-ep-zh').textContent = st.zh;
    q('.ew-ep-wind').style.width = `${[0, 34, 67, 100][st.wind]}%`;
    q('.ew-ep-dir').textContent = st.dir; q('.ew-ep-dir').hidden = !st.dir;
    el.dataset.i = String(i);
  }
  btns.forEach((b, k) => b.addEventListener('click', () => show(k)));
  show(0);
  el.__ep = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initEyepass);
else initEyepass();

lazyBoot('[data-earthtyphoon-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
