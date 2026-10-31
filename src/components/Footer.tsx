import React from 'react';
import { Sparkles, Heart, Shield, Terminal, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-obsidian-dark border-t border-pumpkin/15 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coven to-pumpkin flex items-center justify-center text-obsidian shadow-potion-glow">
                <Sparkles className="w-5 h-5 fill-obsidian" />
              </div>
              <div>
                <span className="font-editorial text-xl font-bold text-cream tracking-wide">
                  The Potion Pantry
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-lavender-muted">
                  Hostel Essentials Exchange
                </p>
              </div>
            </div>
            <p className="text-xs text-lavender-muted max-w-sm leading-relaxed">
              Every treasure deserves a second life. A student-led, zero-waste campus marketplace designed for seamless bartering, donating, and discovering hostel room essentials.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-potion-emerald/10 border border-potion-emerald/20 text-potion-emerald text-[11px] font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Campus Verified • Hackathon Demo Edition</span>
            </div>
          </div>

          {/* Quick Wings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-pumpkin mb-3">
              Hostel Wings
            </h4>
            <ul className="space-y-2 text-xs text-lavender-muted">
              <li className="hover:text-cream transition-colors cursor-pointer">Block A (Men's Quarters)</li>
              <li className="hover:text-cream transition-colors cursor-pointer">Block B (Senior Tech Wing)</li>
              <li className="hover:text-cream transition-colors cursor-pointer">Block C (Women's Residence)</li>
              <li className="hover:text-cream transition-colors cursor-pointer">Block D (Graduate Studios)</li>
            </ul>
          </div>

          {/* Spellcraft Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-coven-light mb-3">
              Spell Categories
            </h4>
            <ul className="space-y-2 text-xs text-lavender-muted">
              <li className="hover:text-cream transition-colors cursor-pointer">Spell Books (Textbooks & Notes)</li>
              <li className="hover:text-cream transition-colors cursor-pointer">Magic Tools (Stationery & Scientific)</li>
              <li className="hover:text-cream transition-colors cursor-pointer">Room Charms (Lamps & Bedding)</li>
              <li className="hover:text-cream transition-colors cursor-pointer">Free Potions (Junior Donations)</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lavender-muted">
          <p>© 2026 The Potion Pantry. Crafted with Halloween Magic for Hacksprint.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-surface border border-pumpkin/20 hover:border-pumpkin text-cream text-[11px] transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-pumpkin" />
          </button>
        </div>
      </div>
    </footer>
  );
};

