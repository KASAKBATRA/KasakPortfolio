import React from 'react';
import Hero from '../components/Hero';
import StatsBento from '../components/StatsBento';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      {/* 1. Hero with headline, live audit engine, and tool marquee */}
      <Hero />

      {/* 2. Key Milestones & Stats Bento Grid */}
      <StatsBento />

      {/* 3. Sections in strict required sequence: */}
      {/* 01 / Experience */}
      <Experience />

      {/* 02 / Projects */}
      <Projects />

      {/* 03 / Research & Publications */}
      <Research />

      {/* 04 / Skills */}
      <Skills />

      {/* 05 / Education & Certificates */}
      <Education />

      {/* 06 / Contact */}
      <Contact />
    </div>
  );
};

export default HomePage;
