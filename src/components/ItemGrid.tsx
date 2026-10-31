import React, { useState } from 'react';
import { Item, ItemCategory, HostelBlock, ListingType } from '../types';
import { 
  Heart, 
  MessageSquare, 
  MapPin, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRightLeft, 
  Gift, 
  Scroll, 
  Package, 
  HelpCircle, 
  Tag, 
  X, 
  PlusCircle, 
  CheckCircle2, 
  Handshake 
} from 'lucide-react';
import { CATEGORIES } from './CategoryFilter';
import { Magnetic } from './ui/Magnetic';

interface ItemGridProps {
  items: Item[];
  selectedCategory: ItemCategory | 'All';
  onSelectCategory: (cat: ItemCategory | 'All') => void;
  selectedBlock: HostelBlock | 'All';
  onSelectBlock: (block: HostelBlock | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFeedTab: 'treasures' | 'seeking';
  onSelectFeedTab: (tab: 'treasures' | 'seeking') => void;
  onItemChat: (item: Item) => void;
  onPostClick: () => void;
  isLoading?: boolean;
}

export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  selectedBlock,
  onSelectBlock,
  searchQuery,
  setSearchQuery,
  selectedFeedTab,
  onSelectFeedTab,
  onItemChat,
  onPostClick,
  isLoading,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  // Compute feed counts
  const availableCount = items.filter(i => i.listing_type !== 'Wanted').length;
  const wantedCount = items.filter(i => i.listing_type === 'Wanted').length;

  // Filter items
  const filteredItems = items.filter(item => {
    // 1. Tab switch: Pantry Treasures vs Seeking Spells
    if (selectedFeedTab === 'treasures' && item.listing_type === 'Wanted') {
      return false;
    }
    if (selectedFeedTab === 'seeking' && item.listing_type !== 'Wanted') {
      return false;
    }

    // 2. Category filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // 3. Hostel Block filter
    if (selectedBlock !== 'All' && item.hostel_block !== selectedBlock) {
      return false;
    }

    // 4. Live Search input (title & description & expected return)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchReturn = item.expected_return?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat && !matchReturn) {
        return false;
      }
    }

