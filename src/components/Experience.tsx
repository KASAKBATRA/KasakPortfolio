import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Briefcase, ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  isCurrent?: boolean;
  location: string;
  summary: string;
  bullets: string[];
  skills: string[];
  link?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 'cag-yp',
    role: 'Young Professional',
    organization: 'Office of the Comptroller & Auditor General of India (CAG)',
    period: 'Sep 2026 – Present',
    isCurrent: true,
    location: 'New Delhi, India',
    summary: 'Spearheading data analytics and remote audit pipelines across sovereign auditing frameworks.',
    bullets: [
      'Working on data analytics and remote audit, supporting data-driven audit activities and analytical reporting.',
      'Applying SQL, Python and data analytics techniques to analyse datasets and generate audit insights.',
      'Collaborating with audit inspection teams to isolate risk indicators and automate telemetry reconciliations.'
    ],
    skills: ['SQL', 'Python', 'Remote Audit', 'Data Analytics', 'Risk Modeling', 'Analytical Reporting'],
    link: 'https://cag.gov.in/'
  },
  {
    id: 'dics-faculty',
    role: 'Software Faculty',
    organization: 'Delhi Institute of Computer Science',
    period: 'Jul 2026 – Sep 2026',
    location: 'Delhi, India',
    summary: 'Instructed over 150+ students in core computational curricula, machine learning pipelines, and system architecture.',
    bullets: [
      'Trained students in Python, C, C++, Java, SQL, Data Analytics and Programming Fundamentals.',
      'Taught Data Science, Machine Learning, Data Structures and Algorithms, Internet of Things, Operating Systems and Database concepts through lectures and practical sessions.',
      'Conducted live coding labs and evaluated end-to-end student capstone machine learning projects.'
    ],
    skills: ['Python', 'Data Science', 'Machine Learning', 'DSA', 'SQL', 'Java', 'IoT', 'DBMS'],
    link: 'https://dicsindia.in/'
  },
  {
    id: 'cag-intern',
    role: 'Data Analytics Intern',
    organization: 'Office of the Comptroller & Auditor General of India',
    period: 'Jan 2026 – Jul 2026',
    location: 'New Delhi, India',
    summary: 'Architected automated audit pipelines, ETL workflows, and evaluated multimodal AI systems for national welfare registries.',
    bullets: [
      'Developed KNIME workflows for audit analytics: data validation, anomaly detection, duplicate identification and record reconciliation.',
      'Built REST APIs for NREGA and GeM data integration, automating data transfer between databases and AWS S3.',
      'Performed SQL-based analysis for government welfare audits, validating datasets and supporting audit observations.',
      'Evaluated LLMs and Vision Language Models (VLMs) for multimodal data validation and product-image consistency.'
    ],
    skills: ['KNIME', 'SQL', 'REST APIs', 'AWS S3', 'Data Validation', 'VLMs', 'LLMs', 'Anomaly Detection'],
    link: 'https://cag.gov.in/'
  }
];

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('cag-yp');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const visibleTop = windowHeight - rect.top;
      const progress = Math.min(Math.max(visibleTop / (totalHeight + windowHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? '' : id));
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 sm:py-32 relative"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Label & Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[#ff6a2b] mb-3 flex items-center gap-2">
              <span>01 / EXPERIENCE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="experience-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight"
            >
              Where audit rigor meets <span className="italic text-[#ff6a2b]">intelligence</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] max-w-xs">
            A track record in national auditing analytics, public welfare telemetry, and technical instruction.
          </p>
        </div>

        {/* Timeline Container with scroll progress indicator */}
        <div className="relative pl-6 sm:pl-10">
          
          {/* Vertical Track Background */}
          <div className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-[var(--border-hairline)]" />
          
          {/* Dynamic Scroll Fill Line */}
          <div
            className="absolute left-[7px] sm:left-[11px] top-4 w-[2px] bg-[#ff6a2b] transition-all duration-150 ease-out"
            style={{
              height: `${scrollProgress * 95}%`,
            }}
          />

          {/* Timeline Cards */}
          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;

              return (
                <div key={exp.id} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      exp.isCurrent
                        ? 'border-[#ff6a2b] bg-[#0e0d0b]'
                        : 'border-[var(--border-hairline)] bg-[#141310] group-hover:border-[#ff6a2b]'
                    }`}
                  >
                    {exp.isCurrent ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b] animate-ping" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9a968d]" />
                    )}
                  </div>

                  {/* Card Content (Click to expand) */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className={`bento-card rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                      isExpanded
                        ? 'border-[#ff6a2b]/50 shadow-xl'
                        : 'hover:border-[#ff6a2b]/30'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f2efe8] light:text-[#141311]">
                            {exp.role}
                          </h3>
                          {exp.isCurrent && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#ff6a2b]/15 text-[#ff6a2b] border border-[#ff6a2b]/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b] animate-pulse" />
                              NOW
                            </span>
                          )}
                        </div>
                        <p className="font-serif text-lg text-[#ff6a2b] mt-1 font-normal">
                          {exp.organization}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-center">
                        <span className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] bg-[#1a1814] light:bg-[#edeae3] px-3 py-1 rounded-full hairline-all">
                          {exp.period}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full hairline-all flex items-center justify-center text-[#9a968d] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-[#ff6a2b]' : ''
                          }`}
                        >
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-[#9a968d] light:text-[#6b665c] mt-4 leading-relaxed">
                      {exp.summary}
                    </p>

                    {/* Expandable Bullets & Skills */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 hairline-t space-y-5 animate-fade-in">
                        <div>
                          <h4 className="mono-label text-xs text-[#f2efe8] light:text-[#141311] mb-3">
                            Key Deliverables &amp; Direct Impact
                          </h4>
                          <ul className="space-y-2.5">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-3 text-sm text-[#f2efe8] light:text-[#141311] leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b] mt-2 flex-shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Chips */}
                        <div>
                          <h4 className="mono-label text-[11px] text-[#9a968d] light:text-[#6b665c] mb-2.5">
                            Technologies &amp; Frameworks
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map(s => (
                              <span
                                key={s}
                                className="px-2.5 py-1 rounded text-xs font-mono bg-[#1b1915] light:bg-[#f0ede6] text-[#f2efe8] light:text-[#141311] hairline-all"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {exp.link && (
                          <div className="pt-2 flex justify-end">
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff6a2b] hover:underline"
                            >
                              <span>Official Portal</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    )}

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

export default Experience;