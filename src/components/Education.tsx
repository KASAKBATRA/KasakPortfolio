import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, HeartHandshake, Eye, X } from 'lucide-react';

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalImage]);

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-24 sm:py-32 hairline-t perspective-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[var(--accent-small)] mb-3 flex items-center gap-2 font-semibold">
              <span>05 / EDUCATION &amp; CREDENTIALS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="education-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight"
            >
              Academic Pedigree &amp; <span className="italic text-[#ff6a2b]">Beyond</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs font-medium">
            Academic distinction, elite certifications, and leadership in social welfare initiatives.
          </p>
        </div>

        {/* 3 Main Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card 1: Education (4 cols) */}
          <div className="lg:col-span-4 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#ff6a2b]/40">
            <div>
              <div className="flex items-center gap-3 pb-4 hairline-b mb-6">
                <GraduationCap size={22} className="text-[#ff6a2b]" />
                <h3 className="font-serif text-2xl text-[var(--text-primary)]">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {/* B.Tech */}
                <div className="relative pl-4 hairline-l">
                  <div className="font-serif text-lg text-[var(--text-primary)] font-medium">
                    B.Tech in Artificial Intelligence &amp; Data Science
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Dr. Akhilesh Das Gupta Institute of Professional Studies
                  </p>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <span className="text-[var(--accent-small)] font-bold">94.5% Aggregate</span>
                    <span className="text-[var(--text-muted)] font-medium">Class of 2026</span>
                  </div>
                </div>

                {/* Class XII */}
                <div className="relative pl-4 hairline-l">
                  <div className="font-serif text-base text-[var(--text-primary)] font-medium">
                    CBSE Class XII (Senior Secondary)
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Central Board of Secondary Education
                  </p>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <span className="text-[var(--accent-small)] font-bold">89.0% Score</span>
                    <span className="text-[var(--text-muted)] font-medium">2022</span>
                  </div>
                </div>

                {/* Class X */}
                <div className="relative pl-4 hairline-l">
                  <div className="font-serif text-base text-[var(--text-primary)] font-medium">
                    CBSE Class X (Secondary)
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Central Board of Secondary Education
                  </p>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <span className="text-[var(--accent-small)] font-bold">84.0% Score</span>
                    <span className="text-[var(--text-muted)] font-medium">2020</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 hairline-t font-mono text-xs text-[var(--text-muted)] font-medium">
              Consistent Academic Distinctions
            </div>
          </div>

          {/* Card 2: Certificates & Achievements (5 cols) */}
          <div className="lg:col-span-5 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#ff6a2b]/40">
            <div>
              <div className="flex items-center justify-between pb-4 hairline-b mb-6">
                <div className="flex items-center gap-3">
                  <Award size={22} className="text-[#ff6a2b]" />
                  <h3 className="font-serif text-2xl text-[var(--text-primary)]">
                    Certificates &amp; Honors
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[var(--accent-small)] uppercase font-semibold">
                  Credentials
                </span>
              </div>

              <div className="divide-y divide-[var(--border-hairline)]">
                {certificates.map((cert) => (
                  <div
                    key={cert.title}
                    className="py-3.5 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      {cert.file && (
                        <div
                          onClick={() => setModalImage({ src: cert.file!, title: cert.title })}
                          className="w-12 h-9 rounded-md overflow-hidden hairline-all flex-shrink-0 cursor-pointer bg-[var(--bg-canvas)] hover:border-[#ff6a2b] transition-all group-hover:scale-105"
                          title="Click to expand certificate"
                        >
                          <img
                            src={cert.file}
                            alt={cert.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-serif text-base text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors">
                          {cert.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)] mt-0.5">
                          <span className="text-[var(--text-secondary)] font-medium">{cert.issuer}</span>
                          <span>·</span>
                          <span>{cert.year}</span>
                          {cert.note && (
                            <>
                              <span>·</span>
                              <span className="text-[var(--accent-small)] font-semibold">{cert.note}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {cert.file && (
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: cert.file!, title: cert.title })}
                        className="px-2.5 py-1 rounded-full text-xs font-mono hairline-all bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:text-[#ff6a2b] hover:border-[#ff6a2b] transition-colors flex items-center gap-1.5 flex-shrink-0 font-medium"
                        title="View Certificate"
                      >
                        <Eye size={12} className="text-[#ff6a2b]" />
                        <span>View</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 hairline-t font-mono text-xs text-[var(--text-muted)] font-medium">
              National Benchmark &amp; Industry Standards
            </div>
          </div>

          {/* Card 3: Beyond Work (3 cols) with real photo gallery */}
          <div className="lg:col-span-3 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#ff6a2b]/40">
            <div>
              <div className="flex items-center gap-3 pb-4 hairline-b mb-6">
                <HeartHandshake size={22} className="text-[#ff6a2b]" />
                <h3 className="font-serif text-2xl text-[var(--text-primary)]">
                  Beyond Work
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-[var(--text-primary)]">
                    Graphics Head
                  </h4>
                  <p className="font-mono text-xs text-[var(--accent-small)] mt-0.5 font-semibold">
                    National Service Scheme (NSS)
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    Directed design collateral, brand visual language, and social outreach campaigns across multi-state social causes.
                  </p>

                  {/* Photo thumbnails grid */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div
                      onClick={() => setModalImage({ src: '/ach3.jpg', title: 'NSS Outreach & Leadership' })}
                      className="group/img relative aspect-[4/3] rounded-lg overflow-hidden hairline-all cursor-pointer bg-[var(--bg-canvas)] hover:border-[#ff6a2b] transition-all"
                    >
                      <img src="/ach3.jpg" alt="NSS Outreach" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                        <Eye size={12} className="mr-1 text-[#ff6a2b]" /> View
                      </div>
                    </div>
                    <div
                      onClick={() => setModalImage({ src: '/ach5-1.jpg', title: 'NSS Graphic Campaign & Impact' })}
                      className="group/img relative aspect-[4/3] rounded-lg overflow-hidden hairline-all cursor-pointer bg-[var(--bg-canvas)] hover:border-[#ff6a2b] transition-all"
                    >
                      <img src="/ach5-1.jpg" alt="NSS Graphic Campaign" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                        <Eye size={12} className="mr-1 text-[#ff6a2b]" /> View
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 hairline-t">
                  <h4 className="font-serif text-lg text-[var(--text-primary)]">
                    Codeveda
                  </h4>
                  <p className="font-mono text-xs text-[var(--accent-small)] mt-0.5 font-semibold">
                    Mentorship &amp; Peer Learning
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    Mentored aspiring engineers and conducted algorithmic problem-solving workshops and technical webinars.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div
                      onClick={() => setModalImage({ src: '/ach1.jpeg', title: 'Codeveda Hackathon Mentorship' })}
                      className="group/img relative aspect-[4/3] rounded-lg overflow-hidden hairline-all cursor-pointer bg-[var(--bg-canvas)] hover:border-[#ff6a2b] transition-all"
                    >
                      <img src="/ach1.jpeg" alt="Codeveda Hackathon" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                        <Eye size={12} className="mr-1 text-[#ff6a2b]" /> View
                      </div>
                    </div>
                    <div
                      onClick={() => setModalImage({ src: '/ach2.png', title: 'Academic Excellence & Recognition' })}
                      className="group/img relative aspect-[4/3] rounded-lg overflow-hidden hairline-all cursor-pointer bg-[var(--bg-canvas)] hover:border-[#ff6a2b] transition-all"
                    >
                      <img src="/ach2.png" alt="Academic Recognition" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                        <Eye size={12} className="mr-1 text-[#ff6a2b]" /> View
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 hairline-t font-mono text-xs text-[var(--text-muted)] font-medium">
              Community &amp; Civic Engagement
            </div>
          </div>

        </div>

        {/* Modal for viewing certificates / photos */}
        {modalImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setModalImage(null)}
          >
            <div
              className="bg-[var(--card-bg)] hairline-all rounded-2xl max-w-3xl w-full p-4 sm:p-6 overflow-hidden relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 hairline-b mb-4">
                <h4 id="modal-title" className="font-serif text-xl text-[var(--text-primary)]">
                  {modalImage.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="p-1 rounded-full text-[var(--text-muted)] hover:text-[#ff6a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-[var(--bg-canvas)] rounded-lg p-2">
                <img
                  src={modalImage.src}
                  alt={modalImage.title}
                  className="max-h-[70vh] w-auto object-contain rounded"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Education;
