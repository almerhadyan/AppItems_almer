import React, { useState } from 'react';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { CommandPalette } from './components/modals/CommandPalette';
import { CreateOrderModal } from './components/modals/CreateOrderModal';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { MessagesModal } from './components/modals/MessagesModal';

import { DashboardView } from './components/views/DashboardView';
import { OrdersView } from './components/views/OrdersView';
import { OrderDetailsView } from './components/views/OrderDetailsView';
import { ShipmentTrackingView } from './components/views/ShipmentTrackingView';
import { ProductsView } from './components/views/ProductsView';
import { CustomersView } from './components/views/CustomersView';
import { InventoryView } from './components/views/InventoryView';
import { WarehousesView } from './components/views/WarehousesView';
import { SuppliersView } from './components/views/SuppliersView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { FinanceView } from './components/views/FinanceView';
import { DiscountsView } from './components/views/DiscountsView';
import { ReviewsView } from './components/views/ReviewsView';
import { SettingsView } from './components/views/SettingsView';

import {
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_WAREHOUSES,
  INITIAL_SUPPLIERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_DISCOUNTS,
  INITIAL_REVIEWS,
} from './data/mockData';
import { Order, Product, NotificationItem } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('dashboard');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [warehouses] = useState(INITIAL_WAREHOUSES);
  const [suppliers] = useState(INITIAL_SUPPLIERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [discounts] = useState(INITIAL_DISCOUNTS);
  const [reviews] = useState(INITIAL_REVIEWS);

  // Detail Sub-views
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleSelectTab = (tab: NavItemKey) => {
    setCurrentTab(tab);
    setSelectedOrder(null);
    setTrackingOrder(null);
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setTrackingOrder(null);
  };

  const handleCreateOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    showToast(`Order ${newOrder.orderNumber} successfully created and dispatched!`);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    if (selectedOrder?.id === updatedOrder.id) {
      setSelectedOrder(updatedOrder);
    }
    showToast(`Order ${updatedOrder.orderNumber} updated successfully.`);
  };

  const handleUpdateOrderStage = (orderId: string, newStage: Order['kanbanStage']) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, kanbanStage: newStage } : o))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Unread badge counters
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const pendingOrdersCount = orders.filter(
    (o) => o.orderStatus === 'Processing' || o.orderStatus === 'Pending'
  ).length;

  return (
    <div className="flex min-h-screen bg-[#0F1117] text-white font-['Inter',sans-serif] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        pendingOrdersCount={pendingOrdersCount}
        unreadNotifsCount={unreadNotifsCount}
        onLogout={() => showToast('Session locked. Re-authenticate to access Vendora.')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNav
          currentTabName={currentTab}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenMessages={() => setIsMessagesOpen(true)}
          onOpenCreateOrder={() => setIsCreateOrderOpen(true)}
          unreadNotificationsCount={unreadNotifsCount}
          unreadMessagesCount={1}
        />

        {/* View Router */}
        <main className="flex-1 overflow-y-auto">
          {/* Detailed Sub-Views take priority if selected */}
          {trackingOrder ? (
            <ShipmentTrackingView
              order={trackingOrder}
              onBack={() => setTrackingOrder(null)}
            />
          ) : selectedOrder ? (
            <OrderDetailsView
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
              onUpdateOrder={handleUpdateOrder}
              onOpenShipmentTracking={(ord) => setTrackingOrder(ord)}
            />
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <DashboardView
                  orders={orders}
                  products={products}
                  onSelectOrder={handleSelectOrder}
                  onNavigateTab={handleSelectTab}
                />
              )}

              {(currentTab === 'orders' || currentTab === 'reports') && (
                <OrdersView
                  orders={orders}
                  onSelectOrder={handleSelectOrder}
                  onOpenCreateOrder={() => setIsCreateOrderOpen(true)}
                  onUpdateOrderStage={handleUpdateOrderStage}
                />
              )}

              {currentTab === 'products' && (
                <ProductsView
                  products={products}
                  onOpenCreateOrder={() => setIsCreateOrderOpen(true)}
                />
              )}

              {currentTab === 'customers' && <CustomersView orders={orders} />}

              {currentTab === 'inventory' && (
                <InventoryView products={products} warehouses={warehouses} />
              )}

              {currentTab === 'warehouses' && (
                <WarehousesView warehouses={warehouses} />
              )}

              {currentTab === 'suppliers' && (
                <SuppliersView suppliers={suppliers} />
              )}

              {currentTab === 'shipments' && orders[0] && (
                <ShipmentTrackingView
                  order={orders[0]}
                  onBack={() => setCurrentTab('dashboard')}
                />
              )}

              {currentTab === 'analytics' && <AnalyticsView />}

              {currentTab === 'finance' && <FinanceView />}

              {(currentTab === 'marketing' || currentTab === 'discounts') && (
                <DiscountsView discounts={discounts} />
              )}

              {currentTab === 'reviews' && <ReviewsView reviews={reviews} />}

              {currentTab === 'settings' && <SettingsView />}
            </>
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        orders={orders}
        products={products}
        onSelectOrder={handleSelectOrder}
        onNavigateTab={handleSelectTab}
      />

      <CreateOrderModal
        isOpen={isCreateOrderOpen}
        onClose={() => setIsCreateOrderOpen(false)}
        products={products}
        onCreateOrder={handleCreateOrder}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
      />

      {/* Toast Alert Popover */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B2130] border border-blue-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
