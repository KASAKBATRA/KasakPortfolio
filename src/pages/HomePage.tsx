import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Achievements from '../components/Achievements';

const HomePage = () => {
  return (
    <div className="bg-slate-900 pt-16">
      <Hero />
      {/* Achievements / social-style cards */}
      <Achievements
        items={[
          {
            id: 1,
            highlight: 'Image to Pencil Recognition Using ML & OpenCV',
            images: ['/ach1.jpeg'],
            caption: 'Published research paper at NCBISF-24 detailing methods for converting images to pencil sketches using OpenCV and ML.',
            tags: ['Research', 'OpenCV', 'Paper']
          },
          {
            id: 2,
            highlight: 'Data Science Techniques For Next Generation Cities',
            images: ['/ach2.png'],
            caption: 'Published in IJPREMS Journal — explored data-driven approaches for smart city planning and analytics.',
            tags: ['Publication', 'Data Science', 'Smart Cities']
          },
          {
            id: 3,
            highlight: 'Graphics Head — National Service Scheme (NSS)',
            images: ['/ach3.jpg'],
            caption: 'Led a team of 20 as Graphics Head at NSS; increased event engagement by 75% through improved visuals and outreach.',
            tags: ['Leadership', 'Design', 'NSS']
          },
          {
            id: 4,
            highlight: 'Organized Tech Events: TechQuest & Code Breaker',
            images: ['/ach4.jpeg'],
            caption: 'Organized multiple tech events including "TechQuest: Decode & Dominate" and "Code Breaker Challenge" for college students.',
            tags: ['Organizer', 'Events', 'Competition']
          }
          ,{
            id: 5,
            highlight: 'Mentor at Code Veda Hackathon (Microsoft) — The Geek Room ADGIPS',
            images: ['/ach5-1.jpg', '/ach5-2.jpeg'],
            caption: 'Mentored 15+ teams at Code Veda Hackathon; 5 teams advanced to the Top 16 (Finals). Proud to have supported their growth.',
            tags: ['Mentorship', 'Hackathon', 'Microsoft']
          }
          ,{
            id: 6,
            highlight: '📘 Author of “Hello AI: A Friendly Introduction to Machine Learning” — Published by Eliva Press',
            images: ['/Photo1.jpg', '/Photo2.jpg'],
            caption: `Published my debut book “Hello AI: A Friendly Introduction to Machine Learning” a beginner-friendly guide designed to simplify AI and ML concepts through practical insights and clear explanations. This journey started with a small thought and turned into months of research, writing, and persistence. Despite challenges and pauses along the way, I completed it with passion and faith. Later, I received an unexpected email from Eliva Press inviting me to publish my work a moment that reignited my purpose and made this dream a reality. The book reflects my belief that even complex technologies can be understood with curiosity and heart. Today, seeing it officially published and available worldwide is one of the most fulfilling moments of my journey as a learner, creator, and now an author. Published Links: 
            Eliva Bookstore: https://elivabooks.com/en/book/book-2784504513  
            Amazon: https://www.amazon.com/dp/9999331718`,
            tags: ['Author', 'AI', 'Machine Learning', 'Eliva Press', 'Publication', 'Achievement']
          }
        ]}
      />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default HomePage;
