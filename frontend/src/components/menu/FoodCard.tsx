import React from 'react';
import { Star, Plus, Eye, Clock, Flame } from 'lucide-react';
import { MenuItemData } from '../../data/restaurantData';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../common/Badge';

interface FoodCardProps {
  item: MenuItemData;
  onViewDetails: (item: MenuItemData) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  return (
    <div
      onClick={() => onViewDetails(item)}
      className="group relative bg-royal-charcoal/80 rounded-lg overflow-hidden border border-white/5 hover:border-royal-gold/40 transition-all duration-300 hover:shadow-gold-glow flex flex-col cursor-pointer"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-royal-dark">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal via-transparent to-transparent opacity-80" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
          {item.isVegetarian ? (
            <Badge variant="veg">Veg</Badge>
          ) : (
            <Badge variant="non-veg">Non-Veg</Badge>
          )}
          {item.isBestseller && <Badge variant="gold">Bestseller</Badge>}
        </div>

        {/* Quick View Pill on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-royal-dark/90 border border-royal-gold text-xs text-white uppercase tracking-wider font-medium">
            <Eye className="w-3.5 h-3.5 text-royal-gold" /> View Details
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating, Prep Time & Calories */}
          <div className="flex items-center justify-between text-xs text-royal-muted mb-2.5 gap-2">
            <div className="inline-flex items-center gap-1 text-royal-gold shrink-0">
              <Star className="w-3.5 h-3.5 fill-royal-gold text-royal-gold shrink-0" />
              <span className="font-semibold text-white">{item.rating.toFixed(1)}</span>
              <span className="text-[11px] text-royal-muted whitespace-nowrap">({item.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] text-royal-muted shrink-0">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3 text-royal-muted/80 shrink-0" />
                <span>{item.prepTimeMinutes}m</span>
              </span>
              <span className="text-white/20 select-none">•</span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Flame className="w-3 h-3 text-amber-500/80 shrink-0" />
                <span>{item.calories} kcal</span>
              </span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-royal-gold transition-colors line-clamp-1 mb-2">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-royal-muted text-xs leading-relaxed line-clamp-2 font-light mb-4">
            {item.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-lg font-bold text-royal-gold">
            {formatCurrency(item.price)}
          </span>

          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-royal-gold/10 hover:bg-royal-gold text-royal-gold hover:text-royal-dark border border-royal-gold/40 hover:border-royal-gold transition-all duration-300 text-xs font-semibold uppercase tracking-wider active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
