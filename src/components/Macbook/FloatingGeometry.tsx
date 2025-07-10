import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';

interface Props {
  mousePosition: { x: number; y: number };
  scrollProgress: MotionValue<number>;
  rotation: MotionValue<number>;
}

// Floating Geometric Shape Component
const GeometricShape = ({ 
  position, 
  color, 
  size, 
  shape = 'sphere', 
  mousePosition,
  index 
}: {
  position: [number, number, number];
  color: string;
  size: number;
  shape?: 'sphere' | 'box' | 'octahedron';
  mousePosition: { x: number; y: number };
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Floating animation
    const time = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.3;
    
    // Mouse interaction
    meshRef.current.rotation.x += (mousePosition.y * 0.5 - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (mousePosition.x * 0.5 - meshRef.current.rotation.y) * 0.05;
    
    // Gentle rotation
    meshRef.current.rotation.z += 0.005;
  });



  return (
    <Float
      speed={1 + index * 0.2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <mesh ref={meshRef} position={position}>
        {shape === 'sphere' && (
          <Sphere args={[size, 32, 32]}>
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Sphere>
        )}
        {shape === 'box' && (
          <Box args={[size, size, size]}>
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Box>
        )}
        {shape === 'octahedron' && (
          <Octahedron args={[size]}>
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Octahedron>
        )}
        
        {/* Glow effect */}
        {shape === 'sphere' && (
          <Sphere args={[size * 1.2, 16, 16]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
            />
          </Sphere>
        )}
        {shape === 'box' && (
          <Box args={[size * 1.2, size * 1.2, size * 1.2]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
            />
          </Box>
        )}
        {shape === 'octahedron' && (
          <Octahedron args={[size * 1.2]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
            />
          </Octahedron>
        )}
      </mesh>
    </Float>
  );
};

const FloatingGeometry = ({ mousePosition, scrollProgress, rotation }: Props) => {
  const geometricShapes = [
    { position: [-4, 2, -2] as [number, number, number], color: '#3b82f6', size: 0.3, shape: 'sphere' as const },
    { position: [4, -1, -3] as [number, number, number], color: '#8b5cf6', size: 0.4, shape: 'box' as const },
    { position: [-3, -2, -1] as [number, number, number], color: '#06b6d4', size: 0.35, shape: 'octahedron' as const },
    { position: [3, 3, -4] as [number, number, number], color: '#10b981', size: 0.3, shape: 'sphere' as const },
    { position: [-1, 4, -2] as [number, number, number], color: '#f59e0b', size: 0.25, shape: 'box' as const },
    { position: [2, -3, -3] as [number, number, number], color: '#ef4444', size: 0.4, shape: 'octahedron' as const },
  ];

  return (
    <div className="absolute inset-0 z-5">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.3} />
          
          {/* Directional lights */}
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
          
          {/* Point lights for glow effects */}
          <pointLight position={[0, 0, 2]} intensity={0.5} color="#3b82f6" />

          {/* Floating geometric shapes */}
          {geometricShapes.map((shape, index) => (
            <GeometricShape
              key={index}
              position={shape.position}
              color={shape.color}
              size={shape.size}
              shape={shape.shape}
              mousePosition={mousePosition}
              index={index}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingGeometry; 