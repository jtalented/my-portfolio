// components/Resume.tsx
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt, FaFileAlt, FaEye } from 'react-icons/fa';
import useResponsive from '../hooks/useResponsive';

const Resume = () => {
  const basePdfUrl = `${import.meta.env.BASE_URL}resumes/resumefrontend.pdf`;
  const pdfUrl = `${basePdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&view=FitH`;
  const responsive = useResponsive();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="resume" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background handled globally for seamless continuity */}

      <motion.div className="relative z-10 max-w-6xl mx-auto" style={{ y }}>
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
            <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">Resume</span>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Professional <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">Resume</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A comprehensive overview of my experience, skills, and achievements in software development
          </motion.p>
          
          {/* Enhanced Action Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={basePdfUrl}
              download
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="text-lg" />
              <span>Download PDF</span>
            </motion.a>
            
            <motion.a
              href={basePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-800/60 hover:bg-slate-700/60 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border-2 border-slate-600/50 hover:border-slate-500/50 backdrop-blur-sm transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye className="text-lg" />
              <span>View Online</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced Resume Preview */}
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Browser Bar */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 border-b border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <FaFileAlt className="text-slate-400 text-sm" />
                <span className="text-slate-300 text-sm font-medium">Resume.pdf</span>
              </div>
            </div>
          </div>

          {/* Enhanced PDF Viewer */}
          {isClient && (
            <div className="relative" style={{ height: responsive.isMobile ? '60vh' : responsive.isTablet ? '70vh' : '80vh' }}>
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Resume PDF"
              />
            </div>
          )}

          {/* Enhanced Fallback for non-PDF support */}
          {!isClient && (
            <div className="flex flex-col items-center justify-center h-96 p-12 text-center space-y-8 bg-slate-800/30">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center border border-slate-600/50">
                <FaFileAlt className="text-slate-400 text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Resume Preview
                </h3>
                <p className="text-slate-400 max-w-md leading-relaxed">
                  Click the download button above to view my complete resume with detailed experience, skills, and achievements.
                </p>
              </div>
              <motion.a
                href={basePdfUrl}
                download
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-sm" />
                Download Resume
              </motion.a>
            </div>
          )}
        </motion.div>

        {/* Enhanced Alternative View */}
        {!isClient && (
          <motion.div 
            className="flex items-center justify-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={basePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-700/60 text-white font-semibold py-3 px-6 rounded-xl border-2 border-slate-600/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="text-sm" />
              Open Resume in New Tab
            </motion.a>
          </motion.div>
        )}

        {/* Additional Info Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">What's Included</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Professional Experience</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Technical Skills</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Education & Certifications</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;
