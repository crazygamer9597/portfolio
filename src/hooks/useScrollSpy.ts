import { useState, useEffect } from 'react';
import { analytics } from '../utils/analytics';
import { logger } from '../utils/logger';

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY + offset;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const section = document.getElementById(sectionIds[i]);
          if (section && section.offsetTop <= scrollPosition) {
            if (activeSection !== sectionIds[i]) {
              setActiveSection(sectionIds[i]);
              analytics.trackPageView(sectionIds[i]);
              logger.debug('Active section changed', { section: sectionIds[i] });
            }
            break;
          }
        }
      } catch (error) {
        logger.error('Error in scroll spy handler', { error });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};