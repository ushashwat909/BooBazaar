import React from 'react';
import { Shield, ArrowUp, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-obsidian-dark border-t border-gold-subtle mt-20 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-obsidian-surface to-gold/30 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
                <span className="font-cinzel font-bold text-sm">🏛️</span>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold text-cream tracking-[0.08em]">
                  THE POTION PANTRY
                </span>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold">
                  CIRCULAR CAMPUS RELIC EXCHANGE
                </p>
              </div>
            </div>
            <p className="text-xs text-lavender-muted max-w-sm leading-relaxed">
              Every relic deserves a second life. A student-governed, zero-currency campus marketplace designed for seamless room-to-room bartering, donating, and discovering hostel room essentials.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-cinzel font-semibold">
              <Shield className="w-3.5 h-3.5 text-potion-emerald" />
              <span>Campus Verified • Hackathon Demo Edition</span>
            </div>
          </div>

          {/* Historic Hostel Wings */}
          <div>
            <h4 className="text-xs font-cinzel font-bold uppercase tracking-widest text-gold mb-3">
              Hostel Wings
            </h4>
            <ul className="space-y-2 text-xs text-lavender-muted font-medium">
              <li className="hover:text-gold transition-colors cursor-pointer">Block A (Men's Engineering Wing)</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Block B (Senior Tech Chambers)</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Block C (Women's Residence)</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Block D (Graduate Studios)</li>
            </ul>
          </div>

          {/* The Archival Shelves */}
          <div>
            <h4 className="text-xs font-cinzel font-bold uppercase tracking-widest text-gold mb-3">
              Archival Shelves
            </h4>
            <ul className="space-y-2 text-xs text-lavender-muted font-medium">
              <li className="hover:text-gold transition-colors cursor-pointer">I. Cursed Textbooks & Lab Manuals</li>
              <li className="hover:text-gold transition-colors cursor-pointer">II. Engineering Drafters & Calcs</li>
              <li className="hover:text-gold transition-colors cursor-pointer">III. Midnight Study Lamps & Warmth</li>
              <li className="hover:text-gold transition-colors cursor-pointer">IV. Ghostly Free Offerings</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lavender-muted">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-gold" />
            <p>© 2026 The Potion Pantry. Circular campus barter protocol. Guarded by the Coven.</p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-surface border border-gold-subtle hover:border-gold text-cream text-[11px] font-cinzel font-semibold transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-gold" />
          </button>
        </div>
      </div>
    </footer>
  );
};
