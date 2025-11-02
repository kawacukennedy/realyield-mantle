import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'default' | 'shimmer' | 'pulse' | 'wave';
  rounded?: boolean;
  lines?: number;
  animate?: boolean;
}

const LoadingSkeletonComponent = ({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'shimmer',
  rounded = true,
  lines = 1,
  animate = true
}: LoadingSkeletonProps) => {
  const baseClasses = `bg-bg-muted ${rounded ? 'rounded-lg' : ''} ${className}`;

  const renderSkeleton = (key?: number) => {
    const SkeletonElement = animate ? motion.div : 'div';
    const motionProps = animate ? {
      initial: { opacity: 0.5 },
      animate: { opacity: [0.5, 1, 0.5] },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    } : {};

    if (variant === 'shimmer') {
      return (
        <SkeletonElement
          key={key}
          className={`${baseClasses} shimmer relative overflow-hidden`}
          style={{ width, height }}
          {...motionProps}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bg-card/50 to-transparent animate-shimmer" />
        </SkeletonElement>
      );
    }

    if (variant === 'pulse') {
      return (
        <SkeletonElement
          key={key}
          className={`${baseClasses} animate-pulse`}
          style={{ width, height }}
          {...motionProps}
        />
      );
    }

    if (variant === 'wave') {
      return (
        <SkeletonElement
          key={key}
          className={`${baseClasses} relative overflow-hidden`}
          style={{ width, height }}
          {...motionProps}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bg-card/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </SkeletonElement>
      );
    }

    return (
      <SkeletonElement
        key={key}
        className={baseClasses}
        style={{ width, height }}
        {...motionProps}
      />
    );
  };

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => renderSkeleton(i))}
      </div>
    );
  }

  return renderSkeleton();
};

export default memo(LoadingSkeletonComponent);