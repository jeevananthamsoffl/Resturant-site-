import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const TrackSearchPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      navigate(`/orders/${orderNumber.trim()}/track`);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-[75vh] flex items-center justify-center px-4 bg-royal-dark text-white">
      <div className="max-w-lg w-full bg-royal-charcoal rounded-2xl p-8 sm:p-10 border border-royal-gold/30 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-royal-dark border border-royal-gold flex items-center justify-center text-royal-gold mx-auto shadow-gold-glow">
          <Compass className="w-8 h-8" />
        </div>

        <Badge variant="gold" size="md">Royal Dispatch</Badge>
        <h2 className="font-serif text-3xl font-bold text-white">
          Track Your Gastronomy Order
        </h2>
        <p className="text-xs text-royal-muted leading-relaxed font-light max-w-sm mx-auto">
          Enter your 6-digit order number from your confirmation SMS or email receipt to follow
          live kitchen preparation and chauffeur transit.
        </p>

        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. RF-ORD-2026-847291"
              className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-royal-gold"
            />
          </div>

          <Button variant="gold" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
            Locate Live Order
          </Button>
        </form>

        <div className="pt-4 border-t border-white/5 text-[11px] text-royal-muted">
          <span>Demo Tracking Reference: </span>
          <button
            onClick={() => setOrderNumber('RF-ORD-2026-847291')}
            className="text-royal-gold font-mono hover:underline ml-1"
          >
            RF-ORD-2026-847291
          </button>
        </div>
      </div>
    </div>
  );
};
