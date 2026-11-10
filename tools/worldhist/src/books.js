/*
 * 世界歷史 第十一課〈Who Kept Knowledge Alive? 誰把知識保存下來？〉的純函式（node test/books.test.mjs）。
 * 一本書的旅程沿用第九課的 silk.js（goodPath、tokenAt、checkGood）；這裡多的是「語言」：
 *   langChain(book)     這本書一路上用過的語言（原文 orig_en 開頭，連續一樣的只算一次）：[{ en, zh }…]
 *   translations(book)  被翻譯了幾次（語言換了幾次）
 *   checkBook(book, cities)  checkGood 的檢查＋每一段都寫了 lang_en／lang_zh、有原文的語言；錯了回傳字串
 */
import { checkGood } from './silk.js';

export function langChain(book) {
  const out = [{ en: book.orig_en, zh: book.orig_zh }];
  for (const l of book.legs) if (l.lang_en !== out[out.length - 1].en) out.push({ en: l.lang_en, zh: l.lang_zh });
  return out;
}

export const translations = (book) => langChain(book).length - 1;

export function checkBook(book, cities) {
  const e = checkGood(book, cities);
  if (e) return e;
  if (!book.orig_en || !book.orig_zh) return `${book.key}: needs orig_en and orig_zh`;
  for (const [i, l] of book.legs.entries()) if (!l.lang_en || !l.lang_zh || !l.en || !l.zh) return `${book.key}: leg ${i} needs lang and text`;
  return null;
}
