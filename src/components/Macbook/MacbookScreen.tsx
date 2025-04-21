import { Html } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import HomeScreen from './HomeScreen';

interface MacbookScreenProps {
  screenOn?: boolean;
}

const MacbookScreen = ({ screenOn = false }: MacbookScreenProps) => {
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);
  const lastVisibleTime = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);


  
  //iOS detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  //Positioning & Sizing Adjustments
  const screenX = isIOS ? 0.0 : 0;
  const screenY = isIOS ? 1.90 : 1.45;
  const screenZ = isIOS ? -0.372 : -0.39;
  const screenRotationX = 0.16;

  const distanceFactor = isIOS ? 1.1 : 1.2;

  const backgroundWidth = isIOS ? 1330 : 1223;
  const backgroundHeight = isIOS ? 890 : 810;

  const uiWidth = isIOS ? 880 : 900;
  const uiHeight = isIOS ? 580 : 560;

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
