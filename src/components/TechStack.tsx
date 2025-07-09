import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaGitAlt, FaJava, FaPython, FaTools, FaRobot,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPostgresql,
  SiMongodb, SiDocker, SiCplusplus, SiGraphql, SiAuth0,
  SiSupabase, SiSalesforce, SiMysql, SiOracle, SiSqlite,
  SiJupyter, SiPostman, SiTailwindcss, SiNextdotjs, SiVite
} from 'react-icons/si';

interface TechStackItem {
  name: string;
  category: string;
  icon: () => JSX.Element;
  proficiency: number;
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
  { name: 'React', category: 'Frontend', icon: () => <FaReact size={48} className="text-cyan-400 mb-3" />, proficiency: 90 },
  { name: 'TypeScript', category: 'Frontend', icon: () => <SiTypescript size={48} className="text-blue-400 mb-3" />, proficiency: 85 },
  { name: 'JavaScript', category: 'Frontend', icon: () => <SiJavascript size={48} className="text-yellow-400 mb-3" />, proficiency: 95 },
  { name: 'Next.js', category: 'Frontend', icon: () => <SiNextdotjs size={48} className="text-white mb-3" />, proficiency: 80 },
  { name: 'Tailwind CSS', category: 'Frontend', icon: () => <SiTailwindcss size={48} className="text-cyan-400 mb-3" />, proficiency: 90 },
  { name: 'Vite', category: 'Frontend', icon: () => <SiVite size={48} className="text-purple-400 mb-3" />, proficiency: 75 },

  // Backend
  { name: 'Node.js', category: 'Backend', icon: () => <FaNodeJs size={48} className="text-green-400 mb-3" />, proficiency: 85 },
  { name: 'Python', category: 'Backend', icon: () => <FaPython size={48} className="text-blue-400 mb-3" />, proficiency: 80 },
  { name: 'Java', category: 'Backend', icon: () => <FaJava size={48} className="text-red-400 mb-3" />, proficiency: 75 },
  { name: 'GraphQL', category: 'Backend', icon: () => <SiGraphql size={48} className="text-pink-400 mb-3" />, proficiency: 70 },

  // Database
  { name: 'PostgreSQL', category: 'Database', icon: () => <SiPostgresql size={48} className="text-blue-400 mb-3" />, proficiency: 80 },
  { name: 'MongoDB', category: 'Database', icon: () => <SiMongodb size={48} className="text-green-400 mb-3" />, proficiency: 85 },
  { name: 'Supabase', category: 'Database', icon: () => <SiSupabase size={48} className="text-green-400 mb-3" />, proficiency: 75 },

  // DevOps
  { name: 'Git', category: 'DevOps', icon: () => <FaGitAlt size={48} className="text-orange-400 mb-3" />, proficiency: 90 },
  { name: 'Docker', category: 'DevOps', icon: () => <SiDocker size={48} className="text-blue-400 mb-3" />, proficiency: 70 },

  // AI Tools
  { name: 'GitHub Copilot', category: 'AI Tools', icon: () => <FaRobot size={48} className="text-purple-400 mb-3" />, proficiency: 85 },
  { name: 'ChatGPT', category: 'AI Tools', icon: () => <FaRobot size={48} className="text-green-400 mb-3" />, proficiency: 90 },
  { name: 'Claude', category: 'AI Tools', icon: () => <FaRobot size={48} className="text-orange-400 mb-3" />, proficiency: 85 },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'AI Tools'];

const TechStack = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('All');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const filteredStack = useMemo(() => {
    return activeCategory === 'All'
      ? techStackData
      : techStackData.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="techstack" className="py-24 px-6 bg-gray-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900"></div>
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y }}>
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tech <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Stack</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-0'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600/30'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <div className="relative min-h-[500px] flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center max-w-6xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative bg-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-500 shadow-xl">
                    <div className="flex flex-col items-center">
                      <div className="group-hover:scale-110 transition-transform duration-300 mb-2">
                        {tech.icon()}
                      </div>
                      <span className="text-gray-200 text-center text-sm font-medium group-hover:text-white transition-colors mb-3">
                        {tech.name}
                      </span>
                      
                      {/* Proficiency bar */}
                      <div className="w-full bg-gray-600/50 rounded-full h-1.5 mb-1">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{tech.proficiency}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
