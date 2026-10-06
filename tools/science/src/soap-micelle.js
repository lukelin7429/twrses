/*
 * 萬物原理 · 第十七課「肥皂為什麼能去污？」的 3D 放大圖（自繪示意；分子畫得比真的大非常多、也少非常多）。
 *
 * 一個機制：肥皂分子一頭喜歡水（藍色的頭）、一頭喜歡油（黃色的尾巴）。尾巴插進油污、頭留在水裡；
 *   搓洗把油污拆成小球，肥皂把每顆小球包起來（微胞），水一沖就帶走。
 *
 * 場景：下面是皮膚（或盤子），上面黏著一塊油污，四周是水（由左往右流）。
 *   畫面完全由（洗法 mode、時間 t）決定——所以時間滑桿可以來回拉。數字用 soapcalc.js（示意模型）。
 *
 * 產物：cd tools/science && npm run build → assets/js/soap-micelle.js
 */
import {
  AmbientLight, BoxGeometry, CapsuleGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, InstancedMesh,
  MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene, SphereGeometry,
  Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { MODES, T_MAX, MICELLES, PER_MICELLE, cleaned, oilLeft, releaseTime, micellesAway } from './soapcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const R0 = 1.25, FLAT = 0.6;                 // 油污：半徑、壓扁的比例
const N_FREE = 70, N_SOAP = MICELLES * PER_MICELLE + N_FREE;
const TAIL = 0.34, HEAD_R = 0.075, DROP_R = 0.2, MIC_R = DROP_R + 0.03;
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
// 球面上均勻的方向（上半球給油污表面、整顆給微胞）
function fib(i, n, hemi) {
  const y = hemi ? 0.12 + 0.88 * (1 - (i + 0.5) / n) : 1 - 2 * (i + 0.5) / n;
  const r = Math.sqrt(Math.max(0, 1 - y * y)), a = i * 2.39996323;
  return V(Math.cos(a) * r, y, Math.sin(a) * r);
}

const MSG = {
  water: ['Water alone. Oil and water do not mix, so the water slides right over the grease and leaves it stuck where it is.',
    '只用水。油和水不相溶，水從油污上面滑過去，油污還是黏在原地。'],
  soap: ['Soap, but no rubbing. The yellow tails dive into the grease and the blue heads stay in the water. The grease is covered, but only a little of it comes loose.',
    '加了肥皂，但沒有搓。黃色的尾巴鑽進油污，藍色的頭留在水裡。油污被包住了，可是只鬆動一點點。'],
  scrub: ['Soap and rubbing. Rubbing breaks the grease into tiny drops, soap wraps each drop with its heads facing the water, and the water carries the drops away.',
    '加肥皂又搓洗。搓揉把油污拆成小油滴，肥皂把每一滴包起來、頭朝著水，水就把它們帶走。'],
  done: ['Almost all of the grease is gone. Each little ball is a drop of oil hidden inside a coat of soap, so water can finally carry it off.',
    '油污幾乎都不見了。每一顆小球都是藏在肥皂外衣裡的油滴，所以水終於帶得走它。'],
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
  scene.background = new Color(0x0d2038);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0.5, 1.0, 0);
  const homePos = () => TARGET.clone().add(V(0.6, 2.3, 8.4).multiplyScalar(camera.aspect < 0.85 ? 1.6 : camera.aspect < 1.2 ? 1.35 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 24; controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6f2ff, 0x4a3a30, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.2); sun.position.set(3, 8, 6); scene.add(sun);

  // ---------------- 皮膚（或盤子）、油污、手指 ----------------
  scene.add(at(new Mesh(new BoxGeometry(9, 0.3, 4.2), new MeshStandardMaterial({ color: 0xe9c3a5, roughness: 0.85 })), 0.5, -0.15, 0));
  const oil = new Mesh(new SphereGeometry(1, 40, 24), new MeshStandardMaterial({ color: 0xd9a514, roughness: 0.35, emissive: 0x3a2a00 }));
  scene.add(oil);
  const finger = new Mesh(new CapsuleGeometry(0.55, 1.5, 8, 20), new MeshStandardMaterial({ color: 0xf3c9a8, roughness: 0.8, emissive: 0x5a3a28, transparent: true, opacity: 0.7, depthWrite: false }));
  finger.rotation.x = Math.PI / 2; scene.add(finger);

  // ---------------- 肥皂分子、油滴、水 ----------------
  const heads = new InstancedMesh(new SphereGeometry(HEAD_R, 12, 10), new MeshStandardMaterial({ color: 0x3f9bff, roughness: 0.4 }), N_SOAP);
  const tails = new InstancedMesh(new CylinderGeometry(0.022, 0.022, TAIL, 6), new MeshStandardMaterial({ color: 0xffd84a, roughness: 0.6 }), N_SOAP);
  const drops = new InstancedMesh(new SphereGeometry(DROP_R, 16, 12), new MeshStandardMaterial({ color: 0xd9a514, roughness: 0.35, emissive: 0x3a2a00 }), MICELLES);
  const N_W = 110;
  const water = new InstancedMesh(new SphereGeometry(0.035, 6, 5), new MeshBasicMaterial({ color: 0x8fd0ff, transparent: true, opacity: 0.5 }), N_W);
  for (const m of [heads, tails, drops, water]) { m.frustumCulled = false; scene.add(m); }

  // 每個分子固定的資料
  const up = V(0, 1, 0);
  const soap = Array.from({ length: N_SOAP }, (_, i) => {
    const j = i < MICELLES * PER_MICELLE ? Math.floor(i / PER_MICELLE) : -1;
    return {
      j, k: i % PER_MICELLE,
      home: V(-3.2 + hash(i, 1) * 7.6, 0.55 + hash(i, 2) * 2.2, -1.5 + hash(i, 3) * 3.0),
      w: 0.5 + hash(i, 4) * 0.8, ph: hash(i, 5) * 6.28,
      dir: fib(i, N_SOAP, true),              // 在油污表面的位置（上半球）
      mic: fib(i % PER_MICELLE, PER_MICELLE, false),
      join: 0.4 + hash(i, 6) * 3.2,           // 幾秒時游到油污上
    };
  });
  const mic = Array.from({ length: MICELLES }, (_, j) => ({
    dir: fib((j * 5) % MICELLES, MICELLES, true), rise: 0.9 + hash(j, 7) * 1.5, z: (hash(j, 8) - 0.5) * 2.2, spin: hash(j, 9) * 6.28,
  }));

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    oil: lab.add('bt-lb sp-lb-oil', 'Grease<small>油污</small>'),
    skin: lab.add('bt-lb ip-region', 'Skin, or a plate<small>皮膚，或盤子</small>'),
    water: lab.add('bt-lb bt-lb-e', 'Water<small>水</small>'),
    head: lab.add('bt-lb sp-lb-head', 'Head: loves water<small>頭：喜歡水</small>'),
    tail: lab.add('bt-lb sp-lb-tail', 'Tail: loves oil<small>尾巴：喜歡油</small>'),
    mic: lab.add('bt-lb bt-lb-b', 'Oil drop wrapped in soap<small>被肥皂包住的油滴</small>'),
    finger: lab.add('bt-lb ip-region', 'Rubbing<small>搓洗</small>'),
  };

  const R = {
    time: $('.sp-time'), timeOut: $('.sp-time-out'), status: $('.sp-status'), left: $('.sp-left'), away: $('.sp-away'),
    bars: { water: $('.sp-bar-water'), soap: $('.sp-bar-soap'), scrub: $('.sp-bar-scrub') },
    modes: [...root.querySelectorAll('.sp-mode')], msg: $('.sp-msg'), play: $('.al-play'),
  };
  const state = { mode: 'scrub', t: 0, labels: true, playing: true, clock: 0, lastMsg: '' };

  // ---------------- 由（mode, t）算出整個畫面 ----------------
  const tmpM = new Matrix4(), tmpQ = new Quaternion(), tmpS = V(1, 1, 1), ZERO = V(0, 0, 0);
  const pFree = V(0, 0, 0), pA = V(0, 0, 0), pB = V(0, 0, 0), dA = V(0, 0, 0), dB = V(0, 0, 0), c = V(0, 0, 0), head = V(0, 0, 0), tdir = V(0, 0, 0);
  const oilR = () => R0 * Math.cbrt(Math.max(0.0001, oilLeft(state.mode, state.t)));
  function dropPos(j, out) {               // 第 j 顆油滴的位置；回傳離開後經過幾秒（還沒離開是負的）
    const a = state.t - releaseTime(state.mode, j), m = mic[j], r = oilR();
    out.set(m.dir.x * r, m.dir.y * r * FLAT, m.dir.z * r);
    if (a > 0) {
      const k = 1 - Math.exp(-a / 1.3);
      out.y += k * m.rise; out.z += k * m.z; out.x += 0.1 * a + 0.045 * a * a;
      out.y += Math.sin(state.clock * 1.3 + j) * 0.04;
    }
    return a;
  }
  function draw() {
    const mode = state.mode, t = state.t, clk = state.clock, hasSoap = mode !== 'water';
    const r = oilR();
    oil.scale.set(r, r * FLAT, r); oil.visible = oilLeft(mode, t) > 0.02;
    oil.position.x = mode === 'scrub' && state.playing ? Math.sin(clk * 9) * 0.015 : 0;
    // 手指
    finger.visible = mode === 'scrub' && t < T_MAX - 0.01;
    finger.position.set(Math.sin(clk * 3.2) * 1.1, r * FLAT + 0.85, -0.2);
    // 油滴
    for (let j = 0; j < MICELLES; j++) {
      const a = dropPos(j, c);
      const s = a > 0 ? MathUtils.clamp(a / 0.5, 0, 1) * MathUtils.clamp((5.2 - c.x) / 0.8, 0, 1) : 0;
      tmpM.compose(c, tmpQ.identity(), tmpS.set(s, s, s)); drops.setMatrixAt(j, tmpM);
    }
    // 肥皂分子
    for (let i = 0; i < N_SOAP; i++) {
      const m = soap[i];
      let vis = hasSoap ? 1 : 0;
      // (1) 在水裡游
      pFree.set(m.home.x + Math.sin(clk * m.w + m.ph) * 0.35, m.home.y + Math.sin(clk * m.w * 0.8 + m.ph * 2) * 0.25, m.home.z + Math.cos(clk * m.w * 0.7 + m.ph) * 0.3);
      dA.set(Math.sin(clk * 0.4 * m.w + m.ph), Math.cos(clk * 0.3 * m.w + m.ph * 3), Math.sin(clk * 0.25 + m.ph * 5)).normalize();
      head.copy(pFree); tdir.copy(dA);
      if (hasSoap && r > 0.2 && (m.j >= 0 || i % 2 === 0)) {
        // (2) 游到油污表面：頭朝外、尾巴朝裡
        pB.set(m.dir.x * (r + 0.05), m.dir.y * (r * FLAT + 0.05), m.dir.z * (r + 0.05));
        dB.set(-m.dir.x, -m.dir.y / FLAT, -m.dir.z).normalize();
        const k = MathUtils.smoothstep(t, m.join, m.join + 1.2);
        head.lerp(pB, k); tdir.lerp(dB, k).normalize();
      }
      if (m.j >= 0) {
        // (3) 跟著油滴離開：圍成一顆球，頭朝外
        const a = dropPos(m.j, c);
        if (a > 0) {
          const sp = clk * 0.5 + mic[m.j].spin, cs = Math.cos(sp), sn = Math.sin(sp);
          dB.set(m.mic.x * cs - m.mic.z * sn, m.mic.y, m.mic.x * sn + m.mic.z * cs);
          pB.copy(c).addScaledVector(dB, MIC_R + TAIL * 0.55); dB.negate();
          const k = MathUtils.clamp(a / 0.6, 0, 1);
          head.lerp(pB, k); tdir.lerp(dB, k).normalize();
          vis *= MathUtils.clamp((5.2 - c.x) / 0.8, 0, 1);
        }
      }
      tmpM.compose(head, tmpQ.identity(), tmpS.set(vis, vis, vis)); heads.setMatrixAt(i, tmpM);
      pA.copy(head).addScaledVector(tdir, TAIL / 2 + HEAD_R * 0.6);
      tmpQ.setFromUnitVectors(up, tdir);
      tmpM.compose(pA, tmpQ, tmpS.set(vis, vis, vis)); tails.setMatrixAt(i, tmpM);
    }
    // 水（由左往右流）
    for (let i = 0; i < N_W; i++) {
      const x = -3.6 + ((hash(i, 11) * 8.8 + clk * (0.5 + hash(i, 12) * 0.5)) % 8.8);
      const y = 0.25 + hash(i, 13) * 2.7, z = -1.8 + hash(i, 14) * 3.6;
      const dx = x, dy = y, dz = z, inside = Math.hypot(dx / (r + 0.1), dy / (r * FLAT + 0.1), dz / (r + 0.1)) < 1;
      const s = inside ? 0 : 1;
      tmpM.compose(pA.set(x, y + Math.sin(clk + i) * 0.05, z), tmpQ.identity(), tmpS.set(s, s, s)); water.setMatrixAt(i, tmpM);
    }
    for (const m of [heads, tails, drops, water]) m.instanceMatrix.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, mode = state.mode, t = state.t, r = oilR();
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.oil, on && oil.visible, V(0, r * FLAT * 0.5, r * 0.9), 0);
    show(L.skin, on, V(-2.6, 0, 1.9), 14);
    show(L.water, on, V(-2.9, 2.0, 0), 0);
    // 挑一個還在水裡游的分子標頭和尾巴
    const demo = soap[MICELLES * PER_MICELLE + 1];
    const showMol = on && mode !== 'water' && !narrow;
    if (showMol) {
      pA.set(demo.home.x + Math.sin(state.clock * demo.w + demo.ph) * 0.35, demo.home.y + Math.sin(state.clock * demo.w * 0.8 + demo.ph * 2) * 0.25, demo.home.z + Math.cos(state.clock * demo.w * 0.7 + demo.ph) * 0.3);
    }
    show(L.head, showMol, pA, -22);
    show(L.tail, showMol, pA, 24);
    let best = -1, bx = -9;
    for (let j = 0; j < MICELLES; j++) { const a = dropPos(j, c); if (a > 0.8 && c.x < 4.2 && c.x > bx) { best = j; bx = c.x; } }
    if (best >= 0) dropPos(best, c);
    show(L.mic, on && best >= 0, c, -34);
    show(L.finger, on && finger.visible && !narrow, finger.position, -70);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  function readout() {
    const { mode, t } = state;
    R.timeOut.textContent = `${t.toFixed(0)} s`;
    R.time.value = String(t);
    R.time.style.setProperty('--p', `${t / T_MAX * 100}%`);
    const left = oilLeft(mode, t);
    R.left.textContent = `${Math.round(left * 100)}%`;
    R.away.textContent = String(micellesAway(mode, t));
    for (const m of MODES) {
      const v = oilLeft(m, t);
      R.bars[m].style.setProperty('--w', `${v * 100}%`);
      R.bars[m].querySelector('b').textContent = `${Math.round(v * 100)}%`;
      R.bars[m].classList.toggle('on', m === mode);
    }
    R.modes.forEach((b) => { const on = b.dataset.mode === mode; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    const st = mode === 'water' ? ['Water slides off', '水滑過去了', 'bad']
      : mode === 'soap' ? ['Covered, but stuck', '包住了，但還黏著', '']
        : left < 0.1 ? ['Clean!', '洗乾淨了！', 'ok'] : ['Breaking it up', '正在把油污拆開', 'ok'];
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `sp-status ${st[2]}`;
    const key = mode === 'scrub' && left < 0.1 ? 'done' : mode;
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setMode(m, restart = true) { if (MODES.includes(m)) { state.mode = m; if (restart) state.t = 0; } }
  function setTime(v) { state.t = MathUtils.clamp(+v, 0, T_MAX); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.modes.forEach((b) => b.addEventListener('click', () => { setMode(b.dataset.mode); setPlaying(true); }));
  R.time.addEventListener('input', () => { setTime(R.time.value); setPlaying(false); });
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= T_MAX - 0.01) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  function step(dt) {
    state.clock += dt;                         // 分子一直在動（暫停時也游，但時間不走）
    if (state.playing) {
      state.t = Math.min(T_MAX, state.t + dt);
      if (state.t >= T_MAX) setPlaying(false);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    draw();
  }

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
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

  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    water: () => { setMode('water'); setPlaying(true); },
    soap: () => { setMode('soap'); setPlaying(true); },
    scrub5: () => { setMode('scrub'); setTime(5); setPlaying(false); },
    scrub20: () => { setMode('scrub'); setTime(20); setPlaying(false); },
  };
  // 除錯：document.querySelector('[data-soap-lab]').__lab
  root.__lab = {
    camera, controls, state, setMode, setTime, setPlaying,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-soap-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
