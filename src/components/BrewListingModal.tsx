import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Item, ItemCategory, ListingType, HostelBlock } from '../types';
import { 
  X, 
  Sparkles, 
  UploadCloud, 
  Image as ImageIcon, 
  Check, 
  ArrowRight, 
  Flame, 
  Scroll, 
  MapPin, 
  Tag, 
  Building2, 
  Loader2 
} from 'lucide-react';
import { CATEGORIES } from './CategoryFilter';
import { uploadItemPhoto } from '../lib/supabase';

interface BrewListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (item: Item) => void;
  defaultMode?: 'offer' | 'request';
}

const PRESET_DEMO_PHOTOS = [
  {
    label: 'Casio Calculator',
    category: 'Magic Tools' as ItemCategory,
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Electric Kettle',
    category: 'Room Charms' as ItemCategory,
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Engineering Math',
    category: 'Spell Books' as ItemCategory,
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Study Desk Lamp',
    category: 'Room Charms' as ItemCategory,
    url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80'
  }
];

export const BrewListingModal: React.FC<BrewListingModalProps> = ({
  isOpen,
  onClose,
  onItemAdded,
  defaultMode = 'offer',
}) => {
  const { currentUser, openAuthModal } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Top Toggle: Offer vs Request
  const [listingMode, setListingMode] = useState<'offer' | 'request'>(defaultMode);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Spell Books');
  const [listingType, setListingType] = useState<ListingType>('Available');
  const [condition, setCondition] = useState('Good condition');
  const [expectedReturn, setExpectedReturn] = useState('');
  
  // Image handling
  const [imageUrl, setImageUrl] = useState(PRESET_DEMO_PHOTOS[0].url);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'preset' | 'url'>('preset');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync mode changes
  useEffect(() => {
    if (listingMode === 'request') {
      setListingType('Wanted');
      if (!expectedReturn) {
        setExpectedReturn('Willing to pay ₹150 or trade snacks');
      }
    } else {
      if (listingType === 'Wanted') {
        setListingType('Available');
      }
      if (!expectedReturn) {
        setExpectedReturn('Swap for Semester Notes or 2x Maggi');
      }
    }
  }, [listingMode]);

  if (!isOpen) return null;

  // File Upload Dropzone Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');
    setUploadedFileName(file.name);

    try {
      const publicUrl = await uploadItemPhoto(file);
      setImageUrl(publicUrl);
    } catch (err) {
      console.error('File upload error:', err);
      setErrorMsg('Could not upload image. You can pick a preset photo or enter a URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please provide an item title.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newItem: Item = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      owner_id: currentUser.id,
      title: title.trim(),
      description: description.trim() || (listingMode === 'request' ? 'Wanted by student.' : 'Available in pantry.'),
      category,
      listing_type: listingType,
      condition,
      expected_return: expectedReturn.trim() || (listingType === 'Donation' ? 'Free Donation' : 'Open to barter'),
      hostel_block: currentUser.hostel_block,
      image_url: imageUrl || PRESET_DEMO_PHOTOS[0].url,
      status: 'Open',
      created_at: new Date().toISOString(),
      owner: currentUser,
    };

    onItemAdded(newItem);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-dark/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-obsidian-card border border-pumpkin/30 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-lavender-muted hover:text-cream transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-coven to-pumpkin border border-pumpkin/30 flex items-center justify-center shadow-potion-glow shrink-0">
            {listingMode === 'offer' ? (
              <Sparkles className="w-6 h-6 text-obsidian-dark fill-obsidian-dark" />
            ) : (
              <Scroll className="w-6 h-6 text-obsidian-dark" />
            )}
          </div>
          <div>
            <h2 className="font-editorial text-2xl font-bold text-cream">
              {listingMode === 'offer' ? 'Brew a Listing (Offer Item)' : 'Cast a Seeking Spell (Request Item)'}
            </h2>
            <p className="text-xs text-lavender-muted">
              {listingMode === 'offer'
                ? 'Place an item onto your hostel wing pantry shelf'
                : 'Broadcast an item you need to students across your campus wing'}
            </p>
          </div>
        </div>

        {/* Top Mode Toggle: Offer vs Request */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-obsidian-surface border border-pumpkin/20 mb-6">
          <button
            type="button"
            onClick={() => setListingMode('offer')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              listingMode === 'offer'
                ? 'bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark shadow-potion-glow'
                : 'text-lavender-muted hover:text-cream'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Offer an Item (Pantry Shelf)</span>
          </button>
          <button
            type="button"
            onClick={() => setListingMode('request')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              listingMode === 'request'
                ? 'bg-gradient-to-r from-coven to-coven-light text-cream shadow-coven-glow'
                : 'text-lavender-muted hover:text-cream'
            }`}
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>Request an Item (Seeking Spells)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Auto-filled User Identity Bar */}
        {currentUser && (
          <div className="mb-5 p-3 rounded-2xl bg-obsidian-surface border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-pumpkin/20 text-pumpkin flex items-center justify-center font-bold text-[10px]">
                {currentUser.full_name[0]}
              </div>
              <span className="font-semibold text-cream">{currentUser.full_name}</span>
            </div>
            <div className="flex items-center gap-2 text-lavender-muted text-[11px]">
              <span className="text-potion-emerald font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {currentUser.hostel_block} • Room {currentUser.room_number}
              </span>
              <span>• Roll: {currentUser.roll_number}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Item Title */}
          <div>
            <label className="block text-xs font-semibold text-lavender-muted mb-1.5">
              {listingMode === 'offer' ? 'Item Title *' : 'What Item Are You Seeking? *'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={listingMode === 'offer' ? "e.g. Casio fx-991EX Calculator or Electric Kettle 1.5L" : "e.g. Mini-Drafter with clips for ED exam"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-pumpkin focus:ring-1 focus:ring-pumpkin"
              required
            />
          </div>

          {/* Category & Listing Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-lavender-muted mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream focus:outline-none focus:border-pumpkin cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-lavender-muted mb-1.5">
                Listing Type
              </label>
              {listingMode === 'request' ? (
                <div className="w-full px-3 py-2.5 rounded-xl bg-obsidian-surface border border-coven/30 text-xs text-coven-light font-bold flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5" />
                  <span>Seeking Spell (Wanted)</span>
                </div>
              ) : (
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value as ListingType)}
                  className="w-full px-3 py-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream focus:outline-none focus:border-pumpkin cursor-pointer"
                >
                  <option value="Available">Available (Direct Claim)</option>
                  <option value="Exchange">Exchange (Barter / Swap)</option>
                  <option value="Donation">Donation (100% Free)</option>
                </select>
              )}
            </div>
          </div>

          {/* Condition & Expected Return */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-lavender-muted mb-1.5">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream focus:outline-none focus:border-pumpkin cursor-pointer"
              >
                <option value="Like New">Like New</option>
                <option value="Good condition">Good condition</option>
                <option value="Fully working">Fully working</option>
                <option value="2nd Year">2nd Year / Used</option>
                <option value="Any condition">Any condition (For Wanted)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-lavender-muted mb-1.5">
                {listingMode === 'offer' ? 'What do you want in return?' : 'What can you offer in exchange?'}
              </label>
              <input
                type="text"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                placeholder="e.g. Swap for Drafter, ₹150, or 3 Maggi packs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-pumpkin"
              />
            </div>
          </div>

          {/* Photo Upload Dropzone & Preset Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-lavender-muted">
                Item Photo (Dropzone & 4 Fast Presets)
              </label>
              <div className="flex items-center gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setUploadMethod('preset')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    uploadMethod === 'preset' ? 'bg-pumpkin text-obsidian-dark' : 'text-lavender-muted hover:text-cream'
                  }`}
                >
                  4 Presets
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('upload')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    uploadMethod === 'upload' ? 'bg-pumpkin text-obsidian-dark' : 'text-lavender-muted hover:text-cream'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    uploadMethod === 'url' ? 'bg-pumpkin text-obsidian-dark' : 'text-lavender-muted hover:text-cream'
                  }`}
                >
                  URL
                </button>
              </div>
            </div>

            {/* Sub-view: 4 Fast Presets */}
            {uploadMethod === 'preset' && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {PRESET_DEMO_PHOTOS.map((p, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => {
                      setImageUrl(p.url);
                      setCategory(p.category);
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                      imageUrl === p.url
                        ? 'border-pumpkin scale-105 shadow-potion-glow'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] text-center text-white truncate py-0.5">
                      {p.label}
                    </span>
                    {imageUrl === p.url && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-pumpkin text-obsidian flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Sub-view: Upload File Dropzone */}
            {uploadMethod === 'upload' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-pumpkin/30 hover:border-pumpkin rounded-2xl p-4 text-center cursor-pointer bg-obsidian-surface/60 hover:bg-obsidian-surface transition-all flex flex-col items-center justify-center space-y-2 mb-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-xl bg-pumpkin/15 text-pumpkin flex items-center justify-center">
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-cream">
                    {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Click to select or drag photo here'}
                  </p>
                  <p className="text-[10px] text-lavender-muted">
                    Uploads directly to Supabase Storage (`item-photos` bucket)
                  </p>
                </div>
              </div>
            )}

            {/* Sub-view: URL Input */}
            {uploadMethod === 'url' && (
              <div className="mb-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream focus:outline-none focus:border-pumpkin"
                />
              </div>
            )}

            {/* Live Image Preview Thumbnail */}
            {imageUrl && (
              <div className="flex items-center gap-3 p-2 rounded-xl bg-obsidian-surface/60 border border-white/5">
                <img src={imageUrl} alt="Preview" className="w-12 h-10 object-cover rounded-lg border border-pumpkin/30" />
                <span className="text-[11px] text-lavender-muted truncate flex-1">
                  Active Photo: <strong className="text-cream">{imageUrl.substring(0, 42)}...</strong>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-potion-emerald/15 text-potion-emerald font-semibold">
                  Ready
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-lavender-muted mb-1.5">
              Additional Details / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Mention hostel room pickup timing, working condition, or negotiable trade options..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-surface border border-pumpkin/20 text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-pumpkin"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-potion-glow transition-all flex items-center justify-center gap-2 ${
              listingMode === 'offer'
                ? 'bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark hover:scale-[1.01]'
                : 'bg-gradient-to-r from-coven to-coven-light text-cream shadow-coven-glow hover:scale-[1.01]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Brewing into Supabase...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>
                  {listingMode === 'offer' ? 'Publish to Hostel Pantry' : 'Post Seeking Spell'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
