/*
 * 美國政治 U.S. Government · 「排出正確的順序」（第六課；不需要 WebGL）。
 * 打亂的步驟卡片：依序點出下一步。點對了，卡片移到上方的順序列並標號；點錯了，卡片抖一下、說明它屬於哪裡。
 * 題目在 data/us_government.json 的 order.items（照正確順序寫），build.py 放進 <script type="application/json">。
 * 打亂用固定的種子，每次載入順序一樣（方便老師在課堂上指著說）。
 *
 * 除錯：document.querySelector('[data-ug-order]').__order（pick(key)、reset()、info()）
 */
export function shuffled(items, seed = 7) {
  const a = items.slice();
  let s = seed;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  // 不要剛好是正確順序
  if (a.every((x, i) => x === items[i])) a.reverse();
  return a;
}

export function initOrder(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const items = data.items, pos = Object.fromEntries(items.map((x, i) => [x.key, i]));
  const done = $('.ug-or-done'), pool = $('.ug-or-pool'), msg = $('.ug-or-msg'), sc = $('.ug-or-score');
  let n = 0, miss = 0;
  function render() {
    done.innerHTML = items.slice(0, n).map((x, i) => `<li><b>${i + 1}</b>${x.en}<span class="zh">${x.zh}</span></li>`).join('')
      + (n < items.length ? `<li class="is-next"><b>${n + 1}</b>…</li>` : '');
    pool.querySelectorAll('button').forEach((b) => { b.hidden = pos[b.dataset.key] < n; });
    sc.textContent = `${n} / ${items.length} · mistakes 錯 ${miss}`;
  }
  pool.innerHTML = shuffled(items, data.seed || 7).map((x) => `<button type="button" data-key="${x.key}"><span>${x.en}</span><span class="zh">${x.zh}</span></button>`).join('');
  function pick(key) {
    if (n >= items.length) return null;
    const b = pool.querySelector(`button[data-key="${key}"]`);
    if (pos[key] === n) {
      n++; msg.className = 'ug-or-msg is-right';
      msg.innerHTML = n === items.length ? `<b>All in order${miss ? '' : ', with no mistakes'}.</b> ${data.end_en}<span class="zh">全部排好了${miss ? '' : '，一次都沒錯'}。${data.end_zh}</span>` : `<b>Right.</b> ${items[n - 1].why_en}<span class="zh">對。${items[n - 1].why_zh}</span>`;
    } else {
      miss++; b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
      const later = pos[key] > n;
      msg.className = 'ug-or-msg is-wrong';
      msg.innerHTML = later ? `<b>Not yet.</b> That step comes later. What has to happen first?<span class="zh">還沒。這一步在後面。在它之前，必須先發生什麼事？</span>` : '';
    }
    render();
    return pos[key] === n - 1;
  }
  pool.addEventListener('click', (e) => { const b = e.target.closest('button[data-key]'); if (b) pick(b.dataset.key); });
  $('.ug-or-reset').addEventListener('click', () => { n = 0; miss = 0; msg.innerHTML = ''; msg.className = 'ug-or-msg'; render(); });
  render();
  root.__order = { pick, reset() { $('.ug-or-reset').click(); }, info: () => ({ n, miss, total: items.length }) };
  return root.__order;
}
