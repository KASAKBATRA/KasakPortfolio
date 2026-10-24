import React from 'react';
import { Mail, ArrowDown, Download, Award, BookOpen, GraduationCap, CheckCircle2, Github, Linkedin, ExternalLink, Sparkles, Database, FileSpreadsheet, Binary } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statCards = [
    {
      stat: '94.5%',
      label: 'B.Tech, AI & Data Science (2026)',
      detail: 'Dr. Akhilesh Das Gupta Institute (ADGIPS)',
      icon: GraduationCap,
      color: 'from-blue-400 via-cyan-400 to-teal-300',
      badge: 'Gold Tier Performance'
    },
    {
      stat: 'GATE 2026',
      label: 'AI & Data Science, qualified',
      detail: 'National Graduate Aptitude Test in Engineering',
      icon: CheckCircle2,
      color: 'from-cyan-400 via-teal-300 to-emerald-400',
      badge: 'National Ranker'
    },
    {
      stat: 'UGC NET',
      label: 'Computer Science Applications',
      detail: 'Assistant Professorship Eligibility',
      icon: Award,
      color: 'from-purple-400 via-fuchsia-400 to-pink-400',
      badge: 'Qualified'
    },
    {
      stat: '3 papers + 1 book',
      label: 'published research and authorship',
      detail: 'Eliva Press Author & Conference Presenter',
      icon: BookOpen,
      color: 'from-amber-300 via-orange-400 to-rose-400',
      badge: 'Published Author'
    }
  ];

  return (
    <section 
      id="home" 
      aria-labelledby="hero-heading"
      className="pt-16 pb-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900"
    >
      {/* Dynamic Cyber / Mesh Glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-48 -right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse-glow animation-delay-1500" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Headline & Positioning Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Live Role Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-morphism border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-950/40 hover:border-cyan-400/60 transition-all duration-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span>Young Professional • Office of the CAG of India</span>
              <span className="hidden sm:inline-block text-slate-500">|</span>
              <span className="hidden sm:inline-block text-slate-300">Remote Audit &amp; Data Analytics</span>
            </div>

            {/* Impactful Heading */}
            <h1 
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight"
            >
              I turn messy data into{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
                audit-ready insight.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              B.Tech graduate in Artificial Intelligence &amp; Data Science, working in data analytics and remote audit at the Office of the Comptroller &amp; Auditor General of India. I also teach, mentor and write about machine learning.
            </p>

            {/* Action Buttons with rich hover and glow */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-semibold transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Mail size={18} className="group-hover:rotate-12 transition-transform duration-200" aria-hidden="true" />
                <span>Get in touch</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#projects')}
                className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 hover:border-cyan-500/50 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <ArrowDown size={18} className="text-cyan-400" aria-hidden="true" />
                <span>See my work</span>
              </button>

              <a
                href="/Kasak_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/20 font-semibold transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md"
              >
                <Download size={18} aria-hidden="true" />
                <span>Download resume</span>
              </a>
            </div>

            {/* Social quick connections */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="font-medium text-slate-500 uppercase tracking-wider text-[11px]">Connect:</span>
              <a
                href="https://www.linkedin.com/in/kasak-batra/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors p-1"
                aria-label="Kasak on LinkedIn"
              >
                <Linkedin size={16} className="text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://github.com/KASAKBATRA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors p-1"
                aria-label="Kasak on GitHub"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://drive.google.com/drive/folders/1AzPBkq6D4piA5sCly7odkmMOhpYQDNzi?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors p-1"
                aria-label="Kasak Drive Credentials"
              >
                <ExternalLink size={14} className="text-emerald-400" />
                <span>Drive Folder</span>
              </a>
            </div>

          </div>

          {/* Right Column: Creative 3D Portrait & Micro Tech Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              
              {/* Pulsing back glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />

              {/* Main portrait container */}
              <div className="relative rounded-3xl glass-morphism p-4 border border-slate-700/80 shadow-2xl">
                
                {/* Photo frame */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700/60 aspect-square flex items-center justify-center">
                  <img
                    src="/kasak-removebg-preview.png"
                    alt="Kasak — AI & Data Science"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  />
                  
                  {/* Subtle corner tech badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300">
                    <Sparkles size={12} className="text-cyan-400" />
                    <span>AI &amp; Data Science</span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                    <Database size={12} className="text-emerald-400" />
                    <span>CAG Remote Audit</span>
                  </div>
                </div>

                {/* Micro info strip */}
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="font-medium text-white">Available for Technical Inquiries</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">Delhi, India</span>
                </div>
              </div>

              {/* Floating ambient badge 1 */}
              <div className="hidden sm:flex absolute -top-5 -left-6 glass-morphism px-3.5 py-2 rounded-xl border border-cyan-500/40 shadow-xl items-center gap-2 text-xs font-semibold text-white animate-float">
                <FileSpreadsheet size={16} className="text-cyan-400" />
                <span>SQL &amp; KNIME Workflows</span>
              </div>

              {/* Floating ambient badge 2 */}
              <div className="hidden sm:flex absolute -bottom-5 -right-6 glass-morphism px-3.5 py-2 rounded-xl border border-purple-500/40 shadow-xl items-center gap-2 text-xs font-semibold text-white animate-float animation-delay-2000">
                <Binary size={16} className="text-purple-400" />
                <span>3 Papers + 1 Book</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Stat Cards below hero */}
        <div className="mt-20">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Key Academic &amp; Professional Milestones
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl glass-morphism border border-slate-700/70 hover:border-cyan-500/50 transition-all duration-300 hover-lift-glow flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {card.badge}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-800/80 text-cyan-400 border border-slate-700/60 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent size={20} aria-hidden="true" />
                    </div>
                  </div>

                  <div>
                    <div className={`text-2xl sm:text-3xl font-extrabold font-display bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-1`}>
                      {card.stat}
                    </div>
                    <div className="text-sm font-semibold text-white leading-snug mb-1">
                      {card.label}
                    </div>
                    <div className="text-xs text-slate-400 leading-tight">
                      {card.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;