/*
 * 電腦概論 · 第十四課「電腦怎麼保守祕密？」的純函式（不碰 DOM、不碰 three.js；test/cipher.test.mjs）。
 *
 * 加密：照一個約好的規則把訊息打亂，只有知道金鑰的人才能還原。這裡用最容易懂的一種——凱撒位移：
 *   shift(text, k)    每個英文字母往後移 k 格（Z 之後繞回 A），大小寫各自繞；其他字元（空白、標點、數字、中文）原樣不動
 *   unshift(text, k)  移回來
 *   bruteForce(text)  偷看的人把 25 種位移全部試一遍
 * 規則是公開的，要保密的只有 k。凱撒位移只有 25 把金鑰，全部試一遍就破了——真的加密用的金鑰多到試不完：
 *   keyCount(bits)    n 個位元的金鑰一共有 2 的 n 次方把（用 BigInt，數字不會失準）
 */
const A = 65, a = 97;
export function shift(text, k) {
  const n = ((Math.trunc(k) % 26) + 26) % 26;
  let out = '';
  for (const ch of String(text)) {
    const c = ch.charCodeAt(0);
    if (ch.length === 1 && c >= A && c < A + 26) out += String.fromCharCode(A + ((c - A + n) % 26));
    else if (ch.length === 1 && c >= a && c < a + 26) out += String.fromCharCode(a + ((c - a + n) % 26));
    else out += ch;
  }
  return out;
}
export const unshift = (text, k) => shift(text, -k);
export const bruteForce = (text) => Array.from({ length: 25 }, (_, i) => ({ k: i + 1, text: unshift(text, i + 1) }));
export const CAESAR_KEYS = 25;
export const keyCount = (bits) => 2n ** BigInt(bits);
export const group = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const digits = (n) => n.toString().length;
export const BITS = [1, 2, 3, 4, 5, 8, 16, 32, 64, 128, 256];

// 模型與小遊戲用的訊息（只有字母、空白和簡單標點）
export const MESSAGES = ['MEET ME AT NOON', 'THE KEY IS UNDER THE MAT', 'HAPPY BIRTHDAY'];
export const SPY_ROUNDS = [{ plain: 'SEE YOU AFTER SCHOOL', k: 7 }, { plain: 'BRING YOUR UMBRELLA', k: 19 }, { plain: 'THE CAKE IS IN THE BOX', k: 11 }];
