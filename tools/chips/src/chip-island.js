/*
 * 晶片與半導體 · 第八課「台灣怎麼成為晶片島？」的 3D 模型（自繪示意：台灣的輪廓是簡化的，地點是大約位置）。
 *
 * 一個機制：一顆晶片要經過「設計 → 製造 → 封裝測試」三段，由不同的公司各做一段（晶圓代工模式）；
 *   台灣每一段都有重要的公司，又集中在幾個科學園區，所以一顆晶片可以在島上走完大部分的路。
 *
 * 兩個視角：
 *   journey「晶片的旅程」：一顆發亮的晶片沿著弧線走——1 設計（新竹）→ 2 製造（台南的晶圓廠）→ 3 封裝測試（高雄）→ 4 送往全世界。
 *     這條路線是「一個例子」，真的晶片各有各的路線。
 *   time「時間軸」：拉年份（1970–2005），1973 工研院、1976 RCA、1980 聯電與竹科、1984 日月光、1987 台積電、1995 南科、2003 中科
 *     一個個出現在地圖上。
 *
 * 座標：+X 往東、+Z 往南（地圖朝上是北）。產物：cd tools/chips && npm run build → assets/js/chip-island.js
 * 除錯：document.querySelector('[data-chipisland-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, Color, CylinderGeometry, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight,
  Line, LineBasicMaterial, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Shape,
  SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { OUTLINE, PLACES, project, km, EVENTS, eventsBy, ROLES, score, YEAR_MIN, YEAR_MAX } from './islandcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });
const P = (k) => { const p = project(PLACES[k].lon, PLACES[k].lat); return V(p.x, 0.16, p.z); };
const PIN = { hsinchu: 0x58b4ff, taichung: 0x7cf29a, tainan: 0xffb347, kaohsiung: 0xff7ad9, changhua: 0xffffff };
const STEPS = ['design', 'make', 'pack', 'ship'];
const WORLD = V(3.4, 0.16, -4.6);                       // 「送往全世界」：畫面右上角（往東北飛出去）
const LEG = [['hsinchu', 'hsinchu'], ['hsinchu', 'tainan'], ['tainan', 'kaohsiung'], ['kaohsiung', null]];
const STEP_T = 3.2, HOLD_T = 1.6;

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
  scene.background = new Color(0x0b1a33);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0.3, 0, -0.2);
  const homePos = () => TARGET.clone().add(V(0.2, 13.2, 4.6).multiplyScalar(camera.aspect < 0.85 ? 1.25 : camera.aspect < 1.2 ? 1.05 : 0.95));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 30; controls.maxPolarAngle = Math.PI * 0.47;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x1a2a40, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sun = new DirectionalLight(0xffffff, 1.1); sun.position.set(-4, 10, 5); scene.add(sun);

  // 海與島
  scene.add(at(new Mesh(new BoxGeometry(22, 0.1, 22), std(0x123a63, { roughness: 0.4, metalness: 0.2 })), 0, -0.06, 0));
  const shape = new Shape();
  OUTLINE.forEach(([lon, lat], i) => { const p = project(lon, lat); if (i) shape.lineTo(p.x, -p.z); else shape.moveTo(p.x, -p.z); });
  const island = new Mesh(new ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.04, bevelSegments: 2 }), std(0x2f8f5b, { roughness: 0.85 }));
  island.rotation.x = -Math.PI / 2; scene.add(island);                    // Shape 的 y → 場景的 −z（北在上）
  // 中央山脈（示意的一條稜線）
  const ridge = [[121.45, 24.6], [121.25, 24.2], [121.1, 23.6], [120.95, 23.1], [120.8, 22.6]];
  ridge.forEach(([lon, lat], i) => { const p = project(lon, lat); const m = at(new Mesh(new SphereGeometry(0.42 - i * 0.03, 16, 10), std(0x4bb27a, { roughness: 0.95 })), p.x, 0.13, p.z); m.scale.y = 0.6; scene.add(m); });

  // 地點的圖釘
  const pins = {};
  for (const k of Object.keys(PLACES)) {
    const g = new Group(); g.position.copy(P(k)); scene.add(g);
    const small = k === 'changhua';
    g.add(at(new Mesh(new CylinderGeometry(0.02, 0.02, small ? 0.3 : 0.55, 8), std(0xdfe6f2)), 0, small ? 0.15 : 0.275, 0));
    const head = at(new Mesh(new SphereGeometry(small ? 0.07 : 0.13, 16, 12), std(PIN[k], { emissive: PIN[k], emissiveIntensity: 0.25 })), 0, small ? 0.33 : 0.62, 0); g.add(head);
    pins[k] = { g, head };
  }
  // 旅程的弧線與發亮的晶片
  const arcPts = (a, b, n = 40) => { const pts = [], h = Math.max(0.6, a.distanceTo(b) * 0.28); for (let i = 0; i <= n; i++) { const u = i / n, p = a.clone().lerp(b, u); p.y += Math.sin(Math.PI * u) * h; pts.push(p); } return pts; };
  const legs = LEG.map(([a, b]) => { const A = P(a), B = b ? P(b) : WORLD; return a === b ? null : arcPts(A, B); });
  const legLines = legs.map((pts) => { if (!pts) return null; const l = new Line(new BufferGeometry().setFromPoints(pts), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.85 })); l.visible = false; scene.add(l); return l; });
  const chip = new Mesh(new BoxGeometry(0.2, 0.05, 0.2), new MeshBasicMaterial({ color: 0xffe9a0 })); scene.add(chip);
  const glow = new Mesh(new SphereGeometry(0.2, 16, 12), new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.25 })); chip.add(glow);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const LP = Object.fromEntries(Object.keys(PLACES).map((k) => [k, lab.add(`cp-lb cp-is-lb cp-is-lb-${k}`, '')]));
  const Lworld = lab.add('cp-lb cp-sc-name', 'To the world<small>送往全世界</small>');
  const Lchip = lab.add('cp-lb cp-sc-name', '');

  const R = {
    views: [...root.querySelectorAll('.cp-view button')], steps: [...root.querySelectorAll('.cp-is-steps button')], tour: $('.cp-is-tour'),
    panels: [...root.querySelectorAll('.cp-is-panel')], year: $('.cp-is-year'), yearOut: $('.cp-is-year-out'),
    evs: [...root.querySelectorAll('.cp-is-ev')], km: $('.cp-is-km'), play: $('.al-play'), journeyBox: $('.cp-is-jbox'), timeBox: $('.cp-is-tbox'),
  };
  const stepNames = JSON.parse(root.dataset.steps || '[]');
  const state = { view: 'journey', step: 0, prog: 0, tour: true, hold: 0, year: YEAR_MIN, labels: true, playing: true, clock: 0 };

  const tmp = V(0, 0, 0);
  function draw() {
    const j = state.view === 'journey';
    // 旅程
    chip.visible = j;
    legLines.forEach((l, i) => { if (l) l.visible = j && (i < state.step || (i === state.step && state.prog > 0.02)); });
    if (j) {
      const pts = legs[state.step];
      if (!pts) { tmp.copy(P('hsinchu')); tmp.y = 0.95 + Math.sin(state.clock * 3) * 0.05; }
      else { const u = MathUtils.smoothstep(state.prog, 0, 1) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(u)); tmp.lerpVectors(pts[i], pts[i + 1], u - i); tmp.y += 0.25; }
      chip.position.copy(tmp); chip.rotation.y = state.clock * 1.5;
      glow.scale.setScalar(1 + Math.sin(state.clock * 4) * 0.15);
    }
    // 圖釘：旅程裡目前那一站跳一下；時間軸裡，那一年以前有事件的地點才亮
    const seen = new Set(eventsBy(state.year).map((e) => e.place));
    const cur = j ? (state.step === 3 ? 'kaohsiung' : LEG[state.step][state.prog > 0.5 ? 1 : 0]) : null;
    for (const k of Object.keys(pins)) {
      const on = j ? true : (seen.has(k) || k === 'changhua');
      pins[k].g.visible = on;
      pins[k].head.scale.setScalar(k === cur ? 1.35 + Math.sin(state.clock * 6) * 0.15 : 1);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, j = state.view === 'journey';
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const count = {};
    if (!j) for (const e of eventsBy(state.year)) count[e.place] = (count[e.place] || 0) + 1;
    for (const k of Object.keys(PLACES)) {
      const p = PLACES[k], vis = on && pins[k].g.visible && !(narrow && k === 'changhua' && j);
      LP[k].innerHTML = `${p.en}<small>${p.zh}${!j && count[k] ? `（${count[k]}）` : ''}</small>`;
      tmp.copy(pins[k].g.position); tmp.y += k === 'changhua' ? 0.4 : 0.75;
      show(LP[k], vis, tmp, k === 'changhua' ? 30 : -16);
      LP[k].style.marginLeft = k === 'changhua' ? '-58px' : '-50px';
    }
    show(Lworld, on && j && state.step === 3, WORLD, -10);
    const nm = stepNames[state.step];
    if (nm) Lchip.innerHTML = `${state.step + 1} · ${nm.en}<small>${nm.zh}</small>`;
    show(Lchip, on && j && !!nm, chip.position, -30);
  }

  function readout() {
    const j = state.view === 'journey';
    R.views.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'));
    R.journeyBox.hidden = !j; R.timeBox.hidden = j;
    R.steps.forEach((b, i) => b.setAttribute('aria-pressed', i === state.step ? 'true' : 'false'));
    R.panels.forEach((p, i) => { p.hidden = i !== state.step; });
    R.tour.setAttribute('aria-pressed', state.tour ? 'true' : 'false');
    R.tour.querySelector('.t').textContent = state.tour ? 'Stop · 停止' : 'Play the whole trip · 播放全程';
    R.year.value = String(state.year); R.year.style.setProperty('--p', `${(state.year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN) * 100}%`);
    R.yearOut.textContent = String(Math.round(state.year));
    const seen = eventsBy(Math.round(state.year)), last = seen[seen.length - 1];
    R.evs.forEach((li) => { const on = seen.some((e) => e.key === li.dataset.ev); li.classList.toggle('on', on); li.classList.toggle('now', !!last && li.dataset.ev === last.key); });
    R.km.textContent = `${Math.round(km(PLACES.hsinchu, PLACES.tainan))} km + ${Math.round(km(PLACES.tainan, PLACES.kaohsiung))} km`;
  }

  function setView(v) { if (v === 'journey' || v === 'time') { state.view = v; if (v === 'time' && state.year <= YEAR_MIN) state.year = YEAR_MIN; readout(); } }
  function setStep(i, now = false) { state.step = MathUtils.clamp(i, 0, 3); state.prog = now ? 1 : 0; state.hold = 0; readout(); }
  function setTour(v) { state.tour = !!v; readout(); }
  function setYear(y) { state.year = MathUtils.clamp(+y, YEAR_MIN, YEAR_MAX); readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  R.steps.forEach((b, i) => b.addEventListener('click', () => { setTour(false); setStep(i); setPlaying(true); }));
  R.tour.addEventListener('click', () => { const v = !state.tour; if (v) setStep(0); setTour(v); setPlaying(true); });
  R.year.addEventListener('input', () => { state.autoYear = false; setYear(R.year.value); });
  R.evs.forEach((li) => li.addEventListener('click', () => { state.autoYear = false; const e = EVENTS.find((x) => x.key === li.dataset.ev); if (e) setYear(e.year); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let lastYear = -1;
  function step(dt) {
    if (state.playing) {
      state.clock += dt;
      if (state.view === 'journey') {
        if (state.prog < 1) state.prog = Math.min(1, state.prog + dt / STEP_T);
        else if (state.tour) { state.hold += dt; if (state.hold > HOLD_T) { state.hold = 0; state.step = (state.step + 1) % 4; state.prog = 0; readout(); } }
      } else if (state.autoYear) {
        state.year = Math.min(YEAR_MAX, state.year + dt * 2.2);
        if (Math.round(state.year) !== lastYear) { lastYear = Math.round(state.year); readout(); }
        if (state.year >= YEAR_MAX) state.autoYear = false;
      }
    }
    draw();
  }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
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

  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    design: () => { setView('journey'); setTour(false); setStep(0); setPlaying(true); },
    make: () => { setView('journey'); setTour(false); setStep(1); setPlaying(true); },
    pack: () => { setView('journey'); setTour(false); setStep(2); setPlaying(true); },
    time: () => { setView('time'); state.year = YEAR_MIN; state.autoYear = true; setPlaying(true); readout(); },
  };
  root.__lab = {
    camera, controls, state, setView, setStep, setTour, setYear, setPlaying,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：誰做哪一段？（不需要 WebGL） ----------------
function initWho() {
  const el = document.querySelector('[data-chip-who]');
  if (!el) return;
  const rows = [...el.querySelectorAll('.cp-who-row')], out = el.querySelector('.cp-who-score'), msg = el.querySelector('.cp-who-msg'), reset = el.querySelector('.cp-who-reset');
  const ans = {};
  function show() {
    rows.forEach((r) => {
      const name = r.dataset.name, pick = ans[name];
      r.querySelectorAll('button').forEach((b) => { const on = b.dataset.role === pick; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('ok', on && ROLES[name] === pick); b.classList.toggle('no', on && ROLES[name] !== pick); });
      r.classList.toggle('done', !!pick && ROLES[name] === pick);
    });
    const n = score(ans), total = Object.keys(ROLES).length, tried = Object.keys(ans).length;
    out.textContent = `${n} / ${total}`;
    msg.hidden = !(n === total);
    reset.hidden = tried === 0;
  }
  rows.forEach((r) => r.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { ans[r.dataset.name] = b.dataset.role; show(); })));
  reset.addEventListener('click', () => { for (const k of Object.keys(ans)) delete ans[k]; show(); });
  show();
  el.__who = { ans, show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWho);
else initWho();

lazyBoot('[data-chipisland-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
