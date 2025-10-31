import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  animated = false,
  icon
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-bg-muted text-text border-border',
    success: 'bg-gradient-to-r from-success to-success/80 text-white border-success/20',
    danger: 'bg-gradient-to-r from-danger to-danger/80 text-white border-danger/20',
    warning: 'bg-gradient-to-r from-warning to-warning/80 text-white border-warning/20',
    primary: 'bg-gradient-to-r from-primary to-accent text-white border-primary/20',
    secondary: 'bg-gradient-to-r from-secondary to-primary text-white border-secondary/20',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const badgeContent = (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold border transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
}