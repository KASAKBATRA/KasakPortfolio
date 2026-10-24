import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ExternalLink, Sparkles, ShoppingBag } from 'lucide-react';

interface BookPageFlipProps {
  className?: string;
}

export const BookPageFlip: React.FC<BookPageFlipProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const totalLeaves = 3; // 0: Cover, 1: Preface/TOC, 2: Chapter/Epilogue

  // Scroll driven page flip
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far container is within the viewport (0 to 1)
      const elementHeight = rect.height;
      const visibleAmount = windowHeight - rect.top;
      const totalRange = windowHeight + elementHeight;
      const progress = Math.min(Math.max(visibleAmount / totalRange, 0), 1);
      
      setScrollProgress(progress);

      // Automatically map middle scroll band to page turns if user hasn't manually taken over
      if (progress > 0.35 && progress <= 0.55 && currentPage === 0) {
        setCurrentPage(1);
      } else if (progress > 0.55 && currentPage === 1) {
        setCurrentPage(2);
      } else if (progress < 0.30 && currentPage !== 0) {
        setCurrentPage(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalLeaves));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  // Rotation angles for leaves:
  // leaf 0: turns when currentPage >= 1
  // leaf 1: turns when currentPage >= 2
  // leaf 2: turns when currentPage >= 3
  const getLeafRotation = (leafIndex: number) => {
    if (currentPage > leafIndex) {
      return -180;
    }
    return 0;
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Book Stage */}
      <div
        className="relative w-[300px] sm:w-[360px] md:w-[420px] h-[440px] sm:h-[490px] md:h-[530px]"
        style={{
          perspective: '1800px',
        }}
      >
        {/* Book Drop Shadow on Surface */}
        <div
          className="absolute -bottom-8 left-4 right-4 h-10 bg-black/40 dark:bg-black/60 rounded-full blur-2xl transition-all duration-500"
          style={{
            transform: `scale(${currentPage > 0 ? 1.15 : 0.95}) translateY(${isHovered ? '8px' : '0px'})`,
          }}
        />

        {/* Central Book Spine & Binding Rig */}
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(6deg) rotateY(${currentPage > 0 ? '-6deg' : '0deg'}) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
          }}
        >
          {/* Back hard cover base */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-md bg-[#12110e] border border-[#262420] shadow-2xl"
            style={{
              transform: 'translateZ(-12px)',
            }}
          />

          {/* Book Page Stack Thickness Simulation (bottom/right edge) */}
          <div
            className="absolute right-0 top-3 bottom-3 w-4 bg-gradient-to-l from-[#d4cfc5] to-[#f4f1ea] rounded-r-sm border-r border-[#b0aaa0]"
            style={{
              transform: 'rotateY(90deg) translateZ(-2px) translateX(6px)',
              transformOrigin: 'right',
            }}
          />

          {/* ================= LEAF 3: CHAPTER & EPILOGUE ================= */}
          <div
            className="absolute inset-0 rounded-r-xl rounded-l-sm transition-transform duration-700 ease-out origin-left cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${getLeafRotation(2)}deg)`,
              zIndex: currentPage > 2 ? 30 : 10,
            }}
            onClick={() => (currentPage > 2 ? prevPage() : nextPage())}
          >
            {/* Front: Practical Audit Insight */}
            <div
              className="absolute inset-0 rounded-r-xl rounded-l-sm p-6 sm:p-8 bg-[#faf8f5] dark:bg-[#181613] text-[#141311] dark:text-[#f2efe8] border border-[#e5e0d6] dark:border-[#2e2a24] shadow-md overflow-hidden flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 8%, transparent 100%)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#dedad2] dark:border-[#2e2a24] pb-2 text-[10px] font-mono uppercase tracking-wider text-[var(--accent-small)]">
                  <span>Part IV · Public Sector Telemetry</span>
                  <span>Page 142</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)]">
                  Reconciliation &amp; Anomaly Vectors
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  "In sovereign auditing, anomalies are not mere statistical outliers. They represent systematic variance in disbursement timelines, vendor reconciliations, or biometric duplicate collisions."
                </p>
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-[#ff6a2b] space-y-1">
                  <div>Z-Score Formulation:</div>
                  <div className="font-serif text-sm italic text-[var(--text-primary)]">Z = (x - μ) / σ &gt; 2.5</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Flags multi-crore disbursement discrepancies in real-time.</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] pt-2 border-t border-[#dedad2] dark:border-[#2e2a24]">
                <span>Click to turn page</span>
                <span>Hello AI / Kasak Batra</span>
              </div>
            </div>

            {/* Back: Back Cover & ISBN */}
            <div
              className="absolute inset-0 rounded-l-xl rounded-r-sm p-6 sm:p-8 bg-[#12110e] text-[#f2efe8] border border-[#2a2722] shadow-2xl flex flex-col justify-between overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#ff854d]">
                  <span>ELIVA PRESS EUROPE</span>
                  <span>ACADEMIC MONOGRAPH</span>
                </div>
                <h4 className="font-serif text-2xl text-[#f2efe8] font-normal">
                  About the Author
                </h4>
                <p className="text-xs text-[#c8c4bc] leading-relaxed">
                  Kasak Batra is an AI &amp; Data Science engineer working in public sector analytics at CAG. GATE 2026 and UGC NET qualified, she dedicates her work to turning chaotic telemetry into audit-ready truth.
                </p>
                <div className="pt-2">
                  <div className="text-[10px] font-mono uppercase text-[#9e9a91]">Distributed Worldwide</div>
                  <div className="text-xs font-mono text-[#ff6a2b] mt-0.5">Amazon India · Eliva Press Catalog</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262420] flex items-center justify-between">
                <div className="font-mono text-[10px] text-[#9e9a91]">
                  ISBN 978-99993-3-171-5
                </div>
                <a
                  href="https://www.amazon.in/dp/9999331718"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ShoppingBag size={12} />
                  <span>Buy on Amazon</span>
                </a>
              </div>
            </div>
          </div>

          {/* ================= LEAF 2: PREFACE & TABLE OF CONTENTS ================= */}
          <div
            className="absolute inset-0 rounded-r-xl rounded-l-sm transition-transform duration-700 ease-out origin-left cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${getLeafRotation(1)}deg)`,
              zIndex: currentPage > 1 ? 25 : 15,
            }}
            onClick={() => (currentPage > 1 ? prevPage() : nextPage())}
          >
            {/* Front: Table of Contents */}
            <div
              className="absolute inset-0 rounded-r-xl rounded-l-sm p-6 sm:p-8 bg-[#faf8f5] dark:bg-[#181613] text-[#141311] dark:text-[#f2efe8] border border-[#e5e0d6] dark:border-[#2e2a24] shadow-md overflow-hidden flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 8%, transparent 100%)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#dedad2] dark:border-[#2e2a24] pb-2 text-[10px] font-mono uppercase tracking-wider text-[var(--accent-small)]">
                  <span>Contents &amp; Syllabus</span>
                  <span>Part I - III</span>
                </div>
                <h4 className="font-serif text-2xl text-[var(--text-primary)]">
                  Curriculum Overview
                </h4>
                
                <ul className="space-y-2.5 text-xs font-mono text-[var(--text-secondary)]">
                  <li className="flex justify-between border-b border-dashed border-[#e5e0d6] dark:border-[#2e2a24] pb-1">
                    <span>01 / The Geometry of Features</span>
                    <span className="text-[#ff6a2b]">p. 18</span>
                  </li>
                  <li className="flex justify-between border-b border-dashed border-[#e5e0d6] dark:border-[#2e2a24] pb-1">
                    <span>02 / Regression &amp; Loss Landscapes</span>
                    <span className="text-[#ff6a2b]">p. 45</span>
                  </li>
                  <li className="flex justify-between border-b border-dashed border-[#e5e0d6] dark:border-[#2e2a24] pb-1">
                    <span>03 / Unsupervised Clustering &amp; PCA</span>
                    <span className="text-[#ff6a2b]">p. 82</span>
                  </li>
                  <li className="flex justify-between border-b border-dashed border-[#e5e0d6] dark:border-[#2e2a24] pb-1">
                    <span>04 / Convolutional Neural Vision</span>
                    <span className="text-[#ff6a2b]">p. 119</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] pt-2 border-t border-[#dedad2] dark:border-[#2e2a24]">
                <span>Click to turn page →</span>
                <span>Page 09</span>
              </div>
            </div>

            {/* Back: Chapter Spotlight */}
            <div
              className="absolute inset-0 rounded-l-xl rounded-r-sm p-6 sm:p-8 bg-[#faf8f5] dark:bg-[#181613] text-[#141311] dark:text-[#f2efe8] border border-[#e5e0d6] dark:border-[#2e2a24] shadow-md flex flex-col justify-between overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 8%, transparent 100%)',
              }}
            >
              <div className="space-y-3">
                <div className="text-[10px] font-mono uppercase text-[var(--accent-small)]">
                  Chapter Spotlight · Core Insight
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)]">
                  "Demystifying Neural Weight Trajectories"
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  "Gradient descent is simply gravity in a high-dimensional mathematical valley. Once students see error loss as a landscape rather than abstract calculus, learning compounds naturally."
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#ff6a2b]">
                  <Sparkles size={14} />
                  <span>Tested across 150+ students at DICS</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[var(--text-muted)] border-t border-[#dedad2] dark:border-[#2e2a24] pt-2 flex justify-between">
                <span>Page 58</span>
                <span>← Click to go back</span>
              </div>
            </div>
          </div>

          {/* ================= LEAF 1: FRONT COVER ================= */}
          <div
            className="absolute inset-0 rounded-r-xl rounded-l-sm transition-transform duration-700 ease-out origin-left cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${getLeafRotation(0)}deg)`,
              zIndex: currentPage > 0 ? 20 : 25,
            }}
            onClick={() => (currentPage > 0 ? prevPage() : nextPage())}
          >
            {/* Front: SVG Book Cover */}
            <div
              className="absolute inset-0 rounded-r-xl rounded-l-sm overflow-hidden shadow-2xl border-l-4 border-l-[#241f18]"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                src="/projects/hello-ai-cover.svg"
                alt="Hello AI by Kasak Batra Book Cover"
                className="w-full h-full object-cover"
              />
              {/* Interactive Prompt Overlay */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
                <BookOpen size={12} className="text-[#ff6a2b]" />
                <span>Scroll or click to open 📖</span>
              </div>
            </div>

            {/* Back of Front Cover: Preface & Author Inscription */}
            <div
              className="absolute inset-0 rounded-l-xl rounded-r-sm p-6 sm:p-8 bg-[#f5f2eb] dark:bg-[#161411] text-[#141311] dark:text-[#f2efe8] border border-[#e5e0d6] dark:border-[#2a2620] shadow-xl flex flex-col justify-between overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(to left, rgba(0,0,0,0.12) 0%, transparent 12%, transparent 100%)',
              }}
            >
              <div className="space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#ff6a2b]">
                  AUTHOR'S PREFACE
                </div>
                <h4 className="font-serif text-2xl font-normal text-[var(--text-primary)]">
                  To Every Curious Practitioner
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed italic">
                  "This volume was distilled from late-night experiments and classroom blackboards, bridging algorithmic rigor with everyday intuition. May it serve as your dependable map through the territory of intelligent computation."
                </p>
                <div className="pt-2 font-serif text-base text-[var(--text-primary)]">
                  — Kasak Batra
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] pt-3 border-t border-[#dedad2] dark:border-[#2e2a24]">
                <span>Eliva Press · First Edition</span>
                <span>Page 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Flip Navigation Bar & Status */}
      <div className="mt-8 flex items-center justify-between gap-4 w-full max-w-sm px-3 py-2 rounded-full hairline-all bg-white/95 dark:bg-[#161512]/95 backdrop-blur-md shadow-lg">
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            currentPage === 0
              ? 'opacity-30 cursor-not-allowed text-[var(--text-muted)]'
              : 'hover:bg-[#ff6a2b]/15 text-[#ff6a2b]'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)] font-medium">
          <BookOpen size={14} className="text-[#ff6a2b]" />
          <span>
            {currentPage === 0 && 'Cover View'}
            {currentPage === 1 && 'Pages 01 – 09 (Preface & TOC)'}
            {currentPage === 2 && 'Pages 58 – 142 (Core Chapters)'}
            {currentPage === 3 && 'Back Cover & Purchasing'}
          </span>
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage >= totalLeaves}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            currentPage >= totalLeaves
              ? 'opacity-30 cursor-not-allowed text-[var(--text-muted)]'
              : 'hover:bg-[#ff6a2b]/15 text-[#ff6a2b]'
          }`}
          aria-label="Next Page"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Scroll indicator hint */}
      <div className="mt-2 text-[11px] font-mono text-[var(--text-muted)]">
        Flip via scrolling or use arrows · {currentPage} of {totalLeaves} leaves opened
      </div>
    </div>
  );
};

export default BookPageFlip;
