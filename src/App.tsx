import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-cyan-500 selection:text-white">
        {/* Sticky Navbar linking to each section */}
        <Navigation />

        <main id="main-content">
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
        
        {/* Accessible Floating Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`back-to-top ${showBackToTop ? 'visible' : ''} focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          aria-label="Scroll back to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      </div>
    </Router>
  );
}

export default App;