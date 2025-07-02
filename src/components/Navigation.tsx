import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { AdminPanel } from './AdminPanel';
import { logger } from '../utils/logger';

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [homeClickCount, setHomeClickCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const activeSection = useScrollSpy(navigationItems.map(item => item.id));

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        logger.debug('Scrolled to section', { sectionId });
      }
    } catch (error) {
      logger.error('Error scrolling to section', { sectionId, error });
    }
  };

  const handleHomeClick = () => {
    const newCount = homeClickCount + 1;
    setHomeClickCount(newCount);
    
    if (newCount >= 8) {
      setShowAdminPanel(true);
      setHomeClickCount(0);
      logger.info('Admin panel opened via home button clicks');
    } else {
      scrollToSection('home');
    }
    
    // Reset counter after 5 seconds of inactivity
    setTimeout(() => {
      setHomeClickCount(0);
    }, 5000);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleHomeClick}
              className="font-bold text-xl text-white hover:scale-105 transition-transform"
            >
              <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                Nihal Johann Thomas
              </span>
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'home' ? handleHomeClick() : scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all hover:text-primary-400 relative ${
                    activeSection === item.id
                      ? 'text-primary-400'
                      : 'text-gray-300'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400"
                    />
                  )}
                </button>
              ))}
              
              {/* Contact Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full hover:shadow-glow transition-all"
              >
                Contact
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-primary-400 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-900/95 backdrop-blur-lg border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.id === 'home' ? handleHomeClick() : scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'text-primary-400 bg-primary-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </>
  );
};