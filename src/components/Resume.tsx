// components/Resume.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

const Resume = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'frontend' | 'fullstack'>('frontend');
  const [pdfUrl, setPdfUrl] = useState<string>('/resumes/resumefrontend.pdf');

  useEffect(() => {
    setPdfUrl(
      filter === 'frontend'
        ? '/resumes/resumefrontend.pdf'
        : '/resumes/resumefullstack.pdf'
    );
  }, [filter]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  return (
    <motion.section
      id="resume"
      className="py-20 px-6 max-w-6xl mx-auto"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2
        className="text-6xl font-bold mb-10 text-center"
        style={{ color: theme.colors.primary }}
      >
        {t('Resume')}
      </h2>

      {/* Filter + Download Buttons */}
      <div className="mb-8 flex justify-center flex-wrap gap-4">
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
            filter === 'frontend'
              ? 'bg-[#412F88] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setFilter('frontend')}
        >
          Frontend
        </button>
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
            filter === 'fullstack'
              ? 'bg-[#722B6A] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
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

      {/* Gradient Frame with Animated Shimmer */}
      <div
        className="w-full h-[90vh] p-[3px] rounded-xl bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 animate-gradient-x"
      >
        <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-xl">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title="Resume PDF"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Resume;
