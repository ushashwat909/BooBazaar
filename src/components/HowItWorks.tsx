import React from 'react';
import { Camera, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react';
import { CobwebCorner } from './spooky/SpookyElements';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: 'I',
      title: 'Inscribe & Brew',
      subtitle: 'Catalogue Your Room Relics in 10 Seconds',
      desc: 'Snap a photograph of unused textbooks, kettles, desk lamps, or calculators. Tag your hostel block and room number for seamless discovery.',
      icon: Camera,
      badge: 'Zero Fees',
      accent: 'border-gold/40 text-gold',
      bgGlow: 'from-gold/15 to-transparent',
    },
    {
      num: 'II',
      title: 'Wing-Level Discovery',
      subtitle: 'Hyper-Local Campus Map',
      desc: 'Filter essentials right in your own hostel wing (Block A, B, C, or D). Pick up items two doors down without courier fees or shipping delays.',
      icon: MapPin,
      badge: 'Wing Filters',
      accent: 'border-coven/40 text-coven-light',
      bgGlow: 'from-coven/20 to-transparent',
    },
    {
      num: 'III',
      title: '1-on-1 Live Bargaining',
      subtitle: 'Real-Time Student Negotiations',
      desc: 'Open a private barter chat to negotiate an exchange, swap for study notes or snacks (Maggi packs!), and seal deals with live karma points.',
      icon: MessageCircle,
      badge: 'Instant Chat',
      accent: 'border-potion-emerald/40 text-potion-emerald',
      bgGlow: 'from-potion-emerald/15 to-transparent',
    },
  ];

  return (
    <section id="how-it-works" className="w-full my-16 relative">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-cinzel font-bold uppercase tracking-[0.2em]">
          <span>THE PROTOCOL • CIRCULAR CAMPUS CHARTER</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
          How the Potion Pantry Operates
        </h2>
        <p className="text-sm sm:text-base text-lavender-muted">
          A circular campus economy built exclusively for hostelers — trade essentials, save money, and cut waste.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-obsidian-surface border border-gold-subtle hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-lg"
            >
              <CobwebCorner position="top-right" size={38} />

              {/* Subtle ambient lighting */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${step.bgGlow} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-cinzel text-3xl font-extrabold text-gold/40 group-hover:text-gold transition-colors">
                    {step.num}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-2xl bg-obsidian-dark border ${step.accent} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded-md border border-gold/20">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-cream mb-1 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-lavender-muted mb-3 font-cinzel">
                  {step.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-lavender-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-potion-emerald font-semibold font-cinzel">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified in 2 seconds</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
