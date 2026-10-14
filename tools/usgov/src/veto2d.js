/*
 * 美國政治 U.S. Government ·「否決之後還有幾條路？」（不需要 WebGL）：一項法案送到總統桌上之後的幾種結局。
 * 兩支滑桿是眾議院與參議院的贊成票（各有兩個記號：過半數、三分之二）；三個按鈕是總統的選擇（簽署／否決／十天內不簽也不退回）；
 * 一個開關是「國會已經休會」。結局由 bill.js 的 billFate 算出來。
 * 席次、文字與歷史紀錄在 data/us_government.json 的 veto（標了來源與年份），build.py 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-ug-veto]').__veto（state、act(key)、vote({ house, senate })、adjourn(bool)、info()）
 */
import { billFate, thresholds } from './bill.js';

export function initVeto(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const B = data.bodies, T = thresholds(B);
  const st = { action: 'veto', adjourned: false, votes: { ...data.start } };
  const resEl = $('.ug-vt-result'), adj = $('.ug-vt-adj input'), adjRow = $('.ug-vt-adj');
  const sl = { house: $('[data-vote="house"]'), senate: $('[data-vote="senate"]') };
  for (const k of Object.keys(sl)) {
    sl[k].max = B[k]; sl[k].value = st.votes[k];
    const row = sl[k].closest('.ug-am-row');
    row.querySelector('.ug-vt-m1').style.left = `${(T[k].majority / B[k]) * 100}%`;
    row.querySelector('.ug-vt-m2').style.left = `${(T[k].two_thirds / B[k]) * 100}%`;
    row.querySelector('.ug-am-need').textContent = `${T[k].majority} · ${T[k].two_thirds}`;
  }
  function draw() {
    root.querySelectorAll('[data-act]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.act === st.action)));
    adjRow.classList.toggle('is-off', st.action !== 'wait');
    adj.checked = st.adjourned;
    const r = billFate(st.votes, st.action, st.adjourned, B);
    for (const k of Object.keys(sl)) {
      const row = sl[k].closest('.ug-am-row');
      const v = st.votes[k];
      row.classList.toggle('is-pass', v >= T[k].majority);
      row.classList.toggle('is-super', v >= T[k].two_thirds);
      row.querySelector('.ug-am-val').textContent = String(v);
      sl[k].style.setProperty('--p', `${(v / B[k]) * 100}%`);
    }
    const m = data.results[r.key];
    const where = r.short ? data.short[r.short] : null;
    resEl.className = `ug-am-result ug-vt-result is-${r.law ? 'law' : 'nolaw'}`;
    resEl.innerHTML = `<b>${r.law ? 'It is a law. · 成為法律。' : 'It is not a law. · 沒有成為法律。'}</b> ${m.en}${where ? ' ' + where.en : ''}<span class="zh">${m.zh}${where ? where.zh : ''}</span>`;
  }
  const api = {
    state: st, thresholds: T,
    act(k) { st.action = k; draw(); },
    vote(v) { Object.assign(st.votes, v); for (const k of Object.keys(sl)) sl[k].value = st.votes[k]; draw(); },
    adjourn(on) { st.adjourned = !!on; draw(); },
    info() { return { ...st, fate: billFate(st.votes, st.action, st.adjourned, B) }; },
  };
  root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => api.act(b.dataset.act)));
  adj.addEventListener('change', () => api.adjourn(adj.checked));
  for (const k of Object.keys(sl)) sl[k].addEventListener('input', () => { st.votes[k] = +sl[k].value; draw(); });
  root.querySelectorAll('[data-vt-set]').forEach((b) => b.addEventListener('click', () => api.vote(data.sets[b.dataset.vtSet])));
  draw();
  root.__veto = api;
  return api;
}
