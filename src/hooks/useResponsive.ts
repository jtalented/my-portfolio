import { useEffect, useState, useMemo } from 'react';

interface ScreenSize {
  width: number;
  height: number;
}

interface ResponsiveValues {
  // Breakpoints
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  
  // Screen dimensions
  screenSize: ScreenSize;
  viewportWidth: number;
  viewportHeight: number;
  
  // Responsive scaling factors
  scaleFactor: number;
  macbookScale: number;
  
  // MacBook positioning and sizing
  macbookPosition: {
    x: number;
    y: number;
    z: number;
    rotationX: number;
  };
  
  // MacBook path end position
  macbookEndX: number;
  
  // Screen dimensions for MacBook
  screenDimensions: {
    backgroundWidth: number;
    backgroundHeight: number;
    uiWidth: number;
    uiHeight: number;
    distanceFactor: number;
  };
  
  // Canvas and camera settings
  canvasSettings: {
    cameraPosition: [number, number, number];
    cameraFov: number;
    canvasWidth: string;
    canvasHeight: string;
  };
  
  // Animation timing
  animationTiming: {
    glassBreakStart: number;
    glassBreakEnd: number;
    glassShatterStart: number;
    glassShatterEnd: number;
    glassDisperseStart: number;
    glassDisperseEnd: number;
  };
  
  // Particle and effect counts
  effectCounts: {
    glassParticles: number;
    floatingParticles: number;
    reflectionLines: number;
  };
  
  // Blur and filter settings
  blurSettings: {
    glassBlur: number;
    backgroundBlur: number;
    particleBlur: number;
  };
}

const useResponsive = (): ResponsiveValues => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const responsiveValues = useMemo((): ResponsiveValues => {
    const { width, height } = screenSize;
    
    // Breakpoint calculations
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1440;
    const isLargeDesktop = width >= 1440;
    
    // Responsive scaling based on screen size
    const baseScale = Math.min(width / 1920, height / 1080);
    const scaleFactor = Math.max(0.5, Math.min(1.5, baseScale));
    
    // MacBook scale adjustments
    const macbookScale = isMobile ? 0.6 : isTablet ? 0.8 : isDesktop ? 1.0 : 1.2;
    
    // Dynamic positioning based on screen size
    const macbookPosition = {
      x: 0,
      y: isMobile ? -0.3 : isTablet ? -0.5 : -0.8,
      z: 0,
      rotationX: 0.16
    };
    
    // Responsive screen dimensions
    const baseScreenWidth = 1223;
    const baseScreenHeight = 810;
    const baseUIWidth = 900;
    const baseUIHeight = 560;
    
    const screenDimensions = {
      backgroundWidth: Math.round(baseScreenWidth * scaleFactor),
      backgroundHeight: Math.round(baseScreenHeight * scaleFactor),
      uiWidth: Math.round(baseUIWidth * scaleFactor),
      uiHeight: Math.round(baseUIHeight * scaleFactor),
      distanceFactor: isMobile ? 1.0 : isTablet ? 1.1 : 1.2
    };
    
    // Canvas and camera settings
    const canvasSettings = {
      cameraPosition: (isMobile ? [0, 1.6, 8] : isTablet ? [0, 1.6, 6] : [0, 1.6, 4]) as [number, number, number],
      cameraFov: isMobile ? 30 : isTablet ? 26 : 35,
      canvasWidth: isMobile ? 'min(400px, 80vw)' : isTablet ? 'min(800px, 85vw)' : 'min(1200px, 90vw)',
      canvasHeight: isMobile ? 'min(300px, 60vw)' : isTablet ? 'min(600px, 65vw)' : 'min(900px, 67.5vw)'
    };
    
    // Animation timing - faster on mobile
    const animationTiming = {
      glassBreakStart: isMobile ? 0.002 : 0.01,
      glassBreakEnd: isMobile ? 0.05 : 0.12,
      glassShatterStart: isMobile ? 0.05 : 0.12,
      glassShatterEnd: isMobile ? 0.10 : 0.22,
      glassDisperseStart: isMobile ? 0.10 : 0.22,
      glassDisperseEnd: isMobile ? 0.18 : 0.32
    };
    
    // Effect counts - fewer on mobile for performance
    const effectCounts = {
      glassParticles: isMobile ? 8 : isTablet ? 12 : 15,
      floatingParticles: isMobile ? 10 : isTablet ? 12 : 15,
      reflectionLines: isMobile ? 4 : isTablet ? 5 : 6
    };
    
    // Blur settings - less blur on mobile for performance
    const blurSettings = {
      glassBlur: isMobile ? 4 : isTablet ? 8 : 12,
      backgroundBlur: isMobile ? 6 : isTablet ? 10 : 14,
      particleBlur: isMobile ? 2 : isTablet ? 3 : 4
    };
    
    // MacBook path end position
    const macbookEndX = isMobile ? 0.5 : isTablet ? 0.7 : isDesktop ? 0.9 : 1.1;
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      screenSize,
      viewportWidth: width,
      viewportHeight: height,
      scaleFactor,
      macbookScale,
      macbookPosition,
      macbookEndX,
      screenDimensions,
      canvasSettings,
      animationTiming,
      effectCounts,
      blurSettings
    };
  }, [screenSize]);

  return responsiveValues;
};

export default useResponsive; 