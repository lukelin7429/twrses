/*
 * 人體探索 · 第十課「皮膚在做什麼？」的 3D 皮膚。
 *
 * 真實的：骨架（skeleton.glb，BodyParts3D），淡淡地當位置參考；右前臂（橈骨、尺骨）比較清楚，標出取樣的位置。
 * 自繪示意：從右前臂取下的一小塊皮膚（真實約 4 mm 見方），放大 25 倍浮在手臂旁邊，前面和右面剖開：
 *   表皮（底部有色素細胞）、真皮（毛囊與毛、豎毛肌、皮脂腺、汗腺與汗管、微血管、觸覺感受器、神經）、皮下脂肪。
 *
 * 皮膚座標（skin frame）：1 單位＝真實 1 mm；原點＝皮膚表面中心，+Y 朝外（皮膚表面在 y = 0），x、z ∈ [−2, 2]；
 *   表皮 0 ～ −0.35（畫得比真實厚）、真皮 −0.35 ～ −2.15、皮下脂肪 −2.15 ～ −3.8。skinG 縮放 S（25 倍）。
 *
 * 四個情境（時間軸在 step 裡，每個情境循環播放）：
 *   hot   大熱天：汗水沿汗管往上、在毛孔冒出、蒸發（白色水氣）；微血管變粗變紅
 *   cold  冷風吹：豎毛肌收縮、毛豎起、起雞皮疙瘩；微血管變細變淡
 *   touch 輕輕一碰：橡皮擦先輕碰（淺層的觸覺小體亮）、再用力按（深層的環層小體亮），訊號沿神經離開
 *   sun   曬一小時太陽（10 秒＝1 小時）：UVB 停在表皮、UVA 到真皮；黑色素顆粒往上；維生素 D 閃光；最後表皮變紅＝曬傷
 * 「今天彰化的太陽」（initSun）是 2D：NOAA 太陽位置公式算太陽高度，晴天紫外線指數 UVI ≈ 12.5·cos(天頂角)^2.42·(280/300)^−1.23
 *   （Madronich 的經驗式，臭氧取 280 DU），分級照 WHO／中央氣象署：0–2 低量、3–5 中量、6–7 高量、8–10 過量、11+ 危險。
 *
 * 產物：cd tools/body && npm run build → assets/js/skin.js
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, CylinderGeometry,
  DirectionalLight, DoubleSide, EdgesGeometry, Group, HemisphereLight, LineBasicMaterial, LineSegments, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial, TubeGeometry,
  Vector3, WebGLRenderer, Float32BufferAttribute,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const S = 0.025;
const EPI = -0.35, DERM = -2.15, FAT = -3.8, H = 2;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const tube = (pts, r, mat, seg = 40) => new Mesh(new TubeGeometry(cr(pts), seg, r, 8, false), mat);

function glowTex(inner, outer) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, inner); gr.addColorStop(1, outer);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

// ---------------- 太陽位置與紫外線指數（2D，不需要 WebGL） ----------------
const LAT = 24.08, LON = 120.54, TZ = 8;
const rad = MathUtils.degToRad, deg = MathUtils.radToDeg;
// NOAA 的簡化公式：回傳太陽仰角（度）
function sunAlt(date, minutes) {
  const y0 = new Date(date.getFullYear(), 0, 1);
  const doy = Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()) - y0) / 86400000) + 1;
  const hr = minutes / 60;
  const g = ((Math.PI * 2) / 365) * (doy - 1 + (hr - 12) / 24);
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
    - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const tst = minutes + eqt + 4 * LON - 60 * TZ;
  const ha = rad(tst / 4 - 180);
  const cz = Math.sin(rad(LAT)) * Math.sin(dec) + Math.cos(rad(LAT)) * Math.cos(dec) * Math.cos(ha);
  return deg(Math.asin(MathUtils.clamp(cz, -1, 1)));
}
const uviOf = (alt) => (alt <= 0 ? 0 : 12.5 * Math.pow(Math.sin(rad(alt)), 2.42) * Math.pow(280 / 300, -1.23));
const CATS = [
  { max: 3, color: '#4caf50', en: 'Low', zh: '低量級', adv: ['No protection needed. Enjoy being outside!', '不需要特別防護，好好享受戶外吧！'] },
  { max: 6, color: '#f9d71c', en: 'Moderate', zh: '中量級', adv: ['Protection needed: seek shade at midday, and wear a shirt, a hat, and sunscreen.', '需要防護：中午找陰涼處，穿上衣服、戴帽子、擦防曬乳。'] },
  { max: 8, color: '#f57c00', en: 'High', zh: '高量級', adv: ['Protection needed: seek shade at midday, and wear a shirt, a hat, and sunscreen.', '需要防護：中午找陰涼處，穿上衣服、戴帽子、擦防曬乳。'] },
  { max: 11, color: '#d32f2f', en: 'Very high', zh: '過量級', adv: ['Extra protection: stay in the shade around midday. A shirt, a hat, and sunscreen are a must.', '加強防護：中午前後待在陰涼處；衣服、帽子、防曬乳一樣都不能少。'] },
  { max: 99, color: '#7b1fa2', en: 'Extreme', zh: '危險級', adv: ['Extra protection: stay in the shade around midday. A shirt, a hat, and sunscreen are a must.', '加強防護：中午前後待在陰涼處；衣服、帽子、防曬乳一樣都不能少。'] },
];
const catOf = (u) => CATS.find((c) => Math.round(u) < c.max);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`;
function initSun(root) {
  const box = root.querySelector('.sn-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const cv = q('.sn-cv'), dateIn = q('.sn-date'), tIn = q('.sn-t');
  const out = { time: q('.sn-time'), alt: q('.sn-alt'), sh: q('.sn-shadow'), uvi: q('.sn-uvi'), adv: q('.sn-advice') };
  const now = new Date();
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  dateIn.value = iso(now);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  tIn.value = nowMin >= 300 && nowMin <= 1140 ? Math.round(nowMin / 5) * 5 : 720;
  const fill = () => tIn.style.setProperty('--p', `${((tIn.value - 300) / 840) * 100}%`);
  function day() { const [y, m, d] = dateIn.value.split('-').map(Number); return y ? new Date(y, m - 1, d) : new Date(); }
  function draw() {
    const g = cv.getContext('2d'), W = cv.width, Hh = cv.height;
    const L = 46, R = 14, T = 14, B = 34, pw = W - L - R, ph = Hh - T - B, UMAX = 14;
    const xOf = (m) => L + ((m - 300) / 840) * pw, yOf = (u) => T + ph - (Math.min(u, UMAX) / UMAX) * ph;
    g.clearRect(0, 0, W, Hh);
    g.fillStyle = '#0a1224'; g.fillRect(0, 0, W, Hh);
    let lo = 0;
    for (const c of CATS) {                          // 分級色帶
      const hi = Math.min(c.max, UMAX + 1) - 0.5;
      g.fillStyle = c.color; g.globalAlpha = 0.14;
      g.fillRect(L, yOf(hi), pw, yOf(Math.max(0, lo - 0.5)) - yOf(hi));
      g.globalAlpha = 0.85; g.fillStyle = c.color; g.font = '600 11px sans-serif'; g.textAlign = 'left';
      if (lo <= UMAX) g.fillText(`${c.en} · ${c.zh}`, L + 6, Math.max(T + 11, yOf(hi) + 13));   // 左邊清晨的值很低，不會擋到曲線
      lo = c.max;
    }
    g.globalAlpha = 1;
    g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 1; g.fillStyle = '#9fb0cf'; g.font = '11px sans-serif';
    for (let u = 0; u <= UMAX; u += 2) { g.textAlign = 'right'; g.fillText(String(u), L - 6, yOf(u) + 4); g.beginPath(); g.moveTo(L, yOf(u)); g.lineTo(L + pw, yOf(u)); g.stroke(); }
    g.textAlign = 'center';
    for (let h = 6; h <= 18; h += 2) g.fillText(`${h}:00`, xOf(h * 60), Hh - 12);
    const d = day();
    g.beginPath();
    for (let m = 300; m <= 1140; m += 5) { const u = uviOf(sunAlt(d, m)); if (m === 300) g.moveTo(xOf(m), yOf(u)); else g.lineTo(xOf(m), yOf(u)); }
    g.lineTo(xOf(1140), yOf(0)); g.lineTo(xOf(300), yOf(0)); g.closePath();
    const gr = g.createLinearGradient(0, T, 0, T + ph); gr.addColorStop(0, 'rgba(176,124,255,.55)'); gr.addColorStop(1, 'rgba(255,211,110,.25)');
    g.fillStyle = gr; g.fill();
    g.strokeStyle = '#ffd36e'; g.lineWidth = 2.5; g.stroke();
    const today = iso(new Date()) === dateIn.value;
    if (today) {
      const nm = new Date().getHours() * 60 + new Date().getMinutes();
      if (nm >= 300 && nm <= 1140) { g.setLineDash([4, 4]); g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(xOf(nm), T); g.lineTo(xOf(nm), T + ph); g.stroke(); g.setLineDash([]); g.fillStyle = '#fff'; g.fillText('now · 現在', xOf(nm), T + 10); }
    }
    const m = +tIn.value, alt = sunAlt(d, m), u = uviOf(alt), c = catOf(u);
    g.fillStyle = c.color; g.strokeStyle = '#fff'; g.lineWidth = 2;
    g.beginPath(); g.arc(xOf(m), yOf(u), 7, 0, 7); g.fill(); g.stroke();
    out.time.textContent = hhmm(m);
    out.alt.textContent = alt > 0 ? `${alt.toFixed(0)}°` : 'below the horizon · 已下山';
    out.sh.textContent = alt > 0.5 ? `${(1 / Math.tan(rad(alt))).toFixed(1)}× your height · 身高的 ${(1 / Math.tan(rad(alt))).toFixed(1)} 倍` : '—';
    out.uvi.innerHTML = `<b style="color:${c.color}">${Math.round(u)}</b> ${c.en} · ${c.zh}`;
    const short = alt > 45 ? [' Your shadow is shorter than you are: the sun is strong.', '影子比身高短：太陽很強。'] : ['', ''];
    out.adv.innerHTML = `${esc(c.adv[0])}${short[0]}<span class="zh">${esc(c.adv[1])}${short[1]}</span>`;
    out.adv.style.borderColor = c.color;
  }
  tIn.addEventListener('input', () => { fill(); draw(); });
  dateIn.addEventListener('change', draw);
  fill(); draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const sun = initSun(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => sun && sun.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.08; controls.maxDistance = 4;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(-2, 3, 2.5); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(2, 1.5, -2.5); scene.add(rim);

  const SC = JSON.parse(root.getAttribute('data-scen') || '{}');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), title: $('.sn-title'), zh: $('.sn-zh'), status: $('.sn-status'),
    scen: [...root.querySelectorAll('[data-scen-go]')], clock: $('.sn-clock'), min: $('.sn-min'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, bonesOn: true, scen: 'hot', t: 0, vessel: 1, vesselT: 1.6, hair: 0, burn: 0, tan: 0 };
  const skinG = new Group();
  skinG.scale.setScalar(S);
  skinG.visible = false;                           // 載入完、放好位置才顯示
  scene.add(skinG);
  const P = {};
  const W = (p) => skinG.localToWorld(p.clone());

  // ---------- 材質 ----------
  const lay = (c, op) => new MeshStandardMaterial({ color: c, roughness: 0.7, transparent: true, opacity: op, side: DoubleSide, depthWrite: false });
  const M = {
    epi: lay(0xe8c39e, 0.55), derm: lay(0xf2a7a0, 0.22), fat: lay(0xf5d76e, 0.18),
    lobule: new MeshStandardMaterial({ color: 0xf6dc7a, roughness: 0.6, transparent: true, opacity: 0.75 }),
    follicle: new MeshStandardMaterial({ color: 0xe0a88a, roughness: 0.6 }),
    hair: new MeshStandardMaterial({ color: 0x3a2618, roughness: 0.5 }),
    muscle: new MeshStandardMaterial({ color: 0xb8443c, roughness: 0.6, emissive: 0x000000 }),
    oil: new MeshStandardMaterial({ color: 0xf3e3a0, roughness: 0.4 }),
    gland: new MeshStandardMaterial({ color: 0x8fd3ff, roughness: 0.4 }),
    sweat: new MeshStandardMaterial({ color: 0x8fd3ff, roughness: 0.1, transparent: true, opacity: 0.85 }),
    art: new MeshStandardMaterial({ color: 0xd94040, roughness: 0.5, emissive: 0x000000 }),
    vein: new MeshStandardMaterial({ color: 0x8a3a6a, roughness: 0.5 }),
    meiss: new MeshStandardMaterial({ color: 0xffd9e6, roughness: 0.5, emissive: 0x000000 }),
    pac: new MeshStandardMaterial({ color: 0xfff0f4, roughness: 0.4, transparent: true, opacity: 0.45, emissive: 0x000000, depthWrite: false }),
    nerve: new MeshStandardMaterial({ color: 0xffe08a, roughness: 0.5 }),
    melano: new MeshStandardMaterial({ color: 0x4a2a14, roughness: 0.6 }),
    melanin: new MeshBasicMaterial({ color: 0x6b3a1a }),
    eraser: new MeshStandardMaterial({ color: 0xf08aa0, roughness: 0.7 }),
    pencil: new MeshStandardMaterial({ color: 0xf2c94c, roughness: 0.6 }),
    bump: new MeshStandardMaterial({ color: 0xe8c39e, roughness: 0.7 }),
    uvb: new MeshBasicMaterial({ color: 0xb07cff, transparent: true, opacity: 0.85 }),
    uva: new MeshBasicMaterial({ color: 0xd9b8ff, transparent: true, opacity: 0.6 }),
  };
  const EPI_BASE = new Color(0xe8c39e), EPI_TAN = new Color(0xb98a5e), EPI_BURN = new Color(0xe26a5a);

  // ---------- 三層皮膚（半透明盒子＋外框） ----------
  const layer = (y0, y1, mat) => {
    const m = new Mesh(new BoxGeometry(2 * H, y0 - y1, 2 * H), mat);
    m.position.y = (y0 + y1) / 2; m.renderOrder = 1; skinG.add(m);
    const e = new LineSegments(new EdgesGeometry(m.geometry), new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
    e.position.copy(m.position); skinG.add(e);
    return m;
  };
  layer(0, EPI, M.epi); layer(EPI, DERM, M.derm); layer(DERM, FAT, M.fat);
  // 脂肪小葉
  for (let ix = 0; ix < 4; ix++) for (let iz = 0; iz < 4; iz++) for (let iy = 0; iy < 2; iy++) {
    const b = new Mesh(new SphereGeometry(0.42, 16, 12), M.lobule);
    b.position.set(-1.5 + ix + (iy ? 0.45 : 0), DERM - 0.55 - iy * 0.85, -1.5 + iz + (iy ? 0.4 : 0));
    b.scale.set(1, 0.85, 1); skinG.add(b);
  }

  // ---------- 毛囊、毛、豎毛肌、皮脂腺、雞皮疙瘩 ----------
  const hairs = [];
  for (const [x0, z0] of [[-1.15, -0.7], [0.55, 0.9]]) {
    const bulb = V(x0, -2.45, z0), exit = V(x0 + 0.85, 0, z0);
    skinG.add(tube([bulb, bulb.clone().lerp(exit, 0.5), exit], 0.16, M.follicle, 16));
    const bb = new Mesh(new SphereGeometry(0.24, 14, 10), M.follicle); bb.position.copy(bulb); skinG.add(bb);
    skinG.add(tube([bulb.clone().add(V(0.05, 0.15, 0)), exit], 0.05, M.hair, 12));
    const pivot = new Group(); pivot.position.copy(exit); skinG.add(pivot);
    const shaft = new Mesh(new CylinderGeometry(0.045, 0.05, 1.6, 8), M.hair); shaft.position.y = 0.8; pivot.add(shaft);
    const mid = bulb.clone().lerp(exit, 0.4);
    const musc = tube([mid, V(mid.x - 0.25, -0.9, z0), V(x0 - 0.15, EPI - 0.08, z0)], 0.07, M.muscle, 12);
    skinG.add(musc);
    for (const [dx, dy] of [[-0.25, 0.1], [-0.32, -0.12], [-0.12, -0.15]]) {
      const g = new Mesh(new SphereGeometry(0.13, 10, 8), M.oil);
      g.position.copy(bulb.clone().lerp(exit, 0.62)).add(V(dx, dy, 0.12)); skinG.add(g);
    }
    const bump = new Mesh(new SphereGeometry(0.32, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.bump);
    bump.position.copy(exit); bump.scale.set(1, 0.001, 1); skinG.add(bump);
    hairs.push({ pivot, musc, bump, exit });
  }
  P.hair = hairs[1].exit.clone().add(V(0.5, 1.3, 0));

  // ---------- 汗腺與汗管、毛孔上的汗珠、水氣 ----------
  const ducts = [];
  for (const [xs, zs] of [[0.05, -1.25], [-0.45, 1.3]]) {
    const coil = [];
    for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 8; coil.push(V(xs + 0.26 * Math.cos(a), -2.55 + 0.4 * (i / 60), zs + 0.26 * Math.sin(a))); }
    skinG.add(tube(coil, 0.07, M.gland, 160));
    const pore = V(xs + 0.25, 0, zs);
    const dpts = [coil[coil.length - 1], V(xs + 0.1, -1.6, zs), V(xs + 0.18, -0.8, zs), V(xs + 0.2, -0.3, zs + 0.06), V(xs + 0.28, -0.18, zs - 0.06), pore];
    const curve = cr(dpts);
    skinG.add(new Mesh(new TubeGeometry(curve, 40, 0.05, 8, false), M.gland));
    const drop = new Mesh(new SphereGeometry(0.22, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.sweat);
    drop.position.copy(pore); drop.scale.setScalar(0.001); skinG.add(drop);
    const beads = [];
    for (let i = 0; i < 4; i++) { const b = new Mesh(new SphereGeometry(0.07, 8, 6), M.sweat); b.visible = false; skinG.add(b); beads.push(b); }
    ducts.push({ curve, drop, beads, pore });
  }
  P.gland = V(0.05, -2.4, -1.25); P.pore = ducts[0].pore;
  const steamTex = glowTex('rgba(255,255,255,.55)', 'rgba(255,255,255,0)');
  const steam = [];
  for (let i = 0; i < 10; i++) { const s = new Sprite(new SpriteMaterial({ map: steamTex, transparent: true, depthWrite: false, opacity: 0 })); s.scale.set(0.6, 0.6, 1); skinG.add(s); steam.push(s); }

  // ---------- 微血管（粗細會變，重建） ----------
  const vessels = [];
  const vesselPaths = [];
  vesselPaths.push({ pts: [V(-H, -1.95, -0.85), V(0, -1.9, -0.85), V(H, -1.95, -0.85)], art: true, r: 0.11 });
  vesselPaths.push({ pts: [V(-H, -2.0, 0.75), V(0, -2.05, 0.75), V(H, -2.0, 0.75)], art: false, r: 0.13 });
  for (const x of [-1.6, -0.75, 0.25, 1.1, 1.75]) {
    vesselPaths.push({ pts: [V(x, -1.92, -0.85), V(x - 0.1, -1.0, -0.5), V(x, -0.48, -0.05), V(x + 0.1, -1.0, 0.4), V(x, -2.0, 0.75)], art: null, r: 0.045 });
  }
  let builtV = -1;
  function buildVessels(k) {
    if (Math.abs(k - builtV) < 0.01) return;
    builtV = k;
    for (const m of vessels) { m.geometry.dispose(); skinG.remove(m); }
    vessels.length = 0;
    for (const v of vesselPaths) {
      const mat = v.art === false ? M.vein : M.art;
      const m = new Mesh(new TubeGeometry(cr(v.pts), 40, v.r * (v.art === null ? k : 0.7 + 0.3 * k), 8, false), mat);
      skinG.add(m); vessels.push(m);
    }
  }
  P.vessel = V(1.1, -0.9, 0.4);

  // ---------- 觸覺感受器與神經 ----------
  const meiss = [];
  for (const x of [-1.5, 0.15, 1.35]) {
    const m = new Mesh(new SphereGeometry(1, 14, 10), M.meiss);
    m.scale.set(0.11, 0.2, 0.11); m.position.set(x, -0.6, 0.25); skinG.add(m); meiss.push(m);
  }
  const pac = new Group(); pac.position.set(1.2, -2.6, -1.05); skinG.add(pac);
  for (const r of [0.38, 0.28, 0.18]) { const s = new Mesh(new SphereGeometry(r, 18, 12), M.pac); s.scale.set(1, 1.35, 1); pac.add(s); }
  const nerveCurves = [
    cr([V(0.15, -0.8, 0.25), V(0.25, -1.5, 0.2), V(1.0, -2.1, 0.1), V(H, -2.25, 0.0)]),
    cr([V(-1.5, -0.8, 0.25), V(-1.3, -1.6, 0.15), V(0.2, -2.2, 0.05), V(H, -2.3, -0.05)]),
    cr([V(1.2, -2.95, -1.05), V(1.5, -3.1, -0.7), V(H, -3.0, -0.4)]),
  ];
  for (const c of nerveCurves) skinG.add(new Mesh(new TubeGeometry(c, 30, 0.05, 8, false), M.nerve));
  const pulseTex = glowTex('rgba(255,240,180,.85)', 'rgba(255,210,100,0)');
  const pulses = nerveCurves.map(() => { const s = new Sprite(new SpriteMaterial({ map: pulseTex, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true })); s.scale.set(0.5, 0.5, 1); s.visible = false; skinG.add(s); return s; });
  P.meiss = V(0.15, -0.6, 0.25); P.pac = pac.position.clone();
  // 橡皮擦（觸碰）
  const pencil = new Group();
  const er = new Mesh(new CylinderGeometry(0.22, 0.22, 0.45, 20), M.eraser); er.position.y = 0.22;
  const bodyP = new Mesh(new CylinderGeometry(0.24, 0.24, 2.0, 6), M.pencil); bodyP.position.y = 1.45;
  pencil.add(er, bodyP); pencil.rotation.z = 0.12; pencil.visible = false; skinG.add(pencil);

  // ---------- 色素細胞、黑色素、紫外線、維生素 D ----------
  for (let i = 0; i < 9; i++) {
    const m = new Mesh(new SphereGeometry(1, 10, 8), M.melano);
    m.scale.set(0.16, 0.07, 0.16); m.position.set(-1.7 + (i % 3) * 1.4 + (i > 2 ? 0.3 : 0), EPI + 0.04, -1.5 + Math.floor(i / 3) * 1.3); skinG.add(m);
  }
  P.melano = V(-0.3, EPI + 0.04, -0.2);
  const melanin = [];
  for (let i = 0; i < 40; i++) { const m = new Mesh(new SphereGeometry(0.035, 6, 4), M.melanin); m.visible = false; m.userData.seed = Math.random(); skinG.add(m); melanin.push(m); }
  const sunS = new Sprite(new SpriteMaterial({ map: glowTex('rgba(255,236,150,.95)', 'rgba(255,200,80,0)'), blending: AdditiveBlending, depthWrite: false, transparent: true }));
  sunS.position.set(-1.6, 5.5, -1.6); sunS.scale.set(2.6, 2.6, 1); sunS.visible = false; skinG.add(sunS);
  const rays = [];
  for (let i = 0; i < 10; i++) {
    const uvb = i % 2 === 0;
    const m = new Mesh(new CylinderGeometry(0.03, 0.03, 1, 6), uvb ? M.uvb : M.uva);
    m.visible = false; m.userData = { uvb, x: -1.6 + (i % 5) * 0.8, z: -1.4 + Math.floor(i / 5) * 2.2 + (i % 3) * 0.2 };
    skinG.add(m); rays.push(m);
  }
  const vitTex = glowTex('rgba(255,240,120,.9)', 'rgba(255,220,80,0)');
  const vit = [];
  for (let i = 0; i < 6; i++) { const s = new Sprite(new SpriteMaterial({ map: vitTex, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })); s.scale.set(0.35, 0.35, 1); s.position.set(-1.5 + i * 0.6, -0.18, -1 + (i % 3) * 0.8); skinG.add(s); vit.push(s); }

  // ---------- 載入骨架：右前臂與取樣框 ----------
  let bones = null;
  const zoomLines = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.6 }));
  scene.add(zoomLines);
  const sample = new Mesh(new BoxGeometry(0.004 * 2, 0.0008, 0.004 * 2), new MeshBasicMaterial({ color: 0xffd36e }));
  scene.add(sample);
  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      const arm = ['r-radius', 'r-ulna', 'r-humerus'].includes(b.info.id) || (b.info.region === 'hand' && b.info.id.startsWith('r-'));
      b.mat.opacity = arm ? 0.55 : 0.1; b.mat.depthWrite = false; b.mesh.renderOrder = 1;
    }
    const rb = bones.get('r-radius').box, ub = bones.get('r-ulna').box;
    const fore = rb.clone().union(ub), fc = fore.getCenter(V(0, 0, 0));
    // 取樣點：前臂外側皮膚（骨頭外約 2.5 公分），皮膚塊浮在手臂外側
    const spot = V(fore.min.x - 0.022, fc.y + 0.02, fc.z + 0.005);
    sample.position.copy(spot); sample.rotation.z = Math.PI / 2;
    skinG.position.set(spot.x - 0.17, spot.y + 0.01, spot.z + 0.02);
    skinG.updateMatrixWorld(true);
    const corners = [[-H, -H], [H, -H], [H, H], [-H, H]].map(([x, z]) => W(V(x, 0, z)));
    const sc = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => spot.clone().add(V(0, a * 0.004, b * 0.004)));
    const arr = [];
    for (let i = 0; i < 4; i++) arr.push(sc[i].x, sc[i].y, sc[i].z, corners[i].x, corners[i].y, corners[i].z);
    zoomLines.geometry.setAttribute('position', new Float32BufferAttribute(arr, 3));
    P.spot = spot;
    P.target = W(V(0, -1.6, 0)).lerp(spot, 0.32);
    P.home = V(-0.1, 0.13, 0.34);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    buildVessels(1);
    choose('hot');
    skinG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.35 - camera.aspect) * 0.9, 1, 1.6);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 情境 ----------------
  const LOOP = { hot: 7, cold: 6, touch: 6, sun: 12 };
  function choose(k) {
    state.scen = k; state.t = 0;
    R.scen.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-scen-go') === k ? 'true' : 'false'));
    const sc = SC[k] || {};
    R.title.textContent = sc.en || ''; R.zh.textContent = sc.zh || '';
    R.status.innerHTML = `${esc(sc.text_en || '')}<span class="zh">${esc(sc.text_zh || '')}</span>`;
    R.status.className = `ey-status sn-status ${k === 'sun' ? 'ey-bad' : k === 'cold' ? '' : 'ey-ok'}`;
    R.clock.hidden = k !== 'sun';
    state.vesselT = k === 'hot' ? 1.7 : k === 'cold' ? 0.55 : 1;
    state.burn = 0; state.tan = 0;
  }
  function step(dt) {
    if (!state.ready) return;
    state.t += dt;
    const k = state.scen, T = LOOP[k], t = state.t % T;
    // 血管粗細
    state.vessel += (state.vesselT - state.vessel) * Math.min(1, dt * 1.5);
    buildVessels(Math.round(state.vessel * 50) / 50);
    M.art.emissive.setHex(k === 'hot' ? 0x5a0a0a : 0x000000);
    // 冷：豎毛肌收縮、毛豎起、雞皮疙瘩
    const hairT = k === 'cold' ? MathUtils.smoothstep(t, 0.5, 2.2) : 0;
    state.hair += (hairT - state.hair) * Math.min(1, dt * 5);
    for (const h of hairs) {
      h.pivot.rotation.z = MathUtils.lerp(-1.0, -0.12, state.hair);
      h.bump.scale.set(1, 0.001 + 0.8 * state.hair, 1);
      h.musc.scale.setScalar(1 - 0.06 * state.hair);
    }
    M.muscle.emissive.setHex(state.hair > 0.3 ? 0x6b1010 : 0x000000);
    // 熱：汗水往上、汗珠長大又蒸發
    ducts.forEach((d, j) => {
      const on = k === 'hot';
      d.beads.forEach((b, i) => {
        b.visible = on;
        if (on) d.curve.getPointAt(((t * 0.35 + i / d.beads.length + j * 0.13) % 1), b.position);
      });
      const grow = on ? MathUtils.clamp(Math.sin(((t + j) / T) * Math.PI * 2) * 0.5 + 0.55, 0, 1) : 0;
      d.drop.scale.setScalar(Math.max(0.001, grow));
    });
    steam.forEach((s, i) => {
      const on = k === 'hot';
      const f = (t * 0.3 + i / steam.length) % 1;
      const d = ducts[i % 2];
      s.position.set(d.pore.x + Math.sin(i * 1.7 + t) * 0.3, f * 2.4 + 0.1, d.pore.z + Math.cos(i * 2.3) * 0.3);
      s.material.opacity = on ? 0.55 * (1 - f) : 0;
    });
    // 觸碰：先輕碰（觸覺小體）、再用力按（環層小體）
    pencil.visible = k === 'touch';
    let light = 0, press = 0;
    if (k === 'touch') {
      const down = t < 1 ? 1 - t : t < 2.6 ? 0 : t < 3.4 ? (t - 2.6) / 0.8 : t < 4.8 ? 1 : Math.max(0, 1 - (t - 4.8) * 2);
      light = t >= 1 && t < 2.6 ? 1 : 0;
      press = t >= 3.4 && t < 4.8 ? 1 : 0;
      pencil.position.set(0.1, 0.02 + (1 - down) * 2.2 - press * 0.15, 0.25);
      if (t < 1) pencil.position.y = 0.02 + (1 - t) * 2.2;
    }
    M.meiss.emissive.setHex(light || press ? 0xc0406a : 0x000000);
    M.pac.emissive.setHex(press ? 0xc0a020 : 0x000000);
    pulses.forEach((p, i) => {
      const act = i < 2 ? (light || press) : press;
      p.visible = !!act;
      if (act) nerveCurves[i].getPointAt((t * 1.2 + i * 0.3) % 1, p.position);
    });
    // 太陽：紫外線、黑色素、維生素 D、曬傷
    const sunOn = k === 'sun';
    sunS.visible = sunOn;
    const minutes = sunOn ? Math.min(60, (t / 10) * 60) : 0;
    if (sunOn) {
      R.min.textContent = Math.round(minutes);
      state.tan = MathUtils.clamp(minutes / 60, 0, 1);
      state.burn = MathUtils.clamp((minutes - 40) / 20, 0, 1);
    }
    rays.forEach((r) => {
      r.visible = sunOn;
      if (!sunOn) return;
      const bottom = r.userData.uvb ? -0.25 : -1.35, top = 3.2;
      const len = top - bottom;
      r.position.set(r.userData.x, (top + bottom) / 2, r.userData.z);
      r.scale.set(1, len, 1);
    });
    melanin.forEach((m) => {
      m.visible = sunOn && m.userData.seed < state.tan * 1.1;
      if (!m.visible) return;
      const s = m.userData.seed, f = (t * 0.25 + s) % 1;
      m.position.set(-1.8 + (s * 97 % 1) * 3.6, EPI + 0.05 + f * 0.25, -1.8 + (s * 53 % 1) * 3.6);
    });
    vit.forEach((v, i) => { v.material.opacity = sunOn ? 0.6 * Math.max(0, Math.sin(t * 3 + i)) : 0; });
    M.epi.color.copy(EPI_BASE).lerp(EPI_TAN, state.tan * 0.55).lerp(EPI_BURN, state.burn * 0.7);
    if (sunOn) {
      const burned = state.burn > 0.5;
      const sc = SC.sun || {};
      const extra = burned ? ['Too long without protection: the skin is burning!', '沒有防護曬太久：皮膚曬傷了！'] : ['', ''];
      const h = `${esc(sc.text_en || '')}${extra[0] ? ' <b>' + extra[0] + '</b>' : ''}<span class="zh">${esc(sc.text_zh || '')}${extra[1]}</span>`;
      if (R.status.innerHTML !== h) R.status.innerHTML = h;
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const kk = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, kk);
      controls.target.lerpVectors(fly.t0, fly.t1, kk);
    }
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 操作 ----------------
  R.scen.forEach((b) => b.addEventListener('click', () => { if (state.ready) choose(b.getAttribute('data-scen-go')); }));
  $('.sn-replay').addEventListener('click', () => { if (state.ready) choose(state.scen); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="bones"]', (v) => { state.bonesOn = v; if (bones) for (const b of bones.values()) b.mesh.visible = v; zoomLines.visible = v; sample.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });

  // ---------------- 標籤 ----------------
  const Lb = {
    epi: lab.add('ey-lb', 'Epidermis · 表皮'), derm: lab.add('ey-lb', 'Dermis · 真皮'), fat: lab.add('ey-lb', 'Fat · 皮下脂肪'),
    hair: lab.add('ey-lb', 'Hair · 毛髮'), gland: lab.add('ey-lb sn-lb-s', 'Sweat gland · 汗腺'), pore: lab.add('ey-lb sn-lb-s', 'Pore · 毛孔'),
    vessel: lab.add('ey-lb sn-lb-v', 'Blood vessels · 血管'), meiss: lab.add('ey-lb ea-lb-a', 'Touch sensor · 觸覺小體'),
    pac: lab.add('ey-lb ea-lb-a', 'Pressure sensor · 環層小體'), melano: lab.add('ey-lb', 'Pigment cells · 色素細胞'),
    goose: lab.add('ey-lb ea-lb-b', 'Goosebump · 雞皮疙瘩'), uv: lab.add('ey-lb ea-lb-hi', 'UV light · 紫外線'),
    arm: lab.add('ey-lb ey-lb-o', 'Taken from your forearm · 從前臂取樣'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const k = state.scen;
    show(Lb.epi, true, W(V(-H, -0.15, H)), 0);
    show(Lb.derm, true, W(V(-H, -1.25, H)), 0);
    show(Lb.fat, true, W(V(-H, -3.0, H)), 0);
    show(Lb.hair, k !== 'sun', W(P.hair), -6);
    show(Lb.gland, k === 'hot' || k === 'cold', W(P.gland), 12);
    show(Lb.pore, k === 'hot', W(P.pore.clone().add(V(0, 0.9, 0))), -6);
    show(Lb.vessel, k === 'hot' || k === 'cold', W(P.vessel), 0);
    show(Lb.meiss, k === 'touch', W(P.meiss), 14);
    show(Lb.pac, k === 'touch', W(P.pac), 16);
    show(Lb.melano, k === 'sun', W(P.melano), 14);
    show(Lb.goose, k === 'cold' && state.hair > 0.5, W(hairs[0].exit.clone().add(V(0, 0.5, 0))), -8);
    show(Lb.uv, k === 'sun', W(V(-0.8, 2.6, -1.4)), 0);
    show(Lb.arm, state.bonesOn && !!P.spot, P.spot || V(0, 0, 0), 18);
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
    if (autoLabels) { state.labels = w >= 520; if (tgL) tgL.checked = state.labels; }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  let visible = false, raf = 0, last = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (tm - (last || tm)) / 1000);
    last = tm;
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-skin-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, choose: (k) => choose(k),
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => sun && sun.scrollTo() };
}

lazyBoot('[data-skin-lab]', initLab, { test: (lab) => lab.test() });
