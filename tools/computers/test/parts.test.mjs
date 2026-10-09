// 單元二零件與容量換算的測試：node test/parts.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BOOT, GB, GIB, ITEMS, KB, KIB, MB, MIB, PARTS, TB, asBinaryUnits, checkTasks, fits, fmtInt } from '../src/parts.js';

assert.equal(PARTS.length, 7);
assert.equal(new Set(PARTS).size, 7);
// 「按下電源」每一步亮起來的、資料流經的，都是存在的零件（螢幕在主機外面）
for (const s of BOOT) for (const k of [...s.on, ...s.flow.flat()]) assert.ok(PARTS.includes(k) || k === 'screen', k);
assert.equal(BOOT.length, 4);

// 容量單位
assert.equal(KB, 1000); assert.equal(MB, 1000 * KB); assert.equal(GB, 1000 * MB); assert.equal(TB, 1000 * GB);
assert.equal(GB, 1000000000); assert.equal(TB, 1000000000000);
assert.equal(KIB, 1024); assert.equal(MIB, 1048576); assert.equal(GIB, 1073741824);   // 2^10、2^20、2^30
assert.equal(GB * 8, 8000000000);                           // 1 GB＝80 億個位元
assert.equal(fmtInt(512 * GB), '512,000,000,000');
assert.equal(fmtInt(512 * GB * 8), '4,096,000,000,000');    // 512 GB 的固態硬碟：四兆多個位元＝四兆多個「第一課的開關」
// 同樣的位元組，用二進位單位數出來的數字比較小：512 GB ≈ 476.8 GiB；1 TB ≈ 931.3 GiB
assert.equal(asBinaryUnits(512 * GB).toFixed(1), '476.8');
assert.equal(asBinaryUnits(TB).toFixed(1), '931.3');
assert.equal(asBinaryUnits(256 * GB).toFixed(1), '238.4');
assert.equal(((GIB - GB) / GB * 100).toFixed(1), '7.4');    // 1 GiB 比 1 GB 多約 7.4%
assert.equal(16 * GIB, 17179869184);                        // 16 GiB 的記憶體

// 「裝得下多少？」：用的都是第二課算過的數
assert.equal(ITEMS.letter, 1);
assert.equal(ITEMS.photo, 36000000);
assert.equal(ITEMS.minute, 5292000);
assert.equal(fits(512 * GB, ITEMS.photo), 14222);           // 512 GB：一萬四千多張沒壓縮的照片
assert.equal(fits(256 * GB, ITEMS.photo), 7111);
assert.equal(fits(TB, ITEMS.photo), 27777);
assert.equal(fits(512 * GB, ITEMS.minute), 96749);          // 九萬六千多分鐘
assert.equal(Math.floor(96749 / 60 / 24), 67);              // 約 67 天不停地播
assert.equal(fits(512 * GB, ITEMS.letter), 512000000000);   // 五千一百二十億個字母
assert.equal(fits(10, 3), 3);

// 配對題：data/computers.json 裡的每一題答案都是存在的零件
const D = JSON.parse(readFileSync(new URL('../../../data/computers.json', import.meta.url), 'utf8'));
const L = D.units.flatMap((u) => u.lessons).find((l) => l.slug === 'inside-a-computer');
if (L) {
  const used = checkTasks(L.jobs.tasks);
  assert.ok(used instanceof Set, String(used));
  assert.equal(L.jobs.tasks.length, 8);
  assert.ok(used.size >= 6);
  assert.deepEqual(L.lab.parts.map((p) => p.key), PARTS);    // 模型的零件清單和資料一致
  assert.deepEqual(L.lab.boot.map((b) => b.key), BOOT.map((b) => b.key));
}

console.log('parts.test.mjs ok');
