/*
 * 音樂 Music · 第十二課「國樂器有哪些？」的 3D 模型與互動（全部自繪示意；聲音由瀏覽器即時合成）。
 *
 * 一個機制：國樂器可以依「怎麼讓它發聲」分成吹、拉、彈、打；每一類各有不同的聲音，但都回到第九課的「什麼在振動」：
 *   拉（二胡）＝弓摩擦弦；彈（琵琶）＝手指勾弦再放開；吹（笛）＝氣流讓管裡的空氣振動；打（鼓）＝槌子敲皮。
 * 四個展示台：二胡（琴筒、琴桿、兩條弦、弓）、琵琶（梨形音箱、四條弦）、笛（竹管：吹孔、膜孔、六個按音孔，空氣粒子前後晃）、鼓。
 *   點一個：發聲並讓它動。零件與動作是簡化的示意；聲音是我們自己的簡單配方，不是錄音。
 *
 * 控制（點展示台、按鈕）不靠 WebGL：沒有 WebGL 時 3D 不畫，按鈕、資訊卡與小遊戲照樣能用。
 * 2D（不需要 WebGL）：「吹、拉、彈、打？」（[data-mu-wayq]，六題）、五聲音階的小鍵盤與一段自己寫的旋律（[data-mu-penta]）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-chinese.js
 * 除錯：document.querySelector('[data-muschinese-lab]').__lab
 *   state（sel、amp）、trigger(樂器)、hz()、nowPlaying()、run(秒)、render()、goCam()
 *   [data-mu-wayq].__wayq：round()、answer(方式)、score()；[data-mu-penta].__penta：press(索引)、playTune()、setInstrument(key)
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { INSTRUMENTS, MELODIC, PENTATONIC, WAYS, instrumentOf, makeWayRounds, noteFreq, recipeOf, scheduleTune, wayOf } from './chinese.js';
import { mulberry32 } from './pitch.js';
import { makeStrand } from './strand3d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const F0 = { erhu: 293.66, pipa: 261.63, dizi: 523.25, gu: 110, luo: 130.81 };
const XS = { erhu: -6.6, pipa: -2.2, dizi: 2.2, gu: 6.6 };
const COLORS = { erhu: 0xffd36e, pipa: 0xff9f7a, dizi: 0x7ef0e3, gu: 0xb79cff };
const audioOk = (s) => s.state.unlocked && !s.state.muted;

/** 讓合成器發出這件樂器的聲音（at：延遲秒數；vibrato 只給二胡的顫音用不到，簡化） */
export function playInstrument(synth, key, f0 = F0[key], gainScale = 1) {
  const r = recipeOf(key, f0);
  if (r.kind === 'complex') synth.toneComplex(f0, r.amps, { env: r.env, dur: r.dur, gain: r.gain * gainScale });
  else synth.toneInharmonic(f0, r.ratios, r.amps, { dur: r.dur, damp: r.damp, gain: r.gain * gainScale });
  if (r.noise) synth.noiseBurst({ ...r.noise, gain: r.noise.gain * gainScale });
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.mu-msg'), card: $('.mu-fam-card') };
  const state = { sel: 'erhu', amp: { erhu: 0, pipa: 0, dizi: 0, gu: 0 }, phase: 0, labels: true };
  let view = null;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const NOTES = {
    erhu: ['A bow rubs the two strings. The bow hair is held between them, so each stroke sets both strings in motion. Taiwan’s dictionary calls it a bowed string instrument.', '弓摩擦兩條弦。弓毛穿在兩條弦之間，所以一拉就同時帶動兩條弦。台灣的辭典稱它為擦弦樂器。'],
    pipa: ['A finger plucks a string and lets go, so the sound starts fast and then fades. Taiwan’s dictionary calls it a plucked string instrument, with a pear-shaped sound box.', '手指勾起弦再放開，所以聲音很快開始，再慢慢變小。台灣的辭典稱它為彈撥樂器，音箱是半梨形的。'],
    dizi: ['Breath makes the air inside a bamboo tube vibrate. The bangdi has one blow hole, one membrane hole, and six finger holes. Covering holes changes the length of the air column.', '氣流讓竹管裡的空氣振動。梆笛有一個吹孔、一個膜孔、六個按音孔。按住孔，改變空氣柱的長度。'],
    gu: ['A stick strikes the skin stretched over a hollow wooden body. The overtones of a drumhead are not whole-number multiples.', '槌子敲在蒙在中空木桶上的皮。鼓皮的泛音不是整數倍。'],
  };
  function showCard() {
    const ins = instrumentOf(state.sel), w = wayOf(ins.way);
    R.card.innerHTML =
      `<p class="al-sky-k">${ins.en} · ${ins.zh}　<small>${w.zh} · ${w.en}</small></p>` +
      `<dl class="mu-fam-dl"><dt>How it sounds · 怎麼發聲</dt><dd>${w.how_en}<span class="zh">${w.how_zh}</span></dd>` +
      `<dt>What vibrates (lesson 9) · 什麼在振動（第九課）</dt><dd>${w.hs}<span class="zh">${w.hs_zh}</span></dd>` +
      `<dt>Other instruments of this kind · 同類的樂器</dt><dd>${w.ex_zh}</dd></dl>`;
    $$('[data-ins]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-ins') === state.sel ? 'true' : 'false'));
  }
  function trigger(key) {
    state.sel = key;
    synth.unlock(); synth.stopAll();
    if (audioOk(synth)) playInstrument(synth, key);
    state.amp[key] = 1;
    showCard();
    const ins = instrumentOf(key);
    say(`${ins.en}: ${NOTES[key][0]}`, `${ins.zh}：${NOTES[key][1]}`);
  }
  function step(dt) {
    state.phase += Math.PI * 2 * 1.4 * dt;
    for (const k of Object.keys(state.amp)) state.amp[k] = state.amp[k] > 0.01 ? state.amp[k] * Math.exp(-dt / (k === 'gu' ? 0.7 : k === 'pipa' ? 1.1 : 1.6)) : 0;
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
    controls.minDistance = 6; controls.maxDistance = 36;
    controls.minPolarAngle = 0.3; controls.maxPolarAngle = Math.PI * 0.48;
    controls.minAzimuthAngle = -0.8; controls.maxAzimuthAngle = 0.8;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85), new AmbientLight(0xffffff, 0.25));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-4, 10, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 7, bottom: -4, near: 1, far: 30 });
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const wood = new MeshStandardMaterial({ color: 0x7a4a22, roughness: 0.65 });
    const lightWood = new MeshStandardMaterial({ color: 0xc89a5c, roughness: 0.6 });
    const dark = new MeshStandardMaterial({ color: 0x2b1b0e, roughness: 0.6 });
    const skin = new MeshStandardMaterial({ color: 0xe9dcc0, roughness: 0.8 });
    const bamboo = new MeshStandardMaterial({ color: 0xb59b4c, roughness: 0.55 });
    const hits = [];
    const hit = (m, k) => { m.userData.ins = k; hits.push(m); };
    const rings = {};
    for (const k of Object.keys(XS)) {
      const base = new Mesh(new CylinderGeometry(1.95, 2.05, 0.2, 48), new MeshStandardMaterial({ color: 0x1d2a4d, roughness: 0.8 }));
      base.position.set(XS[k], 0.1, 0); base.receiveShadow = true; scene.add(base);
      const ring = new Mesh(new CylinderGeometry(2.02, 2.02, 0.04, 48), new MeshBasicMaterial({ color: COLORS[k], transparent: true, opacity: 0 }));
      ring.position.set(XS[k], 0.22, 0); scene.add(ring); rings[k] = ring;
    }
    // 二胡：垂直；六角琴筒在下、琴桿往上、兩條弦、弓
    const ex = XS.erhu;
    const barrel = new Mesh(new CylinderGeometry(0.5, 0.5, 0.7, 6), wood); barrel.rotation.x = Math.PI / 2; barrel.position.set(ex, 0.95, 0); barrel.castShadow = true; scene.add(barrel); hit(barrel, 'erhu');
    const eskin = new Mesh(new CircleGeometry(0.46, 6), skin); eskin.position.set(ex, 0.95, 0.36); scene.add(eskin);
    const neck = new Mesh(new CylinderGeometry(0.07, 0.07, 3.6, 12), dark); neck.position.set(ex, 2.9, -0.0); neck.castShadow = true; scene.add(neck); hit(neck, 'erhu');
    const estr = [0, 1].map((i) => { const s = makeStrand(40, 0.018, COLORS.erhu); s.rotation.z = Math.PI / 2; scene.add(s); return s; });
    const bow = new Mesh(new BoxGeometry(2.4, 0.06, 0.08), lightWood); scene.add(bow); hit(bow, 'erhu');
    // 琵琶
    const px = XS.pipa;
    const pbody = new Mesh(new SphereGeometry(0.8, 28, 20), lightWood); pbody.scale.set(0.95, 1.35, 0.3); pbody.position.set(px, 1.35, 0); pbody.castShadow = true; scene.add(pbody); hit(pbody, 'pipa');
    const pneck = new Mesh(new BoxGeometry(0.22, 2.0, 0.12), dark); pneck.position.set(px, 3.0, 0); scene.add(pneck); hit(pneck, 'pipa');
    const phead = new Mesh(new BoxGeometry(0.4, 0.5, 0.14), dark); phead.position.set(px, 4.2, -0.1); scene.add(phead);
    const pstr = [0, 1, 2, 3].map((i) => { const s = makeStrand(40, 0.014, COLORS.pipa); s.rotation.z = Math.PI / 2; scene.add(s); return s; });
    // 笛：水平竹管；孔
    const dx = XS.dizi;
    const dtube = new Mesh(new CylinderGeometry(0.2, 0.2, 3.6, 24), bamboo); dtube.rotation.z = Math.PI / 2; dtube.position.set(dx, 2.0, 0); dtube.castShadow = true; scene.add(dtube); hit(dtube, 'dizi');
    const holes = [];
    const hx = [-1.45, -1.0, -0.2, 0.1, 0.4, 0.7, 1.0, 1.3];      // 吹孔、膜孔、六個按音孔
    hx.forEach((x, i) => {
      const h = new Mesh(new CylinderGeometry(i === 1 ? 0.1 : 0.07, i === 1 ? 0.1 : 0.07, 0.04, 16), i === 1 ? new MeshStandardMaterial({ color: 0xf1ead6 }) : dark);
      h.rotation.x = Math.PI / 2; h.position.set(dx + x, 2.0, 0.2); scene.add(h); holes.push(h);
    });
    const air = Array.from({ length: 12 }, (_, i) => { const p = new Mesh(new SphereGeometry(0.06, 10, 8), new MeshBasicMaterial({ color: COLORS.dizi })); p.userData.u = i / 11; scene.add(p); return p; });
    // 鼓
    const gx = XS.gu;
    const shell = new Mesh(new CylinderGeometry(1.2, 1.2, 1.2, 40), new MeshStandardMaterial({ color: 0xb3382a, roughness: 0.5 })); shell.position.set(gx, 0.8, 0); shell.castShadow = true; scene.add(shell); hit(shell, 'gu');
    const head = new Mesh(new CylinderGeometry(1.15, 1.15, 0.08, 40), skin); head.position.set(gx, 1.44, 0); scene.add(head); hit(head, 'gu');
    const stick = new Mesh(new CylinderGeometry(0.04, 0.04, 1.6, 8), lightWood); stick.position.set(gx + 0.9, 2.5, 0.3); stick.rotation.z = 0.6; scene.add(stick);
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = INSTRUMENTS.filter((i) => XS[i.key] !== undefined).map((i) => ({ k: i.key, el: lab.add('mu-lb mu-lb-mode', `${wayOf(i.way).zh} · ${i.zh} ${i.en}`) }));
    const tmp = V(0, 0, 0);
    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 2.4, 0), p = V(0, 0.4, 1).normalize().multiplyScalar(fit(18.4, 9.0)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function pose() {
      const A = state.amp, ph = state.phase;
      // 二胡的兩條弦：垂直，左右略分開；弓左右拉動
      estr.forEach((s, i) => {
        const x0 = ex + (i ? 0.07 : -0.07), a = A.erhu * 0.07;
        s.userData.set((j, t) => [t * 2.6, a * Math.sin(Math.PI * t) * Math.cos(ph * (i ? 1.0 : 1.5))]);
        s.position.set(x0, 1.4, 0.12);
      });
      bow.position.set(ex, 1.9, 0.18 + 0.0); bow.position.x = ex + A.erhu * 0.6 * Math.sin(ph * 0.5);
      // 琵琶的四條弦
      pstr.forEach((s, i) => {
        const a = A.pipa * (0.12 - i * 0.015);
        s.userData.set((j, t) => [t * 2.5, a * Math.sin(Math.PI * t) * Math.cos(ph * (1 + i * 0.08) * 1.2)]);
        s.position.set(px - 0.18 + i * 0.12, 1.4, 0.12);
      });
      // 笛：空氣粒子前後晃
      air.forEach((p) => {
        const u = p.userData.u;
        p.position.set(dx - 1.6 + 3.2 * u + A.dizi * 0.12 * Math.sin(ph * 2 + u * 6), 2.0 + 0.04 * Math.sin(u * 20), 0);
      });
      head.position.y = 1.44 + A.gu * 0.06 * Math.sin(ph * 6);
      head.scale.y = 1 + A.gu * 0.5 * Math.abs(Math.sin(ph * 6));
      stick.position.y = 2.5 - A.gu * 0.5 * Math.max(0, Math.sin(ph * 3)) * 0.2;
      for (const k of Object.keys(rings)) rings[k].material.opacity = k === state.sel ? 0.55 : 0;
      void holes; void phead; void eskin;
    }
    function render() {
      pose(); controls.update();
      lbs.forEach((l) => { l.el.hidden = !state.labels; if (state.labels) lab.place(l.el, tmp.set(XS[l.k], 4.7, 0), -4); });
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
      return h.length ? h[0].object.userData.ins : null;
    };
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || down.id !== e.pointerId) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const k = pick(e); if (k) trigger(k);
    });
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
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  $$('[data-ins]').forEach((b) => b.addEventListener('click', () => trigger(b.getAttribute('data-ins'))));
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
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
  }, { rootMargin: '120px' }).observe(root);
  watchOffscreen(spaceWrap, 0.02);

  showCard();
  say('Click an instrument to hear it and see what vibrates: a bowed string, a plucked string, the air in a tube, and a drumskin.', '點一件樂器，聽它的聲音，看是什麼在振動：被弓拉的弦、被撥的弦、管裡的空氣，和鼓皮。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, view, trigger,
    hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) view.render(); }, goCam: () => view && view.goHome(true),
    demo: (v) => trigger(v),
  };
  return { ready: () => true, demo: (v) => trigger(v) };
}

