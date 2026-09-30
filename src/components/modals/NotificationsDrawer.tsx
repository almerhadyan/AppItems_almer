import React from 'react';
import { X, Bell, CheckCheck, Package, ShoppingBag, Truck, DollarSign } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'inventory':
        return <Package className="w-4 h-4 text-amber-400" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-400" />;
      case 'shipment':
        return <Truck className="w-4 h-4 text-emerald-400" />;
      case 'finance':
        return <DollarSign className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#1B2130] border-l border-white/10 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-[#151922] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">System Alerts & Notifications</h2>
              <p className="text-[11px] text-slate-400">Live operational events</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar */}
        <div className="p-3 bg-[#11141C] border-b border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            {notifications.filter((n) => !n.read).length} unread alerts
          </span>
          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                item.read
                  ? 'bg-[#151922]/50 border-white/5 opacity-70'
                  : 'bg-[#151922] border-blue-500/30 shadow-md shadow-blue-500/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-white truncate">{item.title}</div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
