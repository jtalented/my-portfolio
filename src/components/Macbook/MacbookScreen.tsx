import { Html } from '@react-three/drei';
import { useState, useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import HomeScreen from './HomeScreen';

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
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);
  const lastVisibleTime = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);

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
        position={position}
        rotation={rotation}
        scale={scale}
        transform
        distanceFactor={1.2}
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



      {/* App UI only if screen is on */}
      {screenOn && (
        <Html
          position={position}
          rotation={rotation}
          scale={scale}
          transform
          distanceFactor={1.2}
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
