// 對照 NASA 日月食表驗證 ephem.js：node test/ephem.test.mjs
import { findEclipses, localVisibility, moonPos, syzygyNear } from '../src/ephem.js';
const fmt = (d) => new Date(d.getTime() + 8 * 3600000).toISOString().slice(0, 16).replace('T', ' ');
const evs = findEclipses(new Date('2019-12-01T00:00Z'), 60);
for (const e of evs) {
  const v = localVisibility(e);
  const vis = e.kind === 'lunar'
    ? (v.visible ? (v.whole ? 'TW:whole' : 'TW:part ') : 'TW:no   ')
    : (v.visible ? `TW:${(v.cover * 100).toFixed(0).padStart(3)}%  ` : 'TW:no   ');
  const extra = e.kind === 'lunar' && e.total ? ` total ${fmt(e.total[0]).slice(11)}–${fmt(e.total[1]).slice(11)}` : '';
  console.log(`${fmt(e.max)} TW  ${e.kind.padEnd(5)} ${e.type.padEnd(9)} mag ${e.mag.toFixed(3)}  ${vis}${extra}`);
}
