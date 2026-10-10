/*
 * 電腦概論 · 第八課「按下一個鍵，發生了什麼？」的純函式（不碰 DOM、不碰 three.js；test/keypath.test.mjs）。
 *
 * 一個鍵從鍵盤到螢幕，一路換了四種樣子：
 *   1 鍵盤送出的是「哪一個鍵」的編號（這裡用 USB HID Usage Tables 1.5 第 10 章 Keyboard/Keypad Page 的編號：
 *     0x04 Keyboard a and A、0x1E Keyboard 1 and !、0x2C Keyboard Spacebar）。**同一個鍵不管有沒有按 Shift，編號都一樣**。
 *   2 電腦把「鍵的編號＋有沒有按 Shift＋鍵盤配置」查成一個字元的編號（這裡固定用美式配置；A＝65、a＝97）。
 *   3 字元的編號放進記憶體是八個位元。
 *   4 螢幕上亮的是像素；哪幾格亮由字型決定（這裡的 5×7 點陣是自己畫的示意字型）。
 */
export const KEYS = {
  KeyA: { usage: 0x04, cap: 'A', plain: 'a', shift: 'A', hid: 'Keyboard a and A' },
  Digit1: { usage: 0x1e, cap: '1', plain: '1', shift: '!', hid: 'Keyboard 1 and !' },
  Space: { usage: 0x2c, cap: 'Space', plain: ' ', shift: ' ', hid: 'Keyboard Spacebar' },
};
export const KEY_IDS = Object.keys(KEYS);
export const STAGES = ['key', 'wire', 'char', 'memory', 'screen'];

// 自己畫的 5×7 點陣（示意字型）
export const GLYPHS = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  a: ['.....', '.....', '.###.', '....#', '.####', '#...#', '.####'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
};
export const hex = (n) => `0x${n.toString(16).toUpperCase().padStart(2, '0')}`;

export function trace(keyId, shift = false) {
  const k = KEYS[keyId];
  if (!k) throw new Error(`unknown key ${keyId}`);
  const char = shift ? k.shift : k.plain, code = char.codePointAt(0);
  const rows = GLYPHS[char];
  return {
    keyId, cap: k.cap, shift: !!shift, usage: k.usage, usageHex: hex(k.usage), hid: k.hid,
    char, code, bits: code.toString(2).padStart(8, '0'),
    rows, lit: rows.join('').split('').filter((c) => c === '#').length,
  };
}

// 兩次按鍵比一比：哪幾站不一樣
export function diff(a, b) {
  return { wire: a.usage !== b.usage || a.shift !== b.shift, usage: a.usage !== b.usage, char: a.code !== b.code, memory: a.bits !== b.bits, screen: a.rows.join('') !== b.rows.join('') };
}
