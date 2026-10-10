import assert from 'node:assert/strict';
import { COLOR_NAMES, DNS, LAB_URLS, NOT_FOUND, SITES, lookup, parseMini, parseUrl, respond, trace } from '../src/web.js';

assert.deepEqual(parseUrl('https://twrses.org/resources/classes/computers/'), { scheme: 'https', host: 'twrses.org', path: '/resources/classes/computers/' });
assert.deepEqual(parseUrl('https://example.com'), { scheme: 'https', host: 'example.com', path: '/' });
assert.deepEqual(parseUrl('HTTPS://Example.COM/pets'), { scheme: 'https', host: 'example.com', path: '/pets' });
assert.equal(parseUrl('example.com'), null); assert.equal(parseUrl('hello world'), null);
// 示意的位址都在保留給文件的區段裡（RFC 5737），名字都是保留給舉例用的
for (const ip of Object.values(DNS)) assert.ok(/^(192\.0\.2|198\.51\.100|203\.0\.113)\.\d{1,3}$/.test(ip), ip);
for (const h of [...Object.keys(DNS), ...Object.keys(SITES)]) assert.ok(/^example\.(com|org)$/.test(h), h);
assert.equal(lookup('example.com'), '192.0.2.10'); assert.equal(lookup('no-such-site.example'), null);
assert.equal(respond('example.com', '/').status, 200); assert.equal(respond('example.com', '/dragons').status, 404); assert.equal(respond('example.com', '/dragons').html, NOT_FOUND);
// 模型的四個網址
const T = Object.fromEntries(Object.entries(LAB_URLS).map(([k, u]) => [k, trace(u)]));
assert.deepEqual([T.home.status, T.home.reach, T.home.ip, T.home.request], [200, 5, '192.0.2.10', 'GET /']);
assert.deepEqual([T.pets.status, T.pets.request], [200, 'GET /pets']); assert.equal(T.pets.ip, T.home.ip);     // 同一台伺服器，不同的路徑
assert.deepEqual([T.missing.status, T.missing.text, T.missing.reach, T.missing.ip], [404, 'Not Found', 5, '192.0.2.10']);  // DNS 查得到，伺服器找不到那一頁
assert.deepEqual([T.noname.ip, T.noname.reach, T.noname.status], [null, 2, null]);                             // 名字查不到，根本到不了伺服器
assert.equal(trace('nonsense'), null);
// 迷你 HTML：只認 h1、p 與 color；其他的當文字，絕不產生別的標籤
assert.deepEqual(parseMini('<h1>Hello!</h1>\n<p>This is a web page.</p>'), [{ tag: 'h1', color: null, text: 'Hello!' }, { tag: 'p', color: null, text: 'This is a web page.' }]);
assert.deepEqual(parseMini('<h1 color="teal">Our Pets</h1>'), [{ tag: 'h1', color: 'teal', text: 'Our Pets' }]);
assert.equal(parseMini('<p color="javascript:alert(1)">x</p>')[0].color, null);
const evil = parseMini('<script>alert(1)</script><p onclick="x()">hi</p><img src=x onerror=y>');
assert.ok(evil.every((n) => ['h1', 'p', 'text'].includes(n.tag))); assert.ok(evil.every((n) => n.tag === 'text'));
assert.deepEqual(parseMini('just words'), [{ tag: 'text', color: null, text: 'just words' }]); assert.deepEqual(parseMini(''), []);
for (const site of Object.values(SITES)) for (const html of Object.values(site)) { const n = parseMini(html); assert.equal(n.length, 2); assert.equal(n[0].tag, 'h1'); assert.equal(n[1].tag, 'p'); if (n[0].color) assert.ok(COLOR_NAMES.includes(n[0].color)); }
assert.equal(parseMini(NOT_FOUND)[0].text, '404');
console.log('web.test.mjs ok');
