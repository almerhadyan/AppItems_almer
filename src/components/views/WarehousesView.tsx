import React from 'react';
import { Warehouse as WarehouseIcon, Building2, MapPin, Mail, User, Activity } from 'lucide-react';
import { Warehouse } from '../../types';

interface WarehousesViewProps {
  warehouses: Warehouse[];
}

export const WarehousesView: React.FC<WarehousesViewProps> = ({ warehouses }) => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Global Warehouse Operations</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Fulfillment hubs, regional dispatch centers, and international freight nodes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((wh) => (
          <div
            key={wh.id}
            className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <WarehouseIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{wh.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{wh.location}</span>
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  wh.status === 'Optimal'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {wh.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#151922] rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Occupancy</div>
                <div className="text-base font-bold text-white mt-0.5">{wh.capacityPercentage}%</div>
              </div>
              <div className="p-3 bg-[#151922] rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Total Products</div>
                <div className="text-base font-bold text-blue-400 mt-0.5">
                  {wh.totalProducts.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-[#151922] rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400">Region</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">{wh.country}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" /> Manager: {wh.manager}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> {wh.contactEmail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
