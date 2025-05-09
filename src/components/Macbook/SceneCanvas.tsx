import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import MacbookModel, { MacbookModelRef } from './MacbookModel';
import CameraController from './CameraController';

interface Props {
  zoomIn: boolean;
  rotationStart: number;
  rotationDone: boolean;
  setRotationDone: (done: boolean) => void;
  modelRef: React.RefObject<MacbookModelRef>;
  isMobile?: boolean;
}



const SceneCanvas = ({
  zoomIn,
  rotationStart,
  rotationDone,
  setRotationDone,
  modelRef,
  isMobile = false,
}: Props) => {
  return (
    <div id="macbook-app-anchor" className="relative w-full">
      <Canvas
        camera={{
          position: isMobile ? [0, 1.6, 9] : [0, 1.6, 6],
          fov: isMobile ? 32 : 26,
        }}        
        gl={{ alpha: true }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'auto',
          backgroundColor: 'transparent',
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          scene.environment = null;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[4, 6, 4]} intensity={1.8} />
          <directionalLight position={[-4, 4, -3]} intensity={1.4} />
          <directionalLight position={[0, -4, 0]} intensity={1.8} />
          <directionalLight position={[0, 4, 0]} intensity={1.8} />

          <MacbookModel
  ref={modelRef}
  zoomIn={zoomIn}
  rotationStart={rotationStart}
  onRotationComplete={() => setRotationDone(true)}
  screenOn={zoomIn && rotationDone}
  isMobile={isMobile}
/>





          <CameraController zoomIn={zoomIn} rotationDone={rotationDone} />

          <OrbitControls
            enableZoom={false}
            autoRotate={false}
            enableRotate={!zoomIn || !rotationDone}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
