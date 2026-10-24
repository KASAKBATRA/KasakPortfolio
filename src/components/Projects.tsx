import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Github, ExternalLink, ShieldAlert, Sparkles, Image as ImageIcon, MapPin, Layers, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface Project {
  number: string;
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
  featureNote?: string;
  image: string;
  previewGraphic: 'geospatial' | 'campushire' | 'knime' | 'emotions';
}

const projects: Project[] = [
  {
    number: '01',
    id: 'mapmywork',
    title: 'MapMyWork',
    tagline: 'Geospatial Workforce Intelligence',
    description: 'Interactive geospatial workforce mapping application that visualizes workforce distribution across multiple cities, with user-driven filtering, cluster bounding, and click-enabled map markers showing workforce statistics and location-specific details.',
    techStack: ['Python', 'GeoPandas', 'Pandas', 'Matplotlib', 'GIS'],
    githubUrl: 'https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-',
    githubLabel: 'GitHub: MapMyWork',
    featureNote: 'Interactive GIS workforce clusters & geo-telemetry',
    image: '/projects/mapmywork.svg',
    previewGraphic: 'geospatial'
  },
  {
    number: '02',
    id: 'campushire',
    title: 'CampusHire Analytics',
    tagline: 'Automated Placement Management & Candidate Verification',
    description: 'SQL-backed placement management system with a responsive UI for automated candidate verification, credential validation, and recruitment telemetry across corporate hiring drives.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/KASAKBATRA/CampusHire_Analytics',
    githubLabel: 'GitHub: CampusHire',
    featureNote: 'Automated student candidate verification & audit logging',
    image: '/campushire-hero.png',
    previewGraphic: 'campushire'
  },
  {
    number: '03',
    id: 'audit-analytics',
    title: 'Audit Analytics & Data Integration',
    tagline: 'Government Welfare Audit & Automated Pipelines',
    description: 'Work at the Office of the Comptroller & Auditor General of India (CAG). Automated KNIME workflows for data validation, anomaly detection, duplicate identification, and record reconciliation. Built REST APIs moving NREGA and GeM data between databases and AWS S3.',
    techStack: ['KNIME', 'SQL', 'REST APIs', 'AWS S3', 'Data Validation'],
    isConfidential: true,
    featureNote: 'Zero-trust government audit pipeline & anomaly detection',
    image: '/projects/audit-analytics.svg',
    previewGraphic: 'knime'
  },
  {
    number: '04',
    id: 'emotionsmemoria',
    title: 'EmotionsMemoria',
    tagline: 'AI Memory Creator & Emotion Detection',
    description: 'Immersive deployed web application that transforms user photos and memories into emotionally rich digital collections using AI emotion detection, threaded memory wheels, and certificates.',
    techStack: ['JavaScript', 'HTML/CSS', 'AI APIs', 'Netlify'],
    githubUrl: 'https://github.com/KASAKBATRA/EmotionsMemoria',
    githubLabel: 'GitHub: EmotionsMemoria',
    liveUrl: 'https://emotionsmemoria.netlify.app/',
    linkedinUrl: 'https://www.linkedin.com/posts/kasak-batra_emotionsmemoria-webapplaunch-kasakcreates-activity-7347712837563097090-TrWi',
    featureNote: 'Live web app with multi-dimensional sentiment radar',
    image: '/projects/emotionsmemoria.svg',
    previewGraphic: 'emotions'
  }
];

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>('mapmywork');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lightbox keyboard navigation (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : projects.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < projects.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 sm:py-32 hairline-t perspective-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[var(--accent-small)] mb-3 flex items-center gap-2 font-semibold">
              <span>02 / PROJECTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="projects-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight"
            >
              Selected Systems &amp; <span className="italic text-[#ff6a2b]">Engineering</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs font-medium">
            Geospatial intelligence, sovereign audit pipelines, SQL data engines, and applied machine learning.
          </p>
        </div>

        {/* Stacked "Deck of Cards" Container */}
        <div className="space-y-12">
          {projects.map((project, index) => {
            const hasImage = Boolean(project.image);

            return (
              <div
                key={project.id}
                className="bento-card rounded-3xl p-6 sm:p-10 hairline-all group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#ff6a2b]/40 md:sticky"
                style={{
                  top: `calc(100px + ${index * 24}px)`,
                  zIndex: index + 10,
                }}
              >
                {/* 12-Column Layout per Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Index, Title, Copy & CTAs (6 cols) */}
                  <div className="lg:col-span-6 space-y-6">
                    
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-4xl sm:text-5xl font-light text-[#ff6a2b]">
                        {project.number}
                      </span>
                      <div className="h-[1px] w-8 bg-[var(--border-hairline)]" />
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                        {project.tagline}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-hairline)] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full hairline-all bg-[var(--bg-surface-elevated)] hover:border-[#ff6a2b] text-[var(--text-primary)] font-semibold transition-all hover:-translate-y-0.5"
                        >
                          <Github size={14} className="text-[#ff6a2b]" />
                          <span>Code Repository</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-semibold transition-all shadow-md shadow-[#ff6a2b]/25 hover:-translate-y-0.5"
                        >
                          <span>Live Web App</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {project.isConfidential && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-[11px]">
                          <ShieldAlert size={13} />
                          Confidential Audit Framework · CAG
                        </span>
                      )}

                      {/* Lightbox Trigger if Image exists */}
                      {hasImage && (
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(index)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[var(--text-muted)] hover:text-[#ff6a2b] transition-colors"
                        >
                          <Eye size={13} />
                          <span>Inspect Mockup</span>
                        </button>
                      )}
                    </div>

                    {/* Architectural Feature Badge */}
                    <div className="p-3 rounded-xl hairline-all bg-[var(--bg-surface-elevated)] font-mono text-[11px] text-[var(--text-primary)] flex items-center gap-2">
                      <Layers size={13} className="text-[#ff6a2b] flex-shrink-0" />
                      <span>{project.featureNote}</span>
                    </div>

                  </div>

                  {/* Right Column: Browser Window Mockup Frame with 3D Tilt (6 cols) */}
                  <div className="lg:col-span-6 relative perspective-container">
                    <div
                      className="rounded-2xl hairline-all bg-[var(--bg-surface-elevated)] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:rotate-x-1 group-hover:-rotate-y-2 group-hover:scale-[1.01]"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Browser Window Header Chrome */}
                      <div className="px-4 py-3 bg-[var(--bg-surface)] hairline-b flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] truncate max-w-[200px]">
                          {project.title.toLowerCase().replace(/\s+/g, '')}.app
                        </span>
                        <div className="w-10" />
                      </div>

                      {/* Mockup Preview Area with dedicated project images */}
                      <div className="relative aspect-[16/10] bg-[var(--bg-canvas)] flex items-center justify-center overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} UI Mockup`}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                          onClick={() => setLightboxIndex(index)}
                        />
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Accessible Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project Preview Lightbox"
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[var(--card-bg)] hairline-all rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 hairline-b mb-6">
                <div>
                  <span className="font-mono text-xs text-[#ff6a2b] uppercase font-semibold">
                    {projects[lightboxIndex].number} / {projects[lightboxIndex].tagline}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)]">
                    {projects[lightboxIndex].title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : projects.length - 1))}
                    className="w-10 h-10 rounded-full hairline-all bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:text-[#ff6a2b]"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((prev) => (prev !== null && prev < projects.length - 1 ? prev + 1 : 0))}
                    className="w-10 h-10 rounded-full hairline-all bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:text-[#ff6a2b]"
                    aria-label="Next Project"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    className="w-10 h-10 rounded-full hairline-all bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:text-[#ff6a2b]"
                    aria-label="Close Lightbox"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-auto flex items-center justify-center rounded-2xl bg-[var(--bg-canvas)] p-4">
                {projects[lightboxIndex].image ? (
                  <img
                    src={projects[lightboxIndex].image}
                    alt={projects[lightboxIndex].title}
                    className="max-h-[65vh] w-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="py-20 text-center font-mono text-xs text-[var(--text-muted)]">
                    No image preview available for this entry.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;