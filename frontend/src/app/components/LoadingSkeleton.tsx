import React from 'react';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function LoadingSkeleton({ width = '100%', height = '1rem', className = '' }: LoadingSkeletonProps) {
  return (
    <div
      className={`bg-muted animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}