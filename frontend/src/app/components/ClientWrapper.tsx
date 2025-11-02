'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { useServiceWorker } from '../hooks/useServiceWorker';
import LoadingSkeleton from './LoadingSkeleton';
import { toast } from 'react-hot-toast';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { updateAvailable, update } = useServiceWorker();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (updateAvailable) {
      toast((t) => (
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <p className="font-medium text-text">Update Available</p>
            <p className="text-sm text-text-muted">A new version is ready to install</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                update();
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
            >
              Update
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-text-muted hover:text-text rounded text-sm"
            >
              Later
            </button>
          </div>
        </div>
      ), {
        duration: 10000,
        position: 'bottom-right',
      });
    }
  }, [updateAvailable, update]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSkeleton width="64px" height="64px" className="rounded-full mx-auto" />
          <div className="space-y-2">
            <LoadingSkeleton width="200px" height="20px" className="mx-auto" />
            <LoadingSkeleton width="150px" height="16px" className="mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}