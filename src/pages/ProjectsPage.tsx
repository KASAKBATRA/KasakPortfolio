import React from 'react';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h1 className="font-display text-5xl font-bold text-white mb-4">My Projects</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            Explore my work in AI, Data Science, and Machine Learning
          </p>
        </div>
      </div>
      <Projects />
    </div>
  );
};

export default ProjectsPage;