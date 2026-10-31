import React, { useState, useRef, useEffect } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

interface Testimonial {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  reviewText: string;
  rating: number;
  source: 'TripAdvisor' | 'Google' | 'Campus Ledger';
  sourceVerified: boolean;
  date: string;
  avatarLetter: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    reviewerName: 'Sarah M.',
    reviewerRole: 'Historical Traveler & Guest',
    reviewText:
      'The atmosphere in the underground stone vaults is unlike anything on earth. Walking into total darkness with only a brass lantern, hearing the true history of secret barter conclaves—it gave our entire group chills. Unbelievably atmospheric, genuine, and cinematic.',
    rating: 5,
    source: 'TripAdvisor',
    sourceVerified: true,
    date: 'Verified October 2026',
    avatarLetter: 'S',
  },
  {
    id: 't-2',
    reviewerName: 'Aarav Sharma',
    reviewerRole: 'Mechanical Dept • Block B, Room 204',
    reviewText:
      'Exchanged my second-year drafting kit for a working induction kettle at 1:30 AM before winter mid-terms. Zero cash, zero hassle. The +50 karma points were credited immediately and the barter chat was instant with hostel verification. Saved me over ₹3,500.',
    rating: 5,
    source: 'Campus Ledger',
    sourceVerified: true,
    date: 'Verified Semester 5 Exchange',
    avatarLetter: 'A',
  },
  {
    id: 't-3',
    reviewerName: 'David & Claire K.',
    reviewerRole: 'Verified Nocturnal Expeditioners',
    reviewText:
      'Easily the highlight of our entire trip. The guide was an exceptional master storyteller who brought the centuries of covenants to life. The absolute acoustic silence beneath the 18th-century South Bridge stone arches was mesmerizing. An unforgettable experience.',
    rating: 5,
    source: 'Google',
    sourceVerified: true,
    date: 'Verified Google Review (5.0 ★)',
    avatarLetter: 'D',
  },
  {
    id: 't-4',
    reviewerName: 'Meera Nair',
    reviewerRole: 'Electronics Dept • Block C, Room 112',
    reviewText:
      'Found the exact Casio scientific calculator I needed the evening before my DSP laboratory exam. Traded two packs of instant noodles and coffee sachets. The 1-on-1 chat drawer felt so clean and secure with verified hostel badges.',
    rating: 5,
    source: 'Campus Ledger',
    sourceVerified: true,
    date: 'Verified Semester 4 Exchange',
    avatarLetter: 'M',
  },
  {
    id: 't-5',
    reviewerName: 'Marcus Thorne',
    reviewerRole: 'Cultural Heritage Researcher',
    reviewText:
      'A rare historical experience that preserves living oral tradition and genuine circular barter. The sheer level of detail in the subterranean archives and student pedigrees is astonishing. A masterclass in immersive storytelling.',
    rating: 5,
    source: 'TripAdvisor',
    sourceVerified: true,
    date: 'Verified Travelers’ Choice Award',
    avatarLetter: 'M',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Auto-adapt visible cards based on screen size
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS_DATA.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 relative bg-obsidian overflow-hidden select-none"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-coven/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* ============================================================== */}
        {/* 1. SECTION HEADER WITH OVERALL ACTUAL RATING DATA */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gold/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel font-bold tracking-[0.25em] uppercase shadow-sm">
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>TESTIMONIALS & ACCREDITATION</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-cream tracking-tight">
              STORIES THAT STAY WITH YOU
            </h2>

            <p className="text-xs sm:text-sm text-cream-muted max-w-xl font-normal leading-relaxed">
              Genuine reflections from travelers, scholars, and hostelers who have walked our
              nocturnal vaults and sealed circular barters.
            </p>
          </div>

          {/* Actual Overall Verified Rating Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-obsidian-surface border border-gold/30 shadow-gold-glow shrink-0">
            <div className="flex flex-col items-center justify-center pr-3 border-r border-gold/20">
              <span className="font-cinzel text-3xl font-extrabold text-gold-bright leading-none">
                4.9
              </span>
              <span className="text-[10px] text-lavender-muted uppercase tracking-wider font-cinzel mt-1">
                out of 5.0
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-gold">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <Star className="w-4 h-4 fill-gold text-gold" />
                <Star className="w-4 h-4 fill-gold text-gold" />
                <Star className="w-4 h-4 fill-gold text-gold" />
                <Star className="w-4 h-4 fill-gold text-gold" />
              </div>
              <p className="text-[11px] font-semibold text-cream">
                Based on 640+ Verified Reviews
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gold-bright/80 font-cinzel">
                <span>TripAdvisor</span>
                <span>•</span>
                <span>Google</span>
                <span>•</span>
                <span>Campus Ledger</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. HORIZONTAL TESTIMONIAL SLIDER WITH MOBILE SWIPE */}
        {/* ============================================================== */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView + 2)}%)`,
            }}
          >
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="shrink-0 transition-all duration-300"
                style={{
                  width:
                    cardsPerView === 1
                      ? '100%'
                      : cardsPerView === 2
                      ? 'calc(50% - 12px)'
                      : 'calc(33.333% - 16px)',
                }}
              >
                <div className="h-full rounded-3xl bg-obsidian-surface/90 border border-gold/25 hover:border-gold hover:shadow-gold-glow transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between space-y-6 group will-change-transform">
                  {/* Top Bar: Five Star Rating + Verified Source Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center text-gold">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                        t.source === 'TripAdvisor'
                          ? 'bg-[#00AA6C]/15 text-[#00AA6C] border border-[#00AA6C]/30'
                          : t.source === 'Google'
                          ? 'bg-[#4285F4]/15 text-[#6BA5FF] border border-[#4285F4]/30'
                          : 'bg-gold/15 text-gold border border-gold/30'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                      <span>{t.source} Verified</span>
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="relative flex-1">
                    <Quote className="w-8 h-8 text-gold/15 absolute -top-3 -left-2 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-normal relative z-10 italic">
                      "{t.reviewText}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="pt-4 border-t border-gold/15 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-coven via-obsidian to-gold-dark border border-gold/40 flex items-center justify-center font-cinzel font-bold text-gold text-sm shadow-sm shrink-0">
                        {t.avatarLetter}
                      </div>
                      <div>
                        <h4 className="font-cinzel text-xs sm:text-sm font-bold text-cream group-hover:text-gold transition-colors">
                          {t.reviewerName}
                        </h4>
                        <p className="text-[10px] text-lavender-muted truncate max-w-[170px]">
                          {t.reviewerRole}
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] text-gold/60 font-cinzel shrink-0">
                      {t.date.split('•')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. NAVIGATION CONTROLS & PAGINATION INDICATOR */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pt-2">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-gold shadow-gold-glow' : 'w-2 bg-white/20'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows with Magnetic Attraction */}
          <div className="flex items-center gap-2.5">
            <Magnetic strength={0.6}>
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-gold/30 hover:border-gold hover:bg-gold/15 text-gold flex items-center justify-center transition-all shadow-sm"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
            </Magnetic>

            <Magnetic strength={0.6}>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-gold/30 hover:border-gold hover:bg-gold/15 text-gold flex items-center justify-center transition-all shadow-sm"
                title="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};

