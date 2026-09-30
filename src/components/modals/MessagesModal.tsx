import React, { useState } from 'react';
import { X, MessageSquare, Send, Check } from 'lucide-react';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Alexander Wright',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Hi Sarah, could we ensure order #ORD-9842 is packed in anti-static foam?',
      time: '10:18 AM',
      isCustomer: true,
    },
    {
      id: '2',
      sender: 'Sarah Vance (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Absolutely Alexander. I have updated the Seattle Hub dispatch instructions accordingly.',
      time: '10:22 AM',
      isCustomer: false,
    },
  ]);

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: `${Date.now()}`,
        sender: 'Sarah Vance (You)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: input,
        time: 'Just now',
        isCustomer: false,
      },
    ]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#1B2130] border-l border-white/10 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-[#151922] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">VIP Support Inbox</h2>
              <p className="text-[11px] text-slate-400">Alexander Wright (#ORD-9842)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#11141C]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.isCustomer ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              <img src={msg.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
              <div>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.isCustomer
                      ? 'bg-[#1B2130] text-slate-200 border border-white/10'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input footer */}
        <form onSubmit={handleSend} className="p-3 bg-[#151922] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type customer reply or team note..."
            className="flex-1 bg-[#1B2130] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
