import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import { Participant, Prize } from '../types';

// Helper to parse participants from a raw JSON array
const parseParticipants = (json: any[]): Participant[] => {
  return json.map((row) => ({
    id: crypto.randomUUID(),
    name: String(row['姓名'] || row['Name'] || '').trim(),
    um: String(row['UM'] || row['工号'] || row['ID'] || '').trim(),
    department: row['部门'] || row['Department']
  })).filter(p => p.name && p.um);
};

// Helper to parse prizes from a raw JSON array
const parsePrizes = (json: any[]): Prize[] => {
  return json.map((row) => ({
    id: crypto.randomUUID(),
    tier: row['奖项'] || row['Tier'] || '奖项',
    name: row['奖品名称'] || row['Prize Name'] || '未命名奖品',
    count: parseInt(row['单次抽取数量'] || row['数量'] || row['Count'] || '1', 10),
    image: row['图片'] || row['Image'] || row['URL'] || undefined,
    winners: []
  }));
};

export const readGlobalConfigFile = async (file: File): Promise<{ participants: Participant[], prizes: Prize[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        let participants: Participant[] = [];
        let prizes: Prize[] = [];

        // 1. Parse Participants (Look for sheet "人员名单")
        // If not found, try to find a sheet that looks like it (has "姓名" column) or default to first sheet if only 1 sheet exists?
        // Let's be strict based on user requirement: Search for specific sheet names first.
        
        let participantSheetName = workbook.SheetNames.find(name => name.includes('人员') || name.includes('名单') || name.toLowerCase().includes('participant'));
        let prizeSheetName = workbook.SheetNames.find(name => name.includes('奖品') || name.includes('配置') || name.toLowerCase().includes('prize'));

        // Fallback: If explicit names not found, assume Sheet1 is People, Sheet2 is Prizes (if exists)
        if (!participantSheetName && workbook.SheetNames.length > 0) participantSheetName = workbook.SheetNames[0];
        if (!prizeSheetName && workbook.SheetNames.length > 1) prizeSheetName = workbook.SheetNames[1];

        if (participantSheetName) {
            const sheet = workbook.Sheets[participantSheetName];
            const json = XLSX.utils.sheet_to_json(sheet) as any[];
            participants = parseParticipants(json);
        }

        if (prizeSheetName) {
            const sheet = workbook.Sheets[prizeSheetName];
            const json = XLSX.utils.sheet_to_json(sheet) as any[];
            prizes = parsePrizes(json);
        }

        if (participants.length === 0 && prizes.length === 0) {
            throw new Error("未识别到有效数据，请确保Excel包含'人员名单'或'奖品配置'工作表");
        }

        resolve({ participants, prizes });
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsBinaryString(file);
  });
};

export const readParticipantsFile = async (file: File): Promise<Participant[]> => {
    // Keep for backward compatibility if needed, but essentially wrapping the above logic or simple single sheet logic
    const { participants } = await readGlobalConfigFile(file);
    return participants;
};

export const readPrizesFile = async (file: File): Promise<Prize[]> => {
    const { prizes } = await readGlobalConfigFile(file);
    return prizes;
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
    
    // Sheet 1: Participants
    const wsParticipants = XLSX.utils.json_to_sheet([
        { "姓名": "张三", "UM": "zhangsan01", "部门": "技术部" },
        { "姓名": "李四", "UM": "lisi02", "部门": "人力资源" },
        { "姓名": "王五", "UM": "wangwu03", "部门": "市场部" }
    ]);
    XLSX.utils.book_append_sheet(wb, wsParticipants, "人员名单");

    // Sheet 2: Prizes
    const wsPrizes = XLSX.utils.json_to_sheet([
        { "奖项": "一等奖", "奖品名称": "MacBook Pro", "单次抽取数量": 1 },
        { "奖项": "二等奖", "奖品名称": "iPad Air", "单次抽取数量": 2 },
        { "奖项": "三等奖", "奖品名称": "京东卡500元", "单次抽取数量": 5 }
    ]);
    XLSX.utils.book_append_sheet(wb, wsPrizes, "奖品配置");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, '年会抽奖配置模板.xlsx');
}