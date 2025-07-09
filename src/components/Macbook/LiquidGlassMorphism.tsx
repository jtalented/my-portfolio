import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  mousePosition: { x: number; y: number };
  scrollProgress: MotionValue<number>;
  opacity: MotionValue<number>;
}

const LiquidGlassMorphism = ({ mousePosition, scrollProgress, opacity }: Props) => {

  // Generate organic blob paths - more subtle sizes
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
    {
      id: 3,
      path: "M70,30 C90,15 130,35 150,70 C130,105 90,125 70,110 C50,95 30,75 30,55 C30,45 50,30 70,30 Z",
      size: { width: 320, height: 250 },
      position: { x: '75%', y: '60%' },
      color: 'rgba(6, 182, 212, 0.18)',
      animationDelay: 4,
    },
    {
      id: 4,
      path: "M50,25 C70,10 110,30 130,65 C110,100 70,120 50,105 C30,90 10,70 10,50 C10,40 30,25 50,25 Z",
      size: { width: 280, height: 220 },
      position: { x: '5%', y: '70%' },
      color: 'rgba(16, 185, 129, 0.14)',
      animationDelay: 6,
    },
  ], []);

  return (
    <div className="absolute inset-0 z-5 overflow-hidden">
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
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 5, -3, 0],
          }}
          transition={{
            duration: 20 + shape.animationDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.animationDelay,
          }}
        >
          {/* Main liquid shape */}
          <motion.div
            className="relative w-full h-full"
            style={{
              x: mousePosition.x * 20,
              y: mousePosition.y * 15,
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
              }}
            />

            {/* Animated SVG blob */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              style={{ filter: 'blur(1px)' }}
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

            {/* Additional glow layers */}
            <div 
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle at 40% 60%, ${shape.color} 0%, transparent 70%)`,
                transform: `scale(${1.2 + Math.sin(Date.now() / 2000) * 0.1})`,
              }}
            />
            
            {/* Floating highlight */}
            <motion.div
              className="absolute w-16 h-16 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                top: '20%',
                left: '30%',
              }}
              animate={{
                x: [0, 40, -20, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.3, 0.8, 1],
                opacity: [0.3, 0.6, 0.2, 0.3],
              }}
              transition={{
                duration: 12 + shape.animationDelay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.animationDelay * 0.5,
              }}
            />
          </motion.div>
                  </motion.div>
        ))}

      {/* Flowing gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(139, 92, 246, 0.05) 40%, 
              transparent 70%
            )
          `,
          opacity,
        }}
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LiquidGlassMorphism; 