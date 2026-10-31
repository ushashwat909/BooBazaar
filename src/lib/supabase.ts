import { createClient } from '@supabase/supabase-js';
import { Item, User, Conversation, Message } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ohxedaoaarwrzqrkhnqz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initial Seed Users matching the hackathon prompt
export const INITIAL_USERS: User[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    full_name: 'Aarav Sharma',
    username: 'aarav',
    password: 'password123',
    hostel_block: 'Block B',
    room_number: '204',
    roll_number: '22CS045',
    karma_points: 80,
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    full_name: 'Meera Nair',
    username: 'meera',
    password: 'password123',
    hostel_block: 'Block C',
    room_number: '112',
    roll_number: '23EC018',
    karma_points: 65,
  },
];

// Initial Seed Items with authentic spooky hostel lore
export const INITIAL_ITEMS: Item[] = [
  {
    id: 'c3333333-3333-3333-3333-333333333331',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Engineering Mathematics (Grimoire of Calculus 3)',
    description: 'Comprehensive textbook with all highlighted formulas and summary cheat sheets. Guaranteed to help you survive university end-sems.',
    category: 'Spell Books',
    listing_type: 'Available',
    condition: '2nd Year Battle-Tested',
    expected_return: 'Swap for Sem 4 Notes or 2x Maggi packs',
    hostel_block: 'Block B',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333332',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Wireless Noise-Isolating Headphones',
    description: 'Over-ear Bluetooth headphones with 25-hour battery life. Blocks all roommate snoring and late-night wing noise during cram week.',
    category: 'Enchanted Tech',
    listing_type: 'Available',
    condition: 'Fully working',
    expected_return: 'Open to trades or study snacks',
    hostel_block: 'Block C',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    owner: INITIAL_USERS[1],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Spectral Night Study Lamp',
    description: 'Gooseneck LED desk lamp with 3 color temperatures. Perfect for midnight study sessions when your roommate demands dark mode.',
    category: 'Room Charms',
    listing_type: 'Donation',
    condition: 'Ensorcelled Glow',
    expected_return: 'Free offering to freshers',
    hostel_block: 'Block A',
    image_url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 7).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333334',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Casio fx-991EX Classwiz (Cursed by Engineering)',
    description: 'The legendary calculator that solved 4 batches of linear algebra and matrix inversions. 100% exam hall compliant with solar backup.',
    category: 'Magic Tools',
    listing_type: 'Available',
    condition: 'Passed 4 Batches',
    expected_return: 'Swap for drawing drafter or canteen coffee',
    hostel_block: 'Block D',
    image_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    owner: INITIAL_USERS[1],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333335',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Midnight Electric Kettle 1.5L (Banned by Warden)',
    description: 'Stainless steel instant water boiler. The absolute lifeblood of hostel life: boils water for tea, coffee, and 3 AM Maggi in 90 seconds.',
    category: 'Enchanted Tech',
    listing_type: 'Exchange',
    condition: 'Clean & fully working',
    expected_return: 'Exchange for an ergonomic chair or table fan',
    hostel_block: 'Block B',
    image_url: 'https://images.unsplash.com/photo-1580481077195-c22ae2b3326f?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333336',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Classic Horror & Sci-Fi Novels (Bundle of 5)',
    description: 'Five spine-chilling page-turners (Lovecraft, Stephen King, and gothic thrillers). Ideal for windy dormitory nights when hostel WiFi dies.',
    category: 'Spell Books',
    listing_type: 'Available',
    condition: 'Set of 5 paperbacks',
    expected_return: 'Looking for fantasy series or manga',
    hostel_block: 'Block C',
    image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    owner: INITIAL_USERS[1],
  },
  {
    id: 'w4444444-4444-4444-4444-444444444441',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Urgent: Engineering Drafter for ED Midterms',
    description: 'Need a working mini-drafter with tight knobs for tomorrow morning ED exam. Will return with gratitude or snack barter!',
    category: 'Magic Tools',
    listing_type: 'Wanted',
    condition: 'Working condition',
    expected_return: 'Will trade 2 packs of Cadbury Silk or ₹150 canteen credit',
    hostel_block: 'Block B',
    image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 30).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'w4444444-4444-4444-4444-444444444442',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Operating Systems Handwritten Notes (Unit 3-5)',
    description: 'Seeking neat handwritten notes for CPU Scheduling, Deadlocks, and Paging. Willing to barter with full DBMS question bank!',
    category: 'Spell Books',
    listing_type: 'Wanted',
    condition: 'Legible handwriting',
    expected_return: 'Will share full DBMS question bank + treat to cold coffee',
    hostel_block: 'Block C',
    image_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    owner: INITIAL_USERS[1],
  },
];

