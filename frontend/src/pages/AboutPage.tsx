import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Flame,
  Calendar,
  Utensils,
  Wine,
  Leaf,
  Shield,
} from 'lucide-react';
import { CHEFS } from '../data/restaurantData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const AboutPage: React.FC = () => {
  const philosophies = [
    {
      title: 'Provenance & Single-Estate Harvests',
      description:
        'We work exclusively with certified biodynamic farmers and heritage cooperatives. Our saffron hails from Pampore, morels from Kupwara, black truffles from Périgord, and single-origin vanilla beans from Sambava.',
      icon: Leaf,
    },
    {
      title: 'The Alchemy of Charcoal Embers',
      description:
        'Modern stoves cannot replicate the smoky complexity of real neem and bhabhar hardwood charcoal. Our gravies, broths, and tandoor cuts are roasted with age-old dum techniques perfected over 48 hours.',
      icon: Flame,
    },
    {
      title: 'Sommelier Pairings & Cellar Reserve',
      description:
        'Our underground humidity-controlled vault houses 450+ rare labels, from Premier Grand Cru Classé Bordeaux to small-batch organic biodynamic vintages and artisan craft zero-proof infusions.',
      icon: Wine,
    },
    {
      title: 'Unrivaled Aristocratic Service',
      description:
        'At Royal Feast, hospitality is an art form. Every table is attended by certified culinary stewards trained in diplomatic etiquette, bespoke dietary catering, and tableside carving.',
      icon: Shield,
    },
  ];

  const interiorGallery = [
    {
      title: 'The Imperial Grand Dining Hall',
      subtitle: 'Featuring hand-blown Bohemian chandeliers and Italian Carrara marble.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'The Private Sovereign Dining Suite',
      subtitle: 'Discreet acoustic isolation, dedicated butler service, and antique silverware.',
      imageUrl: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'The Royal Starlight Terrace',
      subtitle: 'Open-air al fresco seating overlooking our illuminated botanical water court.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white">
      {/* 1. Page Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge variant="gold" size="md">
            Our Noble Pedigree
          </Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            The Chronicle of <br />
            <span className="text-gold-gradient italic font-normal">ROYAL FEAST</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-royal-muted leading-relaxed font-light">
            Founded with an unwavering commitment to revive royal gastronomic traditions through
            avant-garde culinary sophistication.
          </p>
        </div>
      </section>

      {/* 2. Restaurant Story & Genesis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative & Stats */}
          <div className="space-y-6">
            <Badge variant="gold" size="sm" className="mb-1">
              Genesis & Heritage
            </Badge>

            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
              A Symphony of Ancestral Secrets and <span className="text-royal-gold font-normal">Haute Cuisine</span>
            </h2>

            <p className="text-royal-muted text-sm sm:text-base leading-relaxed font-light">
              Royal Feast was established with a singular mission: to construct an uncompromising
              culinary sanctuary where royal Awadhi banqueting rituals converge with the pinnacle of
              contemporary European fine dining.
            </p>

            <p className="text-royal-muted text-sm sm:text-base leading-relaxed font-light">
              What began as a collaborative research endeavor between culinary historians, royal
              khansamas (court chefs), and European Michelin veterans has evolved into India's most
              celebrated gastronomic destination. We believe that fine dining must transcend
              nourishment to become a transformative sensory experience.
            </p>

            {/* Aligned Heritage Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-royal-charcoal/60 border border-white/5 space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-royal-gold">300+</span>
                <p className="text-xs text-white/90 font-medium">Original Court Recipes</p>
                <p className="text-[11px] text-royal-muted font-light">Catalogued & Preserved</p>
              </div>
              <div className="p-4 rounded-xl bg-royal-charcoal/60 border border-white/5 space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-royal-gold">48 Hrs</span>
                <p className="text-xs text-white/90 font-medium">Artisanal Dum Cooking</p>
                <p className="text-[11px] text-royal-muted font-light">Slow Charcoal Simmering</p>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery & Highlight Card */}
          <div className="relative rounded-2xl overflow-hidden border border-royal-gold/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
              alt="Chef preparing fine dining dish"
              className="w-full h-[400px] sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/70 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-royal-dark/95 backdrop-blur-md border border-royal-gold/40 p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-2 text-royal-gold mb-1">
                <Crown className="w-4 h-4 shrink-0" />
                <span className="text-xs uppercase tracking-wider font-semibold">Royalty in Every Detail</span>
              </div>
              <p className="text-[11px] text-royal-muted font-light leading-relaxed">
                Hand-engraved silverware, custom bone china, and bespoke botanical aromas hand-blended in Kannauj.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Culinary Philosophy & Pillars */}
      <section className="py-20 bg-royal-charcoal/40 border-y border-royal-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="gold" size="md">Our Philosophy</Badge>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              The Four Pillars of Royal Feast
            </h2>
            <p className="text-royal-muted text-sm font-light">
              Principles guiding our kitchens, cellars, and concierge staff day after day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophies.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-royal-dark/80 border border-white/5 hover:border-royal-gold/30 transition-all flex gap-5"
                >
                  <div className="w-12 h-12 rounded-lg bg-royal-charcoal border border-royal-gold/30 flex items-center justify-center text-royal-gold shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-royal-muted leading-relaxed font-light">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Master Chef Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="gold" size="md">Culinary Luminaries</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            The Visionaries Behind the Menu
          </h2>
          <p className="text-royal-muted text-sm font-light">
            Each bring decades of rigorous international mastery, artistic dedication, and leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHEFS.map((chef, idx) => (
            <div
              key={idx}
              className="bg-royal-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-royal-gold/40 transition-all duration-300"
            >
              <div className="h-80 w-full overflow-hidden bg-royal-dark">
                <img
                  src={chef.imageUrl}
                  alt={chef.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 space-y-2">
                <Badge variant="gold" size="sm">{chef.accolades}</Badge>
                <h3 className="font-serif text-xl font-bold text-white">{chef.name}</h3>
                <p className="text-xs text-royal-gold font-medium uppercase tracking-wider">{chef.role}</p>
                <p className="text-xs text-royal-muted leading-relaxed font-light pt-2">{chef.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Interior Ambiance & Architecture */}
      <section className="py-20 bg-royal-charcoal/30 border-t border-royal-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="gold" size="md">Atmospheric Elegance</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Interior Spaces & Architecture
            </h2>
            <p className="text-royal-muted text-sm font-light">
              Designed by renowned Parisian interior artisans combining imperial Mughal latticework
              with French neoclassicism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interiorGallery.map((space, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-royal-gold/40 transition-all bg-royal-charcoal"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={space.imageUrl}
                    alt={space.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-lg font-bold text-white mb-2">{space.title}</h4>
                  <p className="text-xs text-royal-muted leading-relaxed font-light">
                    {space.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Royal Feast CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-royal-charcoal via-royal-surface to-royal-charcoal p-10 sm:p-16 rounded-2xl border border-royal-gold/40 shadow-2xl space-y-6">
          <Crown className="w-10 h-10 text-royal-gold mx-auto" />
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Experience Gastronomy in Its Highest Form
          </h3>
          <p className="text-royal-muted text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Whether booking an intimate celebration, a diplomatic dinner, or ordering our signature
            delicacies home, allow our team to exceed your every expectation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/reservations">
              <Button variant="gold" size="lg" icon={Calendar}>
                Reserve Your Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" size="lg" icon={Utensils}>
                Browse Digital Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
