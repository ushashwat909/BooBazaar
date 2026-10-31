import React from 'react';
import { Award } from 'lucide-react';
import { SpookyBat } from '../spooky/SpookyElements';

export const HeroHeadline: React.FC = () => {
  return (
    <div className="flex flex-col items-start space-y-4">
      {/* City of the Dead Inspired Prestigious Accolade Banner */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
        <Award className="w-3.5 h-3.5 text-gold" />
        <span>VOTED #1 CAMPUS CIRCULAR EXCHANGE • 1,200+ RELICS SAVED</span>
      </div>

      {/* Monumental Gothic Editorial Headline */}
      <div className="relative">
        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cream leading-[1.08] tracking-tight m-0 select-none">
          TRADE YOUR RELICS.{' '}
          <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold to-potion-gold">
            SURVIVE THE SEMESTER.
            {/* Elegant Flying Bat Accent perched overhead */}
            <span className="absolute -top-7 -right-8 text-cream/70 select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(197,160,89,0.5)]">
              <SpookyBat size={36} />
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
};
