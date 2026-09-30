import React from 'react';
import { Search, Bell, MessageSquare, Plus, Moon, Sparkles, Command } from 'lucide-react';

interface TopNavProps {
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
  onOpenCreateOrder: () => void;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  currentTabName: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenCommandPalette,
  onOpenNotifications,
  onOpenMessages,
  onOpenCreateOrder,
  unreadNotificationsCount,
  unreadMessagesCount,
  currentTabName,
}) => {
  return (
    <header className="h-16 bg-[#151922]/90 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Left Current Breadcrumb & Search Bar */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Vendora OS</span>
          <span className="text-slate-600">/</span>
          <span className="text-sm font-semibold text-white capitalize">{currentTabName}</span>
        </div>

        {/* Global Search Bar */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 bg-[#1B2130] hover:bg-[#232B3E] text-slate-400 hover:text-slate-200 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs transition-all w-64 md:w-80 group shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
          <span className="flex-1 text-left truncate">Search orders, SKU, customers...</span>
          <div className="flex items-center gap-0.5 text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded font-mono font-semibold border border-white/10">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Action Icons & Controls */}
      <div className="flex items-center gap-3">
        {/* Quick AI Commerce Assistant Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>AI Fulfillment Active</span>
        </div>

        {/* Dark Mode Indicator Toggle */}
        <button
          title="Dark Mode Enabled"
          className="p-2 rounded-xl bg-[#1B2130] text-slate-300 hover:text-white border border-white/10 hover:bg-[#232B3E] transition-all"
        >
          <Moon className="w-4 h-4 text-blue-400" />
        </button>

        {/* Messages Dropdown Trigger */}
        <button
          onClick={onOpenMessages}
          title="Customer Support Messages"
          className="relative p-2 rounded-xl bg-[#1B2130] text-slate-300 hover:text-white border border-white/10 hover:bg-[#232B3E] transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#151922]">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown Trigger */}
        <button
          onClick={onOpenNotifications}
          title="System Notifications"
          className="relative p-2 rounded-xl bg-[#1B2130] text-slate-300 hover:text-white border border-white/10 hover:bg-[#232B3E] transition-all"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#151922] animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Primary Create Order Action */}
        <button
          onClick={onOpenCreateOrder}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create Order</span>
        </button>

        {/* Avatar Status */}
        <div className="pl-2 border-l border-white/10 flex items-center gap-2.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Sarah Vance"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#151922]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
