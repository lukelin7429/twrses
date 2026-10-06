// 檢查第十一課的對聯資料與判斷（src/couplet2d.js、data/calligraphy.json）：node test/couplet.test.mjs
// 每一副：上聯（a）末字仄聲、下聯（b）末字平聲、兩句字數一樣；遊戲用的對聯末字不能有陷阱字（國語聲調和平仄要一致）；
// 「春」9 畫、「福」13 畫（教育部）。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const toneClass = (tone) => (tone === 1 || tone === 2 ? 'ping' : 'ze');   // 同 couplet2d.js（那個檔 import 了 JSON，node 直接跑不了）
const D = JSON.parse(readFileSync(new URL('../../../data/calligraphy.json', import.meta.url), 'utf8'));
const L = D.units.flatMap((u) => u.lessons).find((l) => l.slug === 'spring-couplets');
assert.ok(L, '找不到第十一課');
const all = [...L.lab.couplets, ...L.sides.couplets];
assert.ok(L.lab.couplets.length >= 4 && L.sides.couplets.length >= 6);
for (const c of all) {
  assert.equal([...c.a.text].length, [...c.b.text].length, `${c.a.text}：兩句字數要一樣`);
  assert.equal(c.a.last.ze, true, `${c.a.text}：上聯末字要仄聲`);
  assert.equal(c.b.last.ze, false, `${c.b.text}：下聯末字要平聲`);
  for (const x of [c.a, c.b]) {
    assert.equal([...x.text].pop(), x.last.zh, `${x.text}：last.zh 要是最後一個字`);
    assert.equal(toneClass(x.last.tone) === 'ze', x.last.ze, `${x.text}：遊戲裡不放國語聲調和平仄不一致的陷阱字`);
  }
  if (c.top) assert.equal([...c.top].length, 4);
}
for (const [k, n] of [['chun', 9], ['fu', 13]]) {
  const ch = JSON.parse(readFileSync(new URL(`../src/strokes/${k}.json`, import.meta.url), 'utf8'));
  assert.equal(ch.count, n); assert.equal(ch.strokes.length, n);
}
console.log(`couplet: ok（${all.length} 副）`);
