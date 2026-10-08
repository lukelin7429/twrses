/*
 * 地球與天氣 · 第四課「台灣的山是怎麼來的？」的 3D 模型（全部自繪示意；垂直方向誇大約十倍）。
 *
 * 一個機制：板塊把海底的泥沙擠成一堆、往上推（抬升）；山一長高，雨水和河流就把它削下來（侵蝕），
 *   削下來的泥沙被帶到山腳，鋪成平原。山有多高，是「往上推」和「往下削」兩邊拉鋸的結果。
 *
 * 場景：一塊剖開的地殼與海。右邊被推進來，中間隆起成山；雨從上面下，褐色的泥沙順著山坡流到左邊。
 *   時間用「百萬年」走。可以改推的速度（停／慢／每年 5 公釐／快）和雨的強弱。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-mountain.js
 * 除錯：document.querySelector('[data-earthmountain-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, BufferAttribute, Color, ConeGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { YUSHAN_M, EROSION, heightAt, noErosion, yearsTo } from './mtcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.8, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const XL = -7, XR = 7, ZD = 4, BOT = -2.4, SEA_KM = 0.1, SEABED = -SEA_KM * 0.55;         // 左右、前後深度、底、原本的海底（海面是 y = 0）
const VS = 0.55;                                                 // 1 公里高畫成 0.55 個單位（水平 1 單位約 20 公里 → 垂直誇大約十倍）
const NU = 70, NV = 6, MYR_PER_S = 0.35;
const STRATA = [0x6b5a4a, 0x8a7358, 0xa58a63, 0x7d6a55, 0x9c8a6e, 0xb9a47c];
const PUSH = { off: 0, slow: 2.5, now: 5, fast: 7.5 };           // 公釐／年（＝公里／百萬年）；只有 5 有出處，其餘是示例
const g = (x, c, s) => Math.exp(-((x - c) ** 2) / (2 * s * s));
// 山的形狀（0–1）：三座一高兩低，再加一點起伏
const shape = (x) => Math.min(1, Math.max(g(x, 1.8, 1.5), 0.55 * g(x, -0.6, 1.1), 0.62 * g(x, 4.3, 1.0)) * (1 + 0.07 * Math.sin(x * 7.3) + 0.05 * Math.sin(x * 13.1 + 1)));
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const N_RAIN = 90, N_SED = 40;

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
  scene.background = new Color(0x0e1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 0.5, 0);
  const homePos = () => TARGET.clone().add(V(0, 3.6, 19).multiplyScalar(camera.aspect < 0.85 ? 1.9 : camera.aspect < 1.2 ? 1.42 : 1.06));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 55;
  controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.5;
  controls.minAzimuthAngle = -0.7; controls.maxAzimuthAngle = 0.7;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.5));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(-3, 9, 8); scene.add(sun);

  scene.add(at(new Mesh(new BoxGeometry(XR - XL + 0.6, 0.4, ZD + 0.6), std(0x3a2530)), 0, BOT - 0.21, 0));
  // 海（半透明）
  scene.add(at(new Mesh(new BoxGeometry(XR - XL, 0.05, ZD - 0.06), new MeshStandardMaterial({ color: 0x2a6fc9, transparent: true, opacity: 0.55, roughness: 0.4, depthWrite: false })), 0, -0.025, 0));
  // 地殼：正面（地層）＋頂面（照高度上色）
  const front = new PlaneGeometry(1, 1, NU, NV), top = new PlaneGeometry(1, 1, NU, 1);
  const fc = new Float32Array((NU + 1) * (NV + 1) * 3), tc = new Float32Array((NU + 1) * 2 * 3);
  front.setAttribute('color', new BufferAttribute(fc, 3)); top.setAttribute('color', new BufferAttribute(tc, 3));
  scene.add(new Mesh(front, new MeshBasicMaterial({ vertexColors: true, side: DoubleSide })), new Mesh(top, new MeshStandardMaterial({ vertexColors: true, roughness: 0.9, side: DoubleSide })));
  // 玉山現在的高度：一條黃線
  const yLine = at(new Mesh(new BoxGeometry(XR - XL, 0.025, 0.025), new MeshBasicMaterial({ color: 0xffd36e })), 0, (YUSHAN_M / 1000) * VS, ZD / 2 + 0.03); scene.add(yLine);
  // 推的箭頭
  const arrow = new Group(); scene.add(arrow);
  const arMat = new MeshBasicMaterial({ color: 0xffb347 });
  arrow.add(at(new Mesh(new BoxGeometry(1.2, 0.22, 0.22), arMat), 0.6, 0, 0));
  const head = new Mesh(new ConeGeometry(0.3, 0.55, 12), arMat); head.rotation.z = Math.PI / 2; arrow.add(at(head, -0.25, 0, 0));
  // 雨、泥沙
  const rain = new InstancedMesh(new BoxGeometry(0.02, 0.2, 0.02), new MeshBasicMaterial({ color: 0x9fd0ff, transparent: true, opacity: 0.8 }), N_RAIN); rain.frustumCulled = false; scene.add(rain);
  const sed = new InstancedMesh(new SphereGeometry(0.06, 8, 6), new MeshBasicMaterial({ color: 0xc89a5a }), N_SED); sed.frustumCulled = false; scene.add(sed);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mk = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    peak: lab.add('cp-lb ew-mt-lb-peak', ''), sea: mk('', 'Sea level', '海平面'), yu: mk('ew-lb-push', `Yushan today: ${YUSHAN_M.toLocaleString('en-US')} m`, `玉山現在的高度：${YUSHAN_M.toLocaleString('en-US')} 公尺`),
    push: lab.add('cp-lb ew-lb-plate', ''), plain: mk('ew-mt-lb-plain', 'Sand and mud build a plain', '泥沙鋪成平原'), bed: mk('', 'Mud and sand on the seabed', '海底的泥沙'),
  };

  const R = {
    pushes: [...root.querySelectorAll('.ew-mt-push button')], rains: [...root.querySelectorAll('.ew-mt-rain button')], reset: $('.ew-mt-reset'),
    t: $('.ew-mt-t'), h: $('.ew-mt-h'), up: $('.ew-mt-up'), off: $('.ew-mt-off'), msgs: [...root.querySelectorAll('.ew-mt-msg')], play: $('.al-play'),
  };
  // H：山的高度（公里）；t：百萬年；lifted／eroded：累計被抬高、被削掉的公里數；rate：這一刻高度每百萬年變多少
  const state = { push: 'now', rain: 'medium', H: 0, t: 0, lifted: 0, eroded: 0, rate: 0, labels: true, playing: true, clock: 0 };

  const col = new Color(), SAND = new Color(0xd9c08a), GREEN = new Color(0x4f9a5a), DARKG = new Color(0x2f7044), ROCK = new Color(0x8c8478);
  const plainOf = (x) => Math.min(0.3, state.eroded * 0.035) * (1 - smooth(-3.6, -1.6, x));          // 山腳堆起來的泥沙（公里）
  const squeeze = () => Math.min(2.2, state.lifted * 0.07);                                          // 右邊被推進來多少
  const xOf = (u) => XL + u * (XR - XL) - squeeze() * u * u;
  const topY = (x) => SEABED + VS * Math.max(state.H * shape(x), plainOf(x));
  function drawLand() {
    const fp = front.attributes.position, tp = top.attributes.position;
    for (let i = 0; i <= NU; i++) {
      const u = i / NU, x0 = XL + u * (XR - XL), x = xOf(u), yt = topY(x0), km = (yt) / VS;
      for (let j = 0; j <= NV; j++) {
        const v = 1 - j / NV, fold = 0.16 * (state.H / 4) * Math.sin(x0 * 2.6 + v * 2.2) * shape(x0) * v * (1 - v) * 4;
        const k = j * (NU + 1) + i; fp.setXYZ(k, x, BOT + v * (yt - BOT) + fold, ZD / 2);
        col.set(STRATA[Math.min(NV - 1, Math.floor((1 - v) * NV * 0.999))]);
        if (j === 0 && plainOf(x0) > state.H * shape(x0)) col.copy(SAND);
        fc[k * 3] = col.r; fc[k * 3 + 1] = col.g; fc[k * 3 + 2] = col.b;
      }
      // 頂面的顏色：海面下是沙色，低處綠，高處灰
      if (km < 0.02) col.copy(SAND); else if (km < 1.6) col.copy(GREEN).lerp(DARKG, km / 1.6); else col.copy(DARKG).lerp(ROCK, Math.min(1, (km - 1.6) / 1.8));
      for (const [row, z] of [[0, -ZD / 2], [1, ZD / 2]]) { const k = row * (NU + 1) + i; tp.setXYZ(k, x, yt, z); tc[k * 3] = col.r; tc[k * 3 + 1] = col.g; tc[k * 3 + 2] = col.b; }
    }
    fp.needsUpdate = true; tp.needsUpdate = true; front.attributes.color.needsUpdate = true; top.attributes.color.needsUpdate = true; top.computeVertexNormals();
  }
  const m4 = new Matrix4();
  function drawFx() {
    const k = EROSION[state.rain], n = Math.round(N_RAIN * (k / EROSION.strong));
    for (let i = 0; i < N_RAIN; i++) {
      const u = ((state.clock * (1.1 + hash(i, 1) * 0.6) + hash(i, 2)) % 1 + 1) % 1, x0 = -2 + hash(i, 3) * 8, s = i < n && state.playing ? 1 : 0;
      m4.makeScale(s, s, s).setPosition(XL + ((x0 - XL) / (XR - XL)) * (XR - XL) - squeeze() * (((x0 - XL) / (XR - XL)) ** 2), 4.6 - u * (4.6 - topY(x0)), -ZD / 2 + 0.3 + hash(i, 4) * (ZD - 0.6)); rain.setMatrixAt(i, m4);
    }
    rain.instanceMatrix.needsUpdate = true;
    // 泥沙：從山頂附近順著坡往左流到平原；量跟「正在被削掉多少」走
    const flow = Math.min(1, (k * state.H) / 6), ns = Math.round(N_SED * flow);
    for (let i = 0; i < N_SED; i++) {
      const u = ((state.clock * (0.16 + hash(i, 5) * 0.1) + hash(i, 6)) % 1 + 1) % 1, x0 = 1.6 - u * 6.8, s = i < ns && state.playing ? 1 : 0, uu = (x0 - XL) / (XR - XL);
      m4.makeScale(s, s, s).setPosition(xOf(uu), topY(x0) + 0.07, -ZD / 2 + 0.4 + hash(i, 7) * (ZD - 0.8)); sed.setMatrixAt(i, m4);
    }
    sed.instanceMatrix.needsUpdate = true;
    const on = PUSH[state.push] > 0;
    arrow.visible = on; arrow.position.set(XR - squeeze() + 0.75 + (state.playing ? Math.sin(state.clock * 4) * 0.06 : 0), -1.1, ZD / 2 + 0.2);
  }

  let narrow = false;
  const peakM = () => Math.max(0, Math.round((state.H - SEA_KM) * 1000));        // 山頂比海面高幾公尺（海底原本在海面下 0.1 公里）
  function updateLabels() {
    const on = state.labels, px = xOf((1.8 - XL) / (XR - XL)), up = state.H > SEA_KM;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    L.peak.innerHTML = up ? `Peak: ${peakM().toLocaleString('en-US')} m<small>山頂：${peakM().toLocaleString('en-US')} 公尺</small>` : 'Still under the sea<small>還在海面下</small>';
    show(L.peak, true, V(px, topY(1.8), 0), -20);
    show(L.sea, on && !narrow, V(XL + 1.1, 0, -ZD / 2), -14);
    show(L.yu, on, V(narrow ? XL + 3 : XR - 2.2, yLine.position.y, ZD / 2), -14);
    L.push.innerHTML = `Pushed up ${PUSH[state.push]} mm a year<small>每年往上推 ${PUSH[state.push]} 公釐</small>`;
    show(L.push, on && PUSH[state.push] > 0 && !narrow, V(XR - squeeze() + 0.6, -1.1, ZD / 2 + 0.2), -26);
    show(L.plain, on && plainOf(-5) > 0.15, V(-5, topY(-5), ZD / 2), narrow ? 26 : -16);
    show(L.bed, on && state.t < 0.25 && !narrow, V(0, SEABED, ZD / 2), -14);
  }

  const f1 = (x) => (x >= 100 ? Math.round(x).toLocaleString('en-US') : x.toFixed(1));
  function readout() {
    R.pushes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.push === state.push ? 'true' : 'false'));
    R.rains.forEach((b) => b.setAttribute('aria-pressed', b.dataset.rain === state.rain ? 'true' : 'false'));
    R.t.innerHTML = `${state.t.toFixed(1)}<small>million years · 百萬年</small>`;
    R.h.innerHTML = `${peakM().toLocaleString('en-US')} m<small>above the sea · 高出海面</small>`;
    R.up.innerHTML = `${f1(state.lifted)} km<small>pushed up in all · 總共被推高</small>`;
    R.off.innerHTML = `${f1(state.eroded)} km<small>worn away · 被削掉</small>`;
    const key = state.H < 0.2 && state.rate <= 0.15 ? 'flat' : state.rate > 0.15 ? 'grow' : state.rate < -0.15 ? 'shrink' : 'steady';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function restart() { state.H = 0; state.t = 0; state.lifted = 0; state.eroded = 0; state.rate = PUSH[state.push]; }
  function set(o) { if (o.push in PUSH) state.push = o.push; if (o.rain in EROSION) state.rain = o.rain; state.rate = PUSH[state.push] - EROSION[state.rain] * state.H; readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.pushes.forEach((b) => b.addEventListener('click', () => { set({ push: b.dataset.push }); setPlaying(true); }));
  R.rains.forEach((b) => b.addEventListener('click', () => { set({ rain: b.dataset.rain }); setPlaying(true); }));
  R.reset.addEventListener('click', () => { state.push = 'now'; state.rain = 'medium'; restart(); setPlaying(true); readout(); });
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function advance(dt) {
    if (!state.playing) return;
    state.clock += dt;
    const d = dt * MYR_PER_S, U = PUSH[state.push], k = EROSION[state.rain], h1 = heightAt(state.H, U, k, d);
    state.lifted += U * d; state.eroded += state.H + U * d - h1; state.rate = U - k * h1; state.H = h1; state.t += d;
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    advance(dt); drawLand(); drawFx();
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
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  restart(); drawLand(); drawFx(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (o, fresh) => { if (fresh) restart(); set(o); setPlaying(true); };
  const DEMO = { rise: () => go({ push: 'now', rain: 'medium' }, true), stop: () => go({ push: 'off' }, false), rain: () => go({ rain: 'strong' }, false), dry: () => go({ push: 'now', rain: 'weak' }, true) };
  root.__lab = {
    camera, controls, state, set, setPlaying, restart, peakM,
    run: (sec) => { const was = state.playing; state.playing = true; for (let t = 0; t < sec; t += 0.02) advance(0.02); state.playing = was; },
    render: () => { drawLand(); drawFx(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：如果沒有侵蝕，山會有多高？（不需要 WebGL） ----------------
function initPeak() {
  const el = document.querySelector('[data-earth-peak]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const yr = $('.ew-pk-yr'), out = $('.ew-pk-yr-out'), n = $('.ew-pk-n'), en = $('.ew-pk-en'), zh = $('.ew-pk-zh'), bar = $('.ew-pk-bar'), mark = $('.ew-pk-mark');
  const MAXY = 5e6, fmtY = (y) => (y >= 1e6 ? [`${(y / 1e6).toFixed(y % 1e6 ? 1 : 0)} million years`, `${Math.round(y / 1e4).toLocaleString('en-US')} 萬年`] : [`${y.toLocaleString('en-US')} years`, `${y >= 1e4 ? `${Math.round(y / 1e4)} 萬年` : `${y.toLocaleString('en-US')} 年`}`]);
  function show() {
    const y = +yr.value, h = noErosion(y), f = fmtY(y), x = h / YUSHAN_M;
    out.textContent = `${f[0]} · ${f[1]}`;
    yr.style.setProperty('--p', `${(y / MAXY) * 100}%`);
    n.textContent = Math.round(h).toLocaleString('en-US');
    bar.style.height = `${Math.min(100, (h / noErosion(MAXY)) * 100)}%`;
    mark.style.bottom = `${(YUSHAN_M / noErosion(MAXY)) * 100}%`;
    en.textContent = x < 1 ? `That is ${Math.round(x * 100)}% of the height of Yushan today.` : `That is ${x.toFixed(1)} times the height of Yushan today. Real mountains never get this tall, because rain and rivers wear them down.`;
    zh.textContent = x < 1 ? `這是玉山現在高度的 ${Math.round(x * 100)}%。` : `這是玉山現在高度的 ${x.toFixed(1)} 倍。真的山長不到這麼高，因為雨水和河流一直在把它削下來。`;
    el.querySelectorAll('.ew-pk-pre button').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.y === y ? 'true' : 'false'));
    el.dataset.h = String(h);
  }
  yr.addEventListener('input', show);
  el.querySelectorAll('.ew-pk-pre button').forEach((b) => b.addEventListener('click', () => { yr.value = b.dataset.y; show(); }));
  show();
  el.__peak = { show, yearsToYushan: yearsTo(YUSHAN_M) };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPeak);
else initPeak();

lazyBoot('[data-earthmountain-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
