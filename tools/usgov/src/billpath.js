/*
 * 美國政治 U.S. Government · 一個法案在國會裡走的路（第六課；純函式，test/billpath.test.mjs）。
 *
 * stages：每一站（key、所屬 who：house／senate／both／president）。
 * scenario：{ path:[站的 key…], stop:站的 key 或 null, president?:{ votes, action, adjourned } }
 *   走到 stop 那一站就停下來（法案沒有成為法律）；沒有 stop 就走完全程。
 *   有走到 president 那一站的情境，結局交給 bill.js 的 billFate 判定（和第二課同一套規則）。
 * walk(scenario, stages, bodies) → { steps:[{ key, ok }], law, fate }
 * arcPoint(a, b, t, lift)：兩站之間拋物線上的一點（紙張飛過去用）。
 */
import { billFate } from './bill.js';

export function walk(sc, stages, bodies) {
  const keys = new Set(stages.map((s) => s.key));
  for (const k of sc.path) if (!keys.has(k)) throw new Error(`unknown stage ${k}`);
  if (sc.stop && !sc.path.includes(sc.stop)) throw new Error(`stop ${sc.stop} is not on the path`);
  const steps = [];
  let fate = null;
  for (const k of sc.path) {
    if (k === sc.stop) { steps.push({ key: k, ok: false }); return { steps, law: false, fate }; }
    if (k === 'president') {
      const p = sc.president;
      if (!p) throw new Error('president stage needs a president object');
      fate = billFate(p.votes, p.action, p.adjourned, bodies);
      const law = fate.law;
      // 否決之後還要回國會：override 站決定推翻成不成功
      if (p.action === 'veto') { steps.push({ key: k, ok: true }); continue; }
      steps.push({ key: k, ok: law });
      return { steps, law, fate };
    }
    if (k === 'override') {
      const ok = !!fate && fate.key === 'overridden';
      steps.push({ key: k, ok });
      return { steps, law: ok, fate };
    }
    steps.push({ key: k, ok: true });
  }
  return { steps, law: fate ? fate.law : true, fate };
}

export function arcPoint(a, b, t, lift = 1.5) {
  const y = (a[1] || 0) + ((b[1] || 0) - (a[1] || 0)) * t + 4 * lift * t * (1 - t);
  return [a[0] + (b[0] - a[0]) * t, y, a[2] + (b[2] - a[2]) * t];
}
