import React from 'react';
import { BotConfig } from '../types';
import { Play, Pause, AlertTriangle, Activity, Settings, Terminal } from 'lucide-react';

interface BotCardProps {
  bot: BotConfig;
  onToggle: (id: string) => void;
}

export const BotCard: React.FC<BotCardProps> = ({ bot, onToggle }) => {
  const isSimulating = bot.status === 'simulating';
  const isActive = bot.status === 'active';

  return (
    <div className={`relative p-6 rounded-[32px] border backdrop-blur-xl transition-all duration-300 group overflow-hidden ${
      isActive 
        ? 'bg-slate-800/60 border-cyan-500/20 shadow-2xl shadow-cyan-500/5 hover:border-cyan-500/40' 
        : isSimulating
          ? 'bg-slate-800/40 border-yellow-500/20 border-dashed'
          : 'bg-slate-900/40 border-slate-800 grayscale opacity-80'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl flex-shrink-0 ${
            isActive ? 'bg-cyan-500/10 text-cyan-400' : isSimulating ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-700/30 text-slate-400'
          }`}>
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-lg leading-tight">{bot.name}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block ${
              isActive 
                ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-400'
                : isSimulating
                  ? 'bg-yellow-950/30 border-yellow-500/30 text-yellow-400'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}>
              {bot.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => onToggle(bot.id)}
          className={`p-3 rounded-full transition-colors flex-shrink-0 ${
            isActive || isSimulating 
              ? 'bg-slate-900/50 hover:bg-red-500/20 text-red-400' 
              : 'bg-slate-800 hover:bg-emerald-500/20 text-emerald-400'
          }`}
        >
          {isActive || isSimulating ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="bg-slate-950/30 p-3 rounded-2xl border border-slate-800/50">
          <p className="text-xs text-slate-400 mb-1">Allocation</p>
          <p className="text-xl font-mono font-medium text-slate-200">{bot.allocationPct}%</p>
        </div>
        <div className="bg-slate-950/30 p-3 rounded-2xl border border-slate-800/50">
          <p className="text-xs text-slate-400 mb-1">PnL</p>
          <p className={`text-xl font-mono font-medium ${bot.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {bot.pnl >= 0 ? '+' : ''}${bot.pnl.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Parameters Preview */}
      <div className="bg-slate-950/50 rounded-2xl p-4 text-xs font-mono text-slate-400 mb-6 overflow-hidden border border-slate-800/50 relative z-10">
        <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800/50 pb-2">
          <Terminal size={12} />
          <span className="font-bold">LIVE CONFIG</span>
        </div>
        <pre className="whitespace-pre-wrap truncate opacity-70">
          {JSON.stringify(bot.params, null, 2).replace(/{|}/g, '').trim()}
        </pre>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${bot.riskScore > 70 ? 'bg-red-500' : bot.riskScore > 40 ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
              style={{ width: `${bot.riskScore}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-500">RISK: {bot.riskScore}</span>
        </div>
        <button className="text-xs font-medium flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
          <Settings size={14} /> Configure
        </button>
      </div>
      
      {isSimulating && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 text-yellow-500 text-[10px] font-bold bg-yellow-950 px-3 py-1 rounded-full border border-yellow-500/30 shadow-lg z-20">
          <AlertTriangle size={12} /> SIMULATION
        </div>
      )}
    </div>
  );
};