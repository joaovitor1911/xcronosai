export type RiskProfile = 'conservative' | 'moderate' | 'aggressive';
export type Language = 'en' | 'pt' | 'es';

export interface BotConfig {
  id: string;
  name: string;
  type: 'rebalancing' | 'grid' | 'futures';
  status: 'active' | 'paused' | 'simulating';
  allocationPct: number;
  params: Record<string, any>;
  pnl: number;
  riskScore: number; // 0-100
}

export interface PortfolioAsset {
  ticker: string;
  name: string;
  amount: number;
  valueUsd: number;
  targetWeight: number;
  currentWeight: number;
  type: 'stable' | 'crypto';
}

export interface TradeLog {
  id: string;
  timestamp: string;
  botId: string;
  action: 'BUY' | 'SELL' | 'REBALANCE' | 'STOP_LOSS';
  asset: string;
  details: string;
  reason: string; // The "Why"
}

export interface UserPlan {
  id: 'free' | 'pro' | 'whale';
  name: string;
  price: number;
  features: string[];
}

export type SupportedExchange = 'binance' | 'bybit' | 'mexc' | 'kraken' | 'kucoin' | 'okx' | 'gateio' | 'coinbase';

export interface UserProfile {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'whale';
  referralCode: string;
  referralBalanceUsdt: number;
  apiConnected: boolean;
  exchange: SupportedExchange | null;
}

export interface AppState {
  capitalTotal: number;
  profile: RiskProfile;
  language: Language;
  bots: BotConfig[];
  assets: PortfolioAsset[];
  logs: TradeLog[];
  user: UserProfile;
  dailyDrawdown: number;
  maxDrawdownLimit: number;
}