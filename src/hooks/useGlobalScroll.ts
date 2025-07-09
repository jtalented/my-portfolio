import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface GlobalScrollHook {
  scrollYProgress: MotionValue<number>;
  macbookScale: MotionValue<number>;
  macbookOpacity: MotionValue<number>;
  macbookX: MotionValue<number>;
  macbookY: MotionValue<number>;
  macbookRotationY: MotionValue<number>;
  macbookRotationX: MotionValue<number>;
  currentSection: MotionValue<number>;
}

export const useGlobalScroll = (): GlobalScrollHook => {
  const { scrollYProgress } = useScroll();

  // MacBook stays visible and integrated throughout the page
  // Starts large, gets smaller but stays prominent
  const macbookScale = useTransform(scrollYProgress, 
    [0, 0.1, 0.2, 0.4, 1], 
    [0.8, 0.7, 0.6, 0.5, 0.4]
  );
  
  // Always visible, never fades out completely
  const macbookOpacity = useTransform(scrollYProgress, 
    [0, 0.05, 1], 
    [0.4, 1, 0.9]
  );
  
  // X position: center -> right -> left -> right (integrated with content)
  // Using smaller values to keep it on screen
  const macbookX = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], 
    [0, 180, 180, -180, -180, 180, 0]
  );
  
  // Y position: follows page scroll naturally
  const macbookY = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [0, -50, 0, 50, 0, -30]
  );

  // Smooth rotation as it moves through sections
  const macbookRotationY = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], 
    [0, 0.2, 0.2, -0.2, -0.2, 0.2, 0]
  );

  // Subtle X-axis rotation for depth
  const macbookRotationX = useTransform(scrollYProgress, 
    [0, 0.3, 0.6, 1], 
    [0, 0.1, -0.1, 0]
  );

  // Section indicator (0-6 representing different sections)
  const currentSection = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], 
    [0, 1, 2, 3, 4, 5, 6, 6]
  );

  return {
    scrollYProgress,
    macbookScale,
    macbookOpacity,
    macbookX,
    macbookY,
    macbookRotationY,
    macbookRotationX,
    currentSection,
  };
}; 