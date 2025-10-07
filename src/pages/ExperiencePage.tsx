import Experience from '../components/Experience';
import AchievementsFeed from '../components/Achievements';

const sampleAchievements = [
  {
    id: 1,
    images: ['/ach1.jpeg'],
    caption: 'Built CampusHire Analytics — placement management with verification flows.',
    highlight: 'CampusHire Analytics',
    date: '2025-08-01',
    tags: ['Placement', 'Verification']
  },
  {
    id: 2,
    images: ['/ach3.jpg'],
    caption: 'Presented Image to Pencil Sketch at NCBISF-24 conference.',
    highlight: 'Image to Pencil Sketch (NCBISF-24)',
    date: '2024-12-01',
    tags: ['OpenCV', 'ML']
  },
  {
    id: 3,
    images: ['/ach2.png'],
    caption: 'EmotionsMemoria — an AI memory creator I built and deployed.',
    highlight: 'EmotionsMemoria',
    date: '2025-06-15',
    tags: ['AI', 'Web']
  }
];

const ExperiencePage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Experience & Education</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            My professional journey, educational background, and key achievements
          </p>
        </div>
      </div>
      <Experience />
      {/* Chapters of Impact under Experience & Education */}
      <div className="mt-12">
        <AchievementsFeed items={sampleAchievements} />
      </div>
    </div>
  );
};

export default ExperiencePage;