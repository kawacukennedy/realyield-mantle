import React from 'react';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'default' | 'shimmer' | 'pulse';
  rounded?: boolean;
}

export default function LoadingSkeleton({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'shimmer',
  rounded = true
}: LoadingSkeletonProps) {
  const baseClasses = `bg-bg-muted ${rounded ? 'rounded-lg' : ''} ${className}`;

  if (variant === 'shimmer') {
    return (
      <div
        className={`${baseClasses} shimmer relative overflow-hidden`}
        style={{ width, height }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bg-card/50 to-transparent animate-shimmer" />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={`${baseClasses} animate-pulse`}
        style={{ width, height }}
      />
    );
  }

  return (
    <div
      className={baseClasses}
      style={{ width, height }}
    />
  );
}