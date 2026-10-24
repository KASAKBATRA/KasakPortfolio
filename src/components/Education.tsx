import React, { useState } from 'react';
import { GraduationCap, Award, HeartHandshake, Eye, X, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

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
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-24 sm:py-32 hairline-t"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[#ff6a2b] mb-3 flex items-center gap-2">
              <span>05 / EDUCATION &amp; CREDENTIALS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="education-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight"
            >
              Academic Pedigree &amp; <span className="italic text-[#ff6a2b]">Beyond</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] max-w-xs">
            Academic distinction, elite certifications, and leadership in social welfare initiatives.
          </p>
        </div>

        {/* 3 Main Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card 1: Education (4 cols) */}
          <div className="lg:col-span-4 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 pb-4 hairline-b mb-6">
                <GraduationCap size={20} className="text-[#ff6a2b]" />
                <h3 className="font-serif text-2xl text-[#f2efe8] light:text-[#141311]">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {/* B.Tech */}
                <div className="relative pl-4 hairline-l">
                  <div className="font-serif text-lg text-[#f2efe8] light:text-[#141311]">
                    B.Tech in Artificial Intelligence &amp; Data Science
                  </div>
                  <p className="text-xs text-[#9a968d] light:text-[#6b665c] mt-0.5">
                    Dr. Akhilesh Das Gupta Institute of Professional Studies
                  </p>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <span className="text-[#ff6a2b] font-bold">94.5% Aggregate</span>
                    <span className="text-[#9a968d]">Class of 2026</span>
                  </div>
                </div>

                {/* Class XII */}
                <div className="relative pl-4 hairline-l">
                  <div className="font-serif text-base text-[#f2efe8] light:text-[#141311]">
                    CBSE Class XII (Senior Secondary)
                  </div>
                  <p className="text-xs text-[#9a968d] light:text-[#6b665c] mt-0.5">
                    Central Board of Secondary Education
                  </p>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <span className="text-[#ff6a2b] font-bold">89.0% Score</span>
                    <span className="text-[#9a968d]">2022</span>
                  </div>
                </div>

                {/* Class X */}
                <div className="relative pl-4 hairline-l">
                  <div className="font-serif text-base text-[#f2efe8] light:text-[#141311]">
                    CBSE Class X (Secondary)
                  </div>
                  <p className="text-xs text-[#9a968d] light:text-[#6b665c] mt-0.5">
                    Central Board of Secondary Education
                  </p>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <span className="text-[#ff6a2b] font-bold">84.0% Score</span>
                    <span className="text-[#9a968d]">2020</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 hairline-t font-mono text-xs text-[#9a968d]">
              Consistent Academic Distinctions
            </div>
          </div>

          {/* Card 2: Certificates & Achievements (5 cols) */}
          <div className="lg:col-span-5 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 hairline-b mb-6">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-[#ff6a2b]" />
                  <h3 className="font-serif text-2xl text-[#f2efe8] light:text-[#141311]">
                    Certificates &amp; Honors
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#ff6a2b] uppercase">
                  Click to View
                </span>
              </div>

              <div className="divide-y divide-[var(--border-hairline)]">
                {certificates.map((cert) => (
                  <div
                    key={cert.title}
                    className="py-3 flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="font-serif text-base text-[#f2efe8] light:text-[#141311] group-hover:text-[#ff6a2b] transition-colors">
                        {cert.title}
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#9a968d] light:text-[#6b665c] mt-0.5">
                        <span>{cert.issuer}</span>
                        <span>·</span>
                        <span>{cert.year}</span>
                        {cert.note && (
                          <>
                            <span>·</span>
                            <span className="text-[#ff6a2b]">{cert.note}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {cert.file && (
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: cert.file!, title: cert.title })}
                        className="px-2.5 py-1 rounded text-xs font-mono hairline-all bg-[#161512] light:bg-[#f0ede6] text-[#9a968d] hover:text-[#ff6a2b] hover:border-[#ff6a2b] transition-colors flex items-center gap-1.5 flex-shrink-0"
                        title="View Certificate"
                      >
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 hairline-t font-mono text-xs text-[#9a968d]">
              National Benchmark &amp; Industry Standards
            </div>
          </div>

          {/* Card 3: Beyond Work (3 cols) */}
          <div className="lg:col-span-3 bento-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 pb-4 hairline-b mb-6">
                <HeartHandshake size={20} className="text-[#ff6a2b]" />
                <h3 className="font-serif text-2xl text-[#f2efe8] light:text-[#141311]">
                  Beyond Work
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-[#f2efe8] light:text-[#141311]">
                    Graphics Head
                  </h4>
                  <p className="font-mono text-xs text-[#ff6a2b] mt-0.5">
                    National Service Scheme (NSS)
                  </p>
                  <p className="text-xs text-[#9a968d] light:text-[#6b665c] mt-2 leading-relaxed">
                    Directed design collateral, brand visual language, and social outreach campaigns across multi-state social causes.
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setModalImage({ src: '/ach3.jpg', title: 'NSS Outreach & Leadership' })}
                      className="px-2.5 py-1 rounded text-xs font-mono hairline-all bg-[#161512] text-[#9a968d] hover:text-[#ff6a2b] flex items-center gap-1"
                    >
                      <Eye size={11} /> Photo 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalImage({ src: '/ach5-1.jpg', title: 'NSS Graphic Campaign & Impact' })}
                      className="px-2.5 py-1 rounded text-xs font-mono hairline-all bg-[#161512] text-[#9a968d] hover:text-[#ff6a2b] flex items-center gap-1"
                    >
                      <Eye size={11} /> Photo 2
                    </button>
                  </div>
                </div>

                <div className="pt-4 hairline-t">
                  <h4 className="font-serif text-lg text-[#f2efe8] light:text-[#141311]">
                    Codeveda
                  </h4>
                  <p className="font-mono text-xs text-[#ff6a2b] mt-0.5">
                    Mentorship &amp; Peer Learning
                  </p>
                  <p className="text-xs text-[#9a968d] light:text-[#6b665c] mt-2 leading-relaxed">
                    Mentored aspiring engineers and conducted algorithmic problem-solving workshops and technical webinars.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 hairline-t font-mono text-xs text-[#9a968d]">
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
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setModalImage(null)}
          >
            <div
              className="bg-[#141310] hairline-all rounded-2xl max-w-3xl w-full p-4 sm:p-6 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 hairline-b mb-4">
                <h4 id="modal-title" className="font-serif text-xl text-[#f2efe8]">
                  {modalImage.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="p-1 rounded-full text-[#9a968d] hover:text-[#ff6a2b] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-[#0e0d0b] rounded-lg p-2">
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
