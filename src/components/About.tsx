// components/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

const About = () => {
  const { t } = useTranslation();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      id="about"
      className="py-16"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.colors.primary }}>
        {t('about.title')}
      </h2>
      <div className="max-w-2xl mx-auto text-lg" style={{ color: theme.colors.textSecondary }}>
        <p className="mb-4">{t('about.paragraph1')}</p>
        <p className="mb-4">{t('about.paragraph2')}</p>
        <p className="mb-4">{t('about.paragraph3')}</p>
        {/* Bonus: Add an image/avatar here */}
      </div>
    </motion.section>
  );
};

export default About;