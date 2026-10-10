/*
 * 電腦概論 · 第八課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initChoice(el)  [data-cp-choice]  選項題：data-tasks 是題目（answer＝選項的 key），data-opts 是 [[key, en, zh], …]。
 *                                     這一課用了兩次：「現在它是什麼樣子？」與「輸入還是輸出？」。記第一次就答對的題數。
 *   initLive(el)    [data-cp-live]    自己按一個鍵：顯示瀏覽器收到的 KeyboardEvent.code（哪一個鍵）與 key（打出什麼），
 *                                     單一字元再顯示它的編號與八個位元。
 */
export function initChoice(root) {
  const TASKS = JSON.parse(root.getAttribute('data-tasks')), OPT = JSON.parse(root.getAttribute('data-opts'));
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-gs-k'), score: $('.cp-gs-score'), q: $('.cp-jb-q'), opts: $('.cp-gs-opts'), msg: $('.cp-gs-msg'), next: $('.cp-gs-next') };
  const ask0 = root.getAttribute('data-ask').split('|');
  let i, first, tried, done;
  function ask() {
    const t = TASKS[i]; tried = false; done = false;
    R.k.innerHTML = `Question ${i + 1} of ${TASKS.length} · 第 ${i + 1} 題（共 ${TASKS.length} 題）`;
    R.q.innerHTML = `${t.en}<small>${t.zh}</small>`;
    R.opts.innerHTML = '';
    for (const [k, en, zh] of OPT) { const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-gs-opt cp-jb-opt'; b.setAttribute('data-k', k); b.innerHTML = `${en}<small>${zh}</small>`; b.addEventListener('click', () => pick(b, k)); R.opts.appendChild(b); }
    R.msg.innerHTML = `${ask0[0]}<span class="zh">${ask0[1]}</span>`;
    R.next.hidden = true;
  }
  function pick(b, k) {
    if (done) return;
    const t = TASKS[i];
    if (k === t.answer) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Right. ${t.why_en}<span class="zh">答對了。${t.why_zh}</span>`;
      R.score.textContent = `${first} / ${i + 1}`;
      R.next.hidden = false; R.next.textContent = i + 1 < TASKS.length ? 'Next · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not quite. Try another one.<span class="zh">再想想，換一個試試。</span>';
    }
  }
  function finish() {
    R.q.innerHTML = ''; R.opts.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${TASKS.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${TASKS.length} 題）。</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start() { i = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => { if (i >= TASKS.length) { start(); return; } i++; if (i >= TASKS.length) finish(); else ask(); });
  start();
  root.__choice = { start, answer: () => R.opts.querySelector(`[data-k="${TASKS[i].answer}"]`).click(), next: () => R.next.click(), state: () => ({ i, first }) };
}

export function initLive(root) {
  const $ = (s) => root.querySelector(s);
  const pad = $('.cp-lv2-pad'), R = { code: $('.cp-lv2-code'), key: $('.cp-lv2-key'), num: $('.cp-lv2-num'), bits: $('.cp-lv2-bits'), msg: $('.cp-lv2-msg') };
  let prev = null;
  function show(code, key) {
    const one = [...key].length === 1, cp = one ? key.codePointAt(0) : null;
    R.code.textContent = code || '(none)';
    R.key.textContent = key === ' ' ? '(space)' : key;
    R.num.textContent = one ? String(cp) : '—';
    R.bits.textContent = one && cp < 256 ? cp.toString(2).padStart(8, '0') : '—';
    root.classList.add('is-used');
    let en, zh;
    if (!code && key === 'Unidentified') { en = 'This keyboard did not say which key it was. On-screen keyboards often do not. Try a keyboard with real keys.'; zh = '這個鍵盤沒有說是哪一個鍵。螢幕上的虛擬鍵盤常常這樣，換一個有實體按鍵的鍵盤試試。'; }
    else if (!one) { en = `${key} does not type a character, so there is no character number. The computer still knows which key it was.`; zh = `${key} 不會打出字元，所以沒有字元的編號；但電腦還是知道你按的是哪一個鍵。`; }
    else if (prev && prev.code === code && prev.key !== key) { en = `The same key, ${code}, but a different character this time: ${prev.key === ' ' ? 'space' : prev.key} before, ${key} now. The key did not change. What the computer made of it did.`; zh = `同一個鍵（${code}），可是這次打出不一樣的字元：剛才是 ${prev.key}，現在是 ${key}。鍵沒有變，變的是電腦把它變成了什麼。`; }
    else { en = `The key is ${code}. The character is ${key === ' ' ? 'a space' : key}, number ${cp}. Now hold Shift and press the same key.`; zh = `這個鍵是 ${code}，打出的字元是${key === ' ' ? '空白' : ` ${key} `}，編號 ${cp}。現在按住 Shift，再按同一個鍵。`; }
    R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`;
    prev = { code, key };
  }
  pad.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.metaKey || e.ctrlKey || e.altKey) return;      // 不擋鍵盤操作與快速鍵
    if (e.key === 'Shift') return;                                          // 等下一個鍵
    e.preventDefault(); show(e.code, e.key);
  });
  root.__live = { show };
}
