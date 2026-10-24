import React, { useState } from 'react';
import { Terminal, Database, Cpu, Layers, Cloud, Wrench, Search, Sparkles } from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  colSpan: string;
  skills: { name: string; isCore?: boolean }[];
  context: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    label: 'CORE SYNTAX & RUNTIMES',
    icon: <Terminal size={16} className="text-[#ff6a2b]" />,
    colSpan: 'md:col-span-6',
    context: 'Foundation across algorithmic computing, backend query pipelines, and scripting.',
    skills: [
      { name: 'Python', isCore: true },
      { name: 'SQL', isCore: true },
      { name: 'R', isCore: true },
      { name: 'Java' },
      { name: 'C' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' }
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    label: 'AUDIT & ETL TELEMETRY',
    icon: <Database size={16} className="text-[#ff6a2b]" />,
    colSpan: 'md:col-span-6',
    context: 'Applied at CAG for remote audit analytics, anomaly detection, and record validation.',
    skills: [
      { name: 'SQL', isCore: true },
      { name: 'KNIME', isCore: true },
      { name: 'Power BI', isCore: true },
      { name: 'Data Cleaning', isCore: true },
      { name: 'ETL' },
      { name: 'Data Validation', isCore: true },
      { name: 'Data Visualization' }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    label: 'PREDICTIVE & STATISTICAL SYSTEMS',
    icon: <Cpu size={16} className="text-[#ff6a2b]" />,
    colSpan: 'md:col-span-7',
    context: 'From theoretical statistical mechanics to applied NLP, computer vision, and neural embeddings.',
    skills: [
      { name: 'Regression', isCore: true },
      { name: 'Classification', isCore: true },
      { name: 'Clustering' },
      { name: 'NLP', isCore: true },
      { name: 'Feature Engineering' },
      { name: 'OpenCV', isCore: true }
    ]
  },
  {
    id: 'libraries',
    name: 'Libraries',
    label: 'COMPUTATIONAL STACK',
    icon: <Layers size={16} className="text-[#ff6a2b]" />,
    colSpan: 'md:col-span-5',
    context: 'Vectorized computing, structured dataframe manipulation, and scientific visualization.',
    skills: [
      { name: 'NumPy', isCore: true },
      { name: 'Pandas', isCore: true },
      { name: 'Scikit-learn', isCore: true },
      { name: 'Matplotlib' }
    ]
  },
  {
    id: 'cloud-databases',
    name: 'Cloud & Databases',
    label: 'INFRASTRUCTURE & PERSISTENCE',
    icon: <Cloud size={16} className="text-[#ff6a2b]" />,
    colSpan: 'md:col-span-5',
    context: 'Sovereign cloud integration, relational audit schemas, and serverless databases.',
    skills: [
      { name: 'AWS S3', isCore: true },
      { name: 'MySQL', isCore: true },
      { name: 'Neon Database' }
    ]
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    label: 'WORKFLOW & AI PAIR PROGRAMMING',
    icon: <Wrench size={16} className="text-[#ff6a2b]" />,
    colSpan: 'md:col-span-7',
    context: 'Modern version control, AI-assisted development environments, and prompt engineering.',
    skills: [
      { name: 'Git', isCore: true },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Cursor', isCore: true },
      { name: 'GitHub Copilot' },
      { name: 'Claude', isCore: true }
    ]
  }
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 sm:py-32 hairline-t"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[#ff6a2b] mb-3 flex items-center gap-2">
              <span>04 / SKILLS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="skills-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight"
            >
              Technical Palette &amp; <span className="italic text-[#ff6a2b]">Tooling</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] max-w-xs">
            Grouped competency domains. Click any chip to inspect cross-stack application.
          </p>
        </div>

        {/* Bento Grid with Varied Proportions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className={`${cat.colSpan} bento-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div>
                {/* Header with Mono Category Label */}
                <div className="flex items-center justify-between pb-4 hairline-b mb-4">
                  <div className="flex items-center gap-2.5">
                    {cat.icon}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f2efe8] light:text-[#141311]">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#9a968d] light:text-[#6b665c]">
                    {cat.label}
                  </span>
                </div>

                <p className="text-xs text-[#9a968d] light:text-[#6b665c] leading-relaxed mb-5">
                  {cat.context}
                </p>

                {/* Grouped Chips (Soft hover lift, no cheesy progress bars) */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => {
                    const isSelected = selectedSkill === s.name;

                    return (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setSelectedSkill(prev => (prev === s.name ? null : s.name))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${
                          isSelected
                            ? 'bg-[#ff6a2b] text-white shadow-md shadow-[#ff6a2b]/30'
                            : s.isCore
                            ? 'bg-[#1b1915] light:bg-[#f0ede6] text-[#f2efe8] light:text-[#141311] hairline-all hover:border-[#ff6a2b]/50'
                            : 'bg-[#141310] light:bg-[#ffffff] text-[#9a968d] light:text-[#6b665c] hairline-all hover:text-[#f2efe8] light:hover:text-[#141311]'
                        }`}
                      >
                        <span>{s.name}</span>
                        {s.isCore && (
                          <span className="ml-1.5 text-[#ff6a2b] font-bold">·</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-5 hairline-t flex items-center justify-between text-[11px] font-mono text-[#9a968d]">
                <span>{cat.skills.length} Capabilities</span>
                <span className="text-[#ff6a2b]">Production-Grade</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;