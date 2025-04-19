import { Html } from '@react-three/drei';

interface MacbookScreenProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  screenOn?: boolean;
}

const MacbookScreen = ({
  position = [0, 1.05, -0.1],
  rotation = [0.16, 0, 0],
  scale = [1.36, 1.46, 0.1],
  screenOn = false,
}: MacbookScreenProps) => {
  return (
    <Html
      position={position}
      rotation={rotation}
      scale={scale}
      transform
      distanceFactor={1.2}
      prepend
      occlude={false}
      zIndexRange={[1000, 0]}
      style={{
        pointerEvents: screenOn ? 'auto' : 'none',
      }}
    >
      <div
        className="w-[900px] h-[560px] bg-black rounded-md relative overflow-hidden"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* ✅ Background screen glow */}
        <img
          src="/images/macbook-screen.png"
          alt="MacBook Screen"
          className="w-full h-full object-cover absolute inset-0 z-0 rounded-md"
          style={{
            transform: 'rotateY(180deg)',
          }}
        />

        {/* ✅ Under Construction overlay banner */}
        {screenOn && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xl font-semibold px-4 py-2 rounded z-20 pointer-events-none"
            style={{
                top: '120px', // 👈 bring it down closer to the middle of the laptop screen
                backdropFilter: 'blur(4px)',
            }}
            >
            🚧 Projects Section Under Construction 🚧
            </div>
        )}

        {/* ✅ Dino Game iframe */}
        {screenOn && (
          <iframe
            src="https://dino-chrome.com/"
            title="Chrome Dino Game"
            className="absolute inset-0 w-full h-full z-10 rounded-md"
            style={{
              border: 'none',
              pointerEvents: 'auto',
            }}
            allowFullScreen
          />
        )}
      </div>

      <style>{`
        @keyframes screenFade {
          0% { opacity: 0; filter: brightness(0.3); }
          100% { opacity: 1; filter: brightness(1); }
        }
      `}</style>
    </Html>
  );
};

export default MacbookScreen;
