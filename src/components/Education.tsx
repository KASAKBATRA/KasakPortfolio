import React, { useState } from 'react';
import { GraduationCap, Award, HeartHandshake, CheckCircle2, Eye, X, ExternalLink, Calendar, MapPin } from 'lucide-react';

interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  note?: string;
  file?: string;
}

const certificates: CertificateItem[] = [
  {
    title: 'GATE 2026 Qualified',
    issuer: 'National GATE Committee',
    year: '2026',
    note: 'AI & Data Science'
  },
  {
    title: 'UGC NET Qualified',
    issuer: 'National Testing Agency (NTA)',
    year: '2026',
    note: 'Computer Science Applications'
  },
  {
    title: 'Business Analytics & Data Mining with R',
    issuer: 'NPTEL (IIT Kharagpur)',
    year: '2025',
    note: 'Top 2% Elite',
    file: '/cert 1.png'
  },
  {
    title: 'Data Analytics with Python',
    issuer: 'NPTEL',
    year: '2024',
    file: '/cert 2.png'
  },
  {
    title: 'IBM Summer Training',
    issuer: 'IBM',
    year: '2024',
    note: 'ML, DL, Generative AI & IBM Cloud',
    file: '/cert 3.jpeg'
  },
  {
    title: 'Discrete Mathematics',
    issuer: 'NPTEL',
    year: '2023',
    file: '/cert 4.png'
  },
  {
    title: 'EPAM Scholar',
    issuer: 'EPAM Systems',
    year: '2024–25',
    note: 'Academic Excellence in AI'
  }
];

const Education: React.FC = () => {
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <section id="education" aria-labelledby="education-heading" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap size={14} aria-hidden="true" />
            <span>Academic &amp; Leadership Record</span>
          </div>
          <h2 id="education-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Education, Certificates &amp; Beyond Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base">
            Formal degrees, competitive national qualifications, professional accreditations, and community mentorship.
          </p>
        </div>

        {/* 3 Main Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Education */}
          <div className="rounded-3xl glass-morphism border border-slate-700/80 p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 shadow-2xl hover-lift-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-md">
                  <GraduationCap size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Education</h3>
                  <span className="text-xs text-blue-400 font-medium">Academic Foundations</span>
                </div>
              </div>

              <div className="space-y-5">
                {/* Degree 1 */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-400/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-white text-base leading-snug">
                      B.Tech in Artificial Intelligence &amp; Data Science
                    </h4>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold border border-blue-500/40">
                      94.5%
                    </span>
                  </div>
                  <p className="text-cyan-400 text-xs sm:text-sm font-semibold mt-1">
                    Dr. Akhilesh Das Gupta Institute of Professional Studies
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                    <Calendar size={13} />
                    <span>Graduating Class of 2026</span>
                  </div>
                </div>

                {/* Class XII */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-cyan-400/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-white text-sm">
                      CBSE Class XII (Senior Secondary)
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
                      89%
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">MotiRam Memorial Girls Sr. Sec. School, Delhi</p>
                  <div className="text-xs text-slate-500 mt-1">Completed in 2022 • Mathematics &amp; Science</div>
                </div>

                {/* Class X */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-slate-500 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-white text-sm">
                      CBSE Class X (Secondary)
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600">
                      84%
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">CBSE Board Exam</p>
                  <div className="text-xs text-slate-500 mt-1">Completed in 2020</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
              <span>Primary Specialization:</span>
              <span className="text-cyan-400 font-semibold">AI, ML &amp; Statistics</span>
            </div>
          </div>

          {/* Card 2: Certificates & Achievements */}
          <div className="rounded-3xl glass-morphism border border-slate-700/80 p-6 sm:p-8 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl hover-lift-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-md">
                  <Award size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Certificates &amp; Credentials</h3>
                  <span className="text-xs text-cyan-400 font-medium">National Exams &amp; Industry (Tap eye to preview)</span>
                </div>
              </div>

              <div className="space-y-3">
                {certificates.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70 flex items-center justify-between gap-3 hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-bold text-white text-xs sm:text-sm truncate">
                          {cert.title}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{cert.issuer}</span>
                          {cert.note && (
                            <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 font-semibold text-[10px]">
                              {cert.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {cert.file && (
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: cert.file!, title: cert.title })}
                        className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 transition-colors flex-shrink-0"
                        title={`View ${cert.title} certificate`}
                      >
                        <Eye size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
              <span>Drive Verification:</span>
              <a 
                href="https://drive.google.com/drive/folders/1AzPBkq6D4piA5sCly7odkmMOhpYQDNzi?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-semibold"
              >
                <span>Google Drive Certs</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Card 3: Beyond Work */}
          <div className="rounded-3xl glass-morphism border border-slate-700/80 p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-300 shadow-2xl hover-lift-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-md">
                  <HeartHandshake size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Beyond Work</h3>
                  <span className="text-xs text-purple-400 font-medium">Leadership, Hackathons &amp; Impact</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* NSS Graphics Head */}
                <div 
                  className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-purple-400/50 transition-colors cursor-pointer group"
                  onClick={() => setModalImage({ src: '/ach3.jpg', title: 'Graphics Head — National Service Scheme (NSS)' })}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-display font-bold text-white text-sm sm:text-base">
                      Graphics Head — NSS
                    </h4>
                    <span className="text-[10px] text-purple-300 px-2 py-0.5 rounded bg-purple-500/20 font-bold">
                      Team of 20+
                    </span>
                  </div>
                  <p className="text-xs text-purple-300 font-medium mt-1">National Service Scheme</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Led a creative team of 20 designers; boosted event engagement by 75% across community blood drives, cleanliness rallies, and educational camps.
                  </p>
                  <div className="text-[11px] text-cyan-400 group-hover:underline mt-2 flex items-center gap-1">
                    <span>View photo</span>
                    <Eye size={12} />
                  </div>
                </div>

                {/* Codeveda Hackathon Mentor */}
                <div 
                  className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-purple-400/50 transition-colors cursor-pointer group"
                  onClick={() => setModalImage({ src: '/ach5-1.jpg', title: 'Codeveda Hackathon Mentor (Microsoft)' })}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-display font-bold text-white text-sm sm:text-base">
                      Codeveda Hackathon Mentor
                    </h4>
                    <span className="text-[10px] text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/20 font-bold">
                      15+ Teams
                    </span>
                  </div>
                  <p className="text-xs text-purple-300 font-medium mt-1">Supported by Microsoft &amp; The Geek Room</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Mentored 15+ student engineering teams; 5 mentored teams reached Top 16 finals solving AI and software automation challenges.
                  </p>
                  <div className="text-[11px] text-cyan-400 group-hover:underline mt-2 flex items-center gap-1">
                    <span>View photo</span>
                    <Eye size={12} />
                  </div>
                </div>

                {/* Khelo India */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">
                    Volunteer — Khelo India Para Games
                  </h4>
                  <p className="text-xs text-purple-300 font-medium mt-1">National Parasports Event</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Contributed to event logistics, athlete escorting, and coordination for national parathletes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
              <span>Community Impact:</span>
              <span className="text-purple-400 font-semibold">Leadership &amp; Mentorship</span>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Certificate / Event Photo Preview */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-2xl w-full p-4 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h4 className="font-bold text-white text-sm truncate">{modalImage.title}</h4>
              <button
                onClick={() => setModalImage(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center">
              <img
                src={modalImage.src}
                alt={modalImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;
