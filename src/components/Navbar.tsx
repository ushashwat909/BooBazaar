import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Magnetic } from './ui/Magnetic';
import {
  Search,
  MessageSquare,
  LogOut,
  PlusCircle,
  ShieldCheck,
  Menu,
  X,
  Compass,
  Scroll,
  HelpCircle,
  Dices,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { hauntedAudio } from './spooky/HauntedAudio';

interface NavbarProps {
  onSearchClick: () => void;
  onPostClick: () => void;
  onSeekingSpellsClick: () => void;
  onActiveChatsClick: () => void;
  onOpenOuija?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchClick,
  onPostClick,
  onSeekingSpellsClick,
  onActiveChatsClick,
  onOpenOuija,
  activeTab,
  setActiveTab,
}) => {
  const { currentUser, logout, openAuthModal, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleHauntedSound = () => {
    const playing = hauntedAudio.toggle();
    setIsAudioPlaying(playing);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-dark/95 backdrop-blur-md border-b border-gold-subtle transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Prestigious Brand Identity Inspired by City of the Dead */}
        <Magnetic strength={0.4}>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 group cursor-pointer select-none"
          >
            {/* Antique Crest Flask Medallion */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-obsidian-surface via-obsidian-card to-coven/30 border border-gold/40 shadow-gold-glow group-hover:border-gold transition-colors duration-300">
              <svg
                className="w-6 h-6 text-gold group-hover:scale-105 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 2h6" />
                <path d="M10 2v4a2 2 0 0 1-.586 1.414l-4.828 4.828A4 4 0 0 0 3.414 15V18a4 4 0 0 0 4 4h9.172a4 4 0 0 0 4-4v-3a4 4 0 0 0-1.172-2.758L14.586 7.414A2 2 0 0 1 14 6V2" />
                <line
                  x1="8"
                  y1="14"
                  x2="16"
                  y2="14"
                  stroke="#C5A059"
                  strokeWidth="2"
                />
                <circle cx="10" cy="17" r="1" fill="#2EC4B6" />
                <circle cx="14" cy="18" r="1.2" fill="#E5C158" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-potion-emerald ring-2 ring-obsidian-dark animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.08em] text-cream group-hover:text-gold transition-colors">
                POTION PANTRY
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-gold/80">
                Circular Campus Relic Exchange
              </span>
            </div>
          </a>
        </Magnetic>

        {/* Center: Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'home'
                ? 'text-gold bg-gold/10 font-bold border-b border-gold/40'
                : 'text-cream/80 hover:text-gold hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <a
            href="#explore"
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'explore'
                ? 'text-gold bg-gold/10 font-bold border-b border-gold/40'
                : 'text-cream/80 hover:text-gold hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-gold/80" />
            <span>Relics Feed</span>
          </a>

          <button
            onClick={onSeekingSpellsClick}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'seeking'
                ? 'text-coven-light bg-coven/15 font-bold border-b border-coven/40'
                : 'text-cream/80 hover:text-coven-light hover:bg-white/5'
            }`}
          >
            <Scroll className="w-3.5 h-3.5 text-coven-light" />
            <span>Seeking Spells</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-coven/30 text-coven-light rounded-full border border-coven/40">
              Wanted
            </span>
          </button>

          {onOpenOuija && (
            <button
              onClick={onOpenOuija}
              className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-gold hover:text-gold-bright hover:bg-gold/10 transition-all font-medium"
            >
              <Dices className="w-3.5 h-3.5 text-gold" />
              <span>Spirit Oracle</span>
            </button>
          )}

          <Magnetic strength={0.8}>
            <button
              onClick={onPostClick}
              className="px-3.5 py-2 rounded-lg flex items-center gap-1.5 text-potion-emerald hover:bg-potion-emerald/10 transition-all font-bold"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Brew a Listing</span>
            </button>
          </Magnetic>

          <a
            href="#how-it-works"
            className="px-3.5 py-2 rounded-lg text-cream/70 hover:text-cream hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-lavender-muted" />
            <span>Explainer</span>
          </a>
        </nav>

        {/* Right: Actions & Reservation / Auth State */}
        <div className="flex items-center gap-2.5">
          {/* Haunted Ambience Procedural Sound Toggle */}
          <Magnetic strength={0.6}>
            <button
              onClick={toggleHauntedSound}
              className={`p-2.5 rounded-xl border transition-all ${
                isAudioPlaying
                  ? 'bg-gold/20 border-gold text-gold shadow-gold-glow'
                  : 'bg-obsidian-surface border-gold-subtle text-lavender-muted hover:text-gold'
              }`}
              title={
                isAudioPlaying
                  ? 'Mute Haunted Vault Ambience'
                  : 'Play Haunted Vault Ambience (Procedural)'
              }
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-gold animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </Magnetic>

          {/* Quick Search Button */}
          <Magnetic strength={0.6}>
            <button
              onClick={onSearchClick}
              className="p-2.5 rounded-xl bg-obsidian-surface border border-gold-subtle text-cream/80 hover:text-gold hover:border-gold/40 hover:bg-obsidian-cardHover transition-all"
              title="Search catalog of relics"
            >
              <Search className="w-4 h-4" />
            </button>
          </Magnetic>

          {/* Conditional Auth Rendering */}
          {currentUser ? (
            <div className="relative flex items-center gap-2">
              {/* Active Chats button */}
              <Magnetic strength={0.8}>
                <button
                  onClick={onActiveChatsClick}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-coven/20 border border-coven/30 text-cream text-xs font-semibold hover:bg-coven/30 hover:border-coven/50 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-coven-light" />
                  <span>Active Chats</span>
                  <span className="w-4 h-4 rounded-full bg-gold text-obsidian-dark font-bold text-[10px] flex items-center justify-center">
                    2
                  </span>
                </button>
              </Magnetic>

              {/* User Profile Pill */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-obsidian-surface border border-gold-subtle hover:border-gold/50 transition-all text-left group"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-coven to-gold flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {currentUser.full_name[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-cream group-hover:text-gold transition-colors">
                        {currentUser.full_name.split(' ')[0]}
                      </span>
                      <ShieldCheck className="w-3 h-3 text-potion-emerald" />
                    </div>
                    <span className="text-[10px] text-lavender-muted font-medium">
                      {currentUser.hostel_block} • {currentUser.room_number}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-obsidian-surface border border-gold/30 shadow-2xl p-2 z-50 backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-cream font-cinzel">
                        {currentUser.full_name}
                      </p>
                      <p className="text-[11px] text-lavender-muted">
                        Roll: {currentUser.roll_number}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-potion-emerald font-semibold">
                          Karma Points
                        </span>
                        <span className="font-bold text-gold">
                          {currentUser.karma_points} 🔮
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-lavender-muted px-3 py-1 font-semibold uppercase tracking-wider">
                      Switch Demo Identity
                    </div>
                    <button
                      onClick={() => {
                        demoLogin('aarav');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-white/5 flex items-center justify-between"
                    >
                      <span>Aarav (Block B • 204)</span>
                      {currentUser.username === 'aarav' && (
                        <span className="text-gold text-xs">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        demoLogin('meera');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-white/5 flex items-center justify-between"
                    >
                      <span>Meera (Block C • 112)</span>
                      {currentUser.username === 'meera' && (
                        <span className="text-gold text-xs">✓</span>
                      )}
                    </button>

                    <div className="border-t border-white/10 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-cream hover:text-gold transition-colors font-cinzel tracking-wider"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian-dark font-cinzel font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
              >
                Join Coven
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-cream hover:text-gold"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-obsidian-card border-b border-gold-subtle space-y-2">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-cream hover:bg-white/5 font-cinzel"
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveTab('explore');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-cream hover:bg-white/5"
          >
            Relics Feed
          </button>
          <button
            onClick={() => {
              onSeekingSpellsClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-coven-light hover:bg-white/5"
          >
            Seeking Spells
          </button>
          {onOpenOuija && (
            <button
              onClick={() => {
                onOpenOuija();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-gold hover:bg-white/5 flex items-center gap-2"
            >
              <Dices className="w-4 h-4" />
              <span>Spirit Oracle</span>
            </button>
          )}
          <button
            onClick={() => {
              onPostClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-potion-emerald hover:bg-white/5 font-semibold"
          >
            Brew a Listing
          </button>
        </div>
      )}
    </header>
  );
};
