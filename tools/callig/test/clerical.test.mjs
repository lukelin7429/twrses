// 檢查 src/strokes/clerical.json（第六課：隸書筆畫資料，示意）：node test/clerical.test.mjs
// 每個字：筆畫數＝count；點在字框裡、壓力 0–1、速度 > 0、下筆提筆要輕；每一筆畫得出墨跡；
// **一個字最多一個燕尾**（tail 指到那一筆、那一筆有 tail: true）；第六課的六個字正好各一個。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepStroke, stamps, strokeDuration } from '../src/brush.js';

const C = JSON.parse(readFileSync(new URL('../src/strokes/clerical.json', import.meta.url), 'utf8'));
const LESSON6 = ['yi', 'san', 'tu', 'shan', 'ren', 'shui'];
for (const k of LESSON6) assert.ok(C.chars[k], `要有 ${k}`);
for (const [k, c] of Object.entries(C.chars)) {
  assert.equal(c.key, k); assert.equal(c.box, 1000);
  assert.equal(c.strokes.length, c.count, `${c.char}：筆畫數`);
  assert.ok(c.order_src.includes('教育部'), `${c.char}：筆順出處`);
  const tails = c.strokes.map((st, i) => (st.tail ? i : -1)).filter((i) => i >= 0);
  assert.ok(tails.length <= 1, `${c.char}：一個字最多一個燕尾`);
  assert.equal(c.tail, tails.length ? tails[0] : null, `${c.char}：tail 要指到有燕尾的那一筆`);
  if (LESSON6.includes(k)) assert.equal(tails.length, 1, `${c.char}：第六課的字要正好一個燕尾`);
  c.strokes.forEach((st, i) => {
    assert.equal(st.n, i + 1); assert.ok(st.en && st.zh);
    for (const [x, y, p, v] of st.pts) {
      assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 1000, `${c.char} 第 ${i + 1} 筆：點在字框外`);
      assert.ok(p >= 0 && p <= 1 && v > 0);
    }
    assert.ok(st.pts[0][2] < 0.1 && st.pts[st.pts.length - 1][2] < 0.1, `${c.char} 第 ${i + 1} 筆：下筆、提筆要輕`);
    const [a, b] = st.phases;
    assert.ok(a > 0 && a < b && b < st.pts.length - 1, `${c.char} 第 ${i + 1} 筆：phases`);
    const s = prepStroke(st);
    assert.ok(stamps(s).length > 10, '畫得出墨跡');
    assert.ok(strokeDuration(s) < 8, '一筆不超過 8 秒');
  });
  if (c.seal) c.seal.forEach((st) => { for (const [x, y] of st.pts) assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 1000); });
  console.log(`  ✓ ${c.char}（${k}）：${c.count} 筆${tails.length ? `，燕尾在第 ${tails[0] + 1} 筆` : '，沒有燕尾'}`);
}
console.log('clerical.test.mjs: 全部通過');
