import React, { useEffect, useState, useRef } from 'react';
import { Award, BookOpen, GraduationCap, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  suffix = '',
  prefix = ''
}) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    const duration = 1600;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVal(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const StatsBento: React.FC = () => {
  return (
    <section
      id="stats"
      aria-label="Key Milestones and Qualifications"
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-container"
    >
      {/* Section Label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="mono-label text-[var(--accent-small)] font-semibold">00.1 / BENCHMARKS &amp; CREDENTIALS</span>
        <div className="h-[1px] flex-1 bg-[var(--border-hairline)]" />
      </div>

      {/* Bento Grid with Varied Card Sizes and 3D hover lift */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Card 1: 94.5% - Large Leading Hero Bento (7 cols) */}
        <div className="md:col-span-7 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff6a2b]/40">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff6a2b]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff6a2b]/15 transition-colors" />
          
          <div className="flex items-start justify-between">
            <span className="mono-label text-[var(--text-muted)] font-semibold flex items-center gap-2">
              <GraduationCap size={16} className="text-[#ff6a2b]" />
              ACADEMIC MERIT
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#ff6a2b]/15 text-[var(--accent-small)] border border-[#ff6a2b]/30 font-semibold">
              Class of 2026
            </span>
          </div>

          <div className="my-6">
            <div className="font-serif text-5xl sm:text-7xl font-normal text-[var(--text-primary)] tracking-tight flex items-baseline">
              <AnimatedCounter target={94.5} decimals={1} suffix="%" />
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] mt-2 font-normal">
              B.Tech in Artificial Intelligence &amp; Data Science
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
              Maintained 94.5% aggregate across computational mathematics, deep learning, algorithm design, and distributed databases at Dr. Akhilesh Das Gupta Institute of Professional Studies (GGSIPU).
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span>DISTINCTION RANKING</span>
            <span className="text-[var(--text-primary)] font-medium">GGSIPU Affiliated</span>
          </div>
        </div>

        {/* Card 2: GATE 2026 Qualified (5 cols) */}
        <div className="md:col-span-5 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff6a2b]/40">
          <div className="flex items-start justify-between">
            <span className="mono-label text-[var(--text-muted)] font-semibold flex items-center gap-2">
              <Award size={16} className="text-[#ff6a2b]" />
              NATIONAL BENCHMARK
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
              Qualified
            </span>
          </div>

          <div className="my-6">
            <div className="font-serif text-4xl sm:text-5xl font-normal text-[var(--text-primary)] tracking-tight">
              GATE 2026
            </div>
            <p className="font-serif text-xl text-[var(--text-primary)] mt-1 font-normal">
              Artificial Intelligence &amp; Data Science (DA)
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              Qualified the Graduate Aptitude Test in Engineering in the dedicated AI &amp; Data Science paper.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span>EXAM DISCIPLINE</span>
            <span className="text-[var(--text-primary)] font-medium">Data Science &amp; AI</span>
          </div>
        </div>

        {/* Card 3: UGC NET Qualified (5 cols) */}
        <div className="md:col-span-5 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff6a2b]/40">
          <div className="flex items-start justify-between">
            <span className="mono-label text-[var(--text-muted)] font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#ff6a2b]" />
              NATIONAL FELLOWSHIP
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
              Certified
            </span>
          </div>

          <div className="my-6">
            <div className="font-serif text-4xl sm:text-5xl font-normal text-[var(--text-primary)] tracking-tight">
              UGC NET
            </div>
            <p className="font-serif text-xl text-[var(--text-primary)] mt-1 font-normal">
              Computer Science &amp; Applications
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              Certified for Assistant Professorship across India in Computer Science, demonstrating deep theoretical rigor across discrete structures, databases, and computation.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span>GOVERNING BODY</span>
            <span className="text-[var(--text-primary)] font-medium">NTA / University Grants Commission</span>
          </div>
        </div>

        {/* Card 4: 3 Papers + 1 Book - Wide Bento (7 cols) */}
        <div className="md:col-span-7 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff6a2b]/40">
          <div className="flex items-start justify-between">
            <span className="mono-label text-[var(--text-muted)] font-semibold flex items-center gap-2">
              <BookOpen size={16} className="text-[#ff6a2b]" />
              SCHOLARSHIP &amp; AUTHORSHIP
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#ff6a2b]/15 text-[var(--accent-small)] border border-[#ff6a2b]/30 font-semibold">
              Peer-Reviewed
            </span>
          </div>

          <div className="my-6">
            <div className="font-serif text-4xl sm:text-6xl font-normal text-[var(--text-primary)] tracking-tight flex items-baseline gap-2">
              <span>3 Papers</span>
              <span className="text-[#ff6a2b] font-serif text-3xl sm:text-4xl">+</span>
              <span>1 Book</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] mt-2 font-normal">
              Published Research &amp; Authored ML Textbook
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
              Authored <em>"Hello AI: A Friendly Introduction to Machine Learning"</em> (Eliva Press, ISBN: 9999331718), alongside three peer-reviewed publications covering smart city analytics, computational dietetics, and computer vision.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span>INDEXING &amp; VENUES</span>
            <span className="text-[var(--text-primary)] font-medium">IJEDR · IJPREMS · NCBISF'24 · Eliva Press</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsBento;
