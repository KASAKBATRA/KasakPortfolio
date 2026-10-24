import React, { useState } from 'react';
import AuditUniverseCanvas from '../components/ThreeCanvas/AuditUniverseCanvas';
import Hero from '../components/Hero';
import StatsBento from '../components/StatsBento';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  const [, setStageInfo] = useState({ progress: 0, stageName: '00 // CHAOS' });

  return (
    <div className="relative min-h-screen">
      {/* Fixed Full-Screen 3D WebGL Narrative Canvas (Stage 0 to Stage 1) */}
      <AuditUniverseCanvas
        onProgressChange={(progress, stageName) => {
          setStageInfo({ progress, stageName });
        }}
      />

      {/* Real HTML Content Overlaid on the 3D Canvas */}
      <div className="relative z-10">
        {/* 1. Hero with headline, chaotic particle background, and audit analytics demo */}
        <Hero />

        {/* 2. Key Milestones & Stats Bento Grid */}
        <StatsBento />

        {/* 3. Stage 1: Experience & Remote Audit with ordered matrix and collapsed duplicates */}
        <Experience />

        {/* 4. Projects (Reserved for Stage 2) */}
        <Projects />

        {/* 5. Research & Publications */}
        <Research />

        {/* 6. Skills */}
        <Skills />

        {/* 7. Education & Certificates */}
        <Education />

        {/* 8. Contact */}
        <Contact />
      </div>
    </div>
  );
};

export default HomePage;
