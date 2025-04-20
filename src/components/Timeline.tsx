// components/Timeline.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { theme } from '../styles/theme';

const timelineData = [
  {
    year: '2018–2019',
    title: 'National Competitions – BPA',
    description:
      'Top 5 State Finalist in Visual Basic, Top 50 National Placement. Top 5 State Finalist in C++, 11th Place at Nationals.',
  },
  {
    year: '2019',
    title: 'Valedictorian – Baker High School',
    description: 'Graduated top of class with a 4.0 GPA.',
  },
  {
    year: '2020–2022',
    title: 'Volunteer Missionary',
    description:
      'Served a full-time mission. Led and trained teams of 6–10 missionaries, developed communication and leadership skills.',
  },
  {
    year: '2020–2025',
    title: 'B.S. Computer Science – BYU',
    description:
      'Studied systems, deep learning, and full-stack development. GPA: 3.56.',
  },
  {
    year: '2023–2025',
    title: 'Full Stack Developer – BYU Office of IT',
    description:
      'Led systems integration, mentored dev teams, and collaborated with cross-functional partners.',
  },
  {
    year: '2025–Present',
    title: 'Full Stack Developer – Fund Launch',
    description:
      'Built a financial education platform with React/Next.js, Supabase, and secure cloud infrastructure.',
  },
];

const cardVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const Timeline = () => {
  const [index, setIndex] = useState(0);
  const event = timelineData[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12"
        style={{ color: theme.colors.primary }}
      >
        Timeline
      </h2>

      {/* Timeline Bar (hidden on mobile) */}
      <div className="relative mb-14 hidden sm:block">
        <div className="w-full h-1 bg-gray-700 rounded-full absolute top-1/2 transform -translate-y-1/2" />
        <div className="flex justify-between relative z-10 px-4">
          {timelineData.map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div
                className={`w-4 h-4 rounded-full mb-2 transition ${
                  i === index ? 'bg-blue-500 scale-110' : 'bg-gray-500'
                }`}
              />
              <span
                className={`text-sm transition ${
                  i === index ? 'text-blue-400 font-medium' : 'text-gray-400'
                }`}
              >
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Card */}
      <div className="relative min-h-[240px] sm:min-h-[220px] mb-8 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-xl max-w-xl mx-auto"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h3 className="text-lg sm:text-xl text-white font-semibold mb-1">
              {event.year}
            </h3>
            <h4 className="text-base sm:text-lg text-blue-400 font-medium mb-2">
              {event.title}
            </h4>
            <p className="text-sm text-gray-300">{event.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={handlePrev}
          className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition"
          aria-label="Previous"
        >
          <FaChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition"
          aria-label="Next"
        >
          <FaChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </section>
  );
};

export default Timeline;
