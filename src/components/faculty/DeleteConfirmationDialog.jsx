import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { deleteDocument } from '../../services/documentStorageService';
import './DeleteConfirmationDialog.css';

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  document: doc,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!doc) return;
    setLoading(true);
    setError(null);

    try {
      await deleteDocument(doc.id);
      if (onSuccess) {
        onSuccess(doc.id, `"${doc.title}" has been permanently removed.`);
      }
      onClose();
    } catch (err) {
      setError(err?.message || 'Unable to delete document. Please verify permissions.');
    } finally {
      setLoading(false);
    }
  };

  if (!doc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Document"
      maxWidth="480px"
      footer={
        <div className="campus-delete-dialog-footer">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            icon={Trash2}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Document'}
          </Button>
        </div>
      }
    >
      <div className="campus-delete-dialog-content">
        <div className="campus-delete-dialog-icon-wrap">
          <AlertTriangle size={32} className="campus-delete-dialog-icon" />
        </div>

        <div className="campus-delete-dialog-text">
          <h4 className="campus-delete-dialog-heading">Confirm Permanent Deletion</h4>
          <p className="campus-delete-dialog-desc">
            Are you sure you want to delete <strong className="campus-delete-dialog-title">"{doc.title}"</strong>?
          </p>
          <div className="campus-delete-dialog-warning-box">
            <span>
              This action cannot be undone. All student access, study flashcard indexing, and the associated {doc.fileType} file ({doc.fileSize}) will be permanently deleted from the collegiate registry.
            </span>
          </div>

          {error && (
            <div className="campus-delete-dialog-error">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
