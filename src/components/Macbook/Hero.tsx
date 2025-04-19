import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SceneCanvas from './SceneCanvas';
import { MacbookModelRef } from './MacbookModel';

const Hero = () => {
  const [zoomIn, setZoomIn] = useState(false);
  const [rotationStart, setRotationStart] = useState(Math.PI);
  const [rotationDone, setRotationDone] = useState(false);
  const modelRef = useRef<MacbookModelRef>(null);

  const handleZoom = () => {
    if (modelRef.current) {
      const currentRotation = modelRef.current.getCurrentRotation();
      setRotationStart(currentRotation);
    }
    setZoomIn(true);
    setRotationDone(false);
  };

  const handleBack = () => {
    setZoomIn(false);

    // ⏱️ Delay resetting rotationDone so camera can zoom out
    setTimeout(() => {
      setRotationDone(false);
    }, 1500); // Adjust this if you change camera animation speed
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-transparent">
      <SceneCanvas
        zoomIn={zoomIn}
        rotationStart={rotationStart}
        rotationDone={rotationDone}
        setRotationDone={setRotationDone}
        modelRef={modelRef}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: zoomIn ? 0 : 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1 className="text-5xl md:text-6xl font-bold text-white mb-4 pointer-events-auto">
          Jayden Allen
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-gray-300 mb-2 pointer-events-auto">
          Full-Stack Developer
        </motion.p>

        <motion.p className="text-md md:text-lg text-gray-400 mb-6 pointer-events-auto">
          Crafting immersive experiences
        </motion.p>

        <motion.button
          onClick={handleZoom}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects
        </motion.button>
      </motion.div>

      {zoomIn && rotationDone && (
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-20 bg-white text-black px-4 py-2 rounded shadow pointer-events-auto"
        >
          ← Back
        </button>
      )}
    </section>
  );
};

export default Hero;
