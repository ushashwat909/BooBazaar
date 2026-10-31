import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Item, Conversation, Message, User } from '../types';
import {
  X,
  Send,
  Sparkles,
  Tag,
  MapPin,
  ShieldCheck,
  Check,
  Award,
} from 'lucide-react';
import { supabase, INITIAL_USERS, INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from '../lib/supabase';
import { gsap } from '../utils/animations';

export interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem?: Item | null;
  activeConversationId?: string | null;
  onItemClaimed?: (itemId: string) => void;
}

const QUICK_BARGAIN_CHIPS = [
  { label: '🍜 Trade for 2x Maggi + Coffee?', tag: 'Snack Trade' as const },
  { label: '📍 Meet at Common Room', tag: 'Pickup' as const },
  { label: '🔄 Swap for another item?', tag: 'Counter Offer' as const },
  { label: '🏃 Can pick up from your block now!', tag: 'Pickup' as const },
  { label: '🤝 Is this still available?', tag: 'Availability' as const },
];

interface QuickBargainChipItemProps {
  label: string;
  tag: Message['offer_tag'];
  onSelect: (label: string, tag: Message['offer_tag']) => void;
}

const QuickBargainChipItem: React.FC<QuickBargainChipItemProps> = ({
  label,
  tag,
  onSelect,
}) => {
  const chipRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (!chipRef.current) return;
    gsap.to(chipRef.current, {
      scale: 1.05,
      y: -2,
      ease: 'back.out(2)',
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    if (!chipRef.current) return;
    gsap.to(chipRef.current, {
      scale: 1,
      y: 0,
      ease: 'power2.out',
      duration: 0.2,
    });
  };

  const handleClick = () => {
    if (!chipRef.current) return;
    gsap
      .timeline()
      .to(chipRef.current, { scale: 0.92, duration: 0.08 })
      .to(chipRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(1.5)',
        onComplete: () => onSelect(label, tag),
      });
  };

  return (
    <button
      ref={chipRef}
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="drawer-element px-2.5 py-1 rounded-xl bg-obsidian-dark border border-pumpkin/20 hover:border-pumpkin text-xs font-semibold text-cream hover:text-pumpkin shrink-0 transition-colors shadow-sm select-none will-change-transform"
    >
      {label}
    </button>
  );
};

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  targetItem,
  activeConversationId,
  onItemClaimed,
}) => {
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animation DOM refs
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const itemCardBannerRef = useRef<HTMLDivElement>(null);
  const sealButtonRef = useRef<HTMLButtonElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const potionBadgeRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);

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
  const [particles, setParticles] = useState<{ id: number; color: string; size: number }[]>([]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCelebration]);

  // Fluid entrance choreography when opening the drawer
  useLayoutEffect(() => {
    if (!isOpen) return;

    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }

    if (drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.55, ease: 'expo.out' }
      );

      // Sequentially stagger in drawer elements (header, item preview, feed, chips)
      const elements = drawerRef.current.querySelectorAll('.drawer-element');
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'transform',
          }
        );
      }
    }
  }, [isOpen]);

  // Smooth exit animation
  const handleClose = () => {
    if (drawerRef.current && backdropRef.current) {
      gsap.to(drawerRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: 'power3.in',
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  // Find or Create Conversation when targetItem or activeConversationId changes
  useEffect(() => {
    if (!isOpen || !currentUser) return;

    const initConversation = async () => {
      let activeConv: Conversation | null = null;

      if (activeConversationId) {
        const found = conversationsList.find((c) => c.id === activeConversationId);
        if (found) activeConv = found;
      }

      if (!activeConv && targetItem) {
        const isOwner = currentUser.id === targetItem.owner_id;
        const buyerId = isOwner
          ? targetItem.owner_id === INITIAL_USERS[0].id
            ? INITIAL_USERS[1].id
            : INITIAL_USERS[0].id
          : currentUser.id;
        const sellerId = targetItem.owner_id;

        const existing = conversationsList.find(
          (c) =>
            c.item_id === targetItem.id &&
            (c.buyer_id === buyerId || c.seller_id === sellerId)
        );

        if (existing) {
          activeConv = existing;
        } else {
          const newConvId = `conv-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 6)}`;
          const sellerObj =
            INITIAL_USERS.find((u) => u.id === sellerId) ||
            targetItem.owner ||
            currentUser;
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
            last_message_at: 'Just now',
          };

          activeConv = newConv;
          const updatedList = [newConv, ...conversationsList];
          setConversationsList(updatedList);
          localStorage.setItem(
            'potion_pantry_conversations',
            JSON.stringify(updatedList)
          );

          try {
            await supabase.from('conversations').insert([
              {
                item_id: targetItem.id,
                buyer_id: buyerId,
                seller_id: sellerId,
              },
            ]);
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
            content: `Hey! Thanks for inquiring about "${
              convObj.item?.title || 'this item'
            }". I'm in ${
              convObj.item?.hostel_block || 'hostel'
            }. What do you propose to swap?`,
            offer_tag: 'Availability',
            created_at: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
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
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
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

  const otherUser: User =
    conversation?.seller_id === currentUser?.id
      ? conversation?.buyer || INITIAL_USERS[1]
      : conversation?.seller || INITIAL_USERS[0];

  const activeItem = conversation?.item || targetItem;

  // Send Message Function
  const handleSendMessage = async (
    contentToSend: string,
    tag?: Message['offer_tag']
  ) => {
    if (!contentToSend.trim() || !conversation || !currentUser) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      conversation_id: conversation.id,
      sender_id: currentUser.id,
      content: contentToSend.trim(),
      offer_tag: tag || null,
      created_at: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputText('');
    localStorage.setItem(
      `messages_${conversation.id}`,
      JSON.stringify(updated)
    );

    try {
      await supabase.from('messages').insert([
        {
          conversation_id: conversation.id,
          sender_id: currentUser.id,
          content: newMsg.content,
          offer_tag: newMsg.offer_tag,
        },
      ]);
    } catch {
      // Offline fallback
    }

    if (
      otherUser &&
      (otherUser.username === 'aarav' || otherUser.username === 'meera')
    ) {
      setTimeout(() => {
        let reply = "Sounds great! Let's do this exchange.";
        let replyTag: Message['offer_tag'] = 'Deal Accepted';

        if (contentToSend.includes('Maggi') || tag === 'Snack Trade') {
          reply = `Yum! 2 Maggi packs + coffee are a deal! Come up to ${otherUser.hostel_block} Room ${otherUser.room_number}.`;
        } else if (contentToSend.includes('Common Room') || tag === 'Pickup') {
          reply = `Common room is perfect! I will head down now with the item.`;
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
          created_at: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((p) => {
          const next = [...p, autoReply];
          localStorage.setItem(
            `messages_${conversation.id}`,
            JSON.stringify(next)
          );
          return next;
        });
      }, 1000);
    }
  };

  // "Seal the Deal" with Potion Spark Confetti & Micro-Feedback Physics
  const handleSealDeal = async () => {
    if (!conversation || !activeItem) return;

    // 1. Shake the target item preview card subtly
    if (itemCardBannerRef.current) {
      gsap.to(itemCardBannerRef.current, {
        x: 4,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
        clearProps: 'x',
      });
    }

    // 2. Generate Halloween particle embers (warm amber, pumpkin orange, coven violet)
    const particleColors = ['#FF8A2B', '#FF5400', '#7B2CBF', '#2EC4B6', '#FFF8F0'];
    const newParticles = Array.from({ length: 24 }).map((_, idx) => ({
      id: Date.now() + idx,
      color: particleColors[idx % particleColors.length],
      size: Math.floor(Math.random() * 5) + 4,
    }));
    setParticles(newParticles);

    // Run GSAP upward particle burst
    setTimeout(() => {
      if (particlesContainerRef.current) {
        const particleElements =
          particlesContainerRef.current.querySelectorAll('.ember-particle');
        if (particleElements && particleElements.length > 0) {
          gsap.fromTo(
            particleElements,
            { x: 0, y: 0, scale: 1, opacity: 1 },
            {
              y: '-=80',
              x: 'random(-60, 60)',
              scale: 0,
              opacity: 0,
              duration: 0.9,
              stagger: 0.02,
              ease: 'power3.out',
              onComplete: () => setParticles([]),
            }
          );
        }
      }
    }, 10);

    // 3. Floating "+50 Potion Points" counter badge rising into avatar
    if (potionBadgeRef.current) {
      gsap
        .timeline()
        .fromTo(
          potionBadgeRef.current,
          { opacity: 0, y: 10, scale: 0.7 },
          {
            opacity: 1,
            y: -35,
            scale: 1.15,
            duration: 0.45,
            ease: 'back.out(2)',
          }
        )
        .to(potionBadgeRef.current, {
          opacity: 0,
          y: -75,
          scale: 0.6,
          duration: 0.55,
          ease: 'power2.in',
          delay: 0.35,
        });
    }

    // Pulse the top user avatar as points enter
    if (avatarRef.current) {
      gsap.fromTo(
        avatarRef.current,
        { scale: 1 },
        {
          scale: 1.25,
          duration: 0.22,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
          delay: 0.45,
        }
      );
    }

    setDealSealed(true);
    setShowCelebration(true);

    const celebrationMsg: Message = {
      id: `sys-${Date.now()}`,
      conversation_id: conversation.id,
      sender_id: 'system',
      content: `🎉 DEAL SEALED! "${activeItem.title}" has been exchanged. Both ${currentUser?.full_name} and ${otherUser.full_name} earned +50 Potion Points! ✨`,
      offer_tag: 'System',
      created_at: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const nextMsgs = [...messages, celebrationMsg];
    setMessages(nextMsgs);
    localStorage.setItem(
      `messages_${conversation.id}`,
      JSON.stringify(nextMsgs)
    );

    if (currentUser) {
      currentUser.karma_points += 50;
      localStorage.setItem(
        'potion_pantry_current_user',
        JSON.stringify(currentUser)
      );
    }
    otherUser.karma_points += 50;

    if (onItemClaimed) {
      onItemClaimed(activeItem.id);
    }

    try {
      await supabase
        .from('items')
        .update({ status: 'Claimed' })
        .eq('id', activeItem.id);
      await supabase.from('messages').insert([
        {
          conversation_id: conversation.id,
          sender_id: currentUser?.id,
          content: celebrationMsg.content,
          offer_tag: 'System',
        },
      ]);
    } catch {
      // Local fallback
    }

    setTimeout(() => setShowCelebration(false), 4500);
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex justify-end bg-obsidian-dark/75 backdrop-blur-[8px]"
    >
      {/* Slide-over Drawer Canvas */}
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl h-full bg-obsidian-card border-l border-pumpkin/30 shadow-2xl flex flex-col justify-between overflow-hidden will-change-transform"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pumpkin/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-coven/20 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HEADER */}
        <div className="drawer-element p-4 sm:p-5 bg-obsidian-surface border-b border-pumpkin/20 relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            {/* Student & Verification Badge */}
            <div className="flex items-center gap-3">
              <div
                ref={avatarRef}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coven to-pumpkin flex items-center justify-center font-bold text-white text-sm shadow-potion-glow will-change-transform"
              >
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
                  <span>
                    {otherUser.hostel_block}, Room {otherUser.room_number}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-pumpkin font-semibold">
                    {otherUser.karma_points} Karma
                  </span>
                </p>
              </div>
            </div>

            {/* Actions: Close Drawer & Seal Deal */}
            <div className="flex items-center gap-2 relative">
              {/* Ethereal Burst Particle Embers Container */}
              <div
                ref={particlesContainerRef}
                className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-30"
              >
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className="ember-particle absolute rounded-full shadow-sm will-change-transform pointer-events-none"
                    style={{
                      backgroundColor: p.color,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      boxShadow: `0 0 8px ${p.color}`,
                    }}
                  />
                ))}
              </div>

              {/* Floating "+50 Potion Points" Badge */}
              <div
                ref={potionBadgeRef}
                className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 z-40 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-r from-pumpkin via-potion-gold to-pumpkin-light text-obsidian-dark font-extrabold text-xs shadow-potion-glow flex items-center gap-1 border border-white/20 will-change-transform"
              >
                <Sparkles className="w-3.5 h-3.5 fill-obsidian-dark" />
                <span>+50 Potion Points</span>
              </div>

              {dealSealed ? (
                <span className="px-3 py-1.5 rounded-xl bg-potion-emerald/15 text-potion-emerald border border-potion-emerald/30 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Deal Sealed</span>
                </span>
              ) : (
                <button
                  ref={sealButtonRef}
                  onClick={handleSealDeal}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pumpkin to-pumpkin-dark hover:scale-105 active:scale-95 text-obsidian-dark font-extrabold text-xs uppercase tracking-wider shadow-potion-glow transition-all flex items-center gap-1.5 relative overflow-hidden"
                  title="Mark this item as exchanged and award +50 Potion Points!"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-obsidian-dark" />
                  <span>Mark Exchanged</span>
                </button>
              )}

              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-lavender-muted hover:text-cream transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Item Context Strip (Target Card with subtle shake on deal) */}
          {activeItem && (
            <div
              ref={itemCardBannerRef}
              className="drawer-element p-3 rounded-2xl bg-obsidian-dark/70 border border-white/5 flex items-center justify-between gap-3 will-change-transform"
            >
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
                    Wants:{' '}
                    <strong className="text-potion-emerald">
                      {activeItem.expected_return || 'Open to barter'}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                    dealSealed
                      ? 'bg-potion-emerald/20 text-potion-emerald'
                      : 'bg-coven/20 text-coven-light border border-coven/30'
                  }`}
                >
                  {dealSealed ? 'Claimed' : 'Open Bargain'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* REAL-TIME MESSAGE FEED */}
        <div className="drawer-element flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-obsidian-dark/50 relative">
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
                +50 Potion Points added to both students! Coordinate room drop-off now.
              </p>
            </div>
          )}

          {messages.map((m) => {
            const isMe = currentUser && m.sender_id === currentUser.id;
            const isSystem = m.sender_id === 'system';

            if (isSystem) {
              return (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-coven/30 to-potion-emerald/20 border border-potion-emerald/40 text-center my-3"
                >
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
                className={`flex flex-col ${
                  isMe ? 'items-end' : 'items-start'
                } animate-in fade-in duration-200`}
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
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          isMe
                            ? 'bg-obsidian-dark/25 text-obsidian-dark'
                            : 'bg-coven/40 text-coven-light border border-coven/50'
                        }`}
                      >
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
        <div className="drawer-element p-3 sm:p-4 bg-obsidian-surface border-t border-pumpkin/20 space-y-3 relative z-10">
          {/* Quick-Bargain Chips with Interactive Hover & Ripple Physics */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-bold text-lavender-muted uppercase tracking-wider shrink-0 mr-1 select-none">
              Quick Bargain:
            </span>
            {QUICK_BARGAIN_CHIPS.map((chip, idx) => (
              <QuickBargainChipItem
                key={idx}
                label={chip.label}
                tag={chip.tag}
                onSelect={(label, tag) => handleSendMessage(label, tag)}
              />
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
