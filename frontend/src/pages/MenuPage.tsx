import React, { useState, useMemo } from 'react';
import { Search, Utensils, X } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItemData } from '../data/restaurantData';
import { FoodCard } from '../components/menu/FoodCard';
import { FoodDetailsModal } from '../components/menu/FoodDetailsModal';
import { Badge } from '../components/common/Badge';

export const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);

  // Filtered and sorted menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Dietary filter
      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'veg' && item.isVegetarian) ||
        (dietaryFilter === 'non-veg' && !item.isVegetarian);

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDietary && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured (bestsellers first, then rating)
      return Number(b.isBestseller) - Number(a.isBestseller) || b.rating - a.rating;
    });
  }, [selectedCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* 1. Page Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge variant="gold" size="md">
            The Digital Gastronomy
          </Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            A La Carte & <span className="text-gold-gradient italic font-normal">Royal Curations</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base text-royal-muted leading-relaxed font-light">
            Every dish is an exploration of sensory excellence. Handcrafted daily with single-estate
            spices, pristine seafood, and slow charcoal roasting.
          </p>
        </div>
      </section>

      {/* 2. Search & Controls Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-royal-charcoal/90 rounded-xl p-4 sm:p-6 border border-royal-gold/20 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, truffles, saffron, lobster..."
                className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-royal-muted focus:outline-none focus:border-royal-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-royal-muted hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-royal-dark rounded-lg border border-white/10 self-stretch md:self-auto justify-center">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
                  dietaryFilter === 'all'
                    ? 'bg-royal-gold text-royal-dark font-semibold'
                    : 'text-royal-muted hover:text-white'
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-emerald-400/80 hover:text-emerald-400'
                }`}
              >
                Veg Only
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-700 text-white font-semibold'
                    : 'text-rose-400/80 hover:text-rose-400'
                }`}
              >
                Non-Veg Only
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs text-royal-muted hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-gold cursor-pointer"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/5">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-royal-gold text-royal-dark font-semibold shadow-gold-glow'
                      : 'bg-royal-dark/80 text-royal-muted hover:text-white hover:border-royal-gold/40 border border-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Food Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 text-xs text-royal-muted">
          <span>
            Showing <strong className="text-white">{filteredItems.length}</strong> culinary curations
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-royal-gold hover:underline"
            >
              Reset to all categories
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-royal-charcoal/40 rounded-2xl border border-white/5">
            <Utensils className="w-12 h-12 text-royal-gold/40 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-white">No Dishes Found</h3>
            <p className="text-xs text-royal-muted max-w-sm mx-auto font-light">
              We couldn't find culinary creations matching your filters. Try adjusting your search query or dietary preferences.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
              }}
              className="px-4 py-2 text-xs uppercase tracking-wider text-royal-gold border border-royal-gold rounded hover:bg-royal-gold hover:text-royal-dark transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((dish) => (
              <FoodCard
                key={dish.id}
                item={dish}
                onViewDetails={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Food Details Modal */}
      <FoodDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectRelated={(rel) => setSelectedItem(rel)}
      />
    </div>
  );
};
