/*
 * 電腦概論 · 第十一課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initSlice(el)  [data-cp-slice]  調時間片：三個程式（下載、作文、音樂）輪流用一個處理器，時間軸一格一格上色。
 *                                   時間片太短→換手占掉太多時間；太長→排最後的音樂等太久（示意門檻見 sched.js）。
 *   「這是誰的工作？」八題用 key2d.js 的 initChoice（通用選項題）。
 */
import { APPS3, STUTTER, WASTE, WIDGET_SLICES, roundRobin } from './sched.js';

export function initSlice(root) {
  const $ = (s) => root.querySelector(s);
  const R = { range: $('.cp-sl-range'), val: $('.cp-sl-val'), strip: $('.cp-sl-strip'), total: $('.cp-sl-total'), gap: $('.cp-sl-gap'), sw: $('.cp-sl-sw'), msg: $('.cp-sl-msg') };
  R.range.min = '0'; R.range.max = String(WIDGET_SLICES.length - 1); R.range.step = '1';
  function set(i) {
    const k = WIDGET_SLICES[i], s = roundRobin(APPS3, k, 1), pct = Math.round(s.switchShare * 100), gap = s.maxGap.music;
    R.range.value = String(i); R.val.textContent = String(k);
    R.strip.innerHTML = s.segs.map((g) => `<i class="${g.id ? `is-${g.id}` : 'is-sw'}" style="flex:${g.t1 - g.t0}"></i>`).join('');
    R.total.textContent = String(s.total); R.gap.textContent = String(gap); R.sw.textContent = `${pct}%`;
    const zone = s.switchShare >= WASTE ? 'waste' : gap > STUTTER ? 'stutter' : 'ok';
    root.setAttribute('data-zone', zone);
    R.msg.innerHTML = zone === 'waste'
      ? `Each program gets only ${k} beat at a time. Nobody waits long, but ${pct}% of the processor’s time goes to switching, and everything finishes late, at beat ${s.total}.<span class="zh">每個程式一次只做 ${k} 拍。誰都不用等很久，可是處理器有 ${pct}% 的時間花在換手上，全部做完已經是第 ${s.total} 拍，很晚。</span>`
      : zone === 'stutter'
        ? `Each program keeps the processor for up to ${k} beats. Little time is lost to switching, but the music has to wait as long as ${gap} beats for its turn. In this example, a wait of more than ${STUTTER} beats means the sound would break up.<span class="zh">每個程式一次最多占用處理器 ${k} 拍。換手浪費的時間很少，可是音樂最久要等 ${gap} 拍才輪得到。在這個例子裡，等超過 ${STUTTER} 拍，聲音就會斷斷續續。</span>`
        : `A slice of ${k} beats works well here. The music never waits more than ${gap} beats, and only ${pct}% of the time goes to switching.<span class="zh">時間片 ${k} 拍，在這裡剛剛好。音樂最久只等 ${gap} 拍，花在換手的時間也只有 ${pct}%。</span>`;
  }
  R.range.addEventListener('input', () => set(Number(R.range.value)));
  set(2);
  root.__slice = { set, state: () => ({ slice: WIDGET_SLICES[Number(R.range.value)], zone: root.getAttribute('data-zone'), total: R.total.textContent, gap: R.gap.textContent, sw: R.sw.textContent }) };
}
