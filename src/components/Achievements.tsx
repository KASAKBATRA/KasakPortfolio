import React, { useRef } from 'react';

type Achievement = {
  id: string | number;
  images?: string[]; // public/ relative paths like '/banner.png'
  caption?: string;
  highlight?: string;
  date?: string; // optional ISO date string to sort by recency
  tags?: string[];
};

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/kasak-removebg-preview.png"
        alt="Kasak"
        className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700"
      />
      <div>
        <div className="text-white font-semibold">Kasak · Aspiring Data Scientist</div>
        <div className="text-slate-400 text-sm">B.Tech AI & Data Science</div>
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{ a: Achievement }> = ({ a }) => {
  return (
    <article className="group bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 hover:shadow-pink-600/20 transition-shadow duration-400">
      {/* Banner image */}
      {a.images && a.images.length > 0 && (
        <div className="relative bg-slate-900/40">
          {/* Use object-contain + padding so full images (certificates/posters) are visible without cropping */}
          <div className="w-full h-36 flex items-center justify-center p-3 bg-slate-900/20">
            <img
              src={a.images[0]}
              alt="achievement banner"
              className="max-h-full max-w-full object-contain rounded-md"
            />
          </div>
          <div className="absolute top-3 right-3 bg-slate-900/60 text-white p-2 rounded-lg">
            📌
          </div>
        </div>
      )}

      <div className="p-6">
        <ProfileHeader />

        {a.highlight && (
          <h3 className="text-white font-bold text-lg mt-4">{a.highlight}</h3>
        )}

  <p className="text-slate-300 mt-3 text-sm leading-relaxed line-clamp-2">{a.caption}</p>

        {/* Tags */}
        {a.tags && a.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {a.tags.map((tag, idx) => (
              <span key={idx} className="bg-slate-700/40 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-600/40">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm hover:text-red-400 transition-colors">❤️ <span className="text-slate-300">24</span></button>
            <button className="flex items-center gap-2 text-sm hover:text-sky-400 transition-colors">💬 <span className="text-slate-300">3</span></button>
            <button className="flex items-center gap-2 text-sm hover:text-green-400 transition-colors">🔁 <span className="text-slate-300">2</span></button>
          </div>

          <div className="text-xs text-slate-500">2d • Public</div>
        </div>
      </div>
    </article>
  );
};

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AchievementsFeed: React.FC<{ items: Achievement[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxImages, setLightboxImages] = React.useState<string[]>([]);
  const [lightboxCaption, setLightboxCaption] = React.useState<string>('');
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (typeof a.id === 'number' && typeof b.id === 'number') return b.id - a.id;
      return 0;
    });
  }, [items]);

  const scrollBy = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  // Lightbox handlers
  const openLightbox = (images: string[] = [], caption = '', startIndex = 0) => {
    if (!images || images.length === 0) return;
    setLightboxImages(images);
    setLightboxCaption(caption);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const prevImage = () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, lightboxImages]);

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-white">“Chapters of Impact”</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">A curated collection of achievements that reflect growth, passion, and purpose.</p>
        </div>

        {/* Mobile: stacked full-width cards for better phone UX */}
        <div className="block md:hidden">
          <div className="space-y-6">
            {sortedItems.map((it) => (
              <div key={it.id}>
                <div onClick={() => openLightbox(it.images || [], it.caption || '', 0)} className="cursor-pointer">
                  <AchievementCard a={it} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop / Tablet: horizontal slider */}
        <div className="relative hidden md:block">
          <button
            aria-label="Previous"
            onClick={() => scrollBy('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800/60 text-slate-200 p-2 rounded-md hover:bg-slate-800"
          >
            <ChevronLeft />
          </button>

          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto py-4 px-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {sortedItems.map((it) => (
              <div key={it.id} className="snap-start min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[360px]">
                <div className="group hover:scale-102 transform-gpu transition-transform duration-300">
                  {/* open lightbox on banner click */}
                  <div onClick={() => openLightbox(it.images || [], it.caption || '', 0)} className="cursor-pointer">
                    <AchievementCard a={it} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Next"
            onClick={() => scrollBy('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800/60 text-slate-200 p-2 rounded-md hover:bg-slate-800"
          >
            <ChevronRight />
          </button>
  </div>
      </div>
      {/* Lightbox modal (renders at end so it isn't affected by slider overflow) */}
      <LightboxModal
        open={lightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        caption={lightboxCaption}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
        onSelect={(i) => setLightboxIndex(i)}
      />
    </section>
  );
};

// Lightbox modal component rendered at the bottom of this file
const LightboxModal: React.FC<{
  open: boolean;
  images: string[];
  index: number;
  caption: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}> = ({ open, images, index, caption, onClose, onPrev, onNext, onSelect }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-4xl w-full bg-slate-900 rounded-lg overflow-hidden">
        <div className="relative bg-black">
          {/* Left large hit area */}
          <div onClick={onPrev} className="absolute left-0 top-0 h-full w-1/6 hover:bg-black/20 z-30 cursor-pointer" aria-hidden />
          {/* Right large hit area */}
          <div onClick={onNext} className="absolute right-0 top-0 h-full w-1/6 hover:bg-black/20 z-30 cursor-pointer" aria-hidden />

          <img
            src={images[index]}
            alt={`lightbox-${index}`}
            className="w-full object-contain max-h-[70vh] bg-black cursor-zoom-in"
            onClick={onNext}
          />

          <button
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute top-3 right-3 z-50 p-3 bg-white/6 hover:bg-white/12 text-white rounded-full shadow-lg ring-1 ring-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-800/60 p-3 rounded-md z-40">‹</button>
          <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-800/60 p-3 rounded-md z-40">›</button>
        </div>

        <div className="p-4 text-slate-200">
          <div className="text-lg font-semibold mb-2">{caption}</div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">{index + 1} of {images.length}</div>
            <div className="text-sm text-slate-400">Click image to go next • Esc to close</div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => onSelect(i)}
                  className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border ${i === index ? 'border-pink-500' : 'border-transparent'}`}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsFeed;
