import { useState, useEffect } from 'react';

function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Hook for connection quality (if supported)
export function useConnectionQuality(): 'slow' | 'fast' | 'unknown' {
  const [connectionQuality, setConnectionQuality] = useState<'slow' | 'fast' | 'unknown'>('unknown');

  useEffect(() => {
    if (typeof window === 'undefined' || !('connection' in navigator)) return;

    const connection = (navigator as any).connection;

    const updateConnectionQuality = () => {
      if (!connection) return;

      // Check effective type
      const effectiveType = connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        setConnectionQuality('slow');
      } else {
        setConnectionQuality('fast');
      }
    };

    updateConnectionQuality();

    connection.addEventListener('change', updateConnectionQuality);

    return () => {
      connection.removeEventListener('change', updateConnectionQuality);
    };
  }, []);

  return connectionQuality;
}

export { useOnlineStatus };