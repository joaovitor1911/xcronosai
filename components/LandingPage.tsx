import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  CheckCircle, 
  TrendingUp, 
  Cpu, 
  Lock, 
  Users, 
  Play,
  BarChart3,
  Server,
  Activity,
  Layers,
  Hexagon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PLANS } from '../constants';

interface LandingPageProps {
  onLogin: () => void;
}

const SUPPORTED_EXCHANGES_LOGOS = [
  { name: 'Binance', color: '#F0B90B' },
  { name: 'Bybit', color: '#FFFFFF' }, // Changed to White for visibility
  { name: 'MEXC', color: '#2B54EC' },
  { name: 'Kraken', color: '#5741D9' },
  { name: 'KuCoin', color: '#00D188' },
  { name: 'OKX', color: '#FFFFFF' }, // Changed to White for visibility
  { name: 'Gate.io', color: '#E84A3B' },
  { name: 'Coinbase', color: '#0052FF' },
  { name: 'Bitget', color: '#00F0E0' },
  { name: 'Huobi', color: '#2954DE' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  // --- Calculator State ---
  const [initialInv, setInitialInv] = useState(5000);
  const [duration, setDuration] = useState(12); // months
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // --- Calculator Logic ---
  useEffect(() => {
    const calculateProjection = () => {
      const monthlyRates = {
        conservative: 0.02, 
        moderate: 0.05,
        aggressive: 0.12 
      };
      
      const rate = monthlyRates[riskProfile];
      const data = [];
      let currentBalance = initialInv;
      
      // Generate data points for the chart
      for (let i = 0; i <= duration; i++) {
        data.push({
          month: i,
          value: Math.round(currentBalance),
          organic: Math.round(initialInv * (1 + (0.005 * i))),
        });
        currentBalance = currentBalance * (1 + rate);
      }
      setProjectionData(data);
    };

    calculateProjection();
  }, [initialInv, duration, riskProfile]);

  const finalValue = projectionData.length > 0 ? projectionData[projectionData.length - 1].value : 0;
  const profit = finalValue - initialInv;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden font-display">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#020617]/70 supports-[backdrop-filter]:bg-[#020617]/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
               <Hexagon className="text-white animate-pulse-slow" size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight leading-none font-display">XCronos<span className="text-cyan-400">AI</span></span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">Intelligent Systems</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
             <a href="#technology" className="hover:text-cyan-400 transition-colors">Core Tech</a>
             <a href="#exchanges" className="hover:text-cyan-400 transition-colors">Exchanges</a>
             <a href="#calculator" className="hover:text-cyan-400 transition-colors">Simulator</a>
             <a href="#pricing" className="hover:text-cyan-400 transition-colors">Plans</a>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onLogin} className="text-sm font-medium text-white hover:text-cyan-400 transition-colors hidden md:block">
                 Login
             </button>
             <button 
                onClick={onLogin}
                className="px-6 py-2.5 bg-white text-black hover:bg-cyan-50 rounded-full font-bold transition-all shadow-lg hover:shadow-cyan-500/20"
             >
                Start Trading
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 mesh-bg opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md text-cyan-400 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            XCronosAI V3.0 Neural Engine Live
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-[1.1] font-display">
            The Future of <br />
            <span className="text-gradient">Algorithmic Wealth</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Institutional-grade automated trading infrastructure for the modern investor. Connect <span className="text-white font-medium">Binance, Kraken, Bybit</span> and let our AI orchestrate your capital.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
            <button 
              onClick={onLogin}
              className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(8,145,178,0.5)] hover:shadow-[0_0_60px_-15px_rgba(8,145,178,0.6)] flex items-center justify-center gap-3 group"
            >
              Deploy Bot <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full md:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-md group"
            >
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={14} fill="currentColor" />
              </div>
              How It Works
            </button>
          </div>

          {/* Stats Bar Floating */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-4xl animate-float">
             {[
                { label: 'Trading Volume', value: '$142M+', icon: BarChart3 },
                { label: 'Active Nodes', value: '24,591', icon: Server },
                { label: 'Success Rate', value: '94.2%', icon: Activity },
                { label: 'Exchanges', value: '12+', icon: Globe },
             ].map((stat, i) => (
                <div key={i} className="p-6 text-center">
                    <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- Marquee Exchanges --- */}
      <section id="exchanges" className="py-12 border-y border-white/5 bg-black/50 overflow-hidden">
         <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">Integrated with Top Tier Liquidity Providers</p>
         
         <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-scroll min-w-full shrink-0">
               {SUPPORTED_EXCHANGES_LOGOS.map((ex, i) => (
                  <div key={i} className="inline-flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0 mx-8">
                     <div className="w-3 h-3 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: ex.color, boxShadow: `0 0 10px ${ex.color}` }}></div>
                     <span className="text-2xl font-bold text-white tracking-tight">{ex.name}</span>
                  </div>
               ))}
            </div>
            <div className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-scroll min-w-full shrink-0">
               {SUPPORTED_EXCHANGES_LOGOS.map((ex, i) => (
                  <div key={`dup-${i}`} className="inline-flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0 mx-8">
                     <div className="w-3 h-3 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: ex.color, boxShadow: `0 0 10px ${ex.color}` }}></div>
                     <span className="text-2xl font-bold text-white tracking-tight">{ex.name}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Technology / Video Section --- */}
      <section id="technology" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display leading-tight">
                      Orchestration via <br />
                      <span className="text-cyan-400">Gemini Neural Core</span>
                   </h2>
                   <p className="text-slate-400 text-lg leading-relaxed mb-8">
                      XCronosAI utilizes the latest Google Gemini 2.5 Flash models to analyze market sentiment, volatility structures, and liquidity depth in real-time. It's not just a bot; it's an orchestration layer for your assets.
                   </p>
                   
                   <div className="space-y-6">
                      {[
                        { title: 'Non-Custodial Security', desc: 'Funds never leave your exchange. We use API keys with "Trade-Only" permissions.' },
                        { title: 'Multi-Exchange Routing', desc: 'Connect Binance, Kraken, and MEXC simultaneously for arbitrage opportunities.' },
                        { title: 'Adaptive Risk Engine', desc: 'Real-time volatility adjustments. Switches from Aggressive to Conservative automatically.' }
                      ].map((item, i) => (
                         <div key={i} className="flex gap-4">
                            <div className="mt-1 w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
                               <CheckCircle size={18} />
                            </div>
                            <div>
                               <h3 className="text-white font-bold text-lg">{item.title}</h3>
                               <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="relative">
                   {/* Abstract Tech Visual/Video Placeholder */}
                   <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 z-10 mix-blend-overlay"></div>
                      {/* Animated grid background simulation */}
                      <div className="w-full h-[500px] bg-slate-950 relative overflow-hidden">
                           <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
                           
                           {/* Floating Cards Simulation */}
                           <div className="absolute top-10 left-10 p-4 bg-slate-900/80 backdrop-blur border border-cyan-500/30 rounded-xl w-48 animate-float">
                                <div className="h-2 w-20 bg-slate-700 rounded mb-2"></div>
                                <div className="h-2 w-32 bg-cyan-500/50 rounded"></div>
                           </div>
                           <div className="absolute bottom-20 right-10 p-4 bg-slate-900/80 backdrop-blur border border-purple-500/30 rounded-xl w-48 animate-float animation-delay-2000">
                                <div className="flex justify-between text-xs text-white mb-1"><span>ETH/USDT</span> <span className="text-emerald-400">+2.4%</span></div>
                                <div className="h-8 w-full bg-gradient-to-r from-purple-500/20 to-transparent rounded"></div>
                           </div>
                      </div>
                      
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                             <Play size={32} className="text-white fill-white ml-1" />
                          </div>
                      </div>
                   </div>
                   
                   {/* Decorative elements behind */}
                   <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
                   <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>
             </div>
          </div>
      </section>

      {/* --- Profit Calculator --- */}
      <section id="calculator" className="py-24 relative px-6 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto glass-card rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-white/10">
           <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Controls */}
              <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-slate-900/60">
                 <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg text-white shadow-lg shadow-emerald-500/20">
                        <TrendingUp size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white font-display">Yield Simulator</h2>
                 </div>
                 <p className="text-slate-400 text-sm mb-8">See how AI-driven compounding can outperform standard HODLing strategies over time.</p>
                 
                 <div className="space-y-8">
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-sm font-bold text-slate-300">Starting Capital</label>
                            <span className="font-mono text-cyan-400 font-bold text-xl">${initialInv.toLocaleString()}</span>
                        </div>
                        <input 
                          type="range" min="1000" max="100000" step="1000" 
                          value={initialInv} onChange={(e) => setInitialInv(Number(e.target.value))}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-sm font-bold text-slate-300">Investment Period</label>
                            <span className="font-mono text-cyan-400 font-bold text-xl">{duration} Months</span>
                        </div>
                        <input 
                          type="range" min="3" max="60" step="1" 
                          value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-4">Strategy Profile</label>
                        <div className="grid grid-cols-3 gap-2">
                           {(['conservative', 'moderate', 'aggressive'] as const).map(mode => (
                               <button 
                                 key={mode}
                                 onClick={() => setRiskProfile(mode)}
                                 className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                                    riskProfile === mode 
                                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-500/25 scale-105' 
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                                 }`}
                               >
                                  {mode}
                               </button>
                           ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Projected Yield</span>
                            <span className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-lg">
                                +${Math.round(profit).toLocaleString()}
                            </span>
                        </div>
                    </div>
                 </div>
              </div>

              {/* Chart */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-b from-slate-900 to-[#050B14]">
                  <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={projectionData}>
                          <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#475569" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `M${v}`} />
                          <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                          <Tooltip 
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                              itemStyle={{ color: '#fff' }}
                              labelStyle={{ color: '#94a3b8' }}
                          />
                          <Area type="monotone" dataKey="organic" stroke="#475569" strokeWidth={2} fill="url(#colorOrganic)" name="HODL" />
                          <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} fill="url(#colorValue)" name="XCronos AI" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
           </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">Transparent Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Start with our Explorer node and scale as your capital grows.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan, index) => {
               const isPro = plan.id === 'pro';
               return (
                <div key={plan.id} className={`relative p-8 rounded-[32px] border flex flex-col transition-all duration-300 group hover:-translate-y-2 ${
                    isPro 
                    ? 'bg-slate-900/80 border-cyan-500 ring-2 ring-cyan-500/20 shadow-2xl shadow-cyan-500/10 z-10' 
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}>
                    {isPro && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                            RECOMMENDED
                        </div>
                    )}
                    
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-white tracking-tight">${plan.price}</span>
                            <span className="text-slate-500">/mo</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-5 mb-10">
                        {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <div className={`mt-0.5 p-1 rounded-full flex-shrink-0 ${isPro ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                                    <CheckCircle size={12} fill={isPro ? "currentColor" : "none"} />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={onLogin}
                        className={`w-full py-4 rounded-2xl font-bold transition-all ${
                            isPro
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
                            : 'bg-white text-slate-900 hover:bg-slate-200'
                        }`}
                    >
                        {plan.price === 0 ? 'Start Free' : 'Get Started'}
                    </button>
                </div>
               )
            })}
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#050B14] border-t border-slate-900 pt-20 pb-10 px-6">
         <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 md:col-span-2 pr-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Hexagon className="text-cyan-500" size={28} />
                        <span className="text-2xl font-bold text-white font-display">XCronos<span className="text-cyan-400">AI</span></span>
                    </div>
                    <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                        Pioneering the next generation of decentralized algorithmic trading. Built on secure, non-custodial architecture for the global market.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2">
                             <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="w-5 h-auto rounded-sm opacity-80" />
                             <div className="flex flex-col">
                                 <span className="text-[10px] text-slate-500 font-bold uppercase">Registered Entity</span>
                                 <span className="text-xs text-white font-medium">United Kingdom</span>
                             </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-white font-bold mb-6 font-display">Ecosystem</h4>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Neural Engine</li>
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Supported Exchanges</li>
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Risk Management</li>
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Enterprise API</li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-white font-bold mb-6 font-display">Company</h4>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">About XCronosAI Holdings</li>
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Legal & Compliance</li>
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
                        <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact Support</li>
                    </ul>
                </div>
             </div>
             
             <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
                 <p>&copy; 2024 XCronosAI Holdings Ltd. Registered in England & Wales. All rights reserved.</p>
                 <div className="flex gap-6 mt-4 md:mt-0">
                     <span>Terms of Service</span>
                     <span>Risk Disclosure</span>
                 </div>
             </div>
         </div>
      </footer>

      {/* Video Modal (Simulated) */}
      {isVideoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
              <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <button 
                    onClick={() => setIsVideoModalOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
                  >
                      <span className="text-xl font-bold px-2">✕</span>
                  </button>
                  <div className="w-full h-full flex items-center justify-center flex-col">
                      <p className="text-cyan-400 animate-pulse font-mono mb-4">ESTABLISHING SECURE CONNECTION...</p>
                      <h2 className="text-white text-2xl font-bold">XCronosAI Platform Demo</h2>
                      <p className="text-slate-500 mt-2">Simulation Mode Active</p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};