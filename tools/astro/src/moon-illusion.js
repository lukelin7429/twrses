/*
 * 天文教育 · 第十五課「月亮在地平線附近為什麼看起來特別大？」的 3D 模型。
 *
 * 一個機制：月亮錯覺發生在大腦，不在天上——月亮在天上占的角度一直是約 0.5°，剛升起時甚至稍微小一點。
 * 三個視角共用一個 renderer：
 *   ・眼睛（eye）：站在彰化的地面上（+Y 天頂、−Z 北、+X 東），月亮照「今晚」真實的高度方位移動、照真實角大小畫，
 *     旁邊的房子、遠山與一座 2 公里外的塔（放在月出方位）只是參考。可以打開「量月環」：環的大小固定，從升起到最高都剛好套住月亮。
 *   ・長鏡頭（tele）：視角縮到 2.5°，就是網路上「塔後面的巨大月亮」照片的拍法——月亮和塔一起被放大。
 *   ・從太空看（space）：地球照真實自轉，彰化的位置一點一點轉向月亮；月亮剛升起時你在地球的「側邊」，離月亮多了將近一個地球半徑。
 * 右側 2D：兩個一樣大的月亮，一個在屋頂上、一個在空曠的天空——大腦的錯覺。
 * 計算：moonsize.js（從你這裡到月亮的距離、角直徑、月出月落、滿月排行）。
 * 產物：cd tools/astro && npm run build → assets/js/moon-illusion.js
 */
