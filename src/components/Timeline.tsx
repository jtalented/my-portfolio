// components/Timeline.tsx
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useResponsive from '../hooks/useResponsive';

const timelineData = [
  {
    year: '2018–2019',
    title: 'National Competitions – BPA',
    description:
      'Top 5 State Finalist in Visual Basic, Top 50 National Placement. Top 5 State Finalist in C++, 11th Place at Nationals.',
    category: 'Achievement',
    icon: '🏆'
  },
  {
    year: '2019',
    title: 'Valedictorian – Baker High School',
    description: 'Graduated top of class with a 4.0 GPA.',
    category: 'Education',
    icon: '🎓'
  },
  {
    year: '2020–2022',
    title: 'Volunteer Missionary',
    description:
      'Served a full-time mission. Led and trained teams of 6–10 missionaries, developed communication and leadership skills.',
    category: 'Service',
    icon: '🤝'
  },
  {
    year: '2020–2025',
    title: 'B.S. Computer Science',
    description:
      'Studied systems, deep learning, and full-stack development. Graduated December 2025. GPA: 3.56.',
    category: 'Education',
    icon: '🎓'
  },
  {
    year: '2023–2025',
    title: 'Full Stack Developer – BYU Office of IT',
    description:
      'Led systems integration, mentored dev teams, and collaborated with cross-functional partners.',
    category: 'Work',
    icon: '💼'
  },
  {
    year: '2025',
    title: 'Full Stack Developer – Fund Launch',
    description:
      'Built a financial education platform with React/Next.js, Supabase, and secure cloud infrastructure. Contract ended August 2025.',
    category: 'Work',
    icon: '🚀'
  },
];

const categoryColors = {
  Achievement: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Education: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Service: 'bg-green-500/20 text-green-300 border-green-500/30',
  Work: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const Timeline = () => {
  const [index, setIndex] = useState(0);
  const event = timelineData[index];
  const responsive = useResponsive();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="timeline" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background handled globally for seamless continuity */}

      <motion.div className="max-w-6xl mx-auto relative z-10" style={{ y }}>
        {/* Modern header */}
        <motion.div 
          className="text-center mb-16 sm:mb-20 md:mb-24"
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
            <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">Experience</span>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Key milestones and experiences that have shaped my career and professional development
          </motion.p>
        </motion.div>

        {/* Professional Timeline Progress Bar */}
        <div className="relative mb-24 hidden md:block px-4">
          <div className="relative">
            {/* Timeline dots container with proper spacing */}
            <div className="relative flex" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              {timelineData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="group flex flex-col items-center relative z-10"
                  style={{
                    position: 'absolute',
                    left: `${(i / (timelineData.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {/* Dot with individual hover effect */}
                  <motion.div
                    className={`w-5 h-5 rounded-full border-2 shadow-lg transition-all duration-300 ${
                      i <= index 
                        ? 'bg-orange-500 border-orange-400 shadow-orange-500/30' 
                        : 'bg-slate-600 border-slate-500 hover:bg-slate-500 hover:border-slate-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformOrigin: 'center center' }}
                  />
                  
                  {/* Year label */}
                  <span
                    className={`text-sm mt-4 transition-all duration-300 font-medium whitespace-nowrap ${
                      i === index 
                        ? 'text-orange-400 font-semibold' 
                        : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Background line positioned to connect dots */}
            <div 
              className="absolute top-2 h-1 bg-slate-700/50 rounded-full"
              style={{
                left: '10px',
                right: '10px'
              }}
            ></div>
            
            {/* Animated progress line */}
            <div 
              className="absolute top-2 h-1 bg-slate-700/50 rounded-full overflow-hidden"
              style={{
                left: '10px',
                right: '10px'
              }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                animate={{ width: `${(index / (timelineData.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Simplified dots */}
        <div className="flex justify-center gap-3 mb-16 md:hidden">
          {timelineData.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? 'bg-orange-500 scale-125' : 'bg-slate-600'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{ transformOrigin: 'center center' }}
            />
          ))}
        </div>

        {/* Enhanced Current Event Card */}
        <div className="relative" style={{ minHeight: responsive.isMobile ? 200 : responsive.isTablet ? 280 : 320 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto border border-slate-700/50"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center border border-slate-600/50">
                    <span className="text-2xl">{event.icon}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-white">
                      {event.year}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category as keyof typeof categoryColors]}`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {event.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Enhanced Progress indicator */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                <span className="text-sm text-slate-400 font-medium">
                  {index + 1} of {timelineData.length}
                </span>
                <div className="flex gap-2">
                  {timelineData.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'bg-orange-500' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-center gap-6 mt-12">
          <motion.button
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="text-sm" />
            <span className="font-medium">Previous</span>
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">Next</span>
            <FaChevronRight className="text-sm" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;