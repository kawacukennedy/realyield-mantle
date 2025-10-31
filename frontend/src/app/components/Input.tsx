import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'file' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  accept?: string;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  accept,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      accept={accept}
      className={`w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    />
  );
}