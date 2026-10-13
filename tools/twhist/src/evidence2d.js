/*
 * 台灣歷史 Taiwan's Story · 第一課不需要 WebGL 的兩個小互動（資料寫在元素裡的 <script type="application/json">）。
 *
 *   initSort(el)  [data-twh-sort]  這是哪一種證據？一次出一樣東西，分到三個籃子；
 *                                  只記「第一次就分對」的數量，不計時、分錯可以再試。
 *   initTwo(el)   [data-twh-two]   兩個人說的不一樣：兩份互相矛盾的記錄，學生選「還想看什麼」，
 *                                  每一樣都說明它能告訴你什麼、不能告訴你什麼。沒有標準答案、不計分。
 * 除錯：el.__sort.start(seed)／current()／pick(binKey)／next()／score()；el.__two.ask(key)／asked()
 */
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
const cfgOf = (root) => JSON.parse(root.querySelector('script[type="application/json"]').textContent);

export function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function shuffled(list, seed) {
  const r = mulberry32(seed), a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function initSort(root) {
  const cfg = cfgOf(root);
  const binOf = Object.fromEntries(cfg.bins.map((b) => [b.key, b]));
  root.textContent = '';
  const top = el('div', 'twh-sort-top', '<p class="twh-sort-k"></p><p class="twh-sort-sc">Right on the first try · 第一次就分對 <b>0 / 0</b></p>');
  const card = el('div', 'twh-sort-card');
  const bins = el('div', 'twh-sort-bins'); bins.setAttribute('role', 'group'); bins.setAttribute('aria-label', 'Choose the kind of evidence · 選出是哪一種證據');
  const msg = el('p', 'twh-sort-msg'); msg.setAttribute('aria-live', 'polite');
  const foot = el('div', 'twh-sort-foot');
  const next = el('button', 'twh-btn twh-btn-gold', 'Next · 下一樣'); next.type = 'button'; next.hidden = true;
  const again = el('button', 'twh-btn', 'Play again · 再玩一次'); again.type = 'button'; again.hidden = true;
  foot.append(next, again);
  const done = el('div', 'twh-sort-done'); done.hidden = true;
  root.append(top, card, bins, msg, foot, done);
  cfg.bins.forEach((b) => {
    const x = el('button', `twh-bin twh-bin-${b.key}`, `<i aria-hidden="true">${b.icon}</i><b>${bi(b.en, b.zh)}</b><small>${bi(b.hint_en, b.hint_zh)}</small>`);
    x.type = 'button'; x.setAttribute('data-bin', b.key);
    x.addEventListener('click', () => pick(b.key));
    bins.append(x);
  });
  const st = { order: [], i: 0, first: 0, tried: false, solved: false, answered: 0 };
  const cur = () => st.order[st.i];
  function show() {
    const it = cur();
    top.firstChild.innerHTML = `Thing ${st.i + 1} of ${st.order.length} · 第 ${st.i + 1} 樣（共 ${st.order.length} 樣）`;
    top.lastChild.querySelector('b').textContent = `${st.first} / ${st.answered}`;
    card.innerHTML = `<span class="twh-sort-ic" aria-hidden="true">${it.icon}</span><span class="twh-sort-t">${bi(it.en, it.zh)}</span>`;
    bins.querySelectorAll('button').forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    msg.innerHTML = bi('Which kind of evidence is it?', '這是哪一種證據？');
    next.hidden = true;
  }
  function pick(key) {
    if (st.solved) return;
    const it = cur(), b = bins.querySelector(`[data-bin="${key}"]`);
    if (key === it.bin) {
      st.solved = true; st.answered++;
      if (!st.tried) st.first++;
      b.classList.add('is-right');
      bins.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      top.lastChild.querySelector('b').textContent = `${st.first} / ${st.answered}`;
      msg.innerHTML = `<b>${bi(binOf[key].en, binOf[key].zh)}</b> ${bi(it.why_en, it.why_zh)}`;
      next.hidden = false;
      next.textContent = st.i === st.order.length - 1 ? 'See all eight · 看全部八樣' : 'Next · 下一樣';
    } else {
      st.tried = true;
      b.classList.add('is-wrong'); b.disabled = true;
      msg.innerHTML = bi(it.nudge_en || 'Not that one. Ask: was it made to be used, made to record something, or told aloud?', it.nudge_zh || '不是這一種。想一想：它是做來用的、做來記錄的，還是用嘴巴說的？');
    }
  }
  function go() {
    if (!st.solved) return;
    if (st.i === st.order.length - 1) { finish(); return; }
    st.i++; st.tried = false; st.solved = false; show();
  }
  function finish() {
    card.hidden = true; bins.hidden = true; next.hidden = true; again.hidden = false; done.hidden = false;
    top.firstChild.innerHTML = 'All eight sorted · 八樣都分好了';
    msg.innerHTML = bi(cfg.done_en, cfg.done_zh);
    done.innerHTML = cfg.bins.map((b) =>
      `<div class="twh-sort-col twh-bin-${b.key}"><p><i aria-hidden="true">${b.icon}</i>${bi(b.en, b.zh)}</p><ul>${
        cfg.items.filter((it) => it.bin === b.key).map((it) => `<li><span aria-hidden="true">${it.icon}</span>${bi(it.en, it.zh)}</li>`).join('')}</ul></div>`).join('');
  }
  function start(seed) {
    st.order = shuffled(cfg.items, seed === undefined ? (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0 : seed);
    st.i = 0; st.first = 0; st.answered = 0; st.tried = false; st.solved = false;
    card.hidden = false; bins.hidden = false; again.hidden = true; done.hidden = true;
    show();
  }
  next.addEventListener('click', go);
  again.addEventListener('click', () => start());
  start();
  root.__sort = { start, pick, next: go, current: () => cur() && cur().key, answer: () => cur() && cur().bin, score: () => ({ first: st.first, answered: st.answered, total: st.order.length }), finished: () => !done.hidden };
}

export function initTwo(root) {
  const cfg = cfgOf(root);
  root.textContent = '';
  const pair = el('div', 'twh-two-pair');
  [cfg.a, cfg.b].forEach((r, i) => {
    pair.append(el('article', `twh-two-rec twh-two-${i ? 'b' : 'a'}`,
      `<p class="twh-two-k">${bi(r.k_en, r.k_zh)}</p><h3>${bi(r.who_en, r.who_zh)}</h3>`
      + `<blockquote>${r.html_en}<span class="zh">${r.html_zh}</span></blockquote>`
      + `<p class="twh-two-meta">${bi(r.meta_en, r.meta_zh)}</p>`));
  });
  const q = el('p', 'twh-two-q', bi(cfg.ask_en, cfg.ask_zh));
  const asks = el('div', 'twh-two-asks'); asks.setAttribute('role', 'group'); asks.setAttribute('aria-label', 'What else would you look for? · 你還想找什麼？');
  const out = el('div', 'twh-two-out'); out.setAttribute('aria-live', 'polite');
  const close = el('div', 'twh-two-close'); close.hidden = true;
  close.innerHTML = `<p class="twh-two-ck">${bi(cfg.close_k_en, cfg.close_k_zh)}</p><ul>${cfg.close.map((c) => `<li>${bi(c.en, c.zh)}</li>`).join('')}</ul><p>${bi(cfg.close_en, cfg.close_zh)}</p>`;
  root.append(pair, q, asks, out, close);
  const asked = new Set();
  function ask(key) {
    const a = cfg.asks.find((x) => x.key === key); if (!a) return;
    asked.add(key);
    asks.querySelectorAll('button').forEach((b) => { const k = b.getAttribute('data-ask'); b.classList.toggle('is-on', k === key); b.classList.toggle('is-seen', asked.has(k)); b.setAttribute('aria-pressed', String(k === key)); });
    out.innerHTML = `<p class="twh-two-oh"><span aria-hidden="true">${a.icon}</span>${bi(a.en, a.zh)}</p>`
      + `<p class="twh-two-can"><b>What it could tell you · 它可以告訴你</b>${bi(a.can_en, a.can_zh)}</p>`
      + `<p class="twh-two-cant"><b>What it could not · 它不能告訴你</b>${bi(a.cant_en, a.cant_zh)}</p>`;
    if (asked.size >= cfg.reveal_after) close.hidden = false;
  }
  cfg.asks.forEach((a) => {
    const b = el('button', 'twh-ask', `<i aria-hidden="true">${a.icon}</i><span>${bi(a.en, a.zh)}</span>`);
    b.type = 'button'; b.setAttribute('data-ask', a.key); b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => ask(a.key));
    asks.append(b);
  });
  out.innerHTML = `<p class="twh-two-hint">${bi(cfg.hint_en, cfg.hint_zh)}</p>`;
  root.__two = { ask, asked: () => [...asked], closed: () => close.hidden };
}

export function initEvidence() {
  const s = document.querySelector('[data-twh-sort]'); if (s && !s.__sort) initSort(s);
  const t = document.querySelector('[data-twh-two]'); if (t && !t.__two) initTwo(t);
}
