import React, { useState } from 'react';
import { ExternalLink, Github, MapPin, Database, ShieldAlert, Sparkles, Image as ImageIcon, Heart, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  linkedinUrl?: string;
  isConfidential?: boolean;
  screenshotTodo: string;
  image?: string;
  previewType: 'geospatial' | 'campushire' | 'knime' | 'ai';
}

const projects: Project[] = [
  {
    id: 'mapmywork',
    title: 'MapMyWork',
    tagline: 'Geospatial Workforce Intelligence',
    description: 'Interactive geospatial workforce mapping app that visualizes workforce distribution across multiple cities, with user-driven filtering and click-enabled map markers showing workforce statistics and location-specific details.',
    techStack: ['Python', 'GeoPandas', 'Pandas', 'Matplotlib', 'Data Visualization', 'GIS'],
    githubUrl: 'https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-',
    githubLabel: 'GitHub: [ADD URL]',
    screenshotTodo: 'TODO: Add MapMyWork UI screenshots (map view & marker details)',
    previewType: 'geospatial'
  },
  {
    id: 'campushire',
    title: 'CampusHire Analytics',
    tagline: 'Automated Placement Management & Candidate Verification',
    description: 'SQL-backed placement management system with a responsive UI for automated candidate verification, credential validation, and recruitment telemetry. Engineered during internship to streamline institutional hiring.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'MySQL', 'Analytics'],
    githubUrl: 'https://github.com/KASAKBATRA/CampusHire_Analytics',
    githubLabel: 'GitHub: [ADD URL]',
    image: '/campushire-hero.png',
    screenshotTodo: 'TODO: Add CampusHire Analytics dashboard and verification screenshots',
    previewType: 'campushire'
  },
  {
    id: 'audit-analytics',
    title: 'Audit Analytics & Data Integration',
    tagline: 'Government Welfare Audit & Automated Pipelines',
    description: 'Work at the Office of the Comptroller & Auditor General of India (CAG). Developed automated KNIME workflows for audit analytics including data validation, anomaly detection, duplicate identification, and record reconciliation. Built REST APIs moving NREGA and GeM data between databases and AWS S3.',
    techStack: ['KNIME', 'SQL', 'REST APIs', 'AWS S3', 'Data Validation', 'Anomaly Detection'],
    isConfidential: true,
    screenshotTodo: 'TODO: Add sanitized/redacted sample workflow screenshots',
    previewType: 'knime'
  },
  {
    id: 'emotionsmemoria',
    title: 'EmotionsMemoria — AI Memory Creator',
    tagline: 'Live Web App with Emotion Detection & Timelines',
    description: 'Immersive deployed web application that transforms user photos and memories into emotionally rich digital collections using AI emotion detection, threaded memory wheels, and certificates.',
    techStack: ['JavaScript', 'HTML/CSS', 'AI APIs', 'Netlify', 'Emotion AI'],
    githubUrl: 'https://github.com/KASAKBATRA/EmotionsMemoria',
    liveUrl: 'https://emotionsmemoria.netlify.app/',
    linkedinUrl: 'https://www.linkedin.com/posts/kasak-batra_emotionsmemoria-webapplaunch-kasakcreates-activity-7347712837563097090-TrWi',
    screenshotTodo: 'TODO: Add live app interface screenshots',
    image: '/ach2.png',
    previewType: 'ai'
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const filteredProjects = selectedProject === 'all' 
    ? projects 
    : projects.filter(p => p.id === selectedProject);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 bg-slate-950 relative">
      {/* Background neon ambient lights */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} aria-hidden="true" />
            <span>Interactive Systems &amp; Software</span>
          </div>
          <h2 id="projects-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base">
            Workforce mapping, placement management verification, government audit pipelines, and emotion-aware AI web apps.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-3xl glass-morphism border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl hover-lift-glow overflow-hidden group"
            >
              {/* Creative Visual Showcase Header */}
              <div className="relative h-56 sm:h-64 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700/60 overflow-hidden flex items-center justify-center p-4">
                
                {project.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  </div>
                ) : project.previewType === 'geospatial' ? (
                  /* Geospatial stylized mock visual */
                  <div className="w-full h-full rounded-xl bg-slate-900/90 p-4 border border-slate-700/60 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs text-cyan-400">
                      <span className="flex items-center gap-1 font-mono">
                        <MapPin size={14} /> GeoPandas / Multi-City
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                        Interactive GIS
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto">
                      {['Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad'].map((city, cIdx) => (
                        <div key={cIdx} className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-center">
                          <div className="text-[10px] text-slate-400">{city}</div>
                          <div className="text-xs font-bold text-white mt-0.5">{(cIdx + 1) * 320}+ staff</div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Dynamic city markers &amp; distribution heatmap</span>
                      <span className="text-cyan-400 font-mono">Python 3.x</span>
                    </div>
                  </div>
                ) : (
                  /* KNIME / CAG Pipeline visual */
                  <div className="w-full h-full rounded-xl bg-slate-900/90 p-4 border border-slate-700/60 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-mono text-purple-400">
                        <Database size={14} /> KNIME Analytics Platform
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                        Automated Remote Audit
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-3 py-3">
                      <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
                        <div className="text-[11px] font-bold text-white">NREGA / GeM</div>
                        <div className="text-[9px] text-slate-400">Database Ingest</div>
                      </div>
                      <span className="text-cyan-400 font-bold">→</span>
                      <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-center">
                        <div className="text-[11px] font-bold text-cyan-300">KNIME Engine</div>
                        <div className="text-[9px] text-slate-400">Anomaly Detection</div>
                      </div>
                      <span className="text-cyan-400 font-bold">→</span>
                      <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                        <div className="text-[11px] font-bold text-emerald-300">AWS S3</div>
                        <div className="text-[9px] text-slate-400">Secure Audit Store</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Multimodal VLM image-product verification</span>
                      <span className="text-purple-400 font-mono">REST APIs</span>
                    </div>
                  </div>
                )}

                {/* Explicit Screenshot TODO badge requested by user */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-950/90 text-amber-300 border border-amber-500/40 shadow-lg backdrop-blur-md">
                    <ImageIcon size={13} className="text-amber-400" />
                    <span>{project.screenshotTodo}</span>
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    <span>{project.tagline}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-5 border-t border-slate-700/60 flex flex-wrap items-center gap-3">
                  {project.isConfidential ? (
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                      <ShieldAlert size={15} className="text-amber-400" aria-hidden="true" />
                      <span>No link (confidential work at CAG of India)</span>
                    </div>
                  ) : (
                    <>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-slate-600 hover:border-cyan-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md"
                        >
                          <Github size={16} />
                          <span>{project.githubLabel || 'GitHub Repository'}</span>
                          <ArrowUpRight size={14} className="text-cyan-400" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md shadow-cyan-600/20"
                        >
                          <ExternalLink size={15} />
                          <span>Open Live Demo</span>
                        </a>
                      )}

                      {project.linkedinUrl && (
                        <a
                          href={project.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1"
                        >
                          <span>LinkedIn Launch Post</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* GitHub Repositories Link Banner */}
        <div className="mt-14 p-6 rounded-2xl glass-morphism border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
              <Github size={24} />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Want to explore all repositories &amp; open source code?</h4>
              <p className="text-slate-400 text-xs sm:text-sm">Visit Kasak's GitHub account for machine learning scripts, data analytics notebooks, and tools.</p>
            </div>
          </div>
          <a
            href="https://github.com/KASAKBATRA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 hover:border-cyan-400 transition-all flex items-center gap-2"
          >
            <span>github.com/KASAKBATRA</span>
            <ExternalLink size={14} className="text-cyan-400" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;