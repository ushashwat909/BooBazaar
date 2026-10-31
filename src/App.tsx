import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ImpactStrip } from './components/ImpactStrip';
import { HowItWorks } from './components/HowItWorks';
import { ItemGrid } from './components/ItemGrid';
import { AuthModal } from './components/AuthModal';
import { BrewListingModal } from './components/BrewListingModal';
import { ChatModal } from './components/ChatModal';
import { Footer } from './components/Footer';
import { AuthPage } from './pages/AuthPage';
import { AuraCursor } from './components/ui/AuraCursor';
import { GhostCompanion } from './components/spooky/GhostCompanion';
import { OuijaOracleGame } from './components/spooky/OuijaOracleGame';
import { Item, ItemCategory, HostelBlock } from './types';
import { INITIAL_ITEMS, supabase } from './lib/supabase';
import { ExploreExperiencesSection } from './components/experiences/ExploreExperiencesSection';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { EXPERIENCES } from './data/experiences';
import { Flame } from 'lucide-react';

const MainApp: React.FC = () => {
  const { currentUser, openAuthModal } = useAuth();

  // State for selected experience
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/experience/')) {
      return hash.replace('#/experience/', '');
    }
    return null;
  });

  // Simple clean routing support for 'home' | 'auth' | 'experience'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'auth' | 'experience'>(() => {
    if (window.location.pathname === '/auth' || window.location.hash === '#/auth') {
      return 'auth';
    }
    if (window.location.hash.startsWith('#/experience/')) {
      return 'experience';
    }
    return 'home';
  });

  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem('potion_pantry_items');
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  // Filter States
  const [selectedFeedTab, setSelectedFeedTab] = useState<'treasures' | 'seeking'>('treasures');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'All'>('All');
  const [selectedBlock, setSelectedBlock] = useState<HostelBlock | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavTab, setActiveNavTab] = useState('home');

  // Modals, Spirit Game & Chat Drawer State
  const [isBrewModalOpen, setIsBrewModalOpen] = useState(false);
  const [brewModalMode, setBrewModalMode] = useState<'offer' | 'request'>('offer');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isOuijaOpen, setIsOuijaOpen] = useState(false);
  const [activeChatItem, setActiveChatItem] = useState<Item | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with browser back/forward or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/auth' || window.location.pathname === '/auth') {
        setCurrentRoute('auth');
      } else if (hash.startsWith('#/experience/')) {
        const id = hash.replace('#/experience/', '');
        setSelectedExperienceId(id);
        setCurrentRoute('experience');
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectExperience = (expId: string) => {
    setSelectedExperienceId(expId);
    setCurrentRoute('experience');
    window.location.hash = `#/experience/${expId}`;
  };

  const handleBackToExperiences = () => {
    setCurrentRoute('home');
    window.location.hash = '#experiences';
    setTimeout(() => {
      const el = document.getElementById('experiences');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  // Sync with Supabase on load if available
  useEffect(() => {
    const fetchSupabaseItems = async () => {
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*, owner:users(*)')
          .order('created_at', { ascending: false });

        if (data && data.length > 0 && !error) {
          setItems(data);
          localStorage.setItem('potion_pantry_items', JSON.stringify(data));
        }
      } catch (err) {
        console.info('Using preloaded mock items (Supabase offline or empty):', err);
      }
    };

    fetchSupabaseItems();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCategorySelect = (cat: ItemCategory | 'All') => {
    setSelectedCategory(cat);
    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeekingSpellsNavClick = () => {
    setSelectedFeedTab('seeking');
    setActiveNavTab('seeking');
    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBrewModal = (mode: 'offer' | 'request' = 'offer') => {
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }
    setBrewModalMode(mode);
    setIsBrewModalOpen(true);
  };

  const handleOpenItemChat = (item: Item) => {
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }
    setActiveChatItem(item);
    setActiveConversationId(null);
    setIsChatDrawerOpen(true);
  };

  const handleOpenActiveChats = () => {
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }
    setActiveChatItem(items[0] || null);
    setActiveConversationId('conv-111');
    setIsChatDrawerOpen(true);
  };

  const handleItemAdded = async (newItem: Item) => {
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('potion_pantry_items', JSON.stringify(updated));

    if (newItem.listing_type === 'Wanted') {
      setSelectedFeedTab('seeking');
    } else {
      setSelectedFeedTab('treasures');
    }

    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      await supabase.from('items').insert([
        {
          owner_id: newItem.owner_id,
          title: newItem.title,
          description: newItem.description,
          category: newItem.category,
          listing_type: newItem.listing_type,
          condition: newItem.condition,
          expected_return: newItem.expected_return,
          hostel_block: newItem.hostel_block,
          image_url: newItem.image_url,
          status: 'Open',
        },
      ]);
    } catch (e) {
      console.warn('Supabase insert skipped:', e);
    }

    showToast(`📜 "${newItem.title}" added to ${newItem.hostel_block} pantry!`);
  };

  const handleItemClaimed = (claimedItemId: string) => {
    const updated = items.map((item) =>
      item.id === claimedItemId ? { ...item, status: 'Claimed' as const } : item
    );
    setItems(updated);
    localStorage.setItem('potion_pantry_items', JSON.stringify(updated));
    showToast('🎉 Item marked as Claimed! +50 Potion Points credited.');
  };

  // Award Karma from Ouija / Ghost Minigame
  const handleAwardKarma = (points: number) => {
    if (currentUser) {
      currentUser.karma_points += points;
      localStorage.setItem('potion_pantry_current_user', JSON.stringify(currentUser));
      showToast(`👻 The Spirits awarded you +${points} Karma Points!`);
    } else {
      showToast(`👻 The Spirits revealed: +${points} Karma! Sign in to keep it!`);
    }
  };

  // Compute category counts
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Standalone /auth page view
  if (currentRoute === 'auth') {
    return (
      <>
        <AuraCursor />
        <AuthPage
          onBackToPantry={() => {
            window.location.hash = '';
            setCurrentRoute('home');
          }}
        />
      </>
    );
  }

  // Standalone individual experience detail view
  if (currentRoute === 'experience') {
    const activeExperience =
      EXPERIENCES.find((e) => e.id === selectedExperienceId) || EXPERIENCES[0];
    return (
      <div className="min-h-screen flex flex-col bg-obsidian text-cream relative selection:bg-gold selection:text-obsidian-dark">
        <AuraCursor />
        <Navbar
          onSearchClick={() => {
            setCurrentRoute('home');
            setTimeout(() => {
              const el = document.getElementById('explore');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onPostClick={() => openBrewModal('offer')}
          onSeekingSpellsClick={() => {
            setCurrentRoute('home');
            handleSeekingSpellsNavClick();
          }}
          onActiveChatsClick={handleOpenActiveChats}
          onOpenOuija={() => setIsOuijaOpen(true)}
          activeTab={activeNavTab}
          setActiveTab={(tab) => {
            setActiveNavTab(tab);
            setCurrentRoute('home');
          }}
        />

        <div className="pt-20">
          <ExperienceDetailPage
            experience={activeExperience}
            onBack={handleBackToExperiences}
            onBook={() => openBrewModal('offer')}
            onOpenChat={() => {
              setActiveChatItem(items[0] || null);
              setIsChatDrawerOpen(true);
            }}
          />
        </div>

        <Footer />
        <AuthModal />
        <BrewListingModal
          isOpen={isBrewModalOpen}
          onClose={() => setIsBrewModalOpen(false)}
          onItemAdded={handleItemAdded}
          defaultMode={brewModalMode}
        />
        <ChatModal
          isOpen={isChatDrawerOpen}
          onClose={() => setIsChatDrawerOpen(false)}
          targetItem={activeChatItem}
          activeConversationId={activeConversationId}
          onItemClaimed={handleItemClaimed}
        />
        <OuijaOracleGame
          isOpen={isOuijaOpen}
          onClose={() => setIsOuijaOpen(false)}
          onAwardKarma={handleAwardKarma}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-cream relative selection:bg-pumpkin selection:text-obsidian-dark">
      {/* Ambient Apothecary Aura Cursor & Spotlight Glow */}
      <AuraCursor />

      {/* Interactive Ghost Mascot Companion */}
      <GhostCompanion onOpenOuija={() => setIsOuijaOpen(true)} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs shadow-gold-glow border border-gold-bright/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <Flame className="w-4 h-4 fill-obsidian stroke-obsidian" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Fixed Transparent Navbar with on-scroll transition to solid dark */}
      <Navbar
        onSearchClick={() => {
          const el = document.getElementById('explore');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onPostClick={() => openBrewModal('offer')}
        onSeekingSpellsClick={handleSeekingSpellsNavClick}
        onActiveChatsClick={handleOpenActiveChats}
        onOpenOuija={() => setIsOuijaOpen(true)}
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
      />

      {/* Full-Screen Edge-to-Edge Cinematic Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('experiences') || document.getElementById('explore');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBrewClick={() => openBrewModal('offer')}
        onOpenOuija={() => setIsOuijaOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Premium Explore Our Experiences Section */}
        <ExploreExperiencesSection onSelectExperience={handleSelectExperience} />

        {/* 6 Category Filter Row */}
        <div className="my-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Campus Impact Strip */}
        <ImpactStrip />

        {/* Full Explore & Seeking Spells Filterable Live Feed */}
        <ItemGrid
          items={items}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedBlock={selectedBlock}
          onSelectBlock={setSelectedBlock}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFeedTab={selectedFeedTab}
          onSelectFeedTab={setSelectedFeedTab}
          onItemChat={handleOpenItemChat}
          onPostClick={() =>
            openBrewModal(selectedFeedTab === 'seeking' ? 'request' : 'offer')
          }
        />

        {/* How It Works Explainer for Judges */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Real-Time Slide-over Drawer */}
      <AuthModal />
      <BrewListingModal
        isOpen={isBrewModalOpen}
        onClose={() => setIsBrewModalOpen(false)}
        onItemAdded={handleItemAdded}
        defaultMode={brewModalMode}
      />
      <ChatModal
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        targetItem={activeChatItem}
        activeConversationId={activeConversationId}
        onItemClaimed={handleItemClaimed}
      />

      {/* Ouija Oracle & Ghost Minigame Modal */}
      <OuijaOracleGame
        isOpen={isOuijaOpen}
        onClose={() => setIsOuijaOpen(false)}
        onAwardKarma={handleAwardKarma}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
