import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Lamp, PlusCircle, Flame, Shield, Users } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBrewClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBrewClick }) => {
  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Atmospheric Background Apothecary Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial glows */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-coven/15 rounded-full blur-[110px]" />
        <div className="absolute top-24 right-1/4 w-[450px] h-[450px] bg-pumpkin/12 rounded-full blur-[130px]" />
        {/* Subtle grid pattern with mask */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 138, 43, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Controls */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pumpkin/10 border border-pumpkin/30 text-pumpkin text-xs font-bold tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-pumpkin fill-pumpkin animate-pulse" />
              <span>Same Items. New Stories.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pumpkin"></span>
              <span className="text-lavender-muted font-normal lowercase tracking-normal">hostel circulation</span>
            </div>

            {/* Main Headline with Witch Hat Accent */}
            <div className="relative">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream leading-[1.12] tracking-tight">
                Every Treasure{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pumpkin via-pumpkin-light to-potion-gold">
                  Deserves
                  {/* Subtle Witch Hat SVG Outline perched tastefully */}
                  <span className="absolute -top-6 -right-6 text-coven-light rotate-12 select-none pointer-events-none drop-shadow-[0_2px_10px_rgba(123,44,191,0.5)]">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-coven/40 stroke-coven-light stroke-[1.5]" viewBox="0 0 48 48">
                      <path d="M6 38c6-2 14-2 18-2s12 0 18 2c-3-1-5-3-5-5-8-1-20-1-26 0-1 2-3 4-5 5z" />
                      <path d="M19 32c0 0 3-14 5-22 3 5 4 10 5 22-3-1-7-1-10 0z" />
                      <polygon points="24,10 23,6 26,9" />
                      <path d="M18 30c3-1 9-1 12 0" stroke="#FF8A2B" strokeWidth="2" fill="none" />
                      <circle cx="24" cy="30" r="1.5" fill="#FF8A2B" />
                    </svg>
                  </span>
                </span>
                <br />
                a Second Life.
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-lavender-muted max-w-xl font-normal leading-relaxed">
              Trade, donate and discover hostel essentials within your campus. Snap a photo of what you don't need, post it to the pantry, and bargain live with fellow hostelers in your wing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-pumpkin via-pumpkin to-pumpkin-dark text-obsidian-dark font-bold text-sm tracking-wide shadow-potion-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore the Pantry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBrewClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-coven/20 border border-coven/40 text-cream font-semibold text-sm hover:bg-coven/30 hover:border-coven/60 hover:shadow-coven-glow transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-coven-light" />
                <span>Brew a Listing</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex items-center gap-6 text-xs text-lavender-muted">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-potion-emerald" />
                <span>Verified Campus Roll Numbers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-pumpkin" />
                <span>Zero Cash Required</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Apothecary Visual Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Showcase Container */}
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-obsidian-card to-obsidian-dark border card-border-subtle p-5 sm:p-6 shadow-2xl overflow-hidden group">
              
              {/* Inner ambient light */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-pumpkin/20 rounded-full blur-3xl group-hover:bg-pumpkin/30 transition-all duration-500" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-coven/25 rounded-full blur-3xl" />

              {/* Terraced Visual: Potion Flask, Books & Lamp Scene */}
              <div className="relative rounded-2xl overflow-hidden bg-obsidian-surface/80 border border-white/5 aspect-[4/3] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" 
                  alt="Apothecary Books and Atmosphere" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

                {/* Center Floating Glowing Potion Flask */}
                <div className="absolute flex flex-col items-center">
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-b from-coven/40 to-obsidian-surface border border-pumpkin/40 shadow-potion-glow backdrop-blur-md flex items-center justify-center animate-bounce duration-1000">
                    <svg className="w-12 h-12 text-pumpkin drop-shadow-[0_0_12px_rgba(255,138,43,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 2h6" />
                      <path d="M10 2v4a2 2 0 0 1-.586 1.414l-4.828 4.828A4 4 0 0 0 3.414 15V18a4 4 0 0 0 4 4h9.172a4 4 0 0 0 4-4v-3a4 4 0 0 0-1.172-2.758L14.586 7.414A2 2 0 0 1 14 6V2" />
                      <line x1="8" y1="14" x2="16" y2="14" stroke="#2EC4B6" strokeWidth="2" />
                    </svg>
                    <span className="absolute bottom-2 left-6 w-1.5 h-1.5 rounded-full bg-potion-emerald animate-ping" />
                  </div>
                  <span className="mt-3 px-3 py-1 rounded-full bg-obsidian/90 border border-pumpkin/30 text-potion-emerald text-xs font-semibold tracking-wider uppercase">
                    Hostel Exchange Active
                  </span>
                </div>

                {/* Top Corner Live Activity Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-obsidian/80 border border-white/10 text-[11px] text-cream">
                  <span className="w-2 h-2 rounded-full bg-potion-emerald animate-pulse" />
                  <span>Block B • Just Exchanged Notes</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian/80 border border-coven/30 text-[11px] text-coven-light">
                  <BookOpen className="w-3 h-3" />
                  <span>32 Books In Circulation</span>
                </div>
              </div>

              {/* Card Footer Detail: Floating Mission Badge */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-obsidian-surface via-obsidian-surface to-coven/15 border border-pumpkin/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pumpkin/20 border border-pumpkin/30 flex items-center justify-center text-pumpkin shrink-0">
                  <Sparkles className="w-4 h-4 fill-pumpkin" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cream tracking-wide">
                    A Cleaner Campus • A Brighter Tomorrow
                  </span>
                  <span className="text-[11px] text-lavender-muted font-medium">
                    Reuse, Share, Belong — Keep hostel rooms clutter-free.
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

