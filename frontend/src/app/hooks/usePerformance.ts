import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if performance API is available
    if (!('performance' in window) || !('PerformanceObserver' in window)) {
      setIsLoaded(true);
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        } else if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        } else if (entry.entryType === 'first-input') {
          setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
        } else if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          setMetrics(prev => ({
            ...prev,
            cls: (prev.cls || 0) + (entry as any).value
          }));
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }

    // Get navigation timing for TTFB
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        ttfb: navigation.responseStart - navigation.requestStart
      }));
    }

    // Mark as loaded after initial metrics are collected
    setTimeout(() => setIsLoaded(true), 100);

    return () => observer.disconnect();
  }, []);

  const getWebVitalsScore = useCallback(() => {
    const scores = {
      fcp: metrics.fcp ? (metrics.fcp < 1800 ? 'good' : metrics.fcp < 3000 ? 'needs-improvement' : 'poor') : null,
      lcp: metrics.lcp ? (metrics.lcp < 2500 ? 'good' : metrics.lcp < 4000 ? 'needs-improvement' : 'poor') : null,
      fid: metrics.fid ? (metrics.fid < 100 ? 'good' : metrics.fid < 300 ? 'needs-improvement' : 'poor') : null,
      cls: metrics.cls ? (metrics.cls < 0.1 ? 'good' : metrics.cls < 0.25 ? 'needs-improvement' : 'poor') : null,
      ttfb: metrics.ttfb ? (metrics.ttfb < 800 ? 'good' : metrics.ttfb < 1800 ? 'needs-improvement' : 'poor') : null,
    };

    return scores;
  }, [metrics]);

  const reportMetrics = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      // Send metrics to analytics service
      console.log('Performance metrics:', metrics);
      // Example: sendToAnalytics(metrics);
    }
  }, [metrics]);

  return {
    metrics,
    isLoaded,
    scores: getWebVitalsScore(),
    reportMetrics,
  };
}

export function useLazyLoading() {
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());

  const loadComponent = useCallback(async (componentName: string, importFn: () => Promise<any>) => {
    if (loadedComponents.has(componentName)) {
      return;
    }

    try {
      const startTime = performance.now();
      const component = await importFn();
      const loadTime = performance.now() - startTime;

      setLoadedComponents(prev => new Set(prev).add(componentName));

      // Track component load time
      if (process.env.NODE_ENV === 'development') {
        console.log(`Component ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      }

      return component;
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
      throw error;
    }
  }, [loadedComponents]);

  return { loadComponent, loadedComponents: Array.from(loadedComponents) };
}

export function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number) {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback((...args: T) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setDebounceTimer(newTimer);
  }, [callback, delay, debounceTimer]);

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}

export function useThrottle<T extends any[]>(callback: (...args: T) => void, delay: number) {
  const [throttleTimer, setThrottleTimer] = useState<NodeJS.Timeout | null>(null);
  const [lastExecTime, setLastExecTime] = useState(0);

  const throttledCallback = useCallback((...args: T) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      callback(...args);
      setLastExecTime(currentTime);
    } else {
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }

      const newTimer = setTimeout(() => {
        callback(...args);
        setLastExecTime(Date.now());
      }, delay - (currentTime - lastExecTime));

      setThrottleTimer(newTimer);
    }
  }, [callback, delay, throttleTimer, lastExecTime]);

  useEffect(() => {
    return () => {
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [throttleTimer]);

  return throttledCallback;
}