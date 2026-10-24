import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download, ArrowUpRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavItem {
  name: string;
  href: string;
  number: string;
}

const navItems: NavItem[] = [
  { name: 'Experience', href: '#experience', number: '01' },
  { name: 'Projects', href: '#projects', number: '02' },
  { name: 'Research', href: '#research', number: '03' },
  { name: 'Skills', href: '#skills', number: '04' },
  { name: 'Education', href: '#education', number: '05' },
  { name: 'Contact', href: '#contact', number: '06' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Active section detection
      const sectionIds = ['hero', 'stats', 'experience', 'projects', 'research', 'skills', 'education', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
          isScrolled ? 'py-3 sm:py-4 px-4' : 'py-5 sm:py-6 px-4 sm:px-8 bg-transparent'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? 'bg-[#141310]/85 dark:bg-[#141310]/85 light:bg-[#ffffff]/90 backdrop-blur-md px-5 py-2.5 rounded-full hairline-all shadow-xl max-w-5xl'
              : ''
          }`}
        >
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] rounded-lg px-1"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] transition-transform group-hover:scale-125" />
            <span className="font-serif text-xl sm:text-2xl font-normal text-[#f2efe8] light:text-[#141311] tracking-tight">
              Kasak<span className="text-[#ff6a2b]">.</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-[#9a968d] light:text-[#6b665c] tracking-widest uppercase ml-1">
              / CAG AUDIT
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#ff6a2b] bg-[#ff6a2b]/10 font-medium'
                      : 'text-[#9a968d] light:text-[#6b665c] hover:text-[#f2efe8] light:hover:text-[#141311]'
                  }`}
                >
                  <span className="text-[10px] opacity-60">{item.number}</span>
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Icons: Theme Toggle, Resume & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full hairline-all bg-[#1b1915] light:bg-[#f0ede6] flex items-center justify-center text-[#9a968d] hover:text-[#ff6a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-[#ff6a2b]" />
              ) : (
                <Moon size={16} className="text-[#141311]" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href="/Kasak_Resume.pdf"
              download="Kasak_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full hairline-all bg-[#1b1915] light:bg-[#f0ede6] hover:border-[#ff6a2b] text-[#f2efe8] light:text-[#141311] font-mono text-xs uppercase tracking-wider transition-all"
            >
              <Download size={12} className="text-[#ff6a2b]" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full hairline-all bg-[#1b1915] light:bg-[#f0ede6] flex items-center justify-center text-[#f2efe8] light:text-[#141311] hover:text-[#ff6a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-40 bg-[#0e0d0b] text-[#f2efe8] flex flex-col justify-between p-6 pt-24 sm:p-10 animate-fade-in lg:hidden"
        >
          <div className="space-y-6">
            <div className="mono-label text-[#ff6a2b] mb-4">
              INDEX / NAVIGATION
            </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline justify-between py-2 border-b border-[#24221e] group"
                >
                  <span className="font-serif text-3xl sm:text-4xl text-[#f2efe8] group-hover:text-[#ff6a2b] transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-[#9a968d]">
                    {item.number} →
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#24221e] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9a968d]">PORTFOLIO THEME</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hairline-all text-xs font-mono"
              >
                {theme === 'dark' ? <Sun size={14} className="text-[#ff6a2b]" /> : <Moon size={14} />}
                <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>
            </div>

            <a
              href="/Kasak_Resume.pdf"
              download="Kasak_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-[#ff6a2b] text-white flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider"
            >
              <Download size={14} />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;