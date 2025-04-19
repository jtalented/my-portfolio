// components/Resume.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
}

// Placeholder data - replace with your actual data fetching or import
const resumeData = {
  experience: [
    {
      role: 'Frontend Developer',
      company: 'Tech Corp',
      duration: '2023 - Present',
      description: ['Developed user interfaces using React.', 'Collaborated with backend team on API integration.'],
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      role: 'Web Developer Intern',
      company: 'Startup X',
      duration: '2022 - 2023',
      description: ['Assisted in building and maintaining web applications.', 'Learned about agile development methodologies.'],
      skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    },
    {
      role: 'Freelance Developer',
      company: 'Self-Employed',
      duration: '2021 - 2022',
      description: ['Worked on various client projects, including website development and maintenance.'],
      skills: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
  education: [
    { degree: 'Bachelor of Science in Computer Science', university: 'University Y', year: '2025' },
    // ... more education details
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'Git', 'Supabase'],
};

const Resume = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const [filteredExperience, setFilteredExperience] = useState(resumeData.experience);

  useEffect(() => {
    if (filter === 'frontend') {
      setFilteredExperience(resumeData.experience.filter(exp => exp.skills.some(skill => ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript'].includes(skill))));
    } else if (filter === 'fullstack') {
      setFilteredExperience(resumeData.experience.filter(exp => exp.skills.some(skill => ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'SQL', 'Supabase', 'TypeScript'].includes(skill))));
    } else {
      setFilteredExperience(resumeData.experience);
    }
  }, [filter]);

  const handleDownload = () => {
    // Implement PDF download functionality (e.g., using a library like jsPDF)
    alert('Download Resume functionality to be implemented.');
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const uniqueSkills = ['all', 'frontend', 'fullstack']; // Add more filter options based on your data

  return (
    <motion.section
      id="resume"
      className="py-16"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.colors.primary }}>
        {t('resume.title')}
      </h2>

      <div className="mb-6 flex justify-center gap-4">
        {uniqueSkills.map((skill) => (
          <button
            key={skill}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              filter === skill ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } focus:outline-none`}
            onClick={() => setFilter(skill)}
          >
            {t(`resume.filter.${skill}`)}
          </button>
        ))}
        <button
          className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-full text-sm font-semibold focus:outline-none"
          onClick={handleDownload}
        >
          {t('resume.download')}
        </button>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.secondary }}>
          {t('resume.experience')}
        </h3>
        {filteredExperience.map((exp, index) => (
          <motion.div key={index} className="mb-6 p-4 rounded-md bg-gray-800" variants={itemVariants}>
            <h4 className="text-lg font-semibold" style={{ color: theme.colors.textPrimary }}>{exp.role}</h4>
            <p className="text-gray-400">{exp.company} | {exp.duration}</p>
            <ul className="list-disc list-inside mt-2 text-gray-400">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-500">
              {t('resume.skills')}: {exp.skills.join(', ')}
            </p>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.secondary }}>
          {t('resume.education')}
        </h3>
        {resumeData.education.map((edu, index) => (
          <motion.div key={index} className="mb-6 p-4 rounded-md bg-gray-800" variants={itemVariants}>
            <h4 className="text-lg font-semibold" style={{ color: theme.colors.textPrimary }}>{edu.degree}</h4>
            <p className="text-gray-400">{edu.university} | {edu.year}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Resume;