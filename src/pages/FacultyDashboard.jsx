import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Upload,
  FileText,
  Building,
  BookOpen,
  Eye,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  TrendingUp,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

// Reusable Faculty Components
import { UploadModal } from '../components/faculty/UploadModal';
import { DocumentPreview } from '../components/faculty/DocumentPreview';
import { EditDocumentModal } from '../components/faculty/EditDocumentModal';
import { ReplaceFileModal } from '../components/faculty/ReplaceFileModal';
import { DocumentActionsMenu } from '../components/faculty/DocumentActionsMenu';
import { DeleteConfirmationDialog } from '../components/faculty/DeleteConfirmationDialog';
import { UnpublishConfirmationDialog } from '../components/faculty/UnpublishConfirmationDialog';
import { Toast } from '../components/ui/Toast';

// Storage Service & Mock Data
import {
  getDocuments,
  togglePublishDocument
} from '../services/documentStorageService';
import { MOCK_FACULTY_DASHBOARD, DEPARTMENTS_LIST, ACADEMIC_YEARS_LIST } from '../data/mockData';
import './FacultyDashboard.css';

export const FacultyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseData = MOCK_FACULTY_DASHBOARD;

  // Documents list & loading states
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [updatingDocId, setUpdatingDocId] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedYear, setSelectedYear] = useState('All Years');

  // Active Modals & Preview State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [editModalDoc, setEditModalDoc] = useState(null);
  const [replaceFileDoc, setReplaceFileDoc] = useState(null);
  const [deleteConfirmDoc, setDeleteConfirmDoc] = useState(null);
  const [unpublishConfirmDoc, setUnpublishConfirmDoc] = useState(null);

  // Three-dot dropdown menu state
  const [actionsMenuState, setActionsMenuState] = useState({
    isOpen: false,
    doc: null,
    triggerRect: null
  });

  // Notification Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load documents from storage service
  const loadDocuments = useCallback(async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error('Failed to load documents:', err);
      showToast('Failed to load documents. Please refresh.', 'error');
    } finally {
      setIsLoadingDocs(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();

    // Listen for cross-component document updates
    const handleStorageUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setDocuments(e.detail);
      } else {
        loadDocuments();
      }
    };

    window.addEventListener('campus_documents_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('campus_documents_updated', handleStorageUpdate);
    };
  }, [loadDocuments]);

  // Check if navigated back with a specific document to preview (e.g. from Faculty AI Study Reader)
  useEffect(() => {
    const targetDocId = location.state?.viewDocId;
    if (targetDocId && documents.length > 0) {
      const found = documents.find((d) => d.id === targetDocId);
      if (found) {
        setPreviewDoc(found);
      }
    }
  }, [location.state, documents]);

  // Document Filtering
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.subjectCode && doc.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept =
      selectedDept === 'All' ||
      selectedDept === 'All Departments' ||
      doc.department.toLowerCase() === selectedDept.toLowerCase();

    const matchesYear =
      selectedYear === 'All' ||
      selectedYear === 'All Years' ||
      doc.year.toLowerCase() === selectedYear.toLowerCase();

    return matchesSearch && matchesDept && matchesYear;
  });

  // Dynamic stats calculation
  const publishedCount = documents.filter((d) => d.status === 'Published').length;

  // ----------------------------------------------------
  // Action Handlers
  // ----------------------------------------------------

  // 1. View Document (Eye Icon)
  const handleViewDocument = (doc) => {
    setPreviewDoc(doc);
  };

  // 2. Edit Document (Pencil Icon)
  const handleEditDocument = (doc) => {
    setEditModalDoc(doc);
  };

  // 3. Three-dot Menu Trigger
  const handleOpenActionsMenu = (e, doc) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setActionsMenuState({
      isOpen: true,
      doc,
      triggerRect: rect
    });
  };

  const handleCloseActionsMenu = () => {
    setActionsMenuState({ isOpen: false, doc: null, triggerRect: null });
  };

  // 4. Replace File
  const handleReplaceFile = (doc) => {
    setReplaceFileDoc(doc);
  };

  // 5. Publish / Unpublish Toggle
  const handleTogglePublish = async (doc) => {
    if (doc.status === 'Published') {
      // Prompt confirmation before unpublishing as requested
      setUnpublishConfirmDoc(doc);
    } else {
      // Publish immediately
      setUpdatingDocId(doc.id);
      try {
        const updated = await togglePublishDocument(doc.id, 'Published');
        setDocuments((prev) => prev.map((d) => (d.id === doc.id ? updated : d)));
        showToast(`"${doc.title}" is now published and visible to students.`);
      } catch (err) {
        showToast(err?.message || 'Failed to publish document.', 'error');
      } finally {
        setUpdatingDocId(null);
      }
    }
  };

  // 6. Copy Document Link
  const handleCopyLink = async (doc) => {
    const documentUrl = `${window.location.origin}/documents/${doc.id}`;
    try {
      await navigator.clipboard.writeText(documentUrl);
      showToast('Document link copied to clipboard!');
    } catch {
      showToast('Unable to copy link to clipboard.', 'error');
    }
  };

  // 7. Delete Document
  const handleDeleteDocument = (doc) => {
    setDeleteConfirmDoc(doc);
  };

  // Callbacks after modal successes
  const handleUpdateSuccess = (updatedDoc, successMsg) => {
    setDocuments((prev) => prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)));
    if (previewDoc && previewDoc.id === updatedDoc.id) {
      setPreviewDoc(updatedDoc);
    }
    showToast(successMsg || 'Document updated successfully!');
  };

  const handleDeleteSuccess = (deletedId, successMsg) => {
    setDocuments((prev) => prev.filter((d) => d.id !== deletedId));
    if (previewDoc && previewDoc.id === deletedId) {
      setPreviewDoc(null);
    }
    showToast(successMsg || 'Document deleted successfully!');
  };

  const handleUploadSuccess = (newDoc, successMsg) => {
    setDocuments((prev) => [newDoc, ...prev]);
    showToast(successMsg || 'New document uploaded and published!');
  };

  // If a document is currently in Preview mode, render DocumentPreview
  if (previewDoc) {
    return (
      <div className="campus-faculty-dash">
        <DocumentPreview
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
          onEdit={(d) => {
            setEditModalDoc(d);
          }}
        />

        {/* Support editing directly from inside preview */}
        {editModalDoc && (
          <EditDocumentModal
            isOpen={Boolean(editModalDoc)}
            onClose={() => setEditModalDoc(null)}
            document={editModalDoc}
            onSuccess={handleUpdateSuccess}
          />
        )}

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      </div>
    );
  }

  return (
    <div className="campus-faculty-dash">
      {/* Faculty Header & Upload Action */}
      <div className="campus-faculty-header">
        <div>
          <Badge variant="faculty" size="sm" style={{ marginBottom: 6 }}>
            FACULTY DASHBOARD • ACADEMIC YEAR 2026–27
          </Badge>
          <h1 className="campus-faculty-title">Welcome back, {baseData.facultyName}</h1>
          <p className="campus-faculty-subtitle">
            Manage your academic materials, syllabus-aligned lecture modules, and distribute vetted learning resources to students.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={Plus}
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Document
        </Button>
      </div>

      {/* Stats Cards Row with dynamic published count */}
      <div className="campus-faculty-stats-grid">
        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Published Documents</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--navy">
              <FileText size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{publishedCount}</div>
          <div className="campus-faculty-stat-badge">
            <TrendingUp size={12} /> {baseData.stats.publishedThisMonth}
          </div>
        </Card>

        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Departments</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--amber">
              <Building size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{baseData.stats.departmentsCount}</div>
          <span className="campus-faculty-stat-sub">{baseData.stats.departmentsList}</span>
        </Card>

        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Active Subjects</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--navy">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{baseData.stats.activeSubjectsCount}</div>
          <span className="campus-faculty-stat-sub">{baseData.stats.subjectsDetail}</span>
        </Card>

        <Card className="campus-faculty-stat-card">
          <div className="campus-faculty-stat-top">
            <span className="campus-faculty-stat-label">Student Views</span>
            <div className="campus-faculty-stat-icon campus-faculty-stat-icon--amber">
              <Eye size={20} />
            </div>
          </div>
          <div className="campus-faculty-stat-value">{baseData.stats.studentViews}</div>
          <span className="campus-faculty-stat-sub">{baseData.stats.readRate}</span>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card padding="sm" className="campus-faculty-filter-bar">
        <div className="campus-faculty-filter-left">
          <div className="campus-faculty-search-input">
            <Input
              type="text"
              placeholder="Search documents by name, code..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            options={['All Departments', ...DEPARTMENTS_LIST]}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            fullWidth={false}
          />
          <Select
            options={['All Years', ...ACADEMIC_YEARS_LIST]}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            fullWidth={false}
          />
        </div>
      </Card>

      {/* Uploaded Documents Table Section */}
      <Card className="campus-faculty-table-card">
        <div className="campus-faculty-table-header">
          <div>
            <h3 className="campus-faculty-table-title">Recent Documents</h3>
            <p className="campus-faculty-table-sub">View and manage your uploaded academic notes and study materials.</p>
          </div>
        </div>

        <div className="campus-faculty-table-wrapper">
          <table className="campus-table">
            <thead>
              <tr>
                <th>DOCUMENT NAME</th>
                <th>DEPARTMENT</th>
                <th>YEAR</th>
                <th>SUBJECT</th>
                <th>PUBLISHED DATE</th>
                <th className="campus-table-th-status">STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingDocs ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--color-primary-blue)' }}>
                      <Loader2 size={20} className="campus-state-spinner" />
                      <span>Loading documents registry...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--color-text-secondary)' }}>
                    No documents found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const isUpdating = updatingDocId === doc.id;
                  const isPublished = doc.status === 'Published';

                  return (
                    <tr key={doc.id}>
                      <td>
                        <div className="campus-doc-cell">
                          <div className="campus-doc-cell-icon">
                            <FileText size={18} />
                          </div>
                          <div>
                            <strong className="campus-doc-cell-title">{doc.title}</strong>
                            <span className="campus-doc-cell-sub">
                              {doc.fileType} • {doc.fileSize} • {doc.pages} pages
                            </span>
                          </div>
                        </div>
                      </td>
                      <td><Badge variant="slate" size="sm">{doc.department}</Badge></td>
                      <td>{doc.year}</td>
                      <td>{doc.subject}</td>
                      <td>{doc.publishedDate}</td>
                      <td className="campus-table-td-status">
                        {isUpdating ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary-blue)' }} title="Updating status...">
                            <Loader2 size={16} className="campus-state-spinner" />
                          </div>
                        ) : isPublished ? (
                          <div className="campus-status-check-circle" title="Published & Active">
                            <Check size={14} strokeWidth={2.6} />
                          </div>
                        ) : (
                          <Badge variant="amber" size="sm" title="Unpublished Draft">
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="campus-table-actions">
                          {/* 1. VIEW DOCUMENT — Eye Icon */}
                          <button
                            type="button"
                            className="campus-table-action-btn"
                            onClick={() => handleViewDocument(doc)}
                            title="View Document Preview"
                            aria-label={`View ${doc.title}`}
                          >
                            <Eye size={16} />
                          </button>

                          {/* 2. EDIT DOCUMENT — Pencil Icon */}
                          <button
                            type="button"
                            className="campus-table-action-btn"
                            onClick={() => handleEditDocument(doc)}
                            title="Edit Document Metadata"
                            aria-label={`Edit ${doc.title}`}
                          >
                            <Edit2 size={16} />
                          </button>

                          {/* 3. THREE-DOT MENU — More Actions */}
                          <button
                            type="button"
                            className="campus-table-action-btn"
                            onClick={(e) => handleOpenActionsMenu(e, doc)}
                            title="More Document Actions"
                            aria-label={`Options for ${doc.title}`}
                            aria-haspopup="true"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Floating Three-Dot Actions Menu */}
      <DocumentActionsMenu
        isOpen={actionsMenuState.isOpen}
        document={actionsMenuState.doc}
        triggerRect={actionsMenuState.triggerRect}
        onClose={handleCloseActionsMenu}
        onView={handleViewDocument}
        onEdit={handleEditDocument}
        onReplaceFile={handleReplaceFile}
        onTogglePublish={handleTogglePublish}
        onCopyLink={handleCopyLink}
        onDelete={handleDeleteDocument}
      />

      {/* Edit Document Modal */}
      {editModalDoc && (
        <EditDocumentModal
          isOpen={Boolean(editModalDoc)}
          onClose={() => setEditModalDoc(null)}
          document={editModalDoc}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {/* Replace File Modal */}
      {replaceFileDoc && (
        <ReplaceFileModal
          isOpen={Boolean(replaceFileDoc)}
          onClose={() => setReplaceFileDoc(null)}
          document={replaceFileDoc}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmDoc && (
        <DeleteConfirmationDialog
          isOpen={Boolean(deleteConfirmDoc)}
          onClose={() => setDeleteConfirmDoc(null)}
          document={deleteConfirmDoc}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Unpublish Confirmation Dialog */}
      {unpublishConfirmDoc && (
        <UnpublishConfirmationDialog
          isOpen={Boolean(unpublishConfirmDoc)}
          onClose={() => setUnpublishConfirmDoc(null)}
          document={unpublishConfirmDoc}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {/* Upload Document Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};
