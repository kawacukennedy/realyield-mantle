'use client';

import { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        cycleTheme();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [theme]);

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} className="text-warning" />;
      case 'dark':
        return <Moon size={20} className="text-primary" />;
      case 'system':
        return <Monitor size={20} className="text-secondary" />;
      default:
        return <Sun size={20} className="text-warning" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode (Ctrl+D)';
      case 'dark':
        return 'Switch to system mode (Ctrl+D)';
      case 'system':
        return 'Switch to light mode (Ctrl+D)';
      default:
        return 'Toggle theme (Ctrl+D)';
    }
  };

  return (
    <motion.button
      onClick={cycleTheme}
      className="relative p-2 rounded-full bg-bg-muted hover:bg-bg-card border border-border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={getTooltip()}
      aria-label={`Current theme: ${theme}. ${getTooltip()}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 180, scale: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
}