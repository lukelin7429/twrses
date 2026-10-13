/*
 * 世界歷史 World History · 平行時間軸（每一課共用；不需要 WebGL）。
 *
 * build.py 輸出外殼：
 *   <div class="wh-tl" data-wh-timeline>
 *     <script type="application/json">{ from, to, view?: { from, to }, lesson: { from, to, en, zh }, events: [{ lane, from, to?, en, zh, note_en?, note_zh?, kind? }] }</script>
 *     …按鈕（data-scale="log|linear"、data-zoom="in|out|all|lesson"）、.wh-tl-view、.wh-tl-read
 *   </div>
 * from／to 都是「距今幾年」（timeline.js 的 ago；曆年先用 yearToAgo 換）。JSON 裡也可以寫 year（曆年，負數＝西元前），這裡會換。
 *
 * 七條線的分法在 timeline.js 的 LANES。拖曳可以平移（手機上只攔水平方向，上下照常捲動頁面），
 * 按鈕或鍵盤（← → + −）縮放；點一個事件，下面讀出它的年代與說明。
 * 除錯：root.__tl（state、setScale、zoom、fit、select）。
 */
import { LANES, laneIndex, makeScale, spanPos, ticks, zoomView, panView, clampView, packRows, formatAgoRange, formatAgo, formatYear, agoToYear, yearToAgo, describe } from './timeline.js';
import { each, esc, bi, readJson } from './common.js';

const agoOf = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
/** 一萬年以內的事用曆年說，更早的用「大約幾萬年前」。 */
function when(ev) {
  if (ev.to != null && ev.to !== ev.from) {
    if (ev.from >= 10000) return formatAgoRange(ev.from, ev.to);
    const a = formatYear(agoToYear(ev.from)), b = formatYear(agoToYear(ev.to));
    return { en: `${a.en} to ${b.en}`, zh: `${a.zh}到${b.zh}` };
  }
  return ev.from >= 10000 ? formatAgo(ev.from) : ev.exact ? formatYear(agoToYear(ev.from)) : describe(ev.from);
}

