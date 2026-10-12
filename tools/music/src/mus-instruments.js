/*
 * 音樂 Music · 第九課「樂器怎麼發出聲音？」的 3D 模型與互動（全部自繪示意；聲音由瀏覽器即時合成）。
 *
 * 一個機制：**所有樂器的聲音都來自某個東西在振動；樂器按「是什麼在振動」分成四個家族——
 * 弦、空氣柱、膜、體（棒、板、鐘）。** 四個展示台並排：
 *   弦：單弦琴，弦同時用整根、一半、三分之一……振動        空氣柱：一端封閉的管，管裡的空氣前後晃動（封閉端不動、開口端晃最大）
 *   膜：鼓皮的兩種振動圖樣（(0,1) 整個鼓起來、(1,1) 兩半一上一下）  體：一根棒，兩端和中間反向彎（兩端自由的第一個模式）
 * 點展示台：發出那個家族的聲音（簡化配方：弦＝諧波、空氣柱＝奇數諧波＋一點氣息、膜＝非整數倍＋「碰」、體＝非整數倍）並讓它振動。
 * 振動畫面是放慢的示意（基音每秒約 1.2 次），各模式的頻率比照真的。
 *
 * 控制（點展示台、家族按鈕）不靠 WebGL：沒有 WebGL 時 3D 不畫，按鈕與右邊的資訊照樣能用。
 * 2D（不需要 WebGL）：「怎麼讓它變高？」（[data-mu-pitchup]）、「這是哪一家的聲音？」（[data-mu-famq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-instruments.js
 * 除錯：document.querySelector('[data-musinstruments-lab]').__lab
 *   state（sel、amp）、trigger(家族)、info(家族)、hz()、nowPlaying()、demo('string'|'air'|'membrane'|'body')、run(秒)、render()、goCam()
 *   [data-mu-pitchup].__pitchup：set(家族, 值)、freq(家族)；[data-mu-famq].__famq：round()、answer(家族)、score()
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { FAMILIES, airPartials, barFreq, barMode, barRatios, closedPipeDisp, drumFreq, familyOf, makeFamilyRounds, membraneMode01, membraneMode11, MEMBRANE_RATIOS, pipeFreq, recipe, stringFreq, stringPartials, BELL_RATIOS } from './instruments.js';
import { mulberry32 } from './pitch.js';
import { makeStrand } from './strand3d.js';

const F0 = { string: 220, air: 262, membrane: 150, body: 330 };
const VIS = 1.2;                         // 基音每秒振動幾次（放慢後）
const V = (x, y, z) => new Vector3(x, y, z);
const XS = { string: -6.6, air: -2.2, membrane: 2.2, body: 6.6 };
const COLORS = { string: 0xffd36e, air: 0x7ef0e3, membrane: 0xff9f7a, body: 0xb79cff };
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const fmt = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(f < 100 ? 1 : 0));
const ratioText = (r) => r.map((x) => (Number.isInteger(x) ? String(x) : (x + 1e-9).toFixed(2))).join(' : ');

/** 這個家族實際用的泛音比（顯示用） */
export function ratiosOf(fam) {
  if (fam === 'string') return stringPartials(5).ratios;
  if (fam === 'air') return airPartials(true, 4).ratios;
  if (fam === 'membrane') return MEMBRANE_RATIOS.slice();
  return barRatios();
}
/** 讓合成器發出這個家族的聲音（f0：基音頻率；variant：1＝鐘、0＝棒，只有「體」用） */
export function playFamily(synth, fam, f0, variant = 0) {
  const r = recipe(fam, f0, variant);
  if (r.kind === 'complex') synth.toneComplex(f0, r.amps, { env: r.env, dur: r.dur, gain: 0.8 });
  else synth.toneInharmonic(f0, r.ratios, r.amps, { dur: r.dur, damp: r.damp, gain: 0.8 });
  if (r.noise) synth.noiseBurst({ ...r.noise });
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.mu-msg'), card: $('.mu-fam-card') };
  const state = { sel: 'string', amp: { string: 0, air: 0, membrane: 0, body: 0 }, phase: 0, labels: true, t: 0 };
  let view = null;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function info(fam) {
    const f = familyOf(fam);
    return { family: fam, f0: F0[fam], hs: f.hs_zh, ratios: ratiosOf(fam), vibrates: f.vibrates_en, start: f.start_en, pitch: f.pitch_en };
  }
  function showCard() {
    const f = familyOf(state.sel), i = info(state.sel);
    R.card.innerHTML =
      `<p class="al-sky-k">${f.icon} ${f.en} · ${f.zh}　<small>${f.hs_en} · ${f.hs_zh}</small></p>` +
      `<dl class="mu-fam-dl"><dt>What vibrates · 什麼在振動</dt><dd>${f.vibrates_en}<span class="zh">${f.vibrates_zh}</span></dd>` +
      `<dt>How it starts · 怎麼開始</dt><dd>${f.start_en}<span class="zh">${f.start_zh}</span></dd>` +
      `<dt>How to go higher · 怎麼變高</dt><dd>${f.pitch_en}<span class="zh">${f.pitch_zh}</span></dd>` +
      `<dt>Overtones, relative to the lowest · 泛音比（相對最低音）</dt><dd class="mu-fam-ratio">${ratioText(i.ratios)}</dd>` +
      `<dt>Examples · 例子</dt><dd>${f.ex_en}<span class="zh">${f.ex_zh}</span></dd></dl>`;
    $$('[data-fam]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-fam') === state.sel ? 'true' : 'false'));
  }
  function trigger(fam) {
    state.sel = fam;
    synth.unlock(); synth.stopAll();
    if (synth.state.unlocked && !synth.state.muted) playFamily(synth, fam, F0[fam]);
    state.amp[fam] = 1;
    showCard();
    const f = familyOf(fam);
    const notes = {
      string: ['The string shakes as a whole, and in halves, thirds, and more, all at once. The overtones are 1, 2, 3, 4… times the lowest.', '弦同時整根、一半、三分之一……地振動。泛音是最低音的 1、2、3、4……倍。'],
      air: ['The air inside the tube moves back and forth. This tube is closed at the bottom, so the air cannot move there, and it moves the most at the open top. Only the odd harmonics, 1, 3, 5…, appear.', '管子裡的空氣前後晃動。這根管子下面封閉，空氣在那裡動不了，在開口的上面晃得最大。只有奇數諧波 1、3、5……會出現。'],
      membrane: ['The drumhead shakes in patterns that are not whole-number multiples: 1, 1.59, 2.14, 2.30, 2.92. That is why a drum sounds different from a string.', '鼓皮的振動圖樣不是整數倍：1、1.59、2.14、2.30、2.92。這就是鼓聽起來和弦不一樣的原因。'],
      body: ['The bar bends and shakes. Its overtones are 1, 2.76, 5.40, 8.93 times the lowest, not whole numbers either.', '棒彎曲振動。它的泛音是最低音的 1、2.76、5.40、8.93 倍，也不是整數倍。'],
    }[fam];
    say(`${f.en}: ${notes[0]}`, `${f.zh}：${notes[1]}`);
  }

  function step(dt) {
    state.t += dt;
    state.phase += Math.PI * 2 * VIS * dt;
    for (const k of Object.keys(state.amp)) state.amp[k] = state.amp[k] > 0.01 ? state.amp[k] * Math.exp(-dt / (k === 'membrane' ? 0.7 : k === 'body' ? 1.4 : 1.1)) : 0;
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
    controls.minDistance = 6; controls.maxDistance = 34;
    controls.minPolarAngle = 0.3; controls.maxPolarAngle = Math.PI * 0.48;
    controls.minAzimuthAngle = -0.8; controls.maxAzimuthAngle = 0.8;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8), new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-4, 10, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 6, bottom: -4, near: 1, far: 30 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const wood = new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.72 });
    const woodTop = new MeshStandardMaterial({ color: 0xc89a5c, roughness: 0.6 });
    const dark = new MeshStandardMaterial({ color: 0x3b2614, roughness: 0.6 });
    const hits = [];   // [{ mesh, fam }]
    const addHit = (m, fam) => { m.userData.fam = fam; hits.push(m); };
    // 展示台底座與選取光圈
    const rings = {};
    for (const k of Object.keys(XS)) {
      const base = new Mesh(new CylinderGeometry(1.95, 2.05, 0.2, 48), new MeshStandardMaterial({ color: 0x1d2a4d, roughness: 0.8 }));
      base.position.set(XS[k], 0.1, 0); base.receiveShadow = true; scene.add(base);
      const ring = new Mesh(new CylinderGeometry(2.02, 2.02, 0.04, 48), new MeshBasicMaterial({ color: COLORS[k], transparent: true, opacity: 0.0 }));
      ring.position.set(XS[k], 0.22, 0); scene.add(ring); rings[k] = ring;
    }

    // ── 弦：單弦琴 ───────────────────────────────────────────
    const sx = XS.string, SL = 3.0;
    const sBody = new Mesh(new BoxGeometry(SL + 0.8, 0.5, 1.5), wood); sBody.position.set(sx, 0.45, 0); sBody.castShadow = true; sBody.receiveShadow = true; scene.add(sBody); addHit(sBody, 'string');
    const sTop = new Mesh(new BoxGeometry(SL + 0.5, 0.05, 1.3), woodTop); sTop.position.set(sx, 0.72, 0); scene.add(sTop); addHit(sTop, 'string');
    const sHole = new Mesh(new CylinderGeometry(0.34, 0.34, 0.02, 32), dark); sHole.position.set(sx - 0.2, 0.76, 0.1); scene.add(sHole);
    for (const d of [-1, 1]) { const b = new Mesh(new BoxGeometry(0.14, 0.26, 0.6), dark); b.position.set(sx + d * SL / 2, 0.88, 0); scene.add(b); }
    const strand = makeStrand(60, 0.03, COLORS.string); scene.add(strand);

    // ── 空氣柱：一端封閉的管 ───────────────────────────────────
    const ax = XS.air, TH = 3.2, TY = 0.35;
    const tube = new Mesh(new CylinderGeometry(0.42, 0.42, TH, 36, 1, true), new MeshStandardMaterial({ color: 0xbfe9ee, transparent: true, opacity: 0.28, roughness: 0.2, side: DoubleSide, depthWrite: false }));
    tube.position.set(ax, TY + TH / 2, 0); scene.add(tube); addHit(tube, 'air');
    const cap = new Mesh(new CylinderGeometry(0.46, 0.46, 0.12, 36), dark); cap.position.set(ax, TY - 0.04, 0); cap.castShadow = true; scene.add(cap); addHit(cap, 'air');
    const lip = new Mesh(new BoxGeometry(0.5, 0.1, 0.5), woodTop); lip.position.set(ax + 0.52, TY + TH - 0.2, 0); scene.add(lip);
    const NP = 16, parts = [];
    for (let i = 0; i < NP; i++) {
      const p = new Mesh(new SphereGeometry(0.075, 12, 8), new MeshBasicMaterial({ color: COLORS.air }));
      const x = i / (NP - 1);
      p.userData.u = x; p.userData.row = i % 3;
      scene.add(p); parts.push(p);
    }

    // ── 膜：鼓 ───────────────────────────────────────────────
    const mx = XS.membrane, MR = 1.3, DY = 1.15;
    const shell = new Mesh(new CylinderGeometry(MR + 0.04, MR + 0.04, DY, 48, 1, true), new MeshStandardMaterial({ color: 0xb3382a, roughness: 0.5, side: DoubleSide }));
    shell.position.set(mx, DY / 2 + 0.1, 0); shell.castShadow = true; scene.add(shell); addHit(shell, 'membrane');
    const hoop = new Mesh(new CylinderGeometry(MR + 0.08, MR + 0.08, 0.08, 48), new MeshStandardMaterial({ color: 0xb8bcc8, metalness: 0.8, roughness: 0.3 }));
    hoop.position.set(mx, DY + 0.1, 0); scene.add(hoop);
    const RR = 12, SS = 48;
    const hpos = new Float32Array((RR * SS + 1) * 3), hidx = [];
    for (let r = 0; r < RR; r++) for (let s = 0; s < SS; s++) {
      const a = 1 + r * SS + s, b = 1 + r * SS + ((s + 1) % SS);
      if (r === 0) hidx.push(0, b, a); else { const c = 1 + (r - 1) * SS + s, d = 1 + (r - 1) * SS + ((s + 1) % SS); hidx.push(c, d, a, d, b, a); }
    }
    const hg = new BufferGeometry(); hg.setAttribute('position', new BufferAttribute(hpos, 3)); hg.setIndex(hidx);
    const head = new Mesh(hg, new MeshStandardMaterial({ color: 0xf1ead6, roughness: 0.7, side: DoubleSide })); head.frustumCulled = false; head.castShadow = true; scene.add(head); addHit(head, 'membrane');
    function poseHead(a) {
      const h0 = DY + 0.12;
      hpos[0] = mx; hpos[1] = h0 + a * 0.42 * membraneMode01(0) * Math.cos(state.phase) * 0.8; hpos[2] = 0;
      for (let r = 0; r < RR; r++) for (let s = 0; s < SS; s++) {
        const rho = (r + 1) / RR, th = (s / SS) * Math.PI * 2, o = (1 + r * SS + s) * 3;
        const y = a * 0.42 * (0.8 * membraneMode01(rho) * Math.cos(state.phase) + 0.5 * membraneMode11(rho, th) * 1.5 * Math.cos(state.phase * MEMBRANE_RATIOS[1] + 0.8));
        hpos[o] = mx + rho * MR * Math.cos(th); hpos[o + 1] = h0 + y; hpos[o + 2] = rho * MR * Math.sin(th);
      }
      hg.attributes.position.needsUpdate = true; hg.computeVertexNormals();
    }

    // ── 體：棒（馬林巴琴的一根琴鍵）＋共鳴管 ─────────────────
    const bx = XS.body, BLN = 3.2, BY = 1.15;
    const bar = makeStrand(60, 0.17, COLORS.body); bar.castShadow = true; scene.add(bar);
    const barHit = new Mesh(new BoxGeometry(BLN, 0.7, 0.6), new MeshBasicMaterial({ visible: false })); barHit.position.set(bx, BY, 0); scene.add(barHit); addHit(barHit, 'body');
    for (const d of [-1, 1]) {
      const post = new Mesh(new BoxGeometry(0.16, 0.7, 0.5), dark); post.position.set(bx + d * BLN * (0.5 - 0.224), 0.58, 0); post.castShadow = true; scene.add(post);
    }
    const reso = new Mesh(new CylinderGeometry(0.28, 0.28, 0.9, 28, 1, true), new MeshStandardMaterial({ color: 0xb8bcc8, metalness: 0.8, roughness: 0.35, side: DoubleSide }));
    reso.position.set(bx, 0.6, 0); reso.rotation.z = Math.PI / 2; reso.scale.set(1, 1, 1); scene.add(reso);
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = FAMILIES.map((f) => lab.add('mu-lb mu-lb-mode', `${f.icon} ${f.en} · ${f.zh}`));
    const lbHint = FAMILIES.map(() => lab.add('mu-lb mu-lb-tick', 'click · 點一下'));
    const tmp = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 1.7, 0.2), p = V(0, 0.5, 1).normalize().multiplyScalar(fit(18.2, 6.0)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }

    function pose() {
      const A = state.amp;
      // 弦：基音＋第 2、3 諧波
      strand.userData.set((i, t) => {
        const a = A.string, ph = state.phase;
        const y = a * (0.36 * Math.sin(Math.PI * t) * Math.cos(ph) + 0.18 * Math.sin(2 * Math.PI * t) * Math.cos(2 * ph) + 0.12 * Math.sin(3 * Math.PI * t) * Math.cos(3 * ph));
        return [sx - SL / 2 + SL * t, 0.95 + y];
      });
      // 空氣柱：粒子沿管軸前後晃（封閉端 u=0 不動，開口端 u=1 最大）
      parts.forEach((p) => {
        const u = p.userData.u, d = A.air * 0.2 * closedPipeDisp(u) * Math.cos(state.phase);
        p.position.set(ax + (p.userData.row - 1) * 0.16, TY + 0.15 + u * (TH - 0.3) + d, (p.userData.row === 1 ? 0.1 : -0.05));
      });
      poseHead(A.membrane);
      // 棒：第一個模式＋第二個模式（比值 2.757）
      const r2 = barRatios()[1];
      bar.userData.set((i, t) => {
        const y = A.body * (0.14 * barMode(1, t) * Math.cos(state.phase) + 0.05 * barMode(2, t) * Math.cos(state.phase * r2 + 0.6));
        return [bx - BLN / 2 + BLN * t, BY + y];
      });
      for (const k of Object.keys(rings)) rings[k].material.opacity = k === state.sel ? 0.55 : 0.0;
    }
    function labels() {
      FAMILIES.forEach((f, i) => {
        lbs[i].hidden = !state.labels;
        lbHint[i].hidden = !state.labels;
        if (state.labels) {
          lab.place(lbs[i], tmp.set(XS[f.key], 3.95, 0), -4);
          lab.place(lbHint[i], tmp.set(XS[f.key], 0.1, 1.4), 18);
        }
      });
    }
    function render() { pose(); controls.update(); labels(); renderer.render(scene, camera); }
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
      return h.length ? h[0].object.userData.fam : null;
    };
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || down.id !== e.pointerId) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const fam = pick(e);
      if (fam) trigger(fam);
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

  $$('[data-fam]').forEach((b) => b.addEventListener('click', () => trigger(b.getAttribute('data-fam'))));
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
  say('Click a stand to hear that family and watch what vibrates. Each one makes sound in a different way.', '點一個展示台，聽那一家的聲音，看是什麼在振動。每一家發聲的方式都不一樣。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, view, info, trigger,
    hz: () => synth.hz(),
    nowPlaying: () => synth.nowPlaying(),
    demo: (v) => trigger(v),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => trigger(v) };
}

