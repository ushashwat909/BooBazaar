import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Sparkles, HelpCircle, Dices, Award, Flame, Skull } from 'lucide-react';
import { gsap } from '../../utils/animations';
import { CobwebCorner } from './SpookyElements';
import { hauntedAudio } from './HauntedAudio';

interface OuijaOracleGameProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardKarma: (points: number) => void;
}

const PRESET_SPIRIT_QUESTIONS = [
  {
    q: 'Where is my missing engineering drafter?',
    spelling: ['B', 'L', 'O', 'C', 'K', ' ', 'B'],
    answer: 'The spirits point to Block B Room 204. It was bartered for 2 Maggi packs.',
  },
  {
    q: 'Will the mess food be edible tonight?',
    spelling: ['N', 'O'],
    answer: 'The planchette rushed to NO! Better trade for instant noodles in the pantry.',
  },
  {
    q: 'Who has a working Casio calculator right now?',
    spelling: ['M', 'E', 'E', 'R', 'A'],
    answer: 'Meera from Block C is holding the calculator. Send her a bargain chat!',
  },
  {
    q: 'Will I survive tomorrow’s 8 AM laboratory?',
    spelling: ['Y', 'E', 'S'],
    answer: 'YES! If you borrow the 2nd year lab manual from the Coven shelf.',
  },
];

const WHEEL_PRIZES = [
  { label: '+50 Karma Potions', points: 50, color: '#C5A059' },
  { label: 'Midnight Maggi Blessing', points: 30, color: '#8C6D37' },
  { label: 'Warden Immunity Charm', points: 20, color: '#E5C158' },
  { label: '+100 Super Karma Relic', points: 100, color: '#D4AF37' },
  { label: 'Spectral Barter Boost', points: 40, color: '#B38F48' },
  { label: 'Cursed Notes Protection', points: 25, color: '#99732B' },
];

