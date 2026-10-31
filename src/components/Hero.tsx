import React, { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, PlusCircle, Shield, Users, Dices, Skull, Flame } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';
import { HeroHeadline } from './hero/HeroHeadline';
import { CobwebCorner, GhostMist } from './spooky/SpookyElements';
import { gsap } from '../utils/animations';

interface HeroProps {
  onExploreClick: () => void;
  onBrewClick: () => void;
  onOpenOuija?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onBrewClick,
  onOpenOuija,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const floatingItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !bgRef.current || !bottleRef.current) return;

    // Layer 1 (Glowing potion bottle): Continuous floating idle loop
    const bottleTween = gsap.to(bottleRef.current, {
      y: -12,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Layer 2 (Floating magical badges & bats): Orbiting micro-adjustments
    let itemsTween: gsap.core.Tween | null = null;
    if (floatingItemsRef.current) {
      itemsTween = gsap.to(floatingItemsRef.current, {
        rotate: 6,
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 3.4,
        ease: 'sine.inOut',
      });
    }

    // Setters for smooth 3D tilt and inverted background parallax
    const rotateXTo = gsap.quickTo(cardRef.current, 'rotationX', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const rotateYTo = gsap.quickTo(cardRef.current, 'rotationY', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const bgXTo = gsap.quickTo(bgRef.current, 'x', {
      duration: 0.7,
      ease: 'power2.out',
    });
    const bgYTo = gsap.quickTo(bgRef.current, 'y', {
      duration: 0.7,
      ease: 'power2.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !cardRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();

      const normX = Math.max(
        -1,
        Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1)
      );
      const normY = Math.max(
        -1,
        Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1)
      );

      rotateYTo(normX * 8);
      rotateXTo(-normY * 8);

      const deltaX = e.clientX - (rect.left + rect.width / 2);
      const deltaY = e.clientY - (rect.top + rect.height / 2);
      bgXTo(-deltaX * 0.015);
      bgYTo(-deltaY * 0.015);
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      bgXTo(0);
      bgYTo(0);
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      bottleTween.kill();
      if (itemsTween) itemsTween.kill();
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden"
    >
      <GhostMist />

      {/* Atmospheric Background Apothecary Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-coven/20 rounded-full blur-[120px]" />
        <div className="absolute top-24 right-1/4 w-[450px] h-[450px] bg-pumpkin/15 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 138, 43, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action Controls */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Bold, Grounded Headline */}
            <HeroHeadline />

            {/* Subtext */}
            <p className="text-base sm:text-lg text-lavender-muted max-w-xl font-normal leading-relaxed">
              Passed down from 4th-year phantoms to freshers at 3 AM. Zero currency,
              pure hostel barter. Trade lab drafters, electric kettles, Casio calculators,
              and sacred exam notes before the next full moon.
            </p>

            {/* CTA Buttons with Magnetic Physics */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <Magnetic strength={1.2}>
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-pumpkin via-pumpkin to-pumpkin-dark text-obsidian-dark font-extrabold text-sm tracking-wide shadow-potion-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Cursed Relics</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic strength={1}>
                <button
                  onClick={onBrewClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-coven/25 border border-coven/40 text-cream font-semibold text-sm hover:bg-coven/40 hover:border-coven/60 hover:shadow-coven-glow transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-coven-light" />
                  <span>Brew a Listing</span>
                </button>
              </Magnetic>

              {onOpenOuija && (
                <Magnetic strength={0.8}>
                  <button
                    onClick={onOpenOuija}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-obsidian-surface border border-pumpkin/30 text-pumpkin hover:bg-pumpkin/15 font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Dices className="w-4 h-4" />
                    <span>Ouija Oracle Game</span>
                  </button>
                </Magnetic>
              )}
            </div>

            {/* Micro Trust Indicators - Authentic Dorm Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-lavender-muted">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-potion-emerald" />
                <span>Verified Campus Roll Numbers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-pumpkin" />
                <span>Zero Cash • 100% Barter</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Skull className="w-4 h-4 text-coven-light" />
                <span>Guarded by Hostel Phantoms</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Apothecary Visual Showcase Card with Ambient Parallax */}
          <div
            className="lg:col-span-5 relative flex justify-center"
            style={{ perspective: 1200 }}
          >
            {/* Main Showcase Container with 3D Tilt */}
            <div
              ref={cardRef}
              className="interactive-card relative w-full max-w-md rounded-3xl bg-gradient-to-b from-obsidian-card to-obsidian-dark border border-pumpkin/25 p-5 sm:p-6 shadow-2xl overflow-hidden group will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <CobwebCorner position="top-right" size={64} />

              {/* Inner ambient light */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-pumpkin/20 rounded-full blur-3xl group-hover:bg-pumpkin/30 transition-all duration-500 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-coven/25 rounded-full blur-3xl pointer-events-none" />

              {/* Visual Scene: Glowing Potion Flask, Vintage Books & Ambient Night Scene */}
              <div className="relative rounded-2xl overflow-hidden bg-obsidian-surface/80 border border-white/5 aspect-[4/3] flex items-center justify-center">
                {/* Layer 0 (Apothecary background): Moves subtly inverted on mousemove */}
                <div
                  ref={bgRef}
                  className="absolute inset-0 w-[114%] h-[114%] -left-[7%] -top-[7%] will-change-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
                    alt="Apothecary Books and Atmosphere"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                </div>

                {/* Layer 1 (Glowing potion bottle): Continuous floating idle loop */}
                <div
                  ref={bottleRef}
                  className="relative z-10 flex flex-col items-center will-change-transform"
                >
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-b from-coven/40 to-obsidian-surface border border-pumpkin/40 shadow-potion-glow backdrop-blur-md flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-pumpkin drop-shadow-[0_0_12px_rgba(255,138,43,0.8)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 2h6" />
                      <path d="M10 2v4a2 2 0 0 1-.586 1.414l-4.828 4.828A4 4 0 0 0 3.414 15V18a4 4 0 0 0 4 4h9.172a4 4 0 0 0 4-4v-3a4 4 0 0 0-1.172-2.758L14.586 7.414A2 2 0 0 1 14 6V2" />
                      <line
                        x1="8"
                        y1="14"
                        x2="16"
                        y2="14"
                        stroke="#2EC4B6"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="absolute bottom-2 left-6 w-1.5 h-1.5 rounded-full bg-potion-emerald animate-ping" />
                  </div>
                  <span className="mt-3 px-3 py-1 rounded-full bg-obsidian/90 border border-pumpkin/30 text-potion-emerald text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                    Hostel Exchange Active
                  </span>
                </div>

                {/* Layer 2 (Floating magical badges): Orbiting micro-adjustments */}
                <div
                  ref={floatingItemsRef}
                  className="absolute inset-0 pointer-events-none z-20 will-change-transform"
                >
                  {/* Top Left Live Activity Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-obsidian/90 border border-white/10 text-[11px] text-cream backdrop-blur-sm shadow-md">
                    <span className="w-2 h-2 rounded-full bg-potion-emerald animate-pulse" />
                    <span>Block B • Bartered Drafter at 2 AM</span>
                  </div>

                  {/* Top Right Circulation Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian/90 border border-coven/30 text-[11px] text-coven-light backdrop-blur-sm shadow-md">
                    <BookOpen className="w-3 h-3" />
                    <span>32 Cursed Relics Active</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Detail: Haunted Mission Badge */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-obsidian-surface via-obsidian-surface to-coven/15 border border-pumpkin/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pumpkin/20 border border-pumpkin/30 flex items-center justify-center text-pumpkin shrink-0">
                  <Flame className="w-4 h-4 fill-pumpkin" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cream tracking-wide">
                    Passed Down Through 4 Batches
                  </span>
                  <span className="text-[11px] text-lavender-muted font-medium">
                    Keep your room clutter-free. Save ₹10,000 every semester.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
