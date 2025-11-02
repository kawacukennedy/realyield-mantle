import { useEffect, useRef, useCallback } from 'react';

export function useKeyboardNavigation() {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Handle common keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '/':
          event.preventDefault();
          // Focus search input
          const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
          searchInput?.focus();
          break;
        case 'k':
          event.preventDefault();
          // Open command palette or search
          break;
        case 'b':
          event.preventDefault();
          // Toggle sidebar
          break;
      }
    }

    // Handle escape key for modals/dropdowns
    if (event.key === 'Escape') {
      // Close modals, dropdowns, etc.
      const openModal = document.querySelector('[role="dialog"][aria-modal="true"]');
      const openDropdown = document.querySelector('[role="menu"][aria-expanded="true"]');

      if (openModal) {
        const closeButton = openModal.querySelector('button[aria-label*="close" i], button[aria-label*="cancel" i]') as HTMLButtonElement;
        closeButton?.click();
      } else if (openDropdown) {
        (openDropdown as HTMLElement).focus();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isActive: boolean = true) {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Store the currently focused element
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Focus the first element
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Restore focus to previously focused element
        previouslyFocusedElementRef.current?.focus();
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
    };
  }, [containerRef, isActive]);

  // Restore focus when component unmounts or becomes inactive
  useEffect(() => {
    return () => {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, []);
}

export function useAnnouncer() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);
    announcement.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return { announce };
}

export function useSkipLinks() {
  useEffect(() => {
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' },
      { href: '#search', text: 'Skip to search' },
    ];

    const skipLinkContainer = document.createElement('div');
    skipLinkContainer.className = 'sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-bg-card focus-within:p-4 focus-within:rounded-br-lg focus-within:shadow-lg';

    skipLinks.forEach(({ href, text }) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      link.className = 'block text-primary hover:text-primary/80 focus:text-primary/80 mr-4 last:mr-0';
      skipLinkContainer.appendChild(link);
    });

    document.body.insertBefore(skipLinkContainer, document.body.firstChild);

    return () => {
      if (document.body.contains(skipLinkContainer)) {
        document.body.removeChild(skipLinkContainer);
      }
    };
  }, []);
}

export function useReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const shouldReduceMotion = useCallback((defaultValue: boolean = false) => {
    return prefersReducedMotion || defaultValue;
  }, [prefersReducedMotion]);

  return { prefersReducedMotion, shouldReduceMotion };
}

export function useHighContrast() {
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
  const prefersLowContrast = window.matchMedia('(prefers-contrast: low)').matches;

  return {
    prefersHighContrast,
    prefersLowContrast,
    contrastMode: prefersHighContrast ? 'high' : prefersLowContrast ? 'low' : 'normal'
  };
}