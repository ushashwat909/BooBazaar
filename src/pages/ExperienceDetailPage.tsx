import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Tag,
  Star,
  ShieldCheck,
  Check,
  Calendar,
  Sparkles,
  MessageSquare,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Experience } from '../types';
import { Magnetic } from '../components/ui/Magnetic';

interface ExperienceDetailPageProps {
  experience: Experience;
  onBack: () => void;
  onBook: () => void;
  onOpenChat: () => void;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({
  experience,
  onBack,
  onBook,
  onOpenChat,
}) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [experience.id]);

  return (
    <div className="min-h-screen bg-obsidian text-cream select-none relative pb-28">
      {/* ============================================================== */}
      {/* 1. CINEMATIC FULL-BLEED EXPERIENCE HERO */}
      {/* ============================================================== */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-black/80" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(11,9,16,0.2) 0%, rgba(11,9,16,0.7) 65%, rgba(11,9,16,0.98) 100%)',
            }}
          />
        </div>

        {/* Top Back Nav Button */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-obsidian-surface/80 border border-gold/40 text-gold-bright hover:border-gold hover:bg-gold/15 text-xs font-cinzel font-semibold transition-all backdrop-blur-md shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Return to All Experiences</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-cinzel font-bold tracking-widest uppercase">
              ✦ {experience.badge}
            </span>
          </div>
        </div>

        {/* Hero Title & Meta */}
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-cinzel font-bold text-gold-bright uppercase tracking-wider">
            <span>{experience.category}</span>
            <span className="text-white/30">•</span>
            <span>{experience.difficulty}</span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-gold">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>
                {experience.rating} ({experience.reviewCount} Verified Reviews)
              </span>
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {experience.title}
          </h1>

          <p className="text-sm sm:text-lg text-cream/90 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {experience.subtitle}
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. STATS & RESERVATION OVERVIEW STRIP */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-obsidian-card/95 border border-gold/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel text-lavender-muted uppercase tracking-wider block">
                Duration
              </span>
              <span className="text-xs sm:text-sm font-cinzel font-bold text-cream">
                {experience.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel text-lavender-muted uppercase tracking-wider block">
                Assembly Point
              </span>
              <span className="text-xs sm:text-sm font-semibold text-cream truncate max-w-[150px] block">
                {experience.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel text-lavender-muted uppercase tracking-wider block">
                Barter Fee
              </span>
              <span className="text-xs sm:text-sm font-cinzel font-bold text-gold-bright">
                {experience.startingPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-potion-emerald" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel text-lavender-muted uppercase tracking-wider block">
                Accreditation
              </span>
              <span className="text-xs sm:text-sm font-semibold text-potion-emerald">
                100% Verified Barter
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN EDITORIAL CONTENT & ITINERARY */}
      {/* ============================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (8 cols): Deep Narrative, Itinerary, Gallery */}
        <div className="lg:col-span-8 space-y-12">
          {/* Narrative Chapter */}
          <div className="space-y-4">
            <span className="text-[11px] font-cinzel tracking-widest text-gold uppercase block">
              Chapter I • Historical Background
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-cream tracking-tight">
              The Legend & Archival Chronicle
            </h2>
            <p className="text-sm sm:text-base text-cream/90 leading-relaxed font-normal">
              {experience.fullDescription}
            </p>
          </div>

          {/* Photographic Archival Gallery */}
          <div className="space-y-4">
            <span className="text-[11px] font-cinzel tracking-widest text-gold uppercase block">
              Photographic Artifacts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experience.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden aspect-[4/3] border border-gold/25 group relative shadow-xl"
                >
                  <img
                    src={img}
                    alt={`${experience.title} gallery ${idx + 1}`}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Curated Step-by-Step Itinerary */}
          <div className="space-y-6">
            <span className="text-[11px] font-cinzel tracking-widest text-gold uppercase block">
              Chronological Itinerary
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-cream tracking-tight">
              The Expedition Sequence
            </h2>

            <div className="space-y-4">
              {experience.itinerary.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-obsidian-surface border border-gold/20 flex gap-4 sm:gap-6 items-start shadow-md"
                >
                  <span className="w-10 h-10 rounded-xl bg-gold/15 text-gold border border-gold/30 font-cinzel font-bold text-base flex items-center justify-center shrink-0">
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-cream">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-lavender-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What is Included */}
          <div className="space-y-4">
            <span className="text-[11px] font-cinzel tracking-widest text-gold uppercase block">
              Charter Provisions
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-cream">
              What is Guaranteed in this Experience
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experience.included.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-obsidian-surface border border-white/5 flex items-center gap-3 text-xs text-cream/90"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Booking & Inscription Panel */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-card border border-gold/30 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-cinzel tracking-widest text-gold uppercase block">
                Experience Charter
              </span>
              <h3 className="font-cinzel text-2xl font-extrabold text-cream mt-0.5">
                Book Your Entry
              </h3>
              <p className="text-xs text-lavender-muted mt-1">
                Zero currency required. Exchange peer barter or credit karma points upon entry.
              </p>
            </div>

            {/* Departure Times Selection */}
            <div className="space-y-2">
              <label className="text-xs font-cinzel font-semibold text-gold block uppercase tracking-wider">
                Scheduled Departures
              </label>
              <div className="space-y-2">
                {experience.departureTimes.map((time, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-obsidian-surface border border-gold/20 flex items-center justify-between text-xs text-cream"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{time}</span>
                    </span>
                    <span className="text-[10px] font-cinzel font-bold text-potion-emerald">
                      Available
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Magnetic strength={0.8}>
                <button
                  onClick={onBook}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-obsidian" />
                  <span>Inscribe & Book Experience</span>
                </button>
              </Magnetic>

              <button
                onClick={onOpenChat}
                className="w-full py-3.5 rounded-xl bg-obsidian-surface border border-gold/30 text-gold-bright hover:border-gold hover:bg-gold/15 font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>Chat with Coven Guide</span>
              </button>
            </div>

            {/* Trust Footer */}
            <div className="pt-4 border-t border-gold/20 text-center">
              <p className="text-[11px] text-lavender-muted leading-relaxed">
                🛡️ Verified by University Student Syndicate. 100% Cash-Free Circular Exchange Protocol.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

