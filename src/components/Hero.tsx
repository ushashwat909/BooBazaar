import React, { useEffect, useRef } from 'react';
import { ArrowRight, PlusCircle, Shield, Dices, Star, ChevronDown, Compass } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';
import { GhostMist, SpookyBat } from './spooky/SpookyElements';
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
  const bgImageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Smooth Staggered Entrance Choreography
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.15 }
      );
    }

    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.headline-line');
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { y: 48, opacity: 0, rotateX: 12 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.15, stagger: 0.12 },
          '-=0.65'
        );
      }
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.75'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 22, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.08, ease: 'back.out(1.5)' },
        '-=0.65'
      );
    }

    if (trustRef.current) {
      tl.fromTo(
        trustRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    }

    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }

    // 2. Subtle Parallax Mousemove Physics on Background
    if (bgImageRef.current) {
      const bgX = gsap.quickTo(bgImageRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
      const bgY = gsap.quickTo(bgImageRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        bgX(-normX * 18);
        bgY(-normY * 14);
      };

      const handleScroll = () => {
        if (!bgImageRef.current) return;
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          gsap.set(bgImageRef.current, { y: scrollY * 0.32 });
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        tl.kill();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-[94vh] lg:min-h-screen flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* ============================================================== */}
      {/* 1. BREATHTAKING HIGH-RESOLUTION ATMOSPHERIC BACKGROUND & PARALLAX */}
      {/* ============================================================== */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-[112%] h-[112%] -left-[6%] -top-[6%] pointer-events-none will-change-transform z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2560&q=85"
          alt="Atmospheric Gothic Stone Vaults and Lantern Archives"
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>

      {/* ============================================================== */}
      {/* 2. MULTI-LAYER DARK GRADIENT & VIGNETTE OVERLAY */}
      {/* ============================================================== */}
      {/* Top Gradient for Navigation Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-obsidian/55 to-obsidian pointer-events-none z-10" />

      {/* Cinematic Radial Vignette Framing the Center */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(11,9,16,0.2) 0%, rgba(11,9,16,0.65) 60%, rgba(11,9,16,0.96) 100%)',
        }}
      />

      {/* Ambient Torchlight & Coven Accent Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gold/10 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-coven/20 rounded-full blur-[150px] pointer-events-none z-10" />

      {/* Subtle Atmospheric Light Shimmer Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(197, 160, 89, 0.45) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* ============================================================== */}
      {/* 3. SUBTLE ANIMATED ATMOSPHERIC ELEMENTS (Floating Embers & Mist) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/70 animate-pulse pointer-events-none"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 7 + 12) % 85}%`,
              left: `${(i * 11 + 6) % 92}%`,
              opacity: 0.2 + (i % 5) * 0.12,
              boxShadow: '0 0 10px rgba(197, 160, 89, 0.8)',
              animationDuration: `${3.5 + (i % 4)}s`,
              animationDelay: `${(i % 5) * 0.7}s`,
            }}
          />
        ))}
      </div>

      <GhostMist />

      {/* ============================================================== */}
      {/* 4. PROMINENT MAIN CINEMATIC HERO COMPOSITION */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 lg:pt-40 pb-12 flex flex-col items-center justify-center my-auto space-y-7 sm:space-y-8">
        
        {/* Uppercase Introductory Label Above the Heading */}
        <div ref={labelRef} className="inline-flex items-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-obsidian-surface/80 border border-gold/40 text-gold text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase backdrop-blur-md shadow-gold-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-bright animate-ping" />
            <span>AN UNTOLD NOCTURNAL CAMPUS ARCHIVE • 1,200+ RELICS PRESERVED</span>
          </div>
        </div>

        {/* Monumental Cinematic Main Heading */}
        <div className="relative max-w-4xl mx-auto">
          <h1
            ref={headlineRef}
            className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tight leading-[1.06] select-none"
            style={{ perspective: 1000 }}
          >
            <span className="headline-line block drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              TRADE YOUR RELICS.
            </span>
            <span className="headline-line relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold to-potion-gold drop-shadow-[0_4px_30px_rgba(197,160,89,0.35)] mt-1 sm:mt-2">
              SURVIVE THE SEMESTER.
              {/* Flying Bat Accent perched overhead */}
              <span className="hidden sm:inline-block absolute -top-8 -right-10 text-cream/70 select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(197,160,89,0.6)]">
                <SpookyBat size={42} />
              </span>
            </span>
          </h1>
        </div>

        {/* Short, Emotionally Engaging Description */}
        <p
          ref={descRef}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream/90 font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
        >
          When midnight descends across the hostel wings, no currency changes hands. Barter
          scientific calculators, engineering drafters, midnight induction kettles, and sacred handwritten
          exam notes directly with fellow scholars before the final hour.
        </p>

        {/* Two Cinematic CTA Buttons with Elegant Magnetic Physics */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
        >
          {/* Primary CTA: EXPLORE EXPERIENCES */}
          <Magnetic strength={0.8}>
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 sm:px-9 py-4 rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group relative overflow-hidden"
            >
              <span>EXPLORE EXPERIENCES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>

          {/* Secondary CTA: BOOK YOUR EXPERIENCE */}
          <Magnetic strength={0.8}>
            <button
              onClick={onBrewClick}
              className="w-full sm:w-auto px-8 sm:px-9 py-4 rounded-full bg-obsidian-dark/75 backdrop-blur-md border border-gold/40 hover:border-gold hover:bg-gold/15 text-gold-bright font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
            >
              <PlusCircle className="w-4 h-4 text-gold group-hover:rotate-90 transition-transform duration-300" />
              <span>BOOK YOUR EXPERIENCE</span>
            </button>
          </Magnetic>

          {/* Minigame Quick Trigger */}
          {onOpenOuija && (
            <Magnetic strength={0.6}>
              <button
                onClick={onOpenOuija}
                className="w-full sm:w-auto px-5 py-4 rounded-full bg-obsidian-surface/60 border border-coven/40 text-gold-bright hover:bg-gold/10 font-cinzel text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                title="Summon the Spirit Oracle for Room Predictions"
              >
                <Dices className="w-4 h-4 text-gold" />
                <span>Spirit Oracle</span>
              </button>
            </Magnetic>
          )}
        </div>

        {/* Social Proof & Accreditation Band */}
        <div
          ref={trustRef}
          className="pt-1 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-lavender-muted/90"
        >
          <div className="flex items-center gap-1.5 text-gold font-cinzel font-semibold">
            <div className="flex items-center text-gold">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            </div>
            <span className="tracking-wide">4.9 / 5 by 600+ Students</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-gold" />
            <span className="font-medium text-cream/80">100% University Verified</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-medium text-cream/80">Zero Currency Protocol Active</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. SMALL ANIMATED SCROLL INDICATOR AT THE BOTTOM */}
      {/* ============================================================== */}
      <div
        ref={scrollIndicatorRef}
        onClick={onExploreClick}
        className="relative z-20 pb-8 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] font-cinzel tracking-[0.3em] text-gold/75 group-hover:text-gold uppercase transition-colors">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border border-gold/40 flex justify-center pt-1.5 group-hover:border-gold transition-colors">
          <div className="w-1 h-2 rounded-full bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
};