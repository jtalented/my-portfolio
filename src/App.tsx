import Layout from './components/Layout';
import Hero from './components/Macbook/Hero';
import FloatingMacBook from './components/FloatingMacBook';
import TerminalIntro from './components/TerminalIntro';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Resume from './components/Resume';
import Contact from './components/Contact';
import useIsMobile from './hooks/useIsMobile';
import { motion, useScroll, useTransform, useVelocity } from 'framer-motion';
import LiquidGlassMorphism from './components/Macbook/LiquidGlassMorphism';
import { useMemo } from 'react';
import { useSpring } from 'framer-motion';

const App = () => {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ layoutEffect: false });
  const scrollVelocity = useVelocity(scrollYProgress);

  // Call useTransform and useSpring at the top level
  const glassOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.5, 0]);
  const smoothGlassOpacity = useSpring(glassOpacity, { stiffness: 80, damping: 30 });

  // Memoize mousePosition
  const mousePosition = useMemo(() => ({ x: 0, y: 0 }), []);

  return (
    <div className="relative">
      <Layout>
        {/* Glass effects that work on both mobile and desktop */}
        <LiquidGlassMorphism 
          mousePosition={mousePosition}
          scrollProgress={scrollYProgress}
          opacity={smoothGlassOpacity}
        />

        {/* Professional Hero Section */}
        <Hero />

        {/* Floating MacBook that follows throughout the page */}
        <FloatingMacBook />

        {/* Glass Break Transition Space */}
        <motion.section 
          id="glass-transition" 
          className="relative z-10 min-h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Unified background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          
          {/* Subtle ambient pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)
              `,
              backgroundSize: '1200px 1200px, 1000px 1000px',
            }}
          />
          
          {/* Elegant transition indicator */}
          <motion.div
            className="relative z-10 text-center opacity-40"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent mx-auto mb-4" />
            <p className="text-slate-400 text-sm font-mono tracking-wider"></p>
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent mx-auto mt-4" />
          </motion.div>
        </motion.section>

        {/* Main Content with Professional Transitions */}
        <motion.section 
          id="main-content" 
          className="relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Unified premium background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          
          {/* Subtle ambient background pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(251, 146, 60, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
              `,
              backgroundSize: '1200px 1200px, 1000px 1000px, 800px 800px',
            }}
          />

          {/* Professional content sections with seamless transitions */}
          <div className="relative z-10">
            
            {/* Terminal Introduction */}
            <motion.section
              id="terminal-intro"
              className="relative min-h-screen flex items-center justify-center w-full"
            >
              <div className="w-full">
                <TerminalIntro />
              </div>
            </motion.section>

            {/* About Section */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <About />
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <TechStack />
            </motion.div>

            {/* Projects */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <Projects />
            </motion.div>

            {/* Resume */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <Resume />
            </motion.div>

            {/* Timeline */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <Timeline />
            </motion.div>

            {/* Contact */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <Contact />
            </motion.div>

          </div>

          {/* Subtle ambient lighting effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }} />
        </motion.section>
      </Layout>
    </div>
  );
};

export default App;
