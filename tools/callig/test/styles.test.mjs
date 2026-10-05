// 檢查第九課的顏體、柳體筆畫資料（src/strokes/styles.json，對著〈多寶塔碑〉〈玄秘塔碑〉拓本描的）：node test/styles.test.mjs
// 每個字：點在字框裡、壓力 0–1、速度 > 0、下筆提筆要輕、畫得出墨跡；兩種寫法的筆數、筆畫名稱一樣（筆數依教育部）；
// 課文說的事要成立：同樣大的字，顏體的線條平均比柳體粗（只算行筆）。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepStroke, stamps } from '../src/brush.js';

const D = JSON.parse(readFileSync(new URL('../src/strokes/styles.json', import.meta.url), 'utf8'));
const COUNT = { shi: 2, ren: 2, da: 3 };   // 教育部《國字標準字體筆順學習網》：十 2 畫、人 2 畫、大 3 畫
assert.ok(D.src && D.about, '要寫明參考的碑帖');
assert.deepEqual(Object.keys(D.chars), Object.keys(COUNT));
const avgW = (f) => {
  const w = f.strokes.flatMap((st) => stamps(prepStroke(st)).filter((q) => q.phase === 1).map((q) => q.hw * 2));
  return w.reduce((a, b) => a + b, 0) / w.length;
};
for (const [key, c] of Object.entries(D.chars)) {
  assert.ok(c.char && c.en);
  for (const who of ['yan', 'liu']) {
    const f = c[who];
    assert.ok(f.from, `${c.char} ${who}：要寫出自哪一句`);
    assert.equal(f.strokes.length, COUNT[key], `${c.char} ${who}：筆數`);
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    f.strokes.forEach((st, i) => {
      assert.equal(st.n, i + 1); assert.ok(st.en && st.zh);
      assert.equal(st.zh, c.yan.strokes[i].zh, `${c.char}：兩種寫法的筆畫名稱要一樣`);
      for (const [x, y, p, v] of st.pts) {
        assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 1000, `${c.char} ${who} 第 ${i + 1} 筆：點在字框外`);
        assert.ok(p >= 0 && p <= 1 && v > 0);
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      }
      assert.ok(st.pts[0][2] < 0.1 && st.pts[st.pts.length - 1][2] < 0.1, `${c.char} ${who} 第 ${i + 1} 筆：下筆、提筆要輕`);
      const [a, b] = st.phases;
      assert.ok(a > 0 && a < b && b < st.pts.length - 1, `${c.char} ${who} 第 ${i + 1} 筆：phases`);
      assert.ok(stamps(prepStroke(st)).length > 10);
    });
    assert.ok(Math.abs(Math.max(x1 - x0, y1 - y0) - 660) < 3, `${c.char} ${who}：兩種寫法要放大到同樣大（長邊 660）`);
  }
  const y = avgW(c.yan), l = avgW(c.liu);
  assert.ok(y > l * 1.15, `${c.char}：顏體的線要比柳體粗（${y.toFixed(0)}／${l.toFixed(0)}）`);
  console.log(`  ✓ ${c.char}：顏 平均線寬 ${y.toFixed(0)}、柳 ${l.toFixed(0)}（${(y / l).toFixed(2)} 倍）`);
}
console.log('styles: ok');
