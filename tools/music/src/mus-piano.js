/*
 * 音樂 Music · 第十課「鋼琴裡面發生了什麼？」的 3D 模型與互動（全部自繪示意，零件與動作是簡化的；聲音由瀏覽器即時合成）。
 *
 * 一個機制：按下琴鍵並不是直接撥弦——一套槓桿把鍵的動作傳給琴槌；槌子在碰到弦之前先和傳動桿「脫離」，才能彈開，
 * 弦才能自由振動；放開琴鍵，制音器落回弦上，聲音停止。
 * 一格琴鍵的剖面：琴鍵、傳動桿（jack）、琴槌、弦、制音器、琴馬與共鳴板；按住琴鍵（或按「按下去」）看慢動作的一次擊弦，
 * 放開看制音器落下；踩著制音踏瓣，放開琴鍵聲音還延續。力度滑桿從 pp 到 ff。
 *   動作階段：琴鍵下壓 → 槌子加速 → 脫離 → 自由飛行 → 碰弦（幾毫秒）→ 彈回、被接住 → 放開、制音器落下
 * 聲音在槌子碰弦的那一刻開始，在制音器落回弦的那一刻停止（沒踩踏板時）。
 *
 * 控制（按鍵、滑桿、踏板）不靠 WebGL：沒有 WebGL 時 3D 不畫，按鈕、讀數與階段說明照樣能用。
 * 2D（不需要 WebGL）：八度為什麼要拉寬（[data-mu-stretch]）、「這個零件做什麼？」（[data-mu-partq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-piano.js
 * 除錯：document.querySelector('[data-muspiano-lab]').__lab
 *   state（v、pedal、slow、play、damper、amp）、press(v)、release()、setPedal(bool)、pose()、hz()、nowPlaying()、run(秒)、render()、goCam()
 *   [data-mu-stretch].__stretch：setB(B)、info()、play(mode)；[data-mu-partq].__partq：round()、answer(key)、score()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { PARTS, actionPose, brightness, contactMs, hammerSpeed, makePartRounds, octaveStretchCents, partOf, partialFreq, partialRatios, sharpCents, silenceTime, toneAmps } from './piano.js';
import { mulberry32 } from './pitch.js';
import { makeStrand } from './strand3d.js';

const F0 = 220;                              // A3
const B_DEMO = 0.0008;                       // 示意用的不諧波係數（真實值依弦而定）
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const V = (x, y, z) => new Vector3(x, y, z);
const STAGE_TEXT = {
  rest: ['Ready', '待命'], acceleration: ['The key goes down and the hammer speeds up', '琴鍵下壓，槌子加速'],
  'free flight': ['Let-off: the jack slips away, and the hammer flies free', '脫離：傳動桿滑開，槌子自由飛行'], contact: ['The hammer strikes the string', '槌子敲到弦'],
  rebound: ['The hammer bounces back', '槌子彈回'], check: ['The hammer is caught, and the damper stays up while the key is down', '槌子被接住；琴鍵按著時，制音器維持抬起'],
  release: ['The key is up: the damper has fallen back on the string', '琴鍵放開：制音器落回弦上'],
};
const STAGE_ORDER = ['acceleration', 'free flight', 'contact', 'rebound', 'check', 'release'];

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.mu-msg'), vel: $('.mu-pi-vel'), velOut: $('.mu-pi-velout'), spd: $('.mu-pi-spd'), con: $('.mu-pi-con'), bri: $('.mu-pi-bri'), stage: $('.mu-pi-stage'), press: $('.mu-pi-press') };
  const state = { v: 0.5, pedal: false, slow: true, play: null, damper: 0, amp: 0, phase: 0, labels: true, voice: null, soundOn: false, held: false };
  let view = null;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const speedScale = () => (state.slow ? 0.25 : 1);

  function readouts() {
    const v = state.v, sp = hammerSpeed(v), ms = contactMs(v), br = brightness(v);
    R.velOut.textContent = v < 0.15 ? 'pp' : v < 0.35 ? 'p' : v < 0.5 ? 'mp' : v < 0.65 ? 'mf' : v < 0.85 ? 'f' : 'ff';
    R.spd.innerHTML = `${sp >= 0.1 ? '×' + (sp * 100).toFixed(0) : '×' + (sp * 100).toFixed(0)} <small>hammer speed, the softest = ×1 · 槌子速度（最輕＝×1）</small>`;
    R.con.innerHTML = `${ms.toFixed(1)} ms <small>hammer on the string · 槌子貼著弦的時間</small>`;
    R.bri.innerHTML = `<i style="--w:${Math.min(1, br / 3.2)}"></i><small>brightness (high overtones) · 亮度（高泛音）</small>`;
  }
  function stageShow(stage) {
    R.stage.querySelectorAll('li').forEach((li) => li.classList.toggle('is-on', li.dataset.stage === stage));
  }
  function pose() {
    const p = state.play;
    if (!p) return { key: 0, hammer: 0, damper: state.pedal ? 1 : 0, jackFree: false, contact: false, stage: 'rest' };
    return actionPose(p.t, p.v, p.tRel, state.pedal);
  }
  function startVoice(v) {
    synth.unlock();
    if (!(synth.state.unlocked && !synth.state.muted)) return;
    stopVoice();
    const ratios = partialRatios(B_DEMO, 10), amps = toneAmps(v, 10);
    state.voice = synth.toneInharmonic(F0, ratios, amps, { dur: 7, gain: 0.45 + 0.4 * v, damp: 0.12, attack: 0.003 });
    synth.noiseBurst({ freq: 380, q: 0.7, dur: 0.07, gain: 0.05 + 0.2 * hammerSpeed(v), type: 'lowpass' });
  }
  function stopVoice() { if (state.voice) { try { state.voice.release(); } catch (e) { /* ignore */ } state.voice = null; } }

  function press(v = state.v) {
    state.v = v; R.vel.value = String(Math.round(v * 100));
    state.play = { t: 0, v, tRel: Infinity, sounded: false, silenced: false };
    state.held = true; readouts();
  }
  function release() {
    const p = state.play;
    if (p && !Number.isFinite(p.tRel)) p.tRel = Math.max(p.t, 0.05);
    state.held = false;
  }
  function setPedal(on) {
    state.pedal = !!on;
    $$('[data-pedal]').forEach((b) => b.setAttribute('aria-pressed', state.pedal ? 'true' : 'false'));
    say(on ? 'Damper pedal down: all the dampers are lifted, so the notes keep ringing after you let go of the key.' : 'Damper pedal up: the dampers can fall back on the strings.',
        on ? '制音踏瓣踩下：所有制音器都抬起，放開琴鍵後聲音還會延續。' : '制音踏瓣放開：制音器可以落回弦上。');
  }

  function step(dt) {
    const k = dt * speedScale();
    state.phase += Math.PI * 2 * 2 * dt;
    const p = state.play;
    if (p) {
      p.t += k;
      const ps = actionPose(p.t, p.v, p.tRel, state.pedal);
      if (ps.contact && !p.sounded) { p.sounded = true; startVoice(p.v); state.amp = 0.25 + 0.75 * hammerSpeed(p.v) ** 0.5; }
      stageShow(ps.stage);
      // 聲音停下：放開琴鍵、制音器落回弦、沒踩踏板
      if (p.sounded && !p.silenced && Number.isFinite(p.tRel) && !state.pedal && ps.damper < 0.05 && p.t > silenceTime(p.tRel, false) - 0.001) {
        p.silenced = true; stopVoice();
      }
      if (p.silenced && p.t > (Number.isFinite(p.tRel) ? p.tRel : 0) + 1.2) { state.play = null; stageShow('rest'); }
      // 踏板放開時，若鍵早已放開，聲音也要停
      if (p.sounded && !p.silenced && Number.isFinite(p.tRel) && !state.pedal && ps.damper < 0.05) { p.silenced = true; stopVoice(); }
    }
    const target = pose().damper;
    state.damper += (target - state.damper) * Math.min(1, dt * 12);
    const lifted = state.damper > 0.5;
    state.amp = state.amp > 0.01 ? state.amp * Math.exp(-dt / (lifted ? 2.4 : 0.15)) : 0;
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
    controls.minDistance = 6; controls.maxDistance = 30;
    controls.minPolarAngle = 0.3; controls.maxPolarAngle = Math.PI * 0.49;
    controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 1.5;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85), new AmbientLight(0xffffff, 0.25));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-5, 10, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 7, bottom: -5, near: 1, far: 30 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const wood = new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.72 });
    const light = new MeshStandardMaterial({ color: 0xf1ead6, roughness: 0.5 });
    const dark = new MeshStandardMaterial({ color: 0x3b2614, roughness: 0.6 });
    const felt = new MeshStandardMaterial({ color: 0xe0c98f, roughness: 0.95 });
    const dfelt = new MeshStandardMaterial({ color: 0x59595f, roughness: 0.95 });
    const metal = new MeshStandardMaterial({ color: 0xb8bcc8, metalness: 0.8, roughness: 0.35 });
    const hits = [];
    // 底座
    const base = new Mesh(new BoxGeometry(9.4, 0.3, 8.6), new MeshStandardMaterial({ color: 0x1d2a4d, roughness: 0.8 }));
    base.position.set(1.3, 0.15, -0.1); base.receiveShadow = true; scene.add(base);

    // 琴鍵：繞 (0,0.9,0.2) 轉動；前端（+z）下壓、後端（−z）抬起
    const keyPivot = new Group(); keyPivot.position.set(0, 0.95, 0.2); scene.add(keyPivot);
    const keyBody = new Mesh(new BoxGeometry(0.9, 0.26, 4.9), light); keyBody.position.set(0, 0, 1.0); keyBody.castShadow = true; keyBody.receiveShadow = true; keyPivot.add(keyBody);
    keyBody.userData.part = 'key'; hits.push(keyBody);
    const support = new Mesh(new BoxGeometry(1.2, 0.7, 0.3), dark); support.position.set(0, 0.55, 0.2); scene.add(support);
    // 傳動桿（jack）：跟著琴鍵後端；脫離時往旁邊滑開
    const jack = new Mesh(new BoxGeometry(0.34, 0.8, 0.26), metal); jack.castShadow = true; scene.add(jack);
    // 琴槌：繞 (0,1.2,−3.8) 轉動
    const hp = V(0, 1.35, -3.8), L = 2.5, A0 = -MathUtils.degToRad(20), A1 = MathUtils.degToRad(48);
    const hammerPivot = new Group(); hammerPivot.position.copy(hp); scene.add(hammerPivot);
    const shank = new Mesh(new BoxGeometry(0.2, 0.2, L), wood); shank.position.set(0, 0, L / 2); shank.castShadow = true; hammerPivot.add(shank);
    const head = new Mesh(new CylinderGeometry(0.42, 0.42, 0.7, 24), felt); head.rotation.z = Math.PI / 2; head.position.set(0, 0, L + 0.1); head.castShadow = true; hammerPivot.add(head);
    head.userData.part = 'hammer'; hits.push(head);
    const flange = new Mesh(new BoxGeometry(0.7, 0.5, 0.5), dark); flange.position.copy(hp).add(V(0, -0.2, -0.3)); scene.add(flange);
    // 弦（沿 x）：y=3.35, z=−2.1；琴馬在右邊，下面是共鳴板
    const SY = 3.35, SZ = -2.1, SX0 = -3.6, SX1 = 3.4;
    const strand = makeStrand(64, 0.045, 0xffd36e); scene.add(strand);
    const pin = new Mesh(new BoxGeometry(0.3, 0.9, 0.5), dark); pin.position.set(SX1 + 0.1, SY - 0.4, SZ); scene.add(pin);
    const sb = new Mesh(new BoxGeometry(3.4, 0.16, 3.2), new MeshStandardMaterial({ color: 0xc89a5c, roughness: 0.6 })); sb.position.set(-4.4, SY - 0.75, SZ); sb.castShadow = true; sb.receiveShadow = true; scene.add(sb);
    sb.userData.part = 'soundboard'; hits.push(sb);
    const bridge = new Mesh(new BoxGeometry(0.28, 0.55, 0.5), dark); bridge.position.set(-3.1, SY - 0.4, SZ); scene.add(bridge);
    const rail = new Mesh(new BoxGeometry(0.5, 1.9, 0.5), wood); rail.position.set(-5.0, SY - 1.7, SZ); scene.add(rail);
    // 制音器：從上面壓在弦上
    const damper = new Mesh(new BoxGeometry(0.9, 0.5, 0.5), dfelt); damper.castShadow = true; scene.add(damper);
    const dArm = new Mesh(new BoxGeometry(0.16, 0.16, 1.7), wood); scene.add(dArm);
    damper.userData.part = 'damper'; hits.push(damper);
    // 弦的碰觸點用 hits 之外：弦本身也可以點
    const strHit = new Mesh(new BoxGeometry(7.4, 0.5, 0.5), new MeshBasicMaterial({ visible: false })); strHit.position.set((SX0 + SX1) / 2, SY, SZ); strHit.userData.part = 'string'; scene.add(strHit); hits.push(strHit);
    // 踏板
    const pedal = new Mesh(new BoxGeometry(1.0, 0.18, 1.2), metal); pedal.position.set(3.4, 0.45, 3.4); scene.add(pedal);
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const mk = (cls, t) => lab.add(cls, t);
    const L_ = {
      key: mk('mu-lb mu-lb-mode', 'key · 琴鍵'), hammer: mk('mu-lb mu-lb-mode', 'hammer · 琴槌'), string: mk('mu-lb mu-lb-live', 'string · 弦'), damper: mk('mu-lb mu-lb-mode', 'damper · 制音器'),
      soundboard: mk('mu-lb mu-lb-mode', 'soundboard · 共鳴板'), bridge: mk('mu-lb mu-lb-tick', 'bridge · 琴馬'), jack: mk('mu-lb mu-lb-tick', 'jack · 動力桿'), pedal: mk('mu-lb mu-lb-tick', 'damper pedal · 制音踏瓣'),
    };
    const tmp = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(-0.3, 1.9, -0.6), p = V(0.85, 0.42, 0.55).normalize().multiplyScalar(fit(13.2, 8.2)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }

    function poseScene() {
      const ps = pose();
      const kr = ps.key * 0.16;
      keyPivot.rotation.x = kr;
      // 琴鍵後端的世界位置
      const ry = 0.95 + 1.5 * Math.sin(kr), rz = 0.2 - 1.5 * Math.cos(kr);
      jack.position.set(ps.jackFree ? 0.0 : 0.0, ry + 0.55, ps.jackFree ? rz - 0.35 : rz - 0.1);
      jack.rotation.x = ps.jackFree ? 0.5 : 0;
      const ang = A0 + (A1 - A0) * ps.hammer;
      hammerPivot.rotation.x = -ang;
      // 制音器：從上面壓在弦上，抬起時往上
      const dy = SY + 0.4 + 0.75 * state.damper;
      damper.position.set(0, dy, SZ);
      dArm.position.set(0, dy + 0.3, SZ - 0.95 + 0.2); dArm.visible = true;
      // 弦：基音＋第 2、3 泛音（放慢）
      const a = state.amp;
      strand.userData.set((i, t) => {
        const y = a * (0.22 * Math.sin(Math.PI * t) * Math.cos(state.phase) + 0.09 * Math.sin(2 * Math.PI * t) * Math.cos(2.002 * state.phase * 1.0) + 0.05 * Math.sin(3 * Math.PI * t) * Math.cos(3.01 * state.phase));
        return [SX0 + (SX1 - SX0) * t, SY + y];
      });
      sb.position.y = SY - 0.75 + a * 0.035 * Math.sin(state.phase * 3);
      pedal.position.y = state.pedal ? 0.3 : 0.45;
      // 標籤位置要用目前位置
      lab.place(L_.key, tmp.set(0, 0.75 + 0.2, 3.9), -2);
      lab.place(L_.hammer, head.getWorldPosition(tmp), 34);
      lab.place(L_.string, tmp.set(2.2, SY + 0.1, SZ), -30);
      lab.place(L_.damper, tmp.set(0, dy + 0.35, SZ), -16);
      lab.place(L_.soundboard, tmp.set(-4.8, SY - 0.6, SZ + 1.5), 14);
      lab.place(L_.bridge, tmp.set(-3.1, SY - 0.1, SZ - 0.1), -30);
      lab.place(L_.jack, jack.getWorldPosition(tmp), -26);
      lab.place(L_.pedal, tmp.set(3.4, 0.45, 3.4), 18);
    }
    function render() {
      poseScene(); controls.update();
      Object.values(L_).forEach((l) => { l.hidden = !state.labels; });
      renderer.render(scene, camera);
    }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }

    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    const pick = (e) => {
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const h = ray.intersectObjects(hits, false);
      return h.length ? h[0].object.userData.part : null;
    };
    cv.addEventListener('pointerdown', (e) => {
      const part = pick(e);
      if (part === 'key') { controls.enabled = false; press(state.v); cv.setPointerCapture(e.pointerId); }
      else down = { x: e.clientX, y: e.clientY, id: e.pointerId, part };
    });
    const up = (e) => {
      if (!controls.enabled) { controls.enabled = true; release(); return; }
      if (down && down.id === e.pointerId) {
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        if (moved < 6 && down.part) explain(down.part);
        down = null;
      }
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') cv.style.cursor = pick(e) ? 'pointer' : ''; });
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
    return { camera, controls, scene, render, tick, goHome };
  }
  function explain(part) {
    const p = partOf(part);
    if (p) say(`${p.en}: ${p.fn_en}`, `${p.zh}：${p.fn_zh}`);
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // 控制
  R.vel.addEventListener('input', () => { state.v = Number(R.vel.value) / 100; readouts(); });
  R.press.addEventListener('pointerdown', (e) => { e.preventDefault(); press(state.v); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => R.press.addEventListener(ev, () => { if (state.held) release(); }));
  R.press.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(state.v); } });
  R.press.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); } });
  $$('[data-pedal]').forEach((b) => b.addEventListener('click', () => setPedal(!state.pedal)));
  $$('[data-pv]').forEach((b) => b.addEventListener('click', () => { const v = Number(b.getAttribute('data-pv')) / 100; state.v = v; R.vel.value = String(Math.round(v * 100)); readouts(); press(v); setTimeout(release, 220); }));
  const tgL = $('[data-t="labels"]'), tgS = $('[data-t="slow"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  if (tgS) tgS.addEventListener('change', () => { state.slow = tgS.checked; });

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
    if (!visible) { stopVoice(); state.play = null; }
  }, { rootMargin: '120px' }).observe(root);
  watchOffscreen(spaceWrap, 0.02);

  readouts(); stageShow('rest');
  say('Press and hold the key, then let go. Watch the hammer leave the jack before it hits the string.', '按住琴鍵，再放開。看槌子在碰到弦之前，先和傳動桿分開。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, view, press, release, setPedal, pose,
    hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(),
    run: (sec) => { for (let t = 0; t < sec; t += 0.01) step(0.01); },
    render: () => { if (view) view.render(); },
    goCam: () => view && view.goHome(true),
    demo: (v) => { if (v === 'soft') { setPedal(false); press(0.1); setTimeout(release, 700); } else if (v === 'loud') { setPedal(false); press(0.95); setTimeout(release, 700); } else if (v === 'hold') { setPedal(false); press(0.6); setTimeout(release, 3500); } else if (v === 'pedal') { setPedal(true); press(0.6); setTimeout(release, 700); } },
  };
  return { ready: () => true, demo: (v) => root.__lab.demo(v) };
}

