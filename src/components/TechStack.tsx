// components/TechStack.tsx
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaGitAlt, FaTools,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiSupabase,
  SiPostgresql, SiMongodb, SiDocker,
  SiPython, SiCplusplus, SiGraphql, SiAuth0, SiSalesforce,
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

// Icon as function returning JSX only (clean and type-safe)
interface TechStackItem {
  name: string;
  icon: () => JSX.Element;
}

const techStackData: TechStackItem[] = [
  { name: 'JavaScript', icon: () => <SiJavascript size={48} color="#F7DF1E" className="mb-2" /> },
  { name: 'TypeScript', icon: () => <SiTypescript size={48} color="#007ACC" className="mb-2" /> },
  { name: 'React', icon: () => <FaReact size={48} color="#61DAFB" className="mb-2" /> },
  { name: 'Node.js', icon: () => <FaNodeJs size={48} color="#339933" className="mb-2" /> },
  { name: 'HTML5', icon: () => <SiHtml5 size={48} color="#E34F26" className="mb-2" /> },
  { name: 'CSS3', icon: () => <SiCss3 size={48} color="#1572B6" className="mb-2" /> },
  { name: 'Next.js', icon: () => <FaTools size={48} color="#aaffff" className="mb-2" /> },
  { name: 'Flask', icon: () => <FaTools size={48} color="#ffffff" className="mb-2" /> },
  { name: 'Supabase', icon: () => <SiSupabase size={48} color="#3ECF8E" className="mb-2" /> },
  { name: 'PostgreSQL', icon: () => <SiPostgresql size={48} color="#336791" className="mb-2" /> },
  { name: 'MongoDB', icon: () => <SiMongodb size={48} color="#47A248" className="mb-2" /> },
  { name: 'Python', icon: () => <SiPython size={48} color="#3776AB" className="mb-2" /> },
  { name: 'C++', icon: () => <SiCplusplus size={48} color="#00599C" className="mb-2" /> },
  { name: 'Docker', icon: () => <SiDocker size={48} color="#2496ED" className="mb-2" /> },
  { name: 'GraphQL', icon: () => <SiGraphql size={48} color="#E10098" className="mb-2" /> },
  { name: 'Auth0', icon: () => <SiAuth0 size={48} color="#EB5424" className="mb-2" /> },
  { name: 'Salesforce', icon: () => <SiSalesforce size={48} color="#00A1E0" className="mb-2" /> },
  { name: 'Git', icon: () => <FaGitAlt size={48} color="#F05032" className="mb-2" /> },
  { name: 'Java', icon: () => <FaTools size={48} color="#007396" className="mb-2" /> },
  { name: 'Visual Basic', icon: () => <FaTools size={48} color="#5C2D91" className="mb-2" /> },
  { name: 'SQL', icon: () => <FaTools size={48} color="#F29111" className="mb-2" /> },
  { name: 'ETL Tools (Informatica, Boomi, etc.)', icon: () => <FaTools size={48} color="#545454" className="mb-2" /> },
  { name: 'DevOps (Bash, PowerShell)', icon: () => <FaTools size={48} color="#888888" className="mb-2" /> },
  { name: 'REST / SOAP / GraphQL APIs', icon: () => <FaTools size={48} color="#E535AB" className="mb-2" /> },
];

const TechStack = () => {
  const { t } = useTranslation();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      id="techstack"
      className="py-16"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.colors.primary }}>
        {t('Tech Stack')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {techStackData.map((tech) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
            variants={itemVariants}
            title={tech.name}
          >
            {tech.icon()}
            <span className="text-gray-300 text-center">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TechStack;
