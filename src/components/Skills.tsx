import React, { useState } from 'react';
import { Code, BarChart3, Brain, Layers, Database, Wrench, Search, Sparkles, Terminal } from 'lucide-react';

interface SkillItem {
  name: string;
  application: string;
}

interface SkillGroup {
  category: string;
  icon: React.ElementType;
  gradient: string;
  accent: string;
  skills: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    icon: Code,
    gradient: 'from-blue-500 to-indigo-600',
    accent: 'text-blue-400',
    skills: [
      { name: 'Python', application: 'Data analytics, GeoPandas mapping, ML models & automation' },
      { name: 'SQL', application: 'Relational audit queries, welfare database validations' },
      { name: 'R', application: 'Statistical analysis, data mining models (NPTEL Top 2%)' },
      { name: 'Java', application: 'Object-oriented programming, software teaching' },
      { name: 'C', application: 'Data structures, algorithms, systems fundamentals' },
      { name: 'JavaScript', application: 'Interactive web apps, APIs & client-side telemetry' },
      { name: 'HTML', application: 'Semantic web layouts & accessibility structures' },
      { name: 'CSS', application: 'Responsive design systems, Tailwind & modern styling' }
    ]
  },
  {
    category: 'Data Analytics',
    icon: BarChart3,
    gradient: 'from-cyan-400 to-teal-500',
    accent: 'text-cyan-400',
    skills: [
      { name: 'SQL', application: 'Large dataset aggregation, auditing & schema verification' },
      { name: 'KNIME', application: 'Automated anomaly detection, duplicate record checks' },
      { name: 'Power BI', application: 'Interactive dashboards & executive metrics' },
      { name: 'Data Cleaning', application: 'Missing value imputation, normalization & standardization' },
      { name: 'ETL', application: 'Automated pipelines moving data between databases & AWS' },
      { name: 'Data Validation', application: 'Welfare audit cross-matching & record reconciliation' },
      { name: 'Data Visualization', application: 'Actionable visual reporting for auditors & leadership' }
    ]
  },
  {
    category: 'Machine Learning',
    icon: Brain,
    gradient: 'from-purple-500 to-fuchsia-600',
    accent: 'text-purple-400',
    skills: [
      { name: 'Regression', application: 'Continuous estimation & performance modeling' },
      { name: 'Classification', application: 'Multi-class risk assessment & category predictors' },
      { name: 'Clustering', application: 'Unsupervised grouping & outlier detection' },
      { name: 'NLP', application: 'Text classification, BERT semantic resume matching' },
      { name: 'Feature Engineering', application: 'Dimensionality reduction & predictive feature design' },
      { name: 'OpenCV', application: 'Computer vision, image edge filters & pencil synthesis' }
    ]
  },
  {
    category: 'Libraries',
    icon: Layers,
    gradient: 'from-amber-400 to-orange-500',
    accent: 'text-amber-400',
    skills: [
      { name: 'NumPy', application: 'High-performance multidimensional arrays & numerical linear algebra' },
      { name: 'Pandas', application: 'Dataframe manipulation, joins, grouping & aggregations' },
      { name: 'Scikit-learn', application: 'Supervised & unsupervised model training pipelines' },
      { name: 'Matplotlib', application: 'Statistical distribution plots & publication charts' }
    ]
  },
  {
    category: 'Cloud & Databases',
    icon: Database,
    gradient: 'from-emerald-400 to-teal-600',
    accent: 'text-emerald-400',
    skills: [
      { name: 'AWS S3', application: 'Secure cloud object storage for audit feeds & datasets' },
      { name: 'MySQL', application: 'Relational data modeling, ACID transactions & indexing' },
      { name: 'Neon Database', application: 'Modern serverless PostgreSQL cloud databases' }
    ]
  },
  {
    category: 'Developer Tools',
    icon: Wrench,
    gradient: 'from-rose-500 to-pink-600',
    accent: 'text-rose-400',
    skills: [
      { name: 'Git', application: 'Version control, branch management & release tagging' },
      { name: 'GitHub', application: 'Open-source collaboration, issues & repository hosting' },
      { name: 'VS Code', application: 'Primary IDE for Python, full-stack & SQL development' },
      { name: 'Cursor', application: 'AI-first code editor for rapid prototyping' },
      { name: 'GitHub Copilot', application: 'AI pair programming & pattern completion' },
      { name: 'Claude', application: 'Prompt engineering, code refactoring & research ideation' }
    ]
  }
];

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const filteredGroups = skillGroups.map(group => {
    if (!searchQuery.trim()) return group;
    const matchingSkills = group.skills.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.application.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, skills: matchingSkills };
  }).filter(group => group.skills.length > 0);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Terminal size={14} aria-hidden="true" />
            <span>Technical Capabilities</span>
          </div>
          <h2 id="skills-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Skills &amp; Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base">
            Categorized technical stack spanning data analytics, machine learning, cloud pipelines, and modern developer tooling.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g., Python, SQL, KNIME, AWS)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm shadow-xl backdrop-blur-md"
            />
          </div>
        </div>

        {/* Selected Skill Detail Banner */}
        {activeSkill && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-cyan-500/50 shadow-xl animate-fade-in-up flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-sm">
                {activeSkill.name}
              </span>
              <div>
                <div className="text-xs text-slate-400">Application in Practice:</div>
                <div className="text-sm font-semibold text-white">{activeSkill.application}</div>
              </div>
            </div>
            <button
              onClick={() => setActiveSkill(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1"
            >
              ✕ Close
            </button>
          </div>
        )}

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl glass-morphism border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover-lift-glow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${group.gradient} text-white shadow-lg`}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                        {group.category}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {group.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => {
                      const isSelected = activeSkill?.name === skill.name;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setActiveSkill(skill)}
                          title={`Click to see application for ${skill.name}`}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105'
                              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-300'
                          }`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Tap any pill for usage context</span>
                  <span className="text-cyan-500/70">✓ Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;