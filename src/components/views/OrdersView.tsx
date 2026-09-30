import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Table as TableIcon,
  Kanban,
  Eye,
  MoreVertical,
  CheckSquare,
  Square,
  ArrowUpDown,
  Truck,
  CreditCard,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Package,
  ArrowRight
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, ShippingStatus, CourierName } from '../../types';

interface OrdersViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onOpenCreateOrder: () => void;
  onUpdateOrderStage: (orderId: string, newStage: Order['kanbanStage']) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onSelectOrder,
  onOpenCreateOrder,
  onUpdateOrderStage,
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<string>('ALL');
  const [courierFilter, setCourierFilter] = useState<string>('ALL');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || o.paymentStatus === paymentFilter;
    const matchesCourier = courierFilter === 'ALL' || o.courier === courierFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesCourier;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedOrderIds.length === paginatedOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(paginatedOrders.map((o) => o.id));
    }
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter((item) => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  // Export CSV Action
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Order Date', 'Payment Status', 'Shipping Status', 'Total'];
    const rows = filteredOrders.map((o) => [
      o.orderNumber,
      `"${o.customer.name}"`,
      o.customer.email,
      `"${o.orderDate}"`,
      o.paymentStatus,
      o.shippingStatus,
      o.grandTotal.toFixed(2),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vendora_Orders_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Badge Styling Helper
  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Pending':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Failed':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'Refunded':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getShippingBadge = (status: ShippingStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'In Transit':
      case 'Out for Delivery':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Packing':
      case 'Courier Pickup':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Returned':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Processing':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'On Hold':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Cancelled':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const kanbanStages: Order['kanbanStage'][] = [
    'New Orders',
    'Pending Payment',
    'Processing',
    'Packing',
    'Ready to Ship',
    'Shipping',
    'Delivered',
    'Returned',
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Order Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage all customer orders efficiently.</p>
        </div>

        {/* View Mode Toggle + Export + Create Order */}
        <div className="flex items-center gap-3">
          <div className="bg-[#1B2130] p-1 rounded-xl border border-white/10 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
                activeTab === 'table' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
                activeTab === 'kanban' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-[#1B2130] hover:bg-[#232B3E] text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenCreateOrder}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Order</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1B2130] p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, customer name, email..."
            className="w-full bg-[#151922] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>

          {/* Courier Filter */}
          <select
            value={courierFilter}
            onChange={(e) => setCourierFilter(e.target.value)}
            className="bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Couriers</option>
            <option value="FedEx Express">FedEx Express</option>
            <option value="DHL Express">DHL Express</option>
            <option value="UPS Worldwide">UPS Worldwide</option>
            <option value="USPS Priority">USPS Priority</option>
          </select>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedOrderIds.length > 0 && (
        <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckSquare className="w-4 h-4" />
            <span>{selectedOrderIds.length} orders selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Marking ${selectedOrderIds.length} orders as Fulfilling...`)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Bulk Fulfill
            </button>
            <button
              onClick={() => alert(`Printing packing slips for ${selectedOrderIds.length} orders...`)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Print Slips
            </button>
            <button
              onClick={() => setSelectedOrderIds([])}
              className="text-xs font-medium underline px-2 cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 1: ORDERS TABLE VIEW */}
      {activeTab === 'table' && (
        <div className="bg-[#1B2130] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151922] text-slate-400 border-b border-white/10 uppercase text-[10px] font-semibold sticky top-0 z-10">
                <tr>
                  <th className="p-3.5 w-10 text-center">
                    <button onClick={toggleSelectAll} className="text-slate-400 hover:text-white">
                      {selectedOrderIds.length === paginatedOrders.length && paginatedOrders.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Products</th>
                  <th className="p-3.5">Order Date</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Shipping</th>
                  <th className="p-3.5">Order Status</th>
                  <th className="p-3.5 text-right">Total Price</th>
                  <th className="p-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedOrders.map((order) => {
                  const isSelected = selectedOrderIds.includes(order.id);
                  const firstItem = order.items[0];

                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-blue-600/10 transition-colors ${
                        isSelected ? 'bg-blue-600/15' : ''
                      }`}
                    >
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleSelectOrder(order.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Order ID */}
                      <td
                        onClick={() => onSelectOrder(order)}
                        className="p-3.5 font-mono font-bold text-blue-400 cursor-pointer hover:underline"
                      >
                        {order.orderNumber}
                      </td>

                      {/* Customer */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={order.customer.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                          />
                          <div>
                            <div className="font-semibold text-white">{order.customer.name}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                              {order.customer.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Products */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          {firstItem && (
                            <img
                              src={firstItem.image}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="font-medium text-white truncate max-w-[150px]">
                              {firstItem?.productName || 'Order Items'}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {order.items.length > 1 ? `+${order.items.length - 1} additional item(s)` : `Qty: ${firstItem?.quantity || 1}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-3.5 text-slate-300 font-mono text-[11px]">
                        {order.orderDate}
                      </td>

                      {/* Payment Status */}
                      <td className="p-3.5">
                        <span className={`vendora-badge ${getPaymentBadge(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Shipping Status */}
                      <td className="p-3.5">
                        <span className={`vendora-badge ${getShippingBadge(order.shippingStatus)}`}>
                          {order.shippingStatus}
                        </span>
                      </td>

                      {/* Order Status */}
                      <td className="p-3.5">
                        <span className={`vendora-badge ${getOrderStatusBadge(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="p-3.5 text-right font-bold text-emerald-400 text-sm">
                        ${order.grandTotal.toFixed(2)}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onSelectOrder(order)}
                            title="View Deep Details"
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-[#151922] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing <span className="text-white font-semibold">{paginatedOrders.length}</span> of{' '}
              <span className="text-white font-semibold">{filteredOrders.length}</span> orders
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: KANBAN BOARD VIEW */}
      {activeTab === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1800px]">
            {kanbanStages.map((stage) => {
              const stageOrders = orders.filter((o) => o.kanbanStage === stage);

              return (
                <div
                  key={stage}
                  className="w-72 bg-[#151922] rounded-2xl border border-white/10 p-3.5 flex flex-col max-h-[75vh] shrink-0"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{stage}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                        {stageOrders.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards Feed */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {stageOrders.map((order) => {
                      const firstItem = order.items[0];

                      return (
                        <div
                          key={order.id}
                          className="bg-[#1B2130] p-4 rounded-xl border border-white/10 hover:border-blue-500/40 shadow-lg space-y-3 transition-all group"
                        >
                          {/* Top Row: Customer & Order ID */}
                          <div className="flex items-center justify-between">
                            <span
                              onClick={() => onSelectOrder(order)}
                              className="text-xs font-mono font-bold text-blue-400 cursor-pointer hover:underline"
                            >
                              {order.orderNumber}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                order.priority === 'High'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                              }`}
                            >
                              {order.priority}
                            </span>
                          </div>

                          {/* Product Image & Info */}
                          <div className="flex items-center gap-3">
                            {firstItem && (
                              <img
                                src={firstItem.image}
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover ring-1 ring-white/10 shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                {firstItem?.productName}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                Customer: {order.customer.name}
                              </div>
                            </div>
                          </div>

                          {/* Price & Courier */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                            <span className="font-bold text-emerald-400">${order.grandTotal.toFixed(2)}</span>
                            <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10">
                              {order.courier}
                            </span>
                          </div>

                          {/* Action to move stage */}
                          <div className="flex items-center justify-between pt-2 text-[10px]">
                            <span className="text-slate-400">Delivery: {order.expectedDelivery}</span>
                            <button
                              onClick={() => onSelectOrder(order)}
                              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5"
                            >
                              <span>Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {stageOrders.length === 0 && (
                      <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-white/10 rounded-xl">
                        No orders in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
