// 每日任務規則：今天的任務有沒有達成
// 對應規則書：「每日任務與結算」；任務內容在 days.js
// 驗收：npm run check 的「每日任務規則」

import { GYOZA_IDS } from '../menu.js';

// 輸入：
//   task    今天的任務（days.js 裡的 { id, text, bonus }）
//   report  今天的營業結果，會用到的欄位：
//             report.wasteTotal  今天報廢的總份數
//             report.visits      每位客人的結果陣列，每筆有 outcome（'bought'、'sold_out'…）
//             report.sold        每樣菜賣出幾份，例如 { signature: 20, tea: 5 }
//             report.starsAfter  打烊後的星等
//             report.profit      今天的淨利（不含獎金）
// 回傳：'done'（達成）| 'failed'（沒達成）| 'wip'（施工中）
export function checkTask(task, report) {
  let achieved;
  switch (task.id) {
    case 'zero-waste':
      achieved = report.wasteTotal === 0;
      break;
    case 'no-soldout-leave':
      achieved = !report.visits.some((visit) => visit.outcome === 'sold_out');
      break;
    case 'gyoza-30': {
      const gyozaSold = GYOZA_IDS.reduce((sum, id) => sum + (report.sold[id] ?? 0), 0);
      achieved = gyozaSold >= 30;
      break;
    }
    case 'stars-4':
      achieved = report.starsAfter >= 4;
      break;
    case 'profit-800':
      achieved = report.profit >= 800;
      break;
    default:
      return 'wip';
  }
  return achieved ? 'done' : 'failed';
}
