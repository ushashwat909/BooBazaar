export type HostelBlock = 'Block A' | 'Block B' | 'Block C' | 'Block D';

export type ItemCategory = 
  | 'Spell Books'
  | 'Magic Tools'
  | 'Room Charms'
  | 'Enchanted Tech'
  | 'Dorm Treasures'
  | 'Free Potions';

export type ListingType = 'Available' | 'Exchange' | 'Donation' | 'Wanted';

export interface User {
  id: string;
  full_name: string;
  username: string;
  password?: string;
  hostel_block: HostelBlock;
  room_number: string;
  roll_number: string;
  karma_points: number;
  created_at?: string;
}

export interface Item {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  category: ItemCategory;
  listing_type: ListingType;
  condition: string;
  expected_return?: string;
  hostel_block: HostelBlock;
  image_url: string;
  status: 'Open' | 'Claimed';
  created_at?: string;
  owner?: User;
}

export interface Conversation {
  id: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  created_at?: string;
  item?: Item;
  seller?: User;
  buyer?: User;
  last_message?: string;
  last_message_at?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  offer_tag?: 'Counter Offer' | 'Deal Accepted' | 'Snack Trade' | 'Free Claim' | 'System' | 'Pickup' | 'Availability' | string | null;
  created_at?: string;
}
