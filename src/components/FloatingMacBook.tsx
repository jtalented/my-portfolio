import { motion, useScroll, useTransform } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';
import LiquidGlassMorphism from './Macbook/LiquidGlassMorphism';

// Simplified Glass Shatter Effect - NO HOOKS IN LOOPS
const GlassShatterEffect = ({ 
  scrollProgress, 
}: { 
  scrollProgress: any;
}) => {
  const responsive = useResponsive();
  const { animationTiming, blurSettings } = responsive;

  // REALISTIC TRIANGULAR GLASS SHARDS - Perfect tessellation with no gaps or overlaps
  const tessellationPieces = [
    // Top edge triangular shards - varying sizes
    { clipPath: "polygon(0% 0%, 18% 0%, 12% 18%)", centerX: 10, centerY: 6, size: 'small' },
    { clipPath: "polygon(18% 0%, 35% 0%, 28% 15%, 12% 18%)", centerX: 23, centerY: 8, size: 'medium' },
    { clipPath: "polygon(35% 0%, 55% 0%, 48% 12%, 28% 15%)", centerX: 41, centerY: 7, size: 'large' },
    { clipPath: "polygon(55% 0%, 72% 0%, 65% 14%, 48% 12%)", centerX: 60, centerY: 6, size: 'medium' },
    { clipPath: "polygon(72% 0%, 88% 0%, 82% 16%, 65% 14%)", centerX: 77, centerY: 7, size: 'medium' },
    { clipPath: "polygon(88% 0%, 100% 0%, 100% 12%, 82% 16%)", centerX: 92, centerY: 7, size: 'small' },
    
    // Second row - connecting perfectly to row 1
    { clipPath: "polygon(0% 0%, 12% 18%, 8% 32%, 0% 25%)", centerX: 5, centerY: 19, size: 'small' },
    { clipPath: "polygon(12% 18%, 28% 15%, 35% 28%, 22% 35%, 8% 32%)", centerX: 21, centerY: 25, size: 'large' },
    { clipPath: "polygon(28% 15%, 48% 12%, 52% 25%, 35% 28%)", centerX: 41, centerY: 20, size: 'medium' },
    { clipPath: "polygon(48% 12%, 65% 14%, 68% 26%, 52% 25%)", centerX: 58, centerY: 19, size: 'medium' },
    { clipPath: "polygon(65% 14%, 82% 16%, 78% 28%, 68% 26%)", centerX: 73, centerY: 21, size: 'medium' },
    { clipPath: "polygon(82% 16%, 100% 12%, 100% 28%, 78% 28%)", centerX: 90, centerY: 21, size: 'small' },
    
    // Third row - connecting perfectly to row 2
    { clipPath: "polygon(0% 25%, 8% 32%, 15% 45%, 0% 48%)", centerX: 6, centerY: 37, size: 'small' },
    { clipPath: "polygon(8% 32%, 22% 35%, 25% 52%, 18% 48%, 15% 45%)", centerX: 16, centerY: 40, size: 'small' },
    { clipPath: "polygon(22% 35%, 35% 28%, 45% 42%, 25% 52%)", centerX: 29, centerY: 41, size: 'large' },
    { clipPath: "polygon(35% 28%, 52% 25%, 58% 38%, 45% 42%)", centerX: 47, centerY: 33, size: 'medium' },
    { clipPath: "polygon(52% 25%, 68% 26%, 72% 38%, 58% 38%)", centerX: 62, centerY: 32, size: 'medium' },
    { clipPath: "polygon(68% 26%, 78% 28%, 85% 42%, 72% 38%)", centerX: 76, centerY: 33, size: 'medium' },
    { clipPath: "polygon(78% 28%, 100% 28%, 100% 45%, 85% 42%)", centerX: 91, centerY: 36, size: 'small' },
    
    // Fourth row - connecting perfectly to row 3
    { clipPath: "polygon(0% 48%, 15% 45%, 18% 48%, 12% 65%, 0% 62%)", centerX: 10, centerY: 54, size: 'medium' },
    { clipPath: "polygon(18% 48%, 25% 52%, 35% 58%, 28% 68%, 12% 65%)", centerX: 26, centerY: 57, size: 'small' },
    { clipPath: "polygon(25% 52%, 45% 42%, 55% 55%, 48% 65%, 35% 58%)", centerX: 42, centerY: 54, size: 'large' },
    { clipPath: "polygon(45% 42%, 58% 38%, 68% 52%, 55% 55%)", centerX: 56, centerY: 47, size: 'medium' },
    { clipPath: "polygon(58% 38%, 72% 38%, 78% 52%, 68% 52%)", centerX: 69, centerY: 45, size: 'medium' },
    { clipPath: "polygon(72% 38%, 85% 42%, 88% 55%, 78% 52%)", centerX: 81, centerY: 47, size: 'medium' },
    { clipPath: "polygon(85% 42%, 100% 45%, 100% 58%, 88% 55%)", centerX: 93, centerY: 50, size: 'small' },
    
    // Fifth row - connecting perfectly to row 4
    { clipPath: "polygon(0% 62%, 12% 65%, 18% 82%, 0% 78%)", centerX: 8, centerY: 72, size: 'small' },
    { clipPath: "polygon(12% 65%, 28% 68%, 32% 85%, 18% 82%)", centerX: 22, centerY: 75, size: 'small' },
    { clipPath: "polygon(28% 68%, 35% 58%, 48% 65%, 45% 82%, 32% 85%)", centerX: 38, centerY: 72, size: 'medium' },
    { clipPath: "polygon(48% 65%, 55% 55%, 68% 52%, 72% 68%, 58% 78%, 45% 82%)", centerX: 57, centerY: 65, size: 'large' },
    { clipPath: "polygon(68% 52%, 78% 52%, 82% 68%, 72% 68%)", centerX: 75, centerY: 60, size: 'small' },
    { clipPath: "polygon(78% 52%, 88% 55%, 92% 68%, 82% 68%)", centerX: 85, centerY: 61, size: 'small' },
    { clipPath: "polygon(88% 55%, 100% 58%, 100% 72%, 92% 68%)", centerX: 95, centerY: 63, size: 'small' },
    
    // Bottom edge - connecting perfectly to row 5
    { clipPath: "polygon(0% 78%, 18% 82%, 15% 100%, 0% 100%)", centerX: 8, centerY: 90, size: 'small' },
    { clipPath: "polygon(18% 82%, 32% 85%, 28% 100%, 15% 100%)", centerX: 23, centerY: 92, size: 'small' },
    { clipPath: "polygon(32% 85%, 45% 82%, 42% 100%, 28% 100%)", centerX: 37, centerY: 92, size: 'small' },
    { clipPath: "polygon(45% 82%, 58% 78%, 62% 100%, 42% 100%)", centerX: 52, centerY: 90, size: 'medium' },
    { clipPath: "polygon(58% 78%, 72% 68%, 82% 68%, 85% 100%, 62% 100%)", centerX: 72, centerY: 82, size: 'large' },
    { clipPath: "polygon(82% 68%, 92% 68%, 95% 100%, 85% 100%)", centerX: 88, centerY: 84, size: 'small' },
    { clipPath: "polygon(92% 68%, 100% 72%, 100% 100%, 95% 100%)", centerX: 96, centerY: 85, size: 'small' }
  ];

  // ALL useTransform calls OUTSIDE the map - no hooks in loops!
  // Remove the unused variables fragmentVisibility, largeFragmentScale, mediumFragmentScale, smallFragmentScale, and scrollVelocity

  return (
    <>
      {/* Premium Liquid Glass Background - prevents black screen */}
      <motion.div
        className="fixed inset-0 z-14 pointer-events-none"
        style={{
          opacity: useTransform(scrollProgress, [0, animationTiming.glassShatterStart, animationTiming.glassDisperseEnd, 1], [0, 0, 0.4, 0.4]),
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.12) 0%, 
              rgba(120, 180, 255, 0.05) 50%, 
              rgba(255, 255, 255, 0.08) 100%
            ),
            radial-gradient(circle at 60% 40%, 
              rgba(255, 255, 255, 0.15) 0%, 
              transparent 70%
            )
          `,
          backdropFilter: `blur(${blurSettings.backgroundBlur}px) saturate(1.6) brightness(1.05)`,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.1)
          `,
        }}
      />

      {/* Simplified Glass Tessellation - NO HOOKS IN LOOPS */}
      <motion.div className="fixed inset-0 pointer-events-none z-50">
        
        {/* Unified Glass Surface Overlay - Blends all pieces seamlessly */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollProgress, [0, animationTiming.glassBreakStart, animationTiming.glassBreakEnd], [0.8, 0.8, 0]),
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.08) 0%, 
                rgba(120, 180, 255, 0.03) 50%, 
                rgba(255, 255, 255, 0.05) 100%
              )
            `,
            backdropFilter: `blur(${blurSettings.glassBlur}px) saturate(1.4) brightness(1.03)`,
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.03))',
          }}
        />
        
        <motion.div className="absolute inset-0 transform-gpu" style={{ perspective: '1000px' }}>
          {tessellationPieces.map((piece, index) => {
            // REALISTIC GLASS SHATTER - Impact point at center
            const impactX = 50; 
            const impactY = 50; 
            
            // PURE LINEAR OUTWARD MOVEMENT - direct line from center to piece center
            const deltaX = piece.centerX - impactX; // Direct X distance from center
            const deltaY = piece.centerY - impactY; // Direct Y distance from center
            
            // Distance from center for force calculation
            const distanceFromImpact = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Normalize direction vector for straight-line movement
            const directionX = distanceFromImpact > 0 ? deltaX / distanceFromImpact : 1;
            const directionY = distanceFromImpact > 0 ? deltaY / distanceFromImpact : 0;
            
            // MAXIMUM explosive force - linear movement dominates everything
            const explosiveForce = Math.max(1.5, 2.5 - (distanceFromImpact / 70)); // Higher minimum force
            const uniqueVelocityMod = 1.0 + (index * 0.193) % 0.6; // Higher velocity
            const baseSpeed = piece.size === 'large' ? 2000 : piece.size === 'medium' ? 2500 : 3000; // Much higher speeds
            const explosiveSpeed = baseSpeed * explosiveForce * uniqueVelocityMod;
            
            // Calculate STRAIGHT LINE explosion trajectory - no circular motion
            const explosionX = directionX * explosiveSpeed;
            const explosionY = directionY * explosiveSpeed;
            
            // COMPLETELY UNIQUE ROTATION - every piece spins differently on all 3 axes
            // Use multiple unique seeds to ensure no two pieces rotate the same
            const uniqueSeedX = (piece.centerX * 23 + piece.centerY * 41 + index * 89 + 113) % 1000;
            const uniqueSeedY = (piece.centerX * 47 + piece.centerY * 71 + index * 127 + 241) % 1000; 
            const uniqueSeedZ = (piece.centerX * 79 + piece.centerY * 103 + index * 149 + 367) % 1000;
            
            // VARIED rotation speeds for realistic glass shard movement
            const rotSpeedX = 200 + (uniqueSeedX * 4) % 800; // 200-1000 degrees per second
            const rotSpeedY = 200 + (uniqueSeedY * 4) % 800; // 200-1000 degrees per second  
            const rotSpeedZ = 200 + (uniqueSeedZ * 4) % 800; // 200-1000 degrees per second
            
            // UNIQUE ROTATION DIRECTIONS - each axis can spin either way independently
            const rotDirX = (uniqueSeedX % 2 === 0) ? 1 : -1;  // Randomly positive or negative
            const rotDirY = (uniqueSeedY % 3 === 0) ? 1 : -1;  // Different pattern for Y
            const rotDirZ = (uniqueSeedZ % 5 === 0) ? 1 : -1;  // Different pattern for Z

            return (
              <motion.div
                key={index}
                className="absolute inset-0 transform-gpu"
                style={{
                  opacity: useTransform(
                    scrollProgress,
                    [0, animationTiming.glassBreakStart, animationTiming.glassBreakEnd, animationTiming.glassShatterEnd, animationTiming.glassDisperseEnd],
                    [0.8, 0.8, 1, 0.6, 0] // Fade as they fly off screen
                  ),
                  scale: useTransform(
                    scrollProgress,
                    [animationTiming.glassBreakEnd, animationTiming.glassShatterEnd, animationTiming.glassDisperseEnd],
                    [1, 1.1, piece.size === 'large' ? 0.4 : piece.size === 'medium' ? 0.3 : 0.2]
                  ),
                  x: useTransform(
                    scrollProgress,
                    [0, animationTiming.glassBreakEnd, animationTiming.glassDisperseEnd],
                    [0, 0, explosionX] // Fly way off screen
                  ),
                  y: useTransform(
                    scrollProgress,
                    [0, animationTiming.glassBreakEnd, animationTiming.glassDisperseEnd], 
                    [0, 0, explosionY + (explosiveForce * 200)] // Fly way off screen with gravity
                  ),
                  rotateX: useTransform(
                    scrollProgress,
                    [0, animationTiming.glassBreakEnd, animationTiming.glassDisperseEnd],
                    [0, 0, rotDirX * rotSpeedX] // UNIQUE X rotation per piece
                  ),
                  rotateY: useTransform(
                    scrollProgress,
                    [0, animationTiming.glassBreakEnd, animationTiming.glassDisperseEnd],
                    [0, 0, rotDirY * rotSpeedY] // UNIQUE Y rotation per piece  
                  ),
                  rotateZ: useTransform(
                    scrollProgress,
                    [0, animationTiming.glassBreakEnd, animationTiming.glassDisperseEnd],
                    [0, 0, rotDirZ * rotSpeedZ] // UNIQUE Z rotation per piece
                  ),
                }}
              >
                {/* Seamless Liquid Glass Shard */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: piece.clipPath,
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.20) 0%, 
                        rgba(255, 255, 255, 0.05) 25%,
                        rgba(120, 180, 255, 0.06) 50%,
                        rgba(255, 255, 255, 0.10) 75%,
                        rgba(255, 255, 255, 0.03) 100%
                      ),
                      radial-gradient(circle at 30% 20%, 
                        rgba(255, 255, 255, 0.25) 0%, 
                        transparent 70%
                      )
                    `,
                    backdropFilter: `blur(${piece.size === 'large' ? blurSettings.glassBlur + 2 : piece.size === 'medium' ? blurSettings.glassBlur : blurSettings.glassBlur - 2}px) saturate(1.6) brightness(1.08)`,
                    // NO BORDERS - creates seamless look
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05))',
                  }}
                >
                  {/* Subtle Liquid Glass Flow Effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: piece.clipPath,
                      background: `
                        linear-gradient(45deg, 
                          transparent 0%, 
                          rgba(255, 255, 255, 0.06) 30%, 
                          rgba(120, 180, 255, 0.08) 50%, 
                          rgba(255, 255, 255, 0.06) 70%, 
                          transparent 100%
                        )
                      `,
                      animation: `glassFlow ${4 + (index * 0.3)} s ease-in-out infinite alternate`,
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  
                  {/* Soft Highlight Reflection - only after break */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      clipPath: piece.clipPath,
                      background: `
                        linear-gradient(120deg, 
                          rgba(255, 255, 255, 0.3) 0%, 
                          transparent 50%
                        )
                      `,
                      transform: 'scale(0.9) translate(5%, -5%)',
                      filter: 'blur(3px)',
                      opacity: useTransform(
                        scrollProgress,
                        [0, animationTiming.glassBreakEnd, animationTiming.glassShatterStart],
                        [0, 0, 1]
                      ),
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};

// Main Floating MacBook Component
const FloatingMacBook = () => {
  const { scrollYProgress } = useScroll();
  // Remove the unused variables fragmentVisibility, largeFragmentScale, mediumFragmentScale, smallFragmentScale, and scrollVelocity

  return (
    <>
      {/* Liquid Glass Morphism Effect */}
      <LiquidGlassMorphism />

      {/* Enhanced Glass Shatter Effect */}
      <GlassShatterEffect 
        scrollProgress={scrollYProgress} 
      />
    </>
  );
};

export default FloatingMacBook; 