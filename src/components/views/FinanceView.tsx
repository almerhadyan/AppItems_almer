import React from 'react';
import { Wallet, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, ShieldCheck } from 'lucide-react';

export const FinanceView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Finance, Payouts & Taxes</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Gross settlements, payment gateway fee reconciliation, and automated payouts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-2">
          <div className="text-xs text-slate-400">Available Operating Balance</div>
          <div className="text-2xl font-extrabold text-emerald-400">$482,910.50</div>
          <p className="text-[11px] text-slate-400">Ready for automated ACH payout</p>
        </div>

        <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-2">
          <div className="text-xs text-slate-400">Pending Settlement</div>
          <div className="text-2xl font-extrabold text-blue-400">$142,850.00</div>
          <p className="text-[11px] text-slate-400">Scheduled for deposit Jul 23</p>
        </div>

        <div className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-2">
          <div className="text-xs text-slate-400">Monthly Gateway Processing Fees</div>
          <div className="text-2xl font-extrabold text-amber-400">$18,420.00</div>
          <p className="text-[11px] text-slate-400">Avg 1.8% + $0.30 per charge</p>
        </div>
      </div>
    </div>
  );
};
