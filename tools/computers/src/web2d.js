/*
 * 電腦概論 · 第十三課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   renderMini(el, nodes)  把 web.js 的 parseMini() 結果畫進 el——只用 createElement＋textContent，**不用 innerHTML**，
 *                          所以學生打什麼都不會變成可以執行的東西。
 *   initHtml(el)      [data-cp-html]      網頁是一份文字：左邊改幾行迷你 HTML，右邊即時看到畫出來的樣子
 *   initUrlParts(el)  [data-cp-urlparts]  讀懂一個網址：點協定、網域名稱、路徑三段，各說明它是做什麼的
 *   「誰問、誰答？」八題用 key2d.js 的 initChoice（通用選項題）。
 */
import { parseMini, parseUrl } from './web.js';

export function renderMini(el, nodes) {
  el.textContent = '';
  for (const n of nodes) {
    const d = document.createElement(n.tag === 'h1' ? 'h4' : n.tag === 'p' ? 'p' : 'span');
    d.className = `cp-pg-${n.tag}`; d.textContent = n.text; if (n.color) d.style.color = n.color;
    el.appendChild(d);
  }
}

export function initHtml(root) {
  const $ = (s) => root.querySelector(s);
  const src = $('.cp-hm-src'), out = $('.cp-hm-out'), msg = $('.cp-hm-msg'), first = src.value;
  function show() {
    const nodes = parseMini(src.value); renderMini(out, nodes);
    const loose = nodes.filter((n) => n.tag === 'text').length;
    msg.innerHTML = !nodes.length ? 'The file is empty, so the page is blank.<span class="zh">檔案是空的，所以頁面一片空白。</span>'
      : loose ? 'Some of your text is not inside a pair of tags that this little browser knows, so it is shown as plain words. Check that every &lt;h1&gt; has its &lt;/h1&gt; and every &lt;p&gt; its &lt;/p&gt;.<span class="zh">有些文字不在這個小瀏覽器認得的一對標籤裡，所以被當成普通的字顯示出來。檢查一下：每個 &lt;h1&gt; 有沒有配上 &lt;/h1&gt;，每個 &lt;p&gt; 有沒有配上 &lt;/p&gt;。</span>'
        : `The browser read your text and drew ${nodes.length} thing${nodes.length === 1 ? '' : 's'}. Change a word between the tags and watch the page change.<span class="zh">瀏覽器讀了你的文字，畫出 ${nodes.length} 樣東西。把標籤中間的字改一改，看頁面跟著變。</span>`;
  }
  src.addEventListener('input', show);
  $('.cp-hm-reset').addEventListener('click', () => { src.value = first; show(); });
  show();
  root.__html = { set: (v) => { src.value = v; show(); }, state: () => ({ nodes: parseMini(src.value), outTags: [...out.children].map((c) => c.tagName) }) };
}

export function initUrlParts(root) {
  const $ = (s) => root.querySelector(s);
  const line = $('.cp-up-line'), msg = $('.cp-up-msg'), pick = [...root.querySelectorAll('[data-u]')];
  const INFO = {
    scheme: ['the protocol', '協定', 'It tells the browser which set of rules to use for asking. For web pages this is usually https.', '它告訴瀏覽器要用哪一套規則去問。網頁通常是 https。'],
    host: ['the domain name', '網域名稱', 'It says which server to ask. The browser first has to look this name up in the DNS to get the server’s number.', '它說的是要問哪一台伺服器。瀏覽器得先拿這個名字去 DNS 查出伺服器的數字地址。'],
    path: ['the path', '路徑', 'It says which page on that server you want. The browser sends it to the server as part of the request.', '它說的是你要那台伺服器上的哪一頁。瀏覽器把它放在請求裡送給伺服器。'],
  };
  let parts = null;
  function setUrl(u) {
    parts = parseUrl(u); pick.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-u') === u ? 'true' : 'false'));
    line.textContent = '';
    const add = (cls, t, k) => { const e = document.createElement(k ? 'button' : 'span'); e.className = cls; e.textContent = t; if (k) { e.type = 'button'; e.setAttribute('data-part', k); e.addEventListener('click', () => sel(k)); } line.appendChild(e); };
    add('cp-up-seg is-scheme', parts.scheme, 'scheme'); add('cp-up-sep', '://'); add('cp-up-seg is-host', parts.host, 'host'); add('cp-up-seg is-path', parts.path, 'path');
    msg.innerHTML = 'Tap one of the three colored parts.<span class="zh">點三個彩色部分的其中一個。</span>';
  }
  function sel(k) {
    line.querySelectorAll('[data-part]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-part') === k ? 'true' : 'false'));
    const [en, zh, den, dzh] = INFO[k];
    msg.textContent = '';
    const b = document.createElement('b'); b.textContent = `${parts[k]} — ${en} · ${zh}`; msg.appendChild(b);
    msg.appendChild(document.createTextNode(` ${den}`)); const z = document.createElement('span'); z.className = 'zh'; z.textContent = dzh; msg.appendChild(z);
  }
  pick.forEach((b) => b.addEventListener('click', () => setUrl(b.getAttribute('data-u'))));
  setUrl(pick[0].getAttribute('data-u'));
  root.__urlparts = { setUrl, sel, state: () => ({ parts, msg: msg.textContent }) };
}
