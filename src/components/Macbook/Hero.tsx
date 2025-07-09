import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import LiquidGlassMorphism from './LiquidGlassMorphism';
import useIsMobile from '../../hooks/useIsMobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
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
      if (!isMobile && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const scrollToMainContent = () => {
    const target = document.getElementById('main-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        {/* Tech stack grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {[
            { tech: 'React', years: '3+', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
            { tech: 'TypeScript', years: '2+', icon: '📘', color: 'from-blue-400 to-indigo-500' },
            { tech: 'Node.js', years: '3+', icon: '🟢', color: 'from-green-400 to-emerald-500' },
            { tech: 'Cloud', years: '2+', icon: '☁️', color: 'from-purple-400 to-pink-500' }
          ].map((item, index) => (
            <motion.div
              key={item.tech}
              className="group relative p-4 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 2.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Tech glow background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-xl group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Circuit pattern */}
              <div className="absolute top-2 right-2 w-4 h-4 border border-blue-400/30 rounded-sm">
                <div className="absolute inset-1 border border-blue-400/20 rounded-sm" />
              </div>
              
              <div className="relative z-10">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-sm font-bold text-slate-200 mb-1">{item.tech}</div>
                <div className="text-xs text-slate-400">{item.years} years</div>
              </div>

              {/* Hover circuit animation */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{
                  background: [
                    'linear-gradient(0deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                    'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                    'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                    'linear-gradient(270deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Modern scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
          }}
        >
          <motion.button
            onClick={scrollToMainContent}
            className="group relative p-4 backdrop-blur-md rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Tech frame */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10" />
            
            <motion.div
              className="w-6 h-10 border-2 border-blue-400 rounded-full relative overflow-hidden"
              whileHover={{ borderColor: '#60a5fa' }}
            >
              <motion.div
                className="w-1 h-3 bg-blue-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              EXPLORE
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Ambient tech lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Corner tech accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-400/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-400/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-blue-400/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-400/30" />
    </section>
  );
};

export default Hero;
