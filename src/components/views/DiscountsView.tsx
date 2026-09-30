import React from 'react';
import { Percent, Plus, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { DiscountCoupon } from '../../types';

interface DiscountsViewProps {
  discounts: DiscountCoupon[];
}

export const DiscountsView: React.FC<DiscountsViewProps> = ({ discounts }) => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Marketing Coupons & Promo Codes</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure discount rules, promotional coupon campaigns, and usage limits
          </p>
        </div>

        <button
          onClick={() => alert('Create Coupon wizard initialized!')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {discounts.map((disc) => (
          <div
            key={disc.id}
            className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-lg text-blue-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/20">
                {disc.code}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  disc.status === 'Active'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {disc.status}
              </span>
            </div>

            <div className="text-xs text-slate-300">
              Discount:{' '}
              <span className="font-bold text-white">
                {disc.discountType === 'percentage' ? `${disc.value}% OFF` : `$${disc.value} OFF`}
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Usage Progress</span>
                <span className="text-white font-mono font-bold">
                  {disc.usageCount} / {disc.usageLimit}
                </span>
              </div>
              <div className="w-full bg-[#151922] h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${(disc.usageCount / disc.usageLimit) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between font-mono">
              <span>Expires: {disc.expiryDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
