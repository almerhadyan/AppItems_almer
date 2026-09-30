import React, { useState } from 'react';
import { Package, Plus, Search, Star, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';

interface ProductsViewProps {
  products: Product[];
  onOpenCreateOrder: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ products, onOpenCreateOrder }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Product Catalog & Stock</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage product listings, SKU variants, warehouse allocations, and live inventory status
          </p>
        </div>

        <button
          onClick={() => alert('Add Product feature initialized!')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#1B2130] p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name or SKU..."
            className="w-full bg-[#151922] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 w-full md:w-auto"
        >
          <option value="ALL">All Categories</option>
          <option value="Audio Electronics">Audio Electronics</option>
          <option value="Computer Hardware">Computer Hardware</option>
          <option value="Monitors & Displays">Monitors & Displays</option>
          <option value="Wearables">Wearables</option>
          <option value="Bags & Accessories">Bags & Accessories</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-[#1B2130] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151922] text-slate-400 border-b border-white/10 uppercase text-[10px] font-semibold">
              <tr>
                <th className="p-3.5">Product Details</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock Level</th>
                <th className="p-3.5">Warehouse Bin Location</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5 text-right">Units Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white">{prod.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{prod.sku}</div>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-300">{prod.category}</td>
                  <td className="p-3.5 font-bold text-white">${prod.price.toFixed(2)}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.status === 'In Stock'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : prod.status === 'Low Stock'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {prod.stock} units ({prod.status})
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-400 font-medium">{prod.warehouseLocation}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{prod.rating}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-400">
                    {prod.salesCount.toLocaleString()}
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
