import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const CHIPS = [
  "What is Kasak's role at CAG?",
  "Tell me about the MapMyWork project",
  "What are Kasak's research publications?",
  "How to get in touch?"
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro-msg',
    sender: 'assistant',
    text: "Hello! I am Kasak's portfolio assistant, grounded in her public audit work, machine learning projects, and research publications. What would you like to explore?",
    timestamp: 'Just now'
  }
];

const AskKasakDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Maximum 10 questions per session limit
  const userMessageCount = messages.filter(m => m.sender === 'user').length;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Esc key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || loading) return;

    if (userMessageCount >= 10) {
      setErrorMsg("You have reached the 10-message session limit. Feel free to email Kasak directly at arorakasak2005@gmail.com!");
      return;
    }

    if (question.length > 300) {
      setErrorMsg("Questions must be under 300 characters.");
      return;
    }

    setErrorMsg(null);
    setInput('');

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.answer || "I don't have enough verified information about that topic.";
        setMessages(prev => [
          ...prev,
          { id: `asst-${Date.now()}`, sender: 'assistant', text: reply, timestamp: timeStr }
        ]);
      } else {
        throw new Error('Endpoint unreachable');
      }
    } catch {
      // Grounded offline fallback matching facts from knowledge.md
      const qLower = question.toLowerCase();
      let fallbackAnswer = "";

      if (qLower.includes('cag') || qLower.includes('role') || qLower.includes('job') || qLower.includes('audit')) {
        fallbackAnswer = "Kasak is a Young Professional in Data Analytics at the Office of the Comptroller & Auditor General of India (CAG). She designs remote audit pipelines, develops SQL/Python analytics, and validates sovereign datasets.";
      } else if (qLower.includes('mapmywork') || qLower.includes('geospatial') || qLower.includes('project')) {
        fallbackAnswer = "MapMyWork is Kasak's interactive geospatial workforce mapping application created with Python and GeoPandas. It visualizes city-wise distribution with dynamic filters and cluster markers.";
      } else if (qLower.includes('book') || qLower.includes('paper') || qLower.includes('research') || qLower.includes('publication') || qLower.includes('hello ai')) {
        fallbackAnswer = "Kasak authored 'Hello AI: A Friendly Introduction to Machine Learning' (Eliva Press, ISBN: 9999331718, available on Amazon India) and has published 3 peer-reviewed research papers in IJEDR, IJPREMS, and NCBISF'24.";
      } else if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('reach')) {
        fallbackAnswer = "You can contact Kasak directly by email at arorakasak2005@gmail.com, or via LinkedIn at linkedin.com/in/kasak-batra/.";
      } else if (qLower.includes('gate') || qLower.includes('ugc') || qLower.includes('score') || qLower.includes('b.tech') || qLower.includes('college')) {
        fallbackAnswer = "Kasak maintained a 94.5% aggregate in B.Tech (AI & Data Science, Class of 2026) at ADGITM (GGSIPU). She is qualified in both GATE 2026 (AI & Data Science) and UGC NET (Computer Science Applications).";
      } else {
        fallbackAnswer = "Kasak Batra is an AI & Data Science graduate working on data analytics and remote audit at CAG. She holds 94.5% in B.Tech, qualified GATE 2026 and UGC NET, and authored 'Hello AI'. Let me know if you want to explore her projects, research, or experience!";
      }

      setMessages(prev => [
        ...prev,
        { id: `asst-${Date.now()}`, sender: 'assistant', text: fallbackAnswer, timestamp: timeStr }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[var(--card-bg)] hairline-all text-[var(--text-primary)] hover:border-[#ff6a2b] shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
          aria-expanded={isOpen}
          aria-label="Open Ask Kasak AI Assistant"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] shadow-[0_0_8px_rgba(255,106,43,0.8)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold">
            Ask Kasak
          </span>
          <MessageSquare size={15} className="text-[#ff6a2b]" />
        </button>
      </div>

      {/* Floating Drawer / Assistant Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[82vh] h-[580px] rounded-3xl hairline-all bg-[var(--card-bg)] shadow-2xl flex flex-col overflow-hidden animate-fade-in border border-[#ff6a2b]/30"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 hairline-b bg-[var(--bg-surface-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] shadow-[0_0_8px_rgba(255,106,43,0.8)]" />
              <div>
                <h4 id="assistant-title" className="font-serif text-lg text-[var(--text-primary)] font-medium">
                  Ask Kasak · Assistant
                </h4>
                <p className="font-mono text-[10px] text-[var(--text-muted)] font-medium">
                  Grounded in knowledge.md · Haiku 3.5
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hairline-all bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#ff6a2b] transition-colors"
              aria-label="Close Assistant"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-3 bg-[var(--bg-surface)] hairline-b flex gap-1.5 overflow-x-auto no-scrollbar">
            {CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)] hover:border-[#ff6a2b] hover:text-[#ff6a2b] transition-all flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Thread */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs bg-[var(--bg-canvas)]"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#ff6a2b] text-white rounded-br-none shadow-md shadow-[#ff6a2b]/20'
                      : 'bg-[var(--card-bg)] hairline-all text-[var(--text-primary)] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="font-mono text-[9px] text-[var(--text-muted)] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[var(--card-bg)] hairline-all text-[var(--text-muted)] font-mono text-[11px] max-w-[70%]">
                <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
                <span>Checking knowledge base...</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-[11px] flex items-center gap-2">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 hairline-t bg-[var(--bg-surface-elevated)]"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={300}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about audit, publications, code..."
                className="flex-1 px-3.5 py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] focus:outline-none focus:ring-1 focus:ring-[#ff6a2b] text-xs font-sans placeholder:text-[var(--text-muted)]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white flex items-center justify-center disabled:opacity-40 shadow-md shadow-[#ff6a2b]/30 transition-all flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between px-2 pt-1.5 font-mono text-[10px] text-[var(--text-muted)]">
              <span>{input.length}/300 chars</span>
              <span>{10 - userMessageCount} messages left</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AskKasakDrawer;
