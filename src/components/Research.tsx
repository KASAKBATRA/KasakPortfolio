import React, { useState } from 'react';
import { BookOpen, ExternalLink, ArrowUpRight, FileText, ShoppingCart, Award } from 'lucide-react';

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
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="py-24 sm:py-32 hairline-t"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 hairline-b pb-8">
          <div>
            <div className="mono-label text-[#ff6a2b] mb-3 flex items-center gap-2">
              <span>03 / RESEARCH &amp; PUBLICATIONS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a2b]" />
            </div>
            <h2
              id="research-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight"
            >
              Academic Inquiries &amp; <span className="italic text-[#ff6a2b]">Authorship</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] max-w-xs">
            Published machine learning literature, journal investigations, and an authored textbook.
          </p>
        </div>

        {/* Featured Book Bento Card */}
        <div className="mb-14 bento-card rounded-3xl p-6 sm:p-10 hairline-all relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Book Meta & Copy (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#ff6a2b]/15 text-[#ff6a2b] border border-[#ff6a2b]/30">
                  Featured Book Release
                </span>
                <span className="font-mono text-xs text-[#9a968d]">
                  ISBN: 9999331718 · Eliva Press
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f2efe8] light:text-[#141311] leading-tight">
                Hello AI: A Friendly Introduction to Machine Learning
              </h3>

              <p className="font-mono text-xs text-[#ff6a2b] uppercase tracking-wider">
                Published with Eliva Press (Worldwide Distribution) · 2024
              </p>

              <p className="text-sm sm:text-base text-[#9a968d] light:text-[#6b665c] leading-relaxed max-w-2xl">
                Authored to demystify artificial intelligence and machine learning fundamentals for beginners and practitioners. Covers intuitive math, neural logic, regression, clustering, and hands-on coding demonstrations.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="https://www.amazon.com/dp/9999331718"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#ff6a2b]/20"
                >
                  <ShoppingCart size={14} />
                  <span>Amazon Store (Paperback)</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://elivabooks.com/en/book/book-2784504513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full hairline-all bg-[#161512] light:bg-[#f0ede6] hover:border-[#ff6a2b] text-[#f2efe8] light:text-[#141311] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  <BookOpen size={14} />
                  <span>Eliva Press Bookstore</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Book Photos Mockup (4 cols) */}
            <div className="lg:col-span-4 flex items-center justify-center gap-3">
              <div className="relative group/photo">
                <img
                  src="/Photo1.jpg"
                  alt="Hello AI Book Cover by Kasak Batra"
                  className="w-36 sm:w-44 h-auto rounded-lg shadow-2xl hairline-all transform -rotate-3 hover:rotate-0 transition-transform duration-300 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative group/photo -ml-6 mt-6">
                <img
                  src="/Photo2.jpg"
                  alt="Kasak Batra presenting Hello AI Book"
                  className="w-32 sm:w-40 h-auto rounded-lg shadow-2xl hairline-all transform rotate-3 hover:rotate-0 transition-transform duration-300 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Academic Journal Index List */}
        <div>
          <h4 className="mono-label text-xs text-[#9a968d] light:text-[#6b665c] mb-4">
            Peer-Reviewed Journal &amp; Conference Articles
          </h4>

          <div className="divide-y divide-[var(--border-hairline)] hairline-t hairline-b">
            {publications.map((pub, idx) => (
              <a
                key={pub.id}
                href={pub.links[0]?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:translate-x-2 block"
              >
                <div className="space-y-1.5 md:max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#ff6a2b]">
                      [0{idx + 1}]
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#9a968d] light:text-[#6b665c]">
                      {pub.type}
                    </span>
                    <span className="text-[#9a968d] text-xs">·</span>
                    <span className="font-mono text-xs text-[#9a968d] light:text-[#6b665c]">
                      {pub.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#f2efe8] light:text-[#141311] group-hover:text-[#ff6a2b] transition-colors">
                    {pub.title}
                  </h3>

                  <p className="font-mono text-xs text-[#ff6a2b]/90">
                    {pub.venue}
                  </p>

                  <p className="text-xs sm:text-sm text-[#9a968d] light:text-[#6b665c] line-clamp-2 mt-1">
                    {pub.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="font-mono text-xs text-[#9a968d] group-hover:text-[#ff6a2b] transition-colors">
                    View Paper
                  </span>
                  <div className="w-8 h-8 rounded-full hairline-all flex items-center justify-center text-[#9a968d] group-hover:text-[#ff6a2b] group-hover:border-[#ff6a2b] transition-colors">
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Research;
