// React import not required with automatic JSX runtime
import { ExternalLink, Github, MapPin, Image, BarChart3, Heart, Sparkles } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'CampusHire Analytics - Placement Management System',
      description: 'Placement management web application for verified student-company-T&P workflows, unique login code verification, and analytics dashboards.',
  image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: ['Placement', 'Verification', 'Analytics'],
      techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
      githubUrl: 'https://github.com/KASAKBATRA/CampusHire_Analytics',
      liveUrl: '',
      showDemo: false,
      linkedinUrl: '',
      category: 'analytics',
      icon: BarChart3,
      featured: true
    },
    {
      title: 'EmotionsMemoria - AI Memory Creator',
      description: 'Immersive web application that transforms user-uploaded photos and videos into emotionally rich creations using AI. Features collages, animated memory wheels, certificates, and threaded timelines with AI-driven caption generation and emotion detection.',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['AI', 'Web Development', 'Emotion Detection', 'UI/UX', 'Netlify'],
      techStack: ['JavaScript', 'HTML/CSS', 'AI APIs', 'Netlify'],
      githubUrl: 'https://github.com/KASAKBATRA/EmotionsMemoria',
      liveUrl: 'https://emotionsmemoria.netlify.app/',
      linkedinUrl: 'https://www.linkedin.com/posts/kasak-batra_emotionsmemoria-webapplaunch-kasakcreates-activity-7347712837563097090-TrWi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUdggYBF1OWuFNixE5eVNoNOiuE3IPilW4',
      category: 'ai',
      icon: Heart,
      featured: false
    },
    {
      title: 'MapMyWork - Workforce Mapping',
      description: 'Interactive workforce mapping application with user input functionality. Built to visualize and analyze workforce distribution patterns using geospatial data.',
      image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'Geopandas', 'Data Visualization', 'Mapping'],
      techStack: ['Python', 'Geopandas', 'Pandas', 'Matplotlib'],
      githubUrl: 'https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-',
      liveUrl: 'https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-',
      category: 'data',
      icon: MapPin
    },
    {
      title: 'Image to Pencil Sketch',
      description: 'Machine learning application that converts images to pencil sketches using OpenCV. Presented at NCBISF-24 national conference.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['OpenCV', 'Machine Learning', 'Image Processing', 'Python'],
      techStack: ['Python', 'OpenCV', 'NumPy', 'PIL'],
      githubUrl: 'https://github.com/jyotirana2005/Image-to-Pencil-Recognition-Using-ML-OpenCV',
      liveUrl: 'https://github.com/jyotirana2005/Image-to-Pencil-Recognition-Using-ML-OpenCV',
      category: 'ml',
      icon: Image
    },
    {
      title: 'IPL Report Analytics',
      description: 'Comprehensive data analytics project analyzing IPL cricket data. Features statistical analysis, data visualization, and insights generation.',
      image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Data Analytics', 'Python', 'Data Visualization', 'Statistics'],
      techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      githubUrl: 'https://github.com/KASAKBATRA/IPL-REPORT',
      liveUrl: 'https://github.com/KASAKBATRA/IPL-REPORT',
      category: 'analytics',
      icon: BarChart3
    },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-800 relative">
      {/* Subtle background */}
      <div className="absolute inset-0">
        {/* Project themed background */}
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
        
        {/* Code-like elements */}
        <div className="absolute top-20 right-1/4 text-3xl font-mono text-green-400/8 animate-neural-pulse">console.log()</div>
        <div className="absolute bottom-20 left-1/4 text-2xl font-mono text-primary-400/8 animate-neural-pulse animation-delay-1500">import AI</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            A showcase of my work in AI, Data Science, and Machine Learning projects.
          </p>
        </div>

          {/* Featured Project */}
          {projects.filter(project => project.featured).map((project, index) => {
            const ProjectIcon = project.icon;
            return (
              <div key={index} className="group glass-morphism rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-500 shadow-2xl animate-fade-in-up hover-lift-glow">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden order-2 lg:order-1">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 bg-pink-500/20 backdrop-blur-sm p-3 rounded-xl border border-pink-500/30">
                      <ProjectIcon className="text-pink-400" size={24} />
                    </div>
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      ✨ Featured
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 order-1 lg:order-2 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <Sparkles className="text-pink-400 mr-2" size={20} />
                      <span className="text-pink-400 text-sm font-semibold uppercase tracking-wider">Latest Project</span>
                    </div>
                    
                    <h3 className="font-display text-3xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-600/50 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-pink-500/20 text-pink-400 text-sm px-4 py-2 rounded-full border border-pink-500/30 hover:bg-pink-500/30 transition-colors duration-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {project.showDemo !== false && project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-slate-400 hover:text-white transition-colors duration-200 border border-slate-600 hover:border-slate-500 px-6 py-3 rounded-lg"
                      >
                        <Github size={18} className="mr-2" />
                        Source Code
                      </a>
                      {project.linkedinUrl && (
                        <a 
                          href={project.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
                        >
                          📱 LinkedIn Post
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Other Projects */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold text-white mb-6 text-center animate-fade-in-up">Other Projects</h3>

          <div className="projects-carousel relative">
            <button
              className="carousel-nav left"
              aria-label="Scroll left"
              onClick={() => {
                const track = document.querySelector('.carousel-track') as HTMLElement | null;
                if (track) track.scrollBy({ left: -360, behavior: 'smooth' });
              }}
            >‹</button>
            <div className="carousel-track" role="list">
              {projects.filter(project => !project.featured).map((project, index) => {
                return (
                  <article key={index} role="listitem" className="carousel-item group glass-morphism rounded-2xl overflow-hidden transition-all duration-300 flex flex-col">
                    <div
                      className="thumb-wrap bg-slate-900/60"
                      style={{ backgroundImage: `url(${project.image})` }}
                      role="img"
                      aria-label={project.title}
                    />

                    <div className="card-body p-4 flex-1 flex flex-col">
                      <div className="author-row flex items-center gap-3 mb-3">
                        <img src="/kasak-removebg-preview.png" alt="avatar" className="author-avatar" />
                        <div>
                          <div className="author-name text-white font-semibold">Kasak · Aspiring Data Scientist</div>
                          <div className="author-sub text-slate-400 text-xs">B.Tech AI & Data Science</div>
                        </div>
                      </div>

                      <h4 className="font-display text-lg font-semibold text-white mb-2">{project.title}</h4>
                      <p className="text-slate-400 text-sm mb-3 truncate-lines">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0,3).map((tag, ti) => (
                          <span key={ti} className="tag-pill">{tag}</span>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <div className="stats-row flex items-center justify-between text-slate-400 text-sm">
                          <div className="flex items-center gap-4">
                            <div className="stat">❤️ 24</div>
                            <div className="stat">💬 3</div>
                            <div className="stat">🔗 2</div>
                          </div>
                          <div className="meta text-xs">2d • Public</div>
                        </div>

                        <div className="progress-bar mt-3 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="progress-fill" style={{width: '64%', background: 'linear-gradient(90deg,#60a5fa,#06b6d4)'}} />
                        </div>

                        <div className="card-actions mt-4 flex gap-3">
                          {project.liveUrl ? (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-demo">Live Demo</a>
                          ) : (
                            <button className="btn-demo disabled" disabled>Live Demo</button>
                          )}

                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-code">Source</a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <button
              className="carousel-nav right"
              aria-label="Scroll right"
              onClick={() => {
                const track = document.querySelector('.carousel-track') as HTMLElement | null;
                if (track) track.scrollBy({ left: 360, behavior: 'smooth' });
              }}
            >›</button>
          </div>
        </div>

        <div className="text-center mt-12 animate-fade-in-up animation-delay-800">
          <a 
            href="https://github.com/KASAKBATRA"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            View All Projects on GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;