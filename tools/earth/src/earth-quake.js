/*
 * 地球與天氣 · 第二課「台灣為什麼地震這麼多？」的 3D 模型（全部自繪示意；垂直方向與滑動量都大幅誇大）。
 *
 * 一個機制：板塊一直在推，斷層卻卡住不動，岩層像彈簧一樣被壓彎、把力存起來；
 *   存到斷層撐不住，就突然滑動——這一下就是地震（彈性回彈）。滑完又卡住，重新開始累積。
 *   地震波從震源往外傳：P 波快、先到、搖得小；S 波慢、後到、搖得大。
 *
 * 場景：一塊剖開的地殼。左邊（歐亞板塊）不動，右邊（菲律賓海板塊那一側）被往左推，
 *   沿著斜的斷層往上爬。時間用「年」走；滑動的那一刻改成慢動作看地震波。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-quake.js
 * 除錯：document.querySelector('[data-earthquake-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, Color, ConeGeometry, CylinderGeometry, DirectionalLight, DoubleSide, Group,
  HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, RingGeometry, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { RATE_CM, MODES, stored, cycle, VP, VS, ALERT_S, tP, tS, warning, blindKm } from './quakecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.8, ...o });
const XL = -6.5, XR = 6.5, D = 2.4, ZD = 4.2, TH = Math.PI / 6;           // 左右邊界、地殼厚度、前後深度、斷層傾角
const TAN = Math.tan(TH), DIRX = -Math.cos(TH), DIRY = Math.sin(TH);
const xFault = (y) => -y / TAN;                                           // 斷層在深度 y（負值）的 x
const K = 1 / 12;                                                         // 1 公尺的移動畫成幾個場景單位（誇大）
const END_YEARS = 320, YEARS_PER_S = 16, QUAKE_S = 5.5, WAVE_X = 4;       // 一輪幾年、每秒走幾年、地震慢動作幾秒、慢動作倍率
const KM = 10;                                                            // 1 個場景單位當成 10 公里（只用在地震波）
const STRATA = [0x6b5a4a, 0x8a7358, 0xa58a63, 0x7d6a55, 0x9c8a6e, 0x5f7a52];
const NU = 26, NV = 6;

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
  scene.background = new Color(0x0e1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, -0.3, 0);
  const homePos = () => TARGET.clone().add(V(0, 5.2, 17.5).multiplyScalar(camera.aspect < 0.85 ? 1.9 : camera.aspect < 1.2 ? 1.42 : 1.06));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 50;
  controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.5;
  controls.minAzimuthAngle = -0.7; controls.maxAzimuthAngle = 0.7;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.5));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(-3, 9, 8); scene.add(sun);

  // 底下墊一塊深色的（地函示意）
  scene.add(at(new Mesh(new BoxGeometry(XR - XL + 0.6, 0.5, ZD + 0.6), std(0x3a2530)), 0, -D - 0.26, 0));

  // 一塊地殼＝正面（有地層的顏色）＋頂面（綠色的地表）。用格點畫，才能變形。
  function slab(xOf) {
    const front = new PlaneGeometry(1, 1, NU, NV), top = new PlaneGeometry(1, 1, NU, 1);
    const fc = new Float32Array((NU + 1) * (NV + 1) * 3); front.setAttribute('color', new BufferAttribute(fc, 3));
    const fm = new Mesh(front, new MeshBasicMaterial({ vertexColors: true, side: DoubleSide }));
    const tm = new Mesh(top, std(0x4f9a5a, { side: DoubleSide }));
    scene.add(fm, tm);
    const c = new Color(), red = new Color(0xe0461a);
    // disp(u, v) → [dx, dy]；strain 0–1 讓地層偏紅
    function update(disp, strain) {
      const fp = front.attributes.position, tp = top.attributes.position;
      for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++) {
        const u = i / NU, v = 1 - j / NV, y = -D + v * D, [dx, dy] = disp(u, v), k = j * (NU + 1) + i;
        fp.setXYZ(k, xOf(u, y) + dx, y + dy, ZD / 2);
        c.set(STRATA[Math.min(NV - 1, Math.floor((1 - v) * NV * 0.999))]).lerp(red, strain * 0.55 * (0.4 + 0.6 * v));
        fc[k * 3] = c.r; fc[k * 3 + 1] = c.g; fc[k * 3 + 2] = c.b;
      }
      for (let i = 0; i <= NU; i++) { const u = i / NU, [dx, dy] = disp(u, 1); tp.setXYZ(i, xOf(u, 0) + dx, dy, -ZD / 2); tp.setXYZ(NU + 1 + i, xOf(u, 0) + dx, dy, ZD / 2); }
      fp.needsUpdate = true; tp.needsUpdate = true; front.attributes.color.needsUpdate = true; top.computeVertexNormals();
    }
    return { update };
  }
  const foot = slab((u, y) => XL + u * (xFault(y) - XL));                 // 左：歐亞板塊這一側，不動
  const hang = slab((u, y) => xFault(y) + u * (XR - xFault(y)));          // 右：被推的一側
  // 斷層線（正面上的一條線）
  const faultMat = new MeshBasicMaterial({ color: 0xffd36e });
  const faultLine = new Mesh(new BoxGeometry(D / Math.sin(TH), 0.07, 0.05), faultMat);
  faultLine.rotation.z = -TH; at(faultLine, xFault(-D / 2), -D / 2, ZD / 2 + 0.02); scene.add(faultLine);

  // 地表上的東西：樹（跟著地表動，看得出被擠壓）、兩間房子
  const trees = [];
  const mkTree = () => { const g = new Group(); g.add(at(new Mesh(new CylinderGeometry(0.05, 0.05, 0.22, 6), std(0x6b4a2a)), 0, 0.11, 0)); g.add(at(new Mesh(new ConeGeometry(0.2, 0.5, 8), std(0x2f7d3f)), 0, 0.45, 0)); scene.add(g); return g; };
  for (let i = 0; i < 9; i++) trees.push({ g: mkTree(), u: 0.08 + i * 0.105, z: (i % 3 - 1) * 1.1 });
  const mkHouse = (color) => { const g = new Group(); g.add(at(new Mesh(new BoxGeometry(0.5, 0.36, 0.5), std(0xf2efe6)), 0, 0.18, 0)); const r = new Mesh(new ConeGeometry(0.44, 0.3, 4), std(color)); r.rotation.y = Math.PI / 4; g.add(at(r, 0, 0.51, 0)); scene.add(g); return g; };
  const TOWNS = [{ x: -1.6, z: 0.9, g: mkHouse(0xd8452f) }, { x: -5.4, z: -0.6, g: mkHouse(0x3d6fd8) }];
  // 推的箭頭
  const arrow = new Group(); scene.add(arrow);
  const arMat = new MeshBasicMaterial({ color: 0xffb347 });
  arrow.add(at(new Mesh(new BoxGeometry(1.3, 0.22, 0.22), arMat), 0.65, 0, 0));
  const head = new Mesh(new ConeGeometry(0.3, 0.55, 12), arMat); head.rotation.z = Math.PI / 2; arrow.add(at(head, -0.25, 0, 0));
  // 地震波：兩個圈（P 黃、S 紅），和震源的閃光
  const mkRing = (color) => { const m = new Mesh(new RingGeometry(0.94, 1, 72), new MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: DoubleSide, depthTest: false })); m.rotation.x = -Math.PI / 2; m.renderOrder = 5; scene.add(m); return m; };
  const ringP = mkRing(0xffe27a), ringS = mkRing(0xff5a46);
  const EPI = V(0.6, 0.06, 0);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mk = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    eu: mk('ew-lb-plate', 'Eurasian Plate side', '歐亞板塊這一側'), ps: mk('ew-lb-plate', 'Philippine Sea Plate side', '菲律賓海板塊這一側'),
    push: mk('ew-lb-push', 'Pushing 7 to 8 cm a year', '每年推 7 到 8 公分'), fault: lab.add('cp-lb ew-lb-fault', ''),
    p: mk('ew-lb-p', 'P wave: fast, arrives first', 'P 波：快，先到'), s: mk('ew-lb-s', 'S wave: slower, shakes harder', 'S 波：慢一點，搖得厲害'),
  };

  const R = {
    modes: [...root.querySelectorAll('.ew-qk-modes button')], years: $('.ew-qk-years'), stored: $('.ew-qk-stored'), count: $('.ew-qk-count'), slip: $('.ew-qk-slip'),
    bar: $('.ew-qk-bar'), status: $('.ew-qk-status'), msgs: [...root.querySelectorAll('.ew-qk-msg')], play: $('.al-play'),
  };
  // t＝這一輪走了幾年；phase 'build' 累積、'quake' 滑動後看地震波、'done' 一輪結束；qt＝地震慢動作走了幾秒
  const state = { mode: 'easy', t: 0, phase: 'build', qt: 0, slipped: 0, labels: true, playing: true, clock: 0 };
  const ease = (x) => x * x * (3 - 2 * x);

  function geometry() {
    const c = cycle(state.t, state.mode), T = c.period;
    // 已經滑掉的量 S、板塊總共推的量 P（場景單位）
    const jump = state.phase === 'quake' ? ease(Math.min(1, state.qt / 0.5)) : 1;      // 滑動在半秒內完成
    const S = (state.slipped - (state.phase === 'quake' ? (1 - jump) * c.slip : 0)) * K;
    const P = stored(state.t) * K, q = Math.max(0, P - S), strain = Math.min(1, q / (stored(T) * K));
    return { c, S, P, q, strain };
  }
  const dispOf = (g) => (u, v) => [(1 - u) * DIRX * g.S + u * -g.P, (1 - u) * DIRY * g.S + 0.55 * g.q * Math.sin(Math.PI * Math.min(1, u * 1.6)) * v];

  function draw() {
    const g = geometry(), disp = dispOf(g), quake = state.phase === 'quake';
    hang.update(disp, g.strain); foot.update(() => [0, 0], 0);
    trees.forEach((t) => { const [dx, dy] = disp(t.u, 1); t.g.position.set(xFault(0) + t.u * (XR - xFault(0)) + dx, dy, t.z); });
    arrow.position.set(XR - g.P + 0.75 + (state.playing && !quake ? Math.sin(state.clock * 4) * 0.06 : 0), -D / 2, ZD / 2 + 0.2);
    faultMat.color.set(quake && state.qt < 1.2 ? 0xff5a46 : 0xffd36e);
    // 地震波（慢動作：qt 秒 × WAVE_X ＝ 地震發生後幾秒）
    const ts = state.qt * WAVE_X, rp = (VP * ts) / KM, rs = (VS * ts) / KM;
    const fade = (r) => Math.max(0, 1 - r / 9);
    ringP.visible = quake && fade(rp) > 0; ringS.visible = quake && fade(rs) > 0;
    ringP.scale.setScalar(Math.max(0.01, rp)); ringS.scale.setScalar(Math.max(0.01, rs));
    ringP.material.opacity = 0.9 * fade(rp); ringS.material.opacity = 0.95 * fade(rs);
    ringP.position.copy(EPI); ringS.position.copy(EPI);
    TOWNS.forEach((tw) => {
      const d = Math.hypot(tw.x - EPI.x, tw.z - EPI.z);
      const amp = !quake ? 0 : rs >= d ? 0.09 * Math.max(0, 1 - (rs - d) / 5) : rp >= d ? 0.02 : 0;
      tw.g.position.set(tw.x + Math.sin(state.clock * 38) * amp, Math.abs(Math.sin(state.clock * 31)) * amp * 0.4, tw.z);
      tw.g.rotation.z = Math.sin(state.clock * 33) * amp * 0.8;
    });
    return g;
  }

  let narrow = false;
  function updateLabels(g) {
    const on = state.labels, quake = state.phase === 'quake';
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.eu, on && !quake, V(XL + 2.2, -D * 0.72, ZD / 2), 0);
    show(L.ps, on && !quake, V(XR - 2.6 - g.P, -D * 0.72, ZD / 2), 0);
    show(L.push, on && !quake && !narrow, V(XR - g.P + 0.7, -D / 2, ZD / 2 + 0.2), -26);
    L.fault.innerHTML = quake ? 'It slips: an earthquake!<small>滑動了：地震！</small>' : 'Fault: stuck<small>斷層：卡住了</small>';
    L.fault.classList.toggle('slip', quake);
    show(L.fault, on || quake, narrow ? V(0.2, -D - 0.3, ZD / 2) : V(xFault(-D * 0.45), -D * 0.45, ZD / 2), narrow ? 30 : 0); L.fault.style.marginLeft = narrow ? '0' : '-96px';
    const ts = state.qt * WAVE_X, rp = (VP * ts) / KM, rs = (VS * ts) / KM;
    show(L.p, quake && rp > 0.6 && rp < 7.5 && !(narrow && rs > 1.6), V(EPI.x - Math.min(rp, 7), 0.1, 1.9), -16);
    show(L.s, quake && rs > (narrow ? 1.6 : 0.6) && rs < 7.5, V(EPI.x - Math.min(rs, 7), 0.1, -1.2), -16);
  }

  const f1 = (x) => (Math.abs(x - Math.round(x)) < 0.05 ? String(Math.round(x)) : x.toFixed(1));
  function readout(g) {
    const c = g.c, quake = state.phase === 'quake', since = quake || state.phase === 'done' ? 0 : c.since;
    R.modes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode ? 'true' : 'false'));
    R.years.innerHTML = `${Math.round(since)}<small>years · 年</small>`;
    R.stored.innerHTML = `${f1(stored(since))} m<small>waiting to be released · 還沒放出來</small>`;
    R.count.innerHTML = `${Math.round(state.slipped / c.slip)}<small>in ${Math.round(state.t)} years · ${Math.round(state.t)} 年裡</small>`;
    R.slip.innerHTML = `${f1(c.slip)} m<small>each time · 每一次</small>`;
    R.bar.style.setProperty('--w', `${(quake ? 0 : g.strain) * 100}%`);
    R.bar.classList.toggle('hot', g.strain > 0.85 && !quake);
    R.status.innerHTML = quake ? 'Earthquake!<small>地震！</small>' : state.phase === 'done' ? 'Finished: press Play to run again<small>這一輪結束：按播放再看一次</small>' : g.strain > 0.85 ? 'About to give way<small>快撐不住了</small>' : 'Force is building up<small>力正在累積</small>';
    R.status.className = `cp-ht-status ew-qk-status ${quake ? 'bad' : ''}`;
    const key = `${quake ? 'quake' : 'build'}-${state.mode}`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function restart() { state.t = 0; state.slipped = 0; state.phase = 'build'; state.qt = 0; }
  function setMode(v) { if (v in MODES) { state.mode = v; restart(); } }
  function setPlaying(v) {
    if (v && state.phase === 'done') restart();
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : state.phase === 'done' ? 'Run again · 再跑一次' : 'Play · 播放';
  }
  R.modes.forEach((b) => b.addEventListener('click', () => { setMode(b.dataset.mode); setPlaying(true); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function advance(dt) {
    if (!state.playing) return;
    state.clock += dt;
    if (state.phase === 'build') {
      const T = MODES[state.mode].years, next = (Math.round(state.slipped / stored(T)) + 1) * T;
      state.t = Math.min(next, state.t + dt * YEARS_PER_S);
      if (state.t >= next) { state.slipped += stored(T); state.phase = 'quake'; state.qt = 0; }
    } else if (state.phase === 'quake') {
      state.qt += dt;
      if (state.qt >= QUAKE_S) { state.qt = 0; state.phase = state.t >= END_YEARS ? 'done' : 'build'; if (state.phase === 'done') setPlaying(false); }
    }
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    advance(dt);
    const g = draw();
    controls.update();
    updateLabels(g);
    if (t - lastR > 100) { lastR = t; readout(g); }
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

  readout(draw());
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  // 跳到下一次滑動之前一點點（卡片「看地震波」用）
  function nearSlip() { const T = MODES[state.mode].years; state.phase = 'build'; state.qt = 0; state.t = (Math.round(state.slipped / stored(T)) + 1) * T - 4; }
  const DEMO = { easy: () => { setMode('easy'); setPlaying(true); }, hard: () => { setMode('hard'); setPlaying(true); }, waves: () => { if (state.phase === 'done') restart(); nearSlip(); setPlaying(true); }, again: () => { restart(); setPlaying(true); } };
  root.__lab = {
    camera, controls, state, setMode, setPlaying, restart, nearSlip,
    run: (sec) => { const was = state.playing; state.playing = true; for (let t = 0; t < sec; t += 0.02) advance(0.02); state.playing = was || state.playing; },
    render: () => { const g = draw(); controls.update(); updateLabels(g); readout(g); renderer.render(scene, camera); return g; },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：警報響了以後，還有幾秒？（不需要 WebGL） ----------------
function initWarn() {
  const el = document.querySelector('[data-earth-warn]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const km = $('.ew-wn-km'), out = $('.ew-wn-km-out'), n = $('.ew-wn-n'), en = $('.ew-wn-en'), zh = $('.ew-wn-zh');
  const tl = { p: $('.ew-wn-p'), a: $('.ew-wn-a'), s: $('.ew-wn-s'), gap: $('.ew-wn-gap') };
  const f1 = (x) => (x >= 10 ? String(Math.round(x)) : x.toFixed(1).replace(/\.0$/, ''));
  function show() {
    const d = +km.value, w = warning(d), sp = tP(d), ss = tS(d), span = Math.max(ss, ALERT_S) * 1.12;
    out.textContent = `${d} km`;
    km.style.setProperty('--p', `${((d - 10) / 290) * 100}%`);
    n.textContent = f1(w);
    const pc = (x) => `${(x / span) * 100}%`;
    tl.p.style.left = pc(sp); tl.a.style.left = pc(ALERT_S); tl.s.style.left = pc(ss);
    tl.gap.style.left = pc(ALERT_S); tl.gap.style.width = w > 0 ? pc(ss - ALERT_S) : '0';
    tl.p.dataset.t = `${f1(sp)} s`; tl.a.dataset.t = `${ALERT_S} s`; tl.s.dataset.t = `${f1(ss)} s`;
    el.querySelectorAll('.ew-wn-pre button').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.km === d ? 'true' : 'false'));
    if (w <= 0) { en.textContent = `Too close. The strong shaking arrives before the alert can be sent. In this example that is true anywhere within about ${Math.round(blindKm())} km.`; zh.textContent = `太近了。警報還來不及發出，強烈的搖晃就先到了。在這個例子裡，大約 ${Math.round(blindKm())} 公里以內都是這樣。`; }
    else { en.textContent = `The alert arrives about ${f1(w)} seconds before the strong shaking. Enough time to drop, cover, and hold on.`; zh.textContent = `警報大約比強烈的搖晃早 ${f1(w)} 秒到。夠你趴下、掩護、穩住。`; }
    el.dataset.w = String(w);
  }
  km.addEventListener('input', show);
  el.querySelectorAll('.ew-wn-pre button').forEach((b) => b.addEventListener('click', () => { km.value = b.dataset.km; show(); }));
  show();
  el.__warn = { show, set: (d) => { km.value = String(d); show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWarn);
else initWarn();

lazyBoot('[data-earthquake-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
