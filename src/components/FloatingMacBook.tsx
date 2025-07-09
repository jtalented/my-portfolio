import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Professional MacBook Component with Dynamic Theming
const ProfessionalMacBook = ({ 
  scrollProgress,
  currentSection 
}: { 
  scrollProgress: number;
  currentSection: number;
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/macbookprog.glb`);
  const { camera } = useThree();

  // Section-based themes
  const sectionThemes = [
    { primary: '#3b82f6', secondary: '#1e40af' }, // Blue - Hero
    { primary: '#10b981', secondary: '#047857' }, // Green - Terminal
    { primary: '#f59e0b', secondary: '#d97706' }, // Orange - About
    { primary: '#8b5cf6', secondary: '#7c3aed' }, // Purple - Tech
    { primary: '#ef4444', secondary: '#dc2626' }, // Red - Projects
    { primary: '#06b6d4', secondary: '#0891b2' }, // Cyan - Resume
    { primary: '#ec4899', secondary: '#db2777' }, // Pink - Contact
  ];

  const currentTheme = sectionThemes[Math.min(currentSection, sectionThemes.length - 1)];

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.name.toLowerCase().includes('background')) {
          mesh.visible = false;
        }

        // Silver with neon accents
        const keyCandidates = ['plane005'];
        if (keyCandidates.some((key) => mesh.name.toLowerCase().startsWith(key))) {
          mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
          const mat = mesh.material as THREE.MeshStandardMaterial;

          mat.color = new THREE.Color('#e2e8f0'); // Silver
          mat.roughness = 0.3;
          mat.metalness = 0.9;
          mat.emissive = new THREE.Color(currentTheme.primary);
          mat.emissiveIntensity = 0.15;
          mat.needsUpdate = true;
        }

        // Laptop body
        if (mesh.name.toLowerCase().includes('laptop') || mesh.name.toLowerCase().includes('macbook')) {
          mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
          const mat = mesh.material as THREE.MeshStandardMaterial;
          
          mat.color = new THREE.Color('#cbd5e1'); // Light silver
          mat.roughness = 0.2;
          mat.metalness = 0.95;
          mat.emissive = new THREE.Color(currentTheme.secondary);
          mat.emissiveIntensity = 0.08;
          mat.needsUpdate = true;
        }

        // Screen with dynamic theme
        if (mesh.name.toLowerCase().includes('screen')) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color = new THREE.Color('#0f172a');
          mat.emissive = new THREE.Color(currentTheme.primary);
          mat.emissiveIntensity = 0.5;
          mat.roughness = 0.1;
          mat.metalness = 0.3;
          mat.needsUpdate = true;
        }

        // Hide bottom parts
        if (mesh.position.y < -0.35) {
          mesh.visible = false;
        }
      }
    });
  }, [scene, currentTheme]);

  useFrame(({ clock }) => {
    if (!modelRef.current) return;

    const time = clock.getElapsedTime();
    
    // Gentle floating
    modelRef.current.position.y = -0.5 + Math.sin(time * 0.4) * 0.03;
    
    // Smooth rotation based on scroll with more dramatic effect
    const targetRotationY = Math.PI + (scrollProgress * Math.PI * 0.8);
    modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.08;
    
    // More pronounced tilt for breaking out effect
    modelRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + (scrollProgress * 0.3);
    modelRef.current.rotation.z = Math.cos(time * 0.3) * 0.05;
  });

  return (
    <group ref={modelRef} scale={0.8} position={[0, -0.5, 0]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
      
      {/* Enhanced dynamic lighting */}
      <pointLight 
        position={[0, 1, 0]} 
        intensity={0.8} 
        color={currentTheme.primary}
        distance={4}
      />
      
      <spotLight
        position={[2, 2, 2]}
        angle={0.4}
        penumbra={0.3}
        intensity={0.6}
        color={currentTheme.secondary}
      />

      {/* Enhanced screen glow */}
      <mesh position={[0, 0.7, -0.2]} rotation={[0.1, 0, 0]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial
          color={currentTheme.primary}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Unified Glass Overlay Component
const UnifiedGlassOverlay = ({ scrollProgress }: { scrollProgress: any }) => {
  return (
    <motion.div
      className="fixed inset-0 z-15 pointer-events-none"
      style={{
        opacity: 0.6,
      }}
    >
      {/* Main glass surface spanning both sections */}
      <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-br from-blue-500/12 via-cyan-500/10 to-indigo-500/15" />
      
      {/* Glass texture pattern */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
            linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.05) 50%, transparent 60%)
          `,
          backgroundSize: '600px 600px, 400px 400px, 500px 500px, 200px 200px',
        }}
      />

      {/* Glass reflection highlights */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            top: `${15 + i * 15}%`,
            left: '5%',
            width: '90%',
            transform: `rotate(${-8 + i * 3}deg)`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating glass particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/50 rounded-full"
          style={{
            left: `${15 + i * 7}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

// Helper functions for tessellation
const calculateCellBounds = (seed: {x: number, y: number}, allSeeds: {x: number, y: number}[], currentIndex: number) => {
  let minX = 0, maxX = 100, minY = 0, maxY = 100;
  
  // Find boundaries based on distance to neighboring seeds
  allSeeds.forEach((otherSeed, otherIndex) => {
    if (otherIndex === currentIndex) return;
    
    const midX = (seed.x + otherSeed.x) / 2;
    const midY = (seed.y + otherSeed.y) / 2;
    
    if (otherSeed.x < seed.x) minX = Math.max(minX, midX);
    if (otherSeed.x > seed.x) maxX = Math.min(maxX, midX);
    if (otherSeed.y < seed.y) minY = Math.max(minY, midY);
    if (otherSeed.y > seed.y) maxY = Math.min(maxY, midY);
  });
  
  return { minX, maxX, minY, maxY };
};

const createTessellatedShape = (bounds: {minX: number, maxX: number, minY: number, maxY: number}, seed: {x: number, y: number}, index: number) => {
  const points = [];
  
  // Create organic shape that stays within tessellation bounds
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const radiusX = (bounds.maxX - bounds.minX) / 2;
  const radiusY = (bounds.maxY - bounds.minY) / 2;
  
  const numPoints = 5 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 360;
    const variation = 0.7 + Math.random() * 0.6;
    
    const x = centerX + Math.cos(angle * Math.PI / 180) * radiusX * variation;
    const y = centerY + Math.sin(angle * Math.PI / 180) * radiusY * variation;
    
    points.push({
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    });
  }
  
  return `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;
};

// Simplified Glass Shatter Effect - NO HOOKS IN LOOPS
const GlassShatterEffect = ({ 
  scrollProgress, 
  scrollVelocity 
}: { 
  scrollProgress: any;
  scrollVelocity: any;
}) => {
  // REALISTIC TRIANGULAR GLASS SHARDS - Perfect tessellation with no gaps or overlaps
  const tessellationPieces = useMemo(() => [
    // Top edge triangular shards - varying sizes
    { clipPath: "polygon(0% 0%, 18% 0%, 12% 18%)", centerX: 10, centerY: 6, size: 'small' },
    { clipPath: "polygon(18% 0%, 35% 0%, 28% 15%, 12% 18%)", centerX: 23, centerY: 8, size: 'medium' },
    { clipPath: "polygon(35% 0%, 55% 0%, 48% 12%, 28% 15%)", centerX: 41, centerY: 7, size: 'large' },
    { clipPath: "polygon(55% 0%, 72% 0%, 65% 14%, 48% 12%)", centerX: 60, centerY: 6, size: 'medium' },
    { clipPath: "polygon(72% 0%, 88% 0%, 82% 16%, 65% 14%)", centerX: 77, centerY: 7, size: 'medium' },
    { clipPath: "polygon(88% 0%, 100% 0%, 100% 12%, 82% 16%)", centerX: 92, centerY: 7, size: 'small' },
    
    // Second row - connecting perfectly to row 1
    { clipPath: "polygon(0% 0%, 12% 18%, 8% 32%, 0% 25%)", centerX: 5, centerY: 19, size: 'small' },
    { clipPath: "polygon(12% 18%, 28% 15%, 35% 28%, 22% 35%, 8% 32%)", centerX: 21, centerY: 25, size: 'large' },
    { clipPath: "polygon(28% 15%, 48% 12%, 52% 25%, 35% 28%)", centerX: 41, centerY: 20, size: 'medium' },
    { clipPath: "polygon(48% 12%, 65% 14%, 68% 26%, 52% 25%)", centerX: 58, centerY: 19, size: 'medium' },
    { clipPath: "polygon(65% 14%, 82% 16%, 78% 28%, 68% 26%)", centerX: 73, centerY: 21, size: 'medium' },
    { clipPath: "polygon(82% 16%, 100% 12%, 100% 28%, 78% 28%)", centerX: 90, centerY: 21, size: 'small' },
    
    // Third row - connecting perfectly to row 2
    { clipPath: "polygon(0% 25%, 8% 32%, 15% 45%, 0% 48%)", centerX: 6, centerY: 37, size: 'small' },
    { clipPath: "polygon(8% 32%, 22% 35%, 25% 52%, 18% 48%, 15% 45%)", centerX: 16, centerY: 40, size: 'small' },
    { clipPath: "polygon(22% 35%, 35% 28%, 45% 42%, 25% 52%)", centerX: 29, centerY: 41, size: 'large' },
    { clipPath: "polygon(35% 28%, 52% 25%, 58% 38%, 45% 42%)", centerX: 47, centerY: 33, size: 'medium' },
    { clipPath: "polygon(52% 25%, 68% 26%, 72% 38%, 58% 38%)", centerX: 62, centerY: 32, size: 'medium' },
    { clipPath: "polygon(68% 26%, 78% 28%, 85% 42%, 72% 38%)", centerX: 76, centerY: 33, size: 'medium' },
    { clipPath: "polygon(78% 28%, 100% 28%, 100% 45%, 85% 42%)", centerX: 91, centerY: 36, size: 'small' },
    
    // Fourth row - connecting perfectly to row 3
    { clipPath: "polygon(0% 48%, 15% 45%, 18% 48%, 12% 65%, 0% 62%)", centerX: 10, centerY: 54, size: 'medium' },
    { clipPath: "polygon(18% 48%, 25% 52%, 35% 58%, 28% 68%, 12% 65%)", centerX: 26, centerY: 57, size: 'small' },
    { clipPath: "polygon(25% 52%, 45% 42%, 55% 55%, 48% 65%, 35% 58%)", centerX: 42, centerY: 54, size: 'large' },
    { clipPath: "polygon(45% 42%, 58% 38%, 68% 52%, 55% 55%)", centerX: 56, centerY: 47, size: 'medium' },
    { clipPath: "polygon(58% 38%, 72% 38%, 78% 52%, 68% 52%)", centerX: 69, centerY: 45, size: 'medium' },
    { clipPath: "polygon(72% 38%, 85% 42%, 88% 55%, 78% 52%)", centerX: 81, centerY: 47, size: 'medium' },
    { clipPath: "polygon(85% 42%, 100% 45%, 100% 58%, 88% 55%)", centerX: 93, centerY: 50, size: 'small' },
    
    // Fifth row - connecting perfectly to row 4
    { clipPath: "polygon(0% 62%, 12% 65%, 18% 82%, 0% 78%)", centerX: 8, centerY: 72, size: 'small' },
    { clipPath: "polygon(12% 65%, 28% 68%, 32% 85%, 18% 82%)", centerX: 22, centerY: 75, size: 'small' },
    { clipPath: "polygon(28% 68%, 35% 58%, 48% 65%, 45% 82%, 32% 85%)", centerX: 38, centerY: 72, size: 'medium' },
    { clipPath: "polygon(48% 65%, 55% 55%, 68% 52%, 72% 68%, 58% 78%, 45% 82%)", centerX: 57, centerY: 65, size: 'large' },
    { clipPath: "polygon(68% 52%, 78% 52%, 82% 68%, 72% 68%)", centerX: 75, centerY: 60, size: 'small' },
    { clipPath: "polygon(78% 52%, 88% 55%, 92% 68%, 82% 68%)", centerX: 85, centerY: 61, size: 'small' },
    { clipPath: "polygon(88% 55%, 100% 58%, 100% 72%, 92% 68%)", centerX: 95, centerY: 63, size: 'small' },
    
    // Bottom edge - connecting perfectly to row 5
    { clipPath: "polygon(0% 78%, 18% 82%, 15% 100%, 0% 100%)", centerX: 8, centerY: 90, size: 'small' },
    { clipPath: "polygon(18% 82%, 32% 85%, 28% 100%, 15% 100%)", centerX: 23, centerY: 92, size: 'small' },
    { clipPath: "polygon(32% 85%, 45% 82%, 42% 100%, 28% 100%)", centerX: 37, centerY: 92, size: 'small' },
    { clipPath: "polygon(45% 82%, 58% 78%, 62% 100%, 42% 100%)", centerX: 52, centerY: 90, size: 'medium' },
    { clipPath: "polygon(58% 78%, 72% 68%, 82% 68%, 85% 100%, 62% 100%)", centerX: 72, centerY: 82, size: 'large' },
    { clipPath: "polygon(82% 68%, 92% 68%, 95% 100%, 85% 100%)", centerX: 88, centerY: 84, size: 'small' },
    { clipPath: "polygon(92% 68%, 100% 72%, 100% 100%, 95% 100%)", centerX: 96, centerY: 85, size: 'small' }
  ], []);

  // Timing for glass breaking - occurs early in hero section
  const intactPhase = [0, 0.08];        // Intact through initial hero
  const breakingPhase = [0.08, 0.10];   // Quick break in mid-hero
  const shatterPhase = [0.10, 0.12];    // Fast shatter
  const dispersePhase = [0.12, 0.14];   // Pieces disperse quickly, laptop ready for all sections   

  // ALL useTransform calls OUTSIDE the map - no hooks in loops!
  const fragmentVisibility = useTransform(
    scrollProgress,
    [0, breakingPhase[0], breakingPhase[1], shatterPhase[1], dispersePhase[1]],
    [0.7, 0.7, 0.9, 0.9, 0]
  );

  const separationProgress = useTransform(
    scrollProgress,
    [breakingPhase[0], breakingPhase[1], shatterPhase[1], dispersePhase[1]],
    [0, 0, 1, 1]
  );

  const largeFragmentScale = useTransform(
    scrollProgress,
    [breakingPhase[1], shatterPhase[1], dispersePhase[1]],
    [1, 1.08, 0.3]
  );

  const mediumFragmentScale = useTransform(
    scrollProgress,
    [breakingPhase[1], shatterPhase[1], dispersePhase[1]],
    [1, 1.06, 0.2]
  );

  const smallFragmentScale = useTransform(
    scrollProgress,
    [breakingPhase[1], shatterPhase[1], dispersePhase[1]],
    [1, 1.04, 0.1]
  );

  return (
    <>
      {/* Premium Liquid Glass Background - prevents black screen */}
      <motion.div
        className="fixed inset-0 z-14 pointer-events-none"
        style={{
          opacity: useTransform(scrollProgress, [0, shatterPhase[0], dispersePhase[1], 1], [0, 0, 0.4, 0.4]),
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.12) 0%, 
              rgba(120, 180, 255, 0.05) 50%, 
              rgba(255, 255, 255, 0.08) 100%
            ),
            radial-gradient(circle at 60% 40%, 
              rgba(255, 255, 255, 0.15) 0%, 
              transparent 70%
            )
          `,
          backdropFilter: 'blur(12px) saturate(1.6) brightness(1.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.1)
          `,
        }}
      />

      {/* Simplified Glass Tessellation - NO HOOKS IN LOOPS */}
      <motion.div className="fixed inset-0 pointer-events-none z-50">
        
        {/* Unified Glass Surface Overlay - Blends all pieces seamlessly */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollProgress, [0, breakingPhase[0], breakingPhase[1]], [0.8, 0.8, 0]),
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.08) 0%, 
                rgba(120, 180, 255, 0.03) 50%, 
                rgba(255, 255, 255, 0.05) 100%
              )
            `,
            backdropFilter: 'blur(8px) saturate(1.4) brightness(1.03)',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.03))',
          }}
        />
        
        <motion.div className="absolute inset-0 transform-gpu" style={{ perspective: '1000px' }}>
          {tessellationPieces.map((piece, index) => {
            // REALISTIC GLASS SHATTER - Impact point at center
            const impactX = 50; 
            const impactY = 50; 
            
            // PURE LINEAR OUTWARD MOVEMENT - direct line from center to piece center
            const deltaX = piece.centerX - impactX; // Direct X distance from center
            const deltaY = piece.centerY - impactY; // Direct Y distance from center
            
            // Distance from center for force calculation
            const distanceFromImpact = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Normalize direction vector for straight-line movement
            const directionX = distanceFromImpact > 0 ? deltaX / distanceFromImpact : 1;
            const directionY = distanceFromImpact > 0 ? deltaY / distanceFromImpact : 0;
            
            // MAXIMUM explosive force - linear movement dominates everything
            const explosiveForce = Math.max(1.5, 2.5 - (distanceFromImpact / 70)); // Higher minimum force
            const uniqueVelocityMod = 1.0 + (index * 0.193) % 0.6; // Higher velocity
            const baseSpeed = piece.size === 'large' ? 2000 : piece.size === 'medium' ? 2500 : 3000; // Much higher speeds
            const explosiveSpeed = baseSpeed * explosiveForce * uniqueVelocityMod;
            
            // Calculate STRAIGHT LINE explosion trajectory - no circular motion
            const explosionX = directionX * explosiveSpeed;
            const explosionY = directionY * explosiveSpeed;
            
            // COMPLETELY UNIQUE ROTATION - every piece spins differently on all 3 axes
            // Use multiple unique seeds to ensure no two pieces rotate the same
            const uniqueSeedX = (piece.centerX * 23 + piece.centerY * 41 + index * 89 + 113) % 1000;
            const uniqueSeedY = (piece.centerX * 47 + piece.centerY * 71 + index * 127 + 241) % 1000; 
            const uniqueSeedZ = (piece.centerX * 79 + piece.centerY * 103 + index * 149 + 367) % 1000;
            
            // VARIED rotation speeds for realistic glass shard movement
            const rotSpeedX = 200 + (uniqueSeedX * 4) % 800; // 200-1000 degrees per second
            const rotSpeedY = 200 + (uniqueSeedY * 4) % 800; // 200-1000 degrees per second  
            const rotSpeedZ = 200 + (uniqueSeedZ * 4) % 800; // 200-1000 degrees per second
            
            // UNIQUE ROTATION DIRECTIONS - each axis can spin either way independently
            const rotDirX = (uniqueSeedX % 2 === 0) ? 1 : -1;  // Randomly positive or negative
            const rotDirY = (uniqueSeedY % 3 === 0) ? 1 : -1;  // Different pattern for Y
            const rotDirZ = (uniqueSeedZ % 5 === 0) ? 1 : -1;  // Different pattern for Z

            return (
              <motion.div
                key={index}
                className="absolute inset-0 transform-gpu"
                style={{
                  opacity: useTransform(
                    scrollProgress,
                    [0, breakingPhase[0], breakingPhase[1], shatterPhase[1], dispersePhase[1]],
                    [0.8, 0.8, 1, 0.6, 0] // Fade as they fly off screen
                  ),
                  scale: useTransform(
                    scrollProgress,
                    [breakingPhase[1], shatterPhase[1], dispersePhase[1]],
                    [1, 1.1, piece.size === 'large' ? 0.4 : piece.size === 'medium' ? 0.3 : 0.2]
                  ),
                  x: useTransform(
                    scrollProgress,
                    [0, breakingPhase[1], dispersePhase[1]],
                    [0, 0, explosionX] // Fly way off screen
                  ),
                  y: useTransform(
                    scrollProgress,
                    [0, breakingPhase[1], dispersePhase[1]], 
                    [0, 0, explosionY + (explosiveForce * 200)] // Fly way off screen with gravity
                  ),
                  rotateX: useTransform(
                    scrollProgress,
                    [0, breakingPhase[1], dispersePhase[1]],
                    [0, 0, rotDirX * rotSpeedX] // UNIQUE X rotation per piece
                  ),
                  rotateY: useTransform(
                    scrollProgress,
                    [0, breakingPhase[1], dispersePhase[1]],
                    [0, 0, rotDirY * rotSpeedY] // UNIQUE Y rotation per piece  
                  ),
                  rotateZ: useTransform(
                    scrollProgress,
                    [0, breakingPhase[1], dispersePhase[1]],
                    [0, 0, rotDirZ * rotSpeedZ] // UNIQUE Z rotation per piece
                  ),
                }}
              >
                {/* Seamless Liquid Glass Shard */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: piece.clipPath,
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.20) 0%, 
                        rgba(255, 255, 255, 0.05) 25%,
                        rgba(120, 180, 255, 0.06) 50%,
                        rgba(255, 255, 255, 0.10) 75%,
                        rgba(255, 255, 255, 0.03) 100%
                      ),
                      radial-gradient(circle at 30% 20%, 
                        rgba(255, 255, 255, 0.25) 0%, 
                        transparent 70%
                      )
                    `,
                    backdropFilter: `blur(${piece.size === 'large' ? 14 : piece.size === 'medium' ? 12 : 10}px) saturate(1.6) brightness(1.08)`,
                    // NO BORDERS - creates seamless look
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05))',
                  }}
                >
                  {/* Subtle Liquid Glass Flow Effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: piece.clipPath,
                      background: `
                        linear-gradient(45deg, 
                          transparent 0%, 
                          rgba(255, 255, 255, 0.06) 30%, 
                          rgba(120, 180, 255, 0.08) 50%, 
                          rgba(255, 255, 255, 0.06) 70%, 
                          transparent 100%
                        )
                      `,
                      animation: `glassFlow ${4 + (index * 0.3)} s ease-in-out infinite alternate`,
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  
                  {/* Soft Highlight Reflection - only after break */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      clipPath: piece.clipPath,
                      background: `
                        linear-gradient(120deg, 
                          rgba(255, 255, 255, 0.3) 0%, 
                          transparent 50%
                        )
                      `,
                      transform: 'scale(0.9) translate(5%, -5%)',
                      filter: 'blur(3px)',
                      opacity: useTransform(
                        scrollProgress,
                        [0, breakingPhase[1], shatterPhase[0]],
                        [0, 0, 1]
                      ),
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium Status Indicator */}
        <motion.div
          className="absolute top-6 left-6 text-white px-4 py-3 rounded-xl text-sm backdrop-blur-lg border"
          style={{
            opacity: useTransform(scrollProgress, [0, intactPhase[1], dispersePhase[1]], [1, 1, 0]),
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(120, 180, 255, 0.08) 50%, 
                rgba(255, 255, 255, 0.05) 100%
              )
            `,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.4)
            `,
          }}
        >
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #A78BFA)',
                boxShadow: '0 0 8px rgba(96, 165, 250, 0.6)',
              }}
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-medium bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Liquid Glass Screen
            </span>
          </div>
          <div className="text-xs opacity-80 mt-1 text-blue-100">
            {tessellationPieces.length} premium glass fragments
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Main Floating MacBook Component
const FloatingMacBook = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Adjusted timing to match early glass shatter effect  
  const macbookScale = useTransform(scrollYProgress, 
    [0, 0.08, 0.14, 0.5, 1], 
    [0.2, 0.3, 1.3, 1.5, 1.7]
  );
  
  // Enhanced opacity with "break out" effect
  const macbookOpacity = useTransform(scrollYProgress, 
    [0, 0.08, 0.14, 0.95, 1], 
    [0.2, 0.5, 1, 0.9, 0.8]
  );
  
  // Much more extreme side-to-side movement - positioned correctly early
  const macbookX = useTransform(scrollYProgress, 
    [0, 0.14, 0.25, 0.45, 0.6, 0.75, 0.9, 1], 
    [0, 650, 650, 650, -650, -650, 650, 200]
  );
  
  // Enhanced vertical movement for break out effect - positioned early for all sections
  const macbookY = useTransform(scrollYProgress, 
    [0, 0.08, 0.14, 0.25, 0.5, 0.7, 0.9, 1], 
    [250, 200, -40, -40, 60, -20, 80, 40]
  );

  // Z-depth for break out effect - starts behind glass, breaks through early
  const macbookZ = useTransform(scrollYProgress, 
    [0, 0.08, 0.14], 
    [-150, -50, 200]
  );

  // Smooth spring animations with more responsive settings
  const springConfig = { stiffness: 120, damping: 30, restDelta: 0.001 };
  const smoothX = useSpring(macbookX, springConfig);
  const smoothY = useSpring(macbookY, springConfig);
  const smoothScale = useSpring(macbookScale, springConfig);
  const smoothOpacity = useSpring(macbookOpacity, springConfig);
  const smoothZ = useSpring(macbookZ, springConfig);

  // Track current section
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const section = Math.floor(latest * 7); // 7 sections
      setCurrentSection(Math.min(section, 6));
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <>
      {/* Enhanced Glass Shatter Effect */}
      <GlassShatterEffect 
        scrollProgress={scrollYProgress} 
        scrollVelocity={scrollVelocity}
      />

      <motion.div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-30"
        style={{
          scale: smoothScale,
          opacity: smoothOpacity,
          x: smoothX,
          y: smoothY,
          z: smoothZ,
        }}
      >
        {/* 3D MacBook with much larger canvas to prevent cutoff */}
        <div className="w-full h-full flex items-center justify-center">
          <Canvas
            camera={{ position: [0, 0, 4], fov: 70 }}
            gl={{ alpha: true, antialias: true }}
            style={{
              width: '900px',
              height: '700px',
              pointerEvents: 'none',
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 3, 3]} intensity={1} />
              
              <ProfessionalMacBook 
                scrollProgress={scrollYProgress.get()}
                currentSection={currentSection}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Enhanced floating particles that respond to break out */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 6}%`,
                top: `${20 + (i % 5) * 15}%`,
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)`,
                y: useTransform(scrollYProgress, [0.08, 0.20], [0, (i % 2 ? -80 : 80)]),
                x: useTransform(scrollYProgress, [0.08, 0.20], [0, (i % 3 ? -50 : 50)]),
                opacity: useTransform(scrollYProgress, [0.08, 0.14, 0.20], [0.2, 1.2, 0.1]),
                scale: useTransform(scrollYProgress, [0.08, 0.14, 0.20], [0.4, 2, 0.1]),
              }}
              transition={{
                duration: 2 + i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Dynamic section transition glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0.14, 0.20, 0.85, 0.95], [0, 1, 1, 0]),
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/12 via-purple-500/12 to-cyan-500/12 rounded-full blur-3xl" />
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingMacBook;
useGLTF.preload(`${import.meta.env.BASE_URL}models/macbookprog.glb`); 