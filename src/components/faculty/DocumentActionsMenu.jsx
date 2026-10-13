import React, { useEffect, useRef } from 'react';
import {
  Eye,
  Edit2,
  UploadCloud,
  Globe,
  EyeOff,
  Copy,
  Trash2
} from 'lucide-react';
import './DocumentActionsMenu.css';

export const DocumentActionsMenu = ({
  document: doc,
  isOpen,
  onClose,
  triggerRect,
  onView,
  onEdit,
  onReplaceFile,
  onTogglePublish,
  onCopyLink,
  onDelete
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !doc) return null;

  // Calculate dynamic menu positioning relative to trigger button
  const menuStyle = {};
  if (triggerRect) {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const menuHeight = 260; // Approximate height of menu

    if (spaceBelow < menuHeight) {
      // Open upwards
      menuStyle.bottom = `${window.innerHeight - triggerRect.top + 6}px`;
    } else {
      // Open downwards
      menuStyle.top = `${triggerRect.bottom + 6}px`;
    }

    // Align to right of trigger button
    menuStyle.right = `${window.innerWidth - triggerRect.right}px`;
  }

  const isPublished = doc.status === 'Published';

  return (
    <div
      ref={menuRef}
      className="campus-doc-actions-menu"
      style={menuStyle}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="campus-doc-actions-menu__header">
        <span className="campus-doc-actions-menu__doc-title" title={doc.title}>
          {doc.title}
        </span>
      </div>

      <div className="campus-doc-actions-menu__group">
        <button
          type="button"
          className="campus-doc-actions-item"
          role="menuitem"
          onClick={() => {
            onClose();
            onView(doc);
          }}
        >
          <Eye size={15} className="campus-doc-actions-item__icon" />
          <span>View Document</span>
        </button>

        <button
          type="button"
          className="campus-doc-actions-item"
          role="menuitem"
          onClick={() => {
            onClose();
            onEdit(doc);
          }}
        >
          <Edit2 size={15} className="campus-doc-actions-item__icon" />
          <span>Edit Details</span>
        </button>

        <button
          type="button"
          className="campus-doc-actions-item"
          role="menuitem"
          onClick={() => {
            onClose();
            onReplaceFile(doc);
          }}
        >
          <UploadCloud size={15} className="campus-doc-actions-item__icon" />
          <span>Replace File</span>
        </button>
      </div>

      <div className="campus-doc-actions-menu__divider" />

      <div className="campus-doc-actions-menu__group">
        <button
          type="button"
          className="campus-doc-actions-item"
          role="menuitem"
          onClick={() => {
            onClose();
            onTogglePublish(doc);
          }}
        >
          {isPublished ? (
            <>
              <EyeOff size={15} className="campus-doc-actions-item__icon campus-doc-actions-item__icon--amber" />
              <span>Unpublish Document</span>
            </>
          ) : (
            <>
              <Globe size={15} className="campus-doc-actions-item__icon campus-doc-actions-item__icon--blue" />
              <span>Publish to Students</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="campus-doc-actions-item"
          role="menuitem"
          onClick={() => {
            onClose();
            onCopyLink(doc);
          }}
        >
          <Copy size={15} className="campus-doc-actions-item__icon" />
          <span>Copy Document Link</span>
        </button>
      </div>

      <div className="campus-doc-actions-menu__divider" />

      <div className="campus-doc-actions-menu__group">
        <button
          type="button"
          className="campus-doc-actions-item campus-doc-actions-item--danger"
          role="menuitem"
          onClick={() => {
            onClose();
            onDelete(doc);
          }}
        >
          <Trash2 size={15} className="campus-doc-actions-item__icon" />
          <span>Delete Document</span>
        </button>
      </div>
    </div>
  );
};
