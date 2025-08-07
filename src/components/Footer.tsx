import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 py-16 border-t border-slate-700/30 relative">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500/3 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-500/3 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4">
              Kasak Batra
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              AI & Data Science enthusiast passionate about turning data into decisions 
              and building intelligent solutions for tomorrow's challenges.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/kasak-batra/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-lg hover:border-primary-500/50 transition-all duration-300 hover-lift-glow group"
              >
                <Linkedin className="text-primary-400 group-hover:text-primary-300" size={20} />
              </a>
              <a 
                href="https://github.com/KASAKBATRA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-lg hover:border-gray-500/50 transition-all duration-300 hover-lift-glow group"
              >
                <Github className="text-gray-400 group-hover:text-gray-300" size={20} />
              </a>
              <a 
                href="mailto:arorakasak2005@gmail.com"
                className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-lg hover:border-green-500/50 transition-all duration-300 hover-lift-glow group"
              >
                <Mail className="text-green-400 group-hover:text-green-300" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/experience', label: 'Experience' },
                { to: '/skills', label: 'Skills' },
                { to: '/projects', label: 'Projects' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  if (window.location.pathname === '/') {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="block text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">
                <span className="text-slate-300">Email:</span><br />
                arorakasak2005@gmail.com
              </p>
              <p className="text-slate-400">
                <span className="text-slate-300">Location:</span><br />
                Delhi, India
              </p>
              <p className="text-slate-400">
                <span className="text-slate-300">Available for:</span><br />
                AI/ML Projects, Data Analytics, Research Collaboration
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 Kasak Batra. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <p className="text-slate-400 text-sm flex items-center">
              Made with <Heart className="text-red-400 mx-1 animate-pulse-glow" size={14} /> using React & Tailwind CSS
            </p>
            
            <button
              onClick={scrollToTop}
              className="bg-slate-800/50 border border-slate-700/50 p-2 rounded-lg hover:border-primary-500/50 transition-all duration-300 hover-lift-glow group"
            >
              <ArrowUp className="text-primary-400 group-hover:text-primary-300" size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;