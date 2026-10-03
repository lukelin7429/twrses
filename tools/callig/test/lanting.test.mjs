// 檢查第八課的四個「之」（src/strokes/lanting.json，對著神龍本〈蘭亭序〉描的）：node test/lanting.test.mjs
// 每個字：點在字框裡、壓力 0–1、速度 > 0、下筆提筆要輕、畫得出墨跡；
// 課文說的事要成立：四個「之」都是「一點加一條長線」（2 筆），而且四個的樣子兩兩不同。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepStroke, stamps, strokeDuration } from '../src/brush.js';

const D = JSON.parse(readFileSync(new URL('../src/strokes/lanting.json', import.meta.url), 'utf8'));
const KEYS = ['z1', 'z4', 'z6', 'z12'];
assert.ok(D.src && D.about, '要寫明參考的法帖');
assert.deepEqual(Object.keys(D.chars), KEYS);
const sig = {};
for (const k of KEYS) {
  const c = D.chars[k];
  assert.equal(c.key, k); assert.equal(c.char, '之'); assert.equal(c.box, 1000);
  assert.equal(c.index, Number(k.slice(1)), `${k}：index 是它在全文裡排第幾個之`);
  assert.ok(c.from && c.from.includes('之') && c.en);
  assert.equal(c.strokes.length, c.count); assert.equal(c.count, 2, `${k}：一點加一條長線`);
  c.strokes.forEach((st, i) => {
    assert.equal(st.n, i + 1); assert.ok(st.en && st.zh);
    for (const [x, y, p, v] of st.pts) {
      assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 1000, `${k} 第 ${i + 1} 筆：點在字框外`);
      assert.ok(p >= 0 && p <= 1 && v > 0);
    }
    assert.ok(st.pts[0][2] < 0.1 && st.pts[st.pts.length - 1][2] < 0.1, `${k} 第 ${i + 1} 筆：下筆、提筆要輕`);
    const [a, b] = st.phases;
    assert.ok(a > 0 && a < b && b < st.pts.length - 1, `${k} 第 ${i + 1} 筆：phases`);
    assert.ok(stamps(prepStroke(st)).length > 10);
  });
  const all = c.strokes.flatMap((s) => s.pts);
  const xs = all.map((q) => q[0]), ys = all.map((q) => q[1]);
  sig[k] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys), all.length];
  const t = c.strokes.reduce((a, st) => a + strokeDuration(prepStroke(st)), 0);
  console.log(`  ✓ ${k}（${c.from}）：${c.count} 筆、${t.toFixed(1)} 秒`);
}
for (let i = 0; i < KEYS.length; i++) for (let j = i + 1; j < KEYS.length; j++) {
  const a = sig[KEYS[i]], b = sig[KEYS[j]];
  const diff = a.slice(0, 4).reduce((s, v, n) => s + Math.abs(v - b[n]), 0);
  assert.ok(diff > 40 || a[4] !== b[4], `${KEYS[i]} 和 ${KEYS[j]} 長得太像了`);
}
console.log('lanting: ok');
