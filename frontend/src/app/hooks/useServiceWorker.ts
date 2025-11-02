import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isInstalling: boolean;
  isWaiting: boolean;
  isActive: boolean;
  updateAvailable: boolean;
  registration: ServiceWorkerRegistration | null;
}

export function useServiceWorker(): ServiceWorkerState & {
  update: () => void;
  unregister: () => void;
} {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isInstalling: false,
    isWaiting: false,
    isActive: false,
    updateAvailable: false,
    registration: null,
  });

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    setState(prev => ({ ...prev, isSupported: true }));

    const handleControllerChange = () => {
      window.location.reload();
    };

    const handleUpdateFound = (registration: ServiceWorkerRegistration) => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      setState(prev => ({ ...prev, isInstalling: true }));

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          setState(prev => ({
            ...prev,
            isInstalling: false,
            updateAvailable: true,
            isWaiting: true
          }));
        }
      });
    };

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        setState(prev => ({
          ...prev,
          isRegistered: true,
          registration
        }));

        if (registration.active) {
          setState(prev => ({ ...prev, isActive: true }));
        }

        registration.addEventListener('updatefound', () => handleUpdateFound(registration));

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check every hour

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    registerSW();

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  const update = () => {
    if (state.registration?.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const unregister = async () => {
    if (state.registration) {
      await state.registration.unregister();
      setState({
        isSupported: true,
        isRegistered: false,
        isInstalling: false,
        isWaiting: false,
        isActive: false,
        updateAvailable: false,
        registration: null,
      });
    }
  };

  return {
    ...state,
    update,
    unregister,
  };
}