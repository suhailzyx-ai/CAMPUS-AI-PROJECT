import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export const Toast = ({
  message,
  type = 'success', // 'success' | 'error' | 'info'
  onClose,
  duration = 3500
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const Icon = type === 'error' ? AlertCircle : type === 'info' ? Info : CheckCircle2;

  return (
    <div className={`campus-toast campus-toast--${type}`} role="alert" aria-live="polite">
      <div className="campus-toast__icon">
        <Icon size={18} />
      </div>
      <div className="campus-toast__message">{message}</div>
      <button type="button" className="campus-toast__close" onClick={onClose} aria-label="Dismiss notification">
        <X size={15} />
      </button>
    </div>
  );
};