import {
  AdditiveBlending, AmbientLight, BackSide, BoxGeometry, BufferGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight,
  Float32BufferAttribute, Group, Line, LineBasicMaterial, LineDashedMaterial, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  PerspectiveCamera, PlaneGeometry, Points, Scene, ShaderMaterial, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { DEG, TAU, atmosphereMaterial, makeMoonTexture } from './common.js';
import { makeRealEarth } from './earthmap.js';
import { STARS } from './stars-data.js';
import { N_STARS, allStarsAltAz, bvColor, eclToEq, moonAltAzOf, sunAltAzOf } from './sky.js';
import { gmst, moonPos } from './ephem.js';
import { R_EARTH, angularDiameter, fullMoons, geoDistance, moonNight, rankFullMoons, topoDistance } from './moonsize.js';
import { moonPhase } from './libration.js';

const SITE = { lat: 24.08, lon: 120.54 };
const EYE = 1.6, D_MOON = 800, D_SKY = 950;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DIRS = [['north', '北'], ['northeast', '東北'], ['east', '東'], ['southeast', '東南'], ['south', '南'], ['southwest', '西南'], ['west', '西'], ['northwest', '西北']];
const dirOf = (az) => DIRS[Math.round(az / 45) % 8];
const hv = (alt, az) => new Vector3(Math.cos(alt * DEG) * Math.sin(az * DEG), Math.sin(alt * DEG), -Math.cos(alt * DEG) * Math.cos(az * DEG));
const tw = (d) => { const x = new Date(d.getTime() + 8 * 3600000); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes() }; };
const pad = (n) => String(n).padStart(2, '0');
const hhmm = (d) => { const x = tw(d); return `${pad(x.h)}:${pad(x.mi)}`; };
const ampm = (d) => { const x = tw(d), h12 = x.h % 12 || 12; return `${h12}:${pad(x.mi)} ${x.h < 12 ? 'a.m.' : 'p.m.'}`; };
const dateEn = (d) => { const x = tw(d); return `${MON[x.m - 1]} ${x.d}, ${x.y}`; };
const dateZh = (d) => { const x = tw(d); return `${x.y} 年 ${x.m} 月 ${x.d} 日`; };
const commas = (n) => Math.round(n).toLocaleString('en-US');

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), illCv = $('.mi-ill-cv'), ring = $('.mi-ring');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const state = { view: 'eye', t: Date.now(), night: null, which: 'tonight', playing: false, ring: true, scenery: true, follow: true, yaw: 90, pitch: 5, hideScene: false, showRuler: false };

  // 三個夜晚：今晚、下次滿月、未來一年最大的滿月（超級月亮）
  const nights = (() => {
    const now = new Date(), fm = rankFullMoons(fullMoons(now, 13)), next = fm[0], big = [...fm].sort((a, b) => b.size - a.size)[0];
    const at = (d) => moonNight(new Date(d.getTime() - 14 * 3600000), SITE);
    return { tonight: moonNight(new Date(now.getTime() - 4 * 3600000), SITE), full: at(next.t), super: at(big.t) };
  })();

  const moonTex = makeMoonTexture();
  let camera, ground = {}, space = {};
  if (renderer) {
    renderer.setPixelRatio(dpr);
    camera = new PerspectiveCamera(60, 1.6, 0.1, 5000);
    camera.position.set(0, EYE, 0);
    // ---------- 地面（眼睛、長鏡頭） ----------
    const g = ground; g.scene = new Scene();
    g.sky = new Mesh(new SphereGeometry(D_SKY + 20, 48, 24), new ShaderMaterial({
      uniforms: { zen: { value: new Color(0x04071a) }, hor: { value: new Color(0x0c1638) }, glow: { value: new Color(0x000000) }, sunDir: { value: new Vector3(0, -1, 0) } },
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform vec3 zen; uniform vec3 hor; uniform vec3 glow; uniform vec3 sunDir; varying vec3 vD;
        void main(){ float h = clamp(vD.y, 0.0, 1.0); vec3 c = mix(hor, zen, pow(h, 0.45));
          float s = max(dot(normalize(vec3(vD.x, 0.0, vD.z)), normalize(vec3(sunDir.x, 0.0, sunDir.z))), 0.0);
          c += glow * pow(s, 3.0) * (1.0 - h) * (1.0 - h); gl_FragColor = vec4(c, 1.0); }`,
      side: BackSide, depthWrite: false,
    }));
    g.scene.add(g.sky);
    {
      const geo = new BufferGeometry(); geo.setAttribute('position', new Float32BufferAttribute(new Float32Array(N_STARS * 3), 3));
      const tint = [], size = [];
      for (let i = 0; i < N_STARS; i++) { const c = bvColor(STARS[i * 4 + 3]), mag = STARS[i * 4 + 2], b = MathUtils.clamp(1 - mag * 0.15, 0.2, 1); tint.push(c[0] / 255 * b, c[1] / 255 * b, c[2] / 255 * b); size.push(MathUtils.clamp(5 - mag, 1.2, 5)); }
      geo.setAttribute('tint', new Float32BufferAttribute(tint, 3)); geo.setAttribute('size', new Float32BufferAttribute(size, 1));
      g.stars = new Points(geo, new ShaderMaterial({
        uniforms: { dpr: { value: dpr }, vis: { value: 1 }, zoom: { value: 1 } },
        vertexShader: 'attribute vec3 tint; attribute float size; uniform float dpr; uniform float zoom; varying vec3 vC; void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr * zoom; }',
        fragmentShader: 'uniform float vis; varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a * vis, 1.0); }',
        blending: AdditiveBlending, transparent: true, depthWrite: false,
      }));
      g.stars.frustumCulled = false; g.scene.add(g.stars);
    }
    g.moonLight = new DirectionalLight(0xfff6e8, 4.6); g.scene.add(g.moonLight); g.scene.add(new AmbientLight(0x8090b0, 0.08));
    g.moon = new Mesh(new SphereGeometry(1, 64, 48), new MeshLambertMaterial({ map: moonTex })); g.scene.add(g.moon);
    g.moonLight.target = g.moon;
    // 地面、遠山、房子、塔：只用平塗的剪影色，跟著天色變亮變暗
    g.silMat = new MeshBasicMaterial({ color: 0x0a0e1a });
    g.farMat = new MeshBasicMaterial({ color: 0x111a30 });
    const ground0 = new Mesh(new PlaneGeometry(9000, 9000), new MeshBasicMaterial({ color: 0x06080f })); ground0.rotation.x = -Math.PI / 2; g.scene.add(ground0); g.groundMesh = ground0;
    g.scenery = new Group(); g.scene.add(g.scenery);
    {
      let s = 31; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      // 遠山（約 3 公里外，高 0.6–2°）
      const pts = [];
      for (let k = 0; k <= 360; k += 2) { const a = k * DEG, h = 3000 * Math.tan((0.6 + 1.4 * Math.abs(Math.sin(k * 0.05 + 1) * Math.sin(k * 0.13))) * DEG); pts.push([3000 * Math.sin(a), h, -3000 * Math.cos(a)]); }
      const pos = [];
      for (let k = 0; k < pts.length - 1; k++) { const [a, b] = [pts[k], pts[k + 1]]; pos.push(a[0], 0, a[2], b[0], 0, b[2], b[0], b[1], b[2], a[0], 0, a[2], b[0], b[1], b[2], a[0], a[1], a[2]); }
      const mg = new BufferGeometry(); mg.setAttribute('position', new Float32BufferAttribute(pos, 3));
      g.scenery.add(new Mesh(mg, g.farMat));
      // 房子與樹（約 120–300 公尺外）
      for (let k = 0; k < 70; k++) {
        const a = rnd() * TAU, r = 120 + rnd() * 180;
        if (rnd() < 0.5) { const w = 8 + rnd() * 14, h = 5 + rnd() * 14, b = new Mesh(new BoxGeometry(w, h, w), g.silMat); b.position.set(r * Math.sin(a), h / 2, -r * Math.cos(a)); b.rotation.y = rnd() * TAU; g.scenery.add(b); }
        else { const h = 6 + rnd() * 8, tr = new Mesh(new ConeGeometry(h * 0.35, h, 8), g.silMat); tr.position.set(r * Math.sin(a), h / 2 + 1.5, -r * Math.cos(a)); g.scenery.add(tr); }
      }
    }
    // 2 公里外的塔（放在月出方位）
    g.tower = new Group();
    const at = (mesh, y) => { mesh.position.y = y; return mesh; };
    g.tower.add(at(new Mesh(new CylinderGeometry(2.2, 3.4, 42, 12), g.silMat), 21));
    g.tower.add(at(new Mesh(new CylinderGeometry(4.2, 4.2, 3, 12), g.silMat), 43));
    g.tower.add(at(new Mesh(new ConeGeometry(3, 6, 12), g.silMat), 47.5));
    g.scenery.add(g.tower);

    // ---------- 從太空看 ----------
    const sp = space; sp.scene = new Scene(); sp.scene.background = new Color(0x03050d);
    sp.scene.add(new AmbientLight(0xb8c6ff, 0.35)); sp.sun = new DirectionalLight(0xfff4e0, 2.6); sp.scene.add(sp.sun);
    sp.earth = new Mesh(new SphereGeometry(1, 64, 48), new MeshLambertMaterial({ map: makeRealEarth() })); sp.scene.add(sp.earth);
    sp.scene.add(new Mesh(new SphereGeometry(1.08, 48, 32), atmosphereMaterial()));
    sp.moon = new Mesh(new SphereGeometry(0.55, 48, 32), new MeshLambertMaterial({ map: moonTex })); sp.scene.add(sp.moon);
    sp.pin = new Mesh(new SphereGeometry(0.06, 16, 12), new MeshBasicMaterial({ color: 0xffd36e })); sp.scene.add(sp.pin);
    const lg = () => new BufferGeometry().setFromPoints([new Vector3(), new Vector3(1, 0, 0)]);
    sp.lineObs = new Line(lg(), new LineBasicMaterial({ color: 0xffd36e })); sp.scene.add(sp.lineObs);
    sp.lineCtr = new Line(lg(), new LineDashedMaterial({ color: 0x9fb0cf, dashSize: 0.25, gapSize: 0.2 })); sp.scene.add(sp.lineCtr);
  }

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const L = renderer ? {
    moon: mk('moon', 'Moon · 月亮'), tower: mk('mi-tower', 'Tower, 2 km away · 2 公里外的塔'),
    E: mk('mi-card', 'E 東'), N: mk('mi-card', 'N 北'), S: mk('mi-card', 'S 南'), W: mk('mi-card', 'W 西'),
    you: mk('mi-you', 'You in Changhua · 彰化的你'), smoon: mk('moon', 'Moon · 月亮'),
  } : null;
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
  const R = { when: $('.mi-when'), alt: $('.mi-alt'), dist: $('.mi-dist'), size: $('.mi-size'), grow: $('.mi-grow'), note: $('.mi-note') };
  let cur = { alt: 0, az: 90, km: 384400, size: 31 };
  function update() {
    const d = new Date(state.t), m = moonAltAzOf(d, SITE), km = topoDistance(d, SITE), size = angularDiameter(km);
    cur = { alt: m.alt, az: m.az, km, size };
    const sun = sunAltAzOf(d, SITE), dark = MathUtils.clamp((-sun.alt - 2) / 14, 0, 1);
    if (renderer) {
      const g = ground, dir = hv(m.alt, m.az);
      g.moon.position.copy(camera.position.clone().setY(EYE).add(dir.clone().multiplyScalar(D_MOON)));
      g.moon.scale.setScalar(D_MOON * Math.tan(size / 120 * DEG));
      g.moon.lookAt(0, EYE, 0); g.moon.rotateY(-Math.PI / 2);
      g.moon.visible = m.alt > -1.5;
      const sd = hv(sun.alt, sun.az); g.moonLight.position.copy(g.moon.position.clone().add(sd.multiplyScalar(50)));
      // 低空的月亮帶一點橙色（大氣把藍光散射掉）
      const warm = MathUtils.clamp(1 - m.alt / 12, 0, 1); g.moon.material.color.setRGB(1, 1 - 0.18 * warm, 1 - 0.42 * warm);
      // 天色
      const day = MathUtils.clamp((sun.alt + 6) / 12, 0, 1);
      g.sky.material.uniforms.zen.value.setRGB(0.016 + 0.2 * day, 0.03 + 0.38 * day, 0.1 + 0.62 * day);
      g.sky.material.uniforms.hor.value.setRGB(0.05 + 0.55 * day, 0.08 + 0.6 * day, 0.2 + 0.6 * day);
      const tw2 = MathUtils.clamp(1 - Math.abs(sun.alt + 3) / 9, 0, 1);
      g.sky.material.uniforms.glow.value.setRGB(0.8 * tw2, 0.35 * tw2, 0.12 * tw2); g.sky.material.uniforms.sunDir.value.copy(hv(sun.alt, sun.az));
      g.stars.material.uniforms.vis.value = dark;
      const sc = 0.06 + 0.3 * day; g.silMat.color.setRGB(sc * 0.4, sc * 0.45, sc * 0.6); g.farMat.color.setRGB(sc * 0.55 + 0.03, sc * 0.6 + 0.04, sc * 0.75 + 0.08);
      g.groundMesh.material.color.setRGB(sc * 0.18, sc * 0.2, sc * 0.24);
      const aa = allStarsAltAz(d, SITE), p = g.stars.geometry.attributes.position.array;
      for (let i = 0; i < N_STARS; i++) { const v = hv(aa[i * 2], aa[i * 2 + 1]).multiplyScalar(D_SKY); p[i * 3] = v.x; p[i * 3 + 1] = v.y + EYE; p[i * 3 + 2] = v.z; }
      g.stars.geometry.attributes.position.needsUpdate = true;
      // 從太空看：赤道座標（+Y 北極、+X 春分點、往東是 −Z），地球照恆星時轉
      const sp = space, mp = moonPos(d), q = eclToEq(mp.lon, mp.lat, 23.4393), gs = gmst(d);
      const eqv = (ra, dec, r) => new Vector3(r * Math.cos(dec * DEG) * Math.cos(ra * DEG), r * Math.sin(dec * DEG), -r * Math.cos(dec * DEG) * Math.sin(ra * DEG));
      sp.earth.rotation.y = gs * DEG;
      const mpos = eqv(q.ra, q.dec, geoDistance(d) / R_EARTH / 5);   // 距離壓縮 5 倍
      sp.moon.position.copy(mpos);
      const obs = eqv(gs + SITE.lon, SITE.lat, 1.01); sp.pin.position.copy(obs);
      sp.lineObs.geometry.setFromPoints([obs, mpos]); sp.lineCtr.geometry.setFromPoints([new Vector3(), mpos]); sp.lineCtr.computeLineDistances();
      sp.sun.position.copy(hvSunEq(d));
    }
    readouts();
  }
  // 太陽方向（赤道座標）：用太陽黃經換算
  function hvSunEq(d) {
    const T = (d.getTime() / 86400000 + 2440587.5 - 2451545) / 36525;
    const L0 = 280.46646 + 36000.76983 * T, M = (357.52911 + 35999.05029 * T) * DEG;
    const lon = L0 + 1.914602 * Math.sin(M) + 0.019993 * Math.sin(2 * M);
    const q = eclToEq(((lon % 360) + 360) % 360, 0, 23.4393);
    return new Vector3(Math.cos(q.dec * DEG) * Math.cos(q.ra * DEG), Math.sin(q.dec * DEG), -Math.cos(q.dec * DEG) * Math.sin(q.ra * DEG));
  }
  function readouts() {
    const d = new Date(state.t), n = state.night;
    R.when.innerHTML = `${dateEn(d)}, ${ampm(d)}<span>${dateZh(d)} ${hhmm(d)}，彰化</span>`;
    const [dd, ddz] = dirOf(cur.az);
    R.alt.innerHTML = cur.alt > 0 ? `${cur.alt.toFixed(0)}° up in the ${dd}<span>在${ddz}方，高 ${cur.alt.toFixed(0)}°</span>` : 'Below the horizon<span>在地平線下</span>';
    R.dist.innerHTML = `${commas(cur.km)} km<span>${commas(cur.km)} 公里</span>`;
    R.size.innerHTML = `${cur.size.toFixed(1)}′ (${(cur.size / 60).toFixed(2)}°)<span>約 ${(cur.size / 60).toFixed(2)} 度，手臂伸直時一顆豌豆大</span>`;
    if (n) {
      const g = (cur.size / n.riseSize - 1) * 100;
      R.grow.innerHTML = `${g >= 0 ? '+' : ''}${g.toFixed(1)}% compared with moonrise<span>和剛升起時比：${g >= 0 ? '大了' : '小了'} ${Math.abs(g).toFixed(1)}%（真的，但眼睛看不出來）</span>`;
    }
  }

  // ---------------- 右側：錯覺圖 ----------------
  function drawIllusion() {
    const W = illCv.clientWidth || 300, H = Math.round(W * 0.62), N = Math.round(W * dpr), NH = Math.round(H * dpr);
    if (illCv.width !== N || illCv.height !== NH) { illCv.width = N; illCv.height = NH; illCv.style.height = `${H}px`; }
    const c = illCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const half = W / 2, r = W * 0.055;
    for (const k of [0, 1]) {
      const x0 = k * half, g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#050a1f'); g.addColorStop(1, k === 0 ? '#1c2b55' : '#0b1430'); c.fillStyle = g; c.fillRect(x0, 0, half, H);
    }
    // 左：低空的月亮，後面有屋頂和樹；右：高空，四周什麼都沒有
    const mx = [half * 0.5, half * 1.5], my = [H * 0.66, H * 0.3];
    const moon = (x, y) => { const gg = c.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); gg.addColorStop(0, '#fff8e6'); gg.addColorStop(1, '#e8d6a8'); c.fillStyle = gg; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.fillStyle = 'rgba(120,110,90,.35)'; for (const [a, b, s] of [[-0.3, -0.2, 0.28], [0.25, 0.1, 0.22], [-0.05, 0.35, 0.18]]) { c.beginPath(); c.arc(x + a * r, y + b * r, s * r, 0, TAU); c.fill(); } };
    moon(mx[0], my[0]); moon(mx[1], my[1]);
    if (!state.hideScene) {
      c.fillStyle = '#05070d';
      const base = H * 0.86;
      c.beginPath(); c.moveTo(0, H);
      const roofs = [[0, 0.78], [0.08, 0.72], [0.14, 0.75], [0.2, 0.68], [0.27, 0.74], [0.33, 0.7], [0.4, 0.76], [0.46, 0.73], [0.5, 0.8]];
      for (const [fx, fy] of roofs) c.lineTo(fx * W, fy * H);
      c.lineTo(half, base); c.lineTo(half, H); c.closePath(); c.fill();
      for (const tx of [0.1, 0.36]) { c.beginPath(); c.moveTo(tx * W, H * 0.62); c.lineTo(tx * W - r * 0.9, H * 0.82); c.lineTo(tx * W + r * 0.9, H * 0.82); c.fill(); }
      c.fillRect(half, H * 0.94, half, H * 0.06);
    }
    if (state.showRuler) {
      c.strokeStyle = '#ffd36e'; c.lineWidth = 2; c.setLineDash([4, 3]);
      for (const k of [0, 1]) { c.beginPath(); c.arc(mx[k], my[k], r + 4, 0, TAU); c.stroke(); }
      c.setLineDash([]); c.fillStyle = '#ffd36e'; c.font = `800 ${Math.max(10, W * 0.04)}px system-ui, sans-serif`; c.textAlign = 'center';
      c.fillText('Same size · 一樣大', W / 2, H * 0.1);
    }
    c.fillStyle = '#9fb0cf'; c.font = `700 ${Math.max(9, W * 0.034)}px system-ui, sans-serif`; c.textAlign = 'center';
    c.fillText('Low · 低空', mx[0], H * 0.12 + (state.showRuler ? 14 : 0)); c.fillText('High · 高空', mx[1], H * 0.12 + (state.showRuler ? 14 : 0));
    c.strokeStyle = 'rgba(160,180,230,.35)'; c.beginPath(); c.moveTo(half, 0); c.lineTo(half, H); c.stroke();
  }

  // ---------------- 相機 ----------------
  function aim() {
    if (!renderer) return;
    if (state.view === 'space') {
      // 從側面看地球到月亮這一段：地球在一端、月亮在另一端
      const mpos = space.moon.position, mid = mpos.clone().multiplyScalar(0.5);
      const side = new Vector3().crossVectors(mpos.clone().normalize(), new Vector3(0, 1, 0)).normalize();
      camera.position.copy(mid.clone().add(side.multiplyScalar(mpos.length() * 1.45)).add(new Vector3(0, mpos.length() * 0.3, 0)));
      camera.lookAt(mid);
      return;
    }
    camera.position.set(0, EYE, 0);
    if (state.follow) { state.yaw = cur.az; state.pitch = state.view === 'tele' ? Math.max(cur.alt, 0.6) : MathUtils.clamp(cur.alt * 0.7 + 4, 4, 70); }
    camera.lookAt(hv(state.pitch, state.yaw).add(camera.position));
  }
  function setFov() {
    if (!renderer) return;
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) { renderer.setSize(w, h, false); camera.aspect = w / h; }
    const hf = state.view === 'tele' ? 2.5 : state.view === 'space' ? 50 : 66;   // 水平視角
    camera.fov = 2 * Math.atan(Math.tan(hf / 2 * DEG) / camera.aspect) / DEG;
    camera.near = state.view === 'space' ? 0.05 : 0.5; camera.far = 5000;
    camera.updateProjectionMatrix();
    if (ground.stars) ground.stars.material.uniforms.zoom.value = state.view === 'tele' ? 2 : 1;
  }
  function setView(v) {
    state.view = v; root.dataset.view = v; state.follow = true;
    // 長鏡頭：跳到月亮剛升起、還在塔後面的時刻（高度約 0.8°）
    if (v === 'tele' && state.night && cur.alt > 2.5) {
      let t = state.night.rise.getTime();
      while (moonAltAzOf(new Date(t), SITE).alt < 0.8 && t < state.night.rise.getTime() + 3600000) t += 30000;
      state.t = t; setT(t);
    }
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    setFov(); aim();
  }
  function setNight(k) {
    state.which = k; state.night = nights[k];
    $$('.mi-night button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.night === k ? 'true' : 'false'));
    const n = state.night;
    if (renderer && n) { const a = n.riseAz * DEG; ground.tower.position.set(2000 * Math.sin(a), 0, -2000 * Math.cos(a)); }
    slider.max = String(n ? Math.round(((n.set ? Math.min(n.set.getTime(), n.rise.getTime() + 14 * 3600000) : n.rise.getTime() + 12 * 3600000) - n.rise.getTime()) / 60000) + 30 : 720);
    setT(n ? n.rise.getTime() - 20 * 60000 : Date.now());
  }
  function setT(t) {
    state.t = t;
    const n = state.night, m = n ? Math.round((t - n.rise.getTime()) / 60000) + 30 : 0;
    slider.value = String(m); slider.style.setProperty('--p', `${(m / +slider.max) * 100}%`);
    update(); aim();
  }

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play'), slider = $('.mi-time');
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  slider.addEventListener('input', () => { setPlaying(false); const n = state.night; if (n) setT(n.rise.getTime() + (parseFloat(slider.value) - 30) * 60000); });
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => { setView(b.dataset.view); root.classList.remove('al-fresh'); }));
  $$('.mi-night button').forEach((b) => b.addEventListener('click', () => { setPlaying(false); setNight(b.dataset.night); }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="ring"]', (v) => { state.ring = v; });
  bind('[data-t="scenery"]', (v) => { state.scenery = v; if (ground.scenery) ground.scenery.visible = v; });
  $$('.mi-ill button').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.ill; state[k] = !state[k]; b.setAttribute('aria-pressed', state[k] ? 'true' : 'false'); drawIllusion();
  }));
  // 拖曳轉頭（眼睛、長鏡頭）；放開後不再自動跟著月亮，按 ↺ 回到月亮
  let drag = null;
  spaceCv.addEventListener('pointerdown', (e) => { if (state.view === 'space') return; drag = { x: e.clientX, y: e.clientY, yaw: state.yaw, pitch: state.pitch }; spaceCv.setPointerCapture(e.pointerId); });
  spaceCv.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const k = camera.fov / spaceCv.clientHeight;
    state.follow = false; state.yaw = drag.yaw - (e.clientX - drag.x) * k; state.pitch = MathUtils.clamp(drag.pitch + (e.clientY - drag.y) * k, -5, 89); aim();
  });
  spaceCv.addEventListener('pointerup', () => { drag = null; });
  if (renderer) $('.al-home').addEventListener('click', () => { state.follow = true; aim(); });

  function updateLabels() {
    cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set();
    if (state.view === 'space') {
      place(L.you, space.pin.position, 10); place(L.smoon, space.moon.position.clone().add(new Vector3(0, -0.7, 0)), 6);
    } else {
      const mp = ground.moon.position;
      if (cur.alt > -1) place(L.moon, mp.clone().add(new Vector3(0, -ground.moon.scale.x * 1.6, 0)), 8);
      if (state.scenery) place(L.tower, ground.tower.position.clone().add(new Vector3(0, 0, 0)), 6);
      for (const [k, az] of [['N', 0], ['E', 90], ['S', 180], ['W', 270]]) place(L[k], hv(0.3, az).multiplyScalar(2900).add(new Vector3(0, EYE, 0)), 8);
    }
    for (const el of prevShown) if (!shown.has(el)) el.style.opacity = 0;
    // 量月環：大小固定（以今晚月出時的角大小為準），跟著月亮走
    if (state.ring && state.view !== 'space' && cur.alt > -1 && state.night) {
      proj.copy(ground.moon.position).project(camera);
      const px = (state.night.riseSize / 60) / camera.fov * ch;   // 月出時的直徑（像素）
      ring.style.opacity = Math.abs(proj.x) < 1 && Math.abs(proj.y) < 1 ? 1 : 0;
      const d = Math.max(px + 14, 22);
      ring.style.width = ring.style.height = `${d}px`;
      ring.style.transform = `translate(${(proj.x * 0.5 + 0.5) * cw - d / 2}px, ${(-proj.y * 0.5 + 0.5) * ch - d / 2}px)`;
    } else ring.style.opacity = 0;
  }

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function render() { if (!renderer) return; updateLabels(); renderer.render(state.view === 'space' ? space.scene : ground.scene, camera); }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing && state.night) {
      const nt = state.t + dt * 20 * 60000;    // 一秒 20 分鐘
      if ((nt - state.night.rise.getTime()) / 60000 + 30 > +slider.max) setPlaying(false); else setT(nt);
    }
    render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);
  new ResizeObserver(() => { setFov(); aim(); drawIllusion(); }).observe(spaceWrap);
  new ResizeObserver(drawIllusion).observe(illCv);

  root.dataset.view = 'eye';
  setNight('tonight'); setView('eye'); drawIllusion();
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, state, setView, setNight, setT, setPlaying, render, drawIllusion };
  return { setView, setNight };
}

// ---------------------------------------------------------------------------
// 頁面下方：今晚的月出，以及未來一年每次滿月的大小
function renderTonight(box) {
  const now = new Date(), n = moonNight(new Date(now.getTime() - 4 * 3600000), SITE), ph = moonPhase(now);
  const fm = rankFullMoons(fullMoons(now, 13)), mx = Math.max(...fm.map((f) => f.size));
  const discs = fm.map((f) => {
    const px = Math.round(64 * f.size / mx);
    return `<div class="mi-disc${f.super ? ' sup' : ''}${f.micro ? ' mic' : ''}"><i style="width:${px}px;height:${px}px"></i>
      <b>${MON[tw(f.t).m - 1]} ${tw(f.t).d}</b><span>${f.size.toFixed(1)}′ · ${commas(f.km / 1000)}k km</span>
      ${f.super ? '<em>Supermoon · 超級月亮</em>' : f.micro ? '<em>Micromoon · 微型月亮</em>' : ''}</div>`;
  }).join('');
  const [rd, rdz] = n ? dirOf(n.riseAz) : ['', ''];
  box.innerHTML = `<p class="tn-when">${dateEn(now)}: the Moon is ${Math.round(ph.illum * 100)}% lit<span>${dateZh(now)}：月亮亮面 ${Math.round(ph.illum * 100)}%</span></p>
    ${n ? `<div class="tn-grid mi-tn-grid">
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#9790;</span><div><h3>Moonrise<span class="zh">月出</span></h3><p>${dateEn(n.rise)}, about ${ampm(n.rise)}, toward the ${rd}<span class="zh">${dateZh(n.rise)} 約 ${hhmm(n.rise)}，從${rdz}方升起</span></p></div></div>
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#8593;</span><div><h3>Highest<span class="zh">最高</span></h3><p>About ${ampm(n.top)}, ${Math.round(n.topAlt)}° up<span class="zh">約 ${hhmm(n.top)}，高 ${Math.round(n.topAlt)}°</span></p></div></div>
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#8853;</span><div><h3>Size<span class="zh">大小</span></h3><p>${n.riseSize.toFixed(1)}′ when rising, ${n.topSize.toFixed(1)}′ when highest: ${((n.topSize / n.riseSize - 1) * 100).toFixed(1)}% bigger up high<span class="zh">升起時 ${n.riseSize.toFixed(1)} 角分，最高時 ${n.topSize.toFixed(1)} 角分——高空反而大了 ${((n.topSize / n.riseSize - 1) * 100).toFixed(1)}%</span></p></div></div>
    </div>` : ''}
    <h3 class="tn-h">Full Moons in the coming year, drawn to scale · 未來一年的滿月（照比例畫）</h3>
    <div class="mi-discs">${discs}</div>
    <p class="tn-note">Each disk is drawn to the same scale. The biggest full Moon is about 14% wider than the smallest, but without a second Moon to compare, few people notice. Times are approximate, for Changhua. · 每個圓都用同一個比例畫：最大的滿月比最小的寬約 14%，但天上沒有第二個月亮可以比，很少人看得出來。時間為彰化的近似值。</p>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-illusion-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-moonsize]');
  if (tn) renderTonight(tn);
  document.querySelectorAll('[data-lab-view]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setView(b.getAttribute('data-lab-view'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
