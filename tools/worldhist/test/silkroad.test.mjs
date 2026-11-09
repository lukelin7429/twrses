// 第九課的資料：絲路的地球儀、「往東還是往西？」、「哪一件先發生？」、時間軸、固定的卡。node test/silkroad.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeSort, judgeOrder } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { checkRoute, fmtYear, reached } from '../src/dharma.js';
import { checkGood, handoffs } from '../src/silk.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const unit3 = data.units[2];
const L = unit3.lessons.find((l) => l.slug === 'silk-roads');
assert.ok(L); assert.equal(L.n, 9); assert.equal(L.lab.kind, 'silk');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO'), 'no TODO left'); assert.ok(!all.includes('example.org'), 'no placeholder URL');

// 地球儀：城市都在陸地上、有卡片的三段與出處；路線年代不倒退、和城市一致；每件東西的旅程都說得通
{
  const lab = L.lab, keys = new Set(lab.cities.map((c) => c.key));
  assert.equal(keys.size, lab.cities.length, 'unique keys');
  for (const c of lab.cities) {
    assert.ok(isLand(c.at), `${c.key} on land`);
    assert.ok(c.year >= lab.from && c.year <= lab.to, c.key);
    for (const f of ['what_en', 'what_zh', 'when_en', 'when_zh', 'how_en', 'how_zh', 'src', 'url', 'short_en', 'short_zh']) assert.ok(c[f], `${c.key}.${f}`);
  }
  for (const r of lab.routes) {
    assert.equal(checkRoute(r, lab.cities), null, r.key);
    for (const w of r.pts) { const k = w.find((x) => typeof x === 'string' && x !== 'sea'); if (k) assert.ok(keys.has(k), `${r.key}: ${k}`); }
  }
  assert.ok(lab.routes.some((r) => r.kind === 'land') && lab.routes.some((r) => r.kind === 'sea'));
  for (const g of lab.goods) {
    assert.equal(checkGood(g, lab.cities), null, g.key);
    assert.ok(['east', 'west'].includes(g.dir), g.key);
    for (const l of g.legs) assert.ok(l.en && l.zh, g.key);
    assert.ok(g.note_en && g.note_zh && g.src && g.url, g.key);
  }
  const by = Object.fromEntries(lab.goods.map((g) => [g.key, g]));
  assert.equal(handoffs(by.horses), 0, 'horses came back with Han envoys');
  assert.ok(handoffs(by.silk) >= 2, 'silk changed hands several times');
  // 卡片上寫的年份和亮起來的年份一致（大約的年代除外）
  for (const k of ['changan', 'samarkand', 'palmyra', 'constantinople', 'palembang', 'baghdad', 'belitung', 'malacca']) {
    const c = lab.cities.find((x) => x.key === k), y = c.year;
    assert.ok(c.when_en.includes(y < 0 ? `${-y} BCE` : `${y}`) || c.when_en.includes(`mid-1st century`), `${k}: ${c.when_en}`);
  }
  assert.ok(lab.cities.find((c) => c.key === 'chuy').when_en.includes('1338'));
  assert.deepEqual(reached(lab.cities, -138).map((c) => c.key), ['changan']);
  assert.equal(reached(lab.cities, lab.to).length, lab.cities.length);
  const demos = new Set(lab.demos.map((d) => d.key));
  for (const p of L.parts) assert.ok(demos.has(p.demo), p.demo);
  for (const d of lab.demos) if (d.good) assert.ok(by[d.good] && d.year >= by[d.good].year, d.key);
  assert.equal(fmtYear(by.silk.year).en, '100 CE');
}

// 「往東還是往西？」：兩個籃子各四題，玩得完；「哪一件先發生？」：答案的順序排得出來
{
  const S = L.eastwest, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['east', 'west']);
  for (const k of keys) assert.equal(S.items.filter((it) => it.answer === k).length, 4, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
  const W = L.when, right = W.items.slice().sort((a, b) => b.older - a.older).map((it) => it.key);
  assert.deepEqual(right, W.items.map((it) => it.key), 'items listed in order');
  assert.ok(judgeOrder(W.items, right).ok);
  for (const it of W.items) assert.ok(it.when_en && it.when_zh && it.older >= it.nearer, it.key);
}

// 時間軸：都在範圍內；漢朝和羅馬重疊；甘英在兩者都還在的時候
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  const han = evs.find((e) => e.en === 'The Han dynasty'), rome = evs.find((e) => e.en.startsWith('The Roman Empire')), gan = evs.find((e) => e.from === yearToAgo(97));
  assert.ok(gan && han.from > gan.from && han.to < gan.from && rome.from > gan.from && rome.to < gan.from);
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第八課連到這一課；單元三的第九課不在製作中
const L8 = data.units[1].lessons.find((l) => l.n === 8);
assert.ok(L8.links.some((x) => x.href === '/resources/classes/world-history/silk-roads/'));
assert.ok(!unit3.planned.some((p) => p.n === 9));
console.log(`silkroad.test.mjs ok (${L.lab.cities.length} cities, ${L.lab.routes.length} routes, ${L.lab.goods.length} journeys, ${L.eastwest.items.length} cards)`);
