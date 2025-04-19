import { Html } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface MacbookScreenProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  screenOn?: boolean;
}

const MacbookScreen = ({
  position = [0, 1.05, -0.105],
  rotation = [0.16, 0, 0],
  scale = [1.36, 1.46, 0.1],
  screenOn = false,
}: MacbookScreenProps) => {
  // State for tracking visibility and handling fade
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);
  const lastVisibleTime = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);

  // Check if the screen is visible in the current frame
  useFrame(({ camera, clock }) => {
    if (htmlRef.current) {
      // Get bounds of the HTML element in screen space
      const rect = htmlRef.current.getBoundingClientRect();
      
      // Check if element is within viewport
      const isCurrentlyVisible = (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );

      // If visibility state changed
      if (isCurrentlyVisible !== visibilityRef.current) {
        visibilityRef.current = isCurrentlyVisible;
        
        // If became visible, record the time
        if (isCurrentlyVisible) {
          lastVisibleTime.current = clock.getElapsedTime();
          setIsVisible(true);
        }
      }

      // Handle fade-in animation when visible
      if (isCurrentlyVisible && isVisible) {
        const timeSinceVisible = clock.getElapsedTime() - lastVisibleTime.current;
        const newOpacity = Math.min(timeSinceVisible / 0.8, 1); // 0.8 second fade
        setOpacity(newOpacity);
      }
    }
  });

  return (
    <>
      {/* Screen background with fade effect (no occlusion) */}
      <Html
        position={position}
        rotation={rotation}
        scale={scale}
        transform
        distanceFactor={1.2}
        prepend
        occlude // Enable occlusion to prevent clipping
        zIndexRange={[100, 0]}
      >
        <div
          ref={htmlRef}
          className="w-[900px] h-[560px] bg-black rounded-md relative overflow-hidden"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            opacity: isVisible ? opacity : 0,
            pointerEvents: 'none',
          }}
        >
          {/* Background screen glow - always visible with fade effect */}
          <img
            src="/images/macbook-screen.png"
            alt="MacBook Screen"
            draggable={false}
            unselectable="on"
            className="w-full h-full object-cover absolute inset-0 z-0 rounded-md"
            style={{
              transform: 'rotateY(180deg)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      </Html>
      
      {/* Interactive content only when screenOn (with occlusion) */}
      {screenOn && (
        <Html
          position={position}
          rotation={rotation}
          scale={scale}
          transform
          distanceFactor={1.2}
          prepend
          occlude // Enable occlusion to prevent clipping
          zIndexRange={[1000, 101]}
          style={{
            pointerEvents: 'auto',
          }}
        >
          <div
            className="w-[900px] h-[560px] relative overflow-hidden pointer-events-auto"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              background: 'transparent',
            }}
          >
            {/* Banner */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xl font-semibold px-4 py-2 rounded z-20"
              style={{
                top: '120px',
                backdropFilter: 'blur(4px)',
              }}
            >
              🚧 Projects Section Under Construction 🚧
            </div>

            {/* Dino iframe */}
            <iframe
              src="https://dino-chrome.com/"
              title="Chrome Dino Game"
              className="absolute inset-0 w-full h-full z-10 rounded-md"
              style={{
                border: 'none',
              }}
              allowFullScreen
            />
          </div>
        </Html>
      )}
    </>
  );
};

export default MacbookScreen;