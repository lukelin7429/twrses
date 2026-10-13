// 資料檔的結構，以及課文裡算得出來的數字，自己再算一遍：node test/data.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { agoAtDepth, checkOrder, depthAt, foundSoFar, intrusionYoungerThanNeighbors, totalDepth } from '../src/strata.js';
import { centuryOf, makeScale, yearToAgo, yearsBetween } from '../src/timeline.js';

const data = JSON.parse(readFileSync(new URL('../../../data/taiwan_history.json', import.meta.url), 'utf8'));
const lessons = data.units.flatMap((u) => u.lessons), planned = data.units.flatMap((u) => u.planned);

// 六個單元、二十四課，課次連號；每個單元四課
assert.equal(data.units.length, 6);
assert.deepEqual([...lessons, ...planned].map((l) => l.n).sort((a, b) => a - b), Array.from({ length: 24 }, (_, i) => i + 1));
data.units.forEach((u) => assert.equal(u.lessons.length + u.planned.length, 4, u.key));
assert.equal(data.reading_guide.cards.length, 3);

// 每一課固定的東西：課文規格＋三張固定的卡（我們怎麼知道／不同的說法／歷史英語 8 句）＋時間軸上的位置
for (const L of lessons) {
  assert.equal(L.paras.length, 6, L.slug); assert.equal(L.paras_zh.length, 6);
  assert.equal(L.vocab.length, 8); assert.equal(L.questions.length, 3); assert.equal(L.answers.length, 3);
  assert.equal(L.quiz.length, 5); assert.equal(L.parts.length, 4); assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4);
  assert.equal(L.culture_cards.cards.length, 4); assert.equal(L.activities.length, 2);
  L.quiz.forEach((q) => { assert.equal(q.options.length, 4); assert.ok(q.correct >= 0 && q.correct < 4); });
  L.vocab.forEach((v) => assert.ok(v.ex.includes('<b>'), v.w));
  assert.ok(L.how_we_know.items.length >= 3, '我們怎麼知道？至少三項');
  L.how_we_know.items.forEach((it) => assert.ok(/^https:\/\//.test(it.url) && it.src && it.where_en && it.where_zh, it.en));
  assert.ok(L.views.items.length >= 1, '不同的說法至少一項');
  L.views.items.forEach((it) => { assert.ok(it.sides.length >= 2, '說法要並列，至少兩邊'); it.sides.forEach((s) => assert.ok(/^https:\/\//.test(s.url) && s.src, '每一種說法都要有出處')); });
  assert.equal(L.phrases.rows.length, 8, '歷史英語 8 句');
  L.phrases.rows.forEach((r) => { assert.ok(r.html.includes('<b>')); assert.equal(r.html.replace(/<\/?b>/g, ''), r.en, '粗體版和朗讀版的句子要一樣'); });
  assert.ok(L.when && L.when.focus, '時間軸上要標出這一課');
  L.sources.forEach((s) => assert.ok(/^https:\/\//.test(s.url) && s.src));
}

// ── 第一課 ───────────────────────────────────────────────────────────
const L = lessons.find((l) => l.slug === 'how-do-we-know');
const lab = L.lab, layers = lab.layers;
assert.deepEqual(checkOrder(layers), []);                       // 疊置原理：越下面越古老；出土物的年代落在自己那一層
assert.equal(layers.length, 5);
layers.forEach((l, i) => { if (i) assert.equal(l.toAgo, layers[i - 1].fromAgo, '相鄰兩層的年代要接得上'); assert.equal(l.finds.length, 2); });
assert.ok(layers.at(-1).fromAgo <= lab.older && lab.older === data.timeline.older);
assert.equal(lab.nearest, data.timeline.nearest);
assert.ok(Math.abs(totalDepth(layers) - 2.3) < 1e-9);
assert.equal(foundSoFar(layers, 5).length, 10);
assert.ok(layers.flatMap((l) => l.finds).some((f) => f.key === lab.demo_date));
// 圖例的年代和資料一致
layers.forEach((l, i) => { const t = lab.legend[i].en; assert.ok(t.includes(l.fromAgo.toLocaleString('en-US')), t); if (l.toAgo > 1) assert.ok(t.includes(l.toAgo.toLocaleString('en-US')), t); });
// 後來挖的坑：東西和「開挖的那一層」同年代，比它躺的那一層年輕
const lt = lab.later;
assert.ok(lt.from < lt.into);
assert.ok(intrusionYoungerThanNeighbors(layers, lt, lt.find));
assert.ok(lt.find.ago <= layers[lt.from].fromAgo && lt.find.ago >= layers[lt.from].toAgo);
// 往下挖，坑底的年代只會越來越古老（時間軸跟著往回走）
let prev = 0;
for (let v = 0; v <= 5.0001; v += 0.05) { const a = agoAtDepth(layers, depthAt(layers, v), lab.nearest); assert.ok(a >= prev - 1e-9); prev = a; }
assert.ok(Math.abs(prev - 30000) < 1e-3);
// 小卡的示範鍵要和 twh-dig.js 的 DEMO 一致
const src = readFileSync(new URL('../src/twh-dig.js', import.meta.url), 'utf8');
L.parts.forEach((p) => assert.ok(new RegExp(`\\n    ${p.demo}\\(\\) \\{`).test(src), `DEMO.${p.demo}`));
// 小卡二：「最後一層涵蓋的年數，比前四層加起來還多得多」
assert.ok(layers[4].fromAgo - layers[4].toAgo > 4 * (layers[3].fromAgo - 1));
// 分類遊戲：八樣、三個籃子（2／4／2）
assert.equal(L.sort.items.length, 8); assert.equal(L.sort.bins.length, 3);
const count = (k) => L.sort.items.filter((it) => it.bin === k).length;
assert.deepEqual(['thing', 'record', 'oral'].map(count), [2, 4, 2]);
assert.ok(L.sort.done_en.startsWith('Two things, four records, two kinds of spoken words'));
// 兩個人說的不一樣：至少六個可以追問的方向，每個都有「能／不能」
assert.ok(L.two.asks.length >= 6); L.two.asks.forEach((a) => assert.ok(a.can_en && a.cant_en && a.can_zh && a.cant_zh));
assert.ok(L.two.reveal_after <= L.two.asks.length); assert.equal(L.two.close.length, 4);
// 課文裡的數
const NOW = 2026;
assert.equal(yearToAgo(1603, NOW), 423);
assert.ok(1 - makeScale('linear', data.timeline.older, 0).pos(yearToAgo(1603, NOW)) < 0.01);   // 有文字記錄的時代不到整條線的百分之一
assert.ok((30000 - yearToAgo(1603, NOW)) / 30000 > 0.98);       // 「幾乎占了全部」
assert.equal(centuryOf(1603), 17); assert.equal(centuryOf(1601), 17); assert.equal(centuryOf(1700), 17);
assert.equal(yearsBetween(1601, 1700) + 1, 100);
// 時間軸上的事件由古到今
const ev = data.timeline.events.map((e) => (e.ago !== undefined ? e.ago : yearToAgo(e.year, NOW)));
assert.deepEqual(ev, [...ev].sort((a, b) => b - a));
// 全系列寫到 1996 年為止
JSON.stringify(data).replace(/\b(19\d\d|20\d\d)\b/g, (y) => { assert.ok(+y <= 1996 || ['2009', '2011', '2018', '2020', '2025', '2026'].includes(y), `year ${y}`); return y; });
// 美式拼字：常見的英式拼法不能出現（出處欄的逐字引文照原文，所以 sources 不掃）
const en = JSON.stringify(data, (k, v) => (k === 'sources' ? undefined : v)).replace(/[一-鿿]/g, '');
assert.ok(!/\b(colour|centre|metre|programme|practise|favourite|grey|whilst|towards|amongst|recognise|organise|analyse|civilisation|judgement|travell|labell|artefact|defence|neighbour|honour|catalogue|archaeolog(?:y|ist|ical)s?e)\b/i.test(en));
// 不用只從外來者角度說的字眼
assert.ok(!/發現台灣|發現臺灣|discover(ed)? Taiwan|開發/.test(JSON.stringify(data)));
console.log('data.test.mjs ok');
