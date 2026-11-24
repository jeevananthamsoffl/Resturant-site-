import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { Badge } from '../components/common/Badge';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Ambiance', 'Dishes', 'Chefs', 'Events'];

  const filteredGallery =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
      );
    }
  };

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* 1. Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge variant="gold" size="md">Visual Archive</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Grandeur & <span className="text-gold-gradient italic font-normal">Culinary Artistry</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base text-royal-muted leading-relaxed font-light">
            Glimpse the palatial architecture, private dining sanctuaries, live kitchen theater, and
            gastronomic creations that define the Royal Feast experience.
          </p>
        </div>
      </section>

      {/* 2. Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                selectedCategory === cat
                  ? 'bg-royal-gold text-royal-dark font-semibold shadow-gold-glow'
                  : 'bg-royal-charcoal text-royal-muted hover:text-white border border-white/5 hover:border-royal-gold/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Masonry / Responsive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(idx)}
              className="group relative h-80 rounded-xl overflow-hidden bg-royal-charcoal border border-white/5 hover:border-royal-gold/40 cursor-pointer shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/95 via-royal-dark/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-royal-dark/80 backdrop-blur-md text-royal-gold border border-royal-gold/30 font-medium">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="w-12 h-12 rounded-full bg-royal-dark/90 border border-royal-gold flex items-center justify-center text-royal-gold shadow-gold-glow">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-royal-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-royal-muted line-clamp-1 mt-1 font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-royal-dark/80 border border-white/10 hover:border-royal-gold text-white flex items-center justify-center transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Image */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-royal-dark/80 border border-white/10 hover:border-royal-gold text-white flex items-center justify-center transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-royal-dark/80 border border-white/10 hover:border-royal-gold text-white flex items-center justify-center transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <motion.div
              key={activeLightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative rounded-lg overflow-hidden border border-royal-gold/40 shadow-2xl max-h-[70vh]">
                <img
                  src={filteredGallery[activeLightboxIndex].imageUrl}
                  alt={filteredGallery[activeLightboxIndex].title}
                  className="max-h-[70vh] w-auto object-contain rounded"
                />
              </div>
              <div className="mt-4 text-center space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-royal-gold">
                  {filteredGallery[activeLightboxIndex].category} • {activeLightboxIndex + 1} of{' '}
                  {filteredGallery.length}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {filteredGallery[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-royal-muted max-w-xl font-light">
                  {filteredGallery[activeLightboxIndex].description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
