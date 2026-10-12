/*
 * 音樂 Music · 第二課「同一個音，鋼琴和小提琴為什麼聽起來不一樣？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**一根弦不是只有一種振動——整根、一半、三分之一……的振動同時發生，各自是一個諧波；
 * 哪幾個諧波多、哪幾個少，就是音色。** 諧波 n 的頻率是 n × 基頻。
 * 桌上一把單弦琴（長度固定，整根弦是 C4）。弦的上方疊著第 1…6 諧波各自的振動（細線，節點用小圓點標），
 * 最下面那根金色的弦是它們加起來的樣子。
 *   點弦或箱子上任何一點／滑桿    選撥弦的位置（離兩端多遠）；理想的撥弦，第 n 諧波 ∝ sin(nπp) / n²
 *   .mu-pluck                      撥一下：弦振動、慢慢停下來，同時發出同樣諧波比例的聲音（toneComplex）
 *   data-mode                      把某個諧波關掉／打開，聽少了它的聲音
 * 振動畫面是放慢的示意：基音每秒 1 次（真正是 261.63 次），第 n 諧波 n 次，比例照真的。
 *
 * 控制器（p、啟用的諧波）不靠 WebGL：沒有 WebGL 時 3D 不畫，滑桿與按鈕照樣能用。
 * 2D（不需要 WebGL）：混合諧波、包絡、哪一個波形（mix2d.js）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-timbre.js
 * 除錯：document.querySelector('[data-mustimbre-lab]').__lab
 *   state.p、state.on、amps()（目前各諧波的相對振幅）、hz()（合成器現在發幾赫茲）、nowPlaying()（含 partials）、
 *   setP(p)、toggle(n)、pluck()、demo('modes'|'middle'|'end'|'octave')、run(秒)、render()、goCam()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Plane, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { initEnv, initMix, initWhich } from './mix2d.js';
import { midiToFreq } from './pitch.js';
import { ENVELOPES, K, nodePositions, normalizePeak, pluckAmps } from './timbre.js';
import { makeEnvelope, makeStrand } from './strand3d.js';

const F0 = midiToFreq(60);
const SHOW = 6;                    // 3D 疊出來的諧波數
const X0 = -4.2, X1 = 4.2, LEN = X1 - X0;
const VIS0 = 1;                    // 基音每秒振動幾次（放慢後）
const SLOW = F0 / VIS0;
const Y_STR = 0.62;
const Y_MODE = (n) => 1.5 + (n - 1) * 0.5;
const V = (x, y, z) => new Vector3(x, y, z);
const COLORS = [0xffd36e, 0x7ef0e3, 0xff9f7a, 0xb79cff, 0x8fd16b, 0xff7aa8, 0x7aa8ff, 0xd7c27a];
const fmtHz = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(2));

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { slider: $('.mu-pslider'), pout: $('.mu-pout'), msg: $('.mu-msg'), bars: $$('[data-bar]'), freqs: $$('[data-hf]') };
  const state = { p: 0.5, on: Array.from({ length: K }, (_, i) => i < SHOW), amp: 0, phase: 0, labels: true, nodes: true, t: 0 };
  let script = null, view = null;

  const rawAmps = () => pluckAmps(state.p, K).map((a, i) => (state.on[i] ? a : 0));
  const amps = () => rawAmps();
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function show() {
    const a = amps();
    R.slider.value = String(Math.round(Math.min(state.p, 1 - state.p) * 100));
    R.pout.textContent = `${Math.round(state.p * 100)}%`;
    R.bars.forEach((b) => {
      const n = Number(b.getAttribute('data-bar'));
      b.style.setProperty('--v', String(a[n - 1]));
      b.classList.toggle('is-off', !state.on[n - 1]);
      b.classList.toggle('is-zero', state.on[n - 1] && a[n - 1] < 0.004);
    });
    $$('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', state.on[Number(b.getAttribute('data-mode')) - 1] ? 'true' : 'false'));
  }
  function setP(p, quiet) {
    state.p = Math.min(0.95, Math.max(0.05, p));
    show();
    if (!quiet) {
      const pp = Math.min(state.p, 1 - state.p), a = pluckAmps(state.p, K);
      const dead = a.map((v, i) => (v < 0.004 ? i + 1 : 0)).filter(Boolean);
      if (dead.length) say(`Plucked at ${Math.round(state.p * 100)}% of the string: harmonic${dead.length > 1 ? 's' : ''} ${dead.join(', ')} ${dead.length > 1 ? 'are' : 'is'} missing, because a node of ${dead.length > 1 ? 'each' : 'that'} mode sits right where you pluck.`,
        `在弦長 ${Math.round(state.p * 100)}% 的地方撥：第 ${dead.join('、')} 諧波不見了，因為那個模式的節點剛好在你撥的位置。`);
      else say(`Plucked ${Math.round(pp * 100)}% from the end: the closer to the end, the more high harmonics.`, `在離一端 ${Math.round(pp * 100)}% 的地方撥：越靠近端點，高諧波越多。`);
    }
  }
  function toggle(n) {
    state.on[n - 1] = !state.on[n - 1];
    show();
    say(`Harmonic ${n} (${fmtHz(F0 * n)} Hz) is ${state.on[n - 1] ? 'on' : 'off'}.`, `第 ${n} 諧波（${fmtHz(F0 * n)} 赫）${state.on[n - 1] ? '打開了' : '關掉了'}。`);
  }
  function pluck() {
    const a = amps();
    if (!a.some((v) => v > 0.004)) { say('Turn at least one harmonic on first.', '請先打開至少一個諧波。'); return; }
    synth.unlock();
    synth.stopAll();
    synth.toneComplex(F0, normalizePeak(a), { env: ENVELOPES.struck, dur: 2.4, gain: 0.8 });
    state.amp = 1;
    root.classList.remove('al-fresh');
  }

  function step(dt) {
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    state.phase += Math.PI * 2 * VIS0 * dt;
    state.amp = state.amp > 0.01 ? state.amp * Math.exp(-dt / 1.1) : 0;
  }

  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 4; controls.maxDistance = 30;
    controls.minPolarAngle = 0.25; controls.maxPolarAngle = Math.PI * 0.48;
    controls.minAzimuthAngle = -0.9; controls.maxAzimuthAngle = 0.9;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8), new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-3, 9, 7); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 5, bottom: -5, near: 1, far: 26 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    const wood = new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.72 });
    const woodTop = new MeshStandardMaterial({ color: 0xc89a5c, roughness: 0.6 });
    const dark = new MeshStandardMaterial({ color: 0x3b2614, roughness: 0.6 });
    const body = new Mesh(new BoxGeometry(LEN + 1.8, 0.5, 2.2), wood);
    body.position.set(0, 0.25, 0); body.castShadow = true; body.receiveShadow = true; scene.add(body);
    const top = new Mesh(new BoxGeometry(LEN + 1.4, 0.06, 1.9), woodTop);
    top.position.set(0, 0.53, 0); top.receiveShadow = true; scene.add(top);
    const hole = new Mesh(new CylinderGeometry(0.55, 0.55, 0.02, 40), dark);
    hole.position.set(-0.4, 0.57, 0.15); scene.add(hole);
    for (const x of [X0, X1]) { const b = new Mesh(new BoxGeometry(0.2, 0.34, 1.0), dark); b.position.set(x, 0.7, 0); b.castShadow = true; scene.add(b); }
    // 撥弦位置的標記
    const marker = new Mesh(new SphereGeometry(0.17, 20, 14), new MeshStandardMaterial({ color: 0xffd36e, emissive: 0xffd36e, emissiveIntensity: 0.4, roughness: 0.3 }));
    marker.position.set(0, Y_STR, 0.55); scene.add(marker);

    const N = 72;
    const main = makeStrand(N, 0.034, 0xffd36e);
    const env = makeEnvelope(N, 0xffd36e);
    scene.add(main, env);
    const lines = [], dots = [];
    for (let n = 1; n <= SHOW; n++) {
      const s = makeStrand(N, 0.018, COLORS[n - 1]);
      scene.add(s); lines.push(s);
      const ds = nodePositions(n).map((u) => {
        const d = new Mesh(new SphereGeometry(0.09, 12, 8), new MeshBasicMaterial({ color: 0xffffff }));
        d.position.set(X0 + u * LEN, Y_MODE(n), 0); scene.add(d); return d;
      });
      dots.push(ds);
    }
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = Array.from({ length: SHOW }, (_, i) => lab.add('mu-lb mu-lb-mode', `${i + 1}`));
    const lbMain = lab.add('mu-lb mu-lb-live', 'the string: all of them added · 弦：全部加起來');
    const lbPluck = lab.add('mu-lb mu-lb-tick', 'pluck here · 撥這裡');
    const tmp = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 1.55, 0.1), p = V(0, 0.55, 1).normalize().multiplyScalar(fit(LEN + 3.4, 5.0)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }

    function pose() {
      const a = amps(), sum = a.reduce((x, y) => x + y, 0);
      const scale = (0.42 / Math.max(1, sum)) * state.amp;       // 各諧波加起來的尖峰約 0.42
      marker.position.x = X0 + state.p * LEN;
      main.userData.set((i, t) => {
        let y = 0;
        for (let k = 1; k <= K; k++) if (a[k - 1]) y += a[k - 1] * Math.sin(k * Math.PI * t) * Math.cos(k * state.phase);
        return [X0 + LEN * t, Y_STR + y * scale];
      });
      env.visible = false;
      for (let n = 1; n <= SHOW; n++) {
        const on = state.on[n - 1] && a[n - 1] > 0.004;
        lines[n - 1].visible = state.on[n - 1];
        const An = (a[n - 1] || 0) * (0.42 / Math.max(1, sum)) * state.amp * 1.0;
        const idle = state.amp < 0.01;
        lines[n - 1].userData.set((i, t) => [X0 + LEN * t, Y_MODE(n) + (idle ? 0 : An * Math.sin(n * Math.PI * t) * Math.cos(n * state.phase))]);
        dots[n - 1].forEach((d) => { d.visible = state.on[n - 1] && state.nodes; });
        lines[n - 1].material.opacity = 1;
        void on;
      }
    }
    function labels() {
      const a = amps();
      lbMain.hidden = !state.labels;
      if (state.labels) lab.place(lbMain, tmp.set(X1 - 2.2, Y_STR, 0), 30);
      lbs.forEach((l, i) => {
        const n = i + 1;
        l.hidden = !state.labels || !state.on[i];
        if (!l.hidden) {
          l.innerHTML = `${n} · ${fmtHz(F0 * n)} Hz`;
          l.classList.toggle('is-zero', a[i] < 0.004);
          lab.place(l, tmp.set(X1 + 0.2, Y_MODE(n), 0), -2);
        }
      });
      lbPluck.hidden = !state.labels;
      if (state.labels) lab.place(lbPluck, tmp.set(X0 + state.p * LEN, Y_STR, 0.55), -26);
    }
    function render() { pose(); controls.update(); labels(); renderer.render(scene, camera); }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }

    // 點箱子（或弦）＝在那裡撥
    const ray = new Raycaster(), ndc = new Vector2(), plane = new Plane(V(0, 1, 0), -Y_STR), hit = V(0, 0, 0);
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || down.id !== e.pointerId) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (!ray.intersectObjects([body, top], false).length) return;
      if (ray.ray.intersectPlane(plane, hit)) { setP((hit.x - X0) / LEN); pluck(); }
    });
    cv.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      cv.style.cursor = ray.intersectObjects([body, top], false).length ? 'pointer' : '';
    });
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = camera.aspect < 1.1 ? 46 : 34;
      camera.updateProjectionMatrix();
      root.classList.toggle('mu-narrow', w < 520);
      const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (band !== band0) { band0 = band; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, render, tick, goHome, dots };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  R.slider.addEventListener('input', () => setP(Number(R.slider.value) / 100));
  R.slider.addEventListener('change', () => pluck());
  $('.mu-pluck').addEventListener('click', () => { script = null; pluck(); });
  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => toggle(Number(b.getAttribute('data-mode')))));
  $$('[data-pp]').forEach((b) => b.addEventListener('click', () => { setP(Number(b.getAttribute('data-pp')) / 100); pluck(); }));
  const tgL = $('[data-t="labels"]'), tgN = $('[data-t="nodes"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  if (tgN) tgN.addEventListener('change', () => { state.nodes = tgN.checked; });

  const play = (list) => { script = { t: 0, list }; };
  const needSound = () => (synth.state.unlocked && !synth.state.muted ? '' : ' (Turn the sound on to hear it. · 打開聲音就能聽到。)');
  const DEMO = {
    modes() {
      script = null; state.on.fill(false); state.on[0] = true; setP(0.5, true); show();
      say('One string, many ways to shake at once. First only the fundamental…' + needSound(), '一根弦可以同時用很多種方式振動。先只看基音……');
      const list = [{ at: 0.4, fn: () => pluck() }];
      for (let n = 2; n <= SHOW; n++) {
        list.push({ at: 2.6 * (n - 1), fn: () => { state.on[n - 1] = true; setP(0.2, true); show(); say(`Now harmonic ${n} too: ${n} bumps, ${fmtHz(F0 * n)} Hz. Listen to the sound get brighter.`, `再加上第 ${n} 諧波：${n} 個弓形，${fmtHz(F0 * n)} 赫。聽聲音變亮。`); pluck(); } });
      }
      play(list);
    },
    middle() {
      script = null; state.on.fill(false); for (let i = 0; i < SHOW; i++) state.on[i] = true; setP(0.5, true); show();
      say('Plucked exactly in the middle: look at harmonics 2, 4, and 6. A node sits right where you pluck, so they cannot start.' + needSound(),
          '正好在中間撥：看第 2、4、6 諧波。節點剛好在你撥的位置，它們動不起來。');
      play([{ at: 0.5, fn: () => pluck() }]);
    },
    end() {
      script = null; state.on.fill(false); for (let i = 0; i < SHOW; i++) state.on[i] = true; setP(0.1, true); show();
      say('Plucked near the end: many more high harmonics, so the sound is brighter and thinner.' + needSound(), '靠近端點撥：高諧波多得多，聲音比較亮、比較薄。');
      play([{ at: 0.5, fn: () => pluck() }]);
    },
    octave() {
      script = null; state.on.fill(false); state.on[1] = true; setP(0.25, true); show();
      say(`Only harmonic 2 on: the string shakes in two halves at ${fmtHz(F0 * 2)} Hz. That is the same note as lesson 1's half string, one octave above C4.` + needSound(),
          `只開第 2 諧波：弦分成兩半各自振動，${fmtHz(F0 * 2)} 赫。和第一課「弦長一半」是同一個音，比 C4 高一個八度。`);
      play([{ at: 0.5, fn: () => pluck() }]);
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
    if (!visible) script = null;
  }, { rootMargin: '120px' }).observe(root);
  watchOffscreen(spaceWrap, 0.02);

  $('.mu-slow').textContent = `${Math.round(SLOW)}`;
  setP(0.5, true);
  say('Click the box to pluck the string there, or use the slider. The string, plucked in the middle, makes only harmonics 1, 3, and 5.',
      '點箱子就會在那裡撥弦，也可以用滑桿。在正中間撥，只有第 1、3、5 諧波。');
  state.amp = 0;
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, amps, setP, toggle, pluck,
    hz: () => synth.hz(),
    nowPlaying: () => synth.nowPlaying(),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) view.render(); },
    F0, SLOW,
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const m = document.querySelector('[data-mu-mix]'); if (m) initMix(m);
  const e = document.querySelector('[data-mu-env]'); if (e) initEnv(e);
  const w = document.querySelector('[data-mu-which]'); if (w) initWhich(w);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-mustimbre-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
