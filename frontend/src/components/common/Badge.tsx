import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'gold'
    | 'veg'
    | 'non-veg'
    | 'outline'
    | 'charcoal'
    | 'warning'
    | 'info'
    | 'success'
    | 'error'
    | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'sm',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium uppercase tracking-wider rounded-full self-start w-fit whitespace-nowrap';

  const variants = {
    gold: 'bg-royal-gold/15 text-royal-gold border border-royal-gold/30',
    veg: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40',
    'non-veg': 'bg-rose-950/60 text-rose-400 border border-rose-500/40',
    outline: 'border border-white/20 text-white/80',
    charcoal: 'bg-royal-charcoal text-royal-muted border border-white/10',
    warning: 'bg-amber-950/50 text-amber-400 border border-amber-500/40',
    info: 'bg-sky-950/50 text-sky-400 border border-sky-500/40',
    success: 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/40',
    error: 'bg-rose-950/50 text-rose-400 border border-rose-500/40',
    neutral: 'bg-neutral-800 text-neutral-300 border border-neutral-700',
  };

  const sizes = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
