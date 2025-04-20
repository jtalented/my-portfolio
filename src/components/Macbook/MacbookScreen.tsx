import { Html } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import HomeScreen from './HomeScreen';

interface MacbookScreenProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  screenOn?: boolean;
  isMobile?: boolean;
}

const MacbookScreen = ({
  rotation = [0.16, 0, 0],
  screenOn = false,
  isMobile = false,
}: MacbookScreenProps) => {
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);
  const lastVisibleTime = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);

  // Adjustments for real mobile devices
  const screenPosition: [number, number, number] = isMobile
    ? [0, 1.475, -0.365] // mobile fix: a bit higher and forward
    : [0, 1.45, -0.38];

  const screenScale: [number, number, number] = isMobile
    ? [1.18, 1.27, 0.1] // mobile fix: slightly smaller to fit screen
    : [1.36, 1.46, 0.1];

  useFrame(({ clock }) => {
    if (htmlRef.current) {
      const rect = htmlRef.current.getBoundingClientRect();
      const isCurrentlyVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

      if (isCurrentlyVisible !== visibilityRef.current) {
        visibilityRef.current = isCurrentlyVisible;
        if (isCurrentlyVisible) {
          lastVisibleTime.current = clock.getElapsedTime();
          setIsVisible(true);
        }
      }

      if (isCurrentlyVisible && isVisible) {
        const timeSinceVisible = clock.getElapsedTime() - lastVisibleTime.current;
        const newOpacity = Math.min(timeSinceVisible / 0.8, 1);
        setOpacity(newOpacity);
      }
    }
  });

  return (
    <>
      {/* Background screen with fade effect */}
      <Html
        position={screenPosition}
        rotation={rotation}
        scale={screenScale}
        transform
        distanceFactor={isMobile ? 1.4 : 1.2}
        prepend
        occlude
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
          <img
            src={`${import.meta.env.BASE_URL}images/macbook-screen.png`}
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

      {/* App UI only if screen is on */}
      {screenOn && (
        <Html
          position={screenPosition}
          rotation={rotation}
          scale={screenScale}
          transform
          distanceFactor={isMobile ? 1.4 : 1.2}
          prepend
          occlude
          zIndexRange={[1000, 101]}
          style={{ pointerEvents: 'auto' }}
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
            <HomeScreen />
          </div>
        </Html>
      )}
    </>
  );
};

export default MacbookScreen;
