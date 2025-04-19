// components/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

const Contact = () => {
  const { t } = useTranslation();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      id="contact"
      className="py-16 text-center"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-8" style={{ color: theme.colors.primary }}>
        {t('contact.title')}
      </h2>
      <p className="text-lg mb-6" style={{ color: theme.colors.textSecondary }}>
        {t('contact.subtitle')}
      </p>
      <div className="flex justify-center gap-6 mb-8">
        <motion.a
          href="mailto:your.email@example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500"
          whileHover={{ scale: 1.1 }}
        >
          <FaEnvelope size={32} />
        </motion.a>
        <motion.a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-purple-500"
          whileHover={{ scale: 1.1 }}
        >
          <FaGithub size={32} />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500"
          whileHover={{ scale: 1.1 }}
        >
          <FaLinkedin size={32} />
        </motion.a>
      </div>

      {/* Optional: Simple Contact Form (requires backend or Netlify setup) */}
      {/* <div className="max-w-md mx-auto mt-8">
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
              {t('contact.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
              {t('contact.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
              {t('contact.message')}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
          >
            {t('contact.submit')}
          </button>
        </form>
      </div> */}
    </motion.section>
  );
};

export default Contact;