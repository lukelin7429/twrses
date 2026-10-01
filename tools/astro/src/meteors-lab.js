/*
 * 天文教育 · 第十一課「流星雨是怎麼來的？」的 3D 模型。
 *
 * 一個機制：彗星沿著軌道撒下碎屑；地球每年在軌道上同一個位置穿過這條碎屑帶，碎屑撞進大氣燒掉，就是流星雨。
 * 左邊 3D：真實比例的地球軌道（1 AU＝10 單位）與母天體軌道（JPL 軌道根數），碎屑帶沿軌道流動（寬度刻意放大）；
 *   地球照真實日期繞太陽，到了極大期附近，迎面而來的流星體（從輻射點方向）打進地球。
 * 右邊 2D：極大那一夜彰化的全天星圖（北上東左），流星從輻射點往外射——透視讓平行的軌跡看起來從同一點散開。
 *
 * 計算：meteors.js（IMO 極大期 λ☉、輻射點、ZHR；月光；輻射點高度）。座標同第七課：黃道 (x, y, z) → 場景 (x, z, -y)。
 * 產物：cd tools/astro && npm run build → assets/js/meteors-lab.js
 */
import {
  AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Line, LineBasicMaterial, LineLoop, LineSegments,
  MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, ShaderMaterial, SphereGeometry,
  Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, glowTexture } from './common.js';
import { LINES, STARS } from './stars-data.js';
import { N_STARS, STAR_ECL, allStarsAltAz, bvColor, moonAltAzOf } from './sky.js';
import { helio } from './planets.js';
import {
  PARENTS, earthLonAt, moonIllum, nightOf, orbitPoint, radiantAltAz, radiantEcl, showerByKey, upcomingPeaks,
} from './meteors.js';

const K = 10;                       // 1 AU＝10 單位
const RS = 5000;                    // 星空半徑
const DAY = 86400000, HOUR = 3600000, YEAR = 365.25636 * DAY;
const SITE = { lat: 24.08, lon: 120.54 };   // 彰化
const N_DUST = 2600;
const COL = { qua: 0x9fd0ff, lyr: 0xc8b6ff, eta: 0x7fe0c6, per: 0xffc27a, ori: 0x7fe0c6, leo: 0xff9a7a, gem: 0xffe08a, urs: 0xa8e6ff };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const sv = (p, k = K) => new Vector3(p[0] * k, p[2] * k, -p[1] * k);
const lineGeo = (pts) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return g; };
const tw = (d) => { const x = new Date(d.getTime() + 8 * HOUR); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes() }; };
const pad = (n) => String(n).padStart(2, '0');
const hhmm = (d) => { const x = tw(d); return `${pad(x.h)}:${pad(x.mi)}`; };
const ampm = (d) => { const x = tw(d), h12 = x.h % 12 || 12; return `${h12}:${pad(x.mi)} ${x.h < 12 ? 'a.m.' : 'p.m.'}`; };
const dateEn = (d) => { const x = tw(d); return `${MON[x.m - 1]} ${x.d}, ${x.y}`; };
const dateZh = (d) => { const x = tw(d); return `${x.y} 年 ${x.m} 月 ${x.d} 日`; };
const actText = (s) => ({ en: `${MON[s.act[0][0] - 1]} ${s.act[0][1]} – ${MON[s.act[1][0] - 1]} ${s.act[1][1]}`, zh: `${s.act[0][0]}/${s.act[0][1]}–${s.act[1][0]}/${s.act[1][1]}` });

