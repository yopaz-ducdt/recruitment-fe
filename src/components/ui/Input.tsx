import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = '', required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-on-surface mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full h-10 px-3 py-2 text-sm text-on-surface bg-surface-container-lowest border rounded-lg transition-colors placeholder:text-outline focus:outline-hidden focus:ring-2 focus:ring-offset-1 disabled:bg-surface-container disabled:cursor-not-allowed ${
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-outline-variant focus:border-primary focus:ring-primary/10'
          } ${className}`}
          required={required}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-outline">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
