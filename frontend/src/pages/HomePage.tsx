import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Crown,
  Calendar,
  Utensils,
  Star,
  Sparkles,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  ChevronRight,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { MENU_ITEMS, CHEFS, TESTIMONIALS, GALLERY_ITEMS, MenuItemData } from '../data/restaurantData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FoodCard } from '../components/menu/FoodCard';
import { FoodDetailsModal } from '../components/menu/FoodDetailsModal';

export const HomePage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);

  // Filter 6 signature bestseller dishes for home showcase
  const signatureDishes = MENU_ITEMS.filter((item) => item.isBestseller).slice(0, 6);

  return (
    <div className="relative overflow-hidden bg-royal-dark text-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Full-bleed high-res luxury culinary background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
            alt="Royal Feast Luxury Table Setting"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-dark via-royal-dark/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-royal-gold/40 bg-royal-charcoal/80 backdrop-blur-md shadow-gold-glow"
          >
            <Crown className="w-4 h-4 text-royal-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-semibold">
              The Sovereign Art of Fine Dining
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]"
          >
            An Extraordinary <br />
            <span className="text-gold-gradient italic font-normal">Dining Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-royal-muted leading-relaxed font-light"
          >
            Where centuries of imperial heritage meet modern gastronomic artistry. Immerse your
            palate in charcoal-roasted spices, rare truffles, and timeless royal hospitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4"
          >
            <Link to="/reservations">
              <Button variant="gold" size="lg" icon={Calendar} iconPosition="left">
                Reserve Your Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" size="lg" icon={Utensils} iconPosition="left">
                Explore Our Menu
              </Button>
            </Link>
          </motion.div>

          {/* Quick Stats Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/10"
          >
            <div className="text-center">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-royal-gold">32+</p>
              <p className="text-xs uppercase tracking-wider text-royal-muted mt-1">Heritage Spices</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-royal-gold">22 Yrs</p>
              <p className="text-xs uppercase tracking-wider text-royal-muted mt-1">Culinary Mastery</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-royal-gold">4.9 ★</p>
              <p className="text-xs uppercase tracking-wider text-royal-muted mt-1">Michelin Guide Rec.</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-royal-gold">100%</p>
              <p className="text-xs uppercase tracking-wider text-royal-muted mt-1">Organic Produce</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THREE PILLARS OF EXCELLENCE */}
      <section className="py-16 bg-royal-charcoal/50 border-y border-royal-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-royal-dark/60 border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-royal-charcoal border border-royal-gold/30 flex items-center justify-center text-royal-gold shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Masterpiece Craftsmanship
                </h3>
                <p className="text-xs text-royal-muted leading-relaxed font-light">
                  Helmed by Michelin-starred culinary visionaries combining Parisian precision and Awadhi traditions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-royal-dark/60 border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-royal-charcoal border border-royal-gold/30 flex items-center justify-center text-royal-gold shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Rare Seasonal Ingredients
                </h3>
                <p className="text-xs text-royal-muted leading-relaxed font-light">
                  From Périgord black truffles and Kashmiri saffron to Norwegian salmon and organic single-estate butter.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-royal-dark/60 border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-royal-charcoal border border-royal-gold/30 flex items-center justify-center text-royal-gold shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Imperial Hospitality
                </h3>
                <p className="text-xs text-royal-muted leading-relaxed font-light">
                  Tailored sommelier pairings, personalized private dining suites, and seamless concierge reservations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SIGNATURE DISHES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="gold" size="md">Signature Repertoire</Badge>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-3">
              Culinary Highlights
            </h2>
            <p className="text-royal-muted text-sm max-w-lg mt-2 font-light">
              Each dish reflects countless hours of perfecting balance, texture, temperature, and visual grandeur.
            </p>
          </div>
          <Link to="/menu">
            <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
              View Complete Menu
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish) => (
            <FoodCard
              key={dish.id}
              item={dish}
              onViewDetails={(item) => setSelectedItem(item)}
            />
          ))}
        </div>
      </section>

      {/* 4. RESTAURANT STORY SECTION */}
      <section className="py-24 bg-royal-charcoal/40 border-t border-royal-gold/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Images Grid */}
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden border border-royal-gold/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="Royal Feast Interior Dining Hall"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 h-60 rounded-lg overflow-hidden border-2 border-royal-gold shadow-2xl z-20">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80"
                  alt="Master Chef Plating"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-royal-gold/40 z-0" />
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <Badge variant="gold" size="md">Our Heritage</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Rooted in Imperial Grandeur, <br />
                <span className="text-gold-gradient italic font-normal">Refined for the Connoisseur</span>
              </h2>

              <p className="text-royal-muted text-sm sm:text-base leading-relaxed font-light">
                Royal Feast was born from a desire to elevate royal Indian hospitality and classical
                European gastronomy to their purest expressions. Our founders spent years researching
                ancient manuscripts of the imperial Awadhi courts and classical French Escoffier manuscripts.
              </p>

              <p className="text-royal-muted text-sm sm:text-base leading-relaxed font-light">
                From our 36-hour charcoal-simmered Dal Makhani to our Chilean Sea Bass drizzled in
                vintage champagne beurre blanc, every recipe is prepared without shortcuts. We source
                our spices whole from heritage estates in Kashmir, Kerala, and Rajasthan, grinding them
                daily in traditional stone mortars.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div>
                  <h4 className="font-serif text-xl font-bold text-royal-gold">Chef Antoine & Chef Vikram</h4>
                  <p className="text-xs text-royal-muted uppercase tracking-wider">Executive Culinary Directors</p>
                </div>
                <Link to="/about">
                  <Button variant="ghost" size="sm" icon={ChevronRight} iconPosition="right">
                    Read Our Full Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHEF'S SPECIAL & MASTERS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="gold" size="md">The Alchemists</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Meet Our Master Chefs
          </h2>
          <p className="text-royal-muted text-sm sm:text-base font-light">
            Bringing international Michelin-standard technique and ancestral heritage mastery to every course.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHEFS.map((chef, idx) => (
            <div
              key={idx}
              className="bg-royal-charcoal/80 rounded-xl overflow-hidden border border-white/5 hover:border-royal-gold/40 transition-all duration-300 group"
            >
              <div className="h-80 w-full overflow-hidden bg-royal-dark relative">
                <img
                  src={chef.imageUrl}
                  alt={chef.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[11px] uppercase tracking-wider text-royal-gold font-medium">
                    {chef.accolades}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-white mb-1">{chef.name}</h3>
                <p className="text-xs text-royal-gold uppercase tracking-wider mb-3">{chef.role}</p>
                <p className="text-xs text-royal-muted leading-relaxed font-light">{chef.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SPECIAL OFFERS & TASTING MENU */}
      <section className="py-20 bg-gradient-to-r from-royal-dark via-royal-charcoal to-royal-dark border-y border-royal-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-royal-charcoal/90 rounded-2xl p-8 sm:p-12 border border-royal-gold/40 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-royal-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-royal-gold/20 text-royal-gold text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Exclusive Gastronomy Experience
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  The Imperial 7-Course Degustation Menu
                </h3>
                <p className="text-sm text-royal-muted leading-relaxed font-light max-w-2xl">
                  An exclusive sensory journey featuring Atlantic salmon carpaccio, Périgord truffle
                  arancini, 36-hour slow-cooked Awadhi lamb shank, and our celebrated 24K gold chocolate dome,
                  paired with premier cru reserve vintages.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="px-4 py-2 rounded bg-royal-dark border border-dashed border-royal-gold">
                    <span className="text-[10px] text-royal-muted uppercase block">Exclusive Online Code</span>
                    <span className="font-mono font-bold text-royal-gold tracking-widest text-sm">
                      ROYAL20
                    </span>
                  </div>
                  <span className="text-xs text-royal-muted italic">
                    Complimentary dessert course included on direct bookings
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link to="/reservations" className="w-full">
                  <Button variant="gold" size="lg" className="w-full" icon={Calendar}>
                    Book Degustation
                  </Button>
                </Link>
                <Link to="/menu" className="w-full">
                  <Button variant="outline" size="lg" className="w-full">
                    View Tasting Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="gold" size="md">Guest Praise</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Words of Appreciation
          </h2>
          <p className="text-royal-muted text-sm font-light">
            Reflections from gastronomy critics, epicures, and esteemed guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-royal-charcoal/70 rounded-xl p-8 border border-white/5 hover:border-royal-gold/30 transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-royal-gold/40 mb-4" />
                <div className="flex items-center gap-1 text-royal-gold mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-royal-gold text-royal-gold" />
                  ))}
                </div>
                <p className="text-sm text-royal-muted leading-relaxed font-light italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-royal-gold/30"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-royal-muted">{t.role}</p>
                  <p className="text-[10px] text-royal-gold mt-0.5">
                    Recommended: {t.dishRecommended}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. RESTAURANT GALLERY PREVIEW */}
      <section className="py-20 bg-royal-charcoal/30 border-t border-royal-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge variant="gold" size="md">Visual Splendor</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                Ambiance & Culinary Arts
              </h2>
            </div>
            <Link to="/gallery">
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                Explore Full Gallery
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_ITEMS.slice(0, 4).map((img) => (
              <Link
                key={img.id}
                to="/gallery"
                className="group relative h-60 rounded-lg overflow-hidden border border-white/5 hover:border-royal-gold/40 transition-all"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-xs font-serif font-bold text-white">{img.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & HOURS QUICK BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-royal-charcoal rounded-xl border border-royal-gold/30 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">Our Location</h4>
              <p className="text-xs text-royal-muted leading-relaxed font-light">
                42 Imperial Boulevard, Heritage Quarter, Royal Enclave, New Delhi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">Dining Hours</h4>
              <p className="text-xs text-royal-muted leading-relaxed font-light">
                Lunch: 12:00 PM – 3:30 PM <br />
                Dinner: 7:00 PM – 11:45 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h4 className="font-serif text-base font-bold text-white mb-1">VIP Concierge</h4>
              <p className="text-xs text-royal-muted leading-relaxed font-light mb-2">
                +91 98765 43210 <br />
                concierge@royalfeast.com
              </p>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-wider text-royal-gold hover:text-royal-gold-light font-medium inline-flex items-center gap-1 transition-colors"
              >
                Contact Concierge &rarr;
              </Link>
            </div>
          </div>
        </div>
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
