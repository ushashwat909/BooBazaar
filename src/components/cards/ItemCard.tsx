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
  Clock,
} from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';
import { CobwebCorner } from '../spooky/SpookyElements';
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

    const x = mouseX / rect.width - 0.5;
    const y = mouseY / rect.height - 0.5;

    cardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);

    gsap.to(cardRef.current, {
      rotateY: x * 12,
      rotateX: -y * 12,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        z: 22,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (badgesRef.current) {
      gsap.to(badgesRef.current, {
        z: 32,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

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

    cardRef.current.style.setProperty('--mouse-x', '-500px');
    cardRef.current.style.setProperty('--mouse-y', '-500px');
  };

  const renderListingTypePill = (type: ListingType) => {
    switch (type) {
      case 'Available':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-potion-emerald/20 text-potion-emerald border border-potion-emerald/40 shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-potion-emerald animate-pulse" />
            <span>Available</span>
          </span>
        );
      case 'Donation':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-gold/20 text-gold-bright border border-gold/40 shadow-sm flex items-center gap-1">
            <Gift className="w-2.5 h-2.5" /> Free Offering
          </span>
        );
      case 'Exchange':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-coven/30 text-coven-light border border-coven/50 shadow-sm flex items-center gap-1">
            <ArrowRightLeft className="w-2.5 h-2.5" /> Barter Swap
          </span>
        );
      case 'Wanted':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm flex items-center gap-1">
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
      {/* 3D Tilting Card with Burnished Gold Border Glare Inspired by City of the Dead */}
      <div
        ref={cardRef}
        className={`interactive-card group relative h-full rounded-3xl p-[1px] will-change-transform transition-shadow duration-300 ${
          isWanted
            ? 'hover:shadow-coven-glow'
            : 'hover:shadow-gold-glow'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          background: `radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${
            isWanted ? 'rgba(123, 44, 191, 0.45)' : 'rgba(197, 160, 89, 0.45)'
          }, transparent 42%), rgba(197, 160, 89, 0.16)`,
        }}
      >
        {/* Inner Card Stone Surface */}
        <div
          className="relative rounded-[23px] bg-obsidian-card w-full h-full flex flex-col justify-between overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top Image Container Styled Like Tour Experience Photography */}
          <div
            ref={imageRef}
            className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-dark will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <CobwebCorner position="top-right" size={44} />

            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              loading="lazy"
            />

            {/* Gradient bottom overlay for seamless contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-card via-obsidian-card/25 to-black/40 pointer-events-none" />

            {/* Favorite Heart Button */}
            <Magnetic strength={0.6} className="absolute top-3.5 right-3.5 z-20">
              <button
                onClick={(e) => onToggleFavorite(item.id, e)}
                className="w-8 h-8 rounded-full bg-obsidian-dark/85 backdrop-blur-md border border-gold-subtle flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-all shadow-md"
                title={isFav ? 'Saved to your relics' : 'Save relic'}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFav ? 'fill-red-500 text-red-500' : 'text-cream/80'
                  }`}
                />
              </button>
            </Magnetic>

            {/* Badges Row */}
            <div
              ref={badgesRef}
              className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-20 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="px-2.5 py-1 rounded-full text-[9px] font-cinzel font-bold uppercase tracking-wider bg-obsidian-dark/95 backdrop-blur-md text-gold border border-gold/30 shadow-sm">
                {item.category}
              </span>
              {renderListingTypePill(item.listing_type)}
            </div>
          </div>

          {/* Card Body & Provenance Details */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Location & Condition Line */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="inline-flex items-center gap-1 text-gold font-medium font-cinzel">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {item.hostel_block}
                </span>
                <span className="text-[10px] font-medium text-lavender-muted px-2 py-0.5 rounded-md bg-white/5 border border-white/5 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-gold" />
                  <span>{item.condition}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-cream group-hover:text-gold transition-colors mb-2 line-clamp-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-lavender-muted line-clamp-2 leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Barter Exchange Terms Box */}
              {item.expected_return && (
                <div
                  className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs mb-4 ${
                    isWanted
                      ? 'bg-coven/15 border-coven/30'
                      : 'bg-obsidian-surface border-gold/15'
                  }`}
                >
                  <Tag
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isWanted ? 'text-coven-light' : 'text-gold'
                    }`}
                  />
                  <span className="text-[11px] text-cream/90 font-medium line-clamp-1">
                    <strong
                      className={
                        isWanted
                          ? 'text-coven-light font-cinzel font-semibold'
                          : 'text-gold font-cinzel font-semibold'
                      }
                    >
                      {isWanted ? 'Offering: ' : 'Wants: '}
                    </strong>
                    {item.expected_return}
                  </span>
                </div>
              )}
            </div>

            {/* Action Button Styled Like Tour Reservation Button */}
            {isWanted ? (
              <button
                onClick={() => onItemChat(item)}
                className="w-full py-2.5 rounded-xl bg-coven/20 border border-coven/40 text-cream group-hover:bg-coven group-hover:text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Handshake className="w-3.5 h-3.5 text-coven-light group-hover:text-white transition-colors" />
                <span>🤝 Fulfill Spell / Claim Karma</span>
              </button>
            ) : (
              <button
                onClick={() => onItemChat(item)}
                className="w-full py-2.5 rounded-xl bg-obsidian-surface border border-gold/30 text-cream group-hover:bg-gradient-to-r group-hover:from-gold group-hover:to-gold-dark group-hover:text-obsidian-dark group-hover:border-gold font-cinzel font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gold group-hover:text-obsidian-dark transition-colors" />
                <span>💬 Book Barter / Chat with Owner</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
