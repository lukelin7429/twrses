/*
 * 美國政治 U.S. Government · 「自己畫選區」（第七課；不需要 WebGL）。
 * 同一張虛構的 8×8 格子地圖（districts.js）。選一個選區號碼，再點（或拖過）格子，把它們畫進那一區。
 * 規則：每區剛好 8 格（人口相等）、格子要上下左右相連。程式即時檢查，並算出每一區誰贏、兩群各贏幾區。
 * 可以從三種預設畫法開始改，也可以全部清空重畫。
 *
 * 除錯：document.querySelector('[data-ug-draw]').__draw（paint(i, d)、load(key)、clear()、info()）
 */
import { check, edges, presets, seats, tally } from './districts.js';

const NS = 'http://www.w3.org/2000/svg';
export function initDraw(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const n = data.n, k = data.k, V = data.voters.split(''), P = presets(n, k);
  let plan = P.cols.slice(), cur = 0, down = false;
  const svg = $('svg.ug-dw-map'), S = 40;
  svg.setAttribute('viewBox', `0 0 ${n * S} ${n * S}`);
  const defs = document.createElementNS(NS, 'defs');
  defs.innerHTML = '<pattern id="ug-dw-stripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="8" fill="rgba(0,0,0,.22)"/></pattern>';
  svg.appendChild(defs);
  const cells = [], nums = [];
  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n), c = i % n;
    const rect = document.createElementNS(NS, 'rect');
    Object.entries({ x: c * S + 1, y: r * S + 1, width: S - 2, height: S - 2, rx: 4, class: `ug-dw-c is-${V[i]}`, 'data-i': i }).forEach(([a, v]) => rect.setAttribute(a, v));
    svg.appendChild(rect); cells.push(rect);
    if (V[i] === 'o') { const st = document.createElementNS(NS, 'rect'); Object.entries({ x: c * S + 1, y: r * S + 1, width: S - 2, height: S - 2, rx: 4, fill: 'url(#ug-dw-stripe)', 'pointer-events': 'none' }).forEach(([a2, v]) => st.setAttribute(a2, v)); svg.appendChild(st); }
    const t = document.createElementNS(NS, 'text');
    Object.entries({ x: c * S + S / 2, y: r * S + S / 2 + 5, 'text-anchor': 'middle', class: 'ug-dw-n' }).forEach(([a, v]) => t.setAttribute(a, v));
    svg.appendChild(t); nums.push(t);
  }
  const lines = document.createElementNS(NS, 'g'); lines.setAttribute('class', 'ug-dw-lines'); svg.appendChild(lines);
  const pal = $('.ug-dw-pal');
  pal.innerHTML = Array.from({ length: k }, (_, d) => `<button type="button" data-d="${d}" aria-pressed="${d === 0}">${d + 1}</button>`).join('') + `<button type="button" data-d="-1" aria-pressed="false" class="ug-dw-erase">Erase · 擦掉</button>`;

  function render() {
    plan.forEach((d, i) => { nums[i].textContent = d >= 0 ? String(d + 1) : ''; cells[i].classList.toggle('is-empty', d < 0); });
    lines.innerHTML = edges(plan, n).map((e) => e.side === 'e'
      ? `<line x1="${(e.c + 1) * S}" y1="${e.r * S}" x2="${(e.c + 1) * S}" y2="${(e.r + 1) * S}"/>`
      : `<line x1="${e.c * S}" y1="${(e.r + 1) * S}" x2="${(e.c + 1) * S}" y2="${(e.r + 1) * S}"/>`).join('')
      + `<rect x="0" y="0" width="${n * S}" height="${n * S}" fill="none"/>`;
    const ck = check(plan, n, k), t = tally(V, plan, k), s = seats(V, plan, k);
    $('.ug-dw-rows').innerHTML = t.map((d, i) => {
      const ok = ck.sizes[i] === ck.size && ck.connected[i];
      const win = d.win === 'g' ? 'Green · 綠' : d.win === 'o' ? 'Orange · 橘' : d.win === 'tie' ? 'Tie · 平手' : '—';
      const why = ck.sizes[i] !== ck.size ? `${ck.sizes[i]} of ${ck.size} squares · ${ck.sizes[i]}／${ck.size} 格` : !ck.connected[i] ? 'Not connected · 沒有相連' : `${d.g}–${d.o}`;
      return `<li class="${ok ? 'is-ok' : 'is-bad'} is-${d.win || 'none'}"><b>${i + 1}</b><span>${why}</span><em>${win}</em></li>`;
    }).join('');
    const msg = $('.ug-dw-msg');
    if (ck.valid) { msg.className = 'ug-dw-msg is-ok'; msg.innerHTML = `<b>A valid map.</b> Green wins ${s.g}, orange wins ${s.o}${s.tie ? `, ${s.tie} tied` : ''}. <span class="zh">合格的選區圖。綠贏 ${s.g} 區、橘贏 ${s.o} 區${s.tie ? `、平手 ${s.tie} 區` : ''}。</span>`; }
    else { msg.className = 'ug-dw-msg'; msg.innerHTML = `Not finished: every district needs exactly ${ck.size} connected squares. <span class="zh">還沒完成：每一區都要剛好 ${ck.size} 格，而且要相連。</span>`; }
  }
  function paint(i, d) { if (i >= 0 && i < n * n) { plan[i] = d; render(); } }
  const hit = (e) => { const el = e.target.closest('rect[data-i]'); return el ? +el.dataset.i : -1; };
  svg.addEventListener('pointerdown', (e) => { const i = hit(e); if (i < 0) return; down = true; svg.setPointerCapture?.(e.pointerId); paint(i, cur); e.preventDefault(); });
  svg.addEventListener('pointermove', (e) => { if (!down) return; const el = document.elementFromPoint(e.clientX, e.clientY); const r = el && el.closest && el.closest('rect[data-i]'); if (r && plan[+r.dataset.i] !== cur) paint(+r.dataset.i, cur); });
  window.addEventListener('pointerup', () => { down = false; });
  pal.addEventListener('click', (e) => { const b = e.target.closest('button[data-d]'); if (!b) return; cur = +b.dataset.d; pal.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); });
  root.querySelectorAll('button[data-load]').forEach((b) => b.addEventListener('click', () => { const key = b.dataset.load; plan = key === 'clear' ? Array(n * n).fill(-1) : P[key].slice(); render(); }));
  render();
  root.__draw = { paint, load(key) { plan = key === 'clear' ? Array(n * n).fill(-1) : P[key].slice(); render(); }, clear() { plan = Array(n * n).fill(-1); render(); }, info: () => ({ plan: plan.slice(), ...check(plan, n, k), seats: seats(V, plan, k) }) };
  return root.__draw;
}
