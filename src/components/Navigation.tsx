import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 60);

      // Active section detection
      const sectionIds = ['hero', 'stats', 'experience', 'projects', 'research', 'skills', 'education', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 180) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
              ? 'bg-white/95 dark:bg-[#141310]/95 backdrop-blur-md px-5 py-2.5 rounded-full hairline-all shadow-xl max-w-5xl'
              : ''
          }`}
        >
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] rounded-lg px-2 py-1"
          >
            <span className="font-serif text-2xl font-normal text-[var(--text-primary)] tracking-tight hover:text-[#ff6a2b] transition-colors">
              Kasak
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] ${
                    isActive
                      ? 'text-[#ff6a2b] bg-[#ff6a2b]/15 font-semibold relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#ff6a2b] after:rounded-full'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-mono">{item.number}</span>
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Icons: Theme Toggle, Solid Resume Button & Mobile Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Switcher Toggle - Highly visible with SVG icons */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full hairline-all bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:text-[#ff6a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] shadow-sm"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-[#ff854d] stroke-[2.2]" />
              ) : (
                <Moon size={18} className="text-[#141311] stroke-[2.2]" />
              )}
            </button>

            {/* ONE Solid "Download resume" button in the navbar */}
            <a
              href="/Kasak_Resume.pdf"
              download="Kasak_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md shadow-[#ff6a2b]/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6a2b]"
            >
              <Download size={13} className="stroke-[2.5]" />
              <span>Download resume</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full hairline-all bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:text-[#ff6a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} className="stroke-[2.2]" /> : <Menu size={20} className="stroke-[2.2]" />}
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
          className="fixed inset-0 z-40 bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between p-6 pt-24 sm:p-10 animate-fade-in lg:hidden overflow-y-auto"
        >
          <div className="space-y-6">
            <div className="mono-label text-[var(--accent-small)] mb-4 font-semibold">
              INDEX / NAVIGATION
            </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline justify-between py-2 border-b border-[var(--border-hairline)] group"
                >
                  <span className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] group-hover:text-[#ff6a2b] transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[#ff6a2b]">
                    {item.number} →
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[var(--border-hairline)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--text-muted)] font-medium">PORTFOLIO THEME</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full hairline-all bg-[var(--bg-surface-elevated)] text-xs font-mono font-medium text-[var(--text-primary)]"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={15} className="text-[#ff854d]" /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>
            </div>

            <a
              href="/Kasak_Resume.pdf"
              download="Kasak_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-[#ff6a2b] hover:bg-[#ff7e45] text-white flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold shadow-lg shadow-[#ff6a2b]/25"
            >
              <Download size={15} className="stroke-[2.5]" />
              <span>Download resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;