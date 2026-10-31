import React, { useRef, useEffect } from 'react';
import { gsap } from '../../utils/animations';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  active?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 1,
  className = '',
  active = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    // Skip on touch/mobile devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX * 0.35,
        y: deltaY * 0.35,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, active]);

  return (
    <div
      ref={containerRef}
      className={`inline-block gpu-accelerated ${className}`}
    >
      {children}
    </div>
  );
};

