// 第十一課的純函式：一本書用過的語言、翻譯了幾次、旅程的檢查。node test/books.test.mjs
import assert from 'node:assert/strict';
import { langChain, translations, checkBook } from '../src/books.js';

const cities = [
  { key: 'alex', at: [29.9, 31.2], year: -295 },
  { key: 'bag', at: [44.4, 33.3], year: 762 },
  { key: 'tol', at: [-4.0, 39.9], year: 1175 },
];
const leg = (en, zh) => ({ lang_en: en, lang_zh: zh, en: 'x', zh: 'x' });
const book = { key: 'b', orig_en: 'Greek', orig_zh: '希臘文', year: 1175, stops: ['alex', 'bag', 'tol'], legs: [leg('Arabic', '阿拉伯文'), leg('Latin', '拉丁文')] };
assert.deepEqual(langChain(book).map((l) => l.en), ['Greek', 'Arabic', 'Latin']);
assert.equal(translations(book), 2);
// 同一種語言接著走，不算翻譯
const same = { ...book, stops: ['alex', 'bag', 'tol'], legs: [leg('Arabic', '阿拉伯文'), leg('Arabic', '阿拉伯文')] };
assert.deepEqual(langChain(same).map((l) => l.en), ['Greek', 'Arabic']); assert.equal(translations(same), 1);
const none = { ...book, orig_en: 'Arabic', orig_zh: '阿拉伯文', stops: ['bag', 'tol'], legs: [leg('Arabic', '阿拉伯文')] };
assert.equal(translations(none), 0);
assert.equal(checkBook(book, cities), null);
assert.match(checkBook({ ...book, orig_en: '' }, cities), /orig/);
assert.match(checkBook({ ...book, legs: [leg('Arabic', '阿拉伯文'), { en: 'x', zh: 'x' }] }, cities), /leg 1/);
assert.match(checkBook({ ...book, year: 900 }, cities), /after/);
assert.match(checkBook({ ...book, stops: ['alex', 'rome', 'tol'] }, cities), /unknown/);
console.log('books.test.mjs ok');
