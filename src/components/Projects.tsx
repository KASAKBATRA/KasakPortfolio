import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, ShieldAlert, Sparkles, Image as ImageIcon, MapPin, Layers } from 'lucide-react';

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
  screenshotTodo: string;
  image?: string;
  previewGraphic: 'geospatial' | 'campushire' | 'knime' | 'emotions';
}

const projects: Project[] = [
  {
    number: '01',
    id: 'mapmywork',
    title: 'MapMyWork',
    tagline: 'Geospatial Workforce Intelligence',
    description: 'Interactive geospatial workforce mapping app that visualizes workforce distribution across multiple cities, with user-driven filtering and click-enabled map markers showing workforce statistics and location-specific details.',
    techStack: ['Python', 'GeoPandas', 'Pandas', 'Matplotlib', 'GIS'],
    githubUrl: 'https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-',
    githubLabel: 'GitHub: [ADD URL]',
    screenshotTodo: 'TODO: Add MapMyWork UI screenshots (map view & marker details)',
    previewGraphic: 'geospatial'
  },
  {
    number: '02',
    id: 'campushire',
    title: 'CampusHire Analytics',
    tagline: 'Automated Placement Management & Candidate Verification',
    description: 'SQL-backed placement management system with a responsive UI for automated candidate verification, credential validation, and recruitment telemetry.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/KASAKBATRA/CampusHire_Analytics',
    githubLabel: 'GitHub: [ADD URL]',
    image: '/campushire-hero.png',
    screenshotTodo: 'TODO: Add CampusHire Analytics dashboard and verification screenshots',
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
    screenshotTodo: 'TODO: Add sanitized/redacted sample workflow screenshots',
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
    githubLabel: 'GitHub: [ADD URL]',
    liveUrl: 'https://emotionsmemoria.netlify.app/',
    linkedinUrl: 'https://www.linkedin.com/posts/kasak-batra_emotionsmemoria-webapplaunch-kasakcreates-activity-7347712837563097090-TrWi',
    screenshotTodo: 'TODO: Add EmotionsMemoria live UI screenshot',
    previewGraphic: 'emotions'
  }
];

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>('mapmywork');

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 sm:py-32 hairline-t"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[#ff6a2b] mb-3 flex items-center gap-2">
              <span>02 / PROJECTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="projects-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight"
            >
              Selected Systems &amp; <span className="italic text-[#ff6a2b]">Engineering</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] max-w-xs">
            Geospatial intelligence, sovereign audit pipelines, SQL data engines, and applied machine learning.
          </p>
        </div>

        {/* Large Editorial Case-Study Rows */}
        <div className="divide-y divide-[var(--border-hairline)]">
          {projects.map((proj) => {
            const isActive = activeProject === proj.id;

            return (
              <div
                key={proj.id}
                onMouseEnter={() => setActiveProject(proj.id)}
                className={`group py-10 sm:py-14 transition-all duration-300 relative ${
                  isActive ? 'bg-[#ff6a2b]/[0.02]' : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Index Number & Meta (2 cols) */}
                  <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-start justify-between gap-2">
                    <span className="font-serif text-3xl sm:text-4xl text-[#ff6a2b] font-normal">
                      {proj.number}
                    </span>
                    <span className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] tracking-widest uppercase">
                      CASE STUDY
                    </span>
                  </div>

                  {/* Center: Title, Description & Tech Stack (6 cols) */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#f2efe8] light:text-[#141311] group-hover:text-[#ff6a2b] transition-colors">
                        {proj.title}
                      </h3>
                      {proj.isConfidential && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          <ShieldAlert size={11} />
                          CAG Confidential
                        </span>
                      )}
                    </div>

                    <p className="font-mono text-xs text-[#ff6a2b] font-medium tracking-wide">
                      {proj.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-[#9a968d] light:text-[#6b665c] leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-[#161512] light:bg-[#f0ede6] text-[#9a968d] light:text-[#6b665c] hairline-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono text-[#f2efe8] light:text-[#141311] hover:text-[#ff6a2b] transition-colors"
                        >
                          <Github size={14} />
                          <span>{proj.githubLabel || 'GitHub Repo'}</span>
                          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono text-[#ff6a2b] hover:underline"
                        >
                          <ExternalLink size={14} />
                          <span>Live Web Application</span>
                        </a>
                      )}

                      {proj.linkedinUrl && (
                        <a
                          href={proj.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9a968d] hover:text-[#ff6a2b]"
                        >
                          <span>Launch Post</span>
                        </a>
                      )}

                      {proj.isConfidential && (
                        <span className="text-xs font-mono text-[#9a968d] light:text-[#6b665c]">
                          Internal Government Deployment (Proprietary)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Visual Slot & Screenshot Placeholder (4 cols) */}
                  <div className="lg:col-span-4 mt-4 lg:mt-0">
                    <div className="rounded-xl overflow-hidden hairline-all bg-[#12110e] light:bg-[#ffffff] p-4 flex flex-col justify-between h-48 sm:h-56 relative group/card hover:border-[#ff6a2b]/40 transition-colors">
                      
                      {/* Image Preview if available */}
                      {proj.image ? (
                        <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3 bg-[#161512]">
                          <img
                            src={proj.image}
                            alt={`${proj.title} preview`}
                            className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-28 rounded-lg hairline-all bg-[#161512] light:bg-[#f0ede6] flex flex-col items-center justify-center p-3 text-center mb-3">
                          <ImageIcon size={22} className="text-[#ff6a2b] mb-1.5 opacity-70" />
                          <span className="font-mono text-[10px] text-[#9a968d] uppercase tracking-wider">
                            Interactive Telemetry Slot
                          </span>
                        </div>
                      )}

                      {/* Required Screenshot TODO Badge */}
                      <div className="pt-2 hairline-t flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#ff6a2b] font-medium truncate pr-2">
                          {proj.screenshotTodo}
                        </span>
                        <ArrowUpRight size={14} className="text-[#9a968d] group-hover:text-[#ff6a2b] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;