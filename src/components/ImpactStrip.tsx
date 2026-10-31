import React, { useLayoutEffect, useRef } from 'react';
import { Users, RefreshCw, Handshake, Shield, Star, Award } from 'lucide-react';
import { CobwebCorner } from './spooky/SpookyElements';
import { gsap } from '../utils/animations';

interface StatItem {
  icon: React.ElementType;
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  color: string;
  bg: string;
}

const statsData: StatItem[] = [
  {
    icon: Users,
    target: 600,
    suffix: '+',
    label: 'Hostelers Connected',
    color: 'text-gold',
    bg: 'bg-gold/15',
  },
  {
    icon: RefreshCw,
    target: 1200,
    suffix: '+',
    label: 'Dorm Relics Circulated',
    color: 'text-coven-light',
    bg: 'bg-coven/15',
  },
  {
    icon: Handshake,
    target: 300,
    suffix: '+',
    label: 'Midnight Barters Sealed',
    color: 'text-potion-emerald',
    bg: 'bg-potion-emerald/15',
  },
  {
    icon: Shield,
    target: 100,
    suffix: '%',
    label: 'Pure Barter • Zero Currency',
    color: 'text-gold-bright',
    bg: 'bg-gold/10',
  },
];

const PRESS_ACCOLADES = [
  {
    quote: "The premier underground barter network. Saved hostelers ₹10,000+ each semester.",
    source: "The Campus Chronicle",
    stars: 5,
  },
  {
    quote: "Atmospheric, trustworthy, and wildly effective. Banned kettles find good homes.",
    source: "Hostel Warden Council",
    stars: 5,
  },
  {
    quote: "A masterclass in zero-waste circular exchange built purely for students.",
    source: "Green Campus Initiative",
    stars: 5,
  },
];

export const ImpactStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      statsData.forEach((stat, idx) => {
        const el = valueRefs.current[idx];
        if (!el) return;

        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: stat.target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const current = Math.floor(proxy.val);
            el.innerText = `${stat.prefix || ''}${current.toLocaleString()}${stat.suffix}`;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full my-12 relative">
      {/* City of the Dead Style Accolades & Press Proof Band */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESS_ACCOLADES.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-obsidian-surface border border-gold-subtle flex flex-col justify-between"
          >
            <div className="flex items-center gap-1 text-gold mb-2">
              {Array.from({ length: item.stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold" />
              ))}
            </div>
            <p className="text-xs text-cream-muted italic leading-relaxed mb-3">
              "{item.quote}"
            </p>
            <div className="flex items-center justify-between text-[11px] font-cinzel font-bold text-gold border-t border-white/5 pt-2">
              <span>{item.source}</span>
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Quantitative Stats Strip */}
      <div className="relative rounded-2xl bg-gradient-to-r from-obsidian-surface via-obsidian-card to-obsidian-surface border border-gold-subtle p-5 sm:p-6 shadow-xl overflow-hidden">
        <CobwebCorner position="top-right" size={48} />
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 ${
                  idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${stat.bg} border border-gold/30 flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex flex-col">
                  <span
                    ref={(el) => (valueRefs.current[idx] = el)}
                    className="font-cinzel text-xl sm:text-2xl font-extrabold text-cream tracking-tight tabular-nums"
                  >
                    0{stat.suffix}
                  </span>
                  <span className="text-xs text-lavender-muted font-medium font-cinzel">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
