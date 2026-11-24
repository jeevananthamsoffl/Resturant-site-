import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  X,
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import api from '../../services/api';

export const AdminCouponsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [minOrderValue, setMinOrderValue] = useState<number>(1000);
  const [maxDiscount, setMaxDiscount] = useState<number | ''>(500);
  const [validUntil, setValidUntil] = useState('2028-12-31');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/coupons');
      if (res.data.success) {
        setCoupons(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const res = await api.patch(`/admin/coupons/${id}/status`);
      if (res.data.success) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
        );
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to toggle coupon');
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !description) {
      setFormError('Coupon code and description are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');
      const payload: any = {
        code: code.toUpperCase().trim(),
        description: description.trim(),
        discountType,
        discountValue: Number(discountValue),
        minOrderValue: Number(minOrderValue),
        validUntil,
      };

      if (discountType === 'PERCENTAGE' && maxDiscount) {
        payload.maxDiscount = Number(maxDiscount);
      }

      const res = await api.post('/admin/coupons', payload);
      if (res.data.success) {
        setCoupons((prev) => [res.data.data, ...prev]);
        setIsModalOpen(false);
        setCode('');
        setDescription('');
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.message || 'Failed to issue coupon');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            Privilege & Courtesy Incentives
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">Vouchers & Promotional Codes</h1>
          <p className="text-sm text-neutral-400">
            Design targeted promotional campaigns, degustation courtesies, and minimum spend vouchers.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="gold" className="self-start">
          <Plus className="w-4 h-4 mr-2" />
          Issue New Voucher
        </Button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-[#C6A15B]/40 transition-all relative overflow-hidden"
          >
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#C6A15B]/5 rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/30 border border-amber-800/50 rounded-lg text-sm font-mono font-bold text-[#DFBE79]">
                  <Tag className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{c.code}</span>
                </div>
                <Badge variant={c.isActive ? 'gold' : 'neutral'}>
                  {c.isActive ? 'Active Privileges' : 'Suspended'}
                </Badge>
              </div>

              <div className="text-2xl font-serif text-white mb-2">
                {c.discountType === 'PERCENTAGE'
                  ? `${c.discountValue}% OFF`
                  : `₹${c.discountValue} OFF`}
              </div>

              <p className="text-sm text-neutral-400 mb-4">{c.description}</p>

              <div className="space-y-1.5 text-xs text-neutral-400 pt-3 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span>Minimum Spend:</span>
                  <span className="text-white font-mono">{formatCurrency(c.minOrderValue)}</span>
                </div>
                {c.maxDiscount && (
                  <div className="flex justify-between">
                    <span>Discount Cap:</span>
                    <span className="text-white font-mono">{formatCurrency(c.maxDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Valid Through:</span>
                  <span className="text-neutral-300">
                    {formatDate(c.validUntil, 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono">ID: {c.id}</span>
              <button
                onClick={() => handleToggle(c.id)}
                className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                  c.isActive
                    ? 'bg-neutral-800 hover:bg-rose-950/60 hover:text-rose-400 border-neutral-700'
                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800'
                }`}
              >
                {c.isActive ? 'Disable Code' : 'Enable Code'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Issue Voucher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                Promotional Campaign
              </span>
              <h2 className="text-2xl font-serif text-white mt-1">
                Issue Dining Voucher
              </h2>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Voucher Code *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. MONARCH30"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Courtesy Narrative / Description *
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 30% reduction on royal banquet degustation"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Discount Structure
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Flat Currency (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Discount Magnitude
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    min={1}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Minimum Order Subtotal (₹)
                  </label>
                  <input
                    type="number"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(parseFloat(e.target.value) || 0)}
                    min={0}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    value={maxDiscount}
                    onChange={(e) =>
                      setMaxDiscount(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    placeholder="Optional cap"
                    disabled={discountType === 'FIXED'}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B] disabled:opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" disabled={isSubmitting}>
                  {isSubmitting ? 'Issuing...' : 'Authorize Voucher'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
