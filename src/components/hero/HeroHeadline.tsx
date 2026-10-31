import React from 'react';
import { Skull } from 'lucide-react';
import { SpookyBat } from '../spooky/SpookyElements';

export const HeroHeadline: React.FC = () => {
  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Eyebrow Badge - Grounded, no generic AI sparkles */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-coven/30 via-obsidian-surface to-pumpkin/20 border border-pumpkin/30 text-pumpkin text-xs font-bold tracking-widest uppercase shadow-sm">
        <Skull className="w-3.5 h-3.5 text-pumpkin" />
        <span>HAUNTED CAMPUS WINGS • HOSTEL BARTER</span>
        <span className="w-1.5 h-1.5 rounded-full bg-pumpkin" />
        <span className="text-lavender-muted font-normal lowercase tracking-normal">
          zero currency
        </span>
      </div>

      {/* Main Headline - Bold, Grounded, Atmospheric Gothic Editorial */}
      <div className="relative">
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cream leading-[1.08] tracking-tight m-0">
          Trade Your Relics.{' '}
          <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pumpkin via-potion-gold to-potion-emerald">
            Survive the Semester.
            {/* Flying Bat Accent perched overhead */}
            <span className="absolute -top-7 -right-8 text-cream/80 select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(255,138,43,0.6)]">
              <SpookyBat size={34} />
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
};