// Initial Seed Conversations
export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-111',
    item_id: 'c3333333-3333-3333-3333-333333333331',
    buyer_id: 'b2222222-2222-2222-2222-222222222222',
    seller_id: 'a1111111-1111-1111-1111-111111111111',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    item: INITIAL_ITEMS[0],
    seller: INITIAL_USERS[0],
    buyer: INITIAL_USERS[1],
    last_message: 'Deal! 2 Maggi packets or semester notes work great.',
    last_message_at: '20 mins ago',
  },
  {
    id: 'conv-222',
    item_id: 'c3333333-3333-3333-3333-333333333332',
    buyer_id: 'a1111111-1111-1111-1111-111111111111',
    seller_id: 'b2222222-2222-2222-2222-222222222222',
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    item: INITIAL_ITEMS[1],
    seller: INITIAL_USERS[1],
    buyer: INITIAL_USERS[0],
    last_message: 'Hey, are these headphones still available for swap?',
    last_message_at: '45 mins ago',
  },
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-111': [
    {
      id: 'msg-1',
      conversation_id: 'conv-111',
      sender_id: 'b2222222-2222-2222-2222-222222222222',
      content: 'Hey Aarav! Saw your Engineering Mathematics book. Does it include the Unit 4 Laplace transform formulas?',
      offer_tag: 'Availability',
      created_at: new Date(Date.now() - 1000 * 60 * 25).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      id: 'msg-2',
      conversation_id: 'conv-111',
      sender_id: 'a1111111-1111-1111-1111-111111111111',
      content: 'Yes Meera! It has all highlighted theorem summaries and handwritten formula bookmarks glued inside.',
      offer_tag: null,
      created_at: new Date(Date.now() - 1000 * 60 * 20).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      id: 'msg-3',
      conversation_id: 'conv-111',
      sender_id: 'b2222222-2222-2222-2222-222222222222',
      content: 'Awesome! Can I trade you 2x spicy Maggi packs + Nescafe pouch for it?',
      offer_tag: 'Snack Trade',
      created_at: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      id: 'msg-4',
      conversation_id: 'conv-111',
      sender_id: 'a1111111-1111-1111-1111-111111111111',
      content: 'Deal sealed! Come up to Block B Room 204 anytime before 11 PM or meet by the common room water cooler.',
      offer_tag: 'Deal Accepted',
      created_at: new Date(Date.now() - 1000 * 60 * 10).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ],
  'conv-222': [
    {
      id: 'msg-201',
      conversation_id: 'conv-222',
      sender_id: 'a1111111-1111-1111-1111-111111111111',
      content: 'Hey Meera, are those noise-isolating headphones still available for barter?',
      offer_tag: 'Availability',
      created_at: new Date(Date.now() - 1000 * 60 * 40).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      id: 'msg-202',
      conversation_id: 'conv-222',
      sender_id: 'b2222222-2222-2222-2222-222222222222',
      content: 'Yes Aarav! Battery is 100% healthy. What are you open to trading?',
      offer_tag: 'Counter Offer',
      created_at: new Date(Date.now() - 1000 * 60 * 35).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ],
};

// Helper: Upload photo to Supabase storage bucket `item-photos`
export const uploadItemPhoto = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `items/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('item-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.warn('Storage upload error (fallback to local object URL):', uploadError);
      return URL.createObjectURL(file);
    }

    const { data } = supabase.storage
      .from('item-photos')
      .getPublicUrl(filePath);

    return data.publicUrl || URL.createObjectURL(file);
  } catch (err) {
    console.warn('Storage upload fallback triggered:', err);
    return URL.createObjectURL(file);
  }
};
