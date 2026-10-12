/*
 * 音樂 Music · 第一課「為什麼有的音高、有的音低？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**振動得越快，音越高；弦短一半，音高八度**。
 * 桌上一把單弦琴（monochord）：一根弦拉在木箱上，左邊是弦枕，右邊是固定的琴橋，中間有一個可以移動的琴橋。
 * 移動琴橋把弦分成兩段：只有琴橋到右邊那一段會振動（左邊那段不響）。整根弦是 C4（中央 C，261.63 Hz）。
 *   拖動琴橋（或箱子上任何一點）／滑桿    改變弦長；音高跟著連續改變（持續發聲）
 *   .mu-pluck                              撥一下：弦振動、慢慢停下來，同時發出會衰減的聲音
 *   data-preset                            整根弦、二分之一、三分之二、四分之三（琴橋會吸附在這些位置）
 * 振動畫面是「放慢」的示意：真實的弦每秒振動幾百次，眼睛看不到；模型裡整根弦每秒只動 VIS0 次，
 * 其他長度照頻率比例放慢（半長的弦剛好是兩倍快）。放慢倍數 = f0 / VIS0，顯示在右邊欄。
 *
 * 控制器（r：會振動那一段占整根弦的比例；頻率 = f0 / r）不靠 WebGL：沒有 WebGL 時 3D 不畫，滑桿與按鈕照樣能用，
 * 聲音由 engine.js 的合成器發出，點擊「開啟聲音」之前不會響。
 * 2D（不需要 WebGL）：哪一個比較高？、可以彈的鍵盤、人耳聽得到的範圍。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-string.js
 * 除錯：document.querySelector('[data-musstring-lab]').__lab
 *   state.r、hz()（現在正在發幾赫茲：讀合成器，沒有聲音是 0）、freq()（目前弦長對應的頻率）、setR(r)、pluck()、
 *   demo('faster'|'half'|'simple'|'slow')、run(秒)、render()、goCam()
 *   整頁：window.__musSynth.hz()、.nowPlaying()
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Plane,
  Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { initHigher } from './higher2d.js';
import { initKeys } from './keys2d.js';
import { initRange } from './range2d.js';
import { justVsEqual, midiToFreq, nearestNote, PRESETS, stringFreq } from './pitch.js';

const F0 = midiToFreq(60);         // 整根弦：C4，261.63 Hz
const R_MIN = 0.25;                // 最短：四分之一（高兩個八度）
const X0 = -4.2, X1 = 4.2;         // 弦枕與固定琴橋的位置（世界單位）
const LEN = X1 - X0;
const VIS0 = 1.5;                  // 模型裡整根弦每秒振動幾次（放慢後）
const SLOW = F0 / VIS0;            // 放慢倍數
const STRING_CM = 60;              // 示意：整根弦 60 公分
const SNAP = 0.014;                // 距離預設位置多近就吸附（r 的單位）
const Y_STR = 0.62;                // 弦的高度
const V = (x, y, z) => new Vector3(x, y, z);
const rToX = (r) => X1 - r * LEN;
const xToR = (x) => (X1 - x) / LEN;
const clampR = (r) => Math.min(1, Math.max(R_MIN, r));
const fmtHz = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(2));

/** 一條會彎的線：n 段、每圈 5 個頂點的細管（位置每格重算） */
function makeStrand(n, radius, color) {
  const ring = 5, rows = n + 1;
  const pos = new Float32Array(rows * ring * 3);
  const idx = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < ring; k++) {
      const a = i * ring + k, b = i * ring + (k + 1) % ring, c = (i + 1) * ring + k, d = (i + 1) * ring + (k + 1) % ring;
      idx.push(a, c, b, b, c, d);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setIndex(idx);
  const m = new Mesh(g, new MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.7, emissive: color, emissiveIntensity: 0.12 }));
  m.castShadow = true; m.frustumCulled = false;
  const cs = [], sn = [];
  for (let k = 0; k < ring; k++) { cs.push(Math.cos((k / ring) * Math.PI * 2) * radius); sn.push(Math.sin((k / ring) * Math.PI * 2) * radius); }
  m.userData.set = (fn) => {   // fn(i, t) → [x, y]
    for (let i = 0; i < rows; i++) {
      const [x, y] = fn(i, i / n);
      for (let k = 0; k < ring; k++) { const o = (i * ring + k) * 3; pos[o] = x; pos[o + 1] = y + cs[k]; pos[o + 2] = sn[k]; }
    }
    g.attributes.position.needsUpdate = true;
    g.computeVertexNormals();
  };
  return m;
}

