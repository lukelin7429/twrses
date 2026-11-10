// 第十課的資料：兩個宗教的地球儀、「信徒相信，還是史料顯示？」、「同一個詞，三種語言」、時間軸、固定的卡。node test/faiths.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { matchOptions } from '../src/dharma.js';
import { checkSite, checkFaithRoute, visible, siteYear } from '../src/faith.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[2].lessons.find((l) => l.slug === 'christianity-islam');
assert.ok(L); assert.equal(L.n, 10); assert.equal(L.lab.kind, 'faith');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then', 'curric', 'culture_cards']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
for (const s of L.sources) assert.ok(s.src && /^https:\/\//.test(s.url), s.en);
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO'), 'no TODO left'); assert.ok(!all.includes('example.org'), 'no placeholder URL');
// 用詞：課文一律寫「基督宗教」當總稱（課綱的「基督教」只出現在課綱卡）；不出現比較高下的字眼
for (const p of L.paras_zh) assert.ok(!p.includes('基督教的') || p.includes('基督宗教'), p.slice(0, 20));
for (const bad of ['better religion', 'true religion', 'false religion', 'superior', 'primitive', '比較高級', '落後的宗教']) assert.ok(!all.includes(bad), bad);

// 地球儀
{
  const lab = L.lab, keys = new Set(lab.sites.map((s) => s.key)), by = Object.fromEntries(lab.sites.map((s) => [s.key, s]));
  assert.equal(keys.size, lab.sites.length, 'unique keys');
  for (const s of lab.sites) {
    assert.ok(isLand(s.at), `${s.key} on land`);
    assert.equal(checkSite(s), null, s.key);
    assert.ok(['tradition', 'evidence'].includes(s.tag), s.key);
    assert.ok(s.year >= lab.from && s.year <= lab.to && (s.year2 == null || s.year2 <= lab.to), s.key);
    for (const f of ['what_en', 'what_zh', 'when_en', 'when_zh', 'how_en', 'how_zh', 'src', 'url', 'short_en', 'short_zh']) assert.ok(s[f], `${s.key}.${f}`);
  }
  for (const r of lab.routes) assert.equal(checkFaithRoute(r, lab.sites), null, r.key);
  // 每個地方至少有一條同一個宗教的路線碰到它（起點除外）
  for (const s of lab.sites) for (const f of s.faiths) {
    if ((f === 'christian' && s.key === 'jerusalem') || (f === 'islam' && s.key === 'mecca')) continue;
    const hit = lab.routes.some((r) => r.faith === f && r.pts.some((w) => Math.abs(w[0] - s.at[0]) < 0.05 && Math.abs(w[1] - s.at[1]) < 0.05));
    assert.ok(hit, `${s.key} reached by a ${f} route`);
  }
  // 起點：最早的基督宗教地方是耶路撒冷，最早的伊斯蘭教地方是麥加
  const first = (f) => lab.sites.filter((s) => s.faiths.includes(f)).sort((a, b) => siteYear(a, f) - siteYear(b, f))[0].key;
  assert.equal(first('christian'), 'jerusalem'); assert.equal(first('islam'), 'mecca');
  // 兩個宗教都有的地方
  assert.deepEqual(lab.sites.filter((s) => s.faiths.length === 2).map((s) => s.key).sort(), ['constantinople', 'jerusalem']);
  assert.equal(by.jerusalem.year2, 691); assert.equal(by.constantinople.year2, 1453);
  // 傳統說法和史料
  for (const k of ['antioch', 'alexandria', 'kerala', 'armenia', 'ireland', 'mecca', 'medina']) assert.equal(by[k].tag, 'tradition', k);
  for (const k of ['rome', 'nicomedia', 'aksum', 'changan', 'damascus', 'pasai']) assert.equal(by[k].tag, 'evidence', k);
  // 卡片上的年代和亮起來的年代一致
  for (const k of ['rome', 'nicomedia', 'kerala', 'armenia', 'constantinople', 'ireland', 'changan', 'medina', 'mecca', 'damascus', 'baghdad', 'cordoba', 'delhi', 'pasai']) assert.ok(by[k].when_en.includes(String(by[k].year)), k);
  assert.ok(by.jerusalem.also_en.includes('691')); assert.ok(by.constantinople.also_en.includes('1453')); assert.ok(by.cordoba.how_en.includes('1236'));
  // 篩選
  assert.equal(visible(lab.sites, 'islam', 600).length, 0);
  assert.ok(visible(lab.sites, 'christian', 1500).length === lab.sites.filter((s) => s.faiths.includes('christian')).length);
  // 示範
  assert.deepEqual(L.parts.map((p) => p.demo), lab.demos.map((d) => d.key));
  for (const d of lab.demos) assert.ok(d.year >= lab.from && d.year <= lab.to && d.look.length === 3, d.key);
}

// 「信徒相信，還是史料顯示？」：兩個籃子、兩個宗教的題目一樣多、玩得完
{
  const S = L.legend, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['tradition', 'evidence']);
  for (const k of keys) assert.equal(S.items.filter((it) => it.answer === k).length, 5, k);
  const isl = S.items.filter((it) => /Muhammad|Quran|Dome/.test(it.en)).length;
  assert.equal(isl, S.items.length / 2, 'half the items about each religion');
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}

// 「同一個詞，三種語言」：希臘文五個、阿拉伯文五個；選項分得出來
{
  const T = L.terms, n = T.items.length;
  assert.equal(n, 10);
  for (const it of T.items) { assert.ok(it.zh && it.en && it.note_en && it.note_zh && it.orig, it.zh); assert.ok(['Greek', 'Arabic'].includes(it.lang), it.zh); }
  assert.equal(T.items.filter((it) => it.lang === 'Greek').length, 5);
  assert.equal(new Set(T.items.map((it) => `${it.orig}|${it.en}`)).size, n, 'options distinguishable');
  const by = Object.fromEntries(T.items.map((it) => [it.zh, it]));
  assert.equal(by['基督'].orig, 'Christos'); assert.equal(by['古蘭經'].orig, 'Qurʾān'); assert.equal(by['朝覲'].orig, 'ḥajj');
  for (let i = 0; i < n; i++) assert.ok(matchOptions(n, i).includes(i));
}

// 時間軸：都在範圍內；希吉拉在穆罕默德的一生裡；君士坦丁的時候羅馬西部還在
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  const life = evs.find((e) => e.en === 'The life of Muhammad'), hijra = evs.find((e) => e.en.startsWith('The Hijra'));
  assert.ok(life.from > hijra.from && life.to < hijra.from);
  const rome = evs.find((e) => e.en.startsWith('The Roman Empire')), milan = evs.find((e) => e.en.startsWith('Christianity becomes legal'));
  assert.ok(rome.from > milan.from && rome.to < milan.from);
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第九課連到這一課；這一課的下一課是製作中的第十一課
const L9 = data.units[2].lessons.find((l) => l.n === 9);
assert.ok(L9.links.some((x) => x.href === '/resources/classes/world-history/christianity-islam/'));
assert.ok(!L9.links.some((x) => x.soon && /Christianity/.test(x.en)));
assert.ok(L.links[0].soon && /Knowledge/.test(L.links[0].en));
console.log(`faiths.test.mjs ok (${L.lab.sites.length} places, ${L.lab.routes.length} routes, ${L.terms.items.length} terms, ${L.legend.items.length} cards)`);
