import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* 1. Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge variant="gold" size="md">Direct Concierge</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Connect with <span className="text-gold-gradient italic font-normal">ROYAL FEAST</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base text-royal-muted leading-relaxed font-light">
            Our concierge team is at your dedicated service for table bookings, bespoke private banquets,
            press relations, and gastronomic inquiries.
          </p>
        </div>
      </section>

      {/* 2. Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Address */}
          <div className="bg-royal-charcoal/80 p-6 rounded-xl border border-white/5 hover:border-royal-gold/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Our Sanctuary</h3>
              <p className="text-xs text-royal-muted leading-relaxed font-light">
                {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}, {RESTAURANT_INFO.state} – {RESTAURANT_INFO.postalCode}
              </p>
            </div>
            <a
              href="#map-section"
              className="mt-4 text-xs text-royal-gold hover:underline font-medium inline-flex items-center gap-1"
            >
              View on Map <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-royal-charcoal/80 p-6 rounded-xl border border-white/5 hover:border-royal-gold/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Direct Telephony</h3>
              <p className="text-xs text-royal-muted leading-relaxed font-light">
                Available daily from 10:00 AM to 11:30 PM for instant inquiries.
              </p>
              <p className="font-mono text-sm text-white font-semibold mt-2">
                {RESTAURANT_INFO.phone}
              </p>
            </div>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="mt-4 text-xs text-royal-gold hover:underline font-medium inline-flex items-center gap-1"
            >
              Call Concierge <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 3: WhatsApp Quick Connect */}
          <div className="bg-royal-charcoal/80 p-6 rounded-xl border border-white/5 hover:border-royal-gold/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">WhatsApp Concierge</h3>
              <p className="text-xs text-royal-muted leading-relaxed font-light">
                Immediate responses for table holds, direction guides, and valet service.
              </p>
            </div>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20Royal%20Feast%20Concierge,%20I%20would%20like%20to%20inquire%20about...`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
            </a>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="bg-royal-charcoal/80 p-6 rounded-xl border border-white/5 hover:border-royal-gold/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Hospitality Hours</h3>
              <div className="text-xs text-royal-muted space-y-1 font-light">
                <p>Mon - Thu: {RESTAURANT_INFO.hours.weekday}</p>
                <p>Fri - Sun: {RESTAURANT_INFO.hours.weekend}</p>
              </div>
            </div>
            <span className="text-[11px] text-royal-gold mt-4 font-mono">
              Valet parking available
            </span>
          </div>
        </div>
      </section>

      {/* 3. Form & Interactive Map Grid */}
      <section id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-6 bg-royal-charcoal rounded-2xl p-8 sm:p-10 border border-royal-gold/20 shadow-xl">
            <Badge variant="gold" size="sm" className="mb-2">Send an Inquiry</Badge>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
              How May We Serve You?
            </h3>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-royal-dark border border-royal-gold/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-royal-gold mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">Message Transmitted</h4>
                <p className="text-xs text-royal-muted leading-relaxed font-light">
                  Thank you for reaching out to Royal Feast. Our concierge will review your message and
                  reply within two business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-royal-gold uppercase tracking-wider underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-royal-muted mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-royal-muted mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="concierge@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-royal-muted mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-royal-muted mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold cursor-pointer"
                    >
                      <option value="General Inquiry">General Dining Inquiry</option>
                      <option value="Private Gala / Banquet">Private Gala / Banquet</option>
                      <option value="Chef Degustation Booking">Chef Degustation Experience</option>
                      <option value="Press & Media Relations">Press & Media Relations</option>
                      <option value="Feedback / Commendation">Feedback / Commendation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-royal-muted mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify any dietary details, event date, guest headcount, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <Button
                  variant="gold"
                  size="md"
                  className="w-full"
                  isLoading={isSubmitting}
                  icon={Send}
                  iconPosition="right"
                >
                  Deliver Message to Concierge
                </Button>
              </form>
            )}
          </div>

          {/* Interactive Google Map & Social Links */}
          <div className="lg:col-span-6 space-y-6">
            <div className="h-[380px] rounded-2xl overflow-hidden border border-royal-gold/30 shadow-2xl bg-royal-charcoal relative">
              <iframe
                title="Royal Feast Location Map"
                src={RESTAURANT_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-[1.1] grayscale-[0.3]"
              />
            </div>

            {/* Social channels bar */}
            <div className="p-6 rounded-2xl bg-royal-charcoal/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-sm font-bold text-white">Join Our Inner Circle</h4>
                <p className="text-xs text-royal-muted font-light">
                  Follow us for rare cellar tastings and seasonal menus.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-royal-dark border border-white/10 hover:border-royal-gold flex items-center justify-center text-royal-muted hover:text-royal-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-royal-dark border border-white/10 hover:border-royal-gold flex items-center justify-center text-royal-muted hover:text-royal-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-royal-dark border border-white/10 hover:border-royal-gold flex items-center justify-center text-royal-muted hover:text-royal-gold transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
