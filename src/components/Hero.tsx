import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, Download, ArrowUpRight } from 'lucide-react';
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
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Maximum 6deg tilt on desktop mouse move
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    setCardTilt({ rotateX, rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  // Parallax calculations
  const scrollRatio = Math.min(Math.max(scrollY / 800, 0), 1);
  const scrollTiltX = isDesktop ? scrollRatio * 12 : 0;
  const scrollTiltY = isDesktop ? -scrollRatio * 8 : 0;
  const cardScale = isDesktop ? Math.max(1 - scrollRatio * 0.08, 0.92) : 1;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden perspective-container"
    >
      {/* Interactive Faint Dotted Grid with subtle translateZ */}
      <div
        className="hero-dot-grid absolute inset-0 pointer-events-none opacity-25 dark:opacity-35 transition-transform duration-700 ease-out"
        style={{
          transform: isDesktop
            ? `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, -40px)`
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Editorial Sub-Header / Location Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 hairline-b">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
            <span className="mono-label text-[var(--text-muted)] font-medium">
              DELHI, INDIA · 28.6139° N, 77.2090° E
            </span>
          </div>
          <div className="mono-label text-[var(--accent-small)] font-semibold tracking-widest">
            OFFICE OF THE COMPTROLLER &amp; AUDITOR GENERAL OF INDIA
          </div>
        </div>

        {/* 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Big Headline & Manifesto (7 cols) */}
          <div
            className="lg:col-span-7 space-y-8"
            style={{
              transform: isDesktop ? `translate3d(0, ${-scrollY * 0.08}px, 20px)` : undefined,
              transition: 'transform 0.1s ease-out'
            }}
          >
            
            {/* Author Profile + Role Tag Pill with Frosted Glass */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full hairline-all bg-white/95 dark:bg-[#141310]/90 backdrop-blur-md shadow-md">
                <img
                  src="/kasak-removebg-preview.png"
                  alt="Kasak Batra"
                  className="w-7 h-7 rounded-full object-cover bg-[#ff6a2b]/20 border border-[#ff6a2b]/40"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/Photo1.jpg');
                  }}
                />
                <span className="font-serif text-sm text-[var(--text-primary)] font-medium">
                  Kasak Batra
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Active at CAG" />
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full hairline-all bg-white/95 dark:bg-[#161512]/90 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#ff6a2b] shadow-[0_0_6px_rgba(255,106,43,0.8)] animate-pulse" />
                <span className="font-mono text-xs text-[var(--text-primary)] font-medium tracking-wider">
                  Data Analytics @ CAG · GATE 2026 · UGC NET
                </span>
              </div>
            </div>

            {/* Giant Headline with hand-drawn SVG underline on "audit-ready" */}
            <h1
              className="font-serif font-normal text-[var(--text-primary)] tracking-tight leading-[0.98]"
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

            {/* Subtext - High contrast editorial copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed">
              B.Tech graduate in Artificial Intelligence &amp; Data Science, working in data analytics and remote audit at the Office of the Comptroller &amp; Auditor General of India. I also teach, mentor and write about machine learning.
            </p>

            {/* CTA Buttons & 3D Narrative Scroll Prompt */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                {/* Primary "Get in touch" */}
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-lg shadow-[#ff6a2b]/25 hover:shadow-xl hover:shadow-[#ff6a2b]/35 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
                >
                  <span>Get in touch</span>
                  <ArrowDownRight size={17} className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
                </a>

                {/* Secondary "See my work" */}
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border-hairline)] bg-[var(--card-bg)] hover:border-[#ff6a2b] text-[var(--text-primary)] font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
                >
                  <span>See my work</span>
                </a>

                {/* Secondary Hero "Download resume" */}
                <a
                  href="/Kasak_Resume.pdf"
                  download="Kasak_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border-[1.5px] border-[var(--text-primary)] hover:border-[#ff6a2b] hover:bg-[#ff6a2b]/10 text-[var(--text-primary)] hover:text-[#ff6a2b] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
                >
                  <Download size={14} className="stroke-[2.5]" />
                  <span>Download resume</span>
                </a>
              </div>

              {/* 3D Scroll-Driven Story Guide */}
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b] animate-ping" />
                <span className="tracking-wide">
                  Scroll down to fly into Stage 01 · Watch chaotic records snap into validated rows
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Tilting Audit Data Engine Card (5 cols) */}
          <div
            ref={cardContainerRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="lg:col-span-5 relative perspective-container"
          >
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: isDesktop
                  ? `perspective(1200px) rotateX(${cardTilt.rotateX + scrollTiltX}deg) rotateY(${cardTilt.rotateY + scrollTiltY}deg) scale(${cardScale})`
                  : undefined,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Subtle accent glow behind the terminal */}
              <div
                className="absolute -inset-4 bg-[#ff6a2b]/15 rounded-3xl blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />
              <AuditDataEngine />
            </div>
          </div>

        </div>

      </div>

      {/* Scrolling Marquee Strip */}
      <div className="w-full mt-16 sm:mt-24 hairline-t hairline-b bg-[var(--bg-surface)] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex items-center gap-8 animate-marquee group-hover:[animation-play-state:paused]">
            {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((tool, idx) => (
              <span key={`${tool}-${idx}`} className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium">
                  {tool}
                </span>
                <span className="text-[#ff6a2b] text-xs font-bold">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;