import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiVite } from 'react-icons/si';
import { useRef } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  github_url: string;
  live_demo_url?: string;
  tech_stack: string[];
  featured?: boolean;
  category: string;
  sections?: { heading: string; items: string[] }[];
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
    'Flask': <FaPython className="text-yellow-400" />,
    'FFmpeg': <FaDatabase className="text-blue-400" />,
    'API Integration': <FaDatabase className="text-blue-400" />,
    'Automation': <FaDatabase className="text-blue-400" />,
    'Three.js': <FaReact className="text-cyan-400" />,
    'Supabase': <FaDatabase className="text-blue-400" />,
  };
  return iconMap[tech] || <div className="w-4 h-4 bg-gray-400 rounded-full" />;
};

const staticProjects: Project[] = [
  {
    id: 1,
    name: 'HasteAPI',
    description: 'A full-stack AI SaaS platform enabling users to automatically generate functional API endpoints via natural language using AI.',
    sections: [
      {
        heading: '🔧 Tech Stack',
        items: [
          'Full-stack SaaS architecture',
          'AI-powered natural language processing',
          'Multi-provider API management system',
        ],
      },
      {
        heading: '📊 Features',
        items: [
          'Secure API key management with analytics and rate limiting',
          'Cost controls and advanced configuration tools',
          'API versioning and automated documentation',
        ],
      },
      {
        heading: '🚀 Highlights',
        items: [
          'Architected and launched complete SaaS platform',
          'Engineered secure multi-provider system',
          'Created comprehensive API system with versioning',
        ],
      },
    ],
    image_url: `${import.meta.env.BASE_URL}images/HasteAPI.png`,
    github_url: '',
    live_demo_url: 'https://www.hasteapi.com',
    tech_stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'API Integration'],
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 2,
    name: 'The AD Grid',
    description: 'A live, scalable ad grid platform (10,000×10,000 coordinate system) enabling users to purchase and display custom ads.',
    sections: [
      {
        heading: '🛠 Technologies Used',
        items: [
          'PostgreSQL with optimized indexing',
          'Stripe payment integration',
          'Leaflet.js for interactive mapping',
          'Vercel deployment',
        ],
      },
      {
        heading: '💡 Features',
        items: [
          'Fast and scalable response times with lazy loading',
          'Intelligent gap filling algorithms',
          'Secure payment validation and fraud prevention',
          'Real-time webhook handling',
        ],
      },
      {
        heading: '🔒 Security & Tools',
        items: [
          'Row Level Security (RLS) implementation',
          'Content Security Policies (CSPs)',
          'SVG upload functionality',
          'Analytics and moderation tools',
          'Accessibility features',
        ],
      },
    ],
    image_url: `${import.meta.env.BASE_URL}images/THEADGRID.png`,
    github_url: '',
    live_demo_url: 'https://www.theadgrid.com',
    tech_stack: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Vercel'],
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 3,
    name: 'Automated Video Compiler',
    description: 'A Python-powered pipeline that compiles daily trending video segments using social media APIs, editing libraries, and automation tools.',
    sections: [
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
    ],
    image_url: '',
    github_url: 'https://github.com/jtalented',
    tech_stack: ['Python', 'FFmpeg', 'API Integration', 'Automation'],
    featured: true,
    category: 'Backend'
  },
  {
    id: 4,
    name: 'Financial Education Platform',
    description: 'Built a comprehensive financial education platform with React/Next.js, Supabase, and secure cloud infrastructure for Fund Launch.',
    image_url: `${import.meta.env.BASE_URL}images/Fund_Launch_Lock.png`,
    github_url: '',
    live_demo_url: 'https://app.fundlaunch.com',
    tech_stack: ['React', 'Next.js', 'Supabase', 'TypeScript'],
    category: 'Full Stack'
  }
];

const Projects = () => {
  const [projects] = useState<Project[]>(staticProjects);
  const [loading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openOverlay, setOpenOverlay] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  // Move imgError state to component level and track by project ID
  const [imgErrors, setImgErrors] = useState<{ [key: number]: boolean }>({});
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Handle image error for specific project
  const handleImageError = (projectId: number) => {
    setImgErrors(prev => ({ ...prev, [projectId]: true }));
  };

  // Close overlay when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setOpenOverlay(null);
      }
    }
    if (openOverlay !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openOverlay]);

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
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Background handled globally for seamless continuity */}

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y }}>
        {/* Modern header */}
        <motion.div 
          className="text-center mb-20"
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
            <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">Portfolio</span>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of innovative solutions built with cutting-edge technologies, 
            designed to solve real-world problems and deliver exceptional user experiences.
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
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

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-2 text-slate-400">
              <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
              <span>Loading projects...</span>
            </div>
          </div>
        ) : (
          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => {
              const hasImageError = imgErrors[project.id] || false;
              const hasImage = project.image_url && !hasImageError;
              
              return (
                <motion.div
                  key={project.id}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl group-hover:border-slate-600/50 transition-all duration-500">
                    {/* Project preview area or image */}
                    <div className="aspect-video bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                      {hasImage ? (
                        <img
                          src={project.image_url}
                          alt={project.name}
                          className="w-full h-full object-cover rounded-xl border border-slate-600/30"
                          onError={() => handleImageError(project.id)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-700/30 rounded-xl border border-slate-600/30 flex items-center justify-center relative z-10 p-8">
                          <div className="text-slate-400 font-medium">Project Preview</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30">
                              {project.category}
                            </span>
                            {project.featured && (
                              <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-medium rounded-full border border-red-500/30">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-3">
                            {project.name}
                          </h3>
                          <p className="text-slate-300 leading-relaxed mb-6">
                            {project.description}
                          </p>
                        </div>
                        {/* Details button */}
                        {project.sections && (
                          <button
                            className="ml-4 px-3 py-1 bg-blue-600/80 hover:bg-blue-700/80 text-white text-xs rounded-lg shadow transition-all duration-200"
                            onClick={() => setOpenOverlay(project.id)}
                            aria-label="Show project details"
                          >
                            Details
                          </button>
                        )}
                      </div>
                      
                      {/* Enhanced Tech Stack */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.tech_stack.map((tech) => (
                          <motion.div 
                            key={tech} 
                            className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border border-slate-600/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {getTechIcon(tech)}
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Enhanced action buttons */}
                      <div className="flex gap-4">
                        {project.github_url && (
                          <motion.a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-600/30 group-hover:border-slate-500/50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaGithub className="text-lg" />
                            <span className="text-sm font-medium">Code</span>
                          </motion.a>
                        )}
                        
                        {project.live_demo_url && (
                          <motion.a
                            href={project.live_demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt className="text-sm" />
                            <span className="text-sm font-medium">Visit Site</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Overlay modal for project details */}
                  {openOverlay === project.id && project.sections && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <div
                        ref={overlayRef}
                        className="bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative border border-slate-700/70"
                      >
                        <button
                          className="absolute top-4 right-4 text-slate-400 hover:text-orange-400 text-xl font-bold"
                          onClick={() => setOpenOverlay(null)}
                          aria-label="Close details"
                        >
                          ×
                        </button>
                        <h4 className="text-2xl font-bold text-orange-400 mb-6 text-center">{project.name} Details</h4>
                        <div className="space-y-6">
                          {project.sections.map((section, idx) => (
                            <div key={idx}>
                              <div className="text-lg font-semibold text-blue-300 mb-2">{section.heading}</div>
                              <ul className="list-disc list-inside text-slate-200 space-y-1">
                                {section.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;