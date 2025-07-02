import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { logger } from '../utils/logger';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mousePosition = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      try {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } catch (error) {
        logger.error('Error resizing particle canvas', { error });
      }
    };

    const createParticles = () => {
      try {
        const particles: Particle[] = [];
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 25));
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            alpha: Math.random() * 0.6 + 0.2,
            size: Math.random() * 3 + 1
          });
        }
        
        particlesRef.current = particles;
        logger.debug('Particles created', { count: particles.length });
      } catch (error) {
        logger.error('Error creating particles', { error });
      }
    };

    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach(particle => {
          // Enhanced mouse interaction
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.vx += dx * force * 0.0002;
            particle.vy += dy * force * 0.0002;
          }
          
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Boundary collision with damping
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -0.8;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -0.8;
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }
          
          // Draw particle with glow effect
          ctx.globalAlpha = particle.alpha;
          
          // Glow effect
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#a855f7';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Reset shadow
          ctx.shadowBlur = 0;
        });
        
        // Draw enhanced connections
        particlesRef.current.forEach((particle, i) => {
          particlesRef.current.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const alpha = (120 - distance) / 120 * 0.15;
              ctx.globalAlpha = alpha;
              
              // Gradient line
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              );
              gradient.addColorStop(0, '#a855f7');
              gradient.addColorStop(1, '#06b6d4');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        });
        
        animationRef.current = requestAnimationFrame(animate);
      } catch (error) {
        logger.error('Error in particle animation', { error });
      }
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ background: 'transparent' }}
    />
  );
};