import React, { useRef } from 'react';
import { ItemCategory } from '../types';
import {
  BookOpen,
  PenTool,
  Flame,
  Cpu,
  Package,
  Gift,
  Check,
} from 'lucide-react';
import { Magnetic } from './ui/Magnetic';
import { CobwebCorner } from './spooky/SpookyElements';
import { gsap } from '../utils/animations';

interface CategoryFilterProps {
  selectedCategory: ItemCategory | 'All';
  onSelectCategory: (cat: ItemCategory | 'All') => void;
  categoryCounts: Record<string, number>;
}

export const CATEGORIES: {
  id: ItemCategory;
  roman: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}[] = [
  {
    id: 'Spell Books',
    roman: 'I',
    label: 'Cursed Textbooks',
    sublabel: 'Notes & Lab Manuals',
    icon: BookOpen,
    gradient: 'from-coven/30 to-obsidian-surface',
    iconColor: 'text-coven-light',
  },
  {
    id: 'Magic Tools',
    roman: 'II',
    label: 'Engineering Relics',
    sublabel: 'Drafters & Casio Calcs',
    icon: PenTool,
    gradient: 'from-gold/25 to-obsidian-surface',
    iconColor: 'text-gold',
  },
  {
    id: 'Room Charms',
    roman: 'III',
    label: 'Midnight Charms',
    sublabel: 'Study Lamps & Blankets',
    icon: Flame,
    gradient: 'from-potion-emerald/25 to-obsidian-surface',
    iconColor: 'text-potion-emerald',
  },
  {
    id: 'Enchanted Tech',
    roman: 'IV',
    label: 'Banned Dorm Tech',
    sublabel: 'Kettles, Audio & Cables',
    icon: Cpu,
    gradient: 'from-blue-500/25 to-obsidian-surface',
    iconColor: 'text-blue-400',
  },
  {
    id: 'Dorm Treasures',
    roman: 'V',
    label: 'Hostel Furniture',
    sublabel: 'Chairs, Trunks & Hangers',
    icon: Package,
    gradient: 'from-amber-600/25 to-obsidian-surface',
    iconColor: 'text-amber-400',
  },
  {
    id: 'Free Potions',
    roman: 'VI',
    label: 'Ghost Offerings',
    sublabel: '100% Free Campus Loot',
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
            ? 'shadow-gold-glow border border-gold/70'
            : 'border border-gold-subtle hover:shadow-gold-glow/40 hover:border-gold/40'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          background: `radial-gradient(300px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${
            isSelected ? 'rgba(197, 160, 89, 0.45)' : 'rgba(197, 160, 89, 0.28)'
          }, transparent 45%), rgba(197, 160, 89, 0.08)`,
        }}
      >
        <div
          className={`relative rounded-[15px] p-4 w-full h-full flex flex-col justify-between overflow-hidden transition-colors ${
            isSelected
              ? 'bg-gradient-to-br from-gold/20 via-obsidian-surface to-coven/20'
              : 'bg-obsidian-card group-hover:bg-obsidian-cardHover'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {isSelected && <CobwebCorner position="top-right" size={36} />}

          {/* Top Row: Roman numeral & Count */}
          <div className="flex items-center justify-between w-full mb-3">
            <span className="font-cinzel text-xs font-bold text-gold/80 tracking-widest">
              {cat.roman}
            </span>

            <span className="text-[10px] font-cinzel font-semibold px-2 py-0.5 rounded-full bg-white/5 text-gold border border-gold/20">
              {count} {count === 1 ? 'Relic' : 'Relics'}
            </span>
          </div>

          {/* Icon Container with Magnetic touch */}
          <div className="flex items-center justify-between w-full mb-3">
            <Magnetic strength={0.5}>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-br from-gold to-gold-dark text-obsidian-dark font-bold'
                    : 'bg-white/5 ' + cat.iconColor
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </Magnetic>

            {isSelected && (
              <span className="w-4 h-4 rounded-full bg-gold text-obsidian-dark flex items-center justify-center text-[10px] font-bold shadow-sm">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Text */}
          <div>
            <p
              className={`text-xs sm:text-sm font-cinzel font-bold tracking-wide transition-colors ${
                isSelected
                  ? 'text-cream'
                  : 'text-cream group-hover:text-gold'
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
        <div className="flex items-center gap-2.5">
          <span className="text-gold font-cinzel font-bold text-sm">✦</span>
          <h2 className="text-xs uppercase tracking-[0.25em] font-cinzel font-bold text-gold">
            The Archival Categories
          </h2>
          <span className="hidden sm:inline text-xs text-lavender-muted font-normal">
            — Six Curated Shelves of Campus Essentials
          </span>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs font-cinzel font-bold text-gold hover:underline flex items-center gap-1 uppercase tracking-wider"
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
