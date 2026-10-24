import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, ArrowDownRight, Download, ExternalLink, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestChips?: string[];
  actionLink?: { label: string; url: string; isDownload?: boolean };
}

const DEFAULT_CHIPS = [
  "What is Kasak's role at CAG?",
  "Tell me about MapMyWork",
  "Research papers & Book",
  "GATE & UGC NET Scores",
  "Download Resume",
  "How to get in touch?"
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro-msg',
    sender: 'assistant',
    text: "Hello! I am Kasak's portfolio assistant. Grounded in her public sector audit work at CAG, published machine learning textbook, research papers, and technical projects. How can I help you today?",
    timestamp: 'Just now',
    suggestChips: ["Role at CAG", "View Projects", "Academic Merit", "Contact Kasak"]
  }
];

// Comprehensive grounded knowledge response generator
function getGroundedReply(rawQuery: string): { text: string; suggestChips?: string[]; actionLink?: { label: string; url: string; isDownload?: boolean } } {
  const q = rawQuery.toLowerCase().trim().replace(/[?!.,;:]/g, '');

  // 1. Casual Greetings & conversational pleasantries (English, Hindi, Hinglish)
  if (/^(hi|hie|hii|hiii|hello|helo|hey|heyy|heya|yo|sup|namaste|hola|greetings)\b/.test(q) || q === 'hi' || q === 'hie' || q === 'hey') {
    return {
      text: "Hey there! 👋 Wonderful to connect with you. I can tell you all about Kasak's remote audit engineering at CAG, her published book 'Hello AI', her 94.5% B.Tech distinction, or her machine learning projects. What would you like to know?",
      suggestChips: ["What does she do at CAG?", "Show me her projects", "Tell me about Hello AI", "Download Resume"]
    };
  }

  if (/^(kaise ho|kya haal|kya haal hai|kya chal raha hai|sab theek|kese ho|how are you|how do you do)/.test(q)) {
    return {
      text: "Main bilkul badiya hoon! 😊 (I'm doing great!). I am here to help you explore Kasak Batra's portfolio, research publications, government audit pipelines, and qualifications. Aap Kasak ke baare mein kya janna chahenge?",
      suggestChips: ["Role at CAG", "Top Projects", "Published Papers", "Contact Email"]
    };
  }

  if (/^(hmm+|hmmm|ok|okay|k|cool|nice|great|awesome|acha|accha|theek|sahi|got it|understood|thx|thanks|thank you)/.test(q)) {
    return {
      text: "Awesome! Let me know if you'd like to dive into any specific topic, like her KNIME data pipelines, MapMyWork GIS tool, or her software faculty experience at DICS.",
      suggestChips: ["MapMyWork project", "CAG Audit Pipelines", "GATE 2026 Qualification", "Get in touch"]
    };
  }

  // 2. Who is Kasak / About / Introduction
  if (q.includes('who is kasak') || q.includes('about kasak') || q.includes('introduce') || q.includes('profile') || q.includes('kasak kon hai') || q.includes('tell me about') || q === 'who are you') {
    return {
      text: "Kasak Batra is an AI & Data Science graduate (94.5% aggregate) working as a Young Professional in Data Analytics at the Office of the Comptroller & Auditor General of India (CAG). She has qualified both GATE 2026 (AI & Data Science) and UGC NET (Computer Science Applications), authored the machine learning textbook 'Hello AI' (Eliva Press), and published 3 peer-reviewed research papers.",
      suggestChips: ["Her work at CAG", "GATE & UGC NET", "Research & Book", "Technical Skills"]
    };
  }

  // 3. CAG / Job / Work / Experience / Remote Audit
  if (q.includes('cag') || q.includes('job') || q.includes('audit') || q.includes('role') || q.includes('comptroller') || q.includes('work') || q.includes('experience') || q.includes('office')) {
    return {
      text: "At the Office of the Comptroller & Auditor General of India (CAG), Kasak serves as a Young Professional in Data Analytics. Her core contributions include:\n\n• Developing automated KNIME ETL pipelines for data validation, duplicate isolation, and anomaly detection.\n• Building REST APIs moving large-scale NREGA and GeM procurement records between databases and AWS S3.\n• Executing SQL-based telemetry analytics on national welfare datasets.\n• Evaluating Multimodal Vision Language Models (VLMs) for product-image consistency in government procurement.",
      suggestChips: ["Projects stack", "Published Research", "Education details", "Contact Kasak"]
    };
  }

  // 4. Teaching / DICS / Faculty / Mentorship
  if (q.includes('teach') || q.includes('faculty') || q.includes('dics') || q.includes('mentor') || q.includes('student') || q.includes('delhi institute')) {
    return {
      text: "Kasak served as a Software Faculty member at Delhi Institute of Computer Science (DICS) from July to September 2026. She trained over 150+ students in Python, C, C++, Java, SQL, Data Structures & Algorithms (DSA), Operating Systems, and Machine Learning. She also mentored hackathon teams with Codeveda!",
      suggestChips: ["Her Qualifications", "Machine Learning Skills", "Role at CAG"]
    };
  }

  // 5. Book & Publications ("Hello AI", Papers, Research)
  if (q.includes('book') || q.includes('hello ai') || q.includes('author') || q.includes('isbn') || q.includes('eliva') || q.includes('amazon')) {
    return {
      text: "Kasak authored the book \"Hello AI: A Friendly Introduction to Machine Learning\" published internationally with Eliva Press (ISBN: 9999331718). It serves as an intuitive guide to machine learning paradigms, foundational algorithms, regression, and neural networks, and is available on Amazon India.",
      actionLink: { label: "View on Amazon India", url: "https://www.amazon.in/dp/9999331718" },
      suggestChips: ["Her Research Papers", "View Projects", "Academic Scores"]
    };
  }

  if (q.includes('research') || q.includes('paper') || q.includes('publication') || q.includes('journal') || q.includes('nutricaree') || q.includes('smart cit') || q.includes('pencil')) {
    return {
      text: "Kasak has authored 3 peer-reviewed research publications:\n1. \"Nutricaree: Bridging Nutrition Science and Digital Wellness\" – IJEDR Journal, Vol. 13, Issue 4 (Nov 2025)\n2. \"Data Science Solutions for Next Generation Cities\" – IJPREMS Journal, Vol. 04, Issue 11 (Nov 2024)\n3. \"Image to Pencil Recognition using Machine Learning and OpenCV\" – presented at NCBISF'24 National Conference.",
      suggestChips: ["Hello AI Book", "OpenCV Vision", "CAG Experience"]
    };
  }

  // 6. MapMyWork
  if (q.includes('mapmywork') || q.includes('map') || q.includes('geospatial') || q.includes('gis') || q.includes('geopandas')) {
    return {
      text: "MapMyWork is Kasak's interactive geospatial workforce mapping application. Built with Python, GeoPandas, Pandas, and Matplotlib, it visualizes workforce distribution across Indian cities with custom user-driven filters, density clustering, and clickable map pins showing regional telemetry.",
      actionLink: { label: "View GitHub Repository", url: "https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-" },
      suggestChips: ["CampusHire Project", "EmotionsMemoria", "Skills used"]
    };
  }

  // 7. CampusHire Analytics
  if (q.includes('campushire') || q.includes('placement') || q.includes('candidate') || q.includes('hire')) {
    return {
      text: "CampusHire Analytics is an automated candidate verification and placement telemetry system with a SQL backend and responsive web UI. It automates credential checking, recruiter verification, and candidate audit logs for campus recruitment drives.",
      actionLink: { label: "View GitHub Repository", url: "https://github.com/KASAKBATRA/CampusHire_Analytics" },
      suggestChips: ["MapMyWork", "EmotionsMemoria", "CAG Audit Analytics"]
    };
  }

  // 8. EmotionsMemoria
  if (q.includes('emotion') || q.includes('memoria')) {
    return {
      text: "EmotionsMemoria is an interactive live web application created by Kasak that transforms digital photos into sentimental memory capsules using AI emotion detection wheels, color-coded sentiment spectrums, and preservation certificates.",
      actionLink: { label: "Open Live App", url: "https://emotionsmemoria.netlify.app/" },
      suggestChips: ["Other Projects", "Skills & Tech", "Contact Kasak"]
    };
  }

  // 9. Projects general
  if (q.includes('project') || q.includes('github') || q.includes('portfolio') || q.includes('code')) {
    return {
      text: "Kasak's highlighted technical systems include:\n• MapMyWork: Geospatial workforce intelligence (Python, GeoPandas, GIS)\n• CampusHire Analytics: Automated placement verification (SQL, JS)\n• CAG Audit Analytics: Automated KNIME pipelines, REST APIs, AWS S3\n• EmotionsMemoria: AI emotion detection memory web app (Live on Netlify)\n\nAll code is available on her GitHub: github.com/KASAKBATRA",
      actionLink: { label: "Visit GitHub Profile", url: "https://github.com/KASAKBATRA" },
      suggestChips: ["MapMyWork", "CAG Pipelines", "Hello AI Book"]
    };
  }

  // 10. Education, Scores, Marks, College, B.Tech
  if (q.includes('education') || q.includes('score') || q.includes('mark') || q.includes('percentage') || q.includes('percent') || q.includes('94.5') || q.includes('btech') || q.includes('college') || q.includes('degree') || q.includes('adgitm') || q.includes('school')) {
    return {
      text: "Kasak's academic pedigree includes:\n• B.Tech in Artificial Intelligence & Data Science: 94.5% aggregate (Class of 2026) at Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGITM / GGSIPU)\n• CBSE Class XII: 89.0% (2022)\n• CBSE Class X: 84.0% (2020)\n• Consistent distinction holder and EPAM Scholar (2024–25).",
      suggestChips: ["GATE 2026 Qualified", "UGC NET Qualified", "View Certifications"]
    };
  }

  // 11. GATE & UGC NET
  if (q.includes('gate') || q.includes('net') || q.includes('ugc') || q.includes('exam') || q.includes('competitive') || q.includes('qualified')) {
    return {
      text: "Kasak has qualified two prestigious national competitive examinations:\n1. GATE 2026 Qualified in the dedicated Artificial Intelligence & Data Science (DA) paper.\n2. UGC NET Qualified in Computer Science & Applications (certified for Assistant Professorship by NTA).",
      suggestChips: ["B.Tech Percentage", "Role at CAG", "Download Resume"]
    };
  }

  // 12. Skills & Tech Stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('sql') || q.includes('knime') || q.includes('tool') || q.includes('language')) {
    return {
      text: "Kasak's technical competencies span:\n• Programming: Python, SQL, R, Java, C, JavaScript, HTML, CSS\n• Data Analytics: SQL, KNIME, Power BI, ETL, Data Validation, Data Cleaning\n• Machine Learning: Regression, Classification, Clustering, NLP, Feature Engineering, OpenCV\n• Cloud & Storage: AWS S3, MySQL, Neon Database\n• Libraries: NumPy, Pandas, Scikit-learn, Matplotlib, GeoPandas",
      suggestChips: ["Projects built", "Role at CAG", "Download Resume"]
    };
  }

  // 13. Resume / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('biodata')) {
    return {
      text: "You can download Kasak Batra's official verified resume directly. It includes complete details on her CAG Young Professional role, research papers, GATE/UGC NET qualifications, and project links.",
      actionLink: { label: "Download Kasak_Resume.pdf", url: "/Kasak_Resume.pdf", isDownload: true },
      suggestChips: ["Contact Kasak", "Role at CAG", "View Projects"]
    };
  }

  // 14. Contact / Email / Location / Reach out
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('phone') || q.includes('linkedin') || q.includes('connect') || q.includes('mail') || q.includes('location') || q.includes('where')) {
    return {
      text: "You can reach Kasak directly via:\n• Email: arorakasak2005@gmail.com\n• LinkedIn: linkedin.com/in/kasak-batra\n• Location: New Delhi, India (IST / UTC+5:30)\n\nShe is open to data analytics, AI/ML research collaborations, sovereign audit consulting, and guest lecturing opportunities.",
      actionLink: { label: "Compose Email to Kasak", url: "mailto:arorakasak2005@gmail.com?subject=Collaboration%20Inquiry%20via%20Portfolio" },
      suggestChips: ["Download Resume", "View LinkedIn", "Explore Projects"]
    };
  }

  // 15. Beyond Work / NSS / Volunteering
  if (q.includes('beyond') || q.includes('nss') || q.includes('volunteer') || q.includes('social') || q.includes('para') || q.includes('codeveda')) {
    return {
      text: "Beyond technical work, Kasak served as the Graphics Head for the National Service Scheme (NSS), leading visual identity campaigns for community health and blood donation drives. She also mentored 15+ student teams at the Codeveda Hackathon and volunteered at the Khelo India Para Games.",
      suggestChips: ["Education & Honors", "Her Book Hello AI", "Contact Details"]
    };
  }

  // Default fallback with helpful context
  return {
    text: `Kasak Batra is an AI & Data Science specialist (94.5% aggregate) working in data analytics and remote audit at CAG. She has qualified GATE 2026 and UGC NET, published 3 research papers, and authored 'Hello AI' (Eliva Press).\n\nFeel free to ask me specifically about her projects (MapMyWork, CampusHire, CAG pipelines), published papers, skills, or download her resume!`,
    suggestChips: ["Role at CAG", "MapMyWork Project", "Published Book", "Download Resume", "Contact Email"]
  };
}

const AskKasakDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const userMessageCount = messages.filter(m => m.sender === 'user').length;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || loading) return;

    if (userMessageCount >= 25) {
      setErrorMsg("Session limit reached! Feel free to email Kasak directly at arorakasak2005@gmail.com.");
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

    // Natural simulated typing delay for realistic interaction
    setTimeout(() => {
      const response = getGroundedReply(question);

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: timeStr,
        suggestChips: response.suggestChips,
        actionLink: response.actionLink
      };

      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setErrorMsg(null);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) with sleek glassmorphism */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[var(--card-bg)]/90 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-black/10 text-[var(--text-primary)] hover:border-[#ff6a2b] shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
          aria-expanded={isOpen}
          aria-label="Open Ask Kasak AI Assistant"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] shadow-[0_0_10px_rgba(255,106,43,0.9)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold">
            Ask Kasak
          </span>
          <MessageSquare size={15} className="text-[#ff6a2b]" />
        </button>
      </div>

      {/* Floating Glassmorphic Drawer / Assistant Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[82vh] h-[580px] rounded-3xl border border-[#ff6a2b]/40 bg-[var(--card-bg)]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 30px rgba(255,106,43,0.15)',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] shadow-[0_0_8px_rgba(255,106,43,0.8)]" />
              <div>
                <h4 id="assistant-title" className="font-serif text-lg text-[var(--text-primary)] font-medium leading-tight">
                  Ask Kasak · Assistant
                </h4>
                <p className="font-mono text-[10px] text-[var(--text-muted)] font-medium">
                  Grounded in Public CAG Audit, Research &amp; Projects
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleResetChat}
                className="w-7 h-7 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[#ff6a2b] flex items-center justify-center transition-colors"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RefreshCw size={13} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[#ff6a2b] flex items-center justify-center transition-colors"
                aria-label="Close Assistant"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] flex gap-1.5 overflow-x-auto no-scrollbar">
            {DEFAULT_CHIPS.map((chip, idx) => (
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
            className="flex-1 p-4 overflow-y-auto space-y-3.5 font-sans text-xs bg-[var(--bg-canvas)]"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#ff6a2b] text-white rounded-br-none shadow-md shadow-[#ff6a2b]/20 font-medium'
                      : 'bg-[var(--card-bg)] border border-[var(--border-hairline)] text-[var(--text-primary)] rounded-bl-none shadow-md backdrop-blur-md'
                  }`}
                >
                  {msg.text}

                  {/* Optional Action Button Link (e.g. Download Resume or Amazon Book) */}
                  {msg.actionLink && (
                    <div className="mt-3 pt-2.5 border-t border-[var(--border-hairline)]">
                      <a
                        href={msg.actionLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={msg.actionLink.isDownload ? "Kasak_Resume.pdf" : undefined}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-mono text-[11px] font-semibold transition-all shadow-sm"
                      >
                        {msg.actionLink.isDownload ? <Download size={12} /> : <ExternalLink size={12} />}
                        <span>{msg.actionLink.label}</span>
                      </a>
                    </div>
                  )}

                  {/* Suggestion Chips from Assistant response */}
                  {msg.suggestChips && msg.suggestChips.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                      {msg.suggestChips.map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSendMessage(chip)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--bg-surface-elevated)] hover:bg-[#ff6a2b]/15 text-[var(--accent-small)] border border-[var(--border-hairline)] hover:border-[#ff6a2b] transition-all"
                        >
                          → {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="font-mono text-[9px] text-[var(--text-muted)] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-hairline)] text-[var(--text-muted)] font-mono text-[11px] max-w-[70%]">
                <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
                <span>Checking verified records...</span>
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
            className="p-3 border-t border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)]"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={300}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about CAG, Hello AI, scores, code..."
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
              <span className="text-[var(--accent-small)] font-medium">Grounded Portfolio AI</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AskKasakDrawer;
