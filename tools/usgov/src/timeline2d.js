/*
 * 美國政治 U.S. Government · 時間軸元件（不需要 WebGL；每課共用）。純函式在 timeline.js。
 *
 *   makeTimeline(root, { min, max, view:[a, b], value, events, presets, onChange, onPick }) → api
 *     events: [{ id, t（小數年）, en, zh, rank（1 最重要）, cls }]
 *     presets: [{ key, a, b }] 對應 root 裡的 <button data-tl-view="key">
 *   api: { state, set(t, 靜默?), setView(a, b), zoom(倍率), fit(key), pick(id), redraw() }
 *
 * build.py 輸出的骨架（class 一律 ug-tl-*）：
 *   .ug-tl > .ug-tl-bar（.ug-tl-date、[data-tl-zoom="in|out"]、[data-tl-view]）＋ .ug-tl-track（role=slider）
 * 軌道上：拖曳或點一下＝移動游標；圓點＝事件（點一下跳到那一天）；左右鍵一次移動畫面的 1/100，Shift 是 1/10。
 * 縮放只用按鈕與預設範圍——不攔滾輪，手機上軌道照常讓頁面上下捲動（touch-action: pan-y）。
 */
import { clampView, formatEn, formatZh, labeled, makeView, reveal, sortEvents, ticks, toFrac, toTime, zoomAt } from './timeline.js';

export function makeTimeline(root, opt) {
  const $ = (s) => root.querySelector(s);
  const track = $('.ug-tl-track'), dateEl = $('.ug-tl-date');
  const events = sortEvents(opt.events);
  const st = { view: makeView(opt.min, opt.max, ...(opt.view || [opt.min, opt.max])), t: opt.value, drag: false };
  const minSpan = opt.minSpan || 1.5;

  track.innerHTML = '<div class="ug-tl-line"></div><div class="ug-tl-ticks" aria-hidden="true"></div><div class="ug-tl-evs"></div>'
    + '<div class="ug-tl-cur" aria-hidden="true"><i></i></div>';
  const ticksEl = $('.ug-tl-ticks'), evsEl = $('.ug-tl-evs'), cur = $('.ug-tl-cur');
  track.tabIndex = 0;
  track.setAttribute('role', 'slider');
  track.setAttribute('aria-valuemin', String(Math.floor(opt.min)));
  track.setAttribute('aria-valuemax', String(Math.ceil(opt.max)));

  const dots = new Map();
  for (const e of events) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = `ug-tl-ev ${e.cls || ''}`; b.dataset.ev = e.id;
    b.innerHTML = `<i></i><span>${e.short_en || e.en}<small>${e.short_zh || e.zh}</small></span>`;
    b.setAttribute('aria-label', `${formatEn(e.t, e.precision)}: ${e.en} · ${formatZh(e.t, e.precision)}：${e.zh}`);
    b.addEventListener('click', (ev) => { ev.stopPropagation(); api.pick(e.id); });
    b.addEventListener('pointerdown', (ev) => ev.stopPropagation());
    evsEl.appendChild(b); dots.set(e.id, b);
  }

  function redraw() {
    const v = st.view;
    const tk = ticks(v, track.clientWidth < 520 ? 6 : 10);
    ticksEl.innerHTML = tk.list.map((x) => `<span class="${x.major ? 'is-major' : ''}" style="left:${(toFrac(v, x.t) * 100).toFixed(3)}%">${x.label}</span>`).join('');
    const show = labeled(v, events, track.clientWidth < 520 ? 0.3 : 0.17);
    for (const e of events) {
      const b = dots.get(e.id), f = toFrac(v, e.t);
      const vis = f >= -0.001 && f <= 1.001;
      b.hidden = !vis;
      if (!vis) continue;
      b.style.left = `${(f * 100).toFixed(3)}%`;
      b.classList.toggle('has-label', show.has(e.id));
      b.classList.toggle('is-past', e.t <= st.t + 1e-9);
      b.classList.toggle('flip', f > 0.8);
    }
    const f = toFrac(v, st.t);
    cur.style.left = `${(Math.min(1, Math.max(0, f)) * 100).toFixed(3)}%`;
    cur.classList.toggle('is-off', f < -0.001 || f > 1.001);
    if (dateEl) dateEl.innerHTML = `${formatEn(st.t)}<span class="zh">${formatZh(st.t)}</span>`;
    track.setAttribute('aria-valuenow', st.t.toFixed(2));
    track.setAttribute('aria-valuetext', `${formatEn(st.t)} · ${formatZh(st.t)}`);
    root.querySelectorAll('[data-tl-view]').forEach((b) => {
      const p = (opt.presets || []).find((x) => x.key === b.dataset.tlView);
      b.setAttribute('aria-pressed', String(!!p && Math.abs(p.a - v.a) < 0.01 && Math.abs(p.b - v.b) < 0.01));
    });
  }

  const api = {
    state: st, events,
    set(t, silent) {
      st.t = Math.min(opt.max, Math.max(opt.min, t));
      redraw();
      if (!silent && opt.onChange) opt.onChange(st.t);
    },
    setView(a, b) { st.view = clampView({ ...st.view, a, b }, minSpan); redraw(); },
    zoom(factor) { st.view = zoomAt(st.view, factor, Math.min(st.view.b, Math.max(st.view.a, st.t)), minSpan); redraw(); },
    fit(key) { const p = (opt.presets || []).find((x) => x.key === key); if (p) api.setView(p.a, p.b); },
    /** 跳到一個事件：游標移過去；不在畫面裡就把畫面平移過去 */
    pick(id) {
      const e = events.find((x) => x.id === id);
      if (!e) return null;
      st.view = reveal(st.view, e.t);
      api.set(e.t);
      if (opt.onPick) opt.onPick(e);
      return e;
    },
    redraw,
  };

  const at = (ev) => { const r = track.getBoundingClientRect(); return toTime(st.view, Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width))); };
  track.addEventListener('pointerdown', (ev) => {
    st.drag = true; track.setPointerCapture(ev.pointerId); track.classList.add('is-drag');
    api.set(at(ev));
  });
  track.addEventListener('pointermove', (ev) => { if (st.drag) api.set(at(ev)); });
  const end = () => { st.drag = false; track.classList.remove('is-drag'); };
  track.addEventListener('pointerup', end); track.addEventListener('pointercancel', end);
  track.addEventListener('keydown', (ev) => {
    const span = st.view.b - st.view.a, step = span / (ev.shiftKey ? 10 : 100);
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') api.set(st.t - step);
    else if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') api.set(st.t + step);
    else if (ev.key === 'Home') api.set(st.view.a);
    else if (ev.key === 'End') api.set(st.view.b);
    else if (ev.key === '+' || ev.key === '=') api.zoom(0.5);
    else if (ev.key === '-') api.zoom(2);
    else return;
    ev.preventDefault();
    st.view = reveal(st.view, st.t, 0); redraw();
  });
  root.querySelectorAll('[data-tl-zoom]').forEach((b) => b.addEventListener('click', () => api.zoom(b.dataset.tlZoom === 'in' ? 0.5 : 2)));
  root.querySelectorAll('[data-tl-view]').forEach((b) => b.addEventListener('click', () => {
    api.fit(b.dataset.tlView);
    if (st.t < st.view.a || st.t > st.view.b) api.set(Math.min(st.view.b, Math.max(st.view.a, st.t)));
  }));
  new ResizeObserver(redraw).observe(track);
  redraw();
  return api;
}
