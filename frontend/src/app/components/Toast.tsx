import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--bg-card)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          style: {
            background: 'var(--bg-card)',
            border: '1px solid var(--success)',
            borderRadius: '12px',
          },
          iconTheme: {
            primary: 'var(--success)',
            secondary: 'white',
          },
        },
        error: {
          style: {
            background: 'var(--bg-card)',
            border: '1px solid var(--danger)',
            borderRadius: '12px',
          },
          iconTheme: {
            primary: 'var(--danger)',
            secondary: 'white',
          },
        },
        loading: {
          style: {
            background: 'var(--bg-card)',
            border: '1px solid var(--primary)',
            borderRadius: '12px',
          },
        },
      }}
    />
  );
}