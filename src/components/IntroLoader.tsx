import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if reduced motion or already seen in this session
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('kasak_intro_seen');

    if (prefersReducedMotion || seen) {
      onComplete();
      return;
    }

    setShouldRender(true);

    // Fade out after 900ms, completely remove after 1200ms
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 850);

    const completeTimer = setTimeout(() => {
      sessionStorage.setItem('kasak_intro_seen', 'true');
      setShouldRender(false);
      onComplete();
    }, 1150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        sessionStorage.setItem('kasak_intro_seen', 'true');
        setShouldRender(false);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-label="Site introduction"
      onClick={() => {
        sessionStorage.setItem('kasak_intro_seen', 'true');
        setShouldRender(false);
        onComplete();
      }}
      className={`fixed inset-0 z-[99999] bg-[#0e0d0b] text-[#f2efe8] flex flex-col items-center justify-center cursor-pointer select-none transition-opacity duration-300 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6 space-y-4">
        <div className="font-mono text-xs text-[#ff6a2b] tracking-[0.25em] uppercase">
          00 / INITIALIZING DOSSIER
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#f2efe8]">
          Kasak Batra
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#9a968d] tracking-widest uppercase">
          Artificial Intelligence · Data Analytics · CAG Audit
        </p>
        <div className="w-16 h-[2px] bg-[#ff6a2b] mx-auto mt-6" />
      </div>
    </div>
  );
};

export default IntroLoader;
