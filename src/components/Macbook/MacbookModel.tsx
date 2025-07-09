import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import MacbookScreen from './MacbookScreen';
import useResponsive from '../../hooks/useResponsive';

export interface MacbookModelRef {
  getCurrentRotation: () => number;
}

interface Props {
  zoomIn: boolean;
  onRotationComplete: () => void;
  rotationStart: number | null;
  screenOn?: boolean;
  isMobile?: boolean;
  mousePosition?: { x: number; y: number };
  scrollProgress?: MotionValue<number>;
  customRotationY?: MotionValue<number>;
  customRotationX?: MotionValue<number>;
  currentSection?: MotionValue<number>;
  backgroundMode?: boolean;
}

// Section-based color themes
const sectionThemes = [
  { primary: '#3b82f6', secondary: '#1e40af', name: 'hero' },      // Blue - Hero
  { primary: '#10b981', secondary: '#047857', name: 'terminal' },  // Green - Terminal
  { primary: '#f59e0b', secondary: '#d97706', name: 'about' },     // Orange - About
  { primary: '#8b5cf6', secondary: '#7c3aed', name: 'tech' },      // Purple - Tech
  { primary: '#ef4444', secondary: '#dc2626', name: 'projects' },  // Red - Projects
  { primary: '#06b6d4', secondary: '#0891b2', name: 'resume' },    // Cyan - Resume
  { primary: '#ec4899', secondary: '#db2777', name: 'contact' },   // Pink - Contact
];

