/*
 * 天文教育 · 第四課「月亮與潮汐」的 3D 模型。
 *
 * 地心場景，太陽固定在 +X（同第一、二課），月亮照真實日期放在軌道上。
 * 海水是一層半透明的殼，逐點依「平衡潮」往外推：
 *   高度 ∝ 月潮 × P2(cos θ月) + 日潮 × P2(cos θ日)，P2(x) = (3x² − 1) / 2
 *   月潮以平均距離為 1、隨距離三次方變化；日潮約 0.46。
 * 所以大潮時海水被拉成長長的橢圓，小潮時兩個方向互相抵銷、變得比較圓。
 * 真實的潮汐鼓起只有約半公尺，這裡放大了大約一百萬倍。
 *
 * 地球：真實大陸（earthmap.js）、地軸傾斜與自轉照真實時間，彰化的圖釘在正確的位置。
 * 產物：cd tools/astro && npm run build → assets/js/tides.js
 */
import {
  AdditiveBlending, AmbientLight, ArrowHelper, BufferGeometry, Color, DirectionalLight,
  Float32BufferAttribute, Group, LineBasicMaterial, LineLoop, MathUtils, Mesh, MeshBasicMaterial,
  MeshLambertMaterial, PerspectiveCamera, Scene, ShaderMaterial, SphereGeometry, Sprite,
  SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, ZH_DAY, atmosphereMaterial, glowTexture, makeMoonTexture, phaseIndex, starField } from './common.js';
import { makeRealEarth } from './earthmap.js';
import * as E from './ephem.js';

const RE = 2;            // 地球半徑（畫面單位）
const DM = 10;           // 平均地月距離（畫面單位，未按比例）
const RM = 0.55;
const DAY = 86400000, HOUR = 3600000;
const SITE = { lat: 24.08, lon: 120.54, tz: 8 };
const PHASES = [['New Moon', '新月（朔）'], ['Waxing Crescent', '眉月'], ['First Quarter', '上弦月'],
  ['Waxing Gibbous', '盈凸月'], ['Full Moon', '滿月（望）'], ['Waning Gibbous', '虧凸月'],
  ['Last Quarter', '下弦月'], ['Waning Crescent', '殘月']];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WD = ['日', '一', '二', '三', '四', '五', '六'];
const pad = (n) => String(n).padStart(2, '0');
function tw(d) {
  const x = new Date(d.getTime() + 8 * HOUR);
  return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() };
}

// 大潮／中潮／小潮：看日月的夾角離 0°、180°（大潮）或 90°（小潮）多近
function tideKind(elong) {
  const a = ((elong % 180) + 180) % 180;
  const d = Math.min(a, 180 - a);            // 0 = 日月同一直線，90 = 互相垂直
  if (d < 25) return { key: 'spring', en: 'Spring tide', zh: '大潮' };
  if (d > 65) return { key: 'neap', en: 'Neap tide', zh: '小潮' };
  return { key: 'mid', en: 'Medium tide', zh: '中潮' };
}

