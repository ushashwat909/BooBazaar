import React from 'react';
import { ItemCategory } from '../types';
import { 
  BookOpen, 
  PenTool, 
  Sparkles, 
  Cpu, 
  Package, 
  Gift, 
  Check 
} from 'lucide-react';
import { Magnetic } from './ui/Magnetic';

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
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'All' : cat.id)}
              className={`interactive-card relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 group flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-pumpkin/20 via-obsidian-surface to-coven/20 border-pumpkin shadow-potion-glow scale-[1.02]'
                  : 'bg-obsidian-card border-pumpkin/15 hover:border-pumpkin/40 hover:bg-obsidian-cardHover hover:translate-y-[-2px]'
              }`}
            >
              {/* Subtle top indicator when active */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-pumpkin text-obsidian flex items-center justify-center text-[10px] font-bold">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}

              {/* Icon Container with Magnetic touch */}
              <div className="flex items-center justify-between w-full mb-3">
                <Magnetic strength={0.5}>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected ? 'bg-pumpkin text-obsidian' : 'bg-white/5 ' + cat.iconColor
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
                <p className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                  isSelected ? 'text-cream' : 'text-cream group-hover:text-pumpkin'
                }`}>
                  {cat.label}
                </p>
                <p className="text-[11px] text-lavender-muted mt-0.5 line-clamp-1">
                  {cat.sublabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
