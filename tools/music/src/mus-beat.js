/*
 * 音樂 Music · 第三課「拍子是什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**拍是穩定的脈搏，把時間切成一樣長的格；強弱一組一組地循環，就是二拍、三拍、四拍；速度用每分鐘幾拍（BPM）說。**
 * 一個擺錘式節拍器：擺桿每過一格擺到另一邊，在兩端發出一拍；頂上一排小燈顯示這一小節的第幾拍（強拍金色）。
 * 重錘的位置是示意：往上＝慢、往下＝快（BPM 滑桿或拖動重錘）。
 *   .mu-bt-go        開始／停止（要先點過「開啟聲音」，沒有聲音時只有畫面動）
 *   data-meter       二拍、三拍、四拍（強弱圖樣見 beat.js：[2,0]、[2,0,0]、[2,0,1,0]）
 *   .mu-bt-bpm       40–180 BPM；180＝每秒 3 拍（閃光上限）
 * 節拍用 Web Audio 的 lookahead 排程（metro.js），畫面讀同一條 AudioContext 時間軸，所以看到的擺錘和聽到的聲音對得上。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊欄的燈和按鈕照樣能用。
 * 2D（不需要 WebGL）：跟著拍、這是幾拍子（beat2d.js）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-beat.js
 * 除錯：document.querySelector('[data-musbeat-lab]').__lab
 *   state（bpm、meter、running）、hz()（合成器現在發幾赫茲）、nowPlaying()、beats()（已排的拍的時間）、clock()、
 *   start()、stop()、setBpm(b)、setMeter(n)、demo('slow'|'fast'|'three'|'second')、render()、goCam()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh,
  MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Plane, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BPM_MAX, BPM_MIN, METERS, beatSeconds, clampBpm, pendulumAngle } from './beat.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { initMeter, initTap } from './beat2d.js';
import { createMetronome } from './metro.js';

const V = (x, y, z) => new Vector3(x, y, z);
const PIVOT_Y = 1.1, ROD = 4.0, W_LOW = 0.9, W_HIGH = 3.5;       // 重錘離支點的距離（示意）
const weightPos = (bpm) => W_LOW + ((BPM_MAX - bpm) / (BPM_MAX - BPM_MIN)) * (W_HIGH - W_LOW);
const posToBpm = (d) => clampBpm(BPM_MAX - ((d - W_LOW) / (W_HIGH - W_LOW)) * (BPM_MAX - BPM_MIN));

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { bpm: $('.mu-bt-bpmout'), sec: $('.mu-bt-sec'), slider: $('.mu-bt-bpm'), go: $('.mu-bt-go'), msg: $('.mu-msg'), bar: $('.mu-bt-bar'),
    dots: [...$$('.mu-bt-dot')], flash: $('[data-t="flash"]') };
  const state = { bpm: 100, meter: 4, running: false, flash: true, labels: true };
  const events = [];     // 排進去、還沒到的拍：{ time, level, beat, bar }
  let last = { beat: 0, level: 0, at: -9 };
  let view = null, demoTimer = 0;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  const metro = createMetronome(synth, { onBeat: (b) => events.push(b) });
  const clock = () => metro.now();

  function show() {
    R.bpm.innerHTML = `${state.bpm} <small>BPM</small>`;
    R.sec.textContent = beatSeconds(state.bpm).toFixed(3);
    R.slider.value = String(state.bpm);
    $$('[data-meter]').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-meter')) === state.meter ? 'true' : 'false'));
    R.dots.forEach((d, i) => { d.hidden = i >= state.meter; d.classList.toggle('is-strong', i === 0); });
    R.go.setAttribute('aria-pressed', state.running ? 'true' : 'false');
    R.go.querySelector('.mu-bt-gt').innerHTML = state.running ? 'Stop · 停止' : '&#9654; Start the metronome · 開始';
    root.classList.toggle('is-running', state.running);
  }
  function start() {
    synth.unlock();
    synth.stopAll();
    events.length = 0;
    metro.start({ bpm: state.bpm, meter: state.meter });
    state.running = true;
    root.classList.remove('al-fresh');
    show();
  }
  function stop() {
    metro.stop(); events.length = 0; state.running = false;
    R.dots.forEach((d) => d.classList.remove('is-on'));
    show();
  }
  function setBpm(b, quiet) {
    state.bpm = clampBpm(b);
    metro.setBpm(state.bpm);
    show();
    if (!quiet) {
      const bps = state.bpm / 60;
      say(`${state.bpm} beats per minute: one beat every ${beatSeconds(state.bpm).toFixed(2)} seconds, ${bps.toFixed(2)} beats each second.`,
          `每分鐘 ${state.bpm} 拍：每 ${beatSeconds(state.bpm).toFixed(2)} 秒一拍，每秒 ${bps.toFixed(2)} 拍。`);
    }
  }
  function setMeter(n) {
    state.meter = n;
    metro.setMeter(n);
    if (state.running) { start(); }
    show();
    say(`${METERS[n].en}. Listen for the strong beat that comes back.`, `${METERS[n].zh}。聽那個一直回來的強拍。`);
  }

  /** 把已經到時間的拍拿出來更新燈（畫面讀的是 AudioContext 的時間） */
  function tick() {
    const now = clock();
    while (events.length && events[0].time <= now) {
      const e = events.shift();
      last = { beat: e.beat, level: e.level, at: e.time };
      R.bar.innerHTML = `Bar ${e.bar} · beat ${e.beat}<span class="zh">第 ${e.bar} 小節・第 ${e.beat} 拍</span>`;
    }
    const on = state.running && state.flash && now - last.at < Math.min(0.14, beatSeconds(state.bpm) * 0.45);
    R.dots.forEach((d, i) => d.classList.toggle('is-on', on && i === last.beat - 1));
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
    controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.52;
    controls.minAzimuthAngle = -0.8; controls.maxAzimuthAngle = 0.8;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8), new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-3, 9, 7); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -3, near: 1, far: 26 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    // 本體：四角錐台（上窄下寬）、底座
    const wood = new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.7 });
    const woodL = new MeshStandardMaterial({ color: 0xc89a5c, roughness: 0.6 });
    const body = new Mesh(new CylinderGeometry(0.6, 1.25, 5.2, 4, 1), wood);
    body.rotation.y = Math.PI / 4; body.position.set(0, 2.7, 0); body.scale.set(1, 1, 0.55); body.castShadow = true; body.receiveShadow = true; scene.add(body);
    const base = new Mesh(new BoxGeometry(3.6, 0.2, 2.4), woodL);
    base.position.set(0, 0.1, 0.1); base.castShadow = true; base.receiveShadow = true; scene.add(base);
    // 頂上一排燈
    const lamps = [];
    for (let i = 0; i < 4; i++) {
      const m = new MeshStandardMaterial({ color: 0x2b3550, emissive: 0x000000, roughness: 0.4 });
      const s = new Mesh(new SphereGeometry(0.2, 20, 14), m);
      s.position.set(-0.75 + i * 0.5, 5.65, 0.35); scene.add(s); lamps.push(s);
    }
    // 擺桿群組：支點在 (0, PIVOT_Y, 0.2)；桿朝上，往 x 擺
    const arm = new Group();
    arm.position.set(0, PIVOT_Y, 0.85);
    const rod = new Mesh(new BoxGeometry(0.1, ROD, 0.07), new MeshStandardMaterial({ color: 0xd9dee8, metalness: 0.6, roughness: 0.3 }));
    rod.position.y = ROD / 2 - 0.5; rod.castShadow = true; arm.add(rod);
    const counter = new Mesh(new CylinderGeometry(0.28, 0.28, 0.3, 24), new MeshStandardMaterial({ color: 0x555d70, metalness: 0.5, roughness: 0.4 }));
    counter.rotation.x = Math.PI / 2; counter.position.y = -0.55; counter.castShadow = true; arm.add(counter);
    const weight = new Mesh(new BoxGeometry(0.55, 0.45, 0.32), new MeshStandardMaterial({ color: 0xffd36e, roughness: 0.3, emissive: 0xffd36e, emissiveIntensity: 0.25 }));
    weight.castShadow = true; arm.add(weight);
    scene.add(arm);
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbWeight = lab.add('mu-lb mu-lb-live', 'slower ↑ · faster ↓<br><small>慢 ↑・快 ↓（示意）</small>');
    const lbTop = lab.add('mu-lb mu-lb-tick', 'strong beat in gold · 強拍是金色');
    const tmp = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 3.1, 0), p = V(0, 0.25, 1).normalize().multiplyScalar(fit(5.4, 8.8)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function pose() {
      const now = clock();
      const ang = state.running ? pendulumAngle(now, metro.state.t0, beatSeconds(state.bpm), 0.42) : 0;
      arm.rotation.z = -ang;
      weight.position.y = weightPos(state.bpm) - 0.5;
      lamps.forEach((l, i) => {
        l.visible = i < state.meter;
        const on = state.running && state.flash && i === last.beat - 1 && now - last.at < Math.min(0.14, beatSeconds(state.bpm) * 0.45);
        const col = i === 0 ? 0xffd36e : 0x7ef0e3;
        l.material.emissive.setHex(on ? col : 0x000000);
        l.material.color.setHex(on ? col : 0x2b3550);
      });
    }
    function labels() {
      lbWeight.hidden = !state.labels; lbTop.hidden = !state.labels;
      if (state.labels) {
        lab.place(lbWeight, tmp.set(2.9, 3.4, 0.85), 0);
        lab.place(lbTop, tmp.set(0, 6.15, 0.35), 0);
      }
    }
    function render() { pose(); controls.update(); labels(); renderer.render(scene, camera); }
    function tickV(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }

    // 拖動重錘改速度
    const ray = new Raycaster(), ndc = new Vector2(), plane = new Plane(V(0, 0, 1), -0.85), hit = V(0, 0, 0);
    const setRay = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); };
    let drag = null;
    const dFrom = (e) => { setRay(e); if (!ray.ray.intersectPlane(plane, hit)) return null; arm.updateMatrixWorld(true); const l = arm.worldToLocal(hit.clone()); return l.y + 0.5; };
    cv.addEventListener('pointerdown', (e) => {
      setRay(e);
      if (!ray.intersectObject(weight, false).length) return;
      drag = e.pointerId; controls.enabled = false;
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }, true);
    cv.addEventListener('pointermove', (e) => {
      if (drag !== null && e.pointerId === drag) { const d = dFrom(e); if (d !== null) setBpm(posToBpm(Math.min(W_HIGH, Math.max(W_LOW, d))), true); }
      else if (e.pointerType === 'mouse') { setRay(e); cv.style.cursor = ray.intersectObject(weight, false).length ? 'grab' : ''; }
    });
    const end = (e) => { if (drag === null || e.pointerId !== drag) return; drag = null; controls.enabled = true; setBpm(state.bpm); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
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
    return { camera, controls, scene, render, tick: tickV, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  R.go.addEventListener('click', () => { clearTimeout(demoTimer); state.running ? stop() : start(); });
  R.slider.addEventListener('input', () => setBpm(Number(R.slider.value)));
  $$('[data-meter]').forEach((b) => b.addEventListener('click', () => setMeter(Number(b.getAttribute('data-meter')))));
  $$('[data-bpm]').forEach((b) => b.addEventListener('click', () => setBpm(Number(b.getAttribute('data-bpm')))));
  const tgF = $('[data-t="flash"]'), tgL = $('[data-t="labels"]');
  if (tgF) tgF.addEventListener('change', () => { state.flash = tgF.checked; });
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  const needSound = () => (synth.state.unlocked && !synth.state.muted ? '' : ' (Turn the sound on to hear it. · 打開聲音就能聽到。)');
  const DEMO = {
    slow() { setMeter(4); state.meter = 4; setBpm(50, true); start(); say(`50 BPM: a slow beat, one every ${beatSeconds(50).toFixed(1)} seconds. The weight sits high.` + needSound(), `每分鐘 50 拍：慢的拍子，每 ${beatSeconds(50).toFixed(1)} 秒一拍。重錘在高處。`); },
    fast() { state.meter = 4; setBpm(160, true); start(); say(`160 BPM: a fast beat, nearly three every second. The weight sits low.` + needSound(), `每分鐘 160 拍：快的拍子，每秒將近三拍。重錘在低處。`); },
    three() { state.meter = 3; setBpm(96, true); start(); say('Three beats in each bar: strong, weak, weak. Count 1-2-3, 1-2-3.' + needSound(), '每小節三拍：強、弱、弱。數 1-2-3、1-2-3。'); },
    second() { state.meter = 4; setBpm(60, true); start(); say('60 BPM is exactly one beat every second, like the second hand of a clock.' + needSound(), '每分鐘 60 拍，剛好每秒一拍，像時鐘的秒針。'); },
  };

  let raf = 0, visible = false, lastT = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (lastT || t)) / 1000);
    lastT = t;
    tick();
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { lastT = 0; raf = requestAnimationFrame(frame); }
    if (!visible && state.running) stop();
  }, { rootMargin: '120px' }).observe(root);
  watchOffscreen(spaceWrap, 0.02);

  show();
  say('Press Start and watch the pendulum. Each time it reaches an end, that is one beat. Drag the gold weight, or use the slider, to change the speed.',
      '按「開始」，看擺錘。每次擺到一端，就是一拍。拖動金色的重錘，或用滑桿，改變速度。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, metro,
    hz: () => synth.hz(),
    nowPlaying: () => synth.nowPlaying(),
    beats: () => metro.beats(),
    clock,
    start, stop, setBpm: (b) => setBpm(b), setMeter,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    render: () => { tick(); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const t = document.querySelector('[data-mu-tap]'); if (t) initTap(t);
  const m = document.querySelector('[data-mu-meter]'); if (m) initMeter(m);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musbeat-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
