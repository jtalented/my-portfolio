import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [indicatorPosition, setIndicatorPosition] = useState({ top: 0, height: 0 });
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const navItems = [
    { name: 'Introduction', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#timeline' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
    const element = navItemsRef.current[index];
    if (element) {
      const rect = element.getBoundingClientRect();
      const containerRect = element.parentElement?.getBoundingClientRect();
      if (containerRect) {
        setIndicatorPosition({
          top: rect.top - containerRect.top,
          height: rect.height,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-12 h-12 flex flex-col items-center justify-center gap-2 group"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {/* Top Bar */}
        <motion.div
          className="relative w-8 h-0.5 bg-white overflow-hidden"
          animate={{
            y: isOpen ? -10 : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 -translate-x-full"
            whileHover={{ translateX: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="relative w-8 h-0.5 bg-white overflow-hidden"
          animate={{
            y: isOpen ? 10 : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 -translate-x-full"
            whileHover={{ translateX: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center group"
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative w-8 h-0.5 bg-white overflow-hidden rotate-45"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 -translate-x-full"
                  whileHover={{ translateX: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.button>

            <div className="flex h-full flex-col md:flex-row">
              {/* Navigation Items */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-0">
                <div className="relative w-full md:w-auto">
                  {/* Moving White Indicator - only on desktop */}
                  <AnimatePresence>
                    {hoveredItem !== null && (
                      <motion.div
                        className="absolute left-0 w-1 bg-white rounded-full hidden md:block"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: indicatorPosition.height,
                          top: indicatorPosition.top,
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>

                  <nav className="pl-0 md:pl-8 text-center">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        ref={(el) => (navItemsRef.current[index] = el)}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="block py-2 md:py-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white hover:text-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:via-red-400 hover:to-pink-400 hover:bg-clip-text transition-all duration-300"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Contact Info */}
              <div className="w-full md:w-80 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-800 p-4 md:p-0">
                <motion.div
                  className="text-center max-w-sm md:max-w-none"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h3 className="text-xl md:text-2xl font-light text-white mb-6 md:mb-8">Contact</h3>
                  
                  <div className="space-y-4 md:space-y-6 text-gray-300 mb-8 md:mb-12">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-orange-400 mb-1 md:mb-2">Email</p>
                      <a 
                        href="mailto:jaydentallen30@gmail.com" 
                        className="text-sm md:text-lg hover:text-white transition-colors duration-300 break-all"
                      >
                        jaydentallen30@gmail.com
                      </a>
                    </div>
                    
                    <div>
                      <p className="text-xs md:text-sm font-medium text-red-400 mb-1 md:mb-2">GitHub</p>
                      <a 
                        href="https://github.com/jtalented" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-lg hover:text-white transition-colors duration-300"
                      >
                        github.com/jtalented
                      </a>
                    </div>
                    
                    <div>
                      <p className="text-xs md:text-sm font-medium text-pink-400 mb-1 md:mb-2">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/jayden-allen-aa2083277/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-lg hover:text-white transition-colors duration-300"
                      >
                        linkedin.com/in/jayden-allen
                      </a>
                    </div>
                  </div>
                  
                  {/* Footer Branding */}
                  <div className="border-t border-gray-800 pt-6 md:pt-8">
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs md:text-sm">JA</span>
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium text-sm md:text-base">&copy; {new Date().getFullYear()} Jayden Allen</p>
                        <p className="text-slate-500 text-xs md:text-sm">Full Stack Developer</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-500 text-xs md:text-sm">
                      Built with React, TypeScript & Tailwind CSS
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 