import { Html } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import HomeScreen from './HomeScreen';
import useResponsive from '../../hooks/useResponsive';

interface MacbookScreenProps {
  screenOn?: boolean;
}

const MacbookScreen = ({ screenOn = false }: MacbookScreenProps) => {
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);
  const lastVisibleTime = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);
  const responsive = useResponsive();

  //iOS detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  // Use responsive values instead of hard-coded values
  const { screenDimensions, macbookPosition } = responsive;
  
  const screenX = macbookPosition.x;
  const screenY = macbookPosition.y;
  const screenZ = macbookPosition.z;
  const screenRotationX = macbookPosition.rotationX;

  const distanceFactor = screenDimensions.distanceFactor;
  const backgroundWidth = screenDimensions.backgroundWidth;
  const backgroundHeight = screenDimensions.backgroundHeight;
  const uiWidth = screenDimensions.uiWidth;
  const uiHeight = screenDimensions.uiHeight;

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

  if (isIOS) {
    return null;

    // uncomment when ios mobile is fully rendering
    /*
    return (
      <group position={[screenX, screenY, screenZ]} rotation={[screenRotationX, 0, 0]}>
        <Html
          transform
          distanceFactor={distanceFactor}
          prepend
          occlude={false}
          zIndexRange={[100, 0]}
          portal={{ current: null }}
        >
          <div
            ref={htmlRef}
            className="bg-black rounded-md relative overflow-hidden"
            style={{
              width: `${backgroundWidth}px`,
              height: `${backgroundHeight}px`,
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

        {screenOn && (
          <Html
            transform
            distanceFactor={distanceFactor}
            prepend
            occlude={false}
            zIndexRange={[1000, 101]}
            portal={{ current: null }}
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="relative overflow-hidden pointer-events-auto"
              style={{
                width: `${uiWidth}px`,
                height: `${uiHeight}px`,
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
      </group>
    );
    */
  }

  // Non-IOS rendering
  return (
    <group position={[screenX, screenY, screenZ]} rotation={[screenRotationX, 0, 0]}>
      <Html
        transform
        distanceFactor={distanceFactor}
        prepend
        occlude
        zIndexRange={[100, 0]}
      >
        <div
          ref={htmlRef}
          className="bg-black rounded-md relative overflow-hidden"
          style={{
            width: `${backgroundWidth}px`,
            height: `${backgroundHeight}px`,
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

      {screenOn && (
        <Html
          transform
          distanceFactor={distanceFactor}
          prepend
          occlude
          zIndexRange={[1000, 101]}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="relative overflow-hidden pointer-events-auto"
            style={{
              width: `${uiWidth}px`,
              height: `${uiHeight}px`,
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
    </group>
  );
};

export default MacbookScreen;
