/*
 * 書法 · 第十課「故宮裡的書法國寶」的 3D 模型（全部自繪示意；牆上的作品是有授權的影像貼圖）。
 *
 * 一間示意的展廳，牆上的展櫃裡有五件作品（root 的 data-works：[{ key, img, aspect, en, zh, who_*, when_*, script_*, text_* }]）。
 *   data-mode="tour"   逛展廳：點作品（或 data-work 按鈕、上一件／下一件）鏡頭飛過去，右側顯示作者、年代、字體、說明
 *   data-mode="light"  燈光實驗：展廳中間的展櫃裡有一條染色的試紙，左半邊用卡紙蓋住。調照度（.cg-lux 滑桿，對數刻度），
 *                      按「展 40 天」或「展一年」（data-days），試紙沒蓋住的那一半照「累積曝光量＝照度 × 時間」慢慢褪色，展廳也跟著變亮變暗。
 *                      褪色的快慢是示意（fade＝1−e^(−E/E0)，E0 是 data-e0，單位 lux·小時），不是任何一件文物的實測；
 *                      要講的只有一件事：光造成的傷害會累積，所以燈要暗、展期要短、展完要休息。
 *                      真的數字只有故宮自己的規定（gallery2d.js 的 LIMIT）：限展書畫一年累積不高於 16,000 lux·小時，
 *                      書畫照度不高於 50 lux——「50 lux、每天 8 小時，可展 40 天」。面板上算的是「這個亮度幾天用完一年的額度」。
 * 展廳與作品的大小不是照比例（真的作品很小，本幅高度多半不到 30 公分）。
 * 2D（不需要 WebGL）：「這是哪一件？」（gallery2d.js）、練字板（pad.js，沿用第七課三種字體的永之水）。
 *
 * 產物：cd tools/callig && npm run build → assets/js/cal-gallery.js
 * 除錯：document.querySelector('[data-calgallery-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, Color, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, PlaneGeometry, Raycaster, SRGBColorSpace, Scene, SpotLight, TextureLoader, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp } from './brush.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { LIMIT, daysToLimit, exposure, fadeOf, initMatch, luxFromSlider, sliderFromLux } from './gallery2d.js';
import { initPad } from './pad.js';
import { CHAR_KEYS, FORMS, SCRIPTS } from './speed2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const num = (v) => (v >= 10 ? String(Math.round(v)) : v.toFixed(1).replace(/\.0$/, ''));   // 4.0 → 4、0.4 → 0.4、12.3 → 12
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const ROOM = { w: 19, d: 9, h: 4.6, wallZ: -3.2 };
const SLOT = { w: 2.7, h: 1.7, y: 1.95, gap: 3.5 };   // 每件作品最大的寬、高，中心高度，間距
const CASE = { x: 0, z: 1.3, w: 2.6, d: 1.0, h: 0.95 };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const WORKS = JSON.parse(root.getAttribute('data-works') || '[]');
  const E0 = Number(root.getAttribute('data-e0') || 1.5e6);
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x070b14);
  const camera = new PerspectiveCamera(40, 1, 0.05, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 1.2; controls.maxDistance = 22;
  controls.maxPolarAngle = Math.PI * 0.52; controls.minPolarAngle = Math.PI * 0.2;
  controls.minAzimuthAngle = -Math.PI * 0.42; controls.maxAzimuthAngle = Math.PI * 0.42;

  const hemi = new HemisphereLight(0xfff1dc, 0x1a1410, 0.5);
  const amb = new AmbientLight(0xffffff, 0.2);
  const sun = new DirectionalLight(0xfff4e2, 0.4);
  sun.position.set(2, 8, 6);
  scene.add(hemi, amb, sun);

  // ---------- 展廳 ----------
  const wallMat = new MeshStandardMaterial({ color: 0x3a5068, roughness: 0.95 });
  const floorTex = canvasTex((g, W, H) => {
    g.fillStyle = '#5a4634'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? 'rgba(0,0,0,.10)' : 'rgba(255,255,255,.04)'; g.fillRect((i * W) / 16, 0, W / 16 - 2, H); }
    for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(30,18,8,${Math.random() * 0.12})`; g.fillRect(Math.random() * W, Math.random() * H, 30 + Math.random() * 90, 1.5); }
  }, 1024, 512);
  const floor = new Mesh(new PlaneGeometry(ROOM.w, ROOM.d), new MeshStandardMaterial({ map: floorTex, roughness: 0.6 }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, ROOM.wallZ + ROOM.d / 2);
  const back = new Mesh(new PlaneGeometry(ROOM.w, ROOM.h), wallMat); back.position.set(0, ROOM.h / 2, ROOM.wallZ);
  const left = new Mesh(new PlaneGeometry(ROOM.d, ROOM.h), wallMat); left.rotation.y = Math.PI / 2; left.position.set(-ROOM.w / 2, ROOM.h / 2, ROOM.wallZ + ROOM.d / 2);
  const right = new Mesh(new PlaneGeometry(ROOM.d, ROOM.h), wallMat); right.rotation.y = -Math.PI / 2; right.position.set(ROOM.w / 2, ROOM.h / 2, ROOM.wallZ + ROOM.d / 2);
  const skirt = new Mesh(new BoxGeometry(ROOM.w, 0.16, 0.06), new MeshStandardMaterial({ color: 0x141c26, roughness: 0.8 })); skirt.position.set(0, 0.08, ROOM.wallZ + 0.03);
  scene.add(floor, back, left, right, skirt);
  // 牆上的展櫃：一條長長的凹槽
  const niche = new Mesh(new BoxGeometry(ROOM.w - 1.6, SLOT.h + 0.9, 0.08), new MeshStandardMaterial({ color: 0x1a2733, roughness: 0.9 }));
  niche.position.set(0, SLOT.y, ROOM.wallZ + 0.04); scene.add(niche);

  const loader = new TextureLoader();
  const picks = [];
  const lab = labeler($('.al-labels'), cv, camera);
  const n = WORKS.length, x0 = -((n - 1) * SLOT.gap) / 2;
  const works = WORKS.map((w, i) => {
    const a = w.aspect || 1.5;
    const pw = a >= SLOT.w / SLOT.h ? SLOT.w : SLOT.h * a, ph = pw / a;
    const x = x0 + i * SLOT.gap, z = ROOM.wallZ + 0.1;
    const g = new Group(); g.position.set(x, SLOT.y, z);
    const mount = new Mesh(new PlaneGeometry(pw + 0.3, ph + 0.3), new MeshStandardMaterial({ color: 0xd9cfb8, roughness: 0.95 }));
    const ph0 = canvasTex((c, W, H) => {   // 圖還沒載入（或載不到）時：米色的紙，上面寫作品名
      c.fillStyle = '#e9dfc6'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#3a3226'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = `700 ${Math.round(H * 0.16)}px "PingFang TC", "Microsoft JhengHei", sans-serif`; c.fillText(w.zh, W / 2, H / 2);
    }, 512, Math.max(64, Math.round(512 / a)));
    const mat = new MeshStandardMaterial({ map: ph0, roughness: 0.9 });
    const art = new Mesh(new PlaneGeometry(pw, ph), mat); art.position.z = 0.012;
    art.userData.work = i; picks.push(art);
    if (w.img) loader.load(w.img, (t) => { t.colorSpace = SRGBColorSpace; t.anisotropy = 4; mat.map = t; mat.needsUpdate = true; });
    const plaque = new Mesh(new PlaneGeometry(0.9, 0.16), new MeshStandardMaterial({ color: 0xb9c2cc, roughness: 0.7 })); plaque.position.set(0, -ph / 2 - 0.3, 0.012);
    g.add(mount, art, plaque); scene.add(g);
    const spot = new SpotLight(0xfff0d8, 26, 9, 0.42, 0.55, 1.4);
    spot.position.set(x, ROOM.h - 0.2, z + 2.3); spot.target = art; scene.add(spot);
    const lb = lab.add('cg-lb cg-lb-m cg-lb-work', `<b>${w.zh}</b><small>${w.who_zh}</small>`);
    return { ...w, i, x, pw, ph, group: g, art, spot, label: lb, pos: V(x, SLOT.y, z) };
  });

  // ---------- 燈光實驗的展櫃與試紙 ----------
  const caseG = new Group(); caseG.position.set(CASE.x, 0, CASE.z);
  const base = new Mesh(new BoxGeometry(CASE.w, CASE.h, CASE.d), new MeshStandardMaterial({ color: 0x1b2430, roughness: 0.8 })); base.position.y = CASE.h / 2;
  const glass = new Mesh(new BoxGeometry(CASE.w, 0.34, CASE.d), new MeshStandardMaterial({ color: 0xbfe2ff, transparent: true, opacity: 0.12, roughness: 0.1, depthWrite: false })); glass.position.y = CASE.h + 0.17;
  const stripCv = document.createElement('canvas'); stripCv.width = 768; stripCv.height = 256;
  const stripTex = new CanvasTexture(stripCv); stripTex.colorSpace = SRGBColorSpace;
  const strip = new Mesh(new PlaneGeometry(CASE.w - 0.5, CASE.d - 0.36), new MeshBasicMaterial({ map: stripTex }));   // 不受燈光影響：顏色只由褪色程度決定，調亮時才不會整片過曝
  strip.rotation.x = -Math.PI / 2 + 0.0; strip.position.y = CASE.h + 0.012;
  const cover = new Mesh(new BoxGeometry((CASE.w - 0.5) / 2, 0.02, CASE.d - 0.3), new MeshStandardMaterial({ color: 0x2b2b2e, roughness: 0.9 }));
  cover.position.set(-(CASE.w - 0.5) / 4, CASE.h + 0.03, 0);
  caseG.add(base, strip, cover, glass); scene.add(caseG);
  const caseSpot = new SpotLight(0xffffff, 0, 8, 0.5, 0.5, 1.2); caseSpot.position.set(CASE.x, ROOM.h - 0.2, CASE.z + 0.4); caseSpot.target = strip; scene.add(caseSpot);
  const lbCover = lab.add('cg-lb cg-lb-k', 'Covered<small>蓋住的一半</small>');
  const lbOpen = lab.add('cg-lb cg-lb-t', 'In the light<small>照到光的一半</small>');
  const DYE = [[178, 58, 72], [46, 92, 150], [214, 160, 44], [70, 128, 86]];   // 四條染色：紅、藍、黃、綠
  const PAPER = [233, 224, 202];
  function drawStrip(f) {
    const g = stripCv.getContext('2d'), W = stripCv.width, H = stripCv.height;
    g.fillStyle = `rgb(${PAPER.join(',')})`; g.fillRect(0, 0, W, H);
    DYE.forEach((c, k) => {
      const y = 28 + k * 52;
      g.fillStyle = `rgb(${c.join(',')})`; g.fillRect(24, y, W / 2 - 24, 40);                       // 左半：蓋住，不變
      const m = c.map((v, j) => Math.round(v + (PAPER[j] - v) * f * (k === 2 ? 1 : 0.86)));        // 右半：往紙色褪（黃的褪得最多，示意）
      g.fillStyle = `rgb(${m.join(',')})`; g.fillRect(W / 2, y, W / 2 - 24, 40);
    });
    stripTex.needsUpdate = true;
  }

  const R = { play: $('.al-play'), msg: $('.cg-gal-msg'), lux: $('.cg-lux'), luxOut: $('.cg-lux-out'), days: $('.cg-days-out'), exp: $('.cg-exp-out'), fade: $('.cg-fade-out'), eq: $('.cg-eq-out'), bar: $('.cg-fade-bar i'), limit: $('.cg-limit-out'), used: $('.cg-used-out') };
  const state = { mode: 'tour', work: -1, lux: 50, days: 0, running: 0, labels: true, playing: true };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    if (state.mode === 'light') {
      const t = V(CASE.x, CASE.h + 0.05, CASE.z);
      flyTo(t.clone().add(V(0, 0.8, 1.0).normalize().multiplyScalar(fit(CASE.w + 1.6, 2.6))), t, instant);
    } else if (state.work >= 0) {
      const w = works[state.work], t = w.pos.clone();
      flyTo(t.clone().add(V(0, 0.02, 1).normalize().multiplyScalar(fit(w.pw + 0.7, w.ph + 0.9))), t, instant);
    } else {
      const t = V(0, SLOT.y - 0.35, ROOM.wallZ);
      const d = Math.min(fit((n - 1) * SLOT.gap + SLOT.w + 0.8, 3.4), 20);
      flyTo(t.clone().add(V(0, 0.04, 1).normalize().multiplyScalar(d)), t, instant);
    }
  }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  function showWork(i, opts = {}) {
    state.work = i;
    press('[data-work]', 'data-work', i);
    root.dataset.work = i;
    const w = works[i];
    if (!w) {
      fill('.cg-work-h', 'Five works on the wall<span class="zh">牆上的五件作品</span>');
      fill('.cg-work-t', 'Tap a work, or use the buttons, to walk up to it.<span class="zh">點一件作品（或按上面的按鈕）走近看。</span>');
      fill('.cg-work-who', '—'); fill('.cg-work-when', '—'); fill('.cg-work-script', '—'); fill('.cg-work-size', '—');
    } else {
      fill('.cg-work-h', `${w.en}<span class="zh">${w.zh}</span>`);
      fill('.cg-work-t', `${w.text_en}<span class="zh">${w.text_zh}</span>`);
      fill('.cg-work-who', `${w.who_en}<small>${w.who_zh}</small>`);
      fill('.cg-work-when', `${w.when_en}<small>${w.when_zh}</small>`);
      fill('.cg-work-script', `${w.script_en}<small>${w.script_zh}</small>`);
      fill('.cg-work-size', `${w.size_en}<small>${w.size_zh}</small>`);
    }
    if (opts.fly !== false) goHome(!!opts.instant);
  }
  function setMode(m, opts = {}) {
    state.mode = m; root.dataset.mode = m;
    press('[data-mode]', 'data-mode', m);
    $$('[data-panel]').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== m; });
    if (m === 'tour') showWork(opts.work ?? -1, { fly: false });
    applyLight();
    goHome(!!opts.instant);
  }

  // ---------- 燈光 ----------
  function applyLight() {
    const lux = state.mode === 'light' ? state.lux : 50;
    const k = clamp(Math.log10(lux / 50) / 2);           // 50 lux → 0，5000 lux → 1
    hemi.intensity = 0.7 + k * 1.3; amb.intensity = 0.34 + k * 0.8; sun.intensity = 0.3 + k * 1.6;
    scene.background.setHex(0x070b14).lerp(new Color(0x8fa3b8), k * 0.8);
    works.forEach((w) => { w.spot.intensity = 26 + k * 30; });
    caseSpot.intensity = state.mode === 'light' ? 14 + k * 60 : 0;
    const E = exposure(state.lux, state.days), f = fadeOf(E, E0);
    drawStrip(f);
    if (R.luxOut) R.luxOut.innerHTML = `${Math.round(state.lux).toLocaleString('en-US')} lux`;
    if (R.days) R.days.textContent = `${Math.round(state.days)}`;
    if (R.exp) R.exp.innerHTML = `${Math.round(E).toLocaleString('en-US')}<small>lux · hours 勒克斯・小時</small>`;
    if (R.fade) R.fade.textContent = `${Math.round(f * 100)}%`;
    if (R.bar) R.bar.style.width = `${Math.round(f * 100)}%`;
    const dl = daysToLimit(state.lux), dlT = num(dl);
    if (R.limit) R.limit.innerHTML = `${dlT}<small>${dl >= 1.05 ? 'days 天' : `days 天（${Math.round(dl * 8 * 10) / 10} hours 小時）`}</small>`;
    if (R.used) R.used.textContent = `${num(E / LIMIT)} ×`;
    if (R.eq) {
      R.eq.innerHTML = state.lux <= 50.5
        ? 'At 50 lux, 8 hours a day, the yearly limit is used up in 40 days.<span class="zh">50 lux、每天 8 小時，40 天就用完一年的額度。</span>'
        : `At ${Math.round(state.lux).toLocaleString('en-US')} lux, 8 hours a day, the yearly limit is used up in ${dlT} ${dl === 1 ? 'day' : dl > 1 ? 'days' : 'of a day'}.<span class="zh">${Math.round(state.lux).toLocaleString('en-US')} lux、每天 8 小時，${dlT} 天就用完一年的額度。</span>`;
    }
  }
  function setLux(v, fromSlider) {
    state.lux = clamp(v, 50, 5000);
    if (R.lux && !fromSlider) R.lux.value = String(sliderFromLux(state.lux));
    press('[data-lux]', 'data-lux', Math.round(state.lux));
    applyLight();
  }
  function runDays(n = 365) { state.running = n; state.running0 = n; if (R.msg) R.msg.innerHTML = 'The days are passing…<span class="zh">一天一天過去……</span>'; }
  function resetLight() { state.days = 0; state.running = 0; applyLight(); if (R.msg) R.msg.innerHTML = 'A fresh test strip. Choose a light level, then put it on show.<span class="zh">換一條新的試紙。選一種亮度，再按下面的按鈕開始展出。</span>'; }
  function doneYear() {
    const E = exposure(state.lux, state.days), f = fadeOf(E, E0), k = E / LIMIT, kT = num(k);
    const lx = Math.round(state.lux).toLocaleString('en-US'), d = Math.round(state.days);
    if (R.msg) R.msg.innerHTML = `${d} days on show at ${lx} lux: the strip has received ${kT} times the yearly limit. In this model the uncovered half has faded about ${Math.round(f * 100)}%. The covered half has not changed.`
      + `<span class="zh">在 ${lx} lux 下展出 ${d} 天：照到的光是一年額度的 ${kT} 倍。在這個模型裡，沒蓋住的那一半大約褪了 ${Math.round(f * 100)}%，蓋住的那一半沒有變。</span>`;
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-mode'))));
  $$('[data-work]').forEach((b) => b.addEventListener('click', () => { if (state.mode !== 'tour') setMode('tour', { work: Number(b.getAttribute('data-work')) }); showWork(Number(b.getAttribute('data-work'))); }));
  $$('[data-step]').forEach((b) => b.addEventListener('click', () => { const d = Number(b.getAttribute('data-step')); showWork(((state.work < 0 ? (d > 0 ? -1 : 0) : state.work) + d + n) % n); }));
  $$('[data-lux]').forEach((b) => b.addEventListener('click', () => setLux(Number(b.getAttribute('data-lux')))));
  if (R.lux) R.lux.addEventListener('input', () => setLux(luxFromSlider(Number(R.lux.value)), true));
  $$('[data-days]').forEach((b) => b.addEventListener('click', () => runDays(Number(b.getAttribute('data-days')))));
  $$('.cg-reset').forEach((b) => b.addEventListener('click', resetLight));
  $$('.cg-all').forEach((b) => b.addEventListener('click', () => showWork(-1)));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });
  if (R.play) R.play.addEventListener('click', () => { state.playing = !state.playing; R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false'); R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Play · 播放'; });

  // 點作品（raycast）：按下和放開的位置差不多才算點
  const ray = new Raycaster(), ndc = new Vector2();
  let downAt = null;
  cv.addEventListener('pointerdown', (e) => { downAt = { x: e.clientX, y: e.clientY }; });
  cv.addEventListener('pointerup', (e) => {
    if (!downAt || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 8 || state.mode !== 'tour') return;
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(picks)[0];
    if (hit) showWork(hit.object.userData.work);
  });

  function step(dt) {
    if (state.running > 0 && state.playing) {
      const d = Math.min(state.running, dt * Math.max(20, state.running0 || 365) / 5);   // 不管幾天都大約播 5 秒
      state.days += d; state.running -= d;
      applyLight();
      if (state.running <= 0) doneYear();
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function labels() {
    const tour = state.mode === 'tour';
    works.forEach((w) => {
      const on = state.labels && tour && state.work < 0;
      w.label.hidden = !on;
      if (on) lab.place(w.label, V(w.x, SLOT.y - SLOT.h / 2 - 0.62, ROOM.wallZ + 0.12));
    });
    const on2 = state.labels && !tour;
    lbCover.hidden = !on2; lbOpen.hidden = !on2;
    if (on2) {
      lab.place(lbCover, V(CASE.x - (CASE.w - 0.5) / 4, CASE.h + 0.1, CASE.z - 0.25), -26);
      lab.place(lbOpen, V(CASE.x + (CASE.w - 0.5) / 4, CASE.h + 0.1, CASE.z - 0.25), -26);
    }
  }

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    labels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  let band0 = null;
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1.1 ? 48 : 40;
    camera.updateProjectionMatrix();
    root.classList.toggle('cg-narrow', w < 520);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setLux(50);
  setMode('tour', { instant: true });
  resetLight();
  resize();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = { tour: () => setMode('tour'), light: () => setMode('light') };
  WORKS.forEach((w, i) => { DEMO[w.key] = () => { setMode('tour', { work: i }); showWork(i); }; });
  root.__lab = {
    camera, controls, state, scene, works, setMode, showWork, setLux, runDays, resetLight,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const mt = document.querySelector('[data-cal-match]');
  if (mt) initMatch(mt);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) {
    const PADS = {};
    for (const k of CHAR_KEYS) for (const s of SCRIPTS) PADS[`${k}-${s}`] = FORMS[k][s];
    const cur = { ch: 'yong', sc: 'xing' };
    const pad = initPad(padEl, PADS['yong-xing'], PADS);
    const apply = () => {
      pad.setChar(`${cur.ch}-${cur.sc}`);
      padEl.querySelectorAll('[data-pad-script]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pad-script') === cur.sc ? 'true' : 'false'));
      padEl.querySelectorAll('[data-pad-ch]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-pad-ch') === cur.ch ? 'true' : 'false'));
    };
    padEl.querySelectorAll('[data-pad-script]').forEach((b) => b.addEventListener('click', () => { cur.sc = b.getAttribute('data-pad-script'); apply(); }));
    padEl.querySelectorAll('[data-pad-ch]').forEach((b) => b.addEventListener('click', () => { cur.ch = b.getAttribute('data-pad-ch'); apply(); }));
    apply();
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calgallery-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
