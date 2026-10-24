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
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({
    'cag-yp': true,
    'dics-faculty': true,
    'cag-intern': true
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const visibleTop = windowHeight - rect.top;
      const progress = Math.min(Math.max(visibleTop / (totalHeight + windowHeight * 0.4), 0), 1);
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
      className="py-24 sm:py-32 relative perspective-container"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[var(--accent-small)] mb-3 flex items-center gap-2 font-semibold">
              <span>01 / EXPERIENCE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="experience-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight"
            >
              Public Sector Audit &amp; <span className="italic text-[#ff6a2b]">Technical Pedagogy</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs font-medium">
            Timeline of roles in data-driven audit, intelligence pipelines, and university-level instruction.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-10">
          
          {/* Background vertical track */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-[var(--border-hairline)]" />

          {/* Active orange vertical progress line */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 w-[2px] bg-gradient-to-b from-[#ff6a2b] via-[#ff7e45] to-[#ff6a2b] transition-all duration-150"
            style={{
              height: `${scrollProgress * 95}%`,
            }}
          />

          {/* Experience Cards Stack */}
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;

              return (
                <div
                  key={exp.id}
                  className="relative group transition-all duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[46px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center ${
                      exp.isCurrent
                        ? 'border-[#ff6a2b] bg-[var(--bg-canvas)] shadow-[0_0_10px_rgba(255,106,43,0.8)]'
                        : isExpanded
                        ? 'border-[#ff6a2b] bg-[var(--bg-canvas)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)]'
                    }`}
                  >
                    {exp.isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
                    ) : (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isExpanded ? 'bg-[#ff6a2b]' : 'bg-[var(--text-muted)]'
                        }`}
                      />
                    )}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`rounded-2xl hairline-all bg-[var(--card-bg)] transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'border-[#ff6a2b]/50 shadow-xl'
                        : 'hover:border-[#ff6a2b]/30 hover:shadow-md'
                    }`}
                  >
                    {/* Header Bar - Clickable to Expand */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      className="w-full text-left p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
                      aria-expanded={isExpanded}
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors">
                            {exp.role}
                          </span>
                          {exp.isCurrent && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#ff6a2b]/15 text-[var(--accent-small)] border border-[#ff6a2b]/30 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b] animate-pulse" />
                              NOW
                            </span>
                          )}
                        </div>

                        <div className="font-serif text-lg text-[var(--text-secondary)] font-normal">
                          {exp.organization}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] font-medium pt-1">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-[#ff6a2b]" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-[var(--text-muted)]" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                          {isExpanded ? 'Collapse' : 'Details'}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full hairline-all bg-[var(--bg-surface-elevated)] flex items-center justify-center transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-[#ff6a2b]' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Content Drawer */}
                    {isExpanded && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-[var(--border-hairline)] space-y-5 animate-fade-in">
                        <p className="text-sm sm:text-base text-[var(--text-primary)] font-normal leading-relaxed">
                          {exp.summary}
                        </p>

                        {/* Bulleted Accomplishments */}
                        <div className="space-y-3">
                          <div className="mono-label text-[var(--text-muted)] font-semibold">
                            KEY RESPONSIBILITIES &amp; DELIVERABLES
                          </div>
                          <ul className="space-y-2.5">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[var(--text-secondary)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b] mt-2 flex-shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech & Competency Tags */}
                        <div className="pt-2">
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-hairline)] font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* External Organization Link */}
                        {exp.link && (
                          <div className="pt-2">
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent-small)] hover:underline font-semibold"
                            >
                              <span>Visit {exp.organization.split('(')[0].trim()}</span>
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