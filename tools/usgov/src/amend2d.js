/*
 * 美國政治 U.S. Government ·「改一個字有多難？」（不需要 WebGL）：走一次憲法第五條的修憲程序。
 * 兩種提案方式 × 兩種批准方式；每條路線要過哪幾關、各要幾票（amend.js 用席次與州數算出來）、歷史上用過幾次。
 * 下面三支滑桿可以自己試票數：眾議院、參議院的贊成票與批准的州數。
 * 席次、州數、歷史紀錄與文字都在 data/us_government.json 的 amend（標了來源與年份），build.py 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-ug-amend]').__amend（state、choose(propose, ratify)、vote({ house, senate, states })、info()）
 */
import { gates, majority, need, tally } from './amend.js';

export function initAmend(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const B = data.bodies;
  const st = { propose: 'congress', ratify: 'legislatures', votes: { ...data.start } };
  const gatesEl = $('.ug-am-gates'), usedEl = $('.ug-am-used'), resEl = $('.ug-am-result');
  const sl = { house: $('[data-vote="house"]'), senate: $('[data-vote="senate"]'), states: $('[data-vote="states"]') };
  const needOf = { house: need(B.house, 2, 3), senate: need(B.senate, 2, 3), states: need(B.states, 3, 4) };
  for (const k of Object.keys(sl)) {
    sl[k].max = B[k]; sl[k].value = st.votes[k];
    const row = sl[k].closest('.ug-am-row');
    row.querySelector('.ug-am-mark').style.left = `${(needOf[k] / B[k]) * 100}%`;
    row.querySelector('.ug-am-need').textContent = `needs ${needOf[k]} · 門檻 ${needOf[k]}`;
  }

  function draw() {
    root.querySelectorAll('[data-propose]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.propose === st.propose)));
    root.querySelectorAll('[data-ratify]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ratify === st.ratify)));
    const g = gates(st.propose, st.ratify, B);
    gatesEl.innerHTML = g.map((x) => {
      const t = data.gates[x.key];
      const num = x.need == null ? '' : `<b class="ug-am-n">${x.need}<small>of ${x.total}</small></b>`;
      return `<li>${num}<span><span class="ug-am-g">${t.en}</span><span class="zh">${t.zh}</span></span></li>`;
    }).join('');
    const u = data.used[`${st.propose}+${st.ratify}`];
    usedEl.innerHTML = `<b>${u.count_en}</b> ${u.en}<span class="zh"><b>${u.count_zh}</b> ${u.zh}</span>`;
    usedEl.className = `ug-am-used ${u.never ? 'is-never' : ''}`;
    const r = tally(st.votes, B);
    for (const k of Object.keys(sl)) {
      const row = sl[k].closest('.ug-am-row');
      row.classList.toggle('is-pass', r[k]);
      row.querySelector('.ug-am-val').textContent = String(st.votes[k]);
      sl[k].style.setProperty('--p', `${(st.votes[k] / B[k]) * 100}%`);
    }
    const key = r.ratified ? 'ratified' : r.proposed ? 'proposed' : r.ordinary ? 'ordinary' : 'fails';
    const m = data.results[key];
    resEl.className = `ug-am-result is-${key}`;
    resEl.innerHTML = `${m.en}<span class="zh">${m.zh}</span>`;
  }
  const api = {
    state: st, needOf, majority: { house: majority(B.house), senate: majority(B.senate) },
    choose(p, r) { if (p) st.propose = p; if (r) st.ratify = r; draw(); },
    vote(v) { Object.assign(st.votes, v); for (const k of Object.keys(sl)) sl[k].value = st.votes[k]; draw(); },
    info() { return { ...st, gates: gates(st.propose, st.ratify, B), tally: tally(st.votes, B) }; },
  };
  root.querySelectorAll('[data-propose]').forEach((b) => b.addEventListener('click', () => api.choose(b.dataset.propose, null)));
  root.querySelectorAll('[data-ratify]').forEach((b) => b.addEventListener('click', () => api.choose(null, b.dataset.ratify)));
  for (const k of Object.keys(sl)) sl[k].addEventListener('input', () => { st.votes[k] = +sl[k].value; draw(); });
  root.querySelectorAll('[data-am-set]').forEach((b) => b.addEventListener('click', () => api.vote(data.sets[b.dataset.amSet])));
  draw();
  root.__amend = api;
  return api;
}
