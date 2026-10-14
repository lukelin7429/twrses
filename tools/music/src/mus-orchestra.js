/*
 * 音樂 Music · 第十一課「交響樂團怎麼坐？」的 3D 座位圖與互動（全部自繪示意；聲音由瀏覽器即時合成）。
 *
 * 一個機制：管弦樂團把演奏者分成四組——弦樂、木管、銅管、打擊——坐成半圓形，指揮在中間的台上。
 * 最常見的原則是依音量由前到後：比較輕的弦樂在最前面，接著木管，再來是比較響的銅管，打擊在最後。
 * 但這是傳統，不是規定：座位因樂團、場地與指揮而不同（美式與德式的弦樂排法就不一樣）。
 * 俯視的半圓形舞台：點一個座位，那一組亮起並發出聲音；可以換美式／德式排法，也可以從上面或從觀眾席看。
 *   圓點只顯示「在哪裡」，不代表真實人數。聲音是我們自己的簡化配方，不是樂團的錄音。
 *
 * 控制（點座位、按鈕）不靠 WebGL：沒有 WebGL 時 3D 不畫，按鈕、資訊卡與小遊戲照樣能用。
 * 2D（不需要 WebGL）：一組一組加進來（[data-mu-mixer]）、「這一組坐在哪裡？」（[data-mu-seatq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-orchestra.js
 * 除錯：document.querySelector('[data-musorchestra-lab]').__lab
 *   state（sel、layout、view）、trigger(組)、playAll()、setLayout(k)、setView(k)、seats()、hz()、nowPlaying()、render()
 *   [data-mu-mixer].__mixer：toggle(組)、play()、on()；[data-mu-seatq].__seatq：round()、answer(列)、score()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PCFShadowMap, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { ROW_NAMES, SECTIONS, STRING_NAMES, makeSeatRounds, mixScale, rowRadius, sectionOf, sectionVoices, seatPlan } from './orchestra.js';
import { mulberry32 } from './pitch.js';

const V = (x, y, z) => new Vector3(x, y, z);
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;

/** 讓合成器發出這一組的聲音（scale：混音倍率） */
export function playSection(synth, key, scale = 1, delay = 0) {
  const go = () => sectionVoices(key).forEach((v) => {
    if (v.kind === 'complex') synth.toneComplex(v.freq, v.amps, { env: v.env, dur: v.dur, gain: v.gain * scale });
    else if (v.kind === 'inharmonic') synth.toneInharmonic(v.freq, v.ratios, v.amps, { dur: v.dur, damp: v.damp, gain: v.gain * scale });
    else synth.noiseBurst({ freq: v.freq, q: v.q, dur: v.dur, gain: v.gain * scale, type: v.type });
  });
  if (delay > 0) return setTimeout(go, delay * 1000);
  go(); return 0;
}
const audioOk = (s) => s.state.unlocked && !s.state.muted;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.mu-msg'), card: $('.mu-fam-card') };
  const state = { sel: 'strings', layout: 'american', view: 'top', labels: true, timers: [] };
  let view = null;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function showCard() {
    const s = sectionOf(state.sel), row = ROW_NAMES[s.row];
    R.card.innerHTML =
      `<p class="al-sky-k">${s.en} · ${s.zh}</p>` +
      `<dl class="mu-fam-dl"><dt>Where · 坐在哪裡</dt><dd>${row.en.charAt(0).toUpperCase() + row.en.slice(1)}<span class="zh">${row.zh}</span></dd>` +
      `<dt>Instruments · 樂器</dt><dd>${s.ex_en}<span class="zh">${s.ex_zh}</span></dd>` +
      `<dt>What vibrates (lesson 9) · 什麼在振動（第九課）</dt><dd>${s.hs}</dd></dl>`;
    $$('[data-sec]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-sec') === state.sel ? 'true' : 'false'));
    $$('[data-layout]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-layout') === state.layout ? 'true' : 'false'));
    $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-view') === state.view ? 'true' : 'false'));
  }
  function clearTimers() { state.timers.forEach(clearTimeout); state.timers = []; }
  function trigger(key) {
    state.sel = key; clearTimers();
    synth.unlock(); synth.stopAll();
    if (audioOk(synth)) playSection(synth, key, 1);
    showCard();
    const s = sectionOf(key);
    const hint = {
      strings: ['The strings sit at the front, in a fan around the conductor.', '弦樂坐在最前面，圍著指揮排成扇形。'],
      woodwinds: ['The woodwinds sit in rows behind the strings.', '木管坐在弦樂後面的幾排。'],
      brass: ['The brass sit behind the woodwinds, toward the back.', '銅管坐在木管後面，靠近後方。'],
      percussion: ['The percussion sit at the very back.', '打擊坐在最後面。'],
    }[key];
    say(`${s.en}: ${hint[0]} The layout of a real orchestra can vary.`, `${s.zh}：${hint[1]} 真正的樂團，排法可以不同。`);
    if (view) view.highlight(key);
  }
  function playAll() {
    clearTimers(); synth.unlock(); synth.stopAll();
    const sc = mixScale(4);
    SECTIONS.forEach((s, i) => {
      state.timers.push(setTimeout(() => { state.sel = s.key; showCard(); if (view) view.highlight(s.key); if (audioOk(synth)) playSection(synth, s.key, sc); }, i * 900));
    });
    say('One section at a time, from the front to the back: strings, woodwinds, brass, percussion.', '一組一組加進來，由前到後：弦樂、木管、銅管、打擊。');
  }
  function setLayout(k) { state.layout = k; if (view) view.rebuild(); showCard(); say(k === 'american' ? 'The “American” layout: first violins, second violins, violas, cellos, from the audience’s left.' : 'The “German” layout: the first and second violins face each other, with cellos and violas between.', k === 'american' ? '「美式」排法：從觀眾的左邊，第一小提琴、第二小提琴、中提琴、大提琴。' : '「德式」排法：第一與第二小提琴面對面，大提琴與中提琴在中間。'); }
  function setView(k) { state.view = k; if (view) view.goHome(false); showCard(); }

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
    controls.minDistance = 6; controls.maxDistance = 40;
    controls.minPolarAngle = 0.05; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.9), new AmbientLight(0xffffff, 0.3));
    const sun = new DirectionalLight(0xfff1dc, 1.1);
    sun.position.set(-4, 14, 6); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 40 });
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const stage = new Mesh(new CylinderGeometry(10.6, 10.6, 0.25, 64, 1, false, Math.PI / 2, Math.PI), new MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.7 }));
    stage.position.y = 0.125; stage.receiveShadow = true; scene.add(stage);
    // 指揮台與指揮（簡化）
    const podium = new Mesh(new CylinderGeometry(0.75, 0.85, 0.5, 24), new MeshStandardMaterial({ color: 0x3b2614, roughness: 0.6 })); podium.position.set(0, 0.5, 0); scene.add(podium);
    const body = new Mesh(new CylinderGeometry(0.28, 0.34, 1.0, 16), new MeshStandardMaterial({ color: 0xf1ead6 })); body.position.set(0, 1.25, 0); scene.add(body);
    const head = new Mesh(new SphereGeometry(0.24, 16, 12), new MeshStandardMaterial({ color: 0xe8c9a0 })); head.position.set(0, 1.95, 0); scene.add(head);
    const hits = [], seatsByKey = {};
    let seatGroup = [];
    function build() {
      seatGroup.forEach((m) => scene.remove(m)); seatGroup = []; hits.length = 0;
      Object.keys(seatsByKey).forEach((k) => { seatsByKey[k] = []; });
      seatPlan(state.layout).forEach((st) => {
        const col = sectionOf(st.section).color;
        const m = new Mesh(new CylinderGeometry(0.34, 0.34, 0.5, 20), new MeshStandardMaterial({ color: col, roughness: 0.5, emissive: col, emissiveIntensity: 0.05 }));
        m.position.set(st.x, 0.5, st.z); m.castShadow = true; m.userData.sec = st.section; m.userData.sub = st.sub;
        scene.add(m); seatGroup.push(m); hits.push(m);
        (seatsByKey[st.section] = seatsByKey[st.section] || []).push(m);
      });
    }
    build();
    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = SECTIONS.map((s) => lab.add('mu-lb mu-lb-mode', `${s.en} · ${s.zh}`));
    const lbCond = lab.add('mu-lb mu-lb-tick', 'conductor · 指揮');
    const lbAud = lab.add('mu-lb mu-lb-live', '▼ audience · 觀眾');
    const tmp = V(0, 0, 0);
    let hi = null, hiT = 0;
    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = state.view === 'top' ? V(0, 0, -3.6) : V(0, 1.0, -4.2);
      const dir = state.view === 'top' ? V(0, 1, 0.22) : V(0, 0.32, 1);
      const p = dir.normalize().multiplyScalar(fit(state.view === 'top' ? 23 : 21, state.view === 'top' ? 12 : 8)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function render() {
      hiT += 0.016;
      Object.entries(seatsByKey).forEach(([k, arr]) => arr.forEach((m) => {
        const on = k === hi;
        m.scale.setScalar(on ? 1.25 + 0.08 * Math.sin(hiT * 5) : 1);
        m.material.emissiveIntensity = on ? 0.75 : 0.05;
      }));
      controls.update();
      lbs.forEach((l, i) => { l.hidden = !state.labels; if (state.labels) lab.place(l, tmp.set(0, 0.9, -rowRadius(['strings', 'woodwinds', 'brass', 'percussion'][i]) - 0.2), i % 2 ? -4 : -4); });
      lbCond.hidden = !state.labels; if (state.labels) lab.place(lbCond, tmp.set(0, 2.3, 0), -4);
      lbAud.hidden = !state.labels; if (state.labels) lab.place(lbAud, tmp.set(0, 0.2, 2.4), 6);
      renderer.render(scene, camera);
    }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt * 1.2);
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
      return h.length ? h[0].object.userData.sec : null;
    };
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || down.id !== e.pointerId) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const s = pick(e); if (s) trigger(s);
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
    return { camera, controls, scene, render, tick, goHome, highlight: (k) => { hi = k; }, rebuild: build, seats: () => seatGroup.length };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  $$('[data-sec]').forEach((b) => b.addEventListener('click', () => trigger(b.getAttribute('data-sec'))));
  $$('[data-layout]').forEach((b) => b.addEventListener('click', () => setLayout(b.getAttribute('data-layout'))));
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.getAttribute('data-view'))));
  $('.mu-or-all').addEventListener('click', playAll);
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    if (!visible) clearTimers();
  }, { rootMargin: '120px' }).observe(root);
  watchOffscreen(spaceWrap, 0.02);

  showCard();
  say('Click a group of seats to hear that section. The dots show where each section sits, not how many players there are.', '點一群座位，聽那一組的聲音。圓點只顯示每一組坐在哪裡，不代表有多少人。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, view, trigger, playAll, setLayout, setView, seats: () => (view ? view.seats() : seatPlan(state.layout).length),
    hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: () => { if (view) view.render(); }, goCam: () => view && view.goHome(true),
    demo: (v) => (v === 'all' ? playAll() : trigger(v)),
  };
  void STRING_NAMES;
  return { ready: () => true, demo: (v) => root.__lab.demo(v) };
}

