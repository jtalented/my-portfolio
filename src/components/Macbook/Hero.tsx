import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import LiquidGlassMorphism from './LiquidGlassMorphism';
import useResponsive from '../../hooks/useResponsive';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const responsive = useResponsive();

  const { scrollYProgress } = useScroll({
    layoutEffect: false,
  });

  // Professional scroll-based animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const glassOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6], [0.9, 1, 0.3]);
  
  // Glass overlay effect that disappears when shattered
  const glassOverlayOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [0.6, 0.8, 0]);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothTextY = useSpring(textY, springConfig);
  const smoothOpacity = useSpring(heroOpacity, springConfig);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!responsive.isMobile && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [responsive.isMobile]);

  const scrollToMainContent = () => {
    const target = document.getElementById('main-content');
    if (target) {
      const targetPosition = target.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 3000; // 3 seconds for slower scroll
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Dynamic geometric pattern */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Tech grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated circuit lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '0%',
              width: '100%',
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Liquid Glass Morphism */}
      <LiquidGlassMorphism 
        mousePosition={mousePosition}
        scrollProgress={scrollYProgress}
        opacity={glassOpacity}
      />

      {/* Modern Hero Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20"
        style={{ y: smoothTextY }}
      >
        {/* Tech-inspired name display */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Geometric accent */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight relative z-10">
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent"
              style={{ 
                backgroundSize: '400% 400%',
                filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))'
              }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
          Jayden Allen
            </motion.span>
          </h1>

          {/* Tech accent lines */}
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Professional title with tech aesthetic */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="relative p-8 backdrop-blur-md rounded-2xl border border-blue-500/20">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-transparent to-cyan-500/8 rounded-2xl" />
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Senior Full-Stack Developer
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl">
              Building tomorrow's applications with cutting-edge technology
            </p>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.button
            onClick={scrollToMainContent}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm border border-blue-500/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
          
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-gray-800/60 hover:bg-gray-700/60 text-white font-semibold rounded-lg transition-all duration-300 border-2 border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default Hero;
