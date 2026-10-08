import React from 'react';
import { X } from 'lucide-react';
import './Modal.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '560px',
  footer
}) => {
  if (!isOpen) return null;

  return (
    <div className="campus-modal-overlay" onClick={onClose}>
      <div
        className="campus-modal-container"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="campus-modal-header">
          {title && <h3 className="campus-modal-title">{title}</h3>}
          <button className="campus-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="campus-modal-body">{children}</div>
        {footer && <div className="campus-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
