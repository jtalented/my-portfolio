import Layout from './components/Layout';
import Hero from './components/Macbook/Hero';
import FloatingMacBook from './components/FloatingMacBook';
import TerminalIntro from './components/TerminalIntro';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import MobileProjectList from './components/MobileProjectList';
import Timeline from './components/Timeline';
import Resume from './components/Resume';
import Contact from './components/Contact';
import useIsMobile from './hooks/useIsMobile';
import { motion, useScroll, useTransform } from 'framer-motion';

const App = () => {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  return (
    <Layout>
      {/* Professional Hero Section */}
      <Hero />

      {/* Floating MacBook that follows throughout the page */}
      {!isMobile && <FloatingMacBook />}

      {/* Glass Break Transition Space */}
      <motion.section 
        id="glass-transition" 
        className="relative z-10 min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {/* Subtle background to indicate transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900" />
        
        {/* Optional visual indicator for the break */}
        <motion.div
          className="relative z-10 text-center opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mb-4" />
          <p className="text-slate-400 text-sm font-mono">System Initialized</p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mt-4" />
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
        {/* Sophisticated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Flowing background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
              linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '800px 800px, 1000px 1000px, 100px 100px, 100px 100px',
          }}
        />

        {/* Professional content sections with enhanced spacing and laptop clearance */}
        <div className="relative z-10 space-y-40 px-8 lg:px-32 xl:px-48">
          
          {/* Terminal Introduction */}
          <motion.section
            id="terminal-intro"
            className="relative min-h-screen flex items-center justify-center"
          >
            <div className="w-full max-w-6xl mx-auto">
              <TerminalIntro />
            </div>
          </motion.section>

          {/* About Section with Liquid Glass */}
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Dynamic background shape */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 rounded-3xl"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 0.5, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <About />
          </motion.div>

          {/* Tech Stack with Neon Accents */}
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Animated tech grid background */}
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/8 rounded-3xl"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <TechStack />
          </motion.div>

          {/* Projects with Dynamic Highlights */}
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Projects showcase background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-red-500/8 via-transparent to-red-500/5 rounded-3xl transform skew-y-1"
              animate={{
                skewY: [1, -1, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            {isMobile ? <MobileProjectList /> : <Projects />}
          </motion.div>

          {/* Resume with Professional Glow */}
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Professional document background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/10 rounded-3xl backdrop-blur-sm" />
            <Resume />
          </motion.div>

          {/* Timeline with Flow Effects */}
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Timeline flow background */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, 
                    transparent 0%, 
                    rgba(6, 182, 212, 0.05) 50%, 
                    transparent 100%
                  )
                `,
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <Timeline />
          </motion.div>

          {/* Contact with Final Flourish */}
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Contact celebration background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-pink-500/8 via-transparent to-pink-500/5 rounded-3xl"
              animate={{
                scale: [1, 1.01, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <Contact />
          </motion.div>

        </div>

        {/* Professional ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }} />
      </motion.section>
    </Layout>
  );
};

export default App;
