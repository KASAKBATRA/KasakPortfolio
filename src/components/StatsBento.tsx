import React, { useEffect, useState, useRef } from 'react';
import { Award, BookOpen, GraduationCap, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

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
      // Ease out cubic
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
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="mono-label text-[#ff6a2b]">00.1 / BENCHMARKS & CREDENTIALS</span>
        <div className="h-[1px] flex-1 bg-[var(--border-hairline)]" />
      </div>

      {/* Bento Grid with Varied Card Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Card 1: 94.5% - Large Leading Hero Bento (7 cols) */}
        <div className="md:col-span-7 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff6a2b]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff6a2b]/10 transition-colors" />
          
          <div className="flex items-start justify-between">
            <span className="mono-label text-[#9a968d] light:text-[#6b665c] flex items-center gap-2">
              <GraduationCap size={15} className="text-[#ff6a2b]" />
              ACADEMIC MERIT
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#ff6a2b]/15 text-[#ff6a2b] border border-[#ff6a2b]/30">
              Class of 2026
            </span>
          </div>

          <div className="my-6">
            <div className="font-serif text-5xl sm:text-7xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight flex items-baseline">
              <AnimatedCounter target={94.5} decimals={1} suffix="%" />
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#f2efe8] light:text-[#141311] mt-2 font-normal">
              B.Tech, Artificial Intelligence & Data Science
            </p>
            <p className="text-sm text-[#9a968d] light:text-[#6b665c] mt-1 leading-relaxed">
              Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS). Academic standout across Machine Learning, Advanced Mathematics, and Distributed Systems.
            </p>
          </div>

          <div className="pt-4 hairline-t flex items-center justify-between text-xs font-mono text-[#9a968d]">
            <span>GGSIPU Affiliated</span>
            <span className="text-[#ff6a2b]">Top 1% Percentile</span>
          </div>
        </div>

        {/* Card 2: GATE 2026 Qualified (5 cols) */}
        <div className="md:col-span-5 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="mono-label text-[#9a968d] light:text-[#6b665c] flex items-center gap-2">
              <Award size={15} className="text-[#ff6a2b]" />
              NATIONAL EXAMINATION
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          <div className="my-5">
            <div className="font-serif text-4xl sm:text-5xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight">
              GATE 2026
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#ff6a2b] font-semibold mt-1">
              AI & Data Science, qualified
            </p>
            <p className="text-sm text-[#9a968d] light:text-[#6b665c] mt-2 leading-relaxed">
              Qualified the rigorous national Graduate Aptitude Test in Engineering in Artificial Intelligence & Data Science.
            </p>
          </div>

          <div className="pt-4 hairline-t text-xs font-mono text-[#9a968d]">
            National Gateway · AI & ML Specialization
          </div>
        </div>

        {/* Card 3: UGC NET Qualified (5 cols) */}
        <div className="md:col-span-5 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="mono-label text-[#9a968d] light:text-[#6b665c] flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#ff6a2b]" />
              PROFESSORSHIP & RESEARCH
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          <div className="my-5">
            <div className="font-serif text-4xl sm:text-5xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight">
              UGC NET
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#ff6a2b] font-semibold mt-1">
              Computer Science Applications
            </p>
            <p className="text-sm text-[#9a968d] light:text-[#6b665c] mt-2 leading-relaxed">
              Nationally accredited eligibility for University Teaching and Higher Research across Computer Science and Data Systems.
            </p>
          </div>

          <div className="pt-4 hairline-t text-xs font-mono text-[#9a968d]">
            National Testing Agency (NTA) Certified
          </div>
        </div>

        {/* Card 4: 3 Papers + 1 Book (7 cols wide) */}
        <div className="md:col-span-7 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="mono-label text-[#9a968d] light:text-[#6b665c] flex items-center gap-2">
              <BookOpen size={15} className="text-[#ff6a2b]" />
              SCHOLARSHIP & AUTHORSHIP
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              International Press
            </span>
          </div>

          <div className="my-5">
            <div className="font-serif text-4xl sm:text-5xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight flex items-baseline gap-2">
              <span>3 papers + 1 book</span>
            </div>
            <p className="font-serif text-lg text-[#f2efe8] light:text-[#141311] mt-1 font-normal">
              Published research and authorship
            </p>
            <p className="text-sm text-[#9a968d] light:text-[#6b665c] mt-1.5 leading-relaxed">
              Author of <em className="text-[#f2efe8] light:text-[#141311] font-serif not-italic font-medium">"Hello AI: A Friendly Introduction to Machine Learning"</em> published by Eliva Press, alongside peer-reviewed journal papers in IJEDR, IJPREMS, and NCBISF'24 conference proceedings.
            </p>
          </div>

          <div className="pt-4 hairline-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9a968d]">
            <span>Global Distribution via Amazon &amp; Eliva</span>
            <a href="#research" className="text-[#ff6a2b] hover:underline flex items-center gap-1">
              Explore Publications →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsBento;
