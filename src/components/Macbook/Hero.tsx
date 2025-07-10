import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import LiquidGlassMorphism from './LiquidGlassMorphism';
import useResponsive from '../../hooks/useResponsive';
import { useScrollLock } from '../../hooks/useScrollLock';

const Hero = () => {
  const [isScrollingFromHero, setIsScrollingFromHero] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const responsive = useResponsive();
  const { lockScroll, unlockScroll } = useScrollLock();

  const { scrollYProgress } = useScroll({
    layoutEffect: false,
  });

  // Smooth spring animations
  const smoothTextY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = () => {
      if (!responsive.isMobile && heroRef.current) {
        // No-op, mouse tracking removed
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [responsive.isMobile]);

  // Scroll detection for hero section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const heroElement = heroRef.current;
      
      if (!heroElement || isScrollingFromHero) return;
      
      const heroRect = heroElement.getBoundingClientRect();
      const isInHeroSection = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
      
      // Check if we're scrolling down in the hero section (when hero is visible and we're near the top)
      if (isInHeroSection && currentScrollY > lastScrollY && currentScrollY < window.innerHeight) {
        setIsScrollingFromHero(true);
        scrollToMainContent(() => {
          setIsScrollingFromHero(false);
        });
      }
      
      // Check if we're scrolling up from the portfolio loaded section back to hero
      const portfolioLoadedSection = document.getElementById('glass-transition');
      if (portfolioLoadedSection && currentScrollY < lastScrollY) {
        const portfolioRect = portfolioLoadedSection.getBoundingClientRect();
        const isInPortfolioSection = portfolioRect.bottom > 0 && portfolioRect.top < window.innerHeight;
        
        // Only trigger when we're in the portfolio section and scrolling up
        if (isInPortfolioSection && currentScrollY > window.innerHeight) {
          setIsScrollingFromHero(true);
          scrollToHero(() => {
            setIsScrollingFromHero(false);
          });
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isScrollingFromHero]);


  const scrollToMainContent = (onComplete?: () => void) => {
    const target = document.getElementById('main-content');
    if (target) {
      const targetPosition = target.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 4000; // 4 seconds for slower scroll
      let start: number | null = null;

      // Lock scroll during animation
      lockScroll();

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Unlock scroll and call the completion callback if provided
          unlockScroll();
          if (onComplete) onComplete();
        }
      };

      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };

      requestAnimationFrame(animation);
    } else {
      if (onComplete) onComplete();
    }
  };

  const scrollToHero = (onComplete?: () => void) => {
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 4000; // 4 seconds for slower scroll
    let start: number | null = null;

    // Lock scroll during animation
    lockScroll();

    // Custom ease: slow down more in the last half
    const customEase = (t: number, b: number, c: number, d: number) => {
      t /= d;
      if (t < 0.7) {
        // First 70%: normal cubic ease
        return c * (t * t * (3 - 2 * t)) + b;
      } else {
        // Last 30%: slow down more
        const slowT = (t - 0.7) / 0.3;
        return c * (0.7 * 0.7 * (3 - 2 * 0.7) + (1 - 0.7 * 0.7 * (3 - 2 * 0.7)) * (slowT * slowT * (3 - 2 * slowT))) + b;
      }
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = customEase(Math.min(timeElapsed, duration), startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Unlock scroll and call the completion callback if provided
        unlockScroll();
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900/50 to-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Dynamic geometric pattern */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.12) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Tech grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 146, 60, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 146, 60, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated circuit lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"
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
      <LiquidGlassMorphism />

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
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight relative z-10">
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-red-300 to-pink-400 bg-clip-text text-transparent"
              style={{ 
                backgroundSize: '400% 400%',
                filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.3))'
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
                className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-400"
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
          <motion.div 
            className="relative p-8 backdrop-blur-md rounded-2xl border border-blue-500/20 cursor-pointer group"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400 group-hover:border-blue-300 transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400 group-hover:border-blue-300 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400 group-hover:border-blue-300 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400 group-hover:border-blue-300 transition-colors duration-300" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-transparent to-cyan-500/8 rounded-2xl" />
            
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 relative z-10"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span 
                className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent relative"
                whileHover={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                  transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Full Stack Developer
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-300 max-w-2xl relative z-10"
              whileHover={{ 
                scale: 1.02,
                color: '#e2e8f0',
                transition: { duration: 0.2 }
              }}
            >
              Building tomorrow's applications with cutting-edge technology
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.button
            onClick={() => scrollToMainContent()}
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
