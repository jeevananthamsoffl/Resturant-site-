import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Truck,
  Package,
  ShoppingBag,
  MapPin,
  RefreshCw,
  Phone,
  Sparkles,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import api from '../services/api';

export const OrderTrackingPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrder = async () => {
    if (!orderNumber) return;
    try {
      setIsRefreshing(true);
      const res = await api.get(`/orders/${orderNumber}/track`);
      if (res.data.success && res.data.data) {
        setOrder(res.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Could not locate order details');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderNumber]);

  const stages = [
    { key: 'PENDING', label: 'Order Transmitted', icon: Clock, desc: 'Awaiting kitchen reception' },
    { key: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle2, desc: 'Ingredients inspected & staged' },
    { key: 'PREPARING', label: 'Simmering & Plating', icon: ChefHat, desc: 'Executive chefs crafting course' },
    { key: 'READY', label: 'Packaging Sealed', icon: Package, desc: 'Insulated luxury container prepared' },
    { key: 'OUT_FOR_DELIVERY', label: 'Chauffeur in Transit', icon: Truck, desc: 'En route to your estate' },
    { key: 'COMPLETED', label: 'Delivered', icon: Sparkles, desc: 'Hospitality completed' },
  ];

  const getStageIndex = (status: string) => {
    const idx = stages.findIndex((s) => s.key === status);
    return idx === -1 ? 1 : idx;
  };

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-[75vh] flex items-center justify-center bg-royal-dark text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-royal-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-royal-gold">Contacting Royal Dispatch...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-28 pb-20 min-h-[75vh] flex items-center justify-center px-4 bg-royal-dark text-white">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-royal-charcoal border border-white/10 shadow-2xl space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-white">Order Not Found</h2>
          <p className="text-xs text-royal-muted leading-relaxed font-light">
            We could not find records matching identifier <strong className="text-white">{orderNumber}</strong>.
            Please verify the number in your email receipt.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link to="/track-order">
              <Button variant="outline" size="sm">
                Try Another Number
              </Button>
            </Link>
            <Link to="/">
              <Button variant="gold" size="sm">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStageIdx = getStageIndex(order.status);

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Live Dispatch Dispatcher</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Order <span className="text-gold-gradient italic font-normal">{order.orderNumber}</span>
          </h1>
          <p className="text-xs sm:text-sm text-royal-muted font-light">
            Placed on {formatDate(order.createdAt)} • Live Kitchen Tracking
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Visual Timeline Card */}
        <div className="bg-royal-charcoal rounded-2xl p-6 sm:p-10 border border-royal-gold/30 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-wider text-royal-muted block mb-1">
                Current Kitchen Lifecycle
              </span>
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-wider">
                  {order.status.replace(/_/g, ' ')}
                </h3>
                <span
                  className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                    order.paymentStatus === 'PAID'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  Payment: {order.paymentStatus}
                </span>
              </div>
            </div>

            <button
              onClick={fetchOrder}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-dark text-royal-gold hover:bg-royal-gold/10 border border-royal-gold/30 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isPast = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              return (
                <div key={stage.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-royal-gold text-royal-dark font-bold shadow-gold-glow scale-110'
                        : isPast
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-400'
                        : 'bg-royal-dark border border-white/10 text-white/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-royal-gold'
                          : isPast
                          ? 'text-white'
                          : 'text-white/40'
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p className="text-[10px] text-royal-muted leading-tight font-light hidden sm:block mt-0.5">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Receipt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Itemized Receipt */}
          <div className="md:col-span-7 bg-royal-charcoal rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-royal-gold" />
              Gastronomic Course Summary
            </h3>

            <div className="divide-y divide-white/5">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-medium text-white text-sm">
                      {item.nameSnapshot || item.name}
                    </h4>
                    <p className="text-royal-muted text-[11px] mt-0.5">
                      Quantity: <strong className="text-white">{item.quantity}</strong> × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <span className="font-mono text-royal-gold font-semibold text-sm">
                    {formatCurrency(item.subtotal || item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-royal-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-mono">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Courtesy Discount ({order.couponCode || 'PROMO'})</span>
                  <span className="font-mono">-{formatCurrency(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes & GST (5%)</span>
                <span className="text-white font-mono">{formatCurrency(order.taxAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Chauffeur Delivery Fee</span>
                <span className="text-white font-mono">
                  {order.deliveryFee === 0 ? 'COMPLIMENTARY' : formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-base font-serif font-bold text-white">
                <span>Total Amount</span>
                <span className="text-royal-gold font-mono text-xl">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Customer & Delivery Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-royal-charcoal rounded-2xl p-6 border border-white/10 shadow-xl space-y-4 text-xs">
              <h3 className="font-serif text-base font-bold text-white border-b border-white/10 pb-3">
                Recipient Details
              </h3>

              <div className="space-y-2">
                <p className="text-royal-muted">
                  Recipient Name: <strong className="text-white">{order.customerName}</strong>
                </p>
                <p className="text-royal-muted">
                  Contact Phone: <strong className="text-white">{order.customerPhone}</strong>
                </p>
                <p className="text-royal-muted">
                  Email: <strong className="text-white">{order.customerEmail}</strong>
                </p>
                <p className="text-royal-muted">
                  Fulfillment Type: <strong className="text-royal-gold uppercase">{order.orderType}</strong>
                </p>
              </div>

              {order.address && (
                <div className="pt-3 border-t border-white/10 space-y-1">
                  <span className="text-royal-gold uppercase font-semibold text-[10px] block mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Destination Address
                  </span>
                  <p className="text-white font-medium">{order.address.street}</p>
                  <p className="text-royal-muted">
                    {order.address.city}, {order.address.state} – {order.address.postalCode}
                  </p>
                  {order.address.landmark && (
                    <p className="text-royal-muted text-[11px] italic">
                      Landmark: {order.address.landmark}
                    </p>
                  )}
                </div>
              )}

              {order.notes && (
                <div className="pt-3 border-t border-white/10">
                  <span className="text-royal-muted uppercase text-[10px] block mb-0.5 font-medium">
                    Culinary Instructions:
                  </span>
                  <p className="text-white italic bg-royal-dark/60 p-2.5 rounded border border-white/5">
                    "{order.notes}"
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-royal-dark border border-royal-gold/30 text-center space-y-2">
              <p className="text-xs text-white font-medium">Need immediate assistance with this order?</p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-1.5 text-xs text-royal-gold uppercase tracking-wider font-semibold hover:underline"
              >
                <Phone className="w-3.5 h-3.5" /> Contact Dispatch Concierge
              </a>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-royal-gold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Digital Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
