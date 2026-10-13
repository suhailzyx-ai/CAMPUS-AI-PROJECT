import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { replaceDocumentFile } from '../../services/documentStorageService';
import './ReplaceFileModal.css';

export const ReplaceFileModal = ({
  isOpen,
  onClose,
  document: doc,
  onSuccess
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.split('.').pop().toUpperCase(),
        pages: Math.floor(Math.random() * 25) + 15
      });
      setError(null);
    }
  };

  const handleReplace = async () => {
    if (!doc) return;
    if (!selectedFile) {
      setError('Please select a replacement file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updated = await replaceDocumentFile(doc.id, selectedFile);
      if (onSuccess) {
        onSuccess(updated, `File for "${doc.title}" replaced successfully!`);
      }
      onClose();
    } catch (err) {
      setError(err?.message || 'Failed to replace file.');
    } finally {
      setLoading(false);
    }
  };

  if (!doc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Replace Document File"
      maxWidth="560px"
      footer={
        <div className="campus-replace-modal-footer">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={UploadCloud}
            onClick={handleReplace}
            disabled={!selectedFile || loading}
          >
            {loading ? 'Replacing File...' : 'Confirm Replacement'}
          </Button>
        </div>
      }
    >
      <div className="campus-replace-modal-content">
        <p className="campus-replace-modal-desc">
          Upload a new version or corrected revision of this document. All metadata, syllabus tags, subject alignment, and views will be strictly preserved.
        </p>

        {error && (
          <div className="campus-replace-modal-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Current Document Card */}
        <div className="campus-replace-current-card">
          <span className="campus-replace-label">CURRENT ACTIVE FILE:</span>
          <div className="campus-replace-file-row">
            <div className="campus-replace-file-icon">
              <FileText size={20} />
            </div>
            <div className="campus-replace-file-info">
              <strong className="campus-replace-file-title">{doc.title}</strong>
              <span className="campus-replace-file-meta">
                {doc.fileName || `${doc.title}.pdf`} • {doc.fileType} • {doc.fileSize}
              </span>
            </div>
          </div>
        </div>

        {/* Upload Replacement Box */}
        <div className="campus-replace-dropzone-section">
          <span className="campus-replace-label">NEW REPLACEMENT FILE:</span>

          {selectedFile ? (
            <div className="campus-replace-new-card">
              <div className="campus-replace-new-icon">
                <CheckCircle2 size={22} />
              </div>
              <div className="campus-replace-new-info">
                <strong className="campus-replace-new-title">{selectedFile.name}</strong>
                <span className="campus-replace-new-meta">
                  Ready to replace • {selectedFile.size} • {selectedFile.type}
                </span>
              </div>
              <button
                type="button"
                className="campus-replace-remove-btn"
                onClick={() => setSelectedFile(null)}
                title="Remove replacement"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="campus-replace-dropzone">
              <UploadCloud size={32} className="campus-replace-dropzone-icon" />
              <p className="campus-replace-dropzone-text">Click or drag & drop replacement file</p>
              <span className="campus-replace-dropzone-formats">
                Supported formats: PDF, DOCX, PPTX (Up to 25MB)
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>
      </div>
    </Modal>
  );
};
