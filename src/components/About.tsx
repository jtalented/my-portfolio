// components/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const About = () => {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Frame dimensions
  const frameWidthScale = 1.5;
  const frameHeightScale = 3;
  const frameScale = 1.5;
  const frameX = 0; // no horizontal shift
  const frameY = 90;
  const imageScale = 1;
  const originalFrameSizeUnit = 84;
  const frameWidth = originalFrameSizeUnit * frameWidthScale * frameScale;
  const frameHeight = originalFrameSizeUnit * frameHeightScale * frameScale;
  const borderRadiusValue = Math.min(frameWidth, frameHeight) / 2;

  return (
    <motion.section
      id="about"
      className="py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center" style={{ color: theme.colors.primary }}>
        About Me
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 max-w-5xl mx-auto">
        {/* Text Section */}
        <div
          className="flex-1 text-base sm:text-lg space-y-5"
          style={{ color: theme.colors.textSecondary }}
        >
          <p>
            Hey, I’m Jayden Allen — a developer, student, and builder who loves solving real-world problems with clean, scalable code. I'm currently studying Computer Science at BYU, where I’ve built a strong foundation in systems design, full stack engineering, and creative problem-solving.
          </p>
          <p>
            I’m driven by curiosity and a love for technology that empowers people. I enjoy designing intuitive interfaces, optimizing backend systems, and exploring the space where performance and usability meet. Whether it’s building tools, automating workflows, or learning something new, I’m all in on crafting meaningful solutions.
          </p>
          <p>
            Outside of tech, I love both playing and watching sports, experimenting with side projects, and spending time with friends and family. I value continuous learning, collaboration, and building things that make a difference.
          </p>
        </div>

        {/* Image Section with Gradient Frame */}
        <div
          className="flex-1 flex justify-center mt-10 md:mt-0"
          style={{ transform: `translateY(${frameY}px)` }}
        >
          <div
            className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"
            style={{
              width: `${frameWidth}px`,
              height: `${frameHeight}px`,
              borderRadius: `${borderRadiusValue}px`,
              transform: `scale(${frameScale})`,
              transformOrigin: 'center center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: `${borderRadiusValue}px`,
              }}
            >
              <img
                src="/images/IMG_1993 (3).PNG"
                alt="Jayden Allen"
                className="w-full h-full object-cover object-center"
                style={{
                  transform: `scale(${imageScale})`,
                  transformOrigin: 'center center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