// ── 2D：八度為什麼要拉寬 ────────────────────────────────────────────────
function initStretch(root) {
  const synth = getSynth();
  const s = root.querySelector('.mu-st-b'), out = root.querySelector('.mu-st-out'), tbl = root.querySelector('.mu-st-tbl'), msg = root.querySelector('.mu-q-msg');
  const state = { B: 0.001 };
  const f2 = (B) => partialFreq(F0 / 2, 2, B);
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    const B = state.B, low = F0 / 2;
    out.innerHTML = `<b>${octaveStretchCents(B).toFixed(1)} cents</b> <small>the octave is tuned this much wide · 八度要拉寬這麼多（音分）</small>`;
    tbl.innerHTML = `<tr><th>n</th><th>${'harmonic · 整數倍'}</th><th>${'string · 弦的實際頻率'}</th><th>${'sharp by · 偏高（音分）'}</th></tr>` +
      [1, 2, 3, 4, 5, 6].map((n) => `<tr><td>${n}</td><td>${(n * low).toFixed(1)} Hz</td><td>${partialFreq(low, n, B).toFixed(1)} Hz</td><td>${sharpCents(n, B).toFixed(1)}</td></tr>`).join('');
  }
  function play(mode) {
    synth.unlock(); synth.stopAll();
    if (!(synth.state.unlocked && !synth.state.muted)) return;
    const low = F0 / 2, B = state.B, ratios = partialRatios(B, 8), amps = [1, 0.7, 0.5, 0.35, 0.25, 0.18, 0.12, 0.08];
    synth.toneInharmonic(low, ratios, amps, { dur: 3.2, gain: 0.5, damp: 0.1 });
    if (mode === 'exact') synth.toneInharmonic(low * 2, partialRatios(B, 6), amps.slice(0, 6), { dur: 3.2, gain: 0.5, damp: 0.1 });
    if (mode === 'stretched') synth.toneInharmonic(f2(B), partialRatios(B, 6), amps.slice(0, 6), { dur: 3.2, gain: 0.5, damp: 0.1 });
    const beat = Math.abs(f2(B) - low * 2);
    if (mode === 'exact') say(`The upper note is exactly 2 : 1. But the lower string's second partial is ${beat.toFixed(2)} Hz higher than that note, so they can beat.`, `上面的音剛好是 2 比 1。但下面那條弦的第二泛音比它高 ${beat.toFixed(2)} 赫，所以兩者會有拍音。`);
    else if (mode === 'stretched') say(`The upper note is tuned to the lower string's second partial: ${(2 * (f2(B) / (low * 2))).toFixed(5)} : 1, a little wider than 2 : 1.`, `上面的音對準下面那條弦的第二泛音：${(2 * (f2(B) / (low * 2))).toFixed(5)} 比 1，比 2 比 1 稍微寬一點。`);
    else say('One string alone. Its overtones are a little sharper than whole-number multiples.', '單獨一條弦。它的泛音比整數倍稍微偏高。');
  }
  s.addEventListener('input', () => { state.B = Number(s.value) / 10000; show(); });
  root.querySelectorAll('[data-sm]').forEach((b) => b.addEventListener('click', () => play(b.getAttribute('data-sm'))));
  watchOffscreen(root);
  show();
  root.__stretch = { setB: (B) => { state.B = B; s.value = String(Math.round(B * 10000)); show(); }, info: () => ({ B: state.B, stretch: octaveStretchCents(state.B), second: f2(state.B) }), play };
}

