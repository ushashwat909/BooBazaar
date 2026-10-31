import { createClient } from '@supabase/supabase-js';
import { Item, User } from '../types';

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
  }
];

// Initial Seed Items matching the homepage prompt & unsplash photos
export const INITIAL_ITEMS: Item[] = [
  {
    id: 'c3333333-3333-3333-3333-333333333331',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Engineering Mathematics',
    description: 'Comprehensive textbook covering differential calculus, linear algebra, and complex numbers. Crisp pages with highlighted formulas and summary sheets.',
    category: 'Spell Books',
    listing_type: 'Available',
    condition: '2nd Year',
    expected_return: 'Swap for Semester 4 Notes or 2x Maggi packs',
    hostel_block: 'Block B',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333332',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Wireless Headphones',
    description: 'Over-ear noise isolating Bluetooth headphones. 25-hour battery life and deep bass. Ideal for exam-week deep focus in noisy hostel rooms.',
    category: 'Enchanted Tech',
    listing_type: 'Available',
    condition: 'Good condition',
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
    title: 'Study Lamp',
    description: 'Flexible gooseneck LED desk lamp with 3 color temperatures and soft touch dimmer. Gentle on eyes during late-night cram sessions.',
    category: 'Room Charms',
    listing_type: 'Donation',
    condition: 'Fully working',
    expected_return: 'Free to juniors',
    hostel_block: 'Block A',
    image_url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 7).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333334',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Scientific Calculator',
    description: 'Scientific calculator approved for university exams. Features matrix calculations, vector arithmetic, and statistical formulas.',
    category: 'Magic Tools',
    listing_type: 'Available',
    condition: 'Used, good condition',
    expected_return: 'Swap for Casio fx-991EX or coffee coupons',
    hostel_block: 'Block D',
    image_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    owner: INITIAL_USERS[1],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333335',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Study Chair',
    description: 'Ergonomic breathable mesh chair with cushioned seat and smooth rolling caster wheels. Helps posture through long project nights.',
    category: 'Dorm Treasures',
    listing_type: 'Exchange',
    condition: 'Sturdy and comfortable',
    expected_return: 'Exchange for an ergonomic cushion or table fan',
    hostel_block: 'Block B',
    image_url: 'https://images.unsplash.com/photo-1580481077195-c22ae2b3326f?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    owner: INITIAL_USERS[0],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333336',
    owner_id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Fiction Novels',
    description: 'Curated set of 5 page-turner novels (mystery, thriller, and sci-fi classics). Perfect weekend leisure read between assignments.',
    category: 'Spell Books',
    listing_type: 'Available',
    condition: 'Set of 5',
    expected_return: 'Looking for Sci-Fi or fantasy series',
    hostel_block: 'Block C',
    image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    owner: INITIAL_USERS[1],
  },
  // Seeking Spells (Wanted Requests by Students)
  {
    id: 'w4444444-4444-4444-4444-444444444441',
    owner_id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Urgent: Engineering Drawing Drafter & Clips',
    description: 'Need a working mini-drafter for ED midterms next week. Any brand is fine as long as the scales rotate properly.',
    category: 'Magic Tools',
    listing_type: 'Wanted',
    condition: 'Fully working',
    expected_return: 'Will pay ₹150 or trade 2 packs of Cadbury Silk',
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
    description: 'Looking for neat handwritten notes or summary booklet for OS concepts (CPU Scheduling, Deadlocks, Memory Management).',
    category: 'Spell Books',
    listing_type: 'Wanted',
    condition: 'Legible handwriting',
    expected_return: 'Will share full DBMS SQL question bank or treat to canteen cold coffee',
    hostel_block: 'Block C',
    image_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    owner: INITIAL_USERS[1],
  }
];

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
        upsert: false
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
