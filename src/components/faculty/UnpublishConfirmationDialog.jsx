import React, { useState } from 'react';
import { EyeOff, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { togglePublishDocument } from '../../services/documentStorageService';

export const UnpublishConfirmationDialog = ({
  isOpen,
  onClose,
  document: doc,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUnpublish = async () => {
    if (!doc) return;
    setLoading(true);
    setError(null);

    try {
      const updated = await togglePublishDocument(doc.id, 'Draft');
      if (onSuccess) {
        onSuccess(updated, `"${doc.title}" has been moved to Drafts.`);
      }
      onClose();
    } catch (err) {
      setError(err?.message || 'Unable to unpublish document.');
    } finally {
      setLoading(false);
    }
  };

  if (!doc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unpublish Document"
      maxWidth="480px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Keep Published
          </Button>
          <Button
            variant="amber"
            icon={EyeOff}
            onClick={handleUnpublish}
            disabled={loading}
          >
            {loading ? 'Unpublishing...' : 'Yes, Unpublish'}
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-amber-subtle)',
            border: '1px solid #FDE68A',
            color: 'var(--color-accent-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <EyeOff size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark-blue)', marginBottom: '6px' }}>
            Unpublish from Student View?
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', lineHeight: 1.45, marginBottom: '10px' }}>
            Are you sure you want to unpublish <strong>"{doc.title}"</strong>?
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
            Students will no longer be able to discover, read, or use AI study tools on this document until you republish it. You can republish at any time from this dashboard.
          </p>
          {error && (
            <div style={{ marginTop: '10px', color: 'var(--color-destructive)', fontSize: '0.82rem', fontWeight: 600 }}>
              {error}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
