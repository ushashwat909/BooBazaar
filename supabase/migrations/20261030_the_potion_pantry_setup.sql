-- ==============================================================================
-- THE POTION PANTRY – Hostel Essentials Exchange
-- Complete Schema, Realtime, Storage Bucket & Seed Data
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CREATE TABLES
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  username text UNIQUE NOT NULL,
  password text NOT NULL, -- plain text for dummy auth
  hostel_block text NOT NULL, -- e.g., 'Block A', 'Block B', 'Block C', 'Block D'
  room_number text NOT NULL,
  roll_number text NOT NULL,
  karma_points int DEFAULT 50,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL, -- 'Spell Books', 'Magic Tools', 'Room Charms', 'Enchanted Tech', 'Dorm Treasures', 'Free Potions'
  listing_type text NOT NULL, -- 'Available', 'Exchange', 'Donation', 'Wanted'
  condition text NOT NULL, -- e.g., '2nd Year', 'Good condition', 'Fully working', 'Used, good condition', 'Sturdy and comfortable', 'Set of 5'
  expected_return text, -- e.g., 'Swap for Semester 4 Notes or 2x Maggi packs', 'Free to juniors'
  hostel_block text NOT NULL,
  image_url text NOT NULL,
  status text DEFAULT 'Open', -- 'Open' or 'Claimed'
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES public.items(id) ON DELETE CASCADE,
  buyer_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  seller_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  offer_tag text, -- optional badge like 'Counter Offer', 'Deal Accepted'
  created_at timestamptz DEFAULT now()
);

-- 3. FOREIGN KEY INDEXES (Performance Optimization)
CREATE INDEX IF NOT EXISTS idx_items_owner_id ON public.items(owner_id);
CREATE INDEX IF NOT EXISTS idx_items_status ON public.items(status);
CREATE INDEX IF NOT EXISTS idx_items_category ON public.items(category);
CREATE INDEX IF NOT EXISTS idx_conversations_item_id ON public.conversations(item_id);
CREATE INDEX IF NOT EXISTS idx_conversations_buyer_id ON public.conversations(buyer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_seller_id ON public.conversations(seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);

-- 4. ROW LEVEL SECURITY (Permissive for Hackathon Demo / PostgREST Access)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;

-- Grant access to public PostgREST roles
GRANT ALL ON TABLE public.users TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.items TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.conversations TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.messages TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 5. SUPABASE REALTIME CONFIGURATION
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.items REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'items'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.items;
  END IF;
END $$;

-- 6. SUPABASE STORAGE BUCKET (item-photos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'item-photos', 
  'item-photos', 
  true, 
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE 
SET public = true;

-- Storage RLS policies for item-photos
DROP POLICY IF EXISTS "Public Access Item Photos" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Item Photos" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Item Photos" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Item Photos" ON storage.objects;

CREATE POLICY "Public Access Item Photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'item-photos');

CREATE POLICY "Public Upload Item Photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'item-photos');

CREATE POLICY "Public Update Item Photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'item-photos');

CREATE POLICY "Public Delete Item Photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'item-photos');

-- 7. SEED DATA
-- Insert 2 Dummy Users
INSERT INTO public.users (id, full_name, username, password, hostel_block, room_number, roll_number, karma_points)
VALUES 
  (
    'a1111111-1111-1111-1111-111111111111',
    'Aarav Sharma',
    'aarav',
    'aarav123',
    'Block B',
    '204',
    '22CS045',
    80
  ),
  (
    'b2222222-2222-2222-2222-222222222222',
    'Meera Nair',
    'meera',
    'meera123',
    'Block C',
    '112',
    '23EC018',
    65
  )
ON CONFLICT (username) DO NOTHING;

-- Insert 6 Initial Items matching Homepage Design
INSERT INTO public.items (id, owner_id, title, description, category, listing_type, condition, expected_return, hostel_block, image_url, status)
VALUES
  (
    'c3333333-3333-3333-3333-333333333331',
    'a1111111-1111-1111-1111-111111111111',
    'Engineering Mathematics',
    'Comprehensive textbook covering differential calculus, linear algebra, and complex numbers. Crisp pages with helpful highlighted theorems and formula sheet.',
    'Spell Books',
    'Available',
    '2nd Year',
    'Swap for Semester 4 Notes or 2x Maggi packs',
    'Block B',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'Open'
  ),
  (
    'c3333333-3333-3333-3333-333333333332',
    'b2222222-2222-2222-2222-222222222222',
    'Wireless Headphones',
    'Over-ear noise isolating Bluetooth headphones. Great battery life (20+ hours) and deep bass. Ideal for exam week focus.',
    'Enchanted Tech',
    'Available',
    'Good condition',
    'Open to trades or study snacks',
    'Block C',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'Open'
  ),
  (
    'c3333333-3333-3333-3333-333333333333',
    'a1111111-1111-1111-1111-111111111111',
    'Study Lamp',
    'Flexible gooseneck LED desk lamp with 3 color warmth modes and soft touch dimmer. Gentle on eyes during late-night cram sessions.',
    'Room Charms',
    'Donation',
    'Fully working',
    'Free to juniors',
    'Block A',
    'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80',
    'Open'
  ),
  (
    'c3333333-3333-3333-3333-333333333334',
    'b2222222-2222-2222-2222-222222222222',
    'Scientific Calculator',
    'Scientific calculator approved for university exams. Features matrix calculations, vector arithmetic, and statistical analysis.',
    'Magic Tools',
    'Available',
    'Used, good condition',
    'Swap for Casio fx-991EX or coffee coupons',
    'Block D',
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    'Open'
  ),
  (
    'c3333333-3333-3333-3333-333333333335',
    'a1111111-1111-1111-1111-111111111111',
    'Study Chair',
    'Ergonomic breathable mesh chair with cushioned seat and smooth rolling caster wheels. Helps maintain great posture through long study nights.',
    'Dorm Treasures',
    'Exchange',
    'Sturdy and comfortable',
    'Exchange for an ergonomic cushion or table fan',
    'Block B',
    'https://images.unsplash.com/photo-1580481077195-c22ae2b3326f?auto=format&fit=crop&w=800&q=80',
    'Open'
  ),
  (
    'c3333333-3333-3333-3333-333333333336',
    'b2222222-2222-2222-2222-222222222222',
    'Fiction Novels',
    'Curated set of 5 page-turner novels (mystery, thriller, and sci-fi classics). Perfect weekend leisure read between assignments.',
    'Spell Books',
    'Available',
    'Set of 5',
    'Looking for Sci-Fi or fantasy series',
    'Block C',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    'Open'
  )
ON CONFLICT (id) DO NOTHING;

