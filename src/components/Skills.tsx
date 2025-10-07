import { useRef } from 'react';
import { Code2, BarChart3, Brain, BookOpen } from 'lucide-react';
import SkillCards from './SkillCards';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-slate-900 relative">
      {/* Subtle background */}
      <div className="absolute inset-0">
        {/* Skills themed background */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-pulse-glow animation-delay-1500"></div>
        
        {/* Programming language symbols */}
        <div className="absolute top-32 left-32 text-6xl font-mono text-primary-400/8 animate-neural-pulse">{'{ }'}</div>
        <div className="absolute bottom-32 right-32 text-5xl font-mono text-accent-400/8 animate-neural-pulse animation-delay-1000">ML</div>
        <div className="absolute top-1/2 left-1/4 text-4xl font-mono text-purple-400/8 animate-neural-pulse animation-delay-2000">AI</div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            My technical expertise in AI, Data Science, and software development.
          </p>
        </div>

        {/* Skill Cards grid (neon tooltip cards) */}
        <div className="animate-fade-in-up">
          <SkillCards />
        </div>

  <div className="mt-10 grid grid-cols-4 gap-4 items-stretch">
          {[
            { icon: Code2, label: 'Projects', count: '15+', suffix: 'completed' },
            { icon: BookOpen, label: 'Research Papers', count: '2', suffix: 'published' },
            { icon: BarChart3, label: 'Datasets', count: '50+', suffix: 'analyzed' },
            { icon: Brain, label: 'ML Models', count: '10+', suffix: 'trained' },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 80}ms` }}
            >
              <div className="glass-morphism p-3 rounded-xl group-hover:border-primary-500/50 transition-all duration-300 hover-lift-glow">
                <stat.icon className="text-primary-400 mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" size={16} />
                <div className="text-lg font-bold text-white mb-0">{stat.count}</div>
                <div className="text-slate-400 text-xxs mt-0 text-[11px]">{stat.suffix}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;