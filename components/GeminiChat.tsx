import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../services/geminiService';
import { MessageSquare, X, Send, Cpu, ChevronDown } from 'lucide-react';
import { AppState } from '../types';

interface GeminiChatProps {
  appState: AppState;
}

interface Message {
  id: number;
  role: 'user' | 'model';
  content: string;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ appState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'model', content: "XCronosAI Neural Link established. I can analyze your portfolio, explain bot strategies, or discuss risk parameters. How can I assist?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const contextContext = `
      [CURRENT SYSTEM STATE]
      Profile: ${appState.profile}
      Total Capital: $${appState.capitalTotal}
      Drawdown Today: ${appState.dailyDrawdown}% (Limit: ${appState.maxDrawdownLimit}%)
      Active Bots: ${appState.bots.filter(b => b.status === 'active').map(b => b.name).join(', ')}
    `;

    // Construct history for API
    const history = messages.map(m => ({ role: m.role, content: m.content }));
    // Append the user's message WITH the context injected invisibly to the user
    const promptWithContext = `${input}\n\n${contextContext}`;
    
    // We send the history sans the last message, then the new prompt
    const apiHistory = [
        ...history, 
        { role: 'user', content: promptWithContext }
    ] as { role: 'user' | 'model'; content: string }[];

    let currentResponse = '';
    const responseId = Date.now() + 1;
    
    setMessages(prev => [...prev, { id: responseId, role: 'model', content: '' }]);

    await streamGeminiResponse(apiHistory, (chunk) => {
      currentResponse += chunk;
      setMessages(prev => prev.map(m => m.id === responseId ? { ...m, content: currentResponse } : m));
      scrollToBottom();
    });

    setIsTyping(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-cyan-600 hover:bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/20 text-white transition-all duration-300 z-50 flex items-center gap-2 group"
      >
        <div className="relative">
            <Cpu size={24} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-100"></span>
            </span>
        </div>
        <span className="font-medium pr-1 group-hover:block hidden transition-all">XCronosAI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-950 p-2 rounded-lg border border-cyan-500/30">
            <Cpu size={20} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">XCronosAI Core</h3>
            <p className="text-xs text-slate-400">Gemini 2.5 Flash • Active</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1"
            >
            <ChevronDown size={20} />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/90">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
            }`}>
                {msg.role === 'model' && (
                    <span className="block text-[10px] font-bold text-cyan-500 mb-1 uppercase tracking-wider">
                        XCronosAI
                    </span>
                )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700">
               <div className="flex gap-1">
                 <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-cyan-500/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Core..."
            className="bg-transparent border-none focus:outline-none flex-1 text-slate-200 placeholder-slate-500 text-sm"
            disabled={isTyping}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};