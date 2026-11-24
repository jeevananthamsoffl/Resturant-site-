import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
  } = useCart();

  const freeDeliveryThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-royal-dark border-l border-royal-gold/20 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-royal-charcoal/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-royal-gold/15 flex items-center justify-center border border-royal-gold/40">
                    <ShoppingBag className="w-4 h-4 text-royal-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Your Royal Order</h3>
                    <p className="text-xs text-royal-muted">
                      {itemCount} {itemCount === 1 ? 'delicacy' : 'delicacies'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-royal-muted hover:text-white transition-colors rounded-full hover:bg-white/5"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              {items.length > 0 && (
                <div className="bg-royal-charcoal/80 px-6 py-3 border-b border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    {subtotal >= freeDeliveryThreshold ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Complimentary Royal Delivery Unlocked!
                      </span>
                    ) : (
                      <span className="text-royal-muted">
                        Add <strong className="text-royal-gold">{formatCurrency(amountNeeded)}</strong> for Complimentary Delivery
                      </span>
                    )}
                    <span className="text-white/60 font-mono text-[10px]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-royal-gold transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-royal-charcoal flex items-center justify-center border border-royal-gold/20 text-royal-gold">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-white">Your Cart is Empty</h4>
                    <p className="text-xs text-royal-muted max-w-xs font-light">
                      Explore our gastronomic menu and treat yourself to royal culinary creations.
                    </p>
                    <Link to="/menu" onClick={() => setIsCartOpen(false)}>
                      <Button variant="gold" size="sm">
                        Explore Our Menu
                      </Button>
                    </Link>
                  </div>
                ) : (
                  items.map(({ item, quantity }) => (
                    <div key={item.id} className="py-4 flex gap-4 items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover border border-royal-gold/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/40 hover:text-rose-400 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-royal-gold font-mono font-medium mt-0.5">
                          {formatCurrency(item.price)}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-white/10 rounded bg-royal-charcoal">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="px-2 py-0.5 text-royal-muted hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-white">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="px-2 py-0.5 text-royal-muted hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs text-royal-muted font-light ml-auto">
                            {formatCurrency(item.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {items.length > 0 && (
                <div className="border-t border-royal-gold/20 bg-royal-charcoal/90 px-6 py-5 space-y-3">
                  <div className="space-y-1.5 text-xs text-royal-muted">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-mono">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & GST (5%)</span>
                      <span className="text-white font-mono">{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Concierge</span>
                      <span className="text-white font-mono">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 uppercase text-[10px] font-bold">
                            FREE
                          </span>
                        ) : (
                          formatCurrency(deliveryFee)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                      <span>Grand Total</span>
                      <span className="text-royal-gold font-mono">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block pt-2"
                  >
                    <Button variant="gold" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