/** 母天體軌道上真近點角的範圍（太遠的外段不畫，否則哈雷彗星會把畫面拉到 35 AU）。 */
function nuRange(el, rMax = 6) {
  const p = el.a * (1 - el.e * el.e);
  if (el.a * (1 + el.e) <= rMax) return 180;
  return Math.acos(MathUtils.clamp((p / rMax - 1) / el.e, -1, 1)) / DEG;
}
/** 月光好不好：極大夜最佳時刻月亮在不在天上、亮面多少。 */
function verdict(n) {
  const lit = n.moonIllum, up = n.moonAlt > 0, upBefore = n.moonAlt2 > 0;
  if (up) {
    if (lit < 0.25) return { k: 'good', en: 'Good: only a thin Moon', zh: '好：月亮很細' };
    if (lit < 0.65) return { k: 'fair', en: 'Fair: some moonlight', zh: '普通：有些月光' };
    return { k: 'poor', en: 'Poor: a bright Moon washes out faint meteors', zh: '差：明亮的月光蓋掉暗的流星' };
  }
  // 最佳時刻月亮已下山，但兩小時前還在：前半夜都有月光
  if (upBefore && lit > 0.85) return { k: 'poor', en: 'Poor: a bright Moon is up most of the night', zh: '差：明亮的月亮大半夜都在天上' };
  if (upBefore && lit > 0.4) return { k: 'fair', en: 'Fair: the Moon sets just before the best time', zh: '普通：月亮在最佳時刻前才下山' };
  return { k: 'good', en: 'Good: the Moon is down', zh: '好：月亮已經下山' };
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), skyCv = $('.mt-sky-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true, logarithmicDepthBuffer: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const now = Date.now();
  const firstKey = upcomingPeaks(new Date(now))[0].shower.key;
  const state = { view: 'whole', key: firstKey, t: now, playing: false, speed: 10, dust: true, hour: 'best', peak: null, night: null };

  let scene, camera, controls, earth, orbitLine, dust, dustData, streaks, mark, arrow;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    scene = new Scene(); scene.background = new Color(0x03050d);
    camera = new PerspectiveCamera(45, 1.6, 0.01, 20000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 1.2; controls.maxDistance = 400;
    // 星空
    {
      const p = new Float32Array(N_STARS * 3), tint = new Float32Array(N_STARS * 3), size = new Float32Array(N_STARS);
      for (let i = 0; i < N_STARS; i++) {
        const l = STAR_ECL[i * 2] * DEG, b = STAR_ECL[i * 2 + 1] * DEG;
        p.set([RS * Math.cos(b) * Math.cos(l), RS * Math.sin(b), -RS * Math.cos(b) * Math.sin(l)], i * 3);
        const mag = STARS[i * 4 + 2], br = MathUtils.clamp(0.85 - mag * 0.14, 0.15, 0.9), c = bvColor(STARS[i * 4 + 3]);
        tint.set([c[0] / 255 * br, c[1] / 255 * br, c[2] / 255 * br], i * 3);
        size[i] = MathUtils.clamp(6 - mag, 1.3, 6.5);
      }
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(p, 3)); g.setAttribute('tint', new Float32BufferAttribute(tint, 3)); g.setAttribute('size', new Float32BufferAttribute(size, 1));
      scene.add(new Points(g, new ShaderMaterial({
        uniforms: { dpr: { value: dpr } },
        vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
          void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,
        fragmentShader: `varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
        blending: AdditiveBlending, transparent: true, depthWrite: false,
      })));
    }
    // 太陽、地球軌道、地球
    scene.add(new Mesh(new SphereGeometry(0.5, 32, 16), new MeshBasicMaterial({ color: 0xffe9a8 })));
    const sun = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.15, 'rgba(255,235,170,1)'], [0.3, 'rgba(255,190,80,.45)'], [1, 'rgba(255,120,20,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    sun.scale.setScalar(4); scene.add(sun);
    {
      const pts = []; const d0 = new Date(now);
      for (let k = 0; k < 360; k++) pts.push(sv(helio('earth', new Date(d0.getTime() + (k / 360) * YEAR))));
      scene.add(new LineLoop(lineGeo(pts), new LineBasicMaterial({ color: 0x4f9cff, transparent: true, opacity: 0.55 })));
    }
    earth = new Mesh(new SphereGeometry(0.28, 32, 16), new MeshBasicMaterial({ color: 0x4f9cff })); scene.add(earth);
    const eg = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(120,180,255,.9)'], [0.4, 'rgba(80,150,255,.25)'], [1, 'rgba(80,150,255,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    eg.scale.setScalar(1.6); earth.add(eg);
    // 母天體軌道（setFromPoints 不會加大 buffer：先給足 721 點）
    orbitLine = new Line(lineGeo(Array.from({ length: 721 }, () => new Vector3())), new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
    orbitLine.frustumCulled = false; scene.add(orbitLine);
    // 碎屑帶
    {
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(new Float32Array(N_DUST * 3), 3));
      dust = new Points(g, new PointsMaterial({ color: 0xffffff, size: 2.2 * dpr, sizeAttenuation: false, transparent: true, opacity: 0.75, depthWrite: false, blending: AdditiveBlending }));
      dust.frustumCulled = false; scene.add(dust);
    }
    // 地球每年到達極大期的位置
    mark = new LineLoop(lineGeo(Array.from({ length: 64 }, (_, k) => new Vector3(Math.cos(k / 64 * TAU) * 0.7, 0, Math.sin(k / 64 * TAU) * 0.7))), new LineBasicMaterial({ color: 0xffd36e }));
    scene.add(mark);
    // 迎面而來的流星體（地球附近的短線）
    {
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(new Float32Array(120 * 6), 3));
      streaks = new LineSegments(g, new LineBasicMaterial({ color: 0xfff1b0, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }));
      streaks.frustumCulled = false; scene.add(streaks);
    }
    // 地球前進方向的箭頭
    arrow = new Line(lineGeo([new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()]), new LineBasicMaterial({ color: 0x4fd1c5 }));
    arrow.frustumCulled = false; scene.add(arrow);
  }

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const L = renderer ? { sun: mk('sun', '&#9728; Sun · 太陽'), earth: mk('mt-earth', 'Earth · 地球'), parent: mk('mt-parent', ''), mark: mk('mt-mark', ''), fwd: mk('mt-fwd', "Earth's direction · 地球前進方向") } : null;
  const proj = new Vector3();
  let shown = new Set(), prevShown = new Set(), cw = 0, ch = 0;
  function place(el, v, dy = 6) {
    proj.copy(v).project(camera);
    if (proj.z > 1 || Math.abs(proj.x) > 1.02 || Math.abs(proj.y) > 1.02) return false;
    el.style.opacity = 1; shown.add(el);
    el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * cw}px, ${(-proj.y * 0.5 + 0.5) * ch + dy}px) translate(-50%, 0)`;
    return true;
  }

  // ---------------- 狀態 ----------------
  const sel = () => showerByKey(state.key);
  let el = null, dustNu = null, dustOff = null, crossPos = new Vector3();
  function setShower(k, jump = true) {
    state.key = k;
    $$('.mt-chip').forEach((b) => b.classList.toggle('on', b.dataset.shower === k));
    const s = sel();
    el = PARENTS[s.parent];
    // 下一次極大（已過不到兩天的也算）
    const up = upcomingPeaks(new Date(Date.now()), 2).find((x) => x.shower.key === k);
    state.peak = up.peak; state.night = nightOf(s, state.peak, SITE);
    if (renderer) {
      const nm = nuRange(el), pts = [];
      for (let j = 0; j <= 720; j++) pts.push(sv(orbitPoint(el, -nm + (2 * nm * j) / 720)));
      orbitLine.geometry.setFromPoints(pts);
      orbitLine.material.color.setHex(COL[k]); dust.material.color.setHex(COL[k]);
      // 碎屑：沿軌道撒（內側較密），每顆有固定的側向偏移；寬度依「母天體軌道離地球多遠」放大，讓地球穿得過
      const L0 = earthLonAt(s.lam) * DEG, E = [Math.cos(L0), Math.sin(L0), 0];
      let minD = 9; for (let nu = -nm; nu <= nm; nu += 0.2) { const p = orbitPoint(el, nu); minD = Math.min(minD, Math.hypot(p[0] - E[0], p[1] - E[1], p[2] - E[2])); }
      const spread = Math.max(0.05, minD * 1.25);
      let seed = 1234567;
      const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
      const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(TAU * rnd());
      dustNu = new Float32Array(N_DUST); dustOff = new Float32Array(N_DUST * 3);
      for (let j = 0; j < N_DUST; j++) {
        dustNu[j] = -nm + 2 * nm * rnd();
        dustOff.set([gauss() * spread * 0.6, gauss() * spread * 0.6, gauss() * spread * 0.6], j * 3);
      }
      crossPos.copy(sv(E));
      mark.position.copy(crossPos);
      updateDust(0);
    }
    if (jump) setT(state.peak.getTime() - 3 * DAY);
    readouts(); drawSky();
  }
  function updateDust(dtDays) {
    if (!renderer || !dustNu) return;
    const a = dust.geometry.attributes.position.array, nm = nuRange(el), p0 = el.a * (1 - el.e * el.e);
    for (let j = 0; j < N_DUST; j++) {
      // 沿軌道前進：角速度 ∝ 1/r²（克卜勒第二定律），只是看得出流向，不照真實速度
      const r = p0 / (1 + el.e * Math.cos(dustNu[j] * DEG));
      dustNu[j] += dtDays * 0.9 / (r * r);
      if (dustNu[j] > nm) dustNu[j] -= 2 * nm;
      const p = orbitPoint(el, dustNu[j]);
      a[j * 3] = (p[0] + dustOff[j * 3]) * K; a[j * 3 + 1] = (p[2] + dustOff[j * 3 + 2]) * K; a[j * 3 + 2] = -(p[1] + dustOff[j * 3 + 1]) * K;
    }
    dust.geometry.attributes.position.needsUpdate = true;
  }
  let ePos = new Vector3(), eVel = new Vector3();
  function updateEarth() {
    const d = new Date(state.t);
    ePos = sv(helio('earth', d)); const e2 = sv(helio('earth', new Date(state.t + DAY)));
    eVel = e2.clone().sub(ePos).normalize();
    if (!renderer) return;
    earth.position.copy(ePos);
    const a = ePos.clone().add(eVel.clone().multiplyScalar(1.6)), side = new Vector3().crossVectors(eVel, new Vector3(0, 1, 0)).normalize().multiplyScalar(0.22);
    const back = a.clone().sub(eVel.clone().multiplyScalar(0.35));
    arrow.geometry.setFromPoints([ePos.clone().add(eVel.clone().multiplyScalar(0.45)), a, back.clone().add(side), a, back.clone().sub(side)]);
  }
  // 地球附近的流星體：從輻射點方向打進來，數量依離極大幾天（高斯，σ 約 1.5 天）與 ZHR
  let sseed = 99;
  const srnd = () => ((sseed = (sseed * 1664525 + 1013904223) >>> 0) / 4294967296);
  function activity() {
    const dd = (state.t - state.peak.getTime()) / DAY;
    // 同一個流星雨每年都會來：看離最近一次極大幾天
    const k = Math.round(dd / 365.25636), x = dd - k * 365.25636;
    return Math.exp(-(x * x) / (2 * 1.6 * 1.6));
  }
  function updateStreaks() {
    if (!renderer) return;
    const s = sel(), a = streaks.geometry.attributes.position.array, act = activity();
    const n = Math.round(Math.min(120, act * (12 + s.zhr * 0.5)));
    const R = radiantEcl(s), dir = sv(R, 1).normalize();   // 指向輻射點
    for (let j = 0; j < 120; j++) {
      if (j >= n) { a.fill(0, j * 6, j * 6 + 6); continue; }
      // 在地球前方（輻射點那一側）隨機一點，往地球方向飛
      const u = new Vector3(srnd() - 0.5, srnd() - 0.5, srnd() - 0.5).multiplyScalar(1.6);
      const p = ePos.clone().add(dir.clone().multiplyScalar(0.5 + srnd() * 1.6)).add(u.sub(dir.clone().multiplyScalar(u.dot(dir))));
      const q = p.clone().sub(dir.clone().multiplyScalar(0.25 + srnd() * 0.3));
      a.set([p.x, p.y, p.z, q.x, q.y, q.z], j * 6);
    }
    streaks.geometry.attributes.position.needsUpdate = true;
  }

  // ---------------- 讀數 ----------------
  const R = { name: $('.mt-name'), date: $('.mt-date'), peak: $('.mt-peak'), parent: $('.mt-parentr'), rad: $('.mt-rad'), rate: $('.mt-rate'), moon: $('.mt-moon'), speed: $('.mt-speed'), note: $('.mt-note'), skyk: $('.mt-sky-k') };
  function readouts() {
    const s = sel(), p = PARENTS[s.parent], n = state.night, pk = state.peak, v = verdict(n);
    R.name.innerHTML = `${s.en} · ${s.zh}`;
    const d = new Date(state.t);
    R.date.innerHTML = `Earth's date: ${dateEn(d)}<span>地球的日期：${dateZh(d)}</span>`;
    R.peak.innerHTML = `${dateEn(pk)}, ${ampm(pk)}<span>${dateZh(pk)} ${hhmm(pk)}（台灣時間）</span>`;
    R.parent.innerHTML = `${p.en}<span>${p.zh}${p.kind === 'asteroid' ? '（小行星）' : ''}</span>`;
    R.speed.innerHTML = `${s.v} km/s, ${s.v > 55 ? 'head-on' : s.v < 40 ? 'catching up from behind' : 'from the side'}<span>每秒 ${s.v} 公里${s.v > 55 ? '，迎面撞來' : s.v < 40 ? '，從後面追上來' : '，從側面來'}</span>`;
    const best = n.best;
    R.rad.innerHTML = best ? `In ${s.conEn}; highest (${Math.round(n.radAlt)}°) at ${ampm(best)}<span>在${s.conZh}；${hhmm(best)} 最高（${Math.round(n.radAlt)}°）</span>` : '—';
    R.rate.innerHTML = `About ${n.rate} an hour under a dark sky (ZHR ${s.zhr})<span>暗空下每小時約 ${n.rate} 顆（ZHR ${s.zhr}）；城市燈光下少很多</span>`;
    R.moon.innerHTML = `${Math.round(n.moonIllum * 100)}% lit, ${n.moonAlt > 0 ? 'up' : 'down'} at the best time · ${v.en}<span>亮面 ${Math.round(n.moonIllum * 100)}%，最佳時刻${n.moonAlt > 0 ? '在天上' : '已經下山'}——${v.zh}</span>`;
    R.note.innerHTML = activity() > 0.3 ? 'Earth is inside the dust trail now: watch the meteors hit.<span>地球正在穿過碎屑帶：看流星體迎面打進來。</span>'
      : `Earth reaches the gold ring around ${MONTH[tw(pk).m - 1]} ${tw(pk).d} every year.<span>每年 ${tw(pk).m} 月 ${tw(pk).d} 日前後，地球走到金色圓圈這裡。</span>`;
  }

  // ---------------- 右側：極大夜彰化的全天星圖 ----------------
  const hourBtns = $$('.mt-hour button');
  function skyTime() {
    const n = state.night;
    if (state.hour === 'best' && n.best) return n.best;
    const base = Date.UTC(n.night.y, n.night.m - 1, n.night.d, 12) - 8 * HOUR;   // 當地中午
    return new Date(base + { eve: 9, mid: 12, pre: 16 }[state.hour] * HOUR);
  }
  let meteors = [], lastSpawn = 0, skyAA = null, skyAt = 0;
  function proj2(alt, az, Rr) {
    const r = Rr * Math.tan((90 - alt) * DEG / 2);
    return [-r * Math.sin(az * DEG), -r * Math.cos(az * DEG)];
  }
  const vecOf = (alt, az) => [Math.cos(alt * DEG) * Math.sin(az * DEG), Math.cos(alt * DEG) * Math.cos(az * DEG), Math.sin(alt * DEG)];
  const altazOf = (v) => [Math.asin(Math.max(-1, Math.min(1, v[2]))) / DEG, ((Math.atan2(v[0], v[1]) / DEG) + 360) % 360];
  function drawSky(tNow = performance.now()) {
    if (!skyCv) return;
    const W = skyCv.clientWidth || 300, H = W;
    if (skyCv.width !== Math.round(W * dpr)) { skyCv.width = Math.round(W * dpr); skyCv.height = Math.round(H * dpr); }
    const c = skyCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = W / 2, cy = H / 2, Rr = W * 0.46, s = sel(), t = skyTime();
    if (skyAt !== t.getTime()) { skyAA = allStarsAltAz(t, SITE); skyAt = t.getTime(); }
    c.fillStyle = '#02040c'; c.fillRect(0, 0, W, H);
    c.save(); c.beginPath(); c.arc(cx, cy, Rr, 0, TAU); c.clip();
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, Rr); g.addColorStop(0, '#0a1430'); g.addColorStop(1, '#050a1c'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    // 月光把天空照亮
    const moon = moonAltAzOf(t, SITE), lit = moonIllum(t);
    if (moon.alt > 0) { c.fillStyle = `rgba(90,120,180,${0.22 * lit})`; c.fillRect(0, 0, W, H); }
    // 星座連線（輻射點所在的星座加亮）
    for (const [abbr, seg] of Object.entries(LINES)) {
      const hi = abbr === s.con;
      c.strokeStyle = hi ? 'rgba(255,211,110,.75)' : 'rgba(140,165,220,.22)'; c.lineWidth = hi ? 1.4 : 0.8; c.beginPath();
      for (let k = 0; k < seg.length; k += 2) {
        const a = seg[k], b = seg[k + 1];
        if (skyAA[a * 2] < 0 || skyAA[b * 2] < 0) continue;
        const [x1, y1] = proj2(skyAA[a * 2], skyAA[a * 2 + 1], Rr), [x2, y2] = proj2(skyAA[b * 2], skyAA[b * 2 + 1], Rr);
        c.moveTo(cx + x1, cy + y1); c.lineTo(cx + x2, cy + y2);
      }
      c.stroke();
    }
    for (let i = 0; i < N_STARS; i++) {
      const alt = skyAA[i * 2]; if (alt < 0) continue;
      const mag = STARS[i * 4 + 2]; if (moon.alt > 0 && mag > 4.5 - 2 * lit) continue;
      const [x, y] = proj2(alt, skyAA[i * 2 + 1], Rr), col = bvColor(STARS[i * 4 + 3]);
      c.fillStyle = `rgba(${col.map(Math.round).join(',')},${MathUtils.clamp(1.1 - mag * 0.17, 0.25, 1)})`;
      c.beginPath(); c.arc(cx + x, cy + y, MathUtils.clamp(2.4 - mag * 0.38, 0.5, 2.6) * (W / 320), 0, TAU); c.fill();
    }
    if (moon.alt > 0) {
      const [x, y] = proj2(moon.alt, moon.az, Rr), mg = c.createRadialGradient(cx + x, cy + y, 0, cx + x, cy + y, 26);
      mg.addColorStop(0, 'rgba(255,250,230,1)'); mg.addColorStop(0.25, `rgba(255,250,230,${0.4 + lit * 0.5})`); mg.addColorStop(1, 'rgba(255,250,230,0)');
      c.fillStyle = mg; c.beginPath(); c.arc(cx + x, cy + y, 26, 0, TAU); c.fill();
    }
    // 流星：從輻射點沿大圓往外射
    const rad = radiantAltAz(s, t, SITE), rv = vecOf(rad.alt, rad.az);
    const visRate = rad.alt > 0 ? MathUtils.clamp((s.zhr * Math.sin(rad.alt * DEG)) / 25, 0.15, 5) * (moon.alt > 0 ? 1 - 0.6 * lit : 1) : 0.05;
    if (tNow - lastSpawn > 1000 / visRate && meteors.length < 12) {
      lastSpawn = tNow;
      // 與輻射點垂直的隨機方向
      let u = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]; const d = u[0] * rv[0] + u[1] * rv[1] + u[2] * rv[2];
      u = u.map((x, k) => x - d * rv[k]); const ul = Math.hypot(...u); u = u.map((x) => x / ul);
      meteors.push({ t0: tNow, d0: (8 + Math.random() * 55) * DEG, len: (5 + Math.random() * 14) * DEG, dur: 350 + Math.random() * 500, u });
    }
    meteors = meteors.filter((m) => tNow - m.t0 < m.dur + 250);
    for (const m of meteors) {
      const f = Math.min(1, (tNow - m.t0) / m.dur), head = m.d0 + m.len * f, tail = m.d0 + m.len * Math.max(0, f - 0.45);
      const P = (ang) => rv.map((x, k) => x * Math.cos(ang) + m.u[k] * Math.sin(ang));
      const [ha, hz] = altazOf(P(head)), [ta, tz] = altazOf(P(tail));
      if (ha < 1 || ta < 1) continue;
      const [x1, y1] = proj2(ta, tz, Rr), [x2, y2] = proj2(ha, hz, Rr), fade = tNow - m.t0 > m.dur ? 1 - (tNow - m.t0 - m.dur) / 250 : 1;
      const lg = c.createLinearGradient(cx + x1, cy + y1, cx + x2, cy + y2);
      lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(1, `rgba(255,250,220,${0.95 * fade})`);
      c.strokeStyle = lg; c.lineWidth = 1.8; c.beginPath(); c.moveTo(cx + x1, cy + y1); c.lineTo(cx + x2, cy + y2); c.stroke();
    }
    // 輻射點
    if (rad.alt > -5) {
      const [x, y] = proj2(Math.max(rad.alt, 0), rad.az, Rr);
      c.strokeStyle = '#ffd36e'; c.lineWidth = 2; c.beginPath(); c.arc(cx + x, cy + y, 9, 0, TAU); c.stroke();
      c.fillStyle = '#ffd36e'; c.font = `800 ${Math.max(10, W * 0.036)}px system-ui, sans-serif`; c.textAlign = 'center';
      c.fillText(`Radiant · 輻射點${rad.alt < 0 ? '（地平線下）' : ''}`, cx + x, cy + y - 14);
    }
    c.restore();
    c.strokeStyle = 'rgba(160,180,230,.45)'; c.lineWidth = 1.2; c.beginPath(); c.arc(cx, cy, Rr, 0, TAU); c.stroke();
    c.fillStyle = '#9fb0cf'; c.font = `700 ${Math.max(10, W * 0.04)}px system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (const [lab, x, y] of [['N 北', 0, -Rr - 0], ['S 南', 0, Rr], ['E 東', -Rr, 0], ['W 西', Rr, 0]]) {
      c.fillStyle = 'rgba(2,4,12,.85)'; c.fillRect(cx + x - 15, cy + y - 8, 30, 16); c.fillStyle = '#9fb0cf'; c.fillText(lab, cx + x, cy + y);
    }
    c.textBaseline = 'alphabetic';
    if (R.skyk) R.skyk.innerHTML = `${dateEn(t)}, ${ampm(t)} over Changhua<span>${dateZh(t)} ${hhmm(t)}，彰化的天空${rad.alt < 0 ? '：輻射點還在地平線下，流星很少' : ''}</span>`;
  }

  // ---------------- 相機 ----------------
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  function camGoal() {
    if (state.view === 'earth') {
      const dir = sv(radiantEcl(sel()), 1).normalize();
      const side = new Vector3().crossVectors(dir, new Vector3(0, 1, 0)).normalize();
      return { pos: ePos.clone().add(side.multiplyScalar(-4.2)).add(new Vector3(0, 2.2, 0)).add(dir.clone().multiplyScalar(-1.2)), tgt: ePos.clone().add(dir.clone().multiplyScalar(0.6)) };
    }
    return { pos: new Vector3(4, 34, 30), tgt: new Vector3(0, 0, 0) };
  }
  function setView(v) {
    state.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    if (!renderer) return;
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
  }
  function goCam() { if (!renderer) return; const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); camT = 1; }

  function updateLabels() {
    cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set();
    const s = sel(), p = PARENTS[s.parent], pk = tw(state.peak);
    place(L.sun, new Vector3(), 14);
    place(L.earth, ePos, 12);
    L.mark.innerHTML = `Every year ~${MON[pk.m - 1]} ${pk.d} · 每年 ${pk.m}/${pk.d} 前後`;
    if (state.view === 'whole') place(L.mark, crossPos, -30);
    // 母天體名稱標在軌道上離太陽約 2 AU 的地方
    const nm = nuRange(el); let best = null;
    for (let nu = -nm; nu <= nm; nu += 2) { const q = orbitPoint(el, nu), r = Math.hypot(...q); if (!best || Math.abs(r - 2.2) < best[0]) best = [Math.abs(r - 2.2), q]; }
    L.parent.innerHTML = `${p.en} · ${p.zh}`;
    place(L.parent, sv(best[1]), 0);
    if (state.view === 'earth') place(L.fwd, ePos.clone().add(eVel.clone().multiplyScalar(1.7)), -8);
    for (const el2 of prevShown) if (!shown.has(el2)) el2.style.opacity = 0;
  }

  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (camera.aspect < 1.1 ? 70 : 58) * DEG;
        camera.fov = Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
        camera.updateProjectionMatrix();
      }
    }
    drawSky();
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(() => drawSky()).observe(skyCv);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play'), slider = $('.mt-time');
  function setT(t) {
    state.t = t;
    slider.value = String(Math.round((t - now) / DAY));
    slider.style.setProperty('--p', `${((+slider.value + 30) / 395) * 100}%`);
    updateEarth(); readouts();
  }
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setSpeed(v) { state.speed = v; $$('.al-speed button').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.speed === v ? 'true' : 'false')); }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.al-speed button').forEach((b) => b.addEventListener('click', () => { setSpeed(+b.dataset.speed); if (!state.playing) setPlaying(true); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.mt-chip').forEach((b) => b.addEventListener('click', () => { setPlaying(false); setShower(b.dataset.shower); root.classList.remove('al-fresh'); }));
  $('.mt-now').addEventListener('click', () => { setPlaying(false); setT(Date.now()); });
  $('.mt-topeak').addEventListener('click', () => { setPlaying(false); setT(state.peak.getTime()); });
  slider.addEventListener('input', () => { setPlaying(false); setT(now + parseFloat(slider.value) * DAY); });
  hourBtns.forEach((b) => b.addEventListener('click', () => {
    state.hour = b.dataset.hour; hourBtns.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); meteors = []; drawSky();
  }));
  const tg = $('[data-t="dust"]'); if (tg) tg.addEventListener('change', () => { state.dust = tg.checked; if (dust) dust.visible = tg.checked; });
  if (renderer) $('.al-home').addEventListener('click', () => { camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0; });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) {
      setT(state.t + dt * state.speed * DAY);
      if (state.t > now + 365 * DAY) setT(now - 30 * DAY);
    }
    drawSky(t);
    if (renderer) {
      updateDust(dt * (state.playing ? state.speed : 0.6));
      updateStreaks();
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.2);
        const k = MathUtils.smootherstep(camT, 0, 1), g = camGoal();
        camera.position.lerpVectors(camFrom, g.pos, k);
        controls.target.lerpVectors(tgtFrom, g.tgt, k);
      } else if (state.view === 'earth') {
        // 跟著地球走
        const g = camGoal(), dv = g.tgt.clone().sub(controls.target);
        controls.target.add(dv); camera.position.add(dv);
      }
      controls.update();
      updateLabels();
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setShower(state.key); resize(); goCam();
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    camera, controls, state, setShower, setView, setT, setPlaying, goCam, drawSky,
    render: () => { if (renderer) { updateStreaks(); controls.update(); updateLabels(); renderer.render(scene, camera); } drawSky(); },
  };
  return { setShower };
}

// ---------------------------------------------------------------------------
// 頁面下方：接下來的流星雨（彰化，月光條件），以及每張流星雨卡上的下一次極大
function renderUpcoming(box) {
  const list = upcomingPeaks(new Date(), 1);
  const rows = list.map(({ shower: s, peak }) => {
    const n = nightOf(s, peak, SITE), v = verdict(n), days = Math.round((peak.getTime() - Date.now()) / DAY);
    const when = days <= 0 ? 'Tonight or just past · 今晚或剛過' : `In ${days} day${days === 1 ? '' : 's'} · 還有 ${days} 天`;
    const night = `${MON[n.night.m - 1]} ${n.night.d}`;
    return `<tr class="mt-v-${v.k}"><td><b>${s.en}</b><span>${s.zh}</span></td>
      <td>Night of ${night}<span>${n.night.m}/${n.night.d} 晚上到隔天清晨 · ${when}</span></td>
      <td>${n.best ? ampm(n.best) : '—'}<span>輻射點最高 ${Math.round(n.radAlt)}°</span></td>
      <td class="num">~${n.rate}<span>每小時（暗空）</span></td>
      <td><i class="mt-dot"></i>${Math.round(n.moonIllum * 100)}%: ${v.en}<span>${v.zh}</span></td>
      <td><button type="button" class="ph-go mt-go" data-lab-shower="${s.key}">3D <i>&uarr;</i></button></td></tr>`;
  }).join('');
  box.innerHTML = `<div class="cc-tbl-wrap"><table class="cc-tbl mt-tbl"><thead><tr><th>Shower · 流星雨</th><th>Peak night · 極大夜</th><th>Best time · 最佳時刻</th><th>Per hour · 每小時</th><th>Moon · 月光</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="tn-note">Times are Taiwan time for Changhua. "Per hour" assumes a dark sky with the radiant at its highest; in a city you may see only a quarter as many. · 時間為台灣時間、地點彰化。「每小時」是輻射點最高時、暗空下的估計；在市區可能只剩四分之一。</p>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-meteor-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const ul = document.querySelector('[data-meteor-list]');
  if (ul) renderUpcoming(ul);
  document.querySelectorAll('[data-next-peak]').forEach((el) => {
    const s = showerByKey(el.getAttribute('data-next-peak'));
    const up = upcomingPeaks(new Date(), 1).find((x) => x.shower.key === s.key);
    const a = actText(s);
    el.innerHTML = `Next peak: ${dateEn(up.peak)} (active ${a.en})<span class="zh">下一次極大：${dateZh(up.peak)}（活動期 ${a.zh}）</span>`;
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lab-shower]');
    if (!b) return;
    const lab = start(); if (!lab) return;
    lab.setShower(b.getAttribute('data-lab-shower'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
