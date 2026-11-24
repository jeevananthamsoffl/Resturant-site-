import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isHoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  isHoverable = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`relative bg-royal-charcoal/90 rounded-lg border border-white/5 overflow-hidden transition-all duration-300 ${
        isHoverable
          ? 'hover:border-royal-gold/40 hover:shadow-gold-glow hover:-translate-y-1'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
