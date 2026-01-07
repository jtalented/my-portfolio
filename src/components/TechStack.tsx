import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaGitAlt, FaJava, FaPython, FaTools, FaRobot, FaAws, FaStripe, FaPowerOff, FaDatabase, FaNetworkWired, FaKey, FaCogs, FaEnvelope, FaTerminal
} from 'react-icons/fa';
import {
  SiSwagger, SiOpenapiinitiative, SiWorkplace, SiInformatica, SiOracle, SiMysql, SiPostgresql, SiMongodb, SiSqlite, SiSupabase, SiSalesforce, SiJupyter, SiPostman, SiTailwindcss, SiNextdotjs, SiVite, SiExpress, SiGraphql, SiAuth0, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiCplusplus
} from 'react-icons/si';

const techStack = {
  'Frontend': [
    { name: 'JavaScript', icon: () => <SiJavascript className="text-yellow-400 text-4xl sm:text-5xl" />, proficiency: 92 },
    { name: 'TypeScript', icon: () => <SiTypescript className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 90 },
    { name: 'React', icon: () => <FaReact className="text-cyan-400 text-4xl sm:text-5xl" />, proficiency: 95 },
    { name: 'Next.js', icon: () => <SiNextdotjs className="text-white text-4xl sm:text-5xl" />, proficiency: 85 },
    { name: 'Tailwind CSS', icon: () => <SiTailwindcss className="text-cyan-400 text-4xl sm:text-5xl" />, proficiency: 95 },
    { name: 'HTML5', icon: () => <SiHtml5 className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 98 },
    { name: 'CSS3', icon: () => <SiCss3 className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 90 },
  ],
  'Backend': [
    { name: 'Node.js', icon: () => <FaNodeJs className="text-green-400 text-4xl sm:text-5xl" />, proficiency: 88 },
    { name: 'Flask', icon: () => <FaPython className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'Java', icon: () => <FaJava className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 85 },
    { name: 'Python', icon: () => <FaPython className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'C++', icon: () => <SiCplusplus className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Visual Basic', icon: () => <FaTools className="text-purple-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'SQL', icon: () => <FaDatabase className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'GraphQL', icon: () => <SiGraphql className="text-pink-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'Auth0', icon: () => <SiAuth0 className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 75 },
  ],
  'Databases': [
    { name: 'Postgres', icon: () => <SiPostgresql className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Oracle', icon: () => <SiOracle className="text-red-400 text-4xl sm:text-5xl" />, proficiency: 65 },
    { name: 'MySQL', icon: () => <SiMysql className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'MongoDB', icon: () => <SiMongodb className="text-green-500 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'SQLite', icon: () => <SiSqlite className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'Supabase', icon: () => <SiSupabase className="text-green-400 text-4xl sm:text-5xl" />, proficiency: 70 },
  ],
  'Frameworks & Tools': [
    { name: 'Docker', icon: () => <FaTools className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Git', icon: () => <FaGitAlt className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 90 },
    { name: 'Jupyter Notebooks', icon: () => <SiJupyter className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Postman', icon: () => <SiPostman className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 85 },
    { name: 'NPM', icon: () => <FaTools className="text-green-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'PIP', icon: () => <FaTools className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'Vite', icon: () => <SiVite className="text-purple-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'Express', icon: () => <SiExpress className="text-gray-300 text-4xl sm:text-5xl" />, proficiency: 70 },
  ],
  'API Protocols': [
    { name: 'REST', icon: () => <FaNetworkWired className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 85 },
    { name: 'SOAP', icon: () => <FaEnvelope className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'GraphQL', icon: () => <SiGraphql className="text-pink-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'OIDC', icon: () => <FaKey className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 65 },
  ],
  'ETL & Integrations': [
    { name: 'Informatica Cloud', icon: () => <SiInformatica className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'PowerCenter', icon: () => <FaCogs className="text-gray-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'Boomi', icon: () => <FaTools className="text-cyan-400 text-4xl sm:text-5xl" />, proficiency: 65 },
    { name: 'AWS', icon: () => <FaAws className="text-yellow-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'Workday', icon: () => <SiWorkplace className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 60 },
    { name: 'Salesforce', icon: () => <SiSalesforce className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Dremio', icon: () => <FaDatabase className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 60 },
    { name: 'Auth0', icon: () => <SiAuth0 className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Netsuite', icon: () => <FaTools className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 65 },
    { name: 'Stripe', icon: () => <FaStripe className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 65 },
  ],
  'DevOps & Scripting': [
    { name: 'Bash', icon: () => <FaTerminal className="text-gray-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'PowerShell', icon: () => <FaPowerOff className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 75 },
    { name: 'Swagger', icon: () => <SiSwagger className="text-green-400 text-4xl sm:text-5xl" />, proficiency: 70 },
    { name: 'OpenAPI', icon: () => <SiOpenapiinitiative className="text-yellow-400 text-4xl sm:text-5xl" />, proficiency: 70 },
  ],
  'AI Tools': [
    { name: 'GitHub Copilot', icon: () => <FaRobot className="text-purple-400 text-4xl sm:text-5xl" />, proficiency: 85 },
    { name: 'ChatGPT', icon: () => <FaRobot className="text-green-400 text-4xl sm:text-5xl" />, proficiency: 90 },
    { name: 'Gemini', icon: () => <FaRobot className="text-blue-400 text-4xl sm:text-5xl" />, proficiency: 80 },
    { name: 'Claude', icon: () => <FaRobot className="text-orange-400 text-4xl sm:text-5xl" />, proficiency: 85 },
  ]
};

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="techstack" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background handled globally for seamless continuity */}
      
      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y }}>
        {/* Modern header */}
        <motion.div 
          className="text-center mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500"></div>
            <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">Technologies</span>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tech <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">Stack</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A comprehensive toolkit of modern technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Enhanced category filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {Object.keys(techStack).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 border text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/50 shadow-lg shadow-orange-500/25'
                  : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech grid with enhanced design */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {techStack[activeCategory as keyof typeof techStack].map((tech) => (
              <motion.div
                key={tech.name}
                className="group relative"
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500 shadow-xl group-hover:shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="group-hover:scale-110 transition-transform duration-300 mb-4">
                      {tech.icon()}
                    </div>
                    <span className="text-slate-200 text-center text-xs sm:text-sm font-medium group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional info section */}
        <motion.div 
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-700/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-slate-300 leading-relaxed">
              Technology evolves rapidly, and I'm committed to staying current with the latest tools and best practices. 
              I'm currently exploring advanced topics in cloud architecture, machine learning integration, and performance optimization.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
