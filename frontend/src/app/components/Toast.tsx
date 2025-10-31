import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--panel)',
          color: 'var(--text)',
        },
        success: {
          iconTheme: {
            primary: 'var(--success)',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--danger)',
            secondary: 'white',
          },
        },
      }}
    />
  );
}