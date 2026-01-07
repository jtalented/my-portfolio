import { useEffect, useState, useMemo } from 'react';

interface ResponsiveValues {
  isMobile: boolean;
  isTablet: boolean;
  macbookScale: number;
  macbookPosition: {
    x: number;
    y: number;
    z: number;
    rotationX: number;
  };
}

const useResponsive = (): ResponsiveValues => {
  const [screenSize, setScreenSize] = useState({
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
    const { width } = screenSize;
    
    // Breakpoint calculations
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1440;
    
    // MacBook scale adjustments
    const macbookScale = isMobile ? 0.6 : isTablet ? 0.8 : isDesktop ? 1.0 : 1.2;
    
    // Dynamic positioning based on screen size
    const macbookPosition = {
      x: 0,
      y: isMobile ? -0.3 : isTablet ? -0.5 : -0.8,
      z: 0,
      rotationX: 0.16
    };
    
    return {
      isMobile,
      isTablet,
      macbookScale,
      macbookPosition
    };
  }, [screenSize]);

  return responsiveValues;
};

export default useResponsive; 