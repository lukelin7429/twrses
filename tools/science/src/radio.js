/*
 * 萬物原理 · 第六課「手機訊號怎麼在空中傳遞？」的無線電計算（純函式，test/signal.test.mjs 會跑）。
 *
 * 無線電波是電磁波，以光速前進；波長（公尺）＝ 300 ÷ 頻率（MHz）：700 MHz 約 43 公分、3.5 GHz 約 8.6 公分。
 * 訊號強度（示意）：自由空間在 100 公尺處的損失（20 log d + 20 log f + 32.44），之後照地面上常見的
 *   「距離每增加十倍，多損失 35 dB」往下掉（路徑損耗指數 3.5）。頻率越高，同樣距離損失越多。
 * 山擋住視線時再加一段繞射損失：高頻比低頻多（刀鋒繞射的損失隨頻率變大）。數字是教學用的示意，不是任何業者的實測。
 * 訊號格數：手機各廠牌的換算不同，這裡用 −85／−95／−105／−115 dBm 當 4／3／2／1 格的門檻（示意）。
 */
export const C = 299792458;
export const TX_DBM = 30;
export const N_EXP = 3.5;
export const BANDS = {
  low: { mhz: 700, en: 'Low band (700 MHz)', zh: '低頻（700 MHz）', block: 18 },
  high: { mhz: 3500, en: 'High band (3.5 GHz, 5G)', zh: '高頻（3.5 GHz，5G）', block: 28 },
};

export const wavelengthM = (mhz) => C / (mhz * 1e6);
export const fspl = (km, mhz) => 20 * Math.log10(km) + 20 * Math.log10(mhz) + 32.44;

export function pathLoss(km, mhz) {
  const d = Math.max(0.05, km);
  if (d <= 0.1) return fspl(d, mhz);
  return fspl(0.1, mhz) + 10 * N_EXP * Math.log10(d / 0.1);
}

export function rxDbm(km, band, blocked) {
  const b = BANDS[band];
  return TX_DBM - pathLoss(km, b.mhz) - (blocked ? b.block : 0);
}

export function bars(dbm) {
  if (dbm >= -85) return 4;
  if (dbm >= -95) return 3;
  if (dbm >= -105) return 2;
  if (dbm >= -115) return 1;
  return 0;
}

// 光速走 d 公里要幾微秒
export const travelMicroseconds = (km) => km * 1000 / C * 1e6;
