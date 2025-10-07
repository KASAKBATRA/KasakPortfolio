import React from 'react';

const CampusHirePage: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6 text-slate-200">
        <h1 className="text-4xl font-bold text-white mb-4">CampusHire Analytics — Smart Placement Management System</h1>
        <p className="text-slate-400 mb-6">AI-enabled placement management platform that streamlines student, recruiter, and T&amp;P interactions with verification-first workflows and analytics.</p>

  <img src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="CampusHire dashboard" className="w-full object-contain rounded-md mb-6 shadow-lg" />

        <h2 className="text-2xl font-semibold text-white mt-6">Problem</h2>
        <p className="text-slate-300 mt-3">College placement processes often rely on manual verification, repeated document uploads, opaque application status, and slow communication between students, companies and T&P cells. These problems cause delays and missed opportunities.</p>

        <h2 className="text-2xl font-semibold text-white mt-6">Solution</h2>
        <p className="text-slate-300 mt-3">CampusHire Analytics provides a role-based, verified ecosystem where T&P officers authenticate accounts, issue unique login codes, and both students and recruiters access verified profiles and real-time analytics. The system reduces manual workload, prevents fake accounts, and increases placement transparency.</p>

        <h2 className="text-2xl font-semibold text-white mt-6">Key Features</h2>
        <ul className="list-disc pl-6 text-slate-300 mt-3 space-y-2">
          <li>Role-based registration & profile management (students, companies, T&amp;P)</li>
          <li>T&amp;P verification and unique login code issuance</li>
          <li>Application tracking, analytics dashboards, and verified applicant access</li>
          <li>Secure data storage and audit-friendly workflows</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-6">Tech Stack</h2>
        <p className="text-slate-300 mt-3">Frontend: HTML/CSS/JavaScript (React-ready); Backend: PHP; Database: MySQL; Tools: EmailJS, Appwrite (optional)</p>

        <h2 className="text-2xl font-semibold text-white mt-6">Achievements</h2>
        <p className="text-slate-300 mt-3">Deployed demo for college placement cells; reduced verification workload by ~70%; showcased at academic exhibitions.</p>

        <h2 className="text-2xl font-semibold text-white mt-6">Future Scope</h2>
        <p className="text-slate-300 mt-3">AI resume screening, placement prediction models, real-time recruiter-student chat, and enhanced BI dashboards.</p>

        <div className="mt-8">
          <a href="https://github.com/KASAKBATRA/CampusHire_Analytics" target="_blank" rel="noreferrer" className="inline-block bg-pink-600 text-white px-4 py-2 rounded-md">View Source on GitHub</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <img src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Student profile" className="w-full object-contain rounded-md shadow-md" />
          <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Company posting" className="w-full object-contain rounded-md shadow-md" />
          <img src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Verification panel" className="w-full object-contain rounded-md shadow-md" />
          <img src="https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Analytics chart" className="w-full object-contain rounded-md shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default CampusHirePage;
