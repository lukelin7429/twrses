/*
 * 萬物原理 · 第十三課「飛機為什麼飛得起來？」的 3D 風洞（自繪示意；氣流用 liftcalc.js 的茹科夫斯基翼型位勢流）。
 *
 * 一個機制：機翼帶著一點角度往前衝，把流過的空氣往下轉；空氣被往下推，就把機翼往上推，這股力叫升力。
 *   飛得越快升力越大（速度加倍，升力四倍）；角度越大升力越大，但超過約 15°（本模型的設定）上方氣流剝離，升力突然變小＝失速。
 *   機翼上方的空氣比下方快，而且比下方的空氣更早到達尾緣——「上下同時到達」的說法是錯的（NASA）。
 *
 * 場景：風從左往右吹（x），機翼在原點、弦長約 4、沿 z 方向伸展；空氣粒子依速度上色（快＝橘、慢＝藍）。
 *   「放一排煙」：一排黃色粒子同時從上游出發，看上面那一段先跑到機翼後面。
 *   力的箭頭：升力（綠，長度跟著算）、重力（紅，固定）、推力、阻力（示意）。
 *
 * 產物：cd tools/science && npm run build → assets/js/airplane-wing.js
 */
import {
  AdditiveBlending, AmbientLight, ArrowHelper, BufferGeometry, Color, DirectionalLight, ExtrudeGeometry,
  Float32BufferAttribute, Group, HemisphereLight, Line, LineBasicMaterial, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera,
  Points, PointsMaterial, Scene, Shape, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { airfoil, velocity, inside, toWing, toWorld, liftRel, cl, STALL_DEG } from './liftcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const SPAN = 5, X_IN = -7.5, X_OUT = 8.5, Y_RANGE = 3.4, N = 1500, NSMOKE = 56;
const REF_SPEED = 250, REF_ALPHA = 8;          // 模型飛機：抬頭 8°、時速 250 公里時升力剛好等於重量
const WEIGHT = liftRel(REF_ALPHA, REF_SPEED);
const VIS = 2.4 / REF_SPEED;                    // 時速 250 公里 → 畫面上每秒 2.4 單位

const MSG = {
  ground: ['Not fast enough yet. The wing is turning some air downward, but the lift is still smaller than the weight, so the plane stays on the runway.',
    '速度還不夠。機翼已經把一些空氣往下轉，但升力還比重量小，飛機還留在跑道上。'],
  fly: ['Lift is bigger than the weight, so the plane rises. The wing pushes a huge amount of air downward every second, and the air pushes the wing up.',
    '升力比重量大，飛機就升起來了。機翼每秒把大量空氣往下推，空氣就把機翼往上推。'],
  calm: ['No wind over the wing, no lift. A plane has to move fast through the air before its wings can hold it up.',
    '沒有風吹過機翼，就沒有升力。飛機必須在空氣中跑得很快，機翼才撐得起它。'],
  stall: ['Stall! The angle is too steep, so the air can no longer follow the top of the wing. It breaks away into swirls, and the lift suddenly drops.',
    '失速！角度太陡，空氣沒辦法再沿著機翼上表面流，散成一團亂流，升力突然掉下來。'],
  smoke: ['Watch the yellow line of air: the part that goes over the top reaches the back of the wing first. The air above and below do not meet up again at the same time.',
    '看那一排黃色的空氣：從上面繞過去的那一段，先到機翼後面。上下兩邊的空氣，並不會同時在後面會合。'],
  negative: ['With the nose pointed down, the wing turns less air downward, so there is little or no lift.',
    '機頭朝下時，機翼往下轉的空氣變少，升力很小，甚至沒有。'],
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
  scene.background = new Color(0x0e1a33);
  const camera = new PerspectiveCamera(36, 1, 0.1, 200);
  const TARGET = V(0.6, -0.1, 0);
  const homePos = () => TARGET.clone().add(V(-3.5, 3.4, 15).multiplyScalar(camera.aspect < 0.9 ? 1.6 : camera.aspect < 1.2 ? 1.22 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 60;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6efff, 0x223044, 0.95));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const sun = new DirectionalLight(0xffffff, 1.3); sun.position.set(-4, 9, 8); scene.add(sun);

  // ---------------- 機翼 ----------------
  const shape = new Shape();
  airfoil(160).forEach(([x, y], k) => (k ? shape.lineTo(x, y) : shape.moveTo(x, y)));
  const wingGeo = new ExtrudeGeometry(shape, { depth: SPAN, bevelEnabled: false, curveSegments: 4 });
  wingGeo.translate(0, 0, -SPAN / 2);
  const wing = new Mesh(wingGeo, new MeshStandardMaterial({ color: 0xd8dee8, metalness: 0.45, roughness: 0.35 }));
  const wingG = new Group(); wingG.add(wing); scene.add(wingG);

  // ---------------- 空氣粒子 ----------------
  const pos = new Float32Array((N + NSMOKE) * 3), col = new Float32Array((N + NSMOKE) * 3);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new Float32BufferAttribute(col, 3));
  const P = geo.attributes.position.array, C = geo.attributes.color.array;
  const pts = new Points(geo, new PointsMaterial({ size: 0.13, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending }));
  pts.frustumCulled = false; scene.add(pts);
  const parts = [];
  const spawn = (pt, x = X_IN) => { pt.x = x; pt.y = (Math.random() * 2 - 1) * Y_RANGE; pt.z = (Math.random() * 2 - 1) * (SPAN / 2 + 0.6); };
  for (let i = 0; i < N; i++) { const pt = {}; spawn(pt, X_IN + Math.random() * (X_OUT - X_IN)); parts.push(pt); }
  const smoke = Array.from({ length: NSMOKE }, () => ({ x: 0, y: 0, z: 0, on: false }));
  const SLOW = new Color(0x1f4fff), MID = new Color(0x3a5a8c), FAST = new Color(0xff7a1a), SMOKE = new Color(0xffe066), tc = new Color();

  // ---------------- 流線（從上游沿著算出來的氣流描出來；迎角一變就重畫） ----------------
  const STREAM_Y = [-2.6, -1.9, -1.3, -0.75, -0.3, 0.15, 0.6, 1.1, 1.7, 2.4];
  const streams = STREAM_Y.map(() => {
    const l = new Line(new BufferGeometry().setFromPoints(Array.from({ length: 400 }, () => V(0, 0, 0))), new LineBasicMaterial({ color: 0x9fd4ff, transparent: true, opacity: 0.75 }));
    l.frustumCulled = false; scene.add(l); return l;
  });
  let streamAlpha = null;
  function traceStreams() {
    STREAM_Y.forEach((y0, k) => {
      const ptsL = [];
      let p = [X_IN, y0];
      for (let n = 0; n < 400; n++) {
        ptsL.push(V(p[0], p[1], SPAN / 2 + 0.03));
        if (p[0] > X_OUT) continue;
        const w = toWing(p, state.alpha), v1 = toWorld(velocity(w, state.alpha), state.alpha);
        const mid = [p[0] + v1[0] * 0.025, p[1] + v1[1] * 0.025];
        const v2 = toWorld(velocity(toWing(mid, state.alpha), state.alpha), state.alpha);
        const sp = Math.hypot(v2[0], v2[1]) || 1;
        p = [p[0] + (v2[0] / sp) * 0.05, p[1] + (v2[1] / sp) * 0.05];   // 等距描點
      }
      streams[k].geometry.setFromPoints(ptsL);
      // 失速時，機翼上方的流線畫成紅色、變淡（真正的氣流已經剝離）
      const above = y0 > 0 && y0 < 1.9;
      streams[k].material.color.setHex(stalled() && above ? 0xff6b5e : 0x9fd4ff);
      streams[k].material.opacity = stalled() && above ? 0.35 : 0.75;
    });
    streamAlpha = state.alpha;
  }

  // ---------------- 力的箭頭 ----------------
  const arrows = {
    lift: new ArrowHelper(V(0, 1, 0), V(0.2, 0.4, 0), 2, 0x3ad17a, 0.45, 0.3),
    weight: new ArrowHelper(V(0, -1, 0), V(0.2, -0.3, 0), 2.2, 0xff5a4a, 0.45, 0.3),
    thrust: new ArrowHelper(V(-1, 0, 0), V(-2.3, 0.1, 0), 1.3, 0x58b4ff, 0.35, 0.25),
    drag: new ArrowHelper(V(1, 0, 0), V(2.3, 0.1, 0), 1.0, 0xb0b8c8, 0.3, 0.22),
  };
  // 推力朝前（−x，飛機往左飛、風往右吹），阻力朝後（+x）
  arrows.thrust.setDirection(V(-1, 0, 0)); arrows.drag.setDirection(V(1, 0, 0));
  const forces = new Group(); Object.values(arrows).forEach((a) => forces.add(a)); scene.add(forces);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    wind: lab.add('bt-lb bt-lb-e', 'Wind over the wing<small>吹過機翼的風</small>'),
    wing: lab.add('bt-lb bt-lb-b', 'Wing (cross-section)<small>機翼（剖面）</small>'),
    fast: lab.add('bt-lb aw-lb-fast', 'Faster air on top<small>上方的空氣比較快</small>'),
    down: lab.add('bt-lb ip-region', 'Air turned downward<small>空氣被往下轉</small>'),
    lift: lab.add('bt-lb aw-lb-lift', 'Lift<small>升力</small>'),
    weight: lab.add('bt-lb aw-lb-weight', 'Weight<small>重力</small>'),
    thrust: lab.add('bt-lb aw-lb-thrust', 'Thrust<small>推力</small>'),
    drag: lab.add('bt-lb ip-region', 'Drag<small>阻力</small>'),
    stall: lab.add('bt-lb ip-lb-lost', 'Stall: air breaks away<small>失速：氣流剝離</small>'),
    smoke: lab.add('bt-lb aw-lb-smoke', 'Top air gets here first<small>上面的空氣先到</small>'),
  };

  const R = {
    a: $('.aw-a'), aOut: $('.aw-a-out'), v: $('.aw-v'), vOut: $('.aw-v-out'), status: $('.aw-status'), bar: $('.aw-bar'),
    ratio: $('.aw-ratio'), clv: $('.aw-cl'), msg: $('.aw-msg'), play: $('.al-play'), smokeBtn: $('.aw-smoke'),
  };
  const state = { alpha: 8, speed: 250, labels: true, forces: true, streams: true, playing: true, smokeT: -1, lastMsg: '', plane: 0 };

  const stalled = () => state.alpha > STALL_DEG;
  function flow(x, y) {
    const w = toWing([x, y], state.alpha);
    let v = toWorld(velocity(w, state.alpha), state.alpha);
    if (stalled() && w[0] > -1.2 && w[0] < 5 && w[1] > 0.05 && w[1] < 2.4 + 0.3 * w[0]) {
      v = [v[0] * 0.35 + (Math.random() - 0.5) * 1.3, v[1] * 0.35 + (Math.random() - 0.5) * 1.3];   // 失速：上方亂流
    }
    return v;
  }
  function releaseSmoke() {
    smoke.forEach((s, k) => { s.x = -6; s.y = -1.6 + (k / (NSMOKE - 1)) * 3.2; s.z = SPAN / 2 + 0.25; s.on = true; });
    state.smokeT = 0;
  }

  function step(dt) {
    wingG.rotation.z = -state.alpha * Math.PI / 180;
    if (streamAlpha !== state.alpha) traceStreams();
    streams.forEach((l) => { l.visible = state.streams; });
    const U = state.speed * VIS;
    const h = state.playing ? dt : 0;
    for (let i = 0; i < N; i++) {
      const pt = parts[i];
      const v = flow(pt.x, pt.y);
      if (h) {
        pt.x += v[0] * U * h; pt.y += v[1] * U * h;
        if (pt.x > X_OUT || Math.abs(pt.y) > Y_RANGE + 1.5 || inside(toWing([pt.x, pt.y], state.alpha))) spawn(pt);
      }
      P[i * 3] = pt.x; P[i * 3 + 1] = pt.y; P[i * 3 + 2] = pt.z;
      const r = Math.hypot(v[0], v[1]);
      tc.copy(MID).lerp(r > 1 ? FAST : SLOW, MathUtils.clamp(Math.abs(r - 1) * 3.5, 0, 1));
      if (U === 0) tc.multiplyScalar(0.45);
      C[i * 3] = tc.r; C[i * 3 + 1] = tc.g; C[i * 3 + 2] = tc.b;
    }
    if (state.smokeT >= 0 && h) state.smokeT += h;
    smoke.forEach((s, k) => {
      const j = (N + k) * 3;
      if (!s.on) { P[j] = P[j + 1] = P[j + 2] = 999; return; }
      if (h) {
        const v = flow(s.x, s.y);
        s.x += v[0] * U * h; s.y += v[1] * U * h;
        if (s.x > X_OUT + 2 || inside(toWing([s.x, s.y], state.alpha))) s.on = false;
      }
      P[j] = s.x; P[j + 1] = s.y; P[j + 2] = s.z;
      C[j] = SMOKE.r * 1.4; C[j + 1] = SMOKE.g * 1.4; C[j + 2] = SMOKE.b * 1.4;
    });
    if (state.smokeT > 9) state.smokeT = -1;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;

    const ratio = liftRel(state.alpha, state.speed) / WEIGHT;
    forces.visible = state.forces;
    arrows.lift.setLength(Math.max(0.05, 2.2 * Math.max(0, ratio)), 0.45, 0.3);
    arrows.lift.visible = ratio > 0.01;
    arrows.drag.setLength(Math.max(0.05, 1.0 * (state.speed / REF_SPEED) ** 2 * (stalled() ? 2 : 1)), 0.3, 0.22);
    arrows.thrust.setLength(state.speed > 0 ? 1.3 : 0.05, 0.35, 0.25);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return { ratio };
  }

  let narrow = false;
  function updateLabels(info) {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const W = (x, y) => { const p = toWorld([x, y], state.alpha); return V(p[0], p[1], SPAN / 2); };
    show(L.wind, on && !narrow, V(-6.3, 3.2, 0));
    show(L.wing, on, W(-2.4, -0.75), 22);
    show(L.fast, on && !narrow && !stalled() && state.speed > 0, W(-0.2, 1.25), -6);
    show(L.down, on && !narrow && !stalled() && state.alpha > 2 && state.speed > 0, W(4.6, -1.5), 0);
    show(L.lift, on && state.forces && info.ratio > 0.01, V(0.2, 0.4 + 2.2 * Math.max(0, info.ratio) + 0.3, 0), -8);
    show(L.weight, on && state.forces, V(0.2, -2.6, 0), 16);
    show(L.thrust, on && state.forces && !narrow && state.speed > 0, V(-3.7, 0.1, 0), -14);
    show(L.drag, on && state.forces && !narrow, V(3.4, 0.1, 0), -14);
    show(L.stall, stalled() && state.speed > 0, W(2.4, 2.0), 0);
    const front = smoke.filter((s) => s.on);
    if (front.length && state.smokeT > 1.5) {
      const lead = front.reduce((a, s) => (s.x > a.x ? s : a));
      show(L.smoke, on, V(lead.x, lead.y, lead.z), -18);
    } else L.smoke.hidden = true;
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout(info) {
    R.aOut.textContent = `${state.alpha.toFixed(0)}°`;
    R.a.style.setProperty('--p', `${(state.alpha + 4) / 26 * 100}%`);
    R.vOut.textContent = `${Math.round(state.speed)} km/h`;
    R.v.style.setProperty('--p', `${state.speed / 320 * 100}%`);
    const r = info.ratio;
    const st = state.speed === 0 ? ['No wind, no lift', '沒有風，沒有升力', 'bad'] : stalled() ? ['Stall!', '失速！', 'bad'] : r >= 1 ? ['Lifting off!', '起飛了！', 'ok'] : ['Still on the runway', '還在跑道上', ''];
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`;
    R.status.className = `aw-status ${st[2]}`;
    R.bar.style.setProperty('--w', `${MathUtils.clamp(r / 2, 0, 1) * 100}%`);
    R.bar.classList.toggle('ok', r >= 1);
    R.ratio.textContent = `${Math.max(0, r).toFixed(2)}×`;
    R.clv.textContent = cl(state.alpha).toFixed(2);
    let key = state.speed === 0 ? 'calm' : stalled() ? 'stall' : state.smokeT >= 0 ? 'smoke' : state.alpha < 0 ? 'negative' : r >= 1 ? 'fly' : 'ground';
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setAlpha(a) { state.alpha = MathUtils.clamp(+a, -4, 22); R.a.value = String(state.alpha); }
  function setSpeed(v) { state.speed = MathUtils.clamp(+v, 0, 320); R.v.value = String(state.speed); }
  R.a.addEventListener('input', () => setAlpha(R.a.value));
  R.v.addEventListener('input', () => setSpeed(R.v.value));
  R.smokeBtn.addEventListener('click', releaseSmoke);
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="forces"]', (v) => { state.forces = v; });
  bind('[data-t="streams"]', (v) => { state.streams = v; });
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const info = step(dt);
    controls.update();
    updateLabels(info);
    if (t - lastR > 120) { lastR = t; readout(info); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 46 : 36;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setAlpha(8); setSpeed(250);
  readout(step(0.01));
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    slow: () => { setAlpha(8); setSpeed(125); },
    takeoff: () => { setAlpha(8); setSpeed(260); },
    stall: () => { setAlpha(20); setSpeed(200); },
    smoke: () => { setAlpha(6); setSpeed(250); releaseSmoke(); },
  };
  // 除錯：document.querySelector('[data-airwing-lab]').__lab
  root.__lab = {
    camera, controls, state, setAlpha, setSpeed, releaseSmoke, smoke,
    run: (sec) => { for (let t = 0; t < sec; t += 0.025) step(0.025); },
    render: () => { const i = step(0); controls.update(); updateLabels(i); readout(i); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-airwing-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
