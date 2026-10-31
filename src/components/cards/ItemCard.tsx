import React, { useRef } from 'react';
import { Item, ListingType } from '../../types';
import {
  Heart,
  MessageSquare,
  MapPin,
  Tag,
  Gift,
  ArrowRightLeft,
  Scroll,
  Handshake,
} from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';
import { gsap } from '../../utils/animations';

interface ItemCardProps {
  item: Item;
  isFav: boolean;
  onToggleFavorite: (itemId: string, e: React.MouseEvent) => void;
  onItemChat: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isFav,
  onToggleFavorite,
  onItemChat,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const isWanted = item.listing_type === 'Wanted';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Relative offset (-0.5 to 0.5)
    const x = mouseX / rect.width - 0.5;
    const y = mouseY / rect.height - 0.5;

    // Update CSS custom variables dynamically for radial spotlight border
    cardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);

    // Animate 3D tilt
    gsap.to(cardRef.current, {
      rotateY: x * 14,
      rotateX: -y * 14,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    // Animate inner elements (image and badges) with deeper translation for layered depth
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        z: 25,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (badgesRef.current) {
      gsap.to(badgesRef.current, {
        z: 35,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    // Reset smoothly with elastic physics
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        z: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (badgesRef.current) {
      gsap.to(badgesRef.current, {
        z: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    // Move spotlight away on leave
    cardRef.current.style.setProperty('--mouse-x', '-500px');
    cardRef.current.style.setProperty('--mouse-y', '-500px');
  };

  const renderListingTypePill = (type: ListingType) => {
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
    <div
      ref={containerRef}
      className="item-card-wrapper relative h-full"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Tilting Card with Radial Border Glare */}
      <div
        ref={cardRef}
        className={`interactive-card group relative h-full rounded-3xl p-[1px] will-change-transform transition-shadow duration-300 ${
          isWanted
            ? 'hover:shadow-coven-glow'
            : 'hover:shadow-potion-glow'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          background: `radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${
            isWanted ? 'rgba(123, 44, 191, 0.45)' : 'rgba(255, 138, 43, 0.35)'
          }, transparent 40%), rgba(255, 145, 48, 0.12)`,
        }}
      >
        {/* Inner Card Surface */}
        <div
          className="relative rounded-[23px] bg-obsidian-card w-full h-full flex flex-col justify-between overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top Image Container with Layered 3D Depth */}
          <div
            ref={imageRef}
            className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-dark will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Gradient bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-card via-transparent to-black/35 pointer-events-none" />

            {/* Heart Favorite Button */}
            <Magnetic strength={0.6} className="absolute top-3.5 right-3.5 z-20">
              <button
                onClick={(e) => onToggleFavorite(item.id, e)}
                className="w-8 h-8 rounded-full bg-obsidian/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-cream hover:scale-110 active:scale-95 transition-all shadow-md"
                title={isFav ? 'Saved to your potions' : 'Save item'}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFav ? 'fill-rose-500 text-rose-500' : 'text-cream/80'
                  }`}
                />
              </button>
            </Magnetic>

            {/* Top-Left Category & Status Pills with Layered Z-Depth */}
            <div
              ref={badgesRef}
              className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-20 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-obsidian/85 backdrop-blur-md text-lavender-muted border border-white/15 shadow-sm">
                {item.category}
              </span>
              {renderListingTypePill(item.listing_type)}
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
                <div
                  className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs mb-4 ${
                    isWanted
                      ? 'bg-coven/15 border-coven/30'
                      : 'bg-obsidian-surface border-pumpkin/15'
                  }`}
                >
                  <Tag
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isWanted ? 'text-coven-light' : 'text-potion-emerald'
                    }`}
                  />
                  <span className="text-[11px] text-cream/90 font-medium line-clamp-1">
                    <strong
                      className={
                        isWanted
                          ? 'text-coven-light font-semibold'
                          : 'text-potion-emerald font-semibold'
                      }
                    >
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
      </div>
    </div>
  );
};
