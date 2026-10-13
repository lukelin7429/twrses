/*
 * 台灣歷史 Taiwan's Story · 地層的純函式（不碰 DOM；node test/strata.test.mjs）。
 *
 * layers[]：由上到下，每一層 { key, thick（公尺，示意）, fromAgo（這一層最古老）, toAgo（最靠近現在）, finds[] }。
 * 疊置原理：沒有被擾動的地層，越下面越古老——checkOrder() 核對資料真的照這條規則排。
 * level：挖到第幾層（0 ＝ 還沒挖，n ＝ 第 n 層挖開了）。可以是小數（正在挖）。
 */

/** 每一層的頂與底（公尺，地面＝0，往下為正）。 */
export function bounds(layers) {
  let top = 0;
  return layers.map((l) => { const b = { top, bottom: top + l.thick }; top = b.bottom; return b; });
}
export const totalDepth = (layers) => layers.reduce((s, l) => s + l.thick, 0);

/** level（可以是小數）→ 挖了多深（公尺）。 */
export function depthAt(layers, level) {
  const b = bounds(layers), n = layers.length;
  const v = Math.min(n, Math.max(0, level));
  const i = Math.min(n - 1, Math.floor(v));
  return v >= n ? b[n - 1].bottom : b[i].top + (v - i) * layers[i].thick;
}

/** 深度 → 第幾層（0 起算）；剛好在交界上算上面那一層。地面以上回傳 -1。 */
export function layerIndexAt(layers, depth) {
  if (depth <= 0) return -1;
  const b = bounds(layers);
  for (let i = 0; i < b.length; i++) if (depth <= b[i].bottom + 1e-9) return i;
  return b.length - 1;
}

/**
 * 挖到這個深度，坑底大約是多久以前（示意：在一層裡面照「十倍十倍」均勻往回走）。
 * 地面＝第一層最靠近現在的那一端。floor：最靠近現在算到距今幾年（和時間軸的 nearest 用同一個數，游標才會一路跟著動）。
 */
export function agoAtDepth(layers, depth, floor = 1) {
  const i = layerIndexAt(layers, depth);
  if (i < 0) return Math.max(floor, layers[0].toAgo);
  const b = bounds(layers)[i], l = layers[i];
  const f = Math.min(1, Math.max(0, (depth - b.top) / l.thick));
  const a = Math.log10(Math.max(floor, l.toAgo)), z = Math.log10(Math.max(floor, l.fromAgo));
  return 10 ** (a + f * (z - a));
}

/** 已經挖開的層（level 無條件捨去）裡的出土物，由上到下。 */
export function foundSoFar(layers, level) {
  const n = Math.min(layers.length, Math.floor(level + 1e-9));
  return layers.slice(0, n).flatMap((l, i) => l.finds.map((f) => ({ ...f, layer: i })));
}

/** 疊置原理的核對：每一層 fromAgo > toAgo，而且下面那一層不比上面那一層年輕。 */
export function checkOrder(layers) {
  const errs = [];
  layers.forEach((l, i) => {
    if (!(l.fromAgo > l.toAgo)) errs.push(`${l.key}: fromAgo must be older than toAgo`);
    if (!(l.thick > 0)) errs.push(`${l.key}: thick must be positive`);
    if (i && l.toAgo < layers[i - 1].fromAgo) errs.push(`${l.key}: is younger than the layer above it`);
    l.finds.forEach((f) => {
      if (f.intrusive) return;
      if (f.ago > l.fromAgo || f.ago < l.toAgo) errs.push(`${f.key}: age ${f.ago} is outside its layer (${l.fromAgo}–${l.toAgo})`);
    });
  });
  return errs;
}

/**
 * 後來挖的坑（擾動）：pit＝{ from（從第幾層的頂往下挖，0 起算）, into（挖到第幾層） }。
 * 坑裡的東西和「開挖的那一層」同年代，卻躺在比較深的地方——所以它比旁邊的土年輕。
 */
export function intrusionYoungerThanNeighbors(layers, pit, find) {
  const src = layers[pit.from], host = layers[pit.into];
  return find.ago <= src.fromAgo && find.ago < host.toAgo;
}
