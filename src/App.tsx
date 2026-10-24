import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CustomCursor from './components/CustomCursor';
import IntroLoader from './components/IntroLoader';
import AskKasakDrawer from './components/AskKasakDrawer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [, setIntroFinished] = useState(false);

  useEffect(() => {
    // Only arm animations if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      document.documentElement.classList.add('js-anim');
    }

    // Failsafe: after 3 seconds force opacity 1 and transform none on all reveal elements
    const failsafeTimer = setTimeout(() => {
      document.documentElement.classList.add('failsafe-revealed');
      const hiddenElements = document.querySelectorAll('.reveal-init, [data-reveal]');
      hiddenElements.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    }, 3000);

    return () => clearTimeout(failsafeTimer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] selection:bg-[#ff6a2b] selection:text-white transition-colors duration-300">
          {/* Subtle Film Grain Noise Layer */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Interactive Custom Cursor */}
          <CustomCursor />

          {/* Editorial Intro Splash (Session-checked & Skippable) */}
          <IntroLoader onComplete={() => setIntroFinished(true)} />

          {/* Sticky & Floating Blurred Pill Navigation */}
          <Navigation />

          <main id="main-content" className="focus:outline-none">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/experience" element={<Navigate to="/#experience" replace />} />
              <Route path="/projects" element={<Navigate to="/#projects" replace />} />
              <Route path="/research" element={<Navigate to="/#research" replace />} />
              <Route path="/skills" element={<Navigate to="/#skills" replace />} />
              <Route path="/education" element={<Navigate to="/#education" replace />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Floating Grounded AI Assistant Drawer */}
          <AskKasakDrawer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;