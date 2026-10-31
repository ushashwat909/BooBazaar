import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../../utils/animations';
import { Ghost, Sparkles, MessageCircle, X, Dice5 } from 'lucide-react';
import { hauntedAudio } from './HauntedAudio';

interface GhostCompanionProps {
  onOpenOuija: () => void;
}

const HOSTEL_GHOST_TIPS = [
  "Pssst... Room 204 in Block B has an illegal electric kettle hidden under the desk.",
  "I died during 2019 end-sems... don't stay up without Maggi!",
  "Trade your lab drafter before the 4th-year freshers arrive at midnight.",
  "The warden sleeps between 2:15 AM and 3:30 AM. That's the golden barter hour.",
  "Cursed rumor: Anyone who borrows mechanical notes without bartering fails viva!",
  "Spin the Ouija Oracle to summon free karma points from the other realm!",
];

export const GhostCompanion: React.FC<GhostCompanionProps> = ({ onOpenOuija }) => {
  const ghostRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [bubbleText, setBubbleText] = useState<string | null>(
    "Boo! Need hostel essentials? Click me or summon the Ouija Oracle!"
  );
  const [tipIndex, setTipIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!ghostRef.current) return;

    // Continuous spectral floating physics
    const floatTween = gsap.to(ghostRef.current, {
      y: -10,
      rotate: 3,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      floatTween.kill();
    };
  }, []);

  const handleGhostClick = () => {
    hauntedAudio.playGhostChime();

    // Spooky spin animation on click
    if (ghostRef.current) {
      gsap.fromTo(
        ghostRef.current,
        { scale: 0.85, rotate: -15 },
        { scale: 1.1, rotate: 360, duration: 0.6, ease: 'back.out(2)', onComplete: () => {
          gsap.to(ghostRef.current, { scale: 1, rotate: 0, duration: 0.3 });
        }}
      );
    }

    // Cycle to next hilarious hostel rumor
    const nextIdx = (tipIndex + 1) % HOSTEL_GHOST_TIPS.length;
    setTipIndex(nextIdx);
    setBubbleText(HOSTEL_GHOST_TIPS[nextIdx]);

    if (bubbleRef.current) {
      gsap.fromTo(
        bubbleRef.current,
        { opacity: 0, scale: 0.8, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }
      );
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-obsidian-surface border border-gold/40 text-gold shadow-gold-glow hover:scale-110 transition-all flex items-center gap-2 group"
        title="Summon Barnaby the Archival Phantom"
      >
        <Ghost className="w-5 h-5 group-hover:rotate-12 transition-transform text-gold" />
        <span className="text-xs font-cinzel font-bold text-cream pr-1">Barnaby</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble */}
      {bubbleText && (
        <div
          ref={bubbleRef}
          className="pointer-events-auto max-w-xs mb-3 p-3.5 rounded-2xl bg-obsidian-surface/95 border border-gold/30 shadow-2xl backdrop-blur-md text-xs text-cream relative will-change-transform"
        >
          <button
            onClick={() => setBubbleText(null)}
            className="absolute top-2 right-2 text-lavender-muted hover:text-cream p-1"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="flex items-start gap-2 pr-3">
            <span className="text-sm">👻</span>
            <p className="leading-relaxed font-medium text-cream/90">{bubbleText}</p>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-gold/20">
            <button
              onClick={handleGhostClick}
              className="text-[10px] font-cinzel font-bold text-gold hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>More Phantom Lore</span>
            </button>

            <button
              onClick={() => {
                hauntedAudio.playGhostChime();
                onOpenOuija();
              }}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-[10px] uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1"
            >
              <Dice5 className="w-3 h-3 stroke-[2.5]" />
              <span>Ouija Oracle</span>
            </button>
          </div>

          {/* Pointer caret */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-obsidian-surface/95 border-r border-b border-gold/30 rotate-45" />
        </div>
      )}

      {/* Ghost Character Figure */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setIsMinimized(true)}
          className="text-lavender-muted hover:text-cream text-xs p-1"
          title="Minimize Ghost"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div
          ref={ghostRef}
          onClick={handleGhostClick}
          className="cursor-pointer group relative w-16 h-20 flex flex-col items-center justify-center will-change-transform"
          title="Click Barnaby the Hostel Ghost!"
        >
          {/* Eerie Ghost Aura Glow */}
          <div className="absolute inset-0 bg-pumpkin/25 rounded-full blur-xl group-hover:bg-coven/40 transition-colors" />

          {/* Spectral Ghost SVG Figure */}
          <svg
            className="w-16 h-20 drop-shadow-[0_8px_16px_rgba(255,138,43,0.4)] group-hover:drop-shadow-[0_8px_20px_rgba(123,44,191,0.6)] transition-all duration-300"
            viewBox="0 0 100 130"
            fill="none"
          >
            {/* Spectral Tail & Shroud */}
            <path
              d="M50 10 C25 10 15 32 15 58 C15 88 10 115 25 125 C33 130 40 118 50 125 C60 118 67 130 75 125 C90 115 85 88 85 58 C85 32 75 10 50 10 Z"
              fill="url(#ghostGrad)"
              stroke="rgba(255, 145, 48, 0.5)"
              strokeWidth="2"
            />

            {/* Glowing Eyes */}
            <ellipse cx="38" cy="46" rx="6" ry="8" fill="#0B0813" />
            <circle cx="39" cy="44" r="2.5" fill="#2EC4B6" />

            <ellipse cx="62" cy="46" rx="6" ry="8" fill="#0B0813" />
            <circle cx="63" cy="44" r="2.5" fill="#2EC4B6" />

            {/* Mischievous Smile */}
            <path
              d="M42 62 Q50 69 58 62"
              stroke="#0B0813"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Floating Mini Brass Lantern */}
            <g transform="translate(68, 65)">
              <rect x="0" y="4" width="12" height="16" rx="3" fill="#151022" stroke="#C5A059" strokeWidth="1.5" />
              <circle cx="6" cy="12" r="3.5" fill="#E5C158" className="animate-pulse" />
              <line x1="6" y1="0" x2="6" y2="4" stroke="#C5A059" strokeWidth="1.5" />
            </g>

            {/* Ghost Shading Gradient */}
            <defs>
              <linearGradient id="ghostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="70%" stopColor="#E6DCBF" />
                <stop offset="100%" stopColor="#8C6D37" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating Tag */}
          <span className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-obsidian-surface/95 border border-gold/40 text-[9px] font-cinzel font-bold text-gold-bright shadow-sm">
            Barnaby ✦
          </span>
        </div>
      </div>
    </div>
  );
};

