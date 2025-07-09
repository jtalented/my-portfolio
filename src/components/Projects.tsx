import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiVite } from 'react-icons/si';

interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  github_url: string;
  live_demo_url?: string;
  tech_stack: string[];
  featured?: boolean;
}

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'React': <FaReact className="text-cyan-400" />,
    'TypeScript': <SiTypescript className="text-blue-400" />,
    'Node.js': <FaNodeJs className="text-green-400" />,
    'Express': <SiExpress className="text-gray-300" />,
    'MongoDB': <SiMongodb className="text-green-500" />,
    'Tailwind': <SiTailwindcss className="text-cyan-400" />,
    'Vite': <SiVite className="text-purple-400" />,
    'Next.js': <SiNextdotjs className="text-gray-300" />,
    'Python': <FaPython className="text-yellow-400" />,
    'Database': <FaDatabase className="text-blue-400" />,
  };
  return iconMap[tech] || <div className="w-4 h-4 bg-gray-400 rounded-full" />;
};

const staticProjects: Project[] = [
  {
    id: 1,
    name: 'Interactive 3D Portfolio',
    description: 'A modern portfolio website featuring interactive 3D elements, smooth animations, and responsive design. Built with React, Three.js, and Tailwind CSS for an immersive user experience.',
    image_url: `${import.meta.env.BASE_URL}images/macbook-screen.png`,
    github_url: 'https://github.com/yourusername/portfolio',
    live_demo_url: 'https://yourusername.github.io/portfolio',
    tech_stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    featured: true,
  },
  {
    id: 2,
    name: 'Enterprise Task Management',
    description: 'A comprehensive task management platform with real-time collaboration, advanced analytics, drag-and-drop functionality, and team workspace features for enterprise teams.',
    image_url: `${import.meta.env.BASE_URL}images/macbook-screen.png`,
    github_url: 'https://github.com/yourusername/task-tracker',
    live_demo_url: 'https://tasktracker.example.com',
    tech_stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    featured: true,
  },
  {
    id: 3,
    name: 'Scalable E-Commerce API',
    description: 'High-performance RESTful API for e-commerce platforms with advanced authentication, payment processing, and inventory management systems.',
    image_url: `${import.meta.env.BASE_URL}images/macbook-screen.png`,
    github_url: 'https://github.com/yourusername/ecommerce-api',
    tech_stack: ['Node.js', 'Express', 'MongoDB', 'TypeScript'],
  },
  {
    id: 4,
    name: 'AI-Powered Analytics Dashboard',
    description: 'Intelligent dashboard for data visualization and analytics with machine learning insights, real-time updates, and customizable reporting.',
    image_url: `${import.meta.env.BASE_URL}images/macbook-screen.png`,
    github_url: 'https://github.com/yourusername/analytics-dashboard',
    live_demo_url: 'https://analytics.example.com',
    tech_stack: ['React', 'Python', 'Database', 'TypeScript'],
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setTimeout(() => {
      setProjects(staticProjects);
    }, 300);
  }, []);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="projects" className="py-24 px-6 bg-gray-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y }}>
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of innovative solutions built with cutting-edge technologies, 
            designed to solve real-world problems and deliver exceptional user experiences.
          </motion.p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>
              
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl group-hover:border-gray-600/50 transition-all duration-500">
                {/* Project preview area with gradient */}
                <div className="aspect-video bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-full h-full bg-gradient-to-br from-gray-600/30 to-gray-700/30 rounded-xl border border-gray-600/30 flex items-center justify-center relative z-10">
                    <div className="text-gray-400 font-medium">Project Preview</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tech_stack.map((tech) => (
                      <motion.div 
                        key={tech} 
                        className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border border-gray-600/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {getTechIcon(tech)}
                        {tech}
                      </motion.div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 rounded-lg transition-all duration-300 border border-gray-600/30"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={16} />
                      <span>Code</span>
                    </motion.a>
                    {project.live_demo_url && (
                      <motion.a 
                        href={project.live_demo_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-300 border border-blue-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt size={14} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-2">More Projects</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-xl group-hover:border-gray-600/50 transition-all duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded border border-gray-600/20 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Preview</div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {project.name}
                        </h4>
                        <div className="flex gap-2">
                          <motion.a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaGithub size={16} />
                          </motion.a>
                          {project.live_demo_url && (
                            <motion.a 
                              href={project.live_demo_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-600/20 rounded-lg transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaExternalLinkAlt size={14} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <div key={tech} className="flex items-center gap-1.5 bg-gray-700/40 text-gray-300 rounded-full px-3 py-1 text-xs font-medium border border-gray-600/30">
                            {getTechIcon(tech)}
                            {tech}
                          </div>
        ))}
      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
