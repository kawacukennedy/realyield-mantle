import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSkeleton from './LoadingSkeleton';

interface ProgressiveLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  delay?: number;
  exitAnimation?: boolean;
}

const ProgressiveLoaderComponent = ({
  isLoading,
  children,
  skeleton,
  delay = 0,
  exitAnimation = true
}: ProgressiveLoaderProps) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoader(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, delay]);

  const defaultSkeleton = (
    <div className="space-y-4">
      <LoadingSkeleton height="2rem" width="60%" />
      <LoadingSkeleton height="1rem" width="80%" />
      <LoadingSkeleton height="1rem" width="70%" />
      <LoadingSkeleton height="1rem" width="90%" />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading && showLoader ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={exitAnimation ? { opacity: 0, y: -10 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {skeleton || defaultSkeleton}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(ProgressiveLoaderComponent);