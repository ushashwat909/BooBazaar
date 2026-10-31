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
    <header className="sticky top-0 z-40 w-full bg-obsidian/90 backdrop-blur-md border-b border-pumpkin/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Magnetic strength={0.4}>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            {/* Glowing Potion Flask Icon */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-coven/40 via-obsidian-surface to-pumpkin/20 border border-pumpkin/30 shadow-potion-glow group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-pumpkin group-hover:rotate-12 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
                  stroke="#2EC4B6"
                  strokeWidth="2.5"
                />
                <circle cx="10" cy="17" r="1" fill="#2EC4B6" />
                <circle cx="14" cy="18" r="1.2" fill="#FF8A2B" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-potion-emerald animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-2xl font-bold tracking-wide text-cream group-hover:text-pumpkin transition-colors">
                  Potion Pantry
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-lavender-muted">
                Haunted Hostel Essentials
              </span>
            </div>
          </a>
        </Magnetic>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'home'
                ? 'text-pumpkin bg-pumpkin/10 font-semibold'
                : 'text-cream/80 hover:text-cream hover:bg-obsidian-surface'
            }`}
          >
            Home
          </button>

          <a
            href="#explore"
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'explore'
                ? 'text-pumpkin bg-pumpkin/10 font-semibold'
                : 'text-cream/80 hover:text-cream hover:bg-obsidian-surface'
            }`}
          >
            <Compass className="w-4 h-4 text-lavender-muted" />
            Explore
          </a>

          <button
            onClick={onSeekingSpellsClick}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'seeking'
                ? 'text-coven-light bg-coven/15 font-semibold'
                : 'text-cream/80 hover:text-coven-light hover:bg-coven/10'
            }`}
          >
            <Scroll className="w-4 h-4 text-coven-light" />
            Seeking Spells
            <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-coven/30 text-coven-light rounded-full border border-coven/40">
              Wanted
            </span>
          </button>

          {onOpenOuija && (
            <button
              onClick={onOpenOuija}
              className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 text-pumpkin hover:bg-pumpkin/10 transition-all"
            >
              <Dices className="w-4 h-4 text-pumpkin" />
              <span>Ouija Oracle</span>
            </button>
          )}

          <Magnetic strength={0.8}>
            <button
              onClick={onPostClick}
              className="px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 text-potion-emerald hover:bg-potion-emerald/10 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Brew a Listing
            </button>
          </Magnetic>

          <a
            href="#how-it-works"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-cream/80 hover:text-cream hover:bg-obsidian-surface transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-lavender-muted" />
            How It Works
          </a>
        </nav>

        {/* Right: Actions & Auth State */}
        <div className="flex items-center gap-2.5">
          {/* Haunted Ambience Audio Toggle */}
          <Magnetic strength={0.6}>
            <button
              onClick={toggleHauntedSound}
              className={`p-2.5 rounded-xl border transition-all ${
                isAudioPlaying
                  ? 'bg-pumpkin/20 border-pumpkin text-pumpkin shadow-potion-glow'
                  : 'bg-obsidian-surface border-white/10 text-lavender-muted hover:text-cream'
              }`}
              title={
                isAudioPlaying
                  ? 'Mute Haunted Wind Ambience'
                  : 'Play Haunted Hostel Ambience (Procedural)'
              }
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-pumpkin animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </Magnetic>

          {/* Quick Search Button */}
          <Magnetic strength={0.6}>
            <button
              onClick={onSearchClick}
              className="p-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/15 text-cream/70 hover:text-pumpkin hover:border-pumpkin/40 hover:bg-obsidian-cardHover transition-all"
              title="Search relics and items"
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
                  <span className="w-4 h-4 rounded-full bg-pumpkin text-obsidian font-bold text-[10px] flex items-center justify-center">
                    2
                  </span>
                </button>
              </Magnetic>

              {/* User Profile Pill */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-obsidian-surface border border-pumpkin/25 hover:border-pumpkin/50 transition-all text-left group"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-coven to-pumpkin flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {currentUser.full_name[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-cream group-hover:text-pumpkin transition-colors">
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
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-obsidian-surface border border-pumpkin/20 shadow-2xl p-2 z-50 backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-cream">
                        {currentUser.full_name}
                      </p>
                      <p className="text-[11px] text-lavender-muted">
                        Roll: {currentUser.roll_number}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-potion-emerald font-semibold">
                          Karma Points
                        </span>
                        <span className="font-bold text-pumpkin">
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
                        <span className="text-pumpkin text-xs">✓</span>
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
                        <span className="text-pumpkin text-xs">✓</span>
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
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-cream hover:text-pumpkin transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark font-extrabold text-xs uppercase tracking-wider shadow-potion-glow hover:scale-105 transition-all"
              >
                Join Coven
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-obsidian-surface border border-pumpkin/15 text-cream hover:text-pumpkin"
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
        <div className="md:hidden px-4 pt-2 pb-6 bg-obsidian-card border-b border-pumpkin/20 space-y-2">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-cream hover:bg-white/5"
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
            Explore
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
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-pumpkin hover:bg-white/5 flex items-center gap-2"
            >
              <Dices className="w-4 h-4" />
              <span>Ouija Oracle Game</span>
            </button>
          )}
          <button
            onClick={() => {
              onPostClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-potion-emerald hover:bg-white/5"
          >
            Brew a Listing
          </button>
        </div>
      )}
    </header>
  );
};
