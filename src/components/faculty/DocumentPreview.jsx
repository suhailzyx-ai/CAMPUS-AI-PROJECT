import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Edit2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { Badge } from '../ui/Card';
import { Button } from '../ui/Button';
import './DocumentPreview.css';

export const DocumentPreview = ({
  document: doc,
  onClose,
  onEdit
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const navigate = useNavigate();

  if (!doc) {
    return (
      <div className="campus-doc-preview-error-screen">
        <div className="campus-doc-preview-error-card">
          <AlertTriangle size={40} className="campus-doc-preview-error-icon" />
          <h3>Document Unavailable</h3>
          <p>The requested academic document could not be found or loaded for preview.</p>
          <Button variant="primary" icon={ArrowLeft} onClick={onClose}>
            Back to Recent Documents
          </Button>
        </div>
      </div>
    );
  }

  const totalPages = doc.pages || 42;

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Simulate realistic browser download
    const blob = new Blob([`Official Collegiate Notes: ${doc.title}\nSubject: ${doc.subject}\nFaculty: ${doc.facultyName || 'Ms. Nandhini R'}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName || `${doc.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const isPublished = doc.status === 'Published';

  return (
    <div className="campus-doc-preview-container">
      {/* Top Header & Navigation Bar */}
      <div className="campus-doc-preview-header">
        <div className="campus-doc-preview-header__left">
          <button
            type="button"
            className="campus-doc-preview-back-btn"
            onClick={onClose}
            title="Return to Recent Documents"
          >
            <ArrowLeft size={16} />
            <span>Back to Recent Documents</span>
          </button>

          <div className="campus-doc-preview-title-row">
            <h1 className="campus-doc-preview-title">{doc.title}</h1>
            <div className="campus-doc-preview-badges">
              <Badge variant="navy" size="sm">{doc.subjectCode || 'ACADEMIC'}</Badge>
              <Badge variant="slate" size="sm">{doc.department}</Badge>
              <Badge variant="slate" size="sm">{doc.year}</Badge>
              {isPublished ? (
                <Badge variant="success" size="sm">• Published</Badge>
              ) : (
                <Badge variant="amber" size="sm">• Draft / Unpublished</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="campus-doc-preview-header__right">
          {onEdit && (
            <Button
              variant="outline"
              size="md"
              icon={Edit2}
              onClick={() => onEdit(doc)}
            >
              Edit Details
            </Button>
          )}

          <Button
            variant="outline"
            size="md"
            icon={Download}
            onClick={handleDownload}
          >
            {downloadSuccess ? 'Downloaded!' : 'Download PDF'}
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={ExternalLink}
            onClick={() => navigate(`/faculty/documents/${doc.id}/reader`)}
          >
            Open in AI Study Reader
          </Button>
        </div>
      </div>

      {/* Main Preview Split Area */}
      <div className="campus-doc-preview-body-grid">
        {/* Left Column: PDF / Document Viewer Canvas */}
        <div className="campus-doc-preview-viewer-card">
          {/* Document Canvas Toolbar */}
          <div className="campus-doc-preview-toolbar">
            <div className="campus-doc-preview-toolbar-left">
              <FileText size={16} className="campus-doc-preview-pdf-icon" />
              <span className="campus-doc-preview-file-meta">
                {doc.fileName || `${doc.title}.pdf`} ({doc.fileType} • {doc.fileSize})
              </span>
            </div>

            <div className="campus-doc-preview-toolbar-center">
              <button
                type="button"
                className="campus-doc-preview-page-btn"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                title="Previous Page"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="campus-doc-preview-page-count">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="campus-doc-preview-page-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                title="Next Page"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="campus-doc-preview-toolbar-right">
              <button
                type="button"
                className="campus-doc-preview-tool-btn"
                onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="campus-doc-preview-zoom-label">{zoomLevel}%</span>
              <button
                type="button"
                className="campus-doc-preview-tool-btn"
                onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button
                type="button"
                className="campus-doc-preview-tool-btn"
                onClick={() => setZoomLevel(100)}
                title="Reset Zoom"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Document Content Sheet / Realistic PDF Sheet View */}
          <div className="campus-doc-preview-sheet-wrapper">
            <div
              className="campus-doc-preview-sheet"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              <div className="campus-doc-preview-sheet-header">
                <span className="campus-doc-preview-institution">COLLEGIATE ACADEMIC SYLLABUS NOTES</span>
                <span className="campus-doc-preview-sheet-date">Published: {doc.publishedDate}</span>
              </div>

              <div className="campus-doc-preview-sheet-title-box">
                <h2 className="campus-doc-preview-sheet-h1">{doc.title}</h2>
                <div className="campus-doc-preview-sheet-meta-line">
                  <span><strong>Subject:</strong> {doc.subject}</span>
                  <span>•</span>
                  <span><strong>Department:</strong> {doc.department}</span>
                  <span>•</span>
                  <span><strong>Academic Year:</strong> {doc.year}</span>
                </div>
              </div>

              <div className="campus-doc-preview-sheet-divider" />

              <div className="campus-doc-preview-sheet-content">
                <h3 className="campus-doc-preview-sheet-h2">1. Overview & Curriculum Alignment</h3>
                <p className="campus-doc-preview-sheet-p">
                  {doc.description ||
                    'These lecture notes establish foundational principles, computational models, and memory hierarchies required for semester exams and laboratory practicals.'}
                </p>

                <div className="campus-doc-preview-sheet-highlight">
                  <div className="campus-doc-preview-sheet-highlight-tag">KEY CONCEPT FOR UNIT EXAM</div>
                  <p className="campus-doc-preview-sheet-highlight-text">
                    "Data structures provide systematic methods to organize and store records in computational memory so that search, insertion, and traversal operations scale with predictable asymptotic efficiency."
                  </p>
                </div>

                <h3 className="campus-doc-preview-sheet-h2">2. Modular Learning Structure</h3>
                <p className="campus-doc-preview-sheet-p">
                  Students enrolled in {doc.department} ({doc.year}) can access instant AI study assistance on this document, including student-friendly explanations, bilingual terminology, and concept simplification in regional languages.
                </p>

                <div className="campus-doc-preview-sheet-footer">
                  <span>{doc.fileName || `${doc.title}.pdf`}</span>
                  <span>Page {currentPage} of {totalPages}</span>
                  <span>{doc.facultyName || 'Faculty Author'} • Verified Academic Resource</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Publication Information Sidebar */}
        <div className="campus-doc-preview-sidebar">
          <div className="campus-doc-preview-sidebar-card">
            <h3 className="campus-doc-preview-sidebar-title">Document Metadata</h3>

            <div className="campus-doc-preview-meta-list">
              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Faculty Author</span>
                <strong className="campus-doc-preview-meta-val">{doc.facultyName || 'Ms. Nandhini R'}</strong>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Department</span>
                <strong className="campus-doc-preview-meta-val">{doc.department}</strong>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Academic Year</span>
                <strong className="campus-doc-preview-meta-val">{doc.year}</strong>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Subject Code</span>
                <strong className="campus-doc-preview-meta-val">{doc.subjectCode || 'CS201'}</strong>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Publication Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isPublished ? (
                    <>
                      <CheckCircle2 size={16} color="var(--color-success)" />
                      <strong style={{ color: 'var(--color-success)' }}>Published & Active</strong>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} color="var(--color-accent-amber)" />
                      <strong style={{ color: 'var(--color-accent-amber)' }}>Draft / Unpublished</strong>
                    </>
                  )}
                </div>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Student Views</span>
                <strong className="campus-doc-preview-meta-val">{doc.views || 0} reads</strong>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">File Type & Size</span>
                <strong className="campus-doc-preview-meta-val">{doc.fileType} • {doc.fileSize}</strong>
              </div>

              <div className="campus-doc-preview-meta-item">
                <span className="campus-doc-preview-meta-label">Last Updated</span>
                <strong className="campus-doc-preview-meta-val">{doc.lastUpdated || doc.publishedDate}</strong>
              </div>
            </div>

            <div className="campus-doc-preview-ai-card">
              <div className="campus-doc-preview-ai-header">
                <Sparkles size={16} className="campus-doc-preview-sparkle" />
                <strong>AI Study Ready</strong>
              </div>
              <p className="campus-doc-preview-ai-desc">
                This document is indexed for student AI explanations, meaning extraction, and multilingual translation in 6 regional languages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
