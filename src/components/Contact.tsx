import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { theme } from '../styles/theme';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const SERVICE_ID = atob('c2VydmljZV9iNWg2N3Ns');
  const TEMPLATE_ID = atob('dGVtcGxhdGVfcjd2MjQ0cA==');
  const PUBLIC_KEY = atob('UnFEQktkTkJDeGMyN1JSYXk=');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('sending');

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <motion.section
      id="contact"
      className="py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-6xl font-bold mb-6 font-orbitron" style={{ color: theme.colors.primary }}>
        {'Contact Me'}
      </h2>

      {/* Contact Form */}
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <form onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-md border border-gray-700 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-md border border-gray-700 focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-md border border-gray-700 focus:outline-none"
            required
          />




          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Submit'}
          </button>

          {status === 'sent' && (
            <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2">Something went wrong. Try again.</p>
          )}
        </form>
      </div>




      {/* Text and Icons */}
      <p className="text-lg mt-12 mb-2 text-gray-400">
        {'Reach out on other platforms'}
      </p>

      <div className="flex justify-center gap-6 mb-8">
        <motion.a href="mailto:jaydentallen30@gmail.com" className="text-gray-300 hover:text-blue-500" whileHover={{ scale: 1.1 }}>
          <FaEnvelope size={32} />
        </motion.a>
        <motion.a href="https://github.com/jtalented" className="text-gray-300 hover:text-purple-500" whileHover={{ scale: 1.1 }}>
          <FaGithub size={32} />
        </motion.a>
        <motion.a href="https://www.linkedin.com/in/jayden-allen-aa2083277/" className="text-gray-300 hover:text-blue-500" whileHover={{ scale: 1.1 }}>
          <FaLinkedin size={32} />
        </motion.a>
      </div>
    </motion.section>
  );
};

export default Contact;
