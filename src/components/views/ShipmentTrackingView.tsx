import React, { useState } from 'react';
import {
  Truck,
  ArrowLeft,
  Copy,
  Check,
  Package,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Box,
  Building2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Order } from '../../types';

interface ShipmentTrackingViewProps {
  order: Order;
  onBack: () => void;
}

export const ShipmentTrackingView: React.FC<ShipmentTrackingViewProps> = ({ order, onBack }) => {
  const [copiedTracking, setCopiedTracking] = useState(false);

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const stages = [
    { title: 'Order Created', icon: Box },
    { title: 'Payment Confirmed', icon: ShieldCheck },
    { title: 'Packed', icon: Package },
    { title: 'Courier Pickup', icon: Truck },
    { title: 'In Transit', icon: Clock },
    { title: 'Distribution Center', icon: Building2 },
    { title: 'Out for Delivery', icon: MapPin },
    { title: 'Delivered', icon: CheckCircle2 },
  ];

  // Map shippingStatus to current stage index
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 7;
      case 'Out for Delivery':
        return 6;
      case 'Distribution Center':
        return 5;
      case 'In Transit':
        return 4;
      case 'Courier Pickup':
        return 3;
      case 'Packing':
        return 2;
      case 'Pending':
        return 1;
      default:
        return 4; // Default middle stage for active shipments
    }
  };

  const currentStageIndex = getStageIndex(order.shippingStatus);
  const progressPercentage = Math.round(((currentStageIndex + 1) / stages.length) * 100);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-[#151922] hover:bg-[#232B3E] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-extrabold text-white tracking-tight">Shipment Tracking</h1>
              <span className="text-xs px-3 py-1 rounded-full font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>{order.shippingStatus}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live Courier Telemetry • Order {order.orderNumber} • Destination: {order.customer.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#151922] px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Tracking Code:</span>
            <span className="text-xs font-mono font-bold text-white">{order.trackingNumber}</span>
            <button
              onClick={handleCopyTracking}
              className="p-1 text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              {copiedTracking ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN 4: HORIZONTAL TIMELINE & PROGRESS BAR */}
      <div className="bg-[#1B2130] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-400">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Courier Service</div>
              <div className="text-lg font-extrabold text-white">{order.courier}</div>
              <div className="text-xs text-slate-300 mt-0.5">Air Cargo Priority • Signature Required</div>
            </div>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Delivery Arrival</div>
            <div className="text-xl font-extrabold text-emerald-400">{order.expectedDelivery}</div>
            <div className="text-xs text-slate-400 mt-0.5">On Schedule • Clear Transit Window</div>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300">Live Progress Trajectory</span>
            <span className="text-blue-400">{progressPercentage}% Completed</span>
          </div>

          <div className="w-full bg-[#151922] h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-lg shadow-blue-500/50"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Horizontal Stages Stepper */}
        <div className="overflow-x-auto pt-4 pb-2">
          <div className="flex items-start justify-between min-w-[900px] relative">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCompleted = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div key={idx} className="flex flex-col items-center text-center w-28 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110 shadow-blue-500/50'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#151922] text-slate-500 border border-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`text-xs font-bold mt-3 leading-tight ${
                      isCurrent ? 'text-blue-400' : isCompleted ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {stage.title}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono mt-1">
                    {isCompleted ? 'Verified' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Package Specs & Detailed Transit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Package Specs Card */}
        <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
            Package Dimensions & Origin
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Total Package Weight</span>
              <span className="text-white font-bold">4.2 kg (9.25 lbs)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Box Dimensions</span>
              <span className="text-white font-mono">42 × 30 × 18 cm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Dispatch Facility</span>
              <span className="text-white font-medium">Seattle Central Hub (Bay 4A)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Insurance Value</span>
              <span className="text-emerald-400 font-bold">${order.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Live Carrier Event Logs */}
        <div className="lg:col-span-2 bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
            Live Carrier Scan History ({order.courier})
          </h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {order.timeline.map((event, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#151922] border border-white/5 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{event.title}</span>
                    {event.current && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                        Current Location
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{event.description}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono shrink-0">{event.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
