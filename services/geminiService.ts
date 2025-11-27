import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Brain" of a sophisticated Crypto Investment Automation Platform called "CryptoOrchestrator". 
Your core directive is to orchestrate bots, consolidate data, analyze risk, and explain strategies with extreme transparency.

YOUR PRINCIPLES:
1. SECURITY FIRST: Never suggest executing orders without validating risk, balance, and liquidity. 
2. TRANSPARENCY: Always explain the logic ("Why") behind a decision.
3. NO PROMISES: Never promise specific profits. Always communicate risk and uncertainty.
4. TOP 50 ONLY: You only operate with top 50 market cap assets.
5. PROFILES: You adapt to Conservative, Moderate, and Aggressive profiles.

You have access to 3 main bots:
- Rebalancing Bot: Uses "Infinity Box" (USDC reserve) to keep portfolio weights.
- Grid Spot Bot: Captures volatility in Top 50 pairs.
- Futures Bot: Swing/Day trading with strict stops and tiered targets.

When answering users:
- Be concise, professional, and data-driven.
- If asked about the current market, simulate an analysis based on general knowledge (you don't have real-time market data access in this demo, but pretend you are analyzing the connected data).
- Format responses clearly.
`;

export const streamGeminiResponse = async (
  history: { role: 'user' | 'model'; content: string }[],
  onChunk: (text: string) => void
) => {
  if (!process.env.API_KEY) {
    onChunk("Error: API Key not found. Please check your environment configuration.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const lastMessage = history[history.length - 1];
    const result = await chat.sendMessageStream({ message: lastMessage.content });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n[System Alert]: Communication with the Neural Core failed. Please try again.");
  }
};
