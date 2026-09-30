import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  MapPin,
  Copy,
  Check,
  ShoppingBag,
  CreditCard,
  Truck,
  Clock,
  Send,
  Printer,
  RotateCcw,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, ShippingStatus } from '../../types';

interface OrderDetailsViewProps {
  order: Order;
  onBack: () => void;
  onUpdateOrder: (updatedOrder: Order) => void;
  onOpenShipmentTracking: (order: Order) => void;
}

export const OrderDetailsView: React.FC<OrderDetailsViewProps> = ({
  order,
  onBack,
  onUpdateOrder,
  onOpenShipmentTracking,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCopyAddress = () => {
    const fullAddr = `${order.customer.address.street}, ${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.zip}, ${order.customer.address.country}`;
    navigator.clipboard.writeText(fullAddr);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `cm-${Date.now()}`,
      author: 'Sarah Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'VP Operations',
      content: commentText,
      timestamp: 'Just now',
    };

    const updated = {
      ...order,
      comments: [newComment, ...order.comments],
    };

    onUpdateOrder(updated);
    setCommentText('');
  };

  const handleStatusChange = (
    field: 'paymentStatus' | 'shippingStatus' | 'orderStatus',
    value: string
  ) => {
    const updated = {
      ...order,
      [field]: value,
    };
    onUpdateOrder(updated);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-[#151922] hover:bg-[#232B3E] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white font-mono">{order.orderNumber}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {order.orderStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Placed on {order.orderDate} • Customer ID: {order.customer.id}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenShipmentTracking(order)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Shipment</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-[#151922] hover:bg-[#232B3E] text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* SCREEN 3: THREE-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (4 COLS): Customer Info, Address, Products, Customer Notes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Card */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <User className="w-4 h-4" />
                <span>Customer Profile</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {order.customer.segment}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={order.customer.avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{order.customer.name}</h3>
                <p className="text-xs text-slate-400">{order.customer.email}</p>
                <p className="text-xs text-slate-400">{order.customer.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#151922] border border-white/5">
                <div className="text-[10px] text-slate-400">Total Lifetime Value</div>
                <div className="text-sm font-bold text-emerald-400">
                  ${order.customer.lifetimeValue.toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#151922] border border-white/5">
                <div className="text-[10px] text-slate-400">Total Orders</div>
                <div className="text-sm font-bold text-white">{order.customer.totalOrders}</div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <MapPin className="w-4 h-4" />
                <span>Shipping Address</span>
              </div>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-1 font-sans leading-relaxed">
              <p className="font-semibold text-white">{order.customer.name}</p>
              <p>{order.customer.address.street}</p>
              <p>
                {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}
              </p>
              <p className="text-slate-400 font-medium">{order.customer.address.country}</p>
            </div>
          </div>

          {/* Ordered Products List */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <ShoppingBag className="w-4 h-4" />
                <span>Ordered Line Items ({order.items.length})</span>
              </div>
            </div>

            <div className="divide-y divide-white/5 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.productName}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">SKU: {item.sku}</p>
                      {item.variant && (
                        <span className="text-[10px] text-blue-400 font-medium">{item.variant}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-emerald-400">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Notes */}
          {order.notes && (
            <div className="bg-[#1B2130] p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Customer Instruction Note</span>
              </div>
              <p className="text-xs text-slate-300 italic">"{order.notes}"</p>
            </div>
          )}
        </div>

        {/* CENTER COLUMN (5 COLS): Order Timeline, Payment Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Timeline */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Clock className="w-4 h-4" />
                <span>Order Timeline & Lifecycle</span>
              </div>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span
                    className={`absolute -left-[21px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      step.completed
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-[#151922] border-slate-600'
                    }`}
                  >
                    {step.completed && <Check className="w-2.5 h-2.5" />}
                  </span>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold ${
                          step.completed ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <CreditCard className="w-4 h-4" />
                <span>Payment Summary</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {order.paymentStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shipping Cost ({order.courier})</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-300">
                <span>Sales Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                <span>Grand Total</span>
                <span className="text-emerald-400">${order.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>Processor: Stripe Express</span>
              <span>Ref: tx_9948120391</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (3 COLS): Staff Actions, Status Dropdowns, Activity Timeline & Internal Comments */}
        <div className="lg:col-span-3 space-y-6">
          {/* Real-time Order Status Controls */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-white/10 pb-2">
              Status Controls
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Order Status</label>
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange('orderStatus', e.target.value)}
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Shipping Status</label>
              <select
                value={order.shippingStatus}
                onChange={(e) => handleStatusChange('shippingStatus', e.target.value)}
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Packing">Packing</option>
                <option value="Courier Pickup">Courier Pickup</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Payment Status</label>
              <select
                value={order.paymentStatus}
                onChange={(e) => handleStatusChange('paymentStatus', e.target.value)}
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Assigned Staff */}
          {order.assignedStaff && (
            <div className="bg-[#1B2130] p-4 rounded-2xl border border-white/10 shadow-xl space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Assigned Operations Staff
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={order.assignedStaff.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                />
                <div>
                  <div className="text-xs font-bold text-white">{order.assignedStaff.name}</div>
                  <div className="text-[11px] text-slate-400">{order.assignedStaff.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Internal Comments Audit Trail */}
          <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-b border-white/10 pb-2">
              Internal Team Comments ({order.comments.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {order.comments.map((comment) => (
                <div key={comment.id} className="p-3 rounded-xl bg-[#151922] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{comment.author}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Add team note..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-[#151922] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
