import React from 'react';

interface AlertChipProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
}

const typeStyles: Record<string, string> = {
  success: 'bg-accent-green text-bg-main',
  error: 'bg-accent-red text-bg-main',
  info: 'bg-accent-blue text-bg-main',
  warning: 'bg-accent-yellow text-bg-main',
};

const AlertChip: React.FC<AlertChipProps> = ({ message, type = 'info', onClose }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${typeStyles[type]} animate-fade-in-up`}
       role="alert">
    <span>{message}</span>
    {onClose && (
      <button onClick={onClose} className="ml-2 text-bg-main hover:text-bg-card font-bold text-lg leading-none">&times;</button>
    )}
  </div>
);

export default AlertChip; 