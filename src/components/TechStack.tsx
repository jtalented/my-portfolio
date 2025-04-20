import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaGitAlt, FaJava, FaPython, FaTools, FaRobot,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPostgresql,
  SiMongodb, SiDocker, SiCplusplus, SiGraphql, SiAuth0,
  SiSupabase, SiSalesforce, SiMysql, SiOracle, SiSqlite,
  SiJupyter, SiPostman
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

interface TechStackItem {
  name: string;
  category: string;
  icon: () => JSX.Element;
}

// Hook to detect if it's mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const techStackData: TechStackItem[] = [
  // Frontend
  { name: 'JavaScript', category: 'Frontend', icon: () => <SiJavascript size={56} color="#F7DF1E" className="mb-2" /> },
  { name: 'TypeScript', category: 'Frontend', icon: () => <SiTypescript size={56} color="#007ACC" className="mb-2" /> },
  { name: 'React', category: 'Frontend', icon: () => <FaReact size={56} color="#61DAFB" className="mb-2" /> },
  { name: 'Next.js', category: 'Frontend', icon: () => <FaTools size={56} color="#ffffff" className="mb-2" /> },
  { name: 'HTML5', category: 'Frontend', icon: () => <SiHtml5 size={56} color="#E34F26" className="mb-2" /> },
  { name: 'CSS3', category: 'Frontend', icon: () => <SiCss3 size={56} color="#1572B6" className="mb-2" /> },

  // Backend
  { name: 'Node.js', category: 'Backend', icon: () => <FaNodeJs size={56} color="#339933" className="mb-2" /> },
  { name: 'Flask', category: 'Backend', icon: () => <FaPython size={56} color="#3776AB" className="mb-2" /> },
  { name: 'Java', category: 'Backend', icon: () => <FaJava size={56} color="#007396" className="mb-2" /> },
  { name: 'Python', category: 'Backend', icon: () => <FaPython size={56} color="#3776AB" className="mb-2" /> },
  { name: 'C++', category: 'Backend', icon: () => <SiCplusplus size={56} color="#00599C" className="mb-2" /> },
  { name: 'GraphQL', category: 'Backend', icon: () => <SiGraphql size={56} color="#E10098" className="mb-2" /> },
  { name: 'Auth0', category: 'Backend', icon: () => <SiAuth0 size={56} color="#EB5424" className="mb-2" /> },

  // Databases
  { name: 'PostgreSQL', category: 'Database', icon: () => <SiPostgresql size={56} color="#336791" className="mb-2" /> },
  { name: 'MongoDB', category: 'Database', icon: () => <SiMongodb size={56} color="#47A248" className="mb-2" /> },
  { name: 'Supabase', category: 'Database', icon: () => <SiSupabase size={56} color="#3ECF8E" className="mb-2" /> },
  { name: 'MySQL', category: 'Database', icon: () => <SiMysql size={56} color="#4479A1" className="mb-2" /> },
  { name: 'SQLite', category: 'Database', icon: () => <SiSqlite size={56} color="#003B57" className="mb-2" /> },
  { name: 'Oracle', category: 'Database', icon: () => <SiOracle size={56} color="#F80000" className="mb-2" /> },

  // DevOps
  { name: 'Git', category: 'DevOps', icon: () => <FaGitAlt size={56} color="#F05032" className="mb-2" /> },
  { name: 'Docker', category: 'DevOps', icon: () => <SiDocker size={56} color="#2496ED" className="mb-2" /> },
  { name: 'Bash', category: 'DevOps', icon: () => <FaTools size={56} color="#888888" className="mb-2" /> },
  { name: 'PowerShell', category: 'DevOps', icon: () => <FaTools size={56} color="#5391FE" className="mb-2" /> },

  // ETL / Integrations
  { name: 'Informatica', category: 'ETL', icon: () => <FaTools size={56} color="#F46F30" className="mb-2" /> },
  { name: 'Boomi', category: 'ETL', icon: () => <FaTools size={56} color="#00B7C3" className="mb-2" /> },
  { name: 'Salesforce', category: 'ETL', icon: () => <SiSalesforce size={56} color="#00A1E0" className="mb-2" /> },
  { name: 'Workday', category: 'ETL', icon: () => <FaTools size={56} color="#F7B100" className="mb-2" /> },
  { name: 'Netsuite', category: 'ETL', icon: () => <FaTools size={56} color="#123456" className="mb-2" /> },
  { name: 'Dremio', category: 'ETL', icon: () => <FaTools size={56} color="#3399FF" className="mb-2" /> },

  // Tools / Other
  { name: 'Visual Basic', category: 'Tools', icon: () => <FaTools size={56} color="#5C2D91" className="mb-2" /> },
  { name: 'Postman', category: 'Tools', icon: () => <SiPostman size={56} color="#FF6C37" className="mb-2" /> },
  { name: 'Jupyter Notebooks', category: 'Tools', icon: () => <SiJupyter size={56} color="#F37726" className="mb-2" /> },

  // AI Tools
  { name: 'GitHub Copilot', category: 'AI Tools', icon: () => <FaRobot size={56} color="#6f42c1" className="mb-2" /> },
  { name: 'ChatGPT', category: 'AI Tools', icon: () => <FaRobot size={56} color="#10a37f" className="mb-2" /> },
  { name: 'Gemini', category: 'AI Tools', icon: () => <FaRobot size={56} color="#34a0ff" className="mb-2" /> },
  { name: 'Claude', category: 'AI Tools', icon: () => <FaRobot size={56} color="#f97316" className="mb-2" /> },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'ETL', 'Tools', 'AI Tools'];

const TechStack = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredStack = useMemo(() => {
    return activeCategory === 'All'
      ? techStackData
      : techStackData.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  const visibleLimit = isMobile ? 12 : 36;
  const visibleStack = showAll ? filteredStack : filteredStack.slice(0, visibleLimit);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.section
      id="techstack"
      className="py-24 px-4 sm:px-6 lg:px-8 mt-32"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center" style={{ color: theme.colors.primary }}>
        {t('Tech Stack')}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setShowAll(false);
            }}
            className={`px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
              activeCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="relative min-h-[520px] transition-all duration-500 ease-in-out flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + String(showAll)}
            className={`grid gap-6 sm:gap-8 justify-items-center ${
              visibleStack.length <= 2
                ? 'grid-cols-2'
                : visibleStack.length <= 4
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
            }`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {visibleStack.map((tech) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
                variants={itemVariants}
              >
                {tech.icon()}
                <span className="text-gray-300 text-center text-sm sm:text-base">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Show More */}
      {filteredStack.length > visibleLimit && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold transition hover:from-blue-600 hover:to-purple-600"
          >
            Show More
          </button>
        </div>
      )}
    </motion.section>
  );
};

export default TechStack;
