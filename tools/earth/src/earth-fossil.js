/*
 * 地球與天氣 · 第十四課「化石是怎麼形成的？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：生物死後很快被泥沙埋住 → 一層層壓上去、泥沙變成岩石 → 地下水裡的礦物質慢慢取代骨頭 →
 *   地層被抬升 → 上面的岩層被侵蝕掉，化石才露出來。六個階段共用一支時間滑桿。
 *
 * 場景：一塊地層的剖面（海底 → 陸地），裡面一條魚的骨架。
 * 時間與各階段的比例在 fossilcalc.js（全部示意）。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-fossil.js
 * 除錯：document.querySelector('[data-earthfossil-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { STAGES, T_MAX, stageOf, sink, soft, layers, mineral, uplift, eroded, exposed, layersAbove, N_LAYERS } from './fossilcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.9, ...o });
const W = 9, D = 3.4, BASE_H = 1.1, LAYER_H = 0.5, SEA_H = 3.9;
const LAYER_COL = [0xb9a37a, 0x9c8a6b, 0xc9b48a, 0x8f7d62, 0xb39a6f];
const NAME = { die: ['1 · It dies', '1 · 死亡'], bury: ['2 · Buried', '2 · 被埋住'], press: ['3 · Pressed', '3 · 壓實'], stone: ['4 · Turned to stone', '4 · 變成石頭'], rise: ['5 · Lifted', '5 · 抬升'], find: ['6 · Uncovered', '6 · 露出來'] };

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
  scene.background = new Color(0xbfe0f7);
  const camera = new PerspectiveCamera(34, 1, 0.1, 160);
  const TARGET = V(0, 2.7, 0);
  const homePos = () => TARGET.clone().add(V(0, 3.2, 19).multiplyScalar(camera.aspect < 0.85 ? 1.7 : camera.aspect < 1.1 ? 1.25 : 0.86));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 7; controls.maxDistance = 60;
  controls.minPolarAngle = 0.5; controls.maxPolarAngle = Math.PI * 0.54;
  controls.minAzimuthAngle = -0.8; controls.maxAzimuthAngle = 0.8;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x5a5040, 1.15));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const dl = new DirectionalLight(0xffffff, 0.95); dl.position.set(-4, 10, 8); scene.add(dl);

  const block = new Group(); scene.add(block);                 // 整塊地層（抬升時一起往上）
  const box = new BoxGeometry(1, 1, 1);
  const base = new Mesh(box, std(0x7a6a55)); base.scale.set(W, BASE_H, D); base.position.y = BASE_H / 2; block.add(base);
  const strata = LAYER_COL.map((c) => { const m = new Mesh(box, std(c)); block.add(m); return m; });
  const seaMat = new MeshStandardMaterial({ color: 0x2f7fd6, roughness: 0.3, transparent: true, opacity: 0.6 });
  const sea = new Mesh(box, seaMat); scene.add(sea);
  // 魚：骨架（脊椎、肋骨、頭骨、尾巴）＋一層會爛掉的肉
  const fish = new Group(); block.add(fish);
  const boneMat = std(0xf2ecdc, { roughness: 0.6 });
  fish.add(at(new Mesh(new BoxGeometry(1.5, 0.06, 0.06), boneMat), 0, 0, 0));
  for (let i = 0; i < 7; i++) { const r = new Mesh(new BoxGeometry(0.035, 0.34 - Math.abs(i - 2.5) * 0.04, 0.035), boneMat); fish.add(at(r, -0.45 + i * 0.16, 0, 0)); }
  const skull = new Mesh(new SphereGeometry(0.17, 12, 10), boneMat); skull.scale.set(1.3, 0.9, 0.5); fish.add(at(skull, -0.78, 0, 0));
  const tail = new Mesh(new ConeGeometry(0.2, 0.3, 3), boneMat); tail.rotation.z = Math.PI / 2; tail.scale.z = 0.3; fish.add(at(tail, 0.88, 0, 0));
  const fleshMat = new MeshStandardMaterial({ color: 0x8fb3c9, roughness: 0.5, transparent: true, opacity: 0.9 });
  const flesh = new Mesh(new SphereGeometry(0.5, 20, 14), fleshMat); flesh.scale.set(1.75, 0.5, 0.32); fish.add(flesh);
  fish.rotation.x = -0.25;
  // 最後找到化石的人（一個小人）
  const finder = new Group(); block.add(finder);
  finder.add(at(new Mesh(new BoxGeometry(0.18, 0.42, 0.14), std(0xd9483b)), 0, 0.21, 0)); finder.add(at(new Mesh(new SphereGeometry(0.11, 12, 10), std(0xf0c9a0)), 0, 0.53, 0));

  const lab = labeler($('.al-labels'), cv, camera);
  const L = { fish: lab.add('cp-lb ew-lb-push', ''), sea: lab.add('cp-lb', 'Sea<small>海</small>'), lay: lab.add('cp-lb', ''), min: lab.add('cp-lb', 'Water carries minerals in<small>地下水把礦物質帶進來</small>'), rain: lab.add('cp-lb', 'Rain and rivers wear the rock away<small>雨水和河流把岩石削掉</small>') };

  const R = { t: $('.ew-fo-t'), tOut: $('.ew-fo-t-out'), steps: [...root.querySelectorAll('.ew-fo-steps button')], above: $('.ew-fo-above'), stone: $('.ew-fo-stone'), where: $('.ew-fo-where'), msgs: [...root.querySelectorAll('.ew-fo-msg')], play: $('.al-play') };
  const state = { t: 0, labels: true, playing: true, hold: 0 };

  const BONE = new Color(0xf2ecdc), STONE = new Color(0x6b4a32), fishPos = V(0, 0, 0);
  function draw() {
    const t = state.t, ls = layers(t), up = uplift(t), er = eroded(t);
    block.position.y = up * 2.4;
    // 地層：一層層疊上去；侵蝕時由上往下、由右往左削掉
    let y = BASE_H, total = ls.reduce((a, b) => a + b, 0) * LAYER_H;
    const keep = total * (1 - er);                              // 還剩下的厚度（從下面算起；最底下那層留一點包住化石）
    ls.forEach((f, i) => {
      const h0 = f * LAYER_H, h = Math.max(0, Math.min(h0, keep + (i === 0 ? LAYER_H * 0.42 * er : 0) - (y - BASE_H)));
      strata[i].visible = h > 0.004; strata[i].scale.set(W, Math.max(0.004, h), D); strata[i].position.y = y + h / 2; y += h0;
    });
    // 海：抬升時退掉
    const seaTop = BASE_H + SEA_H, seaBot = 0;
    sea.visible = up < 0.98; seaMat.opacity = 0.6 * (1 - up);
    sea.scale.set(W + 1.2, seaTop - seaBot, D + 1.4); sea.position.y = (seaTop + seaBot) / 2;
    // 魚：沉到海底，肉爛掉，骨頭慢慢變成石頭的顏色
    const s = sink(t); fish.position.set(0.3, BASE_H + 0.2 + (1 - s) * 1.7, D / 2 + 0.05);
    fish.rotation.z = (1 - s) * 0.5;
    const sf = soft(t); flesh.visible = sf > 0.02; fleshMat.opacity = 0.9 * sf;
    boneMat.color.copy(BONE).lerp(STONE, mineral(t));
    finder.visible = exposed(t); finder.position.set(-1.1, BASE_H + LAYER_H * 0.42, D / 2 - 0.4);
    fish.getWorldPosition(fishPos);
    return { ls, up, er };
  }

  let narrow = false;
  function updateLabels(d) {
    const on = state.labels, t = state.t, st = stageOf(t);
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    L.fish.innerHTML = exposed(t) ? 'A fossil!<small>找到化石了！</small>' : mineral(t) > 0.95 ? 'A fossil, still hidden<small>化石，還藏在地下</small>' : mineral(t) > 0 ? 'Bone is turning to stone<small>骨頭正在變成石頭</small>' : soft(t) < 0.05 ? 'Only the bones are left<small>只剩下骨頭</small>' : 'A dead fish<small>一條死掉的魚</small>';
    show(L.fish, true, fishPos, -30);
    show(L.sea, on && d.up < 0.5 && !narrow, V(-W / 2 + 0.9, BASE_H + SEA_H - 0.3, D / 2), 0);
    const n = d.ls.filter((x) => x > 0.5).length;
    L.lay.innerHTML = st === 'bury' ? 'Mud and sand cover it<small>泥沙把它蓋住</small>' : 'Layer after layer<small>一層又一層</small>';
    show(L.lay, on && (st === 'bury' || st === 'press') && n > 0 && !narrow, V(W / 2 - 1.4, BASE_H + n * LAYER_H + block.position.y, D / 2), -16);
    show(L.min, on && st === 'stone' && !narrow, V(-2.6, BASE_H + 0.3 + block.position.y, D / 2), 0);
    show(L.rain, on && st === 'find' && !exposed(t) && !narrow, V(2.2, BASE_H + 2.9 + block.position.y, D / 2), -14);
  }

  function readout() {
    const t = state.t, st = stageOf(t), i = STAGES.indexOf(st);
    R.t.value = String(Math.round(t * 100)); R.t.style.setProperty('--p', `${(t / T_MAX) * 100}%`);
    R.tOut.textContent = `${NAME[st][0]} · ${NAME[st][1].slice(4)}`;
    R.steps.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    R.above.innerHTML = `${layersAbove(t)}<small>蓋在上面的地層數</small>`;
    R.stone.innerHTML = `${Math.round(mineral(t) * 100)}%<small>骨頭變成石頭的程度</small>`;
    R.where.innerHTML = uplift(t) > 0.5 ? (exposed(t) ? 'At the surface<small>在地表</small>' : 'Inside a hill<small>在山丘裡面</small>') : 'Under the sea<small>在海底</small>';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== st; });
  }

  function set(o) { if (o.t != null) state.t = Math.min(T_MAX, Math.max(0, o.t)); state.hold = 0; draw(); readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.t.addEventListener('input', () => { setPlaying(false); set({ t: +R.t.value / 100 }); });
  R.steps.forEach((b, k) => b.addEventListener('click', () => { setPlaying(false); set({ t: k + 0.95 }); }));
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= T_MAX) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let lastR = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (tm - (last || tm)) / 1000);
    last = tm;
    if (state.playing) {
      if (state.t < T_MAX) state.t = Math.min(T_MAX, state.t + dt * 0.3);
      else { state.hold += dt; if (state.hold > 3.5) { state.t = 0; state.hold = 0; } }
    }
    const d = draw();
    controls.update();
    updateLabels(d);
    if (tm - lastR > 120) { lastR = tm; readout(); }
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

  draw(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (t) => { setPlaying(false); set({ t }); };
  const DEMO = { bury: () => go(1.9), stone: () => go(3.6), rise: () => go(4.95), find: () => go(6) };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { const d = draw(); controls.update(); updateLabels(d); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------------- 頁面下方：哪一層比較老？（不需要 WebGL） ----------------
function initStrata() {
  const el = document.querySelector('[data-earth-strata]');
  if (!el) return;
  const ls = JSON.parse(el.dataset.layers), q = (s) => el.querySelector(s), rows = [...el.querySelectorAll('.ew-ly-row')];
  function show(i) {
    const n = ls.length, older = n - 1 - i, younger = i;      // 第 0 列在最上面（最年輕）
    rows.forEach((r, k) => r.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    q('.ew-ly-name').textContent = ls[i].en; q('.ew-ly-name-zh').textContent = ls[i].zh;
    q('.ew-ly-rank').textContent = i === n - 1 ? 'the oldest layer here' : i === 0 ? 'the youngest layer here' : `older than ${younger} layer${younger > 1 ? 's' : ''}, younger than ${older}`;
    q('.ew-ly-rank-zh').textContent = i === n - 1 ? '這裡最老的一層' : i === 0 ? '這裡最年輕的一層' : `比上面 ${younger} 層老，比下面 ${older} 層年輕`;
    q('.ew-ly-en').textContent = ls[i].note_en; q('.ew-ly-zh').textContent = ls[i].note_zh;
    el.dataset.i = String(i);
  }
  rows.forEach((r, k) => r.addEventListener('click', () => show(k)));
  show(2);
  el.__ly = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initStrata);
else initStrata();

lazyBoot('[data-earthfossil-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
