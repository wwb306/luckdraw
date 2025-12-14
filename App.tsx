import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Settings, Play, Square, RefreshCcw, Download, Gift, Users } from 'lucide-react';
import ConfigPanel from './components/ConfigPanel';
import Sidebar from './components/Sidebar';
import { exportWinners } from './utils/excelHelper';
import { Participant, Prize } from './types';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [currentPrizeId, setCurrentPrizeId] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [displayParticipants, setDisplayParticipants] = useState<Participant[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  
  const rollIntervalRef = useRef<number | null>(null);

  const currentPrize = prizes.find(p => p.id === currentPrizeId);
  const batchSize = currentPrize ? (currentPrize.count - currentPrize.winners.length) : 1;
  const isFinished = currentPrize && currentPrize.winners.length >= currentPrize.count;

  // Calculate available participants
  const getAvailableParticipants = useCallback(() => {
    const allWinners = new Set(prizes.flatMap(p => p.winners.map(w => w.id)));
    return participants.filter(p => !allWinners.has(p.id));
  }, [participants, prizes]);

  const handleStart = () => {
    if (!currentPrize) {
      alert("请先在左侧选择一个奖项");
      return;
    }
    if (isFinished) {
      alert("该奖项已抽取完毕");
      return;
    }
    
    const available = getAvailableParticipants();
    if (available.length === 0) {
      alert("已无人员可参与抽奖！");
      return;
    }

    // Determine how many we can draw in this round
    const drawCount = Math.min(batchSize, available.length);
    if (drawCount === 0) return;

    setIsRolling(true);

    // Animation: Cycle random participants into the slots
    rollIntervalRef.current = window.setInterval(() => {
      const randomParts: Participant[] = [];
      for (let i = 0; i < drawCount; i++) {
        const randomIdx = Math.floor(Math.random() * available.length);
        randomParts.push(available[randomIdx]);
      }
      setDisplayParticipants(randomParts);
    }, 50);
  };

  const handleStop = () => {
    if (!rollIntervalRef.current || !currentPrize) return;

    clearInterval(rollIntervalRef.current);
    rollIntervalRef.current = null;
    setIsRolling(false);

    const available = getAvailableParticipants();
    if (available.length === 0) return;

    // Determine exact number to draw
    const drawCount = Math.min(batchSize, available.length);

    // Pick unique winners securely
    // Create a shuffled copy of indices to pick from
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const winners = shuffled.slice(0, drawCount);

    // Update display with the winners
    setDisplayParticipants(winners);

    // Update Prize State with new winners
    setPrizes(prev => prev.map(p => {
      if (p.id === currentPrize.id) {
        return { ...p, winners: [...p.winners, ...winners] };
      }
      return p;
    }));

    // Celebration
    triggerConfetti();
  };

  const handleReset = () => {
    if (window.confirm("确定要重置所有抽奖数据吗？这将清空所有中奖记录。")) {
      setPrizes(prev => prev.map(p => ({ ...p, winners: [] })));
      setDisplayParticipants([]);
      setIsRolling(false);
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    }
  };

  const updatePrize = (updatedPrize: Prize) => {
    setPrizes(prev => prev.map(p => p.id === updatedPrize.id ? updatedPrize : p));
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#a855f7', '#ec4899', '#eab308']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#a855f7', '#ec4899', '#eab308']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Reset display when prize changes
  useEffect(() => {
    setDisplayParticipants([]);
    setIsRolling(false);
    if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
        rollIntervalRef.current = null;
    }
  }, [currentPrizeId]);

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar 
        prizes={prizes} 
        currentPrizeId={currentPrizeId} 
        onSelectPrize={setCurrentPrizeId} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
        
        {/* Top Bar */}
        <header className="h-20 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md flex justify-between items-center px-8 shrink-0 z-10">
          <div className="flex items-center gap-3">
             <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg shadow-purple-900/50">
                <Gift className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                年会抽奖系统
             </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => exportWinners(prizes)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700"
            >
              <Download className="w-4 h-4" /> 导出结果
            </button>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-200 hover:text-red-400 hover:border-red-900 rounded-lg text-sm font-medium transition-all border border-slate-700"
            >
              <RefreshCcw className="w-4 h-4" /> 重置
            </button>
            <button 
              onClick={() => setShowConfig(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
          
          {currentPrize ? (
             <div className="w-full max-w-[1600px] flex flex-col items-center gap-10">
                
                {/* 1. Rolling Area / Stage */}
                <div className="w-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

                    {displayParticipants.length > 0 ? (
                        <div className={`
                            grid gap-8 w-full transition-all duration-300 z-10
                            ${displayParticipants.length === 1 ? 'grid-cols-1 max-w-lg' : ''}
                            ${displayParticipants.length > 1 && displayParticipants.length <= 4 ? 'grid-cols-2 max-w-4xl' : ''}
                            ${displayParticipants.length > 4 && displayParticipants.length <= 8 ? 'grid-cols-3 md:grid-cols-4' : ''}
                            ${displayParticipants.length > 8 ? 'grid-cols-4 md:grid-cols-5' : ''}
                        `}>
                            {displayParticipants.map((p, idx) => (
                                <div 
                                    key={idx}
                                    className={`
                                        relative flex flex-col items-center justify-center bg-slate-800 border-2 rounded-2xl shadow-2xl overflow-hidden p-6 group
                                        ${displayParticipants.length === 1 ? 'h-64' : 'h-48'}
                                        ${isRolling ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-105' : 'border-yellow-500/50 shadow-yellow-500/10'}
                                    `}
                                >
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40">
                                        <Gift className="w-8 h-8" />
                                    </div>
                                    
                                    <span className={`
                                        font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-200 text-center
                                        ${displayParticipants.length === 1 ? 'text-6xl mb-4' : 'text-3xl mb-2'}
                                    `}>
                                        {p.name}
                                    </span>
                                    <span className={`
                                        font-mono text-slate-400 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700
                                        ${displayParticipants.length === 1 ? 'text-2xl' : 'text-sm'}
                                    `}>
                                        {p.um}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center space-y-6 py-12 z-10">
                            <div className="inline-flex p-6 rounded-full bg-slate-800 border border-slate-700 text-slate-500">
                                <Users className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl text-slate-400 font-medium">准备好开始了吗？</h3>
                            <p className="text-slate-500 text-lg">
                                本轮将抽取 <span className="text-purple-400 font-bold text-xl mx-1">{Math.max(0, currentPrize.count - currentPrize.winners.length)}</span> 位幸运儿
                            </p>
                        </div>
                    )}
                </div>

                {/* 2. Controls */}
                <div className="z-10">
                    {!isRolling ? (
                        <button 
                            onClick={handleStart}
                            disabled={!currentPrize || isFinished}
                            className="group relative px-14 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-2xl text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-4"
                        >
                            <Play className="w-8 h-8 fill-current" />
                            {isFinished ? '该奖项已结束' : '开始抽奖'}
                        </button>
                    ) : (
                        <button 
                            onClick={handleStop}
                            className="group px-14 py-5 bg-red-600 hover:bg-red-500 rounded-full font-bold text-2xl text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
                        >
                            <Square className="w-8 h-8 fill-current" />
                            停止滚动
                        </button>
                    )}
                </div>

                {/* 3. Winners List (History for current prize) */}
                {currentPrize.winners.length > 0 && (
                    <div className="w-full bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-700 mt-2 shadow-xl">
                        <div className="p-6 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <Gift className="w-6 h-6 text-yellow-500" />
                                获奖名单 ({currentPrize.winners.length})
                            </h3>
                            <span className="text-sm text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                                {currentPrize.name}
                            </span>
                        </div>
                        <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {currentPrize.winners.map((winner) => (
                                <div key={winner.id} className="bg-slate-700/60 p-5 rounded-xl border border-slate-600 flex flex-col items-center gap-2 hover:bg-slate-700 hover:border-slate-500 transition-all hover:scale-105 shadow-sm">
                                    <span className="text-white font-bold text-xl md:text-2xl truncate w-full text-center">{winner.name}</span>
                                    <span className="text-sm md:text-base text-slate-400 font-mono bg-slate-800/50 px-2 py-0.5 rounded">{winner.um}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
             </div>
          ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-pulse mt-20">
                  <div className="p-8 bg-slate-800 rounded-full mb-8">
                     <Gift className="w-20 h-20 text-slate-600" />
                  </div>
                  <p className="text-2xl font-medium">请在左侧选择一个奖项开始抽奖</p>
                  <p className="text-lg mt-3 text-slate-600">选择后将展示对应的奖品图和剩余名额</p>
              </div>
          )}
        </main>

        {/* Configuration Modal */}
        <ConfigPanel 
            isOpen={showConfig} 
            onClose={() => setShowConfig(false)}
            onImportParticipants={setParticipants}
            onImportPrizes={setPrizes}
            participantCount={participants.length}
            prizeCount={prizes.length}
            prizes={prizes}
            onUpdatePrize={updatePrize}
        />
      </div>
    </div>
  );
}

export default App;