    return true;
  });

  const getListingTypePill = (type: ListingType) => {
    switch (type) {
      case 'Available':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-potion-emerald/15 text-potion-emerald border border-potion-emerald/30 shadow-sm">
            ● Available
          </span>
        );
      case 'Donation':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pumpkin/15 text-pumpkin border border-pumpkin/30 shadow-sm flex items-center gap-1">
            <Gift className="w-2.5 h-2.5" /> Free Donation
          </span>
        );
      case 'Exchange':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-coven/25 text-coven-light border border-coven/40 shadow-sm flex items-center gap-1">
            <ArrowRightLeft className="w-2.5 h-2.5" /> Exchange
          </span>
        );
      case 'Wanted':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm flex items-center gap-1">
            <Scroll className="w-2.5 h-2.5" /> Seeking Spell
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="explore" className="w-full my-12 scroll-mt-24">
      
      {/* Feed Title & High-Level Intro */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-pumpkin text-sm">✦</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender-muted">
              Live Campus Inventory
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-cream">
            {selectedFeedTab === 'treasures' ? 'Recently Discovered Treasures' : 'Seeking Spells (Wanted Board)'}
          </h2>
          <p className="text-xs sm:text-sm text-lavender-muted mt-1">
            {selectedFeedTab === 'treasures'
              ? `${filteredItems.length} items ready for immediate barter or pickup across campus wings`
              : `${filteredItems.length} active requests from students seeking essentials in your wing`}
          </p>
        </div>

        {/* Tab Switch: Treasures vs Seeking Spells */}
        <div className="p-1 rounded-2xl bg-obsidian-surface border border-pumpkin/20 flex items-center shrink-0">
          <Magnetic strength={0.4}>
            <button
              onClick={() => onSelectFeedTab('treasures')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                selectedFeedTab === 'treasures'
                  ? 'bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark shadow-potion-glow'
                  : 'text-lavender-muted hover:text-cream'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Pantry Treasures</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                selectedFeedTab === 'treasures' ? 'bg-obsidian-dark text-pumpkin' : 'bg-white/10 text-cream'
              }`}>
                {availableCount}
              </span>
            </button>
          </Magnetic>

          <Magnetic strength={0.4}>
            <button
              onClick={() => onSelectFeedTab('seeking')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                selectedFeedTab === 'seeking'
                  ? 'bg-gradient-to-r from-coven to-coven-light text-cream shadow-coven-glow'
                  : 'text-lavender-muted hover:text-cream'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Seeking Spells</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                selectedFeedTab === 'seeking' ? 'bg-white text-coven-dark' : 'bg-white/10 text-cream'
              }`}>
                {wantedCount}
              </span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="p-4 rounded-3xl bg-obsidian-surface border card-border-subtle shadow-lg space-y-3 mb-8">
        
        {/* Top Control Line: Search & Hostel Block */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-lavender-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={selectedFeedTab === 'treasures' ? "Live search by item name, notes, calculator..." : "Search wanted requests, courses, tools..."}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-obsidian-dark border border-pumpkin/20 text-xs text-cream placeholder-lavender-muted focus:outline-none focus:border-pumpkin focus:ring-1 focus:ring-pumpkin transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lavender-muted hover:text-cream"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Hostel Block Filter Dropdown */}
          <div className="relative min-w-[170px]">
            <select
              value={selectedBlock}
              onChange={(e) => onSelectBlock(e.target.value as HostelBlock | 'All')}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl bg-obsidian-dark border border-pumpkin/20 text-xs font-semibold text-cream focus:outline-none focus:border-pumpkin cursor-pointer"
            >
              <option value="All">All Hostel Blocks</option>
              <option value="Block A">Block A (Men)</option>
              <option value="Block B">Block B (Senior Men)</option>
              <option value="Block C">Block C (Women)</option>
              <option value="Block D">Block D (Graduate Women)</option>
            </select>
            <MapPin className="w-3.5 h-3.5 text-pumpkin absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Quick Post CTA Button */}
          <Magnetic strength={0.7}>
            <button
              onClick={onPostClick}
              className="px-4 py-2.5 rounded-2xl bg-pumpkin/15 border border-pumpkin/30 hover:bg-pumpkin hover:text-obsidian-dark text-pumpkin text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{selectedFeedTab === 'treasures' ? 'Brew Listing' : 'Post Request'}</span>
            </button>
          </Magnetic>
        </div>

        {/* Bottom Control Line: Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-lavender-muted mr-1 shrink-0 uppercase tracking-wider">
            Category:
          </span>

          <button
            onClick={() => onSelectCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'All'
                ? 'bg-pumpkin text-obsidian-dark shadow-sm'
                : 'bg-obsidian-dark border border-white/5 text-lavender-muted hover:text-cream'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'All' : cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-pumpkin text-obsidian-dark shadow-sm'
                    : 'bg-obsidian-dark border border-white/5 text-lavender-muted hover:text-cream'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Items */}
      {filteredItems.length === 0 ? (
        <div className="rounded-3xl bg-obsidian-surface border card-border-subtle p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-coven/30 to-pumpkin/20 border border-pumpkin/30 text-pumpkin flex items-center justify-center mx-auto text-2xl shadow-potion-glow">
            {selectedFeedTab === 'treasures' ? '🔮' : '📜'}
          </div>
          <h3 className="font-editorial text-2xl font-bold text-cream">
            {selectedFeedTab === 'treasures' ? 'No Treasures in This Wing' : 'No Seeking Spells in This Wing'}
          </h3>
          <p className="text-xs sm:text-sm text-lavender-muted">
            {searchQuery
              ? `No results found for "${searchQuery}". Try a broader keyword or clear the filter.`
              : `No items matched your current hostel block and category filters.`}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Magnetic strength={0.8}>
              <button
                onClick={() => {
                  onSelectBlock('All');
                  onSelectCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-full bg-pumpkin text-obsidian-dark font-bold text-xs uppercase tracking-wider shadow-potion-glow hover:scale-105 transition-all"
              >
                Reset Filters
              </button>
            </Magnetic>
            <Magnetic strength={0.8}>
              <button
                onClick={onPostClick}
                className="px-5 py-2.5 rounded-full bg-coven/20 border border-coven/40 text-cream font-bold text-xs uppercase tracking-wider hover:bg-coven/30 transition-all"
              >
                {selectedFeedTab === 'treasures' ? 'Brew an Item' : 'Post a Request'}
              </button>
            </Magnetic>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isFav = !!favorites[item.id];
            const isWanted = item.listing_type === 'Wanted';

            return (
              <div
                key={item.id}
                className={`interactive-card group relative rounded-3xl bg-obsidian-card border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isWanted
                    ? 'border-coven/35 hover:border-coven hover:shadow-coven-glow'
                    : 'card-border-subtle hover:border-pumpkin/50 hover:shadow-potion-glow'
                }`}
              >
                {/* Top Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-dark">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-card via-transparent to-black/35 pointer-events-none" />

                  {/* Heart Favorite Button */}
                  <Magnetic strength={0.6} className="absolute top-3.5 right-3.5 z-10">
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="w-8 h-8 rounded-full bg-obsidian/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-cream hover:scale-110 active:scale-95 transition-all"
                      title={isFav ? "Saved to your potions" : "Save item"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-cream/80'
                        }`}
                      />
                    </button>
                  </Magnetic>

                  {/* Top-Left Category & Status Pills */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-obsidian/80 backdrop-blur-md text-lavender-muted border border-white/15">
                      {item.category}
                    </span>
                    {getListingTypePill(item.listing_type)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location and Condition Line */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="inline-flex items-center gap-1 text-pumpkin font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.hostel_block}
                      </span>
                      <span className="text-[11px] text-lavender-muted font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                        {item.condition}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-editorial text-xl font-bold text-cream group-hover:text-pumpkin transition-colors mb-2 line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-lavender-muted line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Expected Return / Swap Term */}
                    {item.expected_return && (
                      <div className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs mb-4 ${
                        isWanted ? 'bg-coven/15 border-coven/30' : 'bg-obsidian-surface border-pumpkin/15'
                      }`}>
                        <Tag className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isWanted ? 'text-coven-light' : 'text-potion-emerald'}`} />
                        <span className="text-[11px] text-cream/90 font-medium line-clamp-1">
                          <strong className={isWanted ? 'text-coven-light font-semibold' : 'text-potion-emerald font-semibold'}>
                            {isWanted ? 'Offering: ' : 'Wants: '}
                          </strong>
                          {item.expected_return}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Action Button */}
                  {isWanted ? (
                    <button
                      onClick={() => onItemChat(item)}
                      className="w-full py-2.5 rounded-xl bg-coven/20 border border-coven/40 text-cream group-hover:bg-coven group-hover:text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Handshake className="w-3.5 h-3.5 text-coven-light group-hover:text-white transition-colors" />
                      <span>🤝 I Have This / Fulfill Spell</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onItemChat(item)}
                      className="w-full py-2.5 rounded-xl bg-coven/15 border border-coven/30 text-cream group-hover:bg-pumpkin group-hover:text-obsidian-dark group-hover:border-pumpkin font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-coven-light group-hover:text-obsidian-dark transition-colors" />
                      <span>💬 Bargain / Chat with Owner</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
