import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs md:text-sm select-none';

  const variants = {
    gold: 'bg-royal-gold hover:bg-royal-gold-light text-royal-dark font-semibold shadow-gold-glow hover:shadow-lg active:scale-[0.98]',
    outline:
      'border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-dark active:scale-[0.98]',
    ghost:
      'text-royal-muted hover:text-white hover:bg-royal-charcoal active:scale-[0.98]',
    secondary:
      'bg-royal-charcoal text-white hover:bg-royal-surface border border-white/10 active:scale-[0.98]',
    dark:
      'bg-royal-dark text-white border border-royal-gold/30 hover:border-royal-gold active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 rounded-sm gap-1.5',
    md: 'px-6 py-3 rounded-sm gap-2',
    lg: 'px-8 py-4 rounded-sm gap-2.5 text-sm md:text-base font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};
