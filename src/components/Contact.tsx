import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Github, Linkedin, ExternalLink, ArrowUp, MapPin, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'arorakasak2005@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 sm:py-36 hairline-t bg-[var(--bg-canvas)] transition-colors relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mono-label text-[#ff6a2b] mb-6 flex items-center gap-2 font-semibold">
          <span>06 / CONTACT &amp; INQUIRIES</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
        </div>

        {/* Oversized Full-Width Editorial Headline */}
        <div className="mb-14">
          <h2
            id="contact-heading"
            className="font-serif font-normal text-[var(--text-primary)] tracking-tight leading-[0.95]"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 7.5rem)',
            }}
          >
            Let's work <span className="italic text-[#ff6a2b]">together</span>.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed">
            Open to data analytics, AI/ML research collaborations, government audit technology, and guest teaching opportunities.
          </p>
        </div>

        {/* Big Interactive Mailto Card */}
        <div className="bento-card bg-white dark:bg-[#141310] rounded-3xl p-6 sm:p-12 mb-16 hairline-all group relative overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                PRIMARY DIRECT INQUIRY
              </span>
              <a
                href={`mailto:${email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                className="mt-2 block font-serif text-2xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors tracking-tight"
              >
                {email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full hairline-all bg-[var(--bg-surface-elevated)] hover:border-[#ff6a2b] text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] transition-all"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#ff6a2b]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg shadow-[#ff6a2b]/25"
              >
                <span>Compose Email</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Profiles Grid & Location Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/kasak-batra/"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bg-white dark:bg-[#141310] rounded-2xl p-6 flex items-center justify-between group shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <Linkedin size={20} className="text-[#ff6a2b]" />
              <div>
                <div className="font-serif text-lg text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors">
                  LinkedIn
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] font-medium">
                  kasak-batra
                </div>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[var(--text-muted)] group-hover:text-[#ff6a2b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/KASAKBATRA"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bg-white dark:bg-[#141310] rounded-2xl p-6 flex items-center justify-between group shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <Github size={20} className="text-[#ff6a2b]" />
              <div>
                <div className="font-serif text-lg text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors">
                  GitHub
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] font-medium">
                  KASAKBATRA
                </div>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[var(--text-muted)] group-hover:text-[#ff6a2b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Resume Download Card */}
          <a
            href="/Kasak_Resume.pdf"
            download="Kasak_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bg-white dark:bg-[#141310] rounded-2xl p-6 flex items-center justify-between group shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <ExternalLink size={20} className="text-[#ff6a2b]" />
              <div>
                <div className="font-serif text-lg text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors">
                  Curriculum Vitae
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] font-medium">
                  Kasak_Resume.pdf
                </div>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[var(--text-muted)] group-hover:text-[#ff6a2b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

        </div>

        {/* Footer Editorial Metadata Strip */}
        <div className="pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} KASAK BATRA. ALL RIGHTS RESERVED.</span>
            <span>·</span>
            <span>NEW DELHI (IST / UTC+5:30)</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-[#ff6a2b] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Contact;