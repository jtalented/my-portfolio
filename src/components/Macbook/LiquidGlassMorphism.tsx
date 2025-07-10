import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';
import { useMemo, useEffect, useRef, useState } from 'react';
import useResponsive from '../../hooks/useResponsive';

interface Props {
  mousePosition: { x: number; y: number };
  scrollProgress: MotionValue<number>;
  opacity: MotionValue<number>;
}

const LiquidGlassMorphism = ({ mousePosition, scrollProgress, opacity }: Props) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const responsive = useResponsive();

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
      // Also ensure full overflow is restored
      document.body.style.overflow = '';
    };
  }, []);

  // Generate organic blob paths - reduced for better performance
  const liquidShapes = useMemo(() => [
    // No blue or purple blobs
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
        {/* Static gradient overlay for large screens - no blue or purple */}
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
      {/* No blobs rendered here anymore */}
      {/* Static gradient overlay and other effects remain untouched */}
    </div>
  );
};

export default LiquidGlassMorphism; 