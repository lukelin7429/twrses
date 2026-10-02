// 檢查 src/strokes/*.json 的筆畫資料格式：node test/strokes.test.mjs
// 每個字：筆畫數＝教育部筆順學習網的筆畫數（count）；控制點在字框裡、壓力 0–1、速度 > 0；
// phases 在範圍內；第一點與最後一點幾乎沒壓（下筆、提筆）；取樣後每一筆都畫得出來。
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { prepStroke, stamps, strokeDuration } from '../src/brush.js';

const dir = new URL('../src/strokes/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
assert.ok(files.length > 0, '至少要有一個字');
let n = 0;
for (const f of files) {
  const d = JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
  assert.equal(`${d.key}.json`, f, '檔名＝ key');
  assert.equal(d.box, 1000);
  assert.ok(d.order_src && d.order_src.includes('教育部'), `${f}：筆順要註明依教育部`);
  assert.equal(d.strokes.length, d.count, `${f}：筆畫數`);
  d.strokes.forEach((st, i) => {
    assert.equal(st.n, i + 1);
    assert.ok(st.en && st.zh, '每一筆要有中英文名稱');
    assert.ok(st.pts.length >= 4);
    for (const [x, y, p, v] of st.pts) {
      assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 1000, `${f} 第 ${i + 1} 筆：點在字框外`);
      assert.ok(p >= 0 && p <= 1, '壓力 0–1'); assert.ok(v > 0, '速度 > 0');
    }
    assert.ok(st.pts[0][2] < 0.1 && st.pts[st.pts.length - 1][2] < 0.1, '下筆、提筆要輕');
    const [a, b] = st.phases;
    assert.ok(a > 0 && a < b && b < st.pts.length - 1, 'phases 起筆 < 行筆 < 收筆');
    const s = prepStroke(st);
    assert.ok(stamps(s).length > 50, '畫得出墨跡');
    const T = strokeDuration(s);
    assert.ok(T > 1 && T < 8, `一筆寫 1–8 秒（${T.toFixed(2)}）`);
  });
  n++;
  console.log(`  ✓ ${d.char}（${f}）`);
}
console.log(`strokes.test.mjs: ${n} 個字全部通過`);
