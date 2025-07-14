import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
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
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background handled globally for seamless continuity */}

      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">Contact</span>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Have a project in mind or just want to chat? I'd love to hear from you and discuss how we can work together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Enhanced Contact Form */}
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-700/50"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Send me a message</h3>
                <p className="text-slate-400 text-sm">I'll get back to you within 24 hours</p>
              </div>
            </div>
            
            <form onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-slate-700/50 text-white placeholder-slate-400 backdrop-blur-sm text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-slate-700/50 text-white placeholder-slate-400 backdrop-blur-sm text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-slate-700/50 text-white placeholder-slate-400 resize-none backdrop-blur-sm text-sm sm:text-base"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02]"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending' ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {status === 'sent' && (
                <motion.div 
                  className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-green-900 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-green-300 text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div 
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-red-900 text-xs font-bold">✗</span>
                    </div>
                    <p className="text-red-300 text-sm font-medium">Something went wrong. Please try again or reach out directly.</p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Let's work together</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                I'm always interested in new opportunities and exciting projects. 
                Whether you're looking for a developer, have a question, or just want to connect, 
                feel free to reach out! I'm passionate about creating innovative solutions and 
                would love to discuss how we can bring your ideas to life.
              </p>
              
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Available for new opportunities</span>
              </div>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:jaydentallen30@gmail.com"
                className="flex items-center gap-4 p-6 bg-slate-800/60 backdrop-blur-sm rounded-2xl hover:bg-slate-700/60 transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 group shadow-lg"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                  <FaEnvelope className="text-orange-400 text-xl" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white group-hover:text-orange-400 transition-colors">Email</div>
                  <div className="text-slate-400 text-sm">jaydentallen30@gmail.com</div>
                </div>
                <div className="text-slate-500 group-hover:text-slate-400 transition-colors">
                  <FaExternalLinkAlt className="text-sm" />
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/jtalented"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-slate-800/60 backdrop-blur-sm rounded-2xl hover:bg-slate-700/60 transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 group shadow-lg"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-slate-500/20 rounded-xl flex items-center justify-center group-hover:bg-slate-500/30 transition-colors">
                  <FaGithub className="text-slate-300 text-xl" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white group-hover:text-slate-300 transition-colors">GitHub</div>
                  <div className="text-slate-400 text-sm">@jtalented</div>
                </div>
                <div className="text-slate-500 group-hover:text-slate-400 transition-colors">
                  <FaExternalLinkAlt className="text-sm" />
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/jayden-allen-aa2083277/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-slate-800/60 backdrop-blur-sm rounded-2xl hover:bg-slate-700/60 transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 group shadow-lg"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                  <FaLinkedin className="text-red-400 text-xl" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white group-hover:text-red-400 transition-colors">LinkedIn</div>
                  <div className="text-slate-400 text-sm">Jayden Allen</div>
                </div>
                <div className="text-slate-500 group-hover:text-slate-400 transition-colors">
                  <FaExternalLinkAlt className="text-sm" />
                </div>
              </motion.a>
            </div>

            {/* Additional info */}
            <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h4 className="text-lg font-semibold text-white mb-3">What I can help with</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Full Stack Development</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>UI/UX Design</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>API Development</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Performance Optimization</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