export function initTimeline(root) {
  const data = readJson(root);
  const limits = { older: data.from, nearer: data.to || 0 };
  const events = data.events.map((e, i) => ({ ...e, i, from: agoOf(e.from), to: e.to == null ? null : agoOf(e.to) }));
  const lesson = data.lesson ? { ...data.lesson, from: agoOf(data.lesson.from), to: agoOf(data.lesson.to) } : null;
  const view = root.querySelector('.wh-tl-view'), read = root.querySelector('.wh-tl-read');
  // 一開始看 JSON 的 view（這一課最值得看的那一段）；沒有就看全部。「全部」按鈕永遠是整條線。
  const first = data.view ? { older: agoOf(data.view.from), nearer: agoOf(data.view.to) } : limits;
  const state = { kind: 'log', view: clampView('log', first, limits), sel: -1 };

  view.innerHTML = `<div class="wh-tl-axis" aria-hidden="true"></div><div class="wh-tl-lanes">${LANES.map((l) =>
    `<div class="wh-tl-lane" data-lane="${l.key}"><p class="wh-tl-name">${bi(l.en, l.zh)}</p><div class="wh-tl-track"></div></div>`).join('')}</div>`
    + '<div class="wh-tl-over" aria-hidden="true"><div class="wh-tl-grid"></div><div class="wh-tl-lesson"><span></span></div></div>';
  const axis = view.querySelector('.wh-tl-axis'), grid = view.querySelector('.wh-tl-grid'), band = view.querySelector('.wh-tl-lesson');
  const tracks = LANES.map((l) => view.querySelector(`[data-lane="${l.key}"] .wh-tl-track`));
  if (lesson) band.firstChild.innerHTML = bi(lesson.en, lesson.zh);

  function draw() {
    const sc = makeScale(state.kind, state.view.older, state.view.nearer);
    const pct = (p) => `${(p * 100).toFixed(3)}%`;
    const narrow = view.clientWidth < 560, tk = ticks(sc, narrow ? (state.kind === 'linear' ? 2 : 4) : 7);
    axis.innerHTML = tk.map((t) => `<span class="wh-tl-tick${t.major ? '' : ' is-minor'}" style="left:${pct(sc.pos(t.ago))}"><b>${esc(t.en)}</b><i>${esc(t.zh)}</i></span>`).join('')
      + `<span class="wh-tl-unit">${tk[0] && tk[0].unit === 'year' ? bi('calendar years', '曆年') : bi('years ago', '年前')}</span>`;
    grid.innerHTML = tk.map((t) => `<i style="left:${pct(sc.pos(t.ago))}"${t.major ? '' : ' class="is-minor"'}></i>`).join('');
    const ls = lesson && spanPos(sc, lesson.from, lesson.to);
    band.hidden = !ls;
    if (ls) { band.style.left = pct(ls.from); band.style.width = pct(Math.max(0.004, ls.to - ls.from)); }
    const trackW = Math.max(120, tracks[0].clientWidth);
    LANES.forEach((l, li) => {
      const mine = events.filter((e) => laneIndex(e.lane) === li).map((e) => {
        const s = e.to == null ? spanPos(sc, e.from, e.from) : spanPos(sc, e.from, e.to);
        return s && { e, s };
      }).filter(Boolean).sort((a, b) => a.s.from - b.s.from);
      // （排列用的框要照左端排序，翻到左邊的標籤會讓左端變小）
      // 標籤寫在長條右邊；估計它的寬度（中文字算 1 個字寬、英文字母算半個），排進不重疊的列
      const boxes = mine.map(({ e, s }) => {
        const chars = [...e.en].length * 0.56 + 1.5;
        const lab = (chars * 11.5 + 16) / trackW, end = Math.max(s.to, s.from);
        return end + lab > 1.0 && s.from > 0.45 ? { from: s.from - lab, to: end + 0.01, flip: true } : { from: s.from, to: end + lab };
      });
      const order = boxes.map((_, k) => k).sort((a, b) => boxes[a].from - boxes[b].from);
      const packed = packRows(order.map((k) => boxes[k]), 0.012), rows = [];
      order.forEach((k, n) => { rows[k] = packed[n]; });
      const nRows = rows.length ? Math.max(...rows) + 1 : 1;
      tracks[li].style.setProperty('--rows', nRows);
      tracks[li].innerHTML = mine.map(({ e, s }, k) => {
        const point = e.to == null || s.to - s.from < 0.004;
        const flip = !!boxes[k].flip;                          // 靠右邊放不下：標籤改寫在長條左邊，整個按鈕靠右端定位
        const place = flip ? `right:${pct(1 - (point ? s.from : s.to))}` : `left:${pct(s.from)}`;
        return `<button type="button" class="wh-ev${point ? ' is-point' : ''}${e.kind ? ` is-${e.kind}` : ''}${flip ? ' is-flip' : ''}${state.sel === e.i ? ' is-on' : ''}" data-ev="${e.i}"`
          + ` style="${place};--w:${point ? 12 : Math.max(10, Math.round((s.to - s.from) * trackW))}px;--row:${rows[k]}" aria-pressed="${state.sel === e.i}">`
          + `<span class="wh-ev-bar"></span><span class="wh-ev-t">${bi(e.en, e.zh)}</span></button>`;
      }).join('');
    });
    root.querySelectorAll('[data-scale]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.scale === state.kind));
  }
  function say(i) {
    state.sel = i;
    const e = events[i];
    if (!e) { read.innerHTML = read.dataset.idle || ''; return; }
    const w = when(e), lane = LANES[laneIndex(e.lane)];
    read.innerHTML = `<b>${esc(e.en)}<span class="zh">${esc(e.zh)}</span></b>`
      + `<span class="wh-tl-when">${esc(lane.en)} · ${esc(w.en)}<span class="zh">${esc(lane.zh)}・${esc(w.zh)}</span></span>`
      + (e.note_en ? `<span class="wh-tl-note">${bi(e.note_en, e.note_zh)}</span>` : '');
  }
  read.dataset.idle = read.innerHTML;

  const api = {
    state, events,
    setScale(kind) { state.kind = kind; state.view = clampView(kind, kind === 'linear' ? { older: limits.older, nearer: limits.nearer } : state.view, limits); draw(); },
    zoom(f, anchor = 0.5) { state.view = zoomView(state.kind, state.view, f, anchor, limits); draw(); },
    pan(d) { state.view = panView(state.kind, state.view, d, limits); draw(); },
    fit(older, nearer) { state.view = clampView(state.kind, { older, nearer }, limits); draw(); },
    all() { state.view = clampView(state.kind, limits, limits); draw(); },
    select(i) { say(i); draw(); },
    draw,
  };

  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b || !root.contains(b)) return;
    if (b.dataset.scale) api.setScale(b.dataset.scale);
    else if (b.dataset.zoom === 'in') api.zoom(1.8);
    else if (b.dataset.zoom === 'out') api.zoom(1 / 1.8);
    else if (b.dataset.zoom === 'all') api.all();
    else if (b.dataset.zoom === 'recent') { if (state.kind !== 'linear') state.kind = 'linear'; api.fit(Number(b.dataset.older) || 6000, 0); }
    else if (b.dataset.ev) api.select(state.sel === Number(b.dataset.ev) ? -1 : Number(b.dataset.ev));
  });
  view.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft') api.pan(-0.15);
    else if (ev.key === 'ArrowRight') api.pan(0.15);
    else if (ev.key === '+' || ev.key === '=') api.zoom(1.5);
    else if (ev.key === '-') api.zoom(1 / 1.5);
    else return;
    ev.preventDefault();
  });
  // 拖曳平移：位移超過 6px 才算拖（否則是點事件）
  let drag = null;
  view.addEventListener('pointerdown', (ev) => { if (ev.button === 0) drag = { x: ev.clientX, moved: false, id: ev.pointerId }; });
  view.addEventListener('pointermove', (ev) => {
    if (!drag || ev.pointerId !== drag.id) return;
    const dx = ev.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 6) return;
    if (!drag.moved) { drag.moved = true; view.setPointerCapture(ev.pointerId); view.classList.add('is-drag'); }
    api.pan(-dx / Math.max(120, tracks[0].clientWidth));
    drag.x = ev.clientX;
  });
  const end = (ev) => {
    if (!drag) return;
    if (drag.moved) {                                        // 拖完放開的那一下不算「點事件」
      view.classList.remove('is-drag');
      const eat = (e) => { e.stopPropagation(); e.preventDefault(); };
      view.addEventListener('click', eat, { capture: true, once: true });
      setTimeout(() => view.removeEventListener('click', eat, { capture: true }), 60);
      try { view.releasePointerCapture(ev.pointerId); } catch (e) { /* 沒有 capture 就算了 */ }
    }
    drag = null;
  };
  view.addEventListener('pointerup', end); view.addEventListener('pointercancel', end);
  view.addEventListener('wheel', (ev) => {
    if (!ev.ctrlKey && !ev.metaKey && Math.abs(ev.deltaX) <= Math.abs(ev.deltaY)) return;   // 一般的上下捲動留給頁面
    ev.preventDefault();
    if (ev.ctrlKey || ev.metaKey) {
      const r = tracks[0].getBoundingClientRect();
      api.zoom(ev.deltaY < 0 ? 1.15 : 1 / 1.15, Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)));
    } else api.pan(ev.deltaX / 600);
  }, { passive: false });
  new ResizeObserver(draw).observe(view);
  draw();
  root.__tl = api;
  return api;
}

each('[data-wh-timeline]', initTimeline);
