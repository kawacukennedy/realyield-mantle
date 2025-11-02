import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  animated?: boolean;
  hover?: boolean;
  role?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardComponent = ({
  children,
  className = '',
  glass = false,
  animated = true,
  hover = true,
  role,
  ariaLabel,
  onClick
}: CardProps) => {
  const cardClasses = glass
    ? `glass-effect rounded-xl shadow-lg border border-white/20 backdrop-blur-md ${className}`
    : `bg-bg-card rounded-xl shadow-md border border-border ${className}`;

  const hoverClasses = hover && animated ? 'hover:shadow-xl hover:border-primary/20 hover:scale-[1.02]' : '';
  const interactiveClasses = onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark' : '';

  const CardElement = animated ? motion.div : 'div';

  const cardProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    whileHover: hover ? { y: -4, scale: 1.02 } : undefined,
    whileTap: onClick ? { scale: 0.98 } : undefined,
  } : {};

  return (
    <CardElement
      className={`${cardClasses} ${hoverClasses} ${interactiveClasses} transition-all duration-300`}
      role={role}
      aria-label={ariaLabel}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...cardProps}
    >
      {children}
    </CardElement>
  );
};

export const Card = memo(CardComponent);

const CardHeaderComponent = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`p-6 pb-4 ${className}`} role="banner">
    {children}
  </div>
);

export const CardHeader = memo(CardHeaderComponent);

const CardTitleComponent = ({ children, className = '', level = 3 }: CardTitleProps) => {
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <HeadingTag className={`text-xl font-bold text-text ${className}`}>
      {children}
    </HeadingTag>
  );
};

export const CardTitle = memo(CardTitleComponent);

const CardContentComponent = ({ children, className = '' }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export const CardContent = memo(CardContentComponent);