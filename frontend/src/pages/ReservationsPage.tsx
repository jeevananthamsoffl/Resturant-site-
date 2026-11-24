import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Crown,
  Shield,
  Phone,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ReservationsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    timeSlot: '19:30',
    guestCount: 2,
    seatingArea: 'Main Dining Hall',
    specialRequests: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<null | {
    code: string;
    details: typeof formData;
  }>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { time: '12:30', label: '12:30 PM (Lunch)', available: true },
    { time: '13:30', label: '01:30 PM (Lunch)', available: true },
    { time: '14:30', label: '02:30 PM (Lunch)', available: false },
    { time: '19:00', label: '07:00 PM (Dinner)', available: true },
    { time: '19:30', label: '07:30 PM (Dinner)', available: true },
    { time: '20:15', label: '08:15 PM (Dinner)', available: true },
    { time: '21:00', label: '09:00 PM (Dinner)', available: true },
    { time: '21:45', label: '09:45 PM (Dinner)', available: true },
  ];

  const seatingAreas = [
    {
      id: 'Main Dining Hall',
      name: 'Imperial Dining Hall',
      desc: 'Crystal chandeliers, live classical piano ambiance, grand tables.',
      surcharge: 'No surcharge',
    },
    {
      id: 'Royal Terrace',
      name: 'The Royal Starlight Terrace',
      desc: 'Al fresco candlelit dining overlooking private fountains.',
      surcharge: '₹500 cover',
    },
    {
      id: 'VIP Private Suite',
      name: 'Sovereign Private Dining Suite',
      desc: 'Dedicated butler, personalized sommelier pairing, private salon.',
      surcharge: '₹2,500 cover',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reservation booking
    setTimeout(() => {
      const generatedCode = `RF-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingConfirmed({
        code: generatedCode,
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20 bg-royal-dark text-white min-h-screen">
      {/* 1. Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-radial-gradient">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge variant="gold" size="md">Imperial Concierge</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Reserve Your <span className="text-gold-gradient italic font-normal">Table</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base text-royal-muted leading-relaxed font-light">
            Secure your privileged seating at Royal Feast. Advance reservation is highly recommended
            for our dinner seatings and private salon experiences.
          </p>
        </div>
      </section>

      {/* 2. Main Reservation Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {bookingConfirmed ? (
          /* Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-royal-charcoal rounded-2xl p-8 sm:p-12 border border-royal-gold/40 text-center shadow-2xl space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-royal-gold/20 border border-royal-gold flex items-center justify-center text-royal-gold mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <Badge variant="gold" size="md">Reservation Confirmed</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              We Await Your Presence, {bookingConfirmed.details.name}
            </h2>

            <div className="p-6 rounded-xl bg-royal-dark/90 border border-white/10 max-w-lg mx-auto text-left space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-royal-muted">Reservation Code</span>
                <span className="text-royal-gold font-bold text-base">{bookingConfirmed.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-royal-muted">Date</span>
                <span className="text-white">{bookingConfirmed.details.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-royal-muted">Time Slot</span>
                <span className="text-white">{bookingConfirmed.details.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-royal-muted">Guests</span>
                <span className="text-white">{bookingConfirmed.details.guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-royal-muted">Seating Zone</span>
                <span className="text-white">{bookingConfirmed.details.seatingArea}</span>
              </div>
            </div>

            <p className="text-xs text-royal-muted max-w-md mx-auto leading-relaxed font-light">
              A formal confirmation receipt has been sent to{' '}
              <strong className="text-white">{bookingConfirmed.details.email}</strong>. For schedule
              adjustments or dietary specifications, our head concierge is at your service at{' '}
              <strong className="text-royal-gold">+91 98765 43210</strong>.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => setBookingConfirmed(null)}
                className="px-6 py-3 rounded text-xs uppercase tracking-wider text-royal-gold border border-royal-gold hover:bg-royal-gold hover:text-royal-dark transition-all"
              >
                Book Another Table
              </button>
            </div>
          </motion.div>
        ) : (
          /* Reservation Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-royal-charcoal/90 rounded-2xl p-6 sm:p-10 border border-royal-gold/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Date & Headcount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-royal-muted font-medium mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-royal-gold" /> Date of Dining *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-royal-dark border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-royal-muted font-medium mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-royal-gold" /> Number of Guests *
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({ ...formData, guestCount: Number(e.target.value) })
                      }
                      className="w-full bg-royal-dark border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-gold cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16].map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Time Slot Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted font-medium mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-royal-gold" /> Preferred Time Slot *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
                        className={`py-2.5 px-2 rounded text-xs font-mono transition-all border text-center ${
                          !slot.available
                            ? 'opacity-40 cursor-not-allowed border-transparent bg-royal-dark line-through text-white/40'
                            : formData.timeSlot === slot.time
                            ? 'bg-royal-gold text-royal-dark font-bold border-royal-gold shadow-gold-glow'
                            : 'bg-royal-dark border-white/10 text-white/80 hover:border-royal-gold/50'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Seating Area Preference */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-royal-muted font-medium mb-3 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-royal-gold" /> Preferred Seating Zone
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {seatingAreas.map((area) => {
                      const isSelected = formData.seatingArea === area.id;
                      return (
                        <div
                          key={area.id}
                          onClick={() => setFormData({ ...formData, seatingArea: area.id })}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-royal-gold/15 border-royal-gold shadow-gold-glow'
                              : 'bg-royal-dark border-white/10 hover:border-white/20'
                          }`}
                        >
                          <p className="text-xs font-bold text-white mb-1">{area.name}</p>
                          <p className="text-[11px] text-royal-muted font-light leading-relaxed mb-2">
                            {area.desc}
                          </p>
                          <span className="text-[10px] text-royal-gold font-mono uppercase">
                            {area.surcharge}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Guest Contact Details */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-royal-gold">
                    Guest Contact Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-royal-muted mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Lord / Lady / Dr. / Name"
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

                  <div>
                    <label className="block text-xs text-royal-muted mb-1">
                      Phone Number (for SMS & WhatsApp Confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-royal-muted mb-1">
                      Special Requests / Dietary Restrictions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Anniversary celebration, vegan substitutions, preferred quiet corner table..."
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      className="w-full bg-royal-dark border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full mt-4"
                  isLoading={isSubmitting}
                >
                  Confirm Table Reservation
                </Button>
              </form>
            </div>

            {/* Sidebar Hospitality Policy & Concierge */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-royal-charcoal/70 rounded-xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-royal-gold">
                  <Shield className="w-5 h-5" />
                  <h4 className="font-serif text-base font-bold text-white">Hospitality Standards</h4>
                </div>
                <ul className="text-xs text-royal-muted space-y-2.5 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-royal-gold font-bold">•</span>
                    <span><strong>Dress Code:</strong> Elegant Smart Casual or Formal Attire.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-royal-gold font-bold">•</span>
                    <span><strong>Table Holding:</strong> Tables are reserved for up to 20 minutes past your scheduled time slot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-royal-gold font-bold">•</span>
                    <span><strong>Cancellation:</strong> Modifications are complimentary up to 2 hours prior to reservation.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-royal-dark rounded-xl p-6 border border-royal-gold/30 text-center space-y-3">
                <Crown className="w-8 h-8 text-royal-gold mx-auto" />
                <h4 className="font-serif text-lg font-bold text-white">Private Banqueting & Galas</h4>
                <p className="text-xs text-royal-muted font-light leading-relaxed">
                  For parties larger than 16 guests or full restaurant buyouts, please contact our VIP
                  Events Concierge directly.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-royal-gold hover:underline pt-2 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" /> +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
