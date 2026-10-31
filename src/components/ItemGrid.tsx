import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Item, ItemCategory, HostelBlock } from '../types';
import {
  MapPin,
  Search,
  X,
  PlusCircle,
  Package,
  Scroll,
} from 'lucide-react';
import { CATEGORIES } from './CategoryFilter';
import { Magnetic } from './ui/Magnetic';
import { ItemCard } from './cards/ItemCard';
import { gsap } from '../utils/animations';

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
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  // Compute feed counts
  const availableCount = items.filter((i) => i.listing_type !== 'Wanted').length;
  const wantedCount = items.filter((i) => i.listing_type === 'Wanted').length;

  // Filter items matching active filters
  const computeFiltered = () => {
    return items.filter((item) => {
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

      // 4. Live Search input
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
  };

  const filteredItems = computeFiltered();

  // State for cards currently rendered in DOM
  const [displayedItems, setDisplayedItems] = useState<Item[]>(filteredItems);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  // Category Pill bar refs for sliding indicator
  const pillBarRef = useRef<HTMLDivElement>(null);
  const slidingIndicatorRef = useRef<HTMLDivElement>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isIndicatorInitialized = useRef(false);

  // Sliding category indicator layout animation
  useLayoutEffect(() => {
    const activeButton = categoryButtonRefs.current[selectedCategory];
    const bar = pillBarRef.current;
    const indicator = slidingIndicatorRef.current;

    if (activeButton && bar && indicator) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = activeButton.getBoundingClientRect();

      const targetX = btnRect.left - barRect.left + bar.scrollLeft;
      const targetY = btnRect.top - barRect.top;
      const targetW = btnRect.width;
      const targetH = btnRect.height;

      if (!isIndicatorInitialized.current) {
        gsap.set(indicator, {
          x: targetX,
          y: targetY,
          width: targetW,
          height: targetH,
          opacity: 1,
        });
        isIndicatorInitialized.current = true;
      } else {
        gsap.to(indicator, {
          x: targetX,
          y: targetY,
          width: targetW,
          height: targetH,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
        });
      }
    }
  }, [selectedCategory]);

  // Re-calculate indicator on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeButton = categoryButtonRefs.current[selectedCategory];
      const bar = pillBarRef.current;
      const indicator = slidingIndicatorRef.current;
      if (activeButton && bar && indicator) {
        const barRect = bar.getBoundingClientRect();
        const btnRect = activeButton.getBoundingClientRect();
        gsap.set(indicator, {
          x: btnRect.left - barRect.left + bar.scrollLeft,
          y: btnRect.top - barRect.top,
          width: btnRect.width,
          height: btnRect.height,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedCategory]);

  // Fluid transition: Animate exiting departing cards, then update state
  useEffect(() => {
    const currentFingerprint = displayedItems.map((i) => i.id + i.status).join(',');
    const targetFingerprint = filteredItems.map((i) => i.id + i.status).join(',');

    if (currentFingerprint === targetFingerprint) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      setDisplayedItems(filteredItems);
      return;
    }

    const cardElements = gridRef.current?.querySelectorAll('.item-card-wrapper');

    if (cardElements && cardElements.length > 0) {
      gsap.killTweensOf(cardElements);
      // GSAP departing cards exit
      gsap.to(cardElements, {
        opacity: 0,
        y: 15,
        scale: 0.96,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setDisplayedItems(filteredItems);
        },
      });
    } else {
      setDisplayedItems(filteredItems);
    }
  }, [
    items,
    selectedCategory,
    selectedBlock,
    searchQuery,
    selectedFeedTab,
  ]);

  // Animate newly matched cards entering the grid
  useLayoutEffect(() => {
    const cardElements = gridRef.current?.querySelectorAll('.item-card-wrapper');
    if (cardElements && cardElements.length > 0) {
      gsap.killTweensOf(cardElements);
      gsap.fromTo(
        cardElements,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }
  }, [displayedItems]);

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
            {selectedFeedTab === 'treasures'
              ? 'Recently Discovered Treasures'
              : 'Seeking Spells (Wanted Board)'}
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
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  selectedFeedTab === 'treasures'
                    ? 'bg-obsidian-dark text-pumpkin'
                    : 'bg-white/10 text-cream'
                }`}
              >
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
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  selectedFeedTab === 'seeking'
                    ? 'bg-white text-coven-dark'
                    : 'bg-white/10 text-cream'
                }`}
              >
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
              placeholder={
                selectedFeedTab === 'treasures'
                  ? 'Live search by item name, notes, calculator...'
                  : 'Search wanted requests, courses, tools...'
              }
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
              onChange={(e) =>
                onSelectBlock(e.target.value as HostelBlock | 'All')
              }
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
              <span>
                {selectedFeedTab === 'treasures'
                  ? 'Brew Listing'
                  : 'Post Request'}
              </span>
            </button>
          </Magnetic>
        </div>

        {/* Bottom Control Line: Category Filter Pills with Sliding Layout Indicator */}
        <div
          ref={pillBarRef}
          className="relative flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-1 no-scrollbar text-xs"
        >
          {/* Sliding Layout Indicator Pill */}
          <div
            ref={slidingIndicatorRef}
            className="absolute rounded-xl bg-pumpkin shadow-potion-glow pointer-events-none z-0 opacity-0 will-change-transform"
          />

          <span className="text-[11px] font-bold text-lavender-muted mr-1 shrink-0 uppercase tracking-wider relative z-10 select-none">
            Category:
          </span>

          <button
            ref={(el) => (categoryButtonRefs.current['All'] = el)}
            onClick={() => onSelectCategory('All')}
            className={`relative z-10 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors duration-200 select-none ${
              selectedCategory === 'All'
                ? 'text-obsidian-dark font-bold'
                : 'bg-obsidian-dark/60 border border-white/5 text-lavender-muted hover:text-cream'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => (categoryButtonRefs.current[cat.id] = el)}
                onClick={() => onSelectCategory(isSelected ? 'All' : cat.id)}
                className={`relative z-10 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors duration-200 flex items-center gap-1.5 select-none ${
                  isSelected
                    ? 'text-obsidian-dark font-bold'
                    : 'bg-obsidian-dark/60 border border-white/5 text-lavender-muted hover:text-cream'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Items with Fluid Transitions */}
      {displayedItems.length === 0 ? (
        <div className="rounded-3xl bg-obsidian-surface border card-border-subtle p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-coven/30 to-pumpkin/20 border border-pumpkin/30 text-pumpkin flex items-center justify-center mx-auto text-2xl shadow-potion-glow">
            {selectedFeedTab === 'treasures' ? '🔮' : '📜'}
          </div>
          <h3 className="font-editorial text-2xl font-bold text-cream">
            {selectedFeedTab === 'treasures'
              ? 'No Treasures in This Wing'
              : 'No Seeking Spells in This Wing'}
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
                {selectedFeedTab === 'treasures'
                  ? 'Brew an Item'
                  : 'Post a Request'}
              </button>
            </Magnetic>
          </div>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isFav={!!favorites[item.id]}
              onToggleFavorite={toggleFavorite}
              onItemChat={onItemChat}
            />
          ))}
        </div>
      )}
    </section>
  );
};
