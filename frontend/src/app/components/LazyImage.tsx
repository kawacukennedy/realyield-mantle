import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import LoadingSkeleton from './LoadingSkeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  width?: number;
  height?: number;
  priority?: boolean;
}

const LazyImageComponent = ({
  src,
  alt,
  className = '',
  placeholder,
  onLoad,
  onError,
  width,
  height,
  priority = false,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const shouldLoad = priority || isIntersecting;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && !hasError && (
        <LoadingSkeleton
          width={width ? `${width}px` : '100%'}
          height={height ? `${height}px` : '100%'}
          className="absolute inset-0"
        />
      )}

      {shouldLoad && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3 }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {hasError && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-muted">
          <span className="text-text-muted text-sm">{placeholder}</span>
        </div>
      )}
    </div>
  );
};

export default memo(LazyImageComponent);