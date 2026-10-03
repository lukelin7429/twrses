// 檢查 src/strokes/ancient.json（第五課：六個字的甲骨文、金文、小篆中心線與隸書示意）：node test/ancient.test.mjs
// 每個字四個階段都有；古文字的點在字框裡、寬度倍率合理；隸書和小篆（轉成寫字引擎的筆畫後）都畫得出墨跡。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepStroke, stamps, strokeDuration } from '../src/brush.js';

const A = JSON.parse(readFileSync(new URL('../src/strokes/ancient.json', import.meta.url), 'utf8'));
const KEYS = ['ri', 'yue', 'shan', 'shui', 'ren', 'ma'];
assert.deepEqual(Object.keys(A.chars), KEYS, '六個字、順序固定');
const inBox = (x, y) => x >= 0 && x <= 1000 && y >= 0 && y <= 1000;
for (const k of KEYS) {
  const c = A.chars[k];
  assert.ok(c.char && c.en, `${k}：要有字和英文`);
  for (const s of ['oracle', 'bronze', 'seal']) {
    assert.ok(c[s].length > 0, `${c.char} ${s}：至少一筆`);
    c[s].forEach((st, i) => {
      assert.ok(st.pts.length >= 2, `${c.char} ${s} 第 ${i + 1} 筆：至少兩點`);
      assert.equal(typeof st.smooth, 'boolean');
      for (const q of st.pts) {
        assert.ok(inBox(q[0], q[1]), `${c.char} ${s} 第 ${i + 1} 筆：點在字框外`);
        if (q.length > 2) assert.ok(q[2] >= 0.3 && q[2] <= 3, '寬度倍率 0.3–3');
      }
    });
  }
  assert.ok(c.oracle.every((st) => st.smooth === false), `${c.char}：甲骨文是刀刻的直線`);
  c.clerical.forEach((st, i) => {
    for (const [x, y, p, v] of st.pts) { assert.ok(inBox(x, y), `${c.char} 隸書第 ${i + 1} 筆：點在字框外`); assert.ok(p >= 0 && p <= 1 && v > 0); }
    assert.ok(st.pts[0][2] < 0.1 && st.pts[st.pts.length - 1][2] < 0.1, '下筆、提筆要輕');
    const s = prepStroke(st);
    assert.ok(stamps(s).length > 10, `${c.char} 隸書第 ${i + 1} 筆畫得出墨跡`);
    assert.ok(strokeDuration(s) < 8);
  });
  console.log(`  ✓ ${c.char}（${k}）：甲骨文 ${c.oracle.length}、金文 ${c.bronze.length}、小篆 ${c.seal.length}、隸書 ${c.clerical.length} 筆`);
}
console.log('ancient.test.mjs: 六個字全部通過');
