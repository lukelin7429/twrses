/*
 * 電腦概論 · 第十四課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 * 學生打的字一律用 textContent 顯示，不用 innerHTML。
 *
 *   initCipher(el)  [data-cp-cipher]  自己加密、解密：打一句英文、選金鑰（位移 1–25），看密文；可切換成「解密」
 *   initSpy(el)     [data-cp-spy]     當偷看的人：一段不知道金鑰的密文，25 種位移全部列出來，點出看得懂的那一行
 *   initKeys(el)    [data-cp-keys]    金鑰有幾把：位元數從 1 到 256，顯示 2 的 n 次方（BigInt 算的完整數字）
 */
import { BITS, CAESAR_KEYS, SPY_ROUNDS, bruteForce, digits, group, keyCount, shift, unshift } from './cipher.js';

export function initCipher(root) {
  const $ = (s) => root.querySelector(s);
  const R = { src: $('.cp-ci-src'), k: $('.cp-ci-k'), kv: $('.cp-ci-kv'), out: $('.cp-ci-out'), modes: [...root.querySelectorAll('[data-dir]')], lab: $('.cp-ci-lab'), top: $('.cp-ci-top'), bot: $('.cp-ci-bot') };
  let dir = 'enc';
  function show() {
    const k = Number(R.k.value); R.kv.textContent = String(k);
    R.out.textContent = dir === 'enc' ? shift(R.src.value, k) : unshift(R.src.value, k);
    R.modes.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-dir') === dir ? 'true' : 'false'));
    R.lab.textContent = dir === 'enc' ? 'Your message · 你的訊息' : 'The secret text · 密文';
    R.top.textContent = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; R.bot.textContent = shift('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k);
  }
  R.src.addEventListener('input', show); R.k.addEventListener('input', show);
  R.modes.forEach((b) => b.addEventListener('click', () => { const d = b.getAttribute('data-dir'); if (d !== dir) { R.src.value = R.out.textContent; dir = d; } show(); }));
  show();
  root.__cipher = { set: (text, k, d = 'enc') => { R.src.value = text; R.k.value = String(k); dir = d; show(); }, state: () => ({ out: R.out.textContent, k: Number(R.k.value), dir }) };
}

export function initSpy(root) {
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-sp-k'), code: $('.cp-sp-code'), list: $('.cp-sp-list'), msg: $('.cp-sp-msg'), next: $('.cp-sp-next'), score: $('.cp-sp-score') };
  let i = 0, wrong = 0, done = false, total = 0;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function ask() {
    const r = SPY_ROUNDS[i], c = shift(r.plain, r.k); wrong = 0; done = false;
    R.k.textContent = `Message ${i + 1} of ${SPY_ROUNDS.length} · 第 ${i + 1} 則（共 ${SPY_ROUNDS.length} 則）`;
    R.code.textContent = c; R.list.textContent = ''; R.next.hidden = true;
    for (const t of bruteForce(c)) {
      const li = document.createElement('li'), b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-k', String(t.k));
      const n = document.createElement('i'); n.textContent = String(t.k); const s = document.createElement('span'); s.textContent = t.text; b.appendChild(n); b.appendChild(s);
      b.addEventListener('click', () => pick(b, t.k)); li.appendChild(b); R.list.appendChild(li);
    }
    say(`You caught this message, but you do not know the key. Here it is with every one of the ${CAESAR_KEYS} keys tried. Tap the line that is real English.`, `你攔到了這則訊息，可是不知道金鑰。下面是 ${CAESAR_KEYS} 把金鑰全部試過的結果。點出那一行真正的英文。`);
  }
  function pick(b, k) {
    if (done) return;
    if (k === SPY_ROUNDS[i].k) {
      done = true; total += wrong + 1; b.classList.add('is-right'); R.list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.score.textContent = String(i + 1);
      say(`Broken. The key was ${k}. You did not need to be clever: with only ${CAESAR_KEYS} keys, it is enough to try them all.`, `破解了。金鑰是 ${k}。你不需要多聰明：金鑰只有 ${CAESAR_KEYS} 把，全部試一遍就夠了。`);
      R.next.hidden = false; R.next.textContent = i + 1 < SPY_ROUNDS.length ? 'Next message · 下一則' : 'Start again · 再來一次';
    } else { wrong++; b.classList.add('is-wrong'); b.disabled = true; say('That line is not English. Keep looking.', '那一行不是英文。再找找看。'); }
  }
  R.next.addEventListener('click', () => { i = (i + 1) % SPY_ROUNDS.length; if (i === 0) { R.score.textContent = '0'; total = 0; } ask(); });
  ask();
  root.__spy = { answer: () => R.list.querySelector(`[data-k="${SPY_ROUNDS[i].k}"]`).click(), next: () => R.next.click(), state: () => ({ i, done, code: R.code.textContent, rows: R.list.children.length }) };
}

export function initKeys(root) {
  const $ = (s) => root.querySelector(s);
  const R = { range: $('.cp-kb-range'), bits: $('.cp-kb-bits'), n: $('.cp-kb-n'), dg: $('.cp-kb-dg'), msg: $('.cp-kb-msg') };
  R.range.min = '0'; R.range.max = String(BITS.length - 1); R.range.step = '1';
  function set(i) {
    const b = BITS[i], n = keyCount(b), d = digits(n);
    R.range.value = String(i); R.bits.textContent = String(b); R.n.textContent = group(n); R.dg.textContent = String(d);
    root.setAttribute('data-size', d > 20 ? 'huge' : d > 9 ? 'big' : 'small');
    R.msg.innerHTML = b < 5
      ? `A key of ${b} bit${b === 1 ? '' : 's'} can be one of only ${group(n)} keys. That is even fewer than the ${CAESAR_KEYS} keys of the letter-shift cipher.<span class="zh">${b} 個位元的金鑰，只有 ${group(n)} 種可能。比字母位移的 ${CAESAR_KEYS} 把還少。</span>`
      : b === 5 ? `With 5 bits there are 32 keys, a few more than the ${CAESAR_KEYS} of the letter-shift cipher. Trying them all is still easy.<span class="zh">5 個位元有 32 把金鑰，比字母位移的 ${CAESAR_KEYS} 把多一點。全部試一遍還是很容易。</span>`
        : `A key of ${b} bits can be any one of ${group(n)} keys. That number has ${d} digits. Every extra bit doubles it.<span class="zh">${b} 個位元的金鑰有 ${group(n)} 種可能。這個數有 ${d} 位數。每多一個位元，它就加倍。</span>`;
  }
  R.range.addEventListener('input', () => set(Number(R.range.value)));
  set(5);
  root.__keys = { set, state: () => ({ bits: R.bits.textContent, n: R.n.textContent, digits: R.dg.textContent }) };
}