/** 半透明的「振幅包絡」：弦振動時眼睛看到的那個梭形 */
function makeEnvelope(n, color) {
  const rows = n + 1;
  const pos = new Float32Array(rows * 2 * 3);
  const idx = [];
  for (let i = 0; i < n; i++) { const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1; idx.push(a, b, c, b, d, c); }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setIndex(idx);
  const m = new Mesh(g, new MeshBasicMaterial({ color, transparent: true, opacity: 0.34, side: DoubleSide, depthWrite: false }));
  m.frustumCulled = false;
  m.userData.set = (fn) => {   // fn(i, t) → [x, y, half]
    for (let i = 0; i < rows; i++) {
      const [x, y, h] = fn(i, i / n);
      pos.set([x, y + h, 0, x, y - h, 0], i * 6);
    }
    g.attributes.position.needsUpdate = true;
  };
  return m;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = {
    freq: $('.mu-freq'), note: $('.mu-note'), cents: $('.mu-cents'), len: $('.mu-len'), ratio: $('.mu-ratio'),
    slider: $('.mu-slider'), msg: $('.mu-msg'), plate: $('.mu-plate'), vis: $('.mu-vis'), vis2: $('.mu-vis2'), pluck: $('.mu-pluck'),
  };
  const state = { r: 1, dragging: false, amp: 0, phase: 0, held: false, labels: true, marks: true, t: 0 };
  let voice = null;        // 拖動時持續發聲的 voice
  let script = null;       // 卡片示範：{ t, list: [{ at, fn }] }
  let glide = null;        // { from, to, t, dur }：自動移動琴橋
  let view = null;

  const freq = () => stringFreq(state.r, F0);
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function presetNear(r) {
    return PRESETS.find((p) => Math.abs(p.r - r) < 1e-6) || null;
  }

  function show() {
    const f = freq(), n = nearestNote(f), p = presetNear(state.r);
    R.freq.innerHTML = `${fmtHz(f)} <small>Hz</small>`;
    R.note.innerHTML = `${n.name} <span>· ${n.solfege}</span>`;
    const c = n.cents, ac = Math.abs(c);
    R.cents.innerHTML = ac < 0.5 ? 'right on the piano key<span class="zh">正好是琴鍵上的音</span>'
      : `${c > 0 ? '+' : '−'}${ac.toFixed(1)} cents ${c > 0 ? 'above' : 'below'} the key<span class="zh">比琴鍵${c > 0 ? '高' : '低'} ${ac.toFixed(1)} 音分</span>`;
    R.len.innerHTML = `${Math.round(state.r * 100)}% <small>${(state.r * STRING_CM).toFixed(1)} cm</small>`;
    R.ratio.innerHTML = `× ${(f / F0).toFixed(2)}${p && p.key !== 'whole' ? ` <small>${p.interval_en} · ${p.interval_zh}</small>` : ''}`;
    R.slider.value = String(Math.round(state.r * 1000));
    R.slider.setAttribute('aria-valuetext', `${Math.round(state.r * 100)}% of the string, ${fmtHz(f)} Hz, ${n.name}`);
    $$('[data-preset]').forEach((b) => b.setAttribute('aria-pressed', p && p.key === b.getAttribute('data-preset') ? 'true' : 'false'));
    R.vis.textContent = (VIS0 * f / F0).toFixed(1);
    R.vis2.textContent = (VIS0 * f / F0).toFixed(1);
  }

  function setR(r, { snap = false, quiet = false } = {}) {
    r = clampR(r);
    if (snap) { const p = PRESETS.find((q) => Math.abs(q.r - r) < SNAP); if (p) r = p.r; }
    state.r = r;
    if (voice) voice.setFreq(freq());
    show();
    if (!quiet) {
      const p = presetNear(r);
      if (p && p.key !== 'whole') {
        const j = justVsEqual(p.r);
        say(`${p.en} of the string: ${p.interval_en}. The frequency is ${(1 / p.r).toFixed(p.key === 'half' ? 0 : 2)} times the whole string: ${fmtHz(freq())} Hz.`,
            `${p.zh}的弦長：${p.interval_zh}。頻率是整根弦的 ${(1 / p.r).toFixed(p.key === 'half' ? 0 : 2)} 倍：${fmtHz(freq())} 赫。`);
        void j;
      } else if (p) {
        say(`The whole string: ${fmtHz(F0)} Hz, the note C4 (middle C).`, `整根弦：${fmtHz(F0)} 赫，音名是 C4（中央 C）。`);
      } else {
        say(`${Math.round(r * 100)}% of the string vibrates, so it shakes ${(1 / r).toFixed(2)} times as fast: ${fmtHz(freq())} Hz.`,
            `${Math.round(r * 100)}% 長的弦在振動，所以振動快 ${(1 / r).toFixed(2)} 倍：${fmtHz(freq())} 赫。`);
      }
    }
  }

  function startVoice() {
    if (voice) return;
    if (!synth.state.unlocked && !synth.unlock()) return;
    voice = synth.hold(freq(), { type: 'triangle', gain: 0.9 });
  }
  function stopVoice() { if (voice) { voice.release(); voice = null; } }

  function pluck() {
    synth.unlock();
    stopVoice();
    synth.tone(freq(), { type: 'triangle', dur: 1.8, gain: 0.9 });
    state.amp = 1; state.held = false;
    root.classList.remove('al-fresh');
  }

  function stopAuto() { script = null; glide = null; }

  // ── 時間往前走 ─────────────────────────────────────────────────────────
  function step(dt) {
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (glide) {
      glide.t = Math.min(glide.dur, glide.t + dt);
      const k = MathUtils.smootherstep(glide.t / glide.dur, 0, 1);
      setR(glide.from + (glide.to - glide.from) * k, { quiet: true });
      if (glide.t >= glide.dur) { const done = glide.done; glide = null; if (done) done(); }
    }
    const fv = VIS0 * freq() / F0;
    state.phase += Math.PI * 2 * fv * dt;
    if (state.held) state.amp += (1 - state.amp) * Math.min(1, dt * 12);
    else state.amp = state.amp > 0.01 ? state.amp * Math.exp(-dt / 0.75) : 0;
  }

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 4; controls.maxDistance = 30;
    controls.minPolarAngle = 0.25; controls.maxPolarAngle = Math.PI * 0.48;
    controls.minAzimuthAngle = -0.9; controls.maxAzimuthAngle = 0.9;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8));
    scene.add(new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-3, 9, 7); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 5, bottom: -5, near: 1, far: 26 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    // 琴身：木箱（上面板略淺）、弦枕、固定琴橋、旋鈕
    const wood = new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.72 });
    const woodTop = new MeshStandardMaterial({ color: 0xc89a5c, roughness: 0.6 });
    const dark = new MeshStandardMaterial({ color: 0x3b2614, roughness: 0.6 });
    const body = new Mesh(new BoxGeometry(LEN + 1.8, 0.5, 2.2), wood);
    body.position.set(0, 0.25, 0); body.castShadow = true; body.receiveShadow = true; scene.add(body);
    const top = new Mesh(new BoxGeometry(LEN + 1.4, 0.06, 1.9), woodTop);
    top.position.set(0, 0.53, 0); top.receiveShadow = true; scene.add(top);
    const hole = new Mesh(new CylinderGeometry(0.55, 0.55, 0.02, 40), dark);
    hole.position.set(-0.4, 0.57, 0.15); scene.add(hole);
    const nut = new Mesh(new BoxGeometry(0.2, 0.34, 1.0), dark);
    nut.position.set(X0, 0.7, 0); nut.castShadow = true; scene.add(nut);
    const bridge = new Mesh(new BoxGeometry(0.22, 0.34, 1.0), dark);
    bridge.position.set(X1, 0.7, 0); bridge.castShadow = true; scene.add(bridge);
    for (const z of [-0.35, 0, 0.35]) {   // 旋鈕（裝飾）
      const peg = new Mesh(new CylinderGeometry(0.1, 0.1, 0.3, 14), dark);
      peg.rotation.x = Math.PI / 2; peg.position.set(X0 - 0.5, 0.45, z * 1.3); scene.add(peg);
    }

    // 刻度：弦長的 1、3/4、2/3、1/2、1/4（從固定琴橋量起）
    const tickMat = new MeshBasicMaterial({ color: 0xffd36e });
    const ticks = [];
    for (const [r] of [[1], [3 / 4], [2 / 3], [1 / 2], [1 / 4]]) {
      const t = new Mesh(new BoxGeometry(0.04, 0.012, 0.55), tickMat);
      t.position.set(rToX(r), 0.565, 0.78); scene.add(t); ticks.push(t);
    }

    // 弦：不振動那一段（左，灰）、振動那一段（右，亮）、振幅包絡
    const N = 72;
    const dead = makeStrand(2, 0.028, 0x7d8aa6);
    const live = makeStrand(N, 0.034, 0xffd36e);
    const env = makeEnvelope(N, 0xffd36e);
    scene.add(dead, live, env);

    // 可以移動的琴橋：木楔＋金色把手
    const mov = new Group();
    const wedge = new Mesh(new BoxGeometry(0.3, 0.38, 1.0), new MeshStandardMaterial({ color: 0xb98240, roughness: 0.55 }));
    wedge.position.y = 0.19; wedge.castShadow = true;
    const grip = new Mesh(new SphereGeometry(0.2, 24, 16), new MeshStandardMaterial({ color: 0xffd36e, roughness: 0.3, emissive: 0xffd36e, emissiveIntensity: 0.25 }));
    grip.position.set(0, 0.74, 0.62); grip.castShadow = true;
    const stem = new Mesh(new CylinderGeometry(0.05, 0.05, 0.5, 10), dark);
    stem.position.set(0, 0.55, 0.4);
    mov.add(wedge, stem, grip);
    mov.position.y = 0.55;
    scene.add(mov);
    mov.userData.hit = [wedge, grip, stem];

    scene.updateMatrixWorld(true);

    // 標籤
    const lab = labeler($('.al-labels'), cv, camera);
    const lbLive = lab.add('mu-lb mu-lb-live', 'vibrating · 會振動');
    const lbDead = lab.add('mu-lb mu-lb-dead', 'silent · 不響');
    const lbTicks = PRESETS.map((p) => lab.add('mu-lb mu-lb-tick', p.key === 'whole' ? '1' : `${p.num}/${p.den}`));
    const lbTick4 = lab.add('mu-lb mu-lb-tick', '1/4');
    const tmp = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 0.5, 0.1), p = V(0, 0.78, 1).normalize().multiplyScalar(fit(LEN + 2.6, 3.2)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }

    function pose() {
      const xf = rToX(state.r);
      mov.position.x = xf;
      const A = state.amp * (0.16 + 0.3 * state.r);   // 振幅（世界單位）
      const ph = state.phase;
      dead.userData.set((i, t) => [X0 + (xf - X0) * t, Y_STR]);
      const span = X1 - xf;
      live.userData.set((i, t) => [xf + span * t, Y_STR + A * Math.sin(Math.PI * t) * Math.cos(ph)]);
      env.userData.set((i, t) => [xf + span * t, Y_STR, A * Math.sin(Math.PI * t)]);
      env.visible = A > 0.004;
    }
    function labels() {
      const xf = rToX(state.r);
      lbLive.hidden = !state.labels; lbDead.hidden = !state.labels || state.r > 0.97;
      if (state.labels) {
        lab.place(lbLive, tmp.set((xf + X1) / 2, Y_STR + 0.55, 0), -4);
        if (!lbDead.hidden) lab.place(lbDead, tmp.set((xf + X0) / 2, Y_STR + 0.55, 0), -4);
      }
      lbTicks.forEach((l, i) => { l.hidden = !state.marks; if (state.marks) lab.place(l, tmp.set(rToX(PRESETS[i].r), 0.55, 1.12), 0); });
      lbTick4.hidden = !state.marks;
      if (state.marks) lab.place(lbTick4, tmp.set(rToX(0.25), 0.55, 1.12), 0);
    }
    function render() {
      pose();
      controls.update();
      labels();
      renderer.render(scene, camera);
    }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 1.0);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }

    // 拖動：射線打到箱子平面，x → 弦長；拖曳超過幾個像素才算（旋轉鏡頭由 OrbitControls 處理）
    const ray = new Raycaster(), ndc = new Vector2();
    const plane = new Plane(V(0, 1, 0), -Y_STR), hitP = V(0, 0, 0);
    const setRay = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); };
    const overBridge = (e) => { setRay(e); return ray.intersectObjects([...mov.userData.hit, body, top], false).length > 0; };
    const xAt = (e) => { setRay(e); return ray.ray.intersectPlane(plane, hitP) ? hitP.x : null; };
    let dragId = null;
    // 用 capture：要在 OrbitControls 之前把旋轉關掉，拖動琴橋時鏡頭才不會跟著轉
    cv.addEventListener('pointerdown', (e) => {
      if (!overBridge(e)) return;
      const x = xAt(e); if (x === null) return;
      dragId = e.pointerId;
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      controls.enabled = false;
      stopAuto();
      state.dragging = true; state.held = true;
      root.classList.remove('al-fresh');
      synth.unlock();
      startVoice();
      setR(xToR(x), { snap: true });
    }, true);
    cv.addEventListener('pointermove', (e) => {
      if (dragId !== null && e.pointerId === dragId) {
        const x = xAt(e); if (x !== null) setR(xToR(x), { snap: true });
      } else if (e.pointerType === 'mouse') {
        cv.style.cursor = overBridge(e) ? 'grab' : '';
      }
    });
    const end = (e) => {
      if (dragId === null || (e && e.pointerId !== dragId)) return;
      dragId = null; controls.enabled = true;
      state.dragging = false; state.held = false;
      stopVoice();
    };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = camera.aspect < 1.1 ? 44 : 34;
      camera.updateProjectionMatrix();
      root.classList.toggle('mu-narrow', w < 520);
      const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (band !== band0) { band0 = band; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, render, tick, goHome, ticks };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕與滑桿 ──────────────────────────────────────────────────
  R.slider.addEventListener('input', () => {
    stopAuto();
    state.held = true;
    synth.unlock(); startVoice();
    setR(Number(R.slider.value) / 1000, { snap: true });
    clearTimeout(R.slider._t);
    R.slider._t = setTimeout(() => { state.held = false; stopVoice(); }, 350);
  });
  $$('[data-preset]').forEach((b) => b.addEventListener('click', () => {
    stopAuto(); stopVoice();
    const p = PRESETS.find((q) => q.key === b.getAttribute('data-preset'));
    setR(p.r);
    pluck();
  }));
  R.pluck.addEventListener('click', () => { stopAuto(); pluck(); });
  const tgL = $('[data-t="labels"]'), tgM = $('[data-t="marks"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  if (tgM) tgM.addEventListener('change', () => { state.marks = tgM.checked; if (view) view.ticks.forEach((t) => { t.visible = tgM.checked; }); });

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const go = (to, dur, done) => { glide = { from: state.r, to, t: 0, dur, done }; };
  const needSound = () => (synth.state.unlocked && !synth.state.muted ? '' : ' (Turn the sound on to hear it. · 打開聲音就能聽到。)');
  const DEMO = {
    faster() {
      stopAuto(); stopVoice(); setR(1, { quiet: true });
      say('Watch the string shake while the bridge slides in: the shorter the string, the faster it shakes, and the higher the note.' + needSound(),
          '看琴橋慢慢往右推：弦越短，振動越快，音就越高。');
      play([{ at: 0.8, fn: () => { synth.unlock(); startVoice(); state.held = true; go(R_MIN, 4.5, () => { state.held = false; stopVoice(); say(`A quarter of the string: ${fmtHz(freq())} Hz, four times as fast as the whole string.`, `四分之一長的弦：${fmtHz(freq())} 赫，振動是整根弦的四倍快。`); }); } }]);
    },
    half() {
      stopAuto(); stopVoice(); setR(1, { quiet: true });
      say('First the whole string…' + needSound(), '先撥整根弦……');
      play([
        { at: 0.5, fn: () => pluck() },
        { at: 2.4, fn: () => { go(0.5, 0.9, () => { setR(0.5, { quiet: true }); pluck(); say(`Half the string: ${fmtHz(freq())} Hz is exactly 2 × ${fmtHz(F0)} Hz. The note is C5, one octave higher.`, `一半長的弦：${fmtHz(freq())} 赫，剛好是 ${fmtHz(F0)} 的 2 倍。音名是 C5，高了一個八度。`); }); } },
      ]);
    },
    simple() {
      stopAuto(); stopVoice(); setR(1, { quiet: true });
      const f2 = stringFreq(2 / 3, F0), f3 = stringFreq(3 / 4, F0);
      say('Three plucks: the whole string, then two thirds, then three quarters.' + needSound(), '連撥三次：整根弦、三分之二、四分之三。');
      play([
        { at: 0.4, fn: () => pluck() },
        { at: 2.3, fn: () => { setR(2 / 3, { quiet: true }); pluck(); say(`Two thirds: ${fmtHz(f2)} Hz, about the piano's G4 (391.99 Hz), but not exactly.`, `三分之二：${fmtHz(f2)} 赫，接近鋼琴的 G4（391.99 赫），但不完全一樣。`); } },
        { at: 4.4, fn: () => { setR(3 / 4, { quiet: true }); pluck(); say(`Three quarters: ${fmtHz(f3)} Hz, about the piano's F4 (349.23 Hz), also not exactly.`, `四分之三：${fmtHz(f3)} 赫，接近鋼琴的 F4（349.23 赫），也不完全一樣。`); } },
      ]);
    },
    slow() {
      stopAuto(); stopVoice(); setR(1, { quiet: true });
      state.held = true;
      say(`Look closely: the whole string really shakes ${fmtHz(F0)} times every second, far too fast to see. The model slows it down about ${Math.round(SLOW)} times, to ${VIS0} shakes per second.`,
          `仔細看：整根弦真正每秒振動 ${fmtHz(F0)} 次，快到看不見。模型把它放慢了大約 ${Math.round(SLOW)} 倍，變成每秒 ${VIS0} 次。`);
      play([{ at: 6, fn: () => { state.held = false; } }]);
    },
  };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    if (!visible) { stopAuto(); stopVoice(); state.held = false; }
  }, { rootMargin: '120px' }).observe(root);
  watchOffscreen(spaceWrap, 0.02);

  R.plate.textContent = `${fmtHz(F0)} Hz`;
  $('.mu-slow').textContent = `${Math.round(SLOW)}`;
  setR(1, { quiet: true });
  say('The whole string is C4, middle C, 261.63 Hz. Drag the bridge or press a button, and listen.',
      '整根弦是 C4（中央 C），261.63 赫。拖動琴橋或按一個按鈕，仔細聽。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setR, pluck, freq,
    hz: () => synth.hz(),
    nowPlaying: () => synth.nowPlaying(),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) view.render(); },
    SLOW, VIS0, F0,
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const h = document.querySelector('[data-mu-higher]'); if (h) initHigher(h);
  const k = document.querySelector('[data-mu-keys]'); if (k) initKeys(k);
  const r = document.querySelector('[data-mu-range]'); if (r) initRange(r);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musstring-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
