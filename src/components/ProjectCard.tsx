import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  name: string;
  description: string;
  image_url: string;
  github_url: string;
  live_demo_url?: string;
  tech_stack: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
      variants={cardVariants}
      whileHover="hover"
    >
      <img src={project.image_url} alt={project.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="inline-block bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm font-semibold">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
            <FaGithub className="inline-block mr-1" /> GitHub
          </a>
          {project.live_demo_url && (
            <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400">
              <FaExternalLinkAlt className="inline-block mr-1" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;