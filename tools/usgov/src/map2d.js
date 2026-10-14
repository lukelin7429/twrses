/*
 * 美國政治 U.S. Government · 五十州地圖的 2D 版（SVG，不需要 WebGL；每課共用）。
 *
 *   makeMap2D(svg, { population, onPick }) → { setValues(values, fmt, title?), setMode('map'|'tiles'), select(abbr), info() }
 *     map：Albers USA 的州界（usmap.js）；tiles：每州一格的方塊地圖，方塊面積和人口成正比（population 給的話）。
 *     兩種模式之間用 CSS 漸變切換（.ug-m2-tiles）。沒有數值的州畫成灰色斜線。
 * 顏色用 usmap.js 的色階（不用紅藍）；每個州有 <title> 給螢幕閱讀器與滑鼠提示。
 */
import { colorAt, extent, formatValue, getStates, norm, popSide, ringPath, TILES, W, H, ZH } from './usmap.js';

const NS = 'http://www.w3.org/2000/svg';
const CELL = 76, OX = (W - 12 * CELL) / 2, OY = 2;
const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); if (parent) parent.appendChild(e); return e; };

export function makeMap2D(svg, opt = {}) {
  const states = getStates();
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.classList.add('ug-m2');
  const defs = el('defs', {}, svg);
  const pat = el('pattern', { id: `ug-hatch-${Math.random().toString(36).slice(2, 7)}`, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
  el('rect', { width: 6, height: 6, fill: '#3a4660' }, pat); el('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: '#5b6886', 'stroke-width': 2 }, pat);
  const hatch = `url(#${pat.id})`;
  const gMap = el('g', { class: 'ug-m2-map' }, svg), gTile = el('g', { class: 'ug-m2-tile' }, svg), gLab = el('g', { class: 'ug-m2-lab', 'aria-hidden': 'true' }, svg);
  const pops = opt.population || null;
  const maxPop = pops ? Math.max(...Object.values(pops)) : 1;
  const items = new Map();
  for (const s of states) {
    const g = el('g', { class: 'ug-m2-st', 'data-st': s.abbr, tabindex: '0', role: 'button' }, gMap);
    const path = el('path', { d: s.rings.map(ringPath).join('') }, g);
    const title = el('title', {}, g);
    const [c, r] = TILES[s.abbr];
    const side = pops && pops[s.abbr] ? popSide(pops[s.abbr], maxPop, CELL) : CELL * 0.86;
    const tx = OX + c * CELL + CELL / 2, ty = OY + r * CELL + CELL / 2;
    const tg = el('g', { class: 'ug-m2-st', 'data-st': s.abbr, transform: `translate(${tx} ${ty})` }, gTile);
    const rect = el('rect', { x: -side / 2, y: -side / 2, width: side, height: side, rx: Math.min(6, side / 6) }, tg);
    el('title', {}, tg);
    const [bx0, by0, bx1, by1] = s.bbox;
    const small = Math.min(bx1 - bx0, by1 - by0) < 16;
    const lm = el('text', { x: s.center[0], y: s.center[1] + 4, class: `ug-m2-lm${small ? ' is-small' : ''}` }, gLab); lm.textContent = s.abbr;
    const lt = el('text', { x: tx, y: ty - CELL / 2 + 12, class: 'ug-m2-lt' }, gLab); lt.textContent = s.abbr;
    items.set(s.abbr, { s, g, tg, path, rect, title, lm });
    const pick = () => { api.select(s.abbr); if (opt.onPick) opt.onPick(s.abbr); };
    for (const x of [g, tg]) {
      x.addEventListener('click', pick);
      x.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    }
  }
  let current = { values: {}, fmt: 'raw' }, sel = null;
  const api = {
    states,
    setValues(values, fmt, colorFn) {
      current = { values, fmt };
      const [lo, hi] = extent(values);
      for (const [ab, it] of items) {
        const v = values[ab];
        const fill = v == null ? hatch : colorFn ? colorFn(v, ab) : colorAt(norm(v, lo, hi));
        it.path.setAttribute('fill', fill); it.rect.setAttribute('fill', fill);
        const t = `${it.s.name} · ${ZH[ab] || ''}: ${formatValue(v, fmt)}`;
        it.g.querySelector('title').textContent = t; it.tg.querySelector('title').textContent = t;
        it.g.setAttribute('aria-label', t);
      }
      return [lo, hi];
    },
    setMode(m) { svg.classList.toggle('ug-m2-tiles', m === 'tiles'); },
    select(ab) {
      sel = ab;
      for (const [k, it] of items) { const on = k === ab; it.g.classList.toggle('is-sel', on); it.tg.classList.toggle('is-sel', on); }
      // 選到的州畫在最上面，外框才不會被鄰州蓋住
      const it = items.get(ab); if (it) { it.g.parentNode.appendChild(it.g); it.tg.parentNode.appendChild(it.tg); }
    },
    info() { return { sel, mode: svg.classList.contains('ug-m2-tiles') ? 'tiles' : 'map', n: items.size }; },
  };
  return api;
}