// ── 2D：怎麼讓它變高？ ──────────────────────────────────────────────────
function initPitchUp(root) {
  const synth = getSynth();
  const cards = {};
  const LAW = {
    string: { f0: 220, min: 50, max: 100, val: 100, fn: (v) => stringFreq(220, v / 100), name: (v) => `string length ${v}%`, zhname: (v) => `弦長 ${v}%`, dir: -1 },
    air: { f0: 262, min: 50, max: 100, val: 100, fn: (v) => pipeFreq(262, v / 100), name: (v) => `tube length ${v}%`, zhname: (v) => `管長 ${v}%`, dir: -1 },
    membrane: { f0: 150, min: 100, max: 400, val: 100, fn: (v) => drumFreq(150, v / 100), name: (v) => `head tension ×${(v / 100).toFixed(1)}`, zhname: (v) => `鼓皮張力 ×${(v / 100).toFixed(1)}`, dir: 1 },
    body: { f0: 330, min: 60, max: 100, val: 100, fn: (v) => barFreq(330, v / 100), name: (v) => `bar length ${v}%`, zhname: (v) => `棒長 ${v}%`, dir: -1 },
  };
  root.querySelectorAll('[data-pu]').forEach((card) => {
    const k = card.getAttribute('data-pu'), L = LAW[k];
    const s = card.querySelector('input'), out = card.querySelector('.mu-pu-out'), btn = card.querySelector('.mu-pu-play');
    cards[k] = { s, out };
    const show = () => {
      const v = Number(s.value), f = L.fn(v);
      out.innerHTML = `<b>${fmt(f)} Hz</b> <small>× ${(f / L.f0).toFixed(2)} · ${L.name(v)} · ${L.zhname(v)}</small>`;
    };
    const play = () => {
      synth.unlock(); synth.stopAll();
      if (!(synth.state.unlocked && !synth.state.muted)) return;
      const f = L.fn(Number(s.value));
      playFamily(synth, k, f);
    };
    s.addEventListener('input', show);
    s.addEventListener('change', play);
    btn.addEventListener('click', play);
    show();
  });
  watchOffscreen(root);
  root.__pitchup = {
    set: (k, v) => { cards[k].s.value = String(v); cards[k].s.dispatchEvent(new Event('input')); },
    freq: (k) => LAW[k].fn(Number(cards[k].s.value)),
  };
}

