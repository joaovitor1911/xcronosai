import { AppState, BotConfig, PortfolioAsset, TradeLog, UserPlan, SupportedExchange } from './types';

export const INITIAL_CAPITAL = 10000;

export const SUPPORTED_EXCHANGES: {id: SupportedExchange, name: string}[] = [
  { id: 'binance', name: 'Binance' },
  { id: 'bybit', name: 'Bybit' },
  { id: 'mexc', name: 'MEXC Global' },
  { id: 'kraken', name: 'Kraken' },
  { id: 'kucoin', name: 'KuCoin' },
  { id: 'okx', name: 'OKX' },
  { id: 'gateio', name: 'Gate.io' },
  { id: 'coinbase', name: 'Coinbase Pro' },
];

// --- Translations ---
export const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    bots: 'Orchestrator Core',
    risk: 'Risk & Governance',
    settings: 'Settings & Wallet',
    total_equity: 'Total Equity',
    active_bots: 'Active Nodes',
    daily_drawdown: 'Daily Drawdown',
    risk_profile: 'AI Risk Profile',
    connect_exchange: 'Connect Exchange API',
    api_key: 'API Key',
    api_secret: 'API Secret',
    connect_btn: 'Link Exchange',
    plans: 'Access Tiers',
    current_plan: 'Current Tier',
    upgrade: 'Upgrade Protocol',
    referral: 'Affiliate Network',
    referral_link: 'Referral Link',
    balance: 'Vault Balance',
    withdraw: 'Withdraw Funds',
    copy: 'Copy',
    system_status: 'XCronosAI Status',
    operational: 'Online',
  },
  pt: {
    dashboard: 'Painel de Controle',
    bots: 'Núcleo Orquestrador',
    risk: 'Risco e Governança',
    settings: 'Configurações',
    total_equity: 'Patrimônio Total',
    active_bots: 'Nós Ativos',
    daily_drawdown: 'Drawdown Diário',
    risk_profile: 'Perfil de Risco AI',
    connect_exchange: 'Conectar Corretora',
    api_key: 'Chave de API',
    api_secret: 'Segredo da API',
    connect_btn: 'Vincular Corretora',
    plans: 'Níveis de Acesso',
    current_plan: 'Plano Atual',
    upgrade: 'Melhorar Protocolo',
    referral: 'Rede de Afiliados',
    referral_link: 'Link de Indicação',
    balance: 'Saldo do Cofre',
    withdraw: 'Sacar Fundos',
    copy: 'Copiar',
    system_status: 'Status XCronosAI',
    operational: 'Operacional',
  },
  es: {
    dashboard: 'Tablero de Mando',
    bots: 'Núcleo Orquestador',
    risk: 'Riesgo y Gobernanza',
    settings: 'Ajustes',
    total_equity: 'Patrimonio Total',
    active_bots: 'Nodos Activos',
    daily_drawdown: 'Drawdown Diario',
    risk_profile: 'Perfil de Riesgo IA',
    connect_exchange: 'Conectar Exchange',
    api_key: 'Clave API',
    api_secret: 'Secreto API',
    connect_btn: 'Vincular Exchange',
    plans: 'Niveles de Acceso',
    current_plan: 'Plan Actual',
    upgrade: 'Mejorar Protocolo',
    referral: 'Red de Afiliados',
    referral_link: 'Enlace de Referido',
    balance: 'Saldo de Bóveda',
    withdraw: 'Retirar Fondos',
    copy: 'Copiar',
    system_status: 'Estado XCronosAI',
    operational: 'Operacional',
  }
};

export const PLANS: UserPlan[] = [
  {
    id: 'free',
    name: 'Explorer Node',
    price: 0,
    features: ['1 AI Bot Instance', 'Manual Rebalancing', 'Standard Latency', 'Community Support']
  },
  {
    id: 'pro',
    name: 'Strategist Node',
    price: 49,
    features: ['5 AI Bot Instances', 'Auto Rebalancing', 'High-Speed Execution', 'Gemini AI Insights', 'Deep Market Data']
  },
  {
    id: 'whale',
    name: 'Institutional Core',
    price: 199,
    features: ['Unlimited Instances', 'Custom Strategy Scripting', 'Dedicated Account Manager', 'Sub-millisecond API', 'Zero Platform Fees']
  }
];

export const MOCK_ASSETS: PortfolioAsset[] = [
  { ticker: 'USDC', name: 'USD Coin', amount: 4500, valueUsd: 4500, targetWeight: 0.40, currentWeight: 0.45, type: 'stable' },
  { ticker: 'BTC', name: 'Bitcoin', amount: 0.055, valueUsd: 3575, targetWeight: 0.25, currentWeight: 0.35, type: 'crypto' },
  { ticker: 'ETH', name: 'Ethereum', amount: 0.5, valueUsd: 1500, targetWeight: 0.20, currentWeight: 0.15, type: 'crypto' },
  { ticker: 'SOL', name: 'Solana', amount: 3.5, valueUsd: 425, targetWeight: 0.15, currentWeight: 0.05, type: 'crypto' },
];

export const INITIAL_BOTS: BotConfig[] = [
  {
    id: 'bot-rebal',
    name: 'XCronos Rebalancer',
    type: 'rebalancing',
    status: 'active',
    allocationPct: 40,
    pnl: 124.50,
    riskScore: 20,
    params: {
      btcMin: 0.20,
      ethMin: 0.15,
      threshold: 0.03,
      reserve: 'USDC'
    }
  },
  {
    id: 'bot-grid',
    name: 'Neural Grid Spot',
    type: 'grid',
    status: 'active',
    allocationPct: 40,
    pnl: 45.20,
    riskScore: 45,
    params: {
      pairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'],
      levels: 10,
      spacing: '0.75%',
    }
  },
  {
    id: 'bot-futures',
    name: 'Alpha Swing Futures',
    type: 'futures',
    status: 'simulating', // Safer default
    allocationPct: 20,
    pnl: 0,
    riskScore: 80,
    params: {
      leverage: 3,
      stopLevels: 5,
      maxDailyLoss: '2.0%',
      targets: [0.5, 1.0, 1.5]
    }
  }
];

export const MOCK_LOGS: TradeLog[] = [
  {
    id: 'log-1',
    timestamp: '2023-10-27 10:45:00',
    botId: 'bot-rebal',
    action: 'REBALANCE',
    asset: 'ETH',
    details: 'Bought 0.05 ETH @ $3000',
    reason: 'ETH weight (15%) fell below target (20%) by >3% threshold. Used USDC reserve.'
  },
  {
    id: 'log-2',
    timestamp: '2023-10-27 11:15:30',
    botId: 'bot-grid',
    action: 'BUY',
    asset: 'SOL/USDT',
    details: 'Grid Level 4 Executed',
    reason: 'Price dipped into accumulation zone. Volatility implies mean reversion.'
  },
];

export const INITIAL_STATE: AppState = {
  capitalTotal: INITIAL_CAPITAL,
  profile: 'moderate',
  language: 'en',
  bots: INITIAL_BOTS,
  assets: MOCK_ASSETS,
  logs: MOCK_LOGS,
  user: {
    id: 'u-123',
    email: 'trader@example.com',
    plan: 'free',
    referralCode: 'XCRON-8821',
    referralBalanceUsdt: 150.00,
    apiConnected: false,
    exchange: null
  },
  dailyDrawdown: 0.5, 
  maxDrawdownLimit: 2.0, 
};