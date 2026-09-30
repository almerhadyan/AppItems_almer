import React from 'react';
import { Star, MessageSquare, ThumbsUp, ShieldCheck } from 'lucide-react';
import { CustomerReview } from '../../types';

interface ReviewsViewProps {
  reviews: CustomerReview[];
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ reviews }) => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-[#1B2130] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Customer Product Reviews</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Verified buyer feedback, rating sentiment, and social proof management
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#1B2130] p-5 rounded-2xl border border-white/10 shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={rev.customerAvatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-xs font-bold text-white">{rev.customerName}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-200 italic leading-relaxed">"{rev.comment}"</p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <img src={rev.productImage} alt="" className="w-6 h-6 rounded object-cover" />
                <span className="font-semibold text-slate-300">{rev.productName}</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Verified Purchase
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
