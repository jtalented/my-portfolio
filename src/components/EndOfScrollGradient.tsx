import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EndOfScrollGradient = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [overScrollIntensity, setOverScrollIntensity] = useState(0);
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let overScrollAttempts = 0;
    let hideTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the bottom
      const atBottom = scrollY + windowHeight >= documentHeight - 10;
      setIsAtBottom(atBottom);

      // If at bottom and trying to scroll down further
      if (atBottom && scrollY >= lastScrollY) {
        overScrollAttempts += 1;
        const intensity = Math.min(overScrollAttempts * 0.1, 1);
        setOverScrollIntensity(intensity);
        setShowEffect(true);

        // Clear existing timeout
        if (hideTimeout) clearTimeout(hideTimeout);
        
        // Hide effect after a delay
        hideTimeout = setTimeout(() => {
          setShowEffect(false);
          setOverScrollIntensity(0);
          overScrollAttempts = 0;
        }, 500);
      } else if (!atBottom) {
        // Reset when not at bottom
        overScrollAttempts = 0;
        setOverScrollIntensity(0);
        setShowEffect(false);
      }

      lastScrollY = scrollY;
    };

    // Also handle wheel events for better detection
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) { // Scrolling down
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollY + windowHeight >= documentHeight - 10) {
          // Prevent default scroll behavior when at bottom
          e.preventDefault();
          
          overScrollAttempts += 1;
          const intensity = Math.min(overScrollAttempts * 0.05, 1);
          setOverScrollIntensity(intensity);
          setShowEffect(true);

          if (hideTimeout) clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            setShowEffect(false);
            setOverScrollIntensity(0);
            overScrollAttempts = 0;
          }, 800);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {showEffect && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Main gradient curve */}
          <motion.div
            className="relative w-full overflow-hidden"
            style={{
              height: `${100 + overScrollIntensity * 200}px`,
            }}
          >
            {/* Curved gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-orange-500/30 via-red-500/20 to-transparent"
              style={{
                clipPath: `ellipse(${50 + overScrollIntensity * 50}% ${30 + overScrollIntensity * 70}% at 50% 100%)`,
              }}
              animate={{
                background: [
                  'linear-gradient(to top, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.2), transparent)',
                  'linear-gradient(to top, rgba(239, 68, 68, 0.4), rgba(251, 146, 60, 0.3), transparent)',
                  'linear-gradient(to top, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.2), transparent)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Secondary gradient for depth */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-purple-500/10 to-transparent"
              style={{
                clipPath: `ellipse(${40 + overScrollIntensity * 40}% ${20 + overScrollIntensity * 60}% at 50% 100%)`,
              }}
              animate={{
                background: [
                  'linear-gradient(to top, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.1), transparent)',
                  'linear-gradient(to top, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1), transparent)',
                  'linear-gradient(to top, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.1), transparent)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Animated particles */}
            <div className="absolute inset-0">
              {Array.from({ length: Math.floor(6 + overScrollIntensity * 12) }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-400 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: `${Math.random() * 50}px`,
                  }}
                  animate={{
                    y: [0, -30 - overScrollIntensity * 40, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 1,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                clipPath: `ellipse(${50 + overScrollIntensity * 50}% ${30 + overScrollIntensity * 70}% at 50% 100%)`,
              }}
            />

            {/* Subtle text indicator */}
            <motion.div
              className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex items-center justify-center text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-white/70 text-xs sm:text-sm md:text-base font-medium tracking-wider">
                End of page
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndOfScrollGradient; 