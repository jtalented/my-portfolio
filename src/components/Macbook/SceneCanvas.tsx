import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import MacbookModel, { MacbookModelRef } from './MacbookModel';
import CameraController from './CameraController';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import useResponsive from '../../hooks/useResponsive';

interface Props {
  zoomIn: boolean;
  rotationStart: number;
  rotationDone: boolean;
  setRotationDone: (done: boolean) => void;
  modelRef: React.RefObject<MacbookModelRef>;
  isMobile?: boolean;
  mousePosition?: { x: number; y: number };
  scrollProgress?: MotionValue<number>;
  customRotationY?: MotionValue<number>;
  customRotationX?: MotionValue<number>;
  currentSection?: MotionValue<number>;
  backgroundMode?: boolean;
}

const SceneCanvas = ({
  zoomIn,
  rotationStart,
  rotationDone,
  setRotationDone,
  modelRef,
  isMobile = false,
  mousePosition = { x: 0, y: 0 },
  customRotationY,
  customRotationX,
  currentSection,
  backgroundMode = false,
}: Props) => {
  const responsive = useResponsive();
  const { canvasSettings } = responsive;

  return (
    <div id="macbook-app-anchor" className="relative w-full">
      <Canvas
        camera={{
          position: canvasSettings.cameraPosition,
          fov: canvasSettings.cameraFov,
        }}        
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none', // Remove all pointer events
          backgroundColor: 'transparent',
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
          scene.background = null;
          scene.environment = null;
        }}
      >
        <Suspense fallback={null}>
          {/* Professional Lighting Setup */}
          <ambientLight intensity={0.4} color="#475569" />
          
          {/* Key light */}
          <directionalLight 
            position={[4, 6, 4]} 
            intensity={backgroundMode ? 1.2 : 1.5}
            color="#ffffff"
          />
          
          {/* Fill light */}
          <directionalLight 
            position={[-3, 3, -2]} 
            intensity={backgroundMode ? 0.6 : 0.8}
            color="#64748b"
          />
          
          {/* Rim light */}
          <directionalLight 
            position={[0, -2, -4]} 
            intensity={backgroundMode ? 0.8 : 1}
            color="#3b82f6"
          />

          {/* Minimal atmospheric stars only in background mode */}
          {backgroundMode && (
            <Stars
              radius={100}
              depth={50}
              count={300}
              factor={2}
              saturation={0}
              fade
              speed={0.1}
            />
          )}

          <MacbookModel
            ref={modelRef}
            zoomIn={zoomIn}
            rotationStart={rotationStart}
            onRotationComplete={() => setRotationDone(true)}
            screenOn={zoomIn && rotationDone}
            isMobile={isMobile}
            mousePosition={mousePosition}
            customRotationY={customRotationY}
            customRotationX={customRotationX}
            currentSection={currentSection}
            backgroundMode={backgroundMode}
          />

          <CameraController zoomIn={zoomIn} rotationDone={rotationDone} />

          {/* No OrbitControls - remove all user interaction */}

          {/* Subtle post-processing */}
          <EffectComposer>
            <Bloom 
              intensity={backgroundMode ? 0.3 : 0.5} 
              luminanceThreshold={0.8}
              luminanceSmoothing={0.9}
            />
            <DepthOfField 
              focusDistance={0} 
              focalLength={0.02} 
              bokehScale={2} 
              height={480} 
            />
            <Vignette 
              darkness={0.2} 
              offset={0.1} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
