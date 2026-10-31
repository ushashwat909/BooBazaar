import React from 'react';
import { Camera, MapPin, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Snap & Brew',
      subtitle: 'Instant Listing in 10 Seconds',
      desc: 'Upload a quick photo of unused textbooks, kettles, desk lamps, or calculators. Tag your hostel block and room number.',
      icon: Camera,
      badge: 'Zero Fees',
      accent: 'border-pumpkin/30 text-pumpkin',
      bgGlow: 'from-pumpkin/15 to-transparent',
    },
    {
      num: '02',
      title: 'Hostel-Block Discovery',
      subtitle: 'Hyper-Local Campus Map',
      desc: 'Filter essentials right in your own hostel wing (Block A, B, C, or D). Pick up items a few doors down without shipping delays.',
      icon: MapPin,
      badge: 'Wing Filters',
      accent: 'border-coven/40 text-coven-light',
      bgGlow: 'from-coven/20 to-transparent',
    },
    {
      num: '03',
      title: 'Live Coven Bargaining',
      subtitle: 'Real-Time Student Negotiations',
      desc: 'Open a 1-on-1 chat to negotiate a barter, swap for notes or snacks (Maggi packs!), or claim zero-cost donations directly.',
      icon: MessageCircle,
      badge: 'Instant Chat',
      accent: 'border-potion-emerald/40 text-potion-emerald',
      bgGlow: 'from-potion-emerald/15 to-transparent',
    },
  ];

  return (
    <section id="how-it-works" className="w-full my-16">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coven/20 border border-coven/30 text-coven-light text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Judges & Student Explainer</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-cream">
          How the Potion Pantry Works
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
              className="relative p-6 rounded-3xl bg-obsidian-surface border card-border-subtle hover:border-pumpkin/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Subtle gradient sweep */}
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${step.bgGlow} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`} />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-editorial text-3xl font-extrabold text-lavender-muted/40 group-hover:text-pumpkin transition-colors">
                    {step.num}
                  </span>
                  <div className={`w-11 h-11 rounded-2xl bg-obsidian-dark border ${step.accent} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-potion-emerald bg-potion-emerald/10 px-2 py-0.5 rounded-md border border-potion-emerald/20">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-cream mb-1 group-hover:text-pumpkin transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-lavender-muted/90 mb-3">
                  {step.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-lavender-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-potion-emerald font-semibold">
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

