// components/Resume.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const Resume = () => {
  const pdfUrl = `${import.meta.env.BASE_URL}resumes/resumefrontend.pdf`;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
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
            Resume
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A comprehensive overview of my experience, skills, and achievements
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              whileHover={{ y: -2 }}
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="text-sm" />
              Open in New Tab
            </motion.a>
          </div>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 border-b border-gray-600/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-sm font-medium text-gray-200">Resume - Jayden Allen</div>
              </div>
            </div>
          </div>

          <div className="h-[80vh] relative">
            {isClient ? (
              isMobile ? (
                // Mobile fallback with better design
                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 bg-gray-800/50">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <FaExternalLinkAlt className="text-gray-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      PDF Preview Not Available
                    </h3>
                    <p className="text-gray-300 mb-6">
                      PDF preview is not supported on mobile devices. Please use the buttons above to download or view the resume.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <a
                      href={pdfUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <FaDownload className="text-sm" />
                      Download PDF
                    </a>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gray-700/60 text-white font-semibold py-3 px-6 rounded-lg border-2 border-gray-600/50 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      Open in New Tab
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  title="Resume PDF"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800/50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Resume;
