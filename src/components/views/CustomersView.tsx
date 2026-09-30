import React, { useState } from 'react';
import { Users, Search, ShieldCheck, Mail, Phone, MapPin, DollarSign, Award } from 'lucide-react';
import { Customer } from '../../types';

interface CustomersViewProps {
  orders: any[];
}

export const CustomersView: React.FC<CustomersViewProps> = ({ orders }) => {
  const [search, setSearch] = useState('');

  const customers: Customer[] = [
    {
      id: 'cust-101',
      name: 'Alexander Wright',
      email: 'a.wright@enterprise-apex.io',
      phone: '+1 (555) 234-8901',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'San Francisco, CA, USA',
      totalOrders: 18,
      lifetimeValue: 14280.00,
      segment: 'VIP',
      address: { street: '450 Mission Street', city: 'San Francisco', state: 'CA', zip: '94105', country: 'United States' },
    },
    {
      id: 'cust-102',
      name: 'Sophia Sterling',
      email: 's.sterling@lumina-labs.com',
      phone: '+44 20 7946 0912',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      location: 'London, UK',
      totalOrders: 6,
      lifetimeValue: 8900.00,
      segment: 'Repeat',
      address: { street: '12 Kensington High St', city: 'London', state: 'London', zip: 'W8 4PT', country: 'UK' },
    },
    {
      id: 'cust-104',
      name: 'Amara Okafor',
      email: 'a.okafor@techpulse.org',
      phone: '+234 803 123 4567',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      location: 'Lagos, Nigeria',
      totalOrders: 12,
      lifetimeValue: 11200.00,
      segment: 'VIP',
      address: { street: '15 Victoria Island Dr', city: 'Lagos', state: 'Lagos', zip: '101241', country: 'Nigeria' },
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Customer CRM & Lifetime Value</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Enterprise customer accounts, purchase history, order velocity, and VIP segmentation
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#1B2130] p-4 rounded-2xl border border-white/10 shadow-lg">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, email..."
            className="w-full bg-[#151922] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {cust.segment} Account
              </span>
              <span className="text-xs font-mono text-slate-400">{cust.id}</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={cust.avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{cust.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>{cust.email}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{cust.location}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="p-2.5 rounded-xl bg-[#151922] border border-white/5">
                <div className="text-[10px] text-slate-400">Total Lifetime Spend</div>
                <div className="text-sm font-bold text-emerald-400">
                  ${cust.lifetimeValue.toLocaleString()}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#151922] border border-white/5">
                <div className="text-[10px] text-slate-400">Completed Orders</div>
                <div className="text-sm font-bold text-white">{cust.totalOrders}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
