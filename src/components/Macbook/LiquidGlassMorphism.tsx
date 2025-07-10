import { useEffect, useState } from 'react';

interface Props {}

const LiquidGlassMorphism = ({}: Props) => {
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
      // Also ensure full overflow is restored
      document.body.style.overflow = '';
    };
  }, []);

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