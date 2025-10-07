import React from 'react';
import { FiCode, FiDatabase, FiBox, FiCpu, FiTool, FiImage, FiPieChart } from 'react-icons/fi';

type Skill = { name: string; desc?: string };
type CategoryKey = 'Programming Languages' | 'Tools & Platforms' | 'Core Concepts' | 'Libraries & Frameworks';

const categories: Record<CategoryKey, { color: 'blue' | 'green' | 'purple' | 'cyan'; skills: Skill[] }> = {
  'Programming Languages': {
    color: 'blue',
    skills: [
      { name: 'Python', desc: 'Used for Machine Learning & Data Analysis' },
      { name: 'Java', desc: 'General purpose development' },
      { name: 'C', desc: 'Systems & performance' },
      { name: 'HTML', desc: 'Markup & web structure' },
      { name: 'JavaScript', desc: 'Web interactivity & tooling' },
      { name: 'SQL', desc: 'Querying relational data' },
      { name: 'R', desc: 'Statistical computing (learning)' },
    ]
  },
  'Tools & Platforms': {
    color: 'green',
    skills: [
      { name: 'Excel', desc: 'Spreadsheets & quick analysis' },
      { name: 'Power BI', desc: 'Dashboards & reporting' },
    ]
  },
  'Core Concepts': {
    color: 'purple',
    skills: [
      { name: 'Machine Learning', desc: 'Modeling & predictive analytics' },
      { name: 'Data Analytics', desc: 'Exploration & insights' },
      { name: 'Data Visualization', desc: 'Communicating results' },
      { name: 'Research', desc: 'Methodical investigation' },
    ]
  },
  'Libraries & Frameworks': {
    color: 'cyan',
    skills: [
      { name: 'OpenCV', desc: 'Computer vision' },
      { name: 'Geopandas', desc: 'Spatial data processing' },
      { name: 'Kivy', desc: 'Lightweight UI for Python' },
      { name: 'Scikit-learn', desc: 'ML utilities & models' },
    ]
  }
};

const iconFor = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('python')) return FiCode;
  if (s.includes('javascript')) return FiCode;
  if (s === 'html') return FiBox;
  if (s === 'sql' || s.includes('mysql')) return FiDatabase;
  if (s.includes('excel') || s.includes('power bi')) return FiPieChart;
  if (s.includes('machine') || s.includes('scikit') || s.includes('ml')) return FiCpu;
  if (s.includes('opencv') || s.includes('image')) return FiImage;
  if (s.includes('kivy') || s.includes('geopandas')) return FiTool;
  return FiCode;
};

const colorClass = (c: 'blue' | 'green' | 'purple' | 'cyan') => {
  return c === 'blue' ? 'skill-blue' : c === 'green' ? 'skill-green' : c === 'purple' ? 'skill-purple' : 'skill-cyan';
};

const SkillCards: React.FC = () => {
  return (
    <div className="skill-cards-section">
      {Object.entries(categories).map(([title, meta]) => (
        <div key={title} className="skill-category">
          <div className={`category-halo ${colorClass(meta.color)}`} aria-hidden />
          <h3 className={`skill-category-title ${colorClass(meta.color)}`}>{title}</h3>

          <div className="skill-grid">
            {meta.skills.map((s) => {
              const Icon = iconFor(s.name);
              return (
                <div key={s.name} className={`skill-card ${colorClass(meta.color)} hover-glow`} tabIndex={0}>
                  <div className="card-content">
                    <div className="skill-icon" aria-hidden>
                      <Icon size={20} />
                    </div>
                    <div className="skill-meta">
                      <div className="skill-name">{s.name}</div>
                    </div>
                  </div>

                  <div className="skill-tooltip" role="tooltip">
                    <div className="tooltip-inner">
                      <span className="tooltip-icon"><Icon size={14} /></span>
                      <span className="tooltip-text">{s.desc}</span>
                    </div>
                  </div>
                  <div className="card-reflection" aria-hidden />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillCards;
