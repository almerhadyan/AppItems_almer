import React, { useState } from 'react';
import {
  DollarSign,
  ShoppingBag,
  Users,
  PackageCheck,
  Clock,
  RotateCcw,
  TrendingUp,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Layers,
  Activity,
  Boxes
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  REVENUE_CHART_DATA,
  CATEGORIES_CHART_DATA,
  ORDERS_BY_STATUS_DATA,
} from '../../data/mockData';
import { Order, Product } from '../../types';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  onSelectOrder: (order: Order) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  onSelectOrder,
  onNavigateTab,
}) => {
  const [timeRange, setTimeRange] = useState<'Today' | '7D' | '30D' | 'YTD'>('30D');

  const stats = [
    {
      title: 'Gross Revenue',
      value: '$1,284,920.00',
      change: '+18.4%',
      positive: true,
      icon: DollarSign,
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
      subtitle: 'vs. $1,085,200 last month',
    },
    {
      title: 'Total Orders',
      value: '14,290',
      change: '+12.1%',
      positive: true,
      icon: ShoppingBag,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      subtitle: '98.2% fulfillment rate',
    },
    {
      title: 'Active Customers',
      value: '38,420',
      change: '+8.6%',
      positive: true,
      icon: Users,
      color: 'from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30',
      subtitle: '34.2% repeat buyers',
    },
    {
      title: 'Products Sold',
      value: '42,100',
      change: '+24.5%',
      positive: true,
      icon: PackageCheck,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      subtitle: 'Across 4 global warehouses',
    },
    {
      title: 'Pending Orders',
      value: `${orders.filter((o) => o.orderStatus === 'Processing' || o.orderStatus === 'Pending').length + 178}`,
      change: '-4.2%',
      positive: true,
      icon: Clock,
      color: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
      subtitle: 'Avg processing time: 1.4 hrs',
    },
    {
      title: 'Refund Volume',
      value: '$12,450.00',
      change: '-1.8%',
      positive: true,
      icon: RotateCcw,
      color: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
      subtitle: '0.96% refund rate',
    },
    {
      title: 'Avg Order Value (AOV)',
      value: '$142.80',
      change: '+5.4%',
      positive: true,
      icon: TrendingUp,
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30',
      subtitle: 'Target: $150.00',
    },
    {
      title: 'Conversion Rate',
      value: '3.42%',
      change: '+0.45%',
      positive: true,
      icon: Percent,
      color: 'from-emerald-500/20 to-green-500/10 text-emerald-400 border-emerald-500/30',
      subtitle: 'Checkout abandon: 22.1%',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Executive Dashboard
            </span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            <span className="text-[11px] text-slate-400">Live Telemetry Sync</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
            Enterprise Commerce Overview
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time analytics across global storefronts, fulfillment nodes, and multi-currency orders
          </p>
        </div>

        {/* Time range selector & quick action */}
        <div className="flex items-center gap-3">
          <div className="bg-[#151922] p-1 rounded-xl border border-white/10 flex items-center gap-1 text-xs font-medium">
            {(['Today', '7D', '30D', 'YTD'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-blue-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('reports')}
            className="flex items-center gap-2 bg-[#151922] hover:bg-[#232B3E] text-white px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 8 Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-200 shadow-lg relative group overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">{stat.title}</p>
                  <h3 className="text-xl font-bold text-white mt-1 tracking-tight">{stat.value}</h3>
                </div>

                <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
                <span className="text-[10px] text-slate-400 truncate max-w-[140px]">{stat.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section 1: Revenue Line/Area Chart + Category Revenue Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-2 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Revenue Performance & Order Trajectory</span>
              </h2>
              <p className="text-xs text-slate-400">Monthly revenue velocity vs daily order volume</p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-slate-300">Revenue ($)</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151922',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Categories Pie Chart */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Revenue by Product Category</span>
            </h2>
            <p className="text-xs text-slate-400">Distribution across primary catalog categories</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORIES_CHART_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORIES_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151922',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                  formatter={(value) => [`${value}% Share`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
            {CATEGORIES_CHART_DATA.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-slate-300 truncate">{cat.name}</span>
                <span className="text-white font-bold ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Orders by Status Bar Chart & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status Bar Chart */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Orders Fulfillment Distribution</span>
              </h2>
              <p className="text-xs text-slate-400">Active order status breakdown in fulfillment pipeline</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-blue-400 hover:underline"
            >
              View Orders →
            </button>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ORDERS_BY_STATUS_DATA} layout="vertical">
                <XAxis type="number" stroke="#64748B" fontSize={11} hide />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={90} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151922',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={20}>
                  {ORDERS_BY_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Boxes className="w-4 h-4 text-cyan-400" />
                <span>Top Performing Products</span>
              </h2>
              <p className="text-xs text-slate-400">Highest grossing catalog items this month</p>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-blue-400 hover:underline"
            >
              Catalog →
            </button>
          </div>

          <div className="divide-y divide-white/5 overflow-x-auto">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{product.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {product.sku} • {product.salesCount} units sold
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400">
                    ${(product.price * product.salesCount).toLocaleString()}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      product.status === 'In Stock'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Live Feed */}
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Live Order Operations Activity</h2>
            <p className="text-xs text-slate-400">Real-time order status updates and dispatch feeds</p>
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Manage All Orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151922] text-slate-400 border-b border-white/10 uppercase text-[10px] font-semibold">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Shipping</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className="hover:bg-blue-600/10 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-blue-400">{order.orderNumber}</td>
                  <td className="p-3 font-semibold text-white flex items-center gap-2">
                    <img
                      src={order.customer.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{order.customer.name}</span>
                  </td>
                  <td className="p-3 text-slate-400">{order.orderDate}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      {order.shippingStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-white">${order.grandTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
