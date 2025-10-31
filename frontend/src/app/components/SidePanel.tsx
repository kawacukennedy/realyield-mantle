import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  position?: 'left' | 'right';
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  children,
  width = 'w-96',
  position = 'right'
}: SidePanelProps) {
  const slideDirection = position === 'right' ? 'translate-x-full' : '-translate-x-full';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: position === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: position === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className={`fixed inset-y-0 ${position}-0 ${width} bg-bg-card border-l border-border shadow-2xl z-50 flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-bg-muted/50">
              <motion.h3
                initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-semibold text-text"
              >
                {title}
              </motion.h3>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="p-2 hover:bg-bg-muted rounded-full transition-colors group"
              >
                <X size={20} className="text-text-muted group-hover:text-text transition-colors" />
              </motion.button>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 overflow-y-auto p-6 scrollbar-thin"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}