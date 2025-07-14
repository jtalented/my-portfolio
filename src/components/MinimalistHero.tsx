import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';

const MinimalistHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const responsive = useResponsive();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Track when zoom animation is active
  const [isZooming, setIsZooming] = useState(false);

  // True zoom-in camera effect - diving into the square
  
  // Overall scene zoom - creates camera diving effect (more dramatic)
  const sceneScale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 0.9, 1], [1, 1, 3, 15, 50, 100]);
  const sceneRotate = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 10, 25, 45]);
  
  // Phase 1: JA text fades out quickly (0-0.3)
  const jaOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.3, 0]);
  
  // Phase 2: Square rotates as we zoom into it
  const logoX = useTransform(scrollYProgress, [0, 1], [0, 0]); // Stay centered
  const logoY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100]); // Move down slightly during scroll to help with zoom centering
  const logoScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1, 1, 1]); // Keep square same size, scene scales
  const logoRotate = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 90, 270, 360]);
  
  // Phase 3: Title moves left and shrinks as we zoom past it
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.4], [1, 1, 0.7, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.4], [1, 0.9, 0.6, 0.3]);
  const titleX = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.4], [0, -80, -300, -600]);
  const titleY = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.4], [0, -30, -100, -200]);
  
  // Phase 4: Subtitle moves right and shrinks as we zoom past it  
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.35], [1, 1, 0.6, 0]);
  const subtitleScale = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.35], [1, 0.9, 0.5, 0.2]);
  const subtitleX = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.35], [0, 100, 400, 800]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.35], [0, 40, 150, 300]);
  
  // Phase 5: Background emerges as we dive deeper
  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 0.7, 1]);
  const gradientOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.9, 1]);
  

  
  // Hero fade out for final transition  
  const heroFadeOut = useTransform(scrollYProgress, [0.85, 0.98, 1], [1, 0.3, 0]);

  // Check if animation is complete and track zooming state
  useEffect(() => {
    return scrollYProgress.onChange((value) => {
      setIsComplete(value >= 0.95);
      setIsZooming(value > 0.05 && value < 0.95);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Pinned content - zoom locked during animation */}
      <motion.div 
        className="fixed inset-0 h-screen w-full overflow-hidden bg-black z-50" 
        style={{ 
          backgroundColor: '#0a0a0a',
          opacity: heroFadeOut,
          pointerEvents: isZooming ? 'all' : 'none'
        }}
      >
        
        {/* Animated background gradients that emerge during scroll */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: bgOpacity }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-850 to-black"
            style={{ opacity: gradientOpacity }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.15),transparent_40%)]"
            style={{ opacity: gradientOpacity }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(239,68,68,0.15),transparent_40%)]"
            style={{ opacity: gradientOpacity }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)]"
            style={{ opacity: gradientOpacity }}
          />
        </motion.div>

        {/* Main content with camera zoom effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative"
            style={{ 
              scale: sceneScale,
              rotate: sceneRotate,
              transformOrigin: responsive.isMobile ? "50% 60%" : "50% 50%"
            }}
          >
          
          {/* Main centered content container */}
          <div className="flex flex-col items-center">
            
            {/* Morphing Logo/Symbol - positioned above the title */}
            <motion.div
              className="mb-8"
              style={{ 
                scale: logoScale,
                y: useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3, 1], [0, 40, 80, 120, 120]), // Move down after text starts moving to avoid overlap
                x: logoX,
                rotate: logoRotate
              }}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Geometric diamond symbol */}
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                                      style={{
                    background: 'linear-gradient(45deg, rgba(251,146,60,0.9), rgba(239,68,68,0.9), rgba(236,72,153,0.9))',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    filter: 'drop-shadow(0 0 40px rgba(251, 146, 60, 0.4))'
                  }}
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgba(251,146,60,0.9), rgba(239,68,68,0.9), rgba(236,72,153,0.9))',
                      'linear-gradient(45deg, rgba(236,72,153,0.9), rgba(251,146,60,0.9), rgba(239,68,68,0.9))',
                      'linear-gradient(45deg, rgba(239,68,68,0.9), rgba(236,72,153,0.9), rgba(251,146,60,0.9))',
                      'linear-gradient(45deg, rgba(251,146,60,0.9), rgba(239,68,68,0.9), rgba(236,72,153,0.9))'
                    ],
                  }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Inner glow effect */}
                  <motion.div
                    className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                    style={{ 
                      background: 'linear-gradient(45deg, rgba(251,146,60,0.3), rgba(239,68,68,0.3), rgba(236,72,153,0.3))',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      filter: 'blur(15px)',
                      opacity: 0.5
                    }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Centered initials that fade out */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: jaOpacity }}
                  >
                    <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mix-blend-overlay">
                      JA
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Title text - centered */}
            <motion.div
              className="text-center whitespace-nowrap"
              style={{ 
                opacity: titleOpacity,
                y: titleY,
                x: titleX,
                scale: titleScale
              }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-white">Jayden</span>{' '}
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Allen
                </span>
              </motion.h1>
            </motion.div>

            {/* Subtitle - positioned below the title */}
            <motion.div
              className="mt-8 text-center whitespace-nowrap"
              style={{ 
                opacity: subtitleOpacity,
                y: subtitleY,
                x: subtitleX,
                scale: subtitleScale
              }}
            >
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Full-Stack Developer & Digital Architect
              </motion.p>
              
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mt-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </motion.div>
            
          </div>
        </motion.div>
        </div>

        {/* Animated mouse scroll indicator - positioned relative to full screen */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0])
          }}
        >
          <div className="flex flex-col items-center text-gray-400 cursor-pointer group">
            {/* Mouse icon with downward animation */}
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center items-start bg-gray-800/50 backdrop-blur-sm group-hover:border-orange-400 transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ position: 'relative' }}
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2 group-hover:bg-orange-400 transition-colors"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>


      </motion.div>
    </div>
  );
};

export default MinimalistHero; 