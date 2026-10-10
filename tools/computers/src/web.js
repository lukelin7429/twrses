/*
 * 電腦概論 · 第十三課「打開一個網頁，發生了什麼？」的純函式（不碰 DOM、不碰 three.js；test/web.test.mjs）。
 *
 * 打開網頁是一次問答：瀏覽器（用戶端）先問 DNS「這個名字的數字地址是多少」，再向那個地址的伺服器送出請求，
 * 伺服器回一個狀態碼和一份文字（HTML），瀏覽器把文字畫成頁面。
 * 這裡的伺服器、網頁和位址**全部是示意**：
 *   網域名稱用 IANA 保留給文件舉例的 example.com／example.org，和 RFC 2606 保留的 .example；
 *   IP 位址用 RFC 5737 保留給文件的區段（192.0.2.0/24、198.51.100.0/24）——都不是任何真實網站的位址。
 *   真的 example.com 上面只有一則簡短的說明，沒有這裡編的這些頁面。
 */
export function parseUrl(url) {
  const m = /^([a-z]+):\/\/([^/\s]+)(\/[^\s]*)?$/i.exec(String(url).trim());
  return m ? { scheme: m[1].toLowerCase(), host: m[2].toLowerCase(), path: m[3] || '/' } : null;
}
export const DNS = { 'example.com': '192.0.2.10', 'example.org': '198.51.100.7' };
export const lookup = (host) => DNS[host] || null;
export const SITES = {
  'example.com': {
    '/': '<h1>Hello!</h1>\n<p>This is a web page.</p>',
    '/pets': '<h1 color="teal">Our Pets</h1>\n<p>A cat, a dog, and a fish.</p>',
  },
  'example.org': { '/': '<h1 color="purple">A Different Server</h1>\n<p>Another name, another address.</p>' },
};
export const NOT_FOUND = '<h1>404</h1>\n<p>Not Found</p>';
export function respond(host, path) {
  const site = SITES[host], html = site && site[path];
  return html ? { status: 200, text: 'OK', html } : { status: 404, text: 'Not Found', html: NOT_FOUND };
}
// 走完一趟：回每一站的內容；reach＝走到第幾站（DNS 查不到就停在第 2 站）
export function trace(url) {
  const parts = parseUrl(url); if (!parts) return null;
  const ip = lookup(parts.host);
  if (!ip) return { url, parts, ip: null, request: null, status: null, text: null, html: null, reach: 2 };
  const r = respond(parts.host, parts.path);
  return { url, parts, ip, request: `GET ${parts.path}`, status: r.status, text: r.text, html: r.html, reach: 5 };
}
export const LAB_URLS = { home: 'https://example.com/', pets: 'https://example.com/pets', missing: 'https://example.com/dragons', noname: 'https://no-such-site.example/' };

// 迷你 HTML：只認 <h1> 和 <p>，只認 color 這一個屬性、只認下面幾種顏色；其他的一律當成普通文字。
// 回傳 [{ tag, color, text }]，由呼叫的人用 createElement＋textContent 畫出來（不用 innerHTML）。
export const COLOR_NAMES = ['black', 'red', 'green', 'blue', 'orange', 'purple', 'teal', 'brown'];
export function parseMini(src) {
  const out = [], re = /<(h1|p)(\s+color\s*=\s*"([^"]*)")?\s*>([\s\S]*?)<\/\1\s*>/gi;
  let m, last = 0; const s = String(src);
  const text = (t) => { const v = t.replace(/\s+/g, ' ').trim(); if (v) out.push({ tag: 'text', color: null, text: v }); };
  while ((m = re.exec(s))) {
    text(s.slice(last, m.index));
    const color = m[3] && COLOR_NAMES.includes(m[3].toLowerCase()) ? m[3].toLowerCase() : null;
    out.push({ tag: m[1].toLowerCase(), color, text: m[4].replace(/\s+/g, ' ').trim() });
    last = re.lastIndex;
  }
  text(s.slice(last));
  return out;
}
