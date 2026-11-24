import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-royal-dark border-t border-royal-gold/20 text-royal-muted pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-royal-gold/40 flex items-center justify-center bg-royal-charcoal">
                <Crown className="w-5 h-5 text-royal-gold" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                ROYAL FEAST
              </span>
            </div>
            <p className="text-sm leading-relaxed text-royal-muted font-light">
              Where gastronomy meets royalty. Crafted with precision, seasonal organic produce,
              and centuries of culinary heritage presented with modern finesse.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-royal-charcoal border border-white/10 flex items-center justify-center text-royal-muted hover:text-royal-gold hover:border-royal-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-royal-charcoal border border-white/10 flex items-center justify-center text-royal-muted hover:text-royal-gold hover:border-royal-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-royal-charcoal border border-white/10 flex items-center justify-center text-royal-muted hover:text-royal-gold hover:border-royal-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:block after:w-8 after:h-[2px] after:bg-royal-gold after:mt-2">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-royal-gold transition-colors">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-royal-gold transition-colors">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-royal-gold transition-colors">
                  A La Carte Menu
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-royal-gold transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-royal-gold transition-colors">
                  Ambiance Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-royal-gold transition-colors">
                  Contact & Concierge
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-royal-gold transition-colors">
                  Track Live Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:block after:w-8 after:h-[2px] after:bg-royal-gold after:mt-2">
              Hours of Dining
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday - Thursday</p>
                  <p className="text-xs text-royal-muted">12:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Friday - Sunday</p>
                  <p className="text-xs text-royal-muted">12:00 PM – 11:45 PM</p>
                </div>
              </div>
              <div className="pt-2 text-xs text-royal-gold italic">
                * Private dining suites available upon early reservation
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:block after:w-8 after:h-[2px] after:bg-royal-gold after:mt-2">
              Concierge
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-royal-gold shrink-0 mt-1" />
                <span>42 Imperial Boulevard, Royal Heritage District, City Center</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-royal-gold shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-royal-gold shrink-0" />
                <span>concierge@royalfeast.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-royal-muted gap-4">
          <p>© {new Date().getFullYear()} ROYAL FEAST Fine Dining. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-royal-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-royal-gold transition-colors">
              Terms of Hospitality
            </Link>
            <Link to="/admin/login" className="text-white/40 hover:text-royal-gold transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
