import React from 'react';
import { Prize } from '../types';
import { Gift, Trophy, ChevronDown, Award } from 'lucide-react';

interface SidebarProps {
  prizes: Prize[];
  currentPrizeId: string | null;
  onSelectPrize: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ prizes, currentPrizeId, onSelectPrize }) => {
  const currentPrize = prizes.find(p => p.id === currentPrizeId);

  return (
    <div className="w-[420px] bg-slate-800 border-r border-slate-700 flex flex-col h-full shrink-0 z-20 shadow-2xl relative transition-all duration-300">
      {/* Header */}
      <div className="p-8 border-b border-slate-700 bg-slate-900/50">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          奖项选择
        </h2>
      </div>
      
      <div className="flex-1 p-8 flex flex-col gap-10 overflow-y-auto custom-scrollbar">
        {/* Dropdown Selection */}
        <div className="relative z-20 shrink-0">
            <label className="block text-base text-slate-400 mb-3 font-medium">当前抽取奖项</label>
            <div className="relative group">
                <select 
                    value={currentPrizeId || ''}
                    onChange={(e) => onSelectPrize(e.target.value)}
                    className="w-full appearance-none bg-slate-700 border border-slate-600 text-white text-xl py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg cursor-pointer hover:bg-slate-600 transition-all font-semibold pr-12"
                >
                    <option value="" disabled>-- 请选择奖项 --</option>
                    {prizes.map(p => {
                        const remaining = p.count - p.winners.length;
                        return (
                            <option key={p.id} value={p.id}>
                                {p.tier} - {p.name} {remaining === 0 ? '(已抽完)' : ''}
                            </option>
                        );
                    })}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-white transition-colors">
                    <ChevronDown className="w-6 h-6" />
                </div>
             </div>
        </div>

        {/* Prize Image Display */}
        <div className="flex-1 flex flex-col items-center min-h-0">
             {currentPrize ? (
                 <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    
                    {/* Image Container - Fixed Height Forced */}
                    <div className="relative w-full h-[340px] bg-slate-900 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl mb-8 group shrink-0">
                        {currentPrize.image ? (
                            <img 
                                src={currentPrize.image} 
                                alt="prize" 
                                className="w-full h-full object-contain bg-slate-900" 
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                <Gift className="w-32 h-32 text-slate-700 drop-shadow-lg" />
                            </div>
                        )}
                        {/* Overlay Badge */}
                        <div className="absolute top-0 left-0 bg-purple-600 text-white text-base font-bold px-4 py-2 rounded-br-xl shadow-lg z-10">
                            {currentPrize.tier}
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white text-center mb-4 drop-shadow-md shrink-0">
                        {currentPrize.name}
                    </h3>
                    
                    {/* Stats Card */}
                    <div className="w-full bg-slate-700/50 rounded-xl p-5 border border-slate-600 mt-2 shrink-0">
                        <div className="flex justify-between items-center text-base mb-3">
                            <span className="text-slate-300">中奖进度</span>
                            <span className="text-white font-mono font-bold text-lg">
                                {currentPrize.winners.length} / {currentPrize.count}
                            </span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-700 ease-out ${
                                    currentPrize.winners.length === currentPrize.count ? 'bg-green-500' : 'bg-purple-500'
                                }`} 
                                style={{ width: `${(currentPrize.winners.length / currentPrize.count) * 100}%` }}
                            />
                        </div>
                    </div>
                 </div>
             ) : (
                 <div className="flex flex-col items-center justify-center h-80 text-slate-500 opacity-60">
                    <Award className="w-24 h-24 mb-6" />
                    <p className="text-lg">请选择左上角的奖项</p>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;