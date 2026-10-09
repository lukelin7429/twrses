/*
 * 電腦概論 · 第六課：把模擬器的一個小步驟（cpu.js 的 event）說成一句英文和一句中文。
 *   describe(event, stateAfter) → { en, zh }
 *   meaning(op, arg)            → { en, zh }：這條指令是什麼意思
 */
import { cellText } from './cpu.js';

export function meaning(op, n) {
  return {
    LOAD: { en: `copy the number in cell ${n} into A`, zh: `把第 ${n} 格的數抄進 A` },
    ADD: { en: `add the number in cell ${n} to A`, zh: `把第 ${n} 格的數加到 A 上` },
    STORE: { en: `copy A into cell ${n}`, zh: `把 A 抄到第 ${n} 格` },
    JUMP: { en: `take the next instruction from cell ${n}`, zh: `下一條指令改從第 ${n} 格拿` },
    STOP: { en: 'stop', zh: '停下來' },
  }[op];
}

export function describe(ev, s) {
  if (ev.phase === 'fetch') return { en: `Fetch. The counter says ${ev.pc}, so the processor copies cell ${ev.pc} (“${cellText(ev.cell) || 'empty'}”) into the instruction register.`, zh: `拿指令。計數器是 ${ev.pc}，所以處理器把第 ${ev.pc} 格（「${cellText(ev.cell) || '空的'}」）抄進指令暫存器。` };
  if (ev.phase === 'decode') { const m = meaning(ev.op, ev.arg); return { en: `Decode. ${ev.op === 'STOP' ? 'STOP' : `${ev.op} ${ev.arg}`} means “${m.en}.”`, zh: `看懂。${ev.op === 'STOP' ? 'STOP' : `${ev.op} ${ev.arg}`} 的意思是「${m.zh}」。` }; }
  if (ev.phase === 'execute') {
    const up = { en: ` The counter goes up to ${ev.next}.`, zh: `計數器加一，變成 ${ev.next}。` };
    if (ev.op === 'LOAD') return { en: `Execute. Cell ${ev.arg} holds ${ev.value}, so A is now ${ev.value}.${up.en}`, zh: `照做。第 ${ev.arg} 格是 ${ev.value}，所以 A 現在是 ${ev.value}。${up.zh}` };
    if (ev.op === 'ADD') return { en: `Execute. The adder from Lesson 4 works out ${ev.x} + ${ev.y} = ${ev.value}, and A is now ${ev.value}.${ev.overflow ? ' The carry fell off the end, as in Lesson 1.' : ''}${up.en}`, zh: `照做。第四課的加法器算出 ${ev.x}＋${ev.y}＝${ev.value}，A 現在是 ${ev.value}。${ev.overflow ? '進位掉出去了，和第一課一樣。' : ''}${up.zh}` };
    if (ev.op === 'STORE') return { en: `Execute. A (${ev.value}) is copied into cell ${ev.arg}.${up.en}`, zh: `照做。把 A（${ev.value}）抄到第 ${ev.arg} 格。${up.zh}` };
    if (ev.op === 'JUMP') return { en: `Execute. The counter is set to ${ev.next}, so the same instructions will run again.`, zh: `照做。計數器被設成 ${ev.next}，所以同樣幾條指令會再跑一次。` };
    return { en: `Execute. The processor stops. It carried out ${s.done} instructions.`, zh: `照做。處理器停下來了，一共執行了 ${s.done} 條指令。` };
  }
  if (ev.phase === 'error') {
    if (ev.error === 'notinstruction') return { en: `Cell ${ev.pc} does not hold an instruction, so the processor cannot go on. It never asks whether a cell is meant to be an instruction or a number; it just tries to obey it.`, zh: `第 ${ev.pc} 格放的不是指令，處理器做不下去了。它從來不會問這一格到底是指令還是數，只會照著做。` };
    return { en: 'The counter points outside the memory, so there is nothing to fetch.', zh: '計數器指到記憶體外面去了，沒有東西可以拿。' };
  }
  return { en: 'The processor has stopped. Press Reset to run the program again.', zh: '處理器已經停了。按「重來」可以再跑一次。' };
}
