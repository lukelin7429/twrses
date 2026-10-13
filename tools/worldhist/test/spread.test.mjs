// 第一課的資料與純函式：路線從非洲出發、年代不倒退、地點都在陸地上、「誰先到」只用範圍判定。node test/spread.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { routePoints, regionState, overlaps, judgeOrder, midOrder, makeSort } from '../src/spread.js';
import { frontAt, inRing, angle } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const nearLand = (pt, d = 0.6) => [[0, 0], [d, 0], [-d, 0], [0, d], [0, -d]].some(([a, b]) => isLand([pt[0] + a, pt[1] + b]));

// 系列：七個單元、二十八課、課次連號
assert.equal(data.units.length, 7);
const all = data.units.flatMap((u) => [...u.lessons, ...u.planned]).map((l) => l.n).sort((a, b) => a - b);
assert.deepEqual(all, Array.from({ length: 28 }, (_, i) => i + 1));
const L = data.units[0].lessons[0], lab = L.lab;
assert.equal(L.n, 1);
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6);
assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5); assert.equal(L.questions.length, 3);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.equal(L.culture_cards.cards.length, 4);
// 四張固定的卡
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], `missing ${k}`);
assert.equal(L.phrases.rows.length, 8);
for (const r of L.phrases.rows) { assert.ok(!/[<>]/.test(r.en)); assert.equal(r.html.replace(/<[^>]+>/g, ''), r.en); }
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src, 'every view needs a source'); }

// 路線：年代不倒退；主要路線的起點在非洲（撒哈拉以南到紅海西岸的方框）而且在陸地上
const inAfrica = ([lon, lat]) => lon > -18 && lon < 44 && lat > -35 && lat < 32;
const byKey = {};
for (const r of lab.routes) {
  const pts = routePoints(r, 1);
  byKey[r.key] = pts;
  assert.ok(pts.length > 5, r.key);
  for (let i = 1; i < pts.length; i++) assert.ok(pts[i].ago <= pts[i - 1].ago + 1e-6, `${r.key} goes back in time`);
  assert.ok(pts[0].ago <= lab.from_ago);
  if (r.kind === 'voyage') continue;                       // 航行的起點是小島（陸地資料裡太小的島沒有收），不檢查
  for (const w of r.pts) if (!w.includes('sea')) assert.ok(nearLand(w, 1.2), `${r.key} waypoint ${w.slice(0, 2)} should be on or beside land`);
}
for (const k of ['early', 'north', 'south']) assert.ok(inAfrica(lab.routes.find((r) => r.key === k).pts[0]), `${k} starts in Africa`);
// 最早出現的路線，起點在非洲；整個故事裡沒有比它更早的線
const earliest = lab.routes.slice().sort((a, b) => b.pts[0][2] - a.pts[0][2])[0];
assert.ok(inAfrica(earliest.pts[0]));
// 後面的路線接在前面的路線已經走到的地方（接點的年代不能比前一條到達那裡更早）
const joins = { east: 'north', asia: 'east', siberia: 'north', coast: 'asia', corridor: 'asia', lapita: 'austronesian', polynesia: 'lapita', hawaii: 'polynesia', rapanui: 'polynesia', aotearoa: 'polynesia' };
for (const [child, parent] of Object.entries(joins)) {
  const c = byKey[child][0], P = byKey[parent];
  let best = P[0], bd = 1e9;
  for (const p of P) { const d = angle(p.p, c.p); if (d < bd) { bd = d; best = p; } }
  assert.ok(bd < 1.5, `${child} should start on ${parent} (off by ${bd.toFixed(1)}°)`);
  assert.ok(c.ago <= best.ago + 1, `${child} leaves before ${parent} gets there`);
}
// 渡海的段落：到澳洲那一條一定有；橫越太平洋的幾條除了起點全部是海
assert.ok(byKey.east.some((p) => p.sea) && byKey.east.some((p) => !p.sea));
for (const k of ['lapita', 'polynesia', 'hawaii', 'rapanui', 'aotearoa']) assert.ok(byKey[k].slice(1).every((p) => p.sea), k);
assert.ok(byKey.asia.every((p) => !p.sea));
// 每一條路線抵達某個地區的時間，落在那個地區的估計範圍裡
const reg = Object.fromEntries(lab.regions.map((g) => [g.key, g]));
const arrive = (k) => byKey[k][byKey[k].length - 1].ago;
const within = (ago, g) => ago <= g.older && ago >= g.nearer;
assert.ok(within(byKey.east.find((p) => p.p[1] < -11 && p.p[0] > 129).ago, reg.sahul));
assert.ok(within(arrive('europe'), reg.europe) || arrive('europe') <= reg.europe.nearer);
assert.ok(within(byKey.europe[0].ago, reg.europe));
assert.ok(within(arrive('coast'), { older: reg.americas.older, nearer: 14000 }));
for (const k of ['hawaii', 'rapanui', 'aotearoa']) assert.ok(within(arrive(k), { older: 810, nearer: 710 }), k);   // 西元 1190–1290 年
assert.ok(within(arrive('lapita'), reg.pacific));
// 時間滑桿：30 萬年前什麼都還沒出發；滑到底全部走完
for (const k of Object.keys(byKey)) { assert.equal(frontAt(byKey[k], lab.from_ago + 1), null, k); assert.ok(frontAt(byKey[k], lab.to_ago).done, k); }

