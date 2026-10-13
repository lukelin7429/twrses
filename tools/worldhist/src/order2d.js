/*
 * 世界歷史 第一課 ·「誰先到？」（不需要 WebGL）。
 *
 *   <div class="wh-order" data-wh-order><script type="application/json">{ items: [{ key, en, zh, older, nearer, note_en, note_zh }], … }</script>…</div>
 *
 * 把幾個地方照「人類最早抵達」的先後排好（↑ ↓ 按鈕，或拖曳）。判定只用估計的範圍（spread.js 的 judgeOrder）：
 * 範圍完全不重疊的才有對錯；範圍重疊的兩個地方誰排前面都算對，並且說明「目前的證據分不出先後」。
 * 不計時、可以一直改。除錯：root.__order（order、move(key, ±1)、check()、solve()）。
 */
import { judgeOrder, midOrder } from './spread.js';
import { formatAgoRange } from './timeline.js';
import { each, esc, bi, readJson } from './common.js';

function shuffled(keys, answer) {
  // 固定的打亂法（不用亂數，重新整理還是同一個起點），而且保證起點不是答案
  const out = keys.slice();
  for (let i = out.length - 1, s = 7; i > 0; i--) { s = (s * 31 + 11) % 97; const j = s % (i + 1); [out[i], out[j]] = [out[j], out[i]]; }
  if (out.join() === answer.join()) out.reverse();
  return out;
}

export function initOrder(root) {
  const data = readJson(root), items = data.items, by = Object.fromEntries(items.map((it) => [it.key, it]));
  const list = root.querySelector('.wh-or-list'), msg = root.querySelector('.wh-or-msg'), chart = root.querySelector('.wh-or-chart');
  const start = shuffled(items.map((it) => it.key), midOrder(items));
  let order = start.slice(), checked = null, tries = 0;

  function draw() {
    list.innerHTML = order.map((k, i) => {
      const it = by[k];
      const bad = checked && checked.wrong.some((p) => p.includes(k));
      const show = checked && checked.ok;
      const r = formatAgoRange(it.older, it.nearer);
      return `<li class="wh-or-it${bad ? ' is-bad' : ''}${show ? ' is-ok' : ''}" data-key="${k}" draggable="true">`
        + `<span class="wh-or-n">${i + 1}</span><span class="wh-or-name">${bi(it.en, it.zh)}`
        + (show ? `<span class="wh-or-when">${bi(r.en, r.zh)}</span>` : '') + '</span>'
        + `<span class="wh-or-btns"><button type="button" data-move="-1" aria-label="Move ${esc(it.en)} earlier · 往前移"${i === 0 ? ' disabled' : ''}>&uarr;</button>`
        + `<button type="button" data-move="1" aria-label="Move ${esc(it.en)} later · 往後移"${i === order.length - 1 ? ' disabled' : ''}>&darr;</button></span></li>`;
    }).join('');
  }
  function drawChart() {
    // 答對以後：每個地方畫一條「估計的範圍」，橫軸是對數的「幾年前」
    const hi = Math.log10(Math.max(...items.map((it) => it.older)) * 1.3), lo = Math.log10(Math.min(...items.map((it) => it.nearer)) / 1.4);
    const x = (ago) => `${((hi - Math.log10(ago)) / (hi - lo) * 100).toFixed(2)}%`;
    chart.hidden = false;
    chart.innerHTML = `<p class="wh-or-ck">${bi('The ranges, drawn on one line (each step to the left is ten times longer ago)', '把這些範圍畫在同一條線上（每往左一格，是十倍那麼久以前）')}</p>`
      + order.map((k) => { const it = by[k]; return `<div class="wh-or-row"><span>${bi(it.en, it.zh)}</span><div><i style="left:${x(it.older)};right:calc(100% - ${x(it.nearer)})"></i></div></div>`; }).join('');
  }
  function say(en, zh, cls) { msg.className = `wh-or-msg ${cls || ''}`; msg.innerHTML = bi(en, zh); }
  function check() {
    checked = judgeOrder(items, order); tries += 1;
    draw();
    if (!checked.ok) {
      const [early, late] = checked.wrong[0];
      say(`Not yet. The evidence so far says people reached ${by[early].en} before ${by[late].en}. Move them and check again.`,
        `還沒對。目前的證據顯示，人到「${by[early].zh}」比到「${by[late].zh}」早。調整一下再檢查。`, 'is-bad');
      chart.hidden = true;
      return checked;
    }
    const open = checked.open.map(([a, b]) => [by[a], by[b]]);
    const en = open.length ? ` ${data.open_en} (${open.map(([a, b]) => `${a.en} and ${b.en}`).join('; ')}.)` : '';
    const zh = open.length ? `${data.open_zh}（${open.map(([a, b]) => `${a.zh}和${b.zh}`).join('；')}。）` : '';
    say(`${data.done_en}${en}`, `${data.done_zh}${zh}`, 'is-ok');
    drawChart();
    return checked;
  }
  function move(key, d) {
    const i = order.indexOf(key), j = i + d;
    if (i < 0 || j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    checked = null; chart.hidden = true; say(data.hint_en, data.hint_zh);
    draw();
    const b = list.querySelector(`[data-key="${key}"] [data-move="${d}"]`);
    if (b && !b.disabled) b.focus(); else { const o = list.querySelector(`[data-key="${key}"] button:not([disabled])`); if (o) o.focus(); }
  }
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.move) move(b.closest('[data-key]').dataset.key, Number(b.dataset.move));
    else if (b.dataset.act === 'check') check();
    else if (b.dataset.act === 'reset') { order = start.slice(); checked = null; chart.hidden = true; say(data.hint_en, data.hint_zh); draw(); }
  });
  // 桌機可以直接拖（手機用 ↑ ↓）
  let dragKey = null;
  list.addEventListener('dragstart', (ev) => { const li = ev.target.closest('[data-key]'); if (li) { dragKey = li.dataset.key; ev.dataTransfer.effectAllowed = 'move'; ev.dataTransfer.setData('text/plain', dragKey); } });
  list.addEventListener('dragover', (ev) => { if (dragKey) ev.preventDefault(); });
  list.addEventListener('drop', (ev) => {
    const li = ev.target.closest('[data-key]'); if (!dragKey || !li) return;
    ev.preventDefault();
    const from = order.indexOf(dragKey), to = order.indexOf(li.dataset.key);
    order.splice(to, 0, order.splice(from, 1)[0]);
    dragKey = null; checked = null; chart.hidden = true; say(data.hint_en, data.hint_zh); draw();
  });
  list.addEventListener('dragend', () => { dragKey = null; });
  say(data.hint_en, data.hint_zh);
  draw();
  root.__order = { get order() { return order.slice(); }, set(o) { order = o.slice(); checked = null; draw(); }, move, check, solve() { order = midOrder(items); return check(); }, get tries() { return tries; } };
  return root.__order;
}
each('[data-wh-order]', initOrder);
