import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Item, Conversation, Message, User } from '../types';
import { 
  X, 
  Send, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Package, 
  Handshake, 
  Coffee, 
  Repeat, 
  HelpCircle, 
  Flame, 
  ArrowRight,
  Award,
  Check
} from 'lucide-react';
import { supabase, INITIAL_USERS, INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from '../lib/supabase';

export interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem?: Item | null;
  activeConversationId?: string | null;
  onItemClaimed?: (itemId: string) => void;
}

const QUICK_BARGAIN_CHIPS = [
  { label: '🔄 Swap for another item?', tag: 'Counter Offer' as const },
  { label: '🍜 Trade for 2x Maggi + Coffee?', tag: 'Snack Trade' as const },
  { label: '🏃 Can pick up from your block now!', tag: 'Pickup' as const },
  { label: '🤝 Is this still available?', tag: 'Availability' as const },
];

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  targetItem,
  activeConversationId,
  onItemClaimed,
}) => {
  const { currentUser, openAuthModal } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active state
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversationsList, setConversationsList] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('potion_pantry_conversations');
      return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [dealSealed, setDealSealed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCelebration]);

  // Find or Create Conversation when targetItem or activeConversationId changes
  useEffect(() => {
    if (!isOpen || !currentUser) return;

    const initConversation = async () => {
      let activeConv: Conversation | null = null;

      // 1. If an active conversation ID was passed
      if (activeConversationId) {
        const found = conversationsList.find(c => c.id === activeConversationId);
        if (found) activeConv = found;
      }

      // 2. If an item was clicked
      if (!activeConv && targetItem) {
        const isOwner = currentUser.id === targetItem.owner_id;
        const buyerId = isOwner ? (targetItem.owner_id === INITIAL_USERS[0].id ? INITIAL_USERS[1].id : INITIAL_USERS[0].id) : currentUser.id;
        const sellerId = targetItem.owner_id;

        const existing = conversationsList.find(c => c.item_id === targetItem.id && (c.buyer_id === buyerId || c.seller_id === sellerId));

        if (existing) {
          activeConv = existing;
        } else {
          const newConvId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
          const sellerObj = INITIAL_USERS.find(u => u.id === sellerId) || targetItem.owner || currentUser;
          const buyerObj = currentUser;

          const newConv: Conversation = {
            id: newConvId,
            item_id: targetItem.id,
            buyer_id: buyerId,
            seller_id: sellerId,
            created_at: new Date().toISOString(),
            item: targetItem,
            seller: sellerObj,
            buyer: buyerObj,
            last_message: 'Started new bargain inquiry',
            last_message_at: 'Just now'
          };

          activeConv = newConv;
          const updatedList = [newConv, ...conversationsList];
          setConversationsList(updatedList);
          localStorage.setItem('potion_pantry_conversations', JSON.stringify(updatedList));

          try {
            await supabase.from('conversations').insert([{
              item_id: targetItem.id,
              buyer_id: buyerId,
              seller_id: sellerId
            }]);
          } catch {
            // Local fallback
          }
        }
      }

      if (!activeConv && conversationsList.length > 0) {
        activeConv = conversationsList[0];
      }

      if (activeConv) {
        setConversation(activeConv);
        setDealSealed(activeConv.item?.status === 'Claimed');
        loadMessages(activeConv.id, activeConv);
      }
    };

    initConversation();
  }, [isOpen, targetItem, activeConversationId, currentUser]);

  // Load Messages from Storage / Supabase
  const loadMessages = async (convId: string, convObj: Conversation) => {
    let initialMsgs: Message[] = [];

    try {
      const stored = localStorage.getItem(`messages_${convId}`);
      if (stored) {
        initialMsgs = JSON.parse(stored);
      } else if (INITIAL_MESSAGES[convId]) {
        initialMsgs = INITIAL_MESSAGES[convId];
      } else {
        initialMsgs = [
          {
            id: `msg-welcome-${Date.now()}`,
            conversation_id: convId,
            sender_id: convObj.seller_id,
            content: `Hey! Thanks for inquiring about "${convObj.item?.title || 'this item'}". I'm in ${convObj.item?.hostel_block || 'hostel'}. What do you propose to swap?`,
            offer_tag: 'Availability',
            created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      }
    } catch {
      initialMsgs = INITIAL_MESSAGES['conv-111'] || [];
    }

    setMessages(initialMsgs);

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (data && data.length > 0 && !error) {
        setMessages(data);
      }
    } catch {
      // Local fallback active
    }
  };

  // Real-time Supabase Subscription
  useEffect(() => {
    if (!conversation?.id) return;

    const channel = supabase
      .channel(`conversation-${conversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.id]);

  if (!isOpen) return null;

  const otherUser: User = conversation?.seller_id === currentUser?.id 
    ? (conversation?.buyer || INITIAL_USERS[1])
    : (conversation?.seller || INITIAL_USERS[0]);

  const activeItem = conversation?.item || targetItem;

  // Send Message Function
  const handleSendMessage = async (contentToSend: string, tag?: Message['offer_tag']) => {
    if (!contentToSend.trim() || !conversation || !currentUser) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      conversation_id: conversation.id,
      sender_id: currentUser.id,
      content: contentToSend.trim(),
      offer_tag: tag || null,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputText('');
    localStorage.setItem(`messages_${conversation.id}`, JSON.stringify(updated));

    try {
      await supabase.from('messages').insert([{
        conversation_id: conversation.id,
        sender_id: currentUser.id,
        content: newMsg.content,
        offer_tag: newMsg.offer_tag
      }]);
    } catch {
      // Offline fallback
    }

    if (otherUser && (otherUser.username === 'aarav' || otherUser.username === 'meera')) {
      setTimeout(() => {
        let reply = "Sounds great! Let's do this exchange.";
        let replyTag: Message['offer_tag'] = 'Deal Accepted';

        if (contentToSend.includes('Maggi') || tag === 'Snack Trade') {
          reply = `Yum! 2 Maggi packs + coffee are a deal! Come up to ${otherUser.hostel_block} Room ${otherUser.room_number}.`;
        } else if (tag === 'Pickup') {
          reply = `Awesome, I am in my room right now (${otherUser.room_number}). Buzz me when you are at the wing gate!`;
          replyTag = 'Pickup';
        } else if (tag === 'Counter Offer') {
          reply = `Sure, what notes or items do you have from 2nd year? I am open to bartering.`;
          replyTag = 'Counter Offer';
        } else {
          reply = `Yes, it's 100% available! When can you drop by ${otherUser.hostel_block}?`;
          replyTag = 'Availability';
        }

        const autoReply: Message = {
          id: `reply-${Date.now()}`,
          conversation_id: conversation.id,
          sender_id: otherUser.id,
          content: reply,
          offer_tag: replyTag,
          created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(p => {
          const next = [...p, autoReply];
          localStorage.setItem(`messages_${conversation.id}`, JSON.stringify(next));
          return next;
        });
      }, 1100);
    }
  };

  // "Seal the Deal" / Mark as Exchanged Action
  const handleSealDeal = async () => {
    if (!conversation || !activeItem) return;

    setDealSealed(true);
    setShowCelebration(true);

    const celebrationMsg: Message = {
      id: `sys-${Date.now()}`,
      conversation_id: conversation.id,
      sender_id: 'system',
      content: `🎉 DEAL SEALED! "${activeItem.title}" has been exchanged. Both ${currentUser?.full_name} and ${otherUser.full_name} earned +25 Karma Points! ✨`,
      offer_tag: 'System',
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextMsgs = [...messages, celebrationMsg];
    setMessages(nextMsgs);
    localStorage.setItem(`messages_${conversation.id}`, JSON.stringify(nextMsgs));

    if (currentUser) {
      currentUser.karma_points += 25;
      localStorage.setItem('potion_pantry_current_user', JSON.stringify(currentUser));
    }
    otherUser.karma_points += 25;

    if (onItemClaimed) {
      onItemClaimed(activeItem.id);
    }

    try {
      await supabase.from('items').update({ status: 'Claimed' }).eq('id', activeItem.id);
      await supabase.from('messages').insert([{
        conversation_id: conversation.id,
        sender_id: currentUser?.id,
        content: celebrationMsg.content,
        offer_tag: 'System'
      }]);
    } catch {
      // Local fallback
    }

    setTimeout(() => setShowCelebration(false), 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-obsidian-dark/75 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Slide-over Drawer Canvas */}
      <div 
        className="relative w-full max-w-xl h-full bg-obsidian-card border-l border-pumpkin/30 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pumpkin/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-coven/20 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HEADER */}
        <div className="p-4 sm:p-5 bg-obsidian-surface border-b border-pumpkin/20 relative z-10 space-y-3">
          
          <div className="flex items-center justify-between">
            {/* Student & Verification Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coven to-pumpkin flex items-center justify-center font-bold text-white text-sm shadow-potion-glow">
                {otherUser.full_name[0]}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-cream">
                    {otherUser.full_name}
                  </h3>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-potion-emerald/15 text-potion-emerald border border-potion-emerald/30 text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-lavender-muted flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-pumpkin" />
                  <span>{otherUser.hostel_block}, Room {otherUser.room_number}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-pumpkin font-semibold">{otherUser.karma_points} Karma</span>
                </p>
              </div>
            </div>

            {/* Actions: Close Drawer & Seal Deal */}
            <div className="flex items-center gap-2">
              {dealSealed ? (
                <span className="px-3 py-1.5 rounded-xl bg-potion-emerald/15 text-potion-emerald border border-potion-emerald/30 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Deal Sealed</span>
                </span>
              ) : (
                <button
                  onClick={handleSealDeal}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pumpkin to-pumpkin-dark hover:scale-105 active:scale-95 text-obsidian-dark font-extrabold text-xs uppercase tracking-wider shadow-potion-glow transition-all flex items-center gap-1.5"
                  title="Mark this item as exchanged and award +25 Karma points to both students!"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-obsidian-dark" />
                  <span>Mark Exchanged</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-lavender-muted hover:text-cream transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Item Context Strip */}
          {activeItem && (
            <div className="p-3 rounded-2xl bg-obsidian-dark/70 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={activeItem.image_url}
                  alt={activeItem.title}
                  className="w-12 h-12 rounded-xl object-cover border border-pumpkin/30 shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cream truncate">
                      {activeItem.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-pumpkin/15 text-pumpkin border border-pumpkin/30 shrink-0">
                      {activeItem.listing_type}
                    </span>
                  </div>
                  <p className="text-[11px] text-lavender-muted truncate mt-0.5">
                    Wants: <strong className="text-potion-emerald">{activeItem.expected_return || 'Open to barter'}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                  dealSealed ? 'bg-potion-emerald/20 text-potion-emerald' : 'bg-coven/20 text-coven-light border border-coven/30'
                }`}>
                  {dealSealed ? 'Claimed' : 'Open Bargain'}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* REAL-TIME MESSAGE FEED */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-obsidian-dark/50 relative">
          
          <div className="text-center my-1">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-lavender-muted inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-pumpkin" />
              <span>Real-Time 1-on-1 Coven Bargaining • Zero Cash Required</span>
            </span>
          </div>

          {showCelebration && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-potion-emerald/20 via-coven/30 to-pumpkin/20 border border-potion-emerald/40 text-center space-y-1 shadow-emerald-glow animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-potion-emerald text-obsidian mx-auto mb-1 font-bold">
                🎉
              </div>
              <h4 className="font-editorial text-base font-bold text-cream">
                Deal Successfully Sealed!
              </h4>
              <p className="text-xs text-potion-emerald font-semibold">
                +25 Karma Points added to both students! Coordinate room drop-off now.
              </p>
            </div>
          )}

          {messages.map((m) => {
            const isMe = currentUser && m.sender_id === currentUser.id;
            const isSystem = m.sender_id === 'system';

            if (isSystem) {
              return (
                <div key={m.id} className="p-3.5 rounded-2xl bg-gradient-to-r from-coven/30 to-potion-emerald/20 border border-potion-emerald/40 text-center my-3">
                  <p className="text-xs font-bold text-potion-emerald flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>{m.content}</span>
                  </p>
                </div>
              );
            }

            return (
              <div 
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md ${
                    isMe
                      ? 'bg-gradient-to-r from-pumpkin via-pumpkin to-pumpkin-dark text-obsidian-dark font-medium rounded-br-none shadow-potion-glow'
                      : 'bg-[#1F1730] border border-coven/30 text-cream rounded-bl-none'
                  }`}
                >
                  {m.offer_tag && (
                    <div className="mb-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                        isMe
                          ? 'bg-obsidian-dark/25 text-obsidian-dark'
                          : 'bg-coven/40 text-coven-light border border-coven/50'
                      }`}>
                        <Tag className="w-2.5 h-2.5" />
                        {m.offer_tag}
                      </span>
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>

                <span className="text-[10px] text-lavender-muted mt-1 px-1">
                  {m.created_at}
                </span>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="p-3 sm:p-4 bg-obsidian-surface border-t border-pumpkin/20 space-y-3 relative z-10">
          
          {/* Quick-Bargain Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-bold text-lavender-muted uppercase tracking-wider shrink-0 mr-1">
              Quick Bargain:
            </span>
            {QUICK_BARGAIN_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip.label, chip.tag)}
                className="px-2.5 py-1 rounded-xl bg-obsidian-dark border border-pumpkin/20 hover:border-pumpkin hover:bg-pumpkin/10 text-xs font-semibold text-cream hover:text-pumpkin shrink-0 transition-all active:scale-95 shadow-sm"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Message Input & Send */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your barter offer (e.g. 2 Maggi packs or Sem 4 notes)..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-obsidian-dark border border-pumpkin/20 text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-pumpkin focus:ring-1 focus:ring-pumpkin transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 font-bold text-xs uppercase tracking-wider shadow-potion-glow transition-all flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
