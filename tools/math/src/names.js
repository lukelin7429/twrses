/*
 * 看得見的數學 · 數字怎麼唸（純函式；測試在 test/names.test.mjs）。
 *
 *   enWords(n)   美式英文：305 → 'three hundred five'（整數裡不加 and；21–99 有連字號；三位一節 thousand／million／billion）
 *   zhWords(n)   中文：305 → '三百零五'（四位一節 萬／億；中間有空位唸一個「零」；10–19 開頭唸「十」不唸「一十」）
 *   baseDigitsEn(numeral)／baseDigitsZh(numeral)   別的進位制一位一位唸：'1101' → 'one one zero one'／'一一零一'
 *   placeNameEn(i, base)／placeNameZh(i, base)     位名：ones、tens、hundreds、thousands／個位、十位、百位、千位；
 *                                                   五進位、二進位用位值當名字（fives、twenty-fives／五、二十五）
 *
 * 範圍：0 到 999,999,999,999（不到一兆）。這一課的模型只用到 9,999，其餘給之後的課用。
 */
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
  'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const PERIODS = ['', 'thousand', 'million', 'billion'];

function under1000(n) {
  const out = [];
  if (n >= 100) { out.push(`${ONES[Math.floor(n / 100)]} hundred`); n %= 100; }
  if (n >= 20) out.push(TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
  else if (n > 0) out.push(ONES[n]);
  return out.join(' ');
}

export function enWords(n) {
  if (!Number.isInteger(n) || n < 0 || n >= 1e12) throw new RangeError('enWords: 0 to 999,999,999,999');
  if (n === 0) return 'zero';
  const out = [];
  for (let p = 3; p >= 0; p--) {
    const chunk = Math.floor(n / 1000 ** p) % 1000;
    if (chunk) out.push(under1000(chunk) + (p ? ` ${PERIODS[p]}` : ''));
  }
  return out.join(' ');
}

const ZH = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const ZH_UNIT = ['', '十', '百', '千'];
const ZH_SECTION = ['', '萬', '億'];

/** 一節（0–9999）。lead＝這一節是不是整個數的開頭（開頭的 10–19 唸「十」） */
function zhSection(n, lead) {
  let out = '', zero = false;
  for (let k = 3; k >= 0; k--) {
    const d = Math.floor(n / 10 ** k) % 10;
    if (d === 0) { if (out) zero = true; continue; }
    if (zero) { out += '零'; zero = false; }
    out += (d === 1 && k === 1 && !out && lead ? '' : ZH[d]) + ZH_UNIT[k];
  }
  return out;
}

export function zhWords(n) {
  if (!Number.isInteger(n) || n < 0 || n >= 1e12) throw new RangeError('zhWords: 0 to 999,999,999,999');
  if (n === 0) return '零';
  let out = '', gap = false;
  for (let s = 2; s >= 0; s--) {
    const sec = Math.floor(n / 10000 ** s) % 10000;
    if (sec === 0) { if (out) gap = true; continue; }
    if (out && (gap || sec < 1000)) out += '零';
    gap = false;
    out += zhSection(sec, !out) + ZH_SECTION[s];
  }
  return out;
}

export const baseDigitsEn = (numeral) => [...String(numeral)].map((d) => ONES[Number(d)]).join(' ');
export const baseDigitsZh = (numeral) => [...String(numeral)].map((d) => ZH[Number(d)]).join('');

const PLACE_EN = ['ones', 'tens', 'hundreds', 'thousands'];
const PLACE_ZH = ['個位', '十位', '百位', '千位'];
const PLURAL = { 2: 'twos', 4: 'fours', 5: 'fives', 8: 'eights', 16: 'sixteens', 25: 'twenty-fives', 32: 'thirty-twos', 64: 'sixty-fours', 125: 'one hundred twenty-fives', 128: 'one hundred twenty-eights' };

/** 位名（複數）：十進位用 ones／tens／hundreds／thousands；其他進位制用「幾個一堆」當名字 */
export function placeNameEn(i, base = 10) {
  if (i === 0) return 'ones';
  if (base === 10 && PLACE_EN[i]) return PLACE_EN[i];
  const v = base ** i;
  return PLURAL[v] || `${v}s`;
}
export function placeNameZh(i, base = 10) {
  if (base === 10 && PLACE_ZH[i]) return PLACE_ZH[i];
  if (i === 0) return '一';
  return zhWords(base ** i);
}
/** 單數：'1 ten'、'1 five' */
export const placeOneEn = (i, base = 10) => placeNameEn(i, base).replace(/s$/, '');
