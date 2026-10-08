/*
 * 電腦概論 · 第二課「編碼」的純函式（不碰 DOM、不碰 three.js；npm test）。
 *
 *   charInfo(str, max)        一個字一個字（照碼位，不是照 UTF-16 單位）：{ ch, code, hex（U+XXXX）, bits, utf8（位元組陣列） }
 *   asciiChar(n)              0–127 裡印得出來的字（32–126），其餘回 null
 *   PICTURE / PALETTE         像素牆的圖（16 × 16，自己畫的蘋果）與調色盤
 *   parsePicture(rows, pal)   → [[r, g, b], …]（由左到右、由上到下）
 *   pictureBits(w, h)         一張 w × h 的全彩圖要幾個位元（每個像素 3 個數、每個數 8 位元）
 *   colorCount(bitsPerChannel) 紅綠藍各 n 位元，一共幾種顏色
 *   hex2(n) / rgbHex(rgb)     網頁寫顏色的方法：#d62828
 *   rowsToBytes(grid, w)      黑白像素畫：每一列 8 格＝一個位元組（最左邊那格是 128）
 *   bytesToRows(bytes, w)     反過來
 *   ART                       8 × 8 像素畫的範例（每列一個位元組）
 *   wave(t)                   示意用的聲波（0–1 之間，一個週期）
 *   sampleWave(n, bits)       一個週期量 n 次，每次記成 bits 位元的整數：{ samples: [{ t, v, q, level }], levels, totalBits }
 *   audioBits(rate, bits, channels, seconds)  沒壓縮的聲音要幾個位元
 */

export function charInfo(str, max = 8) {
  const out = [];
  const enc = new TextEncoder();
  for (const ch of str) {
    if (out.length >= max) break;
    const code = ch.codePointAt(0);
    out.push({
      ch, code,
      hex: `U+${code.toString(16).toUpperCase().padStart(4, '0')}`,
      bits: code.toString(2),
      utf8: Array.from(enc.encode(ch)),
    });
  }
  return out;
}

export const asciiChar = (n) => (n >= 32 && n <= 126 ? String.fromCharCode(n) : null);

export const PALETTE = {
  '.': [245, 238, 220],   // 背景：米白
  r: [214, 40, 40],       // 蘋果紅
  R: [150, 24, 32],       // 暗紅（陰影）
  h: [255, 140, 130],     // 亮紅
  w: [255, 236, 226],     // 反光
  g: [56, 160, 72],       // 葉子
  G: [28, 104, 50],       // 深綠
  b: [110, 72, 40],       // 梗
};

export const PICTURE = [
  '................',
  '.........bb.....',
  '........bb.gg...',
  '........b.gggg..',
  '...rrrr.brrGg...',
  '..rrrrrrbrrrrr..',
  '.rrhhrrrrrrrrrR.',
  '.rhwhrrrrrrrrrR.',
  '.rrhrrrrrrrrrrR.',
  '.rrrrrrrrrrrrrR.',
  '.rrrrrrrrrrrrRR.',
  '.rrrrrrrrrrrrRR.',
  '..rrrrrrrrrrRR..',
  '..rrrrrrrrrRRR..',
  '...rrrRRrRRRR...',
  '....RR...RR.....',
];

export function parsePicture(rows = PICTURE, pal = PALETTE) {
  const out = [];
  for (const row of rows) for (const c of row) out.push(pal[c].slice());
  return out;
}

export const pictureBits = (w, h, channels = 3, bits = 8) => w * h * channels * bits;
export const colorCount = (bitsPerChannel = 8, channels = 3) => 2 ** (bitsPerChannel * channels);
export const hex2 = (n) => n.toString(16).padStart(2, '0');
export const rgbHex = (rgb) => `#${rgb.map(hex2).join('')}`;

export function rowsToBytes(grid, w = 8) {
  const out = [];
  for (let i = 0; i < grid.length; i += w) {
    let v = 0;
    for (let k = 0; k < w; k++) v = v * 2 + (grid[i + k] ? 1 : 0);
    out.push(v);
  }
  return out;
}

export function bytesToRows(bytes, w = 8) {
  const out = [];
  for (const b of bytes) for (let k = w - 1; k >= 0; k--) out.push(Math.floor(b / 2 ** k) % 2);
  return out;
}

export const ART = {
  heart: [0b00000000, 0b01100110, 0b11111111, 0b11111111, 0b11111111, 0b01111110, 0b00111100, 0b00011000],
  smile: [0b00111100, 0b01000010, 0b10100101, 0b10000001, 0b10100101, 0b10011001, 0b01000010, 0b00111100],
  letterA: [0b00011000, 0b00100100, 0b01000010, 0b01000010, 0b01111110, 0b01000010, 0b01000010, 0b00000000],
};

/** 示意用的聲波：兩個正弦疊在一起，壓到 0–1 之間（不是任何真實樂器的波形）。 */
export function wave(t) {
  const y = Math.sin(2 * Math.PI * t) * 0.62 + Math.sin(2 * Math.PI * 3 * t + 0.6) * 0.28;
  return Math.min(1, Math.max(0, 0.5 + y * 0.5));
}

export function sampleWave(n, bits) {
  const levels = 2 ** bits;
  const samples = [];
  for (let k = 0; k < n; k++) {
    const t = (k + 0.5) / n;
    const v = wave(t);
    const level = Math.min(levels - 1, Math.floor(v * levels));
    samples.push({ t, v, level, q: (level + 0.5) / levels });
  }
  return { samples, levels, totalBits: n * bits };
}

export const audioBits = (rate, bits, channels, seconds) => rate * bits * channels * seconds;
