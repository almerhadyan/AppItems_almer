import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Boxes,
  Warehouse as WarehouseIcon,
  Truck,
  Send,
  BarChart3,
  FileSpreadsheet,
  Wallet,
  Megaphone,
  Percent,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export type NavItemKey =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'customers'
  | 'inventory'
  | 'warehouses'
  | 'suppliers'
  | 'shipments'
  | 'analytics'
  | 'reports'
  | 'finance'
  | 'marketing'
  | 'discounts'
  | 'reviews'
  | 'settings';

interface SidebarProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  pendingOrdersCount: number;
  unreadNotifsCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingOrdersCount,
  onLogout,
}) => {
  const menuGroups = [
    {
      group: 'Core Commerce',
      items: [
        { key: 'dashboard' as NavItemKey, label: 'Dashboard', icon: LayoutDashboard },
        { key: 'orders' as NavItemKey, label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount ? `${pendingOrdersCount}` : undefined },
        { key: 'products' as NavItemKey, label: 'Products', icon: Package },
        { key: 'customers' as NavItemKey, label: 'Customers', icon: Users },
      ],
    },
    {
      group: 'Fulfillment & Logistics',
      items: [
        { key: 'inventory' as NavItemKey, label: 'Inventory', icon: Boxes },
        { key: 'warehouses' as NavItemKey, label: 'Warehouses', icon: WarehouseIcon },
        { key: 'suppliers' as NavItemKey, label: 'Suppliers', icon: Building2 },
        { key: 'shipments' as NavItemKey, label: 'Shipments', icon: Truck },
      ],
    },
    {
      group: 'Growth & Intelligence',
      items: [
        { key: 'analytics' as NavItemKey, label: 'Analytics', icon: BarChart3 },
        { key: 'reports' as NavItemKey, label: 'Reports', icon: FileSpreadsheet },
        { key: 'finance' as NavItemKey, label: 'Finance', icon: Wallet },
        { key: 'marketing' as NavItemKey, label: 'Marketing', icon: Megaphone },
        { key: 'discounts' as NavItemKey, label: 'Discounts', icon: Percent },
        { key: 'reviews' as NavItemKey, label: 'Reviews', icon: Star },
      ],
    },
    {
      group: 'System',
      items: [
        { key: 'settings' as NavItemKey, label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#151922] border-r border-white/10 flex flex-col h-screen sticky top-0 z-30 shrink-0 select-none">
      {/* Top Logo Section */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#151922] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300 text-xl tracking-wider">
                V
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-lg tracking-tight">Vendora</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Enterprise Sales Engine</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.group}>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onSelectTab(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Profile & Organization Switcher */}
      <div className="p-3 border-t border-white/10 bg-[#11141C]">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Sarah Vance"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#151922]"></span>
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white flex items-center gap-1">
                <span>Sarah Vance</span>
                <ShieldCheck className="w-3 h-3 text-blue-400" />
              </div>
              <div className="text-[11px] text-slate-400 truncate max-w-[110px]">VP Operations</div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