// ── 2D：吹、拉、彈、打？ ────────────────────────────────────────────────
function initWayQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-wq-k'), score: root.querySelector('.mu-wq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-wq-next'), listen: root.querySelector('.mu-wq-listen'), show: root.querySelector('.mu-wq-show'), hint: root.querySelector('.mu-wq-hint') };
  let qs = makeWayRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  function listen() {
    synth.unlock(); synth.stopAll();
    const r = qs[q];
    if (audioOk(synth)) playInstrument(synth, r.key, r.f0);
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “How the sound starts”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「聲音怎麼開始」。</span>';
  }
  function showHint() {
    const r = recipeOf(qs[q].key, qs[q].f0);
    const start = r.kind === 'inharmonic' ? ['a hit: it starts at once', '一下敲擊：馬上開始'] : (r.env.attack < 0.02 ? ['very fast: a pluck', '很快：像撥一下'] : r.env.attack < 0.1 ? ['fast, with a little breath', '蠻快，帶一點氣息'] : ['slow and smooth: a bow', '慢慢的、很連貫：像拉弓']);
    const keep = r.kind === 'complex' && r.env.sustain > 0 ? ['keeps going while you keep playing', '一直演奏就一直持續'] : ['fades away by itself', '自己慢慢變小'];
    const noise = r.noise ? ['with a noisy edge', '帶一點噪音'] : ['no noise', '沒有噪音'];
    const inh = r.kind === 'inharmonic' ? ['overtones are not whole numbers', '泛音不是整數倍'] : ['overtones are whole numbers', '泛音是整數倍'];
    R.hint.hidden = false;
    R.hint.innerHTML = `<span class="mu-st-k">How the sound starts · 聲音怎麼開始</span> ${start[0]}; ${keep[0]}; ${noise[0]}; ${inh[0]}.<span class="zh">${start[1]}；${keep[1]}；${noise[1]}；${inh[1]}。</span>`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-wq-opt'; b.disabled = false; });
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'Listen. How is this sound made: blown, bowed, plucked, or struck?<span class="zh">聽聽看。這個聲音是怎麼發出來的：吹、拉、彈，還是打？</span>';
  }
  function answer(key) {
    if (done) return;
    const ins = instrumentOf(qs[q].key), btn = R.opts.find((x) => x.getAttribute('data-pick') === key);
    if (key === ins.way) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      const w = wayOf(ins.way);
      R.msg.innerHTML = `Yes: the ${ins.en.toLowerCase()} is played by “${w.en.toLowerCase()}”. ${w.how_en}<span class="zh">答對了：${ins.zh}是「${w.zh}」。${w.how_zh}</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “How the sound starts”: a pluck starts very fast and fades, a bow starts slowly and keeps going, a breath has a little noise, and a hit has overtones that are not whole numbers.<span class="zh">不是這個。再聽一次，或按「聲音怎麼開始」：撥弦一開始很快、然後變小；拉弓慢慢開始、可以一直持續；吹氣帶一點噪音；敲擊的泛音不是整數倍。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listen.addEventListener('click', listen);
  R.show.addEventListener('click', showHint);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeWayRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  watchOffscreen(root);
  ask();
  root.__wayq = { round: () => ({ ...qs[q] }), answer, score: () => ({ first, q }), listen };
}

// ── 2D：五聲音階小鍵盤 ──────────────────────────────────────────────────
function initPenta(root) {
  const synth = getSynth();
  const msg = root.querySelector('.mu-q-msg');
  const state = { ins: 'erhu', timers: [] };
  const keys = [...root.querySelectorAll('[data-pn]')], insBtns = [...root.querySelectorAll('[data-pins]')];
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function press(idx) {
    synth.unlock(); synth.stopAll();
    const f = noteFreq(idx, 62), n = PENTATONIC[idx % 5];
    if (audioOk(synth)) playInstrument(synth, state.ins, f);
    keys.forEach((k) => k.classList.toggle('is-on', Number(k.getAttribute('data-pn')) === idx));
    say(`${n.zh} (${n.py}): ${f.toFixed(1)} Hz. Roughly “${n.solfege}”, but any of the five can be the tonic.`, `${n.zh}（${n.py}）：${f.toFixed(1)} 赫。大致相當於「${n.solfege}」，不過這五個音每一個都可以當主音。`);
  }
  function playTune() {
    state.timers.forEach(clearTimeout); state.timers = [];
    synth.unlock(); synth.stopAll();
    scheduleTune(96, 62).forEach((e) => {
      state.timers.push(setTimeout(() => {
        keys.forEach((k) => k.classList.toggle('is-on', Number(k.getAttribute('data-pn')) === e.i));
        if (audioOk(synth)) playInstrument(synth, state.ins, e.freq);
      }, e.time * 1000));
    });
    say('A short tune that uses only the five notes. It ends on the first note, 宮.', '一段只用這五個音的短旋律。它結束在第一個音「宮」。');
  }
  function setInstrument(k) { state.ins = k; insBtns.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pins') === k ? 'true' : 'false')); }
  keys.forEach((k) => k.addEventListener('click', () => press(Number(k.getAttribute('data-pn')))));
  insBtns.forEach((b) => b.addEventListener('click', () => setInstrument(b.getAttribute('data-pins'))));
  root.querySelector('.mu-pn-tune').addEventListener('click', playTune);
  watchOffscreen(root);
  setInstrument('erhu');
  say('Press the five notes, or play the short tune. Switch the instrument to hear the same notes in another color.', '按五個音，或播放那段短旋律。換一件樂器，聽同樣的音換一種音色。');
  root.__penta = { press, playTune, setInstrument, state };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const w = document.querySelector('[data-mu-wayq]'); if (w) initWayQ(w);
  const p = document.querySelector('[data-mu-penta]'); if (p) initPenta(p);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-muschinese-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void WAYS; void MELODIC;
