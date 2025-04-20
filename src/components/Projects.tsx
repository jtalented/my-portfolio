import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  github_url: string;
  live_demo_url?: string;
  tech_stack: string[];
}

const staticProjects: Project[] = [
  {
    id: 1,
    name: 'Personal Portfolio',
    description: 'A sleek, responsive portfolio built with React and Vite.',
    image_url: '/images/portfolio.png',
    github_url: 'https://github.com/yourusername/portfolio',
    live_demo_url: 'https://yourusername.github.io/portfolio',
    tech_stack: ['React', 'Vite', 'Tailwind'],
  },
  {
    id: 2,
    name: 'Task Tracker',
    description: 'A full-stack task management app with drag-and-drop.',
    image_url: '/images/task-tracker.png',
    github_url: 'https://github.com/yourusername/task-tracker',
    live_demo_url: 'https://tasktracker.example.com',
    tech_stack: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setProjects(staticProjects);
    }, 500);
  }, []);

  return (
    <section id="projects" className="py-16 px-4 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
