import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingBag } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { REVENUE_CHART_DATA } from '../../data/mockData';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Business Intelligence & Commerce Analytics</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Cohort retention, sales channel attribution, unit economics, and conversion funnels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Revenue Growth Trend</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#151922', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Daily Orders Volume</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_CHART_DATA}>
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#151922', borderRadius: '12px' }} />
                <Bar dataKey="orders" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
