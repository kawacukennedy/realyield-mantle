import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  ariaLabel?: string;
  tooltip?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  loading = false,
  ariaLabel,
  tooltip,
  iconLeft,
  iconRight,
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-dark disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25 focus:ring-primary',
    secondary: 'bg-gradient-to-r from-secondary to-primary text-white hover:shadow-lg hover:shadow-secondary/25 focus:ring-secondary',
    ghost: 'bg-transparent text-text hover:bg-bg-muted focus:ring-muted',
    outline: 'border border-border text-text hover:bg-bg-muted hover:border-border-light focus:ring-primary',
    link: 'bg-transparent text-primary hover:text-accent underline-offset-4 hover:underline focus:ring-primary',
    danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger',
    icon: 'bg-transparent text-text hover:bg-bg-muted focus:ring-muted p-2',
  };

  const buttonContent = (
    <>
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </>
  );

  return (
    <motion.button
      type={type}
      className={`ripple-effect ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      title={tooltip}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {buttonContent}
    </motion.button>
  );
}