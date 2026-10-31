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
import { Item, ItemCategory, HostelBlock } from './types';
import { INITIAL_ITEMS, supabase } from './lib/supabase';
import { Sparkles } from 'lucide-react';

const MainApp: React.FC = () => {
  const { currentUser, openAuthModal } = useAuth();

  // Simple clean routing support for '/auth'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'auth'>(() => {
    return window.location.pathname === '/auth' || window.location.hash === '#/auth' ? 'auth' : 'home';
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

  // Modals
  const [isBrewModalOpen, setIsBrewModalOpen] = useState(false);
  const [brewModalMode, setBrewModalMode] = useState<'offer' | 'request'>('offer');
  const [activeChatItem, setActiveChatItem] = useState<Item | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with browser back/forward or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/auth' || window.location.pathname === '/auth') {
        setCurrentRoute('auth');
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleItemAdded = async (newItem: Item) => {
    // Put newly created item immediately at the top of the feed
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('potion_pantry_items', JSON.stringify(updated));

    // Automatically switch to the relevant tab so the user sees their new item right away
    if (newItem.listing_type === 'Wanted') {
      setSelectedFeedTab('seeking');
    } else {
      setSelectedFeedTab('treasures');
    }

    // Scroll to explore feed
    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // Attempt Supabase insert in background
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
        }
      ]);
    } catch (e) {
      console.warn('Supabase insert skipped:', e);
    }

    showToast(`✨ "${newItem.title}" brewed successfully to ${newItem.hostel_block}!`);
  };

  // Compute category counts based on current feed tab
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Standalone /auth page view
  if (currentRoute === 'auth') {
    return (
      <AuthPage 
        onBackToPantry={() => {
          window.location.hash = '';
          setCurrentRoute('home');
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-cream">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark font-bold text-xs shadow-potion-glow border border-pumpkin-light flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 fill-obsidian-dark" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Sticky Navbar */}
      <Navbar
        onSearchClick={() => {
          const el = document.getElementById('explore');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onPostClick={() => openBrewModal('offer')}
        onSeekingSpellsClick={handleSeekingSpellsNavClick}
        onActiveChatsClick={() => {
          if (items.length > 0) {
            setActiveChatItem(items[0]);
          }
        }}
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('explore');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onBrewClick={() => openBrewModal('offer')}
        />

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
          onItemChat={(item) => setActiveChatItem(item)}
          onPostClick={() => openBrewModal(selectedFeedTab === 'seeking' ? 'request' : 'offer')}
        />

        {/* How It Works Explainer for Judges */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal />
      <BrewListingModal
        isOpen={isBrewModalOpen}
        onClose={() => setIsBrewModalOpen(false)}
        onItemAdded={handleItemAdded}
        defaultMode={brewModalMode}
      />
      <ChatModal
        item={activeChatItem}
        onClose={() => setActiveChatItem(null)}
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
