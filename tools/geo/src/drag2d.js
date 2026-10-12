/*
 * 地理 Geography ·「拖著走」（不需要 WebGL）：在麥卡托地圖上把一塊陸地拖到別的緯度。
 *
 * 陸地是在「球面上」原封不動地搬（geo.js 的 moveRing：剛體轉動，真正的形狀與面積不變），
 * 再用麥卡托畫出來——所以它在地圖上的大小會跟著緯度變。拖到赤道，就是它和赤道附近的陸地用同一把尺畫的樣子。
 * 三塊可以拖：格陵蘭、非洲本土、澳洲本土（都是陸塊，不是國家）。面積數字在 geo.js 的 AREAS_KM2（出處在頁面的資料出處）。
 *
 * 除錯：document.querySelector('[data-gg-drag]').__drag
 *   state（active、pos）、moveTo(key, lon, lat)、toEquator()、home()、info(key) → { lat, factor, vsAfrica }
 */
import { AREAS_KM2, forward, inverseMercator, moveRing, planarArea, ringArea, ringCenter } from './geo.js';
import { COLORS, drawGraticule, drawLand, pathRing, view } from './map2d.js';

const BOX = [-180, -62, 180, 84.6];
const PIECES = [
  { key: 'greenland', en: 'Greenland', zh: '格陵蘭', color: '#ff9d3d' },
  { key: 'africa', en: 'Africa', zh: '非洲', color: '#3dd6c6' },
  { key: 'australia', en: 'Australia', zh: '澳洲', color: '#c7a2ff' },
];
const LAT_LIMIT = 84;
const inside = (x, y, pts) => {
  let c = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[j];
    if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c;
  }
  return c;
};

