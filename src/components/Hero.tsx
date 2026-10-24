import React, { useState, useEffect } from 'react';
import { ArrowDownRight, Download, Mail, ExternalLink, Sparkles } from 'lucide-react';
import AuditDataEngine from './AuditDataEngine';

const TOOLS_MARQUEE = [
  'Python',
  'SQL',
  'KNIME',
  'Power BI',
  'AWS S3',
  'Pandas',
  'Scikit-learn',
  'OpenCV',
  'Neon Database',
  'GeoPandas',
  'NumPy',
  'ETL Pipelines'
];

interface HeroProps {
  onExploreClick?: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse offset from screen center (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Interactive Faint Dotted Grid */}
      <div
        className="hero-dot-grid absolute inset-0 pointer-events-none opacity-40 dark:opacity-30 light:opacity-20 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Editorial Sub-Header / Location Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 hairline-b">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
            <span className="mono-label text-[#9a968d] light:text-[#6b665c]">
              DELHI, INDIA · 28.6139° N, 77.2090° E
            </span>
          </div>
          <div className="mono-label text-[#ff6a2b] font-medium tracking-widest">
            OFFICE OF THE COMPTROLLER & AUDITOR GENERAL OF INDIA
          </div>
        </div>

        {/* 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Big Headline & Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Role Tag in Mono with Glowing Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full hairline-all bg-[#161512] dark:bg-[#161512] light:bg-[#ffffff] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff6a2b]" />
              <span className="font-mono text-xs text-[#f2efe8] light:text-[#141311] tracking-wider">
                Data Analytics @ CAG · GATE 2026 · UGC NET
              </span>
            </div>

            {/* Giant Headline with hand-drawn SVG underline on "audit-ready" */}
            <h1
              className="font-serif font-normal text-[#f2efe8] light:text-[#141311] tracking-tight leading-[0.98]"
              style={{
                fontSize: 'clamp(2.75rem, 6.8vw, 6.2rem)',
              }}
            >
              I turn messy data into{' '}
              <span className="relative inline-block text-[#ff6a2b] font-medium italic">
                audit-ready
                {/* Hand-drawn style animated underline SVG */}
                <svg
                  className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-4 text-[#ff6a2b] pointer-events-none overflow-visible"
                  viewBox="0 0 260 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13C65 5 185 3 257 11C210 15 95 17 40 16"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hand-drawn-path"
                  />
                </svg>
              </span>{' '}
              insight.
            </h1>

            {/* Subtext - Editorial copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#9a968d] light:text-[#6b665c] font-normal max-w-2xl leading-relaxed">
              B.Tech graduate in Artificial Intelligence & Data Science, working in data analytics and remote audit at the Office of the Comptroller & Auditor General of India. I also teach, mentor and write about machine learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-lg shadow-[#ff6a2b]/25 hover:shadow-xl hover:shadow-[#ff6a2b]/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get in touch</span>
                <ArrowDownRight size={17} className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full hairline-all bg-[#141310] dark:bg-[#141310] light:bg-[#ffffff] hover:border-[#ff6a2b]/50 text-[#f2efe8] light:text-[#141311] font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>See my work</span>
              </a>

              <a
                href="/Kasak_Resume.pdf"
                download="Kasak_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full hairline-all bg-transparent hover:bg-[#ff6a2b]/10 text-[#9a968d] light:text-[#6b665c] hover:text-[#ff6a2b] font-mono text-xs uppercase tracking-wider transition-all duration-300"
              >
                <Download size={14} />
                <span>Resume (PDF)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Live Audit Data Engine (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Subtle accent glow behind the terminal */}
              <div
                className="absolute -inset-4 bg-[#ff6a2b]/10 rounded-3xl blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />
              <AuditDataEngine />
            </div>
          </div>

        </div>

      </div>

      {/* Scrolling Marquee Strip */}
      <div className="w-full mt-16 sm:mt-24 hairline-t hairline-b bg-[#12110e] dark:bg-[#12110e] light:bg-[#faf8f5] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex items-center gap-8 animate-marquee group-hover:[animation-play-state:paused]">
            {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((tool, idx) => (
              <span key={`${tool}-${idx}`} className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#9a968d] light:text-[#6b665c]">
                  {tool}
                </span>
                <span className="text-[#ff6a2b] text-xs">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;