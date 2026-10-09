/*
 * 電腦概論 · 單元二「機器裡面」的純函式（不碰 DOM、不碰 three.js；npm test）。
 *
 *   PARTS                    主機裡的七個零件（key 與顯示順序；名稱與說明放在 data/computers.json，由 build.py 傳進頁面）
 *   BOOT                     「按下電源」的四個步驟：每一步哪些零件亮起來、資料從哪裡流到哪裡
 *   KB / MB / GB / TB        十進位的容量單位（1 GB = 1,000,000,000 位元組；硬碟廠商與 SI 的用法）
 *   KIB / MIB / GIB          二進位的容量單位（1 GiB = 2^30 位元組）
 *   ITEMS                    「裝得下多少？」的三種東西，各占幾個位元組（都是前幾課算過的數）
 *   fits(driveBytes, itemBytes)  裝得下幾個（無條件捨去）
 *   fmtInt(n)                1,234,567
 *   asBinaryUnits(bytes)     同樣的位元組數，用二進位單位來數是多少 GiB（有些系統這樣顯示，所以數字比較小）
 *   checkTasks(tasks)        配對題的答案都是存在的零件、每個零件至少被用到一次（測試用）
 */

export const PARTS = ['board', 'cpu', 'cooler', 'ram', 'ssd', 'gpu', 'psu'];

export const BOOT = [
  { key: 'power', on: ['psu', 'board'], flow: [['psu', 'board']] },
  { key: 'load', on: ['ssd', 'ram', 'board'], flow: [['ssd', 'ram']] },
  { key: 'run', on: ['cpu', 'ram', 'cooler'], flow: [['ram', 'cpu'], ['cpu', 'ram']] },
  { key: 'show', on: ['cpu', 'gpu', 'screen'], flow: [['cpu', 'gpu'], ['gpu', 'screen']] },
];

export const KB = 1e3, MB = 1e6, GB = 1e9, TB = 1e12;
export const KIB = 2 ** 10, MIB = 2 ** 20, GIB = 2 ** 30;

export const ITEMS = {
  letter: 1,                     // 一個英文字母：1 個位元組（第二課，UTF-8）
  photo: 4000 * 3000 * 3,        // 一張 4,000 × 3,000、還沒壓縮的照片：36,000,000 位元組（第二課）
  minute: (44100 * 16 * 60) / 8, // 一分鐘 CD 規格的聲音（一個聲道）：5,292,000 位元組（第二課）
};

export const fits = (driveBytes, itemBytes) => Math.floor(driveBytes / itemBytes);
export const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
export const asBinaryUnits = (bytes) => bytes / GIB;

export function checkTasks(tasks, parts = PARTS) {
  const used = new Set();
  for (const t of tasks) { if (!parts.includes(t.answer)) return `unknown part: ${t.answer}`; used.add(t.answer); }
  return used;
}
