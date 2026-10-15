/*
 * 台灣歷史 Taiwan's Story · 可以縮放的時間軸（全系列共用；不需要 WebGL）。
 *
 *   mountTimeline(el, cfg) → api
 *   initTimelines()        把頁面上每一個 [data-twh-timeline] 掛起來（設定寫在裡面的 <script type="application/json">）
 *
 * cfg＝{
 *   older      最古老畫到距今幾年（例如 50000）
 *   kind       'log'（預設）或 'linear'
 *   vertical   true＝直的（現在在上、越下面越古老，和探坑的深度同一個方向）
 *   spans[]    時代色帶 { fromAgo|fromYear, toAgo|toYear, cls, en, zh }
 *   focus      「這一課講的是這裡」{ fromAgo|fromYear, toAgo|toYear, en, zh }
 *   events[]   事件點 { ago|year, approx, en, zh, src }
 *   controls   false＝不畫縮放按鈕（探坑旁邊那一條）
 *   nearest    對數尺度最靠近現在畫到距今幾年（預設 1；全系列的時間軸用 10，免得最近十年佔掉一大段）
 * }
 * 年代一律可以寫「距今幾年」（ago）或曆年（year，負數＝西元前）；換算在 timeline.js。
 * 位置用 CSS 變數 --p（0＝最古老、1＝現在）交給樣式表排，所以橫的、直的是同一份 DOM。
 *
 * api：setSpans(spans)、setKind(k)、setView({ older, nearer })、reset()、zoom(倍數, 錨點)、fit(fromAgo, toAgo)、
 *      setCursor(ago | null, { en, zh })、setBand(fromAgo, toAgo)、select(i)、state()
 */
import {
  FLOOR, agoToYear, fitView, formatAgoEn, formatAgoZh, formatYearEn, formatYearZh, makeScale, panView, spanPos, ticks, yearToAgo, zoomView,
} from './timeline.js';

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function resolveAgo(o, key, now) {
  const A = `${key}Ago`, Y = `${key}Year`;
  if (key === '') return o.ago !== undefined ? o.ago : yearToAgo(o.year, now);
  return o[A] !== undefined ? o[A] : yearToAgo(o[Y], now);
}

/** 一個年代的雙語說法：四百年以內說曆年，更早說「約幾年前」。 */
export function whenText(ago, now, approx) {
  if (ago <= 0) return { en: 'today', zh: '現在' };
  if (ago <= 2200 && !approx) { const y = agoToYear(ago, now); return { en: formatYearEn(y), zh: formatYearZh(y) }; }
  return { en: formatAgoEn(ago), zh: formatAgoZh(ago) };
}

