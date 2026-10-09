/*
 * 電腦概論 · 第七課「書桌與書櫃」的純函式（不碰 DOM、不碰 three.js；npm test）。
 * 書桌＝記憶體（快、放不多、關機就清空）；書櫃＝儲存裝置（要走過去拿、放得多、關機還在）。
 *
 *   ITEMS                 書櫃上的八樣東西（key；名稱在 data/computers.json）
 *   makeDesk(cap)         → { cap, desk: [{ id, dirty }]（最近用過的排最後）, saved: { id: 版本 }, work: { id: 版本 },
 *                             power: true, trips（走到書櫃幾趟）, uses（在桌上直接拿幾次） }
 *   use(state, id)        用一樣東西。已經在桌上：直接拿（uses + 1）。不在桌上：走到書櫃抄一份過來（trips + 1）；
 *                         桌子滿了就先把最久沒用的那一樣放回書櫃（再多走一趟；沒存的修改會一起收進書櫃的暫存區，不會不見）
 *                         回傳 { state, events: [{ type: 'hit' | 'evict' | 'fetch', id }] }
 *   edit(state, id)       改桌上的東西（變成「還沒存檔」）
 *   save(state, id)       存檔：把桌上的版本抄回書櫃
 *   powerOff(state)       關機：桌面清空；沒存檔的修改不見了。回傳 { state, lost: [id] }
 *   powerOn(state)        開機：桌面是空的，書櫃和關機前一樣
 *   onDesk(state, id) / isDirty(state, id)
 *   APPS / usage(total, open)  「記憶體滿了會怎樣」的示意：每個 App 占幾 GB（**示意的數字**），超過的部分要靠儲存裝置幫忙
 */

export const ITEMS = ['essay', 'game', 'music', 'browser', 'photos', 'video', 'slides', 'chat'];

export function makeDesk(cap = 4) {
  return { cap, desk: [], saved: Object.fromEntries(ITEMS.map((k) => [k, 1])), work: {}, parked: {}, power: true, trips: 0, uses: 0 };
}
const copy = (s) => ({ ...s, desk: s.desk.map((d) => ({ ...d })), saved: { ...s.saved }, work: { ...s.work }, parked: { ...s.parked } });
export const onDesk = (s, id) => s.desk.some((d) => d.id === id);
export const isDirty = (s, id) => s.desk.some((d) => d.id === id && d.dirty) || s.parked[id] !== undefined;

export function use(state, id) {
  if (!state.power) return { state, events: [{ type: 'off', id }] };
  const s = copy(state), events = [];
  const i = s.desk.findIndex((d) => d.id === id);
  if (i >= 0) { const [d] = s.desk.splice(i, 1); s.desk.push(d); s.uses += 1; events.push({ type: 'hit', id }); return { state: s, events }; }
  if (s.desk.length >= s.cap) {
    const out = s.desk.shift(); s.trips += 1;
    if (out.dirty) s.parked[out.id] = s.work[out.id];       // 沒存的修改先暫放在書櫃（真的電腦也是把記憶體裡的東西暫時搬到儲存裝置）
    delete s.work[out.id];
    events.push({ type: 'evict', id: out.id, dirty: !!out.dirty });
  }
  const back = s.parked[id] !== undefined;
  s.work[id] = back ? s.parked[id] : s.saved[id];
  delete s.parked[id];
  s.desk.push({ id, dirty: back }); s.trips += 1;
  events.push({ type: 'fetch', id, slot: s.desk.length - 1 });
  return { state: s, events };
}

export function edit(state, id) {
  if (!state.power || !onDesk(state, id)) return state;
  const s = copy(state); s.work[id] = (s.work[id] || s.saved[id]) + 1;
  s.desk.find((d) => d.id === id).dirty = true;
  return s;
}

export function save(state, id) {
  if (!state.power || !onDesk(state, id)) return state;
  const s = copy(state); s.saved[id] = s.work[id]; s.desk.find((d) => d.id === id).dirty = false; s.trips += 1;
  return s;
}

export function powerOff(state) {
  if (!state.power) return { state, lost: [] };
  const s = copy(state);
  const lost = [...s.desk.filter((d) => d.dirty).map((d) => d.id), ...Object.keys(s.parked)];
  s.desk = []; s.work = {}; s.parked = {}; s.power = false;
  return { state: s, lost };
}

export function powerOn(state) { return state.power ? state : { ...copy(state), power: true }; }

// ── 記憶體用量的示意（數字是為了示意自己訂的，不是任何真實 App 的用量）──
export const APPS = { browser: 3, game: 4, call: 2, music: 1, photos: 3, chat: 1 };
export function usage(total, open) {
  const used = open.reduce((s, k) => s + APPS[k], 0);
  return { used, free: Math.max(0, total - used), over: Math.max(0, used - total), full: used >= total };
}
