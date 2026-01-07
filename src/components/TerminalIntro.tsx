import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useResponsive from '../hooks/useResponsive';

// Professional MacBook Component
const ProfessionalMacBook = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/macbookprog.glb`);
  const responsive = useResponsive();

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.name.toLowerCase().includes('background')) {
          mesh.visible = false;
        }

        // Silver with blue accents
        const keyCandidates = ['plane005'];
        if (keyCandidates.some((key) => mesh.name.toLowerCase().startsWith(key))) {
          mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
          const mat = mesh.material as THREE.MeshStandardMaterial;

          mat.color = new THREE.Color('#e2e8f0'); // Silver
          mat.roughness = 0.3;
          mat.metalness = 0.9;
          mat.emissive = new THREE.Color('#3b82f6'); // Blue
          mat.emissiveIntensity = 0.15;
          mat.transparent = false;
          mat.opacity = 1;
          mat.needsUpdate = true;
        }

        // Laptop body
        if (mesh.name.toLowerCase().includes('laptop') || mesh.name.toLowerCase().includes('macbook')) {
          mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
          const mat = mesh.material as THREE.MeshStandardMaterial;
          
          mat.color = new THREE.Color('#cbd5e1'); // Light silver
          mat.roughness = 0.2;
          mat.metalness = 0.95;
          mat.emissive = new THREE.Color('#1e40af'); // Dark blue
          mat.emissiveIntensity = 0.08;
          mat.transparent = false;
          mat.opacity = 1;
          mat.needsUpdate = true;
        }

        // Screen with blue theme
        if (mesh.name.toLowerCase().includes('screen')) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color = new THREE.Color('#0f172a');
          mat.emissive = new THREE.Color('#3b82f6'); // Blue
          mat.emissiveIntensity = 0.5;
          mat.roughness = 0.1;
          mat.metalness = 0.3;
          mat.transparent = false;
          mat.opacity = 1;
          mat.needsUpdate = true;
        }

        // Hide bottom parts
        if (mesh.position.y < -0.35) {
          mesh.visible = false;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={modelRef} scale={responsive.macbookScale} position={[0, responsive.macbookPosition.y, 0]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
      
      {/* Enhanced dynamic lighting */}
      <pointLight 
        position={[0, 1, 0]} 
        intensity={0.8} 
        color="#3b82f6"
        distance={4}
      />
      
      <spotLight
        position={[2, 2, 2]}
        angle={0.4}
        penumbra={0.3}
        intensity={0.6}
        color="#1e40af"
      />
    </group>
  );
};

const TerminalIntro = () => {
  const sentences = [
    'Frontend',
    'Backend',
    'All of It',
  ];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Parallax mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll-based animations for repeated fade-in
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.8, once: false });
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');
  const [lastInView, setLastInView] = useState(false);
  const [animState, setAnimState] = useState<{ opacity: number, y: number }>({ opacity: 0, y: 200 });

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrollDir(y > lastY ? 'down' : 'up');
      lastY = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isInView && !lastInView) {
      // Entering view: always fade in from below and reset typing animation
      setAnimState({ opacity: 1, y: 0 });
      // Reset typing animation to start from beginning
      setText('');
      setIndex(0);
      setIsDeleting(false);
    } else if (!isInView && lastInView) {
      // Leaving view: fade out in scroll direction
      setAnimState(scrollDir === 'down' ? { opacity: 0, y: -200 } : { opacity: 0, y: 200 });
    }
    setLastInView(isInView);
  }, [isInView, lastInView, scrollDir]);

  const responsive = useResponsive();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let typingSpeed = isDeleting ? 50 : 100;
    const current = sentences[index];
    let timer: NodeJS.Timeout;

    if (!isDeleting && text.length < current.length) {
      timer = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(current.substring(0, text.length - 1));
      }, typingSpeed);
    } else if (!isDeleting && text === current) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % sentences.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, sentences]);

  return (
    <section ref={sectionRef} id="terminal-intro" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Uses global background - no individual background needed */}

      {/* 3D Laptop - positioned on the right side */}
      {!responsive.isMobile && (
        <motion.div 
          className="absolute right-0 top-0 w-1/2 lg:w-1/2 md:w-1/2 h-full pointer-events-none"
          initial={{ opacity: 0, y: 200 }}
          animate={animState}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transform: 'translateY(-5%)' }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{
              y: [-10, 10, -10],
              rotateY: [0, 2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Canvas
              camera={{ 
                position: [0, 1.2, 8],
                fov: 65
              }}
              gl={{ alpha: true, antialias: true }}
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 3, 3]} intensity={1} />
                <ProfessionalMacBook />
              </Suspense>
            </Canvas>
          </motion.div>
        </motion.div>
      )}

      {/* Flex container for left alignment on desktop */}
      <motion.div 
        className="flex w-full h-full items-center justify-center md:justify-start"
        initial={{ opacity: 0, y: 200 }}
        animate={animState}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div 
          className="text-center z-10 px-4 sm:px-6 max-w-4xl lg:max-w-5xl mx-auto md:mx-0 md:text-left"
          style={{ 
            transformStyle: 'preserve-3d', 
            marginLeft: responsive.isMobile ? 0 : responsive.isTablet ? '2vw' : '4vw',
            width: responsive.isMobile ? '100%' : responsive.isTablet ? '60%' : '50%',
            transform: responsive.isMobile ? 'translateY(-5%)' : 'translateY(-10%)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Terminal window mockup */}
          <motion.div
            className="bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-4 sm:mb-6 md:mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-600/30">
              <div className="flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-mono">jayden@portfolio:~$</div>
            </div>

            {/* Terminal content */}
            <div className="text-left">
              <div className="text-gray-400 text-xs sm:text-sm font-mono mb-2">$ echo "I develop..."</div>
                        <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-mono mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  {text}
                </span>
                <motion.span 
                  className="text-orange-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  |
                </motion.span>
              </motion.h1>
            </div>
          </motion.div>

          {/* Description - Commented out
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Building <span className="text-orange-400 font-semibold">digital experiences</span> that matter,{' '}
              <span className="text-red-400 font-semibold">one line of code</span> at a time.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
              {['React', 'Node.js', 'TypeScript', 'Python'].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700/50 rounded-full text-gray-300 text-xs sm:text-sm font-medium border border-gray-600/30 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(251, 146, 60, 0.2)' }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
          */}
        </motion.div>
      </motion.div>

      {/* Scroll indicator with mouse animation */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 inset-x-0 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <motion.span 
            className="text-sm mb-3 font-medium text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          
          {/* Mouse animation with downward scroll */}
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center items-start bg-gray-800/50 backdrop-blur-sm hover:border-orange-400 transition-colors cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              // Scroll to the next section (About)
              const about = document.getElementById('about');
              if (about) {
                about.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2 hover:bg-orange-400 transition-colors"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TerminalIntro;
