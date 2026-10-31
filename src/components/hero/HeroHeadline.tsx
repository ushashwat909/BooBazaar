import React, { useLayoutEffect, useRef } from 'react';
import { Flame } from 'lucide-react';
import { gsap } from '../../utils/animations';

export const HeroHeadline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const hatRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line-by-line staggered kinetic text mask reveals
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);

      gsap.fromTo(
        lines,
        {
          yPercent: 120,
          opacity: 0,
          rotateZ: 2,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          stagger: 0.08,
          ease: 'power4.out',
          duration: 1.1,
        }
      );

      // Elastic drop-in for the perched witch hat outline accent
      if (hatRef.current) {
        gsap.fromTo(
          hatRef.current,
          {
            scale: 0,
            rotate: -20,
            opacity: 0,
          },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            ease: 'back.out(2)',
            duration: 0.8,
            delay: 0.6,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-start space-y-4">
      {/* Line 1: Eyebrow Badge in Overflow-Hidden Mask */}
      <div className="overflow-hidden py-1">
        <div
          ref={line1Ref}
          className="will-change-transform inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pumpkin/10 border border-pumpkin/30 text-pumpkin text-xs font-bold tracking-widest uppercase shadow-sm"
        >
          <Flame className="w-3.5 h-3.5 text-pumpkin fill-pumpkin animate-pulse" />
          <span>Same Items. New Stories.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-pumpkin" />
          <span className="text-lavender-muted font-normal lowercase tracking-normal">
            hostel circulation
          </span>
        </div>
      </div>

      {/* Main Headline Lines inside Mask Wrappers */}
      <div className="space-y-1">
        {/* Line 2: "Every Treasure" */}
        <div className="overflow-hidden py-0.5">
          <h1
            ref={line2Ref}
            className="will-change-transform font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream leading-[1.12] tracking-tight m-0"
          >
            Every Treasure
          </h1>
        </div>

        {/* Line 3: "Deserves a Second Life." with perched witch hat */}
        <div className="overflow-hidden pt-7 -mt-7 pr-8 -mr-8 pb-1">
          <h1
            ref={line3Ref}
            className="will-change-transform font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream leading-[1.12] tracking-tight m-0"
          >
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pumpkin via-pumpkin-light to-potion-gold">
              Deserves
              {/* Elastic drop-in Witch Hat SVG Outline */}
              <span
                ref={hatRef}
                className="will-change-transform absolute -top-6 -right-6 text-coven-light origin-bottom-left select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(123,44,191,0.55)] z-20"
              >
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 fill-coven/40 stroke-coven-light stroke-[1.5]"
                  viewBox="0 0 48 48"
                >
                  <path d="M6 38c6-2 14-2 18-2s12 0 18 2c-3-1-5-3-5-5-8-1-20-1-26 0-1 2-3 4-5 5z" />
                  <path d="M19 32c0 0 3-14 5-22 3 5 4 10 5 22-3-1-7-1-10 0z" />
                  <polygon points="24,10 23,6 26,9" />
                  <path
                    d="M18 30c3-1 9-1 12 0"
                    stroke="#FF8A2B"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="24" cy="30" r="1.5" fill="#FF8A2B" />
                </svg>
              </span>
            </span>{' '}
            a Second Life.
          </h1>
        </div>
      </div>
    </div>
  );
};
