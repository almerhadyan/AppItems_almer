import React, { useState } from 'react';
import { X, Plus, Trash2, ShoppingBag, Truck, CreditCard, User, CheckCircle2 } from 'lucide-react';
import { Order, Product, CourierName, PaymentStatus, ShippingStatus, OrderPriority } from '../../types';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onCreateOrder: (newOrder: Order) => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  products,
  onCreateOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 302-1920');
  const [street, setStreet] = useState('100 Technology Parkway');
  const [city, setCity] = useState('San Jose');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('95110');
  const [country, setCountry] = useState('United States');

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState<
    { product: Product; quantity: number; unitPrice: number; total: number }[]
  >([]);

  const [priority, setPriority] = useState<OrderPriority>('High');
  const [courier, setCourier] = useState<CourierName>('FedEx Express');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Paid');
  const [notes, setNotes] = useState('Priority corporate fulfillment order.');

  if (!isOpen) return null;

  const handleAddItem = () => {
    const prod = products.find((p) => p.id === selectedProductId);
    if (!prod) return;
    const existingIndex = orderItems.findIndex((item) => item.product.id === prod.id);

    if (existingIndex >= 0) {
      const updated = [...orderItems];
      updated[existingIndex].quantity += quantity;
      updated[existingIndex].total = updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setOrderItems(updated);
    } else {
      setOrderItems([
        ...orderItems,
        {
          product: prod,
          quantity: quantity,
          unitPrice: prod.price,
          total: prod.price * quantity,
        },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const subtotal = orderItems.reduce((acc, item) => acc + item.total, 0);
  const shippingCost = subtotal > 0 ? 25.0 : 0;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || orderItems.length === 0) {
      alert('Please fill in customer details and add at least one product line item.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `#ORD-${randomNum}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customer: {
        id: `cust-${Date.now()}`,
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
        location: `${city}, ${country}`,
        totalOrders: 1,
        lifetimeValue: grandTotal,
        segment: 'New',
        address: {
          street,
          city,
          state,
          zip,
          country,
        },
      },
      items: orderItems.map((item, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        productName: item.product.name,
        sku: item.product.sku,
        image: item.product.image,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.total,
      })),
      orderDate: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      paymentStatus: paymentStatus,
      shippingStatus: 'Packing' as ShippingStatus,
      orderStatus: 'Processing',
      priority: priority,
      courier: courier,
      trackingNumber: `TRK-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      expectedDelivery: 'In 2 Business Days',
      subtotal,
      shippingCost,
      discount: 0,
      tax,
      grandTotal,
      notes,
      assignedStaff: {
        name: 'Sarah Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'VP Operations',
      },
      timeline: [
        {
          title: 'Order Created',
          timestamp: 'Just now',
          description: 'Manually logged by staff via Vendora OS',
          completed: true,
          current: true,
        },
        {
          title: 'Payment Confirmed',
          timestamp: paymentStatus === 'Paid' ? 'Just now' : 'Pending',
          description: paymentStatus === 'Paid' ? 'Payment marked paid' : 'Awaiting payment link',
          completed: paymentStatus === 'Paid',
        },
      ],
      comments: [
        {
          id: `cm-${Date.now()}`,
          author: 'Sarah Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: 'VP Operations',
          content: 'Created manual enterprise sales order.',
          timestamp: 'Just now',
        },
      ],
      kanbanStage: 'Processing',
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#1B2130] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 bg-[#151922] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create New Enterprise Order</h2>
              <p className="text-xs text-slate-400">
                Log a new manual commerce order with custom line items and shipping details
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Customer Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <User className="w-4 h-4" />
              <span>Customer Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Belfort"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="j.belfort@stratton.io"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Street Address</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Line Items Section */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <ShoppingBag className="w-4 h-4" />
                <span>Product Line Items</span>
              </div>
            </div>

            <div className="flex items-end gap-3 bg-[#151922] p-3 rounded-xl border border-white/10">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-300 mb-1">Select Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-[#1B2130] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ${p.price.toFixed(2)} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-24">
                <label className="block text-xs font-medium text-slate-300 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#1B2130] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Added Line Items Table */}
            {orderItems.length > 0 ? (
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#151922]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#11141C] text-slate-400 border-b border-white/10 uppercase text-[10px] font-semibold">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Unit Price</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Total</th>
                      <th className="p-3 text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orderItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="p-3 font-medium text-white flex items-center gap-2">
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-7 h-7 rounded object-cover"
                          />
                          <div>
                            <div>{item.product.name}</div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {item.product.sku}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-slate-300">${item.unitPrice.toFixed(2)}</td>
                        <td className="p-3 text-white font-semibold">{item.quantity}</td>
                        <td className="p-3 text-emerald-400 font-bold">${item.total.toFixed(2)}</td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1 text-slate-400 hover:text-red-400 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-white/10 rounded-xl">
                No items added yet. Select a product above and click "Add Item".
              </div>
            )}
          </div>

          {/* Fulfillment & Payment Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-400" /> Courier Service
              </label>
              <select
                value={courier}
                onChange={(e) => setCourier(e.target.value as CourierName)}
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="FedEx Express">FedEx Express</option>
                <option value="DHL Express">DHL Express</option>
                <option value="UPS Worldwide">UPS Worldwide</option>
                <option value="USPS Priority">USPS Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" /> Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending Invoice</option>
                <option value="Partially Paid">Partially Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as OrderPriority)}
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="High">High (Express Handling)</option>
                <option value="Medium">Medium (Standard)</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Payment Summary Box */}
          <div className="bg-[#151922] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-300 mb-1">Staff Fulfillment Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#1B2130] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <div className="w-full md:w-64 space-y-1.5 text-xs border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping:</span>
                <span className="text-white font-medium">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Tax (8%):</span>
                <span className="text-white font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                <span>Grand Total:</span>
                <span className="text-emerald-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit & Create Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
