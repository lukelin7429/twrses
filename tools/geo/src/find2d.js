/*
 * 地理 Geography ·「找出這個地方」（不需要 WebGL）：給一組經緯度，在地圖上點出來。
 * 地圖是等距圓柱投影（經度直接當左右、緯度直接當上下），格線每 30 度一條並標度數；只畫陸地與海洋。
 * 八題、不計時，可以一直點到找到（離目標 9 度以內）；沒找到會說該往哪邊移。只記第一次就找到的題數（find.js）。
 * 題目寫在 data/geography.json 的 find.questions，build.py 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-gg-find]').__find（game.state、click(lon, lat)、next()、reset()、toXY(lon, lat)）
 */
import { makeFindGame } from './find.js';
import { formatPlace, smallCircle } from './geo.js';
import { COLORS, drawLand } from './map2d.js';

const ZH = { north: '北', south: '南', east: '東', west: '西' };

export function initFind(root, land) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFindGame(data.questions, data.tol || 9);
  const cv = $('.gg-fd-cv'), ctx = cv.getContext('2d');
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps');
  const coord = $('.gg-fd-coord'), sayEn = $('.gg-fd-say-en'), sayZh = $('.gg-fd-say-zh');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  let W = 0, H = 0, dpr = 1, ml = 40, mb = 20, mw = 0, mh = 0, base = null;
  let clicks = [], found = false, finished = false;
  const toXY = (lon, lat) => [ml + (lon + 180) / 360 * mw, (90 - lat) / 180 * mh];
  const toLL = (x, y) => [Math.max(-180, Math.min(180, (x - ml) / mw * 360 - 180)), Math.max(-90, Math.min(90, 90 - y / mh * 180))];

  function resize() {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ml = W < 480 ? 30 : 42; mb = 20; mw = W - ml; mh = H - mb;
    base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
    const b = base.getContext('2d');
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    b.fillStyle = '#0c1428'; b.fillRect(0, 0, W, H);
    b.fillStyle = COLORS.sea; b.fillRect(ml, 0, mw, mh);
    b.save(); b.beginPath(); b.rect(ml, 0, mw, mh); b.clip();
    drawLand(b, land, toXY, { fill: '#7f9f78' });
    b.restore();
    b.font = `700 ${W < 480 ? 9 : 11}px system-ui, sans-serif`;
    for (let lon = -180; lon <= 180; lon += 30) {
      const [x] = toXY(lon, 0);
      b.strokeStyle = lon === 0 ? 'rgba(255,143,216,.95)' : 'rgba(255,255,255,.2)'; b.lineWidth = lon === 0 ? 1.6 : 1;
      b.beginPath(); b.moveTo(x, 0); b.lineTo(x, mh); b.stroke();
      if (W < 480 && lon % 60 !== 0) continue;
      const t = lon === 0 ? '0°' : Math.abs(lon) === 180 ? '180°' : `${Math.abs(lon)}°${lon > 0 ? 'E' : 'W'}`;
      b.fillStyle = lon === 0 ? '#ffb3e4' : '#9fb0cf'; b.textAlign = lon === -180 ? 'left' : lon === 180 ? 'right' : 'center';
      b.fillText(t, x, H - 5);
    }
    for (let lat = -90; lat <= 90; lat += 30) {
      const [, y] = toXY(0, lat);
      b.strokeStyle = lat === 0 ? 'rgba(255,157,107,.95)' : 'rgba(255,255,255,.2)'; b.lineWidth = lat === 0 ? 1.6 : 1;
      b.beginPath(); b.moveTo(ml, y); b.lineTo(W, y); b.stroke();
      const t = lat === 0 ? '0°' : `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`;
      b.fillStyle = lat === 0 ? '#ffc9a8' : '#9fb0cf'; b.textAlign = 'right';
      b.fillText(t, ml - 5, Math.min(mh - 2, Math.max(9, y + 4)));
    }
    draw();
  }
  function draw() {
    if (!base) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(base, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.save(); ctx.beginPath(); ctx.rect(ml, 0, mw, mh); ctx.clip();
    const q = game.question();
    if (found && !finished) {
      ctx.beginPath();
      smallCircle(q.lon, q.lat, game.tol, 72).forEach(([a, b], i) => { const [x, y] = toXY(Math.max(-180, Math.min(180, a)), b); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.closePath(); ctx.fillStyle = 'rgba(255,211,110,.22)'; ctx.fill(); ctx.strokeStyle = '#ffd36e'; ctx.lineWidth = 1.5; ctx.stroke();
      const [tx, ty] = toXY(q.lon, q.lat);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,211,110,.8)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ml, ty); ctx.lineTo(W, ty); ctx.moveTo(tx, 0); ctx.lineTo(tx, mh); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI * 2); ctx.fillStyle = '#ffd36e'; ctx.fill(); ctx.strokeStyle = '#1b1405'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    clicks.forEach((c, i) => {
      const [x, y] = toXY(c.lon, c.lat), last = i === clicks.length - 1;
      ctx.strokeStyle = c.ok ? '#7ee0aa' : last ? '#ffb4a2' : 'rgba(255,180,162,.5)'; ctx.lineWidth = 2;
      if (c.ok) { ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(x - 5, y - 5); ctx.lineTo(x + 5, y + 5); ctx.moveTo(x + 5, y - 5); ctx.lineTo(x - 5, y + 5); ctx.stroke(); }
    });
    ctx.restore();
  }
  function show() {
    const st = game.state, q = game.question();
    finished = false; found = false; clicks = [];
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    coord.textContent = formatPlace(q.lon, q.lat);
    sayEn.textContent = q.en; sayZh.textContent = q.zh;
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((s, i) => { s.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
    cv.classList.remove('is-done');
    draw();
  }
  function click(lon, lat) {
    const q = game.question();
    const r = game.answer(lon, lat);
    if (!r) return null;
    clicks.push({ lon, lat, ok: r.correct });
    if (r.correct) {
      found = true;
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Found on the first try. · 第一次就找到。' : 'Found it. · 找到了。'}</b> ${q.where_en}<span class="zh">${q.where_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next place · 下一個地方';
      next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
      cv.classList.add('is-done');
    } else {
      const en = [r.ns, r.ew].filter(Boolean), zh = en.map((k) => `往${ZH[k]}`);
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not there yet: you clicked ${formatPlace(lon, lat)}. · 還沒到：你點的是 ${formatPlace(lon, lat)}。</b> ${en.length ? `Go farther ${en.join(' and ')}.` : 'You are very close. Look at the grid lines again.'}<span class="zh">${zh.length ? `再${zh.join('、')}一點。` : '很接近了，再對一下格線。'}</span>`;
    }
    draw();
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    finished = true; found = false; clicks = [];
    const n = game.state.first;
    coord.textContent = `${n} / ${game.total}`;
    sayEn.textContent = `You found ${n} of ${game.total} places on the first try.`;
    sayZh.textContent = `${game.total} 個地方裡，你有 ${n} 個第一次就找到。`;
    kEl.textContent = 'Finished · 完成';
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
    draw();
  }
  cv.addEventListener('click', (e) => {
    if (finished || found) return;
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * (W / r.width), y = (e.clientY - r.top) * (H / r.height);
    if (x < ml || y > mh) return;
    const [lon, lat] = toLL(x, y);
    click(Math.round(lon * 10) / 10, Math.round(lat * 10) / 10);
  });
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(resize).observe(cv);
  resize(); show();
  root.__find = { game, click, next: goNext, reset() { game.reset(); show(); }, toXY };
  return root.__find;
}
