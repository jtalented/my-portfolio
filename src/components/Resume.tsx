// components/Resume.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import useResponsive from '../hooks/useResponsive';

const Resume = () => {
  const pdfUrl = `${import.meta.env.BASE_URL}resumes/resumefrontend.pdf`;
  const responsive = useResponsive();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.section
      id="resume"
      className="py-24 px-6 bg-gray-900 relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_50%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            A comprehensive overview of my experience, skills, and achievements
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="text-sm" />
              Download PDF
            </motion.a>
            
            <motion.a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700/60 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 border-2 border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="text-sm" />
              View Online
            </motion.a>
          </div>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Browser Bar */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 border-b border-gray-600/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">Resume.pdf</span>
            </div>
          </div>

          {/* PDF Viewer */}
          {isClient && (
            <div className="relative" style={{ height: responsive.isMobile ? '50vh' : responsive.isTablet ? '65vh' : '80vh' }}>
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Resume PDF"
              />
            </div>
          )}

          {/* Fallback for non-PDF support */}
          {!isClient && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 bg-gray-800/50">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                <FaDownload className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Resume Preview
              </h3>
              <p className="text-gray-400 max-w-md">
                Click the download button above to view my complete resume with detailed experience and skills.
              </p>
              <motion.a
                href={pdfUrl}
                download
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-sm" />
                Download Resume
              </motion.a>
            </div>
          )}
        </motion.div>

        {/* Alternative View */}
        {!isClient && (
          <div className="flex items-center justify-center h-full bg-gray-800/50">
            <motion.a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-700/60 text-white font-semibold py-3 px-6 rounded-lg border-2 border-gray-600/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="text-sm" />
              Open Resume in New Tab
            </motion.a>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Resume;
