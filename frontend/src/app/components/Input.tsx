import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'file' | 'date' | 'search' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  accept?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  ariaLabel?: string;
  required?: boolean;
  rows?: number;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  accept,
  error,
  helperText,
  maxLength,
  ariaLabel,
  required,
  rows = 3,
}: InputProps) {
  const baseClasses = `w-full px-3 py-2 bg-bg-card border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${error ? 'border-danger focus:ring-danger' : 'border-border'} ${className}`;

  const commonProps = {
    placeholder,
    value,
    onChange,
    disabled,
    maxLength,
    'aria-label': ariaLabel,
    required,
  };

  if (type === 'textarea') {
    return (
      <div className="w-full">
        <textarea
          {...commonProps}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
        {helperText && (
          <p className={`text-sm mt-1 ${error ? 'text-danger' : 'text-text-muted'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        {...commonProps}
        type={type}
        accept={accept}
        className={baseClasses}
      />
      {helperText && (
        <p className={`text-sm mt-1 ${error ? 'text-danger' : 'text-text-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}