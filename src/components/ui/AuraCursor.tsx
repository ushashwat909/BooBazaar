import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/animations';

export const AuraCursor: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / mobile devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const orb = orbRef.current;
    const dot = dotRef.current;
    if (!orb || !dot) return;

    // Set initial positions offscreen
    gsap.set([orb, dot], { xPercent: 0, yPercent: 0, opacity: 0 });

    // Fluid quickTo setters for 60fps tracking
    const orbX = gsap.quickTo(orb, 'x', { duration: 0.5, ease: 'power3' });
    const orbY = gsap.quickTo(orb, 'y', { duration: 0.5, ease: 'power3' });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([orb, dot], { opacity: 1, duration: 0.4 });
        isVisible = true;
      }
      orbX(e.clientX);
      orbY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([orb, dot], { opacity: 0, duration: 0.4 });
      isVisible = false;
    };

    const onMouseEnter = () => {
      gsap.to([orb, dot], { opacity: 1, duration: 0.4 });
      isVisible = true;
    };

    // Interactive Hover Tracking
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, .interactive-card, [role="button"]');
      if (interactive) {
        gsap.to(dot, {
          scale: 2.2,
          borderColor: '#C5A059',
          borderWidth: 1.5,
          backgroundColor: 'rgba(197, 160, 89, 0.2)',
          boxShadow: '0 0 16px rgba(229, 193, 88, 0.6)',
          duration: 0.25,
          ease: 'power2.out',
        });

        gsap.to(orb, {
          scale: 1.25,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, .interactive-card, [role="button"]');
      if (interactive) {
        gsap.to(dot, {
          scale: 1,
          borderColor: 'rgba(197, 160, 89, 0.4)',
          borderWidth: 1,
          backgroundColor: '#C5A059',
          boxShadow: '0 0 8px rgba(197, 160, 89, 0.5)',
          duration: 0.25,
          ease: 'power2.out',
        });

        gsap.to(orb, {
          scale: 1,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 280px Ambient Spotlight Orb */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[280px] h-[280px] -ml-[140px] -mt-[140px] pointer-events-none z-30 gpu-accelerated rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, rgba(59, 28, 87, 0.04) 50%, transparent 70%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Crisp 8px Center Dot with Burnished Gold Glow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[8px] h-[8px] -ml-[4px] -mt-[4px] pointer-events-none z-50 gpu-accelerated rounded-full border border-gold/40 bg-gold shadow-[0_0_8px_rgba(197,160,89,0.6)]"
      />
    </>
  );
};

