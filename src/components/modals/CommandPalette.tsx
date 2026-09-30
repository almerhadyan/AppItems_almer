import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Package, Users, Truck, ArrowRight, X } from 'lucide-react';
import { Order, Product, Customer } from '../../types';
import { NavItemKey } from '../layout/Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  products: Product[];
  onSelectOrder: (order: Order) => void;
  onNavigateTab: (tab: NavItemKey) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  orders,
  products,
  onSelectOrder,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(query.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#1B2130] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders (#ORD-9842), customers, products, or navigation..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          {/* Quick Nav Section */}
          {!query && (
            <div>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Quick Navigation
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onNavigateTab('orders');
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/30 border border-white/5 text-xs text-slate-200 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-blue-400" />
                    <span>View All Orders</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('shipments');
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/30 border border-white/5 text-xs text-slate-200 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>Track Active Shipments</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          )}

          {/* Orders Results */}
          {filteredOrders.length > 0 && (
            <div>
              <div className="px-3 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Orders ({filteredOrders.length})
              </div>
              <div className="space-y-1">
                {filteredOrders.slice(0, 4).map((order) => (
                  <button
                    key={order.id}
                    onClick={() => {
                      onSelectOrder(order);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-600/15 hover:border-blue-500/30 border border-transparent text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 font-mono text-xs font-bold">
                        {order.orderNumber}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-blue-300">
                          {order.customer.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {order.items.length} item(s) • ${order.grandTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {order.orderStatus}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Results */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="px-3 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Products ({filteredProducts.length})
              </div>
              <div className="space-y-1">
                {filteredProducts.slice(0, 4).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onNavigateTab('products');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{product.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {product.sku} • Stock: {product.stock}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      ${product.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredOrders.length === 0 && filteredProducts.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching orders or products found for "{query}".
            </div>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-[#151922] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrows or click item</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
