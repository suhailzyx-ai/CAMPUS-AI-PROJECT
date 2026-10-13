import React, { useState, useEffect } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Save,
  Sparkles
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { DEPARTMENTS_LIST, ACADEMIC_YEARS_LIST } from '../../data/mockData';
import { updateDocument } from '../../services/documentStorageService';
import './EditDocumentModal.css';

export const EditDocumentModal = ({
  isOpen,
  onClose,
  document: doc,
  onSuccess
}) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('BSc CS');
  const [year, setYear] = useState('2nd Year');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Published');

  // File replacement state inside edit modal
  const [replacementFile, setReplacementFile] = useState(null);
  const [isReplacingFile, setIsReplacingFile] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pre-fill form when doc changes or modal opens
  useEffect(() => {
    if (doc) {
      setTitle(doc.title || '');
      setDepartment(doc.department || 'BSc CS');
      setYear(doc.year || '2nd Year');
      setSubjectName(doc.subjectName || (doc.subject ? doc.subject.split('(')[0].trim() : ''));
      setSubjectCode(doc.subjectCode || (doc.subject && doc.subject.includes('(') ? doc.subject.split('(')[1].replace(')', '').trim() : ''));
      setDescription(doc.description || '');
      setStatus(doc.status || 'Published');
      setReplacementFile(null);
      setIsReplacingFile(false);
      setError(null);
    }
  }, [doc, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setReplacementFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.split('.').pop().toUpperCase(),
        pages: Math.floor(Math.random() * 25) + 15
      });
      setIsReplacingFile(true);
    }
  };

  const handleRemoveReplacementFile = () => {
    setReplacementFile(null);
    setIsReplacingFile(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!doc) return;

    // Field validations
    if (!title.trim()) {
      setError('Document title cannot be empty.');
      return;
    }
    if (!subjectName.trim()) {
      setError('Subject name is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updated = await updateDocument(doc.id, {
        title,
        department,
        year,
        subjectName,
        subjectCode,
        description,
        status,
        replacementFile: replacementFile || null
      });

      if (onSuccess) {
        onSuccess(updated, 'Document details updated successfully!');
      }
      onClose();
    } catch (err) {
      setError(err?.message || 'Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!doc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Document Details"
      maxWidth="640px"
      footer={
        <div className="campus-edit-modal-footer">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={Save}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSave} className="campus-edit-modal-form">
        <p className="campus-edit-modal-sub">
          Update the metadata and syllabus mapping for this academic material. Changes apply immediately without duplicating the document.
        </p>

        {error && (
          <div className="campus-edit-modal-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Existing File Info & Optional Replacement */}
        <div className="campus-edit-file-section">
          <label className="campus-input__label">Attached Document File</label>
          <div className="campus-edit-file-card">
            <div className="campus-edit-file-icon">
              <FileText size={22} />
            </div>
            <div className="campus-edit-file-info">
              <strong className="campus-edit-file-name">
                {replacementFile ? replacementFile.name : doc.fileName || `${doc.title}.pdf`}
              </strong>
              <span className="campus-edit-file-meta">
                {replacementFile ? (
                  <span className="campus-edit-file-tag--new">New Replacement • {replacementFile.size}</span>
                ) : (
                  <span>{doc.fileType} • {doc.fileSize} • {doc.pages} pages • Stored securely</span>
                )}
              </span>
            </div>
            {replacementFile ? (
              <button
                type="button"
                className="campus-edit-file-btn campus-edit-file-btn--remove"
                onClick={handleRemoveReplacementFile}
                title="Cancel replacement"
              >
                <Trash2 size={15} />
              </button>
            ) : (
              <label className="campus-edit-file-btn campus-edit-file-btn--replace" title="Replace with new file">
                <UploadCloud size={15} />
                <span>Replace</span>
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

        <Input
          label="Document Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Data Structures – Unit 1 Notes"
          required
        />

        <div className="campus-edit-grid-2">
          <Select
            label="Department"
            options={DEPARTMENTS_LIST}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />

          <Select
            label="Academic Year"
            options={ACADEMIC_YEARS_LIST}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div className="campus-edit-grid-2">
          <Input
            label="Subject Name"
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="e.g. Data Structures & Algorithms"
            required
          />

          <Input
            label="Subject Code"
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            placeholder="e.g. CS201"
          />
        </div>

        <div className="campus-input-group campus-input-group--full">
          <label className="campus-input__label">Brief Description</label>
          <textarea
            className="campus-input campus-edit-textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize the core topics covered in this document..."
          />
        </div>

        <div className="campus-edit-grid-2">
          <Select
            label="Publication Status"
            options={['Published', 'Draft']}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};
