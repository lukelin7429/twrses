/*
 * 美國政治 U.S. Government · 一項法案送到總統之後的幾種結局（純函式，test/bill.test.mjs）。
 *
 * 憲法第一條第七項：兩院通過 → 送總統。總統簽署就成為法律；退回（否決）後，兩院各三分之二再通過就推翻否決；
 * 十天內（星期日不算）不簽也不退回：國會還在開會就自動成為法律，國會已經休會讓他無從退回就不成為法律（口袋否決，不能推翻）。
 * 席次由呼叫的人給（頁面資料的 veto.bodies，標了年份）。三分之二是「出席並投票的議員」的三分之二，這裡算的是全員到齊投票的情形，
 * 並假設推翻否決時每位議員投的票和通過法案時一樣。
 */
import { majority, need } from './amend.js';

export const ACTIONS = ['sign', 'veto', 'wait'];

/**
 * votes = { house, senate }（贊成票）；action = 'sign' | 'veto' | 'wait'；adjourned = 國會是否已休會（只影響 wait）。
 * 回傳 { law, key, short }：key 是結局（fail_congress／signed／unsigned_law／pocket／overridden／sustained），
 * short 是差在哪一院（'house'｜'senate'｜'both'｜null）。
 */
export function billFate(votes, action, adjourned, bodies) {
  const mh = majority(bodies.house), ms = majority(bodies.senate);
  const th = need(bodies.house, 2, 3), ts = need(bodies.senate, 2, 3);
  const which = (h, s) => (!h && !s ? 'both' : !h ? 'house' : !s ? 'senate' : null);
  const passH = votes.house >= mh, passS = votes.senate >= ms;
  if (!passH || !passS) return { law: false, key: 'fail_congress', short: which(passH, passS) };
  if (action === 'sign') return { law: true, key: 'signed', short: null };
  if (action === 'wait') return adjourned ? { law: false, key: 'pocket', short: null } : { law: true, key: 'unsigned_law', short: null };
  if (action === 'veto') {
    const oh = votes.house >= th, os = votes.senate >= ts;
    return oh && os ? { law: true, key: 'overridden', short: null } : { law: false, key: 'sustained', short: which(oh, os) };
  }
  throw new Error(`unknown action: ${action}`);
}

/** 兩院各自的兩個門檻：過半數（通過法案）與三分之二（推翻否決） */
export function thresholds(bodies) {
  return {
    house: { majority: majority(bodies.house), two_thirds: need(bodies.house, 2, 3) },
    senate: { majority: majority(bodies.senate), two_thirds: need(bodies.senate, 2, 3) },
  };
}

/** 總統要讓否決站得住，最少需要幾位議員支持（任何一院擋下來就夠） */
export function sustainers(bodies) {
  return { house: bodies.house - need(bodies.house, 2, 3) + 1, senate: bodies.senate - need(bodies.senate, 2, 3) + 1 };
}