export const OuijaOracleGame: React.FC<OuijaOracleGameProps> = ({
  isOpen,
  onClose,
  onAwardKarma,
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'ouija' | 'wheel'>('ouija');

  // Ouija State
  const planchetteRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [activeQuestion, setActiveQuestion] = useState(PRESET_SPIRIT_QUESTIONS[0]);
  const [isSpelling, setIsSpelling] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState<string | null>(null);

  // Wheel State
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<typeof WHEEL_PRIZES[0] | null>(null);

  if (!isOpen) return null;

  // Run Ouija Planchette Spell Animation
  const handleAskQuestion = (item: typeof PRESET_SPIRIT_QUESTIONS[0]) => {
    if (isSpelling) return;
    setActiveQuestion(item);
    setIsSpelling(true);
    setRevealedAnswer(null);
    hauntedAudio.playGhostChime();

    const planchette = planchetteRef.current;
    if (!planchette || !boardRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsSpelling(false);
        setRevealedAnswer(item.answer);
        hauntedAudio.playGhostChime();
        onAwardKarma(15);
      },
    });

    // Initial eerie shudder
    tl.to(planchette, {
      x: 10,
      y: -10,
      rotate: 8,
      duration: 0.15,
      repeat: 3,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Move across the board
    if (item.spelling.includes('N') && item.spelling.length === 2) {
      // Rush to NO (Top Right of board)
      tl.to(planchette, {
        x: 130,
        y: -90,
        rotate: -12,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    } else if (item.spelling.includes('Y') && item.spelling.length === 3) {
      // Rush to YES (Top Left of board)
      tl.to(planchette, {
        x: -130,
        y: -90,
        rotate: 12,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    } else {
      // Roam across the arc
      tl.to(planchette, {
        x: -90,
        y: -20,
        rotate: -5,
        duration: 0.7,
        ease: 'sine.inOut',
      })
        .to(planchette, {
          x: 40,
          y: -40,
          rotate: 10,
          duration: 0.6,
          ease: 'sine.inOut',
        })
        .to(planchette, {
          x: -20,
          y: 20,
          rotate: -8,
          duration: 0.6,
          ease: 'sine.inOut',
        })
        .to(planchette, {
          x: 100,
          y: 10,
          rotate: 5,
          duration: 0.7,
          ease: 'sine.inOut',
        })
        .to(planchette, {
          x: 0,
          y: -10,
          rotate: 0,
          duration: 0.5,
          ease: 'back.out(1.5)',
        });
    }
  };

  // Spin the Cursed Wheel
  const handleSpinWheel = () => {
    if (isSpinning || !wheelRef.current) return;
    setIsSpinning(true);
    setWheelResult(null);
    hauntedAudio.playGhostChime();

    const randomDeg = 1440 + Math.floor(Math.random() * 360);
    const prizeIndex = Math.floor(((360 - (randomDeg % 360)) % 360) / (360 / WHEEL_PRIZES.length));
    const prize = WHEEL_PRIZES[prizeIndex] || WHEEL_PRIZES[0];

    gsap.to(wheelRef.current, {
      rotate: `+=${randomDeg}`,
      duration: 3.8,
      ease: 'power4.out',
      onComplete: () => {
        setIsSpinning(false);
        setWheelResult(prize);
        onAwardKarma(prize.points);
        hauntedAudio.playGhostChime();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-dark/90 backdrop-blur-md animate-in fade-in duration-300">
      {/* Game Window Card */}
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-obsidian-card border border-gold/30 shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CobwebCorner position="top-left" size={68} />
        <CobwebCorner position="top-right" size={68} />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-coven/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gold/20 relative z-20">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coven via-obsidian to-gold-dark border border-gold/40 flex items-center justify-center text-xl shadow-gold-glow">
              🔮
            </div>
            <div>
              <span className="text-[10px] font-cinzel tracking-widest text-gold uppercase block">The Supernatural Oracle</span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-cream flex items-center gap-2">
                <span>The Spectral Ouija & Vault Wheel</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold">
                  Vault Oracle
                </span>
              </h2>
              <p className="text-xs text-lavender-muted mt-0.5">
                Summon hostel phantoms, track missing room relics, and claim supernatural karma.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-lavender-muted hover:text-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 my-4 relative z-20">
          <button
            onClick={() => setActiveTab('ouija')}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'ouija'
                ? 'bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian shadow-gold-glow'
                : 'bg-white/5 text-lavender-muted hover:text-cream border border-transparent hover:border-gold/30'
            }`}
          >
            <span>📜 Spirit Board (Ask Ouija)</span>
          </button>

          <button
            onClick={() => setActiveTab('wheel')}
            className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'wheel'
                ? 'bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian shadow-gold-glow'
                : 'bg-white/5 text-lavender-muted hover:text-cream border border-transparent hover:border-gold/30'
            }`}
          >
            <Dices className="w-3.5 h-3.5" />
            <span>🎡 Cursed Vault Wheel</span>
          </button>

          <div className="ml-auto text-xs font-cinzel text-gold-bright font-bold">
            {currentUser ? `${currentUser.karma_points} Karma Points` : 'Guest Spirit'}
          </div>
        </div>

        {/* TAB 1: THE OUIJA SPIRIT BOARD */}
        {activeTab === 'ouija' && (
          <div className="space-y-4 relative z-20">
            {/* The Wooden Board Canvas */}
            <div
              ref={boardRef}
              className="relative aspect-[16/9] w-full rounded-2xl border-2 border-gold/40 p-4 sm:p-6 flex flex-col justify-between items-center text-center overflow-hidden shadow-2xl"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, #201710 0%, #120C07 80%, #080504 100%)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.85), 0 10px 30px rgba(0,0,0,0.9)',
              }}
            >
              {/* Board Header: YES / NO */}
              <div className="w-full flex items-center justify-between text-gold-bright/80 font-cinzel font-bold text-sm sm:text-base tracking-widest px-4">
                <span className="border-b border-gold/40 pb-0.5">✦ YES ✦</span>
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
                  ARCHIVAL SPIRIT ORACLE
                </span>
                <span className="border-b border-gold/40 pb-0.5">✦ NO ✦</span>
              </div>

              {/* Carved Letters Arc */}
              <div className="w-full py-2">
                <p className="font-cinzel text-lg sm:text-2xl text-gold-bright/90 tracking-[0.35em] font-bold select-none">
                  A B C D E F G H I J K L M
                </p>
                <p className="font-cinzel text-lg sm:text-2xl text-gold-bright/90 tracking-[0.35em] font-bold select-none mt-1">
                  N O P Q R S T U V W X Y Z
                </p>
                <p className="font-cinzel text-sm sm:text-base text-gold tracking-[0.5em] font-bold select-none mt-2">
                  1 2 3 4 5 6 7 8 9 0
                </p>
              </div>

              {/* The Planchette (Spirit Pointer) */}
              <div
                ref={planchetteRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform z-30"
              >
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.9)]">
                  {/* Wooden Planchette SVG */}
                  <svg viewBox="0 0 100 120" className="w-full h-full">
                    <path
                      d="M50 8 C20 40 12 75 22 108 C35 116 65 116 78 108 C88 75 80 40 50 8 Z"
                      fill="#4A2E16"
                      stroke="#C5A059"
                      strokeWidth="3"
                    />
                    <circle cx="50" cy="55" r="14" fill="#0B0813" opacity="0.7" />
                    <circle
                      cx="50"
                      cy="55"
                      r="12"
                      fill="none"
                      stroke="#E5C158"
                      strokeWidth="2.5"
                    />
                    <circle cx="50" cy="55" r="3" fill="#C5A059" />
                  </svg>
                </div>
              </div>

              {/* Board Footer */}
              <div className="w-full text-center text-gold/60 font-cinzel text-xs tracking-[0.4em]">
                ✦ GOOD BYE ✦
              </div>
            </div>

            {/* Spirit Answer Box */}
            {revealedAnswer ? (
              <div className="p-3.5 rounded-2xl bg-obsidian-surface border border-gold/40 text-center animate-in zoom-in-95 duration-300 shadow-gold-glow">
                <span className="text-xs font-cinzel font-bold text-gold uppercase tracking-wider block mb-1">
                  👻 The Phantoms Have Spoken (+15 Karma Awarded)
                </span>
                <p className="text-sm font-semibold text-cream">{revealedAnswer}</p>
              </div>
            ) : isSpelling ? (
              <div className="p-3 rounded-2xl bg-white/5 border border-gold/20 text-center text-xs text-lavender-muted flex items-center justify-center gap-2">
                <span className="animate-spin text-sm">🔮</span>
                <span className="font-cinzel text-gold-bright">The Planchette is trembling... summoning hostel ancestors...</span>
              </div>
            ) : null}

            {/* Interactive Questions Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-gold">
                Inquire of the Campus Phantoms:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_SPIRIT_QUESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    disabled={isSpelling}
                    onClick={() => handleAskQuestion(item)}
                    className="p-2.5 rounded-xl bg-obsidian-surface hover:bg-obsidian-cardHover border border-gold-subtle hover:border-gold text-xs font-medium text-cream text-left transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  >
                    <span>{item.q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURSED GHOST WHEEL */}
        {activeTab === 'wheel' && (
          <div className="space-y-6 text-center relative z-20 py-2">
            <div className="relative w-56 h-56 mx-auto">
              {/* Wheel Pointer Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-6 h-6 text-gold">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-gold drop-shadow-[0_2px_8px_rgba(197,160,89,0.8)]" />
              </div>

              {/* Rotating Cursed Wheel Container */}
              <div
                ref={wheelRef}
                className="w-full h-full rounded-full border-4 border-gold shadow-2xl relative overflow-hidden will-change-transform"
                style={{
                  background:
                    'conic-gradient(#C5A059 0deg 60deg, #3B1C57 60deg 120deg, #8C6D37 120deg 180deg, #E5C158 180deg 240deg, #1F1730 240deg 300deg, #D4AF37 300deg 360deg)',
                }}
              >
                {/* Center Cauldron Hub */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-obsidian-dark border-2 border-gold/40 flex items-center justify-center text-xl shadow-lg">
                  💀
                </div>
              </div>
            </div>

            {/* Wheel Result Announcement */}
            {wheelResult && (
              <div className="p-3.5 rounded-2xl bg-obsidian-surface border border-gold/40 max-w-sm mx-auto animate-in zoom-in-95 duration-300 shadow-gold-glow">
                <span className="text-xs font-cinzel font-bold text-gold uppercase tracking-wider block">
                  🎉 Cursed Vault Reward Claimed!
                </span>
                <p className="text-base font-cinzel font-extrabold text-cream mt-0.5">
                  {wheelResult.label} (+{wheelResult.points} Karma)
                </p>
              </div>
            )}

            {/* Spin CTA */}
            <button
              disabled={isSpinning}
              onClick={handleSpinWheel}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold-dark hover:scale-105 active:scale-95 disabled:opacity-50 text-obsidian font-cinzel font-extrabold text-xs uppercase tracking-wider shadow-gold-glow transition-all"
            >
              {isSpinning ? 'Summoning Fate...' : 'Spin Archival Wheel (Free)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};