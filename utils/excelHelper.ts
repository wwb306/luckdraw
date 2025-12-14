import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import { Participant, Prize } from '../types';

export const readParticipantsFile = async (file: File): Promise<Participant[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet) as any[];

        const participants: Participant[] = json.map((row) => ({
          id: crypto.randomUUID(),
          name: String(row['姓名'] || row['Name'] || '').trim(),
          um: String(row['UM'] || row['工号'] || row['ID'] || '').trim(),
          department: row['部门'] || row['Department']
        })).filter(p => p.name && p.um); // Filter out empty rows

        resolve(participants);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsBinaryString(file);
  });
};

export const readPrizesFile = async (file: File): Promise<Prize[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet) as any[];

        const prizes: Prize[] = json.map((row) => ({
          id: crypto.randomUUID(),
          tier: row['奖项'] || row['Tier'] || '奖项',
          name: row['奖品名称'] || row['Prize Name'] || '未命名奖品',
          count: parseInt(row['单次抽取数量'] || row['数量'] || row['Count'] || '1', 10),
          image: row['图片'] || row['Image'] || row['URL'] || undefined,
          winners: []
        }));

        resolve(prizes);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsBinaryString(file);
  });
};

export const exportWinners = (prizes: Prize[]) => {
  const data: any[] = [];
  
  prizes.forEach(prize => {
    prize.winners.forEach(winner => {
      data.push({
        '奖项': prize.tier,
        '奖品名称': prize.name,
        '中奖人姓名': winner.name,
        '中奖人UM': winner.um,
        '部门': winner.department || ''
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "中奖名单");
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `中奖名单_${new Date().toISOString().slice(0,10)}.xlsx`);
};

export const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    
    // Participants Template
    const wsParticipants = XLSX.utils.json_to_sheet([
        { "姓名": "张三", "UM": "zhangsan01", "部门": "技术部" },
        { "姓名": "李四", "UM": "lisi02", "部门": "人力资源" }
    ]);
    XLSX.utils.book_append_sheet(wb, wsParticipants, "人员名单模板");

    // Prizes Template
    const wsPrizes = XLSX.utils.json_to_sheet([
        { "奖项": "一等奖", "奖品名称": "MacBook Pro", "单次抽取数量": 1, "图片": "https://example.com/macbook.png" },
        { "奖项": "二等奖", "奖品名称": "iPad Air", "单次抽取数量": 5, "图片": "" },
        { "奖项": "三等奖", "奖品名称": "京东卡", "单次抽取数量": 10, "图片": "" }
    ]);
    XLSX.utils.book_append_sheet(wb, wsPrizes, "奖品配置模板");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, '抽奖配置模板.xlsx');
}