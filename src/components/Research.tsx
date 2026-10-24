import React, { useState } from 'react';
import { BookOpen, ExternalLink, ArrowUpRight, ShoppingCart, Award, Eye, X } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  venue: string;
  date: string;
  type: 'Book' | 'Journal' | 'Conference';
  description: string;
  links: { label: string; url: string; isPrimary?: boolean }[];
  badges: string[];
  image?: string;
}

const publications: Publication[] = [
  {
    id: 'nutricaree',
    title: 'Nutricaree: Bridging Nutrition Science and Digital Wellness',
    venue: 'IJEDR Journal, Volume 13, Issue 4',
    date: 'November 2025',
    type: 'Journal',
    description: 'Explores data-driven nutritional telemetry, computational dietetics, and personalized digital health recommendations using machine learning models to prevent lifestyle health risks.',
    links: [
      { label: 'IJEDR Journal: [ADD URL]', url: 'https://www.ijedr.org/', isPrimary: true }
    ],
    badges: ['Volume 13, Issue 4', 'Peer-Reviewed Journal', 'Computational Dietetics']
  },
  {
    id: 'next-gen-cities',
    title: 'Data Science Solutions for Next Generation Cities',
    venue: 'IJPREMS Journal, Vol. 04, Issue 11, pp. 928–930',
    date: 'November 2024',
    type: 'Journal',
    description: 'Researched data-driven smart city infrastructure, sensor grid analytics, traffic predictive modeling, and scalable municipal decision support systems.',
    links: [
      { label: 'IJPREMS Journal: [ADD URL]', url: 'https://www.ijprems.com/', isPrimary: true }
    ],
    badges: ['Vol. 04, Issue 11', 'pp. 928–930', 'Smart City Analytics']
  },
  {
    id: 'pencil-ml',
    title: 'Image to Pencil Recognition using Machine Learning and OpenCV',
    venue: 'Presented at NCBISF\'24 National Conference',
    date: '2024',
    type: 'Conference',
    description: 'Presented a computer vision pipeline utilizing OpenCV edge detectors, dodge-and-burn blurs, and machine learning classifiers to synthesize pencil sketch representations from digital camera imagery.',
    links: [
      { label: 'Conference Code: [ADD URL]', url: 'https://github.com/jyotirana2005/Image-to-Pencil-Recognition-Using-ML-OpenCV', isPrimary: true }
    ],
    badges: ['NCBISF\'24', 'OpenCV Vision', 'Conference Paper']
  }
];

