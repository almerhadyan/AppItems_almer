import React from 'react';
import { Boxes, Warehouse as WarehouseIcon, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Product, Warehouse } from '../../types';

interface InventoryViewProps {
  products: Product[];
  warehouses: Warehouse[];
}

export const InventoryView: React.FC<InventoryViewProps> = ({ products, warehouses }) => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Inventory & Stock Allocation</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-node stock balancing, reorder triggers, bin locations, and safety stock thresholding
          </p>
        </div>

        <button
          onClick={() => alert('Purchase Order wizard initialized!')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          Create Purchase Order
        </button>
      </div>

      {/* Warehouse Capacity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {warehouses.map((wh) => (
          <div key={wh.id} className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{wh.name}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  wh.status === 'Optimal'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {wh.status}
              </span>
            </div>

            <div className="text-xs text-slate-400">{wh.location}</div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Capacity Utilized</span>
                <span className="font-bold text-white">{wh.capacityPercentage}%</span>
              </div>
              <div className="w-full bg-[#151922] h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full ${
                    wh.capacityPercentage > 85 ? 'bg-amber-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${wh.capacityPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Total SKUs: {wh.totalProducts.toLocaleString()} units
            </div>
          </div>
        ))}
      </div>

      {/* Stock Levels Matrix */}
      <div className="bg-[#1B2130] rounded-2xl border border-white/10 shadow-xl overflow-hidden space-y-4 p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
          Live Stock Matrix Across All Hubs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151922] text-slate-400 border-b border-white/10 uppercase text-[10px] font-semibold">
              <tr>
                <th className="p-3">Item Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Allocated Hub</th>
                <th className="p-3">Available Stock</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <img src={p.image} alt="" className="w-7 h-7 rounded object-cover" />
                    <span>{p.name}</span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">{p.sku}</td>
                  <td className="p-3 text-slate-300">{p.category}</td>
                  <td className="p-3 text-slate-300">{p.warehouseLocation}</td>
                  <td className="p-3 font-bold text-white">{p.stock} units</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'In Stock'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
