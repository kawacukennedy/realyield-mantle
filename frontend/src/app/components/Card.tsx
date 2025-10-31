import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  animated?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', glass = false, animated = true }: CardProps) {
  const cardClasses = glass
    ? `glass-effect rounded-xl shadow-lg border border-white/20 backdrop-blur-md ${animated ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300' : ''} ${className}`
    : `bg-bg-card rounded-xl shadow-md border border-border ${animated ? 'hover:shadow-xl hover:border-primary/20 hover:scale-[1.02] transition-all duration-300' : ''} ${className}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 pb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-bold text-text ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}