// ── 2D：這個零件做什麼？ ────────────────────────────────────────────────
function initPartQ(root) {
  const R = { k: root.querySelector('.mu-pq-k'), score: root.querySelector('.mu-pq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')], next: root.querySelector('.mu-pq-next'), fn: root.querySelector('.mu-pq-fn') };
  let qs = makePartRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  function ask() {
    tried = false; done = false;
    const p = partOf(qs[q]);
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.fn.innerHTML = `<b>${p.fn_en}</b><span class="zh">${p.fn_zh}</span>`;
    R.opts.forEach((b) => { b.className = 'mu-pq-opt'; b.disabled = false; });
    R.next.hidden = true;
    R.msg.innerHTML = 'Which part is this?<span class="zh">這是哪一個零件？</span>';
  }
  function answer(key) {
    if (done) return;
    const p = partOf(qs[q]), btn = R.opts.find((x) => x.getAttribute('data-pick') === key);
    if (key === qs[q]) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Yes: the ${p.en.toLowerCase()}.<span class="zh">答對了：${p.zh}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Read the sentence again, or look at the 3D model above.<span class="zh">不是這個。再讀一次那句話，或看上面的 3D 模型。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makePartRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.fn.innerHTML = '';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  ask();
  root.__partq = { round: () => ({ key: qs[q] }), answer, score: () => ({ first, q }) };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const a = document.querySelector('[data-mu-stretch]'); if (a) initStretch(a);
  const b = document.querySelector('[data-mu-partq]'); if (b) initPartQ(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-muspiano-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void PARTS;
