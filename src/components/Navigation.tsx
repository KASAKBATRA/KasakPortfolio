import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Home, Briefcase, Code, FolderOpen, Mail } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/experience', label: 'Experience', icon: Briefcase },
    { href: '/skills', label: 'Skills', icon: Code },
    { href: '/projects', label: 'Projects', icon: FolderOpen },
  ];

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#contact';
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
        : 'bg-slate-900/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <User className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold font-display bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Kasak
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.href 
                      ? 'text-primary-400 bg-primary-500/10 border border-primary-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <ItemIcon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Desktop Contact Button */}
            <button
              onClick={scrollToContact}
              className="group flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail size={18} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Contact</span>
            </button>
          </div>
          
          {/* Menu Button (All Screens) */}
          <button
            className="lg:hidden text-slate-300 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 hover:scale-110 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={24} className="transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="transform rotate-0 transition-transform duration-300 group-hover:rotate-180" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Full Screen Overlay Menu */}
        <div className={`fixed inset-0 z-50 transition-all duration-500 ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        } lg:hidden`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900 backdrop-blur-xl"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center space-y-6 animate-fade-in-up max-w-md mx-auto">
              {/* Navigation Items */}
              <div className="space-y-4">
                {navItems.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center justify-center space-x-4 px-8 py-4 rounded-2xl transition-all duration-300 hover-lift-glow ${
                        location.pathname === item.href 
                          ? 'text-primary-400 bg-primary-500/10 border border-primary-500/30' 
                          : 'text-slate-300 hover:text-white glass-morphism'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ItemIcon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xl sm:text-2xl font-display font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Contact Button */}
                <button
                  onClick={scrollToContact}
                  className="group flex items-center justify-center space-x-4 px-8 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up"
                  style={{ animationDelay: `${navItems.length * 100}ms` }}
                >
                  <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xl sm:text-2xl font-display font-semibold">Contact</span>
                </button>
              </div>
              
              {/* Close hint */}
              <p className="text-slate-500 text-xs sm:text-sm animate-fade-in-up" style={{ animationDelay: `${(navItems.length + 1) * 100}ms` }}>
                Click anywhere to close
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;