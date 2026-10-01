/*
 * 萬物原理 · 第九課「天空為什麼是藍色的？」的 3D 陽光散射（自繪示意；大氣畫得比真的厚很多）。
 *
 * 一個機制：陽光是各種顏色混在一起的白光；空氣分子比光的波長小很多，把短波長的藍光散射得比紅光多很多
 *   （瑞利散射，約與波長的四次方成反比）。被散射的藍光從天空四面八方射向你 → 天空是藍的。
 *   太陽越低，陽光斜穿過的空氣越多（地平線約 38 倍），藍光在路上就被散光了，剩下紅、橙 → 夕陽。
 *
 * 場景：側面看地球的一段弧（半徑 14）和大氣層（厚 2.2，誇大），你站在弧頂（原點）；太陽在左邊，
 *   高度用滑桿調。光子（彩色小點）從太陽方向射進來，在大氣裡依「密度 × 散射係數 ∝ λ^−4」的機率
 *   轉向四面八方。右側小窗「你看到的」用 skycalc.js 的單次散射公式算天空與太陽的顏色。
 *
 * 產物：cd tools/science && npm run build → assets/js/sky-scatter.js
 */
import {
  AdditiveBlending, AmbientLight, BackSide, BufferGeometry, Color, CylinderGeometry, DirectionalLight,
  Float32BufferAttribute, Group, Line, LineDashedMaterial, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, Points, PointsMaterial, Scene, SphereGeometry, Sprite, SpriteMaterial, CanvasTexture, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { BANDS, airMass, transmit, skyColor, sunColor, scatterRatio } from './skycalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const RE = 14, ATM = 2.2, HS = 0.7;           // 地球半径、大氣厚度、密度的尺度高度（都是示意）
const CENTER = V(0, -RE, 0);
const MAXP = 1600, SPEED = 7, RATE = 150, SUN_D = 10.5, SC_LIFE = 1.4;
const BETA0 = 0.3;                            // 530 nm 在地面的散射係數（示意）
const D = Math.PI / 180;

const MSG = {
  high: ['Sunlight is white, a mix of every color. Air molecules are much smaller than light waves, so they scatter blue light several times more than red. That scattered blue reaches your eyes from every part of the sky.',
    '陽光是白光，各種顏色混在一起。空氣分子比光的波長小很多，散射藍光比紅光多好幾倍。被散射的藍光從天空的每個方向射進你的眼睛。'],
  mid: ['A lower Sun means a longer path: the light crosses more air, so more blue is scattered away before it reaches you. The Sun starts to look yellow.',
    '太陽越低，光走的路越長：穿過的空氣越多，藍光在半路被散射掉的也越多，太陽開始變黃。'],
  low: ['Near sunset, sunlight crosses up to about 38 times as much air as when the Sun is straight overhead. Almost all the blue is scattered out on the way, so the Sun and the sky around it glow orange and red.',
    '接近日落時，陽光要穿過的空氣最多約是太陽在正上方時的 38 倍。藍光幾乎全在路上被散射掉，所以太陽和旁邊的天空變成橙紅色。'],
  noair: ['With no air, nothing scatters the sunlight. The sky stays black even when the Sun is up, just like on the Moon.',
    '沒有空氣，就沒有東西散射陽光。就算太陽高掛，天空還是黑的，就像在月球上。'],
};

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
  scene.background = new Color(0x04070f);
  const camera = new PerspectiveCamera(36, 1, 0.1, 300);
  const TARGET = V(-2.6, 3.4, 0);
  const homePos = () => TARGET.clone().add(V(1.5, 1.5, 27).multiplyScalar(camera.aspect < 0.9 ? 1.5 : camera.aspect < 1.2 ? 1.15 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 70;
  controls.target.copy(TARGET);
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sunLight = new DirectionalLight(0xffffff, 1.4); scene.add(sunLight);

  // 星星（沒有大氣時看得最清楚）
  const starMat = new PointsMaterial({ color: 0xdfe8ff, size: 0.18, transparent: true, opacity: 0.8 });
  {
    const arr = [];
    for (let i = 0; i < 500; i++) {
      const a = Math.random() * Math.PI * 2, b = Math.acos(Math.random() * 2 - 1), r = 80;
      arr.push(r * Math.sin(b) * Math.cos(a), Math.abs(r * Math.cos(b)) - 10, r * Math.sin(b) * Math.sin(a) - 30);
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(arr, 3));
    scene.add(new Points(g, starMat));
  }

  // ---------------- 地球、大氣 ----------------
  scene.add(at(new Mesh(new SphereGeometry(RE, 160, 80), new MeshStandardMaterial({ color: 0x2f5b3c, roughness: 0.95 })), 0, -RE, 0));
  const atmMat = new MeshBasicMaterial({ color: 0x6fb6ff, transparent: true, opacity: 0.16, depthWrite: false });
  const atm = at(new Mesh(new SphereGeometry(RE + ATM, 160, 80), atmMat), 0, -RE, 0); scene.add(atm);
  const atmIn = new MeshBasicMaterial({ color: 0x6fb6ff, transparent: true, opacity: 0.1, side: BackSide, depthWrite: false });
  scene.add(at(new Mesh(new SphereGeometry(RE + ATM, 160, 80), atmIn), 0, -RE, 0));

  // 你（彰化）
  const you = new Group(); scene.add(you);
  you.add(at(new Mesh(new CylinderGeometry(0.08, 0.1, 0.36, 12), new MeshStandardMaterial({ color: 0xffb02e })), 0, 0.18, 0));
  you.add(at(new Mesh(new SphereGeometry(0.09, 14, 10), new MeshStandardMaterial({ color: 0xf1d2b6 })), 0, 0.44, 0));
  const EYE = V(0, 0.45, 0);

  // 太陽
  const sunMat = new MeshBasicMaterial({ color: 0xffffff });
  const sun = new Mesh(new SphereGeometry(0.75, 32, 20), sunMat); scene.add(sun);
  // 太陽的光暈：放射狀漸層的 sprite
  const gcv = document.createElement('canvas'); gcv.width = gcv.height = 128;
  const gx = gcv.getContext('2d'), gr = gx.createRadialGradient(64, 64, 8, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  gx.fillStyle = gr; gx.fillRect(0, 0, 128, 128);
  const glowMat = new SpriteMaterial({ map: new CanvasTexture(gcv), color: 0xffffff, transparent: true, blending: AdditiveBlending, depthWrite: false });
  const glow = new Sprite(glowMat); glow.scale.set(5, 5, 1); scene.add(glow);

  // 陽光到你的路徑（在大氣裡的那段）
  const pathGeo = new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 1, 0)]);
  const path = new Line(pathGeo, new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.3, gapSize: 0.18 }));
  path.frustumCulled = false; scene.add(path);

  // ---------------- 光子 ----------------
  const pos = new Float32Array(MAXP * 3), col = new Float32Array(MAXP * 3);
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new Float32BufferAttribute(col, 3));
  const pPos = pGeo.attributes.position.array, pCol = pGeo.attributes.color.array;
  const pts = new Points(pGeo, new PointsMaterial({ size: 0.26, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending }));
  pts.frustumCulled = false; scene.add(pts);
  const P = [];   // { p, v, band, sc, age }
  const BCOL = BANDS.map((b) => new Color().setRGB(...b.rgb));
  const BETA = BANDS.map((b) => BETA0 * (530 / b.nm) ** 4);
  // 太陽光譜權重（紫光少一點）
  const WEIGHT = [0.12, 0.22, 0.24, 0.22, 0.2];
  const pickBand = () => { let r = Math.random(), i = 0; while (i < 4 && r > WEIGHT[i]) { r -= WEIGHT[i]; i++; } return i; };

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    sun: lab.add('bt-lb bt-lb-b', 'Sun<small>太陽</small>'),
    you: lab.add('bt-lb bs-lb-you', 'You in Changhua<small>彰化的你</small>'),
    atm: lab.add('bt-lb bt-lb-e', 'Air (drawn much thicker)<small>大氣（畫得厚很多）</small>'),
    space: lab.add('bt-lb ip-region', 'Space<small>太空</small>'),
    path: lab.add('bt-lb bs-lb-path', ''),
  };

  const R = {
    sky: $('.bs-view'), elev: $('.bs-elev'), elevOut: $('.bs-elev-out'), am: $('.bs-am'), blue: $('.bs-blue'), red: $('.bs-red'),
    bars: $('.bs-bars'), msg: $('.bs-msg'), play: $('.al-play'), when: $('.bs-when'),
  };
  const state = { elev: 60, air: true, photons: true, labels: true, playing: true, lastMsg: '', spawnAcc: 0 };
  const sunDir = () => V(-Math.cos(state.elev * D), Math.sin(state.elev * D), 0);

  // ---------------- 你看到的天空（2D 小窗） ----------------
  const ctx = R.sky.getContext('2d');
  const stars2d = Array.from({ length: 60 }, () => [Math.random(), Math.random() * 0.8]);
  function drawView() {
    const w = R.sky.clientWidth, h = R.sky.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (R.sky.width !== Math.round(w * dpr)) { R.sky.width = Math.round(w * dpr); R.sky.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gh = h * 0.82;   // 地平線的位置
    const css = (c, a = 1) => `rgba(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)},${a})`;
    const g = ctx.createLinearGradient(0, gh, 0, 0);
    for (const v of [0.5, 3, 8, 15, 30, 55, 90]) g.addColorStop(Math.min(1, Math.sin(v * D) * 1.05 + (v > 1 ? 0.04 : 0)), css(skyColor(state.elev, v, state.air)));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, gh);
    if (!state.air) {
      ctx.fillStyle = 'rgba(230,236,255,.9)';
      for (const [x, y] of stars2d) ctx.fillRect(x * w, y * gh, 1.5, 1.5);
    }
    // 太陽：高度角對應到畫面（0° 在地平線、90° 在頂端），放在左三分之一
    const sy = gh - Math.sin(state.elev * D) * gh * 0.92, sx = w * 0.3, sr = Math.max(7, w * 0.04);
    const sc = sunColor(state.elev, state.air);
    const halo = ctx.createRadialGradient(sx, sy, sr * 0.5, sx, sy, sr * 4.5);
    halo.addColorStop(0, css(sc, 0.55)); halo.addColorStop(1, css(sc, 0));
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(sx, sy, sr * 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = css(sc.map((v) => Math.min(1, v * 1.15))); ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
    // 地面
    const gg = ctx.createLinearGradient(0, gh, 0, h);
    gg.addColorStop(0, '#24402c'); gg.addColorStop(1, '#101c14');
    ctx.fillStyle = gg; ctx.fillRect(0, gh, w, h - gh);
  }

  // ---------------- 每格 ----------------
  const tmp = V(0, 0, 0);
  function spawn(n) {
    const d = sunDir(), perp = V(d.y, -d.x, 0);   // 垂直於光線、在畫面平面裡（往天上那一側）
    if (perp.y < 0) perp.negate();
    for (let k = 0; k < n && P.length < MAXP; k++) {
      const u = -0.5 + Math.random() * 2.6, w = (Math.random() * 2 - 1) * 1.4;
      const p = V(0, 0.2, 0).addScaledVector(d, SUN_D - 0.6 + Math.random() * 0.4).addScaledVector(perp, u).add(V(0, 0, w));
      P.push({ p, v: d.clone().multiplyScalar(-SPEED), band: pickBand(), sc: 0, age: 0 });
    }
  }
  function step(dt) {
    if (state.playing && state.photons) {
      state.spawnAcc += dt * RATE;
      const n = Math.floor(state.spawnAcc); state.spawnAcc -= n;
      spawn(n);
    }
    let w = 0;
    for (let i = 0; i < P.length; i++) {
      const ph = P[i];
      if (state.playing) {
        ph.p.addScaledVector(ph.v, dt);
        ph.age += dt;
        const h = tmp.copy(ph.p).sub(CENTER).length() - RE;
        if (state.air && h < ATM && h > 0) {
          const prob = BETA[ph.band] * Math.exp(-h / HS) * SPEED * dt;
          if (Math.random() < prob) {
            const a = Math.random() * Math.PI * 2, c = Math.random() * 2 - 1, s = Math.sqrt(1 - c * c);
            ph.v.set(s * Math.cos(a), c, s * Math.sin(a)).multiplyScalar(SPEED * 0.5);
            ph.sc = ph.age;
          }
        }
        if (h < 0 || ph.age > 6 || ph.p.length() > 40 || (ph.sc && ph.age - ph.sc > SC_LIFE)) continue;   // 打到地面、飛遠了、散射後淡出就移除
      }
      if (!state.photons) continue;
      P[w++] = ph;
      const c = BCOL[ph.band], f = ph.sc ? 1.3 * (1 - (ph.age - ph.sc) / SC_LIFE) : 1;
      pPos[(w - 1) * 3] = ph.p.x; pPos[(w - 1) * 3 + 1] = ph.p.y; pPos[(w - 1) * 3 + 2] = ph.p.z;
      pCol[(w - 1) * 3] = c.r * f; pCol[(w - 1) * 3 + 1] = c.g * f; pCol[(w - 1) * 3 + 2] = c.b * f;
    }
    P.length = w;
    pGeo.setDrawRange(0, w);
    pGeo.attributes.position.needsUpdate = true;
    pGeo.attributes.color.needsUpdate = true;
    pts.visible = state.photons;

    const d = sunDir();
    sun.position.copy(d).multiplyScalar(SUN_D).add(V(0, 0.2, 0));
    glow.position.copy(sun.position);
    sunLight.position.copy(d).multiplyScalar(40);
    const sc = sunColor(state.elev, state.air);
    sunMat.color.setRGB(...sc.map((v) => Math.min(1, v * 1.2)));
    glowMat.color.setRGB(...sc);
    const sky = skyColor(state.elev, 50, state.air);
    atmMat.color.setRGB(...sky.map((v) => Math.max(0.05, v))); atmIn.color.copy(atmMat.color);
    atmMat.opacity = state.air ? 0.1 + 0.18 * Math.max(...sky) : 0;
    atmIn.opacity = state.air ? 0.08 : 0;
    starMat.opacity = state.air ? 0.15 + 0.7 * (1 - Math.max(...sky)) : 0.9;
    // 路徑：從大氣頂端（沿太陽方向）到你
    const b = EYE.clone().sub(CENTER).dot(d), cc = EYE.clone().sub(CENTER).lengthSq() - (RE + ATM) ** 2;
    const tTop = -b + Math.sqrt(b * b - cc);
    pathGeo.setFromPoints([EYE.clone().addScaledVector(d, tTop), EYE]);
    path.computeLineDistances();
    path.visible = state.air;
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return { d, tTop };
  }

  let narrow = false;
  function updateLabels(info) {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.sun, on, sun.position, -34);
    show(L.you, true, V(0, 0.5, 0), -28);
    show(L.atm, on && state.air && !narrow, V(6.5, -0.4, 0));
    show(L.space, on && !narrow, V(6, 8.5, 0));
    const am = airMass(state.elev);
    L.path.innerHTML = `${am.toFixed(1)}× the air<small>穿過 ${am.toFixed(1)} 倍的空氣</small>`;
    show(L.path, on && state.air && !narrow, EYE.clone().addScaledVector(info.d, Math.min(info.tTop * 0.55, 5)), -18);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let lastBars = '';
  function readout() {
    const e = state.elev;
    R.elevOut.textContent = `${e.toFixed(e < 10 ? 1 : 0)}°`;
    R.elev.style.setProperty('--p', `${e / 90 * 100}%`);
    const am = state.air ? airMass(e) : 0;
    R.am.innerHTML = state.air ? `${am.toFixed(1)}×` : 'None<small>沒有</small>';
    R.blue.textContent = `${Math.round(transmit(460, e, state.air) * 100)}%`;
    R.red.textContent = `${Math.round(transmit(650, e, state.air) * 100)}%`;
    R.when.innerHTML = e >= 40 ? 'Middle of the day<small>白天</small>' : e >= 12 ? 'Late afternoon<small>午後</small>' : e >= 0.6 ? 'Near sunset<small>接近日落</small>' : 'Sunset<small>日落</small>';
    const bars = BANDS.map((b) => {
      const t = transmit(b.nm, e, state.air) * 100;
      return `<li><span>${b.en}<small>${b.zh}</small></span><i style="--w:${t.toFixed(1)}%;--c:rgb(${b.rgb.map((v) => Math.round(v * 255)).join(',')})"></i><b>${Math.round(t)}%</b></li>`;
    }).join('');
    if (bars !== lastBars) { R.bars.innerHTML = bars; lastBars = bars; }
    const key = !state.air ? 'noair' : e >= 40 ? 'high' : e >= 12 ? 'mid' : 'low';
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    drawView();
  }

  // ---------------- 操作 ----------------
  function setElev(v) { state.elev = MathUtils.clamp(+v, 0, 90); R.elev.value = String(state.elev); }
  R.elev.addEventListener('input', () => setElev(R.elev.value));
  function setAir(v) { state.air = v; const t = $('[data-t="air"]'); if (t) t.checked = v; }
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="air"]', setAir);
  bind('[data-t="photons"]', (v) => { state.photons = v; if (!v) P.length = 0; });
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const info = step(dt);
    controls.update();
    updateLabels(info);
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 46 : 36;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
    drawView();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(drawView).observe(R.sky);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setElev(60);
  for (let i = 0; i < 120; i++) step(1 / 40);   // 先讓光子跑一下，一打開就看得到
  readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    noon: () => { setAir(true); setElev(75); },
    afternoon: () => { setAir(true); setElev(25); },
    sunset: () => { setAir(true); setElev(1); },
    moon: () => { setAir(false); setElev(60); },
  };
  // 除錯：document.querySelector('[data-skyblue-lab]').__lab
  root.__lab = {
    camera, controls, state, setElev, setAir, photons: P,
    ratio: scatterRatio(450, 700),
    run: (sec) => { for (let t = 0; t < sec; t += 0.025) step(0.025); },
    render: () => { const i = step(0); controls.update(); updateLabels(i); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-skyblue-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