export function initDrag(root, land) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.gg-dg-cv'), ctx = cv.getContext('2d');
  const pieces = PIECES.map((p) => {
    const ring = land.pieces[p.key];
    const home = ringCenter(ring);
    const lats = ring.map((q) => q[1]);
    return { ...p, ring, home, pos: home.slice(), cur: ring, trueArea: ringArea(ring), north: Math.max(...lats) - home[1], south: home[1] - Math.min(...lats) };
  });
  const byKey = Object.fromEntries(pieces.map((p) => [p.key, p]));
  const state = { active: 'greenland', drag: null };
  const mercArea = (ring) => planarArea(ring.map(([a, b]) => forward('mercator', a, b)));
  const africaHome = mercArea(byKey.africa.ring);
  let v = null, base = null, W = 0, H = 0, dpr = 1;

  function place(p, lon, lat) {
    // 整塊都要留在地圖畫得到的緯度內；不能跨過地圖左右兩邊
    const maxLat = Math.max(p.home[1], LAT_LIMIT - p.north - 1), minLat = -(58 - p.south);
    lat = Math.min(maxLat, Math.max(minLat, lat));
    const ring = p.home[0] === lon && p.home[1] === lat ? p.ring : moveRing(p.ring, p.home, [lon, lat]);
    const xs = ring.map((q) => q[0]);
    if (Math.max(...xs) - Math.min(...xs) > 200) return false;
    p.pos = [lon, lat]; p.cur = ring;
    return true;
  }
  function info(key) {
    const p = byKey[key];
    const m = mercArea(p.cur);
    return { lat: p.pos[1], factor: m / p.trueArea, vsAfrica: m / africaHome, trueVsAfrica: AREAS_KM2[key] / AREAS_KM2.africa };
  }

  function resize() {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    v = view('mercator', W, H, { box: BOX });
    base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
    const b = base.getContext('2d');
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    b.fillStyle = COLORS.sea; b.fillRect(0, 0, W, H);
    drawLand(b, land, v.toXY, { fill: '#6f8f6a' });
    drawGraticule(b, 'mercator', v.toXY, 30, { latMax: 84.6, latMin: -62, stroke: 'rgba(255,255,255,.14)' });
    // 赤道
    const [x0, y0] = v.toXY(-180, 0), [x1] = v.toXY(180, 0);
    b.setLineDash([6, 5]); b.strokeStyle = 'rgba(255,157,107,.95)'; b.lineWidth = 1.5;
    b.beginPath(); b.moveTo(x0, y0); b.lineTo(x1, y0); b.stroke(); b.setLineDash([]);
    b.font = '700 11px system-ui, sans-serif'; b.fillStyle = 'rgba(255,190,150,.95)';
    b.fillText('Equator 赤道', 8, y0 - 6);
    draw();
  }
  function draw() {
    if (!v) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(base, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const order = pieces.slice().sort((a, b) => (a.key === state.active) - (b.key === state.active));
    for (const p of order) {
      const on = p.key === state.active;
      ctx.beginPath(); pathRing(ctx, p.cur, v.toXY);
      ctx.globalAlpha = on ? 0.86 : 0.6; ctx.fillStyle = p.color; ctx.fill();
      ctx.globalAlpha = 1; ctx.lineWidth = on ? 2 : 1; ctx.strokeStyle = on ? '#fff' : 'rgba(255,255,255,.55)'; ctx.lineJoin = 'round'; ctx.stroke();
      const [cx, cy] = v.toXY(p.pos[0], p.pos[1]);
      ctx.font = `${on ? 800 : 700} ${W < 480 ? 10 : 12}px system-ui, sans-serif`; ctx.textAlign = 'center';
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(5,12,28,.75)'; ctx.strokeText(p.en, cx, cy + 4);
      ctx.fillStyle = '#fff'; ctx.fillText(p.en, cx, cy + 4);
      ctx.textAlign = 'start';
    }
    readout();
  }
  const pct = (x) => (x >= 10 ? Math.round(x * 100) + '%' : x >= 0.1 ? Math.round(x * 100) + '%' : (x * 100).toFixed(1) + '%');
  function readout() {
    const p = byKey[state.active], i = info(p.key);
    $('.gg-dg-name').innerHTML = `${p.en} <span class="zh">${p.zh}</span>`;
    $('.gg-dg-real').innerHTML = `${(AREAS_KM2[p.key] / 1e6).toFixed(2)} <small>million km² · 百萬平方公里</small>`;
    const la = i.lat;
    $('.gg-dg-lat').textContent = Math.abs(la) < 0.5 ? '0° (equator · 赤道)' : `${Math.abs(la).toFixed(0)}° ${la > 0 ? 'N · 北緯' : 'S · 南緯'}`;
    $('.gg-dg-factor').textContent = '× ' + (i.factor >= 10 ? i.factor.toFixed(1) : i.factor.toFixed(2));
    $('.gg-dg-vs').textContent = pct(i.vsAfrica);
    $('.gg-dg-true').textContent = pct(i.trueVsAfrica);
    root.querySelectorAll('[data-piece]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.piece === state.active)));
    const msg = $('.gg-dg-msg');
    const k = Math.abs(la) < 6 ? 'eq' : Math.abs(la - p.home[1]) < 1.5 && Math.abs(p.pos[0] - p.home[0]) < 3 ? 'home' : 'move';
    msg.querySelectorAll('[data-when]').forEach((s) => { s.hidden = s.dataset.when !== k; });
  }

  // ── 拖曳 ──
  const local = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height)]; };
  const toLonLat = (x, y) => inverseMercator(v.toMapX(x), v.toLonLatY(y));
  function hit(x, y) {
    const order = pieces.slice().sort((a, b) => (b.key === state.active) - (a.key === state.active));
    return order.find((p) => inside(x, y, p.cur.map(([a, b]) => v.toXY(a, b))));
  }
  cv.addEventListener('touchstart', (e) => {
    const t = e.touches[0], r = cv.getBoundingClientRect();
    if (hit((t.clientX - r.left) * (W / r.width), (t.clientY - r.top) * (H / r.height))) e.preventDefault();   // 碰到陸塊才攔下來，其他地方照常捲動頁面
  }, { passive: false });
  cv.addEventListener('touchmove', (e) => { if (state.drag) e.preventDefault(); }, { passive: false });
  cv.addEventListener('pointerdown', (e) => {
    const [x, y] = local(e);
    const p = hit(x, y);
    if (!p) return;
    state.active = p.key;
    const [cx, cy] = v.toXY(p.pos[0], p.pos[1]);
    state.drag = { key: p.key, dx: cx - x, dy: cy - y };
    try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 沒有也沒關係 */ }
    cv.classList.add('is-drag');
    draw();
  });
  cv.addEventListener('pointermove', (e) => {
    const [x, y] = local(e);
    if (!state.drag) { cv.style.cursor = hit(x, y) ? 'grab' : ''; return; }
    const [lon, lat] = toLonLat(x + state.drag.dx, y + state.drag.dy);
    if (place(byKey[state.drag.key], Math.max(-175, Math.min(175, lon)), lat)) draw();
  });
  const end = () => { state.drag = null; cv.classList.remove('is-drag'); };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);

  // ── 滑動過去（按鈕） ──
  let anim = 0;
  function glide(p, to) {
    cancelAnimationFrame(anim);
    const from = p.pos.slice(), t0 = performance.now();
    const stepFn = (now) => {
      const u = Math.min(1, (now - t0) / 900), k = u * u * (3 - 2 * u);
      place(p, from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k);
      draw();
      if (u < 1) anim = requestAnimationFrame(stepFn);
    };
    anim = requestAnimationFrame(stepFn);
  }
  const EQ_SPOT = { greenland: [-25, 0], africa: [20, 0], australia: [80, 0] };
  const api = {
    state, pieces: byKey, info,
    moveTo(key, lon, lat) { const ok = place(byKey[key], lon, lat); state.active = key; draw(); return ok; },
    toEquator(instant) { const p = byKey[state.active]; instant ? api.moveTo(p.key, ...EQ_SPOT[p.key]) : glide(p, EQ_SPOT[p.key]); },
    home(instant) { const p = byKey[state.active]; instant ? api.moveTo(p.key, ...p.home) : glide(p, p.home); },
    draw, resize,
  };
  root.querySelectorAll('[data-piece]').forEach((b) => b.addEventListener('click', () => { state.active = b.dataset.piece; draw(); }));
  root.querySelector('[data-go="equator"]').addEventListener('click', () => api.toEquator());
  root.querySelector('[data-go="home"]').addEventListener('click', () => api.home());
  new ResizeObserver(resize).observe(cv);
  resize();
  root.__drag = api;
  return api;
}
