import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ShoppingBag,
  User as UserIcon,
  Calendar,
  Crown,
  ChevronRight,
  Phone,
  Home,
  BookOpen,
  Utensils,
  Image as ImageIcon,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { useCart } from '../../contexts/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: BookOpen },
    { name: 'Menu', href: '/menu', icon: Utensils },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Reservations', href: '/reservations', icon: Calendar },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-royal-dark/95 backdrop-blur-md py-4 shadow-luxury border-b border-royal-gold/15'
            : 'bg-gradient-to-b from-royal-dark/90 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-royal-gold/40 flex items-center justify-center bg-royal-dark group-hover:border-royal-gold transition-colors">
                <Crown className="w-5 h-5 text-royal-gold group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-white group-hover:text-royal-gold transition-colors">
                  ROYAL FEAST
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-royal-gold font-light">
                  Fine Dining
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.href ||
                  (link.href === '/reservations' && location.pathname === '/reservation');
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-xs uppercase tracking-widest transition-colors font-medium relative py-1 ${
                      isActive
                        ? 'text-royal-gold font-semibold'
                        : 'text-white/80 hover:text-royal-gold'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-royal-gold animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & CTA */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 text-white/80 hover:text-royal-gold transition-colors relative"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-royal-gold text-royal-dark text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link
                to="/account"
                className="p-2.5 text-white/80 hover:text-royal-gold transition-colors"
                aria-label="Account"
              >
                <UserIcon className="w-5 h-5" />
              </Link>

              <Link to="/reservations">
                <Button variant="gold" size="sm" icon={Calendar}>
                  Reserve Table
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-white/80 hover:text-royal-gold transition-colors relative"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-royal-gold text-royal-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-full bg-royal-charcoal border border-royal-gold/30 flex items-center justify-center text-white hover:text-royal-gold hover:border-royal-gold transition-all"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-royal-gold" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sleek Native-App Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-50 bg-[#121212] flex flex-col justify-between overflow-y-auto text-white md:hidden"
          >
            {/* Top Bar inside Drawer */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#181818]">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full border border-royal-gold/40 flex items-center justify-center bg-royal-dark">
                  <Crown className="w-4 h-4 text-royal-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base font-bold tracking-widest text-white">
                    ROYAL FEAST
                  </span>
                  <span className="text-[7px] uppercase tracking-[0.25em] text-royal-gold font-light">
                    Fine Dining
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-royal-gold hover:border-royal-gold transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sleek App Navigation List */}
            <div className="flex-1 px-5 py-5 flex flex-col justify-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-royal-gold/60 font-semibold px-2 mb-1">
                Explore Destination
              </span>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  location.pathname === link.href ||
                  (link.href === '/reservations' && location.pathname === '/reservation');
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-royal-gold/15 text-royal-gold border border-royal-gold/30 font-semibold shadow-sm'
                        : 'text-white/85 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive
                            ? 'bg-royal-gold/25 text-royal-gold'
                            : 'bg-white/5 text-royal-muted'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-sans text-sm tracking-wide font-medium">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-royal-gold translate-x-0.5' : 'text-white/20'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions & Quick Concierge */}
            <div className="px-5 py-5 bg-[#181818] border-t border-white/10 space-y-3.5">
              <Link
                to="/reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="gold" size="md" className="w-full justify-center" icon={Calendar}>
                  Book a Table
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-royal-charcoal border border-white/10 text-xs uppercase tracking-wider text-white hover:text-royal-gold hover:border-royal-gold/40 transition-colors font-medium"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-royal-gold" />
                  <span>Cart ({itemCount})</span>
                </button>

                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-royal-charcoal border border-white/10 text-xs uppercase tracking-wider text-white hover:text-royal-gold hover:border-royal-gold/40 transition-colors font-medium"
                >
                  <UserIcon className="w-3.5 h-3.5 text-royal-gold" />
                  <span>Account</span>
                </Link>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-royal-muted">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 hover:text-royal-gold transition-colors"
                >
                  <Phone className="w-3 h-3 text-royal-gold" />
                  <span>+91 98765 43210</span>
                </a>
                <span className="text-white/20">•</span>
                <span>Heritage Quarter</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
