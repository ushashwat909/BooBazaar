import React, { useRef } from 'react';
import { ItemCategory } from '../types';
import {
  BookOpen,
  PenTool,
  Sparkles,
  Cpu,
  Package,
  Gift,
  Check,
} from 'lucide-react';
import { Magnetic } from './ui/Magnetic';
import { gsap } from '../utils/animations';

interface CategoryFilterProps {
  selectedCategory: ItemCategory | 'All';
  onSelectCategory: (cat: ItemCategory | 'All') => void;
  categoryCounts: Record<string, number>;
}

export const CATEGORIES: {
  id: ItemCategory;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}[] = [
  {
    id: 'Spell Books',
    label: 'Spell Books',
    sublabel: 'Books & Notes',
    icon: BookOpen,
    gradient: 'from-coven/30 to-obsidian-surface',
    iconColor: 'text-coven-light',
  },
  {
    id: 'Magic Tools',
    label: 'Magic Tools',
    sublabel: 'Stationery & Calc',
    icon: PenTool,
    gradient: 'from-pumpkin/25 to-obsidian-surface',
    iconColor: 'text-pumpkin',
  },
  {
    id: 'Room Charms',
    label: 'Room Charms',
    sublabel: 'Room Essentials & Lamps',
    icon: Sparkles,
    gradient: 'from-potion-emerald/25 to-obsidian-surface',
    iconColor: 'text-potion-emerald',
  },
  {
    id: 'Enchanted Tech',
    label: 'Enchanted Tech',
    sublabel: 'Gadgets & Audio',
    icon: Cpu,
    gradient: 'from-blue-500/25 to-obsidian-surface',
    iconColor: 'text-blue-400',
  },
  {
    id: 'Dorm Treasures',
    label: 'Dorm Treasures',
    sublabel: 'Chairs & Hostel Items',
    icon: Package,
    gradient: 'from-amber-600/25 to-obsidian-surface',
    iconColor: 'text-amber-400',
  },
  {
    id: 'Free Potions',
    label: 'Free Potions',
    sublabel: '100% Free Donations',
    icon: Gift,
    gradient: 'from-rose-500/25 to-obsidian-surface',
    iconColor: 'text-rose-400',
  },
];

interface CategoryCardItemProps {
  cat: typeof CATEGORIES[0];
  isSelected: boolean;
  count: number;
  onSelect: () => void;
}

const CategoryCardItem: React.FC<CategoryCardItemProps> = ({
  cat,
  isSelected,
  count,
  onSelect,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const Icon = cat.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);

    const x = mouseX / rect.width - 0.5;
    const y = mouseY / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.6)',
    });
    cardRef.current.style.setProperty('--mouse-x', '-500px');
    cardRef.current.style.setProperty('--mouse-y', '-500px');
  };

  return (
    <div style={{ perspective: '800px' }} className="h-full">
      <button
        ref={cardRef}
        onClick={onSelect}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`interactive-card group relative w-full h-full text-left p-[1px] rounded-2xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden will-change-transform ${
          isSelected
            ? 'shadow-potion-glow'
            : 'hover:shadow-potion-glow/50'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          background: `radial-gradient(300px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${
            isSelected ? 'rgba(255, 138, 43, 0.5)' : 'rgba(255, 138, 43, 0.35)'
          }, transparent 45%), rgba(255, 145, 48, 0.12)`,
        }}
      >
        <div
          className={`relative rounded-[15px] p-3.5 sm:p-4 w-full h-full flex flex-col justify-between overflow-hidden transition-colors ${
            isSelected
              ? 'bg-gradient-to-br from-pumpkin/20 via-obsidian-surface to-coven/20'
              : 'bg-obsidian-card group-hover:bg-obsidian-cardHover'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle top indicator when active */}
          {isSelected && (
            <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-pumpkin text-obsidian flex items-center justify-center text-[10px] font-bold shadow-sm">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          )}

          {/* Icon Container with Magnetic touch */}
          <div className="flex items-center justify-between w-full mb-3">
            <Magnetic strength={0.5}>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isSelected
                    ? 'bg-pumpkin text-obsidian shadow-sm'
                    : 'bg-white/5 ' + cat.iconColor
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </Magnetic>

            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-lavender-muted border border-white/5">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Text */}
          <div>
            <p
              className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                isSelected
                  ? 'text-cream'
                  : 'text-cream group-hover:text-pumpkin'
              }`}
            >
              {cat.label}
            </p>
            <p className="text-[11px] text-lavender-muted mt-0.5 line-clamp-1">
              {cat.sublabel}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-pumpkin text-sm">✦</span>
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-lavender-muted">
            Categories of Enchantment
          </h2>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs font-semibold text-pumpkin hover:underline flex items-center gap-1"
          >
            Clear Filter (Show All)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <CategoryCardItem
              key={cat.id}
              cat={cat}
              isSelected={isSelected}
              count={count}
              onSelect={() => onSelectCategory(isSelected ? 'All' : cat.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
