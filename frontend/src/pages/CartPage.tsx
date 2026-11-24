import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Check,
  ArrowLeft,
  Utensils,
  Truck,
  Package,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatters';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import api from '../services/api';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    itemCount,
  } = useCart();

  const navigate = useNavigate();

  // Coupon state
  const [couponCode, setCouponCode] = useState('ROYAL20');
  const [appliedCoupon, setAppliedCoupon] = useState<null | {
    code: string;
    discount: number;
    description: string;
  }>(null);
  const [couponError, setCouponError] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Order fulfillment toggle
  const [orderType, setOrderType] = useState<'DELIVERY' | 'TAKEAWAY'>('DELIVERY');

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError('');
    setIsValidatingCoupon(true);

    try {
      const res = await api.post('/coupons/validate', {
        code: couponCode.trim(),
        subtotal,
      });
      if (res.data.success && res.data.data) {
        setAppliedCoupon(res.data.data);
      }
    } catch (err: any) {
      setCouponError(err.response?.data?.message || err.message || 'Invalid coupon code');
      setAppliedCoupon(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const effectiveDeliveryFee = orderType === 'TAKEAWAY' ? 0 : deliveryFee;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const effectiveSubtotal = Math.max(0, subtotal - discountAmount);
  const effectiveTax = Math.round(effectiveSubtotal * 0.05);
  const grandTotal = effectiveSubtotal + effectiveTax + effectiveDeliveryFee;

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-[75vh] flex items-center justify-center px-4 bg-royal-dark text-white">
        <div className="max-w-md w-full text-center p-10 rounded-2xl bg-royal-charcoal border border-royal-gold/20 shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mx-auto">
            <ShoppingBag className="w-8 h-8 opacity-60" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-royal-muted leading-relaxed font-light">
            You have not added any royal delicacies to your order yet. Explore our handcrafted
            menu and discover award-winning courses.
          </p>
          <div className="pt-2">
            <Link to="/menu">
              <Button variant="gold" size="md" icon={Utensils} iconPosition="left">
                Explore Digital Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Bespoke Dining Order</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Your Selected <span className="text-gold-gradient italic font-normal">Delicacies</span>
          </h1>
          <p className="text-xs sm:text-sm text-royal-muted font-light">
            Review your gourmet selections, apply promotional courtesies, and proceed to checkout.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Fulfillment Type Toggle */}
            <div className="p-4 rounded-xl bg-royal-charcoal border border-white/5 flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider text-royal-muted font-medium">
                Dining Fulfillment Method:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('DELIVERY')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                    orderType === 'DELIVERY'
                      ? 'bg-royal-gold text-royal-dark border-royal-gold shadow-gold-glow'
                      : 'bg-royal-dark text-royal-muted border-white/10 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" /> Chauffeur Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('TAKEAWAY')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                    orderType === 'TAKEAWAY'
                      ? 'bg-royal-gold text-royal-dark border-royal-gold shadow-gold-glow'
                      : 'bg-royal-dark text-royal-muted border-white/10 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" /> Royal Pickup
                </button>
              </div>
            </div>

            {/* Delicacies Table */}
            <div className="bg-royal-charcoal rounded-2xl border border-white/10 overflow-hidden shadow-xl divide-y divide-white/5">
              <div className="px-6 py-4 bg-royal-dark/60 flex items-center justify-between text-xs text-royal-muted uppercase tracking-wider font-medium">
                <span>Course Details ({itemCount} items)</span>
                <button
                  onClick={clearCart}
                  className="text-white/40 hover:text-rose-400 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {items.map(({ item, quantity, customization }) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border border-royal-gold/20 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.isVegetarian ? (
                          <Badge variant="veg">Veg</Badge>
                        ) : (
                          <Badge variant="non-veg">Non-Veg</Badge>
                        )}
                        <span className="text-[11px] text-royal-gold font-mono uppercase">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-royal-gold font-mono font-medium">
                        {formatCurrency(item.price)} each
                      </p>

                      {customization?.spiceLevel && (
                        <p className="text-[11px] text-royal-muted mt-1">
                          Spice Profile: <strong className="text-white">{customization.spiceLevel}</strong>
                          {customization.notes && ` • Note: "${customization.notes}"`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
                    <div className="flex items-center border border-white/10 rounded bg-royal-dark">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="px-2.5 py-1 text-royal-muted hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="px-2.5 py-1 text-royal-muted hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="font-mono text-sm font-bold text-white">
                        {formatCurrency(item.price * quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/30 hover:text-rose-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Return Link */}
            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-royal-gold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Browsing Menu
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Application Box */}
            <div className="bg-royal-charcoal rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-royal-gold">
                <Tag className="w-4 h-4" />
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                  Promotion Code
                </h3>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. ROYAL20)"
                  className="flex-1 bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-royal-gold"
                />
                <button
                  type="submit"
                  disabled={isValidatingCoupon}
                  className="px-4 py-2 rounded-lg bg-royal-gold/15 text-royal-gold hover:bg-royal-gold hover:text-royal-dark border border-royal-gold/40 text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isValidatingCoupon ? 'Checking...' : 'Apply'}
                </button>
              </form>

              {couponError && (
                <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900">
                  {couponError}
                </p>
              )}

              {appliedCoupon && (
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5" /> {appliedCoupon.code} applied!
                  </span>
                  <span className="font-mono font-bold">
                    -{formatCurrency(appliedCoupon.discount)}
                  </span>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-royal-charcoal rounded-2xl p-6 border border-royal-gold/30 shadow-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3">
                Order Grand Summary
              </h3>

              <div className="space-y-2.5 text-xs text-royal-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">{formatCurrency(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST & Applicable Charges (5%)</span>
                  <span className="text-white font-mono">{formatCurrency(effectiveTax)}</span>
                </div>

                <div className="flex justify-between">
                  <span>
                    {orderType === 'DELIVERY' ? 'Chauffeur Delivery' : 'Pickup Surcharge'}
                  </span>
                  <span className="text-white font-mono">
                    {effectiveDeliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">
                        COMPLIMENTARY
                      </span>
                    ) : (
                      formatCurrency(effectiveDeliveryFee)
                    )}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between items-baseline text-base font-serif font-bold text-white">
                  <span>Total Payable</span>
                  <span className="text-royal-gold font-mono text-xl">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    navigate('/checkout', {
                      state: {
                        couponCode: appliedCoupon?.code,
                        orderType,
                        discountAmount,
                      },
                    })
                  }
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Proceed to Checkout
                </Button>
              </div>

              <p className="text-[10px] text-center text-royal-muted font-light pt-2">
                Secure 256-bit encrypted checkout. All dietary restrictions respected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
