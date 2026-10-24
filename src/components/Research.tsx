import React, { useState } from 'react';
import { BookOpen, FileText, ExternalLink, Bookmark, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface Publication {
  title: string;
  venue: string;
  type: 'Book' | 'Journal' | 'Conference';
  date: string;
  description: string;
  links: { label: string; url: string; isPrimary?: boolean }[];
  image?: string;
  secondaryImage?: string;
  badges: string[];
}

const publications: Publication[] = [
  {
    title: 'Hello AI: A Friendly Introduction to Machine Learning',
    venue: 'Published by Eliva Press (Worldwide Distribution)',
    type: 'Book',
    date: '2024',
    description: 'Debut authored book designed to demystify artificial intelligence and machine learning fundamentals for beginners and tech enthusiasts through real-world insights, intuitive math, and hands-on coding demonstrations.',
    links: [
      { label: 'Amazon Store (Paperback)', url: 'https://www.amazon.com/dp/9999331718', isPrimary: true },
      { label: 'Eliva Press Bookstore', url: 'https://elivabooks.com/en/book/book-2784504513' }
    ],
    image: '/Photo1.jpg',
    secondaryImage: '/Photo2.jpg',
    badges: ['ISBN: 9999331718', 'Authored Book', 'Eliva Press']
  },
  {
    title: 'Nutricaree: Bridging Nutrition Science and Digital Wellness',
    venue: 'IJEDR Journal, Volume 13, Issue 4',
    type: 'Journal',
    date: 'November 2025',
    description: 'Explores data-driven nutritional telemetry, computational dietetics, and personalized digital health recommendations using machine learning models to prevent lifestyle health risks.',
    links: [
      { label: 'IJEDR Journal: [ADD URL]', url: 'https://www.ijedr.org/', isPrimary: true }
    ],
    badges: ['Volume 13, Issue 4', 'Peer-Reviewed Journal', 'Digital Health AI']
  },
  {
    title: 'Data Science Solutions for Next Generation Cities',
    venue: 'IJPREMS Journal, Vol. 04, Issue 11, pp. 928–930',
    type: 'Journal',
    date: 'November 2024',
    description: 'Researched data-driven smart city infrastructure, sensor grid analytics, traffic predictive modeling, and scalable municipal decision support systems.',
    links: [
      { label: 'IJPREMS Journal: [ADD URL]', url: 'https://www.ijprems.com/', isPrimary: true }
    ],
    image: '/ach2.png',
    badges: ['Vol. 04, Issue 11', 'pp. 928–930', 'Smart Cities']
  },
  {
    title: 'Image to Pencil Recognition using Machine Learning and OpenCV',
    venue: 'Presented at NCBISF\'24 National Conference',
    type: 'Conference',
    date: '2024',
    description: 'Presented a computer vision pipeline utilizing OpenCV edge detectors, dodge-and-burn blurs, and machine learning classifiers to synthesize pencil sketch representations from digital camera imagery.',
    links: [
      { label: 'Conference Paper & GitHub Repository', url: 'https://github.com/jyotirana2005/Image-to-Pencil-Recognition-Using-ML-OpenCV', isPrimary: true }
    ],
    image: '/ach1.jpeg',
    badges: ['NCBISF\'24 Conference', 'OpenCV & ML', 'Computer Vision']
  }
];

const Research: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <section id="research" aria-labelledby="research-heading" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Bookmark size={14} aria-hidden="true" />
            <span>Scholarship &amp; Publications</span>
          </div>
          <h2 id="research-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Research, Publications &amp; Book
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base">
            Authored literature and peer-reviewed conference research across machine learning, health informatics, and urban data science.
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {publications.map((pub, idx) => (
            <article
              key={idx}
              className="rounded-3xl glass-morphism border border-slate-700/80 hover:border-purple-400/50 transition-all duration-300 shadow-2xl hover-lift-glow flex flex-col justify-between overflow-hidden"
            >
              {/* Optional Photo Banner */}
              {pub.image && (
                <div 
                  className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer group"
                  onClick={() => setModalImage(pub.image || null)}
                  title="Click to view full photo"
                >
                  <img
                    src={pub.image}
                    alt={pub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <span className="absolute bottom-3 right-3 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-950/80 text-cyan-300 border border-slate-700 backdrop-blur-md">
                    Tap to view photo
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top pill row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                      pub.type === 'Book'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : pub.type === 'Journal'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    }`}>
                      {pub.type === 'Book' ? '📘 Authored Book' : pub.type === 'Journal' ? '📄 Journal Paper' : '🎤 Conference Paper'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{pub.date}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                    "{pub.title}"
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 mb-4">
                    {pub.type === 'Book' ? <BookOpen size={16} /> : <FileText size={16} />}
                    <span>{pub.venue}</span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {pub.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pub.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80 font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-5 border-t border-slate-700/60 flex flex-wrap items-center gap-3">
                  {pub.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : '_self'}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                        link.isPrimary
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={13} />
                    </a>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Photo inspection */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] p-2 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-4 -right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 border border-slate-600"
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>
            <img
              src={modalImage}
              alt="Publication preview"
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Research;
