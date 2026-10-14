// 資料檔的結構，以及課文裡算得出來的數字，自己再算一遍：node test/data.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { agoAtDepth, checkOrder, depthAt, foundSoFar, intrusionYoungerThanNeighbors, totalDepth } from '../src/strata.js';
import { centuryOf, makeScale, yearToAgo, yearsBetween } from '../src/timeline.js';
import { activeAt, dated, spanOf } from '../src/geo2d.js';

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
// ── 第二課 ───────────────────────────────────────────────────────────
{
  const L2 = lessons.find((l) => l.slug === 'who-lived-here'), lab2 = L2.lab;
  const coast = JSON.parse(readFileSync(new URL('../src/data/coast.json', import.meta.url), 'utf8'));
  assert.equal(lab2.sites.length, 8);
  assert.equal(new Set(lab2.sites.map((s) => s.key)).size, 8);
  for (const s of lab2.sites) {
    assert.ok(s.lon >= coast.bbox.w && s.lon <= coast.bbox.e && s.lat >= coast.bbox.s && s.lat <= coast.bbox.n, s.key);
    assert.ok(/^https:\/\/nhsrc\.boch\.gov\.tw\/SiteDetail\?id=\d+$/.test(s.url), s.key);
    assert.ok(s.layers.length >= 1);
    s.layers.forEach((l) => { if (l.fromAgo !== undefined) assert.ok(l.fromAgo > l.toAgo && l.fromAgo <= lab2.older, `${s.key} ${l.en}`); else assert.ok(l.note_en && l.note_zh, `${s.key} ${l.en}`); });
    assert.ok(s.layers.filter((l) => l.rep).length <= 1);
    if (!dated(s).length) assert.ok(s.unknown_en && s.unknown_zh, '年代不詳的遺址要有說明');
  }
  // 年代不詳的只有萬山岩雕群
  assert.deepEqual(lab2.sites.filter((s) => !dated(s).length).map((s) => s.key), ['wanshan']);
  const lit = (ago) => lab2.sites.filter((s) => activeAt(s, ago)).map((s) => s.key).sort();
  assert.deepEqual(lit(20000), ['baxian']);                      // 小卡一：2 萬年前只有八仙洞
  assert.deepEqual(lit(10000), []);                              // 「滑到 1 萬年前，全部暗掉」
  assert.deepEqual(lit(5000), ['baxian', 'dapenkeng', 'fengbitou', 'peinan', 'yuanshan']);   // 小卡二：北、南、東同時亮
  assert.ok(['peinan', 'yuanshan', 'fengbitou'].every((k) => lit(3000).includes(k)));         // 小卡三
  assert.ok(['shihsanhang', 'qubing'].every((k) => lit(1000).includes(k)));                    // 小卡四
  for (const k of ['dapenkeng', 'yuanshan', 'peinan', 'fengbitou']) assert.ok(lab2.sites.find((s) => s.key === k).layers[k === 'yuanshan' ? 1 : 0].zh === '大坌坑文化');
  assert.ok(spanOf(lab2.sites.find((s) => s.key === 'dapenkeng')).fromAgo - spanOf(lab2.sites.find((s) => s.key === 'dapenkeng')).toAgo > 5000);   // 「五千多年間」
  Object.values(lab2.demo).forEach((k) => assert.ok(lab2.sites.some((s) => s.key === k), k));
  const src2 = readFileSync(new URL('../src/twh-sites.js', import.meta.url), 'utf8');
  L2.parts.forEach((p) => { assert.ok(new RegExp(`\\n    ${p.demo}\\(\\) \\{`).test(src2), `DEMO.${p.demo}`); assert.ok(lab2.demo[p.demo]); });
  lab2.jumps.forEach((j) => assert.ok(j.ago <= lab2.older && j.ago >= lab2.nearest));
  // 玉玦：四個重點要和 jade3d.js 的 spots 一致；尺寸照館藏資料
  const jsrc = readFileSync(new URL('../src/jade3d.js', import.meta.url), 'utf8');
  assert.equal(L2.jade.spots.length, 4);
  L2.jade.spots.forEach((sp) => assert.ok(new RegExp(`\\b${sp.key}: new Vector3`).test(jsrc), sp.key));
  assert.ok(/JADE = \{ h: 7, w: 4, t: 0\.45 \}/.test(jsrc));
  assert.ok(L2.jade.facts.some((f) => f.en.includes('70 mm') && f.en.includes('40 mm') && f.en.includes('4.5 mm')));
  // 分類遊戲：兩樣、四樣、兩樣
  assert.deepEqual(['paleo', 'neo', 'iron'].map((k) => L2.sort.items.filter((it) => it.bin === k).length), [2, 4, 2]);
  // 第一課的預告卡已經換成真的連結
  assert.ok(L.links.some((x) => x.href === '/resources/classes/taiwan-history/who-lived-here/'));
  assert.match(coast.license, /Public domain/);
}
// ── 第三課 ───────────────────────────────────────────────────────────
{
  const L3 = lessons.find((l) => l.slug === 'indigenous-peoples'), lab3 = L3.lab;
  const coast = JSON.parse(readFileSync(new URL('../src/data/coast.json', import.meta.url), 'utf8'));
  const world = JSON.parse(readFileSync(new URL('../src/data/world.json', import.meta.url), 'utf8'));
  const P = lab3.peoples;
  assert.equal(P.length, 17); assert.equal(new Set(P.map((p) => p.key)).size, 17);
  P.forEach((p) => { assert.ok(p.lon >= coast.bbox.w && p.lon <= coast.bbox.e && p.lat >= coast.bbox.s && p.lat <= coast.bbox.n, p.key); assert.ok(p.area_en && p.area_zh && p.recognized_en && /^https:\/\//.test(p.url), p.key); assert.ok(p.origin_en || p.note_en, `${p.key}：沒有起源說法時要說明為什麼`); });
  const by = (y) => P.filter((p) => p.recognized <= y).length;
  assert.equal(by(2000), 9); assert.equal(by(2001), 10); assert.equal(by(2014), 16); assert.equal(by(2026), 17);   // 課文：九族 → 十六族 → 十七族；邵族是第十族
  assert.equal(P.find((p) => p.key === 'thao').recognized, 2001);
  assert.deepEqual(lab3.changes.map((c) => c.year), [...new Set(P.map((p) => p.recognized))].sort((a, b) => a - b));   // 每一次名單改變都有說明
  assert.equal(lab3.changes.filter((c) => c.year > 2000).length, 7);    // 「2001 到 2026 年之間改變了七次」
  // 人口：各族加上尚未申報＝總數（2026 年 7 月）；2.75%
  assert.equal(P.reduce((s, p) => s + (p.pop || 0), 0) + 7727, 638466);
  assert.equal(Math.round(638466 / 23235002 * 10000) / 100, 2.75);
  assert.ok(P.find((p) => p.key === 'amis').pop > 238000);
  assert.ok(!P.find((p) => p.key === 'siraya').pop, '西拉雅族還沒有人口數');
  Object.values(lab3.demo).forEach((d) => assert.ok(P.some((p) => p.key === d.people) && d.year >= lab3.min && d.year <= lab3.max));
  const src3 = readFileSync(new URL('../src/twh-peoples.js', import.meta.url), 'utf8');
  L3.parts.forEach((p) => assert.ok(lab3.demo[p.demo], p.demo));
  assert.ok(src3.includes('for (const [k, d] of Object.entries(cfg.demo)) DEMO[k]'));
  // 南島語族的世界：地點都在世界地圖的框裡；台灣是起點
  const W = L3.world;
  assert.ok(W.places.some((p) => p.key === W.home) && W.places.some((p) => p.key === W.start));
  W.places.forEach((p) => assert.ok(p.lon >= world.bbox.w && p.lon <= world.bbox.e && p.lat >= world.bbox.s && p.lat <= world.bbox.n, p.key));
  assert.equal(Math.round((W.places.find((p) => p.key === 'easter').lon - W.places.find((p) => p.key === 'madagascar').lon)), 204);   // 地圖上的點；大英百科說兩端橫跨 206 個經度（端點不是同一個位置）
  assert.match(world.license, /Public domain/);
  // 分類遊戲：族人自己的說法 3、學者 2、政府 3
  assert.deepEqual(['own', 'study', 'gov'].map((k) => L3.sort.items.filter((it) => it.bin === k).length), [3, 2, 3]);
  assert.ok(L3.sort.done_en.startsWith('Three accounts'));
  // 第二課的預告卡已換成真的連結；最新一課的延伸閱讀要有下一課的預告卡
  assert.ok(lessons.at(-1).links.some((x) => x.soon));
  assert.ok(lessons.find((l) => l.slug === 'who-lived-here').links.some((x) => x.href === '/resources/classes/taiwan-history/indigenous-peoples/'));
}
// 時間軸上的事件由古到今
const ev = data.timeline.events.map((e) => (e.ago !== undefined ? e.ago : yearToAgo(e.year, NOW)));
assert.deepEqual(ev, [...ev].sort((a, b) => b - a));
// 全系列寫到 1996 年為止（例外：查證、發掘、指定的日期，以及第三課刻意寫到 2026 年的官方名單變動——Luke 2026-10-14 決定）
// （只看文字欄位；「3500-2000多年」「2,000 年前」這類距今的年數不是西元年，先拿掉）
JSON.stringify(data, (k, v) => (k === 'url' ? undefined : typeof v === 'number' ? 0 : v))
  .replace(/[\d,]+\s*[-∼~–]\s*[\d,]+/g, ' ').replace(/[\d,]+\s*(多)?(年前|年至|年到|年間|年歷史| years ago| years)/g, ' ')
  .replace(/\b(19\d\d|20\d\d)\b/g, (y) => { assert.ok(+y <= 1996 || ['1997', '2000', '2001', '2002', '2003', '2004', '2007', '2008', '2009', '2010', '2011', '2012', '2014', '2017', '2018', '2019', '2020', '2022', '2024', '2025', '2026', '2031'].includes(y), `year ${y}`); return y; });
// 美式拼字：常見的英式拼法不能出現（出處欄的逐字引文照原文，所以 sources 不掃）
const en = JSON.stringify(data, (k, v) => (k === 'sources' ? undefined : v)).replace(/[一-鿿]/g, '');
assert.ok(!/\b(colour|centre|metre|programme|practise|favourite|grey|whilst|towards|amongst|recognise|organise|analyse|civilisation|judgement|travell|labell|artefact|defence|neighbour|honour|catalogue|archaeolog(?:y|ist|ical)s?e)\b/i.test(en));
// 不用只從外來者角度說的字眼
assert.ok(!/發現台灣|發現臺灣|discover(ed)? Taiwan|開發/.test(JSON.stringify(data)));
console.log('data.test.mjs ok');
