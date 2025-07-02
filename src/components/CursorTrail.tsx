import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>();
  const mousePosition = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new trail point
      trailRef.current.push({
        x: mousePosition.x,
        y: mousePosition.y,
        alpha: 1
      });

      // Limit trail length
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }

      // Draw trail
      trailRef.current.forEach((point, index) => {
        const alpha = point.alpha * (index / trailRef.current.length);
        const size = 8 * (index / trailRef.current.length);

        ctx.globalAlpha = alpha * 0.3;
        
        // Create gradient for trail point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size
        );
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Fade out
        point.alpha *= 0.95;
      });

      // Remove faded points
      trailRef.current = trailRef.current.filter(point => point.alpha > 0.01);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
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
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
};