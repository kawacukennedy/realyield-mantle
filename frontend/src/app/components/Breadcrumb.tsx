import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm mb-6 ${className}`}>
      <Link href="/" className="flex items-center gap-1 text-text-muted hover:text-primary transition-colors group">
        <Home size={14} className="group-hover:scale-110 transition-transform" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChevronRight size={14} className="text-text-muted" />
          </motion.div>
          {item.href ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-text-muted hover:text-primary transition-all duration-200 hover:scale-105"
              >
                {item.icon && <span className="text-primary">{item.icon}</span>}
                {item.label}
              </Link>
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="flex items-center gap-1 text-text font-medium"
            >
              {item.icon && <span className="text-primary">{item.icon}</span>}
              {item.label}
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}