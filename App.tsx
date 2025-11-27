import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  ShieldCheck, 
  Settings, 
  Bell, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  AlertOctagon,
  Globe,
  Wallet,
  CreditCard,
  Key,
  Copy,
  CheckCircle,
  Users,
  Hexagon,
  LogOut
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { INITIAL_STATE, TRANSLATIONS, PLANS, SUPPORTED_EXCHANGES } from './constants';
import { AppState, RiskProfile, Language, SupportedExchange } from './types';
import { BotCard } from './components/BotCard';
import { GeminiChat } from './components/GeminiChat';
import { LandingPage } from './components/LandingPage';

// --- Charts Data (Mock) ---
const PNL_DATA = [
  { name: '00:00', value: 10000 },
  { name: '04:00', value: 10050 },
  { name: '08:00', value: 10120 },
  { name: '12:00', value: 10080 },
  { name: '16:00', value: 10150 },
  { name: '20:00', value: 10210 },
  { name: '23:59', value: 10180 },
];
const COLORS = ['#0891b2', '#0f766e', '#0e7490', '#155e75'];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bots' | 'risk' | 'settings'>('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [selectedExchangeId, setSelectedExchangeId] = useState<SupportedExchange>('binance');

  // Language Auto-Detection
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'pt') setState(prev => ({ ...prev, language: 'pt' }));
    else if (browserLang === 'es') setState(prev => ({ ...prev, language: 'es' }));
    else setState(prev => ({ ...prev, language: 'en' }));
  }, []);

  const t = TRANSLATIONS[state.language];

  const handleProfileChange = (newProfile: RiskProfile) => {
    setState(prev => ({ ...prev, profile: newProfile }));
  };

  const toggleBot = (botId: string) => {
    setState(prev => ({
      ...prev,
      bots: prev.bots.map(b => {
        if (b.id === botId) {
            const nextStatus = b.status === 'active' ? 'paused' : b.status === 'paused' ? 'simulating' : 'active';
            return { ...b, status: nextStatus };
        }
        return b;
      })
    }));
  };

  const handleConnectExchange = (e: React.FormEvent) => {
    e.preventDefault();
    if(apiKey && apiSecret) {
      // Simulate connection
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          user: { ...prev.user, apiConnected: true, exchange: selectedExchangeId }
        }));
      }, 1000);
    }
  };

  const handleWithdraw = () => {
    alert("Withdrawal request of " + state.user.referralBalanceUsdt + " USDT sent to your connected wallet.");
    setState(prev => ({ ...prev, user: { ...prev.user, referralBalanceUsdt: 0 } }));
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const totalPnL = state.bots.reduce((acc, bot) => acc + bot.pnl, 0);
  const pnlPercent = (totalPnL / state.capitalTotal) * 100;
  
  const assetData = state.assets.map(a => ({ name: a.ticker, value: a.valueUsd }));

  return (
    <div className="flex min-h-screen bg-[#020617] font-sans text-slate-200 selection:bg-cyan-500/30">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-20 lg:w-72 fixed h-full z-50 p-2 lg:p-4 flex flex-col pointer-events-none transition-all duration-300">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 h-full rounded-[24px] lg:rounded-[32px] shadow-2xl pointer-events-auto flex flex-col overflow-hidden">
          <div className="p-4 lg:p-8 flex items-center justify-center lg:justify-start gap-3 flex-shrink-0">
            <div className="h-10 w-10 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <Hexagon size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="hidden lg:flex flex-col">
                 <span className="font-bold text-xl tracking-tight text-white font-display">XCronos<span className="text-cyan-400">AI</span></span>
            </div>
          </div>

          <nav className="flex-1 px-2 lg:px-4 space-y-2 overflow-y-auto overflow-x-hidden">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
              { id: 'bots', icon: Bot, label: t.bots },
              { id: 'risk', icon: ShieldCheck, label: t.risk },
              { id: 'settings', icon: Settings, label: t.settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3 lg:p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeTab === item.id 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                }`}
                title={item.label}
              >
                <item.icon size={22} className={`flex-shrink-0 ${activeTab === item.id ? 'animate-pulse' : ''}`} />
                <span className="hidden lg:block font-medium truncate">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-2 lg:p-6 mt-auto">
             <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center justify-center lg:justify-start gap-3 p-3 text-slate-500 hover:text-white hover:bg-red-500/10 rounded-2xl transition-all mb-4">
                <LogOut size={20} />
                <span className="hidden lg:block">Logout</span>
             </button>

             <div className="bg-slate-950/50 rounded-2xl p-2 lg:p-4 border border-slate-800/50 flex flex-col items-center lg:items-stretch">
                <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                   <div className={`w-2 h-2 rounded-full ${state.profile === 'aggressive' ? 'bg-red-500' : state.profile === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                   <span className="text-xs font-mono uppercase text-slate-400 hidden lg:inline">{t.risk_profile}</span>
                </div>
                <div className="flex gap-1 w-full max-w-[60px] lg:max-w-none">
                   {(['conservative', 'moderate', 'aggressive'] as const).map(p => (
                     <div key={p} 
                          onClick={() => handleProfileChange(p)}
                          className={`h-1 flex-1 rounded-full cursor-pointer transition-all ${state.profile === p ? 'bg-cyan-500' : 'bg-slate-800'}`} 
                          title={p}
                     />
                   ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2 capitalize text-center hidden lg:block">{state.profile}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 ml-20 lg:ml-72 p-6 lg:p-8 relative overflow-hidden transition-all duration-300">
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] opacity-40"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] opacity-30"></div>
        </div>

        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight font-display">
                {activeTab === 'dashboard' && t.dashboard}
                {activeTab === 'bots' && t.bots}
                {activeTab === 'risk' && t.risk}
                {activeTab === 'settings' && t.settings}
              </h1>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                {t.system_status}: <span className="text-emerald-400 flex items-center gap-1 font-medium"><CheckCircle size={14} /> {t.operational}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-full border border-slate-800/50 backdrop-blur-md">
              {/* Language Switcher */}
              <div className="flex items-center gap-2 px-3 border-r border-slate-700/50">
                <Globe size={16} className="text-slate-400" />
                <select 
                  value={state.language}
                  onChange={(e) => setState(prev => ({ ...prev, language: e.target.value as Language }))}
                  className="bg-transparent text-sm font-medium text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="en">EN</option>
                  <option value="pt">PT-BR</option>
                  <option value="es">ES</option>
                </select>
              </div>

              <div className="hidden md:flex flex-col items-end px-2">
                <span className="text-[10px] uppercase text-slate-500 font-bold">{t.total_equity}</span>
                <span className="text-lg font-mono font-bold text-white leading-none">${(state.capitalTotal + totalPnL).toLocaleString()}</span>
              </div>
              
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 relative transition-colors">
                <Bell size={18} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
              </button>
              
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                 UK
              </div>
            </div>
        </header>

        <div className="max-w-[1600px] mx-auto space-y-8">
          
          {/* --- DASHBOARD TAB --- */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total PnL (24h)', value: `${pnlPercent >= 0 ? '+' : ''}${totalPnL.toFixed(2)} USD`, sub: `${pnlPercent.toFixed(2)}%`, icon: TrendingUp, color: pnlPercent >= 0 ? 'text-emerald-400' : 'text-red-400', bg: pnlPercent >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10' },
                  { label: t.daily_drawdown, value: `${state.dailyDrawdown}%`, sub: `Limit: ${state.maxDrawdownLimit}%`, icon: AlertOctagon, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { label: t.active_bots, value: `${state.bots.filter(b => b.status === 'active').length}/${state.bots.length}`, sub: '1 Simulating', icon: Bot, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                  { label: t.balance, value: `$${state.user.referralBalanceUsdt.toFixed(2)}`, sub: 'USDT Available', icon: Wallet, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-[32px] border border-slate-800 hover:border-slate-700 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                        <div className={`p-2 rounded-xl ${stat.bg}`}>
                          <stat.icon size={18} className={stat.color} />
                        </div>
                     </div>
                     <span className="text-2xl font-mono font-bold text-white tracking-tight">{stat.value}</span>
                     <p className={`text-xs mt-2 font-medium ${stat.color} brightness-90`}>{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] border border-slate-800 h-[400px]">
                    <h3 className="text-xl font-bold mb-6 text-white font-display">Performance Analytics</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={PNL_DATA}>
                            <defs>
                                <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }} 
                                itemStyle={{ color: '#22d3ee' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorPnL)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] border border-slate-800 h-[400px]">
                    <h3 className="text-xl font-bold mb-4 text-white font-display">Asset Allocation</h3>
                    <ResponsiveContainer width="100%" height="70%">
                        <RePieChart>
                            <Pie
                                data={assetData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {assetData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                        </RePieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {state.assets.map((asset, i) => (
                            <div key={asset.ticker} className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-xl">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                <span className="text-xs text-slate-300 font-medium">{asset.ticker}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>

              {/* Logs */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] border border-slate-800 overflow-hidden">
                 <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white font-display">Execution Audit Log</h3>
                 </div>
                 <div className="p-0">
                    {state.logs.map((log) => (
                        <div key={log.id} className="p-5 border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                             <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-2xl ${log.action === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : log.action === 'SELL' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                    {log.action === 'BUY' ? <ArrowDownRight size={20} /> : log.action === 'SELL' ? <ArrowUpRight size={20} /> : <Settings size={20} />}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-200">{log.action} {log.asset}</h4>
                                    <p className="text-sm text-slate-400 mt-1">{log.details}</p>
                                </div>
                             </div>
                             
                             <div className="w-full md:w-1/2 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    <span className="text-cyan-500 font-bold uppercase text-[10px] tracking-wider mr-2">XCronosAI:</span> 
                                    {log.reason}
                                </p>
                             </div>
                             
                             <span className="text-xs font-mono text-slate-600 whitespace-nowrap">{log.timestamp}</span>
                        </div>
                    ))}
                 </div>
              </div>
            </>
          )}

          {/* --- BOTS TAB --- */}
          {activeTab === 'bots' && (
            <div className="space-y-8">
                <div className="p-8 bg-gradient-to-r from-cyan-900/30 to-indigo-900/30 rounded-[32px] border border-cyan-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-2 font-display">{t.bots}</h2>
                        <p className="text-slate-400 max-w-2xl">
                            All active strategies operating within Top 50 liquidity constraints governed by Gemini Core. 
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {state.bots.map(bot => (
                        <BotCard key={bot.id} bot={bot} onToggle={toggleBot} />
                    ))}
                </div>
            </div>
          )}

          {/* --- SETTINGS / WALLET TAB (NEW) --- */}
          {activeTab === 'settings' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Exchange Connection */}
                <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] border border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
                            <Key size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">{t.connect_exchange}</h3>
                    </div>

                    {state.user.apiConnected ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <CheckCircle className="text-emerald-400" />
                                 <div>
                                     <p className="font-bold text-emerald-400 capitalize">{SUPPORTED_EXCHANGES.find(e => e.id === state.user.exchange)?.name || state.user.exchange} Connected</p>
                                     <p className="text-xs text-emerald-500/70">Read-only permission active</p>
                                 </div>
                             </div>
                             <button onClick={() => setState(prev => ({...prev, user: {...prev.user, apiConnected: false}}))} className="text-xs text-slate-400 hover:text-white underline">Disconnect</button>
                        </div>
                    ) : (
                        <form onSubmit={handleConnectExchange} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Exchange</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {SUPPORTED_EXCHANGES.map(ex => (
                                        <div key={ex.id} 
                                            onClick={() => setSelectedExchangeId(ex.id)}
                                            className={`p-3 rounded-xl border cursor-pointer text-center text-xs font-bold transition-all ${selectedExchangeId === ex.id ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950/30 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                                        >
                                            {ex.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.api_key}</label>
                                <input 
                                    type="text" 
                                    value={apiKey} 
                                    onChange={e => setApiKey(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-sm focus:border-cyan-500 outline-none text-white" 
                                    placeholder="Enter API Key"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.api_secret}</label>
                                <input 
                                    type="password" 
                                    value={apiSecret} 
                                    onChange={e => setApiSecret(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-sm focus:border-cyan-500 outline-none text-white" 
                                    placeholder="Enter API Secret"
                                />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20">
                                {t.connect_btn}
                            </button>
                            <p className="text-[10px] text-slate-500 text-center">We encrypt keys locally. Enable IP whitelist on your exchange.</p>
                        </form>
                    )}
                </div>

                {/* 2. Referral & Wallet */}
                <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] border border-slate-800 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">{t.referral}</h3>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 p-6 rounded-2xl border border-purple-500/20 mb-6">
                        <span className="text-purple-300 text-sm font-medium">{t.balance}</span>
                        <div className="flex items-end justify-between mt-1">
                            <span className="text-4xl font-mono font-bold text-white">{state.user.referralBalanceUsdt.toFixed(2)} <span className="text-lg text-purple-400">USDT</span></span>
                            <button 
                                onClick={handleWithdraw}
                                disabled={state.user.referralBalanceUsdt <= 0}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium text-sm transition-colors"
                            >
                                {t.withdraw}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.referral_link}</label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-sm text-slate-300 font-mono truncate">
                                https://xcronos-ai.io/ref/{state.user.referralCode}
                            </div>
                            <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300">
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>
                    
                    <p className="text-sm text-slate-400 mt-auto bg-slate-800/30 p-4 rounded-xl">
                        Invite friends and earn <strong>20%</strong> of their trading fees for life.
                    </p>
                </div>

                {/* 3. Subscription Plans (Checkout) */}
                <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] border border-slate-800">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                            <CreditCard size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">{t.plans}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PLANS.map(plan => {
                            const isCurrent = state.user.plan === plan.id;
                            return (
                                <div key={plan.id} className={`relative p-6 rounded-3xl border transition-all ${isCurrent ? 'bg-slate-800 border-cyan-500 ring-1 ring-cyan-500/50' : 'bg-slate-950/30 border-slate-800 hover:border-slate-700'}`}>
                                    {isCurrent && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full">{t.current_plan}</span>}
                                    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                                    <div className="my-4">
                                        <span className="text-3xl font-bold text-white">${plan.price}</span>
                                        <span className="text-slate-500">/mo</span>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button 
                                        disabled={isCurrent}
                                        className={`w-full py-2.5 rounded-xl font-medium transition-all ${isCurrent ? 'bg-slate-700 text-slate-400 cursor-default' : 'bg-slate-100 hover:bg-white text-slate-900'}`}
                                    >
                                        {isCurrent ? 'Active' : t.upgrade}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

             </div>
          )}

           {/* Risk Tab */}
           {activeTab === 'risk' && (
             <div className="bg-slate-900/40 backdrop-blur-xl p-12 rounded-[32px] border border-slate-800 text-center">
                 <ShieldCheck size={64} className="mx-auto text-slate-600 mb-6" />
                 <h2 className="text-3xl font-bold text-slate-200 font-display">{t.risk}</h2>
                 <p className="text-slate-400 mt-2 mb-8 text-lg max-w-2xl mx-auto">Full transparency and control over your automated strategies.</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
                    {[
                        { title: 'Max Drawdown', value: `${state.maxDrawdownLimit}%`, desc: 'Circuit breaker triggered if daily loss exceeds limit.' },
                        { title: 'Paper Trading', value: 'Enforced', desc: 'First 10 trades per strategy are simulated.' },
                        { title: 'Asset Whitelist', value: 'Top 50', desc: 'Low liquidity assets are automatically rejected.' }
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-slate-800/40 rounded-3xl border border-slate-700/50">
                            <label className="text-xs uppercase text-slate-500 font-bold tracking-wider">{item.title}</label>
                            <p className="text-2xl font-mono text-white mt-2">{item.value}</p>
                            <p className="text-sm text-slate-400 mt-3 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                 </div>
             </div>
           )}

        </div>
      </main>

      {/* Floating Chat */}
      <GeminiChat appState={state} />
    </div>
  );
};

export default App;