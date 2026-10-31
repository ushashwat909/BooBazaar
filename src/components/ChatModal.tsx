import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Item, Message } from '../types';
import { X, Send, Sparkles, Tag, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ChatModalProps {
  item: Item | null;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ item, onClose }) => {
  const { currentUser, openAuthModal } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      conversation_id: 'c1',
      sender_id: item?.owner_id || 'owner',
      content: `Hey! Thanks for inquiring about "${item?.title || 'this item'}". I'm in ${item?.hostel_block || 'Hostel'}. What do you propose to swap?`,
      offer_tag: 'Snack Trade',
      created_at: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedTag, setSelectedTag] = useState<'Counter Offer' | 'Deal Accepted' | 'Snack Trade' | 'Free Claim' | null>(null);

  if (!item) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }

    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: 'c1',
      sender_id: currentUser.id,
      content: inputText.trim(),
      offer_tag: selectedTag,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setSelectedTag(null);

    // Simulated quick friendly student response after 1.2s
    setTimeout(() => {
      const replies = [
        "Sounds awesome! I'm free after 8 PM in Room 204. Drop by whenever!",
        "Deal! 2 Maggi packets or semester notes work great for me. See you soon!",
        "Perfect! I'll hold it for you in Block B.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(p => [
        ...p,
        {
          id: `reply-${Date.now()}`,
          conversation_id: 'c1',
          sender_id: item.owner_id,
          content: randomReply,
          offer_tag: 'Deal Accepted',
          created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-dark/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg h-[600px] flex flex-col rounded-3xl bg-obsidian-card border border-pumpkin/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 bg-obsidian-surface border-b border-pumpkin/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-11 h-11 rounded-xl object-cover border border-pumpkin/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-cream line-clamp-1">{item.title}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pumpkin/15 text-pumpkin border border-pumpkin/30">
                  {item.hostel_block}
                </span>
              </div>
              <p className="text-[11px] text-lavender-muted">
                Wants: <span className="text-potion-emerald">{item.expected_return || 'Open to swap'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-lavender-muted hover:text-cream"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-obsidian/40">
          <div className="text-center my-2">
            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] text-lavender-muted border border-white/5">
              Live Coven Bargaining Session • 0% Transaction Fees
            </span>
          </div>

          {messages.map((m) => {
            const isMe = currentUser && m.sender_id === currentUser.id;

            return (
              <div 
                key={m.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md ${
                    isMe
                      ? 'bg-gradient-to-r from-pumpkin to-pumpkin-dark text-obsidian-dark font-medium rounded-br-none'
                      : 'bg-obsidian-surface border border-pumpkin/20 text-cream rounded-bl-none'
                  }`}
                >
                  {m.offer_tag && (
                    <div className="mb-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                        isMe 
                          ? 'bg-obsidian-dark/20 text-obsidian-dark' 
                          : 'bg-coven/30 text-coven-light border border-coven/40'
                      }`}>
                        <Tag className="w-2.5 h-2.5" />
                        {m.offer_tag}
                      </span>
                    </div>
                  )}
                  <p className="leading-relaxed">{m.content}</p>
                </div>
                <span className="text-[10px] text-lavender-muted mt-1 px-1">
                  {m.created_at}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Offer Tag Buttons */}
        <div className="px-3 py-2 bg-obsidian-surface/60 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px]">
          <span className="text-lavender-muted shrink-0 text-[10px] font-bold">Tag Offer:</span>
          {(['Snack Trade', 'Counter Offer', 'Free Claim', 'Deal Accepted'] as const).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-all ${
                selectedTag === tag 
                  ? 'bg-pumpkin text-obsidian-dark' 
                  : 'bg-white/5 text-lavender-muted hover:text-cream border border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-obsidian-surface border-t border-pumpkin/20 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your barter offer (e.g. 2 Maggi packs or Sem 4 notes)..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-obsidian-dark border border-pumpkin/20 text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-pumpkin"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-pumpkin text-obsidian-dark hover:scale-105 active:scale-95 transition-all shadow-potion-glow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

