import React from 'react';
import { Clock, MapPin, Tag, ArrowRight, Star, Compass, ShieldCheck } from 'lucide-react';
import { EXPERIENCES } from '../../data/experiences';
import { Experience } from '../../types';
import { Magnetic } from '../ui/Magnetic';

interface ExploreExperiencesSectionProps {
  onSelectExperience: (experienceId: string) => void;
}

export const ExploreExperiencesSection: React.FC<ExploreExperiencesSectionProps> = ({
  onSelectExperience,
}) => {
  const [featured, second, third] = EXPERIENCES;

  return (
    <section id="experiences" className="py-20 lg:py-28 relative">
      {/* Subtle Atmospheric Section Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-coven/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Editorial Section Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel font-bold tracking-[0.25em] uppercase shadow-sm">
          <Compass className="w-3.5 h-3.5 text-gold" />
          <span>CURATED NOCTURNAL EXPEDITIONS • AUTHENTIC CAMPUS LORE</span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream tracking-tight">
          EXPLORE OUR EXPERIENCES
        </h2>

        <p className="text-sm sm:text-base text-cream-muted max-w-2xl mx-auto font-normal leading-relaxed">
          Step beyond the ordinary campus routine. Enter underground stone vaults, inspect two
          centuries of smuggled scholarly relics, and discover the nocturnal barter conclaves that have
          sustained students since 1928.
        </p>
      </div>

      {/* Asymmetric Editorial Magazine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* ========================================================= */}
        {/* CARD 1: COMMANDING FEATURED EXPEDITION (7 COLS / TALL) */}
        {/* ========================================================= */}
        {featured && (
          <div
            onClick={() => onSelectExperience(featured.id)}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden cursor-pointer border border-gold/30 hover:border-gold shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 min-h-[560px] lg:min-h-[620px] will-change-transform"
          >
            {/* Background Image with Smooth Hover Zoom */}
            <div className="absolute inset-0 overflow-hidden z-0">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              {/* Subtle Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/30 group-hover:via-obsidian/70 transition-colors duration-500" />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>

            {/* Top Bar: Badge & Social Proof Rating */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-[10px] tracking-widest uppercase shadow-gold-glow">
                ✦ {featured.badge}
              </span>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-dark/75 backdrop-blur-md border border-gold/30 text-gold text-xs font-cinzel font-semibold">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span>
                  {featured.rating} ({featured.reviewCount})
                </span>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4 pt-16">
              {/* Category & Difficulty Tag */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-cinzel tracking-wider text-gold-bright uppercase">
                <span>{featured.category}</span>
                <span className="text-white/40">•</span>
                <span>{featured.difficulty}</span>
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-cream group-hover:text-gold transition-colors duration-300 leading-tight">
                {featured.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-cream/90 max-w-xl line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {featured.description}
              </p>

              {/* Metadata Pill Strip: Duration, Price, Location */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-lavender-muted border-t border-gold/20 pt-4">
                <span className="flex items-center gap-1.5 text-cream/90">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>{featured.duration}</span>
                </span>

                <span className="flex items-center gap-1.5 text-cream/90">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span className="truncate max-w-[220px]">{featured.location}</span>
                </span>

                <span className="flex items-center gap-1.5 text-gold font-cinzel font-bold ml-auto">
                  <Tag className="w-3.5 h-3.5 text-gold" />
                  <span>{featured.startingPrice}</span>
                </span>
              </div>

              {/* Explore Experience Button */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-[0.15em] uppercase text-gold group-hover:text-gold-bright transition-colors">
                  <span>Explore Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* RIGHT COLUMN: TWO STACKED EDITORIAL WIDESCREEN CARDS (5 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
          {/* CARD 2: NOCTURNAL VIGIL */}
          {second && (
            <div
              onClick={() => onSelectExperience(second.id)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border border-gold/30 hover:border-gold shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 min-h-[280px] lg:min-h-[295px] flex-1 will-change-transform"
            >
              {/* Background Image with Smooth Hover Zoom */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <img
                  src={second.imageUrl}
                  alt={second.title}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30 group-hover:via-obsidian/75 transition-colors duration-500" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>

              {/* Top Bar: Badge & Rating */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="px-3 py-0.5 rounded-full bg-coven/70 border border-gold/40 text-gold-bright font-cinzel font-bold text-[9px] tracking-wider uppercase">
                  ✦ {second.badge}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-obsidian-dark/75 backdrop-blur-md border border-gold/30 text-gold text-[11px] font-cinzel">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span>{second.rating}</span>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 space-y-2 pt-8">
                <div className="flex items-center gap-2 text-[10px] font-cinzel tracking-wider text-gold-bright uppercase">
                  <span>{second.category}</span>
                  <span className="text-white/30">•</span>
                  <span>{second.difficulty}</span>
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream group-hover:text-gold transition-colors duration-300 leading-snug">
                  {second.title}
                </h3>

                <p className="text-xs text-cream/80 line-clamp-2 leading-relaxed">
                  {second.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-lavender-muted border-t border-gold/20 pt-3">
                  <span className="flex items-center gap-1 text-cream/90">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{second.duration}</span>
                  </span>

                  <span className="text-gold font-cinzel font-bold">
                    {second.startingPrice}
                  </span>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-cinzel font-bold tracking-wider uppercase text-gold group-hover:text-gold-bright transition-colors ml-auto">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CARD 3: SECRET ARCHIVES CONCLAVE */}
          {third && (
            <div
              onClick={() => onSelectExperience(third.id)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border border-gold/30 hover:border-gold shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 min-h-[280px] lg:min-h-[295px] flex-1 will-change-transform"
            >
              {/* Background Image with Smooth Hover Zoom */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <img
                  src={third.imageUrl}
                  alt={third.title}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30 group-hover:via-obsidian/75 transition-colors duration-500" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>

              {/* Top Bar: Badge & Rating */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="px-3 py-0.5 rounded-full bg-obsidian-surface/80 border border-gold/40 text-gold font-cinzel font-bold text-[9px] tracking-wider uppercase">
                  ✦ {third.badge}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-obsidian-dark/75 backdrop-blur-md border border-gold/30 text-gold text-[11px] font-cinzel">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span>{third.rating}</span>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 space-y-2 pt-8">
                <div className="flex items-center gap-2 text-[10px] font-cinzel tracking-wider text-gold-bright uppercase">
                  <span>{third.category}</span>
                  <span className="text-white/30">•</span>
                  <span>{third.difficulty}</span>
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-cream group-hover:text-gold transition-colors duration-300 leading-snug">
                  {third.title}
                </h3>

                <p className="text-xs text-cream/80 line-clamp-2 leading-relaxed">
                  {third.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-lavender-muted border-t border-gold/20 pt-3">
                  <span className="flex items-center gap-1 text-cream/90">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{third.duration}</span>
                  </span>

                  <span className="text-gold font-cinzel font-bold">
                    {third.startingPrice}
                  </span>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-cinzel font-bold tracking-wider uppercase text-gold group-hover:text-gold-bright transition-colors ml-auto">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
