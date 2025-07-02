import { useState, useEffect } from 'react';
import { logger } from '../utils/logger';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      try {
        setMousePosition({ x: e.clientX, y: e.clientY });
      } catch (error) {
        logger.error('Error updating mouse position', { error });
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    logger.debug('Mouse position tracking initialized');

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      logger.debug('Mouse position tracking cleaned up');
    };
  }, []);

  return mousePosition;
};