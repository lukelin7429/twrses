// 檢查第七課的行書、草書筆畫資料（src/strokes/running.json、cursive.json）：node test/speed.test.mjs
// 每個字：點在字框裡、壓力 0–1、速度 > 0、下筆提筆要輕、畫得出墨跡；
// 課文說的事要成立：同一個字，草書的筆數 ≤ 行書 ≤ 楷書，寫完的時間（含提筆 0.82 秒一次）草書 < 行書 < 楷書；
// 行書的「永」至少有一段牽絲（壓力很小的連接線）。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepStroke, stamps, strokeDuration } from '../src/brush.js';

const R = (f) => JSON.parse(readFileSync(new URL(`../src/strokes/${f}.json`, import.meta.url), 'utf8'));
const run = R('running'), cur = R('cursive');
const KEYS = ['yong', 'zhi', 'shui'];
const AIR = 0.82;
const time = (c) => c.strokes.reduce((a, st) => a + strokeDuration(prepStroke(st)), 0) + AIR * (c.strokes.length - 1);
for (const [name, D] of [['行書', run], ['草書', cur]]) {
  assert.ok(D.src && D.about, `${name}：要寫明參考的法帖`);
  assert.deepEqual(Object.keys(D.chars), KEYS);
  for (const k of KEYS) {
    const c = D.chars[k];
    assert.equal(c.key, k); assert.equal(c.box, 1000); assert.equal(c.strokes.length, c.count);
    c.strokes.forEach((st, i) => {
      assert.equal(st.n, i + 1); assert.ok(st.en && st.zh);
      for (const [x, y, p, v] of st.pts) {
        assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 1000, `${name}${c.char} 第 ${i + 1} 筆：點在字框外`);
        assert.ok(p >= 0 && p <= 1 && v > 0);
      }
      assert.ok(st.pts[0][2] < 0.1 && st.pts[st.pts.length - 1][2] < 0.1, `${name}${c.char} 第 ${i + 1} 筆：下筆、提筆要輕`);
      const [a, b] = st.phases;
      assert.ok(a > 0 && a < b && b < st.pts.length - 1, `${name}${c.char} 第 ${i + 1} 筆：phases`);
      assert.ok(stamps(prepStroke(st)).length > 10);
    });
  }
}
for (const k of KEYS) {
  const kai = R(k), xing = run.chars[k], cao = cur.chars[k];
  assert.ok(cao.count <= xing.count && xing.count <= kai.count, `${kai.char}：筆數 草 ≤ 行 ≤ 楷`);
  const [a, b, c] = [time(kai), time(xing), time(cao)];
  assert.ok(c < b && b < a, `${kai.char}：時間 草 < 行 < 楷（${a.toFixed(1)}／${b.toFixed(1)}／${c.toFixed(1)}）`);
  console.log(`  ✓ ${kai.char}：楷 ${kai.count} 筆 ${a.toFixed(1)} 秒、行 ${xing.count} 筆 ${b.toFixed(1)} 秒、草 ${cao.count} 筆 ${c.toFixed(1)} 秒`);
}
// 行書「永」有牽絲：某一筆中間或尾段有壓力 < 0.22 的一段
const thin = run.chars.yong.strokes.some((st) => { const s = stamps(prepStroke(st)), L = s[s.length - 1].s; return s.some((q) => q.p < 0.22 && q.s / L > 0.04 && q.s / L < 0.985); });
assert.ok(thin, '行書「永」要有牽絲');
console.log('speed.test.mjs: 全部通過');
