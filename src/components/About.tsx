import React from 'react';
import { User, Heart, Target, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-800 relative">
      {/* Simplified background */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-64 h-64 bg-primary-500/3 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="group bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:border-primary-500/50 transition-all duration-300 animate-fade-in-up hover-lift-glow">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-500/20 p-3 rounded-lg group-hover:bg-primary-500/30 transition-colors duration-300">
                  <User className="text-primary-400" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">Who I Am</h3>
                  <p className="text-slate-300 leading-relaxed">
                    I'm Kasak, an AI & Data Science enthusiast who thrives on curiosity, logic, and the drive to build intelligent solutions. I enjoy transforming raw data into actionable insights and creating AI-powered systems that solve meaningful problems.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:border-accent-500/50 transition-all duration-300 animate-fade-in-up animation-delay-200 hover-lift-glow">
              <div className="flex items-start space-x-4">
                <div className="bg-accent-500/20 p-3 rounded-lg group-hover:bg-accent-500/30 transition-colors duration-300">
                  <Heart className="text-accent-400" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300">What I Love</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Diving deep into data patterns, training models, visualizing insights, and bringing AI concepts to life. I'm passionate about blending technical depth with creativity — whether it's through dashboards, machine learning, or automation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="group bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 animate-fade-in-up animation-delay-400 hover-lift-glow">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Target className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">My Goal</h3>
                  <p className="text-slate-300 leading-relaxed">
                    To grow as a data-driven problem solver, contribute to impactful AI projects, and help organizations make smarter decisions through innovation, precision, and responsible use of technology.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:border-orange-500/50 transition-all duration-300 animate-fade-in-up animation-delay-600 hover-lift-glow">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors duration-300">
                  <Zap className="text-orange-400" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">My Approach</h3>
                  <p className="text-slate-300 leading-relaxed">
                    I believe in clean, ethical, and efficient AI. I focus on clarity, continuous learning, and aligning intelligent systems with human needs. I follow best practices and stay in sync with evolving tools and trends in AI and data science.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in-up animation-delay-800">
          <div className="bg-gradient-to-r from-primary-500/5 to-accent-500/5 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/30 hover-lift-glow">
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto italic">
              "AI isn't here to replace us — it's here to reveal the best in us. In a world where machines learn patterns, it's our imagination, values, and curiosity that shape the future. The real power of AI lies not in its intelligence, but in the intentions of the human heart behind it."
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary-400"></div>
              <div className="text-primary-400 font-semibold">Kasak</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;