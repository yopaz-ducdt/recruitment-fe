import React from 'react';

export interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  className = '',
}) => {
  const styles = {
    success: 'bg-success/10 text-success-foreground border-success/30',
    error: 'bg-error/10 text-error-foreground border-error/30',
    warning: 'bg-warning/10 text-warning-foreground border-warning/30',
    info: 'bg-primary/10 text-info-foreground border-primary/30',
  }[type];

  return (
    <div
      role="alert"
      className={`rounded-sm border p-3.5 text-sm ${styles} ${className}`}
    >
      {title && <h4 className="font-semibold mb-1">{title}</h4>}
      <p>{message}</p>
    </div>
  );
};
