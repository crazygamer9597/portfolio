import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { ParticleBackground } from './components/ParticleBackground';
import { CursorTrail } from './components/CursorTrail';
import { analytics } from './utils/analytics';
import { logger } from './utils/logger';

function App() {
  React.useEffect(() => {
    logger.info('Portfolio application initialized');
    
    // Initialize analytics tracking
    analytics.trackPageView('home');
    
    // Save analytics data when the user leaves
    const handleBeforeUnload = () => {
      analytics.saveSession();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-900 font-sans relative">
        <ParticleBackground />
        <CursorTrail />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <footer className="bg-dark-950 text-gray-300 py-8 border-t border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Nihal Johann Thomas. All rights reserved.</p>
          </div>
        </footer>
        <Analytics />
      </div>
    </ErrorBoundary>
  );
}

export default App;