import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, FileText, Trash2, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { DEPARTMENTS_LIST, ACADEMIC_YEARS_LIST } from '../../data/mockData';
import { createDocument } from '../../services/documentStorageService';
import './UploadModal.css';

export const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState({
    name: 'CS201_Data_Structures_Trees_Graphs.pdf',
    size: '3.4 MB',
    status: 'Ready to index'
  });
  const [facultyName, setFacultyName] = useState('Ms. Nandhini R');
  const [department, setDepartment] = useState('BSc CS');
  const [year, setYear] = useState('2nd Year');
  const [subjectName, setSubjectName] = useState('Data Structures & Algorithms');
  const [subjectCode, setSubjectCode] = useState('CS-204');
  const [description, setDescription] = useState(
    'Briefly describe what these notes cover (e.g. Unit 3 Trees, Binary Search Trees, and Graph Traversals)...'
  );
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newDoc = await createDocument({
        title: subjectName ? `${subjectName} – Lecture Notes` : 'New Academic Material',
        department,
        year,
        subjectName,
        subjectCode,
        description,
        fileName: selectedFile?.name || 'document.pdf',
        fileSize: selectedFile?.size || '3.4 MB',
        fileType: 'PDF'
      });

      if (onSuccess) {
        onSuccess(newDoc, `"${newDoc.title}" uploaded and published successfully!`);
      }
      onClose();
    } catch (err) {
      console.error('Failed to create document:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Document"
      maxWidth="620px"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={UploadCloud} onClick={handlePublish} disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Document'}
          </Button>
        </>
      }
    >
      <form onSubmit={handlePublish} className="campus-upload-form">
        <p className="campus-upload-subtitle">
          Add academic notes and publish them for authorized students.
        </p>

        {/* File Dropzone / Selected File Card matching reference */}
        <div className="campus-upload-dropzone">
          {selectedFile ? (
            <div className="campus-upload-file-card">
              <div className="campus-upload-file-icon">
                <FileText size={24} />
              </div>
              <div className="campus-upload-file-info">
                <div className="campus-upload-file-name-row">
                  <strong className="campus-upload-file-name">{selectedFile.name}</strong>
                  <CheckCircle2 size={16} className="campus-upload-check" />
                </div>
                <span className="campus-upload-file-meta">
                  {selectedFile.size} • {selectedFile.status}
                </span>
              </div>
              <button
                type="button"
                className="campus-upload-file-remove"
                onClick={() => setSelectedFile(null)}
                title="Remove file"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <div className="campus-upload-dropzone-empty">
              <UploadCloud size={32} className="campus-upload-cloud-icon" />
              <p>Drag & drop academic file here, or click to browse</p>
              <span className="campus-upload-formats">
                Supported: PDF, DOC, DOCX, PPT, PPTX (Max size: 25MB)
              </span>
            </div>
          )}
        </div>

        <Input
          label="Faculty Name"
          type="text"
          value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)}
          required
        />

        {/* Target Department Chips */}
        <div className="campus-upload-field">
          <label className="campus-input__label">Department *</label>
          <div className="campus-upload-dept-chips">
            {['BSc CS', 'BCA', 'AIDS', 'Custom'].map((dept) => (
              <button
                key={dept}
                type="button"
                className={`campus-upload-chip ${department === dept ? 'campus-upload-chip--active' : ''}`}
                onClick={() => setDepartment(dept)}
              >
                {department === dept && '✓ '}
                {dept}
              </button>
            ))}
          </div>
        </div>

        <Select
          label="Academic Year"
          options={ACADEMIC_YEARS_LIST}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <div className="campus-upload-grid-2">
          <Input
            label="Subject Name"
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
          <Input
            label="Subject Code"
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
          />
        </div>

        <div className="campus-upload-field">
          <label className="campus-input__label">Brief Description (Optional)</label>
          <textarea
            className="campus-input campus-upload-textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="campus-upload-ai-notice">
          <Sparkles size={16} className="campus-upload-sparkle" />
          <span>Multilingual study flashcards will be auto-indexed for students in Tamil & Hindi.</span>
        </div>
      </form>
    </Modal>
  );
};
