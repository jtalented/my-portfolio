// components/Timeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  { year: '2020', title: 'Started Learning Web Development', description: 'Discovered the world of HTML, CSS, and JavaScript.' },
  { year: '2021', title: 'Embarked on React Journey', description: 'Fell in love with component-based architecture.' },
  { year: '2022', title: 'Built First Portfolio Project', description: 'Applied learned skills to create a personal website.' },
  { year: '2023', title: 'Explored Backend with Node.js', description: 'Ventured into server-side development and APIs.' },
  { year: '2024', title: 'Mastered State Management', description: 'Delved deep into Redux and Context API.' },
  { year: '2025', title: 'Focus on Full-Stack Development', description: 'Currently building applications with React and Supabase.' },
  // Add more events to your timeline
];

const Timeline = () => {
  const { t } = useTranslation();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const eventVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="timeline"
      className="py-16 overflow-x-auto" // Enable horizontal scrolling
      style={{ position: 'relative' }}
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.colors.primary }}>
        {t('timeline.title')}
      </h2>
      <div className="relative w-max">
        <div
          className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-700"
          style={{ zIndex: -1 }}
        ></div>
        <div className="flex space-x-16">
          {timelineData.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center"
              variants={eventVariants}
            >
              <div className="w-4 h-4 rounded-full bg-blue-500 absolute left-1/2 transform -translate-x-1/2 -top-2"></div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-1" style={{ color: theme.colors.secondary }}>
                  {event.year}
                </h3>
                <h4 className="text-lg mb-1" style={{ color: theme.colors.textPrimary }}>
                  {event.title}
                </h4>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Timeline;