export function mountTimeline(root, cfg) {
  const now = cfg.now || new Date().getFullYear();
  const limits = (kind) => ({ older: cfg.older, nearer: kind === 'log' ? (cfg.nearest || FLOOR) : (cfg.nearestLinear || 0) });   // nearestLinear：只看一小段年代的直線時間軸（第四課）
  const state = { kind: cfg.kind || 'log', view: null, cursor: null, band: null, sel: -1 };
  state.view = { ...limits(state.kind) };
  root.classList.add('twh-tl');
  root.classList.toggle('twh-tl-v', !!cfg.vertical);
  root.textContent = '';

  const track = el('div', 'twh-tl-track');
  track.setAttribute('role', 'img');
  const layer = { spans: el('div', 'twh-tl-l'), ticks: el('div', 'twh-tl-l'), marks: el('div', 'twh-tl-l') };
  track.append(layer.spans, layer.ticks, layer.marks);
  const ends = el('p', 'twh-tl-ends');
  const msg = el('p', 'twh-tl-msg'); msg.setAttribute('aria-live', 'polite');
  root.append(track, ends);

  let ctl = null;
  if (cfg.controls !== false) {
    ctl = el('div', 'twh-tl-ctl');
    ctl.innerHTML =
      '<div class="twh-seg" role="group" aria-label="Scale · 尺度">'
      + '<button type="button" data-kind="log">Each step is ten times older<small>每一格往回十倍</small></button>'
      + '<button type="button" data-kind="linear">Every year the same width<small>每一年一樣寬</small></button></div>'
      + '<div class="twh-tl-zoom"><button type="button" class="twh-btn" data-z="out" aria-label="Zoom out · 縮小">&minus;</button>'
      + '<button type="button" class="twh-btn" data-z="in" aria-label="Zoom in · 放大">+</button>'
      + '<button type="button" class="twh-btn" data-z="reset">Whole line · 看全部</button></div>';
    root.append(ctl);
  }
  root.append(msg);
  let list = null;
  const events = (cfg.events || []).map((e) => ({ ...e, _ago: resolveAgo(e, '', now) })).sort((a, b) => b._ago - a._ago);
  if (events.length && cfg.list !== false) {
    list = el('ol', 'twh-tl-list');
    events.forEach((e, i) => {
      const w = whenText(e._ago, now, e.approx);
      const li = el('li');
      const b = el('button', 'twh-tl-li', `<i>${i + 1}</i><span><b>${esc(w.en)}</b> ${esc(e.en)}<span class="zh"><b>${esc(w.zh)}</b>　${esc(e.zh)}</span></span>`);
      b.type = 'button';
      b.addEventListener('click', () => api.select(i, true));
      li.append(b); list.append(li);
    });
    root.append(list);
  }

  const P = (node, p) => node.style.setProperty('--p', p.toFixed(5));
  function draw() {
    const s = makeScale(state.kind, state.view.older, state.view.nearer);
    layer.spans.textContent = ''; layer.ticks.textContent = ''; layer.marks.textContent = '';
    (cfg.spans || []).forEach((sp) => {
      const r = spanPos(s, resolveAgo(sp, 'from', now), resolveAgo(sp, 'to', now));
      if (!r || r.to - r.from < 0.002) return;
      const d = el('span', `twh-tl-span twh-tl-${sp.cls || 'era'}`, `<span>${esc(sp.en)}<span class="zh">${esc(sp.zh)}</span></span>`);
      d.style.setProperty('--a', r.from.toFixed(5)); d.style.setProperty('--b', r.to.toFixed(5));
      d.classList.toggle('is-thin', r.to - r.from < (cfg.vertical ? 0.1 : 0.16));
      layer.spans.append(d);
    });
    if (cfg.focus) {
      const r = spanPos(s, resolveAgo(cfg.focus, 'from', now), resolveAgo(cfg.focus, 'to', now));
      if (r) {
        const d = el('span', 'twh-tl-focus', `<span>${esc(cfg.focus.en)}<span class="zh">${esc(cfg.focus.zh)}</span></span>`);
        d.style.setProperty('--a', r.from.toFixed(5)); d.style.setProperty('--b', r.to.toFixed(5));
        layer.spans.append(d);
      }
    }
    if (state.band) {
      const r = spanPos(s, state.band.from, state.band.to);
      if (r) {
        const d = el('span', 'twh-tl-band');
        d.style.setProperty('--a', r.from.toFixed(5)); d.style.setProperty('--b', r.to.toFixed(5));
        layer.spans.append(d);
      }
    }
    ticks(s, now, cfg.vertical ? 5 : 6).forEach((t) => {
      const d = el('span', `twh-tl-tick${t.major ? ' is-major' : ''}`, t.label ? `<span>${esc(t.label.en)}${t.label.zh !== t.label.en ? `<span class="zh">${esc(t.label.zh)}</span>` : ''}</span>` : '');
      const tp = s.pos(t.ago);
      d.classList.toggle('is-end', tp > 0.965); d.classList.toggle('is-start', tp < 0.035);
      P(d, tp); layer.ticks.append(d);
    });
    events.forEach((e, i) => {
      if (!s.contains(e._ago)) return;
      const b = el('button', `twh-tl-ev${i === state.sel ? ' is-on' : ''}`, String(i + 1));
      b.type = 'button';
      const w = whenText(e._ago, now, e.approx);
      b.setAttribute('aria-label', `${w.en}: ${e.en} · ${w.zh}：${e.zh}`);
      b.addEventListener('click', (ev) => { ev.stopPropagation(); api.select(i); });
      P(b, s.pos(e._ago)); layer.marks.append(b);
    });
    if (state.cursor && s.contains(state.cursor.ago)) {
      const c = el('span', 'twh-tl-cur', `<span>${esc(state.cursor.en)}<span class="zh">${esc(state.cursor.zh)}</span></span>`);
      const p = s.pos(state.cursor.ago);
      P(c, p); c.classList.toggle('is-flip', p > 0.72); layer.marks.append(c);
    }
    const a = whenText(s.older, now, true), b = whenText(s.nearer <= limits(state.kind).nearer + 1e-9 ? 0 : s.nearer, now, s.nearer > 2200);
    const unit = (state.kind === 'log' || s.older - s.nearer > 3000) ? ['Numbers on the line: years ago', '線上的數字：距今幾年'] : ['Numbers on the line: calendar years', '線上的數字：西元年'];
    ends.innerHTML = `<span>&larr; ${esc(a.en)}<span class="zh">${esc(a.zh)}</span></span><span class="twh-tl-unit">${unit[0]}<span class="zh">${unit[1]}</span></span><span>${esc(b.en)} &rarr;<span class="zh">${esc(b.zh)}</span></span>`;
    track.setAttribute('aria-label', `Timeline from ${a.en} to ${b.en} · 時間軸：從${a.zh}到${b.zh}`);
    if (ctl) {
      ctl.querySelectorAll('[data-kind]').forEach((x) => x.setAttribute('aria-pressed', String(x.getAttribute('data-kind') === state.kind)));
      const L = limits(state.kind);
      const full = makeScale(state.kind, L.older, L.nearer);
      const whole = Math.abs(full.pos(s.older)) < 1e-6 && Math.abs(full.pos(s.nearer) - 1) < 1e-6;
      ctl.querySelector('[data-z="out"]').disabled = whole;
      ctl.querySelector('[data-z="reset"]').disabled = whole;
    }
    root.setAttribute('data-kind', state.kind);
  }

  const api = {
    setKind(k) {
      if (k === state.kind) return;
      state.kind = k; state.view = { ...limits(k) }; draw();
      if (cfg.kindNote && cfg.kindNote[k]) msg.innerHTML = `${esc(cfg.kindNote[k].en)}<span class="zh">${esc(cfg.kindNote[k].zh)}</span>`;
    },
    setView(v) { state.view = { older: v.older, nearer: Math.max(v.nearer, limits(state.kind).nearer) }; draw(); },
    reset() { state.view = { ...limits(state.kind) }; draw(); },
    zoom(f, anchor = 0.5) { state.view = zoomView(state.kind, state.view, f, anchor, limits(state.kind)); draw(); },
    fit(a, b) { state.view = fitView(state.kind, a, b, limits(state.kind)); draw(); },
    setSpans(spans) { cfg.spans = spans || []; draw(); },
    setCursor(ago, text) { state.cursor = ago === null ? null : { ago, ...(text || whenText(ago, now, true)) }; draw(); },
    setBand(a, b) { state.band = a === null ? null : { from: a, to: b }; draw(); },
    select(i, reveal) {
      state.sel = i;
      const e = events[i];
      if (e) {
        if (reveal && !makeScale(state.kind, state.view.older, state.view.nearer).contains(e._ago)) state.view = { ...limits(state.kind) };
        const w = whenText(e._ago, now, e.approx);
        msg.innerHTML = `<b>${esc(w.en)}</b> — ${esc(e.en)}<span class="zh"><b>${esc(w.zh)}</b>　${esc(e.zh)}</span>${e.src ? `<small>${esc(e.src)}</small>` : ''}`;
      }
      if (list) list.querySelectorAll('.twh-tl-li').forEach((b, k) => b.classList.toggle('is-on', k === i));
      draw();
    },
    state: () => ({ kind: state.kind, view: { ...state.view }, cursor: state.cursor && state.cursor.ago, band: state.band && { ...state.band }, sel: state.sel, now }),
    /** 除錯與驗證：某個年代現在畫在哪裡（0–1） */
    posOf: (ago) => makeScale(state.kind, state.view.older, state.view.nearer).pos(ago),
    events: () => events.map((e) => e._ago),
  };

  if (ctl) {
    ctl.addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-kind')) api.setKind(b.getAttribute('data-kind'));
      const z = b.getAttribute('data-z');
      if (z === 'in') api.zoom(2, cfg.zoomAnchor === undefined ? 1 : cfg.zoomAnchor);
      if (z === 'out') api.zoom(0.5, cfg.zoomAnchor === undefined ? 1 : cfg.zoomAnchor);
      if (z === 'reset') api.reset();
    });
    // 拖曳平移（橫的：左右拖；直的時間軸不給拖，免得擋住頁面捲動）
    let drag = null;
    track.addEventListener('pointerdown', (ev) => { if (cfg.vertical || ev.target.closest('button')) return; drag = { x: ev.clientX, view: { ...state.view }, moved: false }; });
    window.addEventListener('pointermove', (ev) => {
      if (!drag) return;
      const dx = ev.clientX - drag.x;
      if (Math.abs(dx) < 6 && !drag.moved) return;
      drag.moved = true; track.classList.add('is-drag');
      state.view = panView(state.kind, drag.view, dx / track.clientWidth, limits(state.kind)); draw();
    });
    const end = () => { drag = null; track.classList.remove('is-drag'); };
    window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end);
  }
  draw();
  root.__tl = api;
  return api;
}

export function initTimelines() {
  document.querySelectorAll('[data-twh-timeline]').forEach((root) => {
    if (root.__tl) return;
    const src = root.querySelector('script[type="application/json"]');
    if (!src) return;
    mountTimeline(root, JSON.parse(src.textContent));
  });
}
