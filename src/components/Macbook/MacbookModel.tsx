import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import MacbookScreen from './MacbookScreen';

export interface MacbookModelRef {
  getCurrentRotation: () => number;
}

interface Props {
  zoomIn: boolean;
  onRotationComplete: () => void;
  rotationStart: number | null;
  screenOn?: boolean;
  isMobile?: boolean;
}

const MacbookModel = forwardRef<MacbookModelRef, Props>(
  ({ zoomIn, onRotationComplete, rotationStart, screenOn }, ref) => {
    const modelRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/macbookprog.glb`);
    const rotationProgress = useRef(0);
    const hasRotated = useRef(false);
    const { camera } = useThree();
    const [showScreen, setShowScreen] = useState(false);

    useImperativeHandle(ref, () => ({
      getCurrentRotation: () => modelRef.current?.rotation.y ?? Math.PI,
    }));

    useEffect(() => {
      const yCutoff = -0.35;

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          if (mesh.name.toLowerCase().includes('background')) {
            mesh.visible = false;
          }

          const keyCandidates = ['plane005'];

          if (keyCandidates.some((key) => mesh.name.toLowerCase().startsWith(key))) {
            mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
            const mat = mesh.material as THREE.MeshStandardMaterial;

            mat.color = new THREE.Color('#1a1a2e');
            mat.roughness = 0.35;
            mat.metalness = 0.3;
            mat.emissive = new THREE.Color('#222244');
            mat.emissiveIntensity = 0.05;
            mat.needsUpdate = true;
          }

          if (mesh.position.y < yCutoff) {
            mesh.visible = false;
          }

          if (mesh.name.toLowerCase().includes('screen')) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.color = new THREE.Color('#1a1e3a');
            mat.emissive = new THREE.Color('#2a4cff');
            mat.roughness = 0.3;
            mat.metalness = 0.1;
          }
        }
      });
    }, [scene]);

    useEffect(() => {
      if (!zoomIn) {
        hasRotated.current = false;
        rotationProgress.current = 0;
      }
    }, [zoomIn]);

    useFrame(() => {
      if (!modelRef.current) return;

      const screenNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(modelRef.current.quaternion);
      const cameraDirection = new THREE.Vector3().subVectors(
        camera.position,
        new THREE.Vector3(0, 1.45, -0.39).applyMatrix4(modelRef.current.matrixWorld)
      ).normalize();
      const dotProduct = screenNormal.dot(cameraDirection);
      setShowScreen(dotProduct > 0);

      if (zoomIn && rotationStart !== null && !hasRotated.current) {
        rotationProgress.current += 0.01;
        const t = Math.min(rotationProgress.current * 2, 1);
        const target = 0;
        modelRef.current.rotation.y = THREE.MathUtils.lerp(rotationStart, target, t);
        if (t >= 1) {
          hasRotated.current = true;
          onRotationComplete();
        }
      }

      if (!zoomIn && !hasRotated.current) {
        modelRef.current.rotation.y += 0.002;
      }
    });

    return (
      <group ref={modelRef} scale={0.75} position={[0, -0.8, 0]} rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />

        {showScreen && (
          <MacbookScreen screenOn={screenOn} />
        )}
      </group>
    );
  }
);

export default MacbookModel;
useGLTF.preload(`${import.meta.env.BASE_URL}models/macbookprog.glb`);