const MacbookModel = forwardRef<MacbookModelRef, Props>(
  ({ 
    zoomIn, 
    onRotationComplete, 
    rotationStart, 
    screenOn, 
    mousePosition = { x: 0, y: 0 }, 
    scrollProgress,
    customRotationY,
    customRotationX,
    currentSection,
    backgroundMode = false 
  }, ref) => {
    const modelRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/macbookprog.glb`);
    const rotationProgress = useRef(0);
    const hasRotated = useRef(false);
    const { camera } = useThree();
    const [showScreen, setShowScreen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(sectionThemes[0]);
    const responsive = useResponsive();

    useImperativeHandle(ref, () => ({
      getCurrentRotation: () => modelRef.current?.rotation.y ?? Math.PI,
    }));

    // Update theme based on current section
    useEffect(() => {
      if (currentSection) {
        const sectionIndex = Math.round(currentSection.get());
        const clampedIndex = Math.max(0, Math.min(sectionIndex, sectionThemes.length - 1));
        setCurrentTheme(sectionThemes[clampedIndex]);
      }
    }, [currentSection]);

    useEffect(() => {
      const yCutoff = -0.35;

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          if (mesh.name.toLowerCase().includes('background')) {
            mesh.visible = false;
          }

          // Silver keyboard with neon highlights
          const keyCandidates = ['plane005'];
          if (keyCandidates.some((key) => mesh.name.toLowerCase().startsWith(key))) {
            mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
            const mat = mesh.material as THREE.MeshStandardMaterial;

            // Silver keyboard
            mat.color = new THREE.Color('#e2e8f0'); // Silver base
            mat.roughness = 0.3;
            mat.metalness = 0.8;
            mat.emissive = new THREE.Color(currentTheme.primary);
            mat.emissiveIntensity = 0.1;
            mat.needsUpdate = true;
          }

          // Silver laptop body with neon accents
          if (mesh.name.toLowerCase().includes('laptop') || mesh.name.toLowerCase().includes('macbook')) {
            mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
            const mat = mesh.material as THREE.MeshStandardMaterial;
            
            // Silver aluminum finish
            mat.color = new THREE.Color('#cbd5e1'); // Light silver
            mat.roughness = 0.2;
            mat.metalness = 0.9;
            mat.emissive = new THREE.Color(currentTheme.secondary);
            mat.emissiveIntensity = 0.05;
            mat.needsUpdate = true;
          }

          if (mesh.position.y < yCutoff) {
            mesh.visible = false;
          }

          // Screen with dynamic glow
          if (mesh.name.toLowerCase().includes('screen')) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.color = new THREE.Color('#0f172a');
            mat.emissive = new THREE.Color(currentTheme.primary);
            mat.emissiveIntensity = 0.4;
            mat.roughness = 0.1;
            mat.metalness = 0.2;
            mat.needsUpdate = true;
          }
        }
      });
    }, [scene, currentTheme]);

    useEffect(() => {
      if (!zoomIn) {
        hasRotated.current = false;
        rotationProgress.current = 0;
      }
    }, [zoomIn]);

    useFrame(({ clock }) => {
      if (!modelRef.current) return;

      // Subtle floating animation
      const baseY = responsive.macbookPosition.y;
      const floatIntensity = backgroundMode ? 0.03 : 0.02;
      const floatOffset = Math.sin(clock.getElapsedTime() * 0.4) * floatIntensity;
      modelRef.current.position.y = baseY + floatOffset;
      
      // Very subtle mouse-based tilting (only when not in background mode)
      if (mousePosition && !backgroundMode) {
        modelRef.current.rotation.x += (mousePosition.y * 0.02 - modelRef.current.rotation.x) * 0.05;
        modelRef.current.rotation.z += (mousePosition.x * 0.01 - modelRef.current.rotation.z) * 0.05;
      }

      // Use custom rotations if provided (for scroll-based movement)
      if (customRotationY && !zoomIn) {
        modelRef.current.rotation.y = Math.PI + customRotationY.get();
      }
      if (customRotationX && !zoomIn) {
        modelRef.current.rotation.x += customRotationX.get() * 0.1;
      }

      // Fallback auto-rotation when idle
      if (!zoomIn && !hasRotated.current && !customRotationY) {
        modelRef.current.rotation.y += backgroundMode ? 0.003 : 0.005;
      }

      // Screen visibility calculation
      const screenNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(modelRef.current.quaternion);
      const cameraDirection = new THREE.Vector3().subVectors(
        camera.position,
        new THREE.Vector3(0, 1.45, -0.39).applyMatrix4(modelRef.current.matrixWorld)
      ).normalize();
      const dotProduct = screenNormal.dot(cameraDirection);
      setShowScreen(dotProduct > 0);

      // Zoom animation
      if (zoomIn && rotationStart !== null && !hasRotated.current) {
        rotationProgress.current += 0.015;
        const t = Math.min(rotationProgress.current * 2, 1);
        const target = 0;
        modelRef.current.rotation.y = THREE.MathUtils.lerp(rotationStart, target, t);
        if (t >= 1) {
          hasRotated.current = true;
          onRotationComplete();
        }
      }
    });

    return (
      <group 
        ref={modelRef} 
        scale={responsive.macbookScale} 
        position={[0, responsive.macbookPosition.y, 0]} 
        rotation={[0, Math.PI, 0]}
      >
        <primitive object={scene} />

        {/* Screen with dynamic glow */}
        {showScreen && (
          <>
            <MacbookScreen screenOn={screenOn} />
            
            {/* Dynamic neon screen glow */}
            <mesh position={[0, 1.45, -0.38]} rotation={[0.16, 0, 0]}>
              <planeGeometry args={[1.6, 1.0]} />
              <meshBasicMaterial
                color={currentTheme.primary}
                transparent
                opacity={backgroundMode ? 0.1 : 0.15}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Outer glow ring */}
            <mesh position={[0, 1.45, -0.37]} rotation={[0.16, 0, 0]}>
              <planeGeometry args={[2.0, 1.3]} />
              <meshBasicMaterial
                color={currentTheme.secondary}
                transparent
                opacity={0.05}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </>
        )}

        {/* Dynamic accent lighting based on section */}
        <pointLight 
          position={[0, 1, 0]} 
          intensity={backgroundMode ? 0.3 : 0.4} 
          color={currentTheme.primary}
          distance={4}
        />
        
        {/* Secondary accent light */}
        <pointLight 
          position={[0, 0.5, -1]} 
          intensity={0.2} 
          color={currentTheme.secondary}
          distance={3}
        />

        {/* Subtle rim lighting */}
        <spotLight
          position={[2, 2, 2]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          color={currentTheme.primary}
          target={modelRef.current || undefined}
        />
      </group>
    );
  }
);

export default MacbookModel;
useGLTF.preload(`${import.meta.env.BASE_URL}models/macbookprog.glb`);
