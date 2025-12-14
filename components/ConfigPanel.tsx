import React from 'react';
import { Upload, Download, FileSpreadsheet, X } from 'lucide-react';
import { readParticipantsFile, readPrizesFile, downloadTemplate } from '../utils/excelHelper';
import { Participant, Prize } from '../types';

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onImportParticipants: (data: Participant[]) => void;
  onImportPrizes: (data: Prize[]) => void;
  participantCount: number;
  prizeCount: number;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  isOpen, onClose, onImportParticipants, onImportPrizes, participantCount, prizeCount 
}) => {
  if (!isOpen) return null;

  const handleParticipantUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const data = await readParticipantsFile(e.target.files[0]);
        onImportParticipants(data);
        e.target.value = '';
      } catch (err) {
        alert("读取人员名单失败，请检查文件格式");
        console.error(err);
      }
    }
  };

  const handlePrizeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const data = await readPrizesFile(e.target.files[0]);
        onImportPrizes(data);
        e.target.value = '';
      } catch (err) {
        alert("读取奖品名单失败，请检查文件格式");
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="text-purple-500" />
            系统设置
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-bold text-blue-400">{participantCount}</div>
              <div className="text-sm text-slate-400">已导入人数</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-bold text-purple-400">{prizeCount}</div>
              <div className="text-sm text-slate-400">已导入奖项组</div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Participants Import */}
            <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-700 border-dashed">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">导入人员名单</h3>
                  <p className="text-sm text-slate-400">Excel包含列: 姓名, UM, 部门(选填)</p>
                </div>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  选择文件
                  <input type="file" accept=".xlsx, .xls" onChange={handleParticipantUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Prizes Import */}
            <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-700 border-dashed">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">导入奖品配置</h3>
                  <p className="text-sm text-slate-400">Excel包含列: 奖项, 奖品名称, 单次抽取数量, 图片(选填)</p>
                </div>
                <label className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  选择文件
                  <input type="file" accept=".xlsx, .xls" onChange={handlePrizeUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700">
             <button 
                onClick={downloadTemplate}
                className="text-sm text-slate-400 hover:text-white flex items-center gap-2 underline underline-offset-4"
              >
                <Download className="w-4 h-4" /> 下载Excel模板
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;