// 海水殼：頂點沿法線往外推（世界座標裡算，殼本身不自轉）
function oceanMaterial() {
  return new ShaderMaterial({
    uniforms: {
      moonDir: { value: new Vector3(1, 0, 0) }, sunDir: { value: new Vector3(1, 0, 0) },
      am: { value: 1 }, as: { value: E.SUN_TIDE }, gain: { value: 0.085 }, base: { value: 1.075 },
    },
    transparent: true, depthWrite: false,
    vertexShader: `
      uniform vec3 moonDir; uniform vec3 sunDir; uniform float am; uniform float as; uniform float gain; uniform float base;
      varying vec3 vN; varying vec3 vV; varying float vH;
      float P2(float x){ return 1.5 * x * x - 0.5; }
      void main(){
        vec3 n = normalize(position);
        float h = am * P2(dot(n, moonDir)) + as * P2(dot(n, sunDir));
        vH = h;
        vec3 p = n * ${RE.toFixed(1)} * (base + gain * h);
        vec4 w = modelMatrix * vec4(p, 1.0);
        vN = normalize(mat3(modelMatrix) * n);
        vV = normalize(cameraPosition - w.xyz);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `
      varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        float lam = max(dot(normalize(vN), vec3(1.0, 0.0, 0.0)), 0.0);
        float rim = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0);
        vec3 deep = vec3(0.10, 0.36, 0.78), high = vec3(0.35, 0.78, 1.0);
        vec3 col = mix(deep, high, smoothstep(-0.6, 1.2, vH)) * (0.35 + 0.75 * lam) + rim * vec3(0.4, 0.7, 1.0) * 0.6;
        gl_FragColor = vec4(col, 0.30 + 0.35 * rim);
        #include <colorspace_fragment>
      }`,
  });
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels');
  const whyCv = $('.td-why-cv'), curveCv = $('.td-curve-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); return null; }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  const scene = new Scene();
  scene.background = new Color(0x050814);
  scene.add(starField(1800, 2500, 99, 1.6));
  scene.add(new AmbientLight(0xb8c6ff, 0.12));
  const sunLight = new DirectionalLight(0xfff4e0, 3.0); sunLight.position.set(1, 0, 0); scene.add(sunLight);
  const camera = new PerspectiveCamera(40, 1.6, 0.05, 6000);
  const HOME = new Vector3(1.2, 11.5, 6.2);
  camera.position.copy(HOME);
  const controls = new OrbitControls(camera, spaceCv);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.minDistance = 4; controls.maxDistance = 70;

  const sun = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.24, 'rgba(255,190,80,.55)'], [0.5, 'rgba(255,150,40,.14)'], [1, 'rgba(255,120,20,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  sun.position.set(DM * 2.4, 0, 0); sun.scale.setScalar(DM * 0.9); scene.add(sun);

  // 地球：axisG（地軸，在「太陽固定」座標裡隨季節轉）→ spinG（自轉）
  const axisG = new Group(); scene.add(axisG);
  const spinG = new Group(); axisG.add(spinG);
  const earth = new Mesh(new SphereGeometry(RE, 96, 64), new MeshLambertMaterial({ map: makeRealEarth() }));
  spinG.add(earth);
  const pin = new Mesh(new SphereGeometry(0.09, 16, 12), new MeshBasicMaterial({ color: 0xff5a36 }));
  pin.position.set(RE * 1.005 * Math.cos(SITE.lat * DEG) * Math.cos(SITE.lon * DEG), RE * 1.005 * Math.sin(SITE.lat * DEG), -RE * 1.005 * Math.cos(SITE.lat * DEG) * Math.sin(SITE.lon * DEG));
  spinG.add(pin);
  const ocean = new Mesh(new SphereGeometry(1, 128, 96), oceanMaterial());
  ocean.renderOrder = 2; scene.add(ocean);
  const atmo = new Mesh(new SphereGeometry(RE * 1.25, 48, 32), atmosphereMaterial()); scene.add(atmo);

  // 月球與軌道
  const moon = new Mesh(new SphereGeometry(RM, 48, 32), new MeshLambertMaterial({ map: makeMoonTexture() }));
  scene.add(moon);
  {
    const pts = [];
    for (let i = 0; i < 180; i++) { const a = (i / 180) * TAU; pts.push(DM * Math.cos(a), 0, -DM * Math.sin(a)); }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts, 3));
    scene.add(new LineLoop(g, new LineBasicMaterial({ color: 0x9fb6d8, transparent: true, opacity: 0.35 })));
  }

  // 潮汐力箭頭：在黃道面上繞地球一圈
  const arrows = [];
  const arrowG = new Group(); scene.add(arrowG);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU;
    const p = new Vector3(Math.cos(a), 0, -Math.sin(a));
    const ar = new ArrowHelper(p, p.clone().multiplyScalar(RE * 1.55), 1, 0xffd36e, 0.22, 0.16);
    ar.line.material.transparent = true; ar.line.material.opacity = 0.9;
    arrowG.add(ar); arrows.push({ ar, p });
  }

  // ---------------- 狀態 ----------------
  const now = Date.now();
  const state = { t: now, w0: now - 10 * DAY, playing: false, speed: 0.25, sunTide: true, arrows: true, why: 'pull', span: 2 };
  const SPAN = 45 * DAY;

  const tmp = new Vector3(), mDir = new Vector3(), sDir = new Vector3(1, 0, 0);
  let cur = { elong: 0, f: null };
  function update() {
    const date = new Date(state.t);
    const m = E.moonPos(date), s = E.sunPos(date);
    const elong = ((m.lon - s.lon) % 360 + 360) % 360;
    const er = elong * DEG, b = m.lat * DEG;
    mDir.set(Math.cos(b) * Math.cos(er), Math.sin(b), -Math.cos(b) * Math.sin(er));
    const dist = DM * m.dist / 384400;
    moon.position.copy(mDir).multiplyScalar(dist);
    moon.rotation.y = er + Math.PI;
    // 地軸：慣性空間裡指向 (0, cos ε, -sin ε)；在「太陽固定在 +X」的座標裡要轉 -λ☉
    axisG.rotation.set(0, 0, 0);
    axisG.rotateY(-s.lon * DEG);
    axisG.rotateX(-E.OBLIQUITY * DEG);
    spinG.rotation.y = E.gmst(date) * DEG;
    const f = E.tideFactors(date);
    const u = ocean.material.uniforms;
    u.moonDir.value.copy(mDir); u.sunDir.value.copy(sDir);
    u.am.value = f.moon; u.as.value = state.sunTide ? f.sun : 0;
    // 潮汐力：F ∝ 3(p·d)d − p，月、日相加
    for (const { ar, p } of arrows) {
      const F = new Vector3().addScaledVector(mDir, 3 * p.dot(mDir)).sub(p).multiplyScalar(f.moon);
      if (state.sunTide) F.add(new Vector3().addScaledVector(sDir, 3 * p.dot(sDir)).sub(p).multiplyScalar(f.sun));
      const len = F.length();
      ar.setDirection(F.clone().normalize());
      ar.setLength(Math.max(0.12, len * 0.55), Math.min(0.22, 0.12 + len * 0.1), 0.16);
    }
    arrowG.visible = state.arrows;
    cur = { elong, f, date };
    readout(date, elong, f, m);
    drawCurve();
    slider.value = String((state.t - state.w0) / HOUR);
    slider.style.setProperty('--p', `${((state.t - state.w0) / SPAN) * 100}%`);
    const x = tw(date);
    timeSl.value = String(x.h * 60 + x.mi);
    timeSl.style.setProperty('--p', `${((x.h * 60 + x.mi) / 1440) * 100}%`);
  }

  // ---------------- 讀數 ----------------
  const R = {
    date: $('.td-date'), phase: $('.td-phase'), lunar: $('.td-lunar'), kind: $('.td-kind'), kindSub: $('.td-kind-sub'),
    angle: $('.td-angle'), size: $('.td-size'), dist: $('.td-dist'), whyCap: $('.td-why-cap'),
  };
  function readout(date, elong, f, m) {
    const x = tw(date);
    R.date.innerHTML = `${MON[x.m - 1]} ${x.d}, ${x.y} · ${pad(x.h)}:${pad(x.mi)}<span>${x.y} 年 ${x.m} 月 ${x.d} 日（${WD[x.wd]}）${pad(x.h)}:${pad(x.mi)} 台灣時間</span>`;
    const [pe, pz] = PHASES[phaseIndex(elong)];
    R.phase.textContent = `${pe} · ${pz}`;
    const nm = E.lastNewMoon(date);
    R.lunar.textContent = `農曆${ZH_DAY[Math.max(0, Math.min(29, E.taiwanDayNumber(date) - E.taiwanDayNumber(nm)))]}`;
    const k = tideKind(elong);
    R.kind.textContent = `${k.en} · ${k.zh}`;
    R.kind.className = `td-kind td-${k.key}`;
    R.kindSub.innerHTML = !state.sunTide ? 'The Sun\'s tide is switched off<span>已關掉太陽的潮汐，只剩月亮</span>'
      : k.key === 'spring' ? 'Sun and Moon in line: their tides add up<span>日月排成一直線，兩股潮汐相加</span>'
        : k.key === 'neap' ? 'Sun and Moon at right angles: their tides partly cancel<span>日月互相垂直，兩股潮汐部分抵銷</span>'
          : 'In between spring and neap<span>介於大潮與小潮之間</span>';
    const a = ((elong % 180) + 180) % 180;
    R.angle.innerHTML = `${Math.min(a, 180 - a).toFixed(0)}°<span>0° = in line 一直線 · 90° = at right angles 垂直</span>`;
    // 半日潮的振幅：月潮與日潮以兩倍距角的相位差相加
    const sunA = state.sunTide ? f.sun : 0, c2 = Math.cos(2 * elong * DEG);
    const amp = Math.sqrt(f.moon * f.moon + sunA * sunA + 2 * f.moon * sunA * c2);
    const pct = Math.round((amp / (1 + E.SUN_TIDE)) * 100);
    R.size.innerHTML = `${pct}%<span>compared with an average spring tide · 與平均的大潮相比</span>`;
    const km = Math.round(m.dist / 100) * 100;
    R.dist.innerHTML = `${km.toLocaleString('en-US')} km<span>${m.dist < 370000 ? '比平常近，潮汐較強（近地點）' : m.dist > 400000 ? '比平常遠，潮汐較弱（遠地點）' : '接近平均距離 384,400 公里'}</span>`;
  }

  // ---------------- 為什麼有兩個鼓起（2D） ----------------
  const wctx = whyCv.getContext('2d');
  function arrow(ctx, x0, y0, x1, y1, col, w) {
    const a = Math.atan2(y1 - y0, x1 - x0), hl = Math.max(6, w * 3.2);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * hl * 0.7, y1 - Math.sin(a) * hl * 0.7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - Math.cos(a - 0.45) * hl, y1 - Math.sin(a - 0.45) * hl);
    ctx.lineTo(x1 - Math.cos(a + 0.45) * hl, y1 - Math.sin(a + 0.45) * hl); ctx.closePath(); ctx.fill();
  }
  function drawWhy() {
    const W = whyCv.width, H = whyCv.height, cx = W * 0.4, cy = H * 0.5, r = H * 0.26;
    const font = (px, w = 700) => `${w} ${Math.round(px)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    wctx.fillStyle = '#060b18'; wctx.fillRect(0, 0, W, H);
    // 月亮在右邊
    const mx = W * 0.92;
    const mg = wctx.createRadialGradient(mx - 3, cy - 3, 1, mx, cy, H * 0.07);
    mg.addColorStop(0, '#f2eee2'); mg.addColorStop(1, '#9d9a92');
    wctx.fillStyle = mg; wctx.beginPath(); wctx.arc(mx, cy, H * 0.07, 0, TAU); wctx.fill();
    wctx.fillStyle = 'rgba(220,228,245,.8)'; wctx.font = font(W * 0.034); wctx.textAlign = 'center';
    wctx.fillText('Moon 月亮', mx, cy + H * 0.15);
    if (state.why === 'pull') {
      wctx.fillStyle = '#1d4f91'; wctx.beginPath(); wctx.arc(cx, cy, r, 0, TAU); wctx.fill();
      // 遠側、中心、近側：同一條線上，越靠近月亮箭頭越長；標籤上下錯開
      const pts = [[-r, 0.1, 'weakest', '最弱', 1], [0, 0.13, 'average', '平均', -1], [r, 0.17, 'strongest', '最強', 1]];
      for (const [dx, k, en, zh, side] of pts) {
        const L = W * k;
        wctx.fillStyle = '#ffd36e'; wctx.beginPath(); wctx.arc(cx + dx, cy, W * 0.009, 0, TAU); wctx.fill();
        arrow(wctx, cx + dx, cy, cx + dx + L, cy, '#ffd36e', 3);
        wctx.fillStyle = '#ffe7a8'; wctx.font = font(W * 0.032, 700);
        const ly = cy + side * H * 0.17;
        wctx.fillText(en, cx + dx + L * 0.4, ly);
        wctx.font = font(W * 0.03, 600);
        wctx.fillText(zh, cx + dx + L * 0.4, ly + W * 0.036);
      }
      R.whyCap.textContent = "The Moon pulls the near side hardest and the far side least · 月亮對近側拉得最用力、對遠側最弱";
    } else {
      // 減掉平均之後：近側被拉向月亮、遠側被留在後面、上下被往內擠
      wctx.fillStyle = 'rgba(120,190,255,.35)';
      wctx.beginPath(); wctx.ellipse(cx, cy, r * 1.32, r * 0.86, 0, 0, TAU); wctx.fill();
      wctx.fillStyle = '#1d4f91'; wctx.beginPath(); wctx.arc(cx, cy, r, 0, TAU); wctx.fill();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU, px = Math.cos(a), py = Math.sin(a);
        const fx = 2 * px, fy = -py;            // 3(p·x̂)x̂ − p
        const x0 = cx + px * r * 1.08, y0 = cy + py * r * 1.08;
        arrow(wctx, x0, y0, x0 + fx * W * 0.045, y0 + fy * W * 0.045, '#ffd36e', 2.4);
      }
      wctx.fillStyle = '#ffe7a8'; wctx.font = font(W * 0.03, 600);
      wctx.fillText('pulled toward the Moon', cx + r * 1.45, cy - H * 0.3);
      wctx.fillText('被拉向月亮', cx + r * 1.45, cy - H * 0.3 + W * 0.04);
      wctx.fillText('left behind', cx - r * 1.2, cy - H * 0.3);
      wctx.fillText('被留在後面', cx - r * 1.2, cy - H * 0.3 + W * 0.04);
      R.whyCap.textContent = 'Take away the average pull and Earth is stretched: two bulges · 扣掉平均的拉力，剩下的把地球拉長——兩個鼓起';
    }
  }

  // ---------------- 彰化的理想化潮汐曲線（2D） ----------------
  const cctx = curveCv.getContext('2d');
  let curveKey = '', curveData = null;
  const tideCache = new Map();
  function drawCurve() {
    const W = curveCv.width, H = curveCv.height;
    const spanDays = state.span, t = state.t;
    const t0 = spanDays <= 2 ? t - 0.5 * DAY : t - 7 * DAY, t1 = t0 + spanDays * DAY;
    // 取樣點對齊固定間隔並快取：播放時視窗往前滑，已算過的點直接重用
    const step = spanDays <= 2 ? 10 * 60000 : HOUR;
    const a0 = Math.floor(t0 / step) * step;
    const key = `${spanDays}|${a0}|${state.sunTide}|${W}`;
    if (key !== curveKey) {
      if (tideCache.size > 6000) tideCache.clear();
      curveData = [];
      for (let tt = a0; tt <= t1 + step; tt += step) {
        const ck = `${state.sunTide ? 1 : 0}|${tt}`;
        let h = tideCache.get(ck);
        if (h === undefined) { h = E.equilibriumTide(new Date(tt), SITE, state.sunTide); tideCache.set(ck, h); }
        curveData.push([tt, h]);
      }
      curveKey = key;
    }
    const x0 = curveData[0][0], x1 = curveData[curveData.length - 1][0];
    const padL = W * 0.04, padR = W * 0.04, top = H * 0.16, bot = H * 0.8;
    const X = (tt) => padL + ((tt - x0) / (x1 - x0)) * (W - padL - padR);
    const Y = (h) => bot - ((h + 1.1) / 2.8) * (bot - top);
    cctx.fillStyle = '#060b18'; cctx.fillRect(0, 0, W, H);
    // 午夜格線與日期
    const font = (px, w = 700) => `${w} ${Math.round(px)}px Manrope, 'PingFang TC', 'Microsoft JhengHei', sans-serif`;
    cctx.font = font(W * 0.028, 600); cctx.textAlign = 'center';
    const first = tw(new Date(x0));
    let d = Date.UTC(first.y, first.m - 1, first.d + 1) - 8 * HOUR;
    let k = 0;
    for (; d < x1; d += DAY, k++) {
      const x = X(d);
      cctx.strokeStyle = 'rgba(160,180,230,.14)'; cctx.lineWidth = 1;
      cctx.beginPath(); cctx.moveTo(x, top - H * 0.04); cctx.lineTo(x, bot); cctx.stroke();
      if (spanDays <= 2 || k % 3 === 0) { const z = tw(new Date(d)); cctx.fillStyle = '#7f90b0'; cctx.fillText(`${z.m}/${z.d}`, x, H * 0.93); }
    }
    // 平均海面
    cctx.strokeStyle = 'rgba(160,180,230,.3)'; cctx.setLineDash([4, 4]);
    cctx.beginPath(); cctx.moveTo(padL, Y(0)); cctx.lineTo(W - padR, Y(0)); cctx.stroke(); cctx.setLineDash([]);
    // 曲線（填色＝海水）
    const g = cctx.createLinearGradient(0, top, 0, bot);
    g.addColorStop(0, 'rgba(90,170,255,.55)'); g.addColorStop(1, 'rgba(30,80,170,.15)');
    cctx.beginPath(); cctx.moveTo(X(x0), bot);
    for (const [tt, h] of curveData) cctx.lineTo(X(tt), Y(h));
    cctx.lineTo(X(x1), bot); cctx.closePath(); cctx.fillStyle = g; cctx.fill();
    cctx.beginPath();
    curveData.forEach(([tt, h], i) => (i ? cctx.lineTo(X(tt), Y(h)) : cctx.moveTo(X(tt), Y(h))));
    cctx.strokeStyle = '#7cc4ff'; cctx.lineWidth = 2; cctx.stroke();
    // 一個月的視窗：標出新月、滿月（大潮）與上下弦（小潮）
    if (spanDays > 2) {
      for (const target of [0, 90, 180, 270]) {
        let s = E.syzygyNear(new Date(x0 + 2 * DAY), target);
        for (let rep = 0; rep < 3; rep++, s = E.syzygyNear(new Date(s.getTime() + 29.5 * DAY), target)) {
          if (s.getTime() < x0 || s.getTime() > x1) continue;
          const x = X(s.getTime()), spring = target % 180 === 0;
          cctx.fillStyle = spring ? '#ffd36e' : '#9fb0cf';
          cctx.beginPath(); cctx.arc(x, H * 0.07, W * 0.012, 0, TAU);
          if (target === 0) { cctx.strokeStyle = '#ffd36e'; cctx.lineWidth = 1.5; cctx.stroke(); } else cctx.fill();
          cctx.font = font(W * 0.026, 700);
          cctx.fillText(spring ? '大潮' : '小潮', x, H * 0.145);
        }
      }
    }
    // 現在
    const xn = X(t);
    cctx.strokeStyle = '#ff5a36'; cctx.lineWidth = 2;
    cctx.beginPath(); cctx.moveTo(xn, top - H * 0.05); cctx.lineTo(xn, bot); cctx.stroke();
    const hn = E.equilibriumTide(new Date(t), SITE, state.sunTide);
    cctx.fillStyle = '#ff5a36'; cctx.beginPath(); cctx.arc(xn, Y(hn), W * 0.011, 0, TAU); cctx.fill();
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, html) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = html; labels.appendChild(s); return s; };
  const L = {
    sun: lab('sun', '&#9728; Sun · 太陽<b>&rarr;</b>'), moon: lab('moon', 'Moon · 月亮'),
    hi1: lab('tide', 'High tide · 滿潮'), hi2: lab('tide', 'High tide · 滿潮'),
    lo1: lab('tide lo', 'Low tide · 乾潮'), lo2: lab('tide lo', 'Low tide · 乾潮'),
    pin: lab('place', 'Changhua · 彰化'),
  };
  const proj = new Vector3();
  function place(el, v, dy = 6, show = true) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = !show || proj.z > 1 || Math.abs(proj.x) > 1.08 || Math.abs(proj.y) > 1.08;
    el.style.opacity = off ? 0 : 1;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, -50%)`;
  }
  function placeSun() {
    proj.copy(sun.position).project(camera);
    let x = proj.x, y = proj.y;
    if (proj.z > 1) { x = -x; y = -y; }
    const out = Math.abs(x) > 0.92 || Math.abs(y) > 0.9 || proj.z > 1;
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight, el = L.sun;
    el.classList.toggle('edge', out);
    let px = x, py = y;
    if (out) { const k = 1 / Math.max(Math.abs(x) / 0.8, Math.abs(y) / 0.84, 1e-6); px = x * k; py = y * k; el.style.setProperty('--ang', `${Math.atan2(-y, x)}rad`); }
    el.style.opacity = 1;
    const hw = el.offsetWidth / 2 + 8, hh = el.offsetHeight / 2 + 8;
    el.style.transform = `translate(${Math.min(w - hw, Math.max(hw, (px * 0.5 + 0.5) * w))}px, ${Math.min(h - hh, Math.max(hh, (-py * 0.5 + 0.5) * h))}px) translate(-50%, -50%)`;
  }
  function updateLabels() {
    placeSun();
    place(L.moon, tmp.copy(moon.position).add(new Vector3(0, 0, RM + 0.45)), 8);
    const f = cur.f;
    const hiR = RE * (1.075 + 0.085 * (f.moon + (state.sunTide ? f.sun * 0.5 : 0))) + 0.55;
    place(L.hi1, tmp.copy(mDir).setY(0).normalize().multiplyScalar(hiR));
    place(L.hi2, tmp.copy(mDir).setY(0).normalize().multiplyScalar(-hiR));
    const perp = new Vector3(-mDir.z, 0, mDir.x).normalize();
    place(L.lo1, tmp.copy(perp).multiplyScalar(RE * 1.05 + 0.2));
    place(L.lo2, tmp.copy(perp).multiplyScalar(-(RE * 1.05 + 0.2)));
    pin.getWorldPosition(tmp);
    place(L.pin, tmp, 16, camera.position.distanceTo(tmp) < camera.position.length());
  }

  // ---------------- 時間軸 ----------------
  const slider = $('.td-time'), track = $('.td-track'), timeSl = $('.td-tod');
  function buildTrack() {
    track.innerHTML = '';
    const w0 = state.w0, w1 = w0 + SPAN;
    for (const target of [0, 90, 180, 270]) {
      let s = E.syzygyNear(new Date(w0 + 3 * DAY), target);
      for (let rep = 0; rep < 3; rep++, s = E.syzygyNear(new Date(s.getTime() + 29.5 * DAY), target)) {
        if (s.getTime() < w0 || s.getTime() > w1) continue;
        const b = document.createElement('button'); b.type = 'button';
        const spring = target % 180 === 0;
        b.className = `se-mark td-mark ${spring ? 'td-spring' : 'td-neap'}`;
        b.style.left = `${((s.getTime() - w0) / SPAN) * 100}%`;
        b.textContent = spring ? '大潮' : '小潮';
        const x = tw(s);
        b.title = `${['New moon · 新月', 'First quarter · 上弦', 'Full moon · 滿月', 'Last quarter · 下弦'][target / 90]} ${x.m}/${x.d}`;
        const when = s.getTime();
        b.addEventListener('click', () => { setPlaying(false); setT(when); });
        track.appendChild(b);
      }
    }
    for (let d = Math.ceil((w0 + 8 * HOUR) / DAY) * DAY - 8 * HOUR; d < w1; d += DAY) {
      const x = tw(new Date(d));
      if (x.d !== 1 && x.d % 5 !== 0) continue;
      const el = document.createElement('span'); el.className = 'ec-tick' + (x.d === 1 ? ' ec-tick-y' : '');
      el.style.left = `${((d - w0) / SPAN) * 100}%`; el.textContent = `${x.m}/${x.d}`;
      track.appendChild(el);
    }
    slider.max = String(SPAN / HOUR);
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false); camera.aspect = w / h;
      const hMin = (camera.aspect < 1.1 ? 70 : 58) * DEG;
      camera.fov = Math.max(40, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    const pw = whyCv.parentElement.clientWidth;
    if (pw) {
      whyCv.width = Math.round(pw * dpr); whyCv.height = Math.round(pw * 0.5 * dpr);
      curveCv.width = Math.round(pw * dpr); curveCv.height = Math.round(pw * 0.52 * dpr);
      curveKey = '';
      drawWhy(); update();
    }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(whyCv.parentElement);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setSpeed(v) {
    state.speed = v;
    $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', Math.abs(parseFloat(b.dataset.speed) - v) < 1e-6 ? 'true' : 'false'));
  }
  function setT(t) {
    state.t = t;
    if (t < state.w0 || t > state.w0 + SPAN) { state.w0 = t - 10 * DAY; buildTrack(); }
    update();
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); if (!state.playing) setPlaying(true); }));
  slider.addEventListener('input', () => {
    setPlaying(false);
    const keep = tw(new Date(state.t));
    const d = tw(new Date(state.w0 + parseFloat(slider.value) * HOUR));
    setT(Date.UTC(d.y, d.m - 1, d.d, keep.h, keep.mi) - 8 * HOUR);
  });
  timeSl.addEventListener('input', () => {
    setPlaying(false);
    const x = tw(new Date(state.t));
    setT(Date.UTC(x.y, x.m - 1, x.d, 0, parseFloat(timeSl.value)) - 8 * HOUR);
  });
  $$('.td-phase-go').forEach((b) => b.addEventListener('click', () => {
    setPlaying(false);
    const target = parseFloat(b.dataset.target);
    let s = E.syzygyNear(new Date(Date.now()), target);
    if (s.getTime() < Date.now() - DAY) s = E.syzygyNear(new Date(s.getTime() + 29.5 * DAY), target);
    setT(s.getTime());
  }));
  $('.td-now').addEventListener('click', () => { setPlaying(false); setT(Date.now()); });
  $$('.td-why button').forEach((b) => b.addEventListener('click', () => {
    state.why = b.dataset.why;
    $$('.td-why button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    drawWhy();
  }));
  $$('.td-span button').forEach((b) => b.addEventListener('click', () => {
    state.span = parseFloat(b.dataset.span);
    $$('.td-span button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    curveKey = ''; drawCurve();
  }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); curveKey = ''; update(); }); };
  bind('[data-t="sun"]', (v) => { state.sunTide = v; });
  bind('[data-t="arrows"]', (v) => { state.arrows = v; });
  bind('[data-t="labels"]', (v) => { labels.style.display = v ? '' : 'none'; });
  const camFrom = new Vector3(); let camT = 1;
  $('.al-home').addEventListener('click', () => { camFrom.copy(camera.position); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setT(state.t + dt * state.speed * DAY);
    if (camT < 1) { camT = Math.min(1, camT + dt / 0.9); camera.position.lerpVectors(camFrom, HOME, MathUtils.smootherstep(camT, 0, 1)); }
    controls.update();
    scene.updateMatrixWorld();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  buildTrack();
  resize();
  setT(state.t);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setT, setPlaying };   // 除錯用：$('[data-tide-lab]').__lab
  return { jumpTo: (t) => { setPlaying(false); setT(t); } };
}

function boot() {
  const root = document.querySelector('[data-tide-lab]');
  if (!root) return;
  let api = null, started = false;
  const start = () => { if (!started) { started = true; api = initLab(root); } return api; };
  const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
  io.observe(root);
  // 「月相與潮汐」卡片：跳到下一次這個月相
  document.querySelectorAll('[data-lab-target]').forEach((b) => b.addEventListener('click', () => {
    const lab = start();
    if (!lab) return;
    const target = parseFloat(b.getAttribute('data-lab-target'));
    let s = E.syzygyNear(new Date(), target);
    if (s.getTime() < Date.now() - DAY) s = E.syzygyNear(new Date(s.getTime() + 29.5 * DAY), target);
    lab.jumpTo(s.getTime());
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
