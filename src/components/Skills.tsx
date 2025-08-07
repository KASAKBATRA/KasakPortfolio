import React, { useState, useEffect, useRef } from 'react';
import { Code2, Database, BarChart3, Brain, Wrench, BookOpen } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code2,
      color: 'blue',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Java', level: 80 },
        { name: 'C', level: 75 },
        { name: 'HTML', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'SQL', level: 85 },
        { name: 'R (Learning)', level: 70 },
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: Wrench,
      color: 'green',
      skills: [
        { name: 'Excel', level: 90 },
        { name: 'Power BI', level: 85 },
      ]
    },
    {
      title: 'Core Concepts',
      icon: Brain,
      color: 'purple',
      skills: [
        { name: 'Machine Learning', level: 85 },
        { name: 'Data Analytics', level: 90 },
        { name: 'Data Visualization', level: 85 },
        { name: 'Research', level: 80 },
      ]
    },
    {
      title: 'Libraries & Frameworks',
      icon: Database,
      color: 'cyan',
      skills: [
        { name: 'OpenCV', level: 80 },
        { name: 'Geopandas', level: 75 },
        { name: 'Kivy', level: 70 },
        { name: 'Scikit-learn', level: 85 },
      ]
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 bg-blue-500/20 border-blue-500/50 text-blue-400',
      green: 'from-green-500 to-green-600 bg-green-500/20 border-green-500/50 text-green-400',
      purple: 'from-purple-500 to-purple-600 bg-purple-500/20 border-purple-500/50 text-purple-400',
      cyan: 'from-cyan-500 to-cyan-600 bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    };
    return colors[color as keyof typeof colors];
  };

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

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title} 
              className="glass-morphism p-8 rounded-2xl hover:border-slate-600/50 transition-all duration-300 animate-fade-in-up hover-lift-glow"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${getColorClasses(category.color).split(' ')[2]} mr-4`}>
                  <category.icon className={getColorClasses(category.color).split(' ')[3]} size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getColorClasses(category.color).split(' ')[0]} ${getColorClasses(category.color).split(' ')[1]} transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Code2, label: 'Projects', count: '15+', suffix: 'completed' },
            { icon: BookOpen, label: 'Research Papers', count: '2', suffix: 'published' },
            { icon: BarChart3, label: 'Datasets', count: '50+', suffix: 'analyzed' },
            { icon: Brain, label: 'ML Models', count: '10+', suffix: 'trained' },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="glass-morphism p-6 rounded-2xl group-hover:border-primary-500/50 transition-all duration-300 hover-lift-glow">
                <stat.icon className="text-primary-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                <div className="text-2xl font-bold text-white mb-1">{stat.count}</div>
                <div className="text-slate-400 text-sm">{stat.suffix}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;