import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return createPortal(
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        {type === 'success' ? '✅' : '⚠️'}
      </span>
      <span className="toast__message">{message}</span>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Close notification">
        ✕
      </button>
    </div>,
    document.body
  );
}
