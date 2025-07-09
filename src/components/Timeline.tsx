// components/Timeline.tsx
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useResponsive from '../hooks/useResponsive';

const timelineData = [
  {
    year: '2018–2019',
    title: 'National Competitions – BPA',
    description:
      'Top 5 State Finalist in Visual Basic, Top 50 National Placement. Top 5 State Finalist in C++, 11th Place at Nationals.',
    category: 'Achievement'
  },
  {
    year: '2019',
    title: 'Valedictorian – Baker High School',
    description: 'Graduated top of class with a 4.0 GPA.',
    category: 'Education'
  },
  {
    year: '2020–2022',
    title: 'Volunteer Missionary',
    description:
      'Served a full-time mission. Led and trained teams of 6–10 missionaries, developed communication and leadership skills.',
    category: 'Service'
  },
  {
    year: '2020–2025',
    title: 'B.S. Computer Science – BYU',
    description:
      'Studied systems, deep learning, and full-stack development. GPA: 3.56.',
    category: 'Education'
  },
  {
    year: '2023–2025',
    title: 'Full Stack Developer – BYU Office of IT',
    description:
      'Led systems integration, mentored dev teams, and collaborated with cross-functional partners.',
    category: 'Work'
  },
  {
    year: '2025–Present',
    title: 'Full Stack Developer – Fund Launch',
    description:
      'Built a financial education platform with React/Next.js, Supabase, and secure cloud infrastructure.',
    category: 'Work'
  },
];

const categoryColors = {
  Achievement: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Education: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Service: 'bg-green-500/20 text-green-300 border-green-500/30',
  Work: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const Timeline = () => {
  const [index, setIndex] = useState(0);
  const event = timelineData[index];
  const responsive = useResponsive();

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="timeline" className="py-24 px-6 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),transparent_50%)]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Key milestones and experiences that have shaped my career
          </p>
        </motion.div>

        {/* Timeline Progress Bar */}
        <div className="relative mb-16 hidden md:block">
          <div className="w-full h-2 bg-gray-700 rounded-full" />
          <div 
            className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${((index + 1) / timelineData.length) * 100}%` }}
          />
          <div className="flex justify-between absolute top-0 w-full">
            {timelineData.map((item, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group flex flex-col items-center transform -translate-y-1"
              >
                <div
                  className={`w-4 h-4 rounded-full border-4 border-gray-800 shadow-lg transition-all duration-300 ${
                    i <= index ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
                <span
                  className={`text-sm mt-3 transition-all duration-300 ${
                    i === index 
                      ? 'text-blue-400 font-semibold scale-110' 
                      : 'text-gray-500 group-hover:text-gray-400'
                  }`}
                >
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Timeline Dots */}
        <div className="flex justify-center gap-2 mb-8 md:hidden">
          {timelineData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? 'bg-blue-500 scale-125' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Current Event Card */}
        <div className="relative" style={{ minHeight: responsive.isMobile ? 180 : responsive.isTablet ? 240 : 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-700/50"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-white">
                      {event.year}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category as keyof typeof categoryColors]}`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {event.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>

              {/* Progress indicator */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
                <span className="text-sm text-gray-400">
                  {index + 1} of {timelineData.length}
                </span>
                <div className="flex gap-2">
                  {timelineData.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={handlePrev}
            className="p-4 bg-gray-800/60 hover:bg-gray-700/60 rounded-full shadow-lg border border-gray-700/50 transition-all duration-200 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous event"
          >
            <FaChevronLeft className="text-gray-300 w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="p-4 bg-gray-800/60 hover:bg-gray-700/60 rounded-full shadow-lg border border-gray-700/50 transition-all duration-200 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next event"
          >
            <FaChevronRight className="text-gray-300 w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
