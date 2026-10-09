/*
 * 地球與天氣 · 第九課「閃電和打雷是怎麼回事？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：雷雨雲裡的氣流讓電分開（正電在雲頂、負電在雲底，地面被吸引出正電），
 *   電壓大到衝破空氣，就放電——這是閃電；閃電把空氣瞬間加熱、膨脹、爆開——這是雷。
 *   光幾乎立刻到，聲音每秒只走約 340 公尺，所以先看到閃電、後聽到雷聲。
 *
 * 場景：一朵雷雨雲、一棵樹、一間可以移動的房子（你）。循環：充電 → 閃電 → 聲音的圈往外擴 → 傳到房子。
 * 聲音的圈照真實的時間走（1 公里大約 3 秒）。數字在 lightcalc.js。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-lightning.js
 * 除錯：document.querySelector('[data-earthlightning-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Group, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Quaternion, RingGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { thunderDelay, chargeStep, boltPath, D_MIN, D_MAX, SOUND } from './lightcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.85, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const SX = -5.2, U = 2.1;                       // 閃電落點的 x；1 公里＝幾個模型單位
const BASE = 3.2, TOP = 7.2, TREE = 1.5;        // 雲底、雲頂、樹頂的高度
const N_CLOUD = 420, N_Q = 16, N_SEG = 14;

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
  const SKY = new Color(0x1a2338), SKY_FLASH = new Color(0xcfd8ff), sky = new Color(0x1a2338);
  scene.background = sky;
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0.2, 3.1, 0);
  const homePos = () => TARGET.clone().add(V(0, 1.4, 25).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.1 ? 1.22 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 8; controls.maxDistance = 70;
  controls.minPolarAngle = 0.6; controls.maxPolarAngle = Math.PI * 0.5;
  controls.minAzimuthAngle = -0.7; controls.maxAzimuthAngle = 0.7;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xcfd8ee, 0x1c2a22, 0.75); scene.add(hemi);
  const amb = new AmbientLight(0xffffff, 0.25); scene.add(amb);
  const dl = new DirectionalLight(0xffffff, 0.6); dl.position.set(4, 9, 8); scene.add(dl);

  const ground = new Mesh(new PlaneGeometry(120, 80), std(0x2f5a3a)); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  // 一棵孤立的高樹（閃電打在它上面）
  scene.add(at(new Mesh(new CylinderGeometry(0.07, 0.1, 0.7, 8), std(0x6b4a2a)), SX, 0.35, 0));
  scene.add(at(new Mesh(new ConeGeometry(0.42, 1.0, 10), std(0x2f7d3f)), SX, 1.05, 0));
  // 房子（你）：窗戶在光到的時候亮一下
  const house = new Group(); scene.add(house);
  house.add(at(new Mesh(new BoxGeometry(0.9, 0.6, 0.8), std(0xd9c7a8)), 0, 0.3, 0));
  const roof = new Mesh(new ConeGeometry(0.75, 0.42, 4), std(0xa5523a)); roof.rotation.y = Math.PI / 4; house.add(at(roof, 0, 0.81, 0));
  const winMat = new MeshBasicMaterial({ color: 0x33415f });
  house.add(at(new Mesh(new BoxGeometry(0.26, 0.24, 0.02), winMat), 0, 0.33, 0.41));
  // 雷雨雲：底部平、往上長高，頂端往旁邊攤開（砧狀）
  const cloud = new InstancedMesh(new SphereGeometry(0.42, 10, 8), std(0xffffff, { roughness: 1 }), N_CLOUD); cloud.frustumCulled = false; scene.add(cloud);
  const m4 = new Matrix4(), col = new Color(), q = new Quaternion(), ZAX = V(0, 0, 1), pos = V(0, 0, 0), scl = V(1, 1, 1);
  for (let i = 0; i < N_CLOUD; i++) {
    const h = hash(i, 1), y = BASE + h * (TOP - BASE), anvil = Math.max(0, (h - 0.78) / 0.22);
    const w = 1.9 - 0.7 * Math.min(1, h / 0.78) + anvil * 2.4, a = hash(i, 2) * Math.PI * 2, r = Math.sqrt(hash(i, 3)) * w;
    const s = 0.7 + hash(i, 4) * 0.7;
    m4.makeScale(s, s * 0.8, s).setPosition(SX + r * Math.cos(a) + anvil * 0.8, y, r * Math.sin(a) * 0.55); cloud.setMatrixAt(i, m4);
    const g = 0.3 + 0.62 * h; col.setRGB(g, g, g + 0.03); cloud.setColorAt(i, col);
  }
  // 電荷的小點：雲頂正電（紅）、雲底負電（藍）、地面正電（紅）
  const qGeo = new SphereGeometry(0.1, 10, 8);
  const mkQ = (color) => { const m = new InstancedMesh(qGeo, new MeshBasicMaterial({ color }), N_Q); m.frustumCulled = false; scene.add(m); return m; };
  const qTop = mkQ(0xff6b5e), qBot = mkQ(0x58b4ff), qGnd = mkQ(0xff6b5e);
  // 閃電：一段一段的細長方塊
  const boltMat = new MeshBasicMaterial({ color: 0xfff7c2, transparent: true });
  const bolt = new InstancedMesh(new BoxGeometry(1, 1, 1), boltMat, N_SEG); bolt.frustumCulled = false; scene.add(bolt);
  // 聲音的圈
  const ringMat = new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.9, side: 2 });
  const ring = new Mesh(new RingGeometry(0.96, 1, 96), ringMat); ring.rotation.x = -Math.PI / 2; ring.position.set(SX, 0.04, 0); scene.add(ring);

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    pos: lab.add('cp-lb ew-lt-lb-p', 'Positive charge ＋<small>正電</small>'), neg: lab.add('cp-lb ew-lt-lb-n', 'Negative charge −<small>負電</small>'),
    gnd: lab.add('cp-lb ew-lt-lb-p', 'Positive charge on the ground ＋<small>地面的正電</small>'), you: lab.add('cp-lb ew-lb-push', ''),
    snd: lab.add('cp-lb', 'Sound: about 340 m a second<small>聲音：每秒約 340 公尺</small>'),
  };

  const R = {
    kinds: [...root.querySelectorAll('.ew-lt-kind button')], d: $('.ew-lt-d'), dOut: $('.ew-lt-d-out'), strike: $('.ew-lt-strike'),
    bar: $('.ew-lt-bar'), status: $('.ew-lt-status'), light: $('.ew-lt-light'), delay: $('.ew-lt-delay'), timer: $('.ew-lt-timer'), msgs: [...root.querySelectorAll('.ew-lt-msg')], play: $('.al-play'),
  };
  // phase: 'charge'（充電）→ 'flash'（閃電）→ 'travel'（聲音在路上）→ 'heard'（聽到了）
  const state = { kind: 'ground', d: 2, charge: 0.25, phase: 'charge', t: 0, n: 1, labels: true, playing: true, pts: [] };
  const houseX = () => SX + state.d * U;

  function makeBolt() {
    const a = state.kind === 'ground' ? [SX + 0.2, BASE + 0.2] : [SX + 0.9, TOP - 0.9], b = state.kind === 'ground' ? [SX, TREE] : [SX - 0.5, BASE + 0.5];
    state.pts = boltPath(a, b, N_SEG, state.n, state.kind === 'ground' ? 0.3 : 0.42);
  }
  function strike() { state.phase = 'flash'; state.t = 0; state.n += 1; state.charge = 1; makeBolt(); }

  function draw() {
    const c = state.charge, t = state.t, ph = state.phase, zf = 0.95;
    // 電荷：充得越滿，出現越多
    const shown = ph === 'charge' ? Math.round(c * N_Q) : ph === 'flash' ? N_Q : 0;
    for (let i = 0; i < N_Q; i++) {
      const s = i < shown ? 1 : 0, jx = (hash(i, 31) - 0.5), jz = zf + hash(i, 32) * 0.15;
      m4.makeScale(s, s, s).setPosition(SX + 0.8 + jx * 4.2, TOP - 0.5 + hash(i, 33) * 0.5, jz); qTop.setMatrixAt(i, m4);
      m4.makeScale(s, s, s).setPosition(SX + jx * 3.0, BASE + 0.1 + hash(i, 34) * 0.45, jz); qBot.setMatrixAt(i, m4);
      m4.makeScale(s, s, s).setPosition(SX + jx * 3.2, 0.12, 0.5 + hash(i, 35) * 0.9); qGnd.setMatrixAt(i, m4);
    }
    qTop.instanceMatrix.needsUpdate = true; qBot.instanceMatrix.needsUpdate = true; qGnd.instanceMatrix.needsUpdate = true;
    // 閃電：先一小段一小段往下探（前導），到底的瞬間整條亮起來（迴擊），然後淡掉
    const LEAD = 0.45, GLOW = 0.5;
    const on = ph === 'flash' || (ph !== 'charge' && t < LEAD + GLOW);
    const reach = Math.min(1, t / LEAD), bright = t < LEAD ? 0.35 : Math.max(0, 1 - (t - LEAD) / GLOW);
    boltMat.opacity = on ? Math.max(0.15, bright) : 0;
    for (let i = 0; i < N_SEG; i++) {
      const a = state.pts[i], b = state.pts[i + 1];
      if (!on || !a || i / N_SEG >= reach) { m4.makeScale(0, 0, 0); bolt.setMatrixAt(i, m4); continue; }
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), th = t < LEAD ? 0.035 : 0.09;
      pos.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, zf + 0.1); q.setFromAxisAngle(ZAX, Math.atan2(dy, dx)); scl.set(len + th, th, th);
      m4.compose(pos, q, scl); bolt.setMatrixAt(i, m4);
    }
    bolt.instanceMatrix.needsUpdate = true;
    const flash = on && t >= LEAD ? bright : 0;
    sky.copy(SKY).lerp(SKY_FLASH, flash * 0.5); amb.intensity = 0.25 + flash * 1.6;
    winMat.color.set(flash > 0.05 ? 0xfff2a8 : 0x33415f);
    // 聲音的圈：從迴擊的瞬間開始，照真實速度往外擴
    const ts = t - LEAD, rad = Math.max(0, ts) * (SOUND / 1000) * U;
    ring.visible = ph !== 'charge' && ts > 0 && rad < (D_MAX + 1.2) * U;
    if (ring.visible) { ring.scale.setScalar(rad); ringMat.opacity = ph === 'heard' ? Math.max(0, 0.9 - (ts - thunderDelay(state.d)) * 0.6) : 0.9; }
    house.position.x = houseX();
    return { ts, rad };
  }

  let narrow = false;
  function updateLabels(d) {
    const on = state.labels, ch = state.phase === 'charge' || state.phase === 'flash';
    const show = (el, s, p, dy = 0) => { el.hidden = !s; if (s) lab.place(el, p, dy); };
    show(L.pos, on && ch && state.charge > 0.2, V(SX + 2.6, TOP - 0.2, 0.9), 0); L.pos.style.marginLeft = narrow ? '0' : '70px';
    show(L.neg, on && ch && state.charge > 0.2, V(SX + 1.7, BASE + 0.3, 0.9), 0); L.neg.style.marginLeft = narrow ? '0' : '70px';
    show(L.gnd, on && ch && state.charge > 0.2 && state.kind === 'ground' && !narrow, V(SX, 0.1, 1.4), 20);
    const heard = state.phase === 'heard', tr = state.phase === 'travel';
    L.you.innerHTML = heard ? 'Thunder!<small>轟！雷聲到了</small>' : tr ? `${Math.max(0, d.ts).toFixed(1)} s<small>閃電過後的秒數</small>` : 'You are here<small>你在這裡</small>';
    show(L.you, true, V(houseX(), 1.1, 0), -18);
    show(L.snd, on && tr && d.rad > 1.2 && !narrow, V(SX + d.rad * 0.72, 0.04, d.rad * 0.5), 0);
  }

  function readout(d) {
    const ph = state.phase, delay = thunderDelay(state.d);
    R.kinds.forEach((b) => b.setAttribute('aria-pressed', b.dataset.kind === state.kind ? 'true' : 'false'));
    R.d.value = String(state.d); R.d.style.setProperty('--p', `${((state.d - D_MIN) / (D_MAX - D_MIN)) * 100}%`);
    R.dOut.textContent = `${state.d} km`;
    R.bar.style.width = `${(ph === 'charge' ? state.charge : ph === 'flash' ? 1 : 0) * 100}%`;
    R.status.innerHTML = ph === 'charge' ? 'Charge is building<small>電正在累積</small>' : ph === 'flash' ? 'Lightning!<small>放電了！</small>' : 'The cloud has let go<small>雲把電放掉了</small>';
    R.light.innerHTML = 'At once<small>立刻就到</small>';
    R.delay.innerHTML = `${delay.toFixed(1)} s<small>大約 ${Math.round(delay)} 秒後</small>`;
    R.timer.innerHTML = ph === 'charge' ? '—<small>等閃電</small>' : `${Math.min(delay, Math.max(0, d.ts)).toFixed(1)} s<small>${ph === 'heard' ? '雷聲到了' : '數秒中'}</small>`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== ph; });
  }

  function advance(dt) {
    state.t += dt;
    if (state.phase === 'charge') { state.charge = chargeStep(state.charge, dt); if (state.charge >= 1) strike(); }
    else if (state.phase === 'flash') { if (state.t > 0.45) state.phase = 'travel'; }
    else if (state.phase === 'travel') { if (state.t - 0.45 >= thunderDelay(state.d)) state.phase = 'heard'; }
    else if (state.t - 0.45 >= thunderDelay(state.d) + 2.2) { state.phase = 'charge'; state.charge = 0; state.t = 0; }
  }
  function set(o) {
    if (o.kind === 'ground' || o.kind === 'cloud') state.kind = o.kind;
    if (o.d != null) state.d = Math.min(D_MAX, Math.max(D_MIN, o.d));
    if (o.charge != null) { state.phase = 'charge'; state.charge = o.charge; state.t = 0; }
    readout(draw());
  }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.kinds.forEach((b) => b.addEventListener('click', () => set({ kind: b.dataset.kind })));
  R.d.addEventListener('input', () => set({ d: +R.d.value }));
  R.strike.addEventListener('click', () => { strike(); setPlaying(true); });
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
    if (state.playing) advance(dt);
    const d = draw();
    controls.update();
    updateLabels(d);
    if (t - lastR > 100) { lastR = t; readout(d); }
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

  makeBolt(); readout(draw());
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o) => { set(o); strike(); setPlaying(true); };
  const DEMO = { near: () => go({ kind: 'ground', d: 1 }), mid: () => go({ kind: 'ground', d: 3 }), far: () => go({ kind: 'ground', d: 5 }), cloud: () => go({ kind: 'cloud', d: 2 }) };
  root.__lab = {
    camera, controls, state, set, setPlaying, strike, advance,
    render: () => { const d = draw(); controls.update(); updateLabels(d); readout(d); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：這道閃電離我多遠？（不需要 WebGL） ----------------
function initCount() {
  const el = document.querySelector('[data-earth-count]');
  if (!el) return;
  const qs = (s) => el.querySelector(s), sec = qs('.ew-th-s'), go = qs('.ew-th-go'), box = qs('.ew-th-sky');
  let timer = 0, raf = 0;
  function show() {
    const s = +sec.value, m = SOUND * s;
    sec.style.setProperty('--p', `${(s / 30) * 100}%`);
    qs('.ew-th-s-out').textContent = `${s} s`;
    qs('.ew-th-m').textContent = m.toLocaleString('en-US');
    qs('.ew-th-km').textContent = (m / 1000).toFixed(1);
    el.dataset.m = String(m);
  }
  // 練習：畫面閃一下，隔幾秒才「轟」，自己數數看
  function test() {
    clearTimeout(timer); cancelAnimationFrame(raf);
    const s = 2 + Math.floor(Math.random() * 9), t0 = performance.now();
    box.dataset.state = 'flash'; qs('.ew-th-say').textContent = 'Flash! Start counting… · 閃電！開始數…'; qs('.ew-th-ans').hidden = true;
    setTimeout(() => { if (box.dataset.state === 'flash') box.dataset.state = 'wait'; }, 350);
    timer = setTimeout(() => {
      box.dataset.state = 'boom'; qs('.ew-th-say').textContent = 'BOOM! · 轟！';
      const a = qs('.ew-th-ans'); a.hidden = false;
      a.textContent = `It took ${s} seconds, so the lightning was about ${(SOUND * s).toLocaleString('en-US')} meters away. · 隔了 ${s} 秒，所以閃電大約在 ${(SOUND * s).toLocaleString('en-US')} 公尺外。`;
      el.dataset.test = String(s);
    }, s * 1000);
    el.dataset.t0 = String(t0);
  }
  sec.addEventListener('input', show);
  go.addEventListener('click', test);
  show();
  el.__th = { show, test };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCount);
else initCount();

lazyBoot('[data-earthlightning-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
