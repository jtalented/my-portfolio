import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiVite } from 'react-icons/si';

interface Project {
  name: string;
  description: string;
  image_url: string;
  github_url: string;
  live_demo_url?: string;
  tech_stack: string[];
  featured?: boolean;
  category: string;
}

interface ProjectCardProps {
  project: Project;
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
  return iconMap[tech] || <div className="w-4 h-4 bg-slate-400 rounded-full" />;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      } 
    },
    hover: { 
      y: -8, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'from-blue-500 to-cyan-500',
      'Backend': 'from-green-500 to-emerald-500',
      'Full Stack': 'from-purple-500 to-pink-500',
      'Mobile': 'from-orange-500 to-red-500',
    };
    return colors[category as keyof typeof colors] || 'from-slate-500 to-slate-600';
  };

  return (
    <motion.div
      className="group bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden"
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      animate="animate"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img 
          src={project.image_url} 
          alt={project.name} 
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {project.name}
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <div 
                key={tech} 
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors duration-200"
              >
                {getTechIcon(tech)}
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-700/50">
          <motion.a 
            href={project.github_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 backdrop-blur-sm flex-1 justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaGithub className="text-lg" />
            <span>GitHub</span>
          </motion.a>
          
          {project.live_demo_url && (
            <motion.a 
              href={project.live_demo_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex-1 justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaExternalLinkAlt className="text-sm" />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;