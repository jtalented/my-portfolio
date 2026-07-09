// components/About.tsx
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="about" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background handled globally for seamless continuity */}

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y }}>
        {/* Modern header with improved typography */}
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
            <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">About</span>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Passionate developer building innovative solutions that bridge the gap between 
            complex problems and elegant, user-centric experiences.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Enhanced text section */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-slate-300 leading-relaxed">
              <motion.div
                className="relative pl-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 rounded-full"></div>
                <p>
                  Hey, I'm <span className="font-semibold text-white bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Jayden Allen</span> — a passionate developer and builder who thrives on solving complex problems with elegant, scalable solutions. I recently graduated with a degree in Computer Science, where I developed expertise in systems design, full-stack engineering, and innovative problem-solving.
                </p>
              </motion.div>
              
              <motion.div
                className="relative pl-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-500 via-pink-500 to-orange-500 rounded-full"></div>
                <p>
                  Driven by curiosity and a passion for technology that empowers people, I specialize in creating intuitive interfaces, optimizing backend systems, and exploring the intersection of performance and usability. Whether building enterprise applications, automating complex workflows, or mastering emerging technologies, I'm committed to crafting solutions that make a meaningful impact.
                </p>
              </motion.div>
              
              <motion.div
                className="relative pl-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-pink-500 via-orange-500 to-red-500 rounded-full"></div>
                <p>
                  Beyond technology, I'm passionate about sports, collaborative innovation, and continuous learning. I believe in the power of teamwork, the importance of mentorship, and building products that genuinely improve people's lives.
                </p>
              </motion.div>
            </div>

            {/* Enhanced stats with modern design */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { number: "4+", label: "Years Experience", gradient: "from-orange-400 to-red-400", icon: "🚀" },
                { number: "20+", label: "Technologies", gradient: "from-red-400 to-pink-400", icon: "⚡" },
                { number: "25M+", label: "Impacted Revenue", gradient: "from-pink-400 to-orange-400", icon: "💼" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="group relative h-full"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300 h-full flex flex-col justify-center">
                    <div className="text-2xl mb-3 text-center">{stat.icon}</div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 text-center`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-400 font-medium uppercase tracking-wider text-center leading-tight">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced image section */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative group">
              {/* Sophisticated background effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl blur-3xl scale-110"
                animate={{ 
                  scale: [1.1, 1.2, 1.1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              ></motion.div>
              
              {/* Modern image container */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500 backdrop-blur-sm bg-gradient-to-br from-slate-800 to-slate-900">
                  <motion.img
                    src={`${import.meta.env.BASE_URL}images/IMG_1993 (3).PNG`}
                    alt="Jayden Allen"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
                
                {/* Floating accent elements */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl opacity-80 blur-xl"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.8, 0.6, 0.8]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl opacity-60 blur-lg"
                  animate={{ 
                    x: [0, 5, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                ></motion.div>
                

              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
