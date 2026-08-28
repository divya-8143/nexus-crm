import React, { useState } from 'react';
import { useCrm, SatisfactionLevel } from '../../context/CrmContext';
import { StarRating, SatisfactionBadge } from '../../components/common/StatusBadges';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

export const SatisfactionPage: React.FC = () => {
  const {
    feedbacks,
    customers,
    orders,
    overallSatisfactionPct,
    satisfiedPct,
    neutralPct,
    unsatisfiedPct,
    addFeedback,
  } = useCrm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [product, setProduct] = useState('Wireless Noise-Cancelling Headphones');
  const [rating, setRating] = useState(5);
  const [satisfaction, setSatisfaction] = useState<SatisfactionLevel>('Satisfied');
  const [reviewText, setReviewText] = useState('');

  const handleSaveFeedback = () => {
    if (!reviewText.trim()) return;
    const cust = customers.find((c) => c.id === selectedCustomerId) || customers[0];

    addFeedback({
      customerId: cust.id,
      customerName: cust.name,
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      product,
      rating: Number(rating),
      satisfaction,
      feedback: reviewText,
    });

    setIsModalOpen(false);
    setReviewText('');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Customer Satisfaction & Feedback</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real customer reviews, sentiment breakdown, and delivery feedback
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ Record Customer Feedback</Button>
      </div>

      {/* Main Satisfaction Percentage Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Satisfaction</span>
          <span className="text-4xl font-extrabold text-white mt-2 tracking-tight">
            {overallSatisfactionPct}%
          </span>
          <p className="text-xs text-emerald-400 mt-1">Based on {feedbacks.length} verified customer reviews</p>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Satisfied</span>
            <span>😊</span>
          </div>
          <span className="text-3xl font-extrabold text-emerald-400 mt-2 block">{satisfiedPct}%</span>
          <p className="text-xs text-slate-500 mt-1">Rating 4-5 stars</p>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Neutral</span>
            <span>😐</span>
          </div>
          <span className="text-3xl font-extrabold text-amber-400 mt-2 block">{neutralPct}%</span>
          <p className="text-xs text-slate-500 mt-1">Rating 3 stars</p>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Unsatisfied</span>
            <span>😞</span>
          </div>
          <span className="text-3xl font-extrabold text-rose-400 mt-2 block">{unsatisfiedPct}%</span>
          <p className="text-xs text-slate-500 mt-1">Rating 1-2 stars</p>
        </div>
      </div>

      {/* Customer Feedback Review Feed */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Customer Reviews & Testimonials</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-5 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-sky-400">
                    {fb.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{fb.customerName}</h4>
                    <p className="text-[11px] text-slate-500">{fb.product} • {fb.date}</p>
                  </div>
                </div>

                <StarRating rating={fb.rating} />
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850 italic">
                "{fb.feedback}"
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-mono">Ref: {fb.orderId}</span>
                <SatisfactionBadge satisfaction={fb.satisfaction} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Feedback Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Customer Satisfaction Feedback"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveFeedback}>Submit Feedback</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Product Ordered"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Satisfaction Rating (1-5 Stars)
              </label>
              <select
                value={rating}
                onChange={(e) => {
                  const r = Number(e.target.value);
                  setRating(r);
                  setSatisfaction(r >= 4 ? 'Satisfied' : r === 3 ? 'Neutral' : 'Unsatisfied');
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="5">5 Stars (Very Satisfied)</option>
                <option value="4">4 Stars (Satisfied)</option>
                <option value="3">3 Stars (Neutral)</option>
                <option value="2">2 Stars (Unsatisfied)</option>
                <option value="1">1 Star (Very Unsatisfied)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Satisfaction Level
              </label>
              <select
                value={satisfaction}
                onChange={(e) => setSatisfaction(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Satisfied">Satisfied</option>
                <option value="Neutral">Neutral</option>
                <option value="Unsatisfied">Unsatisfied</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Customer Feedback / Review Comments
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Product quality is very good and delivery was on time."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
