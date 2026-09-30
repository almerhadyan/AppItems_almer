import React from 'react';
import { Settings, Key, Truck, ShieldCheck, Globe, Bell, Lock } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Platform Configuration & API Integration</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Store settings, shipping carrier API credentials, team RBAC permissions, and webhooks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Config */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Globe className="w-4 h-4" />
            <span>Store Profile</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue="Vendora Commerce Global Inc."
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Primary Currency</label>
              <select defaultValue="USD" className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none">
                <option value="USD">USD ($ - United States Dollar)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
                <option value="JPY">JPY (¥ - Japanese Yen)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Support Email</label>
              <input
                type="email"
                defaultValue="support@vendora.io"
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Carrier Integrations */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Truck className="w-4 h-4" />
            <span>Carrier APIs</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#151922] rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">FedEx Web Services</div>
                <div className="text-[10px] text-slate-400 font-mono">Account: #992014812</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                Connected
              </span>
            </div>

            <div className="p-3 bg-[#151922] rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">DHL Express Global</div>
                <div className="text-[10px] text-slate-400 font-mono">Account: #DHL-881203</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                Connected
              </span>
            </div>

            <div className="p-3 bg-[#151922] rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">UPS Developer API</div>
                <div className="text-[10px] text-slate-400 font-mono">Account: #UPS-10293</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* API Secret Keys */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Key className="w-4 h-4" />
            <span>Production API Keys</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Live Secret Key</label>
              <input
                type="password"
                defaultValue="sk_live_992810481902849182049182"
                readOnly
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 font-mono text-slate-400 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Webhook Endpoint</label>
              <input
                type="text"
                defaultValue="https://api.vendora.io/v1/webhooks/orders"
                readOnly
                className="w-full bg-[#151922] border border-white/10 rounded-xl px-3 py-2 font-mono text-slate-400 text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
