/*
 * 晶片與半導體 · 第九課「晶片為什麼會發熱？」的 3D 模型（全部自繪示意，不是真實比例）。
 *
 * 一個機制：電晶體每開關一次都有一點點電流流過，電能最後全變成熱；開關得越多、越快，熱越多。
 *   熱要有路走出去：晶片 → 散熱片（鰭片把表面積變大）→ 空氣（風扇把熱空氣吹走）。
 *   熱來不及走，晶片就自己放慢速度（降頻）來保護自己。
 *
 * 場景：電路板上一顆晶片；可選「沒有散熱」「散熱片」「散熱片＋風扇」，和工作量（待機／看影片／玩遊戲）。
 *   晶片的顏色＝溫度；橘色小點＝熱（數量跟功率走）。溫度與降頻用 heatcalc.js 的簡化模型。
 *
 * 產物：cd tools/chips && npm run build → assets/js/chip-heat.js
 * 除錯：document.querySelector('[data-chipheat-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, InstancedMesh, MathUtils,
  Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { AMBIENT, LIMIT, LOADS, COOLERS, power, relPower, step as stepHeat } from './heatcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.55, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const RAMP = [[25, new Color(0x3d6fd8)], [50, new Color(0x4fd6a8)], [70, new Color(0xffd84a)], [85, new Color(0xff8a2a)], [100, new Color(0xe0261a)]];
function tempColor(T, out) {
  if (T <= RAMP[0][0]) return out.copy(RAMP[0][1]);
  for (let i = 1; i < RAMP.length; i++) if (T <= RAMP[i][0]) return out.copy(RAMP[i - 1][1]).lerp(RAMP[i][1], (T - RAMP[i - 1][0]) / (RAMP[i][0] - RAMP[i - 1][0]));
  return out.copy(RAMP[RAMP.length - 1][1]);
}
const N_HEAT = 140, FINS = 11, SINK_H = 1.1;

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
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 0.9, 0);
  const homePos = () => TARGET.clone().add(V(3.4, 3.4, 7.6).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.2 ? 1.2 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 24; controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sun = new DirectionalLight(0xffffff, 1.1); sun.position.set(4, 9, 6); scene.add(sun);

  // 電路板、封裝、晶片
  scene.add(at(new Mesh(new BoxGeometry(6.4, 0.14, 4.6), std(0x1f7a4a, { roughness: 0.8 })), 0, -0.07, 0));
  scene.add(at(new Mesh(new BoxGeometry(2.6, 0.12, 2.6), std(0x2f9a60)), 0, 0.06, 0));
  const dieMat = std(0x3d6fd8, { metalness: 0.3, emissive: 0x000000 });
  const die = at(new Mesh(new BoxGeometry(1.5, 0.12, 1.5), dieMat), 0, 0.18, 0); scene.add(die);
  // 散熱片：底座＋鰭片
  const sink = new Group(); scene.add(sink);
  const alu = std(0xc9d2e0, { metalness: 0.2, roughness: 0.45 });
  sink.add(at(new Mesh(new BoxGeometry(2.4, 0.14, 2.4), alu), 0, 0.31, 0));
  for (let i = 0; i < FINS; i++) sink.add(at(new Mesh(new BoxGeometry(0.07, SINK_H, 2.4), alu), -1.1 + i * 0.22, 0.38 + SINK_H / 2, 0));
  // 風扇：框＋會轉的葉片
  const fan = new Group(); at(fan, 0, 0.38 + SINK_H + 0.2, 0); scene.add(fan);
  fan.add(new Mesh(new BoxGeometry(2.4, 0.3, 2.4), std(0x22262e, { transparent: true, opacity: 0.35 })));
  const blades = new Group(); fan.add(blades);
  blades.add(new Mesh(new CylinderGeometry(0.28, 0.28, 0.22, 20), std(0x2b303b)));
  for (let i = 0; i < 7; i++) { const b = new Mesh(new BoxGeometry(0.8, 0.03, 0.34), std(0x58b4ff, { transparent: true, opacity: 0.85 })); b.position.set(Math.cos(i * 0.898) * 0.62, 0, Math.sin(i * 0.898) * 0.62); b.rotation.set(0.35, -i * 0.898, 0); blades.add(b); }
  // 熱（橘色小點）
  const heat = new InstancedMesh(new SphereGeometry(0.045, 8, 6), new MeshBasicMaterial({ color: 0xffa23a, transparent: true, opacity: 0.9 }), N_HEAT);
  heat.frustumCulled = false; scene.add(heat);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    die: lab.add('cp-lb cp-ht-lb-die', ''),
    sink: lab.add('cp-lb', 'Heat sink: fins give the heat more surface<small>散熱片：鰭片讓熱有更多表面可以散</small>'),
    fan: lab.add('cp-lb cp-pk-lb-logic', 'Fan: carries the hot air away<small>風扇：把熱空氣吹走</small>'),
    slow: lab.add('cp-lb cp-is-lb ip-lost cp-ht-lb-slow', 'Too hot: the chip slows itself down<small>太熱了：晶片自己放慢速度</small>'),
  };

  const R = {
    loads: [...root.querySelectorAll('.cp-ht-loads button')], coolers: [...root.querySelectorAll('.cp-ht-coolers button')],
    temp: $('.cp-ht-temp'), pw: $('.cp-ht-pw'), sp: $('.cp-ht-sp'), bar: $('.cp-ht-bar'), status: $('.cp-ht-status'),
    msgs: [...root.querySelectorAll('.cp-ht-msg')], play: $('.al-play'),
  };
  const state = { load: 'video', cooler: 'sink', T: AMBIENT, speed: 1, labels: true, playing: true, clock: 0, spin: 0, sinkK: 1, fanK: 0 };

  const m4 = new Matrix4(), tmp = V(0, 0, 0), col = new Color();
  function draw(dt) {
    const hasSink = state.cooler !== 'none', hasFan = state.cooler === 'fan';
    state.sinkK += ((hasSink ? 1 : 0) - state.sinkK) * Math.min(1, dt * 6);
    state.fanK += ((hasFan ? 1 : 0) - state.fanK) * Math.min(1, dt * 6);
    sink.visible = state.sinkK > 0.02; sink.scale.setScalar(Math.max(0.001, state.sinkK)); sink.position.y = (1 - state.sinkK) * 1.2;
    fan.visible = state.fanK > 0.02; fan.scale.setScalar(Math.max(0.001, state.fanK));
    if (state.playing) state.spin += dt * 14 * state.fanK;
    blades.rotation.y = state.spin;
    tempColor(state.T, col); dieMat.color.copy(col); dieMat.emissive.copy(col).multiplyScalar(MathUtils.clamp((state.T - 60) / 80, 0, 0.5));
    // 熱：從晶片往上；有散熱片就沿鰭片往上，有風扇就被吹到旁邊
    const p = power(state.load, state.speed) / 100, top = 0.38 + SINK_H * state.sinkK;
    for (let i = 0; i < N_HEAT; i++) {
      const on = hash(i, 1) < 0.12 + p * 0.88 && state.playing ? 1 : 0;
      const u = (((state.clock * (0.25 + 0.2 * hash(i, 2)) * (hasFan ? 1.8 : 1) + hash(i, 3)) % 1) + 1) % 1;
      const x0 = (hash(i, 4) - 0.5) * 1.3, z0 = (hash(i, 5) - 0.5) * 1.3;
      const fx = hasSink ? Math.round((x0 + 1.1) / 0.22) * 0.22 - 1.1 + 0.11 : x0;      // 走在鰭片之間
      const rise = hasSink ? top + 0.2 : 1.1;
      tmp.set(MathUtils.lerp(x0, fx, Math.min(1, u * 4)), 0.26 + u * rise, z0);
      if (hasFan && u > 0.75) { const k = (u - 0.75) / 0.25; tmp.y += k * 0.5; tmp.x += (hash(i, 6) - 0.5) * k * 2.4; tmp.z += (hash(i, 7) - 0.5) * k * 2.4; }
      else if (!hasSink) { tmp.x += Math.sin(u * 6 + i) * 0.12; }
      const s = on * (1 - Math.pow(u, 3)) * (hasFan ? 0.8 : 1);
      m4.makeScale(s, s, s).setPosition(tmp); heat.setMatrixAt(i, m4);
    }
    heat.instanceMatrix.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    L.die.innerHTML = `Chip: ${Math.round(state.T)}°C<small>晶片：${Math.round(state.T)}°C</small>`;
    show(L.die, true, V(-1.0, 0.2, 1.3), 18);
    show(L.sink, on && state.cooler !== 'none' && state.sinkK > 0.8 && !narrow, V(1.25, 0.9, 1.2), 0); L.sink.style.marginLeft = '120px';
    show(L.fan, on && state.cooler === 'fan' && state.fanK > 0.8, V(0, 0.38 + SINK_H + 0.4, 0), -22);
    show(L.slow, state.speed < 0.97, V(0, 0.3, 0), state.cooler === 'none' ? -30 : -6);
  }

  function readout() {
    const p = power(state.load, state.speed);
    R.loads.forEach((b) => b.setAttribute('aria-pressed', b.dataset.load === state.load ? 'true' : 'false'));
    R.coolers.forEach((b) => b.setAttribute('aria-pressed', b.dataset.cooler === state.cooler ? 'true' : 'false'));
    R.temp.textContent = `${Math.round(state.T)}°C`;
    R.pw.innerHTML = `${Math.round(p)}%<small>of full power · 滿載的百分比</small>`;
    R.sp.innerHTML = `${Math.round(state.speed * 100)}%<small>${state.speed < 0.97 ? 'slowed down · 被降速' : 'full speed · 全速'}</small>`;
    R.bar.style.setProperty('--w', `${MathUtils.clamp((state.T - AMBIENT) / (110 - AMBIENT), 0, 1) * 100}%`);
    R.bar.classList.toggle('hot', state.T > LIMIT - 5);
    const slow = state.speed < 0.97, key = slow ? 'throttle' : state.cooler === 'fan' ? 'fan' : state.cooler === 'sink' ? 'sink' : 'none';
    const st = slow ? ['Too hot: slowing down', '太熱：正在降速', 'bad'] : state.T > 80 ? ['Hot, but holding', '很熱，還撐得住', ''] : ['Cool and fast', '涼快、全速', 'ok'];
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `cp-ht-status ${st[2]}`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== key; });
  }

  function setLoad(v) { if (v in LOADS) state.load = v; }
  function setCooler(v) { if (v in COOLERS) state.cooler = v; }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.loads.forEach((b) => b.addEventListener('click', () => { setLoad(b.dataset.load); setPlaying(true); }));
  R.coolers.forEach((b) => b.addEventListener('click', () => { setCooler(b.dataset.cooler); setPlaying(true); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function step(dt) {
    if (state.playing) {
      state.clock += dt;
      let left = dt * 3;                               // 模型的時間走 3 倍快
      while (left > 0) { const d = Math.min(0.05, left); left -= d; const s = stepHeat({ T: state.T, speed: state.speed }, { load: state.load, cooler: state.cooler }, d); state.T = s.T; state.speed = s.speed; }
    }
    draw(dt);
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
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

  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const set = (load, cooler) => { setLoad(load); setCooler(cooler); setPlaying(true); };
  const DEMO = { idle: () => set('idle', 'none'), hot: () => set('game', 'none'), sink: () => set('game', 'sink'), fan: () => set('game', 'fan') };
  root.__lab = {
    camera, controls, state, setLoad, setCooler, setPlaying, set,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：電壓和速度怎麼影響耗電？（不需要 WebGL） ----------------
function initVf() {
  const el = document.querySelector('[data-chip-vf]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const v = $('.cp-vf-v'), f = $('.cp-vf-f'), vo = $('.cp-vf-v-out'), fo = $('.cp-vf-f-out'), n = $('.cp-vf-n'), bar = $('.cp-vf-bar'), en = $('.cp-vf-en'), zh = $('.cp-vf-zh');
  function show() {
    const vv = +v.value / 100, ff = +f.value / 100, p = relPower(vv, ff) * 100;
    vo.textContent = `${v.value}%`; fo.textContent = `${f.value}%`;
    v.style.setProperty('--p', `${(+v.value - 50) / 80 * 100}%`); f.style.setProperty('--p', `${(+f.value - 50) / 100 * 100}%`);
    n.textContent = `${Math.round(p)}%`;
    bar.style.width = `${Math.min(100, p / 2.6)}%`;
    const d = Math.round(p - 100);
    en.textContent = d === 0 ? 'The same heat as before.' : d < 0 ? `${-d}% less heat than before.` : `${d}% more heat than before.`;
    zh.textContent = d === 0 ? '發的熱和原來一樣。' : d < 0 ? `發的熱比原來少 ${-d}%。` : `發的熱比原來多 ${d}%。`;
  }
  v.addEventListener('input', show); f.addEventListener('input', show);
  el.querySelectorAll('.cp-vf-pre button').forEach((b) => b.addEventListener('click', () => { v.value = b.dataset.v; f.value = b.dataset.f; show(); }));
  show();
  el.__vf = { show, set: (a, b) => { v.value = String(a); f.value = String(b); show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVf);
else initVf();

lazyBoot('[data-chipheat-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
