import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CustomCursor from './components/CustomCursor';
import IntroLoader from './components/IntroLoader';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-ink)] selection:bg-[#ff6a2b] selection:text-white transition-colors duration-300">
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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;