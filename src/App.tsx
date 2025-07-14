import Layout from './components/Layout';
import Hero from './components/Macbook/Hero';

import TerminalIntro from './components/TerminalIntro';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Resume from './components/Resume';
import Contact from './components/Contact';
import { motion } from 'framer-motion';
import GlassTransition from './components/GlassTransition';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import CursorFollower from './components/CursorFollower';
import useResponsive from './hooks/useResponsive';


const App = () => {
  const [isScrollingFromHero, setIsScrollingFromHero] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrollDir(y > lastY ? 'down' : 'up');
      lastY = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Memoize mousePosition
  // const mousePosition = useMemo(() => ({ x: 0, y: 0 }), []); // This line was removed as per the edit hint.
  const responsive = useResponsive();
  const inViewAmount = (responsive.isMobile || responsive.isTablet) ? 0 : 0.4;

  return (
    <div className="relative">
      <CursorFollower />
      <Layout>


        {/* Professional Hero Section - positioned above global background */}
        <div className="relative z-30">
          <Hero isScrollingFromHero={isScrollingFromHero} setIsScrollingFromHero={setIsScrollingFromHero} />
        </div>



        {/* Extended Cinematic Transition Space - positioned above global background */}
        <motion.section 
          id="glass-transition" 
          className="relative z-20 min-h-[150vh] flex items-center justify-center overflow-hidden bg-black"
          style={{ backgroundColor: '#0a0a0a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Keep original black background for Glass Transition section */}
          <GlassTransition />
          {/* Cinematic Transition Content */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="max-w-2xl mx-auto px-6">
              <motion.div
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                TRANSITION
              </motion.div>
              
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent mx-auto mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.5 }}
                viewport={{ once: false, amount: 0.3 }}
              />
              
              <motion.p
                className="text-slate-400 text-lg md:text-xl font-mono tracking-wider mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                Entering the terminal...
              </motion.p>
              
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 2.5 }}
                viewport={{ once: false, amount: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Main Content with Professional Transitions - shows global background through */}
        <motion.section 
          id="main-content" 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Vibrant background for entire viewport - Hero/Glass Transition will layer black on top */}
          <div className="fixed inset-0 -z-10 pointer-events-none" style={{ backgroundColor: '#0a0a0a' }}>
            {/* Rich, vibrant background gradients always visible */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-850 to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.25),transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(239,68,68,0.25),transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.18),transparent_50%)]"></div>
            
            {/* Animated particles always visible */}
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
          {/* Professional content sections with seamless transitions */}
          <div className="relative z-10">
            
            {/* Terminal Introduction */}
            <motion.section
              id="terminal-intro"
              className="relative min-h-screen flex items-center justify-center w-full"
            >
              <div className="w-full">
                <TerminalIntro isScrollingFromHero={isScrollingFromHero} />
              </div>
            </motion.section>

            {/* About Section */}
            {(() => {
              const aboutRef = useRef(null);
              const aboutInView = useInView(aboutRef, { amount: inViewAmount, once: false });
              const [aboutLastInView, setAboutLastInView] = useState(false);
              const [aboutAnimState, setAboutAnimState] = useState({ opacity: 0, y: 50 });
              useEffect(() => {
                if (aboutInView && !aboutLastInView) {
                  setAboutAnimState({ opacity: 1, y: 0 });
                } else if (!aboutInView && aboutLastInView) {
                  setAboutAnimState(scrollDir === 'down' ? { opacity: 0, y: -50 } : { opacity: 0, y: 50 });
                }
                setAboutLastInView(aboutInView);
              }, [aboutInView, aboutLastInView, scrollDir]);
              return (
                <motion.section
                  ref={aboutRef}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={aboutAnimState}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <About />
                </motion.section>
              );
            })()}

            {/* Tech Stack */}
            {(() => {
              const techRef = useRef(null);
              const techInView = useInView(techRef, { amount: inViewAmount, once: false });
              const [techLastInView, setTechLastInView] = useState(false);
              const [techAnimState, setTechAnimState] = useState({ opacity: 0, y: 50 });
              useEffect(() => {
                if (techInView && !techLastInView) {
                  setTechAnimState({ opacity: 1, y: 0 });
                } else if (!techInView && techLastInView) {
                  setTechAnimState(scrollDir === 'down' ? { opacity: 0, y: -50 } : { opacity: 0, y: 50 });
                }
                setTechLastInView(techInView);
              }, [techInView, techLastInView, scrollDir]);
              return (
                <motion.section
                  ref={techRef}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={techAnimState}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <TechStack />
                </motion.section>
              );
            })()}

            {/* Projects */}
            {(() => {
              const projRef = useRef(null);
              const projInView = useInView(projRef, { amount: inViewAmount, once: false });
              const [projLastInView, setProjLastInView] = useState(false);
              const [projAnimState, setProjAnimState] = useState({ opacity: 0, y: 50 });
              useEffect(() => {
                if (projInView && !projLastInView) {
                  setProjAnimState({ opacity: 1, y: 0 });
                } else if (!projInView && projLastInView) {
                  setProjAnimState(scrollDir === 'down' ? { opacity: 0, y: -50 } : { opacity: 0, y: 50 });
                }
                setProjLastInView(projInView);
              }, [projInView, projLastInView, scrollDir]);
              return (
                <motion.section
                  ref={projRef}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={projAnimState}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Projects />
                </motion.section>
              );
            })()}

            {/* Resume */}
            {(() => {
              const resumeRef = useRef(null);
              const resumeInView = useInView(resumeRef, { amount: inViewAmount, once: false });
              const [resumeLastInView, setResumeLastInView] = useState(false);
              const [resumeAnimState, setResumeAnimState] = useState({ opacity: 0, y: 50 });
              useEffect(() => {
                if (resumeInView && !resumeLastInView) {
                  setResumeAnimState({ opacity: 1, y: 0 });
                } else if (!resumeInView && resumeLastInView) {
                  setResumeAnimState(scrollDir === 'down' ? { opacity: 0, y: -50 } : { opacity: 0, y: 50 });
                }
                setResumeLastInView(resumeInView);
              }, [resumeInView, resumeLastInView, scrollDir]);
              return (
                <motion.section
                  ref={resumeRef}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={resumeAnimState}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Resume />
                </motion.section>
              );
            })()}

            {/* Timeline */}
            {(() => {
              const timelineRef = useRef(null);
              const timelineInView = useInView(timelineRef, { amount: inViewAmount, once: false });
              const [timelineLastInView, setTimelineLastInView] = useState(false);
              const [timelineAnimState, setTimelineAnimState] = useState({ opacity: 0, y: 50 });
              useEffect(() => {
                if (timelineInView && !timelineLastInView) {
                  setTimelineAnimState({ opacity: 1, y: 0 });
                } else if (!timelineInView && timelineLastInView) {
                  setTimelineAnimState(scrollDir === 'down' ? { opacity: 0, y: -50 } : { opacity: 0, y: 50 });
                }
                setTimelineLastInView(timelineInView);
              }, [timelineInView, timelineLastInView, scrollDir]);
              return (
                <motion.section
                  ref={timelineRef}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={timelineAnimState}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Timeline />
                </motion.section>
              );
            })()}

            {/* Contact */}
            {(() => {
              const contactRef = useRef(null);
              const contactInView = useInView(contactRef, { amount: inViewAmount, once: false });
              const [contactLastInView, setContactLastInView] = useState(false);
              const [contactAnimState, setContactAnimState] = useState({ opacity: 0, y: 50 });
              useEffect(() => {
                if (contactInView && !contactLastInView) {
                  setContactAnimState({ opacity: 1, y: 0 });
                } else if (!contactInView && contactLastInView) {
                  setContactAnimState(scrollDir === 'down' ? { opacity: 0, y: -50 } : { opacity: 0, y: 50 });
                }
                setContactLastInView(contactInView);
              }, [contactInView, contactLastInView, scrollDir]);
              return (
                <motion.section
                  ref={contactRef}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={contactAnimState}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Contact />
                </motion.section>
              );
            })()}

          </div>
        </motion.section>
      </Layout>
    </div>
  );
};

export default App;
