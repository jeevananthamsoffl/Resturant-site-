import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Flame, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { MenuItemData, MENU_ITEMS } from '../../data/restaurantData';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface FoodDetailsModalProps {
  item: MenuItemData | null;
  onClose: () => void;
  onSelectRelated?: (item: MenuItemData) => void;
}

export const FoodDetailsModal: React.FC<FoodDetailsModalProps> = ({
  item,
  onClose,
  onSelectRelated,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Royal Fiery'>('Medium');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!item) return null;

  const relatedItems = MENU_ITEMS.filter(
    (i) => i.category === item.category && i.id !== item.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(item, quantity, {
      spiceLevel,
      notes: specialInstructions,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-royal-dark border border-royal-gold/30 rounded-xl overflow-hidden shadow-2xl z-10 my-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:border-royal-gold transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Food Image & Highlights */}
              <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden bg-royal-charcoal">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-dark via-transparent to-transparent md:hidden" />
                <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
                  {item.isVegetarian ? (
                    <Badge variant="veg">Vegetarian</Badge>
                  ) : (
                    <Badge variant="non-veg">Non-Vegetarian</Badge>
                  )}
                  {item.isBestseller && <Badge variant="gold">Bestseller</Badge>}
                </div>
              </div>

              {/* Right Column: Culinary Details & Customizations */}
              <div className="p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto">
                {/* Rating, Reviews, Prep Time & Calories Row */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-royal-muted mb-2 pr-10">
                  <div className="inline-flex items-center gap-1 text-royal-gold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-royal-gold text-royal-gold shrink-0" />
                    <span className="font-semibold text-white">{item.rating.toFixed(1)}</span>
                    <span className="text-royal-muted whitespace-nowrap">({item.reviewsCount} reviews)</span>
                  </div>

                  <span className="text-white/20 select-none">•</span>

                  <div className="inline-flex items-center gap-1 text-royal-muted shrink-0">
                    <Clock className="w-3.5 h-3.5 text-royal-muted/80 shrink-0" />
                    <span className="whitespace-nowrap">{item.prepTimeMinutes} mins</span>
                  </div>

                  <span className="text-white/20 select-none">•</span>

                  <div className="inline-flex items-center gap-1 text-royal-muted shrink-0">
                    <Flame className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                    <span className="whitespace-nowrap">{item.calories} kcal</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold text-white mb-2">{item.name}</h2>
                <p className="text-royal-gold font-mono text-xl font-bold mb-4">
                  {formatCurrency(item.price)}
                </p>

                <p className="text-royal-muted text-sm leading-relaxed mb-6 font-light">
                  {item.description}
                </p>

                {/* Ingredients Showcase */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-white/90 font-medium mb-2.5">
                    Noble Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded bg-royal-charcoal border border-white/5 text-royal-muted"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spice Level Customization */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-white/90 font-medium mb-2.5">
                    Select Spice Profile
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Mild', 'Medium', 'Royal Fiery'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSpiceLevel(level)}
                        className={`text-xs py-2 px-1 rounded text-center transition-all border ${
                          spiceLevel === level
                            ? 'bg-royal-gold/15 border-royal-gold text-royal-gold font-semibold'
                            : 'bg-royal-charcoal border-white/10 text-royal-muted hover:border-white/20'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions Note */}
                <div className="mb-6">
                  <label
                    htmlFor="specialInstructions"
                    className="block text-xs uppercase tracking-wider text-white/90 font-medium mb-1.5"
                  >
                    Chef's Culinary Note (Optional)
                  </label>
                  <input
                    id="specialInstructions"
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="E.g., No cilantro, extra dressing, allergic to nuts"
                    className="w-full text-xs bg-royal-charcoal border border-white/10 rounded px-3 py-2 text-white placeholder-royal-muted/50 focus:outline-none focus:border-royal-gold"
                  />
                </div>

                {/* Quantity and Add to Cart Action */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-4">
                  <div className="flex items-center border border-white/15 rounded bg-royal-charcoal">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-royal-muted hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-semibold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-royal-muted hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    variant="gold"
                    size="md"
                    className="flex-1"
                    onClick={handleAddToCart}
                    icon={isAdded ? Check : ShoppingBag}
                  >
                    {isAdded ? 'Added to Cart' : `Add to Cart • ${formatCurrency(item.price * quantity)}`}
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Food Items Footer */}
            {relatedItems.length > 0 && (
              <div className="p-6 bg-royal-charcoal/40 border-t border-white/10">
                <h4 className="font-serif text-sm font-bold text-white mb-3">
                  Complementary Creations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedItems.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated && onSelectRelated(rel)}
                      className="flex items-center gap-3 p-2 rounded bg-royal-charcoal hover:bg-royal-surface border border-white/5 hover:border-royal-gold/30 cursor-pointer transition-all"
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.name}
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate">{rel.name}</p>
                        <p className="text-[11px] text-royal-gold font-mono">
                          {formatCurrency(rel.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
