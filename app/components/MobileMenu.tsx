"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
      <motion.button
        type="button"
        className={`fixed top-4 right-4 z-50 p-2 rounded-full cursor-pointer transition-colors duration-300 ${
          scrolled ? 'bg-white/10 backdrop-blur-md' : 'bg-transparent'
        }`}
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
            />
            <motion.nav
              className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-black z-40 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="h-full flex flex-col p-6 space-y-6">
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="self-end p-2 -mr-2 -mt-2"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <ul className="flex flex-col space-y-4 mt-8">
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('work')}
                      className="text-2xl font-light hover:opacity-70 transition-opacity"
                    >
                      Work
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('about')}
                      className="text-2xl font-light hover:opacity-70 transition-opacity"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="text-2xl font-light hover:opacity-70 transition-opacity"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
                
                <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().getFullYear()} Karman Kekana
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
