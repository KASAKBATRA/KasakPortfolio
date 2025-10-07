import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import CampusHirePage from './pages/CampusHirePage';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
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
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/campushire" element={<CampusHirePage />} />
        </Routes>
  <Footer />
  <AIAssistant />
        
  {/* Floating Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </Router>
  );
}

export default App;