// 地區：範圍 older >= nearer；時間到了才亮
for (const g of lab.regions) { assert.ok(g.older >= g.nearer); assert.ok(g.range_en && g.range_zh); assert.ok(nearLand(g.at, 3) || g.key === 'pacific'); }
assert.equal(regionState(reg.sahul, 70000), 'not');
assert.equal(regionState(reg.sahul, 60000), 'maybe');
assert.equal(regionState(reg.sahul, 50000), 'yes');
assert.equal(regionState(reg.africa, 300000), 'yes');
assert.deepEqual(lab.regions.filter((g) => regionState(g, lab.from_ago) !== 'not').map((g) => g.key), ['africa']);
assert.ok(lab.regions.every((g) => regionState(g, lab.to_ago) === 'yes'));

// 發現地點：都在陸地上；台灣的八仙洞在裡面
for (const s of lab.sites) {
  assert.ok(nearLand(s.at), `${s.key} should be on land`);
  assert.ok(s.older >= s.nearer && s.older <= lab.from_ago);
  for (const f of ['en', 'zh', 'where_en', 'where_zh', 'what_en', 'what_zh', 'dated_en', 'dated_zh']) assert.ok(s[f], `${s.key}.${f}`);
}
const bx = lab.sites.find((s) => s.key === 'baxian');
assert.ok(bx && bx.at[0] > 120 && bx.at[0] < 122 && bx.at[1] > 22 && bx.at[1] < 25);

// 誰先到？
const items = L.order.items;
assert.deepEqual(midOrder(items), ['africa', 'wasia', 'sahul', 'europe', 'americas', 'aotearoa']);
assert.ok(judgeOrder(items, midOrder(items)).ok);
assert.ok(overlaps(items[2], items[3]));                                 // 澳洲與歐洲的範圍重疊
{
  const swap = ['africa', 'wasia', 'europe', 'sahul', 'americas', 'aotearoa'];
  const r = judgeOrder(items, swap);
  assert.ok(r.ok, 'either order of an overlapping pair is accepted');
  assert.deepEqual(r.open, [['europe', 'sahul']]);
  const bad = judgeOrder(items, ['africa', 'americas', 'wasia', 'sahul', 'europe', 'aotearoa']);
  assert.ok(!bad.ok);
  assert.deepEqual(bad.wrong, [['wasia', 'americas'], ['sahul', 'americas'], ['europe', 'americas']]);
  assert.ok(!judgeOrder(items, midOrder(items).reverse()).ok);
  assert.throws(() => judgeOrder(items, ['africa', 'africa', 'wasia', 'sahul', 'europe', 'americas']));
}
// 只有一對範圍重疊，其餘都分得出先後
{
  let n = 0;
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) if (overlaps(items[i], items[j])) n++;
  assert.equal(n, 1);
}

// 三種證據
{
  const S = L.sort, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['fossil', 'tool', 'dna', 'none']);
  for (const it of S.items) assert.ok(keys.includes(it.answer));
  for (const k of keys) assert.ok(S.items.some((it) => it.answer === k), `no question for ${k}`);
  const g = makeSort(S.items, keys);
  assert.equal(g.next(), false);                                         // 還沒選對不能下一題
  const wrong = keys.find((k) => k !== S.items[0].answer);
  assert.deepEqual(g.pick(wrong), { right: false, firstTry: false });
  assert.ok(g.pick(wrong).repeat);
  assert.deepEqual(g.pick(S.items[0].answer), { right: true, firstTry: false });
  assert.equal(g.state.first, 0);
  assert.ok(g.next());
  for (let i = 1; i < S.items.length; i++) { assert.ok(g.pick(S.items[i].answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done); assert.equal(g.state.first, S.items.length - 1);
  assert.equal(g.pick('dna'), null);
  g.reset(); assert.equal(g.state.i, 0); assert.equal(g.state.first, 0);
  assert.throws(() => g.pick('magic'));
}

// 平行時間軸：每件事都排得進七條線，而且在 40 萬年前到西元 2000 年之間
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const lanes = LANES.map((l) => l.key);
  for (const e of T.events) {
    assert.ok(lanes.includes(e.lane), e.en);
    assert.ok(sc.has(e.from) && (e.to == null || sc.has(e.to)), e.en);
    if (e.to != null) assert.ok(e.from > e.to, e.en);
  }
  for (const k of ['africa', 'wasia', 'europe', 'easia', 'oceania', 'americas']) assert.ok(T.events.some((e) => e.lane === k), `lane ${k} is empty`);
  assert.ok(T.lesson.from <= T.from && T.lesson.to >= T.to);
  assert.equal(sc.has(yearToAgo(2000)), true);
}
console.log(`spread.test.mjs ok (${lab.routes.length} routes, ${lab.sites.length} sites)`);