// ── 2D：這是哪一家的聲音？ ──────────────────────────────────────────────
function initFamQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-fq-k'), score: root.querySelector('.mu-fq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-fq-next'), listen: root.querySelector('.mu-fq-listen'), show: root.querySelector('.mu-fq-show'), pat: root.querySelector('.mu-fq-pat') };
  let qs = makeFamilyRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const cur = () => qs[q];
  const ratiosFor = (r) => (r.family === 'body' && r.variant ? BELL_RATIOS : ratiosOf(r.family));
  function listen() {
    synth.unlock(); synth.stopAll();
    const r = cur();
    if (synth.state.unlocked && !synth.state.muted) playFamily(synth, r.family, r.f0, r.variant);
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “Show the overtones”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「看泛音」。</span>';
  }
  function showOver() {
    const r = cur();
    R.pat.hidden = false;
    R.pat.innerHTML = `<span class="mu-st-k">Overtones, relative to the lowest · 泛音比（相對最低音）</span> <b>${ratioText(ratiosFor(r))}</b>`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-fq-opt'; b.disabled = false; });
    R.next.hidden = true; R.pat.hidden = true; R.pat.textContent = '';
    R.msg.innerHTML = 'Listen. What is vibrating to make this sound?<span class="zh">聽聽看。是什麼在振動，發出這個聲音？</span>';
  }
  function answer(key) {
    if (done) return;
    const r = cur(), btn = R.opts.find((x) => x.getAttribute('data-pick') === key), f = familyOf(r.family);
    if (key === r.family) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showOver();
      const what = r.family === 'body' && r.variant ? ['a bell', '一個鐘'] : [f.vibrates_en, f.vibrates_zh];
      R.msg.innerHTML = `Yes: ${f.en}. The sound comes from ${what[0]}.<span class="zh">答對了：${f.zh}。聲音來自${what[1]}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “Show the overtones”: whole numbers 1, 2, 3 suggest a string; only odd numbers suggest a closed pipe; numbers that are not whole belong to a drum or a bar or bell.<span class="zh">不是這個。再聽一次，或按「看泛音」：整數 1、2、3 是弦；只有奇數是封閉的管；不是整數的，是鼓、棒或鐘。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listen.addEventListener('click', listen);
  R.show.addEventListener('click', showOver);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeFamilyRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  root.__famq = { round: () => ({ ...cur() }), answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const p = document.querySelector('[data-mu-pitchup]'); if (p) initPitchUp(p);
  const f = document.querySelector('[data-mu-famq]'); if (f) initFamQ(f);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musinstruments-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
