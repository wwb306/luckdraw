import React from 'react';
import { Upload, Download, FileSpreadsheet, X, Image as ImageIcon, Check } from 'lucide-react';
import { readGlobalConfigFile, downloadTemplate } from '../utils/excelHelper';
import { Participant, Prize } from '../types';

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onImportParticipants: (data: Participant[]) => void;
  onImportPrizes: (data: Prize[]) => void;
  participantCount: number;
  prizeCount: number;
  prizes: Prize[];
  onUpdatePrize: (prize: Prize) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  isOpen, onClose, onImportParticipants, onImportPrizes, participantCount, prizeCount, prizes, onUpdatePrize 
}) => {
  if (!isOpen) return null;

  const handleGlobalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const { participants, prizes } = await readGlobalConfigFile(e.target.files[0]);
        
        let message = "";
        if (participants.length > 0) {
            onImportParticipants(participants);
            message += `成功导入 ${participants.length} 人。`;
        }
        if (prizes.length > 0) {
            onImportPrizes(prizes);
            message += ` 成功导入 ${prizes.length} 个奖项。`;
        }
        
        if (!message) {
            alert("文件解析成功，但未发现有效数据。请检查Sheet名称是否为'人员名单'和'奖品配置'。");
        } else {
            alert(message);
        }

        e.target.value = ''; // Reset input
      } catch (err) {
        alert("读取文件失败，请确保使用了正确的模板。");
        console.error(err);
      }
    }
  };

  const handleImageChange = (prize: Prize, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdatePrize({ ...prize, image: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50 shrink-0">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="text-purple-500" />
            系统设置
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
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
            {/* Global Import */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-xl border border-slate-600 border-dashed text-center">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">一键导入配置</h3>
                  <p className="text-slate-400 text-sm">
                    请上传包含 <span className="text-blue-300 font-mono">人员名单</span> 和 <span className="text-purple-300 font-mono">奖品配置</span> Sheet的Excel文件
                  </p>
                </div>
                
                <label className="inline-flex cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95">
                  <Upload className="w-5 h-5" />
                  选择 Excel 文件
                  <input type="file" accept=".xlsx, .xls" onChange={handleGlobalUpload} className="hidden" />
                </label>
            </div>

            {/* Prize Image Management */}
            {prizes.length > 0 && (
              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-yellow-500" />
                    奖品图片管理
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {prizes.map(prize => (
                    <div key={prize.id} className="flex items-center justify-between bg-slate-800/80 p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Preview */}
                        <div className="w-14 h-14 rounded-lg bg-slate-900 overflow-hidden flex-shrink-0 border border-slate-600 relative group">
                          {prize.image ? (
                            <img src={prize.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                             {prize.tier}
                             {prize.image && <Check className="w-3 h-3 text-green-500" />}
                          </div>
                          <div className="text-xs text-slate-400">{prize.name}</div>
                        </div>
                      </div>
                      
                      <label className="cursor-pointer text-xs font-medium bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-md transition-all border border-slate-600 hover:border-slate-500 shadow-sm flex items-center gap-2">
                        <Upload className="w-3 h-3" />
                        {prize.image ? '更换' : '上传'}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageChange(prize, e)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/50 flex justify-end shrink-0">
             <button 
                onClick={downloadTemplate}
                className="text-sm text-slate-400 hover:text-white flex items-center gap-2 hover:underline underline-offset-4 transition-all"
              >
                <Download className="w-4 h-4" /> 下载上传文件模板
             </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;