// ── 2D：一組一組加進來 ──────────────────────────────────────────────────
function initMixer(root) {
  const synth = getSynth();
  const on = new Set(['strings']);
  const bars = {}, btns = [...root.querySelectorAll('[data-mx]')];
  const msg = root.querySelector('.mu-q-msg');
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  btns.forEach((b) => { bars[b.getAttribute('data-mx')] = b.querySelector('i'); });
  function show() {
    btns.forEach((b) => b.setAttribute('aria-pressed', on.has(b.getAttribute('data-mx')) ? 'true' : 'false'));
    const sc = mixScale(on.size);
    Object.entries(bars).forEach(([k, el]) => { el.style.setProperty('--w', on.has(k) ? String(sc) : '0'); });
    root.querySelector('.mu-mx-n').textContent = `${on.size} of 4`;
  }
  function play() {
    synth.unlock(); synth.stopAll();
    if (!audioOk(synth) || !on.size) return;
    const sc = mixScale(on.size);
    [...on].forEach((k) => playSection(synth, k, sc));
    say(`${on.size} ${on.size === 1 ? 'section is' : 'sections are'} playing the same chord. Each one gets a smaller share of the volume, so the total stays comfortable.`, `${on.size} 組一起奏同一個和弦。每一組分到的音量比較小，總音量才不會太大。`);
  }
  btns.forEach((b) => b.addEventListener('click', () => { const k = b.getAttribute('data-mx'); if (on.has(k)) on.delete(k); else on.add(k); show(); }));
  root.querySelector('.mu-mx-play').addEventListener('click', play);
  watchOffscreen(root);
  show();
  say('Turn sections on, then press play. Strings alone are one color. Add the others and the sound gets fuller.', '把幾組打開，再按播放。只有弦樂是一種顏色；加上其他組，聲音會越來越豐富。');
  root.__mixer = { toggle: (k) => { if (on.has(k)) on.delete(k); else on.add(k); show(); }, play, on: () => [...on] };
}

