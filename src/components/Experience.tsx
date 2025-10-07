import React from 'react';
import { Briefcase, Calendar, MapPin, Award, GraduationCap } from 'lucide-react';

const Experience = () => {
  const workExperiences = [
    {
      title: 'Intern',
      company: 'Defence Research and Development Organisation (DRDO)',
      location: 'India',
      period: 'July 2025 - August 2025',
      description: 'Designed and developed CampusHire Analytics, a comprehensive role-based placement management system. Created automated verification systems and streamlined recruitment workflows for educational institutions.',
      achievements: [
        'Developed CampusHire Analytics - a complete placement management system',
        'Built role-based access for Students, T&P Officers, and Companies',
        'Implemented automated verification and unique login ID systems',
        'Created skill and CGPA tracking modules for recruitment optimization',
        'Delivered responsive UI with efficient backend using PHP and MySQL',
        'Streamlined recruitment workflows for educational institutions',
        'Built comprehensive user management and authentication systems',
      ]
    },
    {
      title: 'Head of Department (Data Science)',
      company: 'Renu Sharma Foundation',
      location: 'Remote',
      period: '2024 - Present',
      description: 'Started as Data Science Intern and promoted to Head of Department. Led development of two impactful full-stack projects: ATS Resume Checker and AIMock Interviewer. Built secure authentication systems and comprehensive dashboards for HRs and admins.',
      achievements: [
        'Promoted from Data Science Intern to HOD due to technical leadership',
        'Developed ATS Resume Checker with BERT-based semantic matching and skill extraction',
        'Built AIMock Interviewer platform with LLM-powered real-time feedback',
        'Implemented secure OTP-based authentication systems',
        'Created admin and HR monitoring dashboards',
        'Led full-stack development across frontend and backend systems',
        'Developed semantic matching algorithms and real-time feedback systems',
      ]
    },
    {
      title: 'Python Developer Intern',
      company: 'Vault of Codes',
      location: 'Remote',
      period: 'Oct 2024',
      description: 'Developed scalable Python applications, streamlined workflows, and debugged code for optimal performance. Created a To-Do List application as the main project.',
      achievements: [
        'Built scalable Python applications',
        'Streamlined development workflows',
        'Optimized code performance through debugging',
      ]
    },
    {
      title: 'Data Analytics and Visualization Job Simulation',
      company: 'Accenture',
      location: 'Remote',
      period: 'June 2024',
      description: 'Advised a hypothetical social media client as a Data Analyst. Cleaned, modeled, and analyzed 7 datasets to uncover key insights into content trends.',
      achievements: [
        'Analyzed 7 datasets for content trends',
        'Created comprehensive PowerPoint presentations',
        'Delivered insights to stakeholders',
      ]
    },
  ];

  const education = [
    {
      title: 'B.Tech in Artificial Intelligence and Data Science',
      company: 'Dr. Akhilesh Das Gupta Institute of Professional Studies',
      location: 'Delhi, India',
      period: '2022 - 2026 (Pursuing)',
      description: 'Currently pursuing Bachelor of Technology in Artificial Intelligence and Data Science with specialization in Machine Learning, Deep Learning, and Data Analytics.',
      achievements: [
        'EPAM Systems Scholarship recipient',
        'Active in IEEE and NSS activities',
        'Published research papers',
      ]
    },
    {
      title: 'Senior Secondary Education',
      company: 'MotiRam Memorial Girls Senior Secondary School',
      location: 'Delhi, India',
      period: '2020 - 2022',
      description: 'Completed senior secondary education with 89.2% marks in CBSE board.',
      achievements: [
        'Achieved 89.2% in CBSE',
        'Strong foundation in Mathematics and Science',
        'Active participation in academic activities',
      ]
    },
  ];

  const certifications = [
    { name: 'Business Analytics and Data Mining Modeling using R', issuer: 'NPTEL', year: '2025', note: 'Top 2%' },
    { name: 'Data Analytics with Python', issuer: 'NPTEL', year: '2024' },
    { name: 'IBM Summer Training', issuer: 'IBM', year: '2024', note: 'ML, DL, Gen AI' },
    { name: 'Discrete Mathematics', issuer: 'NPTEL', year: '2023' },
  ];

  

  const TimelineSection = ({ title, items, icon: Icon, color }: { 
    title: string; 
    items: typeof workExperiences; 
    icon: React.ElementType; 
    color: string;
  }) => (
    <div className="glass-morphism p-8 rounded-2xl hover:border-slate-600/50 transition-all duration-300 hover-lift-glow">
      <div className="flex items-center mb-8">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400"></div>
        
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-primary-500 border-2 border-primary-400 rounded-full"></div>
              
              {/* Content */}
              <div className="ml-16 glass-morphism p-6 rounded-xl hover:border-slate-600/50 transition-all duration-300 w-full hover-lift-glow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-primary-400 font-medium">{item.company}</p>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {item.period}
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin size={16} className="mr-1" />
                      {item.location}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="space-y-2">
                  {item.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="experience" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Work Experience */}
          <div className="space-y-8">
            <TimelineSection 
              title="Work Experience" 
              items={workExperiences} 
              icon={Briefcase}
              color="bg-blue-600"
            />
          </div>

          {/* Right: Education + Certifications + Leadership */}
          <div className="space-y-8">
            <TimelineSection 
              title="Education" 
              items={education} 
              icon={GraduationCap}
              color="bg-green-600"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Certifications */}
              <div className="glass-morphism p-6 rounded-2xl hover-lift-glow">
                <div className="flex items-center mb-6">
                  <Award className="text-yellow-400 mr-3" size={24} />
                  <h3 className="font-display text-xl font-semibold text-white">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-primary-400/30 pl-4 py-2 hover:border-primary-400/60 transition-colors duration-300">
                      <h4 className="font-medium text-white text-sm">{cert.name}</h4>
                      <p className="text-slate-400 text-xs">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-primary-400 text-xs">{cert.year}</p>
                        {cert.note && <span className="text-green-400 text-xs">{cert.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership */}
              <div className="glass-morphism p-6 rounded-2xl hover-lift-glow">
                <div className="flex items-center mb-6">
                  <Briefcase className="text-green-400 mr-3" size={24} />
                  <h3 className="font-display text-xl font-semibold text-white">Leadership</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Event Organization', 'Team Leadership', 'Graphics Design', 'Community Service', 'Research', 'Public Speaking'].map((skill, index) => (
                    <span key={index} className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;