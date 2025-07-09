import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';

interface Props {
  mousePosition: { x: number; y: number };
  scrollProgress: MotionValue<number>;
}

const ParticleField = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate particle positions
  const particleCount = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create flowing patterns
      const i3 = i * 3;
      
      // Spherical distribution with some clustering
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  const colors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    const colorPalette = [
      [0.23, 0.51, 0.96], // Blue
      [0.55, 0.36, 0.96], // Purple  
      [0.02, 0.73, 0.84], // Cyan
      [0.06, 0.73, 0.51], // Green
      [0.96, 0.62, 0.07], // Orange
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const color = colorPalette[colorIndex];
      const i3 = i * 3;
      
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];
    }
    
    return colors;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position;

    // Animate particles with flowing motion
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Get original positions
      const x = positions.array[i3];
      const y = positions.array[i3 + 1];
      const z = positions.array[i3 + 2];
      
      // Add flowing movement
      const waveX = Math.sin(time * 0.5 + i * 0.01) * 0.1;
      const waveY = Math.cos(time * 0.3 + i * 0.02) * 0.1;
      const waveZ = Math.sin(time * 0.4 + i * 0.015) * 0.05;
      
      // Mouse interaction
      const mouseInfluence = 0.5;
      const mouseX = mousePosition.x * mouseInfluence;
      const mouseY = mousePosition.y * mouseInfluence;
      
      positions.array[i3] = x + waveX + mouseX;
      positions.array[i3 + 1] = y + waveY + mouseY;
      positions.array[i3 + 2] = z + waveZ;
    }
    
    positions.needsUpdate = true;

    // Rotate the entire particle field slowly
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ProfessionalParticles = ({ mousePosition, scrollProgress }: Props) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
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
        <ParticleField mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default ProfessionalParticles; 