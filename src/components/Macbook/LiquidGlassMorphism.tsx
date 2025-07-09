import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';
import { useMemo, useEffect, useRef, useState } from 'react';

interface Props {
  mousePosition: { x: number; y: number };
  scrollProgress: MotionValue<number>;
  opacity: MotionValue<number>;
}

const LiquidGlassMorphism = ({ mousePosition, scrollProgress, opacity }: Props) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detect large screens and disable animations to prevent flickering
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1440);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Prevent horizontal scrollbar
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  // Generate organic blob paths - reduced for better performance
  const liquidShapes = useMemo(() => [
    {
      id: 1,
      path: "M60,20 C80,10 120,30 140,60 C120,90 80,110 60,100 C40,90 20,70 20,40 C20,30 40,20 60,20 Z",
      size: { width: 400, height: 300 },
      position: { x: '10%', y: '20%' },
      color: 'rgba(59, 130, 246, 0.15)',
      animationDelay: 0,
    },
    {
      id: 2,
      path: "M80,40 C100,20 140,40 160,80 C140,120 100,140 80,120 C60,100 40,80 40,60 C40,50 60,40 80,40 Z",
      size: { width: 350, height: 280 },
      position: { x: '60%', y: '10%' },
      color: 'rgba(139, 92, 246, 0.12)',
      animationDelay: 2,
    },
  ], []);

  // If large screen, render simplified version without animations
  if (isLargeScreen) {
    return (
      <div 
        className="fixed inset-0 z-5 overflow-hidden pointer-events-none" 
        style={{ 
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Static gradient overlay for large screens */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 30% 30%, 
                rgba(59, 130, 246, 0.08) 0%, 
                transparent 70%
              ),
              radial-gradient(
                circle at 70% 70%, 
                rgba(139, 92, 246, 0.06) 0%, 
                transparent 70%
              )
            `,
            opacity: opacity.get(),
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-5 overflow-hidden pointer-events-none" 
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {liquidShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.position.x,
            top: shape.position.y,
            width: shape.size.width,
            height: shape.size.height,
            opacity,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.05, 0.95, 1],
            rotate: [0, 3, -2, 0],
          }}
          transition={{
            duration: 25 + shape.animationDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.animationDelay,
          }}
        >
          {/* Main liquid shape */}
          <div
            className="relative w-full h-full"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Backdrop blur container */}
            <div 
              className="absolute inset-0 backdrop-blur-xl rounded-full"
              style={{
                background: `linear-gradient(135deg, ${shape.color}, transparent 70%)`,
                clipPath: `polygon(
                  20% 0%, 
                  80% 10%, 
                  100% 40%, 
                  90% 80%, 
                  60% 100%, 
                  20% 90%, 
                  0% 60%, 
                  10% 20%
                )`,
                transform: 'translateZ(0)',
              }}
            />

            {/* Static SVG blob */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              style={{ 
                filter: 'blur(1px)', 
                transform: 'translateZ(0)',
              }}
            >
              <defs>
                <linearGradient id={`gradient-${shape.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={shape.color.replace('0.15', '0.3')} />
                  <stop offset="50%" stopColor={shape.color.replace('0.15', '0.2')} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                
                <filter id={`glow-${shape.id}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <path
                d={shape.path}
                fill={`url(#gradient-${shape.id})`}
                filter={`url(#glow-${shape.id})`}
              />
            </svg>

            {/* Static glow layer */}
            <div 
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle at 40% 60%, ${shape.color} 0%, transparent 70%)`,
                transform: 'translateZ(0) scale(1.1)',
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Static gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 30% 30%, 
              rgba(59, 130, 246, 0.1) 0%, 
              transparent 70%
            ),
            radial-gradient(
              circle at 70% 70%, 
              rgba(139, 92, 246, 0.08) 0%, 
              transparent 70%
            )
          `,
          opacity: opacity.get(),
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};

export default LiquidGlassMorphism; 