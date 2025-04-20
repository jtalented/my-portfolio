// components/Resume.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const Resume = () => {
  const pdfUrl = '/resumes/resumefrontend.pdf';

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
      className="py-20 px-6 max-w-6xl mx-auto"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2
        className="text-6xl font-bold mb-10 text-center font-orbitron"
        style={{ color: theme.colors.primary }}
      >
        {'Resume'}
      </h2>

      {/* Filter Buttons (temporarily disabled) */}
      {/* 
      <div className="mb-8 flex justify-center flex-wrap gap-4">
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold transition bg-[#412F88] text-white`}
          onClick={() => setFilter('frontend')}
        >
          Frontend
        </button>
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold transition bg-gray-800 text-gray-300 hover:bg-gray-700`}
          onClick={() => setFilter('fullstack')}
        >
          Fullstack
        </button>
        <a
          href={pdfUrl}
          download
          className="bg-[#A2264B] text-white px-5 py-2 rounded-full text-sm font-semibold transition hover:bg-[#D3212D]"
        >
          {t('Download')}
        </a>
      </div>
      */}

      {/* Download Button */}
      <div className="mb-8 flex justify-center">
        <a
          href={pdfUrl}
          download
          className="bg-[#A2264B] text-white px-6 py-3 rounded-full text-sm font-semibold transition hover:bg-[#D3212D]"
        >
          {'Download'}
        </a>
      </div>




      {/* Gradient Frame with Animated Shimmer */}
      <div className="w-full max-h-[90vh] p-[3px] rounded-xl bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient-x">
        <div className="w-full h-[85vh] bg-black rounded-lg overflow-hidden shadow-xl">
          {isClient ? (
            isMobile ? (
              // Fallback for mobile devices that struggle with embedded PDFs
              <div className="flex flex-col items-center justify-center h-full p-6 text-white text-center space-y-4">
                <p className="text-lg font-medium">PDF preview is not supported on mobile.</p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white text-sm font-semibold"
                >
                  Open in New Tab
                </a>
              </div>
            ) : (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Resume PDF"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            )
          ) : null}
        </div>
      </div>
    </motion.section>
  );
};

export default Resume;