// ── 2D：這一組坐在哪裡？ ────────────────────────────────────────────────
function initSeatQ(root) {
  const R = { k: root.querySelector('.mu-sq2-k'), score: root.querySelector('.mu-sq2-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-row]')], next: root.querySelector('.mu-sq2-next'), what: root.querySelector('.mu-sq2-what') };
  let qs = makeSeatRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  function ask() {
    tried = false; done = false;
    const s = sectionOf(qs[q]);
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.what.innerHTML = `Where do the <b>${s.en.toLowerCase()}</b> usually sit? <span class="zh">${s.zh}通常坐在哪裡？</span><small>${s.ex_en} · ${s.ex_zh}</small>`;
    R.opts.forEach((b) => { b.className = 'mu-sq2-opt'; b.disabled = false; });
    R.next.hidden = true;
    R.msg.innerHTML = 'Think about which sections are softer and which are louder.<span class="zh">想一想哪些組比較輕、哪些比較響。</span>';
  }
  function answer(row) {
    if (done) return;
    const s = sectionOf(qs[q]), btn = R.opts.find((x) => Number(x.getAttribute('data-row')) === row);
    if (row === s.row) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Yes: ${ROW_NAMES[row].en}. A general principle is to arrange sections by volume, softer in front and louder behind, but conductors adjust the layout for the music and the hall.<span class="zh">答對了：${ROW_NAMES[row].zh}。一個通則是依音量排：輕的在前、響的在後；但指揮會依曲子和場地調整。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that row. The strings are at the front, then the woodwinds, then the brass, and the percussion are at the back.<span class="zh">不是這一排。弦樂在最前面，接著是木管，再來是銅管，打擊在最後。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(Number(b.getAttribute('data-row')))));
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeSeatRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成'; R.what.innerHTML = '';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  ask();
  root.__seatq = { round: () => ({ section: qs[q], row: sectionOf(qs[q]).row }), answer, score: () => ({ first, q }) };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const m = document.querySelector('[data-mu-mixer]'); if (m) initMixer(m);
  const q = document.querySelector('[data-mu-seatq]'); if (q) initSeatQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musorchestra-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
