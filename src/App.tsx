import Layout from './components/Layout';
import MinimalistHero from './components/MinimalistHero';
import TerminalIntro from './components/TerminalIntro';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Resume from './components/Resume';
import Contact from './components/Contact';
import { motion } from 'framer-motion';
import CursorFollower from './components/CursorFollower';
import Navbar from './components/Navbar';
import EndOfScrollGradient from './components/EndOfScrollGradient';
import useResponsive from './hooks/useResponsive';


const App = () => {
  const responsive = useResponsive();
  const viewportAmount = responsive.isMobile ? 0.1 : 0.4;

  return (
    <div className="relative">
      <CursorFollower />
      <Navbar />
      <EndOfScrollGradient />
      <Layout>

        {/* New Minimalist Hero with Scroll-Locked Transitions */}
        <div id="hero">
          <MinimalistHero />
        </div>

        {/* Vibrant background for main content sections - restored */}
        <div className="fixed inset-0 -z-10 pointer-events-none" style={{ backgroundColor: '#0a0a0a' }}>
          {/* Rich, vibrant background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-850 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.25),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(239,68,68,0.25),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.18),transparent_50%)]"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  y: [0, -100, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content with Professional Transitions */}
        <motion.section 
          id="main-content" 
          className="relative z-10"
          style={{ marginTop: '0vh' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >

          {/* Professional content sections with seamless transitions */}
          <div className="relative z-10">
            
            {/* Spacer to give TerminalIntro more room before coming into focus */}
            <div className="h-[50vh]"></div>
            
            {/* Terminal Introduction */}
            <motion.section
              id="terminal-intro"
              className="relative min-h-screen flex items-center justify-center w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <div className="w-full">
                <TerminalIntro />
              </div>
            </motion.section>

            {/* About Section */}
            <motion.section
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <About />
            </motion.section>

            {/* Tech Stack */}
            <motion.section
              id="tech-stack"
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <TechStack />
            </motion.section>

            {/* Projects */}
            <motion.section
              id="projects"
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <Projects />
            </motion.section>

            {/* Resume */}
            <motion.section
              id="resume"
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <Resume />
            </motion.section>

            {/* Timeline */}
            <motion.section
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <Timeline />
            </motion.section>

            {/* Contact */}
            <motion.section
              id="contact"
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ amount: viewportAmount }}
            >
              <Contact />
            </motion.section>

          </div>
        </motion.section>

      </Layout>
    </div>
  );
};

export default App;
