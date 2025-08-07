import React from 'react';
import { Github, Linkedin, Mail, Download, BarChart3, Brain, Database, TrendingUp, Cpu, Network, LineChart, Bot, Activity, PieChart } from 'lucide-react';

const Hero = () => {
  // Reduced AI & Data Science themed floating elements for cleaner look
  const aiDataElements = [
    { icon: Brain, delay: '0s', duration: '8s', position: { left: '8%', top: '15%' }, size: 40 },
    { icon: BarChart3, delay: '1s', duration: '6s', position: { left: '85%', top: '25%' }, size: 36 },
    { icon: Database, delay: '2s', duration: '7s', position: { left: '12%', top: '75%' }, size: 32 },
    { icon: TrendingUp, delay: '3s', duration: '9s', position: { left: '88%', top: '70%' }, size: 28 },
    { icon: Bot, delay: '3.5s', duration: '7s', position: { left: '20%', top: '25%' }, size: 34 },
  ];

  // Reduced data visualization particles
  const dataParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6,
  }));

  return (
    <section id="home" className="py-20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Simplified background */}
      <div className="absolute inset-0">
        {/* Reduced data visualization particles */}
        {dataParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-float"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left + '%',
              top: particle.top + '%',
              animationDelay: particle.delay + 's',
              animationDuration: particle.duration + 's',
            }}
          />
        ))}
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
      </div>

      {/* Reduced AI & Data Science floating icons */}
      {aiDataElements.map((Element, index) => (
        <div
          key={index}
          className="absolute opacity-15 text-primary-400 animate-bounce-slow hover:opacity-30 transition-all duration-500"
          style={{
            left: Element.position.left,
            top: Element.position.top,
            animationDelay: Element.delay,
            animationDuration: Element.duration,
          }}
        >
          <Element.icon size={Element.size} className="drop-shadow-lg" />
        </div>
      ))}

      {/* Main content with profile picture */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Picture Column */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative">
              <div className="relative">
                <img 
                  src="/kasak-removebg-preview.png" 
                  alt="Kasak Profile" 
                  className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-4 border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-400/20 to-accent-400/20 animate-pulse-glow"></div>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="order-1 lg:order-2 text-center lg:text-left animate-fade-in-up animation-delay-200">
            {/* Clean, focused title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-600 bg-clip-text text-transparent">
                Kasak
              </span>
            </h1>
            
            {/* Clear subtitle */}
            <p className="font-display text-xl sm:text-2xl lg:text-3xl text-slate-200 animate-fade-in-up animation-delay-300 font-medium mb-4">
              AI & Data Science Enthusiast
            </p>
            
            <p className="font-display text-lg sm:text-xl text-primary-400 animate-fade-in-up animation-delay-400 font-semibold mb-6">
              Turning Data into Decisions
            </p>
            
            {/* Simple quote */}
            <div className="mb-8 animate-fade-in-up animation-delay-500">
              <p className="text-base sm:text-lg text-slate-300 max-w-xl lg:max-w-none italic leading-relaxed">
                "Data has a voice - I just help it speak louder, clearer, and smarter."
              </p>
            </div>

            {/* Clean action buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up animation-delay-600">
              <a 
                href="https://drive.google.com/drive/folders/1AzPBkq6D4piA5sCly7odkmMOhpYQDNzi?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <Download size={18} />
                Download Resume
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
              
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border-2 border-primary-400 text-primary-400 px-6 py-3 rounded-xl font-semibold hover:bg-primary-400 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block ml-2">→</span>
              </button>
            </div>

            {/* Clean social links */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 animate-fade-in-up animation-delay-700">
              {[
                { href: "https://www.linkedin.com/in/kasak-batra/", icon: Linkedin, color: "blue" },
                { href: "https://github.com/KASAKBATRA", icon: Github, color: "gray" },
                { href: "mailto:arorakasak2005@gmail.com", icon: Mail, color: "green" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transform hover:scale-110 transition-all duration-300 p-2 rounded-lg hover:bg-slate-800/30"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;