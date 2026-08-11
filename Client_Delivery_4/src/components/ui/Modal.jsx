import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus first element or modal container if no focusable elements
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
           focusableElements[0].focus();
        } else {
           modalRef.current.focus();
        }
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalStyle = {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const headerStyle = {
    padding: 'var(--space-3)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '1.25rem',
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--color-medium-gray)',
    padding: '4px',
    lineHeight: 1,
  };

  const contentStyle = {
    padding: 'var(--space-3)',
    overflowY: 'auto',
  };

  return createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div 
        style={modalStyle} 
        ref={modalRef} 
        tabIndex="-1"
      >
        <div style={headerStyle}>
          <h2 id="modal-title" style={titleStyle}>{title}</h2>
          <button 
            style={closeBtnStyle} 
            onClick={onClose} 
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
