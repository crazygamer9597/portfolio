import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg opacity-20"
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg opacity-20"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};