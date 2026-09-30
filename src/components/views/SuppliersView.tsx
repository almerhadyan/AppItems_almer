import React from 'react';
import { Building2, Mail, Phone, Clock, Star, ShieldCheck } from 'lucide-react';
import { Supplier } from '../../types';

interface SuppliersViewProps {
  suppliers: Supplier[];
}

export const SuppliersView: React.FC<SuppliersViewProps> = ({ suppliers }) => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Suppliers & Vendor Network</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manufacturer SLA tracking, component lead times, and purchase agreements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{sup.country}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {sup.reliabilityScore}% Score
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{sup.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Contact: {sup.contactName}</p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{sup.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{sup.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Avg Lead Time: {sup.leadTimeDays} Days</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1">
              {sup.categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
