'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  footerActions?: React.ReactNode;
  isBlocking?: boolean;
  closeOnEsc?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footerActions,
  isBlocking = false,
  closeOnEsc = true
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc && !isBlocking) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEsc, isBlocking, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full mx-2'
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`bg-bg-card border border-border rounded-xl shadow-lg w-full mx-4 ${sizeClasses[size]}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 id="modal-title" className="text-lg font-semibold">{title}</h3>
            {!isBlocking && (
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text p-1"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <div className="mb-6">
            {children}
          </div>
          {footerActions && (
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              {footerActions}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}