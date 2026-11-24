import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Truck,
  Package,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import api from '../services/api';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as any) || {};
  const orderType: 'DELIVERY' | 'TAKEAWAY' = state.orderType || 'DELIVERY';
  const couponCode: string | undefined = state.couponCode;
  const initialDiscount: number = state.discountAmount || 0;

  // Form states
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 98765 43210');

  // Address
  const [street, setStreet] = useState('42 Imperial Boulevard, Civil Lines');
  const [city, setCity] = useState('New Delhi');
  const [stateName, setStateName] = useState('Delhi NCR');
  const [postalCode, setPostalCode] = useState('110001');
  const [landmark, setLandmark] = useState('Opposite Heritage Memorial Fountain');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE_RAZORPAY' | 'CASH_ON_DELIVERY'>(
    'ONLINE_RAZORPAY'
  );
  const [specialNotes, setSpecialNotes] = useState('');

  // UI state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const deliveryFee = orderType === 'TAKEAWAY' || subtotal >= 999 ? 0 : 50;
  const effectiveSubtotal = Math.max(0, subtotal - initialDiscount);
  const tax = Math.round(effectiveSubtotal * 0.05);
  const grandTotal = effectiveSubtotal + tax + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    setErrorMessage('');
    setIsPlacingOrder(true);

    try {
      // 1. Submit checkout request
      const orderPayload = {
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        address:
          orderType === 'DELIVERY'
            ? {
                street,
                city,
                state: stateName,
                postalCode,
                landmark,
              }
            : undefined,
        items: items.map((i) => ({
          menuItemId: i.item.id,
          name: i.item.name,
          price: i.item.price,
          quantity: i.quantity,
          customization: i.customization,
        })),
        couponCode,
        paymentMethod,
        notes: specialNotes,
      };

      const res = await api.post('/orders/checkout', orderPayload);

      if (res.data.success && res.data.data) {
        const orderData = res.data.data;
        const orderNumber = orderData.orderNumber;

        // 2. If online payment selected, simulate or execute Razorpay verification
        if (paymentMethod === 'ONLINE_RAZORPAY') {
          // Verify with test transaction signature
          await api.post('/orders/verify-payment', {
            orderNumber,
            razorpayOrderId: orderData.razorpayOrderId || `order_test_${Date.now()}`,
            razorpayPaymentId: `pay_test_${Date.now()}`,
            razorpaySignature: `demo_sig_${Date.now()}`,
          });
        }

        // 3. Clear shopping cart and redirect to live order tracker
        clearCart();
        navigate(`/orders/${orderNumber}/track`, {
          state: { orderJustPlaced: true },
        });
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Failed to place order. Please check inputs.'
      );
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Secure Checkout</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Finalize Your <span className="text-gold-gradient italic font-normal">Imperial Order</span>
          </h1>
          <p className="text-xs sm:text-sm text-royal-muted font-light">
            Enter your destination details and select your preferred payment modality.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Form */}
            <div className="lg:col-span-7 space-y-8">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Step 1: Guest Contact */}
              <div className="bg-royal-charcoal rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-royal-gold text-royal-dark text-xs flex items-center justify-center font-bold font-mono">
                      1
                    </span>
                    Guest Information
                  </h3>
                  {user && (
                    <span className="text-[11px] text-royal-gold font-medium">
                      Logged in as {user.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                    Email Address for Receipt & Tracking *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                  />
                </div>
              </div>

              {/* Step 2: Address or Pickup */}
              <div className="bg-royal-charcoal rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-royal-gold text-royal-dark text-xs flex items-center justify-center font-bold font-mono">
                      2
                    </span>
                    {orderType === 'DELIVERY' ? 'Chauffeur Delivery Destination' : 'Pickup Sanctuary'}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-royal-dark text-royal-gold border border-royal-gold/20 flex items-center gap-1 font-mono">
                    {orderType === 'DELIVERY' ? <Truck className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                    {orderType}
                  </span>
                </div>

                {orderType === 'DELIVERY' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                        Street Address / Estate Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                          State / Region
                        </label>
                        <input
                          type="text"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                          Postal PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1">
                        Landmark / Security Gate Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-royal-dark border border-white/5 space-y-2">
                    <p className="text-xs text-royal-gold font-semibold uppercase tracking-wider">
                      Pickup Location:
                    </p>
                    <p className="text-xs text-white font-medium">
                      Royal Feast Concierge Counter, 42 Imperial Boulevard, Heritage Quarter
                    </p>
                    <p className="text-[11px] text-royal-muted font-light">
                      Your order will be packaged in temperature-regulated insulated luxury boxes ready for collection 30 minutes following order confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-royal-charcoal rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-royal-gold text-royal-dark text-xs flex items-center justify-center font-bold font-mono">
                      3
                    </span>
                    Payment Modality
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Razorpay */}
                  <div
                    onClick={() => setPaymentMethod('ONLINE_RAZORPAY')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'ONLINE_RAZORPAY'
                        ? 'bg-royal-gold/15 border-royal-gold shadow-gold-glow'
                        : 'bg-royal-dark border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-royal-gold" />
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-royal-dark text-royal-gold border border-royal-gold/30">
                        Recommended
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Online via Razorpay Secure
                    </h4>
                    <p className="text-[11px] text-royal-muted font-light leading-relaxed">
                      Instant encrypted payment via Credit Cards, Debit Cards, NetBanking, and UPI.
                    </p>
                  </div>

                  {/* Option 2: Cash on Delivery / Counter */}
                  <div
                    onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'CASH_ON_DELIVERY'
                        ? 'bg-royal-gold/15 border-royal-gold shadow-gold-glow'
                        : 'bg-royal-dark border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Banknote className="w-5 h-5 text-royal-gold" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {orderType === 'DELIVERY' ? 'Cash on Delivery' : 'Pay at Reception Counter'}
                    </h4>
                    <p className="text-[11px] text-royal-muted font-light leading-relaxed">
                      Settle payment in cash or card upon direct receipt from our chauffeur or concierge.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted mb-1 mt-4">
                    Special Culinary or Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Ring doorbell twice, request contactless delivery on tray, cutlery preferences..."
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                  />
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-royal-charcoal rounded-2xl p-6 border border-royal-gold/30 shadow-2xl space-y-5">
                <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center justify-between">
                  <span>Order Items ({items.length})</span>
                  <Link to="/cart" className="text-xs text-royal-gold hover:underline font-sans">
                    Edit Cart
                  </Link>
                </h3>

                {/* Items Preview */}
                <div className="max-h-60 overflow-y-auto divide-y divide-white/5 pr-1">
                  {items.map(({ item, quantity }) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium truncate">{item.name}</p>
                        <p className="text-[11px] text-royal-muted">
                          Qty: {quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <span className="font-mono text-royal-gold font-semibold shrink-0">
                        {formatCurrency(item.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-royal-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-mono">{formatCurrency(subtotal)}</span>
                  </div>

                  {couponCode && initialDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Courtesy ({couponCode})</span>
                      <span className="font-mono">-{formatCurrency(initialDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>GST & Service Levy (5%)</span>
                    <span className="text-white font-mono">{formatCurrency(tax)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Chauffeur Fee</span>
                    <span className="text-white font-mono">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 uppercase text-[10px] font-bold">
                          COMPLIMENTARY
                        </span>
                      ) : (
                        formatCurrency(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-3 flex justify-between items-baseline text-base font-serif font-bold text-white">
                    <span>Grand Total</span>
                    <span className="text-royal-gold font-mono text-xl">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  isLoading={isPlacingOrder}
                  icon={Lock}
                >
                  Place Order • {formatCurrency(grandTotal)}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-royal-muted pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Encrypted Banking & Data Protection</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-1.5 text-xs text-royal-gold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart Overview
                </Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