const Research: React.FC = () => {
  const [bookRotate, setBookRotate] = useState({ rotateY: -16, rotateX: 6 });
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleBookMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBookRotate({
      rotateY: (x / (rect.width / 2)) * 24,
      rotateX: -(y / (rect.height / 2)) * 14,
    });
  };

  const handleBookMouseLeave = () => {
    setBookRotate({ rotateY: -16, rotateX: 6 });
  };

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="py-24 sm:py-32 hairline-t perspective-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[var(--accent-small)] mb-3 flex items-center gap-2 font-semibold">
              <span>03 / RESEARCH &amp; PUBLICATIONS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="research-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight"
            >
              Academic Inquiries &amp; <span className="italic text-[#ff6a2b]">Authorship</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs font-medium">
            Published machine learning literature, journal investigations, and an authored textbook.
          </p>
        </div>

        {/* Featured Book Bento Card with 3D Rotating Mockup */}
        <div className="mb-14 bento-card rounded-3xl p-6 sm:p-10 hairline-all relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:border-[#ff6a2b]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Book Meta & Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#ff6a2b]/15 text-[var(--accent-small)] border border-[#ff6a2b]/30 font-semibold">
                  Featured Book Release
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] font-medium">
                  ISBN: 9999331718 · Eliva Press
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)] leading-tight">
                Hello AI: A Friendly Introduction to Machine Learning
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                Authored an intuitive primer introducing core machine learning principles, foundational algorithms, regression paradigms, and deep learning architectures to students and emerging practitioners.
              </p>

              {/* Book Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] hairline-all">
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase font-semibold">Publisher</div>
                  <div className="font-serif text-base text-[var(--text-primary)] font-medium mt-0.5">Eliva Press</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] hairline-all">
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase font-semibold">Classification</div>
                  <div className="font-serif text-base text-[var(--text-primary)] font-medium mt-0.5">ML Textbook</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] hairline-all col-span-2 sm:col-span-1">
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase font-semibold">Author</div>
                  <div className="font-serif text-base text-[var(--text-primary)] font-medium mt-0.5">Kasak Batra</div>
                </div>
              </div>

              {/* Purchase / Store Links */}
              <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
                <a
                  href="https://www.amazon.in/dp/9999331718"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-semibold transition-all shadow-md shadow-[#ff6a2b]/25 hover:-translate-y-0.5"
                >
                  <ShoppingCart size={14} />
                  <span>Amazon India</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href="https://www.elivapress.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full hairline-all bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:border-[#ff6a2b] font-semibold transition-all hover:-translate-y-0.5"
                >
                  <span>Publisher Catalog</span>
                  <ArrowUpRight size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => setModalImage('/projects/hello-ai-cover.svg')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[var(--text-muted)] hover:text-[#ff6a2b] transition-colors"
                >
                  <Eye size={14} />
                  <span>Inspect Cover</span>
                </button>
              </div>
            </div>

            {/* Right Column: 3D Rotating Book Mockup (5 cols) */}
            <div
              className="lg:col-span-5 flex items-center justify-center py-6 perspective-container"
              onMouseMove={handleBookMouseMove}
              onMouseLeave={handleBookMouseLeave}
            >
              <div
                className="relative cursor-pointer transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(1200px) rotateY(${bookRotate.rotateY}deg) rotateX(${bookRotate.rotateX}deg)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => setModalImage('/projects/hello-ai-cover.svg')}
                title="Click to view full cover in Lightbox"
              >
                {/* 3D Book Shadow on table */}
                <div
                  className="absolute -bottom-8 left-6 right-6 h-8 bg-black/40 rounded-full blur-xl pointer-events-none"
                  style={{ transform: 'rotateX(90deg) translateZ(-40px)' }}
                />

                {/* 3D Book Outer Container */}
                <div
                  className="w-[220px] sm:w-[260px] h-[330px] sm:h-[390px] rounded-r-lg rounded-l-sm shadow-2xl relative overflow-hidden hairline-all border-l-4 border-l-[#241f18]"
                  style={{
                    boxShadow: '15px 25px 50px -10px rgba(0, 0, 0, 0.6), -5px 0 15px rgba(0,0,0,0.4)',
                  }}
                >
                  <img
                    src="/projects/hello-ai-cover.svg"
                    alt="Hello AI book cover by Kasak Batra"
                    className="w-full h-full object-cover"
                  />

                  {/* 3D Sheen Highlight */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                    style={{ transform: 'translateZ(1px)' }}
                  />
                </div>

                {/* 3D Book Spine Indicator (Left side depth) */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-4 bg-[#14120f] border-r border-[#262420] pointer-events-none"
                  style={{
                    transform: 'rotateY(-90deg) translateX(-8px)',
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Published Papers List */}
        <div className="space-y-4">
          <div className="mono-label text-[var(--text-muted)] font-semibold mb-4">
            PEER-REVIEWED JOURNAL &amp; CONFERENCE PROCEEDINGS
          </div>

          <div className="divide-y divide-[var(--border-hairline)]">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-start justify-between gap-6 group transition-all duration-300 hover:bg-[var(--bg-surface-elevated)]/40 px-4 -mx-4 rounded-2xl"
              >
                <div className="space-y-2 md:max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[var(--bg-surface-elevated)] text-[var(--accent-small)] border border-[var(--border-hairline)] font-semibold">
                      {pub.type}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {pub.venue} · {pub.date}
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors leading-tight">
                    {pub.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                    {pub.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {pub.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface)] px-2.5 py-1 rounded border border-[var(--border-hairline)] font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 self-start md:self-center font-mono text-xs">
                  {pub.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full hairline-all bg-[var(--card-bg)] hover:border-[#ff6a2b] text-[var(--text-primary)] font-semibold transition-all hover:-translate-y-0.5"
                    >
                      <span>{link.label.split(':')[0]}</span>
                      <ArrowUpRight size={13} className="text-[#ff6a2b]" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal for Book Cover */}
        {modalImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Book Cover Preview"
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setModalImage(null)}
          >
            <div
              className="relative max-w-xl w-full bg-[var(--card-bg)] hairline-all rounded-3xl overflow-hidden shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 hairline-b mb-4">
                <h4 className="font-serif text-xl text-[var(--text-primary)]">
                  Hello AI: Book Cover Monograph
                </h4>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="p-1 rounded-full text-[var(--text-muted)] hover:text-[#ff6a2b]"
                  aria-label="Close Preview"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-auto flex items-center justify-center p-2 bg-[var(--bg-canvas)] rounded-2xl">
                <img
                  src={modalImage}
                  alt="Full Book Cover Preview"
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Research;
