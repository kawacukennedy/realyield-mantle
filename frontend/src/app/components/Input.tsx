import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Search, X, CheckCircle, AlertCircle } from 'lucide-react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'file' | 'date' | 'search' | 'textarea' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  accept?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  maxLength?: number;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  required?: boolean;
  rows?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  accept,
  error,
  success,
  helperText,
  maxLength,
  ariaLabel,
  ariaDescribedBy,
  required,
  rows = 3,
  leftIcon,
  rightIcon,
  clearable = false,
  onClear,
  size = 'md',
  fullWidth = true,
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const baseClasses = `relative ${fullWidth ? 'w-full' : ''} bg-bg-card border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-200 ${
    disabled ? 'opacity-50 cursor-not-allowed bg-bg-muted' : ''
  } ${
    error
      ? 'border-danger focus:ring-danger focus:border-danger'
      : success
      ? 'border-success focus:ring-success focus:border-success'
      : isFocused
      ? 'border-primary focus:ring-primary focus:border-primary'
      : 'border-border hover:border-border-light'
  } ${sizeClasses[size]} ${className}`;

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const getStatusIcon = () => {
    if (error) return <AlertCircle className="h-4 w-4 text-danger" />;
    if (success) return <CheckCircle className="h-4 w-4 text-success" />;
    return null;
  };

  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (type === 'password') {
      return (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-text-muted hover:text-text transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      );
    }
    if (type === 'search' && value) {
      return (
        <button
          type="button"
          onClick={onClear}
          className="text-text-muted hover:text-text transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      );
    }
    if (clearable && value) {
      return (
        <button
          type="button"
          onClick={onClear}
          className="text-text-muted hover:text-text transition-colors"
          aria-label="Clear input"
        >
          <X className="h-4 w-4" />
        </button>
      );
    }
    return getStatusIcon();
  };

  const commonProps = {
    placeholder,
    value,
    onChange,
    disabled,
    maxLength,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy || (helperText ? `${ariaLabel || 'input'}-helper` : undefined),
    'aria-invalid': !!error,
    required,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  const inputElement = type === 'textarea' ? (
    <textarea
      {...commonProps}
      ref={ref as React.RefObject<HTMLTextAreaElement>}
      rows={rows}
      className={`${baseClasses} resize-none ${leftIcon || rightIcon ? 'pr-10' : ''}`}
    />
  ) : (
    <input
      {...commonProps}
      ref={ref as React.RefObject<HTMLInputElement>}
      type={getInputType()}
      accept={accept}
      className={`${baseClasses} ${leftIcon || rightIcon ? 'pr-10' : ''}`}
    />
  );

  return (
    <div className="w-full">
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}

        {inputElement}

        {(rightIcon || type === 'password' || (clearable && value) || getStatusIcon()) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {getRightIcon()}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p
          id={`${ariaLabel || 'input'}-helper`}
          className={`text-sm mt-1 flex items-center space-x-1 ${
            error ? 'text-danger' : success ? 'text-success' : 'text-text-muted'
          }`}
        >
          {error && <AlertCircle className="h-3 w-3 flex-shrink-0" />}
          {success && <CheckCircle className="h-3 w-3 flex-shrink-0" />}
          <span>{error || helperText}</span>
        </p>
      )}

      {maxLength && value && (
        <p className="text-xs text-text-muted mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
});

InputComponent.displayName = 'Input';

export default InputComponent;