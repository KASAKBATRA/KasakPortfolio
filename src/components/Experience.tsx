import React from 'react';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2, ExternalLink, Activity, Sparkles, Terminal } from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  status: 'Current' | 'Completed';
  link?: string;
  bullets: string[];
  techTags: string[];
  highlight: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Young Professional',
    organization: 'Office of the Comptroller & Auditor General of India (CAG)',
    period: 'Sep 2026 – Present',
    location: 'Delhi, India',
    status: 'Current',
    link: 'https://cag.gov.in',
    highlight: 'Data-driven remote audit, compliance analytics, and executive analytical reporting',
    bullets: [
      'Working on data analytics and remote audit, supporting data-driven audit activities and analytical reporting.',
      'Applying SQL, Python and data analytics techniques to analyse datasets and generate audit insights.'
    ],
    techTags: ['SQL', 'Python', 'Remote Audit', 'Audit Analytics', 'Government Data', 'Analytical Reporting']
  },
  {
    role: 'Software Faculty',
    organization: 'Delhi Institute of Computer Science',
    period: 'Jul 2026 – Sep 2026',
    location: 'Delhi, India',
    status: 'Completed',
    link: 'https://dics.in',
    highlight: 'Curriculum delivery, hands-on lab sessions, and technical mentorship',
    bullets: [
      'Trained students in Python, C, C++, Java, SQL, Data Analytics and Programming Fundamentals.',
      'Taught Data Science, Machine Learning, Data Structures and Algorithms, Internet of Things, Operating Systems and Database concepts through lectures and practical sessions.'
    ],
    techTags: ['Python', 'C / C++', 'Java', 'SQL', 'Data Science', 'Machine Learning', 'DSA', 'Operating Systems', 'IoT']
  },
  {
    role: 'Data Analytics Intern',
    organization: 'Office of the Comptroller & Auditor General of India',
    period: 'Jan 2026 – Jul 2026',
    location: 'Delhi, India',
    status: 'Completed',
    link: 'https://cag.gov.in',
    highlight: 'KNIME pipeline automation, welfare audit validation, and multimodal AI evaluation',
    bullets: [
      'Developed KNIME workflows for audit analytics: data validation, anomaly detection, duplicate identification and record reconciliation.',
      'Built REST APIs for NREGA and GeM data integration, automating data transfer between databases and AWS S3.',
      'Performed SQL-based analysis for government welfare audits, validating datasets and supporting audit observations.',
      'Evaluated LLMs and Vision Language Models (VLMs) for multimodal data validation and product-image consistency.'
    ],
    techTags: ['KNIME', 'SQL', 'REST APIs', 'AWS S3', 'NREGA & GeM', 'Anomaly Detection', 'LLMs & VLMs', 'Reconciliation']
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 bg-slate-900 relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase size={14} aria-hidden="true" />
            <span>Career Path</span>
          </div>
          <h2 id="experience-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base">
            Data analytics, government welfare audits, automated KNIME pipelines, and software instruction.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Connector Line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-slate-800" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-start gap-6 group">
                
                {/* Timeline node icon */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl glass-morphism border border-slate-700 items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-xl z-10 bg-slate-900">
                  {exp.status === 'Current' ? (
                    <Activity size={24} className="text-cyan-400 animate-pulse" />
                  ) : (
                    <Briefcase size={22} className="text-blue-400" />
                  )}
                </div>

                {/* Experience Card */}
                <article className="flex-1 w-full rounded-2xl glass-morphism border border-slate-700/70 p-6 sm:p-8 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl hover-lift-glow">
                  
                  {/* Top Bar: Role & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                        {exp.status === 'Current' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Active Position
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-base font-semibold text-cyan-400">
                        <Building2 size={16} aria-hidden="true" />
                        <span>{exp.organization}</span>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-cyan-300 transition-colors ml-1"
                            aria-label={`Visit ${exp.organization} website`}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Period and Location Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-medium">
                        <Calendar size={14} className="text-cyan-400" aria-hidden="true" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-medium">
                        <MapPin size={14} className="text-cyan-400" aria-hidden="true" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlight bar */}
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 mb-5 text-xs sm:text-sm text-cyan-300 flex items-center gap-2 font-medium">
                    <Sparkles size={16} className="text-cyan-400 flex-shrink-0" />
                    <span>Focus: {exp.highlight}</span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                        <CheckCircle2 size={18} className="text-cyan-400 mt-1 flex-shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Pill Badges */}
                  <div className="pt-4 border-t border-slate-700/50 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
                      <Terminal size={13} className="text-slate-500" />
                      Tools &amp; Methods:
                    </span>
                    {exp.techTags.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700 font-medium hover:border-cyan-500/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </article>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;