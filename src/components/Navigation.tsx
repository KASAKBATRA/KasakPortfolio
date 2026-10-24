import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('experience');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['experience', 'projects', 'research', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#research', label: 'Research & Publications' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education & Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav 
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/60' 
            : 'bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
              aria-label="Kasak Home"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
                <User className="text-white" size={18} aria-hidden="true" />
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Kasak
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      isActive 
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="ml-4 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-md hover:shadow-cyan-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Get in Touch
              </a>
            </div>
            
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-900/98 border-b border-slate-700/60 px-4 pt-2 pb-6 space-y-2 shadow-2xl backdrop-blur-xl animate-fade-in-up">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-cyan-400 bg-cyan-500/15 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block text-center w-full px-4 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;