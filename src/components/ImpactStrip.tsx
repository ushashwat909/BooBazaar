import React from 'react';
import { Users, RefreshCw, Handshake, Leaf } from 'lucide-react';

export const ImpactStrip: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '600+',
      label: 'Students Connected',
      color: 'text-pumpkin',
      bg: 'bg-pumpkin/10',
    },
    {
      icon: RefreshCw,
      value: '1,200+',
      label: 'Items Reused',
      color: 'text-coven-light',
      bg: 'bg-coven/15',
    },
    {
      icon: Handshake,
      value: '300+',
      label: 'Successful Exchanges',
      color: 'text-potion-emerald',
      bg: 'bg-potion-emerald/15',
    },
    {
      icon: Leaf,
      value: '100%',
      label: 'Greener Campus Together',
      color: 'text-potion-gold',
      bg: 'bg-potion-gold/15',
    },
  ];

  return (
    <section className="w-full my-10">
      <div className="relative rounded-2xl bg-gradient-to-r from-obsidian-surface via-obsidian-surface to-coven/20 border card-border-subtle p-5 sm:p-6 shadow-xl overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pumpkin/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
              >
                <div className={`w-11 h-11 rounded-xl ${stat.bg} border border-white/10 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex flex-col">
                  <span className="font-editorial text-xl sm:text-2xl font-extrabold text-cream tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-lavender-muted font-medium">
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

