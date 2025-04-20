import { theme } from '../styles/theme';

const MobileProjectList = () => {
  return (
    <section id="projects" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 leading-tight"
        style={{ color: theme.colors.primary }}
      >
        Projects
      </h2>

      <div className="space-y-10">
        <ProjectCard
          accentColor="from-blue-500 to-purple-500"
          title="March Madness Prediction Web App"
          description="A data-driven NCAA bracket prediction tool built with modern web technologies and custom machine learning."
          sections={[
            {
              heading: '🔧 Tech Stack',
              items: [
                'Frontend: React.js (TypeScript)',
                'Backend: Flask API with Python',
                'ML Model: Trained on historical March Madness data (Kaggle)',
              ],
            },


            {
              heading: '📊 Features',
              items: [
                'Machine learning-based tournament prediction',
                'API endpoints for serving bracket logic',
                'Interactive bracket builder UI',
              ],
            },


            {
              heading: '🛠️ Future Plans',
              items: [
                'Visualize predictions with confidence levels',
                'Enable user-specific predictions and saving',
                'Deploy model with scalable cloud infrastructure',
              ],
            },
          ]}
          github="https://github.com/jtalented"
        />




        <ProjectCard
          accentColor="from-indigo-500 to-pink-500"
          title="Automated Video Compiler"
          description="A Python-powered pipeline that compiles daily trending video segments using social media APIs, editing libraries, and automation tools."
          sections={[
            {
              heading: '🛠 Technologies Used',
              items: [
                'Python for scripting the pipeline logic',
                'FFmpeg for stitching and trimming videos',
                'Pytube and Instagram Graph API for media extraction',
              ],
            },
            {
              heading: '💡 Features',
              items: [
                'Daily fetch and compile of trending video clips',
                'Overlay of intros/outros, transitions, and captions',
                'End-to-end automation: trigger, edit, export',
              ],
            },
            {
              heading: '📈 Use Case',
              items: [
                'Batch-creates video compilations for TikTok, Reels, Shorts',
                'Streamlines content curation for daily publishing',
              ],
            },
          ]}
          github="https://github.com/jtalented"
        />
      </div>
    </section>
  );
};




interface ProjectCardProps {
  title: string;
  description: string;
  sections: { heading: string; items: string[] }[];
  github: string;
  accentColor?: string;
}

const ProjectCard = ({
  title,
  description,
  sections,
  github,
  accentColor = 'from-blue-500 to-purple-500',
}: ProjectCardProps) => {
  return (
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-xl text-left">
      <h3
        className={`text-2xl font-bold mb-2 bg-gradient-to-r ${accentColor} text-transparent bg-clip-text leading-snug`}
      >
        {title}
      </h3>
      <p className="text-gray-300 mb-5">{description}</p>

      {sections.map((section, idx) => (
        <div key={idx} className="mb-4">
          <h4 className="text-md text-white font-semibold mb-1">{section.heading}</h4>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            {section.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="pt-4">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xs px-4 py-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all shadow-md"
        >
          🔗 View on GitHub
        </a>
      </div>
    </div>
  );
};

export default MobileProjectList;
