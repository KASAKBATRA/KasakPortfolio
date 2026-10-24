import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* 1. Hero with Positioning & 4 Stat Cards */}
      <Hero />

      {/* 2. Sections in required order: */}
      {/* Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

      {/* Research & Publications */}
      <Research />

      {/* Skills */}
      <Skills />

      {/* Education & Certificates */}
      <Education />

      {/* Contact */}
      <Contact />
    </div>
  );
};

export default HomePage;
