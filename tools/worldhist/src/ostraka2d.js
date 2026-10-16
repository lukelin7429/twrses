/*
 * 世界歷史 第五課 ·「同一堆陶片，兩種讀法」（不需要 WebGL）。
 *
 *   <div class="wh-ost" data-wh-ostraka><script type="application/json">{ need, names: [{ key, en, zh, start }], rules: [{ key, en, zh, text_en, text_zh, src, url }],
 *      scenarios: [{ en, zh, votes: { key: n } }], result: { … } }</script>…</div>
 *
 * 拉每個名字的陶片數（每格 100 片），兩欄同時顯示兩種讀法的結果（assembly.js 的 ostracism）。
 * 兩種讀法都有古代的出處，研究者至今沒有定論；這個小互動不替任何一種下結論。
 * 除錯：root.__ost（set(key, n)、scenario(i)、results()）。
 */
import { ostracism } from './assembly.js';
import { each, bi, esc, readJson } from './common.js';

export function initOstraka(root) {
  const data = readJson(root);
  const votes = Object.fromEntries(data.names.map((n) => [n.key, n.start]));
  const max = data.max || 9000;
  const $ = (s) => root.querySelector(s);
  const list = $('.wh-ost-names'), totalEl = $('.wh-ost-total');
  const fmt = (n) => n.toLocaleString('en-US');
  const nameOf = (k) => data.names.find((n) => n.key === k);

  list.innerHTML = data.names.map((n) => `<li data-name="${n.key}">
      <span class="wh-ost-who">${bi(n.en, n.zh)}</span>
      <span class="wh-ost-bar"><i aria-hidden="true"></i><b aria-hidden="true" style="left:${(data.need / max) * 100}%"></b>
        <input type="range" min="0" max="${max}" step="100" value="${n.start}" aria-label="${esc(`Ostraka with the name ${n.en}`)} · ${esc(`寫著${n.zh}的陶片`)}"></span>
      <output class="wh-ost-n"></output></li>`).join('');

  function results() { return data.rules.map((r) => ({ rule: r.key, ...ostracism(votes, r.key, data.need) })); }
  function draw() {
    data.names.forEach((n) => {
      const li = list.querySelector(`[data-name="${n.key}"]`);
      li.querySelector('.wh-ost-n').textContent = fmt(votes[n.key]);
      li.querySelector('.wh-ost-bar i').style.width = `${(votes[n.key] / max) * 100}%`;
      li.querySelector('.wh-ost-bar').classList.toggle('is-over', votes[n.key] >= data.need);
    });
    const res = results();
    totalEl.textContent = fmt(res[0].total);
    res.forEach((r) => {
      const box = root.querySelector(`[data-rule="${r.rule}"]`);
      const out = box.querySelector('.wh-ost-out');
      const t = data.result[r.reason];
      const who = r.exiled ? nameOf(r.exiled) : null;
      out.innerHTML = who ? bi(t.en.replace('{name}', who.en), t.zh.replace('{name}', who.zh)) : bi(t.en, t.zh);
      box.dataset.out = r.exiled ? 'exiled' : 'none';
    });
    const same = res[0].exiled === res[1].exiled;
    const d = $('.wh-ost-diff'); d.innerHTML = same ? bi(data.same_en, data.same_zh) : bi(data.differ_en, data.differ_zh); d.dataset.same = same;
  }
  function set(k, n) { if (k in votes) { votes[k] = Math.max(0, Math.min(max, Math.round(n / 100) * 100)); const inp = list.querySelector(`[data-name="${k}"] input`); inp.value = votes[k]; draw(); } }
  function scenario(i) { const s = data.scenarios[i]; if (!s) return; Object.keys(votes).forEach((k) => { votes[k] = s.votes[k] ?? 0; list.querySelector(`[data-name="${k}"] input`).value = votes[k]; }); draw(); }
  list.addEventListener('input', (ev) => { const li = ev.target.closest('[data-name]'); if (li) { votes[li.dataset.name] = +ev.target.value; draw(); } });
  root.addEventListener('click', (ev) => { const b = ev.target.closest('[data-scenario]'); if (b) scenario(+b.dataset.scenario); });
  draw();
  root.__ost = { set, scenario, results, votes };
  return root.__ost;
}

each('[data-wh-ostraka]', initOstraka);
