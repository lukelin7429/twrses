/*
 * 萬物原理 · 第十一課「聲音怎麼傳到耳朵？」的 3D 聲波（自繪示意；大幅放慢、分子畫得很大很稀）。
 *
 * 一個機制：聲音是振動。鼓面來回推擠旁邊的空氣分子，分子再推下一批，形成一疏一密的壓力波往外傳；
 *   每顆分子只在原地前後晃（黃色那顆），不會從鼓跑到耳朵。波傳到耳朵推動鼓膜，聽小骨把振動傳進耳蝸。
 *   沒有空氣（像太空）就沒有東西可以推，聲音傳不過去。
 *
 * 場景：鼓在左（x = −9），中間一塊空氣（64 × 7 × 7 顆分子，InstancedMesh），右邊是耳道與鼓膜（x ≈ 8.6）。
 *   位移 s = A·sin(2π(x − x₀)/λ − 2πft)，波前以示意的速度前進（soundcalc.js）。顏色：擠在一起偏橘、散開偏深藍。
 *   畫面上的波長與速度是示意的；右側讀數用真實的 343 m/s 算。
 *
 * 產物：cd tools/science && npm run build → assets/js/sound-waves.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, Group,
  HemisphereLight, InstancedMesh, Line, LineBasicMaterial, MathUtils, Matrix4, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { V20, wavelength, thunderKm, displacement, squeeze } from './soundcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const SRC = -8.6, X0 = -8.2, NX = 64, NY = 9, NZ = 7, DX = 0.25, DY = 0.42, EAR_X = 8.6;
const SPEED_VIS = 2.6;
const lambdaVis = (f) => 6 * (100 / f) ** 0.75;     // 畫面上的波長（示意）：音調越高越密
const ampVis = (a) => 0.04 + 0.26 * a;

const MSG = {
  start: ['The drumhead moves back and forth, pushing the air molecules next to it. They push the next ones, and a wave of squeezed and spread-out air travels toward the ear.',
    '鼓面前後振動，推擠旁邊的空氣分子；分子再推下一批，一波「擠在一起、散開」的空氣就往耳朵傳過去。'],
  arrived: ['The wave has reached your ear. It pushes the eardrum back and forth, three tiny bones pass the shaking on, and the cochlea turns it into signals for your brain.',
    '聲波到了耳朵，推著鼓膜前後振動；三塊聽小骨把振動傳下去，耳蝸再把它變成送往大腦的訊號。'],
  low: ['A low sound: the drum vibrates slowly, so the squeezed bands are far apart. The wavelength is long.',
    '低沉的聲音：鼓振動得慢，擠在一起的空氣帶隔得遠，波長很長。'],
  high: ['A high sound: the drum vibrates fast, so the squeezed bands are close together. The wavelength is short.',
    '高音：鼓振動得快，擠在一起的空氣帶靠得很近，波長很短。'],
  loud: ['A louder sound pushes the molecules farther back and forth, but the wave still travels at the same speed.',
    '比較大聲時，分子被推得晃得更遠，但聲波前進的速度還是一樣。'],
  noair: ['No air, no sound. The drum still vibrates, but there is nothing to push, so the sound cannot travel. That is why space is silent.',
    '沒有空氣，就沒有聲音。鼓還在振動，但沒有東西可以推，聲音傳不出去。所以太空是安靜的。'],
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
  scene.background = new Color(0x0d1730);
  const camera = new PerspectiveCamera(36, 1, 0.1, 200);
  const TARGET = V(1, -0.3, 0);
  const homePos = () => TARGET.clone().add(V(-2, 4.2, 22.5).multiplyScalar(camera.aspect < 0.9 ? 2.1 : camera.aspect < 1.2 ? 1.45 : 1.22));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 60;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6efff, 0x223044, 0.9));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const sun = new DirectionalLight(0xffffff, 1.2); sun.position.set(-5, 10, 8); scene.add(sun);

  // ---------------- 鼓 ----------------
  const drum = new Group(); scene.add(drum);
  const shell = new Mesh(new CylinderGeometry(2.1, 2.1, 1.6, 40, 1, true), new MeshStandardMaterial({ color: 0xc0392b, roughness: 0.5, side: DoubleSide }));
  shell.rotation.z = Math.PI / 2; at(shell, SRC - 0.8, 0, 0); drum.add(shell);
  for (const dx of [-1.6, 0]) {
    const rim = new Mesh(new TorusGeometry(2.12, 0.08, 10, 48), new MeshStandardMaterial({ color: 0xd8c27a, metalness: 0.6, roughness: 0.3 }));
    rim.rotation.y = Math.PI / 2; at(rim, SRC + dx, 0, 0); drum.add(rim);
  }
  const head = new Mesh(new CylinderGeometry(2.08, 2.08, 0.04, 40), new MeshStandardMaterial({ color: 0xf3ead8, roughness: 0.7 }));
  head.rotation.z = Math.PI / 2; scene.add(head);

  // ---------------- 空氣分子 ----------------
  const N = NX * NY * NZ;
  const molGeo = new SphereGeometry(0.075, 8, 6);
  const mols = new InstancedMesh(molGeo, new MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }), N);
  scene.add(mols);
  const base = [];
  for (let i = 0; i < NX; i++) for (let j = 0; j < NY; j++) for (let k = 0; k < NZ; k++) {
    base.push([X0 + i * DX + (Math.random() - 0.5) * 0.06, (j - (NY - 1) / 2) * DY + (Math.random() - 0.5) * 0.08, (k - (NZ - 1) / 2) * DY + (Math.random() - 0.5) * 0.08]);
  }
  const SPOT = (Math.floor(NX * 0.45) * NY + Math.floor(NY / 2)) * NZ + NZ - 1;   // 黃色那顆：中間偏左、靠鏡頭那一面
  const spot = new Mesh(new SphereGeometry(0.13, 16, 12), new MeshStandardMaterial({ color: 0xffd36e, emissive: 0x6a4a00 }));
  scene.add(spot);
  const range = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 0, 0)]), new LineBasicMaterial({ color: 0xffd36e }));
  range.frustumCulled = false; scene.add(range);
  const frontPlane = new Mesh(new PlaneGeometry(3.4, 3.4), new MeshBasicMaterial({ color: 0x9fd4ff, transparent: true, opacity: 0.12, side: DoubleSide, depthWrite: false }));
  frontPlane.rotation.y = Math.PI / 2; scene.add(frontPlane);

  // ---------------- 耳朵 ----------------
  const ear = new Group(); scene.add(ear);
  const skin = new MeshStandardMaterial({ color: 0xf1c7a6, roughness: 0.8, side: DoubleSide });
  const canal = new Mesh(new CylinderGeometry(0.9, 1.25, 1.4, 32, 1, true), skin);
  canal.rotation.z = Math.PI / 2; at(canal, EAR_X - 0.75, 0, 0); ear.add(canal);
  const drumMem = new Mesh(new CylinderGeometry(0.85, 0.85, 0.05, 32), new MeshStandardMaterial({ color: 0xffb7a0, roughness: 0.4 }));
  drumMem.rotation.z = Math.PI / 2; ear.add(drumMem);
  const boneMat = new MeshStandardMaterial({ color: 0xf5f1e6, roughness: 0.5 });
  const bones = [[0.35, 0.35, 0.18], [0.7, 0.25, 0.14], [1.05, 0.1, 0.12]].map(([dx, dy, r]) => { const m = at(new Mesh(new SphereGeometry(r, 12, 10), boneMat), EAR_X + dx, dy, 0); ear.add(m); return m; });
  const cochlea = new Mesh(new TorusGeometry(0.42, 0.14, 12, 32, Math.PI * 1.6), new MeshStandardMaterial({ color: 0xff9eb5, roughness: 0.6 }));
  at(cochlea, EAR_X + 1.75, -0.1, 0); cochlea.rotation.y = Math.PI / 2; ear.add(cochlea);
  const nerve = new Line(new BufferGeometry().setFromPoints([V(EAR_X + 1.75, -0.1, 0), V(EAR_X + 2.6, 0.6, 0), V(EAR_X + 3.4, 1.4, 0)]), new LineBasicMaterial({ color: 0xffe28a }));
  ear.add(nerve);
  const nerveGlow = new Mesh(new SphereGeometry(0.12, 12, 10), new MeshBasicMaterial({ color: 0xffe28a })); ear.add(nerveGlow);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    drum: lab.add('bt-lb bt-lb-b', 'Vibrating drumhead<small>振動的鼓面</small>'),
    air: lab.add('bt-lb bt-lb-e', 'Air molecules (drawn huge)<small>空氣分子（畫得很大）</small>'),
    spot: lab.add('bt-lb sn-lb-spot', 'Only moves back and forth<small>只在原地前後晃</small>'),
    front: lab.add('bt-lb ip-region', 'Front of the sound<small>聲音的波前</small>'),
    eardrum: lab.add('bt-lb bt-lb-b', 'Eardrum<small>鼓膜</small>'),
    bones: lab.add('bt-lb ip-region', 'Three tiny bones<small>三塊聽小骨</small>'),
    cochlea: lab.add('bt-lb ip-region', 'Cochlea<small>耳蝸</small>'),
    brain: lab.add('bt-lb ip-region', 'To the brain<small>送到大腦</small>'),
    space: lab.add('bt-lb ip-lb-lost', 'No air: nothing to push<small>沒有空氣：沒東西可推</small>'),
  };

  const R = {
    f: $('.sn-f'), fOut: $('.sn-f-out'), a: $('.sn-a'), aOut: $('.sn-a-out'), pitch: $('.sn-pitch'),
    wl: $('.sn-wl'), hz: $('.sn-hz'), arrive: $('.sn-arrive'), sec: $('.sn-sec'), secOut: $('.sn-sec-out'), km: $('.sn-km'),
    msg: $('.sn-msg'), play: $('.al-play'),
  };
  const state = { f: 262, amp: 0.55, air: true, labels: true, playing: true, t: 0, sec: 6, msgKey: 'start', lastMsg: '', arrivedAt: null };

  const params = () => ({ A: ampVis(state.amp), lambda: lambdaVis(state.f), f: SPEED_VIS / lambdaVis(state.f), src: SRC, speed: SPEED_VIS });
  const mtx = new Matrix4(), col = new Color(), WARM = new Color(0xff9a4a), COOL = new Color(0x2b4a8a), MID = new Color(0x9fb4d8);
  function step(dt) {
    if (state.playing) state.t += dt;
    const p = params();
    const t = state.t;
    head.position.set(SRC + p.A * Math.sin(-2 * Math.PI * p.f * t), 0, 0);
    mols.visible = state.air;
    const norm = p.A * 2 * Math.PI / p.lambda;
    if (state.air) {
      for (let n = 0; n < N; n++) {
        const [x, y, z] = base[n];
        const s = displacement(x, t, p);
        mtx.makeTranslation(x + s, y, z);
        mols.setMatrixAt(n, mtx);
        const q = squeeze(x, t, p) / norm;
        col.copy(MID).lerp(q > 0 ? WARM : COOL, Math.min(1, Math.abs(q)));
        mols.setColorAt(n, col);
      }
      mols.instanceMatrix.needsUpdate = true;
      if (mols.instanceColor) mols.instanceColor.needsUpdate = true;
    }
    const [sx, sy, sz] = base[SPOT];
    spot.visible = range.visible = state.air;
    spot.position.set(sx + displacement(sx, t, p), sy, sz + 0.02);
    range.geometry.setFromPoints([V(sx - p.A, sy - 0.32, sz), V(sx + p.A, sy - 0.32, sz)]);
    const front = SRC + SPEED_VIS * t;
    frontPlane.visible = state.air && front < EAR_X;
    frontPlane.position.set(Math.min(front, EAR_X), 0, 0);
    const reached = state.air && front >= EAR_X - 0.1;
    if (reached && state.arrivedAt == null) state.arrivedAt = t;
    if (!state.air) state.arrivedAt = null;
    const sEar = reached ? displacement(EAR_X - 0.2, t, p) * 1.4 : 0;
    drumMem.position.set(EAR_X + sEar, 0, 0);
    bones.forEach((b, k) => { b.position.x = EAR_X + [0.35, 0.7, 1.05][k] + sEar * (0.8 - k * 0.15); });
    nerveGlow.visible = reached;
    if (reached) {
      const ph = ((t - state.arrivedAt) * 0.8) % 1;
      nerveGlow.position.set(EAR_X + 1.75 + ph * 1.65, -0.1 + ph * 1.5, 0);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return { front, reached };
  }

  let narrow = false;
  function updateLabels(info) {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.drum, on, V(SRC - 0.8, 2.3, 0), -14);
    show(L.air, on && state.air && !narrow, V(-2, 1.75, 0), -18);
    show(L.spot, on && state.air, spot.position.clone().add(V(0, -0.35, 0)), 30);
    show(L.front, on && state.air && !info.reached && !narrow, V(Math.min(info.front, EAR_X), -1.9, 0), 18);
    show(L.eardrum, on, V(EAR_X - 0.3, 1.3, 0), -18);
    show(L.bones, on && !narrow, V(EAR_X + 0.7, 0.45, 0), -26);
    show(L.cochlea, on && !narrow, V(EAR_X + 1.75, -0.65, 0), 22);
    show(L.brain, on && !narrow, V(EAR_X + 3.4, 1.5, 0), -14);
    show(L.space, !state.air, V(-1, 0.2, 0));
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmtM = (m) => (m >= 1 ? `${m.toFixed(2)} m` : `${Math.round(m * 100)} cm`);
  function readout(info) {
    const f = state.f;
    R.fOut.textContent = `${Math.round(f)} Hz`;
    R.f.style.setProperty('--p', `${(Math.log(f / 100) / Math.log(10)) * 100}%`);
    R.a.style.setProperty('--p', `${state.amp * 100}%`);
    R.aOut.innerHTML = state.amp < 0.3 ? 'Soft<small>小聲</small>' : state.amp < 0.7 ? 'Medium<small>中等</small>' : 'Loud<small>大聲</small>';
    R.pitch.innerHTML = f < 200 ? 'Low<small>低沉</small>' : f < 500 ? 'Middle<small>中音</small>' : 'High<small>高音</small>';
    R.hz.textContent = `${Math.round(f)}`;
    R.wl.textContent = fmtM(wavelength(f));
    R.arrive.innerHTML = !state.air ? 'Never<small>傳不到</small>' : info.reached ? 'Arrived<small>到了</small>' : 'On the way<small>在路上</small>';
    R.secOut.textContent = `${state.sec.toFixed(state.sec % 1 ? 1 : 0)} s`;
    R.sec.style.setProperty('--p', `${state.sec / 20 * 100}%`);
    R.km.textContent = `${thunderKm(state.sec).toFixed(1)} km`;
    let key = state.msgKey;
    if (!state.air) key = 'noair';
    else if (info.reached && (key === 'start')) key = 'arrived';
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  const restart = () => { state.t = 0; state.arrivedAt = null; };
  function setF(f, key) { state.f = MathUtils.clamp(+f, 100, 1000); R.f.value = String(Math.log10(state.f / 100)); restart(); state.msgKey = key || (state.f < 200 ? 'low' : state.f >= 500 ? 'high' : 'start'); }
  function setAmp(a) { state.amp = MathUtils.clamp(+a, 0, 1); R.a.value = String(state.amp); state.msgKey = state.amp >= 0.7 ? 'loud' : state.msgKey; }
  function setAir(v) { state.air = v; const t = $('[data-t="air"]'); if (t) t.checked = v; restart(); }
  function setSec(s) { state.sec = MathUtils.clamp(+s, 0, 20); R.sec.value = String(state.sec); }
  R.f.addEventListener('input', () => setF(100 * 10 ** +R.f.value));
  R.a.addEventListener('input', () => setAmp(R.a.value));
  R.sec.addEventListener('input', () => setSec(R.sec.value));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="air"]', setAir);
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

  setF(262, 'start'); setAmp(0.55); setSec(6);
  readout(step(0.01));
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    low: () => { setAir(true); setAmp(0.55); setF(120, 'low'); },
    high: () => { setAir(true); setAmp(0.55); setF(800, 'high'); },
    noair: () => { setAir(false); },
    thunder: () => { setAir(true); setSec(9); },
  };
  // 除錯：document.querySelector('[data-soundwave-lab]').__lab
  root.__lab = {
    camera, controls, state, setF, setAmp, setAir, setSec, params,
    run: (sec) => { for (let t = 0; t < sec; t += 0.025) step(0.025); },
    render: () => { const i = step(0); controls.update(); updateLabels(i); readout(i); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-soundwave-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
