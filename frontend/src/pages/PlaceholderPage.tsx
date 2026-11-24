import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface PlaceholderProps {
  title: string;
  subtitle: string;
  phase: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ title, subtitle, phase }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-xl w-full text-center p-10 bg-royal-charcoal/80 border border-royal-gold/30 rounded-xl shadow-luxury">
        <Badge variant="gold" size="md" className="mb-4">
          {phase}
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>
        <p className="text-royal-muted text-sm leading-relaxed mb-8 font-light">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button variant="outline" size="sm" icon={ArrowLeft} iconPosition="left">
              Return Home
            </Button>
          </Link>
          <Link to="/reservations">
            <Button variant="gold" size="sm" icon={Calendar} iconPosition="left">
              Reserve Table
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
